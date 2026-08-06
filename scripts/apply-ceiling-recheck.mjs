import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const detailsPath = path.join(root, "data", "venue-details.csv");
const ledgerPath = path.join(root, "data", "ceiling-recheck-ledger.csv");
const reviewedAt = "2026-08-06";

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
  return {
    headers,
    records: values.map((valuesRow) =>
      Object.fromEntries(headers.map((header, index) => [header, valuesRow[index] ?? ""])),
    ),
  };
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function serialize(headers, records) {
  return `${headers.join(",")}\n${records
    .map((record) => headers.map((header) => escapeCsv(record[header])).join(","))
    .join("\n")}\n`;
}

const minimumClearIds = new Set([
  "DETAIL-010",
  "DETAIL-011",
  "DETAIL-012",
  "DETAIL-013",
  "DETAIL-014",
  "DETAIL-015",
  "DETAIL-016",
]);
const rangeMinimumIds = new Set(["DETAIL-039"]);
const highestPointIds = new Set([
  "DETAIL-018",
  "DETAIL-047",
  "DETAIL-123",
  "DETAIL-124",
  "DETAIL-134",
  "DETAIL-216",
  "DETAIL-411",
  "DETAIL-412",
  "DETAIL-413",
]);
const stageClearanceIds = new Set(["DETAIL-115"]);
const evidenceUrlOverrides = new Map([
  ["DETAIL-037", "https://www.convention.or.jp/facility/_data_1.html"],
  ["DETAIL-039", "https://www.technohall.or.jp/facility.html"],
  ["DETAIL-081", "https://www.seagaia-mice.jp/facilities/convention-center/convention-4f/summit-hall-all/"],
  ["DETAIL-535", "https://www.hida-center.jp/facilities/facility-conventionhall.html"],
]);

const { headers, records } = parseCsv(fs.readFileSync(detailsPath, "utf8"));
if (
  fs.existsSync(ledgerPath) &&
  records.every((row) => row.ceiling_height_type !== "nominal_review") &&
  records.find((row) => row.detail_id === "DETAIL-216")?.ceiling_height_type === "highest_point"
) {
  console.log("ceiling recheck already applied");
  process.exit(0);
}
const targetRows = records.filter(
  (row) => row.ceiling_height_type === "nominal_review" || row.detail_id === "DETAIL-216",
);
if (targetRows.length !== 67) {
  throw new Error(`Expected 67 recheck rows, found ${targetRows.length}`);
}

const ledger = [];
for (const row of targetRows) {
  const previousType = row.ceiling_height_type;
  let type = "published_clear";
  let clearHeight = row.ceiling_height_m;
  let evidenceNote =
    "公式ページが当該区画の天井高・天高・床面から天井までの高さを単一値として掲載";

  if (minimumClearIds.has(row.detail_id)) {
    type = "minimum_clear";
    evidenceNote = "公式ページが天井トラス下端または吊天井下端の高さを明記";
  } else if (rangeMinimumIds.has(row.detail_id)) {
    type = "range_minimum";
    evidenceNote = "公式ページが同一物理ホールの膜天井9mと4分割利用を明記";
  } else if (highestPointIds.has(row.detail_id)) {
    type = "highest_point";
    clearHeight = "";
    evidenceNote =
      "公式ページが最高部・最高天井・建物高さの値と明記しており、最低有効高には使えない";
  } else if (stageClearanceIds.has(row.detail_id)) {
    type = "stage_clearance";
    clearHeight = "";
    evidenceNote = "公式ページが舞台寸法の高さとして掲載しており、室内の最低有効高には使えない";
  }

  row.clear_height_min_m = clearHeight;
  row.ceiling_height_type = type;
  row.observed_at = reviewedAt;
  if (row.detail_id === "DETAIL-106") row.overhead_use_status = "conditional";
  if (row.detail_id === "DETAIL-109") row.overhead_use_status = "prohibited";

  ledger.push({
    review_id: `CEILING-RECHECK-${row.detail_id.replace("DETAIL-", "")}`,
    detail_id: row.detail_id,
    candidate_id: row.candidate_id,
    space_name: row.space_name,
    raw_height_m: row.ceiling_height_m,
    previous_type: previousType,
    resolution: clearHeight ? "resolved_filterable" : "resolved_excluded",
    clear_height_min_m: clearHeight,
    ceiling_height_type: type,
    evidence_url: evidenceUrlOverrides.get(row.detail_id) ?? row.source_url,
    reviewed_at: reviewedAt,
    human_action: "",
    note: evidenceNote,
  });
}

fs.writeFileSync(detailsPath, serialize(headers, records));
const ledgerHeaders = [
  "review_id",
  "detail_id",
  "candidate_id",
  "space_name",
  "raw_height_m",
  "previous_type",
  "resolution",
  "clear_height_min_m",
  "ceiling_height_type",
  "evidence_url",
  "reviewed_at",
  "human_action",
  "note",
];
fs.writeFileSync(ledgerPath, serialize(ledgerHeaders, ledger));

console.log(`reviewed=${ledger.length}`);
console.log(`filterable=${ledger.filter((row) => row.resolution === "resolved_filterable").length}`);
console.log(`excluded=${ledger.filter((row) => row.resolution === "resolved_excluded").length}`);
console.log(`human_action=${ledger.filter((row) => row.human_action).length}`);
