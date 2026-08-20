# 小劇場一次情報・解消ラン 状態

## Status

- Status: COMPLETE
- Last updated: 2026-08-04 JST
- Current wave: 12 — 初回`primary_partial`96件の再探索・完了

## Baseline

- Branch: `agent/arena-staging-icloud`
- HEAD: `a765bd52ad03cbbce9cd9665753031d5f0a48a3f`
- 初期Git状態: ユーザー由来の未追跡 `node_modules/` のみ。変更・追加・削除しない。
- SHA-256:
  - `data/small-theater-research.csv`: `6af320addac35bb906a93e5e0569e826f3c7ca6d73026d9bd116d6146b483bf1`
  - `data/candidate-venues.csv`: `835d065fe4d71c5c6218dff56c83cc0f4fdd210de58b3b3f050e5a2149ef346a`
  - `data/venue-details.csv`: `b5fcd662ad461f19092a229fb4b54c0190a468c4c7a7cf76f5d7ea11a7ca14c1`
  - `data/price-observations.csv`: `61db215319520618b96ae9b39be0d5a0381c4c19f2c07e27b140f8b120b7e32a`
  - `data/venue-operations.csv`: `cf87d2167b99111498d751dada70e8b9820069a8a8032166f6b5b766b10b8f30`
- 台帳初期集計: 594件、`verified_primary=387`、`primary_partial=96`、`official_not_found=68`、`ambiguous=19`、`blocked=24`、`pending=0`。

## Completed Waves

