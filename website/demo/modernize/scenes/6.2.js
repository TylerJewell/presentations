/* Scene 6.2: the documentation it writes. A mosaic of the graphics the factory generates for a system, captured
   from the documentation of Akka's loan-origination sample: the component graph, the domain model, a state
   lifecycle, an interaction diagram, the sequence of one flow and an API reference. Each tile is framed and
   labelled with its kind; the tiles rise in turn, and the one being spoken about lifts and grows while the others
   step back. */
Fx.register({
  id: '6.2',

  TILES: [
    { src: 'screens/doc-graph.png', label: 'Component graph', key: 'component', pos: '50% 30%' },
    { src: 'screens/doc-entity.png', label: 'Domain model', key: 'domain', pos: '50% 0%' },
    { src: 'screens/doc-lifecycle.png', label: 'State lifecycle', key: 'lifecycles,', pos: '50% 40%' },
    { src: 'screens/doc-interaction.png', label: 'Interaction diagram', key: 'interaction', pos: '50% 0%' },
    { src: 'screens/doc-sequence.png', label: 'Flow sequence', key: 'every', pos: '50% 0%' },
    { src: 'screens/doc-api.png', label: 'API reference', key: 'reference', pos: '50% 0%' },
  ],
  W: 512, H: 214,
  XY: (i) => [160 + (i % 3) * 544, 326 + Math.floor(i / 3) * 252],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { tiles: this.TILES.map((c) => at(c.key)) };
  },

  render(root) {
    root.classList.add('s62');
    Mock.style('s62', `
      .s62 .src { left: 160px; top: 290px; }
      .s62 .tl { --g: 0; width: 512px; transform-origin: 50% 50%; }
      .s62 .tl .lb { height: 28px; font: 600 16px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .s62 .tl .fr { position: relative; height: 214px; overflow: hidden; border-radius: 12px; background: #0b0b0d;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 70%), rgba(241, 241, 241, .22));
        box-shadow: 0 0 calc(var(--g) * 50px) calc(var(--g) * -10px) rgba(255, 206, 74, .7), 0 20px 50px rgba(0, 0, 0, .6); }
      .s62 .tl img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Build', headline: "The factory also writes this system's documentation.", station: 3 });
    this.src = Mock.mount(root, '<div class="src fx-scap" style="opacity:1"><b>The generated documentation</b> · Akka\'s loan-origination sample</div>').root;
    this.tiles = this.TILES.map((c, i) => {
      const [x, y] = this.XY(i);
      return Mock.mount(root, `<div class="tl" style="left:${x}px;top:${y}px"><div class="lb">${c.label}</div>
        <div class="fr"><img src="${c.src}" alt="" style="object-position:${c.pos}"></div></div>`).root;
    });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.src, t, 0.5, { dy: 8 });
    /* the tiles rise in turn; the one being spoken of lifts and grows, the rest step back */
    const lit = (i) => { const k = K.tiles[i], next = K.tiles[i + 1] != null ? K.tiles[i + 1] : this.duration; return M.ramp(t, k - 0.25, next - 0.05, 0.3, 0.4); };
    const any = Math.max(...this.tiles.map((_, i) => lit(i)));
    this.tiles.forEach((el, i) => {
      const o = M.ease.css(M.prog(t, 0.7 + i * 0.25, 0.6)), y = (1 - M.p(t, 0.7 + i * 0.25, 0.8)) * 20;
      const g = lit(i);
      el.style.opacity = (o * (1 - 0.5 * any * (1 - g))).toFixed(3);
      el.style.transform = `translateY(${(y - 10 * g).toFixed(1)}px) scale(${(1 + 0.1 * g).toFixed(3)})`;
      el.style.zIndex = g > 0.01 ? 2 : 1;
      Fx.glow(el, g);
    });
  },
});
