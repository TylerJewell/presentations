# ROI research 0: customer evidence inventory (all five dimensions)

Prepared 2026-11-09. Dimensions: D1 Specify and delivery speed, D2 runtime efficiency, D3 hyperscaler or infrastructure cost, D4 Akka Optimize and AI cost, D5 licences or tools removed.

Classes: PUBLIC means I opened the page and the words or numbers are on it. INTERNAL means a local file or Tyler-held knowledge that Tyler must confirm before use. UNVERIFIED means no primary source, or a source I could not open, and the claim must not be used.

Two sub-labels matter more than the class for this film:
- **NAMED** means a named person at the customer is quoted saying it.
- **VENDOR-AUTHORED** means the words are Akka's own copy on a customer-story page. No customer said them. The customer has not necessarily seen or approved the numbers.

## 1. Summary

1. **Almost no named customer says anything about money.** On the 37-story akka.io customer index I opened about 30 stories. Quotes from named people exist on only about 15 of them, and those quotes are about delivery speed, headcount and code volume, not about infrastructure savings or token cost.
2. **Most live cost and efficiency numbers are Akka copy, and some are unsourced.** `competition/case-studies/case-study-rules.md` section 6 allows "inventing ROI figures" where the source lacks them, and the live akka.io stories for Tubi, Swiggy and John Deere were rewritten under those rules. The repo's own proof audit (`competition/_internal/product-pages-study-2026-10-data/proof-audit.md`, 2026-10-26) finds the Tubi "150,000 to 22,000 cores", "5 billion tokens per second", "3x" and "40%" figures absent from the 2021 Lightbend case study. Commit f2e2c43 records the 150,000 line as "supplied by Tyler". Do not show them as a customer measurement without Tyler confirming the source.
3. **Best defensible measured result with a named engineer and a date: Swiggy.** Shrinath Agarwal, Software Developer at Swiggy, 29 Feb 2024: P99 prediction latency 144 ms to 71 ms at over 5,000 peak predictions per second for one model (batch size 30). It is a runtime result on Akka, not a comparison with Python, and it contains no cost or token figure.
4. **Best named-organization result for Python-to-Akka: Manulife**, published by Akka on 15 May 2026: "30-50% faster processing - same prompts, same accuracy" and "Up to 300% more concurrency". No Manulife person is quoted next to the numbers. The Manulife executive quotes in the 10 Mar 2026 press release say nothing about speed or cost.
5. **Best savings quantification, long public history: Verizon.** 1,600 to 12,000 orders per minute (7.5x), hardware halved, total cost of ownership about 50% lower, response time 6 s to 2.4 s. It is Akka-authored with no named speaker, the throughput is from testing, and it has been consistently reported since the Lightbend era (two independent mirrors agree).
6. **The only independent-in-form cost study is Forrester TEI (June 2021, commissioned by Lightbend):** five anonymous interviewees, a composite organization, ROI 139%, payback under 6 months. Infrastructure savings are 15% of its benefits ($1.31M of $8.67M present value).
7. **D3 (against hyperscalers) has no customer evidence.** No customer compares Akka with a hyperscaler's managed services or states a flat-fee saving. The nearest items are infrastructure reductions (Verizon, Esdiac 65%, Dream11 30%, Retisio 40%, Unomic 50% hardware), all Akka-authored.
8. **D4 (Optimize) has no customer evidence.** The Swiggy story is tagged "Akka Optimize" on akka.io, but its source post is about batching in an ML prediction service and has no token figure. The Swiggy "22% fewer tokens" is INTERNAL and absent from the live page.
9. **D5 (licences removed) is thin.** Verizon replaced "a decade-old Oracle commerce platform" and one Forrester interviewee (insurance IT director) reduced "nine different databases into just one". No licence cost is stated anywhere.
10. **D1 for Akka Specify specifically has no public customer proof.** Dojo (not permitted in public material), the "APAC bank" and the "North American grocer" are INTERNAL or UNVERIFIED, and the only public Dojo account credits Google's Gemini platform.

Weakest part of the story: the quotable people talk about speed and headcount; the money numbers are Akka's own words.

## 2. Customer inventory

Format: customer | industry | what they run on Akka | verbatim quote(s) with speaker and role | every stated number (unit, comparison) | URL | dimensions | class.

Dates: none of the akka.io story pages carries a date; each shows only a "(c) 2026" footer. Dates are given where a source states one.

### 2.1 Named-speaker quotes (the usable people)

