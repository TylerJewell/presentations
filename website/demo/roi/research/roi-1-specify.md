# ROI dimension 1: Specify (rapid modernization, delivery and release factories)

Research date: 2026-11-09. Classes: PUBLIC = primary page opened and read; INTERNAL = Tyler must confirm before use; UNVERIFIED = must not be used. Where I could only open a secondary report of a primary source (Gartner press releases returned HTTP 403), I say so and do not call it PUBLIC.

## 1. Summary

1. Strongest defensible claim: Akka ran 65 open-source projects through the Specify workflow. Ten were rebuilt in full (280,837 source lines to 147,173 production lines) in 95.1 hours of agent run time, a median of 8.5 hours each. Akka published it (akka.io/blog/we-ported-65-oss-projects, 2026-09-03) and InfoQ reported it (2026-10-05). My own recount from the local metrics files matches the blog (95.0 h).
2. Parity across those ten ports is 15,282 of 15,308 benchmark cases (99.8%), INTERNAL recount from `complete-metrics.json`; the blog gives only category means (96.8% to 100%). Parity is measured against cases the porting program chose, not against production traffic.
3. Strongest customer evidence on delivery speed: Coho AI launched in two months against an internal estimate of four to six months, and its CTO is quoted at "75% faster" (akka.io customer story, undated, vendor-hosted). Leap Rail's CEO says the platform "would normally require a team of 40 or 50 engineers" (CEO's estimate, undated).
4. Public evidence on the cost of slow delivery is real but dated or survey-based: Stripe (2018) developers spend 17.3 of 41.1 weekly hours on maintenance; Flyvbjerg and Budzier find a 27% average IT cost overrun across 1,471 projects, with one in six overrunning 200%; McKinsey (2020) CIOs say 10 to 20% of new-product budget is diverted to tech debt.
5. Weakest part: no customer has published a measured before-and-after of an Akka Specify modernization with dollars, dates and defects. Human effort in the porting program is not measured at all (the blog says so). The "weeks" claim on akka.io is a vendor statement with no named customer or method. The draft-only proof points (2 months to parity, 5,000 onboardings a month, $2M a year removed) are INTERNAL drafts without a source.
6. The blog itself says more exit conditions and auditors made ports less efficient, and an independent critic on InfoQ questions whether line-count reductions are dead-code removal. The film should not claim the exit conditions are free.
7. A sceptic will cite METR (2025): 16 experienced developers were 19% slower with AI tools. METR says that is out of date for late-2025 tools, and it tested assistance on familiar codebases, not spec-driven regeneration, so it answers a different question.

## 2. Claims table

