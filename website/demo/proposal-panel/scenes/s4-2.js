/* Scene 4.2: the guardrail stops the request. A sequence diagram: the workflow calls the CFO agent, whose
   request goes to the prompt injection guard before any model call. The guard compares the text with its
   patterns, matches one, and a DENIED stamp lands on its lane; the denial returns to the agent and the
   workflow, the review ends as BLOCKED with the recorded reason, and the model lane stays dark throughout. */
Film.register({
  id: '4.2',

  ID: 'rev-a90f42c1',
  REASON: "Guardrail blocked: before model call guardrail blocked, category PROMPT_INJECTION, name prompt-injection-guard: Prompt injection detected: input matches pattern 'ignore all previous instructions'",

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const examines = at('examines'), compares = Math.max(at('compares'), examines + 1.2), finds = Math.max(at('finds'), compares + 1.2);
    const denies = Math.max(at('denies'), finds + 1.0), status = Math.max(at('status'), denies + 2.0);
    this.K = { examines, compares, finds, denies, status, nothing: at('nothing'), score: at('score') };
  },

  render(root) {
    root.classList.add('s42');
    Mock.style('s42', `
      .s42 .head { left: 120px; top: 70px; width: 1700px; }
      .s42 .head .fp-h { font-size: 52px; }
      .s42 .stamp { position: absolute; left: 1330px; top: 546px; font: 700 30px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--red);
        border: 3px solid var(--red); border-radius: 8px; padding: 10px 16px 9px; transform-origin: 50% 50%; box-shadow: 0 0 28px rgba(255, 84, 0, .35), inset 0 0 18px rgba(255, 84, 0, .12); }
      .s42 .dark { position: absolute; width: 300px; padding: 10px 0; background: #000; text-align: center; font: 500 22px/1.3 var(--sans); color: var(--soft-grey); }
      .s42 .status { left: 1000px; top: 752px; width: 860px; padding: 20px 26px; }
      .s42 .status .top { display: flex; align-items: center; gap: 16px; font: 500 22px/1 var(--sans); color: var(--soft-grey); }
      .s42 .status .top .id { font: 500 22px/1 var(--mono); color: var(--white); }
      .s42 .status .top .sc { margin-left: auto; }
      .s42 .status .top .sc b { font: 500 22px/1 var(--sans); color: var(--white); margin-left: 10px; }
      .s42 .status .rs { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--hair); font: 500 20px/1.4 var(--mono); color: var(--ink-2); }
      .s42 .status .rs i { font-style: normal; color: var(--red); }
    `);
    Mock.dotGrid(root);
    Seq.TYPES.agent = Seq.TYPES.agent || { label: 'Agent', c: '#CFCFCF' };
    Seq.TYPES.guard = { label: 'Guardrail', c: '#CFCFCF' };
    Seq.TYPES.model = { label: 'Model', c: '#A6A6A6' };
    this.head = Mock.mount(root, `<div class="head"><div class="mk-eyebrow" data-k="eb">Preventive control</div>
      <h2 class="fp-h" style="margin-top:18px" data-k="h">A guardrail examines each request before the model does.</h2></div>`);
    this.stamp = Mock.mount(root, `<div class="stamp">Denied</div>`).root;
    this.dark = Mock.mount(root, `<div class="dark" style="left:1482px;top:632px">Nothing reaches this lane.</div>`).root;
    this.status = Mock.mount(root, `<div class="fp-card status">
      <div class="top"><span>Review</span><span class="id">${this.ID}</span>${Film.chip('Blocked')}<span class="sc">Overall score<b data-k="score">none</b></span></div>
      <div class="rs">${this.REASON.replace('PROMPT_INJECTION', '<i>PROMPT_INJECTION</i>').replace("'ignore all previous instructions'", "<i>'ignore all previous instructions'</i>")}</div></div>`);
    this.built = false;
  },

  build() {
    if (this.built) return;
    this.built = true;
    this.timing();
    const K = this.K;
    this.seq = Film.seq(this.root, {
      x0: 120, x1: 1800, top: 190, headH: 84, row: 40, keyAt: [120, 735],
      lanes: [
        { id: 'ep', name: 'Review endpoint', type: 'endpoint' },
        { id: 'wf', name: 'Review workflow', type: 'workflow' },
        { id: 'cfo', name: 'CFO agent', type: 'agent' },
        { id: 'guard', name: 'Prompt injection guard', type: 'guard' },
        { id: 'model', name: 'The model', type: 'model' },
      ],
      rows: [
        { from: 'ep', to: 'wf', label: 'start the review', at: 0.9, write: true },
        { from: 'wf', to: 'cfo', label: 'review as the CFO', at: 1.7 },
        { from: 'cfo', to: 'guard', label: 'the request, before the model call', at: K.examines },
        { from: 'guard', to: 'guard', label: 'compare with the injection patterns', at: K.compares },
        { from: 'guard', to: 'guard', label: "match: 'ignore all previous instructions'", at: K.finds },
        { from: 'guard', to: 'cfo', label: 'denied, with the reason', at: K.denies, reply: true },
        { from: 'cfo', to: 'wf', label: 'guardrail blocked, no retry', at: K.denies + 0.9, reply: true, write: true },
        { from: 'wf', to: 'ep', label: 'status BLOCKED', at: K.status, reply: true },
        { gap: true },
        { gap: true },
      ],
    });
    this.deny = this.seq.s.msgs[5];
  },

  at(t) {
    const M = Mock;
    this.build();
    const K = this.K;
    M.rise(this.head.eb, t, 0.0, { dy: 10 });
    M.rise(this.head.h, t, 0.1);
    this.seq.at(t);
    /* the model lane stays dark for the whole scene */
    const s = this.seq.s, dim = 0.3;
    s.heads[4].style.opacity = (parseFloat(s.heads[4].style.opacity || 0) * dim).toFixed(3);
    s.lives[4].style.opacity = (parseFloat(s.lives[4].style.opacity || 0) * dim).toFixed(3);
    /* the denial is red-orange once drawn */
    if (t >= K.denies) { const d = this.deny; d.path.style.stroke = '#FF5400'; d.head.style.fill = '#FF5400'; d.lb.style.fill = '#FF5400'; d.tok.style.fill = '#FF5400'; }
    /* the stamp lands on the guard's lane */
    const sp = M.p(t, K.denies, 0.45, 'outCubic');
    this.stamp.style.opacity = M.prog(t, K.denies, 0.18).toFixed(3);
    this.stamp.style.transform = `rotate(-8deg) scale(${(1 + 1.1 * (1 - sp)).toFixed(3)})`;
    M.rise(this.dark, t, K.nothing - 0.2, { dy: 8 });
    M.rise(this.status.root, t, K.status + 0.2, { dy: 12 });
    Film.glow(this.status.root, M.ramp(t, K.status + 0.2, this.span + 1, 0.6, 0.5) * 0.6);
    this.status.score.style.color = t >= K.score - 0.1 ? 'var(--yellow)' : '';
  },
});
