import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { Card, Notice } from "@/src/components/ui";
import { GradeScale } from "@/src/components/domain";
import { DistrictMap } from "@/src/components/domain/DistrictMap";
import districtCoords from "@/src/data/district-coords.json";
import { getBuildingById, type ApartmentReportInfo, type BuildingSummary, type LiveMatchInfo } from "@/src/data/buildings";
import { getEcoCheckReport } from "@/src/data/account";
import { PRIMARY_ENERGY_UNIT } from "@/src/data/grades";
import { formatNumber } from "@/src/lib/format";
import { HEATING_TYPE_OPTIONS, readApartmentChecklistParams } from "@/src/lib/apartment-checklist";
import type { BasisRow } from "./_components/ReportOverview";
import { ReportBody } from "./_components/ReportBody";

/** `?bn=` carries the Kakao 건물명 on older links whose id doesn't have it packed in. */
function readBuildingName(raw: string | string[] | undefined): string | undefined {
  const value = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  return value ? value : undefined;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/report/[buildingId]">): Promise<Metadata> {
  const { buildingId } = await params;
  const building = await getBuildingById(buildingId, readBuildingName((await searchParams).bn));
  return { title: building ? `${building.name} 에너지 성적표` : "건물을 찾을 수 없어요" };
}

/** Rows for the "추정 근거" card, sourced from the building fixture (placeholders for estimates). */
function buildBasisRows(building: BuildingSummary): BasisRow[] {
  const latestCert = building.certificationHistory.at(-1);
  return [
    { icon: "calendar", label: "준공 연도", value: `${building.completionYear}년` },
    { icon: "building", label: "구조·용도", value: `${building.structureType} · ${building.useType}` },
    { icon: "wind", label: "단열 기준", value: building.insulationStandard },
    { icon: "home", label: "연면적", value: `${formatNumber(building.areaSqm)}㎡` },
    { icon: "thermometer", label: "난방 방식", value: building.heatingType },
    {
      icon: "key",
      label: "인증 이력",
      value: latestCert ? `${latestCert.issuer} · ${latestCert.certId}` : "없음",
    },
  ];
}

/** Rows for a live beec match — only what `/api/match` returned, no placeholders. */
function buildLiveBasisRows(live: LiveMatchInfo): BasisRow[] {
  const rows: BasisRow[] = [
    { icon: "map-pin", label: "지역", value: [live.region, live.district].filter(Boolean).join(" ") || "정보 없음" },
    { icon: "building", label: "용도", value: live.purpose || "정보 없음" },
    { icon: "gauge", label: "에너지 등급", value: live.gradeLabel || "정보 없음" },
    {
      icon: "trending-down",
      label: "1차에너지소요량",
      value: live.energyValue === null ? "정보 없음" : `${formatNumber(live.energyValue)} ${PRIMARY_ENERGY_UNIT}`,
    },
  ];

  // 인증서 등급은 발급 당시 고시 기준입니다. 위에 보이는 등급은 현행 기준표로 다시
  // 계산한 값이라 서로 다를 수 있고, 다를 때만 따로 적어 줍니다.
  if (live.certGradeLabel && live.certGradeLabel !== live.gradeLabel) {
    rows.push({
      icon: "key",
      label: "인증서 기재 등급",
      value: `${live.certGradeLabel} (발급 당시 기준)`,
    });
  }

  rows.push({ icon: "badge-check", label: "인증 구분", value: live.certKind || "인증 이력 없음" });
  return rows;
}

