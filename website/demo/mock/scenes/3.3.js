/* Scene 3.3: The code moves. A code card slides over the Controls board: a developer adds
   `String religion,` to the applicant record and commits; the AI-BOM re-reads the file (a scan line
   sweeps it and tags each field it understands); the card leaves and the board answers: Code in sync
   flips red-orange, the Amend arc lights with "Code changed", and the data-types fact asks to be
   confirmed again. The board is S3Board (scenes/3.2.js) on the act clock. */
registerScene({
  id: '3.3',
  act: 3,
  title: "The code moves",
  duration: 20,
  captionZone: 'bottom-right',
  caption: "Then the code changes. A developer adds a field the contract never covered. Akka reads the code, sees that the system now handles a protected characteristic, and re-opens the contract. No one had to remember to ask.",

  /* scene times of the card's beats */
  B: { in: 0.5, open: 2.0, type: [2.35, 3.55], commit: 4.0, scan: [6.3, 8.1], bom: 8.3, out: 9.2 },

  /* the file, with the line the developer adds; tags are what the AI-BOM reads from each field */
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
    root.classList.add('s33');
    Mock.style('s33', `
      .s33 .dim { left: 0; top: 0; width: 1920px; height: 1080px; background: #000; opacity: 0; pointer-events: none; }
      .s33 .card { left: 1000px; top: 150px; width: 840px; height: 596px; border-radius: 14px; overflow: hidden; background: #0d0d10;
        box-shadow: 0 0 0 1px rgba(236,236,241,.14), 0 40px 100px rgba(0,0,0,.75); opacity: 0; }
      .s33 .card > * { position: absolute; }
      .s33 .bar { left: 0; right: 0; top: 0; height: 50px; display: flex; align-items: center; gap: 14px; padding: 0 18px; background: #141418; border-bottom: 1px solid rgba(236,236,241,.10); }
      .s33 .bar .tab { font: 500 15px var(--mono); color: var(--c-text); display: flex; align-items: center; gap: 10px; }
      .s33 .bar .tab i { width: 9px; height: 9px; border-radius: 50%; background: var(--c-gold); }
      .s33 .bar .path { font: 500 13px var(--mono); color: var(--c-faint); }
      .s33 .bar .br { margin-left: auto; font: 500 13px var(--mono); color: var(--c-muted); padding: 5px 10px; border-radius: 999px; box-shadow: inset 0 0 0 1px rgba(236,236,241,.12); }
      .s33 .bar .add { font: 600 13px var(--sans); color: var(--c-green); }
      .s33 .lines { left: 0; right: 0; top: 62px; height: 480px; overflow: hidden; }
      .s33 .ln { position: absolute; left: 0; right: 0; height: 28px; display: flex; align-items: center; font: 500 17px/28px var(--mono); color: #d4d4dc; white-space: pre; }
      .s33 .ln .no { width: 64px; padding-right: 18px; text-align: right; color: #55555f; font-size: 14px; flex: none; }
      .s33 .ln .g { width: 18px; color: var(--c-green); font-weight: 700; flex: none; }
      .s33 .ln b { color: var(--c-gold-text); font-weight: 500; }
      .s33 .ln u { text-decoration: none; color: #8ec5ff; }
      .s33 .ln i { font-style: normal; color: #f1f1f1; }
      .s33 .ln.new { background: rgba(74,222,128,.10); }
      .s33 .ln.new .bgx { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--c-green); }
      .s33 .ln .caret { display: inline-block; width: 2px; height: 20px; background: var(--c-gold-text); vertical-align: -4px; margin-left: 1px; }
      .s33 .tag { position: absolute; right: 20px; height: 22px; padding: 0 9px; border-radius: 6px; font: 500 12px/22px var(--sans); color: var(--c-blue); background: var(--c-blue-bg); white-space: nowrap; }
      .s33 .tag.hot { color: var(--red); background: rgba(255,84,0,.16); box-shadow: inset 0 0 0 1px rgba(255,84,0,.55); font-weight: 600; }
      .s33 .scan { left: 0; right: 0; height: 64px; margin-top: -60px; pointer-events: none; opacity: 0;
        background: linear-gradient(180deg, rgba(255,206,74,0), rgba(255,206,74,.10) 85%, rgba(255,206,74,.0)); }
      .s33 .scan i { position: absolute; left: 0; right: 0; bottom: 4px; height: 2px; background: var(--yellow); box-shadow: 0 0 14px rgba(255,206,74,.9); }
      .s33 .foot { left: 0; right: 0; bottom: 0; height: 54px; border-top: 1px solid rgba(236,236,241,.10); background: #121216; }
      .s33 .foot > div { position: absolute; left: 18px; right: 18px; top: 0; height: 54px; display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--c-text); white-space: nowrap; }
      .s33 .av { width: 28px; height: 28px; border-radius: 50%; background: #2c3a4f; color: #b9d4ff; font: 600 11px/28px var(--sans); text-align: center; flex: none; }
      .s33 .foot .msg { color: var(--c-muted); overflow: hidden; text-overflow: ellipsis; }
      .s33 .foot .sha { margin-left: auto; font: 500 13px var(--mono); color: var(--c-faint); }
      .s33 .foot .lab { font: 600 12px var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .s33 .foot .pr { width: 160px; height: 4px; border-radius: 2px; background: rgba(236,236,241,.12); overflow: hidden; }
      .s33 .foot .pr i { display: block; height: 100%; background: var(--yellow); }
      .s33 .foot .tok { font: 500 13px var(--mono); color: var(--c-text); background: #1d1d21; padding: 2px 7px; border-radius: 5px; }
      .s33 .foot .warnx { color: var(--red); font-weight: 600; }
    `);
    this.b = S3Board.build(root);
    const w = this.b.world;
    this.dim = Mock.html('<div class="dim"></div>');
    w.appendChild(this.dim);
    this.card = Mock.mount(w, `<div class="card">
      <div class="bar"><span class="tab"><i></i>LoanApplication.java</span><span class="path">domain/</span><span class="add" data-k="add">+1</span><span class="br">feature/community-lending</span></div>
      <div class="lines" data-k="lines"></div>
      <div class="foot"><div data-k="f1"><span class="av">RP</span><b style="font-weight:500">R. Patel</b><span class="msg">Capture applicant religion for the community-lending pilot</span><span class="sha">4e1a7c2 · 14:05</span></div>
        <div data-k="f2"><span class="lab">AI-BOM</span><span data-k="f2t">reading the code</span><span class="pr"><i data-k="pr"></i></span><span class="sha" data-k="f2s"></span></div></div>
    </div>`);
    this.lines = this.CODE.map((c, i) => {
      const isNew = c[0] === 'new';
      const body = c[0] === 'kw' ? `<b>${c[1]}</b>${c[2]}` : c.length ? c[1] : '';
      const el = Mock.html(`<div class="ln${isNew ? ' new' : ''}">${isNew ? '<span class="bgx"></span>' : ''}<span class="no"></span><span class="g">${isNew ? '+' : ''}</span><span class="tx">${isNew ? '' : body}</span></div>`);
      this.card.lines.appendChild(el);
      const tagTxt = c[0] === 'kw' ? null : c[2];
      const tag = tagTxt ? Mock.html(`<span class="tag${isNew ? ' hot' : ''}">${tagTxt}${isNew ? ' · GDPR Art. 9' : ''}</span>`) : null;
      if (tag) el.appendChild(tag);
      return { el, isNew, tag, no: el.querySelector('.no'), tx: el.querySelector('.tx') };
    });
    this.scan = Mock.html('<div class="scan"><i></i></div>');
    this.card.lines.appendChild(this.scan);
  },

  at(t) {
    const M = Mock, B = this.B, b = this.b, LH = this.LH;
    b.at(t + S3Board.OFFSET['3.3'], t);

    /* the card: in, the line opens and types, the commit, the scan, out */
    const cin = M.p(t, B.in, 0.8), cout = M.p(t, B.out, 0.7, 'inOutCubic');
    M.set(this.card.root, { opacity: (cin * (1 - cout)).toFixed(3), transform: `translate(${((1 - cin) * 80 + cout * 140).toFixed(1)}px, 0)` });
    this.dim.style.opacity = (0.42 * M.prog(t, B.in, 0.6) * (1 - M.prog(t, B.out, 0.6))).toFixed(3);
    const open = M.p(t, B.open, 0.4, 'inOutCubic');
    const word = 'String religion,';
    const typed = Math.floor(word.length * M.prog(t, B.type[0], B.type[1] - B.type[0]));
    const caretOn = t >= B.open && t < B.commit + 0.4 && (t < B.type[1] || M.wave(t, 0.9) > 0.5);
    let y = 0, n = 1;
    const sp = M.prog(t, B.scan[0], B.scan[1] - B.scan[0]), scanY = sp * this.CODE.length * LH;
    this.lines.forEach((l) => {
      const h = l.isNew ? LH * open : LH;
      l.el.style.top = y.toFixed(2) + 'px';
      l.el.style.height = h.toFixed(2) + 'px';
      l.el.style.opacity = l.isNew ? open.toFixed(3) : 1;
      if (l.isNew) {
        const s = '    ' + (typed < 6 ? word.slice(0, typed) : `<u>String</u>${word.slice(6, typed)}`);
        const html = s + (caretOn ? '<span class="caret"></span>' : '');
        if (l.tx._h !== html) { l.tx.innerHTML = html; l.tx._h = html; }
      }
      const no = l.isNew && open < 0.5 ? '' : String(n);
      if (l.no._t !== no) { l.no.textContent = no; l.no._t = no; }
      if (!l.isNew || open >= 0.5) n++;
      if (l.tag) {
        const a = M.p(t, B.scan[0] + ((y + LH / 2) / (this.CODE.length * LH)) * (B.scan[1] - B.scan[0]), 0.45);
        l.tag.style.opacity = a.toFixed(3);
        l.tag.style.transform = `translateX(${((1 - a) * 12).toFixed(1)}px) scale(${l.isNew ? (1 + 0.12 * M.ramp(t, B.scan[0] + 1.15, B.scan[0] + 2.2, 0.15, 0.6)).toFixed(3) : 1})`;
      }
      y += h;
    });
    M.set(this.scan, { top: scanY.toFixed(1) + 'px', opacity: (sp > 0 && sp < 1 ? 1 : 0) });
    this.card.add.style.opacity = M.prog(t, B.type[1], 0.3).toFixed(3);

    /* footer: the commit, then the AI-BOM reading the file */
    const f1 = M.prog(t, B.commit, 0.4) * (1 - M.prog(t, B.scan[0] - 0.3, 0.3));
    const f2 = M.prog(t, B.scan[0] - 0.1, 0.3);
    M.set(this.card.f1, { opacity: f1.toFixed(3), transform: `translateY(${((1 - M.p(t, B.commit, 0.5)) * 10).toFixed(1)}px)` });
    this.card.f2.style.opacity = f2.toFixed(3);
    this.card.pr.style.width = (100 * sp).toFixed(1) + '%';
    const done = t >= B.bom;
    const f2t = done ? 'AI-BOM <span class="tok">213f6517</span> · was <span class="tok">60b8e667</span> · <span class="warnx">1 new data type</span>' : 'reading the code';
    if (this.card.f2t._h !== f2t) { this.card.f2t.innerHTML = f2t; this.card.f2t._h = f2t; }
    this.card.pr.parentNode.style.display = done ? 'none' : '';
    this.card.root.querySelector('.foot .lab').style.display = done ? 'none' : '';

    /* the camera: the card, its record, then each answer on the board */
    const C = this.CARD;
    M.camera(b.world, t, [
      { t: 0.8, rect: C, dur: 1.2 },
      { t: 5.6, rect: [C[0], C[1] + 62 + 6 * LH - 10, C[2], 11 * LH + 20], dur: 1.1 },
      { t: 9.1, rect: b.P(548, 36 + 38 + 3 * 34 - 6, 808, 3 * 34 + 12), dur: 1.2 },
      { t: 11.8, rect: b.P(252, 36, 280, 264), dur: 1.1 },
      { t: 14.1, rect: b.P(548, 36, 808, 150), dur: 1.1 },
      { t: 17.2, rect: null, dur: 1.3 },
    ]);
  },
});
