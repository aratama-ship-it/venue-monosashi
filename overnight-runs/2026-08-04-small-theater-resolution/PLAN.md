# 小劇場一次情報・解消ラン計画

## Objective

LaSens由来の594件の小劇場台帳について、初回スイープ後に残った `primary_partial` 96件を優先して公式一次情報で補完または終端再分類し、`official_not_found`・`ambiguous`・`blocked` も再確認する。確認不能値を推測で埋めず、公開情報の根拠を増やす。

## Scope

- 作業ディレクトリ: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi/web-projects/monosashi/venue-monosashi-arena-staging`
- 書込み対象: `data/small-theater-research.csv` と本ランの `overnight-runs/2026-08-04-small-theater-resolution/`
- 読み取り専用: 既存の会場比較CSV、生成データ、公開設定
- 基準: `a765bd52ad03cbbce9cd9665753031d5f0a48a3f`、初期台帳594件、`pending=0`、`verified_primary=387`、`primary_partial=96`、`official_not_found=68`、`ambiguous=19`、`blocked=24`

## Definition of Done

- 594件全てについて、公式一次情報が得られた範囲を記録するか、根拠のある終端状態を記録する。
- `primary_partial` の各行を少なくとも一度再探索し、補完・`verified_primary`・他の終端状態のいずれかへ更新する。
- `npm run audit-small-theaters`、`npm run audit`、`git diff --check` がエラー0。

## Allowed Actions

- 公式の劇場、運営団体、自治体、指定管理者サイトおよび公式PDFを一次情報として閲覧する。
- 各波につき最大8件の台帳行を更新する。
- 公式URL、名称、現行状態、客席、面積、料金・アクセス・利用条件URL、確認日だけを公開確認できた範囲で記録する。

## Prohibited Actions

- push、デプロイ、公開、外部連絡、問い合わせ、予約、購入、秘密変更は行わない。
- LaSensや検索結果スニペット、まとめサイトの値を公式欄へ転記しない。
- 推測で閉館・客席数・料金・面積を確定しない。
- `data/candidate-venues.csv`、`data/venue-details.csv`、`data/price-observations.csv`、`data/venue-operations.csv` を編集しない。
- ユーザー由来の未追跡 `node_modules/` を変更・追加・削除しない。

## Stop Conditions

- 基準ファイルまたはGit状態に前波で記録されていない変更が現れた場合は、台帳書込みを止めてSTATEへ記録する。
- 公式情報を取得不能な場合は `blocked` 等で根拠を残し、推測で埋めない。
- 全96件の再探索が終わった時点で全監査と最終レポートへ移る。

## Team

- Coordinator/Writer/Verifier: このスレッドの単一作業者。台帳への書込みは常に1者のみ。

## Verification

- `node scripts/small-theater-research.mjs next --limit 8`
- `npm run audit-small-theaters`
- `npm run audit`
- `git diff --check`
- 最終時: `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-08-04-small-theater-resolution --final`
