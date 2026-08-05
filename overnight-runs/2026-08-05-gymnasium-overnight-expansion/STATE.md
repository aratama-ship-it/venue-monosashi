# Overnight State

## Status

- Status: ACTIVE
- Last updated: 2026-08-05 11:57 JST
- Cutoff: 2026-08-06 07:00 JST
- Last data commit: `6832499` (ledger-only commits may follow it)

## Baseline

- Candidate venues: 183
- Venue details: 271
- Price observations: 390
- Venue operations: 102
- Historical events: 225
- Budget scenarios: 13
- Small theaters: 594
- Arena/sports-pattern candidates: 99
- Prefectures with at least one arena/sports-pattern candidate: 47/47
- Public site: v22 / 174 candidates; the local gymnasium expansion is not pushed or deployed

## Queue

- Hokkaido/Tohoku: 完了（北海道・山形・福島はwave 2、青森・岩手・宮城・秋田はwave 1）
- Kanto: 完了（茨城はwave 2、栃木・群馬・埼玉・千葉はwave 3、東京・神奈川はwave 4）
- Hokuriku/Koshinetsu: 完了（山梨・新潟はwave 4、富山・石川・福井・長野はwave 5）
- Tokai: 完了（岐阜・静岡・愛知・三重はwave 6）
- Kinki: 完了（滋賀・京都・大阪・兵庫はwave 7、奈良・和歌山はwave 8）
- Chugoku: 完了（鳥取・島根はwave 8、岡山・広島・山口はwave 9）
- Shikoku: 完了（徳島はwave 9、香川・愛媛・高知はwave 10）
- Kyushu/Okinawa: 完了（福岡はwave 10、佐賀・長崎・熊本・大分はwave 11、宮崎・鹿児島・沖縄はwave 12）
- Nationwide target: 達成（47都道府県、候補230件）。以後は既存候補の料金・運用・区画不足を深掘りする。

## Safety notes

- Preserve untracked overnight-run directories and `web-projects/`.
- Preserve `stash@{0}: preserve-canonical-pre-integration-20260805`.
- No push/deploy/publication during this run.
- Unknown or unreadable official facts remain blank or `要確認`.

## Completed Waves

