/* Scene 5.2: Plan, who builds what and in what order. The console's Changes schedule, re-drawn: phases and user
   stories are rows, steps in time run across, and each task is a bar in its step. Tasks in one column can run at
   the same time, across user stories; the column lights as it is spoken of. Beside it, each kind of task carries
   its model, matched by risk. */
Fx.register({
  id: '5.2',

  ROWS: [
    { l: 'Setup', s: [0, 1] },
    { l: 'Foundational', s: [2, 3, 4] },
    { l: 'User story 1', s: [5, 6, 7, 8, 9] },
    { l: 'User story 2', s: [5, 6, 7, 8] },
    { l: 'User story 3', s: [5, 6, 7, 8, 9, 10] },
  ],
  STEPS: 12,
  X0: 440, CW: 62, Y0: 400, RH: 66,
  MODELS: [
    { k: 'Rating rules', nm: 'Most capable model', key: 'rating' },
    { k: 'Components', nm: 'Standard model', key: 'routine' },
    { k: 'Runs', nm: 'Fast model', key: 'faster' },
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { breaks: at('breaks'), same: at('same'), together: at('together'), matched: at('matched'), models: this.MODELS.map((m) => at(m.key)) };
  },

  render(root) {
    root.classList.add('s52');
    Mock.style('s52', `
      .s52 .board { padding: 0; }
      .s52 .rl { left: 190px; width: 230px; height: 30px; font: 600 23px/30px var(--sans); color: var(--white); white-space: nowrap; }
      .s52 .num { width: 62px; text-align: center; top: 334px; font: 500 18px/1 var(--sans); color: var(--soft-grey); }
      .s52 .stepk { left: 190px; top: 334px; font: 600 16px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s52 .bar { --g: 0; width: 46px; height: 18px; border-radius: 4px;
        border: 1.5px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), rgba(241, 241, 241, .45));
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), rgba(241, 241, 241, .08)); box-shadow: 0 0 calc(var(--g) * 18px) rgba(255, 206, 74, .7); }
      .s52 .col { top: 318px; width: 62px; height: 432px; border-radius: 8px; background: rgba(255, 206, 74, .14); border: 1px solid rgba(255, 206, 74, .4); opacity: 0; }
      .s52 .md { height: 118px; }
      .s52 .md .nm { font-size: 30px; }
      .s52 .mside { left: 1340px; top: 296px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Specify', headline: 'Tasks that can run together do, across user stories.', station: 2 });
    const M = Mock;
    this.board = Fx.card(root, { x: 160, y: 300, w: 1120, h: 470 }).root;
    this.board.classList.add('board');
    this.col = M.mount(root, '<div class="col"></div>').root;
    this.stepk = M.mount(root, '<div class="stepk">Step</div>').root;
    this.nums = [1, 4, 8, 12].map((n) => M.mount(root, `<div class="num" style="left:${this.X0 + (n - 1) * this.CW}px">${n}</div>`).root);
    this.rows = this.ROWS.map((r, i) => {
      const y = this.Y0 + i * this.RH;
      return {
        l: M.mount(root, `<div class="rl" style="top:${y}px">${r.l}</div>`).root,
        bars: r.s.map((s) => ({ s, el: M.mount(root, `<div class="bar" style="left:${this.X0 + s * this.CW + 8}px;top:${y + 6}px"></div>`).root })),
      };
    });
    this.mside = M.mount(root, '<div class="mside fx-side">Model, by risk</div>').root;
    this.models = this.MODELS.map((m, i) => { const c = Fx.card(root, { x: 1340, y: 340 + i * 144, w: 420, h: 118, k: m.k, nm: m.nm }).root; c.classList.add('md'); return c; });
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/changes-schedule.png', name: 'Changes · Schedule' });
  },

  /* the column the highlight is on at time t, as a fractional step, or null */
  colAt(t, K) {
    if (t < K.same - 0.2) return null;
    if (t < K.together) return 7;
    const p = Mock.prog(t, K.together, K.matched - K.together - 0.4);
    return 5 + p * 4;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.board, t, 0.4);
    M.fade(this.stepk, t, 0.8, 0.5);
    this.nums.forEach((n) => M.fade(n, t, 0.8, 0.5));
    /* the tasks appear in step order as the plan breaks the specification down */
    const c = this.colAt(t, K), on = c == null ? -1 : Math.round(c);
    this.rows.forEach((r, i) => {
      M.rise(r.l, t, 0.7 + i * 0.12, { dy: 8 });
      r.bars.forEach((b) => {
        M.fade(b.el, t, K.breaks + 0.3 + b.s * 0.18, 0.3);
        Fx.glow(b.el, b.s === on ? 1 - M.prog(t, K.matched + 0.2, 0.6) : 0);
      });
    });
    this.col.style.opacity = c == null ? 0 : (M.prog(t, K.same - 0.2, 0.4) * (1 - M.prog(t, K.matched + 0.2, 0.6))).toFixed(3);
    if (c != null) this.col.style.left = (this.X0 + on * this.CW) + 'px';
    /* each kind of task carries its model */
    M.rise(this.mside, t, K.matched - 0.6, { dy: 10 });
    this.models.forEach((m, i) => {
      const k = K.models[i];
      M.rise(m, t, K.matched - 0.4 + i * 0.25);
      Fx.glow(m, M.ramp(t, k - 0.2, k + 2.2, 0.25, 0.6));
    });
    this.scr.at(t, { a: 0.5, b: Mock.captionAt(this, 'Tasks') - 0.3, from: [548, 582, 1360], to: [560, 596, 1300], hi: [836, 612, 1050, 40], hiAt: Mock.captionAt(this, 'same') - 0.4 });
  },
});

