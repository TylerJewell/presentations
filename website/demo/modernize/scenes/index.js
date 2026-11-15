/* The timeline: every scene in storyboard order with its title, duration (seconds; this film has no chapter
   cards) and its narration `say`. This is the one place scenes are registered; a scene file holds only
   render(root) and at(t) and registers through Fx.register. narration.json, sentences/narration.json and
   durations.json are written from this file by render/narration.mjs. Loaded by index.html with plain script
   tags, so the film runs from file://.

   The film opens with what a software factory is, what makes its output production-ready and the two ways a
   factory starts (1.1 to 1.6). It then follows one system, an illustrative freight-rating engine, through its own
   factory's five stations (Discover, Decide, Specify, Build, Release) until its twin runs in pre-production (2.1 to
   8.1), shows many projects' factories running in a loop (8.2), and widens to every idea on an organization's
   roadmap (9.1 to 9.4). The narration is the owner's script (script.md). Each duration is the narration at 2.6
   words a second with 1.0 s between sentences and a 1.6 s tail, or the time the animation needs if that is
   longer; the voiced render takes its timing from the clips. */
window.MOCK_ACTS = {
  0: { kicker: 'Modernizing with Akka Specify', label: 'Akka Specify', short: 'Akka Specify', card: false },
};

/* { id, act, title, duration, say } */
window.FILM_SCENES = [
  { id: '1.1', act: 0, title: "The question", duration: 19,
    say: "AI can write code in minutes. But an enterprise needs a system it trusts before it can go into production. A production system is complete, tested, and adheres to its corporate privacy, security, architecture and risk standards." },
  { id: '1.2', act: 0, title: "A software factory", duration: 30,
    say: "Akka Specify creates and runs software factories for your IT initiatives. Each factory builds its system end to end: it writes the code, runs the system, and validates it against every corporate policy. You make decisions that only people with an understanding of your business should make: what the system is for, how to deal with ambiguity, and what must pass before a release can be made." },
  { id: '1.3', act: 0, title: "What makes it production-ready", duration: 32,
    say: "Four things make systems created with Akka Specify production-ready. Every fact a factory uses to design a system is traced and recorded in a reusable specification. Every behaviour is checked against the original system, if one exists. Every review the enterprise requires is an exit condition, checked automatically by auditors. And it runs on Akka's platform, inside your own network, with Akka's guarantees for resilience and scalability." },
  { id: '1.4', act: 0, title: "Factories at work in regulated environments", duration: 29,
    say: "Akka has delivered factories that work in multiple regulated environments. At a regulated payments provider, recent college graduates put an AI system into production in weeks. A global insurer rebuilt a twenty-year-old underwriting calculator in under a week, matching the original case for case. A Fortune 200 financial services firm moved its payments off a forty-year-old mainframe in a couple of months." },
  { id: '1.5', act: 0, title: "Two ways to start", duration: 38,
    say: "A factory can start from an idea or from a system that already exists. From an idea, discovery turns user requirements, support history and an analysis of peers and rivals into the specification of a new system, an AI system or any other. From an existing system, the factory ports or modernizes it, and the original becomes the framework for validating and proving that the new system is a behavioral match. Both paths end in the same place: a tested system ready for production." },
  { id: '1.6', act: 0, title: "What this film shows", duration: 17,
    say: "Let's see how Akka Specify works by following the modernization of an existing system, from what it does today to a verified twin in pre-production. The factory has five stations: discover, decide, specify, build and release." },
  { id: '2.1', act: 0, title: "Modernizing a freight-rating engine", duration: 30,
    say: "The system is a freight-rating engine. It prices every shipment a logistics company carries, and it is twenty-two years old. It lives in a tariff book, in the code around it and in a production service, and what it does is known only by running it. We'll do this within Claude Code or your favorite IDE or harness with Akka's AI plugins added." },
  { id: '3.1', act: 0, title: "Discover: what goes in", duration: 24,
    say: "Discovery gathers everything that tells the factory what the system should do. It reads the user requirements, the support tickets of past years, and an analysis of peers and rivals, which suggests capabilities that make sense for this enterprise. When a system already exists, discovery reads it and runs it too." },
  { id: '3.2', act: 0, title: "Discover: what it does today", duration: 24,
    say: "For the freight-rating engine, the sources are the tariff book, the code, production behaviour and the people who run it. Each fact discovery finds is written down with the evidence behind it. A person confirms each fact before anything is built on it, so the rebuild rests only on what is known." },
  { id: '3.3', act: 0, title: "Probes: run the original and watch it", duration: 32,
    say: "A probe is a check that runs the original system and records what it does. Akka Specify ships with numerous probes to identify routes and data, the services it calls, and how it behaves over a sequence of calls, over time, and across the range of an input. A fact a probe exercised is stronger than a fact read in the code, and the record says which kind each fact is." },
  { id: '3.4', act: 0, title: "Analysis: where the sources disagree", duration: 23,
    say: "Analysis lines the sources up and lists every place where ambiguity or a conflict appears. Here, the tariff book and production apply two surcharges in a different order. Each conflict becomes a decision that an owner signs before any code is written, and every difference that remains is recorded." },
  { id: '4.1', act: 0, title: "Decide: the answer key", duration: 25,
    say: "The original system becomes the answer key. Shipments are generated at every weight break, every zone edge and every conflict, and the original prices each one. Parity means the rebuild gives the same price, to the cent, for every one of them. The rebuild's correctness is then measured, shipment by shipment." },
  { id: '5.1', act: 0, title: "Specify: what goes in", duration: 26,
    say: "The specification holds what the system is for: its user stories, its requirements, its measurable success criteria, the owner's decisions and the exit conditions it must pass. An exit condition is a rule a release must meet before it ships. Every requirement cites the finding it rests on, so every line of the specification rests on evidence." },
  { id: '5.2', act: 0, title: "Plan: who builds what, and in what order", duration: 24,
    say: "The plan breaks the specification into tasks and works out which can run at the same time. Tasks that can run together do, across user stories. Each task is matched to a model by risk: the rating rules go to the most capable model, routine components to a faster one." },
  { id: '6.1', act: 0, title: "Build: designed from Akka's components", duration: 26,
    say: "The factory designs this system from Akka's components, chosen and composed for what it must do: endpoints for its callers, a workflow, event-sourced entities that keep every change, and views for queries. The rating rules stay in plain code that can be read and tested on its own. Akka's components combine into any enterprise system." },
  { id: '6.2', act: 0, title: "The documentation it writes", duration: 15,
    say: "The factory also writes this system's documentation: its component graph, its domain model, its state lifecycles, an interaction diagram for every flow, and a reference for every API route." },
  { id: '6.3', act: 0, title: "Integrated testing: every behaviour, every build", duration: 25,
    say: "Tests are written before the code they test. Integration tests run the components on the real runtime, and the answer key runs on every build. If a price drifts from the original, the build fails at that moment, months before acceptance testing. On every build, the rebuild and the original agree." },
  { id: '7.1', act: 0, title: "Release: exit conditions and auditors", duration: 32,
    say: "An organization sets its exit conditions once, and they apply to every project's factory. They say what privacy, security, architecture and risk require of every system the organization releases. An auditor is the automatic check behind each condition. It runs a command, probes the running service or reads the code. A system that passes them has passed the reviews the organization defined, before the reviewers meet." },
  { id: '7.2', act: 0, title: "The record", duration: 18,
    say: "Every requirement is traced to a task and to a test. Every decision, every recorded difference and every model call is kept with the change. The reviewers read one record, and it is complete." },
  { id: '8.1', act: 0, title: "Into the organization's own network", duration: 24,
    say: "Akka's platform runs inside the organization's own network. A release that passes its exit conditions goes straight into pre-production for user acceptance, already active in two regions, with high availability and disaster recovery. The original keeps pricing shipments beside it until the parallel run shows they agree on live traffic." },
  { id: '8.2', act: 0, title: "Many factories, in a loop", duration: 21,
    say: "Specify also runs factories at scale: each project runs as its own factory, and many run at once. Akka ported sixty-five open-source projects at once this way. Specify assesses each factory's performance, measures its cost and improves the next iteration." },
  { id: '9.1', act: 0, title: "Beyond modernization", duration: 20,
    say: "Enterprises come to Akka for an AI platform, and put an innovation engine to work. Modernization is one use of it. Each idea gets a factory of its own, whether it is an AI system or any other IT system." },
  { id: '9.2', act: 0, title: "The roadmap, collapsed", duration: 24,
    say: "Every idea on an organization's roadmap can have its own factory: a new AI system, a new service, or a system that already exists. Specify runs as many factories as there are projects. The roadmap collapses, and the innovation planned for 2028 and 2029 can be delivered in 2027." },
  { id: '9.3', act: 0, title: "Who runs it", duration: 20,
    say: "Running a project's factory takes a product owner's judgement: knowing what the system is for, deciding where the sources disagree, and approving what it must pass. What each system does is kept in its specification, where anyone who joins can read it." },
  { id: '9.4', act: 0, title: "Close", duration: 17,
    say: "Bring one idea from your roadmap, or one system you would like to modernize. We will run it through its own factory with you and show you its specification, its plan and its exit conditions." },
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
