/* Scene 6.3: integrated testing, every behaviour and every build. The answer key from 4.1 returns and runs against
   the rebuild; the counter climbs to 1,500 of 1,500 and holds. Beside it, the integration tests run on the real
   runtime and the replay tests confirm an answer is the same a second time. */
Fx.register({
  id: '6.3',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { integ: at('Integration'), key: at('answer'), drifts: at('drifts'), agree: at('agree.') };
  },

  render(root) {
    root.classList.add('s63');
    Mock.style('s63', `
      .s63 .lock { position: absolute; right: 26px; top: 22px; width: 36px; height: 44px; overflow: visible; }
      .s63 .lock path, .s63 .lock rect { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .s63 .ctr { left: 160px; top: 600px; width: 920px; }
      .s63 .ctr .n { font: 700 84px/1 var(--sans); letter-spacing: -.04em; color: var(--yellow); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .s63 .ctr .l { margin-top: 14px; font: 500 26px/1.3 var(--sans); color: var(--soft-grey); }
      .s63 .ts .fx-chip { position: absolute; right: 24px; top: 22px; }
      .s63 .ts .nm { font-size: 32px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Build', headline: 'On every build, the rebuild and the original agree.', station: 3 });
    const S = Fx.svg(root, '<path data-k="run" class="y dash" d="M560 430 H680"/>');
    this.run = S.k.run;
    this.pks = Fx.stream(root, 3);
    this.key = Mock.mount(root, `<div class="fx-card" style="left:160px;top:320px;width:400px;height:220px"><div class="k">Answer key</div><div class="nm">1,500 shipments</div><div class="tx">From the original</div>
      <svg class="lock" viewBox="0 0 36 44"><path d="M8 21 V13 a10 10 0 0 1 20 0 V21"/><rect x="2" y="21" width="32" height="21" rx="4"/></svg></div>`).root;
    this.reb = Fx.card(root, { x: 680, y: 320, w: 400, h: 220, k: 'The rebuild', nm: 'Freight rating', tx: 'Built on Akka' }).root;
    this.ctr = Mock.mount(root, '<div class="ctr"><div class="n"><span data-k="n">0</span> of 1,500 match</div><div class="l">Each price matches the original, to the cent.</div></div>');
    this.ts = [
      Fx.card(root, { x: 1200, y: 320, w: 560, h: 190, k: 'Integration tests', nm: 'On the real runtime', tx: 'The components run together.' }).root,
      Fx.card(root, { x: 1200, y: 540, w: 560, h: 190, k: 'Replay tests', nm: 'The same answer twice', tx: 'An answer is the same a second time.' }).root,
    ];
    this.chips = this.ts.map((c) => { c.classList.add('ts'); return Mock.mount(c, '<div class="fx-chip ok">Passed</div>').root; });
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/design-overview.png', name: 'Design · Integration tests', rect: { x: 460, y: 372, w: 1000, h: 312 } });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.reb, t, 0.5);
    /* the integration tests run first, then the answer key runs against the rebuild */
    M.rise(this.ts[0], t, K.integ - 0.3);
    M.fade(this.chips[0], t, K.integ + 1.6, 0.3);
    Fx.glow(this.ts[0], M.ramp(t, K.integ, K.key, 0.3, 0.5));
    M.rise(this.key, t, K.key - 0.5);
    M.draw(this.run, t, K.key - 0.2, 0.4);
    if (M.prog(t, K.key - 0.2, 0.4) >= 1) { this.run.style.strokeDasharray = '6 7'; M.march(this.run, t, 14); }
    Fx.streamAt(this.pks, this.run, t, K.key, this.duration, 0.9);
    M.rise(this.ctr.root, t, K.key + 0.2);
    M.countUp(this.ctr.n, t, K.key + 0.4, K.drifts - K.key, 0, 1500);
    Fx.glow(this.key, 0.5 * M.prog(t, K.key, 0.5));
    Fx.glow(this.reb, 0.3 + 0.7 * M.prog(t, K.agree - 0.5, 0.6));
    M.rise(this.ts[1], t, K.drifts - 0.3);
    M.fade(this.chips[1], t, K.drifts + 1.2, 0.3);
    Fx.glow(this.ts[1], M.ramp(t, K.drifts, K.agree - 0.3, 0.3, 0.5));
    this.scr.at(t, { a: 0.5, b: Mock.captionAt(this, 'Integration') - 0.3, from: [655, 48, 420], to: [660, 52, 400], hi: [672, 72, 140, 34], hiAt: 1.6 });
  },
});
