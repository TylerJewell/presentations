/* Scene 6.1: Efficiency from actors. The camera opens pushed in on one core while actors pour into it as
   yellow points; it pulls back as load rises, the core replicates into a cluster and the points rebalance
   onto each new core, while a grey conventional stack multiplies its parts beside it, each instance
   provisioned for its peak with its idle headroom shaded. The scene ends pushed in on the latency readout,
   flat under climbing throughput.

   Every point is placed from t alone: its arrival time, its core after each join (rendezvous hashing, so
   a joining core takes only its share) and its glide between cores are all derived per frame. */
registerScene({
  id: '6.1',
  act: 6,
  title: 'Efficiency from actors',
  duration: 18,
  caption: 'Here is where the economics come from. Every agent, workflow and conversation in Akka is an actor that holds its own state, millions to a core, with no broker, cache or orchestrator around it. As load grows it spreads across the cluster, and latency stays flat.',

  /* cluster geometry: 4 x 2 cores */
  TILE: 185, PITCH: 205, X0: 160, Y0: 410,
  /* when each core joins; core 0 is there from the start */
  JOIN: [-99, 7.8, 8.3, 8.8, 9.3, 9.8, 10.3, 10.8],
  /* points: the first P1 pour into core 0 before the pull-back, the rest arrive as load rises */
  P1: 760, N: 3200,
  /* canvas over the cluster and the pour above it, drawn at 2.5x so the 1.8x push stays sharp */
  CV: { x: 140, y: 300, w: 840, h: 510, k: 2.5 },
  /* the conventional stack: layer, most instances under full load */
  STACK: [['Agent framework', 10], ['Message broker', 13], ['Cache', 9], ['State database', 12], ['Orchestrator', 8], ['Job scheduler', 11]],
  /* the latency chart */
  CH: { x0: 470, x1: 846, y0: 344, y1: 214, ta: -4, tb: 15.4 },

  timing() {
    if (this.T) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.T = { pull: 6.6, chartIn: at('As') + 0.3, flat: at('As') + 1.3 };
  },

  /** Load, 0..1: light while one core fills, then rising with the cluster. */
  load(t) { return 0.12 + 0.88 * Mock.ease.inOutCubic(Mock.prog(t, 7.2, 4.6)); },

  render(root) {
    root.classList.add('s61');
    Mock.style('s61', `
      .s61 .h { left: var(--gutter); top: 80px; }
      .s61 .core { width: 185px; height: 185px; border-radius: 12px; border: 1px solid var(--hair-hi); background: rgba(255,255,255,.02); transform-origin: 50% 50%; }
      .s61 .core .lb { position: absolute; left: 14px; top: 12px; font: 600 11.5px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .s61 .core .ct { position: absolute; right: 14px; top: 12px; font: 500 12px/1 var(--sans); color: var(--medium-grey); font-variant-numeric: tabular-nums; }
      .s61 canvas { left: 140px; top: 300px; width: 840px; height: 510px; }
      .s61 .lead { left: 400px; top: 450px; width: 640px; }
      .s61 .lead .n { font: 700 56px/1 var(--sans); white-space: nowrap; letter-spacing: -.035em; color: var(--white); }
      .s61 .lead .n span { color: var(--yellow); }
      .s61 .lead .s { margin-top: 16px; font: 500 19px/1.4 var(--sans); color: var(--soft-grey); max-width: 470px; }
      .s61 .lead .s b { color: var(--white); font-weight: 600; }
      .s61 .clab { left: 160px; top: 382px; font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--yellow); }
      .s61 .clab span { color: var(--soft-grey); margin-left: 10px; letter-spacing: .1em; }
      .s61 .chart { left: 160px; top: 192px; width: 800px; height: 176px; border: 1px solid var(--hair); border-radius: 12px; background: rgba(255,255,255,.02); }
      .s61 .rd { left: 184px; display: flex; flex-direction: column; gap: 6px; }
      .s61 .rd .k { font: 600 11.5px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s61 .rd .v { font: 600 30px/1 var(--sans); letter-spacing: -.02em; color: var(--white); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .s61 .rd .v small { font-size: 17px; font-weight: 500; color: var(--soft-grey); margin-left: 4px; letter-spacing: 0; }
      .s61 .rd .v.y { color: var(--yellow); }
      .s61 svg.cs { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s61 .gl { stroke: rgba(241,241,241,.06); stroke-width: 1; }
      .s61 .thr { fill: none; stroke: var(--yellow); stroke-width: 2.6; stroke-linejoin: round; stroke-linecap: round; }
      .s61 .thrA { fill: url(#s61fill); stroke: none; }
      .s61 .lat { fill: none; stroke: var(--white); stroke-width: 2.2; stroke-linecap: round; }
      .s61 .lt { font: 600 11.5px var(--sans); letter-spacing: .14em; text-transform: uppercase; }
      .s61 .sim { left: 838px; top: 376px; }
      .s61 .mk-chip.demo { font-size: 11px; padding: 5px 8px; }
      .s61 .sk { left: 1060px; top: 196px; width: 700px; }
      .s61 .sk .t { font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); }
      .s61 .sk .s { margin-top: 10px; font: 500 18px/1.3 var(--sans); color: var(--medium-grey); }
      .s61 .row { left: 1060px; width: 700px; height: 40px; }
      .s61 .row .nm { position: absolute; left: 0; top: 0; width: 170px; font: 500 16px/40px var(--sans); color: #8d8d8d; white-space: nowrap; }
      /* an instance provisioned for its peak: the solid part is in use, the hatched part idle */
      .s61 .row i { position: absolute; top: 3px; width: 30px; height: 34px; border-radius: 5px; border: 1px solid rgba(241,241,241,.26); overflow: hidden;
        background: repeating-linear-gradient(135deg, rgba(241,241,241,.10) 0 2px, rgba(241,241,241,0) 2px 6px); transform-origin: 50% 100%; }
      .s61 .row i b { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(241,241,241,.34); }
      .s61 .row::after { content: ''; position: absolute; left: 0; right: 0; bottom: -9px; height: 1px; background: rgba(241,241,241,.05); }
      .s61 .lg { left: 1060px; top: 752px; display: flex; gap: 26px; font: 500 15px/1 var(--sans); color: var(--soft-grey); }
      .s61 .lg span { display: inline-flex; align-items: center; gap: 9px; }
      .s61 .lg i { width: 14px; height: 16px; border-radius: 3px; border: 1px solid rgba(241,241,241,.26); }
      .s61 .tot { left: 1060px; top: 682px; display: flex; align-items: baseline; gap: 14px; }
      .s61 .tot .v { font: 700 44px/1 var(--sans); letter-spacing: -.03em; color: #8d8d8d; font-variant-numeric: tabular-nums; }
      .s61 .tot .k { font: 600 12.5px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--medium-grey); }
    `);
    const world = (this.world = Mock.world(root));
    Mock.dotGrid(world);
    this.h = Mock.mount(world, `<h2 class="mk-h2 h">Efficient at the <span class="accent">smallest scale.</span></h2>`).root;

    /* cores */
    this.cores = this.JOIN.map((_, k) => {
      const [x, y] = this.coreXY(k);
      const r = Mock.mount(world, `<div class="core" style="left:${x}px;top:${y}px"><span class="lb">Core ${k + 1}</span><span class="ct" data-k="ct"></span></div>`);
      return r;
    });
    this.clab = Mock.mount(world, `<div class="clab">Akka cluster<span data-k="n"></span></div>`);

    /* the points' canvas */
    const C = this.CV;
    this.cv = Mock.html(`<canvas width="${C.w * C.k}" height="${C.h * C.k}"></canvas>`);
    world.appendChild(this.cv);
    this.ctx = this.cv.getContext('2d');
    this.buildPoints();

    this.lead = Mock.mount(world, `<div class="lead"><div class="n" data-k="n"><span>200M</span> actors per core</div>
      <div class="s" data-k="s">Each point is a <b>conversation, agent or workflow</b> holding its own state, in 4 KB.</div></div>`);

    /* the latency readout */
    const CH = this.CH;
    this.chart = Mock.mount(world, `<div class="chart"></div>`).root;
    this.rd = Mock.mount(world, `<div class="rd" style="top:214px">
      <span class="k">Reads</span><span class="v">4 ms</span></div>`);
    this.rd2 = Mock.mount(world, `<div class="rd" style="top:214px;left:300px">
      <span class="k">Writes</span><span class="v">sub-10 ms</span></div>`);
    this.rd3 = Mock.mount(world, `<div class="rd" style="top:290px">
      <span class="k">Throughput</span><span class="v y" data-k="v"></span></div>`);
    const grid = [0, 1, 2, 3].map((i) => { const y = CH.y1 + (i * (CH.y0 - CH.y1)) / 3; return `<line class="gl" x1="${CH.x0}" x2="${CH.x1}" y1="${y}" y2="${y}"/>`; }).join('');
    this.cs = Mock.html(`<svg class="cs" viewBox="0 0 1920 1080">
      <defs><linearGradient id="s61fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFCE4A" stop-opacity=".22"/><stop offset="1" stop-color="#FFCE4A" stop-opacity="0"/></linearGradient></defs>
      ${grid}<path class="thrA" data-k="a"/><path class="thr" data-k="thr"/><path class="lat" data-k="lat"/>
      <circle data-k="th" r="5" fill="#FFCE4A"/><circle data-k="lh" r="4.5" fill="#F1F1F1"/>
      <text class="lt" data-k="tl" fill="#FFCE4A">Throughput</text>
      <text class="lt" data-k="ll" fill="#F1F1F1">Latency</text></svg>`);
    world.appendChild(this.cs);
    const q = (k) => this.cs.querySelector(`[data-k="${k}"]`);
    this.c = { a: q('a'), thr: q('thr'), lat: q('lat'), th: q('th'), lh: q('lh'), tl: q('tl'), ll: q('ll') };
    this.sim = Mock.mount(world, `<span class="sim mk-chip demo">Simulated load</span>`).root;

    /* the conventional stack */
    this.sk = Mock.mount(world, `<div class="sk"><div class="t">Conventional stack</div><div class="s">Every part runs, scales and is paid for on its own.</div></div>`).root;
    this.rows = this.STACK.map(([nm, max], k) => {
      const el = Mock.html(`<div class="row" style="top:${292 + k * 62}px"><span class="nm">${nm}</span>${Array.from({ length: max }, (_, j) => `<i style="left:${180 + j * 39}px"><b></b></i>`).join('')}</div>`);
      world.appendChild(el);
      return { el, max, boxes: [...el.querySelectorAll('i')], use: [...el.querySelectorAll('i b')] };
    });
    this.tot = Mock.mount(world, `<div class="tot"><span class="v" data-k="v">6</span><span class="k">Instances to run</span></div>`);
    this.lg = Mock.mount(world, `<div class="lg"><span><i style="background:rgba(241,241,241,.34)"></i>In use</span>
      <span><i style="background:repeating-linear-gradient(135deg, rgba(241,241,241,.16) 0 2px, transparent 2px 6px)"></i>Provisioned for the peak, idle</span></div>`).root;

  },

  coreXY(k) { return [this.X0 + (k % 4) * this.PITCH, this.Y0 + Math.floor(k / 4) * this.PITCH]; },

  /** Precomputes each point's slot, arrival and core after each join. */
  buildPoints() {
    const M = Mock, J = this.JOIN.length;
    this.pts = Array.from({ length: this.N }, (_, i) => {
      const u = (0.5 + i * 0.7548776662) % 1, v = (0.5 + i * 0.5698402910) % 1;
      const ta = i < this.P1 ? -3.2 + (9.2 * i) / this.P1 + 0.05 * M.noise(i + 9) : 7.7 + (4.3 * (i - this.P1)) / (this.N - this.P1) + 0.12 * M.noise(i + 5);
      const score = (k) => M.noise(i * 13.37 + k * 79.19 + 3);
      const own = [0];
      for (let k = 1; k < J; k++) own.push(score(k) > score(own[k - 1]) ? k : own[k - 1]);
      return { u, v, ta, own, ph: M.noise(i + 77) * 6.283, fr: 0.6 + 0.8 * M.noise(i + 31), lag: 0.15 + 0.55 * M.noise(i + 41) };
    });
  },

  slot(p, k) {
    const [x, y] = this.coreXY(k);
    return [x + 14 + p.u * (this.TILE - 28), y + 34 + p.v * (this.TILE - 46)];
  },

  at(t) {
    const M = Mock, T = (this.timing(), this.T), abs = M.abs(t);
    const L = this.load(t);

    /* camera: pushed in on the first core, out as load rises, and in on the flat latency to the cut */
    const [cx, cy] = this.coreXY(0);
    M.camera(this.world, t, [
      { t: -3, rect: [cx - 10, cy - 20, 770, 220], dur: 0.8 },
      { t: T.pull, rect: null, dur: 1.3 },
      { t: T.chartIn, rect: [160, 192, 800, 176], dur: 1.2 },
    ]);
    const out = M.p(t, T.pull, 1.0, 'inOutCubic');

    M.rise(this.h, t, T.pull + 0.3);
    M.riseOut(this.lead.n, t, -0.6, T.pull - 0.4);
    M.riseOut(this.lead.s, t, -0.4, T.pull - 0.4);

    /* cores: each joins with a lift and a yellow edge that settles */
    const joined = this.JOIN.filter((j) => t >= j).length;
    this.cores.forEach((c, k) => {
      const j = this.JOIN[k];
      const a = k === 0 ? 1 : M.p(t, j - 0.15, 0.6);
      const flash = k === 0 ? 0.55 + 0.45 * (1 - out) : M.ramp(t, j - 0.15, j + 1.4, 0.2, 0.9);
      M.set(c.root, {
        opacity: a.toFixed(3),
        transform: `scale(${(0.88 + 0.12 * a).toFixed(4)})`,
        borderColor: `color-mix(in srgb, var(--yellow) ${(55 * flash).toFixed(1)}%, rgba(241,241,241,.2))`,
        boxShadow: `0 0 ${(50 * flash).toFixed(1)}px -16px rgba(255,206,74,.7)`,
      });
    });
    M.fade(this.clab.root, t, T.pull + 0.5, 0.6);
    const ncText = ` · ${joined} ${joined === 1 ? 'core' : 'cores'}`;
    if (this.clab.n.textContent !== ncText) this.clab.n.textContent = ncText;

    /* points */
    const C = this.CV, ctx = this.ctx;
    ctx.setTransform(C.k, 0, 0, C.k, -C.x * C.k, -C.y * C.k);
    ctx.clearRect(C.x, C.y, C.w, C.h);
    const counts = new Array(this.JOIN.length).fill(0);
    let shown = 0;
    for (let i = 0; i < this.N; i++) {
      const p = this.pts[i];
      if (t < p.ta - 0.7) continue;
      /* glide through each change of core that has begun */
      let [x, y] = this.slot(p, 0), cur = 0;
      for (let k = 1; k < this.JOIN.length; k++) {
        if (p.own[k] === p.own[k - 1]) continue;
        const s = this.JOIN[k] + p.lag;
        if (t < s) break;
        const [nx, ny] = this.slot(p, p.own[k]);
        const g = s + 0.9 <= p.ta ? 1 : M.ease.inOutCubic(M.prog(t, s, 0.9));
        x = M.lerp(x, nx, g); y = M.lerp(y, ny, g) - Math.sin(g * Math.PI) * 14;
        cur = p.own[k];
      }
      let alpha, r = 1.55;
      if (t < p.ta) {
        /* arriving: core 0's points pour in from above; later ones swell in place */
        const a = M.prog(t, p.ta - 0.7, 0.7);
        if (i < this.P1) {
          /* a stream from one point above the core, fanning out to each point's slot */
          const [cx0, cy0] = this.coreXY(0), e = M.ease.outCubic(a);
          x = M.lerp(cx0 + this.TILE / 2 + (p.u - 0.5) * 36, x, e); y = M.lerp(cy0 - 96 - 26 * p.v, y, e); alpha = 0.35 + 0.65 * a;
        }
        else { alpha = a; r = 1.55 * (0.4 + 0.6 * a); }
      } else {
        alpha = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(abs * p.fr + p.ph));
        x += 1.1 * Math.sin(abs * 0.9 * p.fr + p.ph);
        y += 1.1 * Math.cos(abs * 0.7 * p.fr + p.ph * 1.3);
        counts[cur]++;
        shown++;
      }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFCE4A';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    this.cores.forEach((c, k) => {
      const s = counts[k] ? M.fmt.int(counts[k] * 263_158 / 1e6) + 'M' : '';
      if (c.ct.textContent !== s) c.ct.textContent = s;
    });

    /* the latency readout: throughput climbs, latency holds */
    const CH = this.CH;
    M.rise(this.chart, t, T.pull + 0.4);
    [this.rd.root, this.rd2.root, this.rd3.root].forEach((el, i) => M.rise(el, t, T.pull + 0.5 + i * 0.08, { dy: 12 }));
    M.fade(this.cs, t, T.pull + 0.6, 0.6);
    M.fade(this.sim, t, T.pull + 0.9, 0.6);
    const X = (u) => CH.x0 + ((u - CH.ta) / (CH.tb - CH.ta)) * (CH.x1 - CH.x0);
    const Y = (v) => CH.y0 - v * (CH.y0 - CH.y1);
    const thr = (u) => 0.3 + 0.6 * this.load(u) + 0.035 * (M.wander(u, 0.9, 4) - 0.5);
    const lat = (u) => 0.1 + 0.006 * (M.wander(u, 1.1, 8) - 0.5);
    let dT = '', dL = '';
    const tEnd = Math.min(t, CH.tb);
    for (let u = CH.ta; u <= tEnd + 1e-6; u += 0.1) {
      const c = dT ? 'L' : 'M';
      dT += `${c}${X(u).toFixed(1)} ${Y(thr(u)).toFixed(1)}`;
      dL += `${c}${X(u).toFixed(1)} ${Y(lat(u)).toFixed(1)}`;
    }
    const hx = X(tEnd);
    dT += `L${hx.toFixed(1)} ${Y(thr(tEnd)).toFixed(1)}`;
    dL += `L${hx.toFixed(1)} ${Y(lat(tEnd)).toFixed(1)}`;
    this.c.thr.setAttribute('d', dT);
    this.c.lat.setAttribute('d', dL);
    this.c.a.setAttribute('d', `${dT}L${hx.toFixed(1)} ${CH.y0}L${CH.x0} ${CH.y0}Z`);
    this.c.th.setAttribute('cx', hx); this.c.th.setAttribute('cy', Y(thr(tEnd)));
    this.c.lh.setAttribute('cx', hx); this.c.lh.setAttribute('cy', Y(lat(tEnd)));
    this.c.tl.setAttribute('x', hx + 12); this.c.tl.setAttribute('y', Y(thr(tEnd)) + 4);
    this.c.ll.setAttribute('x', hx + 12); this.c.ll.setAttribute('y', Y(lat(tEnd)) + 4);
    /* the flat line glows while the narration says so */
    const fl = M.p(t, T.flat, 0.6, 'inOutCubic');
    this.c.lat.style.filter = fl ? `drop-shadow(0 0 ${(8 * fl).toFixed(1)}px rgba(241,241,241,.9))` : 'none';
    this.c.lat.style.strokeWidth = (2.2 + 1.2 * fl).toFixed(2);
    const tv = thr(t) * 3.1;
    const ts = tv >= 1 ? tv.toFixed(2) + 'M' : Math.round(tv * 1000) + 'k';
    this.rd3.v.innerHTML = `${ts}<small>msgs / s</small>`;

    /* the conventional stack multiplies with load */
    M.rise(this.sk, t, T.pull + 0.6);
    let total = 0;
    this.rows.forEach((row, k) => {
      M.fade(row.el, t, T.pull + 0.7 + k * 0.07, 0.5);
      const f = this.load(t - 0.12 * k) * (row.max - 1) + 1;
      row.boxes.forEach((b, j) => {
        const a = M.ease.outCubic(M.clamp(f - j));
        b.style.opacity = a.toFixed(3);
        b.style.transform = `scale(${(0.5 + 0.5 * a).toFixed(3)})`;
        row.use[j].style.height = (18 + 26 * M.wander(t, 0.5, k * 17 + j)).toFixed(1) + '%';
        if (a > 0.5) total++;
      });
    });
    M.fade(this.tot.root, t, T.pull + 1.0, 0.5);
    M.fade(this.lg, t, T.pull + 1.1, 0.5);
    if (this.tot.v.textContent !== String(total)) this.tot.v.textContent = total;
  },
});
