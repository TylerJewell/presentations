/* Scene 1.3: a workflow remembers its place. A sequence diagram: the endpoint starts the workflow, which
   calls each persona agent in turn and saves its state after each answer. One step gets no answer in 60 s
   and is retried; then the service restarts, and the workflow goes on from the last step that finished. */
Film.register({
  id: '1.3',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { fail: at('If'), restart: at('restarts') - 0.4, resume: at('continues') };
  },

  render(root) {
    root.classList.add('s13');
    Mock.style('s13', `
      .s13 .head { left: 120px; top: 70px; width: 1700px; }
      .s13 .head .fp-h { font-size: 52px; }
    `);
    Mock.dotGrid(root);
    Seq.TYPES.agent = { label: 'Agent', c: '#CFCFCF' };
    this.head = Mock.mount(root, `<div class="head"><div class="mk-eyebrow" data-k="eb">Workflow</div>
      <h2 class="fp-h" style="margin-top:18px" data-k="h">A workflow runs the steps in order and remembers its place.</h2></div>`);
    this.built = false;
  },

  build() {
    if (this.built) return;
    this.built = true;
    this.timing();
    const K = this.K;
    this.seq = Film.seq(this.root, {
      x0: 120, x1: 1800, top: 200, headH: 90, row: 36, keyAt: [1180, 838],
      lanes: [
        { id: 'ep', name: 'Review endpoint', type: 'endpoint' },
        { id: 'wf', name: 'Review workflow', type: 'workflow' },
        { id: 'cfo', name: 'CFO agent', type: 'agent' },
        { id: 'cio', name: 'CIO agent', type: 'agent' },
        { id: 'proc', name: 'Procurement agent', type: 'agent' },
        { id: 'ops', name: 'Operations agent', type: 'agent' },
        { id: 'syn', name: 'Synthesis agent', type: 'agent' },
      ],
      rows: [
        { from: 'ep', to: 'wf', label: 'start the review', at: 0.9, write: true },
        { from: 'wf', to: 'cfo', label: 'review as the CFO', at: 1.6 },
        { from: 'cfo', to: 'wf', label: 'scores, risks, rationale', at: 2.2, reply: true, write: true },
        { from: 'wf', to: 'cio', label: 'review as the CIO', at: 2.9 },
        { from: 'cio', to: 'wf', label: 'scores, risks, rationale', at: 3.5, reply: true, write: true },
        { from: 'wf', to: 'proc', label: 'review as Procurement', at: K.fail },
        { from: 'wf', to: 'wf', label: 'no answer in 60 s: retry 1 of 2', at: K.fail + 0.9 },
        { gap: true },
        { from: 'proc', to: 'wf', label: 'scores, risks, rationale', at: K.fail + 1.9, reply: true, write: true },
        { band: 'The service restarts', at: K.restart },
        { gap: true },
        { from: 'wf', to: 'ops', label: 'continues: review as Operations', at: K.resume },
        { from: 'ops', to: 'wf', label: 'scores, risks, rationale', at: K.resume + 0.7, reply: true, write: true },
        { from: 'wf', to: 'syn', label: 'write the report', at: K.resume + 1.4, write: true },
      ],
    });
  },

  at(t) {
    const M = Mock;
    this.build();
    M.rise(this.head.eb, t, 0.0, { dy: 10 });
    M.rise(this.head.h, t, 0.1);
    this.seq.at(t);
  },
});
