# Metro to 100

## Objective

Reach exactly 100 physical facility candidates in each of Tokyo, Osaka, Aichi, and Fukuoka through current official-source evidence.

## Scope

Add 17 new candidates and at least one exact official-source-backed detail in each target prefecture. Direct price rows are optional and must remain in their published unit and time band.

## Definition of Done

Each target prefecture has exactly 100 candidates, every new candidate is non-duplicate and source-backed, the data audit has zero errors, and local derived data plus SQLite are refreshed.

## Allowed Actions

- Read and research official government, operating-organization, or facility sources.
- Append canonical CSV rows and regenerate the local derived outputs.
- Run data and ledger validation.

## Prohibited Actions

- No `.gitignore` or `web/dist` edits.
- No commit, push, deployment, publication, external message, purchase, or service change.
- No inferred daily rates, closures, operations, or technical facts.

## Stop Conditions

Hold any candidate on identity collision, unavailable primary source, or current closure that invalidates representation.

## Team

Read-only research delegates cover target geographies. The primary agent is the only canonical-data writer.

## Verification

Recheck the baseline before each write batch. Finalize with audit, data generation, SQLite rebuild, lint, per-prefecture count, normalized-name checks, and final ledger validation.
