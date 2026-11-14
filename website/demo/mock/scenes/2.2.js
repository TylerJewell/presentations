/* Scene 2.2: Console: the conditions turn green. Specify › Build › Stages for the Loan Origination
   system's spec 001: seventeen exit conditions, grouped by family, each with the test that checks it.
   The review stream is already running; the cursor runs the tests and the rows flip from waiting to met
   one by one. The camera pushes in on the last, "A human decides every adverse action", as it turns
   green, moves to the summary as it reads 17 of 17 met and READY TO SHIP, then eases out. */
registerScene({
  id: '2.2',
  act: 2,
  title: 'Console: the conditions turn green',
  duration: 24,
  captionZone: 'bottom-left',
  caption: 'Every condition is checked by a test. When the last one passes, including that a human decides every adverse action, the system is ready to ship. Specification to proof, before it is deployed.',

  /* scene time of each beat */
  B: { click: 2.0, first: 2.3, step: 0.56, run: 0.48, last: 11.3, lastMet: 14.3, zoomRow: 11.8, zoomCard: 16.6, ready: 17.9, zoomOut: 20.6 },

  FAMILIES: ['Functional', 'Data integrity', 'Reliability', 'Agentic AI safety', 'Security & compliance'],
  /* [family, condition, id, test, tests, seconds] */
  CONDITIONS: [
    [0, 'Incomplete applications name every missing field', 'LOAN-INTAKE-MISSING-FIELDS', 'ApplicationValidatorTest', 31, 0.42],
    [0, 'Identity is verified before any credit inquiry', 'LOAN-IDENTITY-BEFORE-INQUIRY', 'IdentityVerifierTest', 14, 0.31],
    [0, 'Affordability counts verified income only', 'LOAN-AFFORDABILITY-VERIFIED-INCOME', 'AffordabilityCalculatorTest', 22, 0.38],
    [0, 'The review queue is ordered by referral time', 'LOAN-QUEUE-REFERRAL-ORDER', 'ApplicationsByStatusViewIntegrationTest', 6, 3.12],
    [1, 'Every decline records reasons and a rationale', 'LOAN-DECLINE-REASONS-RECORDED', 'UnderwriterDecisionTest', 18, 0.29],
    [1, 'Every decision record is complete', 'LOAN-DECISION-RECORD-COMPLETE', 'DecisionRecordTest', 12, 0.22],
    [1, 'A case is assessed under one pinned policy', 'LOAN-POLICY-PINNED', 'LendingPolicyEntityTest', 9, 0.64],
    [1, 'The first decision on an application wins', 'LOAN-FIRST-DECISION-WINS', 'LoanApplicationEntityTest', 41, 1.08],
    [2, 'A withdrawal mid-review releases the inquiry', 'LOAN-WITHDRAWAL-RELEASES-INQUIRY', 'WithdrawalCompensationIntegrationTest', 4, 2.41],
    [2, 'An unanswered review escalates to a senior', 'LOAN-REVIEW-ESCALATES', 'ReviewEscalationIntegrationTest', 5, 2.86],
    [3, 'The assessor’s answer is validated before use', 'LOAN-ASSESSOR-ANSWER-VALIDATED', 'EligibilityAssessmentTest', 16, 0.27],
    [3, 'The assessor answers only after both tool calls', 'LOAN-ASSESSOR-TOOLS-FIRST', 'EligibilityAssessorAgentIntegrationTest', 7, 4.02],
    [4, 'No applicant identifier reaches the model', 'LOAN-NO-IDENTIFIERS-TO-MODEL', 'AssessorInputTest', 10, 0.33],
    [4, 'Applicant keys are hashed, never stored', 'LOAN-APPLICANT-KEYS-HASHED', 'ApplicantKeyHasherTest', 8, 0.19],
    [4, 'Only underwriters decide; seniors take escalations', 'LOAN-UNDERWRITER-AUTHORITY', 'ReviewAuthorizationTest', 13, 0.26],
    [4, 'Every endpoint enforces its role', 'LOAN-ENDPOINT-ROLES', 'UnderwritingEndpointIntegrationTest', 24, 3.37],
    [4, 'A human decides every adverse action', 'LOAN-HUMAN-DECIDES-ADVERSE', 'UnderwritingWorkflowIntegrationTest +2', 58, 6.84],
  ],
  /* the review agents' stream that is already running when the scene opens */
  POOL: [
    '[review]  UnderwritingWorkflow.java · conforms to plan §4',
    '[review]  AssessmentRouting.java · 0 findings',
    '[build]   mvn -q compile · 214 sources · ok',
    '[review]  DecisionRecord.java · FR-036 covered',
    '[docs]    README.md · underwriting section updated',
    '[review]  EligibilityAssessorAgent.java · 0 findings',
    '[tasks]   T108 polish quickstart §2 · done',
    '[review]  LoanApplicationEntity.java · 0 findings',
    '[review]  LendingPolicyEntity.java · FR-019 covered',
    '[build]   mvn -q test-compile · 61 tests · ok',
    '[review]  ApplicationsByStatusView.java · 0 findings',
    '[review]  UnderwritingEndpoint.java · roles checked',
    '[tasks]   T111 review pass · done',
    '[review]  ApplicantKeyHasher.java · 0 findings',
    '[review]  ReviewAuthorization.java · FR-030 covered',
    '[review]  IdentityVerifier.java · 0 findings',
    '[docs]    quickstart.md · exit-condition checks listed',
    '[review]  AffordabilityCalculator.java · FR-021 covered',
    '[review]  WithdrawalCompensation.java · 0 findings',
    '[tasks]   T109 smoke run against local runtime · done',
    '[review]  ApplicationValidator.java · 0 findings',
    '[review]  AssessorInput.java · no identifier fields',
    '[build]   akka local run · loan-origination · healthy',
    '[review]  ReviewEscalation.java · 0 findings',
    '[review]  UnderwriterDecision.java · FR-028 covered',
    '[tasks]   T110 README refresh · done',
  ],
  STAGES: [
    ['Specify', 'spec.md · 38 requirements', 'done'], ['Plan', 'plan.md · 9 decisions', 'done'], ['Tasks', '112 tasks', 'done'],
    ['Implement', '112 of 112 done', 'done'], ['Exit conditions', '', 'on'], ['Ship', '', 'lock'],
  ],
  LH: 17, NLOG: 24,

  runAt(i) { return i < 16 ? this.B.first + i * this.B.step : this.B.last; },
  metAt(i) { return i < 16 ? this.runAt(i) + this.B.run : this.B.lastMet; },

  render(root) {
    root.classList.add('s22');
    Mock.style('s22', `
      .s22 .pg { position: relative; height: 676px; }
      .s22 .pg > * { position: absolute; }
      .s22 .band .spec { display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 12px; border-radius: 8px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); font-size: 13px; color: var(--c-text); }
      .s22 .band .spec b { font: 600 11.5px var(--mono); color: var(--c-gold-text); }
      .s22 .band .spec i { font-style: normal; color: var(--c-faint); font-size: 10px; }
      .s22 .btn { height: 30px; padding: 0 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; white-space: nowrap;
        background: var(--c-surface-2); box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-text); }
      .s22 .btn.pri { background: var(--c-gold); color: #17140a; box-shadow: none; }
      .s22 .btn.off { color: var(--c-faint); }
      .s22 .btn .pl { width: 0; height: 0; border-left: 7px solid currentColor; border-top: 4.5px solid transparent; border-bottom: 4.5px solid transparent; }
      .s22 .last { font-size: 12px; color: var(--c-faint); margin-right: 4px; white-space: nowrap; }

      .s22 .stages { left: 0; top: 0; width: 1356px; height: 40px; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
      .s22 .stg { position: relative; display: flex; align-items: center; gap: 10px; padding: 0 12px; border-radius: 10px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s22 .stg:not(:last-child)::after { content: ''; position: absolute; right: -14px; top: 50%; width: 14px; height: 1px; background: var(--c-line); }
      .s22 .stg .n { flex: none; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font: 600 10.5px var(--sans); color: var(--c-faint); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s22 .stg.done .n { background: var(--c-green-bg); color: var(--c-green); box-shadow: none; }
      .s22 .stg.on { background: var(--c-gold-bg); box-shadow: inset 0 0 0 1px var(--c-gold-ring); }
      .s22 .stg.on .n { background: var(--c-gold); color: #17140a; box-shadow: none; }
      .s22 .stg.ready { background: var(--c-green-bg); box-shadow: inset 0 0 0 1px rgba(74,222,128,.45); }
      .s22 .stg.ready .n { background: var(--c-green); color: #08130c; box-shadow: none; }
      .s22 .stg .tx { min-width: 0; display: flex; flex-direction: column; line-height: 1.15; }
      .s22 .stg .tx b { font-size: 13px; font-weight: 500; color: var(--c-text); }
      .s22 .stg .tx span { font: 500 10.5px var(--sans); color: var(--c-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .s22 .stg.on .tx span { color: var(--c-gold-text); }
      .s22 .stg.ready .tx span { color: var(--c-green); }

      .s22 .tbl { left: 0; top: 52px; width: 920px; border-radius: 12px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); overflow: hidden; }
      .s22 .tr { position: relative; height: 25.5px; display: grid; grid-template-columns: 104px 16px 326px 270px 46px 52px 78px; align-items: center; padding: 0 14px; }
      .s22 .tr.hd { height: 24px; font: 600 10px var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); background: var(--c-sunk); border-bottom: 1px solid var(--c-line); }
      .s22 .tr.g0 { border-top: 1px solid var(--c-line); }
      .s22 .tr.first.g0 { border-top: 0; }
      .s22 .tr > * { position: relative; z-index: 1; min-width: 0; }
      .s22 .tr .fm { font: 600 9.5px/1.1 var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--c-muted); padding-right: 8px; }
      .s22 .tr .dt { width: 8px; height: 8px; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--c-faint); }
      .s22 .tr .cn { font-size: 13px; color: var(--c-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 10px; }
      .s22 .tr .ts { font: 500 11px var(--mono); color: var(--c-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 8px; }
      .s22 .tr .ct, .s22 .tr .tm { font: 500 11px var(--sans); color: var(--c-faint); text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .s22 .tr.hd .ct, .s22 .tr.hd .tm { color: var(--c-faint); }
      .s22 .tr .st { justify-self: end; }
      .s22 .chip { display: inline-flex; align-items: center; gap: 5px; height: 19px; padding: 0 8px; border-radius: 999px; font: 600 10px/1 var(--sans); letter-spacing: .06em; text-transform: uppercase; white-space: nowrap;
        color: var(--c-faint); background: rgba(236,236,241,.05); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s22 .chip.run { color: var(--c-gold-text); background: var(--c-gold-bg); box-shadow: inset 0 0 0 1px var(--c-gold-ring); }
      .s22 .chip.met { color: var(--c-green); background: var(--c-green-bg); box-shadow: inset 0 0 0 1px rgba(74,222,128,.4); }
      .s22 .chip .sp { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid currentColor; border-right-color: transparent; }
      .s22 .tr .scan { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; z-index: 0; pointer-events: none; opacity: 0;
        background: linear-gradient(90deg, rgba(201,162,39,0), rgba(201,162,39,.16) 70%, rgba(201,162,39,0)); }
      .s22 .tr .flash { position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0; background: var(--c-green-bg); }
      .s22 .tr.run .dt { box-shadow: none; background: var(--c-gold); }
      .s22 .tr.run .ts { color: var(--c-gold-text); }
      .s22 .tr.met .dt { box-shadow: none; background: var(--c-green); }
      .s22 .tr.met .ts, .s22 .tr.met .ct, .s22 .tr.met .tm { color: var(--c-muted); }
      .s22 .tr.hero.met .ts { color: var(--c-green); }
      .s22 .tr .ring { position: absolute; inset: 1px 4px; z-index: 0; border-radius: 6px; pointer-events: none; opacity: 0; box-shadow: inset 0 0 0 1.5px rgba(74,222,128,.75), 0 0 18px -2px rgba(74,222,128,.35); }
      .s22 .foot { left: 554px; top: 518px; width: 366px; text-align: right; font: 500 10.5px var(--sans); color: var(--c-faint); white-space: nowrap; }

      .s22 .sum { left: 936px; top: 52px; width: 420px; height: 150px; padding: 14px 16px; border-radius: 12px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s22 .sum .k { font: 600 10px var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); display: flex; }
      .s22 .sum .k span { margin-left: auto; letter-spacing: .04em; text-transform: none; font-weight: 500; }
      .s22 .sum .big { margin-top: 8px; display: flex; align-items: baseline; gap: 8px; white-space: nowrap; }
      .s22 .sum .big b { font: 600 40px/1 var(--sans); letter-spacing: -.02em; color: var(--c-text); font-variant-numeric: tabular-nums; min-width: 46px; }
      .s22 .sum .big span { font-size: 17px; color: var(--c-muted); }
      .s22 .sum .ready { margin-left: auto; align-self: center; }
      .s22 .sum .ready .chip { height: 26px; padding: 0 12px; font-size: 11.5px; letter-spacing: .1em; }
      .s22 .sum .ready .chip.met { box-shadow: inset 0 0 0 1px rgba(74,222,128,.6), 0 0 22px -4px rgba(74,222,128,.55); }
      .s22 .segs { margin-top: 12px; display: grid; grid-template-columns: repeat(17, minmax(0, 1fr)); gap: 3px; }
      .s22 .segs i { height: 6px; border-radius: 2px; background: rgba(236,236,241,.10); }
      .s22 .segs i.run { background: var(--c-gold); }
      .s22 .segs i.met { background: var(--c-green); }
      .s22 .fams { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 5px 12px; font: 500 10.5px var(--sans); color: var(--c-muted); white-space: nowrap; }
      .s22 .fams b { font-weight: 600; color: var(--c-text); }
      .s22 .fams .done b { color: var(--c-green); }

      .s22 .log { left: 936px; top: 214px; width: 420px; height: 462px; border-radius: 12px; background: var(--c-code); box-shadow: inset 0 0 0 1px var(--c-line); overflow: hidden; }
      .s22 .log .lh { height: 34px; display: flex; align-items: center; gap: 8px; padding: 0 14px; border-bottom: 1px solid var(--c-line); font-size: 12.5px; color: var(--c-text); white-space: nowrap; }
      .s22 .log .lh .lv { width: 7px; height: 7px; border-radius: 50%; background: var(--c-green); }
      .s22 .log .lh .el { margin-left: auto; font: 500 11px var(--sans); color: var(--c-muted); font-variant-numeric: tabular-nums; }
      .s22 .log .bd { position: absolute; left: 0; right: 0; top: 42px; height: ${this.NLOG * this.LH}px; overflow: hidden; }
      .s22 .log .sl { position: absolute; left: 0; right: 0; top: 0; }
      .s22 .log .l { height: ${this.LH}px; padding: 0 14px; font: 500 11px/${this.LH}px var(--mono); color: var(--c-code-text); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
      .s22 .log .l.dim { color: var(--c-faint); }
      .s22 .log .l.hd { color: var(--c-gold-text); }
      .s22 .log .l.cmd { color: var(--c-muted); }
      .s22 .log .l.ok { color: var(--c-green); }
      .s22 .log .l.sh { color: var(--c-text); }
      .s22 .log .l.fin { color: var(--c-green); font-weight: 600; }
    `);

    const world = (this.world = Mock.world(root));
    const f = (this.f = Mock.consoleFrame(world, { crumb: 'Specify › Build › Stages', active: 'Build', title: 'Build', bundle: 'v3', tabs: ['Stages', 'Tasks', 'Spec'], tab: 'Stages' }));
    f.tabs.insertAdjacentHTML('afterend',
      `<span class="spec"><b>001</b>Loan intake and underwriting<i>▼</i></span>`);
    this.bandR = Mock.mount(f.bandRight, `<span style="display:flex;gap:8px;align-items:center">
      <span class="last" data-k="last">Last run 2 h 14 m ago</span>
      <span class="btn pri" data-k="run"><i class="pl"></i><span data-k="runT">Run all tests</span></span>
      <span class="btn off" data-k="ship">Ship</span></span>`);

    const C = this.CONDITIONS;
    const rows = C.map((c, i) => {
      const firstOfFam = i === 0 || C[i - 1][0] !== c[0];
      return `<div class="tr${firstOfFam ? ' g0' : ''}${i === 0 ? ' first' : ''}${i === 16 ? ' hero' : ''}" data-k="r${i}">
        <span class="scan"></span><span class="flash"></span>${i === 16 ? '<span class="ring"></span>' : ''}
        <span class="fm">${firstOfFam ? this.FAMILIES[c[0]].replace('&', '&amp;') : ''}</span><span><i class="dt"></i></span>
        <span class="cn">${c[1]}</span><span class="ts">${c[3]}</span><span class="ct">—</span><span class="tm">—</span>
        <span class="st"><span class="chip">Waiting</span></span></div>`;
    }).join('');
    const fams = this.FAMILIES.map((n, k) => `<span data-k="fam${k}">${n.replace('&', '&amp;')} <b>0/${C.filter((c) => c[0] === k).length}</b></span>`).join('');
    this.p = Mock.mount(f.page, `<div class="pg">
      <div class="stages">${this.STAGES.map(([n, s, st], i) => `<div class="stg ${st}" data-k="stg${i}"><span class="n">${st === 'done' ? '✓' : i + 1}</span><span class="tx"><b>${n}</b><span data-k="stgS${i}">${s}</span></span></div>`).join('')}</div>
      <div class="tbl" data-k="tbl"><div class="tr hd"><span>Family</span><span></span><span>Exit condition</span><span>Checked by</span><span class="ct">Tests</span><span class="tm">Time</span><span class="st">Status</span></div>${rows}</div>
      <div class="foot">17 conditions · .akka/exit-conditions.yaml</div>
      <div class="sum" data-k="sum">
        <div class="k">Exit conditions · spec 001<span data-k="sumR">17 waiting</span></div>
        <div class="big"><b data-k="cnt">0</b><span>of 17 met</span><span class="ready" data-k="ready"><span class="chip" data-k="readyC">Not ready</span></span></div>
        <div class="segs">${C.map((_, i) => `<i data-k="sg${i}"></i>`).join('')}</div>
        <div class="fams">${fams}</div>
      </div>
      <div class="log" data-k="log">
        <div class="lh"><i class="lv"></i><span data-k="logT">Review · agents</span><span class="el" data-k="logE"></span></div>
        <div class="bd"><div class="sl" data-k="sl">${Array.from({ length: this.NLOG + 1 }, () => '<div class="l"></div>').join('')}</div></div>
      </div></div>`);
    this.rows = C.map((_, i) => {
      const el = this.p['r' + i];
      return { el, scan: el.querySelector('.scan'), flash: el.querySelector('.flash'), ct: el.querySelector('.ct'), tm: el.querySelector('.tm'), chip: el.querySelector('.chip'), state: '' };
    });
    this.slots = [...this.p.sl.children];
    this.LOG = this.buildLog();
    this.cursor = Mock.cursor(world);
  },

  buildLog() {
    const M = Mock, B = this.B, L = [];
    for (let k = 0; k < 200; k++) {
      const tt = -40 + k * 0.42 + 0.14 * M.noise(k);
      if (tt > B.click - 0.1) break;
      L.push({ t: tt, s: this.POOL[k % this.POOL.length], c: 'dim' });
    }
    L.push({ t: B.click + 0.05, s: '$ akka specify check 001 --all', c: 'sh' });
    L.push({ t: B.click + 0.15, s: '  17 exit conditions · 5 families · 24 test classes', c: 'dim' });
    this.CONDITIONS.forEach((c, i) => {
      const s = this.runAt(i), e = this.metAt(i);
      L.push({ t: s, s: '▸ ' + c[2], c: 'hd' });
      if (i < 16) {
        L.push({ t: s + 0.1, s: `  mvn -q ${/Integration/.test(c[3]) ? 'verify -Dit.test' : 'test -Dtest'}=${c[3]}`, c: 'cmd' });
        L.push({ t: e, s: `  ✓ ${c[3]}  ${c[4]} tests  ${c[5].toFixed(2)} s`, c: 'ok' });
      } else {
        L.push({ t: s + 0.1, s: '  mvn -q verify -Dtest=AssessmentRoutingTest -Dit.test=UnderwritingWorkflowIntegrationTest', c: 'cmd' });
        L.push({ t: s + 0.7, s: '  ✓ AssessmentRoutingTest  27 tests  0.41 s', c: 'ok' });
        L.push({ t: s + 1.0, s: '    decline · refer · above threshold · policy breach → review', c: 'dim' });
        L.push({ t: s + 2.2, s: '  ✓ UnderwritingWorkflowIntegrationTest  19 tests  5.62 s', c: 'ok' });
        L.push({ t: s + 2.4, s: '  mvn -q test -Dtest=LoanApplicationEntityTest', c: 'cmd' });
        L.push({ t: e, s: '  ✓ LoanApplicationEntityTest  12 tests  0.81 s', c: 'ok' });
        L.push({ t: e + 0.15, s: '✓ 17 of 17 conditions met · ready to ship', c: 'fin' });
      }
    });
    return L;
  },

  /* stage-px rects of the parts the cursor and camera aim at, measured once the scene is on screen */
  measure() {
    const w = this.world.getBoundingClientRect();
    if (!w.width) return false;
    const k = w.width / 1920;
    const rect = (el) => { const r = el.getBoundingClientRect(); return [(r.left - w.left) / k, (r.top - w.top) / k, r.width / k, r.height / k]; };
    this.g = { run: rect(this.bandR.run), hero: rect(this.rows[16].el), prev: rect(this.rows[15].el), sum: rect(this.p.sum), tbl: rect(this.p.tbl) };
    return true;
  },

  at(t) {
    const M = Mock, B = this.B, C = this.CONDITIONS;
    if (!this.g && !this.measure()) return;
    const g = this.g;

    /* rows */
    let metN = 0, running = 0;
    const famMet = this.FAMILIES.map(() => 0);
    this.rows.forEach((r, i) => {
      const s = this.runAt(i), e = this.metAt(i), c = C[i];
      const st = t >= e ? 'met' : t >= s ? 'run' : '';
      if (st === 'met') { metN++; famMet[c[0]]++; } else if (st === 'run') running++;
      if (r.state !== st) {
        r.el.classList.toggle('run', st === 'run');
        r.el.classList.toggle('met', st === 'met');
        r.chip.className = 'chip' + (st ? ' ' + st : '');
        r.chip.innerHTML = st === 'met' ? 'Met' : st === 'run' ? '<i class="sp"></i>Running' : 'Waiting';
        r.state = st;
      }
      if (st === 'run') {
        const p = M.prog(t, s, e - s);
        r.chip.firstChild.style.transform = `rotate(${(M.abs(t) * 420 % 360).toFixed(1)}deg)`;
        r.ct.textContent = `${Math.floor(c[4] * p)}/${c[4]}`;
        r.tm.textContent = (c[5] * p).toFixed(2) + ' s';
        r.scan.style.opacity = 1;
        r.scan.style.transform = `translateX(${(-100 + 200 * M.loop(t, 0.9, i * 0.3)).toFixed(1)}%)`;
      } else {
        r.scan.style.opacity = 0;
        r.ct.textContent = st === 'met' ? `${c[4]}/${c[4]}` : '—';
        r.tm.textContent = st === 'met' ? c[5].toFixed(2) + ' s' : '—';
      }
      const hold = i === 16 ? M.ramp(t, e, B.zoomOut + 1.2, 0.25, 1.0) * 0.9 : 0;
      r.flash.style.opacity = Math.max(M.ramp(t, e, e + 0.9, 0.08, 0.7), hold).toFixed(3);
      if (i === 16) r.el.querySelector('.ring').style.opacity = hold ? (hold / 0.9).toFixed(3) : 0;
    });

    /* the band: run, then run again; Ship opens once every condition is met */
    const done = t >= B.lastMet;
    const runT = t < B.click ? 'Run all tests' : done ? 'Run again' : 'Running…';
    if (this.bandR.runT.textContent !== runT) this.bandR.runT.textContent = runT;
    this.bandR.run.classList.toggle('pri', !done);
    this.bandR.ship.classList.toggle('pri', t >= B.ready);
    this.bandR.ship.classList.toggle('off', t < B.ready);
    const last = t < B.click ? 'Last run 2 h 14 m ago' : done ? 'Run 8 · passed' : 'Run 8';
    if (this.bandR.last.textContent !== last) this.bandR.last.textContent = last;

    /* stages */
    const s4 = `${metN} of 17 met`;
    if (this.p.stgS4.textContent !== s4) this.p.stgS4.textContent = s4;
    const ready = t >= B.ready;
    this.p.stg4.className = 'stg ' + (done ? 'done' : 'on');
    this.p.stg4.firstChild.textContent = done ? '✓' : '5';
    this.p.stg5.className = 'stg ' + (ready ? 'ready' : 'lock');
    const s5 = ready ? 'Ready to ship' : 'Waits on 17 conditions';
    if (this.p.stgS5.textContent !== s5) this.p.stgS5.textContent = s5;

    /* summary */
    if (this.p.cnt.textContent !== String(metN)) this.p.cnt.textContent = metN;
    const sumR = done ? 'all met' : running ? `${17 - metN} to go` : '17 waiting';
    if (this.p.sumR.textContent !== sumR) this.p.sumR.textContent = sumR;
    C.forEach((_, i) => { this.p['sg' + i].className = this.rows[i].state; });
    this.FAMILIES.forEach((n, k) => {
      const tot = C.filter((c) => c[0] === k).length, el = this.p['fam' + k];
      el.lastChild.textContent = `${famMet[k]}/${tot}`;
      el.classList.toggle('done', famMet[k] === tot);
    });
    const rc = this.p.readyC;
    const rt = ready ? 'Ready to ship' : t >= B.click ? 'Checking' : 'Not ready';
    if (rc.textContent !== rt) rc.textContent = rt;
    rc.className = 'chip' + (ready ? ' met' : t >= B.click ? ' run' : '');
    const stamp = M.p(t, B.ready, 0.6, 'outCubic');
    this.p.ready.style.transform = ready ? `scale(${(1.25 - 0.25 * stamp).toFixed(3)})` : 'none';

    /* the log: the review stream, then the run; each new line slides the block up */
    const L = this.LOG;
    let k = 0;
    while (k < L.length && L[k].t <= t) k++;
    const pIn = k ? M.ease.outCubic(M.prog(t, L[k - 1].t, 0.16)) : 1;
    this.slots.forEach((el, j) => {
      const e = L[k - this.NLOG - 1 + j];
      const s = e ? e.s : '', c = 'l' + (e ? ' ' + e.c : '');
      if (el.textContent !== s) el.textContent = s;
      if (el.className !== c) el.className = c;
      el.style.opacity = j === this.NLOG ? pIn.toFixed(3) : '';
    });
    this.p.sl.style.transform = `translateY(${(-this.LH * pIn).toFixed(2)}px)`;
    const fmtT = (x) => `${Math.floor(x / 60)}:${(x % 60).toFixed(1).padStart(4, '0')}`;
    const logT = t < B.click ? 'Review · agents' : done ? 'Run 8 · exit conditions · passed' : 'Run 8 · exit conditions';
    if (this.p.logT.textContent !== logT) this.p.logT.textContent = logT;
    const el = t < B.click ? fmtT(600 + M.abs(t) % 60) : fmtT(Math.min(t, B.lastMet + 0.15) - B.click);
    this.p.logE.textContent = el;

    /* the cursor runs the tests, then rests by the summary */
    const [rx, ry, rw, rh] = g.run;
    this.cursor.at(t, [
      { t: 0.5, x: 1260, y: 560 },
      { t: B.click, x: rx + rw * 0.45, y: ry + rh * 0.6, click: true, glide: 1.1 },
      { t: 3.6, x: 1250, y: 872, glide: 1.2 },
      { t: 10.8, x: 1250, y: 872, hide: true },
    ]);

    /* push in on the last row, move to the summary, ease out */
    const [, hy, , hh] = g.hero, [, py] = g.prev, [sx, sy, sw, sh] = g.sum, [tx, , tw] = g.tbl;
    M.camera(this.world, t, [
      { t: B.zoomRow, rect: [tx, py, tw, hy + hh - py], dur: 1.2 },
      { t: B.zoomCard, rect: [sx - 520, sy - 80, sw + 540, sh + 260], dur: 1.2 },
      { t: B.zoomOut, rect: null, dur: 1.2 },
    ]);
  },
});
