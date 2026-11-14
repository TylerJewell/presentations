/* Scene E5: Germany routes back. The view of E4, continued on the same demo clock. Region · DE's ring on the
   Quality axis drifts past its limit and the axis turns Outside; the loop shows Continuing at 50%. In the stage
   panel the DE row flashes and only DE goes back to the frontier model, while the choice the owner made at
   Propose shows In effect, with their name. */
registerScene({
  id: "E5",
  act: 2,
  title: "Germany routes back",
  duration: 12,
  caption: "We can see that quality in Germany is starting to degrade. The rest of the experiment continues, with Germany's traffic routing back to the original model.",

  render(root) {
    this.view = ExpTour.build(root);
  },

  at(t) {
    const M = Mock, T = ExpTour, view = this.view;
    const rc = T.measure(view);
    const CROSS = M.captionAt(this, 'degrade') + 0.1;
    const HOLD = M.captionAt(this, 'rest') + 0.1;
    const FLASH = M.captionAt(this, 'traffic') + 0.1;
    const BASE = M.captionAt(this, 'original');
    const OWNER = M.captionAt(this, 'original') + 1.2;
    const held = t >= HOLD, base = t >= BASE;
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;

    /* DE drifts down through its limit, then stays outside it while measurement continues */
    const deQ = M.lerp(-2.1 + 0.15 * w(3), -3.45 + 0.08 * w(13), M.p(t, CROSS - 1.3, 1.6, 'inOutCubic'));
    const segQ = [-0.3 + 0.15 * w(1), -1.6 + 0.15 * w(2), deQ, -0.8 + 0.15 * w(4)];
    const all = { quality: -1.2 + 0.25 * w(5) - 0.3 * M.p(t, CROSS - 1.3, 1.6), cost: -71 + 0.6 * w(6), p95: -660 + 30 * w(7), errors: 0.1 + 0.06 * w(8) };
    const flash = M.ramp(t, FLASH, FLASH + 0.6, 0.12, 0.4) + M.ramp(t, FLASH + 0.6, FLASH + 1.2, 0.12, 0.4);
    const tint = M.prog(t, FLASH, 0.3);
    const canN = Math.round(3820 + 380 * Math.min(t, HOLD) + 240 * Math.max(0, t - HOLD));
    const swOut = M.p(t, HOLD + 0.2, 0.25, 'inOutCubic'), sw = M.p(t, HOLD + 0.45, 0.4, 'inOutCubic');

    const st = {
      x: 0,
      h: 4 + 2 * T.tour.E4.span + 2 * t,
      status: held ? ['Continuing', 'warn'] : ['Canary', 'info'],
      hbtn: ['Pause', 'Roll back'],
      head: { title: 'Smaller model for underwriting', kind: true, meta: T.META },
      rail: ['Smaller model for underwriting', 'Smaller model'],
      stages: { propose: 'done', evaluate: 'optional', shadow: 'done', canary: held ? 'held' : 'now' },
      notes: { evaluate: 'Skipped', canary: held ? 'Continuing' : '50%' },
      center: held ? ['50%', 'continuing', base ? 'DE on baseline' : 'limit crossed'] : ['50%', 'served', 'Day 2'],
      attention: held,
      board: { n: `Canary, n = ${M.fmt.int(canN)}`, v: all, w: { quality: deQ }, spend: 9.25 + 0.12 * t },
      rings: T.rings(t, segQ, all),
      segs: segQ.map((q, i) => ({
        q,
        calls: canN * T.SEG_SHARE[i],
        served: i === 2 && base ? 'Frontier model' : 'Small model 50%',
        flash: i === 2 ? flash : 0,
        tint: i === 2 ? tint : 0,
        ring: i === 2 ? tint : 0,
      })),
      panes: { Lsegs: 1, Rcanary: 1 - swOut, Rdec: sw },
      stageTitle: held ? 'Quality in Region · DE is outside your limit' : 'Canary',
      stageRight: held ? (base ? 'Region · DE on the frontier model · others unchanged' : 'Continuing at 50%') : 'Step 3 of 3 · I advance each step',
      share: 50,
    };
    const v = T.set(view, st, t);

    /* the served-by cell for DE lights as it changes */
    const sv = view.segs[2].sv;
    sv.style.color = base ? `color-mix(in srgb, var(--c-amber) ${(100 * (1 - M.prog(t, BASE + 0.6, 1.2))).toFixed(0)}%, var(--c-text))` : '';
    sv.style.opacity = base ? M.lerp(0.2, 1, M.p(t, BASE, 0.4)).toFixed(3) : 1;

    /* the canary's ramp holds where E4 left it */
    T.ramp(view, 360, T.tour.E4.steps());
    v.bAdv.textContent = 'Decide';

    /* the owner's choice, pointed out */
    const o = M.ramp(t, OWNER, this.duration + 1, 0.4, 0.6);
    v.optOn.style.boxShadow = `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(22 * o).toFixed(1)}px rgba(201,162,39,${(0.45 * o).toFixed(3)})`;
    v.owner.style.opacity = M.lerp(0.75, 1, M.p(t, OWNER + 0.3, 0.5)).toFixed(3);
    v.owner.querySelector('b').style.color = o > 0.05 ? 'var(--c-gold-text)' : '';

    /* the board as DE crosses, then the stage panel for what the hold changed */
    M.camera(view.world, t, [
      { t: 0, rect: rc.heroH, dur: 0.01 },
      { t: HOLD + 0.5, rect: rc.stage, dur: 1.1 },
    ]);
  },
});
