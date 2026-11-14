# Akka's regulation corpus: figures for the talk

Counted on 2026-10-27 from the pinned monthly snapshots in
`samples/loan-origination/governance/corpus/<month>/` (manifest.yaml, regulations/*/*.yaml,
registries/frameworks.yaml). Re-count before the talk if a newer snapshot lands.

## Size and growth (manifest counts)

| Snapshot | Frameworks indexed | Controls |
|---|---|---|
| 2026-06 | 189 | 962 |
| 2026-07 | 198 | 1,043 |
| 2026-08 | 215 | 1,211 |
| 2026-09 | 226 | 1,369 |
| 2026-10 | 241 | 1,718 |

- Controls grew 79% in four months (962 → 1,718), frameworks by 52 (189 → 241).
- This growth is the corpus's coverage *and* new law together. Say "our corpus grew", not "regulation
  grew 79%".
- 1,639 of 1,718 controls carry the regulation's verbatim text.

## Reach

- 241 frameworks: 158 binding regulations or regulator guidance, plus standards (14 NIST, 13 ISO, 10 OWASP,
  7 international sector standards, 3 SOC), plus 18 principles and vendor policies.
- 38 jurisdictions: the EU, the US federal government, 16 US states, and 20 other countries (UK, Canada,
  China, Hong Kong, Singapore, Australia, Japan, India, Korea, Brazil, Chile, Peru, Colombia, Mexico, Italy,
  Saudi Arabia, South Africa, Taiwan, Turkey, Vietnam). 82 frameworks are not bound to a jurisdiction.
- Most frameworks by jurisdiction: US federal 36, EU 20, California 11, UK 10, Canada 9, Hong Kong 9.
- Do not claim "every regulation on the planet". Claim "AI regulation worldwide: 241 frameworks across
  38 jurisdictions, indexed to the paragraph, with the law's own words".

## This year

- Controls by effective year: 2023: 81, 2024: 213, 2025: 192, **2026: 406**, 2027: 108, 2028: 6
  (348 have no single effective date).
- 406 obligations in the corpus take effect in 2026, more than any earlier year and about double 2024.

## What the regulations require: the five control types

A control can need more than one mechanism. Controls carrying each:

| Mechanism | Controls | Flavours (controls) |
|---|---|---|
| Gate | 1,399 | documentation 1,115; attestation 207; test 41; configuration 36 |
| Sanitizer | 123 | PII 71; special category 20; sector 17; secret 15 |
| Evaluation | 86 | incident reporter 34; performance monitor 32; drift and fairness 17; decision eval 3 |
| Guardrail | 72 | LLM content evaluation 37; tool permission 35 |
| Human | 38 | domain decision 19; halt 10; monitoring 5; system authorization 2; feedback 2 |

- 19 distinct flavours across the five types.
- Obligation types: produce 621, operate 488, restrict 239, inform 200, gate 170.
- Who can enforce it: 239 controls fully by the Akka runtime, 941 partly, 538 only by people.
- The story: most of what the law asks for is evidence (documentation and attestation gates), and the
  runtime controls (sanitizers, evaluations, guardrails, human authority) are where an agent's behaviour is
  governed while it runs.
