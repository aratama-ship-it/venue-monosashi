"use client";

import { useMemo, useState } from "react";
import { venueData } from "./generated-data";

type Preset =
  | "all"
  | "jjf"
  | "jyyf"
  | "wyyc"
  | "diabolo"
  | "kendama"
  | "small_theater";
type SortKey =
  | "evidence"
  | "price"
  | "capacity"
  | "capacity_small"
  | "area"
  | "booking";
type VenueType = "all" | "small_theater";
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

const presets: Record<
  Preset,
  {
    label: string;
    capacityMin: number;
    capacityMax: number;
    ceiling: number;
    venueType: VenueType;
    priceUse: PriceUse;
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
    description: "全国候補を広く見る",
  },
  jjf: {
    label: "JJF型",
    capacityMin: 650,
    capacityMax: 0,
    ceiling: 8,
    venueType: "all",
    priceUse: "any",
    description: "練習空間＋舞台",
  },
  jyyf: {
    label: "国内ヨーヨー型",
    capacityMin: 600,
    capacityMax: 0,
    ceiling: 4,
    venueType: "all",
    priceUse: "any",
    description: "舞台・客席・物販",
  },
  wyyc: {
    label: "世界大会型",
    capacityMin: 1000,
    capacityMax: 0,
    ceiling: 7,
    venueType: "all",
    priceUse: "any",
    description: "配信・会議・宿泊",
  },
  diabolo: {
    label: "ディアボロ型",
    capacityMin: 300,
    capacityMax: 0,
    ceiling: 4,
    venueType: "all",
    priceUse: "any",
    description: "AJDC・OIDC実績",
  },
  kendama: {
    label: "けん玉大会型",
    capacityMin: 100,
    capacityMax: 0,
    ceiling: 3,
    venueType: "all",
    priceUse: "any",
    description: "KWC・全日本実績",
  },
  small_theater: {
    label: "小劇場型",
    capacityMin: 0,
    capacityMax: 150,
    ceiling: 0,
    venueType: "small_theater",
    priceUse: "performance",
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

  function choosePreset(next: Preset) {
    setPreset(next);
    setCapacity(presets[next].capacityMin);
    setCapacityMax(presets[next].capacityMax);
    setCeiling(presets[next].ceiling);
    setVenueType(presets[next].venueType);
    setPriceUse(presets[next].priceUse);
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
            <a href="#method">
              <span aria-hidden="true">↳</span>
              読み方
            </a>
          </nav>
        </div>

        <div className="rail-foot">
          <p>
            <span>DATA EDITION</span>
            全国調査版 0.1
          </p>
          <p>
            <span>OBSERVED</span>
            2026.07.30
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
              <span className="edition">全国調査版 0.1</span>
            </div>
            <div className="masthead-note">
              一次情報観測日 2026.07.30
              <br />
              空き状況・見積は未確認
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
              </div>
            </aside>
          </div>
        </section>

        <div className="measure" aria-hidden="true" />

      <section className="workspace" id="search" aria-label="会場検索">
        <aside className="filters">
          <h2>条件を置く</h2>
          <p className="filter-caption">
            数値が未公開の施設を残すかどうかで、検索の厳しさを変えられます。
          </p>

          <div className="filter-body">
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
            </div>
          </div>

          {results.length ? (
            <div className="venue-list">
              {results.map((venue, index) => (
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
                      <span className="fit-mark">基準 {venue.fitLevel}</span>
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
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>会場ものさし — 全国公開調査版</span>
          <span>
            開催可否、空き状況、正式見積は各施設への確認が必要です
          </span>
        </div>
      </footer>
      </div>
    </main>
  );
}
