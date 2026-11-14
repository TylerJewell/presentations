/* Scene 2.1: The shipping factory. The akka.io Specify hero (site.js 196-312) as a pure function of t:
   named builds travel design → build → exit conditions → released, one every 3 s. The camera follows
   one build, Loan origination v1: it fails "A human decides every adverse action", is BLOCKED and returns
   to build, then passes with ALL MET and is released, and the camera pulls back to the whole line. */
registerScene({
  id: '2.1',
  act: 2,
  title: 'The shipping factory',
  duration: 16,
  caption: "Our system is a loan origination assistant for a regulated lender. It started as a specification. Akka's agents build it, and nothing ships until every condition in the spec is met.",

  /* factory time = scene time + OFFSET, so the hero (build 2, a failing one) enters design at t = 0.6 */
  SLOT: 3, OFFSET: 5.4, HERO: 2, FAIL_ROW: 1,
  Y: 396, X: { d: 125, b: 440, g: 750, r: 1090 },
  NAMES: { 0: 'Claims v3', 1: 'Payments v2', 2: 'Loan origination v1', 4: 'Support v4', 5: 'Onboarding v2', 6: 'KYC v1', 8: 'Collections v1' },
  HISTORY: ['Support v3', 'Payments v1', 'Claims v2', 'Onboarding v1'],
  BASE_COUNT: 46,
  /* the SVG's placement on the stage: viewBox px → stage px */
  SVG: { x: 166, y: 104, s: 1.28 },

  vb(x, y, w, h) { const S = this.SVG; return [S.x + x * S.s, S.y + y * S.s, w * S.s, h * S.s]; },

  render(root) {
    root.classList.add('s21');
    Mock.style('s21', `
      .s21 .eb { left: 166px; top: 52px; }
      .s21 .eb .mk-eyebrow { font-family: var(--sans); font-size: 14px; letter-spacing: .2em; }
      .s21 svg.fx { left: 166px; top: 104px; width: 1587.2px; height: 706.56px; overflow: visible; }
      .s21 .glow { left: 0; top: 0; width: 520px; height: 520px; margin: -260px 0 0 -260px; border-radius: 50%; pointer-events: none;
        background: radial-gradient(closest-side, rgba(255,206,74,.14), rgba(255,206,74,0)); }
      .s21 .fx-rail { fill: rgba(255,206,74,.045); stroke: rgba(255,206,74,.35); stroke-width: 1.2; }
      .s21 .fx-you { fill: var(--yellow); }
      .s21 .fx-railh { font: 600 11px var(--sans); letter-spacing: .18em; fill: var(--yellow); }
      .s21 .fx-railn { font: 600 10px var(--sans); letter-spacing: .14em; fill: var(--soft-grey); }
      .s21 .fx-chip rect { fill: #0c0c0e; stroke: rgba(255,206,74,.4); }
      .s21 .fx-chip text { font: 500 13px var(--sans); fill: var(--white); }
      .s21 .fx-chip.hot rect { fill: rgba(255,206,74,.18); stroke: var(--yellow); }
      .s21 .fx-con { fill: none; stroke: rgba(255,206,74,.22); stroke-width: 1.2; stroke-dasharray: 3 5; }
      .s21 .fx-con.hot { stroke: rgba(255,206,74,.75); }
      .s21 .fx-st { fill: #0b0b0d; stroke: rgba(241,241,241,.14); stroke-width: 1.2; }
      .s21 .fx-st.hot { stroke: rgba(255,206,74,.45); }
      .s21 .fx-st.bad { stroke: rgba(255,84,0,.7); }
      .s21 .fx-st.ok { stroke: rgba(114,211,91,.6); }
      .s21 .fx-h { font: 600 11px var(--sans); letter-spacing: .18em; fill: var(--yellow); }
      .s21 .fx-doc rect { fill: #121214; stroke: rgba(241,241,241,.16); }
      .s21 .fx-doc.hot rect { stroke: var(--yellow); fill: rgba(255,206,74,.07); }
      .s21 .fx-dt { font: 600 9.5px var(--sans); letter-spacing: .14em; fill: var(--yellow); }
      .s21 .fx-dd { font: 500 12px var(--sans); fill: var(--soft-grey); }
      .s21 .fx-art rect { fill: none; stroke: rgba(241,241,241,.18); }
      .s21 .fx-art text { font: 500 12px var(--sans); fill: var(--soft-grey); }
      .s21 .fx-art.hot rect { fill: rgba(241,241,241,.08); stroke: rgba(241,241,241,.7); }
      .s21 .fx-art.hot text { fill: var(--white); }
      .s21 .fx-agent { font: 500 10.5px var(--sans); fill: var(--medium-grey); }
      .s21 .fx-agent.hot { fill: var(--yellow); }
      .s21 .fx-pt { fill: rgba(241,241,241,.12); }
      .s21 .fx-pf { fill: var(--yellow); }
      .s21 .fx-dot { fill: #3a3a3a; }
      .s21 .fx-row text { font: 500 12.5px var(--sans); fill: var(--soft-grey); }
      .s21 .fx-row .fx-rs { font: 600 12px var(--sans); }
      .s21 .fx-row[data-s="scan"] .fx-dot { fill: var(--yellow); }
      .s21 .fx-row[data-s="scan"] text { fill: var(--white); }
      .s21 .fx-row[data-s="ok"] .fx-dot, .s21 .fx-row[data-s="ok"] .fx-rs { fill: var(--green); }
      .s21 .fx-row[data-s="ok"] text { fill: var(--white); }
      .s21 .fx-row[data-s="ok"] .fx-rs { fill: var(--green); }
      .s21 .fx-row[data-s="bad"] .fx-dot, .s21 .fx-row[data-s="bad"] text { fill: var(--red); }
      .s21 .fx-pill { font: 600 10.5px var(--sans); letter-spacing: .14em; fill: var(--soft-grey); }
      .s21 .fx-pill[data-s="ok"] { fill: var(--green); }
      .s21 .fx-pill[data-s="bad"] { fill: var(--red); }
      .s21 .fx-bar { fill: var(--yellow); }
      .s21 .fx-count { font: 700 30px var(--sans); fill: var(--white); font-variant-numeric: tabular-nums; }
      .s21 .fx-ck { font: 600 13px var(--sans); fill: var(--green); }
      .s21 .fx-rn { font: 500 13.5px var(--sans); fill: var(--white); }
      .s21 .fx-track { stroke: rgba(241,241,241,.16); stroke-width: 2; stroke-dasharray: 2 8; }
      .s21 .fx-dock { fill: none; stroke: rgba(241,241,241,.14); stroke-dasharray: 4 4; }
      .s21 .fx-ret { fill: none; stroke: rgba(255,84,0,.3); stroke-width: 1.5; stroke-dasharray: 5 5; }
      .s21 .fx-ret.hot { stroke: var(--red); }
      .s21 .fx-retl { font: 600 9.5px var(--sans); letter-spacing: .14em; fill: rgba(255,84,0,.65); }
      .s21 .fx-tok rect { fill: #141416; stroke: var(--yellow); stroke-width: 1.4; }
      .s21 .fx-tok text { font: 600 11.5px var(--sans); fill: var(--white); }
      .s21 .fx-tok[data-s="ok"] rect { stroke: var(--green); }
      .s21 .fx-tok[data-s="bad"] rect { stroke: var(--red); fill: #1a0f0a; }
      .s21 .fx-tok.hero rect { fill: #221d0f; stroke-width: 1.8; }
      .s21 .fx-tok.hero text { fill: var(--yellow); }
      .s21 .fx-tok.hero[data-s="ok"] text { fill: var(--white); }
      .s21 .fx-tok.hero[data-s="bad"] text { fill: var(--red); }
      .s21 .fx-why { font: 600 9.5px var(--sans); letter-spacing: .12em; }
      .s21 .fx-whyt { font: 500 11.5px var(--sans); }
      .s21 .fx-why.bad, .s21 .fx-whyt.bad { fill: var(--red); }
      .s21 .fx-why.ok, .s21 .fx-whyt.ok { fill: var(--green); }
      .s21 .fx-br { fill: none; stroke: rgba(241,241,241,.28); stroke-width: 1.2; }
      .s21 .fx-br.you { stroke: var(--yellow); }
      .s21 .fx-bl { font: 600 10.5px var(--sans); letter-spacing: .2em; fill: var(--soft-grey); }
      .s21 .fx-bl.you { fill: var(--yellow); }
    `);
    Mock.dotGrid(root);
    const world = (this.world = Mock.world(root));
    this.eb = Mock.mount(world, `<div class="eb"><div class="mk-eyebrow">Akka Specify · Your software factory</div></div>`).root;
    this.glow = Mock.html('<div class="glow"></div>');
    world.appendChild(this.glow);

    const chips = [['Functional', 348.6, 97], ['Security &amp; compliance', 455.6, 175.1], ['Reliability', 640.7, 104.1], ['Performance', 754.8, 104.1], ['Agentic AI safety', 868.9, 146.7], ['Documentation &amp; training', 1025.6, 196.4]];
    const conX = [662, 696, 730, 764, 798, 832];
    const fam = ['Functional', 'Security &amp; compliance', 'Reliability', 'Performance', 'Agentic AI safety', 'Documentation &amp; training'];
    const arts = [['Services', 342, 210], ['Workflows', 444, 210], ['Agents', 342, 244], ['APIs', 444, 244], ['Tests', 342, 278], ['Docs', 444, 278]];
    const svg = Mock.html(`<svg class="fx" viewBox="0 0 1240 552">
      <rect class="fx-rail" x="0.5" y="0.5" width="1239" height="92" rx="14"/>
      <g class="fx-you" transform="translate(30 46)"><circle cx="0" cy="-8" r="6"/><path d="M-11 12 C-11 1 11 1 11 12 Z"/></g>
      <text class="fx-railh" x="56" y="41">YOUR DEFINITION OF DONE</text>
      <text class="fx-railn" x="56" y="62">CATALOG · 1,210 EXIT CONDITIONS</text>
      ${chips.map(([n, x, w], i) => `<g class="fx-chip" data-ci="${i}"><rect x="${x}" y="29" width="${w}" height="34" rx="17"/><text x="${x + w / 2}" y="51" text-anchor="middle">${n}</text></g>`).join('')}
      ${chips.map(([, x, w], i) => `<path class="fx-con" data-cc="${i}" d="M${x + w / 2} 63 C${x + w / 2} 128 ${conX[i]} 110 ${conX[i]} 164"/>`).join('')}
      <rect class="fx-st" data-st="d" x="0.5" y="164" width="249" height="272" rx="14"/>
      <rect class="fx-st" data-st="b" x="320.5" y="164" width="239" height="272" rx="14"/>
      <rect class="fx-st" data-st="g" x="630.5" y="164" width="239" height="272" rx="14"/>
      <rect class="fx-st" data-st="r" x="940.5" y="164" width="299" height="272" rx="14"/>
      <text class="fx-h" x="22" y="194">DESIGN</text>
      <g class="fx-doc" data-fx-doc><rect x="22" y="210" width="206" height="58" rx="9"/><text class="fx-dt" x="36" y="232">DEV SPEC</text><text class="fx-dd" x="36" y="253">Goals · requirements · knowledge</text></g>
      <g class="fx-doc" data-fx-doc><rect x="22" y="278" width="206" height="58" rx="9"/><text class="fx-dt" x="36" y="300">EVAL MATRIX</text><text class="fx-dd" x="36" y="321">Risk · operations · improvement</text></g>
      <text class="fx-h" x="342" y="194">BUILD</text>
      ${arts.map(([n, x, y], i) => `<g class="fx-art" data-ai="${i}"><rect x="${x}" y="${y}" width="94" height="26" rx="6"/><text x="${x + 47}" y="${y + 17}" text-anchor="middle">${n}</text></g>`).join('')}
      <rect class="fx-pt" x="342" y="322" width="196" height="4" rx="2"/><rect class="fx-pf" data-fx-prog x="342" y="322" width="0" height="4" rx="2"/>
      <text class="fx-agent" data-fx-agent x="342" y="346"></text>
      <text class="fx-h" x="652" y="194">EXIT CONDITIONS</text>
      <text class="fx-pill" data-fx-pill x="848" y="194" text-anchor="end"></text>
      ${fam.map((n, i) => `<g class="fx-row" data-gi="${i}"><circle class="fx-dot" cx="658" cy="${218 + 20 * i}" r="4"/><text x="672" y="${222 + 20 * i}">${n}</text><text class="fx-rs" x="848" y="${222 + 20 * i}" text-anchor="end"></text></g>`).join('')}
      <text class="fx-why" data-fx-why x="652" y="346"></text>
      <text class="fx-whyt" data-fx-whyt x="652" y="362"></text>
      <rect class="fx-bar" data-fx-bar x="866" y="374" width="8" height="44" rx="3"/>
      <text class="fx-h" x="962" y="194">RELEASED</text>
      <text class="fx-count" data-fx-count x="1218" y="200" text-anchor="end">0</text>
      ${[0, 1, 2, 3].map((i) => `<g class="fx-rel" data-ri="${i}"><text class="fx-ck" x="962" y="${236 + 28 * i}"></text><text class="fx-rn" x="984" y="${236 + 28 * i}"></text></g>`).join('')}
      <line class="fx-track" x1="175" y1="396" x2="1040" y2="396"/>
      <rect class="fx-dock" x="48" y="379" width="154" height="34" rx="8"/>
      <rect class="fx-dock" x="363" y="379" width="154" height="34" rx="8"/>
      <rect class="fx-dock" x="673" y="379" width="154" height="34" rx="8"/>
      <rect class="fx-dock" x="1013" y="379" width="154" height="34" rx="8"/>
      <path class="fx-ret" data-fx-ret d="M750 413 V466 H440 V413"/>
      <text class="fx-retl" x="595" y="458" text-anchor="middle">BACK TO BUILD</text>
      <g data-fx-tokens></g>
      <path class="fx-br you" d="M1 494 V504 H249 V494"/><text class="fx-bl you" x="125" y="530" text-anchor="middle">YOU</text>
      <path class="fx-br" d="M321 494 V504 H1239 V494"/><text class="fx-bl" x="780" y="530" text-anchor="middle">UNATTENDED</text>
    </svg>`);
    world.appendChild(svg);
    this.svg = svg;
    const q = (s) => svg.querySelector(s), qa = (s) => [...svg.querySelectorAll(s)];
    Object.assign(this, {
      layer: q('[data-fx-tokens]'), rows: qa('[data-gi]'), chips: qa('[data-ci]'), cons: qa('[data-cc]'), arts: qa('[data-ai]'),
      docs: qa('[data-fx-doc]'), rel: qa('[data-ri]'), prog: q('[data-fx-prog]'), pill: q('[data-fx-pill]'), bar: q('[data-fx-bar]'),
      ret: q('[data-fx-ret]'), count: q('[data-fx-count]'), agent: q('[data-fx-agent]'), why: q('[data-fx-why]'), whyt: q('[data-fx-whyt]'),
      stations: Object.fromEntries(qa('[data-st]').map((e) => [e.dataset.st, e])), track: q('.fx-track'),
    });
    this.toks = {};
  },

  /* ---- the line, as in site.js: a build starts every SLOT s; every fourth fails one condition and returns
     to build, and the slot after a failure stays empty so no station ever holds two builds ---- */
  kind(n) { const m = n % 4; return m === 2 ? 'fail' : m === 3 ? 'skip' : 'pass'; },
  relAt(n) { return this.SLOT * n + (this.kind(n) === 'fail' ? 10.0 : 6.4); },
  gates(n) { return this.kind(n) === 'fail' ? [[4.2, 5.4, this.FAIL_ROW, 5.2], [7.8, 9.2, -1, 9.0]] : [[4.2, 5.6, -1, 5.4]]; },
  builds(n) { return this.kind(n) === 'fail' ? [[2.0, 3.6], [6.4, 7.2]] : [[2.0, 3.6]]; },
  where(n, r) {
    const X = this.X, Y = this.Y, f = this.kind(n) === 'fail', s = { x: X.d, y: Y, o: 1, st: '' };
    const lerp = (a, b, p) => Mock.lerp(a, b, Mock.ease.inOutCubic(Mock.clamp(p)));
    if (r < 0) return null;
    if (r < 1.2) { s.o = Math.min(1, r / 0.3); return s; }
    if (r < 2.0) { s.x = lerp(X.d, X.b, (r - 1.2) / 0.8); return s; }
    if (r < 3.6) { s.x = X.b; return s; }
    if (r < 4.2) { s.x = lerp(X.b, X.g, (r - 3.6) / 0.6); return s; }
    if (!f) {
      if (r < 5.6) { s.x = X.g; s.st = r >= 5.4 ? 'ok' : ''; return s; }
      if (r < 6.4) { s.x = lerp(X.g, X.r, (r - 5.6) / 0.8); s.st = 'ok'; return s; }
      if (r < 6.8) { s.x = X.r; s.st = 'ok'; s.o = 1 - (r - 6.4) / 0.4; return s; }
      return null;
    }
    if (r < 5.4) { s.x = X.g; s.st = r >= 5.1 ? 'bad' : ''; return s; }
    if (r < 6.4) { /* down, left, up along the return path */
      const p = Mock.ease.inOutCubic((r - 5.4) / 1.0) * (50 + 310 + 50);
      s.st = 'bad';
      if (p < 50) { s.x = X.g; s.y = Y + p; } else if (p < 360) { s.x = X.g - (p - 50); s.y = Y + 50; } else { s.x = X.b; s.y = Y + 50 - (p - 360); }
      return s;
    }
    if (r < 7.2) { s.x = X.b; return s; }
    if (r < 7.8) { s.x = lerp(X.b, X.g, (r - 7.2) / 0.6); return s; }
    if (r < 9.2) { s.x = X.g; s.st = r >= 9.0 ? 'ok' : ''; return s; }
    if (r < 10.0) { s.x = lerp(X.g, X.r, (r - 9.2) / 0.8); s.st = 'ok'; return s; }
    if (r < 10.4) { s.x = X.r; s.st = 'ok'; s.o = 1 - (r - 10.0) / 0.4; return s; }
    return null;
  },
  label(n) { return this.NAMES[n] || 'Build ' + n; },

  token(n) {
    let el = this.toks[n];
    if (el) return el;
    const hero = n === this.HERO, w = 150;
    el = Mock.svg('g', { class: 'fx-tok' + (hero ? ' hero' : '') });
    Mock.svg('rect', { x: -w / 2, y: -15, width: w, height: 30, rx: 7 }, el);
    const tx = Mock.svg('text', { y: 4, 'text-anchor': 'middle' }, el);
    tx.textContent = this.label(n);
    this.layer.appendChild(el);
    return (this.toks[n] = el);
  },

  at(t) {
    const M = Mock, T = t + this.OFFSET, SLOT = this.SLOT;
    const now = Math.floor(T / SLOT), live = {};
    let gate = null, build = null, design = false, failing = false, heroAt = null;
    for (let n = Math.max(0, now - 4); n <= now; n++) {
      if (this.kind(n) === 'skip') continue;
      const r = T - SLOT * n, s = this.where(n, r);
      this.gates(n).forEach((g) => { if (r >= g[0] && r < g[1] + 0.9) gate = { r, g, n }; });
      this.builds(n).forEach((b) => { if (r >= b[0] && r < b[1]) build = { p: (r - b[0]) / (b[1] - b[0]), n, re: b[0] > 3 }; });
      if (r >= 0 && r < 1.2) design = true;
      if (this.kind(n) === 'fail' && r >= 5.4 && r < 6.4) failing = true;
      if (!s) continue;
      live[n] = 1;
      const el = this.token(n);
      el.setAttribute('transform', `translate(${s.x.toFixed(1)} ${s.y.toFixed(1)})`);
      el.style.opacity = s.o;
      el.setAttribute('data-s', s.st);
      if (n === this.HERO) heroAt = s;
    }
    Object.keys(this.toks).forEach((k) => { if (!live[k]) { this.layer.removeChild(this.toks[k]); delete this.toks[k]; } });
    /* the hero draws over the others */
    if (this.toks[this.HERO] && this.layer.lastChild !== this.toks[this.HERO]) this.layer.appendChild(this.toks[this.HERO]);

    this.docs.forEach((d) => d.classList.toggle('hot', design));
    this.prog.setAttribute('width', build === null ? 0 : (196 * build.p).toFixed(1));
    this.arts.forEach((a, i) => a.classList.toggle('hot', build !== null && build.p >= i / 6));
    const agentTxt = build ? (build.re ? 'agents · fixing 1 condition' : 'agents · building ' + Math.round(6 * build.p) + ' of 6') : '';
    if (this.agent.textContent !== agentTxt) this.agent.textContent = agentTxt;
    this.agent.classList.toggle('hot', !!build);
    this.ret.classList.toggle('hot', failing);
    this.ret.style.strokeDashoffset = (-(T * 26) % 40).toFixed(2);

    let verdict = '';
    this.rows.forEach((row, i) => {
      let st = '', mark = '';
      if (gate) {
        const g = gate.g, tick = g[0] + 0.1 + 0.2 * i, r = gate.r;
        if (r >= tick && (g[2] < 0 || i < g[2])) { st = 'ok'; mark = '✓'; }
        else if (r >= tick && i === g[2]) { st = 'bad'; mark = '×'; }
        else if (r >= tick - 0.2 && (g[2] < 0 || i <= g[2])) st = 'scan';
        this.chips[i].classList.toggle('hot', r >= tick - 0.2 && r < tick + 0.25 && (g[2] < 0 || i <= g[2]));
      } else this.chips[i].classList.remove('hot');
      row.setAttribute('data-s', st);
      if (row.lastElementChild.textContent !== mark) row.lastElementChild.textContent = mark;
    });
    const conHot = !!gate && gate.r < gate.g[1];
    this.cons.forEach((c) => { c.classList.toggle('hot', conHot); M.march(c, T, 20); });
    if (gate) verdict = gate.r >= gate.g[3] ? (gate.g[2] < 0 ? 'ok' : 'bad') : 'run';
    this.pill.setAttribute('data-s', verdict);
    const pillTxt = verdict === 'ok' ? 'ALL MET' : verdict === 'bad' ? 'BLOCKED' : verdict === 'run' ? 'CHECKING' : '';
    if (this.pill.textContent !== pillTxt) this.pill.textContent = pillTxt;
    /* the gate's bar lifts for a pass */
    let open = 0;
    if (gate && verdict === 'ok') {
      const a = gate.g[3], b = gate.g[1] + 0.9;
      open = Math.min(M.ease.css(M.prog(gate.r, a, 0.35)), 1 - M.ease.css(M.prog(gate.r, b - 0.35, 0.35)));
    }
    this.bar.style.transform = `translateY(${(-46 * open).toFixed(2)}px)`;
    this.stations.g.setAttribute('class', 'fx-st' + (verdict === 'bad' ? ' bad' : verdict === 'ok' ? ' ok' : gate ? ' hot' : ''));
    this.stations.b.setAttribute('class', 'fx-st' + (build ? ' hot' : ''));
    this.stations.d.setAttribute('class', 'fx-st' + (design ? ' hot' : ''));

    /* why the hero was blocked, and that it then met everything */
    const hr = T - SLOT * this.HERO;
    let why = '', whyt = '', tone = '';
    if (hr >= 5.2 && hr < 7.8) { why = '× LOAN-HUMAN-DECIDES-ADVERSE'; whyt = 'A human decides every adverse action'; tone = 'bad'; }
    else if (hr >= 9.0 && hr < 10.1) { why = '✓ 17 OF 17 CONDITIONS MET'; whyt = 'Loan origination v1 · ready to ship'; tone = 'ok'; }
    if (this.why.textContent !== why) { this.why.textContent = why; this.whyt.textContent = whyt; }
    this.why.setAttribute('class', 'fx-why ' + tone);
    this.whyt.setAttribute('class', 'fx-whyt ' + tone);
    const wo = hr < 7.8 ? Math.min(M.prog(hr, 5.2, 0.25), 1 - M.prog(hr, 7.5, 0.3)) : Math.min(M.prog(hr, 9.0, 0.25), 1 - M.prog(hr, 9.8, 0.3));
    this.why.style.opacity = wo; this.whyt.style.opacity = wo;

    /* releases: the history before the scene, then each build as it leaves the line */
    let done = this.BASE_COUNT;
    const last = [];
    for (let m = now; m >= 0; m--) if (this.kind(m) !== 'skip' && this.relAt(m) <= T) { done++; if (last.length < 4) last.push(this.label(m)); }
    const list = last.concat(this.HISTORY).slice(0, 4);
    if (this.count.textContent !== String(done)) this.count.textContent = done;
    this.rel.forEach((row, i) => {
      row.firstElementChild.textContent = list[i] ? '✓' : '';
      if (row.lastElementChild.textContent !== list[i]) row.lastElementChild.textContent = list[i] || '';
      row.style.opacity = list[i] ? 1 - i * 0.2 : 0;
    });
    const heroRel = this.relAt(this.HERO);
    this.rel[0].style.fill = '';
    this.rel[0].lastElementChild.style.fill = T >= heroRel && T < heroRel + 2.4 ? 'var(--yellow)' : '';

    /* a soft light rides with the hero */
    if (heroAt) {
      const [gx, gy] = [this.SVG.x + heroAt.x * this.SVG.s, this.SVG.y + heroAt.y * this.SVG.s];
      M.set(this.glow, { left: gx.toFixed(1) + 'px', top: gy.toFixed(1) + 'px', opacity: (heroAt.o * 0.9).toFixed(3),
        background: `radial-gradient(closest-side, ${heroAt.st === 'bad' ? 'rgba(255,84,0,.16)' : heroAt.st === 'ok' ? 'rgba(114,211,91,.13)' : 'rgba(255,206,74,.14)'}, rgba(0,0,0,0))` });
    } else this.glow.style.opacity = 0;

    M.rise(this.eb, t, -0.2, { dy: 10 });
    M.fade(this.svg, t, -0.4, 0.6);

    /* the camera follows the hero: design and build, build and the gate, the gate and release, then all */
    M.camera(this.world, t, [
      { t: -2.0, rect: this.vb(0, 150, 570, 340), dur: 0.8 },
      { t: 3.3, rect: this.vb(310, 150, 570, 340), dur: 1.3 },
      { t: 8.5, rect: this.vb(620, 150, 620, 340), dur: 1.2 },
      { t: 10.5, rect: null, dur: 1.4 },
    ]);
  },
});
