"use client";

import { useSyncExternalStore } from "react";
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
 * 우측 하단 서경대학교 광고 팝업. 처음 들어왔을 때 표시되고, X로 닫으면
 * 같은 브라우저 세션 동안(sessionStorage) 다시 뜨지 않는다.
 */
export function SkunivAdPopup() {
  const hidden = useSyncExternalStore(
    subscribe,
    () => dismissedInMemory || isDismissed(),
    // 서버 렌더링에서는 숨겼다가 클라이언트에서 표시 여부를 결정한다.
    () => true
  );

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
      >
        <Image
          src="/assets/skuniv-popup.png"
          alt="어서와 서경대학교"
          width={480}
          height={480}
          className="block h-auto w-full"
        />
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="광고 닫기"
        title="닫기"
        className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
      >
        <Icon name="close" size={16} />
      </button>
    </aside>
  );
}
