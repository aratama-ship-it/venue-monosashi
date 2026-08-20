# Overnight Plan: 体育館・総合スポーツ施設候補の全国拡張

## Run boundary

- Start: 2026-08-05 02:49 JST
- Cutoff: 2026-08-06 07:00 JST
- Repository: `/Users/arata/Library/Mobile Documents/com~apple~CloudDocs/claude code files/web-projects/monosashi/venue-monosashi`
- Branch: `agent/add-competition-and-small-theater-coverage`
- Baseline commit: `5119446c016f11d4ebd1ce154e6c597d50695eed`
- Execution: one bounded wave per heartbeat in this task; sequential roles only

## Scope

全国47都道府県について、既存の大型アリーナ候補に加え、地域大会・練習会・観客付き催事にも使える中規模の体育館または総合スポーツ施設を、公式一次情報に基づいて追加する。

## Objective

一次情報と検証可能性を保ちながら、会場ものさしの体育館・総合スポーツ施設データを全国で一段深くする。

## Definition of Done

- 47都道府県それぞれに、今回の夜間運転で原則1施設を追加し、候補総数230件を目標とする。
- 追加候補には公式URLと、少なくとも1件の施設区画・設備情報を付ける。
- 公式資料で確認できた場合のみ、料金観測を15件以上、運用情報を10件以上追加する。
- 欠損値を推測しない。固定席・可動席・立見・フロア席、建物面積・競技場面積、天井高・屋根高、時間料金・区分料金・日額を区別する。
- 各波で `npm run audit` と生成データ差分を確認し、定期的および最終時に lint/test を通す。
- 最終時に台帳を検証し、達成数・未達・要確認・次の候補を `REPORT.md` に残す。

## Allowed Actions

- この台帳ディレクトリ
- `data/candidate-venues.csv`
- `data/venue-details.csv`
- `data/price-observations.csv`
- `data/venue-operations.csv`
- 生成物 `web/app/generated-data.ts` と追跡済み `web/dist`
- 件数や検証に必要なテスト、README、調査記録
- 検証済みの波ごとのローカルコミット

## Prohibited Actions

- push、deploy、公開、アクセス設定、DNS変更、外部メッセージ送信
- 既存の未追跡ファイル、stash、ユーザー変更の削除・上書き
- 公式一次情報で裏付けられない数値の補完
- 夜間運転の範囲を越えるUI再設計や大規模リファクタリング

## Stop Conditions

- 2026-08-06 07:00 JSTに到達したら、新規調査を止めて最終検証と報告へ移る。
- 同一原因の検証失敗が3回続いた場合、その波を保留して原因と再開条件を記録する。
- Git基準点と説明できない差分、ID衝突、一次情報と矛盾する値を検出した場合は該当波をコミットしない。
- ユーザー変更と安全に分離できない場合は編集を止める。

## Team

- Coordinator / Researcher / Implementer / Verifier / Integratorを同一タスク内で順番に実行する。
- サブエージェントは使わない。

## Wave protocol

1. `STATE.md`、Git status、HEADを確認し、前回波との差異を記録する。
2. 未処理都道府県から3〜5施設を選ぶ。
3. 自治体・施設・指定管理者の公式ページまたは公式PDFのみで候補、区画、料金、運用を確認する。
4. CSVを編集し、ID重複、参照整合、単位、出典URLを監査する。
5. データ生成、監査を実行し、必要な間隔でlint/testを実行する。
6. 合格した変更だけをローカルコミットし、`STATE.md` と `REPORT.md` を更新する。
7. 失敗時は同じ波を無限反復せず、問題を記録して次の安全な波へ進む。

## Verification

- 各波: Git差分、ID、公式URL、`npm run audit`
- 3波ごと: `npm run web:lint`、`npm run web:test`
- 最終波: 全監査、lint、test、台帳validator、公開との差分明示
