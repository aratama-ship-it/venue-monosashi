# Daytime Run State

## Status

- Status: COMPLETE
- Last updated: 2026-08-02T06:34:25+09:00
- Current wave: 9 - final primary-source wave and final verification completed

## Baseline

- Git root: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/venue-monosashi`
- Branch: `agent/add-competition-and-small-theater-coverage`
- Commit: `1bebbfc030f421ed311ee60b9ba3f4fd58c54f27`
- Pre-existing dirty paths: `package.json` (modified)、`data/small-theater-research.csv` (untracked)、`overnight-runs/2026-07-31-lasens-small-theater-census/` (untracked)、`overnight-runs/2026-08-01-lasens-small-theater-continuation/` (untracked)、`scripts/small-theater-research.mjs` (untracked)
- `data/small-theater-research.csv`: `cd4e2b2e4d016487e24f7cf068ee22d0f081316680897d992575f03f2cb65bb9`
- `package.json`: `3a5752be95b690a5557b1062c6502bf715855e61c1e3893eaa3b7b244899c2f7`
- `data/candidate-venues.csv`: `f70cfe2b683045e40d30518e92e6066d6e318ccaa20928bb44d961e23ea7dfcc`
- `data/venue-details.csv`: `6e632ad0c25a260df2d79bce3806757323df0a47399ae67d1815d6801d44b66c`
- `data/price-observations.csv`: `5bd0875ef2d7847ba48fd52ee9f85d8b352de365a15a18ca9c81d00b28eb622d`
- `data/venue-operations.csv`: `dd7031005f32764fc60dc59c1749aa262fa79ecdf8db377a9dab7298ab6dd340`
- `docs/COMPETITION_AND_SMALL_THEATER_SCOPE.md`: `7c65a35dfd0fd12717ac668f56a2d29378b9b7325b944a87756b3e7461e3a0bb`
- `scripts/audit-data.mjs`: `678a4fb87e9f01931731cd86d8aa4e2bcb79717961b00bc9d68d9c3503d80282`
- Baseline research audit: rows 594、verified_primary 345、primary_partial 90、official_not_found 51、ambiguous 19、blocked 23、pending 66、errors 0
- Baseline data audit: candidate 74、details 116、prices 311、operations 56、warnings 1、errors 0

## Completed Waves

- 前runを`PARTIAL`で完了し、pending 66件と一次情報境界を引き継いだ。このrunでは、基準ファイルと開始時のdirty stateを固定した。
- Wave 1（`LASENS-581`、`LASENS-582`、`LASENS-284`、`LASENS-490`、`LASENS-3430`、`LASENS-428`、`LASENS-429`、`LASENS-2532`）を公式情報で確認した。早稲田大学学生会館の演劇練習室B202・B203、草月ホール、大岡山劇場を現行・`verified_primary`、早稲田銅鑼魔館（改装前）を大学公式沿革に基づく閉館・`verified_primary`とした。大塚ドリームシアターは運営者公式で所在地・アクセスだけを確認し状態`unknown`・`primary_partial`、大江戸温泉物語・大塚ジェルスホールは公式一次情報を確認できず`official_not_found`とした。
- 早稲田大学の2026年度予約・貸出案内、早稲田小劇場どらま館公式沿革、草月公式施設案内・使用規定、大岡山劇場公式の2026年予定・料金規約・アクセス、Dreamshow公式劇場案内だけを記録した。二次索引・予約仲介・検索スニペットの客席数、料金、閉館表示は公式欄へ転記していない。
- Wave 1後の小劇場監査は rows 594、verified_primary 350、primary_partial 91、official_not_found 53、ambiguous 19、blocked 23、pending 58、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 2（`LASENS-310`、`LASENS-337`、`LASENS-482`、`LASENS-409`、`LASENS-701`、`LASENS-446`、`LASENS-2713`、`LASENS-411`）を公式情報で確認した。中板橋の新生館スタジオ、中目黒GTプラザホール、ザ・ポケット、中野シアターかざあなを現行・`verified_primary`とした。池袋西口GEKIBAと中野Vスタジオは運営者公式を確認したが現行性等が不足するため状態`unknown`・`primary_partial`、池袋小劇場と中野光座は公式一次情報を確認できず`official_not_found`とした。
- 運営者公式、目黒区公式、劇場公式の現行案内・料金規約・アクセス・利用規約だけを記録した。二次索引の客席値、閉館表示、検索スニペットは公式欄へ転記していない。Wave 2後の小劇場監査は rows 594、verified_primary 354、primary_partial 93、official_not_found 55、ambiguous 19、blocked 23、pending 50、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 3（`LASENS-389`、`LASENS-280`、`LASENS-4008`、`LASENS-2534`、`LASENS-437`、`LASENS-565`、`LASENS-2311`、`LASENS-2313`）を公式情報で確認した。町田市民フォーラム、調布市グリーンホール小ホール、鶴めいホール、伝承ホール、東演パラータ、東京ウィメンズプラザホール、東京芸術劇場のシアターイースト・ウエストを現行・`verified_primary`とした。自治体・指定管理者・運営者の公式案内だけで客席、料金、アクセス、利用条件を記録し、可変席は公式が示す最大数だけを注記付きで記録した。Wave 3後の小劇場監査は rows 594、verified_primary 362、primary_partial 93、official_not_found 55、ambiguous 19、blocked 23、pending 42、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 4（`LASENS-306`、`LASENS-308`、`LASENS-2670`、`LASENS-690`、`LASENS-560`、`LASENS-424`、`LASENS-572`、`LASENS-397`）を公式情報で確認した。東京芸術劇場の旧小ホール1・2は現行のシアターイースト・ウエストとの改称関係を公式で確認し`verified_primary`、南大塚ホールは改修後の現行利用・`verified_primary`とした。徳望館は大学公式で建物現存のみ確認し`primary_partial`、内幸町ホールは指定管理者公式で改装中を確認し状態`unknown`・`primary_partial`、東中野バニラスタジオとアトリエクマノ1k-1・1k-2は公式一次情報を確認できず`official_not_found`とした。Wave 4後の小劇場監査は rows 594、verified_primary 365、primary_partial 95、official_not_found 58、ambiguous 19、blocked 23、pending 34、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 5（`LASENS-416`、`LASENS-413`、`LASENS-325`、`LASENS-574`、`LASENS-327`、`LASENS-3760`、`LASENS-342`、`LASENS-685`）を公式情報で確認した。日暮里サニーホール、日本橋劇場、梅ヶ丘BOX、銀座博品館劇場、板橋シアター咲、板橋区立文化会館小ホール、表参道GROUNDを現行・`verified_primary`とした。俳優座劇場は運営会社公式の閉館告知に基づき閉館・`verified_primary`とした。公式が示す可変収容数は最大値を注記付きで記録し、公式で面積を確認できない行は空欄のままとした。Wave 5後の小劇場監査は rows 594、verified_primary 373、primary_partial 95、official_not_found 58、ambiguous 19、blocked 23、pending 26、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 6（`LASENS-241`、`LASENS-408`、`LASENS-407`、`LASENS-276`、`LASENS-433`、`LASENS-493`、`LASENS-366`、`LASENS-489`）を公式情報で確認した。武蔵野芸能劇場小劇場、文学座アトリエ、あうるすぽっと、北沢タウンホールを現行・`verified_primary`とした。武蔵野公会堂は公式が2026年4月末で貸出終了とし以降の運営を案内待ちとしているため、状態`unknown`・`primary_partial`とした。不思議地底窟 青の奇蹟、北新宿スペースアクロス、北池袋新生館シアターは公式一次情報を確認できず`official_not_found`とした。Wave 6後の小劇場監査は rows 594、verified_primary 377、primary_partial 96、official_not_found 61、ambiguous 19、blocked 23、pending 18、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 7（`LASENS-2635`、`LASENS-335`、`LASENS-267`、`LASENS-268`、`LASENS-235`、`LASENS-392`、`LASENS-660`、`LASENS-401`）を公式情報で確認した。本多スタジオ、麻布区民センター区民ホールを現行・`verified_primary`、門仲天井ホールを現行の両国門天ホールへの移転・改称関係として`verified_primary`とした。本所松坂亭劇場、麻布ディプラッツ、明石スタジオ、目黒区福祉センター、目黒食堂は、公式一次情報を確認できず`official_not_found`とした。各LaSensの閉館表示・二次情報の会場記載は閉館根拠や公式値へ用いていない。
- Wave 7後の小劇場監査は rows 594、verified_primary 380、primary_partial 96、official_not_found 66、ambiguous 19、blocked 23、pending 10、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 8（`LASENS-420`、`LASENS-303`、`LASENS-240`、`LASENS-2137`、`LASENS-460`、`LASENS-278`、`LASENS-513`、`LASENS-2010`）を公式情報で確認した。野方区民ホール、立川市市民会館小ホール、両国門天ホール、六行会ホール、六本木トリコロールシアターを現行・`verified_primary`とした。遊空間がざびぃは公式候補URLの本文を取得できず`blocked`、六本木・キャラメルと六本木・将軍は公式一次情報を確認できず`official_not_found`とした。LaSensの閉館表示・収容人数は公式欄へ用いていない。
- Wave 8後の小劇場監査は rows 594、verified_primary 385、primary_partial 96、official_not_found 68、ambiguous 19、blocked 24、pending 2、errors 0。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 9（`LASENS-351`、`LASENS-597`）を公式情報で確認した。吉祥寺櫂スタジオと萬劇場を、運営者公式の現行利用案内・料金・アクセス・利用条件で現行・`verified_primary`とした。これでこのrun開始時に残っていたpending 66件を全て一次情報確認状態へ移した。最終監査・基準比較・final validatorを実行する。
- 最終監査で rows 594、verified_primary 387、primary_partial 96、official_not_found 68、ambiguous 19、blocked 24、pending 0、errors 0を確認した。全体監査は warnings 1（既存の`historical-events.csv`行）、errors 0。`git diff --check`は出力なし。基準のcanonical会場比較CSV、scope文書、監査スクリプトのSHA-256は開始時記録と一致し、想定外変更はない。final validatorを実行して完了する。

## Current Wave

- Wave 9の台帳更新、全監査、基準比較を完了。変更ファイルは`data/small-theater-research.csv`、このrunの`STATE.md`、`REPORT.md`のみで、canonical会場比較CSVは未変更。

## Next Action

- 完了。pending 0のため以後は変更しない。

## Blockers

- なし。
