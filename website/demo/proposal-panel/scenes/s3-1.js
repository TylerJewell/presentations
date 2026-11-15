/* Scene 3.1: a list of promises. Verify › Controls for the panel: the rail of bundles at the left, the draft
   bundle's six commitments as plain sentences with their kind. The rows rise one by one, each glows in turn
   while the narration says what a row is, and all six glow together when the six are counted. */
(function () {
  /* lib/board.js is shared by the Act 3 scenes and by 5.5, 6.1 and 7.2; it loads here until index.html lists it */
  if (Film.board || document.querySelector('script[src$="lib/board.js"]')) return;
  const s = document.createElement('script');
  s.src = document.currentScript.src.replace(/scenes\/s3-1\.js(\?.*)?$/, 'lib/board.js');
  s.async = false;
  document.head.appendChild(s);
})();
Film.register({
  id: '3.1',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { bundle: at('bundle'), each: at('Each'), six: at('six'), every: at('Everything') };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s31');
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.frame.bundle.parentNode.innerHTML = 'Bundle <b>draft</b> in preparation';
    this.head = B.head(page, { chip: 'Draft', meta: '6 commitments · starter set' });
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'Draft', line: '6 commitments, in preparation' }], on: 0 });
    this.rows = B.rows(page, { x: 244, y: 56 });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), rows = this.rows;
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.3, { dy: 8 });
    M.rise(this.rail.el, t, 0.4, { dy: 8 });
    const six = 0.45 * M.ramp(t, K.six - 0.2, K.every + 0.6, 0.5, 0.8);
    rows.rows.forEach((r, i) => {
      M.rise(r.root, t, 0.5 + i * 0.14, { dy: 10 });
      /* each row glows in turn while "each row is one commitment" is read */
      const own = M.ramp(t, K.each + i * 0.55 - 0.1, K.each + i * 0.55 + 0.9, 0.25, 0.5);
      rows.glow(i, Math.max(own, six));
    });
  },
});
