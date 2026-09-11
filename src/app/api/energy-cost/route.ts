import { NextResponse } from "next/server";
import type { EnergyMetrics } from "@/src/lib/eco-api";

/**
 * Example report figures beec doesn't provide yet (연간 난방비·절감 여지·
 * 탄소 배출·전부 실천 시 절감액), keyed by grade. This used to be answered by
 * MSW intercepting a request to beec's own origin — but that only works when
 * the browser successfully registers the mock Service Worker, which is
 * unreliable (some browsers/contexts block it outright), so the "개선 후"
 * tab and savings card would silently vanish whenever registration failed.
 * A real same-origin route handler always answers, no Service Worker needed.
 */
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

export async function GET(request: Request) {
  const gradeCode = new URL(request.url).searchParams.get("gradeCode") ?? "";
  const cost = EXAMPLE_ENERGY_COST[gradeCode] ?? EXAMPLE_ENERGY_COST["5"];
  return NextResponse.json(cost);
}
