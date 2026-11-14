/* Scene E2: Every change is a bet. Live underwriting calls flow into frontier-large while its spend meter
   climbs. The small model slides in at a third of the price. Switching everything sends the whole stream
   to it, and a few calls land red-orange as quality dips under its limit; not switching sends the stream
   back and the meter climbs again. Both paths dim, and a third path draws between them in yellow, through
   a gate of four limits. */
registerScene({
  id: "E2",
  act: 1,
  title: "Every change is a bet",
  duration: 12,
  caption: "Every model change is a bet. A cheaper model could cut your bill, or quietly hurt your customers. So most teams never switch, or switch blind.",

  /* The small model arrives on "cheaper", the stream switches on "cut your bill", calls fail on "hurt",
     the stream returns on "never switch", and the third path draws on "or switch blind". */
  timing() {
    if (this.CHEAP != null) return;
    const at = (w, from) => Mock.captionAt(this, w, from);
    this.CHEAP = at('cheaper') - 0.2;
    this.SWITCH = at('cut') - 0.2;
    this.HURT = at('hurt') - 0.1;
    this.NEVER = at('never') - 0.2;
    this.THIRD = at('or', 20) - 0.1;
  },

  F: [860, 470],           /* the fork */
  V: 250,                  /* call speed, px a second */
  PITCH: 30, K: 46,        /* calls are 30 px apart on the stream */
  RATE: 41,                /* frontier spend, dollars a second */
  SMALL: 0.009 / 0.031,

  render(root) {
    root.classList.add('se2');
    Mock.style('se2', `
      .se2 svg.fl { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .se2 .ln { fill: none; stroke: rgba(241,241,241,.2); stroke-width: 2; stroke-linecap: round; }
      .se2 .yl { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-dasharray: 5 5; stroke-linecap: butt; }
      .se2 .yh { fill: var(--yellow); }
      .se2 .lim { stroke: rgba(241,241,241,.45); stroke-width: 1.5; stroke-dasharray: 4 5; fill: none; }
      .se2 .q { fill: none; stroke: var(--white); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
      .se2 .q.bad { stroke: var(--red); }
      .se2 .call { fill: #F1F1F1; }
      .se2 .call.bad { fill: var(--red); }
      .se2 .mc { width: 480px; height: 160px; padding: 22px 26px; border-radius: 14px; border: 1px solid var(--hair-hi); background: var(--panel); }
      .se2 .mc .k { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .se2 .mc .n { margin-top: 12px; font: 700 36px/1 var(--sans); letter-spacing: -.025em; color: var(--white); }
      .se2 .mc .pr { position: absolute; right: 26px; top: 20px; text-align: right; font: 700 34px/1 var(--sans); letter-spacing: -.02em; color: var(--white); font-variant-numeric: tabular-nums; }
      .se2 .mc .pr small { display: block; margin-top: 6px; font: 500 14px/1 var(--sans); letter-spacing: 0; color: var(--soft-grey); }
      .se2 .mc .tr { position: absolute; left: 26px; right: 26px; bottom: 24px; height: 8px; border-radius: 4px; background: rgba(241,241,241,.08); }
      .se2 .mc .tr i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: rgba(241,241,241,.6); }
      .se2 .mtr { left: 1240px; top: 52px; }
      .se2 .mtr .k { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .se2 .mtr .v { margin-top: 10px; font: 700 64px/1 var(--sans); letter-spacing: -.03em; color: var(--white); font-variant-numeric: tabular-nums; }
      .se2 .mtr .rt { margin-top: 8px; font: 500 18px/1 var(--sans); color: var(--soft-grey); font-variant-numeric: tabular-nums; }
      .se2 .tag { font: 600 15px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--white); white-space: nowrap; }
      .se2 .src { left: 100px; top: 426px; color: var(--soft-grey); }
      .se2 .qc { left: 872px; top: 706px; width: 290px; height: 96px; }
      .se2 .qc .k { font: 600 12px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .se2 .qc .lk { position: absolute; right: 0; top: 30px; font: 600 12px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--soft-grey); }
      .se2 .gate { left: 1240px; top: 396px; width: 480px; height: 148px; padding: 24px 26px; border-radius: 14px;
        border: 1px solid rgba(255,206,74,.6); background: linear-gradient(160deg, rgba(255,206,74,.12), rgba(255,206,74,.03)), #0b0a08;
        box-shadow: 0 0 70px -18px rgba(255,206,74,.7); }
      .se2 .gate .k { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--yellow); }
      .se2 .gate .chips { display: flex; gap: 10px; margin-top: 22px; }
      .se2 .gate .mk-chip { font-size: 15px; letter-spacing: .04em; text-transform: none; padding: 10px 15px; }
    `);
    Mock.dotGrid(root);
    const [fx, fy] = this.F;
    const top = `M${fx} ${fy} C1040 ${fy} 1060 280 1236 280`, bot = `M${fx} ${fy} C1040 ${fy} 1060 690 1236 690`;
    /* the quality line: flat inside its limit, then a dip below it */
    const QX0 = 872, QX1 = 1162, QY = 742, LIM = 762;
    this.QDIP = 0.42;
    const qPts = (a, b) => {
      let d = '';
      for (let i = 0; i <= 40; i++) {
        const u = a + ((b - a) * i) / 40, x = QX0 + (QX1 - QX0) * u;
        const dip = Math.max(0, u - this.QDIP) / (1 - this.QDIP);
        const y = QY + 4 * Math.sin(u * 19) * (1 - dip) + 38 * Math.pow(dip, 0.6) + 3 * Math.sin(u * 41) * dip;
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      return d;
    };
    this.svg = Mock.html(`<svg class="fl" viewBox="0 0 1920 1080">
      <defs><clipPath id="se2clip"><rect data-k="clip" x="${fx}" y="440" width="0" height="60"/></clipPath>
        <filter id="se2glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5"/></filter></defs>
      <path class="ln" data-k="src" d="M100 ${fy} H${fx}"/>
      <g data-k="gTop"><path class="ln" data-k="top" d="${top}"/></g>
      <g data-k="gBot"><path class="ln" data-k="bot" d="${bot}"/></g>
      <g data-k="calls"></g>
      <g data-k="qc"><line class="lim" x1="${QX0}" x2="${QX1}" y1="${LIM}" y2="${LIM}"/>
        <path class="q" data-k="qa" d="${qPts(0, this.QDIP)}"/><path class="q bad" data-k="qb" d="${qPts(this.QDIP, 1)}"/></g>
      <g clip-path="url(#se2clip)"><path class="yl" data-k="yl" d="M${fx} ${fy} H1240 M1720 ${fy} H1792"/>
        <path class="yh" d="M1806 ${fy} l-14 -8 v16 z"/></g>
    </svg>`);
    root.appendChild(this.svg);
    this.s = {};
    this.svg.querySelectorAll('[data-k]').forEach((n) => (this.s[n.dataset.k] = n));
    this.calls = Array.from({ length: this.K }, () => Mock.svg('circle', { r: 4.5, class: 'call' }, this.s.calls));
    this.LS = fx - 100;
    this.LT = this.s.top.getTotalLength();
    this.LB = this.s.bot.getTotalLength();

    this.src = Mock.mount(root, `<div class="tag src">Underwriting calls</div>`).root;
    this.mtr = Mock.mount(root, `<div class="mtr"><div class="k">Spend today</div><div class="v" data-k="v"></div><div class="rt" data-k="rt"></div></div>`);
    const card = (y, k, n, price, w) => Mock.mount(root, `
      <div class="mc" style="left:1240px;top:${y}px"><div class="k">${k}</div><div class="n">${n}</div>
        <div class="pr">${price}<small>a call</small></div><div class="tr"><i style="width:${w}%"></i></div></div>`).root;
    this.big = card(200, 'Frontier model', 'frontier-large', '$0.031', 100);
    this.small = card(610, 'Small model', 'underwrite-4b', '$0.009', (100 * this.SMALL).toFixed(1));
    this.tagBot = Mock.mount(root, `<div class="tag" style="left:840px;top:612px">Switch everything</div>`).root;
    this.tagTop = Mock.mount(root, `<div class="tag" style="left:870px;top:350px">Don’t switch</div>`).root;
    this.qc = Mock.mount(root, `<div class="qc"><div class="k">Quality</div><div class="lk">Limit</div></div>`).root;
    this.gate = Mock.mount(root, `<div class="gate"><div class="k" data-k="k">Your limits</div>
      <div class="chips">${['Quality', 'Cost', 'Latency', 'Errors'].map((c, i) => `<span class="mk-chip y" data-k="c${i}">${c}</span>`).join('')}</div></div>`);
  },

  /** Where the stream goes for a call that reaches the fork at scene time tc. */
  route(tc) {
    return tc >= this.SWITCH + 0.3 && tc < this.NEVER + 0.2 ? 'bot' : 'top';
  },

  /** Spend at scene time t: the frontier rate, cut to the small model's while the stream is switched. */
  spend(t) {
    const a = this.SWITCH + 1.4, b = this.NEVER + 1.4, R = this.RATE;
    const seg = (x0, x1) => Math.max(0, Math.min(t, x1) - x0);
    return 48_210 + R * seg(0, a) + R * this.SMALL * seg(a, b) + R * seg(b, Infinity);
  },

  at(t) {
    this.timing();
    const M = Mock, s = this.s, [fx, fy] = this.F;
    const dim = 1 - 0.72 * M.p(t, this.THIRD, 0.6, 'inOutCubic');

    /* the stream and the frontier model are live when the scene opens */
    [s.src, s.top].forEach((p) => M.fade(p, t, 0, 0.5));
    s.gTop.style.opacity = dim.toFixed(3);
    M.rise(this.src, t, 0.2, { dy: 10 });
    M.rise(this.big, t, 0.15, { opacity: dim });
    M.rise(this.mtr.root, t, 0.3, { opacity: dim });
    const sp = this.spend(Math.max(0, t));
    this.mtr.v.textContent = '$' + sp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const cut = t >= this.SWITCH + 1.4 && t < this.NEVER + 1.4;
    this.mtr.rt.textContent = `+$${(cut ? this.RATE * this.SMALL : this.RATE).toFixed(2)} a second`;

    /* the small model slides in at a third of the price */
    const inP = M.p(t, this.CHEAP, 0.9);
    M.set(this.small, { opacity: (M.ease.css(M.prog(t, this.CHEAP, 0.7)) * dim).toFixed(3), transform: `translateX(${((1 - inP) * 90).toFixed(1)}px)` });

    /* switch everything: the second path draws, and the whole stream takes it */
    M.draw(s.bot, t, this.SWITCH, 0.6);
    s.gBot.style.opacity = dim.toFixed(3);
    const onBot = M.ramp(t, this.SWITCH + 0.2, this.NEVER + 0.6, 0.4, 0.4);
    M.rise(this.tagBot, t, this.SWITCH + 0.2, { dy: 10, opacity: (0.45 + 0.55 * onBot) * dim });
    M.rise(this.tagTop, t, this.NEVER, { dy: 10, opacity: dim });

    /* quality slips under its limit while the calls land on the small model */
    M.rise(this.qc, t, this.SWITCH + 0.3, { dy: 8, opacity: dim });
    s.qc.style.opacity = (M.prog(t, this.SWITCH + 0.3, 0.5) * dim).toFixed(3);
    M.draw(s.qa, t, this.SWITCH + 0.4, this.HURT - this.SWITCH - 0.4, 'linear');
    M.draw(s.qb, t, this.HURT, this.NEVER - this.HURT, 'outCubic');

    /* the calls: each is placed by how far it has travelled on the live clock */
    const abs = M.abs(t), total = this.K * this.PITCH;
    this.calls.forEach((c, k) => {
      const run = abs * this.V + k * this.PITCH, d = run % total, lap = Math.floor(run / total);
      let x, y, op = 1, bad = false;
      if (d < this.LS) {
        x = 100 + d; y = fy;
        op = M.clamp(d / 60);
      } else {
        const tc = t - (d - this.LS) / this.V, br = this.route(tc), L = br === 'bot' ? this.LB : this.LT, u = d - this.LS;
        if (u > L) { c.style.opacity = 0; return; }
        const pt = (br === 'bot' ? s.bot : s.top).getPointAtLength(u);
        x = pt.x; y = pt.y;
        op = M.clamp((L - u) / 40) * (br === 'bot' ? 1 : dim + (1 - dim) * 0.15);
        bad = br === 'bot' && tc >= this.HURT - 0.6 && M.noise(k * 7 + lap * 131) < 0.3 && u > 0.45 * L;
      }
      c.setAttribute('cx', x.toFixed(1));
      c.setAttribute('cy', y.toFixed(1));
      c.setAttribute('class', bad ? 'call bad' : 'call');
      c.style.opacity = (op * (t < 0.1 ? 0 : M.prog(t, 0.1, 0.5))).toFixed(3);
    });

    /* the third path: between the two, through a gate of your limits */
    const yp = M.p(t, this.THIRD + 0.2, 1.0, 'inOutCubic');
    s.clip.setAttribute('width', (yp * (1810 - fx)).toFixed(1));
    M.march(s.yl, abs, 16);
    M.rise(this.gate.root, t, this.THIRD + 0.45, { dy: 14 });
    [0, 1, 2, 3].forEach((i) => M.rise(this.gate['c' + i], t, this.THIRD + 0.75 + i * 0.08, { dy: 8 }));
  },
});
