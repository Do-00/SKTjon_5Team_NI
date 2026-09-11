"use client";

import { Badge, Card, Icon } from "@/src/components/ui";
import { EnergyGradeBadge } from "@/src/components/domain";
import type { WhatIfResult } from "@/src/lib/what-if";
import { formatManwon, formatNumber } from "@/src/lib/format";

export interface WhatIfSimulatorProps {
  result: WhatIfResult;
  selectedCount: number;
}

/**
 * What-if 시뮬레이터 카드: 체크한 실천 항목을 적용하면 등급/1차에너지소요량이
 * 어떻게 바뀌는지 보여준다. 팀 진행표의 `/simulate`(항목별 곱셈) 백엔드가
 * 아직 이 저장소에 없어서, 지금은 `src/lib/what-if.ts`의 로컬 추정치를
 * 쓴다 — "데모용 추정치" 배지로 그 사실을 분명히 표시한다.
 */
export function WhatIfSimulator({ result, selectedCount }: WhatIfSimulatorProps) {
  const {
    currentGrade,
    projectedGrade,
    currentPrimaryEnergyKwh,
    projectedPrimaryEnergyKwh,
    reductionPercent,
    totalMonthlySavingsManwon,
  } = result;
  const improved = selectedCount > 0 && projectedGrade !== currentGrade;

  return (
    <Card tone="brand" padding="lg" className="flex flex-col gap-[var(--space-4)]">
      <div className="flex flex-wrap items-center justify-between gap-[var(--space-2)]">
        <div className="flex items-center gap-[var(--space-2)]">
          <Icon name="gauge" size={22} className="text-[var(--teal-700)]" />
          <h2 className="eco-heading">What-if 시뮬레이터</h2>
        </div>
        <Badge tone="caution">데모용 추정치</Badge>
      </div>

      {selectedCount === 0 ? (
        <p className="text-[length:var(--text-body-size)] text-[var(--text-muted)]">
          아래 실천 항목을 체크하면 등급이 어떻게 바뀌는지 바로 보여드려요.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-[var(--space-4)]">
            <EnergyGradeBadge grade={currentGrade} size="md" caption="현재" />
            <Icon name="arrow-right" size={24} className="text-[var(--text-muted)]" />
            <EnergyGradeBadge grade={projectedGrade} size="md" caption="적용 후" />
            <div className="flex flex-col gap-1">
              <p className="text-[length:var(--text-body-size)] font-bold text-[var(--text-strong)]">
                {improved
                  ? `${selectedCount}개 항목 적용 시 ${currentGrade}등급 → ${projectedGrade}등급`
                  : `${selectedCount}개 항목 적용 — 등급 변화는 아직 없어요`}
              </p>
              <p className="text-[length:var(--text-caption-size)] text-[var(--text-muted)]">
                1차에너지소요량 {formatNumber(currentPrimaryEnergyKwh)} → {formatNumber(projectedPrimaryEnergyKwh)}{" "}
                kWh/㎡·yr (▼{reductionPercent}%)
              </p>
            </div>
          </div>

          <p className="text-[length:var(--text-body-size)] text-[var(--text-body)]">
            예상 절감액 월 <strong className="text-[var(--teal-700)]">{formatManwon(totalMonthlySavingsManwon)}</strong>
          </p>
        </>
      )}
    </Card>
  );
}
