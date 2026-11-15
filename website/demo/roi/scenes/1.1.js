/* Scene 1.1: the claim. One sentence in large type with "a fraction" in yellow; then the four cost areas stand in
   a row, each named as it is spoken and left unlit, to be lit as the film reaches it (and all together in 10.1). */
Roi.register({
  id: '1.1',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { means: at('This'), lines: ['infrastructure,', 'licenses,', 'integration', 'people.'].map((w) => at(w)) };
  },

  render(root) {
    root.classList.add('r11');
    Mock.style('r11', `
      .r11 .hero { left: var(--gutter); top: 230px; width: 1600px; }
      .r11 .hero .ro-h { font-size: 66px; letter-spacing: -.035em; margin-top: 22px; }
      .r11 .means { left: var(--gutter); top: 560px; }
      .r11 .ro-tile { height: 100px; font-size: 26px; }
    `);
    Mock.dotGrid(root);
    this.hero = Mock.mount(root, `<div class="hero"><div class="mk-eyebrow" data-k="eb">Akka</div>
      <h2 class="ro-h" data-k="h">The fully loaded cost of an AI system on Akka is <span class="accent">a fraction</span> versus a hyperscaler or an assembled open-source stack.</h2></div>`);
    this.means = Mock.mount(root, '<div class="means ro-side">Fully loaded</div>').root;
    this.tiles = Roi.LINES.map((text, i) => Roi.tile(root, { x: 160 + i * 410, y: 610, w: 370, h: 100, text }));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.hero.eb, t, 0.1);
    M.rise(this.hero.h, t, 0.25);
    M.rise(this.means, t, K.means - 0.2, { dy: 10 });
    this.tiles.forEach((el, i) => {
      M.rise(el, t, K.lines[i] - 0.35);
      /* lit while named, then held unlit: the film lights each one as it reaches it */
      Roi.glow(el, M.ramp(t, K.lines[i] - 0.2, K.lines[i] + 1.4, 0.3, 0.6));
    });
  },
});
