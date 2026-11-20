// Variant D: the field of ideas is the house dot grid laid on a ground plane and seen in perspective, so it
// reads as a plain of lights. Every mark is sharp and at full colour: a brighter light is a larger dot, never
// a more opaque one, because yellow at low opacity on black turns brown. Distance fades the plain to black.
// Canvas 2D, no library; every value is a function of t.
(() => {
  const stage = document.getElementById("stage");
  const cv = document.createElement("canvas"); stage.appendChild(cv);
  const dpr = window.devicePixelRatio || 1;
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext("2d");

  const F = 1400;                              // focal length in px
  const S = 60;                                // grid spacing on the ground, world units
  const CAM0 = { dist: 130, elev: 0.30 };      // close on the first idea
  const CAM1 = { dist: 1836, elev: 0.2871 };   // high and far, 14 degrees below level
  const TARGET_Z1 = 325;                       // where the camera's aim ends, past the first idea
  const FOG = [3200, 9000];                    // distance over which the plain fades to black
  const TD = { pull: [1.5, 5.0], ignite: [5.0, 7.2], word: [7.2, 8.4] };

  const NAMED = [
    { text: "Loan origination", ix: 0, iz: 0 },
    { text: "Fraud monitoring", ix: 7, iz: 5 },
    { text: "Claims processing", ix: -10, iz: -4 },
    { text: "Payments ledger", ix: 10, iz: -3 },
    { text: "Customer loyalty", ix: -6, iz: 11 },
  ];
  // The grid covers the ground the camera sees at the end of the move, out to where the fade completes.
  const rnd = mulberry32(7);
  const camZ1 = -CAM1.dist * Math.cos(CAM1.elev);
  const pts = NAMED.map((n, i) => ({ x: n.ix * S, z: n.iz * S, built: true, named: i, hero: i === 0, u: 1, ph: 0.5 }));
  for (let iz = -20; iz <= 125; iz++) {
    const half = Math.ceil((1150 * (iz * S - camZ1 + 130)) / F / S);
    for (let ix = -half; ix <= half; ix++) {
      const cls = rnd(), u = rnd(), ph = rnd();
      if (NAMED.some((n) => n.ix === ix && n.iz === iz)) continue;
      pts.push({ x: ix * S, z: iz * S, built: cls < 0.04, u, ph });
    }
  }
  pts.forEach((p) => { p.d = Math.hypot(p.x, p.z); });

  const dot = (sx, sy, r, rgb, a) => {
    ctx.globalAlpha = a; ctx.fillStyle = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`;
    ctx.beginPath(); ctx.arc(sx, sy, r, 0, 6.2832); ctx.fill();
  };
  const ring = (sx, sy, r, color, a) => {
    ctx.globalAlpha = a; ctx.strokeStyle = color; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(sx, sy, r, 0, 6.2832); ctx.stroke();
  };

  window.at = (t) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);

    // Camera: cranes up and back from the first idea while its aim moves past the idea.
    const e = smoother(prog(t, TD.pull[0], TD.pull[1]));
    const dist = CAM0.dist * Math.pow(CAM1.dist / CAM0.dist, e), elev = lerp(CAM0.elev, CAM1.elev, e);
    const cy = dist * Math.sin(elev), cz = -dist * Math.cos(elev), tz = TARGET_Z1 * smooth(e);
    const fl = Math.hypot(cy, tz - cz), fy = -cy / fl, fz = (tz - cz) / fl;
    const project = (x, z) => {
      const vz = z - cz, zc = -cy * fy + vz * fz;
      return zc < 20 ? null : [W / 2 + (x * F) / zc, H / 2 - ((-cy * fz - vz * fy) * F) / zc, zc];
    };

    const reach = 9500 * Math.pow(e, 1.6);               // how far from the first idea the field has come up
    const ig = prog(t, TD.ignite[0], TD.ignite[1]);
    const front = 9500 * Math.pow(ig, 2.6);              // ignition radius on the ground
    const anchors = [];

    for (const p of pts) {
      const s = project(p.x, p.z);
      if (!s) continue;
      const [sx, sy, zc] = s;
      if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
      const up = p.hero ? 1 : smooth(clamp01((reach - p.d) / (0.3 * reach + 60)));
      const fog = 1 - smooth(prog(zc, FOG[0], FOG[1]));
      if (up * fog < 0.01) continue;

      // Ignition spreads over the ground from the first idea; each light flashes white as the front passes.
      const soft = 50 + 0.04 * p.d, q = front * (1 + 0.05 * (p.ph - 0.5)) - p.d;
      const L = ig <= 0 ? 0 : p.hero ? 1 : q > 0 ? 1 : 0;
      const flash = ig > 0 && q > -0.3 * soft ? Math.exp(-Math.pow((q - 0.5 * soft) / soft, 2)) : 0;
      const grey = 58 + 46 * p.u;
      const base = L ? YELLOW : p.built ? [240, 240, 240] : [grey, grey, grey];
      const rgb = base.map((c) => lerp(c, 255, flash));
      const world = (L ? 3.0 + 0.5 * p.u : p.built ? 2.6 : 2.0) * (p.hero ? 1.5 : 1);
      let r = Math.min(9, (world * F) / zc) * (1 + 0.7 * flash), a = up * fog;
      if (p.hero) r = clamp01(r / 7) * 7 < 3.4 ? 3.4 : Math.min(7, r);
      if (r < 0.9) { a *= (r / 0.9) * (r / 0.9); r = 0.9; }
      dot(sx, sy, r, rgb, a);
      if (p.named !== undefined) anchors[p.named] = [sx, sy, r];
    }

    // The ignition front is a hairline circle on the ground, which the camera sees as an ellipse.
    if (front > 0 && front < 9400) {
      ctx.globalAlpha = 0.9 * (1 - smooth(prog(front, 400, 9000))); ctx.strokeStyle = "#FFCE4A"; ctx.lineWidth = 1.25;
      ctx.beginPath();
      let open = false;
      for (let a = 0; a <= 360; a += 1.5) {
        const s = project(front * Math.cos((a * Math.PI) / 180), front * Math.sin((a * Math.PI) / 180));
        if (!s) { open = false; continue; }
        if (open) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]);
        open = true;
      }
      ctx.stroke();
    }

    // The first idea pulses a hairline ring while it stands alone.
    if (anchors[0] && t < TD.pull[0] + 0.6) {
      const ph = (t % 1.5) / 1.5;
      ring(anchors[0][0], anchors[0][1], anchors[0][2] + 4 + 70 * outCubic(ph), "#fff", 0.55 * (1 - ph) * (1 - prog(t, TD.pull[0], TD.pull[0] + 0.6)));
    }

    // Named ideas carry a hairline ring and a name; both leave before the word forms.
    ctx.font = "500 24px 'Instrument Sans'"; ctx.letterSpacing = "0px"; ctx.textBaseline = "middle";
    NAMED.forEach((n, i) => {
      const u = prog(t, 3.5 + 0.17 * i, 4.3 + 0.17 * i), out = 1 - prog(t, 6.6, 7.1);
      if (u <= 0 || out <= 0 || !anchors[i]) return;
      const [sx, sy, r] = anchors[i];
      ring(sx, sy, r + 7 + 10 * (1 - outCubic(u)), ig > 0 ? "#FFCE4A" : "#fff", 0.7 * outCubic(u) * out);
      ctx.globalAlpha = 0.9 * outCubic(clamp01(u * 1.6)) * out; ctx.fillStyle = "#fff";
      ctx.fillText(n.text, sx + r + 20, sy + 1 + (1 - outBack(u)) * 14);
    });

    // The word stands in the dark above the plain.
    const wu = prog(t, TD.word[0], TD.word[1]);
    if (wu > 0) {
      ctx.font = "700 150px 'Instrument Sans'"; ctx.letterSpacing = "-4.5px"; ctx.textBaseline = "alphabetic";
      const total = ctx.measureText("ideAItion").width;
      let prefix = "";
      for (const [ch, ai] of [["ide", 0], ["AI", 1], ["tion", 0]]) {
        const x = W / 2 - total / 2 + ctx.measureText(prefix).width; prefix += ch;
        ctx.globalAlpha = outCubic(wu); ctx.fillStyle = ai ? "#FFCE4A" : "#fff";
        ctx.fillText(ch, x, 210);
      }
    }
    ctx.globalAlpha = 1;
  };
  window.at(0);
})();
