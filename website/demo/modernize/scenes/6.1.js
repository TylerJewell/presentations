/* Scene 6.1: Build, designed from Akka's components. This system's own composition, drawn as the Design page
   draws it: its endpoints, its workflow, its entities and its views, joined by what each calls or consumes. Each
   column lights as its kind is named; work travels from the callers' endpoints through the workflow to the
   entities. A pure domain block sits apart: the rating rules, in plain code. The component names are
   illustrative. As the last sentence widens to any enterprise system, the generated component reference shows the
   real component graph of Akka's sample system. */
Fx.register({
  id: '6.1',

  COLS: [
    { h: 'Endpoints', key: 'endpoints', nodes: [['Booking endpoint', 350], ['Invoicing endpoint', 434], ['Partner API endpoint', 518]] },
    { h: 'Workflows', key: 'workflow,', nodes: [['Rating workflow', 434]] },
    { h: 'Entities', key: 'event-sourced', nodes: [['Tariff entity', 392], ['Shipment entity', 476]] },
    { h: 'Views', key: 'views', nodes: [['Rates by zone view', 392], ['Shipments view', 476]] },
  ],
  X: (i) => 160 + i * 410, W: 330, H: 64,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { cols: this.COLS.map((c) => at(c.key)), keep: at('keep'), rules: at('rating'), shape: at('combine') };
  },

  render(root) {
    root.classList.add('s61');
    Mock.style('s61', `
      .s61 .ch { top: 300px; }
      .s61 .nd { height: 64px; font-size: 22px; }
      .s61 .dom { border-style: dashed; }
      .s61 .dom .nm { margin-top: 8px; font-size: 30px; }
      .s61 .jr { left: 980px; top: 562px; display: flex; gap: 8px; align-items: center; }
      .s61 .jr i { width: 26px; height: 18px; border-radius: 4px; border: 1px solid rgba(255, 206, 74, .7); background: rgba(255, 206, 74, .18); }
      .s61 .jr span { margin-left: 8px; font: 500 20px/1 var(--sans); color: var(--soft-grey); white-space: nowrap; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Build', headline: "The factory designs this system from Akka's components.", station: 3, from: 2 });
    const M = Mock, X = this.X, W = this.W, H = this.H, mid = (y) => y + H / 2;
    const e = [];
    this.COLS[0].nodes.forEach(([, y], i) => e.push(`<path data-k="a${i}" d="M${X(0) + W} ${mid(y)} C${X(1) - 40} ${mid(y)} ${X(1) - 40} ${mid(434)} ${X(1)} ${mid(434)}"/>`));
    this.COLS[2].nodes.forEach(([, y], i) => e.push(`<path data-k="b${i}" d="M${X(1) + W} ${mid(434)} C${X(2) - 40} ${mid(434)} ${X(2) - 40} ${mid(y)} ${X(2)} ${mid(y)}"/>`));
    this.COLS[3].nodes.forEach(([, y], i) => e.push(`<path data-k="c${i}" class="dash" d="M${X(2) + W} ${mid(y)} H${X(3)}"/>`));
    e.push(`<path data-k="d" class="dash" d="M${X(1) + W / 2} ${434 + H} V650"/>`);
    const S = Fx.svg(root, e.join(''));
    this.ea = [0, 1, 2].map((i) => S.k['a' + i]);
    this.eb = [0, 1].map((i) => S.k['b' + i]);
    this.ec = [0, 1].map((i) => S.k['c' + i]);
    this.ed = S.k.d;
    this.pa = this.ea.map(() => Fx.stream(root, 1));
    this.pb = this.eb.map(() => Fx.stream(root, 1));
    this.heads = this.COLS.map((c, i) => M.mount(root, `<div class="ch fx-side" style="left:${X(i)}px">${c.h}</div>`).root);
    this.nodes = this.COLS.map((c, i) => c.nodes.map(([text, y]) => { const el = Fx.tile(root, { x: X(i), y, w: W, h: H, text }); el.classList.add('nd'); return el; }));
    this.jr = M.mount(root, `<div class="jr">${'<i></i>'.repeat(6)}<span>Every change kept</span></div>`).root;
    this.ticks = [...this.jr.querySelectorAll('i')];
    this.dom = Fx.card(root, { x: X(1), y: 650, w: W, h: 120, k: 'Plain code', nm: 'Rating rules' }).root;
    this.dom.classList.add('dom');
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/docs-graph.png', source: 'The generated documentation', name: 'Component graph', rect: { x: 400, y: 332, w: 1120, h: 488 } });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* the map draws column by column, then each kind lights as it is named */
    this.heads.forEach((h, i) => M.rise(h, t, 0.6 + i * 0.2, { dy: 10 }));
    this.nodes.forEach((col, i) => col.forEach((n, j) => {
      M.rise(n, t, 0.8 + i * 0.25 + j * 0.08, { dy: 10 });
      const k = K.cols[i], next = K.cols[i + 1] != null ? K.cols[i + 1] : K.rules;
      Fx.glow(n, Math.max(M.ramp(t, k - 0.2, next + 0.1, 0.25, 0.5), 0.7 * M.ramp(t, K.shape - 0.2, this.duration + 1, 0.4, 0.1)));
    }));
    [...this.ea, ...this.eb, ...this.ec].forEach((p, i) => M.draw(p, t, 1.4 + i * 0.08, 0.6));
    /* work from the callers travels through the workflow to the entities */
    this.ea.forEach((p, i) => Fx.streamAt(this.pa[i], p, t, K.cols[0] + i * 0.4, this.duration, 2.2));
    this.eb.forEach((p, i) => Fx.streamAt(this.pb[i], p, t, K.cols[1] + 0.6 + i * 0.5, this.duration, 2.2));
    M.rise(this.jr, t, K.keep - 0.4, { dy: 8 });
    this.ticks.forEach((tk, i) => tk.style.opacity = M.prog(t, K.keep - 0.2 + i * 0.3, 0.2).toFixed(3));
    /* the rating rules sit apart, in plain code */
    M.draw(this.ed, t, K.rules - 0.4, 0.4);
    M.rise(this.dom, t, K.rules - 0.2);
    Fx.glow(this.dom, M.ramp(t, K.rules, K.shape, 0.3, 0.5));
    this.scr.at(t, { a: Mock.captionAt(this, 'combine') - 1.0, b: this.duration + 1, from: [470, 20, 1000], to: [490, 96, 880], hi: [984, 374, 188, 56], hiAt: Mock.captionAt(this, 'combine') + 0.4 });
  },
});
