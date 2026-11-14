/* Scene 4.3: Console: the experiment. The Experiments view (lib/experiments.js): Shadow fills (the small
   model answers copies of live requests, graded, never served), the owner starts the canary, and the split
   moves 90/10 → 75/25 while every limit holds inside its band. */
registerScene({
  id: '4.3',
  act: 4,
  title: "Console: the experiment",
  duration: 22,
  caption: "So it becomes an experiment. The small model answers shadow copies of real requests, then takes a growing share of live traffic, while every limit the owner set is watched.",

  CANARY: 7.8,     /* the owner starts the canary */
  ADVANCE: 13.6,   /* and advances it to 25% */

  render(root) {
    root.classList.add('s4x', 's43');
    this.view = ExpView.build(root);
    this.cur = Mock.cursor(this.view.world);
  },

  at(t) {
    const M = Mock, X = ExpView, view = this.view, x = t;
    const rc = X.measure(view);
    const can = t >= this.CANARY;
    const swOut = M.p(t, this.CANARY + 0.1, 0.25, 'inOutCubic'), sw = M.p(t, this.CANARY + 0.32, 0.35, 'inOutCubic');
    const share = can ? M.lerp(10, 25, M.p(t, this.ADVANCE + 0.1, 1.2, 'inOutCubic')) : 10;

    /* figures on the demo clock, wandering a little like live data */
    const w = (s, sp = 0.5) => M.wander(t, sp, s) - 0.5;
    const graded = Math.round(M.lerp(1610, 2000, M.prog(t, 0, 7.4)));
    const canN = Math.round(can ? 140 * (t - this.CANARY) * (1 + 1.5 * M.prog(t, this.ADVANCE, 1)) : 0);
    const n = can ? canN : graded;
    const segQ = [-0.9 + 0.3 * w(1), -1.4 + 0.3 * w(2), -2.2 + 0.25 * w(3), -1.1 + 0.3 * w(4)];
    const qAll = -1.3 + 0.3 * w(5);
    const st = {
      x,
      status: can ? ['Canary', 'info'] : ['Shadow', 'info'],
      stages: { propose: 'done', evaluate: 'done', shadow: can ? 'done' : 'now', canary: can ? 'now' : 'idle', decide: 'idle', watch: 'idle' },
      notes: { evaluate: 'Replay', shadow: can ? '✓' : '10%', canary: can ? `${Math.round(share)}%` : '' },
      center: can ? [`${Math.round(share)}%`, 'served', `Day ${1 + Math.floor((2 * (x - this.CANARY) + 8) / 24)}`] : ['10%', 'graded, not served', `${M.fmt.int(graded)} of 2,000`],
      board: {
        n: can ? `Canary, n = ${M.fmt.int(canN)}` : `Shadow, n = ${M.fmt.int(graded)}`,
        v: { quality: qAll, cost: -71 + 0.6 * w(6), p95: -650 + 30 * w(7), errors: 0.1 + 0.06 * w(8) },
        w: { quality: segQ[2] },
        spend: 9.2 + 0.18 * x,
      },
      segs: segQ.map((q, i) => ({ q, calls: Math.max(0, n * X.SEG_SHARE[i]), served: `Small model ${Math.round(share)}%` })),
      panes: { Lshadow: 1 - swOut, Rshadow: 1 - swOut, Lsegs: sw, Rcanary: sw },
      stageTitle: can ? 'Canary' : 'Shadow',
      stageRight: can ? 'Step 2 of 4 · I advance each step' : 'Graded, never served',
      graded,
      share,
    };
    X.set(view, st, t);

    /* shadow: the quality chart draws along with the clock, the small model tracking the frontier model */
    const v = view.v, now = M.lerp(0.55, 1, M.clamp(t / 7.6));
    let db = '', dc = '';
    for (let k = 0; k <= 60 * now; k++) {
      const px = 40 + k * 10, tt = (k - 60) * 0.35;
      db += (k ? 'L' : 'M') + px + ' ' + (22 + 6 * (M.wander(t + tt, 1.4, 11) - 0.5)).toFixed(1);
      dc += (k ? 'L' : 'M') + px + ' ' + (32 + 9 * (M.wander(t + tt, 1.4, 12) - 0.5)).toFixed(1);
    }
    v.qb.setAttribute('d', db);
    v.qcd.setAttribute('d', dc);

    /* shadow copies of live requests, newest first, sliding in */
    const rate = 1.6, abs = M.abs(t) * rate, top = Math.floor(abs), fr = abs - top;
    view.rowEls.forEach((el, k) => {
      const id = top - k, s = M.noise(id);
      const fq = 0.88 + 0.08 * M.noise(id + 0.5), cq = fq - 0.035 + 0.05 * M.noise(id + 0.7);
      el.style.top = ((k - 1 + M.ease.outCubic(fr)) * 26).toFixed(1) + 'px';
      el.style.opacity = k === 0 ? M.ease.css(fr).toFixed(3) : k === 8 ? 0 : 1;
      el.children[0].textContent = 'c-' + (40000 + id * 7).toString(16);
      el.children[1].textContent = ['US', 'US', 'UK', 'DE', 'US', 'FR', 'UK', 'US', 'DE', 'US'][Math.floor(s * 10)];
      el.children[3].textContent = fq.toFixed(2);
      el.children[4].textContent = cq.toFixed(2);
    });

    /* canary: the actual ramp grows to now */
    const day = (xx) => 30 + Math.max(0, xx - this.CANARY) * 9;
    const xe = Math.min(day(t), 390), yAt = (sh) => 90 - sh * 1.6;
    const xa = Math.min(day(this.ADVANCE + 0.1), xe);
    const pts = `M30,${yAt(10)} H${xa.toFixed(1)}` + (t > this.ADVANCE ? ` V${yAt(share).toFixed(1)} H${xe.toFixed(1)}` : '');
    v.act.setAttribute('d', pts);
    v.area.setAttribute('d', pts + ` V90 H30 Z`);
    v.bAdv.textContent = t > this.ADVANCE + 0.3 ? 'Advance to 50%' : 'Advance to 25%';

    /* the owner's two clicks; Advance is measured once it is on screen, since it appears with the canary */
    if (t >= this.CANARY && v.bAdv.offsetParent && !this.advAt) this.advAt = X.centerOf(view, v.bAdv);
    const adv = this.advAt || rc.bAdv;
    this.cur.at(t, [
      { t: this.CANARY - 0.9, x: rc.bStart[0] + 60, y: rc.bStart[1] + 70, glide: 0.01 },
      { t: this.CANARY, x: rc.bStart[0], y: rc.bStart[1], click: true },
      { t: this.ADVANCE, x: adv[0], y: adv[1], click: true, glide: 1.0 },
      { t: this.ADVANCE + 1.2, x: adv[0] + 40, y: adv[1] + 60, hide: true },
    ]);

    /* push in on the stage panel, then the limits board, then back */
    M.camera(view.world, t, [
      { t: 3.6, rect: rc.stage, dur: 1.2 },
      { t: 15.6, rect: rc.board, dur: 1.3 },
      { t: 20.0, rect: null, dur: 1.2 },
    ]);
  },
});
