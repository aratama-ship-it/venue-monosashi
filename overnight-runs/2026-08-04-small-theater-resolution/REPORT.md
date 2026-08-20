# 小劇場一次情報・解消ラン レポート

## Outcome

- 完了。初回594件スイープ後に`primary_partial`だった96件をすべて公式一次情報で再探索した。最終集計は`verified_primary=433`、`primary_partial=20`、`official_not_found=89`、`ambiguous=24`、`blocked=28`、`pending=0`。残る`primary_partial`20件は再探索済みだが、公式の現行性または必要項目が不足する行である。

## Changes

- 本ランのPLAN、STATE、REPORTを作成。
- LASENS-272〜3525の8件を再確認し、7件を`verified_primary`、1件を`ambiguous`へ更新。公式URL、現行性、利用・料金・アクセスURLを公開確認できた範囲だけ補完した。
- LASENS-269〜221の8件を再確認し、4件を`verified_primary`、1件を`blocked`、1件を`official_not_found`へ更新。G/PITとThéâtre de Bellevilleは、公式情報は確認できたものの現行性または必要項目が不足するため`primary_partial`のまま再実施済みとして記録した。
- LASENS-622〜2573の8件を再確認し、7件を`verified_primary`へ更新。シアターウルは公式URLを確認できるものの、本文取得不能と現行性不足のため`primary_partial`のまま再実施済みとして記録した。Studio Labo.は運営者公式サイトの閉館告知により`closed`として確認した。
- LASENS-619〜3537の8件を再確認し、4件を`verified_primary`、2件を`ambiguous`へ更新。スタジオVARIEとatelier SENTIOは公式情報不足のため`primary_partial`のまま再実施済みとして記録した。旧スペース・イサンはSPACE LFANへの改称後の現行利用を確認した。
- LASENS-3415〜4361の8件を再確認し、3件を`verified_primary`、4件を`official_not_found`、1件を`blocked`へ更新。取得できない公式本文や現行の施設公式ページがない場合は、客席・面積・料金を推測せず空欄のまま保持した。
- LASENS-2530〜599の8件を再確認し、2件を`verified_primary`、3件を`official_not_found`、1件を`blocked`、1件を`ambiguous`へ更新。川崎H&Bシアターは運営団体の近年活動だけでは施設自体の現行性を確認できないため、`primary_partial`のまま当日再実施済みとして記録した。
- LASENS-314〜394の8件を再確認し、3件を`verified_primary`、3件を`official_not_found`へ更新。ONE'S STUDIOと未知座小劇場は公式の現行利用情報が不足するため、`primary_partial`のまま当日再実施済みとして記録した。pit北／区域は二次サイトだったCoRichのURL・名称・閉館判定を公式欄から除外した。
- LASENS-4012〜258の8件を再確認し、3件を`verified_primary`、4件を`official_not_found`へ更新。Studio青猫は公式の現行運営情報が不足するため、`primary_partial`のまま当日再実施済みとして記録した。
- LASENS-259〜466の8件を再確認し、3件を`verified_primary`、1件を`official_not_found`、1件を`ambiguous`へ更新。アトリエ無現、こった創作空間、ザ☆キッチンNAKANOは公式の現行利用情報が不足するため、`primary_partial`のまま当日再実施済みとして記録した。
- LASENS-563〜683の8件を再確認し、3件を`verified_primary`、1件を`official_not_found`、1件を`blocked`へ更新。シアター・バビロンの流れのほとりにて、プロセニアム、スターダストは公式の現行利用情報が不足するため、`primary_partial`のまま当日再実施済みとして記録した。しもきた空間リバティは運営者公式が後継サンガイノリバティを明記するが、旧館の閉館日・明示的改称は確認できないため状態を`unknown`のまま保持した。
- LASENS-248〜346の8件を再確認し、2件を`verified_primary`、4件を`official_not_found`へ更新。荻窪小劇場と四谷3丁目ドリームシアターは公式の現行利用情報が不足するため、`primary_partial`のまま当日再実施済みとして記録した。
- LASENS-4132〜407の8件を再確認し、5件を`verified_primary`へ更新。大塚ドリームシアター、中野Vスタジオ、徳望館小劇場は公式の現行利用情報が不足するため、`primary_partial`のまま当日再実施済みとして記録した。
- 2026-08-05 12:15 JSTまでの同一スレッドheartbeatを設定。各回は1波のみ、台帳以外のデータと公開設定は読み取り専用とした。

## Verification

- 開始前監査: `npm run audit-small-theaters` は594件・`pending=0`・errors=0。
- 本ランの基準ファイルSHA-256をSTATEへ記録。
- Wave 1後: `npm run audit-small-theaters` errors=0、`npm run audit` errors=0（既存warning 1件）、`git diff --check`、`validate_run.py` active validationが通過。
- Wave 2後: `npm run audit-small-theaters` は`verified_primary=398`、`primary_partial=82`、`official_not_found=69`、`ambiguous=20`、`blocked=25`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 3後: `npm run audit-small-theaters` は`verified_primary=405`、`primary_partial=75`、`official_not_found=69`、`ambiguous=20`、`blocked=25`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 4後: `npm run audit-small-theaters` は`verified_primary=409`、`primary_partial=69`、`official_not_found=69`、`ambiguous=22`、`blocked=25`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 5後: `npm run audit-small-theaters` は`verified_primary=412`、`primary_partial=61`、`official_not_found=73`、`ambiguous=22`、`blocked=26`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 6後: `npm run audit-small-theaters` は`verified_primary=414`、`primary_partial=54`、`official_not_found=76`、`ambiguous=23`、`blocked=27`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`、`validate_run.py` active validationが通過。
- Wave 7後: `npm run audit-small-theaters` は`verified_primary=417`、`primary_partial=48`、`official_not_found=79`、`ambiguous=23`、`blocked=27`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 8後: `npm run audit-small-theaters` は`verified_primary=420`、`primary_partial=41`、`official_not_found=83`、`ambiguous=23`、`blocked=27`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 9後: `npm run audit-small-theaters` は`verified_primary=423`、`primary_partial=36`、`official_not_found=84`、`ambiguous=24`、`blocked=27`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 10後: `npm run audit-small-theaters` は`verified_primary=426`、`primary_partial=31`、`official_not_found=85`、`ambiguous=24`、`blocked=28`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 11後: `npm run audit-small-theaters` は`verified_primary=428`、`primary_partial=25`、`official_not_found=89`、`ambiguous=24`、`blocked=28`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。
- Wave 12／最終前: `npm run audit-small-theaters` は`verified_primary=433`、`primary_partial=20`、`official_not_found=89`、`ambiguous=24`、`blocked=28`、`pending=0`、errors=0。`npm run audit` errors=0（既存warning 1件）、`git diff --check`が通過。未再実施行は0件。

## Pre-existing State Preserved

- 未追跡の `node_modules/` はユーザー由来として保持し、変更しない。

## Unverified States

- 残る`primary_partial`20件は、初回と本ランの両方で現行性または必要項目を一次情報で確認できなかった。推測による補完は行っていない。
- 公開・デプロイは本ランの範囲外。

## Blockers

- なし。外部公開・デプロイは本ランの範囲外として未実施。

## Morning Decisions

- なし。残る20件は、将来の公式更新を待って再確認する場合のみ対象とする。
