/* Scene 1.1: a proposal comes in. The panel's dashboard, Submit Review tab. The cursor opens the scenario
   list, picks Managed Services, the proposal text fills the box, the cursor presses Submit for Review, and
   the review's identifier is lit while it is spoken about. */
Film.register({
  id: '1.1',

  /* the panel sits at (76, 296) on the stage: the app frame's main area plus the panel's offset */
  PX: 76, PY: 296,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { open: 1.6, pick: 2.9, fill: 3.1, press: Math.max(at('presses'), 7.0), id: at('identifier') };
  },

  render(root) {
    const M = Mock, R = Film.REVIEW;
    root.classList.add('s11');
    M.style('s11', `
      .s11 .panel { left: 36px; top: 96px; width: 900px; height: 500px; }
      .s11 .panel > * { position: absolute; }
      .s11 .ct { left: 28px; top: 22px; font: 600 22px/1 var(--sans); }
      .s11 .idrow { left: 28px; top: 60px; display: flex; align-items: center; gap: 18px; }
      .s11 .idrow .mono { --g: 0; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); font-size: 20px; }
      .s11 .idrow .btn { height: 36px; padding: 0 12px; font-size: 16px; }
      .s11 .l1 { left: 28px; top: 112px; } .s11 .l2 { left: 28px; top: 206px; }
      .s11 .sel { left: 28px; top: 136px; width: 844px; height: 48px; display: flex; align-items: center; justify-content: space-between; margin: 0; }
      .s11 .sel .ph { color: var(--c-muted); }
      .s11 .sel .ch { color: var(--c-muted); font-size: 14px; }
      .s11 .dd { left: 28px; top: 184px; width: 844px; background: var(--c-surface-2); border: 1px solid var(--c-line); border-radius: 8px; box-shadow: 0 18px 50px rgba(0,0,0,.6); z-index: 3; padding: 6px; }
      .s11 .dd div { padding: 11px 14px; border-radius: 6px; font: 500 18px/1.2 var(--sans); color: var(--c-text); }
      .s11 .dd div.on { background: var(--c-gold-bg); }
      .s11 .ta { left: 28px; top: 230px; width: 844px; height: 180px; margin: 0; white-space: pre-wrap; overflow: hidden; line-height: 1.45;
        -webkit-mask-image: linear-gradient(#000 78%, transparent 97%); mask-image: linear-gradient(#000 78%, transparent 97%); }
      .s11 .ta .ph { color: var(--c-muted); }
      .s11 .submit { left: 28px; top: 430px; width: 200px; }
      .s11 .banner { left: 252px; top: 430px; height: 46px; display: flex; align-items: center; gap: 14px; padding: 0 16px; border-radius: 9px;
        border: 1px solid rgba(114,211,91,.35); background: rgba(114,211,91,.08); font: 500 18px/1 var(--sans); }
      .s11 .banner .mono { font-size: 17px; }
    `);
    this.app = Film.app(root, { tab: 'Submit Review' });
    Film.note(root);
    const page = this.app.page;
    this.r = M.mount(page, `<div class="ttl" style="left:36px;top:28px" data-k="ttl">Submit a proposal for review</div>`);
    M.mount(page, `<div class="sub" style="left:36px;top:66px">Paste a proposal or choose a demo scenario; all four personas review it.</div>`);
    this.p = M.mount(page, `<div class="panel panel" data-k="panel">
      <div class="ct">New review</div>
      <div class="idrow" data-k="idrow"><span class="lbl">Review ID</span><span class="mono" data-k="id">${R.id}</span><span class="btn ghost">↻</span></div>
      <div class="lbl l1">Demo scenario</div>
      <div class="field sel" data-k="sel"><span data-k="selv" class="ph">Choose a predefined proposal</span><span class="ch">▼</span></div>
      <div class="lbl l2">Proposal text</div>
      <div class="field ta" data-k="ta"><span class="ph" data-k="taph">Paste the proposal text here, or choose a demo scenario above.</span><span data-k="tatext"></span></div>
      <div class="btn submit" data-k="submit">Submit for Review</div>
      <div class="banner" data-k="banner">${Film.chip('Submitted')}<span>Review <span class="mono" data-k="bid">${R.id}</span> started and is in Active Reviews.</span></div>
      <div class="dd" data-k="dd">
        <div class="on">Managed Services Proposal (commercial focus)</div><div>SAP Implementation Project (technical focus)</div>
        <div>Product License Renewal (hybrid)</div><div>Warning: Injection Attempt (governance demo)</div><div>Warning: Contains PII (sanitizer demo)</div></div>
    </div>`);
    this.cursor = M.cursor(root);
    this.spot = M.spotlight(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), p = this.p, R = Film.REVIEW;
    const X = this.PX, Y = this.PY;
    M.rise(this.app.el, t, 0.0, { dy: 12 });
    /* the scenario list opens on the first click and closes on the pick */
    const open = t >= K.open && t < K.pick;
    p.dd.style.opacity = open ? M.prog(t, K.open, 0.15) : 0;
    p.dd.style.display = open ? 'block' : 'none';
    const picked = t >= K.pick;
    p.selv.textContent = picked ? R.scenario : 'Choose a predefined proposal';
    p.selv.classList.toggle('ph', !picked);
    /* the text fills the box */
    const n = Math.floor(R.text.length * M.p(t, K.fill, 2.0, 'outCubic'));
    p.taph.style.display = n > 0 ? 'none' : '';
    const s = R.text.slice(0, n);
    if (p.tatext.textContent !== s) p.tatext.textContent = s;
    /* submitted */
    const sub = t >= K.press + 0.25;
    M.rise(p.banner, t, K.press + 0.25, { dy: 6 });
    p.banner.style.display = sub ? 'flex' : 'none';
    p.submit.style.opacity = sub ? 0.55 : 1;
    p.id.style.setProperty('--g', M.ramp(t, K.id - 0.2, K.id + 3.6, 0.3, 0.6).toFixed(3));

    this.cursor.at(t, [
      { t: 1.0, x: 760, y: 560 },
      { t: K.open, x: 540, y: Y + 160, click: true },
      { t: K.pick, x: 330, y: Y + 211, click: true },
      { t: K.press - 0.1, x: X + 120, y: Y + 452, click: true, glide: 0.9 },
      { t: K.press + 1.4, x: X + 420, y: Y + 330 },
    ]);
    this.spot.at(t, [
      { t: K.id - 0.2, rect: [X + 16, Y + 48, 470, 56] },
      { t: K.id + 3.6, rect: null },
    ]);
  },
});
