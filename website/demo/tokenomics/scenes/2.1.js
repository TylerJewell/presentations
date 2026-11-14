/* Scene 2.1: avoidable cost. The question, then the Savings capture: the camera pushes into the kinds of
   avoidable cost and the spotlight steps down the table as each kind is named. The cursor opens the first
   opportunity and the camera settles on its facts tray, where the saving range, the quality risk and the
   evidence light as they are spoken. Both states are real captures. */
Tok.register({
  id: '2.1',

  /* rows of the kinds table, in the capture's pixels, by the word that names each */
  KINDS: [['prompts', 196], ['failed', 227], ['duplicate', 258], ['reasoning', 289], ['unused', 321], ['answers', 383]],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { kinds: this.KINDS.map(([w, y]) => [at(w), y]), each: at('Each'), saving: at('saving'), quality: at('quality'), evidence: at('evidence') };
  },

  render(root) {
    Mock.dotGrid(root);
    this.c = Tok.capture(root, {
      crumb: 'Optimize › Cost › Savings',
      states: [
        { image: 'captures/savings-overview.png', url: 'localhost:9889/cost/savings' },
        { image: 'captures/savings-opportunity.png', url: 'localhost:9889/cost/savings#cache-refund-agent' },
      ],
    });
    this.question = Tok.question(root, { text: this.q, back: 1.4 });
  },

  at(t) {
    const K = (this.timing(), this.K);
    this.question.at(t);
    const open = K.each + 0.4;                                   /* the first opportunity opens */
    const spot = K.kinds.map(([a, y]) => ({ t: a + 0.25, rect: [320, y - 15, 1550, 31] }));
    spot.push({ t: K.each - 0.6, rect: null });
    spot.push({ t: K.saving, rect: [330, 780, 740, 32] });       /* Estimated saving, per day */
    spot.push({ t: K.quality, rect: [1345, 220, 110, 30] });     /* Quality risk: None */
    spot.push({ t: K.evidence, rect: [330, 312, 740, 32] });     /* Measured on 9,840 requests */
    spot.push({ t: K.evidence + 2.4, rect: null });
    this.c.at(t, {
      enter: 1.5,
      show: [{ t: -Infinity, state: 0 }, { t: open + 0.1, state: 1 }],
      cam: [
        { t: 2.0, rect: [300, 115, 1585, 300] },
        { t: K.each - 1.0, rect: [300, 470, 1585, 420] },     /* the opportunities, so the click is in view */
        { t: open + 0.2, rect: [320, 215, 1100, 600], caption: 'bottom-right' },
      ],
      cursor: [
        { t: K.each - 0.4, x: 700, y: 560 },
        { t: open, x: 337, y: 649, click: true },
        { t: open + 1.4, x: 1180, y: 600, hide: true },
      ],
      spot,
    });
  },
});
