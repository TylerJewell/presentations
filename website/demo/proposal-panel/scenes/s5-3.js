/* Scene 5.3: a measurement, not a decision. A dial from 0 to 1 titled "Toxicity score": the needle settles
   at 0.03 on a persona's answer, then at 0.81 on a second sample, with the reading counted under it. Two
   arrows leave the dial, one to a guardrail and one to the evaluator, and the fork is labelled "shared". */
Film.register({
  id: '5.3',

  CX: 600, CY: 580, R: 270,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const guard = at('guardrail'), evalr = at('evaluator'), both = at('Both');
    this.K = { s1: at('gives') + 0.2, s2: guard - 0.4, guard, evalr, both };
  },

  render(root) {
    root.classList.add('s53');
    Mock.style('s53', `
      .s53 .head { left: var(--gutter); top: 64px; width: 1600px; }
      .s53 .dial { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s53 .arc { fill: none; stroke: rgba(241,241,241,.22); stroke-width: 3; }
      .s53 .sweep { fill: none; stroke: var(--yellow); stroke-width: 5; stroke-linecap: round; filter: drop-shadow(0 0 8px rgba(255,206,74,.6)); }
      .s53 .tick { stroke: rgba(241,241,241,.35); stroke-width: 2; }
      .s53 .tick.big { stroke: rgba(241,241,241,.6); }
      .s53 .tl { font: 500 20px var(--sans); fill: var(--soft-grey); }
      .s53 .needle { stroke: var(--white); stroke-width: 3; stroke-linecap: round; filter: drop-shadow(0 0 6px rgba(241,241,241,.5)); }
      .s53 .hub { fill: #000; stroke: var(--white); stroke-width: 3; }
      .s53 .dial-eb { position: absolute; left: 400px; width: 400px; top: 184px; text-align: center; }
      .s53 .read { position: absolute; left: 350px; width: 500px; top: 606px; text-align: center; font: 700 84px/1 var(--sans); letter-spacing: -.04em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .s53 .smp { position: absolute; left: 300px; width: 600px; top: 712px; text-align: center; font: 500 24px/1.3 var(--sans); color: var(--soft-grey); }
      .s53 .smp span { position: absolute; left: 0; right: 0; }
      .s53 .fork { fill: none; stroke: rgba(241,241,241,.4); stroke-width: 2; }
      .s53 .fork.lit { stroke: var(--yellow); }
      .s53 .fdot { fill: var(--yellow); }
      .s53 .shared { position: absolute; left: 900px; width: 110px; top: 486px; text-align: center; }
      .s53 .shared .mk-eyebrow { --g: 0; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .s53 .dest { width: 580px; height: 186px; left: 1220px; }
      .s53 .dest .nm { font-size: 30px; }
      .s53 .dest .ln { margin-top: 8px; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">A classifier is a measuring instrument.</h2></div>`);
    const { CX, CY, R } = this;
    const svg = Mock.html('<svg class="dial" viewBox="0 0 1920 1080"></svg>');
    root.appendChild(svg);
    const pt = (v, r) => { const a = Math.PI * (1 - v); return [CX + r * Math.cos(a), CY - r * Math.sin(a)]; };
    this.pt = pt;
    this.arc = Mock.svg('path', { class: 'arc', d: `M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}` }, svg);
    this.ticks = [];
    for (let i = 0; i <= 20; i++) {
      const v = i / 20, big = i % 5 === 0, [x1, y1] = pt(v, R + 10), [x2, y2] = pt(v, R + (big ? 30 : 20));
      this.ticks.push(Mock.svg('line', { class: 'tick' + (big ? ' big' : ''), x1, y1, x2, y2 }, svg));
      if (big) {
        const [tx, ty] = pt(v, R + 58);
        const tl = Mock.svg('text', { class: 'tl', x: tx, y: ty + 7, 'text-anchor': 'middle' }, svg);
        tl.textContent = v === 0 ? '0' : v === 1 ? '1' : v.toFixed(2);
        this.ticks.push(tl);
      }
    }
    this.sweep = Mock.svg('path', { class: 'sweep', d: '' }, svg);
    this.needle = Mock.svg('line', { class: 'needle', x1: CX, y1: CY, x2: CX - R + 36, y2: CY }, svg);
    this.hub = Mock.svg('circle', { class: 'hub', cx: CX, cy: CY, r: 12 }, svg);
    /* the two arrows: from a fork right of the dial to each destination card */
    const F = [1000, 470];
    this.forks = {
      guard: Mock.svg('path', { class: 'fork', d: `M${F[0]} ${F[1]} C1090 470, 1090 400, 1206 400` }, svg),
      evalr: Mock.svg('path', { class: 'fork', d: `M${F[0]} ${F[1]} C1090 470, 1090 680, 1206 680` }, svg),
    };
    this.heads = {
      guard: Mock.svg('path', { class: 'fork', d: 'M1192 388 L1208 400 L1192 412' }, svg),
      evalr: Mock.svg('path', { class: 'fork', d: 'M1192 668 L1208 680 L1192 692' }, svg),
    };
    this.stem = Mock.svg('line', { class: 'fork', x1: CX + R + 60, y1: F[1], x2: F[0], y2: F[1] }, svg);
    this.fdot = Mock.svg('circle', { class: 'fdot', cx: F[0], cy: F[1], r: 7 }, svg);
    this.eb = Mock.mount(root, `<div class="mk-eyebrow dial-eb">Toxicity score</div>`).root;
    this.read = Mock.mount(root, `<div class="read" data-k="v">0.00</div>`).v;
    this.smp = Mock.mount(root, `<div class="smp"><span data-k="a">a persona's answer</span><span data-k="b">a second sample</span></div>`);
    this.shared = Mock.mount(root, `<div class="shared"><div class="mk-eyebrow" data-k="e">Shared</div></div>`);
    this.guard = Mock.mount(root, `<div class="fp-card dest" style="top:300px"><div class="eb">Guardrail</div><div class="nm">A guardrail can stop a response.</div><div class="ln">It reads the score before the answer goes on.</div></div>`).root;
    this.evalr = Mock.mount(root, `<div class="fp-card dest" style="top:590px"><div class="eb">Evaluator</div><div class="nm">The evaluator can judge a review.</div><div class="ln">It reads the same score after the work.</div></div>`).root;
  },

  /* the needle's value: a gentle damped settle from one reading to the next */
  value(t) {
    const K = this.K;
    const settle = (from, to, t0) => { const u = Math.max(0, t - t0); return to + (from - to) * Math.exp(-4.2 * u) * Math.cos((2 * Math.PI * u) / 1.3); };
    if (t < K.s1) return 0;
    if (t < K.s2) return settle(0, 0.03, K.s1);
    return settle(0.03, 0.81, K.s2);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), { CX, CY, R } = this;
    M.rise(this.head.h, t, 0.1);
    M.rise(this.eb, t, 0.5, { dy: 10 });
    M.draw(this.arc, t, 0.6, 1.4, 'inOutCubic');
    this.ticks.forEach((k, i) => (k.style.opacity = M.prog(t, 0.7 + i * 0.03, 0.3).toFixed(3)));
    const on = M.prog(t, 1.6, 0.5);
    [this.needle, this.hub].forEach((e) => (e.style.opacity = on.toFixed(3)));

    const v = M.clamp(this.value(t)), a = Math.PI * (1 - v);
    this.needle.setAttribute('x2', (CX + (R - 36) * Math.cos(a)).toFixed(1));
    this.needle.setAttribute('y2', (CY - (R - 36) * Math.sin(a)).toFixed(1));
    const [sx, sy] = this.pt(v, R);
    this.sweep.setAttribute('d', v > 0.002 ? `M${CX - R} ${CY} A${R} ${R} 0 0 1 ${sx.toFixed(1)} ${sy.toFixed(1)}` : '');
    this.sweep.style.opacity = on.toFixed(3);
    this.read.textContent = v.toFixed(2);
    this.read.style.opacity = on.toFixed(3);
    this.smp.a.style.opacity = M.ramp(t, K.s1 - 0.1, K.s2, 0.4, 0.3).toFixed(3);
    this.smp.b.style.opacity = M.prog(t, K.s2, 0.4).toFixed(3);

    /* the arrows draw as each reader of the score is named; both light when they are called the same */
    M.draw(this.stem, t, K.guard - 0.6, 0.5);
    this.fdot.style.opacity = M.prog(t, K.guard - 0.2, 0.3).toFixed(3);
    M.draw(this.forks.guard, t, K.guard - 0.1, 0.9);
    M.draw(this.forks.evalr, t, K.evalr - 0.1, 0.9);
    this.heads.guard.style.opacity = M.prog(t, K.guard + 0.7, 0.2).toFixed(3);
    this.heads.evalr.style.opacity = M.prog(t, K.evalr + 0.7, 0.2).toFixed(3);
    M.rise(this.guard, t, K.guard + 0.3);
    M.rise(this.evalr, t, K.evalr + 0.3);
    Film.glow(this.guard, M.ramp(t, K.guard + 0.2, K.evalr - 0.1, 0.4, 0.4));
    Film.glow(this.evalr, M.ramp(t, K.evalr + 0.2, K.both - 0.1, 0.4, 0.4));
    const both = M.p(t, K.both, 0.6, 'outCubic');
    [this.guard, this.evalr].forEach((c) => { if (both > 0) Film.glow(c, Math.max(parseFloat(c.style.getPropertyValue('--g')) || 0, 0.6 * both)); });
    ['guard', 'evalr'].forEach((k) => { this.forks[k].classList.toggle('lit', both > 0.5); this.heads[k].classList.toggle('lit', both > 0.5); });
    this.stem.classList.toggle('lit', both > 0.5);
    M.rise(this.shared.root, t, K.both - 0.2, { dy: 8 });
    this.shared.e.style.setProperty('--g', both.toFixed(3));
  },
});
