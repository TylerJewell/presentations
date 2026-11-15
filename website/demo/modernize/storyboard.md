# Modernizing with Akka Specify: storyboard

A narrated film of about eight and a half minutes. The audience is the owner of a modernization programme: a CIO, a head of
engineering or a chief architect, with risk, security and architecture reviewers in the room. The film takes the time
each idea needs. A term is explained in one plain sentence the first time it appears. The film is built; its frames
are for review, and the voice is not yet recorded.

The film opens with what a software factory is, what makes its output production-ready and the two ways a factory
starts (1.1 to 1.6). It then
follows one existing system through its own factory (2.1 to 8.1), shows Specify running many projects' factories at
once in a loop (8.2), and closes by widening from that one modernization to every idea on an organization's roadmap
(9.1 to 9.4).

## The spine

**One existing system, followed until its twin runs in pre-production.** The system is a freight-rating engine at a
logistics company. It prices every shipment: by weight, by distance zone, by service level, with fuel and remote-area
surcharges. It is twenty-two years old and exists in three forms:
- a tariff book of rate tables in a spreadsheet;
- the code written around that book;
- the production service that the booking system, invoicing and a partner API call thousands of times an hour.

Every scene moves that one system one step further:
- what it does is discovered;
- what it means is decided;
- what it must become is specified;
- it is rebuilt and checked case for case against the original;
- it is audited against the organization's own conditions;
- it is deployed into the organization's own network.

The film's one sentence is: **Akka Specify runs a software factory for each project, which turns an idea or an existing
system into a production-ready system, with every behaviour checked, against the original when there is one, and every enterprise
review already passed.**

Every project is its own factory. The organization sets its standards (its exit conditions and its reviewers) once,
and they apply to every project's factory; Specify runs as many factories as there are projects, at once if needed.

Every system a factory builds is its own design, composed from Akka's components (endpoints, agents, workflows,
entities, views and timers), which combine into any enterprise system.

The close turns the spine outward. Modernization is one use of Specify's factories. Akka is a platform for creating any idea,
an AI system or any other IT system, and it collapses an organization's IT roadmap: the innovation planned for 2028
and 2029 can be delivered in 2027. Two things follow:
- what each system does is written in its specification, so the knowledge stays with the system;
- running a project's factory takes a product owner's judgement: knowing what the system is for, deciding where sources disagree and approving what it must pass.

The freight-rating engine is an illustration, and its figures are round illustrative values. The three results in 1.4
are customers' own, unnamed.

The console screens that appear in the film show Akka's sample loan-origination system, captioned as what the console
shows for that step; the narrative system stays freight rating.

## Running time and pace

| | |
|---|---|
| Length | about 10:15 designed; 8:48 voiced (see the running total) |
| Talk track | at 2.6 words a second |
| Pauses | 1.0 s between sentences, 1.6 s tail per beat, so each idea lands before the next begins |
| Scene durations | The narration estimate rounded up, or the time the animation needs, whichever is longer |

## Scenes

From 3.1 to 8.1, a rail at the foot of every scene holds the factory's five stations: **Discover, Decide, Specify,
Build, Release**. The station the scene is in is lit, and the system moves along the rail to it. In 2.1 the rail is
drawn large.

Most scenes from 3.1 on also show the Akka console's own screen for that step: a hairline-framed screenshot on black,
with a slow pan and zoom and a highlight on the part the sentence is about, captioned "The Akka console" with the
screen's name.

**1.1 The question (19 s, 37 words).**
- **Visual:** black. Lines of code stream in fast from the left, a blur of plausible-looking text. Most of them dim and fall away. At the centre, one sentence rises: "An enterprise needs a system it trusts before it goes into production."
- **Narration:** "AI can write code in minutes. But an enterprise needs a system it trusts before it can go into production. A production system is complete, tested, and adheres to its corporate privacy, security, architecture and risk standards."

**1.2 A software factory (30 s, 67 words).**
- **Visual:**
  - A factory drawn as a line. Raw inputs enter at the left: ideas, documents, an existing system.
  - Along the line, stations light with no person at them: research, specification, plan, build, test, audit.
  - Above the line, a small row of people cards: owners, deciding at three marked points.
  - A finished system leaves at the right with a "Release candidate" tag.
