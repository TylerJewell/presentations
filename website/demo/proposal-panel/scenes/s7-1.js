/* Scene 7.1: one record per proposal. The record card at left collects six entries as the proposal's story
   replays at speed. The controls that made them stand in a column at right; as each one is named it lights,
   its stamp travels the connector to the record and the entry lands with its time. At the end the record
   glows as one whole and the controls step back. The look is a calm, exact record, not a chart. */
Film.register({
  id: '7.1',

  REC: { id: 'rev-3b18d05e', title: 'Product license renewal, 3 years', date: '2026-11-05' },
  /* the entries in the order they were written, each with the control that wrote it */
  ROWS: [
    { at: '14:02:11.084', stamp: 'Sanitized', detail: 'Two emails and a phone number were masked.', chip: null, kind: 'Preventive', ctl: 'PII sanitizer', ids: ['sanitizers'] },
    { at: '14:02:11.097', stamp: 'Guardrails passed', detail: 'No injection or jailbreak pattern matched.', chip: 'Passed', kind: 'Preventive', ctl: 'Two input guardrails', ids: ['prompt-injection-guard', 'jailbreak-guard'] },
    { at: '14:02:19.410', stamp: 'Four reviews', detail: 'Scores 4, 4, 4 and 5, each with a rationale.', chip: null, kind: 'Agents', ctl: 'Four persona agents', ids: ['{cfo,cio,procurement,ops-director}-persona'] },
    { at: '14:02:23.206', stamp: 'Synthesis', detail: 'Overall score 4.2, three risks, three recommendations.', chip: null, kind: 'Agent', ctl: 'Synthesis agent', ids: ['synthesis-agent'] },
    { at: '14:02:31.652', stamp: 'Quality verdict', detail: 'The review fell below the quality standard.', chip: 'Breached', kind: 'Detective', ctl: 'Review quality evaluator', ids: ['review-quality-evaluator'] },
    { at: '14:41:08.330', stamp: 'Release rejected', detail: 'Reason: the renewal price for years 2 and 3 is not stated.', chip: 'Rejected', kind: 'By a named person', ctl: 'Action approval', ids: ['action-approval'] },
  ],
  /* geometry: the record card, its rows, the control column and the connectors between them */
  CX: 160, CW: 880, CY: 196, HEAD: 118, RH: 80, KX: 1200, KW: 600,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const reader = at('reader'), evl = at('evaluator');
    this.K = { land: [at('masked') - 0.2, at('guardrails'), reader, Mock.lerp(reader, evl, 0.55), evl, at('person')], all: at('auditor') };
  },

  render(root) {
    const M = Mock, R = this.ROWS;
    root.classList.add('s71');
    M.style('s71', `
      .s71 .head { left: var(--gutter); top: 84px; }
      .s71 .rec { --g: 0; left: ${this.CX}px; top: ${this.CY}px; width: ${this.CW}px; height: ${this.HEAD + R.length * this.RH + 26}px; border-radius: 16px; box-sizing: border-box;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.16)); background: rgba(255,255,255,.02);
        box-shadow: 0 0 calc(var(--g) * 70px) calc(var(--g) * -18px) rgba(255,206,74,.6); }
      .s71 .rec > * { position: absolute; }
      .s71 .rh { left: 30px; top: 26px; width: ${this.CW - 60}px; }
      .s71 .rh .eb { font: 600 20px/1 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: var(--soft-grey); }
      .s71 .rh .id { margin-top: 14px; display: flex; align-items: baseline; gap: 18px; white-space: nowrap; }
      .s71 .rh .id code { font: 500 27px/1 var(--mono); color: var(--white); }
      .s71 .rh .id b { font: 600 27px/1 var(--sans); letter-spacing: -.015em; color: var(--white); }
      .s71 .rh .id span { margin-left: auto; font: 500 20px/1 var(--mono); color: var(--soft-grey); }
      .s71 .sep { left: 30px; top: ${this.HEAD - 12}px; width: ${this.CW - 60}px; height: 1px; background: rgba(241,241,241,.14); }
      .s71 .row { left: 30px; width: ${this.CW - 60}px; height: ${this.RH}px; display: grid; grid-template-columns: 158px 1fr auto; align-items: center; column-gap: 18px;
        border-top: 1px solid rgba(241,241,241,.08); border-radius: 8px; }
      .s71 .row.r0 { border-top-color: transparent; }
      .s71 .row .t { font: 500 20px/1 var(--mono); color: var(--soft-grey); font-variant-numeric: tabular-nums; }
      .s71 .row .w b { display: block; font: 600 24px/1 var(--sans); letter-spacing: -.015em; color: var(--white); }
      .s71 .row .w span { display: block; margin-top: 7px; font: 500 20px/1.2 var(--sans); color: var(--soft-grey); white-space: nowrap; }
      .s71 .row .c { min-width: 10px; }
      .s71 .col { left: ${this.KX}px; top: ${this.CY - 44}px; font: 600 20px/1 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: var(--soft-grey); }
      .s71 .ctl { --g: 0; left: ${this.KX}px; width: ${this.KW}px; height: ${this.RH - 10}px; box-sizing: border-box; padding: 0 22px; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.14));
        background: linear-gradient(160deg, rgba(255,206,74,calc(var(--g) * .14)), rgba(255,206,74,calc(var(--g) * .03))), rgba(255,255,255,.025);
        box-shadow: 0 0 calc(var(--g) * 56px) calc(var(--g) * -16px) rgba(255,206,74,.7); }
      .s71 .ctl .n { display: flex; align-items: baseline; gap: 12px; white-space: nowrap; }
      .s71 .ctl .n b { font: 600 23px/1 var(--sans); letter-spacing: -.015em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s71 .ctl .n i { font: 600 20px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; font-style: normal; color: var(--soft-grey); }
      .s71 .ctl code { font: 500 20px/1 var(--mono); color: var(--soft-grey); white-space: nowrap; }
      .s71 svg.wire { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s71 .wire path { fill: none; stroke: rgba(241,241,241,.3); stroke-width: 2; stroke-dasharray: 5 7; }
      .s71 .pk { left: 0; top: 0; width: 46px; height: 32px; margin: -16px 0 0 -23px; border-radius: 6px; padding: 7px 8px 0; box-sizing: border-box; background: #141416;
        border: 1px solid var(--yellow); box-shadow: 0 0 20px rgba(255,206,74,.45); }
      .s71 .pk i { display: block; height: 3px; border-radius: 2px; margin-bottom: 4px; background: rgba(255,206,74,.8); }
      .s71 .pk i + i { width: 62%; }
    `);
    M.dotGrid(root);
    this.head = M.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">Every proposal leaves one record.</h2></div>`);
    const rec = M.mount(root, `<div class="rec" data-k="rec">
      <div class="rh"><div class="eb">One record</div>
        <div class="id"><code>${this.REC.id}</code><b>${this.REC.title}</b><span>${this.REC.date}</span></div></div>
      <div class="sep"></div>
      ${R.map((r, i) => `<div class="row r${i}" style="top:${this.HEAD + i * this.RH}px" data-k="row${i}">
        <div class="t">${r.at}</div><div class="w"><b>${r.stamp}</b><span>${r.detail}</span></div><div class="c">${r.chip ? Film.chip(r.chip) : ''}</div></div>`).join('')}</div>`);
    this.rec = rec.rec;
    this.rows = R.map((_, i) => rec['row' + i]);
    this.col = M.mount(root, `<div class="col">The source of each entry</div>`).root;
    this.ctls = R.map((r, i) => M.mount(root, `<div class="ctl" style="top:${this.CY + this.HEAD + i * this.RH + 5}px">
      <div class="n"><b>${r.ctl}</b><i>${r.kind}</i></div><code>${r.ids.join('  ·  ')}</code></div>`).root);
    /* one connector per row, from the control's left edge to the record's right edge */
    const svg = M.html(`<svg class="wire" viewBox="0 0 1920 1080">${R.map(() => '<path/>').join('')}</svg>`);
    root.appendChild(svg);
    this.wires = [...svg.querySelectorAll('path')].map((p, i) => {
      const y = this.CY + this.HEAD + i * this.RH + this.RH / 2;
      p.setAttribute('d', `M${this.KX},${y} L${this.CX + this.CW},${y}`);
      return p;
    });
    this.pk = M.mount(root, `<div class="pk"><i></i><i></i></div>`).root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), n = this.ROWS.length;
    M.rise(this.head.h, t, 0.1);
    M.rise(this.rec, t, 0.4, { dy: 16 });
    M.rise(this.col, t, 0.7, { dy: 8 });
    const back = 1 - 0.5 * M.p(t, K.all, 0.8, 'inOutCubic');
    let packet = null;
    this.ROWS.forEach((_, i) => {
      const a = K.land[i], next = i + 1 < n ? K.land[i + 1] : K.all;
      const ctl = this.ctls[i];
      M.rise(ctl, t, 0.8 + i * 0.1, { dy: 10 });
      /* the control lights while its words are read; its stamp crosses to the record over 0.5 s */
      Film.glow(ctl, M.ramp(t, a - 0.3, Math.min(a + 2.2, next + 0.2), 0.3, 0.5));
      M.draw(this.wires[i], t, a - 0.25, 0.5, 'inOutCubic');
      const go = M.prog(t, a - 0.2, 0.55);
      if (go > 0 && go < 1) packet = { x: M.lerp(this.KX, this.CX + this.CW, M.ease.inOutCubic(go)), y: this.CY + this.HEAD + i * this.RH + this.RH / 2 };
      /* the entry lands when the stamp arrives */
      const row = this.rows[i];
      M.rise(row, t, a + 0.3, { dy: 6, dur: 0.5, fade: 0.4 });
      const hot = M.ramp(t, a + 0.3, Math.min(a + 2.4, next + 0.3), 0.3, 0.6);
      row.style.background = hot > 0.01 ? `rgba(255,206,74,${(0.08 * hot).toFixed(3)})` : '';
      if (t >= K.all) ctl.style.opacity = (+ctl.style.opacity * back).toFixed(3);
    });
    this.wires.forEach((w) => { if (t >= K.all) w.style.opacity = back.toFixed(3); });
    if (t >= K.all) this.col.style.opacity = (+this.col.style.opacity * back).toFixed(3);
    this.pk.style.opacity = packet ? '1' : '0';
    if (packet) this.pk.style.transform = `translate(${packet.x.toFixed(1)}px, ${packet.y.toFixed(1)}px)`;
    /* the whole record glows as the auditor reads it in one place */
    Film.glow(this.rec, M.p(t, K.all, 0.9));
  },
});