| Customer | Industry | Runs on Akka | Quote | Numbers stated | URL | Dim | Class |
|---|---|---|---|---|---|---|---|
| **Swiggy** | Food delivery, logistics | Data Science Platform; ML prediction service for order assignment | Shrinath Agarwal, Software Developer, Swiggy, 29 Feb 2024 (syndicated from Medium): "over 5K peak predictions per second for a single model"; "P99 latency of 71 ms for a batch size of 30"; "Earlier P99 latency was 144 ms". The proof audit also gives "(almost 2x gain)" and "All tasks within the DSP system happen via actors." (audit quotes; I saw the first three on the page) | P99 144 ms to 71 ms (-50.7%); 5,000+ predictions/s on one model; batch 30; micro-batch sizes 5 and 10 made latency worse; city order assignment within 1 minute | https://akka.io/blog/2x-latency-improvement-in-swiggy-ml-and-ai-platform | D2 | PUBLIC, NAMED |
| **Manulife** | Insurance, asset management | Enterprise agentic AI platform (beta per release); underwriting quick quotes and intelligent document processing | Jodie Wallis, Global Chief AI Officer: "Our insurance and investment businesses are built on trust, and that same principle guides our approach to AI," (10 Mar 2026). Shamus Weiland, Global CIO: "Akka provides a secure, scalable software foundation to support high volumes of business applications..." (10 Mar 2026). In the 15 May 2026 talk page, answering a forecast of 3% monthly AI cost growth: Wallis: "Well, then we're out of business." | "30-50% faster processing - same prompts, same accuracy"; "Up to 300% more concurrency." (no named speaker); forecast 3% monthly AI cost growth "forever" (page narration); public commitment of $1B AI-driven value by 2027, about one-fifth from efficiency | https://akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai ; https://akka.io/blog/go-slow-to-go-fast | D2, D4 (cost governance, qualitative) | PUBLIC; numbers VENDOR-AUTHORED |
| **Coho AI** | AI revenue intelligence | Production AI platform, delivered via Akka | Michael Ehrlich, Co-founder and CTO: "With Akka, we got to market 75% faster compared to other solutions we had considered," | 75% faster to market (2 months versus an estimated 4-6 months; this is an estimate, not a parallel build); "60% lower operating overhead" and "40x growth" are on the page without a speaker | https://akka.io/customer-stories/coho-ai | D1 | PUBLIC, NAMED (the 60% is UNVERIFIED per local notes) |
| **Leap Rail** | Healthcare AI | Clinical AI for live operating-room data | Shayan Zadeh, CEO: "We needed to build something that would normally require a team of 40 or 50 engineers," and "The technology choices we made had to multiply our small team's output dramatically." | 5x faster development; 20x fewer developers (both versus building equivalent from scratch, no measured baseline) | https://akka.io/customer-stories/leap-rail | D1 | PUBLIC, NAMED quotes; 5x and 20x VENDOR-AUTHORED |
| **Doctolib** | Healthcare messaging | Secure messaging backend (Doctolib Siilo) | Jasper Aarts, Senior Staff Engineer: "What's great about Akka is that it just works. It's saved us a lot of hours in terms of setup," and "and we are able to run our entire backend system with just two engineers." | 1M+ providers; 2,500 messages/s at peak; 99.9999% availability; 2 engineers; 3 months to production | https://akka.io/customer-stories/doctolib | D1 | PUBLIC, NAMED |
| **Judopay** | Payments | Mobile and point-of-sale payments | Rob Howes, Head of Development: "The biggest benefit of Akka is the reduction in code volume," and "We're writing about 50% less code than we were before, and we've actually doubled our test code. That's a better ratio." | 50% less production code; test code doubled; "a fraction" of compute (no figure) | https://akka.io/customer-stories/judopay | D1 | PUBLIC, NAMED |
| **Giist Social** | Social platform | Bot-free social platform | Mauricio Aristizabal, Founder and CEO: "Without Akka, I would have needed to hire more people and it probably would have taken twice as long," and "Akka removed all of the infrastructure complexity for us." | 2x faster to market (his estimate) | https://akka.io/customer-stories/giist | D1 | PUBLIC, NAMED |
| **Dream11** | Fantasy sports | Contest Join service | Mahesh Jadhav, Software Architect: "Akka could deliver the scalability and resiliency required to handle our current number of participants and expected growth," | 30,000 joins/s at 150 ms; cloud infrastructure cost -30%; 1 month ahead of IPL deadline; 250M+ users; 1M in 2014 | https://akka.io/customer-stories/dream11 | D2, D3 | PUBLIC; quote is NAMED but has no number; 30% VENDOR-AUTHORED |
| **Retisio** | Retail commerce | ARC commerce solution for a major retailer | Sudhanshu Mohan, CEO: "Akka is a key enabler for the ARC commerce solution -- without it, we simply would not be able to deliver" | Page load 8 s to 2 s; cloud infrastructure cost -40%; conversion +63% over Black Friday and Cyber Monday; checkout 2x faster | https://akka.io/customer-stories/retisio | D3 | PUBLIC; numbers VENDOR-AUTHORED |
| **Yields** | Financial model management | Event-based model-governance platform | Sebastien Viguie, Co-founder and CISO: "We wanted to represent everything on our platform as events, which Akka enabled us to do." | "Up to 90%" lower model-validation cost (versus manual repeated review); 65% faster validation cycles; 20x more models in parallel | https://akka.io/customer-stories/yields | D1 | PUBLIC; the 90% is a customer-cost-reduction claim about the customer's own process, not Akka infrastructure. Do not use it as the "up to 90% lower infrastructure cost" claim |
| **eero (Amazon)** | Consumer networking | Cloud control plane for home Wi-Fi | John Lynn, Cloud Platform Manager: "As data moves throughout your systems, consistency is harder and harder to maintain." | 10M+ home networks; under $0.02 per managed home per month (page figure, unattributed) | https://akka.io/customer-stories/eero | D3 | PUBLIC; cost figure VENDOR-AUTHORED, "Unverified" in local notes |
| **MrCall** | Telecom, AI voice | AI call centre | Angelo Leto, founder: "With Akka, we were able to build the entire platform as a distributed system from day one," | 2 developers; thousands of simultaneous calls | https://akka.io/customer-stories/mrcall | D1 | PUBLIC, NAMED |
| **TeamMood** | Employee feedback | Feedback platform | Nicolas Deverge, CEO and Founder: "Akka made it easy for me to build a scalable system supporting tens of thousands of users," | 1 developer; 100% uptime for 8+ years; 20K+ users on one server | https://akka.io/customer-stories/teammood | D1, D2 | PUBLIC, NAMED |
| **Kodou** | Code modernization | AI tool that removes enterprise technical debt | Yves Jean, Founder: "We saw that enterprises were spending enormous amounts on consulting engagements to modernize their codebases," | 10x faster than consulting; under 10% of consulting cost; 90% cost cut; all vendor-authored | https://akka.io/customer-stories/kodou | D1 (a competitor to modernization consulting, not a user of Akka Specify) | PUBLIC; numbers VENDOR-AUTHORED |
| **HPE (InfoSight)** | Technology | Telemetry platform | Jeff Dutton: "We have something like 1.2 million systems calling home with over 20 billion sensors," and "We really couldn't find another technology that would be able to scale the way we needed it to." His title is "VP of Engineering" on the HPE story page, "Data Platform Architect" on the about-us page and on case study mirrors: confirm before naming a title. | 1.2M systems; 20B+ sensors; trillions of metrics/day | https://akka.io/customer-stories/hpe ; https://akka.io/about-us | D2 | PUBLIC, NAMED (title conflict) |
| **CERN** | Research | Accelerator control data | Marcin Sobieszek, Senior Computing Engineer (truncated on about-us): "The self-healing capabilities of Akka are really impressive: during broader infrastructure maintenance, the cluster shuts..." (fetch truncated; get the full sentence before use) | 2.5M signals/day (about 3.5 TB/day); 100,000 messages/s; 0 data loss in maintenance | https://akka.io/about-us ; https://akka.io/customer-stories/cern | D2 (reliability) | PUBLIC, NAMED (truncated) |
| **Esdiac** | Telecom, calling and payments | International calling platform | Bassirou Rabo, CTE: "Esdiac's strength and reliability as a communication platform is undeniably linked to the robust capabilities of Akka" (about-us). The story page paraphrases him; no cost quote. | 65% lower infrastructure cost, 3x faster delivery, 10x users (5,000 to tens of thousands), 400+ cities. No speaker states any number. | https://akka.io/customer-stories/esdiac | D3 | PUBLIC; 65% VENDOR-AUTHORED; Esdiac's cost is "UNVERIFIED" under Tyler's rule 1 for the cost claims named there only if it matches the local list (Trust1Team, Norwegian, DeductiveAI, Coho); Esdiac is not on that list, but no speaker backs it |
| **Tubi (Fox)** | Streaming | Content personalization engine | Marios Assiotis, CTO at the time, 2021: "Akka and reactive streams have enabled Tubi to provide customer experiences unlike any other in the video-on-demand space." (wording as on akka.io/about-us; the 2021 Lightbend PDF wording differs per the proof audit; I could not read that PDF). He no longer holds the CTO role per the audit. | None attributable to a speaker. Story page: 150,000 to 22,000 cores (-85%), 5B tokens/s, 3x velocity, 40% lower cost per session, all VENDOR-AUTHORED and unsourced per the audit | https://akka.io/about-us ; https://akka.io/customer-stories/tubi | D2 | Quote PUBLIC, NAMED; numbers UNVERIFIED (INTERNAL provenance: "supplied by Tyler") |
| **Walmart (Canada)** | Retail | Web and mobile commerce rebuilt on Scala, Akka, Play, integrated with existing Oracle ATG | Simon Rodrigue, VP of eCommerce: "was good for our bottom line." (fragment only, on akka.io/customer-stories/walmart; the casestudies.com mirror of the same story carries no quote) | Conversion +20% and mobile orders +98% within four weeks of launch; page load -36%; 400,000 page views/hour; developer startup 7x faster; development time 2-3x lower; long-term infrastructure cost 20-50% lower; about 40% of compute moved from dedicated hardware to commodity servers | https://akka.io/customer-stories/walmart | D1, D3 | PUBLIC; numbers VENDOR-AUTHORED; historic (Lightbend era, about 2013-2015, undated on the page) |
| **Deloitte (partner)** | Consulting | Reseller and delivery partner | Anand Nimkar, Partner and Applied AI practice leader, Deloitte Canada, 26 Aug 2025: "Akka provides the industry's best way to build agentic AI systems that scale in the enterprise" (full: "...and ensure stability, performance, and outcomes.") | Akka's own claims in the same release: 1B+ downloads; "three times the velocity using one-third the compute"; 10M TPS benchmark | https://akka.io/blog/news-akka-and-deloitte | Partner, not a user | PUBLIC. Not a customer saving |

