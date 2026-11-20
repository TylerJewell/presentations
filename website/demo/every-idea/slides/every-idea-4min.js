/* Every idea, the four-minute film: one continuous shot over the plain of ideas, in 32 beats, one spoken
   sentence each. storyboard-4min.md gives the picture for every beat.

   The shot has six parts. It opens as the one-minute film does: one idea, the plain, AI, and what Akka is. The
   camera then comes down and travels along Loan origination's factory line while the Akka Specify commands
   run on the left and one drawing at a time stands on the right. At the end of the travel the horizon opens
   into a band, which is the runtime seen close. The band closes, the camera rises, and six stations cross
   every idea's line. The ideas reach production, every bulb turns yellow, and the film closes on the ask.

   Every time below is a time on this slide's own clock. A beat's hold is the last moment of its animation. */
registerSlide({
  id: 'every-idea-4min',
  act: 'film',
  title: 'Every idea, in four minutes',
  beats: [
    { t: 5.5, say: 'Every enterprise has more ideas than it can build.' },
    { t: 9.3, say: 'Put AI inside ideation, and every idea can become a software system.' },
    { t: 15.1, say: 'AI writes code in minutes, but an enterprise needs a system that is ready for production.' },
    { t: 22.6, say: 'Akka is an AI platform that turns any idea into a system that is ready for production, and keeps it trustworthy once it runs.' },
    { t: 31.6, say: 'Only Akka combines the path from an idea to a specification, the pipeline that builds and checks the system, and the runtime the system is built for.' },
    { t: 38.6, say: 'Because the runtime is known before any code is generated, AI writes less, and reviewers review less.' },
    { t: 43.2, say: 'The design space is fixed before code is generated.' },
    { t: 50.2, say: 'AI generates only from Akka components, and each system is still its own design.' },
    { t: 59.2, say: 'The hardest requirements are satisfied by the runtime: identity, durability, replication, failover, scaling, sharding, circuit breakers, caching, and backpressure.' },
    { t: 63.4, say: "An enterprise's requirements are written as exit conditions." },
    { t: 69.4, say: 'A machine checks each condition wherever it can, and the human attestations are recorded alongside.' },
    { t: 73.8, say: 'The enterprise tightens the conditions where it needs to.' },
    { t: 79.4, say: 'A conformance receipt states that the system is ready to ship.' },
    { t: 87.4, say: 'The laptop runtime and the production runtime are the same, so the system goes to production as it was built.' },
    { t: 92.4, say: 'The system stays trustworthy after the build.' },
    { t: 99.0, say: 'The security, identity, controls, and interaction model that applied at build time also apply in production.' },
    { t: 107.2, say: 'Every change to a specification is documented with a machine-generated receipt of what was verified, what remains open, and any waivers.' },
    { t: 114.0, say: 'The receipts are an evidence trail that a requirement a user asked for was implemented and verified.' },
    { t: 120.6, say: 'Akka captures production traces, evaluations, and cost, and they feed the next improvement to the specification.' },
    { t: 127.6, say: 'Akka systems run wherever you need them: in our cloud, in your datacenter, or in a sovereign cloud.' },
    { t: 135.0, say: 'Every idea goes through the same stations: discovery, specify, plan, build, conform, and ship.' },
    { t: 139.6, say: 'Every station passes versioned records to the next.' },
    { t: 146.2, say: "Where a decision is ambiguous, a human is asked to provide the clarifications needed to eliminate the ambiguity, and the answers are recorded with the station's records." },
    { t: 151.4, say: 'The organization sees its portfolio of ideas, and where each idea stands.' },
    { t: 157.0, say: 'Akka can rebuild and replatform an existing system to functional and behavioral parity with the original system.' },
    { t: 161.6, say: 'Akka uses the existing system as a testbed and answer key.' },
    { t: 166.2, say: 'Feedback, spend, and human judgement decide which idea goes next.' },
    { t: 172.4, say: 'Roadmap compression is the number of projects planned for 2028 that you deliver in 2027.' },
    { t: 179.0, say: 'Legacy liability reduction is the saving from the technical debt, unsupported software, mainframes, and licenses you retire.' },
    { t: 183.6, say: 'Every idea gets its own software factory.' },
    { t: 187.0, say: 'Akka is the platform for enterprise ideAItion.' },
    { t: 190.0, say: 'Contact us, and we will show you how we can deliver your idea in as little as a day.' },
  ],

  // Camera poses. TRAVEL is low on the first idea's line and moves forward by its z. HIGH is far enough up for
  // the ground between the ideas and the horizon to hold six stations. All but CLOSE and NEAR put the horizon
  // a third of the way down.
  CLOSE: { dist: 130, elev: 0.30, tz: 0 },
  WIDE: { dist: 1911.3, elev: 0.2323, tz: 1271 },
  NEAR: { dist: 560, elev: 0.36, tz: 40 },
  TRAVEL: { dist: 700, elev: 0.29, tz: 754 },
  HIGH: { dist: 3200, elev: 0.30, tz: 3676 },
  STATION_Z: [700, 2500],          // ground distance of the specification and pipeline marks on the first idea's line
  RINGS: [{ r: 80, name: 'Reviewed' }, { r: 130, name: 'Resilient' }, { r: 180, name: 'Governed' }],
  BARS: [72, 54, 88, 40, 66, 80, 35],
  // The six stations, by ground distance. The distances even out their spacing on screen from the HIGH pose.
  STATIONS: [['Discovery', 760], ['Specify', 1320], ['Plan', 1990], ['Build', 2840], ['Conform', 3960], ['Ship', 5475]],
  // Marked ideas after the five named ones: four existing systems and one idea a person holds back.
  MORE: [{ text: 'Existing system', ix: -19, iz: 4, built: true }, { text: 'Existing system', ix: 17, iz: 12, built: true },
    { text: 'Existing system', ix: -5, iz: -9, built: true }, { text: 'Existing system', ix: 22, iz: -9, built: true }, { text: 'On hold', ix: 6, iz: -13 }],
  // Fifteen more ideas are named while the plain is first seen, so the opening shows twenty names. They are
  // listed in the order they appear: the ones at the frame's edges last, when the camera is high enough to hold them.
  OPENING: [{ text: 'Dispute resolution', ix: 3, iz: -5 }, { text: 'Customer onboarding', ix: -4, iz: -7, left: 1 }, { text: 'Service desk', ix: -10, iz: 2, left: 1 },
    { text: 'Treasury forecasting', ix: 5, iz: -11 }, { text: 'Policy underwriting', ix: -1, iz: -13, left: 1 }, { text: 'Mortgage servicing', ix: -11, iz: -10 },
    { text: 'Collections', ix: 2, iz: 16 }, { text: 'Pricing engine', ix: 24, iz: 26 }, { text: 'Regulatory reporting', ix: -28, iz: 24 },
    { text: 'Wealth advice', ix: -10, iz: 38, left: 1 }, { text: 'Trade settlement', ix: 12, iz: 46 }, { text: 'Document intake', ix: -7, iz: -15 },
    { text: 'Credit scoring', ix: -22, iz: 4 }, { text: 'Identity verification', ix: 15, iz: -7, left: 1 }, { text: 'Contract review', ix: 9, iz: -14, left: 1 }],
  LIABILITY: ['Technical debt', 'Unsupported software', 'Mainframe', 'Licenses'],
  YEARS: ['2027', '2027', '2028', '2028', '2029'],
  LEFT: [0, 0, 1, 0, 1, 1, 0, 1, 1, 0],
  // When each of the nine words and each of the six stations is spoken, measured from the recorded lines.
  WORD_T: [52.79, 53.38, 54.03, 54.77, 55.26, 55.81, 56.39, 57.15, 57.64],
  STATION_T: [129.98, 130.73, 131.54, 132.16, 132.79, 133.57],
  WORDS: ['Identity', 'Durability', 'Replication', 'Failover', 'Scaling', 'Sharding', 'Circuit breakers', 'Caching', 'Backpressure'],
  // One headline at a time in the black above the horizon: its lines, when it rises and when it leaves.
  HEADS: [
    [['Only Akka combines the specification,', 'the pipeline and the runtime.'], 23.3, 31.6],
    [['The runtime is known', 'before any code is generated.'], 32.1, 38.7],
    [['AI generates only', 'from Akka components.'], 39.2, 50.3],
    [['The runtime satisfies', 'the hardest requirements.'], 50.8, 59.3],
    [['Exit conditions define', 'when a system is done.'], 59.8, 73.9],
    [['Every release', 'carries a receipt.'], 74.4, 79.5],
    [['The laptop runtime and the', 'production runtime are the same.'], 80.0, 87.5],
    [['The system stays trustworthy', 'after the build.'], 88.0, 92.3],
    [['The controls at build time', 'apply in production.'], 92.7, 99.1],
    [['Every change', 'carries a receipt.'], 99.5, 114.1],
    [['Production feeds', 'the next specification.'], 114.6, 120.9],
    [['Akka systems run', 'where you need them.'], 121.4, 127.7],
    [['Every idea goes through', 'the same stations.'], 128.3, 146.3],
    [['The portfolio shows', 'where each idea stands.'], 146.8, 151.5],
    [['An existing system is rebuilt', 'to parity with the original.'], 152.0, 161.7],
    [['Feedback, spend and judgement', 'decide which idea goes next.'], 162.2, 166.3],
    [['Projects planned for 2028', 'are delivered in 2027.'], 166.8, 172.5],
    [['Legacy liabilities', 'are retired.'], 173.0, 179.1],
    [['Every idea gets', 'its own software factory.'], 179.6, 183.9],
  ],

  render(root) {
    const M = Mock, T = Talk, D = Drawings;
    root.classList.add('sl-e4');
    M.style('sl-e4', `
      .sl-e4 .sky { left: 0; right: 0; text-align: center; }
      .sl-e4 .word { left: 0; top: 104px; width: 1920px; height: 150px; }
      .sl-e4 .word span { position: absolute; left: 0; top: 0; white-space: nowrap; font: 700 150px/.96 var(--sans); letter-spacing: -.045em; color: var(--ink); }
      .sl-e4 .word .ai { color: var(--yellow); }
      .sl-e4 .eb { top: 52px; }
      .sl-e4 .pr { top: 104px; }
      .sl-e4 .pr .t { font: 700 58px/1.12 var(--sans); letter-spacing: -.035em; color: var(--ink); }
      .sl-e4 .hd { top: 96px; }
      .sl-e4 .hd .t { font: 700 70px/1.06 var(--sans); letter-spacing: -.04em; color: var(--ink); }
      .sl-e4 .rt { left: 1310px; top: 358px; display: flex; gap: 18px; align-items: baseline; font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; }
      .sl-e4 .rt b { font-weight: 600; color: var(--yellow); }
      .sl-e4 .rt span { color: var(--ink-3); }
      .sl-e4 .lb, .sl-e4 .rl { left: 0; top: 0; font: 600 21px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink); white-space: nowrap; background: #000; padding: 6px 8px; }
      .sl-e4 .rl { color: var(--ink-2); }
      .sl-e4 .lb.st { padding: 3px 8px; }
      .sl-e4 .nx { left: 0; top: 0; font: 500 24px/1 var(--sans); color: var(--ink); white-space: nowrap; background: #000; padding: 5px 8px; }
      .sl-e4 .nx i { font: 600 19px/1 var(--sans); font-style: normal; letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); margin-left: 12px; }
      .sl-e4 .pm { left: 0; top: 0; width: 24px; height: 24px; background: #000; border-radius: 50%; padding: 5px; }
      .sl-e4 .pm svg { position: absolute; left: 5px; top: 5px; }
      .sl-e4 .words { left: 90px; width: 1740px; display: flex; justify-content: space-between; font: 600 20px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--yellow); }
      .sl-e4 .card { box-sizing: border-box; background: #000; border: 1px solid var(--line); border-radius: 14px; padding: 22px 28px 24px; }
      .sl-e4 .card .ch { font: 600 20px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-e4 .code { left: 250px; top: 170px; width: 400px; }
      .sl-e4 .code .chip { float: right; font: 600 18px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
      .sl-e4 .code .bar { height: 10px; margin-top: 14px; border-radius: 5px; background: #6b6b6b; transform-origin: 0 50%; }
      .sl-e4 .ei-cmd { left: 90px; top: 426px; width: 610px; }
      .sl-e4 .dw { left: 1020px; top: 426px; width: 820px; }
      .sl-e4 .band { left: 0; width: 1920px; background: #000; overflow: hidden; box-sizing: border-box; border-top: 1.5px solid var(--yellow); border-bottom: 1.5px solid var(--yellow); }
      .sl-e4 .band > div { position: absolute; left: 0; width: 1920px; height: 350px; }
      .sl-e4 .mk { top: 100px; }
      .sl-e4 .cl { top: 210px; font: 600 42px/1.2 var(--sans); letter-spacing: -.02em; color: var(--ink); }
      .sl-e4 .ak { top: 190px; font: 600 40px/1.2 var(--sans); letter-spacing: -.02em; color: var(--ink); }
      .sl-e4 .ak b { display: block; margin-top: 14px; font: 600 24px/1 var(--sans); letter-spacing: .08em; color: var(--yellow); }
    `);
    this.plain = Plain.create(root, -this.HIGH.dist * Math.cos(this.HIGH.elev), this.MORE.concat(this.OPENING.map((m) => ({ ...m, brief: true }))));
    this.left = this.LEFT.concat(this.OPENING.map((m) => m.left || 0));
    const sky = (cls) => root.appendChild(M.html(`<div class="sky ${cls}"></div>`));
    const el = (html) => M.mount(root, html).root;

    // The word in four parts, so that AI can take the place of the "a" and the rest can make room.
    this.word = M.mount(root, '<div class="word"><span data-k="ide">ide</span><span data-k="a">a</span><span data-k="ai" class="ai">AI</span><span data-k="tion">tion</span></div>');
    this.wordW = null;       // measured on the first frame: a slide has no layout until it is shown

    this.eb = el('<div class="sky eb tk-eb">The Akka Agentic AI Platform</div>');
    this.pr = T.lines(sky('pr'), ['Akka turns <span class="tk-y">any idea</span> into a system', 'that is ready for production,', 'and keeps it trustworthy once it runs.'], 't');
    this.heads = this.HEADS.map(([lines]) => T.lines(sky('hd'), lines, 't'));
    this.rt = el('<div class="rt"><b>Akka runtime</b><span>Since 2009</span></div>');
    this.stn = ['Specification', 'Pipeline'].map((s) => el(`<div class="lb">${s}</div>`));
    this.rl = this.RINGS.map((g) => el(`<div class="rl">${g.name}</div>`));
    this.code = el(`<div class="card code"><span class="chip">Minutes</span><div class="ch">Generated code</div>${this.BARS.map((w) => `<div class="bar" style="width:${w}%"></div>`).join('')}</div>`);
    this.bars = [...this.code.querySelectorAll('.bar')];
    this.words = el(`<div class="words">${this.WORDS.map((w) => `<span>${w}</span>`).join('')}</div>`);

    // The commands on the left, and one drawing at a time on the right.
    this.cmd = Panels.commands(root);
    this.comp = D.components(root); this.inh = D.inherit(root); this.mx = D.matrix(root); this.rcp = D.receipt(root); this.same = D.same(root);

    // The runtime band. Its pictures keep their place on the stage while the band opens about them.
    this.band = el('<div class="band"><div></div></div>');
    this.bandIn = this.band.firstChild;
    this.run = D.running(this.bandIn); this.ctl = D.controls(this.bandIn); this.rcs = D.receipts(this.bandIn); this.plc = D.places(this.bandIn);
    this.next = el('<div class="nx">The next version<i>Draft</i></div>');

    // The factory: six station names at the left edge, and a person where a decision is a person's.
    this.stations = this.STATIONS.map(([name]) => el(`<div class="lb st">${name}</div>`));
    this.asks = el(`<div class="pm">${D.person('#F1F1F1')}${D.person('#72D35B')}</div>`);
    this.held = el(`<div class="pm">${D.person('#F1F1F1')}</div>`);

    this.mk = el(`<div class="sky mk">${M.markSVG(70)}</div>`);
    this.cl = el('<div class="sky cl">Akka is the platform for enterprise ide<span class="tk-y">AI</span>tion.</div>');
    this.ak = el('<div class="sky ak">Contact us, and we will show you how we can<br>deliver your idea in as little as a day.<b>akka.io</b></div>');

    /* The lights on the factory lines. A track is a light's ground distance at given times; between two
       times it eases. A light that ends at FAR has run to the horizon. */
    const SZ = this.STATIONS.map((s) => s[1]), FAR = 40000;
    this.FAR = FAR;
    const tracks = [
      { x: 0, named: 0, keys: [[135.2, 0], [138.6, SZ[5]], [166.8, SZ[5]], [168.0, FAR]] },
      { x: 480, named: 1, keys: [[135.6, 300], [137.2, SZ[1]], [144.0, SZ[1]], [145.4, SZ[2]], [168.2, SZ[2]], [169.6, FAR]] },
      { x: -660, named: 2, keys: [[135.9, -240], [138.8, SZ[3]], [168.8, SZ[3]], [170.2, FAR]] },
      { x: 660, named: 3, keys: [[136.2, -180], [137.4, SZ[0]], [169.4, SZ[0]], [171.0, FAR]] },
      { x: -420, named: 4, keys: [[136.5, 720], [138.9, SZ[2]], [170.0, SZ[2]], [171.8, FAR]] },
    ];
    this.MORE.slice(0, 4).forEach((m, j) => tracks.push({ x: m.ix * 60, named: 5 + j, yellow: true,
      keys: [[152.6 + 0.5 * j, m.iz * 60], [154.2 + 0.5 * j, SZ[0]], [174.0 + 0.9 * j, SZ[0]], [175.5 + 0.9 * j, FAR]] }));
    // Every other line carries one idea. Most are on their way by the portfolio beat; the rest set out in turn after it.
    let seed = 11, late = 0;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const taken = [0, 8, -11, 11, -7].concat(this.MORE.map((m) => m.ix));
    for (let ix = -34; ix <= 34; ix++) {
      if (taken.includes(ix)) continue;
      const k = Math.floor(rnd() * 6.999) - 1, start = 147.0 + 2.4 * rnd();
      if (k >= 0) tracks.push({ x: ix * 60, keys: [[start, -700], [start + 1.6, SZ[k]]] });
      else { const s = 162.2 + 0.22 * late++; tracks.push({ x: ix * 60, keys: [[s, -700], [s + 1.4, SZ[late % 2]]] }); }
    }
    this.tracks = tracks;
  },

  at(t) {
    const M = Mock, T = Talk;
    const span = (a, b) => M.clamp((t - a) / (b - a));
    const sm = (x) => x * x * x * (x * (x * 6 - 15) + 10);
    const io = M.ease.inOutCubic, out3 = M.ease.outCubic;
    const live = M.abs ? M.abs(t) : t;
    const SZ = this.STATIONS.map((s) => s[1]);

    /* ---------- the camera ---------- */
    const mix = (a, b, k) => ({ dist: a.dist * Math.pow(b.dist / a.dist, k), elev: M.lerp(a.elev, b.elev, k), tz: M.lerp(a.tz, b.tz, k), z: M.lerp(a.z || 0, b.z || 0, k) });
    const crane = sm(span(1.2, 5.3)), high = sm(span(128.0, 132.6)), back = sm(span(179.4, 183.2));
    let cam = mix(this.CLOSE, this.WIDE, crane);
    cam = mix(cam, this.NEAR, sm(span(9.6, 11.8)));
    cam = mix(cam, this.WIDE, sm(span(15.4, 18.6)));
    cam = mix(cam, this.TRAVEL, sm(span(31.9, 36.0)));
    const travel = span(34.0, 92.0);
    cam.z = 910 * travel * travel * (3 - 2 * travel);            // forward along the line, at an even pace
    cam = mix(cam, this.HIGH, high);
    cam = mix(cam, this.WIDE, back);
    cam.x = 8 * Math.sin((live * 2 * Math.PI) / 12) * crane;     // a slow sway keeps a held frame alive
    const up = high * (1 - back);                                // how far the camera is towards the HIGH pose

    /* ---------- the lights on the factory lines ---------- */
    const along = (keys) => {
      if (t <= keys[0][0]) return keys[0][1];
      for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) return M.lerp(keys[i - 1][1], keys[i][1], io(M.clamp((t - keys[i - 1][0]) / (keys[i][0] - keys[i - 1][0]))));
      return keys[keys.length - 1][1];
    };
    const leave = 1 - span(179.6, 180.8);
    const lights = [], bars = [], where = [];
    this.tracks.forEach((tr) => {
      const first = tr.keys[0], last = tr.keys[tr.keys.length - 1];
      if (t < first[0]) return;
      const z = along(tr.keys), gone = last[1] >= this.FAR ? span(last[0] - 0.35, last[0]) : 0;
      if (tr.named !== undefined) where[tr.named] = z;
      lights.push({ x: tr.x, z, w: tr.named !== undefined ? 17 : 12.6, white: tr.named !== undefined && !tr.yellow, a: span(first[0], first[0] + 0.3) * (1 - gone) * leave });
      SZ.forEach((s) => { if (s > first[1] && z > s + 1) bars.push({ x: tr.x, z: s, a: leave }); });
    });
    // What a marked idea's label says after its name: its station while the portfolio is shown, then its year.
    const arrived = (i) => this.tracks[i] && t >= this.tracks[i].keys[this.tracks[i].keys.length - 1][0];
    const tags = this.YEARS.map((year, i) => {
      if (t >= 166.6) return arrived(i) ? '2027' : year;
      const k = SZ.filter((s) => where[i] >= s - 1).length - 1;
      return t >= 147.4 && k >= 0 ? this.STATIONS[k][0] : '';
    }).concat([0, 1, 2, 3].map((j) => (t >= 157.7 + 0.35 * j && t < 173.0 ? 'Answer key' : '')));      // each existing system, until it takes a liability's name

    /* ---------- the plain ---------- */
    const wave = (a, b) => (t >= b ? 1e9 : Plain.REACH * Math.pow(span(a, b), 2.6));
    const bandK = io(span(87.9, 89.8)) * (1 - io(span(127.9, 129.2)));
    const codeA = out3(span(10.6, 11.3)) * (1 - span(15.3, 15.9));
    const factoryOut = 1 - span(179.2, 179.8);
    const o = this.plain.draw({
      cam,
      fog: [M.lerp(3200, 5200, up), M.lerp(9000, 10400, up)],
      reach: Plain.REACH * Math.pow(crane, 1.6),
      white: wave(5.7, 8.1),
      yellow: wave(179.5, 182.8),
      heroYellow: span(77.0, 77.5),
      shipped: [0, span(169.6, 170.1), span(170.2, 170.7), span(171.0, 171.5), span(171.8, 172.3)].concat([0, 1, 2, 3].map((j) => span(175.5 + 0.9 * j, 176.0 + 0.9 * j))),
      // The first idea is named from the start. The other names follow with the plain and leave before the
      // camera pushes in. Every marked idea is named again over the factory.
      names: [0, 1, 2, 3, 4].map((i) => out3(i ? span(3.6 + 0.2 * i, 4.4 + 0.2 * i) : span(0.9, 1.6)) * (1 - span(8.6, 9.1))
          + (i ? 0 : out3(span(10.2, 10.9)) * (1 - span(38.6, 39.2))) + out3(span(134.4 + 0.15 * i, 135.0 + 0.15 * i)) * factoryOut)
        .concat([0, 1, 2, 3].map((j) => out3(span(151.8 + 0.2 * j, 152.4 + 0.2 * j)) * factoryOut), [out3(span(164.2, 164.8)) * factoryOut],
          this.OPENING.map((_, j) => out3(span(3.3 + 0.1 * j, 4.1 + 0.1 * j)) * (1 - span(8.6, 9.1)))),
      texts: t >= 173.0 ? [null, null, null, null, null].concat(this.LIABILITY) : null,
      tags, left: this.left,
      lonely: 1 - span(1.2, 1.8),
      lonelyPhase: (live % 1.6) / 1.6,
      rings: this.RINGS.map((g, k) => ({ r: g.r, p: 0.8 * out3(span(11.6 + 0.7 * k, 12.6 + 0.7 * k)), closed: 0, a: 1 - span(31.8, 33.0) })),
      stationZ: this.STATION_Z,
      stationA: 1 - span(127.8, 128.4),
      line: io(span(24.4, 26.2)) + io(span(26.6, 28.4)) + io(span(28.8, 31.0)),
      lineA: 0.95,
      ship: 0,
      lines: span(130.0, 133.5),
      horizonLine: bandK > 0.001 ? 0 : out3(span(19.4, 21.6)),
      horizonPulse: span(33.0, 34.4),
      leaders: [{ from: [650, 300], to: 'hero', a: codeA }],
      feed: { a: span(117.5, 118.3) * (1 - span(120.9, 121.4)), phase: live * 1.2, fromY: 650 },
      cross: SZ.map((z, k) => ({ z, p: out3(span(this.STATION_T[k], this.STATION_T[k] + 0.9)), a: factoryOut })),
      lights, bars,
    });

    /* ---------- the word: "ideation" from the first second; AI takes the place of its "a" ---------- */
    if (!this.wordW || !this.wordW.ide) this.wordW = { ide: this.word.ide.offsetWidth, a: this.word.a.offsetWidth, ai: this.word.ai.offsetWidth, tion: this.word.tion.offsetWidth };
    const w = this.wordW, swapAI = io(span(5.8, 6.6));
    const mid = M.lerp(w.a, w.ai, swapAI), x0 = (1920 - (w.ide + mid + w.tion)) / 2;
    this.word.root.style.opacity = M.ease.css(span(0.5, 1.2)) * (1 - io(span(9.5, 10.0)));
    this.word.root.style.transform = `translateY(${((1 - out3(span(0.5, 1.4))) * 22).toFixed(2)}px)`;
    this.word.ide.style.transform = `translateX(${x0.toFixed(2)}px)`;
    // The two fades overlap, so the middle of the word is never empty.
    M.set(this.word.a, { transform: `translateX(${(x0 + w.ide).toFixed(2)}px)`, opacity: 1 - M.clamp(swapAI / 0.6) });
    M.set(this.word.ai, { transform: `translateX(${(x0 + w.ide).toFixed(2)}px)`, opacity: M.clamp((swapAI - 0.3) / 0.7) });
    this.word.tion.style.transform = `translateX(${(x0 + w.ide + mid).toFixed(2)}px)`;

    /* ---------- the sky: one line of type at a time ---------- */
    const swap = (h, a, b) => { T.linesAt(h, t, a, 0.14, 1.0); h.el.style.opacity = 1 - io(span(b, b + 0.5)); };
    M.riseOut(this.eb, t, 16.6, 22.9);
    swap(this.pr, 16.8, 22.9);
    this.heads.forEach((h, i) => swap(h, this.HEADS[i][1], this.HEADS[i][2]));
    M.rise(this.mk, t, 184.4);
    M.riseOut(this.cl, t, 184.8, 187.1);
    M.rise(this.ak, t, 187.4);
    this.rt.style.transform = `translateY(${(o.horizon - 343).toFixed(1)}px)`;      // the name stays under the horizon as the camera moves
    this.rt.style.opacity = M.ease.css(span(21.2, 21.8)) * (1 - Math.min(1, bandK * 4)) * (1 - span(183.9, 184.4));     // the band carries its own name

    /* ---------- marks on the ground carry their names ---------- */
    const place = (e, s, dx, dy, a, right) => {
      e.style.opacity = s ? a : 0;
      if (s) e.style.transform = `translate(${(s[0] + dx).toFixed(1)}px, ${(s[1] + dy).toFixed(1)}px)${right ? ' translateX(-100%)' : ''}`;
    };
    const onLine = 1 - span(127.8, 128.4);
    place(this.stn[0], o.stations[0], -18, -17, out3(span(26.0, 26.6)) * onLine, true);
    place(this.stn[1], o.stations[1], -18, -17, out3(span(28.2, 28.8)) * onLine * (1 - bandK), true);
    place(this.next, o.stations[0], 22, -17, out3(span(118.5, 119.1)) * (1 - span(120.9, 121.4)), false);
    this.RINGS.forEach((g, k) => {
      const s = o.project(0, -g.r);
      this.rl[k].style.opacity = out3(span(12.2 + 0.7 * k, 12.8 + 0.7 * k)) * (1 - span(15.3, 15.9));
      if (s) this.rl[k].style.transform = `translate(${s[0].toFixed(1)}px, ${(s[1] + 12).toFixed(1)}px) translateX(-50%)`;
    });
    this.stations.forEach((e, k) => { const s = o.project(0, SZ[k]); place(e, s && [60, s[1]], 0, -14, out3(span(this.STATION_T[k], this.STATION_T[k] + 0.5)) * factoryOut, false); });
    // A person is asked where Fraud monitoring is ambiguous, and a person holds one idea back.
    const fraud = o.project(480, where[1] === undefined ? SZ[1] : where[1]), decided = span(143.0, 143.4);
    place(this.asks, fraud, 16, -42, out3(span(140.2, 140.8)) * (1 - span(145.2, 145.8)), false);
    this.asks.children[0].style.opacity = 1 - decided; this.asks.children[1].style.opacity = decided;
    place(this.held, o.named[9], -52, -17, out3(span(164.2, 164.8)) * factoryOut, false);

    /* ---------- the opening's code card ---------- */
    this.code.style.opacity = codeA;
    this.bars.forEach((b, i) => { b.style.transform = `scaleX(${out3(span(10.9 + 0.07 * i, 11.15 + 0.07 * i)).toFixed(3)})`; });

    /* ---------- the commands, and the drawing beside them ---------- */
    const lift = (e, a) => M.set(e, { opacity: a, transform: `translateY(${((1 - a) * 18).toFixed(1)}px)` });
    const shown = (a, b, c, d) => out3(span(a, b)) * (1 - span(c, d));
    const step = (a, b) => ({ progress: span(a, b), done: span(b, b + 0.3) });
    const fill = [0, 1, 2, 3, 4, 5, 6].map((g) => span(63.9 + 0.7 * g, 64.5 + 0.7 * g)).concat(span(74.2, 74.9));
    lift(this.cmd.el, shown(33.2, 34.0, 87.4, 88.0));
    this.cmd.set([
      step(34.4, 36.8), step(43.4, 46.4), step(50.8, 57.6),
      { progress: t >= 63.6 ? Math.max(0.001, 0.9 * span(63.9, 68.9) + 0.1 * span(74.2, 74.9)) : 0, done: span(75.0, 75.3) },
      step(75.5, 76.3),
    ], live / 0.9);

    lift(this.comp.el, shown(39.2, 40.0, 50.2, 50.7));
    this.comp.set({ shelf: span(39.6, 42.6), loan: span(43.5, 46.2), others: span(46.2, 48.2) });
    lift(this.inh.el, shown(50.6, 51.3, 59.2, 59.7));
    this.inh.set({ p: span(51.0, 53.0), cap: span(57.9, 58.6) });
    // The nine requirements light along the horizon as each is spoken.
    this.words.style.transform = `translateY(${(o.horizon - 34).toFixed(1)}px)`;
    [...this.words.children].forEach((e, i) => { e.style.opacity = out3(span(this.WORD_T[i], this.WORD_T[i] + 0.4)) * (1 - span(59.2, 59.8)); });
    lift(this.mx.el, shown(59.6, 60.3, 76.0, 76.5));
    this.mx.set({ cells: span(60.2, 62.6), fill, pick: span(70.0, 71.2) * (1 - span(73.9, 74.3)) });
    lift(this.rcp.el, shown(76.4, 77.1, 79.4, 79.9));
    this.rcp.set({ p: span(76.6, 78.4) });
    lift(this.same.el, shown(79.9, 80.6, 87.4, 88.0));
    this.same.set({ frame: span(80.4, 82.2), morph: span(83.6, 85.4), cap: span(86.0, 86.7) });

    /* ---------- the runtime band ---------- */
    const top = M.lerp(o.horizon, 300, bandK), bottom = M.lerp(o.horizon, 650, bandK);
    M.set(this.band, { opacity: bandK > 0.001 ? 1 : 0, top: `${top.toFixed(1)}px`, height: `${(bottom - top).toFixed(1)}px` });
    this.bandIn.style.top = `${(300 - top).toFixed(1)}px`;
    this.run.set({ a: span(89.0, 89.8) * (1 - span(92.2, 92.6)) + span(114.6, 115.2) * (1 - span(120.9, 121.4)),
      labels: [115.42, 115.9, 116.9].map((s) => span(s, s + 0.4)), collect: span(117.1, 117.7), phase: live * 1.2 });
    this.ctl.set({ a: span(92.5, 92.9) * (1 - span(99.1, 99.6)), boxes: span(92.5, 93.3), words: [93.0, 93.73, 94.38, 94.87].map((s) => span(s, s + 0.8)) });
    this.rcs.set({ a: span(99.3, 99.9) * (1 - span(114.1, 114.6)), changes: [0, 1, 2, 3, 4].map((i) => span(100.4 + 1.2 * i, 100.9 + 1.2 * i)),
      drops: [0, 1, 2, 3, 4].map((i) => span(100.9 + 1.2 * i, 101.6 + 1.2 * i)), trace: span(108.0, 112.6) });
    this.plc.set({ a: span(121.4, 121.9) * (1 - span(127.7, 128.2)), frames: [122.97, 123.89, 124.92].map((s) => span(s, s + 1)) });
  },
});
