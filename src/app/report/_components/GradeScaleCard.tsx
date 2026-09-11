import { GradeScale } from "@/src/components/domain";
import { SectionHeader } from "@/src/components/layout/SectionHeader";
import { Card } from "@/src/components/ui";
import type { GradeCode } from "@/src/data/grades";

/** The 등급 기준표 card shown under every report. */
export function GradeScaleCard({ grade }: { grade: GradeCode }) {
  return (
    <Card padding="lg" className="flex flex-col gap-[var(--space-4)]">
      <SectionHeader
        title="등급 기준표"
        hint="다른 등급을 누르면 연간 단위면적당 1차에너지소요량을 볼 수 있습니다."
        hintSize="sm"
      />
      <GradeScale value={grade} selectable />
    </Card>
  );
}
