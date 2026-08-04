# 会場ものさし

中小〜中規模イベントの主催者が、過去の実例を基準に全国の会場候補を探せるようにするための、調査・データ設計プロジェクトです。

基準イベントは次の系統です。

- Japan Juggling Festival（JJF）
- 日本ヨーヨー連盟の国内大会（全国大会・地区大会・ジュニア大会）
- World Yo-Yo Contest（WYYC）
- 全日本ディアボロ選手権大会（AJDC）
- 大阪国際ディアボロ競技会（OIDC）
- けん玉ワールドカップ（KWC）
- 全日本少年少女けん玉道選手権大会

## リポジトリ構成

GitHubでは調査原本とWebアプリを1つのリポジトリとして管理します。

- `data/`: 比較・検索の正本となるCSV
- `docs/`: 調査範囲、検索モデル、未確認事項、次の調査順
- `scripts/`: 原本CSVとURLの監査、SQLite再生成
- `web/`: 会場検索Webアプリ
- `overnight-runs/`: 無人調査の計画、状態、検証レポート

WebアプリだけをGitHubへ置くと、CIが原本CSVを再生成できません。リポジトリのルートはこのディレクトリとし、`web/`単体を別リポジトリとして扱いません。

## 現在の成果物

- `data/historical-events.csv`: 開催年ごとの過去会場台帳（225行）
- `data/candidate-venues.csv`: 全国の類似会場候補（174施設・47都道府県）
- `data/prefecture-coverage.csv`: 各都道府県の代表候補と確認状態
- `data/venue-details.csv`: 施設内の貸出区画ごとの面積・天井・収容・舞台等
- `data/price-observations.csv`: 利用目的・曜日・時間帯・税込条件を保持した料金観測
- `data/budget-scenarios.csv`: 確認済み時間区分を数量付きで合算した、公式日額とは別の参考額
- `data/venue-operations.csv`: 駅・駐車・搬入・予約開始・設営撤去・回線等の運用観測
- `data/historical-venue-aliases.csv`: 表記揺れを明示した、過去大会台帳と候補施設の照合キー
- `data/url-audit.csv`: 収録した一次情報URLのHTTP確認結果（`npm run audit-urls`実行時に更新）
- `data/venue-monosashi.sqlite`: 上記CSVを検索しやすくまとめたSQLite
- `data/coverage.csv`: 「網羅済み」と「未確認」を混同しないための範囲監査
- `docs/DATA_DICTIONARY.md`: 予算を含む比較項目と不明値の扱い
- `docs/SEARCH_MODEL.md`: 過去大会を基準にする検索・判定・予算表示の設計案
- `docs/COVERAGE_MATRIX.md`: 地域別の候補数と詳細・料金・運用観測の密度
- `docs/NEXT_RESEARCH_QUEUE.md`: 過去大会との関係と地域の観測密度から決めた次の一次情報調査順
- `docs/BUDGET_AND_INQUIRY_CHECKLIST.md`: 総費用を組むための費目と施設確認項目
- `docs/UNRESOLVED_HISTORICAL_VENUES.md`: 未確定会場の調査履歴と次の探索先
- `docs/RESEARCH_REPORT.md`: 初期調査の結論、ものさし案、次の調査順
- `docs/COMPETITION_AND_SMALL_THEATER_SCOPE.md`: ディアボロ・けん玉と小劇場の今回収録範囲
- `scripts/audit-data.mjs`: 必須項目、重複ID、ステータス、URL、開催年範囲の機械監査
- `scripts/audit-urls.mjs`: 一次情報URLを重複排除し、到達・制限・404・タイムアウトを分離する監査
- `web/`: 過去大会プリセット、地域、収容、天井高、確認済み基本料で絞り込めるローカルWeb検索MVP

## 重要な境界

この版は公開中の調査版です。公式サイトで確認できた事項と、比較のための評価・推論を分離しています。

- `verified`: 公式または主催者の一次情報で、少なくとも開催年・都市・会場名を確認
- `needs_check`: 都市や開催自体は確認できたが、正確な施設名・棟・現名称などに追加確認が必要
- `cancelled`: 大会自体が中止
- `planned`: 開催予定として掲載されているもの

候補施設の `fit_level` は開催実績ではなく、公開されている施設構成からの初期評価です。空き状況、利用可否、床養生、天井設備、料金、音出し、物販、飲食、深夜搬入などは主催者が施設へ確認する必要があります。

## 監査

```bash
npm run audit
npm run audit-urls
npm run rebuild-db
```

2026-08-04時点の監査値は、過去大会225行、候補174施設、47都道府県、施設区画262件、料金観測387件、時間区分の参考合計13件、運用観測102件、小劇場594件です。小劇場は公式確認済み433件、公式一部確認20件、公式未発見89件、同定保留24件、取得保留28件で、未着手は0件です。未確認値は推測で補わず空欄または確認状態として残しています。

現在はGitHubで調査原本を管理し、ChatGPT Sitesの公開URLで確認できます。`art-monosashi.com`配下への移行はまだ行っていません。

## ローカルWeb検索

`web/`で`npm run dev`を実行すると、原本CSVを再生成して検索画面を起動します。地域・都道府県・会場タイプ・面積・最低／最大収容・天井高・駐車・固定舞台・練習利用・料金用途・運用情報の有無で候補を絞り込み、証拠量・基本料・規模・予約開始時期で並べ替えられます。小劇場型は150席以下の候補と舞台公演料金を起点にします。「同じ貸出区画で満たす」を選ぶと、別区画の最大値と安い料金を誤って組み合わせません。検索条件と最大3施設の比較はURLへ保存して共有できます。検索画面の予算上限は、選択した用途に一致する「確認済みの1日施設基本料」を対象とします。時間区分から組み立てた参考合計は、明示的に選んだ場合だけ検索へ加え、冷暖房・警備・清掃等の未確認費を0円として扱いません。画面下部では、過去大会225記録を系列・年・会場名・都市から検索し、確認状態と出典へ戻れます。

## GitHubと公開段階

- GitHub: `aratama-ship-it/venue-monosashi`
- 現在の段階: `PUBLIC_PREVIEW`
- シリーズ台帳: `aratama-ship-it/monosashi-series`

GitHubへのpush、チーム確認、ChatGPT Sitesへの公開、`art-monosashi.com`への移行は別の操作です。日常変更はDraft PRで確認し、データ監査・lint・テスト・本番ビルドが通った後に公開します。独自ドメイン・DNS変更は、開発者の明示確認後に行います。
