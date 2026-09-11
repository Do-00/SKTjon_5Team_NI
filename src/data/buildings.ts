import { CURRENT_BUILDING_GRADE, GRADE_ORDER, type GradeCode } from "./grades";
import { decodeAddressId, decodeEstimateId, encodeAddressId, encodeEstimateId, type EstimateIdParts } from "../lib/address-id";
import {
  estimateReport,
  getApartmentDetail,
  matchAddress,
  searchApartments,
  SIZE_BUCKET_OPTIONS,
  toGradeCode,
  type ApartmentDetail,
  type MatchResult,
  type ReportEstimate,
  type SizeBucket,
} from "../lib/beec-client";

/**
 * Building fixtures for the Eco Check prototype: address search results and
 * the current user's saved buildings.
 */

/** Whether a building's `grade`/`primaryEnergyKwh` comes from an official certificate or an internal estimate. */
export type BuildingGradeSource = "certified" | "estimated";

export interface CertificationRecord {
  grade: GradeCode;
  /** Annual primary energy consumption at the time of this certification, in kWh/m²·yr. */
  primaryEnergyKwh: number;
  /** ISO 8601 date the certificate was issued. */
  certifiedAt: string;
  /** Certificate number, e.g. `"EEB-2026-014892"`. */
  certId: string;
  /** Issuing body, e.g. `"한국에너지공단"`. */
  issuer: string;
}

export interface BuildingSummary {
  id: string;
  name: string;
  address: string;
  grade: GradeCode;
  /** Straight-line distance in meters from the searched address. */
  distanceMeters: number;
  /** Whether `grade`/`primaryEnergyKwh` is from an official certificate or an internal estimate. */
  gradeSource: BuildingGradeSource;
  /** Annual primary energy consumption backing `grade`, in kWh/m²·yr (see `PRIMARY_ENERGY_UNIT` in `src/data/grades.ts`). */
  primaryEnergyKwh: number;
  /** Year the building received its use-approval (사용승인연도). */
  completionYear: number;
  /** Structural system, e.g. `"철근콘크리트구조"`. */
  structureType: string;
  /** Primary use classification, e.g. `"공동주택(아파트)"`. */
  useType: string;
  /** Insulation code the building was built/retrofitted to, e.g. `"2013년 단열기준(강화)"`. */
  insulationStandard: string;
  /** Gross floor area (연면적) in square meters. */
  areaSqm: number;
  /** Heating method, e.g. `"지역난방"` or `"개별가스보일러난방"`. */
  heatingType: string;
  /** Past official certifications, newest first. Empty when `gradeSource` is `"estimated"`. */
  certificationHistory: CertificationRecord[];
  /** What beec's `/api/match` actually returned, for live matches only (absent on fixtures). */
  liveMatch?: LiveMatchInfo;
  /** Set for an `/api/report` group estimate (`est-…` ids) — no single building, just a 용도·지역·규모 statistical stand-in. */
  estimate?: BuildingEstimateInfo;
  /** Set for an `/api/apt/{aptCode}` match (`apt-…` ids) — richer facts/measured/estimate than `/api/match` gives. */
  apartment?: ApartmentReportInfo;
  /**
   * beec's response exactly as it came back, for every beec-backed building
   * (absent on fixtures). The report's "추정 근거" card shows it unprocessed,
   * and the Gemini 리모델링 리포트 sends it as the building data.
   */
  rawSource?: BuildingRawSource;
}

/** Which beec endpoint a building came from, with that endpoint's untouched response. */
export type BuildingRawSource =
  | { kind: "apt"; data: ApartmentDetail }
  | { kind: "match"; data: MatchResult }
  | { kind: "report"; data: ReportEstimate };

/** Raw `/api/match` fields, so the report shows beec's values instead of the fixture-shaped placeholders. */
export interface LiveMatchInfo {
  /** 현행 기준표로 계산한 등급, e.g. `"1+등급"`. 시뮬레이터의 "개선 전" 등급과 같은 값입니다. */
  gradeLabel: string;
  /**
   * 인증서에 적혀 있는 등급. 인증서는 발급 당시 고시 기준이라 `gradeLabel` 과
   * 다를 수 있습니다 (실제로 약 45%가 다릅니다). 인증 이력이 없으면 빈 문자열.
   */
  certGradeLabel: string;
  /** kWh/m²·yr, or `null` if beec didn't send one. */
  energyValue: number | null;
  purpose: string;
  region: string;
  district: string;
  /** `"본인증"`, `"예비인증"`, or `""`. */
  certKind: string;
}