| Wave | Time | Scope | Added | Validation | Commit | Notes |
|---|---|---|---:|---|---|---|
| 0 | 2026-08-05 02:49 JST | bootstrap | 0 | ledger OK | `5119446` | ledger and heartbeat created |
| 1 | 2026-08-05 02:56 JST | 青森・岩手・宮城・秋田 | 4 candidates / 4 details | audit 0 errors; lint OK; tests 3/3 | `7173a85` | fixed count assertion now follows CSV data |
| 2 | 2026-08-05 03:03 JST | 北海道・山形・福島・茨城 | 4 candidates / 4 details / 3 prices / 2 operations | audit 0 errors; lint OK; tests 3/3 | `8c04d2d` | price-count assertion now follows CSV data |
| 3 | 2026-08-05 03:07 JST | 栃木・群馬・埼玉・千葉 | 4 candidates / 4 details / 6 prices / 2 operations | audit 0 errors; lint OK; tests 3/3 | `36349f1` | 3-wave full verification checkpoint |
| 4 | 2026-08-05 03:19 JST | 東京・神奈川・山梨・新潟 | 4 candidates / 4 details / 6 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `fa8248c` | 料金追加目標15件に到達。上越の予定休館を明記 |
| 5 | 2026-08-05 03:28 JST | 富山・石川・福井・長野 | 4 candidates / 4 details / 7 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `27e958d` | 料金PDFを目視照合。運用追加目標10件にも到達 |
| 6 | 2026-08-05 03:36 JST | 岐阜・静岡・愛知・三重 | 4 candidates / 4 details / 6 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `256054a` | 3-wave full checkpoint。大垣の旧版料金は数値追加を保留 |
| 7 | 2026-08-05 03:46 JST | 滋賀・京都・大阪・兵庫 | 4 candidates / 4 details / 8 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `8cb8e3d` | 現行名称を確認。彦根・京都の料金PDFを目視照合し、姫路の将来改修予定を明記 |
| 8 | 2026-08-05 03:52 JST | 奈良・和歌山・鳥取・島根 | 4 candidates / 4 details / 7 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `679d668` | 奈良・鳥取の料金PDFを目視照合。和歌山の連続7日上限、松江の現行2026年度料金を明記 |
| 9 | 2026-08-05 03:58 JST | 岡山・広島・山口・徳島 | 4 candidates / 4 details / 7 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `eda592a` | 周南の現名称・2026料金と総社の新空調を反映。徳島の旧施行日料金は再確認注意を明記 |
| 10 | 2026-08-05 04:05 JST | 香川・愛媛・高知・福岡 | 4 candidates / 4 details / 9 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `6756506` | 愛媛の公式料金PDFを目視照合。春野の6,630席内訳、福岡の競技場限定運用と出店事前承認を明記 |
| 11 | 2026-08-05 04:11 JST | 佐賀・長崎・熊本・大分 | 4 candidates / 4 details / 9 prices / 4 operations | audit 0 errors; lint OK; tests 3/3 | `70dc417` | 佐賀・大分の2026料金PDFを目視照合。長崎の5,600席構成と熊本の営利・不特定多数利用条件を明記 |
| 12 | 2026-08-05 04:19 JST | 宮崎・鹿児島・沖縄 | 3 candidates / 3 details / 10 prices / 3 operations | audit 0 errors; lint OK; tests 3/3 | `cd2136c` | 全国47都道府県・候補230件に到達。宮崎・薩摩川内の料金PDFを目視照合し、沖縄の3,500席構成・6か月前予約・普通車408台を明記 |
| 13 | 2026-08-05 04:24 JST | 既存高評価4候補の運用深掘り | 4 operations | audit 0 errors; lint OK; tests 3/3 | `69ebe42` | 代々木の2026年度利用案内を目視照合。日本ガイシの搬入・物販・飲食、滋賀のWEB予約・Wi-Fi、加古川の4か月前抽選を明記 |
| 14 | 2026-08-05 04:26 JST | 既存高評価3候補の料金深掘り | 11 prices | audit 0 errors; lint OK; tests 3/3 | `7ea4077` | 東京体育館とセキスイハイムスーパーアリーナの料金PDFを目視照合。高崎アリーナの公式HTML料金表も確認。島津アリーナ京都は公式サイトの証明書不整合で保留 |
| 15 | 2026-08-05 04:29 JST | 既存高評価4候補の運用深掘り | 4 operations | audit 0 errors; lint OK; tests 3/3 | `3b37cd6` | 福岡の搬入・500台駐車、クラサスの3か月前受付・公園約5,000台、東京武道館の団体登録・70台、石川の3週間前打合せ・臨時店舗申請を明記 |
| 16 | 2026-08-05 04:31 JST | 既存高評価4候補の料金比較拡張 | 16 prices / 1 classification fix | audit 0 errors; generated 230/495 | `ab3c317` | 福岡・クラサス・東京武道館・石川の用途、曜日、観客席、入場料、照明、空調を補強。東京武道館の既存1件の用途誤分類を訂正 |
| 17 | 2026-08-05 04:33 JST | 既存高評価4候補の地域運用深掘り | 4 operations | audit 0 errors; generated 230/495 | `2e5e4fb` | マエダの次年度・年度途中貸切と1,015台、草薙のWEB予約・駐車制限、米子の年次調整・380台、群馬の新予約・1,643台・物販飲食申請を明記 |
| 18 | 2026-08-05 04:37 JST | 既存高評価4候補の地域料金深掘り | 16 prices | audit 0 errors; lint OK; tests 3/3 | `1578ad8` | マエダの照明・冷暖房・映像、草薙の2026年区分、米子の営利・入場料・空調、群馬の用途・入場料・照明を追加。草薙・群馬PDFを目視照合 |
| 19 | 2026-08-05 04:41 JST | 既存高評価4候補のアクセス・予約運用深掘り | 4 operations | audit 0 errors; generated 230/511 | `626c0af` | 北ガス札幌の駅・約100台・抽選申込、高知県民の通常2か月先抽選・82台・マイクロバス条件・物販/Wi-Fi申請、佐世保の165台・オンライン予約、小瀬の普通2,088台・大型93台・大会別申込を明記 |
| 20 | 2026-08-05 04:45 JST | 既存高評価3候補の用途・設備料金深掘り | 13 prices / 1 operation precision fix | audit 0 errors; generated 230/524; duplicate price IDs 0 | `4fcf6c7` | 北ガス札幌の土日祝・放送・映像・移動席、高知県民の入場有無・非営利/営利・照明、小瀬の非スポーツ・夜間・放送・冷暖房を追加。札幌駐車場を現行管理者情報の106台へ精密化 |
| 21 | 2026-08-05 04:48 JST | 東北4候補の運用・区画精度深掘り | 4 operations / 2 detail precision fixes | audit 0 errors; generated 230/524; lint OK; tests 3/3 | `e3799c2` | 青森市総合の298台・飲食物販条件、花巻の予約6か月前・駐車1,223台、仙台の2027年3月まで全館休館と通常駐車不可、由利本荘の1,000台・団体登録・Wi-Fi・宿泊を明記。花巻席数とナイス面積・固定席を精密化 |
| 22 | 2026-08-05 04:53 JST | 東北3候補の現行料金比較深掘り | 14 prices | audit 0 errors; generated 230/538 | `6a069f6` | 青森市総合の用途・入場料別と放送、ナイスの平日/土日祝・入場料別、郡山の全日・用途/興行別を追加。郡山PDFは画像照合。花巻は公式料金ページの更新が2019年で現行性を担保できず保留 |
| 23 | 2026-08-05 04:57 JST | 北海道・秋田・宮崎・富山4候補の運用深掘り | 4 operations / 1 missing detail | audit 0 errors; generated 230/538 | `2f44785` | 帯広の予約・320台・飲食、秋田の団体登録・382台・申込制限、延岡の2か月前窓口申込と準備時間、富山の予約システム・350台・60名宿泊を追加。延岡の約800台は計画値のため数値欄に入れず、帯広の欠落区画を2,806㎡・2,883席で補完 |
| 24 | 2026-08-05 05:02 JST | 北海道・秋田・宮崎・富山4候補の現行料金深掘り | 22 prices | audit 0 errors; generated 230/560; duplicate price IDs 0; lint OK; tests 3/3 | `dd376e3` | 帯広の用途・入場料・放送、秋田の2024年改定用途別、延岡の現行料金PDF、富山の2026年7月改定と照明・空調・映像を追加。秋田・延岡PDFは画像照合 |
| 25 | 2026-08-05 05:05 JST | 奈良・山口・山形・栃木4候補の運用深掘り | 4 operations / 1 detail precision fix | audit 0 errors; generated 230/560 | `0412425` | 奈良の3か月前抽選と9月休止、維新の1,251台・14日前手続・2026年8月から約1年休止、山形の1,200台・120名合宿、日環のWEB予約・時間内撤収を追加。山形を2,200㎡へ精密化 |
| 26 | 2026-08-05 05:10 JST | 奈良・山形・栃木3候補の現行料金比較深掘り | 21 prices | audit 0 errors; generated 230/581 | `7947160` | 奈良の2026年4月改定、山形の用途・入場料別、日環の税込用途別と照明・空調・放送を追加。日環PDFは画像照合し、休止中の維新は比較対象から除外 |
| 27 | 2026-08-05 05:16 JST | 茨城・長野・北海道・福島4候補の運用深掘り | 4 operations / 1 candidate risk precision fix | audit 0 errors; generated 230/581; lint OK; tests 3/3 | `a8b8001` | 水戸603台、長野500台・1か月前打合せ、旭川339台・翌月抽選、郡山153台・1か月前予約を追加。水戸・長野PDFは画像照合し、郡山の9月10日までの一般利用中止を明記 |
| 28 | 2026-08-05 05:22 JST | 長野・北海道2候補の料金比較深掘り | 13 prices / 2 candidate risk precision fixes | audit 0 errors; generated 230/594; duplicate price IDs 0 | `4f56fdc` | ホワイトリングのメイン・サブ・空調・照明・音響、旭川の用途・入場料・営利別を追加。長野は現行公式ページが案内する2019年10月開始表、旭川は2026年9月30日までの現行欄をPDF画像照合。水戸は現行の専用料金表を確認できず数値追加を保留 |
| 29 | 2026-08-05 05:29 JST | 岡山・静岡・愛知3候補の運用・区画深掘り | 3 operations / 1 detail / 2 detail-candidate precision fixes | audit 0 errors; generated 230/594; duplicate operation/detail IDs 0 | `52ae4b4` | 岡山の事前相談・清掃・Wi-Fi、浜松の12か月前抽選・30日前取消・650台、豊田の1か月前予約・543台を追加。浜松PDFは画像照合。豊田は固定3,440席・移動980席とサブ1,745㎡・550席へ精密化 |
| 30 | 2026-08-05 05:34 JST | 岡山・愛知2候補の現行料金比較深掘り | 14 prices / 4 source-conflict precision fixes | audit 0 errors; generated 230/608; duplicate price IDs 0; lint OK; tests 3/3 | `7e02376` | 岡山の2026年8月31日までの用途・曜日・空調・照明・音響と、豊田市の2026年3月更新料金を追加。豊田の市と指定管理者の席数・サブ面積・駐車台数の不一致を明記。浜松は2019年改正表のため数値追加を保留 |
| 31 | 2026-08-05 05:41 JST | 神戸・大阪・東京・岡山4候補の展示場運用深掘り | 4 operations | audit 0 errors; generated 230/608; duplicate operation IDs 0 | `06743ee` | 神戸・ATC・東京国際フォーラム・コンベックスの申込開始、搬入、駐車、設営撤去、飲食・通信を追加。神戸・ATC・コンベックスの現行PDFを画像照合 |
| 32 | 2026-08-05 05:44 JST | 神戸・大阪・岡山3候補の展示場料金深掘り | 17 prices / 4 details / 1 price precision fix | audit 0 errors; generated 230/625; duplicate price/detail IDs 0 | `0520d70` | 神戸の展示/集会/準備/時間外、ATCの分割/時間外、コンベックスの分割/時間帯/冷暖房を追加。ATC既存行の基本時間を9〜17時へ訂正。東京フォーラムは2023年適用表の現行性未解消のため保留 |
| 33 | 2026-08-05 05:49 JST | 茨城・兵庫・広島・大阪4候補の運用・休館深掘り | 4 operations / 1 detail / 2 detail-candidate precision fixes | audit 0 errors; generated 230/625; duplicate operation/detail IDs 0; lint OK; tests 3/3 | `d482921` | つくばの12か月前申込・5日上限、GLIONの大型搬入・来場者駐車なし、福山の6か月前予約・360台、EDIONの2026年4月〜2027年1月末予定全館休館を追加。EDION休館PDFを画像照合 |
| 34 | 2026-08-05 05:51 JST | 茨城・広島2候補の現行料金比較深掘り | 12 prices | audit 0 errors; generated 230/637; duplicate price IDs 0 | `f6fa725` | つくばの大会/非スポーツ・入場料・冷暖房・可動舞台と、福山のアマチュア/非営利/その他催物の日額・時間額を追加。閉館中EDIONと更新日不明GLION料金は保留 |
| 35 | 2026-08-05 06:01 JST | 愛媛・福岡・大阪・栃木4候補の運用・区画精度深掘り | 4 operations / 3 detail precision fixes | audit 0 errors; generated 230/637; duplicate operation/detail IDs 0 | `fd3c81a` | 愛媛の3か月前予約・219台、福岡国際センターの12か月前受付・搬入・夜間制約、グランキューブの2年前受付・304台・LAN、マロニエの2年前条件・450台・車両直接搬入を追加。福岡現行手引きを画像照合し、グランキューブの別区画席数混入を修正 |
| 36 | 2026-08-05 06:10 JST | 愛媛・大阪・栃木3候補の現行料金・分割区画深掘り | 31 prices / 9 details / 3 candidate-operation precision fixes | audit 0 errors; generated 230/668; duplicate IDs 0; lint OK; tests 3/3 | `31adb25` | 愛媛の2025年改定用途別、グランキューブの2025年適用興行・展示、マロニエの現行掲載料金を追加。公式料金表を画像照合し、古い改定表示は実予約時再確認を保持 |
| 37 | 2026-08-05 06:15 JST | 福岡・熊本・長野・静岡4候補の運用・仕様深掘り | 4 operations / 3 detail / 4 candidate precision fixes | audit 0 errors; generated 230/668; duplicate operation IDs 0 | `9588cc0` | 西日本総合展示場、パークドーム、エムウェーブ、ツインメッセの予約・搬入・駐車・通信等を追加。パークドーム専用約530台と公園約1,000台を分離し、M-Wave 2026年版手引きを照合 |
| 38 | 2026-08-05 06:19 JST | 福岡・熊本・静岡3候補の現行料金・分割区画深掘り | 24 prices / 7 details / 2 candidate precision fixes | audit 0 errors; generated 230/692; duplicate price/detail IDs 0 | `3f3d79b` | 西日本総合展示場の用途・分割、パークドームの用途・1/4、ツインメッセの北南・分割・空調等を追加。M-Waveの2019料金は保留 |
| 39 | 2026-08-05 06:23 JST | 大阪・広島・東京・愛媛4候補の運用・分割精度深掘り | 4 operations / 3 details / 4 candidate precision fixes | audit 0 errors; generated 230/692; duplicate operation/detail IDs 0; lint OK; tests 3/3 | `973b6b4` | RACTAB、広島中小企業会館、プリズム、愛媛県民文化会館の運用を追加。駐車数の公式不一致と半面同時開催条件を保持 |
| 40 | 2026-08-05 06:29 JST | 広島・東京・愛媛3候補の現行料金・分割区画深掘り | 25 prices / 3 details / 2 price precision fixes / 3 candidate precision fixes | audit 0 errors; generated 230/717; duplicate price/detail IDs 0 | `96e8b6f` | 愛媛県民文化会館の旧料金を2025年施行の現行額へ訂正。プリズムの分割・設営・空調・音響と広島の区画別・入場料徴収時料金を追加 |
| 41 | 2026-08-05 06:33 JST | 広島・京都4ホールの予約・搬入・配信運用深掘り | 4 operations / 3 detail precision fixes / 4 candidate precision fixes | audit 0 errors; generated 230/717; duplicate operation/detail IDs 0 | `8bb5e71` | 広島国際会議場、ロームシアター、京都コンサートホール、リーデンローズの受付・駐車・搬入・物販・回線を追加。専用/隣接駐車と共用/専用回線を分離 |
| 42 | 2026-08-05 06:36 JST | 京都2ホールの現行掲載料金比較深掘り | 32 prices / 2 candidate precision fixes | audit 0 errors; generated 230/749; duplicate price IDs 0; lint OK; tests 3/3 | `fcc1c87` | ロームシアターのメイン・サウス・ノース・専用回線、京都コンサートホールの曜日・入場料帯・配信回線を追加。古い又は施行日不明資料は注意を保持 |
| 43 | 2026-08-05 06:39 JST | 島根・大阪・栃木4アリーナ/スタジアムの運用深掘り | 4 operations / 4 candidate precision fixes | audit 0 errors; generated 230/749; duplicate operation IDs 0 | `69ba924` | カミアリーナ、Panasonic Stadium、ヤンマースタジアム、足利の予約・駐車・搬入を追加。公園共用駐車を専用欄から除外し長居の現行規制を反映 |
| 44 | 2026-08-05 06:42 JST | 島根・大阪3スポーツ施設の現行料金深掘り | 28 prices / 1 price precision fix / 2 candidate precision fixes | audit 0 errors; generated 230/777; duplicate price IDs 0 | `cf03ea0` | カミアリーナ2026改定、長居の用途・スタンド・入場料・曜日、Panasonic Stadium附属設備を追加。倍率計算と税不明を明示 |
| 45 | 2026-08-05 06:46 JST | 京都・広島・神奈川4スタジアムの運用深掘り | 4 operations / 1 detail precision fix / 1 candidate precision fix | audit 0 errors; generated 230/777; duplicate operation IDs 0; lint OK; tests 3/3 | `1188623` | サンガ、ピースウイング、日産、横浜のアクセス・予約・駐車を追加。横浜のコンサート最大32,000人を固定席と分離して反映 |
| 46 | 2026-08-05 06:50 JST | 広島サッカースタジアムの現行料金深掘り | 16 prices / 1 operation precision fix / 1 candidate precision fix | audit 0 errors; generated 230/793; duplicate price IDs 0 | `ef0d9f2` | ピースウイングのフィールド・スタンド、照明・音響・映像・総合演出・駐車場専有を公式画像で目視照合。施行日・税不明を保持 |
| 47 | 2026-08-05 06:54 JST | 青森・滋賀・和歌山・広島4アリーナの運用・区画深掘り | 4 operations / 5 details / 4 candidate precision fixes / 1 coverage snapshot fix | audit 0 errors; generated 230/793; duplicate detail/operation IDs 0 | `2dd6748` | オカでん/マエダの名称混同を解消し、区画・予約・駐車・床保護を追加。青森の2026国スポ一般利用停止も反映 |
| 48 | 2026-08-05 06:58 JST | 青森・滋賀・和歌山・広島4アリーナの現行料金深掘り | 37 prices / 1 detail | audit 0 errors; generated 230/830; duplicate price IDs 0; lint OK; tests 3/3 | `4cc8c7a` | 青森の合算料金、滋賀の時間帯別、和歌山の2022適用現行案内、サンチェリーの分割・附属設備を追加 |
| 49 | 2026-08-05 07:04 JST | 東京・兵庫・大阪・広島4ドーム/スタジアムの運用・区画深掘り | 4 operations / 3 details / 2 candidate precision fixes | audit 0 errors; generated 230/830; duplicate detail/operation IDs 0 | `402e4eb` | arena/sports-pattern未整備4候補を補完。長居24,665/20,000人の公式内不一致と広島利用案内の古さを保持 |
| 50 | 2026-08-05 07:10 JST | YANMAR HANASAKA STADIUMの現行料金・スタンド区画深掘り | 18 prices / 4 details | audit 0 errors; generated 230/848; duplicate price/detail IDs 0 | `ebeaa45` | グラウンド、4スタンド、映像・音響・照明・競技用具、南北練習室を分離。倍率派生額は作らず公式規定を注記 |
| 51 | 2026-08-05 07:19 JST | 八戸・盛岡2アリーナの現行料金深掘り | 25 prices | audit 0 errors; generated 230/873; duplicate price IDs 0; lint OK; tests 3/3 | `8930da0` | 八戸2026年7月改定と盛岡2026年4月改定をPDF画像照合。用途・入場料・市内外・曜日・時間帯・附属設備を分離 |
| 52 | 2026-08-05 07:20 JST | 横浜・広島2大規模アリーナの現行料金深掘り | 25 prices / 2 candidate precision fixes | audit 0 errors; generated 230/898; duplicate price IDs 0 | `d4d088c` | 横浜2026年4月現在表と広島2024年4月施行現行表を画像照合。税別/税込、用途、入場料、時間帯を分離 |
| 53 | 2026-08-05 07:26 JST | 横浜BUNTAIの現行料金深掘り | 19 prices / 1 candidate precision fix | audit 0 errors; generated 230/917; duplicate price IDs 0 | `82dc190` | 2026年1月版A/B/C区分の本番・準備と空調・音響・照明・大型映像を追加。沖縄・TOYOTAの非公開料金は保留 |
| 54 | 2026-08-05 07:27 JST | 京王アリーナTOKYOの現行料金深掘り | 32 prices / 1 candidate precision fix | audit 0 errors; generated 230/949; duplicate price IDs 0; lint OK; tests 3/3 | `90558dc` | メイン/サブのスポーツ・商業イベント全日と映像・音響・照明・仮設席等を公式PDF画像で照合。税込表記を反映 |
| 55 | 2026-08-05 07:31 JST | 島津アリーナ京都の現行料金深掘り | 20 prices / 1 candidate / 1 operation precision fix | audit 0 errors; generated 230/969; duplicate price IDs 0 | `3a58917` | 2025年4月改定表を画像照合。第1/第2競技場の用途・入場料・営利・曜日別全日額を分離し、証明書不整合を注意として保持 |
| 56 | 2026-08-05 07:33 JST | 島津アリーナ京都の現行附属設備料金深掘り | 13 prices | audit 0 errors; generated 230/982; duplicate price IDs 0 | `02684cf` | 2025年4月改定表から競技用具・舞台・音響・映像・移動席・第1/第2冷暖房を画像照合して追加 |
| 57 | 2026-08-05 07:36 JST | 京王アリーナTOKYOのスポーツ料金補完 | 24 prices | audit 0 errors; generated 230/1006; duplicate price IDs 0; lint OK; tests 3/3 | `0e2b5d2` | メイン有料観戦スポーツとサブのA/B区分・全面/半面・入場料帯を補完し、料金観測1000件を突破 |
| 58 | 2026-08-05 07:40 JST | 東京有明アリーナの現行メイン料金深掘り | 24 prices / 1 candidate / 1 operation precision fix | audit 0 errors; generated 230/1030; duplicate price IDs 0 | `11a815f` | 旧2022年版を2026年2月現在Ver.8.0へ更新。本番/準備、スポーツ/興行/式典展示/コンサート、曜日別を画像照合 |
| 59 | 2026-08-05 07:42 JST | 東京有明アリーナの現行サブ料金深掘り | 16 prices | audit 0 errors; generated 230/1046; duplicate price IDs 0 | `936f2a2` | サブ全面のスポーツ入場有無、式典展示、物販について本番/準備・曜日別全日額を画像照合 |
| 60 | 2026-08-05 07:44 JST | 東京有明アリーナの現行設備料金深掘り | 20 prices | audit 0 errors; generated 230/1066; duplicate price IDs 0; lint OK; tests 3/3 | `f97e9d1` | 音響・センターハング/大型ビジョン・仮設床・メイン/サブ空調・基本照明を用途別に画像照合 |
| 61 | 2026-08-05 07:47 JST | 真駒内アイスアリーナの夏期全館料金深掘り | 16 prices / 1 candidate precision fix | audit 0 errors; generated 230/1082; duplicate price IDs 0 | `b27cea8` | 2026更新公式サイト再掲の2023年4月現在表からスポーツ/集会/展示/催物・入場料・曜日別全日額を追加 |
| 62 | 2026-08-05 07:49 JST | 真駒内アイスアリーナの冬期全館料金深掘り | 16 prices | audit 0 errors; generated 230/1098; duplicate price IDs 0 | `0ece006` | 夏期と同じ用途軸の冬期全日額を追加し、季節差を比較可能にした |
| 63 | 2026-08-05 07:50 JST | 真駒内アイスアリーナの設備料金深掘り | 8 prices | audit 0 errors; generated 230/1106; duplicate price IDs 0; lint OK; tests 3/3 | `823ef7d` | 放送室・電光設備・床養生・競技用具を追加。HAPPINESS ARENAの非公開貸館料金は保留 |
| 64 | 2026-08-05 07:57 JST | セーレン・ドリームアリーナの現行メイン料金深掘り | 16 prices / 1 candidate / 1 operation precision fix | audit 0 errors; generated 230/1122; duplicate price IDs 0 | `38ed138` | 2024年4月改正表を現在の県公式案内から画像照合。学生等/一般、入場料帯、通常/大会継続夜間、非スポーツを分離。県外5割・休日2割加算は派生額を作らず保持 |
| 65 | 2026-08-05 07:58 JST | セーレン・ドリームアリーナのメイン設備料金深掘り | 10 prices | audit 0 errors; generated 230/1132; duplicate price IDs 0 | `0ab9e81` | メイン全面/1/2/1/3/1/4の照明と全面冷暖房を学生等/一般で分離。施設基本料と加算額を混ぜず保持 |
| 66 | 2026-08-05 08:00 JST | セーレン・ドリームアリーナのサブ料金深掘り | 12 prices | audit 0 errors; generated 230/1144; duplicate price IDs 0; lint OK; tests 3/3 | `ca82616` | サブ全面の通常/大会継続夜間と、全面/半面の照明・冷暖房を学生等/一般で分離。3波チェック合格 |
| 67 | 2026-08-05 08:02 JST | セーレン・ドリームアリーナの多目的・会議室深掘り | 4 details / 12 prices | audit 0 errors; generated 230/1156; duplicate detail/price IDs 0 | `d6ff987` | 多目的室と会議室3室を追加。定員、分割、音響等込み、照明・冷暖房条件を分離し、倍率のみの冷暖房は派生額を作らず保持 |
| 68 | 2026-08-05 08:05 JST | サンガスタジアムの支援区画深掘り | 2 details / 8 prices / 1 operation / 1 candidate precision fix | audit 0 errors; generated 230/1164; duplicate IDs 0 | `a448b2e` | 会議室AとスタジオA/Bセットの現行税込料金・予約条件を追加。スタジアム本体の非公開催事料金とは分離 |
| 69 | 2026-08-05 08:07 JST | サンガスタジアム支援区画の設備料金深掘り | 17 prices | audit 0 errors; generated 230/1181; duplicate price IDs 0; lint OK; tests 3/3 | `3ae558e` | 会議室Aの音響・映像・舞台設備とスタジオの運動用具・音響・プロジェクター・シャワーを追加。3波チェック合格 |
| 70 | 2026-08-05 08:08 JST | 日産スタジアムの現行基本料金確認 | 1 price / 1 candidate precision fix | audit 0 errors; generated 230/1182; duplicate price IDs 0 | `4eb0e6b` | フィールド・全スタンドのプロ基本144万円を追加。アマチュア約1/5は概算のため派生額を作らず、優先利用・別加算を保持 |
| 71 | 2026-08-05 08:11 JST | FUKAI SQUARE GARDEN足利の現行料金深掘り | 13 prices / 1 candidate precision fix | audit 0 errors; generated 230/1195; duplicate price IDs 0 | `16e6acc` | 2024年10月施行の税込改定表を画像照合。スポーツ/集会/営利の午前・午後・夜・全日と電光掲示板を分離 |
| 72 | 2026-08-05 08:16 JST | サンガスタジアム貸会議室群の比較深掘り | 7 details / 37 prices | audit 0 errors; generated 230/1232; duplicate IDs 0; lint OK; tests 3/3 | `99eca09` | B-1/D-1/F-1/G/H-1/I-1/J-1の面積・定員と午前/午後/夜/全日/区分外料金を現行公式HTMLから追加。大中小会議室を同軸化 |
| 73 | 2026-08-05 08:21 JST | アダストリアみとアリーナの現行条例料金深掘り | 3 details / 9 prices / 1 candidate / 1 detail precision fix | audit 0 errors; generated 230/1241; duplicate IDs 0 | `4787066` | 市議会の原案可決結果と条例改正議案を照合。全面1時間の用途・入場料・スイート有無と6/8/9人部屋料金を追加し、固定席内訳を市資料へ精密化 |
| 74 | 2026-08-05 08:23 JST | アダストリアみとアリーナの支援区画深掘り | 6 details / 1 detail precision fix | audit 0 errors; generated 230/1241; duplicate IDs 0 | `373f8ae` | 市公式施設概要PDFを画像照合。レスリング/フェンシング/ボクシング/トレーニング/多目的/会議室を追加し、サブ席数を198（固定192）へ補完 |
| 75 | 2026-08-05 08:25 JST | サンガスタジアムVIP・スカイボックス深掘り | 3 details / 18 prices / 1 candidate precision fix | audit 0 errors; generated 230/1259; duplicate IDs 0; lint OK; tests 3/3 | `679d184` | VIPエリアとスカイボックスA/Bの面積・定員、午前/午後/夜/全日/区分外/通常時間外を現行公式HTMLから追加。接遇区画と通常会議室を分離 |
| 76 | 2026-08-05 08:27 JST | アダストリアみとアリーナの分割料金深掘り | 8 prices / 1 candidate precision fix | audit 0 errors; generated 230/1267; duplicate IDs 0 | `b35ecd2` | 指定管理者の現行料金HTMLからバドミントン1面、1/3、半面、全面を高校生以下/一般で追加。条例議案のみだった現行性を運営者掲載でも確認 |
| 77 | 2026-08-05 08:29 JST | アダストリアみとアリーナの大型映像料金深掘り | 12 prices | audit 0 errors; generated 230/1279; duplicate IDs 0 | `e857b25` | 壁面型/4面型/帯型をアマチュア/その他・入場料有無で分離し、現行指定管理者HTMLの1時間額を追加 |
| 78 | 2026-08-05 08:31 JST | アダストリアみとアリーナの多目的室深掘り | 3 details / 24 prices | audit 0 errors; generated 230/1303; duplicate IDs 0; lint OK; tests 3/3 | `6b5b220` | 料金ページ内の別施設区画を東町運動公園へ誤帰属。wave 79で出典境界を再監査し訂正済み。3波チェック自体は合格 |
| 79 | 2026-08-05 08:37 JST | 水戸料金ページの施設境界監査・訂正 | -3 details / -6 net prices（24誤帰属を除去・18正規料金を追加） | audit 0 errors; generated 230/1297; duplicate IDs 0 | `c28a7ed` | 東町運動公園のHTMLブロック1514を特定。誤った主競技場の大/中/小料金を除き、多目的室・会議室の1室/1/2室/1/4室・1時間料金へ差替え |
| 80 | 2026-08-05 08:39 JST | アダストリアみとアリーナの支援室・照明料金深掘り | 22 prices | audit 0 errors; generated 230/1319; duplicate IDs 0 | `f31752f` | レスリング/ボクシング/フェンシング6件、放送1件、メイン/サブ照明15件を東町運動公園区画から追加。原文の不自然な表記1件は要確認付きで保持 |
| 81 | 2026-08-05 08:40 JST | アダストリアみとアリーナのサブ・個人料金深掘り | 9 prices | audit 0 errors; generated 230/1328; duplicate IDs 0; lint OK; tests 3/3 | `4d0846d` | サブのバドミントン1面・全面を用途/入場料で7件、トレーニング高校生以下/一般を2件追加。3波チェック合格 |
| 82 | 2026-08-05 08:44 JST | 熊本県立総合体育館の全館料金深掘り | 3 details / 39 prices | audit 0 errors; generated 230/1367; duplicate IDs 0 | `b379dfb` | 現行指定管理者HTMLから大/中/小体育室の個人・専用・設備、トレーニング、会議室を税込で追加。小体育室422㎡等も区画化 |
| 83 | 2026-08-05 08:48 JST | 佐世保市体育文化館の大体育室料金訂正・深掘り | 2 details / 22 prices / 1 price correction | audit 0 errors; generated 230/1389; duplicate IDs 0 | `41d66a0` | 市公式現行ページと2024年料金PDFを画像照合。大体育室営利額を233,280円へ訂正し、専用・練習料金を補完。小体育室768㎡・ホール600人も区画化 |
| 84 | 2026-08-05 08:50 JST | 佐世保市体育文化館の小体育室・ホール料金深掘り | 25 prices | audit 0 errors; generated 230/1414; duplicate IDs 0; lint OK; tests 3/3 | `d002558` | 小体育室の専用・市内外練習17件、600人ホールの曜日/時間帯・控室8件を追加。PDF画像照合、3波チェック合格 |
| 85 | 2026-08-05 08:52 JST | 佐世保市体育文化館の支援室・器具料金深掘り | 4 details / 25 prices | audit 0 errors; generated 230/1439; duplicate IDs 0 | `9dd4f3a` | 選手控室/ミーティング/役員/会議室を区画化し、専用付帯・市内外個別12件と体育館音響・器具13件を画像照合して追加 |
| 86 | 2026-08-05 08:54 JST | 佐世保市体育文化館の空調料金深掘り | 18 prices | audit 0 errors; generated 230/1457; duplicate IDs 0 | `9b9d2e3` | 大体育室/観客席/小体育室/600人ホールの冷暖房・送風12件と、ミーティング/選手控室のコイン空調6件を30分・硬貨単位で追加 |
| 87 | 2026-08-05 08:56 JST | 佐世保市体育文化館の練習照明料金深掘り | 34 prices | audit 0 errors; generated 230/1491; duplicate IDs 0; lint OK; tests 3/3 | `74627ec` | 大体育室5照度×全面/競技面/Dバンク25件、小体育室半灯/全灯/観客席9件を30分単位で追加。3波チェック合格 |
| 88 | 2026-08-05 08:59 JST | EBARA WAVE アリーナおおたの区内料金深掘り | 5 details / 29 prices | audit 0 errors; generated 230/1520; duplicate IDs 0 | `b1d35a4` | サブ646㎡/固定200席、体育室2室、3分割会議室、控室を区画化。メイン全面/半面とサブの区内曜日・時間帯料金を税込で追加 |
| 89 | 2026-08-05 09:02 JST | EBARA WAVE アリーナおおたの区外料金深掘り | 30 prices / 1 candidate precision fix | audit 0 errors; generated 230/1550; duplicate IDs 0 | `30e328f` | メイン全面/半面とサブの区外曜日・時間帯を税込で追加。区外半面平日全日の公開額が時間帯合計と不一致のため候補注意にも保持 |
| 90 | 2026-08-05 09:03 JST | EBARA WAVE アリーナおおたの全館催事料金深掘り | 14 prices | audit 0 errors; generated 230/1564; duplicate IDs 0; lint OK; tests 3/3 | `7c9348e` | 弓道場除く全施設貸切を入場料帯・用途・曜日・区内外で分離。税込、準備後片付け込み。3波チェック合格 |
| 91 | 2026-08-05 09:08 JST | EBARA WAVE アリーナおおたの体育室区内料金深掘り | 20 prices | audit 0 errors; generated 230/1584; duplicate price IDs 0 | `8f82d7c` | 体育室1・2の平日/土日休日、4時間帯/全日を区内利用で分離。税込、準備後片付け込み、ボール等の危険利用不可を保持 |
| 92 | 2026-08-05 09:10 JST | EBARA WAVE アリーナおおたの会議室・控室区内料金深掘り | 30 prices | audit 0 errors; generated 230/1614; duplicate price IDs 0 | `8947709` | 会議室全室と控室1・2の平日/土日休日、4時間帯/全日を区内利用で分離。控室単独利用不可を保持 |
| 93 | 2026-08-05 09:12 JST | EBARA WAVE アリーナおおたの体育室・会議室区外料金深掘り | 30 prices | audit 0 errors; generated 230/1644; duplicate price IDs 0; lint OK; tests 3/3 | `2f2ade4` | 体育室1・2と会議室全室の平日/土日休日、4時間帯/全日を区外利用で補完。3波チェック合格 |
| 94 | 2026-08-05 09:14 JST | EBARA WAVE アリーナおおたの控室区外料金深掘り | 20 prices | audit 0 errors; generated 230/1664; duplicate price IDs 0 | `ac95468` | 控室1・2の平日/土日休日、4時間帯/全日を区外利用で補完。控室単独利用不可を保持 |
| 95 | 2026-08-05 09:16 JST | EBARA WAVE アリーナおおたの弓道場・個人開放深掘り | 1 detail / 16 prices | audit 0 errors; generated 230/1680; duplicate IDs 0 | `477b4d4` | 近的28m・5人立を区画化。弓道個人/貸切の区内外・3区分とバスケ/バドミントン/卓球個人開放を現行HTMLから追加 |
| 96 | 2026-08-05 09:18 JST | EBARA WAVE アリーナおおたの支援区画・駐車・弓道運用深掘り | 3 details / 2 prices / 1 operation | audit 0 errors; generated 230/1682; duplicate IDs 0; lint OK; tests 3/3 | `e9f5c8c` | 放送室・多目的更衣室・審判員室を区画化。普通/大型車駐車料金と弓道の登録・予約条件を追加し、公式表の重複区分名は推定せず保持 |
| 97 | 2026-08-05 09:22 JST | 千葉ポートアリーナのサブ・トレーニング区画深掘り | 3 details / 20 prices | audit 0 errors; generated 230/1702; duplicate IDs 0 | `3b625d0` | サブ769.6㎡・可動140席、トレーニング2 116㎡、休止中体力測定134.4㎡を区画化。サブ専用/個人とトレーニング2専用/個人料金を追加 |
| 98 | 2026-08-05 09:24 JST | 千葉ポートアリーナの平日催事料金深掘り | 16 prices | audit 0 errors; generated 230/1718; duplicate price IDs 0 | `2469fbf` | メイン全面の入場料徴収アマチュア、展示営利、集会催事、プロ/コンサートを平日3区分/全日で分離 |
| 99 | 2026-08-05 09:26 JST | 千葉ポートアリーナの土日祝催事料金深掘り | 16 prices | audit 0 errors; generated 230/1734; duplicate price IDs 0; lint OK; tests 3/3 | `061f59b` | wave 98と同じ4用途を土日祝3区分/全日で補完。3波チェック合格 |
| 100 | 2026-08-05 09:27 JST | 千葉ポートアリーナの映像・音響・養生設備深掘り | 13 prices | audit 0 errors; generated 230/1747; duplicate price IDs 0 | `127bf6c` | メイン照明/映像/放送、サブ冷暖房/放送、トレーニング2放送、得点板、フロアシート、移動席、電源等を分離 |
| 101 | 2026-08-05 09:29 JST | 千葉ポートアリーナの支援室・競技用具深掘り | 3 details / 19 prices | audit 0 errors; generated 230/1766; duplicate IDs 0 | `1fb3236` | 控室等支援室、研修室、更衣シャワー室を区画化。時間帯/時間外料金と10種の競技用具料金を追加 |
| 102 | 2026-08-05 09:31 JST | 千葉ポートアリーナのフロア・舞台・許可料金深掘り | 19 prices | audit 0 errors; generated 230/1785; duplicate price IDs 0; lint OK; tests 3/3 | `a77fe17` | 競技フロア6件、舞台設備6件、机椅子ロッカー3件、物販/広告/撮影/放映許可4件を追加。3波チェック合格 |
| 103 | 2026-08-05 09:34 JST | 千葉ポートアリーナの分割・年齢別全日料金深掘り | 23 prices | audit 0 errors; generated 230/1808; duplicate price IDs 0 | `439e4a9` | メイン全面/2/3/半面/1/3を一般・中高校生・小学生以下、平日/土日祝の全日額で補完 |
| 104 | 2026-08-05 09:36 JST | 千葉ポートアリーナの一般分割時間帯料金深掘り | 24 prices | audit 0 errors; generated 230/1832; duplicate price IDs 0 | `4126d3b` | メイン全面/2/3/半面/1/3の一般料金を平日/土日祝、午前/午後/夜間で補完 |
| 105 | 2026-08-05 09:38 JST | 千葉ポートアリーナのサブ・トレーニング年齢別料金深掘り | 24 prices | audit 0 errors; generated 230/1856; duplicate price IDs 0; lint OK; tests 3/3 | `6e49a8c` | サブの中高校生/小学生以下を平日/土日祝4区分、トレーニング2を年齢別4区分で補完。3波チェック合格 |
| 106 | 2026-08-05 09:40 JST | 千葉ポートアリーナのサブ平日催事料金深掘り | 16 prices | audit 0 errors; generated 230/1872; duplicate price IDs 0 | `d1b606a` | 入場料徴収アマチュア、展示営利、集会催事、プロ/コンサートを平日3区分/全日で分離 |
| 107 | 2026-08-05 09:42 JST | 千葉ポートアリーナのサブ土日祝催事料金深掘り | 16 prices | audit 0 errors; generated 230/1888; duplicate price IDs 0 | `5c55df2` | wave 106と同じ4用途を土日祝3区分/全日で補完 |
| 108 | 2026-08-05 09:45 JST | 千葉ポートアリーナのトレーニング室1・個人利用券深掘り | 1 detail / 17 prices / 1 operation | audit 0 errors; generated 230/1905; duplicate IDs 0; lint OK; tests 3/3 | `974c8ed` | 259.2㎡・29種34台を区画化。年齢別2時間券・超過、回数券、定期券、駐車割引と当日受付・証明条件を分離 |
| 109 | 2026-08-05 09:49 JST | 東和薬品RACTABドームの季節構成・支援区画深掘り | 9 details / 1 candidate precision fix | audit 0 errors; generated 230/1905; duplicate IDs 0 | `b128351` | メインのプール・秋期フロア・冬期リンク、サブ/サブプール、トレーニング、多目的・大小会議室を季節・用途別に分離 |
| 110 | 2026-08-05 09:51 JST | 東和薬品RACTABドームのプール・トレーニング個人料金深掘り | 14 prices / 1 operation | audit 0 errors; generated 230/1919; duplicate IDs 0 | `ae03b75` | プールの年齢別1回/11回券・団体段階料金と、トレーニングの都度/回数/定期券、初回講習・年齢条件を分離 |
| 111 | 2026-08-05 09:53 JST | 東和薬品RACTABドームの卓球台開放・冬期スケート料金深掘り | 1 detail / 15 prices / 2 operations | audit 0 errors; generated 230/1934; duplicate IDs 0; lint OK; tests 3/3 | `e7a957b` | 卓球の時間帯別年齢料金、スケートの個人/団体段階/観覧料金を追加。卓球の物理区画は推定せず要確認で保持 |
| 112 | 2026-08-05 09:58 JST | 花巻市総合体育館のアリーナ・支援区画深掘り | 4 details / 1 candidate precision fix | audit 0 errors; generated 230/1934; duplicate IDs 0 | `9eb4f5f` | 市現行料金画像と運営団体PDFを画像照合。第2・第3アリーナ、多目的、トレーニングを区画化し掲載額一致を確認 |
| 113 | 2026-08-05 10:00 JST | 花巻市総合体育館の第1アリーナ現行料金深掘り | 18 prices | audit 0 errors; generated 230/1952; duplicate price IDs 0 | `ea06da2` | 全面の一般/小中高校生/営利、平日/土日休日、朝/昼/夜の1時間額を市現行画像と運営団体PDFで照合 |
| 114 | 2026-08-05 10:02 JST | 花巻市総合体育館の第2アリーナ現行料金深掘り | 18 prices | audit 0 errors; generated 230/1970; duplicate price IDs 0; lint OK; tests 3/3 | `291a861` | 全面の一般/小中高校生/営利、平日/土日休日、朝/昼/夜の1時間額を二つの公式掲載で照合。3波チェック合格 |
| 115 | 2026-08-05 10:04 JST | 花巻市総合体育館の第3アリーナ現行料金深掘り | 18 prices | audit 0 errors; generated 230/1988; duplicate price IDs 0 | `3aff0a1` | 全面の一般/小中高校生/営利、平日/土日休日、朝/昼/夜の1時間額を二つの公式掲載で照合 |
| 116 | 2026-08-05 10:06 JST | 花巻市総合体育館の多目的ルーム現行料金深掘り | 18 prices | audit 0 errors; generated 230/2006; duplicate price IDs 0 | `a8c0537` | 一般/小中高校生/営利、平日/土日休日、朝/昼/夜の1時間額を二つの公式掲載で照合。料金観測2,000件を突破 |
| 117 | 2026-08-05 10:08 JST | 花巻市総合体育館の個人利用・照明空調料金深掘り | 19 prices | audit 0 errors; generated 230/2025; duplicate price IDs 0; lint OK; tests 3/3 | `a3e22df` | トレーニング/3アリーナ個人8件、3アリーナ照明暖冷房9件、多目的暖冷房2件を追加。倍率派生額は作らず保持 |
| 118 | 2026-08-05 10:10 JST | 花巻市総合体育館の共用附属設備料金深掘り | 1 detail / 30 prices | audit 0 errors; generated 230/2055; duplicate IDs 0 | `694c688` | 競技用具・得点表示・放送・吊物・移動ステージ・机椅子・持込電源を一般/小中高校生で分離。採暖設備の不明瞭な単位は保留 |
| 119 | 2026-08-05 10:14 JST | 維新大晃アリーナの支援・会議区画深掘り | 8 details / 1 candidate precision fix | audit 0 errors; generated 230/2055; duplicate IDs 0 | `d64a7de` | 2025年4月版PDF全4ページを画像照合。レクチャー、視聴覚、図書、会議2室、控室群、入口、共用器具を区画化し8月から約1年休館を明記 |
| 120 | 2026-08-05 10:16 JST | 維新大晃アリーナの全面催事料金深掘り | 12 prices | audit 0 errors; generated 230/2067; duplicate price IDs 0; lint OK; tests 3/3 | `c2a621e` | 料金徴収有無×スポーツ文化/非営利催物/営利催物×平日/休日の9〜21時料金を追加。休館中利用不可を各観測に保持 |
| 121 | 2026-08-05 10:18 JST | 維新大晃アリーナの分割競技・照明料金深掘り | 16 prices | audit 0 errors; generated 230/2083; duplicate price IDs 0 | `2219bcb` | 1/24卓球・1/12バド等・1/3バスケ/バレー・1/2ハンド/ドッジの一般全日8件と、分割/全面照明8件を追加 |
| 122 | 2026-08-05 10:22 JST | 維新大晃アリーナの空調・競技器具料金深掘り | 29 prices | audit 0 errors; generated 230/2112; duplicate price IDs 0 | `f3f18d1` | アリーナ/レクチャー/入口/控室の冷暖房9件と、競技用具・得点板・養生・放送・通信等20件を追加 |
| 123 | 2026-08-05 10:27 JST | 維新大晃アリーナのシャワー・光熱・映写料金深掘り | 1 detail / 16 prices | audit 0 errors; generated 230/2128; duplicate IDs 0; lint OK; tests 3/3 | `6e5d55b` | 受付室を区画化。温水/コインシャワー、水道、電気、給湯室、クロス、映写機/スクリーン、受付室空調を追加 |
| 124 | 2026-08-05 10:27 JST | カメイアリーナ仙台の競技・諸室区画深掘り | 9 details | audit 0 errors; generated 230/2128; duplicate detail IDs 0 | `f1301f0` | 第2競技場、25mプール、トレーニング/体育/体力測定/軽運動、研修3室、会議、幼児体育室を区画化 |
| 125 | 2026-08-05 10:27 JST | カメイアリーナ仙台の第1競技場料金深掘り | 12 prices | audit 0 errors; generated 230/2140; duplicate price IDs 0 | `3ea5ed0` | アマチュアスポーツの入場料有無×営利有無×午前/午後/夜間を追加。土日祝2割増は派生させず保持 |
| 126 | 2026-08-05 10:34 JST | カメイアリーナ仙台の料金版監査・第2競技場深掘り | 12 price corrections / 12 prices | audit 0 errors; generated 230/2152; duplicate price IDs 0; lint OK; tests 3/3 | `2929084` | 現行ページ直リンクの旧2019年4月表を市の改定案内が指定する2019年10月表へ訂正。第2競技場12件も追加 |
| 127 | 2026-08-05 10:36 JST | カメイアリーナ仙台の個人利用・照明料金深掘り | 19 prices | audit 0 errors; generated 230/2171; duplicate price IDs 0 | `96905d9` | 競技場/トレーニング/体力測定の個人8件、2競技場の照度・時間帯別照明11件を追加 |
| 128 | 2026-08-05 10:38 JST | カメイアリーナ仙台の冷暖房・放送・養生料金深掘り | 2 details / 23 prices | audit 0 errors; generated 230/2194; duplicate IDs 0 | `d39057e` | 支援室/共用器具を区画化し、放送3、冷暖房12、養生・席・得点板・電源8件を追加 |
| 129 | 2026-08-05 10:41 JST | カメイアリーナ仙台の舞台設備・温水プール料金深掘り | 13 prices | audit 0 errors; generated 230/2207; duplicate price IDs 0; lint OK; tests 3/3 | `ef8b4ff` | 仮設舞台・吊物・演台・ピアノ9件と、温水プール年齢/超過4件を追加。検証用一時ファイルを削除 |
| 130 | 2026-08-05 10:44 JST | トッケイセキュリティ平塚総合体育館の区画・現行料金深掘り | 9 details / 9 prices | audit 0 errors; generated 230/2216; duplicate IDs 0 | `ee87793` | 第2/3体育室、武道2室、会議2室、弓道、トレーニング、プールを区画化。空調/個人/レンタルを追加 |
| 131 | 2026-08-05 10:48 JST | トッケイセキュリティ平塚総合体育館の第1体育室分割料金深掘り | 16 prices | audit 0 errors; generated 230/2232; duplicate price IDs 0 | `6e1f142` | 一般/中学生以下×市内外×1/3・1/2・2/3・全面を追加。公式PDF全2ページ画像照合 |
| 132 | 2026-08-05 10:50 JST | トッケイセキュリティ平塚総合体育館の大学生・高校生分割料金深掘り | 16 prices | audit 0 errors; generated 230/2248; duplicate price IDs 0; lint OK; tests 3/3 | `bf1419f` | 大学生/高校生×市内外×1/3・1/2・2/3・全面を追加。3波チェック合格 |
| 133 | 2026-08-05 10:52 JST | トッケイセキュリティ平塚総合体育館の第2・第3体育室料金深掘り | 16 prices | audit 0 errors; generated 230/2264; duplicate price IDs 0 | `ae2c0e8` | 第2/3体育室全面の4年齢区分×市内外を追加 |
| 134 | 2026-08-05 10:53 JST | トッケイセキュリティ平塚総合体育館の第1武道場料金深掘り | 16 prices | audit 0 errors; generated 230/2280; duplicate price IDs 0 | `220d691` | 半面/全面×4年齢区分×市内外を追加 |
| 135 | 2026-08-05 10:55 JST | トッケイセキュリティ平塚総合体育館の第2武道場料金深掘り | 16 prices | audit 0 errors; generated 230/2296; duplicate price IDs 0; lint OK; tests 3/3 | `48cc478` | 半面/全面×4年齢区分×市内外を追加。3波チェック合格 |
| 136 | 2026-08-05 10:57 JST | トッケイセキュリティ平塚総合体育館の弓道場料金深掘り | 16 prices | audit 0 errors; generated 230/2312; duplicate price IDs 0 | `c2be2d4` | 半面/全面×4年齢区分×市内外を追加 |
| 137 | 2026-08-05 10:59 JST | トッケイセキュリティ平塚総合体育館の会議・放送・記録料金深掘り | 3 details / 18 prices | audit 0 errors; generated 230/2330; duplicate IDs 0 | `08c4606` | A会議室2分割/共用器具を区画化し、プール個人、会議、放送、記録、可動席を追加 |
| 138 | 2026-08-05 11:02 JST | トッケイセキュリティ平塚総合体育館の照明料金深掘り | 18 prices | audit 0 errors; generated 230/2348; duplicate IDs 0; lint OK; tests 3/3 | `3c353e5` | 第1体育室の1/3・半面・2/3・全面を100%/50%・市内外で分離し、温水プール全面100%も追加。画像照合用一時ファイルを削除 |
| 139 | 2026-08-05 11:05 JST | 相好アリーナ四日市の平日分割料金深掘り | 23 prices | audit 0 errors; generated 230/2371; duplicate price IDs 0 | `17feb2e` | 指定管理者の現行料金HTMLから全面〜1/4面のスポーツ・入場料なし・平日午前/午後/夜間/全日を補完。既存の全面全日1件は重複追加せず保持 |
| 140 | 2026-08-05 11:07 JST | 相好アリーナ四日市の土日祝分割料金深掘り | 24 prices | audit 0 errors; generated 230/2395; duplicate price IDs 0 | `1e0b19c` | 全面〜1/4面のスポーツ・入場料なし・土日祝午前/午後/夜間/全日を指定管理者の現行料金HTMLから追加 |
| 141 | 2026-08-05 11:12 JST | 相好アリーナ四日市の支援区画・個人利用深掘り | 13 details / 12 prices | audit 0 errors; generated 230/2407; duplicate IDs 0; lint OK; tests 3/3 | `fd16cf8` | 多目的2室、弓道場と近的/遠的、トレーニングと2エリア、会議4区画、ウォーキングを区画化。個人・12枚券を追加。全区画会議室定員は推定せず保持 |
| 142 | 2026-08-05 11:13 JST | 相好アリーナ四日市の多目的室スポーツ料金深掘り | 20 prices | audit 0 errors; generated 230/2427; duplicate price IDs 0 | `028def4` | 多目的室1の3/2/1区画、多目的室2の2/1区画を午前/午後/夜間/全日で追加。スポーツ・入場料なし |
| 143 | 2026-08-05 11:16 JST | 相好アリーナ四日市の多目的室スポーツ以外料金深掘り | 20 prices | audit 0 errors; generated 230/2447; duplicate price IDs 0 | `861f972` | 多目的室1の3/2/1区画、多目的室2の2/1区画を午前/午後/夜間/全日で追加。スポーツ以外・入場料なし |
| 144 | 2026-08-05 11:17 JST | 相好アリーナ四日市の弓道・トレーニング・会議料金深掘り | 40 prices | audit 0 errors; generated 230/2487; duplicate price IDs 0; lint OK; tests 3/3 | `b7a8fef` | 近的/遠的の全面・半面、トレーニング全面/ウエイト、会議全区画/A/B/小を午前/午後/夜間/全日で追加 |
| 145 | 2026-08-05 11:19 JST | 相好アリーナ四日市の照明・空調・映像音響深掘り | 21 prices | audit 0 errors; generated 230/2508; duplicate price IDs 0 | `4e72e9e` | 掲載される15照明組合せ、全面/半面空調、大型映像、拡声、温水シャワー室/人を追加。非掲載照度は推定せず保持 |
| 146 | 2026-08-05 11:21 JST | 相好アリーナ四日市の競技器具・客席・舞台料金深掘り | 19 prices | audit 0 errors; generated 230/2527; duplicate price IDs 0 | `fcd312f` | 競技器具9種、タイマー/カウンター、シート、移動席、ステージ、アンプ、机椅子、電源を課金単位と設置可能数付きで追加 |
| 147 | 2026-08-05 11:23 JST | 相好アリーナ四日市の支援区画設備料金深掘り | 46 prices | audit 0 errors; generated 230/2573; duplicate price IDs 0; lint OK; tests 3/3 | `d15dc75` | 多目的室1/2、弓道場、トレーニング、大小会議室へ空調・音響・映像・器具・家具・電源を区画別に追加 |
| 148 | 2026-08-05 11:27 JST | 高岡市竹平記念体育館の支援区画・個人料金深掘り | 4 details / 6 prices / 1 candidate and 1 operation URL precision fix | audit 0 errors; generated 230/2579; duplicate IDs 0 | `06e761b` | 現行公式ページ移転を反映。PDF3ページを画像照合し、トレーニング/多目的/会議/附属設備を区画化、個人・占用料金を追加 |
| 149 | 2026-08-05 11:29 JST | 高岡市竹平記念体育館のアマチュア分割料金深掘り | 11 prices | audit 0 errors; generated 230/2590; duplicate price IDs 0 | `0ba80e4` | 入場料なしの全面/2/3/1/3を午前/午後/夜間/全日で補完。既存全面全日1件は重複せず保持 |
| 150 | 2026-08-05 11:30 JST | 高岡市竹平記念体育館の時間単価・附属設備深掘り | 16 prices | audit 0 errors; generated 230/2606; duplicate price IDs 0; lint OK; tests 3/3 | `17f2f6e` | 標準時間内/時間外の分割単価、拡声、照明6系統、冷暖房2区分、電光得点表示を追加。PDF/PNG一時ファイルを削除 |
| 151 | 2026-08-05 11:32 JST | 高岡市竹平記念体育館の入場有料料金深掘り | 10 prices | audit 0 errors; generated 230/2616; duplicate price IDs 0 | `e2d233e` | アマチュアスポーツ/スポーツ以外の入場有料・全面を午前/午後/夜間/全日/時間外で分離 |
| 152 | 2026-08-05 11:33 JST | 高岡市竹平記念体育館のスポーツ以外分割料金深掘り | 18 prices | audit 0 errors; generated 230/2634; duplicate price IDs 0 | `a65c58e` | 入場料なしの全面/2/3/1/3を午前/午後/夜間/全日/標準時間内1時間/時間外1時間で補完 |
| 153 | 2026-08-05 11:37 JST | とくぎんトモニアリーナの支援区画深掘り | 7 details | audit 0 errors; generated 230/2634; duplicate IDs 0; lint OK; tests 3/3 | `3275664` | 第二競技場、会議2室、多目的、役員、育児支援、有料貸出備品を現行指定管理者ページから区画化 |
| 154 | 2026-08-05 11:40 JST | とくぎんトモニアリーナ第二競技場一般料金深掘り | 12 prices | audit 0 errors; generated 230/2646; duplicate price IDs 0 | `8678564` | 現行ページが案内する料金PDF全2ページを画像照合し、全面/半面の6時間区分を追加 |
| 155 | 2026-08-05 11:41 JST | とくぎんトモニアリーナ第二競技場中高料金深掘り | 12 prices | audit 0 errors; generated 230/2658; duplicate price IDs 0 | `ada0635` | 中・高の全面/半面を午前/午後/夜間/午前午後/午後夜間/全日で追加 |
| 156 | 2026-08-05 11:42 JST | とくぎんトモニアリーナ会議室料金深掘り | 14 prices | audit 0 errors; generated 230/2672; duplicate IDs 0; lint OK; tests 3/3 | `cf2d5f6` | 第一/第二会議室の6時間区分と超過料金を追加。確認用PDF/PNGを削除 |
| 157 | 2026-08-05 11:52 JST | 大垣市総合体育館の支援区画・駐車精度深掘り | 8 details / 1 candidate and 1 operation precision fix | audit 0 errors; generated 230/2672; duplicate IDs 0 | `ef1d703` | 第2/3体育館、会議3室、研修、トレーニング、庭球場を区画化。現行ページの約270台と2024料金PDFリンクを反映 |
| 158 | 2026-08-05 11:54 JST | 大垣市総合体育館第1体育館平日料金深掘り | 12 prices / 1 candidate precision fix | audit 0 errors; generated 230/2684; duplicate price IDs 0 | `fcd41c5` | 令和6年4月1日改正PDF全1ページを画像照合し、全面/半面/1/3面の平日4時間区分を追加 |
| 159 | 2026-08-05 11:55 JST | 大垣市総合体育館第1体育館土日祝料金深掘り | 12 prices | audit 0 errors; generated 230/2696; duplicate IDs 0; lint OK; tests 3/3 | `1296e82` | 全面/半面/1/3面の土日祝4時間区分を追加。確認用PDF/PNGを削除 |
| 160 | 2026-08-05 11:56 JST | 大垣市総合体育館第2体育館料金深掘り | 16 prices | audit 0 errors; generated 230/2712; duplicate price IDs 0 | `8faee18` | 全面/半面の平日・土日祝×午前/午後/夜間/全日を追加 |
| 161 | 2026-08-05 11:57 JST | 大垣市総合体育館第3体育館料金深掘り | 16 prices | audit 0 errors; generated 230/2728; duplicate price IDs 0 | `6832499` | 全面/半面の平日・土日祝×午前/午後/夜間/全日を追加 |

## Current Wave

- Phase: verified deepening
- Last verified wave: wave 161
- No data edits are in progress. Wave 158で作成した大垣の確認用PDF 1件・PNG 1件はfull checks後に削除済み。

## Next Action

- At the next heartbeat, confirm the current HEAD descends from data commit `6832499` and the worktree contains only the known user-owned untracked paths, then add the already image-verified Ogaki meeting/training-room rates in wave 162 and run full checks.

## Blockers

- None.
