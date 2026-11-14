/* A person decides the rollout (adapted from the film's scenes 4.4 and 4.5). The Experiments view is
   ExpView. The slide runs two of the film's clocks in turn: the limit-crossing scene's time u (DE drifts
   through its quality limit, the experiment holds, DE goes back to the original model, the owner's
   preset choice) and then the decision scene's time v (DE retrained, back within, a person promotes,
   the evidence line). The demo clock reads experiment seconds, so it moves only when a beat plays.
   The film's cost count-up is left out: this is the governance story. */
registerSlide({
  id: 'experiment',
  act: 'together',
  title: 'A person decides the rollout',
  beats: [
    { t: 1.8, say: "Last, a different kind of change: a smaller model. Instead of switching over, the team runs an experiment, already serving a quarter of live traffic, watched against limits the owner set in advance." },
    { t: 4.0, say: "Quality, cost, latency, errors. Each has a band it must stay inside, written down before the experiment started." },
    { t: 6.35, say: "In one region, Germany, quality crosses the line." },
    { t: 10.8, say: "The experiment holds, and only that region goes back to the original model. Everyone else carries on. The response is as narrow as the problem." },
    { t: 12.8, say: "Why that response? Because the owner chose it in advance, with their name on it. Nobody is paged at three in the morning to improvise." },
    { t: 15.4, say: "The model is retrained for Germany, and it's back inside the band." },
    { t: 19.4, say: "When every limit has held, a person promotes it, and the decision is recorded with their name." },
    { t: 21.6, say: "A change proposed, measured, held when a limit broke, decided by a person, and every step in the same record." },
  ],

  /* slide time to each film clock */
  U: [[0, 1.6], [4.0, 1.6], [6.35, 3.95], [10.8, 8.4], [12.8, 14.4]],
  V: [[12.8, 0], [15.4, 2.6], [19.4, 6.6], [21.6, 8.0]],
  CROSS: 2.7, HOLD: 4.0, BASE: 7.4, OWNER: 13.6,
  RESUME: 2.2, DECIDE: 3.0, PROMOTE: 5.0, EVIDENCE: 6.0,

  render(root) {
    root.classList.add('s4x', 'sl-exp');
    Act4.consoleCss('sl-exp');
    this.view = ExpView.build(root);
    this.view.v.cu.style.display = 'none';
    this.cur = Mock.cursor(this.view.world);
  },

  /* the limit-crossing state, at its scene time u */
  stateA(t, u) {
    const M = Mock, X = ExpView;
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;
    const held = u >= this.HOLD, base = u >= this.BASE;
    const deQ = M.lerp(-2.2 + 0.25 * w(3), -3.45 + 0.08 * w(13), M.p(u, 1.6, 2.0, 'inOutCubic'));
    const segQ = [-0.9 + 0.3 * w(1), -1.4 + 0.3 * w(2), deQ, -1.1 + 0.3 * w(4)];
    const flash = M.ramp(u, this.CROSS, this.CROSS + 0.6, 0.12, 0.4) + M.ramp(u, this.CROSS + 0.6, this.CROSS + 1.2, 0.12, 0.4);
    const tint = M.prog(u, this.CROSS, 0.3);
    const canN = Math.round(4970 + 350 * Math.min(u, this.HOLD) + 210 * Math.max(0, u - this.HOLD));
    const swOut = M.p(u, this.HOLD + 0.2, 0.25, 'inOutCubic'), sw = M.p(u, this.HOLD + 0.45, 0.4, 'inOutCubic');
    return {
      x: 22 + u,
      status: held ? ['On hold', 'warn'] : ['Canary', 'info'],
      stages: { propose: 'done', evaluate: 'done', shadow: 'done', canary: held ? 'held' : 'now', decide: 'idle', watch: 'idle' },
      notes: { evaluate: 'Replay', canary: held ? 'On hold' : '25%' },
      center: held ? ['25%', 'on hold', base ? 'DE on baseline' : 'limit crossed'] : ['25%', 'served', 'Day 2'],
      attention: held,
      board: {
        n: `Canary, n = ${M.fmt.int(canN)}`,
        v: { quality: -1.3 + 0.3 * w(5) - 0.35 * M.p(u, 1.6, 2.0), cost: -71 + 0.6 * w(6), p95: -650 + 30 * w(7), errors: 0.1 + 0.06 * w(8) },
        w: { quality: deQ },
        spend: 9.2 + 0.18 * (22 + u),
      },
      segs: segQ.map((q, i) => ({
        q, calls: canN * X.SEG_SHARE[i],
        served: i === 2 && base ? 'Frontier model' : 'Small model 25%',
        flash: i === 2 ? flash : 0, tint: i === 2 ? tint : 0, ring: i === 2 ? tint : 0,
      })),
      panes: { Lsegs: 1, Rcanary: 1 - swOut, Rdec: sw },
      stageTitle: held ? 'Quality in Region · DE is outside your limit' : 'Canary',
      stageRight: held ? (base ? 'Region · DE on the frontier model · others unchanged' : 'Held at 25%') : 'Step 2 of 4 · I advance each step',
      share: 25,
    };
  },

  /* the decision state, at its scene time v */
  stateB(t, v) {
    const M = Mock, X = ExpView;
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;
    const resumed = v >= this.RESUME, decide = v >= this.DECIDE, promoted = v >= this.PROMOTE;
    const deQ = M.lerp(-3.45 + 0.08 * w(13), -1.5 + 0.2 * w(3), M.p(v, 0.6, 1.6, 'inOutCubic'));
    const segQ = [-0.9 + 0.3 * w(1), -1.4 + 0.3 * w(2), deQ, -1.1 + 0.3 * w(4)];
    const canN = Math.round(10150 + 210 * Math.min(v, this.RESUME) + 380 * Math.max(0, v - this.RESUME));
    const dOut = M.p(v, this.DECIDE, 0.25, 'inOutCubic'), dsw = M.p(v, this.DECIDE + 0.22, 0.35, 'inOutCubic');
    const day = promoted ? 1 + Math.floor((2 * (v - this.PROMOTE) + 2) / 24) : 0;
    let status = ['On hold', 'warn'];
    if (promoted) status = ['Promoted', 'ok']; else if (decide) status = ['Decide', 'info']; else if (resumed) status = ['Canary', 'info'];
    return {
      x: 44 + v,
      status,
      hbtn: promoted ? ['Close now', 'Roll back to v12'] : ['Pause', 'Roll back'],
      stages: {
        propose: 'done', evaluate: 'done', shadow: 'done',
        canary: decide ? 'done' : resumed ? 'now' : 'held',
        decide: promoted ? 'done' : decide ? 'now' : 'idle',
        watch: promoted ? 'now' : 'idle',
      },
      notes: { evaluate: 'Replay', canary: decide ? '✓' : resumed ? '25%' : 'On hold', decide: promoted ? 'Promoted' : decide ? 'Yours' : '', watch: promoted ? `Day ${day} of 14` : '' },
      center: promoted ? ['100%', 'served', 'closes 11-05'] : decide ? ['25%', 'served', 'Your decision'] : resumed ? ['25%', 'served', 'Day 3'] : ['25%', 'on hold', 'DE on baseline'],
      attention: !resumed,
      board: {
        n: promoted ? `All traffic in scope, day ${day}` : `Canary, n = ${M.fmt.int(canN)}`,
        v: { quality: -1.65 + 0.3 * w(5) + 0.45 * M.p(v, 0.6, 1.6), cost: -71 + 0.6 * w(6), p95: -650 + 30 * w(7), errors: 0.1 + 0.06 * w(8) },
        w: { quality: deQ },
        spend: Math.min(9.2 + 0.18 * (44 + v), 17.6),
      },
      segs: segQ.map((q, i) => ({
        q, calls: canN * X.SEG_SHARE[i],
        served: i === 2 && !resumed ? 'Frontier model' : 'Small model 25%',
        tint: i === 2 ? 1 - M.prog(v, 1.2, 0.6) : 0, ring: i === 2 ? 1 - M.prog(v, 1.2, 0.6) : 0,
        badge: i === 2 ? M.prog(v, 0.3, 0.4) : 0,
      })),
      panes: {
        Lsegs: 1 - dOut, Ldec: dsw,
        Rdec: 1 - M.p(v, 2.4, 0.5, 'inOutCubic'),
        Rpro: M.p(v, this.DECIDE, 0.5, 'inOutCubic') * (1 - M.p(v, this.PROMOTE + 0.3, 0.4, 'inOutCubic')),
        Rres: M.p(v, this.PROMOTE + 0.72, 0.4, 'inOutCubic'),
      },
      stageTitle: promoted ? 'Promoted to all traffic, route v13' : decide ? 'Result, 10-18 to 10-22' : resumed ? 'Canary' : v >= 1.2 ? 'Region · DE back within your limit' : 'Quality in Region · DE is outside your limit',
      stageRight: promoted ? `Watch · day ${day} of 14` : decide ? 'Every limit within' : resumed ? 'Step 2 of 4' : 'Region · DE retrained, underwrite-4b r2',
      share: 25,
    };
  },

  at(t) {
    const M = Mock, X = ExpView, view = this.view;
    const rc = X.measure(view);
    const phaseB = t > this.V[0][0] + 1e-6;
    const u = Act4.map(t, this.U), v = Act4.map(t, this.V);
    const st = phaseB ? this.stateB(t, v) : this.stateA(t, u);
    const vv = X.set(view, st, t);

    /* the canary's ramp holds where it is */
    vv.act.setAttribute('d', 'M30,74 H156 V50 H198');
    vv.area.setAttribute('d', 'M30,74 H156 V50 H198 V90 H30 Z');
    vv.bAdv.textContent = 'Advance to 50%';

    if (!phaseB) {
      /* DE's served-by cell lights as it changes; the owner's preset choice is pointed out */
      const sv = view.segs[2].sv, base = u >= this.BASE;
      sv.style.color = base ? `color-mix(in srgb, var(--c-amber) ${(100 * (1 - M.prog(u, this.BASE + 0.6, 1.2))).toFixed(0)}%, var(--c-text))` : '';
      sv.style.opacity = base ? M.lerp(0.2, 1, M.p(u, this.BASE, 0.4)).toFixed(3) : 1;
      const o = M.prog(u, this.OWNER, 0.5);
      vv.optOn.style.boxShadow = `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(22 * o).toFixed(1)}px rgba(201,162,39,${(0.45 * o).toFixed(3)})`;
      vv.owner.style.opacity = M.lerp(0.75, 1, o).toFixed(3);
      vv.owner.querySelector('b').style.color = o > 0.05 ? 'var(--c-gold-text)' : '';
    } else {
      view.segs[2].sv.style.color = '';
      view.segs[2].sv.style.opacity = 1;
      vv.optOn.style.boxShadow = '';
      vv.owner.style.opacity = 1;
      vv.owner.querySelector('b').style.color = '';
    }

    /* the evidence line for the promotion */
    M.rise(vv.ev, phaseB ? v : -1, this.EVIDENCE, { dy: 12 });
    Talk.txt(vv.evb, `route v13 · ${X.clock(44 + this.PROMOTE)} · bundle v4 · sig 9c1e…4a7f`);

    /* the person's click on Promote, measured once it is on screen */
    if (vv.bPro.offsetParent && !this.proAt) this.proAt = X.centerOf(view, vv.bPro);
    const pro = this.proAt || rc.bPro;
    this.cur.at(phaseB ? v : -10, [
      { t: this.PROMOTE - 1.1, x: pro[0] + 90, y: pro[1] + 80, glide: 0.3 },
      { t: this.PROMOTE, x: pro[0], y: pro[1], click: true, glide: 0.8 },
      { t: this.PROMOTE + 1.0, x: pro[0] + 60, y: pro[1] + 90, hide: true },
    ]);

    Talk.camera(view.world, t, [
      { t: 0.2, rect: rc.hero, dur: 1.3 },
      { t: 2.1, rect: rc.board, dur: 1.2 },
      { t: 4.1, rect: rc.segBlock, dur: 1.2 },
      { t: 6.5, rect: rc.stage, dur: 1.2 },
      { t: 10.9, rect: rc.dcard, dur: 1.2 },
      { t: 12.9, rect: rc.segBlock, dur: 1.2 },
      { t: 15.5, rect: rc.stage, dur: 1.2 },
      { t: 19.6, rect: null, dur: 1.4 },
    ]);
  },
});
