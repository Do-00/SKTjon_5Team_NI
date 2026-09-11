import type { Metadata } from "next";
import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { ButtonLink, Card, Icon } from "@/src/components/ui";
import type { IconName } from "@/src/components/ui";

export const metadata: Metadata = {
  title: "서비스 소개",
};

interface DataSource {
  icon: IconName;
  title: string;
  description: string;
}

const DATA_SOURCES: DataSource[] = [
  { icon: "building", title: "건축물대장", description: "준공 연도, 구조, 용도, 연면적" },
  { icon: "wind", title: "단열 기준 이력", description: "준공 당시 적용된 법정 단열 기준" },
  { icon: "thermometer", title: "난방 방식", description: "개별·중앙, 연료 종류" },
  { icon: "users", title: "지역 에너지 통계", description: "동일 지역·연식 건물의 실제 사용량 분포" },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageSection>
        <div className="flex max-w-[860px] flex-col gap-[var(--space-6)]">
          <SectionHeader as="h1" title="등급은 이렇게 추정합니다" />

          <p className="text-[19px] leading-[1.7] text-[var(--text-body)]">
            국내 건축물 가운데 에너지효율등급 인증을 받은 건물은 일부에 불과합니다. 에코 체크는 인증받지 않은 건물,
            이른바 사각지대 건축물의 등급을 공공 데이터로 추정합니다.
          </p>

          <ul
            id="data-sources"
            aria-label="등급 추정에 쓰는 공공 데이터"
            className="grid scroll-mt-[calc(var(--app-bar-height)+var(--space-6))] grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2"
          >
            {DATA_SOURCES.map((source) => (
              <li key={source.title}>
                <Card className="flex h-full items-start gap-3.5">
                  <Icon name={source.icon} size={26} className="shrink-0 text-[var(--teal-600)]" />
                  <div>
                    <h2 className="font-sans text-[18px] font-bold tracking-normal text-[var(--text-strong)]">
                      {source.title}
                    </h2>
                    <p className="text-[16px] leading-[1.6] text-[var(--text-muted)]">{source.description}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          <Card tone="accent" padding="lg" className="flex items-start gap-[var(--space-4)]">
            <Icon name="info" size={28} className="shrink-0 text-[var(--celadon-700)]" />
            <p className="text-[17px] leading-[1.7] text-[var(--text-body)]">
              추정 등급은 참고값입니다. 공식 에너지효율등급 인증을 대체하지 않으며, 실제 사용량과 차이가 있을 수
              있습니다. 지원사업 신청 시에는 각 기관의 요건을 다시 확인해 주세요.
            </p>
          </Card>

          <div className="flex flex-wrap gap-[var(--space-3)]">
            <ButtonLink href="/support" size="lg" leadingIcon={<Icon name="phone" size={22} />}>
              상담 신청
            </ButtonLink>
            <ButtonLink
              href="#data-sources"
              variant="secondary"
              size="lg"
              leadingIcon={<Icon name="file-text" size={22} />}
            >
              데이터 출처 보기
            </ButtonLink>
          </div>
        </div>
      </PageSection>
    </SiteShell>
  );
}
