"use client";

import type { CSSProperties } from "react";
import { EnergyGradeBadge } from "@/src/components/domain/EnergyGradeBadge";
import { getGradeColorVars, getGradeOnColor } from "@/src/components/domain/grade-tokens";
import { SectionHeader } from "@/src/components/layout/SectionHeader";
import { ButtonLink, Card, Icon, Tab, TabList, TabPanel, Tabs } from "@/src/components/ui";
import type { IconName } from "@/src/components/ui";
import type { GradeCode } from "@/src/data/grades";
import { formatManwon, formatPercent, formatTonsCO2 } from "@/src/lib/format";
import { ReportActions } from "./ReportActions";

export interface BasisRow {
  icon: IconName;
  label: string;
  value: string;
}

export interface ReportMetrics {
  annualEnergyCostManwon: number;
  percentileRank: number;
  annualCarbonEmissionTons: number;
  annualSavingsPotentialManwon: number;
}

interface ReportOverviewProps {
  /** Path to return to after logging in to save this report. */
  savePath: string;
  /** Target of the 개선 후 tab's guide link; the link is hidden when omitted. */
  guideHref?: string;
  /** Overrides the badge caption (default 추정 등급 / 인증 등급), e.g. `"예비인증"`. */
  caption?: string;
  /** Overrides the basis card title. */
  basisTitle?: string;
  /** Heading level of the building name; `h2` when the page already has an `h1`. */
  titleAs?: "h1" | "h2";
  buildingName: string;
  /** e.g. `"1998년 준공 · 공동주택 · 84㎡"`. */
  metaLine: string;
  address: string;
  grade: GradeCode;
  isEstimated: boolean;
  basisRows: BasisRow[];
  /** Detailed report figures; `null` for buildings without a full report fixture. */
  metrics: ReportMetrics | null;
}

/** Active tab takes the building's grade color, with a text color that stays legible on it. */
const TAB_CLASS =
  "flex-1 aria-selected:bg-[var(--tab-accent)] aria-selected:font-bold aria-selected:text-[var(--tab-accent-fg)]";

/**
 * Client island for the top of the report: the grade card (with the
 * 현재/개선 후 tabs and share/save actions) beside the metrics and the
 * public-data basis. One `Tabs` wraps both columns so the tab list in the
 * left card drives the panels on the right.
 */
export function ReportOverview({
  savePath,
  guideHref,
  caption,
  basisTitle,
  titleAs: Title = "h1",
  buildingName,
  metaLine,
  address,
  grade,
  isEstimated,
  basisRows,
  metrics,
}: ReportOverviewProps) {
  const accentStyle = {
    "--tab-accent": `var(${getGradeColorVars(grade).color})`,
    "--tab-accent-fg": getGradeOnColor(grade),
  } as CSSProperties;

  const metricCards: { icon: IconName; label: string; value: string }[] = metrics
    ? [
        { icon: "thermometer", label: "연간 난방비", value: formatManwon(metrics.annualEnergyCostManwon) },
        { icon: "trending-down", label: "절감 여지", value: formatPercent(metrics.percentileRank) },
        { icon: "droplet", label: "연간 탄소 배출", value: formatTonsCO2(metrics.annualCarbonEmissionTons) },
      ]
    : [];

  return (
    <Tabs
      defaultValue="now"
      className="grid grid-cols-1 items-start gap-[var(--space-6)] lg:grid-cols-[420px_minmax(0,1fr)]"
    >
      <Card padding="lg" className="flex flex-col items-center gap-[var(--space-6)]" style={accentStyle}>
        <div className="text-center">
          <Title className="font-brand text-[24px] font-black leading-[1.3] text-[var(--text-strong)]">{buildingName}</Title>
          <p className="mt-[var(--space-1)] text-[16px] text-[var(--text-muted)]">{metaLine}</p>
          <p className="text-[length:var(--text-caption-size)] text-[var(--text-muted)]">{address}</p>
        </div>

        <EnergyGradeBadge grade={grade} size="lg" caption={caption ?? (isEstimated ? "추정 등급" : "인증 등급")} />

        {metrics ? (
          <TabList aria-label="성적표 시점 선택" className="w-full">
            <Tab value="now" className={TAB_CLASS}>
              현재
            </Tab>
            <Tab value="after" className={TAB_CLASS}>
              개선 후
            </Tab>
          </TabList>
        ) : null}

        <div className="flex w-full flex-col gap-[var(--space-2)]">
          <ReportActions savePath={savePath} buildingName={buildingName} />
          <p className="text-center text-[length:var(--text-caption-size)] text-[var(--text-muted)]">
            저장하려면 로그인이 필요해요
          </p>
        </div>
      </Card>

      <div className="flex min-w-0 flex-col gap-[var(--space-5)]">
        {metrics ? (
          <>
            <TabPanel value="now" className="focus:outline-none">
              <ul aria-label="현재 에너지 지표" className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3">
                {metricCards.map((metric) => (
                  <li key={metric.label}>
                    <Card className="flex h-full flex-col gap-1.5">
                      <Icon name={metric.icon} size={26} className="text-[var(--teal-600)]" />
                      <p className="text-[16px] text-[var(--text-muted)]">{metric.label}</p>
                      <p className="whitespace-nowrap font-brand text-[28px] font-black text-[var(--text-strong)]">
                        {metric.value}
                      </p>
                    </Card>
                  </li>
                ))}
              </ul>
            </TabPanel>

            <TabPanel value="after" className="focus:outline-none">
              <Card tone="brand" padding="lg" className="flex flex-col gap-[var(--space-3)]">
                <h2 className="eco-subhead text-[var(--teal-800)]">개선 후 수치는 실천 항목을 고른 뒤 계산돼요</h2>
                <p className="text-[length:var(--text-body-size)] text-[var(--text-body)]">
                  현재 데이터만으로는 개선 후 등급과 난방비를 확정할 수 없어요. 권장 조치를 모두 실천하면 연간 최대{" "}
                  <strong className="text-[var(--teal-700)]">
                    {formatManwon(metrics.annualSavingsPotentialManwon)}
                  </strong>
                  을 줄일 수 있어요.
                </p>
                {guideHref ? (
                  <ButtonLink
                    href={guideHref}
                    variant="primary"
                    className="self-start"
                    trailingIcon={<Icon name="arrow-right" size={20} />}
                  >
                    절감 하기에서 실천 항목 고르기
                  </ButtonLink>
                ) : null}
              </Card>
            </TabPanel>
          </>
        ) : null}

        <Card padding="lg">
          <SectionHeader as="h2" title={basisTitle ?? (metrics ? "추정 근거" : "건물 정보")} hint="공공 데이터 기반" />
          <dl className="mt-[var(--space-5)] grid grid-cols-1 gap-x-[var(--space-8)] gap-y-[var(--space-4)] md:grid-cols-2">
            {basisRows.map((row) => (
              <div
                key={row.label}
                className="flex min-h-12 items-center gap-[var(--space-3)] border-b border-[var(--border-subtle)] pb-[var(--space-2)]"
              >
                <dt className="flex shrink-0 items-center gap-[var(--space-3)] whitespace-nowrap text-[17px] text-[var(--text-body)]">
                  <Icon name={row.icon} size={22} className="shrink-0 text-[var(--text-muted)]" />
                  {row.label}
                </dt>
                <dd className="min-w-0 flex-1 text-right text-[17px] font-bold text-[var(--text-strong)]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </Tabs>
  );
}
