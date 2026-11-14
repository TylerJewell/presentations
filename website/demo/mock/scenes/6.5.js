/* Scene 6.5: End card. The promise in display type, centred, rising line by line; the install
   chip rises; the AKKA mark settles lower left. */
registerScene({
  id: '6.5',
  act: 6,
  title: 'End card',
  duration: 12,
  captionZone: 'bottom-right',
  caption: 'Akka. Scale AI, efficiently.',

  render(root) {
    root.classList.add('s65');
    Mock.style('s65', `
      .s65 .glow { left: 360px; top: 160px; width: 1200px; height: 640px; border-radius: 50%;
        background: radial-gradient(closest-side, rgba(255,206,74,.13), rgba(255,206,74,0)); }
      .s65 .hero { left: 0; width: 1920px; top: 236px; text-align: center; transform-origin: 50% 50%; }
      .s65 .d { font: 700 200px/.95 var(--sans); letter-spacing: -.045em; white-space: nowrap; }
      .s65 .d.y { color: var(--yellow); }
      .s65 .ins { left: 0; width: 1920px; top: 724px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
      .s65 .ins .lead { font: 500 16px/1 var(--sans); color: var(--soft-grey); letter-spacing: .04em; }
      .s65 .chip { display: inline-flex; align-items: center; gap: 22px; padding: 18px 22px 18px 24px; background: var(--medium-black);
        border: 1px solid var(--hair-hi); border-radius: 10px; font: 500 24px/1 var(--mono); color: var(--white); white-space: nowrap; }
      .s65 .chip .g { color: var(--yellow); font-weight: 600; }
      .s65 .chip .cp { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey);
        border: 1px solid var(--hair-hi); padding: 9px 11px; border-radius: 6px; }
      .s65 .mark { left: 96px; bottom: 82px; }
    `);
    this.grid = Mock.dotGrid(root);
    this.glow = Mock.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.r = Mock.mount(root, `
      <div class="hero" data-k="hero">
        <span class="ln-mask"><span class="ln d" data-k="l1">Scale AI,</span></span>
        <span class="ln-mask"><span class="ln d y" data-k="l2">Efficiently.</span></span>
      </div>`);
    this.ins = Mock.mount(root, `
      <div class="ins"><span class="lead" data-k="lead">In your AI harness:</span>
        <span class="chip" data-k="chip"><span><span class="g">›</span>&nbsp; install Akka from akka.ai</span><span class="cp">Copy</span></span></div>`);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(40)}</div>`).root;
  },

  at(t) {
    const M = Mock, r = this.r;
    M.fade(this.grid, t, 0, 1.4);
    M.lineRise(r.l1, t, 0.5, 1.1);
    M.lineRise(r.l2, t, 0.8, 1.1);
    M.rise(this.ins.lead, t, 2.3, { dy: 12 });
    M.rise(this.ins.chip, t, 2.45);
    M.fade(this.mark, t, 2.9, 0.8);
    r.hero.style.transform = `scale(${(1.02 - 0.02 * M.ease.inOutCubic(M.prog(t, 0.5, 11))).toFixed(4)})`;
    this.glow.style.opacity = (M.prog(t, 1.0, 1.6) * (0.7 + 0.3 * M.wave(t, 5))).toFixed(3);
  },
});
