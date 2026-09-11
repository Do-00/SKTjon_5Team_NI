import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { ButtonLink, Card, Icon } from "@/src/components/ui";
import type { IconName } from "@/src/components/ui";
import { GradeScale, ProgramCard } from "@/src/components/domain";
import { getEcoCheckReport } from "@/src/data/account";
import { getSupportPrograms } from "@/src/data/programs";
import { HomeHero } from "./_components/HomeHero";

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
  const [report, programs] = await Promise.all([getEcoCheckReport(), getSupportPrograms()]);
  const matchedPrograms = programs.filter((program) => program.matched).slice(0, 2);

  return (
    <SiteShell>
      <HomeHero />

      {/* Three steps */}
      <PageSection aria-labelledby="home-steps-title">
        <SectionHeader id="home-steps-title" title="세 단계로 끝납니다" />
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
                  <span aria-hidden="true" className="font-brand text-[28px] font-black text-[var(--teal-600)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-brand text-[24px] font-black text-[var(--text-strong)]">{step.title}</h3>
                <p className="text-[length:var(--text-body-lg-size)] font-medium leading-[1.6] text-[var(--text-body)]">
                  {step.description}
                </p>
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
          />
          <GradeScale value={report.grade} selectable />
        </Card>
      </PageSection>

      {/* Matched programs */}
      <PageSection aria-labelledby="home-programs-title">
        <SectionHeader id="home-programs-title" title="지금 신청 가능한 지원사업" />
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
