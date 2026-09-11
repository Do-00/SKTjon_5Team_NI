import { NextResponse } from "next/server";
import { simulateWhatIf } from "@/src/lib/beec-client";
import {
  REMODEL_MEASURES,
  REMODEL_REPORT_SCHEMA,
  acceptGeminiRemodelReport,
  buildRemodelReportPrompt,
  completeReference,
  computeLocalReference,
  currentStateOf,
  fallbackRemodelReport,
  type RemodelReference,
  type RemodelReportInput,
} from "@/src/lib/remodel-report";
import { mapSimulateResponse, toSimulatePurpose } from "@/src/lib/what-if";

/**
 * Gemini 리모델링 리포트 — Gemini Flash를 서버에서만 호출하는 라우트 핸들러.
 *
 * `GEMINI_API_KEY`는 `NEXT_PUBLIC_` 접두어가 없으므로 클라이언트 번들에
 * 노출되지 않는다. 키가 없거나 호출·검증이 실패하면 참고값으로 쓴 규칙 기반
 * 리포트(`source: "fallback"`)를 돌려준다.
 */

// gemini-2.0-flash 는 서비스 종료(404). 3.6-flash 는 한 번에 50초 이상 걸리고 과부하(503)가
// 잦아서, 사고를 최소로 둔 3.5-flash(약 2초)를 쓴다.
const GEMINI_MODEL = "gemini-3.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
/** 이 시간 안에 답이 없으면 규칙 기반 리포트로 넘어간다 — 카드가 스켈레톤으로 오래 멈춰 있지 않게. */
const GEMINI_TIMEOUT_MS = 60_000;

/**
 * 6가지 항목 적용 결과를 beec `/api/simulate`로 계산한다. 실제 소요량이 없거나
 * (통계 추정 구간 중간값·추정 보류) beec가 없으면 같은 절감률의 로컬 계산을 쓴다.
 */
async function computeReference(input: RemodelReportInput): Promise<RemodelReference> {
  const current = currentStateOf(input);
  const local = computeLocalReference(current);
  if (current.basis !== "data" || current.energy === null) return local;

  try {
    const result = await simulateWhatIf(
      current.energy,
      REMODEL_MEASURES.map((measure) => measure.code),
      toSimulatePurpose(input.useType),
    );
    const mapped = mapSimulateResponse(result, 0, input.grade);
    if (!mapped) return local;
    return completeReference(current, {
      reductionPercent: mapped.reductionPercent,
      projectedPrimaryEnergyKwh: mapped.projectedPrimaryEnergyKwh,
      projectedGrade: mapped.projectedGrade,
      basis: "beec",
    });
  } catch {
    return local;
  }
}

export async function POST(request: Request) {
  const input = (await request.json()) as RemodelReportInput;
  const reference = await computeReference(input);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(fallbackRemodelReport(input, reference));
  }

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildRemodelReportPrompt(input, reference) }] }],
        generationConfig: {
          // 현재 소요량 추정까지 맡기므로 오래 생각하게 둔다. 사고 토큰도 이 한도에서 빠져서 넉넉히.
          maxOutputTokens: 16384,
          thinkingConfig: { thinkingLevel: "high" },
          temperature: 0.5,
          responseMimeType: "application/json",
          responseSchema: REMODEL_REPORT_SCHEMA,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const json = await res.json();
    const text: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Gemini API returned no text");
    }

    const verdict = acceptGeminiRemodelReport(JSON.parse(text), reference);
    if ("reason" in verdict) {
      throw new Error(`Gemini answer rejected: ${verdict.reason}`);
    }
    return NextResponse.json(verdict.result);
  } catch (error) {
    console.error("[api/remodel-report] Gemini call failed, using fallback", error);
    return NextResponse.json(fallbackRemodelReport(input, reference));
  }
}
