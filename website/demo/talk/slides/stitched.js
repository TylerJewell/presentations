/* The contrast for risk officers: a stitched-together stack of six tools, with gaps between them where
   evidence is lost and controls are written again; then the one platform, where the same rail carries a
   request through every part without a break. */
registerSlide({
  id: 'stitched',
  act: 'together',
  title: 'Stitched together, or one platform',
  beats: [
    { t: 2.4, say: "Compare that with how most companies assemble this today: a builder from one vendor, a runtime from another, a separate gateway, an evaluation tool, a GRC system, and an observability stack." },
    { t: 4.8, say: "Every joint between those tools is a gap. The same control gets written again in three places, and they drift apart. Evidence stops at each boundary, and someone rebuilds the story by hand at audit time. Ask which version of a control was in force when a decision was made, and you get six partial answers." },
    { t: 7.2, say: "One platform closes those gaps. The control is defined once, it runs where the system runs, and every verdict lands in the same record. Now let me show you what that looks like." },
  ],

  TOOLS: [
    { n: 'Builder', x: 185, y: 420 }, { n: 'Runtime', x: 455, y: 420 }, { n: 'Gateway', x: 725, y: 420 },
    { n: 'Eval tool', x: 185, y: 740 }, { n: 'GRC system', x: 455, y: 740 }, { n: 'Observability', x: 725, y: 740 },
  ],
  /* links between tools; gap: the label shown where the link breaks */
  LINKS: [
    { a: 0, b: 1 }, { a: 1, b: 2, gap: 'Control written again', at: [590, 376] }, { a: 0, b: 3 }, { a: 1, b: 4 },
    { a: 3, b: 4, gap: 'Evidence lost', at: [320, 862] }, { a: 4, b: 5 }, { a: 2, b: 5, gap: 'Evidence lost', at: [590, 612] },
  ],
  BW: 190, BH: 100,
  PARTS: ['Specify', 'Agent SDK', 'AI gateway', 'Verify', 'Optimize'],

  render(root) {
    const M = Mock;
    root.classList.add('sl-st');
    M.style('sl-st', `
      .sl-st .pn { top: 280px; height: 660px; }
      .sl-st .pn .k { position: absolute; left: 30px; top: 28px; font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-st .pn.one .k { color: var(--yellow); }
      .sl-st .tl { width: 190px; height: 100px; border-radius: 14px; background: #121215; box-shadow: inset 0 0 0 2px rgba(241,241,241,.22);
        display: flex; align-items: center; justify-content: center; font: 700 26px/1 var(--sans); letter-spacing: -.015em; color: var(--ink); white-space: nowrap; }
      .sl-st svg.ln { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-st .lk { stroke: rgba(241,241,241,.42); stroke-width: 3; fill: none; }
      .sl-st .br { stroke: var(--red); stroke-width: 4; stroke-linecap: round; }
      .sl-st .rq { fill: var(--yellow); }
      .sl-st .gl { font: 600 24px/1.1 var(--sans); color: var(--red); white-space: nowrap; transform: translate(-50%, 0); text-align: center; }
      .sl-st .mc { width: 132px; height: 120px; border-radius: 14px; padding: 0 12px; display: flex; align-items: center; justify-content: center; text-align: center;
        border: 2px solid rgba(255,206,74,.6); background: linear-gradient(160deg, rgba(255,206,74,.12), rgba(255,206,74,.03)), #0B0B0E;
        font: 700 25px/1.08 var(--sans); letter-spacing: -.015em; color: var(--ink); }
      .sl-st .chips { left: 1020px; top: 730px; width: 690px; display: flex; gap: 16px; flex-wrap: wrap; }
      .sl-st .chips .tk-chip { font-size: 24px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Every gap is a gap <span class="tk-y">in the evidence.</span>']);
    this.left = M.mount(root, `<div class="pn tk-card" style="left:150px;width:780px"><div class="k">Stitched together</div></div>`).root;
    this.right = M.mount(root, `<div class="pn tk-card hot one" style="left:990px;width:780px"><div class="k">One platform</div></div>`).root;
    const svg = (this.svg = M.html('<svg class="ln" viewBox="0 0 1920 1080"></svg>'));
    root.appendChild(svg);
    const c = (i) => [this.TOOLS[i].x + this.BW / 2, this.TOOLS[i].y + this.BH / 2];
    this.links = this.LINKS.map((l) => {
      const [ax, ay] = c(l.a), [bx, by] = c(l.b);
      const horiz = ay === by;
      const x1 = horiz ? ax + this.BW / 2 : ax, y1 = horiz ? ay : ay + this.BH / 2;
      const x2 = horiz ? bx - this.BW / 2 : bx, y2 = horiz ? by : by - this.BH / 2;
      const p = M.svg('path', { class: 'lk', d: `M${x1},${y1} L${x2},${y2}` }, svg);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      let br = null, gl = null;
      if (l.gap) {
        br = M.svg('g', {}, svg);
        const d = 12;
        M.svg('line', { class: 'br', x1: mx - d, y1: my - d, x2: mx + d, y2: my + d }, br);
        M.svg('line', { class: 'br', x1: mx - d, y1: my + d, x2: mx + d, y2: my - d }, br);
        gl = M.html(`<div class="gl" style="left:${l.at[0]}px;top:${l.at[1]}px">${l.gap}</div>`);
        root.appendChild(gl);
      }
      return { p, br, gl, x1, y1, x2, y2, mx, my, gap: !!l.gap };
    });
    this.tools = this.TOOLS.map((tl) => { const el = M.html(`<div class="tl" style="left:${tl.x}px;top:${tl.y}px">${tl.n}</div>`); root.appendChild(el); return el; });
    /* a request on the stitched side: Builder to Runtime to Gateway, lost at the break */
    this.rqL = [0, 1, 2].map(() => M.svg('circle', { class: 'rq', r: 7 }, svg));
    /* the one platform: five parts on one rail */
    this.parts = this.PARTS.map((n, i) => { const el = M.html(`<div class="mc" style="left:${1020 + i * 144}px;top:440px">${n}</div>`); root.appendChild(el); return el; });
    this.rail = M.rail(root, { style: { left: '1020px', width: '708px', top: '640px', height: '4px' } });
    this.rqR = [0, 1, 2, 3].map(() => M.svg('circle', { class: 'rq', r: 7 }, svg));
    this.chips = M.mount(root, `<div class="chips"><span class="tk-chip y">Controls defined once</span><span class="tk-chip ok">One evidence record</span><span class="tk-chip y">No gaps</span></div>`);
  },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.left, t, 0.4);
    this.tools.forEach((el, i) => M.rise(el, t, 0.7 + i * 0.12, { dy: 14 }));
    const gaps = M.prog(t, 2.8, 0.6);
    this.links.forEach((l, i) => {
      M.draw(l.p, t, 1.3 + i * 0.1, 0.5);
      if (l.gap) {
        /* the link opens at its middle where the evidence stops */
        const open = 22 * M.ease.outCubic(gaps);
        const dx = l.x2 - l.x1, dy = l.y2 - l.y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        if (gaps > 0) l.p.setAttribute('d', `M${l.x1},${l.y1} L${(l.mx - ux * open).toFixed(1)},${(l.my - uy * open).toFixed(1)} M${(l.mx + ux * open).toFixed(1)},${(l.my + uy * open).toFixed(1)} L${l.x2},${l.y2}`);
        else l.p.setAttribute('d', `M${l.x1},${l.y1} L${l.x2},${l.y2}`);
        l.br.style.opacity = (gaps * (0.75 + 0.25 * M.wave(L + i, 1.4))).toFixed(3);
        M.rise(l.gl, t, 3.0 + i * 0.1, { dy: 8 });
      }
    });
    /* a request runs Builder to Runtime and dies at the Runtime-Gateway break */
    const A = this.links[0], B = this.links[1];
    this.rqL.forEach((d, k) => {
      const u = ((L * 0.35 + k / 3) % 1);
      let x, y, o = 1;
      if (u < 0.5) { const p = u / 0.5; x = M.lerp(A.x1, A.x2, p); y = A.y1; }
      else { const p = (u - 0.5) / 0.5; x = M.lerp(B.x1, B.mx, p); y = B.y1; o = 1 - (gaps > 0.5 ? M.clamp((p - 0.6) / 0.4) : 0); }
      d.setAttribute('cx', x.toFixed(1)); d.setAttribute('cy', y.toFixed(1));
      d.style.opacity = (M.prog(t, 1.8, 0.4) * o * Math.min(1, 8 * u)).toFixed(3);
    });

    /* one platform */
    M.rise(this.right, t, 5.0);
    this.parts.forEach((el, i) => M.rise(el, t, 5.3 + i * 0.1, { dy: 14 }));
    M.railGrow(this.rail, t, 5.8, 0.9);
    M.railAt(this.rail, L, 10);
    this.rqR.forEach((d, k) => {
      const u = ((L * 0.18 + k / 4) % 1), x = 1020 + u * 708;
      d.setAttribute('cx', x.toFixed(1)); d.setAttribute('cy', 642);
      d.style.opacity = (M.prog(t, 6.4, 0.4) * Math.min(1, 10 * u, 10 * (1 - u))).toFixed(3);
    });
    [...this.chips.root.children].forEach((c, i) => M.rise(c, t, 6.3 + i * 0.2, { dy: 10 }));
    this.left.style.opacity = (parseFloat(this.left.style.opacity || 1) * (1 - 0.35 * M.prog(t, 5.0, 0.6))).toFixed(3);
  },
});
