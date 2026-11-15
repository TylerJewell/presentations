/* Oversight is measured, not assumed. Three sourced figures in turn, then the loan system's S3 control:
   a week of underwriting reviews drawn as bars of review time crosses the limit set in advance (more than
   one in ten under 8 seconds); the case goes to the risk officer, who sets a minimum review time; a
   decision made sooner is refused. The grammar of the person-decides slide: a live measure, a limit set
   in advance, the system acting as set, a named person deciding. Review times are illustrative. */
registerSlide({
  id: 'measured',
  act: 'principles',
  title: 'Oversight is measured, not assumed',
  beats: [
    { t: 1.8, say: "Eighth, and last: oversight is measured, not assumed. A person in the loop is only as good as their attention. People accept ninety-three percent of the permission prompts an AI agent shows them." },
    { t: 3.2, say: "Across a hundred and six experiments, people working with AI did worse than the better of the two alone." },
    { t: 4.6, say: "So the newest guidance measures the reviewers. Singapore now asks firms to track override rates and response times." },
    { t: 8.4, say: "Our loan system does that for its underwriters. Here is a week of reviews, each bar the time from opening the case to deciding it. When more than one review in ten takes under eight seconds, faster than anyone can read the case, the control fires." },
    { t: 11.8, say: "The limit was set in advance, as part of the control. The case goes to the risk officer, who decides what happens next: here, a minimum review time, recorded with the officer's name." },
    { t: 14.2, say: "From then on, a decision made sooner than that is refused. The system can measure its own oversight. It doesn't get to assume it." },
  ],

  FIG: [
    { v: '93%', l: 'of an AI agent’s permission prompts are accepted.', s: 'Anthropic Engineering (Claude Code)' },
    { v: '106', l: 'experiments: people working with AI did worse than the better of the two alone.', s: 'Vaccaro, Almaatouq &amp; Malone, 2024 · Hedges’ g&nbsp;=&nbsp;−0.23' },
    { v: 'Singapore', l: 'now asks firms to track override rates and response times.', s: 'Model AI Governance Framework for Agentic AI v1.5, 20 May 2026' },
  ],
  /* the chart: review time in seconds over the last 7 days; its right end holds the next decision */
  P: { x0: 360, x1: 1160, y0: 330, y1: 800, max: 75, rush: 8, min: 20, next: 180 },
  N: 46, RUSHED: [4, 11, 18, 26, 33, 40],
  /* scene times */
  B: { out: 5.0, chart: 5.4, bars: 5.7, line: 6.9, red: 7.2, read: 7.3, card: 8.6, opts: 9.6, click: 10.6, rec: 11.0, min: 12.0, try: 12.6, refuse: 13.2 },

  render(root) {
    Act3.mark(root, 8);
    const M = Mock, P = this.P;
    root.classList.add('sl-ms', 'a3');
    const y = (v) => P.y1 - (v / P.max) * (P.y1 - P.y0);
    this.y = y;
    M.style('sl-ms', `
      .sl-ms .fig { top: 300px; width: 506px; height: 470px; padding: 40px 38px; display: flex; flex-direction: column; }
      .sl-ms .fig .v { font: 700 120px/.95 var(--sans); letter-spacing: -.045em; color: var(--yellow); }
      .sl-ms .fig .v.sm { font-size: 84px; line-height: 1.1; }
      .sl-ms .fig .l { margin-top: 26px; font: 500 34px/1.25 var(--sans); color: var(--ink); text-wrap: pretty; }
      .sl-ms .fig .s { margin-top: auto; font: 500 21px/1.3 var(--sans); color: var(--ink-3); }
      .sl-ms svg.ch { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-ms .ax { stroke: rgba(241,241,241,.3); stroke-width: 2; }
      .sl-ms .bar { fill: rgba(241,241,241,.55); }
      .sl-ms .bar.r { fill: var(--red); }
      .sl-ms .lim { stroke: #f1f1f1; stroke-width: 3; stroke-dasharray: 10 8; opacity: .85; }
      .sl-ms .mn { stroke: var(--yellow); stroke-width: 3; stroke-dasharray: 10 8; }
      .sl-ms .try { fill: var(--red); }
      .sl-ms .ck { white-space: nowrap; font: 600 25px/1 var(--sans); color: var(--ink-2); letter-spacing: .12em; text-transform: uppercase; }
      .sl-ms .ll { white-space: nowrap; font: 600 25px/1 var(--sans); color: var(--ink); }
      .sl-ms .ll.y { color: var(--yellow); }
      .sl-ms .rd { left: 150px; top: 236px; display: flex; align-items: baseline; gap: 18px; white-space: nowrap; }
      .sl-ms .rd .v { font: 700 64px/1 var(--sans); letter-spacing: -.03em; color: var(--red); font-variant-numeric: tabular-nums; }
      .sl-ms .rd .t { font: 600 28px/1 var(--sans); color: var(--ink); }
      .sl-ms .rd .t span { color: var(--ink-2); }
      .sl-ms .rf { white-space: nowrap; }
      .sl-ms .src { right: var(--gut); }
      .sl-ms .card { left: 1240px; top: 300px; width: 530px; height: 560px; padding: 30px 32px; }
      .sl-ms .card > * { position: relative; }
      .sl-ms .card .k { font: 600 24px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
      .sl-ms .card .held { margin-top: 18px; }
      .sl-ms .card .pre { margin-top: 18px; font: 500 30px/1.25 var(--sans); color: var(--ink); }
      .sl-ms .card .by { margin-top: 12px; font: 500 24px/1.25 var(--sans); color: var(--ink-2); }
      .sl-ms .opts { position: absolute; left: 32px; right: 32px; top: 296px; }
      .sl-ms .opt { height: 64px; margin-top: 10px; padding: 0 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px; font: 600 27px/1 var(--sans); color: var(--ink-2); box-shadow: inset 0 0 0 2px var(--line-2); white-space: nowrap; }
      .sl-ms .opt i { flex: none; width: 22px; height: 22px; border-radius: 50%; box-shadow: inset 0 0 0 2.5px var(--ink-3); }
      .sl-ms .opt em { margin-left: auto; font-style: normal; font-variant-numeric: tabular-nums; padding: 8px 12px; border-radius: 8px; box-shadow: inset 0 0 0 2px var(--line); }
      .sl-ms .opt.on { color: var(--ink); background: rgba(255,206,74,.12); box-shadow: inset 0 0 0 2px rgba(255,206,74,.8); }
      .sl-ms .opt.on i { box-shadow: inset 0 0 0 7px var(--yellow); }
      .sl-ms .opt.on em { color: var(--yellow); box-shadow: inset 0 0 0 2px rgba(255,206,74,.65); }
      .sl-ms .rec { left: 150px; top: 900px; width: 1620px; height: 84px; display: flex; align-items: center; gap: 26px; padding: 0 28px; }
      .sl-ms .rec .tm { font: 500 25px/1 var(--mono); color: var(--ink-3); }
      .sl-ms .rec .n { font: 600 30px/1 var(--sans); color: var(--ink); flex: 1; white-space: nowrap; }
      .sl-ms .rec .who { display: flex; align-items: center; gap: 12px; font: 600 28px/1 var(--sans); color: var(--yellow); white-space: nowrap; }
      .sl-ms .rec .who b { width: 44px; height: 44px; border-radius: 50%; background: var(--yellow); color: #111; display: flex; align-items: center; justify-content: center; font: 700 19px/1 var(--sans); }
      .sl-ms .rec .id { font: 500 24px/1 var(--mono); color: var(--ink-3); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Oversight is <span class="tk-y">measured, not assumed.</span>']);

    /* the three figures */
    this.figs = this.FIG.map((f, i) => {
      const el = M.html(`<div class="fig tk-card" style="left:${150 + i * 557}px"><div class="v${f.v.length > 4 ? ' sm' : ''}">${f.v}</div><div class="l">${f.l}</div><div class="s">${f.s}</div></div>`);
      root.appendChild(el);
      return el;
    });

    /* the week of reviews: one bar per review, the rushed ones under 8 s */
    const pitch = (P.x1 - P.x0 - 30 - P.next) / (this.N - 1), bw = 10;
    this.bars = Array.from({ length: this.N }, (_, i) => {
      const rushed = this.RUSHED.includes(i);
      const v = rushed ? 2.5 + 4.5 * M.noise(i * 3.1 + 7) : 15 + 42 * M.noise(i * 1.7 + 2);
      return { x: P.x0 + 20 + i * pitch, v, rushed };
    });
    const tryX = P.x1 - P.next / 2;
    this.svg = M.html(`<svg class="ch" viewBox="0 0 1920 1080">
      <line class="ax" x1="${P.x0}" x2="${P.x0}" y1="${P.y0}" y2="${P.y1}"/><line class="ax" x1="${P.x0}" x2="${P.x1}" y1="${P.y1}" y2="${P.y1}"/>
      ${this.bars.map((b) => `<rect class="bar" x="${(b.x - bw / 2).toFixed(1)}" width="${bw}" rx="3"/>`).join('')}
      <rect class="try" x="${(tryX - bw / 2).toFixed(1)}" width="${bw}" rx="3"/>
      <line class="lim" x1="${P.x0}" x2="${P.x1}" y1="${y(P.rush)}" y2="${y(P.rush)}"/>
      <line class="mn" x1="${P.x0}" x2="${P.x1}" y1="${y(P.min)}" y2="${y(P.min)}"/></svg>`);
    root.appendChild(this.svg);
    this.rects = [...this.svg.querySelectorAll('.bar')];
    this.tryBar = this.svg.querySelector('.try');
    this.lim = this.svg.querySelector('.lim');
    this.mn = this.svg.querySelector('.mn');
    this.lab = M.mount(root, `<div><div class="ck" style="position:absolute;left:${P.x0 + 20}px;top:${P.y0 + 10}px">Underwriting reviews, last 7 days</div>
      <div class="ck" style="position:absolute;left:${this.bars[this.N - 1].x - 40}px;top:${P.y1 + 16}px">Now</div></div>`).root;
    /* the two lines are named in the margin left of the chart, clear of the bars */
    const margin = (cls, v, text) => M.mount(root, `<div class="ll${cls}" style="position:absolute;right:${1920 - P.x0 + 18}px;top:${y(v) - 13}px">${text}</div>`).root;
    this.limLab = margin('', P.rush, '8 seconds');
    this.mnLab = margin(' y', P.min, 'Minimum, 20 s');
    this.rd = M.mount(root, `<div class="rd"><span class="v" data-k="v">0%</span><span class="t">of reviews under 8 seconds <span>· the limit is 10%</span></span></div>`);
    this.rf = M.mount(root, `<span class="rf tk-chip bad" style="position:absolute;left:${tryX - 66}px;top:${y(P.min) - 70}px">Refused</span>`).root;

    /* the case, and the risk officer's decision */
    this.card = M.mount(root, `<div class="card tk-card">
      <div class="k">Rushed reviews</div>
      <div class="held"><span class="tk-chip y" data-k="chip">Raised</span></div>
      <div class="pre">Sent to the risk officer</div>
      <div class="by">The limit set in advance: more than 10% of reviews under 8 seconds in 7 days</div>
      <div class="opts" data-k="opts"><div class="k">What happens next</div>
        <div class="opt" data-k="o0"><i></i>Acknowledge</div>
        <div class="opt" data-k="o1"><i></i>Minimum review time<em>20 s</em></div>
        <div class="opt" data-k="o2"><i></i>Escalate</div></div></div>`);
    this.rec = M.mount(root, `<div class="rec tk-card hot"><span class="tm">09:14:07</span><span class="n">Decision: minimum review time, 20 seconds</span>
      <span class="who"><b>RO</b>Risk officer</span><span class="id">risk-omar · custom-5a1e00000003</span></div>`).root;
    this.cursor = M.cursor(root);
    this.src = M.mount(root, `<div class="src tk-src">Loan Origination sample, control S3: it fires when more than 10% of at least 5 reviews decided in 7 days took under 8 s; a minimum review time refuses a decision made sooner. Review times are illustrative.</div>`).root;
  },

  at(t) {
    const M = Mock, P = this.P, B = this.B;
    Talk.linesAt(this.head, t, 0.1);

    /* the figures, one at a time; the earlier ones step back; all leave for the chart */
    const out = M.p(t, B.out, 0.5, 'inOutCubic');
    const figAt = [0.4, 2.0, 3.4];
    this.figs.forEach((f, i) => {
      const next = i < 2 ? M.p(t, figAt[i + 1], 0.5) : 0;
      M.rise(f, t, figAt[i], { dy: 18, opacity: (1 - 0.55 * next) * (1 - out) });
      f.style.display = out >= 1 ? 'none' : '';
    });

    /* the week of reviews draws on, day by day */
    const on = t >= B.chart;
    this.svg.style.display = on ? '' : 'none';
    M.fade(this.svg, t, B.chart, 0.5);
    M.fade(this.lab, t, B.chart, 0.5);
    const red = M.p(t, B.red, 0.5);
    this.bars.forEach((b, i) => {
      const g = M.p(t, B.bars + (i / this.N) * 1.2, 0.5, 'outCubic');
      const h = (P.y1 - this.y(b.v)) * g;
      const r = this.rects[i];
      r.setAttribute('y', (P.y1 - h).toFixed(1));
      r.setAttribute('height', Math.max(0, h).toFixed(1));
      r.setAttribute('class', b.rushed && red > 0.5 ? 'bar r' : 'bar');
      r.style.opacity = ((b.rushed ? 1 : 1 - 0.35 * red) * (1 - 0.45 * M.p(t, B.min, 0.6))).toFixed(3);
    });
    M.draw(this.lim, t, B.line, 0.6);
    this.lim.style.strokeDasharray = t >= B.line + 0.6 ? '10 8' : this.lim.style.strokeDasharray;
    M.rise(this.limLab, t, B.line + 0.3, { dy: 8 });
    M.rise(this.rd.root, t, B.read, { dy: 10 });
    const share = (this.RUSHED.length / this.N) * 100;
    M.countUp(this.rd.v, t, B.read, 0.8, 0, share, (v) => `${Math.round(v)}%`);

    /* raised to the risk officer, who decides */
    M.rise(this.card.root, t, B.card, { dy: 14 });
    const pulse = M.ramp(t, B.card, B.card + 1.2, 0.15, 0.8);
    this.card.chip.style.transform = `scale(${(1 + 0.15 * pulse).toFixed(3)})`;
    M.rise(this.card.opts, t, B.opts, { dy: 12 });
    this.card.o1.classList.toggle('on', t >= B.click);
    if (!this.oAt) this.oAt = M.rectOf(this.card.root.parentNode, this.card.o1);
    const o = this.oAt;
    this.cursor.at(t, [
      { t: B.opts + 0.5, x: o[0] + o[2] * 0.8, y: o[1] + 150, glide: 0.01 },
      { t: B.click, x: o[0] + 90, y: o[1] + o[3] * 0.55, click: true, glide: 0.8 },
      { t: B.click + 0.55, x: o[0] + 140, y: o[1] + 110, glide: 0.5, hide: true },
    ]);
    M.rise(this.rec, t, B.rec, { dy: 18 });

    /* from then on, a decision sooner than the minimum is refused */
    M.draw(this.mn, t, B.min, 0.7);
    if (t >= B.min + 0.7) this.mn.style.strokeDasharray = '10 8';
    M.rise(this.mnLab, t, B.min + 0.3, { dy: 8 });
    const tryH = (P.y1 - this.y(6)) * M.p(t, B.try, 0.4, 'outCubic');
    this.tryBar.setAttribute('y', (P.y1 - tryH).toFixed(1));
    this.tryBar.setAttribute('height', tryH.toFixed(1));
    this.tryBar.style.opacity = t < B.try ? 0 : 1;
    M.rise(this.rf, t, B.refuse, { dy: 10 });

    M.fade(this.src, t, B.chart + 0.4, 0.6);
  },
});
