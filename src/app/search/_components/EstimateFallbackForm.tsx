"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Badge, Button, Card, Select } from "@/src/components/ui";
import { EnergyGradeBadge } from "@/src/components/domain";
import { GRADE_ORDER, GRADES } from "@/src/data/grades";
import {
  PURPOSE_OPTIONS,
  REGION_OPTIONS,
  SIZE_BUCKET_OPTIONS,
  toGradeCode,
  type ReportEstimate,
  type SizeBucket,
} from "@/src/lib/beec-client";
import { formatNumber } from "@/src/lib/format";

export interface EstimateFallbackFormProps {
  /** Pre-fills nothing directly, just shown above the form so the flow reads as a continuation of the failed address search. */
  query: string;
}

type Status = "idle" | "loading" | "done" | "error";

/**
 * Step 3 of the plan's address-matching flow: when `/api/match` returns
 * `found:false`, the user picks 용도·지역·규모 and this calls `/api/report`
 * (via the `/api/estimate-report` relay) for a group-level estimated grade —
 * there's no exact building, just a statistical stand-in.
 */
export function EstimateFallbackForm({ query }: EstimateFallbackFormProps) {
  const [purpose, setPurpose] = useState(PURPOSE_OPTIONS[0].value);
  const [region, setRegion] = useState(REGION_OPTIONS[0]);
  const [sizeBucket, setSizeBucket] = useState<SizeBucket>(SIZE_BUCKET_OPTIONS[0].value);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ReportEstimate | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setResult(null);

    try {
      const params = new URLSearchParams({ purpose, region, sizeBucket });
      const res = await fetch(`/api/estimate-report?${params.toString()}`);
      const data = (await res.json()) as ReportEstimate;
      setResult(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const estimatedGradeCode = result?.estimatedGrade ? toGradeCode(result.estimatedGrade) : null;

  return (
    <Card padding="lg" className="flex flex-col gap-[var(--space-5)]">
      <div className="flex flex-col gap-[var(--space-1)]">
        <h2 className="eco-heading">
          &lsquo;{query}&rsquo;에 대한 실측 데이터가 없어요
        </h2>
        <p className="text-[length:var(--text-body-size)] text-[var(--text-muted)]">
          용도·지역·규모를 알려주시면 비슷한 건물들의 통계로 등급을 추정해 드려요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3 sm:items-end"
      >
        <Select
          label="용도"
          options={[...PURPOSE_OPTIONS]}
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
        />
        <Select
          label="지역"
          options={REGION_OPTIONS.map((value) => ({ value, label: value }))}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        />
        <Select
          label="규모"
          options={[...SIZE_BUCKET_OPTIONS]}
          value={sizeBucket}
          onChange={(event) => setSizeBucket(event.target.value as SizeBucket)}
        />
        <Button type="submit" variant="primary" loading={status === "loading"} className="sm:col-span-3">
          등급 추정하기
        </Button>
      </form>

      {status === "error" ? (
        <p role="alert" className="text-[length:var(--text-body-size)] text-[var(--status-danger)]">
          추정 서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      ) : null}

      {status === "done" && result ? (
        result.found && estimatedGradeCode ? (
          <div className="flex flex-col gap-[var(--space-4)] border-t border-[var(--border-subtle)] pt-[var(--space-4)]">
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              <EnergyGradeBadge grade={estimatedGradeCode} size="md" caption="추정 등급" />
              <div className="flex flex-col gap-[var(--space-1)]">
                <p className="text-[length:var(--text-body-size)] text-[var(--text-body)]">
                  같은 조건의 건물 {formatNumber(result.sampleCount ?? 0)}건을 기준으로 추정했어요.
                </p>
                {result.lowSample ? <Badge tone="caution">표본 적음 · 참고용</Badge> : null}
              </div>
            </div>

            {result.gradeDistribution ? (
              <dl className="grid grid-cols-2 gap-x-[var(--space-6)] gap-y-[var(--space-2)] sm:grid-cols-5">
                {GRADE_ORDER.map((code) => {
                  const count = result.gradeDistribution?.[GRADES[code].label] ?? 0;
                  return (
                    <div key={code} className="flex flex-col gap-0.5">
                      <dt
                        className={
                          code === estimatedGradeCode
                            ? "text-[13px] font-bold text-[var(--teal-700)]"
                            : "text-[13px] text-[var(--text-muted)]"
                        }
                      >
                        {GRADES[code].label}
                      </dt>
                      <dd className="text-[15px] font-bold text-[var(--text-strong)]">
                        {formatNumber(count)}건
                      </dd>
                    </div>
                  );
                })}
              </dl>
            ) : null}
          </div>
        ) : (
          <p className="border-t border-[var(--border-subtle)] pt-[var(--space-4)] text-[length:var(--text-body-size)] text-[var(--text-muted)]">
            {result.message ?? "해당 조건의 데이터가 없어요."}
          </p>
        )
      ) : null}
    </Card>
  );
}
