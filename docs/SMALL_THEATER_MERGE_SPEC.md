# 小劇場台帳の候補データ統合 仕様

決定日: 2026-08-19 / 決定者: 本人 / 起案・検証: Claude

## 決定事項

小劇場を独立サイトにせず、`small-theater-research.csv` の内容を会場ものさしの候補データへ統合し、
小劇場は**分類タグ**として保持する。画面下部の独立「小劇場台帳」セクションは廃止する。

## 統合対象の確定

`small-theater-research.csv` 594件のうち、次の条件を満たす **369件** のみを統合する。

- `verification_status = verified_primary`（433件）
- かつ `official_status ∈ {current, renamed}`（閉館63件・不明1件を除外）

統合しない225件（`primary_partial` 20 / `official_not_found` 89 / `blocked` 28 / `ambiguous` 24 /
閉館・不明64）は、CSVに残すがWeb公開データには載せない。閉館63件は過去大会台帳との照合で
価値があるため削除しない。

## 統合対象369件の内訳（機械分類＋目視判定）

| 分類 | 件数 | 扱い |
|---|---|---|
| new（既存候補に無い） | 304 | 新規 `candidate_id` を発番して追加 |
| room_of（既存候補の中の一区画） | 38 | **新規IDを作らない。** 既存候補に区画行を追加 |
| same / parent_of（同一施設・表記差） | 27 | 既存候補にタグ付与のみ |

数値の充足（369件中）: 収容268 / 面積92 / 料金URL305 / 収容も面積も無し84。

### 目視判定した8件（ドメイン一致だが名称が繋がらないもの）

いずれも既存候補の中の一区画と確認し `room_of` とした。

| source_id | 台帳側 | 既存候補 |
|---|---|---|
| LASENS-3300 | 新江州シアター（小劇場） | CAND-1125 滋賀県立文化産業交流会館 |
| LASENS-3502 | スタジオB | CAND-1069 山口情報芸術センター［YCAM］ |
| LASENS-228 | あじびホール | CAND-1521 福岡アジア美術館 |
| LASENS-669 | イズミティ21 小ホール | CAND-1097 仙台銀行ホール イズミティ21 |
| LASENS-545 | シアタートラム | CAND-1262 世田谷パブリックシアター |
| LASENS-516 | パルテノン多摩 小ホール | CAND-1269 パルテノン多摩 |
| LASENS-377 | 深川江戸資料館 小劇場 | CAND-1399 江東区深川江戸資料館 |
| LASENS-2555 | 小劇場 THEATER NEST | CAND-074 東温アートヴィレッジセンター THEATER NEST |

ドメイン一致だけで結ぶと、同一財団・同一指定管理者の別施設を誤結合する（例: 富山県民小劇場ORBISが
富山県民会館・富山県教育文化会館と同一ドメイン）。**ドメイン一致は候補出しにのみ使い、
確定は名称関係と公式ページの記載で行う。**

## データモデル変更

### 1. タグは施設と区画の両方に持つ

`candidate-venues.csv` に2列追加:

- `tags`: パイプ区切り。今回は `small_theater`
- `source_index`: 発見元。今回は `lasens`（一次情報は各施設の公式サイト）

`venue-details.csv` に1列追加:

- `tags`: 同上

**理由**: 「彩の国さいたま芸術劇場 小ホール」「アクロス福岡 円形ホール」のように、施設は大箱で
小劇場なのは中の一区画である例が38件ある。施設レベルにだけタグを付けると
「彩の国さいたま芸術劇場＝小劇場」という誤りになる。単独の小劇場（THEATRE E9 KYOTO等）は
施設・区画の両方にタグが付く。検索の小劇場フィルタは**区画タグを優先**する。

### 2. 数値は区画行として入れる

収容または面積がある285件は `venue-details.csv` に区画を1行追加する。

- `space_type = theater`、`tags = small_theater`
- `capacity_fixed = official_capacity`、`area_m2 = official_area_m2`
- `source_url = official_url`、`observed_at = official_observed_at`、`verification_status = verified`
- 無い値は0や推測で埋めず空欄

収容も面積も無い84件は区画行を作らない。結果として面積・収容の絞り込みでは出てこない。これは正しい挙動。

### 3. 料金URLは料金観測にしない

