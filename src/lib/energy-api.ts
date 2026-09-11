import { GRADES, GRADE_ORDER, type GradeCode, type GradeDistributionEntry } from "@/src/data/grades";

/**
 * Client for the energy-grade backend.
 *
 * Requests go to relative `/api/*` paths; `next.config.ts` rewrites them to
 * the backend (`API_ORIGIN`, default `http://localhost:8080`), so the browser
 * never makes a cross-origin call.
 */

export const REGIONS = [
  "서울", "경기", "인천", "강원", "대전", "세종", "충남", "충북", "광주",
  "전남", "전북", "대구", "경북", "부산", "울산", "경남", "제주",
] as const;
export type Region = (typeof REGIONS)[number];

export const PURPOSES = ["주거용", "주거용 이외"] as const;
export type Purpose = (typeof PURPOSES)[number];

/** `unknown` also exists server-side but is an internal value, so it is not offered to users. */
export type SizeBucket = "small" | "medium" | "large" | "xlarge";

export const SIZE_BUCKET_OPTIONS: { value: SizeBucket; label: string }[] = [
  { value: "small", label: "소형" },
  { value: "medium", label: "중형" },
  { value: "large", label: "대형" },
  { value: "xlarge", label: "초대형" },
];

export function getSizeBucketLabel(sizeBucket: SizeBucket): string {
  return SIZE_BUCKET_OPTIONS.find((option) => option.value === sizeBucket)?.label ?? sizeBucket;
}

export interface MatchQuery {
  jibunAddress?: string;
  roadAddress?: string;
  buildingName?: string;
}

/** A certified building found by address. `grade` is a label such as `"2등급"`. */
export interface MatchFound {
  found: true;
  name: string;
  region: string;
  purpose: string;
  grade: string;
  /** Primary energy consumption, kWh/m²·yr. */
  energyValue: number;
  /** e.g. `"예비인증"`, `"본인증"`. */
  certKind: string;
}

export type MatchResult = MatchFound | { found: false };

export interface EstimateQuery {
  region: Region;
  purpose: Purpose;
  sizeBucket: SizeBucket;
}

export interface EstimateFound {
  found: true;
  sampleCount: number;
  /** e.g. `"1+등급"`. */
  estimatedGrade: string;
  /** Building count per grade label, e.g. `{ "1+등급": 1114 }`. */
  gradeDistribution: Record<string, number>;
  /** `true` when the sample is small — show the result as 참고용. */
  lowSample: boolean;
}

export type EstimateResult = EstimateFound | { found: false; message?: string };

async function apiGet<T>(path: string, params: Record<string, string | undefined>, signal?: AbortSignal): Promise<T> {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const response = await fetch(`${path}?${search.toString()}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) {
    throw new Error(`${path} 요청 실패 (HTTP ${response.status})`);
  }
  return (await response.json()) as T;
}

/** `GET /api/match` — finds a certified building by address. */
export function fetchMatch(query: MatchQuery, signal?: AbortSignal): Promise<MatchResult> {
  return apiGet<MatchResult>("/api/match", { ...query }, signal);
}

/** `GET /api/report` — estimates a grade from buildings with the same region/purpose/size. */
export function fetchEstimate(query: EstimateQuery, signal?: AbortSignal): Promise<EstimateResult> {
  return apiGet<EstimateResult>("/api/report", { ...query }, signal);
}

/** Long-form 시·도 names whose short form isn't a prefix. */
const SIDO_ALIASES: Record<string, Region> = {
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
};

/** Maps a Kakao `sido` (e.g. `"강원특별자치도"`, `"서울"`) to an API region, if recognised. */
export function toRegion(sido: string | undefined): Region | undefined {
  const value = sido?.trim();
  if (!value) return undefined;
  const alias = SIDO_ALIASES[value];
  if (alias) return alias;
  return REGIONS.find((region) => value.startsWith(region));
}

/** Converts the API's label-keyed distribution into chart entries, best grade first. */
export function toGradeDistribution(distribution: Record<string, number>, current: GradeCode): GradeDistributionEntry[] {
  return GRADE_ORDER.map((code) => ({
    grade: code,
    label: GRADES[code].label,
    count: distribution[GRADES[code].label] ?? 0,
    isCurrentBuildingGrade: code === current,
  }));
}
