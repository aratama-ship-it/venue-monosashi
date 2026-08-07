# Unattended National Venue-Depth Resume State

## Status

- Status: ACTIVE
- Last updated: 2026-08-07 Asia/Tokyo
- Current wave: Wave 49 — Miyagi official-source expansion (next).

## Baseline

- Git branch and commit: `agent/add-competition-and-small-theater-coverage` at `5c0946bc6e73c553c168f3f8b13468e64790da72`.
- Data counts: 672 candidate facilities, 2,828 searchable spaces, 2,823 price observations, and 222 operation rows.
- Depth target: 25 candidates, 15 municipalities, and 51 spaces per prefecture. Remaining deficits: 503 candidates and 182 spaces; municipality deficit is measured by the generated report.
- Canonical hashes: `candidate-venues.csv` `5e4bdaa0481db4d1000fd1eb16e147fbf7f9451d752872cf761282e9bc72ecd7`; `venue-details.csv` `6abbb7eb004043320980b7687e0bb9f3946836d414b0b3d4206fa9c8b564a804`; `price-observations.csv` `2395041ad34e06fd466c10c971ba2da2867854e91e98091debd83182778db99c`; `venue-operations.csv` `e80ed96e8c3c4533a6c782933369207b968abb8207f3274c3afc57af149d1c25`.
- Pre-existing untracked paths preserved: three prior small-theater run directories and `web-projects/`.
- Existing audit condition: one warning at `historical-events.csv:173` for a held/planned row with no `venue_names`; no audit errors.

## Completed Waves

