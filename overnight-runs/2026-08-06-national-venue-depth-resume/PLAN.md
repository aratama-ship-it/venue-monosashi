# Unattended National Venue-Depth Resume

## Objective

Continue the national venue database toward the established reference depth: every prefecture reaches at least 25 candidate facilities, 15 municipalities, and 51 independently searchable spaces, using only official operator, municipality, prefecture, or government sources.

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Writable paths: `data/candidate-venues.csv`, `data/venue-details.csv`, `data/prefecture-expansion-status.csv`, `web/app/generated-data.ts`, `scripts/report-prefecture-depth.mjs` only if its reporting logic needs a source-safe repair, and this run directory.
- Baseline: branch `agent/add-competition-and-small-theater-coverage`, commit `5c0946bc6e73c553c168f3f8b13468e64790da72`; 476 candidates and 1,483 spaces before this resumed run.

## Definition of Done

- Every prefecture has at least 25 candidates, 15 municipalities, and 51 searchable spaces in `data/prefecture-expansion-status.csv`.
- Every addition has an official source URL and passes `npm run audit`.
- `npm run validate`, `npm run depth-report:write`, `git diff --check`, and final run-ledger validation pass.
- The public site is deployed and checked after each completed source-data wave, as requested by the user.

## Allowed Actions

- Read project files, Git state, and official public web sources.
- Add source-backed candidates and spaces in bounded lowest-depth prefectural waves.
- Regenerate app data, run audits/tests, commit named source files, and deploy the validated public site after each wave.
- Record progress, sources, counts, changed files, and the next wave in this run ledger.

## Prohibited Actions

- Do not delete user data, overwrite pre-existing user work, send external messages, purchase, change secrets, DNS, or account settings.
- Do not add facilities or factual attributes from aggregators, social media, search snippets, or unsourced memory.
- Do not fabricate capacity, area, ceiling, price, availability, or access facts; retain unknown values as `要確認`.
- Do not use stage opening height, proscenium height, or a building height as a searchable ceiling value.

## Stop Conditions

- Finish only when the Definition of Done is met.
- Stop if an unexpected overlapping user change makes the canonical data unsafe to edit; record the evidence in `STATE.md`.
- Treat inaccessible/ambiguous official material as a source gap, record it, and continue another independent wave.
- Pause only on a direct user instruction.

## Team

- Coordinator, explorer, writer, and verifier: one agent, serialized roles.
- The writer is the only role that edits canonical CSV and generated data.

## Verification

- Every wave: `npm run audit`, `npm run depth-report:write`, `git diff --check`, source-data generation, and a public deployment check.
- Completion: `npm run validate`, restore non-source build output if changed, `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py <run-dir> --final`.
