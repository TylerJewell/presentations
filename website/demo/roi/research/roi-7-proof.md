# ROI film proof section: what named customers have said about Akka

Researched 2026-11-09. Pages fetched live on that date; no model calls, no commits. Labels: PUBLIC = primary public page opened and read; INTERNAL = Tyler-held or repo-only, Tyler must confirm; UNVERIFIED = not usable. "Vendor-authored" means Akka wrote the words and no customer is quoted next to the number. Page fetches return only a footer year (2026) for the customer-story pages, so those pages are undated; this is stated per row.

## 1. Summary

1. Cleared as named, public, with a quantified result: Swiggy (named engineer, dated), Manulife (Akka-authored numbers, dated), Verizon, Capital One, Judopay (Akka-authored pages; Judopay has a named quote).
2. Fox (Tubi) is public by name but has no customer-stated result. The cores, tokens, velocity and cost figures on akka.io/customer-stories/tubi are Akka copy with no speaker and no date, and the repo's own audit calls them unsourced.
3. Missing for Fox: any named Fox or Tubi person tying a number to Akka; the source of "150,000 to 22,000 cores" and "roughly 40% lower cost per session"; the 2021 Lightbend PDF behind the Tubi quote.
4. Swiggy has one strong result: P99 latency 144 ms to 71 ms, over 5,000 predictions per second on one model, Shrinath Agarwal, Software Developer, 29 Feb 2024. The post states no cost or token figure.
5. Missing for Swiggy: any cost, token or compute figure from Swiggy. The akka.io story page says "~50% less" compute per prediction; the source blog post does not say it, so it is vendor-authored. The "22% fewer tokens" is INTERNAL and not on any public page.
6. Dojo is not cleared. `akka-facts.md` says Dojo is not permitted in public-facing material. The only public line is on akka.io's home page ("onboards thousands of merchants every month", no Akka metric). "College graduates ship in weeks" is INTERNAL.
7. Manulife's "30-50% faster, same prompts, same accuracy" and "up to 300% more concurrency" are on akka.io/blog/go-slow-to-go-fast (15 May 2026) with no speaker and no baseline; the page does not say Python. Do not attribute them to Jodie Wallis.
8. Forrester TEI (June 2021, Lightbend-commissioned, composite, five anonymous interviewees): ROI 139%, payback under six months. A vendor-commissioned model, not a customer measurement.
9. No named big bank gives a quantified result in the customer's own words. Capital One's 60% lower cost per decision is Akka's scorecard, and the repo marks the 60% as UNVERIFIED. Akka itself has no measured result on any public page; the AI Spend calculator ($836K vs $5.17M) is a vendor estimate.
10. Safest film form: named engineer or exec quote where one exists (Swiggy, Judopay, Wallis), numbers labelled "reported by Akka" otherwise.

## 2. Results table

