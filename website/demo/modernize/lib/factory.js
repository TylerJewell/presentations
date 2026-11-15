/* Fx: the shared pieces of the modernization film. Every piece is built once in render(root) and set for an
   instant t in at(t); nothing keeps state between frames, so the film scrubs and captures exactly.
   The classes live in ../film.css (prefix fx-). Stage px are the 1920x1080 stage.

   Registration
     Fx.register(def)             Fills act, title, duration and caption (the `say` line) from the scene's row in
                                  scenes/index.js, then registers it. A scene file holds only id, optional
                                  captionZone, render(root), at(t) and its own helpers.

   The factory's five stations
     Fx.STATIONS                  Discover, Decide, Specify, Build, Release.

   The frame most scenes share: eyebrow and headline at the top, the five stations at the foot
     const F = Fx.frame(root, { eyebrow, headline, station, from });
                                  station: index into STATIONS that is lit, or null for no foot. from: the station
                                  the system comes from (-1 enters from the rail's start); it slides to `station`.
     F.at(t, { start = 0 })       Head rises from `start`; the foot fades in and the system moves to its station.

   Pieces
     Fx.card(parent, { x, y, w, h, k, nm, tx, ghost })   A card: a label, a big name and one line.
     Fx.tile(parent, { x, y, w, h, text })              A named tile.
     Fx.step(parent, { x, y, w, text })                 A station pill on a large rail.
     Fx.glow(el, g)               Sets --g (0..1) on any fx- element.
     Fx.svg(root, inner)          A full-stage drawing layer; returns { el, k } with its [data-k] children.
     Fx.stream(root, n)           n packets for work moving along a path.
     Fx.streamAt(pks, path, t, a, b, period)
                                  The packets travel `path` in a loop between scene times a and b, each taking
                                  `period` seconds; a packet already on its way finishes after b.

   A console screen, framed the akka.io way
     const S = Fx.screen(root, { src, source, name, rect });
                                  A captured screen (a 1920x1080 page at device scale 2, in ../screens/) in a hairline
                                  frame on black, under a caption naming where it comes from ("The Akka console") and
                                  the screen; rect { x, y, w, h } sets the frame. While it shows, a black backdrop covers the scene's own drawing between
                                  the headline and the caption.
     S.at(t, { a, b, from, to, hi, hiAt })
                                  Shows the screen from scene time a to b. from and to are [x, y, w] regions of the
                                  page in CSS px; the view pans and zooms from one to the other over the window. hi is
                                  an [x, y, w, h] page region outlined in yellow from hiAt. */
