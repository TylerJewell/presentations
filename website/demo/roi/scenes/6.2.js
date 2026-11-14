/* Scene 6.2: memory. Left: an entity whose changes append to a journal, with its state cached in memory; a
   recovery arrow from the journal back to the cache. Right: two regions, both active, replicating both ways, with
   the recovery time and recovery point stated as short and the read/write latency as low single-digit
   milliseconds. The only number spoken is "two regions"; the measured recovery figures are in 2.1. */
Roi.register({
  id: '6.2',

  CHANGES: ['Session opened', 'Tool result stored', 'Decision recorded', 'Plan updated', 'Reply sent'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { entities: at('event-sourced'), journal: at('journal,'), cached: at('cached'), recovers: at('recovers'), regions: at('two'), short: at('short'), reads: at('reads'), ms: at('low') };
  },

  render(root) {
    root.classList.add('r62');
    Mock.style('r62', `
      .r62 .ro-head { width: 1300px; }
      .r62 .side { top: 290px; }
      .r62 .box { border-radius: 12px; border: 1px solid rgba(241,241,241,.18); background: var(--medium-black); padding: 16px 20px; }
      .r62 .box .k { font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 10px; }
      .r62 .box .t { font: 700 22px/1.15 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .r62 .box.y { border-color: rgba(255,206,74,.45); }
      .r62 .jr .row { --g: 0; margin-top: 8px; padding: 7px 10px; border-radius: 6px; font: 500 17px/1.2 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white));
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.14)); background: rgba(255,255,255,.03); }
      .r62 .reg { top: 340px; width: 300px; height: 250px; border-radius: 12px; border: 1px solid rgba(255,206,74,.45); background: rgba(255,206,74,.03); }
      .r62 .reg .k { position: absolute; left: 20px; top: 18px; font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--yellow); }
      .r62 .reg .st { position: absolute; left: 20px; right: 20px; top: 50px; font: 600 20px/1.2 var(--sans); color: var(--white); }
      .r62 .reg .act { position: absolute; left: 20px; bottom: 18px; font: 600 15px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--green); }
      .r62 .reg .dot { position: absolute; left: 20px; right: 20px; top: 110px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
      .r62 .reg .dot i { height: 22px; border-radius: 5px; border: 1px solid rgba(241,241,241,.2); background: rgba(255,255,255,.03); }
      .r62 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r62 .w path { fill: none; stroke: var(--yellow); stroke-width: 2; }
      .r62 .w path.rp { stroke-dasharray: 5 6; }
      .r62 .w text { font: 500 17px var(--sans); fill: var(--soft-grey); }
      .r62 .st2 { top: 630px; }
      .r62 .st2 .n { white-space: nowrap; font: 700 34px/1 var(--sans); letter-spacing: -.03em; color: var(--yellow); }
      .r62 .st2 .l { margin-top: 8px; font: 500 20px/1.3 var(--sans); color: var(--soft-grey); }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Infrastructure', headline: 'Memory is a journal of changes, cached in memory.', lit: 0 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">An entity</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1080px">Two regions, both active</div>').root;
    this.ent = M.mount(root, '<div class="box" style="left:160px;top:340px;width:300px"><div class="k">Entity</div><div class="t">One conversation’s AI memory</div></div>').root;
    this.jr = M.mount(root, `<div class="box jr" style="left:520px;top:340px;width:360px"><div class="k">Journal</div><div class="t">Every change</div>
      ${this.CHANGES.map((c, i) => `<div class="row">${c}</div>`).join('')}</div>`).root;
    this.rows = [...this.jr.querySelectorAll('.row')];
    this.cache = M.mount(root, '<div class="box y" style="left:160px;top:470px;width:300px"><div class="k">Memory cache</div><div class="t">Current state, all of it in memory</div></div>').root;
    this.regs = [0, 1].map((i) => M.mount(root, `<div class="reg" style="left:${1080 + i * 380}px"><div class="k">Region ${i + 1}</div><div class="st">Reads and writes served here</div>
      <div class="dot">${Array.from({ length: 12 }, () => '<i></i>').join('')}</div><div class="act">Active</div></div>`).root);
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">
      <path data-k="a1" d="M460 385 H520"/>
      <path class="rp" data-k="a2" d="M520 560 H490 C 470 560, 470 530, 460 530"/>
      <text data-k="t2" x="160" y="610">Recovers from the journal</text>
      <path class="rp" data-k="r1" d="M1380 430 H1460"/><path class="rp" data-k="r2" d="M1460 500 H1380"/>
      <text data-k="t3" x="1420" y="618" text-anchor="middle">Replicates both ways</text>
    </svg>`);
    root.appendChild(this.svg);
    this.a = ['a1', 'a2', 'r1', 'r2'].map((k) => this.svg.querySelector(`[data-k=${k}]`));
    this.tx = ['t2', 't3'].map((k) => this.svg.querySelector(`[data-k=${k}]`));
    this.rto = M.mount(root, '<div class="st2" style="left:1080px;width:320px"><div class="n">Short</div><div class="l">recovery time and recovery point</div></div>').root;
    this.lat = M.mount(root, '<div class="st2" style="left:1460px;width:300px"><div class="n">Low single-digit ms</div><div class="l">reads and writes of AI memory</div></div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    M.rise(this.ent, t, K.entities - 0.3);
    M.rise(this.jr, t, K.journal - 0.8);
    M.draw(this.a[0], t, K.journal - 0.5, 0.4);
    /* the changes append one by one, each lit as it lands */
    this.rows.forEach((r, i) => { const s = K.journal - 0.3 + i * 0.35; M.rise(r, t, s, { dy: 6 }); Roi.glow(r, M.ramp(t, s, s + 0.9, 0.15, 0.5)); });
    M.rise(this.cache, t, K.cached - 0.3);
    M.draw(this.a[1], t, K.recovers - 0.1, 0.7);
    this.a[1].style.opacity = M.prog(t, K.recovers - 0.1, 0.05).toFixed(3);
    if (M.prog(t, K.recovers - 0.1, 0.7) >= 1) { this.a[1].style.strokeDasharray = '5 6'; M.march(this.a[1], t, 12); }
    this.tx[0].style.opacity = M.prog(t, K.recovers + 0.3, 0.4).toFixed(3);
    /* two regions, both active, replicating both ways */
    M.rise(this.sideR, t, K.regions - 0.6, { dy: 10 });
    this.regs.forEach((r, i) => M.rise(r, t, K.regions - 0.4 + i * 0.2));
    [2, 3].forEach((k, j) => { const s = K.regions + 0.4 + j * 0.2; M.draw(this.a[k], t, s, 0.5); this.a[k].style.opacity = M.prog(t, s, 0.05).toFixed(3); if (M.prog(t, s, 0.5) >= 1) { this.a[k].style.strokeDasharray = '5 6'; M.march(this.a[k], t, j ? -12 : 12); } });
    this.tx[1].style.opacity = M.prog(t, K.regions + 0.9, 0.4).toFixed(3);
    /* a cell in each region lights as a write lands, then its twin in the other region */
    const cells = this.regs.map((r) => [...r.querySelectorAll('.dot i')]);
    cells.forEach((cs, r) => cs.forEach((c, i) => { const on = M.ramp(t, K.regions + 1.0 + i * 0.3 + r * 0.15, K.regions + 1.0 + i * 0.3 + r * 0.15 + 0.9, 0.15, 0.5); c.style.borderColor = `rgba(255,206,74,${(0.2 + 0.7 * on).toFixed(2)})`; c.style.background = `rgba(255,206,74,${(0.03 + 0.25 * on).toFixed(3)})`; }));
    M.rise(this.rto, t, K.short - 0.2);
    M.rise(this.lat, t, K.ms - 0.2);
  },
});
