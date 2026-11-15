/* Scene 1.6: what this film shows. The factory line from 1.2 returns, with one existing system at its start and an
   empty twin under "Pre-production" at its end. Its five stations name themselves in turn: Discover, Decide,
   Specify, Build, Release. */
Fx.register({
  id: '1.6',

  CX: [540, 740, 940, 1140, 1340],   /* station centres; the rail runs at y 560 */
  KEYS: ['discover,', 'decide,', 'specify,', 'build', 'release.'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { existing: at('existing'), twin: at('twin'), st: this.KEYS.map((w) => at(w)) };
  },

  render(root) {
    root.classList.add('s16');
    Mock.style('s16', `
      .s16 .sys .nm { margin-top: 10px; font-size: 30px; }
      .s16 .fx-step { font-size: 24px; height: 72px; }
      .s16 .pre { left: 1500px; top: 452px; width: 260px; text-align: center; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'What this film shows', headline: 'This film follows the modernization of one existing system.' });
    const S = Fx.svg(root, '<path data-k="rail" class="y dash" d="M420 560 H1500"/>');
    this.rail = S.k.rail;
    this.pks = Fx.stream(root, 3);
    this.steps = Fx.STATIONS.map((text, i) => Fx.step(root, { x: this.CX[i] - 85, y: 524, w: 170, text }));
    this.twin = Fx.card(root, { x: 1500, y: 495, w: 260, h: 130, ghost: true }).root;
    this.pre = Mock.mount(root, '<div class="pre fx-side">Pre-production</div>').root;
    this.sys = Fx.card(root, { x: 160, y: 495, w: 260, h: 130, k: 'Existing system', nm: 'One system' }).root;
    this.sys.classList.add('sys');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sys, t, K.existing - 0.3);
    Fx.glow(this.sys, M.ramp(t, K.existing, K.twin, 0.3, 0.6));
    M.draw(this.rail, t, 0.6, 1.2);
    if (M.prog(t, 0.6, 1.2) >= 1) { this.rail.style.strokeDasharray = '6 7'; M.march(this.rail, t, 14); }
    M.fade(this.twin, t, K.twin - 0.4, 0.6);
    M.rise(this.pre, t, K.twin - 0.3, { dy: 8 });
    Fx.glow(this.twin, M.ramp(t, K.twin - 0.2, K.st[0] - 0.4, 0.3, 0.5));
    /* the stations name themselves in turn, then hold together */
    this.steps.forEach((el, i) => {
      M.rise(el, t, K.st[i] - 0.35, { dy: 12 });
      const next = K.st[i + 1] != null ? K.st[i + 1] : this.duration + 1;
      Fx.glow(el, Math.max(0.12, M.ramp(t, K.st[i] - 0.2, next + 0.1, 0.25, 0.5), 0.55 * M.prog(t, K.st[4] + 0.6, 0.5)));
    });
    Fx.streamAt(this.pks, this.rail, t, K.st[4] + 0.4, this.duration, 1.8);
  },
});