- Wave 1 source data: added four Yamaguchi candidates — 萩市民館（萩市）、美祢市民会館（美祢市）、不二輸送機ホール（山陽小野田市）、スターピアくだまつ（下松市） — and 33 independently searchable spaces. Yamaguchi is now 11 candidates, 10 municipalities, and 59 spaces. Official sources: 萩市、 美祢市、山陽小野田市、スターピアくだまつ指定管理者の公開資料.
- Published fee observations were retained only for currently available rooms. 萩市民館大ホールは2026年6月から使用中止のため、旧料金表を検索用料金データには入れていない。山陽小野田市文化会館は大ホール平日・休日、小ホール全日の日額を確認した。
- Wave 1 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 46 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.
- Wave 2 source data: added three Kochi candidates — 土佐市複合文化施設つなーで（土佐市）、南国市地域交流センターMIARE！（南国市）、室戸市保健福祉センターやすらぎ（室戸市） — and 40 independently searchable spaces. Kochi is now 10 candidates, 7 municipalities, and 53 spaces. Official sources: 土佐市、南国市、室戸市.
- Capacity is recorded only when the official source gives an explicit capacity or seat count. Counts of chairs, desks, or slippers are retained as notes and do not become searchable capacity values.
- Wave 2 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 47 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.
- Wave 3 source data: added four Oita candidates — 宇佐文化会館・ウサノピア（宇佐市）、くにさき総合文化センター（国東市）、豊後高田市中央公民館（豊後高田市）、豊後大野市総合文化センター エイトピアおおの（豊後大野市） — and 35 independently searchable spaces. Oita is now 11 candidates, 9 municipalities, and 56 spaces. Official sources: 宇佐市、国東市、豊後高田市、エイトピアおおの指定管理者.
- The only new filterable ceiling values are the values explicitly labelled height by the official facility page: アストくにさきマルチホール5m and ギャラリー3.5m. The stage hall's proscenium and grid heights remain notes only.
- Wave 3 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 48 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.
- Wave 4 source data: added four Miyazaki candidates — 日南市文化センター（日南市）、串間市文化会館（串間市）、えびの市文化センター（えびの市）、三股町立文化会館（三股町） — and 27 independently searchable spaces. Miyazaki is now 11 candidates, 10 municipalities, and 53 spaces. Official sources: 日南市、串間市文化会館運営者、宮崎県公共文化施設ポータル、えびの市、三股町立文化会館.
- Stage dimensions and heights published by the facilities remain notes only. No Miyazaki ceiling value was added to the searchable filter because no new source described it as a space ceiling or clear height.
- Wave 4 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 49 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 5 source data: added four Aomori candidates — タカシン文化センター（平川市）、六ヶ所村文化交流プラザ スワニー（六ヶ所村）、下北文化会館（むつ市）、藤崎町文化センター（藤崎町） — and 34 independently searchable spaces. Aomori is now 12 candidates, 10 municipalities, and 63 spaces. Official sources: 平川市、六ヶ所村文化交流プラザ スワニー指定管理者、むつ市、藤崎町.
- No Aomori ceiling value was added to the searchable filter. Published stage heights at タカシンホール and スワニー remain descriptive notes only; no source labelled them as a room ceiling or clear height. Approximate seating at 藤崎町文化センター likewise remains outside the numeric capacity filter.
- Wave 5 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 50 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 6 source data: added four Tochigi candidates — 大正堂くろいそみるひぃホール（那須塩原市）、KOBELCO 真岡いちごホール（真岡市）、氏家公民館（さくら市）、大田原東地区公民館（大田原市） — and 23 independently searchable spaces. Tochigi is now 12 candidates, 10 municipalities, and 43 spaces. Official sources: 那須塩原市、KOBELCO 真岡いちごホール指定管理者、さくら市、大田原市.
- No Tochigi ceiling value was added to the searchable filter. Published stage height at 真岡いちごホール is retained only as a note, not as a ceiling measurement.
- Wave 6 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 51 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 7 source data: added four Toyama candidates — 高周波文化ホール（射水市）、津沢コミュニティプラザ（小矢部市）、上市町文化研修センター（上市町）、砺波市文化会館（砺波市） — and 32 independently searchable spaces. Toyama is now 12 candidates, 10 municipalities, and 49 spaces. Official sources: 射水市、小矢部市、上市町、砺波市.
- No Toyama ceiling value was added to the searchable filter. Published stage areas at 高周波文化ホール remain descriptive notes only, not room floor or ceiling measurements. Approximate seating at 津沢コミュニティプラザ and 砺波市文化会館 remains outside the numeric capacity filter.
- Wave 7 verification and deployment: `npm run validate` passed (the pre-existing historical-event warning only); production version 52 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.
- Wave 8 source data: added four Fukui candidates — 文化の森・YURI文化情報交流館（坂井市）、あわら市中央公民館（あわら市）、パレア若狭（若狭町）、高浜町文化会館（高浜町） — and 48 independently searchable spaces. Fukui is now 12 candidates, 9 municipalities, and 64 spaces. Official sources: 坂井市、あわら市、若狭町、高浜町.
- No Fukui ceiling value was added to the searchable filter. No stage-height, proscenium, or building-height statement was converted to a ceiling value. Approximate capacities at あわら市中央公民館 remain outside the numeric filter.
- Wave 8 verification and deployment: `npm run validate`, audit, depth-report generation, app-data generation, and whitespace check passed (the pre-existing historical-event warning only); production version 53 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 9 source data: added four Aichi candidates — 豊川市文化会館（豊川市）、刈谷市総合文化センター（刈谷市）、碧南市文化会館（中央公民館）（碧南市）、碧南市芸術文化ホール（碧南市） — and 49 independently searchable spaces. Aichi is now 12 candidates, 8 municipalities, and 64 spaces. Official sources: 豊川市、刈谷市、碧南市、各指定管理者の公式施設案内.
- No Aichi ceiling value was added to the searchable filter. Published stage opening, grid, and room-height information remains descriptive notes only; no value was converted to a ceiling measurement.
- Wave 9 verification and deployment: `npm run validate`, audit, depth-report generation, app-data generation, and whitespace check passed (the pre-existing historical-event warning only); production version 54 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 10 source data: added four Kyoto candidates — 舞鶴市総合文化会館・舞鶴東コミュニティセンター（舞鶴市）、文化パルク城陽（城陽市）、福知山市厚生会館（福知山市）、長岡京市中央公民館（長岡京市） — and 48 independently searchable spaces. Kyoto is now 12 candidates, 6 municipalities, and 72 spaces. Official sources: 舞鶴市、城陽市、福知山市、長岡京市.
- No Kyoto ceiling value was added to the searchable filter. Published stage opening, proscenium, grid, and stage-height values remain descriptive notes only; no value was converted to a ceiling measurement.
- Wave 10 verification and deployment: `npm run validate`, audit, depth-report generation, app-data generation, and whitespace check passed (the pre-existing historical-event warning only); production version 55 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 11 source data: added four Hyogo candidates — 西宮市民会館（アミティ・ベイコムホール）（西宮市）、明石市立市民会館（アワーズホール）（明石市）、明石市立西部市民会館（明石市）、ライフピアいちじま大ホール（丹波市） — and 23 independently searchable spaces. Hyogo is now 12 candidates, 6 municipalities, and 53 spaces. Official sources: 西宮市文化振興財団の施設案内、明石市の現行貸しホール・貸室一覧、丹波市のライフピアいちじま大ホール施設概要.
- No Hyogo ceiling value was added to the searchable filter. All new room ceiling values remain unknown; no stage, proscenium, or building-height statement was used as a ceiling value. Wave 11 verification and deployment: `npm run validate`, audit, depth-report generation, app-data generation, and whitespace check passed (the pre-existing historical-event warning only); production version 56 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 12 source data: added four Shimane candidates — 島根県芸術文化センター グラントワ（益田市）、安来市総合文化ホール アルテピア（安来市）、加茂文化ホール ラメール（雲南市）、石央文化ホール（浜田市） — and 22 independently searchable spaces. Shimane is now 12 candidates, 6 municipalities, and 37 spaces. Official sources: グラントワ公式運営者、安来市とアルテピア指定管理者、雲南市とラメール指定管理者、浜田市.
- Only グラントワ多目的ギャラリーの公式「天井の高さ」3.7m was added to the searchable filter. Other new space ceiling values remain unknown; no stage, proscenium, or building-height statement was used as a ceiling value. Wave 12 verification and deployment: `npm run validate`, audit, depth-report generation, app-data generation, and whitespace check passed (the pre-existing historical-event warning only); production version 57 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

