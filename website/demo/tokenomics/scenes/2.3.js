/* Scene 2.3: the frontier and the quality bar. The question, then the use case's frontier capture: the camera
   pushes into cost against pass rate, the cursor opens Edit bar and the quality-bar dialog (a second capture)
   is read part by part under the spotlight, with a small tag marking the gate that comes from Verify. Cancel
   returns to the page, which scrolls to the Candidates grid (a mock drawn over the capture, to the captured
   figures) with each model's decision; the proposed change appears under it; and the recommended model's cost
   and pass rate light against the current model's as they are spoken. */
Tok.register({
  id: '2.3',

  /* the candidates as the console lists them, cheapest first: [model, note, cost per 1,000, pass rate, against
     frontier-large, interval, decision tone, decision, commands] */
  ROWS: [
    ['gpt-oss-20b', 'Self-hosted', '$0.29 to $0.32', '89.7%', '(1.9) pts', '(4.6) to 0.8', 'warn', 'Not enough evidence', ['Open', 'Extend trial']],
    ['frontier-mini', 'Vendor', '$1.51 to $1.90', '90.2%', '(1.4) pts', '(2.8) to 0.0', 'ok', 'Meets the bar', ['Open', 'Preview'], true],
    ['frontier-large', 'Current · the bar’s reference', '$9.603', '91.6%', '—', '—', 'accent', 'Current', ['Open']],
    ['reasoner-pro', 'Vendor', '$62.54 to $68.16', '95.1%', '3.5 pts', '2.1 to 4.9', 'ok', 'Meets the bar', ['Open']],
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { frontier: at('frontier'), owner: at('owner'), reference: at('reference'), judge: at('judge'), tolerance: at('tolerance'),
      hard: at('hard'), verify: at('Verify'), cheaper: at('cheaper'), proposed: at('proposed'), meets: at('meets'),
      here: at('Here'), fifth: at('fifth'), passes: at('passes'), against: at('against') };
  },

  render(root) {
    const M = Mock;
    Act2.css();
    root.classList.add('a2', 't23');
    M.style('t23', `
      .t23 .tbl { padding: 14px 0 0; }
      .t23 .tbl .sec { height: 40px; margin-bottom: 8px; }
      .t23 .tbl .sec h3 { font-size: 19px; }
      .t23 .tbl .search { height: 32px; width: 200px; border-radius: 9px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-faint); font-size: 14px; padding: 0 12px; display: flex; align-items: center; }
      .t23 .tbl .g { font-size: 14px; }
      .t23 .tbl .g .gr { height: 38px; }
      .t23 .tbl .g .n { font-size: 13.5px; }
      .t23 .tbl .prop { margin-top: 34px; }
      .t23 .dot { display: inline-flex; width: 18px; height: 18px; border-radius: 4px; margin-right: 8px; align-items: center; justify-content: center; font-size: 10px; vertical-align: -3px; }
      .t23 .dot.cur { background: rgba(96,165,250,.15); color: #93c5fd; }
      .t23 .dot.cand { background: rgba(236,72,153,.15); color: #f9a8d4; }
      .t23 .vtag { display: inline-flex; align-items: center; height: 22px; padding: 0 7px; border-radius: 999px; white-space: nowrap;
        font: 600 10px/1 var(--sans); letter-spacing: .05em; text-transform: uppercase; color: var(--yellow);
        border: 1px solid rgba(255,206,74,.5); background: rgba(255,206,74,.09); box-shadow: 0 0 18px -6px rgba(255,206,74,.7); }
    `);
    M.dotGrid(root);
    this.c = Tok.capture(root, {
      crumb: 'Optimize › Inference › Use cases › sql-report', active: 'Inference',
      states: [
        { image: 'captures/frontier.png', url: 'localhost:9889/inference/use-cases/sql-report#frontier' },
        { image: 'captures/frontier-bar.png', url: 'localhost:9889/inference/use-cases/sql-report#frontier' },
      ],
    });
    /* the dialog's excluded-models row: the reason field is cut off in the capture, so it is drawn without it */
    this.cover = this.c.patch([1140, 742, 95, 50], '', { bg: '#18181b' });
    this.vtag = this.c.patch([1114, 568, 112, 28], '<span class="vtag">From Verify</span>', { bg: 'transparent' });

    const gl = (k, html) => `<span class="gl" data-k="${k}">${html}</span>`;
    const cols = [
      { label: 'Model', w: 'minmax(0,1fr)' }, { label: 'Note', w: '190px' }, { label: 'Cost per 1,000 requests', w: '160px', r: true, note: '1' },
      { label: 'Pass rate', w: '85px', r: true }, { label: 'Against frontier-large', w: '150px', r: true, note: '2' }, { label: 'Interval', w: '115px', r: true, note: '2' },
      { label: 'Decision', w: '245px', pad: true }, { label: '', w: '125px' },
    ];
    const rows = this.ROWS.map(([m, note, cost, pass, diff, iv, tone, dec, cmds, rec], i) => [
      `<span class="dot ${m === 'frontier-large' ? 'cur' : 'cand'}">${m === 'frontier-large' ? '●' : '◆'}</span>${m}`,
      { html: note, cls: 'mu' }, { html: gl('cost' + i, cost), cls: 'n' }, { html: gl('pass' + i, pass), cls: 'n' },
      { html: diff, cls: 'n' }, { html: iv, cls: 'n' },
      Act2.chip(tone, dec) + (rec ? Act2.chip('rec', 'Recommended') : ''),
      `<span class="cmd">${cmds.map((c) => `<span>${c}</span>`).join('')}</span>`,
    ]);
    const pcols = [
      { label: 'Change', w: 'minmax(0,1fr)', note: '1' }, { label: 'About', w: '270px' },
      { label: 'Potential saving per day when proposed', w: '280px', r: true, note: '2' }, { label: 'Quality', w: '150px', pad: true }, { label: '', w: '220px' },
    ];
    this.tbl = this.c.patch([270, 58, 1650, 990], `<div class="a2-zoom tbl">
      <div class="sec"><h3>Candidates</h3><div class="ctl"><span class="search">Search models</span>${Act2.btn('Download CSV')}</div></div>
      ${Act2.grid({ cols, rows })}
      <div class="notes"><sup>1</sup>Failed attempts included<i>·</i><sup>2</sup>Paired intervals on the same 550 requests<i>·</i><sup>3</sup>Current as served</div>
      <div class="prop" data-k="prop">
        <div class="sec"><h3>Proposed</h3><div class="ctl"><span class="search">Search proposed changes</span>${Act2.btn('Download CSV')}</div></div>
        ${Act2.grid({ cols: pcols, rows: [[
          'Serve sql-report on frontier-mini', { html: 'From frontier-large · model swap', cls: 'mu' }, { html: '$31.24 to $32.82', cls: 'n' },
          Act2.chip('ok', 'Meets the bar'), `<span class="cmd"><span>Open</span></span>${Act2.chip('demo', 'Applied by the demo')}`]] })}
        <div class="notes"><sup>1</sup>Catalog v3, USD<i>·</i><sup>2</sup>Estimated</div>
      </div>
    </div>`, { bg: '#060607' });
    /* the capture's images carry a z-index, so a patch needs one to sit over them */
    [this.cover, this.vtag, this.tbl].forEach((p) => (p.style.zIndex = 3));
    this.g = {};
    this.tbl.querySelectorAll('[data-k]').forEach((n) => (this.g[n.dataset.k] = n));
    this.rows = [...this.tbl.querySelectorAll('.g')][0].querySelectorAll('.gr');
    this.question = Tok.question(root, { text: this.q });
  },

  /** Stage rects inside the candidates patch, measured with the rise transforms cleared. */
  geo() {
    if (this.G) return this.G;
    const R = (el) => {
      const saved = [];
      for (let n = el; n && n !== this.c.world; n = n.parentElement) {
        if (!n.style.transform.startsWith('translate')) continue;             /* the patch's own scale stays */
        saved.push([n, n.style.transform]); n.style.transform = 'none';
      }
      const r = Mock.rectOf(this.c.world, el);
      saved.forEach(([n, v]) => (n.style.transform = v));
      return r;
    };
    const dec = [...this.rows].map((r) => R(r.children[6]));
    this.G = {
      decision: [dec[1][0] - 8, dec[1][1] - 4, dec[1][2] + 8, dec[3][1] + dec[3][3] - dec[1][1] + 8],
      mini: R(this.rows[2]), prop: R(this.g.prop.querySelectorAll('.gr')[1]),
    };
    return this.G;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.question.at(t);
    const T_EDIT = K.owner + 0.3, T_CANCEL = K.cheaper - 0.3, T_TBL = T_CANCEL + 0.2;
    const inDialog = M.prog(t, T_EDIT + 0.1, 0.6) * (1 - M.prog(t, T_CANCEL + 0.1, 0.5));
    this.cover.style.opacity = inDialog.toFixed(3);
    M.rise(this.vtag, t, K.verify - 0.5, { dy: 8, opacity: inDialog });
    const tbl = M.prog(t, T_TBL, 0.5);
    this.tbl.style.opacity = M.ease.css(tbl).toFixed(3);
    M.rise(this.g.prop, t, K.meets + 0.5, { dy: 12 });

    /* the recommended model's figures against the current model's */
    const g = this.g;
    Tok.glow(g.cost1, M.ramp(t, K.fifth - 0.2, K.passes + 0.2, 0.3, 0.4));
    Tok.glow(g.cost2, M.ramp(t, K.fifth + 0.4, K.passes + 0.2, 0.3, 0.4));
    Tok.glow(g.pass1, M.ramp(t, K.passes - 0.2, this.span + 1, 0.3, 0.5));
    Tok.glow(g.pass2, M.ramp(t, K.against - 0.1, this.span + 1, 0.3, 0.5));

    /* the camera and the spotlight work in the capture's pixels until the table is on; its rects are stage px */
    const geo = tbl > 0 ? this.geo() : null;
    const S = (r) => (r ? [r[0] / 0.8333 - 192, r[1] / 0.8333 - 172.8, r[2] / 0.8333, r[3] / 0.8333] : null);
    this.c.at(t, {
      enter: 2.2,
      show: [{ t: -Infinity, state: 0 }, { t: T_EDIT + 0.1, state: 1 }, { t: T_CANCEL + 0.1, state: 0 }],
      cam: [
        { t: K.frontier, rect: [300, 300, 1580, 660] },
        { t: K.owner - 0.6, rect: null },
        { t: T_EDIT + 0.3, rect: [692, 130, 540, 520] },
        { t: T_CANCEL - 0.9, rect: null },
        { t: T_TBL + 0.1, rect: [290, 70, 1610, 560] },
      ],
      cursor: [
        { t: K.owner - 0.5, x: 1500, y: 220 },
        { t: T_EDIT, x: 1735, y: 72, click: true },
        { t: T_EDIT + 0.9, x: 1500, y: 300, hide: true },
        { t: T_CANCEL - 0.8, x: 1200, y: 980 },
        { t: T_CANCEL, x: 1068, y: 906, click: true },
        { t: T_CANCEL + 0.9, x: 1400, y: 1000, hide: true },
      ],
      spot: [
        { t: K.reference, rect: [700, 200, 520, 48] },
        { t: K.judge, rect: [700, 272, 520, 48] },
        { t: K.tolerance, rect: [1030, 308, 112, 44] },
        { t: K.hard, rect: [700, 483, 540, 160] },
        { t: K.cheaper - 0.9, rect: null },
        ...(geo ? [
          { t: K.proposed, rect: S(geo.decision) },
          { t: K.meets + 0.9, rect: S(geo.prop) },
          { t: K.here + 0.2, rect: S(geo.mini) },
          { t: K.against + 1.6, rect: null },
        ] : []),
      ],
    });
  },
});