| # | Claim | Number and unit | What it compares | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Ports done in an automated pass | 65 projects; 99.3 h total; mean 92 min, median 76 min per port; 9.41B tokens (25.5M output, rest cache) | Initial tranche: spec plus up to 10% of each project's surface | https://akka.io/blog/we-ported-65-oss-projects | 2026-09-03 | PUBLIC | high for the count, medium for meaning | 55 of 65 are slices of up to 10% of the surface. Median scope-matched source slice is 720 lines (INTERNAL recount of `metrics.json`). Hours are agent run time, not human hours. Authors are Akka. |
| 2 | Ten full ports | 95.1 h total; 280,837 source lines to 147,173 port lines (0.52x); 11,597M tokens; hours 4.5 to 16.2 each | Original system's in-scope source against the Akka rebuild | Same blog, Table 2 | 2026-09-03 | PUBLIC | high | Line counts are scope-matched to the part rebuilt; blog reports no per-port parity, test counts or defects. |
| 3 | Full-port parity | 15,282 of 15,308 cases (99.8%) | Rebuild answers against original on benchmark inputs | `C:\Users\tyler\specify\port-log\complete-metrics.json` (my sum) | 2026-08/09 | INTERNAL | medium | Blog gives only category means: Application 96.80%, Framework 98.05%, Library 98.82%, Infrastructure 97.56%, Tool/CLI 100.00% (those means are for the 65-port tranche). One port (changedetection-io) contributes 10,660 of the cases, so the pooled figure is dominated by it. Per-port: 8 of 10 ports are at or above 97%; open-notebook 46/47, activitywatch 173/179. |
| 4 | Test code in full ports | 33,975 test lines beside 147,173 production lines (23%) | Rebuild's tests | `complete-metrics.json` (my sum) | 2026-09 | INTERNAL | medium | Counts lines, not tests. Not in the public blog ("Test counts: not reported"). |
| 5 | Speed gain on 57 of 65 ports | "a LOC or performance improvement on 57 of 65 ports" | LOC or speed, either | Blog TL;DR; InfoQ | 2026-09-03 / 2026-10-05 | PUBLIC | low for use | "Either" metric. Dify 143,333x is flagged by the authors as two different amounts of work. Netflix metaflow is about 100x slower. Do not use. |
| 6 | Model cost split | Sonnet mean 61 min (n=31); Opus mean 120 min (n=34) | Models on the same harness | Blog | 2026-09-03 | PUBLIC | medium | Models were varied randomly. |
| 7 | Exit conditions add cost | "as you add more exit conditions, auditors, and guardrails, the ports become less efficient" | Ports early vs late | Blog; InfoQ "Adding exit conditions reportedly increased porting costs" | 2026-09 / 2026-10 | PUBLIC | high | No number published (Figure 7 not in text). Every port had to pass 15 auditors. |
| 8 | Structured specs matched behaviour first pass | Qualitative: prose specs "looked plausible but were wrong", errors surfaced two to four steps later | Enumerated-claim specs vs prose specs | Blog | 2026-09-03 | PUBLIC | medium | No first-pass rate or iteration count given. |
| 9 | Idea to deployed service "can be measured in hours" | no figure | n/a | https://akka.io/blog/introducing-akka-specify | 2026-03-16 | PUBLIC | low | Anecdotal ("dozens of applications that originated from a single SPEC.md"). Blog lists specify, clarify, plan, tasks, implement, build, deploy; it does not describe conform, ship or port. |
| 10 | "From your specifications to a running system in weeks" | "weeks" | Greenfield | https://akka.io/offerings/specify (opened; /specify is 404) | undated, footer 2026 | PUBLIC (vendor statement) | low | No customer, no baseline. Same text in `demo\research\akka-io\README.md`. |
| 11 | First production slice | 4 to 6 weeks | Akka delivery engagement | `C:\Users\tyler\competition\_internal\akka-facts.md` line 34 | fact sheet 2026-07-03 | INTERNAL | low | Source of the figure not stated. Tyler must confirm. |
| 12 | Coho AI time to market | Launch in 2 months vs internal estimate of 4 to 6 months; "75% faster" than other solutions considered | Akka vs alternatives Coho evaluated | https://akka.io/customer-stories/coho-ai-brings-innovative-solutions-to-market-75-percent-faster | undated (footer 2026) | PUBLIC (vendor-hosted) | medium | Two months against four to six is a 50 to 67% reduction, not 75%; the 75% is against "other solutions we had considered". The 4 to 6 month figure is an estimate. The same page has "60% lower operating overhead"; per the brief, Coho cost claims are UNVERIFIED, so do not use that one. |
| 13 | Leap Rail team size | "20x fewer developers", "5x faster development" | Building equivalent capability from scratch | https://akka.io/customer-stories/leap-rail | undated | PUBLIC (vendor-hosted) | low | Baseline of 40 to 50 engineers is the CEO's estimate. No durations given. Team size not stated. |
| 14 | Giist Social | "2x faster to market" | With vs without Akka (needed "twice as long" and more hires) | https://akka.io/customer-stories/giist | undated | PUBLIC (vendor-hosted) | low | Founder's counterfactual. |
| 15 | Judopay code volume | "about 50% less code", test code doubled | Before vs after moving to Akka | https://akka.io/customer-stories/judopay | undated | PUBLIC (vendor-hosted) | medium | Speaker-attributed, a measured code ratio; speed claim has no number. |
| 16 | Trust1Team | "3x development speed" (1 to 3 microservices per sprint, 3-person team) | Before vs after Akka | https://akka.io/customer-stories/trust1team | undated | PUBLIC (vendor-hosted), CEO position is a paraphrase | low | Brief lists Trust1Team cost claims as UNVERIFIED; the 40% overhead on the same page must not be used. The speed claim has no quote. |
| 17 | Kodou | "10x faster" modernization than traditional consulting; "used to take months now takes weeks" | Kodou's product vs consulting | https://akka.io/customer-stories/kodou | undated | PUBLIC (vendor-hosted) | low | Kodou sells modernization tooling built on Akka; it is not an Akka customer modernizing its own system. Same page claims 90% cost reduction: do not use. |
| 18 | MrCall | Two developers "built and operate the entire AI call center" | Team size | https://akka.io/customer-stories/mrcall | undated | PUBLIC (vendor-hosted) | medium for team size | No duration. |
| 19 | Draft proof points | "2 months to parity" ($4B APAC bank, app budgeted for 3 years); "5,000 onboardings / month"; "$2M per year removed" (grocer, SaaS replaced in 4 weeks) | Specify modernizations | `C:\Users\tyler\competition\website\demo\research\akka-io\README.md` line 116 | draft | INTERNAL | n/a | Draft-only. Tyler must confirm each customer, figure and permission. Not on the live page. |
| 20 | Manulife | 2,000 developers / 100 projects; "30-50% faster processing" | Porting Python systems | `akka-facts.md` line 14; https://akka.io/blog/go-slow-to-go-fast (2026-05-15) | 2026-05 | PUBLIC for 30-50% processing speed; the 2,000/100 figures are INTERNAL | medium | The 30-50% is runtime speed, not delivery speed. The blog gives no build-time figure. |
| 21 | Developer time on maintenance | 17.3 h of 41.1 h per week; about 3.8 h on "bad code"; about $85B a year worldwide opportunity cost | Survey self-estimate | Stripe, The Developer Coefficient (PDF read) https://stripe.com/files/reports/the-developer-coefficient.pdf | 2018 | PUBLIC | medium | Survey estimate, eight years old. I did not capture the sample size from the text. |
| 22 | IT project overruns | 1,471 projects; average cost overrun 27%; one in six "Black Swan" with 200% cost overrun and almost 70% schedule overrun | Plan vs actual | Flyvbjerg and Budzier, HBR Sept 2011; https://arxiv.org/abs/1304.0265 | 2011 / 2013 | PUBLIC | medium | Mostly public-sector, US projects (92%, 83% per a secondary summary I did not verify). Old. |
| 23 | Tech debt | CIOs estimate 20 to 40% of tech-estate value; 10 to 20% of new-product budget diverted to tech debt | CIO survey (50 CIOs, revenue over $1B) | McKinsey, "Tech debt: Reclaiming tech equity", 2020. Page timed out and the PDF timed out; confirmed through search snippets only | 2020 | UNVERIFIED until the primary is opened | low | Re-open https://www.mckinsey.com/capabilities/platforms-and-solutions/our-insights/tech-debt-reclaiming-tech-equity before use. |
| 24 | Digital initiatives that meet targets | "only 48%" | Gartner survey, 2024 | Gartner press release, 2024-10-22 (HTTP 403; seen as a headline via BusinessWire search) | 2024-10 | UNVERIFIED (headline only) | low | Open the primary before use. |
| 25 | Agentic AI cancellations | More than 40% of agentic AI projects cancelled by end of 2027 | Gartner prediction | Reuters via The Star https://www.thestar.com.my/tech/tech-news/2025/06/25/over-40-of-agentic-ai-projects-will-be-scrapped-by-2027-gartner-says (not opened; seen in search) | 2025-06 | UNVERIFIED (secondary) | low | A prediction, not a measurement. |
| 26 | Platform quality and AI value | "a direct correlation between a high quality internal platform and an organization's ability to unlock the value of AI"; 90% of organizations have at least one platform | DORA 2025 survey, nearly 5,000 respondents | https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report | 2025-09-23 | PUBLIC | high | Correlation, not a measured Akka effect. |
| 27 | AI tools and experienced developers | 19% slower; n = 16 developers, 246 issues | Early-2025 AI tools vs none | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ | 2025-07-10 | PUBLIC | high | Counter-evidence. METR says the result is out of date and published updates in 2026-02 that I did not open. |
| 28 | Developer pay | Median software developer wage $135,980 | Used as the labor input in section 4 | https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm | May 2025 | PUBLIC | high | Wage only; loading factor is my assumption. |

