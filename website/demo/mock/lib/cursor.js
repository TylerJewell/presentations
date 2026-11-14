/* The synthetic cursor and the spotlight, driven by t like everything else.
   Both live in the scene's root, in stage pixels (1920x1080). */
(function () {
  const M = window.Mock;

  /**
   * A cursor that glides between keys and ripples on clicks.
   * keys: [{ t, x, y, click?, glide? }] in time order. The cursor arrives at (x, y) at time t, having glided
   * there over `glide` seconds (default .7, never earlier than the previous key). `click: true` ripples
   * on arrival. Before the first key and after a key with `hide: true` the cursor is hidden.
   */
  M.cursor = function (parent) {
    const el = M.html(
      '<div class="mk-cursor"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 2l15 9-6.5 1.5L9.5 19z" fill="#fff" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/></svg></div>'
    );
    const rip = M.html('<div class="mk-ripple"></div>');
    parent.append(rip, el);
    return {
      el,
      at(t, keys) {
        if (!keys.length || t < keys[0].t - (keys[0].glide ?? 0.7)) { el.style.opacity = 0; rip.style.opacity = 0; return; }
        /* the cursor fades in over .3 s when it appears or reappears after a hide, and out over .25 s on a hide */
        let x = keys[0].x, y = keys[0].y, click = null;
        let vis = M.prog(t, keys[0].t - (keys[0].glide ?? 0.7), 0.3);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i], prev = keys[i - 1];
          const g = k.glide ?? 0.7;
          const s = Math.max(k.t - g, prev ? prev.t : -Infinity);
          if (t < s) break;
          const p = prev ? M.ease.glide(M.prog(t, s, k.t - s)) : 1;
          x = prev ? M.lerp(prev.x, k.x, p) : k.x;
          y = prev ? M.lerp(prev.y, k.y, p) : k.y;
          if (prev && prev.hide) vis = M.prog(t, s, 0.3);
          if (k.hide && t >= k.t) vis = 1 - M.prog(t, k.t, 0.25);
          if (k.click && t >= k.t) click = k;
        }
        const press = click ? 1 - 0.12 * M.ramp(t, click.t - 0.02, click.t + 0.16, 0.06, 0.1) : 1;
        el.style.opacity = vis.toFixed(3);
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${press.toFixed(3)})`;
        if (click && t < click.t + 0.55) {
          const p = M.prog(t, click.t, 0.55);
          rip.style.opacity = (0.9 * (1 - p)).toFixed(3);
          rip.style.transform = `translate(${click.x}px, ${click.y}px) scale(${(0.3 + 1.1 * M.ease.outCubic(p)).toFixed(3)})`;
        } else rip.style.opacity = 0;
      },
    };
  };

  /**
   * A spotlight that dims everything but one rect. keys: [{ t, rect: [x, y, w, h] | null }]. The rect
   * moves to each new key over .5 s and the dim fades over .35 s. A rect is cut off above the caption
   * when it reaches into the caption's corner, so the caption sits on the dimmed page.
   */
  M.spotlight = function (parent) {
    const el = M.html('<div class="mk-spot"></div>');
    parent.appendChild(el);
    return {
      el,
      at(t, keys) {
        let rect = null, from = null, k0 = -1;
        for (let i = 0; i < keys.length; i++) if (t >= keys[i].t) k0 = i;
        if (k0 < 0) { el.style.opacity = 0; return; }
        const k = keys[k0], prev = keys[k0 - 1];
        rect = k.rect; from = prev && prev.rect;
        let o;
        if (!rect) { o = 1 - M.prog(t, k.t, 0.35); rect = from; }
        else if (!from) o = M.prog(t, k.t, 0.35);
        else o = 1;
        if (!rect) { el.style.opacity = 0; return; }
        let r = rect;
        if (from && k.rect) {
          const p = M.ease.css(M.prog(t, k.t, 0.5));
          r = rect.map((v, i) => M.lerp(from[i], v, p));
        }
        let [x, y, w, h] = r;
        const cap = M.stageInfo && M.stageInfo.caption;
        if (cap && x < cap.x + cap.w && x + w > cap.x && y + h > cap.y - 16) h = Math.max(0, cap.y - 16 - y);
        M.set(el, { opacity: o.toFixed(3), left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
      },
    };
  };
})();
