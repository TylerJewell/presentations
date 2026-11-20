/* Scene 4.1: The gateway, live. The big-screen gateway in the site's palette: callers on the left, flow
   rails through the router to the models on the right, live figures ticking from the first frame. The
   underwriting assistant's path lights and its pill names the model and the cost of a call. */
registerScene({
  id: '4.1',
  act: 4,
  title: "The gateway, live",
  duration: 14,
  headline: "Every model call goes through the gateway.",
  caption: "Every model call goes through Optimize's gateway. Here, the underwriting assistant sends every request to a frontier model.",

  /* callers: name, requests a second, model index */
  CALLERS: [
    ['underwriting-assistant', 38.4, 0],
    ['support-assistant', 22.1, 1],
    ['intake-triage', 14.6, 3],
    ['doc-extractor', 9.8, 1],
    ['adverse-action-notices', 6.2, 2],
    ['fraud-screen', 5.5, 3],
    ['kyc-check', 3.1, 4],
    ['collections-assistant', 1.9, 1],
    ['playground', 0.4, 2],
  ],
  MODELS: [
    ['frontier-large', 'Frontier model', 2.1],
    ['frontier-mini', 'Frontier, small', 0.9],
    ['reasoner-pro', 'Reasoning', 6.4],
    ['support-slm-v1', 'Small model', 0.31],
    ['embed-v3', 'Embeddings', 0.04],
  ],
  G: { cx: 352, cy0: 206, cp: 66, rx0: 600, rx1: 1260, ty: 470, mx: 1478, my0: 210, mp: 130 },
  HI: 2.0,

  render(root) {
    root.classList.add('s41');
    Mock.style('s41', `
      .s41 .hdr { left: 48px; right: 48px; top: 34px; height: 44px; display: flex; align-items: center; gap: 16px; }
      .s41 .hdr .ttl { font: 600 26px/1 var(--sans); letter-spacing: -.01em; color: var(--white); }
      .s41 .hdr .clk { font: 500 15px/1 var(--sans); color: var(--soft-grey); }
      .s41 .hdr .sp { flex: 1; }
      .s41 .mk-chip.demo { font-size: 12px; padding: 6px 9px; }
      .s41 .stat { display: flex; flex-direction: column; gap: 6px; padding: 0 22px; border-left: 1px solid var(--hair); }
      .s41 .stat .k { font: 600 11.5px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s41 .stat .v { font: 600 26px/1 var(--sans); color: var(--white); font-variant-numeric: tabular-nums; }
      .s41 .stat .v.y { color: var(--yellow); }
      .s41 .col { top: 122px; font: 600 14px/1 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: var(--soft-grey); }
      .s41 svg.fl { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .s41 .rib { fill: none; stroke: rgba(241,241,241,.075); stroke-linecap: butt; }
      .s41 .rib.hot { stroke: rgba(255,206,74,.17); }
      .s41 .dash { fill: none; stroke: var(--yellow); stroke-width: 1.6; stroke-dasharray: 3.6 4.4; opacity: .22; }
      .s41 .dash.hot { stroke-width: 2.6; opacity: .95; }
      .s41 .pt { fill: #e9e9ee; }
      .s41 .pt.hot { fill: var(--yellow); }
      .s41 .box { left: 600px; top: 300px; width: 660px; height: 340px; border: 1px solid var(--hair); border-radius: 14px; background: rgba(255,255,255,.018); }
      .s41 .box .bl { position: absolute; left: 20px; top: 18px; font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); }
      .s41 .box .bs { position: absolute; left: 20px; top: 40px; font: 500 15px/1.3 var(--sans); color: var(--medium-grey); }
      .s41 .box .be { position: absolute; left: 20px; bottom: 18px; font: 500 13px/1 var(--sans); color: var(--medium-grey); }
      .s41 .node.cls { left: 650px; top: 428px; width: 150px; height: 84px; padding-top: 16px; }
      .s41 .node { left: 840px; top: 414px; width: 180px; height: 112px; border-radius: 10px; border: 1px solid var(--hair-hi); background: #0c0c0f; text-align: center; padding-top: 14px; }
      .s41 .node b { display: block; font: 600 19px/1 var(--sans); color: var(--white); }
      .s41 .node span { display: block; margin-top: 6px; font: 400 14px/1 var(--sans); color: var(--soft-grey); }
      .s41 .node i { display: block; margin-top: 18px; font: 500 14px/1 var(--sans); font-style: normal; color: var(--white); }
      .s41 .cl { width: 300px; text-align: right; }
      .s41 .cl .n { font: 500 19px/1.1 var(--sans); color: var(--white); white-space: nowrap; }
      .s41 .cl .r { margin-top: 4px; font: 500 14px/1 var(--sans); color: var(--soft-grey); font-variant-numeric: tabular-nums; }
      .s41 .cl.hot .n { color: var(--yellow); }
      .s41 .cm { width: 12px; height: 18px; border-radius: 3px; background: rgba(241,241,241,.35); }
      .s41 .cm.hot { background: var(--yellow); box-shadow: 0 0 14px rgba(255,206,74,.6); }
      .s41 .ml { width: 380px; }
      .s41 .ml .n { font: 600 21px/1.1 var(--sans); color: var(--white); }
      .s41 .ml .n small { font: 600 11px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); margin-left: 10px; }
      .s41 .ml .r { margin-top: 6px; font: 500 14px/1 var(--sans); color: var(--soft-grey); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .s41 .ml.hot .n { color: var(--yellow); }
      .s41 .pill { left: 690px; top: 196px; height: 54px; display: flex; align-items: center; gap: 14px; padding: 0 22px; border-radius: 999px;
        border: 1px solid rgba(255,206,74,.6); background: linear-gradient(160deg, rgba(255,206,74,.16), rgba(255,206,74,.05)), #0b0b0d; box-shadow: var(--yellow-glow);
        font: 600 21px/1 var(--sans); color: var(--white); white-space: nowrap; }
      .s41 .pill i { font-style: normal; color: var(--medium-grey); }
      .s41 .pill b { color: var(--yellow); font-weight: 700; }
      .s41 .lead { left: 930px; top: 250px; width: 2px; height: 164px; background: linear-gradient(180deg, rgba(255,206,74,.8), rgba(255,206,74,.25)); transform-origin: 50% 0; }
      .s41 .lg { right: 48px; top: 1036px; display: flex; gap: 22px; font: 500 13px/1 var(--sans); color: var(--soft-grey); }
      .s41 .lg i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 8px; vertical-align: -1px; }
    `);
    const G = this.G, world = Mock.world(root);
    Mock.dotGrid(world);

    this.hdr = Mock.mount(world, `<div class="hdr">
      <span class="ttl">Gateway · live</span><span class="mk-chip ok">Live</span><span class="clk" data-k="clk"></span>
      <span class="mk-chip demo">Simulated</span><span class="sp"></span>
      <div class="stat"><span class="k">Requests / s</span><span class="v" data-k="rps"></span></div>
      <div class="stat"><span class="k">Cost / min</span><span class="v y" data-k="cpm"></span></div>
      <div class="stat"><span class="k">Requests today</span><span class="v" data-k="tot"></span></div></div>`);
    Mock.mount(world, `<div class="col" style="left:48px">Callers</div>`);
    Mock.mount(world, `<div class="col" style="left:600px">Gateway router</div>`);
    Mock.mount(world, `<div class="col" style="left:1478px">Models</div>`);

    this.box = Mock.mount(world, `<div class="box"><span class="bl">Ruleset</span><span class="bs">underwriting v12 · support v7 · intake v4</span>
      <span class="be">request → classify → route → model, responses back through the same stages</span></div>`).root;

    const cy = (i) => G.cy0 + i * G.cp, my = (j) => G.my0 + j * G.mp;
    const callerSeg = (i) => `M${G.cx} ${cy(i)} C${G.cx + 140} ${cy(i)}, ${G.rx0 - 110} ${G.ty}, ${G.rx0} ${G.ty}`;
    const fanSeg = (j) => `M${G.rx1} ${G.ty} C${G.rx1 + 120} ${G.ty}, ${G.mx - 110} ${my(j)}, ${G.mx} ${my(j)}`;
    const modelRps = this.MODELS.map((_, j) => this.CALLERS.filter((c) => c[2] === j).reduce((a, c) => a + c[1], 0));
    const total = this.CALLERS.reduce((a, c) => a + c[1], 0);
    const wOf = (r) => 3 + r * 0.55;
    let svg = '';
    this.CALLERS.forEach((c, i) => {
      svg += `<path class="rib${i ? '' : ' hi'}" data-c="${i}" d="${callerSeg(i)}" stroke-width="${wOf(c[1])}"/>`;
      svg += `<path class="dash${i ? '' : ' hi'}" data-c="${i}" d="${callerSeg(i)}"/>`;
    });
    svg += `<path class="rib trunk" d="M${G.rx0} ${G.ty} L${G.rx1} ${G.ty}" stroke-width="${wOf(total) * 0.5}"/>`;
    svg += `<path class="dash trunk" d="M${G.rx0} ${G.ty - 12} L${G.rx1} ${G.ty - 12}"/><path class="dash trunk" d="M${G.rx0} ${G.ty + 12} L${G.rx1} ${G.ty + 12}"/>`;
    svg += `<path class="dash hi trunkhi" d="M${G.rx0} ${G.ty} L${G.rx1} ${G.ty}"/>`;
    this.MODELS.forEach((m, j) => {
      svg += `<path class="rib" data-m="${j}" d="${fanSeg(j)}" stroke-width="${wOf(modelRps[j])}"/>`;
      svg += `<path class="dash" data-m="${j}" d="${fanSeg(j)}"/>`;
    });
    /* the composite paths particles ride, one per caller */
    this.CALLERS.forEach((c, i) => {
      const j = c[2];
      svg += `<path class="cp" data-c="${i}" fill="none" stroke="none" d="${callerSeg(i)} L${G.rx1} ${G.ty} C${G.rx1 + 120} ${G.ty}, ${G.mx - 110} ${my(j)}, ${G.mx} ${my(j)}"/>`;
    });
    const fl = (this.fl = Mock.html(`<svg class="fl" viewBox="0 0 1920 1080">${svg}<g class="pts"></g></svg>`));
    world.appendChild(fl);
    this.ribs = [...fl.querySelectorAll('.rib, .dash')];
    this.cps = [...fl.querySelectorAll('.cp')];
    const ptsG = fl.querySelector('.pts');
    this.pts = this.CALLERS.map((c, i) => {
      const n = Math.max(1, Math.round(c[1] / 3.2));
      return Array.from({ length: n }, () => Mock.svg('circle', { r: i ? 2.6 : 3.4, class: 'pt' + (i ? '' : ' hi'), cx: -20, cy: -20 }, ptsG));
    });

    Mock.mount(world, `<div class="node cls"><b>classify</b><span>use case · region</span></div>`);
    this.node = Mock.mount(world, `<div class="node"><b>route</b><span>decides the model</span><i data-k="p95">p95 4.6 ms</i></div>`);

    this.cl = this.CALLERS.map((c, i) => {
      const r = Mock.mount(world, `<div class="cl" style="left:${G.cx - 30 - 300}px;top:${cy(i) - 20}px"><div class="n">${c[0]}</div><div class="r" data-k="r"></div></div>`);
      const m = Mock.html(`<div class="cm" style="left:${G.cx - 12}px;top:${cy(i) - 9}px"></div>`);
      world.appendChild(m);
      return { el: r.root, r: r.r, m };
    });
    this.ml = this.MODELS.map((m, j) => {
      const mk = Mock.html(`<div class="cm" style="left:${G.mx}px;top:${my(j) - 9}px"></div>`);
      world.appendChild(mk);
      const r = Mock.mount(world, `<div class="ml" style="left:${G.mx + 26}px;top:${my(j) - 22}px"><div class="n">${m[0]}<small>${m[1]}</small></div><div class="r" data-k="r"></div></div>`);
      return { el: r.root, r: r.r, mk, rps: modelRps[j] };
    });

    this.lead = Mock.html('<div class="lead"></div>');
    world.appendChild(this.lead);
    this.pill = Mock.mount(world, `<div class="pill">Underwriting assistant <i>·</i> frontier model <i>·</i> <b>$0.031</b> a call</div>`).root;
    Mock.mount(world, `<div class="lg"><span><i style="background:var(--yellow)"></i>Request flow</span><span><i style="background:rgba(241,241,241,.35)"></i>Caller · model</span><span><i style="background:#e9e9ee;border-radius:50%"></i>One request</span></div>`);
  },

  at(t) {
    const M = Mock, abs = M.abs(t);
    if (!this.lens) this.lens = this.cps.map((p) => p.getTotalLength());

    /* the underwriting path lights; everything else steps back */
    const hi = M.p(t, this.HI, 0.9, 'inOutCubic');
    this.ribs.forEach((el) => {
      const own = el.classList.contains('hi');
      el.classList.toggle('hot', own && hi > 0.5);
      el.style.opacity = own ? '' : (1 - 0.45 * hi).toFixed(3);
      if (el.classList.contains('dash')) M.march(el, abs, el.classList.contains('hi') ? 30 : 18);
    });
    this.fl.querySelector('.trunkhi').style.opacity = (0.15 + 0.85 * hi).toFixed(3);
    this.fl.querySelectorAll('.rib[data-m="0"], .dash[data-m="0"]').forEach((el) => {
      el.classList.toggle('hot', hi > 0.5);
      el.style.opacity = '';
    });

    /* particles, mid-flight from the first frame */
    this.pts.forEach((arr, i) => {
      const L = this.lens[i], p = this.cps[i], speed = 300 + 40 * M.noise(i + 3);
      arr.forEach((c, k) => {
        const u = (((abs * speed) / L + k / arr.length + M.noise(i * 7 + 1)) % 1 + 1) % 1;
        const pt = p.getPointAtLength(u * L);
        c.setAttribute('cx', pt.x.toFixed(1));
        c.setAttribute('cy', pt.y.toFixed(1));
        c.classList.toggle('hot', i === 0 && hi > 0.5);
        c.style.opacity = i === 0 ? 1 : (0.75 * (1 - 0.5 * hi)).toFixed(3);
      });
    });

    /* live figures */
    let total = 0, cost = 0;
    const live = this.CALLERS.map((c, i) => {
      const r = c[1] * (0.93 + 0.14 * M.wander(t, 0.45, i + 1));
      total += r;
      cost += r * (i === 0 ? 0.031 : [0.031, 0.006, 0.0042, 0.006, 0.048, 0.0042, 0.0003, 0.006, 0.048][i]);
      return r;
    });
    this.cl.forEach((c, i) => {
      const s = live[i].toFixed(i === 8 ? 2 : 1) + '/s';
      if (c.r.textContent !== s) c.r.textContent = s;
      const own = i === 0;
      c.el.classList.toggle('hot', own && hi > 0.5);
      c.m.classList.toggle('hot', own && hi > 0.5);
      c.el.style.opacity = own ? 1 : (1 - 0.4 * hi).toFixed(3);
    });
    this.ml.forEach((m, j) => {
      const r = this.CALLERS.reduce((a, c, i) => a + (c[2] === j ? live[i] : 0), 0);
      const tok = Math.round(r * [1840, 610, 2900, 420, 90][j]);
      const s = `${r.toFixed(1)}/s · ${M.fmt.int(tok)} tok/s · p95 ${this.MODELS[j][2] >= 1 ? this.MODELS[j][2].toFixed(1) + ' s' : Math.round(this.MODELS[j][2] * 1000) + ' ms'}`;
      if (m.r.textContent !== s) m.r.textContent = s;
      m.el.classList.toggle('hot', j === 0 && hi > 0.5);
      m.mk.classList.toggle('hot', j === 0 && hi > 0.5);
      m.el.style.opacity = j === 0 ? 1 : (1 - 0.4 * hi).toFixed(3);
    });
    const h = this.hdr;
    h.rps.textContent = total.toFixed(1);
    h.cpm.textContent = '$' + (cost * 60).toFixed(2);
    h.tot.textContent = M.fmt.int(M.ticker(t, 2_918_000, total));
    const sec = Math.floor(13 * 3600 + 31 * 60 + abs);
    h.clk.textContent = `${String(Math.floor(sec / 3600) % 24).padStart(2, '0')}:${String(Math.floor(sec / 60) % 60).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
    this.node.p95.textContent = `p95 ${(4.4 + 0.5 * M.wander(t, 0.6, 9)).toFixed(1)} ms`;

    /* the pill and its leader to the trunk */
    M.rise(this.pill, t, this.HI + 0.5, { dy: 16 });
    this.lead.style.opacity = M.p(t, this.HI + 0.7, 0.6).toFixed(3);
    this.lead.style.transform = `scaleY(${M.p(t, this.HI + 0.7, 0.8, 'outCubic').toFixed(3)})`;

  },
});
