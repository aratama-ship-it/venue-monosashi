# 料金観測拡充ラン STATE

- Status: IN_PROGRESS（2026-08-09 に本人承認済み。PLAN.md の3確認点は「ともにOK」で承認）
- 実行体制: Claude単独（サブエージェントなし）。デプロイのみ認証を持つCodex CLIへ委譲
- 収録規律: PLAN.md のとおり（公式一次情報のみ・条件列保持・曖昧な日額を作らない・不明値は空欄）

## Wave 1 — 埼玉県（ホール型） 2026-08-09 完了

- 追加: 30観測（PRICE-2884〜2913）。全国合計 2,911観測、料金観測ありの候補 216→221施設
- 対象と出典:
  - CAND-1027 埼玉会館 大ホール — https://www.saf.or.jp/saitama/facilities/main_hall/（全日・入場料2区分×平日/土日祝、税記載なし、冷暖房・付帯設備別）
  - CAND-811 坂戸市文化会館ふれあ ホール — https://www.sakado-bunka.jp/guide/price/（全日・入場料2区分×平日/土日祝）
  - CAND-1023 彩の国さいたま芸術劇場 大ホール — https://www.saf.or.jp/arthall/guide/facilities/main_hall/?tab=2（一日・入場料2区分×平日/土日祝、**税別**、リハ・仕込み70%）
  - CAND-616 狭山市市民会館 大ホール — https://www.sayama-kaikan.jp/guide/price/（全日・市内/市外×平日/土日祝の入場無料基本料。入場料徴収時+30%〜+130%加算は列外条件として注記）
  - CAND-298 所沢ミューズ アーク/マーキー/キューブ — https://www.muse-tokorozawa.or.jp/guide/price.php（全日・アークは全客席利用の入場料5区分×平日/土日祝）
- 収録見送り: 草加市文化会館（料金PDF 6MBが機械可読でなくOCR未実施。次waveでPDF処理してから）
- 検証: npm run audit（errors=0、既存WARN1のみ）、data:generate、validate（lint・build・テスト3/3）通過

## 進捗の見方（2026-08-09 追加）

**`npm run price-coverage` が唯一の進捗指標。** wave対象はこの表を見てから選ぶ。

- 出力: 都道府県 × 施設タイプ（舞台型/体育館型）ごとの「確認済み1日施設基本料を持つ施設数 / その型の候補数（不足数）」
- 施設タイプの判定は **検索画面 `web/app/venue-search.tsx` の `rolesForVenue` と同じロジック**
  （facility_pattern だけでなく space_type・stage_type も見る）。検索画面が舞台/スポーツとして
  扱う施設を分母にそろえるため
- 「確認済み1日基本料」= `charge_category=facility` かつ `unit=per_day` かつ
  use_caseがsetup/準備/撤去でない かつ `verification_status=verified`
- `--prefecture=岩手県` で県内の施設別内訳（PRICED / no-price）を一覧表示
- `--write` で `data/prefecture-price-coverage.csv` を更新
- **「候補25件中◯件が料金未観測」という数え方は使わない。** 施設タイプを区別せず、目標に対する
  進捗が読めないため（Wave2着手時にこの粗い数え方で埼玉の体育館型を誤判定した）

2026-08-09 Wave2完了時点: 舞台型達成 8/47県、体育館型達成 3/47県、両方達成 3/47県。
不足合計は舞台型139・体育館型160。全47県とも既存候補だけで5件に到達可能
（`needs_new_candidates` は空）。

## Wave 2 — 岩手県（舞台型） 2026-08-09 完了

- 事前確認（**後に誤りと判明**）: 埼玉県の体育館型を facility_pattern だけで数えて「候補2件のみ・
  両方観測済み・候補追加なしでは到達不可」と判断したが、検索画面と同じ役割判定では
  埼玉の体育館型は5件（CAND-087・194が観測済み、CAND-445・619・812が未観測）で、
  **既存候補のみで目標達成可能**だった。舞台型ホールに練習室・トレーニング室がある施設を
  数え落としていたことが原因。以後は `npm run price-coverage` の表で判断する
- 追加: 20観測（PRICE-2914〜2933）。全国合計 2,931観測
- 対象と出典（すべて大ホール、全日区分。午前+午後+夜間の合算と全日欄の整合を確認済み）:
  - CAND-022 岩手県民会館（トーサイクラシックホール岩手） — https://www.iwate-kenmin.jp/guide/price/
    （9:00-21:30・入場料5区分×平日/土日祝、税込、2025-10-01改定。合算と全日欄が完全一致）
  - CAND-273 盛岡市民文化ホール（マリオス） — 料金PDF（mfca.jp/shiminbunka）
    （9:00-21:30・入場料5区分×平日/土日祝、税込10%。合算と全日欄が完全一致）
  - CAND-421 宮古市民文化会館 — https://iwate-arts-miyako.jp/facility/price/
    （料金表が画像PNGのため視覚読取。9:00-21:30・入場料7区分×平日/土日祝、税記載なし。合算と全日欄が完全一致）
  - CAND-422 久慈市文化会館アンバーホール — https://www.city.kuji.lg.jp/kanko_bunka_sports/kujisi_bunka_kaikan/3/1140.html
    （9:00-22:00・入場料5区分×休日/休日以外、税記載なし。**全日欄は時間帯合算と不一致**＝独立の一日割引額として
    公式表に明記されているためそのまま収録、note欄に明記）
  - CAND-423 釜石市民ホールTETTO ホールA — 料金PDF（tetto-kamaishi.jp、2023-05-08改訂）
    （9:00-21:00・入場料2区分×平日/土日祝、税別。**全日欄は時間帯合算と不一致**＝独立の一日割引額として
    公式表に明記されているためそのまま収録）
- 新規space_idに対応する最小限のvenue-details行を5件追加（面積・天井高等は未確認のまま空欄）
- 検証: npm run audit（初回はvenue-details不足でERROR20件→追加後errors=0、既存WARN1のみ）、data:generate、
  validate（lint・build・テスト3/3）通過
- コミット: 356aa14「Add Iwate hall daily base rates (price-depth wave 2)」→
  agent/add-competition-and-small-theater-coverage へpush済み（3e79b60..356aa14）

## 次のwave候補

**着手前に `npm run price-coverage` を実行して最新の不足を確認すること。** 以下はWave2完了時点の並び。

1. 両方が0件の県（1県で舞台型・体育館型の両方を進められる）: 長崎・青森・秋田・宮崎
2. 舞台型が0〜1件の県: 山形・石川・鳥取・滋賀・和歌山・徳島
3. 体育館型が0件の県: 新潟・熊本・宮城（いずれも舞台型は着手済み）
4. 埼玉県の体育館型（残り3件）: CAND-445 久喜総合文化会館、CAND-619 草加市文化会館、
   CAND-812 本庄市児玉文化会館。**既存候補のみで到達可能**（草加は料金PDFのOCRが前提）
5. 岩手県の体育館型（残り4件）
6. RESEARCH_UPDATE_2026-08-09.md にある展示場型未着手候補（CAND-044広島産業会館、CAND-004大宮ソニックシティ）は
   公式情報を確認済みだが未構造化。本ランの体育館型/舞台型の目標外のため、着手する場合は別枠として扱う

## 注意

- WebFetchの要約を鵜呑みにせず、金額が計算に合うか（午前+午後+夜間≒全日など）確認してから収録する
- 公開デプロイは日次ラン終了時に1回（Codex委譲、バージョン検証つき）
