# Overnight Run State

## Status

- Status: COMPLETE
- Last updated: 2026-07-30T07:16:00+09:00
- Current wave: 55 - 最終監査と朝レポート確定（完了）

## Baseline

- Git root: なし
- `README.md`: `f20da71edbfc8af117d6d49b4a43fca4eacf7e99aeecd9431b9f15687ca4dca7`
- `package.json`: `9d8b9ba4a939c828e14339ffe94f8c0c9be29ce10b102a27a4b8b85b62bb6f9b`
- `data/coverage.csv`: `8f6eef2369e9098c2449eff738752ca76d02de11000f567bfe6689c9dae0965d`
- `data/historical-events.csv`: `7b3c8aa5d71582016dd3d1bbb67ec66d6b051f00bb8509a59d3306363cf92efd`
- `data/candidate-venues.csv`: `bdd89d955074fac562346450c48cbf5793dccd4ae597db1861e693c192712e0d`
- `data/venue-monosashi.sqlite`: `f410b5ebb11c7f0906ecdb88b9b91170343a3214bffdeeb46958e4e33bbca4ad`
- `docs/RESEARCH_REPORT.md`: `2f9df8371e4acac6ab31c482b4aa76a9e742373642a8f3aadeeb569aaa2e0d78`
- `scripts/audit-data.mjs`: `e6993b18238b19048d582dfbeae1adca919a0a000bb008185ae1fbf11a5abffb`
- Baseline audit: historical 134、verified 130、needs_check 4、candidate 20、candidate prefectures 18、errors 0

## Completed Waves

