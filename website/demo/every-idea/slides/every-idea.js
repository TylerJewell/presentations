/* Every idea: one continuous shot over the plain of ideas, in ten beats, one spoken sentence each.

   A dot is an idea. It is grey until AI has written its code, white once the code exists, and yellow once
   the system is in production on Akka. The first idea, Loan origination, is followed from a lone point to a
   running system; every other idea then takes the same path. The horizon is the Akka runtime: it is drawn
   before any factory line, and every line over the ground ends on it.

   The word "ideation" stands above the plain from the first second. When AI arrives, the letters AI take
   the place of its "a", in yellow. */
registerSlide({
  id: 'every-idea',
  act: 'film',
  title: 'Every idea',
  beats: [
    { t: 5.5, say: 'Every enterprise has more ideas than it can build.' },
    { t: 9.3, say: 'Put AI inside ideation, and every idea can become a software system.' },
    { t: 11.9, say: 'AI writes code in minutes.' },
    { t: 15.1, say: 'An enterprise needs a system it trusts in production.' },
    { t: 22.6, say: 'Akka is an AI platform that turns any idea into a system that is ready for production, and keeps it trustworthy once it runs.' },
    { t: 32.2, say: 'Only Akka combines the path from an idea to a specification, the pipeline that builds and checks the system, and the runtime the system is built for.' },
    { t: 38.2, say: 'Because the runtime is known before any code is generated, AI writes less, and reviewers review less.' },
    { t: 41.2, say: 'Every release carries a receipt.' },
    { t: 45.4, say: 'Every idea gets its own software factory.' },
    { t: 48.4, say: 'Akka is the platform for enterprise ideAItion.' },
  ],

  // Camera poses: close on the first idea, wide with the horizon a third of the way down, and a push-in.
  CLOSE: { dist: 130, elev: 0.30, tz: 0 },
  WIDE: { dist: 1911.3, elev: 0.2323, tz: 1271 },
  NEAR: { dist: 560, elev: 0.36, tz: 40 },
  STATION_Z: [700, 2500],          // ground distance of the specification and pipeline stations
  RINGS: [{ r: 80, name: 'Reviewed' }, { r: 130, name: 'Resilient' }, { r: 180, name: 'Governed' }],
  BARS: [72, 54, 88, 40, 66, 80, 35],

  render(root) {
    const M = Mock, T = Talk;
    root.classList.add('sl-ei');
    M.style('sl-ei', `
      .sl-ei .sky { left: 0; right: 0; text-align: center; }
      .sl-ei .word { left: 0; top: 104px; width: 1920px; height: 150px; }
      .sl-ei .word span { position: absolute; left: 0; top: 0; white-space: nowrap; font: 700 150px/.96 var(--sans); letter-spacing: -.045em; color: var(--ink); }
      .sl-ei .word .ai { color: var(--yellow); }
      .sl-ei .eb { top: 52px; }
      .sl-ei .pr { top: 104px; }
      .sl-ei .pr .t { font: 700 58px/1.12 var(--sans); letter-spacing: -.035em; color: var(--ink); }
      .sl-ei .hd { top: 96px; }
      .sl-ei .hd .t { font: 700 70px/1.06 var(--sans); letter-spacing: -.04em; color: var(--ink); }
      .sl-ei .rt { left: 1310px; top: 358px; display: flex; gap: 18px; align-items: baseline; font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; }
      .sl-ei .rt b { font-weight: 600; color: var(--yellow); }
      .sl-ei .rt span { color: var(--ink-3); }
      .sl-ei .stn, .sl-ei .rl { font: 600 21px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink); white-space: nowrap; background: #000; padding: 6px 8px; }
      .sl-ei .rl { color: var(--ink-2); }
      .sl-ei .card { box-sizing: border-box; background: #000; border: 1px solid var(--line); border-radius: 14px; padding: 22px 28px 24px; }
      .sl-ei .card .ch { font: 600 20px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-ei .code { left: 250px; top: 170px; width: 400px; }
      .sl-ei .code .chip { float: right; font: 600 18px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
      .sl-ei .code .bar { height: 10px; margin-top: 14px; border-radius: 5px; background: #6b6b6b; transform-origin: 0 50%; }
      .sl-ei .ei-cmd { left: 110px; top: 426px; width: 610px; }
      .sl-ei .ei-ver { left: 1200px; top: 426px; width: 610px; }
      .sl-ei .rc { box-sizing: border-box; left: 795px; top: 770px; width: 330px; background: #000; border: 1px solid rgba(255, 206, 74, .7); border-radius: 14px; padding: 18px 24px 20px; }
      .sl-ei .rc .ch { font: 600 18px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-ei .rc .ok { margin-top: 10px; font: 700 30px/1.1 var(--sans); letter-spacing: -.02em; color: var(--ink); }
      .sl-ei .rc .ln3 { margin-top: 10px; font: 500 19px/1.2 var(--sans); color: var(--ink-2); }
      .sl-ei .mk { top: 100px; }
      .sl-ei .cl { top: 210px; font: 600 42px/1.2 var(--sans); letter-spacing: -.02em; color: var(--ink); }
    `);
    this.plain = Plain.create(root, -this.WIDE.dist * Math.cos(this.WIDE.elev));
    const sky = (cls) => root.appendChild(M.html(`<div class="sky ${cls}"></div>`));

    // The word in four parts, so that AI can take the place of the "a" and the rest can make room.
    this.word = M.mount(root, '<div class="word"><span data-k="ide">ide</span><span data-k="a">a</span><span data-k="ai" class="ai">AI</span><span data-k="tion">tion</span></div>');
    this.wordW = null;       // measured on the first frame: a slide has no layout until it is shown

    this.eb = M.mount(root, '<div class="sky eb tk-eb">The Akka Agentic AI Platform</div>').root;
    this.pr = T.lines(sky('pr'), ['Akka turns <span class="tk-y">any idea</span> into a system', 'that is ready for production,', 'and keeps it trustworthy once it runs.'], 't');
    this.h2 = T.lines(sky('hd'), ['Only Akka combines the specification,', 'the pipeline and the runtime.'], 't');
    this.h3 = T.lines(sky('hd'), ['The runtime is known', 'before any code is generated.'], 't');
    this.h4 = T.lines(sky('hd'), ['Every idea gets', 'its own software factory.'], 't');
    this.rt = M.mount(root, '<div class="rt"><b>Akka runtime</b><span>Since 2009</span></div>').root;
    this.stn = ['Specification', 'Pipeline'].map((s) => M.mount(root, `<div class="stn">${s}</div>`).root);
    this.rl = this.RINGS.map((g) => M.mount(root, `<div class="rl">${g.name}</div>`).root);
    this.code = M.mount(root, `<div class="card code"><span class="chip">Minutes</span><div class="ch">Generated code</div>${this.BARS.map((w) => `<div class="bar" style="width:${w}%"></div>`).join('')}</div>`).root;
    this.bars = [...this.code.querySelectorAll('.bar')];

    // What Akka Specify does, on the left; how the result is verified and what it runs on, on the right.
    this.cmd = Panels.commands(root);
    this.ver = Panels.verify(root);
    this.rc =M.mount(root, '<div class="rc"><div class="ch">Receipt</div><div class="ok">Ready to ship</div><div class="ln3">Verified · Open · Waivers</div></div>').root;
    this.mk = M.mount(root, `<div class="sky mk">${M.markSVG(70)}</div>`).root;
    this.cl = M.mount(root, '<div class="sky cl">Akka is the platform for enterprise ide<span class="tk-y">AI</span>tion.</div>').root;
  },

  at(t) {
    const M = Mock, T = Talk;
    const span = (a, b) => M.clamp((t - a) / (b - a));
    const sm = (x) => x * x * x * (x * (x * 6 - 15) + 10);
    const io = M.ease.inOutCubic, out3 = M.ease.outCubic;
    const live = M.abs ? M.abs(t) : t;

    // Camera: close, crane to wide, push in on the idea, and back to wide for the rest of the film.
    const mix = (a, b, k) => ({ dist: a.dist * Math.pow(b.dist / a.dist, k), elev: M.lerp(a.elev, b.elev, k), tz: M.lerp(a.tz, b.tz, k) });
    const crane = sm(span(1.2, 5.3));
    let cam = mix(this.CLOSE, this.WIDE, crane);
    cam = mix(cam, this.NEAR, sm(span(9.6, 11.8)));
    cam = mix(cam, this.WIDE, sm(span(15.4, 18.6)));
    cam.x = 8 * Math.sin((live * 2 * Math.PI) / 12) * crane;     // a slow sway keeps a held frame alive

    const wave = (a, b) => (t >= b ? 1e9 : Plain.REACH * Math.pow(span(a, b), 2.6));
    const cards = 1 - span(41.5, 42.1);
    const cmdA = out3(span(24.6, 25.4)) * cards, verA = out3(span(28.4, 29.2)) * cards, codeA = out3(span(10.6, 11.3)) * (1 - span(15.3, 15.9));
    const receipt = out3(span(39.8, 40.6)) * cards;
    const closing = [0, 1, 2].map((k) => io(span(39.0 + 0.15 * k, 40.0 + 0.15 * k)));
    const o = this.plain.draw({
      cam,
      reach: Plain.REACH * Math.pow(crane, 1.6),
      white: wave(5.7, 8.1),
      yellow: wave(42.0, 44.8),
      heroYellow: span(39.4, 39.9),
      // The first idea is named from the start, so the lone light reads as an idea. The other names follow with
      // the plain. Names leave before the camera pushes in, and the first idea's name returns with the push-in.
      names: [0, 1, 2, 3, 4].map((i) => out3(i ? span(3.6 + 0.2 * i, 4.4 + 0.2 * i) : span(0.9, 1.6)) * (1 - span(8.6, 9.1)) + (i ? 0 : out3(span(10.2, 10.9)) * (1 - span(41.5, 42.1)))),
      lonely: 1 - span(1.2, 1.8),
      lonelyPhase: (live % 1.6) / 1.6,
      rings: this.RINGS.map((g, k) => ({ r: g.r, p: 0.8 * out3(span(12.2 + 0.7 * k, 13.2 + 0.7 * k)) + 0.2 * closing[k], closed: closing[k], a: cards })),
      stationZ: this.STATION_Z,
      stationA: cards,
      line: io(span(24.4, 26.2)) + io(span(26.6, 28.6)) + io(span(29.2, 31.4)),
      lineA: 0.95,
      ship: span(40.2, 41.0),
      lines: span(42.0, 44.6),
      horizonLine: out3(span(19.4, 21.6)),
      horizonPulse: span(33.6, 35.0),
      leaders: [
        { from: [650, 300], to: 'hero', a: codeA },
        { from: [720, 560], to: 0, a: cmdA * span(26.0, 26.4) },
        { from: [1200, 520], to: 1, a: verA * span(28.8, 29.2) },
        { from: [960, 770], to: 'hero', a: receipt },
      ],
    });

    // The word: "ideation" from the first second; AI takes the place of its "a" as the white wave leaves.
    if (!this.wordW || !this.wordW.ide) this.wordW = { ide: this.word.ide.offsetWidth, a: this.word.a.offsetWidth, ai: this.word.ai.offsetWidth, tion: this.word.tion.offsetWidth };
    const w = this.wordW, swapAI = io(span(5.8, 6.6));
    const mid = M.lerp(w.a, w.ai, swapAI), x0 = (1920 - (w.ide + mid + w.tion)) / 2;
    const wordA = M.ease.css(span(0.5, 1.2)) * (1 - io(span(9.5, 10.0)));
    this.word.root.style.opacity = wordA;
    this.word.root.style.transform = `translateY(${((1 - out3(span(0.5, 1.4))) * 22).toFixed(2)}px)`;
    this.word.ide.style.transform = `translateX(${x0.toFixed(2)}px)`;
    // The two fades overlap, so the middle of the word is never empty.
    M.set(this.word.a, { transform: `translateX(${(x0 + w.ide).toFixed(2)}px)`, opacity: 1 - M.clamp(swapAI / 0.6) });
    M.set(this.word.ai, { transform: `translateX(${(x0 + w.ide).toFixed(2)}px)`, opacity: M.clamp((swapAI - 0.3) / 0.7) });
    this.word.tion.style.transform = `translateX(${(x0 + w.ide + mid).toFixed(2)}px)`;

    // The sky: one line of type at a time.
    const swap = (h, a, b) => { T.linesAt(h, t, a, 0.14, 1.0); h.el.style.opacity = 1 - io(span(b, b + 0.5)); };
    M.riseOut(this.eb, t, 16.6, 22.9);
    swap(this.pr, 16.8, 22.9);
    swap(this.h2, 23.3, 32.5);
    swap(this.h3, 33.0, 41.5);
    swap(this.h4, 42.0, 45.7);
    M.rise(this.mk, t, 46.2);
    M.rise(this.cl, t, 46.6);
    M.riseOut(this.rt, t, 21.2, 45.7);

    // Marks on the ground carry their names.
    const place = (el, s, dx, dy, a, right) => {
      el.style.opacity = s ? a : 0;
      if (s) el.style.transform = `translate(${(s[0] + dx).toFixed(1)}px, ${(s[1] + dy).toFixed(1)}px)${right ? ' translateX(-100%)' : ''}`;
    };
    place(this.stn[0], o.stations[0], 18, -17, out3(span(26.0, 26.6)) * cards, false);
    place(this.stn[1], o.stations[1], -18, -17, out3(span(28.4, 29.0)) * cards, true);
    this.RINGS.forEach((g, k) => {
      const s = o.project(0, -g.r);
      this.rl[k].style.opacity = out3(span(12.8 + 0.7 * k, 13.4 + 0.7 * k)) * (1 - span(15.3, 15.9));
      if (s) this.rl[k].style.transform = `translate(${s[0].toFixed(1)}px, ${(s[1] + 12).toFixed(1)}px) translateX(-50%)`;
    });

    // The code AI writes arrives at once.
    this.code.style.opacity = codeA;
    this.bars.forEach((b, i) => { b.style.transform = `scaleX(${out3(span(10.9 + 0.07 * i, 11.15 + 0.07 * i)).toFixed(3)})`; });

    // The commands run in turn while the line is drawn. Conform runs until every exit condition has passed.
    const lift = (el, a) => M.set(el, { opacity: a, transform: `translateY(${((1 - a) * 18).toFixed(1)}px)` });
    const pass = span(38.4, 39.3);
    const step = (a, b) => ({ progress: span(a, b), done: span(b, b + 0.3) });
    lift(this.cmd.el, cmdA);
    this.cmd.set([
      step(25.4, 26.6), step(27.0, 28.0), step(28.2, 29.4),
      { progress: t >= 29.6 ? Math.max(0.001, pass) : 0, done: span(39.3, 39.6) },
      step(39.6, 40.2),
    ], live / 0.9);

    // The three conditions the runtime guarantees are met before any code exists; the rest pass in a sweep.
    // In the cluster, one replica fails and its sessions resume on the others, then a new replica joins.
    lift(this.ver.el, verA);
    this.ver.set({
      cells: span(28.8, 29.9),
      runtime: [0, 1, 2].map((k) => span(34.0 + 0.25 * k, 34.35 + 0.25 * k)),
      pass,
      cluster: span(30.4, 31.2),
      fail: span(35.0, 35.3), move: span(35.3, 36.3), join: span(36.6, 37.0), share: span(37.0, 38.0),
    });
    lift(this.rc, receipt);
  },
});
