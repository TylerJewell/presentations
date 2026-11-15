/* Scene 3.1: how the vendor charges. Two lines drawn against volume over a year: the consumption line rises with
   every request, token and trace; the Akka line is flat. A year-end note stands under each. No amounts. */
Roi.register({
  id: '3.1',

  CH: { x: 0, y: 0, w: 1000, h: 400 },   /* the chart, inside a 1000x400 layer at (160, 300) */

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { every: at('every'), grows: at('grows'), forecast: at('forecast.'), flat: at('flat'), known: at('no'), extra: at('extra') };
  },

  render(root) {
    root.classList.add('r31');
    Mock.style('r31', `
      .r31 .ro-head { width: 1200px; }
      .r31 svg.ch { left: 160px; top: 300px; width: 1000px; height: 400px; overflow: visible; }
      .r31 .ch .ax { stroke: rgba(241,241,241,.3); stroke-width: 1.5; fill: none; }
      .r31 .ch .ln { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .r31 .ch .ln.hs { stroke: var(--white); }
      .r31 .ch .ln.ak { stroke: var(--yellow); }
      .r31 .ch .tk { fill: var(--yellow); opacity: 0; }
      .r31 .ch text { font: 500 18px var(--sans); fill: var(--soft-grey); letter-spacing: .02em; }
      .r31 .ch text.nm { font: 600 22px var(--sans); fill: var(--white); }
      .r31 .ch text.nm.ak { fill: var(--yellow); }
      .r31 .bill { left: 1260px; width: 500px; padding: 22px 26px; border-radius: 14px; border: 1px solid rgba(241,241,241,.16); background: rgba(255,255,255,.025); }
      .r31 .bill .k { font: 600 14px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 12px; }
      .r31 .bill .t { font: 700 26px/1.2 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .r31 .bill .s { margin-top: 10px; font: 500 20px/1.35 var(--sans); color: var(--soft-grey); }
      .r31 .bill.ak { border-color: rgba(255,206,74,.45); }
      .r31 .bill.ak .t { color: var(--yellow); }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Licenses', headline: 'Consumption pricing against a flat annual fee.', lit: 1 });
    const C = this.CH, x0 = 60, y0 = C.h - 50, x1 = C.w - 40, y1 = 30;
    /* the consumption line: a gentle curve rising to the top right; the Akka line: flat at a low level */
    this.hs = `M${x0} ${y0 - 60} C ${x0 + 300} ${y0 - 90}, ${x0 + 600} ${y1 + 120}, ${x1} ${y1}`;
    this.ak = `M${x0} ${y0 - 110} H${x1}`;
    this.svg = M.html(`<svg class="ch" viewBox="0 0 ${C.w} ${C.h}">
      <path class="ax" d="M${x0} ${y1 - 10} V${y0} H${x1 + 10}"/>
      <text x="${x0}" y="${y0 + 32}">January</text><text x="${x1 - 80}" y="${y0 + 32}">December</text>
      <text x="${x0 - 14}" y="${y1}" text-anchor="end" transform="rotate(-90 ${x0 - 14} ${y1}) translate(-150 0)">Cost</text>
      <path class="ln hs" d="${this.hs}"/>
      ${[0.18, 0.36, 0.54, 0.72, 0.9].map(() => '<circle class="tk" r="7"/>').join('')}
      <path class="ln ak" d="${this.ak}"/>
      <text class="nm" x="${x1 - 10}" y="${y1 - 22}" text-anchor="end" data-k="nhs">Consumption pricing</text>
      <text class="nm ak" x="${x1 - 10}" y="${y0 - 124}" text-anchor="end" data-k="nak">Flat annual fee</text>
    </svg>`);
    root.appendChild(this.svg);
    this.lnHs = this.svg.querySelector('.ln.hs'); this.lnAk = this.svg.querySelector('.ln.ak');
    this.ticks = [...this.svg.querySelectorAll('.tk')];
    this.nHs = this.svg.querySelector('[data-k=nhs]'); this.nAk = this.svg.querySelector('[data-k=nak]');
    this.ticks.forEach((c, i) => { const p = this.lnHs.getPointAtLength(this.lnHs.getTotalLength() * [0.18, 0.36, 0.54, 0.72, 0.9][i]); c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); });
    this.b1 = M.mount(root, `<div class="bill" style="top:330px"><div class="k">Year end, consumption</div><div class="t">The bill grows as the system succeeds.</div>
      <div class="s">Every request, token and trace is charged, so the total is hard to forecast.</div></div>`).root;
    this.b2 = M.mount(root, `<div class="bill ak" style="top:540px"><div class="k">Year end, Akka</div><div class="t">The fee is flat, with no added Akka charges.</div>
      <div class="s">Extra use adds only the underlying hardware.</div></div>`).root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.fade(this.svg, t, 0.5, 0.6);
    /* the consumption line draws as every request, token and trace is named; each named thing is a tick on it */
    const dp = M.draw(this.lnHs, t, K.every - 0.2, K.grows - K.every + 0.6, 'linear');
    /* each tick appears as the line reaches it */
    this.ticks.forEach((c, i) => { const f = [0.18, 0.36, 0.54, 0.72, 0.9][i], on = M.prog(dp, f, 0.04); c.style.opacity = on.toFixed(3); c.style.transform = `scale(${(0.6 + 0.4 * on).toFixed(3)})`; c.style.transformOrigin = `${c.getAttribute('cx')}px ${c.getAttribute('cy')}px`; });
    this.nHs.style.opacity = M.prog(t, K.grows, 0.4).toFixed(3);
    M.rise(this.b1, t, K.grows + 0.2);
    M.draw(this.lnAk, t, K.flat - 0.1, 1.2, 'outCubic');
    this.nAk.style.opacity = M.prog(t, K.flat + 0.6, 0.4).toFixed(3);
    M.rise(this.b2, t, K.known - 0.3);
  },
});
