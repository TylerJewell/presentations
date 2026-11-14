/* The Controls board, in force (adapted from the film's scene 3.2). The board is S3Board on its act
   clock: here tau = t, all before the code changes, so v3 is in force throughout. Each beat pushes the
   camera onto one part: the loop, readiness, three controls and the code each is bound to, and the
   evidence strip, whose verdicts keep arriving while a beat holds. */
registerSlide({
  id: 'board',
  act: 'together',
  title: 'The Controls board',
  beats: [
    { t: 1.6, say: "This is that system's Controls board: its contract with its regulators. Every control it committed to, who decided each one, and the version in force. Here, version three." },
    { t: 4.2, say: "The contract is a loop, not a line. Adopt the obligations, describe the system, plan the controls, decide each one, sign, and put it in force. Then round again whenever something changes." },
    { t: 6.8, say: "Readiness says whether the contract is complete: every fact answered, every control decided, and whether the running code still matches the code that was signed. Today, it does." },
    { t: 9.6, say: "Now the part an examiner cares about. Each control is bound to the code that enforces it. This guardrail is bound to the eligibility agent, down to the file and the line." },
    { t: 11.4, say: "This one is bound to the agent's system prompt, at a specific version." },
    { t: 13.2, say: "And this one to the guardrail that writes the adverse-action disclosure. Not a description of the system. The system itself." },
    { t: 16.0, say: "Down here, the evidence arrives live: each control on each request, its verdict, the contract version, and the regulation it answers. No one assembles a report." },
  ],

  HOVER: [
    { at: 9.0, row: 0, src: 'EligibilityAssessorAgent.java:31', kind: 'Agent' },
    { at: 10.8, row: 1, src: 'prompts/eligibility-assessor/system.md', kind: 'Prompt · v12' },
    { at: 12.6, row: 2, src: 'AdverseActionGuardrail.java:18', kind: 'Guardrail' },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-board');
    Act4.consoleCss('sl-board');
    M.style('sl-board', `
      .sl-board .pop { left: 0; top: 0; padding: 10px 13px 11px; border-radius: 10px; background: #1f1f24; box-shadow: 0 0 0 1px rgba(236,236,241,.2), 0 16px 40px rgba(0,0,0,.6);
        font: 14px/1.35 var(--sans); color: var(--c-text); white-space: nowrap; opacity: 0; z-index: 22; }
      .sl-board .pop .k { font: 600 11.5px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--c-muted); margin-bottom: 7px; }
      .sl-board .pop .s { font: 500 15px var(--mono); color: var(--c-gold-text); }
      .sl-board .pop .d { font-size: 13px; color: var(--c-muted); margin-top: 5px; }
      .sl-board .ring { left: 0; top: 0; border-radius: 7px; box-shadow: 0 0 0 2px var(--c-gold), 0 0 18px rgba(201,162,39,.55); opacity: 0; z-index: 21; }
    `);
    this.b = S3Board.build(root);
    this.pop = M.mount(this.b.world, `<div class="pop"><div class="k" data-k="k"></div><div class="s" data-k="s"></div><div class="d">AI-BOM 60b8e667 · bound since v3</div></div>`);
    this.ring = M.html('<div class="ring"></div>');
    this.b.world.appendChild(this.ring);
    this.cursor = M.cursor(this.b.world);
  },

  at(t) {
    const M = Mock, b = this.b;
    b.at(t, t);
    Act4.upheld(b.r.root);
    M.fade(b.world, t, 0, 0.6);

    if (!this.chips) this.chips = this.HOVER.map((h) => b.rectOf(b.base[h.row].tg.querySelector('.tgt')));

    Talk.camera(b.world, t, [
      { t: 1.9, rect: b.P(244, 30, 296, 276), dur: 1.3 },
      { t: 4.5, rect: b.P(548, 36, 808, 264), dur: 1.3 },
      { t: 7.1, rect: b.P(260, 300, 930, 170), dur: 1.3 },
      { t: 13.6, rect: b.P(0, 534, 585, 153), dur: 1.4 },
    ]);

    const c0 = this.chips[0];
    const keys = [{ t: 8.0, x: c0[0] + 90, y: c0[1] + 70, glide: 0.4 }];
    this.HOVER.forEach((h, i) => { const c = this.chips[i]; keys.push({ t: h.at, x: c[0] + c[2] * 0.5, y: c[1] + c[3] * 0.3 - 16, glide: 0.8 }); });
    keys.push({ t: 14.0, x: c0[0] + 260, y: c0[1] + 150, glide: 0.6, hide: true });
    this.cursor.at(t, keys);

    let k = -1;
    this.HOVER.forEach((h, i) => { if (t >= h.at) k = i; });
    const end = k >= 0 ? (this.HOVER[k + 1] ? this.HOVER[k + 1].at - 0.25 : 13.8) : 0;
    const vis = k >= 0 ? M.ramp(t, this.HOVER[k].at - 0.05, end, 0.25, 0.25) : 0;
    if (k >= 0) {
      const h = this.HOVER[k], c = this.chips[k];
      Talk.txt(this.pop.k, h.kind); Talk.txt(this.pop.s, h.src);
      M.set(this.pop.root, { left: c[0] + 'px', top: c[1] - 10 + 'px', opacity: vis.toFixed(3), transform: `translateY(calc(-100% + ${((1 - vis) * 6).toFixed(1)}px))` });
      M.set(this.ring, { left: c[0] - 3 + 'px', top: c[1] - 3 + 'px', width: c[2] + 6 + 'px', height: c[3] + 6 + 'px', opacity: vis.toFixed(3) });
    } else { this.pop.root.style.opacity = 0; this.ring.style.opacity = 0; }
  },
});
