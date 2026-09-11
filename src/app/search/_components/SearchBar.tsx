"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Icon, Input, cn } from "@/src/components/ui";

export interface SearchBarProps {
  /** Pre-fills the input, e.g. from the current `?q=` search param. */
  defaultValue?: string;
  submitLabel?: string;
  className?: string;
}

/**
 * Address search box for finding a building's Eco Check report: a white
 * raised panel holding the address input and the submit button. Client leaf
 * kept as small as possible so `/` and `/search` can stay Server Components:
 * it only owns the controlled input value and navigates to `/search?q=...`
 * on submit (also works via native form GET as a no-JS fallback).
 */
export function SearchBar({ defaultValue = "", submitLabel = "등급 확인하기", className }: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form
      role="search"
      action="/search"
      method="get"
      onSubmit={handleSubmit}
      aria-label="건물 주소 검색"
      className={cn(
        "flex w-full flex-col gap-[var(--space-3)] rounded-[var(--radius-lg)] bg-[var(--surface-card)] p-[var(--space-3)] shadow-[var(--shadow-raised)] sm:flex-row",
        className
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        건물 도로명 주소
      </label>
      <Input
        id={inputId}
        name="q"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="도로명 주소를 입력하세요 (예: 월드컵로 120)"
        leadingIcon={<Icon name="search" size={22} />}
        wrapperClassName="flex-1"
        className="h-14"
      />
      <Button type="submit" variant="primary" size="lg" trailingIcon={<Icon name="arrow-right" size={22} />}>
        {submitLabel}
      </Button>
    </form>
  );
}
