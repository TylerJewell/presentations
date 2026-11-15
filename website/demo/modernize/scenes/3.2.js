/* Scene 3.2: Discover, what the system does today. The three sources from 2.1 feed findings into a column. Each
   finding is a short line with an evidence chip; its status moves from Observed to Confirmed as a person confirms
   it. The findings restate what the storyboard says the engine does; nothing else is claimed about it. */
Fx.register({
  id: '3.2',

  ROWS: [
    { src: 'Tariff book', key: 'tariff', fact: 'Each shipment is priced by weight and distance zone.', ev: 'tariff book · <code>Zones!D7</code>' },
    { src: 'Code', key: 'code,', fact: 'Fuel and remote-area surcharges are added to the rate.', ev: 'code · <code>Surcharge.java</code>' },
    { src: 'Production', key: 'production', fact: 'Every rate request names a service level.', ev: 'production · rate request sample' },
  ],
  Y: [310, 460, 610],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { src: this.ROWS.map((r) => at(r.key)), fact: at('fact'), evidence: at('evidence'), confirms: at('confirms') };
  },

  render(root) {
    root.classList.add('s32');
    Mock.style('s32', `
      .s32 .src { height: 110px; justify-content: center; }
      .s32 .src .nm { margin-top: 0; font-size: 30px; }
      .s32 .fd { --g: 0; left: 640px; width: 1120px; height: 110px; border-radius: 14px; padding: 0 28px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 50%), rgba(241, 241, 241, .16)); background: rgba(255, 255, 255, .025); }
      .s32 .fd .f { position: absolute; left: 28px; top: 20px; font: 600 28px/1.2 var(--sans); letter-spacing: -.015em; color: var(--white); white-space: nowrap; }
      .s32 .fd .fx-ev { position: absolute; left: 28px; top: 66px; }
      .s32 .fd .fx-chip { position: absolute; right: 24px; top: 38px; }
      .s32 .lbl { top: 268px; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Discover', headline: 'Each fact is written down with the evidence behind it.', station: 0 });
    this.lbl = [Mock.mount(root, '<div class="lbl fx-side" style="left:160px">Sources</div>').root, Mock.mount(root, '<div class="lbl fx-side" style="left:640px">Findings</div>').root];
    const S = Fx.svg(root, this.Y.map((y, i) => `<path data-k="r${i}" class="y dash" d="M500 ${y + 55} H640"/>`).join(''));
    this.rails = this.Y.map((_, i) => S.k['r' + i]);
    this.src = this.ROWS.map((r, i) => { const c = Fx.card(root, { x: 160, y: this.Y[i], w: 340, nm: r.src }).root; c.classList.add('src'); return c; });
    this.fd = this.ROWS.map((r, i) => Mock.mount(root, `<div class="fd" style="top:${this.Y[i]}px"><div class="f">${r.fact}</div>
      <div class="fx-ev" data-k="ev">${r.ev}</div><div class="fx-chip info" data-k="obs">Observed</div><div class="fx-chip ok" data-k="ok">Confirmed</div></div>`));
    this.pks = this.rails.map(() => Fx.stream(root, 2));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    this.lbl.forEach((l, i) => M.rise(l, t, i ? K.fact - 0.6 : 0.6, { dy: 10 }));
    this.src.forEach((c, i) => { M.rise(c, t, 0.7 + i * 0.25); Fx.glow(c, M.ramp(t, K.src[i] - 0.2, K.src[i] + 1.4, 0.3, 0.5)); });
    this.rails.forEach((r, i) => {
      const s = K.fact - 0.5 + i * 0.3;
      M.draw(r, t, s, 0.4);
      if (M.prog(t, s, 0.4) >= 1) { r.style.strokeDasharray = '6 7'; M.march(r, t, 14); }
      Fx.streamAt(this.pks[i], r, t, s, K.confirms + 1.5 + i * 0.6, 1.2);
    });
    /* each finding lands, its evidence beneath it; a person then confirms them one at a time */
    this.fd.forEach((f, i) => {
      const s = K.fact - 0.2 + i * 0.5, c = K.confirms + 0.2 + i * 0.9;
      M.rise(f.root, t, s);
      M.rise(f.ev, t, K.evidence - 0.2 + i * 0.3, { dy: 8 });
      const flip = M.prog(t, c, 0.35);
      f.obs.style.opacity = M.prog(t, s + 0.4, 0.4) * (1 - flip);
      f.ok.style.opacity = flip;
      f.ok.style.transform = `scale(${(1.15 - 0.15 * M.ease.outCubic(flip)).toFixed(3)})`;
      Fx.glow(f.root, M.ramp(t, c - 0.1, c + 1.2, 0.2, 0.6));
    });
  },
});
