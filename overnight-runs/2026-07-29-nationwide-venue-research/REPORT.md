# Morning Report

## Outcome

完了。2026-07-30 07:15 JST以降の最終再監査で、過去大会199記録、全国58候補・47都道府県、施設区画100件、料金観測277件、運用観測50件、過去会場照合辞書13件、参考合計11件を確認した。データ監査は警告1件・エラー0、SQLite整合性は`ok`。警告1件はWYYC 1999ホノルルの正確な施設名が未確認であることを示し、推測値は登録していない。

## Changes

- 夜間作業台帳を作成した。
- 施設区画の設備値と料金観測を分離するCSVおよびデータ辞書を追加した。
- ビーコンプラザの公式料金表から、アマチュアスポーツ利用の平日・休日全日基本料と冷暖房単価を条件付きで登録した。
- 公式施設情報を照合し、全国47都道府県に少なくとも1件ずつ代表候補を登録した。
- 幕張メッセ、東京ビッグサイト、パシフィコ横浜、Gメッセ群馬、ポートメッセなごや、インテックス大阪、アスティとくしま等の大規模展示・MICE施設も候補へ含めた。
- 代表候補47件のカバレッジ表を追加し、候補ID・都道府県・施設名・確認状態の参照整合性を監査対象にした。
- WYYC 1999〜2013を追加し、1999〜2026の全28年を年次台帳化した。
- 2014年Archa Theatre、2016年Renaissance Cleveland Hotel Grand Ballroom、2017年Harpaを公式大会サイト保存版で確定した。
- アスティとくしま、サンメッセ香川の施設区画と公式料金を追加し、会場基本料・曜日・冷暖房・税・除外費用を分離した。
- 最新CSVからSQLiteを再構築し、5テーブルの行数と整合性を確認した。
- JYYF地区大会の空白だった2010・2011・2015・2017・2021・2022年度32大会を公式情報から追加し、2009〜2026を連続収録した。
- 前身UTYJ・JYCCの全国大会8件と、JYYF発足年の2007・2008地区大会10件を追加した。
- 国内全国大会は1999〜2026、JYYF期の地区大会は2007〜2026、第1回からのジュニア大会は2018〜2026を連続収録した。
- ジュニア大会8件の404出典を正しい公式特設サイトへ修正し、2021大会の延期後実施日を注記した。
- JJF 2020のオンライン＋全国8地域11施設を公式地域ページで確定した。
- Gメッセ群馬の展示ホール・メインホールと、非営利利用の基本料、冷暖房、仮設舞台、清掃、回線を構造化した。
- 駅、駐車、大型搬入、予約開始、設営撤去、物販・飲食、回線、宿泊を保持する運用観測表を追加した。
- 過去大会基準、条件一致・要問い合わせ・条件外・未調査、確認済み最低額と未確認費を分ける検索モデル案を追加した。
- 6つのCSV表からSQLiteを原子的に再構築するスクリプトを追加した。
- 奈良県コンベンションセンターの5区画、基本料8件、映像・スクリーン・仮設舞台3件、アクセス・予約・回線の運用観測を追加した。
- 173件の一次情報URLを重複排除して到達確認する監査を追加し、誤った年度別URLを公式の現行ページへ修正した。
- 幕張メッセの展示ホール10、幕張イベントホール、国際会議場コンベンションホールを区画化し、展示場・イベントホールの基本料、冷暖房、音響照明、清掃と、駅・駐車・搬入・予約時期を公式情報から分離登録した。
- 東京ビッグサイト南1ホールと、ポートメッセなごや第1展示館の全面・最小分割区画を追加し、基本料、空調・電気、予約時期、搬入、改修・大会期間の利用制限を観測した。
- ポートメッセなごやは、2026年10月1日の料金改正を本申込日基準で新旧2行に分け、将来料金を現在料金へ混ぜないようにした。
- 全国候補を実際に絞り込めるローカルWeb検索MVPを追加した。過去大会型、地域、収容、天井、確認済み基本料、未確認値の保持を操作できる。
- 検索結果の展開欄に、料金の適用日、税、時間帯、除外費と、駅、予約開始、搬入、通信を表示するよう拡張した。
- インテックス大阪5号館A・Bを、最小区画、半日、延長、深夜の大型催事条件、予約時期、光熱費・搬入まで分解した。
- パシフィコ横浜の展示ホールAとノース多目的ホールを追加し、3300〜6337㎡、シアター3024席の区画、2025年11月適用料金を登録した。
- アクトシティ浜松の展示イベントホールと中ホールを組合せ候補として追加し、最小分割から3500㎡、固定1030席、複合利用7割、予約開始18/24/36か月を登録した。
- アクリエひめじ、函館アリーナ、山形ビッグウイング、テクノホール、アイメッセ山梨、沖縄コンベンションセンターを追加精密化し、全国11地域すべてに詳細比較の起点を作った。
- Web検索を地域連動、面積、駐車、固定舞台、練習利用、大型搬入、駅・空港・予約・通信、並べ替えへ拡張した。料金上限は準備料等を除く確認済み1日施設基本料だけを対象とする。
- 中国地方の料金・運用観測の穴を、くにびきメッセの2026年4月現行料金と利用案内で補完した。
- 複合施設内の最大区画と安い別区画を誤って組み合わせない「同じ貸出区画で満たす」検索を追加した。
- 夢メッセみやぎの展示棟全面・分割区画・会議棟大ホールと、基本料、設営料、空調、電気、交通、駐車、搬入、予約、連続利用、回線を構造化した。
- 地域別の候補・詳細・料金・運用観測の密度表を追加し、全国入口の確保と施設精査の未完を分けて表示した。
- 施設料から警備・清掃・通信までを分ける予算・問い合わせチェックリストを追加した。現時点で警備費の独立観測が0施設であることを含め、総額比較の未完を明示した。
- WYYC 1999の施設名をIYYF、ハワイ州議会記録、AYYA Newsletter、Smithsonian所蔵目録まで再調査し、確定できない施設候補を台帳へ入れず、探索履歴と次の確認先を残した。
- 札幌コンベンションセンターとマリンメッセ福岡A館を大規模施設比較へ追加し、全面・分割・ウォームアップ区画、用途別基本料、準備撤去、搬入、交通、駐車、予約、回線を構造化した。
- Web検索へ料金用途を追加し、同一区画に加えて用途条件が一致する基本料だけで予算上限を判定できるようにした。大会型から料金区分を勝手に推定はしない。
- Web画面へ過去会場台帳を追加し、JJF・JYYF・WYYCの199記録を系列・年・会場名・都市で検索し、開催状態・確認状態・出典を辿れるようにした。
- 過去大会で反復利用された大阪市立北区民センター、横浜市教育会館、岩倉市総合体育文化センター、砂町文化センター、国立オリンピック記念青少年総合センターを、候補名だけでなく区画・料金・運用まで追加した。
- 旧称・命名権・表記揺れを監査可能な辞書に分離し、候補カードへ過去の開催実績数と予定数を表示する「実績あり」絞り込みを追加した。
- 中小会場の時間区分料金を、構成料金IDと数量から再計算できる参考合計5件へ分離し、公式日額と混同しない予算検索の切替を追加した。
- 既存候補4施設の過去大会表記を追加照合し、11件の表記辞書で9候補を94台帳行（開催済み等91、予定3）へリンクした。
- JYYF九州地区大会で反復利用されたサンレイクかすやを、224人可動席平土間・560席舞台・町外/入場料/冷暖房期別料金・予約・交通まで精密化した。
- JYYF地区・ジュニア大会で反復利用された横浜市技能文化会館を、412㎡・370人の分割平土間、通常/営利日額、設備、駅、駐車、予約、連続利用まで精密化した。
- JYYF全国大会・WYYC実績のあるベルサール秋葉原を都市型民間会場の基準へ加え、2F HALL Bの規模・天井・専有回線・最短8時間参考価格を構造化した。
- サンメッセ香川の交通、常設駐車700台、直接搬入、全面24か月前/分割12か月前予約、設営撤去、回線条件を補い、四国の運用比較起点を2施設へ増やした。
- JJF 2015実績のあるビッグパレットふくしまを、無柱5495㎡の分割展示ホール、コンベンションホール、基本料、冷暖房、有線LAN、交通、大型搬入、予約時期、駐車場工事の現在条件まで精密化した。
- JJF 2025の松本会場セットを、アリーナと文化ホールの別区画・別料金・別予約として精密化し、共有駐車や交通は重複計上せず保持した。
- 松山市総合コミュニティセンター、熊本城ホール、米子コンベンションセンター、ライトキューブ宇都宮、シーガイア、KDDI維新ホール、みやこめっせ、SAGAアリーナを追加精密化した。
- シーガイアは公式公開料金を確認できず、料金欄を推測で埋めずに区画・宿泊・交通の確認済み情報だけを保持した。
- 貸出区画44施設、料金42施設、運用44施設まで観測密度を拡張し、未観測はそれぞれ14・16・14施設へ減らした。
- 高知市文化プラザかるぽーとの固定1085席大ホール、258.7㎡・可動200席小ホール、現行無入場料日額、1年前受付、空港・路面電車、地下200台を追加し、四国4候補すべてに比較起点を作った。
- 仙台国際センター展示棟の3000㎡・天井9m・床5t/㎡・最大2560席、通常日額、空調、予約、通信を追加し、会議棟・展示棟の休館予定と現在の駐車場停止を別条件として保持した。
- 朱鷺メッセの7800㎡全面・2700㎡最小分割・1133㎡メインホールを、区分基本料、空調、電気、清掃、専用回線、予約、交通、共有駐車へ分解し、公式一括日額ではない3件の区分合計を追加した。
- 石川県産業展示館の4号館6675㎡、3号館6209㎡、1号館3193㎡を、最低天井高、床荷重、分割、搬入口、全日料金、用途加算、準備撤去、予約、交通、共有駐車へ分解した。
- 西原商会アリーナのメイン4486㎡・最大5700人とサブ1008㎡・天井15mを同一館の組合せとして精密化し、用途・入場料別の全日料金、空調、駐車、予約、床養生を分離した。
- 岡山コンベンションセンターのイベントホール595㎡と可変コンベンションホール745㎡を、駅徒歩3分、全日・設営撤去料金、空調、電気、映像・舞台、搬入、15か月前受付へ分解した。
- データ監査へ空白文字だけの値の検出を追加し、空欄と確認済み0を区別できる状態を保った。

