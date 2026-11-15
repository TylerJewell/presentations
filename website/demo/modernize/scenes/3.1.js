/* Scene 3.1: Discover, what goes in. Four kinds of input feed discovery: the user requirements, the support tickets,
   an analysis of peers and rivals, and, when one exists, the existing system itself. Each lights as it is named and
   sends its work along a rail into discovery. The freight-rating examples are invented and generic. */
Fx.register({
  id: '3.1',

  INPUTS: [
    { k: 'User requirements', tx: 'A shipper asks for one quote that shows every surcharge.', key: 'requirements,' },
    { k: 'Support tickets', tx: 'A recurring ticket reports weight-break rounding at 45 kg.', key: 'support' },
    { k: 'Peers and rivals', tx: 'Peers offer instant quotes for a lane.', key: 'peers' },
    { k: 'The existing system, when there is one', tx: 'The tariff book, the code and production, read and run.', key: 'already' },
  ],
  IY: (i) => 296 + i * 122,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { inputs: this.INPUTS.map((c) => at(c.key)), end: at('too.') };
  },

  render(root) {
    root.classList.add('s31');
    Mock.style('s31', `
      .s31 .in { height: 106px; padding: 20px 26px; }
      .s31 .in .tx { margin-top: 10px; font-size: 25px; color: var(--white); }
      .s31 .dsc { justify-content: center; }
      .s31 .dsc .nm { font-size: 40px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Discover', headline: 'Discovery gathers what the factory needs to know.', station: 0, from: -1 });
    const S = Fx.svg(root, this.INPUTS.map((_, i) => `<path data-k="r${i}" class="y dash" d="M920 ${this.IY(i) + 53} C1080 ${this.IY(i) + 53} 1080 530 1240 530"/>`).join(''));
    this.rails = this.INPUTS.map((_, i) => S.k['r' + i]);
    this.pks = this.rails.map(() => Fx.stream(root, 2));
    this.cards = this.INPUTS.map((c, i) => { const el = Fx.card(root, { x: 160, y: this.IY(i), w: 760, k: c.k, tx: c.tx }).root; el.classList.add('in'); return el; });
    this.dsc = Fx.card(root, { x: 1240, y: 420, w: 520, h: 220, k: 'Discovery', nm: 'Findings', tx: 'Each one written down with its evidence.' }).root;
    this.dsc.classList.add('dsc');
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/changes-methods.png', name: 'Changes · Ideation methods', rect: { x: 160, y: 332, w: 1600, h: 380 } });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.dsc, t, 0.6);
    Fx.glow(this.dsc, 0.3 + 0.6 * M.prog(t, K.end - 0.6, 0.6));
    /* each input arrives as it is named and sends its work into discovery */
    this.cards.forEach((c, i) => {
      const k = K.inputs[i], next = K.inputs[i + 1] != null ? K.inputs[i + 1] : this.duration + 1;
      M.rise(c, t, k - 0.5);
      Fx.glow(c, Math.max(M.ramp(t, k - 0.3, next - 0.1, 0.3, 0.5), 0.2 * M.prog(t, next - 0.2, 0.4)));
      const r = this.rails[i];
      M.draw(r, t, k, 0.6);
      if (M.prog(t, k, 0.6) >= 1) { r.style.strokeDasharray = '6 7'; M.march(r, t, 14); }
      Fx.streamAt(this.pks[i], r, t, k + 0.4, this.duration, 1.8);
    });
    this.scr.at(t, { a: 0.6, b: Mock.captionAt(this, 'reads') - 0.3, from: [548, 250, 1150], to: [556, 292, 960], hi: [558, 326, 1320, 76], hiAt: 1.8 });
  },
});
