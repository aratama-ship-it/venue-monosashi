import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (quoted && char === '"' && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if (char === "\n" && !quoted) {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers, ...values] = rows;
  return values.map((valuesRow) =>
    Object.fromEntries(headers.map((header, index) => [header, valuesRow[index] ?? ""])),
  );
}

function loadCsv(relativePath) {
  return parseCsv(fs.readFileSync(path.join(projectRoot, relativePath), "utf8"));
}

const historical = loadCsv("data/historical-events.csv");
const candidates = loadCsv("data/candidate-venues.csv");
const prefectureCoverage = loadCsv("data/prefecture-coverage.csv");
const venueDetails = loadCsv("data/venue-details.csv");
const ceilingRechecks = loadCsv("data/ceiling-recheck-ledger.csv");
const priceObservations = loadCsv("data/price-observations.csv");
const venueOperations = loadCsv("data/venue-operations.csv");
const historicalVenueAliases = loadCsv("data/historical-venue-aliases.csv");
const budgetScenarios = loadCsv("data/budget-scenarios.csv");
// 検索画面 web/app/venue-search.tsx の PriceDayType と必ず一致させること。
// ここに無い値を入れると、平日／土日祝で絞ったとき予算検索から静かに消える。
const DAY_TYPES = new Set(["all", "weekday", "weekend_holiday"]);
// 「施設が区切った予約単位」であればよい。台帳では同じ意味の単位が複数の名前で入っている。
// per_8_hours 等の長い区分も、施設が1コマとして売っている以上ここに含める。
const SLOT_COMPONENT_UNITS = new Set([
  "per_slot",
  "per_time_band",
  "per_3_hours",
  "per_4_hours",
  "per_5_hours",
  "per_8_hours",
  "per_9_hours",
  "per_half_day",
]);
const venueWebsites = loadCsv("data/venue-websites.csv");
const errors = [];
const warnings = [];

function requireFields(rows, fields, dataset) {
  rows.forEach((row, index) => {
    fields.forEach((field) => {
      if (!row[field]) errors.push(`${dataset}:${index + 2} missing ${field}`);
    });
  });
}

function checkUnique(rows, field, dataset) {
  const seen = new Set();
  rows.forEach((row, index) => {
    if (seen.has(row[field])) errors.push(`${dataset}:${index + 2} duplicate ${field}=${row[field]}`);
    seen.add(row[field]);
  });
}

function checkWhitespaceOnly(rows, dataset) {
  rows.forEach((row, index) => {
    Object.entries(row).forEach(([field, value]) => {
      if (value !== "" && value.trim() === "") {
        errors.push(`${dataset}:${index + 2} whitespace-only ${field}`);
      }
    });
  });
}

