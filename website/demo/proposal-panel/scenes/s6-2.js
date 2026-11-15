/* Scene 6.2: a person is asked. The Human page, Waiting view. The held review rises to the top of the
   queue and the count on the Human nav item becomes one. The spotlight follows the narration across the
   row: the subject, the control that raised it, the response window, and the Held status. */
(function () {
  /* lib/human.js is loaded by the Act 6 scene files themselves until index.html lists it; window load waits for it */
  if ((window.Film && Film.human) || document.querySelector('script[data-fp-human]')) return;
  const s = document.createElement('script');
  s.src = document.currentScript.src.replace(/scenes\/s6-\d\.js(\?.*)?$/, 'lib/human.js');
  s.async = false; s.dataset.fpHuman = '1';
  document.head.appendChild(s);
})();
Film.register({
  id: '6.2',

  timing() {
    if (this.K) return;
    const at = (w, from) => Mock.captionAt(this, w, from);
    this.K = { appears: Math.max(at('appears') - 0.6, 0.9), what: at('what'), which: at('which'), how: at('how'), held: at('held', 26) };
    const keep = this.row.root.style.transform;
    this.row.root.style.transform = 'none';
    const rect = (el) => Mock.rectOf(this.root, el);
    const pad = ([x, y, w, h], p) => [x - p, y - p, w + 2 * p, h + 2 * p];
    this.R = { subject: pad(rect(this.row.subject.parentElement), 10), pattern: pad(rect(this.row.pattern.parentElement), 10), ring: pad(rect(this.row.ring.parentElement), 10), status: pad(rect(this.row.status), 10) };
    this.row.root.style.transform = keep;
  },

  render(root) {
    const M = Mock, H = Film.human;
    root.classList.add('s62');
    this.H = H.page(root, { tab: 'Waiting' });
    Film.note(root);
    this.old = H.row(this.H.queue, H.BLOCKED, { y: 0 });
    this.row = H.row(this.H.queue, H.HELD, { y: 0 });
    this.spot = M.spotlight(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), R = this.R, H = this.H;
    M.rise(H.frame.el, t, 0.0, { dy: 12 });
    /* the new row rises to the top; the older one steps down to make room */
    const a = M.p(t, K.appears, 0.9);
    this.old.root.style.transform = `translateY(${(a * 88).toFixed(1)}px)`;
    M.rise(this.row.root, t, K.appears, { dy: -14 });
    const w = t >= K.appears + 0.3 ? '2' : '1';
    if (H.count.textContent !== w) H.count.textContent = w;
    if (H.stats.waiting.textContent !== w) H.stats.waiting.textContent = w;
    /* the row's parts glow as they are named */
    Film.glow(this.row.root, M.ramp(t, K.appears + 0.2, K.what + 0.2, 0.4, 0.5));
    this.row.reason.style.setProperty('--g', M.ramp(t, K.which - 0.2, K.how - 0.1, 0.3, 0.4).toFixed(3));
    this.spot.at(t, [
      { t: K.what - 0.2, rect: R.subject },
      { t: K.which - 0.2, rect: R.pattern },
      { t: K.how - 0.2, rect: R.ring },
      { t: K.held - 0.3, rect: R.status },
      { t: K.held + 3.2, rect: null },
    ]);
  },
});
