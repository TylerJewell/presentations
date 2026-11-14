/* Scene E3: Pick a technique, set your limits. The Experiments view (lib/catalogue.js) with no experiment yet:
   the stage panel holds the technique catalogue, up close, and each technique lights as it is named. The owner picks Smaller model, the panel becomes
   Propose, the template's four limits land on the form and the board, the budget goes in with the projected
   cost beside it, and the owner chooses what happens when a limit is crossed. E4 starts from there. */
registerScene({
  id: "E3",
  act: 2,
  title: "Pick a technique, set your limits",
  duration: 18,
  caption: "Experiments turns that bet into a measured rollout. Choose a technique: a smaller model, a self-hosted open-weight model, an added decisioning model, planner and worker routing, or a trial balloon. Then set your limits, and what happens if one is crossed.",

  render(root) {
    this.view = ExpTour.build(root);
    this.cur = Mock.cursor(this.view.world);
  },

  at(t) {
    const M = Mock, view = this.view;
    const rc = ExpTour.measure(view);
    /* beats keyed to the words that name them */
    const NAMED = [['Smaller model', 'smaller'], ['Self-hosted open-weight model', 'self-hosted'], ['Add a decisioning model', 'decisioning'],
      ['Planner and worker routing', 'planner'], ['Trial balloon', 'balloon']];
    const PICK = M.captionAt(this, 'Then') + 0.1;
    const LIM0 = M.captionAt(this, 'limits') + 0.05, LIM = [0, 1, 2, 3].map((i) => LIM0 + 0.3 * i);
    const BUDGET = LIM0 + 1.5;
    const BREACH = M.captionAt(this, 'crossed');
    const picked = t >= PICK, prop = M.p(t, PICK + 0.35, 0.4, 'inOutCubic');
    const chosen = t >= BREACH;

    const st = {
      x: 0,
      h: -94 + 2 * t,
      status: ['Draft', 'idle'],
      hbtn: [],
      head: picked
        ? { title: 'Smaller model for underwriting', kind: true, meta: chosen ? ExpTour.META : 'underwriting, <span class="tok">frontier-large</span> to <span class="tok">underwrite-4b</span>, judge underwriting-quality v3, exp-142' }
        : { title: 'New experiment', kind: false, meta: 'underwriting' },
      rail: picked ? ['Smaller model for underwriting', 'Smaller model'] : ['New experiment', 'Draft'],
      stages: { propose: 'now', evaluate: 'optional' },
      notes: { propose: picked ? 'Draft' : 'Pick one', evaluate: 'Optional' },
      center: picked ? ['Draft', 'nothing served'] : ['New', 'underwriting'],
      board: { n: '', v: { quality: 0, cost: 0, p95: 0, errors: 0 }, spend: 0 },
      setup: { lim: LIM.map((a) => M.prog(t, a, 0.7)), budget: M.prog(t, BUDGET, 0.5), proj: M.prog(t, BUDGET + 0.5, 0.7) },
      panes: {},
      stageTitle: picked ? 'Propose' : 'Choose a technique',
      stageRight: '',
      cat: 1 - M.p(t, PICK + 0.15, 0.3, 'inOutCubic'),
      /* each technique lights on its name and hands over to the next; the last holds until the pick */
      lit: Object.fromEntries(NAMED.map(([n, w], i) => {
        const a = M.captionAt(this, w), b = i + 1 < NAMED.length ? M.captionAt(this, NAMED[i + 1][1]) + 0.25 : PICK;
        return [n, M.ramp(t, a - 0.05, b, 0.2, 0.3)];
      })),
      pick: M.prog(t, PICK - 0.5, 0.3),
      picked,
      prop,
      form: {
        cand: M.ramp(t, PICK + 0.5, PICK + 2.2, 0.3, 0.8),
        lim: LIM.map((a) => M.prog(t, a, 0.7)),
        breach: M.prog(t, BREACH - 0.15, 0.15),
        budget: M.prog(t, BUDGET, 0.5),
        proj: M.prog(t, BUDGET + 0.5, 0.5),
        start: M.prog(t, BREACH, 0.3),
      },
    };
    ExpTour.set(view, st, t);

    this.cur.at(t, [
      { t: PICK - 0.8, x: rc.tSmall[0] + 120, y: rc.tSmall[1] + 110, glide: 0.01 },
      { t: PICK, x: rc.tSmall[0] - 20, y: rc.tSmall[1], click: true, glide: 0.8 },
      { t: BUDGET, x: rc.bud[0], y: rc.bud[1], click: true, glide: 1.0 },
      { t: BREACH, x: rc.breach[0] - 40, y: rc.breach[1], click: true, glide: 1.0 },
    ]);

    /* the catalogue up close through the technique sentence, then the whole view as Propose fills */
    M.camera(view.world, t, [
      { t: 1.4, rect: rc.catBlock, dur: 1.3 },
      { t: PICK + 0.4, rect: null, dur: 1.2 },
    ]);
  },
});
