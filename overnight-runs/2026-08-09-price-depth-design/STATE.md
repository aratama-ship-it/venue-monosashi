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

## 次のwave候補

1. 埼玉県の体育館型（アマチュアスポーツ用途の全日基本料が既収録か先に確認）
2. 長崎・岩手・秋田・宮崎・岐阜・和歌山・徳島（各23施設が料金未観測）
3. 草加市文化会館のPDF処理（pdftotext等でテキスト化してから収録）

## 注意

- WebFetchの要約を鵜呑みにせず、金額が計算に合うか（午前+午後+夜間≒全日など）確認してから収録する
- 公開デプロイは日次ラン終了時に1回（Codex委譲、バージョン検証つき）