- **Narration:** "Akka Specify creates and runs software factories for your IT initiatives. Each factory builds its system end to end: it writes the code, runs the system, and validates it against every corporate policy. You make decisions that only people with an understanding of your business should make: what the system is for, how to deal with ambiguity, and what must pass before a release can be made."

**1.3 What makes it production-ready (32 s, 67 words).**
- **Visual:** four pillars rise under the factory line, each lit as it is named:
  - "Evidence": every fact traced and recorded in a reusable specification;
  - "Parity": every behaviour checked against the original, if one exists;
  - "Exit conditions": every enterprise review checked automatically by auditors;
  - "The platform": it runs in your own network, with Akka's guarantees for resilience and scalability.
- **Narration:** "Four things make systems created with Akka Specify production-ready. Every fact a factory uses to design a system is traced and recorded in a reusable specification. Every behaviour is checked against the original system, if one exists. Every review the enterprise requires is an exit condition, checked automatically by auditors. And it runs on Akka's platform, inside your own network, with Akka's guarantees for resilience and scalability."

**1.4 Factories at work in regulated environments (29 s, 62 words).**
- **Visual:** a headline sits above the cards: "Akka has delivered factories that work in multiple regulated environments." Three cards then rise one at a time as each is spoken, each with the same form: who, what, how long. The time is the large value.
  - A regulated payments provider · Recent college graduates delivered an AI system into production · **Weeks**
  - A global insurer · A twenty-year-old underwriting calculator, rebuilt and matched case for case · **Under a week**
  - A Fortune 200 financial services firm · Payments moved off a forty-year-old mainframe · **Months**
- **Narration:** "Akka has delivered factories that work in multiple regulated environments. At a regulated payments provider, recent college graduates put an AI system into production in weeks. A global insurer rebuilt a twenty-year-old underwriting calculator in under a week, matching the original case for case. A Fortune 200 financial services firm moved its payments off a forty-year-old mainframe in a couple of months."

**1.5 Two ways to start (38 s, 84 words).**
- **Visual:**
  - Two entry paths into a factory that end at the same place. Above, "An idea": user requirements, support history, and peers and rivals; discovery turns them into the specification of a new system.
  - Below, "An existing system": the factory ports or modernizes it, and the original is the framework for proving behavioural parity.
  - Both paths arrive at one card: "A tested system ready for production".
- **Narration:** "A factory can start from an idea or from a system that already exists. From an idea, discovery turns user requirements, support history and an analysis of peers and rivals into the specification of a new system, an AI system or any other. From an existing system, the factory ports or modernizes it, and the original becomes the framework for validating and proving that the new system is a behavioral match. Both paths end in the same place: a tested system ready for production."

**1.6 What this film shows (17 s, 36 words).**
- **Visual:** the factory line from 1.2 returns. The five stations name themselves in turn: Discover, Decide, Specify, Build, Release.
- **Narration:** "Let's see how Akka Specify works by following the modernization of an existing system, from what it does today to a verified twin in pre-production. The factory has five stations: discover, decide, specify, build and release."

**2.1 Modernizing a freight-rating engine (30 s, 63 words).**
- **Visual:**
  - A single card glows: "Freight rating · in service since 2004". Beneath it, three sources fade in, each a hairline card: "Tariff book · 140 rate tables", "Code · 22 years of changes", and "Production · 3 callers", with booking, invoicing and a partner API pulsing as they call it.
  - The card then slides onto the left of the rail, and a twin card outlines at the far right, empty, with "Pre-production" above it.
  - As the last sentence names where the work happens, a terminal panel rises above the rail. Its tabs are plain labels for the places the factory runs ("Claude Code", "Your IDE", "Other agent harnesses"), marked "With Akka's AI plugins", and `/akka:discover`, `/akka:specify` and `/akka:plan` run in turn with their results. It is drawn in the film's own style; it shows no third-party product's interface and no logos.
  - Below the rail, the people at the factory's decision points line up, each joined to the station where they decide: an operations lead (confirms how it runs today), a business analyst (resolves ambiguity), a product owner (decides what it is for), an engineer (reviews what is built) and a risk and compliance officer (approves what must pass). Engineers are one group among several. The narration does not yet say this; a sentence is proposed to the owner.
