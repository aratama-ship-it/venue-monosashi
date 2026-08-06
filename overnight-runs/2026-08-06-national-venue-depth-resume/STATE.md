# Unattended National Venue-Depth Resume State

## Status

- Status: ACTIVE
- Last updated: 2026-08-06 Asia/Tokyo
- Current wave: Wave 2 — Kochi official-source expansion (source data and checks complete; validation and deployment pending).

## Baseline

- Git branch and commit: `agent/add-competition-and-small-theater-coverage` at `5c0946bc6e73c553c168f3f8b13468e64790da72`.
- Data counts: 476 candidate facilities, 1,483 searchable spaces, 2,820 price observations, and 222 operation rows.
- Depth target: 25 candidates, 15 municipalities, and 51 spaces per prefecture. Remaining deficits: 699 candidates and 942 spaces; municipality deficit is measured by the generated report.
- Canonical hashes: `candidate-venues.csv` `0a83a784dceea38a3a146587e2457c44fc7403ffbe9c62186a3ca4532f902933`; `venue-details.csv` `2afd5815ea595527bbec8b100daf097684c20a8fefcb18ba32fee82ca49885e1`; `price-observations.csv` `640b4afc3d607a7b796818d49334bf2f56fb303745a92ad8b759b10158e2e396`; `venue-operations.csv` `e80ed96e8c3c4533a6c782933369207b968abb8207f3274c3afc57af149d1c25`.
- Pre-existing untracked paths preserved: three prior small-theater run directories and `web-projects/`.
- Existing audit condition: one warning at `historical-events.csv:173` for a held/planned row with no `venue_names`; no audit errors.

## Completed Waves

- Wave 1 source data: added four Yamaguchi candidates — 萩市民館（萩市）、美祢市民会館（美祢市）、不二輸送機ホール（山陽小野田市）、スターピアくだまつ（下松市） — and 33 independently searchable spaces. Yamaguchi is now 11 candidates, 10 municipalities, and 59 spaces. Official sources: 萩市、 美祢市、山陽小野田市、スターピアくだまつ指定管理者の公開資料.
- Published fee observations were retained only for currently available rooms. 萩市民館大ホールは2026年6月から使用中止のため、旧料金表を検索用料金データには入れていない。山陽小野田市文化会館は大ホール平日・休日、小ホール全日の日額を確認した。
- Wave 1 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 46 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.
- Wave 2 source data: added three Kochi candidates — 土佐市複合文化施設つなーで（土佐市）、南国市地域交流センターMIARE！（南国市）、室戸市保健福祉センターやすらぎ（室戸市） — and 40 independently searchable spaces. Kochi is now 10 candidates, 7 municipalities, and 53 spaces. Official sources: 土佐市、南国市、室戸市.
- Capacity is recorded only when the official source gives an explicit capacity or seat count. Counts of chairs, desks, or slippers are retained as notes and do not become searchable capacity values.

## Current Wave

- Run repository validation, commit the named Wave 2 source files, deploy to the existing public site, and verify the public URL.

## Next Action

- After successful public deployment, start Wave 3 in Oita, the lowest-depth prefecture (7 candidates), using official-source-only additions.

## Blockers

- None.
