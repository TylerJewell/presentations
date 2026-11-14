/* ExpView: the Experiments view (Optimize › Inference › Experiments) shared by scenes 4.3, 4.4 and 4.5 so
   the three read as one continuous screen: same layout, same data, the same demo clock. One view holds the
   experiment rail, the loop Propose → Evaluate → Shadow → Canary → Decide → Watch, the limits board and the
   stage panel. Each scene builds its own copy in render() and drives it from at() with
   ExpView.set(view, state). */
window.ExpView = (function () {
  const M = Mock;
  const STAGES = [['propose', 'Propose'], ['evaluate', 'Evaluate'], ['shadow', 'Shadow'], ['canary', 'Canary'], ['decide', 'Decide'], ['watch', 'Watch']];
  const LIMITS = [
    { key: 'quality', name: 'Quality', what: 'at least (3.0%)', side: 'min', limit: -3, span: [-8, 4], unit: '%' },
    { key: 'cost', name: 'Cost per call', what: 'at most (40.0%)', side: 'max', limit: -40, span: [-90, 10], unit: '%' },
    { key: 'p95', name: 'Latency p95', what: 'at most 150 ms', side: 'max', limit: 150, span: [-1000, 400], unit: ' ms' },
    { key: 'errors', name: 'Errors', what: 'at most 0.5 pt', side: 'max', limit: 0.5, span: [-1, 1.5], unit: ' pt' },
  ];
  const SEGS = ['US', 'UK', 'DE', 'FR'];
  const SEG_SHARE = [0.53, 0.19, 0.16, 0.12];
  const OTHERS = [
    ['frontier-mini for support replies', 'Swap model', ['done', 'skipped', 'now', '', '', '']],
    ['intake-slm-v2 for intake triage', 'Promoted directly', ['done', 'skipped', 'skipped', 'skipped', 'done', 'now']],
    ['x-channel=branch to reasoner-pro', 'Route on a header', ['done', 'done', 'back', '', '', '']],
    ['frontier-mini for doc extraction', 'Superseded', ['done', 'done', 'done', 'done', 'done', 'done']],
    ['embed-v3 for KYC search', 'Swap model', ['done', 'skipped', 'done', 'done', 'done', 'done']],
    ['Region · FR to frontier-mini', 'Route on a header', ['done', 'done', 'done', 'done', 'done', 'done']],
  ];
  const pos = (v, [lo, hi]) => M.clamp((v - lo) / (hi - lo)) * 100;
  const within = (l, v) => (l.side === 'min' ? v >= l.limit : v <= l.limit);
  const fmtV = (v, unit) => {
    const n = unit === ' ms' ? M.fmt.int(Math.abs(v)) : Math.abs(v).toFixed(1);
    return v < 0 ? `(${n}${unit})` : `${n}${unit}`;
  };
  const txt = (el, s) => { if (el.textContent !== s) el.textContent = s; };
  /* setAttribute, not className: the loop's nodes and arcs are SVG elements, whose className is read-only */
  const cls = (el, c) => { if (el.getAttribute('class') !== c) el.setAttribute('class', c); };

  function css() {
    M.style('s4x', `
      .s4x .xv { display: grid; grid-template-columns: 236px minmax(0, 1fr); gap: 16px; height: 684px; }
      .s4x .xrail { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; overflow: hidden; }
      .s4x .xr-hd { padding: 11px 14px; font-size: 11px; color: var(--c-faint); letter-spacing: .08em; text-transform: uppercase; border-bottom: 1px solid var(--c-line); display: flex; }
      .s4x .xr-hd span { margin-left: auto; }
      .s4x .xrail .r { padding: 10px 14px; border-bottom: 1px solid var(--c-line); display: grid; gap: 5px; }
      .s4x .xrail .r.on { background: var(--c-gold-bg); }
      .s4x .xrail .t { font-weight: 500; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .s4x .xrail .m { color: var(--c-muted); font-size: 11.5px; display: flex; gap: 8px; align-items: center; }
      .s4x .mini { display: inline-flex; gap: 3px; }
      .s4x .mini i { width: 8px; height: 8px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--c-faint); }
      .s4x .mini i.done { background: var(--c-green); box-shadow: none; }
      .s4x .mini i.now { background: var(--c-gold); box-shadow: 0 0 0 2px var(--c-gold-bg); }
      .s4x .mini i.held { background: var(--c-amber); box-shadow: none; }
      .s4x .mini i.back { background: var(--c-red); box-shadow: none; }
      .s4x .mini i.skipped { opacity: .45; }
      .s4x .xws { position: relative; min-width: 0; }
      .s4x .xhd { display: flex; align-items: center; gap: 10px; height: 28px; }
      .s4x .xhd h2 { margin: 0; font-size: 18px; font-weight: 500; }
      .s4x .xhd .right { margin-left: auto; display: flex; gap: 8px; }
      .s4x .chip { display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 9px; border-radius: 999px; font-size: 12px; font-weight: 500; white-space: nowrap; }
      .s4x .chip.st::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
      .s4x .chip.idle { background: var(--c-surface-2); color: var(--c-muted); }
      .s4x .chip.info { background: var(--c-blue-bg); color: var(--c-blue); }
      .s4x .chip.ok { background: var(--c-green-bg); color: var(--c-green); }
      .s4x .chip.warn { background: var(--c-amber-bg); color: var(--c-amber); }
      .s4x .chip.bad { background: rgba(255,84,0,.16); color: #ff7a3d; }
      .s4x .chip.gold { background: var(--c-gold-bg); color: var(--c-gold-text); }
      .s4x .btn { display: inline-flex; align-items: center; justify-content: center; height: 28px; padding: 0 12px; border-radius: 8px; background: var(--c-surface-2);
        box-shadow: inset 0 0 0 1px var(--c-line); font-size: 13px; color: var(--c-text); white-space: nowrap; }
      .s4x .btn.primary { background: var(--c-gold); color: #15130b; box-shadow: none; font-weight: 600; }
      .s4x .xmeta { color: var(--c-muted); font-size: 13px; margin: 4px 0 10px; white-space: nowrap; }
      .s4x .tok { font-family: var(--mono); font-size: 11.5px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); padding: 1px 6px; border-radius: 5px; color: var(--c-text); }
      .s4x .hero { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 14px; height: 262px; }
      .s4x .panel { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; padding: 12px 16px; position: relative; }
      .s4x .loopP { display: flex; align-items: center; justify-content: center; padding: 8px; }
      .s4x svg.loop { width: 244px; height: 244px; display: block; overflow: visible; }
      .s4x .loop .ring { fill: none; stroke: var(--c-line); stroke-width: 10; }
      .s4x .loop .arc { fill: none; stroke-width: 2.2; }
      .s4x .loop .arc.done { stroke: var(--c-green); }
      .s4x .loop .arc.now, .s4x .loop .arc.next { stroke: var(--c-gold); }
      .s4x .loop .arc.held { stroke: var(--c-amber); }
      .s4x .loop .arc.idle { stroke: var(--c-faint); stroke-dasharray: 3 4; opacity: .7; }
      .s4x .loop .arc.next { stroke-dasharray: 5 4; }
      .s4x .loop .ah { stroke: none; fill: var(--c-faint); opacity: .7; }
      .s4x .loop .ah.done { fill: var(--c-green); opacity: 1; } .s4x .loop .ah.now, .s4x .loop .ah.next { fill: var(--c-gold); opacity: 1; } .s4x .loop .ah.held { fill: var(--c-amber); opacity: 1; }
      .s4x .loop .node circle.c { fill: var(--c-surface); stroke: var(--c-line); stroke-width: 1.5; }
      .s4x .loop .node.done circle.c { fill: var(--c-green-bg); stroke: var(--c-green); }
      .s4x .loop .node.now circle.c { fill: var(--c-gold-bg); stroke: var(--c-gold); stroke-width: 2.5; }
      .s4x .loop .node.held circle.c { fill: var(--c-amber-bg); stroke: var(--c-amber); stroke-width: 2.5; }
      .s4x .loop .node .halo { fill: none; stroke: var(--c-gold); transform-box: fill-box; transform-origin: center; }
      .s4x .loop .node.held .halo { stroke: var(--c-amber); }
      .s4x .loop .n { fill: var(--c-text); font: 600 12.5px var(--sans); }
      .s4x .loop .s { fill: var(--c-muted); font: 500 10.5px var(--sans); }
      .s4x .loop .node.idle .n { fill: var(--c-muted); }
      .s4x .loop .big { fill: var(--c-text); font: 600 34px var(--sans); letter-spacing: -.02em; }
      .s4x .loop .small { fill: var(--c-muted); font: 12.5px var(--sans); }
      .s4x .board-hd { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
      .s4x .board-hd h3 { margin: 0; font-size: 14px; font-weight: 600; }
      .s4x .board-hd .f { margin-left: auto; color: var(--c-faint); font-size: 12.5px; font-variant-numeric: tabular-nums; }
      .s4x .lim { display: grid; grid-template-columns: 124px minmax(0, 1fr) 84px 78px; gap: 12px; align-items: center; height: 38px; border-bottom: 1px solid var(--c-line); }
      .s4x .lim .k { color: var(--c-muted); font-size: 13px; line-height: 1.2; }
      .s4x .lim .k small { display: block; color: var(--c-faint); font-size: 11.5px; }
      .s4x .lim .v { text-align: right; font-variant-numeric: tabular-nums; font-size: 13.5px; }
      .s4x .track { position: relative; height: 20px; border-radius: 6px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s4x .track .zone { position: absolute; top: 0; bottom: 0; background: var(--c-green-bg); border-radius: 6px; }
      .s4x .track .zero { position: absolute; top: 3px; bottom: 3px; width: 1px; background: var(--c-faint); }
      .s4x .track .limit { position: absolute; top: -3px; bottom: -3px; width: 2px; margin-left: -1px; background: var(--c-text); opacity: .55; }
      .s4x .track .dot { position: absolute; top: 50%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 999px; background: var(--c-gold); box-shadow: 0 0 0 2px var(--c-surface); }
      .s4x .track .worst { position: absolute; top: 50%; width: 13px; height: 13px; margin: -6.5px 0 0 -6.5px; border-radius: 999px; box-shadow: inset 0 0 0 2px var(--c-muted); }
      .s4x .track .worst.out { box-shadow: inset 0 0 0 2.5px #ff5400, 0 0 10px rgba(255,84,0,.6); }
      .s4x .spend { display: grid; grid-template-columns: 124px minmax(0, 1fr) 170px; gap: 12px; align-items: center; height: 34px; }
      .s4x .spend .k { color: var(--c-muted); font-size: 13px; }
      .s4x .meter { position: relative; height: 8px; border-radius: 999px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s4x .meter .used { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 999px; background: var(--c-gold); }
      .s4x .meter .proj { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 999px; background: var(--c-gold); opacity: .3; }
      .s4x .spend .v { text-align: right; font-size: 13px; font-variant-numeric: tabular-nums; }
      .s4x .legend { display: flex; gap: 14px; color: var(--c-faint); font-size: 11.5px; }
      .s4x .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 999px; margin-right: 5px; vertical-align: -1px; }
      .s4x .legend i.dot { background: var(--c-gold); } .s4x .legend i.worst { box-shadow: inset 0 0 0 2px var(--c-muted); }
      .s4x .legend i.zone { border-radius: 3px; background: var(--c-green-bg); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s4x .stage { margin-top: 12px; height: 338px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; padding: 14px 16px; position: relative; }
      .s4x .stage-hd { display: flex; align-items: center; gap: 10px; height: 26px; margin-bottom: 12px; }
      .s4x .stage-hd h3 { margin: 0; font-size: 15px; font-weight: 600; }
      .s4x .stage-hd .right { margin-left: auto; color: var(--c-faint); font-size: 12.5px; }
      .s4x .split { display: grid; grid-template-columns: minmax(0, 1fr) 400px; gap: 20px; }
      .s4x .L, .s4x .R { position: relative; height: 272px; }
      .s4x .pane { position: absolute; left: 0; right: 0; top: 0; }
      .s4x .sub-hd { font-size: 11.5px; color: var(--c-faint); letter-spacing: .06em; text-transform: uppercase; margin: 0 0 7px; display: flex; gap: 8px; align-items: center; }
      .s4x .sub-hd .chip { text-transform: none; letter-spacing: 0; height: 18px; font-size: 11px; }
      .s4x .gr { display: grid; align-items: center; height: 28px; border-bottom: 1px solid var(--c-line); font-size: 13px; padding: 0 8px; font-variant-numeric: tabular-nums; border-radius: 4px; }
      .s4x .gr.h { height: 24px; color: var(--c-faint); font-size: 11.5px; letter-spacing: .04em; }
      .s4x .gr .r { text-align: right; }
      .s4x .gr .mono { font-family: var(--mono); font-size: 12px; }
      .s4x .gr .sub { color: var(--c-muted); }
      .s4x .segs .gr { grid-template-columns: 116px 66px 74px 64px 92px minmax(0, 1fr); gap: 8px; }
      .s4x .segs .gr .chip { height: 20px; font-size: 11.5px; }
      .s4x .srv { display: inline-flex; gap: 6px; align-items: center; white-space: nowrap; }
      .s4x .srv .b { font-size: 10.5px; height: 18px; padding: 0 7px; }
      .s4x .dec .gr { grid-template-columns: minmax(0, 1fr) 82px 82px 70px 70px 74px; gap: 8px; }
      .s4x .graded { display: grid; grid-template-columns: 110px minmax(0, 1fr) 120px; gap: 12px; align-items: center; height: 26px; font-size: 13px; color: var(--c-muted); margin-bottom: 12px; }
      .s4x .graded .v { text-align: right; color: var(--c-text); font-variant-numeric: tabular-nums; }
      .s4x svg.qc { width: 100%; height: 92px; display: block; overflow: visible; }
      .s4x .qc .ax { stroke: var(--c-line); }
      .s4x .qc text { fill: var(--c-faint); font: 11px var(--sans); }
      .s4x .qc .bl { fill: none; stroke: var(--c-muted); stroke-width: 1.6; }
      .s4x .qc .cd { fill: none; stroke: var(--c-gold); stroke-width: 2.2; }
      .s4x .qc .lim { stroke: var(--c-text); stroke-dasharray: 3 4; opacity: .35; }
      .s4x .qc .zn { fill: var(--c-green-bg); }
      .s4x .rc .gr { grid-template-columns: 84px 46px minmax(0, 1fr) 70px 70px; gap: 8px; height: 26px; }
      .s4x .rows { position: relative; height: 182px; overflow: hidden; }
      .s4x .rows .gr { position: absolute; left: 0; right: 0; }
      .s4x .acts { display: flex; gap: 8px; margin-top: 12px; }
      .s4x .split-bar { position: relative; height: 30px; border-radius: 8px; overflow: hidden; background: var(--c-surface-2); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s4x .split-bar .cand { position: absolute; right: 0; top: 0; bottom: 0; background: linear-gradient(90deg, rgba(201,162,39,.55), rgba(201,162,39,.85)); }
      .s4x .split-bar .knob { position: absolute; top: -4px; bottom: -4px; width: 4px; margin-left: -2px; background: var(--c-text); border-radius: 2px; box-shadow: 0 0 0 3px rgba(0,0,0,.35); }
      .s4x .shl { display: flex; justify-content: space-between; font-size: 13.5px; font-weight: 500; margin-bottom: 7px; font-variant-numeric: tabular-nums; }
      .s4x .shl .y { color: var(--c-gold-text); }
      .s4x .ticks { display: flex; justify-content: space-between; color: var(--c-faint); font-size: 11px; margin: 5px 0 12px; }
      .s4x svg.ramp { width: 100%; height: 104px; display: block; overflow: visible; }
      .s4x .ramp .ax { stroke: var(--c-line); }
      .s4x .ramp text { fill: var(--c-faint); font: 11px var(--sans); }
      .s4x .ramp .plan { fill: none; stroke: var(--c-faint); stroke-dasharray: 4 4; stroke-width: 1.5; }
      .s4x .ramp .act { fill: none; stroke: var(--c-gold); stroke-width: 2.5; }
      .s4x .ramp .area { fill: var(--c-gold-bg); }
      .s4x .dcard { border-radius: 10px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); padding: 12px 14px; }
      .s4x .dcard .dh { display: flex; align-items: baseline; gap: 8px; font-size: 14px; font-weight: 600; }
      .s4x .dcard .dh span { margin-left: auto; font-size: 12px; font-weight: 400; color: var(--c-muted); }
      .s4x .opt { display: grid; grid-template-columns: 18px minmax(0, 1fr) auto; gap: 10px; align-items: center; height: 40px; padding: 0 10px; margin-top: 6px; border-radius: 8px; font-size: 13.5px; color: var(--c-muted); }
      .s4x .opt .rd { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--c-faint); }
      .s4x .opt.on { background: var(--c-gold-bg); color: var(--c-text); box-shadow: inset 0 0 0 1px var(--c-gold-ring); }
      .s4x .opt.on .rd { box-shadow: inset 0 0 0 4px var(--c-gold); }
      .s4x .opt small { display: block; font-size: 11.5px; color: var(--c-muted); }
      .s4x .owner { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 12.5px; color: var(--c-muted); }
      .s4x .owner .av { width: 22px; height: 22px; border-radius: 50%; background: var(--c-gold); color: #15130b; font-size: 10px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
      .s4x .owner b { color: var(--c-text); font-weight: 500; }
      .s4x .pst { display: grid; gap: 8px; }
      .s4x .pst .btn { height: 34px; font-size: 14px; }
      .s4x .pnote { margin-top: 12px; font-size: 12.5px; color: var(--c-muted); }
      .s4x .cu { border-radius: 10px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-gold-ring); padding: 14px 16px; }
      .s4x .cu .k { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--c-faint); letter-spacing: .06em; text-transform: uppercase; }
      .s4x .cu .k .mk-chip { margin-left: auto; text-transform: none; letter-spacing: 0; }
      .s4x .cu .fig { margin-top: 10px; display: flex; align-items: baseline; gap: 12px; font: 600 34px/1 var(--sans); letter-spacing: -.02em; color: var(--c-text); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .s4x .cu .fig i { font-style: normal; color: var(--c-faint); font-size: 24px; }
      .s4x .cu .fig .to { color: var(--c-gold-text); }
      .s4x .cu .pct { margin-top: 10px; display: flex; align-items: baseline; gap: 10px; font: 600 24px/1 var(--sans); color: var(--c-green); font-variant-numeric: tabular-nums; }
      .s4x .cu .pct span { font: 500 12.5px var(--sans); color: var(--c-muted); }
      .s4x .ev { margin-top: 12px; border-radius: 10px; padding: 11px 14px; background: linear-gradient(160deg, rgba(201,162,39,.16), rgba(201,162,39,.05)); box-shadow: inset 0 0 0 1px var(--c-gold-ring);
        display: grid; grid-template-columns: 26px minmax(0, 1fr); gap: 4px 10px; align-items: center; }
      .s4x .ev svg { grid-row: span 2; width: 24px; height: 24px; }
      .s4x .ev svg path { fill: none; stroke: var(--c-gold-text); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
      .s4x .ev .a { font-size: 13.5px; font-weight: 500; color: var(--c-text); white-space: nowrap; }
      .s4x .ev .b { font: 500 11px var(--mono); color: var(--c-muted); white-space: nowrap; }
      .s4x .dclk { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--c-muted); }
      .s4x .dclk b { font: 500 13px var(--sans); color: var(--c-text); font-variant-numeric: tabular-nums; }
      .s4x .dclk .spd { font: 500 11.5px var(--sans); color: var(--c-faint); }
      .s4x .att { color: var(--c-muted); }
      .s4x .att.on { color: var(--c-amber); }
    `);
  }

  function loopSVG() {
    const C = 160, R = 112, NODE = 33;
    const at = (deg, r = R) => { const a = ((deg - 90) * Math.PI) / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };
    const gap = (((NODE + 7) / R) * 180) / Math.PI;
    let s = `<svg class="loop" viewBox="0 0 320 320"><circle class="ring" cx="${C}" cy="${C}" r="${R}"/>`;
    STAGES.forEach((_, i) => {
      const from = i * 60 + gap, to = (i + 1) * 60 - gap;
      const [x1, y1] = at(from), [x2, y2] = at(to), [bx, by] = at(to - 5, R - 5), [cx, cy] = at(to - 5, R + 5);
      s += `<path class="arc idle" d="M${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2}"/><path class="ah idle" d="M${x2},${y2} L${bx},${by} L${cx},${cy} Z"/>`;
    });
    STAGES.forEach(([, name], i) => {
      const [x, y] = at(i * 60);
      s += `<g class="node idle"><circle class="halo" cx="${x}" cy="${y}" r="${NODE}"/><circle class="c" cx="${x}" cy="${y}" r="${NODE}"/>
        <text class="n" x="${x}" y="${y - 1}" text-anchor="middle">${name}</text><text class="s" x="${x}" y="${y + 13}" text-anchor="middle"></text></g>`;
    });
    s += `<text class="big" x="${C}" y="${C + 4}" text-anchor="middle"></text><text class="small" x="${C}" y="${C + 26}" text-anchor="middle"></text><text class="small s2" x="${C}" y="${C + 43}" text-anchor="middle"></text></svg>`;
    return s;
  }
  const dots = (sts) => `<span class="mini">${sts.map((s) => `<i class="${s}"></i>`).join('')}</span>`;

  function build(root) {
    css();
    const world = M.world(root);
    const f = M.consoleFrame(world, {
      crumb: 'Optimize › Inference › Experiments', active: 'Inference', title: 'Inference', bundle: 'v4',
      tabs: ['Models', 'Serving', 'Gateway', 'Routing', 'Use cases', 'Experiments', 'Playground'], tab: 'Experiments',
      status: 'Nothing needs attention',
    });
    const br = M.mount(f.bandRight, `<span class="dclk">Demo clock <b data-k="clk"></b><span class="spd">1 s = 2 h</span><span class="mk-chip demo">Simulated</span></span>`);
    const att = f.status;
    att.className = 'att';

    const v = M.mount(f.page, `
      <div class="xv">
        <div class="xrail">
          <div class="xr-hd">Experiments<span>${OTHERS.length + 1}</span></div>
          <div class="r on"><div class="t">Smaller model for underwriting</div><div class="m"><span data-k="rdots"></span><span>Smaller model</span></div></div>
          ${OTHERS.map(([t, k, s]) => `<div class="r"><div class="t">${t}</div><div class="m">${dots(s)}<span>${k}</span></div></div>`).join('')}
        </div>
        <div class="xws">
          <div class="xhd"><h2>Smaller model for underwriting</h2><span class="chip idle">Smaller model</span><span class="chip st info" data-k="status">Shadow</span>
            <span class="right" data-k="hbtn"><span class="btn">Pause</span><span class="btn">Roll back</span></span></div>
          <div class="xmeta">underwriting, <span class="tok">frontier-large</span> to <span class="tok">underwrite-4b</span>, judge underwriting-quality v3, hold with breaching segments on baseline, exp-142</div>
          <div class="hero">
            <div class="panel loopP" data-k="loopP">${loopSVG()}</div>
            <div class="panel board" data-k="board">
              <div class="board-hd"><h3>Your limits</h3><span class="f" data-k="n"></span></div>
              ${LIMITS.map((l) => `<div class="lim"><div class="k">${l.name}<small>${l.what}</small></div>
                <div class="track"><span class="zone" style="left:${l.side === 'min' ? pos(l.limit, l.span) : 0}%;width:${l.side === 'min' ? 100 - pos(l.limit, l.span) : pos(l.limit, l.span)}%"></span>
                <span class="zero" style="left:${pos(0, l.span)}%"></span><span class="limit" style="left:${pos(l.limit, l.span)}%"></span><span class="worst"></span><span class="dot"></span></div>
                <div class="v"></div><div><span class="chip st ok">Within</span></div></div>`).join('')}
              <div class="spend"><div class="k">Experiment cost</div><div class="meter"><span class="proj" style="width:54%"></span><span class="used" data-k="used"></span></div><div class="v" data-k="spend"></div></div>
              <div class="legend"><span><i class="zone"></i>Within the limit</span><span><i class="dot"></i>All traffic in scope</span><span><i class="worst"></i>Worst segment</span><span>Projected $21.60</span></div>
            </div>
          </div>
          <div class="stage" data-k="stage">
            <div class="stage-hd"><h3 data-k="sh">Shadow</h3><span class="right" data-k="shr"></span></div>
            <div class="split">
              <div class="L" data-k="L">
                <div class="pane" data-k="Lshadow">
                  <div class="graded"><span>Graded calls</span><div class="meter"><span class="used" data-k="gm"></span></div><span class="v" data-k="gv"></span></div>
                  <p class="sub-hd">Quality, small model against frontier model</p>
                  <svg class="qc" viewBox="0 0 640 92" preserveAspectRatio="none">
                    <rect class="zn" x="40" y="4" width="600" height="62"/><line class="lim" x1="40" x2="640" y1="66" y2="66"/>
                    <line class="ax" x1="40" x2="640" y1="88" y2="88"/><text x="34" y="10" text-anchor="end">0.94</text><text x="34" y="70" text-anchor="end">limit</text>
                    <path class="bl" data-k="qb"/><path class="cd" data-k="qcd"/></svg>
                </div>
                <div class="pane segs" data-k="Lsegs">
                  <div class="gr h"><span>Segment</span><span class="r">Calls</span><span class="r">Quality</span><span class="r">Limit</span><span></span><span>Served by</span></div>
                  ${SEGS.map((s) => `<div class="gr" data-seg="${s}"><span>Region · ${s}</span><span class="r c"></span><span class="r q"></span><span class="r sub">(3.0%)</span><span><span class="chip st ok">Within</span></span><span class="srv"><span class="sv"></span><span class="chip gold b" style="opacity:0">Retrained r2</span></span></div>`).join('')}
                </div>
                <div class="pane dec" data-k="Ldec">
                  <div class="gr h"><span>Measure</span><span class="r">Baseline</span><span class="r">Candidate</span><span class="r">Change</span><span class="r">Limit</span><span></span></div>
                  <div class="gr"><span>Quality score</span><span class="r">0.912</span><span class="r">0.913</span><span class="r">0.1%</span><span class="r sub">(3.0%)</span><span><span class="chip st ok">Within</span></span></div>
                  <div class="gr"><span>Cost per call</span><span class="r">$0.031</span><span class="r">$0.009</span><span class="r">(71.0%)</span><span class="r sub">(40.0%)</span><span><span class="chip st ok">Within</span></span></div>
                  <div class="gr"><span>Latency p95</span><span class="r">2,140 ms</span><span class="r">1,480 ms</span><span class="r">(660 ms)</span><span class="r sub">150 ms</span><span><span class="chip st ok">Within</span></span></div>
                  <div class="gr"><span>Errors</span><span class="r">0.4%</span><span class="r">0.5%</span><span class="r">0.1 pt</span><span class="r sub">0.5 pt</span><span><span class="chip st ok">Within</span></span></div>
                </div>
              </div>
              <div class="R" data-k="R">
                <div class="pane rc" data-k="Rshadow">
                  <p class="sub-hd">Shadow copies of live requests</p>
                  <div class="gr h"><span>Call</span><span>Region</span><span>Use case</span><span class="r">Frontier</span><span class="r">Small</span></div>
                  <div class="rows" data-k="rows"></div>
                  <div class="acts"><span class="btn primary" data-k="bStart">Start canary</span><span class="btn">Stop</span></div>
                </div>
                <div class="pane" data-k="Rcanary">
                  <p class="sub-hd">Share of live traffic</p>
                  <div class="shl"><span data-k="la"></span><span class="y" data-k="lb"></span></div><div class="split-bar"><span class="cand" data-k="cand"></span><span class="knob" data-k="knob"></span></div>
                  <div class="ticks"><span>0</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div>
                  <svg class="ramp" viewBox="0 0 400 104" preserveAspectRatio="none">
                    <line class="ax" x1="30" x2="400" y1="90" y2="90"/><text x="24" y="93" text-anchor="end">0</text><text x="24" y="52" text-anchor="end">25%</text><text x="24" y="12" text-anchor="end">50%</text>
                    <path class="plan" d="M30,74 H150 V50 H270 V10 H400"/><path class="area" data-k="area"/><path class="act" data-k="act"/></svg>
                  <div class="acts"><span class="btn primary" data-k="bAdv">Advance to 25%</span><span class="btn">Pause</span></div>
                </div>
                <div class="pane" data-k="Rdec">
                  <div class="dcard" data-k="dcard">
                    <div class="dh">When a limit is crossed<span>chosen at Propose</span></div>
                    <div class="opt"><span class="rd"></span><span>Keep serving as configured</span></div>
                    <div class="opt on" data-k="optOn"><span class="rd"></span><span>Breaching segments to baseline<small>Region · DE on the frontier model</small></span><span class="chip st warn">In effect</span></div>
                    <div class="opt"><span class="rd"></span><span>All traffic to baseline</span></div>
                    <div class="opt"><span class="rd"></span><span>Roll back</span></div>
                    <div class="owner" data-k="owner"><span class="av">TJ</span><span>Chosen by <b>T. Jewell</b>, owner, 10-14</span></div>
                  </div>
                </div>
                <div class="pane" data-k="Rpro">
                  <p class="sub-hd">Your decision</p>
                  <div class="pst"><span class="btn primary" data-k="bPro">Promote to all traffic</span><span class="btn">Extend 7 days</span><span class="btn">Roll back</span></div>
                  <div class="pnote">Watch for 14 days after promotion.</div>
                </div>
                <div class="pane" data-k="Rres">
                  <div class="cu" data-k="cu">
                    <div class="k">Cost per call<span class="mk-chip demo">Simulated</span></div>
                    <div class="fig"><span>$0.031</span><i>→</i><span class="to" data-k="cuv">$0.031</span></div>
                    <div class="pct"><b data-k="cup">0%</b><span>frontier model to the small model</span></div>
                  </div>
                  <div class="ev" data-k="ev">
                    <svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z"/><path d="M8 12l3 3 5-6"/></svg>
                    <span class="a">Promoted · experiment exp-142 · owner T. Jewell</span>
                    <span class="b" data-k="evb"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
    const loopEl = v.loopP.querySelector('svg');
    const view = {
      world, frame: f, v, br, att,
      arcs: [...loopEl.querySelectorAll('.arc')], ahs: [...loopEl.querySelectorAll('.ah')], nodes: [...loopEl.querySelectorAll('.node')],
      big: loopEl.querySelector('.big'), sm: loopEl.querySelectorAll('.small'),
      lims: [...v.board.querySelectorAll('.lim')].map((el) => ({ el, dot: el.querySelector('.dot'), worst: el.querySelector('.worst'), v: el.querySelector('.v'), chip: el.querySelector('.chip') })),
      segs: [...v.Lsegs.querySelectorAll('.gr[data-seg]')].map((el) => ({ el, c: el.querySelector('.c'), q: el.querySelector('.q'), chip: el.querySelector('.chip.st'), sv: el.querySelector('.sv'), badge: el.querySelector('.b') })),
      rowEls: Array.from({ length: 9 }, () => { const r = M.html('<div class="gr"><span class="mono"></span><span></span><span class="sub">underwriting</span><span class="r"></span><span class="r"></span></div>'); v.rows.appendChild(r); return r; }),
      rects: null,
    };
    return view;
  }

  /** Stage rects of the view's parts, measured unzoomed once (the player boots after the web fonts load). */
  function measure(view) {
    if (view.rects) return view.rects;
    const r = (el) => M.rectOf(view.world, el);
    const ctr = (el) => { const [x, y, ww, h] = r(el); return [x + ww / 2, y + h / 2]; };
    const v = view.v;
    view.rects = {
      stage: r(v.stage), board: r(v.board), loop: r(v.loopP), hero: [r(v.loopP)[0], r(v.loopP)[1], r(v.board)[0] + r(v.board)[2] - r(v.loopP)[0], r(v.board)[3]],
      L: r(v.L), R: r(v.R), segs: r(v.Lsegs), de: r(view.segs[2].el), dcard: r(v.dcard), res: r(v.Rres),
      bStart: ctr(v.bStart), bAdv: ctr(v.bAdv), bPro: ctr(v.bPro),
    };
    /* the segments table with its heading, for a push-in */
    const sh = r(v.sh), sg = view.rects.segs;
    view.rects.segBlock = [sg[0] - 8, sh[1] - 6, sg[2] + 16, sg[1] + 5 * 34 * 1.2 - sh[1]];
    view.rects.resBlock = [view.rects.R[0] - 8, view.rects.R[1] - 8, view.rects.R[2] + 16, 226 * 1.2];
    return view.rects;
  }

  /** The demo clock: experiment seconds x (0 at the start of 4.3) to "10-DD HH:MM", 2 simulated hours a second. */
  function clock(x) {
    const h = 1.6 + 2 * x, mins = Math.round(h * 60);
    const d = 18 + Math.floor(mins / 1440), hh = Math.floor((mins % 1440) / 60), mm = mins % 60;
    return `10-${d} ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }

  /**
   * state: { x, status: [word, tone], stages: {key: status}, notes: {key: text}, center: [a, b, c?],
   *   board: { n, v: {quality, cost, p95, errors}, w: {quality}, spend }, segs: [{ q, calls, served, flash, tint, badge }],
   *   panes: { Lshadow, Lsegs, Ldec, Rshadow, Rcanary, Rdec, Rpro, Rres } (opacity 0..1), stageTitle, stageRight,
   *   share, graded, attention, hbtn }
   */
  function set(view, st, t) {
    const v = view.v;
    txt(view.br.clk, clock(st.x));
    txt(v.status, st.status[0]);
    cls(v.status, 'chip st ' + st.status[1]);
    if (st.hbtn && v.hbtn.dataset.s !== st.hbtn.join('|')) {
      v.hbtn.dataset.s = st.hbtn.join('|');
      v.hbtn.innerHTML = st.hbtn.map((b) => `<span class="btn">${b}</span>`).join('');
    }
    txt(view.att, st.attention ? '1 needs attention' : 'Nothing needs attention');
    cls(view.att, 'att' + (st.attention ? ' on' : ''));

    /* the loop */
    const order = STAGES.map(([k]) => k);
    const halo = M.loop(t, 1.8);
    order.forEach((k, i) => {
      const s = st.stages[k] || 'idle', nx = order[(i + 1) % 6], ns = st.stages[nx] || 'idle';
      let a;
      if (i === 5) a = s === 'now' ? 'next' : 'idle';
      else if (ns === 'held') a = 'held';
      else if (ns === 'now') a = 'now';
      else a = (s === 'done' || s === 'skipped') && ns === 'done' ? 'done' : 'idle';
      cls(view.arcs[i], 'arc ' + a);
      cls(view.ahs[i], 'ah ' + a);
      const n = view.nodes[i];
      cls(n, 'node ' + s);
      const h = n.querySelector('.halo');
      const live = s === 'now' || s === 'held';
      h.style.opacity = live ? (0.55 * (1 - halo)).toFixed(3) : 0;
      h.style.transform = `scale(${(1 + 0.35 * halo).toFixed(3)})`;
      txt(n.querySelector('.s'), (st.notes && st.notes[k]) || (s === 'done' ? '✓' : ''));
    });
    txt(view.big, st.center[0]);
    txt(view.sm[0], st.center[1] || '');
    txt(view.sm[1], st.center[2] || '');
    v.rdots.innerHTML !== dots(order.map((k) => st.stages[k] || '')) && (v.rdots.innerHTML = dots(order.map((k) => st.stages[k] || '')));

    /* the limits board */
    const b = st.board;
    txt(v.n, b.n);
    LIMITS.forEach((l, i) => {
      const r = view.lims[i], val = b.v[l.key], wv = b.w && b.w[l.key];
      r.dot.style.left = pos(val, l.span).toFixed(2) + '%';
      if (wv != null) { r.worst.style.display = ''; r.worst.style.left = pos(wv, l.span).toFixed(2) + '%'; r.worst.classList.toggle('out', !within(l, wv)); }
      else r.worst.style.display = 'none';
      txt(r.v, fmtV(val, l.unit));
      const ok = within(l, val) && (wv == null || within(l, wv));
      txt(r.chip, ok ? 'Within' : 'Outside');
      cls(r.chip, 'chip st ' + (ok ? 'ok' : 'bad'));
    });
    v.used.style.width = ((b.spend / 40) * 100).toFixed(2) + '%';
    txt(v.spend, `$${b.spend.toFixed(2)} of $40 budget`);

    /* the stage panel */
    txt(v.sh, st.stageTitle);
    txt(v.shr, st.stageRight || '');
    for (const k of ['Lshadow', 'Lsegs', 'Ldec', 'Rshadow', 'Rcanary', 'Rdec', 'Rpro', 'Rres']) {
      const o = (st.panes && st.panes[k]) || 0;
      v[k].style.opacity = o.toFixed(3);
      v[k].style.visibility = o > 0.001 ? 'visible' : 'hidden';
      v[k].style.transform = o < 1 ? `translateY(${((1 - o) * 8).toFixed(1)}px)` : 'none';
    }
    if (st.segs) st.segs.forEach((s, i) => {
      const r = view.segs[i];
      txt(r.c, M.fmt.int(s.calls));
      txt(r.q, fmtV(s.q, '%'));
      const ok = s.q >= -3;
      txt(r.chip, ok ? 'Within' : 'Outside');
      cls(r.chip, 'chip st ' + (ok ? 'ok' : 'bad'));
      txt(r.sv, s.served);
      r.badge.style.opacity = (s.badge || 0).toFixed(3);
      r.el.style.background = s.flash || s.tint ? `rgba(255,84,0,${(0.1 * (s.tint || 0) + 0.26 * (s.flash || 0)).toFixed(3)})` : '';
      r.el.style.boxShadow = s.ring ? `inset 0 0 0 1px rgba(255,84,0,${(0.7 * s.ring).toFixed(3)})` : '';
    });
    if (st.graded != null) {
      v.gm.style.width = ((Math.min(st.graded, 2000) / 2000) * 100).toFixed(2) + '%';
      txt(v.gv, `${M.fmt.int(st.graded)} of 2,000`);
    }
    if (st.share != null) {
      const s = st.share;
      v.cand.style.width = s.toFixed(2) + '%';
      v.knob.style.left = (100 - s).toFixed(2) + '%';
      txt(v.la, `Frontier model ${Math.round(100 - s)}%`);
      txt(v.lb, `Small model ${Math.round(s)}%`);
    }
    return v;
  }

  /** A control's centre in stage px, measured now: buttons that appear mid-scene have no place until shown. */
  function centerOf(view, el) {
    const [x, y, w, h] = M.rectOf(view.world, el);
    return [x + w / 2, y + h / 2];
  }

  return { build, measure, set, clock, centerOf, LIMITS, SEG_SHARE };
})();
