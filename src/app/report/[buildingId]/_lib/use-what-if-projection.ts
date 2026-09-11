"use client";

import { useEffect, useMemo, useState } from "react";
import { getEcoActions, type EcoAction } from "@/src/data/actions";
import type { SimulateResult } from "@/src/lib/beec-client";
import { useChecklistStorage } from "@/src/lib/checklist-storage";
import { mapSimulateResponse, type WhatIfResult } from "@/src/lib/what-if";

/**
 * `/api/simulate`'s `purpose` only distinguishes "주거용" from anything else
 * (see `GradeTable.tableOf` — exact match on "주거용", else non-residential).
 * beec's live matches already send `useType` as exactly "주거용"/"주거용 이외",
 * but fixture buildings use descriptive labels like "공동주택" — normalize
 * those to "주거용" so they hit the right grade table.
 */
function toSimulatePurpose(useType: string): string {
  return useType === "주거용" || useType.includes("주택") ? "주거용" : useType;
}

/**
 * Reads the same 절감 하기 checklist (`useChecklistStorage`, shared
 * localStorage) this building has, and — if anything checked maps to a real
 * beec measure — calls `/api/simulate` so the report page's "개선 후" view
 * can show the actual projected grade/energy instead of a placeholder.
 */
export function useWhatIfProjection(
  buildingId: string,
  primaryEnergyKwh: number,
  useType: string,
) {
  const { completed } = useChecklistStorage(buildingId);
  const [actions, setActions] = useState<EcoAction[]>([]);

  useEffect(() => {
    let cancelled = false;
    getEcoActions().then((all) => {
      if (!cancelled) setActions(all);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const completedActions = useMemo(
    () => actions.filter((action) => completed[action.id]),
    [actions, completed],
  );
  const measureCodes = useMemo(
    () => completedActions.map((action) => action.measureCode).filter((code): code is string => Boolean(code)),
    [completedActions],
  );
  const totalMonthlySavingsManwon = useMemo(
    () => completedActions.reduce((sum, action) => sum + action.monthlySavingsManwon, 0),
    [completedActions],
  );

  const requestKey = measureCodes.length > 0 ? `${primaryEnergyKwh}|${measureCodes.join(",")}|${useType}` : null;
  const [remote, setRemote] = useState<{ key: string; result: WhatIfResult } | null>(null);

  useEffect(() => {
    if (requestKey === null) return;
    let cancelled = false;

    const params = new URLSearchParams({
      baseEnergy: String(primaryEnergyKwh),
      measures: measureCodes.join(","),
      purpose: toSimulatePurpose(useType),
    });

    fetch(`/api/simulate?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((data: SimulateResult) => {
        if (cancelled) return;
        const mapped = mapSimulateResponse(data, totalMonthlySavingsManwon);
        if (mapped) setRemote({ key: requestKey, result: mapped });
      })
      .catch(() => {
        // beec unreachable — the caller falls back to its placeholder copy.
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const result = requestKey !== null && remote?.key === requestKey ? remote.result : null;

  return {
    selectedCount: completedActions.length,
    result,
  };
}