## Verification

- 初期データ監査はエラー0。
- 夜間台帳検証は`ledger validation: OK (active)`。
- 第1波後のデータ監査はhistorical 134、candidate 20、detail 6、price 3、errors 0。
- 第2波後のデータ監査はhistorical 134、candidate 49、candidate prefectures 47、missing prefectures 0、coverage rows 47、detail 6、price 3、errors 0。
- 第3波後のデータ監査はhistorical 149、verified 147、needs_check 2、WYYC 28、warnings 1、errors 0。警告1件は1999年WYYCの正確な施設名未確認。
- 第4波後のデータ監査はcandidate 49、prefecture coverage 47、detail 9、price 13、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第5波後のデータ監査はhistorical 181、verified 179、JYYF regional 96、warnings 1、errors 0。SQLiteはhistorical 181、candidate 49、prefecture 47、detail 9、price 13、integrity check `ok`。
- 第6波後のデータ監査はhistorical 199、verified 198、needs_check 1、JYYF national 28、regional 106、junior 9、warnings 1、errors 0。SQLiteはhistorical 199、candidate 49、prefecture 47、detail 9、price 13、integrity check `ok`。
- 第7波後のデータ監査はdetail 11、price 23、operations 4、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- 第8波後のデータ監査はdetail 16、price 34、operations 5、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- 第8波後のURL監査は、一次情報173URL中reachable 162、access_limited 10、network_error 1、404等のclient_error 0。制限・通信失敗は到達不能の証拠として扱わない。
- 第9波後のデータ監査はdetail 19、price 43、operations 7、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- 第9波後のURL監査は、一次情報180URL中reachable 169、access_limited 10、network_error 1、404等のclient_error 0。
- 第10波後のデータ監査はdetail 22、price 51、operations 9、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。URL監査は189件中reachable 178、access_limited 10、network_error 1、client_error 0。
- 第11波のWeb検索MVPは本番相当ビルド成功、サーバー生成HTMLテスト1件成功、ローカルGET応答を確認した。
- 第12波の料金・運用展開表示は本番相当ビルド成功、サーバー生成HTMLテスト1件成功、適用日・税・除外費・運用値のHTML反映を確認した。
- 第13波後のデータ監査はdetail 24、price 57、operations 10、warnings 1、errors 0。URL監査は193件中reachable 182、access_limited 10、network_error 1、client_error 0。
- 第14波後のデータ監査はdetail 27、price 62、operations 11、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- 第15波後のデータ監査はdetail 30、price 69、operations 12、warnings 1、errors 0。SQLiteは6テーブル、integrity check `ok`。
- 第21波後のデータ監査はhistorical 199、verified 198、needs_check 1、detail 42、price 100、operations 18、warnings 1、errors 0。警告1件はWYYC 1999の正確な施設名未確認。
- 第22波のWeb検索拡張は本番相当ビルド成功、サーバー生成HTMLテスト1件成功。
- 第24波後のデータ監査はdetail 42、price 111、operations 19、warnings 1、errors 0。全国11地域すべてに料金・運用観測あり。
- 第25波の同一区画検索は本番相当ビルド成功、更新後のサーバー生成HTMLテスト1件成功。
- 第26波後のデータ監査はdetail 45、price 118、operations 20、warnings 1、errors 0。SQLiteはhistorical 199、candidate 49、prefecture 47、detail 45、price 118、operations 20、integrity check `ok`。
- 第28波後のデータ監査はcandidate 51、prefecture 47、detail 49、price 126、operations 22、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第31波後のデータ監査はcandidate 56、prefecture 47、detail 56、price 147、operations 27、historical aliases 7、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第32波の過去実績照合検索は本番相当ビルド成功、更新後のサーバー生成HTMLテスト1件成功。
- 第33波後のデータ監査はbudget scenarios 5、warnings 1、errors 0。SQLiteは8テーブルでintegrity check `ok`。Webのlint、本番相当ビルド、参考合計切替を含むサーバー生成HTMLテスト1件成功。
- 第34波後のデータ監査はhistorical aliases 11、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第35波後のデータ監査はdetails 58、prices 155、operations 28、historical aliases 11、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第36波後のデータ監査はcandidate 57、details 59、prices 159、operations 29、historical aliases 12、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第37波後のデータ監査はcandidate 58、details 60、prices 160、operations 30、historical aliases 13、budget scenarios 5、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第38波後のデータ監査はdetails 60、prices 160、operations 31、historical aliases 13、budget scenarios 5、warnings 1、errors 0。
- 第39波後のデータ監査はcandidate 58、details 65、prices 168、operations 32、historical aliases 13、budget scenarios 5、warnings 1、errors 0。
- 第40波後のデータ監査はcandidate 58、details 69、prices 178、operations 34、historical aliases 13、budget scenarios 5、warnings 1、errors 0。
- 第47波後のデータ監査はcandidate 58、details 86、prices 230、operations 44、historical aliases 13、budget scenarios 8、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第49波後のデータ監査はcandidate 58、details 88、prices 234、operations 45、historical aliases 13、budget scenarios 8、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第50波後のデータ監査はcandidate 58、details 90、prices 237、operations 46、historical aliases 13、budget scenarios 8、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第51波後のデータ監査はcandidate 58、details 93、prices 250、operations 47、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第52波後のデータ監査はcandidate 58、details 96、prices 258、operations 48、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第53波後のデータ監査はcandidate 58、details 98、prices 269、operations 49、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 第54波後のデータ監査はcandidate 58、details 100、prices 277、operations 50、historical aliases 13、budget scenarios 11、warnings 1、errors 0。SQLite integrity checkは`ok`。
- 最終URL監査は一次情報363件中reachable 348、access_limited 11、network_error 4、client_error 0。制限・通信失敗は情報不存在と判定していない。
- WebはCSVから58候補・277料金観測を再生成し、lint、本番相当ビルド、サーバー生成HTMLテスト1件が成功した。短時間実行で旧ビルドを参照した中間テスト1件の失敗後、ビルド完了を待って再実行し成功した。

## Pre-existing State Preserved

- 他のものさしプロジェクトと既存作業ツリーは変更しない。
- 会場ものさしはGit管理外の新規ローカル調査フォルダとして開始している。

## Unverified States

- 公開、デプロイ、本番、施設への問い合わせ、空き状況、予約可否、料金見積は未確認のまま保持する。

## Blockers

- 現時点ではなし。

## Morning Decisions

- UIで最初に見せるイベントプリセットと、予算の初期入力方式はユーザー確認事項として残す。
