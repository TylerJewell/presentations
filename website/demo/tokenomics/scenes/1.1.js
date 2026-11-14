/* Scene 1.1: Cost › Overview. The question, then the Overview in the console frame: the four cards count up as
   the page fills, and each card is lit and spotlit as it is named. At "each opens the analysis behind it" the
   cursor opens the Cost to date card and the page address becomes the whole setup of the Costs analysis, which
   1.2 picks up. The Overview is a mock in the console's look, on the canon figures. */
Tok.register({
  id: '1.1',

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { cost: at('cost'), proj: at('projected'), real: at('realized'), pot: at('potential'), each: at('Each') };
  },

  render(root) {
    Mock.dotGrid(root);
    this.v = Act1.frame(root, { view: 'Overview', url: Act1.URL.overview, range: 'November 2026 · day 9 of 30' });
    this.o = Act1.overview(this.v.page);
    this.question = Tok.question(root, { text: this.q });
  },

  /** The cards' rects, measured once the frame has settled. */
  rects() {
    if (this.R) return this.R;
    const v = this.v, o = this.o;
    this.R = { cards: o.cards.map((c) => v.rect(c)), vals: o.vals.map((el) => v.rect(el)) };
    return this.R;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), v = this.v, o = this.o;
    const E = 2.8;
    this.question.at(t);
    M.rise(v.frameEl, t, E, { dy: 18 });
    M.fade(v.chipEl, t, E + 0.3, 0.6);
    o.cards.forEach((c, i) => M.rise(c, t, E + 0.25 + i * 0.08, { dy: 10 }));
    M.rise(o.att, t, E + 0.65, { dy: 10 });
    M.rise(o.qs, t, E + 0.85, { dy: 10 });
    /* the figures count up as the page fills */
    [[1524, 0], [5080, 0], [1006, 0], [77.4, 2]].forEach(([n, d], i) => M.countUp(o.vals[i], t, E + 0.45 + i * 0.08, 1.0, 0, n, (x) => Tok.money(x, d)));

    /* each card lights as it is named; the value steps forward */
    const named = [K.cost, K.proj, K.real, K.pot, K.each - 0.3];
    o.cards.forEach((c, i) => {
      const g = M.ramp(t, named[i] - 0.1, named[i + 1] + 0.1, 0.3, 0.4);
      Tok.glow(c, g);
      o.vals[i].style.transform = `scale(${(1 + 0.08 * g).toFixed(3)})`;
    });

    const settled = t >= E + 0.9;
    const R = settled ? this.rects() : null;
    const click = K.each + 1.3;
    v.url(t >= click + 0.1 ? Act1.URL.useCase : Act1.URL.overview);
    /* the address pill grows with the setup it carries, so its rect is measured once the new address is in it */
    if (R && t >= click + 0.1 && !R.url) { const [ux, uy, uw, uh] = v.rect(v.urlEl); R.url = [ux - 6, uy - 6, uw + 12, uh + 12]; }
    const spot = R ? [
      { t: K.cost, rect: R.cards[0] }, { t: K.proj, rect: R.cards[1] }, { t: K.real, rect: R.cards[2] }, { t: K.pot, rect: R.cards[3] },
      { t: K.each - 0.3, rect: null }, ...(R.url ? [{ t: click + 0.6, rect: R.url }] : []),
    ] : [];
    v.spot.at(t, spot);

    /* the cursor opens the first card; the address carries the analysis it opens */
    const cur = R ? [
      { t: K.each + 0.5, x: R.vals[0][0] + R.vals[0][2] * 0.5, y: R.vals[0][1] + R.vals[0][3] * 0.6, glide: 0.8 },
      { t: click, x: R.vals[0][0] + R.vals[0][2] * 0.5, y: R.vals[0][1] + R.vals[0][3] * 0.6, click: true },
      ...(R.url ? [{ t: click + 1.6, x: R.url[0] + R.url[2] - 40, y: R.url[1] + R.url[3] * 0.5, glide: 0.9 }] : []),
    ] : [];
    v.cur.at(t, cur);
    v.urlEl.style.setProperty('--g', M.prog(t, click + 0.3, 0.6).toFixed(3));
    Tok.glow(o.cards[0], Math.max(parseFloat(o.cards[0].style.getPropertyValue('--g')) || 0, M.ramp(t, K.each + 0.6, click + 1.4, 0.3, 0.5)));
    M.camera(v.world, t, []);
  },
});
