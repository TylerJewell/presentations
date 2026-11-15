/* The rules change every month. A 2026–2028 calendar of the deadlines as they were set; the EU's
   high-risk date then slides sixteen months, Colorado's act slides and then breaks, and SR 11-7 is cut
   and replaced by guidance that leaves AI agents out. A lane for AI agents follows, where Asia-Pacific
   bank supervisors bring agents in during 2026. Last, the calendar clears for one line: the systems
   change weekly, the rules monthly, and the review comes yearly. The first beat has no hold before the EU
   moves: the calendar draws in and holds while the original date is named, then the pins slide. Figures
   and sources: data/trends.js (v1) and, for the agents lane, the primary sources in reports/Multinational
   AI oversight and human controls.md §5. Hong Kong's entry is the HKMA's proposed registry of material AI
   agents, so the narration says "proposed". */
registerSlide({
  id: 'rules',
  act: 'problems',
  title: 'The rules change every month',
  beats: [
    { t: 8.4, say: (T) => `Europe's AI Act set the second of August 2026 for its high-risk rules. In July, a new EU regulation moved most high-risk systems to December 2027, and AI built into regulated products to August 2028. The best-known deadline in AI law slid ${T.eu.slipMonths} months, less than a month before it arrived.` },
    { t: 13.2, say: "Colorado passed the first broad state AI act in the country, due in February. It was pushed to June, and then in May the legislature repealed it and replaced it with a different law, whose duties start next January. The original never took effect." },
    { t: 17.0, say: "In April, US bank regulators replaced SR 11-7, the model risk guidance banks had used since 2011. Its replacement, SR 26-2, says in a footnote that generative and agentic AI models are not within its scope." },
    { t: 20.8, say: "The same year, bank supervisors in Australia and Singapore wrote AI agents into their expectations, and Hong Kong's proposed a registry of them. The calendar doesn't only move. It moves differently in every country." },
    { t: 23.4, say: "Your systems change every week, the rules every month, and the review comes once a year." },
  ],

  X0: 470, X1: 1770,
  LANES: { eu: 372, eu1: 482, co: 592, bank: 702, agents: 812 },
  B: { eu: 4.6, co: 9.0, bank: 13.4, agents: 17.2, line: 21.0 },

  /* the agents lane: the supervisors that brought AI agents in during 2026; row a sits above the track,
     row b below it, so two dates a week apart stay readable; lx is the label's left edge. The US side
     of the contrast is noted on the bank lane, beside SR 26-2. */
  AGENTS: [
    { name: 'Australia', sub: '30 Apr', date: '2026-04-30', row: 'a', lx: 637, at: 1.4 },
    { name: 'Singapore', sub: '7 Oct', date: '2026-10-07', row: 'a', lx: 846, at: 1.9 },
    { name: 'Hong Kong', sub: '15 Oct', date: '2026-10-15', row: 'b', lx: 846, at: 2.3 },
  ],
  AGENTS_SRC: 'APRA letter to industry on AI, 30 Apr 2026 · MAS Guidelines on AI Risk Management, 7 Oct 2026 · HKMA ART Framework, 15 Oct 2026 · SR 26-2, 17 Apr 2026, footnote 3',

  /** x of an ISO date on the 2026-01 .. 2029-01 calendar */
  x(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return this.X0 + (((y - 2026) * 12 + (m - 1) + (d - 1) / 30.4) / 36) * (this.X1 - this.X0);
  },
  monthAt(x) {
    const mm = Math.round(((x - this.X0) / (this.X1 - this.X0)) * 36);
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][((mm % 12) + 12) % 12] + ' ' + (2026 + Math.floor(mm / 12));
  },

  render(root) {
    const M = Mock, T = window.TRENDS, L = this.LANES;
    root.classList.add('sl-rul');
    M.style('sl-rul', `
      .sl-rul .tl { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-rul .tl > *, .sl-rul .lane > * { position: absolute; }
      .sl-rul .yr { top: 232px; font: 700 30px/1 var(--sans); color: var(--ink); letter-spacing: -.01em; }
      .sl-rul .tk { top: 276px; width: 2px; height: 12px; background: rgba(241,241,241,.4); }
      .sl-rul .tk.q { height: 20px; top: 272px; background: rgba(241,241,241,.6); }
      .sl-rul .tk.y { height: 610px; top: 272px; width: 2px; background: rgba(241,241,241,.16); }
      .sl-rul .lane { left: 0; width: 1920px; height: 120px; }
      .sl-rul .lane .trk { left: 470px; width: 1300px; top: 59px; height: 2px; background: rgba(241,241,241,.22); }
      .sl-rul .lane .nm { left: 150px; top: 22px; width: 300px; font: 700 32px/1.1 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-rul .lane .nm small { display: block; font: 500 24px/1.3 var(--sans); letter-spacing: 0; color: var(--ink-2); margin-top: 2px; }
      .sl-rul .pin { width: 30px; height: 30px; margin: -15px 0 0 -15px; top: 60px; border-radius: 50%; background: var(--ink); box-shadow: 0 0 0 6px #000; }
      .sl-rul .pin.y { background: var(--yellow); box-shadow: 0 0 0 6px #000, 0 0 30px rgba(255,206,74,.6); }
      .sl-rul .pin.red { background: var(--red); box-shadow: 0 0 0 6px #000, 0 0 30px rgba(255,84,0,.6); }
      .sl-rul .pin.half { width: 15px; border-radius: 15px 0 0 15px; margin-left: -15px; box-shadow: none; }
      .sl-rul .pin.half.r { border-radius: 0 15px 15px 0; margin-left: 0; }
      .sl-rul .pin.sq { border-radius: 6px; transform: rotate(45deg); }
      .sl-rul .ghost { width: 30px; height: 30px; margin: -15px 0 0 -15px; top: 60px; border-radius: 50%; border: 3px dashed rgba(241,241,241,.55); }
      .sl-rul .pl { top: 24px; padding: 2px 10px; margin-left: -10px; border-radius: 8px; background: #000; white-space: nowrap; font: 700 28px/1.15 var(--sans); color: var(--ink); text-shadow: 0 0 12px #000, 0 0 4px #000; }
      .sl-rul .pl small { display: block; font: 500 24px/1.25 var(--sans); color: var(--ink-2); }
      .sl-rul .pl.y { color: var(--yellow); } .sl-rul .pl.red { color: var(--red); }
      .sl-rul .pl.gh { top: 84px; font-size: 24px; font-weight: 600; color: var(--ink-3); text-decoration: line-through; text-decoration-thickness: 2px; transform: translateX(-50%); margin-left: 0; }
      .sl-rul .trail { top: 58px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, rgba(255,206,74,.05), rgba(255,206,74,.9)); transform-origin: 0 50%; }
      .sl-rul .slip { top: -14px; width: 400px; margin-left: -200px; text-align: center; font: 700 34px/1 var(--sans); color: var(--yellow); white-space: nowrap; }
      .sl-rul .bar { top: 53px; height: 14px; border-radius: 7px; }
      .sl-rul .bar.old { background: rgba(241,241,241,.85); }
      .sl-rul .bar.new { background: var(--yellow); transform-origin: 0 50%; }
      .sl-rul .bchip { top: 4px; font: 700 28px/1 var(--sans); white-space: nowrap; padding: 2px 10px; margin-left: -10px; border-radius: 8px; background: #000; }
      .sl-rul .brk { top: 30px; width: 6px; height: 60px; margin-left: -3px; background: var(--red); transform: rotate(14deg); box-shadow: 0 0 18px rgba(255,84,0,.7); }
      .sl-rul .now { top: 262px; width: 0; height: 626px; border-left: 3px dashed rgba(255,206,74,.75); }
      .sl-rul .nowl { top: 902px; font: 600 var(--t-label)/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); transform: translateX(-50%); }
      .sl-rul .src { left: 150px; right: 150px; top: 1014px; height: 30px; }
      .sl-rul .src > div { position: absolute; left: 0; top: 0; display: flex; gap: 16px; align-items: center; white-space: nowrap; }
      .sl-rul .agp { width: 22px; height: 22px; margin: -11px 0 0 -11px; border-radius: 50%; background: var(--yellow); box-shadow: 0 0 0 5px #000, 0 0 24px rgba(255,206,74,.55); }
      .sl-rul .agl { padding: 0 8px; margin-left: -8px; border-radius: 8px; background: #000; white-space: nowrap; font: 700 28px/1.1 var(--sans); color: var(--yellow); }
      .sl-rul .agl small { display: block; font: 500 24px/1.2 var(--sans); color: var(--ink-2); }
      .sl-rul .agl.a { top: -7px; }
      .sl-rul .agl.b { top: 67px; }
      .sl-rul .cad { left: var(--gut); top: 385px; right: var(--gut); }
      .sl-rul .cad .tk-h { font-size: 96px; line-height: 1.08; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['The rules <span class="tk-y">change every month.</span>']);

    /* the calendar */
    const tl = (this.tl = M.html('<div class="tl"></div>'));
    root.appendChild(tl);
    this.axis = M.html('<div style="left:0;top:0;width:1920px;height:1080px"></div>');
    tl.appendChild(this.axis);
    let ax = '';
    for (let m = 0; m <= 36; m++) {
      const x = this.X0 + (m / 36) * (this.X1 - this.X0);
      ax += `<div class="tk${m % 12 === 0 ? ' y' : m % 3 === 0 ? ' q' : ''}" style="left:${x - 1}px"></div>`;
      if (m % 12 === 0 && m < 36) ax += `<div class="yr" style="left:${x + 12}px">${2026 + m / 12}</div>`;
    }
    this.axis.innerHTML = ax;
    this.axis.querySelectorAll('div').forEach((d) => (d.style.position = 'absolute'));
    this.nowX = this.x('2026-11-02');
    this.now = M.mount(tl, `<div class="now" style="left:${this.nowX}px"></div>`).root;
    this.nowl = M.mount(tl, `<div class="nowl" style="left:${this.nowX}px">Now</div>`).root;

    const lane = (key, nm, sub) => M.mount(tl, `<div class="lane" style="top:${L[key] - 60}px"><div class="trk"></div><div class="nm">${nm}<small>${sub}</small></div></div>`);
    const E = T.eu, C = T.colorado, K = T.banking;

    /* EU: two pins slide */
    this.eu = lane('eu', 'EU AI Act', 'High-risk, standalone');
    this.eu1 = lane('eu1', 'EU AI Act', 'High-risk, in products');
    this.euP = [
      { a: this.x(E.annexIII.from), b: this.x(E.annexIII.to), from: E.annexIII.fromLabel, to: E.annexIII.toLabel, nm: 'Rules apply', d: 0, host: this.eu.root },
      { a: this.x(E.annexI.from), b: this.x(E.annexI.to), from: E.annexI.fromLabel, to: E.annexI.toLabel, nm: 'Rules apply', d: 0.55, host: this.eu1.root },
    ].map((p) => {
      p.ghost = M.mount(p.host, `<div class="ghost" style="left:${p.a}px"></div>`).root;
      p.gl = M.mount(p.host, `<div class="pl gh" style="left:${p.a}px">${p.from}</div>`).root;
      p.trail = M.mount(p.host, `<div class="trail" style="left:${p.a}px;width:${p.b - p.a}px"></div>`).root;
      p.slip = M.mount(p.host, `<div class="slip" style="left:${(p.a + p.b) / 2}px"></div>`).root;
      p.pin = M.mount(p.host, `<div class="pin y"></div>`).root;
      p.lab = M.mount(p.host, `<div class="pl"><span></span><small>${p.nm}</small></div>`);
      p.labD = p.lab.root.firstChild;
      return p;
    });

    /* Colorado: slides, breaks, is replaced */
    this.co = lane('co', 'Colorado', 'State AI act');
    const c0 = this.x(C.original.date), c1 = this.x(C.delayed.date), c2 = this.x(C.newDuties.date), cr = this.x(C.replaced.date);
    this.coG = { c0, c1, c2, cr };
    this.co.ghost = M.mount(this.co.root, `<div class="ghost" style="left:${c0}px"></div>`).root;
    this.co.trail = M.mount(this.co.root, `<div class="trail" style="left:${c0}px;width:${c1 - c0}px;background:linear-gradient(90deg, rgba(241,241,241,.05), rgba(241,241,241,.8))"></div>`).root;
    this.co.pin = M.mount(this.co.root, `<div class="pin"></div>`).root;
    this.co.hl = M.mount(this.co.root, `<div class="pin half red"></div>`).root;
    this.co.hr = M.mount(this.co.root, `<div class="pin half r red"></div>`).root;
    this.co.lab = M.mount(this.co.root, `<div class="pl"><span></span><small></small></div>`);
    /* right-aligned to end before the Now line, so the line never runs through it when the lane steps back */
    this.co.rep = M.mount(this.co.root, `<div class="pl red" style="left:${this.nowX - 18 - 190}px;width:190px;text-align:right;background:none">Repealed<small style="color:var(--red)">${C.replaced.label}</small></div>`).root;
    this.co.nw = M.mount(this.co.root, `<div class="pin y sq" style="left:${c2}px"></div>`).root;
    this.co.nwl = M.mount(this.co.root, `<div class="pl y" style="left:${c2 + 30}px">${C.newDuties.label}<small>A different law</small></div>`).root;

    /* banks: SR 11-7 cut, SR 26-2 begins */
    this.bk = lane('bank', 'US banks', 'Model risk guidance');
    const b0 = this.x('2026-04-17');
    this.bkX = b0;
    this.bk.old = M.mount(this.bk.root, `<div class="bar old" style="left:${this.X0 - 10}px;width:${this.X1 - this.X0 + 10}px"></div>`).root;
    this.bk.oc = M.mount(this.bk.root, `<div class="bchip" style="left:${this.X0}px;color:var(--ink)">${K.old.id}<span class="since" style="font-weight:500;color:var(--ink-2)"> since 2011</span></div>`).root;
    this.bk.brk = M.mount(this.bk.root, `<div class="brk" style="left:${b0}px"></div>`).root;
    this.bk.nw = M.mount(this.bk.root, `<div class="bar new" style="left:${b0 + 8}px;width:${this.X1 - b0 - 8}px"></div>`).root;
    this.bk.nc = M.mount(this.bk.root, `<div class="bchip" style="left:${b0 + 30}px;color:var(--yellow)">${K.new.id} <span style="font-weight:500;color:var(--ink-2)">${K.new.date}</span><span class="agx" style="font-weight:600;color:var(--ink)"> · leaves AI agents out</span></div>`).root;
    this.bk.agx = this.bk.nc.querySelector('.agx');

    /* AI agents: three supervisors bring them in, the US guidance leaves them out */
    this.ag = lane('agents', 'AI agents', 'Bank supervisors');
    this.agents = this.AGENTS.map((a) => {
      const x = this.x(a.date), y = a.row === 'a' ? 46 : 74;
      const pin = M.mount(this.ag.root, `<div class="agp" style="left:${x}px;top:${y}px"></div>`).root;
      const lab = M.mount(this.ag.root, `<div class="agl ${a.row}" style="left:${a.lx}px">${a.name}<small>${a.sub}</small></div>`).root;
      return { a, pin, lab };
    });

    /* the three cadences, in one line */
    this.cad = Talk.lines(root.appendChild(M.html('<div class="cad"></div>')),
      ['Your systems change every week,', 'the rules every month,', '<span class="tk-y">and the review comes once a year.</span>']);

    /* the source for the beat on screen */
    const pend = (s) => (s === 'pending' ? ' <span class="tk-pend">Source pending</span>' : '');
    this.srcs = [`${E.source}${pend(E.status)}`, `${C.source}`, `${K.source}`, this.AGENTS_SRC]
      .map((h) => M.mount(root, `<div class="src"><div class="tk-src">${h}</div></div>`).root);
  },

  at(t) {
    const M = Mock, B = this.B, Lv = M.abs(t), T = window.TRENDS;
    Talk.linesAt(this.head, t, 0.1);

    /* the calendar draws in, and clears for the closing line, so no label sits behind its type; the
       headline clears with it, so the closing line, which restates it, stands alone */
    const back = M.p(t, B.line, 0.7, 'inOutCubic');
    this.head.el.style.opacity = (1 - back).toFixed(3);
    this.tl.style.opacity = (M.prog(t, 0.3, 0.6) * (1 - back)).toFixed(3);
    this.axis.style.clipPath = `inset(0 ${((1 - M.p(t, 0.3, 1.2, 'outCubic')) * 100).toFixed(1)}% 0 0)`;
    M.fade(this.now, t, 1.6, 0.6);
    M.fade(this.nowl, t, 1.8, 0.6);
    this.now.style.opacity *= 0.75 + 0.25 * M.wave(Lv, 2.4);
    Talk.linesAt(this.cad, t, B.line + 0.3, 0.16);

    /* which lane has the floor */
    const focus = t < B.eu ? null : t < B.co ? 'euall' : t < B.bank ? 'co' : t < B.agents ? 'bank' : 'agents';
    const lanes = { eu: this.eu.root, eu1: this.eu1.root, co: this.co.root, bank: this.bk.root, agents: this.ag.root };
    /* on the agents beat the US bank lane stays lit beside it, and the rest of the calendar stays in view */
    const agOn = M.prog(t, B.agents + 0.6, 0.6);
    Object.entries(lanes).forEach(([k, el], i) => {
      const inn = k === 'agents' ? M.prog(t, B.agents + 0.6, 0.5) : M.prog(t, 0.6 + i * 0.15, 0.5);
      let lit = focus && focus !== k && !(focus === 'euall' && k.startsWith('eu')) ? 0.28 : 1;
      if (focus === 'agents') lit = k === 'agents' || k === 'bank' ? 1 : M.lerp(1, 0.45, agOn);
      el.style.opacity = (inn * lit).toFixed(3);
    });

    /* AI agents: three supervisors bring them in */
    this.agents.forEach(({ a, pin, lab }) => {
      const s = B.agents + a.at, p = M.p(t, s, 0.5, 'outCubic');
      pin.style.opacity = M.prog(t, s, 0.2).toFixed(3);
      pin.style.transform = `scale(${(0.3 + 0.7 * p + 0.25 * M.ramp(t, s + 0.2, s + 0.9, 0.15, 0.5)).toFixed(3)})`;
      M.rise(lab, t, s + 0.15, { dy: 10 });
    });

    /* EU: the pins detach and slide; the date ticks through the months as they go */
    this.euP.forEach((p, i) => {
      const s0 = B.eu + 0.3 + p.d, sp = M.p(t, s0, 1.8, 'inOutCubic');
      const x = M.lerp(p.a, p.b, sp);
      p.pin.style.left = x + 'px';
      M.fade(p.pin, t, 1.2 + i * 0.12, 0.3);
      p.pin.style.transform = `scale(${(1 + 0.25 * M.ramp(t, s0 - 0.25, s0 + 0.3, 0.15, 0.3)).toFixed(3)})`;
      const flip = x > 1520;
      p.lab.root.style.left = x + 26 + 'px';
      p.lab.root.style.transform = flip ? 'translateX(calc(-100% - 52px))' : 'none';
      p.lab.root.style.textAlign = flip ? 'right' : 'left';
      M.fade(p.lab.root, t, 1.3 + i * 0.12, 0.4);
      Talk.txt(p.labD, sp <= 0 ? p.from : sp >= 1 ? p.to : this.monthAt(x));
      p.labD.style.color = sp >= 1 ? 'var(--yellow)' : '';
      p.ghost.style.opacity = M.prog(t, s0, 0.3);
      p.gl.style.opacity = M.prog(t, s0 + 0.4, 0.4);
      p.trail.style.transform = `scaleX(${sp.toFixed(4)})`;
      p.trail.style.opacity = sp > 0 ? 1 : 0;
      Talk.txt(p.slip, i === 0 ? `+${T.eu.slipMonths} months` : '+12 months');
      M.rise(p.slip, t, s0 + 1.7, { dy: 10 });
    });

    /* Colorado: slides to June, breaks on the repeal, a different law lands in January */
    const G = this.coG, c = this.co;
    const s1 = M.p(t, B.co + 0.4, 1.2, 'inOutCubic');
    const cx = M.lerp(G.c0, G.c1, s1);
    const crack = M.prog(t, B.co + 2.1, 0.7);
    c.pin.style.left = cx + 'px';
    c.pin.style.opacity = (M.prog(t, 1.4, 0.3) * (crack > 0 ? 0 : 1)).toFixed(3);
    c.ghost.style.opacity = M.prog(t, B.co + 0.4, 0.3);
    c.trail.style.transform = `scaleX(${s1.toFixed(4)})`;
    c.trail.style.opacity = s1 > 0 ? (1 - 0.6 * crack).toFixed(3) : 0;
    [c.hl, c.hr].forEach((h, k) => {
      const dir = k ? 1 : -1, e = M.ease.outCubic(crack);
      h.style.left = G.c1 + 'px';
      /* the broken halves fall, then clear once the new law lands, so they never sit under the repeal label */
      h.style.opacity = crack > 0 ? ((1 - 0.4 * M.prog(t, B.co + 2.5, 0.8)) * (1 - M.prog(t, B.co + 3.6, 0.6))).toFixed(3) : 0;
      h.style.transform = `translate(${(dir * 16 * e).toFixed(1)}px, ${(26 * e * e).toFixed(1)}px) rotate(${(dir * 28 * e).toFixed(1)}deg)`;
    });
    Talk.htm(c.lab.root, s1 < 1 ? `${s1 <= 0 ? T.colorado.original.label : this.monthAt(cx)}<small>Takes effect</small>` : `${T.colorado.delayed.label}<small>Delayed</small>`);
    c.lab.root.style.left = cx + 26 + 'px';
    c.lab.root.style.opacity = (M.prog(t, 1.5, 0.4) * (1 - M.prog(t, B.co + 2.1, 0.3))).toFixed(3);
    M.rise(c.rep, t, B.co + 2.3, { dy: 10 });
    const nw = M.p(t, B.co + 3.0, 0.6, 'outCubic');
    c.nw.style.opacity = nw;
    c.nw.style.transform = `rotate(45deg) scale(${(0.3 + 0.7 * nw + 0.2 * M.ramp(t, B.co + 3.3, B.co + 4.0, 0.15, 0.5)).toFixed(3)})`;
    M.rise(c.nwl, t, B.co + 3.3, { dy: 10 });

    /* banks: the old guidance is cut, the new begins, and leaves AI agents out */
    const k = this.bk;
    const cut = M.p(t, B.bank + 0.4, 0.7, 'inOutCubic');
    k.old.style.clipPath = `inset(0 ${(cut * ((this.X1 - this.bkX) / (this.X1 - this.X0 + 10)) * 100).toFixed(2)}% 0 0)`;
    k.old.style.opacity = M.prog(t, 1.4, 0.4);
    k.oc.style.opacity = (M.prog(t, 1.4, 0.4) * (1 - 0.45 * M.prog(t, B.bank + 0.4, 0.3))).toFixed(3);
    const br = M.prog(t, B.bank + 0.4, 0.2);
    k.brk.style.opacity = (br * (0.75 + 0.25 * M.wave(Lv, 1.2))).toFixed(3);
    const ng = M.p(t, B.bank + 1.0, 1.0, 'outCubic');
    k.nw.style.transform = `scaleX(${ng.toFixed(4)})`;
    k.nw.style.opacity = ng > 0 ? 1 : 0;
    k.oc.querySelector('.since').style.opacity = (1 - M.prog(t, B.bank + 0.4, 0.3)).toFixed(3);
    k.nc.style.opacity = M.prog(t, B.bank + 1.6, 0.4);
    k.agx.style.opacity = M.prog(t, B.bank + 2.4, 0.5).toFixed(3);

    /* the source line for the beat on screen; the closing line has none */
    const marks = [0.8, B.co, B.bank, B.agents];
    let cur = 0;
    marks.forEach((m, i) => { if (t >= m) cur = i; });
    this.srcs.forEach((el, i) => { el.style.opacity = i === cur ? M.prog(t, marks[i] + 0.6, 0.5) * (1 - back) : 0; });
  },
});
