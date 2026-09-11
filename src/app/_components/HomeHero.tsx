"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Icon } from "@/src/components/ui";
import { encodeAddressId } from "@/src/lib/address-id";
import { matchPostcodeAddress, toJibunAddress } from "@/src/lib/eco-api";
import { toSelectedAddress, type KakaoPostcodeData } from "@/src/lib/kakao-postcode";
import { rememberLastSearch, searchHref } from "@/src/lib/last-search";
import { AddressSearchBar } from "./AddressSearchBar";

type LookupStatus = "idle" | "loading" | "error";

/** Same footprint as `EnergyGradeBadge size="lg"`, in neutral grey, for "no grade yet". */
function UnknownGradeBadge({ caption, pulsing = false }: { caption: string; pulsing?: boolean }) {
  return (
    <span className="inline-flex shrink-0 flex-col items-center gap-[var(--space-2)]">
      <span
        className={`flex h-[116px] w-[116px] items-center justify-center rounded-[var(--radius-lg)] border-[3px] border-[var(--ink-300)] bg-[var(--surface-sunken)] font-brand text-[64px] font-black leading-none text-[var(--ink-400)]${pulsing ? " animate-pulse" : ""}`}
      >
        <span aria-hidden="true">?</span>
        <span className="sr-only">등급 미확인</span>
      </span>
      <span className="whitespace-nowrap text-[length:var(--text-caption-size)] font-medium text-[var(--text-muted)]">
        {caption}
      </span>
    </span>
  );
}

const CAPTIONS: Record<LookupStatus, string> = {
  idle: "주소 입력 전",
  loading: "성적표를 불러오는 중…",
  error: "조회 실패",
};

/**
 * Home hero: address search on the left, a grey "?" placeholder card on the
 * right. Picking an address checks beec's `/api/match` and moves on — to the
 * report (`/report/addr-…`) on a hit, or to `/search`'s 등급 추정 form when
 * beec has no 실측 data for it. The card only ever shows idle/loading/error.
 */
export function HomeHero() {
  const router = useRouter();
  const [picked, setPicked] = useState<KakaoPostcodeData | null>(null);
  const [status, setStatus] = useState<LookupStatus>("idle");
  // Ignores responses for an address the user has since replaced.
  const latestRequest = useRef(0);

  const address = picked ? toSelectedAddress(picked) : "";

  async function handleSelect(data: KakaoPostcodeData) {
    const requestId = ++latestRequest.current;
    setPicked(data);
    setStatus("loading");
    // beec keys its match on the 지번 address, so that's what goes into the URL and the nav's "last search".
    const jibunAddress = toJibunAddress(data) || toSelectedAddress(data);

    try {
      const match = await matchPostcodeAddress(data);
      if (requestId !== latestRequest.current) return;

      rememberLastSearch(jibunAddress);
      if (match.found) {
        const bn = data.buildingName ? `?bn=${encodeURIComponent(data.buildingName)}` : "";
        router.push(`/report/${encodeAddressId(jibunAddress)}${bn}`);
      } else {
        router.push(searchHref(jibunAddress));
      }
    } catch {
      if (requestId === latestRequest.current) setStatus("error");
    }
  }

  return (
    <section aria-labelledby="home-hero-title" className="bg-[var(--surface-brand)]">
      <div className="eco-container grid items-center gap-[var(--space-12)] py-[var(--space-16)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[var(--space-16)] lg:py-[var(--space-20)]">
        <div className="flex min-w-0 flex-col gap-[var(--space-6)]">
          <span className="inline-flex items-center gap-1.5 self-start whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--teal-100)] px-4 py-2 text-[16px] font-bold text-[var(--teal-800)]">
            <Icon name="leaf" size={16} />
            탄소중립 의사결정 플랫폼
          </span>
          <h1
            id="home-hero-title"
            className="font-brand text-[40px] font-black leading-[1.15] tracking-[-0.03em] text-white md:text-[56px]"
          >
            주소로 확인하는
            <br />
            우리 집 에너지 성적표
          </h1>
          <p className="max-w-[520px] text-[19px] leading-[1.65] text-[var(--teal-100)] md:text-[21px]">
            인증 이력이 없는 건물도 등급을 추정해 드립니다. 소유주·임차인 유형에 따라 실천 방법과 정부 지원사업을
            바로 안내합니다.
          </p>
          <AddressSearchBar value={address} onSelect={handleSelect} className="max-w-[620px]" />
        </div>

        <div className="flex justify-center">
          <Card
            padding="lg"
            aria-live="polite"
            aria-busy={status === "loading"}
            className="flex w-full max-w-[380px] flex-col items-center gap-[var(--space-5)]"
          >
            <p className="flex w-full items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--surface-sunken)] px-[var(--space-4)] py-[var(--space-3)] text-center text-[17px] break-keep text-[var(--text-muted)]">
              <Icon name="map-pin" size={18} />
              {picked ? address : "주소를 입력하면 에너지 등급을 알려 드려요"}
            </p>
            <UnknownGradeBadge caption={CAPTIONS[status]} pulsing={status === "loading"} />
            {status === "error" ? (
              <p role="alert" className="text-center text-[15px] leading-[1.6] break-keep text-[var(--status-danger)]">
                등급 서버에 연결하지 못했어요. 백엔드가 켜져 있는지 확인한 뒤 다시 검색해 주세요.
              </p>
            ) : null}
            <dl className="flex w-full justify-between border-t border-[var(--border-subtle)] pt-[var(--space-4)]">
              <div>
                <dt className="text-[15px] text-[var(--text-muted)]">연간 난방비</dt>
                <dd className="font-brand text-[24px] font-black text-[var(--ink-300)]">?</dd>
              </div>
              <div>
                <dt className="text-[15px] text-[var(--text-muted)]">절감 여지</dt>
                <dd className="font-brand text-[24px] font-black text-[var(--ink-300)]">?</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </section>
  );
}
