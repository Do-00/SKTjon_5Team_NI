"use client";

import { Button, Dialog } from "@/src/components/ui";
import { formatProgramDeadline } from "@/src/components/domain/ProgramCard";
import type { SupportProgram } from "@/src/data/programs";

export interface LeaveDialogProps {
  /** The program whose external application page the user is about to leave for. `null` closes the dialog. */
  program: SupportProgram | null;
  onClose: () => void;
}

/**
 * Accessible confirmation shown before navigating away from Eco Check to a
 * program's official external application page. Only on explicit confirm
 * does it call `window.open(url, "_blank", "noopener,noreferrer")` — there is
 * no API call or logging of the action anywhere in this flow.
 */
export function LeaveDialog({ program, onClose }: LeaveDialogProps) {
  return (
    <Dialog
      open={program !== null}
      onClose={onClose}
      title={program?.name ?? ""}
      description={
        program
          ? `${program.provider} · ${formatProgramDeadline(program.deadline)}. 에코 체크를 벗어나 기관의 공식 신청 페이지로 이동합니다.`
          : undefined
      }
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            닫기
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              if (program) {
                window.open(program.officialUrl, "_blank", "noopener,noreferrer");
              }
              onClose();
            }}
          >
            신청하러 가기
          </Button>
        </>
      }
    />
  );
}
