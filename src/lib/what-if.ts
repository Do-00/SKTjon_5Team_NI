import { GRADE_ORDER, GRADES, type GradeCode } from "../data/grades";
import type { EcoAction, EcoActionDifficulty } from "../data/actions";

/**
 * What-if 시뮬레이터 계산 — 임시 로컬 버전.
 *
 * 팀 진행표에 따르면 실제 계산은 beec의 `/simulate`(항목별 곱셈 방식)가
 * 맡을 예정이지만, 아직 이 저장소에는 그 엔드포인트가 없다(git 이력에도
 * 없고 로컬 서버에도 404). 그래서 같은 모양 — 실천 항목마다 감소율을 곱해
 * 나가는 방식 — 으로 프론트를 먼저 만들어 두고, `/simulate`가 준비되면
 * `simulateWhatIf()` 안의 계산만 API 호출로 바꾸면 되도록 분리해 뒀다.
 */

/** 난이도별 1차에너지소요량 감소율(placeholder) — 실제 항목별 배율은 `/simulate`가 대체할 예정. */
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
}

function gradeFromPrimaryEnergy(kwh: number): GradeCode {
  return (
    GRADE_ORDER.find((code) => {
      const { minPrimaryEnergyKwh, maxPrimaryEnergyKwh } = GRADES[code];
      return kwh >= minPrimaryEnergyKwh && (maxPrimaryEnergyKwh === null || kwh < maxPrimaryEnergyKwh);
    }) ?? "7"
  );
}

/** 선택된 실천 항목을 적용했을 때의 예상 1차에너지소요량·등급을 계산한다. */
export function simulateWhatIf(
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
  };
}
