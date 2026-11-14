/* The series opening, shared by every snippet: the family diagram builds on the dot grid and each card glows
   as it is named; the camera pushes into one part while the other three fall away; that card opens into a
   row of its capabilities; the featured one lights, grows until it fills the frame, and becomes the title.

   A snippet changes only its configuration:

     const open = SnippetSetup.render(root, {
       part: 'optimize',                       // an id in Mock.PRODUCTS
       capabilities: ['Gateway', 'Models', 'Routing', 'Experiments', 'Playground'],  // or { name, glyph: [paths] }
       feature: 'Experiments',                 // one of the capabilities
       beats: () => ({ glow: [[a, b] x 4], push, light, title }),
     });
     open.at(t);

   beats is called once, on the first at(), so its times can come from the caption's clock (Mock.captionAt):
   glow is each card's [from, to] window in Mock.PRODUCTS order (the featured part stays lit after its
   window), push starts the camera move, light picks the featured capability, and title starts its growth. */
window.SnippetSetup = (function () {
  const M = Mock;

  /** Line-drawn glyphs for capability tiles, in a 64x64 box like Mock.GLYPHS. A capability without one shows its name only. */
  const GLYPHS = {
    Gateway: ['M12 54V28a20 20 0 0 1 40 0v26', 'M6 54h52', 'M23 40h17', 'M35 35l5 5-5 5'],
    Models: ['M32 10l22 11-22 11-22-11z', 'M10 32l22 11 22-11', 'M10 43l22 11 22-11'],
    Routing: ['M8 32h14', 'M22 32c10 0 10-16 22-16h12', 'M22 32h34', 'M22 32c10 0 10 16 22 16h12', 'M51 11l5 5-5 5', 'M51 43l5 5-5 5'],
    Experiments: ['M25 8h14', 'M28 8v17L13 51a4 4 0 0 0 3.5 6h31a4 4 0 0 0 3.5-6L36 25V8', 'M19 43h26'],
    Playground: ['M10 13h44v30H30l-12 10V43h-8z', 'M28 22l10 6-10 6z'],
  };

  /* the family diagram, as in the film's scene 1.1 */
  const CW = 360, CG = 40, X0 = 180, CY = 290, CH = 300, RAIL = 680;
  /* the opened part: a panel with its capabilities in one row */
  const PANEL = [200, 232, 1520, 408], PAD = 40, TILE_Y = 132, TILE_H = 236, TILE_G = 20;
  /* the title the featured capability becomes */
  const TITLE = { x: 160, y: 352, size: 216 };
  const NAME = { size: 32, left: 28, bottom: 26 };

  const lerpRect = (a, b, p) => a.map((v, i) => M.lerp(v, b[i], p));
  const place = (el, [x, y, w, h]) => M.set(el, { left: x.toFixed(1) + 'px', top: y.toFixed(1) + 'px', width: w.toFixed(1) + 'px', height: h.toFixed(1) + 'px' });

  function css() {
    M.style('snip-setup', `
      .snip-setup .head { left: var(--gutter); top: 104px; }
      .snip-setup .head .mk-h2 { margin-top: 22px; }
      .snip-setup svg.sp { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .snip-setup .cn { stroke: rgba(241,241,241,.22); stroke-width: 1.5; fill: none; }
      .snip-setup .box { --g: 1; border-radius: 14px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), rgba(241,241,241,.12));
        background: linear-gradient(160deg, rgba(255,206,74, calc(var(--g) * .14)), rgba(255,206,74, calc(var(--g) * .035))), #0b0a08;
        box-shadow: 0 0 calc(var(--g) * 70px) calc(var(--g) * -18px) rgba(255,206,74,.7); }
      .snip-setup .phd { left: ${PANEL[0] + PAD}px; top: ${PANEL[1] + PAD}px; }
      .snip-setup .phd .kind { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .snip-setup .phd .nm { margin-top: 12px; font: 700 52px/1 var(--sans); letter-spacing: -.03em; color: var(--yellow); }
      .snip-setup .tile { --g: 0; border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.14));
        background: linear-gradient(160deg, rgba(255,206,74, calc(var(--g) * .16)), rgba(255,206,74, calc(var(--g) * .04))), rgba(255,255,255,.03);
        box-shadow: 0 0 calc(var(--g) * 60px) calc(var(--g) * -16px) rgba(255,206,74,.75); }
      .snip-setup .tile .g { position: absolute; left: 26px; top: 26px; width: 48px; height: 48px; overflow: visible; }
      .snip-setup .tile .g path { fill: none; stroke: color-mix(in srgb, var(--yellow) calc(35% + var(--g) * 65%), var(--soft-grey)); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
      .snip-setup .tile .nm { position: absolute; left: ${NAME.left}px; bottom: ${NAME.bottom}px; font: 700 ${NAME.size}px/1 var(--sans); letter-spacing: -.03em; white-space: nowrap;
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .snip-setup .grow { --g: 1; border-radius: 12px; pointer-events: none; }
      .snip-setup .grow .g { position: absolute; left: 26px; top: 26px; width: 48px; height: 48px; overflow: visible; }
      .snip-setup .grow .g path { fill: none; stroke: var(--yellow); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
      .snip-setup .glow { left: 0; top: 0; width: 1500px; height: 900px; border-radius: 50%; pointer-events: none;
        background: radial-gradient(closest-side, rgba(255,206,74,.15), rgba(255,206,74,0)); }
      .snip-setup .ttl { left: 0; top: 0; font-weight: 700; line-height: 1; color: var(--yellow); white-space: nowrap; transform-origin: 0 0; }
      .snip-setup .teb { left: ${TITLE.x}px; top: ${TITLE.y - 40}px; font: 600 18px/1 var(--sans); letter-spacing: .22em; text-transform: uppercase; color: var(--yellow); }
    `);
  }

  function render(root, cfg) {
    css();
    root.classList.add('snip-setup');
    const part = M.PRODUCTS.find((p) => p.id === cfg.part) || M.PRODUCTS[3];
    const pi = M.PRODUCTS.indexOf(part);
    const caps = cfg.capabilities.map((c) => (typeof c === 'string' ? { name: c, glyph: GLYPHS[c] } : c));
    const fi = Math.max(0, caps.findIndex((c) => c.name === cfg.feature));
    const o = { cfg, pi, fi, caps, B: null };

    o.grid = M.dotGrid(root);
    o.glow = M.html('<div class="glow"></div>');
    root.appendChild(o.glow);

    /* the diagram lives in a world so the push can move it as one */
    o.dia = M.world(root);
    o.head = M.mount(o.dia, `
      <div class="head"><div class="mk-eyebrow" data-k="eb">Akka</div>
        <h2 class="mk-h2" data-k="h">One platform for <span class="accent">agentic AI.</span></h2></div>`);
    o.cards = M.PRODUCTS.map((p, i) => {
      const el = M.productCard(o.dia, p);
      M.set(el, { left: X0 + i * (CW + CG) + 'px', top: CY + 'px' });
      return el;
    });
    o.cx = M.PRODUCTS.map((_, i) => X0 + i * (CW + CG) + CW / 2);
    const svg = M.html(`<svg class="sp" viewBox="0 0 1920 1080">${o.cx.map((x) => `<line class="cn" x1="${x}" x2="${x}" y1="${CY + CH}" y2="${RAIL}"/>`).join('')}</svg>`);
    o.dia.appendChild(svg);
    o.cn = [...svg.querySelectorAll('.cn')];
    o.rail = M.rail(o.dia, { style: { left: X0 + 'px', width: 4 * CW + 3 * CG + 'px', top: RAIL - 1 + 'px', height: '3px' } });
    o.cardRect = [X0 + pi * (CW + CG), CY, CW, CH];

    /* the opened part */
    o.box = M.html('<div class="box"></div>');
    root.appendChild(o.box);
    o.phd = M.mount(root, `<div class="phd"><div class="kind" data-k="kind">${part.kind}</div><div class="nm" data-k="nm">${part.name}</div></div>`);
    const n = caps.length, tw = (PANEL[2] - 2 * PAD - (n - 1) * TILE_G) / n;
    o.tileRects = caps.map((_, i) => [PANEL[0] + PAD + i * (tw + TILE_G), PANEL[1] + TILE_Y, tw, TILE_H]);
    o.tiles = caps.map((c, i) => {
      const el = M.html(`<div class="tile">${c.glyph ? `<svg class="g" viewBox="0 0 64 64" aria-hidden="true">${c.glyph.map((d) => `<path d="${d}"/>`).join('')}</svg>` : ''}<div class="nm">${c.name}</div></div>`);
      root.appendChild(el);
      place(el, o.tileRects[i]);
      return el;
    });

    /* the featured capability, growing into the title */
    const fc = caps[fi];
    o.grow = M.html(`<div class="grow box">${fc.glyph ? `<svg class="g" viewBox="0 0 64 64" aria-hidden="true">${fc.glyph.map((d) => `<path d="${d}"/>`).join('')}</svg>` : ''}</div>`);
    root.appendChild(o.grow);
    o.teb = M.mount(root, `<div class="teb">Akka ${part.name}</div>`).root;
    o.ttl = M.mount(root, `<div class="ttl">${cfg.feature}.</div>`).root;
    return { at: (t) => at(o, t) };
  }

  function beats(o) {
    if (o.B) return o.B;
    const b = (o.cfg.beats && o.cfg.beats()) || {};
    o.B = {
      glow: b.glow || [[2.6, 3.8], [3.8, 5.0], [5.0, 6.2], [6.2, 7.4]],
      push: b.push ?? 7.6,
      light: b.light ?? 10.4,
      title: b.title ?? 11.0,
    };
    return o.B;
  }

  function at(o, t) {
    const B = beats(o), P = B.push, L = B.light, T = B.title;
    M.fade(o.grid, t, 0, 1.2);

    /* build: the head, the cards and their glyphs, the connectors and the shared rail, all inside 2 s */
    const fall = M.p(t, P, 0.8, 'inOutCubic');
    M.rise(o.head.eb, t, 0.0);
    M.rise(o.head.h, t, 0.1);
    o.head.root.style.opacity = (1 - fall).toFixed(3);
    o.cards.forEach((c, i) => {
      if (i === o.pi) return;
      const f = M.p(t, P + 0.05 * Math.abs(i - o.pi), 0.8, 'inOutCubic');
      if (t < P) M.rise(c, t, 0.25 + i * 0.1);
      else M.set(c, { opacity: (1 - f).toFixed(3), transform: `translateY(${(f * 70).toFixed(1)}px) scale(${(1 - 0.06 * f).toFixed(4)})` });
    });
    const feat = o.cards[o.pi];
    M.rise(feat, t, 0.25 + o.pi * 0.1);
    o.cards.forEach((c, i) => {
      M.cardDraw(c, t, 0.5 + i * 0.1);
      const [a, b] = B.glow[i];
      M.cardGlow(c, i === o.pi ? M.p(t, a, 0.4, 'outCubic') : M.ramp(t, a, b, 0.35, 0.45));
      M.draw(o.cn[i], t, 0.9 + i * 0.08, 0.5);
      o.cn[i].style.opacity = t < 0.9 ? 0 : (1 - fall).toFixed(3);
    });
    M.railGrow(o.rail, t, 1.0, 1.0);
    M.railAt(o.rail, t, 10);
    o.rail.style.opacity = (0.8 * (1 - fall)).toFixed(3);

    /* the push: the featured card comes to the centre of the frame as the others fall away */
    const pp = M.p(t, P, 1.1, 'inOutCubic');
    const [cx, cy, cw, ch] = o.cardRect, s = 1 + 0.22 * pp;
    const tx = (960 - s * (cx + cw / 2)) * pp, ty = (450 - s * (cy + ch / 2)) * pp;
    o.dia.style.transformOrigin = '0 0';
    o.dia.style.transform = pp > 0 ? `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${s.toFixed(4)})` : 'none';
    /* its contents clear, and the empty card takes over as the panel */
    const clear = M.p(t, P + 0.45, 0.35, 'inOutCubic');
    [...feat.children].forEach((n) => (n.style.opacity = (1 - clear).toFixed(3)));
    const SW = P + 0.95, open = M.p(t, SW, 0.95, 'reveal');
    const s1 = 1 + 0.22 * M.ease.inOutCubic(M.prog(SW, P, 1.1)), p1 = M.ease.inOutCubic(M.prog(SW, P, 1.1));
    const from = [(960 - s1 * (cx + cw / 2)) * p1 + s1 * cx, (450 - s1 * (cy + ch / 2)) * p1 + s1 * cy, s1 * cw, s1 * ch];
    const swapped = t >= SW;
    feat.style.visibility = swapped ? 'hidden' : '';
    o.box.style.display = swapped ? '' : 'none';
    if (swapped) { place(o.box, lerpRect(from, PANEL, open)); M.cardGlow(o.box, 1 - 0.55 * open); }

    /* the part's name and its capabilities rise in the opened panel */
    M.rise(o.phd.kind, t, SW + 0.35, { dy: 12 });
    M.rise(o.phd.nm, t, SW + 0.42, { dy: 14 });
    const lit = M.p(t, L, 0.45, 'outCubic');
    o.tiles.forEach((el, i) => {
      M.rise(el, t, SW + 0.5 + i * 0.07, { dy: 18, opacity: i === o.fi ? 1 : 1 - 0.65 * lit });
      M.cardDraw(el, t, SW + 0.7 + i * 0.07, 0.8);
      M.cardGlow(el, i === o.fi ? lit : 0);
    });

    /* the featured tile grows to fill the frame and its name becomes the title */
    const g = M.p(t, T, 0.9, 'inOutCubic');
    const gone = M.p(t, T, 0.55, 'inOutCubic');
    [o.box, o.phd.root].forEach((el) => (el.style.opacity = (1 - gone).toFixed(3)));
    o.tiles.forEach((el, i) => { if (t >= T) el.style.opacity = i === o.fi ? 0 :((1 - gone) * 0.35).toFixed(3); });
    const tr = o.tileRects[o.fi];
    o.grow.style.display = t >= T ? '' : 'none';
    if (t >= T) {
      place(o.grow, lerpRect(tr, [-2, -2, 1924, 1084], g));
      const fadeBox = M.p(t, T + 0.55, 0.6, 'inOutCubic');
      M.set(o.grow, { borderRadius: (12 * (1 - g)).toFixed(1) + 'px', opacity: (1 - fadeBox).toFixed(3) });
      M.cardGlow(o.grow, 1 - 0.6 * g);
      const gl = o.grow.querySelector('.g');
      if (gl) gl.style.opacity = (1 - M.prog(t, T, 0.3)).toFixed(3);
    }
    const nx = tr[0] + NAME.left, ny = tr[1] + tr[3] - NAME.bottom - NAME.size;
    const fs = M.lerp(NAME.size, TITLE.size, g);
    M.set(o.ttl, {
      display: t >= T ? '' : 'none',
      fontSize: fs.toFixed(2) + 'px',
      letterSpacing: M.lerp(-0.03, -0.045, g).toFixed(4) + 'em',
      transform: `translate(${M.lerp(nx, TITLE.x, g).toFixed(1)}px, ${M.lerp(ny, TITLE.y, g).toFixed(1)}px)`,
    });
    M.rise(o.teb, t, T + 0.6, { dy: 10 });
    o.glow.style.opacity = (M.prog(t, T + 0.4, 1.0) * (0.75 + 0.25 * M.wave(t, 4))).toFixed(3);
    o.glow.style.transform = `translate(${(TITLE.x - 260).toFixed(1)}px, ${(TITLE.y - 330).toFixed(1)}px)`;
  }

  return { render, GLYPHS };
})();
