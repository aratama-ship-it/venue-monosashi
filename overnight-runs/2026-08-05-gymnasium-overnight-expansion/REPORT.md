# Overnight Report: 体育館・総合スポーツ施設候補の全国拡張

## Outcome

ACTIVE — wave 7完了。2026-08-06 07:00 JSTに最終化予定。

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
- Wave 5: 富山・石川・福井・長野の4候補、4施設区画、7料金、4運用観測を追加（`27e958d`）。
- Wave 5では高岡市竹平記念体育館、金沢市総合体育館、福井市体育館、ことぶきアリーナ千曲を追加。高岡・福井の料金PDFはページ画像でも目視照合し、古い施行日の料金表は再確認注意を明記。
- Wave 6: 岐阜・静岡・愛知・三重の4候補、4施設区画、6料金、4運用観測を追加（`256054a`）。
- Wave 6では大垣市総合体育館、香陵アリーナ、豊橋市総合体育館、相好アリーナ四日市を追加。香陵・豊橋・四日市の料金PDFを目視照合し、大垣は公開表が2019年改正版のため料金観測を保留した。
- Wave 7: 滋賀・京都・大阪・兵庫の4候補、4施設区画、8料金、4運用観測を追加（`8cb8e3d`）。
- Wave 7ではプロシードアリーナHIKONE、にっしんでんきアリーナ京都、東大阪アリーナ、ヴィクトリーナ・ウインク体育館を追加。彦根・京都の料金PDFを目視照合し、京都の現行ネーミングライツ名、東大阪の2026年12月予約システム移行、姫路の2027年1月〜2028年12月大規模改修予定を明記した。
- Current local totals: candidates 211 / details 299 / prices 426 / operations 122.
- Overnight additions from baseline: candidates +28 / details +28 / prices +36 / operations +20.

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
