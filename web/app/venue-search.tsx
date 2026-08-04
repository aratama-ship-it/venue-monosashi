"use client";

import { useEffect, useMemo, useState } from "react";
import { venueData } from "./generated-data";
import { publication } from "./publication";

type Preset =
  | "all"
  | "jjf"
  | "jyyf"
  | "wyyc"
  | "diabolo"
  | "kendama"
  | "gymnasium"
  | "small_theater";
type SortKey =
  | "evidence"
  | "price"
  | "capacity"
  | "capacity_small"
  | "area"
  | "booking";
type VenueType = "all" | "small_theater";
type SmallTheaterLedgerItem = {
  id: string;
  indexName: string;
  indexUrl: string;
  indexedPrefecture: string | null;
  officialName: string | null;
  officialUrl: string | null;
  officialStatus: string | null;
  capacity: number | null;
  area: number | null;
  priceUrl: string | null;
  accessUrl: string | null;
  conditionsUrl: string | null;
  observedAt: string | null;
  verificationStatus: string;
  note: string | null;
};
type HistoricalSeries =
  | "all"
  | "JJF"
  | "JYYF_NATIONAL"
  | "JYYF_REGIONAL"
  | "JYYF_JUNIOR"
  | "WYYC"
  | "DIABOLO_AJDC"
  | "DIABOLO_OIDC"
  | "KENDAMA_KWC"
  | "KENDAMA_JKA_YOUTH";
type PriceUse =
  | "any"
  | "amateur_sports"
  | "event"
  | "performance"
  | "no_admission_nonprofit"
  | "admission";

const smallTheaterCsvUrl = `/data/${venueData.stats.smallTheaterCensus.assets.csv}`;
const smallTheaterLedgerUrl = `/data/${venueData.stats.smallTheaterCensus.assets.ledger}`;

const presets: Record<
  Preset,
  {
    label: string;
    capacityMin: number;
    capacityMax: number;
    ceiling: number;
    venueType: VenueType;
    priceUse: PriceUse;
    practice: boolean;
    description: string;
  }
> = {
  all: {
    label: "条件なし",
    capacityMin: 0,
    capacityMax: 0,
    ceiling: 0,
    venueType: "all",
    priceUse: "any",
    practice: false,
    description: "全国候補を広く見る",
  },
  jjf: {
    label: "JJF型",
    capacityMin: 650,
    capacityMax: 0,
    ceiling: 8,
    venueType: "all",
    priceUse: "any",
    practice: false,
    description: "練習空間＋舞台",
  },
  jyyf: {
    label: "国内ヨーヨー型",
    capacityMin: 600,
    capacityMax: 0,
    ceiling: 4,
    venueType: "all",
    priceUse: "any",
    practice: false,
    description: "舞台・客席・物販",
  },
  wyyc: {
    label: "世界大会型",
    capacityMin: 1000,
    capacityMax: 0,
    ceiling: 7,
    venueType: "all",
    priceUse: "any",
    practice: false,
    description: "配信・会議・宿泊",
  },
  diabolo: {
    label: "ディアボロ型",
    capacityMin: 300,
    capacityMax: 0,
    ceiling: 4,
    venueType: "all",
    priceUse: "any",
    practice: false,
    description: "AJDC・OIDC実績",
  },
  kendama: {
    label: "けん玉大会型",
    capacityMin: 100,
    capacityMax: 0,
    ceiling: 3,
    venueType: "all",
    priceUse: "any",
    practice: false,
    description: "KWC・全日本実績",
  },
  gymnasium: {
    label: "体育館型",
    capacityMin: 300,
    capacityMax: 0,
    ceiling: 7,
    venueType: "all",
    priceUse: "amateur_sports",
    practice: true,
    description: "競技面・天井・専用料金",
  },
  small_theater: {
    label: "小劇場型",
    capacityMin: 0,
    capacityMax: 150,
    ceiling: 0,
    venueType: "small_theater",
    priceUse: "performance",
    practice: false,
    description: "150席以下・公演料金",
  },
};

const yen = new Intl.NumberFormat("ja-JP");

const chargeLabels: Record<string, string> = {
  facility: "施設基本料",
  hvac: "空調",
  hvac_cooling: "冷房",
  hvac_heating: "暖房",
  equipment: "設備・備品",
  cleaning: "清掃",
  electricity: "電気",
  network: "通信回線",
  stage: "舞台",
  utilities: "光熱水",
  ventilation: "換気・排気",
};

const taxLabels: Record<string, string> = {
  included: "税込",
  excluded: "税別",
  not_stated: "税表記未確認",
};

const unitLabels: Record<string, string> = {
  per_day: "/日",
  per_hour: "/時",
  per_slot: "/区分",
  per_use: "/回",
  per_kw_day: "/kW・日",
  per_kwh: "/kWh",
  per_30_minutes: "/30分",
  per_day_equivalent: "/日換算",
  per_time_band: "/時間区分",
  per_outlet: "/口",
  metered: "従量",
  estimate: "参考目安",
};

const useCaseLabels: Record<string, string> = {
  all: "用途共通",
  amateur_sports: "アマチュアスポーツ",
  event: "展示・イベント",
  performance: "舞台公演",
  展示場: "展示場",
  non_profit: "非営利",
  non_sports_no_admission_nonprofit: "スポーツ以外・入場料なし・非営利",
  non_sports_admission_nonprofit: "スポーツ以外・入場料あり・非営利",
  non_sports_admission_commercial: "スポーツ以外・入場料あり・営利",
  no_admission_no_sales: "入場料・販売なし",
  combined_same_purpose: "同一目的の複合利用",
  no_admission: "入場料等なし",
  admission: "入場料等あり",
  youth_education: "青少年教育関係",
  admission_up_to_1000: "入場料1,000円以下",
  admission_under_5000_or_sales: "入場料5,000円未満または販売あり",
  admission_over_5000: "入場料5,000円以上",
  setup_teardown: "設営・撤去",
};

const historicalSeriesLabels: Record<string, string> = {
  JJF: "JJF",
  JYYF_NATIONAL: "JYYF 全国・前身",
  JYYF_REGIONAL: "JYYF 地区",
  JYYF_JUNIOR: "JYYF ジュニア",
  WYYC: "世界大会",
  DIABOLO_AJDC: "全日本ディアボロ",
  DIABOLO_OIDC: "大阪国際ディアボロ",
  KENDAMA_KWC: "けん玉ワールドカップ",
  KENDAMA_JKA_YOUTH: "全日本少年少女けん玉",
};

const eventStatusLabels: Record<string, string> = {
  held: "開催",
  planned: "予定",
  cancelled: "中止",
  hybrid_decentralized: "分散・オンライン",
  partially_cancelled: "一部中止",
};

const smallTheaterVerificationLabels: Record<string, string> = {
  verified_primary: "公式確認済み",
  primary_partial: "公式一部確認",
  official_not_found: "公式未発見",
  ambiguous: "同定保留",
  blocked: "取得保留",
};

const smallTheaterOfficialStatusLabels: Record<string, string> = {
  current: "現行（公式確認）",
  closed: "閉館（公式確認）",
  renamed: "改称（公式確認）",
  unknown: "現行性要確認",
};

const categoryWordLabels: Record<string, string> = {
  adjacent: "隣接",
  arena: "アリーナ",
  business: "ビジネス",
  commercial: "民間",
  community: "地域",
  complex: "複合施設",
  conference: "会議",
  convention: "コンベンション",
  culture: "文化",
  divisible: "分割可能",
  event: "イベント",
  exhibition: "展示",
  flat: "平土間",
  gallery: "ギャラリー",
  hall: "ホール",
  halls: "ホール",
  integrated: "複合",
  learning: "研修",
  lodging: "宿泊",
  meetings: "会議室",
  mice: "MICE",
  multi: "複数",
  multipurpose: "多目的",
  black: "ブラック",
  box: "ボックス",
  small: "小規模",
  onsite: "同一敷地",
  rehearsal: "リハーサル",
  resort: "リゾート",
  sports: "スポーツ",
  stage: "舞台",
  theater: "劇場",
  transformable: "可変",
  variable: "可変",
};

const largeVehicleLabels: Record<string, string> = {
  yes: "可",
  conditional: "条件付き",
  no: "不可",
  unknown: "要確認",
};

