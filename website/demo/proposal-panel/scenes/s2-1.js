/* Scene 2.1: four things that can go wrong. Four cards, each with a line-drawn glyph and one sentence
   tying the risk to this system; each glows as it is read. */
Film.register({
  id: '2.1',

  RISKS: [
    { g: ['M14 6h26l10 10v42H14z', 'M40 6v10h10', 'M22 28h20', 'M22 37h20', 'M22 46h20', 'M26 42l12 8', 'M26 50l12-8'], s: 'A proposal can contain instructions written to override the AI\'s own.' },
    { g: ['M6 16h52v32H6z', 'M6 26h52', 'M14 40h12', 'M34 40h16'], s: 'A proposal can contain a customer\'s card number or email address.' },
    { g: ['M8 10h48v30H26l-10 10V40H8z', 'M16 25l6-6 6 6 6-6 6 6 6-6'], s: 'A review can come back malformed or with unsuitable language.' },
    { g: ['M26 12a8 8 0 1 0 0 16a8 8 0 1 0 0-16', 'M6 54c0-14 40-14 40 0', 'M42 24l5 5 11-11'], s: 'Some reports should be approved by a person before anyone relies on them.' },
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = [at('proposal'), at('It'), at('review'), at('And')];
  },

  render(root) {
    root.classList.add('s21');
    Mock.style('s21', `
      .s21 .head { left: var(--gutter); top: 110px; }
      .s21 .fp-card { width: 370px; height: 380px; padding: 32px 32px 30px; }
      .s21 .fp-card .g { width: 72px; height: 72px; overflow: visible; margin-bottom: auto; }
      .s21 .fp-card .g path { fill: none; stroke: color-mix(in srgb, var(--yellow) calc(40% + var(--g) * 60%), var(--soft-grey)); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .s21 .fp-card .s { font: 600 27px/1.3 var(--sans); letter-spacing: -.01em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); text-wrap: pretty; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">This system carries four risks.</h2></div>`);
    this.cards = this.RISKS.map((r, i) => {
      const el = Mock.html(`<div class="fp-card" style="left:${160 + i * 410}px;top:${300}px">
        <svg class="g" viewBox="0 0 64 64">${r.g.map((d) => `<path d="${d}"/>`).join('')}</svg><div class="s">${r.s}</div></div>`);
      root.appendChild(el);
      return el;
    });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.h, t, 0.1);
    this.cards.forEach((c, i) => {
      M.rise(c, t, 0.5 + i * 0.14);
      c.querySelectorAll('.g path').forEach((p, j) => M.draw(p, t, 0.8 + i * 0.14 + j * 0.1, 0.8));
      const a = K[i], b = i + 1 < 4 ? K[i + 1] : this.span + 1;
      Film.glow(c, M.ramp(t, a - 0.15, b + 0.1, 0.35, 0.5));
    });
  },
});