- Wave 13 source data: added four Kagawa candidates — 善通寺市民会館（善通寺市）、東かがわ市交流プラザ（東かがわ市）、源内音楽ホール（さぬき市）、ユープラザうたづ（宇多津町） — and 26 independently searchable spaces. Kagawa is now 12 candidates, 8 municipalities, and 41 spaces. Official sources: 善通寺市、東かがわ市交流プラザ運営者、さぬき市、宇多津町振興財団.
- No Kagawa ceiling value was added to the searchable filter. All new room ceiling values remain unknown; no stage, proscenium, or building-height statement was used as a ceiling value. Wave 13 verification and deployment: `npm run validate`, audit, depth-report generation, app-data generation, and whitespace check passed (the pre-existing historical-event warning only); production version 58 deployed successfully and the established `venue.art-monosashi.com` endpoint returned the site response.

## Current Wave

- Wave 22 source data: added four official-source-backed Nagano facilities — 長野県伊那文化会館（伊那市）、駒ヶ根市文化会館（駒ヶ根市）、中野市市民会館ソソラホール（中野市）、須坂市文化会館メセナホール（須坂市） — and 36 independently searchable spaces. Nagano is now 14 candidates, 12 municipalities, and 74 spaces.
- Official sources: 長野県伊那文化会館公式運営者、駒ヶ根市と駒ヶ根市文化会館公式運営者、中野市、須坂市文化会館公式運営者. Explicit capacity and area values were recorded only when the source stated them; stage and proscenium dimensions remain notes only. No ceiling or price observation was added.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 22 deployment passed: production version 67 was deployed successfully; `https://venue.art-monosashi.com/?release=8606ba2` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 23 source data: added four official-source-backed Gifu facilities — 岐阜市文化センター（岐阜市）、ぎふしんフォーラム（岐阜市）、じゅうろくプラザ（岐阜市）、大垣市スイトピアセンター（大垣市） — and 36 independently searchable spaces. Gifu is now 14 candidates, 8 municipalities, and 81 spaces.
- Official sources: 岐阜市、じゅうろくプラザ公式運営者、大垣市. The じゅうろくプラザ 600-seat hall and 240-seat large meeting room, and the スイトピアセンター 589-seat culture hall, were recorded from official pages. No ceiling or price observation was added; all unreported area, ceiling, loading, and current availability remain `要確認`.
- Wave 23 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 23 deployment passed: production version 68 was deployed successfully; `https://venue.art-monosashi.com/?release=547b19f` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 24 source data: added four official-source-backed Wakayama facilities — 海南市民交流センター（海南市）、岩出市コミュニティセンター・サンホール（岩出市）、岩出市総合保健福祉センター（岩出市）、白浜会館（白浜町） — and 18 independently searchable spaces. Wakayama is now 14 candidates, 10 municipalities, and 44 spaces.
- Official sources: 海南市、岩出市、白浜町. Explicit official capacities and areas were recorded for 岩出市総合保健福祉センター多目的ホール（300人・347㎡）、小ホール（96人・163㎡）、視聴覚室（96人・131㎡） and 白浜会館1階ホール（移動いす2,000人）. No ceiling or price observation was added; all unreported area, ceiling, loading, and current availability remain `要確認`.
- Wave 24 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 24 deployment passed: production version 69 was deployed successfully; `https://venue.art-monosashi.com/?release=63e4f4b` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 25 source data: added four official-source-backed Hiroshima facilities — 東広島芸術文化ホールくらら（東広島市）、広島市文化交流会館（広島市）、三原市芸術文化センター ポポロ（三原市）、むかいしま文化ホール（尾道市） — and 15 independently searchable spaces. Hiroshima is now 14 candidates, 7 municipalities, and 29 spaces.
- Official sources: 東広島市・くらら公式運営者、広島市、三原市芸術文化センター公式運営者、尾道市. Explicit official capacities were recorded for 広島市文化交流会館ホール（2,001席）、ポポロホール（1,209席）、むかいしま文化ホール（400名）とホール研修室1・2（各30名程度）. No ceiling or price observation was added; all unreported area, ceiling, loading, and current availability remain `要確認`.
- Wave 25 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 25 deployment passed: production version 70 was deployed successfully; `https://venue.art-monosashi.com/?release=035d756` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 26 source data: added four official-source-backed Kochi facilities — 三里文化会館、筆山文化会館、木村会館、春野文化ホール ピアステージ（いずれも高知市） — and 24 independently searchable spaces. Kochi is now 14 candidates, 7 municipalities, and 77 spaces.
- Official sources: 高知市. Explicit capacities and areas were recorded for 三里文化会館多目的ホール（300席）、2階研修室（30人程度）、筆山文化会館音楽練習室（72㎡・30人程度）、軽音楽室（29㎡・4〜6人）、会議室（63㎡）、2階広間（39㎡）. No ceiling or price observation was added; all unreported ceiling, loading, and current availability remain `要確認`.
- Wave 26 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 26 deployment passed: production version 71 was deployed successfully; `https://venue.art-monosashi.com/?release=58745c0` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 27 source data: added four official-source-backed Saga facilities — 武雄市文化会館（武雄市）、千代田文化会館 はんぎーホール（神埼市）、小城保健福祉センター 桜楽館（小城市）、多久市中央公民館（多久市） — and 28 independently searchable spaces. Saga is now 14 candidates, 12 municipalities, and 54 spaces.
- Official sources: 武雄市、神埼市、小城市、多久市. Explicit capacities were recorded only where the official source stated them; no ceiling or price observation was added. 武雄市文化会館の休館・整備計画は候補注記に残し、各区画の現行利用可否は要確認とした。プロセニアム・舞台寸法は天井高に使用していない。
- Wave 27 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` passed with only the pre-existing historical-event warning. Tracked `web/dist` output was restored after the build.
- Wave 27 deployment passed: production version 72 was deployed successfully; `https://venue.art-monosashi.com/?release=9f8da45` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 28 source data: added four official-source-backed Kumamoto facilities — 合志市文化会館（合志市）、宇城市松橋総合体育文化センター ウイングまつばせ（宇城市）、山鹿市民交流センター（山鹿市）、菊池市文化会館（菊池市） — and 28 independently searchable spaces. Kumamoto is now 14 candidates, 11 municipalities, and 67 spaces.
- Official sources: 合志市、ウイングまつばせ公式運営者、山鹿市、菊池市. Explicit capacities were recorded only where the official source stated them. 山鹿市資料間の文化ホール収容人数差異、菊池市文化会館の大ホール閉鎖・令和9年3月31日閉館予定は注記と `要確認` で保持した。舞台・アリーナ寸法は天井高に使用していない。
- Wave 28 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` passed with only the pre-existing historical-event warning. Tracked `web/dist` output was restored after the build.
- Wave 28 deployment passed: production version 73 was deployed successfully; `https://venue.art-monosashi.com/?release=702a8f3` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 29 source data: added four official-source-backed Kagoshima facilities — 指宿市民会館（指宿市）、末吉総合センター（曽於市）、奄美川商ホール（奄美市）、姶良市文化会館 加音ホール（姶良市） — and 32 independently searchable spaces. Kagoshima is now 14 candidates, 11 municipalities, and 59 spaces.
- Official sources: 指宿市、曽於市、奄美市、鹿児島県. Explicit capacities and the 奄美市公式広場面積 were recorded only where the official source stated them. 指宿市の令和8年度料金改定案内は候補注記に残し、区画別料金観測は未追加。舞台寸法は天井高に使用していない。
- Wave 29 verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` passed with only the pre-existing historical-event warning. Tracked `web/dist` output was restored after the build.
- Wave 29 deployment passed: production version 74 was deployed successfully; `https://venue.art-monosashi.com/?release=1acf2eb` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 30 source data: added four official-source-backed Iwate facilities — 二戸市民文化会館（二戸市）、陸前高田市民文化会館「奇跡の一本松ホール」（陸前高田市）、八幡平市立松尾コミュニティセンター（八幡平市）、大船渡市民文化会館（リアスホール）（大船渡市） — and 36 independently searchable spaces. Iwate is now 15 candidates, 13 municipalities, and 83 spaces.
- Official sources: 二戸市、陸前高田市、八幡平市、大船渡市. Explicit capacity and area values were recorded only where the official pages stated them; no ceiling or price observation was inferred. All unreported conditions remain 要確認, and stage/building heights were not converted to ceiling data.
- Wave 30 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 30 deployment passed: production version 75 was deployed successfully; `https://venue.art-monosashi.com` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 31 source data: added four official-source-backed Akita facilities — 北秋田市文化会館（北秋田市）、能代市文化会館（能代市）、象潟公会堂（にかほ市）、山本ふるさと文化館（三種町） — and 19 independently searchable spaces. Akita is now 15 candidates, 14 municipalities, and 55 spaces.
- Official sources: 北秋田市、能代市、にかほ市、三種町. Explicit capacities were recorded only where the official pages stated them; no ceiling or price observation was inferred. All unreported conditions remain 要確認, and stage/building heights were not converted to ceiling data.
- Wave 31 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 31 deployment passed: production version 76 was deployed successfully; both the Sites URL and `https://venue.art-monosashi.com` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 32 source data: added four official-source-backed Yamagata facilities — 寒河江市市民文化会館（寒河江市）、長井市民文化会館（長井市）、村山市民会館（村山市）、白鷹町文化交流センター あゆーむ（白鷹町） — and 33 independently searchable spaces. Yamagata is now 15 candidates, 13 municipalities, and 66 spaces.
- Official sources: 寒河江市、長井市、村山市、白鷹町. Explicit capacities and floor areas were recorded only where the official sources stated them; no ceiling or price observation was inferred. Published stage heights and stage areas remain notes only, and all unreported conditions remain `要確認`.
- Wave 32 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 32 deployment passed: production version 77 was deployed successfully; the Sites URL and `https://venue.art-monosashi.com/?release=d7a3e32` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 33 source data: added four official-source-backed Fukushima facilities — 田村市文化センター（田村市）、相馬市民会館（相馬市）、伊達市ふるさと会館（MDDホール）（伊達市）、霊山中央交流館（伊達市） — and 33 independently searchable spaces. Fukushima is now 15 candidates, 11 municipalities, and 76 spaces.
- Official sources: 田村市、相馬市、伊達市. Explicit capacities and floor areas were recorded only where the official sources stated them; no ceiling or price observation was inferred. Published stage height and stage dimensions remain notes only, and all unreported conditions remain `要確認`.
- Wave 33 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 33 deployment passed: production version 78 was deployed successfully; the Sites URL and `https://venue.art-monosashi.com/?release=70efe79` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 34 source data: added four official-source-backed Ibaraki facilities — 坂東市民音楽ホール（坂東市）、下妻市民文化会館（下妻市）、下妻市立図書館2階施設（下妻市）、笠間市消防本部 多目的ホール・会議室（笠間市） — and 19 independently searchable spaces. Ibaraki is now 15 candidates, 13 municipalities, and 66 spaces.
- Official sources: 坂東市、下妻市、笠間市. Explicit capacities and floor areas were recorded only where the official sources stated them; no ceiling or price observation was inferred. Stage dimensions remain notes only, and all unreported conditions remain `要確認`.
- Wave 34 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 34 deployment passed: production version 79 was deployed successfully; the Sites URL and `https://venue.art-monosashi.com/?release=9f12093` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 35 source data: added four official-source-backed Gunma facilities — 玉村町文化センター（玉村町）、安中市文化センター（安中市）、旧日本基督教団沼田教会紀念会堂（沼田市）、前橋市中央公民館（前橋市） — and 27 independently searchable spaces. Gunma is now 15 candidates, 13 municipalities, and 75 spaces.
- Official sources: 玉村町、安中市、沼田市、前橋市. Explicit capacities and floor areas were recorded only where the official sources stated them; no ceiling or price observation was inferred. Stage dimensions remain notes only, and all unreported conditions remain `要確認`.
- Wave 35 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 35 deployment passed: production version 80 was deployed successfully; the Sites URL and `https://venue.art-monosashi.com/?release=68dcfb2` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 36 source data: added four official-source-backed Saitama facilities — 狭山市市民会館（狭山市）、飯能市市民会館（飯能市）、越谷コミュニティセンター（サンシティホール）（越谷市）、草加市文化会館（草加市） — and 37 independently searchable spaces. Saitama is now 15 candidates, 13 municipalities, and 79 spaces.
- Official sources: 狭山市、飯能市、越谷市とサンシティホール指定管理者、草加市文化協会。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; published stage heights and all unreported conditions remain `要確認`.
- Wave 36 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 36 deployment passed: production version 81 was deployed successfully from commit `eb3b007b251083c92ed463929a8381b8301ada54`; the Sites URL and `https://venue.art-monosashi.com/?release=eb3b007` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 37 source data: added four official-source-backed Chiba facilities — 浦安市文化会館（浦安市）、東金文化会館（東金市）、千葉県東総文化会館（旭市）、白井市文化会館（白井市） — and 24 independently searchable spaces. Chiba is now 15 candidates, 14 municipalities, and 68 spaces.
- Official sources: 浦安市、東金市、旭市、白井市。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; published stage heights and all unreported conditions remain `要確認`.
- Wave 37 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning. Public deployment remains to be completed for this wave.
- Wave 37 deployment passed: production version 82 was deployed successfully from commit `e1e3e7706b449d4370ea9676d42407ef3f4cd496`; the Sites URL and `https://venue.art-monosashi.com/?release=e1e3e77` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 38 source data: added four official-source-backed Ishikawa facilities — 野々市市文化会館フォルテ（野々市市）、内灘町文化会館（内灘町）、かほく市高松産業文化センター（かほく市）、富来活性化センター（志賀町） — and 24 independently searchable spaces. Ishikawa is now 15 candidates, 13 municipalities, and 62 spaces.
- Official sources: 野々市市と文化会館指定管理者、内灘町、かほく市、志賀町。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; published stage heights and all unreported conditions remain `要確認`.
- Wave 38 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning.
- Wave 38 deployment passed: production version 83 was deployed successfully from commit `e3facb1231ff18948177e4f2d386cf542b77a050`; the Sites URL and `https://venue.art-monosashi.com/?release=e3facb1` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 39 source data: added eight official-source-backed Yamanashi facilities — 上野原市文化ホール（もみじホール）、須玉ふれあい館ホール、長坂コミュニティ・ステーションホール、八ヶ岳やまびこホール、富士河口湖町中央公民館、豊富中央公民館、中央市立玉穂生涯学習館、山中湖村役場平野コミュニティセンター — and 34 independently searchable spaces. Yamanashi is now 19 candidates, 15 municipalities, and 84 spaces.
- Official sources: 上野原市、北杜市、富士河口湖町、中央市、山中湖村。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; all unreported conditions remain `要確認`.
- Wave 39 local verification passed: `npm --prefix web run data:generate`, `npm run audit`, `npm run depth-report:write`, and `git diff --check` passed with only the pre-existing historical-record warning.
- Wave 39 deployment passed: production version 84 was deployed successfully from commit `c62b73f0ef512d8e2bdaa60ddade6fb9c8f2cc19`; the Sites URL and `https://venue.art-monosashi.com/?release=c62b73f` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 21 source data: added four official-source-backed Kanagawa facilities — 厚木市文化会館（厚木市）、カルッツかわさき（川崎市）、鎌倉芸術館（鎌倉市）、小田原三の丸ホール（小田原市） — and 68 independently searchable spaces. Kanagawa is now 14 candidates, 7 municipalities, and 93 spaces.
- Official sources: 厚木市、カルッツかわさき公式運営者、鎌倉芸術館公式運営者、小田原三の丸ホール公式運営者. Explicit room ceiling values were recorded only for カルッツかわさき（アクトスタジオ4.5m、大会議室3.0m、中会議室3.0m、小会議室2.8m）. Stage dimensions at the halls remain notes only and no price observation was added.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 21 deployment passed: production version 66 was deployed successfully; `https://venue.art-monosashi.com/?release=1e2f363` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 20 source data: added four official-source-backed Hokkaido facilities — 小樽市民会館（小樽市）、コーチャンフォー釧路文化ホール（釧路市）、北見芸術文化ホール（北見市）、苫小牧市民文化ホール ART CUBES（苫小牧市） — and 34 independently searchable spaces. Hokkaido is now 14 candidates, 8 municipalities, and 48 spaces.
- Official sources: 小樽市民会館指定管理者、釧路市、北見市、苫小牧市民文化ホール指定管理者. 釧路大ホールの公式収容1,524席のみ容量検索値に採用し、それ以外の客席・面積・天井高・搬入・料金・空き状況は要確認とした。
- No Hokkaido ceiling value or price observation was added. Existing source-published arena/building heights remain untouched; all new ceiling, price, loading, and availability attributes remain `要確認`.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check` all passed with only the pre-existing historical-event warning. `npm run validate` remains required before deployment.
- Wave 20 deployment passed: production version 65 was deployed successfully, and `https://venue.art-monosashi.com/?release=bcf31a5` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 19 source data: added four official-source-backed Ehime facilities — 松山市民会館（松山市）、西条市総合文化会館（西条市）、宇和島市立南予文化会館（宇和島市）、宇和島市立コスモスホール三間（宇和島市） — and 35 independently searchable spaces. Ehime is now 13 candidates, 8 municipalities, and 58 spaces.
- Official sources: 松山市、西条市総合文化会館運営者、宇和島市。松山市民会館の2028年3月末閉館方針と、南予文化会館の改修休館は候補の注記に明記した。南予文化会館の休館中ホールについて料金観測は追加していない。
- No Ehime ceiling value or price observation was added. All new ceiling, price, loading, and availability attributes remain `要確認`; published stage dimensions were not converted into ceiling data.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check` all passed with only the pre-existing historical-event warning. `npm run validate` remains required before deployment.
- Wave 19 deployment passed: production version 64 was deployed successfully, and `https://venue.art-monosashi.com/?release=1fa8c9e` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 14 source data: added four Fukuoka candidates — デンカ大牟田文化会館（大牟田市）、飯塚市文化会館 コスモスコモン（飯塚市）、田主丸複合文化施設（そよ風ホール）（久留米市）、コスメイト行橋（行橋市文化ホール）（行橋市） — and 11 independently searchable spaces. Fukuoka is now 12 candidates, 7 municipalities, and 25 spaces. Official sources: デンカ大牟田文化会館運営者、飯塚市、久留米市、行橋市文化振興公社.
- No Fukuoka ceiling value or price observation was added. All new ceiling, price, loading, and availability attributes remain `要確認`; no stage, proscenium, or building-height statement was converted into ceiling data.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 15 deployment passed: production version 60 was deployed successfully, and `https://venue.art-monosashi.com/?release=a57da99` returned the established site marker.
- Wave 16 source data: added four Okinawa candidates — 那覇市中央公民館（那覇市）、那覇市ぶんかテンブス館（那覇市）、うるま市石川会館（うるま市）、うるま市きむたかホール（うるま市） — and 8 independently searchable spaces. Okinawa is now 12 candidates, 7 municipalities, and 26 spaces. Official sources: 那覇市、うるま市.
- No Okinawa ceiling value or price observation was added. All new ceiling, price, loading, and availability attributes remain `要確認`; approximate capacities and stage/building dimensions were not converted into ceiling data.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 16 deployment passed: production version 61 was deployed successfully, and `https://venue.art-monosashi.com/?release=c2daae4` returned the established site marker.
- Wave 17 source data: added four Niigata candidates — 青海総合文化会館（きらら青海）（糸魚川市）、さくらんど会館（五泉市）、五泉市総合会館（五泉市）、加茂文化会館（加茂市） — and 16 independently searchable spaces. Niigata is now 13 candidates, 10 municipalities, and 40 spaces. Official sources: 糸魚川市、五泉市、加茂市.
- No Niigata ceiling value or price observation was added. All new ceiling, price, loading, and availability attributes remain `要確認`; the Aomi stage-height range and sports-hall dimensions were not converted into ceiling data.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 17 deployment passed: production version 62 was deployed successfully, and `https://venue.art-monosashi.com/?release=6337dc3` returned the established site marker.
- Wave 18 source data: added four Okayama candidates — 津山文化センター（津山市）、津山市勝北文化センター（津山市）、美作文化センター（美作市）、玉野市立中央公民館（玉野市） — and 28 independently searchable spaces. Okayama is now 13 candidates, 9 municipalities, and 56 spaces. Official sources: 津山市・津山文化センター運営者、美作市、玉野市.
- No Okayama ceiling value or price observation was added. All new ceiling, price, loading, and availability attributes remain `要確認`; stage or building dimensions were not converted into ceiling data.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.
- Wave 18 deployment passed: production version 63 was deployed successfully, and `https://venue.art-monosashi.com/?release=7d09936` returned the established site marker.
- Wave 14 deployment passed: production version 59 was deployed successfully, and `https://venue.art-monosashi.com/?release=dfbcb27` returned the established site marker.
- Wave 15 source data: added four Nagasaki candidates — メモリード・シーハットおおむら（大村市）、長崎市民会館（長崎市）、長崎市平和会館（長崎市）、長崎市三和公民館（長崎市） — and 15 independently searchable spaces. Nagasaki is now 12 candidates, 6 municipalities, and 34 spaces. Official sources: 大村市、長崎市.
- No Nagasaki ceiling value or price observation was added. All new ceiling, price, loading, and availability attributes remain `要確認`; stage dimensions, building dimensions, and maximum layout capacities were not converted into ceiling data.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning.

