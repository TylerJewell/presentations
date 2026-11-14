/* Scene 4.5: Decide and watch. The Experiments view of 4.3 and 4.4, continued. The small model is retrained
   for DE and the segment returns inside its band; the canary resumes, the loop reaches Decide, the owner
   promotes and Watch begins (14 days). The cost per call counts down from the frontier model's to the
   small model's, and the evidence strip records the promotion with the owner's name. */
registerScene({
  id: '4.5',
  act: 4,
  title: "Decide and watch",
  duration: 18,
  caption: "Once it holds everywhere, the owner promotes it. The same answers, at less than a third of the cost, and every step of the decision is on the record.",

  X0: 44,          /* experiment seconds at the start of this scene (4.3 + 4.4) */
  RESUME: 2.2,     /* DE back inside its band; the canary resumes */
  DECIDE: 3.0,     /* the loop reaches Decide */
  PROMOTE: 5.0,    /* the owner promotes */
  COUNT: 5.9,      /* the cost per call counts down */
  EVIDENCE: 9.4,   /* the evidence strip records it */

  render(root) {
    root.classList.add('s4x', 's45');
    this.view = ExpView.build(root);
    this.cur = Mock.cursor(this.view.world);
  },

  at(t) {
    const M = Mock, X = ExpView, view = this.view, x = this.X0 + t;
    const rc = X.measure(view);
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;
    const resumed = t >= this.RESUME, decide = t >= this.DECIDE, promoted = t >= this.PROMOTE;

    const deQ = M.lerp(-3.45 + 0.08 * w(13), -1.5 + 0.2 * w(3), M.p(t, 0.6, 1.6, 'inOutCubic'));
    const segQ = [-0.9 + 0.3 * w(1), -1.4 + 0.3 * w(2), deQ, -1.1 + 0.3 * w(4)];
    const canN = Math.round(10150 + 210 * Math.min(t, this.RESUME) + 380 * Math.max(0, t - this.RESUME));
    const dOut = M.p(t, this.DECIDE, 0.25, 'inOutCubic'), dsw = M.p(t, this.DECIDE + 0.22, 0.35, 'inOutCubic');
    const day = promoted ? 1 + Math.floor((2 * (t - this.PROMOTE) + 2) / 24) : 0;

    let status = ['On hold', 'warn'];
    if (promoted) status = ['Promoted', 'ok'];
    else if (decide) status = ['Decide', 'info'];
    else if (resumed) status = ['Canary', 'info'];

    const st = {
      x,
      status,
      hbtn: promoted ? ['Close now', 'Roll back to v12'] : ['Pause', 'Roll back'],
      stages: {
        propose: 'done', evaluate: 'done', shadow: 'done',
        canary: decide ? 'done' : resumed ? 'now' : 'held',
        decide: promoted ? 'done' : decide ? 'now' : 'idle',
        watch: promoted ? 'now' : 'idle',
      },
      notes: {
        evaluate: 'Replay',
        canary: decide ? '✓' : resumed ? '25%' : 'On hold',
        decide: promoted ? 'Promoted' : decide ? 'Yours' : '',
        watch: promoted ? `Day ${day} of 14` : '',
      },
      center: promoted ? ['100%', 'served', 'closes 11-05'] : decide ? ['25%', 'served', 'Your decision'] : resumed ? ['25%', 'served', 'Day 3'] : ['25%', 'on hold', 'DE on baseline'],
      attention: !resumed,
      board: {
        n: promoted ? `All traffic in scope, day ${day}` : `Canary, n = ${M.fmt.int(canN)}`,
        v: { quality: -1.65 + 0.3 * w(5) + 0.45 * M.p(t, 0.6, 1.6), cost: -71 + 0.6 * w(6), p95: -650 + 30 * w(7), errors: 0.1 + 0.06 * w(8) },
        w: { quality: deQ },
        spend: Math.min(9.2 + 0.18 * x, 17.6),
      },
      segs: segQ.map((q, i) => ({
        q,
        calls: canN * X.SEG_SHARE[i],
        served: i === 2 && !resumed ? 'Frontier model' : 'Small model 25%',
        tint: i === 2 ? 1 - M.prog(t, 1.2, 0.6) : 0,
        ring: i === 2 ? 1 - M.prog(t, 1.2, 0.6) : 0,
        badge: i === 2 ? M.prog(t, 0.3, 0.4) : 0,
      })),
      panes: {
        Lsegs: 1 - dOut, Ldec: dsw,
        Rdec: 1 - M.p(t, 2.4, 0.5, 'inOutCubic'),
        Rpro: M.p(t, this.DECIDE, 0.5, 'inOutCubic') * (1 - M.p(t, this.PROMOTE + 0.3, 0.4, 'inOutCubic')),
        Rres: M.p(t, this.PROMOTE + 0.72, 0.4, 'inOutCubic'),
      },
      stageTitle: promoted ? 'Promoted to all traffic, route v13' : decide ? 'Result, 10-18 to 10-22' : resumed ? 'Canary' : t >= 1.2 ? 'Region · DE back within your limit' : 'Quality in Region · DE is outside your limit',
      stageRight: promoted ? `Watch · day ${day} of 14` : decide ? 'Every limit within' : resumed ? 'Step 2 of 4' : 'Region · DE retrained, underwrite-4b r2',
      share: 25,
    };
    const v = X.set(view, st, t);

    /* the count-up: cost per call, frontier model to the small model */
    M.countUp(v.cuv, t, this.COUNT, 1.8, 0.031, 0.009, (n) => '$' + n.toFixed(3));
    M.countUp(v.cup, t, this.COUNT, 1.8, 0, 71, (n) => (n < 0.5 ? '0%' : '−' + Math.round(n) + '%'));
    v.cu.style.boxShadow = `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(26 * M.ramp(t, this.COUNT + 1.4, this.COUNT + 3.4, 0.3, 1.0)).toFixed(1)}px rgba(201,162,39,.35)`;

    /* the evidence strip */
    M.rise(v.ev, t, this.EVIDENCE, { dy: 12 });
    v.evb.textContent = `route v13 · ${X.clock(this.X0 + this.PROMOTE)} · bundle v4 · sig 9c1e…4a7f`;

    /* Promote is measured once it is on screen, since it appears with Decide */
    if (v.bPro.offsetParent && !this.proAt) this.proAt = X.centerOf(view, v.bPro);
    const pro = this.proAt || rc.bPro;
    this.cur.at(t, [
      { t: this.PROMOTE - 1.0, x: pro[0] + 90, y: pro[1] + 80, glide: 0.01 },
      { t: this.PROMOTE, x: pro[0], y: pro[1], click: true },
      { t: this.PROMOTE + 0.9, x: pro[0] + 60, y: pro[1] + 90, hide: true },
    ]);

    M.camera(view.world, t, [
      { t: 0.1, rect: rc.segBlock, dur: 1.0 },
      { t: 2.9, rect: null, dur: 1.0 },
      { t: this.COUNT - 0.4, rect: rc.resBlock, dur: 1.2 },
      { t: 14.6, rect: null, dur: 1.3 },
    ]);
  },
});
