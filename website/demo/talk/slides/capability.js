/* The systems keep compounding. METR's task-length trend drawn as a staircase on a log scale, each step
   one doubling: wide steps to 2023, then narrower and faster ones. OSWorld agent success fills from about
   12% to about 66% in one year, against the people line at 72%. Incidents count up. Then the weekly
   change that follows. Figures and sources: data/trends.js. */
registerSlide({
  id: 'capability',
  act: 'clocks',
  title: 'The systems keep compounding',
  beats: [
    { t: 1.4, say: "Now the other clock." },
    { t: 6.4, say: (T) => `METR, an independent research group, measures how long a task an AI agent can finish on its own, counted in how long the same task takes a skilled person. Each step on this chart is a doubling. From 2019 to 2025 that length doubled about every ${T.metr.doublingAll}. For models since 2023, ${T.metr.doublingRecent}. The steps are getting shorter. METR is careful to say these are mostly software, machine-learning and security tasks. But the direction isn't in doubt.` },
    { t: 9.8, say: (T) => `Stanford's AI Index tracks agents doing real work on a computer: opening applications, filling in forms, finishing multi-step tasks. Success went from about ${T.osworld.from} percent to about ${T.osworld.to} percent in a single year. People score about ${T.osworld.human}. That isn't a chatbot getting better at conversation. That's software operating other software.` },
    { t: 12.6, say: (T) => `These systems don't just answer any more. They act. And the same report counted ${T.incidents.y2025} documented AI incidents in 2025, up from ${T.incidents.y2024} the year before. More capable systems, doing more, in more places, with more of it going wrong in public.` },
    { t: 15.4, say: "So the systems you govern change every week: a new model, a new prompt, a new tool, a new data source. Each one changes what the system can do, and very few of those changes ever pass in front of anyone in this room." },
  ],

  /* chart frame */
  CX: 260, CW: 840, CY: 300, CH: 560,
  B: { metr: 1.8, os: 6.8, inc: 10.0, week: 12.8 },

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
      .sl-cap .yl { left: 150px; top: 262px; width: 900px; font: 600 var(--t-label)/1.25 var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2); }
      .sl-cap .ann { font: 700 34px/1.12 var(--sans); letter-spacing: -.01em; white-space: nowrap; }
      .sl-cap .ann small { display: block; font: 500 26px/1.3 var(--sans); letter-spacing: 0; color: var(--ink-2); }
      .sl-cap .src1 { left: 150px; top: 948px; width: 960px; }
      .sl-cap .tile { left: 1190px; width: 580px; padding: 30px 34px; }
      .sl-cap .tile .k { font: 700 32px/1.15 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-cap .tile .k small { display: block; font: 500 24px/1.3 var(--sans); color: var(--ink-2); margin-top: 4px; }
      .sl-cap .tile .big { margin-top: 12px; font: 700 100px/1 var(--sans); letter-spacing: -.045em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .sl-cap .tile .big span { font-size: 56px; letter-spacing: -.02em; color: var(--ink-2); margin-left: 14px; }
      .sl-cap .trk { position: relative; height: 34px; margin-top: 22px; border-radius: 8px; background: rgba(241,241,241,.10); }
      .sl-cap .trk .was { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 8px 0 0 8px; background: rgba(241,241,241,.5); }
      .sl-cap .trk .fill { position: absolute; top: 0; bottom: 0; background: linear-gradient(90deg, rgba(255,206,74,.6), var(--yellow)); border-radius: 0 8px 8px 0; box-shadow: 0 0 30px rgba(255,206,74,.45); }
      .sl-cap .trk .hum { position: absolute; top: -12px; bottom: -12px; width: 4px; margin-left: -2px; background: var(--ink); }
      .sl-cap .hl { position: relative; height: 34px; margin-top: 8px; font: 600 24px/34px var(--sans); color: var(--ink); white-space: nowrap; }
      .sl-cap .hl span { position: absolute; transform: translateX(-50%); }
      .sl-cap .bars { margin-top: 18px; display: grid; grid-template-columns: 80px minmax(0, 1fr) 100px; gap: 14px 16px; align-items: center; font: 600 28px/1 var(--sans); color: var(--ink-2); font-variant-numeric: tabular-nums; }
      .sl-cap .bars .b { height: 30px; border-radius: 0 8px 8px 0; transform-origin: 0 50%; }
      .sl-cap .bars .v { text-align: right; color: var(--ink); font-size: 34px; }
      .sl-cap .tile .tk-src { margin-top: 18px; }
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
    for (let k = 0; k <= Math.floor(n); k++) M.svg('line', { class: 'grid', x1: CX, x2: CX + CW, y1: yAt(k), y2: yAt(k) }, svg);
    M.svg('line', { class: 'axis', x1: CX, x2: CX + CW, y1: y0, y2: y0 }, svg);
    M.svg('line', { class: 'axis', x1: CX, x2: CX, y1: CY - 10, y2: y0 }, svg);
    [2019, 2021, 2023, 2025].forEach((yr) => { const tx = M.svg('text', { class: 'yrs', x: mx(yr), y: y0 + 44, 'text-anchor': 'middle' }, svg); tx.textContent = yr; });
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
    this.gB = M.svg('path', { class: 'glow', d: Bs.d }, svg);
    this.sA = M.svg('path', { class: 'stairA', d: A.d }, svg);
    this.sB = M.svg('path', { class: 'stairB', d: Bs.d }, svg);
    this.end = [Bs.x, yAt(Bs.k)];
    this.halo = M.svg('circle', { class: 'halo', cx: Bs.x, cy: yAt(Bs.k), r: 12 }, svg);
    this.tip = M.svg('circle', { class: 'tip', cx: Bs.x, cy: yAt(Bs.k), r: 10 }, svg);
    this.yl = M.mount(main, `<div class="yl">Task length, log scale · each step doubles</div>`).root;
    this.annA = M.mount(main, `<div class="ann" style="left:${CX + 40}px;top:${yAt(4.6) - 40}px">Every ${T.metr.doublingAll}<small>${T.metr.doublingAllSpan}</small></div>`).root;
    this.annB = M.mount(main, `<div class="ann" style="left:${mx(2023) - 330}px;top:${yAt(12.4) - 30}px;color:var(--yellow);text-align:right;width:300px">Every ${T.metr.doublingRecent.replace('about ', '~')}<small>${T.metr.doublingRecentSpan}</small></div>`).root;
    this.src1 = M.mount(main, `<div class="src1 tk-src">Drawn from METR's estimated doubling times (7 months, 2019–2025; ${T.metr.doublingRecentDays} days, models since 2023). ${T.metr.caveat}. ${T.metr.source}</div>`).root;

    /* OSWorld */
    this.os = M.mount(main, `<div class="tile tk-card" style="top:290px">
      <div class="k">Real computer tasks completed<small>By AI agents, OSWorld, in one year</small></div>
      <div class="big" data-k="big">${T.osworld.from}%</div>
      <div class="trk"><div class="was" style="width:${T.osworld.from}%"></div><div class="fill" data-k="fill" style="left:${T.osworld.from}%"></div><div class="hum" style="left:${T.osworld.human}%"></div></div>
      <div class="hl"><span style="left:${T.osworld.human}%">People ${T.osworld.human}%</span></div>
      <div class="tk-src">${T.osworld.source}</div></div>`);

    /* incidents */
    const mxI = T.incidents.y2025;
    this.inc = M.mount(main, `<div class="tile tk-card" style="top:716px">
      <div class="k">Documented AI incidents</div>
      <div class="bars"><span>2024</span><div class="b" data-k="b4" style="width:${(100 * T.incidents.y2024) / mxI}%;background:rgba(241,241,241,.55)"></div><span class="v" data-k="v4">0</span>
        <span>2025</span><div class="b" data-k="b5" style="width:100%;background:var(--yellow)"></div><span class="v" data-k="v5">0</span></div>
      <div class="tk-src">${T.incidents.source}</div></div>`);

    /* every week */
    const wk = (this.wk = M.html('<div class="wk"></div>'));
    root.appendChild(wk);
    this.say = M.mount(wk, `<div class="say tk-h xl">Your system changes<br><span class="tk-y">every week.</span></div>`).root;
    this.chips = ['New model', 'New prompt', 'New tool', 'New data source'].map((c) => c);
    this.chipEl = M.mount(wk, `<div class="chips">${this.chips.map((c) => `<span class="tk-chip">${c}</span>`).join('')}</div>`);
    this.chipEls = [...this.chipEl.root.children];
  },

  at(t) {
    const M = Mock, B = this.B, T = window.TRENDS, Lv = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    const away = M.p(t, B.week, 0.6, 'inOutCubic');
    this.main.style.opacity = (1 - 0.9 * away).toFixed(3);
    this.main.style.filter = away > 0.01 ? `blur(${(4 * away).toFixed(2)}px)` : 'none';

    /* METR */
    M.fade(this.svg, t, 0.3, 0.6);
    M.fade(this.yl, t, 0.5, 0.6);
    const a = M.draw(this.sA, t, B.metr, 2.0, 'linear');
    M.draw(this.sB, t, B.metr + 2.0, 1.6, 'linear');
    M.draw(this.gB, t, B.metr + 2.0, 1.6, 'linear');
    const done = M.prog(t, B.metr + 3.6, 0.2), w = M.wave(Lv, 1.6);
    this.tip.style.opacity = done;
    this.halo.setAttribute('r', (12 + 20 * w).toFixed(1));
    this.halo.style.opacity = (done * 0.7 * (1 - w)).toFixed(3);
    M.rise(this.annA, t, B.metr + 1.2, { dy: 12 });
    M.rise(this.annB, t, B.metr + 3.0, { dy: 12 });
    M.fade(this.src1, t, B.metr + 0.4, 0.6);

    /* OSWorld: the fill races from 12 to 66 against the people line */
    M.rise(this.os.root, t, B.os);
    const op = M.ease.inOutCubic(M.prog(t, B.os + 0.6, 1.8));
    const v = M.lerp(T.osworld.from, T.osworld.to, op);
    Talk.htm(this.os.big, `${Math.round(v)}%<span>from ${T.osworld.from}%</span>`);
    this.os.fill.style.width = (v - T.osworld.from).toFixed(2) + '%';
    this.os.fill.style.opacity = op > 0 ? 1 : 0;

    /* incidents */
    M.rise(this.inc.root, t, B.inc);
    const ip = M.ease.outCubic(M.prog(t, B.inc + 0.5, 1.4));
    this.inc.b4.style.transform = `scaleX(${ip.toFixed(4)})`;
    this.inc.b5.style.transform = `scaleX(${M.ease.outCubic(M.prog(t, B.inc + 0.8, 1.4)).toFixed(4)})`;
    Talk.txt(this.inc.v4, String(Math.round(T.incidents.y2024 * ip)));
    Talk.txt(this.inc.v5, String(Math.round(T.incidents.y2025 * M.ease.outCubic(M.prog(t, B.inc + 0.8, 1.4)))));

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
