import { NextResponse } from "next/server";
import {
  buildEnergyCommentPrompt,
  fallbackEnergyComment,
  type EnergyCommentInput,
} from "@/src/lib/energy-comment";

/**
 * Gemini Flash를 서버에서만 호출하는 라우트 핸들러.
 *
 * `GEMINI_API_KEY`는 `NEXT_PUBLIC_` 접두어가 없으므로 클라이언트 번들에
 * 노출되지 않는다 — 브라우저는 이 라우트만 호출하고, 실제 키는 여기서만 쓰인다.
 */

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: Request) {
  const input = (await request.json()) as EnergyCommentInput;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ comment: fallbackEnergyComment(input), source: "fallback" });
  }

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildEnergyCommentPrompt(input) }] }],
        generationConfig: { maxOutputTokens: 150, temperature: 0.6 },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const json = await res.json();
    const text: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    const comment = text?.trim();
    if (!comment) {
      throw new Error("Gemini API returned no text");
    }

    return NextResponse.json({ comment, source: "gemini" });
  } catch (error) {
    console.error("[api/energy-comment] Gemini call failed, using fallback", error);
    return NextResponse.json({ comment: fallbackEnergyComment(input), source: "fallback" });
  }
}
