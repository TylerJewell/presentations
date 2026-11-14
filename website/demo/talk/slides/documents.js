/* From documents to controls. A policy page; three of its sentences light up as the rules they really
   are; each becomes a typed control; the controls bind to the running system and start counting. */
registerSlide({
  id: 'documents',
  act: 'shape',
  title: 'From documents to controls',
  beats: [
    { t: 1.6, say: "The first shift is from documents to controls. Most AI governance today is written down. A policy, a risk assessment, a model card, a sign-off sheet in a shared drive." },
    { t: 3.8, say: "Read those documents closely and you find sentences that are really rules. A person must review every adverse decision. Customer data must not leave its region. Decisions must not rely on a protected characteristic." },
    { t: 6.4, say: "A control is one of those sentences turned into a check that runs. It's discrete: it either holds or it doesn't, and you can prove which." },
    { t: 9.0, say: "And it runs on the system itself, every time, not on a description of the system. A document says what should happen. A control makes it happen, and keeps the record that it did." },
  ],

  RULES: [
    { s: 'A person must review every adverse decision.', type: 'Human', name: 'An underwriter reviews adverse decisions', base: 1840, rate: 0.21 },
    { s: 'Customer data must not leave its region.', type: 'Guardrail', name: 'Data stays in its region', base: 48210, rate: 3.1 },
    { s: 'Decisions must not rely on a protected characteristic.', type: 'Evaluation', name: 'No protected characteristic in a decision', base: 18402, rate: 1.4 },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-doc');
    M.style('sl-doc', `
      .sl-doc .doc { left: 150px; top: 290px; width: 600px; height: 660px; padding: 40px 44px; display: flex; flex-direction: column; gap: 20px; }
      .sl-doc .doc > * { position: relative; }
      .sl-doc .doc .k { font: 600 22px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--ink-3); }
      .sl-doc .doc .dt { font: 700 40px/1.05 var(--sans); letter-spacing: -.02em; margin: -4px 0 10px; }
      .sl-doc .bar { height: 14px; border-radius: 7px; background: rgba(241,241,241,.17); }
      .sl-doc .sen { font: 500 31px/1.28 var(--sans); color: var(--ink); }
      .sl-doc .sen .hl { position: absolute; left: -10px; right: -10px; top: -4px; bottom: -4px; border-radius: 8px; background: rgba(255,206,74,.20); box-shadow: inset 0 0 0 2px rgba(255,206,74,.55); transform-origin: 0 50%; }
      .sl-doc .sen span { position: relative; }
      .sl-doc .ctl { left: 860px; width: 560px; height: 142px; padding: 24px 28px; display: grid; grid-template-columns: 64px minmax(0,1fr); column-gap: 22px; align-content: center; }
      .sl-doc .ctl svg { grid-row: span 2; width: 60px; height: 60px; overflow: visible; }
      .sl-doc .ctl svg path { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .sl-doc .ctl .ty { font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); align-self: end; margin-bottom: 10px; }
      .sl-doc .ctl .nm { font: 700 30px/1.12 var(--sans); letter-spacing: -.015em; color: var(--ink); }
      .sl-doc .run { left: 860px; width: 560px; height: 34px; display: flex; align-items: center; gap: 14px; font: 600 24px/1 var(--sans); color: var(--green); font-variant-numeric: tabular-nums; }
      .sl-doc .run i { width: 12px; height: 12px; border-radius: 50%; background: var(--green); }
      .sl-doc svg.lk { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-doc .lk .a { fill: none; stroke: rgba(255,206,74,.55); stroke-width: 2.5; stroke-dasharray: 6 8; }
      .sl-doc .lk .b { fill: none; stroke: rgba(241,241,241,.32); stroke-width: 2.5; }
      .sl-doc .lk .dot { fill: var(--yellow); }
      .sl-doc .sys { left: 1520px; top: 420px; width: 260px; height: 330px; padding: 30px 28px; display: flex; flex-direction: column; justify-content: space-between; }
      .sl-doc .sys .k { font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-doc .sys .nm { font: 700 40px/1.05 var(--sans); letter-spacing: -.02em; }
      .sl-doc .sys .live { display: flex; align-items: center; gap: 12px; font: 600 22px/1 var(--sans); color: var(--green); letter-spacing: .1em; text-transform: uppercase; }
      .sl-doc .sys .live i { width: 12px; height: 12px; border-radius: 50%; background: var(--green); }
      .sl-doc .sys .rq { font: 500 24px/1.3 var(--sans); color: var(--ink-2); font-variant-numeric: tabular-nums; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['From documents <span class="tk-y">to controls.</span>']);
    const parts = [];
    const bars = [[100], [92], [64]];
    let r = 0;
    parts.push('<div class="k">Policy · Lending systems</div><div class="dt">Responsible use of AI</div>');
    const seq = ['b', 's', 'b', 'b', 's', 'b', 's', 'b'];
    let bi = 0;
    seq.forEach((x) => {
      if (x === 'b') { const w = [100, 86, 94, 72, 90][bi++ % 5]; parts.push(`<div class="bar" style="width:${w}%"></div>`); }
      else { parts.push(`<div class="sen" data-k="s${r}"><div class="hl"></div><span>${this.RULES[r].s}</span></div>`); r++; }
    });
    this.doc = M.mount(root, `<div class="doc tk-card">${parts.join('')}</div>`);
    this.lk = M.html('<svg class="lk" viewBox="0 0 1920 1080"></svg>');
    root.appendChild(this.lk);
    this.ctl = this.RULES.map((d, i) => {
      const y = 300 + i * 214;
      const el = M.html(`<div class="ctl tk-card" style="top:${y}px"><svg viewBox="0 0 64 64">${Talk.GLYPH[d.type].map((p) => `<path d="${p}"/>`).join('')}</svg><div class="ty">${d.type}</div><div class="nm">${d.name}</div></div>`);
      const run = M.html(`<div class="run" style="top:${y + 152}px"><i></i><span></span></div>`);
      root.append(el, run);
      const a = M.svg('path', { class: 'a' }, this.lk), b = M.svg('path', { class: 'b' }, this.lk);
      const dots = [0, 1, 2].map(() => M.svg('circle', { class: 'dot', r: 6 }, this.lk));
      return { el, run, n: run.querySelector('span'), a, b, dots, y, paths: [...el.querySelectorAll('svg path')] };
    });
    this.sys = M.mount(root, `<div class="sys tk-card hot"><div class="k">System</div><div class="nm">Loan assistant</div><div class="rq" data-k="rq"></div><div class="live"><i data-k="lv"></i>Running</div></div>`);
  },

  at(t) {
    const M = Mock;
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.doc.root, t, 0.35);

    /* the three sentences light up in turn */
    this.RULES.forEach((d, i) => {
      const s = this.doc['s' + i], hl = s.firstChild;
      hl.style.transform = `scaleX(${M.p(t, 2.0 + i * 0.45, 0.6, 'outCubic').toFixed(3)})`;
      hl.style.opacity = M.prog(t, 2.0 + i * 0.45, 0.1);
    });

    /* each becomes a control: a dashed link from the sentence, the card rising beside it */
    if (!this.geo) {
      const keep = this.doc.root.style.transform;
      this.doc.root.style.transform = 'none';
      this.geo = this.RULES.map((_, i) => {
        const [x, y, w, h] = M.rectOf(this.doc.root.parentNode, this.doc['s' + i]);
        return { sx: Math.min(x + w + 14, 744), sy: y + h / 2 };
      });
      this.doc.root.style.transform = keep;
    }
    this.ctl.forEach((c, i) => {
      const g = this.geo[i], s0 = 4.0 + i * 0.4;
      const ex = 860, ey = c.y + 71;
      c.a.setAttribute('d', `M${g.sx},${g.sy} C${g.sx + 70},${g.sy} ${ex - 70},${ey} ${ex},${ey}`);
      M.draw(c.a, t, s0, 0.6);
      c.a.style.strokeDasharray = '6 8';
      c.a.style.opacity = M.prog(t, s0, 0.2) * (1 - 0.6 * M.prog(t, 7.0, 0.6));
      c.el.style.opacity = M.ease.css(M.prog(t, s0 + 0.3, 0.6));
      c.el.style.transform = `translateX(${((1 - M.p(t, s0 + 0.3, 0.8)) * -40).toFixed(1)}px)`;
      c.paths.forEach((p, k) => M.draw(p, t, s0 + 0.5 + k * 0.08, 0.6));
    });

    /* bound to the running system: links, request pulses, counters */
    M.rise(this.sys.root, t, 6.6);
    const L = M.abs(t);
    this.sys.rq.textContent = `${M.fmt.int(M.ticker(t, 61200, 3.4))} requests today`;
    this.sys.lv.style.opacity = (0.45 + 0.55 * M.wave(L, 1.4)).toFixed(3);
    this.ctl.forEach((c, i) => {
      const s1 = 7.0 + i * 0.25, y = c.y + 71;
      c.b.setAttribute('d', `M1420,${y} C1475,${y} 1470,585 1520,585`);
      M.draw(c.b, t, s1, 0.6);
      const on = M.prog(t, s1 + 0.6, 0.3);
      c.dots.forEach((d, k) => {
        const u = (L * 0.55 + k / 3 + i * 0.17) % 1;
        const p = c.b.getPointAtLength ? c.b.getPointAtLength((1 - u) * (c.b._len || c.b.getTotalLength())) : { x: 0, y: 0 };
        d.setAttribute('cx', p.x.toFixed(1)); d.setAttribute('cy', p.y.toFixed(1));
        d.style.opacity = (on * Math.min(1, 4 * u, 4 * (1 - u))).toFixed(3);
      });
      M.rise(c.run, t, s1 + 0.7, { dy: 10 });
      Talk.txt(c.n, `Ran ${M.fmt.int(M.ticker(t, this.RULES[i].base, this.RULES[i].rate))} times today · Upheld`);
      this.doc['s' + i].style.opacity = 1 - 0.55 * M.prog(t, s1, 0.6);
    });
  },
});
