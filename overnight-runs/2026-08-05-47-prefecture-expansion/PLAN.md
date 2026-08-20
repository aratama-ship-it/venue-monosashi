# Overnight Run Plan

## Objective

Expand the venue database for all 47 prefectures toward the Mie benchmark: at least 25 candidate facilities, 15 municipalities, and 51 independently searchable spaces per prefecture. Add only facilities and attributes supported by official operator, municipality, prefecture, or government sources.

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Writable paths: `data/candidate-venues.csv`, `data/venue-details.csv`, `data/prefecture-expansion-status.csv`, `scripts/report-prefecture-depth.mjs`, `web/app/generated-data.ts`, and this run directory
- Baseline: branch `agent/add-competition-and-small-theater-coverage`; 272 candidates, 566 spaces, 47 prefectures; current data hashes and pre-existing dirty files are recorded in `STATE.md`

## Definition of Done

- Every prefecture has at least 25 candidates, 15 municipalities, and 51 searchable spaces in `data/prefecture-expansion-status.csv`.
- Every added row passes `npm run audit`; generated application data matches the CSV source.
- The final full check `npm run validate`, `npm run depth-report:write`, and `git diff --check` pass.
- No claim treats a stage/proscenium opening height as a ceiling height or turns an unknown value into zero.

## Allowed Actions

- Read project files, current Git state, and official public web sources.
- Add source-backed candidates and spaces to the canonical CSV data in bounded regional waves.
- Regenerate `web/app/generated-data.ts`, run local audits, lint, build, and rendered HTML tests.
- Update this ledger after each completed wave.

## Prohibited Actions

- Do not push, deploy, publish, send external messages, purchase, change secrets, change DNS, or alter account settings.
- Do not delete user data or overwrite pre-existing user changes.
- Do not add a facility based only on aggregators, social media, or unsourced memory.
- Do not fabricate capacity, area, ceiling, fee, availability, or access facts.

## Stop Conditions

- Complete when the Definition of Done is met.
- Stop and report `BLOCKED` if an unexpected baseline change overlaps canonical data and cannot be safely preserved.
- Record source gaps or ambiguous facility status as `needs_check`, then continue with independent prefectures.
- Do not make product-direction decisions or public-release decisions while the user is away.

## Team

- Coordinator: selects the next deficit-driven wave, integrates data, and maintains this report.
- Explorer: sequential official-source research for one bounded prefectural wave.
- Writer: the sole editor of canonical CSV and generated data.
- Verifier: runs independent audit, generation, lint, build, rendered HTML checks, and diff checks after each wave.

## Verification

- Per wave: `npm run audit`, `npm run depth-report:write`, and `git diff --check`.
- Before a completed outcome: `npm run validate`, then restore generated build artifacts outside the approved source files if the build modifies them.
- Record source URLs, data counts, changed paths, and unresolved items in `STATE.md` and `REPORT.md`.
