/* Scene 1.2: Cost › Costs. The question, then the analysis grouped by use case in the console frame. As the
   groupings are named the cursor opens Group by and the view becomes the model-by-team matrix. The camera
   pushes into the page address, which holds the whole setup, and comes back for the "Usage not costed" line
   under the total. Both views are mocks in the console's look, on the canon figures. */
Tok.register({
  id: '1.2',

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { use: at('use'), model: at('model'), tag: at('tag'), whole: at('whole'), bookmark: at('bookmark'), usage: at('usage'), footnoted: at('footnoted') };
  },

  render(root) {
    Mock.dotGrid(root);
    this.v = Act1.frame(root, { view: 'Costs', url: Act1.URL.useCase, range: 'Nov 2 to Nov 9, 2026' });
    this.a = Act1.costs(this.v.page, 'useCase');
    this.b = Act1.costs(this.v.page, 'matrix');
    this.question = Tok.question(root, { text: this.q });
  },

  rects() {
    if (this.R) return this.R;
    const v = this.v;
    const u = (r, pad) => [r[0] - pad, r[1] - pad, r[2] + 2 * pad, r[3] + 2 * pad];
    const by = v.rect(this.b.by), then = v.rect(this.b.then);
    const nc = v.rect(this.b.nc), fn = v.rect(this.b.fn);
    this.R = {
      by, bar: u([by[0], Math.min(by[1], then[1]), then[0] + then[2] - by[0], Math.max(by[3], then[3])], 10),
      url: u(v.rect(v.urlEl), 6),
      nc: u([Math.min(nc[0], fn[0]), nc[1], Math.max(nc[0] + nc[2], fn[0] + fn[2]) - Math.min(nc[0], fn[0]), fn[1] + fn[3] - nc[1]], 8),
    };
    return this.R;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), v = this.v;
    const E = 2.8, SWAP = K.model + 0.2;
    this.question.at(t);
    M.rise(v.frameEl, t, E, { dy: 18 });
    M.fade(v.chipEl, t, E + 0.3, 0.6);
    /* by use case, then the matrix */
    const p = M.ease.css(M.prog(t, SWAP, 0.5));
    M.rise(this.a.root, t, E + 0.3, { dy: 10, opacity: 1 - p });
    this.b.root.style.opacity = p.toFixed(3);
    this.b.root.style.visibility = p > 0 ? 'visible' : 'hidden';
    v.url(t >= SWAP ? Act1.URL.matrix : Act1.URL.useCase);

    const settled = t >= E + 0.9;
    const R = settled ? this.rects() : null;
    const glowBy = M.ramp(t, K.use - 0.2, K.tag + 1.2, 0.3, 0.4);
    [this.a.by, this.b.by, this.a.then, this.b.then].forEach((el) => el.style.setProperty('--g', glowBy.toFixed(3)));
    v.cur.at(t, R ? [
      { t: K.use + 0.4, x: R.by[0] + R.by[2] * 0.6, y: R.by[1] + R.by[3] * 0.55, glide: 0.8 },
      { t: K.model, x: R.by[0] + R.by[2] * 0.6, y: R.by[1] + R.by[3] * 0.55, click: true },
      { t: K.tag + 1.0, x: R.by[0] + R.by[2] * 0.6, y: R.by[1] + R.by[3] * 0.55 + 40, hide: true },
    ] : []);
    v.spot.at(t, R ? [
      { t: K.use, rect: R.bar }, { t: K.tag + 1.1, rect: null },
      { t: K.usage + 0.1, rect: R.nc },
    ] : []);
    /* the address is the subject while the setup and the bookmark are spoken */
    v.urlEl.style.setProperty('--g', M.ramp(t, K.whole + 0.2, K.usage - 0.3, 0.5, 0.6).toFixed(3));
    M.camera(v.world, t, R ? [
      { t: K.whole - 0.3, rect: R.url, dur: 1.2 },
      { t: K.usage - 1.4, rect: null, dur: 1.2 },
    ] : []);
  },
});