/** Rows for an `/api/apt/{aptCode}` match — real facts from the 서울 아파트 dataset, not placeholders. */
function buildApartmentBasisRows(apt: ApartmentReportInfo, primaryEnergyKwh: number, completionYear: number): BasisRow[] {
  const rows: BasisRow[] = [
    { icon: "map-pin", label: "지역", value: [apt.sgg, apt.emd].filter(Boolean).join(" ") || "정보 없음" },
    { icon: "calendar", label: "준공연도", value: `${completionYear}년` },
    {
      icon: "trending-down",
      label: "1차에너지소요량",
      value: `${formatNumber(primaryEnergyKwh)} ${PRIMARY_ENERGY_UNIT}`,
    },
  ];
  if (apt.builder) rows.push({ icon: "building", label: "건설사", value: apt.builder });
  if (apt.households !== null) rows.push({ icon: "home", label: "세대수", value: `${formatNumber(apt.households)}세대` });
  if (apt.heatingType) rows.push({ icon: "thermometer", label: "난방 방식", value: apt.heatingType });
  if (apt.insulationEra) rows.push({ icon: "wind", label: "적용 단열기준", value: apt.insulationEra });

  const sourceLabel: Record<ApartmentReportInfo["source"], string> = {
    measured: "인증 실적(실측)",
    "estimated-point": "또래 단지 기반 추정",
    "estimated-range": "또래 단지 기반 추정(범위)",
    unknown: "추정 불가",
  };
  rows.push({ icon: "key", label: "데이터 근거", value: sourceLabel[apt.source] });

  return rows;
}

/** Rows for the "직접 입력한 집 정보" card — from the home hero's apartment checklist, via query params. */
function buildChecklistRows(checklist: NonNullable<ReturnType<typeof readApartmentChecklistParams>>): BasisRow[] {
  const rows: BasisRow[] = [];
  if (checklist.completionYear !== null) {
    rows.push({ icon: "calendar", label: "준공연도", value: `${checklist.completionYear}년` });
  }
  if (checklist.builder) {
    rows.push({ icon: "building", label: "건설사", value: checklist.builder });
  }
  if (checklist.heatingType) {
    const option = HEATING_TYPE_OPTIONS.find((candidate) => candidate.value === checklist.heatingType);
    rows.push({ icon: "thermometer", label: "난방 방식", value: option?.label ?? checklist.heatingType });
  }
  return rows;
}

/**
 * Server shell for a building's energy report. Fixture buildings render
 * their fixture figures; live beec matches (`addr-…` ids from the home or
 * `/search`) render the `/api/match` fields; estimates (`est-…` ids from
 * `/search`'s 등급 추정 form) render the same "추정 근거" card as a fixture.
 * `ReportBody` fetches heating-cost figures in the browser for both live
 * matches and estimates (MSW mock, or the same example table without it).
 */
