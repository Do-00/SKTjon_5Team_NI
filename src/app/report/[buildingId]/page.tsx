import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { Badge, ButtonLink, Card, Icon, Notice } from "@/src/components/ui";
import { GradeScale } from "@/src/components/domain";
import { getBuildingById, type BuildingSummary } from "@/src/data/buildings";
import { getEcoCheckReport } from "@/src/data/account";
import { formatManwon, formatNumber } from "@/src/lib/format";
import { ReportOverview, type BasisRow } from "./_components/ReportOverview";

export async function generateMetadata({
  params,
}: PageProps<"/report/[buildingId]">): Promise<Metadata> {
  const { buildingId } = await params;
  const building = await getBuildingById(buildingId);
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

/**
 * Server shell for a building's energy report. The detailed report figures
 * (`getEcoCheckReport`) are fixtures scoped to a single building, so they
 * only render when the requested building matches the report's
 * `buildingId` — other valid buildings get a clearly labelled "상세 성적표
 * 준비 중" prototype state instead of borrowed numbers.
 */
export default async function ReportPage({ params }: PageProps<"/report/[buildingId]">) {
  const { buildingId } = await params;

  const building = await getBuildingById(buildingId);
  if (!building) {
    notFound();
  }

  const report = await getEcoCheckReport();
  const hasFullReport = building.id === report.buildingId;
  const isEstimated = building.gradeSource === "estimated";

  return (
    <SiteShell>
      <PageSection className="flex flex-col gap-[var(--space-6)]">
        {isEstimated ? (
          <Notice tone="warn">
            이 건물은 에너지효율등급 인증 이력이 없습니다. 아래 등급은 공공 데이터 기반 추정치입니다.
          </Notice>
        ) : null}

        <ReportOverview
          buildingId={building.id}
          buildingName={building.name}
          metaLine={`${building.completionYear}년 준공 · ${building.useType} · ${formatNumber(building.areaSqm)}㎡`}
          address={building.address}
          grade={building.grade}
          isEstimated={isEstimated}
          basisRows={buildBasisRows(building)}
          metrics={
            hasFullReport
              ? {
                  annualEnergyCostManwon: report.annualEnergyCostManwon,
                  percentileRank: report.percentileRank,
                  annualCarbonEmissionTons: report.annualCarbonEmissionTons,
                  annualSavingsPotentialManwon: report.annualSavingsPotentialManwon,
                }
              : null
          }
        />

        <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
          <SectionHeader
            title="등급 기준표"
            hint="다른 등급을 누르면 연간 단위면적당 1차에너지소요량을 볼 수 있습니다."
            hintSize="sm"
          />
          <GradeScale value={building.grade} selectable />
        </Card>

        {hasFullReport ? (
          <Card
            tone="brand"
            padding="lg"
            className="flex flex-col items-start gap-[var(--space-5)] sm:flex-row sm:items-center"
          >
            <Icon name="coins" size={36} className="shrink-0 text-[var(--teal-700)]" />
            <div className="flex-1">
              <p className="text-[17px] text-[var(--teal-800)]">권장 조치를 모두 실천하면 연간</p>
              <p className="font-brand text-[34px] font-black leading-tight text-[var(--teal-700)]">
                {formatManwon(report.annualSavingsPotentialManwon)} 절감
              </p>
            </div>
            <ButtonLink
              href={`/guide/${building.id}`}
              size="lg"
              trailingIcon={<Icon name="arrow-right" size={22} />}
            >
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
              <ButtonLink href={`/guide/${building.id}`} variant="primary">
                절감 하기 보기
              </ButtonLink>
              <ButtonLink href="/search" variant="ghost">
                다른 건물 검색하기
              </ButtonLink>
            </div>
          </Card>
        )}
      </PageSection>
    </SiteShell>
  );
}
