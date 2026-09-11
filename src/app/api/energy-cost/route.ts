import { NextResponse } from "next/server";
import { GRADES } from "@/src/data/grades";
import type { EnergyMetrics } from "@/src/lib/eco-api";

/**
 * Report figures beec doesn't provide yet (연간 난방비·절감 여지·탄소 배출·전부
 * 실천 시 절감액). Used to be a flat lookup keyed by grade alone — two
 * buildings with the same grade but very different sizes got identical
 * numbers. Now computed from the building's own 1차에너지소요량 × 연면적, so
 * it scales with the real data we actually have (`primaryEnergyKwh`,
 * `areaSqm`) instead of only its 10-bucket grade.
 *
 * The unit cost and emission factor below are demo constants, not a live
 * utility rate or an official figure — beec has no 요금·배출계수 endpoint, so
 * there's no "real" number to defer to. Chosen to land in a believable range
 * for Korean residential heating (blended 도시가스/전기 cost; 2021 전력 배출계수).
 */
const WON_PER_KWH = 110;
const KG_CO2_PER_KWH = 0.4781;
/** Reduction potential floor/ceiling so a near-perfect or very poor building still shows a sane percentage. */
const MIN_SAVINGS_POTENTIAL_PCT = 3;
const MAX_SAVINGS_POTENTIAL_PCT = 60;

const EXAMPLE_ENERGY_COST: Record<string, EnergyMetrics> = {
  "1+++": { annualEnergyCostManwon: 38, percentileRank: 5, annualCarbonEmissionTons: 1.0, annualSavingsPotentialManwon: 4 },
  "1++": { annualEnergyCostManwon: 52, percentileRank: 8, annualCarbonEmissionTons: 1.3, annualSavingsPotentialManwon: 8 },
  "1+": { annualEnergyCostManwon: 66, percentileRank: 12, annualCarbonEmissionTons: 1.7, annualSavingsPotentialManwon: 14 },
  "1": { annualEnergyCostManwon: 80, percentileRank: 16, annualCarbonEmissionTons: 2.0, annualSavingsPotentialManwon: 22 },
  "2": { annualEnergyCostManwon: 94, percentileRank: 20, annualCarbonEmissionTons: 2.4, annualSavingsPotentialManwon: 32 },
  "3": { annualEnergyCostManwon: 108, percentileRank: 24, annualCarbonEmissionTons: 2.8, annualSavingsPotentialManwon: 45 },
  "4": { annualEnergyCostManwon: 124, percentileRank: 28, annualCarbonEmissionTons: 3.2, annualSavingsPotentialManwon: 62 },
  "5": { annualEnergyCostManwon: 142, percentileRank: 31, annualCarbonEmissionTons: 3.6, annualSavingsPotentialManwon: 94 },
  "6": { annualEnergyCostManwon: 163, percentileRank: 38, annualCarbonEmissionTons: 4.1, annualSavingsPotentialManwon: 120 },
  "7": { annualEnergyCostManwon: 188, percentileRank: 45, annualCarbonEmissionTons: 4.7, annualSavingsPotentialManwon: 150 },
};

/** Falls back to the flat per-grade table when a building's own numbers aren't usable (missing/zero area, unknown grade). */
function fallback(gradeCode: string): EnergyMetrics {
  return EXAMPLE_ENERGY_COST[gradeCode] ?? EXAMPLE_ENERGY_COST["5"];
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const gradeCode = params.get("gradeCode") ?? "";
  const primaryEnergyKwh = Number(params.get("primaryEnergyKwh"));
  const areaSqm = Number(params.get("areaSqm"));

  if (!Number.isFinite(primaryEnergyKwh) || primaryEnergyKwh <= 0 || !Number.isFinite(areaSqm) || areaSqm <= 0) {
    return NextResponse.json(fallback(gradeCode));
  }

  const annualTotalKwh = primaryEnergyKwh * areaSqm;
  const annualEnergyCostManwon = Math.round((annualTotalKwh * WON_PER_KWH) / 10000);
  const annualCarbonEmissionTons = Math.round(((annualTotalKwh * KG_CO2_PER_KWH) / 1000) * 10) / 10;

  // 1+++ 등급 상한(60 kWh/m²·yr)까지 줄일 여지를 절감 여지(%)로 본다 — 지금
  // 얼마나 더 좋아질 수 있는지를 이 건물 자신의 숫자로 계산한다.
  const bestPossibleKwh = GRADES["1+++"].maxPrimaryEnergyKwh ?? 60;
  const rawPotentialPct = ((primaryEnergyKwh - bestPossibleKwh) / primaryEnergyKwh) * 100;
  const percentileRank = Math.round(
    Math.min(MAX_SAVINGS_POTENTIAL_PCT, Math.max(MIN_SAVINGS_POTENTIAL_PCT, rawPotentialPct)),
  );

  const annualSavingsPotentialManwon = Math.round((annualEnergyCostManwon * percentileRank) / 100);

  const metrics: EnergyMetrics = {
    annualEnergyCostManwon,
    percentileRank,
    annualCarbonEmissionTons,
    annualSavingsPotentialManwon,
  };
  return NextResponse.json(metrics);
}
