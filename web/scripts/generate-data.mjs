import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(scriptDir, "..", "..");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [headers, ...records] = rows;
  return records.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

async function load(name) {
  return parseCsv(await readFile(resolve(projectDir, "data", name), "utf8"));
}

function nullableNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function nullableUrl(value) {
  return value || null;
}

function websiteUrl(sourceUrl, explicitUrl) {
  const officialUrl = nullableUrl(sourceUrl);
  const verifiedWebsiteUrl = nullableUrl(explicitUrl);

  if (verifiedWebsiteUrl && verifiedWebsiteUrl !== officialUrl) return verifiedWebsiteUrl;
  if (!officialUrl) return null;

  try {
    const source = new URL(officialUrl);
    const host = source.hostname.toLowerCase();
    const isGovernmentHost =
      host.endsWith(".lg.jp") ||
      host.endsWith(".go.jp") ||
      /(^|\.)(city|town|village|pref|prefecture)\./.test(host);
    if (isGovernmentHost) return null;

    const homepage = `${source.protocol}//${source.host}/`;
    return homepage === source.href ? null : homepage;
  } catch {
    return null;
  }
}

function officialLinks(candidate, venueDetails, candidateWebsites = []) {
  if (!candidate.facility_name.includes("＋")) return [];

  const mainUrl = nullableUrl(candidate.official_url);
  const seen = new Set(mainUrl ? [mainUrl] : []);
  const links = [];
  const parts = candidate.facility_name
    .split("＋")
    .map((part) => part.replace(/^.*（/, "").replace(/）.*$/, "").trim())
    .filter(Boolean);

  for (const part of parts) {
    const match = venueDetails.find(
      (detail) =>
        detail.space_name.startsWith(part) &&
        nullableUrl(detail.source_url) &&
        !seen.has(detail.source_url),
    );
    if (match) {
      seen.add(match.source_url);
      links.push({ label: part, url: match.source_url });
      continue;
    }
    const websiteMatch = candidateWebsites.find(
      (website) =>
        (website.note || "").includes(part) &&
        nullableUrl(website.website_url) &&
        !seen.has(website.website_url),
    );
    if (websiteMatch) {
      seen.add(websiteMatch.website_url);
      links.push({ label: part, url: websiteMatch.website_url });
    }
  }

  return links;
}

const [
  candidates,
  details,
  prices,
  operations,
  historical,
  historicalVenueAliases,
  budgetScenarios,
  smallTheaters,
  venueWebsites,
] = await Promise.all([
  load("candidate-venues.csv"),
  load("venue-details.csv"),
  load("price-observations.csv"),
  load("venue-operations.csv"),
  load("historical-events.csv"),
  load("historical-venue-aliases.csv"),
  load("budget-scenarios.csv"),
  load("small-theater-research.csv"),
  load("venue-websites.csv"),
]);

const websitesByCandidateId = new Map();
for (const website of venueWebsites) {
  const list = websitesByCandidateId.get(website.candidate_id) ?? [];
  list.push(website);
  websitesByCandidateId.set(website.candidate_id, list);
}

const smallTheaterVerificationCounts = Object.fromEntries(
  [
    "verified_primary",
    "primary_partial",
    "official_not_found",
    "ambiguous",
    "blocked",
  ].map((status) => [
    status,
    smallTheaters.filter((theater) => theater.verification_status === status)
      .length,
  ]),
);

const smallTheaterLedger = smallTheaters.map((theater) => ({
  id: theater.source_id,
  indexName: theater.source_name,
  indexUrl: theater.source_url,
  indexedPrefecture: theater.source_prefecture || null,
  officialName: theater.official_name || null,
  officialUrl: nullableUrl(theater.official_url),
  officialStatus: theater.official_status || null,
  capacity: nullableNumber(theater.official_capacity),
  area: nullableNumber(theater.official_area_m2),
  priceUrl: nullableUrl(theater.official_price_url),
  accessUrl: nullableUrl(theater.official_access_url),
  conditionsUrl: nullableUrl(theater.official_conditions_url),
  observedAt: theater.official_observed_at || null,
  verificationStatus: theater.verification_status,
  note: theater.notes || null,
}));
const smallTheaterCsv = await readFile(
  resolve(projectDir, "data", "small-theater-research.csv"),
);
const smallTheaterAssetHash = createHash("sha256")
  .update(smallTheaterCsv)
  .digest("hex")
  .slice(0, 12);
