# Overnight Report: 体育館・総合スポーツ施設候補の全国拡張

## Outcome

ACTIVE — wave 4完了。2026-08-06 07:00 JSTに最終化予定。

## Baseline

- Local HEAD: `5119446`
- Candidate venues: 183
- Venue details: 271
- Price observations: 390
- Venue operations: 102
- Public site: v22 / 174 candidates

## Changes

- Wave 1: 青森・岩手・宮城・秋田の4候補と4施設区画を追加（`7173a85`）。
- 候補件数の固定値に依存していたrender testを、CSVの実件数に追従する検証へ変更。
- Wave 2: 北海道・山形・福島・茨城の4候補、4施設区画、3料金、2運用観測を追加（`8c04d2d`）。
- 料金件数の固定値に依存していたrender testも、CSVの実件数に追従する検証へ変更。
- Wave 3: 栃木・群馬・埼玉・千葉の4候補、4施設区画、6料金、2運用観測を追加（`36349f1`）。
- Wave 4: 東京・神奈川・山梨・新潟の4候補、4施設区画、6料金、4運用観測を追加（`fa8248c`）。
- Wave 4では大田区総合体育館、平塚総合体育館、富士北麓公園体育館、リージョンプラザ上越を追加。上越は2026年9月1日〜2027年3月31日の大規模改修休館予定を明記。
- Current local totals: candidates 199 / details 287 / prices 405 / operations 110.
- Overnight additions from baseline: candidates +16 / details +16 / prices +15 / operations +8.

## Verification

- `npm run audit`: errors 0、既存warning 1。
- `npm run web:lint`: pass。
- `npm run web:test`: 3/3 pass。
- Active ledger validator: pass。

## Publication boundary

この夜間運転はローカル調査・実装・検証まで。push、deploy、公開は行わない。

## Pre-existing State Preserved

- 既存の未追跡overnight-runディレクトリと `web-projects/` を保持する。
- `stash@{0}: preserve-canonical-pre-integration-20260805` を保持する。
- 基準コミット以前の成果を変更理由なく巻き戻さない。

## Unverified States

- 公式ページやPDFが読めない施設は推測せず、未追加または要確認として残す。
- 47件目標は一次情報の可用性を優先し、件数のために質を下げない。

## Blockers

- None at bootstrap.

## Morning Decisions

- ローカル成果の差分確認後、push・deploy・公開を行うかはユーザー判断とする。
