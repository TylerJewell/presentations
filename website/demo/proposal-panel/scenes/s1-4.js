/* Scene 1.4: the report. The panel's Review Detail: the synthesis card with the overall score counting up,
   the consensus risks and the recommendations; the four persona cards with their per-criterion scores. A
   spotlight follows the narration from the score to the risks, the recommendations and the readers. */
Film.register({
  id: '1.4',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { score: at('overall'), risks: at('risks'), recs: at('list'), each: at('Each'), whole: at('This') };
    const rect = (el) => Mock.rectOf(this.root, el);
    this.R = { score: rect(this.r.scoreBox), risks: rect(this.r.risks), recs: rect(this.r.recs), readers: rect(this.r.readers) };
  },

  render(root) {
    const M = Mock, R = Film.REVIEW;
    root.classList.add('s14');
    M.style('s14', `
      .s14 .syn { left: 36px; top: 96px; width: 760px; height: 590px; }
      .s14 .syn > * { position: absolute; }
      .s14 .sbox { left: 28px; top: 22px; width: 300px; height: 150px; }
      .s14 .sbox .n { margin-top: 10px; display: flex; align-items: baseline; gap: 10px; }
      .s14 .sbox .n b { font: 700 72px/1 var(--sans); letter-spacing: -.04em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .s14 .sbox .n span { font: 500 20px/1 var(--sans); color: var(--c-muted); }
      .s14 .meta { left: 360px; top: 22px; width: 370px; display: flex; flex-direction: column; gap: 10px; font: 500 18px/1.3 var(--sans); color: var(--c-muted); }
      .s14 .meta b { color: var(--c-text); font-weight: 500; }
      .s14 .list { left: 28px; width: 704px; }
      .s14 .list .lbl { margin-bottom: 12px; }
      .s14 .list div + div { display: flex; gap: 14px; padding: 9px 0; font: 500 19px/1.35 var(--sans); border-top: 1px solid var(--c-line); }
      .s14 .list div + div i { font-style: normal; color: var(--yellow); }
      .s14 .readers { left: 830px; top: 96px; width: 938px; height: 600px; }
      .s14 .readers > * { position: absolute; }
      .s14 .pc { width: 455px; height: 290px; padding: 20px 24px; }
      .s14 .pc .top { display: flex; align-items: baseline; gap: 14px; }
      .s14 .pc .top b { font: 600 26px/1 var(--sans); }
      .s14 .pc .top span { font: 500 17px/1 var(--sans); color: var(--c-muted); min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .s14 .pc .top em { margin-left: auto; flex: none; white-space: nowrap; font: 600 26px/1 var(--sans); font-style: normal; font-variant-numeric: tabular-nums; }
      .s14 .pc .top em small { font: 500 15px/1 var(--sans); color: var(--c-muted); margin-left: 4px; }
      .s14 .crit { margin-top: 18px; display: flex; flex-direction: column; gap: 10px; }
      .s14 .crit div { display: grid; grid-template-columns: 110px 1fr 36px; align-items: center; gap: 14px; font: 500 16px/1 var(--sans); color: var(--c-muted); }
      .s14 .crit i { height: 6px; border-radius: 3px; background: var(--c-line); position: relative; overflow: hidden; }
      .s14 .crit i:after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--v) * 10%); background: var(--yellow); border-radius: 3px; }
      .s14 .crit span { text-align: right; color: var(--c-text); font-variant-numeric: tabular-nums; }
      .s14 .why { margin-top: 16px; font: 500 16px/1.4 var(--sans); color: var(--c-muted); }
    `);
    this.app = Film.app(root, { tab: 'Review History' });
    Film.note(root);
    const page = this.app.page;
    this.r = M.mount(page, `<div class="ttl" style="left:36px;top:28px">Review <span class="mono" style="font-size:26px">${R.id}</span></div>`);
    M.mount(page, `<div class="sub" style="left:36px;top:66px">${R.title}, reviewed by four personas and synthesized into one report.</div>`);
    const li = (a) => a.map((s, i) => `<div><i>${i + 1}</i><span>${s}</span></div>`).join('');
    Object.assign(this.r, M.mount(page, `<div class="panel syn" data-k="syn">
      <div class="sbox" data-k="scoreBox"><div class="lbl">Overall score</div><div class="n"><b data-k="score">0.0</b><span>/ 10</span></div>
        <div style="margin-top:8px;display:flex;gap:8px">${Film.chip('Completed')}</div></div>
      <div class="meta"><div>Proposal <b>${R.title}</b></div><div>Readers <b>CFO, CIO, Procurement, Operations</b></div><div>Steps <b>5 of 5 finished</b></div><div>Synthesis <b>one report</b></div></div>
      <div class="list" style="top:200px" data-k="risks"><div class="lbl">Consensus risks</div>${li(R.risks)}</div>
      <div class="list" style="top:400px" data-k="recs"><div class="lbl">Recommendations</div>${li(R.recommendations)}</div></div>`));
    const WHY = { cfo: 'The retainer is within market range; year 2 pricing is open.', cio: 'The scope covers all three environments with named certifications.', procurement: 'Per-ticket pricing above 40 a month is uncapped.', ops: 'A half-time delivery manager covers the reporting.' };
    Object.assign(this.r, M.mount(page, `<div class="readers" data-k="readers">${Film.PERSONAS.map((p, i) => `
      <div class="panel pc" style="left:${(i % 2) * 483}px;top:${Math.floor(i / 2) * 310}px" data-k="pc${i}">
        <div class="top"><b>${p.role}</b><span>${p.risks} risk${p.risks === 1 ? '' : 's'}</span><em>${p.score}<small>/ 10</small></em></div>
        <div class="crit">${p.criteria.map(([n, v]) => `<div><span style="text-align:left;color:var(--c-muted)">${n}</span><i style="--v:${v}"></i><span>${v}</span></div>`).join('')}</div>
        <div class="why">${WHY[p.id]}</div></div>`).join('')}</div>`));
    this.spot = M.spotlight(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), R = this.R, r = this.r;
    M.rise(this.app.el, t, 0.0, { dy: 12 });
    M.countUp(r.score, t, 0.8, 1.4, 0, Film.REVIEW.overall, (v) => v.toFixed(1));
    [0, 1, 2, 3].forEach((i) => M.rise(r['pc' + i], t, 0.6 + i * 0.12, { dy: 10 }));
    this.spot.at(t, [
      { t: K.score - 0.2, rect: R.score },
      { t: K.risks - 0.2, rect: R.risks },
      { t: K.recs - 0.2, rect: R.recs },
      { t: K.each - 0.2, rect: R.readers },
      { t: K.whole - 0.2, rect: null },
    ]);
  },
});
