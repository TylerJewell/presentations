/* Scene 1.2: One binary. The binary fans out into three replicas (Start), two more join under load and
   take sessions (Scale), one fails and its sessions resume on the others (Recover), and a replacement
   joins. Every session square is tracked, so none is ever lost. */
registerScene({
  id: '1.2',
  act: 1,
  title: 'One binary',
  duration: 18,
  caption: 'The whole system ships as one binary. It scales out under load and recovers on its own when a node fails, with no state lost.',

  PHASE: { start: 1.6, scale: 4.6, recover: 8.0, heal: 12.2 },
  SLOT_Y: [196, 304, 412, 520, 628],
  RX: 880, RW: 520, RH: 92,

  render(root) {
    root.classList.add('s12');
    Mock.style('s12', `
      .s12 .h { left: var(--gutter); top: 84px; font-size: 56px; }
      .s12 .steps { right: 160px; top: 100px; display: flex; gap: 14px; align-items: center; font: 600 15px/1 var(--sans); letter-spacing: .18em; }
      .s12 .steps span { --a: 0; color: color-mix(in srgb, var(--yellow) calc(var(--a) * 100%), #5a5a5a); }
      .s12 .steps i { width: 6px; height: 6px; border-radius: 50%; background: #333; }
      .s12 .cap { left: 160px; top: 226px; font: 600 14px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s12 .bin { left: 160px; top: 254px; width: 380px; border: 1.5px solid var(--yellow); border-radius: 14px; background: var(--medium-black);
        padding: 14px; display: flex; flex-direction: column; gap: 10px; box-shadow: var(--yellow-glow); }
      .s12 .bin div { border: 1px solid var(--medium-grey); border-radius: 9px; padding: 14px 18px; font-size: 21px; color: var(--white); }
      .s12 .bin div.rt { border-color: var(--yellow); color: var(--yellow); font: 600 14px/1.4 var(--sans); text-transform: uppercase; letter-spacing: .14em; }
      .s12 svg.fan { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s12 .fan path { fill: none; stroke: var(--yellow); stroke-width: 1.8; }
      .s12 .fan path.dead { stroke: var(--red); stroke-dasharray: 3 7; }
      .s12 .rep { width: 520px; height: 92px; border: 1.5px solid var(--medium-grey); border-radius: 10px; background: var(--medium-black);
        padding: 0 22px; display: flex; align-items: center; gap: 12px; font: 600 16px/1 var(--sans); color: var(--white); }
      .s12 .rep .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px rgba(114,211,91,.7); }
      .s12 .rep.new { border-color: var(--yellow); }
      .s12 .rep.dead { border-color: var(--red); }
      .s12 .rep.dead .dot { background: var(--red); box-shadow: 0 0 10px rgba(255,84,0,.7); }
      .s12 .rep .st { margin-left: auto; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .s12 .rep.dead .st { color: var(--red); }
      .s12 .x { width: 520px; height: 92px; pointer-events: none; overflow: visible; }
      .s12 .x path { stroke: var(--red); stroke-width: 4; stroke-linecap: round; fill: none; }
      .s12 .ss { width: 22px; height: 22px; margin: -11px 0 0 -11px; border-radius: 4px; left: 0; top: 0; }
      .s12 .ctr { left: 1500px; width: 300px; }
      .s12 .ctr .k { font: 600 14px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 12px; }
      .s12 .ctr .v { font: 700 64px/1 var(--sans); letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
      .s12 .ctr .v.g { color: var(--green); }
      .s12 .sim { left: 1500px; top: 664px; }
    `);
    Mock.dotGrid(root);
    const P = this.PHASE;
    this.r = Mock.mount(root, `<h2 class="mk-h2 h">An entire AI system ships as <span class="accent">one binary.</span></h2>`);
    this.steps = Mock.mount(root, `<div class="steps"><span data-k="s0">Start</span><i></i><span data-k="s1">Scale</span><i></i><span data-k="s2">Recover</span></div>`);
    this.cap = Mock.mount(root, `<div class="cap">One binary</div>`).root;
    this.bin = Mock.mount(root, `<div class="bin">
      <div data-k="b0">Agents and workflows</div><div data-k="b1">Controls</div><div data-k="b2">Model routing</div>
      <div data-k="b3">Endpoints</div><div class="rt" data-k="b4">Akka runtime</div></div>`);

    const fx = 540, fy = 254 + 214;
    const fan = Mock.html(`<svg class="fan" viewBox="0 0 1920 1080">${this.SLOT_Y.map((y) => {
      const ty = y + this.RH / 2, mx = (fx + this.RX) / 2;
      return `<path d="M${fx} ${fy} C${mx} ${fy} ${mx} ${ty} ${this.RX} ${ty}"/>`;
    }).join('')}</svg>`);
    root.appendChild(fan);
    this.fan = [...fan.querySelectorAll('path')];

    /* replicas: slots 1-3 at Start, 0 and 4 at Scale, slot 2 fails at Recover and is replaced */
    this.reps = this.SLOT_Y.map((y, i) => {
      const n = [4, 1, 2, 3, 5][i];
      const el = Mock.html(`<div class="rep" style="left:${this.RX}px;top:${y}px"><span class="dot"></span><span class="nm">replica-${n}</span><span class="st">running</span></div>`);
      root.appendChild(el);
      return el;
    });
    this.repl = Mock.html(`<div class="rep new" style="left:${this.RX}px;top:${this.SLOT_Y[2]}px"><span class="dot"></span><span>replica-6</span><span class="st">joined</span></div>`);
    root.appendChild(this.repl);
    this.x = Mock.html(`<svg class="x" style="left:${this.RX}px;top:${this.SLOT_Y[2]}px" viewBox="0 0 520 92"><path d="M238 24l44 44"/><path d="M282 24l-44 44"/></svg>`);
    root.appendChild(this.x);
    this.xp = [...this.x.querySelectorAll('path')];

    /* 18 sessions; each phase's owner per session, and the order they move in */
    const A = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
    const B = A.slice(); [[4, 0], [5, 0], [11, 0], [16, 4], [17, 4], [10, 4]].forEach(([s, r]) => (B[s] = r));
    const C = B.slice(); [[6, 0], [7, 1], [8, 3], [9, 4]].forEach(([s, r]) => (C[s] = r));
    const D = C.slice(); [[7, 2], [8, 2], [9, 2]].forEach(([s, r]) => (D[s] = r));
    const slotsOf = (own) => { const k = [0, 0, 0, 0, 0]; return own.map((r) => k[r]++); };
    this.states = [
      { at: 0, own: A, idx: slotsOf(A) },
      { at: P.scale + 1.0, own: B, idx: slotsOf(B) },
      { at: P.recover + 1.0, own: C, idx: slotsOf(C) },
      { at: P.heal + 1.0, own: D, idx: slotsOf(D) },
    ];
    this.ss = A.map(() => { const d = Mock.html('<div class="ss"></div>'); root.appendChild(d); return d; });

    this.ctr = Mock.mount(root, `<div class="ctr" style="top:254px">
      <div class="k">Availability</div><div class="v" data-k="av">99.0000%</div>
      <div class="k" style="margin-top:56px">Replicas</div><div class="v" data-k="rc">0</div>
      <div class="k" style="margin-top:56px">Sessions lost</div><div class="v g" data-k="lost">0</div></div>`);
    this.sim = Mock.mount(root, `<span class="sim mk-chip demo">Simulated load</span>`).root;
  },

  pos(r, k) { return [this.RX + 200 + k * 34, this.SLOT_Y[r] + this.RH / 2]; },

  at(t) {
    const M = Mock, P = this.PHASE;
    M.rise(this.r.root, t, 0.1);
    M.rise(this.steps.root, t, 0.3, { dy: 10 });
    ['s0', 's1', 's2'].forEach((k, i) => {
      const a = [P.start, P.scale, P.recover][i], b = [P.scale, P.recover, 99][i];
      this.steps[k].style.setProperty('--a', Math.max(M.ramp(t, a, b + 0.2, 0.3, 0.3), i === 2 ? M.prog(t, a, 0.3) : 0).toFixed(3));
    });
    M.fade(this.cap, t, 0.3, 0.5);
    M.rise(this.bin.root, t, 0.3);
    for (let i = 0; i < 5; i++) M.rise(this.bin['b' + i], t, 0.5 + i * 0.08, { dy: 12 });

    /* replicas appear at the end of their fan line */
    const appear = [P.scale + 0.2, P.start, P.start + 0.15, P.start + 0.3, P.scale + 0.35];
    this.fan.forEach((f, i) => {
      M.draw(f, t, appear[i], 0.6, 'inOutCubic');
      if (M.prog(t, appear[i], 0.6) >= 1) M.march(f, t - appear[i], 14), (f.style.strokeDasharray = i === 2 && t >= P.recover + 0.4 && t < P.heal + 0.4 ? '3 7' : '6 6');
      f.classList.toggle('dead', i === 2 && t >= P.recover + 0.4 && t < P.heal + 0.4);
    });
    const dead = t >= P.recover + 0.4;
    this.reps.forEach((el, i) => {
      M.rise(el, t, appear[i] + 0.4, { dy: 0 });
      el.style.transform = `scale(${(0.94 + 0.06 * M.p(t, appear[i] + 0.4, 0.6)).toFixed(4)})`;
      el.classList.toggle('new', (i === 0 || i === 4) && t < P.scale + 3.4);
      if (i === 2) {
        el.classList.toggle('dead', dead);
        el.querySelector('.st').textContent = dead ? 'node lost' : 'running';
        if (t >= P.heal) el.style.opacity = 1 - M.prog(t, P.heal, 0.5);
      }
    });
    this.xp.forEach((p, k) => M.draw(p, t, P.recover + 0.4 + k * 0.15, 0.3));
    this.x.style.opacity = 1 - M.prog(t, P.heal, 0.5);
    M.fade(this.repl, t, P.heal + 0.2, 0.6);
    this.repl.classList.toggle('new', t < P.heal + 3);

    /* sessions: pop in at Start, then glide between owners at each phase */
    this.ss.forEach((el, s) => {
      let cur = this.states[0], prev = null;
      for (const st of this.states) if (t >= st.at) { prev = cur === st ? null : cur; cur = st; }
      const k = this.states.indexOf(cur);
      const before = k > 0 ? this.states[k - 1] : null;
      const moved = before && before.own[s] !== cur.own[s];
      const order = moved ? this.states[k].own.reduce((n, _, j) => n + (j < s && before.own[j] !== cur.own[j] ? 1 : 0), 0) : 0;
      let [x, y] = this.pos(cur.own[s], cur.idx[s]);
      if (before) {
        const [x0, y0] = this.pos(before.own[s], before.idx[s]);
        const p = M.ease.inOutCubic(M.prog(t, cur.at + order * 0.16, 0.8));
        x = M.lerp(x0, x, p); y = M.lerp(y0, y, p) - (moved ? Math.sin(p * Math.PI) * 26 : 0);
      }
      const everMoved = this.states.slice(1).some((st) => t >= st.at && this.states[this.states.indexOf(st) - 1].own[s] !== st.own[s]);
      const pop = M.ease.reveal(M.prog(t, P.start + 0.9 + s * 0.035, 0.45));
      M.set(el, {
        transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${pop.toFixed(3)})`,
        opacity: pop > 0 ? 1 : 0,
        background: everMoved || moved ? 'var(--yellow)' : 'var(--soft-grey)',
        boxShadow: moved && M.prog(t, cur.at + order * 0.16, 0.8) < 1 ? '0 0 14px rgba(255,206,74,.8)' : 'none',
      });
    });

    /* counters */
    M.rise(this.ctr.root, t, 1.4);
    M.countUp(this.ctr.av, t, P.start + 0.6, 2.6, 99, 99.9999, (v) => v.toFixed(4) + '%');
    const reps = t < P.start + 0.4 ? 0 : t < P.scale + 0.6 ? 3 : t < P.recover + 0.4 ? 5 : t < P.heal + 0.2 ? 4 : 5;
    this.ctr.rc.textContent = reps;
    this.ctr.lost.style.textShadow = `0 0 ${(24 * M.ramp(t, P.recover + 1.6, P.recover + 3.4, 0.3, 0.8)).toFixed(1)}px rgba(114,211,91,.9)`;
    M.fade(this.sim, t, 2.0, 0.6);
  },
});
