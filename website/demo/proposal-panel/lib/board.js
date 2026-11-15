/* Film.board: the console's Controls board, drawn in the console's logical px inside a Film.console page
   (1289 x 570 at scale 1.2). Each part is built once and driven from at(t) through small setters, so a scene
   stays a pure function of t. Scenes 3.1 to 3.5 draw the board; 5.5 (verdicts), 6.1 (an expanded row) and
   7.2 (bundle compare) reuse the parts without redrawing them.

   Film.board.head(page, { x, y, w, name, chip, meta })  the page header line -> { el, chip, meta }
   Film.board.rail(page, { x, y, w, items, on })      the rail of bundle versions
     items: [{ v: 'v1', line: 'Signed today', chip?: 'In force', ghost?: true }]
     -> { el, items: [{ root, chip }], select(i), show(i, o) }
   Film.board.rows(page, { x, y, w, items = Film.BUNDLE, h = 58, gap = 6, mark })
     the bundle's six commitments as plain sentences with a kind chip and typed target chips
     mark: (item) => HTML placed at the row's right end (7.2 puts the change there)
     -> { el, rows: [{ root, s, kind, tg, more, det }], height, glow(i, g), show(i, o), targets(o),
          detail(i, html), expand(i, p) }   expand opens the detail under row i and lays the rows out again
   Film.board.ring(page, { x, y, size = 300 })        the three-phase ring Prepare / Sign / In force
     -> { el, node(i), set({ phase: 0|1|2, steps: 0..4, pulse: 0..1, version, line }) }   node(i): a node's page rect
   Film.board.steps(page, { x, y, w })                the four Prepare steps, Adopt / Describe / Plan / Decide
     -> { el, items: [{ root }], set(done, now) }     done: steps finished (0..4); now: the step being worked
   Film.board.ready(page, { x, y, w })                the readiness rows
     -> { el, rows: [{ root, fill, v, chip }], set(i, { p: 0..1, value, chip }) }
   Film.board.signer(page, { x, y, w, h })            the two-section signer (risk team, control owner)
     -> { el, sections: [{ root, btn, stamp }], stamp(i, p), rehearsal(o) }
   Film.board.ticks(page, { x, y, w, n, h = 26 })      the verdict-tick row: one tick per verdict
     -> { el, ticks, set(words) }   words: ['Upheld' | 'Breached' | null, …], latest at the right
   Film.board.typed(kind, name) -> HTML for one typed target chip; Film.board.TARGETS[id] lists each row's
     targets as [kind, name] pairs (Film.BUNDLE ids); Film.board.AGENTS are the four persona agents. */