requireFields(
  historical,
  ["event_id", "series", "year", "event_status", "verification_status", "source_url"],
  "historical-events.csv",
);
requireFields(
  candidates,
  ["candidate_id", "region", "prefecture", "city", "facility_name", "fit_level", "verification_status", "official_url"],
  "candidate-venues.csv",
);
requireFields(
  prefectureCoverage,
  [
    "prefecture",
    "region",
    "representative_candidate_id",
    "facility_name",
    "verification_status",
  ],
  "prefecture-coverage.csv",
);
requireFields(
  venueDetails,
  [
    "detail_id",
    "candidate_id",
    "space_id",
    "space_name",
    "space_type",
    "ceiling_height_type",
    "overhead_use_status",
    "source_url",
    "observed_at",
    "verification_status",
  ],
  "venue-details.csv",
);
requireFields(
  ceilingRechecks,
  [
    "review_id",
    "detail_id",
    "candidate_id",
    "space_name",
    "raw_height_m",
    "previous_type",
    "resolution",
    "ceiling_height_type",
    "evidence_url",
    "reviewed_at",
  ],
  "ceiling-recheck-ledger.csv",
);
requireFields(
  priceObservations,
  [
    "price_id",
    "candidate_id",
    "space_id",
    "charge_category",
    "day_type",
    "time_band",
    "amount_jpy",
    "tax_status",
    "unit",
    "observed_at",
    "verification_status",
    "source_url",
  ],
  "price-observations.csv",
);
requireFields(
  venueOperations,
  [
    "operation_id",
    "candidate_id",
    "observed_at",
    "verification_status",
  ],
  "venue-operations.csv",
);
requireFields(
  historicalVenueAliases,
  [
    "alias_id",
    "candidate_id",
    "venue_name_contains",
    "verification_status",
  ],
  "historical-venue-aliases.csv",
);
requireFields(
  budgetScenarios,
  [
    "scenario_id",
    "candidate_id",
    "space_id",
    "scenario_label",
    "use_case",
    "day_type",
    "time_span",
    "total_amount_jpy",
    "tax_status",
    "derivation_method",
    "component_price_ids",
    "component_quantities",
    "observed_at",
    "verification_status",
    "source_url",
  ],
  "budget-scenarios.csv",
);
requireFields(
  venueWebsites,
  [
    "website_id",
    "candidate_id",
    "website_url",
    "observed_at",
    "verification_status",
    "source_url",
  ],
  "venue-websites.csv",
);
checkUnique(historical, "event_id", "historical-events.csv");
checkUnique(candidates, "candidate_id", "candidate-venues.csv");
checkUnique(prefectureCoverage, "prefecture", "prefecture-coverage.csv");
checkUnique(venueDetails, "detail_id", "venue-details.csv");
checkUnique(ceilingRechecks, "review_id", "ceiling-recheck-ledger.csv");
checkUnique(priceObservations, "price_id", "price-observations.csv");
checkUnique(venueOperations, "operation_id", "venue-operations.csv");
checkUnique(historicalVenueAliases, "alias_id", "historical-venue-aliases.csv");
checkUnique(budgetScenarios, "scenario_id", "budget-scenarios.csv");
checkUnique(venueWebsites, "website_id", "venue-websites.csv");
checkUnique(venueWebsites, "candidate_id", "venue-websites.csv");
[
  ["historical-events.csv", historical],
  ["candidate-venues.csv", candidates],
  ["prefecture-coverage.csv", prefectureCoverage],
  ["venue-details.csv", venueDetails],
  ["ceiling-recheck-ledger.csv", ceilingRechecks],
  ["price-observations.csv", priceObservations],
  ["venue-operations.csv", venueOperations],
  ["historical-venue-aliases.csv", historicalVenueAliases],
  ["budget-scenarios.csv", budgetScenarios],
  ["venue-websites.csv", venueWebsites],
].forEach(([dataset, rows]) => checkWhitespaceOnly(rows, dataset));

const eventStatuses = new Set([
  "held",
  "planned",
  "cancelled",
  "partially_cancelled",
  "hybrid_decentralized",
]);
const verificationStatuses = new Set(["verified", "needs_check"]);

historical.forEach((row, index) => {
  const line = index + 2;
  const year = Number(row.year);
  if (!Number.isInteger(year) || year < 1990 || year > 2030) {
    errors.push(`historical-events.csv:${line} invalid year=${row.year}`);
  }
  if (!eventStatuses.has(row.event_status)) {
    errors.push(`historical-events.csv:${line} invalid event_status=${row.event_status}`);
  }
  if (!verificationStatuses.has(row.verification_status)) {
    errors.push(`historical-events.csv:${line} invalid verification_status=${row.verification_status}`);
  }
  if (!/^https:\/\//.test(row.source_url)) {
    errors.push(`historical-events.csv:${line} non-https source_url`);
  }
  if (!["cancelled"].includes(row.event_status) && !row.venue_names) {
    const message = `historical-events.csv:${line} held/planned row has no venue_names`;
    if (row.verification_status === "needs_check") warnings.push(message);
    else errors.push(message);
  }
});

