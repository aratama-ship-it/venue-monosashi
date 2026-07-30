# 会場ものさし データ辞書

調査値は、施設の性質、料金観測、主催者向け検索条件を分離する。空欄は0ではなく「未確認」を意味する。

## venue-details.csv

粒度は「施設内の1貸出区画」。複合施設は展示場、劇場、会議室などを別行にする。

| 列 | 意味 |
|---|---|
| detail_id | 貸出区画の一意ID |
| candidate_id | `candidate-venues.csv`の候補ID |
| space_id | 施設内区画ID |
| space_name | 公式の区画名 |
| space_type | exhibition / arena / theater / flat_hall / conference / meeting / outdoor等 |
| area_m2 | 公開された貸出面積。推定値は入れない |
| ceiling_height_m | 公開された天井高 |
| capacity_theater | シアター形式最大収容数 |
| capacity_fixed | 固定席数 |
| floor_load_kg_m2 | 床荷重。t/㎡はkg/㎡へ換算した場合に注記 |
| divisible | yes / no / unknown |
| stage_type | fixed / temporary / convertible / none / unknown |
| sports_or_practice_use | yes / conditional / no / unknown |
| streaming_ready | yes / conditional / no / unknown |
| source_url | 数値・条件を確認した公式URL |
| observed_at | 情報を取得した日 |
| verification_status | verified / needs_check |
| note | 単位換算、制限、追加確認点 |

## price-observations.csv

粒度は「1施設区画×1料金区分×1時間帯」。同じ区画でも平日・休日、非営利・興行、入場料条件を別行にする。

| 列 | 意味 |
|---|---|
| price_id | 料金観測の一意ID |
| candidate_id | 候補ID |
| space_id | `venue-details.csv`の区画ID |
| charge_category | facility / hvac / equipment / cleaning / security / setup等 |
| use_case | アマチュアスポーツ、会議、展示会、興行など公式区分 |
| day_type | weekday / weekend_holiday / all |
| time_band | 公式の時間区分 |
| amount_jpy | 公式表記の金額。概算総額ではない |
| tax_status | included / excluded / not_stated |
| unit | per_slot / per_day / per_hour / per_use等 |
| basis | 入場料条件、全面・半面、営利条件など |
| valid_from | 料金表に明記された適用開始日 |
| observed_at | 調査日 |
| verification_status | verified / needs_current_check / needs_check |
| source_url | 公式料金表URL |
| exclusions | 冷暖房、設備、設営、警備など含まれない費用 |
| note | 改定、割引、予約日による旧料金適用など |

## 予算検索の扱い

初期検索では「会場基本料」と「総予算」を同一視しない。

- 公式基本料: 料金表から直接比較できる。
- 必須追加費: 冷暖房、音響、照明、清掃、警備、電源、設営撤去を積み上げる。
- 条件依存費: 入場料、営利区分、曜日、時間外、全面・分割、仮設舞台で変わる。
- 主催者側費用: 旅費、宿泊、配信、人件費、保険、輸送は施設料金と分ける。
- 未確認費: 0円として計算せず、概算を表示しないか範囲外として警告する。

将来の検索結果では、`確認済み最低額`、`追加費未確認`、`想定条件`、`料金表の適用日`を並べて表示する。

## budget-scenarios.csv

施設が一括日額を公表していない場合に、同じ区画・用途・適用期間の確認済み時間区分を合算した「参考合計」。公式公表額そのものではないため、`price-observations.csv`とは分離する。

| 列 | 意味 |
|---|---|
| scenario_id | 参考合計の一意ID |
| candidate_id / space_id | 対象候補と同一貸出区画 |
| scenario_label | どの区分を組み立てたか |
| use_case / day_type / time_span | 用途、曜日、対象時間 |
| total_amount_jpy | 構成要素を数量付きで足した参考額 |
| tax_status | 構成元と一致する税状態 |
| derivation_method | 現在は`sum_verified_components`のみ |
| component_price_ids | `price-observations.csv`の構成元IDを`|`区切りで保持 |
| component_quantities | 構成元IDと同順の使用区分数 |
| valid_from / observed_at | 適用開始日と調査日 |
| verification_status | `derived_from_verified_components`。公式一括日額ではない |
| source_url | 構成元を確認できる公式URL |
| exclusions / note | 含まれない費目、区分間の空き時間、算式上の注意 |