| Customer | Result in the customer's units | Who said it | Verbatim | Source | Date | Label |
|---|---|---|---|---|---|---|
| Swiggy | P99 prediction latency 144 ms to 71 ms; over 5,000 peak predictions per second on one model; batch size 30 | Shrinath Agarwal, Software Developer, Swiggy (syndicated by Team Akka) | "over 5K peak predictions per second" for a single model; P99 71 ms at batch size 30; earlier P99 144 ms ("almost 2x gain") | https://akka.io/blog/2x-latency-improvement-in-swiggy-ml-and-ai-platform | 29 Feb 2024 | PUBLIC |
| Swiggy | "~50% less" compute per prediction; 2x latency reduction; one-minute city order-assignment SLA | Akka (no speaker) | "144ms → 71ms"; "5,000+ predictions per second on a single model"; "~50% less" | https://akka.io/customer-stories/swiggy | undated (footer 2026) | PUBLIC, vendor-authored; "~50% less" has no source in the blog post |
| Swiggy | 22% fewer tokens | internal study | none | repo (docs-positioning-study) | n/a | INTERNAL; not on any public page; do not use |
| Manulife | 30-50% faster processing, same prompts, same accuracy; up to 300% more concurrency | Akka write-up of a 19-minute talk; no speaker tied to the numbers | "30–50% faster processing — same prompts, same accuracy"; "Up to 300% more concurrency." | https://akka.io/blog/go-slow-to-go-fast | 15 May 2026 | PUBLIC, vendor-authored; baseline not stated |
| Manulife | Expects AI to generate $1 billion+ of enterprise value by 2027, roughly one-fifth from efficiency | Manulife (stated in Akka press release) | not a quote; release text | https://akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai | 10 Mar 2026 | PUBLIC; a Manulife goal, not a result of Akka |
| Manulife | "rewrote 70% of an existing AI system in weeks, 70% performance improvement"; "2,000 devs / 100 projects" | internal TCO analysis | none | C:\Users\tyler\competition\_internal\akka-tco-analysis.md; akka-facts.md | n/a | INTERNAL / UNVERIFIED |
| Verizon | 1,600 to 12,000 orders per minute (7.5x, tested); response time 6 s to 2.4 s; total cost of ownership "fell by half"; hardware footprint "halved"; build effort down 40%; sales +235%; conversion +197% | Akka (no speaker) | "12,000 orders per minute — up from 1,600"; "Total cost of ownership fell by half"; "The hardware footprint was halved"; "Sales increased 235% and conversion improved 197%" | https://akka.io/customer-stories/verizon | undated (footer 2026; Lightbend-era) | PUBLIC, vendor-authored |
| Capital One | 486 loan applications per minute, up from 100 (4.9x); 180-200 ms responses; legacy batch took "more than two days" | Akka (no speaker) | as listed | https://akka.io/customer-stories/capital-one | undated | PUBLIC, vendor-authored |
| Capital One | 60% lower cost per decision | Akka ROI scorecard; cost baseline not defined | "60% lower cost per decision" | same | undated | UNVERIFIED (repo rule); do not use |
| Judopay | 50% less production code; 2x test coverage; "fraction" of computing resources | Rob Howes, Head of Development, Judopay | "The biggest benefit of Akka is the reduction in code volume." | https://akka.io/customer-stories/judopay | undated | PUBLIC (quote named; numbers are the page's) |
| Fox / Tubi | 150,000 to 22,000 cores; 5 billion tokens per second; 3x development velocity; roughly 40% lower cost per personalized session | Akka (no speaker on the page) | "5 billion tokens per second"; "150,000 cores before porting; 22,000 after"; "3×" | https://akka.io/customer-stories/tubi | undated (footer 2026) | Page is PUBLIC; the figures are UNVERIFIED (proof audit 2026-10-26; commit f2e2c43 records 150,000 as "supplied by Tyler") |
| Fox / Tubi | none (qualitative) | Tubi CTO (Marios Assiotis at the time, per repo audit) | "Akka has enabled Tubi to provide customer experiences unlike any other in the video-on-demand space." (akka.io home wording; the about-us page and 2021 PDF word it differently) | https://akka.io/ ; https://akka.io/about-us | 2021 | PUBLIC; no number |
| Dojo | "Onboards thousands of merchants every month" | Akka home page (no Akka metric) | as quoted | https://akka.io/ | 2026-11-09 fetch | PUBLIC claim by Akka, no metric; Dojo not cleared for public material |
| Dojo | college graduates ship major AI systems "in weeks" | internal TCO analysis | none | C:\Users\tyler\competition\_internal\akka-tco-analysis.md lines 114, 224 | n/a | INTERNAL; Tyler must confirm and obtain permission |
| Forrester TEI | ROI 139%; payback under 6 months; NPV $5.05M (benefits PV $8.67M against costs PV $3.62M) over three years, composite organization | Forrester Consulting, commissioned by Lightbend; five anonymous interviewees | not quoted | https://content.lightbend.com/hubfs/collateral/datasheet/data_sheet_forrester_tei_report.pdf (found in search; only the snippet read here; figures cross-checked in roi-0) | June 2021 | PUBLIC; modelled, vendor-commissioned |
| Akka (own use) | AI Spend calculator: $836K with Akka vs $5.17M integrating on AWS, for "agentic infrastructure for 5 trillion tokens with 80% accuracy" | Akka | as quoted | https://akka.io/ | 2026-11-09 fetch | PUBLIC; VENDOR ESTIMATE, not a customer result |
| Other cards on the stories page (Akka-authored) | Esdiac 65% infrastructure cost cut; Yields "up to 90% lower cost"; Kodou 90% cost reduction; Leap Rail 20x fewer developers; Coho AI 75% faster to market; Trust1Team 3x development speed; DeductiveAI up to 90% faster RCA | Akka card text | card text only; pages not opened | https://akka.io/customer-stories | 2026-11-09 | Cards PUBLIC; Trust1Team and DeductiveAI cost claims UNVERIFIED per repo; open each page before use |

## 3. Items that need a decision

1. A "Fox" testimonial is reported by a search summary: 50% latency gain and 300% concurrency after porting Python agents to Akka, on akka.io/platform/overview-preview. The URL returned 404, and the live overview, home page and Manulife talk page contain no such text. Treated as UNVERIFIED and unusable. This may be where the "Python" baseline in the local files comes from; confirm with Tyler before saying "Python" next to the Manulife numbers.
2. Search snippets for the Manulife numbers on the platform overview page show Manulife's Wallis quote is about resilience, with no speed figure.
3. Capital One is listed on the stories page as "~200 ms loan decisions"; the story page says 180-200 ms.

## 4. What the sceptic will say

- "These are Akka's words." True for Verizon, Capital One, Tubi, Manulife numbers and the Swiggy page card. Only the Swiggy blog post and the Judopay quote are customer-attributed. Label the rest "reported by Akka".
- "Swiggy 144 ms to 71 ms is batching, not Akka versus an alternative." The post is about micro-batching and feature deduplication on Akka. Say "latency on Akka", never "Akka is 2x faster".
- "Verizon's cases are old." They are Lightbend-era and undated on the page. Show no date claim; do not say recent.
- "Forrester was paid for by Lightbend, and 37% of its benefit is assumed revenue." Both true; the composite assumes $20M per application per year.

## 5. Missing items for the film

- Fox: a named Tubi or Fox speaker with a figure; source of the cores and cost numbers; permission to name Fox.
- Swiggy: any cost, token or compute-per-prediction figure with a named speaker; permission for the film (an Akka-syndicated post is not film approval).
- Dojo: permission and a figure Dojo will stand behind.
- Manulife: permission to name with numbers; baseline; speaker for 30-50% and 300%.
- Big banks: no named bank has a customer-stated quantified result. Capital One is Akka-authored only.
- Akka itself: no measured internal result found.
