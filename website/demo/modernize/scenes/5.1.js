/* Scene 5.1: Specify, what goes in. A specification opens; its parts light as they are named: the user stories
   with their priorities, the functional requirements, the measurable success criteria, the decisions and the exit
   conditions. Rails run into it from the findings, the decisions and the answer key. */
Fx.register({
  id: '5.1',

  IN: ['Findings', 'Decisions', 'Answer key'],
  IY: [380, 490, 600],
  PARTS: [
    { t: 'User stories, with their priorities', key: 'user' },
    { t: 'Functional requirements', key: 'requirements,', note: 'Each one cites the finding it rests on.', noteKey: 'cites' },
    { t: 'Measurable success criteria', key: 'measurable' },
    { t: 'Decisions', key: 'decisions' },
    { t: 'Exit conditions', key: 'exit', note: 'A rule a release must meet before it ships.', noteKey: 'rule' },
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { parts: this.PARTS.map((p) => at(p.key)), notes: this.PARTS.map((p) => (p.noteKey ? at(p.noteKey) : null)) };
  },

  render(root) {
    root.classList.add('s51');
    Mock.style('s51', `
      .s51 .in { height: 72px; }
      .s51 .spec { padding: 26px 34px; }
      .s51 .pt { --g: 0; position: relative; height: 62px; margin-top: 8px; border-radius: 10px; padding: 0 20px; display: flex; align-items: center; gap: 24px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241, 241, 241, .12)); background: rgba(255, 206, 74, calc(var(--g) * .08)); }
      .s51 .pt b { font: 600 26px/1 var(--sans); letter-spacing: -.015em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); white-space: nowrap; }
      .s51 .pt span { margin-left: auto; font: 500 21px/1.2 var(--sans); color: var(--soft-grey); white-space: nowrap; }
      .s51 .spec .nm { margin: 6px 0 14px; font-size: 32px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Specify', headline: 'The specification holds what the system is for.', station: 2, from: 1 });
    const S = Fx.svg(root, this.IY.map((y, i) => `<path data-k="r${i}" class="y dash" d="M480 ${y + 36} C620 ${y + 36} 620 ${y + 36} 760 ${y + 36}"/>`).join(''));
    this.rails = this.IY.map((_, i) => S.k['r' + i]);
    this.pks = this.rails.map(() => Fx.stream(root, 2));
    this.ins = this.IN.map((text, i) => { const el = Fx.tile(root, { x: 160, y: this.IY[i], w: 320, h: 72, text }); el.classList.add('in'); return el; });
    this.spec = Mock.mount(root, `<div class="fx-card spec" style="left:760px;top:300px;width:1000px;height:480px"><div class="k">Specification</div><div class="nm">Freight rating</div>
      ${this.PARTS.map((p, i) => `<div class="pt" data-k="p${i}"><b>${p.t}</b>${p.note ? `<span data-k="n${i}">${p.note}</span>` : ''}</div>`).join('')}</div>`);
    this.parts = this.PARTS.map((_, i) => this.spec['p' + i]);
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/changes-spec.png', name: 'Changes · Spec' });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.spec.root, t, 0.4);
    this.ins.forEach((el, i) => { M.rise(el, t, 0.8 + i * 0.25, { dy: 10 }); Fx.glow(el, 0.25); });
    this.rails.forEach((r, i) => {
      const s = 1.2 + i * 0.25;
      M.draw(r, t, s, 0.5);
      if (M.prog(t, s, 0.5) >= 1) { r.style.strokeDasharray = '6 7'; M.march(r, t, 14); }
      Fx.streamAt(this.pks[i], r, t, s + 0.4, this.duration, 1.5);
    });
    /* each part lights while it is named and stays faintly lit after */
    this.parts.forEach((p, i) => {
      const k = K.parts[i], next = K.parts[i + 1] != null ? K.parts[i + 1] : k + 2.4;
      M.rise(p, t, 0.9 + i * 0.12, { dy: 8 });
      Fx.glow(p, Math.max(M.ramp(t, k - 0.2, next + 0.1, 0.25, 0.5), 0.25 * M.prog(t, next, 0.4)));
      const n = this.spec['n' + i];
      if (n) { M.rise(n, t, K.notes[i] - 0.2, { dy: 8 }); if (t >= K.notes[i] - 0.2) Fx.glow(p, Math.max(0.25, M.ramp(t, K.notes[i] - 0.2, K.notes[i] + 2.6, 0.3, 0.6))); }
    });
    this.scr.at(t, { a: Mock.captionAt(this, 'cites') - 1.0, b: this.duration + 1, from: [540, 500, 1360], to: [548, 530, 1300], hi: [570, 555, 830, 100], hiAt: Mock.captionAt(this, 'cites') + 0.2 });
  },
});