/** `/api/report`'s group-level estimate, for the `/search` 등급 추정 fallback (`est-…` ids). */
export interface BuildingEstimateInfo {
  purpose: string;
  region: string;
  /** Korean label for the picked size bucket, e.g. `"소형"`. */
  sizeLabel: string;
  sampleCount: number;
  lowSample: boolean;
}

/** `/api/apt/{aptCode}`'s facts/measured/estimate, for the apartment API's report card (`apt-…` ids). */
export interface ApartmentReportInfo {
  aptCode: string;
  sgg: string;
  emd: string;
  builder: string | null;
  households: number | null;
  heatingType: string | null;
  insulationEra: string | null;
  /** Which tier the shown grade came from — matters for how the report caveat it. */
  source: "measured" | "estimated-point" | "estimated-range" | "unknown";
  /** `estimate.disclaimer` or `estimateSkipped`, shown as-is. */
  disclaimer?: string;
  /** `"± N kWh/m²·yr"` for a point estimate. */
  marginOfError?: number;
}

export interface SavedBuilding extends BuildingSummary {
  /** ISO 8601 timestamp of when the building was saved to the user's account. */
  savedAt: string;
}

/** The address search users canonically enter to reach this fixture set. */
export const CANONICAL_SEARCH_ADDRESS = "월드컵로 120";

/** Prefix marking a building id as an `/api/apt/{aptCode}` match — apartments have a real persistent id, no encoding needed. */
const APARTMENT_ID_PREFIX = "apt-";

/** Search results for the address "월드컵로 120" (Mapo-gu, Seoul). */
const SEARCH_RESULTS: readonly BuildingSummary[] = [
  {
    id: "bld-001",
    name: "월드컵파크 10단지",
    address: "서울특별시 마포구 월드컵로 120",
    grade: CURRENT_BUILDING_GRADE,
    distanceMeters: 0,
    gradeSource: "estimated",
    primaryEnergyKwh: 295,
    completionYear: 1998,
    structureType: "철근콘크리트구조",
    useType: "공동주택",
    insulationStandard: "1987년 단열기준 적용",
    areaSqm: 84,
    heatingType: "개별 도시가스",
    certificationHistory: [],
  },
  {
    id: "bld-002",
    name: "마포한강푸르지오",
    address: "서울특별시 마포구 월드컵로 96",
    grade: "2",
    distanceMeters: 180,
    gradeSource: "certified",
    primaryEnergyKwh: 168,
    completionYear: 2016,
    structureType: "철근콘크리트구조",
    useType: "공동주택(아파트)",
    insulationStandard: "2013년 단열기준(강화)",
    areaSqm: 98500,
    heatingType: "지역난방",
    certificationHistory: [
      {
        grade: "2",
        primaryEnergyKwh: 168,
        certifiedAt: "2023-11-20",
        certId: "EEB-2023-021044",
        issuer: "한국에너지공단",
      },
    ],
  },
  {
    id: "bld-003",
    name: "상암월드컵파크 7단지",
    address: "서울특별시 마포구 월드컵로 140",
    grade: "4",
    distanceMeters: 210,
    gradeSource: "estimated",
    primaryEnergyKwh: 252,
    completionYear: 2002,
    structureType: "철근콘크리트구조",
    useType: "공동주택(아파트)",
    insulationStandard: "2001년 단열기준",
    areaSqm: 121000,
    heatingType: "지역난방",
    certificationHistory: [],
  },
  {
    id: "bld-004",
    name: "상암DMC래미안e편한세상",
    address: "서울특별시 마포구 월드컵로 15",
    grade: "1+",
    distanceMeters: 340,
    gradeSource: "certified",
    primaryEnergyKwh: 108,
    completionYear: 2017,
    structureType: "철근콘크리트구조",
    useType: "공동주택(아파트)",
    insulationStandard: "2017년 단열기준(강화)",
    areaSqm: 76500,
    heatingType: "개별가스보일러난방",
    certificationHistory: [
      {
        grade: "1+",
        primaryEnergyKwh: 108,
        certifiedAt: "2024-02-08",
        certId: "EEB-2024-005521",
        issuer: "한국에너지공단",
      },
    ],
  },
];

