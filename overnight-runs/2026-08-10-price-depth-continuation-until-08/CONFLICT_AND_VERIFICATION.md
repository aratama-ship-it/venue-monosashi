# Concurrent Writer Detection and Verifier Pivot

Detected before 2026-08-10 00:43 JST; recorded at 00:45 JST

## Unexpected Shared Change

After P1, the following pre-existing run file appeared outside this ledger:

- `overnight-runs/2026-08-09-price-depth-design/NIGHT_PLAN_2026-08-10.md`
- File timestamp: 2026-08-10 00:34:31 JST

Its contents direct a separate overnight writer to continue the same price database through commit and push. It cites a stronger user instruction to continue until database completion. That file was not present in this ledger's 00:32 baseline and was not created by this run.

## Decision

- Stop all canonical writes, staging, commits, push, and deployment from this ledger.
- Do not compete with or overwrite the other run.
- Preserve P1's shortlist as a read-only research handoff.
- Continue only as an independent verifier: observe HEAD/status, run non-mutating repository checks, recompute read-only coverage, and record evidence under this run directory.

## Verifier Boundaries

- Allowed writes: this run directory only.
- Allowed checks: read-only Git commands and hashes; `npm run audit`; `npm run web:lint`; direct `node --test web/tests/rendered-html.test.mjs` against the currently built artifact; read-only `npm run price-coverage`; targeted CSV/ID/arithmetic checks; `git diff --check`.
- Prohibited verifier commands include `npm run web:test`, `npm run validate`, `npm run build`, and data-generation commands because they regenerate tracked artifacts.
- Not allowed: data generation, canonical corrections, formatting, staging, commit, push, deploy, or edits to either the other run's ledger or the protected research memo.
- If checks fail while the other writer is mid-wave, record the timestamp and exact failure; do not repair. Recheck on the next scheduled verifier run.
