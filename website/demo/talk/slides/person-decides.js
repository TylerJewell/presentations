/* A person decides. A live measure moves inside the band its owner set; it crosses the limit; the
   system holds the way the owner chose in advance; a named person picks what happens next; the decision
   lands in the record with their name. */
registerSlide({
  id: 'person-decides',
  act: 'principles',
  title: 'A person decides',
  beats: [
    { t: 1.8, say: "Seventh, and to me the most important: a person decides when a limit is breached. Here's a limit an owner set, and a live measure moving inside it. Here it's quality, measured against the previous version of the system." },
    { t: 4.6, say: "When the measure crosses the limit, the system doesn't improvise. It holds, in exactly the way the owner chose in advance." },
    { t: 7.0, say: "Then a named person decides what happens next. The system can detect, contain and recommend. It doesn't get to excuse itself. Retrain and resume, keep testing, or roll back: that choice belongs to an accountable person, with the evidence in front of them." },
    { t: 9.0, say: "And that decision, with the person's name on it, goes into the same record as everything else. Months later, anyone can see what happened, who decided, and why." },
  ],

  P: { x0: 170, x1: 1120, y0: 330, y1: 800, lo: -6, hi: 2, limit: -3 },
  DIP: 2.2, HOLD: 3.3, OPTS: 4.9, CLICK: 6.2, REC: 7.4,

  render(root) {
    Act3.mark(root, 7);
    const M = Mock, P = this.P;
    root.classList.add('sl-pd', 'a3');
    const y = (v) => P.y0 + ((P.hi - v) / (P.hi - P.lo)) * (P.y1 - P.y0);
    this.y = y;
    M.style('sl-pd', `
      .sl-pd svg.ch { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-pd .zone { fill: rgba(114,211,91,.10); }
      .sl-pd .below { fill: rgba(255,84,0,.06); }
      .sl-pd .lim { stroke: #f1f1f1; stroke-width: 3; stroke-dasharray: 10 8; opacity: .8; }
      .sl-pd .ax { stroke: rgba(241,241,241,.3); stroke-width: 2; }
      .sl-pd .ms { fill: none; stroke: var(--yellow); stroke-width: 5; stroke-linejoin: round; stroke-linecap: round; }
      .sl-pd .hd { fill: var(--yellow); }
      .sl-pd .ms.red { stroke: var(--red); }
      .sl-pd .ck { white-space: nowrap; font: 600 25px/1 var(--sans); color: var(--ink-2); letter-spacing: .12em; text-transform: uppercase; }
      .sl-pd .ll { white-space: nowrap; font: 600 25px/1 var(--sans); color: var(--ink); }
      .sl-pd .card { left: 1240px; top: 300px; width: 530px; height: 560px; padding: 30px 32px; }
      .sl-pd .card > * { position: relative; }
      .sl-pd .card .k { font: 600 24px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
      .sl-pd .card .held { margin-top: 18px; }
      .sl-pd .card .pre { margin-top: 18px; font: 500 30px/1.25 var(--sans); color: var(--ink); }
      .sl-pd .card .by { margin-top: 12px; font: 500 24px/1.2 var(--sans); color: var(--ink-2); }
      .sl-pd .opts { position: absolute; left: 32px; right: 32px; top: 300px; }
      .sl-pd .opt { height: 64px; margin-top: 10px; padding: 0 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px; font: 600 29px/1 var(--sans); color: var(--ink-2); box-shadow: inset 0 0 0 2px var(--line-2); }
      .sl-pd .opt i { width: 22px; height: 22px; border-radius: 50%; box-shadow: inset 0 0 0 2.5px var(--ink-3); }
      .sl-pd .opt.on { color: var(--ink); background: rgba(255,206,74,.12); box-shadow: inset 0 0 0 2px rgba(255,206,74,.8); }
      .sl-pd .opt.on i { box-shadow: inset 0 0 0 7px var(--yellow); }
      .sl-pd .rec { left: 150px; top: 900px; width: 1620px; height: 84px; display: flex; align-items: center; gap: 26px; padding: 0 28px; }
      .sl-pd .rec .tm { font: 500 25px/1 var(--mono); color: var(--ink-3); }
      .sl-pd .rec .n { font: 600 30px/1 var(--sans); color: var(--ink); flex: 1; white-space: nowrap; }
      .sl-pd .rec .who { display: flex; align-items: center; gap: 12px; font: 600 28px/1 var(--sans); color: var(--yellow); }
      .sl-pd .rec .who b { width: 44px; height: 44px; border-radius: 50%; background: var(--yellow); color: #111; display: flex; align-items: center; justify-content: center; font: 700 19px/1 var(--sans); }
      .sl-pd .rec .id { font: 500 24px/1 var(--mono); color: var(--ink-3); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['When a limit breaks, <span class="tk-y">a person decides.</span>']);
    this.svg = M.html(`<svg class="ch" viewBox="0 0 1920 1080">
      <rect class="zone" x="${P.x0}" y="${P.y0}" width="${P.x1 - P.x0}" height="${y(P.limit) - P.y0}"/>
      <rect class="below" x="${P.x0}" y="${y(P.limit)}" width="${P.x1 - P.x0}" height="${P.y1 - y(P.limit)}"/>
      <line class="ax" x1="${P.x0}" x2="${P.x0}" y1="${P.y0}" y2="${P.y1}"/><line class="ax" x1="${P.x0}" x2="${P.x1}" y1="${P.y1}" y2="${P.y1}"/>
      <line class="lim" x1="${P.x0}" x2="${P.x1}" y1="${y(P.limit)}" y2="${y(P.limit)}"/>
      <defs><clipPath id="pd-below"><rect x="0" y="${y(P.limit)}" width="1920" height="1080"/></clipPath></defs>
      <path class="ms"/><path class="ms red" clip-path="url(#pd-below)"/><circle class="hd" r="11"/></svg>`);
    root.appendChild(this.svg);
    this.ms = this.svg.querySelector('.ms'); this.msr = this.svg.querySelector('.ms.red'); this.hd = this.svg.querySelector('.hd');
    this.lab = M.mount(root, `<div><div class="ck" style="position:absolute;left:${P.x0 + 20}px;top:${P.y0 + 20}px">Quality, against the previous version</div>
      <div class="ll" style="position:absolute;left:${P.x0 + 20}px;top:${y(P.limit) + 16}px">Limit, set by the owner</div>
      <div class="ck" style="position:absolute;left:${P.x1 - 50}px;top:${P.y1 + 16}px">Now</div></div>`).root;
    this.card = M.mount(root, `<div class="card tk-card">
      <div class="k">Experiment · smaller model</div>
      <div class="held"><span class="tk-chip y" data-k="chip">On hold</span></div>
      <div class="pre" data-k="pre">Affected traffic back on the previous version</div>
      <div class="by" data-k="by">As chosen in advance by T. Jewell, owner</div>
      <div class="opts" data-k="opts"><div class="k">What happens next</div>
        <div class="opt" data-k="o0"><i></i>Resume as it was</div>
        <div class="opt" data-k="o1"><i></i>Retrain, then resume</div>
        <div class="opt" data-k="o2"><i></i>Roll back</div></div></div>`);
    this.rec = M.mount(root, `<div class="rec tk-card hot"><span class="tm">14:22:07</span><span class="n">Decision: retrain, then resume</span>
      <span class="who"><b>TJ</b>T. Jewell, owner</span><span class="id">exp-142 · bundle v4</span></div>`).root;
    this.cursor = M.cursor(root);
  },

  /** the measure at scene time s: wandering inside the band, then falling through the limit at DIP */
  val(s, L) {
    const M = Mock;
    const base = -0.8 + 2.0 * (M.wander(L, 0.35, 3) - 0.5) + 0.5 * (M.wander(L, 1.1, 7) - 0.5);
    const d = M.ease.inOutCubic(M.prog(s, this.DIP, 1.0));
    return M.lerp(base, -4.1 + 0.35 * (M.wander(L, 0.8, 9) - 0.5), d);
  },

  at(t) {
    const M = Mock, P = this.P, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.fade(this.svg, t, 0.3, 0.6);
    M.fade(this.lab, t, 0.5, 0.6);
    /* the measure scrolls in from the right on the live clock: 120 px of chart per second */
    const SP = 120, pts = [];
    for (let x = P.x0; x <= P.x1; x += 10) {
      const back = (P.x1 - x) / SP;
      pts.push([x, this.y(this.val(t - back, L - back))]);
    }
    const dd = Talk.smooth(pts); this.ms.setAttribute('d', dd); this.msr.setAttribute('d', dd);
    const [hx, hy] = pts[pts.length - 1];
    this.hd.setAttribute('cx', hx); this.hd.setAttribute('cy', hy.toFixed(1));
    const out = t >= this.DIP + 0.55;
    this.hd.style.fill = out ? 'var(--red)' : '';
    /* the hold, as the owner chose */
    M.rise(this.card.root, t, this.HOLD, { dy: 14 });
    const pulse = M.ramp(t, this.HOLD, this.HOLD + 1.2, 0.15, 0.8);
    this.card.chip.style.transform = `scale(${(1 + 0.15 * pulse).toFixed(3)})`;
    /* a person decides */
    M.rise(this.card.opts, t, this.OPTS, { dy: 12 });
    const chosen = t >= this.CLICK;
    this.card.o1.classList.toggle('on', chosen);
    if (!this.oAt) { const r = M.rectOf(this.card.root.parentNode, this.card.o1); this.oAt = r; }
    const o = this.oAt;
    this.cursor.at(t, [
      { t: this.OPTS + 0.6, x: o[0] + o[2] * 0.8, y: o[1] + 140, glide: 0.01 },
      { t: this.CLICK, x: o[0] + 90, y: o[1] + o[3] * 0.55, click: true, glide: 0.9 },
      { t: this.CLICK + 0.55, x: o[0] + 140, y: o[1] + 100, glide: 0.5, hide: true },
    ]);
    /* into the record */
    M.rise(this.rec, t, this.REC, { dy: 18 });
  },
});
