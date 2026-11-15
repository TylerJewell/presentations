/* Scene 9.1: Specify, who can take part. Left: requirements in the form they already exist in (a hand drawing, a
   spreadsheet, an issue list, a broad description), each lit as named, with rails into one software factory at the
   centre. Right: the people who take part (engineers, product managers, analysts, executives), each lit as named,
   with rails into the same factory. The factory's five stations light in turn as it writes, runs and checks the
   system. Under it, the tie to the People cost: fewer handoffs, and fewer people to reach production. No figures. */
Roi.register({
  id: '9.1',

  INPUTS: [['Hand drawing', 'hand'], ['Spreadsheet', 'spreadsheets,'], ['Issue list', 'issue'], ['Broad description', 'broad']],
  PEOPLE: [['Engineers', 'engineers,'], ['Product managers', 'product'], ['Analysts', 'analysts'], ['Executives', 'executives']],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { accepts: at('factory'), inputs: this.INPUTS.map(([, w]) => at(w)), people: this.PEOPLE.map(([, w]) => at(w)), direct: at('writes'), each: at('That'), stations: at('writes') };
  },

  render(root) {
    root.classList.add('r91');
    Mock.style('r91', `
      .r91 .ro-head { width: 1300px; }
      .r91 .side { top: 290px; }
      .r91 .ro-tile.in { width: 300px; height: 64px; font-size: 20px; }
      .r91 .ro-tile.pp { width: 300px; height: 56px; font-size: 20px; }
      .r91 .spec { left: 720px; top: 400px; width: 480px; height: 200px; border-radius: 14px; border: 1px solid rgba(255,206,74,.5); background: rgba(255,206,74,.04); padding: 22px 26px; box-shadow: 0 0 60px -20px rgba(255,206,74,.6); }
      .r91 .spec .k { font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--yellow); margin-bottom: 12px; }
      .r91 .spec .t { font: 700 26px/1.15 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .r91 .spec .st { display: flex; gap: 6px; margin-top: 18px; }
      .r91 .spec .st span { --g: 0; flex: 1; padding: 8px 0; text-align: center; border-radius: 6px; font: 600 14px/1 var(--sans);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.18)); background: var(--medium-black); }
      .r91 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r91 .w path { fill: none; stroke: rgba(255,206,74,.55); stroke-width: 1.5; }
      .r91 .tie { left: var(--gutter); top: 740px; width: 1600px; font: 500 26px/1.35 var(--sans); color: var(--white); text-wrap: pretty; }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'People', headline: 'The people who know the business bring the requirements.', lit: 3 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Requirements, as they exist</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1460px">Who takes part</div>').root;
    const IY = (i) => 340 + i * 90, PY = (i) => 340 + i * 76;
    this.inputs = this.INPUTS.map(([text], i) => { const el = Roi.tile(root, { x: 160, y: IY(i), w: 300, h: 64, text }); el.classList.add('in'); return el; });
    this.people = this.PEOPLE.map(([text], i) => { const el = Roi.tile(root, { x: 1460, y: PY(i), w: 300, h: 56, text }); el.classList.add('pp'); return el; });
    this.specM = M.mount(root, `<div class="spec"><div class="k">A software factory</div><div class="t">One for each project</div><div class="st" data-k="st">${['Discover', 'Decide', 'Specify', 'Build', 'Release'].map((s) => `<span>${s}</span>`).join('')}</div></div>`);
    this.spec = this.specM.root;
    this.stations = [...this.specM.st.children];
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">
      ${this.INPUTS.map((_, i) => `<path d="M460 ${IY(i) + 32} C 610 ${IY(i) + 32}, 610 500, 720 500"/>`).join('')}
      ${this.PEOPLE.map((_, i) => `<path d="M1460 ${PY(i) + 28} C 1310 ${PY(i) + 28}, 1310 500, 1200 500"/>`).join('')}
    </svg>`);
    root.appendChild(this.svg);
    this.railsL = [...this.svg.querySelectorAll('path')].slice(0, 4);
    this.railsR = [...this.svg.querySelectorAll('path')].slice(4);
    this.tie = M.mount(root, '<div class="tie">Fewer handoffs between the business and engineering, and fewer people to reach production.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    M.rise(this.spec, t, K.accepts - 0.2);
    /* each form of requirement rises and lights as it is named, and its rail draws into the specification */
    this.inputs.forEach((el, i) => { M.rise(el, t, 0.7 + i * 0.1); Roi.glow(el, Math.max(M.ramp(t, K.inputs[i] - 0.15, K.inputs[i] + 1.3, 0.25, 0.5), 0.35 * M.prog(t, K.people[0], 0.6))); });
    this.railsL.forEach((p, i) => M.draw(p, t, K.inputs[i], 0.7));
    /* the people, as each is named */
    M.rise(this.sideR, t, K.people[0] - 0.6, { dy: 10 });
    this.people.forEach((el, i) => { M.rise(el, t, K.people[0] - 0.4 + i * 0.1); Roi.glow(el, Math.max(M.ramp(t, K.people[i] - 0.15, K.people[i] + 1.3, 0.25, 0.5), 0.35 * M.prog(t, K.direct, 0.6))); });
    this.railsR.forEach((p, i) => M.draw(p, t, K.people[i], 0.7));
    /* the factory's stations light in turn as the code is written, the system run and checked */
    this.stations.forEach((el, i) => Roi.glow(el, Math.max(M.ramp(t, K.stations + i * 0.5, K.stations + i * 0.5 + 1.2, 0.2, 0.5), 0.35 * M.prog(t, K.stations + 2.6, 0.6))));
    M.rise(this.tie, t, K.each - 0.2);
  },
});