window.Fx = (function () {
  const M = Mock;

  const STATIONS = ['Discover', 'Decide', 'Specify', 'Build', 'Release'];
  const FOOT_STEP = 180;

  function row(id) {
    const r = (window.FILM_SCENES || []).find((s) => s.id === id);
    if (!r) throw new Error(`scene ${id} is not in the timeline (scenes/index.js)`);
    return r;
  }
  function register(def) {
    const r = row(def.id);
    def.act = r.act; def.title = r.title; def.duration = r.duration; def.caption = r.say;
    registerScene(def);
  }

  const glow = (el, g) => el.style.setProperty('--g', M.clamp(g).toFixed(3));

  function foot(parent, station, from) {
    const r = M.mount(parent, `<div class="fx-foot"><div class="ln"></div>
      ${STATIONS.map((s, i) => `<div class="st" style="left:${i * FOOT_STEP}px"><i></i><span>${s}</span></div>`).join('')}
      <div class="sys" data-k="sys"></div></div>`);
    const st = [...r.root.querySelectorAll('.st')];
    const x = (i) => (i < 0 ? -60 : i * FOOT_STEP);
    return {
      root: r.root,
      at(t, start) {
        M.fade(r.root, t, start, 0.6);
        const p = M.p(t, start + 0.5, 1.1, 'inOutCubic');
        r.sys.style.left = M.lerp(x(from), x(station), p).toFixed(1) + 'px';
        r.sys.style.opacity = from < 0 ? M.prog(t, start + 0.5, 0.4).toFixed(3) : 1;
        st.forEach((s, i) => glow(s, i === station ? M.prog(t, start + 1.2, 0.5) : 0));
      },
    };
  }

  function frame(parent, { eyebrow, headline, station = null, from = null }) {
    M.dotGrid(parent);
    const head = headline || eyebrow
      ? M.mount(parent, `<div class="fx-head"><div class="mk-eyebrow" data-k="eb">${eyebrow || ''}</div>${headline ? `<h2 class="fx-h" data-k="h">${headline}</h2>` : ''}</div>`)
      : null;
    const f = station == null ? null : foot(parent, station, from == null ? station : from);
    return {
      head: head && head.root, h: head && head.h, foot: f,
      at(t, { start = 0 } = {}) {
        if (head) { M.rise(head.eb, t, start); if (head.h) M.rise(head.h, t, start + 0.1); }
        if (f) f.at(t, start + 0.2);
      },
    };
  }

  function card(parent, { x, y, w, h, k, nm, tx, ghost }) {
    const r = M.mount(parent, `<div class="fx-card${ghost ? ' ghost' : ''}" style="left:${x}px;top:${y}px;width:${w}px;${h ? `height:${h}px` : ''}">
      ${k ? `<div class="k" data-k="k">${k}</div>` : ''}${nm ? `<div class="nm" data-k="nm">${nm}</div>` : ''}${tx ? `<div class="tx" data-k="tx">${tx}</div>` : ''}</div>`);
    return r;
  }
  const tile = (parent, { x, y, w, h, text }) => M.mount(parent, `<div class="fx-tile" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${text}</div>`).root;
  const step = (parent, { x, y, w, text }) => M.mount(parent, `<div class="fx-step" style="left:${x}px;top:${y}px;width:${w}px">${text}</div>`).root;

  function svg(root, inner) {
    const el = M.html(`<svg class="fx-svg" viewBox="0 0 1920 1080">${inner}</svg>`);
    root.appendChild(el);
    const k = {};
    el.querySelectorAll('[data-k]').forEach((n) => (k[n.dataset.k] = n));
    return { el, k };
  }

  function stream(root, n) {
    return Array.from({ length: n }, () => M.mount(root, '<div class="fx-pk"></div>').root);
  }
  function place(pk, path, p) {
    if (path._len == null) path._len = path.getTotalLength();
    const pt = path.getPointAtLength(path._len * M.clamp(p));
    pk.style.left = pt.x.toFixed(1) + 'px';
    pk.style.top = pt.y.toFixed(1) + 'px';
  }
  function streamAt(pks, path, t, a, b, period = 1.6) {
    pks.forEach((pk, i) => {
      const s = (t - a) / period - i / pks.length;            /* how many trips this packet has begun */
      const born = Math.floor(s), p = s - born;
      const launched = a + (born + i / pks.length) * period;   /* when the current trip began */
      if (t < a || s < 0 || launched > b) { pk.style.opacity = 0; return; }
      place(pk, path, M.ease.inOutCubic(p));
      pk.style.opacity = Math.min(1, p * 8, (1 - p) * 8).toFixed(3);
    });
  }

  const SCREEN = { x: 160, y: 332, w: 1600, h: 488 };
  function screen(root, { src, source = 'The Akka console', name, rect = SCREEN }) {
    const R = rect;
    const back = M.mount(root, '<div class="fx-back"></div>').root;
    const cap = M.mount(root, `<div class="fx-scap" style="left:${R.x}px;top:${R.y - 36}px"><b>${source}</b> · ${name}</div>`).root;
    const fr = M.mount(root, `<div class="fx-screen" style="left:${R.x}px;top:${R.y}px;width:${R.w}px;height:${R.h}px">
      <img data-k="img" src="${src}" alt=""><div class="hi" data-k="hi"></div></div>`);
    return {
      at(t, { a, b, from, to = from, hi, hiAt }) {
        const v = M.ramp(t, a, b, 0.5, 0.5);
        [back, cap, fr.root].forEach((el) => (el.style.opacity = v.toFixed(3)));
        if (v <= 0) return;
        fr.root.style.transform = `scale(${(0.985 + 0.015 * M.p(t, a, 0.8)).toFixed(4)})`;
        const p = M.ease.inOutCubic(M.prog(t, a + 0.3, b - a - 0.6));
        const [rx, ry, rw] = from.map((f, i) => M.lerp(f, to[i], p)), k = R.w / rw;
        M.set(fr.img, { width: (1920 * k).toFixed(1) + 'px', left: (-rx * k).toFixed(1) + 'px', top: (-ry * k).toFixed(1) + 'px' });
        if (hi) {
          const [hx, hy, hw, hh] = hi;
          M.set(fr.hi, { left: ((hx - rx) * k).toFixed(1) + 'px', top: ((hy - ry) * k).toFixed(1) + 'px', width: (hw * k).toFixed(1) + 'px', height: (hh * k).toFixed(1) + 'px' });
          fr.hi.style.opacity = M.prog(t, hiAt, 0.5).toFixed(3);
        } else fr.hi.style.opacity = 0;
      },
    };
  }

  return { STATIONS, register, frame, foot, card, tile, step, glow, svg, stream, place, streamAt, screen };
})();
