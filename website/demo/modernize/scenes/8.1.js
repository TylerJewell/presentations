/* Scene 8.1: into the organization's own network. The twin card from 2.1 fills in and moves into a frame labelled
   "Your VPC". Two regions sit inside it, both active, with data replicating both ways. A "Pre-production · user
   acceptance" tag settles on it. The original stays beside it, still pricing shipments, for a parallel run. */
Fx.register({
  id: '8.1',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { network: at('network.'), release: at('release'), pre: at('pre-production'), active: at('active'), high: at('high'), original: at('original'), live: at('live') };
  },

  render(root) {
    root.classList.add('s81');
    Mock.style('s81', `
      .s81 .vpc { left: 660px; top: 300px; width: 1100px; height: 470px; border-radius: 18px; border: 1.5px dashed rgba(255, 206, 74, .55); background: rgba(255, 206, 74, .02); }
      .s81 .vpcl { left: 692px; top: 324px; color: var(--yellow); }
      .s81 .tag { left: 1200px; top: 316px; width: 530px; display: flex; justify-content: flex-end; }
      .s81 .tag .fx-chip { color: var(--yellow); border-color: rgba(255, 206, 74, .55); background: rgba(255, 206, 74, .08); }
      .s81 .reg { top: 390px; width: 480px; height: 300px; border-radius: 14px; border: 1px solid rgba(241, 241, 241, .18); background: rgba(255, 255, 255, .02); }
      .s81 .reg .k { position: absolute; left: 24px; top: 22px; font: 600 16px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); }
      .s81 .reg .act { position: absolute; left: 24px; bottom: 22px; font: 600 16px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--green); }
      .s81 .twin { justify-content: center; }
      .s81 .twin .nm { margin-top: 8px; font-size: 32px; }
      .s81 .orig .nm { font-size: 32px; }
      .s81 .rep { left: 1180px; top: 708px; width: 60px; text-align: center; }
      .s81 .note { font: 500 22px/1.3 var(--sans); color: var(--soft-grey); white-space: nowrap; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Release', headline: 'A release goes straight into <span style="white-space:nowrap">pre-production</span> for user acceptance.', station: 4 });
    const M = Mock;
    this.vpc = M.mount(root, '<div class="vpc"></div>').root;
    this.vpcl = M.mount(root, '<div class="vpcl fx-side">Your VPC</div>').root;
    this.tag = M.mount(root, '<div class="tag"><div class="fx-chip">Pre-production · user acceptance</div></div>').root;
    this.regs = [700, 1240].map((x, i) => M.mount(root, `<div class="reg" style="left:${x}px"><div class="k">Region ${i + 1}</div><div class="act" data-k="act">Active</div></div>`));
    const S = Fx.svg(root, `<path data-k="r1" class="y dash" d="M1180 510 H1240"/><path data-k="r2" class="y dash" d="M1240 570 H1180"/>
      <path data-k="par" class="y dash" d="M500 540 H700"/>`);
    this.rep = [S.k.r1, S.k.r2]; this.par = S.k.par;
    this.pkRep = this.rep.map(() => Fx.stream(root, 1));
    this.pkPar = Fx.stream(root, 3);
    this.repl = M.mount(root, '<div class="note" style="left:1060px;top:704px;width:300px;text-align:center">Replicating both ways</div>').root;
    this.parl = M.mount(root, '<div class="note" style="left:160px;top:664px">Parallel run on live traffic</div>').root;
    this.orig = Fx.card(root, { x: 160, y: 440, w: 340, h: 200, k: 'The original', nm: 'Freight rating', tx: 'Still pricing shipments' }).root;
    this.orig.classList.add('orig');
    this.copy = Fx.card(root, { x: 1270, y: 470, w: 420, h: 130, k: 'Verified twin', nm: 'Freight rating' });
    this.copy.root.classList.add('twin');
    this.twin = Fx.card(root, { x: 0, y: 0, w: 260, h: 130, k: 'Verified twin', nm: 'Freight rating' });
    this.twin.root.classList.add('twin');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* the network frame */
    M.fade(this.vpc, t, 0.6, 0.8);
    M.rise(this.vpcl, t, 0.9, { dy: 8 });
    /* the twin, empty where 2.1 left it, fills in as the release passes, then moves into region 1 */
    const fill = M.prog(t, K.release, 0.8), mv = M.p(t, K.pre - 0.3, 1.2, 'inOutCubic');
    const el = this.twin.root;
    M.fade(el, t, 0.3, 0.6);
    el.classList.toggle('ghost', fill < 0.5);
    this.twin.k.style.opacity = fill; this.twin.nm.style.opacity = fill;
    M.set(el, { left: M.lerp(1500, 730, mv).toFixed(1) + 'px', top: M.lerp(495, 470, mv).toFixed(1) + 'px', width: M.lerp(260, 420, mv).toFixed(1) + 'px' });
    Fx.glow(el, 0.3 + 0.5 * fill);
    M.rise(this.tag, t, K.pre + 0.4, { dy: -14 });
    /* two regions, both active, replicating both ways */
    this.regs.forEach((r, i) => { M.fade(r.root, t, K.pre + 0.2 + i * 0.3, 0.6); M.fade(r.act, t, K.active - 0.1 + i * 0.2, 0.4); });
    M.rise(this.copy.root, t, K.active - 0.2);
    Fx.glow(this.copy.root, 0.8 * M.prog(t, K.active, 0.5));
    this.rep.forEach((p, i) => {
      const s = K.active + 0.3 + i * 0.2;
      M.draw(p, t, s, 0.4);
      if (M.prog(t, s, 0.4) >= 1) { p.style.strokeDasharray = '6 7'; M.march(p, t, i ? -14 : 14); }
      Fx.streamAt(this.pkRep[i], p, t, s + 0.4, this.duration, 1.2);
    });
    M.rise(this.repl, t, K.high - 0.2, { dy: 8 });
    /* the original keeps pricing beside it, for a parallel run */
    M.rise(this.orig, t, K.original - 0.4);
    Fx.glow(this.orig, 0.5 * M.prog(t, K.original, 0.5));
    M.draw(this.par, t, K.original + 0.2, 0.5);
    if (M.prog(t, K.original + 0.2, 0.5) >= 1) { this.par.style.strokeDasharray = '6 7'; M.march(this.par, t, 14); }
    Fx.streamAt(this.pkPar, this.par, t, K.original + 0.6, this.duration, 1.4);
    M.rise(this.parl, t, K.live - 0.6, { dy: 8 });
  },
});
