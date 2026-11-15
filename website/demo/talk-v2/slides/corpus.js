/* The corpus: AI regulation worldwide turned into controls. Jurisdictions pour in; one paragraph of law
   becomes one control; a wall of 1,718 cells (one per control) fills, June's 962 first and then the growth
   to October.
   Figures: Akka regulation corpus, snapshot 2026-10 (research/corpus.md). */
registerSlide({
  id: 'corpus',
  act: 'principles',
  title: 'The law, as controls',
  beats: [
    { t: 1.6, say: "First, a practical question: who turns the law into controls? We decided to do it ourselves, for AI regulation worldwide." },
    { t: 5.0, say: "It covers two hundred and forty-one frameworks across thirty-eight jurisdictions: binding regulation, regulator guidance, and the standards your auditors use, like NIST, ISO and OWASP. They run from the EU and sixteen US states to Singapore and Brazil." },
    { t: 8.6, say: "Each one is taken apart to the paragraph. Every obligation becomes a control, tied to the paragraph it comes from. When an examiner asks why a control exists, the answer is that paragraph of law." },
    { t: 15.0, say: "In June, our corpus held nine hundred and sixty-two controls. Today it holds seventeen hundred and eighteen, almost all in the law's own words. Part of that growth is wider coverage, and part is new law arriving." },
  ],

  /* corpus snapshot figures */
  N: 1718, JUNE: 962, VERBATIM: 1639,
  MONTHS: [['Jun', 962], ['Jul', 1043], ['Aug', 1211], ['Sep', 1369], ['Oct', 1718]],
  CHIPS: ['European Union', 'United States', 'California', 'United Kingdom', 'Canada', 'China', 'Hong Kong', 'Singapore',
    'NIST', 'Australia', 'Japan', 'India', 'Korea', 'ISO', 'Brazil', 'Chile', 'Mexico', 'Colombia', 'OWASP', 'Italy',
    'Saudi Arabia', 'South Africa', 'Taiwan', 'Turkey', 'Vietnam', 'Peru', '+15 US states'],
  G: { x: 150, y: 300, cols: 54, rows: 32, pitch: 18, cell: 13 },
  /* scene times */
  B: { chips: 1.9, chipsOut: 5.3, card: 5.9, cardOut: 9.0, june: [9.4, 1.3], grow: [11.0, 3.4] },

  render(root) {
    const M = Mock, G = this.G;
    root.classList.add('sl-corpus', 'a3');
    M.style('sl-corpus', `
      .sl-corpus svg.grid { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-corpus .e { fill: none; stroke: rgba(241,241,241,.13); stroke-width: 1; }
      .sl-corpus .f { fill: rgba(241,241,241,.62); }
      .sl-corpus .n { fill: var(--yellow); }
      .sl-corpus .tw { fill: #fff; }
      .sl-corpus .chip { left: 0; top: 0; font: 600 25px/1 var(--sans); padding: 14px 20px; border-radius: 999px; white-space: nowrap;
        background: #111114; box-shadow: inset 0 0 0 2px rgba(241,241,241,.30); color: var(--ink); }
      .sl-corpus .chip.std { color: var(--cyan); box-shadow: inset 0 0 0 2px rgba(0,219,221,.55); }
      .sl-corpus .stat { left: 1250px; width: 520px; }
      .sl-corpus .stat .v { font: 700 112px/1 var(--sans); letter-spacing: -.04em; color: var(--ink); font-variant-numeric: tabular-nums; }
      .sl-corpus .stat .l { margin-top: 10px; font: 600 26px/1.2 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
      .sl-corpus .stat .s { margin-top: 12px; font: 500 30px/1.25 var(--sans); color: var(--yellow); }
      .sl-corpus .para { left: 170px; top: 350px; width: 940px; padding: 40px 46px 38px; }
      .sl-corpus .para .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-corpus .para q { display: block; margin: 22px 0 30px; font: 500 35px/1.34 var(--sans); color: var(--ink); quotes: '“' '”'; }
      .sl-corpus .para q b { font-weight: 500; background: rgba(255,206,74,.22); box-shadow: 0 0 0 3px rgba(255,206,74,.22); border-radius: 4px; }
      .sl-corpus .para .ct { display: flex; align-items: center; gap: 18px; }
      .sl-corpus .para .ct svg { width: 48px; height: 48px; overflow: visible; }
      .sl-corpus .para .ct svg path { fill: none; stroke: var(--yellow); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; }
      .sl-corpus .para .ct .t { font: 700 32px/1.1 var(--sans); color: var(--yellow); }
      .sl-corpus .para .ct .t small { display: block; margin-top: 6px; font: 600 22px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
      .sl-corpus .months { left: 150px; top: 902px; width: 972px; display: flex; justify-content: space-between; }
      .sl-corpus .months span { font: 600 26px/1 var(--sans); color: var(--ink-3); font-variant-numeric: tabular-nums; }
      .sl-corpus .months span b { color: var(--ink); font-weight: 700; margin-left: 8px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['AI regulation worldwide, <span class="tk-y">as controls.</span>']);

    /* the wall: one cell per control, filled in a left-to-right pour */
    const cells = [];
    for (let i = 0; i < this.N; i++) {
      const c = i % G.cols, r = Math.floor(i / G.cols);
      cells.push({ x: G.x + c * G.pitch, y: G.y + r * G.pitch, k: c + 9 * M.noise(i * 1.37 + 3) });
    }
    cells.sort((a, b) => a.k - b.k);
    this.cells = cells;
    this.rect = (c) => `M${c.x},${c.y}h${G.cell}v${G.cell}h-${G.cell}z`;
    this.prefix = [''];
    let acc = '';
    cells.forEach((c) => { acc += this.rect(c); this.prefix.push(acc); });
    this.svg = M.html(`<svg class="grid" viewBox="0 0 1920 1080">
      <path class="e" d="${acc}"/><path class="f"/><path class="n"/><path class="tw"/></svg>`);
    root.appendChild(this.svg);
    this.pe = this.svg.querySelector('.e'); this.pf = this.svg.querySelector('.f'); this.pn = this.svg.querySelector('.n');
    this.tw = this.svg.querySelector('.tw');

    /* the jurisdictions and standards pouring in */
    const lay = { x: G.x, y: G.y + 14, row: 0 };
    this.chips = this.CHIPS.map((name, i) => {
      const el = M.html(`<div class="chip${['NIST', 'ISO', 'OWASP'].includes(name) ? ' std' : ''}">${name}</div>`);
      root.appendChild(el);
      const w = name.length * 13.2 + 44;
      if (lay.x + w > G.x + 990) { lay.row++; lay.x = G.x + (lay.row % 2) * 46; lay.y += 88; }
      const x = lay.x + 8 * (M.noise(i + 40) - 0.5), y = lay.y + 14 * (M.noise(i + 80) - 0.5);
      lay.x += w + 26;
      const a = M.noise(i + 5) * Math.PI * 2;
      return { el, x, y, fx: x + Math.cos(a) * 900, fy: y + Math.sin(a) * 700, d: M.noise(i + 9) * 1.6 };
    });

    this.para = M.mount(root, `<div class="para tk-card hot"><div class="k">EU AI Act · Article 14(1)</div>
      <q>High-risk AI systems shall be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be <b>effectively overseen by natural persons</b> during the period in which they are in use.</q>
      <div class="ct"><svg viewBox="0 0 64 64">${Talk.GLYPH.Human.map((p) => `<path d="${p}"/>`).join('')}</svg><div class="t">People can oversee the system while it runs<small>One control · tied to this paragraph</small></div></div></div>`);

    this.st = [
      M.mount(root, `<div class="stat" style="top:300px"><div class="v" data-k="v">0</div><div class="l">Frameworks</div></div>`),
      M.mount(root, `<div class="stat" style="top:478px"><div class="v" data-k="v">0</div><div class="l">Jurisdictions</div></div>`),
      M.mount(root, `<div class="stat" style="top:656px"><div class="v" data-k="v">0</div><div class="l">Controls, to the paragraph</div><div class="s" data-k="s">1,639 in the law’s own words</div></div>`),
    ];
    this.months = M.mount(root, `<div class="months">${this.MONTHS.map(([m, n]) => `<span>${m}<b>${Act3.int(n)}</b></span>`).join('')}</div>`);
    this.src = M.mount(root, `<div class="src tk-src">Source: Akka regulation corpus, snapshot 2026-10. 241 frameworks: regulation and regulator guidance, NIST, ISO, OWASP and other standards.</div>`).root;
  },

  at(t) {
    const M = Mock, B = this.B, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.fade(this.pe, t, 0.5, 1.0);

    /* jurisdictions fly in, float, then drop into the wall */
    this.chips.forEach((c, i) => {
      const p = M.p(t, B.chips + c.d, 1.1, 'outCubic');
      const out = M.p(t, B.chipsOut + i * 0.015, 0.6, 'inCubic');
      const fx = 3 * (M.wander(t, 0.25, i) - 0.5) * 6, fy = 3 * (M.wander(t, 0.22, i + 50) - 0.5) * 6;
      const x = M.lerp(c.fx, c.x, p) + fx, y = M.lerp(c.fy, c.y, p) + fy + out * 40;
      c.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(1 - 0.5 * out).toFixed(3)})`;
      c.el.style.opacity = (Math.min(1, p * 1.5) * (1 - out)).toFixed(3);
      c.el.style.display = p <= 0 || out >= 1 ? 'none' : '';
    });

    /* the counters */
    M.countUp(this.st[0].v, t, B.chips + 0.2, 2.6, 0, 241, Act3.int);
    M.countUp(this.st[1].v, t, B.chips + 0.4, 2.4, 0, 38, Act3.int);
    this.st.forEach((s, i) => M.rise(s.root, t, i < 2 ? B.chips : B.june[0] - 0.4));
    const n = t < B.grow[0] ? M.lerp(0, this.JUNE, M.p(t, B.june[0], B.june[1], 'inOutCubic'))
      : M.lerp(this.JUNE, this.N, M.p(t, B.grow[0], B.grow[1], 'inOutCubic'));
    Talk.txt(this.st[2].v, Act3.int(n));
    M.rise(this.st[2].s, t, B.grow[0] + B.grow[1] - 0.3, { dy: 10 });

    /* one paragraph of law becomes one control */
    const pin = M.p(t, B.card, 0.8), pout = M.p(t, B.cardOut, 0.6, 'inCubic');
    this.para.root.style.opacity = (M.ease.css(M.prog(t, B.card, 0.6)) * (1 - pout)).toFixed(3);
    this.para.root.style.transform = `translateY(${((1 - pin) * 26).toFixed(1)}px) scale(${(1 - 0.6 * pout).toFixed(3)})`;
    this.para.root.style.transformOrigin = '0 0';
    this.para.root.style.display = t < B.card || pout >= 1 ? 'none' : '';
    this.para.root.querySelectorAll('.ct svg path').forEach((p, k) => M.draw(p, t, B.card + 1.0 + k * 0.1, 0.6));

    /* the wall fills: June in white, the growth since in yellow */
    const k = Math.round(n);
    const kj = Math.min(k, this.JUNE);
    this.pf.setAttribute('d', this.prefix[kj]);
    this.pn.setAttribute('d', k > this.JUNE ? this.prefix[k].slice(this.prefix[this.JUNE].length) : '');
    /* months light as the wall passes each count */
    [...this.months.root.children].forEach((sp, i) => {
      const at = this.MONTHS[i][1];
      sp.style.opacity = (t >= B.june[0] ? (k >= at - 1 ? 1 : 0.35) : 0).toFixed(3);
      sp.style.color = k >= at - 1 && i > 0 ? 'var(--yellow)' : '';
    });

    /* a few cells always catching the light */
    if (k > 20) {
      let d = '';
      for (let j = 0; j < 18; j++) {
        const idx = Math.floor(M.noise(Math.floor(L * 1.5) * 31 + j) * k);
        d += this.rect(this.cells[idx]);
      }
      this.tw.setAttribute('d', d);
      this.tw.style.opacity = (0.25 + 0.35 * M.wave(L, 0.67)).toFixed(3);
    } else this.tw.setAttribute('d', '');

    M.fade(this.src, t, B.chips + 0.8, 0.6);
  },
});
