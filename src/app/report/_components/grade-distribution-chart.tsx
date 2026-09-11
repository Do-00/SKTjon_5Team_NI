import type { CSSProperties } from "react";
import type { GradeDistributionEntry } from "@/src/data/grades";
import { getGradeColorVars } from "@/src/components/domain/grade-tokens";
import { cn } from "@/src/components/ui";
import { formatNumber } from "@/src/lib/format";
import styles from "./grade-distribution-chart.module.css";

type PlotStyle = CSSProperties & {
  "--bar-height": `${number}%`;
};

type FigureStyle = CSSProperties & {
  "--current-grade-color": `var(${string})`;
};

interface GradeDistributionChartProps {
  /**
   * One entry per grade. The current building's entry may carry a `count`
   * (drawn as a highlighted bar) or `null` (drawn as a marker only).
   */
  entries: GradeDistributionEntry[];
  idPrefix: string;
  areaLabel?: string;
  eyebrow?: string;
  title?: string;
  /** Noun for the compared buildings, e.g. `"인근 건물"`, `"같은 조건 건물"`. */
  peerNoun?: string;
}

export function GradeDistributionChart({
  entries,
  idPrefix,
  areaLabel = "월드컵로 반경 500m",
  eyebrow = "주변 비교",
  title = "근처 에너지 등급 분포",
  peerNoun = "인근 건물",
}: GradeDistributionChartProps) {
  const countedEntries = entries.filter(
    (entry): entry is GradeDistributionEntry & { count: number } =>
      entry.count !== null,
  );
  const maxCount = Math.max(1, ...countedEntries.map((entry) => entry.count));
  const totalCount = countedEntries.reduce((sum, entry) => sum + entry.count, 0);
  const mostCommon = countedEntries.reduce<
    (GradeDistributionEntry & { count: number }) | undefined
  >(
    (highest, entry) =>
      !highest || entry.count > highest.count ? entry : highest,
    undefined,
  );
  const currentGrade = entries.find((entry) => entry.isCurrentBuildingGrade);
  const currentLabel = currentGrade?.label ?? "확인되지 않음";
  const summary = mostCommon
    ? `${areaLabel}의 ${peerNoun} ${formatNumber(totalCount)}건을 등급별로 비교한 막대그래프입니다. 가장 많은 등급은 ${mostCommon.label} ${formatNumber(mostCommon.count)}건이며, 이 건물의 등급은 ${currentLabel}입니다.`
    : `${areaLabel}의 등급별 ${peerNoun} 집계가 아직 없습니다. 이 건물의 등급은 ${currentLabel}입니다.`;
  const titleId = `${idPrefix}-grade-distribution-title`;
  const descriptionId = `${idPrefix}-grade-distribution-description`;
  const summaryId = `${idPrefix}-grade-distribution-summary`;
  const currentGradeColor = currentGrade
    ? getGradeColorVars(currentGrade.grade).color
    : "--teal-600";
  const figureStyle: FigureStyle = {
    "--current-grade-color": `var(${currentGradeColor})`,
  };
  const describeCount = (entry: GradeDistributionEntry) =>
    entry.count === null ? "집계값 없음" : `${peerNoun} ${formatNumber(entry.count)}건`;

  return (
    <figure
      className={styles.figure}
      style={figureStyle}
      aria-labelledby={titleId}
      aria-describedby={`${descriptionId} ${summaryId}`}
    >
      <div className={styles.headingRow}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={titleId} className="eco-heading">
            {title}
          </h2>
        </div>
        <p className={styles.scope}>
          {areaLabel} · {formatNumber(totalCount)}건
        </p>
      </div>

      <p id={descriptionId} className={styles.description}>
        막대 높이는 등급별 {peerNoun} 수를 하나의 축으로 비교합니다. 이 건물의
        등급은 등급 색으로 강조했습니다.
      </p>
      <p id={summaryId} className="sr-only">
        {summary}
      </p>

      <div className={styles.scroller} tabIndex={0} aria-label="등급 분포 차트 가로 스크롤 영역">
        <div className={styles.chartShell}>
          <div className={styles.plot}>
            <div className={styles.axis} aria-hidden="true">
              <span>{formatNumber(maxCount)}</span>
              <span>{formatNumber(Math.round(maxCount / 2))}</span>
              <span>0</span>
            </div>

            <div className={styles.gridLines} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <ol className={styles.bars} aria-hidden="true">
              {entries.map((entry) => {
                const height =
                  entry.count === null
                    ? 0
                    : Math.max(entry.count === 0 ? 1 : 2, (entry.count / maxCount) * 100);
                const style: PlotStyle = { "--bar-height": `${height}%` };

                return (
                  <li
                    key={entry.grade}
                    className={entry.isCurrentBuildingGrade ? styles.currentColumn : undefined}
                    style={style}
                  >
                    <span className={styles.valueLabel}>
                      {entry.count === null ? "우리 집" : formatNumber(entry.count)}
                    </span>
                    <span
                      className={
                        entry.count === null
                          ? styles.currentMarker
                          : cn(styles.bar, entry.isCurrentBuildingGrade && styles.currentBar)
                      }
                    />
                    <span className={styles.gradeLabel}>{entry.grade}</span>
                  </li>
                );
              })}
            </ol>

            <ol className={styles.hitTargets} aria-label="등급별 상세 값">
              {entries.map((entry) => (
                <li key={entry.grade}>
                  <button
                    type="button"
                    className={styles.hitTarget}
                    aria-label={`${entry.label}${entry.isCurrentBuildingGrade ? ", 이 건물의 등급" : ""}, ${describeCount(entry)}`}
                  >
                    <span className={styles.tooltip} role="tooltip">
                      <strong>{entry.label}</strong>
                      <span>
                        {entry.isCurrentBuildingGrade ? "이 건물 등급 · " : ""}
                        {describeCount(entry)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className={styles.legend} aria-label="범례">
        <span>
          <i className={styles.peerKey} aria-hidden="true" /> {peerNoun} 수
        </span>
        <span>
          <i className={styles.currentKey} aria-hidden="true" /> 이 건물 등급
        </span>
      </div>

      <details className={styles.tableDetails}>
        <summary>정확한 값 표로 보기</summary>
        <div className={styles.tableScroller}>
          <table>
            <caption className="sr-only">
              {areaLabel} {peerNoun}의 에너지 등급별 분포
            </caption>
            <thead>
              <tr>
                <th scope="col">에너지 등급</th>
                <th scope="col">{peerNoun} 수</th>
                <th scope="col">이 건물</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.grade}>
                  <th scope="row">{entry.label}</th>
                  <td>
                    {entry.count === null ? "집계값 없음" : `${formatNumber(entry.count)}건`}
                  </td>
                  <td>{entry.isCurrentBuildingGrade ? "이 건물 등급" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
