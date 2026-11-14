/* A posture, proved. One library of controls, defined once; three systems with more authority each; each
   takes the controls its authority needs (they fly across in proportion); then each proves its posture
   with a live stream of verdicts. */
registerSlide({
  id: 'posture',
  act: 'shape',
  title: 'A posture, proved',
  beats: [
    { t: 2.0, say: "Put the three shifts together and you get what I'd call a governance posture. It starts with your risk appetite and your obligations, written once as controls, independent of any one system. Not a policy per project. One library." },
    { t: 3.9, say: "Then each system takes on the controls that match what it is allowed to do." },
    { t: 7.0, say: "A system that only answers questions needs a few. One that recommends a credit decision needs more. One that can move money needs the most. Proportional to its authority, not one blanket rule applied the same way everywhere, which either smothers the simple systems or under-protects the powerful ones." },
    { t: 9.0, say: "And the posture is proved, not asserted. Not 'we have a policy for that.' Instead: here is every verdict, from every request, against every control, for every system. That's the standard I'd hold any of us to." },
  ],

  TYPES: ['Guardrail', 'Evaluation', 'Human', 'Gate', 'Sanitizer'],
  SYS: [
    { k: 'Answers questions', n: 'Support assistant', take: 4, base: 21400, rate: 1.2 },
    { k: 'Recommends decisions', n: 'Loan assistant', take: 12, base: 61800, rate: 3.4 },
    { k: 'Moves money', n: 'Payments agent', take: 24, base: 133900, rate: 7.9 },
  ],
  COLS: 8, ROWS: 6, TILE: 56, GAP: 14, LX: 177, LY: 430,
  SX: 1050, SY: [330, 545, 760], SLOT: 26, SP: 29,

  render(root) {
    const M = Mock;
    root.classList.add('sl-pos');
    M.style('sl-pos', `
      .sl-pos .lib { left: 150px; top: 330px; width: 600px; height: 620px; }
      .sl-pos .lib .k { position: absolute; left: 27px; top: 34px; font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-pos .lib .f { position: absolute; left: 27px; right: 27px; top: 528px; font: 500 28px/1.25 var(--sans); color: var(--ink-2); }
      .sl-pos .tile { width: 56px; height: 56px; border-radius: 12px; background: #15151a; box-shadow: inset 0 0 0 2px rgba(241,241,241,.16); display: flex; align-items: center; justify-content: center; }
      .sl-pos .tile svg { width: 30px; height: 30px; overflow: visible; }
      .sl-pos .tile svg path { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .sl-pos .sys { left: 1050px; width: 720px; height: 190px; }
      .sl-pos .sys .k { position: absolute; left: 30px; top: 34px; font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-pos .sys .n { position: absolute; left: 30px; top: 70px; font: 700 36px/1.05 var(--sans); letter-spacing: -.015em; }
      .sl-pos .sys .v { position: absolute; left: 30px; top: 128px; display: flex; gap: 14px; align-items: center; font: 600 24px/1 var(--sans); color: var(--green); font-variant-numeric: tabular-nums; }
      .sl-pos .sys .v i { width: 12px; height: 12px; border-radius: 50%; background: var(--green); }
      .sl-pos .sys .pr { position: absolute; right: 26px; top: 26px; }
      .sl-pos .slot { width: 26px; height: 26px; border-radius: 7px; box-shadow: inset 0 0 0 2px rgba(241,241,241,.14); }
      .sl-pos .fly { width: 26px; height: 26px; border-radius: 7px; background: var(--yellow); box-shadow: 0 0 16px rgba(255,206,74,.6); z-index: 5; }
      .sl-pos svg.ln { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-pos .ln path { fill: none; stroke: rgba(255,206,74,.4); stroke-width: 2.5; stroke-dasharray: 6 8; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['A posture, <span class="tk-y">proved.</span>']);
    this.lib = M.mount(root, `<div class="lib tk-card"><div class="k">Your controls, defined once</div><div class="f">From your risk appetite, the regulations you answer to, and your own policy.</div></div>`);
    this.tiles = [];
    for (let r = 0; r < this.ROWS; r++) for (let c = 0; c < this.COLS; c++) {
      const i = r * this.COLS + c, ty = this.TYPES[Math.floor(M.noise(i + 1) * 5)];
      const x = this.LX + c * (this.TILE + this.GAP), y = this.LY + r * (this.TILE + this.GAP);
      const el = M.html(`<div class="tile" style="left:${x}px;top:${y}px"><svg viewBox="0 0 64 64">${Talk.GLYPH[ty].map((p) => `<path d="${p}"/>`).join('')}</svg></div>`);
      root.appendChild(el);
      this.tiles.push({ el, x, y });
    }
    this.lnSvg = M.html('<svg class="ln" viewBox="0 0 1920 1080"></svg>');
    root.appendChild(this.lnSvg);
    this.sys = this.SYS.map((s, i) => {
      const y = this.SY[i];
      const r = M.mount(root, `<div class="sys tk-card" style="top:${y}px"><div class="k">${s.k}</div><div class="n">${s.n}</div><div class="v" data-k="v"><i data-k="dot"></i><span data-k="vt"></span></div><span class="pr tk-chip ok" data-k="pr">Proved</span></div>`);
      const slots = Array.from({ length: s.take }, (_, k) => {
        const cx = this.SX + 720 - 28 - 12 * this.SP + (k % 12) * this.SP, cy = y + 112 + Math.floor(k / 12) * 34;
        const el = M.html(`<div class="slot" style="left:${cx}px;top:${cy}px"></div>`);
        root.appendChild(el);
        return { el, x: cx, y: cy };
      });
      const ln = M.svg('path', { d: `M750,640 C900,640 900,${y + 95} 1050,${y + 95}` }, this.lnSvg);
      return { r, slots, ln, y };
    });
    /* each flyer leaves a library tile for a slot in its system */
    this.flyers = [];
    let n = 0;
    this.sys.forEach((s, i) => s.slots.forEach((sl, k) => {
      const tile = this.tiles[(n * 7 + 3) % this.tiles.length];
      const el = M.html('<div class="fly"></div>');
      root.appendChild(el);
      this.flyers.push({ el, from: [tile.x + 15, tile.y + 15], to: [sl.x, sl.y], d: 4.1 + i * 0.75 + k * 0.035 });
      n++;
    }));
  },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.lib.root, t, 0.3);
    this.tiles.forEach((tl, i) => {
      const a = M.p(t, 0.6 + (i % this.COLS) * 0.05 + Math.floor(i / this.COLS) * 0.05, 0.5);
      tl.el.style.opacity = a.toFixed(3);
      tl.el.style.transform = `scale(${(0.7 + 0.3 * a).toFixed(3)})`;
    });
    this.sys.forEach((s, i) => {
      M.rise(s.r.root, t, 2.2 + i * 0.2, { dy: 16 });
      s.slots.forEach((sl) => { sl.el.style.opacity = M.prog(t, 2.6 + i * 0.2, 0.4).toFixed(3); });
      M.draw(s.ln, t, 4.0 + i * 0.75, 0.5);
      s.ln.style.strokeDasharray = '6 8';
      s.ln.style.opacity = (M.prog(t, 4.0 + i * 0.75, 0.2) * (1 - 0.7 * M.prog(t, 7.2, 0.6))).toFixed(3);
      /* proved: a live count of verdicts and the chip */
      M.fade(s.r.v, t, 7.3 + i * 0.15, 0.5);
      Talk.txt(s.r.vt, `${M.fmt.int(M.ticker(t, this.SYS[i].base, this.SYS[i].rate))} verdicts today`);
      s.r.dot.style.opacity = (0.45 + 0.55 * M.wave(L + i * 0.4, 1.3)).toFixed(3);
      const pp = M.p(t, 7.6 + i * 0.2, 0.5);
      s.r.pr.style.opacity = pp.toFixed(3);
      s.r.pr.style.transform = `scale(${(1.25 - 0.25 * pp).toFixed(3)})`;
    });
    this.flyers.forEach((f) => {
      const p = M.ease.inOutCubic(M.prog(t, f.d, 0.9));
      if (p <= 0) { f.el.style.opacity = 0; return; }
      const x = M.lerp(f.from[0], f.to[0], p), y = M.lerp(f.from[1], f.to[1], p) - Math.sin(p * Math.PI) * 60;
      f.el.style.opacity = 1;
      f.el.style.left = x.toFixed(1) + 'px'; f.el.style.top = y.toFixed(1) + 'px';
      f.el.style.boxShadow = `0 0 ${(16 * (1 - p) + 4).toFixed(1)}px rgba(255,206,74,.6)`;
    });
  },
});