const smallTheaterAssets = {
  csv: `small-theater-research.${smallTheaterAssetHash}.csv`,
  ledger: `small-theater-ledger.${smallTheaterAssetHash}.json`,
};

const observationDates = [
  ...details.map((item) => item.observed_at),
  ...prices.map((item) => item.observed_at),
  ...operations.map((item) => item.observed_at),
  ...budgetScenarios.map((item) => item.observed_at),
  ...smallTheaters.map((item) => item.official_observed_at),
  ...venueWebsites.map((item) => item.observed_at),
].filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value));
const sortedObservationDates = [...new Set(observationDates)].sort();
const freshness = {
  firstObservedAt: sortedObservationDates[0] ?? null,
  latestObservedAt: sortedObservationDates.at(-1) ?? null,
  observationCount: observationDates.length,
  venueObservationCount:
    details.filter((item) => item.observed_at).length +
    prices.filter((item) => item.observed_at).length +
    operations.filter((item) => item.observed_at).length +
    budgetScenarios.filter((item) => item.observed_at).length,
  smallTheaterObservationCount: smallTheaters.filter(
    (item) => item.official_observed_at,
  ).length,
};

const venues = candidates.map((candidate) => {
  const venueDetails = details.filter(
    (detail) => detail.candidate_id === candidate.candidate_id,
  );
  const venuePrices = prices.filter(
    (price) => price.candidate_id === candidate.candidate_id,
  );
  const venueOperations = operations.filter(
    (operation) => operation.candidate_id === candidate.candidate_id,
  );
  const venueAliases = historicalVenueAliases.filter(
    (alias) => alias.candidate_id === candidate.candidate_id,
  );
  const venueBudgetScenarios = budgetScenarios.filter(
    (scenario) => scenario.candidate_id === candidate.candidate_id,
  );
  const venueObservationDates = [
    ...venueDetails.map((item) => item.observed_at),
    ...venuePrices.map((item) => item.observed_at),
    ...venueOperations.map((item) => item.observed_at),
    ...venueBudgetScenarios.map((item) => item.observed_at),
  ]
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort();
  const linkedHistoricalEvents = historical.filter((event) =>
    venueAliases.some((alias) =>
      event.venue_names.includes(alias.venue_name_contains),
    ),
  );
  const completedHistoricalEvents = linkedHistoricalEvents.filter(
    (event) => !["planned", "cancelled"].includes(event.event_status),
  );
  const plannedHistoricalEvents = linkedHistoricalEvents.filter(
    (event) => event.event_status === "planned",
  );
  const dailyFacilityPrices = venuePrices
    .filter(
      (price) =>
        price.charge_category === "facility" &&
        price.unit === "per_day" &&
        !price.use_case.includes("setup") &&
        !price.use_case.includes("準備") &&
        !price.use_case.includes("撤去"),
    )
    .map((price) => nullableNumber(price.amount_jpy))
    .filter((value) => value !== null);
  const capacityValues = venueDetails
    .flatMap((detail) => [
      nullableNumber(detail.capacity_theater),
      nullableNumber(detail.capacity_fixed),
    ])
    .filter((value) => value !== null);
  const areaValues = venueDetails
    .map((detail) => nullableNumber(detail.area_m2))
    .filter((value) => value !== null);
  const ceilingValues = venueDetails
    .map((detail) => nullableNumber(detail.clear_height_min_m))
    .filter((value) => value !== null);
  const floorLoadValues = venueDetails
    .map((detail) => nullableNumber(detail.floor_load_kg_m2))
    .filter((value) => value !== null);
  const hasFixedStage = venueDetails.some(
    (detail) => detail.stage_type === "fixed",
  );
  const practiceStatuses = venueDetails.map(
    (detail) => detail.sports_or_practice_use,
  );
  const practiceUse = practiceStatuses.includes("yes")
    ? "yes"
    : practiceStatuses.includes("conditional")
      ? "conditional"
      : null;
  const streamingStatuses = venueDetails.map(
    (detail) => detail.streaming_ready,
  );
  const streamingReady = streamingStatuses.includes("yes")
    ? "yes"
    : streamingStatuses.includes("conditional")
      ? "conditional"
      : streamingStatuses.includes("unknown")
        ? "unknown"
        : null;
  const bestSpace = [...venueDetails].sort(
    (a, b) =>
      (nullableNumber(b.capacity_theater) ?? 0) -
        (nullableNumber(a.capacity_theater) ?? 0) ||
      (nullableNumber(b.area_m2) ?? 0) - (nullableNumber(a.area_m2) ?? 0),
  )[0];

  const candidateWebsites =
    websitesByCandidateId.get(candidate.candidate_id) ?? [];
  const setOfficialLinks = officialLinks(
    candidate,
    venueDetails,
    candidateWebsites,
  );
  const primaryWebsiteUrl = websiteUrl(
    candidate.official_url,
    candidateWebsites[0]?.website_url,
  );

  return {
    id: candidate.candidate_id,
    region: candidate.region,
    prefecture: candidate.prefecture,
    city: candidate.city,
    name: candidate.facility_name,
    category: candidate.facility_pattern,
    fitLevel: candidate.fit_level,
    strengths: candidate.verified_public_facts,
    cautions: candidate.inference_or_risk,
    sourceUrl: candidate.official_url,
    websiteUrl: setOfficialLinks.some((link) => link.url === primaryWebsiteUrl)
      ? null
      : primaryWebsiteUrl,
    officialLinks: setOfficialLinks,
    observedAt: venueObservationDates.at(-1) ?? null,
    detailCount: venueDetails.length,
    priceCount: venuePrices.length,
    operationCount: venueOperations.length,
    historicalCompletedCount: completedHistoricalEvents.length,
    historicalPlannedCount: plannedHistoricalEvents.length,
    historicalSeries: [
      ...new Set(linkedHistoricalEvents.map((event) => event.series)),
    ],
    historicalEventIds: linkedHistoricalEvents.map((event) => event.event_id),
    maxCapacity: capacityValues.length ? Math.max(...capacityValues) : null,
    maxArea: areaValues.length ? Math.max(...areaValues) : null,
    maxCeiling: ceilingValues.length ? Math.max(...ceilingValues) : null,
    ceilingReferenceCount: venueDetails.filter(
      (detail) => nullableNumber(detail.ceiling_height_m) !== null,
    ).length,
    filterableCeilingCount: venueDetails.filter(
      (detail) => nullableNumber(detail.clear_height_min_m) !== null,
    ).length,
    maxFloorLoad: floorLoadValues.length ? Math.max(...floorLoadValues) : null,
    hasFixedStage,
    practiceUse,
    streamingReady,
    minDailyFacilityPrice: dailyFacilityPrices.length
      ? Math.min(...dailyFacilityPrices)
      : null,
    priceObservations: venuePrices.map((price) => ({
      id: price.price_id,
      spaceId: price.space_id,
      category: price.charge_category,
      useCase: price.use_case,
      dayType: price.day_type,
      timeBand: price.time_band,
      amount: nullableNumber(price.amount_jpy),
      taxStatus: price.tax_status,
      unit: price.unit,
      basis: price.basis,
      validFrom: price.valid_from || null,
      exclusions: price.exclusions,
      note: price.note,
      sourceUrl: price.source_url,
    })),
    budgetScenarios: venueBudgetScenarios.map((scenario) => ({
      id: scenario.scenario_id,
      spaceId: scenario.space_id,
      label: scenario.scenario_label,
      useCase: scenario.use_case,
      dayType: scenario.day_type,
      timeSpan: scenario.time_span,
      amount: nullableNumber(scenario.total_amount_jpy),
      taxStatus: scenario.tax_status,
      componentPriceIds: scenario.component_price_ids.split("|"),
      componentQuantities: scenario.component_quantities.split("|").map(Number),
      validFrom: scenario.valid_from || null,
      exclusions: scenario.exclusions,
      note: scenario.note,
      sourceUrl: scenario.source_url,
    })),
    operation: venueOperations[0]
      ? {
          station: venueOperations[0].nearest_station || null,
          walkMinutes: nullableNumber(venueOperations[0].walk_minutes),
          stationAccess: venueOperations[0].station_access || null,
          airportAccess: venueOperations[0].airport_access || null,
          parkingSpaces: nullableNumber(
            venueOperations[0].parking_spaces_on_site,
          ),
          largeVehicleAccess:
            venueOperations[0].large_vehicle_access || null,
          loadingAccess: venueOperations[0].loading_access || null,
          bookingOpenMonths: nullableNumber(
            venueOperations[0].booking_open_months,
          ),
          setupPolicy: venueOperations[0].setup_teardown_policy || null,
          networkPolicy: venueOperations[0].network_policy || null,
          note: venueOperations[0].note || null,
        }
      : null,
    spaces: venueDetails.map((detail) => ({
      id: detail.space_id,
      name: detail.space_name,
      type: detail.space_type,
      area: nullableNumber(detail.area_m2),
      ceiling: nullableNumber(detail.clear_height_min_m),
      ceilingReference: nullableNumber(detail.ceiling_height_m),
      ceilingType: detail.ceiling_height_type,
      overheadUseStatus: detail.overhead_use_status,
      capacityTheater: nullableNumber(detail.capacity_theater),
      capacityFixed: nullableNumber(detail.capacity_fixed),
      stageType: detail.stage_type,
      practiceUse: detail.sports_or_practice_use,
      sourceUrl: detail.source_url,
      observedAt: detail.observed_at || null,
      note: detail.note || null,
    })),
    bestSpace: bestSpace
      ? {
          id: bestSpace.space_id,
          name: bestSpace.space_name,
          type: bestSpace.space_type,
        }
      : null,
  };
});

