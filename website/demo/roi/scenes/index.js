/* The timeline: every scene in storyboard order with its title, duration (seconds; this film has no chapter
   cards) and its narration `say`. This is the one place scenes are registered; a scene file holds only
   render(root) and at(t) and registers through Roi.register. narration.json and sentences/narration.json are
   written from `say` by render/narration.mjs. Loaded by index.html with plain script tags, so the film runs
   from file://.

   The film: the claim (1.1), the proof section with every customer result (2.1), the question (2.2), the
   cost areas in the order a bill is read (3.1 to 9.3), the claim again (10.1) and the final slide (10.2).
   A cost area is never called a line.

   The talk track is written for the voice at about 2.9 words a second with 0.7 s between sentences and a
   1.0 s tail (film/pacing.config.json). Each duration is that estimate, rounded up, or the time the scene's
   animation or a held slide needs if that is longer; the voiced render takes its timing from the clips. */
window.MOCK_ACTS = {
  0: { kicker: 'Akka total cost', label: 'Akka', short: 'Akka', card: false },
};

/* { id, act, roi, title, duration, say }
   roi: the corner takeaway, [direction, outcome]: 'down' for a cost that falls, 'up' for a capacity that rises.
   No figure appears in it. 2.1 sets one per customer card instead (CARDS in scenes/2.1.js). */