candidates.forEach((row, index) => {
  const line = index + 2;
  if (!new Set(["A", "B", "C"]).has(row.fit_level)) {
    errors.push(`candidate-venues.csv:${line} invalid fit_level=${row.fit_level}`);
  }
  if (!verificationStatuses.has(row.verification_status)) {
    errors.push(`candidate-venues.csv:${line} invalid verification_status=${row.verification_status}`);
  }
  if (!/^https:\/\//.test(row.official_url)) {
    errors.push(`candidate-venues.csv:${line} non-https official_url`);
  }
});

const candidateIds = new Set(candidates.map((row) => row.candidate_id));
venueWebsites.forEach((row, index) => {
  const line = index + 2;
  if (!candidateIds.has(row.candidate_id)) {
    errors.push(`venue-websites.csv:${line} unknown candidate_id=${row.candidate_id}`);
  }
  if (!/^https:\/\//.test(row.website_url)) {
    errors.push(`venue-websites.csv:${line} non-https website_url`);
  }
  if (!/^https:\/\//.test(row.source_url)) {
    errors.push(`venue-websites.csv:${line} non-https source_url`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.observed_at)) {
    errors.push(`venue-websites.csv:${line} invalid observed_at=${row.observed_at}`);
  }
  if (!verificationStatuses.has(row.verification_status)) {
    errors.push(
      `venue-websites.csv:${line} invalid verification_status=${row.verification_status}`,
    );
  }
});
const japanesePrefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];
const unexpectedPrefectures = [...new Set(candidates.map((row) => row.prefecture))]
  .filter((prefecture) => !japanesePrefectures.includes(prefecture));
const missingPrefectures = japanesePrefectures.filter(
  (prefecture) => !candidates.some((row) => row.prefecture === prefecture),
);
unexpectedPrefectures.forEach((prefecture) => {
  errors.push(`candidate-venues.csv unexpected prefecture=${prefecture}`);
});
missingPrefectures.forEach((prefecture) => {
  errors.push(`candidate-venues.csv missing prefecture=${prefecture}`);
});
const coverageByPrefecture = new Map(
  prefectureCoverage.map((row) => [row.prefecture, row]),
);
japanesePrefectures.forEach((prefecture) => {
  const row = coverageByPrefecture.get(prefecture);
  if (!row) {
    errors.push(`prefecture-coverage.csv missing prefecture=${prefecture}`);
    return;
  }
  const candidate = candidates.find(
    (candidateRow) => candidateRow.candidate_id === row.representative_candidate_id,
  );
  if (!candidate) {
    errors.push(
      `prefecture-coverage.csv unknown representative_candidate_id=${row.representative_candidate_id}`,
    );
    return;
  }
  if (candidate.prefecture !== row.prefecture) {
    errors.push(
      `prefecture-coverage.csv candidate prefecture mismatch=${row.prefecture}:${row.representative_candidate_id}`,
    );
  }
  if (
    candidate.region !== row.region ||
    candidate.facility_name !== row.facility_name ||
    candidate.verification_status !== row.verification_status
  ) {
    errors.push(
      `prefecture-coverage.csv candidate snapshot mismatch=${row.prefecture}:${row.representative_candidate_id}`,
    );
  }
});
prefectureCoverage
  .filter((row) => !japanesePrefectures.includes(row.prefecture))
  .forEach((row) => {
    errors.push(`prefecture-coverage.csv unexpected prefecture=${row.prefecture}`);
  });
const detailKeys = new Set(venueDetails.map((row) => `${row.candidate_id}:${row.space_id}`));
const detailVerificationStatuses = new Set(["verified", "needs_check"]);
const priceVerificationStatuses = new Set([
  "verified",
  "needs_current_check",
  "needs_check",
]);
const taxStatuses = new Set(["included", "excluded", "not_stated"]);
const numericDetailFields = [
  "area_m2",
  "ceiling_height_m",
  "clear_height_min_m",
  "capacity_theater",
  "capacity_fixed",
  "floor_load_kg_m2",
];
const ceilingHeightTypes = new Set([
  "minimum_clear",
  "published_clear",
  "range_minimum",
  "highest_point",
  "stage_opening",
  "stage_clearance",
  "nominal_review",
  "unknown",
]);
const filterableCeilingTypes = new Set([
  "minimum_clear",
  "published_clear",
  "range_minimum",
]);
const overheadUseStatuses = new Set([
  "verified",
  "conditional",
  "prohibited",
  "unknown",
]);