## Next Action

- Wave 40 source data: added four official-source-backed Shizuoka facilities — 三島市民文化会館、焼津文化会館、掛川市文化会館シオーネ、かなや会館 — and 18 independently searchable spaces. Shizuoka is now 15 candidates, 12 municipalities, and 61 spaces.
- Official sources: 三島市、焼津市、掛川市、島田市。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; all unreported conditions remain `要確認`.
- Wave 40 local verification passed: app-data generation, audit, depth-report generation, and whitespace check passed with only the pre-existing historical-record warning. `npm run validate`, source commit, public deployment, and custom-domain verification remain to be completed.
- Wave 40 deployment passed: production version 85 was deployed successfully from commit `56a8980cb46c76dd5537a1ec331309ca9e1d1fe3`; the Sites URL and `https://venue.art-monosashi.com/?release=56a8980` returned the established site marker. Tracked `web/dist` output was restored after deployment.

- Wave 41 source data: added five official-source-backed Shiga facilities — 大津市民会館、大津市北部地域文化センター、大津市和邇文化センター、ひこね市文化プラザ、草津アミカホール — and 5 independently searchable spaces. Shiga is now 16 candidates, 9 municipalities, and 43 spaces.
- Official sources: 滋賀県、草津市。Only explicitly published capacities were recorded; no ceiling or price value was inferred and all unreported conditions remain `要確認`.
- Wave 41 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `f4360dc2e45181d049139cb1446c9b1345390011` was pushed to the authorized Sites source repository, production version 86 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=f4360dc` returned the established marker. Tracked `web/dist` output was restored.

- Wave 42 source data: added four official-source-backed Nara facilities — 葛城市當麻文化会館、葛城市新庄文化会館、五條市立西吉野コミュニティセンター、桜井市まほろばセンター — and 22 independently searchable spaces. Nara is now 15 candidates, 13 municipalities, and 69 spaces.
- Official sources: 葛城市、五條市、桜井市。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; published stage height at 新庄文化会館 remains a note only, and all unreported conditions remain `要確認`.
- Wave 42 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `6e0fde743f4c781515975ef014d24830aae97ef1` was pushed to the authorized Sites source repository, production version 87 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=6e0fde7` returned the established marker. Tracked `web/dist` output was restored.

