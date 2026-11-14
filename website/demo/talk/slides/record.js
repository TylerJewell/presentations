/* The evidence record (adapted from the film's scene 5.1). One recorded interaction in four beats: the
   conversation, its trace drawing on as a waterfall, a push-in on the moment that matters (the
   evaluation breached, the human control holding the decision) with two large callouts the room can
   read, then the verdicts, and the whole held as one evidence record. */
registerSlide({
  id: 'record',
  act: 'together',
  title: 'The evidence record',
  beats: [
    { t: 2.4, say: "A few days later, an applicant in Germany asks why her application is on hold. The assistant says an underwriter is reviewing it, and gives her more time to send a document." },
    { t: 7.4, say: "Here is everything behind that conversation: the workflow, the eligibility agent, its tool calls and model calls, and woven through them, every control that ran." },
    { t: 10.2, say: "This is the moment that matters. The new evaluation read the agent's draft decision; its rationale cited her religion. Breached. So the human control held it, and an underwriter overrode the rationale inside the four-hour limit. The machine caught it. A person decided." },
    { t: 13.6, say: "Each verdict names its control, the contract version in force, and the regulation it answers." },
    { t: 16.2, say: "One record, written as it happened. If an examiner asks about this applicant, you hand them the record." },
  ],

  B: { conv: 0.1, compress: 2.5, trace: 3.0, sweep: [3.4, 5.8, 6.4], zoomIn: 7.6, call: 8.6, callEnd: 11.0, verdicts: 11.0, zoomV: 10.9, out: 13.8, frame: 14.4 },

  /* the waterfall: seconds into the interaction; 'E' is past the break, when the underwriter answered */
  SPANS: [
    { n: 'POST /applications/app-58213/messages', k: 'endpoint', d: 0, a: 0.0, b: 2.64, m: '200 · 2.64 s' },
    { n: 'UnderwritingWorkflow · assess', k: 'workflow', d: 1, a: 0.02, b: 'E', m: '' },
    { n: 'guardrail · protected characteristics', k: 'control', d: 2, a: 0.04, b: 0.08, tag: ['ok', 'Upheld'], m: 'input' },
    { n: 'EligibilityAssessor', k: 'agent', d: 2, a: 0.09, b: 1.98, m: 'agent · session de-0412' },
    { n: 'tool · policy_lookup', k: 'tool', d: 3, a: 0.12, b: 0.31, m: 'lending-policy v12' },
    { n: 'tool · affordability_check', k: 'tool', d: 3, a: 0.33, b: 0.76, m: 'income 2 of 3 verified' },
    { n: 'gateway › small model', k: 'model', d: 3, a: 0.79, b: 1.22, m: 'underwrite-4b · 1,214 tok' },
    { n: 'gateway › frontier model', k: 'model', d: 3, a: 1.24, b: 1.95, m: 'DE route · 2,388 tok' },
    { n: 'evaluation · decision rationale', k: 'eval', d: 2, a: 2.0, b: 2.31, tag: ['bad', 'Breached'], m: 'cites the applicant’s religion · score 0.21' },
    { n: 'human · underwriter review', k: 'human', d: 2, a: 2.33, b: 'E', tag: ['warn', 'Held'], m: 'A. Weber · rationale overridden · SLA 4 h met' },
    { n: 'guardrail · adverse-action disclosure', k: 'control', d: 2, a: 2.58, b: 2.62, tag: ['ok', 'Upheld'], m: 'reply' },
  ],
  VERDICTS: [
    { tone: 'bad', v: 'Breached · caught', kind: 'Evaluation', name: 'Decisions don’t rely on a protected characteristic', id: 'ctl-ev-117', reg: 'ECOA · GDPR Art. 9', row: 8 },
    { tone: 'ok', v: 'Upheld', kind: 'Human', name: 'A flagged decision waits for an underwriter', id: 'ctl-hu-118', reg: 'EU AI Act Art. 14', row: 9 },
    { tone: 'ok', v: 'Upheld', kind: 'Guardrail', name: 'No protected characteristic in the prompt', id: 'ctl-gr-042', reg: 'GDPR Art. 9', row: 2 },
    { tone: 'ok', v: 'Upheld', kind: 'Guardrail', name: 'Adverse-action reasons are disclosed', id: 'ctl-gr-051', reg: 'ECOA', row: 10 },
  ],
  G: { kindX: 700, nameX: 786, barX: 1150, pxs: 180, brk: [1700, 1728], end: 1772, rowY: 182, pitch: 31 },

  bx(s) { return s === 'E' ? this.G.end : this.G.barX + s * this.G.pxs; },

  render(root) {
    const M = Mock;
    root.classList.add('sl-rec');
    M.style('sl-rec', `
      .sl-rec .rec { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-rec .rec > * { position: absolute; }
      .sl-rec .hd { left: 120px; right: 120px; top: 70px; display: flex; align-items: center; gap: 28px; font: 500 16px/1 var(--sans); color: var(--soft-grey); }
      .sl-rec .hd .sp { flex: 1; }
      .sl-rec .hd .eb { font: 600 15px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--yellow); }
      .sl-rec .hd b, .sl-rec .vr .id { font-family: var(--mono); }
      .sl-rec .hd b { color: var(--white); font-weight: 600; }
      .sl-rec .conv { left: 120px; top: 132px; width: 500px; transform-origin: 0 0; display: flex; flex-direction: column; gap: 14px; }
      .sl-rec .msg { max-width: 430px; padding: 13px 16px 14px; border-radius: 12px; border: 1px solid var(--hair-hi); background: #0f0f12; }
      .sl-rec .msg.as { align-self: flex-end; border-color: rgba(255,206,74,.35); background: rgba(255,206,74,.05); }
      .sl-rec .msg .who { font: 600 11.5px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 8px; display: flex; gap: 10px; }
      .sl-rec .msg.as .who { color: var(--yellow); }
      .sl-rec .msg .who span { margin-left: auto; color: #8a8a8a; letter-spacing: .04em; }
      .sl-rec .msg p { margin: 0; font-size: 19px; line-height: 1.38; color: var(--white); }
      .sl-rec .meta { left: 120px; top: 620px; width: 500px; display: grid; grid-template-columns: 150px 1fr; row-gap: 12px; font: 500 15px/1.2 var(--sans); }
      .sl-rec .meta .k { color: #9a9a9a; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; font-size: 12px; padding-top: 2px; }
      .sl-rec .meta .v { color: var(--white); }
      .sl-rec .wf { left: 676px; top: 120px; width: 1128px; height: 420px; border: 1px solid var(--hair-hi); border-radius: 12px; background: rgba(255,255,255,.018); }
      .sl-rec .wf-t, .sl-rec .vt { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .sl-rec .wf-t { left: 700px; top: 138px; }
      .sl-rec svg.wfs { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-rec .tick { font: 500 12px var(--sans); fill: #7a7a7a; }
      .sl-rec .grid { stroke: rgba(241,241,241,.08); stroke-width: 1; }
      .sl-rec .row { left: 680px; width: 1120px; height: 29px; border-radius: 6px; }
      .sl-rec .sn { font: 500 14px/29px var(--mono); color: var(--white); white-space: nowrap; }
      .sl-rec .kd2 { font: 600 10.5px/29px var(--sans); letter-spacing: .12em; text-transform: uppercase; color: #8a8a8a; }
      .sl-rec .bar { height: 14px; border-radius: 3px; background: rgba(241,241,241,.26); }
      .sl-rec .bar.agent { background: rgba(255,206,74,.55); }
      .sl-rec .bar.model { background: rgba(255,206,74,.85); }
      .sl-rec .bar.eval { background: var(--red); }
      .sl-rec .bar.human { background: repeating-linear-gradient(135deg, rgba(255,206,74,.55) 0 6px, rgba(255,206,74,.18) 6px 12px); }
      .sl-rec .bar.control { background: var(--green); }
      .sl-rec .mt { font: 500 13.5px/14px var(--sans); color: var(--soft-grey); white-space: nowrap; }
      .sl-rec .tg { font-size: 11px; padding: 4px 7px; background-color: #0b0b0d; }
      .sl-rec .tg.ok { background-image: linear-gradient(rgba(114,211,91,.14), rgba(114,211,91,.14)); }
      .sl-rec .tg.warn { background-image: linear-gradient(rgba(255,206,74,.14), rgba(255,206,74,.14)); }
      .sl-rec .tg.bad { background-image: linear-gradient(rgba(255,84,0,.16), rgba(255,84,0,.16)); }
      .sl-rec .ph { width: 2px; background: var(--yellow); box-shadow: 0 0 12px rgba(255,206,74,.7); top: 160px; height: 360px; }
      .sl-rec .phl { top: 146px; font: 600 12px/1 var(--sans); color: var(--yellow); transform: translateX(-50%); white-space: nowrap; }
      .sl-rec .brk { font: 600 12px var(--sans); fill: var(--soft-grey); }
      .sl-rec .vt { left: 700px; top: 566px; }
      .sl-rec .vr { left: 680px; width: 1120px; height: 44px; display: grid; grid-template-columns: 190px 100px minmax(0,1fr) 104px 40px 176px; align-items: center; gap: 0 12px;
        padding: 0 14px; border-top: 1px solid var(--hair-hi); }
      .sl-rec .vr .kd { font: 600 12px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .sl-rec .vr .vn { font-size: 18px; color: var(--white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .sl-rec .vr .id, .sl-rec .vr .rg { font: 500 13.5px/1 var(--sans); color: var(--white); white-space: nowrap; }
      .sl-rec .vr .id { font-family: var(--mono); }
      .sl-rec .vr .rg { color: var(--yellow); text-align: right; }
      .sl-rec .vr .bd { font: 600 12px/1 var(--sans); color: var(--white); border: 1px solid var(--hair-hi); border-radius: 999px; padding: 5px 8px; text-align: center; }
      .sl-rec .vr .mk-chip { font-size: 13px; padding: 6px 10px; justify-self: start; }
      .sl-rec .brkt { left: 96px; top: 46px; width: 1728px; height: 772px; border: 2px solid var(--yellow); border-radius: 18px; box-shadow: var(--yellow-glow); opacity: 0; }
      .sl-rec .brkl { left: 124px; top: 30px; padding: 0 12px; background: #000; font: 600 22px/32px var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); opacity: 0; }
      .sl-rec .sum { left: 96px; right: 96px; top: 868px; display: flex; justify-content: center; gap: 120px; opacity: 0; }
      .sl-rec .sum div { display: flex; flex-direction: column; align-items: center; gap: 12px; }
      .sl-rec .sum b { font: 700 64px/1 var(--sans); letter-spacing: -.03em; color: var(--ink); }
      .sl-rec .sum span { font: 600 24px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
      .sl-rec .dimx { left: 0; top: 0; width: 1920px; height: 1080px; pointer-events: none; opacity: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.86) 66%, rgba(0,0,0,.92)); }
      .sl-rec .call { top: 720px; width: 790px; height: 250px; padding: 30px 34px; display: flex; flex-direction: column; gap: 16px; opacity: 0; }
      .sl-rec .call .top { display: flex; align-items: center; gap: 18px; }
      .sl-rec .call .ty { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-rec .call p { margin: 0; font: 600 34px/1.22 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-rec .call small { font: 500 24px/1.2 var(--sans); color: var(--ink-2); }
    `);

    const world = (this.world = M.world(root));
    M.dotGrid(world);
    const rec = (this.rec = M.html('<div class="rec"></div>'));
    world.appendChild(rec);
    this.hd = M.mount(rec, `<div class="hd"><span class="eb">Verify › Activity › Conversation</span><span class="sp"></span>
      <span>trace <b>7f3a9c2e41d84b0e9a5c</b></span><span>interaction <b>int-0412-de</b></span></div>`);
    this.conv = M.mount(rec, `<div class="conv">
      <div class="msg" data-k="m0"><div class="who">Applicant · DE<span>14:02:07</span></div><p>My application has been on hold since Monday. Why?</p></div>
      <div class="msg as" data-k="m1"><div class="who">Underwriting assistant<span>14:02:10</span></div><p>An underwriter is reviewing it. You’ll have their decision by 16:00 today.</p></div>
      <div class="msg" data-k="m2"><div class="who">Applicant · DE<span>14:03:22</span></div><p>Can I have until Friday to send my last payslip?</p></div>
      <div class="msg as" data-k="m3"><div class="who">Underwriting assistant<span>14:05:58</span></div><p>Yes. Your new deadline is Friday 30 October.</p></div></div>`);
    this.meta = M.mount(rec, `<div class="meta">
      <span class="k">System</span><span class="v">loan-origination</span>
      <span class="k">Application</span><span class="v">app-58213 · region DE</span>
      <span class="k">Bundle</span><span class="v">v4 · in force</span>
      <span class="k">Captured</span><span class="v">11 spans · 2 model calls · 4 verdicts</span></div>`);

    const G = this.G;
    this.wf = M.mount(rec, `<div class="wf"></div>`).root;
    this.wft = M.mount(rec, `<div class="wf-t">Trace</div>`).root;
    const ticks = [0, 1, 2, 3].map((s) => `<line class="grid" x1="${this.bx(s)}" x2="${this.bx(s)}" y1="164" y2="526"/><text class="tick" x="${this.bx(s) + 5}" y="160">${s ? s + ' s' : '0'}</text>`).join('');
    const brk = G.brk.map((x) => `<line x1="${x}" x2="${x}" y1="166" y2="526" stroke="rgba(241,241,241,.18)" stroke-dasharray="2 5"/>`).join('') + `<text class="brk" x="${G.brk[1] + 4}" y="160">+3 m 41 s</text>`;
    this.wfs = M.html(`<svg class="wfs" viewBox="0 0 1920 1080">${ticks}${brk}</svg>`);
    rec.appendChild(this.wfs);
    this.rows = this.SPANS.map((sp, i) => {
      const y = G.rowY + i * G.pitch;
      const a = this.bx(sp.a), b = this.bx(sp.b);
      const row = M.html(`<div class="row" style="top:${y}px"></div>`);
      const nm = M.html(`<div class="sn" style="left:${G.nameX + sp.d * 16}px;top:${y}px">${sp.n}</div>`);
      const kd = M.html(`<div class="kd2" style="left:${G.kindX}px;top:${y}px">${sp.k}</div>`);
      const bar = M.html(`<div class="bar ${sp.k}" style="left:${a}px;top:${y + 7.5}px;width:${Math.max(3, b - a)}px"></div>`);
      const tagW = sp.tag ? (sp.k === 'human' ? 0 : 92) : 0;
      const room = sp.b !== 'E' && 1795 - (b + 12 + tagW) > sp.m.length * 8.1;
      const mt = M.html(`<div class="mt" style="${room ? `left:${b + 12 + tagW}px` : `right:${1920 - a + 12}px;text-align:right`};top:${y + 7.5}px">${sp.m}</div>`);
      const tags = sp.tag ? (sp.k === 'human' ? [['warn', 'Held'], ['warn', 'Escalated'], ['ok', 'Approved']] : [sp.tag]) : [];
      const tg = tags.map(([tone, txt]) => M.html(`<span class="mk-chip tg ${tone}" style="top:${y + 3}px">${txt}</span>`));
      rec.append(row, kd, nm, bar, mt, ...tg);
      return { sp, row, kd, nm, bar, mt, tg, a, b, w: Math.max(3, b - a), y };
    });
    this.ph = M.html('<div class="ph"></div>');
    this.phl = M.html('<div class="phl"></div>');
    rec.append(this.ph, this.phl);

    this.vt = M.mount(rec, `<div class="vt">Verdicts</div>`).root;
    this.vrows = this.VERDICTS.map((v, i) => {
      const el = M.html(`<div class="vr" style="top:${584 + i * 50}px">
        <span class="mk-chip ${v.tone}">${v.v}</span><span class="kd">${v.kind}</span>
        <span class="vn">${v.name}</span><span class="id">${v.id}</span><span class="bd">v4</span><span class="rg">${v.reg}</span></div>`);
      rec.appendChild(el);
      return el;
    });
    this.brkt = M.html('<div class="brkt"></div>');
    this.brkl = M.html('<div class="brkl">One evidence record · int-0412-de</div>');
    world.append(this.brkt, this.brkl);

    /* stage-level layers, outside the camera: the climax callouts and the closing summary */
    this.dimx = M.html('<div class="dimx"></div>');
    root.appendChild(this.dimx);
    this.calls = [
      M.mount(root, `<div class="call tk-card" style="left:150px"><div class="top"><span class="tk-chip bad">Breached</span><span class="ty">Evaluation</span></div>
        <p>The draft decision’s rationale cites the applicant’s religion.</p><small>Score 0.21, below the 0.50 line</small></div>`).root,
      M.mount(root, `<div class="call tk-card" style="left:980px"><div class="top"><span class="tk-chip y">Held</span><span class="ty">Human</span></div>
        <p>An underwriter overrides the rationale and approves the referral.</p><small>A. Weber, inside the 4-hour limit</small></div>`).root,
    ];
    this.sum = M.mount(root, `<div class="sum"><div><b>4</b><span>messages</span></div><div><b>11</b><span>spans</span></div><div><b>4</b><span>verdicts</span></div><div><b class="tk-y">1</b><span>breach, decided by a person</span></div></div>`).root;
  },

  at(t) {
    const M = Mock, B = this.B, G = this.G;

    /* the conversation, large and centred, then it settles into the left column */
    M.rise(this.hd.root, t, 0.0, { dy: 10 });
    ['m0', 'm1', 'm2', 'm3'].forEach((k, i) => M.rise(this.conv[k], t, B.conv + i * 0.45, { dy: 16 }));
    const c = M.ease.inOutCubic(M.prog(t, B.compress, 0.9));
    const s0 = 1.6, x0 = 960 - 250 * s0 - 120, y0 = 30;
    this.conv.root.style.transform = `translate(${M.lerp(x0, 0, c).toFixed(1)}px, ${M.lerp(y0, 0, c).toFixed(1)}px) scale(${M.lerp(s0, 1, c).toFixed(4)})`;
    M.rise(this.meta.root, t, B.compress + 0.7);
    /* the left column steps back while the camera works on the trace, so no sliver of it shows at the edge */
    const away = 1 - M.ramp(t, 6.0, B.out + 0.9, 0.6, 0.9);
    this.conv.root.style.opacity = away.toFixed(3);
    this.meta.root.style.opacity = (Math.min(away, M.ease.css(M.prog(t, B.compress + 0.7, 0.7)))).toFixed(3);

    /* the waterfall, spans drawing on left to right behind a playhead */
    M.rise(this.wf, t, B.trace, { dy: 14 });
    M.fade(this.wft, t, B.trace + 0.2, 0.4);
    M.fade(this.wfs, t, B.trace + 0.2, 0.5);
    const [p0, p1, p2] = B.sweep;
    const phX = t < p1 ? M.lerp(G.barX, G.brk[0], M.prog(t, p0, p1 - p0)) : M.lerp(G.brk[0], G.end, M.ease.inOutCubic(M.prog(t, p1, p2 - p1)));
    const sweeping = t >= p0 && t < p2 + 0.4;
    M.set(this.ph, { left: phX.toFixed(1) + 'px', opacity: sweeping ? (1 - M.prog(t, p2, 0.4)).toFixed(3) : 0 });
    this.phl.style.left = phX.toFixed(1) + 'px';
    this.phl.style.opacity = this.ph.style.opacity;
    Talk.txt(this.phl, phX >= G.brk[1] ? '+3 m 41 s' : (((phX - G.barX) / G.pxs) || 0).toFixed(2) + ' s');

    const lit = this.VERDICTS.map((v, i) => [v.row, M.ramp(t, B.verdicts + i * 0.5, B.out + 0.4, 0.3, 0.5)]);
    this.rows.forEach((r, i) => {
      const reached = phX >= r.a - 1 && t >= p0;
      const tIn = p0 + ((r.a - G.barX) / (G.brk[0] - G.barX)) * (p1 - p0);
      const lab = M.prog(t, tIn - 0.05, 0.25);
      r.nm.style.opacity = lab;
      r.kd.style.opacity = lab;
      const w = M.clamp(phX - r.a, 0, r.w);
      r.bar.style.opacity = reached ? 1 : 0;
      r.bar.style.width = Math.max(reached ? 3 : 0, w).toFixed(1) + 'px';
      const done = w >= r.w - 0.5 && reached;
      const tDone = r.sp.b === 'E' ? p2 : p0 + ((r.b - G.barX) / (G.brk[0] - G.barX)) * (p1 - p0);
      M.fade(r.mt, t, tDone, 0.35);
      if (!done) r.mt.style.opacity = 0;
      const tagX = r.sp.b === 'E' ? r.a + 8 : r.b + 10;
      r.tg.forEach((el, k) => {
        el.style.left = tagX + 'px';
        let on;
        if (r.sp.k === 'human') {
          const at = [r.a, this.bx(2.62), G.end - 2][k], next = [this.bx(2.62), G.end - 2, Infinity][k];
          on = phX >= at && phX < next && t >= p0;
        } else on = done;
        el.style.opacity = on ? 1 : 0;
      });
      const hi = (lit.find(([row]) => row === i) || [0, 0])[1];
      const alarm = r.sp.k === 'eval' ? M.ramp(t, tDone, B.callEnd + 0.4, 0.15, 0.6) : r.sp.k === 'human' ? M.ramp(t, tDone - 0.2, B.callEnd + 0.4, 0.3, 0.6) * 0.8 : 0;
      r.row.style.background = alarm > hi ? `rgba(${r.sp.k === 'eval' ? '255,84,0' : '255,206,74'}, ${(0.16 * alarm).toFixed(3)})` : `rgba(255,206,74, ${(0.12 * hi).toFixed(3)})`;
    });

    /* the verdicts */
    M.fade(this.vt, t, B.verdicts - 0.2, 0.4);
    this.vrows.forEach((el, i) => M.rise(el, t, B.verdicts + i * 0.5, { dy: 14 }));

    /* the camera: the trace, the climax, the verdicts, then the whole record */
    const climax = [680, G.rowY + 8 * G.pitch - 8, 1120, 2 * G.pitch + 14];
    Talk.camera(this.world, t, [
      { t: 6.2, rect: [676, 120, 1128, 420], dur: 1.1 },
      { t: B.zoomIn, rect: climax, dur: 1.2, max: 1.7 },
      { t: B.zoomV, rect: [680, 560, 1120, 230], dur: 1.2 },
      { t: B.out, rect: null, dur: 1.3 },
    ]);

    /* the callouts at the climax, laid on the stage so they read at full size */
    const cv = M.ramp(t, B.call - 0.3, B.callEnd, 0.5, 0.5);
    this.dimx.style.opacity = cv.toFixed(3);
    this.calls.forEach((el, i) => {
      const a = M.ramp(t, B.call + i * 0.45, B.callEnd, 0.5, 0.45);
      el.style.opacity = a.toFixed(3);
      el.style.transform = `translateY(${((1 - M.p(t, B.call + i * 0.45, 0.8)) * 26).toFixed(1)}px)`;
    });

    /* one record */
    const fr = M.p(t, B.frame, 0.7, 'outCubic');
    this.brkt.style.opacity = fr; this.brkl.style.opacity = fr;
    this.brkt.style.transform = `scale(${(1.015 - 0.015 * fr).toFixed(4)})`;
    M.rise(this.sum, t, B.frame + 0.4);
  },
});
