/* Every country adds its own rules. One AI-assisted credit decline sits in the center, drawn as a deck
   card, and the ring of ten country labels rises around it. On the next click each country's requirement
   for that decision appears under its name, in two waves around the ring, each label glowing briefly as
   it arrives and settling, so the hold shows all ten at one weight. On the last click the card clears and
   one line forms in its place. Requirements and their sources: data/countries.js (report §1, the
   ten-market table). The application and the lender are illustrative. */
registerSlide({
  id: 'ten-countries',
  act: 'problems',
  title: 'Every country adds its own rules',
  beats: [
    { t: 2.6, say: "Here is one decision: an AI-assisted credit decline. The model recommended declining the application, and it was declined. Now say the lender operates in ten countries. Each of them has its own rules for this one decision." },
    { t: 7.0, say: "Germany gives the applicant the right to contest the decision, and to an explanation. In France, the works council has to be consulted before the tool is rolled out, and courts have suspended rollouts, pilots included, until it was. In China, the applicant can refuse a fully automated decision, and the data stays in China. Brazil gives the applicant a review, and the law allows a machine to perform it. And in the United States, from January, California's rules call for an appeal to someone with the authority to change the outcome." },
    { t: 9.2, say: "One decision, ten countries, ten different requirements. And one system has to meet all of them at once." },
  ],

  /* the two waves: the right half of the ring, then the left, each in ring order */
  WAVES: [['de', 'fr', 'kr', 'cn', 'vn'], ['sg', 'br', 'us', 'ca', 'uk']],
  /* labels whose requirement wraps to two lines, so that neighbours on the ring keep clear of each other */
  WRAP: ['kr', 'sg'],
  RING: { cx: 960, cy: 560, rx: 632, ry: 297 },

  render(root) {
    const M = Mock;
    root.classList.add('sl-ten');
    M.style('sl-ten', `
      .sl-ten .tk-ring .rl .s { white-space: nowrap; }
      .sl-ten .tk-ring .rl.wrap .s { white-space: normal; width: max-content; max-width: 300px; text-wrap: balance; }
      .sl-ten .tk-ring .rl .w { font-size: 24px; padding: 8px 14px; }
      .sl-ten .cd { left: 600px; top: 395px; width: 720px; height: 330px; box-sizing: border-box; padding: 38px 44px 0; }
      .sl-ten .cd .hd { display: flex; align-items: center; justify-content: space-between; }
      .sl-ten .cd .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-ten .cd .amt { margin-top: 18px; font: 700 52px/1.05 var(--sans); letter-spacing: -.02em; color: var(--ink); }
      .sl-ten .cd .rec { margin-top: 30px; padding-top: 28px; border-top: 2px solid var(--line-2); }
      .sl-ten .cd .tx { margin-top: 14px; font: 500 34px/1.25 var(--sans); color: var(--ink); }
      .sl-ten .cv { left: 540px; top: 395px; width: 840px; height: 330px; display: flex; align-items: center; justify-content: center; text-align: center; }
      .sl-ten .cv .tk-h { font-size: 58px; line-height: 1.1; }
      .sl-ten .src { left: var(--gut); right: var(--gut); top: 970px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Every country adds <span class="tk-y">its own rules.</span>']);
    this.card = M.mount(root, `<div class="cd tk-card">
      <div class="hd"><span class="k">Credit application</span><span class="tk-chip bad">Declined</span></div>
      <div class="amt">€18,000 personal loan</div>
      <div class="rec"><div class="k">AI recommendation</div><div class="tx">Decline. Debt-to-income is too high.</div></div></div>`).root;
    this.ring = Talk.ring(root, Object.assign({ sub: true }, this.RING));
    this.ring.labels.forEach((l) => l.el.classList.toggle('wrap', this.WRAP.includes(l.c.id)));
    this.cv = Talk.lines(root.appendChild(M.html('<div class="cv"></div>')),
      ['One decision,', 'ten countries,', '<span class="tk-y">ten different requirements.</span>']);
    this.src = M.mount(root, `<div class="src tk-src">${window.V2_COUNTRY_SOURCES} The application and the lender are illustrative.</div>`).root;
    /* each label's wave and its place in the wave */
    this.where = {};
    this.WAVES.forEach((ids, w) => ids.forEach((id, k) => { this.where[id] = [w, k]; }));
  },

  at(t) {
    const M = Mock, B = this.beats.map((b) => b.t);
    /* the waves start just after the first hold, the second 1.65 s after the first; the line after the second hold */
    const ws = [B[0] + 0.15, B[0] + 1.8], line = B[1] + 0.15;
    const start = (i) => { const [w, k] = this.where[this.ring.labels[i].c.id]; return ws[w] + 0.2 * k; };
    Talk.linesAt(this.head, t, 0.1);
    /* the card steps back while the requirements arrive, then clears for the line */
    M.rise(this.card, t, 0.5);
    if (t >= ws[0]) {
      const out = M.p(t, line + 0.1, 0.6, 'inOutCubic');
      this.card.style.opacity = ((1 - 0.3 * M.p(t, ws[0], 0.6, 'inOutCubic')) * (1 - out)).toFixed(3);
      this.card.style.transform = out ? `translateY(${(-12 * out).toFixed(2)}px)` : 'none';
    }
    Talk.ringAt(this.ring, t, {
      start: 1.0, gap: 0.08,
      lit: (i) => { const s = start(i); return M.p(t, s, 0.5) * (1 - M.p(t, s + 1.0, 0.6, 'inOutCubic')); },
      sub: (i) => M.p(t, start(i) + 0.1, 0.6),
      dim: 0.8 * M.p(t, line, 0.8, 'inOutCubic'),
    });
    Talk.linesAt(this.cv, t, line + 0.6, 0.16);
    M.fade(this.src, t, 1.2, 0.6);
  },
});
