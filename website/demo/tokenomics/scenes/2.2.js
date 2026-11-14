/* Scene 2.2: the same traffic on another model. Both views are mocks in the console's look, drawn to the
   canon figures (sample-figures.md). On Savings the cursor opens "Price on", chooses frontier-mini, and the
   section fills with the period's traffic priced on it, model by model, against what it cost. "Preview a
   price list" opens Prices with the publish dialog, whose preview reads the same way at the proposed list,
   and the spotlight walks the rows before resting on the buttons that have not been pressed. */
Tok.register({
  id: '2.2',

  MODELS: ['frontier-large', 'frontier-mini', 'gpt-oss-20b', 'reasoner-pro', 'support-slm-v1'],
  /* [model, exchanges, cost, on frontier-mini low, high]: the costs by model of scene 1.2; the rows add to
     $1,185.23 over 82,544 priced exchanges and to $340.00 to $390.00 on frontier-mini */
  WHATIF: [
    ['frontier-large', 31500, 812.40, 148.00, 168.00],
    ['reasoner-pro', 2100, 214.86, 33.00, 46.00],
    ['frontier-mini', 38400, 118.52, 118.52, 118.52],
    ['support-slm-v1', 10544, 39.45, 40.48, 57.48],
  ],
  /* [model, exchanges, at the prices in force, at the proposed list]: only frontier-large changes */
  PRICES: [
    ['frontier-large', 31500, 812.40, 779.27],
    ['reasoner-pro', 2100, 214.86, 214.86],
    ['frontier-mini', 38400, 118.52, 118.52],
    ['support-slm-v1', 10544, 39.45, 39.45],
  ],

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { real: at('real'), list: at('A'), model: at('model', 14), before: at('before') };
  },

  render(root) {
    const M = Mock, $ = Tok.money, int = M.fmt.int;
    Act2.css();
    root.classList.add('a2', 't22');
    M.style('t22', `
      .t22 .pg { position: absolute; inset: 0; }
      .t22 .pg > * { position: absolute; left: 0; right: 0; }
      .t22 .res .tools { display: flex; justify-content: flex-end; gap: 8px; margin: 10px 0 8px; }
      .t22 .search { height: 30px; width: 210px; border-radius: 9px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-faint); font-size: 13px; padding: 0 12px; display: flex; align-items: center; }
      .t22 .menu { left: auto; right: 158px; top: 40px; }
      .t22 .foot-links { bottom: 0; }
      .t22 .ver { top: 0; display: flex; gap: 16px; align-items: center; font-size: 14px; color: var(--c-muted); }
      .t22 .ver b { color: var(--c-text); font-weight: 500; }
      .t22 .dlg { left: 8px; right: 8px; top: 40px; height: 518px; }
    `);
    M.dotGrid(root);
    this.world = M.world(root);
    this.f = M.consoleFrame(this.world, { crumb: 'Optimize › Cost › Savings', active: 'Cost', title: 'Savings', url: 'localhost:9889/cost/savings', rect: [160, 100, 1600, 944] });
    this.chip = M.mount(root, `<div class="tk-chiptop">${Tok.chip('sample')}</div>`).root;

    const range = (a, b) => (a === b ? $(a) : `${$(a)} to ${$(b)}`);
    const change = (lo, hi, cost) => (lo === hi ? $(lo - cost) : `${$(lo - cost)} to ${$(hi - cost)}`);
    const W = this.WHATIF, P = this.PRICES;
    const sum = (f) => W.reduce((a, r) => a + f(r), 0);
    const cols = (third, tw, fourth) => [
      { label: 'Model', w: 'minmax(0,1fr)' }, { label: 'Exchanges', w: '100px', r: true }, { label: third, w: tw, r: true, note: third === 'Cost' ? '3' : undefined },
      { label: fourth, w: '240px', r: true, note: '1' }, { label: 'Increase/(decrease)', w: '180px', r: true }, { label: '', w: '120px', pad: true },
    ];
    const cmd = '<span class="cmd"><span>Savings →</span>⋯</span>';
    const whatifGrid = Act2.grid({
      cols: cols('Cost', '110px', 'Cost if served on frontier-mini'),
      rows: W.map(([m, n, c, lo, hi]) => [m, { html: int(n), cls: 'n' }, { html: $(c), cls: 'n' }, { html: range(lo, hi), cls: 'n' }, { html: change(lo, hi, c), cls: 'n' }, cmd]),
      total: ['Total', { html: int(sum((r) => r[1])), cls: 'n' }, { html: $(sum((r) => r[2])), cls: 'n' }, { html: range(sum((r) => r[3]), sum((r) => r[4])), cls: 'n' },
        { html: `${$(sum((r) => r[3]) - sum((r) => r[2]))} to ${$(sum((r) => r[4]) - sum((r) => r[2]))}`, cls: 'n' }, ''],
    });
    const pricesGrid = Act2.grid({
      cols: cols('Cost at the prices in force', '200px', 'Cost if priced at the proposed list'),
      rows: P.map(([m, n, a, b]) => [m, { html: int(n), cls: 'n' }, { html: $(a), cls: 'n' }, { html: $(b), cls: 'n' }, { html: $(b - a), cls: 'n' }, cmd]),
      total: ['Total', { html: int(P.reduce((s, r) => s + r[1], 0)), cls: 'n' }, { html: $(P.reduce((s, r) => s + r[2], 0)), cls: 'n' }, { html: $(P.reduce((s, r) => s + r[3], 0)), cls: 'n' }, { html: $(P.reduce((s, r) => s + r[3] - r[2], 0)), cls: 'n' }, ''],
    });

    this.r = M.mount(this.f.page, `<div class="pg" data-k="pgA">
      <div class="sec">
        <h3>Cost if served on another model</h3>
        <div class="ctl">${Act2.btn('<span class="mu">Price on</span><span data-k="target"></span><span class="ar">▼</span>', '', 'priceOn')}${Act2.btn('Preview a price list', '', 'prev')}</div>
      </div>
      <div class="panel" data-k="emptyP" style="top:46px"><span class="empty">No model is chosen.</span></div>
      <div class="res" data-k="res" style="top:46px">
        <p class="sum" data-k="sum">On frontier-mini, traffic across loan-origination for the seven days ended November 9, 2026 would have cost an estimated
          $340.00 to $390.00, compared with a cost of $1,185.23, a decrease of $795.23 to $845.23, or 67% to 71%, primarily due to
          frontier-large ($(664.40) to $(644.40)) and reasoner-pro ($(181.86) to $(168.86)), partially offset by support-slm-v1 ($1.03 to $18.03).</p>
        <div class="tools" data-k="tools"><span class="search">Search models</span>${Act2.btn('Download CSV')}</div>
        ${whatifGrid}
        <div class="notes" data-k="notes1"><sup>1</sup>Estimated<i>·</i><sup>2</sup>Catalog v3, USD<i>·</i><sup>3</sup>Usage not costed: 2,184 requests on gpt-oss-20b, which has no price</div>
      </div>
      <div class="menu" data-k="menu">${this.MODELS.map((m) => `<div class="it" data-k="it-${m}">${m}</div>`).join('')}</div>
      <div class="foot-links"><span>Costs</span><span>Prices</span><span>Use cases</span><span>Routing</span></div>
    </div>`);
    this.b = M.mount(this.f.page, `<div class="pg" data-k="pgB">
      <div class="ver"><span>Catalog version <b>3</b></span><span>In force from October 26, 2026</span></div>
      <div class="scrim"></div>
      <div class="dlg" data-k="dlg">
        <h2>Publish a catalog version</h2>
        <p class="desc">A version prices the served names its document lists from its effective instant on. A published version is never edited; a later version corrects it.
          The document is previewed against this period's traffic and checked first, and nothing is published until it passes.</p>
        <p class="sum" data-k="sumB">Under the proposed prices, traffic across loan-origination for the seven days ended November 9, 2026 would have cost an estimated
          $1,152.10, compared with $1,185.23 at the prices in force, a decrease of $33.13, or 2.8%, primarily due to frontier-large ($(33.13)).</p>
        <div class="tools" style="display:flex;justify-content:flex-end;gap:8px;margin:12px 0 8px"><span class="search">Search models</span>${Act2.btn('Download CSV')}</div>
        <div data-k="gridB">${pricesGrid}</div>
        <div class="notes"><sup>1</sup>Catalog v3, USD</div>
        <div class="foot" data-k="foot">${Act2.btn('Cancel')}${Act2.btn('Check')}${Act2.btn('Publish', 'primary')}</div>
      </div>
    </div>`);
    this.rowsA = [...this.r.res.querySelectorAll('.gr')].slice(1);
    this.rowsB = [...this.b.gridB.querySelectorAll('.gr')].slice(1);
    this.cur = M.cursor(this.world);
    this.spot = M.spotlight(this.world);
    this.question = Tok.question(root, { text: this.q });
    this.bandH1 = this.f.band.querySelector('h1');
    this.crumbEl = this.f.el.querySelector('.crumb');
    this.urlEl = this.f.el.querySelector('.url');
  },

  /** Stage rects of the mock's parts, measured once the fonts are in. */
  geo() {
    if (this.G) return this.G;
    /* measured with every rise transform between the element and the world cleared, whatever t it is first asked at */
    const R = (el) => {
      const saved = [];
      for (let n = el; n && n !== this.world; n = n.parentElement) {
        if (!n.style.transform.startsWith('translate')) continue;             /* the console's own scale stays */
        saved.push([n, n.style.transform]); n.style.transform = 'none';
      }
      const r = Mock.rectOf(this.world, el);
      saved.forEach(([n, v]) => (n.style.transform = v));
      return r;
    };
    const mid = (r) => [r[0] + r[2] / 2, r[1] + r[3] / 2];
    this.G = {
      sec: R(this.r.pgA), res: R(this.r.res), priceOn: mid(R(this.r.priceOn)), prev: mid(R(this.r.prev)),
      item: mid(R(this.r['it-frontier-mini'])), total: R(this.r.res.querySelector('[data-k="total"]')),
      dlg: R(this.b.dlg), rowsB: this.rowsB.map(R), foot: R(this.b.foot), sumB: R(this.b.sumB),
    };
    /* the buttons alone, clear of the caption's corner, for the spotlight */
    const b0 = R(this.b.foot.firstElementChild), b1 = R(this.b.foot.lastElementChild);
    this.G.buttons = [b0[0], b0[1], b1[0] + b1[2] - b0[0], b0[3]];
    return this.G;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), G = this.geo();
    this.question.at(t);
    M.rise(this.f.el, t, 2.5, { dy: 18 });
    M.fade(this.chip, t, 2.8, 0.6);

    const T_OPEN = 3.8, T_PICK = 5.0, T_PREV = Math.max(K.list + 0.4, T_PICK + 3.0);
    const tB = T_PREV + 0.15;
    const onB = t >= tB;

    /* Savings: the menu, then the result */
    const menu = M.ramp(t, T_OPEN + 0.05, T_PICK + 0.2, 0.2, 0.15);
    M.set(this.r.menu, { opacity: menu.toFixed(3), transform: `translateY(${((1 - menu) * -6).toFixed(1)}px)` });
    this.r['it-frontier-mini'].classList.toggle('hot', t >= T_PICK - 0.35 && t < T_PICK + 0.2);
    const picked = t >= T_PICK + 0.2;
    const target = picked ? 'frontier-mini' : '';
    if (this.r.target.textContent !== target) this.r.target.textContent = target;
    this.r.emptyP.style.opacity = (1 - M.prog(t, T_PICK + 0.2, 0.3)).toFixed(3);
    M.rise(this.r.sum, t, T_PICK + 0.3, { dy: 10 });
    M.rise(this.r.tools, t, T_PICK + 0.4, { dy: 10 });
    [...this.r.res.querySelectorAll('.gr')].forEach((el, i) => M.rise(el, t, T_PICK + 0.45 + i * 0.09, { dy: 8 }));
    M.rise(this.r.notes1, t, T_PICK + 1.2, { dy: 6 });

    /* the switch to Prices */
    const pb = M.prog(t, tB, 0.4);
    this.r.pgA.style.opacity = (1 - pb).toFixed(3);
    this.b.pgB.style.opacity = pb.toFixed(3);
    M.rise(this.b.dlg, t, tB + 0.1, { dy: 14 });
    this.rowsB.forEach((el, i) => M.rise(el, t, tB + 0.7 + i * 0.09, { dy: 8 }));
    const title = onB ? 'Prices' : 'Savings';
    if (this.bandH1.textContent !== title) {
      this.bandH1.textContent = title;
      this.crumbEl.innerHTML = `Optimize <b>›</b> Cost <b>›</b> ${title}`;
      this.urlEl.textContent = onB ? 'localhost:9889/cost/prices#publish' : 'localhost:9889/cost/savings';
    }

    /* the camera, the cursor and the spotlight */
    const pad = (r, p) => [r[0] - p, r[1] - p, r[2] + 2 * p, r[3] + 2 * p];
    M.camera(this.world, t, [
      { t: 3.0, rect: [G.sec[0], G.sec[1], G.sec[2], 300] },
      { t: T_PICK + 0.3, rect: pad([G.res[0], G.res[1], G.res[2], G.total[1] + G.total[3] - G.res[1]], 8) },
      { t: tB + 0.2, rect: [G.dlg[0], G.sumB[1] - 10, G.dlg[2], G.foot[1] + G.foot[3] - G.sumB[1] + 16] },
      /* the buttons come up out of the caption's corner before they are spoken of */
      { t: K.before - 0.4, rect: [G.dlg[0], G.rowsB[0][1] - 40, G.dlg[2], G.foot[1] + G.foot[3] - G.rowsB[0][1] + 56] },
    ]);
    this.cur.at(t, [
      { t: 3.1, x: G.priceOn[0] + 120, y: G.priceOn[1] + 140 },
      { t: T_OPEN, x: G.priceOn[0], y: G.priceOn[1], click: true },
      { t: T_PICK, x: G.item[0], y: G.item[1], click: true },
      { t: T_PICK + 0.9, x: G.item[0] + 40, y: G.item[1] + 180 },
      { t: T_PREV, x: G.prev[0], y: G.prev[1], click: true },
      { t: T_PREV + 0.9, x: G.prev[0] + 160, y: G.prev[1] + 260, hide: true },
    ]);
    const rowSpot = (i) => { const r = G.rowsB[i]; return [r[0] + r[2] - 360, r[1], 250, r[3]]; };
    this.spot.at(t, [
      { t: K.real, rect: pad(G.total, 2) },
      { t: K.real + 2.2, rect: null },
      { t: K.model, rect: rowSpot(0) },
      { t: K.model + 0.45, rect: rowSpot(1) },
      { t: K.model + 0.9, rect: rowSpot(2) },
      { t: K.model + 1.35, rect: rowSpot(3) },
      { t: K.model + 1.8, rect: rowSpot(4) },
      { t: K.before, rect: pad(G.buttons, 8) },
      { t: K.before + 2.6, rect: null },
    ]);
  },
});
