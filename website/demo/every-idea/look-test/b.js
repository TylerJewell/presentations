// Variant B (and the scene C captures): points in 3D with perspective projection, depth of field, glow
// on bright points, per-element easing and staggered starts. Canvas 2D, no library; every value is a
// function of t and the seeded point set.
(() => {
  const stage = document.getElementById("stage");
  const cv = document.createElement("canvas"); stage.appendChild(cv);
  const dpr = window.devicePixelRatio || 1;
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext("2d");

  const F = 1400;                  // focal length in px
  const D_END = F;                 // camera-to-focal-plane distance at the end of the pull-back: 1 px per unit
  const D_START = F / ZOOM;
  const APERTURE = 50;             // circle of confusion in px = APERTURE * |depth - focus| / depth
  const COC_MAX = 90;

  // The first point, the five labelled points and the field. Labelled points lie in the focal plane (z = 0).
  const rnd = mulberry32(2024);
  const pts = [{ x: 0, y: 0, z: 0, b: 1, R: 2.4, rn: 0, first: true }];
  LABELS.forEach((l) => pts.push({ x: l.x, y: l.y, z: 0, b: 1, R: 2.4, rn: radial(l.x, l.y) }));
  for (let i = 0; i < 3400; i++) {
    const x = (rnd() * 2 - 1) * 1900, y = (rnd() * 2 - 1) * 1100, z = -100 + rnd() * 900;
    const b = brightness(rnd);
    pts.push({ x, y, z, b, R: 1.2 + 1.6 * b, rn: radial(x, y) });
  }

  ctx.font = "700 150px 'Instrument Sans'";
  const WORD_SIZE = 150;
  const wordParts = [["i", 0], ["d", 0], ["e", 0], ["A", 1], ["I", 1], ["t", 0], ["i", 0], ["o", 0], ["n", 0]];

  // White before the wave, yellow after it.
  const mix = (L) => YELLOW.map((c) => Math.round(lerp(255, c, L))).join(",");

  function drawPoint(sx, sy, rd, sharp, a, col, glow) {
    let g = ctx.createRadialGradient(sx, sy, 0, sx, sy, rd);
    g.addColorStop(0, `rgba(${col},${a})`);
    g.addColorStop(Math.min(0.95, 0.6 * sharp), `rgba(${col},${a})`);
    g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, rd, 0, 6.2832); ctx.fill();
    if (glow > 0.01) {
      const gr = rd * 7;
      g = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
      g.addColorStop(0, `rgba(${col},${glow})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, gr, 0, 6.2832); ctx.fill();
    }
  }

  window.at = (t) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);

    // Camera: pulls back along z with a sideways drift that returns to centre.
    const e = smoother(prog(t, T.pull[0], T.pull[1]));
    const D = D_START * Math.pow(D_END / D_START, e);
    const drift = Math.sin(Math.PI * e);
    const camX = 240 * drift, camY = -70 * drift;
    const front = waveFront(t, inOutSine);
    const wa = wordAmount(t);
    const anchors = [];

    ctx.globalCompositeOperation = "lighter";
    for (let n = 0; n < pts.length; n++) {
      const p = pts[n];
      const depth = p.z + D;
      if (depth < 25) continue;
      const k = F / depth;
      const sx = W / 2 + (p.x - camX) * k, sy = H / 2 + (p.y - camY) * k;
      if (n >= 1 && n <= LABELS.length) anchors[n - 1] = [sx, sy];
      const r = Math.min(60, p.R * k);
      const coc = Math.min(COC_MAX, (APERTURE * Math.abs(depth - D)) / depth);
      const rd = Math.sqrt(r * r + coc * coc) * 1.25;
      if (sx < -rd * 7 || sx > W + rd * 7 || sy < -rd * 7 || sy > H + rd * 7) continue;
      const sharp = Math.min(1, (r * 1.25) / rd);
      const L = lit(sx - W / 2, front);
      const rv = p.first ? 1 : reveal(t, p.rn, outCubic);
      let a = lerp(p.b * rv, litAlpha(p.b), L);
      a *= (0.15 + 0.85 * Math.pow(sharp, 1.3)) * (1 - 0.3 * Math.max(0, p.z) / 800);
      const dx = (sx - W / 2) / 460, dy = (sy - H / 2) / 115;
      const dim = 1 - 0.92 * wa * (1 - smooth(clamp01((Math.hypot(dx, dy) - 0.9) / 0.7)));
      a *= dim;
      if (a < 0.004) continue;
      const glow = p.b > 0.7 ? a * 0.25 * Math.max(sharp, 0.3) : 0;
      drawPoint(sx, sy, rd, sharp, a.toFixed(3), mix(L), glow);
    }

    // Wave front: a soft yellow band.
    const bandA = 0.12 * prog(t, T.wave[0], T.wave[0] + 0.2) * (1 - prog(t, T.wave[1] - 0.2, T.wave[1]));
    if (bandA > 0) {
      const bx = W / 2 + front;
      const g = ctx.createLinearGradient(bx - 210, 0, bx + 210, 0);
      g.addColorStop(0, "rgba(255,206,74,0)"); g.addColorStop(0.5, `rgba(255,206,74,${bandA})`); g.addColorStop(1, "rgba(255,206,74,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    // Labels rise from below their point with a slight overshoot and settle.
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "400 22px 'Instrument Sans'"; ctx.letterSpacing = "0px"; ctx.textBaseline = "middle";
    LABELS.forEach((l, i) => {
      const u = prog(t, labelStart(i), labelStart(i) + 0.8);
      if (u <= 0 || !anchors[i]) return;
      ctx.globalAlpha = 0.7 * outCubic(clamp01(u * 1.6)) * (1 - prog(t, 6.8, 7.4));
      ctx.fillStyle = "#fff";
      ctx.fillText(l.text, anchors[i][0] + 16, anchors[i][1] + (1 - outBack(u)) * 18);
    });

    // The word forms letter by letter, each letter on its own start.
    ctx.font = `700 ${WORD_SIZE}px 'Instrument Sans'`; ctx.letterSpacing = "-4.5px"; ctx.textBaseline = "alphabetic";
    const total = ctx.measureText("ideAItion").width;
    const fade = 1 - inOutSine(prog(t, T.fadeOut[0], T.fadeOut[1]));
    let prefix = "";
    wordParts.forEach(([ch, accent], i) => {
      const x = W / 2 - total / 2 + ctx.measureText(prefix).width;
      prefix += ch;
      const u = outExpo(prog(t, T.word[0] + i * 0.0467, T.word[0] + i * 0.0467 + 0.56));
      if (u <= 0) return;
      ctx.globalAlpha = u * fade;
      ctx.filter = u < 1 ? `blur(${(1 - u) * 14 * dpr}px)` : "none";
      ctx.fillStyle = accent ? "#FFCE4A" : "#fff";
      ctx.fillText(ch, x, H / 2 + 54 + (1 - u) * 36);
    });
    ctx.filter = "none"; ctx.globalAlpha = 1;
  };
  window.at(0);
})();
