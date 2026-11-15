/* Scene 6.3: the decision. The Human page with the held review at the top of the queue. The cursor opens
   the event and the tray slides in beside the queue: the report, the evidence, the minimum review time
   filling, Approve release and Reject, the reason, and the independence rule. The cursor chooses Reject
   and the reason is typed. */
(function () {
  if ((window.Film && Film.human) || document.querySelector('script[data-fp-human]')) return;
  const s = document.createElement('script');
  s.src = document.currentScript.src.replace(/scenes\/s6-\d\.js(\?.*)?$/, 'lib/human.js');
  s.async = false; s.dataset.fpHuman = '1';
  document.head.appendChild(s);
})();
Film.register({
  id: '6.3',

  REASON: 'Year 2 and year 3 prices are not stated.',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { open: 1.2, sees: at('sees'), evidence: at('evidence'), min: at('minimum'), reflex: at('reflex'), choose: at('rejects') - 0.3, gives: at('gives'), person: at('person'), end: this.span };
    /* measured with the tray and the row at rest, whatever instant the first frame is */
    const keep = [this.T.root, this.row.root].map((el) => el.style.transform);
    this.T.root.style.transform = this.row.root.style.transform = 'none';
    const rect = (el) => Mock.rectOf(this.root, el);
    const pad = ([x, y, w, h], p) => [x - p, y - p, w + 2 * p, h + 2 * p];
    const c = (r) => ({ x: r[0] + r[2] / 2, y: r[1] + r[3] / 2 });
    this.R = { report: pad(rect(this.T.report), 6), evidence: pad(rect(this.T.evidence), 6), min: pad(rect(this.T.min), 6), reason: pad(rect(this.T.reasonBox), 6), indep: pad(rect(this.T.indep), 8) };
    this.P = { open: c(rect(this.row.open)), reject: c(rect(this.T.reject)), reason: c(rect(this.T.reasonBox)) };
    this.T.root.style.transform = keep[0]; this.row.root.style.transform = keep[1];
  },

  render(root) {
    const M = Mock, H = Film.human;
    root.classList.add('s63');
    this.H = H.page(root, { tab: 'Waiting' });
    Film.note(root);
    this.H.count.textContent = '2';
    this.H.stats.waiting.textContent = '2';
    this.row = H.row(this.H.queue, H.HELD, { y: 0 });
    this.old = H.row(this.H.queue, H.BLOCKED, { y: 88 });
    this.T = H.tray(this.H.page, H.HELD);
    this.cursor = M.cursor(root);
    this.spot = M.spotlight(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), R = this.R, T = this.T, P = this.P;
    M.rise(this.H.frame.el, t, 0.0, { dy: 12 });
    const open = M.p(t, K.open, 0.6);
    Film.glow(this.row.root, M.ramp(t, K.open - 0.3, K.sees + 1.0, 0.3, 0.6));
    const chosen = t >= K.choose ? 'reject' : null;
    const n = Math.floor(this.REASON.length * M.p(t, K.gives, 2.2, 'linear'));
    T.at({ open, review: t - K.open, chosen, reason: this.REASON.slice(0, n) });
    Film.glow(T.report, M.ramp(t, K.sees - 0.2, K.evidence, 0.3, 0.4));
    Film.glow(T.evidence, M.ramp(t, K.evidence - 0.2, K.min - 0.2, 0.3, 0.4));
    Film.glow(T.min, M.ramp(t, K.min - 0.2, K.choose - 0.4, 0.3, 0.4));
    T.indep.style.setProperty('--g', M.ramp(t, K.person - 0.2, K.end + 1, 0.3, 0.4).toFixed(3));
    this.cursor.at(t, [
      { t: 0.5, x: 1060, y: 600 },
      { t: K.open, x: P.open.x, y: P.open.y, click: true },
      { t: K.open + 1.2, x: P.open.x + 60, y: P.open.y + 120 },
      { t: K.choose, x: P.reject.x, y: P.reject.y, click: true, glide: 0.9 },
      { t: K.gives - 0.2, x: P.reason.x + 80, y: P.reason.y + 6, click: true },
      { t: K.gives + 0.6, x: P.reason.x + 240, y: P.reason.y + 10 },
    ]);
    this.spot.at(t, [
      { t: K.sees - 0.2, rect: R.report },
      { t: K.evidence - 0.2, rect: R.evidence },
      { t: K.min - 0.2, rect: R.min },
      { t: K.choose - 0.5, rect: null },
      { t: K.person - 0.2, rect: R.indep },
      { t: K.person + 4.2, rect: null },
    ]);
  },
});
