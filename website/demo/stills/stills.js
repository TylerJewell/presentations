/* One home-page still: a real console screenshot filling the whole 2560x1440 image, with a spotlight on the
   subject and yellow callouts. A still's page sets window.STILL and loads this file. The screenshot is pushed
   in only slightly (fullScale, at most 1.15) so the console stays as sharp as the screenshot itself.

   window.STILL = {
     title,                               // the page title only; nothing is written on the image
     src: 'src/<id>-2560.webp',           // a tour screenshot
     srcSize: [w, h],                     // its size, when not 2560x1440
     fullScale: 1.12,                     // the push-in
     fullCrop: [x, y],                    // optional: the screenshot pixel at the image's top-left corner;
                                          // without it the crop centres on spot
     spot: [x, y, w, h] | null,           // the subject, in screenshot pixels; the rest dims
     callouts: [{ at: [x, y], text, side: 'left'|'right'|'top'|'bottom' }],   // screenshot pixels
     overlay(layer, toWin) {}             // optional: draw into a layer above the screenshot; toWin maps
                                          // screenshot pixels to window pixels
   }; */
(function () {
  const S = window.STILL;
  /* Full bleed: the screenshot is the whole image, with no text and no window frame. The crop centres on the
     subject unless the still sets fullCrop, and stays inside the screenshot. */
  const [SW, SH] = S.srcSize || [2560, 1440];
  const scale = S.fullScale || 1.12;
  const vw = 2560 / scale, vh = 1440 / scale;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const centre = S.spot ? [S.spot[0] + S.spot[2] / 2, S.spot[1] + S.spot[3] / 2] : [SW / 2, SH / 2];
  S.crop = S.fullCrop || [clamp(centre[0] - vw / 2, 0, SW - vw), clamp(centre[1] - vh / 2, 0, SH - vh)];
  S.tilt = 0;
  const [wx, wy, ww, wh] = [0, 0, 2560, 1440];
  const toWin = (x, y) => [(x - S.crop[0]) * scale, (y - S.crop[1]) * scale];
  const css = (el, o) => Object.assign(el.style, o);
  const el = (tag, cls, parent, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; (parent || document.body).appendChild(e); return e; };

  const stage = el('div', 'stage', document.getElementById('root'));
  const persp = el('div', 'persp', stage);
  const win = el('div', 'win', persp);
  css(win, { left: wx + 'px', top: wy + 'px', width: ww + 'px', height: wh + 'px',
    transform: S.tilt ? `rotateY(${S.tilt}deg)` : 'none', transformOrigin: S.tilt > 0 ? 'left center' : 'right center' });
  const shot = el('div', 'shot', win);
  css(shot, { backgroundImage: `url(${S.src})`, backgroundSize: `${SW * scale}px ${SH * scale}px`,
    backgroundPosition: `${-S.crop[0] * scale}px ${-S.crop[1] * scale}px` });

  if (S.spot) {
    const [x, y] = toWin(S.spot[0], S.spot[1]), w = S.spot[2] * scale, h = S.spot[3] * scale;
    const dim = el('div', 'dim', win);
    css(dim, { clipPath: `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${x}px ${y}px, ${x}px ${y + h}px, ${x + w}px ${y + h}px, ${x + w}px ${y}px, ${x}px ${y}px)` });
    const ring = el('div', 'ring', win);
    css(ring, { left: x - 10 + 'px', top: y - 10 + 'px', width: w + 20 + 'px', height: h + 20 + 'px' });
  }

  const layer = el('div', 'layer', win);
  if (S.overlay) S.overlay(layer, toWin);

  (S.callouts || []).forEach((c) => {
    const [x, y] = toWin(c.at[0], c.at[1]);
    const side = c.side || 'right';
    const co = el('div', 'callout ' + side, win, `<i></i><span>${c.text}</span>`);
    css(co, { left: x + 'px', top: y + 'px' });
  });

  document.title = S.title.replace(/<[^>]+>/g, '');
})();
