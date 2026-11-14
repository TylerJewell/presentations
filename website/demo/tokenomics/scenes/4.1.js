/* Scene 4.1: budgets. The question, then Cost › Budgets drawn in the console's look: the four figures and the
   budgets table, whose Owner column lights as the owner is named. The cursor opens the Support team budget: its
   cards count up (plan to date, the projected cost with its range, the day it runs out) and the burn-and-forecast
   chart draws; the camera pushes into the chart so the run-out marker pops as the money is said to run out. The
   page then scrolls to "Thresholds and actions", where notify, reroute and block each light on their word, with
   the purple chip on every action the demo applies. All figures are the canon of sample-figures.md (a mock, not a
   capture: the captured budgets.png and budget-page.png are at another scale). */
Tok.register({
  id: '4.1',

  RECT: [160, 100, 1600, 944],
  /* the Support team budget for November 2026, day 9 of 30 */
  B: { amount: 2600, cost: 840, plan: 780, proj: 2950, lo: 2770, hi: 3160, thresholds: [0.8, 1.0, 1.1] },
  DAILY: [60, 95, 101, 108, 99, 92, 55, 88, 142],                 /* cost by day, Nov 1 to 9: adds to $840 */

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = {
      owner: at('owner'), plan: at('plan'), forecast: at('forecast'), range: at('range'), names: at('names'), runs: at('runs'),
      sets: at('sets'), thresholds: at('thresholds'), advance: at('advance'), notify: at('notify'), reroute: at('reroute'), block: at('block'),
    };
  },

  render(root) {
    const M = Mock, A4 = Act4;
    root.classList.add('t41', 'a4');
    A4.css();
    M.style('t41', `
      .t41 .ttl { display: flex; align-items: center; gap: 12px; margin: 2px 0 14px; font: 500 24px/1.1 var(--sans); letter-spacing: -.015em; }
      .t41 .ttl .ic { width: 26px; height: 20px; border-radius: 5px; box-shadow: inset 0 0 0 1.5px var(--c-muted); }
      .t41 .mk-console .band h1 { font-size: 20px; }
    `);
    M.dotGrid(root);
    this.world = M.world(root);
    const m0 = (v) => Tok.money(v, 0);

    /* ---- Cost › Budgets: the list ---- */
    this.A = M.consoleFrame(this.world, { crumb: 'Optimize › Cost › Budgets', active: 'Cost', title: 'Cost › Budgets', url: 'localhost:9889/cost/budgets?period=2026-11', rect: this.RECT });
    M.mount(this.A.bandRight, `<span class="a4-btn y">New budget…</span><span class="a4-btn">November 2026</span>`);
    const rows = [
      ['All traffic', 'D. Okafor', 1524, 5000, 1500, 5080, '$4,860 to $5,330', ['Projected over', 'bad']],
      ['Support team', 'M. Ortiz', 840, 2600, 780, 2950, '$2,770 to $3,160', ['Projected over', 'bad']],
      ['ticket-triage', 'A. Lindqvist', 402, 1100, 330, 1290, '$1,210 to $1,380', ['Projected over', 'bad']],
      ['contract-analyst', 'R. Chen', 286, 900, 270, 880, '$830 to $940', ['At risk', 'warn']],
      ['sql-report', 'S. Patel', 108, 400, 120, 360, '$340 to $385', ['Within budget', 'ok']],
    ];
    const variance = (cost, plan) => { const p = ((cost - plan) / plan) * 100; return `${Math.abs(p).toFixed(1)}% ${p < 0 ? 'behind' : 'ahead of'} plan`; };
    const list = M.mount(this.A.page, `<div>
      <div class="a4-tiles">
        ${A4.tile({ k: 'Cost to date', v: '$1,524', sub: ['Of $5,000; day 9 of 30 in November 2026'] })}
        ${A4.tile({ k: 'Projected cost at period end¹', v: '$5,080', sub: ['80% range $4,860 to $5,330'] })}
        ${A4.tile({ k: 'Budgets at risk', v: '4', sub: ['Of 5 budgets: 3 projected over, 1 at risk'] })}
        ${A4.tile({ k: 'Actions armed', v: '2', sub: ['On 1 budget'] })}
      </div>
      <div class="a4-note">¹Estimated</div>
      <div class="a4-h">Budgets for November 2026 <span class="f">Kept in <b>portfolio</b></span></div>
      ${A4.grid({
        cols: [{ h: 'Budget', w: '135px' }, { h: 'Owner', w: '100px' }, { h: 'Cost to date', w: '90px', r: 1 }, { h: 'Amount', w: '80px', r: 1 }, { h: 'Used', w: '130px' },
          { h: 'Variance to plan', w: '140px', r: 1 }, { h: 'Projected cost¹', w: '120px', r: 1 }, { h: 'Projected range', w: '120px', r: 1 }, { h: 'Status', w: '1fr' }],
        rows: rows.map(([name, owner, cost, amt, plan, proj, range, st]) =>
          [`<b>${name}</b>`, owner, m0(cost), m0(amt), A4.bar((cost / amt) * 100), variance(cost, plan), m0(proj), range, A4.chip(st[0], st[1])]),
      })}
    </div>`).root;
    this.ownerCells = [...list.querySelectorAll('.a4-r')].map((r) => r.children[1]);
    this.supportRow = list.querySelectorAll('.a4-r')[2];

    /* ---- the Support team budget's page ---- */
    const B = this.B;
    this.P = M.consoleFrame(this.world, { crumb: 'Optimize › Cost › Budgets', active: 'Cost', band: false, url: 'localhost:9889/cost/budgets/support-team', rect: this.RECT });
    this.P.el.style.opacity = 0;
    const thr = [
      ['Notify the owner', 'Parked', 'default', 'The attention row on Now and Cost is the notice'],
      ['Reroute to the smaller model', 'Armed', 'warn', 'Possible overrun after the crossing: about $100'],
      ['Block new requests', 'Armed', 'warn', 'Possible overrun after the crossing: about $100'],
    ];
    const pg = M.mount(this.P.page, `<div class="a4-page" data-k="pg">
      <div class="a4-crumb">← Budgets</div>
      <div class="ttl"><span class="ic"></span>Support team<span class="a4-btn">Edit…</span></div>
      <div class="a4-tiles" data-k="tiles">
        ${A4.tile({ k: 'Cost to date', v: '', sub: ['32.3% of budget used'] })}
        ${A4.tile({ k: 'Variance to plan', v: '', sub: ['7.7% ahead of plan', 'Plan to date $780'] })}
        ${A4.tile({ k: 'Projected cost at period end¹', v: '', sub: ['$2,770 to $3,160', 'Current rate $101 a day'] })}
        ${A4.tile({ k: 'Runs out', v: 'November 26', sub: ['November 25 to November 28', 'Daily allowance $84'] })}
      </div>
      <div class="a4-note">¹Estimated</div>
      <div class="a4-h">Cost and projection<span class="f">Scope <b>tag:team = support</b></span><span class="f">Owner <b>M. Ortiz</b></span><span class="f">Through <b>November 9, 2026</b></span></div>
      <div class="a4-chart" data-k="chart"></div>
      <div class="a4-h">Thresholds and actions</div>
      <div data-k="thr">${A4.grid({
        cols: [{ h: 'Threshold', w: '130px' }, { h: 'Action', w: '400px' }, { h: 'State', w: '110px' }, { h: 'Effect', w: '1fr' }],
        rows: thr.map(([text, state, tone, effect], i) => [`${Math.round(B.thresholds[i] * 100)}% · ${m0(B.amount * B.thresholds[i])}`, `${text}<span class="a4-demo" data-demo>Applied by the demo</span>`, A4.chip(state, tone), effect]),
      })}</div>
    </div>`);
    this.pg = pg.pg; this.tilesEl = pg.tiles; this.chartEl = pg.chart; this.thrEl = pg.thr;
    this.tiles = [...pg.tiles.children];
    this.tileVals = this.tiles.map((el) => el.querySelector('.v'));
    this.thrRows = [...pg.thr.querySelectorAll('.a4-r')].slice(1);
    this.demos = [...pg.thr.querySelectorAll('[data-demo]')];
    this.chart(pg.chart);

    this.cur = M.cursor(this.world);
    this.chipEl = M.mount(root, `<div class="tk-chiptop">${Tok.chip('sample')}</div>`).root;
    this.question = Tok.question(root, { text: this.q });
  },

  /** The cumulative chart in logical px: actual, plan, the projection with its 80% range, the budget and its thresholds, and the run-out. */
  chart(el) {
    const M = Mock, B = this.B;
    const W = 1057, H = 262, L = 52, R = W - 96, T = 18, BOT = H - 34, DAYS = 30, TOP = 3200;
    const x = (d) => L + ((R - L) * d) / DAYS, y = (v) => BOT - ((BOT - T) * v) / TOP;
    let acc = 0;
    const actual = [[0, 0], ...this.DAILY.map((v, i) => [i + 1, (acc += v)])];
    const line = (pts) => pts.map(([d, v], i) => `${i ? 'L' : 'M'}${x(d).toFixed(1)} ${y(v).toFixed(1)}`).join('');
    const rate = (B.proj - B.cost) / (DAYS - 9), cross = 9 + (B.amount - B.cost) / rate;
    const crossLo = 9 + (B.amount - B.cost) / ((B.lo - B.cost) / (DAYS - 9)), crossHi = 9 + (B.amount - B.cost) / ((B.hi - B.cost) / (DAYS - 9));
    const fmtK = (v) => (v >= 1000 ? `$${(v / 1000).toFixed(1).replace(/\.0$/, '')}K` : `$${v}`);
    const svg = M.html(`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      ${[0, 800, 1600, 2400, 3200].map((v) => `<line class="ax" x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${fmtK(v)}</text>`).join('')}
      ${[1, 8, 15, 22, 29].map((d) => `<text x="${x(d)}" y="${H - 8}" text-anchor="middle">Nov ${d}</text>`).join('')}
      <line class="now" x1="${x(9)}" x2="${x(9)}" y1="${T}" y2="${BOT}"/><text x="${x(9) + 8}" y="${BOT - 8}">Now</text>
      ${B.thresholds.map((p) => p === 1 ? '' : `<line class="thr" x1="${L}" x2="${R}" y1="${y(B.amount * p)}" y2="${y(B.amount * p)}"/><text x="${R + 10}" y="${y(B.amount * p) + 4}">${Math.round(p * 100)}% · ${Tok.money(B.amount * p, 0)}</text>`).join('')}
      <line class="bud" x1="${L}" x2="${R}" y1="${y(B.amount)}" y2="${y(B.amount)}"/>
      <text x="${L + 10}" y="${y(B.amount) + 17}" style="fill:var(--c-text);font-size:13px">Budget ${Tok.money(B.amount, 0)}</text>
      <text x="${R + 10}" y="${y(B.amount) + 4}">100%</text>
      <path class="plan" data-k="plan" d="${line([[0, 0], [DAYS, B.amount]])}"/>
      <polygon class="band" data-k="band" points="${x(9)},${y(B.cost)} ${x(DAYS)},${y(B.hi)} ${x(DAYS)},${y(B.lo)}"/>
      <path class="proj" data-k="proj" d="${line([[9, B.cost], [DAYS, B.proj]])}"/>
      <path class="act" data-k="act" d="${line(actual)}"/>
      <circle data-k="nowdot" cx="${x(9)}" cy="${y(B.cost)}" r="5" fill="var(--c-gold-text)"/>
      <g data-k="ro">
        <line class="ror" x1="${x(crossHi)}" x2="${x(crossLo)}" y1="${y(B.amount) - 16}" y2="${y(B.amount) - 16}"/>
        <line class="ror" x1="${x(crossHi)}" x2="${x(crossHi)}" y1="${y(B.amount) - 21}" y2="${y(B.amount) - 11}"/>
        <line class="ror" x1="${x(crossLo)}" x2="${x(crossLo)}" y1="${y(B.amount) - 21}" y2="${y(B.amount) - 11}"/>
        <circle class="ro" cx="${x(cross)}" cy="${y(B.amount)}" r="6"/>
        <circle class="ror" data-k="ring" cx="${x(cross)}" cy="${y(B.amount)}" r="6"/>
        <text class="rot" x="${x(cross) + 4}" y="${y(B.amount) - 30}" text-anchor="end">Runs out November 26</text>
      </g>
    </svg>`);
    el.appendChild(svg);
    this.c = {};
    ['plan', 'band', 'proj', 'act', 'nowdot', 'ro', 'ring'].forEach((k) => (this.c[k] = svg.querySelector(`[data-k="${k}"]`)));
    this.roRect = () => { const [cx, cy] = [x(cross), y(B.amount)]; return [cx - 230, cy - 60, 320, 110]; };   /* logical px within the chart */
  },

  at(t) {
    const M = Mock, A4 = Act4, K = (this.timing(), this.K), B = this.B;
    this.question.at(t);
    const open = K.plan - 0.1;                                  /* the click that opens the Support team budget */
    M.rise(this.A.el, t, 2.4, { dy: 18 });
    M.fade(this.chipEl, t, 2.7, 0.6);
    const pB = M.ease.css(M.prog(t, open, 0.6));
    this.P.el.style.opacity = pB.toFixed(3);

    /* the list: the Owner column lights while the owner is named */
    const gOwner = M.ramp(t, K.owner - 0.15, open + 0.4, 0.3, 0.4);
    this.ownerCells.forEach((c) => A4.lit(c, gOwner));
    A4.lit(this.supportRow, M.ramp(t, open - 0.5, open + 0.6, 0.25, 0.3));

    /* the page: cards count up, the chart draws, then the page scrolls to the thresholds */
    const m0 = (v) => Tok.money(v, 0);
    M.countUp(this.tileVals[0], t, open + 0.3, 1.0, 0, B.cost, (v) => `${m0(v)} of ${m0(B.amount)}`);
    M.countUp(this.tileVals[1], t, open + 0.4, 1.0, 0, B.cost - B.plan, m0);
    M.countUp(this.tileVals[2], t, open + 0.5, 1.0, 0, B.proj, m0);
    const lit = [0, M.ramp(t, open + 0.5, K.forecast + 0.1, 0.35, 0.4), M.ramp(t, K.forecast - 0.1, K.names + 0.1, 0.35, 0.4), M.ramp(t, K.names - 0.1, K.sets - 0.3, 0.35, 0.5)];
    this.tiles.forEach((el, i) => A4.lit(el, lit[i]));
    const c = this.c;
    M.draw(c.plan, t, open + 0.3, 1.2);
    M.draw(c.act, t, open + 0.5, 1.2);
    M.draw(c.proj, t, open + 1.6, 1.4);
    c.band.style.opacity = M.prog(t, open + 2.0, 0.8).toFixed(3);
    c.nowdot.style.opacity = M.prog(t, open + 1.5, 0.3).toFixed(3);
    /* the run-out marker pops on "runs out" */
    const pr = M.prog(t, K.runs - 0.05, 0.45);
    c.ro.style.opacity = M.ease.css(pr).toFixed(3);
    c.ring.setAttribute('r', (6 + 26 * M.ease.outCubic(pr)).toFixed(1));
    c.ring.style.opacity = (1 - pr).toFixed(3);

    /* the page scrolls until "Thresholds and actions" heads it, so the camera can frame the table above the caption */
    const scroll = M.p(t, K.sets - 0.4, 1.0, 'inOutCubic');
    const S = this.thrEl.previousElementSibling.offsetTop - 6;
    this.pg.style.transform = `translateY(${(-S * scroll).toFixed(1)}px)`;

    /* thresholds: each row lights on its word, and the demo chip comes in with it */
    const words = [K.notify, K.reroute, K.block, K.block + 3];
    this.thrRows.forEach((r, i) => A4.lit(r, M.ramp(t, words[i] - 0.1, words[i + 1] + 0.1, 0.3, 0.4)));
    this.demos.forEach((d, i) => M.rise(d, t, words[i] + 0.1, { dy: 6 }));

    /* the camera and the cursor, in stage px */
    const rc = (el) => M.rectOf(this.world, el);
    const R = this.RECT, k = 1.2;
    const chartR = rc(this.chartEl), [rx, ry, rw, rh] = this.roRect();
    const roStage = [chartR[0] + rx * k, chartR[1] + ry * k, rw * k, rh * k];
    const listR = rc(this.supportRow.parentElement);
    const cam = [
      { t: 2.9, rect: [listR[0], listR[1] - 60, listR[2], listR[3] + 60] },
      { t: open + 0.1, rect: rc(this.tilesEl), dur: 1.2 },
      { t: K.names - 0.6, rect: roStage, dur: 1.2 },
      { t: K.sets - 0.3, rect: null, dur: 1.0 },
      { t: K.sets + 0.6, rect: rc(this.thrEl), dur: 1.1 },
    ];
    M.camera(this.world, t, cam);
    const row = rc(this.supportRow);
    this.cur.at(t, [
      { t: K.owner, x: R[0] + R[2] * 0.56, y: R[1] + R[3] * 0.78, glide: 0.6 },
      { t: open, x: row[0] + 70, y: row[1] + row[3] / 2, click: true, glide: 0.9 },
      { t: open + 1.4, x: row[0] + 70, y: row[1] + row[3] / 2, hide: true },
    ]);
  },
});
