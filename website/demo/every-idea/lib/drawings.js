/* The large drawings of the four-minute film. Each shows one thing the product does, drawn and never captured
   from a screen. The cards stand beside the factory line: the Akka components and the systems composed from
   them, a system inside the runtime's outline, the exit conditions, the receipt, and one system on a laptop and
   in production. The pictures stand inside the runtime band: the running system, the controls, the receipts of
   each change, and the places a system runs. Every one is a plain function of the state the slide passes in. */
(function () {
  const M = window.Mock;
  const Y = '#FFCE4A', INK = '#F1F1F1', INK2 = '#CFCFCF', INK3 = '#A6A6A6', GREEN = '#72D35B';
  const c01 = (x) => Math.min(1, Math.max(0, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const io = (x) => { x = c01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  // A stroke with pathLength 1 draws from nothing to whole as u goes from 0 to 1.
  const drawn = (el, u) => { el.style.strokeDashoffset = (1 - c01(u)).toFixed(4); };
  const show = (el, a, dy = 0) => { el.style.opacity = c01(a).toFixed(3); if (dy) el.style.transform = `translateY(${((1 - c01(a)) * dy).toFixed(1)}px)`; };
  const all = (el, sel) => [...el.querySelectorAll(sel)];
  const caps = (x, y, t, colour, size = 19, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="600" letter-spacing="${(size * 0.14).toFixed(1)}" fill="${colour}">${t.toUpperCase()}</text>`;

  M.style('ei-drawings', `
    .dw svg, .bd svg { display: block; overflow: visible; }
    .dw svg text, .bd svg text { font-family: var(--sans); }
    .dw [pathLength], .bd [pathLength] { stroke-dasharray: 1; }
    .dw .gl, .bd .gl { fill: none; stroke: var(--ink); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
    .dw .ed, .bd .ed { stroke: var(--ink-3); stroke-width: 1.25; fill: none; }
    .dw .cap { margin-top: 16px; text-align: center; font: 500 22px/1.2 var(--sans); color: var(--ink-2); }
    .dw .cnt { font: 700 26px/1 var(--sans); letter-spacing: -.01em; color: var(--ink) !important; }
    .dw .mrow { display: flex; align-items: center; height: 44px; border-top: 1px solid var(--line-2); font: 500 21px/1 var(--sans); color: var(--ink-2); }
    .dw .mrow.first { margin-top: 16px; }
    .dw .mrow b { width: 44px; font: 700 23px/1 var(--sans); color: var(--ink); }
    .dw .mrow span { width: 344px; white-space: nowrap; }
    .dw .pick { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line-2); white-space: nowrap; }
    .dw .pick b { display: block; font: 600 18px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
    .dw .pick code { display: inline-block; margin-top: 9px; font: 500 19px/1.2 var(--mono); color: var(--ink); }
    .dw .pick span { margin-left: 16px; font: 500 20px/1.2 var(--sans); color: var(--ink-2); }
    .dw.rcp { border-color: rgba(255, 206, 74, .7); }
    .dw.rcp .ph b { color: var(--yellow); }
    .dw.rcp .big { margin-top: 44px; font: 700 76px/1 var(--sans); letter-spacing: -.04em; color: var(--ink); }
    .dw.rcp .rrow { display: flex; align-items: baseline; height: 62px; border-top: 1px solid var(--line-2); font: 500 26px/62px var(--sans); color: var(--ink); }
    .dw.rcp .rrow.first { margin-top: 40px; }
    .dw.rcp .rrow span { width: 200px; font: 600 20px/62px var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
    .bd { position: absolute; left: 0; top: 0; width: 1920px; height: 350px; }
    .bd > * { position: absolute; }
    .bd .bl { left: 90px; top: 30px; display: flex; gap: 18px; align-items: baseline; font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; white-space: nowrap; }
    .bd .bl b { font-weight: 600; color: var(--yellow); }
    .bd .bl span { color: var(--ink-3); }
    .bd .nm { font: 500 24px/1 var(--sans); color: var(--ink); white-space: nowrap; }
    .bd .lb { font: 600 21px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink); white-space: nowrap; transform: translateX(-50%); }
  `);

  /* ---------- the Akka components, each as its own shape in a 30 x 30 box ---------- */
  const GLYPH = {
    agent: '<path d="M15 2L26.3 8.5V21.5L15 28L3.7 21.5V8.5Z"/>',
    workflow: '<circle cx="5" cy="15" r="3.5"/><circle cx="15" cy="15" r="3.5"/><circle cx="25" cy="15" r="3.5"/><path d="M8.5 15H11.5M18.5 15H21.5"/>',
    entity: '<ellipse cx="15" cy="7" rx="10" ry="4"/><path d="M5 7V23c0 2.2 4.5 4 10 4s10-1.8 10-4V7"/>',
    view: '<rect x="3" y="5" width="24" height="20" rx="3"/><path d="M3 12H27M11 12V25"/>',
    consumer: '<path d="M3 15H19M14 9l6 6l-6 6M25 5V25"/>',
    timer: '<circle cx="15" cy="15" r="11"/><path d="M15 9V15L19 18"/>',
    endpoint: '<path d="M3 15H16"/><circle cx="22" cy="15" r="6"/>',
  };
  const KINDS = Object.keys(GLYPH);
  const NAMES = { agent: 'Agent', workflow: 'Workflow', entity: 'Entity', view: 'View', consumer: 'Consumer', timer: 'Timer', endpoint: 'Endpoint' };
  const glyph = (kind, x, y, size = 30) => `<g class="gl" transform="translate(${x - size / 2} ${y - size / 2}) scale(${size / 30})">${GLYPH[kind]}</g>`;
  // A system is nodes [kind, x, y, name] and edges between node indices. The Loan Origination system's nodes
  // and edges are the sample's own: the entity's events start both workflows, and each workflow calls its agent.
  const LOAN = { nodes: [['view', 100, 0, 'Applications by status'], ['entity', 290, 0, 'Loan application'], ['workflow', 478, 0, 'Underwriting'],
    ['agent', 100, 104, 'Notice writer'], ['workflow', 290, 104, 'Notice preparation'], ['agent', 478, 104, 'Eligibility assessor']],
    edges: [[1, 0], [1, 2], [1, 4], [2, 5], [4, 3]], order: [3, 0, 1, 5, 4, 2] };      // order: when each node arrives
  const FRAUD = { nodes: [['consumer', 14, 0], ['agent', 94, 0], ['entity', 174, 0], ['view', 174, 52], ['timer', 94, 52]], edges: [[0, 1], [1, 2], [2, 3], [1, 4]] };
  const CLAIMS = { nodes: [['endpoint', 14, 0], ['workflow', 94, 0], ['agent', 174, 0], ['agent', 174, 52], ['entity', 94, 52], ['consumer', 14, 52]], edges: [[0, 1], [1, 2], [1, 3], [1, 4], [5, 4]] };
  const edge = (sys, [a, b], size, named, dx, dy, sx = 1, sy = 1) => {
    const [, ax, ay] = sys.nodes[a], [, bx, by] = sys.nodes[b];
    const x1 = dx + ax * sx, y1 = dy + ay * sy, x2 = dx + bx * sx, y2 = dy + by * sy, k = (size * 0.72) / Math.hypot(x2 - x1, y2 - y1);
    // An edge that leaves a named node downward starts under the name.
    const from = named && x1 === x2 ? [x1, y1 + size / 2 + 38] : [x1 + (x2 - x1) * k, y1 + (y2 - y1) * k];
    return `<path class="ed" pathLength="1" d="M${from[0]} ${from[1]}L${x2 - (x2 - x1) * k} ${y2 - (y2 - y1) * k}"/>`;
  };
  /** A whole system as one group, with no names: its nodes at (dx + x * sx, dy + y * sy). */
  const mini = (sys, dx, dy, size, sx = 1, sy = 1) => sys.edges.map((e) => edge(sys, e, size, false, dx, dy, sx, sy)).join('') +
    sys.nodes.map(([kind, x, y]) => `<g class="nd">${glyph(kind, dx + x * sx, dy + y * sy, size)}</g>`).join('');
  const card = (root, cls, head, body) => { const el = M.html(`<div class="ei-panel dw ${cls}"><div class="ph">${head}</div>${body}</div>`); root.appendChild(el); return el; };

  /* ---------- the components, and the systems composed from them ---------- */
  function components(root) {
    const SX = 200, LY = 74;                 // the systems stand to the right of the shelf
    const shelf = KINDS.map((k, i) => `<g class="sh">${glyph(k, 15, 30 + 58 * i)}<text x="46" y="${37 + 58 * i}" font-size="21" font-weight="500" fill="${INK2}">${NAMES[k]}</text></g>`).join('');
    const loan = LOAN.edges.map((e) => edge(LOAN, e, 34, true, SX, LY)).join('') + LOAN.nodes.map(([kind, x, y, name]) =>
      `<g class="fl">${glyph(kind, SX + x, LY + y, 34)}<text x="${SX + x}" y="${LY + y + 43}" text-anchor="middle" font-size="19" font-weight="500" fill="${INK2}">${name}</text></g>`).join('');
    const other = (sys, name, x) => `<g class="ot"><text x="${x}" y="306" font-size="20" font-weight="600" fill="${INK2}">${name}</text>${mini(sys, x, 342, 24)}</g>`;
    const el = card(root, '', '<b>Akka components</b>', `<svg width="764" height="440" viewBox="0 0 764 440" style="margin-top:18px">${shelf}
      <text class="lt" x="${SX}" y="24" font-size="23" font-weight="600" fill="${INK}">Loan origination</text>${loan}
      <path class="dv" d="M${SX} 270H764" stroke="rgba(241,241,241,.16)"/>${other(FRAUD, 'Fraud monitoring', SX)}${other(CLAIMS, 'Claims processing', SX + 300)}</svg>`);
    const sh = all(el, '.sh'), fl = all(el, '.fl'), ed = all(el, 'svg > .ed'), ot = all(el, '.ot'), lt = el.querySelector('.lt'), dv = el.querySelector('.dv');
    // A node leaves its own shape on the shelf and flies to its place in the system.
    const from = LOAN.nodes.map(([kind, x, y]) => [15 - (SX + x), 30 + 58 * KINDS.indexOf(kind) - (LY + y)]);
    /** shelf: the shapes appearing in turn; loan: the Loan Origination system assembling; others: the two other systems. */
    function set(st) {
      sh.forEach((g, i) => show(g, st.shelf * 7 - i));
      show(lt, st.loan * 6);
      fl.forEach((g, i) => {
        const u = io(st.loan * 7.4 - LOAN.order[i]);
        g.style.opacity = c01(st.loan * 7.4 - LOAN.order[i]) > 0 ? 1 : 0;
        g.style.transform = `translate(${(from[i][0] * (1 - u)).toFixed(1)}px, ${(from[i][1] * (1 - u)).toFixed(1)}px)`;
        g.lastChild.style.opacity = c01(u * 4 - 3);
      });
      ed.forEach((p, i) => drawn(p, st.loan * 7.4 - Math.max(LOAN.order[LOAN.edges[i][0]], LOAN.order[LOAN.edges[i][1]]) - 0.8));
      show(dv, st.others * 4);
      ot.forEach((g, m) => {
        const base = st.others * 2 - m;
        show(g.firstChild, base * 4);
        all(g, '.nd').forEach((n, j) => show(n, base * 8 - j));
        all(g, '.ed').forEach((p, j) => drawn(p, base * 8 - j - 1.5));
      });
    }
    return { el, set };
  }

  /* ---------- the system inside the runtime's outline ---------- */
  function inherit(root) {
    const el = card(root, '', '<b>Loan origination</b>', `<svg width="764" height="350" viewBox="0 0 764 350" style="margin-top:22px">
        <rect class="ol" x="1" y="1" width="762" height="300" rx="14" fill="none" stroke="${Y}" stroke-width="1.5" pathLength="1"/>
        <g class="sy">${LOAN.edges.map((e) => edge(LOAN, e, 34, true, 92, 92)).join('')}${LOAN.nodes.map(([kind, x, y, name]) =>
          glyph(kind, 92 + x, 92 + y, 34) + `<text x="${92 + x}" y="${92 + y + 43}" text-anchor="middle" font-size="19" font-weight="500" fill="${INK2}">${name}</text>`).join('')}</g>
        <g class="rl">${caps(382, 338, 'Akka runtime', Y)}</g></svg>
      <div class="cap">Every component inherits these from the runtime.</div>`);
    const ol = el.querySelector('.ol'), sy = el.querySelector('.sy'), rl = el.querySelector('.rl'), cap = el.querySelector('.cap');
    all(sy, '.ed').forEach((p) => drawn(p, 1));
    /** p: the outline drawing round the system; cap: the sentence. */
    function set(st) { show(sy, st.p * 5); drawn(ol, st.p * 1.5 - 0.2); show(rl, st.p * 3 - 2); show(cap, st.cap, 10); }
    return { el, set };
  }

  /* ---------- the exit conditions, grouped as the console groups them by how each is checked ---------- */
  const GROUPS = [[3, 'Guaranteed by the runtime', Y], [13, 'Runs a command', GREEN], [12, 'Reads project files', GREEN], [2, 'Drives the UI in a browser', GREEN],
    [2, 'Probes the running service', GREEN], [3, 'Reads a scan, CI or usage record', GREEN], [1, 'Reads a review record', 'person'], [4, 'Other auditors', GREEN]];
  const PICK = [1, 8];                     // the condition the enterprise set: its group and its place in the group
  function matrix(root) {
    const cell = (c, i) => c === 'person'
      ? `<g class="c" transform="translate(${15 + 29 * i} 15)" fill="none" stroke="${INK3}" stroke-width="1.75"><circle cx="0" cy="-5" r="4.5"/><path d="M-9 10c0-5 4-8 9-8s9 3 9 8"/></g>`
      : `<circle class="c" cx="${15 + 29 * i}" cy="15" r="10" fill="none" stroke="${INK3}" stroke-width="1.5"/>`;
    const el = card(root, '', '<b>Exit conditions</b><span class="cnt"></span>', GROUPS.map(([n, label, c], g) =>
      `<div class="mrow${g ? '' : ' first'}"><b>${n}</b><span>${label}</span><svg width="376" height="30">${Array.from({ length: n }, (_, i) => cell(c, i)).join('')}${
        g === PICK[0] ? `<circle class="pk" cx="${15 + 29 * PICK[1]}" cy="15" r="14" fill="none" stroke="${Y}" stroke-width="1.5"/>` : ''}</svg></div>`).join('') +
      '<div class="pick"><b>Set by the enterprise</b><code>LOAN-HUMAN-DECIDES-ADVERSE</code><span>No application is declined by the system.</span></div>');
    const rows = all(el, '.mrow'), cnt = el.querySelector('.cnt'), pk = el.querySelector('.pk'), pick = el.querySelector('.pick');
    const cells = rows.map((r) => all(r, '.c'));
    /** cells: the rows appearing; fill: one 0..1 for each group, its cells passing in turn; pick: the enterprise's condition. */
    function set(st) {
      let met = 0;
      rows.forEach((r, g) => {
        show(r, st.cells * 9 - g, 8);
        const colour = GROUPS[g][2] === 'person' ? GREEN : GROUPS[g][2];
        cells[g].forEach((c, j) => {
          const u = c01(st.fill[g] * cells[g].length - j), on = u >= 0.5;
          if (on) met++;
          if (GROUPS[g][2] === 'person') { c.setAttribute('stroke', on ? colour : INK3); return; }
          c.setAttribute('r', (10 * (1 + 0.3 * Math.sin(Math.PI * u))).toFixed(2));
          c.setAttribute('fill', on ? colour : 'none'); c.setAttribute('stroke', on ? colour : INK3);
        });
      });
      cnt.textContent = `${met} of 40`;
      show(cnt, st.cells * 3);
      pk.style.opacity = c01(st.pick * 3); pk.setAttribute('r', (14 + 8 * (1 - c01(st.pick * 3))).toFixed(1));
      show(pick, st.pick * 2 - 0.4, 10);
    }
    return { el, set };
  }

  /* ---------- the receipt ---------- */
  function receipt(root) {
    const rowsOf = [['Verified', '40 of 40 exit conditions'], ['Open', 'None'], ['Waivers', 'None']];
    const el = card(root, 'rcp', '<b>Receipt</b>', `<div class="big">Ready to ship</div>${rowsOf.map(([k, v], i) => `<div class="rrow${i ? '' : ' first'}"><span>${k}</span>${v}</div>`).join('')}`);
    const big = el.querySelector('.big'), rows = all(el, '.rrow');
    function set(st) { show(big, st.p * 3, 14); rows.forEach((r, i) => show(r, st.p * 4 - 1.2 - 0.6 * i, 10)); }
    return { el, set };
  }

  /* ---------- one system, on a laptop and in production ---------- */
  function same(root) {
    const el = card(root, '', '<b>One runtime</b>', `<svg width="764" height="430" viewBox="0 0 764 430" style="margin-top:14px">
      <g class="la">${caps(382, 40, 'Laptop', INK2)}</g><g class="pr">${caps(382, 40, 'Production', INK2)}</g>
      <rect class="fr" x="232" y="64" width="300" height="200" rx="12" fill="none" stroke="${INK}" stroke-width="1.5" pathLength="1"/>
      <path class="bs" d="M208 280H556" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>
      <path class="dv" d="M302 64V280M462 64V280" stroke="${INK3}" stroke-width="1.25" stroke-dasharray="5 6"/>
      <g class="sy">${mini(LOAN, 203, 132, 26, 0.62, 0.7)}</g>
      <g class="rl">${caps(382, 330, 'Akka runtime', Y)}</g>
      <text class="cp" x="382" y="398" text-anchor="middle" font-size="22" font-weight="500" fill="${INK2}">The system goes to production as it was built.</text></svg>`);
    const q = (s) => el.querySelector(s), fr = q('.fr');
    all(el, '.sy .ed').forEach((p) => drawn(p, 1));
    /** frame: the laptop drawing; morph: the laptop's outline opening into three replicas; cap: the sentence. */
    function set(st) {
      const m = io(st.morph);
      drawn(fr, st.frame * 1.4);
      fr.setAttribute('x', lerp(232, 142, m).toFixed(1)); fr.setAttribute('width', lerp(300, 480, m).toFixed(1)); fr.setAttribute('height', lerp(200, 216, m).toFixed(1));
      q('.bs').style.opacity = c01(st.frame * 2 - 1) * (1 - c01(st.morph * 3));
      q('.dv').style.opacity = c01(st.morph * 3 - 2);
      q('.la').style.opacity = c01(st.frame * 3) * (1 - c01(st.morph * 3));
      q('.pr').style.opacity = c01(st.morph * 3 - 1.5);
      show(q('.sy'), st.frame * 2 - 0.8); show(q('.rl'), st.frame * 2 - 1); show(q('.cp'), st.cap);
    }
    return { el, set };
  }

  /* ---------- pictures inside the runtime band, each 1920 x 350 ---------- */
  const picture = (inner, html) => { const el = M.html(`<div class="bd">${html}</div>`); inner.appendChild(el); return el; };
  const replica = (x, y, w, h, r) => `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="12" fill="none" stroke="${INK3}" stroke-width="1.5"/>` +
    [0, 1, 2, 3, 4, 5].map((s) => `<circle cx="${x + w / 2 + (w * 0.23) * ((s % 3) - 1)}" cy="${y + h / 2 + (h * 0.14) * (s < 3 ? -1 : 1)}" r="${r}" fill="${INK}"/>`).join('');

  // The Loan Origination system running on three replicas, and what production sends back.
  function running(inner) {
    const X = [660, 960, 1260];
    const el = picture(inner, `<div class="bl"><b>Akka runtime</b><span>Production</span></div>
      <div class="nm" style="left:530px;top:28px">Loan origination</div>
      <svg style="left:530px;top:74px" width="862" height="150">${[0, 300, 600].map((x) => replica(x, 0, 262, 150, 6.5)).join('')}</svg>
      ${['Traces', 'Evaluations', 'Cost'].map((t, k) => `<div class="lb out" style="left:${X[k]}px;top:262px;color:var(--ink-2)">${t}</div>
        <svg class="out" style="left:${X[k] - 1}px;top:226px" width="2" height="32"><path d="M1 0V32" stroke="${INK3}" stroke-width="1.25"/></svg>`).join('')}
      <svg class="col" style="left:0;top:296px" width="1920" height="54"><path d="M660 0V26Q660 40 674 40H932M1260 0V26Q1260 40 1246 40H988M960 0V54" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="3 13"/></svg>`);
    const outs = all(el, '.out'), col = el.querySelector('.col'), path = col.firstChild;
    /** a: the picture; labels: Traces, Evaluations and Cost in turn; collect: the streams gathering; phase: their motion. */
    function set(st) {
      el.style.opacity = c01(st.a);
      outs.forEach((o, i) => { o.style.opacity = c01(st.labels[Math.floor(i / 2)]); });
      col.style.opacity = c01(st.collect); path.style.strokeDashoffset = (-16 * st.phase).toFixed(2);
    }
    return { el, set };
  }

  // The same four things on the system at build time and in production.
  function controls(inner) {
    const WORDS = ['Security', 'Identity', 'Controls', 'Interaction model'], y = (i) => 108 + 50 * i;
    const box = (x, name) => `<g class="bx">${caps(x + 225, 46, name, INK2, 20)}<rect x="${x}" y="70" width="450" height="240" rx="14" fill="none" stroke="${INK}" stroke-width="1.5" pathLength="1"/>
      <g class="sy">${mini(LOAN, x + 225 - 289 * 0.8, 152, 28, 0.8, 0.74)}</g></g>`;
    const el = picture(inner, `<svg width="1920" height="350">${box(250, 'Build')}${box(1220, 'Production')}${WORDS.map((w, i) =>
      `<g class="wd">${caps(960, y(i) + 7, w, INK, 20)}<path d="M805 ${y(i)}H700M1115 ${y(i)}H1220" stroke="${Y}" stroke-width="1.5" fill="none" pathLength="1"/>
        <circle cx="700" cy="${y(i)}" r="4.5" fill="${Y}"/><circle cx="1220" cy="${y(i)}" r="4.5" fill="${Y}"/></g>`).join('')}</svg>`);
    const bx = all(el, '.bx'), wd = all(el, '.wd');
    all(el, '.sy .ed').forEach((p) => drawn(p, 1));
    /** a: the picture; boxes: the two systems drawing; words: one 0..1 for each of the four. */
    function set(st) {
      el.style.opacity = c01(st.a);
      bx.forEach((b, k) => { drawn(b.querySelector('rect'), st.boxes * 1.6 - 0.2 * k); show(b.querySelector('.sy'), st.boxes * 2 - 0.8); show(b.firstChild, st.boxes * 3); });
      wd.forEach((g, i) => { const u = st.words[i]; show(g.firstChild, u * 3); drawn(g.children[1], u * 1.6 - 0.3); g.children[2].style.opacity = g.children[3].style.opacity = c01(u * 4 - 3); });
    }
    return { el, set };
  }

  // Each change to the specification leaves a receipt, and one requirement is traced through them.
  function receipts(inner) {
    const cx = (i) => 360 + 300 * i, OPEN = [18, 0, 26, 0, 0], VER = [88, 70, 96, 62, 80];
    const one = (i) => { const x = cx(i) - 115, row = (k, name, len, colour) => `<text x="${x + 16}" y="${172 + 30 * k}" font-size="18" font-weight="500" fill="${INK2}">${name}</text>` +
        (len ? `<rect x="${x + 112}" y="${161 + 30 * k}" width="${len}" height="8" rx="4" fill="${colour}"/>` : `<path d="M${x + 112} ${165 + 30 * k}h14" stroke="${INK3}" stroke-width="1.5"/>`);
      return `<circle class="ch" cx="${cx(i)}" cy="92" r="6.5" fill="${INK}"/><g class="rc"><path d="M${cx(i)} 100V120" stroke="${INK3}" stroke-width="1.25"/>
        <rect x="${x}" y="120" width="230" height="140" rx="10" fill="#000" stroke="${Y}" stroke-width="1.25"/>${caps(x + 16, 146, 'Receipt', Y, 15, 'start')}
        ${row(0, 'Verified', VER[i], GREEN)}${row(1, 'Open', OPEN[i], INK3)}${row(2, 'Waivers', 0)}</g>`; };
    const T = [640, 1000, 1360];
    const el = picture(inner, `<div class="bl"><b>Specification</b><span>Each change</span></div>
      <svg width="1920" height="350"><path class="tl" d="M250 92H1670" stroke="${INK3}" stroke-width="1.25" pathLength="1" fill="none"/>${[0, 1, 2, 3, 4].map(one).join('')}
        <g class="tr">${caps(250, 319, 'A requirement', INK2, 19, 'start')}<path d="M500 312H${T[2]}" stroke="${Y}" stroke-width="1.5" pathLength="1" fill="none"/>
        ${['Asked', 'Implemented', 'Verified'].map((t, k) => `<g class="tn"><circle cx="${T[k]}" cy="312" r="7" fill="#000" stroke="${Y}" stroke-width="1.5"/><rect x="${T[k] + 14}" y="296" width="${t.length * 13 + 16}" height="32" fill="#000"/>
          <text x="${T[k] + 20}" y="320" font-size="23" font-weight="500" fill="${INK}">${t}</text></g>`).join('')}</g></svg>`);
    const ch = all(el, '.ch'), rc = all(el, '.rc'), tl = el.querySelector('.tl'), tr = el.querySelector('.tr'), tn = all(el, '.tn');
    /** a: the picture; changes and drops: one 0..1 for each change landing and each receipt falling; trace: 0..1. */
    function set(st) {
      el.style.opacity = c01(st.a);
      drawn(tl, Math.max(...st.changes) > 0 ? 1 : 0);
      ch.forEach((c, i) => { c.style.opacity = c01(st.changes[i] * 3); c.setAttribute('r', (6.5 * (1 + 0.5 * Math.sin(Math.PI * c01(st.changes[i])))).toFixed(2)); });
      rc.forEach((g, i) => { g.style.opacity = c01(st.drops[i] * 2); g.style.transform = `translateY(${((1 - io(st.drops[i])) * -22).toFixed(1)}px)`; });
      show(tr.firstChild, st.trace * 6); drawn(tr.children[1], st.trace * 1.15 - 0.1);
      tn.forEach((g, k) => show(g, st.trace * 1.15 * 3.6 - [0.5, 1.8, 3.3][k]));
    }
    return { el, set };
  }

  // The places a system runs.
  function places(inner) {
    const X = [110, 690, 1270], NAME = ['Akka cloud', 'Your datacenter', 'Sovereign cloud'];
    const el = picture(inner, `<svg width="1920" height="350">${X.map((x, k) => `<g class="pl">${caps(x + 270, 46, NAME[k], INK, 21)}
      <rect x="${x}" y="70" width="540" height="240" rx="14" fill="none" stroke="${INK}" stroke-width="1.5" pathLength="1"/>
      <g class="rp">${[0, 1, 2].map((r) => replica(x + 42 + 157 * r, 132, 142, 116, 4.5)).join('')}${caps(x + 270, 112, 'Akka runtime', Y, 16)}</g></g>`).join('')}</svg>`);
    const pl = all(el, '.pl');
    /** a: the picture; frames: one 0..1 for each place. */
    function set(st) {
      el.style.opacity = c01(st.a);
      pl.forEach((g, k) => { const u = st.frames[k]; show(g.firstChild, u * 3); drawn(g.children[1], u * 1.5); show(g.children[2], u * 2.4 - 1); });
    }
    return { el, set };
  }

  /** A person, as a mark of 24 x 24 beside a decision that a person makes. */
  const person = (colour = INK) => `<svg width="24" height="24" viewBox="-12 -12 24 24" fill="none" stroke="${colour}" stroke-width="1.75" stroke-linecap="round"><circle cx="0" cy="-5" r="4.5"/><path d="M-9 10c0-5 4-8 9-8s9 3 9 8"/></svg>`;

  window.Drawings = { components, inherit, matrix, receipt, same, running, controls, receipts, places, person };
})();
