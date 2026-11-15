/* Section card for the principles, and the act's shared bits (window.Act3): the source note placement,
   a counter formatter, and the principle marker. */
window.Act3 = {
  css: `
    .a3 .src { left: var(--gut); top: 1012px; }
    .a3 .note { font: 500 22px/1.3 var(--sans); color: var(--ink-3); }
    .a3 .pmark { left: var(--gut); top: 44px; display: flex; align-items: center; gap: 8px; }
    .a3 .pmark i { width: 26px; height: 6px; border-radius: 3px; background: #2e2e2e; }
    .a3 .pmark i.past { background: #6a6a6a; }
    .a3 .pmark i.cur { width: 44px; background: var(--yellow); }
    .a3 .pmark span { margin-left: 14px; font: 600 24px/1 var(--sans); color: var(--ink-2); }
  `,
  int: (n) => Math.round(n).toLocaleString('en-US'),
  /** The marker above a principle's headline: eight marks, the nth lit, and "Principle n". Drawn in the
      same place on every principle slide, so moving between them steps the lit mark along. */
  mark(root, n) {
    const marks = Array.from({ length: 8 }, (_, i) => `<i class="${i + 1 === n ? 'cur' : i + 1 < n ? 'past' : ''}"></i>`).join('');
    root.appendChild(Mock.html(`<div class="pmark">${marks}<span>Principle ${n}</span></div>`));
  },
};
Mock.style('a3', window.Act3.css);

registerSlide({
  id: 'principles-card',
  act: 'principles',
  title: 'Principles',
  beats: [
    { t: 1.6, say: "Here are eight principles I'd hold any platform to, including ours." },
  ],
  render(root) { this.c = Talk.card(root, ['Eight', '<span class="tk-y">principles.</span>']); },
  at(t) { Talk.cardAt(this.c, t); },
});
