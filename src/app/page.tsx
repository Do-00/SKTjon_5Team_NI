import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { ButtonLink, Card, Icon } from "@/src/components/ui";
import type { IconName } from "@/src/components/ui";
import { EnergyGradeBadge, GradeScale, ProgramCard } from "@/src/components/domain";
import { getEcoCheckReport, getUserAccount } from "@/src/data/account";
import { getBuildingById } from "@/src/data/buildings";
import { getSupportPrograms } from "@/src/data/programs";
import { describeAudience } from "@/src/lib/audience";
import { formatManwon, formatPercent } from "@/src/lib/format";
import { SearchBar } from "./search/_components/SearchBar";

interface Step {
  icon: IconName;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: "map-pin",
    title: "주소를 입력합니다",
    description: "도로명 주소 하나로 건축물대장·공공 데이터를 불러옵니다.",
  },
  {
    icon: "gauge",
    title: "등급을 추정합니다",
    description: "준공 연도, 구조, 당시 단열 기준으로 1+++부터 7까지 10단계 등급을 산정합니다.",
  },
  {
    icon: "heart",
    title: "지원사업을 매칭합니다",
    description: "사용자 유형과 지역에 맞는 사업만 골라 보여 드립니다.",
  },
];

export default async function Home() {
  const [account, report, programs] = await Promise.all([
    getUserAccount(),
    getEcoCheckReport(),
    getSupportPrograms(),
  ]);
  const building = await getBuildingById(report.buildingId);
  const address = building?.address ?? report.buildingName;
  const matchedPrograms = programs.filter((program) => program.matched).slice(0, 2);

  return (
    <SiteShell>
      {/* Hero */}
      <section aria-labelledby="home-hero-title" className="bg-[var(--surface-brand)]">
        <div className="eco-container grid items-center gap-[var(--space-12)] py-[var(--space-16)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[var(--space-16)] lg:py-[var(--space-20)]">
          <div className="flex min-w-0 flex-col gap-[var(--space-6)]">
            <span className="inline-flex items-center gap-1.5 self-start whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--teal-100)] px-4 py-2 text-[16px] font-bold text-[var(--teal-800)]">
              <Icon name="leaf" size={16} />
              탄소중립 의사결정 플랫폼
            </span>
            <h1
              id="home-hero-title"
              className="font-brand text-[40px] font-black leading-[1.15] tracking-[-0.03em] text-white md:text-[56px]"
            >
              주소로 확인하는
              <br />
              우리 집 에너지 성적표
            </h1>
            <p className="max-w-[520px] text-[19px] leading-[1.65] text-[var(--teal-100)] md:text-[21px]">
              인증 이력이 없는 건물도 등급을 추정해 드립니다. 소유주·임차인 유형에 따라 실천 방법과 정부 지원사업을
              바로 안내합니다.
            </p>
            <SearchBar className="max-w-[620px]" />
          </div>

          <div className="flex justify-center">
            <Card padding="lg" className="flex w-full max-w-[380px] flex-col items-center gap-[var(--space-5)]">
              <p className="text-center text-[17px] text-[var(--text-muted)]">{address}</p>
              <EnergyGradeBadge
                grade={report.grade}
                size="lg"
                caption={report.gradeSource === "estimated" ? "추정 등급" : "인증 등급"}
              />
              <dl className="flex w-full justify-between border-t border-[var(--border-subtle)] pt-[var(--space-4)]">
                <div>
                  <dt className="text-[15px] text-[var(--text-muted)]">연간 난방비</dt>
                  <dd className="whitespace-nowrap font-brand text-[24px] font-black text-[var(--text-strong)]">
                    {formatManwon(report.annualEnergyCostManwon)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] text-[var(--text-muted)]">절감 여지</dt>
                  <dd className="whitespace-nowrap font-brand text-[24px] font-black text-[var(--teal-700)]">
                    {formatPercent(report.percentileRank)}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </section>

      {/* Three steps */}
      <PageSection aria-labelledby="home-steps-title">
        <SectionHeader id="home-steps-title" title="세 단계로 끝납니다" hint="가입 없이 조회할 수 있습니다" />
        <ol className="mt-[var(--space-5)] grid grid-cols-1 gap-[var(--space-5)] md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Card padding="lg" className="flex h-full flex-col gap-[var(--space-3)]">
                <div className="flex items-center gap-[var(--space-3)]">
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-brand-soft)] text-[var(--teal-700)]"
                  >
                    <Icon name={step.icon} size={30} />
                  </span>
                  <span aria-hidden="true" className="font-brand text-[24px] font-black text-[var(--teal-300)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-brand text-[22px] font-bold text-[var(--text-strong)]">{step.title}</h3>
                <p className="text-[17px] leading-[1.65] text-[var(--text-body)]">{step.description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* Grade scale */}
      <PageSection aria-labelledby="home-scale-title">
        <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
          <SectionHeader
            id="home-scale-title"
            title="등급 기준표"
            hint="다른 등급을 누르면 연간 단위면적당 1차에너지소요량을 볼 수 있습니다."
            hintSize="sm"
          />
          <GradeScale value={report.grade} selectable />
        </Card>
      </PageSection>

      {/* Matched programs */}
      <PageSection aria-labelledby="home-programs-title">
        <SectionHeader
          id="home-programs-title"
          title="지금 신청 가능한 지원사업"
          hint={describeAudience(address, account.userType)}
        />
        <div className="mt-[var(--space-5)] grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2">
          {matchedPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} href="/programs?tag=matched" />
          ))}
        </div>
        <div className="mt-[var(--space-5)] flex justify-center">
          <ButtonLink href="/programs" variant="outline" size="lg" trailingIcon={<Icon name="arrow-right" size={22} />}>
            지원사업 전체 보기
          </ButtonLink>
        </div>
      </PageSection>
    </SiteShell>
  );
}
