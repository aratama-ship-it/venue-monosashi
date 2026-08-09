# P1 秋田県・舞台型の一次情報候補

確認: 2026-08-10 00:32-00:40 JST

## 結論

秋田県の舞台型は開始時0/18。以下5施設をP2の上限とする。4施設は公式日額を直接収録できる見込みが高く、横手市民会館は公式の利用可能時間と時間単価を同一条件で結べる場合だけ時間換算する。

## Shortlist

### 1. CAND-023 あきた芸術劇場ミルハス

- Status: ACCEPT ROUTE
- Space: 大ホール（既存space_idをP2で再確認）
- Official fee source: https://akiat.jp/rental/fee/
- Official guide: https://akiat.jp/rental/
- Evidence: 9:00-22:00の全日欄、平日/土日休日、入場料区分、税込、設備別を公式表が明示。
- P2 rule: まず「入場料徴収なし」の平日/土日休日を収録し、全入場料区分を増やす場合は1施設の波上限内で一括照合する。

### 2. CAND-278 大仙市大曲市民会館

- Status: ACCEPT ROUTE
- Space: `omagari-large` 大ホール
- Official fee page: https://www.city.daisen.lg.jp/archive/contents-10620
- Official fee PDF: https://www.city.daisen.lg.jp/uploads/contents/archive_0000001484_00/R1-sinryoukin.pdf
- Evidence: 9:00-22:00の全日欄、平日/土日祝日、入場料4区分、令和元年10月1日改正、冷暖房・附属設備別を公式PDFが明示。
- P2 rule: PDFの現行掲載状態を再確認し、税状態は「消費税改定に伴う料金改定」だけから税込と断定せず、明示が取れなければ `not_stated`。

### 3. CAND-279 鹿角市文化の杜交流館 コモッセ

- Status: ACCEPT ROUTE
- Space: `kazuno-comosse-hall` 文化ホール
- City facility/hours source: https://www.city.kazuno.lg.jp/kanko_bunka_sports/komosse/1/2946.html
- Official facility fee source: https://comosse.jp/index.php/fee/
- Evidence: 9:00-22:00の全日欄、入場料5区分、附帯設備別を施設公式表が明示。施設窓口メールは市ドメイン。
- P2 rule: 税明示が確認できなければ `not_stated`。料金ページに曜日差はないため `day_type=all`。

### 4. CAND-425 仙北市民会館

- Status: ACCEPT ROUTE
- Space: `semboku-civic-hall` ホール
- Current facility page: https://www.city.semboku.akita.jp/facility_sys/shiminkaikan.html
- Official ordinance: https://www.city.semboku.akita.jp/reiki/H417901010167/H417901010167_j.html
- Evidence: 現施設ページが使用可能時間9:00-22:00を掲載し、条例別表が平日40,850円・土日祝日54,470円の全日基本使用料を明示。入場料/営利/準備は倍率条件。
- P2 rule: 基本使用料のみを収録。倍率後の派生額は公式表の独立金額ではないため、必要がなければ増やさない。税は明示がなければ `not_stated`。

### 5. CAND-277 横手市民会館

- Status: HOLD UNTIL HOURS VERIFIED
- Space: `yokote-main` 大ホール
- Current city page: https://www.city.yokote.lg.jp/shisetsu/1005521/1005099.html
- Official fee PDF: https://www.city.yokote.lg.jp/_res/projects/default_project/_page_/001/005/099/2025riyoryokin.pdf
- Evidence: 市公式ページは大ホール非営利7,800円/時、営利23,400円/時、市外非営利2倍を明示。
- Hold reason: 現時点の確認ではホールの1日利用可能時間を同じ公式条件で確定していない。時間単価だけに任意の13時間等を掛けない。
- P2 rule: 公式の利用可能時間が確認できれば `hourly_rate_times_published_hours` の参考額、できなければ収録見送り。

## Excluded From This Wave

- CAND-280 ほくしか鹿鳴ホール: 市公式ページは施設概要を示すが、料金表への明確な公式ルートをP1内で確認できなかったため、5件上限外。
- Other Akita candidates: P2完了後の新規wave候補。今夜の途中で上限を増やさない。

## Baseline Check

- HEAD remained `22f5cdab6ea9d90a60c7bd329c1ad4832ebde6a8`.
- Protected `docs/RESEARCH_UPDATE_2026-08-09.md` hash remained `b80f689bd2b1a5d268d385848fa2dcb8220e583189e2fa717f114bac39c74238`.
- Starting canonical hashes remained unchanged through P1.
- Canonical data changes in P1: none.
