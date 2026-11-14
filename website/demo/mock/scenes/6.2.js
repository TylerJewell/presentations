/* Scene 6.2: Every interaction, cheaper. One interaction dissected into thin cost slices, the conventional
   stack's padded with idle headroom provisioned for the peak, Akka's each a little thinner. A multiplier
   steps to a billion and the small gap opens into a wide area between two cost curves. A strip of customer
   proof rises under it, then lifts to sit under the platform's claim. Every figure in the strip is the
   live akka.io wording (demo/research/efficiency-numbers.md §4); none is drawn to scale but its own bars. */
registerScene({
  id: '6.2',
  act: 6,
  title: 'Every interaction, cheaper',
  duration: 16,
  caption: 'So every token, transaction and interaction costs a little less on Akka than on stacks that provision for the peak and meter every call. At a billion interactions, a little becomes a lot: our customers run the same work on a fraction of the cores, hardware and cost.',

  /* slices of one interaction: label, conventional height, idle headroom on top of it, Akka's share of it.
     The shares are qualitative: no per-resource figure is public. */
  SLICES: [
    ['Tokens', 54, 0, 0.93],
    ['Network', 30, 14, 0.82],
    ['Storage writes', 34, 15, 0.84],
    ['Memory', 40, 18, 0.8],
    ['Compute', 62, 28, 0.82],
  ],
  /* the proof strip: company, live-page wording, before and after bar lengths (0..1) */
  PROOF: [
    ['Fox / Tubi', '150,000 cores → 22,000', 1, 22 / 150],
    ['Verizon', 'Half the hardware,<br>TCO down by half', 1, 0.5],
    ['Esdiac', '65% lower infrastructure cost', 1, 0.35],
    ['Swiggy', '~50% less compute per prediction', 1, 0.5],
    ['Manulife', 'Up to 300% more concurrency', 0.25, 1],
  ],
  COL: { cx: 250, ax: 640, w: 220, bottom: 600, gap: 6 },
  CH: { x0: 1030, x1: 1720, y0: 536, y1: 276 },

  timing() {
    if (this.T) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.T = { thin: at('little'), pad: at('provision'), pull: at('At') - 0.7, m1: at('At') - 0.2, m2: at('billion') + 0.1, gap: at('lot') - 0.3,
      strip: at('our') - 0.6, lift: at('fraction') - 0.5 };
  },

  render(root) {
    root.classList.add('s62');
    Mock.style('s62', `
      .s62 .h { left: var(--gutter); top: 80px; }
      .s62 .top { left: 0; top: 0; width: 1920px; height: 1080px; }
      .s62 .top > * { position: absolute; }
      .s62 .colh { top: 226px; width: 220px; text-align: center; font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; }
      .s62 .sl { width: 220px; border-radius: 6px; }
      .s62 .sl.c { background: rgba(241,241,241,.22); }
      .s62 .sl.a { background: linear-gradient(180deg, rgba(255,206,74,.95), rgba(255,206,74,.72)); }
      .s62 .diff { left: 250px; width: 610px; height: 0; border-top: 1px dashed rgba(241,241,241,.35); }
      .s62 .less { left: 640px; width: 220px; border-radius: 6px 6px 0 0;
        background: repeating-linear-gradient(135deg, rgba(255,206,74,.22) 0 2px, rgba(255,206,74,0) 2px 7px); }
      .s62 .lessl { left: 640px; width: 220px; text-align: center; font: 600 14px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .s62 .hr { width: 220px; border-radius: 6px 6px 0 0; border: 1px dashed rgba(241,241,241,.28); border-bottom: 0;
        background: repeating-linear-gradient(135deg, rgba(241,241,241,.12) 0 2px, rgba(241,241,241,0) 2px 7px); }
      .s62 .sn { width: 160px; left: 470px; text-align: center; font: 600 12px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .s62 .foot { top: 616px; width: 220px; text-align: center; font: 500 15px/1 var(--sans); color: var(--medium-grey); }
      .s62 .pulse { width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; left: 0; top: 0; }
      .s62 .pulse.c { background: #d8d8d8; box-shadow: 0 0 12px 3px rgba(241,241,241,.35); }
      .s62 .pulse.a { background: #fff3cf; box-shadow: 0 0 16px 5px rgba(255,206,74,.6); }
      .s62 .idle { left: 250px; top: 196px; width: 220px; text-align: center; font: 500 14px/1 var(--sans); color: var(--soft-grey); }
      .s62 svg.ch { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s62 .ax { stroke: rgba(241,241,241,.28); stroke-width: 1.5; fill: none; }
      .s62 .cc { fill: none; stroke: #9a9a9a; stroke-width: 3; stroke-linejoin: round; }
      .s62 .ac { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; }
      .s62 .tk { font: 600 13px var(--sans); letter-spacing: .06em; fill: #6a6a6a; }
      .s62 .tg { font: 600 13px var(--sans); letter-spacing: .16em; text-transform: uppercase; }
      .s62 .mult { left: 1030px; top: 186px; font: 700 54px/1 var(--sans); letter-spacing: -.03em; color: var(--white); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .s62 .mult small { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); margin-left: 14px; }
      .s62 .gapl { left: 1064px; top: 300px; font: 700 34px/1.05 var(--sans); letter-spacing: -.025em; color: var(--white); }
      .s62 .lgd { left: 1030px; top: 584px; display: flex; gap: 28px; font: 600 13px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .s62 .lgd span { display: inline-flex; align-items: center; gap: 10px; }
      .s62 .lgd i { width: 12px; height: 12px; border-radius: 3px; }
      .s62 .strip { left: 160px; top: 640px; width: 1600px; height: 176px; }
      .s62 .strip > * { position: absolute; }
      .s62 .pc { top: 0; width: 300px; height: 176px; padding: 16px 18px; border: 1px solid var(--hair); border-radius: 12px; background: #0b0b0d; }
      .s62 .pc .nm { font: 700 22px/1 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .s62 .pc .fg { margin-top: 10px; height: 44px; font: 500 17px/1.28 var(--sans); color: var(--white); text-wrap: balance; }
      .s62 .pc .bars { margin-top: 12px; display: flex; flex-direction: column; gap: 7px; }
      .s62 .pc .bars i { display: block; height: 9px; border-radius: 3px; transform-origin: 0 50%; }
      .s62 .pc .bars i.b { background: rgba(241,241,241,.26); }
      .s62 .pc .bars i.a { background: var(--yellow); box-shadow: 0 0 12px -2px rgba(255,206,74,.5); }
      .s62 .pc .src { position: absolute; left: 18px; bottom: 14px; font: 500 12.5px/1 var(--sans); color: var(--medium-grey); }
      .s62 .claim { left: var(--gutter); top: 150px; width: 1600px; }
      .s62 .claim .n { display: flex; align-items: baseline; gap: 26px; font: 700 216px/.9 var(--sans); letter-spacing: -.05em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .s62 .claim .n small { font: 700 64px/1 var(--sans); letter-spacing: -.03em; color: var(--white); }
      .s62 .claim .l { margin-top: 18px; font: 700 64px/1 var(--sans); letter-spacing: -.03em; color: var(--white); }
      .s62 .claim .s { margin-top: 16px; font: 500 22px/1.3 var(--sans); color: var(--soft-grey); }
      .s62 .glow { left: 100px; top: 60px; width: 1300px; height: 460px; border-radius: 50%;
        background: radial-gradient(closest-side, rgba(255,206,74,.13), rgba(255,206,74,0)); }
    `);
    const world = (this.world = Mock.world(root));
    Mock.dotGrid(world);
    const top = (this.top = Mock.html('<div class="top"></div>'));
    world.appendChild(top);
    this.h = Mock.mount(top, `<h2 class="mk-h2 h">Every interaction, <span class="accent">cheaper.</span></h2>`).root;

    /* the dissection: slices stack bottom-up in each column */
    const C = this.COL;
    this.colh = [
      Mock.mount(top, `<div class="colh" style="left:${C.cx}px;color:var(--soft-grey)">Conventional stack</div>`).root,
      Mock.mount(top, `<div class="colh" style="left:${C.ax}px;color:var(--yellow)">Akka</div>`).root,
    ];
    this.foot = [C.cx, C.ax].map((x) => Mock.mount(top, `<div class="foot" style="left:${x}px">One interaction</div>`).root);
    this.sl = this.SLICES.map(([nm]) => ({
      c: Mock.mount(top, `<div class="sl c" style="left:${C.cx}px"></div>`).root,
      hr: Mock.mount(top, `<div class="hr" style="left:${C.cx}px"></div>`).root,
      a: Mock.mount(top, `<div class="sl a" style="left:${C.ax}px"></div>`).root,
      n: Mock.mount(top, `<div class="sn">${nm}</div>`).root,
    }));
    this.pulses = ['c', 'a'].map((k) => Mock.mount(top, `<div class="pulse ${k}"></div>`).root);

    /* the multiplier and the two curves */
    const CH = this.CH;
    this.mult = Mock.mount(top, `<div class="mult"><span data-k="v">×1</span><small>Interactions</small></div>`);
    this.ch = Mock.html(`<svg class="ch" viewBox="0 0 1920 1080">
      <defs><linearGradient id="s62g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFCE4A" stop-opacity=".9"/><stop offset="1" stop-color="#FFCE4A" stop-opacity=".45"/></linearGradient>
        <filter id="s62b" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="24"/></filter></defs>
      <path class="ax" data-k="ax" d="M${CH.x0} ${CH.y1 - 10}V${CH.y0}H${CH.x1 + 10}"/>
      <path data-k="glow" fill="#FFCE4A" filter="url(#s62b)" opacity="0"/><path data-k="gap" fill="url(#s62g)" opacity="0"/>
      <path class="cc" data-k="cc"/><path class="ac" data-k="ac"/>
      <text class="tk" x="${CH.x0}" y="${CH.y0 + 28}">×1</text>
      <text class="tk" x="${this.cx(6)}" y="${CH.y0 + 28}" text-anchor="middle">×1,000,000</text>
      <text class="tk" x="${CH.x1}" y="${CH.y0 + 28}" text-anchor="end">×1,000,000,000</text>
      <text class="tg" x="${CH.x0 - 12}" y="${CH.y1 + 4}" fill="#4E4E4E" text-anchor="end">Cost</text></svg>`);
    top.appendChild(this.ch);
    const q = (k) => this.ch.querySelector(`[data-k="${k}"]`);
    this.c = { ax: q('ax'), cc: q('cc'), ac: q('ac'), gap: q('gap'), glow: q('glow') };
    this.gapl = Mock.mount(top, `<div class="gapl">A little becomes a lot.</div>`).root;
    this.lgd = Mock.mount(top, `<div class="lgd"><span><i style="background:#9a9a9a"></i>Provisioned for the peak, metered per call</span><span><i style="background:var(--yellow)"></i>Akka</span></div>`).root;
    this.diff = Mock.mount(top, `<div class="diff"></div>`).root;
    this.less = Mock.mount(top, `<div class="less"></div>`).root;
    this.lessl = Mock.mount(top, `<div class="lessl">A little less</div>`).root;

    /* the claim, and the strip it resolves into */
    this.glow = Mock.mount(world, `<div class="glow"></div>`).root;
    this.claim = Mock.mount(world, `<div class="claim"><div class="n" data-k="n"><small>Up to</small><span data-k="v">0%</span></div>
      <div class="l" data-k="l">lower infrastructure cost</div><div class="s" data-k="s">The Akka platform: shared compute and actor density, for the same transaction volume.</div></div>`);
    this.strip = Mock.mount(world, `<div class="strip"></div>`).root;
    this.cards = this.PROOF.map(([nm, fg, b, a], i) => Mock.mount(this.strip, `<div class="pc" style="left:${i * 325}px">
      <div class="nm">${nm}</div><div class="fg">${fg}</div>
      <div class="bars"><i class="b" data-k="b" style="width:${(264 * b).toFixed(0)}px"></i><i class="a" data-k="a" style="width:${Math.max(4, 264 * a).toFixed(0)}px"></i></div>
      <div class="src">akka.io</div></div>`));
  },

  /** x of a decade of interactions (0..9) on the volume axis; drawn evenly, as on a log axis. */
  cx(d) { return this.CH.x0 + (d / 9) * (this.CH.x1 - this.CH.x0); },
  /** The two cost curves over u = 0..1 of the axis: Akka smooth, the conventional stack in provisioned steps. */
  costA(u) { return 0.06 + 0.4 * Math.pow(u, 2.2); },
  costC(u) { const s = Math.ceil(u * 7 - 1e-9) / 7; return 0.09 + 0.86 * Math.pow(Math.max(u, s), 2.2); },

  at(t) {
    const M = Mock, T = (this.timing(), this.T), C = this.COL;

    /* camera: in on the one interaction, out when the multiplier starts */
    M.camera(this.world, t, [{ t: -1, rect: [180, 190, 700, 450], dur: 0.6 }, { t: T.pull, rect: null, dur: 1.2 }]);
    M.rise(this.h, t, T.pull + 0.2);
    this.colh.forEach((el, i) => M.rise(el, t, -0.3 + i * 0.1, { dy: 10 }));
    this.foot.forEach((el) => M.fade(el, t, 0.2, 0.5));

    /* the slices: Akka thins at "a little less", the conventional stack pads with headroom at "provision" */
    const thin = M.p(t, T.thin, 1.0, 'inOutCubic'), pad = M.p(t, T.pad, 1.0, 'inOutCubic');
    let yc = C.bottom, ya = C.bottom;
    const bands = [];
    this.SLICES.forEach(([, h, idle, share], i) => {
      const s = this.sl[i];
      const ha = h * M.lerp(1, share, thin), hi = idle * pad;
      yc -= h; ya -= ha;
      M.set(s.c, { top: yc.toFixed(1) + 'px', height: h + 'px' });
      M.set(s.a, { top: ya.toFixed(1) + 'px', height: ha.toFixed(1) + 'px' });
      M.set(s.hr, { top: (yc - hi).toFixed(1) + 'px', height: hi.toFixed(1) + 'px', opacity: hi > 0.5 ? 1 : 0 });
      bands.push([yc, ya, h, ha]);
      const mid = yc + (h - hi) / 2;
      M.set(s.n, { top: (mid - 6).toFixed(1) + 'px' });
      M.fade(s.n, t, 0.1 + 0.06 * i, 0.5);
      yc -= hi + C.gap; ya -= C.gap;
    });
    /* the difference per interaction: the conventional top carried across, the gap above Akka shaded */
    const cTop = yc + C.gap, aTop = ya + C.gap, dv = M.p(t, T.thin + 0.6, 0.6);
    M.set(this.diff, { top: cTop.toFixed(1) + 'px', opacity: dv.toFixed(3) });
    M.set(this.less, { top: cTop.toFixed(1) + 'px', height: Math.max(0, aTop - cTop).toFixed(1) + 'px', opacity: dv.toFixed(3) });
    M.set(this.lessl, { top: (cTop - 26).toFixed(1) + 'px' });
    M.fade(this.lessl, t, T.thin + 0.8, 0.5);
    /* an interaction passes up through each column, on the live clock */
    [C.cx, C.ax].forEach((x, k) => {
      const u = M.loop(t, 2.4, k * 0.3), top = k ? ya + C.gap : yc + C.gap;
      const y = M.lerp(C.bottom - 4, top + 6, M.ease.inOutCubic(u));
      M.set(this.pulses[k], { transform: `translate(${(x + C.w / 2).toFixed(1)}px, ${y.toFixed(1)}px)`, opacity: (Math.min(1, 6 * u, 6 * (1 - u)) * (1 - M.prog(t, T.lift - 0.4, 0.4))).toFixed(3) });
    });

    /* the multiplier steps to a million, then a billion; the curves draw to it */
    M.fade(this.ch, t, T.pull + 0.2, 0.6);
    M.rise(this.mult.root, t, T.pull + 0.3, { dy: 12 });
    const dec = 6 * M.ease.inOutCubic(M.prog(t, T.m1, 0.8)) + 3 * M.ease.inOutCubic(M.prog(t, T.m2, 0.8));
    const mv = Math.pow(10, dec);
    const ms = '×' + M.fmt.int(dec >= 8.999 ? 1e9 : dec >= 5.999 && dec < 6.001 ? 1e6 : mv < 10 ? Math.round(mv) : Number(mv.toPrecision(2)));
    if (this.mult.v.textContent !== ms) this.mult.v.textContent = ms;
    const CH = this.CH, uEnd = Math.max(0.02, dec / 9);
    const X = (u) => CH.x0 + u * (CH.x1 - CH.x0), Y = (v) => CH.y0 - v * (CH.y0 - CH.y1);
    let dA = '', dC = '', back = '';
    for (let i = 0; i <= 140; i++) {
      const u = (uEnd * i) / 140, c = i ? 'L' : 'M';
      dA += `${c}${X(u).toFixed(1)} ${Y(this.costA(u)).toFixed(1)}`;
      dC += `${c}${X(u).toFixed(1)} ${Y(this.costC(u)).toFixed(1)}`;
    }
    for (let i = 140; i >= 0; i--) { const u = (uEnd * i) / 140; back += `L${X(u).toFixed(1)} ${Y(this.costA(u)).toFixed(1)}`; }
    this.c.ac.setAttribute('d', dA);
    this.c.cc.setAttribute('d', dC);
    const area = dC + back + 'Z';
    this.c.gap.setAttribute('d', area);
    this.c.glow.setAttribute('d', area);
    const g = M.prog(t, T.m2, 1.2);
    this.c.gap.style.opacity = (0.12 + 0.45 * g).toFixed(3);
    this.c.glow.style.opacity = ((0.1 + 0.35 * g) * (0.85 + 0.15 * M.wave(t, 2.6))).toFixed(3);
    M.fade(this.lgd, t, T.pull + 0.5, 0.5);
    M.rise(this.gapl, t, T.gap, { dy: 12 });

    /* the proof strip rises, its bars run before then after; then it lifts under the claim */
    const lift = M.ease.inOutCubic(M.prog(t, T.lift, 1.0));
    this.top.style.opacity = (1 - M.prog(t, T.lift, 0.6)).toFixed(3);
    this.top.style.transform = lift ? `translateY(${(-40 * lift).toFixed(1)}px)` : 'none';
    this.cards.forEach((cd, i) => {
      const s = T.strip + i * 0.16;
      M.rise(cd.root, t, s, { dy: 26 });
      cd.b.style.transform = `scaleX(${M.p(t, s + 0.3, 0.6, 'outCubic').toFixed(3)})`;
      cd.a.style.transform = `scaleX(${M.p(t, s + 0.7, 0.9, 'outCubic').toFixed(3)})`;
    });
    this.strip.style.transform = lift ? `translateY(${(-130 * lift).toFixed(1)}px)` : 'none';
    M.rise(this.claim.n, t, T.lift + 0.35);
    M.countUp(this.claim.v, t, T.lift + 0.4, 1.0, 0, 90, (v) => Math.round(v) + '%');
    M.rise(this.claim.l, t, T.lift + 0.55);
    M.rise(this.claim.s, t, T.lift + 0.75, { dy: 10 });
    this.glow.style.opacity = (M.prog(t, T.lift + 0.6, 1.0) * (0.8 + 0.2 * M.wave(t, 3))).toFixed(3);
  },
});
