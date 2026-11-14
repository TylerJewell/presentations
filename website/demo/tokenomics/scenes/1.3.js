/* Scene 1.3: the comparison and the cost bridge. The question, then Costs with Compare on in the console frame:
   the statement of the two periods, the camera on its total line as the change counts up. The frame steps back
   and the bridge draws on the stage from the prior period to the current one, each term counting up as it is
   named, to the cent. Then the real Use cases capture rises and the camera pushes into ticket-triage, whose cost
   nearly tripled after a model change. The statement is a mock on the canon figures; the use cases are captured. */
Tok.register({
  id: '1.3',

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = {
      cost: at('Cost'), bridge: at('bridge'), volume: at('volume'), mix: at('model'), prompt: at('prompt'), cache: at('cache'),
      response: at('response'), price: at('price'), pieces: at('pieces'), cent: at('cent'),
      one: at('One'), ticket: at('ticket'), tripled: at('tripled'), change: at('model', 40),
    };
  },

  render(root) {
    root.classList.add('t13');
    Mock.style('t13', `
      .t13 .head { left: var(--gutter); top: 140px; }
      .t13 .head .tk-h { margin-top: 18px; font-size: 52px; }
    `);
    Mock.dotGrid(root);
    this.v = Act1.frame(root, { view: 'Costs', url: Act1.URL.compare, range: 'Nov 2 to Nov 9, 2026 · against Oct 26 to Nov 2' });
    this.s = Act1.costs(this.v.page, 'compare');
    this.head = Mock.mount(root, `<div class="head"><div class="mk-eyebrow" data-k="eb">Change in cost · Nov 2 to Nov 9</div>
      <h2 class="tk-h" data-k="h">Cost rose by $104.70, from $1,080.53 to $1,185.23.</h2></div>`);
    this.bridge = Tok.bridge(root, {
      x: 160, y: 300, w: 1600, h: 490,
      from: { label: 'Prior period', value: 1080.53 },
      steps: [
        { label: 'Volume', value: 55.94 }, { label: 'Model mix', value: 7.48 }, { label: 'Prompt size', value: 13.06 },
        { label: 'Cache use', value: 17.00 }, { label: 'Response size', value: -17.86 }, { label: 'Price', value: -14.36 }, { label: 'Other', value: 43.44 },
      ],
      to: { label: 'Current period', value: 1185.23 },
    });
    this.c = Tok.capture(root, {
      states: [{ image: 'captures/usecases.png', url: 'localhost:9889/optimize/inference/use-cases' }],
      crumb: 'Optimize › Inference › Use cases', chip: false,
    });
    /* the capture's own "No use case" and Total lines are the use-case fixture's scope, not the week's statement
       shown just before, so they are covered in the table's own colour */
    this.cover = this.c.patch([312, 846, 1560, 76], '', { bg: '#161619' });
    this.question = Tok.question(root, { text: this.q });
  },

  rects() {
    if (this.R) return this.R;
    const v = this.v, tot = v.rect(this.s.total);
    this.R = { total: [tot[0] - 10, tot[1] - 8, tot[2] + 20, tot[3] + 16] };
    return this.R;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), v = this.v;
    const E = 2.8, OUT = K.bridge - 0.7, BACK = K.one - 0.5;
    this.question.at(t);

    /* the statement: in with the frame, out as the bridge is named */
    const away = M.p(t, OUT, 0.6, 'inOutCubic');
    const inP = M.rise(v.frameEl, t, E, { dy: 18 });
    v.frameEl.style.opacity = (inP * (1 - away)).toFixed(3);
    v.frameEl.style.visibility = away < 1 ? 'visible' : 'hidden';
    M.fade(v.chipEl, t, E + 0.3, 0.6);
    M.rise(this.s.root, t, E + 0.3, { dy: 10 });
    const R = t >= E + 0.9 ? this.rects() : null;
    M.countUp(this.s.chg, t, K.cost + 0.1, 1.0, 0, 104.70, (x) => Tok.money(x));
    this.s.chg.style.setProperty('--g', M.ramp(t, K.cost, OUT, 0.4, 0.4).toFixed(3));
    M.camera(v.world, t, R ? [{ t: K.cost - 0.4, rect: R.total, dur: 1.2 }, { t: OUT - 1.3, rect: null, dur: 1.2 }] : []);
    v.spot.at(t, R ? [{ t: K.cost + 0.2, rect: R.total }, { t: OUT - 1.3, rect: null }] : []);
    v.cur.at(t, []);

    /* the bridge draws on the stage, each term lit as it is named; the total lights at "the cent" */
    const gone = M.p(t, BACK, 0.6, 'inOutCubic');
    const show = (el, start) => { const o = M.rise(el, t, start); el.style.opacity = (o * (1 - gone)).toFixed(3); };
    show(this.head.eb, OUT + 0.3);
    show(this.head.h, OUT + 0.45);
    const words = [K.volume, K.mix, K.prompt, K.cache, K.response, K.price, K.pieces];
    const glow = [0, ...words.map((w, i) => M.ramp(t, w - 0.15, (words[i + 1] ?? K.cent) + 0.1, 0.3, 0.4)), 0];
    glow[0] = M.ramp(t, OUT + 0.6, K.volume, 0.3, 0.4);
    glow[8] = M.prog(t, K.cent - 0.2, 0.5) * 0.9;
    this.bridge.at(t, { start: OUT + 0.9, step: 0.78, glow });
    this.bridge.root.style.opacity = (1 - gone).toFixed(3);
    this.bridge.root.style.visibility = gone < 1 ? 'visible' : 'hidden';

    /* the use cases, captured: the camera pushes into ticket-triage */
    const ROW = [300, 726, 1590, 34];
    this.c.at(t, {
      enter: BACK + 0.3,
      cam: [{ t: K.one + 0.4, rect: [300, 724, 1340, 38], dur: 1.2 }],
      spot: [{ t: K.ticket, rect: ROW }],
      cursor: [{ t: K.tripled + 0.3, x: 1090, y: 744, glide: 0.9 }, { t: K.change + 0.2, x: 1560, y: 744 }],
    });
    this.c.frame.el.style.visibility = t >= BACK ? 'visible' : 'hidden';
    this.cover.style.opacity = this.c.frame.el.style.opacity;
    this.cover.style.visibility = this.c.frame.el.style.visibility;
  },
});
