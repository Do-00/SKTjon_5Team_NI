import { CURRENT_BUILDING_GRADE, type GradeCode } from "./grades";

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
 * Searches buildings by name or address.
 *
 * The canonical geocoded query — `"월드컵로 120"`, with or without the
 * `"서울특별시 마포구"` prefix — is treated as an address lookup and returns
 * every nearby fixture (`SEARCH_RESULTS`), ordered by distance, mirroring how
 * a real address search returns nearby buildings rather than only the one
 * exact street-number match. Any other query (a building name, or a more
 * specific address such as `"월드컵로 96"`) falls back to a case-insensitive
 * substring match against name/address.
 */
export async function searchBuildings(query?: string): Promise<BuildingSummary[]> {
  if (!query || !query.trim()) {
    return [...SEARCH_RESULTS];
  }

  const normalizedQuery = normalizeForComparison(query);
  if (CANONICAL_QUERY_VARIANTS.includes(normalizedQuery)) {
    return [...SEARCH_RESULTS].sort((a, b) => a.distanceMeters - b.distanceMeters);
  }

  const needle = query.trim().toLowerCase();
  return SEARCH_RESULTS.filter(
    (building) =>
      building.name.toLowerCase().includes(needle) ||
      building.address.toLowerCase().includes(needle),
  );
}

/** Returns a single search-result building by id, if it exists. */
export async function getBuildingById(id: string): Promise<BuildingSummary | undefined> {
  return SEARCH_RESULTS.find((building) => building.id === id);
}

/** Returns the current user's saved (bookmarked) buildings. */
export async function getSavedBuildings(): Promise<SavedBuilding[]> {
  return [...SAVED_BUILDINGS];
}
