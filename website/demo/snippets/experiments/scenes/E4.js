/* Scene E4: Shadow, then canary. The view of E3, continued: the cursor goes from the breach choice to Start
   shadow. The loop lights into Shadow with Evaluate dashed and Skipped, the camera pushes in on the stage panel,
   graded shadow calls fill toward 2,000 and the board's dots settle inside their bands. The owner starts the canary and advances it 10% → 25% → 50%; the segment rows fill
   and each segment's ring sits beside the overall dot on every axis. */
registerScene({
  id: "E4",
  act: 2,
  title: "Shadow, then canary",
  duration: 12,
  caption: "It starts in shadow, with nothing at risk. Then a canary takes a growing share of live traffic, graded against your limits, region by region.",

  SHADOW: 0.7,     /* the owner starts shadow */

  /** The beats, keyed to the words that name them. */
  beats() {
    const CANARY = Mock.captionAt(this, 'canary') + 0.2, ADV1 = Mock.captionAt(this, 'growing') + 0.2;
    return { CANARY, ADV1, ADV2: ADV1 + 1.5 };
  },

  /** Where the canary's ramp steps up, in the ramp chart's x; E5 and E6 hold the ramp there. */
  steps() {
    const { CANARY, ADV1, ADV2 } = this.beats(), xAt = (tt) => 30 + Math.max(0, tt - CANARY) * 70;
    return [[xAt(ADV1 + 0.1), 25], [xAt(ADV2 + 0.1), 50]];
  },

  render(root) {
    ExpTour.tour.E4 = this;
    this.view = ExpTour.build(root);
    this.cur = Mock.cursor(this.view.world);
  },

  at(t) {
    const M = Mock, T = ExpTour, view = this.view;
    const rc = T.measure(view);
    const { CANARY, ADV1, ADV2 } = this.beats();
    const shadow = t >= this.SHADOW, can = t >= CANARY;
    const share = !can ? 10 : M.lerp(10, 25, M.p(t, ADV1 + 0.1, 0.9, 'inOutCubic')) + 25 * M.p(t, ADV2 + 0.1, 0.9, 'inOutCubic');
    const step = t < ADV1 ? 1 : t < ADV2 ? 2 : 3;

    /* figures on the demo clock, wandering a little like live data */
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;
    const graded = Math.round(M.lerp(1240, 2000, M.p(t, this.SHADOW + 0.4, CANARY - this.SHADOW - 0.8, 'linear')));
    const canN = Math.round(can ? 160 * (t - CANARY) * (1 + 0.8 * M.prog(t, ADV1, 1) + 1.6 * M.prog(t, ADV2, 1)) : 0);
    /* the first graded calls swing each dot inside its band; the swing dies away as the sample grows */
    const sw = (k, amp) => amp * (1 - M.p(t, this.SHADOW + 0.5, 2.4, 'outCubic')) * Math.sin(5.5 * t + 1.7 * k);
    const segQ = [-0.3 + 0.15 * w(1), -1.6 + 0.15 * w(2), -2.1 + 0.15 * w(3), -0.8 + 0.15 * w(4)];
    const all = { quality: -1.2 + 0.25 * w(5) + sw(1, 1.1), cost: -71 + 0.6 * w(6) + sw(2, 12), p95: -660 + 30 * w(7) + sw(3, 160), errors: 0.1 + 0.06 * w(8) + sw(4, 0.14) };
    const segVis = M.p(t, CANARY + 0.6, 0.8);

    const swOut = M.p(t, this.SHADOW + 0.1, 0.25, 'inOutCubic'), swIn = M.p(t, this.SHADOW + 0.3, 0.35, 'inOutCubic');
    const cOut = M.p(t, CANARY + 0.1, 0.25, 'inOutCubic'), cIn = M.p(t, CANARY + 0.32, 0.35, 'inOutCubic');

    const st = {
      x: 0,
      h: 4.0 + 2 * t,
      status: !shadow ? ['Draft', 'idle'] : can ? ['Canary', 'info'] : ['Shadow', 'info'],
      hbtn: shadow ? ['Pause', 'Roll back'] : [],
      head: { title: 'Smaller model for underwriting', kind: true, meta: ExpTour.META },
      rail: ['Smaller model for underwriting', 'Smaller model'],
      stages: { propose: shadow ? 'done' : 'now', evaluate: 'optional', shadow: can ? 'done' : shadow ? 'now' : 'idle', canary: can ? 'now' : 'idle' },
      notes: { propose: shadow ? '✓' : 'Draft', evaluate: shadow ? 'Skipped' : 'Optional', shadow: can ? '✓' : shadow ? '10%' : '', canary: can ? `${Math.round(share)}%` : '' },
      center: !shadow ? ['Draft', 'nothing served'] : can ? [`${Math.round(share)}%`, 'served', 'Day 1'] : ['10%', 'graded, not served', `${M.fmt.int(graded)} of 2,000`],
      board: {
        n: can ? `Canary, n = ${M.fmt.int(canN)}` : `Shadow, n = ${M.fmt.int(graded)}`,
        v: all,
        w: { quality: segQ[2] },
        spend: Math.min(8.4, 6.1 + 0.36 * t) + Math.max(0, 0.12 * (t - CANARY)),
      },
      setup: shadow ? null : { lim: [1, 1, 1, 1], budget: 1, proj: 1 },
      dotVis: M.p(t, this.SHADOW + 0.5, 0.4),
      rings: T.rings(t, segQ, all),
      ringVis: segVis,
      segs: segQ.map((q, i) => ({ q, calls: canN * T.SEG_SHARE[i], served: `Small model ${Math.round(share)}%` })),
      panes: { Lshadow: swIn * (1 - cOut), Rshadow: swIn * (1 - cOut), Lsegs: cIn, Rcanary: cIn },
      stageTitle: !shadow ? 'Propose' : can ? 'Canary' : 'Shadow',
      stageRight: !shadow ? '' : can ? `Step ${step} of 3 · I advance each step` : 'Graded, never served',
      prop: 1 - swOut,
      form: { cand: 0, lim: [1, 1, 1, 1], breach: 1, budget: 1, proj: 1, start: 1 },
      graded,
      share,
    };
    const v = T.set(view, st, t);

    /* the arc into Shadow lights as shadow starts */
    const arc = view.arcs[1];
    if (shadow && !can) M.draw(arc, t, this.SHADOW + 0.1, 0.7);
    else { arc.style.strokeDasharray = ''; arc.style.strokeDashoffset = ''; arc.style.opacity = ''; }

    T.shadowChart(view, t, M.lerp(0.4, 1, M.clamp((t - this.SHADOW) / (CANARY - this.SHADOW))));
    T.shadowRows(view, t);

    /* canary: the actual ramp grows to now, stepping at each advance */
    const xAt = (tt) => 30 + Math.max(0, tt - CANARY) * 70;
    T.ramp(view, Math.min(xAt(t), 360), this.steps());
    v.bAdv.textContent = step === 1 ? 'Advance to 25%' : step === 2 ? 'Advance to 50%' : 'Decide';

    /* the owner's clicks: Start shadow, Start canary, then Advance twice from the same place */
    if (shadow && !this.adv && v.bAdv.offsetParent && t >= CANARY + 0.7) this.adv = ExpView.centerOf(view, v.bAdv);
    const adv = this.adv || [rc.bAdv[0], rc.bAdv[1]];
    this.cur.at(t, [
      { t: 0.01, x: rc.breach[0] - 40, y: rc.breach[1], glide: 0.3 },
      { t: this.SHADOW, x: rc.bShadow[0], y: rc.bShadow[1], click: true, glide: 0.6 },
      { t: this.SHADOW + 1.0, x: rc.bShadow[0] + 50, y: rc.bShadow[1] + 70, hide: true },
      { t: CANARY, x: rc.bStart[0], y: rc.bStart[1], click: true, glide: 0.9 },
      { t: ADV1, x: adv[0], y: adv[1], click: true, glide: 0.6 },
      { t: ADV2, x: adv[0], y: adv[1], click: true },
      { t: ADV2 + 1.0, x: adv[0] + 50, y: adv[1] + 70, hide: true },
    ]);

    /* the loop and the board while shadow fills, the stage panel for the canary, then the board's segments */
    M.camera(view.world, t, [
      { t: this.SHADOW + 0.4, rect: rc.stage, dur: 1.2 },
      { t: ADV2 + 0.9, rect: rc.heroH, dur: 1.2 },
    ]);
  },
});
