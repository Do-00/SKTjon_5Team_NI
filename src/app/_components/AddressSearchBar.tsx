"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { Button, Dialog, Icon, Input, cn } from "@/src/components/ui";
import { embedKakaoPostcode, loadKakaoPostcode, type KakaoPostcodeData } from "@/src/lib/kakao-postcode";

export interface AddressSearchBarProps {
  /** Address shown in the box once one has been picked. */
  value?: string;
  onSelect: (data: KakaoPostcodeData) => void;
  submitLabel?: string;
  className?: string;
}

type ScriptStatus = "loading" | "ready" | "error";

/**
 * Same white raised panel as `/search`'s `SearchBar`, but instead of free
 * text it opens the Kakao 우편번호 search in a dialog so the backend always
 * receives a normalized 도로명/지번 pair. The input is read-only and acts as
 * the trigger.
 */
export function AddressSearchBar({ value = "", onSelect, submitLabel = "등급 확인하기", className }: AddressSearchBarProps) {
  const [status, setStatus] = useState<ScriptStatus>("loading");
  const [dialogOpen, setDialogOpen] = useState(false);
  const inputId = useId();

  // Preload on mount so the dialog's search UI appears without a script-load delay.
  useEffect(() => {
    let cancelled = false;
    loadKakaoPostcode().then(
      () => !cancelled && setStatus("ready"),
      () => !cancelled && setStatus("error"),
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  // Callback ref: embed as soon as the dialog's container is in the DOM.
  const embedContainerRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;
      embedKakaoPostcode(
        element,
        (data) => {
          setDialogOpen(false);
          onSelect(data);
        },
        { q: value || undefined },
      );
    },
    [onSelect, value],
  );

  function openDialog() {
    if (status === "ready") setDialogOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog();
    }
  }

  return (
    <div
      role="search"
      aria-label="건물 주소 검색"
      className={cn(
        "flex w-full flex-col gap-[var(--space-3)] rounded-[var(--radius-lg)] bg-[var(--surface-card)] p-[var(--space-3)] shadow-[var(--shadow-raised)] sm:flex-row sm:items-start",
        className
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        건물 주소
      </label>
      <Input
        id={inputId}
        type="text"
        readOnly
        value={value}
        onClick={openDialog}
        onKeyDown={handleKeyDown}
        placeholder="도로명·지번 주소를 검색하세요 (예: 월드컵로 120)"
        leadingIcon={<Icon name="search" size={22} />}
        error={status === "error" ? "주소 검색을 불러오지 못했어요. 새로고침 후 다시 시도해 주세요." : undefined}
        wrapperClassName="flex-1"
        className="h-14 cursor-pointer"
      />
      <Button
        variant="primary"
        size="lg"
        loading={status === "loading"}
        disabled={status === "error"}
        onClick={openDialog}
        trailingIcon={<Icon name="arrow-right" size={22} />}
      >
        {submitLabel}
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        title="주소 검색"
        description="도로명, 건물명, 지번 중 하나로 검색한 뒤 결과를 선택해 주세요."
        className="max-w-[520px]"
      >
        <div ref={embedContainerRef} className="h-[min(470px,60vh)] w-full" />
      </Dialog>
    </div>
  );
}