Not found: a current Gartner or Forrester figure for the share of IT budgets spent on run and maintenance (search returned only a dated "80:20" remark and an unattributed blog). Do not quote any such share. No public average for "time to deliver an AI system" was found; the MIT NANDA "95%" report (2025) concerns return, not delivery time, and has methodology criticism, so I did not rely on it.

## 3. Customer and analyst evidence (verbatim)

All customer statements below are from vendor-hosted pages (akka.io), none carries a date (only the "©2026" footer). Permission to use a name in a film is Tyler's to confirm.

- Michael Ehrlich, Co-founder and CTO, Coho AI: "With Akka, we got to market 75% faster compared to other solutions we had considered." https://akka.io/customer-stories/coho-ai-brings-innovative-solutions-to-market-75-percent-faster. PUBLIC. The "two months" and "four to six months" figures are the page's text, not part of the quote.
- Shayan Zadeh, CEO, Leap Rail: "We needed to build something that would normally require a team of 40 or 50 engineers," and "The technology choices we made had to multiply our small team's output dramatically." https://akka.io/customer-stories/leap-rail. PUBLIC.
- Mauricio Aristizabal, Founder and CEO, Giist Social: "Without Akka, I would have needed to hire more people and it probably would have taken twice as long." Also: "Akka removed all of the infrastructure complexity for us." https://akka.io/customer-stories/giist. PUBLIC.
- Rob Howes, Head of Development, Judopay: "We're writing about 50% less code than we were before, and we've actually doubled our test code." https://akka.io/customer-stories/judopay. PUBLIC.
- Angelo Leto, founder, MrCall: "With Akka, we were able to build the entire platform as a distributed system from day one." https://akka.io/customer-stories/mrcall. PUBLIC.
- Yves Jean, Founder, Kodou: "The work was repetitive, error-prone, and took far too long." https://akka.io/customer-stories/kodou. PUBLIC. (Describes consulting-led modernization generally; supports the problem statement, not an Akka result.)
- Jodie Wallis, Global Chief AI Officer, Manulife, as reported in "Go Slow to Go Fast" (Team Akka, 2026-05-15): "an engineer builds an agent over the weekend, demos it Monday, and months later it's still stuck in UAT." https://akka.io/blog/go-slow-to-go-fast. PUBLIC, but I have this from a fetch summary and the exact surrounding wording was not checked; confirm against the page before using it as a quote.
- Manulife press release 2026-03-10 (https://akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai): Jodie Wallis: "Akka illustrates how enterprises can build and operate agentic systems with the speed, predictability, and governance" (the fetch returned a truncated sentence, so use only with the full text). Contains no delivery-time figures. PUBLIC.
- Simon Rodrigue, VP of eCommerce, Walmart Canada, via a NashTech case study (reported in search summary, page not opened): "The bottom line is that switching to Scala was good for our bottom line." Not about delivery speed. UNVERIFIED for this use.
- Trust1Team: the page reports CEO Michallis Pashidis's confidence in "3x acceleration" only as a paraphrase; there is no verbatim quote. Do not put it in quotation marks.
- Independent critic, InfoQ 2026-10-05 (Leela Kumili reporting): commenter Aaditya, "reductions in lines of code resulted primarily from dead code removal." PUBLIC as a stated objection.
- Analyst: Flyvbjerg and Budzier: "Fully one in six of the projects in the sample was a Black Swan, with a cost overrun of 200%, on average." arXiv 1304.0265. PUBLIC.
- Analyst: Google Cloud, DORA 2025 announcement (2025-09-23): "AI doesn't fix a team; it amplifies what's already there." PUBLIC.

No analyst or customer statement says that Akka Specify, by name, shortened a modernization in measured calendar time. This is the main gap.

## 4. Worked example: modernizing a mid-sized transactional service

Purpose: show how the measured porting data converts to dollars, and show which input decides the answer. This is a modelled estimate, not a customer result.

Scope: one service of about 21,000 lines of source (the median of the ten full ports: 21,062 lines; their range is 8,898 to 63,053) with an existing test suite or an agreed set of behaviours to check. Not a whole estate. Not a system without behavioural oracles.

Inputs and their sources:
- Loaded engineer cost: $135,980 median wage (BLS, May 2025) x 1.3 loading (assumption) = $176,774 a year; / 2,080 h = $85 an hour.
- Before (human rewrite): team of 4 engineers for 6 to 12 months (assumption; no public dataset used; Coho's own internal estimate of 4 to 6 months for a build with a small team is the only supporting figure, and Leap Rail's 40 to 50 engineer counterfactual is a larger build). Hours: 4 x 1,040 = 4,160 to 4 x 2,080 = 8,320. Cost = $354k to $707k.
- After (Specify workflow): agent run median 8.5 h (INTERNAL recount; blog range 4.5 to 16.2 h for the ten); tokens median about 1.2B per full port (blog total 11,597M / 10), priced at $0.50 to $2.00 per million blended because most are cache reads (assumption; no model key used, arithmetic only): $600 to $2,400 per port. Human time is not measured by the program. I assume 160 to 640 engineer hours for writing and reviewing the specification, resolving open decisions, reviewing the result and deploying. At $85 an hour that is $13.6k to $54.4k.
- After total: $14.2k to $56.8k.

Formula: savings % = 1 - (after cost / before cost).
- Best case: 1 - 14.2 / 707 = 98%. Worst case within this table: 1 - 56.8 / 353.6 = 84%. Midpoint: before $530k, after $35k, savings 93%.

Sensitivity to the decisive input (human hours after). The agent time and token cost are small; the answer depends on human hours and on how much hardening is needed beyond the port:
- If the human time after is 4x higher (2,560 h, $218k, to cover integration, data migration, security review, cutover): after total about $220k. Savings: 1 - 220 / 354 = 38% (low before) to 1 - 220 / 707 = 69% (high before).
- If the before estimate is actually only 2 engineers for 4 months (1,387 h, $118k) and after is 640 h ($54k + $2k): savings 52%.

What the data supports: the agent portion of a behavioural rebuild runs in hours and costs thousands, not hundreds of thousands, at the scale of the ten ports. What it does not support: any claim about total calendar time, total human effort, or production-readiness of a regulated system. The 10 ports are open-source applications whose own unit and integration tests were the completion bar ("Completion required the source system's unit and integration tests to pass against the port"), which an enterprise system may not have. Present the headline as "the build step", with a range of 38% to 98% and the inputs on screen; do not quote one point.

Customer-measured counterpart (not combinable with the model above): Coho, 2 months actual against 4 to 6 months estimated, a 50 to 67% reduction in calendar time on a greenfield platform.

Cost-of-delay illustration (survey-based, not Akka-measured): for 100 developers at $176,774 loaded, Stripe's 17.3 of 41.1 hours on maintenance (42%) is $7.4M a year of capacity (100 x 176,774 x 0.421). Reducing it by 10 percentage points of capacity is worth about $1.8M a year. This uses a survey self-estimate from 2018; if shown, label it that way.

## 5. Objections and answers

1. "Hours of agent time is not delivery time. Where are the humans?" The blog states 99.3 h is "total run time, not human hours" and reports no human effort. No evidence answers this; the worked example makes human hours the swing input. Measure it (section 6).
2. "Open-source slices are not enterprise systems." Correct: 55 of 65 are up to 10% of a surface, median slice 720 lines; ten full ports have a median of 21k source lines, and their tests served as oracles. No evidence yet for a regulated 1M-line system. The Kodou page mentions "millions of lines" without a named case.
3. "Fewer lines of code is not a benefit; it may be dead code or a more expressive language." An InfoQ commenter says this. The blog compares scope-matched slices and says comparing against originals "may not be fair". The line ratio (0.52x) should not be a headline; parity and tests are the better evidence.
4. "99.8% parity on cases you chose." True, and 26 of 15,308 cases differ (my count). The cases were generated by the porting program; one port supplies 10,660. State the number of ports and cases, not the percentage alone.
5. "AI makes developers slower (METR)." METR's 19% slowdown (16 developers, early-2025 tools, familiar codebases) is dated by METR itself and tests assistance, not specification-driven regeneration. The 2026-02 update was not opened; read it before the film.
6. "Speed numbers on the blog are misleading (143,333x)." The authors flagged it themselves. Do not use any speed ratio from the porting program in the delivery dimension.
7. "Customer pages are marketing." Yes; every customer page above is on akka.io, undated, with no methodology. Only named, quoted statements with permission and a baseline should be used, and the 2-month versus 4-to-6-month Coho pair is the best of them.
8. "More guardrails slow you down." The blog confirms it with no number. Answer: show exit conditions as the thing that makes the result releasable, and publish the cost once measured.
9. "A standard architecture is a lock-in." The akka.io draft claims portability ("rebuild the system anywhere, including off Akka"); no evidence was found or tested. Leave it out unless demonstrated.

## 6. Gaps: what Tyler or the team must supply or confirm

- Human hours for at least three ports or one real modernization: specification time, review time, rework, deployment. Log them per phase.
- Calendar days from first prompt to deployed service for the same ports, including waiting time.
- A named customer's before-and-after for a Specify modernization (system size, original budget, actual time, parity method, defects found after release). The draft proof points (APAC bank 2 months against 3 years; payments provider 5,000 onboardings a month; grocer $2M a year, 4 weeks) must be confirmed by Tyler for existence, figures and permission to name.
- Source of the "4 to 6 weeks to first production slice" figure and whether it is a measured median or a target.
- Dates for the customer stories (none carry a date).
- Test counts, not test lines, and defects found by the auditors per port.
- The cost of exit conditions: run the same port with and without auditors and publish tokens and hours.
- A defect rate after release for a ported service.
- Open the primaries I could not: McKinsey tech-debt article, Gartner "48%" and agentic-AI releases, DORA report PDF, METR 2026-02 update.
- Measure next: one controlled modernization of a service with a known human history (git log and ticket history give the actual human effort), run through /akka:port and /akka:ship with timestamps.

## 7. Suggested on-screen proof

- A single table of the ten full ports: name, source lines, port lines, hours, parity cases. Totals row: 280,837 to 147,173; 95.1 h; 15,282 of 15,308 cases. Caption: "Open-source applications, agent run time, scope-matched." Supported by the blog and local metrics.
- A bar of hours per port (4.5 to 16.2), median 8.5.
- A quote card with no logo: Michael Ehrlich, Co-founder and CTO, Coho AI, "With Akka, we got to market 75% faster compared to other solutions we had considered." with the caption "Two months against an internal estimate of four to six." (Confirm Coho's permission.)
- A quote card: Shayan Zadeh, CEO, Leap Rail: "We needed to build something that would normally require a team of 40 or 50 engineers." (Confirm permission; note it is the CEO's estimate.)
- A cost-of-slow-delivery card: Stripe, 17.3 of 41.1 weekly hours on maintenance (2018 survey). Label as a survey.
- The worked example as a range bar from 38% to 98% with the human-hours input labelled as the swing factor.
- Do not show: 143,333x, "70 to 90%", the 60% Capital One figure, Trust1Team or Coho cost figures, the Dify ratio, "weeks" without a named customer.

## Six-line summary

1. Defensible: 65 OSS projects, 10 full ports, 95.1 agent-hours, 280,837 to 147,173 lines, about 99.8% parity on 15,308 cases (public blog 2026-09-03; parity pooled from internal files).
2. Customer: Coho AI, 2 months against an internal 4-6 month estimate, CTO quote "75% faster" (vendor page, undated); Leap Rail "team of 40 or 50 engineers" (CEO estimate).
3. Cost of slow delivery: Stripe 17.3 of 41.1 hours on maintenance (2018), Flyvbjerg 27% average overrun on 1,471 IT projects, DORA 2025 platform-quality correlation.
4. Worked example (modelled): service of about 21k lines, human rewrite $354k-$707k against $14k-$57k with Specify, savings 84-98%, falling to 38-69% if human hardening time is 4x; human hours are the swing input and are unmeasured.
5. Weakest: no measured human effort, no named customer with a dated before and after, exit conditions reduce porting efficiency by the authors' own account, and draft proofs (APAC bank, payments, grocer) are internal only.
6. Do not use: speed ratios from the ports, "70 to 90%", Capital One 60%, Trust1Team/Coho cost claims, McKinsey/Gartner figures until the primaries are opened.
