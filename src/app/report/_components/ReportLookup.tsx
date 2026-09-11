"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { SectionHeader } from "@/src/components/layout/SectionHeader";
import { Badge, Button, ButtonLink, Card, Icon, Notice, RadioGroup, Select } from "@/src/components/ui";
import { PRIMARY_ENERGY_UNIT, parseGradeLabel } from "@/src/data/grades";
import {
  PURPOSES,
  REGIONS,
  SIZE_BUCKET_OPTIONS,
  fetchEstimate,
  fetchMatch,
  getSizeBucketLabel,
  toGradeDistribution,
  toRegion,
  type EstimateFound,
  type EstimateQuery,
  type MatchFound,
  type Purpose,
  type Region,
  type SizeBucket,
} from "@/src/lib/energy-api";
import { formatNumber } from "@/src/lib/format";
import { GradeDistributionChart } from "./grade-distribution-chart";
import { GradeScaleCard } from "./GradeScaleCard";
import { ReportOverview } from "./ReportOverview";

export interface ReportLookupProps {
  jibunAddress?: string;
  roadAddress?: string;
  buildingName?: string;
  /** Kakao `sido`, used to pre-select the region for an estimate. */
  sido?: string;
  isApartment: boolean;
  savePath: string;
}

type MatchState =
  | { status: "loading" }
  | { status: "found"; data: MatchFound }
  | { status: "notFound" }
  | { status: "error"; message: string };

type EstimateState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; query: EstimateQuery; data: EstimateFound }
  | { status: "notFound"; message: string }
  | { status: "error"; message: string };

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "알 수 없는 오류가 발생했어요.";
}

/**
 * Looks an address up against the energy-grade API:
 * 1. `GET /api/match` — certified building found → show its measured grade.
 * 2. Not found → ask for region/purpose/size, then `GET /api/report` for an
 *    estimated grade from similar buildings.
 * 3. No data either way → point to the search result list.
 */
