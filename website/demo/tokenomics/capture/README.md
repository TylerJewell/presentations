# Cost screen captures for "Tokenomics in Akka"

`capture.mjs` opens each state of the Cost screens in the console in demo mode (headless Chromium, viewport 1600x900
at device scale 1.2, dark scheme), waits until it is loaded, and saves `../captures/<id>.png` at 1920x1080. It also
writes `../captures/figures.json`, the figures on screen as `{ "<scene id>": { "<label>": "<text shown>" } }`, which
`../render/figures-check.mjs` checks the narration against. `figures.mjs` holds the per-state readers.

A state is loaded when its ready text is on the page, no skeleton, spinner or "Loading" remains in the main area,
and the page text has held still for 0.7 s.

## Prerequisites

- The optimize-local stack is up and the console and companion answer on 9889 in demo mode. With the main akka-optimize
  checkout not compiling, start the stack from the trace-hooks checkout:

  ```
  OPTIMIZE_LOCAL_OPTIMIZE=C:/Users/tyler/nexus-trace-hooks-0.9.0 py -3 optimize-local/stack.py up
  py -3 optimize-local/stack.py status
  ```
- The Cost entities are seeded (`py -3 optimize-local/seed.py tokenomics`, idempotent) and portfolio holds usage
  for the 35 days before today. The shipped `seed.py history` imports up to four days ago, because the usage stream
  is expected to deliver the last four days. With no live traffic running, the last four days stay empty and the
  seven days ending yesterday read as "Not yet reported". Import through today with the history draw shifted four
  days forward (the exchange ids are fixed per hour, so importing again changes nothing):

  ```
  PYTHONIOENCODING=utf-8 py -3 - <<'EOF'
  import sys; sys.path.insert(0, "optimize-local"); import seed
  from datetime import datetime, timedelta, timezone
  now = datetime.now(timezone.utc) + timedelta(days=4)
  recs = seed.history_usage(now)
  for i in range(0, len(recs), 5000): seed.portfolio_import(records=recs[i:i+5000])
  wins = [f"{s:02d}/{h:%Y%m%d}/{h:%H}" for h in seed.history_hours(now) for s in range(seed.HISTORY_SHARDS)]
  for i in range(0, len(wins), 5000): seed.portfolio_import(windows=wins[i:i+5000])
  EOF
  ```
- Playwright is resolved through `kalix-console/apps/stories/package.json`; Chromium is installed there.
- No model service is called. The screens read the stub-model stack only.

## Run

```
node website/demo/tokenomics/capture/capture.mjs                      # every state
node website/demo/tokenomics/capture/capture.mjs --only=overview,hosting
node website/demo/tokenomics/render/figures-check.mjs                 # narration against figures.json
```

Environment variables:

| Variable | Default | Meaning |
|---|---|---|
| `BASE` | `http://127.0.0.1:9889` | The console. |
| `PERIOD` | seven days before today | First day (YYYY-MM-DD, local midnight) of the seven-day period. Every address carries `from` and `to` for it. |
| `LIMIT` | `45000` | Milliseconds a state may take to load before it fails. A failed state saves `<id>.FAILED.png`. |
| `USE_CASE`, `CHANGE`, `BUDGET`, `HOSTED` | `sql-report`, `2026-10-09-sql-report`, `team-support`, `support-slm-v1` | The use case, change, budget and self-hosted model the film follows. |

A full run takes about five minutes; the first read of Budgets and of a model's Hosting section is slow.
`--only` writes `figures.partial.json` so a partial run never replaces `figures.json`.

## Notes on the data

- Use-case, change and model pages ignore `from` and `to` and show the seven days ending now ("ended November 9"),
  while the other pages show the period in the address ("ended November 8").
- Budgets assess the current calendar month to date, whatever the period in the address.
- The Overview "Projected cost at period end" is the month's projection and moves with the clock.

## Two capture sets

| Set | Command | Output | Data |
|---|---|---|---|
| Fixture-served (the film uses this) | `node website/demo/tokenomics/capture/capture.mjs` | `captures/<id>.png`, `captures/figures.json` | The console's own fixtures, answered by browser-side interception |
| Live | `node website/demo/tokenomics/capture/capture.mjs --live` | `captures/live/<id>.png`, `captures/live/figures.json` | The seeded optimize-local stack |

`fixtures.mjs` intercepts the console's calls to the companion (`/api/companion/optimize/...`) with Playwright
`context.route` and answers them from
`kalix-console/apps/local-console/src/modules/optimize/optimize/**/fixtures/*.json`: budgets (assess and one
budget), changes (list, one change, preview), efficiency and dismissals, frontier (read, bar, savings), hosting
(pools, read, worksheet), prices basis, use cases (assess, detail, spend bridge). Every date in a served file moves
forward by whole days so the fixtures' week ends on the period's last day (dates written out in sentences move too);
budgets are set to November 2026, day 9 of 30. No amount, percentage or count is changed, and nothing is written to
any service. A use case's detail is the fixture's chargeback-dispute detail with its own row from the assess
fixture.

Reads that go through the CLI (`/query`: spend get and compare, the price catalog, models, serving policies) and
the what-if and price-preview routes have no fixture at the fixtures' scale, so they answer live. The states that
depend on them are not captured in the fixture-served set (the run prints "mock needed"): overview, spend-default,
spend-matrix, spend-compare, spend-compare-row, savings-whatif, savings-whatif-menu, prices-preview,
prices-notcosted. Their live captures are in `captures/live/`.

`spend-bridge` shows the fixture bridge ($1,080.53 to $1,185.23) under the live Costs statement, so the film uses
`spend-bridge-crop.png`, which is the "Change in cost" section alone.
