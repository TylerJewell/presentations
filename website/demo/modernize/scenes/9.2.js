/* Scene 9.2: the roadmap, collapsed. An organization's IT roadmap as three year columns, 2027, 2028 and 2029, each
   holding idea cards. Work moves along the factory's five stations above them, several ideas at once. Then the
   cards of 2028 and 2029 move into 2027, whose column widens to hold them, and the later columns fold into it. The
   ideas are invented, generic examples. */
Fx.register({
  id: '9.2',

  YEARS: ['2027', '2028', '2029'],
  IDEAS: [
    ['Freight rating, rebuilt', 'A pricing API for partners'],
    ['An AI support agent', 'A customer portal', 'A billing system, rebuilt'],
    ['A demand forecast service', 'A document review agent', 'A data platform'],
  ],
  CX: (i) => 160 + i * 550, CW: 500,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { several: at('Specify'), collapses: at('collapses,'), year: at('2027.') };
  },

  render(root) {
    root.classList.add('s92');
    Mock.style('s92', `
      .s92 .fx-step { height: 44px; font-size: 19px; border-radius: 10px; }
      .s92 .col { --g: 0; top: 404px; height: 300px; border-radius: 14px; border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 50%), rgba(241, 241, 241, .14));
        background: rgba(255, 255, 255, .02); }
      .s92 .yr { --g: 0; top: 344px; font: 700 44px/1 var(--sans); letter-spacing: -.03em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s92 .idea { height: 64px; font-size: 22px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'The roadmap', headline: 'The roadmap collapses into 2027.' });
    const M = Mock;
    const sx = (i) => 245 + i * 357;
    const S = Fx.svg(root, '<path data-k="line" class="y dash" d="M160 290 H1760"/>');
    this.line = S.k.line;
    this.pks = Fx.stream(root, 6);
    this.steps = Fx.STATIONS.map((text, i) => Fx.step(root, { x: sx(i) - 85, y: 268, w: 170, text }));
    this.cols = this.YEARS.map((_, i) => M.mount(root, `<div class="col" style="left:${this.CX(i)}px;width:${this.CW}px"></div>`).root);
    this.yrs = this.YEARS.map((y, i) => M.mount(root, `<div class="yr" style="left:${this.CX(i)}px">${y}</div>`).root);
    let g = 0;
    this.ideas = [];
    this.IDEAS.forEach((list, c) => list.forEach((text, j) => {
      const el = Fx.tile(root, { x: 0, y: 0, w: 100, h: 64, text });
      el.classList.add('idea');
      this.ideas.push({ el, c, j, g: g++ });
    }));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.draw(this.line, t, 0.4, 0.9);
    if (M.prog(t, 0.4, 0.9) >= 1) { this.line.style.strokeDasharray = '6 7'; M.march(this.line, t, 14); }
    this.steps.forEach((el, i) => { M.rise(el, t, 0.5 + i * 0.08, { dy: 8 }); Fx.glow(el, 0.15 + 0.5 * M.wave(t, 2.4, i / 5) * M.prog(t, K.several, 0.5)); });
    /* several ideas move through the stations at once */
    Fx.streamAt(this.pks, this.line, t, K.several - 0.2, this.duration, 2.6);
    /* the collapse: the 2027 column widens across the stage, and the later columns fold into it */
    const fold = M.p(t, K.collapses - 0.4, 1.8, 'inOutCubic');
    this.cols.forEach((el, i) => {
      const o = M.prog(t, 0.8 + i * 0.2, 0.5);
      if (i === 0) { el.style.opacity = o; el.style.width = M.lerp(this.CW, 1600, fold).toFixed(1) + 'px'; }
      else { el.style.left = M.lerp(this.CX(i), 160, fold).toFixed(1) + 'px'; el.style.opacity = (o * (1 - fold)).toFixed(3); }
      Fx.glow(el, i === 0 ? M.prog(t, K.year - 0.3, 0.6) : 0);
    });
    this.yrs.forEach((el, i) => {
      M.rise(el, t, 0.9 + i * 0.2, { dy: 10 });
      if (i) { el.style.left = M.lerp(this.CX(i), 160, fold).toFixed(1) + 'px'; el.style.opacity = (Number(el.style.opacity) * (1 - fold)).toFixed(3); }
      Fx.glow(el, i === 0 ? M.prog(t, K.year - 0.3, 0.6) : 0);
    });
    /* each idea sits in its year, then takes its place in 2027's grid */
    this.ideas.forEach(({ el, c, j, g }) => {
      const p = M.p(t, K.collapses - 0.3 + g * 0.08, 1.4, 'inOutCubic');
      const x0 = this.CX(c) + 20, y0 = 424 + j * 88, w0 = this.CW - 40;
      const x1 = 180 + (g % 4) * 394, y1 = 444 + Math.floor(g / 4) * 100, w1 = 374;
      M.set(el, { left: M.lerp(x0, x1, p).toFixed(1) + 'px', top: M.lerp(y0, y1, p).toFixed(1) + 'px', width: M.lerp(w0, w1, p).toFixed(1) + 'px' });
      M.fade(el, t, 1.2 + g * 0.12, 0.4);
      Fx.glow(el, c === 0 ? 0.35 : 0.35 * M.prog(t, K.collapses, 0.6) + 0.4 * M.ramp(t, K.collapses - 0.3 + g * 0.08, K.collapses + 1.6 + g * 0.08, 0.3, 0.6));
    });
  },
});
