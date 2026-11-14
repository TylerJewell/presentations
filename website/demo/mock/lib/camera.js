/* The camera and live time.

   camera: a scene puts its content in a world layer (M.world) and calls M.camera(world, t, keys) from at().
   Each key eases the world to frame a subject rect (in unzoomed stage px) inside the area the caption
   leaves free, and back with rect: null. The world is laid out at full 1920x1080 size and only ever
   transformed, so Chrome rasterises text at the zoomed scale and it stays crisp. Never set will-change on
   anything inside a world: it freezes the raster at scale 1 and blurs the zoom.

   live time: M.abs(t) is a clock that has been running long before the scene is seen, so loops and
   counters built on it are mid-motion on the scene's first frame. */
(function () {
  const M = window.Mock;
  const W = 1920, H = 1080;
  M.CAM_MAX = 1.8;

  /** A full-stage layer for the camera to move. */
  M.world = function (root) {
    const el = document.createElement('div');
    el.className = 'mk-world';
    root.appendChild(el);
    return el;
  };

  /** The free area for a subject: the stage less the caption zone's band, inset by a margin. */
  M.safeArea = function (zone) {
    const z = M.ZONES[zone] || M.ZONES['bottom-left'];
    return [48, 48, W - 96, z.y - 48 - 24];
  };

  /** The view { s, x, y } that frames rect inside the safe area, at most M.CAM_MAX, never showing past the stage. */
  M.frameRect = function (rect, zone, pad = 36) {
    if (!rect) return { s: 1, x: 0, y: 0 };
    const [sx, sy, sw, sh] = M.safeArea(zone);
    const [x, y, w, h] = rect;
    const s = M.clamp(Math.min(sw / (w + 2 * pad), sh / (h + 2 * pad)), 1, M.CAM_MAX);
    let tx = sx + sw / 2 - s * (x + w / 2), ty = sy + sh / 2 - s * (y + h / 2);
    tx = M.clamp(tx, W - W * s, 0);
    ty = M.clamp(ty, H - H * s, 0);
    return { s, x: tx, y: ty };
  };

  /**
   * keys: [{ t, rect: [x, y, w, h] | null, dur?: 1.1, caption?: zone }] in time order.
   * At key.t the camera starts a move (eased in-out over dur, 0.8-1.4 s) from wherever it is to the view
   * framing key.rect. A key with caption: 'bottom-right' carries the caption to that zone during the move
   * and frames the subject around the new zone. Returns the current view.
   */
  M.camera = function (el, t, keys) {
    const base = (M.stageInfo.scene && (M.stageInfo.scene.captionZone || M.stageInfo.scene.captionPosition)) || 'bottom-left';
    let view = { s: 1, x: 0, y: 0 }, zone = base, move = null;
    for (const k of keys) {
      if (t < k.t) break;
      const to = k.caption || zone;
      const target = M.frameRect(k.rect, to);
      const p = M.ease.inOutCubic(M.prog(t, k.t, k.dur ?? 1.1));
      const from = view;
      view = { s: M.lerp(from.s, target.s, p), x: M.lerp(from.x, target.x, p), y: M.lerp(from.y, target.y, p) };
      move = null;
      if (to !== zone) { if (p >= 1) zone = to; else move = { from: zone, to, p }; }
    }
    if (!move && zone !== base) move = { from: zone, to: zone, p: 1 };
    el.style.transformOrigin = '0 0';
    el.style.transform = view.s === 1 && !view.x && !view.y ? 'none' : `translate(${view.x.toFixed(2)}px, ${view.y.toFixed(2)}px) scale(${view.s.toFixed(4)})`;
    M.stageInfo.captionMove = move;
    return view;
  };

  /** Seconds on a clock that started PREROLL seconds before the video: use it for anything live. */
  M.PREROLL = 90;
  M.abs = function (t) {
    const s = M.stageInfo.scene;
    return M.PREROLL + (s ? s.begin + s.cardDur : 0) + t;
  };
  /** Phase 0..1 of a loop with this period, on the live clock. */
  M.loop = (t, period, offset = 0) => (((M.abs(t) + offset) / period) % 1 + 1) % 1;
  /** A counter that has been ticking at `rate` a second since long before the scene. */
  M.ticker = (t, base, rate) => base + rate * M.abs(t);
  /** Deterministic noise in 0..1 for an integer seed: jitter for live figures without randomness. */
  M.noise = function (n) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  /** Smooth noise on the live clock, 0..1, for a figure that wanders (rps, latency). */
  M.wander = function (t, speed = 0.5, seed = 0) {
    const u = M.abs(t) * speed + seed * 17.3, i = Math.floor(u), f = u - i;
    const k = f * f * (3 - 2 * f);
    return M.lerp(M.noise(i + seed * 101), M.noise(i + 1 + seed * 101), k);
  };
})();
