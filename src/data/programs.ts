/**
 * Government/public support programs for building energy efficiency
 * upgrades, shown to Eco Check users alongside their grade report.
 */

/**
 * Applicant categories a program accepts. Mirrors `UserType` in
 * `src/data/account.ts` and `EcoActionUserType` in `src/data/actions.ts`
 * (kept as a separate local union, rather than a shared import, so these
 * fixture modules stay independent of each other).
 */
export type SupportProgramUserType = "owner" | "tenant" | "hoa" | "corporation" | "general";

export interface SupportProgram {
  id: string;
  name: string;
  /** Operating agency, e.g. a ministry or public corporation. */
  provider: string;
  summary: string;
  /** Maximum support amount in 만원 (10,000 KRW) units, when capped. */
  maxSupportManwon?: number;
  /** Application deadline as an ISO 8601 date, or `"상시"` when always open. */
  deadline: string;
  /** Short topical tags for filtering/search, e.g. `["단열", "융자"]`. */
  tags: string[];
  /** Applicant categories eligible to apply. */
  eligibleUserTypes: SupportProgramUserType[];
  /** Eligible region for applicants; `"전국"` = nationwide. */
  region: string;
  /**
   * Whether this program is matched/recommended for the current user's
   * primary building (see `src/data/account.ts` / `src/data/buildings.ts`,
   * `bld-001`: 공동주택, 5등급, 서울특별시 마포구).
   */
  matched: boolean;
  /** Official program information URL (ministry/public-agency site). */
  officialUrl: string;
}

const SUPPORT_PROGRAMS: readonly SupportProgram[] = [
  {
    id: "prog-001",
    name: "건물 에너지효율화 사업(BRP) 융자지원",
    provider: "산업통상자원부",
    summary: "건물의 단열, 창호, 냉난방 설비 개선 공사비를 저리로 융자 지원합니다.",
    maxSupportManwon: 2000,
    deadline: "상시",
    tags: ["에너지효율화", "단열", "창호", "융자"],
    eligibleUserTypes: ["owner", "hoa", "corporation"],
    region: "전국",
    matched: true,
    officialUrl: "https://www.energy.or.kr",
  },
  {
    id: "prog-002",
    name: "서울시 그린리모델링 이자 지원사업",
    provider: "서울특별시",
    summary: "노후 건축물의 그린리모델링 대출 이자 일부를 서울시가 지원합니다.",
    maxSupportManwon: 500,
    deadline: "2026-11-30",
    tags: ["그린리모델링", "이자지원", "서울시"],
    eligibleUserTypes: ["owner", "hoa"],
    region: "서울특별시",
    matched: true,
    officialUrl: "https://www.seoul.go.kr",
  },
  {
    id: "prog-003",
    name: "노후 건축물 그린리모델링 사업",
    provider: "국토교통부",
    summary: "준공 후 15년 이상 노후 건축물의 에너지 성능 개선 공사비를 지원합니다.",
    maxSupportManwon: 3000,
    deadline: "2026-12-31",
    tags: ["그린리모델링", "노후건축물", "보조금"],
    eligibleUserTypes: ["owner", "hoa"],
    region: "전국",
    matched: true,
    officialUrl: "https://www.molit.go.kr",
  },
  {
    id: "prog-004",
    name: "신재생에너지 보급지원사업(태양광)",
    provider: "한국에너지공단",
    summary: "건물 옥상 및 유휴부지 태양광 설비 설치비 일부를 보조금으로 지원합니다.",
    maxSupportManwon: 800,
    deadline: "2026-10-31",
    tags: ["태양광", "신재생에너지", "보조금"],
    eligibleUserTypes: ["owner", "hoa", "corporation"],
    region: "전국",
    matched: false,
    officialUrl: "https://www.energy.or.kr",
  },
  {
    id: "prog-005",
    name: "온실가스 감축설비 지원사업",
    provider: "환경부",
    summary: "고효율 설비 교체를 통한 온실가스 감축 실적에 비례해 설치비를 지원합니다.",
    maxSupportManwon: 1200,
    deadline: "상시",
    tags: ["온실가스", "고효율설비", "보조금"],
    eligibleUserTypes: ["owner", "tenant", "hoa", "corporation"],
    region: "전국",
    matched: true,
    officialUrl: "https://www.me.go.kr",
  },
  {
    id: "prog-006",
    name: "제로에너지건축물 인증 지원사업",
    provider: "국토교통부",
    summary: "제로에너지건축물(ZEB) 인증 취득에 필요한 설계 및 인증 비용을 지원합니다.",
    maxSupportManwon: 1500,
    deadline: "2027-02-28",
    tags: ["제로에너지", "ZEB", "인증"],
    eligibleUserTypes: ["owner", "corporation"],
    region: "전국",
    matched: false,
    officialUrl: "https://www.energy.or.kr",
  },
];

/** Returns every active support program. */
export async function getSupportPrograms(): Promise<SupportProgram[]> {
  return [...SUPPORT_PROGRAMS];
}

/** Returns a single support program by id, if it exists. */
export async function getSupportProgramById(id: string): Promise<SupportProgram | undefined> {
  return SUPPORT_PROGRAMS.find((program) => program.id === id);
}
