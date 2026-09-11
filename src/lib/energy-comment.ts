import { GRADES, type GradeCode } from "../data/grades";

/**
 * Gemini Flash 연동을 위한 프롬프트/폴백 로직.
 *
 * 등급 숫자는 `src/data/grades.ts`/`src/data/buildings.ts`의 규칙·통계 기반
 * 데이터가 이미 계산해둔 값이고, 여기서는 그 결과를 "현재 등급 평가 + 절감
 * 방향" 한마디로 설명하는 역할만 맡긴다 — AI가 등급 자체를 새로 판단하지
 * 않도록 프롬프트에는 계산된 값만 근거로 넘긴다.
 */

export interface EnergyCommentMetrics {
  annualEnergyCostManwon: number;
  percentileRank: number;
  annualCarbonEmissionTons: number;
  annualSavingsPotentialManwon: number;
}

export interface EnergyCommentInput {
  buildingName: string;
  address: string;
  completionYear: number;
  useType: string;
  areaSqm: number;
  grade: GradeCode;
  isEstimated: boolean;
  primaryEnergyKwh: number;
  /** 상세 성적표 수치가 아직 없는 건물(프로토타입 안내 상태)이면 `null`. */
  metrics: EnergyCommentMetrics | null;
}

export function buildEnergyCommentPrompt(input: EnergyCommentInput): string {
  const gradeLabel = GRADES[input.grade].label;

  const lines = [
    "당신은 에너지 효율 컨설턴트입니다. 아래 건물 정보만 근거로, 사용자에게 보여줄",
    '"현재 등급 평가 + 절감 방향" 한마디를 한국어 존댓말 2문장 이내로 작성하세요.',
    "새로운 숫자를 만들어내지 말고 주어진 값만 언급하세요. 코멘트 텍스트만 출력하세요",
    "(따옴표, 접두어, 마크다운 없이).",
    "",
    `- 건물명: ${input.buildingName}`,
    `- 주소: ${input.address}`,
    `- 준공 연도: ${input.completionYear}년`,
    `- 용도: ${input.useType}`,
    `- 연면적: ${input.areaSqm}㎡`,
    `- 등급 산정 방식: ${input.isEstimated ? "공공데이터 기반 추정 등급" : "한국에너지공단 인증 등급"}`,
    `- 현재 등급: ${gradeLabel} (1차에너지소요량 ${input.primaryEnergyKwh}kWh/㎡·yr)`,
  ];

  if (input.metrics) {
    lines.push(
      `- 연간 난방비: 약 ${input.metrics.annualEnergyCostManwon}만원`,
      `- 절감 여지: ${input.metrics.percentileRank}%`,
      `- 연간 탄소 배출: ${input.metrics.annualCarbonEmissionTons} tCO₂`,
      `- 권장 조치를 모두 실천할 경우 연간 절감액: 약 ${input.metrics.annualSavingsPotentialManwon}만원`,
    );
  }

  return lines.join("\n");
}

/** Gemini 호출이 실패하거나 API 키가 없을 때 대신 보여줄 규칙 기반 한마디. */
export function fallbackEnergyComment(input: EnergyCommentInput): string {
  const gradeLabel = GRADES[input.grade].label;

  if (input.metrics) {
    return `현재 ${gradeLabel}으로, 권장 조치를 모두 실천하면 연간 약 ${input.metrics.annualSavingsPotentialManwon}만원까지 절감할 수 있어요.`;
  }

  return `현재 ${gradeLabel}으로 평가됐어요. 절감 하기에서 우리 집에 맞는 실천 항목을 확인해보세요.`;
}
