/* Scene 7.1: integration. Left: ten separate products as the layers of a cake, each its own colour, wired together
   by dense lines of integration work. Right: one slice cut through the whole cake, every layer in one piece and
   already joined, with no wiring. Then the licences a team does not need to retain, lit as each is named. */
Roi.register({
  id: '7.1',

  LAYERS: [['Gateway', '#5b8def'], ['Agent execution', '#d9743a'], ['Memory', '#3fae8a'], ['Workflow', '#b86fd1'], ['Event streaming', '#c9a227'],
    ['Cache', '#4fb3c9'], ['Observability', '#d15c7a'], ['Evaluation', '#7fb04a'], ['Governance', '#8a7dd6'], ['Training', '#c08457']],
  LIC: [
    ['Event streaming and journal', 'event'], ['Cache', 'cache,'], ['Messaging', 'messaging,'],
    ['Workflow orchestration', 'workflow'], ['Gateway', 'gateway,'], ['AI governance', 'AI'],
    ['Observability', 'observability,'], ['Evaluation', 'evaluation'], ['Red teaming', 'red'],
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { separate: at('separate'), layer: at('layer,'), wire: at('wired'), ships: at('ships'), joined: at('joined,'), incl: at('including'), retain: at('retain'), names: this.LIC.map(([, w]) => at(w)) };
  },

  render(root) {
    root.classList.add('r71');
    Mock.style('r71', `
      .r71 .ro-head { width: 1300px; }
      .r71 .side { top: 290px; }
      .r71 .ly { left: 160px; width: 560px; height: 32px; border-radius: 4px; display: flex; align-items: center; padding: 0 16px; font: 600 16px/1 var(--sans); color: var(--white);
        background: color-mix(in srgb, var(--c) 28%, var(--medium-black)); border: 1px solid color-mix(in srgb, var(--c) 55%, transparent); }
      .r71 .slice { left: 1080px; top: 332px; width: 236px; height: 364px; border-radius: 8px; border: 2px solid var(--yellow); box-shadow: 0 0 40px -12px rgba(255,206,74,.7); }
      .r71 .slice .ly { left: 8px; width: 220px; font-size: 15px; }
      .r71 svg.w { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r71 .w path { fill: none; stroke: rgba(241,241,241,.4); stroke-width: 1.2; }
      .r71 .w text { font: 500 16px var(--sans); fill: var(--soft-grey); }
      .r71 .lic { left: 1380px; top: 340px; width: 380px; }
      .r71 .lic .k { font: 600 13px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--soft-grey); margin-bottom: 12px; }
      .r71 .lic .it { --g: 0; padding: 7px 0; font: 600 20px/1.2 var(--sans); letter-spacing: -.01em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); border-bottom: 1px solid rgba(241,241,241,.1); }
      .r71 .lg { top: 756px; }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Integration', headline: 'Separate products, or the whole stack in one piece.', lit: 2 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Separate products, wired together</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1080px">Akka, one piece</div>').root;
    const Y = (i) => 340 + i * 36;
    this.cake = this.LAYERS.map(([nm, c], i) => M.html(`<div class="ly" style="top:${Y(i)}px;--c:${c}">${nm}</div>`));
    this.cake.forEach((el) => root.appendChild(el));
    /* wiring: from the right edge of each layer to the right edge of every other, in a bundle beside the cake */
    const wires = [];
    for (let i = 0; i < 10; i++) for (let j = i + 1; j < 10; j++) {
      const a = Y(i) + 16, b = Y(j) + 16, bulge = 760 + 40 + Math.abs(j - i) * 14;
      wires.push(`M720 ${a} C ${bulge} ${a}, ${bulge} ${b}, 720 ${b}`);
    }
    this.svg = M.html(`<svg class="w" viewBox="0 0 1920 1080">${wires.map((d) => `<path d="${d}"/>`).join('')}
      <text data-k="lab" x="720" y="718" text-anchor="start">integration work, paid by the customer</text></svg>`);
    root.appendChild(this.svg);
    this.wires = [...this.svg.querySelectorAll('path')];
    this.lab = this.svg.querySelector('text');
    this.slice = M.html('<div class="slice"></div>');
    this.sliceLy = this.LAYERS.map(([nm, c], i) => M.html(`<div class="ly" style="top:${8 + i * 35}px;--c:${c}">${nm}</div>`));
    this.sliceLy.forEach((el) => this.slice.appendChild(el));
    root.appendChild(this.slice);
    this.lic = M.mount(root, `<div class="lic"><div class="k" data-k="k">Licences not retained</div>${this.LIC.map(([nm]) => `<div class="it">${nm}</div>`).join('')}</div>`);
    this.its = [...this.lic.root.querySelectorAll('.it')];
    this.lgL = M.mount(root, '<div class="lg ro-note" style="left:160px;width:760px">Each product has its own pricing, identity and operations, and each join is built and maintained by the customer.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 });
    this.cake.forEach((el, i) => M.rise(el, t, 0.7 + i * 0.08, { dy: 8 }));
    /* the wiring draws as the customer's work is named, and stays */
    this.wires.forEach((p, i) => { M.draw(p, t, K.wire - 1.0 + (i / this.wires.length) * 1.6, 0.6, 'linear'); });
    this.lab.style.opacity = M.prog(t, K.wire, 0.5).toFixed(3);
    M.rise(this.lgL, t, K.wire + 0.6, { dy: 8 });
    /* the slice: one piece, every layer in it, as Akka is named; the three Tyler named light in turn */
    M.rise(this.sideR, t, K.ships - 0.5, { dy: 10 });
    M.rise(this.slice, t, K.ships - 0.3);
    this.sliceLy.forEach((el, i) => { M.rise(el, t, K.ships - 0.1 + i * 0.05, { dy: 4 }); const hot = [9, 1, 2].indexOf(i); el.style.boxShadow = hot >= 0 ? `inset 0 0 0 1px rgba(255,206,74,${(0.9 * M.ramp(t, K.incl + 0.3 + hot * 0.45, K.incl + 0.3 + hot * 0.45 + 1.2, 0.2, 0.5)).toFixed(2)})` : 'none'; });
    /* the licence list, each lit as it is named, then held at a low glow */
    M.rise(this.lic.root, t, K.retain - 0.8);
    this.its.forEach((el, i) => Roi.glow(el, Math.max(M.ramp(t, K.names[i] - 0.15, K.names[i] + 1.6, 0.25, 0.6), 0.35 * M.prog(t, K.names[8] + 1.2, 0.6))));
  },
});
