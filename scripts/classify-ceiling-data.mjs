import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = path.join(root, "data", "venue-details.csv");

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

function classify(row) {
  if (!row.ceiling_height_m) {
    return { clearHeight: "", type: "unknown", overheadUse: "unknown" };
  }

  const note = row.note;
  if (row.detail_id === "DETAIL-1145") {
    return { clearHeight: "7.5", type: "minimum_clear", overheadUse: "unknown" };
  }
  if (/プロセニアム/.test(note)) {
    return { clearHeight: "", type: "stage_opening", overheadUse: "unknown" };
  }
  if (/舞台.{0,20}(高さ|天井高)|ステージ.{0,20}天井高/.test(note)) {
    return { clearHeight: "", type: "stage_clearance", overheadUse: "unknown" };
  }
  if (/最高|最大天井高|中央天井|センター部天井|ドーム最高|平均天井高/.test(note)) {
    return { clearHeight: "", type: "highest_point", overheadUse: "unknown" };
  }
  if (
    /最低天井高|有効天井高|有効高さ|最も低い|最小値|検索用数値.{0,12}最低|数値欄.{0,12}最小|保守的に.{0,12}最小|下限値|範囲のため最小|キャットウォーク下|吊物下有効|垂壁部分/.test(
      note,
    )
  ) {
    return {
      clearHeight: row.ceiling_height_m,
      type: "minimum_clear",
      overheadUse: "unknown",
    };
  }
  if (/天井高.{0,20}[〜～-]|天井.{0,20}[〜～-]/.test(note)) {
    return {
      clearHeight: row.ceiling_height_m,
      type: "range_minimum",
      overheadUse: "unknown",
    };
  }
  if (/天井高|天井の高さ|天井\d|天井約|天井メッシュ/.test(note)) {
    return {
      clearHeight: row.ceiling_height_m,
      type: "published_clear",
      overheadUse: "unknown",
    };
  }
  return { clearHeight: "", type: "nominal_review", overheadUse: "unknown" };
}

const { headers: originalHeaders, records } = parseCsv(fs.readFileSync(csvPath, "utf8"));
const insertedFields = ["clear_height_min_m", "ceiling_height_type", "overhead_use_status"];
if (
  insertedFields.every((field) => originalHeaders.includes(field)) &&
  !process.argv.includes("--force")
) {
  console.error("Ceiling fields already exist. Use --force only to intentionally reclassify all rows.");
  process.exit(1);
}
const headers = originalHeaders.filter((header) => !insertedFields.includes(header));
const ceilingIndex = headers.indexOf("ceiling_height_m");
headers.splice(ceilingIndex + 1, 0, ...insertedFields);

const counts = new Map();
const filterableCandidates = new Set();
for (const record of records) {
  const classified = classify(record);
  record.clear_height_min_m = classified.clearHeight;
  record.ceiling_height_type = classified.type;
  record.overhead_use_status = classified.overheadUse;
  counts.set(classified.type, (counts.get(classified.type) ?? 0) + 1);
  if (classified.clearHeight) filterableCandidates.add(record.candidate_id);
}

const output = `${headers.join(",")}\n${records
  .map((record) => headers.map((header) => escapeCsv(record[header])).join(","))
  .join("\n")}\n`;
fs.writeFileSync(csvPath, output);

const filterableSpaces = records.filter((record) => record.clear_height_min_m).length;
console.log(`classified=${records.length}`);
console.log(`filterable_spaces=${filterableSpaces}`);
console.log(`filterable_candidates=${filterableCandidates.size}`);
console.log(
  `types=${[...counts.entries()].map(([type, count]) => `${type}:${count}`).join(",")}`,
);
