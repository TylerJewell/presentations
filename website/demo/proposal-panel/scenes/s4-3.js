/* Scene 4.3: what the record shows. The local console, Verify › Activity, the trace of the blocked review
   as a short tree of spans: the endpoint, the workflow, the CFO step, the guardrail span marked DENIED,
   and the place a model span would be, left empty. Beside it the ledger, where the same decision is added
   as one line: time, control, outcome. A spotlight follows the narration. */
Film.register({
  id: '4.3',

  ID: 'rev-a90f42c1',
  REASON: "Guardrail blocked: before model call guardrail blocked, category PROMPT_INJECTION, name prompt-injection-guard: Prompt injection detected: input matches pattern 'ignore all previous instructions'",
  SPANS: [
    { d: 0, n: 'POST /reviews', c: 'ReviewEndpoint', ms: '9 ms', s: 'Completed' },
    { d: 1, n: 'start the review', c: 'ReviewWorkflow', ms: '4 ms', s: 'Completed' },
    { d: 2, n: 'review as the CFO', c: 'cfo-persona', ms: '2 ms', s: 'Blocked' },
    { d: 3, n: 'before model call', c: 'prompt-injection-guard', ms: '1 ms', s: 'Denied', k: 'guard' },
    { d: 3, n: 'model call', c: 'none', ms: '', s: '', ghost: true, k: 'ghost' },
    { d: 1, n: 'end the review', c: 'ReviewWorkflow', ms: '1 ms', s: 'Blocked' },
  ],
  LEDGER: [
    ['14:02:11', 'sanitizers', 'rev-7c2e91a4', 'Passed'],
    ['14:02:11', 'prompt-injection-guard', 'rev-7c2e91a4', 'Passed'],
    ['14:02:12', 'jailbreak-guard', 'rev-7c2e91a4', 'Passed'],
    ['14:02:58', 'review-quality-guard', 'rev-7c2e91a4', 'Passed'],
    ['14:03:40', 'review-quality-evaluator', 'rev-7c2e91a4', 'Upheld'],
    ['14:07:36', 'prompt-injection-guard', 'rev-a90f42c1', 'Denied'],
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { trace: at('trace'), reason: at('reason'), none: at('no'), ledger: at('same'), permanent: at('permanent') };
    const rect = (el) => Mock.rectOf(this.root, el);
    this.R = { tree: rect(this.tr.root), guard: rect(this.tr.guard), reason: rect(this.tr.rs), ghost: rect(this.tr.ghost), line: rect(this.lg.line) };
  },

  render(root) {
    const M = Mock;
    root.classList.add('s43');
    M.style('s43', `
      .s43 .page > * { position: absolute; }
      .s43 .hd { left: 0; top: 0; height: 36px; display: flex; align-items: center; gap: 14px; font-size: 15px; color: var(--c-muted); }
      .s43 .hd .ttl { font-size: 18px; font-weight: 500; color: var(--c-text); }
      .s43 .hd .mono { font: 500 15px/1 var(--mono); color: var(--c-text); }
      .s43 .hd .tid { font: 500 12.5px/1 var(--mono); color: var(--c-faint); }
      .s43 .fp-chip { font-size: 11.5px; padding: 5px 9px; gap: 6px; } .s43 .fp-chip svg { width: 11px; height: 11px; }
      .s43 .pn { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; }
      .s43 .pn .t { position: absolute; left: 16px; top: 14px; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); font-weight: 600; }
      .s43 .tr { left: 0; top: 50px; width: 760px; height: 456px; }
      .s43 .sp { position: absolute; left: 8px; right: 8px; height: 42px; display: grid; grid-template-columns: minmax(0, 1fr) 190px 60px 92px; align-items: center; gap: 0 12px; padding: 0 10px; border-radius: 8px; font-size: 14.5px; color: var(--c-text); white-space: nowrap; }
      .s43 .sp.h { height: 24px; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); font-weight: 600; }
      .s43 .sp + .sp:not(.h) { border-top: 1px solid rgba(236,236,241,.06); }
      .s43 .sp .n { display: flex; align-items: center; gap: 8px; overflow: hidden; }
      .s43 .sp .n i { flex: none; width: 14px; height: 14px; border-left: 1px solid var(--c-faint); border-bottom: 1px solid var(--c-faint); border-radius: 0 0 0 3px; margin: -10px 2px 0 0; }
      .s43 .sp .c { font: 500 13px/1 var(--mono); color: var(--c-muted); overflow: hidden; text-overflow: ellipsis; }
      .s43 .sp .ms { font: 500 13px/1 var(--mono); color: var(--c-muted); text-align: right; }
      .s43 .sp .st { justify-self: start; }
      .s43 .sp.ghost { color: var(--c-faint); }
      .s43 .sp.ghost .n b { font-weight: 400; padding: 5px 10px; border: 1px dashed rgba(236,236,241,.22); border-radius: 6px; }
      .s43 .sp.ghost .c { color: var(--c-faint); }
      .s43 .rs { position: absolute; left: 16px; right: 16px; top: 340px; padding: 12px 14px; border-radius: 8px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); font: 500 12.5px/1.5 var(--mono); color: var(--c-code-text); white-space: normal; }
      .s43 .rs .k { display: block; font: 600 10.5px/1 var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); margin-bottom: 6px; }
      .s43 .rs i { font-style: normal; color: var(--c-red); }
      .s43 .lg { left: 784px; top: 50px; width: 505px; height: 456px; }
      .s43 .lr { position: absolute; left: 8px; right: 8px; height: 44px; display: grid; grid-template-columns: 70px minmax(0, 1fr) 86px; align-items: center; gap: 0 12px; padding: 0 10px; border-radius: 8px; font-size: 14px; color: var(--c-text); white-space: nowrap; --g: 0; background: rgba(255, 206, 74, calc(var(--g) * .08)); }
      .s43 .lr.h { height: 24px; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); font-weight: 600; }
      .s43 .lr + .lr:not(.h) { border-top: 1px solid rgba(236,236,241,.06); }
      .s43 .lr .w { font: 500 13px/1 var(--mono); color: var(--c-muted); }
      .s43 .lr .ctl { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
      .s43 .lr .ctl b { font: 500 13.5px/1 var(--mono); color: var(--c-text); font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
      .s43 .lr .ctl span { font: 500 11.5px/1 var(--mono); color: var(--c-faint); }
      .s43 .lr.old { opacity: .62; }
      .s43 .lr .fp-chip { justify-self: start; }
    `);
    this.f = Film.console(root, { crumb: 'Verify › Activity', active: 'Activity', title: 'Activity', tabs: ['Traces', 'Conversations', 'Replay'], tab: 'Traces' });
    Film.note(root);
    const pg = this.f.page;
    this.hd = M.mount(pg, `<div class="hd"><span class="ttl">Trace</span><span class="mono">${this.ID}</span><span>POST /reviews</span>${Film.chip('Blocked')}<span class="tid">trace 7f3a0c91e4b25d68</span></div>`);
    const indent = (d) => `<span style="display:inline-block;width:${d * 22}px;flex:none"></span>${d ? '<i></i>' : ''}`;
    const rows = this.SPANS.map((s, i) => `<div class="sp${s.ghost ? ' ghost' : ''}" style="top:${52 + i * 44}px"${s.k ? ` data-k="${s.k}"` : ''}>
        <span class="n">${indent(s.d)}<b>${s.ghost ? 'No model call' : s.n}</b></span><span class="c">${s.c}</span><span class="ms">${s.ms}</span><span class="st">${s.s ? Film.chip(s.s) : ''}</span></div>`).join('');
    this.tr = M.mount(pg, `<div class="pn tr"><span class="t">Spans</span>
      <div class="sp h" style="top:38px"><span>Span</span><span>Component</span><span style="text-align:right">Time</span><span>Status</span></div>${rows}
      <div class="rs" data-k="rs"><span class="k">Reason</span>${this.REASON.replace('PROMPT_INJECTION', '<i>PROMPT_INJECTION</i>').replace("'ignore all previous instructions'", "<i>'ignore all previous instructions'</i>")}</div></div>`);
    this.spans = [...this.tr.root.querySelectorAll('.sp:not(.h)')];
    this.lg = M.mount(pg, `<div class="pn lg"><span class="t">Ledger</span>
      <div class="lr h" style="top:38px"><span>Time</span><span>Control</span><span>Outcome</span></div>
      ${this.LEDGER.map(([w, c, r, o], i) => `<div class="lr${i < 5 ? ' old' : ''}" style="top:${52 + i * 48}px"${i === 5 ? ' data-k="line"' : ''}>
        <span class="w">${w}</span><span class="ctl"><b>${c}</b><span>${r}</span></span>${Film.chip(o)}</div>`).join('')}</div>`);
    this.cursor = M.cursor(root);
    this.spot = M.spotlight(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), R = this.R;
    M.rise(this.f.el, t, 0.0, { dy: 12 });
    M.rise(this.hd.root, t, 0.3, { dy: 0 });
    M.rise(this.tr.root, t, 0.4, { dy: 10 });
    this.spans.forEach((el, i) => M.rise(el, t, 0.7 + i * 0.16, { dy: 8 }));
    M.rise(this.tr.rs, t, 1.9, { dy: 8 });
    M.rise(this.lg.root, t, 0.6, { dy: 10 });
    /* the new ledger line is added while it is spoken about */
    const on = t >= K.ledger;
    M.rise(this.lg.line, t, K.ledger, { dy: 10 });
    this.lg.line.style.visibility = on ? 'visible' : 'hidden';
    this.lg.line.style.setProperty('--g', M.ramp(t, K.ledger, this.span + 1, 0.4, 0.6).toFixed(3));
    this.spot.at(t, [
      { t: K.trace - 0.2, rect: R.tree },
      { t: K.reason - 0.4, rect: [R.guard[0], R.guard[1], R.guard[2], R.guard[3]] },
      { t: K.reason + 1.6, rect: R.reason },
      { t: K.none - 0.2, rect: R.ghost },
      { t: K.ledger - 0.2, rect: [R.line[0] - 6, R.line[1] - 6, R.line[2] + 12, R.line[3] + 12] },
      { t: this.span - 1.4, rect: null },
    ]);
    this.cursor.at(t, [
      { t: 0.6, x: 1130, y: 690 },
      { t: K.reason - 0.4, x: R.guard[0] + 60, y: R.guard[1] + R.guard[3] / 2, glide: 0.9 },
      { t: K.ledger - 0.2, x: R.line[0] + 80, y: R.line[1] + R.line[3] / 2, glide: 1.0 },
      { t: K.permanent, x: R.line[0] + 420, y: R.line[1] + 90 },
    ]);
  },
});
