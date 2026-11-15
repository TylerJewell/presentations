/* Section card: one organization answers to ten countries. */
registerSlide({
  id: 'org-card',
  act: 'org',
  title: 'One organization answers to ten countries',
  beats: [
    { t: 1.6, say: "Now widen the frame. One organization operates in ten countries, and every one of them has something to say about the same decision." },
  ],
  render(root) { this.c = Talk.card(root, ['One organization', 'answers to <span class="tk-y">ten countries.</span>']); },
  at(t) { Talk.cardAt(this.c, t); },
});