venueDetails.forEach((row, index) => {
  const line = index + 2;
  if (!candidateIds.has(row.candidate_id)) {
    errors.push(`venue-details.csv:${line} unknown candidate_id=${row.candidate_id}`);
  }
  if (!detailVerificationStatuses.has(row.verification_status)) {
    errors.push(
      `venue-details.csv:${line} invalid verification_status=${row.verification_status}`,
    );
  }
  if (!/^https:\/\//.test(row.source_url)) {
    errors.push(`venue-details.csv:${line} non-https source_url`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.observed_at)) {
    errors.push(`venue-details.csv:${line} invalid observed_at=${row.observed_at}`);
  }
  numericDetailFields.forEach((field) => {
    if (row[field] !== "" && (!Number.isFinite(Number(row[field])) || Number(row[field]) < 0)) {
      errors.push(`venue-details.csv:${line} invalid ${field}=${row[field]}`);
    }
  });
  if (row.ceiling_height_m !== "" && Number(row.ceiling_height_m) > 100) {
    errors.push(
      `venue-details.csv:${line} implausible ceiling_height_m=${row.ceiling_height_m}`,
    );
  }
  if (!ceilingHeightTypes.has(row.ceiling_height_type)) {
    errors.push(
      `venue-details.csv:${line} invalid ceiling_height_type=${row.ceiling_height_type}`,
    );
  }
  if (!overheadUseStatuses.has(row.overhead_use_status)) {
    errors.push(
      `venue-details.csv:${line} invalid overhead_use_status=${row.overhead_use_status}`,
    );
  }
  if (row.ceiling_height_m && row.ceiling_height_type === "unknown") {
    errors.push(`venue-details.csv:${line} raw ceiling has unknown type`);
  }
  if (row.clear_height_min_m && !filterableCeilingTypes.has(row.ceiling_height_type)) {
    errors.push(
      `venue-details.csv:${line} non-filterable type has clear_height_min_m=${row.ceiling_height_type}`,
    );
  }
  if (!row.clear_height_min_m && filterableCeilingTypes.has(row.ceiling_height_type)) {
    errors.push(
      `venue-details.csv:${line} filterable type missing clear_height_min_m=${row.ceiling_height_type}`,
    );
  }
  if (
    row.clear_height_min_m &&
    row.ceiling_height_m &&
    Number(row.clear_height_min_m) > Number(row.ceiling_height_m)
  ) {
    errors.push(
      `venue-details.csv:${line} clear height exceeds raw ceiling=${row.clear_height_min_m}>${row.ceiling_height_m}`,
    );
  }
});

const detailById = new Map(venueDetails.map((row) => [row.detail_id, row]));
ceilingRechecks.forEach((row, index) => {
  const line = index + 2;
  const detail = detailById.get(row.detail_id);
  if (!detail) {
    errors.push(`ceiling-recheck-ledger.csv:${line} unknown detail_id=${row.detail_id}`);
    return;
  }
  if (detail.candidate_id !== row.candidate_id || detail.space_name !== row.space_name) {
    errors.push(`ceiling-recheck-ledger.csv:${line} detail snapshot mismatch=${row.detail_id}`);
  }
  if (!new Set(["resolved_filterable", "resolved_excluded", "human_review"]).has(row.resolution)) {
    errors.push(`ceiling-recheck-ledger.csv:${line} invalid resolution=${row.resolution}`);
  }
  if (!/^https:\/\//.test(row.evidence_url)) {
    errors.push(`ceiling-recheck-ledger.csv:${line} non-https evidence_url`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.reviewed_at)) {
    errors.push(`ceiling-recheck-ledger.csv:${line} invalid reviewed_at=${row.reviewed_at}`);
  }
  if (
    detail.clear_height_min_m !== row.clear_height_min_m ||
    detail.ceiling_height_type !== row.ceiling_height_type
  ) {
    errors.push(`ceiling-recheck-ledger.csv:${line} resolution drift=${row.detail_id}`);
  }
  if (row.resolution === "human_review" && !row.human_action) {
    errors.push(`ceiling-recheck-ledger.csv:${line} human review missing action=${row.detail_id}`);
  }
});