const historicalEvents = historical.map((event) => ({
  id: event.event_id,
  series: event.series,
  year: Number(event.year),
  eventStatus: event.event_status,
  country: event.country,
  prefectureOrState: event.prefecture_or_state,
  city: event.city,
  venueNames: event.venue_names,
  verificationStatus: event.verification_status,
  sourceUrl: event.source_url,
  note: event.note,
}));

const candidateCoverage = {
  area: new Set(
    details
      .filter((detail) => nullableNumber(detail.area_m2) !== null)
      .map((detail) => detail.candidate_id),
  ).size,
  capacity: new Set(
    details
      .filter(
        (detail) =>
          nullableNumber(detail.capacity_theater) !== null ||
          nullableNumber(detail.capacity_fixed) !== null,
      )
      .map((detail) => detail.candidate_id),
  ).size,
  ceiling: new Set(
    details
      .filter((detail) => nullableNumber(detail.clear_height_min_m) !== null)
      .map((detail) => detail.candidate_id),
  ).size,
};

const spaceCoverage = {
  ceiling: details.filter(
    (detail) => nullableNumber(detail.clear_height_min_m) !== null,
  ).length,
  ceilingReference: details.filter(
    (detail) => nullableNumber(detail.ceiling_height_m) !== null,
  ).length,
};

