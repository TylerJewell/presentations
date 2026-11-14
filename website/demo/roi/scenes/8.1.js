/* Scene 8.1: model spend. Cost per token drawn falling, with no scale, ending on Akka's own six-month result (the
   one number on the screen). Beside it, the six things that move cost per token; under both, the avoidable cost
   the console finds; then the two rules: a cheaper model only past the owner's quality bar, and the estimated
   saving kept beside what was measured. */
Roi.register({
  id: '8.1',

  DRIVERS: [['Volume', 'volume,'], ['Model mix', 'model'], ['Prompt size', 'prompt'], ['Cache use', 'cache'], ['Response size', 'response'], ['Price', 'price.']],
  AVOID: [['Prompts that skip the cache', 'prompts'], ['Failed attempts', 'failed'], ['Duplicate requests', 'duplicate'], ['Reasoning above the median', 'reasoning'], ['Unused tool definitions', 'unused'], ['Answers longer than needed', 'answers']],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { moves: at('moves'), drivers: this.DRIVERS.map(([, w]) => at(w)), console: at('console'), avoid: this.AVOID.map(([, w]) => at(w)), cheaper: at('cheaper'), ledger: at('ledger'), six: at('Over'), fell: at('fell') };
  },

  render(root) {
    root.classList.add('r81');
    Mock.style('r81', `
      .r81 .ro-head { width: 1300px; }
      .r81 .side { top: 290px; }
      .r81 svg.ch { left: 160px; top: 320px; width: 840px; height: 220px; overflow: visible; }
      .r81 .ch .ax { stroke: rgba(241,241,241,.3); stroke-width: 1.5; fill: none; }
      .r81 .ch .ln { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .r81 .ch text { font: 500 17px var(--sans); fill: var(--soft-grey); }
      .r81 .res { left: 700px; top: 330px; width: 300px; text-align: right; }
      .r81 .res .n { font: 700 56px/1 var(--sans); letter-spacing: -.035em; color: var(--yellow); }
      .r81 .res .l { margin-top: 8px; font: 500 18px/1.25 var(--sans); color: var(--soft-grey); }
      .r81 .ro-tile.d { height: 60px; font-size: 18px; }
      .r81 .ro-tile.a { height: 66px; font-size: 17px; }
      .r81 .rule { top: 700px; width: 780px; font: 500 22px/1.35 var(--sans); color: var(--white); text-wrap: pretty; }
      .r81 .rule b { color: var(--yellow); font-weight: 600; }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Model spend', headline: 'Cost per token is managed one driver at a time.', lit: null });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Cost per token</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1080px">What moves it</div>').root;
    const x0 = 40, y0 = 190, x1 = 540, y1 = 20;
    this.svg = M.html(`<svg class="ch" viewBox="0 0 840 220">
      <path class="ax" d="M${x0} ${y1 - 10} V${y0} H${x1 + 10}"/>
      <text x="${x0}" y="${y0 + 26}">Six months ago</text><text x="${x1 - 10}" y="${y0 + 26}" text-anchor="end">Now</text>
      <path class="ln" d="M${x0} ${y1 + 20} C ${x0 + 120} ${y1 + 20}, ${x0 + 160} ${y1 + 70}, ${x0 + 260} ${y1 + 80} S ${x0 + 420} ${y1 + 125}, ${x1} ${y1 + 135}"/>
    </svg>`);
    root.appendChild(this.svg);
    this.ln = this.svg.querySelector('.ln');
    this.res = M.mount(root, '<div class="res"><div class="n">73%</div><div class="l">lower cost per token, Akka’s own, over the last six months</div></div>').root;
    this.drivers = this.DRIVERS.map(([text], i) => { const el = Roi.tile(root, { x: 1080 + (i % 3) * 232, y: 330 + Math.floor(i / 3) * 76, w: 216, h: 60, text }); el.classList.add('d'); return el; });
    this.sideA = M.mount(root, '<div class="ro-side" style="left:160px;top:560px">Avoidable cost the console finds</div>').root;
    this.avoid = this.AVOID.map(([text], i) => { const el = Roi.tile(root, { x: 160 + i * 271, y: 594, w: 246, h: 66, text }); el.classList.add('a'); return el; });
    this.r1 = M.mount(root, '<div class="rule" style="left:160px">A cheaper model is proposed only when it meets a <b>quality bar the owner sets</b>.</div>').root;
    this.r2 = M.mount(root, '<div class="rule" style="left:1000px;width:760px">The ledger keeps the <b>estimated saving</b> beside what was measured.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    M.fade(this.svg, t, 0.6, 0.6);
    /* the line draws over the whole argument and lands on the result as it is spoken */
    M.draw(this.ln, t, K.moves - 0.2, K.fell - K.moves + 0.4, 'linear');
    M.rise(this.res, t, K.fell - 0.2);
    M.rise(this.sideR, t, K.moves - 0.4, { dy: 10 });
    this.drivers.forEach((el, i) => { M.rise(el, t, K.moves - 0.2 + i * 0.08); Roi.glow(el, Math.max(M.ramp(t, K.drivers[i] - 0.15, K.drivers[i] + 1.3, 0.25, 0.5), 0.35 * M.prog(t, K.console, 0.6))); });
    M.rise(this.sideA, t, K.console - 0.3, { dy: 10 });
    this.avoid.forEach((el, i) => { M.rise(el, t, K.console - 0.1 + i * 0.08); Roi.glow(el, Math.max(M.ramp(t, K.avoid[i] - 0.15, K.avoid[i] + 1.4, 0.25, 0.5), 0.35 * M.prog(t, K.cheaper, 0.6))); });
    M.rise(this.r1, t, K.cheaper - 0.3);
    M.rise(this.r2, t, K.ledger - 0.3);
  },
});