(function () {
  const M = Mock;

  const AGENTS = Film.PERSONAS.map((p) => ['agent', p.agent]);
  const TARGETS = {
    injection: [['guardrail', 'PromptInjectionGuard'], ...AGENTS],
    jailbreak: [['guardrail', 'JailbreakGuard'], ...AGENTS],
    pii: [['sanitizer', 'credit-card'], ['sanitizer', 'email'], ['sanitizer', 'phone'], ['sanitizer', 'iban']],
    format: [['guardrail', 'ReviewQualityGuard'], ...AGENTS],
    quality: [['evaluator', 'ReviewQualityEvaluator'], ...AGENTS],
    release: [['human', 'release-weak-review'], ['workflow', 'ReviewWorkflow']],
  };
  const STEPS = ['Adopt', 'Describe', 'Plan', 'Decide'];
  const PHASES = ['Prepare', 'Sign', 'In force'];
  const READY = [['Baseline', 'Starter set'], ['Required facts', 'to open Plan'], ['Rows decided', 'to open Sign'], ['Bound to code', ''], ['Code in sync', 'read today']];

  M.style('fb', `
    .fb { position: absolute; --g: 0; }
    .fb-panel { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; }
    .fb-eb { font: 600 12px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
    .fb-tgt { display: inline-flex; align-items: center; gap: 7px; height: 26px; padding: 0 9px; border-radius: 7px; background: var(--c-surface-2);
      box-shadow: inset 0 0 0 1px var(--c-line); font: 500 13px var(--mono); color: var(--c-text); white-space: nowrap; }
    .fb-tgt b { font: 600 10.5px var(--sans); letter-spacing: .06em; text-transform: uppercase; color: var(--c-muted); }
    .fb-tgt.more { font: 500 13px var(--sans); color: var(--c-muted); }

    /* the page header: the system's name, its bundle's state and one line of facts */
    .fb-head { height: 36px; display: flex; align-items: center; gap: 14px; }
    .fb-head h2 { margin: 0; font: 600 22px/1 var(--sans); letter-spacing: -.01em; }
    .fb-head .meta { margin-left: auto; display: flex; align-items: center; gap: 10px; font: 500 14px var(--sans); color: var(--c-muted); white-space: nowrap; }
    .fb-head .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .fb-head .fp-chip svg { width: 11px; height: 11px; }

    /* the rail of versions */
    .fb-rail { overflow: hidden; }
    .fb-rail .hd { height: 40px; padding: 13px 16px 0; font-size: 13px; color: var(--c-muted); border-bottom: 1px solid var(--c-line); }
    .fb-rail .it { box-sizing: border-box; padding: 12px 16px 11px; min-height: 66px; border-bottom: 1px solid var(--c-line); }
    .fb-rail .it.on { background: var(--c-gold-bg); }
    .fb-rail .it.ghost { border: 1px dashed var(--c-line); border-radius: 8px; margin: 8px; height: 58px; padding-top: 9px; opacity: .55; }
    .fb-rail .it .t { display: flex; align-items: center; gap: 10px; font: 600 16px/1 var(--sans); }
    .fb-rail .it .m { margin-top: 7px; font: 500 13px/1.2 var(--sans); color: var(--c-muted); }

    /* the rows */
    .fb-rows > * { position: absolute; }
    .fb-row { left: 0; width: 100%; display: grid; grid-template-columns: 30px minmax(0, 1fr) auto; align-items: center; align-content: start; gap: 16px; padding: 0 18px;
      border-radius: 10px; background: var(--c-surface); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), var(--c-line));
      overflow: hidden; --g: 0; }
    .fb-row .n { font: 600 14px var(--sans); color: var(--c-faint); font-variant-numeric: tabular-nums; }
    .fb-row .s { font: 500 18px/1.25 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .fb-row .r { display: flex; align-items: center; gap: 8px; }
    .fb-row .tg { display: flex; align-items: center; gap: 6px; opacity: 0; }
    .fb-row .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; }
    .fb-row .fp-chip svg { width: 11px; height: 11px; }
    .fb-row .det { position: absolute; left: 64px; right: 18px; height: 0; display: flex; align-items: center; gap: 10px; font: 500 14px var(--sans); color: var(--c-muted); opacity: 0; white-space: nowrap; }

    /* the ring */
    .fb-ring svg { position: absolute; left: 0; top: 0; overflow: visible; }
    .fb-ring .base { fill: none; stroke: var(--c-line); stroke-width: 8; }
    .fb-ring .arc { fill: none; stroke-width: 2.4; stroke: var(--c-faint); }
    .fb-ring .arc.done { stroke: var(--c-green); } .fb-ring .arc.now { stroke: var(--c-gold); }
    .fb-ring .arc.amend { stroke-dasharray: 3 5; opacity: .6; }
    .fb-ring .ah { fill: var(--c-faint); } .fb-ring .ah.done { fill: var(--c-green); } .fb-ring .ah.now { fill: var(--c-gold); }
    .fb-ring .node .c { fill: var(--c-surface); stroke: var(--c-line); stroke-width: 1.5; }
    .fb-ring .node.done .c { fill: #15241a; stroke: var(--c-green); }
    .fb-ring .node.now .c { fill: #2a2412; stroke: var(--c-gold); stroke-width: 2.5; }
    .fb-ring .halo { fill: none; stroke: var(--c-gold); stroke-width: 2; }
    .fb-ring .node .n { fill: var(--c-text); font: 600 15px var(--sans); }
    .fb-ring .node.idle .n { fill: var(--c-muted); font-weight: 500; }
    .fb-ring .node .s { fill: var(--c-muted); font: 500 12px var(--sans); }
    .fb-ring .node.done .s { fill: var(--c-green); } .fb-ring .node.now .s { fill: var(--c-gold-text); }
    .fb-ring .big { fill: var(--c-text); font: 600 40px var(--sans); letter-spacing: -.02em; }
    .fb-ring .small { fill: var(--c-muted); font: 500 14px var(--sans); }
    .fb-ring .al { fill: var(--c-faint); font: 500 12px var(--sans); }

    /* the Prepare steps */
    .fb-steps { display: flex; justify-content: space-between; }
    .fb-steps .st { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 80px; font: 500 14px var(--sans); color: var(--c-muted); }
    .fb-steps .st i { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--c-faint); }
    .fb-steps .st.done i { background: var(--c-green); box-shadow: none; }
    .fb-steps .st.now i { background: var(--c-gold); box-shadow: 0 0 0 4px var(--c-gold-bg); }
    .fb-steps .st.done, .fb-steps .st.now { color: var(--c-text); }

    /* the readiness rows */
    .fb-ready > * { position: absolute; left: 20px; right: 20px; }
    .fb-ready .hd { top: 16px; display: flex; align-items: baseline; gap: 10px; font: 600 16px var(--sans); }
    .fb-ready .hd span { margin-left: auto; font: 500 13px var(--sans); color: var(--c-muted); }
    .fb-ready .rr { height: 56px; display: grid; grid-template-columns: 150px minmax(0, 1fr) 90px 92px; gap: 16px; align-items: center; border-top: 1px solid var(--c-line); }
    .fb-ready .rr .k { font: 500 15px/1.15 var(--sans); color: var(--c-text); }
    .fb-ready .rr .k small { display: block; font-size: 12px; color: var(--c-faint); margin-top: 2px; }
    .fb-ready .rr .bar { height: 10px; border-radius: 999px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); overflow: hidden; }
    .fb-ready .rr .bar i { display: block; height: 100%; width: 0; background: var(--c-green); opacity: .85; }
    .fb-ready .rr .v { text-align: right; font: 500 14px var(--sans); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .fb-ready .rr .c { display: flex; justify-content: flex-end; }
    .fb-ready .rr .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .fb-ready .rr .fp-chip svg { width: 11px; height: 11px; }

    /* the signer */
    .fb-signer > * { position: absolute; }
    .fb-signer .sec { top: 20px; bottom: 64px; padding: 20px 22px; border-radius: 10px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); --g: 0;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), var(--c-line)); }
    .fb-signer .sec > * { position: relative; }
    .fb-signer .sec .who { margin-top: 10px; font: 600 22px/1.1 var(--sans); letter-spacing: -.01em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); }
    .fb-signer .sec .kv { margin-top: 18px; display: grid; grid-template-columns: 150px 1fr; row-gap: 9px; font: 500 14px/1.3 var(--sans); color: var(--c-muted); }
    .fb-signer .sec .kv b { color: var(--c-text); font-weight: 500; }
    .fb-signer .sec .btn { position: absolute; left: 22px; bottom: 20px; display: inline-flex; align-items: center; height: 36px; padding: 0 16px; border-radius: 8px;
      background: var(--c-gold-bg); color: var(--c-gold-text); box-shadow: inset 0 0 0 1px var(--c-gold-ring); font: 500 14px var(--sans); }
    .fb-signer .sec .stamp { position: absolute; right: 22px; bottom: 16px; opacity: 0; transform-origin: 50% 50%; }
    .fb-signer .foot { left: 22px; right: 22px; bottom: 18px; height: 30px; display: flex; align-items: center; gap: 12px; font: 500 14px var(--sans); color: var(--c-muted); }
    .fb-signer .foot .reh { margin-left: auto; display: flex; align-items: center; gap: 10px; opacity: 0; color: var(--c-text); }
    .fb-signer .foot .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .fb-signer .foot .fp-chip svg { width: 11px; height: 11px; }

    /* the verdict ticks */
    .fb-ticks { display: flex; align-items: flex-end; gap: 4px; }
    .fb-ticks i { flex: 1; height: 100%; border-radius: 3px; background: var(--c-line); }
    .fb-ticks i.Upheld { background: var(--green); } .fb-ticks i.Breached { background: var(--red); }
    .fb-ticks i.Held { background: var(--yellow); }
  `);

  const px = (v) => `${v}px`;
  const typed = (kind, name) => `<span class="fb-tgt"><b>${kind}</b>${name}</span>`;
  const more = (n, kind) => `<span class="fb-tgt more">+${n} ${kind}${n === 1 ? '' : 's'}</span>`;

  function rail(parent, { x = 0, y = 0, w = 220, items = [], on = 0 }) {
    const r = M.mount(parent, `<div class="fb fb-panel fb-rail" style="left:${px(x)};top:${px(y)};width:${px(w)}"><div class="hd">Bundles</div>${items.map((it, i) =>
      `<div class="it${it.ghost ? ' ghost' : ''}${i === on ? ' on' : ''}" data-k="i${i}"><div class="t"><span data-k="v${i}">${it.v}</span><span data-k="c${i}">${it.chip ? Film.chip(it.chip) : ''}</span></div><div class="m" data-k="m${i}">${it.line || ''}</div></div>`).join('')}</div>`);
    const list = items.map((_, i) => ({ root: r['i' + i], v: r['v' + i], chip: r['c' + i], line: r['m' + i] }));
    return {
      el: r.root, items: list,
      select(i) { list.forEach((it, k) => it.root.classList.toggle('on', k === i)); },
      show(i, o) { list[i].root.style.opacity = M.clamp(o).toFixed(3); },
    };
  }

  function rows(parent, { x = 0, y = 0, w = 1045, items = Film.BUNDLE, h = 60, gap = 8, mark } = {}) {
    const el = M.mount(parent, `<div class="fb fb-rows" style="left:${px(x)};top:${px(y)};width:${px(w)}"></div>`).root;
    const list = items.map((it, i) => {
      const tg = TARGETS[it.id] || [];
      const [first, ...rest] = tg;
      const r = M.mount(el, `<div class="fb-row" style="height:${px(h)};grid-template-rows:${px(h)}"><span class="n">${i + 1}</span><span class="s" data-k="s">${it.s}</span>
        <span class="r"><span class="tg" data-k="tg">${first ? typed(first[0], first[1]) : ''}${rest.length ? more(rest.length, rest[0][0]) : ''}</span><span data-k="kind">${Film.chip(it.kind)}</span>${mark ? mark(it) : ''}</span>
        <div class="det" data-k="det"></div></div>`);
      r.exp = 0; r.item = it;
      return r;
    });
    const api = {
      el, rows: list, height: items.length * (h + gap) - gap,
      glow(i, g) { list[i].root.style.setProperty('--g', M.clamp(g).toFixed(3)); },
      show(i, o) { list[i].root.style.opacity = M.clamp(o).toFixed(3); },
      targets(o) { list.forEach((r) => (r.tg.style.opacity = M.clamp(o).toFixed(3))); },
      detail(i, html) { const d = list[i].det; d.innerHTML = html; d.style.top = px(h); d.style.height = px(h); },
      expand(i, p) { list[i].exp = M.clamp(p); api.layout(); },
      layout() {
        let top = 0;
        list.forEach((r) => {
          const extra = r.exp * h;
          r.root.style.top = px(top.toFixed(2)); r.root.style.height = px((h + extra).toFixed(2));
          r.det.style.opacity = r.exp.toFixed(3);
          top += h + extra + gap;
        });
        api.height = top - gap;
      },
    };
    api.layout();
    return api;
  }

  function ring(parent, { x = 0, y = 0, size = 300 } = {}) {
    const el = M.mount(parent, `<div class="fb fb-ring" style="left:${px(x)};top:${px(y)};width:${px(size)};height:${px(size)}"></div>`).root;
    const C = 160, R = 108, NODE = 42;
    const pt = (deg, r = R) => { const a = ((deg - 90) * Math.PI) / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };
    const svg = M.svg('svg', { viewBox: '0 0 320 320', width: size, height: size }, el);
    M.svg('circle', { cx: C, cy: C, r: R, class: 'base' }, svg);
    const gap = (((NODE + 8) / R) * 180) / Math.PI;
    const arcs = PHASES.map((_, i) => {
      const from = i * 120 + gap, to = (i + 1) * 120 - gap;
      const [x1, y1] = pt(from), [x2, y2] = pt(to);
      const path = M.svg('path', { d: `M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)}`, class: 'arc' + (i === 2 ? ' amend' : '') }, svg);
      const [hx, hy] = pt(to), [bx, by] = pt(to - 5, R - 6), [cx, cy] = pt(to - 5, R + 6);
      const head = M.svg('path', { d: `M${hx},${hy} L${bx},${by} L${cx},${cy} Z`, class: 'ah' }, svg);
      return { path, head };
    });
    const [lx, ly] = pt(300, R + 26);
    M.svg('text', { x: lx, y: ly + 4, class: 'al', 'text-anchor': 'middle' }, svg).textContent = 'Amend';
    const nodes = PHASES.map((name, i) => {
      const [nx, ny] = pt(i * 120);
      const g = M.svg('g', { class: 'node idle' }, svg);
      const halo = M.svg('circle', { cx: nx, cy: ny, r: NODE, class: 'halo' }, g);
      M.svg('circle', { cx: nx, cy: ny, r: NODE, class: 'c' }, g);
      M.svg('text', { x: nx, y: ny - 1, class: 'n', 'text-anchor': 'middle' }, g).textContent = name;
      const s = M.svg('text', { x: nx, y: ny + 16, class: 's', 'text-anchor': 'middle' }, g);
      return { g, halo, s };
    });
    const big = M.svg('text', { x: C, y: C + 6, class: 'big', 'text-anchor': 'middle' }, svg);
    const small = M.svg('text', { x: C, y: C + 30, class: 'small', 'text-anchor': 'middle' }, svg);
    const cls = (n, c) => { if (n.getAttribute('class') !== c) n.setAttribute('class', c); };
    const txt = (n, s) => { if (n.textContent !== s) n.textContent = s; };
    return {
      el,
      /** the rect of a phase's node, in the page's px: [x, y, w, h] */
      node(i) { const [nx, ny] = pt(i * 120), k = size / 320; return [x + (nx - NODE - 4) * k, y + (ny - NODE - 4) * k, (NODE + 4) * 2 * k, (NODE + 4) * 2 * k]; },
      /** phase 0 Prepare, 1 Sign, 2 In force; steps finished in Prepare (0..4); pulse 0..1 on the live clock. */
      set({ phase = 0, steps = 0, pulse = 0, version = 'v1', line = 'draft' }) {
        nodes.forEach((n, i) => {
          const st = i < phase ? 'done' : i === phase ? 'now' : 'idle';
          cls(n.g, 'node ' + st);
          n.halo.setAttribute('r', (NODE + 2 + 10 * pulse).toFixed(2));
          n.halo.style.opacity = st === 'now' ? (0.6 * (1 - pulse)).toFixed(3) : 0;
          txt(n.s, i === 0 ? (phase > 0 ? '4 of 4' : `${steps} of 4`) : i === 1 ? (phase > 1 ? '2 of 2' : phase === 1 ? '0 of 2' : '') : phase === 2 ? version : '');
        });
        arcs.forEach((a, i) => {
          const s = i === 2 ? 'amend' : i + 1 < phase ? 'done' : i + 1 === phase ? 'now' : '';
          cls(a.path, 'arc ' + s); cls(a.head, 'ah ' + (i === 2 ? '' : s));
        });
        txt(big, version); txt(small, line);
      },
    };
  }

  function steps(parent, { x = 0, y = 0, w = 300 } = {}) {
    const r = M.mount(parent, `<div class="fb fb-steps" style="left:${px(x)};top:${px(y)};width:${px(w)}">${STEPS.map((s, i) => `<div class="st" data-k="s${i}"><i></i><span>${s}</span></div>`).join('')}</div>`);
    const items = STEPS.map((_, i) => ({ root: r['s' + i] }));
    return {
      el: r.root, items,
      set(done, now = -1) { items.forEach((it, i) => { it.root.className = 'st' + (i < done ? ' done' : i === now ? ' now' : ''); }); },
    };
  }

  function ready(parent, { x = 0, y = 0, w = 669, h = 436, pitch = 68 } = {}) {
    const r = M.mount(parent, `<div class="fb fb-panel fb-ready" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)}"><div class="hd">Prepare<span data-k="cap"></span></div>${READY.map(([k, sub], i) =>
      `<div class="rr" style="top:${px(58 + i * pitch)};height:${px(pitch)}" data-k="r${i}"><span class="k">${k}<small>${sub}</small></span><span class="bar"><i data-k="f${i}"></i></span><span class="v" data-k="v${i}"></span><span class="c" data-k="c${i}"></span></div>`).join('')}</div>`);
    const list = READY.map((_, i) => ({ root: r['r' + i], fill: r['f' + i], v: r['v' + i], chip: r['c' + i], word: null }));
    return {
      el: r.root, rows: list, cap: r.cap,
      set(i, { p = 0, value = '', chip = 'Waiting' }) {
        const row = list[i];
        row.fill.style.width = (100 * M.clamp(p)).toFixed(2) + '%';
        if (row.v.textContent !== value) row.v.textContent = value;
        if (row.word !== chip) { row.chip.innerHTML = Film.chip(chip); row.word = chip; }
      },
    };
  }

  function signer(parent, { x = 0, y = 0, w = 1045, h = 372 } = {}) {
    const SEC = [
      { eb: 'Matrix of controls', who: 'Risk team', kv: [['Commitments', '6, each tied to its component'], ['Decided', '6 of 6'], ['Signs', 'the matrix']], btn: 'Sign as risk team' },
      { eb: 'Enterprise section', who: 'Control owner', kv: [['Baseline', 'Starter set'], ['Risk profile', '4 facts'], ['Code inventory', 'read today']], btn: 'Sign as control owner' },
    ];
    const sw = (w - 22 * 2 - 16) / 2;
    const r = M.mount(parent, `<div class="fb fb-panel fb-signer" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)}">${SEC.map((s, i) =>
      `<div class="sec" style="left:${px(22 + i * (sw + 16))};width:${px(sw)}" data-k="s${i}"><div class="fb-eb">${s.eb}</div><div class="who">${s.who}</div>
        <div class="kv">${s.kv.map(([k, v]) => `<span>${k}</span><b>${v}</b>`).join('')}</div>
        <span class="btn" data-k="b${i}">${s.btn}</span><span class="stamp" data-k="st${i}">${Film.chip('Signed', { big: true })}</span></div>`).join('')}
      <div class="foot"><span>One person may sign both sections.</span><span class="reh" data-k="reh">${Film.chip('Rehearsal')}<span>Signed on this computer</span></span></div></div>`);
    const sections = SEC.map((_, i) => ({ root: r['s' + i], btn: r['b' + i], stamp: r['st' + i] }));
    return {
      el: r.root, sections, reh: r.reh,
      /** p 0..1: the stamp lands (scale 1.8 -> 1, fading in); the button dims once it has landed. */
      stamp(i, p) {
        const s = sections[i], q = M.clamp(p);
        s.stamp.style.opacity = Math.min(1, q * 2.5).toFixed(3);
        s.stamp.style.transform = `scale(${(1.8 - 0.8 * M.ease.outCubic(q)).toFixed(3)}) rotate(${(-6 + 6 * M.ease.outCubic(q)).toFixed(2)}deg)`;
        s.btn.style.opacity = (1 - 0.6 * q).toFixed(3);
      },
      rehearsal(o) { r.reh.style.opacity = M.clamp(o).toFixed(3); },
    };
  }

  function head(parent, { x = 244, y = 0, w = 1045, name = Film.SYSTEM.name, chip = 'Draft', meta = '' } = {}) {
    const r = M.mount(parent, `<div class="fb fb-head" style="left:${px(x)};top:${px(y)};width:${px(w)}"><h2>${name}</h2><span data-k="chip">${Film.chip(chip)}</span><span class="meta" data-k="meta">${meta}</span></div>`);
    return { el: r.root, chip: r.chip, meta: r.meta };
  }

  function ticks(parent, { x = 0, y = 0, w = 400, n = 24, h = 26 } = {}) {
    const el = M.mount(parent, `<div class="fb fb-ticks" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)}">${'<i></i>'.repeat(n)}</div>`).root;
    const list = [...el.children];
    return {
      el, ticks: list,
      set(words) { list.forEach((i, k) => { const c = words[k] || ''; if (i.className !== c) i.className = c; }); },
    };
  }

  Film.board = { TARGETS, AGENTS, STEPS, PHASES, READY, typed, head, rail, rows, ring, steps, ready, signer, ticks };
})();
