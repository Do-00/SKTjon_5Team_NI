import { NextResponse } from "next/server";
import {
  buildRoleAdvicePrompt,
  fallbackRoleAdvice,
  type RoleAdviceInput,
} from "@/src/lib/role-advice";

/**
 * Gemini Flash를 서버에서만 호출하는 라우트 핸들러.
 *
 * `src/app/api/energy-comment/route.ts`와 같은 이유로 `GEMINI_API_KEY`는
 * 여기서만 쓰이고 클라이언트 번들에는 절대 노출되지 않는다.
 */

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: Request) {
  const input = (await request.json()) as RoleAdviceInput;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ advice: fallbackRoleAdvice(input), source: "fallback" });
  }

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildRoleAdvicePrompt(input) }] }],
        generationConfig: { maxOutputTokens: 200, temperature: 0.6 },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const json = await res.json();
    const text: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    const advice = text?.trim();
    if (!advice) {
      throw new Error("Gemini API returned no text");
    }

    return NextResponse.json({ advice, source: "gemini" });
  } catch (error) {
    console.error("[api/role-advice] Gemini call failed, using fallback", error);
    return NextResponse.json({ advice: fallbackRoleAdvice(input), source: "fallback" });
  }
}
