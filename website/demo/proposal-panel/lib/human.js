/* The Human page and the human-control pieces, for the scenes that show a person deciding (Act 6) and any
   later scene that returns to the page. Everything is a pure function of what the scene passes in.

   Facts
     Film.human.HELD      the held review (Action approval): id, title, overall, threshold, risks, check, effects, control, pattern, reason, queue, due, …
     Film.human.BLOCKED   the blocked attempt that raised a Triage event

   The page (inside Film.console; children of its `page` are absolute, in the console's logical px)
     const H = Film.human.page(root, { tab: 'Waiting' })
       H.frame            the console frame (Film.console)
       H.page             the page element rows and the tray mount into
       H.stats            { waiting, answered, halts, median } value elements
       H.count            the count badge on the Human nav item (text; empty hides it)
       H.queue            the rows' container, below the column header
     const r = Film.human.row(H.queue, Film.human.HELD, { y })   refs { root, ring, due, subject, status, pattern, reason, open }
       Film.human.ring(r.ring, p)   the countdown ring at fraction p of the window left; glow the row with Film.glow(r.root, g)
     const T = Film.human.tray(H.page, Film.human.HELD, { x, y, w })   the event tray, over the page's right side
       T.at({ review, chosen, reason, open })   review: seconds looked at (the minimum review bar), chosen: 'approve' | 'reject' | null,
                                               reason: the typed text, open: 0..1 slide-in
       refs: report, evidence, min, approve, reject, reasonBox, indep (glow each with Film.glow)

   The lifecycle rail (stage px, for a black-stage scene)
     const L = Film.human.lifecycle(root, { x0, x1, y })   five steps: raised, claimed, decided, applied, kept
       L.at(p)            p < 0 hides the person marker; 0..4 places it at that step (fractions travel); steps at or
                          before p are lit, the nearest one glows
       L.base             the line, for Mock.draw
       L.steps[i]         each step's label element */
