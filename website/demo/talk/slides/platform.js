/* One platform, the whole lifecycle. The film's family diagram (scene 1.1) as click beats: the five parts
   rise in lifecycle order, then connectors run down to the one rail they share (one definition, one
   runtime, one evidence record), and a control, defined once, travels the rail through every part. */
registerSlide({
  id: 'platform',
  act: 'together',
  title: 'One platform, the whole lifecycle',
  beats: [
    { t: 2.0, say: "Before I show you the system, one thing about how it's built. Everything I've described only works end to end if one platform holds the whole lifecycle. It starts with Specify, which builds the system from its specification: the definition, the risk survey, and the controls in the bundle." },
    { t: 3.6, say: "The Agent SDK and its runtime run the system, and the controls enforce in the request path. The AI gateway governs model and tool traffic, including agents that weren't built on Akka." },
    { t: 5.0, say: "Verify governs it: the verdicts, the drift, and compliance against the bundle in force." },
    { t: 6.4, say: "And Optimize runs it on the right models, through experiments where a person decides." },
    { t: 9.0, say: "Underneath all five: one definition of the system, one runtime, one evidence record. So a control is defined once, and the same definition carries it from the specification to production, and the same record proves it." },
  ],

  PARTS: [
    { g: 'specify', kind: 'Build', name: 'Specify', line: 'Builds it from its specification', at: 0.4 },
    { g: 'sdk', kind: 'Run', name: 'Agent SDK', line: 'Runs it; controls in the request path', at: 2.2 },
    { g: 'gateway', kind: 'Route', name: 'AI gateway', line: 'Governs traffic from any agent', at: 2.6 },
    { g: 'verify', kind: 'Govern', name: 'Verify', line: 'Verdicts, drift, compliance', at: 3.9 },
    { g: 'optimize', kind: 'Improve', name: 'Optimize', line: 'Right models, by experiment', at: 5.3 },
  ],
  X0: 150, W: 300, G: 30, Y: 330, H: 330, RAIL: 800,

  render(root) {
    const M = Mock;
    root.classList.add('sl-plat');
    M.style('sl-plat', `
      .sl-plat .pc { --g: 0; width: 300px; height: 330px; padding: 30px 26px; border-radius: 18px; display: flex; flex-direction: column;
        border: 2px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 70%), rgba(241,241,241,.16));
        background: linear-gradient(160deg, rgba(255,206,74, calc(var(--g) * .12)), rgba(255,206,74, calc(var(--g) * .03))), #0B0B0E;
        box-shadow: 0 0 calc(var(--g) * 70px) calc(var(--g) * -20px) rgba(255,206,74,.7); }
      .sl-plat .pc svg { width: 64px; height: 64px; overflow: visible; margin-bottom: auto; }
      .sl-plat .pc svg path { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .sl-plat .pc .k { font: 600 22px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--ink-2); margin-bottom: 12px; }
      .sl-plat .pc .n { font: 700 46px/1 var(--sans); letter-spacing: -.03em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--ink)); white-space: nowrap; }
      .sl-plat .pc .l { margin-top: 16px; font: 500 27px/1.25 var(--sans); color: var(--ink); min-height: 2.5em; }
      .sl-plat svg.sp { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-plat .cn { stroke: rgba(255,206,74,.6); stroke-width: 2.5; fill: none; }
      .sl-plat .words { left: 150px; width: 1620px; top: 840px; display: flex; justify-content: center; gap: 30px;
        font: 600 30px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; }
      .sl-plat .words span { --l: 0; color: color-mix(in srgb, var(--yellow) calc(var(--l) * 100%), #8a8a8a); }
      .sl-plat .words i { font-style: normal; color: #6a6a6a; }
      .sl-plat .tok { left: 0; top: 0; display: flex; align-items: center; gap: 12px; padding: 10px 16px 10px 12px; border-radius: 999px; background: #15130b;
        box-shadow: inset 0 0 0 2px rgba(255,206,74,.8), 0 0 24px rgba(255,206,74,.45); font: 600 22px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; color: var(--yellow); white-space: nowrap; }
      .sl-plat .tok b { width: 14px; height: 14px; transform: rotate(45deg); background: var(--yellow); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['One platform, <span class="tk-y">the whole lifecycle.</span>']);
    const glyph = (g) => g === 'gateway' ? ['M8 32h14', 'M42 32h14', 'M22 18h20v28H22z', 'M50 26l6 6-6 6'] : M.GLYPHS[g];
    this.cards = this.PARTS.map((p, i) => {
      const el = M.html(`<div class="pc" style="left:${this.X0 + i * (this.W + this.G)}px;top:${this.Y}px">
        <svg viewBox="0 0 64 64">${glyph(p.g).map((d) => `<path d="${d}"/>`).join('')}</svg>
        <div class="k">${p.kind}</div><div class="n">${p.name}</div><div class="l">${p.line}</div></div>`);
      root.appendChild(el);
      return el;
    });
    this.cx = this.PARTS.map((_, i) => this.X0 + i * (this.W + this.G) + this.W / 2);
    const svg = M.html(`<svg class="sp" viewBox="0 0 1920 1080">${this.cx.map((x) => `<line class="cn" x1="${x}" x2="${x}" y1="${this.Y + this.H}" y2="${this.RAIL}"/>`).join('')}</svg>`);
    root.appendChild(svg);
    this.cn = [...svg.querySelectorAll('.cn')];
    this.rail = M.rail(root, { style: { left: this.X0 + 'px', width: '1620px', top: this.RAIL - 1 + 'px', height: '4px' } });
    this.words = M.mount(root, `<div class="words"><span data-k="w0">One definition</span><i>·</i><span data-k="w1">one runtime</span><i>·</i><span data-k="w2">one evidence record</span></div>`);
    this.tok = M.mount(root, `<div class="tok"><b></b>A control, defined once</div>`).root;
  },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    const found = M.prog(t, 6.8, 0.8);
    this.cards.forEach((c, i) => {
      const p = this.PARTS[i];
      M.rise(c, t, p.at, { dy: 26 });
      c.querySelectorAll('svg path').forEach((d, k) => M.draw(d, t, p.at + 0.25 + k * 0.08, 0.7));
      /* each card glows as it arrives, then all settle to a shared glow once the rail joins them */
      M.cardGlow(c, Math.max(M.ramp(t, p.at, p.at + 1.6, 0.3, 0.8), 0.45 * found));
      M.draw(this.cn[i], t, 6.9 + i * 0.08, 0.5);
    });
    M.railGrow(this.rail, t, 7.1, 1.0);
    M.railAt(this.rail, L, 10);
    this.rail.style.opacity = M.prog(t, 7.1, 0.2).toFixed(3);
    ['w0', 'w1', 'w2'].forEach((k, i) => this.words[k].style.setProperty('--l', M.p(t, 7.7 + i * 0.3, 0.5, 'outCubic').toFixed(3)));
    M.rise(this.words.root, t, 7.4, { dy: 10 });

    /* the control travels the rail through every part, on the live clock */
    const u = M.loop(t, 7, 3), x = M.lerp(this.X0 - 40, this.X0 + 1620 - 300, M.ease.inOutCubic(u));
    this.tok.style.opacity = (M.prog(t, 8.3, 0.5) * Math.min(1, 8 * u, 8 * (1 - u))).toFixed(3);
    this.tok.style.transform = `translate(${x.toFixed(1)}px, ${this.RAIL - 26}px)`;
    const near = this.cx.findIndex((cx) => Math.abs(cx - (x + 150)) < 120);
    if (t >= 8.3) this.cards.forEach((c, i) => { if (i === near) M.cardGlow(c, 0.85); });
  },
});
