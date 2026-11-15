/* Scene 0.2: the five questions. Five cards rise in a row and each glows as it is read; then they shrink
   and settle into the chapter rail's place at the bottom right, where the rail takes over from scene 1.1. */
Film.register({
  id: '0.2',

  CW: 300, CH: 230, GAP: 25, CY: 340,

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { read: [at('What'), at('Is'), at('Are'), at('Who'), at('And')], film: at('film') - 0.3 };
  },

  render(root) {
    root.classList.add('s02');
    Mock.style('s02', `
      .s02 .head { left: var(--gutter); top: 120px; }
      .s02 .card { --g: 0; width: 300px; height: 230px; padding: 28px 28px; border-radius: 14px; transform-origin: 50% 50%;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.14));
        background: linear-gradient(160deg, rgba(255,206,74,calc(var(--g) * .14)), rgba(255,206,74,calc(var(--g) * .03))), rgba(255,255,255,.025);
        box-shadow: 0 0 calc(var(--g) * 60px) calc(var(--g) * -16px) rgba(255,206,74,.7); display: flex; flex-direction: column; gap: 22px; }
      .s02 .card i { flex: none; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #6a6a6a;
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), transparent); border-color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), #6a6a6a); }
      .s02 .card b { font: 700 31px/1.14 var(--sans); letter-spacing: -.025em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); text-wrap: pretty; }
      .s02 .rail { left: 0; top: 0; width: 1920px; height: 1080px; }
      .s02 .rail > * { position: absolute; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">A governance review asks five questions.</h2></div>`);
    this.cards = Film.QUESTIONS.map((q, i) => {
      const el = Mock.html(`<div class="card" style="left:${160 + i * (this.CW + this.GAP)}px;top:${this.CY}px"><i></i><b>${q}</b></div>`);
      root.appendChild(el);
      return el;
    });
    this.rail = Mock.html(`<div class="rail">${Film.QUESTIONS.map((_, i) => Film.Rail.item(i)).join('')}</div>`);
    root.appendChild(this.rail);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), G = Film.Rail.GEO;
    M.rise(this.head.h, t, 0.1);
    const move = M.p(t, K.film, 1.3, 'inOutCubic');
    const s = G.w / this.CW;
    this.cards.forEach((c, i) => {
      const o = M.rise(c, t, 0.5 + i * 0.14);
      const a = K.read[i], b = i + 1 < 5 ? K.read[i + 1] : K.film;
      c.style.setProperty('--g', M.ramp(t, a - 0.1, b + 0.2, 0.35, 0.5).toFixed(3));
      /* to the rail: the card's centre moves to its rail item's centre while it shrinks and fades */
      const cx0 = 160 + i * (this.CW + this.GAP) + this.CW / 2, cy0 = this.CY + this.CH / 2;
      const cx1 = Film.Rail.itemX(i) + G.w / 2, cy1 = G.y + 30;
      const dx = (cx1 - cx0) * move, dy = (cy1 - cy0) * move, sc = M.lerp(1, s, move);
      const lift = (1 - M.p(t, 0.5 + i * 0.14, 0.8)) * 22;
      c.style.transform = `translate(${dx.toFixed(1)}px, ${(dy + lift).toFixed(1)}px) scale(${sc.toFixed(3)})`;
      c.style.opacity = (o * (1 - M.prog(move, 0.55, 0.35))).toFixed(3);
    });
    this.rail.style.opacity = M.prog(move, 0.6, 0.4).toFixed(3);
  },
});
