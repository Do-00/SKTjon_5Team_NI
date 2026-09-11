import { GRADE_ORDER, GRADES, type GradeCode } from "../data/grades";
import type { EcoAction, EcoActionDifficulty } from "../data/actions";
import type { SimulateResult } from "./beec-client";

/**
 * What-if 시뮬레이터 계산.
 *
 * beec의 `/api/simulate`(항목별 곱셈 방식 — see `Measure.java`)가 이제
 * 실제로 존재하므로 우선 그걸 쓴다(`src/app/api/simulate` 릴레이 경유).
 * `simulateWhatIfLocally()`는 beec가 꺼져 있거나 체크한 항목이 beec의 6개
 * measure에 하나도 안 걸릴 때(예: 태양광만 체크)를 위한 폴백으로만 남겨뒀다
 * — 같은 "항목별 곱셈" 방식이라 두 경로의 숫자가 크게 어긋나지 않는다.
 */

/** 난이도별 1차에너지소요량 감소율(폴백 전용 placeholder) — beec가 응답하면 이 값은 안 쓰인다. */
const DIFFICULTY_REDUCTION_FACTOR: Record<EcoActionDifficulty, number> = {
  easy: 0.97,
  medium: 0.92,
  hard: 0.8,
};

export interface WhatIfResult {
  currentGrade: GradeCode;
  projectedGrade: GradeCode;
  currentPrimaryEnergyKwh: number;
  projectedPrimaryEnergyKwh: number;
  /** 0~100 사이, 선택한 항목들로 줄어드는 1차에너지소요량 비율. */
  reductionPercent: number;
  totalMonthlySavingsManwon: number;
  /** 이 결과가 beec 실계산인지, beec를 못 불러서 쓴 로컬 추정치인지. */
  source: "beec" | "local";
}

function gradeFromPrimaryEnergy(kwh: number): GradeCode {
  return (
    GRADE_ORDER.find((code) => {
      const { minPrimaryEnergyKwh, maxPrimaryEnergyKwh } = GRADES[code];
      return kwh >= minPrimaryEnergyKwh && (maxPrimaryEnergyKwh === null || kwh < maxPrimaryEnergyKwh);
    }) ?? "7"
  );
}

/** 선택된 실천 항목을 적용했을 때의 예상 1차에너지소요량·등급을 계산한다 (beec 없이도 동작하는 폴백). */
export function simulateWhatIfLocally(
  currentPrimaryEnergyKwh: number,
  currentGrade: GradeCode,
  selectedActions: EcoAction[],
): WhatIfResult {
  const factor = selectedActions.reduce(
    (acc, action) => acc * DIFFICULTY_REDUCTION_FACTOR[action.difficulty],
    1,
  );
  const projectedPrimaryEnergyKwh = Math.round(currentPrimaryEnergyKwh * factor);
  const projectedGrade =
    selectedActions.length === 0 ? currentGrade : gradeFromPrimaryEnergy(projectedPrimaryEnergyKwh);
  const totalMonthlySavingsManwon = selectedActions.reduce(
    (sum, action) => sum + action.monthlySavingsManwon,
    0,
  );

  return {
    currentGrade,
    projectedGrade,
    currentPrimaryEnergyKwh,
    projectedPrimaryEnergyKwh,
    reductionPercent: Math.round((1 - factor) * 100),
    totalMonthlySavingsManwon,
    source: "local",
  };
}

const VALID_GRADE_CODES = new Set<string>(GRADE_ORDER);

function isGradeCode(value: string | undefined): value is GradeCode {
  return value !== undefined && VALID_GRADE_CODES.has(value);
}

/**
 * Maps a beec `/api/simulate` response onto `WhatIfResult`. Returns `null`
 * when the response is missing fields this view needs (e.g. `found:false`,
 * or a grade code beec returned that isn't one of ours) — the caller should
 * fall back to `simulateWhatIfLocally` in that case.
 */
export function mapSimulateResponse(
  result: SimulateResult,
  totalMonthlySavingsManwon: number,
): WhatIfResult | null {
  if (
    !result.found ||
    result.baseEnergy === undefined ||
    result.energy === undefined ||
    result.savedPct === undefined ||
    !isGradeCode(result.gradeCodeBefore) ||
    !isGradeCode(result.gradeCode)
  ) {
    return null;
  }

  return {
    currentGrade: result.gradeCodeBefore,
    projectedGrade: result.gradeCode,
    currentPrimaryEnergyKwh: result.baseEnergy,
    projectedPrimaryEnergyKwh: result.energy,
    reductionPercent: result.savedPct,
    totalMonthlySavingsManwon,
    source: "beec",
  };
}
