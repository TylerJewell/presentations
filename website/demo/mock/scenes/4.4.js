/* Scene 4.4: A limit is crossed. The Experiments view of 4.3, continued on the same demo clock. At 03:00
   simulated, Region · DE ticks past its quality limit: the row flashes red-orange, the worst-segment ring
   leaves its band, the loop stops On hold and only DE goes back to the frontier model. The camera pushes
   on the DE row, then on the decision card: the choice the owner made in advance, with their name. */
registerScene({
  id: '4.4',
  act: 4,
  title: "A limit is crossed",
  duration: 22,
  caption: "In one region, German applications, quality drops below the line. Akka holds the experiment and sends just that region back to the frontier model. The owner chose that, in advance. No one is paged at three in the morning.",

  X0: 22,          /* experiment seconds at the start of this scene (4.3 is 22 s) */
  CROSS: 2.7,      /* DE's quality passes (3.0%) */
  HOLD: 4.0,       /* the loop stops On hold */
  BASE: 7.4,       /* DE is served by the frontier model */
  OWNER: 13.6,     /* the owner's preset choice is pointed out */

  render(root) {
    root.classList.add('s4x', 's44');
    this.view = ExpView.build(root);
  },

  at(t) {
    const M = Mock, X = ExpView, view = this.view, x = this.X0 + t;
    const rc = X.measure(view);
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;
    const held = t >= this.HOLD, base = t >= this.BASE;

    /* DE drifts down through its limit, then stays outside it while measurement continues */
    const deQ = M.lerp(-2.2 + 0.25 * w(3), -3.45 + 0.08 * w(13), M.p(t, 1.6, 2.0, 'inOutCubic'));
    const segQ = [-0.9 + 0.3 * w(1), -1.4 + 0.3 * w(2), deQ, -1.1 + 0.3 * w(4)];
    const flash = M.ramp(t, this.CROSS, this.CROSS + 0.6, 0.12, 0.4) + M.ramp(t, this.CROSS + 0.6, this.CROSS + 1.2, 0.12, 0.4);
    const tint = M.prog(t, this.CROSS, 0.3);
    const canN = Math.round(4970 + 350 * Math.min(t, this.HOLD) + 210 * Math.max(0, t - this.HOLD));
    const swOut = M.p(t, this.HOLD + 0.2, 0.25, 'inOutCubic'), sw = M.p(t, this.HOLD + 0.45, 0.4, 'inOutCubic');

    const st = {
      x,
      status: held ? ['On hold', 'warn'] : ['Canary', 'info'],
      stages: { propose: 'done', evaluate: 'done', shadow: 'done', canary: held ? 'held' : 'now', decide: 'idle', watch: 'idle' },
      notes: { evaluate: 'Replay', canary: held ? 'On hold' : '25%' },
      center: held ? ['25%', 'on hold', base ? 'DE on baseline' : 'limit crossed'] : ['25%', 'served', 'Day 2'],
      attention: held,
      board: {
        n: `Canary, n = ${M.fmt.int(canN)}`,
        v: { quality: -1.3 + 0.3 * w(5) - 0.35 * M.p(t, 1.6, 2.0), cost: -71 + 0.6 * w(6), p95: -650 + 30 * w(7), errors: 0.1 + 0.06 * w(8) },
        w: { quality: deQ },
        spend: 9.2 + 0.18 * x,
      },
      segs: segQ.map((q, i) => ({
        q,
        calls: canN * X.SEG_SHARE[i],
        served: i === 2 && base ? 'Frontier model' : 'Small model 25%',
        flash: i === 2 ? flash : 0,
        tint: i === 2 ? tint : 0,
        ring: i === 2 ? tint : 0,
      })),
      panes: { Lsegs: 1, Rcanary: 1 - swOut, Rdec: sw },
      stageTitle: held ? 'Quality in Region · DE is outside your limit' : 'Canary',
      stageRight: held ? (base ? 'Region · DE on the frontier model · others unchanged' : 'Held at 25%') : 'Step 2 of 4 · I advance each step',
      share: 25,
    };
    const v = X.set(view, st, t);

    /* the served-by cell for DE lights as it changes */
    const sv = view.segs[2].sv;
    sv.style.color = base ? `color-mix(in srgb, var(--c-amber) ${(100 * (1 - M.prog(t, this.BASE + 0.6, 1.2))).toFixed(0)}%, var(--c-text))` : '';
    sv.style.opacity = M.lerp(0.2, 1, M.p(t, this.BASE, 0.4)).toFixed(3);
    if (!base) sv.style.opacity = 1;

    /* the canary's ramp holds where it is */
    v.act.setAttribute('d', 'M30,74 H156 V50 H198');
    v.area.setAttribute('d', 'M30,74 H156 V50 H198 V90 H30 Z');
    v.bAdv.textContent = 'Advance to 50%';

    /* the owner's choice, pointed out */
    const o = M.ramp(t, this.OWNER, 19.4, 0.4, 0.6);
    v.optOn.style.boxShadow = `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(22 * o).toFixed(1)}px rgba(201,162,39,${(0.45 * o).toFixed(3)})`;
    v.owner.style.opacity = M.lerp(0.75, 1, M.p(t, this.OWNER + 0.3, 0.5)).toFixed(3);
    v.owner.querySelector('b').style.color = o > 0.05 ? 'var(--c-gold-text)' : '';

    M.camera(view.world, t, [
      { t: 0.9, rect: rc.segBlock, dur: 1.2 },
      { t: 10.4, rect: null, dur: 1.1 },
      { t: 13.0, rect: rc.dcard, dur: 1.2 },
      { t: 19.6, rect: null, dur: 1.2 },
    ]);
  },
});
