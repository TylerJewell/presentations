/* Scene 5.1: One evidence record. Three beats on one recorded interaction (the conversation, its trace
   as a waterfall, its verdicts), a push-in on the trace's climax (the evaluation fails, the decision waits
   for an underwriter), then the record folds into one evidence entry that lands on the evidence rail
   beside the three stories of the film. */
registerScene({
  id: '5.1',
  act: 5,
  title: 'One evidence record',
  duration: 24,
  caption: 'And every conversation is captured end to end: what was said, every agent, tool and model call behind it, and every control that judged it, each verdict tied to the contract in force and the regulation it answers. A spec, a code change and a model change: three changes, one platform, one evidence record.',

  /* scene time of each beat */
  B: { conv: 0, compress: 2.3, trace: 2.9, sweep: [3.0, 5.6, 6.2], zoomIn: 5.0, zoomOut: 7.0, verdicts: 8.0, frame: 11.2, fold: 12.2, rail: 12.8, pulses: 14.6, head: 15.2 },

  /* the waterfall: seconds into the interaction; 'E' is past the break, when the underwriter answered */
  SPANS: [
    { n: 'POST /applications/app-58213/messages', k: 'endpoint', d: 0, a: 0.0, b: 2.64, m: '200 · 2.64 s' },
    { n: 'UnderwritingWorkflow · assess', k: 'workflow', d: 1, a: 0.02, b: 'E', m: '' },
    { n: 'guardrail · protected characteristics', k: 'control', d: 2, a: 0.04, b: 0.08, tag: ['ok', 'Allowed'], m: 'input' },
    { n: 'EligibilityAssessor', k: 'agent', d: 2, a: 0.09, b: 1.98, m: 'agent · session de-0412' },
    { n: 'tool · policy_lookup', k: 'tool', d: 3, a: 0.12, b: 0.31, m: 'lending-policy v12' },
    { n: 'tool · affordability_check', k: 'tool', d: 3, a: 0.33, b: 0.76, m: 'income 2 of 3 verified' },
    { n: 'gateway › small model', k: 'model', d: 3, a: 0.79, b: 1.22, m: 'underwrite-4b · 1,214 tok · $0.0004' },
    { n: 'gateway › frontier model', k: 'model', d: 3, a: 1.24, b: 1.95, m: 'DE route · 2,388 tok · $0.0291' },
    { n: 'evaluation · decision rationale', k: 'eval', d: 2, a: 2.0, b: 2.31, tag: ['bad', 'Fail'], m: 'cites the applicant’s religion · score 0.21' },
    { n: 'human · underwriter review', k: 'human', d: 2, a: 2.33, b: 'E', tag: ['warn', 'Held'], m: 'A. Weber · rationale overridden · SLA 4 h met' },
    { n: 'guardrail · adverse-action disclosure', k: 'control', d: 2, a: 2.58, b: 2.62, tag: ['ok', 'Allowed'], m: 'reply' },
  ],
  VERDICTS: [
    { tone: 'bad', v: 'Fail · caught', kind: 'Evaluation', name: 'Decisions don’t rely on a protected characteristic', id: 'ctl-ev-117', reg: 'ECOA · GDPR Art. 9', x: 'score 0.21', row: 8 },
    { tone: 'ok', v: 'Upheld', kind: 'Human', name: 'A flagged decision waits for an underwriter', id: 'ctl-hu-118', reg: 'EU AI Act Art. 14', x: 'timely · authorised · reasoned', row: 9 },
    { tone: 'ok', v: 'Pass', kind: 'Guardrail', name: 'No protected characteristic in the prompt', id: 'ctl-gr-042', reg: 'GDPR Art. 9', x: 'input', row: 2 },
    { tone: 'ok', v: 'Pass', kind: 'Guardrail', name: 'Adverse-action reasons are disclosed', id: 'ctl-gr-051', reg: 'ECOA', x: 'reply', row: 10 },
  ],
  STORIES: [
    { x: 375, t: 'Spec → proof', s: '17 of 17 conditions met', tone: 'ok' },
    { x: 765, t: 'Code → contract v4', s: 'signed · supersedes v3', tone: 'y' },
    { x: 1155, t: 'Model → promoted', s: 'exp-142 · −71% cost per call', tone: 'ok' },
    { x: 1545, t: 'Conversation int-0412-de', s: '11 spans · 4 verdicts · 1 caught', tone: 'y', isNew: true },
  ],
  /* waterfall geometry */
  G: { kindX: 700, nameX: 786, barX: 1150, pxs: 180, brk: [1700, 1728], end: 1772, rowY: 182, pitch: 31 },

  bx(s) { return s === 'E' ? this.G.end : this.G.barX + s * this.G.pxs; },

  render(root) {
    root.classList.add('s51');
    Mock.style('s51', `
      .s51 .rec { left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 960px 430px; }
      .s51 .rec > * { position: absolute; }
      .s51 .hd { left: 120px; right: 120px; top: 70px; display: flex; align-items: center; gap: 28px; font: 500 15px/1 var(--sans); color: var(--soft-grey); }
      .s51 .hd .sp { flex: 1; }
      .s51 .hd b, .s51 .vr .id { font-family: var(--mono); }
      .s51 .hd b { color: var(--white); font-weight: 600; }
      .s51 .conv { left: 120px; top: 132px; width: 500px; transform-origin: 0 0; display: flex; flex-direction: column; gap: 14px; }
      .s51 .msg { max-width: 430px; padding: 13px 16px 14px; border-radius: 12px; border: 1px solid var(--hair); background: #0f0f12; }
      .s51 .msg.as { align-self: flex-end; border-color: rgba(255,206,74,.30); background: rgba(255,206,74,.045); }
      .s51 .msg .who { font: 600 11.5px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 8px; display: flex; gap: 10px; }
      .s51 .msg.as .who { color: var(--yellow); }
      .s51 .msg .who span { margin-left: auto; color: var(--medium-grey); letter-spacing: .04em; }
      .s51 .msg p { margin: 0; font-size: 19px; line-height: 1.38; color: var(--white); }
      .s51 .meta { left: 120px; top: 620px; width: 500px; display: grid; grid-template-columns: 150px 1fr; row-gap: 12px; font: 500 14px/1.2 var(--sans); }
      .s51 .meta .k { color: var(--medium-grey); letter-spacing: .14em; text-transform: uppercase; font-weight: 600; font-size: 12px; padding-top: 2px; }
      .s51 .meta .v { color: var(--white); }
      .s51 .wf { left: 676px; top: 120px; width: 1128px; height: 420px; border: 1px solid var(--hair); border-radius: 12px; background: rgba(255,255,255,.018); }
      .s51 .wf-t { left: 700px; top: 138px; font: 600 12px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s51 svg.wfs { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s51 .tick { font: 500 12px var(--sans); fill: #5a5a5a; }
      .s51 .grid { stroke: rgba(241,241,241,.06); stroke-width: 1; }
      .s51 .row { left: 680px; width: 1120px; height: 29px; border-radius: 6px; }
      .s51 .sn { font: 500 13.5px/29px var(--mono); color: var(--white); white-space: nowrap; }
      .s51 .kd2 { font: 600 10.5px/29px var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--medium-grey); }
      .s51 .bar { height: 14px; border-radius: 3px; background: rgba(241,241,241,.24); transform-origin: 0 50%; }
      .s51 .bar.agent { background: rgba(255,206,74,.55); }
      .s51 .bar.model { background: rgba(255,206,74,.85); }
      .s51 .bar.eval { background: var(--red); }
      .s51 .bar.human { background: repeating-linear-gradient(135deg, rgba(255,206,74,.55) 0 6px, rgba(255,206,74,.18) 6px 12px); }
      .s51 .bar.control { background: var(--green); }
      .s51 .mt { font: 500 13px/14px var(--sans); color: var(--soft-grey); white-space: nowrap; }
      .s51 .tg { font-size: 11px; padding: 4px 7px; background-color: #0b0b0d; }
      /* the tags sit on span bars, so their tint is laid over a solid ground to stay readable */
      .s51 .tg.ok { background-image: linear-gradient(rgba(114,211,91,.14), rgba(114,211,91,.14)); }
      .s51 .tg.warn { background-image: linear-gradient(rgba(255,206,74,.14), rgba(255,206,74,.14)); }
      .s51 .tg.bad { background-image: linear-gradient(rgba(255,84,0,.16), rgba(255,84,0,.16)); }
      .s51 .ph { width: 2px; background: var(--yellow); box-shadow: 0 0 12px rgba(255,206,74,.7); top: 160px; height: 360px; }
      .s51 .phl { top: 146px; font: 600 12px/1 var(--sans); color: var(--yellow); transform: translateX(-50%); white-space: nowrap; }
      .s51 .brk { font: 600 12px var(--sans); fill: var(--soft-grey); }
      .s51 .vt { left: 700px; top: 566px; font: 600 12px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s51 .vr { left: 680px; width: 1120px; height: 44px; display: grid; grid-template-columns: 150px 104px minmax(0,1fr) 106px 44px 186px; align-items: center; gap: 0 14px;
        padding: 0 14px; border-top: 1px solid var(--hair); }
      .s51 .vr .kd { font: 600 12px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--soft-grey); }
      .s51 .vr .vn { font-size: 18px; color: var(--white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .s51 .vr .vn small { font: 500 12.5px var(--sans); color: var(--medium-grey); margin-left: 10px; }
      .s51 .vr .id, .s51 .vr .rg { font: 500 13.5px/1 var(--sans); color: var(--white); white-space: nowrap; }
      .s51 .vr .rg { color: var(--yellow); }
      .s51 .vr .bd { font: 600 12px/1 var(--sans); color: var(--white); border: 1px solid var(--hair-hi); border-radius: 999px; padding: 5px 8px; text-align: center; }
      .s51 .vr .mk-chip { font-size: 12px; padding: 6px 9px; justify-self: start; }
      .s51 .brkt { left: 96px; top: 52px; width: 1728px; height: 760px; border: 1.5px solid var(--yellow); border-radius: 16px; box-shadow: var(--yellow-glow); }
      .s51 .brkl { left: 120px; top: 40px; padding: 0 10px; background: #000; font: 600 13px/24px var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--yellow); }
      .s51 .railL { left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 960px 420px; }
      .s51 .railL > * { position: absolute; }
      .s51 svg.cn { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .s51 .cn line { stroke: rgba(255,206,74,.45); stroke-width: 1.5; }
      .s51 .node { width: 16px; height: 16px; margin: -8px 0 0 -8px; transform: rotate(45deg); background: #000; border: 2px solid var(--yellow); top: 420px; }
      .s51 .pill { top: 452px; width: 320px; padding: 14px 18px 15px; border: 1px solid var(--hair); border-radius: 12px; background: #0b0b0d; }
      .s51 .pill.new { border-color: rgba(255,206,74,.55); background: linear-gradient(160deg, rgba(255,206,74,.13), rgba(255,206,74,.035)); box-shadow: var(--yellow-glow); }
      .s51 .pill .pt { font: 600 21px/1.15 var(--sans); letter-spacing: -.01em; color: var(--white); }
      .s51 .pill .ps { margin-top: 7px; font: 500 13.5px/1.2 var(--sans); }
      .s51 .pill .ps.ok { color: var(--green); } .s51 .pill .ps.y { color: var(--yellow); }
      .s51 .pulse { width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: var(--yellow); box-shadow: 0 0 22px 8px rgba(255,206,74,.55); top: 420px; left: 0; }
      .s51 .sink { right: 160px; top: 384px; font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--yellow); }
      .s51 .h2b { left: var(--gutter); top: 590px; font-size: 64px; }
    `);

    const world = (this.world = Mock.world(root));
    Mock.dotGrid(world);
    const rec = (this.rec = Mock.html('<div class="rec"></div>'));
    world.appendChild(rec);

    this.hd = Mock.mount(rec, `<div class="hd"><span class="mk-eyebrow mono" style="font-size:13px">Verify › Activity › Conversation</span><span class="sp"></span>
      <span>trace <b>7f3a9c2e41d84b0e9a5c</b></span><span>interaction <b>int-0412-de</b></span></div>`);
    this.conv = Mock.mount(rec, `<div class="conv">
      <div class="msg" data-k="m0"><div class="who">Applicant · DE<span>14:02:07</span></div><p>My application has been on hold since Monday. Why?</p></div>
      <div class="msg as" data-k="m1"><div class="who">Underwriting assistant<span>14:02:10</span></div><p>An underwriter is reviewing it. You’ll have their decision by 16:00 today.</p></div>
      <div class="msg" data-k="m2"><div class="who">Applicant · DE<span>14:03:22</span></div><p>Can I have until Friday to send my last payslip?</p></div>
      <div class="msg as" data-k="m3"><div class="who">Underwriting assistant<span>14:05:58</span></div><p>Yes. Your new deadline is Friday 30 October.</p></div></div>`);
    this.meta = Mock.mount(rec, `<div class="meta">
      <span class="k">System</span><span class="v">loan-origination</span>
      <span class="k">Application</span><span class="v">app-58213 · region DE</span>
      <span class="k">Bundle</span><span class="v">v4 · in force</span>
      <span class="k">Captured</span><span class="v">11 spans · 2 model calls · 4 verdicts</span></div>`);

    /* waterfall */
    const G = this.G;
    this.wf = Mock.mount(rec, `<div class="wf"></div>`).root;
    this.wft = Mock.mount(rec, `<div class="wf-t">Trace</div>`).root;
    const ticks = [0, 1, 2, 3].map((s) => `<line class="grid" x1="${this.bx(s)}" x2="${this.bx(s)}" y1="164" y2="526"/><text class="tick" x="${this.bx(s) + 5}" y="160">${s ? s + ' s' : '0'}</text>`).join('');
    const brk = G.brk.map((x) => `<line x1="${x}" x2="${x}" y1="166" y2="526" stroke="rgba(241,241,241,.16)" stroke-dasharray="2 5"/>`).join('') + `<text class="brk" x="${G.brk[1] + 4}" y="160">+3 m 41 s</text>`;
    this.wfs = Mock.html(`<svg class="wfs" viewBox="0 0 1920 1080">${ticks}${brk}</svg>`);
    rec.appendChild(this.wfs);
    this.rows = this.SPANS.map((sp, i) => {
      const y = G.rowY + i * G.pitch;
      const a = this.bx(sp.a), b = this.bx(sp.b);
      const row = Mock.html(`<div class="row" style="top:${y}px"></div>`);
      const nm = Mock.html(`<div class="sn" style="left:${G.nameX + sp.d * 16}px;top:${y}px">${sp.n}</div>`);
      const kd = Mock.html(`<div class="kd2" style="left:${G.kindX}px;top:${y}px">${sp.k}</div>`);
      const bar = Mock.html(`<div class="bar ${sp.k}" style="left:${a}px;top:${y + 7.5}px;width:${Math.max(3, b - a)}px"></div>`);
      const tagW = sp.tag ? (sp.k === 'human' ? 0 : 86) : 0;
      const room = sp.b !== 'E' && 1795 - (b + 12 + tagW) > sp.m.length * 7.9;
      const mt = Mock.html(`<div class="mt" style="${room ? `left:${b + 12 + tagW}px` : `right:${1920 - a + 12}px;text-align:right`};top:${y + 7.5}px">${sp.m}</div>`);
      const tags = sp.tag ? (sp.k === 'human' ? [['warn', 'Held'], ['warn', 'Escalated'], ['ok', 'Approved']] : [sp.tag]) : [];
      const tg = tags.map(([tone, txt]) => {
        const el = Mock.html(`<span class="mk-chip tg ${tone}" style="top:${y + 3}px">${txt}</span>`);
        return el;
      });
      rec.append(row, kd, nm, bar, mt, ...tg);
      return { sp, row, kd, nm, bar, mt, tg, a, b, w: Math.max(3, b - a), y, room };
    });
    this.ph = Mock.html('<div class="ph"></div>');
    this.phl = Mock.html('<div class="phl"></div>');
    rec.append(this.ph, this.phl);

    /* verdicts */
    this.vt = Mock.mount(rec, `<div class="vt">Verdicts</div>`).root;
    this.vrows = this.VERDICTS.map((v, i) => {
      const el = Mock.html(`<div class="vr" style="top:${584 + i * 50}px">
        <span class="mk-chip ${v.tone}">${v.v}</span><span class="kd">${v.kind}</span>
        <span class="vn">${v.name}</span><span class="id">${v.id}</span><span class="bd">v4</span><span class="rg">${v.reg}</span></div>`);
      rec.appendChild(el);
      return el;
    });
    this.brkt = Mock.html('<div class="brkt"></div>');
    this.brkl = Mock.html('<div class="brkl">One evidence entry · int-0412-de</div>');
    world.append(this.brkt, this.brkl);

    /* the rail */
    const rl = (this.railL = Mock.html('<div class="railL"></div>'));
    world.appendChild(rl);
    const X0 = 205, CW = 340, CG = 50;
    this.cards = Mock.PRODUCTS.map((p, i) => {
      const el = Mock.productCard(rl, p, { compact: true });
      Mock.set(el, { left: X0 + i * (CW + CG) + 'px', top: '150px' });
      return el;
    });
    const cxs = Mock.PRODUCTS.map((_, i) => X0 + i * (CW + CG) + CW / 2);
    const cn = Mock.html(`<svg class="cn" viewBox="0 0 1920 1080">${cxs.map((x) => `<line x1="${x}" x2="${x}" y1="300" y2="420"/>`).join('')}</svg>`);
    rl.appendChild(cn);
    this.cn = [...cn.querySelectorAll('line')];
    this.rail = Mock.rail(rl, { style: { left: '160px', width: '1600px', top: '419px', height: '3px' } });
    this.sink = Mock.mount(rl, `<div class="sink">Evidence record</div>`).root;
    this.stories = this.STORIES.map((s) => {
      const node = Mock.html(`<div class="node" style="left:${s.x}px"></div>`);
      const pill = Mock.html(`<div class="pill${s.isNew ? ' new' : ''}" style="left:${s.x - 160}px"><div class="pt">${s.t}</div><div class="ps ${s.tone}">${s.s}</div></div>`);
      const pulse = Mock.html('<div class="pulse"></div>');
      rl.append(node, pill, pulse);
      return { s, node, pill, pulse };
    });
    this.h2 = Mock.mount(rl, `<h2 class="mk-h2 h2b">Three changes. One platform.<br><span class="accent">One evidence record.</span></h2>`).root;
  },

  at(t) {
    const M = Mock, B = this.B, G = this.G;

    /* beat 1: the conversation, large and centred, then it settles into the left column */
    M.rise(this.hd.root, t, 0.0, { dy: 10 });
    ['m0', 'm1', 'm2', 'm3'].forEach((k, i) => M.rise(this.conv[k], t, 0.1 + i * 0.45, { dy: 16 }));
    const c = M.ease.inOutCubic(M.prog(t, B.compress, 0.9));
    const s0 = 1.42, x0 = 960 - 250 * s0 - 120, y0 = 60;
    this.conv.root.style.transform = `translate(${M.lerp(x0, 0, c).toFixed(1)}px, ${M.lerp(y0, 0, c).toFixed(1)}px) scale(${M.lerp(s0, 1, c).toFixed(4)})`;
    M.rise(this.meta.root, t, B.compress + 0.7);

    /* beat 2: the waterfall, spans drawing on left to right behind a playhead */
    M.rise(this.wf, t, B.trace, { dy: 14 });
    M.fade(this.wft, t, B.trace + 0.2, 0.4);
    M.fade(this.wfs, t, B.trace + 0.2, 0.5);
    const [p0, p1, p2] = B.sweep;
    const phX = t < p1 ? M.lerp(G.barX, G.brk[0], M.prog(t, p0, p1 - p0))
      : M.lerp(G.brk[0], G.end, M.ease.inOutCubic(M.prog(t, p1, p2 - p1)));
    const sweeping = t >= p0 && t < p2 + 0.4;
    M.set(this.ph, { left: phX.toFixed(1) + 'px', opacity: sweeping ? (1 - M.prog(t, p2, 0.4)).toFixed(3) : 0 });
    this.phl.style.left = phX.toFixed(1) + 'px';
    this.phl.style.opacity = this.ph.style.opacity;
    this.phl.textContent = phX >= G.brk[1] ? '+3 m 41 s' : (((phX - G.barX) / G.pxs) || 0).toFixed(2) + ' s';

    const lit = this.VERDICTS.map((v, i) => [v.row, M.ramp(t, B.verdicts + i * 0.6, B.frame, 0.3, 0.5)]);
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
      /* status tags sit just after the label */
      const tagX = r.sp.b === 'E' ? r.a + 8 : r.b + 10;
      r.tg.forEach((el, k) => {
        el.style.left = tagX + 'px';
        let on;
        if (r.sp.k === 'human') {
          const at = [r.a, this.bx(2.62), G.end - 2][k];
          const next = [this.bx(2.62), G.end - 2, Infinity][k];
          on = phX >= at && phX < next && t >= p0;
        } else on = done;
        el.style.opacity = on ? 1 : 0;
      });
      const hi = (lit.find(([row]) => row === i) || [0, 0])[1];
      const alarm = r.sp.k === 'eval' ? M.ramp(t, tDone, B.zoomOut + 0.6, 0.15, 0.6) : r.sp.k === 'human' ? M.ramp(t, tDone - 0.2, B.zoomOut + 0.6, 0.3, 0.6) * 0.7 : 0;
      r.row.style.background = alarm > hi
        ? `rgba(${r.sp.k === 'eval' ? '255,84,0' : '255,206,74'}, ${(0.12 * alarm).toFixed(3)})`
        : `rgba(255,206,74, ${(0.1 * hi).toFixed(3)})`;
    });

    /* beat 3: the verdicts */
    M.fade(this.vt, t, B.verdicts - 0.2, 0.4);
    this.vrows.forEach((el, i) => M.rise(el, t, B.verdicts + i * 0.6, { dy: 14 }));

    /* the push-in on the climax, and back */
    const climax = [680, G.rowY + 8 * G.pitch - 8, 1120, 2 * G.pitch + 14];
    M.camera(this.world, t, [{ t: B.zoomIn, rect: climax, dur: 1.2 }, { t: B.zoomOut, rect: null, dur: 1.1 }]);

    /* fold into one entry, which lands on the rail */
    const fr = M.ramp(t, B.frame, B.fold + 0.6, 0.4, 0.5);
    this.brkt.style.opacity = fr; this.brkl.style.opacity = fr;
    this.brkt.style.transform = `scale(${(1.015 - 0.015 * M.p(t, B.frame, 0.6)).toFixed(4)})`;
    const f = M.ease.inOutCubic(M.prog(t, B.fold, 1.1));
    const target = this.STORIES[3];
    this.rec.style.transform = f ? `translate(${((target.x - 960) * f).toFixed(1)}px, ${((490 - 430) * f).toFixed(1)}px) scale(${M.lerp(1, 0.1, f).toFixed(4)})` : 'none';
    this.rec.style.opacity = (1 - M.prog(t, B.fold + 0.6, 0.5)).toFixed(3);

    /* the rail, pulled back to */
    const rv = M.prog(t, B.rail, 0.8);
    this.railL.style.opacity = rv;
    this.railL.style.transform = `scale(${(1.08 - 0.08 * M.ease.inOutCubic(M.prog(t, B.rail, 1.6))).toFixed(4)})`;
    this.cards.forEach((el, i) => { M.rise(el, t, B.rail + 0.1 + i * 0.08); M.cardDraw(el, t, B.rail + 0.3 + i * 0.08); M.cardGlow(el, 0.18 + 0.3 * M.ramp(t, B.pulses + i * 0.5 - 0.2, B.pulses + i * 0.5 + 0.9, 0.2, 0.5)); });
    this.cn.forEach((l, i) => M.draw(l, t, B.rail + 0.5 + i * 0.08, 0.5));
    M.railGrow(this.rail, t, B.rail + 0.4, 1.0);
    M.railAt(this.rail, t, 10);
    M.fade(this.sink, t, B.rail + 1.0, 0.5);
    this.stories.forEach((st, i) => {
      const isNew = st.s.isNew;
      const at = isNew ? B.fold + 0.9 : B.rail + 0.5 + i * 0.18;
      M.fade(st.node, t, at, 0.3);
      M.rise(st.pill, t, at + 0.05, { dy: isNew ? -18 : 14 });
      if (isNew) st.pill.style.transform += ` scale(${(0.9 + 0.1 * M.p(t, at, 0.6)).toFixed(4)})`;
      const ps = B.pulses + i * 0.5, pp = M.prog(t, ps, 1.3);
      M.set(st.pulse, { opacity: pp > 0 && pp < 1 ? Math.min(1, 4 * (1 - pp)).toFixed(3) : 0, left: M.lerp(st.s.x, 1760, M.ease.inOutCubic(pp)).toFixed(1) + 'px' });
    });
    const arrivals = this.stories.map((_, i) => M.ramp(t, B.pulses + i * 0.5 + 1.15, B.pulses + i * 0.5 + 1.9, 0.12, 0.6));
    this.sink.style.textShadow = `0 0 ${(18 * Math.max(...arrivals)).toFixed(1)}px rgba(255,206,74,.9)`;
    M.rise(this.h2, t, B.head);
  },
});
