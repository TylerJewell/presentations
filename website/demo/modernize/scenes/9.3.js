/* Scene 9.3: who runs it. One person card at the centre, the product owner. Rails run from it to the five stations,
   and each station lights in turn. Beside it, the specification card lights: what each system does stays there. No
   code appears on screen. */
Fx.register({
  id: '9.3',

  CX: [400, 680, 960, 1240, 1520],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { judgement: at('judgement,'), knowing: at('knowing'), end: at('pass.'), stays: at('kept') };
  },

  render(root) {
    root.classList.add('s93');
    Mock.style('s93', `
      .s93 .po { text-align: center; align-items: center; justify-content: center; }
      .s93 .po .nm { margin-top: 0; font-size: 44px; }
      .s93 .po svg { width: 44px; height: 44px; margin-bottom: 12px; overflow: visible; }
      .s93 .po svg path { fill: none; stroke: var(--yellow); stroke-width: 2.5; stroke-linecap: round; }
      .s93 .fx-step { height: 64px; font-size: 24px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Who runs it', headline: "Running a project's factory takes a product owner's judgement." });
    const S = Fx.svg(root, this.CX.map((x, i) => `<path data-k="r${i}" class="y dash" d="M960 470 C960 545 ${x} 545 ${x} 620"/>`).join(''));
    this.rails = this.CX.map((_, i) => S.k['r' + i]);
    this.pks = this.rails.map(() => Fx.stream(root, 1));
    this.po = Mock.mount(root, `<div class="fx-card po" style="left:760px;top:310px;width:400px;height:160px">
      <svg viewBox="0 0 44 44"><path d="M13 13a9 9 0 1 1 18 0a9 9 0 1 1-18 0M4 42c0-10 8-16 18-16s18 6 18 16"/></svg><div class="nm">Product owner</div></div>`).root;
    this.steps = Fx.STATIONS.map((text, i) => Fx.step(root, { x: this.CX[i] - 100, y: 620, w: 200, text }));
    this.spec = Fx.card(root, { x: 1300, y: 310, w: 460, h: 160, k: 'Specification', nm: 'What the system is for' }).root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.po, t, 0.4);
    Fx.glow(this.po, M.prog(t, K.judgement - 0.6, 0.6));
    /* each station lights in turn, from the product owner's judgement to what the system must pass */
    const a = K.knowing - 0.6, step = (K.end - a) / 5;
    this.steps.forEach((s, i) => {
      M.rise(s, t, 0.8 + i * 0.12, { dy: 10 });
      const on = a + i * step;
      M.draw(this.rails[i], t, on - 0.6, 0.5);
      if (M.prog(t, on - 0.6, 0.5) >= 1) { this.rails[i].style.strokeDasharray = '6 7'; M.march(this.rails[i], t, 14); }
      Fx.streamAt(this.pks[i], this.rails[i], t, on - 0.4, this.duration, 1.6);
      Fx.glow(s, Math.max(M.ramp(t, on, on + step + 0.2, 0.25, 0.5), 0.55 * M.prog(t, on + step, 0.4)));
    });
    /* what each system does stays in its specification */
    M.rise(this.spec, t, K.stays - 0.4);
    Fx.glow(this.spec, M.prog(t, K.stays, 0.6));
  },
});
