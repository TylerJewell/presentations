/* Scene 3.1: a staged change with a stop rule. The question, then the change page for ticket-triage on
   frontier-mini: the trial on recorded traffic (count-ups on the trial cost and the potential saving), then the
   recommended rollout's three stages on the second screen. As the owner's stop rule is spoken an "In flight"
   strip rises in the console's look over the quality section, laid out as the console's in-flight details: the
   stage strip with the shadow at day 1 of 2, the stop rule's text as it was set in advance, the stop rule Holding
   with the console's own sentence, and the two writes, Continue and Keep, each with its dialog's words and the
   reason it asks for, with one Keep recorded as a change record shows it (applied by the demo).
   The two screens are real captures; the strip is a mock on the captures' and fixtures' figures. */
Tok.register({
  id: '3.1',

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = {
      tried: at('tried'), staged: at('staged'), owner: at('owner'), halts: at('halts'),
      cont: at('Continue'), keep: at('Keep'), who: at('who'),
    };
  },

  /* the strip, in the capture's pixels; its content is laid out in the same pixels and scaled into stage px */
  PATCH: [298, 268, 1600, 450],
  S: (v) => (v / 1.2).toFixed(1) + 'px',
  STOP_RULE: "Roll back when, with at least 150 judged answers on each side, frontier-mini's pass rate on triage-accuracy-judge is shown to be more than 3 points below frontier-large's, over a 6-hour window or the stage so far; or its error rate is shown to exceed 2% over at least 150 requests; or its cost per request over at least 150 requests exceeds the estimate's high end by 10%. Each look is held to a stricter standard than the one before, so that a candidate no worse than the tolerance trips it less than once in twenty rollouts.",

  render(root) {
    root.classList.add('t31');
    const S = this.S;
    Mock.style('t31', `
      .t31 .tk-chiptop .tk-chip { background: rgba(0, 0, 0, .72); }
      .t31 .tk-patch { z-index: 5; font-family: var(--sans); color: var(--c-text); }
      .t31 .fl { position: absolute; }
      .t31 .fl .h { font: 600 ${S(26)}/1 var(--sans); letter-spacing: -.01em; color: var(--c-text); }
      .t31 .fl.strip { display: flex; gap: ${S(8)}; }
      .t31 .fl.strip span { font: 500 ${S(18)}/1 var(--sans); padding: ${S(9)} ${S(14)}; border-radius: ${S(9)}; color: var(--c-muted); box-shadow: inset 0 0 0 1px rgba(236,236,241,.12); white-space: nowrap; }
      .t31 .fl.strip span.done { color: var(--c-text); background: rgba(236,236,241,.06); box-shadow: none; }
      .t31 .fl.strip span.now { color: var(--c-text); background: var(--c-gold-bg); box-shadow: inset 0 0 0 1px var(--c-gold); }
      .t31 .lbl { font: 500 ${S(18)}/1 var(--sans); color: var(--c-muted); }
      .t31 .st { display: inline-flex; align-items: center; gap: ${S(7)}; font: 600 ${S(17)}/1 var(--sans); padding: ${S(7)} ${S(12)}; border-radius: ${S(7)}; color: var(--c-green); background: var(--c-green-bg); }
      .t31 .st i { width: ${S(9)}; height: ${S(9)}; border-radius: 50%; background: var(--c-green); }
      .t31 .fl.txt { font: 400 ${S(19)}/1.4 var(--sans); color: var(--c-text); }
      .t31 .fl.rule { font: 400 ${S(16)}/1.4 var(--sans); color: var(--c-muted); }
      .t31 .fl.card { border: 1px solid var(--c-line); border-radius: ${S(12)}; background: var(--c-surface-2); padding: ${S(16)} ${S(20)}; display: flex; flex-direction: column; gap: ${S(12)}; }
      .t31 .card .row { display: flex; align-items: center; gap: ${S(14)}; }
      .t31 .card .btn { font: 600 ${S(18)}/1 var(--sans); padding: ${S(9)} ${S(16)}; border-radius: ${S(8)}; color: #0b0b0d; background: var(--c-text); }
      .t31 .card .when { font: 400 ${S(17)}/1.3 var(--sans); color: var(--c-muted); }
      .t31 .card .body { font: 400 ${S(17)}/1.4 var(--sans); color: var(--c-text); }
      .t31 .card .field { display: flex; flex-direction: column; gap: ${S(5)}; }
      .t31 .card .field b { font: 500 ${S(15)}/1 var(--sans); color: var(--c-muted); }
      .t31 .card .field i { display: block; height: ${S(34)}; border-radius: ${S(7)}; border: 1px solid var(--c-line); background: var(--c-sunk); }
      .t31 .fl.rec { display: flex; flex-direction: column; gap: ${S(6)}; font: 400 ${S(17)}/1.3 var(--sans); color: var(--c-text); }
      .t31 .fl.rec .row { display: flex; align-items: center; gap: ${S(14)}; }
      .t31 .fl.rec .tk-chip { font-size: ${S(12)}; padding: ${S(6)} ${S(9)}; flex: none; }
      .t31 .cu { font: 600 ${S(20)}/1 var(--sans); color: var(--c-text); display: flex; align-items: center; height: 100%; }
    `);
    Mock.dotGrid(root);
    const url = 'localhost:9889/cost/changes/ticket-triage-on-frontier-mini';
    this.c = Tok.capture(root, {
      states: [{ image: 'captures/change-preview.png', url }, { image: 'captures/change-staged.png', url }],
      crumb: 'Optimize › Cost › Savings',
    });
    /* count-ups over the trial cost and the potential saving, on the first screen */
    this.trial = this.c.patch([546, 737, 150, 28], '<div class="cu"></div>');
    this.pot = this.c.patch([689, 843, 112, 28], '<div class="cu"></div>');

    const P = (x, y, w) => `left:${S(x)};top:${S(y)};width:${S(w)}`;
    this.flight = this.c.patch(this.PATCH, `
      <div class="fl" style="${P(16, 16, 760)}"><div class="h">In flight</div></div>
      <div class="fl strip" style="${P(16, 60, 780)}">
        <span class="done">✓ Trial · 550 requests</span><span class="now">Shadow 10% · day 1 of 2</span><span>Canary 10%</span><span>Fleet</span>
      </div>
      <div class="fl lbl" style="${P(16, 120, 760)}">Stop rule, every stage</div>
      <div class="fl rule" style="${P(16, 148, 770)}">${this.STOP_RULE}</div>
      <div class="fl" style="${P(16, 300, 760)}"><span class="st"><i></i>Holding</span></div>
      <div class="fl txt" style="${P(16, 345, 770)}">No six-hour window has enough judged answers yet to be evaluated.</div>

      <div class="fl card" style="${P(824, 16, 760)}">
        <div class="row"><span class="btn">Continue</span><span class="when">Offered while a rollout's stop rule has tripped.</span></div>
        <div class="body">Keeps the rollout going with its stop rule tripped, and records the reason on the change. The row stops asking for attention.</div>
        <div class="field"><b>Reason to continue</b><i></i></div>
      </div>
      <div class="fl card" style="${P(824, 190, 760)}">
        <div class="row"><span class="btn">Keep</span><span class="when">Offered when a change realized less than its estimate.</span></div>
        <div class="body">Keeps the change live and records why on the change record. The row stops asking for attention.</div>
        <div class="field"><b>Reason to keep</b><i></i></div>
      </div>
      <div class="fl rec" style="${P(824, 366, 760)}">
        <div class="row"><span class="lbl">Recorded on password-reset on support-slm-v1</span>${Tok.chip('demo')}</div>
        <div>M. Ortiz, November 9, 2026: Kept. More exchanges per conversation, 2.9 against 2.1 before.</div>
      </div>`);
    this.question = Tok.question(root, { text: this.q });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), c = this.c;
    this.question.at(t);
    const [PX, PY] = this.PATCH;
    const strip = K.owner - 0.2;
    c.at(t, {
      enter: 2.2,
      show: [{ t: -Infinity, state: 0 }, { t: K.staged, state: 1 }],
      cam: [
        { t: K.tried + 0.2, rect: [298, 495, 900, 390] },
        { t: K.staged, rect: [298, 688, 1600, 205], dur: 1.2 },
        { t: strip + 0.2, rect: [PX, PY, 800, 450], dur: 1.3 },
        { t: K.cont, rect: [PX + 800, PY, 800, 450], dur: 1.2 },
      ],
      spot: [
        { t: K.tried + 0.9, rect: [298, 553, 1595, 240] },
        { t: K.staged - 0.2, rect: null },
        { t: K.staged + 0.8, rect: [314, 790, 1560, 95] },
        { t: strip, rect: null },
        { t: K.owner + 1.2, rect: [PX + 6, PY + 112, 790, 170] },
        { t: K.halts, rect: [PX + 6, PY + 290, 790, 100] },
        { t: K.cont + 0.5, rect: [PX + 816, PY + 8, 778, 172] },
        { t: K.keep + 0.3, rect: [PX + 816, PY + 182, 778, 172] },
        { t: K.who + 0.2, rect: [PX + 816, PY + 358, 778, 84] },
      ],
      cursor: [
        { t: K.tried + 1.4, x: 600, y: 751 },
        { t: K.staged + 1.2, x: 470, y: 807 },
        { t: K.owner + 1.6, x: PX + 120, y: PY + 170 },
        { t: K.halts + 0.6, x: PX + 80, y: PY + 318 },
        { t: K.cont + 1.0, x: PX + 880, y: PY + 46 },
        { t: K.keep + 0.8, x: PX + 870, y: PY + 220 },
        { t: K.who + 0.7, x: PX + 900, y: PY + 408 },
      ],
    });
    /* the count-ups land as the trial is spoken; the patches leave with the first screen */
    const gone = 1 - M.prog(t, K.staged, 0.5);
    M.countUp(this.trial.firstElementChild, t, K.tried + 0.8, 0.9, 0, 19.4, (v) => Tok.money(v));
    this.trial.style.opacity = (M.prog(t, K.tried + 0.6, 0.2) * gone).toFixed(3);
    const p = M.ease.outCubic(M.prog(t, K.tried + 1.4, 0.9));
    const s = `$${Math.round(123 * p)} to $${Math.round(128 * p)}`;
    const pot = this.pot.firstElementChild;
    if (pot.textContent !== s) pot.textContent = s;
    this.pot.style.opacity = (M.prog(t, K.tried + 1.2, 0.2) * gone).toFixed(3);
    /* the in-flight strip rises as the owner's stop rule is spoken and stays */
    M.rise(this.flight, t, strip, { dy: 14 });
  },
});