priceObservations.forEach((row, index) => {
  const line = index + 2;
  if (!candidateIds.has(row.candidate_id)) {
    errors.push(`price-observations.csv:${line} unknown candidate_id=${row.candidate_id}`);
  }
  if (!detailKeys.has(`${row.candidate_id}:${row.space_id}`)) {
    errors.push(
      `price-observations.csv:${line} unknown detail key=${row.candidate_id}:${row.space_id}`,
    );
  }
  if (!Number.isFinite(Number(row.amount_jpy)) || Number(row.amount_jpy) < 0) {
    errors.push(`price-observations.csv:${line} invalid amount_jpy=${row.amount_jpy}`);
  }
  if (!taxStatuses.has(row.tax_status)) {
    errors.push(`price-observations.csv:${line} invalid tax_status=${row.tax_status}`);
  }
  if (!DAY_TYPES.has(row.day_type)) {
    errors.push(`price-observations.csv:${line} invalid day_type=${row.day_type}`);
  }
  if (!priceVerificationStatuses.has(row.verification_status)) {
    errors.push(
      `price-observations.csv:${line} invalid verification_status=${row.verification_status}`,
    );
  }
  if (!/^https:\/\//.test(row.source_url)) {
    errors.push(`price-observations.csv:${line} non-https source_url`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.observed_at)) {
    errors.push(`price-observations.csv:${line} invalid observed_at=${row.observed_at}`);
  }
});

venueOperations.forEach((row, index) => {
  const line = index + 2;
  if (!candidateIds.has(row.candidate_id)) {
    errors.push(`venue-operations.csv:${line} unknown candidate_id=${row.candidate_id}`);
  }
  if (row.scope_space_id && !detailKeys.has(`${row.candidate_id}:${row.scope_space_id}`)) {
    errors.push(
      `venue-operations.csv:${line} unknown detail key=${row.candidate_id}:${row.scope_space_id}`,
    );
  }
  if (!detailVerificationStatuses.has(row.verification_status)) {
    errors.push(
      `venue-operations.csv:${line} invalid verification_status=${row.verification_status}`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.observed_at)) {
    errors.push(`venue-operations.csv:${line} invalid observed_at=${row.observed_at}`);
  }
  const sourceFields = [
    "access_source_url",
    "booking_source_url",
    "operations_source_url",
  ];
  if (!sourceFields.some((field) => row[field])) {
    errors.push(`venue-operations.csv:${line} missing all source URLs`);
  }
  sourceFields.forEach((field) => {
    if (row[field] && !/^https:\/\//.test(row[field])) {
      errors.push(`venue-operations.csv:${line} non-https ${field}`);
    }
  });
  ["walk_minutes", "parking_spaces_on_site", "booking_open_months", "booking_close_days"].forEach(
    (field) => {
      if (row[field] !== "" && (!Number.isFinite(Number(row[field])) || Number(row[field]) < 0)) {
        errors.push(`venue-operations.csv:${line} invalid ${field}=${row[field]}`);
      }
    },
  );
});

historicalVenueAliases.forEach((row, index) => {
  const line = index + 2;
  if (!candidateIds.has(row.candidate_id)) {
    errors.push(
      `historical-venue-aliases.csv:${line} unknown candidate_id=${row.candidate_id}`,
    );
  }
  if (!detailVerificationStatuses.has(row.verification_status)) {
    errors.push(
      `historical-venue-aliases.csv:${line} invalid verification_status=${row.verification_status}`,
    );
  }
  if (!historical.some((event) => event.venue_names.includes(row.venue_name_contains))) {
    errors.push(
      `historical-venue-aliases.csv:${line} alias has no historical match=${row.venue_name_contains}`,
    );
  }
});

