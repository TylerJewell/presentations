/* Scene 10.2: the final slide. The AKKA mark, large and centred, and the call to action under it; nothing else.
   Held long enough to read. */
Roi.register({
  id: '10.2',
  captionZone: 'bottom',

  render(root) {
    root.classList.add('r102');
    Mock.style('r102', `
      .r102 .mark { left: 0; right: 0; top: 330px; display: flex; justify-content: center; }
      .r102 .cta { left: 260px; top: 560px; width: 1400px; text-align: center; font: 600 36px/1.3 var(--sans); letter-spacing: -.02em; color: var(--white); text-wrap: balance; }
    `);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(150)}</div>`).root;
    this.cta = Mock.mount(root, '<div class="cta">Bring one AI system you run today, and we will compare its fully loaded cost on Akka against your current stack, covering infrastructure, licences, integration and people.</div>').root;
  },

  at(t) {
    Mock.fade(this.mark, t, 0.2, 1.0);
    Mock.rise(this.cta, t, 1.0);
  },
});
