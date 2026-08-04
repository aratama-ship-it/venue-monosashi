# Overnight State

## Status

- Status: ACTIVE
- Last updated: 2026-08-05 02:56 JST
- Cutoff: 2026-08-06 07:00 JST
- Last data commit: `7173a85` (ledger-only commits may follow it)

## Baseline

- Candidate venues: 183
- Venue details: 271
- Price observations: 390
- Venue operations: 102
- Historical events: 225
- Budget scenarios: 13
- Small theaters: 594
- Arena/sports-pattern candidates: 99
- Prefectures with at least one arena/sports-pattern candidate: 47/47
- Public site: v22 / 174 candidates; the local gymnasium expansion is not pushed or deployed

## Queue

- Hokkaido/Tohoku: 北海道、山形、福島（青森、岩手、宮城、秋田はwave 1完了）
- Kanto: 茨城、栃木、群馬、埼玉、千葉、東京、神奈川、山梨
- Hokuriku/Koshinetsu: 新潟、富山、石川、福井、長野
- Tokai: 岐阜、静岡、愛知、三重
- Kinki: 滋賀、京都、大阪、兵庫、奈良、和歌山
- Chugoku: 鳥取、島根、岡山、広島、山口
- Shikoku: 徳島、香川、愛媛、高知
- Kyushu/Okinawa: 福岡、佐賀、長崎、熊本、大分、宮崎、鹿児島、沖縄

## Safety notes

- Preserve untracked overnight-run directories and `web-projects/`.
- Preserve `stash@{0}: preserve-canonical-pre-integration-20260805`.
- No push/deploy/publication during this run.
- Unknown or unreadable official facts remain blank or `要確認`.

## Completed Waves

| Wave | Time | Scope | Added | Validation | Commit | Notes |
|---|---|---|---:|---|---|---|
| 0 | 2026-08-05 02:49 JST | bootstrap | 0 | ledger OK | `5119446` | ledger and heartbeat created |
| 1 | 2026-08-05 02:56 JST | 青森・岩手・宮城・秋田 | 4 candidates / 4 details | audit 0 errors; lint OK; tests 3/3 | `7173a85` | fixed count assertion now follows CSV data |

## Current Wave

- Phase: regional expansion
- Last verified wave: wave 1
- No data edits are in progress.

## Next Action

- At the next heartbeat, confirm the current HEAD descends from data commit `7173a85` and the worktree contains only known untracked paths, then continue with 北海道・山形・福島 and the first Kanto prefectures.

## Blockers

- None.