- **Narration:** "The system is a freight-rating engine. It prices every shipment a logistics company carries, and it is twenty-two years old. It lives in a tariff book, in the code around it and in a production service, and what it does is known only by running it. We'll do this within Claude Code or your favorite IDE or harness with Akka's AI plugins added."

**3.1 Discover: what goes in (24 s, 51 words). Discover.**
- **Visual:**
  - Four inputs feed a "Discovery · Findings" card along rails, each lit as it is named: "User requirements" (a shipper asks for one quote that shows every surcharge), "Support tickets" (a recurring ticket reports weight-break rounding at 45 kg), "Peers and rivals" (peers offer instant quotes for a lane), and "The existing system, when there is one" (the tariff book, the code and production, read and run). The examples are invented and generic.
  - Under the first sentence, the console's Ideation methods table (research, landscape, concepts, system, confirm, mock) shows the methods behind these inputs.
- **Narration:** "Discovery gathers everything that tells the factory what the system should do. It reads the user requirements, the support tickets of past years, and an analysis of peers and rivals, which suggests capabilities that make sense for this enterprise. When a system already exists, discovery reads it and runs it too."

**3.2 Discover: what it does today (24 s, 52 words). Discover.**
- **Visual:**
  - The three sources from 2.1 feed findings into a column. Each finding is a short line with an evidence chip: "tariff book · Zones!D7", "code · Surcharge.java", "production · rate request sample".
  - Each finding's status chip moves from *observed* to *confirmed* as a person confirms it.
- **Narration:** "For the freight-rating engine, the sources are the tariff book, the code, production behaviour and the people who run it. Each fact discovery finds is written down with the evidence behind it. A person confirms each fact before anything is built on it, so the rebuild rests only on what is known."

**3.3 Probes: run the original and watch it (32 s, 71 words). Discover.**
- **Visual:**
  - The original system as one box. Probe cards attach to it in turn and light as named: *surface*, *schema*, *dependencies*, *sequence*, *clock*, *distribution*.
  - Each probe sends a pulse into the box and returns a count, which lands on the findings: "24 routes", "140 rate tables", "weight break at 45 kg tested at 44.9, 45 and 45.1".
  - A ladder in the corner climbs *read → run → compare*.
  - Under the last sentence, the console's probe catalogue shows, with its Read, Run and Diff columns outlined.
- **Narration:** "A probe is a check that runs the original system and records what it does. Akka Specify ships with numerous probes to identify routes and data, the services it calls, and how it behaves over a sequence of calls, over time, and across the range of an input. A fact a probe exercised is stronger than a fact read in the code, and the record says which kind each fact is."

**3.4 Analysis: where the sources disagree (23 s, 49 words). Discover.**
- **Visual:**
  - Three columns side by side: tariff book, code, production. Two cells disagree, and a red-orange line joins them: the book applies the remote-area surcharge before the fuel surcharge, production applies it after.
  - The line resolves into a decision card, "D3 · The tariff book wins", with an owner's name and a date.
- **Narration:** "Analysis lines the sources up and lists every place where ambiguity or a conflict appears. Here, the tariff book and production apply two surcharges in a different order. Each conflict becomes a decision that an owner signs before any code is written, and every difference that remains is recorded."

**4.1 Decide: the answer key (25 s, 51 words). Decide.**
- **Visual:**
  - The original system runs as an oracle. Generated shipments stream into it: one at every weight break, every zone edge, every surcharge combination and every conflict.
  - Its answers fill a ledger, "1,500 shipments · 400,000 values", which locks with a key icon.
  - One plain line explains the term: "Parity: the rebuild gives the original's answer for every case."
- **Narration:** "The original system becomes the answer key. Shipments are generated at every weight break, every zone edge and every conflict, and the original prices each one. Parity means the rebuild gives the same price, to the cent, for every one of them. The rebuild's correctness is then measured, shipment by shipment."

**5.1 Specify: what goes in (26 s, 57 words). Specify.**
- **Visual:**
  - A specification opens. Its parts light as named: the user stories with their priorities, the functional requirements, the measurable success criteria, the decisions and the exit conditions.
  - Rails run into it from the findings, the decisions and the answer key.
  - Under the last sentence, the console's Spec view shows, its summary citing the findings outlined.
