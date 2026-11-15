/* Scene 8.2: your system. The title returns with the system's place taken by a blank card, "Your system";
   the second line is the same as the opening. The three steps rise as they are spoken, the AKKA mark settles
   lower left, and the frame holds. */
Film.register({
  id: '8.2',
  captionZone: 'bottom-right',

  STEPS: ['List the controls.', 'Sign the bundle.', 'Watch the verdicts.'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = [at('List'), at('sign'), at('watch')];
  },

  render(root) {
    root.classList.add('s82');
    Mock.style('s82', `
      .s82 .hero { left: var(--gutter); top: 232px; width: 1640px; }
      .s82 .hero .mk-eyebrow { margin-bottom: 34px; }
      .s82 .hero .ln { font: 700 84px/1.04 var(--sans); letter-spacing: -.045em; color: var(--white); }
      .s82 .hero .ln.y { color: var(--yellow); margin-top: 18px; }
      .s82 .you { display: inline-block; padding: 14px 34px 18px; border-radius: 16px; border: 1px solid rgba(241,241,241,.28); background: rgba(255,255,255,.025); }
      .s82 .you .ln { color: var(--white); }
      .s82 .steps { left: var(--gutter); top: 640px; display: flex; gap: 24px; }
      .s82 .step { --g: 0; width: 420px; height: 96px; box-sizing: border-box; padding: 0 28px; border-radius: 14px; display: flex; align-items: center; gap: 18px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.14));
        background: linear-gradient(160deg, rgba(255,206,74,calc(var(--g) * .14)), rgba(255,206,74,calc(var(--g) * .03))), rgba(255,255,255,.025);
        box-shadow: 0 0 calc(var(--g) * 56px) calc(var(--g) * -16px) rgba(255,206,74,.7); }
      .s82 .step i { flex: none; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #7a7a7a;
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), transparent); border-color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), #7a7a7a); }
      .s82 .step b { font: 700 31px/1.1 var(--sans); letter-spacing: -.025em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s82 .mark { left: var(--gutter); top: 950px; }
    `);
    this.grid = Mock.dotGrid(root);
    Film.note(root);
    this.r = Mock.mount(root, `<div class="hero">
      <div class="mk-eyebrow" data-k="eb">A governed AI system</div>
      <div class="ln-mask"><div class="ln" data-k="l1"><span class="you"><span class="ln">Your system</span></span></div></div>
      <div class="ln-mask"><div class="ln y" data-k="l2">and everything that governs it.</div></div></div>`);
    this.steps = this.STEPS.map((s) => Mock.html(`<div class="step"><i></i><b>${s}</b></div>`));
    const row = Mock.html('<div class="steps"></div>');
    this.steps.forEach((s) => row.appendChild(s));
    root.appendChild(row);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(34)}</div>`).root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.fade(this.grid, t, 0, 1.0);
    M.rise(this.r.eb, t, 0.3, { dy: 10 });
    M.lineRise(this.r.l1, t, 0.6, 1.1);
    M.lineRise(this.r.l2, t, 1.0, 1.1);
    this.steps.forEach((s, i) => {
      M.rise(s, t, K[i] - 0.2);
      const b = i + 1 < 3 ? K[i + 1] : this.span + 1;
      s.style.setProperty('--g', M.ramp(t, K[i] - 0.1, b + 0.3, 0.35, 0.6).toFixed(3));
    });
    M.fade(this.mark, t, 1.8, 0.8);
  },
});
