/* Scene 9.4: the close. The AKKA mark, large and centred, and the call to action under it, held to be read. */
Fx.register({
  id: '9.4',
  captionZone: 'bottom',

  render(root) {
    root.classList.add('s94');
    Mock.style('s94', `
      .s94 .mark { left: 0; right: 0; top: 290px; display: flex; justify-content: center; }
      .s94 .cta { left: 260px; top: 520px; width: 1400px; text-align: center; font: 600 36px/1.35 var(--sans); letter-spacing: -.02em; color: var(--white); text-wrap: balance; }
    `);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(150)}</div>`).root;
    this.cta = Mock.mount(root, '<div class="cta">Bring one idea from your roadmap, or one system you would like to modernize. We will run it through its own factory with you and show you its specification, its plan and its exit conditions.</div>').root;
  },

  at(t) {
    Mock.fade(this.mark, t, 0.2, 1.0);
    Mock.rise(this.cta, t, 1.0);
  },
});
