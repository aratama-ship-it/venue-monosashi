# Unattended National Venue-Depth Resume State

## Status

- Status: ACTIVE
- Last updated: 2026-08-06 Asia/Tokyo
- Current wave: Wave 21 — Kanagawa official-source expansion.

## Baseline

- Git branch and commit: `agent/add-competition-and-small-theater-coverage` at `5c0946bc6e73c553c168f3f8b13468e64790da72`.
- Data counts: 559 candidate facilities, 2,139 searchable spaces, 2,823 price observations, and 222 operation rows.
- Depth target: 25 candidates, 15 municipalities, and 51 spaces per prefecture. Remaining deficits: 616 candidates and 418 spaces; municipality deficit is measured by the generated report.
- Canonical hashes: `candidate-venues.csv` `0a83a784dceea38a3a146587e2457c44fc7403ffbe9c62186a3ca4532f902933`; `venue-details.csv` `2afd5815ea595527bbec8b100daf097684c20a8fefcb18ba32fee82ca49885e1`; `price-observations.csv` `640b4afc3d607a7b796818d49334bf2f56fb303745a92ad8b759b10158e2e396`; `venue-operations.csv` `e80ed96e8c3c4533a6c782933369207b968abb8207f3274c3afc57af149d1c25`.
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

- Wave 21 source data: added four official-source-backed Kanagawa facilities — 厚木市文化会館（厚木市）、カルッツかわさき（川崎市）、鎌倉芸術館（鎌倉市）、小田原三の丸ホール（小田原市） — and 68 independently searchable spaces. Kanagawa is now 14 candidates, 7 municipalities, and 93 spaces.
- Official sources: 厚木市、カルッツかわさき公式運営者、鎌倉芸術館公式運営者、小田原三の丸ホール公式運営者. Explicit room ceiling values were recorded only for カルッツかわさき（アクトスタジオ4.5m、大会議室3.0m、中会議室3.0m、小会議室2.8m）. Stage dimensions at the halls remain notes only and no price observation was added.
- Wave verification passed: app-data generation, `npm run audit`, `npm run depth-report:write`, `git diff --check`, and `npm run validate` all passed with only the pre-existing historical-event warning. Public deployment remains required before closing this wave.

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

- Deploy the validated Wave 21 Kanagawa source commit and verify the public custom domain. Then research one bounded wave for the next lowest candidate-depth prefecture from the regenerated report: 長野県、岐阜県、和歌山県、広島県、高知県、佐賀県、熊本県、鹿児島県 are tied at 10 candidates.

## Blockers

- None.