window.FILM_SCENES = [
  { id: '1.1', act: 0, roi: ['down', 'Total cost of ownership'], title: 'The claim', duration: 14,
    say: 'The fully loaded cost of an AI system on Akka is a fraction versus a hyperscaler or an assembled open-source stack. This is the combined cost across infrastructure, licenses, integration and people.' },

  { id: '2.1', act: 0, title: 'This has worked in practice', duration: 51,
    say: 'We\'ve seen many accounts report significant gains. Fox built a hyper-personalization system whose cores dropped from 150,000 to 22,000 after porting from Python to Akka. Verizon\'s infrastructure and cloud costs dropped by 70% due to our actor-based concurrency. At Manulife, they ported their LangChain agents to Akka and saw a 300% concurrency improvement and 99% drop in error rates. Swiggy improved multi-user concurrency watching their P99 latency drop from one hundred forty-four to seventy-one milliseconds at over five thousand predictions a second. Dojo was able to hire college graduates without any prior enterprise experience, and they delivered a regulated AI system in weeks. We helped a global, major bank port a decades-old payments system from mainframe to microservices in a few months.' },
  { id: '2.2', act: 0, title: 'The question', duration: 5,
    say: 'How did Akka achieve these results?' },

  { id: '3.1', act: 0, roi: ['up', 'Budget predictability'], title: 'How the vendor charges', duration: 19,
    say: 'The hyperscalers charge for consumption: they measure every request, token and trace and then add it to your bill. Your cost grows with success and is hard to forecast. Akka charges a flat annual fee and extra use adds additional underlying hardware, but no additional Akka charges.' },

  { id: '4.1', act: 0, roi: ['down', 'Infrastructure cost'], title: 'What it runs on', duration: 28,
    say: 'Akka runs our stack on the lowest-priced hardware: compute, storage and network. Your inference, AI controls, model routing, small language model training, agent execution, memory, workflows, messaging, governance, observability and evaluations all run on the same shared infrastructure. The hyperscalers, however, make their best margin on the managed AI services that they sell: agent runtime, memory, gateway, observability, evaluation and policy are designed to have extra overhead and cost more per request.' },

  { id: '5.1', act: 0, roi: ['up', 'Hardware efficiency'], title: 'How well the code uses the hardware', duration: 34,
    say: 'Interpreted languages like Python carry a memory overhead for every session, and their concurrency models limit how many run on a node. Akka runs each session as a small actor, so a single Akka node holds millions of concurrent executions against a common shared compute. In Akka, sessions, agents, evaluations, guardrails, workflows, endpoints, data queries and timers all run as actors on the same node.  Akka\'s clustering spreads them across nodes and rebalances when a node leaves.  State is never lost, and sessions can continue uninterrupted.' },

  { id: '6.1', act: 0, roi: ['down', 'Idle capacity'], title: 'Layers that share one runtime', duration: 26,
    say: 'Assembled frameworks are allocated and managed separately, each keeping its own headroom that remains unused but something you still paid for.  When you assemble multiple open source frameworks together, each makes a separate overhead allocation that compounds waste. In Akka, all of your services are running on the same shared compute model, and some customers run their nodes at nearly 95% utilization leading to significant efficiencies.' },
  { id: '6.2', act: 0, roi: ['down', 'Data infrastructure'], title: 'Memory', duration: 20,
    say: 'Akka’s memory uses event-sourced entities: every change is recorded in a journal, and system of record data is accessible in memory. This creates the potential to recover any data from any point in time, and then read-write access to data is in low single-digit milliseconds without you needing to install a cache.' },

  { id: '7.1', act: 0, roi: ['down', 'License spend'], title: 'Integration', duration: 24,
    say: 'Hyperscalers sell these functions as separate products, each its own layer, and you are responsible for integrating the different layers together. Akka ships the whole stack as one piece, already integrated, including orchestration, agent execution and memory. You do not need to acquire additional licenses for event streaming, caching, messaging, workflow orchestration, gateways, AI governance, observability, evaluations or red teaming.' },

  { id: '8.1', act: 0, roi: ['down', 'Model spend'], title: 'Model spend', duration: 33,
    say: 'Akka works an optimization loop seeking for places to lower the cost of tokens.  We search for avoidable costs: prompts that skip the cache, failed attempts, duplicate requests, reasoning above the median, unused tool definitions, or answers that run longer than needed. Akka then executes experiments around SLM training, self-hosting open weight models, making routing configuration changes, or giving feedback to end users in an effort to improve the balance of cost, performance and quality.  Effective optimizations can lead to token reductions of up to 70%.' },

  { id: '9.1', act: 0, roi: ['up', 'Delivery velocity'], title: 'Specify: who can take part', duration: 30,
    say: 'Akka Specify runs a software factory for each of your projects. Your engineers, product managers, analysts and executives bring requirements as they already exist: hand drawings, spreadsheets, issue lists and broad descriptions. The factory writes the code, runs the system and checks it, and your people only make the decisions that need an understanding of your business. That means fewer handoffs between the business and engineering, and fewer people needed to get a system into production.' },
  { id: '9.2', act: 0, roi: ['down', 'Review and rework cost'], title: 'Specify: built the same way, read the same way', duration: 35,
    say: 'Your organization sets its privacy, security, architecture and risk standards once, as exit conditions, and every factory checks them automatically. A system arrives at review having already passed the reviews you defined, so your reviewers read one complete record instead of running another cycle. When a system already exists, the original becomes the answer key, and every build is checked against it, so any drift fails the build months before acceptance testing. A global insurer rebuilt a 20-year-old underwriting calculator in under a week, matching the original case for case.' },
  { id: '9.3', act: 0, roi: ['down', 'Maintenance cost'], title: 'Specify: the knowledge stays with the system', duration: 36,
    say: 'Every system is designed from Akka components and documented by its factory, so an engineer who joins later reads what the system is for in its specification, not in the code. When a key engineer leaves, the knowledge stays with the system, and Specify keeps your existing systems current with best practice, so technical debt does not build up. Because each project runs its own factory, many run at once: we ported 65 open-source projects to Akka in parallel this way. The roadmap you planned for 2028 and 2029 can be delivered in 2027.' },

  { id: '10.1', act: 0, roi: ['down', 'Total cost of ownership'], title: 'The claim, again', duration: 24,
    say: 'A flat fee, the lowest-priced hardware, an efficient runtime, shared compute, an integrated stack, lower model spend and spec-driven development all add up. The fully loaded cost of an AI system on Akka is a fraction versus a hyperscaler or an assembled open-source stack. You do not need to acquire additional licenses to design, build, test, run or govern your AI systems.' },
  { id: '10.2', act: 0, title: 'The final slide', duration: 13,
    say: 'Bring us one AI system you run today, and we will compare its fully loaded cost on Akka against your current stack, across infrastructure, licenses, integration and people.' },
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