(function () {
  const M = Mock;
  const PERSON = '<svg viewBox="0 0 44 44" width="44" height="44"><circle class="person" cx="22" cy="14" r="8"/><path class="person" d="M6 42 C6 28 38 28 38 42"/></svg>';

  const HELD = {
    id: 'rev-3b18d05e', title: 'Product license renewal, 3 years', overall: 4.2, status: 'Held',
    pattern: 'Action approval', control: 'release-weak-review', reason: 'The overall score 4.2 is below 5.0.',
    queue: 'Senior reviewers', due: '29 min', ring: 0.97, age: 'just now', minReview: 10, threshold: 5.0,
    risks: ['Year 2 and year 3 prices are not stated.', 'No named deputy for the security role.', 'Termination terms are open.'],
    check: 'The consensus risks are real gaps in the proposal.',
    effects: { approve: 'The review completes.', reject: 'The review ends rejected with the reviewer\'s reason.' },
  };
  const BLOCKED = {
    id: 'rev-a90f42c1', title: 'Blocked request', status: 'Blocked',
    pattern: 'Triage', control: 'blocked-attempt-triage', reason: 'The injection guard denied the request.',
    queue: 'Security officers', due: '3 h 40 min', ring: 0.92, age: '18 min',
  };

  /* an earlier event this period, so the page has an Answered row under the queue */
  const ANSWERED = { id: 'rev-5e71c0a9', title: 'Warehouse mobility support, 24 months', outcome: 'Approved', pattern: 'Action approval', control: 'release-weak-review', by: 'Senior reviewer', took: '6 min' };

  M.style('fp-human', `
    .hm-stats { position: absolute; left: 0; top: 0; width: 1289px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .hm-stat { padding: 14px 16px 16px; border-radius: 10px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); }
    .hm-stat .l { font-size: 12.5px; color: var(--c-muted); }
    .hm-stat .v { margin-top: 8px; font: 600 26px/1 var(--sans); letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
    .hm-stat .d { margin-top: 8px; font-size: 12px; color: var(--c-muted); }
    .hm-filters { position: absolute; left: 0; top: 108px; display: flex; gap: 8px; }
    .hm-filters span { height: 30px; padding: 0 12px; border-radius: 7px; background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); font-size: 12.5px; color: var(--c-muted); display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .hm-filters .search { width: 240px; background: var(--c-sunk); }
    .hm-filters .seg { padding: 0 4px; gap: 2px; background: var(--c-sunk); } .hm-filters .seg i { font-style: normal; padding: 3px 10px; border-radius: 5px; }
    .hm-filters .seg i.on { background: var(--c-surface-2); color: var(--c-text); box-shadow: inset 0 0 0 1px var(--c-line); }
    .hm-cols { display: grid; grid-template-columns: 128px 1fr 170px 120px 90px 84px; align-items: center; gap: 12px; padding: 0 16px; }
    .hm-head { position: absolute; left: 0; top: 158px; width: 1289px; font: 600 11px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; color: var(--c-faint); }
    .hm-queue { position: absolute; left: 0; top: 180px; width: 1289px; }
    .hm-row { --g: 0; position: absolute; left: 0; width: 1289px; height: 76px; border-radius: 10px; background: var(--c-surface); font-size: 13px;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), var(--c-line)), 0 0 calc(var(--g) * 36px) calc(var(--g) * -8px) rgba(255, 206, 74, .55); }
    .hm-row .due { display: flex; align-items: center; gap: 10px; font-weight: 500; white-space: nowrap; }
    .hm-ring { width: 30px; height: 30px; flex: none; transform: rotate(-90deg); }
    .hm-ring circle { fill: none; stroke-width: 3; } .hm-ring .bg { stroke: var(--c-line); } .hm-ring .fg { stroke: var(--yellow); stroke-linecap: round; }
    .hm-row .rv { min-width: 0; }
    .hm-row .rv .t { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 14.5px; white-space: nowrap; }
    .hm-row .rv .t .mono { font: 500 12.5px/1 var(--mono); color: var(--c-muted); }
    .hm-row .rv .m { margin-top: 6px; display: flex; align-items: center; gap: 10px; color: var(--c-muted); font-size: 12.5px; white-space: nowrap; }
    .hm-row .rv .m .mono { font: 500 12px/1 var(--mono); color: var(--c-muted); }
    .hm-row .rv .m .reason { --g: 0; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-muted)); }
    .hm-row .c { color: var(--c-muted); white-space: nowrap; }
    .hm-row .open { justify-self: end; height: 28px; padding: 0 12px; border-radius: 7px; box-shadow: inset 0 0 0 1px var(--c-line); display: inline-flex; align-items: center; gap: 6px; font-weight: 500; white-space: nowrap; }
    .hm-count { display: inline-block; margin-left: 8px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: var(--yellow); color: #111; font: 600 11px/18px var(--sans); text-align: center; vertical-align: 1px; }
    .hm-answered { position: absolute; left: 0; top: 380px; width: 1289px; }
    .hm-arow { height: 60px; }
    .hm-arow .rv .t { font-size: 14px; }

    .hm-tray { position: absolute; border-radius: 12px; background: var(--c-surface); padding: 16px 20px 18px; display: flex; flex-direction: column; gap: 11px; font-size: 13.5px;
      box-shadow: inset 0 0 0 1px var(--c-line), -24px 0 70px rgba(0, 0, 0, .6); }
    .hm-tray .hd { display: flex; align-items: center; gap: 12px; font: 600 18px/1 var(--sans); letter-spacing: -.01em; }
    .hm-tray .hd .mono { margin-left: auto; font: 500 12.5px/1 var(--mono); color: var(--c-muted); }
    .hm-sec { --g: 0; border-radius: 9px; background: var(--c-sunk); padding: 11px 14px 12px;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), var(--c-line)), 0 0 calc(var(--g) * 30px) calc(var(--g) * -8px) rgba(255, 206, 74, .5); }
    .hm-sec .l { font: 600 11px/1 var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--c-faint); }
    .hm-sec .t { margin-top: 8px; display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; }
    .hm-sec .t .mono { font: 500 12.5px/1 var(--mono); color: var(--c-muted); }
    .hm-kv { display: flex; align-items: center; gap: 22px; margin-top: 8px; color: var(--c-muted); white-space: nowrap; }
    .hm-kv b { color: var(--c-text); font-weight: 600; font-variant-numeric: tabular-nums; }
    .hm-kv .fp-chip { margin-left: 4px; }
    .hm-bar { margin-top: 9px; height: 6px; border-radius: 3px; background: var(--c-line); overflow: hidden; }
    .hm-bar i { display: block; height: 100%; width: 0; border-radius: 3px; background: var(--yellow); }
    .hm-sec .mt { margin-top: 7px; color: var(--c-muted); font-size: 12.5px; }
    .hm-risks { margin-top: 8px; display: flex; flex-direction: column; gap: 4px; font-size: 13.5px; }
    .hm-btns { display: flex; gap: 14px; align-items: flex-start; }
    .hm-btns .cap { margin-top: 6px; font-size: 12px; color: var(--c-muted); max-width: 300px; line-height: 1.3; }
    .hm-btn { height: 38px; padding: 0 18px; border-radius: 8px; display: inline-flex; align-items: center; font: 600 13.5px/1 var(--sans); background: var(--yellow); color: #111; white-space: nowrap; }
    .hm-btn.ghost { background: transparent; box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-text); }
    .hm-btn.ghost.on { background: var(--yellow); color: #111; box-shadow: none; }
    .hm-field { min-height: 50px; border-radius: 8px; background: var(--c-bg); box-shadow: inset 0 0 0 1px var(--c-line); padding: 10px 12px; line-height: 1.4; }
    .hm-field .ph { color: var(--c-faint); }
    .hm-field .caret { display: inline-block; width: 1.5px; height: 15px; background: var(--c-text); vertical-align: -2px; margin-left: 1px; }
    .hm-indep { --g: 0; line-height: 1.45; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-muted)); }

    .hm-life { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; pointer-events: none; }
    .hm-life > svg { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    .hm-life .base { stroke: rgba(241, 241, 241, .22); stroke-width: 2; fill: none; }
    .hm-life .ring { fill: #000; stroke: rgba(241, 241, 241, .5); stroke-width: 2; }
    .hm-life .step { --g: 0; position: absolute; width: 280px; margin-left: -140px; text-align: center; }
    .hm-life .step .n { font: 700 32px/1.1 var(--sans); letter-spacing: -.02em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
    .hm-life .step .s { margin-top: 8px; font: 500 21px/1.3 var(--sans); color: var(--soft-grey); }
    .hm-life .who { position: absolute; width: 44px; height: 44px; margin: -74px 0 0 -22px; }
    .hm-life .who .person { fill: none; stroke: var(--yellow); stroke-width: 2; }
    .hm-life .who svg { filter: drop-shadow(0 0 10px rgba(255, 206, 74, .8)); }
  `);

  const ringSVG = (k) => `<svg class="hm-ring" viewBox="0 0 30 30"${k ? ` data-k="${k}"` : ''}><circle class="bg" cx="15" cy="15" r="12.5"/><circle class="fg" cx="15" cy="15" r="12.5"/></svg>`;
  /** Fills a countdown ring to fraction p (1 = the whole window left). */
  function ring(svg, p) {
    const c = 2 * Math.PI * 12.5, fg = svg.querySelector('.fg');
    fg.style.strokeDasharray = `${c} ${c}`;
    fg.style.strokeDashoffset = (c * (1 - M.clamp(p))).toFixed(2);
  }

  /** The Human page in the console frame: the four figures, the filter bar and the Waiting columns. */
  function page(parent, opts = {}) {
    const tab = opts.tab || 'Waiting';
    const frame = Film.console(parent, Object.assign({ crumb: 'Verify › Human', tabs: ['Waiting', 'Answered'], tab, status: 'Nothing needs attention' }, opts.frame || {}));
    const on = frame.el.querySelector('.left .it.on');
    const count = M.html('<span class="hm-count"></span>');
    if (on) on.appendChild(count);
    const r = M.mount(frame.page, `<div class="hm-stats" data-k="stats">
      <div class="hm-stat"><div class="l">Waiting</div><div class="v" data-k="waiting">0</div><div class="d">for a person</div></div>
      <div class="hm-stat"><div class="l">Answered this period</div><div class="v" data-k="answered">1</div><div class="d">Same as the prior period</div></div>
      <div class="hm-stat"><div class="l">Halts in effect</div><div class="v" data-k="halts">None</div><div class="d">&nbsp;</div></div>
      <div class="hm-stat"><div class="l">Median time to decide</div><div class="v" data-k="median">14 min</div><div class="d">Down 3 min from 17 min</div></div></div>`);
    M.mount(frame.page, `<div class="hm-filters"><span class="search">Subject, event id or control</span><span>Any pattern ▾</span><span>Any control ▾</span><span>Any queue ▾</span><span>Anyone holding ▾</span><span class="seg"><i class="on">List</i><i>Board</i></span></div>`);
    M.mount(frame.page, `<div class="hm-head hm-cols"><span>Deadline</span><span>Review</span><span>Queue</span><span>Holder</span><span>Age</span><span></span></div>`);
    const queue = M.mount(frame.page, `<div class="hm-queue" data-k="queue"></div>`).queue;
    const A = ANSWERED;
    M.mount(frame.page, `<div class="hm-answered"><div class="hm-head hm-cols" style="top:0"><span>Outcome</span><span>Answered this period</span><span>Decided by</span><span>Deadline</span><span>Took</span><span></span></div>
      <div class="hm-row hm-cols hm-arow" style="top:22px">
        <div>${Film.chip(A.outcome)}</div>
        <div class="rv"><div class="t"><span>${A.title}</span><span class="mono">${A.id}</span></div><div class="m">${Film.chip(A.pattern)}<span class="mono">${A.control}</span></div></div>
        <div class="c">${A.by}</div><div>${Film.chip('Kept')}</div><div class="c">${A.took}</div><div class="open">Open <b>→</b></div></div></div>`);
    return { frame, page: frame.page, stats: { waiting: r.waiting, answered: r.answered, halts: r.halts, median: r.median }, count, queue };
  }

  /** One Waiting row for an event. */
  function row(parent, ev, { y = 0, k } = {}) {
    const r = M.mount(parent, `<div class="hm-row hm-cols" style="top:${y}px"${k ? ` data-k="${k}"` : ''}>
      <div class="due">${ringSVG('ring')}<span data-k="due">${ev.due}</span></div>
      <div class="rv">
        <div class="t"><span data-k="subject">${ev.title}</span><span class="mono">${ev.id}</span>${Film.chip(ev.status, { k: 'status' })}</div>
        <div class="m">${Film.chip(ev.pattern, { k: 'pattern' })}<span class="mono">${ev.control}</span><span class="reason" data-k="reason">${ev.reason}</span></div></div>
      <div class="c">${ev.queue}</div><div class="c">${ev.holder || '—'}</div><div class="c">${ev.age}</div>
      <div class="open" data-k="open">Open <b>→</b></div></div>`);
    ring(r.ring, ev.ring);
    return r;
  }

  /** The event tray, showing only what the event carries: the report's score against the threshold, the consensus
      risks and the control's check, the minimum review, the two buttons with their effects, the reason, the independence rule. */
  function tray(parent, ev, { x = 650, y = 0, w = 639 } = {}) {
    const r = M.mount(parent, `<div class="hm-tray" style="left:${x}px;top:${y}px;width:${w}px" data-k="root">
      <div class="hd">Your decision ${Film.chip(ev.status)}<span class="mono">${ev.id}</span></div>
      <div class="hm-sec" data-k="report"><div class="l">The report</div><div class="t">${ev.title}<span class="mono">${ev.id}</span></div>
        <div class="hm-kv"><span>Score <b>${ev.overall.toFixed(1)} of 10</b>, threshold <b>${ev.threshold.toFixed(1)}</b></span><span>Recommendations <b>3</b></span></div></div>
      <div class="hm-sec" data-k="evidence"><div class="l">Consensus risks</div>
        <div class="hm-risks">${ev.risks.map((s) => `<div>${s}</div>`).join('')}</div>
        <div class="mt">The control's check: ${ev.check}</div></div>
      <div class="hm-sec" data-k="min"><div class="l">Minimum review time · ${ev.minReview} seconds</div><div class="hm-bar"><i data-k="bar"></i></div><div class="mt" data-k="minText">Looked at for 0 s of ${ev.minReview} s</div></div>
      <div class="hm-btns"><div><span class="hm-btn" data-k="approve">Approve release</span><div class="cap">${ev.effects.approve}</div></div>
        <div><span class="hm-btn ghost" data-k="reject">Reject</span><div class="cap">${ev.effects.reject}</div></div></div>
      <div class="hm-field" data-k="reasonBox"><span class="ph" data-k="ph">The reason is recorded with the decision.</span><span data-k="reasonText"></span><span class="caret" data-k="caret"></span></div>
      <div class="hm-indep" data-k="indep">${ev.queue} may decide this event. The person who submitted the proposal is kept out of the decision.</div></div>`);
    r.at = function ({ review = 0, chosen = null, reason = '', open = 1 } = {}) {
      const s = M.clamp(review, 0, ev.minReview), met = review >= ev.minReview;
      r.bar.style.width = (100 * s / ev.minReview).toFixed(1) + '%';
      const txt = met ? 'Minimum review time met.' : `Looked at for ${Math.floor(s)} s of ${ev.minReview} s`;
      if (r.minText.textContent !== txt) r.minText.textContent = txt;
      r.approve.style.opacity = met && chosen !== 'reject' ? 1 : 0.4;
      r.reject.style.opacity = met && chosen !== 'approve' ? 1 : 0.4;
      r.reject.classList.toggle('on', chosen === 'reject');
      r.approve.classList.toggle('ghost', chosen === 'reject');
      r.ph.style.display = reason ? 'none' : '';
      if (r.reasonText.textContent !== reason) r.reasonText.textContent = reason;
      r.caret.style.display = chosen ? '' : 'none';
      r.root.style.opacity = M.clamp(open * 2).toFixed(3);
      r.root.style.transform = `translateX(${((1 - M.clamp(open)) * 40).toFixed(1)}px)`;
    };
    return r;
  }

  const STEPS = [['Raised', 'by the control'], ['Claimed', 'by a reviewer'], ['Decided', 'with a reason'], ['Applied', 'to the review'], ['Kept', 'as a record']];
  /** The five-step lifecycle rail at stage size. */
  function lifecycle(parent, { x0 = 240, x1 = 1680, y = 440 } = {}) {
    const root = M.html('<div class="hm-life"></div>');
    parent.appendChild(root);
    const svg = M.html('<svg viewBox="0 0 1920 1080"></svg>');
    root.appendChild(svg);
    const base = M.svg('line', { class: 'base', x1: x0, x2: x1, y1: y, y2: y }, svg);
    const xs = STEPS.map((_, i) => x0 + (i * (x1 - x0)) / (STEPS.length - 1));
    const rings = xs.map((x) => M.svg('circle', { class: 'ring', cx: x, cy: y, r: 20 }, svg));
    const steps = STEPS.map(([n, s], i) => M.mount(root, `<div class="step" style="left:${xs[i]}px;top:${y + 44}px"><div class="n">${n}</div><div class="s">${s}</div></div>`).root);
    const who = M.html(`<div class="who" style="top:${y}px">${PERSON}</div>`);
    root.appendChild(who);
    return {
      el: root, base, steps, rings, xs, who,
      at(p) {
        const on = p >= 0;
        who.style.opacity = on ? 1 : 0;
        if (on) {
          const q = M.clamp(p, 0, STEPS.length - 1), i = Math.floor(q), f = q - i;
          who.style.left = M.lerp(xs[i], xs[Math.min(i + 1, STEPS.length - 1)], f).toFixed(1) + 'px';
        }
        steps.forEach((st, i) => {
          const lit = on && p >= i - 0.02;
          const g = on ? M.clamp(1 - Math.abs(p - i) * 1.6) : 0;
          st.style.setProperty('--g', g.toFixed(3));
          st.style.opacity = lit ? 1 : 0.5;
          rings[i].style.stroke = lit ? 'rgba(255,206,74,1)' : 'rgba(241,241,241,.5)';
          rings[i].style.fill = lit ? 'rgba(255,206,74,.18)' : '#000';
          rings[i].style.filter = g > 0.01 ? `drop-shadow(0 0 ${(10 * g).toFixed(1)}px rgba(255,206,74,.8))` : '';
        });
      },
    };
  }

  Film.human = { HELD, BLOCKED, STEPS, page, row, ring, tray, lifecycle, PERSON };
})();
