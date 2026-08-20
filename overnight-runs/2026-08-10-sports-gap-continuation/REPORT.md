# Sports Gap Continuation Report

## Outcome

PARTIAL。ナイスアリーナ1施設の公式料金区分を完成させ、秋田県体育館型カバレッジを1/6から2/6へ増やした。次のセパームは公式根拠まで確定したが、別ライターが共有CSVを継続更新していたためcanonical収録は止めた。

## Changes

- `CAND-187` ナイスアリーナ: `PRICE-3285`〜`PRICE-3296`の12観測を追加。
- `CAND-187` ナイスアリーナ: `SCENARIO-100`〜`SCENARIO-103`の4参考合計を追加。
- 平日・入場料なし33,960円、平日・入場料あり67,920円、土日祝・入場料なし40,840円、土日祝・入場料あり81,680円。いずれも公式3時間区分4つの合算で、12:00〜12:30は区分外。
- 共有worktreeの別ライターがcommit `5ae8dab8e747a35f2cbf8e47d788c6b295f87c29`を作成した際、このWave 1も同commitに含まれた。このrun自身はcommit・push・deployを実行していない。
- 最終観測HEADは`5c6bbb88c548e3f6ce7272b663f194bad07d3981`。この後続commitは別ライターによる平塚体育館の更新として観測した。
- セパームの調査結果（未収録）: 町公式条例はアリーナ全面の税込時間単価を、スポーツ入場料なし420円、あり840円、スポーツ以外入場料なし710円、あり1,790円、営利4,180円と規定。町公式管理規則は体育施設の使用時間を09:00〜21:30（準備・原状回復・清掃を含む）と規定。12.5時間の参考額候補は順に5,250円、10,500円、8,875円、22,375円、52,250円だがcanonicalには入れていない。

## Verification

- `npm run audit`: PASS、errors=0、既存warning 1件のみ。
- `npm run web:lint`: PASS。
- `npm run validate`: 競合検知前のWave 1時点でPASS（audit、lint、build、rendered HTML tests 3/3）。
- 競合検知後の最終read-only確認: `node --test web/tests/rendered-html.test.mjs` 3/3 PASS、`git diff --check` PASS。
- `npm run price-coverage -- --prefecture=秋田県`: 体育館型2/6、CAND-187は「参考合計」と表示。
- 最終全国値: official per-day 202施設、derived-only 61施設、stage_met 16/47、sports_met 7/47、both 6/47、stage gap 54、sports gap 106。これには別ライターの鹿児島・平塚更新も含む。
- `web/app/generated-data.ts`で`PRICE-3296`と参考額33,960円・81,680円を確認。
- ナイスアリーナの根拠: `https://shisetsu.mizuno.jp/m-7619/guide`。
- セパームの未収録根拠: 料金条例 `https://www.town.kosaka.akita.jp/section/reiki_int/reiki_honbun/c311RG00000230.html`、管理規則 `https://www.town.kosaka.akita.jp/section/reiki_int/reiki_honbun/c311RG00000232.html`。

## Pre-existing State Preserved

- `docs/RESEARCH_UPDATE_2026-08-09.md` remains protected and unmodified; final SHA-256 `b80f689bd2b1a5d268d385848fa2dcb8220e583189e2fa717f114bac39c74238` matches baseline.
- 別ライターの鹿児島・平塚データと生成物を巻き戻していない。

## Unverified States

- Public site, deployment, device, account, live reservation state, and remote push state are unverified.
- 直接Nodeテストは現在の既存ビルド成果物を検査したもので、公開反映の証明ではない。

## Blockers

- 共有worktreeの別ライターが08:57・09:00のcommitでcanonical IDを継続使用していた。Wave 2で一度ID衝突を検出したため、試行行だけを安全に除去して停止した。
- 09:02時点で別ライターの次waveまたは再生成途中とみられるtracked変更を観測した。対象は`data/budget-scenarios.csv`、`web/app/generated-data.ts`、`web/dist`。このrunはそれらを修復・復元していないため、最終worktreeのclean状態は未確認。

## Morning Decisions

- 別ライター終了後にセパームを再採番して収録するか。
- 固定時間料金の分類変更と重複候補統合は、このrunの範囲外のまま別タスクに保つ。
