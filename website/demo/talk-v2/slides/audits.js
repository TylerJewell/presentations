/* From point-in-time audits to evidence on every request. A year of requests flows along a line; four
   audits sample a handful; New York City's hiring-law audit shows what sampling misses; then every request
   leaves a verdict in an evidence band, and an audit becomes a question asked of it. */
registerSlide({
  id: 'audits',
  act: 'shape',
  title: 'From audits to evidence on every request',
  beats: [
    { t: 2.4, say: "The second shift is from point-in-time audits to evidence on every request. Today, a few times a year, someone pulls a sample of records and checks them by hand." },
    { t: 4.6, say: "New York City requires employers to publish bias audits of their AI hiring tools. When the state comptroller checked the city's enforcement, the city had reviewed thirty-two companies and found one issue. The comptroller's auditors looked deeper at the same thirty-two and found at least seventeen." },
    { t: 7.4, say: "An AI system makes thousands of decisions a day, and any one can go differently from the last. So every request should leave evidence: which controls ran, and what each one concluded." },
    { t: 9.8, say: "Then an audit becomes a question you ask of evidence you already have, and the answer covers every request." },
  ],

  X0: 150, X1: 1770, Y: 430,
  MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  AUDITS: [2.5, 5.5, 8.5, 11.4],

  render(root) {
    const M = Mock;
    root.classList.add('sl-aud');
    M.style('sl-aud', `
      .sl-aud svg.tl { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-aud .axis { stroke: rgba(241,241,241,.45); stroke-width: 3; }
      .sl-aud .mt { font: 500 24px var(--sans); fill: var(--ink-2); }
      .sl-aud .req { fill: #f1f1f1; }
      .sl-aud .snap { fill: rgba(255,206,74,.06); stroke: var(--yellow); stroke-width: 3; }
      .sl-aud .snapt { font: 600 24px var(--sans); letter-spacing: .12em; fill: var(--yellow); }
      .sl-aud .tick { stroke: var(--green); stroke-width: 3; stroke-linecap: round; }
      .sl-aud .bandl { font: 600 24px var(--sans); letter-spacing: .12em; fill: var(--green); }
      .sl-aud .sel { fill: rgba(255,206,74,.12); stroke: var(--yellow); stroke-width: 3; }
      .sl-aud .stat { left: 150px; top: 640px; width: 1620px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
      .sl-aud .stat .n { font: 700 180px/.9 var(--sans); letter-spacing: -.05em; }
      .sl-aud .stat .l { margin-top: 18px; font: 500 34px/1.25 var(--sans); color: var(--ink); }
      .sl-aud .stat .l b { font-weight: 700; }
      .sl-aud .src { left: 150px; top: 990px; width: 1620px; }
      .sl-aud .q { left: 150px; top: 690px; width: 1620px; padding: 34px 40px; display: flex; flex-direction: column; gap: 18px; }
      .sl-aud .q .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-aud .q .t { font: 600 40px/1.2 var(--sans); letter-spacing: -.01em; }
      .sl-aud .q .t .cr { display: inline-block; width: 4px; height: 40px; background: var(--yellow); vertical-align: -6px; margin-left: 4px; }
      .sl-aud .q .a { display: flex; gap: 16px; align-items: center; font: 500 32px/1.2 var(--sans); color: var(--ink-2); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['From audits to evidence', '<span class="tk-y">on every request.</span>']);
    const { X0, X1, Y } = this, mw = (X1 - X0) / 12;
    const svg = (this.svg = M.html(`<svg class="tl" viewBox="0 0 1920 1080">
      <line class="axis" x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}"/>
      ${this.MONTHS.map((m, i) => `<text class="mt" x="${X0 + i * mw + 8}" y="${Y + 78}">${m}</text>`).join('')}
      <g class="reqs"></g><g class="snaps"></g><g class="band"></g><rect class="sel" rx="10"/></svg>`));
    root.appendChild(svg);
    this.reqs = Array.from({ length: 70 }, () => M.svg('circle', { class: 'req', r: 5 }, svg.querySelector('.reqs')));
    this.snaps = this.AUDITS.map((m) => {
      const g = M.svg('g', {}, svg.querySelector('.snaps'));
      const x = X0 + m * mw;
      M.svg('rect', { class: 'snap', x: x - 44, y: Y - 40, width: 88, height: 80, rx: 12 }, g);
      const tx = M.svg('text', { class: 'snapt', x, y: Y - 58, 'text-anchor': 'middle' }, g);
      tx.textContent = 'AUDIT';
      return g;
    });
    const band = svg.querySelector('.band');
    this.ticks = Array.from({ length: 200 }, (_, i) => {
      const x = X0 + 6 + i * ((X1 - X0 - 12) / 199);
      const h = 16 + 34 * M.noise(i + 3);
      return { el: M.svg('line', { class: 'tick', x1: x, x2: x, y1: Y + 116, y2: Y + 116 + h }, band), x, h };
    });
    this.bandL = M.svg('text', { class: 'bandl', x: X0, y: Y + 200 }, band);
    this.bandL.textContent = 'A VERDICT FROM EVERY REQUEST';
    this.sel = svg.querySelector('.sel');
    M.set(this.sel, {});
    this.sel.setAttribute('x', X0 + 6 * mw); this.sel.setAttribute('y', Y - 30);
    this.sel.setAttribute('width', 3 * mw); this.sel.setAttribute("height", 200);
    this.stat = M.mount(root, `<div class="stat">
      <div data-k="a"><div class="n">1</div><div class="l">issue found by <b>the city</b>,<br>reviewing 32 companies</div></div>
      <div data-k="b"><div class="n tk-y">17+</div><div class="l">found by <b>the State Comptroller's auditors</b>,<br>reviewing the same 32</div></div></div>`);
    this.src = M.mount(root, `<div class="src tk-src">New York City Local Law 144, automated employment decision tools. Office of the New York State Comptroller, Audit 2024-N-6, 2 December 2025.</div>`).root;
    this.q = M.mount(root, `<div class="q tk-card hot"><div class="k">Ask the record</div>
      <div class="t" data-k="t"></div>
      <div class="a" data-k="a"><span class="tk-chip ok">Every request</span><span>Answered from the record, not from a sample.</span></div></div>`);
  },

  at(t) {
    const M = Mock, { X0, X1, Y } = this, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.fade(this.svg, t, 0.3, 0.6);

    /* requests flow all year; from beat 3 each one is lit, because each one now leaves evidence */
    const lit = M.p(t, 5.0, 0.8);
    const sampled = (x) => this.AUDITS.some((m) => Math.abs(x - (X0 + m * ((X1 - X0) / 12))) < 48);
    this.reqs.forEach((c, i) => {
      const u = ((L * 0.018 + i / this.reqs.length + 0.13 * M.noise(i)) % 1 + 1) % 1;
      const x = X0 + u * (X1 - X0), y = Y + (M.noise(i + 9) - 0.5) * 40;
      c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1));
      const inSnap = sampled(x) && t < 5.4;
      c.style.fill = inSnap || lit > 0.5 ? 'var(--yellow)' : '#f1f1f1';
      c.style.opacity = (Math.min(1, 6 * u, 6 * (1 - u)) * (inSnap ? 1 : M.lerp(0.32, 1, lit))).toFixed(3);
    });
    this.snaps.forEach((g, i) => {
      const a = M.p(t, 0.9 + i * 0.2, 0.5);
      g.style.opacity = (a * (1 - 0.8 * M.prog(t, 5.0, 0.6))).toFixed(3);
    });

    /* the hiring-law audit */
    const sOut = M.prog(t, 4.9, 0.4);
    ['a', 'b'].forEach((k, i) => { M.rise(this.stat[k], t, 2.6 + i * 0.5); this.stat[k].style.opacity *= 1 - sOut; });
    M.fade(this.src, t, 3.2, 0.5);
    this.src.style.opacity *= 1 - sOut;
    M.countUp(this.stat.b.querySelector('.n'), t, 3.1, 1.2, 1, 17, (n) => Math.round(n) + '+');

    /* the evidence band: a verdict tick for every request, filling across the year */
    const sweep = M.prog(t, 5.3, 1.6);
    this.ticks.forEach((k, i) => {
      const u = (k.x - X0) / (X1 - X0);
      const on = M.clamp((sweep * 1.1 - u) * 12);
      const tw = 0.75 + 0.25 * M.wave(L + i * 0.37, 2.2);
      k.el.setAttribute('y2', (Y + 116 + k.h * on).toFixed(1));
      k.el.style.opacity = (on * tw).toFixed(3);
    });
    this.bandL.style.opacity = M.prog(t, 6.4, 0.5).toFixed(3);

    /* an audit becomes a question of the record */
    M.rise(this.q.root, t, 7.6);
    const qs = 'Show every adverse decision in the third quarter that had no human review.';
    const n = Math.floor(qs.length * M.prog(t, 8.0, 1.2));
    Talk.htm(this.q.t, qs.slice(0, n) + (t < 9.6 && M.wave(L, 0.9) > 0.4 ? '<span class="cr"></span>' : ''));
    M.fade(this.q.a, t, 9.2, 0.5);
    this.sel.style.opacity = (M.prog(t, 9.0, 0.4) * (0.8 + 0.2 * M.wave(L, 1.8))).toFixed(3);
  },
});
