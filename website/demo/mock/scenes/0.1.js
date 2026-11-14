/* Scene 0.1: The pressure. The cost of intelligence falls as a 10x count-up; demand draws on, crosses it
   and keeps climbing; the gap between the two lines fills with yellow light. */
registerScene({
  id: '0.1',
  act: 0,
  title: 'The pressure',
  duration: 12,
  caption: 'The cost of intelligence falls ten times a year. Demand rises faster. The gap between them is where enterprises win or lose.',

  render(root) {
    root.classList.add('s01');
    Mock.style('s01', `
      .s01 .stat { left: 160px; width: 470px; }
      .s01 .n { font: 700 172px/.9 var(--sans); letter-spacing: -.05em; color: var(--white); font-variant-numeric: tabular-nums; }
      .s01 .n small { font-size: .6em; letter-spacing: -.02em; margin-left: 6px; color: var(--soft-grey); }
      .s01 .lbl { margin-top: 18px; font-size: 26px; line-height: 1.35; color: var(--soft-grey); }
      .s01 .lbl b { color: var(--white); font-weight: 600; }
      .s01 .dem { font: 700 46px/1.08 var(--sans); letter-spacing: -.03em; color: var(--yellow); }
      .s01 svg.ch { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .s01 .ax { stroke: rgba(241,241,241,.28); stroke-width: 1.5; fill: none; }
      .s01 .gl { stroke: rgba(241,241,241,.07); stroke-width: 1; fill: none; }
      .s01 .cost { stroke: var(--white); stroke-width: 3.5; fill: none; stroke-linecap: round; }
      .s01 .demand { stroke: var(--yellow); stroke-width: 4.5; fill: none; stroke-linecap: round; }
      .s01 .tag { font: 600 15px var(--sans); letter-spacing: .16em; text-transform: uppercase; }
      .s01 .gap { left: 1478px; top: 455px; width: 290px; text-align: left; }
      .s01 .gap .h { font: 700 40px/1.05 var(--sans); letter-spacing: -.03em; color: var(--black); }
      .s01 .gap .s { margin-top: 8px; font-size: 21px; line-height: 1.3; color: #1a1406; font-weight: 600; text-wrap: balance; }
    `);
    /* plot area */
    const X0 = 700, X1 = 1740, Y0 = 760, Y1 = 170;
    const px = (x) => X0 + x * (X1 - X0), py = (y) => Y0 - y * (Y0 - Y1);
    const cost = (x) => 0.8 - 0.64 * x;
    const demand = (x) => 0.1 + 0.24 * x + 0.6 * x * x;
    let cross = 0.5;
    for (let i = 0; i < 400; i++) { const x = i / 400; if (demand(x) >= cost(x)) { cross = x; break; } }
    const path = (f, a = 0, b = 1, n = 90) => Array.from({ length: n + 1 }, (_, i) => { const x = a + ((b - a) * i) / n; return `${i ? 'L' : 'M'}${px(x).toFixed(1)} ${py(f(x)).toFixed(1)}`; }).join('');
    const gapD = path(demand, cross, 1, 60) + Array.from({ length: 61 }, (_, i) => { const x = 1 - ((1 - cross) * i) / 60; return `L${px(x).toFixed(1)} ${py(cost(x)).toFixed(1)}`; }).join('') + 'Z';

    Mock.dotGrid(root);
    const svg = Mock.html(`
      <svg class="ch" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="s01g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFCE4A" stop-opacity=".95"/><stop offset="1" stop-color="#FFCE4A" stop-opacity=".55"/></linearGradient>
          <filter id="s01blur" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="28"/></filter>
          <filter id="s01dot" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>
          <clipPath id="s01clip"><rect data-k="clip" x="${px(cross)}" y="0" width="0" height="1080"/></clipPath>
        </defs>
        ${[0.25, 0.5, 0.75, 1].map((y) => `<line class="gl" x1="${X0}" x2="${X1}" y1="${py(y)}" y2="${py(y)}"/>`).join('')}
        <path class="ax" data-k="ax" d="M${X0} ${Y1 - 20}V${Y0}H${X1 + 20}"/>
        <text class="tag" x="${X0 + 14}" y="${Y1 - 6}" fill="#4E4E4E">Log scale</text>
        <text class="tag" x="${X1 + 20}" y="${Y0 + 34}" fill="#4E4E4E" text-anchor="end">Time</text>
        <g clip-path="url(#s01clip)">
          <path data-k="glow" d="${gapD}" fill="#FFCE4A" filter="url(#s01blur)" opacity="0"/>
          <path data-k="gap" d="${gapD}" fill="url(#s01g)" opacity="0"/>
        </g>
        <path class="cost" data-k="cost" d="${path(cost)}"/>
        <path class="demand" data-k="demand" d="${path(demand)}"/>
        <circle data-k="cring" cx="${px(cross)}" cy="${py(cost(cross))}" r="14" fill="none" stroke="#FFCE4A" stroke-width="2" opacity="0"/>
        <circle data-k="chead" r="7" fill="#F1F1F1" opacity="0"/>
        <circle data-k="dglow" r="16" fill="#FFCE4A" filter="url(#s01dot)" opacity="0"/>
        <circle data-k="dhead" r="8" fill="#FFCE4A" opacity="0"/>
        <text class="tag" data-k="clabel" x="${X1}" y="${py(cost(1)) + 44}" fill="#A6A6A6" text-anchor="end" opacity="0">Cost of intelligence</text>
        <text class="tag" data-k="dlabel" x="${X1 - 18}" y="${py(demand(1)) - 26}" fill="#FFCE4A" text-anchor="end" opacity="0">Demand</text>
      </svg>`);
    root.appendChild(svg);
    const q = (k) => svg.querySelector(`[data-k="${k}"]`);
    this.s = { ax: q('ax'), cost: q('cost'), demand: q('demand'), gap: q('gap'), glow: q('glow'), clip: q('clip'), cring: q('cring'),
      chead: q('chead'), dhead: q('dhead'), dglow: q('dglow'), clabel: q('clabel'), dlabel: q('dlabel') };
    this.crossX = px(cross);

    this.r = Mock.mount(root, `
      <div class="stat" style="top:190px">
        <div class="mk-eyebrow mono" data-k="eb" style="margin-bottom:34px">The economics of AI</div>
        <div class="n" data-k="n">1<small>×</small></div>
        <div class="lbl" data-k="l1"><b>Cheaper intelligence,</b><br>every year.</div>
        <div class="dem" data-k="dem" style="margin-top:64px">Demand rises<br>faster.</div>
      </div>`);
    this.gapLabel = Mock.mount(root, `<div class="gap"><div class="h">The gap.</div><div class="s">Where enterprises win or lose.</div></div>`);
  },

  at(t) {
    const M = Mock, s = this.s, r = this.r;
    M.rise(r.eb, t, 0.3);
    M.draw(s.ax, t, 0.4, 1.0, 'inOutCubic');

    /* the cost line falls while the count-up runs to 10x */
    const pc = M.draw(s.cost, t, 1.0, 3.4, 'inOutCubic');
    M.rise(r.n, t, 0.8);
    const v = M.lerp(1, 10, M.ease.outCubic(M.prog(t, 1.0, 3.2)));
    r.n.innerHTML = `${Math.floor(v + 1e-6)}<small>×</small>`;
    M.rise(r.l1, t, 1.4);
    this.head(s.cost, s.chead, null, pc, t < 4.6 ? 1 : 1 - M.prog(t, 4.6, 0.6));
    s.clabel.style.opacity = M.prog(t, 3.8, 0.6);

    /* demand draws on above it, crosses, and keeps climbing */
    M.rise(r.dem, t, 4.6);
    const pd = M.draw(s.demand, t, 4.4, 3.8, 'inOutCubic');
    const hx = this.head(s.demand, s.dhead, s.dglow, pd, pd > 0 ? 1 : 0);
    s.dlabel.style.opacity = M.prog(t, 7.6, 0.6);
    /* when the demand head reaches the crossing, found once by sampling the same draw */
    if (this.tCross == null) {
      this.tCross = 8.2;
      for (let u = 4.4; u < 8.2; u += 0.01) {
        const L = s.demand._len, pt = s.demand.getPointAtLength(L * M.ease.inOutCubic(M.prog(u, 4.4, 3.8)));
        if (pt.x >= this.crossX) { this.tCross = u; break; }
      }
    }
    const tc = this.tCross;
    if (t >= tc && t - tc < 1.2) {
      const p = (t - tc) / 1.2;
      s.cring.style.opacity = (1 - p).toFixed(3);
      s.cring.setAttribute('r', (14 + 40 * M.ease.outCubic(p)).toFixed(1));
    } else s.cring.style.opacity = 0;

    /* the gap fills behind the demand line's head, then glows */
    s.clip.setAttribute('width', Math.max(0, hx - this.crossX + 2).toFixed(1));
    const fill = M.prog(t, 5.6, 1.2);
    const glow = M.prog(t, 8.0, 1.6);
    s.gap.style.opacity = (0.16 + 0.5 * glow) * fill;
    s.glow.style.opacity = (0.15 + 0.35 * glow + 0.08 * glow * M.wave(t, 2.6)) * fill;
    M.rise(this.gapLabel.root, t, 8.4);
  },

  /** Puts a head dot at the drawn end of a line; returns its x. */
  head(path, dot, glow, p, o) {
    const L = path._len || path.getTotalLength();
    const pt = path.getPointAtLength(L * p);
    dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
    dot.style.opacity = p > 0 && p < 1 ? o : p >= 1 ? o * 0.9 : 0;
    if (glow) { glow.setAttribute('cx', pt.x); glow.setAttribute('cy', pt.y); glow.style.opacity = dot.style.opacity * 0.8; }
    return p > 0 ? pt.x : 0;
  },
});
