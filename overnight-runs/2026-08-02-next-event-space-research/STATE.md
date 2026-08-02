# Event-space Research State

## Status

- Status: ACTIVE
- Last updated: 2026-08-02 13:42 JST
- Current wave: 1 — complete; CAND-035 official source collection and structured comparison

## Baseline

- Branch: `agent/add-competition-and-small-theater-coverage`
- HEAD: `7a18b65582adf640f5c0e05e32fdabb898a57fd7`
- Canonical data SHA-256 at start:
  - `data/candidate-venues.csv`: `f70cfe2b683045e40d30518e92e6066d6e318ccaa20928bb44d961e23ea7dfcc`
  - `data/venue-details.csv`: `6e632ad0c25a260df2d79bce3806757323df0a47399ae67d1815d6801d44b66c`
  - `data/price-observations.csv`: `5bd0875ef2d7847ba48fd52ee9f85d8b352de365a15a18ca9c81d00b28eb622d`
  - `data/venue-operations.csv`: `dd7031005f32764fc60dc59c1749aa262fa79ecdf8db377a9dab7298ab6dd340`
- Pre-existing untracked run ledgers preserved: `overnight-runs/2026-07-31-lasens-small-theater-census/`, `overnight-runs/2026-08-01-lasens-small-theater-continuation/`, and `overnight-runs/2026-08-02-lasens-small-theater-daytime-continuation/`.

## Completed Waves

- Wave 1 — CAND-035: recorded three official facility rows (長良川国際会議場メインホール、で愛ドーム、ふれ愛ドーム), six current fee observations, and two operation observations. Sources are the conference centre/operator pages, 岐阜市 page, 岐阜メモリアルセンター operator pages, and the 2026-04-01 fee PDF. No facts were copied from secondary indexes.
- Publicly documented but not treated as confirmed: the two facilities use different designated managers and reservation systems; simultaneous securing, vehicle/loading route, floor protection, throwing use, and event-specific network terms remain unconfirmed.
- Verification: `npm run audit` errors=0 (one pre-existing historical warning), `npm run rebuild-db` succeeded, `npm run validate` passed lint/build/two rendered HTML tests, and `git diff --check` passed.

## Current Wave

- Completed; publication packaging and source-controlled commit are the next bounded action.

## Next Action

- Commit the named CAND-035 data, generated data, test expectation, and this ledger; then publish the validated static site under the user's existing deployment approval. After publication, proceed to CAND-037 (津市産業・スポーツセンター) in a new wave.

## Blockers

- None.
