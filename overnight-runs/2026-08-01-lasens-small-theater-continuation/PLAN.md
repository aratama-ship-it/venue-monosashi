# Overnight Run Plan

## Objective

2026-08-02 09:15 JSTまで、前runで`pending`として残したLaSens小劇場106件を、劇場・運営者・自治体・指定管理者の公式サイトまたは公式PDFへ戻って確認する。各行を`verified_primary`、`primary_partial`、`official_not_found`、`ambiguous`、`blocked`のいずれかに分類し、確認できた現行施設の比較項目を出典付きで台帳へ記録する。

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/venue-monosashi`
- Writable paths: `data/small-theater-research.csv`、`overnight-runs/2026-08-01-lasens-small-theater-continuation/` のみ
- Baseline branch: `agent/add-competition-and-small-theater-coverage`
- Baseline commit: `1bebbfc030f421ed311ee60b9ba3f4fd58c54f27`
- Baseline pending: 106 of 594 rows
- Canonical comparison data: `data/candidate-venues.csv`、`data/venue-details.csv`、`data/price-observations.csv`、`data/venue-operations.csv` は読み取り専用
- Previous-run ledger: `overnight-runs/2026-07-31-lasens-small-theater-census/`
- Final reporting time: 2026-08-02 09:15 JST

## Definition of Done

- `pending` 106件を公式一次情報の確認状態へ移す、または停止時刻までの確認済み進捗を`PARTIAL`として確定する。
- LaSensの二次索引値を公式欄へ転記せず、確認できた公式URL、名称、状態、客席、面積、料金、アクセス、利用条件だけを記録する。
- `npm run audit-small-theaters`と`npm run audit`がエラー0で完了する。
- 停止時刻以降に新規調査を行わず、STATE、REPORT、最終validatorを完了する。

## Allowed Actions

- プロジェクトファイル、適用指示、LaSens検索ページを読み取る。
- 劇場、運営団体、自治体、指定管理者の公式サイト、公式PDF、料金表、図面を読み取る。
- 検索エンジンは公式サイト候補の発見に使い、確定値は公式一次情報からのみ記録する。
- `data/small-theater-research.csv`とこのrun ledgerを更新する。
- 重複確認、CSV監査、URL確認、必要最小限のデータ生成・lint・build・HTMLテストを実行する。

## Prohibited Actions

- push、デプロイ、公開、外部連絡、施設への問い合わせ、予約、購入、決済、アカウント変更、秘密変更を行わない。
- ユーザーデータ、既存候補、閉館記録を削除しない。
- LaSens掲載値、検索スニペット、第三者まとめを一次情報として確定欄へ転記しない。
- 確認不能値を0、推測値、近似値で埋めない。
- 検索できないことを閉館・不存在の証拠として扱わない。
- サブエージェントを起動しない。

## Stop Conditions

- 開始時に記録したbranch、HEAD、基準6ファイルのSHA-256、既存dirty paths以外の予期しない変更を検知した場合は、重なる書き込みを停止してSTATEへ記録する。
- 公式情報が見つからない行は`official_not_found`等へ分類し、推測で完了させない。
- 1件の調査が難航しても、独立した次候補を進める。
- 2026-08-02 09:15 JST以降は新規調査を停止して最終処理へ移る。

## Team

- Coordinator: 現在のCodexが範囲、波、停止判断、朝レポートを担当する。
- Explorer: 同一Codexが読み取り専用の候補・一次情報探索を順次担当する。
- Writer: 同一Codexだけが台帳とrun ledgerを更新する。
- Verifier: 同一Codexが書き込み後に監査、出典、差分を独立確認する。
- Subagents: 使用しない。ユーザーから人数・モデルの個別承認を得ていない。

## Verification

- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-08-01-lasens-small-theater-continuation`
- `npm run audit-small-theaters`
- `npm run audit`
- CSVの行数、重複ID、検証状態、公式URL、観測日、数値の一次情報出典を検査する。
- 最終時にGit差分と基準ファイルSHA-256を比較し、`validate_run.py ... --final`を実行する。