const SAVED_BUILDINGS: readonly SavedBuilding[] = [
  {
    ...SEARCH_RESULTS[0],
    savedAt: "2026-08-12T09:15:00+09:00",
  },
  {
    ...SEARCH_RESULTS[1],
    savedAt: "2026-08-28T14:40:00+09:00",
  },
];

/** Collapses whitespace and case so address/road-name queries compare reliably. */
function normalizeForComparison(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

const CANONICAL_QUERY_VARIANTS: readonly string[] = [
  normalizeForComparison(CANONICAL_SEARCH_ADDRESS),
  normalizeForComparison(SEARCH_RESULTS[0].address),
];

/**
 * Building-register fields beec's `/api/match` doesn't return (준공연도,
 * 구조, 연면적, 난방방식, 단열기준 — that's the separate 건축HUB integration,
 * still on the TODO list). Kept as fixed placeholders so a live match still
 * renders a complete report card instead of a half-empty one.
 */
const PLACEHOLDER_BUILDING_DETAILS = {
  completionYear: 1998,
  structureType: "철근콘크리트구조",
  insulationStandard: "1987년 단열기준 적용",
  areaSqm: 84,
  heatingType: "개별 도시가스",
} as const;

/**
 * The grade beec's `/api/match` computed for this building, or `null` when it
 * has no 1차에너지소요량 on record and therefore no grade at all.
 *
 * Prefers `gradeCode` (already suffix-free, and — since the 등급 통일 fix —
 * computed from the **current** 기준표, the same table `/api/simulate` uses)
 * and falls back to parsing the `"1+등급"` label. Deliberately returns `null`
 * instead of a placeholder: showing a stand-in grade for a building with no
 * energy figure is exactly the mismatch the report page was reporting.
 */
function resolveGradeCode(match: MatchResult): GradeCode | null {
  const fromCode = GRADE_ORDER.find((code) => code === match.gradeCode);
  return fromCode ?? toGradeCode(match.grade);
}

/** The 1차에너지소요량 beec matched, or `null` when the record carries none. */
function resolveEnergy(match: MatchResult): number | null {
  return match.primaryEnergyKwh ?? match.energyValue ?? null;
}

/**
 * Maps a beec `/api/match` hit onto the `BuildingSummary` shape the rest of
 * the app already renders. `grade`/`energy` are resolved by the caller, which
 * is also what decides a gradeless match isn't a usable result at all.
 */
function toBuildingSummary(
  address: string,
  match: MatchResult,
  grade: GradeCode,
  energy: number,
): BuildingSummary {
  const isCertified = match.certKind === "본인증" || match.certKind === "예비인증";

  return {
    id: encodeAddressId(address),
    name: match.name || address,
    address,
    grade,
    distanceMeters: 0,
    gradeSource: isCertified ? "certified" : "estimated",
    primaryEnergyKwh: energy,
    useType: match.purpose ?? "정보 없음",
    ...PLACEHOLDER_BUILDING_DETAILS,
    certificationHistory: isCertified
      ? [
          {
            grade,
            primaryEnergyKwh: energy,
            certifiedAt: `${PLACEHOLDER_BUILDING_DETAILS.completionYear}-01-01`,
            certId: match.certKind ?? "정보 없음",
            issuer: "한국에너지공단",
          },
        ]
      : [],
    liveMatch: {
      gradeLabel: match.grade ?? "",
      certGradeLabel: match.certGrade ?? "",
      energyValue: energy,
      purpose: match.purpose ?? "",
      region: match.region ?? "",
      district: match.district ?? "",
      certKind: match.certKind ?? "",
    },
    rawSource: { kind: "match", data: match },
  };
}

/** Validates a raw (no `"등급"` suffix) grade code from `/api/apt/…`, which uses the same `GradeTable` as `/api/match` but never adds the suffix. */
function toRawGradeCode(code: string | null | undefined): GradeCode | null {
  return code && (GRADE_ORDER as readonly string[]).includes(code) ? (code as GradeCode) : null;
}

/** Maps an `/api/report` group estimate onto the `BuildingSummary` shape (`est-…` ids, no single real building). */
function toEstimateBuildingSummary(parts: EstimateIdParts, result: ReportEstimate): BuildingSummary {
  const grade = toGradeCode(result.estimatedGrade) ?? CURRENT_BUILDING_GRADE;
  const sizeLabel = SIZE_BUCKET_OPTIONS.find((option) => option.value === parts.sizeBucket)?.label ?? parts.sizeBucket;

  return {
    id: encodeEstimateId(parts),
    name: parts.address,
    address: parts.address,
    grade,
    distanceMeters: 0,
    gradeSource: "estimated",
    // 그룹 인증값의 중앙값 — beec 가 시뮬레이터 baseEnergy 로 쓰라고 내주는 값. 없으면 0(모름).
    primaryEnergyKwh: result.primaryEnergyKwh ?? 0,
    useType: parts.purpose,
    ...PLACEHOLDER_BUILDING_DETAILS,
    certificationHistory: [],
    estimate: {
      purpose: parts.purpose,
      region: parts.region,
      sizeLabel,
      sampleCount: result.sampleCount ?? 0,
      lowSample: result.lowSample ?? false,
    },
    rawSource: { kind: "report", data: result },
  };
}

/** Maps an `/api/apt/{aptCode}` detail onto the `BuildingSummary` shape (`apt-…` ids). Facts are real; only the grade/energy tier (measured → point estimate → range estimate → unknown) varies in confidence. */
function toApartmentBuildingSummary(detail: ApartmentDetail): BuildingSummary | null {
  if (!detail.found || !detail.aptCode || !detail.facts) return null;
  const { facts, measured, estimate } = detail;

  let grade: GradeCode;
  let primaryEnergyKwh: number;
  let gradeSource: BuildingGradeSource;
  let source: ApartmentReportInfo["source"];
  let disclaimer: string | undefined;
  let marginOfError: number | undefined;

  if (measured) {
    grade = toRawGradeCode(measured.gradeCode) ?? CURRENT_BUILDING_GRADE;
    primaryEnergyKwh = measured.energyValue;
    gradeSource = "certified";
    source = "measured";
  } else if (estimate?.grade) {
    grade = toRawGradeCode(estimate.grade) ?? CURRENT_BUILDING_GRADE;
    primaryEnergyKwh = estimate.energyPredicted;
    gradeSource = "estimated";
    source = "estimated-point";
    disclaimer = estimate.disclaimer;
    marginOfError = estimate.marginOfError;
  } else if (estimate) {
    // "range" policy — no single point estimate is reliable enough to name, so
    // the worst-case bound is shown (never overstates the building) with the
    // full range left in `disclaimer` for the report to spell out.
    grade = toRawGradeCode(estimate.gradeWorst) ?? "7";
    primaryEnergyKwh = estimate.energyHigh;
    gradeSource = "estimated";
    source = "estimated-range";
    disclaimer = `${estimate.disclaimer} (${estimate.energyLow}~${estimate.energyHigh} kWh/m²·yr 범위로만 추정돼요.)`;
  } else {
    grade = "7";
    primaryEnergyKwh = 0;
    gradeSource = "estimated";
    source = "unknown";
    disclaimer = detail.estimateSkipped;
  }

  return {
    id: `${APARTMENT_ID_PREFIX}${detail.aptCode}`,
    name: detail.name ?? detail.aptCode,
    address: detail.address ?? "",
    grade,
    distanceMeters: 0,
    gradeSource,
    primaryEnergyKwh,
    completionYear: facts.completionYear ?? PLACEHOLDER_BUILDING_DETAILS.completionYear,
    structureType: "철근콘크리트구조",
    useType: "공동주택(아파트)",
    insulationStandard: facts.insulationEra ?? PLACEHOLDER_BUILDING_DETAILS.insulationStandard,
    areaSqm: facts.grossFloorArea ?? PLACEHOLDER_BUILDING_DETAILS.areaSqm,
    heatingType: facts.heatingType ?? PLACEHOLDER_BUILDING_DETAILS.heatingType,
    certificationHistory:
      measured && gradeSource === "certified"
        ? [
            {
              grade,
              primaryEnergyKwh,
              certifiedAt: `${facts.completionYear ?? PLACEHOLDER_BUILDING_DETAILS.completionYear}-01-01`,
              certId: measured.matchedBy ?? "정보 없음",
              issuer: "한국에너지공단",
            },
          ]
        : [],
    apartment: {
      aptCode: detail.aptCode,
      sgg: facts.sgg,
      emd: facts.emd,
      builder: facts.builder,
      households: facts.households,
      heatingType: facts.heatingType,
      insulationEra: facts.insulationEra,
      source,
      disclaimer,
      marginOfError,
    },
    rawSource: { kind: "apt", data: detail },
  };
}

/** Drops the leading 시/도 word (Korean addresses always start with one), e.g. `"서울특별시 구로구 경인로 158"` → `"구로구 경인로 158"`. */
function dropSidoPrefix(address: string): string | null {
  const spaceIndex = address.indexOf(" ");
  return spaceIndex === -1 ? null : address.slice(spaceIndex + 1);
}

/**
 * Tries beec's apartment API for a name/road-address query `/api/match`
 * (지번 전용) couldn't find. The apartment dataset has no 지번 field at all, so
 * a jibun-shaped `query` (what `/api/match` wants) almost never matches it.
 *
 * Tries several candidates in order, not just whichever's non-empty first —
 * beec's `/api/apt/search` does a plain substring match (see
 * `ApartmentService.search`), and:
 *  - Kakao's 건물명 doesn't always match beec's registered complex name
 *    (e.g. Kakao's "동선아파트" for what beec calls "오류동선"), so a
 *    non-empty candidate can still come back with zero hits.
 *  - Kakao abbreviates 시/도 to `"서울"`, but beec's addresses spell out
 *    `"서울특별시"` — a substring match across that gap always fails, so the
 *    시/도-stripped form of the address is tried too (`"구로구 경인로 158"`
 *    still matches `"서울특별시 구로구 경인로 158"`).
 */
async function searchApartmentsByQuery(
  query: string,
  buildingName?: string,
  roadAddress?: string,
): Promise<BuildingSummary[]> {
  const candidates = [buildingName, roadAddress, roadAddress && dropSidoPrefix(roadAddress), query, dropSidoPrefix(query)]
    .map((term) => term?.trim())
    .filter((term, index, all): term is string => Boolean(term) && all.indexOf(term) === index);

  for (const term of candidates) {
    const result = await searchApartments(term, 5);
    if (result.count === 0) continue;

    const details = await Promise.all(result.items.map((item) => getApartmentDetail(item.aptCode)));
    const summaries = details
      .map(toApartmentBuildingSummary)
      .filter((summary): summary is BuildingSummary => summary !== null);
    if (summaries.length > 0) return summaries;
  }

  return [];
}

export interface SearchOutcome {
  buildings: BuildingSummary[];
  /**
   * `true` when beec was actually reachable and explicitly returned
   * `found: false` for this address — the documented signal to switch the
   * UI over to the 용도·지역·규모 등급 추정 flow (`/api/report`), rather than
   * a plain "no results" message. `false` for the no-query listing, a real
   * match, and the beec-unreachable fixture fallback below.
   */
  offerEstimateFallback: boolean;
}

/**
 * Searches buildings by name or address.
 *
 * Tries the real beec backend's 동+번지 실측 매칭 (`/api/match`) first — a hit
 * there is real data, not a fixture. When that comes back `found:false`,
 * tries the separate 서울 아파트 API (`/api/apt/search`) next — `/api/match`
 * only matches 지번 addresses, so an apartment name or 도로명 query it missed
 * can still turn up there. Only when both come back empty does the caller
 * get `offerEstimateFallback` (see below); only when beec itself is
 * unreachable does this fall back to the fixtures below so the demo keeps
 * working: the canonical geocoded query — `"월드컵로 120"`, with or without
 * the `"서울특별시 마포구"` prefix — is treated as an address lookup and
 * returns every nearby fixture (`SEARCH_RESULTS`), ordered by distance,
 * mirroring how a real address search returns nearby buildings rather than
 * only the one exact street-number match. Any other query (a building name,
 * or a more specific address such as `"월드컵로 96"`) falls back to a
 * case-insensitive substring match against name/address.
 */
export async function searchBuildings(
  query?: string,
  buildingName?: string,
  roadAddress?: string,
): Promise<SearchOutcome> {
  if (!query || !query.trim()) {
    return { buildings: [...SEARCH_RESULTS], offerEstimateFallback: false };
  }

  try {
    const match = await matchAddress(query, buildingName);
    const grade = match.found ? resolveGradeCode(match) : null;
    const energy = match.found ? resolveEnergy(match) : null;
    // 매칭은 됐지만 에너지 값이 없으면 등급도 없습니다. 임의의 값을 채워 넣는 대신
    // 아래에서 아파트 API를, 그다음 용도·지역·규모 추정(`/api/report`)을 시도합니다.
    if (match.found && grade !== null && energy !== null) {
      return { buildings: [toBuildingSummary(query, match, grade, energy)], offerEstimateFallback: false };
    }

    const apartments = await searchApartmentsByQuery(query, buildingName, roadAddress);
    if (apartments.length > 0) {
      return { buildings: apartments, offerEstimateFallback: false };
    }

    return { buildings: [], offerEstimateFallback: true };
  } catch {
    // beec isn't reachable — fall through to the fixtures below.
  }

  const normalizedQuery = normalizeForComparison(query);
  if (CANONICAL_QUERY_VARIANTS.includes(normalizedQuery)) {
    return {
      buildings: [...SEARCH_RESULTS].sort((a, b) => a.distanceMeters - b.distanceMeters),
      offerEstimateFallback: false,
    };
  }

  const needle = query.trim().toLowerCase();
  const buildings = SEARCH_RESULTS.filter(
    (building) =>
      building.name.toLowerCase().includes(needle) ||
      building.address.toLowerCase().includes(needle),
  );
  return { buildings, offerEstimateFallback: false };
}

/**
 * Returns a single building by id: a fixture id (`"bld-001"`) looks up
 * `SEARCH_RESULTS` directly; a beec-backed id from `searchBuildings`
 * (`"addr-…"`) re-queries `/api/match` with the address packed inside it —
 * beec has no persistent id for that data, only address matching; an
 * `"apt-…"` id re-queries `/api/apt/{aptCode}` (apartments *do* have a
 * persistent `aptCode`, so this one's a direct lookup); an `"est-…"` id
 * re-queries `/api/report` with the 용도·지역·규모 packed inside it.
 */
export async function getBuildingById(id: string, buildingName?: string): Promise<BuildingSummary | undefined> {
  if (id.startsWith(APARTMENT_ID_PREFIX)) {
    try {
      const detail = await getApartmentDetail(id.slice(APARTMENT_ID_PREFIX.length));
      return toApartmentBuildingSummary(detail) ?? undefined;
    } catch {
      return undefined;
    }
  }

  const estimateParts = decodeEstimateId(id);
  if (estimateParts) {
    try {
      const result = await estimateReport(estimateParts.purpose, estimateParts.region, estimateParts.sizeBucket as SizeBucket);
      return result.found ? toEstimateBuildingSummary(estimateParts, result) : undefined;
    } catch {
      return undefined;
    }
  }

  const address = decodeAddressId(id);
  if (address === null) {
    return SEARCH_RESULTS.find((building) => building.id === id);
  }

  try {
    const match = await matchAddress(address, buildingName);
    if (!match.found) return undefined;
    const grade = resolveGradeCode(match);
    const energy = resolveEnergy(match);
    if (grade === null || energy === null) return undefined;
    return toBuildingSummary(address, match, grade, energy);
  } catch {
    return undefined;
  }
}

/** Returns the current user's saved (bookmarked) buildings. */
export async function getSavedBuildings(): Promise<SavedBuilding[]> {
  return [...SAVED_BUILDINGS];
}
