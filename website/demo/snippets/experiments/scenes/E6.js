/* Scene E6: A person decides. The view of E5, after the small model is retrained for Region · DE: the ring
   returns inside its band, the loop reaches Decide and the statement reads Baseline, Candidate, Change, Limit
   and Result. The owner promotes; Watch begins with the return arc to Propose gold, the cost per call counts
   down, and the record takes the statement's place: every stage with its dates, calls, cost and verdict. */
registerScene({
  id: "E6",
  act: 2,
  title: "A person decides",
  duration: 12,
  caption: "A person decides. Promote it to all traffic, and Watch keeps guarding it. Every stage, every verdict and every dollar is on one record.",

  RESUME: 0.8,     /* DE back inside its band; the canary resumes */
  DECIDE: 1.2,     /* the loop reaches Decide */

  /** The beats, keyed to the words that name them. */
  beats() {
    const PROMOTE = Mock.captionAt(this, 'Promote') + 0.6;
    return { RESUME: this.RESUME, DECIDE: this.DECIDE, PROMOTE, COUNT: PROMOTE + 1.0, REC: Mock.captionAt(this, 'Every') };
  },

  render(root) {
    ExpTour.tour.E6 = this;
    this.view = ExpTour.build(root);
    this.cur = Mock.cursor(this.view.world);
  },

  at(t) {
    const M = Mock, view = this.view;
    const rc = ExpTour.measure(view);
    const k = this.beats();
    const v = ExpTour.decide(view, t, k);

    /* Promote is measured once it is on screen, since it appears with Decide */
    if (t >= k.DECIDE + 0.5 && v.bPro.offsetParent && !this.proAt) this.proAt = ExpView.centerOf(view, v.bPro);
    const pro = this.proAt || rc.bPro;
    this.cur.at(t, [
      { t: k.PROMOTE - 0.9, x: pro[0] + 90, y: pro[1] + 80, glide: 0.01 },
      { t: k.PROMOTE, x: pro[0], y: pro[1], click: true },
      { t: k.PROMOTE + 0.9, x: pro[0] + 60, y: pro[1] + 90, hide: true },
    ]);

    /* the stage panel through the decision and the record */
    M.camera(view.world, t, [{ t: 0, rect: rc.stage, dur: 0.01 }]);
  },
});
