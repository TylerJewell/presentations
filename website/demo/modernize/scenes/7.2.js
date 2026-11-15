/* Scene 7.2: the record. The Changes header, re-drawn: requirements traced, tasks done and exit conditions met, and
   the timeline from constitution to ship. A short trace draws from one requirement to its task to its test; the
   requirement is decision D3 from 3.3. */
Fx.register({
  id: '7.2',

  CARDS: [['Requirements traced', 'All'], ['Tasks done', 'All'], ['Exit conditions met', 'All']],
  STEPS: ['Constitution', 'Specify', 'Clarify', 'Plan', 'Tasks', 'Implement', 'Review', 'Docs', 'Ship'],
  TRACE: [
    ['Requirement', 'Remote area is surcharged before fuel.'],
    ['Task', 'Implement the order of the surcharges.'],
    ['Test', 'The order matches the answer key.'],
  ],
  SX: (i) => 230 + i * 182,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { traced: at('traced'), task: at('task'), test: at('test.'), decision: at('decision,'), one: at('one'), complete: at('complete.') };
  },

  render(root) {
    root.classList.add('s72');
    Mock.style('s72', `
      .s72 .hc { height: 130px; }
      .s72 .hc .nm { font-size: 44px; margin-top: 10px; }
      .s72 .hc .bar { position: absolute; left: 26px; right: 26px; bottom: 22px; height: 4px; border-radius: 2px; background: rgba(241, 241, 241, .16); }
      .s72 .hc .bar i { display: block; height: 100%; border-radius: 2px; background: var(--yellow); }
      .s72 .tls { width: 160px; margin-left: -80px; top: 488px; text-align: center; }
      .s72 .tls i { --g: 0; display: block; margin: 0 auto; width: 20px; height: 20px; border-radius: 50%; box-sizing: border-box;
        border: 2px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), rgba(241, 241, 241, .8));
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), rgba(241, 241, 241, .8)); box-shadow: 0 0 calc(var(--g) * 20px) rgba(255, 206, 74, .7); }
      .s72 .tls span { display: block; margin-top: 14px; font: 600 20px/1 var(--sans); color: var(--white); white-space: nowrap; }
      .s72 .tr { height: 132px; }
      .s72 .tr .nm { font-size: 25px; line-height: 1.25; font-weight: 600; letter-spacing: -.01em; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Release', headline: 'The reviewers read one record, and it is complete.', station: 4 });
    const M = Mock;
    this.cards = this.CARDS.map(([k, nm], i) => { const c = Fx.card(root, { x: 160 + i * 540, y: 290, w: 520, h: 130, k, nm }); c.root.classList.add('hc'); c.bar = M.mount(c.root, '<div class="bar"><i></i></div>').root.firstChild; return c; });
    const S = Fx.svg(root, `<path data-k="track" d="M${this.SX(0)} 498 H${this.SX(8)}"/>
      <path data-k="t0" class="y" d="M680 696 H700"/><path data-k="t1" class="y" d="M1220 696 H1240"/>`);
    this.track = S.k.track; this.tl = [S.k.t0, S.k.t1];
    this.steps = this.STEPS.map((s, i) => M.mount(root, `<div class="tls" style="left:${this.SX(i)}px"><i data-k="d"></i><span>${s}</span></div>`));
    this.trace = this.TRACE.map(([k, nm], i) => { const c = Fx.card(root, { x: 160 + i * 540, y: 630, w: 520, k, nm }).root; c.classList.add('tr'); return c; });
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/changes-spec.png', name: 'Changes · Timeline', rect: { x: 160, y: 332, w: 1600, h: 311 } });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    this.cards.forEach((c, i) => {
      M.rise(c.root, t, 0.4 + i * 0.15);
      c.bar.style.width = (100 * M.p(t, 0.8 + i * 0.15, 1.2, 'outCubic')).toFixed(1) + '%';
      Fx.glow(c.root, 0.6 * M.prog(t, K.complete - 0.3, 0.6));
    });
    /* the trace draws from the requirement to its task to its test */
    const ks = [K.traced - 0.3, K.task - 0.2, K.test - 0.2];
    this.trace.forEach((c, i) => { M.rise(c, t, ks[i], { dy: 12 }); Fx.glow(c, M.ramp(t, ks[i], ks[i] + 1.6, 0.25, 0.6) + 0.4 * M.prog(t, K.complete - 0.3, 0.6)); });
    this.tl.forEach((p, i) => M.draw(p, t, ks[i + 1] - 0.2, 0.3));
    /* the timeline, constitution to ship, every step reached */
    this.track.style.stroke = 'rgba(241,241,241,.55)';
    M.draw(this.track, t, K.decision - 0.5, 1.6, 'linear');
    this.steps.forEach((s, i) => {
      const at = K.decision - 0.5 + (1.6 * i) / 8;
      M.rise(s.root, t, at - 0.2, { dy: 8 });
      Fx.glow(s.d, i === 8 ? M.prog(t, at + 0.2, 0.4) : 0);
    });
    this.scr.at(t, { a: Mock.captionAt(this, 'reviewers') - 0.3, b: this.duration + 1, from: [556, 230, 560], to: [1340, 230, 560] });
  },
});
