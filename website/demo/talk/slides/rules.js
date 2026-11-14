/* The rules moved this year. A 2026–2028 calendar of the deadlines as most people drew them in
   January; then, one beat each, the deadlines physically move: the EU's high-risk date slides sixteen
   months, Colorado's act slides and then breaks, SR 11-7 is cut and replaced by guidance whose footnote
   leaves agentic AI out; the calendar gives way to a field of state AI bills racing to this year's
   count; and the calendar returns with Canada's E-23 landing in 2027. Figures and sources: data/trends.js. */
registerSlide({
  id: 'rules',
  act: 'clocks',
  title: 'The rules moved this year',
  beats: [
    { t: 2.6, say: "Here's the regulatory calendar the way most of us drew it in January. A handful of dates, and a plan to meet each one." },
    { t: 7.0, say: (T) => `Europe's AI Act set the second of August 2026 for its high-risk rules. In July, a new EU regulation moved that date. Most high-risk systems now have until December 2027, and AI built into regulated products until August 2028. The best-known deadline in AI law slid ${T.eu.slipMonths} months, less than three months before it arrived. If you built a program around that August date, your plan changed because the law did.` },
    { t: 11.8, say: "Colorado passed the first broad state AI act in the country. It was due in February. Last August it was pushed to the end of June. Then in May the legislature repealed it and replaced it with a different law, whose duties start next January. The original never took effect. Whatever you prepared for the first law, you now get to re-read against the second." },
    { t: 17.0, say: "In April, the Fed, the OCC and the FDIC retired SR 11-7, the model risk guidance banks have lived under since 2011. Its replacement is SR 26-2. Read footnote three. Generative and agentic AI models, quote, are not within the scope of this guidance. The newest rulebook for bank models leaves out the newest kind of model. What it says instead is that a bank's own risk management should decide the right governance and controls. In other words, it's on you, and the examiner will still ask." },
    { t: 22.0, say: (T) => `Meanwhile the states keep writing. The National Conference of State Legislatures counted ${T.states.y2025.introduced.toLocaleString('en-US')} AI bills in the states last year, and ${T.states.y2025.enacted} enacted. This year, by early October: ${T.states.y2026.introduced.toLocaleString('en-US')} bills, and ${T.states.y2026.enacted} enacted. And last December a federal executive order set up a Justice Department task force whose job is to challenge state AI laws. So you're not only tracking the legislatures. You're tracking the fight between them and Washington.` },
    { t: 25.6, say: "And in Canada, OSFI's Guideline E-23 takes effect in May 2027, with a definition of a model that includes AI. Like SR 26-2, it sets no fixed interval for reviewing a model. Both say the review should match the risk. So the rules change monthly. Sometimes it's a new law. Sometimes it's a deadline that moves, a law replaced before it starts, or guidance that is silent on exactly the systems you're deploying." },
  ],

  X0: 470, X1: 1770,
  LANES: { eu: 372, eu1: 482, co: 592, bank: 702, osfi: 812 },
  B: { eu: 3.2, co: 7.6, bank: 12.0, quote: 14.0, states: 17.2, osfi: 22.2 },

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
      .sl-rul .tl, .sl-rul .st { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-rul .tl > *, .sl-rul .st > *, .sl-rul .lane > * { position: absolute; }
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
      .sl-rul .qcard { left: 300px; top: 330px; width: 1320px; padding: 54px 64px 50px; }
      .sl-rul .qcard .k { font: 600 var(--t-label)/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--yellow); margin-bottom: 28px; }
      .sl-rul .qcard q { display: block; font: 700 52px/1.16 var(--sans); letter-spacing: -.02em; color: var(--ink); quotes: '“' '”'; }
      .sl-rul .qcard q b { color: var(--yellow); font-weight: 700; }
      .sl-rul .qcard .by { margin-top: 30px; font: 500 28px/1.2 var(--sans); color: var(--ink-2); }
      .sl-rul .dim { left: 0; top: 200px; width: 1920px; height: 800px; background: rgba(0,0,0,.72); }
      .sl-rul .st .lab { left: 150px; top: 300px; width: 560px; }
      .sl-rul .st .lab .k { font: 700 36px/1.15 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-rul .st .lab .big { font: 700 176px/1 var(--sans); letter-spacing: -.05em; color: var(--ink); margin: 30px 0 6px; font-variant-numeric: tabular-nums; }
      .sl-rul .st .lab .yr2 { font: 600 30px/1.2 var(--sans); color: var(--ink-2); }
      .sl-rul .st .lab .en { margin-top: 26px; font: 700 44px/1.1 var(--sans); color: var(--yellow); font-variant-numeric: tabular-nums; }
      .sl-rul .st .lab .ly { margin-top: 34px; font: 500 30px/1.3 var(--sans); color: var(--ink-2); font-variant-numeric: tabular-nums; }
      .sl-rul .st svg.f { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-rul .st .f path { fill: none; stroke-linecap: round; }
      .sl-rul .st .leg { left: 760px; top: 962px; display: flex; gap: 40px; font: 500 26px/1 var(--sans); color: var(--ink-2); }
      .sl-rul .st .leg i { display: inline-block; width: 16px; height: 16px; border-radius: 50%; margin-right: 12px; vertical-align: -1px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['The rules <span class="tk-y">moved this year.</span>']);

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
    this.co.rep = M.mount(this.co.root, `<div class="pl red" style="left:${c1 + 30}px">Repealed<small style="color:var(--red)">${C.replaced.label}</small></div>`).root;
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
    this.bk.nc = M.mount(this.bk.root, `<div class="bchip" style="left:${b0 + 30}px;color:var(--yellow)">${K.new.id} <span style="font-weight:500;color:var(--ink-2)">${K.new.date}</span></div>`).root;

    /* Canada: lands in 2027 */
    this.os = lane('osfi', 'Canada', 'OSFI Guideline E-23');
    const o0 = this.x(T.osfi.date);
    this.os.pin = M.mount(this.os.root, `<div class="pin y" style="left:${o0}px"></div>`).root;
    this.os.lab = M.mount(this.os.root, `<div class="pl y" style="left:${o0 + 30}px">${T.osfi.effective}<small>Takes effect</small></div>`).root;

    /* SR 26-2, footnote 3 */
    this.dim = M.mount(root, `<div class="dim"></div>`).root;
    this.q = M.mount(root, `<div class="qcard tk-card hot"><div class="k">SR 26-2 · Footnote 3</div>
      <q>Generative AI and agentic AI models are novel and rapidly evolving. As such, they are <b>not within the scope of this guidance.</b></q>
      <div class="by">${K.new.by} · ${K.new.date}</div></div>`).root;

    /* the state bill field */
    const st = (this.st = M.html('<div class="st"></div>'));
    root.appendChild(st);
    const S = T.states;
    this.stL = M.mount(st, `<div class="lab"><div class="k">AI bills introduced<br>in US state legislatures</div>
      <div class="big" data-k="big">0</div><div class="yr2" data-k="yr">2025</div><div class="en" data-k="en"></div>
      <div class="ly" data-k="ly">2025: ${S.y2025.introduced.toLocaleString('en-US')} introduced, ${S.y2025.enacted} enacted</div>
      <div class="ly" data-k="eo">Federal: a task force to challenge state AI laws</div></div>`);
    const fsvg = M.html('<svg class="f" viewBox="0 0 1920 1080"></svg>');
    st.appendChild(fsvg);
    this.fDim = M.svg('path', { style: 'stroke:rgba(241,241,241,.62);stroke-width:13' }, fsvg);
    this.fNew = M.svg('path', { style: 'stroke:rgba(241,241,241,.62);stroke-width:13' }, fsvg);
    this.fEn = M.svg('path', { style: 'stroke:var(--yellow);stroke-width:13' }, fsvg);
    this.leg = M.mount(st, `<div class="leg"><span><i style="background:rgba(241,241,241,.62)"></i>One bill</span><span><i style="background:var(--yellow)"></i>Enacted</span></div>`).root;
    /* the field: 50 x 31 at a 21 px pitch; dots are numbered in a scattered order so the field fills
       evenly; enacted bills are a spread subset */
    const COLS = 50, P = 21, FX = 770, FY = 300;
    this.dots = [];
    for (let i = 0; i < COLS * 31; i++) this.dots.push({ x: FX + (i % COLS) * P, y: FY + Math.floor(i / COLS) * P, k: M.noise(i * 1.37 + 0.11) });
    this.dots.sort((a, b) => a.k - b.k);
    this.dots.forEach((d, i) => (d.en = M.noise(i * 3.1 + 7.7) < S.y2026.enacted / S.y2026.introduced));

    /* the source for the beat on screen */
    const pend = (s) => (s === 'pending' ? ' <span class="tk-pend">Source pending</span>' : '');
    this.srcs = [
      `Dates as enacted. EU: Regulation (EU) 2024/1689.${pend(E.status)} Colorado: SB24-205.`,
      `${E.source}${pend(E.status)}`,
      `${C.source}`,
      `${K.source}`,
      `${S.source} · Executive Order 14365, 11 Dec 2025`,
      `${T.osfi.source}`,
    ].map((h) => M.mount(root, `<div class="src"><div class="tk-src">${h}</div></div>`).root);
  },

  at(t) {
    const M = Mock, B = this.B, Lv = M.abs(t), T = window.TRENDS;
    Talk.linesAt(this.head, t, 0.1);

    /* the calendar comes in, then gives way to the bill field and returns */
    const away = M.p(t, B.states, 0.6, 'inOutCubic') * (1 - M.p(t, B.osfi, 0.7, 'inOutCubic'));
    this.tl.style.opacity = ((1 - away) * M.prog(t, 0.3, 0.6)).toFixed(3);
    this.tl.style.transform = away ? `scale(${(1 + 0.04 * away).toFixed(4)})` : 'none';
    this.tl.style.transformOrigin = '960px 500px';
    this.axis.style.clipPath = `inset(0 ${((1 - M.p(t, 0.3, 1.2, 'outCubic')) * 100).toFixed(1)}% 0 0)`;
    M.fade(this.now, t, 1.6, 0.6);
    M.fade(this.nowl, t, 1.8, 0.6);
    this.now.style.opacity *= 0.75 + 0.25 * M.wave(Lv, 2.4);

    /* which lane has the floor */
    const focus = t < B.eu ? null : t < B.co ? 'euall' : t < B.bank ? 'co' : t < B.states ? 'bank' : null;
    const lanes = { eu: this.eu.root, eu1: this.eu1.root, co: this.co.root, bank: this.bk.root, osfi: this.os.root };
    Object.entries(lanes).forEach(([k, el], i) => {
      const inn = k === 'osfi' ? M.prog(t, B.osfi + 0.6, 0.5) : M.prog(t, 0.6 + i * 0.15, 0.5);
      const lit = focus && focus !== k && !(focus === 'euall' && k.startsWith('eu')) ? 0.28 : 1;
      el.style.opacity = (inn * lit).toFixed(3);
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
      h.style.opacity = crack > 0 ? (1 - 0.4 * M.prog(t, B.co + 2.5, 0.8)).toFixed(3) : 0;
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

    /* banks: the old guidance is cut, the new begins; then footnote three */
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
    const qv = M.p(t, B.quote, 0.7) * (1 - M.p(t, B.states, 0.4, 'inOutCubic'));
    this.q.style.opacity = qv.toFixed(3);
    this.q.style.transform = `translateY(${((1 - M.p(t, B.quote, 0.9)) * 26).toFixed(1)}px) scale(${(0.97 + 0.03 * M.p(t, B.quote, 0.9)).toFixed(4)})`;
    this.dim.style.opacity = (0.95 * qv).toFixed(3);

    /* the state bill field */
    const S = T.states, sv = M.p(t, B.states + 0.4, 0.6) * (1 - M.p(t, B.osfi, 0.5, 'inOutCubic'));
    this.st.style.opacity = sv.toFixed(3);
    this.st.style.display = sv > 0.001 ? '' : 'none';
    if (sv > 0.001) {
      const a = M.ease.outCubic(M.prog(t, B.states + 0.6, 1.3));          /* 2025 fills */
      const b = M.ease.inOutCubic(M.prog(t, B.states + 2.4, 2.0));        /* then this year */
      const n25 = Math.round(S.y2025.introduced * a);
      const n = Math.round(M.lerp(n25, S.y2026.introduced, b));
      const en = Math.round(M.lerp(S.y2025.enacted * a, S.y2026.enacted, b));
      Talk.txt(this.stL.big, n.toLocaleString('en-US'));
      Talk.txt(this.stL.yr, b > 0 ? '2026, to early October' : '2025');
      this.stL.yr.style.color = b > 0 ? 'var(--ink)' : '';
      Talk.txt(this.stL.en, `${en} enacted`);
      this.stL.ly.style.opacity = M.prog(t, B.states + 2.4, 0.5);
      this.stL.eo.style.opacity = M.prog(t, B.states + 4.0, 0.5);
      this.leg.style.opacity = M.prog(t, B.states + 1.2, 0.5);
      if (this._n !== n || this._e !== en) {
        this._n = n; this._e = en;
        let dd = '', dn = '', de = '';
        let enLeft = en;
        for (let i = 0; i < n; i++) {
          const d = this.dots[i], seg = `M${d.x},${d.y}h0`;
          if (d.en && enLeft > 0) { de += seg; enLeft--; }
          else if (i >= S.y2025.introduced) dn += seg;
          else dd += seg;
        }
        this.fDim.setAttribute('d', dd); this.fNew.setAttribute('d', dn); this.fEn.setAttribute('d', de);
      }
      this.fEn.style.opacity = (0.8 + 0.2 * M.wave(Lv, 2.2)).toFixed(3);
    }

    /* the source line for the beat on screen */
    const marks = [0.8, B.eu, B.co, B.bank, B.states, B.osfi];
    let cur = 0;
    marks.forEach((m, i) => { if (t >= m) cur = i; });
    this.srcs.forEach((el, i) => { el.style.opacity = i === cur ? M.prog(t, marks[i] + (i ? 0.6 : 0.6), 0.5) : 0; });
  },
});
