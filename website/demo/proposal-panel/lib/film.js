/* The film's shared facts and components. Every scene registers through Film.register, which takes the
   scene's act, title, duration, narration and chapter-rail question from the timeline in scenes/index.js,
   so a scene file holds only its render(root) and at(t). Everything here is a pure function of t. */
window.Film = (function () {
  const M = Mock;

  /* ---------- facts: one set, so no two scenes disagree ---------- */
  const SYSTEM = { name: 'Proposal Review Panel', id: 'proposal-review-panel', org: 'akka/gsa', team: 'emea/the-config-team', url: 'localhost:9168/ui/' };
  const PERSONAS = [
    { id: 'cfo', role: 'CFO', agent: 'cfo-persona', as: 'Reads as the finance lead', concern: 'Weighs cost and payment terms.', score: 7, risks: 2, criteria: [['Cost', 7], ['Terms', 8], ['Value', 6]] },
    { id: 'cio', role: 'CIO', agent: 'cio-persona', as: 'Reads as the technology lead', concern: 'Weighs technical fit and security.', score: 8, risks: 1, criteria: [['Fit', 8], ['Security', 8], ['Scalability', 7]] },
    { id: 'procurement', role: 'Procurement', agent: 'procurement-persona', as: 'Reads as the procurement lead', concern: 'Weighs terms and supplier risk.', score: 7, risks: 2, criteria: [['Terms', 7], ['Supplier', 6], ['Compliance', 8]] },
    { id: 'ops', role: 'Operations', agent: 'ops-director-persona', as: 'Reads as the operations director', concern: 'Weighs delivery and continuity.', score: 7, risks: 1, criteria: [['Delivery', 7], ['Continuity', 8], ['Staffing', 7]] },
  ];
  const REVIEW = {
    id: 'rev-7c2e91a4',
    scenario: 'Managed Services Proposal (commercial focus)',
    title: 'Managed services, 12 months',
    excerpt: 'We propose a 12-month managed services engagement covering SAP S/4HANA operations for the warehouse mobility platform.',
    text: 'We propose a 12-month managed services engagement covering SAP S/4HANA operations for the warehouse mobility platform.\n\nScope of services:\n- 24/7 monitoring and incident management for all SAP environments\n- Quarterly system optimization reviews with performance tuning\n- Monthly security patching and compliance verification\n- Dedicated service delivery manager with bi-weekly status reporting\n\nPricing:\n- Monthly retainer: £18,500 (year 1)\n- Incident response: 40 tickets a month included, £150 a ticket thereafter\n- Total annual value: £222,000',
    overall: 7.4,
    risks: ['Incident volume above 40 tickets a month raises the price.', 'The delivery team names one security specialist for three environments.', 'Year 2 pricing is not stated.'],
    recommendations: ['Ask for a year 2 price before signing.', 'Ask for a named deputy for the security role.', 'Cap the per-ticket charge at a monthly total.'],
  };
  /* the six commitments in the bundle, as the Controls board reads them */
  const BUNDLE = [
    { id: 'injection', s: 'Every model call is scanned for injection patterns.', comp: 'prompt-injection-guard', kind: 'Preventive' },
    { id: 'jailbreak', s: 'Every input is compared with known jailbreak attempts.', comp: 'jailbreak-guard', kind: 'Preventive' },
    { id: 'pii', s: 'Card numbers, emails, phone numbers and IBANs are masked.', comp: 'sanitizers', kind: 'Preventive' },
    { id: 'format', s: 'Every review has scores from 0 to 10 and a stated rationale.', comp: 'review-quality-guard', kind: 'Preventive' },
    { id: 'quality', s: 'Review quality is judged after every review.', comp: 'review-quality-evaluator', kind: 'Detective' },
    { id: 'release', s: 'A named person approves the release of any weak review.', comp: 'action-approval', kind: 'Authorization' },
  ];
  const QUESTIONS = ['What have we promised?', 'Is the promise signed?', 'Are we keeping it?', 'Who decides when the system cannot?', 'What would an auditor see?'];
  const NOTE = 'Illustrative system and data';

  /* ---------- registration: the timeline fills the scene in ---------- */
  function register(def) {
    const row = (window.FILM_SCENES || []).find((s) => s.id === def.id);
    if (!row) throw new Error(`scene ${def.id} is not in the timeline (scenes/index.js)`);
    def.act = row.act; def.title = row.title; def.duration = row.duration; def.caption = row.say;
    def.q = row.q; if (row.rail === false) def.rail = false;
    const at = def.at;
    def.at = function (t) { at.call(this, t); if (Film.Rail) Film.Rail.at(this, t); };
    registerScene(def);
  }

  /* The note every title and console scene carries, top right of the stage. */
  const note = (parent, text = NOTE) => M.mount(parent, `<div class="fp-note">${text}</div>`).root;

  /* ---------- status chip: a word and its icon; one tone per word ---------- */
  const ICON = {
    check: '<path d="M2.5 7.4l3 3 6-6.5"/>', cross: '<path d="M3.5 3.5l7 7M10.5 3.5l-7 7"/>', clock: '<circle cx="7" cy="7" r="5.2"/><path d="M7 4.2V7l2 1.4"/>',
    dot: '<circle cx="7" cy="7" r="2.6"/>', pen: '<path d="M3 11l1-3.5 6-6 2.5 2.5-6 6z"/>', shield: '<path d="M7 1.8l4.6 1.8v3.4c0 2.8-1.9 4.8-4.6 5.8C4.3 11.8 2.4 9.8 2.4 7V3.6z"/>',
  };
  const CHIPS = {
    Upheld: ['green', 'check'], Passed: ['green', 'check'], Approved: ['green', 'check'], Applied: ['green', 'check'], Kept: ['green', 'check'], Submitted: ['green', 'check'], Completed: ['green', 'check'], Met: ['green', 'check'],
    Breached: ['red', 'cross'], Denied: ['red', 'cross'], Blocked: ['red', 'cross'], Rejected: ['red', 'cross'], Failed: ['red', 'cross'], Halted: ['red', 'cross'],
    'In force': ['cyan', 'shield'], Signed: ['cyan', 'pen'], Linked: ['cyan', 'dot'], Bound: ['cyan', 'dot'],
    Held: ['yellow', 'clock'], Waiting: ['yellow', 'clock'], Reviewing: ['yellow', 'clock'], Changed: ['yellow', 'dot'],
    Rehearsal: ['violet', 'dot'], Draft: ['grey', 'dot'], Preventive: ['grey', 'shield'], Detective: ['grey', 'dot'], Authorization: ['grey', 'pen'],
  };
  /** HTML for a chip. Unknown words are grey with a dot. opts.big for a 22 px chip. */
  function chip(word, opts = {}) {
    const [tone, icon] = CHIPS[word] || ['grey', 'dot'];
    return `<span class="fp-chip ${tone}${opts.big ? ' big' : ''}${opts.cls ? ' ' + opts.cls : ''}"${opts.k ? ` data-k="${opts.k}"` : ''}><svg viewBox="0 0 14 14">${ICON[icon]}</svg>${word}</span>`;
  }

  /* ---------- bundle row ---------- */
  /** A commitment as one sentence with chips at the right. Returns refs {root, s, chips}; glow with --g. */
  function bundleRow(parent, { sentence, chips = [], x = 0, y = 0, w = 1200, k }) {
    const r = M.mount(parent, `<div class="fp-row" style="left:${x}px;top:${y}px;width:${w}px"${k ? ` data-k="${k}"` : ''}>
      <div class="s" data-k="s">${sentence}</div><div class="chips" data-k="chips">${chips.map((c) => (typeof c === 'string' ? chip(c) : chip(c.word, c))).join('')}</div></div>`);
    return r;
  }

  /* ---------- persona card ---------- */
  /** One persona agent; p is an entry of Film.PERSONAS. Glow with Film.glow(el, g); the answer row is refs.ans. */
  function persona(parent, p, { x = 0, y = 0 } = {}) {
    return M.mount(parent, `<div class="fp-persona" style="left:${x}px;top:${y}px" data-k="root">
      <div class="role">${p.role}</div><div class="as">${p.as}</div><div class="concern">${p.concern}</div>
      <div class="ans" data-k="ans"><span>Score ${p.score}</span><i></i><span>${p.risks} risk${p.risks === 1 ? '' : 's'}</span></div></div>`);
  }
  const glow = (el, g) => el.style.setProperty('--g', M.clamp(g).toFixed(3));

  /* ---------- the panel's own dashboard in browser chrome ---------- */
  /** opts: { rect, tab: 'Submit Review' | 'Active Reviews' | 'Review History', url }. Children of the returned page are absolute, in stage px. */
  function app(parent, opts = {}) {
    const [x, y, w, h] = opts.rect || [40, 36, 1840, 940];
    const tabs = ['Submit Review', 'Active Reviews', 'Review History'];
    const r = M.mount(parent, `<div class="fp-app" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
      <div class="chrome"><span class="dots"><i></i><i></i><i></i></span><span class="crumb">Proposal Review <b>›</b> Dashboard</span><span class="url">${opts.url || SYSTEM.url}</span></div>
      <div class="top"><span class="brand">Proposal Review</span><span class="sep"></span><span class="app">Dashboard</span>
        <span class="right"><span class="live"><i></i>Live</span><span class="env">demo</span></span></div>
      <div class="nav" data-k="nav">${tabs.map((n) => `<span${n === (opts.tab || tabs[0]) ? ' class="on"' : ''}>${n}</span>`).join('')}</div>
      <div class="main" data-k="page"></div></div>`);
    return { el: r.root, page: r.page, nav: r.nav, rect: [x, y, w, h] };
  }

  /* ---------- the local console, with this system in its frame ---------- */
  /** Mock.consoleFrame with the panel as the system; same opts and return. */
  function console_(parent, opts = {}) {
    const f = M.consoleFrame(parent, Object.assign({ rect: [40, 36, 1840, 940], system: SYSTEM.id, bundle: 'v1' }, opts));
    const bottom = f.el.querySelector('.bottom span');
    if (bottom) bottom.innerHTML = `<b>${SYSTEM.id}</b> · 1 service running`;
    return f;
  }

  return { SYSTEM, PERSONAS, REVIEW, BUNDLE, QUESTIONS, NOTE, register, note, chip, bundleRow, persona, glow, app, console: console_ };
})();
