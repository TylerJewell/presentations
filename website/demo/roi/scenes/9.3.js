/* Scene 9.3: Specify, the knowledge stays with the system. One drawing in four moves. The specification card and
   Akka's context card stand above a row of five services, each with its engineer. One engineer leaves and the
   service stays as it was; the context ticks to a new version and a pulse re-aligns every service along the
   rail. Then, at the right, 65 factories fill at once, and the roadmap's 2028 and 2029 work folds into 2027. */
Roi.register({
  id: '9.3',

  SX: [160, 390, 620, 850, 1080],   /* service tiles, 200 wide */

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { leaves: at('leaves,'), stays: at('stays'), context: at('Specify'), realigns: at('current'), debt: at('technical'), fewer: 1e9,
      factory: at('Because'), ported: at('ported'), road: at('roadmap'), delivered: at('delivered') };
  },

  render(root) {
    root.classList.add('r93');
    Mock.style('r93', `
      .r93 .ro-head { width: 1200px; }
      .r93 .box { border: 1px solid var(--hair-hi); border-radius: 14px; background: rgba(255,255,255,.025); padding: 20px 24px; }
      .r93 .box .k { font: 600 14px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 14px; }
      .r93 .box .t { font: 700 26px/1.15 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .r93 .box .it { margin-top: 10px; font: 500 20px/1.3 var(--sans); color: var(--soft-grey); }
      .r93 .ctx { border-color: rgba(255,206,74,.45); }
      .r93 .ver { position: absolute; right: 22px; top: 20px; font: 600 16px/1 var(--mono); color: var(--yellow); padding: 6px 9px; border-radius: 6px; border: 1px solid rgba(255,206,74,.45); }
      .r93 .der { --g: 0; left: 600px; width: 320px; height: 44px; border-radius: 9px; display: flex; align-items: center; padding: 0 16px; font: 600 19px/1 var(--sans);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.16)); background: var(--medium-black); }
      .r93 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r93 .w path.rl { fill: none; stroke: rgba(241,241,241,.35); stroke-width: 1.5; }
      .r93 .w path.eng { fill: none; stroke: var(--white); stroke-width: 2; stroke-linejoin: round; }
      .r93 .w path.eng.new { stroke: var(--yellow); }
      .r93 .w path.span { fill: none; stroke: var(--yellow); stroke-width: 2; }
      .r93 .svc { --g: 0; top: 690px; width: 200px; height: 70px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 10px; font: 600 20px/1 var(--sans);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 75%), rgba(241,241,241,.18));
        background: color-mix(in srgb, #2a2410 calc(var(--g) * 100%), var(--medium-black)); box-shadow: 0 0 calc(var(--g) * 40px) calc(var(--g) * -10px) rgba(255,206,74,.8); }
      .r93 .svc svg { width: 18px; height: 18px; overflow: visible; }
      .r93 .svc svg path { fill: none; stroke: var(--green); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
      .r93 .cap { left: 160px; top: 790px; font: 500 22px/1.3 var(--sans); color: var(--soft-grey); }
      .r93 .par { left: 1420px; top: 260px; width: 340px; }
      .r93 .par .grid { display: grid; grid-template-columns: repeat(13, 20px); gap: 6px; margin-top: 14px; }
      .r93 .par .grid i { --g: 0; width: 20px; height: 20px; border-radius: 4px; border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 70%), rgba(241,241,241,.18));
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), var(--medium-black)); }
      .r93 .par .n { margin-top: 18px; font: 700 56px/1 var(--sans); letter-spacing: -.035em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .r93 .par .l { margin-top: 8px; font: 500 20px/1.3 var(--sans); color: var(--soft-grey); }
      .r93 .road { left: 1420px; top: 600px; width: 340px; }
      .r93 .road .yrs { position: relative; display: flex; gap: 10px; margin-top: 14px; height: 110px; }
      .r93 .road .yr { --g: 0; flex: 1; border-radius: 10px; padding: 10px 0 0; text-align: center; font: 700 24px/1 var(--sans); letter-spacing: -.02em;
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.18)); background: var(--medium-black); }
      .r93 .road .it { position: absolute; width: 88px; height: 14px; border-radius: 4px; background: rgba(255,206,74,.75); }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'People', headline: 'The knowledge stays with the system.', lit: 3 });
    this.spec = M.mount(root, `<div class="box" style="left:160px;top:260px;width:360px;height:212px">
      <div class="k">Specification</div><div class="t">What the system is for</div>
      <div class="it" data-k="i0">Findings</div><div class="it" data-k="i1">Decisions</div><div class="it" data-k="i2">Concepts</div></div>`);
    this.der = ['Code', 'Tests', 'Documentation', 'Architecture'].map((text, i) => M.mount(root, `<div class="der" style="top:${260 + i * 56}px">${text}</div>`).root);
    this.ctx = M.mount(root, `<div class="box ctx" style="left:1000px;top:260px;width:360px;height:212px">
      <div class="k">Akka’s context</div><div class="t">Current best practice</div>
      <div class="it">Patterns, components and conformance rules</div><div class="ver" data-k="ver">v12</div></div>`);
    const eng = (cx, cy) => `M${cx - 9} ${cy - 22}a9 9 0 1 1 18 0a9 9 0 1 1-18 0M${cx - 26} ${cy + 22}c0-16 12-26 26-26s26 10 26 26`;
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">
      ${this.der.map((_, i) => `<path class="rl" d="M520 366 C560 366 560 ${282 + i * 56} 600 ${282 + i * 56}"/>`).join('')}
      <path class="rl" d="M1180 472 V548"/>
      ${this.SX.map((x) => `<path class="eng" d="${eng(x + 100, 640)}"/>`).join('')}
      <path class="eng new" d="${eng(this.SX[2] + 100, 640)}"/>
      <path class="span" d="M${this.SX[0] + 100} 660 V676 H${this.SX[4] + 100} V660"/>
    </svg>`);
    root.appendChild(this.svg);
    this.rails = [...this.svg.querySelectorAll('.rl')];
    this.engs = [...this.svg.querySelectorAll('.eng:not(.new)')];
    this.newEng = this.svg.querySelector('.eng.new');
    this.span = this.svg.querySelector('.span');
    this.rail = M.rail(root, { style: { left: '160px', top: '724px', width: '1120px' } });
    this.svcs = this.SX.map((x, i) => M.mount(root, `<div class="svc" style="left:${x}px">Service ${i + 1}<svg viewBox="0 0 18 18"><path data-k="ck" d="M3 9.5l4 4 8-9"/></svg></div>`));
    this.cap = M.mount(root, '<div class="cap">Specify re-aligns every system as best practice changes.</div>').root;
    /* factories at once: 65 squares fill in parallel; then the roadmap's later years fold into 2027 */
    this.par = M.mount(root, `<div class="par"><div class="ro-side">Factories at once</div><div class="grid" data-k="grid">${Array.from({ length: 65 }, () => '<i></i>').join('')}</div>
      <div class="n" data-k="n">0</div><div class="l">open-source projects ported in parallel</div></div>`);
    this.cells = [...this.par.grid.children];
    this.road = M.mount(root, `<div class="road"><div class="ro-side">The roadmap</div><div class="yrs" data-k="yrs">${['2027', '2028', '2029'].map((y) => `<div class="yr">${y}</div>`).join('')}
      ${[0, 1, 2, 3].map(() => '<div class="it"></div>').join('')}</div></div>`);
    this.yrs = [...this.road.yrs.querySelectorAll('.yr')];
    this.items = [...this.road.yrs.querySelectorAll('.it')];
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* move 1: the specification, what is drawn from it, the context, and the services with their engineers */
    M.rise(this.spec.root, t, 0.3);
    ['i0', 'i1', 'i2'].forEach((k, i) => M.rise(this.spec[k], t, 0.6 + i * 0.15, { dy: 8 }));
    this.rails.slice(0, 4).forEach((p, i) => M.draw(p, t, 0.9 + i * 0.12, 0.5));
    this.der.forEach((el, i) => M.rise(el, t, 1.2 + i * 0.12, { dy: 8 }));
    M.rise(this.ctx.root, t, 0.8);
    M.draw(this.rails[4], t, 1.4, 0.5);
    M.railGrow(this.rail, t, 1.6, 1.0);
    M.railAt(this.rail, t, 8);
    /* move 2: the engineer of service 3 leaves; the service stays lit; another engineer arrives */
    const gone = M.prog(t, K.leaves + 0.2, 0.6);
    /* move 3: the context ticks to a new version and a pulse re-aligns every service */
    const tick = M.prog(t, K.realigns - 0.4, 0.4);
    this.ctx.ver.textContent = tick >= 1 ? 'v13' : 'v12';
    this.ctx.ver.style.boxShadow = `0 0 ${(26 * M.ramp(t, K.context, K.realigns + 1.6, 0.3, 0.8)).toFixed(1)}px rgba(255,206,74,.9)`;
    const pulse = M.prog(t, K.realigns, 2.4);   /* 0..1 along the rail */
    const dimTop = 1 - 0.55 * M.prog(t, K.fewer, 0.6);
    this.svcs.forEach((s, i) => {
      M.rise(s.root, t, 1.8 + i * 0.1);
      const here = (i + 0.5) / 5, d = pulse - here;
      const passing = d > -0.08 && d < 0.1 ? 1 : 0;
      const flicker = passing ? 0.55 + 0.45 * Math.sin(t * 60) : 0;
      const done = pulse >= here + 0.1 ? 1 : 0;
      let g = Math.max(flicker, done * 0.35 * (1 - M.prog(t, K.fewer, 0.8)));
      if (i === 2) g = Math.max(g, 0.7 * M.ramp(t, K.leaves, K.context + 0.4, 0.4, 0.6));   /* the service whose engineer leaves stays as it was */
      Roi.glow(s.root, g);
      s.ck.style.opacity = done ? M.prog(t, K.realigns + here * 2.4 + 0.3, 0.3) : 0;
      M.draw(s.ck, t, K.realigns + here * 2.4 + 0.3, 0.35);
    });
    M.rise(this.cap, t, K.realigns + 0.3, { dy: 8 });
    this.cap.style.opacity = (parseFloat(this.cap.style.opacity) * (1 - M.prog(t, K.fewer - 0.3, 0.5))).toFixed(3);
    /* move 4: the engineers fold to one and a span joins the services */
    this.engs.forEach((p, i) => {
      M.draw(p, t, 2.0 + i * 0.1, 0.6);
      let o = 1;
      if (i === 2) o = 1 - gone;
      else if (i > 0) o = 1 - M.prog(t, K.fewer + 0.2, 0.6);
      p.style.opacity = (o * M.prog(t, 2.0 + i * 0.1, 0.1)).toFixed(3);
    });
    M.draw(this.newEng, t, K.stays + 0.2, 0.6);
    this.newEng.style.opacity = (M.prog(t, K.stays + 0.2, 0.1) * (1 - M.prog(t, K.fewer + 0.2, 0.6))).toFixed(3);
    M.draw(this.span, t, K.fewer + 0.6, 0.9);
    this.span.style.opacity = M.prog(t, K.fewer + 0.6, 0.1);
    [this.spec.root, this.ctx.root, ...this.der].forEach((el) => (el.style.opacity = (parseFloat(el.style.opacity) * dimTop).toFixed(3)));
    this.rails.forEach((p) => (p.style.opacity = dimTop.toFixed(3)));
    /* move 4: many factories at once, then the roadmap folds into 2027 */
    M.rise(this.par.root, t, K.factory - 0.3);
    const fill = M.prog(t, K.factory + 0.2, K.ported - K.factory + 0.8);
    this.cells.forEach((c, i) => Roi.glow(c, M.prog(fill * 65, (i * 37) % 65, 1)));
    this.par.n.textContent = String(Math.round(65 * fill));
    M.rise(this.road.root, t, K.road - 0.4);
    const fold = M.ease.inOutCubic(M.prog(t, K.delivered - 0.2, 1.2));
    this.items.forEach((it, i) => {
      const from = 1 + (i >> 1), x0 = 6 + from * 116, x1 = 6, y = 50 + (i % 2) * 22 + (i >> 1) * 0;
      const y1 = 44 + i * 16;
      M.set(it, { left: M.lerp(x0, x1, fold).toFixed(1) + 'px', top: M.lerp(y, y1, fold).toFixed(1) + 'px', opacity: M.prog(t, K.road, 0.4).toFixed(3) });
    });
    this.yrs.forEach((y, i) => Roi.glow(y, i === 0 ? M.prog(t, K.delivered + 0.6, 0.5) : 0));
  },
});
