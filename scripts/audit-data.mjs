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
const priceObservations = loadCsv("data/price-observations.csv");
const venueOperations = loadCsv("data/venue-operations.csv");
const historicalVenueAliases = loadCsv("data/historical-venue-aliases.csv");
const budgetScenarios = loadCsv("data/budget-scenarios.csv");
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
    "source_url",
    "observed_at",
    "verification_status",
  ],
  "venue-details.csv",
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
checkUnique(historical, "event_id", "historical-events.csv");
checkUnique(candidates, "candidate_id", "candidate-venues.csv");
checkUnique(prefectureCoverage, "prefecture", "prefecture-coverage.csv");
checkUnique(venueDetails, "detail_id", "venue-details.csv");
checkUnique(priceObservations, "price_id", "price-observations.csv");
checkUnique(venueOperations, "operation_id", "venue-operations.csv");
checkUnique(historicalVenueAliases, "alias_id", "historical-venue-aliases.csv");
checkUnique(budgetScenarios, "scenario_id", "budget-scenarios.csv");
[
  ["historical-events.csv", historical],
  ["candidate-venues.csv", candidates],
  ["prefecture-coverage.csv", prefectureCoverage],
  ["venue-details.csv", venueDetails],
  ["price-observations.csv", priceObservations],
  ["venue-operations.csv", venueOperations],
  ["historical-venue-aliases.csv", historicalVenueAliases],
  ["budget-scenarios.csv", budgetScenarios],
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
  "capacity_theater",
  "capacity_fixed",
  "floor_load_kg_m2",
];

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
  if (row.derivation_method !== "sum_verified_components") {
    errors.push(`budget-scenarios.csv:${line} invalid derivation_method=${row.derivation_method}`);
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
  if (
    componentQuantities.length !== componentIds.length ||
    componentQuantities.some(
      (quantity) => !Number.isInteger(quantity) || quantity < 1,
    )
  ) {
    errors.push(`budget-scenarios.csv:${line} invalid component_quantities`);
  }
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
      component.unit !== "per_slot" ||
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
    if (componentTotal !== amount) {
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
console.log(`price_observation_rows=${priceObservations.length}`);
console.log(`venue_operation_rows=${venueOperations.length}`);
console.log(`historical_venue_alias_rows=${historicalVenueAliases.length}`);
console.log(`budget_scenario_rows=${budgetScenarios.length}`);
console.log(`warnings=${warnings.length}`);
warnings.forEach((warning) => console.log(`WARN ${warning}`));
console.log(`errors=${errors.length}`);
errors.forEach((error) => console.error(`ERROR ${error}`));

if (errors.length) process.exitCode = 1;
