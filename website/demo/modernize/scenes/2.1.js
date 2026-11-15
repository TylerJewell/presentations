/* Scene 2.1: the system that enters. One card glows: the freight-rating engine, in service since 2004. Beneath it,
   the three forms it exists in fade in as hairline cards: the tariff book, the code and the production service,
   whose three callers pulse as they call it. Then the sources step back, the card slides onto the left of the
   factory's rail, the five stations draw in, and an empty twin card outlines at the far right under
   "Pre-production". As the last sentence names where the work happens, a terminal panel above the rail shows the
   plugin's commands running, with plain labels for the places it runs (Claude Code, an IDE, other agent harnesses),
   and the people at the factory's decision points line up below the rail, each joined to the station they decide
   at. The engineers are one group among them. The panel is drawn in the film's own style; it shows no third-party
   product's interface. */
Fx.register({
  id: '2.1',

  SRC: [
    { k: 'Tariff book', nm: '140 rate tables', key: 'tariff' },
    { k: 'Code', nm: '22 years of changes', key: 'code' },
    { k: 'Production', nm: '3 callers', key: 'production' },
  ],
  CALLERS: ['Booking', 'Invoicing', 'Partner API'],
  CX: [540, 740, 940, 1140, 1340],   /* station centres; the rail runs at y 560 */
  PLACES: ['Claude Code', 'Your IDE', 'Other agent harnesses'],
  COMMANDS: [
    ['/akka:discover', 'Findings written, each with the evidence behind it'],
    ['/akka:specify', 'Specification written: user stories, requirements, exit conditions'],
    ['/akka:plan', 'Plan written: the tasks, their order and their models'],
  ],
  /* people at the decision points, in station order, each joined to the station they decide at */
  PEOPLE: [
    { role: 'Operations lead', does: 'Confirms how it runs today', st: 0 },
    { role: 'Business analyst', does: 'Resolves ambiguity', st: 1 },
    { role: 'Product owner', does: 'Decides what it is for', st: 2 },
    { role: 'Engineer', does: 'Reviews what is built', st: 3 },
    { role: 'Risk and compliance', does: 'Approves what must pass', st: 4 },
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { src: this.SRC.map((s) => at(s.key)), slide: at('what') - 0.6, places: [at('Claude'), at('IDE'), at('harness')] };
  },

  render(root) {
    root.classList.add('s21');
    Mock.style('s21', `
      .s21 .sys { text-align: center; align-items: center; justify-content: center; }
      .s21 .sys .nm { margin-top: 0; }
      .s21 .sys .tx { margin-top: 8px; }
      .s21 .src .nm { font-size: 36px; }
      .s21 .caller { width: 136px; height: 52px; justify-content: center; padding: 0; font-size: 20px; }
      .s21 .fx-step { font-size: 24px; height: 72px; }
      .s21 .pre { left: 1500px; top: 452px; width: 260px; text-align: center; }
      .s21 .term { left: 460px; top: 120px; width: 1000px; height: 330px; border-radius: 14px; border: 1px solid rgba(241, 241, 241, .22);
        background: #0b0b0d; box-shadow: 0 30px 80px rgba(0, 0, 0, .7); overflow: hidden; }
      .s21 .term .bar { position: absolute; left: 0; right: 0; top: 0; height: 52px; border-bottom: 1px solid rgba(241, 241, 241, .12); display: flex; align-items: center; gap: 10px; padding: 0 16px; }
      .s21 .term .tab { --g: 0; height: 32px; padding: 0 14px; border-radius: 8px; display: flex; align-items: center; font: 600 17px/1 var(--sans); white-space: nowrap;
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241, 241, 241, .16)); }
      .s21 .term .plug { margin-left: auto; font: 600 15px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); white-space: nowrap; }
      .s21 .term .ln { position: absolute; left: 28px; right: 28px; overflow: hidden; white-space: nowrap; }
      .s21 .term .cmd { font: 600 23px/1 var(--mono); color: var(--yellow); }
      .s21 .term .cmd i { font-style: normal; color: var(--soft-grey); margin-right: 12px; }
      .s21 .term .out { margin-top: 10px; font: 500 21px/1 var(--sans); color: var(--white); }
      .s21 .ppl { top: 652px; }
      .s21 .pc { --g: 0; top: 690px; width: 300px; height: 96px; border-radius: 12px; padding: 16px 20px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241, 241, 241, .18)); background: #0e0e11; }
      .s21 .pc b { display: block; font: 700 23px/1.1 var(--sans); letter-spacing: -.015em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); white-space: nowrap; }
      .s21 .pc span { display: block; margin-top: 8px; font: 500 18px/1.2 var(--sans); color: var(--soft-grey); white-space: nowrap; }
    `);
    Fx.frame(root, {});
    const S = Fx.svg(root, `
      ${[380, 960, 1540].map((x, i) => `<path data-k="l${i}" d="M960 410 C960 470 ${x} 470 ${x} 530"/>`).join('')}
      ${[0, 1, 2].map((i) => `<path data-k="c${i}" class="y dash" d="M${1388 + i * 152} 760 V654"/>`).join('')}
      <path data-k="rail" class="y dash" d="M420 560 H1500"/>`);
    this.lines = [0, 1, 2].map((i) => S.k['l' + i]);
    this.calls = [0, 1, 2].map((i) => S.k['c' + i]);
    this.rail = S.k.rail;
    this.pks = this.calls.map(() => Fx.stream(root, 2));
    this.src = this.SRC.map((s, i) => { const c = Fx.card(root, { x: 160 + i * 580, y: 530, w: 440, h: 124, k: s.k, nm: s.nm }).root; c.classList.add('src'); return c; });
    this.callers = this.CALLERS.map((text, i) => { const el = Fx.tile(root, { x: 1320 + i * 152, y: 760, w: 136, h: 52, text }); el.classList.add('caller'); return el; });
    this.steps = Fx.STATIONS.map((text, i) => Fx.step(root, { x: this.CX[i] - 85, y: 524, w: 170, text }));
    this.twin = Fx.card(root, { x: 1500, y: 495, w: 260, h: 130, ghost: true }).root;
    this.pre = Mock.mount(root, '<div class="pre fx-side">Pre-production</div>').root;
    /* where the factory runs: the plugin's commands in a terminal, with the places it runs as plain labels */
    const M = Mock;
    this.term = M.mount(root, `<div class="term"><div class="bar">${this.PLACES.map((p) => `<div class="tab">${p}</div>`).join('')}<div class="plug">With Akka's AI plugins</div></div>
      ${this.COMMANDS.map(([c, o], i) => `<div class="ln" style="top:${80 + i * 82}px"><div class="cmd"><i>&gt;</i>${c}</div><div class="out">${o}</div></div>`).join('')}</div>`).root;
    this.tabs = [...this.term.querySelectorAll('.tab')];
    this.cmds = [...this.term.querySelectorAll('.ln')];
    /* who uses it: the people at the factory's decision points */
    const PX = (i) => 160 + i * 325;
    const S2 = Fx.svg(root, this.PEOPLE.map((p, i) => `<path data-k="j${i}" class="dash" d="M${PX(i) + 150} 690 C${PX(i) + 150} 640 ${this.CX[p.st]} 630 ${this.CX[p.st]} 596"/>`).join(''));
    this.joins = this.PEOPLE.map((_, i) => S2.k['j' + i]);
    this.ppl = M.mount(root, '<div class="ppl fx-side" style="left:160px;opacity:0">The people at its decision points</div>').root;
    this.pcs = this.PEOPLE.map((p, i) => M.mount(root, `<div class="pc" style="left:${PX(i)}px"><b>${p.role}</b><span>${p.does}</span></div>`).root);
    this.sys = Fx.card(root, { x: 660, y: 250, w: 600, h: 160, nm: 'Freight rating', tx: 'In service since 2004' });
    this.sys.root.classList.add('sys');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    /* the system and the three forms it exists in */
    const out = M.p(t, K.slide, 0.6, 'inOutCubic');
    const sys = this.sys, mv = M.p(t, K.slide + 0.3, 1.3, 'inOutCubic');
    M.rise(sys.root, t, 0.3);
    M.set(sys.root, { left: M.lerp(660, 160, mv).toFixed(1) + 'px', top: M.lerp(250, 495, mv).toFixed(1) + 'px', width: M.lerp(600, 260, mv).toFixed(1) + 'px', height: M.lerp(160, 130, mv).toFixed(1) + 'px' });
    sys.nm.style.fontSize = M.lerp(56, 30, mv).toFixed(1) + 'px';
    sys.tx.style.fontSize = M.lerp(26, 18, mv).toFixed(1) + 'px';
    Fx.glow(sys.root, M.prog(t, 0.6, 0.8) * (1 - 0.4 * mv));
    this.lines.forEach((l, i) => { M.draw(l, t, 0.6 + i * 0.35, 0.6); if (t > K.slide) l.style.opacity = (1 - out).toFixed(3); });
    this.src.forEach((c, i) => {
      M.rise(c, t, 0.9 + i * 0.35);
      Fx.glow(c, M.ramp(t, K.src[i] - 0.2, K.src[i] + 1.6, 0.3, 0.5));
      if (t > K.slide) c.style.opacity = (1 - out).toFixed(3);
    });
    /* the callers call production, each on its own beat */
    const callOn = 2.0;
    this.callers.forEach((c, i) => {
      M.rise(c, t, callOn - 0.2 + i * 0.2, { dy: 10 });
      Fx.glow(c, 0.25 + 0.5 * M.wave(t, 1.6, i / 3) * M.prog(t, callOn + 0.4, 0.5));
      if (t > K.slide) c.style.opacity = (1 - out).toFixed(3);
    });
    this.calls.forEach((p, i) => {
      p.style.opacity = (M.prog(t, callOn, 0.5) * (1 - out)).toFixed(3);
      M.march(p, t, 14);
      Fx.streamAt(this.pks[i], p, t, callOn + 0.3 + i * 0.4, K.slide - 1.6, 1.6);
    });
    /* the card takes its place at the start of the rail; the stations and the empty twin draw in */
    M.draw(this.rail, t, K.slide + 0.7, 0.8);
    if (M.prog(t, K.slide + 0.7, 0.8) >= 1) { this.rail.style.strokeDasharray = '6 7'; M.march(this.rail, t, 14); }
    this.steps.forEach((el, i) => { M.rise(el, t, K.slide + 0.8 + i * 0.12, { dy: 12 }); Fx.glow(el, 0.55 * M.prog(t, K.slide + 1.2 + i * 0.12, 0.5)); });
    M.fade(this.twin, t, K.slide + 1.3, 0.6);
    M.rise(this.pre, t, K.slide + 1.4, { dy: 8 });
    /* where it runs: the terminal rises, each place lights as it is named, and the commands run in turn */
    const c0 = K.places[0];
    M.rise(this.term, t, c0 - 0.5);
    this.tabs.forEach((el, i) => Fx.glow(el, Math.max(M.ramp(t, K.places[i] - 0.2, (K.places[i + 1] ?? K.places[i] + 1.4) + 0.1, 0.2, 0.4), 0.35 * M.prog(t, K.places[2] + 1.0, 0.4))));
    this.cmds.forEach((el, i) => {
      const s = c0 + 0.2 + i * 0.9;
      el.style.opacity = M.prog(t, s, 0.15).toFixed(3);
      el.style.clipPath = `inset(0 ${(100 * (1 - M.p(t, s, 0.7, 'linear'))).toFixed(1)}% 0 0)`;
    });
    /* who uses it: the people at the decision points, joined to their stations */
    M.fade(this.ppl, t, c0 + 0.4, 0.5);
    this.pcs.forEach((el, i) => {
      const s = c0 + 0.6 + i * 0.3;
      M.rise(el, t, s, { dy: 12 });
      M.draw(this.joins[i], t, s + 0.2, 0.4);
      Fx.glow(el, 0.35 + 0.4 * M.ramp(t, s + 0.2, s + 1.4, 0.2, 0.5));
    });
  },
});
