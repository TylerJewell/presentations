/* Scene 1.1: the question. Black. Lines of plausible-looking code stream in fast from the left. As the narration
   turns to what an enterprise needs, most of them dim and fall away, and one sentence rises at the centre:
   "An enterprise needs a system it trusts before it goes into production." The code is generic and illustrative. */
Fx.register({
  id: '1.1',
  captionZone: 'bottom',

  CODE: [
    'def quote(order):',
    '    rate = rates.get(zone, 0)',
    'if (weight > limit) { total *= 1.1; }',
    '    return round(total, 2)',
    'for item in order.items:',
    '// handle the remaining cases later',
    'catch (Exception e) { }',
    'price = base + fee * factor',
    'assert result is not None',
    'const cache = new Map();',
    'retry(3, () => client.post(url, body))',
    'SELECT * FROM rates WHERE zone = ?',
    'if not valid: return default_price',
    'total += surcharge(order)',
  ],
  /* the lines that stay, faint, once the rest fall away */
  KEEP: [0, 13],
  Y: (i) => 170 + i * 44,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { different: at('enterprise'), production: at('trusts') };
  },

  render(root) {
    root.classList.add('s11');
    Mock.style('s11', `
      .s11 .cd { left: 0; white-space: nowrap; font: 500 28px/1 var(--mono); color: var(--soft-grey); }
      .s11 .cd span + span { margin-left: 1400px; }
      .s11 .q { left: 160px; top: 430px; width: 1600px; text-align: center; font: 700 96px/1.05 var(--sans); letter-spacing: -.04em; color: var(--white); }
      .s11 .q .accent { color: var(--yellow); }
      .s11 .veil { left: 0; top: 380px; width: 1920px; height: 220px; background: radial-gradient(50% 60% at 50% 50%, rgba(0,0,0,.92), rgba(0,0,0,0)); opacity: 0; }
    `);
    Mock.dotGrid(root);
    this.lines = this.CODE.map((c, i) => Mock.mount(root, `<div class="cd" style="top:${this.Y(i)}px"><span>${c.replace(/</g, '&lt;')}</span><span>${c.replace(/</g, '&lt;')}</span></div>`).root);
    this.veil = Mock.mount(root, '<div class="veil"></div>').root;
    this.q = Mock.mount(root, '<div class="q">An enterprise needs a system it <span class="accent">trusts</span> before it goes into production.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    /* each line streams across at its own speed; the stream is already running when the scene opens */
    this.lines.forEach((el, i) => {
      const speed = 380 + ((i * 137) % 260), off = (i * 613) % 2700;
      const x = -900 + ((t * speed + off) % 2800);
      const keep = this.KEEP.includes(i);
      const fall = M.p(t, K.different + 0.2 + (i % 5) * 0.18, 1.1, 'inOutCubic');
      const o = 0.85 * M.prog(t, 0, 0.4) * (keep ? 1 - 0.65 * fall : 1 - fall);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate(${x.toFixed(1)}px, ${keep ? 0 : (fall * 140).toFixed(1)}px)`;
    });
    M.fade(this.veil, t, K.production - 0.6, 0.6);
    M.rise(this.q, t, K.production - 0.4, { dy: 30 });
  },
});
