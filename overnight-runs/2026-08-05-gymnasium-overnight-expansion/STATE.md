# Overnight State

## Status

- Status: ACTIVE
- Last updated: 2026-08-05 03:52 JST
- Cutoff: 2026-08-06 07:00 JST
- Last data commit: `679d668` (ledger-only commits may follow it)

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

- Hokkaido/Tohoku: 完了（北海道・山形・福島はwave 2、青森・岩手・宮城・秋田はwave 1）
- Kanto: 完了（茨城はwave 2、栃木・群馬・埼玉・千葉はwave 3、東京・神奈川はwave 4）
- Hokuriku/Koshinetsu: 完了（山梨・新潟はwave 4、富山・石川・福井・長野はwave 5）
- Tokai: 完了（岐阜・静岡・愛知・三重はwave 6）
- Kinki: 完了（滋賀・京都・大阪・兵庫はwave 7、奈良・和歌山はwave 8）
- Chugoku: 鳥取・島根はwave 8で完了。岡山、広島、山口
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
| 2 | 2026-08-05 03:03 JST | 北海道・山形・福島・茨城 | 4 candidates / 4 details / 3 prices / 2 operations | audit 0 errors; lint OK; tests 3/3 | `8c04d2d` | price-count assertion now follows CSV data |
| 3 | 2026-08-05 03:07 JST | 栃木・群馬・埼玉・千葉 | 4 candidates / 4 details / 6 prices / 2 operations | audit 0 errors; lint OK; tests 3/3 | `36349f1` | 3-wave full verification checkpoint |
| 4 | 2026-08-05 03:19 JST | 東京・神奈川・山梨・新潟 | 4 candidates / 4 details / 6 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `fa8248c` | 料金追加目標15件に到達。上越の予定休館を明記 |
| 5 | 2026-08-05 03:28 JST | 富山・石川・福井・長野 | 4 candidates / 4 details / 7 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `27e958d` | 料金PDFを目視照合。運用追加目標10件にも到達 |
| 6 | 2026-08-05 03:36 JST | 岐阜・静岡・愛知・三重 | 4 candidates / 4 details / 6 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `256054a` | 3-wave full checkpoint。大垣の旧版料金は数値追加を保留 |
| 7 | 2026-08-05 03:46 JST | 滋賀・京都・大阪・兵庫 | 4 candidates / 4 details / 8 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `8cb8e3d` | 現行名称を確認。彦根・京都の料金PDFを目視照合し、姫路の将来改修予定を明記 |
| 8 | 2026-08-05 03:52 JST | 奈良・和歌山・鳥取・島根 | 4 candidates / 4 details / 7 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `679d668` | 奈良・鳥取の料金PDFを目視照合。和歌山の連続7日上限、松江の現行2026年度料金を明記 |

## Current Wave

- Phase: regional expansion
- Last verified wave: wave 8
- No data edits are in progress.

## Next Action

- At the next heartbeat, confirm the current HEAD descends from data commit `679d668` and the worktree contains only known untracked paths, then continue with 岡山・広島・山口・徳島。

## Blockers

- None.
