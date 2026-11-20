// Variant A: flat 2D field. A grid of 48 px dots in a layer scaled by one CSS transform; the screen-space
// dot size is held by a variable so the dots do not swell with the scale.
(() => {
  const stage = document.getElementById("stage");
  const layer = document.createElement("div"); layer.id = "layer"; stage.appendChild(layer);
  const rnd = mulberry32(7);
  const labelAt = new Set(LABELS.map((l) => `${l.x / 48},${l.y / 48}`));
  const dots = [];
  for (let j = -12; j <= 12; j++) for (let i = -21; i <= 21; i++) {
    const el = document.createElement("div"); el.className = "dot";
    el.style.left = i * 48 + "px"; el.style.top = j * 48 + "px";
    layer.appendChild(el);
    const first = i === 0 && j === 0;
    const b = first || labelAt.has(`${i},${j}`) ? 1 : brightness(rnd);
    dots.push({ el, x: i * 48, y: j * 48, b, first, rn: radial(i * 48, j * 48), last: "" });
  }
  const band = document.createElement("div"); band.id = "band"; stage.appendChild(band);
  const scrim = document.createElement("div"); scrim.id = "scrim"; stage.appendChild(scrim);
  const labels = LABELS.map((l) => { const el = document.createElement("div"); el.className = "label"; el.textContent = l.text; stage.appendChild(el); return el; });
  const word = document.createElement("div"); word.id = "word";
  word.innerHTML = 'ide<span class="ai">AI</span>tion'; stage.appendChild(word);

  window.at = (t) => {
    const e = inOutCubic(prog(t, T.pull[0], T.pull[1]));
    const s = Math.pow(ZOOM, 1 - e);
    layer.style.transform = `scale(${s})`;
    const r = lerp(12, 1.8, e);
    layer.style.setProperty("--d", (2 * r) / s + "px");
    const front = waveFront(t, inOutSine);
    for (const d of dots) {
      const L = lit(d.x, front);
      const rv = d.first ? 1 : reveal(t, d.rn, inOutQuad);
      const a = lerp(d.b * rv, litAlpha(d.b), L);
      const col = d.first && L === 0 ? "255,255,255" : YELLOW.join(",");
      const key = a.toFixed(3) + col;
      if (key !== d.last) { d.el.style.background = `rgba(${col},${a.toFixed(3)})`; d.last = key; }
    }
    band.style.left = W / 2 + front - 210 + "px";
    band.style.opacity = prog(t, T.wave[0], T.wave[0] + 0.2) * (1 - prog(t, T.wave[1] - 0.2, T.wave[1]));
    // Labels ride with their point.
    LABELS.forEach((l, i) => {
      const k = inOutQuad(prog(t, labelStart(i), labelStart(i) + 0.8));
      const el = labels[i];
      el.style.left = W / 2 + l.x * s + 16 + "px";
      el.style.top = H / 2 + l.y * s - 11 + (1 - k) * 14 + "px";
      el.style.opacity = 0.7 * k * (1 - prog(t, 6.8, 7.4));
    });
    scrim.style.opacity = wordAmount(t) * 0.92;
    const k = inOutQuad(prog(t, T.word[0], T.word[1]));
    word.style.opacity = k * (1 - prog(t, T.fadeOut[0], T.fadeOut[1]));
    word.style.transform = `translateY(${(1 - k) * 24}px)`;
  };
  window.at(0);
})();
