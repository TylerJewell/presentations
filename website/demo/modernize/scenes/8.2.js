/* Scene 8.2: many factories, in a loop. Each project runs as its own factory: sixty-five small factory lines run in
   parallel at the left, as when Akka ported 65 open-source projects at once. A cycle at the right assesses each
   factory's performance, measures its cost and turns both into improvements, which return to the factories for
   their next iteration. The only figure is the owner's 65; performance and cost are labels, not numbers. */
Fx.register({
  id: '8.2',

  COLS: 13, ROWS: 5, TX: 160, TY: 420, TS: 46, TG: 8,
  C: { x: 1340, y: 580, r: 220 },

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { own: at('own'), many: at('many'), count: at('sixty-five'), perf: at('performance,'), cost: at('cost'), improves: at('improves'), next: at('next') };
  },

  render(root) {
    root.classList.add('s82');
    Mock.style('s82', `
      .s82 .fl { --g: 0; width: 46px; height: 46px; border-radius: 8px; border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241, 241, 241, .16));
        background: rgba(255, 206, 74, calc(var(--g) * .10)); }
      .s82 .fl i { position: absolute; left: 7px; right: 7px; top: 20px; height: 4px; border-radius: 2px; background: rgba(241, 241, 241, .14); }
      .s82 .fl b { position: absolute; left: 7px; top: 20px; height: 4px; border-radius: 2px; background: var(--yellow); }
      .s82 .num { left: 160px; top: 300px; display: flex; align-items: baseline; gap: 20px; }
      .s82 .num .n { font: 700 84px/1 var(--sans); letter-spacing: -.04em; color: var(--yellow); }
      .s82 .num .l { font: 500 26px/1.25 var(--sans); color: var(--soft-grey); white-space: nowrap; }
      .s82 .lp { width: 300px; height: 96px; justify-content: center; background: #0e0e11; }
      .s82 .lp .nm { margin-top: 6px; font-size: 32px; }
      .s82 .nx { font: 600 18px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; white-space: nowrap; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'At scale', headline: 'Each project runs as its own factory, and many run at once.' });
    const M = Mock, C = this.C;
    /* the loop: from the factories, clockwise through performance, cost and improvements, and back */
    const S = Fx.svg(root, `
      <path data-k="ring" class="y dash" d="M${C.x - C.r} ${C.y} A${C.r} ${C.r} 0 0 1 ${C.x + C.r} ${C.y} A${C.r} ${C.r} 0 0 1 ${C.x - C.r} ${C.y}"/>
      <path data-k="out" class="y dash" d="M870 551 C1000 551 1000 ${C.y} ${C.x - C.r} ${C.y}"/>
      <path data-k="back" class="y" d="M${C.x - 150} ${C.y + C.r - 10} C1000 ${C.y + C.r - 10} 900 760 868 700"/>
      <path data-k="tip" class="y" d="M864 716 L868 700 L881 711"/>`);
    this.ring = S.k.ring; this.out = S.k.out; this.back = S.k.back; this.tip = S.k.tip;
    this.pks = Fx.stream(root, 4);
    this.tiles = [];
    for (let r = 0; r < this.ROWS; r++) for (let c = 0; c < this.COLS; c++) {
      const el = M.mount(root, `<div class="fl" style="left:${this.TX + c * (this.TS + this.TG)}px;top:${this.TY + r * (this.TS + this.TG)}px"><i></i><b></b></div>`).root;
      this.tiles.push({ el, bar: el.querySelector('b'), k: r * this.COLS + c });
    }
    this.num = M.mount(root, '<div class="num"><div class="n">65</div><div class="l">open-source projects, ported at once</div></div>').root;
    const card = (k, nm, cx, cy) => { const c = Fx.card(root, { x: cx - 150, y: cy - 48, w: 300, h: 96, k, nm }).root; c.classList.add('lp'); return c; };
    this.perf = card('Assessed', 'Performance', C.x, C.y - C.r);
    this.cost = card('Measured', 'Cost', C.x + C.r - 60, C.y);
    this.imp = card('Created', 'Improvements', C.x, C.y + C.r - 10);
    this.nx = M.mount(root, '<div class="nx" style="left:960px;top:812px">Next iteration</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* sixty-five factory lines appear and run, each at its own pace */
    this.tiles.forEach(({ el, bar, k }) => {
      M.fade(el, t, 0.6 + (k % 13) * 0.05 + Math.floor(k / 13) * 0.08, 0.3);
      const speed = 2.6 + ((k * 37) % 17) / 10, run = Math.max(0, t - K.many);
      const p = ((run / speed) + ((k * 0.137) % 1)) % 1;
      bar.style.width = (32 * (run > 0 ? p : 0)).toFixed(1) + 'px';
      Fx.glow(el, 0.15 + 0.35 * M.prog(t, K.many, 0.6) + 0.35 * M.ramp(t, K.next - 0.2 + (k % 13) * 0.04, K.next + 1.6 + (k % 13) * 0.04, 0.2, 0.5));
    });
    M.rise(this.num, t, K.count - 0.4);
    /* the loop: performance, then cost, then improvements, then back to the factories */
    M.draw(this.out, t, K.perf - 0.6, 0.4);
    M.draw(this.ring, t, K.perf - 0.3, 2.4, 'linear');
    if (M.prog(t, K.perf - 0.3, 2.4) >= 1) { this.ring.style.strokeDasharray = '6 7'; M.march(this.ring, t, -14); }
    [[this.perf, K.perf], [this.cost, K.cost], [this.imp, K.improves]].forEach(([c, k], i, a) => {
      M.rise(c, t, k - 0.4);
      const next = a[i + 1] ? a[i + 1][1] : this.duration + 1;
      Fx.glow(c, Math.max(M.ramp(t, k - 0.2, next, 0.3, 0.5), 0.3 * M.prog(t, next - 0.2, 0.4)));
    });
    M.draw(this.back, t, K.next - 0.4, 0.6);
    M.fade(this.tip, t, K.next + 0.1, 0.3);
    M.rise(this.nx, t, K.next, { dy: 8 });
    Fx.streamAt(this.pks, this.ring, t, K.improves, this.duration, 2.8);
  },
});
