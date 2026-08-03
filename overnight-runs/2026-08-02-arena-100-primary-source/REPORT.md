# Arena 100 Primary-source Research Report

## Outcome

- Active run established to add 100 additional, official-source-backed large-arena or arena-compatible venue candidates nationwide. CAND-075 through CAND-079 are publicly deployed, and CAND-024 is enriched. The public catalogue has progressed from 74 to 79 candidates.

## Changes

- Created a dedicated run ledger separate from the prior small-theater census and the completed CAND-035 event-space wave.
- Updated CAND-037 with current official naming-rights context and exact arena/exhibition public facts.
- Added three space-detail rows, four direct fee observations, and one access/booking/operation row for CAND-037.
- Added CAND-075 with two arena space-detail rows, four current full-day amateur-sports fee observations, and one access/booking/operation row. Official facts include main arena 3,886㎡ / highest 26m / maximum 10,000 and sub arena 1,647㎡ / highest 22m.
- Added CAND-076 with its main arena space-detail row and an operation row from Hachinohe City official pages. The 14,000㎡ arena, approximately 15m ceiling, maximum 9,000 capacity, fixed 3,045 seats, 608 accessible parking spaces, loading-door dimensions, booking windows, floor-protection requirement, and seasonal use restriction are recorded only where the city states them. Fee-table values were intentionally not transcribed without visual PDF inspection.
- Added CAND-077, 盛岡タカヤアリーナ（盛岡市総合アリーナ）, with a detail and operation row sourced from Morioka City, the designated manager, and the manager's official regulations. Its total 5,058-seat city figure is not misrepresented as fixed seating, because the same page says it includes fixed seats, a royal box, movable seats, and standing room.
- Enriched existing CAND-024, 山形国際交流プラザ 山形ビッグウイング, with five exhibition details, one official HTML fee observation, and one operation row. The four official room areas are preserved separately; all-hall seating is a stated comfort-layout capacity. Booking, deposit, cancellation, 24-hour use, and parking facts are taken from the operator's published guidance. A proposed CAND-078 row was removed before publication because it duplicated CAND-024 by official facility identity; it is not counted toward the target.
- Added CAND-078, セーレン・ドリームアリーナ（福井県営体育館）, with main and sub arena details and its current official booking, payment, and Wi-Fi conditions. The 17m building height is deliberately excluded from ceiling-height comparison because the official page does not identify it as the clear height.
- Added CAND-079, サンドーム福井, with its official 8,000㎡ / 55m / 9,000-seat event hall, access information, and four full-day conditions covering in-prefecture/out-of-prefecture and weekday/weekend no-admission rates. Those rates are explicitly tax-inclusive on the official HTML page.
- Added CAND-080, 三重県営サンアリーナ, with separate main and sub-arena details, four tax-included performance-rate observations, and an operation row. The main arena is recorded at 3,489㎡ / approximately 21m / 11,000 seats / 4,980 fixed seats / 5,000kg/㎡ floor load; the sub arena is 1,746㎡ / approximately 17m / 3,000 seats / 1,002 fixed seats / 3,000kg/㎡. Publicly stated booking, application, payment, preparation and food-service rules are recorded; loading, parking count, event network, and simultaneous use remain unknown.
- Updated the public observation date to 2026.08.03 and the rendered count checks to 79 candidates and 330 price observations.

## Verification

- Initial Git branch, HEAD, data hashes, inventory counts, and pre-existing untracked ledgers were recorded before canonical writes.
- The CAND-037 fee table was visually inspected from the official PDF before values were transcribed.
- The first test run exposed a stale 317-price HTML assertion after the dataset reached 321; the assertion was corrected and must pass on rerun.
- Rerun passed: `npm run audit` errors=0 (one existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation.
- Published version 8 successfully at https://venue-monosashi.juggler-arata.chatgpt.site.
- CAND-075's current official fee PDF (effective 2026-04-01) was rendered and visually reviewed before transcription. The 2026-08-03 validation passed: `npm run audit` errors=0 (the same pre-existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), and `git diff --check`.
- Published site version 9 successfully at https://venue-monosashi.juggler-arata.chatgpt.site after pushing the validated source commit and saving the matching build archive.
- CAND-076 passed 2026-08-03 validation: `npm run audit` errors=0 (the same pre-existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation. It is held for the next meaningful batch deployment; the public site still displays version 9 / 75 candidates.
- CAND-077 and the CAND-024 enrichment passed 2026-08-03 validation: `npm run audit` errors=0 (the same pre-existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation. CAND-076 and CAND-077 are held for the first five-candidate deployment batch; the public site remains version 9 / 75 candidates.
- CAND-078 and CAND-079 passed 2026-08-03 validation: `npm run audit` errors=0 (the same pre-existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation. The local catalogue now has 79 candidates, 134 details, 330 price observations, and 65 operation rows; it is ready for the next public batch.
- Published site version 15 successfully at https://venue-monosashi.juggler-arata.chatgpt.site. The public URL returned the updated 79-candidate and 330-price counts after deployment. The hosting build required a root workspace configuration and a packaged, locally validated web build because the provider's Linux dependency installation omitted optional native bindings; the deployed package contains the same build that passed the local rendered HTML tests.
- CAND-080 passed 2026-08-03 validation: `npm run audit` errors=0 (the same pre-existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation. The local catalogue now has 80 candidates, 136 details, 334 price observations, and 66 operation rows. It is staged for the next public batch rather than claiming that the current public site has it.

## Pre-existing State Preserved

- The three earlier untracked LaSens run ledgers remain untouched.

## Unverified States

- No new candidate is added merely because it is on a future research list. Each row requires a direct primary source before it enters the public catalogue.
- CAND-037 has no official public confirmation for simultaneous booking among all three buildings, throwing clearance, floor protection, loading dimensions, merchandise terms, or event-network specifications.
- CAND-075 has no official public confirmation for throwing clearance, floor protection, loading dimensions, event-network specifications, or simultaneous use of the arena and meeting spaces. Its parking total is recorded with the official spectator/visitor restriction rather than treated as general event parking.
- CAND-076 has no official public confirmation for throwing clearance, floor load, large-vehicle route/holding, event network, food, merchandise, or simultaneous use. Its approximately 14,000㎡ full-arena configuration is seasonal, not treated as year-round availability.
- CAND-077 has no official public confirmation for height, floor load, loading dimensions, throwing clearance, food, merchandise, event network, or simultaneous use of meeting spaces.
- CAND-024 has no official public confirmation for height, floor load, loading dimensions, throwing clearance, food, merchandise, event network, or simultaneous use of every exhibition and meeting space. Its pricing tax treatment is not stated on the current official HTML fee page.
- CAND-078 has no official public confirmation for clear arena height, floor load, loading dimensions, throwing clearance, food, merchandise, event-network capacity, or simultaneous use.
- CAND-079 has no official public confirmation for fixed-seat count, floor load, loading dimensions, throwing clearance, food, merchandise, event-network capacity, parking capacity, or simultaneous use. Its rate depends on user location, intended use, and admission conditions.

## Blockers

- Previous run documents retain a former project location. The repository itself was found and is healthy at `web-projects/monosashi/venue-monosashi`; future scheduled prompts must use that path.
- The runtime returned `No handler registered for tool: codex_app.automation_update` when attempting to create or update the continuation automation. No independent background execution is confirmed from this session; work must resume through an explicit turn or a repaired scheduler.

## Morning Decisions

- No user decision is required to begin source collection. Facility-specific operational constraints remain deliberately unconfirmed until an official page or PDF supports them.
