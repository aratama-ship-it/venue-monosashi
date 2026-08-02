# Event-space Research Report

## Outcome

- Completed CAND-035 as the first post-census event-space research wave. The public comparison data now distinguishes the conference hall from the two sports domes, with official dimensions, capacities, facilities, current fee observations, access, booking, and operation boundaries.

## Changes

- `data/candidate-venues.csv`: refined CAND-035 summary and explicit limits.
- `data/venue-details.csv`: added three facility rows.
- `data/price-observations.csv`: added six current fee observations.
- `data/venue-operations.csv`: added two operational observations.
- `web/app/generated-data.ts`: regenerated from the canonical CSVs.
- `web/tests/rendered-html.test.mjs`: updated the count assertion from 311 to 317.
- This run ledger records the source boundary and validation evidence.

## Verification

- Baseline branch, commit, data hashes, and pre-existing untracked ledgers were recorded.
- `npm run audit`: errors=0; one pre-existing historical warning remains.
- `npm run rebuild-db`: completed with 74 candidates, 119 details, 317 price observations, and 58 operation observations.
- `npm run validate`: audit, lint, production build, and two HTML tests passed.
- `git diff --check`: passed.

## Pre-existing State Preserved

- The three earlier LaSens research run ledgers remain unmodified.

## Unverified States

- CAND-035 simultaneous booking, event-specific throwing clearance, floor protection, vehicle/loading route, availability, and final event classification require explicit facility confirmation; they are not assumed.
- The public service has not yet been republished with this wave at the time of this report update.

## Blockers

- None. The official fee PDF was visually inspected because text extraction alone did not preserve table columns.

## Morning Decisions

- No user decision is required. The next queued target is CAND-037 (津市産業・スポーツセンター).
