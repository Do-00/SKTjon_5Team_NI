import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { Card, Notice } from "@/src/components/ui";
import { GradeScale } from "@/src/components/domain";
import { DistrictMap } from "@/src/components/domain/DistrictMap";
import districtCoords from "@/src/data/district-coords.json";
import { getBuildingById, type BuildingSummary, type LiveMatchInfo } from "@/src/data/buildings";
import { getEcoCheckReport } from "@/src/data/account";
import { PRIMARY_ENERGY_UNIT } from "@/src/data/grades";
import { formatNumber } from "@/src/lib/format";
import { getDistrict } from "@/src/lib/audience";
import type { BasisRow } from "./_components/ReportOverview";
import { ReportBody } from "./_components/ReportBody";

/** `?bn=` carries the Kakao 건물명 from the home search, so lots with several buildings resolve to the same one. */
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

/** Rows for the "추정 근거" card, all sourced from the building fixture. */
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
  return [
    { icon: "map-pin", label: "지역", value: [live.region, live.district].filter(Boolean).join(" ") || "정보 없음" },
    { icon: "building", label: "용도", value: live.purpose || "정보 없음" },
    { icon: "gauge", label: "에너지 등급", value: live.gradeLabel || "정보 없음" },
    {
      icon: "trending-down",
      label: "1차에너지소요량",
      value: live.energyValue === null ? "정보 없음" : `${formatNumber(live.energyValue)} ${PRIMARY_ENERGY_UNIT}`,
    },
    { icon: "badge-check", label: "인증 구분", value: live.certKind || "인증 이력 없음" },
  ];
}

/**
 * Server shell for a building's energy report. Fixture buildings render
 * their fixture figures; live beec matches (`addr-…` ids from the home or
 * `/search`) render the `/api/match` fields, and `ReportBody` fetches their
 * heating-cost figures in the browser (MSW mock for now).
 */
export default async function ReportPage({ params, searchParams }: PageProps<"/report/[buildingId]">) {
  const { buildingId } = await params;

  const building = await getBuildingById(buildingId, readBuildingName((await searchParams).bn));
  if (!building) {
    notFound();
  }

  const report = await getEcoCheckReport();
  const hasFullReport = building.id === report.buildingId;
  const isEstimated = building.gradeSource === "estimated";
  const live = building.liveMatch;

  // 지도에서 강조할 동네. 실측 매칭이면 beec 가 준 값을, 아니면 주소에서 뽑습니다.
  const selectedDistrict = live?.district ?? getDistrict(building.address);
  // 비주거용 건물이면 비주거용끼리 비교해야 등급 기준표가 맞습니다.
  const comparePurpose = live?.purpose === "주거용 이외" ? "주거용 이외" : "주거용";

  const metaLine = live
    ? [[live.region, live.district].filter(Boolean).join(" "), live.purpose].filter(Boolean).join(" · ")
    : `${building.completionYear}년 준공 · ${building.useType} · ${formatNumber(building.areaSqm)}㎡`;

  return (
    <SiteShell>
      <PageSection className="flex flex-col gap-[var(--space-6)]">
        {isEstimated ? (
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
            basisRows: live ? buildLiveBasisRows(live) : buildBasisRows(building),
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
          fetchLiveMetrics={live !== undefined}
        >
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
            <DistrictMap
              coords={districtCoords.districts}
              selected={selectedDistrict}
              purpose={comparePurpose}
            />
          </Card>
        </ReportBody>
      </PageSection>
    </SiteShell>
  );
}