`price-observations.csv` は金額必須の観測テーブルであり、URLだけの305件を入れると
「料金観測2,881件」の意味が壊れる。`venue-websites.csv` に `note=料金表` で登録し、
カードからリンクできるが**予算フィルタの対象にはしない**。

### 4. 情報量を可視化する（必須）

候補に `evidence_tier` を持たせる。

- `detailed`: 区画・料金観測を持つ既存候補水準
- `ledger_only`: 台帳由来で料金金額が未構造化

UI要件:

- カードに「台帳のみ・料金未確認」バッジを出す
- **面積・料金・天井で絞ったとき「この条件では台帳のみの◯件が対象外」と件数を明示する**

これが無いと、条件を絞った瞬間に台帳由来の候補が理由の説明なく消える。「条件と根拠で比べる」という
シリーズの前提が最も壊れやすい箇所であり、統合の必須条件とする。

### 5. 相互参照

`small-theater-research.csv` の既存列 `canonical_candidate_id` に、統合先の `candidate_id` を書き戻す。
台帳と候補が1対1で追える状態を保つ。

### 6. プリセットと台帳セクション

- 「小劇場型」プリセットを `会場タイプ＋150席以下` 起点から `tags=small_theater` 起点へ変更
- 画面下部の小劇場台帳セクション、および `small-theater-ledger.json` / `small-theater-research.csv` の
  公開アセット配信を廃止（`generate-data.mjs` の `smallTheaterCensus` と
  `venue-search.tsx` の該当UIを削除）

## 作業順

1. 統合対象369件の分類確定（new 304 / room_of 38 / same・parent_of 27）
2. `candidate-venues.csv`・`venue-details.csv` へ列追加、タグ付与、区画行生成、`canonical_candidate_id` 書き戻し
3. `scripts/generate-data.mjs`: タグ・`evidence_tier` を出力に追加、`smallTheaterCensus` と台帳アセットを削除
4. `app/venue-search.tsx`: 小劇場タグフィルタ、情報量バッジ、除外件数表示、プリセット変更、台帳セクション削除
5. `scripts/audit-data.mjs`: 「`ledger_only` は料金観測を持たない」「`closed` は候補に存在しない」検査を追加
6. docs更新（`DATA_DICTIONARY.md` に新列、`COMPETITION_AND_SMALL_THEATER_SCOPE.md` に統合結果、
   `README.md` の候補件数を実データに合わせて修正）

## 既知の不整合

`README.md` は候補1,178施設と記載しているが、`candidate-venues.csv` の実データは1,534件（47都道府県）。
統合作業と同時に修正する。

---

# 実装指示（フェーズ1: CSV統合）

対象リポジトリ: `web-projects/monosashi/venue-monosashi`
対応表: `docs/small-theater-merge-map.csv`（369行、`action` は `new` 304 / `attach_space` 38 / `tag_only` 27）
入力: `data/small-theater-research.csv`（`source_id` で対応表と結合）

このフェーズはCSVデータの追記のみ。Webアプリ（`web/`）は変更しない。

## 追加ルールと確定した判断

### fit_level

`fit_level` はA/B/Cのみ許可（`scripts/audit-data.mjs`）。新規小劇場304行はすべて **`B`** とする。
定義:「舞台公演用途に施設構成が合致することは公式情報で確認したが、大会・スポーツ・展示など
他用途への適合は未評価」。個別に評価していないものをAとBに割り振らない。

### evidence_tier はCSVに持たない

情報量の区別は `price-observations.csv` に金額付き行があるかで導出できるため、
`generate-data.mjs` 側で算出する（フェーズ2）。派生値をCSVに二重で持たない。

### candidate-venues.csv に追加する6列

`tags` / `source_index` / `price_url` / `access_url` / `conditions_url` / `observed_at`
既存1,534行はすべて空文字で埋める（`tags` と `source_index` も空。既存行の意味を変えない）。

料金表・アクセス・利用条件のURLは `venue-websites.csv` に行として足さない。
同ファイルは4行の別用途テーブルであり、900行を流し込むと意味が壊れる。

### venue-details.csv に追加する1列

`tags`。既存8,127行は空文字。

## 作業

### 1. 列追加

上記のとおり2ファイルへ列を追加する。**既存行の既存列の値は1文字も変更しない。**

### 2. action=new（304件）

`data/candidate-venues.csv` に新規行を追加する。`candidate_id` は既存の最大番号+1から連番。

