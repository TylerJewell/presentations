/* Scene 0.2: the title and the seven questions. The dot grid comes up, the eyebrow rises and the title rises
   line by line, "Tokenomics" then "in Akka" in yellow, with the AKKA mark lower left. When the seven questions
   are named the title steps up and back, and seven question cards fall into a row, each with a small drawing of
   the screen that answers it; a light runs along them in order as the order is spoken. */
Tok.register({
  id: '0.2',
  captionZone: 'bottom-right',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { seven: at('seven'), order: at('order'), each: at('each') };
  },

  render(root) {
    root.classList.add('t02');
    Mock.style('t02', `
      .t02 .glow { left: 0; top: 0; width: 1400px; height: 900px; border-radius: 50%; pointer-events: none;
        background: radial-gradient(closest-side, rgba(255,206,74,.16), rgba(255,206,74,0)); }
      .t02 .hero { left: var(--gutter); top: 210px; transform-origin: 0 0; }
      .t02 .eb { font: 600 18px/1 var(--sans); letter-spacing: .22em; text-transform: uppercase; color: var(--yellow); margin-bottom: 40px; }
      .t02 .d { font: 700 200px/.95 var(--sans); letter-spacing: -.045em; white-space: nowrap; }
      .t02 .d.y { color: var(--yellow); }
      .t02 .mark { left: 96px; bottom: 82px; }
    `);
    this.grid = Mock.dotGrid(root);
    this.glow = Mock.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.r = Mock.mount(root, `
      <div class="hero" data-k="hero">
        <div class="eb" data-k="eb">The agentic AI platform</div>
        <span class="ln-mask"><span class="ln d" data-k="l1">Tokenomics</span></span>
        <span class="ln-mask"><span class="ln d y" data-k="l2">in Akka</span></span>
      </div>`);
    this.cards = Tok.seven(root, { y: 490, h: 310 });
    this.mark = Mock.mount(root, `<div class="mark">${Mock.markSVG(40)}</div>`).root;
  },

  at(t) {
    const M = Mock, r = this.r;
    this.timing();
    const K = this.K;
    M.fade(this.grid, t, 0, 1.4);
    M.rise(r.eb, t, 0.4, { dy: 10 });
    M.lineRise(r.l1, t, 0.7, 1.1);
    M.lineRise(r.l2, t, 1.05, 1.1);
    M.fade(this.mark, t, 2.2, 0.8);

    /* the title steps up and back to make room for the questions */
    const up = M.p(t, K.seven - 0.6, 1.1, 'inOutCubic');
    r.hero.style.transform = `translate(0, ${(-110 * up).toFixed(1)}px) scale(${M.lerp(1, 0.6, up).toFixed(4)})`;
    M.set(this.glow, {
      opacity: (M.prog(t, 1.2, 1.6) * (0.75 + 0.25 * M.wave(t, 4)) * (1 - 0.5 * up)).toFixed(3),
      transform: `translate(${(240 + 120 * M.ease.inOutCubic(M.prog(t, 0, 16))).toFixed(1)}px, ${(140 + 20 * M.wave(t, 6)).toFixed(1)}px)`,
    });

    /* the cards fall into the row, then a light runs along them in order */
    this.cards.forEach((c, i) => {
      const s = K.seven - 0.2 + i * 0.16;
      const p = M.p(t, s, 0.9);
      c.root.style.opacity = M.ease.css(M.prog(t, s, 0.6)).toFixed(3);
      c.root.style.transform = `translateY(${(-70 * (1 - p)).toFixed(1)}px)`;
      const a = K.order - 0.2 + i * 0.32;
      Tok.glow(c.root, M.ramp(t, a, a + 0.9, 0.3, 0.5));
    });
  },
});