- Run ledgerを作成し、書き込み範囲、禁止事項、明朝の完了条件を固定した。
- Wave 1: `venue-details.csv`と`price-observations.csv`を追加し、面積・天井・収容・舞台・料金区分・税・適用日・調査日・除外費用を分離した。
- Wave 1: 出島メッセ長崎、くにびきメッセ、ビーコンプラザの6貸出区画と、ビーコンプラザの公式料金3観測を初期登録した。
- Wave 1 verification: `npm run audit`はhistorical 134、candidate 20、detail 6、price 3、errors 0。
- 1時間ごとのタスク内ハートビートを作成し、07:15 JST以降の波で最終監査と朝レポートを行うよう設定した。
- Wave 2: 未収録29都道府県へ公式URL付き代表候補を追加し、候補49件・47都道府県へ拡張した。
- Wave 2: `prefecture-coverage.csv`を追加し、代表候補ID・施設名・確認状態を候補表と照合する監査を追加した。
- Wave 2 verification: `npm run audit`はcandidate prefectures 47、missing 0、coverage rows 47、errors 0。
- Wave 3: WYYC 1999〜2013の15年を追加し、2014・2016・2017の施設名を公式大会サイト保存版で確定した。
- Wave 3: WYYCは1999〜2026の全28年を収録。施設名の未確認は1999年ホノルルのみ。
- Wave 3 verification: `npm run audit`はhistorical 149、verified 147、needs_check 2、WYYC 28、warnings 1、errors 0。
- Wave 4: アスティとくしま多目的ホール、サンメッセ香川大小展示場の区画情報を追加した。
- Wave 4: 基本料、平日・休日、冷房・暖房、準備撤去割引、税、除外費用を分離し、料金観測を3件から13件へ増やした。
- Wave 4: SQLiteをCSVから再構築し、historical 149、candidates 49、prefectures 47、details 9、prices 13、integrity check `ok`を確認した。
- Wave 4 verification: `npm run audit`はvenue detail 9、price 13、warnings 1、errors 0。
- Wave 5: JYYF地区大会の未収録6年度（2010・2011・2015・2017・2021・2022）32大会を公式年度ページ・終了告知から追加した。
- Wave 5: 地区大会は2009〜2026の18大会年度、96大会を連続収録した。
- Wave 5: CSVからSQLiteを再構築し、historical 181、candidates 49、prefectures 47、details 9、prices 13、integrity check `ok`を確認した。
- Wave 5 verification: `npm run audit`はhistorical 181、verified 179、JYYF_REGIONAL 96、warnings 1、errors 0。
- Wave 6: 前身UTYJ・JYCCの全国大会8件を公式回顧ページから追加し、国内全国大会を1999〜2026の28年で連続化した。
- Wave 6: JYYF発足年の2007・2008地区大会10件を追加し、JYYF期の地区大会を2007〜2026の106件で連続化した。
- Wave 6: ジュニア大会が2018年創設と確認し、2018〜2026の出典URL8件を404から正しい公式特設サイトへ修正した。2021大会は2022-03-26への延期実施を注記した。
- Wave 6: JJF 2020のオンライン＋全国8地域11施設を公式地域ページで確定し、確認状態を`verified`へ更新した。
- Wave 6: CSVからSQLiteを再構築し、historical 199、candidates 49、prefectures 47、details 9、prices 13、integrity check `ok`を確認した。
- Wave 6 verification: `npm run audit`はhistorical 199、verified 198、needs_check 1、JYYF_NATIONAL 28、JYYF_REGIONAL 106、JYYF_JUNIOR 9、warnings 1、errors 0。
- Wave 7: Gメッセ群馬の展示ホール・メインホールを区画登録し、非営利利用の全面・1/3、平日・休日、冷暖房、仮設舞台、清掃、専用回線を分離して10料金観測を追加した。
- Wave 7: `venue-operations.csv`を追加し、Gメッセ群馬、出島メッセ長崎、ビーコンプラザ、アスティとくしまの駅・駐車・大型搬入・予約開始・設営撤去・回線を分類別出典付きで登録した。
- Wave 7: `SEARCH_MODEL.md`を追加し、過去大会を基準にした4本のものさし、必須条件判定、未確認費を0円にしない予算表示を設計案として明記した。
- Wave 7: SQLite再構築スクリプトを追加し、6テーブルをCSVから原子的に更新できるようにした。
- Wave 7 verification: `npm run audit`はdetails 11、prices 23、operations 4、warnings 1、errors 0。SQLiteはhistorical 199、candidate 49、prefecture 47、detail 11、price 23、operations 4、integrity check `ok`。
- Wave 8: 奈良県コンベンションセンターの全面ABC・分割A/B/C・天平ホールを区画登録し、面積、天井高、シアター収容、可動席、平土間引渡しを公式施設情報から確認した。
- Wave 8: 分割3区画と天平ホールの平日・休日全日基本料、全面用16000ルーメンプロジェクター、446インチスクリーン、仮設舞台を別々の料金観測として追加した。
- Wave 8: 近鉄新大宮駅徒歩10分、空港バス、予約開始36/18/12か月、搬入口届出、無料Wi-Fi等を運用観測へ追加した。
- Wave 8: 一次情報URLを重複排除してHTTP状態を記録する`audit-urls.mjs`と`url-audit.csv`を追加した。初回監査で発見した404を、公式の年度別サイト・大会一覧・開催告知へ置換した。
- Wave 8: JN25の会場名を公式ページに合わせ「横浜市教育会館 サンライズホール」へ精密化した。
- Wave 8 verification: `npm run audit`はdetails 16、prices 34、operations 5、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。URL再監査は173件中reachable 162、access_limited 10、network_error 1、client_error 0。
- Wave 9: 幕張メッセの展示ホール10、幕張イベントホール、国際会議場コンベンションホールを区画登録し、面積、天井高、床荷重、収容、固定・可動・仮設席、分割、Wi-Fiを公式情報から確認した。
- Wave 9: 展示ホール10の1日・半日、イベントホールのアリーナ・全館基本料、冷暖房、音響・照明、共用部清掃を別料金観測として追加した。2026年4月1日適用の税込料金で、警備・ホール内清掃等の未確認費を除外欄へ保持した。
- Wave 9: 海浜幕張駅徒歩約5分、空港アクセス、約5000台駐車場、大型車120台、1年前受付、支払時期、事前打合せを展示場とイベントホール別の運用観測へ追加した。
- Wave 9 verification: `npm run audit`はdetails 19、prices 43、operations 7、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。URL再監査は180件中reachable 169、access_limited 10、network_error 1、client_error 0。
- Wave 10: 東京ビッグサイト南1ホールを区画登録し、5000㎡、天井12m、床耐荷重5t/㎡、搬出入口、1日・追加半日基本料、空調、電気容量分を公式情報から観測した。
- Wave 10: ポートメッセなごや第1展示館の全面と最小分割Bを区画登録し、2026年9月30日までの本申込と10月1日以降の本申込で異なる新旧料金を別行にした。
- Wave 10: 東京ビッグサイトの18か月前受付・改修休館注意と、ポートメッセなごやの18/24か月受付・大型搬入・場外駐車・大会期間一般利用休止注意を運用観測へ追加した。
- Wave 10 verification: `npm run audit`はdetails 22、prices 51、operations 9、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。URL再監査は189件中reachable 178、access_limited 10、network_error 1、client_error 0。
- Wave 11: `web/`へローカル検索MVPを構築し、JJF型・国内ヨーヨー型・世界大会型、地域、キーワード、収容、天井高、確認済み基本料、未確認値を残す切替を実装した。
- Wave 11: 原本CSVから検索用TypeScriptデータを自動生成する処理を追加し、49候補・51料金観測を画面へ反映した。未確認の付帯費は0円にせず、公式情報へのリンクを結果カードへ表示する。
- Wave 11 verification: `npm run build`成功、サーバー生成HTMLテスト1件成功、ローカルGETで主要文言と東京ビッグサイトのデータ表示を確認。公開・デプロイは未実施。
- Wave 12: 検索結果の展開欄へ、全料金観測の適用日、税込・税別、時間帯、根拠、除外費と、駅・予約開始・搬入・通信の運用観測を表示した。
- Wave 12 verification: `npm run build`成功、サーバー生成HTMLテスト1件成功。将来料金、本申込日基準、付帯費、運用情報が生成データとHTMLへ含まれることを確認した。
- Wave 13: インテックス大阪5号館A・Bを区画登録し、最小区画5Bの基本料、半日、時間外、深夜の大型催事条件、フォークリフト、搬入、6か月前受付を公式情報から分離登録した。
- Wave 13 verification: `npm run audit`はdetails 24、prices 57、operations 10、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。URL監査は193件中reachable 182、access_limited 10、network_error 1、client_error 0。
- Wave 14: パシフィコ横浜の展示ホールAとノース多目的ホールを区画登録し、3300㎡から6337㎡、シアター3024席の中間区画、2025年11月適用の基本料・準備撤去半日・12時間料金を公式料金表から観測した。
- Wave 14: ノースの無柱・カーペット・分割・付帯設備、みなとみらい駅徒歩、羽田空港、周辺宿泊、サービスヤードを運用観測へ追加し、予約開始時期は未確認として残した。
- Wave 14 verification: `npm run audit`はdetails 27、prices 62、operations 11、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- Wave 15: アクトシティ浜松の展示イベントホール全面・最小分割区画と中ホールを登録し、3500㎡・天井12m・最大3000席・床荷重・搬入口・1030席固定舞台を公式仕様から観測した。
- Wave 15: 展示場の平日・土日祝・最小区画・同日複合利用7割、中ホールの入場料別基本料・冷暖房を分離し、18/24/36か月前受付、販売届、避難要員、駅直結を運用観測へ追加した。
- Wave 15 verification: `npm run audit`はdetails 30、prices 69、operations 12、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- Wave 16: JJF 2024会場のアクリエひめじを精密化し、展示場全面・分割B・中ホールの面積、天井、収容、固定席と基本料・冷暖房、駅・駐車・搬入・予約条件を追加した。
- Wave 17: 函館アリーナのメイン・サブアリーナを追加し、非営利・入場料・営利条件別の基本料、電源、路面電車・空港・駐車・予約・連続利用条件を構造化した。
- Wave 18: 山形ビッグウイングの全面・4分割区画を追加し、基本料、冷房、フォークリフト、駅・駐車・大型車・予約・24時間利用条件を構造化した。
- Wave 19: テクノホールの西館全面・4分割区画を追加し、現行料金表の基本料、準備料、電気、換気、空港・駐車・搬入・5G情報を構造化した。
- Wave 20: アイメッセ山梨の全面・3分割区画を追加し、基本料、準備料、冷房、音響、電気、駅・駐車・予約・24時間設営条件を構造化した。
- Wave 21: 沖縄コンベンションセンター展示棟を追加し、面積、天井、収容、床荷重、料金区分、深夜延長、空港・駐車・搬入・予約・回線・隣接宿泊を構造化した。
- Wave 21 verification: `npm run audit`はhistorical 199、verified 198、needs_check 1、details 42、prices 100、operations 18、warnings 1、errors 0。
- Wave 22: Web検索を11地域連動の都道府県、面積、収容、天井、駐車、固定舞台、練習利用、大型搬入、駅・空港・予約・通信、5種類の並べ替えへ拡張した。
- Wave 22: 予算上限の対象を準備料等を除く`facility × per_day`の最小確認額へ限定し、「総予算」ではない境界を保った。
- Wave 22 verification: 本番相当ビルド成功、サーバー生成HTMLテスト1件成功。
- Wave 23: 地域別観測を集計し、中国地方だけ料金・運用が0件であることを特定した。
- Wave 24: くにびきメッセの2026年4月改定後料金を追加し、大展示場・多目的ホールの基本料、冷暖房、清掃、仮設舞台、電気と、松江駅徒歩、駐車441台、大型搬入、1年前予約を構造化した。
- Wave 24 verification: `npm run audit`はdetails 42、prices 111、operations 19、warnings 1、errors 0。全国11地域すべてに詳細区画・料金・運用の比較起点ができた。
- Wave 25: 複合施設内の安い別区画と最大面積を誤結合しないよう、料金へ`space_id`を保持し、「同じ貸出区画で条件を満たす」検索を追加した。
- Wave 25 verification: 本番相当ビルド成功。料金観測数更新後の描画テストを再実行し成功。
- Wave 26: 夢メッセみやぎの展示棟全面・3分割区画・会議棟大ホールを追加し、面積、天井、床荷重、収容、現行基本料、設営料、空調、電気、駅・空港・駐車・搬入・予約・連続利用・回線を公式情報から構造化した。
- Wave 26: 地域別観測密度表を追加し、全国11地域すべてに比較起点がある一方、49候補中の詳細観測は20施設、料金・運用観測は各19施設である境界を明示した。
- Wave 26 verification: `npm run audit`はdetails 45、prices 118、operations 20、warnings 1、errors 0。SQLiteはhistorical 199、candidate 49、prefecture 47、detail 45、price 118、operations 20、integrity check `ok`。
- Wave 27: 料金118観測を費目別に集計し、基本料19施設、清掃3施設、回線1施設、警備独立観測0施設という総額算定の穴を特定した。
- Wave 27: 日程・利用目的・区画から、施設基本料、設営、空調、電気、舞台、音響照明、通信、清掃、警備、搬入、備品、行政、税、取消まで確認する予算・問い合わせチェックリストを追加した。
- Wave 27: WYYC 1999の正確な施設名をIYYF、ハワイ州議会記録、AYYA Newsletter、Smithsonian所蔵目録まで再調査したが確定できず、推測施設を入れない判断と次のアーカイブ探索先を記録した。
- Wave 28: 目標到達後の大規模施設拡張として、札幌コンベンションセンターとマリンメッセ福岡A館を候補へ追加した。
- Wave 28: 札幌の大ホール全面・3分割区画、福岡の8000㎡多目的展示室・1400㎡サブアリーナを区画化し、現行基本料、準備撤去、交通、駐車、搬入、予約、回線を公式資料から構造化した。
- Wave 28 verification: `npm run audit`はcandidate 51、prefectures 47、details 49、prices 126、operations 22、warnings 1、errors 0。SQLiteは同数でintegrity check `ok`。
- Wave 29: Web検索へ料金用途を追加し、アマチュアスポーツ、展示・イベント、入場料なし・非営利、入場料ありを、用途共通料金と区別して日額比較できるようにした。
- Wave 29: イベントプリセットから料金用途を自動推定せず、利用者が明示的に選択する境界を保持した。
- Wave 30: Web画面へ過去会場台帳を追加し、JJF、JYYF全国・地区・ジュニア、WYYCの199記録を系列、年、会場名・都市で検索し、開催状態・確認状態・出典を確認できるようにした。
- Wave 30: 過去に開催された事実と現在の貸出可否を別物として画面に明記し、WYYC 1999の未確認施設名も推測せず表示する。
- Wave 31: 過去大会の反復基準として、大阪市立北区民センター、横浜市教育会館、アデリア総合体育文化センター、江東区砂町文化センター、国立オリンピック記念青少年総合センターを候補へ追加した。
- Wave 31: 5施設の区画、平日・休日、入場料、区外倍率、2026年10月改定、必須照明・音響、冷暖房、予約開始、交通、駐車を公式資料から構造化した。
- Wave 31 verification: `npm run audit`はcandidate 56、prefectures 47、details 56、prices 147、operations 27、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 32: 過去台帳の旧称・命名権・表記揺れを明示する7件の照合辞書を追加し、5候補を過去大会79台帳行へ決定的にリンクした。
- Wave 32: Web候補カードに開催済み等の過去実績数と予定数を分離表示し、「開催実績と照合済み」で絞り込めるようにした。実績は現在の貸出可否を意味しない境界を維持した。
- Wave 32 verification: 本番相当ビルド成功、候補56・料金147・過去実績表示を含むサーバー生成HTMLテスト1件成功。
- Wave 33: 岩倉市総合体育文化センター、砂町文化センター、国立オリンピック記念青少年総合センターの時間区分を、公式日額と分離した参考合計5件へ構造化した。
- Wave 33: 構成料金ID、使用区分数、同一候補・区画、確認状態、合計値を機械監査し、Webでは利用者が明示的に有効化した場合だけ予算検索へ含める境界を追加した。
- Wave 33 verification: `npm run audit`はbudget scenarios 5、warnings 1、errors 0。SQLiteは8テーブル、integrity check `ok`。Webのlint、本番相当ビルド、サーバー生成HTMLテスト1件は成功。
- Wave 34: 既存候補のサンレイクかすや、ビッグパレットふくしま、エア・ウォーターアリーナ松本、アクリエひめじを追加照合し、11件の明示的な表記辞書で9候補を過去大会94行へリンクした。
- Wave 34: 94行の内訳は開催済み等91、予定3。複合候補の別区画や予定大会を重複・開催済みとして数えない境界を保持した。
- Wave 34 verification: `npm run audit`はhistorical aliases 11、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 35: JYYF九州地区大会で11回照合されたサンレイクかすやの多目的ホールとさくらホールを区画化し、224人の可動席平土間、560席舞台、町外・入場料・冷暖房期別の時間料金8件を公式町ページから追加した。
- Wave 35: 長者原駅徒歩7分、利用月6か月前受付、利用10日前までのオンライン申込、公衆Wi-Fi、ホール利用時の整理人員条件を運用観測へ追加した。駐車台数・大型搬入・配信帯域は未確認のまま残した。
- Wave 35 verification: `npm run audit`はdetails 58、prices 155、operations 28、historical aliases 11、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 36: JYYF地区・ジュニア大会の反復会場である横浜市技能文化会館を57番目の候補へ追加し、412㎡・370人の分割可能な多目的ホール、通常・営利日額、音響・映像設備、駅・駐車・6か月前抽選・3日連続利用を公式情報から構造化した。
- Wave 36: 12件の表記辞書で10候補を過去大会98台帳行へ照合した。大型搬入、天井高、専用配信回線は未確認として残した。
- Wave 36 verification: `npm run audit`はcandidate 57、details 59、prices 159、operations 29、historical aliases 12、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 37: JYYF全国大会2回・WYYC 1回の実績があるベルサール秋葉原を都市型民間会場の比較基準として追加し、2F HALL Bの313㎡・天井6m・308席・専有回線・最短8時間参考価格と、駅・複数ホール・搬入条件を公式事業者ページから構造化した。
- Wave 37: 13件の表記辞書で11候補を過去大会101台帳行へ照合した。過去大会の利用階・区画と開催日見積は未確認として残した。
- Wave 37 verification: `npm run audit`はcandidate 58、details 60、prices 160、operations 30、historical aliases 13、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 38: 既に区画・料金を登録していたサンメッセ香川へ、駅・空港・高速道路、常設駐車700台、直接車両搬入、全面24か月前/分割12か月前受付、設営撤去、Wi-Fi・専用回線の確認境界を追加した。
- Wave 38: 四国の運用観測施設は1から2へ増え、全国11地域すべてで少なくとも1施設、四国でも2施設の運用比較が可能になった。
- Wave 38 verification: `npm run audit`はdetails 60、prices 160、operations 31、historical aliases 13、budget scenarios 5、warnings 1、errors 0。
- Wave 39: JJF 2015実績のあるビッグパレットふくしまを、無柱5495㎡・天井15〜20m・3分割・コンベンションホール・基本料・冷暖房・有線LAN・交通・大型搬入・24/12か月前予約まで精密化した。
- Wave 39: 公式の通常駐車844台と、2028年3月予定までの一部閉鎖を同時に保持し、平常値だけを現在利用可能台数として断定しないようにした。
- Wave 39 verification: `npm run audit`はcandidate 58、details 65、prices 168、operations 32、historical aliases 13、budget scenarios 5、warnings 1、errors 0。
- Wave 40: JJF 2025会場セットのエア・ウォーターアリーナ松本とキッセイ文化ホールを別区画・別運用行で精密化し、アリーナ2535㎡、大ホール2000席、中ホール939㎡、料金10件、共有駐車、交通、別予約の境界を登録した。
- Wave 40: アリーナの1時間料金から12時間参考額を作る案は、現行の参考合計監査が`per_slot`だけを許すため採用せず、元の時間単価と区分外30分の未確認状態を保持した。
- Wave 40 verification: `npm run audit`はcandidate 58、details 69、prices 178、operations 34、historical aliases 13、budget scenarios 5、warnings 1、errors 0。
- Wave 41: 松山市総合コミュニティセンターの体育館・キャメリアホールを、区画、料金、交通、駐車、予約条件へ分けて精密化した。
- Wave 42: 熊本城ホールの展示ホール・シビックホール・メインホールを、面積、天井、床荷重、分割、搬入荷重、用途別料金へ分けて精密化した。
- Wave 43: 米子コンベンションセンター ビッグシップとライトキューブ宇都宮を精密化し、地方複合ホールと新幹線駅前ホールの料金・運用比較を追加した。
- Wave 44: シーガイアコンベンションセンターとKDDI維新ホールを精密化した。シーガイアは公開料金が確認できないため、区画・宿泊・交通だけを記録し、料金を推測していない。
- Wave 45: みやこめっせとSAGAアリーナを精密化し、中規模展示場と大規模アリーナの最小利用区画・用途別料金を追加した。
- Wave 46: 空白文字だけの値を未確認値として通さないようデータ監査を強化し、発見した1件を空欄へ修正した。
- Wave 47: CSVからSQLiteとWeb検索データを再生成し、candidate 58、details 86、prices 230、operations 44、aliases 13、scenarios 8を確認した。
- Wave 48: 地域別密度、予算チェックリスト、調査レポート、次期一次情報キューを現在値へ更新した。
- Wave 49: 高知市文化プラザかるぽーとの大・小ホール、現行無入場料日額、1年前受付、空港・路面電車、地下駐車200台を構造化し、四国4候補すべてに詳細・料金・運用の比較起点を作った。
- Wave 49 verification: `npm run audit`はcandidate 58、details 88、prices 234、operations 45、historical aliases 13、budget scenarios 8、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 50: 仙台国際センター展示棟を3000㎡・天井9m・床5t/㎡・最大2560席、通常日額、空調、18か月前受付、通信回線まで精密化した。
- Wave 50: 会議棟の2027年10月末までの休館、展示棟の2027年4〜10月末休館予定、現時点の駐車場なし、工事動線・備品制限を通常仕様と分離して保持した。
- Wave 50 verification: `npm run audit`はcandidate 58、details 90、prices 237、operations 46、historical aliases 13、budget scenarios 8、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 51: 朱鷺メッセの7800㎡展示ホール全面、2700㎡最小分割B、1133㎡メインホールを、天井、床荷重、収容、直接搬入、区分料金、空調、電気、清掃、専用ネットワーク、予約、交通、駐車へ分解した。
- Wave 51: 全面平日・休日とB区画平日の3区分合計3件を、公式一括日額ではない参考額として構成料金IDから再計算可能にした。
- Wave 51 verification: `npm run audit`はcandidate 58、details 93、prices 250、operations 47、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 52: 石川県産業展示館の4号館6675㎡、3号館6209㎡、1号館3193㎡を、最低天井高、床荷重、分割、搬入口、全日料金、用途加算、準備撤去、予約、交通、共有駐車へ分解した。
- Wave 52: 現行公式料金では4号館全面903490円、3号館全面765720円、1号館393000円を全日基本料として保持し、入場料等を徴収する目的外催物の2倍条件と準備撤去のみ原則半額を注記した。
- Wave 52 verification: `npm run audit`はcandidate 58、details 96、prices 258、operations 48、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 53: 西原商会アリーナのメイン4486㎡・最大5700人とサブ1008㎡・天井15mを、用途・入場料別の全日料金、空調、通常・臨時駐車、12か月前仮予約、準備撤去40％、床養生へ分解した。
- Wave 53: アマチュア一般・入場料なしの全日基本料はメイン46800円、サブ17550円だが、ジャグリング・ヨーヨー催事への料金区分適用は要問い合わせとして保持した。
- Wave 53 verification: `npm run audit`はcandidate 58、details 98、prices 269、operations 49、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 54: 岡山コンベンションセンターのイベントホール595㎡・天井6.5m・594席・床1t/㎡と、可変コンベンションホール745㎡・720席・床500kg/㎡を区画化した。
- Wave 54: イベントホールの平日・土日祝全日、本番・設営撤去、空調、仮設電力、映像、コンベンションホール昇降舞台を分離し、駅徒歩3分、空港バス、搬入、駐車、15か月前受付を運用観測へ追加した。
- Wave 54 verification: `npm run audit`はcandidate 58、details 100、prices 277、operations 50、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- Wave 55: 最終URL監査は一次情報363件中reachable 348、access_limited 11、network_error 4、client_error 0。制限・通信失敗を情報不存在と判定していない。
- Wave 55: CSVから58候補・277料金観測をWebへ再生成し、lint、本番相当ビルド、サーバー生成HTMLテスト1件に成功した。短時間実行で旧ビルドを参照した中間テスト1件は、ビルド完了後の再実行で解消した。
- Wave 55: 夜間台帳の通常検証は`ledger validation: OK (active)`。
- Wave 55 final: 07:15 JST以降の再監査でcandidate 58、details 100、prices 277、operations 50、aliases 13、scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。

## Current Wave

- データ、URL、SQLite、Webの最終監査と朝レポート確定を完了した。

## Next Action

- ユーザー確認後、プリセットと予算入力の初期値を決める。次の一次情報調査は`docs/NEXT_RESEARCH_QUEUE.md`の12施設から再開できる。

## Blockers

- 現時点ではなし。
