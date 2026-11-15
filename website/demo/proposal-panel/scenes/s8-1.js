/* Scene 8.1: five questions answered. The chapter rail's five items rise from their place at the bottom
   right to the centre of the frame as cards (the reverse of scene 0.2); then each question gets its check
   in turn with its one-word answer, and glows as it is read. */
Film.register({
  id: '8.1',

  ANSWERS: ['Bundle.', 'Signed.', 'Verdicts.', 'People.', 'Record.'],
  CW: 300, CH: 280, GAP: 25, CY: 300, MOVE: 0.3,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = [at('promises'), at('signed'), at('verdicts'), at('people'), at('record')];
  },

  render(root) {
    root.classList.add('s81');
    Mock.style('s81', `
      .s81 .head { left: var(--gutter); top: 110px; }
      .s81 .card { --g: 0; --c: 0; width: ${this.CW}px; height: ${this.CH}px; padding: 28px 28px 26px; box-sizing: border-box; border-radius: 14px; transform-origin: 50% 50%;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.14));
        background: linear-gradient(160deg, rgba(255,206,74,calc(var(--g) * .14)), rgba(255,206,74,calc(var(--g) * .03))), rgba(255,255,255,.025);
        box-shadow: 0 0 calc(var(--g) * 60px) calc(var(--g) * -16px) rgba(255,206,74,.7); display: flex; flex-direction: column; gap: 22px; }
      .s81 .card .d { flex: none; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
        border: 1.5px solid color-mix(in srgb, var(--yellow) calc(var(--c) * 100%), #7a7a7a); background: color-mix(in srgb, var(--yellow) calc(var(--c) * 100%), transparent);
        box-shadow: 0 0 calc(var(--c) * 16px) rgba(255,206,74,.75); }
      .s81 .card .d svg { width: 10px; height: 10px; }
      .s81 .card .d svg path { fill: none; stroke: color-mix(in srgb, #111 calc(var(--c) * 100%), var(--white)); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
      .s81 .card b { font: 700 31px/1.14 var(--sans); letter-spacing: -.025em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); text-wrap: pretty; }
      .s81 .card em { margin-top: auto; font: 700 44px/1 var(--sans); letter-spacing: -.03em; font-style: normal; color: var(--yellow); }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">The five questions are answered.</h2></div>`);
    this.cards = Film.QUESTIONS.map((q, i) => {
      const el = Mock.html(`<div class="card" style="left:${160 + i * (this.CW + this.GAP)}px;top:${this.CY}px">
        <div class="d"><svg viewBox="0 0 12 12"><path d="M2.5 6.3l2.6 2.6 4.6-5.4"/></svg></div><b>${q}</b><em>${this.ANSWERS[i]}</em></div>`);
      root.appendChild(el);
      return el;
    });
    this.checks = this.cards.map((c) => c.querySelector('.d svg path'));
    this.answers = this.cards.map((c) => c.querySelector('em'));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), G = Film.Rail.GEO;
    M.rise(this.head.h, t, this.MOVE + 0.9);
    /* from the rail's place and size to the cards' own: the rise leads the spread, and the cards show once
       they are clear of the caption's band */
    const move = 1 - M.p(t, this.MOVE, 1.3, 'inOutCubic'), lift = 1 - M.p(t, this.MOVE, 0.9, 'inOutCubic');
    const s = G.w / this.CW;
    this.cards.forEach((c, i) => {
      const cx0 = 160 + i * (this.CW + this.GAP) + this.CW / 2, cy0 = this.CY + this.CH / 2;
      const cx1 = Film.Rail.itemX(i) + G.w / 2, cy1 = G.y + 30;
      const dx = (cx1 - cx0) * move, dy = (cy1 - cy0) * lift, sc = M.lerp(1, s, move);
      c.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sc.toFixed(3)})`;
      c.style.opacity = M.prog(1 - lift, 0.3, 0.4).toFixed(3);
      /* the check lands on its word and the card glows while it is read; the first four arrive checked */
      const a = K[i], b = i + 1 < 5 ? K[i + 1] : this.span + 1;
      c.style.setProperty('--c', M.p(t, a, 0.4).toFixed(3));
      c.style.setProperty('--g', M.ramp(t, a - 0.1, b + 0.2, 0.35, 0.5).toFixed(3));
      const path = this.checks[i];
      if (i < 4 && t < a) { path.style.strokeDasharray = ''; path.style.strokeDashoffset = ''; path.style.opacity = ''; }
      else M.draw(path, t, a, 0.35);
      M.rise(this.answers[i], t, a + 0.15, { dy: 14 });
    });
  },
});
