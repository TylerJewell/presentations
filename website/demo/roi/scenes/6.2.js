/* Scene 6.2: memory. Left: an entity whose changes append to a journal, with its system of record data held in
   memory; a recovery arrow from the journal back to memory. Right: the journal as a timeline that a marker scrubs
   back along, to recover any data from any point in time; then read and write in low single-digit milliseconds,
   and a separate cache struck out as not needed. No number is spoken. */
Roi.register({
  id: '6.2',

  CHANGES: ['Session opened', 'Tool result stored', 'Decision recorded', 'Plan updated', 'Reply sent'],
  TL: { x: 1100, y: 430, w: 640 },

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { entities: at('event-sourced'), journal: at('journal,'), held: at('accessible'), recover: at('recover'), point: at('point'), reads: at('read-write'), ms: at('low'), cache: at('install') };
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
      .r62 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r62 .w path { fill: none; stroke: var(--yellow); stroke-width: 2; }
      .r62 .w path.rp { stroke-dasharray: 5 6; }
      .r62 .w path.tl { stroke: rgba(241,241,241,.35); }
      .r62 .w circle.tk { fill: var(--medium-black); stroke: rgba(241,241,241,.5); stroke-width: 2; }
      .r62 .w circle.mk { fill: var(--yellow); filter: drop-shadow(0 0 8px rgba(255,206,74,.9)); }
      .r62 .w text { font: 500 17px var(--sans); fill: var(--soft-grey); }
      .r62 .w text.tkl { font: 500 15px var(--sans); }
      .r62 .st2 { top: 560px; }
      .r62 .st2 .n { white-space: nowrap; font: 700 34px/1 var(--sans); letter-spacing: -.03em; color: var(--yellow); }
      .r62 .st2 .l { margin-top: 8px; font: 500 20px/1.3 var(--sans); color: var(--soft-grey); }
      .r62 .nocache { top: 560px; }
      .r62 .nocache .t { color: var(--soft-grey); }
      .r62 .nocache .x { position: absolute; left: 14px; right: 14px; top: 50%; height: 3px; border-radius: 2px; background: var(--soft-grey); transform-origin: 0 50%; }
      .r62 .nocache .l { margin-top: 8px; font: 500 18px/1.3 var(--sans); color: var(--soft-grey); }
    `);
    const M = Mock, L = this.TL;
    this.F = Roi.frame(root, { eyebrow: 'Infrastructure', headline: 'Memory is a journal of changes, held in memory.', lit: 0 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">An entity</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1100px">Any point in time</div>').root;
    this.ent = M.mount(root, '<div class="box" style="left:160px;top:340px;width:300px"><div class="k">Entity</div><div class="t">One conversation’s AI memory</div></div>').root;
    this.jr = M.mount(root, `<div class="box jr" style="left:520px;top:340px;width:360px"><div class="k">Journal</div><div class="t">Every change</div>
      ${this.CHANGES.map((c) => `<div class="row">${c}</div>`).join('')}</div>`).root;
    this.rows = [...this.jr.querySelectorAll('.row')];
    this.mem = M.mount(root, '<div class="box y" style="left:160px;top:470px;width:300px"><div class="k">In memory</div><div class="t">System of record data</div></div>').root;
    const step = L.w / (this.CHANGES.length - 1);
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">
      <path data-k="a1" d="M460 385 H520"/>
      <path class="rp" data-k="a2" d="M520 560 H490 C 470 560, 470 530, 460 530"/>
      <text data-k="t2" x="160" y="610">Recovers from the journal</text>
      <path class="tl" data-k="tl" d="M${L.x} ${L.y} H${L.x + L.w}"/>
      ${this.CHANGES.map((c, i) => `<circle class="tk" data-k="k${i}" cx="${L.x + i * step}" cy="${L.y}" r="9"/>
        <text class="tkl" data-k="l${i}" x="${L.x + i * step}" y="${L.y + (i % 2 ? 48 : -24)}" text-anchor="middle">${c}</text>`).join('')}
      <circle class="mk" data-k="mk" cx="0" cy="${L.y}" r="13"/>
    </svg>`);
    root.appendChild(this.svg);
    const q = (k) => this.svg.querySelector(`[data-k=${k}]`);
    this.a = [q('a1'), q('a2')];
    this.t2 = q('t2'); this.tl = q('tl'); this.mk = q('mk');
    this.ticks = this.CHANGES.map((_, i) => [q('k' + i), q('l' + i)]);
    this.lat = M.mount(root, '<div class="st2" style="left:1100px;width:300px"><div class="n">Low single-digit ms</div><div class="l">to read and write data</div></div>').root;
    this.nc = M.mount(root, '<div class="nocache box" style="left:1460px;width:280px"><div class="k">Separate cache</div><div class="t" style="position:relative">A cache to install<div class="x" data-k="x"></div></div><div class="l">Not needed</div></div>');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), L = this.TL, step = L.w / (this.CHANGES.length - 1);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    M.rise(this.ent, t, K.entities - 0.3);
    M.rise(this.jr, t, K.journal - 0.8);
    M.draw(this.a[0], t, K.journal - 0.5, 0.4);
    /* the changes append one by one, each lit as it lands */
    this.rows.forEach((r, i) => { const s = K.journal - 0.3 + i * 0.35; M.rise(r, t, s, { dy: 6 }); Roi.glow(r, M.ramp(t, s, s + 0.9, 0.15, 0.5)); });
    M.rise(this.mem, t, K.held - 0.3);
    M.draw(this.a[1], t, K.recover - 0.1, 0.7);
    this.a[1].style.opacity = M.prog(t, K.recover - 0.1, 0.05).toFixed(3);
    if (M.prog(t, K.recover - 0.1, 0.7) >= 1) { this.a[1].style.strokeDasharray = '5 6'; M.march(this.a[1], t, 12); }
    this.t2.style.opacity = M.prog(t, K.recover + 0.3, 0.4).toFixed(3);
    /* the journal as a timeline; a marker scrubs back from the latest change to an earlier one, and that change lights */
    M.rise(this.sideR, t, K.recover - 0.4, { dy: 10 });
    M.draw(this.tl, t, K.recover - 0.2, 0.6);
    this.ticks.forEach(([c, l], i) => { const o = M.prog(t, K.recover + i * 0.1, 0.3).toFixed(3); c.style.opacity = o; l.style.opacity = o; });
    const back = M.ease.inOutCubic(M.prog(t, K.point - 0.2, 1.4)), at = (this.CHANGES.length - 1) * (1 - 0.75 * back);
    this.mk.setAttribute('cx', (L.x + at * step).toFixed(1));
    this.mk.style.opacity = M.prog(t, K.recover + 0.5, 0.3).toFixed(3);
    const hit = M.prog(t, K.point + 1.2, 0.3);
    this.ticks.forEach(([c, l], i) => { const on = i === 1 ? hit : 0; c.style.stroke = on ? `rgba(255,206,74,${(0.5 + 0.5 * on).toFixed(2)})` : ''; l.style.fill = on > 0.5 ? 'var(--yellow)' : ''; });
    M.rise(this.lat, t, K.ms - 0.2);
    M.rise(this.nc.root, t, K.cache - 0.6);
    this.nc.x.style.transform = `scaleX(${M.ease.outCubic(M.prog(t, K.cache, 0.5)).toFixed(3)})`;
  },
});
