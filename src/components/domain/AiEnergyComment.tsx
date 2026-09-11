"use client";

import { useEffect, useState } from "react";
import { Card, Icon } from "@/src/components/ui";
import { fallbackEnergyComment, type EnergyCommentInput } from "@/src/lib/energy-comment";

export type AiEnergyCommentProps = EnergyCommentInput;

/**
 * "현재 등급, 절감 방향" 한마디 카드. 마운트 시 `/api/energy-comment`(Gemini
 * Flash 연동)를 호출하고, 로딩 중에는 스켈레톤을, 실패 시에는 서버와 동일한
 * 규칙 기반 문구를 즉시 보여준다.
 */
export function AiEnergyComment(props: AiEnergyCommentProps) {
  // `comment === null` doubles as the loading flag, so there's no separate
  // state to resynchronize (and no synchronous setState in the effect body).
  const [comment, setComment] = useState<string | null>(null);
  const loading = comment === null;

  useEffect(() => {
    let cancelled = false;

    fetch("/api/energy-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((data: { comment?: string }) => {
        if (!cancelled) {
          setComment(data.comment ?? fallbackEnergyComment(props));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setComment(fallbackEnergyComment(props));
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.grade, props.buildingName]);

  return (
    <Card tone="brand" padding="lg" className="flex items-start gap-[var(--space-4)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--teal-600)] text-white">
        <Icon name="sparkles" size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[length:var(--text-caption-size)] font-bold text-[var(--teal-700)]">
          AI 한마디 · Gemini
        </p>
        {loading ? (
          <div className="mt-[var(--space-2)] h-5 w-3/4 animate-pulse rounded bg-[var(--teal-100)]" />
        ) : (
          <p className="mt-[var(--space-1)] text-[17px] font-bold leading-relaxed text-[var(--text-strong)]">
            {comment}
          </p>
        )}
      </div>
    </Card>
  );
}
