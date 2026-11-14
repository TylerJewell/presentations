/* Scene 4.2: Observe → Route → Train → Serve. The Optimize loop from the platform page: four stages rise
   in order with live figures, a loop arrow draws back from Serve to Observe, then the gate card compares
   the incumbent with the small model and blinks Ready, a proposal that waits for a decision. */
registerScene({
  id: '4.2',
  act: 4,
  title: "Observe → Route → Train → Serve",
  duration: 14,
  caption: "Optimize learns from that traffic, trains a small model on the lender's own data, and proposes it. But a proposal is not a decision.",

  /* Each stage lights while the words for it are read (Observe on "learns from that traffic", Route as the
     traffic is named, Train on "trains", Serve on "proposes"); the gate opens with the proposal and "Not
     yet" lands on "But a proposal is not a decision". All from the caption's clock (Mock.captionAt). */
  timing() {
    if (this.GLOW) return;
    const at = (w) => Mock.captionAt(this, w);
    const learns = at('learns'), traffic = at('traffic'), trains = at('trains'), proposes = at('proposes'), but = at('But');
    this.GLOW = [[learns, traffic + 0.4], [traffic, trains + 0.3], [trains, proposes], [proposes - 0.2, but + 0.4]];
    this.GATE = proposes;
    this.READY = proposes + 1.2;
    this.NOT_YET = but;
  },
  X0: 160, W: 372, GAP: 37,

  render(root) {
    root.classList.add('s42');
    Mock.style('s42', `
      .s42 .head { left: var(--gutter); top: 92px; }
      .s42 .head .mk-h2 { margin-top: 22px; }
      .s42 .st { top: 286px; width: 372px; height: 236px; padding: 24px 26px 22px; border-radius: 14px; --g: 0;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.12));
        background: linear-gradient(160deg, rgba(255,206,74, calc(var(--g) * .13)), rgba(255,206,74, calc(var(--g) * .03))), rgba(255,255,255,.025);
        box-shadow: 0 0 calc(var(--g) * 70px) calc(var(--g) * -18px) rgba(255,206,74,.7); display: flex; flex-direction: column; }
      .s42 .st .nm { margin-top: 0; font: 700 44px/1 var(--sans); letter-spacing: -.03em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s42 .st .ln { margin-top: 12px; font-size: 18px; line-height: 1.38; color: var(--soft-grey); }
      .s42 .st .vz { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; height: 40px; }
      .s42 .st .vz b { font: 600 14px/1.2 var(--sans); color: var(--white); white-space: nowrap; font-variant-numeric: tabular-nums; }
      .s42 .st .vz small { display: block; font: 500 12px/1.2 var(--sans); color: var(--medium-grey); letter-spacing: .04em; }
      .s42 .st svg { width: 130px; height: 40px; overflow: visible; flex: none; }
      .s42 .st svg path { fill: none; stroke: var(--yellow); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .s42 .st svg path.base { stroke: rgba(241,241,241,.18); stroke-width: 1; stroke-dasharray: 2 4; }
      .s42 .chev { top: 392px; width: 37px; text-align: center; font: 600 20px/1 var(--sans); color: var(--yellow); }
      .s42 svg.lp { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s42 .lp path { fill: none; stroke: rgba(255,206,74,.75); stroke-width: 2; }
      .s42 .lp .ah { fill: var(--yellow); stroke: none; }
      .s42 .lpl { left: 960px; top: 568px; transform: translateX(-50%); padding: 0 14px; background: #000; font: 600 13px/24px var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--yellow); white-space: nowrap; }
      .s42 .gt { top: 636px; width: 372px; height: 150px; padding: 20px 24px; border-radius: 12px; border: 1px solid var(--hair); background: var(--panel); }
      .s42 .gt.y { border-color: rgba(255,206,74,.45); }
      .s42 .gt .k { font: 600 12px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s42 .gt .n { margin-top: 12px; font: 600 26px/1.1 var(--sans); letter-spacing: -.015em; color: var(--white); }
      .s42 .gt.y .n { color: var(--yellow); }
      .s42 .gt .s { margin-top: 10px; font: 500 14px/1.6 var(--sans); color: var(--soft-grey); }
      .s42 .gt .ck { display: flex; gap: 10px; align-items: center; font: 500 15px/1 var(--sans); color: var(--white); margin-top: 12px; }
      .s42 .gt .ck i { font-style: normal; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
        background: rgba(114,211,91,.14); color: var(--green); font-size: 13px; }
      .s42 .gt .ck span { color: var(--medium-grey); margin-left: auto; }
      .s42 .gt .rdy { margin-top: 14px; font-size: 15px; padding: 8px 14px; }
      .s42 .gchev { top: 700px; width: 37px; text-align: center; font: 600 20px/1 var(--sans); color: var(--medium-grey); }
      .s42 .ny { margin-top: 12px; font: 500 14px/1.45 var(--sans); color: var(--soft-grey); }
      .s42 .ny b { color: var(--white); font-weight: 600; }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `<div class="head"><div class="mk-eyebrow" data-k="eb">Akka Optimize</div>
      <h2 class="mk-h2" data-k="h">A small model, <span class="accent">trained on your data.</span></h2></div>`);

    const X = (i) => this.X0 + i * (this.W + this.GAP);
    const STAGES = [
      { n: 'Observe', l: 'Measures the work the underwriting assistant does on live traffic.', vz: '<div><b data-k="obs"></b><small>calls today</small></div><svg viewBox="0 0 130 40"><path class="base" d="M0 30H130"/><path data-k="spark"/></svg>' },
      { n: 'Route', l: 'Sends each task to the model that fits it, from any vendor.', vz: '<div><b>underwriting → frontier-large</b><small>100% of calls</small></div>' },
      { n: 'Train', l: 'Tunes a small model on the lender’s own data.', vz: '<div><b data-k="step"></b><small>underwrite-4b · reward</small></div><svg viewBox="0 0 130 40"><path class="base" d="M0 36H130"/><path data-k="curve" d="M0 36 C18 34, 26 26, 40 22 S70 12, 88 9 S118 5, 130 4"/></svg>' },
      { n: 'Serve', l: 'Runs it in the lender’s environment, with the frontier model as fallback.', vz: '<div><b>your VPC · frontier fallback</b><small>route v13, when promoted</small></div>' },
    ];
    this.st = STAGES.map((s, i) => Mock.mount(root, `<div class="st" style="left:${X(i)}px"><div class="nm">${s.n}</div><div class="ln">${s.l}</div><div class="vz">${s.vz}</div></div>`));
    this.chev = [0, 1, 2].map((i) => Mock.mount(root, `<div class="chev" style="left:${X(i) + this.W}px">›</div>`).root);

    /* the loop back from Serve to Observe */
    const a = X(3) + this.W / 2, b = X(0) + this.W / 2, y0 = 522, y1 = 580, r = 18;
    this.lp = Mock.html(`<svg class="lp" viewBox="0 0 1920 1080">
      <path data-k="p" d="M${a} ${y0} V${y1 - r} Q${a} ${y1} ${a - r} ${y1} H${b + r} Q${b} ${y1} ${b} ${y1 - r} V${y0 + 10}"/>
      <path class="ah" d="M${b} ${y0} l-7 12 h14 z"/></svg>`);
    root.appendChild(this.lp);
    this.lpPath = this.lp.querySelector('[data-k="p"]');
    this.lpHead = this.lp.querySelector('.ah');
    this.lpl = Mock.mount(root, `<div class="lpl">Continuous improvement</div>`).root;

    /* the gate card */
    this.gt = [
      Mock.mount(root, `<div class="gt" style="left:${X(0)}px"><div class="k">Incumbent</div><div class="n">frontier-large</div><div class="s">$0.031 a call<br>2,980 tokens a call</div></div>`),
      Mock.mount(root, `<div class="gt y" style="left:${X(1)}px"><div class="k">Candidate</div><div class="n">underwrite-4b</div><div class="s">the small model · 4B<br>41,800 of the lender’s calls</div></div>`),
      Mock.mount(root, `<div class="gt" style="left:${X(2)}px"><div class="k">Gate</div>
        <div class="ck" data-k="c1"><i>✓</i>quality ≥ baseline<span>0.914 · 0.912</span></div>
        <div class="ck" data-k="c2"><i>✓</i>tokens down ≥ 40%<span>(68%)</span></div></div>`),
      Mock.mount(root, `<div class="gt" style="left:${X(3)}px"><div class="k">Proposal · exp-142</div><span class="mk-chip ok rdy" data-k="rdy">Ready</span>
        <div class="ny" data-k="ny"><b>Not serving yet.</b> The owner decides.</div></div>`),
    ];
    this.gchev = [0, 1, 2].map((i) => Mock.mount(root, `<div class="gchev" style="left:${X(i) + this.W}px">›</div>`).root);
  },

  at(t) {
    this.timing();
    const M = Mock;
    M.rise(this.head.eb, t, 0.0);
    M.rise(this.head.h, t, 0.1);

    /* the four stages, each lit as it is spoken of */
    this.st.forEach((s, i) => {
      M.rise(s.root, t, 0.3 + i * 0.22);
      const [a, b] = this.GLOW[i];
      M.cardGlow(s.root, Math.max(M.ramp(t, a, b, 0.35, 0.5), 0.12 * M.prog(t, 8, 1)));
    });
    this.chev.forEach((c, i) => M.fade(c, t, 0.7 + i * 0.22, 0.4));

    /* Observe: a live count and a sparkline that keeps moving */
    const st0 = this.st[0];
    st0.obs.textContent = M.fmt.int(M.ticker(t, 41_300, 38.4));
    let d = '';
    for (let k = 0; k <= 26; k++) {
      const y = 30 - 22 * M.wander(t + k * 0.35, 1.2, 4);
      d += (k ? 'L' : 'M') + (k * 5) + ' ' + y.toFixed(1);
    }
    st0.spark.setAttribute('d', d);

    /* Train: the reward curve draws and the step count climbs while it is lit */
    const st2 = this.st[2];
    M.draw(st2.curve, t, this.GLOW[2][0], 2.6, 'outCubic');
    M.countUp(st2.step, t, this.GLOW[2][0], 2.6, 0, 2400, (v) => 'step ' + M.fmt.int(v));

    /* the loop back */
    M.draw(this.lpPath, t, 1.6, 1.0);
    M.fade(this.lpHead, t, 2.5, 0.25);
    M.rise(this.lpl, t, 2.4, { dy: 8 });

    /* the gate card */
    this.gt.forEach((g, i) => M.rise(g.root, t, this.GATE + i * 0.12, { dy: 18 }));
    this.gchev.forEach((c, i) => M.fade(c, t, this.GATE + 0.3 + i * 0.12, 0.4));
    M.rise(this.gt[2].c1, t, this.GATE + 0.9, { dy: 8 });
    M.rise(this.gt[2].c2, t, this.GATE + 1.4, { dy: 8 });
    const rdy = this.gt[3].rdy;
    const on = M.prog(t, this.READY, 0.3);
    rdy.style.opacity = t < this.READY ? 0 : (on * (0.4 + 0.6 * M.wave(t - this.READY, 1.1, 0.5))).toFixed(3);
    rdy.style.boxShadow = `0 0 ${(18 * M.wave(t - this.READY, 1.1, 0.5) * on).toFixed(1)}px rgba(114,211,91,.45)`;
    M.rise(this.gt[3].ny, t, this.NOT_YET, { dy: 10 });
    this.gt[3].root.style.borderColor = `rgba(255,206,74,${(0.12 + 0.4 * M.p(t, this.NOT_YET, 0.6)).toFixed(3)})`;
  },
});
