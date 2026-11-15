/* Scene 5.2: checking the answer. A reader's structured answer as a card with four fields; one score reads
   14 against the 0-to-10 scale and the review quality guard marks it in red-orange. On "rejects" a DENIED
   stamp lands on the guard, the answer is marked rejected, and the review's status changes to BLOCKED with
   the guard's reason; the four rules glow as they are named. A denial ends the review: nothing is retried. */
Film.register({
  id: '5.2',

  RULES: ['Every score is from 0 to 10.', 'The risk list is not empty.', 'The rationale is not empty.', 'The structure is complete.'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { checks: at('checks'), fourteen: at('fourteen'), rejects: at('rejects'), range: at('range'), risks: at('risks'), reasons: at('reasons') };
  },

  render(root) {
    root.classList.add('s52');
    Mock.style('s52', `
      .s52 .head { left: var(--gutter); top: 64px; width: 1600px; }
      .s52 .ans { left: 160px; top: 250px; width: 760px; height: 470px; padding: 28px 32px; }
      .s52 .ans .who { display: flex; align-items: baseline; gap: 16px; }
      .s52 .ans .who .nm { margin: 0; }
      .s52 .ans .who .as { font: 500 20px/1 var(--sans); color: var(--soft-grey); }
      .s52 .ans .st { position: absolute; right: 28px; top: 26px; }
      .s52 .ans .f { margin-top: 22px; display: grid; grid-template-columns: 150px 1fr; column-gap: 20px; align-items: baseline; }
      .s52 .ans .f .l { font: 600 18px/1.2 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .s52 .ans .f .v { font: 500 24px/1.3 var(--sans); color: var(--white); text-wrap: pretty; }
      .s52 .ans .sc { display: flex; gap: 28px; }
      .s52 .ans .sc span { font-variant-numeric: tabular-nums; }
      .s52 .ans .sc b { --r: 0; font-weight: 700; color: color-mix(in srgb, var(--red) calc(var(--r) * 100%), var(--white)); }
      .s52 .scale { margin-top: 10px; position: relative; height: 54px; }
      .s52 .scale .bar { position: absolute; left: 0; top: 10px; width: 360px; height: 4px; border-radius: 2px; background: rgba(241,241,241,.22); }
      .s52 .scale .tk { position: absolute; top: 24px; font: 500 18px/1 var(--sans); color: var(--soft-grey); transform: translateX(-50%); font-variant-numeric: tabular-nums; }
      .s52 .scale .mk { position: absolute; left: 504px; top: 2px; width: 20px; height: 20px; margin-left: -10px; border-radius: 50%; background: var(--red); box-shadow: 0 0 18px rgba(255,84,0,.7); }
      .s52 .scale .over { position: absolute; left: 360px; top: 10px; width: 160px; height: 4px; background: repeating-linear-gradient(90deg, rgba(255,84,0,.6) 0 6px, transparent 6px 12px); }
      .s52 .rules { left: 1000px; top: 250px; width: 760px; height: 470px; padding: 28px 32px; }
      .s52 .rules .eb { font-size: 20px; }
      .s52 .rules .nm { font-size: 34px; }
      .s52 .rules .stamp { position: absolute; right: 28px; top: 26px; transform-origin: center; }
      .s52 .rules .r { --g: 0; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 20px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--hair); }
      .s52 .rules .r:first-of-type { margin-top: 28px; }
      .s52 .rules .r .s { font: 500 26px/1.3 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s52 .rules .r .c { width: 120px; display: flex; justify-content: flex-end; }
      .s52 .status { left: 160px; top: 752px; width: 1600px; display: flex; align-items: center; gap: 20px; }
      .s52 .status .t { font: 500 26px/1.2 var(--sans); color: var(--white); }
      .s52 .status .why { font: 500 21px/1.2 var(--mono); color: var(--soft-grey); }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">A response guardrail checks the answer before it reaches the report.</h2></div>`);
    const P = Film.PERSONAS[0];
    this.ans = Mock.mount(root, `<div class="fp-card ans">
      <div class="eb">The answer</div>
      <div class="who"><div class="nm">${P.role}</div><div class="as">${P.as.toLowerCase()}</div></div>
      <div class="st" data-k="st"></div>
      <div class="f"><div class="l">Scores</div><div class="v sc"><span>Cost <b>7</b></span><span>Terms <b>8</b></span><span>Value <b data-k="bad">14</b></span></div></div>
      <div class="f"><div class="l"></div><div class="scale" data-k="scale"><div class="bar"></div><div class="over"></div>
        ${[0, 2, 4, 6, 8, 10].map((n) => `<div class="tk" style="left:${n * 36}px">${n}</div>`).join('')}<div class="mk"></div></div></div>
      <div class="f"><div class="l">Risks</div><div class="v">Incident volume above 40 tickets a month raises the price.<br>Year 2 pricing is not stated.</div></div>
      <div class="f"><div class="l">Rationale</div><div class="v">The retainer is within range for the scope, and the ticket cap is the main exposure.</div></div>
    </div>`);
    this.rules = Mock.mount(root, `<div class="fp-card rules"><div class="eb">Review quality guard</div><div class="nm">Four rules on every answer</div>
      <div class="stamp" data-k="stamp">${Film.chip('Denied', { big: true })}</div>
      ${this.RULES.map((s, i) => `<div class="r" data-k="r${i}"><div class="s">${s}</div><div class="c" data-k="c${i}"></div></div>`).join('')}</div>`);
    this.status = Mock.mount(root, `<div class="status"><span class="t">Review rev-5d27b8e3</span>${Film.chip('Blocked', { big: true })}<span class="why">overallScore 14.0 is outside valid range 0-10</span></div>`).root;
    this.words = {};
  },

  /* a chip under a key, replaced only when its word changes */
  chip(key, el, word, big) {
    if (this.words[key] === word) return;
    this.words[key] = word;
    el.innerHTML = word ? Film.chip(word, { big }) : '';
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), A = this.ans, R = this.rules;
    M.rise(this.head.h, t, 0.1);
    M.rise(A.root, t, 0.5);
    M.rise(R.root, t, K.checks + 0.4);

    /* the bad score lights red-orange as it is spoken, and the scale shows it past 10 */
    A.bad.style.setProperty('--r', M.p(t, K.fourteen, 0.5).toFixed(3));
    A.scale.style.opacity = M.prog(t, K.fourteen, 0.4).toFixed(3);

    /* the denial: the stamp lands on the guard, the answer is marked rejected, and the review is blocked */
    const rej = t >= K.rejects, land = M.p(t, K.rejects, 0.5, 'outCubic');
    R.stamp.style.opacity = M.prog(t, K.rejects, 0.15).toFixed(3);
    R.stamp.style.transform = `scale(${(1.8 - 0.8 * land).toFixed(3)})`;
    this.chip('st', A.st, t >= K.rejects + 0.4 ? 'Rejected' : null, true);
    A.st.style.transform = `scale(${(1 + 0.25 * (1 - M.p(t, K.rejects + 0.4, 0.5, 'outCubic'))).toFixed(3)})`;
    Film.glow(A.root, M.ramp(t, K.fourteen - 0.2, K.rejects + 1.2, 0.3, 0.6));
    M.rise(this.status, t, K.rejects + 1.0, { dy: 10 });

    /* the rules: each glows as it is named; rule 1 fails on the 14, the others are met */
    const named = [K.range, K.risks, K.reasons, K.reasons + 1.2];
    this.RULES.forEach((_, i) => {
      const n = named[i];
      R['r' + i].style.setProperty('--g', M.ramp(t, n - 0.2, n + 1.4, 0.3, 0.5).toFixed(3));
      const word = i === 0 ? (rej ? 'Failed' : null) : (t >= Math.min(n, K.rejects + 0.3 + i * 0.25) ? 'Met' : null);
      this.chip('c' + i, R['c' + i], word);
    });
    Film.glow(R.root, Math.max(M.ramp(t, K.rejects - 0.2, K.reasons + 2.4, 0.3, 0.6), 0.5 * M.p(t, K.reasons + 2.0, 0.6)));
  },
});
