# Overnight Run Plan

## Objective

2026-08-01 10:00 JSTまで、LaSens小劇場データベースの全掲載行を調査キューとして固定し、各行を劇場・運営者・自治体の公式サイトまで戻って確認する。掲載中・閉館・改称・公式サイト不明を一次情報の確認状態付きで区別し、現行施設は会場ものさしの比較スキーマへ安全に追加できる状態にする。

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/venue-monosashi`
- Writable paths: 上記ディレクトリ配下のみ
- Baseline branch: `agent/add-competition-and-small-theater-coverage`
- Baseline commit: `1bebbfc030f421ed311ee60b9ba3f4fd58c54f27`
- Canonical comparison data: `data/candidate-venues.csv`、`data/venue-details.csv`、`data/price-observations.csv`、`data/venue-operations.csv`
- Discovery and verification ledger: `data/small-theater-research.csv`
- Run ledger: `overnight-runs/2026-07-31-lasens-small-theater-census/`
- Final reporting time: 2026-08-01 10:00 JST

## Definition of Done

- LaSens検索結果の全行を重複のない調査台帳へ収録し、取得日とLaSens上の掲載状態を保持する。
- 全行について公式サイトを探索し、`verified_primary`、`primary_partial`、`official_not_found`、`ambiguous`、`blocked`のいずれかへ分類して`pending`を0にする。
- LaSensの住所・キャパシティは二次索引値として分離し、会場ものさしの確定値へ転記しない。
- 公式サイトで確認できた現行施設について、名称、営業状態、客席、面積、料金、アクセス、利用条件の公開有無を記録する。
- 公式情報が十分な現行施設は、重複確認後に会場ものさしの候補・区画・料金・運用スキーマへ追加する。
- `npm run audit`と`npm run audit-small-theaters`がエラー0で完了する。
- 2026-08-01 09:15 JST以降は新規調査を止め、最終監査、状態判定、REPORT完成、台帳最終検証を行う。

## Allowed Actions

- プロジェクトファイル、適用指示、LaSens検索ページと個別ページを読み取る。
- 劇場、運営団体、自治体、指定管理者の公式Webサイト、公式PDF、料金表、図面を読み取る。
- 検索エンジンは公式サイト候補の発見に使い、確定値は公式一次情報からのみ記録する。
- `data/small-theater-research.csv`、既存会場データCSV、調査文書、監査スクリプト、STATE、REPORTを更新する。
- 重複確認、CSV監査、URL確認、SQLite再構築、Webデータ生成、lint、build、サーバー生成HTMLテストを必要に応じて実行する。

## Prohibited Actions

- push、デプロイ、公開、外部連絡、施設への問い合わせ、予約、購入、決済、アカウント変更、秘密変更を行わない。
- ユーザーデータ、既存候補、閉館記録を削除しない。
- LaSens掲載値、検索スニペット、第三者まとめを一次情報として確定欄へ転記しない。
- 確認不能値を0、推測値、近似値で埋めない。
- 検索できないことを閉館・不存在の証拠として扱わない。
- サブエージェントを起動しない。

## Stop Conditions

- 基準コミット後の対象ファイルに予期しない外部変更があれば、重なる書き込みを止めてSTATEへ記録する。
- 公式情報が見つからない行は`official_not_found`等へ分類し、推測で完了させない。
- 1件の調査が難航しても、独立した次候補を進める。
- 2026-08-01 09:15 JST以降は新規調査を停止して最終処理へ移る。
- 目的を早く達成した場合も最終処理を行い、以後は変更しない。

## Team

- Coordinator: 現在のCodexが範囲、波、停止判断、朝レポートを担当。
- Explorer: 同一Codexが読み取り専用の候補・一次情報探索を順次担当。
- Writer: 同一Codexだけが対象ファイルを更新する。
- Verifier: 同一Codexが書き込み後に監査、出典、差分を独立確認する。
- Subagents: 使用しない。ユーザーから人数・モデルの個別承認を得ていないため。

## Verification

- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-07-31-lasens-small-theater-census`
- `npm run audit-small-theaters`
- `npm run audit`
- CSVの行数、重複ID、検証状態、公式URL、観測日、数値の一次情報出典を検査する。
- 最終時にGit差分と基準ファイルハッシュを比較する。
- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-07-31-lasens-small-theater-census --final`
