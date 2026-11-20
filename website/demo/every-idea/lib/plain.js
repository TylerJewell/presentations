/* The plain: the house dot grid laid on a ground plane and seen through a perspective camera. Each mark is one
   idea, drawn as a light bulb where a bulb fits and as a point of light further off. Every mark is sharp and
   at full colour: a brighter light is a larger mark, never a more opaque one, because yellow at low opacity on
   black turns brown. Distance fades the plain to black, and light effects are hairlines. Plain.create(root)
   returns a canvas layer; draw(state) paints one instant and returns the screen positions the slide needs for
   its own elements. */
(function () {
  const W = 1920, H = 1080;
  const F = 1400;                 // focal length in px
  const S = 60;                   // grid spacing on the ground, world units
  const FOG = [3200, 9000];       // camera distance over which the plain fades to black
  const FAR = 60000;              // far enough to stand for the horizon
  const REACH = 9500;             // ground distance from the first idea at which the fade completes
  const YELLOW = [255, 206, 74], WHITE = [241, 241, 241];
  const NAMED = [
    { text: 'Loan origination', ix: 0, iz: 0 },
    { text: 'Fraud monitoring', ix: 8, iz: 5 },
    { text: 'Claims processing', ix: -11, iz: -4 },
    { text: 'Payments ledger', ix: 11, iz: -3 },
    { text: 'Customer loyalty', ix: -7, iz: 12 },
  ];
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const smooth = (x) => x * x * (3 - 2 * x);
  const span = (v, a, b) => clamp01((v - a) / (b - a));

  // Seeded so every render of an instant is identical.
  function mulberry32(a) {
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  /** more: further marked ideas, each { text, ix, iz, built, brief }, numbered after the five named ones.
      A brief idea stands out as a named idea only while its name shows, and is an ordinary idea otherwise. */
  function create(root, wideCamZ, more = []) {
    const MARKS = NAMED.concat(more);
    const cv = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.cssText = 'left:0;top:0;width:1920px;height:1080px';
    root.appendChild(cv);
    const ctx = cv.getContext('2d');

    // The grid covers the ground the widest camera sees, out to where the fade completes.
    const rnd = mulberry32(7);
    const pts = MARKS.map((n, i) => ({ x: n.ix * S, z: n.iz * S, built: !!n.built, brief: !!n.brief, named: i, hero: i === 0, u: 1, ph: 0.5 }));
    for (let iz = -22; iz <= 122; iz++) {
      const half = Math.ceil((1150 * (iz * S - wideCamZ + 80)) / F / S);
      for (let ix = -half; ix <= half; ix++) {
        const cls = rnd(), u = rnd(), ph = rnd();
        if (MARKS.some((n) => n.ix === ix && n.iz === iz)) continue;
        pts.push({ x: ix * S, z: iz * S, built: cls < 0.04, u, ph });
      }
    }
    pts.forEach((p) => { p.d = Math.hypot(p.x, p.z); });
    // Named ideas are drawn last, over their neighbours.
    const order = pts.slice(MARKS.length).concat(pts.slice(0, MARKS.length));

    function draw(st) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1; ctx.setLineDash([]);
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

      // The camera looks from (x, cy, cz) towards the ground at tz; z moves the camera and its aim forward together.
      const { dist, elev, tz, x: camX = 0, z: camZ = 0 } = st.cam;
      const cy = dist * Math.sin(elev), back = dist * Math.cos(elev), cz = camZ - back;
      const fl = Math.hypot(cy, tz + back), fy = -cy / fl, fz = (tz + back) / fl;
      const horizon = H / 2 + (F * fy) / fz;
      const project = (x, z) => {
        const vz = z - cz, zc = -cy * fy + vz * fz;
        return zc < 20 ? null : [W / 2 + ((x - camX) * F) / zc, H / 2 - ((-cy * fz - vz * fy) * F) / zc, zc];
      };
      const fogR = st.fog || FOG;
      const fogOf = (zc) => 1 - smooth(span(zc, fogR[0], fogR[1]));
      const out = { horizon, named: [], project };

      // A wave is a radius on the ground. Behind its front a light has changed state; at the front it flashes.
      const wave = (front, p) => {
        if (front <= 0) return [0, 0];
        const soft = 50 + 0.04 * p.d, q = front * (1 + 0.05 * (p.ph - 0.5)) - p.d;
        return [q > 0 ? 1 : 0, q > -0.3 * soft ? Math.exp(-Math.pow((q - 0.5 * soft) / soft, 2)) : 0];
      };

      for (const p of order) {
        const s = project(p.x, p.z);
        if (!s) continue;
        const [sx, sy, zc] = s;
        if (p.named !== undefined) out.named[p.named] = [sx, sy, 0];
        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
        const up = p.hero ? 1 : smooth(clamp01((st.reach - p.d) / (0.3 * st.reach + 60)));
        const fog = fogOf(zc);
        if (up * fog < 0.01) continue;

        const [isWhite, flashW] = wave(st.white, p);
        let [isYellow, flashY] = wave(st.yellow, p);
        // A marked idea can go to production on its own, ahead of the wave: the first by heroYellow, the others by shipped[].
        const own = p.hero ? st.heroYellow : p.named !== undefined && st.shipped ? st.shipped[p.named] || 0 : null;
        if (own !== null) {
          if (p.hero) isYellow = own > 0 ? 1 : 0; else if (own > 0) isYellow = 1;
          flashY = Math.max(flashY, Math.sin(Math.PI * own));
        }
        const flash = Math.max(flashW, flashY);
        const lit = isYellow || isWhite || p.built;
        // A brief idea is drawn both ways while its name rises or leaves, one fading into the other.
        const stands = p.named === undefined ? 0 : p.brief ? Math.min(1, st.names[p.named] || 0) : 1;
        for (const named of stands <= 0 ? [false] : stands >= 1 ? [true] : [false, true]) {
          const grey = named ? 190 : 58 + 46 * p.u;
          const base = isYellow ? YELLOW : lit ? WHITE : [grey, grey, grey];
          const colour = `rgb(${lerp(base[0], 255, flash) | 0},${lerp(base[1], 255, flash) | 0},${lerp(base[2], 255, flash) | 0})`;
          // Where rows fall closer than 4 px the marks dim in proportion, so far rows never merge into bright lines.
          const rowPx = (S * F * cy) / (zc * zc);
          ctx.globalAlpha = (named ? up : up * fog * Math.min(1, rowPx / 4)) * (named ? stands : 1 - stands);

          // An idea is a light bulb wherever a bulb fits between the rows, and a point of light further off.
          // A named idea is always a bulb. An unlit bulb is an outline; a lit one is filled.
          const rb = Math.max(p.hero ? 6.5 : named ? 5 : 0, Math.min(p.hero ? 20 : 13, ((p.hero ? 8.5 : named ? 7 : 5.5) * F) / zc)) * (1 + 0.45 * flash);
          if (named || (rb >= 2.6 && rb * 3.3 <= rowPx)) {
            ctx.fillStyle = lit ? '#8f8f8f' : colour;                                    // the cap and its tip
            ctx.fillRect(sx - 0.42 * rb, sy - 1.12 * rb, 0.84 * rb, 0.8 * rb);
            ctx.fillRect(sx - 0.2 * rb, sy - 0.32 * rb, 0.4 * rb, 0.22 * rb);
            if (rb >= 7) { ctx.fillStyle = '#000'; [0.84, 0.58].forEach((k) => ctx.fillRect(sx - 0.42 * rb, sy - k * rb, 0.84 * rb, Math.max(1, 0.07 * rb))); }
            ctx.beginPath(); ctx.arc(sx, sy - 2 * rb, rb, 0, 6.2832);                    // the glass
            ctx.fillStyle = lit ? colour : '#000'; ctx.fill();
            if (!lit) { ctx.strokeStyle = colour; ctx.lineWidth = Math.max(1, 0.16 * rb); ctx.stroke(); }
            if (named) out.named[p.named] = [sx, sy - 2 * rb, rb];
            continue;
          }
          const world = isYellow ? 3.0 + 0.5 * p.u : isWhite ? (p.built ? 3.0 : 2.6) : p.built ? 2.6 : 2.0;
          let r = Math.min(9, (world * F) / zc) * (1 + 0.7 * flash);
          if (r < 0.9) { ctx.globalAlpha *= (r / 0.9) * (r / 0.9); r = 0.9; }
          ctx.fillStyle = colour;
          ctx.beginPath(); ctx.arc(sx, sy, r, 0, 6.2832); ctx.fill();
        }
      }

      // A circle on the ground about the first idea, which the camera sees as an ellipse.
      const groundArc = (radius, from, to) => {
        ctx.beginPath();
        let open = false;
        for (let a = from; a <= to + 1e-6; a += Math.PI / 120) {
          const s = project(radius * Math.cos(a), radius * Math.sin(a));
          if (!s) { open = false; continue; }
          if (open) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]);
          open = true;
        }
        ctx.stroke();
      };
      const front = (radius, color) => {
        if (radius <= 0 || radius >= REACH - 100) return;
        ctx.globalAlpha = 0.9 * (1 - smooth(span(radius, 400, REACH - 500))); ctx.strokeStyle = color; ctx.lineWidth = 1.25;
        groundArc(radius, 0, 2 * Math.PI);
      };
      front(st.white, '#F1F1F1');
      front(st.yellow, '#FFCE4A');

      // The rings of trust about the first idea grow from the far side towards the camera. An open ring is
      // dashed and leaves a gap at the front, where its name stands; a closed ring is solid and yellow.
      (st.rings || []).forEach((g) => {
        if (g.p <= 0 || g.a <= 0) return;
        ctx.globalAlpha = g.a * lerp(0.6, 0.95, g.closed); ctx.lineWidth = 1.25;
        ctx.strokeStyle = g.closed > 0.5 ? '#FFCE4A' : '#F1F1F1';
        ctx.setLineDash(g.closed > 0.98 ? [] : [7, 7]);
        groundArc(g.r, Math.PI / 2 - Math.PI * g.p, Math.PI / 2 + Math.PI * g.p);
        ctx.setLineDash([]);
      });

      // Every column of ideas has a straight line over the ground to the horizon. Parallel lines on the
      // ground meet at one point on screen, so every factory arrives at the same runtime.
      const vp = [W / 2, horizon];
      if (st.lines > 0) {
        ctx.strokeStyle = '#FFCE4A'; ctx.lineWidth = 1;
        for (let ix = -80; ix <= 80; ix++) {
          const far = Math.abs(ix) / 80, u = smooth(span(st.lines, 0.5 * far, 0.5 * far + 0.5));
          const a = project(ix * S, -1250);
          if (u <= 0 || !a || ix === 0) continue;
          ctx.globalAlpha = 0.34 * Math.pow(1 - far, 1.2);
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], vp[0], u), lerp(a[1], vp[1], u)); ctx.stroke();
        }
      }

      // The first idea's own line, in three parts: to the specification, through the pipeline, to the runtime.
      const hero = project(0, 0);
      // Once the camera has passed the idea, the line starts from the ground just ahead of the camera.
      const foot = hero || project(0, cz + 60);
      out.stations = [project(0, st.stationZ[0]), project(0, st.stationZ[1])];
      if (foot && st.line > 0) {
        const stops = [foot, out.stations[0], out.stations[1], vp];
        ctx.globalAlpha = st.lineA; ctx.strokeStyle = '#FFCE4A'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(foot[0], foot[1]);
        for (let k = 0; k < 3; k++) {
          const u = clamp01(st.line - k);
          if (u <= 0) break;
          ctx.lineTo(lerp(stops[k][0], stops[k + 1][0], u), lerp(stops[k][1], stops[k + 1][1], u));
        }
        ctx.stroke();
        out.stations.forEach((s, k) => {
          if (st.line < k + 1 || st.stationA <= 0) return;
          ctx.globalAlpha = st.stationA;
          ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(s[0], s[1], 6, 0, 6.2832); ctx.fill();
          ctx.beginPath(); ctx.arc(s[0], s[1], 6, 0, 6.2832); ctx.stroke();
        });
        if (st.ship > 0 && st.ship < 1) {
          const u = smooth(st.ship);
          ctx.globalAlpha = 1; ctx.fillStyle = '#FFCE4A';
          ctx.beginPath(); ctx.arc(lerp(foot[0], vp[0], u), lerp(foot[1], vp[1], u), lerp(5, 2, u), 0, 6.2832); ctx.fill();
        }
      }

      // Three streams run back down the first idea's line, from a height on screen to the specification.
      if (st.feed && st.feed.a > 0 && out.stations[0]) {
        const to = out.stations[0];
        ctx.globalAlpha = st.feed.a; ctx.strokeStyle = '#F1F1F1'; ctx.lineWidth = 2; ctx.setLineDash([3, 13]);
        ctx.lineDashOffset = -16 * st.feed.phase;
        [-14, 0, 14].forEach((dx) => { ctx.beginPath(); ctx.moveTo(W / 2 + dx, st.feed.fromY); ctx.lineTo(to[0] + dx * 0.4, to[1] - 12); ctx.stroke(); });
        ctx.setLineDash([]); ctx.lineDashOffset = 0;
      }

      // A station is a hairline across the ground at one depth. Every factory line crosses it.
      (st.cross || []).forEach((c) => {
        const s = project(0, c.z);
        if (!s || c.p <= 0 || c.a <= 0) return;
        ctx.globalAlpha = 0.5 * c.a; ctx.strokeStyle = '#F1F1F1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(W / 2 - 710 * c.p, s[1]); ctx.lineTo(W / 2 + 900 * c.p, s[1]); ctx.stroke();
      });
      // A bar is the record a station passed on; a light is an idea on its way. Both have a size on the ground.
      (st.bars || []).forEach((b) => {
        const s = project(b.x, b.z);
        if (!s || b.a <= 0) return;
        const half = Math.max(2, (12 * F) / s[2]);
        ctx.globalAlpha = 0.9 * b.a; ctx.strokeStyle = '#FFCE4A'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(s[0] - half, s[1]); ctx.lineTo(s[0] + half, s[1]); ctx.stroke();
      });
      (st.lights || []).forEach((l) => {
        const s = project(l.x, l.z);
        if (!s || l.a <= 0) return;
        const r = Math.max(1.6, (l.w * F) / s[2]);
        ctx.globalAlpha = l.a; ctx.fillStyle = l.white ? '#fff' : '#FFCE4A';
        ctx.beginPath(); ctx.arc(s[0], s[1], r, 0, 6.2832); ctx.fill();
        if (l.white && r > 2.4) { ctx.globalAlpha = 0.7 * l.a; ctx.strokeStyle = '#F1F1F1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(s[0], s[1], r + 6, 0, 6.2832); ctx.stroke(); }
      });

      // The runtime is the horizon: a hairline that draws outward from the vanishing point.
      if (st.horizonLine > 0) {
        const half = W * 0.5 * st.horizonLine;
        const g = ctx.createLinearGradient(W / 2 - half, 0, W / 2 + half, 0);
        g.addColorStop(0, 'rgba(255,206,74,0)'); g.addColorStop(0.22, 'rgba(255,206,74,1)');
        g.addColorStop(0.78, 'rgba(255,206,74,1)'); g.addColorStop(1, 'rgba(255,206,74,0)');
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(W / 2 - half, horizon); ctx.lineTo(W / 2 + half, horizon); ctx.stroke();
        // A pulse of light runs outward along the line.
        if (st.horizonPulse > 0 && st.horizonPulse < 1) {
          const at = W * 0.5 * st.horizonPulse, len = 120;
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.globalAlpha = Math.sin(Math.PI * st.horizonPulse);
          [-1, 1].forEach((d) => { ctx.beginPath(); ctx.moveTo(W / 2 + d * at, horizon); ctx.lineTo(W / 2 + d * (at + len), horizon); ctx.stroke(); });
        }
      }

      // Hairline leaders from a card to the mark it describes: the first idea, or a station by index.
      (st.leaders || []).forEach((l) => {
        const to = l.to === 'hero' ? hero : out.stations[l.to];
        if (l.a <= 0 || !to) return;
        ctx.globalAlpha = 0.45 * l.a; ctx.strokeStyle = '#F1F1F1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(l.from[0], l.from[1]); ctx.lineTo(to[0], to[1]); ctx.stroke();
      });

      // The first idea pulses a hairline ring while it stands alone.
      const glass = out.named[0] || hero;
      if (glass && st.lonely > 0) {
        ctx.globalAlpha = 0.55 * (1 - st.lonelyPhase) * st.lonely; ctx.strokeStyle = '#F1F1F1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(glass[0], glass[1], (glass[2] || 0) + 8 + 70 * (1 - Math.pow(1 - st.lonelyPhase, 3)), 0, 6.2832); ctx.stroke();
      }

      // Marked ideas carry a hairline ring and a name on a black ground, so the name reads over the plain.
      // texts[i] replaces a name, tags[i] follows it in yellow capitals, and left[i] puts both to the left.
      const NAME = "500 24px 'Instrument Sans'", TAG = "600 19px 'Instrument Sans'";
      ctx.textBaseline = 'middle';
      MARKS.forEach((n, i) => {
        const a = st.names[i] || 0, s = out.named[i];
        const text = (st.texts && st.texts[i]) || n.text, tag = ((st.tags && st.tags[i]) || '').toUpperCase();
        if (a <= 0 || !s || !s[2] || !text) return;
        const yel = i === 0 ? st.heroYellow > 0.5 : !!(st.shipped && st.shipped[i] > 0.5);
        ctx.globalAlpha = 0.7 * a; ctx.strokeStyle = yel ? '#FFCE4A' : '#F1F1F1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(s[0], s[1], s[2] + 7 + 10 * (1 - a), 0, 6.2832); ctx.stroke();
        ctx.font = NAME; ctx.letterSpacing = '0px';
        const w = ctx.measureText(text).width;
        ctx.font = TAG; ctx.letterSpacing = '2.6px';
        const tw = tag ? ctx.measureText(tag).width + 14 : 0;
        const tx = st.left && st.left[i] ? s[0] - s[2] - 20 - w - tw : s[0] + s[2] + 20;
        ctx.globalAlpha = a; ctx.fillStyle = '#000'; ctx.fillRect(tx - 6, s[1] - 17, w + tw + 12, 34);
        if (tag) { ctx.fillStyle = '#FFCE4A'; ctx.fillText(tag, tx + w + 14, s[1] + 2); }
        ctx.font = NAME; ctx.letterSpacing = '0px';
        ctx.globalAlpha = 0.92 * a; ctx.fillStyle = '#F1F1F1'; ctx.fillText(text, tx, s[1] + 1 + (1 - a) * 10);
      });
      ctx.globalAlpha = 1;
      out.hero = hero;
      return out;
    }
    return { draw };
  }

  window.Plain = { create, REACH };
})();
