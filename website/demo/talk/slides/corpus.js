/* The corpus: AI regulation worldwide turned into controls. Jurisdictions pour in; one paragraph of law
   becomes one control; a wall of 1,718 cells (one per control) fills, June's 962 first and then the growth
   to October; finally the 406 obligations that take effect in 2026 light up.
   Figures: Akka regulation corpus, snapshot 2026-10 (research/corpus.md). */
registerSlide({
  id: 'corpus',
  act: 'principles',
  title: 'The law, as controls',
  beats: [
    { t: 1.6, say: "But first, a practical question. If governance is going to be controls, who turns the law into controls? We decided to do it ourselves, for AI regulation worldwide." },
    { t: 5.0, say: "Two hundred and forty-one frameworks, across thirty-eight jurisdictions. Binding regulation and regulator guidance, plus the standards your auditors use: NIST, ISO, OWASP and others. The EU, the US federal agencies, sixteen US states, the UK, Canada, Singapore, Brazil, and on." },
    { t: 8.6, say: "Each one is taken apart to the paragraph. Every obligation becomes a control, tied to the exact paragraph it comes from, in the law's own words. That matters. When an examiner asks why a control exists, the answer is a paragraph of law, not someone's summary of it." },
    { t: 15.0, say: "In June, our corpus held nine hundred and sixty-two controls. Today it holds one thousand seven hundred and eighteen, and one thousand six hundred and thirty-nine of them carry the law's verbatim text. Part of that growth is us covering more ground. Part of it is new law arriving. Nobody keeps up with that by reading." },
    { t: 18.0, say: "And look at when they bite. Four hundred and six of those obligations take effect this year, in 2026. More than any year before, and about double 2024. And a hundred and eight more are already scheduled for 2027." },
  ],

  /* corpus snapshot figures */
  N: 1718, JUNE: 962, VERBATIM: 1639,
  MONTHS: [['Jun', 962], ['Jul', 1043], ['Aug', 1211], ['Sep', 1369], ['Oct', 1718]],
  YEARS: [['2023', 81], ['2024', 213], ['2025', 192], ['2026', 406], ['2027', 108], ['2028', 6]],
  CHIPS: ['European Union', 'United States', 'California', 'United Kingdom', 'Canada', 'China', 'Hong Kong', 'Singapore',
    'NIST', 'Australia', 'Japan', 'India', 'Korea', 'ISO', 'Brazil', 'Chile', 'Mexico', 'Colombia', 'OWASP', 'Italy',
    'Saudi Arabia', 'South Africa', 'Taiwan', 'Turkey', 'Vietnam', 'Peru', '+15 US states'],
  G: { x: 150, y: 300, cols: 54, rows: 32, pitch: 18, cell: 13 },
  /* scene times */
  B: { chips: 1.9, chipsOut: 5.3, card: 5.9, cardOut: 9.0, june: [9.4, 1.3], grow: [11.0, 3.4], year: 15.3, bars: 16.0 },

  render(root) {
    const M = Mock, G = this.G;
    root.classList.add('sl-corpus', 'a3');
    M.style('sl-corpus', `
      .sl-corpus svg.grid { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-corpus .e { fill: none; stroke: rgba(241,241,241,.13); stroke-width: 1; }
      .sl-corpus .f { fill: rgba(241,241,241,.62); }
      .sl-corpus .n { fill: var(--yellow); }
      .sl-corpus .y6 { fill: var(--yellow); }
      .sl-corpus .dm { fill: rgba(241,241,241,.20); }
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
      .sl-corpus .yr { left: 1250px; top: 300px; width: 520px; }
      .sl-corpus .yr .big { font: 700 150px/.9 var(--sans); letter-spacing: -.045em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .sl-corpus .yr .l { margin: 18px 0 34px; font: 600 34px/1.2 var(--sans); color: var(--ink); }
      .sl-corpus .yr .row { display: grid; grid-template-columns: 90px minmax(0,1fr) 80px; align-items: center; gap: 16px; height: 52px; }
      .sl-corpus .yr .row span { font: 600 26px/1 var(--sans); color: var(--ink-2); font-variant-numeric: tabular-nums; }
      .sl-corpus .yr .row span:last-child { text-align: right; color: var(--ink); }
      .sl-corpus .yr .row i { display: block; height: 22px; border-radius: 4px; background: rgba(241,241,241,.45); transform-origin: 0 50%; }
      .sl-corpus .yr .row.on span { color: var(--yellow); } .sl-corpus .yr .row.on i { background: var(--yellow); }
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
    /* the 2026 cells: a deterministic 406 of them */
    const pick = cells.map((c, i) => [M.noise(i * 7.31 + 11), i]).sort((a, b) => a[0] - b[0]).slice(0, 406).map((x) => x[1]);
    const in26 = new Set(pick);
    let y6 = '', dm = '';
    cells.forEach((c, i) => { if (in26.has(i)) y6 += this.rect(c); else dm += this.rect(c); });
    this.svg = M.html(`<svg class="grid" viewBox="0 0 1920 1080">
      <path class="e" d="${acc}"/><g data-k="ga"><path class="f"/><path class="n"/></g><g data-k="gb"><path class="dm" d="${dm}"/><path class="y6" d="${y6}"/></g><path class="tw"/></svg>`);
    root.appendChild(this.svg);
    this.pe = this.svg.querySelector('.e'); this.pf = this.svg.querySelector('.f'); this.pn = this.svg.querySelector('.n');
    this.ga = this.svg.querySelector('[data-k=ga]'); this.gb = this.svg.querySelector('[data-k=gb]'); this.tw = this.svg.querySelector('.tw');

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
    this.yr = M.mount(root, `<div class="yr"><div class="big">406</div><div class="l">obligations take effect in 2026</div>
      ${this.YEARS.map(([y, n]) => `<div class="row${y === '2026' ? ' on' : ''}"><span>${y}</span><i></i><span>${n}</span></div>`).join('')}</div>`);
    this.yrows = [...this.yr.root.querySelectorAll('.row')];
    this.src = M.mount(root, `<div class="src tk-src">Source: Akka regulation corpus, snapshot 2026-10. 241 frameworks: regulation and regulator guidance, NIST, ISO, OWASP and other standards. Controls by effective year; 348 have no single date.</div>`).root;
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
    this.st.forEach((s, i) => M.rise(s.root, t, i < 2 ? B.chips : B.june[0] - 0.4, { opacity: 1 - M.p(t, B.year, 0.5) }));
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
    this.months.root.style.opacity = (1 - M.p(t, B.year, 0.6)).toFixed(3);

    /* 2026: the wall re-colours by effective year */
    const yp = M.p(t, B.year, 0.9, 'inOutCubic');
    this.ga.style.opacity = (1 - yp).toFixed(3);
    this.gb.style.opacity = yp.toFixed(3);
    this.gb.style.display = yp <= 0 ? 'none' : '';
    M.rise(this.yr.root, t, B.year + 0.3);
    this.yr.root.style.display = t < B.year ? 'none' : '';
    this.yrows.forEach((r, i) => {
      const w = this.YEARS[i][1] / 406;
      r.querySelector('i').style.transform = `scaleX(${(w * M.p(t, B.bars + i * 0.12, 0.8, 'outCubic')).toFixed(3)})`;
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
