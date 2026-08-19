# 小劇場台帳 CSV 統合レポート

実施日: 2026-08-19

## 統合結果

- 対応表: 369件（`new` 304 / `attach_space` 38 / `tag_only` 27）
- 追加した候補: 304件（候補総数 1,534件 → 1,838件）
- `small_theater` タグを付けた既存候補: 27件
- 追加した区画: 257件
- `small_theater` タグを付けた既存区画: 7件
- `tags=small_theater` の区画総数: 264件（うち `area_m2` または `capacity_fixed` あり 261件）
- `canonical_candidate_id` を書き戻した台帳行: 369件
- 判定が曖昧で変更しなかった件数: 0件

## 既存区画の空欄補完

仕様に従い、同一候補内で `space_name` が一致した区画について、既存値を上書きせず空欄だけを補完した。

- `DETAIL-116`: `area_m2=163.97`
- `DETAIL-7163`: `capacity_fixed=203`
- `DETAIL-8114`: `capacity_fixed=120`

## 入力欠損への対応

対応表の `new` 4件は台帳の `source_prefecture` が空欄だったため、公式ページに掲載された所在地を使って候補の都道府県・市区を確定した。台帳の既存所在地列は変更していない。

- `LASENS-2854`: 東京都渋谷区
- `LASENS-3923`: 東京都新宿区
- `LASENS-2587`: 京都府京都市
- `LASENS-3931`: 大阪府大阪市

台帳の `official_url` が HTTP の候補は、`candidate-venues.csv` の `official_url` と新規区画の `source_url` に限り、既存監査の HTTPS 必須条件に合わせて HTTPS 表記へ正規化した。台帳の元URLと `price_url` / `access_url` / `conditions_url` は変更していない。

## 既存値の保持確認

編集直前に退避した3ファイルと列単位で比較した。既存候補の既存11列は変更0件、既存区画の既存21列は上記3セルの許可された空欄補完以外の変更0件、台帳は統合対象369件の `canonical_candidate_id` 以外の変更0件だった。既存候補ID・既存区画IDの欠落も0件だった。
