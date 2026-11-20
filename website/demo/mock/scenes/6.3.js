/* Scene 6.3: Forecastable AI. The cost of one interaction times the interactions in a month becomes a
   twelve-month bill, built month by month: a consumption-metered stack thickening band by band with a
   surprise spike, and Akka's flat bill filling to a forecast drawn before the year began. Under both, token
   spend stays inside Optimize's forecast band. The camera visits the forecast, the spike and the band; then
   the charts step back for "Forecastable AI." in display type. No dollar figures: the axes carry none. */
registerScene({
  id: '6.3',
  act: 6,
  title: 'Forecastable AI',
  duration: 22,
  headline: "Finance can plan one bill.",
  caption: 'Then pair that efficiency with a flat fee. Akka is priced on a platform tier and service cores, not per call or per token, and Optimize keeps token spend inside its forecast. Each interaction costs less, and finance can plan one bill. That is forecastable AI.',

  MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  /* the metered stack's bands, bottom up, and their share of a month's bill */
  BANDS: [['Calls', 0.22], ['Functions', 0.17], ['Orchestration', 0.15], ['Queues', 0.12], ['Memory', 0.13], ['Storage', 0.1], ['Egress', 0.11]],
  SPIKE: 7,
  /* the two bill plots share a geometry, offset by panel */
  P: { lx: 200, rx: 1040, w: 680, y0: 528, y1: 300, bw: 34 },
  /* the token plot */
  K: { x0: 470, x1: 1720, y0: 790, y1: 664 },

  timing() {
    if (this.T) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.T = { flat: at('flat'), fee: at('platform') - 0.6, spike: at('not') + 0.1, opt: at('Optimize') - 0.4, lower: at('Each'), bill: at('one', 30),
      out: at('Each') - 0.4, fin: at('That') - 0.5 };
  },

  /** When month m's bars build: the year is already under way at the first frame. */
  mt(m) { return -1.6 + 0.48 * m; },
  /** The metered bill for month m, 0..1 of the plot: compounding usage, with the spike. */
  bill(m) { return (0.3 * Math.pow(1.105, m)) * (m === this.SPIKE ? 1.38 : 1); },

  render(root) {
    root.classList.add('s63');
    Mock.style('s63', `
      .s63 .all { left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 960px 450px; }
      .s63 .all > * { position: absolute; }
      .s63 .fx { left: 160px; top: 84px; width: 1600px; height: 92px; display: flex; align-items: center; gap: 34px; }
      .s63 .fx .blk { display: flex; flex-direction: column; gap: 10px; }
      .s63 .fx .k { font: 600 12.5px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s63 .fx .bars { display: flex; flex-direction: column; gap: 6px; width: 230px; }
      .s63 .fx .bars i { display: block; height: 10px; border-radius: 3px; }
      .s63 .fx .op { font: 600 44px/1 var(--sans); color: var(--medium-grey); }
      .s63 .fx .v { font: 700 40px/1 var(--sans); letter-spacing: -.025em; color: var(--white); font-variant-numeric: tabular-nums; }
      .s63 .fx .res { font: 700 40px/1 var(--sans); letter-spacing: -.025em; color: var(--white); }
      .s63 .pn { top: 206px; width: 760px; height: 400px; border: 1px solid var(--hair); border-radius: 14px; background: rgba(255,255,255,.018); }
      .s63 .pn.ak { border-color: rgba(255,206,74,.32); background: linear-gradient(160deg, rgba(255,206,74,.06), rgba(255,206,74,.012)); }
      .s63 .pt { top: 226px; white-space: nowrap; font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; }
      .s63 .ps { top: 248px; white-space: nowrap; font: 500 18px/1.2 var(--sans); color: var(--soft-grey); }
      .s63 .pl { top: 566px; white-space: nowrap; font: 600 19px/1.2 var(--sans); letter-spacing: -.005em; }
      .s63 svg.pv { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s63 .mo { font: 500 12px var(--sans); fill: #5a5a5a; }
      .s63 .base { stroke: rgba(241,241,241,.2); stroke-width: 1; }
      .s63 .fc { fill: none; stroke: var(--yellow); stroke-width: 2; stroke-dasharray: 7 7; }
      .s63 .fcl { font: 600 12px var(--sans); letter-spacing: .14em; text-transform: uppercase; fill: var(--yellow); }
      .s63 .sur { font-size: 12px; padding: 6px 9px; background-color: #0b0b0d; }
      .s63 .ring { width: 70px; height: 70px; margin: -35px 0 0 -35px; border-radius: 50%; border: 2px solid var(--red); left: 0; top: 0; }
      .s63 .tk { left: 160px; top: 640px; width: 1600px; height: 176px; border: 1px solid var(--hair); border-radius: 14px; background: rgba(255,255,255,.018); }
      .s63 .tkt { left: 186px; top: 664px; width: 250px; }
      .s63 .tkt .t { font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--yellow); }
      .s63 .tkt .s { margin-top: 12px; font: 500 17px/1.35 var(--sans); color: var(--soft-grey); }
      .s63 .tkt .mk-chip { margin-top: 14px; font-size: 11px; padding: 5px 8px; }
      .s63 .band { fill: rgba(255,206,74,.10); stroke: none; }
      .s63 .tl { fill: none; stroke: var(--white); stroke-width: 2.6; stroke-linejoin: round; stroke-linecap: round; }
      .s63 .bud { stroke: rgba(241,241,241,.55); stroke-width: 1.5; stroke-dasharray: 3 6; }
      .s63 .kl { font: 600 12px var(--sans); letter-spacing: .14em; text-transform: uppercase; }
      .s63 .rt { font-size: 11px; padding: 5px 8px; background-color: #0b0b0d; }
      .s63 .fin { left: 0; width: 1920px; top: 300px; text-align: center; }
      .s63 .fin .d { font: 700 200px/.95 var(--sans); letter-spacing: -.045em; white-space: nowrap; }
      .s63 .fin .y { color: var(--yellow); }
      .s63 .glow { left: 360px; top: 160px; width: 1200px; height: 560px; border-radius: 50%;
        background: radial-gradient(closest-side, rgba(255,206,74,.13), rgba(255,206,74,0)); }
    `);
    const world = (this.world = Mock.world(root));
    Mock.dotGrid(world);
    const all = (this.all = Mock.html('<div class="all"></div>'));
    world.appendChild(all);
    const P = this.P, K = this.K;

    this.fx = Mock.mount(all, `<div class="fx">
      <div class="blk" data-k="b0"><span class="k">Cost per interaction</span>
        <div class="bars"><i style="width:230px;background:rgba(241,241,241,.26)"></i><i data-k="ya" style="width:188px;background:var(--yellow)"></i></div></div>
      <span class="op" data-k="o1">×</span>
      <div class="blk" data-k="b1"><span class="k">Interactions a month</span><span class="v" data-k="vol"></span></div>
      <span class="op" data-k="o2">=</span>
      <div class="blk" data-k="b2"><span class="k">The bill</span><span class="res">Month by month</span></div></div>`);

    /* panels */
    this.pn = [
      Mock.mount(all, `<div class="pn" style="left:160px"></div>`).root,
      Mock.mount(all, `<div class="pn ak" style="left:1000px"></div>`).root,
    ];
    this.lab = Mock.mount(all, `<div>
      <div class="pt" data-k="t0" style="left:186px;color:var(--soft-grey)">Consumption-metered stack</div>
      <div class="ps" data-k="s0" style="left:186px">Six to eight bills, each scaling with use</div>
      <div class="pl" data-k="l0" style="left:186px;color:var(--white)">Provisioned for the peak. Metered on every call.</div>
      <div class="pt" data-k="t1" style="left:1026px;color:var(--yellow)">Akka</div>
      <div class="ps" data-k="s1" style="left:1026px">Platform tier + service cores</div>
      <div class="pl" data-k="l1" style="left:1026px;color:var(--white)">One bill finance can plan.</div></div>`);
    this.lab.root.style.cssText = 'left:0;top:0;width:1920px;height:1080px';
    [...this.lab.root.children].forEach((c) => (c.style.position = 'absolute'));

    const pitch = P.w / 12, bx = (x0, m) => x0 + m * pitch + (pitch - P.bw) / 2;
    const grey = ['#2c2c31', '#38383e', '#45454b', '#525259', '#606067', '#6e6e75', '#7d7d84'];
    let svg = '';
    [P.lx, P.rx].forEach((x0) => {
      svg += `<line class="base" x1="${x0}" x2="${x0 + P.w}" y1="${P.y0}" y2="${P.y0}"/>`;
      this.MONTHS.forEach((mo, m) => (svg += `<text class="mo" x="${bx(x0, m) + P.bw / 2}" y="${P.y0 + 20}" text-anchor="middle">${mo}</text>`));
    });
    this.MONTHS.forEach((_, m) => {
      this.BANDS.forEach((b, j) => (svg += `<rect data-b="${m}-${j}" x="${bx(P.lx, m)}" width="${P.bw}" rx="2" fill="${grey[j]}"/>`));
      svg += `<rect data-p="${m}" x="${bx(P.rx, m)}" width="${P.bw}" rx="2" fill="rgba(255,206,74,.42)"/>`;
      svg += `<rect data-s="${m}" x="${bx(P.rx, m)}" width="${P.bw}" rx="2" fill="#FFCE4A"/>`;
    });
    const fy = P.y0 - 0.44 * (P.y0 - P.y1) - 3;
    svg += `<path class="fc" data-k="fc" d="M${P.rx} ${fy}H${P.rx + P.w}"/><text class="fcl" data-k="fcl" x="${P.rx + P.w}" y="${fy - 12}" text-anchor="end">Forecast</text>`;
    /* tokens */
    const kx = (m) => K.x0 + ((m + 0.5) / 12) * (K.x1 - K.x0), ky = (v) => K.y0 - v * (K.y0 - K.y1);
    this.kx = kx; this.ky = ky;
    const bandHi = (m) => 0.36 + 0.035 * m, bandLo = (m) => 0.12 + 0.03 * m;
    this.tok = (m) => {
      /* token spend drifts up toward the band's top edge by July, then routing brings it back inside */
      const base = 0.22 + 0.034 * m + (m >= 4 && m <= 7 ? [0.06, 0.12, 0.17, 0.08][m - 4] : 0);
      return Math.min(base, bandHi(m) - 0.02);
    };
    let band = '', back = '';
    for (let i = 0; i <= 48; i++) { const m = (i / 48) * 11; band += `${i ? 'L' : 'M'}${kx(m).toFixed(1)} ${ky(bandHi(m)).toFixed(1)}`; }
    for (let i = 48; i >= 0; i--) { const m = (i / 48) * 11; back += `L${kx(m).toFixed(1)} ${ky(bandLo(m)).toFixed(1)}`; }
    svg += `<path class="band" data-k="band" d="${band}${back}Z"/>`;
    svg += `<line class="bud" data-k="bud" x1="${K.x0}" x2="${K.x1}" y1="${ky(0.95)}" y2="${ky(0.95)}"/>`;
    svg += `<text class="kl" data-k="budl" x="${K.x1}" y="${ky(0.95) - 9}" text-anchor="end" fill="#A6A6A6">Budget</text>`;
    svg += `<text class="kl" data-k="bandl" x="${kx(11) - 14}" y="${ky(bandHi(11)) - 9}" text-anchor="end" fill="#FFCE4A" opacity="0">Forecast band</text>`;
    svg += `<path class="tl" data-k="tl"/><circle data-k="th" r="5" fill="#F1F1F1"/>`;
    this.MONTHS.forEach((mo, m) => (svg += `<text class="mo" x="${kx(m)}" y="${K.y0 + 18}" text-anchor="middle">${mo}</text>`));
    this.pv = Mock.html(`<svg class="pv" viewBox="0 0 1920 1080">${svg}</svg>`);
    all.appendChild(this.pv);
    const q = (s) => this.pv.querySelector(s);
    this.bars = this.MONTHS.map((_, m) => ({ b: this.BANDS.map((__, j) => q(`[data-b="${m}-${j}"]`)), p: q(`[data-p="${m}"]`), s: q(`[data-s="${m}"]`) }));
    this.v = { fc: q('[data-k="fc"]'), fcl: q('[data-k="fcl"]'), band: q('[data-k="band"]'), bud: q('[data-k="bud"]'), budl: q('[data-k="budl"]'),
      bandl: q('[data-k="bandl"]'), tl: q('[data-k="tl"]'), th: q('[data-k="th"]') };
    this.bx = bx;

    this.sur = Mock.mount(all, `<span class="mk-chip bad sur">Surprise</span>`).root;
    this.ring = Mock.mount(all, `<div class="ring"></div>`).root;
    this.tk = Mock.mount(all, `<div class="tk"></div>`).root;
    this.tkt = Mock.mount(all, `<div class="tkt"><div class="t">Token spend · Optimize</div>
      <div class="s">Forecasts, budgets and routing keep it inside its band.</div><span class="mk-chip demo">Simulated</span></div>`).root;
    this.rt = Mock.mount(all, `<span class="mk-chip y rt">Routed to the small model</span>`).root;

    this.glow = Mock.mount(world, `<div class="glow"></div>`).root;
    this.fin = Mock.mount(world, `<div class="fin"><span class="ln-mask"><span class="ln d" data-k="a">Forecastable</span></span>
      <span class="ln-mask"><span class="ln d y" data-k="b">AI.</span></span></div>`);
  },

  at(t) {
    const M = Mock, T = (this.timing(), this.T), P = this.P;
    const [sx] = [this.bx(P.lx, this.SPIKE)];

    M.camera(this.world, t, [
      { t: T.fee, rect: [1000, 206, 760, 400], dur: 1.2 },
      { t: T.spike, rect: [sx - 170, 226, 380, 330], dur: 1.2 },
      { t: T.opt, rect: [160, 640, 1600, 176], dur: 1.2 },
      { t: T.out, rect: null, dur: 1.2 },
    ]);

    /* the formula: cost per interaction times a live, climbing volume */
    ['b0', 'o1', 'b1', 'o2', 'b2'].forEach((k, i) => M.rise(this.fx[k], t, -0.4 + i * 0.1, { dy: 12 }));
    this.fx.vol.textContent = M.fmt.int(Math.round(M.ticker(t, 412_000_000, 1_830_000) / 1000) * 1000);
    const lo = M.ramp(t, T.lower - 0.2, T.lower + 2.2, 0.3, 0.6);
    this.fx.ya.style.boxShadow = `0 0 ${(22 * lo).toFixed(1)}px rgba(255,206,74,${(0.9 * lo).toFixed(2)})`;

    this.pn.forEach((el, i) => M.rise(el, t, -0.3 + i * 0.1, { dy: 14 }));
    ['t0', 's0', 't1', 's1'].forEach((k, i) => M.fade(this.lab[k], t, -0.2 + i * 0.05, 0.5));
    M.rise(this.lab.l0, t, T.spike + 0.6, { dy: 10 });
    M.rise(this.lab.l1, t, T.fee + 0.8, { dy: 10 });

    /* the bills, month by month; the forecast line was there before the year began */
    const H = P.y0 - P.y1;
    this.bars.forEach((bm, m) => {
      const g = M.p(t, this.mt(m), 0.55, 'outCubic');
      let y = P.y0;
      const total = this.bill(m);
      bm.b.forEach((r, j) => {
        const h = Math.max(0, total * this.BANDS[j][1] * H * g - 1.5);
        y -= h + (h ? 1.5 : 0);
        r.setAttribute('y', y.toFixed(1)); r.setAttribute('height', h.toFixed(1));
      });
      const hp = 0.17 * H * g, hs = 0.27 * H * g - 1.5;
      bm.p.setAttribute('y', (P.y0 - hp).toFixed(1)); bm.p.setAttribute('height', hp.toFixed(1));
      bm.s.setAttribute('y', (P.y0 - hp - 1.5 - Math.max(0, hs)).toFixed(1)); bm.s.setAttribute('height', Math.max(0, hs).toFixed(1));
      const bl = M.ramp(t, T.bill - 0.2 + m * 0.04, T.bill + 2.0, 0.25, 0.6);
      bm.s.style.filter = bl ? `drop-shadow(0 0 ${(10 * bl).toFixed(1)}px rgba(255,206,74,.9))` : 'none';
    });
    M.march(this.v.fc, M.abs(t), 10);
    this.v.fc.style.opacity = (0.55 + 0.45 * M.ramp(t, T.fee + 0.6, T.spike + 0.4, 0.4, 0.5)).toFixed(3);
    M.fade(this.v.fcl, t, 0.2, 0.5);

    /* the surprise: the spike month's marker, rung when the camera arrives */
    const spikeTop = P.y0 - this.bill(this.SPIKE) * H * M.p(t, this.mt(this.SPIKE), 0.55, 'outCubic');
    M.set(this.sur, { left: (sx + P.bw / 2 - 44).toFixed(1) + 'px', top: (spikeTop - 40).toFixed(1) + 'px' });
    M.rise(this.sur, t, this.mt(this.SPIKE) + 0.5, { dy: 8 });
    const rp = M.prog(t, T.spike + 0.9, 1.1);
    M.set(this.ring, { left: (sx + P.bw / 2).toFixed(1) + 'px', top: (spikeTop + 10).toFixed(1) + 'px',
      opacity: rp > 0 && rp < 1 ? (1 - rp).toFixed(3) : 0, transform: `scale(${(0.4 + 1.2 * M.ease.outCubic(rp)).toFixed(3)})` });

    /* token spend inside its band */
    M.rise(this.tk, t, -0.1, { dy: 14 });
    M.fade(this.tkt, t, 0.1, 0.5);
    M.fade(this.v.bud, t, 0.2, 0.5); M.fade(this.v.budl, t, 0.3, 0.5);
    const lit = M.p(t, T.opt + 0.5, 0.8);
    this.v.band.style.fill = `rgba(255,206,74,${(0.1 + 0.16 * lit).toFixed(3)})`;
    this.v.bandl.style.opacity = lit.toFixed(3);
    const mEnd = M.clamp((t - this.mt(0)) / 0.48, 0, 11);
    let d = '';
    for (let i = 0; i <= 60; i++) {
      const m = (mEnd * i) / 60, a = Math.floor(m), f = m - a;
      const v = M.lerp(this.tok(a), this.tok(Math.min(11, a + 1)), M.ease.inOutCubic(f));
      d += `${i ? 'L' : 'M'}${this.kx(m).toFixed(1)} ${this.ky(v).toFixed(1)}`;
    }
    this.v.tl.setAttribute('d', d);
    const ma = Math.floor(mEnd), vEnd = M.lerp(this.tok(ma), this.tok(Math.min(11, ma + 1)), M.ease.inOutCubic(mEnd - ma));
    this.v.th.setAttribute('cx', this.kx(mEnd)); this.v.th.setAttribute('cy', this.ky(vEnd));
    M.set(this.rt, { left: (this.kx(6) - 90).toFixed(1) + 'px', top: (this.ky(this.tok(6)) - 40).toFixed(1) + 'px' });
    M.rise(this.rt, t, this.mt(6) + 0.3, { dy: 8 });

    /* the charts step back; the promise in display type */
    const back = M.ease.inOutCubic(M.prog(t, T.fin, 1.0));
    this.all.style.opacity = (1 - 0.85 * back).toFixed(3);
    this.all.style.transform = back ? `scale(${(1 - 0.05 * back).toFixed(4)})` : 'none';
    this.all.style.filter = back ? `blur(${(6 * back).toFixed(1)}px)` : 'none';
    M.lineRise(this.fin.a, t, T.fin + 0.4, 1.1);
    M.lineRise(this.fin.b, t, T.fin + 0.65, 1.1);
    this.glow.style.opacity = (M.prog(t, T.fin + 0.8, 1.2) * (0.75 + 0.25 * M.wave(t, 4))).toFixed(3);
  },
});
