import { CURRENT_BUILDING_GRADE, type GradeCode } from "./grades";
import { decodeAddressIdParts, decodeEstimateId, encodeAddressId, type EstimateIdParts } from "../lib/address-id";
import {
  estimateReport,
  matchAddress,
  SIZE_BUCKET_OPTIONS,
  toGradeCode,
  type MatchResult,
  type ReportEstimate,
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
  /** What beec's `/api/report` estimated, for addresses with no 실측 record (absent on fixtures and live matches). */
  estimate?: EstimateInfo;
}

/** Raw `/api/match` fields, so the report shows beec's values instead of the fixture-shaped placeholders. */
export interface LiveMatchInfo {
  /** e.g. `"1+등급"`. */
  gradeLabel: string;
  /** kWh/m²·yr, or `null` if the record has no value (beec sent null, or 0 from an older build). */
  energyValue: number | null;
  purpose: string;
  region: string;
  district: string;
  /** `"본인증"`, `"예비인증"`, or `""`. */
  certKind: string;
}

/** The `/api/report` comparison group behind an estimated grade. */
export interface EstimateInfo {
  purpose: string;
  region: string;
  /** Label of the 규모 the user picked, e.g. `"중형"`. */
  sizeLabel: string;
  /** Buildings in the comparison group. */
  sampleCount: number;
  lowSample: boolean;
}

export interface SavedBuilding extends BuildingSummary {
  /** ISO 8601 timestamp of when the building was saved to the user's account. */
  savedAt: string;
}

/** The address search users canonically enter to reach this fixture set. */
export const CANONICAL_SEARCH_ADDRESS = "월드컵로 120";

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

/** Maps a beec `/api/match` hit onto the `BuildingSummary` shape the rest of the app already renders. */
function toBuildingSummary(address: string, match: MatchResult, buildingName?: string): BuildingSummary {
  const grade = toGradeCode(match.grade) ?? CURRENT_BUILDING_GRADE;
  // Decide from the matched record's own `isEstimated`; an older beec without it falls back to "has a certificate kind".
  const isCertified =
    match.isEstimated === undefined
      ? match.certKind === "본인증" || match.certKind === "예비인증"
      : !match.isEstimated;
  // Some certificates carry energyValue 0 (no value recorded) — that's missing data, not 0 kWh/m²·yr.
  const energyValue = match.energyValue ? match.energyValue : null;

  return {
    id: encodeAddressId(address, buildingName),
    name: match.name || address,
    address,
    grade,
    distanceMeters: 0,
    gradeSource: isCertified ? "certified" : "estimated",
    primaryEnergyKwh: energyValue ?? 0,
    useType: match.purpose ?? "정보 없음",
    ...PLACEHOLDER_BUILDING_DETAILS,
    certificationHistory: isCertified
      ? [
          {
            grade,
            primaryEnergyKwh: energyValue ?? 0,
            certifiedAt: `${PLACEHOLDER_BUILDING_DETAILS.completionYear}-01-01`,
            certId: match.certKind ?? "정보 없음",
            issuer: "한국에너지공단",
          },
        ]
      : [],
    liveMatch: {
      gradeLabel: match.grade ?? "",
      energyValue,
      purpose: match.purpose ?? "",
      region: match.region ?? "",
      district: match.district ?? "",
      certKind: match.certKind ?? "",
    },
  };
}

/** Maps a beec `/api/report` estimate onto `BuildingSummary`, so it renders in the same report layout as a live match. */
function toEstimatedBuildingSummary(
  id: string,
  parts: EstimateIdParts,
  sizeLabel: string,
  grade: GradeCode,
  result: ReportEstimate,
): BuildingSummary {
  return {
    id,
    name: parts.address,
    address: parts.address,
    grade,
    distanceMeters: 0,
    gradeSource: "estimated",
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
  };
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
 * there is real data, not a fixture, and an explicit `found:false` means the
 * caller should offer the 등급 추정 fallback (see `offerEstimateFallback`).
 * Only when beec itself is unreachable does this fall back to the fixtures
 * below so the demo keeps working: the canonical geocoded query —
 * `"월드컵로 120"`, with or without the `"서울특별시 마포구"` prefix — is
 * treated as an address lookup and returns every nearby fixture
 * (`SEARCH_RESULTS`), ordered by distance, mirroring how a real address
 * search returns nearby buildings rather than only the one exact
 * street-number match. Any other query (a building name, or a more specific
 * address such as `"월드컵로 96"`) falls back to a case-insensitive substring
 * match against name/address.
 */
export async function searchBuildings(query?: string): Promise<SearchOutcome> {
  if (!query || !query.trim()) {
    return { buildings: [...SEARCH_RESULTS], offerEstimateFallback: false };
  }

  try {
    const match = await matchAddress(query);
    return match.found
      ? { buildings: [toBuildingSummary(query, match)], offerEstimateFallback: false }
      : { buildings: [], offerEstimateFallback: true };
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

/** Re-runs the `/api/report` estimate an `est-` id describes. */
async function getEstimatedBuilding(id: string, parts: EstimateIdParts): Promise<BuildingSummary | undefined> {
  const size = SIZE_BUCKET_OPTIONS.find((option) => option.value === parts.sizeBucket);
  if (!size) return undefined;

  try {
    const result = await estimateReport(parts.purpose, parts.region, size.value);
    const grade = result.found ? toGradeCode(result.estimatedGrade) : null;
    return grade ? toEstimatedBuildingSummary(id, parts, size.label, grade, result) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Returns a single building by id: a fixture id (`"bld-001"`) looks up
 * `SEARCH_RESULTS` directly, a beec-backed id (`"addr-…"`) re-queries
 * `/api/match` with the address (and 건물명, if any) packed inside it — beec
 * has no persistent building ids of its own, only address matching — and an
 * estimate id (`"est-…"`) re-runs `/api/report` for an address with no 실측 record.
 * `buildingName` is only for older `?bn=` links whose id has no name inside.
 */
export async function getBuildingById(id: string, buildingName?: string): Promise<BuildingSummary | undefined> {
  const estimate = decodeEstimateId(id);
  if (estimate) {
    return getEstimatedBuilding(id, estimate);
  }

  const parts = decodeAddressIdParts(id);
  if (parts === null) {
    return SEARCH_RESULTS.find((building) => building.id === id);
  }

  const name = parts.buildingName ?? buildingName;
  try {
    const match = await matchAddress(parts.address, name);
    return match.found ? toBuildingSummary(parts.address, match, name) : undefined;
  } catch {
    return undefined;
  }
}

/** Returns the current user's saved (bookmarked) buildings. */
export async function getSavedBuildings(): Promise<SavedBuilding[]> {
  return [...SAVED_BUILDINGS];
}
