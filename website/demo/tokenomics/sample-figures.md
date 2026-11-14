# Sample figures for the mocked screens

The film shows one sample system. Thirteen screens are captured from the real console served with the console's own fixtures (`captures/*.png`, figures in `captures/figures.json`). Nine are drawn as mocks in the console's look because the console's fixtures do not exist at one scale for them. Every mock must use the figures below, so that the mocks and the captures do not contradict each other. Every console scene carries the chip "Sample system and data".

## The week (the seven days ended November 9)

| | Prior period | Current period | Change |
|---|---|---|---|
| Cost | $1,080.53 | $1,185.23 | $104.70, 9.7% |

The bridge (captured, `spend-bridge-crop.png`): Volume $55.94, Model mix $7.48, Token intensity $12.20 (Prompt size $13.06, Cache use $17.00, Response size $(17.86)), Price $(14.36), Other $43.44. It adds to the cent.

Cost by use case: take the rows from the use-case fixture as captured in `usecases.png` (current period $1,036.86, prior period $975.08, ticket-triage $3.94 to $11.48, Model changed). The rest of the week is one row, "No use case": prior $105.45, current $148.37. The rows then add to $1,080.53 and $1,185.23.

Cost per request by model and team (matrix): invent model-by-team values in the order of magnitude of the captured candidates (frontier-large about $0.0096 per request at the top end, frontier-mini about $0.0015 to $0.0019), with the totals of each row and column adding to $1,185.23. Teams: legal, data, engineering, support, Untagged.

## The month (November 2026, day 9 of 30)

Daily average from the week: $169.33.
- All traffic: budget $5,000. Cost to date $1,524. Projected cost at period end $5,080 (80% range $4,860 to $5,330). Status: Projected over. Runs out about November 29.
- Support team (owner: the head of support): budget $2,600. Cost to date $840 (32.3%). Plan to date $780, so variance to plan $60 over. Projected $2,950 ($2,770 to $3,160). Runs out about November 26. Thresholds set in advance: notify at 80%, reroute to the smaller model at 100%, block at 110%. Actions shown with the purple chip "Applied by the demo".
- Smaller budgets for the same sample: ticket-triage $1,100 (Projected over), contract-analyst $900 (At risk), sql-report $400 (Within budget).
- Budgets at risk: 3. Actions armed: 2.

## The Overview cards

Cost to date $1,524 (month to date). Projected cost at period end $5,080 against the $5,000 budget. Realized savings $1,006. Potential savings $77.40 (the captured Savings overview shows the same $1,006 and $77.40). All four use the same precision (whole dollars for the first three, cents for Potential), and the status bar and the "Needs attention" list agree.

## The what-if (Savings, "Cost if served on another model")

The current period priced on frontier-mini: $340.00 to $390.00 against $1,185.23, a decrease of $795.23 to $845.23, 67% to 71%. By model, the rows add up to those totals.

## The price list preview (Prices)

Cost at the prices in force $1,185.23. Cost if priced at the proposed list $1,152.10. Increase/(decrease) $(33.13), 2.8%, all on frontier-large. Nothing is published.

## Not costed (Prices)

Version 3 in force from October 26. Not costed: 1 model, "gpt-oss-20b has no price", with "Add a price". The footnote on Costs reads "Usage not costed" with its request count.

## The in-flight strip (3.1, Act 3 agent)

Drawn over the staged capture (`change-staged.png`) as the console's in-flight details, from the console's own change fixture for ticket-triage on frontier-mini: the trial done on 550 requests; the shadow at 10% on day 1 of 2; canary 10% and fleet to come; the stop rule Holding, with no six-hour window yet holding enough judged answers to be evaluated; the stop rule's text as the capture shows it. Continue and Keep carry the console's dialog sentences and reason labels. The one recorded decision is simulated (chip "Applied by the demo"): Keep on password-reset on support-slm-v1 by M. Ortiz on November 9, 2026, whose reason restates the console's computed driver for that row, 2.9 exchanges per conversation against 2.1 before the change. Nothing else is written to a change.