const output = `// Generated from ../data/*.csv by scripts/generate-data.mjs.
// Do not edit this file by hand.
export const venueData = ${JSON.stringify(
  {
    stats: {
      historical: historical.length,
      venues: candidates.length,
      details: details.length,
      prices: prices.length,
      operations: operations.length,
      budgetScenarios: budgetScenarios.length,
      candidateCoverage,
      spaceCoverage,
      freshness,
      smallTheaterCensus: {
        total: smallTheaters.length,
        verificationCounts: smallTheaterVerificationCounts,
        assets: smallTheaterAssets,
      },
    },
    venues,
    historicalEvents,
  },
  null,
  2,
)} as const;
`;

await writeFile(resolve(scriptDir, "..", "app", "generated-data.ts"), output);
await mkdir(resolve(scriptDir, "..", "public", "data"), { recursive: true });
await writeFile(
  resolve(scriptDir, "..", "public", "data", "small-theater-research.csv"),
  smallTheaterCsv,
);
await writeFile(
  resolve(scriptDir, "..", "public", "data", smallTheaterAssets.csv),
  smallTheaterCsv,
);
const smallTheaterLedgerJson = `${JSON.stringify(smallTheaterLedger)}\n`;
await writeFile(
  resolve(scriptDir, "..", "public", "data", "small-theater-ledger.json"),
  smallTheaterLedgerJson,
);
await writeFile(
  resolve(scriptDir, "..", "public", "data", smallTheaterAssets.ledger),
  smallTheaterLedgerJson,
);
console.log(
  `generated app/generated-data.ts: ${venues.length} venues, ${prices.length} prices`,
);
