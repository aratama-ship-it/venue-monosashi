# Arena 100 Primary-source Research Plan

## Objective

Expand the nationwide event-space catalogue by 100 additional large-arena or arena-compatible candidate facilities (from 74 to at least 174 candidates), using only facility, operator, municipality, prefecture, designated-manager, or official-PDF sources. Each published candidate must retain a direct official URL and must not use missing values as facts.

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Writable paths: `data/candidate-venues.csv`, `data/venue-details.csv`, `data/price-observations.csv`, `data/venue-operations.csv`, their generated local data, `web/app/generated-data.ts`, focused tests, and this run ledger.
- Baseline: branch `agent/add-competition-and-small-theater-coverage`, HEAD `f55f0940e78ca0c6cb9abd0bfd4ca6c543a4cb26`.
- Baseline inventory: 74 candidates, 119 space details, 317 price observations, and 58 operation observations.

## Definition of Done

- Add at least 100 new candidate rows with an official source URL, official facility name, municipality/prefecture, and a public fact supporting the arena/event-space classification.
- Enrich each candidate only as far as its official documentation supports; capacity, area, height, fee, access, and booking values remain blank or `unknown` when not publicly confirmed.
- Work in source-traceable waves. After every wave, pass data audit and diff checks. Run generated-data/build validation whenever the public catalogue changes.

## Allowed Actions

- Read project files and applicable instructions.
- Access official public web pages and official PDFs.
- Add or correct source-backed CSV rows and generated local data.
- Run audits, database regeneration, lint/build/HTML tests, and ledger validation.
- Commit named, validated wave files. The user has already approved publication of validated current data; deploy only completed meaningful updates, never an unvalidated partial change.

## Prohibited Actions

- Do not contact facilities, request quotes, reserve, purchase, create accounts, or modify credentials.
- Do not delete data, overwrite pre-existing untracked run ledgers, or infer availability, throwing clearance, floor protection, loading, network terms, or simultaneous bookings.
- Do not treat search snippets, directories, or unverified third-party claims as official facts.

## Stop Conditions

- Record any unexpected overlapping change to canonical CSVs and stop writes to those files until it is resolved.
- Record official-source gaps as `needs_check` or explicit unknowns rather than guessing.
- Flag a source-access, schema, audit, or deployment issue in STATE and REPORT; continue independent source work where safe.

## Team

- Coordinator/writer/verifier: root agent owns the canonical CSVs, ledger, audit, and commits.
- Explorers: up to two read-only agents may independently trace official sources and propose non-duplicate candidates. They never edit canonical files or the ledger.

## Verification

- `npm run audit`
- `git diff --check`
- `npm run rebuild-db` and `npm run validate` after canonical catalogue changes
- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-08-02-arena-100-primary-source`
