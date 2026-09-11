"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { EcoAction } from "@/src/data/actions";
import type { GradeCode } from "@/src/data/grades";
import type { SimulateResult } from "@/src/lib/beec-client";
import { ActionItem } from "@/src/components/domain/ActionItem";
import { SectionHeader } from "@/src/components/layout/SectionHeader";
import { ButtonLink, Card, Checkbox, Icon, Notice, RadioGroup, Select } from "@/src/components/ui";
import { mapSimulateResponse, simulateWhatIfLocally, type WhatIfResult } from "@/src/lib/what-if";
import { useChecklistStorage } from "@/src/lib/checklist-storage";
import {
  AUDIENCE_OPTIONS,
  BUDGET_OPTIONS,
  DEFAULT_GUIDE_FILTER_STATE,
  filterActions,
  type AudienceFilter,
  type BudgetFilter,
  type GuideFilterState,
} from "../_lib/guide-filters";
import { WhatIfSimulator } from "./WhatIfSimulator";

export interface GuideChecklistProps {
  buildingId: string;
  actions: EcoAction[];
  currentGrade: GradeCode;
  currentPrimaryEnergyKwh: number;
}

/**
 * Client island: the user-type/budget/support filter card beside the list
 * of matching actions, whose completion state persists to guarded
 * `localStorage` (see `useChecklistStorage`). Everything else on the guide
 * page is a plain Server Component.
 */
export function GuideChecklist({
  buildingId,
  actions,
  currentGrade,
  currentPrimaryEnergyKwh,
}: GuideChecklistProps) {
  const [filters, setFilters] = useState<GuideFilterState>(DEFAULT_GUIDE_FILTER_STATE);
  const { completed, toggle, hydrated } = useChecklistStorage(buildingId);
  const budgetSelectId = useId();
  const progressId = useId();

  const filteredActions = useMemo(() => filterActions(actions, filters), [actions, filters]);
  const completedActions = useMemo(
    () => actions.filter((action) => completed[action.id]),
    [actions, completed],
  );
  const completedCount = completedActions.length;
  const measureCodes = useMemo(
    () => completedActions.map((action) => action.measureCode).filter((code): code is string => Boolean(code)),
    [completedActions],
  );
  const totalMonthlySavingsManwon = useMemo(
    () => completedActions.reduce((sum, action) => sum + action.monthlySavingsManwon, 0),
    [completedActions],
  );
  const localResult = useMemo(
    () => simulateWhatIfLocally(currentPrimaryEnergyKwh, currentGrade, completedActions),
    [currentPrimaryEnergyKwh, currentGrade, completedActions],
  );

  // Only beec's real /api/simulate can tell us the grade impact of the
  // checked measures — no measureCode selected means nothing to ask it, so
  // `requestKey` stays null and the local estimate is used untouched.
  const requestKey = measureCodes.length > 0 ? `${currentPrimaryEnergyKwh}|${measureCodes.join(",")}` : null;
  const [remote, setRemote] = useState<{ key: string; result: WhatIfResult } | null>(null);

  useEffect(() => {
    if (requestKey === null) return;
    let cancelled = false;

    const params = new URLSearchParams({
      baseEnergy: String(currentPrimaryEnergyKwh),
      measures: measureCodes.join(","),
      purpose: "주거용",
    });

    fetch(`/api/simulate?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((data: SimulateResult) => {
        if (cancelled) return;
        const mapped = mapSimulateResponse(data, totalMonthlySavingsManwon, currentGrade);
        if (mapped) setRemote({ key: requestKey, result: mapped });
      })
      .catch(() => {
        // beec unreachable or errored — stay on the local estimate below.
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const whatIfResult = requestKey !== null && remote?.key === requestKey ? remote.result : localResult;

  return (
    <div className="grid grid-cols-1 items-start gap-[var(--space-6)] lg:grid-cols-[360px_minmax(0,1fr)]">
      <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
        <div className="flex flex-col gap-[var(--space-1)]">
          <h2 className="font-brand text-[22px] font-black text-[var(--text-strong)]">사용자 유형</h2>
          <p className="text-[16px] leading-[1.6] text-[var(--text-muted)]">유형에 따라 안내하는 조치가 달라집니다.</p>
        </div>

        <RadioGroup
          variant="card"
          aria-label="사용자 유형"
          value={filters.audience}
          onValueChange={(value) =>
            setFilters((current) => ({ ...current, audience: value as AudienceFilter }))
          }
          options={AUDIENCE_OPTIONS}
        />

        <div aria-hidden="true" className="h-px bg-[var(--border-subtle)]" />

        <Select
          id={budgetSelectId}
          label="예산 범위"
          value={filters.budget}
          onChange={(event) =>
            setFilters((current) => ({ ...current, budget: event.target.value as BudgetFilter }))
          }
          options={BUDGET_OPTIONS}
        />

        <Checkbox
          label="지원사업 대상만 보기"
          checked={filters.supportOnly}
          onChange={(event) =>
            setFilters((current) => ({ ...current, supportOnly: event.target.checked }))
          }
        />
      </Card>

      <div className="flex min-w-0 flex-col gap-[var(--space-5)]">
        <WhatIfSimulator buildingId={buildingId} result={whatIfResult} selectedCount={completedCount} />

        <div className="flex flex-col gap-[var(--space-2)]">
          <SectionHeader title="맞춤 절감 하기" hint={`${filteredActions.length}개 조치 · 난이도순`} />
          <p
            id={progressId}
            aria-live="polite"
            className="text-[length:var(--text-label-size)] font-bold text-[var(--text-muted)]"
          >
            전체 {actions.length}개 중 {completedCount}개 완료
            {!hydrated ? <span className="sr-only"> (저장된 완료 기록을 불러오는 중)</span> : null}
          </p>
        </div>

        {filteredActions.length === 0 ? (
          <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] p-[var(--pad-card)] text-center text-[length:var(--text-body-size)] text-[var(--text-muted)]">
            조건에 맞는 조치가 없어요. 필터를 조정해 보세요.
          </p>
        ) : (
          <ol className="flex flex-col gap-[var(--space-3)]" aria-describedby={progressId}>
            {filteredActions.map((action) => (
              <li key={action.id}>
                <ActionItem action={action} done={Boolean(completed[action.id])} onToggle={toggle} />
              </li>
            ))}
          </ol>
        )}

        {filters.audience === "tenant" ? (
          <Notice tone="info" role="status">
            임차인은 공사가 필요한 조치를 직접 신청할 수 없습니다. 소유주와 함께 신청하는 사업을 확인해 보세요.
          </Notice>
        ) : null}

        <div className="flex justify-end">
          <ButtonLink
            href="/programs"
            variant="outline"
            size="lg"
            trailingIcon={<Icon name="arrow-right" size={22} />}
          >
            지원사업 매칭 보기
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