- **Narration:** "The specification holds what the system is for: its user stories, its requirements, its measurable success criteria, the owner's decisions and the exit conditions it must pass. An exit condition is a rule a release must meet before it ships. Every requirement cites the finding it rests on, so every line of the specification rests on evidence."

**5.2 Plan: who builds what, and in what order (24 s, 50 words). Specify.**
- **Visual:**
  - The Changes schedule from the console. Tasks are rows, and time runs across.
  - Tasks in one column run together, across user stories, and the column lights. Each task carries its model: the most capable model for rating rules, a standard one for components, a fast one for runs.
  - Under the first sentence, the console's Schedule shows, the row of how many tasks can run at each step outlined.
- **Narration:** "The plan breaks the specification into tasks and works out which can run at the same time. Tasks that can run together do, across user stories. Each task is matched to a model by risk: the rating rules go to the most capable model, routine components to a faster one."

**6.1 Build: designed from Akka's components (26 s, 55 words). Build.**
- **Visual:**
  - This system's own composition draws: its endpoints, its workflow, its entities and its views.
  - Each component lights as the narration names its kind. A pure domain block sits apart, labelled "Rating rules · plain code".
  - Under the last sentence, the generated documentation's component graph for Akka's sample system shows a real composition, its agent outlined.
- **Narration:** "The factory designs this system from Akka's components, chosen and composed for what it must do: endpoints for its callers, a workflow, event-sourced entities that keep every change, and views for queries. The rating rules stay in plain code that can be read and tested on its own. Akka's components combine into any enterprise system."

**6.2 The documentation it writes (15 s, 29 words). Build.**
- **Visual:**
  - A mosaic of six framed graphics from the sample's generated documentation, each labelled with its kind: "Component graph", "Domain model", "State lifecycle", "Interaction diagram", "Flow sequence", "API reference".
  - The tiles rise in one after another; the one being spoken about lifts and grows while the others step back.
- **Narration:** "The factory also writes this system's documentation: its component graph, its domain model, its state lifecycles, an interaction diagram for every flow, and a reference for every API route."

**6.3 Integrated testing: every behaviour, every build (25 s, 51 words). Build.**
- **Visual:**
  - The answer-key ledger from 4.1 returns and runs against the rebuild. The counter climbs to "1,500 of 1,500 match", then holds.
  - Beside it, the integration tests run on the real runtime, and the replay tests confirm an answer is the same a second time.
  - Under the first sentence, the console's Design page shows its integration tests: 365 of 365 passed.
- **Narration:** "Tests are written before the code they test. Integration tests run the components on the real runtime, and the answer key runs on every build. If a price drifts from the original, the build fails at that moment, months before acceptance testing. On every build, the rebuild and the original agree."

**7.1 Release: exit conditions and auditors (32 s, 66 words). Release.**
- **Visual:**
  - The Changes page's exit conditions, grouped in four bands as named: Privacy, Security, Architecture, Risk.
  - Each row shows how it is checked: "runs a command", "probes the running service", "reads project files", "tests that cite it".
  - An auditor icon moves down each band, and each row turns green. One row asks for a person's sign-off, which is given.
  - Under the last sentence, the console's Exit conditions table shows, its "How it is checked" column outlined.
- **Narration:** "An organization sets its exit conditions once, and they apply to every project's factory. They say what privacy, security, architecture and risk require of every system the organization releases. An auditor is the automatic check behind each condition. It runs a command, probes the running service or reads the code. A system that passes them has passed the reviews the organization defined, before the reviewers meet."

**7.2 The record (18 s, 34 words). Release.**
- **Visual:** the Changes header: requirements traced, tasks done, exit conditions met, and the timeline from constitution to ship. A short trace draws from one requirement to its task to its test. Under the last sentence, the console's own timeline pans from constitution to ship.
- **Narration:** "Every requirement is traced to a task and to a test. Every decision, every recorded difference and every model call is kept with the change. The reviewers read one record, and it is complete."

**8.1 Into the organization's own network (24 s, 50 words). Release.**
- **Visual:**
  - The twin card from 2.1 fills in and moves into a frame labelled "Your VPC". Two regions sit inside it, both active, with data replicating both ways.
  - A "Pre-production · user acceptance" tag settles on it. The original system stays beside it, still pricing shipments, for a parallel run.
