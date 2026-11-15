/* One library covers every country you operate in. One library of controls, defined once, inside the ring of
   ten country labels; three systems with more authority each. As each system lights, the labels of the
   countries it serves light with it and its controls fly across from the library; then each system shows
   a live count of its verdicts. The systems and the countries they serve are illustrative. */
registerSlide({
  id: 'one-library',
  act: 'shape',
  title: 'One library covers every country you operate in',
  beats: [
    { t: 2.2, say: "Put the three shifts together. It starts with your obligations, written once as controls, independent of any one system. Not a policy per country. One library, for every country you operate in." },
    { t: 3.6, say: "Then each system takes on the controls that match what it does and where it operates." },
    { t: 5.6, say: "A system that only answers questions, in two countries, needs a few." },
    { t: 7.8, say: "One that recommends credit decisions in all ten countries needs more. Each country it serves brings the controls that country requires." },
    { t: 10.4, say: "One that can move money needs the most. The controls follow the system's authority and where it runs, rather than one blanket rule for everything." },
    { t: 12.4, say: "And each system keeps a live record of what that means in practice: every verdict, from every request, against every control." },
  ],

  TYPES: ['Guardrail', 'Evaluation', 'Human', 'Gate', 'Sanitizer'],
  SYS: [
    { k: 'Answers questions', n: 'Support assistant', take: 4, base: 21400, rate: 1.2, serves: ['de', 'uk'] },
    { k: 'Recommends decisions', n: 'Loan assistant', take: 12, base: 61800, rate: 3.4, serves: ['de', 'fr', 'kr', 'cn', 'vn', 'sg', 'br', 'us', 'ca', 'uk'] },
    { k: 'Moves money', n: 'Payments agent', take: 24, base: 133900, rate: 7.9, serves: ['de', 'uk', 'us', 'sg'] },
  ],
  /* the library card sits inside the ring */
  RING: { cx: 625, cy: 615, rx: 350, ry: 300 },
  LIB: [458, 425, 356, 380],
  COLS: 5, ROWS: 4, TILE: 42, GAP: 10,
  SX: 1130, SW: 640, SH: 170, SY: [335, 530, 725], SLOT: 20, SP: 23,
  /* the scene time each system lights; the last entry is when the third one settles */
  LIGHT: [3.8, 5.8, 8.0, 10.8],
  VERDICTS: 10.9,

  render(root) {
    const M = Mock, [lx, ly, lw, lh] = this.LIB;
    root.classList.add('sl-pos');
    M.style('sl-pos', `
      .sl-pos .tk-top .tk-h { font-size: 76px; }
      .sl-pos .tk-ring .rl .n { font-size: 24px; letter-spacing: .1em; padding: 11px 16px; }
      .sl-pos .lib { left: ${lx}px; top: ${ly}px; width: ${lw}px; height: ${lh}px; }
      .sl-pos .lib .k { position: absolute; left: 26px; top: 28px; font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-pos .lib .f { position: absolute; left: 26px; right: 26px; top: 286px; font: 500 26px/1.2 var(--sans); color: var(--ink-2); text-wrap: balance; }
      .sl-pos .tile { width: 42px; height: 42px; border-radius: 10px; background: #15151a; box-shadow: inset 0 0 0 2px rgba(241,241,241,.16); display: flex; align-items: center; justify-content: center; }
      .sl-pos .tile svg { width: 24px; height: 24px; overflow: visible; }
      .sl-pos .tile svg path { fill: none; stroke: var(--yellow); stroke-width: 4.5; stroke-linecap: round; stroke-linejoin: round; }
      .sl-pos .sys { left: ${this.SX}px; width: ${this.SW}px; height: ${this.SH}px; }
      .sl-pos .sys .gl { position: absolute; inset: -2px; border-radius: 18px; opacity: 0;
        box-shadow: inset 0 0 0 2px rgba(255,206,74,.7), 0 0 60px -20px rgba(255,206,74,.55);
        background: linear-gradient(160deg, rgba(255,206,74,.10), rgba(255,206,74,.02)); }
      .sl-pos .sys .k { position: absolute; left: 30px; top: 28px; font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-pos .sys .n { position: absolute; left: 30px; top: 62px; font: 700 36px/1.05 var(--sans); letter-spacing: -.015em; }
      .sl-pos .sys .v { position: absolute; left: 30px; top: 122px; display: flex; gap: 14px; align-items: center; font: 600 24px/1 var(--sans); color: var(--green); font-variant-numeric: tabular-nums; }
      .sl-pos .sys .v i { width: 12px; height: 12px; border-radius: 50%; background: var(--green); }
      .sl-pos .sys .ct { position: absolute; right: 24px; top: 22px; }
      .sl-pos .src { left: var(--gut); right: var(--gut); top: 1012px; }
      .sl-pos .slot { width: 20px; height: 20px; border-radius: 6px; box-shadow: inset 0 0 0 2px rgba(241,241,241,.14); }
      .sl-pos .fly { width: 20px; height: 20px; border-radius: 6px; background: var(--yellow); box-shadow: 0 0 16px rgba(255,206,74,.6); z-index: 5; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['One library covers <span class="tk-y">every country you operate in.</span>']);
    this.ring = Talk.ring(root, this.RING);
    this.note = M.mount(root, `<div class="src tk-src">The systems, and the countries each one serves, are illustrative. Applicability by jurisdiction comes from each system’s risk survey, across 241 frameworks and 38 jurisdictions in the pinned corpus.</div>`).root;
    this.lib = M.mount(root, `<div class="lib tk-card"><div class="k">One library</div><div class="f">Each control is written once.</div></div>`);
    const tw = this.COLS * (this.TILE + this.GAP) - this.GAP, tx0 = lx + (lw - tw) / 2, ty0 = ly + 74;
    this.tiles = [];
    for (let r = 0; r < this.ROWS; r++) for (let c = 0; c < this.COLS; c++) {
      const i = r * this.COLS + c, ty = this.TYPES[Math.floor(M.noise(i + 1) * 5)];
      const x = tx0 + c * (this.TILE + this.GAP), y = ty0 + r * (this.TILE + this.GAP);
      const el = M.html(`<div class="tile" style="left:${x}px;top:${y}px"><svg viewBox="0 0 64 64">${Talk.GLYPH[ty].map((p) => `<path d="${p}"/>`).join('')}</svg></div>`);
      root.appendChild(el);
      this.tiles.push({ el, x, y });
    }
    this.sys = this.SYS.map((s, i) => {
      const y = this.SY[i];
      const r = M.mount(root, `<div class="sys tk-card" style="top:${y}px"><div class="gl" data-k="gl"></div><div class="k">${s.k}</div><div class="n">${s.n}</div>
        <div class="v" data-k="v"><i data-k="dot"></i><span data-k="vt"></span></div>
        <span class="ct tk-chip dim" data-k="ct">${s.serves.length} countries</span></div>`);
      const slots = Array.from({ length: s.take }, (_, k) => {
        const cx = this.SX + this.SW - 28 - 12 * this.SP + 4 + (k % 12) * this.SP, cy = y + 112 + Math.floor(k / 12) * this.SP;
        const el = M.html(`<div class="slot" style="left:${cx}px;top:${cy}px"></div>`);
        root.appendChild(el);
        return { el, x: cx, y: cy };
      });
      return { r, slots, y, serves: new Set(s.serves) };
    });
    /* each flyer leaves a library tile for a slot in its system, while that system is lit */
    this.flyers = [];
    let n = 0;
    this.sys.forEach((s, i) => s.slots.forEach((sl, k) => {
      const tile = this.tiles[(n * 7 + 3) % this.tiles.length];
      const el = M.html('<div class="fly"></div>');
      root.appendChild(el);
      this.flyers.push({ el, from: [tile.x + 11, tile.y + 11], to: [sl.x, sl.y], d: this.LIGHT[i] + 0.4 + k * (i === 2 ? 0.035 : 0.06) });
      n++;
    }));
  },

  /** how strongly system i is the subject at time t (0..1) */
  on(i, t) { return Mock.ramp(t, this.LIGHT[i], this.LIGHT[i + 1], 0.45, 0.45); },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.lib.root, t, 0.3);
    M.fade(this.note, t, 2.4, 0.6);
    this.tiles.forEach((tl, i) => {
      const a = M.p(t, 0.6 + (i % this.COLS) * 0.05 + Math.floor(i / this.COLS) * 0.05, 0.5);
      tl.el.style.opacity = a.toFixed(3);
      tl.el.style.transform = `scale(${(0.7 + 0.3 * a).toFixed(3)})`;
    });
    /* the ring: a lit system lights the countries it serves; the others step back */
    const ons = this.sys.map((_, i) => this.on(i, t));
    const any = Math.max(...ons);
    Talk.ringAt(this.ring, t, {
      start: 0.9,
      lit: (k) => Math.max(...this.sys.map((s, i) => (s.serves.has(this.ring.labels[k].c.id) ? ons[i] : 0))),
      dim: any,
    });
    this.sys.forEach((s, i) => {
      const lit = ons[i];
      M.rise(s.r.root, t, 2.4 + i * 0.2, { dy: 16, opacity: 1 - 0.5 * (any - lit) });
      s.r.gl.style.opacity = lit.toFixed(3);
      s.slots.forEach((sl) => { sl.el.style.opacity = (M.prog(t, 2.8 + i * 0.2, 0.4) * (1 - 0.5 * (any - lit))).toFixed(3); });
      const cp = M.p(t, this.LIGHT[i] + 0.2, 0.5);
      s.r.ct.style.opacity = cp.toFixed(3);
      s.r.ct.style.transform = `scale(${(1.15 - 0.15 * cp).toFixed(3)})`;
      /* the live count of verdicts */
      M.fade(s.r.v, t, this.VERDICTS + i * 0.15, 0.5);
      Talk.txt(s.r.vt, `${M.fmt.int(M.ticker(t, this.SYS[i].base, this.SYS[i].rate))} verdicts today`);
      s.r.dot.style.opacity = (0.45 + 0.55 * M.wave(L + i * 0.4, 1.3)).toFixed(3);
    });
    this.flyers.forEach((f) => {
      const p = M.ease.inOutCubic(M.prog(t, f.d, 0.9));
      if (p <= 0) { f.el.style.opacity = 0; return; }
      const x = M.lerp(f.from[0], f.to[0], p), y = M.lerp(f.from[1], f.to[1], p) - Math.sin(p * Math.PI) * 90;
      f.el.style.opacity = 1;
      f.el.style.left = x.toFixed(1) + 'px'; f.el.style.top = y.toFixed(1) + 'px';
      f.el.style.boxShadow = `0 0 ${(16 * (1 - p) + 4).toFixed(1)}px rgba(255,206,74,.6)`;
    });
  },
});
