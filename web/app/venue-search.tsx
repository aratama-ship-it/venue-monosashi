"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { venueData } from "./generated-data";
import { publication } from "./publication";

type SortKey =
  | "evidence"
  | "capacity"
  | "capacity_small"
  | "area"
  | "booking";
type VenueRole =
  | "event_space"
  | "stage"
  | "sports"
  | "meeting"
  | "exhibition"
  | "lodging";
type VenueRoleSource = {
  category: string;
  spaces: ReadonlyArray<{
    type: string;
    stageType: string;
  }>;
};
type VenueSpace = (typeof venueData.venues)[number]["spaces"][number];
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
const smallTheaterCsvUrl = `/data/${venueData.stats.smallTheaterCensus.assets.csv}`;
const smallTheaterLedgerUrl = `/data/${venueData.stats.smallTheaterCensus.assets.ledger}`;

const venueRoles: ReadonlyArray<{ id: VenueRole; label: string }> = [
  { id: "event_space", label: "イベントスペース" },
  { id: "stage", label: "舞台" },
  { id: "sports", label: "スポーツ" },
  { id: "meeting", label: "会議・研修" },
  { id: "exhibition", label: "展示" },
  { id: "lodging", label: "宿泊" },
];

const validVenueRoles = new Set<VenueRole>(venueRoles.map((role) => role.id));

function venueRoleLabel(roleId: VenueRole) {
  return venueRoles.find((role) => role.id === roleId)?.label ?? roleId;
}

function rolesForVenue(venue: VenueRoleSource): VenueRole[] {
  const categoryParts = new Set(venue.category.split("_"));
  const spaceTypes = new Set(venue.spaces.map((space) => space.type));
  const hasCategory = (...parts: string[]) =>
    parts.some((part) => categoryParts.has(part));
  const hasSpace = (...types: string[]) =>
    types.some((type) => spaceTypes.has(type));
  const roles: VenueRole[] = [];

  if (
    hasCategory(
      "event",
      "convention",
      "mice",
      "multipurpose",
      "flat",
      "commercial",
    ) ||
    hasSpace(
      "event_hall",
      "event_space",
      "convention_hall",
      "flat_hall",
      "multipurpose_hall",
      "multipurpose_room",
      "transformable_hall",
    )
  ) {
    roles.push("event_space");
  }
  if (
    hasCategory("stage", "theater", "culture") ||
    hasSpace("stage", "stage_hall", "theater", "black_box") ||
    venue.spaces.some(
      (space) => !["none", "unknown"].includes(space.stageType),
    )
  ) {
    roles.push("stage");
  }
  if (
    hasCategory("sports", "arena", "competition") ||
    hasSpace(
      "arena",
      "dojo",
      "ice_rink",
      "pool",
      "sports_court",
      "sports_program",
      "training_room",
    )
  ) {
    roles.push("sports");
  }
  if (
    hasCategory("conference", "meetings", "learning") ||
    hasSpace("conference", "meeting_room")
  ) {
    roles.push("meeting");
  }
  if (
    hasCategory("exhibition", "gallery") ||
    hasSpace("exhibition")
  ) {
    roles.push("exhibition");
  }
  if (hasCategory("lodging", "resort", "onsite")) {
    roles.push("lodging");
  }

  return roles;
}

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

const largeVehicleLabels: Record<string, string> = {
  yes: "可",
  conditional: "条件付き",
  no: "不可",
  unknown: "要確認",
};

const spaceTypeLabels: Record<string, string> = {
  arena: "アリーナ",
  conference: "会議室",
  exhibition: "展示場",
  flat_hall: "平土間",
  meeting_room: "会議室",
  multipurpose_hall: "多目的ホール",
  practice_room: "練習室・スタジオ",
  stage_hall: "舞台・ホール",
  theater: "劇場",
};

const ceilingTypeLabels: Record<string, string> = {
  minimum_clear: "最低有効高",
  published_clear: "公表天井高",
  range_minimum: "高さ範囲の下限",
  highest_point: "最高部（検索対象外）",
  stage_opening: "舞台開口高（検索対象外）",
  stage_clearance: "舞台高さ（検索対象外）",
  nominal_review: "参考値（精査中）",
  unknown: "高さ未確認",
};