- **Narration:** "Akka's platform runs inside the organization's own network. A release that passes its exit conditions goes straight into pre-production for user acceptance, already active in two regions, with high availability and disaster recovery. The original keeps pricing shipments beside it until the parallel run shows they agree on live traffic."

**8.2 Many factories, in a loop (21 s, 40 words).**
- **Visual:**
  - Each project runs as its own factory: sixty-five small factory lines run in parallel at the left, under "65 · open-source projects, ported at once".
  - At the right a cycle: the factories feed "Performance" (assessed), then "Cost" (measured), then "Improvements" (for the next iteration), and an arrow returns to the factories, labelled "Next iteration".
  - The only figure is 65; performance and cost are labels. No console screen shows run records or cost for the sample yet, so the scene is drawn.
- **Narration:** "Specify also runs factories at scale: each project runs as its own factory, and many run at once. Akka ported sixty-five open-source projects at once this way. Specify assesses each factory's performance, measures its cost and improves the next iteration."

**9.1 Beyond modernization (20 s, 40 words).**
- **Visual:** black. "AI platform" rises first, in white. "Innovation engine" follows in yellow, below it. A card, "Modernization", lights as one use of it; "A new AI system", "A new service" and "Any other IT system" join it in a row.
- **Narration:** "Enterprises come to Akka for an AI platform, and put an innovation engine to work. Modernization is one use of it. Each idea gets a factory of its own, whether it is an AI system or any other IT system."

**9.2 The roadmap, collapsed (24 s, 49 words).**
- **Visual:**
  - An organization's IT roadmap as three year columns, 2027, 2028 and 2029, each holding idea cards.
  - The cards move through the five stations, each in its own project's factory, several at once, and land in 2027. The 2028 and 2029 columns empty and fold into 2027.
- **Narration:** "Every idea on an organization's roadmap can have its own factory: a new AI system, a new service, or a system that already exists. Specify runs as many factories as there are projects. The roadmap collapses, and the innovation planned for 2028 and 2029 can be delivered in 2027."

**9.3 Who runs it (20 s, 42 words).**
- **Visual:** one person card at the centre, "Product owner". Rails run from it to the five stations, each of which lights. Beside it, a specification card, "What the system is for", lights and stays. No code appears on screen.
- **Narration:** "Running a project's factory takes a product owner's judgement: knowing what the system is for, deciding where the sources disagree, and approving what it must pass. What each system does is kept in its specification, where anyone who joins can read it."

**9.4 Close (17 s, 35 words).**
- **Visual:** the AKKA mark, large and centred. The call to action sits under it, held to be read.
- **Narration:** "Bring one idea from your roadmap, or one system you would like to modernize. We will run it through its own factory with you and show you its specification, its plan and its exit conditions."

## Running total

| Scene | Seconds | Words |
|---|---|---|
| 1.1–1.6 | 165 | 353 |
| 2.1 | 30 | 63 |
| 3.1–3.4 | 103 | 223 |
| 4.1 | 25 | 51 |
| 5.1–5.2 | 50 | 107 |
| 6.1–6.3 | 66 | 135 |
| 7.1–7.2 | 50 | 100 |
| 8.1–8.2 | 45 | 90 |
| 9.1–9.4 | 81 | 166 |
| **Total** | **615 s** | **1,288 words** |

The designed film runs 10:15. Each duration is the narration at 2.6 words a second, with 1.0 s between sentences and
a 1.6 s tail, rounded up. The voiced render times each scene to its recorded clip. The narration is the owner's script, `script.md`.

## Built from

- **The console's own screens, re-drawn in the film's language:** the Changes schedule (5.2), the exit conditions with how each is checked (7.1), the Changes header and timeline (7.2), and the Design architecture map (6.1).
- **The console's own screens, as captured:** high-resolution screenshots of the Akka console and the sample's generated documentation on Akka's loan-origination sample, framed in the scenes from 3.1 on. The README lists each one and where it appears.
- **The Specify concepts, as they work:** discovery findings with evidence and rungs, the 19 built-in probes, owner decisions, the answer key and parity, model tiers per task, exit conditions and their auditors.
- **The film engine:** `../mock/lib`, the deck engine from `../talk/lib`, and the renderer pattern from the existing films.
