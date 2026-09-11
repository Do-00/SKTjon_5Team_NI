import type { Metadata } from "next";
import { PageSection, SectionHeader, SiteShell } from "@/src/components/layout";
import { Card, Icon } from "@/src/components/ui";
import type { IconName } from "@/src/components/ui";
import { EstimationMethod } from "./_components/EstimationMethod";

export const metadata: Metadata = {
  title: "서비스 소개",
};

interface DataSource {
  icon: IconName;
  title: string;
  description: string;
  /** 제공 기관, e.g. `"한국에너지공단"`. 있으면 `url`과 함께 출처 링크로 보여줍니다. */
  source?: string;
  url?: string;
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
    title: "서울시 공동주택 아파트 정보",
    description:
      "준공 연도, 세대수, 동수, 연면적, 복도 유형, 건설사 — 서울 아파트 2,888개 단지",
    source: "서울 열린데이터 광장",
    url: "https://data.seoul.go.kr/dataList/OA-15818/S/1/datasetView.do",
  },
  {
    icon: "badge-check",
    title: "건축물 에너지효율등급 정보",
    description: "한국에너지공단 인증 기록. 추정 모델의 정답 역할을 합니다",
    source: "한국에너지공단 · 공공데이터포털",
    url: "https://www.data.go.kr/data/15100521/openapi.do",
  },
  {
    icon: "file-text",
    title: "인증건물리스트",
    description: "전국 인증 현황과 등급·용도별 인증 실적을 그대로 공개합니다",
    source: "건축물 에너지효율등급 인증시스템(beec)",
    url: "https://beec.energy.or.kr/BC/BC04/BC04_04_001.do",
  },
  {
    icon: "wind",
    title: "단열 기준 이력",
    description: "준공 시점에 적용된 법정 단열 기준을 참고해 추정합니다",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageSection>
        <div className="flex max-w-[860px] flex-col gap-[var(--space-6)]">
          <SectionHeader as="h1" title="등급은 이렇게 추정합니다" />

          <p className="text-[19px] leading-[1.7] text-[var(--text-body)]">
            국내 건축물 가운데 에너지 효율 등급 인증을 받은 건물은 일부에
            불과합니다. 에코 체크는 인증받지 않은 건물, 이른바 사각지대 건축물의
            등급을 공공 데이터로 추정합니다.
          </p>

          <ul
            id="data-sources"
            aria-label="등급 추정에 쓰는 공공 데이터"
            className="grid scroll-mt-[calc(var(--app-bar-height)+var(--space-6))] grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2"
          >
            {DATA_SOURCES.map((item) => {
              const body = (
                <>
                  <Icon
                    name={item.icon}
                    size={26}
                    className="shrink-0 text-[var(--teal-600)]"
                  />
                  <div className="flex-1">
                    <h2 className="font-sans text-[18px] font-bold tracking-normal text-[var(--text-strong)]">
                      {item.title}
                    </h2>
                    <p className="text-[16px] leading-[1.6] text-[var(--text-muted)]">
                      {item.description}
                    </p>
                    {item.source ? (
                      <p className="mt-1.5 flex items-center gap-1 text-[14px] font-medium text-[var(--teal-700)]">
                        {item.source}
                        {item.url ? (
                          <Icon name="external-link" size={14} />
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                </>
              );

              return (
                <li key={item.title}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <Card
                        interactive
                        className="flex h-full items-start gap-3.5"
                      >
                        {body}
                      </Card>
                    </a>
                  ) : (
                    <Card className="flex h-full items-start gap-3.5">
                      {body}
                    </Card>
                  )}
                </li>
              );
            })}
          </ul>

          <EstimationMethod />

          <Card
            tone="accent"
            padding="lg"
            className="flex items-start gap-[var(--space-4)]"
          >
            <Icon
              name="info"
              size={28}
              className="shrink-0 text-[var(--celadon-700)]"
            />
            <p className="text-[17px] leading-[1.7] text-[var(--text-body)]">
              추정 등급은 참고값입니다. 공식 에너지효율등급 인증을 대체하지
              않으며, 실제 사용량과 차이가 있을 수 있습니다. 지원사업 신청
              시에는 각 기관의 요건을 다시 확인해 주세요.
            </p>
          </Card>
        </div>
      </PageSection>
    </SiteShell>
  );
}