- Wave 43 source data: added four official-source-backed Tottori facilities — ハワイアロハホール、三朝町総合文化ホール、南部町公民館（富有まんてんホール）、智頭町総合センター・中央公民館 — and 27 independently searchable spaces. Tottori is now 15 candidates, 12 municipalities, and 70 spaces.
- Official sources: 湯梨浜町、三朝町、南部町、智頭町。Explicit capacities and floor areas only were recorded. No ceiling or price observation was added; all unreported conditions remain `要確認`.
- Wave 43 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `cb805ffc7a5621e88c6859d0554f32a71943d608` was pushed to the authorized Sites source repository, production version 88 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=cb805ff` returned the established marker. Tracked `web/dist` output was restored.

- Wave 44 source data: added four official-source-backed Yamaguchi facilities — 光市民ホール、長門市文化会館 ラポールゆや、柳東文化会館、和木町文化会館 — and 17 independently searchable spaces. Yamaguchi is now 15 candidates, 14 municipalities, and 76 spaces.
- Official sources: 光市、長門市、柳井市、和木町。Explicit room areas only were recorded; no ceiling or price observation was added and all unreported conditions remain `要確認`.
- Wave 44 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `8ac0888232ad94b3045c2b5557e29a7850be241b` was pushed to the authorized Sites source repository, production version 89 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=8ac0888` returned the established marker. Tracked `web/dist` output was restored.

