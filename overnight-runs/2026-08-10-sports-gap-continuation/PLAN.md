# Sports Gap Continuation Plan

## Objective

公式一次情報だけを使い、比較可能な1日相当額が不足している体育館型施設を小さなwaveで補完する。最初のwaveは秋田県のナイスアリーナ1施設に限定する。

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Writable paths: `data/price-observations.csv`, `data/budget-scenarios.csv`, 料金行に対応する最小限の`data/venue-details.csv`、検証で正規に再生成される追跡済み成果物、このrunディレクトリ
- Baseline: branch `agent/add-competition-and-small-theater-coverage`, commit `58d4411799ca814cbcb1624e4fb8586ada8ab231`
- Protected pre-existing file: `docs/RESEARCH_UPDATE_2026-08-09.md` (untracked, SHA-256 `b80f689bd2b1a5d268d385848fa2dcb8220e583189e2fa717f114bac39c74238`)

## Definition of Done

- ナイスアリーナの公式4区分を、既存午前観測と矛盾なく構造化する。
- 平日・土日祝、入場料なし・ありの参考合計を作り、秋田県体育館型カバレッジを1件以上増やす。
- audit、生成、coverage更新、validate、diff checkを通す。

## Allowed Actions

- Read project files and applicable instructions.
- 公式自治体・指定管理者ページの閲覧と数値照合。
- 上記Writable pathsの編集と、ローカル検証コマンドの実行。

## Prohibited Actions

- Do not push, deploy, publish, send external messages, purchase, or change secrets.
- Do not delete user data.
- 候補施設の追加・削除、収録規律の変更、12時間等の固定時間料金の扱い変更、重複候補の統合をしない。
- 保護対象メモを編集・移動・削除・ステージしない。

## Stop Conditions

- Record direction-changing decisions for the user.
- Stop unsafe work if the baseline changes unexpectedly.
- 別ライターの新規コミットまたは同じCSVへの予期しない変更を検出したらcanonical編集を止める。

## Team

- Coordinator: Codex単独で範囲管理・統合・報告。
- Explorer: 同じCodexが読み取り専用で公式根拠を確認。
- Writer: 同じCodexのみ。canonical dataの同時編集は行わない。
- Verifier: 同じCodexがコマンド結果と差分を再確認。サブエージェントは使わない。

## Verification

- `npm run audit`
- `npm --prefix web run data:generate`
- `npm run price-coverage:write`
- `npm run price-coverage -- --prefecture=秋田県`
- `npm run validate`
- `git diff --check`
- 前後のHEAD、status、保護メモhashを比較する。
