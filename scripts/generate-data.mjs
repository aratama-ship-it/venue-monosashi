import { readFile, writeFile } from "node:fs/promises";
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

const [
  candidates,
  details,
  prices,
  operations,
  historical,
  historicalVenueAliases,
  budgetScenarios,
] = await Promise.all([
  load("candidate-venues.csv"),
  load("venue-details.csv"),
  load("price-observations.csv"),
  load("venue-operations.csv"),
  load("historical-events.csv"),
  load("historical-venue-aliases.csv"),
  load("budget-scenarios.csv"),
]);

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
    .map((detail) => nullableNumber(detail.ceiling_height_m))
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
      ceiling: nullableNumber(detail.ceiling_height_m),
      capacityTheater: nullableNumber(detail.capacity_theater),
      capacityFixed: nullableNumber(detail.capacity_fixed),
      stageType: detail.stage_type,
      practiceUse: detail.sports_or_practice_use,
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
    },
    venues,
    historicalEvents,
  },
  null,
  2,
)} as const;
`;

await writeFile(resolve(scriptDir, "..", "app", "generated-data.ts"), output);
console.log(
  `generated app/generated-data.ts: ${venues.length} venues, ${prices.length} prices`,
);
