import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const writeCsv = process.argv.includes("--write");
const listPrefecture = process.argv.find((arg) => arg.startsWith("--prefecture="))?.split("=")[1];

const TARGET_PER_ROLE = 5;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted && char === '"' && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if (char === "\n" && !quoted) {
      row.push(field.replace(/\r$/, ""));
      if (row.some(Boolean)) rows.push(row);
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
  return parseCsv(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

// web/app/venue-search.tsx の rolesForVenue と同じ判定にそろえる。
// 検索画面が舞台/スポーツとして扱う施設だけを目標の分母にするため。
function rolesForVenue(facilityPattern, spaceTypes, stageTypes) {
  const categoryParts = new Set(facilityPattern.split("_"));
  const hasCategory = (...parts) => parts.some((part) => categoryParts.has(part));
  const hasSpace = (...types) => types.some((type) => spaceTypes.has(type));
  const roles = new Set();

  if (
    hasCategory("stage", "theater", "culture") ||
    hasSpace("stage", "stage_hall", "theater", "black_box") ||
    [...stageTypes].some((type) => !["none", "unknown", ""].includes(type))
  ) {
    roles.add("stage");
  }
  if (
    hasCategory("sports", "arena", "competition") ||
    hasSpace("arena", "dojo", "ice_rink", "pool", "sports_court", "sports_program", "training_room")
  ) {
    roles.add("sports");
  }
  return roles;
}

function isDailyFacilityPrice(price) {
  return (
    price.charge_category === "facility" &&
    price.unit === "per_day" &&
    !price.use_case.includes("setup") &&
    !price.use_case.includes("準備") &&
    !price.use_case.includes("撤去")
  );
}

const candidates = loadCsv("data/candidate-venues.csv");
const details = loadCsv("data/venue-details.csv");
const prices = loadCsv("data/price-observations.csv");
const budgetScenarios = loadCsv("data/budget-scenarios.csv");

const detailsByCandidate = new Map();
for (const detail of details) {
  if (!detailsByCandidate.has(detail.candidate_id)) detailsByCandidate.set(detail.candidate_id, []);
  detailsByCandidate.get(detail.candidate_id).push(detail);
}

// 検索画面の予算フィルタ（venue-search.tsx）は公式日額と区分合計の参考額の両方を拾うので、
// この表も同じ two-source 判定にそろえる。
const officialDailyByCandidate = new Set();
for (const price of prices) {
  if (isDailyFacilityPrice(price) && price.verification_status === "verified") {
    officialDailyByCandidate.add(price.candidate_id);
  }
}
const derivedDailyByCandidate = new Set();
for (const scenario of budgetScenarios) {
  if (
    scenario.verification_status === "derived_from_verified_components" &&
    Number.isFinite(Number(scenario.total_amount_jpy))
  ) {
    derivedDailyByCandidate.add(scenario.candidate_id);
  }
}
const verifiedDailyByCandidate = new Set([
  ...officialDailyByCandidate,
  ...derivedDailyByCandidate,
]);

const byPrefecture = new Map();
for (const candidate of candidates) {
  const venueDetails = detailsByCandidate.get(candidate.candidate_id) ?? [];
  const roles = rolesForVenue(
    candidate.facility_pattern,
    new Set(venueDetails.map((detail) => detail.space_type)),
    new Set(venueDetails.map((detail) => detail.stage_type)),
  );
  const hasPrice = verifiedDailyByCandidate.has(candidate.candidate_id);

  if (!byPrefecture.has(candidate.prefecture)) {
    byPrefecture.set(candidate.prefecture, {
      prefecture: candidate.prefecture,
      region: candidate.region,
      stageVenues: [],
      sportsVenues: [],
      stagePriced: [],
      sportsPriced: [],
    });
  }
  const bucket = byPrefecture.get(candidate.prefecture);
  if (roles.has("stage")) {
    bucket.stageVenues.push(candidate);
    if (hasPrice) bucket.stagePriced.push(candidate);
  }
  if (roles.has("sports")) {
    bucket.sportsVenues.push(candidate);
    if (hasPrice) bucket.sportsPriced.push(candidate);
  }
}

const rows = [...byPrefecture.values()]
  .map((bucket) => {
    const stagePriced = bucket.stagePriced.length;
    const sportsPriced = bucket.sportsPriced.length;
    const stageGap = Math.max(0, TARGET_PER_ROLE - stagePriced);
    const sportsGap = Math.max(0, TARGET_PER_ROLE - sportsPriced);
    // 候補台帳にその型の施設が5件未満なら、料金を集めるだけでは目標に届かない。
    const stageHeadroom = bucket.stageVenues.length - stagePriced;
    const sportsHeadroom = bucket.sportsVenues.length - sportsPriced;
    return {
      prefecture: bucket.prefecture,
      region: bucket.region,
      stage_venues: bucket.stageVenues.length,
      stage_priced: stagePriced,
      stage_gap: stageGap,
      stage_reachable: stageGap === 0 ? "met" : stageHeadroom >= stageGap ? "yes" : "needs_new_candidates",
      sports_venues: bucket.sportsVenues.length,
      sports_priced: sportsPriced,
      sports_gap: sportsGap,
      sports_reachable:
        sportsGap === 0 ? "met" : sportsHeadroom >= sportsGap ? "yes" : "needs_new_candidates",
    };
  })
  .sort((left, right) => right.stage_gap + right.sports_gap - (left.stage_gap + left.sports_gap));

const headers = Object.keys(rows[0]);
const csv = `${headers.join(",")}\n${rows
  .map((row) => headers.map((header) => escapeCsv(row[header])).join(","))
  .join("\n")}\n`;

if (writeCsv) {
  fs.writeFileSync(path.join(root, "data/prefecture-price-coverage.csv"), csv);
}

if (listPrefecture) {
  const bucket = byPrefecture.get(listPrefecture);
  if (!bucket) {
    console.error(`unknown prefecture: ${listPrefecture}`);
    process.exit(1);
  }
  console.log(`# ${listPrefecture}`);
  for (const [label, all, priced] of [
    ["舞台型", bucket.stageVenues, new Set(bucket.stagePriced.map((row) => row.candidate_id))],
    ["体育館型", bucket.sportsVenues, new Set(bucket.sportsPriced.map((row) => row.candidate_id))],
  ]) {
    console.log(`\n## ${label} (${priced.size}/${all.length})`);
    for (const candidate of all) {
      const mark = !priced.has(candidate.candidate_id)
        ? "no-price"
        : officialDailyByCandidate.has(candidate.candidate_id)
          ? "公式日額  "
          : "参考合計  ";
      console.log(`${mark} ${candidate.candidate_id} ${candidate.facility_name}`);
    }
  }
  process.exit(0);
}

const stageMet = rows.filter((row) => row.stage_gap === 0).length;
const sportsMet = rows.filter((row) => row.sports_gap === 0).length;
const bothMet = rows.filter((row) => row.stage_gap === 0 && row.sports_gap === 0).length;

console.log("Venue Monosashi price coverage by prefecture x venue role");
console.log(`target=${TARGET_PER_ROLE} venues per role with a searchable day rate`);
console.log(
  `day_rate_sources: official_per_day=${officialDailyByCandidate.size} venues, derived_scenario_only=${
    [...derivedDailyByCandidate].filter((id) => !officialDailyByCandidate.has(id)).length
  } venues`,
);
console.log(`stage_met=${stageMet}/47 sports_met=${sportsMet}/47 both_met=${bothMet}/47`);
console.log(`stage_gap_total=${rows.reduce((sum, row) => sum + row.stage_gap, 0)}`);
console.log(`sports_gap_total=${rows.reduce((sum, row) => sum + row.sports_gap, 0)}`);
console.log(
  `needs_new_candidates=${rows
    .filter((row) => row.stage_reachable === "needs_new_candidates" || row.sports_reachable === "needs_new_candidates")
    .map((row) => row.prefecture)
    .join(",")}`,
);
console.log("");
console.log("prefecture\tstage priced/venues (gap)\tsports priced/venues (gap)");
for (const row of rows) {
  console.log(
    `${row.prefecture}\t${row.stage_priced}/${row.stage_venues} (${row.stage_gap})\t${row.sports_priced}/${row.sports_venues} (${row.sports_gap})`,
  );
}
if (writeCsv) console.log("\nwrote=data/prefecture-price-coverage.csv");
