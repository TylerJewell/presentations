/* A change arrives (adapted from the film's scenes 3.3 and 3.4). The Controls board is S3Board; the
   slide's time t maps to the board's act clock tau through MAP, so every beat lands on one of the act's
   events: the code card (its own time is tau - 16, as in 3.3), the board re-opening, the owner's confirm,
   the two new controls, the signature, and v3 kept beside v4. */
registerSlide({
  id: 'change',
  act: 'together',
  title: 'A change arrives',
  beats: [
    { t: 4.6, say: "Now a change arrives, in a pull request. A developer adds one field to the loan application: the applicant's religion, for a community lending pilot. Good intent. Nobody updated the risk assessment." },
    { t: 8.6, say: "Akka reads the code, field by field, and works out what each one holds. This new one is a protected characteristic, special data under GDPR Article 9 and fair lending law." },
    { t: 13.6, say: "The board reacts on its own. Code in sync turns red: the running code no longer matches what was signed, and the facts the contract was built on are out of date." },
    { t: 15.8, say: "So the contract re-opens, on the Amend path, and it says why: the code changed. Nobody had to file a ticket." },
    { t: 19.8, say: "The owner confirms the new fact, a decision by a named person, recorded as one." },
    { t: 24.6, say: "The contract adds an evaluation: it reads every eligibility decision's rationale and fails any that relies on a protected characteristic." },
    { t: 28.4, say: "And a human control: any decision that evaluation flags waits for an underwriter, within four hours. That answers the AI Act's human oversight requirement." },
    { t: 33.4, say: "The owner signs version four, and it goes into force. From pull request to signed contract in minutes, not at the next quarterly review." },
    { t: 35.6, say: "And version three is still there, signed and provable, so last week's decisions can be checked against the contract that governed them." },
  ],

  /* slide time to the board's act clock */
  MAP: [[0, 16], [4.6, 20.6], [8.6, 24.6], [13.6, 31.6], [15.8, 33.4], [17.0, 36.4], [19.8, 39.2], [24.6, 46.0], [28.4, 51.4], [33.4, 58.4], [35.6, 60.6]],
  /* the code card's beats, in its own time (tau - 16) */
  B: { in: 0.5, open: 2.0, type: [2.35, 3.55], commit: 4.0, scan: [6.3, 8.1], bom: 8.3, out: 9.2 },
  CODE: [
    ['kw', 'package', ' com.lender.origination.domain;'],
    [],
    ['kw', 'import', ' java.math.BigDecimal;'],
    ['kw', 'import', ' java.time.LocalDate;'],
    ['kw', 'import', ' java.util.List;'],
    [],
    ['kw', 'public record', ' <i>LoanApplication</i>('],
    ['f', '    <u>String</u> applicationId,'],
    ['f', '    <u>String</u> applicantName,', 'personal'],
    ['f', '    <u>LocalDate</u> dateOfBirth,', 'personal'],
    ['f', '    <u>String</u> region,'],
    ['f', '    <u>BigDecimal</u> requestedAmount,', 'financial'],
    ['f', '    <u>BigDecimal</u> annualIncome,', 'financial'],
    ['f', '    <u>EmploymentRecord</u> employment,', 'employment record'],
    ['new', '    String religion,', 'protected characteristic'],
    ['f', '    <u>List</u>&lt;<u>Document</u>&gt; documents) {'],
    ['f', '}'],
  ],
  LH: 28,
  CARD: [1000, 150, 840, 596],

  render(root) {
    const M = Mock;
    root.classList.add('sl-chg');
    Act4.consoleCss('sl-chg');
    M.style('sl-chg', `
      .sl-chg .dim { left: 0; top: 0; width: 1920px; height: 1080px; background: #000; opacity: 0; pointer-events: none; }
      .sl-chg .card { left: 1000px; top: 150px; width: 840px; height: 596px; border-radius: 14px; overflow: hidden; background: #0d0d10;
        box-shadow: 0 0 0 1px rgba(236,236,241,.16), 0 40px 100px rgba(0,0,0,.75); opacity: 0; }
      .sl-chg .card > * { position: absolute; }
      .sl-chg .bar { left: 0; right: 0; top: 0; height: 50px; display: flex; align-items: center; gap: 14px; padding: 0 18px; background: #141418; border-bottom: 1px solid rgba(236,236,241,.12); }
      .sl-chg .bar .tab { font: 500 15px var(--mono); color: var(--c-text); display: flex; align-items: center; gap: 10px; }
      .sl-chg .bar .tab i { width: 9px; height: 9px; border-radius: 50%; background: var(--c-gold); }
      .sl-chg .bar .path { font: 500 13px var(--mono); color: var(--c-muted); }
      .sl-chg .bar .br { margin-left: auto; font: 500 13px var(--mono); color: var(--c-muted); padding: 5px 10px; border-radius: 999px; box-shadow: inset 0 0 0 1px rgba(236,236,241,.14); }
      .sl-chg .bar .add { font: 600 13px var(--sans); color: var(--c-green); }
      .sl-chg .lines { left: 0; right: 0; top: 62px; height: 480px; overflow: hidden; }
      .sl-chg .ln { position: absolute; left: 0; right: 0; height: 28px; display: flex; align-items: center; font: 500 17px/28px var(--mono); color: #d4d4dc; white-space: pre; }
      .sl-chg .ln .no { width: 64px; padding-right: 18px; text-align: right; color: #6a6a74; font-size: 14px; flex: none; }
      .sl-chg .ln .g { width: 18px; color: var(--c-green); font-weight: 700; flex: none; }
      .sl-chg .ln b { color: var(--c-gold-text); font-weight: 500; }
      .sl-chg .ln u { text-decoration: none; color: #8ec5ff; }
      .sl-chg .ln i { font-style: normal; color: #f1f1f1; }
      .sl-chg .ln.new { background: rgba(74,222,128,.12); }
      .sl-chg .ln .caret { display: inline-block; width: 2px; height: 20px; background: var(--c-gold-text); vertical-align: -4px; margin-left: 1px; }
      .sl-chg .tag { position: absolute; right: 20px; height: 22px; padding: 0 9px; border-radius: 6px; font: 500 12.5px/22px var(--sans); color: var(--c-blue); background: var(--c-blue-bg); white-space: nowrap; }
      .sl-chg .tag.hot { color: var(--red); background: rgba(255,84,0,.16); box-shadow: inset 0 0 0 1px rgba(255,84,0,.6); font-weight: 600; }
      .sl-chg .scan { left: 0; right: 0; height: 64px; margin-top: -60px; pointer-events: none; opacity: 0;
        background: linear-gradient(180deg, rgba(255,206,74,0), rgba(255,206,74,.10) 85%, rgba(255,206,74,.0)); }
      .sl-chg .scan i { position: absolute; left: 0; right: 0; bottom: 4px; height: 2px; background: var(--yellow); box-shadow: 0 0 14px rgba(255,206,74,.9); }
      .sl-chg .foot { left: 0; right: 0; bottom: 0; height: 54px; border-top: 1px solid rgba(236,236,241,.12); background: #121216; }
      .sl-chg .foot > div { position: absolute; left: 18px; right: 18px; top: 0; height: 54px; display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--c-text); white-space: nowrap; }
      .sl-chg .av { width: 28px; height: 28px; border-radius: 50%; background: #2c3a4f; color: #b9d4ff; font: 600 11px/28px var(--sans); text-align: center; flex: none; }
      .sl-chg .foot .msg { color: var(--c-muted); overflow: hidden; text-overflow: ellipsis; }
      .sl-chg .foot .sha { margin-left: auto; font: 500 13px var(--mono); color: var(--c-muted); }
      .sl-chg .foot .lab { font: 600 12px var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-chg .foot .pr { width: 160px; height: 4px; border-radius: 2px; background: rgba(236,236,241,.12); overflow: hidden; }
      .sl-chg .foot .pr i { display: block; height: 100%; background: var(--yellow); }
      .sl-chg .foot .tok { font: 500 13px var(--mono); color: var(--c-text); background: #1d1d21; padding: 2px 7px; border-radius: 5px; }
      .sl-chg .foot .warnx { color: var(--red); font-weight: 600; }
    `);
    this.b = S3Board.build(root);
    const w = this.b.world;
    this.dim = M.html('<div class="dim"></div>');
    w.appendChild(this.dim);
    this.card = M.mount(w, `<div class="card">
      <div class="bar"><span class="tab"><i></i>LoanApplication.java</span><span class="path">domain/</span><span class="add" data-k="add">+1</span><span class="br">feature/community-lending</span></div>
      <div class="lines" data-k="lines"></div>
      <div class="foot"><div data-k="f1"><span class="av">RP</span><b style="font-weight:500">R. Patel</b><span class="msg">Capture applicant religion for the community-lending pilot</span><span class="sha">4e1a7c2 · 14:05</span></div>
        <div data-k="f2"><span class="lab">AI-BOM</span><span data-k="f2t">reading the code</span><span class="pr"><i data-k="pr"></i></span></div></div>
    </div>`);
    this.lines = this.CODE.map((c) => {
      const isNew = c[0] === 'new';
      const body = c[0] === 'kw' ? `<b>${c[1]}</b>${c[2]}` : c.length ? c[1] : '';
      const el = M.html(`<div class="ln${isNew ? ' new' : ''}"><span class="no"></span><span class="g">${isNew ? '+' : ''}</span><span class="tx">${isNew ? '' : body}</span></div>`);
      this.card.lines.appendChild(el);
      const tagTxt = c[0] === 'kw' ? null : c[2];
      const tag = tagTxt ? M.html(`<span class="tag${isNew ? ' hot' : ''}">${tagTxt}${isNew ? ' · GDPR Art. 9' : ''}</span>`) : null;
      if (tag) el.appendChild(tag);
      return { el, isNew, tag, no: el.querySelector('.no'), tx: el.querySelector('.tx') };
    });
    this.scan = M.html('<div class="scan"><i></i></div>');
    this.card.lines.appendChild(this.scan);
    this.cursor = M.cursor(w);
  },

  /* the code card at its own time c (3.3's scene time) */
  cardAt(c) {
    const M = Mock, B = this.B, LH = this.LH;
    const cin = M.p(c, B.in, 0.8), cout = M.p(c, B.out, 0.7, 'inOutCubic');
    M.set(this.card.root, { opacity: (cin * (1 - cout)).toFixed(3), transform: `translate(${((1 - cin) * 80 + cout * 140).toFixed(1)}px, 0)` });
    this.card.root.style.visibility = cout >= 1 ? 'hidden' : '';
    this.dim.style.opacity = (0.5 * M.prog(c, B.in, 0.6) * (1 - M.prog(c, B.out, 0.6))).toFixed(3);
    const open = M.p(c, B.open, 0.4, 'inOutCubic');
    const word = 'String religion,';
    const typed = Math.floor(word.length * M.prog(c, B.type[0], B.type[1] - B.type[0]));
    const caretOn = c >= B.open && c < B.commit + 0.4 && (c < B.type[1] || M.wave(c, 0.9) > 0.5);
    const sp = M.prog(c, B.scan[0], B.scan[1] - B.scan[0]), scanY = sp * this.CODE.length * LH;
    let y = 0, n = 1;
    this.lines.forEach((l) => {
      const h = l.isNew ? LH * open : LH;
      l.el.style.top = y.toFixed(2) + 'px';
      l.el.style.height = h.toFixed(2) + 'px';
      l.el.style.opacity = l.isNew ? open.toFixed(3) : 1;
      if (l.isNew) {
        const s = '    ' + (typed < 6 ? word.slice(0, typed) : `<u>String</u>${word.slice(6, typed)}`);
        Talk.htm(l.tx, s + (caretOn ? '<span class="caret"></span>' : ''));
      }
      Talk.txt(l.no, l.isNew && open < 0.5 ? '' : String(n));
      if (!l.isNew || open >= 0.5) n++;
      if (l.tag) {
        const a = M.p(c, B.scan[0] + ((y + LH / 2) / (this.CODE.length * LH)) * (B.scan[1] - B.scan[0]), 0.45);
        l.tag.style.opacity = a.toFixed(3);
        l.tag.style.transform = `translateX(${((1 - a) * 12).toFixed(1)}px) scale(${l.isNew ? (1 + 0.12 * M.ramp(c, B.scan[0] + 1.15, B.scan[0] + 2.2, 0.15, 0.6)).toFixed(3) : 1})`;
      }
      y += h;
    });
    M.set(this.scan, { top: scanY.toFixed(1) + 'px', opacity: (sp > 0 && sp < 1 ? 1 : 0) });
    this.card.add.style.opacity = M.prog(c, B.type[1], 0.3).toFixed(3);
    const f1 = M.prog(c, B.commit, 0.4) * (1 - M.prog(c, B.scan[0] - 0.3, 0.3));
    M.set(this.card.f1, { opacity: f1.toFixed(3), transform: `translateY(${((1 - M.p(c, B.commit, 0.5)) * 10).toFixed(1)}px)` });
    this.card.f2.style.opacity = M.prog(c, B.scan[0] - 0.1, 0.3).toFixed(3);
    this.card.pr.style.width = (100 * sp).toFixed(1) + '%';
    const done = c >= B.bom;
    Talk.htm(this.card.f2t, done ? 'AI-BOM <span class="tok">213f6517</span> · was <span class="tok">60b8e667</span> · <span class="warnx">1 new data type</span>' : 'reading the code');
    this.card.pr.parentNode.style.display = done ? 'none' : '';
    this.card.root.querySelector('.foot .lab').style.display = done ? 'none' : '';
  },

  at(t) {
    const M = Mock, b = this.b, K = S3Board.K;
    const tau = Act4.map(t, this.MAP);
    b.at(tau, t);
    Act4.upheld(b.r.root);
    this.cardAt(tau - 16);

    /* the two buttons the cursor presses, measured once in the state they are pressed in */
    if (!this.confirmAt) {
      const el = b.rr[2].btn, d = el.style.display;
      el.style.display = '';
      this.confirmAt = b.rectOf(el);
      el.style.display = d;
      const s = b.r.stBtn, old = s.textContent;
      s.textContent = 'Sign v4';
      this.signAt = b.rectOf(s);
      s.textContent = old;
    }
    const cf = this.confirmAt, sg = this.signAt;
    this.cursor.at(tau, [
      { t: K.confirm - 1.0, x: cf[0] - 90, y: cf[1] + 60, glide: 0.4 },
      { t: K.confirm, x: cf[0] + cf[2] * 0.5, y: cf[1] + cf[3] * 0.55, click: true, glide: 0.8 },
      { t: K.confirm + 1.2, x: cf[0] + 40, y: cf[1] + 90, glide: 0.8, hide: true },
      { t: K.sign - 1.4, x: sg[0] - 120, y: sg[1] + 80, glide: 0.1 },
      { t: K.sign, x: sg[0] + sg[2] * 0.5, y: sg[1] + sg[3] * 0.55, click: true, glide: 1.0 },
      { t: K.sign + 1.3, x: sg[0] - 30, y: sg[1] + 100, glide: 0.8, hide: true },
    ]);

    const C = this.CARD, LH = this.LH;
    Talk.camera(b.world, t, [
      { t: 0.3, rect: C, dur: 1.2 },
      { t: 4.9, rect: [C[0] + 40, C[1] + 62 + 7 * LH - 6, C[2] - 40, 9 * LH + 12], dur: 1.2 },
      { t: 9.4, rect: b.P(548, 36 + 38 + 2 * 34 - 6, 808, 4 * 34 + 12), dur: 1.3 },
      { t: 14.0, rect: b.P(244, 30, 296, 276), dur: 1.2 },
      { t: 16.1, rect: b.P(548, 36 + 38 + 34, 808, 3 * 34 + 8), dur: 1.2 },
      { t: 20.0, rect: b.P(252, 312, 1104, 196), dur: 1.3 },
      { t: 28.6, rect: b.P(252, 300, 1104, 228), dur: 1.2 },
      { t: 31.4, rect: b.P(244, 0, 1112, 306), dur: 1.3 },
      { t: 33.7, rect: b.P(0, 0, 236, 528), dur: 1.3 },
    ]);
  },
});