- Wave 45 source data: added four official-source-backed Tokushima facilities — 牟岐町海の総合文化センター、板野町歴史文化公園・文化の館、つるぎ町貞光中央公民館、吉野中央ふれあいセンター — and 21 independently searchable spaces. Tokushima is now 15 candidates, 12 municipalities, and 56 spaces.
- Official sources: 牟岐町、板野町、つるぎ町、阿波市。Only explicit capacity and area values were recorded. The 板野町さくらホール's approximate seat count remains a descriptive note, not a numeric filter value. No ceiling or price observation was added; all unreported conditions remain `要確認`.
- Wave 45 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `a1e5cb71474d08dcafa396d75f285cd01f5e7574` was pushed to the authorized Sites source repository, production version 90 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=a1e5cb7` returned the established marker. Tracked `web/dist` output was restored.

- Wave 46 source data: added four official-source-backed Oita facilities — 津久見市民会館、つぶらなカボスアリーナ（杵築市文化体育館）、竹田市総合文化ホール グランツたけた、臼杵市民会館 — and 24 independently searchable spaces. Oita is now 15 candidates, 13 municipalities, and 80 spaces.
- Official sources: 津久見市、杵築市、竹田市、臼杵市。Only explicit capacity, area, and the official キナーレ ceiling height were recorded. Stage heights were not converted to ceiling values, and no price observation was added; all unreported conditions remain `要確認`.
- Wave 46 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `7b6391480e81a2ef639c8c684b2a269ec80f70e7` was pushed to the authorized Sites source repository, production version 91 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=7b63914` returned the established marker. Tracked `web/dist` output was restored.