export function ReportLookup({
  jibunAddress,
  roadAddress,
  buildingName,
  sido,
  isApartment,
  savePath,
}: ReportLookupProps) {
  const [match, setMatch] = useState<MatchState>({ status: "loading" });
  const [matchAttempt, setMatchAttempt] = useState(0);
  const [estimate, setEstimate] = useState<EstimateState>({ status: "idle" });

  const address = roadAddress ?? jibunAddress ?? "";
  const searchHref = `/search?q=${encodeURIComponent(address)}`;

  useEffect(() => {
    const controller = new AbortController();
    fetchMatch({ jibunAddress, roadAddress, buildingName }, controller.signal)
      .then((result) => setMatch(result.found ? { status: "found", data: result } : { status: "notFound" }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setMatch({ status: "error", message: toErrorMessage(error) });
        }
      });
    return () => controller.abort();
  }, [jibunAddress, roadAddress, buildingName, matchAttempt]);

  function retryMatch() {
    setMatch({ status: "loading" });
    setMatchAttempt((attempt) => attempt + 1);
  }

  async function runEstimate(query: EstimateQuery) {
    setEstimate({ status: "loading" });
    try {
      const result = await fetchEstimate(query);
      setEstimate(
        result.found
          ? { status: "found", query, data: result }
          : { status: "notFound", message: result.message ?? "해당 조건의 데이터가 없습니다." },
      );
    } catch (error) {
      setEstimate({ status: "error", message: toErrorMessage(error) });
    }
  }

  return (
    <div className="flex flex-col gap-[var(--space-6)]">
      <SectionHeader as="h1" title="에너지 성적표" hint={address} hintSize="sm" />

      {match.status === "loading" ? <LookupSkeleton /> : null}

      {match.status === "error" ? (
        <LookupFallback
          tone="danger"
          message={`성적표 서버에 연결하지 못했어요. (${match.message})`}
          onRetry={retryMatch}
          searchHref={searchHref}
        />
      ) : null}

      {match.status === "found" ? (
        <MatchedReport data={match.data} address={address} savePath={savePath} />
      ) : null}

      {match.status === "notFound" ? (
        <>
          <Notice tone="info">
            에너지효율등급 인증 이력에서 이 건물을 찾지 못했어요. 지역·용도·규모를 알려주시면 같은 조건 건물들의 인증
            데이터로 등급을 추정해 드려요.
          </Notice>
          <EstimateForm
            defaultRegion={toRegion(sido)}
            defaultPurpose={isApartment ? "주거용" : undefined}
            loading={estimate.status === "loading"}
            onSubmit={runEstimate}
          />
          {estimate.status === "found" ? (
            <EstimatedReport
              query={estimate.query}
              data={estimate.data}
              address={address}
              buildingName={buildingName}
              savePath={savePath}
            />
          ) : null}
          {estimate.status === "notFound" ? (
            <LookupFallback
              tone="warn"
              message={`${estimate.message} 조건을 바꿔 다시 확인하거나 검색 결과 목록에서 비슷한 건물을 찾아보세요.`}
              searchHref={searchHref}
            />
          ) : null}
          {estimate.status === "error" ? (
            <LookupFallback
              tone="danger"
              message={`추정 등급을 불러오지 못했어요. (${estimate.message})`}
              searchHref={searchHref}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function MatchedReport({ data, address, savePath }: { data: MatchFound; address: string; savePath: string }) {
  const grade = parseGradeLabel(data.grade);
  if (!grade) {
    return <Notice tone="danger">서버가 알 수 없는 등급 값을 보냈어요: {data.grade}</Notice>;
  }

  return (
    <>
      <ReportOverview
        titleAs="h2"
        savePath={savePath}
        buildingName={data.name}
        metaLine={`${data.region} · ${data.purpose}`}
        address={address}
        grade={grade}
        isEstimated={false}
        caption={data.certKind}
        basisTitle="인증 정보"
        basisRows={[
          { icon: "map-pin", label: "지역", value: data.region },
          { icon: "building", label: "용도", value: data.purpose },
          { icon: "gauge", label: "1차에너지소요량", value: `${formatNumber(data.energyValue)} ${PRIMARY_ENERGY_UNIT}` },
          { icon: "key", label: "인증 구분", value: data.certKind },
        ]}
        metrics={null}
      />
      <GradeScaleCard grade={grade} />
    </>
  );
}

function EstimatedReport({
  query,
  data,
  address,
  buildingName,
  savePath,
}: {
  query: EstimateQuery;
  data: EstimateFound;
  address: string;
  buildingName?: string;
  savePath: string;
}) {
  const grade = parseGradeLabel(data.estimatedGrade);
  if (!grade) {
    return <Notice tone="danger">서버가 알 수 없는 등급 값을 보냈어요: {data.estimatedGrade}</Notice>;
  }

  const sizeLabel = getSizeBucketLabel(query.sizeBucket);
  const conditionLabel = `${query.region} · ${query.purpose} · ${sizeLabel}`;

  return (
    <>
      <Notice tone="warn">
        {data.lowSample ? (
          <Badge tone="caution" className="mr-[var(--space-2)]">
            참고용
          </Badge>
        ) : null}
        같은 조건 건물 {formatNumber(data.sampleCount)}건의 인증 데이터로 추정한 등급입니다.
        {data.lowSample ? " 표본이 적어 참고용으로만 봐 주세요." : ""}
      </Notice>
      <ReportOverview
        titleAs="h2"
        savePath={savePath}
        buildingName={buildingName ?? "선택한 건물"}
        metaLine={conditionLabel}
        address={address}
        grade={grade}
        isEstimated
        basisTitle="추정 근거"
        basisRows={[
          { icon: "map-pin", label: "지역", value: query.region },
          { icon: "building", label: "용도", value: query.purpose },
          { icon: "home", label: "규모", value: sizeLabel },
          { icon: "users", label: "비교 표본", value: `${formatNumber(data.sampleCount)}건` },
        ]}
        metrics={null}
      />
      <GradeDistributionChart
        entries={toGradeDistribution(data.gradeDistribution, grade)}
        idPrefix="estimate"
        areaLabel={conditionLabel}
        eyebrow="추정 근거"
        title="같은 조건 건물의 등급 분포"
        peerNoun="같은 조건 건물"
      />
      <GradeScaleCard grade={grade} />
    </>
  );
}

function EstimateForm({
  defaultRegion,
  defaultPurpose,
  loading,
  onSubmit,
}: {
  defaultRegion?: Region;
  defaultPurpose?: Purpose;
  loading: boolean;
  onSubmit: (query: EstimateQuery) => void;
}) {
  const [region, setRegion] = useState<Region | "">(defaultRegion ?? "");
  const [purpose, setPurpose] = useState<Purpose | "">(defaultPurpose ?? "");
  const [sizeBucket, setSizeBucket] = useState<SizeBucket | "">("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (region && purpose && sizeBucket) {
      onSubmit({ region, purpose, sizeBucket });
    }
  }

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit} aria-labelledby="estimate-form-title" className="flex flex-col gap-[var(--space-5)]">
        <h2 id="estimate-form-title" className="eco-subhead">
          건물 정보 입력
        </h2>
        <div className="grid grid-cols-1 gap-[var(--space-5)] md:grid-cols-2">
          <Select
            label="지역"
            placeholder="시·도 선택"
            options={REGIONS.map((value) => ({ value, label: value }))}
            value={region}
            onChange={(event) => setRegion(event.target.value as Region)}
          />
          <Select
            label="규모"
            placeholder="건물 규모 선택"
            options={SIZE_BUCKET_OPTIONS}
            value={sizeBucket}
            onChange={(event) => setSizeBucket(event.target.value as SizeBucket)}
          />
        </div>
        <RadioGroup
          legend="용도"
          variant="card"
          orientation="horizontal"
          options={PURPOSES.map((value) => ({ value, label: value }))}
          value={purpose}
          onValueChange={(value) => setPurpose(value as Purpose)}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!region || !purpose || !sizeBucket}
          className="self-start"
          trailingIcon={<Icon name="arrow-right" size={22} />}
        >
          추정 등급 확인하기
        </Button>
      </form>
    </Card>
  );
}

function LookupFallback({
  tone,
  message,
  onRetry,
  searchHref,
}: {
  tone: "warn" | "danger";
  message: string;
  onRetry?: () => void;
  searchHref: string;
}) {
  return (
    <Card tone="sunken" padding="lg" className="flex flex-col items-start gap-[var(--space-4)]">
      <Notice tone={tone}>{message}</Notice>
      <div className="flex flex-wrap gap-[var(--space-3)]">
        {onRetry ? (
          <Button variant="primary" onClick={onRetry}>
            다시 시도
          </Button>
        ) : null}
        <ButtonLink href={searchHref} variant="ghost">
          검색 결과 목록 보기
        </ButtonLink>
      </div>
    </Card>
  );
}

function LookupSkeleton() {
  return (
    <div aria-busy="true" className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-[420px_minmax(0,1fr)]">
      <span role="status" className="sr-only">
        인증 이력을 조회하는 중입니다.
      </span>
      <div className="h-[420px] animate-pulse rounded-[var(--radius-lg)] bg-[var(--surface-sunken)]" />
      <div className="h-64 animate-pulse rounded-[var(--radius-lg)] bg-[var(--surface-sunken)]" />
    </div>
  );
}
