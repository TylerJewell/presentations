/* Every control lands on an engineering backlog. One human-review rule becomes four pieces of work in the
   first agent it touches, then the same four in two more agents. A changed rule and a new one stack on top
   and every agent's column grows. Then the sample loan service's measure: thirteen components of its own
   to apply six human controls, counted as their names appear.
   The agents, the rules and the review windows are illustrative; the thirteen components are the table in
   samples/loan-origination/README.md, "Human oversight". */
registerSlide({
  id: 'backlog',
  act: 'problems',
  title: 'Every control lands on an engineering backlog',
  beats: [
    { t: 1.8, say: "Every control also lands on an engineering backlog. Most controls aren't settings you switch on. Take one rule: a person reviews a flagged credit decision before it takes effect, within four hours." },
    { t: 9.8, say: "To a developer, that sentence is work. A pause in the workflow, so the decision waits. A queue, so the case reaches a reviewer. A screen, so the reviewer sees what the agent saw. And a record of what they decided. Then the same work again, in every agent the rule touches." },
    { t: 16.8, say: "Then the rule changes, or a new one arrives, and the work starts again, in every agent, on the same backlog as everything else the team is building." },
    { t: 20.2, say: "Our own sample loan service shows the size of it. To apply six human controls, it needed thirteen components of its own: five entities, three views, two consumers, two timed actions and an endpoint. That's code a team writes, tests and maintains, alongside the lending system itself." },
  ],

  RULES: [
    { k: 'Control', at: 0.5, s: 'A person reviews a flagged credit decision before it takes effect, within four hours.',
      work: ['Workflow pause', 'Review queue', 'Reviewer screen', 'Decision record'] },
    { k: 'Changed control', at: 10.1, s: 'A person reviews a flagged credit decision <span class="tk-y">within two hours, and records the reason.</span>',
      work: ['New deadline', 'Reason field'] },
    { k: 'New control', at: 13.0, s: 'A customer can ask for a person to review any automated decision.',
      work: ['Request intake', 'Reviewer hand-off', 'Response record'] },
  ],
  AGENTS: ['Loan assistant', 'Support assistant', 'Payments agent'],
  COMPONENTS: [
    'HumanEventEntity', 'StandingDecisionsEntity', 'HaltEntity', 'OversightMonitorEntity', 'MinimumReviewTimeEntity',
    'HumanEventsView', 'UnderwritingActivityView', 'GuardrailBlocksView',
    'HumanEventTimersConsumer', 'HumanEventOwnerConsumer',
    'HumanEventTimedAction', 'OversightMonitorTimedAction',
    'HumanOversightEndpoint',
  ],
  /* the rule stack's front card, and the agent columns */
  CARD: { x: 150, y: 392, w: 500, h: 360 },
  COLX: [740, 1095, 1450], COLW: 320, TOP: 392,
  HEADS: [2.1, 6.6, 7.8],
  OUT: 16.95,
  TILES: 17.5,

  /** When ticket k of agent a flies out of its rule: the first agent's four are paced to the narration. */
  land(r, a, k) {
    if (r === 0) return a === 0 ? 2.5 + k : (a === 1 ? 6.8 : 8.0) + k * 0.14;
    return this.RULES[r].at + 0.6 + a * 0.75 + k * 0.12;
  },

  render(root) {
    const M = Mock, C = this.CARD;
    root.classList.add('sl-blg');
    M.style('sl-blg', `
      .sl-blg .rc { width: ${C.w}px; height: ${C.h}px; box-sizing: border-box; padding: 40px 40px 0; }
      .sl-blg .rc .hd { display: flex; align-items: center; gap: 18px; }
      .sl-blg .rc svg { width: 52px; height: 52px; overflow: visible; flex: none; }
      .sl-blg .rc svg path { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .sl-blg .rc .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-blg .rc .s { margin-top: 28px; font: 500 36px/1.28 var(--sans); color: var(--ink); text-wrap: pretty; }
      .sl-blg .ah { width: ${this.COLW}px; top: 326px; font: 700 30px/1.2 var(--sans); letter-spacing: -.01em; color: var(--ink); white-space: nowrap; }
      .sl-blg .tkt { width: ${this.COLW}px; box-sizing: border-box; padding: 0 20px; display: flex; align-items: center; gap: 14px;
        border-radius: 12px; border: 2px solid var(--line-2); background: #0B0B0E; font-weight: 500; color: var(--ink); white-space: nowrap; }
      .sl-blg .tkt i { flex: none; width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 2px var(--ink-3); }
      .sl-blg .big { left: 150px; top: 352px; width: 540px; }
      .sl-blg .big .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-blg .big .n { margin-top: 22px; font: 700 280px/.86 var(--sans); letter-spacing: -.05em; color: var(--yellow); font-variant-numeric: tabular-nums; }
      .sl-blg .big .l { margin-top: 34px; font: 500 36px/1.28 var(--sans); color: var(--ink); text-wrap: pretty; }
      .sl-blg .tile { width: 485px; height: 62px; box-sizing: border-box; padding: 0 24px; display: flex; align-items: center;
        border-radius: 12px; font: 500 24px/1 var(--mono); color: var(--ink); white-space: nowrap; }
      .sl-blg .src { left: var(--gut); right: var(--gut); top: 1000px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Every control lands on', '<span class="tk-y">an engineering backlog.</span>']);

    this.heads = this.AGENTS.map((n, a) => root.appendChild(M.html(`<div class="ah" style="left:${this.COLX[a]}px">${n}</div>`)));
    this.tickets = [];
    this.RULES.forEach((R, r) => {
      const base = r === 0 ? 0 : r === 1 ? 4 : 6;
      this.AGENTS.forEach((_, a) => R.work.forEach((w, k) => {
        const el = root.appendChild(M.html(`<div class="tkt" style="left:${this.COLX[a]}px"><i></i><span>${w}</span></div>`));
        this.tickets.push({ el, lb: el.querySelector('span'), r, a, row: base + k, land: this.land(r, a, k) });
      }));
    });
    /* rule cards after the tickets, so a ticket leaves from under its rule */
    this.cards = this.RULES.map((R) => {
      const el = M.html(`<div class="rc tk-card" style="left:${C.x}px;top:${C.y}px"><div class="hd"><svg viewBox="0 0 64 64" aria-hidden="true">${Talk.GLYPH.Human.map((d) => `<path d="${d}"/>`).join('')}</svg><div class="k">${R.k}</div></div><div class="s">${R.s}</div></div>`);
      root.appendChild(el);
      return { el, body: [el.querySelector('.hd'), el.querySelector('.s')], paths: [...el.querySelectorAll('path')] };
    });

    this.big = M.mount(root, `<div class="big"><div class="k">Our sample loan service</div><div class="n" data-k="n">13</div><div class="l">components of its own, to apply six human controls.</div></div>`);
    this.tiles = this.COMPONENTS.map((c, i) => root.appendChild(M.html(`<div class="tile tk-card" style="left:${780 + Math.floor(i / 7) * 505}px;top:${352 + (i % 7) * 76}px">${c}</div>`)));
    this.src1 = M.mount(root, `<div class="src tk-src">The agents, the rules and the review windows are illustrative.</div>`).root;
    this.src2 = M.mount(root, `<div class="src tk-src">Loan Origination sample service, README, "Human oversight": the six human controls it applies (S1 to S4, S6 and S7) and the thirteen components in its table.</div>`).root;
  },

  at(t) {
    const M = Mock, C = this.CARD, B = this.beats.map((b) => b.t);
    Talk.linesAt(this.head, t, 0.1);
    /* everything of beats 1 to 3 leaves together for the sample's figure */
    const keep = 1 - M.p(t, this.OUT, 0.45, 'inOutCubic');

    /* the rule stack: each new rule slides in on top, the ones before it step back up and to the right */
    this.cards.forEach((c, i) => {
      const R = this.RULES[i];
      const arrive = M.p(t, R.at, 0.8);
      let depth = 0;
      for (let j = i + 1; j < this.RULES.length; j++) depth += M.p(t, this.RULES[j].at, 0.7, 'inOutCubic');
      const x = (1 - arrive) * (i ? -60 : 0) + 16 * depth, y = (1 - arrive) * (i ? 0 : 22) - 16 * depth;
      c.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      c.el.style.zIndex = 3 + i;
      c.el.style.opacity = (M.ease.css(M.prog(t, R.at, i ? 0.3 : 0.6)) * keep).toFixed(3);
      /* a card behind shows only its edge, so its words leave as the next card covers it */
      c.body.forEach((b) => (b.style.opacity = (1 - Math.min(1, 1.6 * depth)).toFixed(3)));
      /* the rule being spoken about glows: the first through beat 1, each later one from its arrival */
      const end = i === 0 ? B[0] + 0.2 : this.OUT;
      const on = M.p(t, R.at + 0.2, 0.6) * (1 - M.p(t, end, 0.6, 'inOutCubic')) * (1 - Math.min(1, depth));
      c.el.style.borderColor = on > 0.01 ? `rgba(255,206,74,${(0.16 + 0.54 * on).toFixed(3)})` : '';
      c.el.style.boxShadow = on > 0.01 ? `0 0 60px -20px rgba(255,206,74,${(0.55 * on).toFixed(3)})` : '';
      c.el.style.background = on > 0.01 ? `linear-gradient(160deg, rgba(255,206,74,${(0.10 * on).toFixed(3)}), rgba(255,206,74,${(0.02 * on).toFixed(3)})), #0B0B0E` : '';
      /* the glyph draws once, on the first card; the later cards arrive with it drawn */
      if (i === 0) c.paths.forEach((p, k) => M.draw(p, t, R.at + 0.2 + k * 0.1, 0.6));
    });

    /* agent columns: the header, then its tickets, which close up when more rules arrive */
    this.heads.forEach((h, a) => { M.rise(h, t, this.HEADS[a], { dy: 14 }); h.style.opacity *= keep; });
    const c = M.p(t, this.RULES[1].at, 0.7, 'inOutCubic');
    const pitch = M.lerp(82, 62, c), th = M.lerp(68, 52, c), fs = M.lerp(26, 24, c);
    /* a ticket slides out of the rule card's right edge along its own row, so no two cross; one bound for
       a later agent passes behind the tickets already in place and shows its label as it lands */
    const edge = C.x + C.w + 2, sx = edge - this.COLW;
    this.tickets.forEach((k) => {
      const x = this.COLX[k.a], y = this.TOP + k.row * pitch;
      const dur = 0.6 + 0.0004 * (x - sx);
      const p = M.p(t, k.land, dur, 'outCubic');
      const dx = (sx - x) * (1 - p), hidden = Math.max(0, edge - (x + dx));
      k.el.style.top = y.toFixed(1) + 'px';
      k.el.style.height = th.toFixed(1) + 'px';
      k.el.style.fontSize = fs.toFixed(1) + 'px';
      k.el.style.transform = p < 1 ? `translateX(${dx.toFixed(1)}px)` : 'none';
      k.el.style.clipPath = hidden > 0 ? `inset(-40px -40px -40px ${hidden.toFixed(1)}px)` : '';
      k.el.style.zIndex = p < 1 ? 1 : 2;
      k.lb.style.opacity = M.clamp((p - 0.75) / 0.25).toFixed(3);
      /* the first rule's work steps back once newer work arrives; dimmed, not faded, so it stays opaque */
      const older = k.r === 0 ? 0.45 * c : 0;
      k.el.style.filter = older > 0.001 ? `brightness(${(1 - older).toFixed(3)})` : '';
      k.el.style.opacity = (M.prog(t, k.land, 0.1) * keep).toFixed(3);
      const on = M.p(t, k.land + 0.6 * dur, 0.3) * (1 - M.p(t, k.land + dur + (k.r === 0 && k.a === 0 ? 0.5 : 0.2), 0.6));
      k.el.style.borderColor = on > 0.01 ? `rgba(255,206,74,${(0.16 + 0.6 * on).toFixed(3)})` : '';
      k.el.style.boxShadow = on > 0.01 ? `0 0 40px -16px rgba(255,206,74,${(0.6 * on).toFixed(3)})` : '';
    });

    /* the sample's figure: the count follows the component names as they appear */
    const T0 = this.TILES, step = 0.1;
    M.rise(this.big.root, t, T0 - 0.15);
    const n = M.clamp(Math.floor((t - T0) / step) + 1, 1, this.COMPONENTS.length);
    Talk.txt(this.big.n, String(n));
    this.tiles.forEach((el, i) => M.rise(el, t, T0 + i * step, { dy: 16 }));

    M.fade(this.src1, t, B[0] + 0.4, 0.6);
    this.src1.style.opacity *= keep;
    M.fade(this.src2, t, T0, 0.6);
  },
});