- Wave 47 source data: added four official-source-backed Miyazaki facilities — サンA川南文化ホール、木城町総合交流センター リバリス、新富町文化会館 ルピナスみらい、綾町中央公民館・文化ホール — and 25 searchable spaces. Miyazaki is now 15 candidates, 14 municipalities, and 78 spaces.
- Official sources: 川南町、木城町、新富町と新富町文化会館公式運営者、綾町。Only explicit capacities and floor areas were recorded. The 800 main-hall seats at ルピナスみらい exclude the separately stated parent and wheelchair spaces; no ceiling or price value was inferred, and all unreported conditions remain `要確認`.
- Wave 47 local verification passed: app-data generation, audit, depth-report generation, and whitespace check passed with only the pre-existing historical-record warning.
- Wave 47 verification and deployment passed: `npm run validate` passed with only the pre-existing historical-record warning; source commit `d07255cb7e461bbd5f738fa353f4b4389d01e53c` was pushed to the authorized Sites source repository, production version 92 deployed successfully, and the Sites URL plus `https://venue.art-monosashi.com/?release=d07255c` returned the established marker. Tracked `web/dist` output was restored.
- Wave 48 source data: added four official-source-backed Aomori facilities — 三沢市公会堂・三沢市立中央公民館、おいらせ町民交流センター、七戸中央公民館、三戸町中央公民館 — and 27 searchable spaces. Aomori is now 16 candidates, 14 municipalities, and 90 spaces.
- Official sources: 三沢市、おいらせ町、七戸町、三戸町。Only explicit capacities and floor areas were recorded. No ceiling or price value was inferred; all unreported conditions remain `要確認`.
- Wave 48 local verification passed: app-data generation, audit, depth-report generation, and whitespace check passed with only the pre-existing historical-record warning. `npm run validate`, source commit, public deployment, and custom-domain verification remain to be completed.
- Research one bounded official-source wave for 宮城県, the next lowest candidate-depth prefecture at 12 candidates, then regenerate all reports and deploy after validation.

## Blockers

- None. The repository safety blocker was cleared by destination-specific user authorization, and Wave 31 deployed successfully without DNS, secret, or account-setting changes.