| 列 | 値 |
|---|---|
| region | 既存行から作った 都道府県→region の対応表で決定。決まらなければ処理を止めて報告 |
| prefecture | `source_prefecture` |
| city | `source_address` から都道府県を除いた先頭部分。最初の「市」までを採る。「市」が無ければ最初の「区」「町」「村」まで。取れなければ空欄 |
| facility_name | `official_name`（空なら `source_name`） |
| facility_pattern | `small_theater` |
| fit_level | `B` |
| verified_public_facts | `notes` の内容 |
| inference_or_risk | `小劇場台帳からの統合。料金は公式料金表URLのみ確認で金額は未構造化。空き状況・利用条件は要確認` |
| verification_status | `verified` |
| official_url | `official_url` |
| tags | `small_theater` |
| source_index | `lasens` |
| price_url / access_url / conditions_url | `official_price_url` / `official_access_url` / `official_conditions_url` |
| observed_at | `official_observed_at` |

### 3. action=attach_space（38件）

対応表の `target_candidate_id` が示す既存候補へ紐付ける。**新しい candidate_id を作らない。**

- 既存候補行の `tags` に `small_theater` を追加しない（施設全体は小劇場ではない）
- `venue-details.csv` に、その候補の区画として1行追加する（下記「区画行の作り方」）
- ただし同一候補に `space_name` が一致する既存区画があれば、新規行を作らず既存区画の `tags` に
  `small_theater` を足し、空欄の `capacity_fixed`・`area_m2` だけを台帳の値で埋める。
  既に値が入っている欄は上書きしない
- 一致判定が曖昧なものは変更せず、`docs/small-theater-merge-report.md` に一覧で残す

### 4. action=tag_only（27件）

既存候補と同一施設。

- 既存候補行の `tags` に `small_theater` を追加（既存値があればパイプ区切りで追記）
- `source_index` が空なら `lasens` を入れる
- `price_url`・`access_url`・`conditions_url`・`observed_at` は**空欄のときだけ**台帳の値で埋める
- `venue-details.csv` への行追加はしない。ただし `space_name` が台帳の施設名と一致する既存区画が
  あれば、その区画の `tags` に `small_theater` を足す

### 5. 区画行の作り方（action=new と attach_space で、収容または面積がある場合）

`data/venue-details.csv` に追加。収容も面積も無い行は**作らない**。

| 列 | 値 |
|---|---|
| detail_id | 既存の最大番号+1から連番（`DETAIL-` 接頭辞と桁数は既存に合わせる） |
| candidate_id | 新規発番したID、または `target_candidate_id` |
| space_id | `st-` + `source_id` を小文字化（例 `st-lasens-272`） |
| space_name | `official_name`（空なら `source_name`） |
| space_type | `theater` |
| area_m2 | `official_area_m2`（空なら空欄） |
| capacity_fixed | `official_capacity`（空なら空欄） |
| tags | `small_theater` |
| source_url | `official_url` |
| observed_at | `official_observed_at` |
| verification_status | `verified` |
| note | `小劇場台帳から統合。天井高・搬入・舞台寸法は未確認` |
| 上記以外の列 | 空欄（0や推測値で埋めない） |

### 6. 相互参照の書き戻し

`data/small-theater-research.csv` の `canonical_candidate_id` に、統合先の `candidate_id` を書き込む。
369件すべてに入る。統合対象外の225件は空欄のまま。

### 7. 報告

`docs/small-theater-merge-report.md` に、追加した候補数・区画数、タグを付けた既存候補数、
判定が曖昧で手を付けなかった件数と一覧を書く。

## 完了条件

- `node scripts/audit-data.mjs` がエラー0で通る（既存の警告は許容）
- `data/candidate-venues.csv` が 1,534 + 304 = **1,838行**（ヘッダ除く）
- `tags` に `small_theater` を持つ候補が 304 + 27 = **331件**
- `venue-details.csv` の `tags=small_theater` の区画が **285件以内**（収容または面積を持つ行の数）
- `canonical_candidate_id` が埋まった台帳行が **369件**
- 既存行の既存列の値が変わっていないこと（`git diff` で確認できる状態）

## 制約

- **ファイルの削除・移動をしない。行の削除もしない**
- 既存ファイルは編集前に必ず読み直す（別マシンのエージェントが同時に触る前提のワークスペース）
- `web/` 配下、`data/venue-monosashi.sqlite`、他プロジェクトには触らない
- 未確認の値を0や推測で埋めない。空欄のまま残す

