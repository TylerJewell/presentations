/* Act1: the Cost views of Act 1 drawn in the console's own look, with the canon figures of sample-figures.md
   and captures/figures.json. Each view is built once into a console frame's page; the scenes move the camera,
   cursor and spotlight over it and set the few things that change (count-ups, glows, the address).
     Act1.frame(root, { view, url, range })   The console frame in a camera world, with the Cost sub-navigation,
                                              the view's title band and the period at the right. Returns
                                              { world, f, page, frameEl, urlEl, chipEl, cur, spot, url(text), rect(el) }.
     Act1.overview(page)                      Cost › Overview: the four cards, Needs attention, Questions.
     Act1.costs(page, 'useCase' | 'matrix' | 'compare')   Cost › Costs in one setup: the analysis bar, the chart
                                              and the grid. Returns the elements the scenes point at.
     Act1.URL                                 The page addresses.
     Act1.ROWS, Act1.MATRIX                   The figures. */
window.Act1 = (function () {
  const M = Mock;
  const RECT = [160, 100, 1600, 944];
  const SCALE = 1.1;                       /* the console's logical size inside the frame */
  const PAGE_W = Math.round(RECT[2] / SCALE - 244); /* the page's width: the frame less the nav and the main padding */
  const SUB = ['Overview', 'Costs', 'Savings', 'Budgets', 'Prices'];
  const money = (v, d = 2) => Tok.money(v, d);
  const pct = (v, d = 1) => (v < 0 ? `(${Math.abs(v).toFixed(d)})%` : `${v.toFixed(d)}%`);

  const URL = {
    overview: 'localhost:9889/cost/overview',
    useCase: 'localhost:9889/cost/spend?measures=cost,requests,costPerRequest,shareOfTotal&chart=cost&by=useCase',
    matrix: 'localhost:9889/cost/spend?measures=cost&chart=cost&by=model&then=tag:team',
    compare: 'localhost:9889/cost/spend?measures=cost&chart=cost&by=useCase&compare=prior',
  };

  /* Cost by use case, the week ended November 9: [label, prior, current, requests, per request]; prior null = no traffic */
  const ROWS = [
    ['contract-review', 354.18, 337.46, 1310, 0.2576],
    ['refund-request', 176.81, 225.06, 9828, 0.0229],
    ['chargeback-dispute', 149.08, 154.97, 860, 0.1802],
    ['bi-copilot', 113.07, 119.54, 3049, 0.0392],
    ['sql-report', 77.73, 79.73, 2120, 0.0376],
    ['order-status', 11.62, 11.86, 14825, 0.0008],
    ['ticket-triage', 3.94, 11.48, 5218, 0.0022],
    ['An unlabelled use case (c2fa0b58)', null, 7.22, 639, 0.0113],
    ['shipping-delay', 4.52, 4.30, 3308, 0.0013],
    ['password-reset', 1.59, 1.65, 8250, 0.0002],
    ['No use case', 187.99, 231.96, 33137, 0.0070],
  ];
  const TOTAL = { prior: 1080.53, current: 1185.23, requests: 82544, per: 0.0144 };
  const NOT_COSTED = { model: 'gpt-oss-20b', requests: 2184 };
  const TEAMS = ['legal', 'data', 'engineering', 'support', 'Untagged'];
  const MATRIX = [
    ['frontier-large', [337.46, 119.54, 96.20, 186.83, 72.37], 812.40],
    ['reasoner-pro', [null, 154.97, 21.40, 30.12, 8.37], 214.86],
    ['frontier-mini', [null, null, 4.30, 99.86, 14.36], 118.52],
    ['support-slm-v1', [null, null, null, 36.21, 3.24], 39.45],
  ];
  const MATRIX_COLS = [337.46, 274.51, 121.90, 353.02, 98.34];

  function css() {
    M.style('a1', `
      .a1 .mk-console .left .it.sub { margin-left: 18px; padding: 5px 10px; font-size: 13px; }
      .a1 .mk-console .band .rng { color: var(--c-muted); font-size: 13px; white-space: nowrap; }
      .a1 .mk-browser .url { --g: 0; box-shadow: 0 0 0 calc(var(--g) * 1.5px) var(--yellow), 0 0 calc(var(--g) * 18px) rgba(255, 206, 74, calc(var(--g) * .6));
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-faint)); }
      .a1 .view { position: absolute; left: 0; top: 0; right: 0; }
      .a1 .cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
      .a1 .card { --g: 0; position: relative; height: 92px; padding: 12px 16px; border-radius: 12px; background: var(--c-surface);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 70%), var(--c-line)), 0 0 calc(var(--g) * 26px) rgba(255, 206, 74, calc(var(--g) * .35)); }
      .a1 .card .k { font-size: 12.5px; color: var(--c-muted); white-space: nowrap; }
      .a1 .card .v { margin-top: 6px; font: 600 28px/1 var(--sans); letter-spacing: -.02em; font-variant-numeric: tabular-nums; white-space: nowrap; transform-origin: 0 50%; }
      .a1 .card .n { margin-top: 8px; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--c-muted); white-space: nowrap; }
      .a1 .chip { display: inline-flex; align-items: center; gap: 6px; height: 20px; padding: 0 8px; border-radius: 999px; font-size: 11.5px; font-weight: 500; white-space: nowrap; }
      .a1 .chip::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
      .a1 .chip.bad { background: rgba(255, 84, 0, .16); color: #ff7a3d; }
      .a1 .chip.warn { background: var(--c-amber-bg); color: var(--c-amber); }
      .a1 .chip.gold { background: var(--c-gold-bg); color: var(--c-gold-text); }
      .a1 .chip.info { background: var(--c-blue-bg); color: var(--c-blue); }
      .a1 .sec { margin-top: 16px; }
      .a1 .sh { display: flex; align-items: center; gap: 12px; height: 24px; margin-bottom: 8px; }
      .a1 .sh h3 { margin: 0; font-size: 15px; font-weight: 600; }
      .a1 .fchips { margin-left: auto; display: flex; gap: 6px; }
      .a1 .fc { height: 22px; padding: 0 9px; border-radius: 999px; font-size: 12px; color: var(--c-muted); box-shadow: inset 0 0 0 1px var(--c-line); display: inline-flex; align-items: center; gap: 5px; }
      .a1 .fc b { color: var(--c-text); font-weight: 600; }
      .a1 .fc.on { background: var(--c-surface-2); color: var(--c-text); }
      .a1 .grid { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; overflow: hidden; }
      .a1 .gr { display: grid; align-items: center; height: 21px; padding: 0 12px; border-bottom: 1px solid var(--c-line); font-size: 12.5px; white-space: nowrap; font-variant-numeric: tabular-nums; }
      .a1 .gr.h { height: 24px; color: var(--c-muted); font-size: 11.5px; }
      .a1 .gr.g { height: 20px; color: var(--c-faint); font-size: 11px; border-bottom: 0; }
      .a1 .gr.t { font-weight: 600; background: var(--c-surface-2); }
      .a1 .gr.t.none { font-weight: 400; color: var(--c-muted); background: transparent; }
      .a1 .gr:last-child { border-bottom: 0; }
      .a1 .gr .r { text-align: right; font-family: var(--mono); font-size: 12px; }
      .a1 .gr .c { text-align: center; }
      .a1 .gr .lnk { color: var(--c-blue); text-align: right; }
      .a1 .gr .hl { --g: 0; display: inline-block; padding: 1px 5px; margin-right: -5px; border-radius: 5px; transform-origin: 100% 50%; transform: scale(calc(1 + var(--g) * .35)); background: var(--c-surface-2);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); box-shadow: inset 0 0 0 calc(var(--g) * 1.5px) var(--yellow); }
      .a1 .att .gr { grid-template-columns: 136px minmax(0, 1fr) 56px 96px; gap: 14px; height: 42px; }
      .a1 .att .gr.h { height: 26px; }
      .a1 .att .gr .w b { display: block; font-weight: 500; font-size: 12.5px; }
      .a1 .att .gr .w small { display: block; color: var(--c-muted); font-size: 11.5px; margin-top: 1px; }
      .a1 .qs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      .a1 .q { --g: 0; height: 58px; padding: 10px 14px; border-radius: 12px; background: var(--c-surface);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 70%), var(--c-line)); }
      .a1 .q b { display: block; font-weight: 500; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .a1 .q span { display: block; margin-top: 4px; color: var(--c-muted); font-size: 12px; white-space: nowrap; }
      .a1 .fn { margin-top: 4px; height: 16px; color: var(--c-faint); font-size: 11.5px; white-space: nowrap; }
      .a1 .fn sup { font-size: 9px; }
      .a1 .bar { display: flex; align-items: center; flex-wrap: nowrap; gap: 14px; height: 26px; font-size: 12.5px; color: var(--c-muted); white-space: nowrap; }
      .a1 .bar .fld { display: inline-flex; align-items: center; gap: 6px; }
      .a1 .bar .ms { display: inline-flex; align-items: center; gap: 10px; }
      .a1 .bar label { display: inline-flex; align-items: center; gap: 5px; color: var(--c-text); }
      .a1 .bar .cb { width: 13px; height: 13px; border-radius: 3px; box-shadow: inset 0 0 0 1px var(--c-faint); display: inline-block; position: relative; }
      .a1 .bar .cb.on { background: var(--c-gold); box-shadow: none; }
      .a1 .bar .cb.on::after { content: ''; position: absolute; left: 4px; top: 1px; width: 3px; height: 7px; border: solid #15130b; border-width: 0 2px 2px 0; transform: rotate(45deg); }
      .a1 .bar .sel { --g: 0; height: 24px; padding: 0 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 8px; color: var(--c-text);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 80%), var(--c-line)); }
      .a1 .bar .sel::after { content: ''; width: 5px; height: 5px; border: solid var(--c-muted); border-width: 0 1.5px 1.5px 0; transform: rotate(45deg) translateY(-2px); }
      .a1 .bar .sel.off { color: var(--c-faint); }
      .a1 .ch { margin-top: 6px; }
      .a1 .ch .sh { height: 20px; margin-bottom: 4px; }
      .a1 .ch + .sec { margin-top: 10px; }
      .a1 .sec .sh.tt { height: 22px; margin-bottom: 6px; }
      .a1 .ch svg { display: block; overflow: visible; }
      .a1 .ch svg text { fill: var(--c-faint); font: 10.5px var(--sans); }
      .a1 .ch svg .ax { stroke: var(--c-line); }
      .a1 .ch svg .b { fill: var(--c-gold); opacity: .85; }
      .a1 .ch svg .b.p { fill: var(--c-faint); opacity: .7; }
      .a1 .ch .lg { display: flex; gap: 14px; font-size: 11.5px; color: var(--c-muted); margin-left: auto; }
      .a1 .ch .lg i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 5px; vertical-align: -1px; background: var(--c-gold); }
      .a1 .ch .lg i.p { background: var(--c-faint); }
    `);
  }

  function frame(root, { view, url, range }) {
    css();
    root.classList.add('a1');
    const world = M.world(root);
    const f = M.consoleFrame(world, { crumb: 'Optimize › Cost › ' + view, active: 'Cost', title: view, url, rect: RECT, scale: SCALE });
    const cost = [...f.el.querySelectorAll('.left .it')].find((e) => e.textContent === 'Cost');
    SUB.slice().reverse().forEach((n) => cost.insertAdjacentHTML('afterend', `<div class="it sub${n === view ? ' on' : ''}">${n}</div>`));
    M.mount(f.bandRight, `<span class="rng">${range}</span>`);
    const urlEl = f.el.querySelector('.chrome .url');
    const chipEl = M.mount(root, `<div class="tk-chiptop">${Tok.chip('sample')}</div>`).root;
    const cur = M.cursor(world), spot = M.spotlight(world);
    return {
      world, f, page: f.page, frameEl: f.el, urlEl, chipEl, cur, spot,
      url(text) { if (urlEl.textContent !== text) urlEl.textContent = text; },
      /** An element's rect in stage px, measured once the frame has settled. */
      rect(el) { return M.rectOf(world, el); },
    };
  }

  /* ---------- Cost › Overview ---------- */
  const ATTENTION = [
    ['bad', 'Projected over', 'Support team is projected at $2,950 against its $2,600 budget', 'Cost to date $840, plan to date $780, $60 over · runs out about November 26', 'Nov 8'],
    ['bad', 'Projected over', 'ticket-triage is projected over its $1,100 budget', 'Served by frontier-large more often since Nov 5', 'Nov 5'],
    ['warn', 'At risk', 'contract-analyst is at risk against its $900 budget', 'The forecast range reaches the budget before period end', 'Nov 7'],
  ];
  const QUESTIONS = [
    ['What did we spend each day?', 'Production costs by day'],
    ['Where did the money go?', 'Costs by use case'],
    ['What changed since the last period, and why?', 'Costs compared with the prior period'],
    ['Which models and teams cost the most per request?', 'Cost per request by model and team'],
    ['What can we save, and what have we saved?', 'Savings'],
    ['What would it cost on another model or price list?', 'Savings, cost if served on another model'],
  ];
  function overview(page) {
    const r = M.mount(page, `<div class="view">
      <div class="cards" data-k="cards">
        <div class="card" data-k="c0"><div class="k">Cost to date</div><div class="v" data-k="v0">$1,524</div><div class="n">November 1 to 9</div></div>
        <div class="card" data-k="c1"><div class="k">Projected cost at period end</div><div class="v" data-k="v1">$5,080</div><div class="n"><span class="chip bad">Projected over</span>Budget $5,000</div></div>
        <div class="card" data-k="c2"><div class="k">Realized savings</div><div class="v" data-k="v2">$1,006</div><div class="n">Measured after each change</div></div>
        <div class="card" data-k="c3"><div class="k">Potential savings</div><div class="v" data-k="v3">$77.40</div><div class="n">3 opportunities</div></div>
      </div>
      <div class="sec" data-k="att">
        <div class="sh"><h3>Needs attention</h3><span class="fchips"><span class="fc on"><b>3</b> All</span><span class="fc"><b>2</b> Projected over</span><span class="fc"><b>1</b> At risk</span></span></div>
        <div class="grid att">
          <div class="gr h"><span>Severity</span><span>What needs attention</span><span>Since</span><span></span></div>
          ${ATTENTION.map(([tone, word, what, why, since]) => `<div class="gr"><span><span class="chip ${tone}">${word}</span></span><span class="w"><b>${what}</b><small>${why}</small></span><span>${since}</span><span class="lnk">Budgets →</span></div>`).join('')}
        </div>
      </div>
      <div class="sec" data-k="qs">
        <div class="sh"><h3>Questions</h3></div>
        <div class="qs">${QUESTIONS.map(([q, o], i) => `<div class="q" data-k="q${i}"><b>${q}</b><span>${o}</span></div>`).join('')}</div>
      </div>
    </div>`);
    return { root: r.root, cards: [r.c0, r.c1, r.c2, r.c3], vals: [r.v0, r.v1, r.v2, r.v3], att: r.att, qs: r.qs, q1: r.q1 };
  }

  /* ---------- Cost › Costs ---------- */
  const MEASURES = ['Cost', 'Tokens', 'Requests', 'Cost per request', 'Share of total'];
  function bar(setup) {
    const on = (name) => (setup.measures.includes(name) ? ' on' : '');
    return `<div class="bar" data-k="bar">
      <span class="fld ms"><span>Measure</span>${MEASURES.map((m) => `<label><i class="cb${on(m)}"></i>${m}</label>`).join('')}</span>
      <span class="fld">Chart <span class="sel">Cost</span></span>
      <span class="fld">Group by <span class="sel" data-k="by">${setup.by}</span></span>
      <span class="fld">Then by <span class="sel${setup.compare ? ' off' : ''}" data-k="then">${setup.then}</span></span>
      <label><i class="cb${setup.compare ? ' on' : ''}" data-k="cmp"></i>Compare to prior period</label>
      <span class="fld">Filter <span class="sel">None</span></span>
    </div>`;
  }
  /** A bar chart of one measure: [{ label, a, b? }], b drawn beside a when given. */
  function chart(title, items, legend) {
    const W = PAGE_W, H = 70, PAD = 6, top = 6, base = H - 16;
    const max = Math.max(...items.flatMap((d) => [d.a, d.b || 0]));
    const cw = (W - PAD * 2) / items.length, bw = Math.min(legend ? 26 : 44, cw * (legend ? 0.3 : 0.5));
    const bars = items.map((d, i) => {
      const x0 = PAD + i * cw + cw / 2;
      const h = (v) => Math.max(1.5, ((base - top) * v) / max);
      const a = legend ? `<rect class="b p" x="${(x0 - bw - 2).toFixed(1)}" y="${(base - h(d.a)).toFixed(1)}" width="${bw}" height="${h(d.a).toFixed(1)}" rx="2"/>` +
          `<rect class="b" x="${(x0 + 2).toFixed(1)}" y="${(base - h(d.b)).toFixed(1)}" width="${bw}" height="${h(d.b).toFixed(1)}" rx="2"/>`
        : `<rect class="b" x="${(x0 - bw / 2).toFixed(1)}" y="${(base - h(d.a)).toFixed(1)}" width="${bw}" height="${h(d.a).toFixed(1)}" rx="2"/>`;
      const lbl = d.label.length > 16 ? d.label.slice(0, 15) + '…' : d.label;
      return a + `<text x="${x0.toFixed(1)}" y="${H - 4}" text-anchor="middle">${lbl}</text>`;
    }).join('');
    return `<div class="ch"><div class="sh"><h3>${title}</h3>${legend ? `<span class="lg"><span><i class="p"></i>Prior period</span><span><i></i>Current period</span></span>` : ''}</div>
      <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><line class="ax" x1="0" x2="${W}" y1="${base}" y2="${base}"/>${bars}</svg></div>`;
  }
  const row = (cells, cls = '') => `<div class="gr${cls ? ' ' + cls : ''}">${cells.join('')}</div>`;
  const int = (n) => n.toLocaleString('en-US');

  function costs(page, kind) {
    let html;
    if (kind === 'useCase') {
      const sorted = ROWS.slice().sort((a, b) => b[2] - a[2]);
      html = bar({ measures: ['Cost', 'Requests', 'Cost per request', 'Share of total'], by: 'Use case', then: 'None' }) +
        chart('Cost', sorted.slice(0, 10).map(([l, , c]) => ({ label: l, a: c }))) +
        `<div class="sec"><div class="sh tt"><h3>Cost by use case</h3></div><div class="grid" style="--cols: minmax(0, 1fr) 120px 120px 150px 130px">
          ${row(['<span>Use case</span>', '<span class="r">Cost</span>', '<span class="r">Requests</span>', '<span class="r">Cost per request</span>', '<span class="r">Share of total</span>'], 'h')}
          ${sorted.map(([l, , c, n, per]) => row([`<span>${l}</span>`, `<span class="r">${money(c)}</span>`, `<span class="r">${int(n)}</span>`, `<span class="r">${money(per, 4)}</span>`, `<span class="r">${pct((100 * c) / TOTAL.current)}</span>`])).join('')}
          ${row(['<span>Total</span>', `<span class="r">${money(TOTAL.current)}</span>`, `<span class="r">${int(TOTAL.requests)}</span>`, `<span class="r">${money(TOTAL.per, 4)}</span>`, '<span class="r">100.0%</span>'], 't')}
          ${row(['<span data-k="nc">Usage not costed<sup>1</sup></span>', '<span class="r">—</span>', `<span class="r">${int(NOT_COSTED.requests)}</span>`, '<span class="r">—</span>', '<span class="r">—</span>'], 't none')}
        </div><div class="fn" data-k="fn"><sup>1</sup>Usage not costed: ${int(NOT_COSTED.requests)} requests on ${NOT_COSTED.model}, which has no price in catalog v3 &nbsp;·&nbsp; Catalog v3, USD &nbsp;·&nbsp; Source</div></div>`;
    } else if (kind === 'matrix') {
      html = bar({ measures: ['Cost'], by: 'Model', then: 'Team' }) +
        chart('Cost', MATRIX.map(([l, , t]) => ({ label: l, a: t }))) +
        `<div class="sec"><div class="sh tt"><h3>Cost by model and team</h3></div><div class="grid" style="--cols: minmax(0, 1fr) repeat(6, 118px)">
          ${row(['<span>Model</span>', ...TEAMS.map((t) => `<span class="r">${t}</span>`), '<span class="r">Total</span>'], 'h')}
          ${MATRIX.map(([l, cells, t]) => row([`<span>${l}</span>`, ...cells.map((c) => `<span class="r">${c == null ? '—' : money(c)}</span>`), `<span class="r">${money(t)}</span>`])).join('')}
          ${row(['<span>Total</span>', ...MATRIX_COLS.map((c) => `<span class="r">${money(c)}</span>`), `<span class="r">${money(TOTAL.current)}</span>`], 't')}
          ${row([`<span data-k="nc">Usage not costed<sup>1</sup> · ${NOT_COSTED.model}</span>`, ...TEAMS.map(() => '<span class="r">—</span>'), '<span class="r">—</span>'], 't none')}
        </div><div class="fn" data-k="fn"><sup>1</sup>Usage not costed: ${int(NOT_COSTED.requests)} requests on ${NOT_COSTED.model}, which has no price in catalog v3 &nbsp;·&nbsp; Catalog v3, USD &nbsp;·&nbsp; Source</div></div>`;
    } else {
      const sorted = ROWS.slice().sort((a, b) => b[2] - a[2]);
      const chg = (p, c) => (p == null ? ['—', 'n/m'] : [money(c - p), pct((100 * (c - p)) / p)]);
      html = bar({ measures: ['Cost'], by: 'Use case', then: 'None', compare: true }) +
        chart('Cost', sorted.slice(0, 10).map(([l, p, c]) => ({ label: l, a: p || 0, b: c })), true) +
        `<div class="sec"><div class="sh tt"><h3>Cost by use case, compared with the prior period</h3></div><div class="grid" style="--cols: minmax(0, 1fr) 130px 130px 130px 110px">
          ${row(['<span></span>', '<span class="c" style="grid-column: 2 / span 4">Cost</span>'], 'g')}
          ${row(['<span>Use case</span>', '<span class="r">Prior period</span>', '<span class="r">Current period</span>', '<span class="r">Change</span>', '<span class="r">% Change<sup>1</sup></span>'], 'h')}
          ${sorted.map(([l, p, c]) => { const [d, q] = chg(p, c); return row([`<span>${l}</span>`, `<span class="r">${p == null ? '—' : money(p)}</span>`, `<span class="r">${money(c)}</span>`, `<span class="r">${d}</span>`, `<span class="r">${q}</span>`]); }).join('')}
          ${row(['<span>Total</span>', `<span class="r">${money(TOTAL.prior)}</span>`, `<span class="r">${money(TOTAL.current)}</span>`, `<span class="r"><span class="hl" data-k="chg">${money(TOTAL.current - TOTAL.prior)}</span></span>`, `<span class="r">${pct((100 * (TOTAL.current - TOTAL.prior)) / TOTAL.prior)}</span>`], 't')}
        </div><div class="fn"><sup>1</sup>n/m &nbsp;·&nbsp; Catalog v3, USD &nbsp;·&nbsp; Source</div></div>`;
    }
    const r = M.mount(page, `<div class="view">${html}</div>`);
    r.root.querySelectorAll('.grid').forEach((g) => g.querySelectorAll('.gr').forEach((row) => { row.style.gridTemplateColumns = g.style.getPropertyValue('--cols'); }));
    r.total = r.root.querySelector('.gr.t');
    return r;
  }

  return { RECT, URL, ROWS, TOTAL, MATRIX, NOT_COSTED, frame, overview, costs, money };
})();
