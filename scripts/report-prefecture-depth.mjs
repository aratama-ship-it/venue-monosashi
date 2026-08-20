import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const writeCsv = process.argv.includes("--write");

const TARGETS = {
  candidates: 25,
  municipalities: 15,
  spaces: 51,
};

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

const prefectures = loadCsv("data/prefecture-coverage.csv");
const candidates = loadCsv("data/candidate-venues.csv");
const details = loadCsv("data/venue-details.csv");
const candidateById = new Map(candidates.map((row) => [row.candidate_id, row]));
const candidateIdsByPrefecture = new Map();

for (const row of candidates) {
  if (!candidateIdsByPrefecture.has(row.prefecture)) {
    candidateIdsByPrefecture.set(row.prefecture, new Set());
  }
  candidateIdsByPrefecture.get(row.prefecture).add(row.candidate_id);
}

const rows = prefectures.map(({ prefecture, region }) => {
  const candidateIds = candidateIdsByPrefecture.get(prefecture) ?? new Set();
  const prefectureCandidates = [...candidateIds].map((id) => candidateById.get(id));
  const prefectureDetails = details.filter((row) => candidateIds.has(row.candidate_id));
  const candidateCount = prefectureCandidates.length;
  const municipalityCount = new Set(prefectureCandidates.map((row) => row.city)).size;
  const spaceCount = prefectureDetails.length;
  const capacityKnown = prefectureDetails.filter(
    (row) => row.capacity_theater || row.capacity_fixed,
  ).length;
  const areaKnown = prefectureDetails.filter((row) => row.area_m2).length;
  const ceilingKnown = prefectureDetails.filter((row) => row.clear_height_min_m).length;
  const candidateGap = Math.max(0, TARGETS.candidates - candidateCount);
  const municipalityGap = Math.max(0, TARGETS.municipalities - municipalityCount);
  const spaceGap = Math.max(0, TARGETS.spaces - spaceCount);
  const status =
    candidateGap === 0 && municipalityGap === 0 && spaceGap === 0
      ? "reference_depth"
      : candidateCount >= 15
        ? "expanding"
        : candidateCount >= 8
          ? "foundation_plus"
          : "foundation";

  return {
    prefecture,
    region,
    candidate_count: candidateCount,
    municipality_count: municipalityCount,
    space_count: spaceCount,
    capacity_known_count: capacityKnown,
    area_known_count: areaKnown,
    ceiling_known_count: ceilingKnown,
    candidate_gap: candidateGap,
    municipality_gap: municipalityGap,
    space_gap: spaceGap,
    status,
  };
});

const headers = Object.keys(rows[0]);
const csv = `${headers.join(",")}\n${rows
  .map((row) => headers.map((header) => escapeCsv(row[header])).join(","))
  .join("\n")}\n`;

if (writeCsv) {
  fs.writeFileSync(path.join(root, "data/prefecture-expansion-status.csv"), csv);
}

const deficits = rows
  .filter((row) => row.status !== "reference_depth")
  .sort((left, right) => left.candidate_count - right.candidate_count);

console.log("Venue Monosashi prefecture depth");
console.log(`reference=${TARGETS.candidates} candidates / ${TARGETS.municipalities} municipalities / ${TARGETS.spaces} spaces`);
console.log(`reference_depth=${rows.filter((row) => row.status === "reference_depth").length}/47`);
console.log(`candidate_gap_total=${rows.reduce((sum, row) => sum + row.candidate_gap, 0)}`);
console.log(`space_gap_total=${rows.reduce((sum, row) => sum + row.space_gap, 0)}`);
console.log("lowest_depth=" + deficits.slice(0, 10).map((row) => `${row.prefecture}:${row.candidate_count}`).join(","));
if (writeCsv) console.log("wrote=data/prefecture-expansion-status.csv");
