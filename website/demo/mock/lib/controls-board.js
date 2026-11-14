/* S3Board: the one Controls board that scenes 3.2, 3.3 and 3.4 all draw (docs/plans/workflow/board.html):
   the rail of contracts, the lifecycle loop with its Amend arc, the readiness board, the contract's rows with their bound targets,
   and an evidence strip.

   The board is a pure function of one act clock, tau: seconds since 3.2 began (3.3 starts at tau 16,
   3.4 at tau 36). Every change in the act (the code changing, the confirm, the two new controls, the
   signature) is a time on that clock in S3Board.K, so each scene draws the same screen in the same
   state at its cut. Layout is in the console's logical px inside its page (1356 x 687); the caption
   owns the bottom-right corner, so the right side ends at page y 528 and the evidence strip sits
   bottom left. */
(function () {
  const M = window.Mock;
  const STAGES = [['adopt', 'Adopt'], ['describe', 'Describe'], ['plan', 'Plan'], ['decide', 'Decide'], ['sign', 'Sign'], ['inforce', 'In force']];
  const C = 160, R = 116, NODE = 37;
  const pt = (deg, r = R) => { const a = ((deg - 90) * Math.PI) / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };

  /* tau of each event in the act */
  const K = {
    change: 26.4, amend: 28.6, fact: 30.8,
    confirm: 37.8, rowA: 41.6, expA: [43.0, 48.6], rowB: 49.2, expB: [50.0, 52.2],
    ready: 53.2, sign: 54.4, inforce: 56.0, verdict: 58.4, chain: 58.4,
  };
  K.accA = K.rowA + 1.3; K.accB = K.rowB + 1.3;

  /* the rows of the contract in view; the rest are counted under them */
  const ROWS = [
    { name: 'Protected characteristics guardrail', type: 'Guardrail', tgt: ['agent', 'eligibility-assessor'], more: 1 },
    { name: 'No protected characteristic in the prompt', type: 'Guardrail', tgt: ['prompt', 'eligibility-assessor/system'] },
    { name: 'Adverse-action reasons are disclosed', type: 'Guardrail', tgt: ['guardrail', 'adverse-action-disclosure'], more: 1 },
    { name: 'Human oversight of credit decisions', type: 'Human', tgt: ['workflow', 'underwriting'], more: 1 },
  ];
  const NEW = [
    { name: 'Decisions don’t rely on a protected characteristic', type: 'Evaluation', tgt: ['agent', 'eligibility-assessor'],
      detail: 'Judges the rationale of every eligibility decision <i>·</i> fails below 0.50 <i>·</i> ECOA <i>·</i> GDPR Art. 9' },
    { name: 'A flagged decision waits for an underwriter', type: 'Human', tgt: ['workflow', 'underwriting'], sla: 'SLA 4 h',
      detail: 'Holds any decision the evaluation fails for an underwriter before it is issued <i>·</i> EU AI Act Art. 14' },
  ];
  /* the live verdict stream: one verdict every P seconds on the live clock */
  const P = 1.5;
  const STREAM = [
    { id: 'ctl-gr-038', n: 'Protected characteristics guardrail', v: 'Pass', tone: 'ok', reg: 'ECOA' },
    { id: 'ctl-sa-017', n: 'Personal data removed before a model call', v: 'Masked', tone: 'info', reg: 'GDPR Art. 5' },
    { id: 'ctl-gr-042', n: 'No protected characteristic in the prompt', v: 'Pass', tone: 'ok', reg: 'GDPR Art. 9' },
    { id: 'ctl-hu-021', n: 'Human oversight of credit decisions', v: 'Upheld', tone: 'ok', reg: 'EU AI Act Art. 14' },
    { id: 'ctl-gr-051', n: 'Adverse-action reasons are disclosed', v: 'Pass', tone: 'ok', reg: 'ECOA' },
  ];
  const STREAM4 = STREAM.concat([
    { id: 'ctl-ev-117', n: 'Decisions don’t rely on a protected characteristic', v: 'Pass', tone: 'ok', reg: 'ECOA' },
    { id: 'ctl-hu-118', n: 'A flagged decision waits for an underwriter', v: 'Upheld', tone: 'ok', reg: 'EU AI Act Art. 14' },
  ]);
  /* wall clock: the live clock M.abs plus this base reads 14:06 when v4 is signed */
  const CLOCK = 50501;
  const hms = (s) => { s = Math.floor(s); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return `${h}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}`; };

  const txt = (el, s) => { if (el._t !== s) { el.textContent = s; el._t = s; } };
  const htm = (el, s) => { if (el._h !== s) { el.innerHTML = s; el._h = s; } };
  const cls = (el, c) => { if (el.getAttribute('class') !== c) el.setAttribute('class', c); };
  const chip = (el, tone, word) => { cls(el, 'chip ' + tone); txt(el, word); };
  const tgt = (t) => `<span class="tgt"><b>${t[0]}</b>${t[1]}</span>`;
  let uid = 0;

  M.style('s3b', `
    .s3b .bd { position: absolute; left: 0; top: 0; width: 1356px; height: 687px; font: 14px/1.45 var(--sans); color: var(--c-text); }
    .s3b .bd > * { position: absolute; }
    .s3b .pn { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; overflow: hidden; }
    .s3b .pn > * { position: absolute; }
    .s3b .tok { font: 500 12px var(--mono); padding: 1px 6px; border-radius: 5px; background: var(--c-surface-2); color: var(--c-text); }
    .s3b .faint { color: var(--c-faint); font-size: 12px; }
    .s3b .chip { display: inline-flex; align-items: center; gap: 5px; height: 22px; padding: 0 8px; border-radius: 6px; font-size: 12px; font-weight: 500; white-space: nowrap; }
    .s3b .chip::before { font-size: 11px; }
    .s3b .chip.ok { color: var(--c-green); background: var(--c-green-bg); } .s3b .chip.ok::before { content: "\\2713"; }
    .s3b .chip.warn { color: var(--c-amber); background: var(--c-amber-bg); } .s3b .chip.warn::before { content: "!"; font-weight: 700; }
    .s3b .chip.info { color: var(--c-blue); background: var(--c-blue-bg); } .s3b .chip.info::before { content: "\\25CC"; }
    .s3b .chip.idle { color: var(--c-muted); background: var(--c-surface-2); } .s3b .chip.idle::before { content: "\\2013"; }
    .s3b .chip.out { color: var(--red); background: rgba(255,84,0,.15); } .s3b .chip.out::before { content: "\\2715"; }
    .s3b .chip.y { color: var(--c-gold-text); background: var(--c-gold-bg); } .s3b .chip.y::before { content: "\\25C6"; font-size: 9px; }
    .s3b .chip.sm { height: 18px; padding: 0 6px; font-size: 11px; }
    .s3b .chip.none { display: none; }
    .s3b .btn { display: inline-flex; align-items: center; height: 28px; padding: 0 12px; border-radius: 8px; box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-text); font-size: 13px; background: var(--c-surface); white-space: nowrap; }
    .s3b .btn.primary { background: var(--c-gold-bg); color: var(--c-gold-text); box-shadow: inset 0 0 0 1px var(--c-gold-ring); font-weight: 500; }
    .s3b .btn.ghost { opacity: .4; }
    .s3b .btn.sm { height: 24px; padding: 0 10px; font-size: 12.5px; }
    .s3b .btn.down { background: rgba(201,162,39,.32); }
    .s3b .tgt { display: inline-flex; align-items: center; gap: 5px; height: 20px; padding: 0 7px; border-radius: 6px; background: var(--c-surface-2); box-shadow: inset 0 0 0 1px var(--c-line); font: 500 11px var(--mono); color: var(--c-text); white-space: nowrap; }
    .s3b .tgt b { font: 500 10px var(--sans); color: var(--c-faint); letter-spacing: .02em; }
    .s3b .tgt.more { font: 500 11px var(--sans); color: var(--c-muted); padding: 0 6px; }
    .s3b .ty { display: inline-flex; align-items: center; gap: 6px; height: 20px; padding: 0 8px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-line); font-size: 11.5px; color: var(--c-muted); white-space: nowrap; }
    .s3b .ty::before { content: ""; width: 6px; height: 6px; border-radius: 2px; background: var(--c-faint); }
    .s3b .ty.Evaluation::before { border-radius: 50%; } .s3b .ty.Human::before { border-radius: 50% 50% 2px 2px; }
    .s3b .ty.Guardrail::before { transform: rotate(45deg); }
    .s3b .mini { display: inline-flex; gap: 3px; }
    .s3b .mini i { width: 8px; height: 8px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-faint); }
    .s3b .mini i.done { background: var(--c-green); box-shadow: none; }
    .s3b .mini i.now { background: var(--c-gold); box-shadow: 0 0 0 2px var(--c-gold-bg); }

    /* rail of contracts and the signature */
    .s3b .rail { left: 0; top: 0; width: 236px; height: 528px; }
    .s3b .rail .hd { left: 0; right: 0; top: 0; height: 34px; padding: 9px 14px; font-size: 12px; color: var(--c-faint); border-bottom: 1px solid var(--c-line); }
    .s3b .rail .r { left: 0; right: 0; height: 54px; padding: 9px 14px 0; border-bottom: 1px solid var(--c-line); overflow: hidden; }
    .s3b .rail .r.on { background: var(--c-gold-bg); }
    .s3b .rail .r .lay { position: absolute; left: 14px; right: 14px; top: 9px; }
    .s3b .rail .t { font-weight: 500; font-size: 13.5px; display: flex; gap: 8px; align-items: center; height: 19px; }
    .s3b .rail .m { color: var(--c-muted); font-size: 12px; display: flex; gap: 8px; align-items: center; margin-top: 4px; }
    .s3b .rail .sig { color: var(--c-faint); font: 500 11.5px var(--sans); }
    .s3b .rail .sg { left: 0; right: 0; bottom: 0; padding: 0 14px 10px; border-top: 1px solid var(--c-line); }
    .s3b .rail .sg .h { font-size: 12px; color: var(--c-faint); padding: 9px 0 4px; }
    .s3b .rail .sg .f { position: relative; padding: 6px 0 7px; border-bottom: 1px solid var(--c-line); }
    .s3b .rail .sg .f:last-child { border-bottom: 0; }
    .s3b .rail .sg .k { font-size: 11px; color: var(--c-faint); }
    .s3b .rail .sg .v { font-size: 13px; color: var(--c-text); white-space: nowrap; }
    .s3b .rail .sg .v.mono { font: 500 12px var(--mono); }
    .s3b .rail .sg .v .okk { color: var(--c-green); margin-right: 5px; }
    .s3b .rail .sg .glo { position: absolute; inset: 0 -14px; background: var(--c-gold-bg); opacity: 0; }
    .s3b .rail .sg .f > span { position: relative; }

    /* header line */
    .s3b .xhd { left: 252px; top: 0; width: 1104px; height: 26px; display: flex; align-items: center; gap: 10px; }
    .s3b .xhd h2 { margin: 0; font-size: 18px; font-weight: 500; }
    .s3b .xhd .meta { margin-left: auto; color: var(--c-muted); font-size: 13px; white-space: nowrap; }
    .s3b .xhd .meta .tok { margin: 0 2px; }

    /* the loop */
    .s3b .lp { left: 252px; top: 36px; width: 280px; height: 264px; }
    .s3b .lp svg { left: 15px; top: 7px; width: 250px; height: 250px; overflow: visible; }
    .s3b svg.loop .ring { fill: none; stroke: var(--c-line); stroke-width: 10; }
    .s3b svg.loop .arc { fill: none; stroke-width: 2.4; }
    .s3b svg.loop .arc.amend { stroke-width: 2.8; }
    .s3b svg.loop .arc.done { stroke: var(--c-green); } .s3b svg.loop .arc.now { stroke: var(--c-gold); }
    .s3b svg.loop .arc.held { stroke: var(--c-amber); stroke-width: 3.4; }
    .s3b svg.loop .arc.idle { stroke: var(--c-faint); stroke-dasharray: 3 4; opacity: .7; }
    .s3b svg.loop .glow { fill: none; stroke: var(--c-amber); stroke-width: 12; stroke-linecap: round; opacity: 0; }
    .s3b svg.loop .ah.done { fill: var(--c-green); } .s3b svg.loop .ah.now { fill: var(--c-gold); }
    .s3b svg.loop .ah.held { fill: var(--c-amber); } .s3b svg.loop .ah.idle { fill: var(--c-faint); opacity: .7; }
    .s3b svg.loop .node circle.c { fill: var(--c-surface); stroke: var(--c-line); stroke-width: 1.5; }
    .s3b svg.loop .node.done circle.c { fill: #15241a; stroke: var(--c-green); }
    .s3b svg.loop .node.now circle.c { fill: #2a2412; stroke: var(--c-gold); stroke-width: 2.5; }
    .s3b svg.loop .node.held circle.c { fill: #2a2312; stroke: var(--c-amber); stroke-width: 2.5; }
    .s3b svg.loop .halo { fill: none; stroke: var(--c-gold); stroke-width: 2; }
    .s3b svg.loop .node.held .halo { stroke: var(--c-amber); }
    .s3b svg.loop .node .n { fill: var(--c-text); font: 600 13px var(--sans); }
    .s3b svg.loop .node.idle .n { fill: var(--c-muted); font-weight: 500; }
    .s3b svg.loop .node .s { fill: var(--c-muted); font: 500 11px var(--sans); }
    .s3b svg.loop .node.done .s { fill: var(--c-green); }
    .s3b svg.loop .node.now .s { fill: var(--c-gold-text); }
    .s3b svg.loop .node.held .s { fill: var(--c-amber); }
    .s3b svg.loop .big { fill: var(--c-text); font: 600 36px var(--sans); letter-spacing: -.02em; }
    .s3b svg.loop .small { fill: var(--c-muted); font: 500 13px var(--sans); }
    .s3b svg.loop .al { font: 500 11.5px var(--sans); fill: var(--c-faint); }
    .s3b svg.loop .al.held { fill: var(--c-amber); font-weight: 600; } .s3b svg.loop .al.done { fill: var(--c-muted); }
    .s3b svg.loop .trig rect { fill: rgba(251,191,36,.16); stroke: rgba(251,191,36,.5); }
    .s3b svg.loop .trig text { fill: var(--c-amber); font: 600 12.5px var(--sans); }

    /* readiness */
    .s3b .rd { left: 548px; top: 36px; width: 808px; height: 264px; }
    .s3b .rd .hd { left: 16px; right: 16px; top: 12px; height: 22px; display: flex; align-items: baseline; gap: 10px; }
    .s3b .rd .hd h3 { margin: 0; font-size: 14px; font-weight: 600; }
    .s3b .rd .hd .faint { margin-left: auto; }
    .s3b .rr { left: 16px; right: 16px; height: 34px; display: grid; grid-template-columns: 148px minmax(0, 1fr) 132px 96px; gap: 14px; align-items: center; border-top: 1px solid var(--c-line); }
    .s3b .rr > * { position: relative; }
    .s3b .rr .fl { position: absolute; left: -16px; right: -16px; top: 0; bottom: 0; opacity: 0; }
    .s3b .rr .k { color: var(--c-muted); font-size: 13px; line-height: 1.1; white-space: nowrap; }
    .s3b .rr .k small { display: block; color: var(--c-faint); font-size: 11px; margin-top: 1px; }
    .s3b .rr .k small:empty { display: none; }
    .s3b .rr .v { text-align: right; font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .s3b .rr .c { height: 24px; display: flex; align-items: center; }
    .s3b .rr .c .btn { position: absolute; left: 0; top: 0; }
    .s3b .seg { position: relative; display: flex; height: 10px; border-radius: 999px; overflow: hidden; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); }
    .s3b .seg .done { background: var(--c-green); opacity: .85; }
    .s3b .seg .waiting { background: var(--c-amber); opacity: .75; }
    .s3b .seg.info .done { background: var(--c-blue); opacity: .75; }
    .s3b .mtr { height: 20px; display: flex; align-items: center; }
    .s3b .mtr > * { position: absolute; left: 0; right: 0; }
    .s3b .segt { font-size: 12.5px; color: var(--c-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .s3b .segt b { color: var(--c-text); font-weight: 600; }
    .s3b .segt b.hot { color: var(--red); }
    .s3b .segt .tok { font-size: 11.5px; }

    /* the contract's rows */
    .s3b .st { left: 252px; top: 312px; width: 1104px; height: 216px; }
    .s3b .st .hd { left: 16px; right: 16px; top: 10px; height: 30px; display: flex; align-items: center; gap: 12px; }
    .s3b .st .hd h3 { margin: 0; font-size: 15px; font-weight: 600; min-width: 92px; }
    .s3b .st .hd .right { margin-left: auto; display: flex; gap: 8px; align-items: center; position: relative; }
    .s3b .switch { display: inline-flex; gap: 2px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 10px; padding: 3px; font-size: 12.5px; }
    .s3b .switch span { padding: 3px 10px; border-radius: 7px; color: var(--c-muted); }
    .s3b .switch span.on { background: var(--c-surface-2); color: var(--c-text); box-shadow: inset 0 0 0 1px var(--c-line); }
    .s3b .tr { left: 0; right: 0; display: grid; grid-template-columns: 22px minmax(0, 1fr) 112px 300px 116px 28px; gap: 12px; align-items: center; padding: 0 16px; }
    .s3b .tr > * { position: relative; }
    .s3b .th { top: 46px; height: 26px; font-size: 12px; color: var(--c-faint); border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); background: var(--c-sunk); }
    .s3b .clip { left: 0; right: 0; top: 72px; height: 112px; overflow: hidden; }
    .s3b .clip > * { position: absolute; }
    .s3b .row { height: 28px; border-bottom: 1px solid var(--c-line); align-items: start; overflow: hidden; }
    .s3b .row > * { margin-top: 4px; min-height: 20px; display: flex; align-items: center; }
    .s3b .row .hi { position: absolute; inset: 0; margin: 0; background: var(--c-gold-bg); opacity: 0; }
    .s3b .row .nm { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; line-height: 20px; }
    .s3b .row .op { width: 22px; height: 20px; border-radius: 6px; box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-muted); justify-content: center; font-size: 11px; }
    .s3b .row .det { position: absolute; left: 50px; right: 16px; top: 28px; margin: 0; height: 22px; font-size: 12.5px; color: var(--c-muted); white-space: nowrap; }
    .s3b .row .det i { font-style: normal; color: var(--c-faint); margin: 0 4px; }
    .s3b .row .sla { font: 500 11px var(--sans); color: var(--c-gold-text); margin-left: 8px; }
    .s3b .row .targets { display: flex; gap: 4px; align-items: center; }
    .s3b .chg { display: inline-flex; width: 18px; height: 18px; border-radius: 5px; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; color: var(--c-green); background: var(--c-green-bg); }
    .s3b .stfoot { left: 0; right: 0; top: 184px; height: 32px; padding: 0 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--c-faint); background: var(--c-sunk); }
    .s3b .stfoot b { color: var(--c-muted); font-weight: 500; }

    /* evidence strip */
    .s3b .ev { left: 0; top: 540px; width: 585px; height: 147px; }
    .s3b .ev .hd { left: 14px; right: 14px; top: 9px; height: 22px; display: flex; align-items: center; gap: 10px; }
    .s3b .ev .hd h3 { margin: 0; font-size: 14px; font-weight: 600; }
    .s3b .ev .hd .live { width: 7px; height: 7px; border-radius: 50%; background: var(--c-green); }
    .s3b .ev .hd .faint { margin-left: auto; font-variant-numeric: tabular-nums; }
    .s3b .ev .clip { top: 38px; height: 99px; }
    .s3b .er { left: 0; right: 0; height: 33px; display: grid; grid-template-columns: 58px 76px minmax(0, 1fr) 82px 22px 104px; gap: 8px; align-items: center; padding: 0 14px; border-top: 1px solid var(--c-line); font-size: 12.5px; }
    .s3b .er > * { position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .s3b .er .tm { font: 500 11.5px var(--sans); color: var(--c-faint); font-variant-numeric: tabular-nums; }
    .s3b .er .id { font: 500 11.5px var(--mono); color: var(--c-faint); }
    .s3b .er .id { color: var(--c-muted); }
    .s3b .er .bn { font: 500 11px var(--sans); color: var(--c-muted); }
    .s3b .er .rg { font-size: 12px; color: var(--c-gold-text); text-align: right; }
    .s3b .er .bg { position: absolute; inset: 0; opacity: 0; }
    .s3b .er.pin.y .bg { background: var(--c-gold-bg); opacity: 1; }
    .s3b .er.pin.warn .bg { background: var(--c-amber-bg); opacity: 1; }
    .s3b .er.pin .nm { color: var(--c-text); font-weight: 500; }

    /* the seal */
    .s3b .seal { left: 718px; top: 330px; width: 184px; height: 184px; opacity: 0; pointer-events: none; }
    .s3b .seal svg { width: 184px; height: 184px; overflow: visible; }
    .s3b .seal .o { fill: rgba(22,22,25,.94); stroke: var(--c-gold); stroke-width: 3; }
    .s3b .seal .i { fill: none; stroke: var(--c-gold); stroke-width: 1; stroke-dasharray: 2 4; }
    .s3b .seal .rt { font: 600 11.5px var(--sans); letter-spacing: .16em; fill: var(--c-gold-text); }
    .s3b .seal .bg2 { font: 700 54px var(--sans); letter-spacing: -.03em; fill: var(--c-gold-text); }
    .s3b .seal .sm2 { font: 600 12px var(--sans); letter-spacing: .14em; fill: var(--c-gold-text); }
    .s3b .burst { left: 810px; top: 422px; width: 0; height: 0; }
    .s3b .burst i { position: absolute; left: -100px; top: -100px; width: 200px; height: 200px; border-radius: 50%; border: 2px solid var(--c-gold); opacity: 0; }
  `);

  function buildLoop(host) {
    const svg = M.svg('svg', { viewBox: '0 0 320 320', class: 'loop' }, host);
    M.svg('circle', { cx: C, cy: C, r: R, class: 'ring' }, svg);
    const gap = (((NODE + 7) / R) * 180) / Math.PI;
    const arcs = STAGES.map((_, i) => {
      const from = i * 60 + gap, to = (i + 1) * 60 - gap;
      const [x1, y1] = pt(from), [x2, y2] = pt(to);
      const d = `M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)}`;
      const glow = i === 5 ? M.svg('path', { d, class: 'glow' }, svg) : null;
      const path = M.svg('path', { d, class: 'arc' }, svg);
      const [hx, hy] = pt(to), [bx, by] = pt(to - 5, R - 5), [cx, cy] = pt(to - 5, R + 5);
      const head = M.svg('path', { d: `M${hx},${hy} L${bx},${by} L${cx},${cy} Z`, class: 'ah' }, svg);
      return { path, head, glow };
    });
    const [lx, ly] = pt(330, R + 30);
    const al = M.svg('text', { x: lx, y: ly + 4, class: 'al', 'text-anchor': 'middle' }, svg);
    al.textContent = 'Amend';
    const nodes = STAGES.map(([, name], i) => {
      const [x, y] = pt(i * 60);
      const g = M.svg('g', { class: 'node idle' }, svg);
      const halo = M.svg('circle', { cx: x, cy: y, r: NODE, class: 'halo' }, g);
      M.svg('circle', { cx: x, cy: y, r: NODE, class: 'c' }, g);
      const n = M.svg('text', { x, y: y - 1, class: 'n', 'text-anchor': 'middle' }, g);
      n.textContent = name;
      const s = M.svg('text', { x, y: y + 14, class: 's', 'text-anchor': 'middle' }, g);
      return { g, halo, s };
    });
    const mk = (y, c) => M.svg('text', { x: C, y, class: c, 'text-anchor': 'middle' }, svg);
    const big = mk(C + 4, 'big'), s1 = mk(C + 25, 'small'), s2 = mk(C + 42, 'small');
    const trig = M.svg('g', { class: 'trig' }, svg);
    const tr = M.svg('rect', { x: C - 52, y: C + 52, width: 104, height: 24, rx: 12 }, trig);
    const tt = M.svg('text', { x: C, y: C + 68.5, 'text-anchor': 'middle' }, trig);
    tt.textContent = 'Code changed';
    return { svg, arcs, al, nodes, big, s1, s2, trig, tr };
  }

  window.S3Board = {
    K, OFFSET: { '3.2': 0, '3.3': 16, '3.4': 36 },

    build(root) {
      const b = Object.create(this.proto);
      root.classList.add('s3b');
      b.world = M.world(root);
      b.frame = M.consoleFrame(b.world, { crumb: 'Verify › Controls', title: 'Controls', bundle: 'v3' });
      b.bottomBundle = b.frame.bundle;
      b.frame.page.style.height = '687px';
      const id = 's3seal' + uid++;
      b.r = M.mount(b.frame.page, `<div class="bd">
        <div class="pn rail">
          <div class="hd">Contracts</div>
          <div class="r on" data-k="rTop"><div class="lay" data-k="rDraft"><div class="t">Draft <span class="chip info sm">Amending v3</span></div><div class="m" data-k="rDots"></div></div>
            <div class="lay" data-k="rV4"><div class="t">v4 <span class="chip ok sm">In force</span></div><div class="m"><span class="sig">14:06</span><span>178 rows, 40 bound</span></div></div></div>
          <div class="r" data-k="rV3"><div class="lay"><div class="t">v3 <span class="chip ok sm" data-k="rV3c">In force</span></div><div class="m"><span class="sig">10-23</span><span data-k="rV3m">176 rows, 38 bound</span></div></div></div>
          <div class="r" data-k="rV2"><div class="lay"><div class="t">v2</div><div class="m"><span class="sig">10-09</span><span>+3 −1 rows</span></div></div></div>
          <div class="r" data-k="rV1"><div class="lay"><div class="t">v1</div><div class="m"><span class="sig">09-24</span><span>171 rows</span></div></div></div>
          <div class="sg" data-k="sg"><div class="h">Signature</div>
            <div class="f"><div class="glo"></div><span class="k">Signed by</span><div class="v"><span data-k="sgBy">T. Jewell · 10-23</span></div></div>
            <div class="f"><div class="glo"></div><span class="k">Keys</span><div class="v"><span class="okk">✓</span><span>2 of 2 trusted</span></div></div>
            <div class="f"><div class="glo"></div><span class="k">Chain</span><div class="v"><span data-k="sgCh">v3 ← v2 ← v1</span></div></div>
            <div class="f"><div class="glo"></div><span class="k">Digest</span><div class="v mono"><span data-k="sgDg">9c41e0b2</span></div></div>
          </div>
        </div>
        <div class="xhd"><h2>loan-origination</h2><span class="chip ok" data-k="c1">v3 in force</span><span class="chip none" data-k="c2"></span><span class="meta" data-k="meta"></span></div>
        <div class="pn lp" data-k="lp"></div>
        <div class="pn rd" data-k="rd"><div class="hd"><h3>Readiness</h3><span class="faint" data-k="rdCap"></span></div></div>
        <div class="pn st" data-k="st">
          <div class="hd"><h3 data-k="stH">v3</h3><span class="switch"><span class="on" data-k="swAll">All 176</span><span data-k="swB">Bound 38</span><span>Not bound 138</span></span>
            <span class="right"><span class="btn" data-k="stBtn">Compare</span></span></div>
          <div class="tr th"><span></span><span>Control</span><span>Type</span><span>Bound to</span><span>Latest verdict</span><span></span></div>
          <div class="clip" data-k="clip"></div>
          <div class="stfoot" data-k="more"></div>
        </div>
        <div class="pn ev" data-k="ev"><div class="hd"><span class="live" data-k="live"></span><h3>Evidence</h3><span class="faint" data-k="evN"></span></div><div class="clip" data-k="evClip"></div></div>
        <div class="seal" data-k="seal"><svg viewBox="0 0 200 200"><defs><path id="${id}" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs>
          <circle cx="100" cy="100" r="96" class="o"/><circle cx="100" cy="100" r="64" class="i"/>
          <text class="rt"><textPath href="#${id}">loan-origination · contract v4 · ed25519 · 2 of 2 keys ·</textPath></text>
          <text x="100" y="108" text-anchor="middle" class="bg2">v4</text><text x="100" y="132" text-anchor="middle" class="sm2">SIGNED 14:06</text></svg></div>
        <div class="burst" data-k="burst"><i></i></div>
      </div>`);
      const r = b.r;
      b.loop = buildLoop(r.lp);
      b.sgf = [...r.sg.querySelectorAll('.f .glo')];

      /* readiness rows */
      const RL = [['Baseline', ''], ['Required facts', 'to open Plan'], ['Facts from code', ''], ['Rows decided', 'to open Sign'], ['Bound to code', ''], ['Code in sync', '']];
      b.rr = RL.map(([label, gate], i) => {
        const x = M.mount(r.rd, `<div class="rr" style="top:${38 + i * 34}px"><div class="fl" data-k="fl"></div>
          <div class="k">${label}<small data-k="gate">${gate}</small></div>
          <div class="mtr"><div class="seg" data-k="seg"><span class="done" data-k="dn"></span><span class="waiting" data-k="wt"></span></div><div class="segt" data-k="tx"></div></div>
          <div class="v" data-k="v"></div><div class="c"><span class="chip" data-k="ch"></span><span class="btn primary sm" data-k="btn">Confirm</span></div></div>`);
        x.gateText = gate;
        return x;
      });

      /* contract rows: four in force, two that the amendment adds */
      const rowHtml = (d, isNew) => `<div class="tr row"><div class="hi" data-k="hi"></div><span>${isNew ? '<span class="chg">+</span>' : ''}</span>
        <span class="nm">${d.name}</span><span><span class="ty ${d.type}">${d.type}</span></span>
        <span class="targets" data-k="tg">${tgt(d.tgt)}${d.more ? `<span class="tgt more">+${d.more}</span>` : ''}${d.sla ? `<span class="sla">${d.sla}</span>` : ''}</span>
        <span><span class="chip ok" data-k="vd">Satisfied</span></span><span class="op">↗</span>${d.detail ? `<div class="det">${d.detail}</div>` : ''}</div>`;
      b.base = ROWS.map((d) => M.mount(r.clip, rowHtml(d, false)));
      b.add = NEW.map((d) => M.mount(r.clip, rowHtml(d, true)));

      /* evidence rows: a pool, filled each frame from the live stream */
      b.pin = M.mount(r.evClip, `<div class="er pin"><div class="bg"></div><span class="tm"></span><span class="id"></span><span class="nm"></span><span><span class="chip"></span></span><span class="bn"></span><span class="rg"></span></div>`);
      b.pool = [0, 1, 2, 3].map(() => M.mount(r.evClip, `<div class="er"><div class="bg"></div><span class="tm"></span><span class="id"></span><span class="nm"></span><span><span class="chip"></span></span><span class="bn"></span><span class="rg"></span></div>`));
      [b.pin, ...b.pool].forEach((x) => { const c = x.root.children; x.c = { bg: c[0], tm: c[1], id: c[2], nm: c[3], ch: c[4].firstChild, bn: c[5], rg: c[6] }; });
      return b;
    },

    proto: {
      /* stage px of a rect given in page px (the console's logical px inside its page) */
      P(x, y, w, h) {
        const o = this.o || { x: 266.4, y: 200.4, k: 1.2 };
        return [o.x + x * o.k, o.y + y * o.k, w * o.k, h * o.k];
      },
      measure() {
        const [x, y, w] = M.rectOf(this.world, this.frame.page);
        if (w) this.o = { x, y, k: this.frame.scale };
      },
      /* the stage rect of an element inside the world, measured unzoomed */
      rectOf(el) { return M.rectOf(this.world, el); },
      rect(name, i) {
        switch (name) {
          case 'loop': return this.P(252, 36, 280, 264);
          case 'ready': return this.P(548, 36, 808, 264);
          case 'readyRow': return this.P(548, 74 + i * 34, 808, 34);
          case 'hero': return this.P(252, 36, 1104, 264);
          case 'stage': return this.P(252, 312, 1104, 216);
          case 'rows': return this.P(252, 312, 1104, 130);
          case 'rail': return this.P(0, 0, 236, 528);
          case 'sig': return this.P(0, 340, 236, 188);
          case 'evidence': return this.P(0, 540, 585, 147);
          default: return null;
        }
      },

      /* the whole board at act time tau; t is the scene's local time, for the live clock */
      at(tau, t) {
        if (!this.o) this.measure();
        const r = this.r, has = (k) => tau >= K[k];
        const changed = has('change') && !has('inforce');
        const reopened = has('change') && !has('confirm');
        const amending = has('confirm') && !has('inforce');
        const v4 = has('inforce');

        /* the loop */
        const L = this.loop, ph = M.loop(t, 1.8);
        let cur = 'inforce';
        if (amending) cur = tau < K.confirm + 0.8 ? 'describe' : tau < K.rowA ? 'plan' : tau < K.ready ? 'decide' : 'sign';
        const ci = STAGES.findIndex(([k]) => k === cur);
        const st = STAGES.map(([k], i) => (amending ? (i < ci ? 'done' : i === ci ? 'now' : 'idle') : i < 5 ? 'done' : has('amend') && reopened ? 'held' : 'now'));
        const amendTone = amending ? 'done' : has('amend') && reopened ? 'held' : 'idle';
        L.nodes.forEach((n, i) => {
          cls(n.g, 'node ' + st[i]);
          const pulse = st[i] === 'now' || st[i] === 'held';
          n.halo.setAttribute('r', (NODE + 2 + 10 * ph).toFixed(2));
          n.halo.style.opacity = pulse ? (0.6 * (1 - ph)).toFixed(3) : 0;
          let note = st[i] === 'done' ? '✓' : '';
          if (i === 5) note = v4 ? 'v4' : amending ? '' : 'v3';
          if (amending && i === ci) note = { describe: '1 fact', plan: '+2 rows', decide: tau < K.accB ? (tau < K.accA ? '2 left' : '1 left') : 'Done', sign: 'v4' }[cur];
          txt(n.s, note);
        });
        L.arcs.forEach((a, i) => {
          let s;
          if (i === 5) s = amendTone;
          else { const f = st[i], g = st[i + 1]; s = g === 'held' ? 'held' : g === 'now' ? 'now' : f === 'done' && g === 'done' ? 'done' : 'idle'; }
          cls(a.path, 'arc ' + s + (i === 5 ? ' amend' : ''));
          cls(a.head, 'ah ' + s);
        });
        const lit = M.prog(tau, K.amend, 0.5) * (1 - M.prog(tau, K.confirm, 0.4));
        L.arcs[5].glow.style.opacity = (lit * (0.16 + 0.12 * M.wave(t, 1.6)) + 0.5 * M.ramp(tau, K.amend, K.amend + 1.4, 0.15, 1.0)).toFixed(3);
        cls(L.al, 'al ' + amendTone);
        const center = v4 ? ['v4', 'in force', 'since 14:06'] : amending ? ['v4', tau < K.ready ? 'amending v3' : 'ready to sign', ''] : ['v3', 'in force', reopened && has('amend') ? '' : 'since 10-23'];
        txt(L.big, center[0]); txt(L.s1, center[1]); txt(L.s2, center[2]);
        const tp = has('amend') && reopened ? M.p(tau, K.amend + 0.25, 0.6) : 0;
        L.trig.style.opacity = tp.toFixed(3);
        L.trig.setAttribute('transform', `translate(0 ${((1 - tp) * 8 - 18).toFixed(2)})`);

        /* header */
        chip(r.c1, 'ok', v4 ? 'v4 in force' : 'v3 in force');
        if (reopened) chip(r.c2, 'warn', 'Code changed');
        else if (amending) chip(r.c2, 'info', 'Amending v3');
        else chip(r.c2, 'none', '');
        r.c2.style.opacity = reopened ? M.p(tau, K.change, 0.5).toFixed(3) : 1;
        htm(r.meta, v4 ? 'Signed 14:06 · baseline acme-ai v3 · corpus 2026-09 · AI-BOM <span class="tok">213f6517</span>'
          : changed ? 'AI-BOM <span class="tok">213f6517</span> · v3 describes <span class="tok">60b8e667</span>'
            : 'Signed 10-23 · baseline acme-ai v3 · corpus 2026-09 · AI-BOM <span class="tok">60b8e667</span>');
        txt(this.bottomBundle, v4 ? 'v4' : 'v3');

        /* readiness */
        txt(r.rdCap, v4 ? 'v4 · signed 14:06 today' : amending ? 'Amending v3' : 'v3 · signed 10-23');
        const nNew = (tau >= K.rowA ? 1 : 0) + (tau >= K.rowB ? 1 : 0);
        const nAcc = (tau >= K.accA ? 1 : 0) + (tau >= K.accB ? 1 : 0);
        const rows = 176 + nNew;
        const R6 = [
          { text: 'acme-ai v3 · published 10-02', v: 'Current', tone: 'ok', w: 'Met' },
          { done: 16, of: 16, v: '16 of 16', tone: 'ok', w: 'Met' },
          has('fact') && !has('confirm') ? { text: 'Data types: financial, <b class="hot">religion</b> — confirm again', v: '6 of 7', btn: true }
            : has('confirm') ? { done: 7, of: 7, v: '7 of 7', tone: 'ok', w: 'Met' } : { done: 6, of: 6, v: '6 of 6', tone: 'ok', w: 'Met' },
          nNew > nAcc ? { done: 176 + nAcc, waiting: nNew - nAcc, of: rows, v: `${176 + nAcc} of ${rows}`, tone: 'warn', w: `${nNew - nAcc} to decide` }
            : { done: rows, of: rows, v: `${rows} of ${rows}`, tone: 'ok', w: 'Met' },
          { done: 38 + nNew, of: rows, v: `${38 + nNew} of ${rows}`, tone: 'info', w: `${38 + nNew} rows`, info: true },
          changed ? { text: '<span class="tok">213f6517</span> · v3 describes <span class="tok">60b8e667</span>', v: 'Changed', tone: 'out', w: 'Changed' }
            : { text: `<span class="tok">${v4 ? '213f6517' : '60b8e667'}</span>`, v: 'Matches', tone: 'ok', w: 'Met' },
        ];
        R6.forEach((s, i) => {
          const x = this.rr[i];
          const seg = s.of != null;
          x.seg.style.display = seg ? '' : 'none';
          x.tx.style.display = seg ? 'none' : '';
          cls(x.seg, 'seg' + (s.info ? ' info' : ''));
          if (seg) { x.dn.style.width = (100 * s.done / s.of).toFixed(2) + '%'; x.wt.style.width = (100 * (s.waiting || 0) / s.of).toFixed(2) + '%'; }
          else htm(x.tx, s.text);
          txt(x.v, s.v);
          x.ch.style.display = s.btn ? 'none' : '';
          x.btn.style.display = s.btn ? '' : 'none';
          if (!s.btn) chip(x.ch, s.tone, s.w);
          x.btn.classList.toggle('down', tau >= K.confirm - 0.12 && tau < K.confirm + 0.1);
          txt(x.gate, amending ? x.gateText : '');
        });
        /* flashes where a row changes */
        const fl = [
          [5, 'rgba(255,84,0,.16)', M.ramp(tau, K.change, K.change + 2.6, 0.12, 1.4)],
          [2, 'rgba(251,191,36,.14)', M.ramp(tau, K.fact, K.fact + 2.4, 0.15, 1.2)],
          [2, 'rgba(74,222,128,.12)', M.ramp(tau, K.confirm, K.confirm + 1.6, 0.1, 1.0)],
          [3, 'rgba(251,191,36,.10)', Math.max(M.ramp(tau, K.rowA, K.rowA + 1.6, 0.1, 0.9), M.ramp(tau, K.rowB, K.rowB + 1.6, 0.1, 0.9))],
          [5, 'rgba(74,222,128,.14)', M.ramp(tau, K.inforce + 0.4, K.inforce + 2.6, 0.12, 1.4)],
        ];
        this.rr.forEach((x) => { x.fl.style.opacity = 0; });
        fl.forEach(([i, c, a]) => { if (a > 0.001) { this.rr[i].fl.style.background = c; this.rr[i].fl.style.opacity = a.toFixed(3); } });

        /* the contract's rows */
        txt(r.stH, v4 ? 'v4' : amending ? 'v4 against v3' : 'v3');
        txt(r.swAll, `All ${rows}`); txt(r.swB, `Bound ${38 + nNew}`);
        const btn = v4 || !has('change') ? ['btn', 'Compare'] : reopened ? ['btn primary', 'Amend v3']
          : [tau >= K.ready ? 'btn primary' + (tau >= K.sign - 0.12 && tau < K.sign + 0.12 ? ' down' : '') : 'btn primary ghost', 'Sign v4'];
        cls(r.stBtn, btn[0]); txt(r.stBtn, btn[1]);
        const items = [];
        const exp = [M.ramp(tau, K.expA[0], K.expA[1], 0.5, 0.5), M.ramp(tau, K.expB[0], K.expB[1], 0.5, 0.5)];
        this.add.forEach((x, i) => {
          const p = M.p(tau, i ? K.rowB : K.rowA, 0.8, 'inOutCubic');
          items.push({ x, h: (28 + 26 * exp[i]) * p, p, isNew: i, a: i ? K.rowB : K.rowA });
        });
        this.base.forEach((x) => items.push({ x, h: 28, p: 1 }));
        let y = 0, shown = 0;
        items.forEach((it) => {
          it.x.root.style.top = y.toFixed(2) + 'px';
          it.x.root.style.height = Math.max(0, it.h).toFixed(2) + 'px';
          it.x.root.style.display = it.h < 0.5 ? 'none' : '';
          if (it.isNew != null) {
            const q = M.p(tau, it.a + 0.2, 0.7);
            [...it.x.root.children].forEach((c, k) => { if (k > 0) { c.style.opacity = q.toFixed(3); c.style.transform = `translateX(${((1 - q) * -18).toFixed(2)}px)`; } });
            it.x.hi.style.opacity = (Math.min(1, 0.3 + 0.7 * M.ramp(tau, it.a, it.a + 4.2, 0.2, 1.4) + 0.7 * exp[it.isNew]) * M.prog(tau, it.a, 0.3)).toFixed(3);
            const acc = tau >= (it.isNew ? K.accB : K.accA);
            if (!acc) chip(it.x.vd, 'idle', 'Undecided');
            else if (!v4) chip(it.x.vd, 'ok', 'Accepted');
            else if (!it.isNew && tau >= K.verdict) chip(it.x.vd, 'ok', 'Satisfied');
            else chip(it.x.vd, 'idle', 'No verdict');
          }
          if (y < 112 - 4 && it.h > 0.5) shown++;
          y += it.h;
        });
        htm(r.more, `<b>${rows - shown} more rows</b><span>·</span><span>${38 + nNew} bound to code</span><span>·</span><span>${138} with no target in code</span>`);

        /* the rail */
        const top = M.p(tau, K.confirm + 0.3, 0.7, 'inOutCubic');
        const rowsY = [34];
        r.rTop.style.height = (54 * top).toFixed(2) + 'px';
        r.rTop.style.display = top < 0.01 ? 'none' : '';
        r.rTop.style.opacity = top.toFixed(3);
        let ry = 34 + 54 * top;
        [r.rV3, r.rV2, r.rV1].forEach((el) => { el.style.top = ry.toFixed(2) + 'px'; ry += 54; });
        r.rTop.style.top = rowsY[0] + 'px';
        const sw = M.prog(tau, K.inforce, 0.5);
        r.rDraft.style.opacity = (1 - sw).toFixed(3); r.rV4.style.opacity = sw.toFixed(3);
        htm(r.rDots, `<span class="mini">${st.map((s) => `<i class="${s === 'idle' ? '' : s}"></i>`).join('')}</span><span>${amending && tau >= K.rowA ? '+2 rows' : '1 fact'}</span>`);
        r.rV3.classList.toggle('on', top < 0.5);
        r.rV3c.style.display = v4 ? 'none' : '';
        txt(r.rV3m, v4 ? '+5 −2 rows' : '176 rows, 38 bound');
        txt(r.sgBy, v4 ? 'T. Jewell · today 14:06' : 'T. Jewell · 10-23');
        txt(r.sgCh, v4 ? 'v4 ← v3 ← v2 ← v1' : 'v3 ← v2 ← v1');
        txt(r.sgDg, v4 ? 'e57a1d90' : '9c41e0b2');
        this.sgf.forEach((g, i) => { g.style.opacity = (0.9 * M.ramp(tau, K.chain + i * 0.25, K.chain + 3.6, 0.3, 0.8)).toFixed(3); });

        /* the seal */
        const s0 = K.sign + 0.12, sp = M.prog(tau, s0, 0.3);
        const out = M.p(tau, K.inforce + 0.6, 0.45, 'inOutCubic');
        const sc = (sp < 1 ? 2.0 - 1.0 * M.ease.inCubic(sp) : 1 + 0.05 * M.ramp(tau, s0 + 0.3, s0 + 0.75, 0.08, 0.37)) * (1 - 0.35 * out);
        r.seal.style.opacity = (Math.min(1, sp * 2.5) * (1 - out)).toFixed(3);
        r.seal.style.transform = `scale(${sc.toFixed(4)}) rotate(${(-8 + 8 * M.ease.outCubic(sp)).toFixed(2)}deg)`;
        const bp = M.prog(tau, s0 + 0.3, 0.7);
        const bi = r.burst.firstChild;
        bi.style.opacity = bp > 0 && bp < 1 ? (0.8 * (1 - bp)).toFixed(3) : 0;
        bi.style.transform = `scale(${(0.9 + 0.9 * M.ease.outCubic(bp)).toFixed(3)})`;

        /* the evidence strip: live verdicts on the live clock, plus the act's events */
        const now = M.abs(t), base = now - tau, ev = (k) => base + K[k];
        txt(r.evN, `${M.fmt.int(M.ticker(t, 48000, 2.4))} verdicts today`);
        r.live.style.opacity = (0.45 + 0.55 * M.wave(t, 1.4)).toFixed(3);
        let pin = null;
        if (tau >= K.change && tau < K.confirm) pin = { at: ev('change'), id: 'ai-bom', nm: 'Code changed · LoanApplication.religion', tone: 'warn', v: 'Reopened', bn: 'v3', rg: 'GDPR Art. 9', cl: 'warn' };
        if (tau >= K.sign + 0.4) pin = { at: ev('sign'), id: 'bundle', nm: 'v4 signed · supersedes v3', tone: 'y', v: 'Signed', bn: 'v4', rg: 'EU AI Act Art. 12', cl: 'y' };
        const list = [];
        const nNow = Math.floor(now / P);
        for (let n = nNow; n > nNow - 5; n--) {
          const at = n * P, after = at >= ev('inforce');
          const S = after ? STREAM4 : STREAM;
          const c = S[(n * 2 + Math.floor(M.noise(n) * 3)) % S.length];
          list.push({ at, id: c.id, nm: c.n, tone: c.tone, v: c.v, bn: after ? 'v4' : 'v3', rg: c.reg, key: 'n' + n });
        }
        if (tau >= K.confirm) list.push({ at: ev('confirm'), id: 'profile', nm: 'Data types confirmed · T. Jewell', tone: 'ok', v: 'Confirmed', bn: 'v3', rg: 'GDPR Art. 9', key: 'cf' });
        if (tau >= K.verdict) list.push({ at: ev('verdict'), id: 'ctl-ev-117', nm: 'Decisions don’t rely on a protected characteristic', tone: 'ok', v: 'Pass', bn: 'v4', rg: 'ECOA', key: 'vd' });
        list.sort((a, b) => b.at - a.at);
        const fill = (x, it) => {
          txt(x.c.tm, hms(CLOCK + it.at)); txt(x.c.id, it.id); txt(x.c.nm, it.nm); chip(x.c.ch, it.tone, it.v); txt(x.c.bn, it.bn); txt(x.c.rg, it.rg);
        };
        const P0 = pin ? 33 : 0, RH = 33;
        this.pin.root.style.display = pin ? '' : 'none';
        if (pin) {
          fill(this.pin, pin);
          cls(this.pin.root, 'er pin ' + pin.cl);
          const q = M.p(now, pin.at, 0.5);
          this.pin.root.style.top = '0px';
          this.pin.root.style.opacity = q.toFixed(3);
        }
        const slide = M.p(now, list[0].at, 0.45, 'outCubic');
        this.pool.forEach((x, k) => {
          const it = list[k];
          if (!it) { x.root.style.display = 'none'; return; }
          x.root.style.display = '';
          fill(x, it);
          const yy = P0 + (k - 1 + slide) * RH;
          x.root.style.top = yy.toFixed(2) + 'px';
          x.root.style.opacity = (k === 0 ? slide : 1).toFixed(3);
          x.c.bg.style.background = it.key === 'vd' || it.key === 'cf' ? 'var(--c-green-bg)' : '';
          x.c.bg.style.opacity = it.key === 'vd' || it.key === 'cf' ? (1 - M.prog(now, it.at + 1.6, 1.0)).toFixed(3) : 0;
        });
      },
    },
  };
})();
