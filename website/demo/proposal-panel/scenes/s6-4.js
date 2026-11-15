/* Scene 6.4: the decision applies and is kept. The five-step lifecycle rail with the person marker moving
   along it. At Applied the review's status reads Rejected; at Kept a verdict and a proof record slide into
   the record. The headline changes to the rule every human control follows. */
(function () {
  if ((window.Film && Film.human) || document.querySelector('script[data-fp-human]')) return;
  const s = document.createElement('script');
  s.src = document.currentScript.src.replace(/scenes\/s6-\d\.js(\?.*)?$/, 'lib/human.js');
  s.async = false; s.dataset.fpHuman = '1';
  document.head.appendChild(s);
})();
Film.register({
  id: '6.4',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { applied: at('applied'), closes: at('closes'), kept: at('kept'), who: at('who'), when: at('when'), why: at('why'), every: at('Every') };
  },

  render(root) {
    const M = Mock, E = Film.human.HELD;
    root.classList.add('s64');
    M.style('s64', `
      .s64 .head { left: var(--gutter); top: 100px; width: 1600px; }
      .s64 .head h2 { position: absolute; left: 0; top: 0; width: 1600px; }
      .s64 .rec { top: 600px; width: 440px; height: 210px; padding: 24px 28px; }
      .s64 .rec .eb { display: flex; align-items: center; gap: 14px; }
      .s64 .rec .nm { font-size: 30px; display: flex; align-items: center; gap: 14px; }
      .s64 .rec .nm .mono { font: 500 24px/1 var(--mono); color: var(--soft-grey); }
      .s64 .rec .ln { margin-top: 10px; font-size: 21px; }
      .s64 .rec .kv { margin-top: 14px; display: flex; flex-direction: column; gap: 7px; font: 500 21px/1.3 var(--sans); color: var(--soft-grey); }
      .s64 .rec .kv div { --g: 0; display: grid; grid-template-columns: 76px 1fr; gap: 12px; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .s64 .rec .kv b { color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); font-weight: 500; }
    `);
    M.dotGrid(root);
    this.head = M.mount(root, `<div class="head"><h2 class="fp-h" data-k="h1">The decision is applied and kept.</h2><h2 class="fp-h" data-k="h2">Every human control follows the same five steps.</h2></div>`);
    this.L = Film.human.lifecycle(root, { x0: 260, x1: 1660, y: 400 });
    this.cards = M.mount(root, `<div>
      <div class="fp-card rec" style="left:160px" data-k="review"><div class="eb">The review</div>
        <div class="nm">Release <span class="mono">${E.id}</span></div><div class="ln">${E.title}, overall score ${E.overall.toFixed(1)}.</div>
        <div style="margin-top:auto">${Film.chip('Rejected', { big: true })}</div></div>
      <div class="fp-card rec" style="left:740px" data-k="verdict"><div class="eb">Verdict</div>
        <div class="nm">A named person decided.</div><div class="ln">The sixth commitment was kept for this review.</div>
        <div style="margin-top:auto">${Film.chip('Upheld', { big: true })}</div></div>
      <div class="fp-card rec" style="left:1320px" data-k="proof"><div class="eb">Proof record</div>
        <div class="kv"><div data-k="who"><span>Who</span><b>Senior reviewer</b></div><div data-k="when"><span>When</span><b>11:42:08, after 14 s of review</b></div><div data-k="why"><span>Why</span><b>Year 2 and year 3 prices are not stated.</b></div></div></div></div>`);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), L = this.L, c = this.cards;
    const sw = M.p(t, K.every - 0.1, 0.6, 'inOutCubic');
    M.rise(this.head.h1, t, 0.1);
    this.head.h1.style.opacity = (1 - sw) * M.ease.css(M.prog(t, 0.1, 0.7));
    this.head.h2.style.opacity = sw;
    this.head.h2.style.transform = `translateY(${((1 - sw) * 14).toFixed(1)}px)`;
    M.draw(L.base, t, 0.4, 1.1, 'inOutCubic');
    L.steps.forEach((s, i) => M.rise(s, t, 0.6 + i * 0.12, { dy: 10 }));
    /* the marker: the first three steps are a recap, then Applied and Kept land on their words */
    const W = [[0, 1.2], [0, 1.9], [1, 2.6], [1, 3.1], [2, 3.8], [2, K.applied - 0.9], [3, K.applied], [3, K.kept - 0.9], [4, K.kept], [4, 1e9]];
    let p = -1;
    if (t >= W[0][1]) {
      p = 4;
      for (let i = 1; i < W.length; i++) {
        const [a, ta] = W[i - 1], [b, tb] = W[i];
        if (t < tb) { p = t >= ta ? M.lerp(a, b, M.ease.inOutCubic(M.prog(t, ta, tb - ta))) : a; break; }
      }
    }
    L.at(t >= K.every ? 4.5 : p);
    if (t >= K.every) L.steps.forEach((s) => s.style.setProperty('--g', M.p(t, K.every, 0.6).toFixed(3)));
    M.rise(c.review, t, K.closes - 0.2, { dy: 18 });
    M.rise(c.verdict, t, K.kept + 0.2, { dy: 18 });
    M.rise(c.proof, t, K.kept + 0.5, { dy: 18 });
    Film.glow(c.review, M.ramp(t, K.closes - 0.2, K.kept, 0.4, 0.5));
    Film.glow(c.verdict, M.ramp(t, K.kept + 0.2, K.who - 0.2, 0.4, 0.5));
    Film.glow(c.proof, M.ramp(t, K.who - 0.3, K.every, 0.4, 0.5));
    c.who.style.setProperty('--g', M.ramp(t, K.who - 0.1, K.when, 0.3, 0.3).toFixed(3));
    c.when.style.setProperty('--g', M.ramp(t, K.when - 0.1, K.why, 0.3, 0.3).toFixed(3));
    c.why.style.setProperty('--g', M.ramp(t, K.why - 0.1, K.every, 0.3, 0.4).toFixed(3));
  },
});
