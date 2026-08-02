import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutput = path.join(projectRoot, "data/small-theater-research.csv");
const searchUrl = "https://lasens.com/database/theater_serach.html";
const endpoint =
  "https://lasens.com/database/wp-content/plugins/ti_post_listup/ajax.php";

const headers = [
  "queue_order",
  "source_id",
  "source_status",
  "source_name",
  "source_url",
  "source_address",
  "source_prefecture",
  "source_capacity",
  "source_updated_at",
  "discovered_at",
  "official_url",
  "official_name",
  "official_status",
  "official_capacity",
  "official_area_m2",
  "official_price_url",
  "official_access_url",
  "official_conditions_url",
  "official_observed_at",
  "verification_status",
  "canonical_candidate_id",
  "notes",
];

const prefectures = [
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
  "",
];

function option(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 ? (process.argv[index + 1] ?? fallback) : fallback;
}

function tokyoDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function cleanHtml(value = "") {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

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

  const [csvHeaders, ...values] = rows;
  return values.map((valuesRow) =>
    Object.fromEntries(
      csvHeaders.map((header, index) => [header, valuesRow[index] ?? ""]),
    ),
  );
}

function csvValue(value) {
  const normalized = String(value ?? "");
  return /[",\n\r]/.test(normalized)
    ? `"${normalized.replaceAll('"', '""')}"`
    : normalized;
}

function writeCsv(rows, outputPath) {
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvValue(row[header])).join(",")),
  ];
  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
}

function isoJapaneseDate(value) {
  const match = value.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!match) return "";
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

function extractRows(payload, discoveredAt) {
  const html = payload.body ?? "";
  const matches = [
    ...html.matchAll(
      /<tbody id="tipl1List-(\d+)" class="tipl1([^ ]+) ssize">([\s\S]*?)<\/tbody>/g,
    ),
  ];

  const rows = matches.map((match) => {
    const [, id, rawStatus, body] = match;
    const nameMatches = [
      ...body.matchAll(
        new RegExp(
          `<a href="https:\\/\\/lasens\\.com\\/database\\/theater-${id}\\.html"[^>]*>([\\s\\S]*?)<\\/a>`,
          "g",
        ),
      ),
    ];
    const name =
      nameMatches.map((item) => cleanHtml(item[1])).find(Boolean) ?? "";
    const address = cleanHtml(
      body.match(/<span class="address">([\s\S]*?)<\/span>/)?.[1] ?? "",
    );
    const capacity = cleanHtml(
      body.match(/<span class="capacity">([\s\S]*?)<\/span>/)?.[1] ?? "",
    );
    const sourceUpdated = isoJapaneseDate(
      [...body.matchAll(/\d{4}年\d{1,2}月\d{1,2}日/g)].at(-1)?.[0] ?? "",
    );
    const prefecture = prefectures.find(
      (prefectureName) =>
        prefectureName !== "" && address.includes(prefectureName),
    );

    return {
      queue_order: "",
      source_id: `LASENS-${id}`,
      source_status:
        rawStatus === "publish"
          ? "listed"
          : rawStatus === "closed"
            ? "marked_closed"
            : rawStatus,
      source_name: name,
      source_url: `https://lasens.com/database/theater-${id}.html`,
      source_address: address,
      source_prefecture: prefecture ?? "",
      source_capacity: /^\d+$/.test(capacity) ? capacity : "",
      source_updated_at: sourceUpdated,
      discovered_at: discoveredAt,
      official_url: "",
      official_name: "",
      official_status: "",
      official_capacity: "",
      official_area_m2: "",
      official_price_url: "",
      official_access_url: "",
      official_conditions_url: "",
      official_observed_at: "",
      verification_status: "pending",
      canonical_candidate_id: "",
      notes: "",
    };
  });

  const groups = new Map(prefectures.map((prefecture) => [prefecture, []]));
  rows
    .sort((left, right) =>
      left.source_name.localeCompare(right.source_name, "ja"),
    )
    .forEach((row) => {
      const key = groups.has(row.source_prefecture) ? row.source_prefecture : "";
      groups.get(key).push(row);
    });

  const ordered = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    prefectures.forEach((prefecture) => {
      const row = groups.get(prefecture).shift();
      if (row) {
        ordered.push(row);
        remaining = true;
      }
    });
  }
  ordered.forEach((row, index) => {
    row.queue_order = String(index + 1);
  });

  const total = Number(payload.page?.match(/全\s*(\d+)\s*件/)?.[1] ?? 0);
  if (total && total !== ordered.length) {
    throw new Error(
      `LaSens total mismatch: page=${total}, parsed=${ordered.length}`,
    );
  }
  return ordered;
}

