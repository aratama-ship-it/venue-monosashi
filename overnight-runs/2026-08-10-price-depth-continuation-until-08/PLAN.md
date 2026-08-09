# 料金観測拡充・朝8時まで継続ラン

## Objective

進行中の都道府県別料金観測を、公式一次情報だけで安全に継続し、2026-08-10 08:00 JSTまでに、収録できた観測・見送った候補・検証結果・次の判断を朝レポートへ残す。

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Run directory: `overnight-runs/2026-08-10-price-depth-continuation-until-08/`
- Baseline: branch `agent/add-competition-and-small-theater-coverage`, commit `22f5cdab6ea9d90a60c7bd329c1ad4832ebde6a8`
- Pre-existing dirty state: untracked `docs/RESEARCH_UPDATE_2026-08-09.md` only; protected and not edited
- Canonical writes allowed: `data/price-observations.csv`, `data/budget-scenarios.csv`, `data/venue-details.csv` only when needed by a verified observation
- Deterministic generated writes allowed: `data/prefecture-price-coverage.csv`, `web/app/generated-data.ts`, build outputs produced by the repository's existing commands
- Ledger writes allowed: this run directory only

## Definition of Done

- At least one bounded prefecture wave is researched using current official facility, municipality, prefecture, ordinance, or official fee-table sources.
- Every accepted amount retains candidate/space/use/day/time/tax/unit/validity/source distinctions required by `docs/DATA_DICTIONARY.md`.
- Ambiguous, non-current, non-primary, or non-normalizable findings are not inserted and are recorded with reasons.
- Every data-changing wave passes `npm run audit`, `npm --prefix web run data:generate`, `npm run price-coverage:write`, and `npm run validate`.
- Final state is COMPLETE, PARTIAL, or BLOCKED; `REPORT.md` is complete; the overnight-run validator passes with `--final`.

## Allowed Actions

- Read project files, applicable instructions, local data, and current Git state.
- Browse current official primary sources and download official fee-table PDFs when necessary for inspection.
- Edit only the canonical and generated paths listed above plus this run directory.
- Make narrow local commits containing only named, verified wave files after all checks pass.
- Use temporary files under `/private/tmp` for PDF inspection.

## Prohibited Actions

- No push, deploy, publication, external message, purchase, DNS/access/account/secret change, or dependency installation in this run.
- No deletion, movement, renaming, merging, or deduplication of existing data or user files.
- Do not edit, stage, or commit `docs/RESEARCH_UPDATE_2026-08-09.md`.
- Do not infer fees, opening hours, tax, applicability, or current validity from search snippets, third-party listings, arithmetic patterns, or similarly named facilities.
- Do not change UI/product direction or resolve candidate duplicates.

## Stop Conditions

- If HEAD, pre-existing dirty state, or a target canonical file changes unexpectedly between waves, stop writes for that target and record the exact mismatch.
- If a source requires interpretation that changes the data model or acceptance rules, record it for morning review and skip the record.
- At or after 07:30 JST, do not begin a new primary or reserve wave; finalize only.
- At or after 08:00 JST, final verification and reporting only.

## Team

- Coordinator / Explorer / Writer / Verifier: this single main agent, sequentially
- Subagents: none; no pre-approval was given
- Model: current model; do not increase reasoning tier or add agents without approval

## Concurrent-writer Override

By 00:43 JST, `overnight-runs/2026-08-09-price-depth-design/NIGHT_PLAN_2026-08-10.md` had been detected as a separate writer plan for the same canonical data. Therefore canonical-write permissions in this plan are suspended for the remainder of this run. `CONFLICT_AND_VERIFICATION.md` is authoritative: this ledger is read-only except for writes inside its own run directory.

## Verification

- Before each wave, compare HEAD, `git status --short`, the protected pre-existing file hash, and all target-file hashes against the preceding recorded state.
- For every data-changing wave, run `npm run audit`, `npm --prefix web run data:generate`, `npm run price-coverage:write`, `npm run validate`, targeted row/arithmetic checks, and `git diff --check`.
- At finalization, repeat the full checks, compare final state with `BASELINE.md`, complete `STATE.md` and `REPORT.md`, then run the ledger validator with `--final`.

## Primary Wave Queue

- [x] P1: Baseline, coverage, and Akita candidate shortlist
  - Scope: confirm HEAD/status/hashes, run read-only coverage for Akita, identify up to five stage-type candidates and their official source routes
  - Writes allowed: run directory only
  - Definition of Done: reproducible baseline and a primary-source shortlist with accept/hold reasons
  - Verification: Git/hash comparison, `npm run price-coverage -- --prefecture=秋田県`, official-host checks
- [ ] P2: Akita stage-type price wave
  - Scope: up to five Akita stage-type facilities, official daily fee or verifiable full-day component total only
  - Writes allowed: listed canonical/generated paths and run directory
  - Definition of Done: accepted records pass all validation, or each investigated candidate has an evidence-bounded hold reason
  - Verification: audit, generate, coverage write, validate, diff review
- [ ] P3: Miyazaki stage-type price wave
  - Scope: up to five Miyazaki stage-type facilities under the same acceptance rules
  - Writes/DoD/Verification: same as P2
- [ ] P4: Yamagata or Ishikawa stage-type gap wave
  - Scope: choose the prefecture with the clearer official-source path after refreshing coverage; up to three facilities
  - Writes/DoD/Verification: same as P2

P2-P4 are not executed by this ledger while the concurrent writer is active. Their research scope remains with the other approved run; this ledger uses the verifier queue below.

## Conflict-safe Verifier Queue

- [ ] V1: Hourly validation snapshots until the finalization buffer
  - Scope: observe the other run's HEAD/status and canonical changes; run audit, lint, tests, read-only coverage, and diff checks
  - Writes allowed: this run directory only
  - Definition of Done: each scheduled snapshot records timestamp, HEAD, dirty paths, check results, coverage movement, and transient/final classification
  - Verification: ledger validator after every snapshot
- [ ] V2: Final independent verification and morning handoff
  - Scope: final check at/after 07:30 JST; compare with baseline and the other run's latest state
  - Writes allowed: this run directory only
  - Definition of Done: STATE/REPORT final, exact unresolved failures and unverified states separated, validator `--final` passes

## Reserve Queue

Run only after all feasible primary waves are complete and the early-completion gate passes.

- [ ] R1: Data-integrity reinforcement
  - Scope: changed rows, IDs, allowed day/unit values, component arithmetic, duplicate references, and `git diff --check`
  - Writes allowed: run directory; canonical corrections only for errors introduced by this run
  - Stop condition: one complete integrity pass
  - Verification: repository audits plus targeted row checks
- [ ] R2: Handoff reinforcement
  - Scope: verified facts, holds, blockers, unverified states, and exact restart commands
  - Writes allowed: run directory only
  - Stop condition: morning report is self-contained
  - Verification: ledger validator

## Reserve Budget

- Maximum reserve waves: 2
- Maximum reserve runtime: 60 minutes
- Token/model limit: single current model only
- Subagents: none

## Finalization Buffer

- Cutoff: 2026-08-10 08:00 JST
- Begin final verification by: 2026-08-10 07:30 JST
- If the next wave cannot finish before this time: do not start it

## Early-completion Gate

- [ ] Primary Definition of Done achieved
- [ ] Primary verification recorded
- [ ] Protected baseline unchanged except named overnight commits
- [ ] Reserve scope remains inside this plan
- [ ] Enough time and budget remain
