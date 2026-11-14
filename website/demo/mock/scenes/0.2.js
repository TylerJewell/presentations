/* Scene 0.2: Title. The dot grid comes up, the eyebrow rises, the two hero lines rise from under
   their baselines, and the type drifts slowly toward the viewer for the rest of the scene. */
registerScene({
  id: '0.2',
  act: 0,
  title: 'Title',
  duration: 12,
  captionZone: 'bottom-right',
  caption: "Akka is the agentic AI platform for scaling AI efficiently. Let's follow one system from specification to production.",

  render(root) {
    root.classList.add('s02');
    Mock.style('s02', `
      .s02 .glow { left: 0; top: 0; width: 1400px; height: 900px; border-radius: 50%; pointer-events: none;
        background: radial-gradient(closest-side, rgba(255,206,74,.16), rgba(255,206,74,0)); }
      .s02 .hero { left: var(--gutter); top: 272px; transform-origin: 0 50%; }
      .s02 .eb { display: flex; align-items: center; gap: 16px; font: 600 18px/1 var(--sans); letter-spacing: .22em; text-transform: uppercase; color: var(--yellow); margin-bottom: 44px; }
      .s02 .d { font: 700 var(--t-display)/.95 var(--sans); letter-spacing: -.045em; white-space: nowrap; }
      .s02 .d.y { color: var(--yellow); }
      .s02 .mark { left: 96px; bottom: 82px; }
    `);
    this.grid = Mock.dotGrid(root);
    this.glow = Mock.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.r = Mock.mount(root, `
      <div class="hero" data-k="hero">
        <div class="eb"><span data-k="ebt">The agentic AI platform</span></div>
        <span class="ln-mask"><span class="ln d" data-k="l1">Scale AI,</span></span>
        <span class="ln-mask"><span class="ln d y" data-k="l2">Efficiently.</span></span>
      </div>`);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(40)}</div>`).root;
  },

  at(t) {
    const M = Mock, r = this.r;
    M.fade(this.grid, t, 0, 1.6);
    M.rise(r.ebt, t, 0.6, { dy: 10 });
    M.lineRise(r.l1, t, 1.0, 1.1);
    M.lineRise(r.l2, t, 1.35, 1.1);
    M.fade(this.mark, t, 2.7, 0.8);

    /* a slow push-in on the type and a breathing light behind "Efficiently." */
    const push = 1 + 0.03 * M.ease.inOutCubic(M.prog(t, 1.0, 11));
    r.hero.style.transform = `scale(${push.toFixed(4)})`;
    const gx = 260 + 140 * M.ease.inOutCubic(M.prog(t, 0, 12));
    M.set(this.glow, {
      opacity: (M.prog(t, 1.4, 1.6) * (0.75 + 0.25 * M.wave(t, 4))).toFixed(3),
      transform: `translate(${gx.toFixed(1)}px, ${(220 + 20 * M.wave(t, 6)).toFixed(1)}px)`,
    });
  },
});
