/* Scene 1.2: four readers and one report. The panel flow: the proposal card, four persona cards and the
   synthesis card; a work token visits each persona as it is named, its answer appears, and the four answers
   flow into the synthesis card. The definition of an agent rises as it is spoken. */
Film.register({
  id: '1.2',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { def: at('An'), visit: [at('finance'), at('technology'), at('terms'), at('delivery')], synth: at('fifth'), dwell: 0.9 };
  },

  render(root) {
    root.classList.add('s12');
    Mock.style('s12', `
      .s12 .head { left: 120px; top: 90px; width: 1400px; }
      .s12 .def { left: 120px; top: 720px; width: 1500px; }
      /* the proposal card holds a three-line title, so it sets tighter than the persona cards beside it */
      .s12 .fp-flow > .fp-card:first-child { padding: 20px 22px; }
      .s12 .fp-flow > .fp-card:first-child .nm { font-size: 26px; line-height: 1.1; }
      .s12 .fp-flow > .fp-card:first-child .bars { margin-top: 12px; gap: 7px; }
      .s12 .fp-flow > .fp-card:first-child .ln { font-size: 20px; margin-top: 8px; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">Four agents read the proposal, and a fifth writes the report.</h2></div>`);
    this.flow = Film.panelFlow(root, { y: 330 });
    this.def = Mock.mount(root, `<p class="fp-sub def">An agent gives a language model one job and returns a structured answer.</p>`).root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.h, t, 0.1);
    this.flow.at(t, { cards: 0.4, visit: K.visit, dwell: K.dwell, synth: K.synth });
    M.rise(this.def, t, K.def, { dy: 12 });
  },
});
