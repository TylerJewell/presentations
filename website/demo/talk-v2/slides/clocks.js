/* Two clocks. One origin; a yellow curve compounds away from it while a white stepped line climbs
   slowly and keeps splitting into more lines, some of which step back down. The space between them
   fills with light: that is where the audience works. */
registerSlide({
  id: 'clocks',
  act: 'open',
  title: 'Two clocks',
  beats: [
    { t: 1.6, say: "I want to start with two clocks. Everyone in this room watches both of them, and they run at very different speeds." },
    { t: 4.6, say: "The first clock is what AI can do. It compounds. Every few months these systems take on longer tasks, with less supervision, and more of the real work of the business." },
    { t: 8.4, say: "The second clock is the rules. They multiply: more jurisdictions, more laws, more guidance, and they don't line up with each other. One line becomes many, and some double back: a deadline that moves, a law repealed before it starts." },
    { t: 11.0, say: "Your job lives in the space between the two: keeping what the systems can do inside what the rules allow. This year that space got wider." },
  ],

  X0: 210, X1: 1730, Y0: 900,
  B: { cap: 2.0, rules: 5.2, gap: 8.8 },

  capY(u) { const k = 2.6; return this.Y0 - 20 - 600 * (Math.exp(k * u) - 1) / (Math.exp(k) - 1); },

  render(root) {
    const M = Mock;
    root.classList.add('sl-clk');
    M.style('sl-clk', `
      .sl-clk svg.ch { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-clk .ax { stroke: rgba(241,241,241,.45); stroke-width: 3; }
      .sl-clk .cap { fill: none; stroke: var(--yellow); stroke-width: 7; stroke-linecap: round; }
      .sl-clk .capg { fill: none; stroke: rgba(255,206,74,.35); stroke-width: 22; stroke-linecap: round; filter: blur(10px); }
      .sl-clk .rl { fill: none; stroke: #F1F1F1; stroke-width: 3.5; stroke-linejoin: round; }
      .sl-clk .gap { fill: url(#clkGap); }
      .sl-clk .o { fill: #000; stroke: var(--ink); stroke-width: 4; }
      .sl-clk .tip { fill: var(--yellow); }
      .sl-clk .halo { fill: none; stroke: var(--yellow); stroke-width: 3; }
      .sl-clk .lab { font: 700 44px/1.05 var(--sans); letter-spacing: -.02em; white-space: nowrap; }
      .sl-clk .lab small { display: block; font: 600 var(--t-label)/1.2 var(--sans); letter-spacing: .14em; text-transform: uppercase; margin-bottom: 8px; }
      .sl-clk .lab.c { color: var(--yellow); } .sl-clk .lab.c small { color: var(--yellow); }
      .sl-clk .lab.r { color: var(--ink); } .sl-clk .lab.r small { color: var(--ink-2); }
      .sl-clk .you { font: 700 48px/1.05 var(--sans); letter-spacing: -.03em; color: var(--ink); white-space: nowrap; text-shadow: 0 2px 30px rgba(0,0,0,.6); }
      .sl-clk .t0 { font: 600 var(--t-label)/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Two clocks.']);
    const svg = (this.svg = M.html(`<svg class="ch" viewBox="0 0 1920 1080"><defs>
      <linearGradient id="clkGap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(255,206,74,0)"/><stop offset=".55" stop-color="rgba(255,206,74,.14)"/><stop offset="1" stop-color="rgba(255,206,74,.30)"/></linearGradient></defs></svg>`));
    root.appendChild(svg);
    this.gap = M.svg('path', { class: 'gap' }, svg);
    this.ax = M.svg('line', { class: 'ax', x1: this.X0, x2: this.X1 + 40, y1: this.Y0, y2: this.Y0 }, svg);

    /* the rules: a trunk that splits; each line follows the trunk until it splits, then takes its own course */
    const STEP = 76, n = Math.ceil((this.X1 - this.X0) / STEP);
    const LINES = [
      { split: 99, rise: 0 },
      { split: 4, rise: 3, back: 5 },
      { split: 7, rise: 6 },
      { split: 7, rise: -3, back: 3 },
      { split: 10, rise: 4, back: 4 },
      { split: 12, rise: 8 },
      { split: 12, rise: 0, back: 2 },
      { split: 15, rise: 7, back: 3 },
      { split: 15, rise: -4 },
      { split: 17, rise: 3, back: 6 },
    ];
    this.rTop = new Array(n + 1).fill(this.Y0);
    this.rules = LINES.map((L, li) => {
      let x = this.X0, y = this.Y0 - 30, d = `M${x},${y}`;
      for (let s = 0; s < n; s++) {
        const nx = Math.min(this.X1, x + STEP);
        let dy;
        if (s < L.split) dy = 6;
        else if (L.back && (s - L.split) % L.back === L.back - 1) dy = -(10 + 5 * (li % 3));
        else dy = 6 + L.rise;
        const ny = y - dy;
        d += ` H${nx} V${ny}`;
        x = nx; y = ny;
        this.rTop[s + 1] = Math.min(this.rTop[s + 1], ny);
      }
      return { el: M.svg('path', { class: 'rl', d }, svg), L, endY: y };
    });
    this.rStep = STEP; this.rN = n;

    this.capG = M.svg('path', { class: 'capg' }, svg);
    this.cap = M.svg('path', { class: 'cap' }, svg);
    const pts = [];
    for (let k = 0; k <= 80; k++) { const u = k / 80; pts.push([M.lerp(this.X0, this.X1, u), this.capY(u)]); }
    const d = Talk.smooth(pts);
    this.cap.setAttribute('d', d); this.capG.setAttribute('d', d);
    this.halo = M.svg('circle', { class: 'halo', r: 12 }, svg);
    this.tip = M.svg('circle', { class: 'tip', r: 11 }, svg);
    this.origin = M.svg('circle', { class: 'o', cx: this.X0, cy: this.Y0 - 30, r: 11 }, svg);

    /* gap fill between the curve and the highest rule line, from where they part */
    let g = '';
    const u0 = 0.18;
    for (let k = 0; k <= 60; k++) { const u = u0 + (1 - u0) * k / 60; g += (k ? 'L' : 'M') + M.lerp(this.X0, this.X1, u).toFixed(1) + ',' + this.capY(u).toFixed(1); }
    for (let k = 60; k >= 0; k--) {
      const u = u0 + (1 - u0) * k / 60, x = M.lerp(this.X0, this.X1, u);
      const s = Math.min(this.rN, Math.floor((x - this.X0) / this.rStep));
      g += 'L' + x.toFixed(1) + ',' + (this.rTop[s] - 6).toFixed(1);
    }
    this.gap.setAttribute('d', g + 'Z');

    this.labC = M.mount(root, `<div class="lab c" style="left:1290px;top:236px"><small>Clock one</small>What AI can do</div>`).root;
    this.labR = M.mount(root, `<div class="lab r" style="left:560px;top:690px"><small>Clock two</small>The rules</div>`).root;
    this.you = M.mount(root, `<div class="you" style="left:1440px;top:578px">Your job<br>lives here.</div>`).root;
    this.t0 = M.mount(root, `<div class="t0" style="left:${this.X0 - 10}px;top:${this.Y0 + 26}px">Then</div>`).root;
    this.t1 = M.mount(root, `<div class="t0" style="left:${this.X1 - 40}px;top:${this.Y0 + 26}px">Now</div>`).root;
  },

  at(t) {
    const M = Mock, B = this.B, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.draw(this.ax, t, 0.3, 0.9);
    M.fade(this.origin, t, 0.6, 0.4);
    M.fade(this.t0, t, 0.8, 0.5);
    M.fade(this.t1, t, 1.0, 0.5);

    /* clock one compounds */
    const cp = M.draw(this.cap, t, B.cap, 2.2, 'inOutCubic');
    M.draw(this.capG, t, B.cap, 2.2, 'inOutCubic');
    if (!this._capLen) this._capLen = this.cap.getTotalLength();
    const tp = this.cap.getPointAtLength(this._capLen * Math.max(0.0001, cp));
    const w = M.wave(L, 1.6);
    [this.tip, this.halo].forEach((c) => { c.setAttribute('cx', tp.x.toFixed(1)); c.setAttribute('cy', tp.y.toFixed(1)); });
    this.tip.style.opacity = cp > 0 ? 1 : 0;
    this.halo.setAttribute('r', (12 + 22 * w).toFixed(1));
    this.halo.style.opacity = cp > 0.98 ? (0.7 * (1 - w)).toFixed(3) : 0;
    M.rise(this.labC, t, B.cap + 1.8);

    /* clock two multiplies: every line draws together, so they part where they split */
    this.rules.forEach((r, i) => {
      M.draw(r.el, t, B.rules, 2.6, 'linear');
      const settled = M.prog(t, B.rules + 2.6, 0.6);
      r.el.style.opacity = M.lerp(1, 0.55 + 0.35 * M.wave(L + i * 0.9, 5.5), settled).toFixed(3) * (M.prog(t, B.rules, 0.05));
    });
    M.rise(this.labR, t, B.rules + 2.3);

    /* the space between */
    const gp = M.p(t, B.gap, 1.4, 'inOutCubic');
    this.gap.style.opacity = (gp * (0.85 + 0.15 * M.wave(L, 3.2))).toFixed(3);
    this.gap.style.clipPath = `inset(0 ${((1 - gp) * 100).toFixed(1)}% 0 0)`;
    M.rise(this.you, t, B.gap + 0.9);
  },
});