### 2.2 Akka-authored stories with figures and no named speaker

| Customer | Industry | What they run on Akka | Numbers on the page (unit, comparison) | URL | Dim | Class |
|---|---|---|---|---|---|---|
| **Verizon** | Telecom | Online sales and commerce platform replacing a decade-old Oracle commerce platform; Alexa, Google Home, Facebook chatbot channels | 1,600 to 12,000 orders/min (7.5x, tested); response 6 s to 2.4 s; TCO about 50% lower; hardware halved; build effort 40% less; sales +235%; conversion +197%; feature cadence from two months to continuous; annual six-month rebuild of a parallel storefront eliminated. Mirror at asiagrowthpartners.com adds "legacy Oracle system required 20GB of reserved memory... under 500MB" (undated third-party mirror, unverified). Lightbend-era title: "Doubling Results with Half the Hardware". | https://akka.io/customer-stories/verizon ; https://www.casestudies.com/company/akka/case-study/verizon-wireless-deploys-akka-and-doubles-overall-business-and-performance-results-using-half-the-hardware | D2, D3, D5, D1 | PUBLIC, VENDOR-AUTHORED, no quote |
| **Capital One** | Banking | Auto Navigator on AWS | 486 loan applications/min versus 100 (4.9x); decision in 180-200 ms versus a batch process of over two days; about 4M cars from 12,000+ dealers. "60% lower cost per decision" appears on the live Capital One story and the search-engine copy, but local files mark it UNVERIFIED | https://akka.io/customer-stories/capital-one | D2 | PUBLIC for throughput and latency; the 60% is UNVERIFIED per local rule, do not use |
| **John Deere** | Agriculture machinery | Precision Ag service on combines | 1,000+ sensors per combine (source: 2021 Lightbend PDF "as many as 1000+"); "1M+ sensor events per second" is not in the 2021 source (proof audit); "a fraction of the compute" has no figure; the local "half" is UNVERIFIED | https://akka.io/customer-stories/john-deere | D2 | PUBLIC for sensors; 1M events and "half" UNVERIFIED |
| **Norwegian Cruise Line** | Cruise | ncl.com majority, partner API front end, shipboard payments | 4x more frequent releases; 65+ deployments in 12 months with zero rollbacks; 3x wave-season peak; 2+ years of shipboard payments with no crash; page says "an estimated 45%" lower run cost (UNVERIFIED per local rule) | https://akka.io/customer-stories/norwegian-cruise-line | D1 (releases), D2 | PUBLIC; 45% UNVERIFIED |
| **Trust1Team** | Technology services | 40+ delivered projects; invoice processing | 3x development speed (one microservice per sprint to three, three-person team); 15M invoices/year; page says 40% lower operational overhead (UNVERIFIED per local rule). The only attributed statement is paraphrased: Michallis Pashidis, Founder and CEO, is "confident Akka will increase developer productivity and deliver 3x acceleration" | https://akka.io/customer-stories/trust1team | D1 | PUBLIC for 3x claim as stated; 40% UNVERIFIED |
| **DeductiveAI** | AI root-cause analysis | Incident-diagnosis agents | Up to 90% faster root cause analysis (versus manual triage); time-to-mitigation -70% on average; 10-person team; page says 60% lower cost to operate (UNVERIFIED per local rule) | https://akka.io/customer-stories/deductive-ai | D1, D4 (agent guardrails against runaway token use, qualitative) | PUBLIC for 90% and 70%; 60% UNVERIFIED |
| **Renault Group / reflek.io** | Manufacturing | Digital-twin platform | 6 systems unified into 1; 20% lower parts inventory; 35+ plants. Jean-Philippe Le Roux, CEO, reflek.io: "The digital twins at Renault need to be available in any location and to be moveable from place to place." (about-us) | https://akka.io/customer-stories/renault | D5 (systems consolidated) | PUBLIC; numbers VENDOR-AUTHORED |
| **Unomic** | Manufacturing IIoT | Real-time IIoT streaming | Software development cost -30%; hardware cost -50%; defect rate 1,000 ppm to 500 ppm (page title and body, mirror; no speaker; Lightbend-era) | https://www.casestudies.com/company/akka/case-study/unomic-empowers-manufacturers-and-healthcare-providers-to-boost-quality-and-speed-with-advanced-ai-and-iiot-solutions | D3 | PUBLIC mirror; VENDOR-AUTHORED |
| **WhitePages** | Directory search | Rebuilt core services | "15x reduction in server count for the heaviest services"; one service 60 servers to 5; "two orders of magnitude improvement in 99th-percentile latency on network-bound processes" (Lightbend-era; Devin Ben-Hur, Senior Architect, is the named contact, not quoted) | https://www.casestudies.com/company/akka/case-study/whitepages-rebuilds-core-parts-of-application-stack-with-scala-and-akka-to-improve-scaling | D2, D3 | PUBLIC mirror; undated; VENDOR-AUTHORED |
| **HPE, Icon Solutions, Doctolib, Cone Center, Ramen, Simplifier, Klubraum, Datylon, Horn, 55Rush, MCM** | various | various | Scale and reliability figures only (for example Klubraum 99.9999% availability and 200K+ users; Cone Center sub-5 ms across 24 countries). Not relevant to the five dimensions | https://akka.io/customer-stories | none | PUBLIC, VENDOR-AUTHORED |