export default async function ReportPage({ params, searchParams }: PageProps<"/report/[buildingId]">) {
  const { buildingId } = await params;
  const resolvedSearchParams = await searchParams;

  const building = await getBuildingById(buildingId, readBuildingName(resolvedSearchParams.bn));
  if (!building) {
    notFound();
  }

  const checklist = readApartmentChecklistParams(resolvedSearchParams);
  const report = await getEcoCheckReport();
  const hasFullReport = building.id === report.buildingId;
  const isEstimated = building.gradeSource === "estimated";
  const live = building.liveMatch;
  const estimate = building.estimate;

  /**
   * 지도에서 강조할 동네.
   *
   * 출처가 셋이라 순서대로 봅니다.
   *   apartment  K-apt 단지 → 시군구가 확실합니다
   *   live       /api/match 실측 → district 가 옵니다
   *   그 외      주소에서 "OO구" 를 뽑습니다
   * 못 찾으면 undefined 로 두면 됩니다. 지도는 강조 없이 전국만 그립니다.
   */
  const selectedDistrict =
    building.apartment?.sgg ??
    live?.district ??
    building.address.match(/([가-힣]+[구군시])/)?.[1];

  const metaLine = building.apartment
    ? [[building.apartment.sgg, building.apartment.emd].filter(Boolean).join(" "), "공동주택(아파트)"]
        .filter(Boolean)
        .join(" · ")
    : live
      ? [[live.region, live.district].filter(Boolean).join(" "), live.purpose].filter(Boolean).join(" · ")
      : estimate
        ? [estimate.region, estimate.purpose, estimate.sizeLabel].join(" · ")
        : `${building.completionYear}년 준공 · ${building.useType} · ${formatNumber(building.areaSqm)}㎡`;

  return (
    <SiteShell>
      <PageSection className="flex flex-col gap-[var(--space-6)]">
        {building.apartment?.disclaimer ? (
          <Notice tone="warn">{building.apartment.disclaimer}</Notice>
        ) : estimate ? (
          <Notice tone="warn">
            이 주소는 에너지효율등급 실측 데이터가 없습니다. 아래 등급은 같은 용도·지역·규모 건물{" "}
            {formatNumber(estimate.sampleCount)}건의 통계로 추정한 값입니다.
            {estimate.lowSample ? " 표본이 적어 참고용으로만 봐 주세요." : ""}
          </Notice>
        ) : isEstimated ? (
          <Notice tone="warn">
            이 건물은 에너지효율등급 인증 이력이 없습니다. 아래 등급은 공공 데이터 기반 추정치입니다.
          </Notice>
        ) : null}

        <ReportBody
          overview={{
            buildingId: building.id,
            buildingName: building.name,
            metaLine,
            address: building.address,
            completionYear: building.completionYear,
            useType: building.useType,
            primaryEnergyKwh: building.primaryEnergyKwh,
            grade: building.grade,
            isEstimated,
            basisRows: building.apartment
              ? buildApartmentBasisRows(building.apartment, building.primaryEnergyKwh, building.completionYear)
              : live
                ? buildLiveBasisRows(live)
                : buildBasisRows(building),
          }}
          comment={{
            buildingName: building.name,
            address: building.address,
            completionYear: building.completionYear,
            useType: building.useType,
            areaSqm: building.areaSqm,
            grade: building.grade,
            isEstimated,
            primaryEnergyKwh: building.primaryEnergyKwh,
          }}
          initialMetrics={
            hasFullReport
              ? {
                  annualEnergyCostManwon: report.annualEnergyCostManwon,
                  percentileRank: report.percentileRank,
                  annualCarbonEmissionTons: report.annualCarbonEmissionTons,
                  annualSavingsPotentialManwon: report.annualSavingsPotentialManwon,
                }
              : null
          }
          fetchLiveMetrics={live !== undefined || estimate !== undefined || building.apartment !== undefined}
          // 탄소 배출 계산에 씁니다. 도시가스 난방인데 안 넘기면 전력 계수로 계산돼
          // 배출량이 두 배 넘게 부풀려집니다.
          heatingType={building.apartment?.heatingType ?? building.heatingType}
        >
          {checklist ? (
            <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
              <SectionHeader
                title="직접 입력한 집 정보"
                hint="주소 검색 때 입력해 주신 내용이에요. 아직 등급 계산에는 반영되지 않아요."
                hintSize="sm"
              />
              <dl className="grid grid-cols-1 gap-x-[var(--space-8)] gap-y-[var(--space-3)] sm:grid-cols-3">
                {buildChecklistRows(checklist).map((row) => (
                  <div key={row.label} className="flex flex-col gap-[2px]">
                    <dt className="text-[length:var(--text-caption-size)] text-[var(--text-muted)]">{row.label}</dt>
                    <dd className="text-[17px] font-bold text-[var(--text-strong)]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ) : null}

          <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
            <SectionHeader
              title="등급 기준표"
              hint="다른 등급을 누르면 연간 단위면적당 1차에너지소요량을 볼 수 있습니다."
              hintSize="sm"
            />
            <GradeScale value={building.grade} selectable />
          </Card>

          <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
            <SectionHeader
              title="동네 비교"
              hint="같은 용도 건물의 인증 실적을 지역끼리 비교합니다. 회색은 인증 사례가 부족해 등급을 매기지 않은 지역입니다."
              hintSize="sm"
            />
            <DistrictMap coords={districtCoords.districts} selected={selectedDistrict} purpose="주거용" />
          </Card>
        </ReportBody>
      </PageSection>
    </SiteShell>
  );
}
