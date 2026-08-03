# Arena 100 Primary-source Research State

## Status

- Status: ACTIVE
- Last updated: 2026-08-03 20:03 JST
- Current wave: 5 — CAND-077 added and CAND-024 (existing 山形ビッグウイング) enriched after coordinator-side primary-source checks

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
- Wave 2 — added CAND-075, 北海道立総合体育センター 北海きたえーる, as the first new large-arena candidate. Official facility pages confirm the 3,886㎡ / highest 26m / maximum 10,000 main arena and the 1,647㎡ / highest 22m sub arena. The currently published official fee PDF, marked effective 2026-04-01, was rendered and visually inspected before recording four full-day amateur-sports observations. Access, parking restriction, booking priority, setup/teardown, ticketing, food, and merchandise conditions are captured only where the official guidance states them.
- Wave 3 — added CAND-076, YSアリーナ八戸（八戸市長根屋内スケート場）, from Hachinohe City official pages. The main arena is recorded as approximately 14,000㎡ / approximately 15m / maximum 9,000 / fixed 3,045 seats, with its seasonal restriction stated explicitly: full-arena use is only from mid-March through mid-June; during the rink period only the approximately 5,600㎡ inner field and spectator seating are usable. The official fee PDF is retained as a source URL but no fee values were transcribed because its tables were not visually inspected in this wave.
- Wave 3 verification — `npm run audit` errors=0 (one existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation all passed.
- Wave 4 — added CAND-077, 盛岡タカヤアリーナ（盛岡市総合アリーナ）, from a Morioka City facility page, designated-manager facility page, and official use regulations. The city total of 5,058 seats and the manager's arena viewing-seat count of 3,098 are kept as separate facts; the fixed-seat field is not populated because the city total includes movable seats and standing room. No fee-table value was transcribed without visual inspection.
- Wave 5 — enriched existing CAND-024, 山形国際交流プラザ 山形ビッグウイング, from the official operator pages. The four exhibition rooms are entered individually at their official 935.28㎡ or 980.39㎡ areas, and the official HTML rate for the entire exhibition hall, 09:00–17:00, is recorded. The total 3,500 chair capacity is marked as an official comfort-layout value, not a guaranteed real-event capacity. An attempted duplicate CAND-078 was detected by canonical-name matching before publication and removed; this is not counted as a new candidate.
- Wave 5 verification — `npm run audit` errors=0 (one existing historical warning), `npm run rebuild-db`, `npm run validate` (lint, production build, two rendered HTML tests), `git diff --check`, and active-ledger validation all passed.

## Current Wave

- CAND-075 is validated and publicly deployed as site version 9. CAND-076 and CAND-077 plus the CAND-024 enrichment are validated locally and committed in the current checkout but are not yet in the public site, so the public site remains at 75 candidates while the local catalogue has 77 candidates, 131 space details, 326 price observations, and 63 operation observations. Three new candidates toward the +100 target are complete locally. Public URL: https://venue-monosashi.juggler-arata.chatgpt.site

## Next Action

- Select CAND-078 from an underrepresented prefecture, verify it independently against official sources, and add it only after a canonical name/address/official-URL deduplication check. CAND-075 through CAND-079 will form the first meaningful five-candidate deployment batch if all validate.

## Blockers

- No data blocker. Operational issue recorded: recurring instructions that reference the former `app-dev` path will fail after the workspace reorganization unless updated to this project path.
- A runtime attempt to register or update the continuation automation returned `No handler registered for tool: codex_app.automation_update`; therefore no independently scheduled background worker is confirmed active from this session. Continue only through explicit turns or a repaired scheduler, and do not claim that research is running while idle.
