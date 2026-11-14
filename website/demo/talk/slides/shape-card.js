/* Section card: governance has to change shape. */
registerSlide({
  id: 'shape-card',
  act: 'shape',
  title: 'Governance changes shape',
  beats: [
    { t: 1.6, say: "If those clocks run this fast, governance can't just work harder. More reviewers, longer checklists, more frequent audits: none of that keeps up with a system that changes every week. Governance has to change shape. I see three shifts." },
  ],
  render(root) { this.c = Talk.card(root, ['Governance has to', '<span class="tk-y">change shape.</span>']); },
  at(t) { Talk.cardAt(this.c, t); },
});
