/* The caption: a designed lower third in the site's language. An eyebrow names the act ("Govern"), a hairline rule separates it from the line, and the line is Instrument Sans at a calm
   size on a soft, blurred backdrop. A long narration is shown a sentence at a time (short sentences
   share a line), each timed by its share of the words. Under a chapter card the caption waits for the
   card to go.

   A film that sets window.MOCK_FILM.headlines shows a headline in place of the narration: the lower third
   carries the scene's `headline`, one complete sentence in larger type, for the whole scene, and a scene
   with no `headline` has no lower third because it carries its own title. The narration is then spoken and
   written to the caption file, and is not drawn. Scenes time what they show to the narration's words either
   way (wordTime, captionAt).

   Each scene declares the zone the caption owns (captionZone); M.ZONES gives the rect the scene must keep
   empty. A camera move can carry the caption to another zone (see lib/camera.js). */
(function () {
  const M = window.Mock;
  const W = 1920, H = 1080, PW = 820, MARGIN = 72, BOTTOM = 48;

  /** The rect, in stage px, that each zone guarantees to the caption. Keep the scene's content out of it. */
  M.ZONES = {
    'bottom-left': { x: 0, y: 836, w: PW + MARGIN + 40, h: H - 836, left: MARGIN },
    'bottom-right': { x: W - (PW + MARGIN + 40), y: 836, w: PW + MARGIN + 40, h: H - 836, left: W - MARGIN - PW },
    'bottom': { x: (W - PW) / 2 - 40, y: 836, w: PW + 80, h: H - 836, left: (W - PW) / 2 },
  };
  M.ZONES.left = M.ZONES['bottom-left'];

  /**
   * Splits narration into caption lines at sentence ends only, so every line starts a sentence. Consecutive
   * sentences share a line while together they are at most `max` characters; a longer sentence is one line
   * that wraps.
   */
  M.splitCaption = function (text, max = 96) {
    const parts = text.split(/(?<=[.!?])\s+/);
    const out = [];
    parts.forEach((p) => {
      const last = out[out.length - 1];
      if (last && (last + ' ' + p).length <= max) out[out.length - 1] = last + ' ' + p;
      else out.push(p);
    });
    return out;
  };

  /**
   * The span of scene-local real time over which the caption reads the narration: from 0.35 s after the
   * card to 0.6 s before the scene ends, or, with voice timing, exactly the narration clip.
   */
  M.captionWindow = function (s) {
    const t0 = (s.cardDur || 0) + 0.35;
    return [t0, s.clip != null ? t0 + s.clip : (s.len || s.duration) - 0.6];
  };

  /**
   * Scene-local real time at which the caption reaches word index `i` of `n`. A voiced scene whose film
   * declares window.MOCK_PACING.marks[id] (each sentence as [first word, speech start, speech end], in clip
   * seconds) follows its sentences, so words land where the paced clip says them; every other scene shares the
   * window evenly across its words.
   */
  M.wordTime = function (s, i, n) {
    const [t0, t1] = M.captionWindow(s);
    const marks = s.clip != null && window.MOCK_PACING && window.MOCK_PACING.marks && window.MOCK_PACING.marks[s.id];
    if (!marks) return t0 + ((t1 - t0) * i) / n;
    if (i >= n) return t1;
    let k = marks.length - 1;
    while (marks[k][0] > i) k--;
    const [w, a, b] = marks[k], end = k + 1 < marks.length ? marks[k + 1][0] : n;
    return t0 + a + ((b - a) * (i - w)) / (end - w);
  };

  /**
   * The scene time (from the end of its chapter card) at which the caption reaches the first word that
   * starts with `word` at or after word index `from`, on the same word-share clock the caption lines use.
   * Scenes key what they highlight to this, so a highlight lands while its words are being read.
   */
  M.captionAt = function (s, word, from = 0) {
    const words = s.caption.split(/\s+/);
    let i = words.findIndex((w, k) => k >= from && w.replace(/^\W+/, '').startsWith(word));
    if (i < 0) i = words.length;
    const c = s.cardDur || 0;
    /* in the scene's designed time, which a voiced scene stretches by warp */
    return (M.wordTime(s, i, words.length) - c) / (s.warp || 1);
  };

  M.Caption = {
    build(stage) {
      this.r = M.mount(stage, `
        <div id="caption"><div class="scrim"></div><div class="panel" data-k="panel">
          <div class="eb" data-k="eb"></div><div class="rule" data-k="rule"></div><div class="lines" data-k="lines"></div>
        </div></div>`);
    },

    enter(s, act) {
      const r = this.r;
      const zone = s.captionZone || s.captionPosition || 'bottom-left';
      this.zone = zone;
      r.eb.textContent = (act && act.label) || '';
      r.lines.innerHTML = '';
      const headlines = !!(window.MOCK_FILM && window.MOCK_FILM.headlines);
      this.off = headlines && !s.headline;
      r.root.classList.toggle('headline', headlines);
      r.root.style.display = this.off ? 'none' : '';
      if (this.off) { this.lines = []; return; }
      const chunks = headlines ? [s.headline] : M.splitCaption(s.caption);
      const words = chunks.map((c) => c.split(/\s+/).length), total = words.reduce((a, b) => a + b, 0);
      let acc = 0;
      this.lines = chunks.map((c, i) => {
        const el = document.createElement('div');
        el.className = 'ln';
        el.textContent = c;
        r.lines.appendChild(el);
        const a = headlines ? (s.cardDur || 0) + 0.35 : M.wordTime(s, acc, total);
        acc += words[i];
        return { el, a };
      });
      /* a sentence that would wrap to four rows sets smaller on a wider panel, so the panel stays in its zone */
      const tallest = () => Math.max(...this.lines.map((l) => l.el.offsetHeight));
      r.root.classList.remove('long');
      this.long = tallest() > 3.5 * 26 * 1.36;
      r.root.classList.toggle('long', this.long);
      r.lines.style.height = tallest() + 'px';
      this.place(zone, zone, 1);
      const p = r.panel;
      M.stageInfo.caption = Object.assign({}, M.ZONES[zone], { zone, panel: { x: p.offsetLeft, y: p.offsetTop, w: p.offsetWidth, h: p.offsetHeight } });
    },

    place(from, to, p) {
      const a = M.ZONES[from] || M.ZONES['bottom-left'], b = M.ZONES[to] || a;
      /* the wider panel of a long line grows away from the stage's edge */
      const grow = (z) => (this.long ? (z === M.ZONES['bottom-right'] ? 40 : z === M.ZONES.bottom ? 20 : 0) : 0);
      this.r.panel.style.left = M.lerp(a.left - grow(a), b.left - grow(b), p).toFixed(1) + 'px';
      this.r.root.classList.toggle('right', (p < 0.5 ? from : to) === 'bottom-right');
    },

    at(local, s) {
      if (this.off) return;
      const r = this.r;
      const c = s.cardDur || 0;
      const inP = M.p(local, c + 0.25, 0.7), outP = M.p(local, (s.len || s.duration) - 0.5, 0.4, 'inOutCubic');
      r.panel.style.opacity = (M.ease.css(M.prog(local, c + 0.25, 0.5)) * (1 - outP)).toFixed(3);
      r.panel.style.transform = `translateY(${((1 - inP) * 18 + outP * 8).toFixed(1)}px)`;
      r.root.querySelector('.scrim').style.opacity = (M.prog(local, c + 0.1, 0.8) * (1 - outP)).toFixed(3);
      r.rule.style.transform = `scaleX(${M.p(local, c + 0.45, 0.8, 'outCubic').toFixed(3)})`;
      /* a line hands over to the next with a short overlap, so the panel is never empty between lines */
      this.lines.forEach((l, i) => {
        const next = this.lines[i + 1];
        const a0 = i ? l.a - 0.12 : l.a + 0.15;
        const li = M.p(local, a0, 0.55);
        const lo = next ? M.p(local, next.a - 0.3, 0.3, 'inOutCubic') : 0;
        l.el.style.opacity = (M.ease.css(M.prog(local, a0, 0.45)) * (1 - lo)).toFixed(3);
        l.el.style.transform = `translateY(${((1 - li) * 14 - lo * 10).toFixed(1)}px)`;
      });
      const mv = M.stageInfo.captionMove;
      if (mv) this.place(mv.from, mv.to, mv.p);
      else this.place(this.zone, this.zone, 1);
    },
  };
})();
