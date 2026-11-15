/* Scene 1.2: a software factory. The factory drawn as a line. Raw inputs enter at the left: ideas, documents, an
   existing system. Along the line six stations light in turn, unattended: research, specification, plan, build,
   test, audit. Above the line, three owner cards mark the three decisions only people make, each joined to its
   point on the line. A finished system leaves at the right with a "Release candidate" tag. */
Fx.register({
  id: '1.2',

  INPUTS: ['Ideas', 'Documents', 'An existing system'],
  STATIONS: ['Research', 'Specification', 'Plan', 'Build', 'Test', 'Audit'],
  SX: (i) => 525 + i * 180,          /* station centres; the line runs at y 610 */
  OWNERS: [
    { q: 'What the system is for', key: 'for,', pt: 418 },
    { q: 'How to resolve ambiguity', key: 'ambiguity,', pt: 615 },
    { q: 'What must pass to release', key: 'pass', pt: 1335 },
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { factory: 0.4, builds: at('builds'), people: at('You'), owners: this.OWNERS.map((o) => at(o.key)), auto: at('validates'), checked: at('made.') };
  },

  render(root) {
    root.classList.add('s12');
    Mock.style('s12', `
      .s12 .in { height: 50px; font-size: 21px; }
      .s12 .fx-step { height: 60px; font-size: 21px; border-radius: 12px; }
      .s12 .ow { height: 104px; }
      .s12 .ow .nm { margin-top: 10px; font-size: 24px; white-space: nowrap; }
      .s12 .dm { width: 18px; height: 18px; margin: -9px 0 0 -9px; transform: rotate(45deg); border: 2px solid var(--yellow); background: var(--black); opacity: 0; }
      .s12 .dm.on { background: var(--yellow); box-shadow: 0 0 16px rgba(255, 206, 74, .8); }
      .s12 .out { height: 100px; justify-content: center; }
      .s12 .out .nm { margin-top: 0; font-size: 28px; }
      .s12 .tag { left: 1540px; top: 680px; width: 220px; display: flex; justify-content: center; }
      .s12 .tag .fx-chip { color: var(--yellow); border-color: rgba(255, 206, 74, .55); background: rgba(255, 206, 74, .08); }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Akka Specify', headline: 'Akka Specify creates and runs <span class="accent">software factories</span> for your IT initiatives.' });
    const M = Mock;
    const S = Fx.svg(root, `<path data-k="line" class="y dash" d="M390 610 H1540"/>
      ${this.INPUTS.map((_, i) => `<path data-k="i${i}" d="M390 ${549 + i * 61} C405 ${549 + i * 61} 405 610 418 610"/>`).join('')}
      ${this.OWNERS.map((o, i) => `<path data-k="o${i}" class="dash" d="M${545 + i * 400} 404 C${545 + i * 400} 500 ${o.pt} 520 ${o.pt} 600"/>`).join('')}`);
    this.line = S.k.line;
    this.ins = this.INPUTS.map((_, i) => S.k['i' + i]);
    this.links = this.OWNERS.map((_, i) => S.k['o' + i]);
    this.pks = Fx.stream(root, 4);
    this.inputs = this.INPUTS.map((text, i) => { const el = Fx.tile(root, { x: 160, y: 524 + i * 61, w: 230, h: 50, text }); el.classList.add('in'); return el; });
    this.steps = this.STATIONS.map((text, i) => Fx.step(root, { x: this.SX(i) - 75, y: 580, w: 150, text }));
    this.dms = this.OWNERS.map((o) => M.mount(root, `<div class="dm" style="left:${o.pt}px;top:610px"></div>`).root);
    this.owners = this.OWNERS.map((o, i) => { const c = Fx.card(root, { x: 360 + i * 400, y: 300, w: 370, h: 104, k: 'You decide', nm: o.q }).root; c.classList.add('ow'); return c; });
    this.out = Fx.card(root, { x: 1540, y: 560, w: 220, h: 100, nm: 'A system' }).root;
    this.out.classList.add('out');
    this.tag = M.mount(root, '<div class="tag"><div class="fx-chip">Release candidate</div></div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* the raw inputs, and the line they enter */
    this.inputs.forEach((el, i) => { M.rise(el, t, K.factory + 0.2 + i * 0.2, { dy: 10 }); Fx.glow(el, 0.2); });
    this.ins.forEach((p, i) => M.draw(p, t, K.factory + 0.5 + i * 0.2, 0.4));
    M.draw(this.line, t, K.factory + 0.8, 1.2);
    if (M.prog(t, K.factory + 0.8, 1.2) >= 1) { this.line.style.strokeDasharray = '6 7'; M.march(this.line, t, 14); }
    /* the stations light in turn, with no one at them */
    const a = K.builds, step = (K.people - 0.4 - a) / this.STATIONS.length;
    this.steps.forEach((el, i) => {
      M.rise(el, t, K.factory + 1.0 + i * 0.12, { dy: 10 });
      const on = a + i * step;
      Fx.glow(el, Math.max(M.ramp(t, on, on + step + 0.3, 0.2, 0.4), 0.15 + 0.5 * M.wave(t, 2.4, i / 6) * M.prog(t, K.auto, 0.5)));
    });
    /* the owners, at three marked points */
    this.owners.forEach((c, i) => {
      const k = K.owners[i], next = K.owners[i + 1] != null ? K.owners[i + 1] : K.auto;
      M.rise(c, t, K.people - 0.2 + i * 0.2);
      M.draw(this.links[i], t, K.people + 0.2 + i * 0.2, 0.5);
      if (M.prog(t, K.people + 0.2 + i * 0.2, 0.5) >= 1) this.links[i].style.strokeDasharray = '6 7';
      this.dms[i].style.opacity = M.prog(t, K.people + 0.5 + i * 0.2, 0.3).toFixed(3);
      const lit = M.ramp(t, k - 0.5, next, 0.25, 0.5);
      Fx.glow(c, Math.max(lit, 0.2 * M.prog(t, next, 0.4)));
      this.dms[i].classList.toggle('on', lit > 0.5);
    });
    /* everything else is automatic: work moves down the line and a release candidate leaves it */
    Fx.streamAt(this.pks, this.line, t, K.auto - 0.4, this.duration, 2.4);
    M.rise(this.out, t, K.auto + 0.2, { dy: 10 });
    Fx.glow(this.out, M.prog(t, K.checked - 0.2, 0.5));
    M.rise(this.tag, t, K.checked, { dy: 10 });
  },
});
