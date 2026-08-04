# Overnight State

## Status

- Status: ACTIVE
- Last updated: 2026-08-05 04:33 JST
- Cutoff: 2026-08-06 07:00 JST
- Last data commit: `2e5e4fb` (ledger-only commits may follow it)

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
- Chugoku: 完了（鳥取・島根はwave 8、岡山・広島・山口はwave 9）
- Shikoku: 完了（徳島はwave 9、香川・愛媛・高知はwave 10）
- Kyushu/Okinawa: 完了（福岡はwave 10、佐賀・長崎・熊本・大分はwave 11、宮崎・鹿児島・沖縄はwave 12）
- Nationwide target: 達成（47都道府県、候補230件）。以後は既存候補の料金・運用・区画不足を深掘りする。

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
| 9 | 2026-08-05 03:58 JST | 岡山・広島・山口・徳島 | 4 candidates / 4 details / 7 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `eda592a` | 周南の現名称・2026料金と総社の新空調を反映。徳島の旧施行日料金は再確認注意を明記 |
| 10 | 2026-08-05 04:05 JST | 香川・愛媛・高知・福岡 | 4 candidates / 4 details / 9 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `6756506` | 愛媛の公式料金PDFを目視照合。春野の6,630席内訳、福岡の競技場限定運用と出店事前承認を明記 |
| 11 | 2026-08-05 04:11 JST | 佐賀・長崎・熊本・大分 | 4 candidates / 4 details / 9 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `70dc417` | 佐賀・大分の2026料金PDFを目視照合。長崎の5,600席構成と熊本の営利・不特定多数利用条件を明記 |
| 12 | 2026-08-05 04:19 JST | 宮崎・鹿児島・沖縄 | 3 candidates / 3 details / 10 prices / 3 operations | audit 0 errors; lint OK; tests 3/3 | `cd2136c` | 全国47都道府県・候補230件に到達。宮崎・薩摩川内の料金PDFを目視照合し、沖縄の3,500席構成・6か月前予約・普通車408台を明記 |
| 13 | 2026-08-05 04:24 JST | 既存高評価4候補の運用深掘り | 4 operations | audit 0 errors; lint OK; tests 3/3 | `69ebe42` | 代々木の2026年度利用案内を目視照合。日本ガイシの搬入・物販・飲食、滋賀のWEB予約・Wi-Fi、加古川の4か月前抽選を明記 |
| 14 | 2026-08-05 04:26 JST | 既存高評価3候補の料金深掘り | 11 prices | audit 0 errors; lint OK; tests 3/3 | `7ea4077` | 東京体育館とセキスイハイムスーパーアリーナの料金PDFを目視照合。高崎アリーナの公式HTML料金表も確認。島津アリーナ京都は公式サイトの証明書不整合で保留 |
| 15 | 2026-08-05 04:29 JST | 既存高評価4候補の運用深掘り | 4 operations | audit 0 errors; lint OK; tests 3/3 | `3b37cd6` | 福岡の搬入・500台駐車、クラサスの3か月前受付・公園約5,000台、東京武道館の団体登録・70台、石川の3週間前打合せ・臨時店舗申請を明記 |
| 16 | 2026-08-05 04:31 JST | 既存高評価4候補の料金比較拡張 | 16 prices / 1 classification fix | audit 0 errors; generated 230/495 | `ab3c317` | 福岡・クラサス・東京武道館・石川の用途、曜日、観客席、入場料、照明、空調を補強。東京武道館の既存1件の用途誤分類を訂正 |
| 17 | 2026-08-05 04:33 JST | 既存高評価4候補の地域運用深掘り | 4 operations | audit 0 errors; generated 230/495 | `2e5e4fb` | マエダの次年度・年度途中貸切と1,015台、草薙のWEB予約・駐車制限、米子の年次調整・380台、群馬の新予約・1,643台・物販飲食申請を明記 |

## Current Wave

- Phase: verified deepening
- Last verified wave: wave 17
- No data edits are in progress.

## Next Action

- At the next heartbeat, confirm the current HEAD descends from data commit `2e5e4fb` and the worktree contains only known untracked paths, then continue with 3–5 high-fit candidates missing operations or current price observations, prioritizing official HTML and current-dated fee tables.

## Blockers

- None.
