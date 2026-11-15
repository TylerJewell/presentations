/* Scene 1.4: factories at work in regulated environments. Under the headline, three cards rise one at a time as
   each is spoken, each with the same form: who, what, and how long, with the time as the large value. The
   customers are unnamed. */
Fx.register({
  id: '1.4',

  CARDS: [
    { key: 'regulated', who: 'A regulated payments provider', what: 'Recent college graduates delivered an AI system into production', time: 'Weeks' },
    { key: 'insurer', who: 'A global insurer', what: 'A twenty-year-old underwriting calculator, rebuilt and matched case for case', time: 'Under a week' },
    { key: 'Fortune', who: 'A Fortune 200 financial services firm', what: 'Payments moved off a forty-year-old mainframe', time: 'Months' },
  ],

  timing() {
    if (this.K) return;
    this.K = this.CARDS.map((c) => Mock.captionAt(this, c.key));
  },

  render(root) {
    root.classList.add('s14');
    Mock.style('s14', `
      .s14 .fx-head { width: 1400px; }
      .s14 .fx-card { gap: 0; padding: 30px 32px 34px; }
      .s14 .who { font: 700 30px/1.15 var(--sans); letter-spacing: -.02em; color: var(--white); text-wrap: balance; }
      .s14 .what { margin-top: 18px; font: 500 25px/1.36 var(--sans); color: var(--soft-grey); text-wrap: pretty; }
      .s14 .time { margin-top: auto; font: 700 68px/1 var(--sans); letter-spacing: -.04em; color: var(--yellow); white-space: nowrap; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'In practice', headline: 'Akka has delivered factories that work in multiple regulated environments.' });
    this.cards = this.CARDS.map((c, i) => Mock.mount(root, `<div class="fx-card" style="left:${160 + i * 553}px;top:330px;width:494px;height:420px">
      <div class="who">${c.who}</div><div class="what">${c.what}</div><div class="time" data-k="time">${c.time}</div></div>`));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    this.cards.forEach((c, i) => {
      M.rise(c.root, t, K[i] - 0.4);
      M.rise(c.time, t, K[i] + 1.2, { dy: 12 });
      const next = K[i + 1] != null ? K[i + 1] : this.duration + 1;
      Fx.glow(c.root, Math.max(M.ramp(t, K[i] - 0.3, next - 0.2, 0.4, 0.6), 0.25 * M.prog(t, next - 0.3, 0.5)));
    });
  },
});
