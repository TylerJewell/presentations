/* Scene 4.2: self-hosting and prices. The question, then the real capture of gpt-oss-20b's Hosting section: the
   camera pushes into its worksheet figures and the spotlight moves from the assigned price to utilization to
   break-even as each is named. The cursor follows the "Prices" link and Cost › Prices comes up as a mock in the
   console's look: the version in force with its prices per million tokens, then the Not costed grid with
   gpt-oss-20b and its "Add a price" command, which lights as every figure is said to trace to a price. The
   Prices figures are the canon of sample-figures.md. */
Tok.register({
  id: '4.2',

  RECT: [160, 100, 1600, 944],

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { worksheet: at('worksheet'), assigned: at('assigned'), util: at('utilization'), even: at('break'), prices: at('Prices'), force: at('force'), not: at('not'), every: at('every'), price: at('price', 20) };
  },

  render(root) {
    const M = Mock, A4 = Act4;
    root.classList.add('t42', 'a4');
    A4.css();
    M.style('t42', `
      .t42 .two { display: grid; grid-template-columns: 420px minmax(0, 1fr); gap: 12px; align-items: start; }
      .t42 .card { --g: 0; background: var(--c-surface); border-radius: 12px; padding: 12px 16px 14px;
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 90%), var(--c-line)), 0 0 calc(var(--g) * 34px) calc(var(--g) * -6px) rgba(255, 206, 74, .55); }
      .t42 .card .a4-gt { padding: 0 0 8px; }
      .t42 .a4-grid { --g: 0; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 90%), var(--c-line)), 0 0 calc(var(--g) * 34px) calc(var(--g) * -6px) rgba(255, 206, 74, .55); }
      .t42 .a4-h { margin-top: 14px; }
      .t42 .cmd { --g: 0; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-blue)); }
      .t42 .mk-console .band h1 { font-size: 20px; }
    `);
    M.dotGrid(root);
    this.c = Tok.capture(root, {
      states: [{ image: 'captures/hosting.png', url: 'localhost:9889/inference/models/gpt-oss-20b' }],
      crumb: 'Optimize › Inference › Models', active: 'Inference', rect: this.RECT,
    });

    /* Cost › Prices, drawn over the capture in the same world so the camera moves both */
    this.P = M.consoleFrame(this.c.world, { crumb: 'Optimize › Cost › Prices', active: 'Cost', title: 'Cost › Prices', url: 'localhost:9889/cost/prices', rect: this.RECT });
    this.P.el.style.opacity = 0;
    this.P.el.style.zIndex = 3;                                   /* above the capture's image layer, under the cursor */
    M.mount(this.P.bandRight, `<span class="a4-btn y">Propose a list…</span><span class="a4-btn">Seven days ended November 9, 2026</span>`);
    const money = (v) => '$' + v.toFixed(2);
    const prices = [['frontier-large', 2.5, 0.25, 3.13, 15], ['frontier-mini', 0.4, 0.04, 0.5, 1.6], ['reasoner-pro', 15, 1.5, 18.75, 75]];
    const r = M.mount(this.P.page, `<div>
      <div class="two">
        <div class="card" data-k="force">
          <div class="a4-gt">Catalog ${A4.chip('In force', 'ok')}</div>
          <div class="a4-facts">
            <div class="k">Version</div><div>3</div>
            <div class="k">Effective</div><div>October 26, 2026</div>
            <div class="k">Published</div><div>October 26, 2026</div>
            <div class="k">Description</div><div>The proposed list, published as version 3</div>
          </div>
        </div>
        ${A4.grid({
          title: 'Prices per million tokens', n: `${prices.length} served names`,
          cols: [{ h: 'Served name', w: '1fr' }, { h: 'Input', w: '110px', r: 1 }, { h: 'Cache read', w: '110px', r: 1 }, { h: 'Cache write', w: '110px', r: 1 }, { h: 'Output', w: '110px', r: 1 }],
          rows: prices.map(([n, ...v]) => [`<b>${n}</b>`, ...v.map(money)]),
        })}
      </div>
      <div class="a4-h">Not costed <span class="f">1 model</span></div>
      <div data-k="nc">${A4.grid({
        cols: [{ h: 'Model', w: '1fr' }, { h: 'Exchanges', w: '120px', r: 1 }, { h: 'Tokens', w: '110px', r: 1 }, { h: 'Why', w: '260px', pl: 1 }, { h: '', w: '120px', r: 1 }],
        rows: [['<b>gpt-oss-20b</b>', '12,400', '612M', 'No entry in the catalog', '<span class="cmd" data-k="add">Add a price</span>']],
      })}</div>
    </div>`);
    this.forceEl = r.force; this.ncEl = r.nc; this.ncGrid = r.nc.firstElementChild; this.addEl = r.add;
    this.question = Tok.question(root, { text: this.q });
  },

  at(t) {
    const M = Mock, A4 = Act4, K = (this.timing(), this.K), c = this.c;
    this.question.at(t);
    const click = K.prices + 0.8;                                 /* the click on the Prices link in the attention row */
    this.P.el.style.opacity = M.ease.css(M.prog(t, click, 0.6)).toFixed(3);

    /* stage rects of the mock's parts, in the capture's pixels for the camera */
    const R = this.RECT, kx = R[2] / 1920, ky = (R[3] - 44) / 1080;
    const inv = (el) => { const [x, y, w, h] = M.rectOf(c.world, el); return [(x - R[0]) / kx, (y - R[1] - 44) / ky, w / kx, h / ky]; };

    c.at(t, {
      enter: 2.4,
      cam: [
        { t: 2.9, rect: [298, 56, 1300, 180] },
        { t: K.even + 0.5, rect: null, dur: 0.9 },
        { t: K.not - 0.5, rect: inv(this.ncEl), dur: 1.1 },
      ],
      spot: [
        { t: K.assigned - 0.15, rect: [306, 114, 280, 110] },
        { t: K.util - 0.15, rect: [588, 114, 300, 110] },
        { t: K.even - 0.15, rect: [1212, 114, 250, 110] },
        { t: K.even + 0.5, rect: null },
      ],
      cursor: [
        { t: K.even + 0.9, x: 1500, y: 700, glide: 0.5 },
        { t: click, x: 1826, y: 761, click: true, glide: 0.8 },
        { t: click + 1.0, x: 1826, y: 761, hide: true },
      ],
    });

    /* the Prices mock: the version in force, then the Not costed grid and its command */
    A4.lit(this.forceEl, M.ramp(t, K.force - 0.3, K.not + 0.1, 0.35, 0.4));
    A4.lit(this.ncGrid, M.ramp(t, K.not - 0.1, K.price + 1.6, 0.35, 0.5));
    A4.lit(this.addEl, M.prog(t, K.every, 0.5));
  },
});
