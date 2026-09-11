/**
 * Recommended eco actions for the Eco Check prototype, ordered from the
 * smallest to the largest estimated monthly savings.
 */

export type EcoActionDifficulty = "easy" | "medium" | "hard";

/**
 * Applicant categories that can realistically carry out an action. Mirrors
 * `UserType` in `src/data/account.ts` and `SupportProgramUserType` in
 * `src/data/programs.ts` (kept as separate local unions, rather than a
 * shared import, so these fixture modules stay independent of each other).
 */
export type EcoActionUserType = "owner" | "tenant" | "hoa" | "corporation" | "general";

export interface CostRangeManwon {
  /** Lower bound of the estimated one-time implementation cost, in 만원 (10,000 KRW) units. */
  min: number;
  /** Upper bound of the estimated one-time implementation cost, in 만원 units. */
  max: number;
}

export interface EcoAction {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: EcoActionDifficulty;
  /** Estimated monthly savings in 만원 (10,000 KRW) units. */
  monthlySavingsManwon: number;
  /** Estimated one-time cost to implement this action. */
  estimatedCostRangeManwon: CostRangeManwon;
  /** Applicant categories who can realistically carry out this action. */
  eligibleUserTypes: EcoActionUserType[];
  /** Whether at least one public support program (see `src/data/programs.ts`) can offset this action's cost. */
  supportEligible: boolean;
  /** IDs of matching programs from `src/data/programs.ts`. Empty when `supportEligible` is `false`. */
  supportProgramIds: string[];
}

const ECO_ACTIONS: readonly EcoAction[] = [
  {
    id: "act-001",
    title: "LED 조명 교체",
    description: "공용부 및 세대 내 조명을 고효율 LED로 교체해 전력 사용량을 줄입니다.",
    category: "조명",
    difficulty: "easy",
    monthlySavingsManwon: 4,
    estimatedCostRangeManwon: { min: 30, max: 80 },
    eligibleUserTypes: ["owner", "tenant", "hoa", "general"],
    supportEligible: true,
    supportProgramIds: ["prog-005"],
  },
  {
    id: "act-002",
    title: "고효율 보일러 설정 최적화",
    description: "난방 스케줄과 보일러 설정 온도를 조정해 불필요한 가동을 줄입니다.",
    category: "난방",
    difficulty: "easy",
    monthlySavingsManwon: 7,
    estimatedCostRangeManwon: { min: 0, max: 10 },
    eligibleUserTypes: ["owner", "tenant", "hoa"],
    supportEligible: false,
    supportProgramIds: [],
  },
  {
    id: "act-003",
    title: "창호 단열재 시공",
    description: "노후 창호에 단열 필름과 틈새 마감재를 추가해 열손실을 줄입니다.",
    category: "단열",
    difficulty: "medium",
    monthlySavingsManwon: 9,
    estimatedCostRangeManwon: { min: 150, max: 400 },
    eligibleUserTypes: ["owner", "hoa"],
    supportEligible: true,
    supportProgramIds: ["prog-001", "prog-003"],
  },
  {
    id: "act-004",
    title: "옥상 태양광 패널 설치",
    description: "옥상 유휴 공간에 소규모 태양광 발전 설비를 설치해 자체 전력을 생산합니다.",
    category: "재생에너지",
    difficulty: "hard",
    monthlySavingsManwon: 23,
    estimatedCostRangeManwon: { min: 800, max: 2000 },
    eligibleUserTypes: ["owner", "hoa", "corporation"],
    supportEligible: true,
    supportProgramIds: ["prog-004"],
  },
  {
    id: "act-005",
    title: "건물 외벽 단열 리모델링",
    description: "외벽 단열재를 전면 보강하는 그린리모델링으로 냉난방 부하를 크게 낮춥니다.",
    category: "단열",
    difficulty: "hard",
    monthlySavingsManwon: 51,
    estimatedCostRangeManwon: { min: 3000, max: 8000 },
    eligibleUserTypes: ["owner", "hoa", "corporation"],
    supportEligible: true,
    supportProgramIds: ["prog-001", "prog-003", "prog-006"],
  },
];

/** Returns every recommended eco action, ordered by ascending savings. */
export async function getEcoActions(): Promise<EcoAction[]> {
  return [...ECO_ACTIONS];
}

/** Returns a single eco action by id, if it exists. */
export async function getEcoActionById(id: string): Promise<EcoAction | undefined> {
  return ECO_ACTIONS.find((action) => action.id === id);
}
