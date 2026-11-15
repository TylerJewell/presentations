/* Scene 2.2: controls are classified by when they act. A packet of text travels the control-point line:
   a preventive control before the model, the model, a preventive control on its answer, and a detective
   control afterward; the authorization control sits on a branch below, with the person who approves. Each
   label rises as it is named; the packet pauses at the point being spoken about. */
Film.register({
  id: '2.2',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const prev = at('preventive'), det = Math.max(at('detective'), prev + 3.6);
    this.K = { prev, det, auth: at('authorization'), all: at('uses') };
  },

  render(root) {
    root.classList.add('s22');
    Mock.style('s22', `.s22 .head { left: var(--gutter); top: 100px; }`);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">Controls are classified by when they act.</h2></div>`);
    this.cl = Film.controlLine(root, {
      x0: 200, x1: 1720, y: 540,
      points: [
        { id: 'p1', x: 560, n: 1, kind: 'Preventive · before', name: 'Sanitizer and guardrails', sub: 'can stop the request' },
        { id: 'p2', x: 1230, n: 2, kind: 'Preventive · on the answer', name: 'Response guardrail', sub: 'can reject the answer' },
        { id: 'p3', x: 1600, n: 3, kind: 'Detective · after', name: 'Classifier and evaluator', sub: 'reviews the result' },
      ],
      model: { x: 930, label: 'The model' },
      auth: { x: 930, kind: 'Authorization', name: 'A named person approves', sub: 'before the action takes effect' },
    });
    const f = (id) => (this.cl.x(id) - 200) / 1520;
    this.P = { p1: f('p1'), m: f('model'), p2: f('p2'), p3: f('p3') };
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), cl = this.cl, P = this.P;
    M.rise(this.head.h, t, 0.1);
    M.draw(cl.base, t, 0.5, 1.2, 'inOutCubic');
    /* the packet: waypoints of (fraction along the line, time) */
    const W = [[0, 1.2], [P.p1, K.prev], [P.p1, K.prev + 0.8], [P.m, K.prev + 1.5], [P.m, K.prev + 2.1], [P.p2, K.prev + 2.8], [P.p2, K.prev + 3.3],
      [P.p3, K.det], [P.p3, K.det + 1.0], [1.02, K.det + 1.8]];
    let p = -1;
    if (t >= W[0][1]) {
      p = W[W.length - 1][0];
      for (let i = 1; i < W.length; i++) {
        const [a, ta] = W[i - 1], [b, tb] = W[i];
        if (t < tb) { p = t >= ta ? M.lerp(a, b, M.ease.inOutCubic(M.prog(t, ta, tb - ta))) : a; break; }
      }
    }
    cl.packet(p);
    /* labels rise as they are named; the one being spoken about glows, and all of them settle lit at the end */
    const all = 0.45 * M.p(t, K.all, 0.8);
    const show = { p1: K.prev - 0.5, model: K.prev + 1.2, p2: K.prev + 2.5, p3: K.det - 0.5, auth: K.auth - 0.4 };
    const lit = {
      p1: M.ramp(t, K.prev - 0.2, K.prev + 1.4, 0.3, 0.5), model: M.ramp(t, K.prev + 1.4, K.prev + 2.4, 0.3, 0.4),
      p2: M.ramp(t, K.prev + 2.7, K.prev + 3.7, 0.3, 0.5), p3: M.ramp(t, K.det - 0.2, K.det + 1.6, 0.3, 0.5), auth: M.ramp(t, K.auth - 0.2, K.auth + 2.6, 0.3, 0.6),
    };
    /* while the packet waits at point 2 for the next sentence, the response guardrail breathes and its line rises */
    const wait = M.ramp(t, K.prev + 3.3, K.det, 0.6, 0.6);
    lit.p2 = Math.max(lit.p2, wait * (0.35 + 0.25 * M.wave(t, 2.4)));
    Object.keys(show).forEach((id) => { cl.show(id, M.ease.css(M.prog(t, show[id], 0.6))); cl.lit(id, Math.max(lit[id], all)); });
    M.rise(cl.pts.p2.lb.querySelector('.s'), t, K.prev + 3.8, { dy: 10 });
    /* the authorization branch draws down from the model early, so the person below is not a surprise */
    const br = cl.pts.auth.br, drawn = M.draw(br, t, K.prev + 3.6, 2.2, 'inOutCubic');
    if (drawn >= 1) br.style.strokeDasharray = '';
    br.style.opacity = M.prog(t, K.prev + 3.6, 0.3).toFixed(3);
  },
});
