# AI Governance Demo

## Deck

Ten AI governance principles bracketed by a title and close slide — a standalone
deck scaffold, kept simple enough for a Sonnet subagent to build out slide by slide.

## Build

```
cd _wip/governance && python3 builder/build.py
```

Output lands at `generated/overview/index.html`. Pass `--mode`, `--presenter`, or
`--out` as documented in `builder/build.py`.

## Status

Twelve slide folders (title + 10 principle slides + close) with content authored.
This is the generic version of the deck — customer-specific working copies live
outside this repo, under `~/akka/customers/<name>/deck/`.