### 2.3 Long-standing users: verified and unverified

| Customer | Result of checking | Source | Class |
|---|---|---|---|
| **PayPal** | Verified as an Akka user: High Scalability, 15 Aug 2016: "PayPal moved to an Actor model based on Akka." It reports about a billion hits a day on 8 VMs, "might traditionally run on a 100s of VMs" (the article's phrase, not a PayPal measurement), "stay responsive even at 90% CPU", "jobs that take 1/10th the time". It cites the PayPal Engineering post "squbs: A New, Reactive Way for PayPal to Build Applications" (11 May 2016), which I could not open. A search snippet attributes "Powered by Akka Platform and Scala, squbs has already provided very high-scale results with a low infrastructure footprint" to Akara Sucharitakul (PayPal) in a Lightbend case study; that page now redirects to the customer index. One secondary blog claims PayPal later ran over a thousand VMs. | https://highscalability.com/how-paypal-scaled-to-billions-of-transactions-daily-using-ju/ | PUBLIC for the 2016 claim; no named quote opened; dated 2016. D2, D3 |
| **LinkedIn** | Verified as a Lightbend-era case study: "over 160 million members", Play hot-reload "saving minutes per change"; Dean Thompson, Principal Architect, is the named contact; no quote or cost figure. | https://www.casestudies.com/company/akka/case-study/bringing-reactive-applications-to-the-java-virtual-machine | PUBLIC, no usable figure |
| **Zalando** | Verified as an Akka user by Zalando's own engineering blog (posts 2016-2019 on Akka HTTP, Akka Streams, distributed cache; a 2026 post says Akka Cluster deployments polling the Kubernetes API caused control-plane incidents). No customer saving. | https://engineering.zalando.com/tags/akka.html | PUBLIC, no ROI figure; the 2026 post is a caution |
| **Starbucks, Verizon, Tesla, PayPal, Fortnite (Epic)** | Named together as Akka users in an HPCwire article, 23 Feb 2021; I could not open it (HTTP 403), so I have only a search snippet. Akka's blog also lists "Disney Streaming, General Motors, HPE, ING, Norwegian Cruise Line, Starbucks, Tesla" per a search snippet I did not open. | https://www.hpcwire.com/bigdatawire/2021/02/23/akka-cloud-platform-now-on-aws/ | UNVERIFIED until the pages are opened |
| **Intel** | Not shown as a user. Intel Capital led Lightbend's $20M Series C (May 2016, Fortune); Lightbend and Intel announced a GearPump collaboration (Feb 2016). An undated Intel architect slide deck describes an Akka IoT pipeline. | https://fortune.com/2016/05/26/intel-capital-leads-20-million-investment-in-lightbend | Investor and collaborator PUBLIC; customer status UNVERIFIED |
| **Hulu** | No Akka source found. Hulu's Scala data-platform deck does not mention Akka in the snippet. | none | UNVERIFIED |
| **Comcast** | No source found. | none | UNVERIFIED |
| **Tencent** | No source found. | none | UNVERIFIED |
| **Disney Streaming, GM, ING, Tesla** | Name appears in a snippet of Akka's blog; not opened. | none opened | UNVERIFIED |
| **Tubi before Fox** | Tubi engineering blog (code.tubitv.com, "A fully reactive ad serving platform using Scala & Akka-Streams") and a Scylla Summit 2019 talk (Alexandros Bantis) describe Tubi's Ranking Service and Popper as Scala/Akka applications. Neither was opened. | https://code.tubitv.com/a-fully-reactive-ad-serving-platform-using-scala-akka-streams-13299e7ea04e | PUBLIC existence; contents UNVERIFIED by me |

### 2.4 Forrester TEI (June 2021, commissioned by Lightbend)

Source: https://content.lightbend.com/hubfs/collateral/report/lightbend_akka_platform_the_total_economic_impact.pdf (text extracted locally and read). Consulting team: Adi Sarosa, Isabel Carey, Sean McCormick. Five interviewed organizations: consumer electronics (200 employees), insurance (36,000), financial services (1,000), energy (100), entertainment (200). All are anonymous; none can be named. Class: PUBLIC, vendor-commissioned.

Verbatim quotes with the interviewee's role:
- Entertainment CTO: "By moving from our prior environment of PHP and Python to Akka Platform, we immediately realized much more efficient run times and savings in compute time. Once Akka Platform was implemented, the result was immediate." (D2)
- Entertainment CTO: "[We saved] 10 times in server compute power requirement by using Akka Platform, which resulted in cost avoidance on database spend that we would have needed if we did not have a Akka Platform subscription." (D2, D3)
- Entertainment CTO: "The biggest benefit we realize from Akka Platform is developer productivity. We can do a completely custom data management platform and dynamic app configuration with only five people." (D1)
- Entertainment CTO: "...we were able to attribute 5% of our revenue to the fact that we now have a better-performing system with fewer outages and [less] downtime."
- Consumer electronics cloud platform manager: "Without Akka Platform, our database spend would have been two to three times higher." (D3)
- Consumer electronics cloud platform manager: "Without Akka Platform, we would have had to hire 30% more engineers." (D1)
- Insurance IT director: "In certain areas of our business, we have been able to reduce the prior use of nine different databases into just one database." (D5)
- Insurance software engineer: "Since switching to Akka Platform, we've seen 20 times increase in our developer throughput." (D1)
- Financial services business unit head: "With Akka Platform, I'm doing the same work at half the cost." (compared with outsourcing to an external managed services company; D5)
- Energy senior director of engineering: "Switching to Akka Platform has allowed us to gradually reduce our infrastructure cost -- mainly AWS spend -- at a 10% annual rate." (D3)
- Energy senior director of engineering: "The time from ideation to deployment in certain processes of our business has gone from four weeks to as fast as one week." and "go from code to production in 20 minutes" (D1)

Study figures: benefits PV $8.67M, costs PV $3.62M, NPV $5.05M, ROI 139%, payback under 6 months (composite, 3 years). Benefit PVs: incremental revenue $3.25M, faster time-to-value $1.48M, developer efficiency $2.63M, infrastructure cost savings $1.31M. Key assumptions the study states: each application earns $20M a year, 10% margin, infrastructure cost assumed at 2% of revenue, 50% infrastructure efficiency, development time 12 months with 50% savings.

## 3. Matrix: how strongly each customer supports each dimension

Strong: a named person's words, or a measured figure with a stated comparison, on a primary page. Some: an Akka-authored figure or a qualitative statement. None: nothing relevant.

| Customer | D1 Specify / delivery | D2 Runtime efficiency | D3 Hyperscaler / infra cost | D4 Optimize / AI cost | D5 Licences removed |
|---|---|---|---|---|---|
| Swiggy | none | **strong** (named engineer, dated, measured) | none | none (the "22% fewer tokens" is INTERNAL) | none |
| Manulife | none public | some (30-50% faster, up to 300% more concurrency; Akka-authored) | none | some (Wallis on a 3% monthly cost forecast; no saving stated) | none |
| Verizon | some (40% less build effort, continuous delivery) | some (7.5x, tested) | some (hardware halved, TCO -50%) | none | some (replaced Oracle commerce platform; no licence cost) |
| Coho AI | **strong** (CTO quote, 75% faster, an estimate) | none | none | none | none |
| Leap Rail | strong (CEO quotes, headcount) ; 5x and 20x Akka-authored | none | none | none | none |
| Doctolib | **strong** (two engineers, three months) | some (99.9999%) | none | none | none |
| Judopay | **strong** (50% less code, named) | some ("a fraction of the compute", no figure) | none | none | none |
| Giist Social | strong (CEO: twice as long, more hires) | none | none | none | none |
| Forrester interviewees (anonymous) | strong (several, anonymous) | **strong** (10x server compute, PHP/Python to Akka; anonymous, 2021) | some (DB spend 2-3x higher without Akka; AWS spend -10%/yr) | none | some (nine databases to one; half the cost of outsourcing) |
| Tubi (Fox) | some (3x velocity, unsourced) | some (150,000 to 22,000 cores, unsourced) | some (40% lower cost per session, unsourced) | none | none |
| Walmart Canada | some (dev time 2-3x lower) | some | some (20-50% lower infra cost; 40% of compute to commodity servers; historic) | none | none (integrates with Oracle ATG) |
| Esdiac | some (3x faster delivery) | none | some (65% lower infra cost; no speaker) | none | none |
| Dream11 | none | some (30,000 joins/s at 150 ms) | some (cloud cost -30%) | none | none |
| Retisio | none | some (8 s to 2 s) | some (cloud cost -40%) | none | none |
| Unomic | none | none | some (hardware -50%, software cost -30%; Lightbend-era) | none | none |
| WhitePages | none | some (15x fewer servers; Lightbend-era) | some | none | none |
| PayPal | none | some (8 VMs for a billion hits a day, 2016) | some | none | none |
| Capital One | none | some (486/min vs 100; 180-200 ms) | UNVERIFIED (60%) | none | none |
| Norwegian Cruise Line | some (4x release frequency) | none | UNVERIFIED (45%) | none | none |
| Trust1Team | some (3x, paraphrased) | none | UNVERIFIED (40%) | none | none |
| DeductiveAI | some (90% faster RCA) | none | UNVERIFIED (60%) | some (guardrails vs runaway token use; qualitative) | none |
| eero | none | some (10M+ networks) | some (under $0.02/home/month; UNVERIFIED) | none | none |
| Kodou | some (10x modernization; a vendor, not a user of Specify) | none | none | none | none |
| John Deere | none | some | UNVERIFIED ("half") | none | none |
| Renault | none | none | none | none | some (6 systems into 1) |
| MrCall, TeamMood | some (2 developers, 1 developer) | some (100% uptime 8+ years) | none | none | none |
| Dojo | INTERNAL claims only; not permitted in public material | none | none | none | none |

Count of "strong" in D3, D4 or D5: none for a named customer. D3 is "some" at best; D4 has no customer evidence; D5 has no stated licence saving.

## 4. The three best stories for a 2.5-minute film

Selection test: a named person, a date, a number with a stated comparison, and a page Tyler can point to.

**1. Swiggy (D2).** Source: Shrinath Agarwal, Software Developer, Swiggy, 29 Feb 2024, https://akka.io/blog/2x-latency-improvement-in-swiggy-ml-and-ai-platform.
Words that could be shown: "over 5K peak predictions per second for a single model, with a P99 latency of 71 ms for a batch size of 30. Earlier P99 latency was 144 ms."
Number card: P99 prediction latency 144 ms to 71 ms, one model, batch size 30.
Do not add: "22% fewer tokens", "~50% less compute", or "Akka Optimize". None of them is in the source.

**2. Manulife (D2, D4).** Sources: Jodie Wallis, Global Chief AI Officer, Manulife, 10 Mar 2026 press release; Akka's 15 May 2026 talk page.
Words that could be shown: Wallis: "Our insurance and investment businesses are built on trust, and that same principle guides our approach to AI." Then, from the talk page and attributed to Akka's account of the work: "30-50% faster processing - same prompts, same accuracy" and "Up to 300% more concurrency." Wallis on a 3% monthly AI cost growth forecast: "Well, then we're out of business."
Conditions: the 30-50% and 300% have no named speaker, so label them "reported by Akka" on screen; the "Python" origin of the ported systems is in `competition/_internal/akka-facts.md`, and I did not see it in the page text I fetched, so confirm before saying "Python". The 50% / 300% quote attributed to Wallis on the local overview copy ("We ported our Python agents to Akka...") is not on the live akka.io overview page and must not be used. Tyler must confirm Manulife's permission to be named with numbers.

**3. Verizon (D2, D3, D5) as the number card, with Coho AI (D1) as the person.**
Verizon words that could be shown (page text, Akka-authored, no speaker): "Verizon replaced a decade-old Oracle commerce platform with Akka." Numbers: 1,600 to 12,000 orders per minute (tested); hardware footprint halved; total cost of ownership about 50% lower; response time 6 seconds to 2.4 seconds. Attribute to "Akka customer story", not to Verizon.
Coho AI words (named): Michael Ehrlich, Co-founder and CTO: "With Akka, we got to market 75% faster compared to other solutions we had considered." Say on screen that the comparison was an estimate of four to six months against two months.
If only three slots exist and a named person is required in each, use Swiggy, Manulife and Coho, and show Verizon as a single unattributed-speaker number card.

## 5. Claims table

| Claim | Number and unit | Compares | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|---|
| Swiggy P99 latency | 144 ms to 71 ms, 5,000+ predictions/s | before and after batching on Akka, one model, batch 30 | akka.io/blog/2x-latency-improvement-in-swiggy-ml-and-ai-platform | 29 Feb 2024 | PUBLIC | high | Runtime, not Python comparison; no cost |
| Manulife speed | 30-50% faster | before and after port, same prompts and accuracy | akka.io/blog/go-slow-to-go-fast | 15 May 2026 | PUBLIC, vendor-authored | medium | No speaker, no workload, no baseline stated |
| Manulife concurrency | up to 300% more | same | same | 15 May 2026 | PUBLIC, vendor-authored | medium | "Up to" |
| Verizon throughput | 1,600 to 12,000 orders/min (7.5x) | legacy Oracle commerce platform vs Akka, tested | akka.io/customer-stories/verizon; casestudies.com mirror | undated | PUBLIC, vendor-authored | medium-high | Consistent across Lightbend-era and current copies |
| Verizon hardware and TCO | hardware halved; TCO about 50% lower | same | same | undated | PUBLIC, vendor-authored | medium | No named speaker |
| Walmart Canada | conversion +20%, mobile +98%, infrastructure -20-50% | before and after rebuild | akka.io/customer-stories/walmart | undated, historic | PUBLIC, vendor-authored | medium | Rodrigue's only quoted words are a fragment |
| Tubi cores | 150,000 to 22,000 | before and after porting | akka.io/customer-stories/tubi | undated | UNVERIFIED | low | Not in the 2021 source; "supplied by Tyler" (commit f2e2c43) |
| Tubi 5B tokens/s | 5 billion tokens/s | throughput | same | undated | UNVERIFIED | low | Not in the 2021 source |
| Capital One cost | 60% lower per decision | unspecified | akka.io/customer-stories/capital-one | undated | UNVERIFIED | low | Local files forbid it |
| John Deere "half" | infrastructure cost half | unspecified | local rewrite only | none | UNVERIFIED | low | Live page says only "a fraction of the compute" |
| Esdiac | 65% lower infrastructure cost | previous footprint, same call volume | akka.io/customer-stories/esdiac | undated | PUBLIC, vendor-authored | medium-low | No speaker; paraphrased CTE |
| Dream11 | cloud cost -30%; 30,000 joins/s at 150 ms | before and after | akka.io/customer-stories/dream11 | undated | PUBLIC, vendor-authored | medium | Quote has no number |
| Retisio | cloud cost -40% | before and after | akka.io/customer-stories/retisio | undated | PUBLIC, vendor-authored | medium-low | |
| Forrester composite | ROI 139%, payback under 6 months | composite organization over 3 years | Lightbend-commissioned Forrester TEI | June 2021 | PUBLIC | medium | Revenue assumptions drive 37% of benefits |
| Forrester entertainment CTO | 10x server compute | PHP and Python to Akka | same | June 2021 | PUBLIC, anonymous | medium | Cannot be named |
| PayPal | about 1 billion hits/day on 8 VMs | hypothetical "100s of VMs" | highscalability.com | 15 Aug 2016 | PUBLIC | medium-low | PayPal post not opened; a hypothetical baseline |
| "Up to 90% lower infrastructure cost" | up to 90% | Python-based systems at the same agentic volume | `competition/_internal/akka-facts.md` | 2026-07-03 | INTERNAL | low | I found no primary public source; the go-slow-to-go-fast page does not contain it. Yields' "up to 90%" is a different claim |
| 10 trillion tokens/core/year; 80% less compute | numbers | vs ~2T / Python | akka-facts.md | 2026-07-03 | INTERNAL | low | Not on the cited page (proof audit O7, and my fetch) |
| Manulife "2,000 devs / 100 projects" | counts | n/a | akka-facts.md | none | UNVERIFIED | low | Not in the press release; entered the repo 2026-08-02 |
| Dojo, APAC bank, grocer, Ntiva | weeks; 2 months to parity; $2M/yr removed; 2,000 TPS in days | n/a | `akka-tco-analysis.md`, positioning notes | none | INTERNAL / UNVERIFIED | low | Dojo is not permitted in public material; positioning notes say "confirm the figures, decide attribution" first |
| Swiggy "22% fewer tokens" | 22% | tokens | internal docs-positioning-study | none | INTERNAL | low | Absent from live page and source post |

## 6. Worked example

The data does not support one cross-customer dollar example, because no customer states a dollar saving and the units differ (latency, orders per minute, hardware count, percent). Two bounded calculations are possible.

**A. Forrester composite (an existing model, not a measurement).**
- Benefits PV $8,670,398 against costs PV $3.62M gives NPV $5.05M. ROI = 5.05 / 3.62 = 139.5%, which matches the reported 139%.
- Benefit lines (PV): revenue $3.25M (37.5%), developer efficiency $2.63M (30.3%), time-to-value $1.48M (17.0%), infrastructure $1.31M (15.2%).
- Infrastructure line inputs: infrastructure cost assumed at 2% of revenue; each application $20M a year; 50% efficiency; risk adjustment -10%. Year totals: $360,000, $540,000, $720,000 (sum $1.62M; PV $1.31M).
- Range: remove the revenue benefit and the ROI falls, because benefits PV would be $5.42M against costs of $3.62M, an ROI of about 50% (derived by me from the table, not a Forrester figure).
- Holds at: a composite built from five firms of 100 to 36,000 employees in 2021, on Lightbend Akka Platform pricing of that time.

**B. Verizon, as stated.** 7.5x orders per minute on half the hardware implies 15x orders per minute per unit of hardware (7.5 / 0.5). This is my derivation. It rests on a test, not production, and on the page's unspecified hardware unit. Say "7.5x orders on half the hardware", not 15x.

## 7. Objections and answers

- **"These are Akka's words."** True for most. Named-person evidence: Swiggy (measured, dated), Coho, Doctolib, Judopay, Leap Rail, Giist, Dream11, Retisio, HPE, Forrester anonymous interviewees. Answer: show the named ones and label the rest "reported by Akka".
- **"Cases from 2013-2021 are stale."** Verizon, Walmart, Unomic, WhitePages, Forrester and Tubi's quote predate the current product and company name. Answer: none; show the date or the phrase "Lightbend-era".
- **"Akka Specify is new; what is the delivery proof?"** Public proof is of Akka SDK and platform delivery speed. None names Akka Specify. Dojo and the APAC bank are INTERNAL.
- **"Where is the hyperscaler comparison?"** None exists from a customer. Do not show one.
- **"The 7.5x is a test."** Yes, the page says so. Say "in testing".
- **"Tubi's 150,000 to 22,000 cores?"** The audit finds it unsourced. Do not show it without a Tyler-confirmed source.
- **"Capital One, Norwegian, Trust1Team, DeductiveAI, Coho cost figures"** are UNVERIFIED under Tyler's rule and must stay off screen. Coho's 75% faster is a different, quoted claim and is usable.

## 8. Gaps

Tyler or the team must supply or confirm:
1. Permission to name Manulife with the 30-50% and 300% figures, and whether the workload was Python (state the baseline).
2. The source of the Tubi core counts and the 40%, or drop them.
3. Whether Verizon, Walmart, Swiggy or Coho will be named in a film (Akka-authored pages are not customer approval).
4. Any customer who has measured a hyperscaler comparison, a token or model saving in Optimize, or a licence retired. None is public.
5. The full CERN quote, HPE's correct title for Jeff Dutton, and the PayPal engineering post (squbs, 11 May 2016) and the HPCwire 2021 article, which I could not open.
6. The 2021 Lightbend PDFs for Tubi and John Deere (readable only in the audit's local copies at `competition/_internal/product-pages-study-2026-10-data/` and scratchpad `proofsrc\`).
7. The 19-minute Manulife talk transcript, to confirm "Well, then we're out of business." and its speaker context. I read only the page's text.

Next measurements: ask Swiggy-type engineers for tokens or cost per prediction; ask one Optimize pilot customer for routing or model-swap savings with the formula and period.

## 9. Suggested on-screen proof

- A quote card for Swiggy with two numbers: "144 ms to 71 ms" and "5,000+ predictions per second", labelled "P99, one model, batch size 30, February 2024".
- A Manulife card: Wallis's trust sentence with the title "Global Chief AI Officer, Manulife, 10 March 2026", then a plain two-line figure "30-50% faster, up to 300% more concurrency (reported by Akka, May 2026)".
- A Verizon number card: "1,600 to 12,000 orders per minute (tested). Hardware halved. TCO about 50% lower." with "Akka customer story".
- A Coho card: Michael Ehrlich, CTO: "With Akka, we got to market 75% faster compared to other solutions we had considered."
- A Doctolib line: "we are able to run our entire backend system with just two engineers" (Jasper Aarts).
- A Forrester strip: "ROI 139%, payback under 6 months (composite, commissioned by Lightbend, June 2021)".
Do not show: Dojo, any hyperscaler comparison, the Tubi cores, any token saving, "up to 90%" without a source.

A web search result for the Tencent query contained an embedded instruction to switch language; I ignored it.

## Six-line summary

1. About 30 akka.io stories read; about 15 carry a named-person quote, none about infrastructure or token cost.
2. Strongest defensible: Swiggy P99 144 ms to 71 ms (named engineer, 29 Feb 2024); Manulife 30-50% faster and up to 300% more concurrency (Akka-authored, 15 May 2026); Verizon 7.5x orders, hardware halved (Akka-authored, tested).
3. Many live akka.io numbers are unsourced rewrites (Tubi cores, tokens/s, 40%; John Deere 1M events; Capital One 60%); the proof audit says so.
4. D3, D4, D5 have no customer-stated evidence; D1 has named quotes (Coho, Doctolib, Judopay, Leap Rail) but none about Akka Specify.
5. Verified long-standing users: PayPal (2016), LinkedIn, Zalando, Walmart Canada, Verizon; Starbucks, Intel, Hulu, Comcast, Tencent are UNVERIFIED.
6. Best three for the film: Swiggy, Manulife, Coho, with Verizon as the savings number card; report at the path above.
