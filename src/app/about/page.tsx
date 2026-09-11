import type { Metadata } from "next";
import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { ButtonLink, Card, Icon } from "@/src/components/ui";
import type { IconName } from "@/src/components/ui";
import { EstimationMethod } from "./_components/EstimationMethod";

export const metadata: Metadata = {
  title: "서비스 소개",
};

interface DataSource {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * 실제로 쓰는 데이터만 적습니다.
 *
 * 이전 문구에는 «건축물대장», «지역 에너지 통계» 가 있었는데 둘 다 연동하지 않았습니다.
 * 아래 추정 알고리즘 설명과 앞뒤가 맞지 않아 바로잡았습니다 —
 * 쓰지 않는 출처를 적어두면 "그건 어떻게 연동했나" 라는 질문에 답할 수 없습니다.
 */
const DATA_SOURCES: DataSource[] = [
  {
    icon: "building",
    title: "서울시 공동주택 정보",
    description: "준공 연도, 세대수, 동수, 연면적, 복도 유형, 건설사 — 서울 아파트 2,888개 단지",
  },
  {
    icon: "badge-check",
    title: "건축물 에너지 효율 등급 인증 실적",
    description: "한국에너지공단 인증 기록. 추정 모델의 정답 역할을 합니다",
  },
  {
    icon: "thermometer",
    title: "난방 방식",
    description: "개별난방 · 지역난방 · 중앙난방. 추정에서 가장 큰 영향을 주는 항목 중 하나입니다",
  },
  {
    icon: "wind",
    title: "단열 기준 이력",
    description: "준공 시점에 적용된 법정 단열 기준. 추정이 아니라 법령으로 정해집니다",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageSection>
        <div className="flex max-w-[860px] flex-col gap-[var(--space-6)]">
          <SectionHeader as="h1" title="등급은 이렇게 추정합니다" />

          <p className="text-[19px] leading-[1.7] text-[var(--text-body)]">
            국내 건축물 가운데 에너지 효율 등급 인증을 받은 건물은 일부에 불과합니다. 에코 체크는 인증받지 않은 건물,
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

          <EstimationMethod />

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
