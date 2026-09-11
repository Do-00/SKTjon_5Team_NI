"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Icon } from "@/src/components/ui/icons";

const DISMISS_KEY = "skuniv-ad-dismissed";
const SKUNIV_URL = "https://www.skuniv.ac.kr/";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    // 스토리지 접근이 막힌 환경이면 그냥 표시한다.
    return false;
  }
}

function dismiss() {
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // 무시 — 아래 알림으로 이번 페이지에서는 닫힌다.
  }
  dismissedInMemory = true;
  listeners.forEach((listener) => listener());
}

// sessionStorage가 막혀 있어도 X를 누르면 닫히도록 보조 플래그를 둔다.
let dismissedInMemory = false;

/**
 * 우측 하단 서경대학교 광고 팝업. 처음 들어왔을 때 표시된다. X를 누르면
 * 이미지가 흐려지며 '사이트로 이동'/'창닫기' 선택지가 뜨고, '창닫기'를
 * 눌러야 닫혀 같은 브라우저 세션 동안(sessionStorage) 다시 뜨지 않는다.
 */
export function SkunivAdPopup() {
  const hidden = useSyncExternalStore(
    subscribe,
    () => dismissedInMemory || isDismissed(),
    // 서버 렌더링에서는 숨겼다가 클라이언트에서 표시 여부를 결정한다.
    () => true
  );
  const [confirming, setConfirming] = useState(false);

  if (hidden) return null;

  return (
    <aside
      aria-label="서경대학교 광고"
      className="fixed right-4 bottom-4 z-40 w-[min(240px,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-card)] shadow-[var(--shadow-overlay)] sm:right-6 sm:bottom-6"
    >
      <a
        href={SKUNIV_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        tabIndex={confirming ? -1 : undefined}
        aria-hidden={confirming || undefined}
      >
        <Image
          src="/assets/skuniv-popup.png"
          alt="어서와 서경대학교"
          width={480}
          height={480}
          className={`block h-auto w-full transition-opacity ${confirming ? "opacity-25" : ""}`}
        />
      </a>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 left-2 inline-flex h-6 items-center rounded-[4px] bg-black/55 px-1.5 text-[12px] leading-none font-bold tracking-wide text-white"
      >
        AD
      </span>
      {confirming ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <p className="text-[16px] leading-snug font-bold text-[var(--text-strong)]">
            이 광고가 왜 표시되나요?
          </p>
          <div className="flex w-full flex-col gap-2">
            <a
              href={SKUNIV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--action-primary)] text-[16px] font-bold text-[var(--text-on-primary)] transition-colors hover:bg-[var(--action-primary-hover)]"
            >
              사이트로 이동
            </a>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex h-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] text-[16px] font-bold text-[var(--text-strong)] transition-colors hover:bg-[var(--action-disabled)]"
            >
              창닫기
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          aria-label="광고 닫기"
          title="닫기"
          className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </aside>
  );
}
