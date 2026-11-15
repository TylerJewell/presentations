/* The chapter rail: the five questions low on the right of the frame, over every scene. The scene's `q`
   (from the timeline) is the question being answered: it glows, earlier ones carry a check, later ones
   wait. A scene with rail: false hides it (the opening and the close draw their own). The rail steps aside
   when a camera move carries the caption to the bottom right. */
(function () {
  const M = Mock;
  const GEO = { x: 950, y: 1000, w: 176, gap: 10 };
  const itemX = (i) => GEO.x + i * (GEO.w + GEO.gap);

  /** The HTML of one rail item, shared with scenes that draw the rail themselves (0.2, 8.1). */
  const item = (i, cls = '') => `<div class="fp-rail-item ${cls}" style="left:${itemX(i)}px;top:${GEO.y}px">
      <div class="d"><svg viewBox="0 0 12 12"><path d="M2.5 6.3l2.6 2.6 4.6-5.4"/></svg></div><div class="q">${Film.QUESTIONS[i]}</div></div>`;

  let layer = null, items = [];
  function ensure() {
    if (layer) return;
    layer = M.html('<div id="fp-rail"></div>');
    layer.innerHTML = Film.QUESTIONS.map((_, i) => item(i)).join('');
    document.getElementById('stage').appendChild(layer);
    items = [...layer.children];
  }

  Film.Rail = {
    GEO, itemX, item,
    at(scene, t) {
      ensure();
      if (scene.rail === false) { layer.style.opacity = 0; return; }
      const q = scene.q || 0;
      items.forEach((el, i) => { el.classList.toggle('on', i + 1 === q); el.classList.toggle('done', i + 1 < q); });
      /* aside while the caption sits on the right */
      const cap = M.stageInfo.caption, mv = M.stageInfo.captionMove;
      let right = cap && cap.zone === 'bottom-right' ? 1 : 0;
      if (mv) right = M.lerp(mv.from === 'bottom-right' ? 1 : 0, mv.to === 'bottom-right' ? 1 : 0, mv.p);
      layer.style.opacity = (1 - right).toFixed(3);
    },
  };
})();
