// generated-data.json の形。データ本体はJSONへ分離しているが、
// 12MB級のJSONはTypeScriptが型を推論しないため、ここで明示する。
// 形を変えるのは scripts/generate-data.mjs 側なので、両方を揃えて直すこと。

export type VenueSpace = {
  id: string;
  name: string;
  type: string;
  tags: string[];
  area: number | null;
  ceiling: number | null;
  ceilingReference: number | null;
  ceilingType: string;
  overheadUseStatus: string;
  capacityTheater: number | null;
  capacityFixed: number | null;
  stageType: string;
  practiceUse: string;
  sourceUrl: string;
  observedAt: string | null;
  note: string;
};

export type PriceObservation = {
  id: string;
  spaceId: string;
  category: string;
  useCase: string;
  dayType: string;
  timeBand: string;
  amount: number | null;
  taxStatus: string;
  unit: string;
  basis: string;
  validFrom: string | null;
  exclusions: string;
  note: string;
  sourceUrl: string;
};

export type BudgetScenario = {
  id: string;
  spaceId: string;
  label: string;
  useCase: string;
  dayType: string;
  timeSpan: string;
  amount: number | null;
  taxStatus: string;
  derivationMethod: string;
  componentPriceIds: string[];
  componentQuantities: number[];
  validFrom: string | null;
  exclusions: string;
  note: string;
  sourceUrl: string;
};

export type VenueOperation = {
  station: string | null;
  walkMinutes: number | null;
  stationAccess: string | null;
  airportAccess: string | null;
  parkingSpaces: number | null;
  largeVehicleAccess: string | null;
  loadingAccess: string | null;
  bookingOpenMonths: number | null;
  setupPolicy: string | null;
  networkPolicy: string | null;
  note: string | null;
};

export type OfficialLink = { label: string; url: string };

export type Venue = {
  id: string;
  region: string;
  prefecture: string;
  city: string;
  name: string;
  category: string;
  fitLevel: string;
  strengths: string;
  cautions: string;
  sourceUrl: string;
  verificationStatus: string;
  sourceCheckStatus: string | null;
  tags: string[];
  sourceIndex: string | null;
  evidenceTier: string;
  priceUrl: string | null;
  accessUrl: string | null;
  conditionsUrl: string | null;
  websiteUrl: string | null;
  officialLinks: OfficialLink[];
  observedAt: string | null;
  detailCount: number;
  priceCount: number;
  operationCount: number;
  historicalCompletedCount: number;
  historicalPlannedCount: number;
  historicalSeries: string[];
  historicalEventIds: string[];
  maxCapacity: number | null;
  maxArea: number | null;
  maxCeiling: number | null;
  ceilingReferenceCount: number;
  filterableCeilingCount: number;
  maxFloorLoad: number | null;
  hasFixedStage: boolean;
  practiceUse: string | null;
  streamingReady: string | null;
  minDailyFacilityPrice: number | null;
  priceObservations: PriceObservation[];
  budgetScenarios: BudgetScenario[];
  operation: VenueOperation | null;
  spaces: VenueSpace[];
  bestSpace: { id: string; name: string; type: string } | null;
};

export type HistoricalEvent = {
  id: string;
  series: string;
  year: number;
  eventStatus: string;
  country: string;
  prefectureOrState: string;
  city: string;
  venueNames: string;
  verificationStatus: string;
  sourceUrl: string;
  note: string;
};

export type VenueData = {
  stats: {
    historical: number;
    venues: number;
    details: number;
    prices: number;
    operations: number;
    budgetScenarios: number;
    candidateCoverage: { area: number; capacity: number; ceiling: number };
    spaceCoverage: { ceiling: number; ceilingReference: number };
    freshness: {
      firstObservedAt: string | null;
      latestObservedAt: string | null;
      observationCount: number;
      venueObservationCount: number;
    };
    urlAuditCheckedAt: string | null;
    unreachableSourceCount: number;
    smallTheaterTaggedCount: number;
  };
  venues: Venue[];
  historicalEvents: HistoricalEvent[];
};