function categoryLabel(value: string) {
  return value
    .split("_")
    .filter((part) => part !== "and")
    .map((part) => categoryWordLabels[part] ?? part)
    .join("・");
}

function matchesPriceUse(useCase: string, selected: PriceUse) {
  if (selected === "any" || useCase === "all") return true;
  if (selected === "amateur_sports") return useCase === "amateur_sports";
  if (selected === "event") {
    return ["event", "展示場", "combined_same_purpose"].includes(useCase);
  }
  if (selected === "performance") return useCase === "performance";
  if (selected === "no_admission_nonprofit") {
    return [
      "non_profit",
      "non_sports_no_admission_nonprofit",
      "no_admission_no_sales",
      "no_admission",
    ].includes(useCase);
  }
  return [
    "non_sports_admission_nonprofit",
    "non_sports_admission_commercial",
    "admission_up_to_1000",
    "admission_under_5000_or_sales",
    "admission_over_5000",
    "admission",
  ].includes(useCase);
}

function priceLabel(value: number | null) {
  if (value === null) return "未観測";
  if (value >= 10_000) {
    const tenThousands = value / 10_000;
    return `¥${tenThousands.toLocaleString("ja-JP", {
      maximumFractionDigits: 1,
    })}万〜`;
  }
  return `¥${yen.format(value)}〜`;
}

function numberLabel(value: number | null, suffix: string) {
  return value === null ? "要確認" : `${yen.format(value)}${suffix}`;
}

function displayDate(value: string | null) {
  return value ? value.replaceAll("-", ".") : "未記録";
}

function observationAge(value: string | null) {
  if (!value) return "unknown";
  const observed = Date.parse(`${value}T00:00:00+09:00`);
  const published = Date.parse(`${publication.updatedAt}T00:00:00+09:00`);
  const days = Math.floor((published - observed) / 86_400_000);
  if (days > 180) return "stale";
  if (days > 60) return "review";
  return "current";
}

function observationLabel(value: string | null) {
  const age = observationAge(value);
  if (age === "unknown") return "観測日 未記録";
  if (age === "stale") return `${displayDate(value)}観測・再確認推奨`;
  if (age === "review") return `${displayDate(value)}観測・更新確認中`;
  return `${displayDate(value)}観測`;
}

function numberParam(params: URLSearchParams, key: string, max: number) {
  const value = Number(params.get(key));
  return Number.isFinite(value) && value > 0 ? Math.min(value, max) : 0;
}

