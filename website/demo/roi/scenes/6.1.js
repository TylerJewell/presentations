/* Scene 6.1: layers that share one runtime. Left: five separately assembled frameworks, each a box with the part
   in use filled and the headroom above it hatched. Right: everything that runs as an actor (agents, evaluations,
   guardrails, workflows, endpoints, data queries, timers) inside one Akka runtime on one pool, one fill for all of
   them and no hatched space. */
Roi.register({
  id: '6.1',

  LAYERS: [['Agent framework', 0.35], ['Workflow engine', 0.25], ['State store', 0.45], ['Message queue', 0.3], ['Stream processor', 0.4]],
  KINDS: [['Agents', 'agents,'], ['Evaluations', 'evaluations,'], ['Guardrails', 'guardrails,'], ['Workflows', 'workflows,'], ['Endpoints', 'endpoints,'], ['Data queries', 'data'], ['Timers', 'timers']],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { assembled: at('Assembled'), allocated: at('allocated'), headroom: at('headroom'), paid: at('paid'), akka: at('In'), shares: at('shares'), kinds: this.KINDS.map(([, w]) => at(w)), pool: at('pool,'), whichever: at('whichever') };
  },

  render(root) {
    root.classList.add('r61');
    Mock.style('r61', `
      .r61 .ro-head { width: 1300px; }
      .r61 .side { top: 290px; }
      .r61 .lay { top: 340px; height: 330px; border-radius: 10px; border: 1px solid rgba(241,241,241,.18); background: var(--medium-black); overflow: hidden; }
      .r61 .lay .nm { position: absolute; left: 0; right: 0; top: 18px; text-align: center; font: 600 18px/1.2 var(--sans); color: var(--white); padding: 0 10px; text-wrap: balance; }
      .r61 .lay .use { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(255,206,74,.22); border-top: 2px solid rgba(255,206,74,.7); }
      .r61 .lay .ro-hatch { top: 60px; }
      .r61 .one { left: 1080px; top: 340px; width: 680px; height: 330px; border-radius: 12px; border: 1px solid rgba(255,206,74,.45); background: var(--medium-black); overflow: hidden; }
      .r61 .one .fns { position: absolute; left: 18px; right: 18px; top: 18px; display: flex; flex-wrap: wrap; gap: 10px; }
      .r61 .one .fn { --g: 0; height: 48px; padding: 0 16px; border-radius: 8px; display: flex; align-items: center; font: 600 17px/1.1 var(--sans);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.18)); background: rgba(255,255,255,.03); }
      .r61 .one .use { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(255,206,74,.22); border-top: 2px solid rgba(255,206,74,.7); }
      .r61 .one .cap { position: absolute; left: 0; right: 0; bottom: 18px; text-align: center; font: 600 18px/1.2 var(--sans); color: var(--yellow); }
      .r61 .lg { top: 700px; }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Infrastructure', headline: 'Separate layers each keep their own headroom.', lit: 0 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Assembled frameworks</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1080px">Akka, one shared compute model</div>').root;
    this.lays = this.LAYERS.map(([nm], i) => M.mount(root, `<div class="lay" style="left:${160 + i * 170}px;width:150px"><div class="nm">${nm}</div><div class="ro-hatch" data-k="h"></div><div class="use" data-k="u"></div></div>`));
    this.one = M.mount(root, `<div class="one"><div class="fns">${this.KINDS.map(([k]) => `<div class="fn">${k}</div>`).join('')}</div>
      <div class="use" data-k="u"></div><div class="cap" data-k="cap">One pool; capacity goes to whichever part needs it.</div></div>`);
    this.fns = [...this.one.root.querySelectorAll('.fn')];
    this.lgL = M.mount(root, '<div class="lg ro-note" style="left:160px;width:830px">Each layer is allocated and managed on its own. The hatched space is capacity that is paid for and not used.</div>').root;
    this.lgR = M.mount(root, '<div class="lg ro-note" style="left:1080px;width:680px">Everything that runs as an actor shares the same compute model.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    /* the five layers rise; each fills to its own level as "allocated" is spoken; the headroom hatches as it is named */
    this.lays.forEach((L, i) => {
      M.rise(L.root, t, 0.7 + i * 0.1);
      const fill = this.LAYERS[i][1] * M.ease.outCubic(M.prog(t, K.allocated - 0.2 + i * 0.1, 0.9));
      L.u.style.height = (fill * 100).toFixed(1) + '%';
      L.h.style.bottom = (fill * 100).toFixed(1) + '%';
      L.h.style.opacity = (0.9 * M.prog(t, K.headroom - 0.3 + i * 0.08, 0.5) * (1 + 0.3 * M.wave(t, 1.6, i * 0.2) * M.ramp(t, K.paid - 0.2, K.akka, 0.3, 0.5))).toFixed(3);
    });
    M.rise(this.lgL, t, K.headroom + 0.2, { dy: 8 });
    this.lgL.style.opacity = (parseFloat(this.lgL.style.opacity) * (1 - 0.5 * M.prog(t, K.akka, 0.6))).toFixed(3);
    /* the Akka runtime rises as it is named; each kind of actor lights as it is listed; one fill for all of them */
    M.rise(this.sideR, t, K.akka - 0.3, { dy: 10 });
    M.rise(this.one.root, t, K.akka - 0.2);
    this.fns.forEach((el, i) => { M.rise(el, t, K.shares - 0.2 + i * 0.06, { dy: 6 }); Roi.glow(el, Math.max(M.ramp(t, K.kinds[i] - 0.15, K.kinds[i] + 1.4, 0.25, 0.5), 0.4 * M.prog(t, K.pool, 0.6))); });
    const total = this.LAYERS.reduce((a, [, f]) => a + f, 0) / this.LAYERS.length;
    this.one.u.style.height = (100 * total * M.ease.outCubic(M.prog(t, K.pool - 0.3, 1.0))).toFixed(1) + '%';
    this.one.cap.style.opacity = M.prog(t, K.whichever - 0.2, 0.5).toFixed(3);
    M.rise(this.lgR, t, K.shares + 0.2, { dy: 8 });
  },
});
