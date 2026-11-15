/* Scene 0.1: the title. The dot grid fades in, the eyebrow rises, the two hero lines rise from under their
   baselines, the second in yellow, and the AKKA mark settles lower left. */
Film.register({
  id: '0.1',
  captionZone: 'bottom-right',

  render(root) {
    root.classList.add('s01');
    Mock.style('s01', `
      .s01 .hero { left: var(--gutter); top: 330px; width: 1640px; }
      .s01 .hero .ln { font: 700 100px/1.02 var(--sans); letter-spacing: -.045em; color: var(--white); }
      .s01 .hero .ln.y { color: var(--yellow); }
      .s01 .hero .mk-eyebrow { margin-bottom: 36px; }
      .s01 .mark { left: var(--gutter); top: 950px; }
    `);
    this.grid = Mock.dotGrid(root);
    Film.note(root);
    this.r = Mock.mount(root, `<div class="hero">
      <div class="mk-eyebrow" data-k="eb">A governed AI system</div>
      <div class="ln-mask"><div class="ln" data-k="l1">This is one AI system,</div></div>
      <div class="ln-mask"><div class="ln y" data-k="l2">and everything that governs it.</div></div></div>`);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(34)}</div>`).root;
  },

  at(t) {
    const M = Mock;
    M.fade(this.grid, t, 0, 1.4);
    M.rise(this.r.eb, t, 0.6, { dy: 10 });
    M.lineRise(this.r.l1, t, 1.0, 1.1);
    M.lineRise(this.r.l2, t, 1.5, 1.1);
    M.fade(this.mark, t, 2.6, 0.8);
  },
});
