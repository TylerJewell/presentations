/* Scene 9.1: beyond modernization. Black. "AI platform" rises first, in white; "Innovation engine" follows in
   yellow, below it. Then the uses of the engine stand in a row: modernization lights first, as one use among
   others, and the rest follow as the narration widens to any idea. */
Fx.register({
  id: '9.1',
  captionZone: 'bottom',

  USES: ['Modernization', 'A new AI system', 'A new service', 'Any other IT system'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { engine: at('innovation'), modern: at('Modernization'), builds: at('Each') };
  },

  render(root) {
    root.classList.add('s91');
    Mock.style('s91', `
      .s91 .w { left: 0; width: 1920px; text-align: center; font: 700 110px/1 var(--sans); letter-spacing: -.045em; color: var(--white); }
      .s91 .w.y { color: var(--yellow); }
      .s91 .use { height: 110px; justify-content: center; font-size: 28px; }
    `);
    Mock.dotGrid(root);
    this.a = Mock.mount(root, '<div class="w" style="top:190px">AI platform</div>').root;
    this.b = Mock.mount(root, '<div class="w y" style="top:340px">Innovation engine</div>').root;
    this.uses = this.USES.map((text, i) => { const el = Fx.tile(root, { x: 160 + i * 405, y: 560, w: 385, h: 110, text }); el.classList.add('use'); return el; });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.a, t, 0.4, { dy: 30 });
    M.rise(this.b, t, K.engine - 0.6, { dy: 30 });
    if (t > K.engine) this.a.style.opacity = (1 - 0.45 * M.prog(t, K.engine, 0.8)).toFixed(3);
    /* modernization is one use; the others join it as the narration widens */
    this.uses.forEach((el, i) => {
      const s = i ? K.builds - 0.2 + (i - 1) * 0.35 : K.modern - 0.3;
      M.rise(el, t, s, { dy: 14 });
      Fx.glow(el, i ? M.prog(t, s + 0.2, 0.5) * 0.8 : 0.8 * M.prog(t, s, 0.4) * (1 - 0.4 * M.prog(t, K.builds, 0.6)));
    });
  },
});
