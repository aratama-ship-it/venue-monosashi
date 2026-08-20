# Overnight Run Plan

## Objective

運営者情報を追加せず、会場ものさしを公開調査版として安心して共有・比較できる状態へ仕上げ、既存公開URLへ反映する。

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Writable paths: `web/app/`, `web/public/`, `web/tests/`, `web/scripts/`, `docs/`, `README.md`, `overnight-runs/2026-08-05-publication-finish/`
- Baseline: branch `agent/add-competition-and-small-theater-coverage`, commit `8b3a6c3`, tracked worktree clean
- Preserved state: existing untracked overnight-run directories, nested `web-projects/`, and `stash@{0}`

## Definition of Done

- Canonical URL、OGP、Xカード、検索向け構造化データ、共有画像が公開HTMLに含まれる。
- データ版、最終観測日、観測状態、更新履歴が画面で確認できる。
- GitHub Issuesを使った訂正提案導線があり、運営者情報は追加されていない。
- 主要フィルターをURLで共有でき、最大3会場を比較できる。
- モバイルでは絞り込みを開閉でき、主要操作に横方向のレイアウト崩れがない。
- データ監査、lint、ビルド、レンダリングテスト、ブラウザQA、公開URLの匿名確認が成功する。
- 変更を対象ファイルだけでコミットし、GitHubと既存Sites公開へ反映する。

## Allowed Actions

- Read project files and applicable instructions.
- 上記の限定パスを編集し、生成データとOGP画像を再生成する。
- 監査、lint、テスト、ビルド、ローカルプレビュー、ブラウザQAを実行する。
- 対象ファイルのみをコミットし、現在のGitHubブランチへpushする。
- 既存のChatGPT Sitesプロジェクトを公開更新し、匿名公開URLを確認する。

## Prohibited Actions

- 運営者情報を追加しない。
- 独自ドメイン、DNS、アクセス制御、秘密情報を変更しない。
- 既存の未追跡フォルダ、安全用stash、ユーザーデータを削除・変更しない。
- 外部メッセージやSNS告知を送信しない。
- 施設データの未確認値を推測で補完しない。

## Stop Conditions

- Record direction-changing decisions for the user.
- Stop unsafe work if the baseline changes unexpectedly.
- Continue other independent tasks when one task is blocked.
- 公開資格情報やプロジェクト権限が利用できない場合は、ローカル検証済みコミットまでで停止して記録する。

## Team

- Coordinator: scope, waves, integration, report
- Explorer: sequential read-only inventory and evidence
- Writer: this root task is the only writer
- Verifier: sequential clean-state tests, diff review, browser and public checks

## Verification

- `npm run audit-small-theaters`
- `npm run audit`
- `npm run web:lint`
- `npm run web:test`
- `git diff --check`
- 390px幅とデスクトップ幅のブラウザQA
- 公開URLのタイトル、canonical、OGP、主要機能、エラーログ、匿名HTTP 200確認
- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-08-05-publication-finish --final`
