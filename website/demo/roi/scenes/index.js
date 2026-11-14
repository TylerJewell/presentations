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

/* { id, act, title, duration, say } */
window.FILM_SCENES = [
  { id: '1.1', act: 0, title: 'The claim', duration: 14,
    say: 'The fully loaded cost of an AI system on Akka is a fraction of the cost on a hyperscaler or an assembled open-source stack. Fully loaded means infrastructure, licences, integration and people.' },

  { id: '2.1', act: 0, title: 'This has worked in practice', duration: 51,
    say: 'This has worked in practice. Fox: cores from one hundred fifty thousand to twenty-two thousand, about forty percent lower cost per session, three times the velocity. Verizon: infrastructure and cloud costs down seventy percent. Manulife: three hundred percent more concurrency, ninety-nine point nine eight percent fewer errors, eighty percent better latency. Swiggy: P99 latency from one hundred forty-four to seventy-one milliseconds, at over five thousand predictions a second. Dojo: recent college graduates delivered a regulated AI system in weeks. A major bank: decades-old core payments modernized in months. A top-three Asia-Pacific bank: two regions, recovery time from eight hours to five minutes. Akka: cost per token down seventy-three percent in six months, and each engineer from one service to four point three in a year.' },
  { id: '2.2', act: 0, title: 'The question', duration: 5,
    say: 'How did Akka achieve these results?' },

  { id: '3.1', act: 0, title: 'How the vendor charges', duration: 17,
    say: 'Hyperscalers charge for consumption: every request, token and trace adds to the bill, so cost grows with success and is hard to forecast. Akka charges a flat annual fee, known in advance, and extra use adds only the hardware it runs on.' },

  { id: '4.1', act: 0, title: 'What it runs on', duration: 26,
    say: 'Akka runs the whole stack on the lowest-priced hardware: compute, storage and network. Inference, AI controls, model routing, small language model training, agent execution, memory, workflows, messaging, gateway, governance, observability and evaluation all run there. Hyperscalers take their margin above that layer, on metered managed services: agent runtime, memory, gateway, observability, evaluation and policy, each billed by the unit. That is most of the bill.' },

  { id: '5.1', act: 0, title: 'How well the code uses the hardware', duration: 29,
    say: 'Interpreted languages carry a memory overhead for every session, and their concurrency models limit how many run on a node. Akka runs each session as a small actor, so one node holds many waiting sessions. Sessions, agents, evaluations, guardrails, workflows, endpoints, data queries and timers all run as actors. A cluster spreads them by key and rebalances when a node leaves. No state is lost, and the sessions continue.' },

  { id: '6.1', act: 0, title: 'Layers that share one runtime', duration: 19,
    say: 'Assembled frameworks are allocated and managed separately, each keeping its own headroom, which is paid for and unused. In Akka, everything that runs as an actor shares one compute model: agents, evaluations, guardrails, workflows, endpoints, data queries and timers draw on one pool, so capacity goes to whichever part needs it.' },
  { id: '6.2', act: 0, title: 'Memory', duration: 20,
    say: 'Akka’s memory uses event-sourced entities: every change is recorded in a journal, and all data is cached in memory. A system recovers from the journal, runs active in two regions at once with a short recovery time and recovery point, and reads and writes AI memory in low single-digit milliseconds.' },

  { id: '7.1', act: 0, title: 'Integration', duration: 23,
    say: 'Hyperscalers sell these functions as separate products, each its own layer, and the customer pays to wire them together. Akka ships the whole stack as one piece, already joined, including training, agent execution and memory. No licences to retain for event streaming, a cache, messaging, workflow orchestration, a gateway, AI governance, observability, evaluation or red teaming.' },

  { id: '8.1', act: 0, title: 'Model spend', duration: 33,
    say: 'Model spend is its own cost area. Cost per token moves with volume, model mix, prompt size, cache use, response size and price. The console finds avoidable cost: prompts that skip the cache, failed attempts, duplicate requests, reasoning above the median, unused tool definitions, answers longer than needed. A cheaper model is proposed only when it meets the owner’s quality bar, and the ledger keeps the estimated saving beside what was measured. Over six months, Akka’s own cost per token fell seventy-three percent.' },

  { id: '9.1', act: 0, title: 'Specify: who can take part', duration: 24,
    say: 'Specify accepts requirements as they already exist: hand drawings, spreadsheets, issue lists and broad descriptions. Engineers, ML engineers, product managers, analysts and executives all take part in writing the specification. The people who know the business contribute to the system directly. Each requirement is captured by whoever holds it, so fewer handoffs sit between the business and the engineer.' },
  { id: '9.2', act: 0, title: 'Specify: built the same way, read the same way', duration: 25,
    say: 'Specify builds every system on a standard architecture from a specification that holds its purpose, exit conditions and definition of done. Every system is built the same way, so it can be read the same way, and what it is for is written in the specification. An engineer who has never seen a system finds its purpose in the specification, not in the code.' },
  { id: '9.3', act: 0, title: 'Specify: the knowledge stays with the system', duration: 17,
    say: 'When a key engineer leaves, the knowledge stays with the system. Akka’s context holds current best practice, and Specify re-aligns existing systems as it changes, so technical debt does not build up. Fewer engineers maintain more systems.' },

  { id: '10.1', act: 0, title: 'The claim, again', duration: 24,
    say: 'A flat fee, the lowest-priced hardware, an efficient runtime, shared compute, an integrated stack, lower model spend and spec-driven development add up. The fully loaded cost of an AI system on Akka is a fraction of the cost on a hyperscaler or an assembled open-source stack. No additional licences are needed to design, build, test, run or govern AI systems.' },
  { id: '10.2', act: 0, title: 'The final slide', duration: 13,
    say: 'Bring one AI system you run today, and we will compare its fully loaded cost on Akka against your current stack, covering infrastructure, licences, integration and people.' },
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
