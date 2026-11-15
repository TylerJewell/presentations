/* Scene 4.1: Decide, the answer key. Generated shipments stream from four kinds of case into the original system,
   which runs as an oracle; its answers fill a ledger, 1,500 shipments and 400,000 values, which locks. One line
   explains the term parity. */
Fx.register({
  id: '4.1',

  GEN: ['Weight breaks', 'Zone edges', 'Surcharge combinations', 'Conflicts'],
  GY: (i) => 330 + i * 80,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { key: at('answer'), generated: at('generated'), prices: at('prices'), parity: at('Parity'), measured: at('measured,') };
  },

  render(root) {
    root.classList.add('s41');
    Mock.style('s41', `
      .s41 .gen { height: 64px; font-size: 22px; }
      .s41 .orc .nm { font-size: 40px; }
      .s41 .led .row { position: absolute; left: 30px; font: 500 24px/1 var(--sans); color: var(--soft-grey); }
      .s41 .led .row b { display: inline-block; min-width: 270px; margin-right: 16px; font: 700 64px/1 var(--sans); letter-spacing: -.035em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .s41 .lock { position: absolute; right: 28px; top: 24px; width: 44px; height: 54px; overflow: visible; }
      .s41 .lock path, .s41 .lock rect { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .s41 .par { left: 160px; top: 700px; width: 1600px; font: 600 34px/1.3 var(--sans); letter-spacing: -.015em; color: var(--white); }
      .s41 .par b { color: var(--yellow); font-weight: 700; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Decide', headline: 'The original system becomes the <span class="accent">answer key</span>.', station: 1, from: 0 });
    this.side = Mock.mount(root, '<div class="fx-side" style="left:160px;top:290px">Generated shipments</div>').root;
    const S = Fx.svg(root, `
      ${this.GEN.map((_, i) => `<path data-k="g${i}" class="y dash" d="M480 ${this.GY(i) + 32} C550 ${this.GY(i) + 32} 550 482 620 482"/>`).join('')}
      <path data-k="out" class="y dash" d="M1000 482 H1140"/>`);
    this.gp = this.GEN.map((_, i) => S.k['g' + i]);
    this.out = S.k.out;
    this.pkIn = this.gp.map(() => Fx.stream(root, 2));
    this.pkOut = Fx.stream(root, 3);
    this.gen = this.GEN.map((text, i) => { const el = Fx.tile(root, { x: 160, y: this.GY(i), w: 320, h: 64, text }); el.classList.add('gen'); return el; });
    this.orc = Fx.card(root, { x: 620, y: 330, w: 380, h: 304, k: 'The original', nm: 'Freight rating', tx: 'Prices every generated shipment' }).root;
    this.orc.classList.add('orc');
    this.led = Mock.mount(root, `<div class="fx-card led" style="left:1140px;top:330px;width:620px;height:304px"><div class="k">Answer key</div>
      <svg class="lock" viewBox="0 0 44 54"><path data-k="sh" d="M10 26 V16 a12 12 0 0 1 24 0 V26"/><rect x="3" y="26" width="38" height="26" rx="5"/></svg>
      <div class="row" style="top:112px"><b data-k="n1">0</b>shipments</div><div class="row" style="top:206px"><b data-k="n2">0</b>values</div></div>`);
    this.par = Mock.mount(root, '<div class="par"><b>Parity:</b> the rebuild gives the original\'s answer for every case.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.orc, t, 0.5);
    Fx.glow(this.orc, M.prog(t, K.key - 0.2, 0.6) * (1 - 0.6 * M.prog(t, K.parity, 0.6)));
    M.rise(this.side, t, K.generated - 0.6, { dy: 10 });
    this.gen.forEach((g, i) => { M.rise(g, t, K.generated - 0.4 + i * 0.25, { dy: 10 }); Fx.glow(g, 0.2 + 0.5 * M.wave(t, 2.4, i / 4) * M.prog(t, K.generated + 1, 0.5)); });
    const end = K.parity + 1.5;
    this.gp.forEach((p, i) => {
      const s = K.generated + i * 0.25;
      M.draw(p, t, s - 0.2, 0.5);
      if (M.prog(t, s - 0.2, 0.5) >= 1) { p.style.strokeDasharray = '6 7'; M.march(p, t, 14); }
      Fx.streamAt(this.pkIn[i], p, t, s + 0.3, end, 1.3);
    });
    /* the original's answers fill the ledger */
    M.draw(this.out, t, K.prices - 0.3, 0.4);
    if (M.prog(t, K.prices - 0.3, 0.4) >= 1) { this.out.style.strokeDasharray = '6 7'; M.march(this.out, t, 14); }
    Fx.streamAt(this.pkOut, this.out, t, K.prices, end + 0.6, 0.9);
    M.rise(this.led.root, t, K.prices - 0.5);
    M.countUp(this.led.n1, t, K.prices, end - K.prices, 0, 1500);
    M.countUp(this.led.n2, t, K.prices, end - K.prices, 0, 400000);
    M.rise(this.par, t, K.parity - 0.3);
    /* the ledger locks: the shackle drops and the card lights */
    const lock = M.p(t, K.measured - 0.6, 0.5, 'outCubic');
    this.led.sh.setAttribute('transform', `translate(0 ${(-9 * (1 - lock)).toFixed(2)})`);
    Fx.glow(this.led.root, 0.25 * M.prog(t, K.prices, 0.5) + 0.75 * lock);
  },
});
