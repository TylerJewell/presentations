/* Scene 3.3: probes run the original and watch it. The original system is one box; six probe cards attach to it
   in turn and light as each is named. A probe sends a pulse into the box, and its count lands on the findings at
   the right. A ladder in the corner climbs Read, Run, Compare; each finding says which rung it stands on. */
Fx.register({
  id: '3.3',

  PROBES: [
    { name: 'Surface', key: 'routes' },
    { name: 'Schema', key: 'data,' },
    { name: 'Dependencies', key: 'services' },
    { name: 'Sequence', key: 'sequence' },
    { name: 'Clock', key: 'time,' },
    { name: 'Distribution', key: 'range' },
  ],
  /* findings: which probe returns it, its count and what it counts */
  FOUND: [
    { probe: 0, n: '24', l: 'routes' },
    { probe: 1, n: '140', l: 'rate tables' },
    { probe: 5, n: '45 kg', l: 'weight break, tested at 44.9, 45 and 45.1 kg' },
  ],
  RUNGS: ['Compare', 'Run', 'Read'],
  PY: (i) => 320 + i * 68,
  FY: [330, 470, 610],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { runs: at('runs'), probes: this.PROBES.map((p) => at(p.key)), stronger: at('stronger'), kind: at('kind') };
  },

  render(root) {
    root.classList.add('s33');
    Mock.style('s33', `
      .s33 .fx-head { width: 1180px; }
      .s33 .box .nm { font-size: 40px; }
      .s33 .pr { height: 54px; font-size: 22px; }
      .s33 .fd { --g: 0; left: 1060px; width: 700px; height: 112px; border-radius: 14px; padding: 0 26px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 50%), rgba(241, 241, 241, .16)); background: rgba(255, 255, 255, .025); }
      .s33 .fd .n { position: absolute; left: 26px; top: 22px; font: 700 48px/1 var(--sans); letter-spacing: -.035em; color: var(--yellow); white-space: nowrap; }
      .s33 .fd .l { position: absolute; left: 26px; top: 78px; font: 500 22px/1.2 var(--sans); color: var(--soft-grey); white-space: nowrap; }
      .s33 .fd .fx-chip { position: absolute; right: 22px; top: 22px; }
      .s33 .lad { left: 1540px; top: 100px; width: 220px; }
      .s33 .lad .fx-side { margin-bottom: 12px; }
      .s33 .lad .fx-tile { position: relative; height: 44px; margin-top: 8px; justify-content: center; font-size: 20px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Discover', headline: 'A probe runs the original system and records what it does.', station: 0 });
    const S = Fx.svg(root, `
      ${this.PROBES.map((_, i) => `<path data-k="p${i}" d="M600 ${this.PY(i) + 27} C550 ${this.PY(i) + 27} 540 515 490 515"/>`).join('')}
      ${this.FOUND.map((f, j) => `<path data-k="f${j}" class="y" d="M900 ${this.PY(f.probe) + 27} C980 ${this.PY(f.probe) + 27} 980 ${this.FY[j] + 56} 1060 ${this.FY[j] + 56}"/>`).join('')}`);
    this.links = this.PROBES.map((_, i) => S.k['p' + i]);
    this.outs = this.FOUND.map((_, j) => S.k['f' + j]);
    this.box = Fx.card(root, { x: 160, y: 400, w: 330, h: 230, k: 'The original', nm: 'Freight rating', tx: 'Running, as it does in production' }).root;
    this.box.classList.add('box');
    this.probes = this.PROBES.map((p, i) => { const el = Fx.tile(root, { x: 600, y: this.PY(i), w: 300, h: 54, text: p.name }); el.classList.add('pr'); return el; });
    this.pulse = this.PROBES.map(() => Fx.stream(root, 1));
    this.fd = this.FOUND.map((f, j) => Mock.mount(root, `<div class="fd" style="top:${this.FY[j]}px"><div class="n">${f.n}</div><div class="l">${f.l}</div><div class="fx-chip" data-k="rung">Run</div></div>`));
    this.lad = Mock.mount(root, `<div class="lad"><div class="fx-side">Evidence</div>${this.RUNGS.map((r) => `<div class="fx-tile">${r}</div>`).join('')}</div>`).root;
    this.rungs = [...this.lad.querySelectorAll('.fx-tile')];
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/redesign-probes.png', name: 'Changes · Probes' });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.box, t, 0.4);
    Fx.glow(this.box, 0.3 + 0.4 * M.prog(t, K.runs - 0.3, 0.6));
    /* each probe attaches as it is named, sends a pulse into the box and stays lit while it is spoken of */
    this.probes.forEach((el, i) => {
      const k = K.probes[i], next = K.probes[i + 1] != null ? K.probes[i + 1] : K.stronger;
      M.rise(el, t, k - 0.5, { dy: 10 });
      M.draw(this.links[i], t, k - 0.4, 0.5);
      Fx.glow(el, Math.max(M.ramp(t, k - 0.3, next + 0.2, 0.25, 0.5), 0.2 * M.prog(t, next, 0.4)));
      this.pulse[i].forEach((pk) => {
        const p = M.prog(t, k, 0.9);
        if (p <= 0 || p >= 1) { pk.style.opacity = 0; return; }
        Fx.place(pk, this.links[i], M.ease.inOutCubic(p));
        pk.style.opacity = Math.min(1, p * 6, (1 - p) * 6).toFixed(3);
      });
    });
    /* the counts come back and land on the findings */
    this.fd.forEach((f, j) => {
      const s = K.probes[this.FOUND[j].probe] + 0.9;
      M.draw(this.outs[j], t, s - 0.4, 0.5);
      M.rise(f.root, t, s);
      Fx.glow(f.root, M.ramp(t, s, s + 2.2, 0.3, 0.8));
      M.fade(f.rung, t, K.kind - 0.4 + j * 0.3, 0.4);
      Fx.glow(f.root, Math.max(M.ramp(t, s, s + 2.2, 0.3, 0.8), M.ramp(t, K.kind - 0.4 + j * 0.3, this.duration + 1, 0.3, 0.1) * 0.6));
    });
    /* the ladder: a fact read, a fact run, a fact compared */
    M.rise(this.lad, t, 0.6, { dy: 10 });
    const on = [M.prog(t, K.stronger - 0.2, 0.5), M.prog(t, K.runs, 0.5), M.prog(t, 0.9, 0.5)];
    const top = t >= K.stronger - 0.2 ? 0 : t >= K.runs ? 1 : 2;
    this.rungs.forEach((r, i) => Fx.glow(r, i === top ? on[i] : i > top ? 0.25 : 0));
    /* the ladder steps back while the console's probes show */
    this.lad.style.opacity = (Number(this.lad.style.opacity) * (1 - M.prog(t, Mock.captionAt(this, 'stronger') - 0.3, 0.5))).toFixed(3);
    this.scr.at(t, { a: Mock.captionAt(this, 'stronger') - 0.3, b: this.duration + 1, from: [548, 250, 1360], to: [566, 296, 1320], hi: [1722, 298, 150, 420], hiAt: Mock.captionAt(this, 'kind') - 0.6 });
  },
});
