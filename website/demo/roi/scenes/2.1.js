/* Scene 2.1: customers report significant gains. One card per customer, in the customer's own units. The cards appear
   one at a time as the narration reaches each customer; earlier cards stay, and the grid re-lays itself as it
   fills (two columns to four cards, three to six, four beyond). Every card has the same form: the customer's name
   on one line, then one value per line, the first value large. Add a customer by adding one entry to CARDS and
   its sentence to the scene's `say` in scenes/index.js; `key` is the first word of that sentence. No source or
   date is shown; figures.json keeps the sources. */
Roi.register({
  id: '2.1',

  CARDS: [
    { who: 'Fox', logo: 'tubi', note: 'Fox', key: 'Fox', roi: ['down','Compute cost'], lines: [['150,000 → 22,000', 'cores, after porting from Python to Akka']] },
    { who: 'Verizon', logo: 'verizon', key: 'Verizon', roi: ['down','Cloud spend'], lines: [['70%', 'lower infrastructure and cloud costs, from actor-based concurrency']] },
    { who: 'Manulife', logo: 'manulife', key: 'Manulife', roi: ['up','Capacity'], lines: [['300%', 'more concurrency, after porting LangChain agents to Akka'], ['99%', 'fewer errors']] },
    { who: 'Swiggy', logo: 'swiggy', key: 'Swiggy', roi: ['up','Performance'], lines: [['144 ms → 71 ms', 'P99 prediction latency'], ['5,000+', 'predictions a second']] },
    { who: 'Dojo', logo: 'dojo', key: 'Dojo', roi: ['up','Delivery speed'], lines: [['Weeks', 'college graduates with no enterprise experience delivered a regulated AI system']] },
    { who: 'A major bank', key: 'major', roi: ['down','Modernization time'], lines: [['Months', 'a decades-old payments system, from mainframe to microservices']] },
  ],

  /* the corner takeaway follows the cards: each customer's outcome as its card appears */
  roiItems() {
    this.timing();
    return this.CARDS.map((c, i) => c.roi && { dir: c.roi[0], label: c.roi[1], t: this.K[i] }).filter(Boolean);
  },

  /* A logo replaces the name where akka.io has the customer's logo; each is sized to the same area, so a wide
     wordmark and a compact one carry the same weight. note names the parent where the logo is a subsidiary's (Tubi
     for Fox). A customer without a logo keeps its name. */
  whoHtml(c) {
    const L = c.logo && window.ROI_LOGOS && window.ROI_LOGOS[c.logo];
    if (!L) return `<div class="who">${c.who}</div>`;
    const h = Math.min(40, Math.sqrt(3712 / L.ratio));
    return `<div class="lg" aria-label="${c.who}"><div class="mk" style="height:${(h / 40 * 100).toFixed(1)}%">${L.svg}</div>${c.note ? `<span class="nt">${c.note}</span>` : ''}</div>`;
  },

  AREA: { x: 160, y: 236, w: 1600, h: 590, gap: 24 },

  timing() {
    if (this.K) return;
    this.K = this.CARDS.map((c) => Mock.captionAt(this, c.key));
  },

  /* the rect of card i when k cards are showing */
  rect(k, i) {
    const A = this.AREA, cols = k <= 4 ? 2 : k <= 6 ? 3 : 4, rows = Math.ceil(k / cols);
    const w = (A.w - (cols - 1) * A.gap) / cols, h = rows === 1 ? 340 : (A.h - (rows - 1) * A.gap) / rows;
    return { x: A.x + (i % cols) * (w + A.gap), y: A.y + Math.floor(i / cols) * (h + A.gap), w, h };
  },

  render(root) {
    root.classList.add('r21');
    Mock.style('r21', `
      .r21 .ro-card { --s: 1; padding: calc(var(--s) * 14px) calc(var(--s) * 18px); gap: 0; }
      .r21 .ro-card > * { flex: none; }
      .r21 .ro-card .who { font-size: calc(var(--s) * 24px); line-height: 1.1; white-space: nowrap; }
      .r21 .ro-card .lg { display: flex; align-items: center; gap: calc(var(--s) * 12px); height: calc(var(--s) * 40px); margin-bottom: calc(var(--s) * 8px); }
      .r21 .ro-card > .who { height: calc(var(--s) * 40px); margin-bottom: calc(var(--s) * 8px); display: flex; align-items: center; }
      .r21 .ro-card .lg .mk { height: 100%; display: flex; align-items: center; }
      .r21 .ro-card .lg svg { display: block; height: 100%; width: auto; filter: brightness(0) invert(.95); }
      .r21 .ro-card .lg .nt { font: 600 calc(var(--s) * 16px)/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--soft-grey); }
      .r21 .ro-card .ln { margin-top: calc(var(--s) * 8px); }
      .r21 .ro-card .ln .n { font: 700 calc(var(--s) * 28px)/1 var(--sans); letter-spacing: -.03em; color: var(--yellow); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .r21 .ro-card .ln.first .n { font-size: calc(var(--s) * 40px); }
      .r21 .ro-card .ln .l { margin-top: calc(var(--s) * 4px); font: 500 calc(var(--s) * 20px)/1.2 var(--sans); color: var(--soft-grey); }
    `);
    this.F = Roi.frame(root, { eyebrow: 'In practice', headline: 'Customers report significant gains.', lit: null });
    this.cards = this.CARDS.map((c) => Mock.mount(root, `<div class="ro-card">${this.whoHtml(c)}
      ${c.lines.map(([n, l], j) => `<div class="ln${j ? '' : ' first'}"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('')}</div>`));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* k cards are showing; the layout moves from k-1 to k over the new card's entrance */
    let k = 0;
    while (k < K.length && t >= K[k] - 0.4) k++;
    const move = k ? M.ease.inOutCubic(M.prog(t, K[k - 1] - 0.4, 0.7)) : 0;
    this.cards.forEach((card, i) => {
      const el = card.root;
      if (i >= k) { el.style.opacity = 0; return; }
      const to = this.rect(k, i), from = i < k - 1 ? this.rect(k - 1, i) : to;
      const r = { x: M.lerp(from.x, to.x, move), y: M.lerp(from.y, to.y, move), w: M.lerp(from.w, to.w, move), h: M.lerp(from.h, to.h, move) };
      /* content scales with the card, limited by its height so three value lines always fit */
      M.set(el, { left: r.x.toFixed(1) + 'px', top: r.y.toFixed(1) + 'px', width: r.w.toFixed(1) + 'px', height: r.h.toFixed(1) + 'px', '--s': M.clamp(Math.min(r.w / 382, r.h / 283), 1, 1.45).toFixed(3) });
      if (i === k - 1) M.rise(el, t, K[i] - 0.4); else el.style.transform = 'none', el.style.opacity = 1;
      const next = K[i + 1] != null ? K[i + 1] : this.duration;
      Roi.glow(el, Math.max(M.ramp(t, K[i] - 0.2, next - 0.1, 0.4, 0.6), 0.3 * M.prog(t, next - 0.2, 0.5)));
      [...el.querySelectorAll('.ln')].forEach((ln, j) => M.rise(ln, t, K[i] + 0.2 + j * 0.45, { dy: 8 }));
    });
  },
});
