/* Scene 10.1: the claim, again. The seven mechanisms light in a row as each is named; the four cost areas from the
   opening return, lit and joined by one rail; the claim is restated in the opening's words; the licence statement.
   The call to action and the mark are the final slide, 10.2. */
Roi.register({
  id: '10.1',

  MECH: [['Flat fee', 'flat'], ['Lowest-priced hardware', 'lowest-priced'], ['Efficient runtime', 'efficient'], ['Shared compute', 'shared'],
    ['Integrated stack', 'integrated'], ['Lower model spend', 'lower'], ['Spec-driven development', 'spec-driven']],

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { mech: this.MECH.map(([, w]) => at(w)), lead: at('add'), claim: at('The', 1), lic: at('No') };
  },

  render(root) {
    root.classList.add('r101');
    Mock.style('r101', `
      .r101 .ro-tile.m { height: 76px; font-size: 19px; }
      .r101 .ro-tile.c { height: 84px; font-size: 26px; background: color-mix(in srgb, #2a2410 calc(var(--g) * 100%), var(--medium-black)); }
      .r101 .lbl { left: var(--gutter); }
      .r101 .claim { left: var(--gutter); top: 560px; width: 1600px; font: 700 44px/1.15 var(--sans); letter-spacing: -.03em; color: var(--white); text-wrap: balance; }
      .r101 .claim .accent { color: var(--yellow); }
      .r101 .lic { left: var(--gutter); top: 690px; width: 1600px; font: 500 28px/1.3 var(--sans); color: var(--soft-grey); }
    `);
    const M = Mock;
    this.grid = M.dotGrid(root);
    this.lbl1 = M.mount(root, '<div class="lbl ro-side" style="top:232px">Together</div>').root;
    this.mech = this.MECH.map(([text], i) => { const el = Roi.tile(root, { x: 160 + i * 232, y: 270, w: 206, h: 76, text }); el.classList.add('m'); return el; });
    this.lbl2 = M.mount(root, '<div class="lbl ro-side" style="top:392px">The fully loaded cost</div>').root;
    this.rail = M.rail(root, { style: { left: '160px', top: '471px', width: '1600px' } });
    this.lines = Roi.LINES.map((text, i) => { const el = Roi.tile(root, { x: 160 + i * 410, y: 430, w: 370, h: 84, text }); el.classList.add('c'); return el; });
    this.claim = M.mount(root, '<div class="claim">The fully loaded cost of an AI system on Akka is <span class="accent">a fraction</span> of the cost on a hyperscaler or an assembled open-source stack.</div>').root;
    this.lic = M.mount(root, '<div class="lic">No additional licences are needed to design, build, test, run or govern AI systems.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.fade(this.grid, t, 0, 1.0);
    M.rise(this.lbl1, t, 0.3, { dy: 10 });
    this.mech.forEach((el, i) => {
      M.rise(el, t, 0.5 + i * 0.08);
      Roi.glow(el, Math.max(M.ramp(t, K.mech[i] - 0.15, K.mech[i] + 1.6, 0.25, 0.6), 0.4 * M.prog(t, K.lead, 0.6)));
    });
    /* the cost areas return together, joined by one rail, as "add up" is spoken */
    M.rise(this.lbl2, t, K.lead - 0.4, { dy: 10 });
    M.railGrow(this.rail, t, K.lead - 0.2, 1.0);
    M.railAt(this.rail, t, 10);
    this.lines.forEach((el, i) => { M.rise(el, t, K.lead - 0.2 + i * 0.1); Roi.glow(el, M.prog(t, K.lead + 0.2 + i * 0.1, 0.6)); });
    M.rise(this.claim, t, K.claim - 0.2);
    M.rise(this.lic, t, K.lic - 0.2);
  },
});
