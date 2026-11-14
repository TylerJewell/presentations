/* Scene 5.2: answers. The seven questions return in a row, and each takes the name of the screen that answers
   it, in yellow. The promise rises below them, "Scale AI," then "Efficiently." in yellow, and the AKKA mark
   settles lower left. */
Tok.register({
  id: '5.2',
  captionZone: 'bottom-right',

  render(root) {
    root.classList.add('t52');
    Mock.style('t52', `
      .t52 .glow { left: 260px; top: 340px; width: 1400px; height: 640px; border-radius: 50%;
        background: radial-gradient(closest-side, rgba(255,206,74,.12), rgba(255,206,74,0)); }
      .t52 .hero { left: var(--gutter); top: 470px; }
      .t52 .d { font: 700 140px/.97 var(--sans); letter-spacing: -.045em; white-space: nowrap; }
      .t52 .d.y { color: var(--yellow); }
      .t52 .mark { left: 96px; bottom: 82px; }
    `);
    this.grid = Mock.dotGrid(root);
    this.glow = Mock.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.cards = Tok.seven(root, { y: 100, h: 310 });
    this.r = Mock.mount(root, `<div class="hero">
        <span class="ln-mask"><span class="ln d" data-k="l1">Scale AI,</span></span>
        <span class="ln-mask"><span class="ln d y" data-k="l2">Efficiently.</span></span></div>`);
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(40)}</div>`).root;
  },

  at(t) {
    const M = Mock;
    M.fade(this.grid, t, 0, 1.0);
    this.cards.forEach((c, i) => {
      M.rise(c.root, t, 0.1 + i * 0.08);
      const a = 0.9 + i * 0.22;
      M.rise(c.screen, t, a, { dy: 10 });
      Tok.glow(c.root, 0.35 * M.prog(t, a, 0.4) + 0.65 * M.ramp(t, a, a + 0.8, 0.25, 0.5));
    });
    M.lineRise(this.r.l1, t, 2.8, 1.1);
    M.lineRise(this.r.l2, t, 3.1, 1.1);
    M.fade(this.mark, t, 3.8, 0.8);
    this.glow.style.opacity = (M.prog(t, 3.0, 1.6) * (0.7 + 0.3 * M.wave(t, 5))).toFixed(3);
  },
});
