import type { EcoAction } from "@/src/data/actions";

/**
 * Route-local filter vocabulary for the guide checklist. Every value here is
 * derived deterministically from fields that already exist on `EcoAction`
 * (`eligibleUserTypes`) — no fixture data is changed or duplicated.
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

export interface GuideFilterState {
  audience: AudienceFilter;
}

export const DEFAULT_GUIDE_FILTER_STATE: GuideFilterState = {
  audience: "owner",
};

/** Applies the owner/tenant filter to the full action list. */
export function filterActions(actions: EcoAction[], filters: GuideFilterState): EcoAction[] {
  return actions.filter((action) => action.eligibleUserTypes.includes(filters.audience));
}
