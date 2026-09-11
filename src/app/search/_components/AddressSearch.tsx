"use client";

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Icon, cn } from "@/src/components/ui";
import { KAKAO_POSTCODE_SRC, openKakaoPostcode, toReportLookupHref } from "@/src/lib/kakao-postcode";
import { SEARCH_PANEL_CLASS, SearchBar } from "./SearchBar";

export interface AddressSearchProps {
  className?: string;
}

/**
 * Address search backed by the Kakao postcode popup. Picking an address
 * navigates to `/report?jibunAddress=…`, which asks the energy-grade API for
 * that building. Falls back to the plain text `SearchBar` if the Kakao
 * script can't load.
 */
export function AddressSearch({ className }: AddressSearchProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  if (status === "failed") {
    return <SearchBar className={className} />;
  }

  function openPostcode() {
    openKakaoPostcode(
      { oncomplete: (data) => router.push(toReportLookupHref(data)) },
      { popupTitle: "에코 체크 · 주소 검색", popupKey: "eco-check-postcode" },
    );
  }

  const isReady = status === "ready";

  return (
    <>
      <Script
        src={KAKAO_POSTCODE_SRC}
        strategy="afterInteractive"
        onReady={() => setStatus("ready")}
        onError={() => setStatus("failed")}
      />
      <div role="search" aria-label="건물 주소 검색" className={cn(SEARCH_PANEL_CLASS, className)}>
        <button
          type="button"
          onClick={openPostcode}
          disabled={!isReady}
          aria-haspopup="dialog"
          className="flex h-14 min-w-0 flex-1 items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-card)] px-[var(--space-4)] text-left text-[length:var(--text-body-size)] text-[var(--text-muted)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-brand)] disabled:cursor-wait"
        >
          <Icon name="search" size={22} className="shrink-0" />
          <span className="truncate">도로명·지번 주소로 검색 (예: 월드컵로 120)</span>
        </button>
        <Button
          variant="primary"
          size="lg"
          onClick={openPostcode}
          loading={!isReady}
          trailingIcon={<Icon name="arrow-right" size={22} />}
        >
          등급 확인하기
        </Button>
      </div>
    </>
  );
}
