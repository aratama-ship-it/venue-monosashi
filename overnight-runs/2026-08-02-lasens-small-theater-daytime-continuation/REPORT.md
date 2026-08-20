# Daytime Research Report

## Outcome

- Complete. 前runで残ったLaSens小劇場66件を、一次情報確認だけで継続調査し、全594件を検証状態へ移した。

## Changes

- 継続調査用の独立run ledgerを作成した。既存の会場比較CSVは読み取り専用で扱う。
- 早稲田大学学生会館の演劇練習室B202・B203は大学公式の2026年度予約・貸出案内に基づき現行・`verified_primary`とし、公認サークル向けの利用条件・アクセスだけを記録した。早稲田銅鑼魔館（改装前）は早稲田大学公式沿革に基づき閉館・`verified_primary`とした。
- 草月ホールは草月公式の現行526席・アクセス・使用規定、 大岡山劇場は公式の2026年公演予定、最大70席、料金規約、アクセスを記録した。大塚ドリームシアターは運営者公式の所在地・アクセスのみ確認し`primary_partial`、大江戸温泉物語・大塚ジェルスホールは公式一次情報を確認できず`official_not_found`とした。
- 中板橋の新生館スタジオ、目黒区の中目黒GTプラザホール、ザ・ポケット、中野シアターかざあなは、運営者・自治体・劇場公式の現行案内から`verified_primary`とした。池袋西口GEKIBAと中野Vスタジオは運営者公式を確認したが現行性等が不足するため`primary_partial`、池袋小劇場と中野光座は公式一次情報を確認できず`official_not_found`とした。
- 町田市民フォーラム、調布市グリーンホール小ホール、鶴めいホール、伝承ホール、東演パラータ、東京ウィメンズプラザホール、東京芸術劇場のシアターイースト・ウエストを、自治体・指定管理者・運営者の公式案内で`verified_primary`とした。可変席のシアターイースト・ウエストは公式が示す最大数を注記付きで記録した。
- 東京芸術劇場の旧小ホール1・2は公式の現行呼称との対応を確認して`verified_primary`、南大塚ホールは指定管理者公式で改修後の利用を確認して`verified_primary`とした。徳望館は建物現存だけを公式確認して`primary_partial`、内幸町ホールは改装中のため`primary_partial`、東中野バニラスタジオとアトリエクマノ1k-1・1k-2は公式一次情報を確認できず`official_not_found`とした。
- 日暮里サニーホール、日本橋劇場、梅ヶ丘BOX、銀座博品館劇場、板橋シアター咲、板橋区立文化会館小ホール、表参道GROUNDは、自治体・指定管理者・運営者・劇場の公式案内で現行利用、収容、料金または利用条件、アクセスを確認して`verified_primary`とした。俳優座劇場は運営会社公式の閉館告知で閉館・`verified_primary`とした。公式が示す可変収容は最大値だけを注記付きで記録し、公式面積未確認の値は空欄とした。
- 武蔵野芸能劇場小劇場、文学座アトリエ、あうるすぽっと、北沢タウンホールは、指定管理者・運営者公式の2026年利用案内または公演情報で`verified_primary`とした。武蔵野公会堂は2026年4月末で貸出を終了して以降の運営が未定のため`primary_partial`、不思議地底窟 青の奇蹟、北新宿スペースアクロス、北池袋新生館シアターは公式一次情報を確認できず`official_not_found`とした。
- 本多スタジオは本多劇場グループ公式の2026年利用案内・2027年2月末までの予約受付、麻布区民センター区民ホールは港区公式の現行利用案内・定員237人・料金・申請案内で`verified_primary`とした。門仲天井ホールは両国門天ホール公式の移転経緯により、現行の両国門天ホールへの移転・改称関係として`verified_primary`とし、現行公式資料の50人・50平方メートル、料金・利用条件を注記付きで記録した。本所松坂亭劇場、麻布ディプラッツ、明石スタジオ、目黒区福祉センター、目黒食堂は、公式一次情報を確認できず`official_not_found`とした。LaSensの閉館表示・二次情報の会場記載は公式欄へ転記していない。
- 野方区民ホール、立川市市民会館小ホール、両国門天ホールは、自治体・指定管理者・運営者の公式案内で現行利用、客席、料金または利用条件、アクセスを確認して`verified_primary`とした。六行会ホール、六本木トリコロールシアターは運営者・劇場公式で現行施設を確認して`verified_primary`とし、客席等を公式確認できない空欄のままとした。遊空間がざびぃは公式候補URL本文を取得できず`blocked`、六本木・キャラメルと六本木・将軍は公式一次情報を確認できず`official_not_found`とした。
- 吉祥寺櫂スタジオは運営者公式の2026年公演レンタル案内で現行利用、最大60席、料金、申込・契約・利用条件、所在地を確認した。萬劇場は運営者公式の2026年空き日程、劇場案内、料金、アクセス、利用規定で現行利用と、舞台構成により変動する最大136席を確認した。両施設を`verified_primary`とし、開始時のpending 66件を全て公式確認状態へ移した。

## Verification

- 開始時にbranch・HEAD・基準6ファイルSHA-256・既存dirty stateを記録し、run ledger validatorを実行する。
- Wave 1後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行し、結果を追記する。
- Wave 1後の小劇場監査は errors 0、pending 58。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 2後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 50。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 3後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 42。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 4後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 34。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 5後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 26。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 6後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 18。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 7後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 10。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 8後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は errors 0、pending 2。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし、run ledger validatorは`ledger validation: OK (active)`。
- Wave 9後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`を実行した。小劇場監査は rows 594、verified_primary 387、primary_partial 96、official_not_found 68、ambiguous 19、blocked 24、pending 0、errors 0。全体監査は errors 0、既存warning 1。`git diff --check`は出力なし。
- canonical会場比較CSV4件、scope文書、監査スクリプトのSHA-256はbaselineと一致し、基準ファイルは未変更。branch、HEAD、開始時dirty stateも一致し、追加の想定外変更はない。

## Pre-existing State Preserved

- `package.json`、小劇場台帳、前run ledger、調査スクリプトは開始時点で未コミットのため、既存変更として記録し巻き戻さない。

## Unverified States

- pending 0。全594件を検証状態へ移したが、`official_not_found`、`blocked`、`ambiguous`、`primary_partial`は公式情報の不足または取得不能を表し、空欄項目を推測で補っていない。

## Blockers

- なし。

## Final Result

- Status: COMPLETE
- 対象: LaSens小劇場594件。開始時pending 66件を9波で全件分類し、pending 0。
- 検証内訳: `verified_primary` 387、`primary_partial` 96、`official_not_found` 68、`ambiguous` 19、`blocked` 24。
- 今回の変更: `data/small-theater-research.csv`と本runの`STATE.md`・`REPORT.md`のみ。既存の会場比較CSV、公開サイト、デプロイ、外部連絡は変更していない。
- 注意: `official_not_found`、`blocked`、`ambiguous`、`primary_partial`には、公式情報が不足・取得不能・関係未解決の行が残る。客席、面積、料金等は推測で補完していない。

## Morning Decisions

- 現行・閉館・改称を公式で確認できない施設は、推測せず分類して次runへ引き継ぐ。