async function fetchPayload() {
  const commonHeaders = {
    Referer: searchUrl,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  const defaultResponse = await fetch(endpoint, {
    method: "POST",
    headers: commonHeaders,
    body: new URLSearchParams({ action: "get_default" }),
  });
  if (!defaultResponse.ok) {
    throw new Error(`LaSens default request failed: ${defaultResponse.status}`);
  }
  const defaults = await defaultResponse.json();
  if (!defaults.success || !defaults.token) {
    throw new Error("LaSens default request did not return a token");
  }

  const params = new URLSearchParams({
    action: "get_post_listup",
    orderby: "theaKana",
    order: "ASC",
    orderkey: "",
    page: "1",
    s: "",
    target: "all",
    posts_per_page: "1000",
    screen_widht: "1440",
    location: searchUrl,
    token: defaults.token,
  });
  params.append("posttype[]", "theater");
  const listResponse = await fetch(endpoint, {
    method: "POST",
    headers: commonHeaders,
    body: params,
  });
  if (!listResponse.ok) {
    throw new Error(`LaSens list request failed: ${listResponse.status}`);
  }
  const payload = await listResponse.json();
  if (!payload.success) {
    throw new Error(`LaSens list request failed: ${payload.message}`);
  }
  return payload;
}

function loadRows(outputPath = defaultOutput) {
  if (!fs.existsSync(outputPath)) return [];
  return parseCsv(fs.readFileSync(outputPath, "utf8"));
}

async function sync() {
  const outputPath = path.resolve(option("--output", defaultOutput));
  const inputPath = option("--input");
  const discoveredAt = option("--observed-at", tokyoDate());
  const payload = inputPath
    ? JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"))
    : await fetchPayload();
  const discovered = extractRows(payload, discoveredAt);
  const existing = new Map(
    loadRows(outputPath).map((row) => [row.source_id, row]),
  );
  const sourceFields = new Set([
    "queue_order",
    "source_id",
    "source_status",
    "source_name",
    "source_url",
    "source_address",
    "source_prefecture",
    "source_capacity",
    "source_updated_at",
    "discovered_at",
  ]);
  const merged = discovered.map((row) => {
    const previous = existing.get(row.source_id);
    if (!previous) return row;
    return Object.fromEntries(
      headers.map((header) => [
        header,
        sourceFields.has(header) ? row[header] : (previous[header] ?? ""),
      ]),
    );
  });
  writeCsv(merged, outputPath);
  console.log(
    `small-theater discovery synced: ${merged.length} rows -> ${path.relative(projectRoot, outputPath)}`,
  );
}

function audit() {
  const rows = loadRows();
  const errors = [];
  const allowedSourceStatuses = new Set(["listed", "marked_closed"]);
  const allowedOfficialStatuses = new Set([
    "",
    "current",
    "closed",
    "renamed",
    "not_a_venue",
    "unknown",
  ]);
  const allowedVerificationStatuses = new Set([
    "pending",
    "primary_partial",
    "verified_primary",
    "official_not_found",
    "ambiguous",
    "blocked",
  ]);
  const seenIds = new Set();
  const seenUrls = new Set();

  rows.forEach((row, index) => {
    const line = index + 2;
    ["queue_order", "source_id", "source_status", "source_name", "source_url", "discovered_at", "verification_status"].forEach(
      (field) => {
        if (!row[field]) errors.push(`small-theater-research.csv:${line} missing ${field}`);
      },
    );
    if (seenIds.has(row.source_id)) {
      errors.push(`small-theater-research.csv:${line} duplicate source_id=${row.source_id}`);
    }
    if (seenUrls.has(row.source_url)) {
      errors.push(`small-theater-research.csv:${line} duplicate source_url=${row.source_url}`);
    }
    seenIds.add(row.source_id);
    seenUrls.add(row.source_url);
    if (!allowedSourceStatuses.has(row.source_status)) {
      errors.push(`small-theater-research.csv:${line} invalid source_status=${row.source_status}`);
    }
    if (!allowedOfficialStatuses.has(row.official_status)) {
      errors.push(`small-theater-research.csv:${line} invalid official_status=${row.official_status}`);
    }
    if (!allowedVerificationStatuses.has(row.verification_status)) {
      errors.push(
        `small-theater-research.csv:${line} invalid verification_status=${row.verification_status}`,
      );
    }
    if (
      row.verification_status === "verified_primary" &&
      (!row.official_url ||
        !row.official_name ||
        !row.official_status ||
        !row.official_observed_at)
    ) {
      errors.push(
        `small-theater-research.csv:${line} verified_primary needs official URL, name, status, and observed date`,
      );
    }
    if (
      row.verification_status === "primary_partial" &&
      (!row.official_url || !row.official_observed_at)
    ) {
      errors.push(
        `small-theater-research.csv:${line} primary_partial needs official URL and observed date`,
      );
    }
    if (
      [
        row.official_capacity,
        row.official_area_m2,
        row.official_price_url,
        row.official_access_url,
        row.official_conditions_url,
      ].some(Boolean) &&
      (!row.official_url || !row.official_observed_at)
    ) {
      errors.push(
        `small-theater-research.csv:${line} official facts need official URL and observed date`,
      );
    }
  });

  const count = (status) =>
    rows.filter((row) => row.verification_status === status).length;
  console.log("Small theater research audit");
  console.log(`rows=${rows.length}`);
  console.log(
    `source_listed=${rows.filter((row) => row.source_status === "listed").length}`,
  );
  console.log(
    `source_marked_closed=${rows.filter((row) => row.source_status === "marked_closed").length}`,
  );
  console.log(`verified_primary=${count("verified_primary")}`);
  console.log(`primary_partial=${count("primary_partial")}`);
  console.log(`official_not_found=${count("official_not_found")}`);
  console.log(`ambiguous=${count("ambiguous")}`);
  console.log(`blocked=${count("blocked")}`);
  console.log(`pending=${count("pending")}`);
  console.log(`errors=${errors.length}`);
  errors.forEach((error) => console.error(`ERROR ${error}`));
  if (errors.length) process.exitCode = 1;
}

function next() {
  const limit = Number(option("--limit", "8"));
  const rows = loadRows()
    .filter((row) => row.verification_status === "pending")
    .sort((left, right) => Number(left.queue_order) - Number(right.queue_order))
    .slice(0, limit);
  if (!rows.length) {
    console.log("No pending small theaters.");
    return;
  }
  rows.forEach((row) => {
    console.log(
      [
        row.source_id,
        row.source_prefecture || "都道府県不明",
        row.source_name,
        row.source_url,
        row.source_status,
      ].join("\t"),
    );
  });
}

const command = process.argv[2] ?? "audit";
if (command === "sync") {
  await sync();
} else if (command === "audit") {
  audit();
} else if (command === "next") {
  next();
} else {
  throw new Error(`Unknown command: ${command}`);
}