export function VenueSearch() {
  const [preset, setPreset] = useState<Preset>("all");
  const [region, setRegion] = useState("全国");
  const [prefecture, setPrefecture] = useState("全国");
  const [keyword, setKeyword] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [capacityMax, setCapacityMax] = useState(0);
  const [area, setArea] = useState(0);
  const [ceiling, setCeiling] = useState(0);
  const [venueType, setVenueType] = useState<VenueType>("all");
  const [budget, setBudget] = useState(0);
  const [priceUse, setPriceUse] = useState<PriceUse>("any");
  const [includeBudgetScenarios, setIncludeBudgetScenarios] = useState(false);
  const [parking, setParking] = useState(0);
  const [fixedStage, setFixedStage] = useState(false);
  const [practice, setPractice] = useState(false);
  const [operationsOnly, setOperationsOnly] = useState(false);
  const [historicalOnly, setHistoricalOnly] = useState(false);
  const [sameSpace, setSameSpace] = useState(false);
  const [keepUnknown, setKeepUnknown] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("evidence");
  const [historicalSeries, setHistoricalSeries] =
    useState<HistoricalSeries>("all");
  const [historicalYear, setHistoricalYear] = useState("all");
  const [historicalQuery, setHistoricalQuery] = useState("");
  const [showAllHistorical, setShowAllHistorical] = useState(false);
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [smallTheaterPrefecture, setSmallTheaterPrefecture] = useState("全国");
  const [smallTheaterStatus, setSmallTheaterStatus] = useState("all");
  const [smallTheaterQuery, setSmallTheaterQuery] = useState("");
  const [smallTheaterCapacity, setSmallTheaterCapacity] = useState(0);
  const [showAllSmallTheaters, setShowAllSmallTheaters] = useState(false);
  const [smallTheaters, setSmallTheaters] = useState<SmallTheaterLedgerItem[]>([]);
  const [selectedVenueIds, setSelectedVenueIds] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [urlReady, setUrlReady] = useState(false);
  const [smallTheaterLoadState, setSmallTheaterLoadState] = useState<
    "loading" | "ready" | "failed"
  >("loading");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const presetParam = params.get("preset") as Preset | null;
      const nextPreset =
        presetParam && Object.hasOwn(presets, presetParam)
          ? presetParam
          : "all";
      const basePreset = presets[nextPreset];
      const nextRegion = params.get("region") ?? "全国";
      const validRegions = new Set(venueData.venues.map((venue) => venue.region));
      const nextPrefecture = params.get("prefecture") ?? "全国";
      const validPrefectures = new Set(
        venueData.venues.map((venue) => venue.prefecture),
      );
      const venueTypeParam = params.get("type") as VenueType | null;
      const priceUseParam = params.get("use") as PriceUse | null;
      const sortParam = params.get("sort") as SortKey | null;

      setPreset(nextPreset);
      setRegion(
        nextRegion === "全国" || validRegions.has(nextRegion)
          ? nextRegion
          : "全国",
      );
      setPrefecture(
        nextPrefecture === "全国" || validPrefectures.has(nextPrefecture)
          ? nextPrefecture
          : "全国",
      );
      setKeyword(params.get("q") ?? "");
      setCapacity(numberParam(params, "min", 5000) || basePreset.capacityMin);
      setCapacityMax(
        numberParam(params, "max", 2000) || basePreset.capacityMax,
      );
      setArea(numberParam(params, "area", 10000));
      setCeiling(numberParam(params, "ceiling", 20) || basePreset.ceiling);
      setVenueType(
        venueTypeParam === "small_theater"
          ? venueTypeParam
          : basePreset.venueType,
      );
      setBudget(numberParam(params, "budget", 1500));
      setPriceUse(
        priceUseParam &&
          [
            "any",
            "amateur_sports",
            "event",
            "performance",
            "no_admission_nonprofit",
            "admission",
          ].includes(priceUseParam)
          ? priceUseParam
          : basePreset.priceUse,
      );
      setIncludeBudgetScenarios(params.get("scenarios") === "1");
      setParking(numberParam(params, "parking", 5000));
      setFixedStage(params.get("fixed") === "1");
      setPractice(
        params.has("practice")
          ? params.get("practice") === "1"
          : basePreset.practice,
      );
      setOperationsOnly(params.get("operations") === "1");
      setHistoricalOnly(params.get("history") === "1");
      setSameSpace(params.get("same") === "1");
      setKeepUnknown(params.get("unknown") !== "0");
      setSortKey(
        sortParam &&
          [
            "evidence",
            "price",
            "capacity",
            "capacity_small",
            "area",
            "booking",
          ].includes(sortParam)
          ? sortParam
          : "evidence",
      );
      const validVenueIds = new Set(
        venueData.venues.map((venue) => venue.id),
      );
      setSelectedVenueIds(
        (params.get("compare") ?? "")
          .split(",")
          .filter((id) => validVenueIds.has(id))
          .slice(0, 3),
      );
      setUrlReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let active = true;
    fetch(smallTheaterLedgerUrl)
      .then((response) => {
        if (!response.ok) throw new Error("small theater ledger unavailable");
        return response.json() as Promise<SmallTheaterLedgerItem[]>;
      })
      .then((payload) => {
        if (!active || !Array.isArray(payload)) return;
        setSmallTheaters(payload);
        setSmallTheaterLoadState("ready");
      })
      .catch(() => {
        if (active) setSmallTheaterLoadState("failed");
      });
    return () => {
      active = false;
    };
  }, []);

  const regions = useMemo(
    () =>
      Array.from(new Set(venueData.venues.map((venue) => venue.region))).sort(
        (a, b) => a.localeCompare(b, "ja"),
      ),
    [],
  );
  const prefectures = useMemo(
    () =>
      Array.from(
        new Set(
          venueData.venues
            .filter((venue) => region === "全国" || venue.region === region)
            .map((venue) => venue.prefecture),
        ),
      ).sort((a, b) => a.localeCompare(b, "ja")),
    [region],
  );
  const historicalYears = useMemo(
    () =>
      Array.from(
        new Set(venueData.historicalEvents.map((event) => event.year)),
      ).sort((a, b) => b - a),
    [],
  );
  const historicalResults = useMemo(() => {
    const normalized = historicalQuery.trim().toLocaleLowerCase("ja");
    return [...venueData.historicalEvents]
      .filter(
        (event) =>
          historicalSeries === "all" || event.series === historicalSeries,
      )
      .filter(
        (event) =>
          historicalYear === "all" ||
          event.year === Number(historicalYear),
      )
      .filter((event) => {
        if (!normalized) return true;
        return [
          event.venueNames,
          event.city,
          event.prefectureOrState,
          event.country,
          event.note,
        ]
          .join(" ")
          .toLocaleLowerCase("ja")
          .includes(normalized);
      })
      .sort(
        (a, b) =>
          b.year - a.year ||
          a.series.localeCompare(b.series) ||
          a.city.localeCompare(b.city, "ja"),
      );
  }, [historicalQuery, historicalSeries, historicalYear]);
  const visibleHistorical = showAllHistorical
    ? historicalResults
    : historicalResults.slice(0, 24);

  const smallTheaterPrefectures = useMemo(
    () =>
      Array.from(
        new Set(
          smallTheaters
            .map((theater) => theater.indexedPrefecture)
            .filter((prefecture): prefecture is string => prefecture !== null),
        ),
      ).sort((a, b) => a.localeCompare(b, "ja")),
    [smallTheaters],
  );
  const smallTheaterResults = useMemo(() => {
    const normalized = smallTheaterQuery.trim().toLocaleLowerCase("ja");
    return [...smallTheaters]
      .filter(
        (theater) =>
          smallTheaterPrefecture === "全国" ||
          theater.indexedPrefecture === smallTheaterPrefecture,
      )
      .filter(
        (theater) =>
          smallTheaterStatus === "all" ||
          theater.verificationStatus === smallTheaterStatus,
      )
      .filter(
        (theater) =>
          smallTheaterCapacity <= 0 ||
          (theater.capacity !== null && theater.capacity >= smallTheaterCapacity),
      )
      .filter((theater) => {
        if (!normalized) return true;
        return [
          theater.indexName,
          theater.officialName ?? "",
          theater.indexedPrefecture ?? "",
          theater.note ?? "",
        ]
          .join(" ")
          .toLocaleLowerCase("ja")
          .includes(normalized);
      })
      .sort(
        (a, b) =>
          Number(b.verificationStatus === "verified_primary") -
            Number(a.verificationStatus === "verified_primary") ||
          a.indexName.localeCompare(b.indexName, "ja"),
      );
  }, [
    smallTheaterCapacity,
    smallTheaters,
    smallTheaterPrefecture,
    smallTheaterQuery,
    smallTheaterStatus,
  ]);
  const visibleSmallTheaters = showAllSmallTheaters
    ? smallTheaterResults
    : smallTheaterResults.slice(0, 40);

  const results = useMemo(() => {
    const normalized = keyword.trim().toLocaleLowerCase("ja");
    return venueData.venues
      .map((venue) => {
        const hasSpaceCondition =
          capacity > 0 ||
          capacityMax > 0 ||
          area > 0 ||
          ceiling > 0 ||
          fixedStage ||
          practice;
        const matchingSpaces = venue.spaces.filter((space) => {
          const observedCapacity = Math.max(
            space.capacityTheater ?? -1,
            space.capacityFixed ?? -1,
          );
          if (
            capacity > 0 &&
            observedCapacity >= 0 &&
            observedCapacity < capacity
          ) {
            return false;
          }
          if (capacity > 0 && observedCapacity < 0 && !keepUnknown) return false;
          if (
            capacityMax > 0 &&
            observedCapacity >= 0 &&
            observedCapacity > capacityMax
          ) {
            return false;
          }
          if (capacityMax > 0 && observedCapacity < 0 && !keepUnknown) {
            return false;
          }
          if (area > 0 && space.area !== null && space.area < area) return false;
          if (area > 0 && space.area === null && !keepUnknown) return false;
          if (
            ceiling > 0 &&
            space.ceiling !== null &&
            space.ceiling < ceiling
          ) {
            return false;
          }
          if (ceiling > 0 && space.ceiling === null && !keepUnknown) return false;
          if (
            fixedStage &&
            space.stageType !== "fixed" &&
            !(keepUnknown && space.stageType === "unknown")
          ) {
            return false;
          }
          if (
            practice &&
            space.practiceUse !== "yes" &&
            space.practiceUse !== "conditional" &&
            !(keepUnknown && space.practiceUse === "unknown")
          ) {
            return false;
          }
          return true;
        });
        const matchingSpaceIds = new Set(matchingSpaces.map((space) => space.id));
        const compatibleDailyPrices = venue.priceObservations
          .filter(
            (price) =>
              price.category === "facility" &&
              price.unit === "per_day" &&
              !price.useCase.includes("setup") &&
              matchesPriceUse(price.useCase, priceUse) &&
              (!sameSpace ||
                !hasSpaceCondition ||
                matchingSpaceIds.has(price.spaceId)),
          )
          .map((price) => ({
            amount: price.amount,
            kind: "official_daily" as const,
          }))
          .filter(
            (
              price,
            ): price is { amount: number; kind: "official_daily" } =>
              price.amount !== null,
          );
        const compatibleBudgetScenarios = includeBudgetScenarios
          ? venue.budgetScenarios
              .filter(
                (scenario) =>
                  matchesPriceUse(scenario.useCase, priceUse) &&
                  (!sameSpace ||
                    !hasSpaceCondition ||
                    matchingSpaceIds.has(scenario.spaceId)),
              )
              .map((scenario) => ({
                amount: scenario.amount,
                kind: "derived_scenario" as const,
              }))
              .filter(
                (
                  scenario,
                ): scenario is {
                  amount: number;
                  kind: "derived_scenario";
                } => scenario.amount !== null,
              )
          : [];
        const compatiblePrices = [
          ...compatibleDailyPrices,
          ...compatibleBudgetScenarios,
        ].sort((a, b) => a.amount - b.amount);
        return {
          ...venue,
          sameSpaceKnownMatch:
            !hasSpaceCondition ||
            matchingSpaces.length > 0 ||
            (venue.spaces.length === 0 && keepUnknown),
          searchPrice: compatiblePrices[0]?.amount ?? null,
          searchPriceKind: compatiblePrices[0]?.kind ?? null,
        };
      })
      .filter((venue) => region === "全国" || venue.region === region)
      .filter((venue) => prefecture === "全国" || venue.prefecture === prefecture)
      .filter(
        (venue) =>
          venueType === "all" || venue.category.includes("small_theater"),
      )
      .filter((venue) => {
        if (!normalized) return true;
        return [
          venue.name,
          venue.city,
          venue.prefecture,
          venue.strengths,
          venue.cautions,
          venue.bestSpace?.name ?? "",
        ]
          .join(" ")
          .toLocaleLowerCase("ja")
          .includes(normalized);
      })
      .filter((venue) => {
        if (sameSpace) return venue.sameSpaceKnownMatch;
        if (capacity <= 0) return true;
        if (venue.maxCapacity === null) return keepUnknown;
        return venue.maxCapacity >= capacity;
      })
      .filter((venue) => {
        if (sameSpace || capacityMax <= 0) return true;
        if (venue.spaces.length === 0) return keepUnknown;
        return venue.spaces.some((space) => {
          const observedCapacity = Math.max(
            space.capacityTheater ?? -1,
            space.capacityFixed ?? -1,
          );
          return observedCapacity < 0
            ? keepUnknown
            : observedCapacity <= capacityMax;
        });
      })
      .filter((venue) => {
        if (sameSpace) return true;
        if (area <= 0) return true;
        if (venue.maxArea === null) return keepUnknown;
        return venue.maxArea >= area;
      })
      .filter((venue) => {
        if (sameSpace) return true;
        if (ceiling <= 0) return true;
        if (venue.maxCeiling === null) return keepUnknown;
        return venue.maxCeiling >= ceiling;
      })
      .filter((venue) => {
        if (budget <= 0) return true;
        if (venue.searchPrice === null) return keepUnknown;
        return venue.searchPrice <= budget * 10_000;
      })
      .filter((venue) => {
        if (parking <= 0) return true;
        if (venue.operation?.parkingSpaces === null || !venue.operation) {
          return keepUnknown;
        }
        return venue.operation.parkingSpaces >= parking;
      })
      .filter((venue) => {
        if (sameSpace) return true;
        if (!fixedStage) return true;
        if (venue.detailCount === 0) return keepUnknown;
        return venue.hasFixedStage;
      })
      .filter((venue) => {
        if (sameSpace) return true;
        if (!practice) return true;
        if (venue.practiceUse === null) return keepUnknown;
        return venue.practiceUse === "yes" || venue.practiceUse === "conditional";
      })
      .filter((venue) => {
        if (!operationsOnly) return true;
        return venue.operation !== null;
      })
      .filter((venue) => {
        if (!historicalOnly) return true;
        return venue.historicalCompletedCount > 0;
      })
      .sort((a, b) => {
        if (sortKey === "price") {
          return (
            (a.searchPrice ?? Number.POSITIVE_INFINITY) -
              (b.searchPrice ?? Number.POSITIVE_INFINITY) ||
            a.name.localeCompare(b.name, "ja")
          );
        }
        if (sortKey === "capacity") {
          return (
            (b.maxCapacity ?? -1) - (a.maxCapacity ?? -1) ||
            a.name.localeCompare(b.name, "ja")
          );
        }
        if (sortKey === "capacity_small") {
          return (
            (a.maxCapacity ?? Number.POSITIVE_INFINITY) -
              (b.maxCapacity ?? Number.POSITIVE_INFINITY) ||
            a.name.localeCompare(b.name, "ja")
          );
        }
        if (sortKey === "area") {
          return (
            (b.maxArea ?? -1) - (a.maxArea ?? -1) ||
            a.name.localeCompare(b.name, "ja")
          );
        }
        if (sortKey === "booking") {
          return (
            (b.operation?.bookingOpenMonths ?? -1) -
              (a.operation?.bookingOpenMonths ?? -1) ||
            a.name.localeCompare(b.name, "ja")
          );
        }
        const aKnown =
          Number(a.detailCount > 0) +
          Number(a.priceCount > 0) +
          Number(a.operationCount > 0) +
          Number(a.historicalCompletedCount > 0);
        const bKnown =
          Number(b.detailCount > 0) +
          Number(b.priceCount > 0) +
          Number(b.operationCount > 0) +
          Number(b.historicalCompletedCount > 0);
        if (aKnown !== bKnown) return bKnown - aKnown;
        if (a.fitLevel !== b.fitLevel) return a.fitLevel.localeCompare(b.fitLevel);
        return a.name.localeCompare(b.name, "ja");
      });
  }, [
    area,
    budget,
    capacity,
    capacityMax,
    ceiling,
    fixedStage,
    historicalOnly,
    includeBudgetScenarios,
    keepUnknown,
    keyword,
    operationsOnly,
    parking,
    practice,
    priceUse,
    prefecture,
    region,
    sameSpace,
    sortKey,
    venueType,
  ]);

  const selectedVenues = useMemo(
    () =>
      selectedVenueIds
        .map((id) => venueData.venues.find((venue) => venue.id === id))
        .filter((venue) => venue !== undefined),
    [selectedVenueIds],
  );
  const visibleResults = showAllVenues ? results : results.slice(0, 40);

  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    if (preset !== "all") params.set("preset", preset);
    if (region !== "全国") params.set("region", region);
    if (prefecture !== "全国") params.set("prefecture", prefecture);
    if (keyword.trim()) params.set("q", keyword.trim());
    if (capacity > 0 && capacity !== presets[preset].capacityMin) {
      params.set("min", String(capacity));
    }
    if (capacityMax > 0 && capacityMax !== presets[preset].capacityMax) {
      params.set("max", String(capacityMax));
    }
    if (area > 0) params.set("area", String(area));
    if (ceiling > 0 && ceiling !== presets[preset].ceiling) {
      params.set("ceiling", String(ceiling));
    }
    if (venueType !== presets[preset].venueType) params.set("type", venueType);
    if (budget > 0) params.set("budget", String(budget));
    if (priceUse !== presets[preset].priceUse) params.set("use", priceUse);
    if (includeBudgetScenarios) params.set("scenarios", "1");
    if (parking > 0) params.set("parking", String(parking));
    if (fixedStage) params.set("fixed", "1");
    if (practice !== presets[preset].practice) {
      params.set("practice", practice ? "1" : "0");
    }
    if (operationsOnly) params.set("operations", "1");
    if (historicalOnly) params.set("history", "1");
    if (sameSpace) params.set("same", "1");
    if (!keepUnknown) params.set("unknown", "0");
    if (sortKey !== "evidence") params.set("sort", sortKey);
    if (selectedVenueIds.length) {
      params.set("compare", selectedVenueIds.join(","));
    }
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [
    area,
    budget,
    capacity,
    capacityMax,
    ceiling,
    fixedStage,
    historicalOnly,
    includeBudgetScenarios,
    keepUnknown,
    keyword,
    operationsOnly,
    parking,
    practice,
    preset,
    priceUse,
    prefecture,
    region,
    sameSpace,
    selectedVenueIds,
    sortKey,
    urlReady,
    venueType,
  ]);

  function announce(message: string) {
    setActionMessage(message);
    window.setTimeout(() => setActionMessage(""), 3200);
  }

  async function copyShareUrl() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    announce("現在の条件を含むURLをコピーしました");
  }

  function toggleComparison(id: string) {
    if (selectedVenueIds.includes(id)) {
      setSelectedVenueIds((current) => current.filter((item) => item !== id));
      return;
    }
    if (selectedVenueIds.length >= 3) {
      announce("比較できる会場は3件までです");
      return;
    }
    setSelectedVenueIds((current) => [...current, id]);
  }

  function choosePreset(next: Preset) {
    setPreset(next);
    setCapacity(presets[next].capacityMin);
    setCapacityMax(presets[next].capacityMax);
    setCeiling(presets[next].ceiling);
    setVenueType(presets[next].venueType);
    setPriceUse(presets[next].priceUse);
    setPractice(presets[next].practice);
  }

  function reset() {
    setPreset("all");
    setRegion("全国");
    setPrefecture("全国");
    setKeyword("");
    setCapacity(0);
    setCapacityMax(0);
    setArea(0);
    setCeiling(0);
    setVenueType("all");
    setBudget(0);
    setPriceUse("any");
    setIncludeBudgetScenarios(false);
    setParking(0);
    setFixedStage(false);
    setPractice(false);
    setOperationsOnly(false);
    setHistoricalOnly(false);
    setSameSpace(false);
    setKeepUnknown(true);
    setSortKey("evidence");
  }

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#search">
        検索条件へ移動
      </a>

      <aside className="site-rail" aria-label="サイト案内">
        <div>
          <a className="rail-brand" href="#top" aria-label="会場ものさし ホーム">
            <span className="rail-symbol" aria-hidden="true">
              目
            </span>
            <span>
              <strong>会場ものさし</strong>
              <small>EVENT VENUE INDEX</small>
            </span>
          </a>

          <nav className="rail-nav" aria-label="ページ内ナビゲーション">
            <a className="rail-nav-primary" href="#top">
              <span aria-hidden="true">⌂</span>
              はじめに
            </a>
            <a href="#search">
              <span aria-hidden="true">⌕</span>
              条件で探す
            </a>
            <a href="#past-venues">
              <span aria-hidden="true">▤</span>
              過去会場台帳
            </a>
            <a href="#small-theater-ledger">
              <span aria-hidden="true">⌘</span>
              小劇場台帳
            </a>
            <a href="#method">
              <span aria-hidden="true">↳</span>
              読み方
            </a>
            <a href="#updates">
              <span aria-hidden="true">↻</span>
              更新と訂正
            </a>
          </nav>
        </div>

        <div className="rail-foot">
          <p>
            <span>DATA EDITION</span>
            {publication.edition}
          </p>
          <p>
            <span>LATEST OBSERVATION</span>
            {displayDate(venueData.stats.freshness.latestObservedAt)}
          </p>
          <a className="rail-action" href="#search">
            候補を測りはじめる
            <span aria-hidden="true">↘</span>
          </a>
        </div>
      </aside>

      <div className="site-canvas">
        <header className="masthead">
          <div className="masthead-inner">
            <div className="brand">
              <span className="brand-mark">会場ものさし</span>
              <span className="edition">{publication.edition}</span>
            </div>
            <div className="masthead-note">
              最終一次情報観測 {displayDate(venueData.stats.freshness.latestObservedAt)}
              <br />
              公開版更新 {displayDate(publication.updatedAt)}
            </div>
          </div>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-visual">
            <p className="eyebrow">EVENT VENUE FIELD GUIDE</p>
            <h1 id="hero-title">
              会場を、名前でなく
              <span>条件で測る。</span>
            </h1>
            <div className="hero-drawing" aria-hidden="true">
              <span className="drawing-label">SPACE / COST / ACCESS</span>
              <span className="drawing-axis drawing-axis-x" />
              <span className="drawing-axis drawing-axis-y" />
              <span className="drawing-stage">STAGE</span>
              <span className="drawing-floor">FLOOR</span>
              <span className="drawing-capacity">650+</span>
            </div>
          </div>

          <div className="hero-summary">
            <p className="hero-copy">
              JJF、日本ヨーヨー連盟、世界大会、ディアボロ、けん玉の過去会場を基準に、
              全国の候補を面積・天井・客席・予算・搬入・アクセスで見比べます。
              150席以下の小劇場も、平土間・公演料金・利用条件から探せます。
              未確認の費用は0円にせず、問い合せが必要な条件として残します。
            </p>
            <aside className="reference-block" aria-label="収録範囲">
              <p className="reference-title">いま載っている目盛り</p>
              <div className="reference-grid">
                <div className="reference-row">
                  <strong>{venueData.stats.historical}</strong>
                  <span>過去大会記録</span>
                </div>
                <div className="reference-row">
                  <strong>{venueData.stats.venues}</strong>
                  <span>全国候補施設</span>
                </div>
                <div className="reference-row">
                  <strong>47</strong>
                  <span>都道府県を一巡</span>
                </div>
                <div className="reference-row">
                  <strong>{venueData.stats.prices}</strong>
                  <span>条件付き料金観測</span>
                </div>
                <div className="reference-row">
                  <strong>{venueData.stats.budgetScenarios}</strong>
                  <span>区分合計の参考額</span>
                </div>
                <div className="reference-row">
                  <strong>{venueData.stats.smallTheaterCensus.total}</strong>
                  <span>
                    <a href={smallTheaterCsvUrl}>
                      小劇場一次情報台帳 ↓
                    </a>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="measure" aria-hidden="true" />

        <section className="freshness-strip" aria-label="データの鮮度と公開状態">
          <div>
            <span>LAST OBSERVED</span>
            <strong>{displayDate(venueData.stats.freshness.latestObservedAt)}</strong>
            <small>収録一次情報の最終観測日</small>
          </div>
          <div>
            <span>VENUE OBSERVATIONS</span>
            <strong>{yen.format(venueData.stats.freshness.venueObservationCount)}</strong>
            <small>区画・料金・運用・参考額の観測</small>
          </div>
          <div>
            <span>SMALL THEATER DATES</span>
            <strong>
              {yen.format(venueData.stats.freshness.smallTheaterObservationCount)}
            </strong>
            <small>公式確認日を記録した小劇場</small>
          </div>
          <div>
            <span>PUBLIC EDITION</span>
            <strong>{displayDate(publication.updatedAt)}</strong>
            <small>サイト更新日。空き状況の保証日ではありません</small>
          </div>
        </section>

      <section className="workspace" id="search" aria-label="会場検索">
        <aside className="filters">
          <h2>条件を置く</h2>
          <button
            aria-controls="venue-filter-body"
            aria-expanded={mobileFiltersOpen}
            className="mobile-filter-toggle"
            onClick={() => setMobileFiltersOpen((current) => !current)}
            type="button"
          >
            {mobileFiltersOpen ? "絞り込みを閉じる" : "絞り込みを開く"}
            <span aria-hidden="true">{mobileFiltersOpen ? "−" : "+"}</span>
          </button>
          <p className="filter-caption">
            数値が未公開の施設を残すかどうかで、検索の厳しさを変えられます。
          </p>

          <div
            className="filter-body"
            data-mobile-open={mobileFiltersOpen}
            id="venue-filter-body"
          >
            <div className="field preset-field">
              <span className="field-label">会場の型</span>
              <div className="preset-grid">
                {(Object.keys(presets) as Preset[]).map((key) => (
                  <button
                    className="preset-button"
                    data-active={preset === key}
                    key={key}
                    onClick={() => choosePreset(key)}
                    type="button"
                  >
                    {presets[key].label}
                    <br />
                    <small>{presets[key].description}</small>
                  </button>
                ))}
              </div>
            </div>

            <label className="field">
              <span className="field-label">会場タイプ</span>
              <select
                value={venueType}
                onChange={(event) => {
                  setPreset("all");
                  setVenueType(event.target.value as VenueType);
                }}
              >
                <option value="all">指定なし</option>
                <option value="small_theater">小劇場・ブラックボックス</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">地方</span>
              <select
                value={region}
                onChange={(event) => {
                  setRegion(event.target.value);
                  setPrefecture("全国");
                }}
              >
                <option>全国</option>
                {regions.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">都道府県</span>
              <select
                value={prefecture}
                onChange={(event) => setPrefecture(event.target.value)}
              >
                <option>全国</option>
                {prefectures.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">キーワード</span>
              <input
                type="search"
                placeholder="例：平土間、駅直結、配信"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>

            <label className="field">
              <span className="field-label">
                最低観測面積 <output>{area ? `${area}㎡` : "指定なし"}</output>
              </span>
              <input
                className="range"
                max="10000"
                min="0"
                step="250"
                type="range"
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
              />
            </label>

            <label className="field">
              <span className="field-label">
                最低収容人数 <output>{capacity || "指定なし"}</output>
              </span>
              <input
                className="range"
                max="5000"
                min="0"
                step="50"
                type="range"
                value={capacity}
                onChange={(event) => {
                  setPreset("all");
                  setCapacity(Number(event.target.value));
                }}
              />
            </label>

            <label className="field">
              <span className="field-label">
                最大収容人数{" "}
                <output>{capacityMax || "指定なし"}</output>
              </span>
              <input
                className="range"
                max="2000"
                min="0"
                step="50"
                type="range"
                value={capacityMax}
                onChange={(event) => {
                  setPreset("all");
                  setCapacityMax(Number(event.target.value));
                }}
              />
            </label>

            <label className="field">
              <span className="field-label">
                最低天井高 <output>{ceiling ? `${ceiling}m` : "指定なし"}</output>
              </span>
              <input
                className="range"
                max="20"
                min="0"
                step="1"
                type="range"
                value={ceiling}
                onChange={(event) => {
                  setPreset("all");
                  setCeiling(Number(event.target.value));
                }}
              />
            </label>

            <label className="field">
              <span className="field-label">
                確認済み日額料の上限{" "}
                <output>{budget ? `${budget}万円` : "指定なし"}</output>
              </span>
              <input
                className="range"
                max="1500"
                min="0"
                step="10"
                type="range"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
              />
            </label>

            <label className="field">
              <span className="field-label">料金条件の用途</span>
              <select
                value={priceUse}
                onChange={(event) =>
                  setPriceUse(event.target.value as PriceUse)
                }
              >
                <option value="any">指定なし（全観測）</option>
                <option value="amateur_sports">アマチュアスポーツ</option>
                <option value="event">展示・イベント</option>
                <option value="performance">舞台公演</option>
                <option value="no_admission_nonprofit">
                  入場料なし・非営利
                </option>
                <option value="admission">入場料あり</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">
                最低駐車台数 <output>{parking || "指定なし"}</output>
              </span>
              <input
                className="range"
                max="5000"
                min="0"
                step="100"
                type="range"
                value={parking}
                onChange={(event) => setParking(Number(event.target.value))}
              />
            </label>

            <label className="check-field">
              <input
                checked={includeBudgetScenarios}
                onChange={(event) =>
                  setIncludeBudgetScenarios(event.target.checked)
                }
                type="checkbox"
              />
              <span>
                区分料金から組み立てた参考合計も予算検索に含める
              </span>
            </label>

            <label className="check-field">
              <input
                checked={fixedStage}
                onChange={(event) => setFixedStage(event.target.checked)}
                type="checkbox"
              />
              <span>固定舞台が確認できた候補</span>
            </label>

            <label className="check-field">
              <input
                checked={practice}
                onChange={(event) => setPractice(event.target.checked)}
                type="checkbox"
              />
              <span>競技・練習利用が可能または条件付き</span>
            </label>

            <label className="check-field">
              <input
                checked={operationsOnly}
                onChange={(event) => setOperationsOnly(event.target.checked)}
                type="checkbox"
              />
              <span>予約・搬入・交通の運用観測あり</span>
            </label>

            <label className="check-field">
              <input
                checked={historicalOnly}
                onChange={(event) => setHistoricalOnly(event.target.checked)}
                type="checkbox"
              />
              <span>収録大会の開催実績と照合済み</span>
            </label>

            <label className="check-field">
              <input
                checked={sameSpace}
                onChange={(event) => setSameSpace(event.target.checked)}
                type="checkbox"
              />
              <span>面積・収容・天井・舞台を同じ貸出区画で満たす</span>
            </label>

            <label className="check-field">
              <input
                checked={keepUnknown}
                onChange={(event) => setKeepUnknown(event.target.checked)}
                type="checkbox"
              />
              <span>
                数値が未確認の施設も「要問い合わせ」として候補に残す
              </span>
            </label>

            <button className="reset-button" onClick={reset} type="button">
              条件をすべて外す
            </button>
          </div>
        </aside>

        <div className="results" aria-live="polite">
          <div className="results-head">
            <div>
              <p className="eyebrow">MEASURED RESULTS</p>
              <h2>同じ目盛りで見る</h2>
            </div>
            <div className="results-count">
              <label className="sort-field">
                <span>並べ替え</span>
                <select
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value as SortKey)}
                >
                  <option value="evidence">観測の厚さ</option>
                  <option value="price">確認済み日額が低い順</option>
                  <option value="capacity">収容が大きい順</option>
                  <option value="capacity_small">収容が小さい順</option>
                  <option value="area">面積が大きい順</option>
                  <option value="booking">予約開始が早い順</option>
                </select>
              </label>
              <span>
                <strong>{results.length}</strong> / {venueData.stats.venues}施設
              </span>
              <button
                className="share-button"
                onClick={copyShareUrl}
                type="button"
              >
                条件を共有
              </button>
            </div>
          </div>

          <p aria-live="polite" className="action-message">
            {actionMessage}
          </p>

          {selectedVenues.length > 0 && (
            <section className="comparison-panel" aria-labelledby="comparison-title">
              <div className="comparison-head">
                <div>
                  <p className="eyebrow">SHORTLIST</p>
                  <h3 id="comparison-title">候補を並べて比較</h3>
                </div>
                <span>{selectedVenues.length} / 3施設</span>
              </div>
              <div className="comparison-grid">
                {selectedVenues.map((venue) => (
                  <article className="comparison-card" key={venue.id}>
                    <button
                      aria-label={`${venue.name}を比較から外す`}
                      onClick={() => toggleComparison(venue.id)}
                      type="button"
                    >
                      ×
                    </button>
                    <h4>{venue.name}</h4>
                    <p>{venue.prefecture} {venue.city}</p>
                    <dl>
                      <div>
                        <dt>最大観測面積</dt>
                        <dd>{numberLabel(venue.maxArea, "㎡")}</dd>
                      </div>
                      <div>
                        <dt>最大観測収容</dt>
                        <dd>{numberLabel(venue.maxCapacity, "人")}</dd>
                      </div>
                      <div>
                        <dt>候補内最小日額</dt>
                        <dd>{priceLabel(venue.minDailyFacilityPrice)}</dd>
                      </div>
                      <div>
                        <dt>一次情報観測</dt>
                        <dd>{displayDate(venue.observedAt)}</dd>
                      </div>
                    </dl>
                    <a href={venue.sourceUrl} rel="noreferrer" target="_blank">
                      公式情報 ↗
                    </a>
                  </article>
                ))}
              </div>
              {selectedVenues.length === 1 && (
                <p className="comparison-hint">
                  もう1〜2施設を追加すると違いを横並びで確認できます。
                </p>
              )}
            </section>
          )}

          {results.length ? (
            <div className="venue-list">
              {visibleResults.map((venue, index) => (
                <article className="venue-card" key={venue.id}>
                  <div className="rank">{String(index + 1).padStart(2, "0")}</div>
                  <div className="venue-main">
                    <div className="venue-title-row">
                      <div>
                        <h3 className="venue-title">{venue.name}</h3>
                        <p className="venue-place">
                          {venue.prefecture} {venue.city} ·{" "}
                          {categoryLabel(venue.category)}
                        </p>
                      </div>
                      <div className="venue-actions">
                        <button
                          aria-pressed={selectedVenueIds.includes(venue.id)}
                          className="compare-button"
                          data-selected={selectedVenueIds.includes(venue.id)}
                          onClick={() => toggleComparison(venue.id)}
                          type="button"
                        >
                          {selectedVenueIds.includes(venue.id)
                            ? "比較中"
                            : "比較に追加"}
                        </button>
                        <span className="fit-mark">基準 {venue.fitLevel}</span>
                      </div>
                    </div>

                    <p className="venue-summary">{venue.strengths}</p>

                    <div className="metrics">
                      <div className="metric">
                        <span className="metric-label">代表区画</span>
                        <span
                          className={`metric-value ${venue.bestSpace ? "" : "unknown"}`}
                        >
                          {venue.bestSpace?.name ?? "区画未調査"}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">最大観測面積</span>
                        <span
                          className={`metric-value ${venue.maxArea === null ? "unknown" : ""}`}
                        >
                          {numberLabel(venue.maxArea, "㎡")}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">最大観測収容</span>
                        <span
                          className={`metric-value ${venue.maxCapacity === null ? "unknown" : ""}`}
                        >
                          {numberLabel(venue.maxCapacity, "人")}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">
                          {sameSpace ? "同一区画の日額料" : "候補内最小日額"}
                          {priceUse !== "any" && "・用途一致"}
                        </span>
                        <span
                          className={`metric-value ${venue.searchPrice === null ? "unknown" : ""}`}
                        >
                          {priceLabel(venue.searchPrice)}
                          {venue.searchPriceKind === "derived_scenario" && (
                            <small>区分合計の参考額</small>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="venue-foot">
                      <div className="status-line">
                        <span className="status">一次情報あり</span>
                        <span
                          className={`status freshness ${observationAge(venue.observedAt)}`}
                        >
                          {observationLabel(venue.observedAt)}
                        </span>
                        {venue.detailCount === 0 && (
                          <span className="status warn">区画値 未観測</span>
                        )}
                        {venue.priceCount === 0 && (
                          <span className="status warn">料金 未観測</span>
                        )}
                        {venue.priceCount > 0 && (
                          <span className="status warn">付帯費は別確認</span>
                        )}
                        {venue.historicalCompletedCount > 0 && (
                          <span className="status">
                            過去実績 {venue.historicalCompletedCount}件
                            {venue.historicalPlannedCount > 0
                              ? ` ＋予定${venue.historicalPlannedCount}件`
                              : ""}
                          </span>
                        )}
                        {!sameSpace && venue.detailCount > 1 && (
                          <span className="status warn">数値は別区画を含む</span>
                        )}
                        {venue.operation?.largeVehicleAccess && (
                          <span className="status">
                            大型搬入{" "}
                            {largeVehicleLabels[
                              venue.operation.largeVehicleAccess
                            ] ?? venue.operation.largeVehicleAccess}
                          </span>
                        )}
                      </div>
                      <a
                        className="source-link"
                        href={venue.sourceUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        公式情報を確認 ↗
                      </a>
                    </div>

                    {(venue.priceObservations.length > 0 ||
                      venue.budgetScenarios.length > 0 ||
                      venue.operation) && (
                      <details className="evidence-drawer">
                        <summary>
                          <span>観測した料金・運用を確認</span>
                          <span className="drawer-count">
                            {venue.priceObservations.length}料金 /{" "}
                            {venue.budgetScenarios.length}参考合計 /{" "}
                            {venue.operation ? "運用あり" : "運用未観測"}
                          </span>
                        </summary>

                        {venue.priceObservations.length > 0 && (
                          <div className="price-table-wrap">
                            <table className="price-table">
                              <thead>
                                <tr>
                                  <th>区分</th>
                                  <th>確認額</th>
                                  <th>条件・根拠</th>
                                  <th>別途・未確認</th>
                                </tr>
                              </thead>
                              <tbody>
                                {venue.priceObservations.map((price) => (
                                  <tr key={price.id}>
                                    <td>
                                      {chargeLabels[price.category] ??
                                        price.category}
                                      <small>
                                        {price.validFrom
                                          ? `${price.validFrom}〜`
                                          : "適用日未記載"}
                                      </small>
                                    </td>
                                    <td className="amount">
                                      {price.amount === null
                                        ? "要確認"
                                        : `¥${yen.format(price.amount)}`}
                                      <small>
                                        {unitLabels[price.unit] ?? price.unit} ·{" "}
                                        {taxLabels[price.taxStatus] ??
                                          price.taxStatus}
                                      </small>
                                    </td>
                                    <td>
                                      {price.basis}
                                      <small>
                                        {useCaseLabels[price.useCase] ??
                                          price.useCase}{" "}
                                        · {price.dayType} / {price.timeBand}
                                      </small>
                                    </td>
                                    <td>{price.exclusions || "記載なし"}</td>
                                  </tr>
                                ))}
                                {venue.budgetScenarios.map((scenario) => (
                                  <tr key={scenario.id}>
                                    <td>
                                      区分合計の参考額
                                      <small>
                                        {scenario.validFrom
                                          ? `${scenario.validFrom}〜`
                                          : "適用日未記載"}
                                      </small>
                                    </td>
                                    <td className="amount">
                                      {scenario.amount === null
                                        ? "要確認"
                                        : `¥${yen.format(scenario.amount)}`}
                                      <small>
                                        /構成例 ·{" "}
                                        {taxLabels[scenario.taxStatus] ??
                                          scenario.taxStatus}
                                      </small>
                                    </td>
                                    <td>
                                      {scenario.label}
                                      <small>
                                        {scenario.dayType} / {scenario.timeSpan}
                                        {" · "}
                                        {scenario.componentPriceIds
                                          .map(
                                            (id, index) =>
                                              `${id}×${scenario.componentQuantities[index]}`,
                                          )
                                          .join(" + ")}
                                      </small>
                                    </td>
                                    <td>
                                      {scenario.exclusions || "記載なし"}
                                      <small>{scenario.note}</small>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {venue.operation && (
                          <div className="operation-grid">
                            <div>
                              <span>駅・徒歩</span>
                              <strong>
                                {venue.operation.station ?? "要確認"}
                                {venue.operation.walkMinutes !== null
                                  ? `　約${venue.operation.walkMinutes}分`
                                  : ""}
                              </strong>
                            </div>
                            <div>
                              <span>空港・広域交通</span>
                              <strong>
                                {venue.operation.airportAccess ?? "要確認"}
                              </strong>
                            </div>
                            <div>
                              <span>駐車</span>
                              <strong>
                                {venue.operation.parkingSpaces !== null
                                  ? `${yen.format(venue.operation.parkingSpaces)}台`
                                  : "要確認"}
                              </strong>
                            </div>
                            <div>
                              <span>予約開始</span>
                              <strong>
                                {venue.operation.bookingOpenMonths !== null
                                  ? `${venue.operation.bookingOpenMonths}か月前`
                                  : "区画・用途別に要確認"}
                              </strong>
                            </div>
                            <div>
                              <span>搬入</span>
                              <strong>
                                {venue.operation.loadingAccess ?? "要確認"}
                              </strong>
                            </div>
                            <div>
                              <span>通信</span>
                              <strong>
                                {venue.operation.networkPolicy ?? "要確認"}
                              </strong>
                            </div>
                          </div>
                        )}
                      </details>
                    )}
                  </div>
                </article>
              ))}
              {results.length > 40 && (
                <button
                  className="venue-more"
                  onClick={() => setShowAllVenues((current) => !current)}
                  type="button"
                >
                  {showAllVenues
                    ? "先頭40施設に戻す"
                    : `残り${results.length - 40}施設も表示`}
                </button>
              )}
            </div>
          ) : (
            <div className="empty">
              <h3>この条件では候補が出ませんでした</h3>
              <p>
                「未確認の施設も残す」をオンにするか、収容人数・天井高・予算の条件を少し広げてください。
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        className="archive-section"
        id="past-venues"
        aria-labelledby="archive-title"
      >
        <div className="archive-head">
          <div>
            <p className="eyebrow">HISTORICAL VENUE LEDGER</p>
            <h2 id="archive-title">過去会場台帳をたどる</h2>
            <p>
              候補の基準になったJJF・JYYF・世界大会・ディアボロ・けん玉大会を、系列、年、会場名から確認できます。
              開催実績と現在の貸出可否は別です。
            </p>
          </div>
          <div className="archive-total">
            <strong>{historicalResults.length}</strong>
            <span> / {venueData.stats.historical}記録</span>
          </div>
        </div>

        <div className="archive-controls">
          <label className="field">
            <span className="field-label">大会系列</span>
            <select
              value={historicalSeries}
              onChange={(event) => {
                setHistoricalSeries(
                  event.target.value as HistoricalSeries,
                );
                setShowAllHistorical(false);
              }}
            >
              <option value="all">すべて</option>
              <option value="JJF">JJF</option>
              <option value="JYYF_NATIONAL">JYYF 全国・前身</option>
              <option value="JYYF_REGIONAL">JYYF 地区</option>
              <option value="JYYF_JUNIOR">JYYF ジュニア</option>
              <option value="WYYC">世界大会</option>
              <option value="DIABOLO_AJDC">全日本ディアボロ</option>
              <option value="DIABOLO_OIDC">大阪国際ディアボロ</option>
              <option value="KENDAMA_KWC">けん玉ワールドカップ</option>
              <option value="KENDAMA_JKA_YOUTH">
                全日本少年少女けん玉
              </option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">開催年</span>
            <select
              value={historicalYear}
              onChange={(event) => {
                setHistoricalYear(event.target.value);
                setShowAllHistorical(false);
              }}
            >
              <option value="all">すべて</option>
              {historicalYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">会場名・都市</span>
            <input
              type="search"
              placeholder="例：アクリエひめじ、横浜、Orlando"
              value={historicalQuery}
              onChange={(event) => {
                setHistoricalQuery(event.target.value);
                setShowAllHistorical(false);
              }}
            />
          </label>
        </div>

        <div className="archive-table-wrap" aria-live="polite">
          <table className="archive-table">
            <thead>
              <tr>
                <th>年・系列</th>
                <th>地域</th>
                <th>会場</th>
                <th>状態</th>
                <th>根拠</th>
              </tr>
            </thead>
            <tbody>
              {visibleHistorical.map((event) => (
                <tr key={event.id}>
                  <td>
                    <strong>{event.year}</strong>
                    <small>
                      {historicalSeriesLabels[event.series] ?? event.series}
                    </small>
                  </td>
                  <td>
                    {event.prefectureOrState || event.country}
                    <small>{event.city || "都市未記載"}</small>
                  </td>
                  <td>
                    {event.venueNames || "正確な施設名は未確認"}
                    {event.note && <small>{event.note}</small>}
                  </td>
                  <td>
                    <span
                      className={`archive-status ${
                        event.verificationStatus === "verified"
                          ? ""
                          : "unverified"
                      }`}
                    >
                      {eventStatusLabels[event.eventStatus] ??
                        event.eventStatus}
                      ・
                      {event.verificationStatus === "verified"
                        ? "確認済み"
                        : "要確認"}
                    </span>
                  </td>
                  <td>
                    <a
                      href={event.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      出典 ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {historicalResults.length === 0 && (
            <div className="archive-empty">一致する過去会場はありません。</div>
          )}
        </div>

        {historicalResults.length > 24 && (
          <button
            className="archive-more"
            type="button"
            onClick={() => setShowAllHistorical((current) => !current)}
          >
            {showAllHistorical
              ? "先頭24件に戻す"
              : `残り${historicalResults.length - 24}件も表示`}
          </button>
        )}
      </section>

      <section
        className="archive-section"
        id="small-theater-ledger"
        aria-labelledby="small-theater-ledger-title"
      >
        <div className="archive-head">
          <div>
            <p className="eyebrow">SMALL THEATER RESEARCH LEDGER</p>
            <h2 id="small-theater-ledger-title">小劇場台帳から探す</h2>
            <p>
              594件を候補発見情報と公式確認情報に分けて検索します。客席数・面積・料金・アクセス・利用条件は、公式URLがある行だけに表示します。
              索引に載っていても、現行性や公式情報を確認できない行は、その状態のまま残します。
            </p>
          </div>
          <div className="archive-total">
            <strong>
              {smallTheaterLoadState === "ready"
                ? smallTheaterResults.length
                : "—"}
            </strong>
            <span> / {venueData.stats.smallTheaterCensus.total}件</span>
          </div>
        </div>

        <div className="archive-controls">
          <label className="field">
            <span className="field-label">索引上の都道府県</span>
            <select
              value={smallTheaterPrefecture}
              onChange={(event) => {
                setSmallTheaterPrefecture(event.target.value);
                setShowAllSmallTheaters(false);
              }}
            >
              <option value="全国">全国</option>
              {smallTheaterPrefectures.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">確認状態</span>
            <select
              value={smallTheaterStatus}
              onChange={(event) => {
                setSmallTheaterStatus(event.target.value);
                setShowAllSmallTheaters(false);
              }}
            >
              <option value="all">すべて</option>
              {Object.entries(smallTheaterVerificationLabels).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>
          <label className="field">
            <span className="field-label">公式確認済みの最低客席数</span>
            <input
              min="0"
              placeholder="例：80"
              type="number"
              value={smallTheaterCapacity || ""}
              onChange={(event) => {
                setSmallTheaterCapacity(Number(event.target.value) || 0);
                setShowAllSmallTheaters(false);
              }}
            />
          </label>
          <label className="field">
            <span className="field-label">劇場名・メモ</span>
            <input
              type="search"
              placeholder="例：ブラックボックス、横浜、ダンス"
              value={smallTheaterQuery}
              onChange={(event) => {
                setSmallTheaterQuery(event.target.value);
                setShowAllSmallTheaters(false);
              }}
            />
          </label>
        </div>

        <div className="archive-table-wrap" aria-live="polite">
          <table className="archive-table">
            <thead>
              <tr>
                <th>劇場</th>
                <th>索引上の地域</th>
                <th>公式確認済みの規模</th>
                <th>確認状態</th>
                <th>一次情報</th>
              </tr>
            </thead>
            <tbody>
              {visibleSmallTheaters.map((theater) => {
                const verificationLabel =
                  smallTheaterVerificationLabels[theater.verificationStatus] ??
                  theater.verificationStatus;
                const officialStatusLabel = theater.officialStatus
                  ? (smallTheaterOfficialStatusLabels[theater.officialStatus] ??
                    theater.officialStatus)
                  : null;
                return (
                  <tr key={theater.id}>
                    <td>
                      <strong>{theater.officialName ?? theater.indexName}</strong>
                      {theater.officialName &&
                        theater.officialName !== theater.indexName && (
                          <small>索引名：{theater.indexName}</small>
                        )}
                      {theater.observedAt && (
                        <small className={`observation-date ${observationAge(theater.observedAt)}`}>
                          公式確認日：{theater.observedAt}
                          {observationAge(theater.observedAt) === "stale"
                            ? "・再確認推奨"
                            : ""}
                        </small>
                      )}
                    </td>
                    <td>{theater.indexedPrefecture ?? "索引記載なし"}</td>
                    <td>
                      <strong>{numberLabel(theater.capacity, "席")}</strong>
                      <small>面積：{numberLabel(theater.area, "㎡")}</small>
                    </td>
                    <td>
                      <span
                        className={`archive-status ${
                          theater.verificationStatus === "verified_primary"
                            ? ""
                            : "unverified"
                        }`}
                      >
                        {verificationLabel}
                      </span>
                      {officialStatusLabel && <small>{officialStatusLabel}</small>}
                    </td>
                    <td>
                      {theater.officialUrl ? (
                        <a
                          href={theater.officialUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          公式 ↗
                        </a>
                      ) : (
                        <span>公式URL未確認</span>
                      )}
                      {theater.priceUrl && (
                        <small>
                          <a href={theater.priceUrl} rel="noreferrer" target="_blank">
                            料金 ↗
                          </a>
                        </small>
                      )}
                      {theater.accessUrl && (
                        <small>
                          <a href={theater.accessUrl} rel="noreferrer" target="_blank">
                            アクセス ↗
                          </a>
                        </small>
                      )}
                      {theater.conditionsUrl && (
                        <small>
                          <a
                            href={theater.conditionsUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            利用条件 ↗
                          </a>
                        </small>
                      )}
                      <small>
                        <a href={theater.indexUrl} rel="noreferrer" target="_blank">
                          索引 ↗
                        </a>
                      </small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {smallTheaterLoadState === "loading" && (
            <div className="archive-empty">台帳を読み込んでいます。</div>
          )}
          {smallTheaterLoadState === "failed" && (
            <div className="archive-empty">
              台帳を読み込めませんでした。<a href={smallTheaterCsvUrl}>CSVを直接開く</a>
            </div>
          )}
          {smallTheaterLoadState === "ready" &&
            smallTheaterResults.length === 0 && (
            <div className="archive-empty">一致する小劇場はありません。</div>
          )}
        </div>

        {smallTheaterLoadState === "ready" &&
          smallTheaterResults.length > 40 && (
          <button
            className="archive-more"
            type="button"
            onClick={() => setShowAllSmallTheaters((current) => !current)}
          >
            {showAllSmallTheaters
              ? "先頭40件に戻す"
              : `残り${smallTheaterResults.length - 40}件も表示`}
          </button>
        )}
      </section>

      <section className="updates-section" id="updates" aria-labelledby="updates-title">
        <div className="updates-copy">
          <p className="eyebrow">PUBLICATION NOTES</p>
          <h2 id="updates-title">更新と訂正</h2>
          <p>
            公開情報は観測時点の記録です。料金改定、改称、閉館、施設条件の変更を見つけた場合は、
            その内容が確認できる公式ページと一緒に訂正候補を送れます。
          </p>
          <div className="updates-actions">
            <a href={publication.correctionUrl} rel="noreferrer" target="_blank">
              訂正候補を送る ↗
            </a>
            <a href={publication.repositoryUrl} rel="noreferrer" target="_blank">
              調査データを見る ↗
            </a>
          </div>
          <small>
            送信先はGitHub Issuesです。氏名・電話番号などの個人情報は記載せず、公開済みの一次情報URLを添えてください。
          </small>
        </div>
        <ol className="changelog" aria-label="更新履歴">
          {publication.changelog.map((entry) => (
            <li key={entry.date}>
              <time dateTime={entry.date}>{displayDate(entry.date)}</time>
              <div>
                <strong>{entry.title}</strong>
                <p>{entry.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="method-note"
        id="method"
        aria-label="検索結果の読み方"
      >
        <div className="method-inner">
          <div className="method-item">
            <strong>01　0円にしない</strong>
            <p>
              未公開の冷暖房・警備・清掃・設営費は、無料ではなく未確認として残しています。
            </p>
          </div>
          <div className="method-item">
            <strong>02　点数で隠さない</strong>
            <p>
              条件一致、要問い合わせ、条件外を分け、総合点だけで候補を落としません。
            </p>
          </div>
          <div className="method-item">
            <strong>03　会場セットで考える</strong>
            <p>
              JJF型では練習空間と舞台空間が別施設になる場合もあるため、将来は徒歩圏の組合せも検索します。
            </p>
          </div>
          <div className="method-item">
            <strong>04　候補発見と確認を分ける</strong>
            <p>
              LaSens等の索引で小劇場を見つけ、面積・客席・料金は各劇場や運営団体の公式情報へ戻って確認します。
              現在の594件の確認台帳は、CSVとして公開しています。
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>会場ものさし — {publication.edition}</span>
          <span>
            開催可否、空き状況、正式見積は各施設への確認が必要です
          </span>
        </div>
      </footer>
      </div>
    </main>
  );
}
