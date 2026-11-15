/* Centralize the library, localize the person. The ring of ten countries becomes the spokes of a hub. The
   hub holds what the center owns; the Germany spoke holds what each country owns (shown once, for the
   spoke being spoken about). Cases then travel the spokes on the live clock, so they are already moving:
   most stop at the threshold mark, decided in the country, and a few cross it and travel to the hub. Last,
   Singapore's supervisor's words settle on the hub. Firms are described by structure, never named.
   Sources: report §2 (published programmes, MAS's 2024 thematic review on materiality, the MAS
   Guidelines of 7 Oct 2026, EU AI Act Arts. 17(4) and 26(5)–(6)). */
registerSlide({
  id: 'hub',
  act: 'org',
  title: 'Centralize the library, localize the person',
  beats: [
    { t: 2.8, say: "Two global banks, a technology company, a pharmaceutical group: the organizations whose set-up is published all arrive at the same shape. A hub at the center, and a spoke for each country." },
    { t: 4.6, say: "The center owns the control library, the oversight patterns, the inventory of systems and agents, and the thresholds that send a case upward." },
    { t: 6.2, say: "Each country owns the person who decides, the gate before deployment, and the raw evidence. Data rules, labor law and local representatives keep those three in the country." },
    { t: 8.0, say: "Most cases are decided in the country where they arise. The few that cross a threshold travel to the center. What goes up is set by materiality: a baseline for every case, and more review for the cases that matter most." },
    { t: 9.8, say: "And regulators have started to write this down. This October, Singapore's supervisor wrote that a local bank may lean on its group's AI framework, as long as it meets the local expectations." },
  ],

  RING: { cx: 960, cy: 600, rx: 660, ry: 350 },
  HUB: [660, 505, 600, 272],
  CENTRE: ['The control library', 'The oversight patterns', 'The inventory of systems and agents', 'The thresholds that send a case up'],
  COUNTRY: ['The reviewer', 'The deployment gate', 'The raw evidence'],
  /* where a case stops when it is decided in the country, as a fraction of the spoke from the country end */
  THR: 0.4,
  SLOTS: 3, PERIOD: 5.6,

  render(root) {
    const M = Mock;
    root.classList.add('sl-hub');
    M.style('sl-hub', `
      .sl-hub svg.sp { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-hub .sp line.k { stroke: rgba(241,241,241,.22); stroke-width: 2; }
      .sl-hub .sp line.th { stroke: rgba(255,206,74,.75); stroke-width: 3; stroke-linecap: round; }
      .sl-hub .sp circle { fill: #F1F1F1; }
      .sl-hub .sp circle.up { fill: var(--yellow); filter: drop-shadow(0 0 8px rgba(255,206,74,.8)); }
      .sl-hub .hub { box-sizing: border-box; padding: 30px 40px 0; }
      .sl-hub .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-hub .it { font: 600 30px/1 var(--sans); letter-spacing: -.005em; color: var(--ink); display: flex; align-items: center; gap: 16px; white-space: nowrap; }
      .sl-hub .it i { flex: none; width: 10px; height: 10px; border-radius: 50%; background: var(--yellow); }
      .sl-hub .hub .it { margin-top: 16px; }
      .sl-hub .hub .k + .it { margin-top: 24px; }
      .sl-hub .ctry { left: 760px; width: 400px; box-sizing: border-box; padding: 24px 32px 26px; display: flex; flex-direction: column; gap: 20px; }
      .sl-hub .ctry .it i { background: var(--ink-2); }
      .sl-hub .qt { left: 510px; top: 495px; width: 900px; height: 300px; box-sizing: border-box; padding: 34px 44px 0; }
      .sl-hub .qt q { display: block; margin-top: 22px; quotes: none; font: 500 36px/1.3 var(--sans); letter-spacing: -.01em; color: var(--ink); text-wrap: pretty; }
      .sl-hub .qt q em { font-style: normal; color: var(--yellow); }
      .sl-hub .qt .mt { position: absolute; left: 44px; bottom: 32px; font: 500 24px/1 var(--sans); color: var(--ink-2); }
      .sl-hub .src { left: var(--gut); right: var(--gut); top: 1006px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Centralize the library, <span class="tk-y">localize the person.</span>']);
    this.svg = M.html('<svg class="sp" viewBox="0 0 1920 1080"><g class="ln"></g><g class="th"></g><g class="dt"></g></svg>');
    root.appendChild(this.svg);
    this.ring = Talk.ring(root, Object.assign({ sub: false }, this.RING));
    const [hx, hy, hw, hh] = this.HUB;
    this.hub = M.mount(root, `<div class="hub tk-card" style="left:${hx}px;top:${hy}px;width:${hw}px;height:${hh}px"><div class="k">The center</div>
      ${this.CENTRE.map((s) => `<div class="it"><i></i>${s}</div>`).join('')}</div>`);
    this.hubItems = [...this.hub.root.querySelectorAll('.it')];
    this.de = this.ring.labels.find((l) => l.c.id === 'de');
    this.ctry = M.mount(root, `<div class="ctry tk-card" style="top:${Math.round(this.de.y + 42)}px">
      ${this.COUNTRY.map((s) => `<div class="it"><i></i>${s}</div>`).join('')}</div>`).root;
    this.ctryItems = [...this.ctry.querySelectorAll('.it')];
    this.qt = M.mount(root, `<div class="qt tk-card hot"><div class="k">Singapore, 7 Oct 2026</div>
      <q>Singapore's supervisor lets a local bank “<em>leverage their group's AI risk management frameworks</em>”, as long as it meets the local expectations.</q>
      <div class="mt">MAS AI Risk Management Guidelines, in effect from Oct 2027</div></div>`).root;
    this.src = M.mount(root, `<div class="src tk-src">Published programmes of two global banks, a technology company and a pharmaceutical group; MAS 2024 thematic review (review tiered by materiality).
      MAS AI Risk Management Guidelines, final 7 Oct 2026, effective 7 Oct 2027, quoted via Allen &amp; Gledhill. EU AI Act Arts. 17(4) and 26(5)–(6) for financial institutions.</div>`).root;
    this.geo = null;
  },

  /** Spokes from the hub's edge to just short of each label, measured once the labels are laid out. */
  measure() {
    const M = Mock, [hx, hy, hw, hh] = this.HUB, hc = [hx + hw / 2, hy + hh / 2];
    const edge = (c, half, d) => { const k = Math.min(half[0] / Math.max(Math.abs(d[0]), 1e-6), half[1] / Math.max(Math.abs(d[1]), 1e-6)); return [c[0] + d[0] * k, c[1] + d[1] * k]; };
    const out = [];
    for (const l of this.ring.labels) {
      const w = l.el.offsetWidth, h = l.el.offsetHeight;
      if (!w) return null;
      const dx = l.x - hc[0], dy = l.y - hc[1], n = Math.hypot(dx, dy), d = [dx / n, dy / n];
      const a = edge([l.x, l.y], [w / 2 + 14, h / 2 + 14], [-d[0], -d[1]]);
      const b = edge(hc, [hw / 2, hh / 2], d);
      out.push({ a, b, id: l.c.id });
    }
    const ln = this.svg.querySelector('.ln'), th = this.svg.querySelector('.th'), dt = this.svg.querySelector('.dt');
    out.forEach((s, i) => {
      s.line = M.svg('line', { class: 'k', x1: s.b[0], y1: s.b[1], x2: s.a[0], y2: s.a[1] }, ln);
      const L = Math.hypot(s.a[0] - s.b[0], s.a[1] - s.b[1]), ux = (s.b[0] - s.a[0]) / L, uy = (s.b[1] - s.a[1]) / L;
      const p = [s.a[0] + ux * L * this.THR, s.a[1] + uy * L * this.THR];
      s.tick = M.svg('line', { class: 'th', x1: p[0] - uy * 15, y1: p[1] + ux * 15, x2: p[0] + uy * 15, y2: p[1] - ux * 15 }, th);
      s.dots = Array.from({ length: this.SLOTS }, () => M.svg('circle', { r: 7, cx: s.a[0], cy: s.a[1] }, dt));
      s.len = L; s.u = [ux, uy];
    });
    return out;
  },

  at(t) {
    const M = Mock, B = this.beats.map((b) => b.t);
    if (!this.geo) this.geo = this.measure();
    Talk.linesAt(this.head, t, 0.1);
    /* the hub, then the spokes drawn out from it to each country */
    M.rise(this.hub.root, t, 0.5);
    const items = B[0] + 0.15, ctry = B[1] + 0.15, flow = B[2] + 0.15, quote = B[3] + 0.15;
    /* the centre's four items are there, quiet, from the start, and light one by one when they are named;
       they step back for the country, and the thresholds light again when cases start to cross them */
    this.hubItems.forEach((el, i) => {
      const back = 1 - 0.45 * M.p(t, ctry, 0.6) * (i === 3 ? 1 - M.p(t, flow, 0.6) : 1);
      M.rise(el, t, 0.9 + i * 0.1, { dy: 12, opacity: (0.35 + 0.65 * M.p(t, items + i * 0.3, 0.5)) * back });
    });
    const hubLit = M.p(t, items, 0.6) * (1 - M.p(t, ctry, 0.6, 'inOutCubic'));
    const dimAll = M.p(t, quote, 0.7, 'inOutCubic');
    Talk.ringAt(this.ring, t, {
      start: 0.2, gap: 0.05,
      lit: (i) => (this.ring.labels[i].c.id === 'de' ? M.p(t, ctry, 0.6) * (1 - M.p(t, flow, 0.6, 'inOutCubic')) : 0),
      dim: Math.max(0.45 * M.p(t, ctry, 0.6) * (1 - M.p(t, flow, 0.6)), dimAll),
    });
    /* the country panel stays opaque, so the spoke behind it never shows through; its words step back */
    M.rise(this.ctry, t, ctry + 0.2, { dy: 14 });
    this.ctryItems.forEach((el) => { el.style.opacity = (1 - 0.4 * M.p(t, flow, 0.6) - 0.4 * dimAll).toFixed(3); });
    /* the quotation takes the hub's place: the hub fades first, so the two never show through each other */
    if (t >= quote) this.hub.root.style.opacity = (1 - M.p(t, quote, 0.4, 'inOutCubic')).toFixed(3);
    M.rise(this.qt, t, quote + 0.35, { dy: 20 });
    M.fade(this.src, t, 1.2, 0.6);
    if (!this.geo) return;

    /* cases on the live clock: most stop at the threshold mark, a few cross it and travel to the hub */
    const on = M.p(t, flow, 0.8) * (1 - 0.7 * dimAll), L = M.abs(t);
    let arrive = 0;
    this.geo.forEach((s, i) => {
      M.draw(s.line, t, 1.0 + i * 0.07, 0.9);
      s.tick.style.opacity = (M.p(t, flow, 0.5) * (1 - 0.7 * dimAll)).toFixed(3);
      s.dots.forEach((c, j) => {
        const off = (i * 1.37 + j * this.PERIOD / this.SLOTS + M.noise(i * 11 + j) * 0.8) % this.PERIOD;
        const ph = (L + off) / this.PERIOD, n = Math.floor(ph), u = ph - n;
        const up = (n + i * 5 + j * 7) % 12 === 0;
        let f, o;
        if (up) {
          f = M.ease.inOutCubic(M.clamp(u / 0.8));
          o = M.clamp(u / 0.08) * (1 - M.clamp((u - 0.8) / 0.1));
          if (u > 0.7 && u < 0.95) arrive = Math.max(arrive, 1 - Math.abs(u - 0.82) / 0.13);
        } else {
          f = (this.THR - 16 / s.len) * M.ease.outCubic(M.clamp(u / 0.45));
          o = M.clamp(u / 0.08) * (1 - M.clamp((u - 0.55) / 0.2));
        }
        c.setAttribute('cx', (s.a[0] + s.u[0] * s.len * f).toFixed(1));
        c.setAttribute('cy', (s.a[1] + s.u[1] * s.len * f).toFixed(1));
        c.setAttribute('class', up ? 'up' : '');
        c.style.opacity = (o * on).toFixed(3);
      });
    });
    /* the hub glows as a case arrives */
    const g = Math.max(M.clamp(arrive) * on * (1 - dimAll), hubLit);
    this.hub.root.style.borderColor = g > 0.01 ? `rgba(255,206,74,${(0.16 + 0.5 * g).toFixed(3)})` : '';
    this.hub.root.style.boxShadow = g > 0.01 ? `0 0 60px -20px rgba(255,206,74,${(0.55 * g).toFixed(3)})` : '';
  },
});
