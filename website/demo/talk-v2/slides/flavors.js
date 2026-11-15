/* Human control comes in five flavors. Five columns named by who decides, each with its definition; the
   fourteen patterns appear as cards beneath them, with the law that anchors four of the columns. Then the
   loan system's own controls light the seven cards they implement (model changes stay dark: simulated).
   Last, the agent shift: the board steps back and the person lifts from each action to the bounds around
   it. Flavors: the console's human_config. Patterns: the akka/human vocabulary, shown as illustration.
   Loan controls: samples/loan-origination README, "Human oversight" and "Feature 002". */
registerSlide({
  id: 'flavors',
  act: 'principles',
  title: 'Human control comes in five flavors',
  beats: [
    { t: 3.2, say: "Second: human control comes in five flavors, named by who decides. A person authorizes what the system may do. A person makes or reviews a decision about someone. A person answers a signal while the work carries on. Anyone flags an output, and a person decides what to do with it. And a person stops the system, and restarting it takes a second decision." },
    { t: 6.4, say: "Under those five sit fourteen patterns, the situations a person decides, from approving an action to halting and restarting. Four of the flavors have a line of law beneath them, and the right to contest is in force in at least seven regimes." },
    { t: 9.4, say: "Our one loan system runs seven of them. Deadline extensions wait for approval, held notices are reviewed, declined applicants can contest, drift and guardrail bursts are triaged, rushed reviews are measured, the assessment can be halted, and flagged replies become feedback. Model changes are simulated, so that card stays dark." },
    { t: 13.6, say: "And agents move the person up a level. When an agent takes a thousand actions a day, the person approves the bounds instead of each action: a standing approval for thirty days, a plan, a mandate, a tier of authority. For private companies, approving an agent's action rests on guidance alone." },
  ],

  /* pats: [pattern, the loan control that implements it (lit), or null and a dim note] */
  COLS: [
    { k: 'Authorization', d: 'A person allows what the system may do.', law: ['EU AI Act Art. 14(4)(d)', 'Override, from Dec 2027'],
      pats: [['Action approval', 'Deadline extensions'], ['Change authorization', null, 'Simulated model changes'], ['Exception'], ['Override'], ['Outcome reconciliation']] },
    { k: 'Decision', d: 'A person makes or reviews a decision about someone.', law: ['GDPR Art. 22(3)', 'Contest, in force'],
      pats: [['Decision review', 'Held notices'], ['Contest and appeal', 'Contested declines'], ['Match'], ['Hand-off']] },
    { k: 'Monitoring', d: 'A person answers a signal while the work goes on.', law: ['EU AI Act Art. 14(4)(a)', 'Monitoring, from Dec 2027'],
      pats: [['Triage', 'Drift, guardrail bursts'], ['Attestation'], ['Oversight quality', 'Rushed reviews']] },
    { k: 'Feedback', d: 'Anyone flags an output, and a person decides what to do with it.', law: null,
      pats: [['Flag and feedback', 'Flagged replies']] },
    { k: 'Halt', d: 'A person stops a capability, and restarting takes a second decision.', law: ['EU AI Act Art. 14(4)(e)', 'Halt, from Dec 2027'],
      pats: [['Halt and restart', 'Assessment halt']] },
  ],
  /* the order the loan controls light in, as the narration names them */
  LIGHT_ORDER: ['Action approval', 'Decision review', 'Contest and appeal', 'Triage', 'Oversight quality', 'Halt and restart', 'Flag and feedback'],
  BOUNDS: ['A standing approval for 30 days', 'A plan', 'A mandate', 'A tier of authority'],
  ACTIONS: ['Search', 'Read a file', 'Send an email', 'Refund', 'Book a meeting', 'Update a record', 'Pay an invoice', 'Draft a reply', 'Call an API', 'Look up a policy'],
  X0: 150, CW: [336, 301, 301, 301, 301], CG: 20, Y0: 258, CARD0: 472, CH: 82, PITCH: 90,
  /* scene times */
  B: { cols: 0.6, cards: 3.6, law: 5.0, lit: 6.9, stat: 8.6, shift: 10.0 },

  render(root) {
    Act3.mark(root, 2);
    const M = Mock;
    root.classList.add('sl-fl', 'a3');
    M.style('sl-fl', `
      .sl-fl .bd, .sl-fl .sh { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-fl .bd > *, .sl-fl .sh > * { position: absolute; }
      .sl-fl .h2 .tk-h { font-size: 72px; }
      .sl-fl .col .nm { font: 700 38px/1 var(--sans); letter-spacing: -.02em; color: var(--ink); }
      .sl-fl .col .df { margin-top: 14px; font: 500 27px/1.25 var(--sans); color: var(--ink-2); }
      .sl-fl .pc { height: ${this.CH}px; border-radius: 14px; background: #0B0B0E; box-shadow: inset 0 0 0 2px var(--line-2); overflow: hidden; }
      .sl-fl .pc .gl { position: absolute; inset: 0; border-radius: 14px; opacity: 0;
        box-shadow: inset 0 0 0 2px rgba(255,206,74,.75), 0 0 40px -14px rgba(255,206,74,.6);
        background: linear-gradient(160deg, rgba(255,206,74,.13), rgba(255,206,74,.03)); }
      .sl-fl .pc .pn { position: absolute; left: 18px; right: 12px; font: 600 24px/1.2 var(--sans); color: var(--ink); white-space: nowrap; }
      .sl-fl .pc .ps { position: absolute; left: 18px; right: 12px; top: 44px; font: 500 24px/1.2 var(--sans); color: var(--yellow); white-space: nowrap; }
      .sl-fl .pc .ps.dim { color: var(--ink-3); }
      .sl-fl .src { right: var(--gut); top: 1004px; }
      .sl-fl .law { font: 500 21px/1.3 var(--sans); color: var(--ink-3); }
      .sl-fl .law b { display: block; font-weight: 600; color: var(--ink-2); }
      .sl-fl .stat { left: 1148px; top: 600px; width: 622px; display: flex; align-items: center; gap: 26px; }
      .sl-fl .stat .v { font: 700 150px/.9 var(--sans); letter-spacing: -.04em; color: var(--yellow); }
      .sl-fl .stat .l { font: 600 32px/1.2 var(--sans); color: var(--ink); text-wrap: balance; }
      .sl-fl .eb { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-fl .eb.y { color: var(--yellow); }
      .sl-fl .bc { top: 402px; width: 352px; height: 124px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 22px;
        font: 600 30px/1.2 var(--sans); color: var(--ink); text-wrap: balance; }
      .sl-fl .lane { left: 290px; top: 740px; width: 1480px; height: 80px; overflow: hidden;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
      .sl-fl .lane .rw { position: absolute; left: 0; top: 14px; display: flex; gap: 16px; }
      .sl-fl .act { flex: none; height: 52px; padding: 0 18px; display: flex; align-items: center; border-radius: 12px; background: #17171c;
        box-shadow: inset 0 0 0 2px rgba(241,241,241,.22); font: 500 24px/1 var(--sans); color: var(--ink-2); white-space: nowrap; }
      .sl-fl svg.ov { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-fl .ov .fr { fill: rgba(255,206,74,.04); stroke: var(--yellow); stroke-width: 3; stroke-dasharray: 12 9; }
      .sl-fl .ov .ar { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .sl-fl .who { left: 150px; width: 88px; height: 88px; margin-top: -44px; border-radius: 50%; background: #121216; display: flex; align-items: center; justify-content: center;
        box-shadow: inset 0 0 0 3px rgba(255,206,74,.85), 0 0 50px -12px rgba(255,206,74,.7); }
      .sl-fl .who svg { width: 46px; height: 46px; overflow: visible; }
      .sl-fl .who path { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Human control comes in <span class="tk-y">five flavors.</span>']);
    this.head2 = Talk.lines(root.appendChild(M.html('<div class="tk-top h2"></div>')), ['The person moves from approving each action', 'to <span class="tk-y">approving the policy.</span>']);

    /* the board */
    this.bd = root.appendChild(M.html('<div class="bd"></div>'));
    const lit = new Map(this.LIGHT_ORDER.map((n, i) => [n, i]));
    this.cols = this.COLS.map((c, i) => {
      const w = this.CW[i], x = this.X0 + this.CW.slice(0, i).reduce((a, b) => a + b + this.CG, 0);
      const head = M.html(`<div class="col" style="left:${x}px;top:${this.Y0}px;width:${w}px"><div class="nm">${c.k}</div><div class="df">${c.d}</div></div>`);
      this.bd.appendChild(head);
      const cards = c.pats.map(([name, sub, note], k) => {
        const el = M.html(`<div class="pc" style="left:${x}px;top:${this.CARD0 + k * this.PITCH}px;width:${w}px"><div class="gl"></div>
          <div class="pn">${name}</div>${sub || note ? `<div class="ps${sub ? '' : ' dim'}">${sub || note}</div>` : ''}</div>`);
        this.bd.appendChild(el);
        return { el, gl: el.querySelector('.gl'), pn: el.querySelector('.pn'), ps: el.querySelector('.ps'), sub: !!sub, note: !!note, order: lit.has(name) ? lit.get(name) : -1 };
      });
      const law = c.law ? M.html(`<div class="law" style="left:${x}px;top:930px;width:${w}px"><b>${c.law[0]}</b>${c.law[1]}</div>`) : null;
      if (law) this.bd.appendChild(law);
      return { head, cards, law };
    });
    this.stat = M.mount(this.bd, `<div class="stat"><div class="v">7</div><div class="l">of the fourteen run in the loan system.</div></div>`).root;

    /* the agent shift */
    this.sh = root.appendChild(M.html('<div class="sh"></div>'));
    this.ebB = M.html('<div class="eb y" style="left:290px;top:360px">The bounds</div>');
    this.ebA = M.html('<div class="eb" style="left:290px;top:690px">Each action</div>');
    this.sh.append(this.ebB, this.ebA);
    this.bounds = this.BOUNDS.map((b, i) => {
      const el = M.html(`<div class="bc tk-card" style="left:${290 + i * 376}px">${b}</div>`);
      this.sh.appendChild(el);
      return el;
    });
    /* an agent's actions stream along the lane: two copies of the list, so it loops without a seam */
    const acts = this.ACTIONS.map((a) => `<span class="act">${a}</span>`).join('');
    this.lane = M.html(`<div class="lane"><div class="rw">${acts}${acts}</div></div>`);
    this.sh.appendChild(this.lane);
    this.row = this.lane.firstChild;
    this.ov = M.html(`<svg class="ov" viewBox="0 0 1920 1080"><rect class="fr" x="276" y="726" width="1508" height="108" rx="20"/>
      <path class="ar" d="M194,718 C194,650 194,600 194,542"/><path class="ar" d="M178,560 L194,540 L210,560"/></svg>`);
    this.sh.appendChild(this.ov);
    this.fr = this.ov.querySelector('.fr');
    [this.ar, this.ah] = this.ov.querySelectorAll('.ar');
    this.who = M.html(`<div class="who"><svg viewBox="0 0 64 64">${Talk.GLYPH.Human.map((p) => `<path d="${p}"/>`).join('')}</svg></div>`);
    this.sh.appendChild(this.who);

    this.src = M.mount(root, `<div class="src tk-src">Patterns: akka/human vocabulary, illustrative. Loan controls: the Loan Origination sample; model changes simulated. Law: EU AI Act Art. 14(4), from 2 Dec 2027; GDPR Art. 22(3); contest binding in at least seven regimes. Bounds: the sample’s 30-day standing approval; Anthropic; Google AP2; China’s agent Opinions, 8 May 2026.</div>`).root;
  },

  at(t) {
    const M = Mock, B = this.B, L = M.abs(t);
    const S = B.shift;
    /* headline: the first line leaves upward at the shift, the second rises in its place */
    this.head.ln.forEach((l) => {
      if (t < S + 0.1) M.lineRise(l, t, 0.1);
      else l.style.transform = `translateY(${(-108 * M.p(t, S + 0.1, 0.6, 'inOutCubic')).toFixed(2)}%)`;
    });
    Talk.linesAt(this.head2, t, S + 0.5, 0.12, 1.0);
    this.head2.el.parentNode.style.display = t < S + 0.4 ? 'none' : '';

    /* the board, until the shift */
    const out = M.p(t, S, 0.6, 'inOutCubic');
    this.bd.style.opacity = (1 - out).toFixed(3);
    this.bd.style.display = out >= 1 ? 'none' : '';
    const litAny = M.p(t, B.lit - 0.2, 0.5);
    this.cols.forEach((c, i) => {
      M.rise(c.head, t, B.cols + i * 0.35, { dy: 16 });
      c.cards.forEach((cd, k) => {
        const on = cd.order >= 0 ? M.p(t, B.lit + cd.order * 0.24, 0.5) : 0;
        M.rise(cd.el, t, B.cards + i * 0.22 + k * 0.08, { dy: 12, opacity: 1 - (cd.note ? 0.35 : 0.55) * litAny * (1 - on) });
        cd.gl.style.opacity = on.toFixed(3);
        /* a lit card makes room for the loan control beneath its name */
        const up = cd.sub ? on : cd.note ? litAny : 0;
        cd.pn.style.top = M.lerp(26, 12, up).toFixed(1) + 'px';
        if (cd.ps) { cd.ps.style.opacity = up.toFixed(3); cd.ps.style.transform = `translateY(${((1 - up) * 10).toFixed(1)}px)`; }
      });
      if (c.law) M.rise(c.law, t, B.law + i * 0.15, { dy: 8 });
    });
    M.rise(this.stat, t, B.stat, { dy: 14 });

    /* the shift: the person lifts from each action to the bounds around it */
    this.sh.style.display = t < S + 0.6 ? 'none' : '';
    M.rise(this.ebA, t, S + 0.8, { dy: 10 });
    M.fade(this.lane, t, S + 0.8, 0.6);
    if (!this.span && this.row.offsetWidth) this.span = (this.row.offsetWidth + 16) / 2;
    const span = this.span || 2400;
    this.row.style.transform = `translateX(${((L * 46) % span - span).toFixed(1)}px)`;
    const lift = M.p(t, S + 1.9, 1.0, 'inOutCubic');
    const whoOn = M.ease.css(M.prog(t, S + 0.9, 0.5));
    this.who.style.opacity = whoOn.toFixed(3);
    this.who.style.top = M.lerp(780, 464, lift).toFixed(1) + 'px';
    M.draw(this.ar, t, S + 1.6, 0.6);
    this.ah.style.opacity = M.prog(t, S + 2.1, 0.2).toFixed(3);
    M.rise(this.ebB, t, S + 2.2, { dy: 10 });
    this.bounds.forEach((b, i) => M.rise(b, t, S + 2.4 + i * 0.15, { dy: 14 }));
    this.fr.style.opacity = M.ease.css(M.prog(t, S + 2.6, 0.6)).toFixed(3);
    M.march(this.fr, L, 14);

    M.fade(this.src, t, B.cards + 0.6, 0.6);
  },
});
