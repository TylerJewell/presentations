/* Scene 5.1: an ordinary review, with its controls. The control-point line from Act 2, compact, above the
   Act 1 panel flow. A packet of text travels the line and a green tick appears under the sanitizer and each
   guardrail as it passes; then the work token visits the four readers quickly and the report fills. */
Film.register({
  id: '5.1',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const each = Math.max(at('Each'), 2.2), readers = at('four');
    const visit = [0, 1, 2, 3].map((i) => readers - 1.0 + i * 0.75);
    this.K = { each, readers, visit, dwell: 0.4, synth: visit[3] + 1.0 };
  },

  render(root) {
    root.classList.add('s51');
    Mock.style('s51', `
      .s51 .head { left: var(--gutter); top: 64px; width: 1600px; }
      .s51 .fp-cl .pt { gap: 6px; }
      .s51 .fp-cl .pt .k { font-size: 18px; }
      .s51 .fp-cl .pt .n { font-size: 26px; }
      .s51 .fp-cl .pt .s { font-size: 20px; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">An ordinary review passes every control point.</h2></div>`);
    this.cl = Film.controlLine(root, {
      x0: 200, x1: 1720, y: 330,
      points: [
        { id: 'p1', x: 450, n: 1, kind: 'Preventive', name: 'Sanitizer', sub: 'masks personal data' },
        { id: 'p2', x: 810, n: 2, kind: 'Preventive', name: 'Input guardrails', sub: 'injection and jailbreak' },
        { id: 'p3', x: 1500, n: 3, kind: 'Preventive · on the answer', name: 'Response guardrail', sub: 'scores and reasons' },
      ],
      model: { x: 1150, label: 'The model' },
    });
    const f = (id) => (this.cl.x(id) - 200) / 1520;
    this.P = { p1: f('p1'), p2: f('p2'), m: f('model'), p3: f('p3') };
    this.flow = Film.panelFlow(root, { y: 500 });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), cl = this.cl, P = this.P;
    M.rise(this.head.h, t, 0.1);
    M.draw(cl.base, t, 0.4, 1.2, 'inOutCubic');
    ['p1', 'p2', 'model', 'p3'].forEach((id, i) => cl.show(id, M.ease.css(M.prog(t, 0.6 + i * 0.12, 0.6))));

    /* the packet: waypoints of (fraction along the line, time); it pauses at each point as the tick appears */
    const e = K.each, pass = { p1: e, p2: e + 1.0, p3: e + 2.6 };
    const W = [[0, 0.9], [P.p1, pass.p1], [P.p1, pass.p1 + 0.45], [P.p2, pass.p2], [P.p2, pass.p2 + 0.45], [P.m, e + 1.7], [P.m, e + 2.05],
      [P.p3, pass.p3], [P.p3, pass.p3 + 0.45], [1.02, e + 3.8]];
    let p = -1;
    if (t >= W[0][1]) {
      p = W[W.length - 1][0];
      for (let i = 1; i < W.length; i++) {
        const [a, ta] = W[i - 1], [b, tb] = W[i];
        if (t < tb) { p = t >= ta ? M.lerp(a, b, M.ease.inOutCubic(M.prog(t, ta, tb - ta))) : a; break; }
      }
    }
    cl.packet(p);
    Object.keys(pass).forEach((id) => {
      cl.mark(id, t >= pass[id] + 0.15 ? 'Passed' : null);
      cl.lit(id, M.ramp(t, pass[id] - 0.2, pass[id] + 1.2, 0.25, 0.5));
    });
    cl.lit('model', M.ramp(t, e + 1.5, e + 2.5, 0.3, 0.4));

    this.flow.at(t, { cards: 0.5, visit: K.visit, dwell: K.dwell, synth: K.synth });
  },
});