function spaceCapacityLabel(space: VenueSpace) {
  if (space.capacityTheater !== null && space.capacityFixed !== null) {
    if (space.capacityTheater === space.capacityFixed) {
      return `${yen.format(space.capacityTheater)}席`;
    }
    return `最大${yen.format(space.capacityTheater)}席・固定${yen.format(space.capacityFixed)}席`;
  }
  if (space.capacityTheater !== null) return `最大${yen.format(space.capacityTheater)}席`;
  if (space.capacityFixed !== null) return `固定${yen.format(space.capacityFixed)}席`;
  return "未確認";
}

function spaceHeightLabel(space: VenueSpace) {
  if (space.ceiling !== null) {
    return {
      value: `${space.ceiling}m`,
      kind: ceilingTypeLabels[space.ceilingType] ?? "検索対象の確認済み高さ",
    };
  }
  if (space.ceilingReference !== null) {
    return {
      value: `${space.ceilingReference}m`,
      kind: ceilingTypeLabels[space.ceilingType] ?? "参考値（検索対象外）",
    };
  }
  return { value: "未確認", kind: "公式資料または施設への確認が必要" };
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

function regionGroupLabel(region: string) {
  if (["甲信越", "北陸", "東海", "中部"].includes(region)) return "中部";
  if (["九州", "沖縄", "九州・沖縄"].includes(region)) return "九州・沖縄";
  return region;
}

export function VenueSearch() {
  const [selectedVenueRoles, setSelectedVenueRoles] = useState<VenueRole[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [capacityMax, setCapacityMax] = useState(0);
  const [area, setArea] = useState(0);
  const [ceiling, setCeiling] = useState(0);
  const [fixedStage, setFixedStage] = useState(false);
  const [practice, setPractice] = useState(false);
  const [largeVehicleOnly, setLargeVehicleOnly] = useState(false);
  const [historicalOnly, setHistoricalOnly] = useState(false);
  const [keepUnknown, setKeepUnknown] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("evidence");
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [smallTheaterPrefecture, setSmallTheaterPrefecture] = useState("全国");
  const [smallTheaterStatus, setSmallTheaterStatus] = useState("all");
  const [smallTheaterQuery, setSmallTheaterQuery] = useState("");
  const [smallTheaterCapacity, setSmallTheaterCapacity] = useState(0);
  const [showAllSmallTheaters, setShowAllSmallTheaters] = useState(false);
  const [smallTheaters, setSmallTheaters] = useState<SmallTheaterLedgerItem[]>([]);
  const [selectedVenueIds, setSelectedVenueIds] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [urlReady, setUrlReady] = useState(false);
  const regionTriggerRef = useRef<HTMLButtonElement>(null);
  const regionCloseRef = useRef<HTMLButtonElement>(null);
  const [smallTheaterLoadState, setSmallTheaterLoadState] = useState<
    "loading" | "ready" | "failed"
  >("loading");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const nextVenueRoles = (params.get("roles") ?? "")
        .split(",")
        .filter((role): role is VenueRole =>
          validVenueRoles.has(role as VenueRole),
        );
      if (
        nextVenueRoles.length === 0 &&
        (params.get("preset") === "small_theater" ||
          params.get("type") === "small_theater")
      ) {
        nextVenueRoles.push("event_space", "stage");
      }
      if (
        nextVenueRoles.length === 0 &&
        params.get("preset") === "gymnasium"
      ) {
        nextVenueRoles.push("sports");
      }
      const validPrefectures = new Set(
        venueData.venues.map((venue) => venue.prefecture),
      );
      const nextPrefectures = (params.get("prefectures") ?? "")
        .split(",")
        .filter((prefecture) => validPrefectures.has(prefecture));
      const legacyPrefecture = params.get("prefecture");
      const legacyRegion = params.get("region");
      if (
        nextPrefectures.length === 0 &&
        legacyPrefecture &&
        legacyPrefecture !== "全国" &&
        validPrefectures.has(legacyPrefecture)
      ) {
        nextPrefectures.push(legacyPrefecture);
      } else if (
        nextPrefectures.length === 0 &&
        legacyRegion &&
        legacyRegion !== "全国"
      ) {
        nextPrefectures.push(
          ...Array.from(
            new Set(
              venueData.venues
                .filter((venue) => venue.region === legacyRegion)
                .map((venue) => venue.prefecture),
            ),
          ),
        );
      }
      const sortParam = params.get("sort") as SortKey | null;

      setSelectedVenueRoles(nextVenueRoles);
      setSelectedPrefectures(Array.from(new Set(nextPrefectures)));
      setKeyword(params.get("q") ?? "");
      setCapacity(numberParam(params, "min", 5000));
      setCapacityMax(numberParam(params, "max", 20000));
      setArea(numberParam(params, "area", 10000));
      setCeiling(numberParam(params, "ceiling", 100));
      setFixedStage(params.get("fixed") === "1");
      setPractice(params.get("practice") === "1");
      setLargeVehicleOnly(params.get("loading") === "1");
      setHistoricalOnly(params.get("history") === "1");
      setKeepUnknown(params.get("unknown") === "1");
      setSortKey(
        sortParam &&
          [
            "evidence",
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

  useEffect(() => {
    if (!regionModalOpen) return;
    const regionTrigger = regionTriggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      regionCloseRef.current?.focus();
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRegionModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      regionTrigger?.focus();
    };
  }, [regionModalOpen]);

  const prefectureGroups = useMemo(() => {
    const groupOrder = [
      "北海道",
      "東北",
      "関東",
      "中部",
      "近畿",
      "中国",
      "四国",
      "九州・沖縄",
    ];
    const groups = new Map<string, Set<string>>();
    venueData.venues.forEach((venue) => {
      const group = regionGroupLabel(venue.region);
      if (!groups.has(group)) groups.set(group, new Set());
      groups.get(group)?.add(venue.prefecture);
    });
    return Array.from(groups, ([region, prefectures]) => ({
      region,
      prefectures: Array.from(prefectures).sort((a, b) =>
        a.localeCompare(b, "ja"),
      ),
    })).sort(
      (a, b) => groupOrder.indexOf(a.region) - groupOrder.indexOf(b.region),
    );
  }, []);
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
    const searchTerms = keyword
      .trim()
      .toLocaleLowerCase("ja")
      .split(/\s+/)
      .filter(Boolean);
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
          if (ceiling > 0 && space.ceiling !== null && space.ceiling < ceiling) {
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
              (!hasSpaceCondition || matchingSpaceIds.has(price.spaceId)),
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
        const compatiblePrices = compatibleDailyPrices.sort(
          (a, b) => a.amount - b.amount,
        );
        return {
          ...venue,
          spaceKnownMatch:
            !hasSpaceCondition ||
            matchingSpaces.length > 0 ||
            (venue.spaces.length === 0 && keepUnknown),
          searchPrice: compatiblePrices[0]?.amount ?? null,
          searchPriceKind: compatiblePrices[0]?.kind ?? null,
        };
      })
      .filter(
        (venue) =>
          selectedPrefectures.length === 0 ||
          selectedPrefectures.includes(venue.prefecture),
      )
      .filter((venue) => {
        const venueRoleSet = new Set(rolesForVenue(venue));
        return selectedVenueRoles.every((role) => venueRoleSet.has(role));
      })
      .filter((venue) => {
        if (searchTerms.length === 0) return true;
        const searchableText = [
          venue.name,
          venue.region,
          venue.city,
          venue.prefecture,
          venue.strengths,
          venue.cautions,
          venue.bestSpace?.name ?? "",
          ...venue.spaces.map((space) => space.name),
        ]
          .join(" ")
          .toLocaleLowerCase("ja");
        return searchTerms.every((term) => searchableText.includes(term));
      })
      .filter((venue) => venue.spaceKnownMatch)
      .filter((venue) => {
        if (!largeVehicleOnly) return true;
        const access = venue.operation?.largeVehicleAccess;
        if (!access || access === "unknown") return keepUnknown;
        return access === "yes" || access === "conditional";
      })
      .filter((venue) => {
        if (!historicalOnly) return true;
        return venue.historicalCompletedCount > 0;
      })
      .sort((a, b) => {
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
    capacity,
    capacityMax,
    ceiling,
    fixedStage,
    historicalOnly,
    keepUnknown,
    keyword,
    largeVehicleOnly,
    practice,
    selectedPrefectures,
    selectedVenueRoles,
    sortKey,
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
    if (selectedVenueRoles.length) {
      params.set("roles", selectedVenueRoles.join(","));
    }
    if (selectedPrefectures.length) {
      params.set("prefectures", selectedPrefectures.join(","));
    }
    if (keyword.trim()) params.set("q", keyword.trim());
    if (capacity > 0) params.set("min", String(capacity));
    if (capacityMax > 0) params.set("max", String(capacityMax));
    if (area > 0) params.set("area", String(area));
    if (ceiling > 0) params.set("ceiling", String(ceiling));
    if (fixedStage) params.set("fixed", "1");
    if (practice) params.set("practice", "1");
    if (largeVehicleOnly) params.set("loading", "1");
    if (historicalOnly) params.set("history", "1");
    if (keepUnknown) params.set("unknown", "1");
    if (sortKey !== "evidence") params.set("sort", sortKey);
    if (selectedVenueIds.length) {
      params.set("compare", selectedVenueIds.join(","));
    }
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [
    area,
    capacity,
    capacityMax,
    ceiling,
    fixedStage,
    historicalOnly,
    keepUnknown,
    keyword,
    largeVehicleOnly,
    practice,
    selectedPrefectures,
    selectedVenueRoles,
    selectedVenueIds,
    sortKey,
    urlReady,
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

  function toggleVenueRole(role: VenueRole) {
    setSelectedVenueRoles((current) =>
      current.includes(role)
        ? current.filter((item) => item !== role)
        : [...current, role],
    );
  }

  function togglePrefecture(prefecture: string) {
    setSelectedPrefectures((current) =>
      current.includes(prefecture)
        ? current.filter((item) => item !== prefecture)
        : [...current, prefecture],
    );
  }

  function reset() {
    setSelectedVenueRoles([]);
    setSelectedPrefectures([]);
    setKeyword("");
    setCapacity(0);
    setCapacityMax(0);
    setArea(0);
    setCeiling(0);
    setFixedStage(false);
    setPractice(false);
    setLargeVehicleOnly(false);
    setHistoricalOnly(false);
    setKeepUnknown(false);
    setSortKey("evidence");
  }

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#search">
        検索条件へ移動
      </a>

      <header className="site-header site-rail" aria-label="サイト案内">
        <div className="site-header-main">
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

        <a className="rail-action" href="#search">
          候補を測りはじめる
          <span aria-hidden="true">↘</span>
        </a>
      </header>

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
              <span className="hero-title-primary">会場を、名前でなく</span>
              <span className="hero-title-accent">条件で測る。</span>
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
              イベント会場候補を地域・面積・天井・客席・予算・搬入・アクセスで見比べます。
              150席以下の小劇場も、平土間・公演料金・利用条件から探せます。
            </p>
          </div>
        </section>

        <div className="measure" aria-hidden="true" />

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
            <div className="field venue-role-field">
              <span className="field-label">
                会場の型
                <output>
                  {selectedVenueRoles.length
                    ? `${selectedVenueRoles.length}件選択`
                    : "指定なし"}
                </output>
              </span>
              <p className="field-help">
                複数選択できます。選んだ型をすべて持つ会場を表示します。
              </p>
              <div
                aria-label="会場の型（複数選択）"
                className="venue-role-tags"
                role="group"
              >
                {venueRoles.map((role) => (
                  <button
                    aria-pressed={selectedVenueRoles.includes(role.id)}
                    className="venue-role-tag"
                    data-active={selectedVenueRoles.includes(role.id)}
                    key={role.id}
                    onClick={() => toggleVenueRole(role.id)}
                    type="button"
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field prefecture-field">
              <span className="field-label">
                地域
                <output>
                  {selectedPrefectures.length
                    ? `${selectedPrefectures.length}件選択`
                    : "全国"}
                </output>
              </span>
              <p className="field-help">
                都道府県を複数選び、いずれかにある会場を表示します（OR検索）。
              </p>
              <button
                aria-controls="region-filter-dialog"
                aria-expanded={regionModalOpen}
                aria-haspopup="dialog"
                className="region-modal-trigger"
                onClick={() => setRegionModalOpen(true)}
                ref={regionTriggerRef}
                type="button"
              >
                <span>地域を選ぶ</span>
                <strong>
                  {selectedPrefectures.length
                    ? `${selectedPrefectures.length}件選択`
                    : "全国"}
                </strong>
              </button>
              {selectedPrefectures.length > 0 && (
                <div
                  aria-label="選択中の地域"
                  className="selected-prefecture-summary"
                >
                  {selectedPrefectures.slice(0, 3).map((prefecture) => (
                    <span key={prefecture}>{prefecture}</span>
                  ))}
                  {selectedPrefectures.length > 3 && (
                    <span>ほか{selectedPrefectures.length - 3}件</span>
                  )}
                </div>
              )}
            </div>

            <label className="field free-search-field">
              <span className="field-label">フリー検索</span>
              <span className="field-help">
                会場名・地域・特徴・貸出区画を横断します。空白区切りで複数語を指定できます。
              </span>
              <input
                type="search"
                placeholder="例：東京 平土間、駅直結、配信"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>

            <section className="filter-section" aria-labelledby="venue-size-filter-title">
              <div className="filter-section-head">
                <h3 id="venue-size-filter-title">会場規模</h3>
                <span>
                  面積 {venueData.stats.candidateCoverage.area} / {venueData.stats.venues}会場
                  <br />
                  収容 {venueData.stats.candidateCoverage.capacity} / {venueData.stats.venues}会場
                  <br />
                  天井下限 {venueData.stats.candidateCoverage.ceiling} / {venueData.stats.venues}会場
                </span>
              </div>
              <p className="filter-section-copy">
                公開値がある貸出区画を、面積・収容人数・確認済みの天井下限で照合します。
              </p>

              <label className="field compact-field">
                <span className="field-label">必要な面積</span>
                <span className="unit-input">
                  <input
                    aria-label="最低面積"
                    inputMode="numeric"
                    max="10000"
                    min="0"
                    placeholder="指定なし"
                    step="100"
                    type="number"
                    value={area || ""}
                    onChange={(event) =>
                      setArea(Math.max(0, Number(event.target.value) || 0))
                    }
                  />
                  <span>㎡以上</span>
                </span>
              </label>

              <fieldset className="field capacity-range">
                <legend className="field-label">収容人数</legend>
                <div className="capacity-range-grid">
                  <label>
                    <span>下限</span>
                    <span className="unit-input">
                      <input
                        aria-label="収容人数の下限"
                        inputMode="numeric"
                        max="20000"
                        min="0"
                        placeholder="指定なし"
                        step="50"
                        type="number"
                        value={capacity || ""}
                        onChange={(event) => {
                          const next = Math.max(
                            0,
                            Number(event.target.value) || 0,
                          );
                          setCapacity(next);
                          if (capacityMax > 0 && next > capacityMax) {
                            setCapacityMax(next);
                          }
                        }}
                      />
                      <span>人以上</span>
                    </span>
                  </label>
                  <label>
                    <span>上限</span>
                    <span className="unit-input">
                      <input
                        aria-label="収容人数の上限"
                        inputMode="numeric"
                        max="20000"
                        min="0"
                        placeholder="指定なし"
                        step="50"
                        type="number"
                        value={capacityMax || ""}
                        onChange={(event) => {
                          const next = Math.max(
                            0,
                            Number(event.target.value) || 0,
                          );
                          setCapacityMax(next);
                          if (next > 0 && capacity > next) {
                            setCapacity(next);
                          }
                        }}
                      />
                      <span>人以下</span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <label className="field compact-field">
                <span className="field-label">確認済み天井高の下限</span>
                <span className="field-help">
                  公式情報から下限・有効高・単一の公表高と判断できた
                  {venueData.stats.spaceCoverage.ceiling}区画のみ検索します。最高部・中央高・舞台開口は除外しています。
                </span>
                <span className="unit-input">
                  <input
                    aria-label="確認済み天井高の下限"
                    inputMode="decimal"
                    max="100"
                    min="0"
                    placeholder="指定なし"
                    step="0.5"
                    type="number"
                    value={ceiling || ""}
                    onChange={(event) =>
                      setCeiling(Math.max(0, Number(event.target.value) || 0))
                    }
                  />
                  <span>m以上</span>
                </span>
              </label>

              <p className="filter-precision-note">
                面積・収容人数・天井下限・舞台条件は、同じ貸出区画で判定します。
              </p>

              <label className="check-field unknown-policy">
                <input
                  checked={keepUnknown}
                  onChange={(event) => setKeepUnknown(event.target.checked)}
                  type="checkbox"
                />
                <span>
                  未確認の会場も候補に残す
                  <small>条件一致は未確認のため「要問い合わせ」と表示します。</small>
                </span>
              </label>
            </section>

            <details className="filter-advanced">
              <summary>
                設備・利用条件
                <span>4項目</span>
              </summary>
              <div className="filter-advanced-body">
                <label className="check-field">
                  <input
                    checked={fixedStage}
                    onChange={(event) => setFixedStage(event.target.checked)}
                    type="checkbox"
                  />
                  <span>固定舞台が確認できる</span>
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
                    checked={largeVehicleOnly}
                    onChange={(event) =>
                      setLargeVehicleOnly(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>大型車搬入が可能または条件付き</span>
                </label>

                <label className="check-field">
                  <input
                    checked={historicalOnly}
                    onChange={(event) => setHistoricalOnly(event.target.checked)}
                    type="checkbox"
                  />
                  <span>収録大会の開催実績と照合済み</span>
                </label>
              </div>
            </details>

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
                        <dt>最大確認済み天井下限</dt>
                        <dd>{numberLabel(venue.maxCeiling, "m")}</dd>
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
                          {venue.prefecture} {venue.city}
                        </p>
                        <ul
                          aria-label={`${venue.name}の会場の型`}
                          className="venue-category-tags"
                        >
                          {rolesForVenue(venue).map((role) => (
                            <li className="venue-category-tag" key={role}>
                              {venueRoleLabel(role)}
                            </li>
                          ))}
                        </ul>
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
                        <span className="metric-label">最大確認済み天井下限</span>
                        <span
                          className={`metric-value ${venue.maxCeiling === null ? "unknown" : ""}`}
                        >
                          {numberLabel(venue.maxCeiling, "m")}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">確認済み日額の最小値</span>
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
                        {venue.detailCount > 1 && (
                          <span className="status warn">数値は別区画を含む</span>
                        )}
                        {venue.maxCeiling === null && venue.ceilingReferenceCount > 0 && (
                          <span className="status warn">
                            天井参考値 {venue.ceilingReferenceCount}区画・意味を精査中
                          </span>
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

                    {venue.spaces.length > 0 && (
                      <details className="evidence-drawer space-drawer">
                        <summary>
                          <span>区画ごとの情報を見る</span>
                          <span className="drawer-count">
                            {venue.spaces.length}区画 / 天井検索対象
                            {venue.spaces.filter((space) => space.ceiling !== null).length}区画
                          </span>
                        </summary>
                        <div className="price-table-wrap">
                          <table className="price-table space-table">
                            <thead>
                              <tr>
                                <th>区画</th>
                                <th>面積</th>
                                <th>収容</th>
                                <th>高さ</th>
                                <th>補足・出典</th>
                              </tr>
                            </thead>
                            <tbody>
                              {venue.spaces.map((space) => {
                                const height = spaceHeightLabel(space);
                                return (
                                  <tr key={space.id}>
                                    <td>
                                      <strong>{space.name}</strong>
                                      <small>
                                        {spaceTypeLabels[space.type] ?? space.type}
                                      </small>
                                    </td>
                                    <td className="amount">
                                      {numberLabel(space.area, "㎡")}
                                    </td>
                                    <td>{spaceCapacityLabel(space)}</td>
                                    <td className="amount">
                                      {height.value}
                                      <small>{height.kind}</small>
                                    </td>
                                    <td>
                                      <small>{space.note ?? "補足情報なし"}</small>
                                      <small>
                                        <a href={space.sourceUrl} rel="noreferrer" target="_blank">
                                          区画の公式情報 ↗
                                        </a>
                                      </small>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </details>
                    )}

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
                「未確認の会場も候補に残す」をオンにするか、面積・収容人数の条件を少し広げてください。
              </p>
            </div>
          )}
        </div>
      </section>

      <details
        className="archive-section archive-disclosure"
        id="small-theater-ledger"
        aria-labelledby="small-theater-ledger-title"
      >
        <summary className="archive-summary">
          <span className="archive-summary-heading">
            <span className="eyebrow">SMALL THEATER RESEARCH LEDGER</span>
            <span
              aria-level={2}
              className="section-title archive-summary-title"
              id="small-theater-ledger-title"
              role="heading"
            >
              <span aria-hidden="true" className="section-title-index">03</span>
              <span>小劇場台帳から探す</span>
            </span>
          </span>
          <span aria-hidden="true" className="archive-summary-action">
            <span className="archive-summary-open">開く ＋</span>
            <span className="archive-summary-close">閉じる −</span>
          </span>
        </summary>

        <div className="archive-disclosure-content">
          <div className="archive-head archive-disclosure-intro">
            <p>
              594件を候補発見情報と公式確認情報に分けて検索します。客席数・面積・料金・アクセス・利用条件は、公式URLがある行だけに表示します。
              索引に載っていても、現行性や公式情報を確認できない行は、その状態のまま残します。
            </p>
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
        </div>
      </details>

      <section className="updates-section" id="updates" aria-labelledby="updates-title">
        <div className="updates-copy">
          <p className="eyebrow">PUBLICATION NOTES</p>
          <h2 className="section-title" id="updates-title">
            <span aria-hidden="true" className="section-title-index">04</span>
            <span>更新と訂正</span>
          </h2>
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

      {regionModalOpen && (
        <div
          className="region-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRegionModalOpen(false);
          }}
        >
          <section
            aria-labelledby="region-filter-title"
            aria-modal="true"
            className="region-modal"
            id="region-filter-dialog"
            role="dialog"
          >
            <header className="region-modal-head">
              <div>
                <p className="eyebrow">REGION FILTER</p>
                <h2 id="region-filter-title">地域を選ぶ</h2>
                <p>
                  複数選択はOR検索です。選んだ都道府県のいずれかにある会場を表示します。
                </p>
              </div>
              <button
                aria-label="地域選択を閉じる"
                className="region-modal-close"
                onClick={() => setRegionModalOpen(false)}
                ref={regionCloseRef}
                type="button"
              >
                ×
              </button>
            </header>

            <div className="region-modal-body">
              <button
                aria-pressed={selectedPrefectures.length === 0}
                className="prefecture-tag prefecture-all"
                data-active={selectedPrefectures.length === 0}
                onClick={() => setSelectedPrefectures([])}
                type="button"
              >
                全国
              </button>
              <div
                aria-label="地域（都道府県・複数選択）"
                className="prefecture-groups"
              >
                {prefectureGroups.map((group) => (
                  <div className="prefecture-group" key={group.region}>
                    <span className="prefecture-group-label">
                      {group.region}
                    </span>
                    <div
                      aria-label={`${group.region}の都道府県`}
                      className="prefecture-tags"
                      role="group"
                    >
                      {group.prefectures.map((prefecture) => (
                        <button
                          aria-pressed={selectedPrefectures.includes(prefecture)}
                          className="prefecture-tag"
                          data-active={selectedPrefectures.includes(prefecture)}
                          key={prefecture}
                          onClick={() => togglePrefecture(prefecture)}
                          type="button"
                        >
                          {prefecture}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <footer className="region-modal-actions">
              <button
                className="region-modal-clear"
                onClick={() => setSelectedPrefectures([])}
                type="button"
              >
                全国に戻す
              </button>
              <button
                className="region-modal-apply"
                onClick={() => setRegionModalOpen(false)}
                type="button"
              >
                選択を反映
              </button>
            </footer>
          </section>
        </div>
      )}

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
