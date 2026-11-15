/* The systems keep compounding. METR's task-length trend drawn as a staircase on a log scale across the
   stage, each step one doubling: wide steps to 2023, then narrower and faster ones. Then the weekly
   change that follows. Figures and sources: data/trends.js. */
registerSlide({
  id: 'capability',
  act: 'clocks',
  title: 'The systems keep compounding',
  beats: [
    { t: 5.6, say: (T) => `Now the other clock. METR, an independent research group, measures how long a task an AI agent can finish on its own. From 2019 to 2025 that length doubled about every ${T.metr.doublingAll}, and for models since 2023, ${T.metr.doublingRecent}. These systems don't just answer any more. They act.` },
    { t: 8.4, say: "The systems you govern change every week: a new model, a new prompt, a new tool, a new data source. Each one changes what the system can do, and few of those changes pass in front of anyone in this room." },
  ],

  /* chart frame */
  CX: 300, CW: 1320, CY: 330, CH: 540,
  B: { metr: 1.0, week: 5.8 },

  render(root) {
    const M = Mock, T = window.TRENDS;
    root.classList.add('sl-cap');
    M.style('sl-cap', `
      .sl-cap .main, .sl-cap .wk { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-cap .main > *, .sl-cap .wk > * { position: absolute; }
      .sl-cap svg.ch { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-cap .grid { stroke: rgba(241,241,241,.10); stroke-width: 2; }
      .sl-cap .axis { stroke: rgba(241,241,241,.5); stroke-width: 3; }
      .sl-cap .stairA { fill: none; stroke: rgba(241,241,241,.85); stroke-width: 4; stroke-linejoin: round; }
      .sl-cap .stairB { fill: none; stroke: var(--yellow); stroke-width: 5; stroke-linejoin: round; }
      .sl-cap .glow { fill: none; stroke: rgba(255,206,74,.4); stroke-width: 20; filter: blur(9px); }
      .sl-cap .yrs { font: 600 26px var(--sans); fill: var(--ink-2); }
      .sl-cap .tip { fill: var(--yellow); }
      .sl-cap .halo { fill: none; stroke: var(--yellow); stroke-width: 3; }
      .sl-cap .yl { left: 150px; top: 262px; width: 1620px; white-space: nowrap; font: 600 var(--t-label)/1.25 var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); }
      .sl-cap .ann { font: 700 40px/1.12 var(--sans); letter-spacing: -.01em; white-space: nowrap; }
      .sl-cap .ann small { display: block; font: 500 28px/1.3 var(--sans); letter-spacing: 0; color: var(--ink-2); }
      .sl-cap .src1 { left: 150px; top: 978px; width: 1620px; }
      .sl-cap .wk .say { left: 150px; right: 150px; top: 360px; text-align: center; }
      .sl-cap .chips { left: 150px; right: 150px; top: 690px; display: flex; justify-content: center; gap: 26px; }
      .sl-cap .chips .tk-chip { font-size: 28px; padding: 16px 26px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['The systems <span class="tk-y">keep compounding.</span>']);
    const main = (this.main = M.html('<div class="main"></div>'));
    root.appendChild(main);

    /* METR: two doubling rates as a staircase on a log scale */
    const { CX, CW, CY, CH } = this;
    const m0 = 2019, m1 = 2026, mx = (yr) => CX + ((yr - m0) / (m1 - m0)) * CW;
    const dA = 7, dB = T.metr.doublingRecentDays / 30.44;           /* months per doubling */
    const nA = 48 / dA, nB = 36 / dB, n = nA + nB;
    const py = CH / (n + 0.6), y0 = CY + CH;
    const yAt = (k) => y0 - k * py;
    const svg = (this.svg = M.html('<svg class="ch" viewBox="0 0 1920 1080"></svg>'));
    main.appendChild(svg);
    const stair = (x0, k0, steps, w) => {
      let d = `M${x0.toFixed(1)},${yAt(k0).toFixed(1)}`, x = x0, k = k0;
      const whole = Math.floor(steps + 1e-6);
      for (let s = 0; s < whole; s++) { x += w; k += 1; d += ` H${x.toFixed(1)} V${yAt(k).toFixed(1)}`; }
      const rest = steps - whole;
      if (rest > 0.01) { x += w * rest; d += ` H${x.toFixed(1)}`; }
      return { d, x, k };
    };
    const wA = (dA / 84) * CW, wB = (dB / 84) * CW;
    const A = stair(CX, 0, nA, wA);
    const Bs = stair(A.x, Math.floor(nA), nB + (nA - Math.floor(nA)), wB);
    /* the grid runs to just past the staircase's last step */
    const gx = Math.max(CX + CW, Bs.x + 30);
    for (let k = 0; k <= Math.floor(n); k++) M.svg('line', { class: 'grid', x1: CX, x2: gx, y1: yAt(k), y2: yAt(k) }, svg);
    M.svg('line', { class: 'axis', x1: CX, x2: gx, y1: y0, y2: y0 }, svg);
    M.svg('line', { class: 'axis', x1: CX, x2: CX, y1: CY - 10, y2: y0 }, svg);
    [2019, 2021, 2023, 2025].forEach((yr) => { const tx = M.svg('text', { class: 'yrs', x: mx(yr), y: y0 + 44, 'text-anchor': 'middle' }, svg); tx.textContent = yr; });
    this.gB = M.svg('path', { class: 'glow', d: Bs.d }, svg);
    this.sA = M.svg('path', { class: 'stairA', d: A.d }, svg);
    this.sB = M.svg('path', { class: 'stairB', d: Bs.d }, svg);
    this.halo = M.svg('circle', { class: 'halo', cx: Bs.x, cy: yAt(Bs.k), r: 12 }, svg);
    this.tip = M.svg('circle', { class: 'tip', cx: Bs.x, cy: yAt(Bs.k), r: 10 }, svg);
    this.yl = M.mount(main, `<div class="yl">Length of task an AI agent finishes on its own · log scale · each step doubles</div>`).root;
    this.annA = M.mount(main, `<div class="ann" style="left:${CX + 60}px;top:${yAt(4.4) - 46}px">Every ${T.metr.doublingAll}<small>${T.metr.doublingAllSpan}</small></div>`).root;
    this.annB = M.mount(main, `<div class="ann" style="left:${mx(2023) - 420}px;top:${yAt(12.4) - 36}px;color:var(--yellow);text-align:right;width:380px">Every ${T.metr.doublingRecent.replace('about ', '~')}<small>${T.metr.doublingRecentSpan}</small></div>`).root;
    this.src1 = M.mount(main, `<div class="src1 tk-src">Drawn from METR's estimated doubling times (7 months, 2019–2025; ${T.metr.doublingRecentDays} days, models since 2023). ${T.metr.caveat}. ${T.metr.source}</div>`).root;

    /* every week */
    const wk = (this.wk = M.html('<div class="wk"></div>'));
    root.appendChild(wk);
    this.say = M.mount(wk, `<div class="say tk-h xl">Your system changes<br><span class="tk-y">every week.</span></div>`).root;
    this.chips = ['New model', 'New prompt', 'New tool', 'New data source'];
    this.chipEl = M.mount(wk, `<div class="chips">${this.chips.map((c) => `<span class="tk-chip">${c}</span>`).join('')}</div>`);
    this.chipEls = [...this.chipEl.root.children];
  },

  at(t) {
    const M = Mock, B = this.B, Lv = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    const away = M.p(t, B.week, 0.6, 'inOutCubic');
    this.main.style.opacity = (1 - 0.9 * away).toFixed(3);
    this.main.style.filter = away > 0.01 ? `blur(${(4 * away).toFixed(2)}px)` : 'none';

    /* METR */
    M.fade(this.svg, t, 0.3, 0.6);
    M.fade(this.yl, t, 0.5, 0.6);
    M.draw(this.sA, t, B.metr, 2.0, 'linear');
    M.draw(this.sB, t, B.metr + 2.0, 1.6, 'linear');
    M.draw(this.gB, t, B.metr + 2.0, 1.6, 'linear');
    const done = M.prog(t, B.metr + 3.6, 0.2), w = M.wave(Lv, 1.6);
    this.tip.style.opacity = done;
    this.halo.setAttribute('r', (12 + 20 * w).toFixed(1));
    this.halo.style.opacity = (done * 0.7 * (1 - w)).toFixed(3);
    M.rise(this.annA, t, B.metr + 1.2, { dy: 12 });
    M.rise(this.annB, t, B.metr + 3.0, { dy: 12 });
    M.fade(this.src1, t, B.metr + 0.4, 0.6);

    /* every week: the four kinds of change take turns lighting */
    this.wk.style.display = away > 0.001 ? '' : 'none';
    M.rise(this.say, t, B.week + 0.3);
    const lit = Math.floor(M.abs(t) / 1.1) % 4;
    this.chipEls.forEach((c, i) => {
      M.rise(c, t, B.week + 0.9 + i * 0.12, { dy: 14 });
      c.className = 'tk-chip' + (i === lit && t > B.week + 1.6 ? ' y' : '');
    });
  },
});
