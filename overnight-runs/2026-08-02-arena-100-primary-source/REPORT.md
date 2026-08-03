# Arena 100 Primary-source Research Report

## Outcome

- Active run established to add 100 additional, official-source-backed large-arena or arena-compatible venue candidates nationwide. The first new candidate is CAND-075, 北海道立総合体育センター 北海きたえーる; the catalogue has progressed from 74 to 75 candidates.

## Changes

- Created a dedicated run ledger separate from the prior small-theater census and the completed CAND-035 event-space wave.
- Updated CAND-037 with current official naming-rights context and exact arena/exhibition public facts.
- Added three space-detail rows, four direct fee observations, and one access/booking/operation row for CAND-037.
- Added CAND-075 with two arena space-detail rows, four current full-day amateur-sports fee observations, and one access/booking/operation row. Official facts include main arena 3,886㎡ / highest 26m / maximum 10,000 and sub arena 1,647㎡ / highest 22m.
- Updated the public observation date to 2026.08.03 and the rendered count checks to 75 candidates and 325 price observations.

## Verification

- Initial Git branch, HEAD, data hashes, inventory counts, and pre-existing untracked ledgers were recorded before canonical writes.
- The CAND-037 fee table was visually inspected from the official PDF before values were transcribed.
- The first test run exposed a stale 317-price HTML assertion after the dataset reached 321; the assertion was corrected and must pass on rerun.
- Rerun passed: `npm run audit` errors=0 (one existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation.
- Published version 8 successfully at https://venue-monosashi.juggler-arata.chatgpt.site.
- CAND-075's current official fee PDF (effective 2026-04-01) was rendered and visually reviewed before transcription. The 2026-08-03 validation passed: `npm run audit` errors=0 (the same pre-existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), and `git diff --check`.

## Pre-existing State Preserved

- The three earlier untracked LaSens run ledgers remain untouched.

## Unverified States

- No new candidate is added merely because it is on a future research list. Each row requires a direct primary source before it enters the public catalogue.
- CAND-037 has no official public confirmation for simultaneous booking among all three buildings, throwing clearance, floor protection, loading dimensions, merchandise terms, or event-network specifications.
- CAND-075 has no official public confirmation for throwing clearance, floor protection, loading dimensions, event-network specifications, or simultaneous use of the arena and meeting spaces. Its parking total is recorded with the official spectator/visitor restriction rather than treated as general event parking.

## Blockers

- Previous run documents retain a former project location. The repository itself was found and is healthy at `web-projects/monosashi/venue-monosashi`; future scheduled prompts must use that path.

## Morning Decisions

- No user decision is required to begin source collection. Facility-specific operational constraints remain deliberately unconfirmed until an official page or PDF supports them.
