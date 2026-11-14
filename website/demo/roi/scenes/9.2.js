/* Scene 9.2: Specify, built the same way and read the same way. Three specifications, each with a line down to
   its generated system; the three systems are the same four layers in the same order. Then the "what it is for"
   line lights in each specification, and an engineer glyph arrives at one system and reads its specification. */
Roi.register({
  id: '9.2',

  X: [160, 720, 1280],   /* the three columns, 480 wide */
  LAYERS: ['Endpoints', 'Workflows and agents', 'Entities and views', 'Tests'],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { builds: at('builds'), standard: at('standard'), same: at('same'), read: at('read'), written: at('written'), engineer: at('engineer'), finds: at('finds') };
  },

  render(root) {
    root.classList.add('r92');
    Mock.style('r92', `
      .r92 .ro-head { width: 1300px; }
      .r92 .spec { top: 290px; width: 480px; height: 168px; border-radius: 12px; border: 1px solid rgba(241,241,241,.18); background: rgba(255,255,255,.025); padding: 16px 20px; }
      .r92 .spec .k { font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); }
      .r92 .spec .t { margin-top: 8px; font: 700 22px/1.15 var(--sans); letter-spacing: -.02em; color: var(--white); }
      .r92 .spec .p { --g: 0; margin-top: 8px; font: 500 17px/1.3 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .r92 .spec .h { --g: 0; margin-top: 8px; font: 500 17px/1.3 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .r92 .sys { top: 500px; width: 480px; border-radius: 12px; border: 1px solid rgba(241,241,241,.18); background: var(--medium-black); padding: 12px; }
      .r92 .sys .ly { height: 46px; margin-top: 8px; border-radius: 8px; display: flex; align-items: center; padding: 0 16px; font: 600 17px/1 var(--sans); color: var(--white);
        border: 1px solid rgba(241,241,241,.14); background: rgba(255,255,255,.03); }
      .r92 .sys .ly:first-child { margin-top: 0; }
      .r92 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r92 .w path.rl { fill: none; stroke: rgba(241,241,241,.35); stroke-width: 1.5; }
      .r92 .w path.eng { fill: none; stroke: var(--yellow); stroke-width: 2.2; stroke-linejoin: round; }
      .r92 .w path.look { fill: none; stroke: var(--yellow); stroke-width: 1.5; stroke-dasharray: 4 5; }
      .r92 .lg { top: 764px; left: 160px; width: 1600px; }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'People', headline: 'Every system is built the same way, so it is read the same way.', lit: 3 });
    const purposes = ['Approves loans within policy', 'Settles payments between regions', 'Answers claims within the cover'];
    this.specs = this.X.map((x, i) => M.mount(root, `<div class="spec" style="left:${x}px"><div class="k">Specification ${i + 1}</div><div class="t">System ${i + 1}</div><div class="p" data-k="p">What it is for: ${purposes[i]}</div><div class="h" data-k="h">Architecture, exit conditions, definition of done</div></div>`));
    this.syss = this.X.map((x) => M.mount(root, `<div class="sys" style="left:${x}px">${this.LAYERS.map((l) => `<div class="ly">${l}</div>`).join('')}</div>`));
    const eng = (cx, cy) => `M${cx - 9} ${cy - 22}a9 9 0 1 1 18 0a9 9 0 1 1-18 0M${cx - 26} ${cy + 22}c0-16 12-26 26-26s26 10 26 26`;
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">
      ${this.X.map((x) => `<path class="rl" d="M${x + 240} 458 V500"/>`).join('')}
      <path class="eng" d="${eng(this.X[2] + 540, 590)}"/>
      <path class="look" d="M${this.X[2] + 505} 570 C ${this.X[2] + 520} 450, ${this.X[2] + 500} 400, ${this.X[2] + 482} 390"/>
    </svg>`);
    root.appendChild(this.svg);
    this.rails = [...this.svg.querySelectorAll('.rl')];
    this.eng = this.svg.querySelector('.eng');
    this.look = this.svg.querySelector('.look');
    this.lg = M.mount(root, '<div class="lg ro-note">The same architecture, the same structure, the same places to read. The purpose is in the specification, not in the code.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    /* the specifications, then the systems drawn from them, layer by layer in the same order */
    this.specs.forEach((s, i) => { M.rise(s.root, t, 0.5 + i * 0.15); Roi.glow(s.p, M.prog(t, K.written - 0.1 + i * 0.15, 0.5)); Roi.glow(s.h, M.prog(t, K.builds + 0.6 + i * 0.15, 0.5)); });
    this.rails.forEach((p, i) => M.draw(p, t, K.builds - 0.2 + i * 0.15, 0.5));
    this.syss.forEach((s, i) => {
      M.rise(s.root, t, K.builds + 0.2 + i * 0.15);
      [...s.root.children].forEach((ly, j) => { const g = M.ramp(t, K.same - 0.2 + j * 0.25, K.read + 1.2, 0.3, 0.6); ly.style.borderColor = `rgba(255,206,74,${(0.14 + 0.5 * g).toFixed(2)})`; ly.style.color = g > 0.4 ? 'var(--yellow)' : ''; });
    });
    /* an engineer arrives at the third system and looks up to its specification */
    M.draw(this.eng, t, K.engineer - 0.2, 0.6);
    this.eng.style.opacity = M.prog(t, K.engineer - 0.2, 0.1).toFixed(3);
    M.draw(this.look, t, K.finds - 0.2, 0.7);
    this.look.style.opacity = M.prog(t, K.finds - 0.2, 0.1).toFixed(3);
    Roi.glow(this.specs[2].p, Math.max(M.prog(t, K.written + 0.2, 0.5), M.prog(t, K.finds, 0.4)));
    M.rise(this.lg, t, K.read + 0.2, { dy: 8 });
  },
});
