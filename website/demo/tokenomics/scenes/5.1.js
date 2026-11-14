/* Scene 5.1: one loop. The four parts of Akka on one rail. Each card glows as its step is spoken and a change
   travels the rail from Specify to Optimize; the cost screens light on the Optimize card and the quality gate
   on the Verify card; the rail's phrases light as the evidence record is named. */
Tok.register({
  id: '5.1',

  SCREENS: ['Overview', 'Costs', 'Savings', 'Frontier', 'Ledger', 'Budgets', 'Prices'],

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { spec: at('specified'), built: at('built'), ver: at('verified'), run: at('run'), one: at('one', 18) };
  },

  render(root) {
    root.classList.add('t51');
    Mock.style('t51', `
      .t51 .head { left: var(--gutter); top: 96px; }
      .t51 .head .tk-h { margin-top: 20px; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><div class="mk-eyebrow" data-k="eb">Akka</div>
      <h2 class="tk-h" data-k="h">Cost is one part of one loop.</h2></div>`);
    this.L = Tok.loop(root, { y: 270, h: 390, rail: 720 });
    this.verifyTags = this.L.tags(2, ['Quality gate']);
    this.optTags = this.L.tags(3, this.SCREENS);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.eb, t, 0.0);
    M.rise(this.head.h, t, 0.1);
    const steps = [K.spec, K.built, K.ver, K.run, K.one];
    const glow = [0, 1, 2, 3].map((i) => M.ramp(t, steps[i] - 0.1, steps[i + 1] + 0.2, 0.3, 0.45));
    /* Optimize stays lit through the close of the line; its tags and Verify's gate light in turn */
    glow[3] = Math.max(glow[3], 0.7 * M.prog(t, K.one, 0.5));
    glow[2] = Math.max(glow[2], 0.35 * M.prog(t, K.one, 0.5));
    this.L.at(t, {
      start: 0.2, glow,
      words: [0, 1, 2].map((k) => M.p(t, K.one + k * 0.35, 0.5, 'outCubic')),
      travel: t < K.spec - 0.3 ? null : M.ease.inOutCubic(M.prog(t, K.spec - 0.3, K.one - K.spec + 0.3)),
    });
    this.verifyTags.forEach((el) => M.rise(el, t, K.ver, { dy: 8 }));
    this.optTags.forEach((el, i) => M.rise(el, t, K.run + i * 0.1, { dy: 8 }));
  },
});
