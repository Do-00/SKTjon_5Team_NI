import { GRADES, type GradeCode } from "../../data/grades";
import { cn } from "../ui/utils";
import { getGradeColorVars } from "./grade-tokens";

export type EnergyGradeBadgeSize = "sm" | "md" | "lg";

export interface EnergyGradeBadgeProps {
  /** `null` renders a neutral "?" tile for a building whose grade isn't known yet. */
  grade: GradeCode | null;
  size?: EnergyGradeBadgeSize;
  /** Small muted line under the tile, e.g. `"개선 후 예상"`. */
  caption?: string;
  /** Shorthand for `caption="추정 등급"`. */
  estimated?: boolean;
  /** Shorthand for a caption with the grade's full label (e.g. `"5등급"`). */
  showLabel?: boolean;
  className?: string;
}

const SIZE_PX: Record<EnergyGradeBadgeSize, number> = { sm: 48, md: 68, lg: 116 };

/** `1+++` is four characters, so longer codes are set smaller than single-digit grades. */
function fontRatio(code: string): number {
  if (code.length >= 4) return 0.26;
  if (code.length === 3) return 0.32;
  if (code.length === 2) return 0.4;
  return 0.55;
}

/** Square, grade-colored tile for a building energy-efficiency grade (`1+++` best … `7` worst). */
export function EnergyGradeBadge({
  grade,
  size = "md",
  caption,
  estimated = false,
  showLabel = false,
  className,
}: EnergyGradeBadgeProps) {
  const px = SIZE_PX[size];
  const code = grade ?? "?";
  const label = grade ? GRADES[grade].label : "등급 미확인";
  const colors = grade ? getGradeColorVars(grade) : null;
  const captionText = caption ?? (estimated ? "추정 등급" : showLabel ? label : undefined);

  return (
    <span className={cn("inline-flex shrink-0 flex-col items-center gap-[var(--space-2)]", className)}>
      <span
        className="flex items-center justify-center whitespace-nowrap rounded-[var(--radius-lg)] font-brand font-black leading-none tracking-[-0.04em]"
        style={{
          width: px,
          height: px,
          fontSize: Math.round(px * fontRatio(code)),
          backgroundColor: colors ? `var(${colors.soft})` : "var(--surface-card)",
          color: colors ? `var(${colors.color})` : "var(--text-muted)",
          border: colors ? `3px solid var(${colors.color})` : "3px dashed var(--border-strong)",
        }}
      >
        <span aria-hidden="true">{code}</span>
        <span className="sr-only">{label}</span>
      </span>
      {captionText ? (
        <span className="whitespace-nowrap text-[length:var(--text-caption-size)] font-medium text-[var(--text-muted)]">
          {captionText}
        </span>
      ) : null}
    </span>
  );
}
