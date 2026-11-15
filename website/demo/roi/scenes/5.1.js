/* Scene 5.1: how well the code uses the hardware. A note on interpreted languages stands beside the grid while
   the first sentence is read; then the runtime mechanism in three movements. A grid of sessions, each an actor
   with its own state and drawn to stand for millions on one node, waits while four cores of sixteen are busy; the actors regroup into four nodes
   joined by rails, each node owning a range of keys; one node leaves and its actors settle on the other three. */
Roi.register({
  id: '5.1',

  N: 64, GRID: { x: 160, y: 290, pitch: 56, size: 40 },
  NODES: [[600, 280], [1020, 280], [600, 560], [1020, 560]],   /* 300 x 240 boxes, the ring centred on the stage */
  CELL: { dx: 30, dy: 56, pitch: 40, size: 28, cols: 6 },
  KEYS: ['00–3f', '40–7f', '80–bf', 'c0–ff'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { akka: at('Akka'), actor: at('actor,'), kinds: at('sessions,'), cluster: at('clustering'), key: at('spreads'), moving: at('rebalances'), leaves: at('leaves.') };
  },

  render(root) {
    root.classList.add('r51');
    Mock.style('r51', `
      .r51 .ro-head { width: 1200px; }
      .r51 .cube { left: 0; top: 0; width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 7px; border: 1px solid rgba(241,241,241,.22); background: var(--medium-black);
        display: flex; flex-direction: column; justify-content: center; gap: 4px; padding: 0 10px; }
      .r51 .cube i { display: block; height: 3px; border-radius: 2px; background: rgba(241,241,241,.35); }
      .r51 .cube i + i { width: 70%; }
      .r51 .cmp { left: 760px; top: 290px; width: 700px; }
      .r51 .cmp .k { font: 600 14px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 10px; }
      .r51 .meter { left: 760px; top: 350px; width: 640px; }
      .r51 .meter .n { font: 700 72px/1 var(--sans); letter-spacing: -.04em; color: var(--white); font-variant-numeric: tabular-nums; }
      .r51 .meter .l { margin-top: 10px; font: 500 24px/1.3 var(--sans); color: var(--soft-grey); }
      .r51 .cores { display: grid; grid-template-columns: repeat(8, 36px); gap: 10px; margin-top: 22px; }
      .r51 .cores i { --g: 0; width: 36px; height: 36px; border-radius: 6px; border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 80%), rgba(241,241,241,.22));
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 85%), var(--medium-black)); box-shadow: 0 0 calc(var(--g) * 18px) rgba(255,206,74,.7); }
      .r51 .kinds { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 30px; width: 640px; }
      .r51 .kinds span { --g: 0; padding: 7px 12px; border-radius: 8px; font: 600 16px/1 var(--sans);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.18)); background: var(--medium-black); }
      .r51 .req { left: 0; top: 0; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: var(--yellow); box-shadow: 0 0 16px rgba(255,206,74,.9); }
      .r51 .node { width: 300px; height: 240px; border-radius: 14px; border: 1px solid rgba(241,241,241,.2); background: rgba(255,255,255,.02); }
      .r51 .node.dead { border-color: var(--red); }
      .r51 .node .nm { position: absolute; left: 22px; top: 18px; font: 600 16px/1 var(--mono); color: var(--white); }
      .r51 .node .ky { position: absolute; right: 22px; top: 16px; font: 600 15px/1 var(--mono); color: var(--yellow); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(255,206,74,.45); opacity: 0; }
      .r51 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r51 .w path.rl { fill: none; stroke: rgba(255,206,74,.6); stroke-width: 2; stroke-dasharray: 4 5; }
      .r51 .w path.x { fill: none; stroke: var(--red); stroke-width: 5; stroke-linecap: round; }
      .r51 .lost { top: 690px; width: 240px; text-align: center; font: 600 24px/1.3 var(--sans); color: var(--white); }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Infrastructure', headline: 'The runtime keeps each session as a small actor.', lit: 0 });
    this.cmp = M.mount(root, `<div class="cmp"><div class="k">Interpreted languages, such as Python</div>
      <div class="ro-note">Every waiting session holds a thread and its own memory, so a node fills at a small number of sessions.</div></div>`).root;
    this.meter = M.mount(root, `<div class="meter"><div class="n" data-k="n">Millions</div><div class="l">of concurrent executions on one Akka node, each an actor with its own state, sharing the same compute.</div>
      <div class="l" style="margin-top:34px">4 of 16 cores busy</div><div class="cores">${Array.from({ length: 16 }, () => '<i></i>').join('')}</div>
      <div class="l" data-k="kl" style="margin-top:30px">All of these run as actors.</div>
      <div class="kinds" data-k="kinds" style="margin-top:12px">${['Sessions', 'Agents', 'Evaluations', 'Guardrails', 'Workflows', 'Endpoints', 'Data queries', 'Timers'].map((k) => `<span>${k}</span>`).join('')}</div></div>`);
    this.cores = [...this.meter.root.querySelectorAll('.cores i')];
    this.kinds = [...this.meter.kinds.children];
    this.req = M.html('<div class="req"></div>');
    root.appendChild(this.req);
    this.nodes = this.NODES.map(([x, y], i) => M.mount(root, `<div class="node" style="left:${x}px;top:${y}px"><span class="nm">node-${i + 1}</span><span class="ky" data-k="ky">keys ${this.KEYS[i]}</span></div>`));
    const N = this.NODES, c = (i) => [N[i][0] + 150, N[i][1] + 120];
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">
      <path class="rl" d="M${N[0][0] + 300} ${c(0)[1]} H${N[1][0]}"/>
      <path class="rl" d="M${c(1)[0]} ${N[1][1] + 240} V${N[3][1]}"/>
      <path class="rl" d="M${N[3][0]} ${c(3)[1]} H${N[2][0] + 300}"/>
      <path class="rl" d="M${c(2)[0]} ${N[2][1]} V${N[0][1] + 240}"/>
      <path class="x" d="M${c(2)[0] - 34} ${c(2)[1] - 34} l68 68"/><path class="x" d="M${c(2)[0] + 34} ${c(2)[1] - 34} l-68 68"/>
    </svg>`);
    root.appendChild(this.svg);
    this.rails = [...this.svg.querySelectorAll('.rl')];
    this.xs = [...this.svg.querySelectorAll('.x')];
    this.cubes = Array.from({ length: this.N }, () => { const d = M.html('<div class="cube"><i></i><i></i></div>'); root.appendChild(d); return d; });
    this.lost = M.mount(root, `<div class="lost" style="left:${N[2][0] + 30}px">No state is lost.</div>`).root;
  },

  /* a cube's centre in the grid, in a node cell, and after node 3 leaves */
  gridPos(i) { const G = this.GRID; return [G.x + (i % 8) * G.pitch + G.size / 2, G.y + Math.floor(i / 8) * G.pitch + G.size / 2]; },
  cellPos(node, cell) {
    const [x, y] = this.NODES[node], C = this.CELL;
    return [x + C.dx + (cell % C.cols) * C.pitch + C.size / 2, y + C.dy + Math.floor(cell / C.cols) * C.pitch + C.size / 2];
  },
  home(i) { return this.cellPos(Math.floor(i / 16), i % 16); },
  after(i) {
    if (Math.floor(i / 16) !== 2) return this.home(i);
    const j = i - 32;
    return j < 5 ? this.cellPos(0, 16 + j) : j < 10 ? this.cellPos(1, 16 + j - 5) : this.cellPos(3, 16 + j - 10);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    const P1 = K.cluster - 0.2, P2 = K.key - 0.2, P3 = K.moving + 0.2;
    /* movement 1: the note on interpreted languages, then the grid and the meter */
    M.rise(this.cmp, t, 0.6);
    this.cmp.style.opacity = (parseFloat(this.cmp.style.opacity) * (1 - M.prog(t, K.akka - 0.2, 0.5))).toFixed(3);
    const meterOn = M.prog(t, K.akka, 0.6) * (1 - M.prog(t, P1, 0.5));
    this.meter.root.style.opacity = meterOn.toFixed(3);
    this.meter.root.style.transform = `translateY(${((1 - M.p(t, K.akka, 0.8)) * 18).toFixed(1)}px)`;
    this.cores.forEach((c, i) => Roi.glow(c, [1, 6, 9, 14].includes(i) ? 0.4 + 0.6 * M.wave(t, 1.6, i * 0.25) : 0));
    /* the kinds of actor appear as they are listed */
    M.rise(this.meter.kl, t, K.kinds - 0.3, { dy: 8 });
    this.kinds.forEach((k, i) => { M.rise(k, t, K.kinds - 0.2 + i * 0.22, { dy: 8 }); Roi.glow(k, M.ramp(t, K.kinds + i * 0.22, K.kinds + i * 0.22 + 1.2, 0.2, 0.5)); });
    /* a request arrives and lands in an idle session; the busy count stays at four */
    const rq = M.prog(t, K.actor + 0.6, 1.1), [lx, ly] = this.gridPos(27);
    M.set(this.req, { opacity: (M.prog(t, K.actor + 0.5, 0.2) * (1 - M.prog(t, K.actor + 1.6, 0.3))).toFixed(3), transform: `translate(${M.lerp(700, lx, M.ease.inOutCubic(rq)).toFixed(1)}px, ${M.lerp(240, ly, M.ease.inOutCubic(rq)).toFixed(1)}px)` });
    /* movements 2 and 3: the nodes, their rails and key ranges, and the node that leaves */
    const dead = t >= P3 + 0.3;
    this.nodes.forEach((n, i) => {
      M.rise(n.root, t, P1 + i * 0.1, { dy: 12 });
      n.root.classList.toggle('dead', i === 2 && dead);
      if (i === 2 && t >= P3 + 1.4) n.root.style.opacity = (1 - 0.6 * M.prog(t, P3 + 1.4, 0.8)).toFixed(3);
      n.ky.style.opacity = (M.prog(t, P2 + i * 0.12, 0.4) * (i === 2 && dead ? 1 - M.prog(t, P3 + 0.3, 0.4) : 1)).toFixed(3);
    });
    this.rails.forEach((p, i) => {
      /* drawn as one stroke, then dashed and marching once it is complete */
      M.draw(p, t, P1 + 0.6 + i * 0.12, 0.5);
      if (M.prog(t, P1 + 0.6 + i * 0.12, 0.5) >= 1) { p.style.strokeDasharray = '4 5'; M.march(p, t, 14); }
      const touchesDead = i === 2 || i === 3;
      p.style.opacity = (M.prog(t, P1 + 0.6 + i * 0.12, 0.05) * (touchesDead && dead ? 1 - 0.75 * M.prog(t, P3 + 0.3, 0.5) : 1)).toFixed(3);
    });
    this.xs.forEach((p, k) => { M.draw(p, t, P3 + 0.3 + k * 0.15, 0.3); p.style.opacity = (M.prog(t, P3 + 0.3, 0.05) * (1 - M.prog(t, P3 + 1.4, 0.8))).toFixed(3); });
    M.rise(this.lost, t, P3 + 1.9, { dy: 8 });
    /* every cube: where it is now, with a wave through the keys as sharding is named */
    const regroup = M.ease.inOutCubic(M.prog(t, P1 + 0.1, 1.4));
    this.cubes.forEach((el, i) => {
      const [gx, gy] = this.gridPos(i), [hx, hy] = this.home(i), [ax, ay] = this.after(i);
      let x = M.lerp(gx, hx, regroup), y = M.lerp(gy, hy, regroup), s = M.lerp(1, 0.7, regroup);
      const leaves = Math.floor(i / 16) === 2, order = leaves ? (i - 32) * 0.07 : 0;
      if (leaves) {
        const p = M.ease.inOutCubic(M.prog(t, P3 + 0.8 + order, 0.9));
        x = M.lerp(x, ax, p); y = M.lerp(y, ay, p) - Math.sin(p * Math.PI) * 40;
      }
      const pop = M.ease.reveal(M.prog(t, 0.5 + i * 0.02, 0.4));
      const wait = 0.35 + 0.25 * M.wave(t, 2.2, i * 0.13);
      const busy = Math.floor(t * 1.5 + i * 0.37) % 16 === 0 && t < P1 ? 1 : 0;
      const keyed = M.ramp(t, P2 + (i / 64) * 1.2, P2 + (i / 64) * 1.2 + 0.9, 0.2, 0.5);
      const moved = leaves && t >= P3 + 0.8 + order ? M.ramp(t, P3 + 0.8 + order, P3 + 2.6 + order, 0.2, 0.8) : 0;
      const hot = Math.max(busy, keyed, moved);
      M.set(el, {
        transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(s * pop).toFixed(3)})`,
        opacity: pop > 0 ? (0.5 + 0.5 * Math.max(wait, hot)).toFixed(3) : 0,
        borderColor: hot ? `rgba(255,206,74,${(0.3 + 0.7 * hot).toFixed(2)})` : '',
        boxShadow: hot ? `0 0 ${(16 * hot).toFixed(1)}px rgba(255,206,74,.7)` : 'none',
      });
    });
  },
});
