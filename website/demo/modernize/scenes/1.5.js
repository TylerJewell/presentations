/* Scene 1.5: two ways to start. Two entry paths into a factory that end at the same place. Above, an idea: discovery
   turns user requirements, support history and an analysis of peers and rivals into the specification of a new
   system. Below, an existing system: the factory ports or modernizes it, and the original becomes the framework
   for proving behavioural parity. Both paths arrive at one card, "A tested system ready for production". */
Fx.register({
  id: '1.5',

  INPUTS: ['User requirements', 'Support history', 'Peers and rivals'],

  timing() {
    if (this.K) return;
    const at = (w, from) => Mock.captionAt(this, w, from);
    this.K = { idea: at('From'), inputs: [at('requirements,'), at('support'), at('peers')], spec: at('specification'),
      existing: at('From', 30), ports: at('ports'), framework: at('framework'), both: at('Both'), end: at('production.') };
  },

  render(root) {
    root.classList.add('s15');
    Mock.style('s15', `
      .s15 .start { height: 112px; justify-content: center; }
      .s15 .start .nm { margin-top: 6px; font-size: 32px; }
      .s15 .in { height: 52px; font-size: 21px; justify-content: center; padding: 0 10px; }
      .s15 .mid { height: 112px; justify-content: center; }
      .s15 .mid .nm { margin-top: 6px; font-size: 26px; }
      .s15 .end { justify-content: center; }
      .s15 .end .nm { margin-top: 10px; font-size: 38px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Two ways to start', headline: 'A factory can start from an idea or from an existing system.' });
    const M = Mock;
    const S = Fx.svg(root, `
      <path data-k="a1" class="y dash" d="M420 356 H470"/>
      <path data-k="a2" class="y dash" d="M1160 356 C1230 356 1230 520 1300 520"/>
      <path data-k="b1" class="y dash" d="M420 646 H470"/>
      <path data-k="b2" class="y dash" d="M1160 646 C1230 646 1230 560 1300 560"/>`);
    this.paths = ['a1', 'a2', 'b1', 'b2'].map((k) => S.k[k]);
    this.pks = [Fx.stream(root, 2), Fx.stream(root, 2)];
    this.idea = Fx.card(root, { x: 160, y: 300, w: 260, h: 112, k: 'Start', nm: 'An idea' }).root;
    this.idea.classList.add('start');
    this.inputs = this.INPUTS.map((text, i) => { const el = Fx.tile(root, { x: 470 + i * 232, y: 300, w: 220, h: 52, text }); el.classList.add('in'); return el; });
    this.spec = Fx.card(root, { x: 470, y: 364, w: 690, h: 48, nm: '' }).root;
    this.spec.innerHTML = '<div class="tx" style="margin-top:0;font-size:21px">Discovery turns them into the specification of a new system.</div>';
    this.spec.style.padding = '10px 18px';
    this.sys = Fx.card(root, { x: 160, y: 590, w: 260, h: 112, k: 'Start', nm: 'An existing system' }).root;
    this.sys.classList.add('start');
    this.orig = Fx.card(root, { x: 470, y: 590, w: 690, h: 112, k: 'Port or modernize', nm: 'The original is the framework for proving parity' }).root;
    this.orig.classList.add('mid');
    this.end = Fx.card(root, { x: 1300, y: 430, w: 460, h: 220, k: 'Both paths end here', nm: 'A tested system ready for production' }).root;
    this.end.classList.add('end');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* the idea path */
    M.rise(this.idea, t, 0.6);
    Fx.glow(this.idea, Math.max(M.ramp(t, K.idea - 0.2, K.existing - 0.3, 0.3, 0.5) * 0.8, 0.4 * M.ramp(t, 0.8, K.idea - 0.3, 0.3, 0.3)));
    M.draw(this.paths[0], t, K.inputs[0] - 0.5, 0.3);
    this.inputs.forEach((el, i) => { M.rise(el, t, K.inputs[i] - 0.3, { dy: 10 }); Fx.glow(el, M.ramp(t, K.inputs[i] - 0.2, K.existing - 0.3, 0.3, 0.5) * 0.7); });
    M.rise(this.spec, t, K.spec - 0.3, { dy: 8 });
    /* the existing-system path */
    M.rise(this.sys, t, 0.9);
    Fx.glow(this.sys, Math.max(M.ramp(t, K.existing - 0.2, K.both - 0.2, 0.3, 0.5) * 0.8, 0.4 * M.ramp(t, 1.1, K.idea - 0.3, 0.3, 0.3)));
    M.draw(this.paths[2], t, K.ports - 0.4, 0.3);
    M.rise(this.orig, t, K.ports - 0.2);
    Fx.glow(this.orig, M.ramp(t, K.framework - 0.3, K.both - 0.2, 0.3, 0.5));
    /* both paths arrive at the same place */
    [1, 3].forEach((k, j) => {
      const p = this.paths[k];
      M.draw(p, t, K.both - 0.4 + j * 0.2, 0.6);
      if (M.prog(t, K.both - 0.4 + j * 0.2, 0.6) >= 1) { p.style.strokeDasharray = '6 7'; M.march(p, t, 14); }
      Fx.streamAt(this.pks[j], p, t, K.both + 0.3, this.duration, 1.6);
    });
    M.rise(this.end, t, K.both - 0.2);
    Fx.glow(this.end, M.prog(t, K.end - 0.6, 0.6));
  },
});
