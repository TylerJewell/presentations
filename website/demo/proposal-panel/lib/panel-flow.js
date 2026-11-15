/* The panel flow: the proposal card, the four persona cards and the synthesis card in a row, a flow rail
   under them, a work token that visits each persona in turn, and the four result lines that flow into the
   synthesis card. Scenes 1.2 and 5.1 draw it.

   const flow = Film.panelFlow(root, { y: 300 });
   flow.at(t, { cards, visit: [t, t, t, t], dwell, synth })   cards rise at `cards`; the token reaches persona i at
                                                             visit[i] and stays `dwell` s; the synthesis card lights
                                                             at `synth` and the results flow in
   flow.personas[i], flow.proposal, flow.synth, flow.score   refs for a scene's own extras */
(function () {
  const M = Mock;
  M.style('fp-flow', `
    .fp-flow > * { position: absolute; }
    .fp-flow svg { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
    .fp-flow .tok { left: 0; top: 0; }
    .fp-flow .stub { stroke: rgba(241,241,241,.22); stroke-width: 1.5; }
    .fp-flow .res { fill: none; stroke: var(--yellow); stroke-width: 2; opacity: .85; }
    .fp-flow .tok { width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: var(--yellow); box-shadow: 0 0 20px 6px rgba(255,206,74,.5); opacity: 0; }
    .fp-flow .score { margin-top: auto; display: flex; align-items: baseline; gap: 12px; }
    .fp-flow .score b { font: 700 64px/1 var(--sans); letter-spacing: -.04em; color: var(--yellow); font-variant-numeric: tabular-nums; }
    .fp-flow .score span { font: 500 20px/1.2 var(--sans); color: var(--soft-grey); }
  `);

  Film.panelFlow = function (parent, opts = {}) {
    const Y = opts.y ?? 300, H = 260, RAIL = Y + H + 60;
    const root = M.html('<div class="fp-flow" style="left:0;top:0;width:1920px;height:1080px"></div>');
    parent.appendChild(root);
    const R = Film.REVIEW;
    const proposal = M.mount(root, `<div class="fp-card" style="left:120px;top:${Y}px;width:220px;height:${H}px">
      <div class="eb">Proposal</div><div class="nm">${R.title}</div><div class="bars"><i></i><i></i><i></i><i></i></div><div class="ln" style="margin-top:auto">£222,000 a year</div></div>`).root;
    const PX = [370, 650, 930, 1210];
    const personas = Film.PERSONAS.map((p, i) => Film.persona(root, p, { x: PX[i], y: Y }));
    const synth = M.mount(root, `<div class="fp-card" style="left:1490px;top:${Y}px;width:310px;height:${H}px">
      <div class="eb">Synthesis</div><div class="nm">One report</div>
      <div class="score"><b data-k="score">0.0</b><span>overall<br>score</span></div></div>`);
    const cx = PX.map((x) => x + 125), sx = 1645, px = 230;
    const svg = M.html('<svg viewBox="0 0 1920 1080"></svg>');
    root.appendChild(svg);
    const stubs = [px, ...cx, sx].map((x) => M.svg('line', { class: 'stub', x1: x, x2: x, y1: Y + H, y2: RAIL }, svg));
    const results = cx.map((x) => M.svg('path', { class: 'res', d: `M${x} ${Y} C${x} ${Y - 70}, ${sx} ${Y - 70}, ${sx} ${Y}` }, svg));
    const rail = M.rail(root, { style: { left: px + 'px', width: sx - px + 'px', top: RAIL - 1 + 'px', height: '3px' } });
    const tok = M.html('<div class="tok"></div>');
    root.appendChild(tok);

    return {
      el: root, proposal, personas, synth: synth.root, score: synth.score, rail, results,
      at(t, K) {
        const dwell = K.dwell ?? 1.0;
        M.rise(proposal, t, K.cards);
        personas.forEach((p, i) => M.rise(p.root, t, K.cards + 0.12 + i * 0.12));
        M.rise(synth.root, t, K.cards + 0.7);
        M.railGrow(rail, t, K.cards + 0.5, 1.2);
        M.railAt(rail, t, 10);
        stubs.forEach((s, i) => M.draw(s, t, K.cards + 0.6 + i * 0.08, 0.4));

        /* the token: waypoints (x, time); between them it glides */
        const W = [[px, K.visit[0] - 0.8]];
        K.visit.forEach((v, i) => { W.push([cx[i], v], [cx[i], v + dwell]); });
        W.push([sx, K.synth]);
        let x = W[0][0], on = t >= W[0][1] && t < K.synth + 0.4;
        for (let i = 1; i < W.length; i++) {
          const [xa, ta] = W[i - 1], [xb, tb] = W[i];
          if (t >= tb) { x = xb; continue; }
          if (t >= ta) { x = M.lerp(xa, xb, M.ease.inOutCubic(M.prog(t, ta, tb - ta))); break; }
        }
        M.set(tok, { opacity: on ? 1 : 0, transform: `translate(${x.toFixed(1)}px, ${RAIL}px)` });

        personas.forEach((p, i) => {
          const v = K.visit[i];
          Film.glow(p.root, M.ramp(t, v - 0.1, v + dwell + 0.5, 0.3, 0.5));
          p.ans.style.opacity = M.prog(t, v + dwell * 0.5, 0.4).toFixed(3);
        });
        Film.glow(synth.root, M.p(t, K.synth, 0.6, 'outCubic'));
        results.forEach((r, i) => M.draw(r, t, K.synth + 0.1 + i * 0.12, 0.8));
        M.countUp(synth.score, t, K.synth + 0.4, 1.4, 0, Film.REVIEW.overall, (v) => v.toFixed(1));
        synth.score.parentElement.style.opacity = M.prog(t, K.synth + 0.5, 0.4).toFixed(3);
      },
    };
  };
})();
