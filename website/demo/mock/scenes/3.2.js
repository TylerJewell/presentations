/* Scene 3.2: Console: the Controls board, in force. The board (lib/controls-board.js) opens on v3 in
   force; the camera visits the loop, the readiness board and the contract's rows, and the cursor points
   at three bound targets while a popover names where in the code each was read. */
registerScene({
  id: '3.2',
  act: 3,
  title: "Console: the Controls board, in force",
  duration: 16,
  captionZone: 'bottom-right',
  caption: "Here is the system's contract with its regulators: the controls it committed to, signed, and bound to the exact code that enforces them.",

  /* the three bound targets the cursor points at, with where each is read from */
  HOVER: [
    { t: 8.4, row: 0, src: 'EligibilityAssessorAgent.java:31', kind: 'Agent' },
    { t: 10.0, row: 1, src: 'prompts/eligibility-assessor/system.md', kind: 'Prompt · v12' },
    { t: 11.6, row: 2, src: 'AdverseActionGuardrail.java:18', kind: 'Guardrail' },
  ],

  render(root) {
    root.classList.add('s32');
    Mock.style('s32', `
      .s32 .pop { left: 0; top: 0; padding: 9px 12px 10px; border-radius: 10px; background: #1f1f24; box-shadow: 0 0 0 1px rgba(236,236,241,.16), 0 16px 40px rgba(0,0,0,.6);
        font: 13px/1.35 var(--sans); color: var(--c-text); white-space: nowrap; opacity: 0; z-index: 22; }
      .s32 .pop .k { font: 600 10.5px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--c-faint); margin-bottom: 6px; }
      .s32 .pop .s { font: 500 12.5px var(--mono); color: var(--c-gold-text); }
      .s32 .pop .d { font-size: 12px; color: var(--c-muted); margin-top: 4px; }
      .s32 .ring { left: 0; top: 0; border-radius: 7px; box-shadow: 0 0 0 2px var(--c-gold), 0 0 18px rgba(201,162,39,.55); opacity: 0; z-index: 21; }
    `);
    this.b = S3Board.build(root);
    this.pop = Mock.mount(this.b.world, `<div class="pop"><div class="k" data-k="k"></div><div class="s" data-k="s"></div><div class="d">AI-BOM <span>60b8e667</span> · bound since v3</div></div>`);
    this.ring = Mock.html('<div class="ring"></div>');
    this.b.world.appendChild(this.ring);
    this.cursor = Mock.cursor(this.b.world);
  },

  at(t) {
    const M = Mock, b = this.b;
    b.at(t + S3Board.OFFSET['3.2'], t);

    /* the bound-to chips of the three rows, measured once */
    if (!this.chips) this.chips = this.HOVER.map((h) => b.rectOf(b.base[h.row].tg.querySelector('.tgt')));
    const col = this.chips[0];

    M.camera(b.world, t, [
      { t: 0.7, rect: b.P(0, 0, 532, 300), dur: 1.2 },
      { t: 3.6, rect: b.rect('ready'), dur: 1.2 },
      { t: 6.8, rect: b.P(252, 312, 1104, 130), dur: 1.2 },
      { t: 13.4, rect: null, dur: 1.3 },
    ]);

    /* the cursor visits each bound target; a popover names where in the code it was read */
    const keys = [{ t: 7.9, x: col[0] + 60, y: col[1] + 60, glide: 0.8 }];
    this.HOVER.forEach((h, i) => { const c = this.chips[i]; keys.push({ t: h.t, x: c[0] + c[2] * 0.55, y: c[1] + c[3] * 0.6 }); });
    keys.push({ t: 13.2, x: col[0] + 260, y: col[1] + 140, glide: 0.8, hide: true });
    this.cursor.at(t, keys);
    let k = -1;
    this.HOVER.forEach((h, i) => { if (t >= h.t) k = i; });
    const vis = k >= 0 ? M.ramp(t, this.HOVER[k].t - 0.05, (this.HOVER[k + 1] ? this.HOVER[k + 1].t - 0.1 : 13.0), 0.2, 0.2) : 0;
    if (k >= 0) {
      const h = this.HOVER[k], c = this.chips[k];
      if (this.pop.k._t !== h.kind) { this.pop.k.textContent = h.kind; this.pop.k._t = h.kind; this.pop.s.textContent = h.src; }
      M.set(this.pop.root, { left: c[0] + 'px', top: c[1] - 10 + 'px', opacity: vis.toFixed(3), transform: `translateY(calc(-100% + ${((1 - vis) * 6).toFixed(1)}px))` });
      M.set(this.ring, { left: c[0] - 3 + 'px', top: c[1] - 3 + 'px', width: c[2] + 6 + 'px', height: c[3] + 6 + 'px', opacity: vis.toFixed(3) });
    } else { this.pop.root.style.opacity = 0; this.ring.style.opacity = 0; }
  },
});