const priceById = new Map(priceObservations.map((row) => [row.price_id, row]));
budgetScenarios.forEach((row, index) => {
  const line = index + 2;
  if (!candidateIds.has(row.candidate_id)) {
    errors.push(`budget-scenarios.csv:${line} unknown candidate_id=${row.candidate_id}`);
  }
  const matchingDetail = venueDetails.some(
    (detail) =>
      detail.candidate_id === row.candidate_id &&
      detail.space_id === row.space_id,
  );
  if (!matchingDetail) {
    errors.push(
      `budget-scenarios.csv:${line} unknown detail key=${row.candidate_id}:${row.space_id}`,
    );
  }
  const amount = Number(row.total_amount_jpy);
  if (!Number.isFinite(amount) || amount < 0) {
    errors.push(`budget-scenarios.csv:${line} invalid total_amount_jpy=${row.total_amount_jpy}`);
  }
  if (
    row.derivation_method !== "sum_verified_components" &&
    row.derivation_method !== "hourly_rate_times_published_hours"
  ) {
    errors.push(`budget-scenarios.csv:${line} invalid derivation_method=${row.derivation_method}`);
  }
  if (!DAY_TYPES.has(row.day_type)) {
    errors.push(`budget-scenarios.csv:${line} invalid day_type=${row.day_type}`);
  }
  if (row.verification_status !== "derived_from_verified_components") {
    errors.push(
      `budget-scenarios.csv:${line} invalid verification_status=${row.verification_status}`,
    );
  }
  const componentIds = row.component_price_ids.split("|").filter(Boolean);
  const componentQuantities = row.component_quantities
    .split("|")
    .map(Number);
  if (!componentIds.length) {
    errors.push(`budget-scenarios.csv:${line} missing component price ids`);
  }
  const components = componentIds.map((priceId) => priceById.get(priceId));
  const validComponentQuantities =
    row.derivation_method === "sum_verified_components"
      ? componentQuantities.every(
          (quantity) => Number.isInteger(quantity) && quantity >= 1,
        )
      : row.derivation_method === "hourly_rate_times_published_hours"
        ? componentQuantities.every(
            (quantity) => Number.isFinite(quantity) && quantity > 0,
          )
        : false;
  if (
    componentQuantities.length !== componentIds.length ||
    !validComponentQuantities
  ) {
    errors.push(`budget-scenarios.csv:${line} invalid component_quantities`);
  }
  if (row.derivation_method === "hourly_rate_times_published_hours") {
    const timeSpanMatch = row.time_span.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/);
    if (!timeSpanMatch) {
      errors.push(`budget-scenarios.csv:${line} invalid time_span=${row.time_span}`);
    } else {
      const [, startHour, startMinute, endHour, endMinute] = timeSpanMatch;
      const timeSpanHours =
        (Number(endHour) * 60 +
          Number(endMinute) -
          (Number(startHour) * 60 + Number(startMinute))) /
        60;
      const quantitySum = componentQuantities.reduce(
        (sum, quantity) => sum + quantity,
        0,
      );
      // time_span より多くの時間を積むことは許さない（想定利用時間を勝手に伸ばせないようにする）。
      // 逆に少ないのは正当: 午前8:30-12:30／午後13:00-17:00 のように区分の間に空き時間があると、
      // 課金対象の合計時間は施設の営業時間より短くなる。
      if (quantitySum > timeSpanHours) {
        errors.push(
          `budget-scenarios.csv:${line} quantity sum ${quantitySum} exceeds time_span hours ${timeSpanHours}`,
        );
      }
    }
  }
  // 区分合算の構成要素は「施設が区切った予約単位」であればよい。台帳では同じ意味の単位が
  // per_slot / per_time_band / per_3_hours / per_4_hours / per_half_day に分かれて入っている。
  const expectedComponentUnits =
    row.derivation_method === "sum_verified_components"
      ? SLOT_COMPONENT_UNITS
      : row.derivation_method === "hourly_rate_times_published_hours"
        ? new Set(["per_hour"])
        : new Set();
  componentIds.forEach((priceId, componentIndex) => {
    const component = components[componentIndex];
    if (!component) {
      errors.push(`budget-scenarios.csv:${line} unknown component_price_id=${priceId}`);
      return;
    }
    if (
      component.candidate_id !== row.candidate_id ||
      component.space_id !== row.space_id ||
      component.charge_category !== "facility" ||
      !expectedComponentUnits.has(component.unit) ||
      component.verification_status !== "verified"
    ) {
      errors.push(`budget-scenarios.csv:${line} incompatible component_price_id=${priceId}`);
    }
  });
  if (
    components.every(Boolean) &&
    componentQuantities.length === componentIds.length
  ) {
    const componentTotal = components.reduce(
      (sum, component, componentIndex) =>
        sum +
        Number(component.amount_jpy) * componentQuantities[componentIndex],
      0,
    );
    if (!(Math.abs(componentTotal - amount) < 0.5)) {
      errors.push(
        `budget-scenarios.csv:${line} component sum ${componentTotal} != ${amount}`,
      );
    }
  }
  if (!/^https:\/\//.test(row.source_url)) {
    errors.push(`budget-scenarios.csv:${line} non-https source_url`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.observed_at)) {
    errors.push(`budget-scenarios.csv:${line} invalid observed_at=${row.observed_at}`);
  }
});