## Wording

Cost = money already spent. Potential savings. Projected cost at period end (budget forecast only). Realized savings. "Cost if served on ...". Avoidable cost. Comparison language: Current period, Prior period, increase/(decrease) in parentheses, % Change, n/m. No "waste", no "burn rate" as a label, no provider invoices. Describe people by what they are (the owner, the finance lead).

## Act 1 mocks (added by the Act 1 scenes, 1.1 to 1.3)

Cost by use case (1.2, the week, current period) and the comparison (1.3): the ten rows as captured in `usecases.png`, and one "No use case" row that merges the captured "No use case" line ($82.54 prior, $83.59 current) with the rest of the week ($105.45 prior, $148.37 current): prior $187.99, current $231.96, change $43.97, 23.4%. The eleven rows add to $1,080.53 and $1,185.23; change $104.70, 9.7%.

Requests in the current period, from each row's captured cost per request: contract-review 1,310; refund-request 9,828; chargeback-dispute 860; bi-copilot 3,049; sql-report 2,120; order-status 14,825; ticket-triage 5,218; the unlabelled use case (c2fa0b58) 639; shipping-delay 3,308; password-reset 8,250; No use case 33,137 at $0.0070. Total 82,544 requests, $0.0144 per request. Share of total is each row's cost over $1,185.23.

Usage not costed (the footnote on Costs): 2,184 requests on gpt-oss-20b, which has no price in catalog v3.

Cost by model and team (1.2, the matrix; the measure in the cells is Cost, so that the rows and columns add to $1,185.23):

| Model | legal | data | engineering | support | Untagged | Total |
|---|---|---|---|---|---|---|
| frontier-large | $337.46 | $119.54 | $96.20 | $186.83 | $72.37 | $812.40 |
| reasoner-pro | — | $154.97 | $21.40 | $30.12 | $8.37 | $214.86 |
| frontier-mini | — | — | $4.30 | $99.86 | $14.36 | $118.52 |
| support-slm-v1 | — | — | — | $36.21 | $3.24 | $39.45 |
| Total | $337.46 | $274.51 | $121.90 | $353.02 | $98.34 | $1,185.23 |

gpt-oss-20b is the "Usage not costed" line under the total, with its 2,184 requests and no cost.

Needs attention on the Overview (1.1), from the budgets above: Support team Projected over ($2,950 against $2,600; cost to date $840, plan to date $780, $60 over; runs out about November 26; since Nov 8); ticket-triage Projected over (against $1,100; served by frontier-large more often since Nov 5); contract-analyst At risk (against $900; since Nov 7). Three rows: 2 Projected over, 1 At risk.

## Added by the Act 4 agent (scenes 4.1 and 4.2)

Figures the mocks of Budgets, the Support team budget page and Prices needed beyond the canon above. Each follows from the canon by the arithmetic shown.

