/* The first test of a control is the audit. A control's life on one line: written, deployed, months of
   requests, then an audit that pulls a sample of a few. Then the issues light up along the months, one of
   them inside the sample, beside New York City's hiring-law audit (one issue found where at least seventeen
   existed). Then the data protection fine for decisions no person assessed, and the slide's closing line.
   The line, the requests and the issues on it are an illustration; the figures carry their sources. */
registerSlide({
  id: 'untested',
  act: 'problems',
  title: 'The first test of a control is the audit',
  beats: [
    { t: 5.2, say: "And the first test of a control is the audit. A control is written, and it's deployed. Then it runs for months, on every request, and no one knows whether it works. The first time anyone checks is when an auditor samples a few requests. Code is tested before it ships, and again on every change after that. A control gets its first test months after it ships." },
    { t: 9.0, say: "Sampling finds what it happens to pick. New York City requires employers to publish bias audits of their AI hiring tools. When the state comptroller checked the city's enforcement, the city had reviewed thirty-two companies and found one issue. The comptroller's auditors looked at the same thirty-two and found at least seventeen." },
    { t: 12.8, say: "What an audit misses, a regulator can find. In August, the Dutch data protection authority fined a ride-hailing platform eight hundred and twenty-five million euros, for decisions about its drivers that no person assessed. The platform is appealing. A control that is never tested exists only on paper." },
  ],

  Y: 490, X0: 150, XW: 190, XD: 420, R0: 480, R1: 1520, BOX: [1570, 1770],
  N: 140,
  SAMPLE: [16, 45, 74, 101, 127],
  /* seventeen issues, one of them inside the sample */
  ISSUES: [5, 11, 22, 29, 38, 51, 58, 66, 74, 83, 90, 97, 108, 115, 121, 132, 137],
  OUT: 9.1,

  render(root) {
    const M = Mock, { Y, X0, XW, XD, R0, R1, BOX, N } = this;
    root.classList.add('sl-unt');
    M.style('sl-unt', `
      .sl-unt svg.tl { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-unt .axis { stroke: rgba(241,241,241,.45); stroke-width: 3; }
      .sl-unt .mk { fill: #000; stroke: var(--ink); stroke-width: 3; }
      .sl-unt .lb { font: 600 30px var(--sans); fill: var(--ink); }
      .sl-unt .lb.dim { font-weight: 500; fill: var(--ink-2); }
      .sl-unt .lb.y { fill: var(--yellow); }
      .sl-unt .rq { stroke: #f1f1f1; stroke-width: 3; stroke-linecap: round; }
      .sl-unt .box { fill: rgba(255,206,74,.06); stroke: var(--yellow); stroke-width: 3; }
      .sl-unt .arc { fill: none; stroke: rgba(255,206,74,.6); stroke-width: 2.5; }
      .sl-unt .cp { stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; }
      .sl-unt .stat { left: 150px; top: 690px; width: 1620px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
      .sl-unt .stat .n { font: 700 160px/.9 var(--sans); letter-spacing: -.05em; font-variant-numeric: tabular-nums; }
      .sl-unt .stat .n.red { color: var(--red); }
      .sl-unt .stat .l { margin-top: 18px; font: 500 34px/1.25 var(--sans); color: var(--ink); }
      .sl-unt .stat .l b { font-weight: 700; }
      .sl-unt .cd { left: 150px; top: 290px; width: 720px; height: 630px; box-sizing: border-box; padding: 44px 48px 0; }
      .sl-unt .cd .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-unt .cd .amt { margin-top: 28px; font: 700 100px/.98 var(--sans); letter-spacing: -.04em; color: var(--red); font-variant-numeric: tabular-nums; }
      .sl-unt .cd .ln2 { margin-top: 30px; font: 500 34px/1.28 var(--sans); color: var(--ink); text-wrap: pretty; }
      .sl-unt .cd .ft { position: absolute; left: 48px; right: 48px; bottom: 40px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
      .sl-unt .cd .rw { display: flex; align-items: center; gap: 18px; }
      .sl-unt .cd .mt { font: 500 26px/1.25 var(--sans); color: var(--ink-2); }
      .sl-unt .end { left: 970px; top: 440px; width: 800px; }
      .sl-unt .end .tk-h { font-size: 80px; line-height: 1.04; }
      .sl-unt .src { left: var(--gut); right: var(--gut); top: 992px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['The first test of a control <span class="tk-y">is the audit.</span>']);

    const svg = (this.svg = M.html(`<svg class="tl" viewBox="0 0 1920 1080">
      <line class="axis" data-k="ax" x1="${X0}" x2="${BOX[0]}" y1="${Y}" y2="${Y}"/>
      <g class="rqs"></g><g class="arcs"></g>
      <rect class="box" x="${BOX[0]}" y="${Y - 66}" width="${BOX[1] - BOX[0]}" height="132" rx="14"/>
      <g class="cps"></g>
      <circle class="mk" data-k="mw" cx="${XW}" cy="${Y}" r="11"/><circle class="mk" data-k="md" cx="${XD}" cy="${Y}" r="11"/>
      <text class="lb" data-k="lw" x="${XW}" y="${Y + 92}" text-anchor="middle">Written</text>
      <text class="lb" data-k="ld" x="${XD}" y="${Y + 92}" text-anchor="middle">Deployed</text>
      <text class="lb dim" data-k="lm" x="${(R0 + R1) / 2}" y="${Y + 92}" text-anchor="middle">Months of requests</text>
      <text class="lb y" data-k="la" x="${(BOX[0] + BOX[1]) / 2}" y="${Y + 92}" text-anchor="middle">Audit</text></svg>`));
    root.appendChild(svg);
    const q = (k) => svg.querySelector(`[data-k="${k}"]`);
    this.el = { ax: q('ax'), mw: q('mw'), md: q('md'), lw: q('lw'), ld: q('ld'), lm: q('lm'), la: q('la'), box: svg.querySelector('.box') };
    this.ticks = Array.from({ length: N }, (_, i) => {
      const x = R0 + (i * (R1 - R0)) / (N - 1), h = 16 + 26 * M.noise(i + 5);
      return { el: M.svg('line', { class: 'rq', x1: x, x2: x }, svg.querySelector('.rqs')), x, h, u: i / (N - 1), sam: this.SAMPLE.indexOf(i), bad: this.ISSUES.includes(i) };
    });
    /* each sampled request travels in an arc to its copy inside the audit box; the arcs nest (the earliest
       request goes to the farthest copy, on the highest arc), so no two cross */
    const bw = BOX[1] - BOX[0], ns = this.SAMPLE.length;
    this.samples = this.SAMPLE.map((i, k) => {
      const t0 = this.ticks[i], cx = BOX[0] + 36 + ((ns - 1 - k) * (bw - 72)) / (ns - 1);
      const h = 40 + 0.18 * (cx - t0.x), y0 = Y - 36, y1 = Y - 66;
      const arc = M.svg('path', { class: 'arc', d: `M${t0.x},${y0} C${t0.x},${y0 - h} ${cx},${y1 - h} ${cx},${y1}` }, svg.querySelector('.arcs'));
      const cp = M.svg('line', { class: 'cp', x1: cx, x2: cx, y1: Y - 26, y2: Y + 26 }, svg.querySelector('.cps'));
      return { arc, cp, bad: this.ISSUES.includes(i) };
    });

    this.stat = M.mount(root, `<div class="stat">
      <div data-k="a"><div class="n">1</div><div class="l">issue found by <b>the city</b>,<br>reviewing 32 companies</div></div>
      <div data-k="b"><div class="n red">17+</div><div class="l">found by <b>the State Comptroller's auditors</b>,<br>reviewing the same 32</div></div></div>`);
    this.src1 = M.mount(root, `<div class="src tk-src">New York City Local Law 144, automated employment decision tools. Office of the New York State Comptroller, Audit 2024-N-6, 2 December 2025. The requests drawn on the line are illustrative.</div>`).root;

    this.card = M.mount(root, `<div class="cd tk-card"><div class="k">Data protection</div>
      <div class="amt" data-k="amt">€824.99<br>million</div>
      <div class="ln2">A ride-hailing platform was fined for decisions about its drivers that no person assessed.</div>
      <div class="ft"><div class="mt">Dutch data protection authority</div><div class="rw"><span class="mt">21 Aug 2026</span><span class="tk-chip dim">Under appeal</span></div></div></div>`);
    this.end = Talk.lines(root.appendChild(M.html('<div class="end"></div>')), ['A control that is', 'never tested exists', '<span class="tk-y">only on paper.</span>']);
    this.src2 = M.mount(root, `<div class="src tk-src">Dutch data protection authority, 21 Aug 2026, under appeal (Pearl Cohen).</div>`).root;
  },

  at(t) {
    const M = Mock, { Y } = this, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    /* the line and the audit's figures leave together for the fine */
    const keep = 1 - M.p(t, this.OUT, 0.5, 'inOutCubic');
    this.svg.style.opacity = keep.toFixed(3);

    /* a control's life: written, deployed, months of requests, then the audit */
    const e = this.el;
    M.draw(e.ax, t, 0.4, 1.0, 'inOutCubic');
    M.fade(e.mw, t, 0.6, 0.3); M.fade(e.lw, t, 0.7, 0.4);
    M.fade(e.md, t, 1.0, 0.3); M.fade(e.ld, t, 1.1, 0.4);
    const sweep = M.prog(t, 1.4, 2.0);
    M.fade(e.lm, t, 2.0, 0.5);
    M.fade(e.box, t, 3.3, 0.4); M.fade(e.la, t, 3.4, 0.4);

    /* the issues: present all along, lit only once the audit has looked */
    const reveal = (u) => M.prog(t, 5.5 + u * 0.9, 0.3);
    this.ticks.forEach((k, i) => {
      const on = M.clamp((sweep * 1.08 - k.u) * 14);
      const sampled = k.sam >= 0 ? M.prog(t, 3.8 + k.sam * 0.12, 0.25) : 0;
      const bad = k.bad ? reveal(k.u) : 0;
      const h = k.h + 10 * Math.max(sampled, bad);
      k.el.setAttribute('y1', (Y - h * on).toFixed(1));
      k.el.setAttribute('y2', (Y + h * on).toFixed(1));
      k.el.style.stroke = bad > 0.5 ? 'var(--red)' : sampled > 0.5 ? 'var(--yellow)' : '';
      const tw = 0.85 + 0.15 * M.wave(L + i * 0.37, 2.4);
      k.el.style.opacity = (on * (bad > 0.5 || sampled > 0.5 ? 1 : 0.36 * tw)).toFixed(3);
    });
    this.samples.forEach((s, k) => {
      const s0 = 3.8 + k * 0.12;
      M.draw(s.arc, t, s0, 0.6);
      s.arc.style.opacity = (M.prog(t, s0, 0.15) * (1 - 0.8 * M.prog(t, 5.4, 0.5))).toFixed(3);
      M.fade(s.cp, t, s0 + 0.5, 0.25);
      s.cp.style.stroke = s.bad && reveal(1) > 0.5 ? 'var(--red)' : '';
    });

    /* the hiring-law audit */
    ['a', 'b'].forEach((k, i) => { M.rise(this.stat[k], t, 6.4 + i * 0.5); this.stat[k].style.opacity *= keep; });
    M.countUp(this.stat.b.querySelector('.n'), t, 6.9, 1.2, 1, 17, (n) => Math.round(n) + '+');
    M.fade(this.src1, t, 6.6, 0.5);
    this.src1.style.opacity *= keep;

    /* the fine, then the closing line */
    M.rise(this.card.root, t, 9.7, { dy: 26 });
    M.countUp(this.card.amt.firstChild, t, 9.9, 1.6, 0, 824.99, (v) => '€' + v.toFixed(2));
    M.fade(this.src2, t, 10.2, 0.6);
    Talk.linesAt(this.end, t, 11.3, 0.14, 1.0);
  },
});
