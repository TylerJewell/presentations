/* Scene 3.3: prepare, sign, in force. The three-phase ring at the left with the four Prepare steps under it,
   the readiness rows at the right. The cursor works through Adopt, Describe, Plan and Decide; each step fills
   and its readiness rows turn green; the ring advances to Sign, and a spotlight rests on the readiness rows
   while the narration says that each step shows whether it is ready. */
Film.register({
  id: '3.3',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const K = { three: at('three'), adopt: at('adopts'), describe: at('describes'), decide: at('decides'), sign: at('Sign,'), force: at('force'), each: at('Each'), nobody: at('nobody') };
    K.plan = K.decide - 1.0;
    this.K = K;
    const R = Mock.rectOf.bind(null, this.root);
    const [px, py] = R(this.frame.page), n = this.ring.node(2), k = this.frame.scale;
    this.R = { ready: R(this.ready.el), force: [px + n[0] * k, py + n[1] * k, n[2] * k, n[3] * k], steps: this.steps.items.map((s) => R(s.root)) };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s33');
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.frame.bundle.parentNode.innerHTML = 'Bundle <b>draft</b> in preparation';
    this.head = B.head(page, { chip: 'Draft', meta: '6 commitments · starter set' });
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'Draft', line: '6 commitments, in preparation' }], on: 0 });
    this.panel = M.mount(page, `<div class="fb fb-panel" style="left:244px;top:56px;width:360px;height:436px"></div>`).root;
    this.ring = B.ring(page, { x: 264, y: 70, size: 320 });
    this.steps = B.steps(page, { x: 268, y: 424, w: 312 });
    this.ready = B.ready(page, { x: 620, y: 56, w: 669, h: 436 });
    this.ready.cap.textContent = 'Draft of v1';
    this.cursor = M.cursor(root);
    this.spot = M.spotlight(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), R = this.R;
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    M.rise(this.panel, t, 0.4, { dy: 10 });
    M.rise(this.ring.el, t, 0.5, { dy: 10 });
    M.rise(this.steps.el, t, 0.6, { dy: 8 });
    M.rise(this.ready.el, t, 0.5, { dy: 10 });
    /* the steps the cursor has clicked */
    const clicks = [K.adopt, K.describe, K.plan, K.decide];
    const done = clicks.filter((c) => t >= c + 0.1).length;
    const signing = t >= K.sign;
    this.steps.set(done, done < 4 && t >= K.three ? done : -1);
    this.ring.set({ phase: signing ? 1 : 0, steps: done, pulse: M.loop(t, 1.8), version: 'v1', line: signing ? 'ready to sign' : 'draft' });
    /* the readiness rows: each turns green a moment after the step that readies it */
    const ok = (c, d = 0.5) => M.p(t, c + d, 0.7, 'outCubic');
    const row = (i, p, v0, v1) => this.ready.set(i, { p, value: p > 0.5 ? v1 : v0, chip: p >= 0.99 ? 'Met' : 'Waiting' });
    row(0, ok(K.adopt), '', 'Starter set');
    row(1, ok(K.describe), '0 of 4', '4 of 4');
    row(2, ok(K.decide), '0 of 6', '6 of 6');
    row(3, ok(K.decide, 1.1), '0 of 6', '6 of 6');
    row(4, ok(K.decide, 1.7), '', 'Matches');
    const c = (i, tt) => ({ t: tt, x: R.steps[i][0] + R.steps[i][2] / 2, y: R.steps[i][1] + 10, click: true });
    this.cursor.at(t, [
      { t: K.three + 0.4, x: R.steps[0][0] - 60, y: R.steps[0][1] + 80 },
      c(0, K.adopt), c(1, K.describe), c(2, K.plan), c(3, K.decide),
      { t: K.decide + 1.2, x: R.steps[3][0] + 140, y: R.steps[3][1] + 90, hide: true },
    ]);
    this.spot.at(t, [
      { t: K.force - 0.2, rect: R.force },
      { t: K.each - 0.2, rect: R.ready },
      { t: K.nobody + 2.2, rect: null },
    ]);
  },
});
