/* Scene 8.1: model spend. The optimization loop: cost per token drawn falling, with no scale, ending on the token
   reduction effective optimizations reach (the one number on the screen). Under it, the avoidable cost Akka searches
   for; beside it, the experiments Akka runs; then the rule that an experiment is kept only when it improves the
   balance of cost, performance and quality. */
Roi.register({
  id: '8.1',

  DRIVERS: [['SLM training', 'SLM'], ['Self-hosted open-weight models', 'self-hosting'], ['Routing changes', 'routing'], ['Feedback to end users', 'feedback']],
  AVOID: [['Prompts that skip the cache', 'prompts'], ['Failed attempts', 'failed'], ['Duplicate requests', 'duplicate'], ['Reasoning above the median', 'reasoning'], ['Unused tool definitions', 'unused'], ['Answers longer than needed', 'answers']],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { loop: at('optimization'), moves: at('experiments'), drivers: this.DRIVERS.map(([, w]) => at(w)), console: at('search'), avoid: this.AVOID.map(([, w]) => at(w)), cheaper: at('balance'), fell: at('reductions') };
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
    this.F = Roi.frame(root, { eyebrow: 'Model spend', headline: 'Akka runs a loop that lowers the cost of tokens.', lit: null });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Cost per token</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1080px">Experiments</div>').root;
    const x0 = 40, y0 = 190, x1 = 540, y1 = 20;
    this.svg = M.html(`<svg class="ch" viewBox="0 0 840 220">
      <path class="ax" d="M${x0} ${y1 - 10} V${y0} H${x1 + 10}"/>
      <text x="${x0}" y="${y0 + 26}">Before</text><text x="${x1 - 10}" y="${y0 + 26}" text-anchor="end">After optimization</text>
      <path class="ln" d="M${x0} ${y1 + 20} C ${x0 + 120} ${y1 + 20}, ${x0 + 160} ${y1 + 70}, ${x0 + 260} ${y1 + 80} S ${x0 + 420} ${y1 + 125}, ${x1} ${y1 + 135}"/>
    </svg>`);
    root.appendChild(this.svg);
    this.ln = this.svg.querySelector('.ln');
    this.res = M.mount(root, '<div class="res"><div class="n">Up to 70%</div><div class="l">fewer tokens from effective optimizations</div></div>').root;
    this.drivers = this.DRIVERS.map(([text], i) => { const el = Roi.tile(root, { x: 1080 + (i % 2) * 344, y: 330 + Math.floor(i / 2) * 76, w: 330, h: 60, text }); el.classList.add('d'); return el; });
    this.sideA = M.mount(root, '<div class="ro-side" style="left:160px;top:560px">Avoidable cost Akka searches for</div>').root;
    this.avoid = this.AVOID.map(([text], i) => { const el = Roi.tile(root, { x: 160 + i * 271, y: 594, w: 246, h: 66, text }); el.classList.add('a'); return el; });
    this.r1 = M.mount(root, '<div class="rule" style="left:160px;width:1600px">Each experiment is kept only when it improves the <b>balance of cost, performance and quality</b>.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    M.fade(this.svg, t, 0.6, 0.6);
    /* the line draws over the whole argument and lands on the result as it is spoken */
    M.draw(this.ln, t, K.loop - 0.2, K.fell - K.loop + 0.4, 'linear');
    M.rise(this.res, t, K.fell - 0.2);
    M.rise(this.sideR, t, K.moves - 0.4, { dy: 10 });
    M.rise(this.sideA, t, K.console - 0.3, { dy: 10 });
    this.drivers.forEach((el, i) => { M.rise(el, t, K.moves - 0.2 + i * 0.08); Roi.glow(el, Math.max(M.ramp(t, K.drivers[i] - 0.15, K.drivers[i] + 1.3, 0.25, 0.5), 0.35 * M.prog(t, K.cheaper, 0.6))); });
    this.avoid.forEach((el, i) => { M.rise(el, t, K.console - 0.1 + i * 0.08); Roi.glow(el, Math.max(M.ramp(t, K.avoid[i] - 0.15, K.avoid[i] + 1.4, 0.25, 0.5), 0.35 * M.prog(t, K.cheaper, 0.6))); });
    M.rise(this.r1, t, K.cheaper - 0.3);
  },
});
