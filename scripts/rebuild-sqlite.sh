#!/bin/sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_root=$(CDPATH= cd -- "$script_dir/.." && pwd)
database_path="$project_root/data/venue-monosashi.sqlite"
next_database=$(mktemp "$project_root/data/venue-monosashi.sqlite.XXXXXX")

cleanup() {
  if [ -f "$next_database" ]; then
    rm -f -- "$next_database"
  fi
}
trap cleanup EXIT HUP INT TERM

cd "$project_root"

sqlite3 "$next_database" <<'SQL'
CREATE TABLE historical_events(event_id TEXT, series TEXT, year TEXT, event_status TEXT, country TEXT, prefecture_or_state TEXT, city TEXT, venue_names TEXT, verification_status TEXT, source_url TEXT, note TEXT);
CREATE TABLE candidate_venues(candidate_id TEXT, region TEXT, prefecture TEXT, city TEXT, facility_name TEXT, facility_pattern TEXT, fit_level TEXT, verified_public_facts TEXT, inference_or_risk TEXT, verification_status TEXT, official_url TEXT);
CREATE TABLE prefecture_coverage(prefecture TEXT, region TEXT, representative_candidate_id TEXT, facility_name TEXT, verification_status TEXT);
CREATE TABLE venue_details(detail_id TEXT, candidate_id TEXT, space_id TEXT, space_name TEXT, space_type TEXT, area_m2 TEXT, ceiling_height_m TEXT, clear_height_min_m TEXT, ceiling_height_type TEXT, overhead_use_status TEXT, capacity_theater TEXT, capacity_fixed TEXT, floor_load_kg_m2 TEXT, divisible TEXT, stage_type TEXT, sports_or_practice_use TEXT, streaming_ready TEXT, source_url TEXT, observed_at TEXT, verification_status TEXT, note TEXT);
CREATE TABLE ceiling_rechecks(review_id TEXT, detail_id TEXT, candidate_id TEXT, space_name TEXT, raw_height_m TEXT, previous_type TEXT, resolution TEXT, clear_height_min_m TEXT, ceiling_height_type TEXT, evidence_url TEXT, reviewed_at TEXT, human_action TEXT, note TEXT);
CREATE TABLE price_observations(price_id TEXT, candidate_id TEXT, space_id TEXT, charge_category TEXT, use_case TEXT, day_type TEXT, time_band TEXT, amount_jpy TEXT, tax_status TEXT, unit TEXT, basis TEXT, valid_from TEXT, observed_at TEXT, verification_status TEXT, source_url TEXT, exclusions TEXT, note TEXT);
CREATE TABLE venue_operations(operation_id TEXT, candidate_id TEXT, scope_space_id TEXT, nearest_station TEXT, walk_minutes TEXT, station_access TEXT, airport_access TEXT, parking_spaces_on_site TEXT, large_vehicle_access TEXT, loading_access TEXT, booking_open_months TEXT, booking_close_days TEXT, consecutive_use TEXT, setup_teardown_policy TEXT, food_policy TEXT, merch_policy TEXT, network_policy TEXT, lodging_note TEXT, access_source_url TEXT, booking_source_url TEXT, operations_source_url TEXT, observed_at TEXT, verification_status TEXT, note TEXT);
CREATE TABLE historical_venue_aliases(alias_id TEXT, candidate_id TEXT, venue_name_contains TEXT, verification_status TEXT, note TEXT);
CREATE TABLE budget_scenarios(scenario_id TEXT, candidate_id TEXT, space_id TEXT, scenario_label TEXT, use_case TEXT, day_type TEXT, time_span TEXT, total_amount_jpy TEXT, tax_status TEXT, derivation_method TEXT, component_price_ids TEXT, component_quantities TEXT, valid_from TEXT, observed_at TEXT, verification_status TEXT, source_url TEXT, exclusions TEXT, note TEXT);
CREATE TABLE venue_websites(website_id TEXT, candidate_id TEXT, website_url TEXT, observed_at TEXT, verification_status TEXT, source_url TEXT, note TEXT);
.mode csv
.import --skip 1 data/historical-events.csv historical_events
.import --skip 1 data/candidate-venues.csv candidate_venues
.import --skip 1 data/prefecture-coverage.csv prefecture_coverage
.import --skip 1 data/venue-details.csv venue_details
.import --skip 1 data/ceiling-recheck-ledger.csv ceiling_rechecks
.import --skip 1 data/price-observations.csv price_observations
.import --skip 1 data/venue-operations.csv venue_operations
.import --skip 1 data/historical-venue-aliases.csv historical_venue_aliases
.import --skip 1 data/budget-scenarios.csv budget_scenarios
.import --skip 1 data/venue-websites.csv venue_websites
CREATE UNIQUE INDEX idx_historical_event_id ON historical_events(event_id);
CREATE UNIQUE INDEX idx_candidate_id ON candidate_venues(candidate_id);
CREATE UNIQUE INDEX idx_prefecture_coverage ON prefecture_coverage(prefecture);
CREATE UNIQUE INDEX idx_venue_detail_id ON venue_details(detail_id);
CREATE UNIQUE INDEX idx_ceiling_recheck_id ON ceiling_rechecks(review_id);
CREATE UNIQUE INDEX idx_price_id ON price_observations(price_id);
CREATE UNIQUE INDEX idx_operation_id ON venue_operations(operation_id);
CREATE UNIQUE INDEX idx_historical_alias_id ON historical_venue_aliases(alias_id);
CREATE UNIQUE INDEX idx_budget_scenario_id ON budget_scenarios(scenario_id);
CREATE UNIQUE INDEX idx_venue_website_id ON venue_websites(website_id);
CREATE UNIQUE INDEX idx_venue_website_candidate ON venue_websites(candidate_id);
CREATE INDEX idx_historical_series_year ON historical_events(series, year);
CREATE INDEX idx_candidate_prefecture ON candidate_venues(prefecture);
CREATE INDEX idx_detail_candidate_space ON venue_details(candidate_id, space_id);
CREATE INDEX idx_ceiling_recheck_detail ON ceiling_rechecks(detail_id);
CREATE INDEX idx_price_candidate_space ON price_observations(candidate_id, space_id);
CREATE INDEX idx_operation_candidate_space ON venue_operations(candidate_id, scope_space_id);
CREATE INDEX idx_historical_alias_candidate ON historical_venue_aliases(candidate_id);
CREATE INDEX idx_budget_scenario_candidate_space ON budget_scenarios(candidate_id, space_id);
SQL

integrity=$(sqlite3 "$next_database" 'PRAGMA integrity_check;')
if [ "$integrity" != "ok" ]; then
  echo "SQLite integrity check failed: $integrity" >&2
  exit 1
fi

mv -- "$next_database" "$database_path"
trap - EXIT HUP INT TERM

sqlite3 "$database_path" '
SELECT "historical_events", count(*) FROM historical_events
UNION ALL SELECT "candidate_venues", count(*) FROM candidate_venues
UNION ALL SELECT "prefecture_coverage", count(*) FROM prefecture_coverage
UNION ALL SELECT "venue_details", count(*) FROM venue_details
UNION ALL SELECT "ceiling_rechecks", count(*) FROM ceiling_rechecks
UNION ALL SELECT "price_observations", count(*) FROM price_observations
UNION ALL SELECT "venue_operations", count(*) FROM venue_operations
UNION ALL SELECT "historical_venue_aliases", count(*) FROM historical_venue_aliases
UNION ALL SELECT "budget_scenarios", count(*) FROM budget_scenarios
UNION ALL SELECT "venue_websites", count(*) FROM venue_websites;
'
