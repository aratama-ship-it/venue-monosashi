# Verifier Snapshot 00:43 JST

## Observed State

- HEAD: `22f5cdab6ea9d90a60c7bd329c1ad4832ebde6a8`
- Branch: `agent/add-competition-and-small-theater-coverage`
- Pre-existing untracked memo: unchanged; SHA-256 `b80f689bd2b1a5d268d385848fa2dcb8220e583189e2fa717f114bac39c74238`
- Separate writer plan: `overnight-runs/2026-08-09-price-depth-design/NIGHT_PLAN_2026-08-10.md`, mtime 00:34:31 JST
- Canonical data hashes: unchanged from `BASELINE.md`

## Safe Check Results

- `npm run audit`: PASS, errors=0, warnings=1 (pre-existing held/planned historical row without venue_names)
- Audit counts: candidate_rows=1178, venue_detail_rows=7729, price_observation_rows=2987, budget_scenario_rows=60
- `npm run web:lint`: PASS
- `node --test web/tests/rendered-html.test.mjs`: PASS, 3/3; checks the currently built artifact without rebuilding it
- `git diff --check`: PASS
- `npm run price-coverage`: stage_met=9/47, sports_met=5/47, both_met=4/47; stage_gap_total=120, sports_gap_total=132
- Akita remained stage 0/18 (gap 5), sports 1/6 (gap 4)

## Verifier Command Correction

The first attempted verifier sequence included `npm run web:test`. Repository inspection during execution showed that this script runs `data:generate` and a production build before its three tests. It rewrote three tracked build artifacts with a fresh prerender secret:

- `web/dist/server/index.js`
- `web/dist/server/ssr/vinext-server.json`
- `web/dist/server/vinext-server.json`

The canonical CSV hashes and `web/app/generated-data.ts` content remained unchanged. The three build-only diffs were created during that exact invocation, inspected, and restored individually to HEAD. Final `git status --short` after restoration contains only the protected memo and the two overnight ledger directories. Heartbeat ID 8 was updated to prohibit `web:test`, `validate`, build, and data generation; it now uses the direct Node test above.

## Classification

- Snapshot result: PASS after verifier-command correction
- Project changes made by verifier: none remaining outside this run directory
- Separate writer progress since baseline: no HEAD or canonical-hash movement observed at 00:43 JST

