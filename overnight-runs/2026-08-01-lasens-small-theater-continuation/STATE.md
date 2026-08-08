# Overnight Run State

## Status

- Status: PARTIAL
- Last updated: 2026-08-02T09:15:00+09:00
- Current wave: finalised after Wave 5

## Baseline

- Git root: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/venue-monosashi`
- Branch: `agent/add-competition-and-small-theater-coverage`
- Commit: `1bebbfc030f421ed311ee60b9ba3f4fd58c54f27`
- Pre-existing dirty paths: `package.json` (modified)、`data/small-theater-research.csv` (untracked)、`overnight-runs/2026-07-31-lasens-small-theater-census/` (untracked)、`scripts/small-theater-research.mjs` (untracked)
- `data/small-theater-research.csv`: `2c485d073ce79f21f01716b6d0a7831de8586859bc33553ee6428cfe14f7cee9`
- `package.json`: `3a5752be95b690a5557b1062c6502bf715855e61c1e3893eaa3b7b244899c2f7`
- `data/candidate-venues.csv`: `f70cfe2b683045e40d30518e92e6066d6e318ccaa20928bb44d961e23ea7dfcc`
- `data/venue-details.csv`: `6e632ad0c25a260df2d79bce3806757323df0a47399ae67d1815d6801d44b66c`
- `data/price-observations.csv`: `5bd0875ef2d7847ba48fd52ee9f85d8b352de365a15a18ca9c81d00b28eb622d`
- `data/venue-operations.csv`: `dd7031005f32764fc60dc59c1749aa262fa79ecdf8db377a9dab7298ab6dd340`
- `docs/COMPETITION_AND_SMALL_THEATER_SCOPE.md`: `7c65a35dfd0fd12717ac668f56a2d29378b9b7325b944a87756b3e7461e3a0bb`
- `scripts/audit-data.mjs`: `678a4fb87e9f01931731cd86d8aa4e2bcb79717961b00bc9d68d9c3503d80282`
- Baseline research audit: rows 594、verified_primary 324、primary_partial 87、official_not_found 41、ambiguous 17、blocked 19、pending 106、errors 0
- Baseline data audit: candidate 74、details 116、prices 311、operations 56、warnings 1、errors 0

## Completed Waves

- Run ledgerを作成し、前runの未確認106件、一次情報境界、書込み対象、停止条件を固定した。
- Wave 1（`LASENS-706`、`LASENS-485`、`LASENS-346`、`LASENS-682`、`LASENS-642`、`LASENS-481`、`LASENS-324`、`LASENS-511`）を公式情報で確認した。`小劇場B1`、`小劇場楽園`、`上野ストアハウス`を現行・`verified_primary`、`新宿ゴールデン街劇場`を公式閉館告知あり・`verified_primary`とした。`上智小劇場`は大学の現行呼称・用途のみ確認できたため`primary_partial`、`新井薬師 SPECIAL COLORS`は公式URLの名前解決不能のため`blocked`、`シアター・ミラクル`と`新宿サニーサイドシアター`は公式運営情報を確認できず`official_not_found`とした。
- 料金・設備・アクセスは本田劇場グループ、上野ストアハウス、新宿ゴールデン街劇場の公式ページからのみ記録した。LaSensの客席数・閉館表示・住所値は公式欄へ転記していない。
- Wave 1後の小劇場監査は rows 594、verified_primary 328、primary_partial 88、official_not_found 43、ambiguous 17、blocked 20、pending 98、errors 0。全体監査は warnings 1（既存のhistorical-events行）、errors 0。
- Wave 2（`LASENS-2649`、`LASENS-488`、`LASENS-700`、`LASENS-479`、`LASENS-480`、`LASENS-478`、`LASENS-403`、`LASENS-402`）を公式情報で確認した。新宿眼科画廊スペース地下、新宿村LIVE、新宿文化センター小ホール、森下スタジオCスタジオ、森下文化センター第1レクホールを現行・`verified_primary`とした。新宿新生館・新宿白萩ホールは`official_not_found`、旧所在地の新宿村ライブは現行施設との公式連続性を解けず`ambiguous`とした。
- 料金・設備・アクセス・利用条件は、新宿眼科画廊、新宿村LIVE、新宿未来創造財団、セゾン文化財団、江東区文化コミュニティ財団の公式ページまたは公式PDFからのみ記録した。LaSensの客席数・閉館表示は公式欄へ転記していない。
- Wave 2後の小劇場監査は rows 594、verified_primary 333、primary_partial 88、official_not_found 45、ambiguous 18、blocked 20、pending 90、errors 0。全体監査は warnings 1（既存のhistorical-events行）、errors 0。
- Wave 3（`LASENS-349`、`LASENS-681`、`LASENS-345`、`LASENS-3997`、`LASENS-4132`、`LASENS-634`、`LASENS-3426`、`LASENS-585`）を公式情報で確認した。KAAT神奈川芸術劇場 大スタジオ、成城ホール（砧区民会館）を現行・`verified_primary`とした。水性は現行の公演予定、アクセス、利用相談条件までを確認したため`primary_partial`とした。神楽坂die pratze、神保町花月、西荻WENZスタジオは公式運営情報を確認できず`official_not_found`とした。
- KAAT公式施設案内・料金・アクセス・利用案内、世田谷区公式の成城ホール施設案内・料金表、水性公式の公演予定・アクセス・問い合わせページだけを記録した。LaSensの客席数・閉館表示は公式欄へ転記していない。人形町劇場 rabbitと晴れたら空に豆まいては公式サイト取得がそれぞれ本文取得不能・HTTP 429で停止したため`blocked`とし、公式値を記録していない。
- Wave 3後の小劇場監査は rows 594、verified_primary 335、primary_partial 89、official_not_found 48、ambiguous 18、blocked 22、pending 82、errors 0。全体監査は warnings 1（既存のhistorical-events行）、errors 0。
- Wave 4（`LASENS-558`、`LASENS-419`、`LASENS-297`、`LASENS-474`、`LASENS-3531`、`LASENS-230`、`LASENS-234`、`LASENS-2016`）を公式情報で確認した。西東京市民会館、青山円形劇場を公式閉館情報あり・`verified_primary`、赤羽会館 小ホール、赤坂RED/THEATERを現行・`verified_primary`とした。青年座劇場は劇団公式の新拠点と旧劇場の関係を解けず`ambiguous`、西新宿成子坂劇場（TJPスタジオ）・石神井舞台は`official_not_found`、赤坂CHANCEシアターは公式ドメインを取得できず`blocked`とした。
- 西東京市公式の跡地活用ページ、東京都公式の神宮前五丁目地区まちづくり方針、北区指定管理者公式の赤羽会館使用料表・施設案内、赤坂RED/THEATER公式の座席表・使用規定・アクセスだけを記録した。LaSens・予約仲介・検索スニペットの客席数・料金・閉館表示は公式欄へ転記していない。
- Wave 4後の小劇場監査は rows 594、verified_primary 339、primary_partial 89、official_not_found 50、ambiguous 19、blocked 23、pending 74、errors 0。全体監査は warnings 1（既存のhistorical-events行）、errors 0。
- Wave 5（`LASENS-475`、`LASENS-2012`、`LASENS-2018`、`LASENS-643`、`LASENS-607`、`LASENS-497`、`LASENS-555`、`LASENS-285`）は停止時刻前に到達した公式一次情報だけを記録した。千本桜ホール、浅草花劇場、浅草九劇、全電通ホール、こくみん共済 coop ホール／スペース・ゼロ、早稲田小劇場どらま館を`verified_primary`とした。前進座劇場は公式の現行・閉館・改称根拠を確認できず`official_not_found`、早稲田クローバースタジオは運営者公式ページで名称・問い合わせだけを確認したため状態`unknown`・`primary_partial`とした。
- Wave 5で記録した客席・面積・料金・利用条件は各会場または大学の公式ページ・公式PDFだけに限定した。浅草九劇・全電通ホール・スペース・ゼロの個別アクセスURL、早稲田クローバースタジオの現在状況・規模・料金は公開確認できないため空欄のままとした。
- 最終監査: `npm run audit-small-theaters`は rows 594、verified_primary 345、primary_partial 90、official_not_found 51、ambiguous 19、blocked 23、pending 66、errors 0。`npm run audit`は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし。final validatorは`ledger validation: OK (final)`。
- Baselineとの比較: branch・HEADは`agent/add-competition-and-small-theater-coverage`・`1bebbfc030f421ed311ee60b9ba3f4fd58c54f27`のまま。6基準ファイルと`package.json`のSHA-256はbaseline一致、台帳のみ`cd4e2b2e4d016487e24f7cf068ee22d0f081316680897d992575f03f2cb65bb9`へ更新。既存dirty paths以外の想定外変更はない。

## Current Wave

- 停止時刻到達後の最終処理を実行した。新規調査は停止し、Wave 5までの台帳更新、両監査、差分チェック、final validatorを実行する。canonical会場比較CSVは未変更。

## Next Action

- `pending` 66件は次の独立runで、公式一次情報に限定して継続する。今回のrunは停止時刻により`PARTIAL`で確定する。

## Blockers

- なし。
