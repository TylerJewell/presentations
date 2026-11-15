/* Scene 2.3: each control is assigned in configuration. The lines of the service's application.conf that
   assign the guardrails, the classifier and the evaluator to agents by component name; the assignment
   lines light as they are spoken about, and the card of application code stays as it is. */
Film.register({
  id: '2.3',

  LINES: [
    ['akka.javasdk.agent {'],
    ['  guardrails {'],
    ['    "prompt-injection-guard" {'],
    ['      class = "com.example.application.PromptInjectionGuard"'],
    ['      agents = ["*"]', 'a'],
    ['    }'],
    ['    "review-quality-guard" {'],
    ['      class = "com.example.application.ReviewQualityGuard"'],
    ['      agents = ["cfo-persona", "cio-persona",', 'a'],
    ['                "procurement-persona", "ops-director-persona"]', 'a'],
    ['    }'],
    ['  }'],
    ['  classifiers { "toxicity" { class = "com.example.application.ToxicityClassifier" } }'],
    ['}'],
    ['akka.javasdk.evaluation.evaluators {'],
    ['  review-quality-evaluator { agents { cfo-persona { trigger = interaction } … } }', 'a'],
    ['}'],
  ],
  FILES: ['ReviewWorkflow.java', 'CfoPersonaAgent.java', 'CioPersonaAgent.java', 'ProcurementPersonaAgent.java', 'OpsDirectorPersonaAgent.java', 'SynthesisAgent.java'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { assigned: at('assigned'), adding: at('Adding'), code: at('code') };
  },

  render(root) {
    root.classList.add('s23');
    Mock.style('s23', `
      .s23 .head { left: var(--gutter); top: 100px; }
      .s23 .fp-code { left: 160px; top: 230px; width: 1150px; font-size: 21px; line-height: 1.5; }
      .s23 .fp-code .path { position: absolute; right: 24px; top: 16px; font: 500 16px/1 var(--mono); color: var(--medium-grey); }
      .s23 .files { left: 1370px; top: 230px; width: 390px; height: 590px; }
      .s23 .files .f { font: 500 19px/1.9 var(--mono); color: var(--ink-2); }
      .s23 .files .ln { margin-top: auto; color: var(--white); }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">Each control is assigned in configuration.</h2></div>`);
    this.code = Mock.mount(root, `<div class="fp-code"><span class="path">src/main/resources/application.conf</span>${this.LINES.map(([s, k]) =>
      `<span class="ln${k ? ' a' : ''}">${s.replace(/"[^"]*"/g, (q) => `<i>${q}</i>`)}</span>`).join('')}</div>`).root;
    this.assign = [...this.code.querySelectorAll('.ln.a')];
    this.lines = [...this.code.querySelectorAll('.ln')];
    this.files = Mock.mount(root, `<div class="fp-card files"><div class="eb">Application code</div>
      <div style="margin-top:14px">${this.FILES.map((f) => `<div class="f">${f}</div>`).join('')}</div>
      <div class="ln" data-k="stays">The code stays as it is.</div></div>`);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.h, t, 0.1);
    M.rise(this.code, t, 0.4);
    this.lines.forEach((l, i) => (l.style.opacity = M.prog(t, 0.5 + i * 0.06, 0.3).toFixed(3)));
    const g = Math.max(M.ramp(t, K.assigned - 0.2, K.adding + 0.4, 0.4, 0.6), 0.5 * M.p(t, K.adding, 0.6));
    this.assign.forEach((l) => l.style.setProperty('--g', g.toFixed(3)));
    this.code.style.borderColor = `rgba(255,206,74,${(0.2 + 0.6 * M.ramp(t, K.adding - 0.2, K.adding + 2.2, 0.3, 0.8)).toFixed(3)})`;
    M.rise(this.files.root, t, 1.2);
    Film.glow(this.files.root, M.p(t, K.code - 0.2, 0.7, 'outCubic'));
    this.files.stays.style.opacity = M.prog(t, K.code - 0.2, 0.5).toFixed(3);
  },
});
