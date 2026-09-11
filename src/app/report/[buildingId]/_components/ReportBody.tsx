"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AiRemodelReport, type AiRemodelReportProps } from "@/src/components/domain/AiRemodelReport";
import { Badge, ButtonLink, Card, Icon } from "@/src/components/ui";
import { getExampleEnergyCost } from "@/src/data/energy-cost";
import { fetchEnergyCost } from "@/src/lib/eco-api";
import { formatManwon } from "@/src/lib/format";
import { ReportOverview, type ReportMetrics, type ReportOverviewProps } from "./ReportOverview";

export interface ReportBodyProps {
  overview: Omit<ReportOverviewProps, "metrics">;
  /** Gemini 리모델링 리포트 입력 — `metrics`는 이 컴포넌트가 채운다. */
  remodel: Omit<AiRemodelReportProps, "metrics">;
  /** Fixture figures, for the one building that has a full report fixture. */
  initialMetrics: ReportMetrics | null;
  /**
   * Live beec matches and estimates have no figures server-side, so fetch the
   * example ones from `/api/energy-cost` in the browser, where MSW answers it
   * — or fall back to the same example table when MSW isn't running.
   */
  fetchLiveMetrics: boolean;
  /** Rendered between the AI remodel report and the savings card (the grade scale). */
  children?: ReactNode;
}

/**
 * Client part of the report page that owns the figures: fixture metrics are
 * passed straight through, live matches fetch theirs first. The AI remodel
 * report and the savings card wait for that fetch so they're generated from
 * the real figures rather than flashing the "준비 중" state.
 */
export function ReportBody({ overview, remodel, initialMetrics, fetchLiveMetrics, children }: ReportBodyProps) {
  const [metrics, setMetrics] = useState<ReportMetrics | null>(initialMetrics);
  const [ready, setReady] = useState(!fetchLiveMetrics);
  // AI 리모델링 리포트의 연간 절감 고정비. `undefined` = 아직 받는 중, `null` = 리포트가 계산하지 못함.
  const [remodelSavings, setRemodelSavings] = useState<number | null | undefined>(undefined);
  const { grade, primaryEnergyKwh, buildingId } = overview;

  useEffect(() => {
    if (!fetchLiveMetrics) return;
    let cancelled = false;
    fetchEnergyCost(grade, primaryEnergyKwh)
      .then((data) => {
        if (!cancelled) setMetrics(data);
      })
      .catch(() => {
        // MSW isn't running (service worker blocked, production build) — use the figures it would have served.
        if (!cancelled) setMetrics(getExampleEnergyCost(grade));
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchLiveMetrics, grade, primaryEnergyKwh]);

  return (
    <>
      <ReportOverview {...overview} metrics={metrics} />

      {ready ? (
        <AiRemodelReport
          {...remodel}
          metrics={metrics}
          onResult={(result) => setRemodelSavings(result.data.annualSavingsManwon)}
        />
      ) : null}

      {children}

      {!ready ? null : metrics ? (
        <Card
          tone="brand"
          padding="lg"
          className="flex flex-col items-start gap-[var(--space-5)] sm:flex-row sm:items-center"
        >
          <Icon name="coins" size={36} className="shrink-0 text-[var(--teal-700)]" />
          <div className="flex-1">
            <p className="text-[17px] text-[var(--teal-800)]">권장 조치를 모두 실천하면 연간</p>
            {remodelSavings === undefined ? (
              <div
                aria-label="절감액 계산 중"
                className="mt-[var(--space-1)] h-10 w-40 animate-pulse rounded bg-[var(--teal-100)]"
              />
            ) : (
              <p className="font-brand text-[34px] font-black leading-tight text-[var(--teal-700)]">
                {formatManwon(remodelSavings ?? metrics.annualSavingsPotentialManwon)} 절감
              </p>
            )}
          </div>
          <ButtonLink href={`/guide/${buildingId}`} size="lg" trailingIcon={<Icon name="arrow-right" size={22} />}>
            절감 하기 보기
          </ButtonLink>
        </Card>
      ) : (
        <Card tone="sunken" padding="lg" className="flex flex-col items-start gap-[var(--space-4)]">
          <Badge tone="brand">프로토타입 안내</Badge>
          <div className="flex flex-col gap-[var(--space-2)]">
            <h2 className="eco-heading">이 건물의 상세 성적표는 준비 중이에요</h2>
            <p className="max-w-[var(--width-reading)] text-[length:var(--text-body-size)] text-[var(--text-muted)]">
              현재 프로토타입에는 이 건물의 난방비·탄소 배출·주변 비교 데이터가 아직 연결되지 않았어요. 등급과 건물
              특성은 위에서 확인할 수 있고, 절감 하기는 바로 이용할 수 있어요.
            </p>
          </div>
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <ButtonLink href={`/guide/${buildingId}`} variant="primary">
              절감 하기 보기
            </ButtonLink>
            <ButtonLink href="/search" variant="ghost">
              다른 건물 검색하기
            </ButtonLink>
          </div>
        </Card>
      )}
    </>
  );
}