監査は、全構成元が同じ候補・区画の確認済み施設基本料か、単位が`per_slot`か、数量付き合計が一致するかを検証する。検索画面では既定で使わず、「区分料金から組み立てた参考合計も予算検索に含める」を選んだ場合だけ日額比較へ加える。

## venue-operations.csv

粒度は「1施設または1貸出区画の運用条件」。施設の形状や料金とは分離し、アクセス、予約、搬入、設営、飲食・物販、通信、宿泊の判断材料を保持する。

| 列 | 意味 |
|---|---|
| operation_id | 運用観測の一意ID |
| candidate_id | `candidate-venues.csv`の候補ID |
| scope_space_id | 特定区画に限る場合の`space_id`。全館共通なら空欄可 |
| nearest_station / walk_minutes | 最寄駅と公式掲載の徒歩分。直結表記を0分へ変換しない |
| station_access / airport_access | 鉄道・バス・空港からの公式案内 |
| parking_spaces_on_site | 常設の施設内一般車駐車台数。臨時・周辺駐車場を合算しない |
| large_vehicle_access / loading_access | 大型車可否と搬入口・荷捌き・車両制限 |
| booking_open_months / booking_close_days | 受付開始月数と締切日数。区画・催事区分により異なる場合は対象を注記 |
| consecutive_use | 連続日程の可否または要確認状態 |
| setup_teardown_policy | 設営・リハーサル・撤去時間と料金の扱い |
| food_policy / merch_policy | 飲食・物販の公開条件。`unknown`は不可を意味しない |
| network_policy | 常設LAN、専用回線、配信支援と追加料金の扱い |
| lodging_note | 隣接ホテルや施設公式の宿泊案内。部屋数を推定しない |
| access_source_url / booking_source_url / operations_source_url | 分類別の公式出典 |
| observed_at | 調査日 |
| verification_status | verified / needs_check |
| note | 臨時駐車場、要申請、抽選等の重要条件 |

空欄は未確認、`unknown`は公式公開情報だけで判定できない状態、`conditional`は申請・打合せ・催事条件によって変わる状態を表す。

## historical-venue-aliases.csv

過去大会台帳の`venue_names`と現在の候補施設を結ぶ、監査可能な表記揺れ辞書。自動的な曖昧一致は行わず、確認した文字列包含だけを登録する。

| 列 | 意味 |
|---|---|
| alias_id | 照合キーの一意ID |
| candidate_id | 現在の候補施設ID |
| venue_name_contains | 過去台帳の会場名に含まれる確認済み文字列 |
| verification_status | verified / needs_check |
| note | 命名権、旧称、表記揺れ等の説明 |

候補カードの「過去実績」は、この辞書で結べた開催済み、一部中止、分散開催の台帳行数であり、現時点の貸出可否や同じ区画での開催を意味しない。予定行は別に数える。

## url-audit.csv

`npm run audit-urls`実行時に、全データ表の一次情報URLを重複排除して生成する到達確認スナップショット。

| check_status | 意味 |
|---|---|
| reachable | HTTP 200〜399。内容が主張を裏づけるかは別途確認する |
| access_limited | HTTP 401・403・429。機械取得は制限されたが、404とは区別する |
| client_error | その他のHTTP 4xx。URL移転・削除・誤記を優先確認する |
| server_error | HTTP 5xx。後日の再確認対象 |
| timeout / network_error | 応答時間超過または通信失敗。施設ページの不存在を意味しない |

`final_url`はリダイレクト後のURL、`references`はそのURLを参照している行IDである。HTTP到達だけで`verification_status`を`verified`へ昇格させない。
