# Overnight State

## Status

- Status: ACTIVE
- Last updated: 2026-08-05 06:15 JST
- Cutoff: 2026-08-06 07:00 JST
- Last data commit: `9588cc0` (ledger-only commits may follow it)

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

## Current Wave

- Phase: verified deepening
- Last verified wave: wave 37
- No data edits are in progress.

## Next Action

- At the next heartbeat, confirm the current HEAD descends from data commit `9588cc0` and the worktree contains only known untracked paths, then run wave 38 as a current-pricing checkpoint for the newly deepened exhibition/sports facilities. Prefer current official HTML or clearly dated official PDFs; retain stale or ambiguous rates as unverified rather than promoting them. Finish with audit and generated-data verification.

## Blockers

- None.