- Wave 0 — 解消ランの対象、権限、基準、停止条件を固定。初回594件スイープは `pending=0` で終わっており、本ランは残る根拠不足行の再確認に限定する。
- Wave 1 — LASENS-272, 2374, 2422, 2424, 3930, 2472, 2474, 3525を公式サイト・公式PDFで再確認。7件を`verified_primary`へ、La MaMa Odakaは同住所の現行Rain Theatreと旧名称の関係を公式で解けないため`ambiguous`へ再分類。確認不能な客席・面積・貸館料金は空欄のまま保持。
- Wave 1 verification — `npm run audit-small-theaters` は594件、`verified_primary=394`、`primary_partial=88`、`official_not_found=68`、`ambiguous=20`、`blocked=24`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`とラン台帳検証も通過。
- Wave 2 — LASENS-269, 2468, 3444, 2818, 3614, 2893, 2794, 221を公式サイト・公式PDFで再確認。スタジオイマイチ、アトリエPentA、cube garden、えずこホール平土間ホールを`verified_primary`へ、B Club Studioを`blocked`へ、abc会館ホールを`official_not_found`へ再分類。G/PITとThéâtre de Bellevilleは公式サイトを確認したが、現行性を示す日付または必要な公開情報が不足するため`primary_partial`として保持した。
- Wave 2 verification — `npm run audit-small-theaters` は594件、`verified_primary=398`、`primary_partial=82`、`official_not_found=69`、`ambiguous=20`、`blocked=25`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 3 — LASENS-622, 2434, 2444, 3923, 505, 3440, 227, 2573を公式サイト・公式PDFで再確認。新利賀山房、アトリエPentA、ジグスタ、Studio Labo.、渡辺源四郎商店しんまち本店2階稽古場、両国・エアースタジオ、スペース・オルタを`verified_primary`へ更新。シアターウルは公式本文の取得不能と現行性不足のため`primary_partial`として保持した。
- Wave 3 verification — `npm run audit-small-theaters` は594件、`verified_primary=405`、`primary_partial=75`、`official_not_found=69`、`ambiguous=20`、`blocked=25`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 4 — LASENS-619, 262, 3436, 508, 676, 495, 461, 3537を公式サイト・公式PDFで再確認。アトリエ阿呆船、小劇場そぞろ座、旧スペース・イサン（現SPACE LFAN）、町劇Akashiを`verified_primary`へ更新。創造交流館練習ホールとOVAL THEATERは同一施設・改称関係を公式で解けないため`ambiguous`へ再分類。スタジオVARIEとatelier SENTIOは公式情報が不足するため`primary_partial`として保持した。
- Wave 4 verification — `npm run audit-small-theaters` は594件、`verified_primary=409`、`primary_partial=69`、`official_not_found=69`、`ambiguous=22`、`blocked=25`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 5 — LASENS-3415, 551, 380, 273, 2891, 274, 391, 4361を公式サイト・公式PDFで再確認。円頓寺Les Piliers、京都大学西部講堂、旭川銀座小劇場シアターロビンを`verified_primary`へ、テアトルはこざき、マルチスペース・エフ、Broader House、メディアMIXホールを`official_not_found`へ、Brick-oneを`blocked`へ再分類した。
- Wave 5 verification — `npm run audit-small-theaters` は594件、`verified_primary=412`、`primary_partial=61`、`official_not_found=73`、`ambiguous=22`、`blocked=26`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 6 — LASENS-2530, 331, 288, 537, 289, 3564, 3394, 599を公式サイト・公式PDFで再確認。DDD青山クロスシアター、長者スタジオを`verified_primary`へ、シアターぷらっつ江坂、from scratch、よしもとrise-1シアターを`official_not_found`へ、Duo Stage BBsを`blocked`へ、East Gallary(BF)を`ambiguous`へ再分類した。川崎H&Bシアターは運営団体の近年活動は確認できたが施設自体の現行性を示す一次情報が不足し、`primary_partial`として再実施済み記録を残した。
- Wave 6 verification — `npm run audit-small-theaters` は594件、`verified_primary=414`、`primary_partial=54`、`official_not_found=76`、`ambiguous=23`、`blocked=27`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`とラン台帳検証も通過。
- Wave 7 — LASENS-314, 554, 473, 2020, 441, 443, 455, 394を公式サイト・公式PDFで再確認。浄土宗應典院 本堂、plan-B、RAFTを`verified_primary`へ、劇場マジックランプ、精華小劇場、pit北／区域を`official_not_found`へ再分類した。ONE'S STUDIOと未知座小劇場は現行の施設利用を示す公式情報が不足し、`primary_partial`として再実施済み記録を残した。pit北／区域については二次情報のCoRich URL・名称・閉館判定を公式欄から除外した。
- Wave 7 verification — `npm run audit-small-theaters` は594件、`verified_primary=417`、`primary_partial=48`、`official_not_found=79`、`ambiguous=23`、`blocked=27`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 8 — LASENS-4012, 3801, 4367, 661, 602, 353, 256, 258を公式サイト・公式PDFで再確認。studio杭、TB STUDIO、アトリエだるま座を`verified_primary`へ、WAREHOUSE702、Za Hall、アートシアターかもめ座、アスピアホールを`official_not_found`へ再分類した。Studio青猫は現行運営を確認できる公式情報が不足し、`primary_partial`として再実施済み記録を残した。
- Wave 8 verification — `npm run audit-small-theaters` は594件、`verified_primary=420`、`primary_partial=41`、`official_not_found=83`、`ambiguous=23`、`blocked=27`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 9 — LASENS-259, 260, 243, 2359, 220, 1992, 650, 466を公式サイト・公式PDFで再確認。アトリエヘリコプター、阿佐ヶ谷アルシェ、エリア543を`verified_primary`へ、カフェテアトロ2つの部屋を`official_not_found`へ、サイスタジオ大山・第一スタジオを`ambiguous`へ再分類した。アトリエ無現、こった創作空間、ザ☆キッチンNAKANOは現行利用を示す公式情報が不足し、`primary_partial`として再実施済み記録を残した。
- Wave 9 verification — `npm run audit-small-theaters` は594件、`verified_primary=423`、`primary_partial=36`、`official_not_found=84`、`ambiguous=24`、`blocked=27`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 10 — LASENS-563, 1728, 524, 534, 486, 237, 3513, 683を公式サイトで再確認。シアター代官山、シアターΧ、しもきた空間リバティの後継サンガイノリバティを`verified_primary`へ、タイニイアリスを`official_not_found`へ、宇宙館を`blocked`へ再分類した。シアター・バビロンの流れのほとりにて、プロセニアム、スターダストは現行利用を示す一次情報が不足するため`primary_partial`として再実施済みに記録した。
- Wave 10 verification — `npm run audit-small-theaters` は594件、`verified_primary=426`、`primary_partial=31`、`official_not_found=85`、`ambiguous=24`、`blocked=28`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 11 — LASENS-248, 320, 315, 639, 630, 626, 3504, 346を公式サイト・公式PDFで再確認。高田馬場ラビネスト、上智大学1号館講堂（通称：上智小劇場）を`verified_primary`へ、銀座みゆき館、劇場バイタス、原宿リトルモア地下、戸野廣浩司記念劇場を`official_not_found`へ再分類した。荻窪小劇場と四谷3丁目ドリームシアターは現行利用を示す一次情報が不足するため`primary_partial`として再実施済みに記録した。
- Wave 11 verification — `npm run audit-small-theaters` は594件、`verified_primary=428`、`primary_partial=25`、`official_not_found=89`、`ambiguous=24`、`blocked=28`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。
- Wave 12 — LASENS-4132, 555, 2532, 310, 701, 424, 572, 407を公式サイト・公式PDFで再確認。水性、早稲田クローバースタジオ、池袋西口GEKIBA、内幸町ホール、武蔵野公会堂を`verified_primary`へ更新。大塚ドリームシアター、中野Vスタジオ、徳望館小劇場は現行利用を示す一次情報が不足するため`primary_partial`として再実施済みに記録した。
- Wave 12 verification — `npm run audit-small-theaters` は594件、`verified_primary=433`、`primary_partial=20`、`official_not_found=89`、`ambiguous=24`、`blocked=28`、`pending=0`、errors=0。`npm run audit`はerrors=0（既存のheld/planned履歴1件のwarningのみ）、`git diff --check`も通過。

## Current Wave

- Wave 12完了。初回`primary_partial`96件をすべて再探索済み。8件中5件を`verified_primary`へ更新し、大塚ドリームシアター、中野Vスタジオ、徳望館小劇場は根拠不足の`primary_partial`として当日再実施済みに記録した。最終の`primary_partial=20`は未探索ではなく、現行性または必要項目を公式一次情報で確認できない再確認済み行。

## Next Action

- 完了。最終監査・基準比較・`validate_run.py --final`を実行し、heartbeat automationを停止する。

## Blockers

- なし。初回`primary_partial`96件の再探索が完了したため、heartbeat automation（ID: `automation`）は停止対象。
