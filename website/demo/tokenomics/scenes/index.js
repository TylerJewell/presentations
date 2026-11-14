/* The timeline: every scene in storyboard order with its act, title, duration (seconds, including the 2.6 s
   chapter card that opens Acts 1 to 4) and its narration `say`, verbatim from storyboard.md. This is the one
   place scenes are registered; a scene file holds only render(root) and at(t) and registers through
   Tok.register(id). narration.json is written from `say` by render/narration.mjs.
   Loaded by index.html with plain script tags, so the film runs from file://. */
window.MOCK_ACTS = {
  0: { kicker: 'Tokenomics in Akka', label: 'Opening', short: 'Open', card: false },
  1: { kicker: 'Spend', label: 'Spend', title: 'What did we spend?', card: true },
  2: { kicker: 'Savings', label: 'Savings', title: 'What can we save?', card: true },
  3: { kicker: 'Decisions', label: 'Decisions', title: 'Decide, and prove it', card: true },
  4: { kicker: 'Control', label: 'Control', title: 'Stay in control', card: true },
  5: { kicker: 'Akka', label: 'Close', short: 'Close', card: false },
};

/* { id, act, title, duration, q, say }: q is the executive's question the scene answers (null for none). */
window.FILM_SCENES = [
  { id: '0.1', act: 0, title: 'The pressure', duration: 14, q: null,
    say: 'The cost of intelligence falls ten times a year. Demand rises faster. So executives keep asking the same questions about where the money goes.' },
  { id: '0.2', act: 0, title: 'Seven questions', duration: 16, q: null,
    say: 'Those answers shouldn’t live in a spreadsheet someone builds later. In Akka they sit right next to the system. Here are seven questions, in the order a finance leader asks them.' },

  { id: '1.1', act: 1, title: 'Cost to date and the plan', duration: 22.6, q: 'What did we spend, and are we on plan?',
    say: 'The Overview starts with four figures: cost to date, the projected cost at period end against the owner’s budget, realized savings, and potential savings. Click one, and you are in the analysis behind it.' },
  { id: '1.2', act: 1, title: 'Where the money went', duration: 20, q: 'Where did the money go?',
    say: 'Costs breaks the same money down by use case, model, team, app, or any tag. The whole setup lives in the address, so a finance lead can bookmark it. And usage without a price is footnoted, never hidden.' },
  { id: '1.3', act: 1, title: 'The cost bridge', duration: 30, q: 'What changed since the last period, and why?',
    say: 'Compare two periods and it reads like a financial statement. Cost rose by one hundred four dollars and seventy cents, and the bridge shows why: volume, model mix, prompt size, cache use, response size and price. The pieces add up to the cent. And one use case, ticket triage, nearly tripled after a model change.' },

  { id: '2.1', act: 2, title: 'Avoidable cost', duration: 24.6, q: 'What is avoidable?',
    say: 'Savings finds avoidable cost: prompts that skip the cache, failed attempts, duplicate requests, reasoning above the median, unused tool definitions, and answers that run long. Each opportunity shows a saving range, its quality risk, and the evidence behind it.' },
  { id: '2.2', act: 2, title: 'The same traffic on another model', duration: 20, q: 'What would this traffic cost on another model?',
    say: 'Pick a model and the console prices the period’s real traffic on it. A new price list works the same way: you see the effect, model by model, before anything is published.' },
  { id: '2.3', act: 2, title: 'The frontier and the quality bar', duration: 32, q: 'If we move, does quality hold?',
    say: 'For each use case, the frontier plots cost against pass rate. The owner sets the quality bar: a reference model, a judge, a tolerance, and hard gates that come from Verify. A cheaper model is only proposed when it clears the bar. Here the smaller model costs under a fifth as much and passes at ninety point two percent against ninety-one point six.' },

  { id: '3.1', act: 3, title: 'A staged change with a stop rule', duration: 26.6, q: 'Who decides, and when does it stop?',
    say: 'A change is tried on recorded traffic first, then staged. The owner sets the stop rule in advance, so a failing rollout halts on its own, and nobody gets paged. Continue and Keep each record who decided, and why.' },
  { id: '3.2', act: 3, title: 'The ledger', duration: 18, q: 'Did the saving happen?',
    say: 'The ledger keeps the estimate next to what was actually measured. Four changes landed within their estimates. One fell short, and the ledger says so.' },

  { id: '4.1', act: 4, title: 'Budgets', duration: 30.6, q: 'Are we on plan?',
    say: 'Every budget has an owner, a plan to date, and a forecast with its range, and it names the day the money runs out. The owner sets the thresholds in advance: notify, reroute, or block.' },
  { id: '4.2', act: 4, title: 'Self-hosting and prices', duration: 18, q: 'Does self-hosting pay, and do the prices match?',
    say: 'If you host a model yourself, the worksheet gives you an assigned price, utilization, and break-even. And Prices shows what is in force and what is not costed, so every figure traces back to a price.' },

  { id: '5.1', act: 5, title: 'One loop', duration: 14, q: null,
    say: 'Cost is one part of one loop. A change is specified, built, verified, and run on the right model, with one evidence record behind it.' },
  { id: '5.2', act: 5, title: 'Answers', duration: 10, q: null,
    say: 'Seven questions, answered where the work happens.' },
];

window.MOCK_ORDER = window.FILM_SCENES.map((s) => s.id);

(function () {
  if (typeof document === 'undefined') return;
  const base = document.currentScript.src.replace(/index\.js(\?.*)?$/, '');
  window.MOCK_ORDER.forEach((id) => {
    const s = document.createElement('script');
    s.src = base + id + '.js';
    s.async = false;
    s.onerror = () => console.error(`scene file scenes/${id}.js failed to load`);
    document.head.appendChild(s);
  });
})();