- Budgets at risk card: **4**, "Of 5 budgets: 3 projected over, 1 at risk". The canon's five budgets give All traffic ($5,080 against $5,000), Support team ($2,950 against $2,600) and ticket-triage as Projected over, contract-analyst as At risk and sql-report as Within budget; the console's card counts projected over and at risk together, so it reads 4, not the 3 written above. Actions armed 2, "On 1 budget" (the Support team's reroute and block; notify is parked).
- Plan to date is the budget's share of the month elapsed, day 9 of 30: All traffic $1,500, Support team $780, ticket-triage $330, contract-analyst $270, sql-report $120. Variance to plan reads "x% ahead of plan" when cost to date is above plan: All traffic 1.6% ($1,524 against $1,500), Support team 7.7% ($60 over $780), ticket-triage 21.8% ($402 against $330), contract-analyst 5.9% ($286 against $270), sql-report 10.0% behind plan ($108 against $120).
- Smaller budgets, cost to date and projection: ticket-triage $402 of $1,100 (36.5%), projected $1,290 ($1,210 to $1,380); contract-analyst $286 of $900 (31.8%), projected $880 ($830 to $940, the high end over the budget, so At risk); sql-report $108 of $400 (27.0%), projected $360 ($340 to $385). Owners: D. Okafor (All traffic), M. Ortiz (Support team), A. Lindqvist (ticket-triage), R. Chen (contract-analyst), S. Patel (sql-report).
- Support team page: current rate $101 a day ((2,950 − 840) / 21 remaining days = $100.48); daily allowance $84 ((2,600 − 840) / 21 = $83.81); the projection crosses $2,600 after 17.5 more days, on November 26, and its 80% range crosses between November 25 (high end, $110.48 a day) and November 28 (low end, $91.90 a day). Cost by day, November 1 to 9: $60, $95, $101, $108, $99, $92, $55, $88, $142, adding to $840.
- Thresholds: 80% · $2,080 "Notify the owner" (Parked; the attention row on Now and Cost is the notice), 100% · $2,600 "Reroute to the smaller model" (Armed), 110% · $2,860 "Block new requests" (Armed). Possible overrun after the crossing: about $100, one day at the current rate.
- Prices in force (version 3, effective and published October 26, 2026), per million tokens: frontier-large $2.50 input, $0.25 cache read, $3.13 cache write, $15.00 output; frontier-mini $0.40, $0.04, $0.50, $1.60; reasoner-pro $15.00, $1.50, $18.75, $75.00 (frontier-large's rates are the ones the BAE film's catalogue uses; cache read is a tenth of input, cache write 1.25x input).
- Not costed, the seven days ended November 9: gpt-oss-20b, 12,400 exchanges, 612M tokens, "No entry in the catalog" (the console's wording for the cause), with the command "Add a price". 612M a week is in line with the captured Hosting figure of 2.6B tokens a month.

## Added by the Act 2 scenes (2.2 and 2.3)

The what-if by model (2.2), priced on frontier-mini, on the costs by model of scene 1.2 (frontier-large $812.40, reasoner-pro $214.86, frontier-mini $118.52, support-slm-v1 $39.45). The rows add to the totals above: cost $1,185.23 over 82,544 priced exchanges, on frontier-mini $340.00 to $390.00, a decrease of $795.23 to $845.23, 67% to 71%.

| Model | Exchanges | Cost | Cost if served on frontier-mini | Increase/(decrease) |
|---|---|---|---|---|
| frontier-large | 31,500 | $812.40 | $148.00 to $168.00 | $(664.40) to $(644.40) |
| reasoner-pro | 2,100 | $214.86 | $33.00 to $46.00 | $(181.86) to $(168.86) |
| frontier-mini | 38,400 | $118.52 | $118.52 | $0.00 |
| support-slm-v1 | 10,544 | $39.45 | $40.48 to $57.48 | $1.03 to $18.03 (an increase) |
| Total | 82,544 | $1,185.23 | $340.00 to $390.00 | $(845.23) to $(795.23) |

The 2,184 gpt-oss-20b requests are the "Usage not costed" line and sit under the table as a footnote, as the console shows them. Check: 148.00 + 33.00 + 118.52 + 40.48 = 340.00; 168.00 + 46.00 + 118.52 + 57.48 = 390.00; 795.23 / 1,185.23 = 67.1%, 845.23 / 1,185.23 = 71.3%.

The price list preview (2.2) uses the same exchanges and costs; only frontier-large changes, $812.40 to $779.27, so the total is $1,152.10 and the change $(33.13), 2.8%.

The candidates grid (2.3) uses the captured costs per 1,000 requests and pass rates. Its decisions and paired intervals, against frontier-large on the same 550 requests: gpt-oss-20b (1.9) pts, interval (4.6) to 0.8, Not enough evidence; frontier-mini (1.4) pts, interval (2.8) to 0.0, Meets the bar, Recommended; frontier-large Current; reasoner-pro 3.5 pts, interval 2.1 to 4.9, Meets the bar. The proposed change is the capture's finding: "Serve sql-report on frontier-mini", from frontier-large, $31.24 to $32.82 per day, Meets the bar.
