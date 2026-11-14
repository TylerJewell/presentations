/* Scene E7: Earned, not assumed. The Experiments view falls back into the dark; three figures rise one at a
   time and clear; the end card, as the film's 6.5: "Akka Optimize", "Experiments" in display type, "Scale AI,
   efficiently." and the AKKA mark lower left. */
registerScene({
  id: "E7",
  act: 3,
  title: "Earned, not assumed",
  duration: 9,
  captionZone: 'bottom-right',
  caption: "Cheaper models, earned in production. Akka Optimize Experiments.",

  /* The figures rise while "Cheaper models, earned in production" is read and clear before "Akka", where
     the end card starts. */
  timing() {
    if (this.CARD != null) return;
    this.CARD = Mock.captionAt(this, 'Akka') - 0.25;
  },

  FIGS: [
    ['(71%)', 'cost per call'],
    ['4', 'limits, watched throughout'],
    ['1', 'decision, by a person'],
  ],

  render(root) {
    root.classList.add('se7');
    Mock.style('se7', `
      .se7 .fb { left: 0; top: 0; width: 1920px; height: 1080px; }
      .se7 .fig { top: 292px; width: 500px; text-align: center; }
      .se7 .fig .n { font: 700 156px/1 var(--sans); letter-spacing: -.045em; color: var(--white); font-variant-numeric: tabular-nums; }
      .se7 .fig.y .n { color: var(--yellow); }
      .se7 .fig .l { margin-top: 22px; font: 500 28px/1.3 var(--sans); color: var(--soft-grey); }
      .se7 .glow { left: 360px; top: 140px; width: 1200px; height: 640px; border-radius: 50%;
        background: radial-gradient(closest-side, rgba(255,206,74,.13), rgba(255,206,74,0)); }
      .se7 .hero { left: 0; width: 1920px; top: 236px; text-align: center; transform-origin: 50% 50%; }
      .se7 .eb { font: 600 20px/1 var(--sans); letter-spacing: .22em; text-transform: uppercase; color: var(--yellow); margin-bottom: 30px; }
      .se7 .d { font: 700 200px/.95 var(--sans); letter-spacing: -.045em; white-space: nowrap; color: var(--white); }
      .se7 .tg { margin-top: 40px; font: 600 44px/1.1 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .se7 .tg .y { color: var(--yellow); }
      .se7 .mark { left: 96px; bottom: 82px; }
    `);
    /* the Experiments view as E6 leaves it: promoted, Watch running, the record up, the stage panel framed */
    /* the view's own .hero panel keeps the console's layout, not the end card's */
    Mock.style('se7-fb', `.se7 .fb .hero { left: auto; top: auto; width: auto; text-align: left; transform-origin: 50% 50%; }`);
    this.fb = Mock.mount(root, '<div class="fb"></div>').root;
    this.view = ExpTour.build(this.fb);
    this.grid = Mock.dotGrid(root);
    this.glow = Mock.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.figs = this.FIGS.map(([n, l], i) =>
      Mock.mount(root, `<div class="fig${i === 0 ? ' y' : ''}" style="left:${170 + i * 540}px"><div class="n">${n}</div><div class="l">${l}</div></div>`));
    this.r = Mock.mount(root, `
      <div class="hero" data-k="hero">
        <div class="eb" data-k="eb">Akka Optimize</div>
        <span class="ln-mask"><span class="ln d" data-k="l1">Experiments</span></span>
        <div class="tg" data-k="tg">Scale AI, <span class="y">efficiently.</span></div>
      </div>`);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(40)}</div>`).root;
  },

  at(t) {
    this.timing();
    const M = Mock, r = this.r, C = this.CARD;

    /* the console falls back into the dark, from E6's last frame */
    const s6 = ExpTour.tour.E6, view = this.view;
    ExpTour.decide(view, s6.span, s6.beats());
    const cam = Mock.frameRect(ExpTour.measure(view).stage, s6.captionZone || 'bottom-left');
    view.world.style.transformOrigin = '0 0';
    view.world.style.transform = `translate(${cam.x.toFixed(2)}px, ${cam.y.toFixed(2)}px) scale(${cam.s.toFixed(4)})`;
    const back = M.p(t, 0, 1.3, 'inOutCubic');
    M.set(this.fb, {
      transformOrigin: '50% 45%',
      transform: back > 0 ? `scale(${(1 - 0.16 * back).toFixed(4)})` : 'none',
      opacity: back > 0 ? (1 - back).toFixed(3) : '',
      filter: back > 0 ? `brightness(${(1 - 0.6 * back).toFixed(3)})` : 'none',
      visibility: back >= 1 ? 'hidden' : 'visible',
    });

    /* three figures, one at a time, then they clear for the end card */
    M.fade(this.grid, t, 0.4, 1.0);
    this.figs.forEach((f, i) => M.riseOut(f.root, t, 0.9 + i * 0.75, C - 0.45 + i * 0.06, { outDur: 0.4 }));

    /* the end card */
    M.rise(r.eb, t, C, { dy: 10 });
    M.lineRise(r.l1, t, C + 0.05, 1.1);
    M.rise(r.tg, t, C + 0.9);
    M.fade(this.mark, t, C + 1.2, 0.8);
    r.hero.style.transform = `scale(${(1.02 - 0.02 * M.ease.inOutCubic(M.prog(t, C, 5))).toFixed(4)})`;
    this.glow.style.opacity = (M.prog(t, C + 0.4, 1.6) * (0.7 + 0.3 * M.wave(t, 5))).toFixed(3);
  },
});
