# Overnight Run Plan

## Objective

2026-07-30 08:00 JSTまで、会場ものさしの一次情報調査とデータ監査を継続する。JJF・JYYF・WYYCの過去会場台帳の未完区間を減らし、全国47都道府県から最低1件の候補を用意し、メッセ・展示場・コンベンションセンターを含む小規模から大規模までを、予算・設備・アクセス・利用条件の確認状態付きで比較できる土台を作る。

## Scope

- Working directory: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/venue-monosashi`
- Writable paths: 上記ディレクトリ配下のみ
- Baseline: Git管理外。2026-07-29T23:56:42+09:00時点のファイルSHA-256を`STATE.md`に記録
- Canonical inputs: `data/historical-events.csv`、`data/candidate-venues.csv`、`data/coverage.csv`
- Generated/derived data: `data/venue-monosashi.sqlite`、監査出力、朝レポート
- Wake-up/reporting time: 2026-07-30 08:00 JST

## Definition of Done

- 過去大会の未完区間を一次情報で調査し、確認できた会場を台帳へ追加する。
- JJF 1999-2026、JYYF全国・地区・ジュニア、WYYCのシリーズ別カバレッジを再計算する。
- 47都道府県すべてに最低1候補を置き、公式URLと確認状態を持たせる。
- メッセ、展示場、コンベンションセンター、体育館＋劇場、文化ホールを候補類型へ含める。
- 予算検索へ必要な施設基本料、設備費、冷暖房、設営撤去、警備清掃、仮設舞台などのフィールドと「税込・区分・調査日・出典・未確認」を区別できるスキーマを作る。
- 天井高、平土間面積、収容人数、固定席、控室、会議室、搬入、アクセス、宿泊、配信、物販、飲食、予約開始時期、連続日程を確認できるスキーマを作る。
- `npm run audit`と追加する品質監査がエラー0で完了する。
- `STATE.md`、`REPORT.md`を更新し、最終検証を通す。

## Allowed Actions

- プロジェクトと適用指示の読み取り。
- 公式主催者・施設・自治体・指定管理者のWebサイト、利用案内、料金表、PDFの読み取り。
- 公式情報で不足する場合に限り、補助情報を未確認扱いで候補探索へ利用。
- CSV、SQLite、Markdown、監査スクリプト、データスキーマの作成・更新。
- `npm run audit`、SQLiteクエリ、差分・ハッシュ・リンク検査。
- 既存台帳の明白な誤りを一次情報に基づき訂正し、朝レポートへ記録。

## Prohibited Actions

- push、デプロイ、公開、外部メッセージ、施設への問い合わせ、予約、購入、決済、アカウント変更、秘密情報変更を行わない。
- ユーザーデータを削除しない。
- 他の`ものさし`プロジェクトや既存の汚れた作業ツリーを変更しない。
- 料金・空き状況・利用許可を確認済みと推測しない。
- 候補評価を開催可能性、主催者承認、推薦順位として表示しない。
- UIの最終デザインや事業上の方向転換を無人で決定しない。

## Stop Conditions

- 方向性を変える判断は朝の確認事項として記録する。
- 基準ファイルが外部から予期せず変更された場合は、重なる書き込みを止めて安全な別作業へ移る。
- 公式ソースがない情報を確定値として埋めない。
- 一つの調査がブロックされても、独立した都道府県・大会・スキーマ調査を続ける。
- 2026-07-30 08:00 JSTで最終検証と朝レポートへ移る。

## Team

- Coordinator: 現在のCodex。範囲、波、停止判断、朝レポートを担当。
- Explorer: 同一Codexが読み取り専用の調査段階として順次担当。
- Writer: 同一Codexのみが対象ディレクトリを書き換える。
- Verifier: 同一Codexが書き込み後に独立した監査コマンドと出典検査を実行。
- Subagents: 使用しない。ユーザーから人数・モデルの個別承認を得ていないため。

## Verification

- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-07-29-nationwide-venue-research`
- `npm run audit`
- SQLiteで行数、重複ID、都道府県数、シリーズ別確認状態を再集計
- CSVの必須列、URL、確認状態、数値単位、調査日、出典の検査
- 最終時に基準ハッシュとの比較と、成果物リンクの存在確認
- `python3 /Users/arata/.codex/skills/overnight-project-runner/scripts/validate_run.py overnight-runs/2026-07-29-nationwide-venue-research --final`

