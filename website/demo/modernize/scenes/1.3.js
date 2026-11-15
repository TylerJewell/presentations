/* Scene 1.3: what makes it production-ready. The factory line from 1.2 sits across the top, small; four pillars
   rise under it, each lit as it is named: Evidence, Parity, Exit conditions and The platform. */
Fx.register({
  id: '1.3',

  STATIONS: ['Research', 'Specification', 'Plan', 'Build', 'Test', 'Audit'],
  PILLARS: [
    { nm: 'Evidence', tx: 'Every fact is traced and recorded in a reusable specification.', key: 'fact' },
    { nm: 'Parity', tx: 'Every behaviour is checked against the original, if one exists.', key: 'behaviour' },
    { nm: 'Exit conditions', tx: 'Every enterprise review is checked automatically by auditors.', key: 'review' },
    { nm: 'The platform', tx: "It runs in your own network, with Akka's guarantees for resilience and scalability.", key: 'runs' },
  ],
  PX: (i) => 160 + i * 405,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { pillars: this.PILLARS.map((p) => at(p.key)) };
  },

  render(root) {
    root.classList.add('s13');
    Mock.style('s13', `
      .s13 .fx-step { height: 46px; font-size: 19px; border-radius: 10px; }
      .s13 .pl { padding: 30px 30px; }
      .s13 .pl .nm { margin-top: 0; font-size: 40px; }
      .s13 .pl .tx { margin-top: 16px; font-size: 25px; line-height: 1.35; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Production-ready', headline: 'Four things make these systems production-ready.' });
    const cx = (i) => 245 + i * 286;
    const S = Fx.svg(root, `<path data-k="line" class="y dash" d="M160 323 H1760"/>
      ${this.PILLARS.map((_, i) => `<path data-k="p${i}" d="M${this.PX(i) + 192} 346 V440"/>`).join('')}`);
    this.line = S.k.line;
    this.posts = this.PILLARS.map((_, i) => S.k['p' + i]);
    this.steps = this.STATIONS.map((text, i) => Fx.step(root, { x: cx(i) - 85, y: 300, w: 170, text }));
    this.pillars = this.PILLARS.map((p, i) => { const c = Fx.card(root, { x: this.PX(i), y: 440, w: 385, h: 280, nm: p.nm, tx: p.tx }).root; c.classList.add('pl'); return c; });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.draw(this.line, t, 0.4, 0.9);
    if (M.prog(t, 0.4, 0.9) >= 1) { this.line.style.strokeDasharray = '6 7'; M.march(this.line, t, 14); }
    this.steps.forEach((el, i) => { M.rise(el, t, 0.5 + i * 0.08, { dy: 8 }); Fx.glow(el, 0.15); });
    /* each pillar rises under the line as it is named, and stays */
    this.pillars.forEach((c, i) => {
      const k = K.pillars[i], next = K.pillars[i + 1] != null ? K.pillars[i + 1] : this.duration + 1;
      M.draw(this.posts[i], t, k - 0.6, 0.3);
      M.rise(c, t, k - 0.4);
      Fx.glow(c, Math.max(M.ramp(t, k - 0.3, next - 0.1, 0.3, 0.5), 0.25 * M.prog(t, next - 0.2, 0.5)));
    });
  },
});
