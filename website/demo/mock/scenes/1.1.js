/* Scene 1.1: Four parts, one definition. The family diagram: four cards draw in on a spine, each glows as
   it is named, then pulses run from every card into the one rail they share and its three phrases light. */
registerScene({
  id: '1.1',
  act: 1,
  title: 'Four parts, one definition',
  duration: 22,
  caption: 'Akka has four parts. Specify builds systems from specifications. The Agent SDK runs them. Verify governs them. Optimize runs them on the right models. They share one definition of the system, one runtime and one evidence record.',

  /* Each card glows from the sentence that names it until the next one starts, and each rail phrase
     lights when it is read; both come from the caption's own clock (Mock.captionAt). */
  timing() {
    if (this.GLOW) return;
    const at = (w) => Mock.captionAt(this, w);
    const s = [at('Specify'), at('The'), at('Verify'), at('Optimize'), at('They')];
    this.GLOW = [0, 1, 2, 3].map((i) => [s[i], s[i + 1]]);
    this.PHRASE = [at('definition'), at('runtime'), at('evidence')];
  },

  render(root) {
    root.classList.add('s11');
    Mock.style('s11', `
      .s11 .head { left: var(--gutter); top: 104px; }
      .s11 .head .mk-h2 { margin-top: 22px; }
      .s11 svg.sp { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .s11 .cn { stroke: rgba(241,241,241,.22); stroke-width: 1.5; fill: none; }
      .s11 .cn.hot { stroke: var(--yellow); }
      .s11 .words { left: 180px; width: 1560px; top: 716px; display: flex; justify-content: center; gap: 26px;
        font: 600 17px/1 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: var(--medium-grey); }
      .s11 .words span { --l: 0; color: color-mix(in srgb, var(--yellow) calc(var(--l) * 100%), #6a6a6a); }
      .s11 .words i { font-style: normal; color: #3a3a3a; }
      .s11 .pulse { width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: var(--yellow);
        box-shadow: 0 0 18px 6px rgba(255,206,74,.55); left: 0; top: 0; opacity: 0; }
      .s11 .splash { height: 40px; margin-top: -20px; top: 680px; border-radius: 50%; opacity: 0;
        background: radial-gradient(closest-side, rgba(255,206,74,.55), rgba(255,206,74,0)); }
    `);
    Mock.dotGrid(root);
    this.head = Mock.mount(root, `
      <div class="head"><div class="mk-eyebrow" data-k="eb">Akka</div>
        <h2 class="mk-h2" data-k="h">An <span class="accent">integrated platform.</span></h2></div>`);

    const W = 360, G = 40, X0 = 180, Y = 290, H = 300, RAIL = 680;
    this.cx = Mock.PRODUCTS.map((_, i) => X0 + i * (W + G) + W / 2);
    this.cards = Mock.PRODUCTS.map((p, i) => {
      const el = Mock.productCard(root, p);
      Mock.set(el, { left: X0 + i * (W + G) + 'px', top: Y + 'px' });
      return el;
    });
    const svg = Mock.html(`<svg class="sp" viewBox="0 0 1920 1080">${this.cx.map((x) => `<line class="cn" x1="${x}" x2="${x}" y1="${Y + H}" y2="${RAIL}"/>`).join('')}</svg>`);
    root.appendChild(svg);
    this.cn = [...svg.querySelectorAll('.cn')];
    this.rail = Mock.rail(root, { style: { left: X0 + 'px', width: 4 * W + 3 * G + 'px', top: RAIL - 1 + 'px', height: '3px' } });
    this.words = Mock.mount(root, `<div class="words"><span data-k="w0">One definition</span><i>·</i><span data-k="w1">one runtime</span><i>·</i><span data-k="w2">one evidence record</span></div>`);
    this.pulses = this.cx.map(() => { const d = Mock.html('<div class="pulse"></div>'); root.appendChild(d); return d; });
    this.splashes = this.cx.map(() => { const d = Mock.html('<div class="splash"></div>'); root.appendChild(d); return d; });
    this.Y = Y; this.H = H; this.RAIL = RAIL;
  },

  at(t) {
    const M = Mock;
    this.timing();
    M.rise(this.head.eb, t, 0.0);
    M.rise(this.head.h, t, 0.1);

    /* cards rise in, their glyphs draw, their connectors run down to the rail */
    const share = M.prog(t, this.PHRASE[0] - 0.3, 0.8);
    this.cards.forEach((c, i) => {
      M.rise(c, t, 0.15 + i * 0.12);
      M.cardDraw(c, t, 0.45 + i * 0.12);
      const [a, b] = this.GLOW[i];
      M.cardGlow(c, Math.max(M.ramp(t, a, b, 0.35, 0.45), 0.42 * share));
      M.draw(this.cn[i], t, 0.9 + i * 0.1, 0.5);
      this.cn[i].classList.toggle('hot', share > 0.5);
    });
    M.railGrow(this.rail, t, 1.0, 1.2);
    M.railAt(this.rail, t, 10);
    this.rail.style.opacity = 0.55 + 0.45 * share;

    /* the three phrases: each lights with a pulse from every card into the rail */
    let lit = 0;
    this.PHRASE.forEach((p, k) => {
      const l = M.p(t, p, 0.5, 'outCubic');
      this.words['w' + k].style.setProperty('--l', l.toFixed(3));
      if (t >= p - 0.6) lit = k;
    });
    M.rise(this.words.root, t, 1.6, { dy: 10 });
    const p0 = this.PHRASE[lit] - 0.6;
    this.cx.forEach((x, i) => {
      const s = p0 + i * 0.08, down = M.prog(t, s, 0.5);
      const y = M.lerp(this.Y + this.H, this.RAIL, M.ease.inCubic(down));
      M.set(this.pulses[i], { opacity: down > 0 && down < 1 ? 1 : 0, transform: `translate(${x}px, ${y.toFixed(1)}px)` });
      const sp = M.prog(t, s + 0.5, 0.9), w = 40 + 360 * M.ease.outCubic(sp);
      M.set(this.splashes[i], { opacity: sp > 0 && sp < 1 ? (1 - sp).toFixed(3) : 0, left: (x - w / 2).toFixed(1) + 'px', width: w.toFixed(1) + 'px' });
    });
  },
});
