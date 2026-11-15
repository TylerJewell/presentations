/* Scene 5.4: a judgment after the fact. A time axis with two lanes. The workflow lane finishes and the
   report is delivered at once; the evaluator lane starts later, reads the finished review, runs its checks
   and stamps a PASS verdict into the ledger. A moving now-line carries both lanes along the axis. */
Film.register({
  id: '5.4',

  X0: 420, X1: 1760,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const K = { reviews: at('reviews'), beside: at('beside'), delayed: at('delayed'), applies: at('applies'), verdict: at('verdict'), guard: at('guardrail') };
    /* the now-line: waypoints of (fraction along the axis, time), in time order */
    const done = Math.max(K.reviews + 0.6, 3.4), start = Math.max(K.beside, done + 1.0), read = start + 2.0;
    const checks = Math.max(K.applies + 1.4, read + 1.0), stamp = Math.max(K.verdict, checks + 0.5);
    K.W = [[0, 0.8], [0.42, done], [0.48, start], [0.64, read], [0.84, checks], [0.9, stamp], [1, stamp + 1.6]];
    K.done = done; K.start = start; K.stamp = stamp;
    this.K = K;
  },

  render(root) {
    root.classList.add('s54');
    Mock.style('s54', `
      .s54 .head { left: var(--gutter); top: 64px; width: 1700px; }
      .s54 .head .fp-h { font-size: 58px; }
      .s54 .lane { position: absolute; left: 160px; width: 240px; display: flex; flex-direction: column; gap: 8px; --g: 0; }
      .s54 .lane .k { font: 600 18px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .s54 .lane .n { font: 700 28px/1.1 var(--sans); letter-spacing: -.02em; color: var(--white); text-wrap: balance; }
      .s54 .bar { position: absolute; height: 80px; border-radius: 10px; border: 1px solid rgba(241,241,241,.22); background: rgba(255,255,255,.04);
        display: flex; align-items: center; padding: 0 22px; font: 500 22px/1.2 var(--sans); color: var(--white); white-space: nowrap; overflow: hidden; --g: 0;
        border-color: color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.22)); box-shadow: 0 0 calc(var(--g) * 40px) calc(var(--g) * -10px) rgba(255,206,74,.6); }
      .s54 .bar span { opacity: 0; }
      .s54 .svg { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s54 .axis { stroke: rgba(241,241,241,.3); stroke-width: 2; }
      .s54 .tick { stroke: rgba(241,241,241,.3); stroke-width: 2; }
      .s54 .now { stroke: var(--yellow); stroke-width: 2; filter: drop-shadow(0 0 6px rgba(255,206,74,.7)); }
      .s54 .mark { stroke: rgba(241,241,241,.4); stroke-width: 2; stroke-dasharray: 4 6; }
      .s54 .tl { font: 500 20px var(--sans); fill: var(--soft-grey); }
      .s54 .dlv { position: absolute; width: 360px; margin-left: -180px; text-align: center; font: 600 24px/1.2 var(--sans); color: var(--white); }
      .s54 .note { position: absolute; left: 1063px; width: 700px; font: 500 24px/1.3 var(--sans); color: var(--soft-grey); }
      .s54 .ledger { left: 1570px; width: 190px; height: 170px; padding: 22px 24px; align-items: flex-start; }
      .s54 .ledger .st { margin-top: auto; transform-origin: left center; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">An evaluator reviews finished work and records a verdict.</h2></div>`);
    const { X0, X1 } = this, W = X1 - X0, fx = (f) => X0 + f * W;
    this.fx = fx;
    const Y1 = 280, Y2 = 480, AX = 700;
    this.lane1 = Mock.mount(root, `<div class="lane" style="top:${Y1 + 6}px"><div class="k">Workflow</div><div class="n">Review workflow</div></div>`).root;
    this.lane2 = Mock.mount(root, `<div class="lane" style="top:${Y2 + 6}px"><div class="k">Detective</div><div class="n">Review quality evaluator</div></div>`).root;
    const bar = (f0, f1, y, text) => {
      const w = fx(f1) - fx(f0) - 6;
      const el = Mock.html(`<div class="bar" style="left:${fx(f0)}px;top:${y}px;width:${w}px"><span>${text}</span></div>`);
      root.appendChild(el);
      return { el, f0, f1, span: el.firstElementChild, w };
    };
    this.bars = [
      bar(0, 0.42, Y1, 'Four readers and the synthesis write the report.'),
      bar(0.48, 0.64, Y2, 'reads the review'),
      bar(0.64, 0.84, Y2, 'runs its checks'),
    ];
    const svg = Mock.html('<svg class="svg" viewBox="0 0 1920 1080"></svg>');
    root.appendChild(svg);
    this.axis = Mock.svg('line', { class: 'axis', x1: X0, x2: X1, y1: AX, y2: AX }, svg);
    this.ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Mock.svg('line', { class: 'tick', x1: fx(f), x2: fx(f), y1: AX, y2: AX + 12 }, svg));
    const tl = Mock.svg('text', { class: 'tl', x: X1, y: AX + 40, 'text-anchor': 'end' }, svg);
    tl.textContent = 'Time';
    this.ticks.push(tl);
    this.mark = Mock.svg('line', { class: 'mark', x1: fx(0.42) - 3, x2: fx(0.42) - 3, y1: Y1 + 92, y2: AX - 6 }, svg);
    this.now = Mock.svg('line', { class: 'now', x1: X0, x2: X0, y1: Y1 - 40, y2: AX }, svg);
    this.dlv = Mock.mount(root, `<div class="dlv" style="left:${fx(0.42) - 3}px;top:${Y1 - 46}px">The report is delivered at once.</div>`).root;
    this.note = Mock.mount(root, `<div class="note" style="top:${Y2 + 142}px">Runs beside the workflow; the report is not delayed.</div>`).root;
    this.ledger = Mock.mount(root, `<div class="fp-card ledger" style="top:${Y2 - 45}px"><div class="eb">Ledger</div><div class="st" data-k="st">${Film.chip('Passed', { big: true })}</div></div>`);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.h, t, 0.1);
    M.draw(this.axis, t, 0.3, 1.2, 'inOutCubic');
    this.ticks.forEach((k, i) => (k.style.opacity = M.prog(t, 0.6 + i * 0.1, 0.3).toFixed(3)));
    M.rise(this.lane1, t, 0.5, { dy: 10 });
    M.rise(this.lane2, t, Math.max(1.4, K.start - 1.0), { dy: 10 });
    this.lane1.style.setProperty('--g', M.ramp(t, K.reviews - 0.3, K.done + 0.8, 0.3, 0.5).toFixed(3));
    this.lane2.style.setProperty('--g', Math.max(M.ramp(t, K.beside - 0.3, K.applies + 2.4, 0.3, 0.6), 0.5 * M.p(t, K.guard, 0.6)).toFixed(3));

    /* the now-line along its waypoints */
    const W = K.W;
    let f = 0;
    if (t >= W[0][1]) {
      f = W[W.length - 1][0];
      for (let i = 1; i < W.length; i++) {
        const [a, ta] = W[i - 1], [b, tb] = W[i];
        if (t < tb) { f = t >= ta ? M.lerp(a, b, M.prog(t, ta, tb - ta)) : a; break; }
      }
    }
    const nx = this.fx(f).toFixed(1);
    this.now.setAttribute('x1', nx); this.now.setAttribute('x2', nx);
    this.now.style.opacity = (M.prog(t, 0.8, 0.4) * (1 - M.prog(f, 0.845, 0.02))).toFixed(3);

    /* each bar grows under the now-line; its text shows once there is room, and it glows while it is the one running */
    this.bars.forEach((b) => {
      const p = M.clamp((f - b.f0) / (b.f1 - b.f0));
      b.el.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`;
      b.el.style.opacity = f > b.f0 ? 1 : 0;
      b.span.style.opacity = M.clamp((p - 0.92) / 0.08).toFixed(3);
      b.el.style.setProperty('--g', (f > b.f0 && f < b.f1 + 0.02 ? 1 : f >= b.f1 ? 0.25 : 0).toFixed(2));
    });

    /* the delivery: the marker drops to the axis when the workflow finishes */
    M.draw(this.mark, t, K.done, 0.5);
    M.rise(this.dlv, t, K.done + 0.1, { dy: 8 });
    M.rise(this.note, t, K.delayed - 0.8, { dy: 8 });

    /* the ledger and the stamp */
    M.rise(this.ledger.root, t, K.start + 0.6);
    const s = M.p(t, K.stamp, 0.5, 'outCubic');
    this.ledger.st.style.opacity = M.prog(t, K.stamp, 0.15).toFixed(3);
    this.ledger.st.style.transform = `scale(${(1.7 - 0.7 * s).toFixed(3)})`;
    Film.glow(this.ledger.root, M.ramp(t, K.stamp - 0.1, K.stamp + 2.6, 0.2, 0.8));
  },
});
