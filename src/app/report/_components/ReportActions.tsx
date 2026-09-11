"use client";

import { useRouter } from "next/navigation";
import { Button, Icon, ToastProvider, useToast } from "@/src/components/ui";

interface ReportActionsProps {
  /** Path to return to after logging in to save, e.g. `/report/bld-001`. */
  savePath: string;
  buildingName: string;
}

function ReportActionButtons({ savePath, buildingName }: ReportActionsProps) {
  const router = useRouter();
  const { show } = useToast();

  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: `${buildingName} 에너지 성적표`,
      text: `${buildingName}의 에너지 등급을 확인해 보세요.`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      show({
        title: "링크를 복사했어요",
        description: "원하는 곳에 붙여넣어 성적표를 공유하세요.",
        tone: "good",
      });
    } catch {
      show({
        title: "링크를 자동으로 복사하지 못했어요",
        description: "브라우저 주소창의 링크를 직접 복사해 주세요.",
        tone: "warn",
      });
    }
  }

  function handleSave() {
    router.push(`/login?next=${encodeURIComponent(savePath)}`);
  }

  return (
    <div className="flex w-full gap-[var(--space-3)]">
      <Button
        variant="secondary"
        size="md"
        fullWidth
        leadingIcon={<Icon name="share" size={20} />}
        onClick={handleShare}
      >
        공유
      </Button>
      <Button
        variant="secondary"
        size="md"
        fullWidth
        leadingIcon={<Icon name="file-text" size={20} />}
        onClick={handleSave}
      >
        저장
      </Button>
    </div>
  );
}

export function ReportActions(props: ReportActionsProps) {
  return (
    <ToastProvider>
      <ReportActionButtons {...props} />
    </ToastProvider>
  );
}
