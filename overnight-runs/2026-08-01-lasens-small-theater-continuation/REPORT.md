# Morning Report

## Outcome

- 停止時刻までに、前runで残ったLaSens小劇場106件のうち40件を一次情報で確認し、`pending`を66件まで減らした。現行・閉館・不明を推測せず分類し、今回のrunは時間上限のため`PARTIAL`で確定した。

## Changes

- 継続調査用run ledgerを作成した。
- `data/small-theater-research.csv`の8行を更新した。小劇場B1・小劇場楽園は本田劇場グループの公式利用案内・料金・アクセス、上野ストアハウスは公式設備・利用規約・料金・アクセス、新宿ゴールデン街劇場は公式閉館告知・料金・アクセスを出典とする。
- 上智小劇場は上智大学の現行記事に基づき通称と用途のみを記録した。新井薬師 SPECIAL COLORSは東京都の公式施設PDFと公式ドメインの名前解決不能を記録し、シアター・ミラクルと新宿サニーサイドシアターは公式運営情報を確認できなかった。二次索引の数値や閉館表示は公式欄へ転記していない。
- 新宿眼科画廊スペース地下は公式レンタル・料金表・地図・利用規約、新宿村LIVEは公式劇場概要・料金・予約案内、新宿文化センター小ホールは指定管理者の公式施設利用ガイド・2025年施設ガイドPDF、森下スタジオCスタジオはセゾン文化財団公式、森下文化センター第1レクホールは江東区文化コミュニティ財団公式を出典として更新した。
- 新宿新生館・新宿白萩ホールは公式運営情報を確認できず`official_not_found`、新宿村ライブ（2014年2月以前）は現行施設との公式な改称・移転関係を解けず`ambiguous`とした。いずれもLaSensの閉館表示・客席値を公式欄へ転記していない。
- KAAT神奈川芸術劇場 大スタジオはKAAT公式の施設案内・料金・アクセス・利用案内から、客席220席、面積405㎡を記録した。成城ホール（砧区民会館）は世田谷区公式の施設案内・料金表から定員397人、料金・利用条件・所在地を記録した。水性は公式の公演予定・アクセス・問い合わせから現行利用と利用相談条件だけを記録し、客席数・面積・会場利用料金は空欄のままとした。
- 神楽坂die pratze・神保町花月・西荻WENZスタジオは公式運営情報を確認できず`official_not_found`、人形町劇場 rabbit・晴れたら空に豆まいては公式サイトの取得制限により`blocked`とした。LaSensの閉館表示・客席値、検索スニペットは公式欄へ転記していない。
- 西東京市民会館は西東京市公式に基づき2019年3月31日閉館、青山円形劇場は東京都公式に基づき2015年閉館として記録した。赤羽会館小ホールは指定管理者公式の2025年4月改定料金表に基づき面積138㎡・定員87人（椅子のみ135人）、赤坂RED/THEATERは公式座席表に基づき基本舞台176席とし、どちらも料金・アクセス・利用条件URLを記録した。
- 青年座劇場は劇団公式の新拠点と旧劇場の公式な連続性を解けず`ambiguous`、西新宿成子坂劇場（TJPスタジオ）・石神井舞台は公式一次情報を確認できず`official_not_found`、赤坂CHANCEシアターは公式ドメインの本文取得・名前解決不能のため`blocked`とした。二次索引・予約仲介の値は公式欄へ転記していない。
- 千本桜ホール、浅草花劇場、浅草九劇、全電通ホール、こくみん共済 coop ホール／スペース・ゼロ、早稲田小劇場どらま館は、公式ページまたは公式PDFに到達し、公開確認できた客席・面積・料金・利用条件だけを記録した。前進座劇場は公式の現行・閉館・改称根拠を確認できず`official_not_found`、早稲田クローバースタジオは公式ページに施設名・問い合わせ導線はあるが現行状況と比較項目を十分確認できず、状態`unknown`・`primary_partial`とした。確認不能値は空欄のままとし、LaSensの客席・閉館表示を採用していない。

## Verification

- 開始時に`npm run audit-small-theaters`、`npm run audit`、run ledger validator、branch・HEAD・基準6ファイルSHA-256の比較を実行した。
- Wave 1後に`npm run audit-small-theaters`（errors 0、pending 98）、`npm run audit`（errors 0、既存warning 1）、`git diff --check`を実行した。
- Wave 2後に`npm run audit-small-theaters`（errors 0、pending 90）、`npm run audit`（errors 0、既存warning 1）、`git diff --check`を実行した。
- Wave 3後に`npm run audit-small-theaters`（errors 0、pending 82）、`npm run audit`（errors 0、既存warning 1）、`git diff --check`を実行した。
- Wave 4後に`npm run audit-small-theaters`（errors 0、pending 74）、`npm run audit`（errors 0、既存warning 1）、`git diff --check`を実行した。
- 最終Wave 5後に`npm run audit-small-theaters`、`npm run audit`、`git diff --check`、final run validatorを実行した（結果は下記の最終監査に記録）。

## Pre-existing State Preserved

- `package.json`、調査台帳、前run ledger、調査スクリプトは開始時点で未コミットのため、既存変更として記録し巻き戻さない。
- 既存会場比較CSVは読み取り専用で扱う。

## Unverified States

- `pending` 66件はLaSensの二次索引値だけを保持しており、状態、客席、料金、アクセス等を公式値として扱えない。
- 既確認の`primary_partial`、`official_not_found`、`ambiguous`、`blocked`は、このrunの主対象ではなく既存状態として保持する。

## Final Audit

- `npm run audit-small-theaters`: rows 594、verified_primary 345、primary_partial 90、official_not_found 51、ambiguous 19、blocked 23、pending 66、errors 0。
- `npm run audit`: errors 0。warnings 1は既存の`historical-events.csv`の会場名未記録行であり、このrunでは変更していない。
- `git diff --check`: 出力なし。baselineのbranch・HEADと6基準ファイルSHA-256は一致し、台帳以外の想定外変更はない。final validator: `ledger validation: OK (final)`。

## Blockers

- 時間上限によりpending 66件をこのrunで一次確認できなかった。未確認を推測で補完せず、次runへ引き継ぐ。

## Morning Decisions

- 残り66件を次runへ継続する。現行・閉館・改称の公式根拠が弱い施設を先に処理し、既存の会場比較CSVへ追加する判断は別途行う。
