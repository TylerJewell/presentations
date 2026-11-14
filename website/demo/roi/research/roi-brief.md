# Shared brief for the ROI research agents

Tyler Jewell (Akka) wants a script for a new demo video of at most 2.5 minutes about Akka's total return on investment. There are five dimensions of ROI that Akka can prove:

1. **Specify**: rapid modernization, delivery and release factories; standardized architectures; everything about rapid design, build, test and deployment for any AI or transactional system.
2. **Runtime efficiency**: the actor and event-driven model, especially against systems built on Python, JavaScript or Go.
3. **Against the hyperscalers**: Akka installs a fully verticalized stack on the lowest-cost commodity hardware in the cloud (storage, objects, compute, GPUs). Hyperscalers over-provision and charge consumption rates on services that have to be integrated and carry high margin; Akka's approach is a flat fee.
4. **Akka Optimize**: the savings from optimizations inside Akka Optimize (routing, model swaps, caching, avoidable cost, budgets, self-hosting).
5. **Software you no longer need to license**: what Akka replaces.

The film will quantify the savings and point to benefits shown by known customers. Tyler can name customers and cite what they have said about Akka.

## Your job

Deep, careful research for your assigned dimension (or the customer inventory). Read the local sources, search the web for public evidence, and fetch the primary pages (case studies, benchmarks, vendor pricing pages, analyst or survey reports, engineering blogs). Prefer primary sources, with a date, over summaries.

Local sources worth reading first (read-only; do not modify anything under C:\Users\tyler\ai-console except writing nothing at all; write only your report):
- C:\Users\tyler\competition\_internal\akka-facts.md, akka-tco-analysis.md, README.md, blog-plan-ai-cost-2026-09.md, comparison-research-2026-10\, positioning\, battlecard-*.md, pnc-rfp-strategic-answers.md
- C:\Users\tyler\ai-console\demo\research\efficiency-numbers.md, economics-sovereign.md, akka-io\
- C:\Users\tyler\ai-console\docs\research\ (all files), docs\plans\tokenomics\, demo\talk-v2\BRIEF.md, demo\bae\storyboard.md Act 4
- C:\Users\tyler\specify\graphiti-port\docs\ (the OSS porting program: what was ported, how fast, at what cost)
- C:\Users\tyler\ai-console\samples\ and docs\plans\ for anything that measures build time, test counts or delivery speed.

## Rules (strict)

1. **Classify every claim** with one of: `PUBLIC` (a primary public source, with URL and date, that you opened and read), `INTERNAL` (an internal document or Tyler-held knowledge: give the path and say Tyler must confirm before it is used or named), `UNVERIFIED` (a claim repeated without a primary source, or marked unverified in the local files: it must not be used). The local files already say that the following are unverified, so treat them as UNVERIFIED unless you find a primary source: a 60% figure attributed to Capital One, and cost claims attributed to Norwegian, Trust1Team, DeductiveAI and Coho; a "half" attributed to John Deere. Never write "70 to 90%"; the only usable form of the 90% claim is "up to 90% lower infrastructure cost" with its qualifier (it is an infrastructure cost figure, not a list price), if a primary source supports it.
2. **Quote exactly.** For customer or analyst statements give the verbatim words, the speaker's name and role, the organization, the date, the URL. Do not paraphrase inside quotation marks. If you only have a paraphrase, say so.
3. **Show the arithmetic.** For any savings figure give the formula, every input and its source, and a stated range. Separate what a customer measured from what is a modelled estimate. Say what scale the number holds at. Do not extrapolate a customer's number to a different workload.
4. **Say what could be challenged.** For each important claim write the strongest objection a sceptical CFO or an engineer would raise and what evidence answers it, or that none does.
5. No live model calls and no use of any model-provider API key (web search and page fetches are fine). Do not call ElevenLabs. Never use the Artifact tool.
6. Plain declarative sentences, no hype, no selling language. Describe people by what they are. Never refer to a provider's invoice as a source of truth for console data.
7. Be exhaustive about what exists and honest about what does not: a dimension with thin evidence should say so plainly.

## Output

Write one Markdown report to the path given in your task, with these sections:
1. **Summary** (10 lines): the three strongest quantified claims you can defend, and the weakest part of the story.
2. **Claims table**: claim | number and unit | what it compares | source (URL or path) | date | class (PUBLIC / INTERNAL / UNVERIFIED) | confidence (high / medium / low) | notes.
3. **Customer and analyst evidence**: verbatim quotes with attribution, source, date, class.
4. **A worked example**: a representative before-and-after in dollars or percent with inputs, formula and range (or a statement that the data does not support one).
5. **Objections and answers.**
6. **Gaps**: what Tyler or the team must supply or confirm (named customers' permissions, internal figures, measurements) and what to measure next.
7. **Suggested on-screen proof** (visual evidence that could be shown: a chart, a number, a screen, a logo-free quote card), limited to what the sources support.
Finish your final message with a six-line summary.
