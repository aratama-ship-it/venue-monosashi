# Event-space Research Plan

## Objective

Add only primary-source-confirmed, comparable information for the next nationwide event-space target: CAND-035 (長良川国際会議場＋岐阜メモリアルセンター). Preserve unknown values and distinguish the two independently booked facilities.

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/venue-monosashi`
- Writable paths: `data/candidate-venues.csv`, `data/venue-details.csv`, `data/price-observations.csv`, `data/venue-operations.csv`, generated database/web data only when their source changes, and this run ledger.
- Baseline: branch `agent/add-competition-and-small-theater-coverage`, HEAD `7a18b65582adf640f5c0e05e32fdabb898a57fd7`.

## Definition of Done

- Complete one bounded CAND-035 wave with official venue/operator/municipal pages or official PDFs as evidence.
- Record only verified space, price, and operating facts; leave unknowns blank or `unknown`.
- Run the canonical data audit and a diff check, then update the run state and report.

## Allowed Actions

- Read project files and applicable instructions.
- Access official public web pages and official PDFs.
- Add or correct source-backed rows in the stated CSVs.
- Rebuild generated local data and run relevant audit/test commands when sources change.
- Commit the completed bounded batch. Public deployment may occur only after a meaningful validated update under the user's existing publication approval.

## Prohibited Actions

- Do not contact facilities, request quotes, reserve, purchase, or alter external accounts.
- Do not delete user data, overwrite pre-existing untracked run ledgers, or change secrets.
- Do not infer booking availability, simultaneous booking feasibility, throwing clearance, floor protection, or event suitability from missing information.

## Stop Conditions

- Stop overlapping writes and record the issue if the stated baseline changes unexpectedly.
- Record missing official documentation as an explicit limitation rather than using index or third-party values.
- Escalate a user decision only for scope, release, or event-condition choices that cannot be resolved from official material.

## Team

- Coordinator/explorer/writer/verifier: single agent, sequential roles; no concurrent writers.

## Verification

- `npm run audit`
- `git diff --check`
- `npm run rebuild-db` and `npm run validate` when canonical source data is changed for publication.
