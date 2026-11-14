/* Scene 2.2: the question. One line at the centre, nothing else; the argument scenes answer it. */
Roi.register({
  id: '2.2',

  render(root) {
    root.classList.add('r22');
    Mock.style('r22', `
      .r22 .q { left: var(--gutter); top: 440px; width: 1600px; font: 700 68px/1.1 var(--sans); letter-spacing: -.035em; color: var(--white); text-wrap: balance; }
    `);
    this.grid = Mock.dotGrid(root);
    this.q = Mock.mount(root, '<div class="q">How did Akka achieve these results?</div>').root;
  },

  at(t) {
    Mock.fade(this.grid, t, 0, 1.0);
    Mock.rise(this.q, t, 0.3);
  },
});
