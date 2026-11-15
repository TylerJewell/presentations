/* Scene 9.2: Specify, every review passed before the reviewers meet. Left: the four standards an organization sets
   once as exit conditions, each lit as named and checked as "automatically" is spoken; then the original system as
   the answer key, with every build checked against it and drift failing the build; then the insurer's result.
   Right: the console's exit-conditions screen from the Specify film (../modernize/screens), the one record the
   reviewers read. */
Roi.register({
  id: '9.2',

  STANDARDS: [['Privacy', 'privacy,'], ['Security', 'security,'], ['Architecture', 'architecture'], ['Risk', 'risk']],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { std: this.STANDARDS.map(([, w]) => at(w)), auto: at('automatically.'), record: at('record'), key: at('answer'), build: at('every', 20), drift: at('drift'), insurer: at('insurer') };
  },

  render(root) {
    root.classList.add('r92');
    Mock.style('r92', `
      .r92 .side { top: 290px; }
      .r92 .std { left: 160px; width: 780px; height: 54px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
        border: 1px solid rgba(241,241,241,.16); background: var(--medium-black); }
      .r92 .std .nm { --g: 0; font: 600 21px/1 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .r92 .std .ok { font: 600 16px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; color: var(--green); opacity: 0; }
      .r92 .key { left: 160px; top: 620px; width: 780px; display: flex; align-items: center; gap: 16px; }
      .r92 .key .b { height: 56px; padding: 0 22px; border-radius: 10px; display: flex; align-items: center; font: 600 20px/1 var(--sans); color: var(--white);
        border: 1px solid rgba(255,206,74,.45); background: rgba(255,206,74,.05); white-space: nowrap; }
      .r92 .key .eq { font: 600 16px/1.3 var(--sans); color: var(--soft-grey); text-align: center; flex: 1; }
      .r92 .drift { left: 160px; top: 692px; width: 780px; font: 500 20px/1.35 var(--sans); color: var(--soft-grey); }
      .r92 .win { left: 1020px; top: 330px; width: 740px; height: 400px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(241,241,241,.2); background: var(--medium-black);
        box-shadow: 0 30px 80px -30px rgba(0,0,0,.9); }
      /* the 3840 px capture at exactly half size, the console's own size at 1080p, so its text stays sharp */
      .r92 .win img { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; }
      .r92 .ins { left: 160px; top: 760px; width: 1600px; font: 600 26px/1.3 var(--sans); letter-spacing: -.01em; color: var(--white); }
      .r92 .ins b { color: var(--yellow); font-weight: 700; }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'People', headline: 'Every review is passed before the reviewers meet.', lit: 3 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Exit conditions, set once</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1020px">The record the reviewers read</div>').root;
    this.stds = this.STANDARDS.map(([nm], i) => M.mount(root, `<div class="std" style="top:${330 + i * 64}px"><span class="nm" data-k="nm">${nm}</span><span class="ok" data-k="ok">✓ Checked automatically</span></div>`));
    this.key = M.mount(root, '<div class="key"><div class="b">The original system</div><div class="eq" data-k="eq">every build checked against it</div><div class="b">The rebuild</div></div>');
    this.drift = M.mount(root, '<div class="drift">Any drift fails the build, months before acceptance testing.</div>').root;
    this.win = M.mount(root, '<div class="win"><img src="../modernize/screens/changes-exit.png" alt="" data-k="img"></div>');
    this.ins = M.mount(root, '<div class="ins">A global insurer rebuilt a <b>20-year-old</b> underwriting calculator in <b>under a week</b>, matching the original case for case.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    /* each standard lights as it is named; all are checked as "automatically" is spoken */
    this.stds.forEach((s, i) => {
      M.rise(s.root, t, Math.min(K.std[i], K.std[0] + 0.8) - 0.4 + i * 0.1);
      Roi.glow(s.nm, M.ramp(t, K.std[i] - 0.15, K.std[i] + 1.2, 0.2, 0.5));
      s.ok.style.opacity = M.prog(t, K.auto - 0.2 + i * 0.25, 0.4).toFixed(3);
    });
    /* the console's record rises as the reviews are named, and pans down the table of conditions */
    M.rise(this.sideR, t, K.auto + 0.6, { dy: 10 });
    M.rise(this.win.root, t, K.auto + 0.8);
    this.win.img.style.transform = `translate(-245px, ${(-230 - 370 * M.ease.inOutCubic(M.prog(t, K.record, 6))).toFixed(1)}px)`;
    /* the answer key */
    M.rise(this.key.root, t, K.key - 0.3);
    this.key.eq.style.opacity = M.prog(t, K.build - 0.2, 0.5).toFixed(3);
    M.rise(this.drift, t, K.drift - 0.3);
    M.rise(this.ins, t, K.insurer - 0.3);
  },
});
