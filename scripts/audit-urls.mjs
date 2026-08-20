import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "data/url-audit.csv");
const checkedAt = new Date().toISOString();
const timeoutMs = 15_000;
const concurrency = 6;

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
  return values.map((valuesRow) =>
    Object.fromEntries(headers.map((header, index) => [header, valuesRow[index] ?? ""])),
  );
}

function loadCsv(relativePath) {
  return parseCsv(fs.readFileSync(path.join(projectRoot, relativePath), "utf8"));
}

function addReference(urls, url, dataset, reference) {
  if (!url) return;
  const current = urls.get(url) ?? { url, datasets: new Set(), references: new Set() };
  current.datasets.add(dataset);
  current.references.add(reference);
  urls.set(url, current);
}

const urls = new Map();
for (const row of loadCsv("data/historical-events.csv")) {
  addReference(urls, row.source_url, "historical-events.csv", row.event_id);
}
for (const row of loadCsv("data/candidate-venues.csv")) {
  addReference(urls, row.official_url, "candidate-venues.csv", row.candidate_id);
}
for (const row of loadCsv("data/venue-websites.csv")) {
  addReference(urls, row.website_url, "venue-websites.csv", row.website_id);
  addReference(urls, row.source_url, "venue-websites.csv", `${row.website_id}:source_url`);
}
for (const row of loadCsv("data/venue-details.csv")) {
  addReference(urls, row.source_url, "venue-details.csv", row.detail_id);
}
for (const row of loadCsv("data/price-observations.csv")) {
  addReference(urls, row.source_url, "price-observations.csv", row.price_id);
}
for (const row of loadCsv("data/budget-scenarios.csv")) {
  addReference(urls, row.source_url, "budget-scenarios.csv", row.scenario_id);
}
for (const row of loadCsv("data/venue-operations.csv")) {
  for (const field of ["access_source_url", "booking_source_url", "operations_source_url"]) {
    addReference(urls, row[field], "venue-operations.csv", `${row.operation_id}:${field}`);
  }
}

function classifyStatus(status) {
  if (status >= 200 && status < 400) return "reachable";
  if ([401, 403, 429].includes(status)) return "access_limited";
  if (status >= 400 && status < 500) return "client_error";
  if (status >= 500) return "server_error";
  return "unexpected_status";
}

async function checkUrl(entry) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(entry.url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/pdf;q=0.9,*/*;q=0.5",
        Range: "bytes=0-4095",
        "User-Agent": "VenueMonosashiLinkAudit/0.1 (research; no publication)",
      },
    });
    if (response.body) await response.body.cancel();
    return {
      ...entry,
      httpStatus: String(response.status),
      checkStatus: classifyStatus(response.status),
      finalUrl: response.url,
      contentType: response.headers.get("content-type") ?? "",
      note: response.redirected ? "redirected" : "",
    };
  } catch (error) {
    const timedOut = error?.name === "AbortError";
    return {
      ...entry,
      httpStatus: "",
      checkStatus: timedOut ? "timeout" : "network_error",
      finalUrl: "",
      contentType: "",
      note: String(error?.message ?? error).replaceAll(/\s+/g, " ").slice(0, 240),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function mapWithConcurrency(entries, workerCount, operation) {
  const results = new Array(entries.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < entries.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await operation(entries[index]);
      if ((index + 1) % 25 === 0) {
        console.log(`checked=${index + 1}/${entries.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

function csvField(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const entries = [...urls.values()]
  .map((entry) => ({
    url: entry.url,
    datasets: [...entry.datasets].sort().join(";"),
    references: [...entry.references].sort().join(";"),
  }))
  .sort((left, right) => left.url.localeCompare(right.url));

console.log(`unique_urls=${entries.length}`);
const results = await mapWithConcurrency(entries, concurrency, checkUrl);
const headers = [
  "url",
  "datasets",
  "references",
  "http_status",
  "check_status",
  "final_url",
  "content_type",
  "checked_at",
  "note",
];
const lines = [
  headers.join(","),
  ...results.map((result) =>
    [
      result.url,
      result.datasets,
      result.references,
      result.httpStatus,
      result.checkStatus,
      result.finalUrl,
      result.contentType,
      checkedAt,
      result.note,
    ]
      .map(csvField)
      .join(","),
  ),
];
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);

const counts = Object.groupBy(results, (result) => result.checkStatus);
for (const status of Object.keys(counts).sort()) {
  console.log(`${status}=${counts[status].length}`);
}
console.log(`output=${path.relative(projectRoot, outputPath)}`);
