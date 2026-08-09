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

## Wave 2 — 岩手県（舞台型） 2026-08-09 完了

- 事前確認: 埼玉県の体育館型（arena_and_meetings等）候補は候補台帳上 CAND-087・CAND-194 の2件のみで、
  両方とも既に料金観測済み。候補追加なしにこの目標値（5件）へは到達不可のため、次段階（新規候補発掘）は
  今回のスコープ外として保留し、県ごとに未観測が多い舞台型（優先順位2）へ着手した
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

1. 長崎・秋田・宮崎・岐阜・和歌山・徳島（各約23施設が料金未観測。岩手はWave2で舞台型5件を追加済み）
2. 岩手県の残り未観測施設（CAND-274・275・276・421付随の中ホール・422付随の中ホール等）
3. 埼玉県の体育館型は候補台帳の追加（新規施設発掘）が前提。今回のスコープ外として保留
4. 草加市文化会館のPDF処理（pdftotext等でテキスト化してから収録）
5. RESEARCH_UPDATE_2026-08-09.md にある展示場型未着手候補（CAND-044広島産業会館、CAND-004大宮ソニックシティ）は
   公式情報を確認済みだが未構造化。本ランの体育館型/舞台型の対象外（展示場用途）のため、着手する場合は
   別枠として扱う

## 注意

- WebFetchの要約を鵜呑みにせず、金額が計算に合うか（午前+午後+夜間≒全日など）確認してから収録する
- 公開デプロイは日次ラン終了時に1回（Codex委譲、バージョン検証つき）