const historicalBySeries = Object.groupBy(historical, (row) => row.series);
const verifiedHistorical = historical.filter((row) => row.verification_status === "verified").length;
const candidateRegions = new Set(candidates.map((row) => row.region));
const candidatePrefectures = new Set(candidates.map((row) => row.prefecture));
const rawCeilingDetails = venueDetails.filter((row) => row.ceiling_height_m);
const filterableCeilingDetails = venueDetails.filter((row) => row.clear_height_min_m);

console.log("Venue Monosashi data audit");
console.log(`historical_rows=${historical.length}`);
console.log(`historical_verified=${verifiedHistorical}`);
console.log(`historical_needs_check=${historical.length - verifiedHistorical}`);
for (const [series, rows] of Object.entries(historicalBySeries)) {
  console.log(`series_${series}=${rows.length}`);
}
console.log(`candidate_rows=${candidates.length}`);
console.log(`candidate_regions=${candidateRegions.size}`);
console.log(`candidate_prefectures=${candidatePrefectures.size}`);
console.log(`candidate_missing_prefectures=${missingPrefectures.length}`);
console.log(`prefecture_coverage_rows=${prefectureCoverage.length}`);
console.log(`venue_detail_rows=${venueDetails.length}`);
console.log(`ceiling_recheck_rows=${ceilingRechecks.length}`);
console.log(
  `ceiling_recheck_human=${ceilingRechecks.filter((row) => row.resolution === "human_review").length}`,
);
console.log(`ceiling_raw_spaces=${rawCeilingDetails.length}`);
console.log(
  `ceiling_raw_candidates=${new Set(rawCeilingDetails.map((row) => row.candidate_id)).size}`,
);
console.log(`ceiling_filterable_spaces=${filterableCeilingDetails.length}`);
console.log(
  `ceiling_filterable_candidates=${new Set(filterableCeilingDetails.map((row) => row.candidate_id)).size}`,
);
console.log(`ceiling_quarantined_spaces=${rawCeilingDetails.length - filterableCeilingDetails.length}`);
console.log(`price_observation_rows=${priceObservations.length}`);
console.log(`venue_operation_rows=${venueOperations.length}`);
console.log(`historical_venue_alias_rows=${historicalVenueAliases.length}`);
console.log(`budget_scenario_rows=${budgetScenarios.length}`);
console.log(`venue_website_rows=${venueWebsites.length}`);
console.log(`warnings=${warnings.length}`);
warnings.forEach((warning) => console.log(`WARN ${warning}`));
console.log(`errors=${errors.length}`);
errors.forEach((error) => console.error(`ERROR ${error}`));

if (errors.length) process.exitCode = 1;
