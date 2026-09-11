import type { EcoAction } from "@/src/data/actions";
import { REMODEL_MEASURES } from "@/src/lib/remodel-report";

/**
 * Route-local filter vocabulary for the guide checklist. Every value here is
 * derived deterministically from fields that already exist on `EcoAction`
 * (`eligibleUserTypes`, `difficulty`, `estimatedCostRangeManwon`,
 * `supportEligible`) — no fixture data is changed or duplicated.
 */

export type AudienceFilter = "owner" | "tenant";

export interface AudienceOption {
  value: AudienceFilter;
  label: string;
  description: string;
}

export const AUDIENCE_OPTIONS: AudienceOption[] = [
  { value: "owner", label: "소유주", description: "직접 소유한 주택입니다" },
  { value: "tenant", label: "임차인", description: "전·월세로 거주 중입니다" },
];

export type BudgetFilter = "no-construction" | "up-to-500" | "any";

export interface BudgetOption {
  value: BudgetFilter;
  label: string;
}

export const BUDGET_OPTIONS: BudgetOption[] = [
  { value: "no-construction", label: "공사 없이 가능한 것만" },
  { value: "up-to-500", label: "500만 원 이하" },
  { value: "any", label: "제한 없음" },
];

function fitsBudget(action: EcoAction, budget: BudgetFilter): boolean {
  switch (budget) {
    case "no-construction":
      return action.difficulty === "easy";
    case "up-to-500":
      return action.estimatedCostRangeManwon.max <= 500;
    case "any":
      return true;
  }
}

export interface GuideFilterState {
  audience: AudienceFilter;
  budget: BudgetFilter;
  supportOnly: boolean;
}

export const DEFAULT_GUIDE_FILTER_STATE: GuideFilterState = {
  audience: "owner",
  budget: "any",
  supportOnly: false,
};

const REMODEL_ORDER: readonly string[] = REMODEL_MEASURES.map((measure) => measure.code);

/**
 * 성적표의 AI 리모델링 리포트가 추천한 순서(절감률이 큰 순 — 외벽 → 창호 → 환기 →
 * 보일러 → 지붕 → LED)로 정렬한다. beec measure 에 걸리지 않는 항목은 맨 뒤.
 */
export function sortByRecommendedRemodel(actions: EcoAction[]): EcoAction[] {
  const rank = (action: EcoAction) => {
    const index = action.measureCode ? REMODEL_ORDER.indexOf(action.measureCode) : -1;
    return index === -1 ? REMODEL_ORDER.length : index;
  };
  return [...actions].sort((a, b) => rank(a) - rank(b));
}

/** Applies the owner/tenant, budget, and support-only filters to the full action list. */
export function filterActions(actions: EcoAction[], filters: GuideFilterState): EcoAction[] {
  return actions.filter(
    (action) =>
      action.eligibleUserTypes.includes(filters.audience) &&
      fitsBudget(action, filters.budget) &&
      (!filters.supportOnly || action.supportEligible),
  );
}
