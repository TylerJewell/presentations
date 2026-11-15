/* Scene 7.1: Release, exit conditions and auditors. The Changes page's exit conditions, re-drawn and grouped in four
   bands as they are named: Privacy, Security, Architecture, Risk. Each row says how it is checked. An auditor moves
   down the rows and each turns Met; one row asks for a person's sign-off, which is given. The conditions are
   illustrative. */
Fx.register({
  id: '7.1',

  ROWS: [
    { band: 'Privacy', key: 'privacy,', c: 'Personal data stays in its region.', how: 'Probes the running service' },
    { band: 'Security', key: 'security,', c: 'Dependencies pass the vulnerability scan.', how: 'Runs a command' },
    { band: 'Architecture', key: 'architecture', c: 'Each component is used as the design specifies.', how: 'Reads project files' },
    { band: 'Risk', key: 'risk', c: 'Every rating rule has a test.', how: 'Tests that cite it' },
    { band: '', key: 'risk', c: 'The risk owner approves the release.', how: 'A person signs off', sign: true },
  ],
  RY: (i) => 344 + i * 84,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { bands: this.ROWS.map((r) => at(r.key)), auditor: at('auditor'), runs: at('runs'), passes: at('passes'), meet: at('meet.') };
    /* the auditor reaches row i at walk[i]; the sign-off is given a beat after it waits */
    const a = this.K.auditor + 0.6, b = this.K.passes;
    this.K.walk = this.ROWS.map((_, i) => a + ((b - a) * i) / (this.ROWS.length - 1));
    this.K.signed = this.K.passes + 1.2;
  },

  render(root) {
    root.classList.add('s71');
    Mock.style('s71', `
      .s71 .hd { top: 300px; }
      .s71 .row { --g: 0; left: 160px; width: 1600px; height: 72px; border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 50%), rgba(241, 241, 241, .12)); background: rgba(255, 255, 255, calc(.02 + var(--g) * .03)); }
      .s71 .row > * { position: absolute; top: 0; height: 72px; display: flex; align-items: center; white-space: nowrap; }
      .s71 .row .b { left: 24px; font: 600 18px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .s71 .row .c { left: 250px; font: 600 25px/1 var(--sans); letter-spacing: -.01em; color: var(--white); }
      .s71 .row .h { left: 900px; font: 500 23px/1 var(--sans); color: var(--soft-grey); }
      .s71 .row .s { left: 1430px; }
      .s71 .row .s .fx-chip { position: absolute; left: 0; top: 19px; }
      .s71 .aud { left: 0; top: 0; width: 56px; height: 56px; margin: -28px 0 0 -28px; border-radius: 50%; border: 2px solid var(--yellow);
        background: #1d1a0c; box-shadow: 0 0 24px rgba(255, 206, 74, .6); display: flex; align-items: center; justify-content: center; }
      .s71 .aud svg { width: 28px; height: 28px; overflow: visible; }
      .s71 .aud path { fill: none; stroke: var(--yellow); stroke-width: 2.5; stroke-linecap: round; }
      .s71 .audl { left: 1466px; top: 300px; color: var(--yellow); }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Release', headline: "Exit conditions are set once, for every project's factory.", station: 4, from: 3 });
    const M = Mock;
    this.hd = [['Condition', 410], ['How it is checked', 1060]].map(([t, x]) => M.mount(root, `<div class="hd fx-side" style="left:${x}px">${t}</div>`).root);
    this.rows = this.ROWS.map((r, i) => M.mount(root, `<div class="row" style="top:${this.RY(i)}px"><div class="b">${r.band}</div><div class="c">${r.c}</div><div class="h">${r.how}</div>
      <div class="s"><div class="fx-chip" data-k="nr">Not run</div>${r.sign ? '<div class="fx-chip info" data-k="wait">Waiting</div><div class="fx-chip ok" data-k="ok">Signed off</div>' : '<div class="fx-chip ok" data-k="ok">Met</div>'}</div></div>`));
    this.audl = M.mount(root, '<div class="audl fx-side">Auditor</div>').root;
    this.aud = M.mount(root, '<div class="aud"><svg viewBox="0 0 28 28"><path d="M12 4a8 8 0 1 1 0 16a8 8 0 1 1 0-16M18 18l6 6"/></svg></div>').root;
    /* the console's own screen for this step */
    this.scr = Fx.screen(root, { src: 'screens/changes-exit.png', name: 'Changes · Exit conditions' });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    this.hd.forEach((h, i) => M.rise(h, t, 0.6 + i * 0.15, { dy: 10 }));
    /* the bands arrive as they are named */
    this.rows.forEach((r, i) => {
      M.rise(r.root, t, K.bands[i] - 0.4 + (r === this.rows[4] ? 0.4 : 0), { dy: 12 });
      const met = M.prog(t, K.walk[i] + 0.3, 0.3);
      if (this.ROWS[i].sign) {
        const signed = M.prog(t, K.signed, 0.3);
        r.nr.style.opacity = 1 - met;
        r.wait.style.opacity = met * (1 - signed);
        r.ok.style.opacity = signed;
        Fx.glow(r.root, M.ramp(t, K.walk[i], K.signed + 1.6, 0.3, 0.6) * 0.8);
      } else {
        r.nr.style.opacity = 1 - met;
        r.ok.style.opacity = met;
        Fx.glow(r.root, Math.max(M.ramp(t, K.bands[i] - 0.2, K.bands[i] + 1.2, 0.25, 0.5) * 0.7, M.ramp(t, K.walk[i], K.walk[i] + 1.3, 0.2, 0.5)));
      }
    });
    /* the auditor walks down the state column, row by row */
    M.rise(this.audl, t, K.auditor - 0.2, { dy: 8 });
    let y = this.RY(0) + 36;
    for (let i = 1; i < K.walk.length; i++) y += M.p(t, K.walk[i] - 0.5, 0.45, 'inOutCubic') * 84;
    M.fade(this.aud, t, K.auditor, 0.4);
    if (t > K.meet) this.aud.style.opacity = (1 - M.prog(t, K.meet, 0.5)).toFixed(3);
    this.aud.style.left = '1510px';
    this.aud.style.top = y.toFixed(1) + 'px';
    this.scr.at(t, { a: Mock.captionAt(this, 'passes') + 2.4, b: this.duration + 1, from: [250, 125, 1640], to: [250, 420, 1640], hi: [924, 266, 262, 470], hiAt: Mock.captionAt(this, 'passes') + 3.2 });
  },
});