---

# フェーズ1の検証結果（2026-08-19 / Claude）

Codexが実装し、Claudeが検算した。件数はすべて完了条件どおり
（候補1,838行、`small_theater`候補331件、小劇場区画264件、`canonical_candidate_id` 369件、
既存候補1,534行の既存列は差分0、監査 errors=0）。

`venue-details.csv` の既存行3件（DETAIL-116・7163・8114）だけ値が入ったが、いずれも
空欄→台帳値の補完であり、仕様で許可した範囲。

## 修正した1件: HTTPS書き換え

Codexは、監査の「`official_url` はhttps必須」を通すため、台帳がhttpで記録していた12件を
httpsへ書き換えていた。**11件はhttpsで到達できず（curlで接続失敗）、httpは11件とも200を返す。**
監査は通るがリンクは死ぬ状態だったため、次のとおり修正した。

- 11件を元のhttpへ戻した（`www.gut.co.jp` のみhttpsで200のため維持）
- `scripts/audit-data.mjs` の `candidate-venues.official_url` と `venue-details.source_url` を、
  http/https以外はエラー、httpは警告に変更した。監査実行ごとに17件の `http-only` 警告が出る

公式サイトをhttpのみで運用している小規模劇場は実在する。到達確認済みのhttpをhttpsへ書き換えると、
一次情報へ戻れなくなり「条件と根拠で比べる」という前提が崩れる。https必須は他ファイルでは維持している。

到達確認日: 2026-08-19。対象: ftas.info/kaika、nanatsudera.com、bungei.jp、akai-mi.com、
raftweb.info、kobayashi-yk.com、sun-mallstudio.com、theatersunmall.server-shared.com、
t-minerva.com、halfmoonhall.com、wanekaze.com/forest。

## 追記: generated-data の分離（2026-08-20）

統合で候補が1,838件へ増えた結果、`web/app/generated-data.ts` が12MBに達し、
`npm run dev` が起動しなくなった（Vite/Miniflareがモジュール読み込み中に
`Maximum call stack size exceeded`）。80件へ減らすと起動することを確認し、
データ量が原因であることを切り分けた。統合前のHEADでも既に11.2MBあり、
統合が引き金にはなったが、以前からの限界に達していたものである。

対処として、データ本体を `web/app/generated-data.json` へ書き出し、
`generated-data.ts` はそれをimportするだけの5行にした。巨大なオブジェクトリテラルの
構文解析は再帰的でスタックを使い切るが、JSONは `JSON.parse` で読まれるため起きない。
本番ビルド・SSRテスト・実ブラウザ表示はいずれも変更前後で通っている。
JSONは差分が読めるよう2スペース整形で書き出す。

## 追記: 統合後のURL監査（2026-08-20）

`npm run audit-urls` を3,551URLに対して実行した。到達3,338、client_error 98、
network_error 88、access_limited 14、timeout 8、server_error 5。

小劇場タグを持つ候補365件に紐づく不達は13件で、内訳と対処は次のとおり。

- **HTTPS証明書の検証に失敗する7サイト**（plaza-kantoukan.jp、sendard.jp、
  tokyocinemaunion.jp、tricolore-theater.com、vector7.info、www.a-to-kobe.jp、
  www.airstudio.jp）。いずれもhttpでは200を返す。台帳の記録が当初からhttpsだったもので、
  到達確認のうえhttpへ直した（候補17セル・区画4セル・台帳17セル）。監査のhttp-only警告は28件になる。
- **あかいくつ劇場**: 公式の貸室ページが `/貸室のご案内` から `/rental-room` へ移転していた。
  移転先に施設名の記載があることを確認して差し替えた。
- **アートスペースサンライズホール（CAND-1704）**: 根拠にしていた豊島区の案内PDFが404。
  2026年版・2024年版の同名パスも404で、公式の代替が見つからない。二次情報（チケット販売、
  索引サイト）で代用せず、候補と区画を `needs_check` にして再取得待ちとした。
- **早稲田クローバースタジオ**: 403（`access_limited`）。ホスティング側のbot遮断であり、
  リンク切れとは区別して扱う。
- 再実行で200を返した3件（tenbusukan.jp、ezuko.com、zhall.or.jp）は一時的な失敗として据え置く。
