/* What the rules actually ask for. One real control of each of the five kinds, in the regulation's own
   words, one per click: a rail of the five kinds on the left lights the current one, and the card beside
   it holds the law's text, its citation, when it applies and what it means in practice. The land clears
   the card for the line the next slide picks up. The quotes are the corpus's full_text_verbatim
   (Akka regulation corpus, snapshot 2026-10): nyc-ll144.sec2.1, hipaa-hhs.s164-514.sanitizer,
   osfi-e23.monitoring-drift, texas-traiga.sec552-052.behavioral-manipulation-prohibition,
   eu-ai-act.art14.4.e. The EU date is Annex III's as moved by Regulation (EU) 2026/1744 (data/trends.js). */
registerSlide({
  id: 'in-their-words',
  act: 'clocks',
  title: 'What the rules actually ask for',
  beats: [
    { t: 1.6, say: "Before we get to how fast the rules are moving, let's look at what they actually ask for. Not principles. Controls, in the law's own words. I've taken one real control of each of five kinds. We'll come back to those five kinds later." },
    { t: 3.6, say: "First, a gate: a check that has to pass before something is used. New York City's Local Law 144. It's unlawful to use an automated tool to screen job candidates unless it's had a bias audit within the last year. No current audit, no screening. And every day the tool is used without one counts as a separate violation." },
    { t: 5.6, say: "Second, a sanitizer: data stripped before it moves on. HIPAA's safe harbor. Health data only counts as de-identified once eighteen identifiers are removed, from names to Social Security numbers. That rule is more than twenty years old, and it applies to every agent that reads a patient record today." },
    { t: 7.6, say: "Third, an evaluation: behavior scored against a line you draw. OSFI's guideline E-23, which takes effect in May 2027. Model monitoring has to define thresholds for breaches, and handle AI's elevated potential for drift. Measure on a schedule, compare against your threshold, escalate on a breach." },
    { t: 9.6, say: "Fourth, a guardrail: an action allowed or blocked at a boundary. Texas, in force since January. No AI system may be deployed in a way that aims to encourage self-harm, harm to someone else, or crime. In practice, that's a check on every response, and a block before it reaches the person." },
    { t: 11.6, say: "And fifth, human authority. The EU AI Act, Article 14. The people overseeing a high-risk system must be able to interrupt it, and I'm quoting, through a 'stop' button or a similar procedure, so it comes to a halt in a safe state. The law asks for a stop button." },
    { t: 13.8, say: "Five kinds of control, five jurisdictions. Every one of them is concrete enough to build, and to test. The trouble is the calendar around them. It won't sit still." },
  ],

  /* kind, rail line, jurisdiction, citation, when it applies, the law's words (the operative phrase in
     <em>), and what it means in practice */
  CONTROLS: [
    { k: 'Gate', rail: 'New York City: an audit within a year', where: 'New York City', cite: 'Local Law 144, Admin. Code §20-871(a)(1)', when: 'Enforced since July 2023',
      quote: 'It shall be unlawful … to use an automated employment decision tool to screen a candidate … unless: Such tool has been the subject of <em>a bias audit conducted no more than one year prior</em> to the use of such tool',
      practice: 'No current audit, no screening. Each day of use without one is a separate violation.' },
    { k: 'Sanitizer', rail: 'HIPAA: eighteen identifiers removed', where: 'United States', cite: 'HIPAA Privacy Rule, 45 CFR §164.514(b)(2)', when: 'In force since 2003',
      quote: 'The following identifiers of the individual or of relatives, employers, or household members of the individual, <em>are removed</em>',
      practice: 'Health data counts as de-identified only once all eighteen are gone, from names to Social Security numbers.' },
    { k: 'Evaluation', rail: 'OSFI E-23: thresholds for drift', where: 'Canada', cite: 'OSFI Guideline E-23, Principle 3.6', when: 'From 1 May 2027',
      quote: 'Model monitoring should document and include: … <em>defining thresholds for breaches</em> … and the elevated potential for model drift',
      practice: 'Measured on a schedule, against thresholds you set. A breach is escalated.' },
    { k: 'Guardrail', rail: 'Texas: no encouraging harm', where: 'Texas', cite: 'TRAIGA, Bus. & Com. Code §552.052', when: 'In force since 1 Jan 2026',
      quote: 'A person may not develop or deploy an artificial intelligence system in a manner that intentionally aims to <em>incite or encourage</em> a person to: (1) commit physical self-harm, including suicide; (2) harm another person; or (3) engage in criminal activity',
      practice: 'Every response is checked at the boundary, and one that encourages harm is blocked before it is sent.' },
    { k: 'Human', rail: 'EU AI Act: a stop button', where: 'European Union', cite: 'AI Act, Article 14(4)(e)', when: 'High-risk systems, from 2 Dec 2027',
      quote: 'to intervene in the operation of the high-risk AI system or interrupt the system through <em>a ‘stop’ button</em> or a similar procedure that allows the system to come to a halt in a safe state',
      practice: 'A person assigned to oversee the system can halt it, and it stops in a safe state.' },
  ],
  RAIL_Y: 300, PITCH: 128,

  render(root) {
    const M = Mock;
    root.classList.add('sl-itw');
    M.style('sl-itw', `
      .sl-itw .rw { left: 150px; width: 560px; height: 110px; }
      .sl-itw .rw > * { position: absolute; }
      .sl-itw .rw svg { left: 0; top: 4px; width: 52px; height: 52px; overflow: visible; }
      .sl-itw .rw svg path { fill: none; stroke: var(--ink-3); stroke-width: 3.4; stroke-linecap: round; stroke-linejoin: round; }
      .sl-itw .rw.on svg path { stroke: var(--yellow); }
      .sl-itw .rw .nm { left: 78px; top: 6px; font: 700 42px/1 var(--sans); letter-spacing: -.02em; color: var(--ink-3); }
      .sl-itw .rw.on .nm { color: var(--yellow); }
      .sl-itw .rw.past .nm { color: var(--ink); }
      .sl-itw .rw .ln2 { left: 78px; top: 60px; font: 500 26px/1.1 var(--sans); color: var(--ink-2); white-space: nowrap; }
      .sl-itw .cd { left: 770px; top: 296px; width: 1000px; height: 640px; box-sizing: border-box; padding: 44px 52px 0; }
      .sl-itw .cd > * { position: static; }
      .sl-itw .cd .hd { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
      .sl-itw .cd .wh { font: 700 36px/1.1 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-itw .cd .ct { margin-top: 10px; font: 500 26px/1.2 var(--sans); color: var(--ink-2); }
      .sl-itw .cd q { display: block; margin-top: 34px; quotes: none; font: 500 38px/1.28 var(--sans); letter-spacing: -.01em; color: var(--ink); text-wrap: pretty; }
      .sl-itw .cd q::before { content: '“'; color: var(--yellow); margin-left: -.42em; margin-right: .04em; }
      .sl-itw .cd q::after { content: '”'; color: var(--yellow); margin-left: .04em; }
      .sl-itw .cd q em { font-style: normal; color: var(--yellow); }
      .sl-itw .cd .pr { position: absolute; left: 52px; right: 52px; bottom: 44px; padding-top: 26px; border-top: 2px solid var(--line-2);
        font: 600 32px/1.3 var(--sans); color: var(--ink); text-wrap: pretty; }
      .sl-itw .land { left: 770px; top: 470px; width: 1000px; }
      .sl-itw .land .tk-h { font-size: 76px; }
      .sl-itw .src { left: var(--gut); top: 1000px; right: var(--gut); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['What the rules <span class="tk-y">actually ask for.</span>']);
    this.rows = this.CONTROLS.map((c, i) => {
      const el = M.html(`<div class="rw" style="top:${this.RAIL_Y + i * this.PITCH}px"><svg viewBox="0 0 64 64">${Talk.GLYPH[c.k].map((p) => `<path d="${p}"/>`).join('')}</svg>
        <div class="nm">${c.k}</div><div class="ln2">${c.rail}</div></div>`);
      root.appendChild(el);
      return { el, paths: [...el.querySelectorAll('path')], ln2: el.querySelector('.ln2') };
    });
    this.cards = this.CONTROLS.map((c) => {
      const el = M.html(`<div class="cd tk-card"><div class="hd"><div class="wh">${c.where}</div><span class="tk-chip y">${c.when}</span></div>
        <div class="ct">${c.cite}</div><q>${c.quote}</q><div class="pr">${c.practice}</div></div>`);
      root.appendChild(el);
      return el;
    });
    this.land = M.html('<div class="land"></div>');
    root.appendChild(this.land);
    this.landH = Talk.lines(this.land, ['Concrete enough to build,', '<span class="tk-y">and to test.</span>']);
    this.src = M.mount(root, `<div class="src tk-src">Each control in the law's own words, from the Akka regulation corpus, snapshot 2026-10: NYC Admin. Code §20-871; 45 CFR §164.514;
      OSFI Guideline E-23 (2027); Tex. Bus. &amp; Com. Code §552.052; Regulation (EU) 2024/1689 Art. 14, high-risk date per Regulation (EU) 2026/1744.</div>`).root;
  },

  at(t) {
    const M = Mock;
    Talk.linesAt(this.head, t, 0.1);
    const show = this.beats.slice(1, 6).map((b) => b.t - 1.4);
    const land = this.beats[6].t - 1.6;
    this.rows.forEach((r, i) => {
      const on = t >= show[i] && t < (show[i + 1] ?? land);
      r.el.classList.toggle('on', on);
      r.el.classList.toggle('past', t >= (show[i + 1] ?? land));
      M.rise(r.el, t, 0.4 + i * 0.08, { dy: 14 });
      r.paths.forEach((p, k) => M.draw(p, t, 0.5 + i * 0.08 + k * 0.06, 0.6));
      M.rise(r.ln2, t, show[i] + 0.3, { dy: 8 });
    });
    this.cards.forEach((c, i) => M.riseOut(c, t, show[i] + 0.15, show[i + 1] ?? land, { dy: 26 }));
    Talk.linesAt(this.landH, t, land + 0.5);
    M.fade(this.src, t, 1.0, 0.6);
  },
});
