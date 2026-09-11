import { GRADE_ORDER, type GradeCode } from "../data/grades";

/**
 * Client for the real `beec` Spring Boot backend (see `/beec` at the repo
 * root — run it with `./mvnw spring-boot:run`, defaults to port 8080).
 *
 * `matchAddress`/`estimateReport` run server-side only (Server Components,
 * route handlers), so the base URL is a plain server env var, not
 * `NEXT_PUBLIC_`. The constants and `toGradeCode` below have no Node
 * dependencies and are safe to import from Client Components too.
 */

const BEEC_API_BASE_URL = process.env.BEEC_API_BASE_URL ?? "http://localhost:8080";

export interface MatchResult {
  found: boolean;
  /** Building/site name, e.g. `"서울시 서초동1692-6 업무시설"`. Present only when `found`. */
  name?: string;
  /** Grade label with the `"등급"` suffix, e.g. `"1+등급"`. Present only when `found`. */
  grade?: string;
  /** Annual primary energy consumption, kWh/m²·yr. Present only when `found`. */
  energyValue?: number;
  /** `"주거용"` or `"주거용 이외"`. Present only when `found`. */
  purpose?: string;
  region?: string;
  /** `"본인증"`, `"예비인증"`, or empty when the record has no certification. */
  certKind?: string;
}

export interface ReportEstimate {
  found: boolean;
  message?: string;
  sampleCount?: number;
  /** Grade label with the `"등급"` suffix, e.g. `"1+등급"`. Present only when `found`. */
  estimatedGrade?: string;
  gradeDistribution?: Record<string, number>;
  lowSample?: boolean;
}

/** Building size bucket `/api/report` groups by — matches the Java backend's `sizeBucket` values. */
export type SizeBucket = "small" | "medium" | "large" | "xlarge";

/**
 * `/api/report` accepts a fifth bucket, `"unknown"`, for records with no
 * recorded size — but that's a fallback for missing data, not something a
 * user picks, so it's deliberately left out of this user-facing list.
 */
export const SIZE_BUCKET_OPTIONS: readonly { value: SizeBucket; label: string }[] = [
  { value: "small", label: "소형" },
  { value: "medium", label: "중형" },
  { value: "large", label: "대형" },
  { value: "xlarge", label: "초대형" },
];

/** `/api/report`'s `purpose` values — send `"주거용 이외"` for non-residential (the server also accepts `"비주거용"` and converts it). */
export const PURPOSE_OPTIONS: readonly { value: string; label: string }[] = [
  { value: "주거용", label: "주거용" },
  { value: "주거용 이외", label: "주거용 이외" },
];

/** `/api/report`'s `region` values — every region beec's seed data groups by. */
export const REGION_OPTIONS: readonly string[] = [
  "서울",
  "경기",
  "인천",
  "강원",
  "대전",
  "세종",
  "충남",
  "충북",
  "광주",
  "전남",
  "전북",
  "대구",
  "경북",
  "부산",
  "울산",
  "경남",
  "제주",
];

/** beec grade labels carry a `"등급"` suffix (`"1+등급"`); `GradeCode` doesn't. */
export function toGradeCode(label: string | undefined): GradeCode | null {
  return GRADE_ORDER.find((code) => `${code}등급` === label) ?? null;
}

async function beecGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(path, BEEC_API_BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`beec ${path} error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Looks up a building by address against beec's 동+번지 실측 데이터 (`/api/match`). */
export async function matchAddress(address: string): Promise<MatchResult> {
  return beecGet<MatchResult>("/api/match", { roadAddress: address });
}

/** Estimates a grade from 용도/지역/규모 alone, for addresses `matchAddress` can't find (`/api/report`). */
export async function estimateReport(
  purpose: string,
  region: string,
  sizeBucket: SizeBucket,
): Promise<ReportEstimate> {
  return beecGet<ReportEstimate>("/api/report", { purpose, region, sizeBucket });
}

export interface SimulateStep {
  code: string;
  title: string;
  reductionPct: number;
  from: number;
  to: number;
}

export interface SimulateResult {
  found: boolean;
  message?: string;
  purpose?: string;
  baseEnergy?: number;
  energy?: number;
  unit?: string;
  savedEnergy?: number;
  savedPct?: number;
  /** Grade code without the `"등급"` suffix (unlike `MatchResult`/`ReportEstimate`) — matches `GradeCode` directly. */
  gradeCodeBefore?: string;
  gradeBefore?: string;
  gradeCode?: string;
  grade?: string;
  gradeUp?: number;
  applied?: string[];
  steps?: SimulateStep[];
}

/**
 * What-if 시뮬레이터 (`/api/simulate`): applies `measureCodes` (beec's 6
 * improvement measures — see `Measure.java`, e.g. `"WIN"`, `"WAL"`) to
 * `baseEnergy` multiplicatively and returns the resulting grade/energy.
 */
export async function simulateWhatIf(
  baseEnergy: number,
  measureCodes: string[],
  purpose: string,
): Promise<SimulateResult> {
  return beecGet<SimulateResult>("/api/simulate", {
    baseEnergy: String(baseEnergy),
    measures: measureCodes.join(","),
    purpose,
  });
}
