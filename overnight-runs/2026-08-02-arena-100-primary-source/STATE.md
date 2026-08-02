# Arena 100 Primary-source Research State

## Status

- Status: ACTIVE
- Last updated: 2026-08-02 14:26 JST
- Current wave: 1 — CAND-037 official source collection and structured comparison

## Baseline

- Branch: `agent/add-competition-and-small-theater-coverage`
- HEAD: `f55f0940e78ca0c6cb9abd0bfd4ca6c543a4cb26`
- Canonical data SHA-256 at start:
  - `data/candidate-venues.csv`: `f9846adf7ab962a7254ca74c223ee09a88f4d0f2f03bda5dbeaa8b956427dece`
  - `data/venue-details.csv`: `5e6c923cfb8b9d99630563d33ca80a474614a2995cc9f09c06fcc9d270448da2`
  - `data/price-observations.csv`: `e0c3092e94cdf94124bf973d93e0f774ad438fec76d21882f33d88a12a2f3913`
  - `data/venue-operations.csv`: `0ad64df4ee6719eb9a873e2b592e68769168ff305d1939d9bd0310aaf090eaf1`
- Baseline inventory: 74 candidates, 119 details, 317 prices, 58 operations.
- Pre-existing untracked run ledgers preserved: `overnight-runs/2026-07-31-lasens-small-theater-census/`, `overnight-runs/2026-08-01-lasens-small-theater-continuation/`, and `overnight-runs/2026-08-02-lasens-small-theater-daytime-continuation/`.
- The project now resides under `web-projects/monosashi/venue-monosashi`; older run ledgers still refer to the former `app-dev/venue-monosashi` path and must not be used as executable instructions without updating the path.

## Completed Waves

- Wave 0 — recorded the 100-candidate primary-source scope and baseline. CAND-037 is selected for the first enrichment wave because it is already an arena/exhibition complex in the catalogue and has an official municipality source.
- Wave 1 — confirmed the current naming-rights names and three spaces via the municipal and designated-manager pages. Recorded three details, four directly observed full-day sports-use price observations, and one operation row. The fee PDF table was visually inspected; its 2020-04 revision marker and absent tax statement are retained rather than assumed.
- Verification finding: the rendered HTML test held the prior 317-price count and failed after the validated data reached 321. This is a stale assertion, not an audit error; it is updated to the generated count before rerunning validation.

## Current Wave

- CAND-037 data is validated and the public generated data is rebuilt. The next wave should add the first new candidate ID for the +100 roster.

## Next Action

- Add the first new official-source candidate(s), beginning with large arenas in prefectures that currently have only one representative.

## Blockers

- No data blocker. Operational issue recorded: recurring instructions that reference the former `app-dev` path will fail after the workspace reorganization unless updated to this project path.
