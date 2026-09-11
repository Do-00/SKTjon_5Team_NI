import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/src/lib/api-base-url';
import type { EnergyMetrics } from '@/src/lib/eco-api';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

// 등급별 예시 성적표 수치 — beec에 아직 없는 /api/energy-cost를 MSW가 대신 응답합니다.
// 난방비(만원) · 절감 여지(%) · 탄소 배출(tCO₂) · 전부 실천 시 절감액(만원).
// 값을 바꿔 가며 실험하세요. 표에 없는 등급은 '5' 값을 씁니다.
const EXAMPLE_ENERGY_COST: Record<string, EnergyMetrics> = {
  '1+++': { annualEnergyCostManwon: 38, percentileRank: 5, annualCarbonEmissionTons: 1.0, annualSavingsPotentialManwon: 4 },
  '1++': { annualEnergyCostManwon: 52, percentileRank: 8, annualCarbonEmissionTons: 1.3, annualSavingsPotentialManwon: 8 },
  '1+': { annualEnergyCostManwon: 66, percentileRank: 12, annualCarbonEmissionTons: 1.7, annualSavingsPotentialManwon: 14 },
  '1': { annualEnergyCostManwon: 80, percentileRank: 16, annualCarbonEmissionTons: 2.0, annualSavingsPotentialManwon: 22 },
  '2': { annualEnergyCostManwon: 94, percentileRank: 20, annualCarbonEmissionTons: 2.4, annualSavingsPotentialManwon: 32 },
  '3': { annualEnergyCostManwon: 108, percentileRank: 24, annualCarbonEmissionTons: 2.8, annualSavingsPotentialManwon: 45 },
  '4': { annualEnergyCostManwon: 124, percentileRank: 28, annualCarbonEmissionTons: 3.2, annualSavingsPotentialManwon: 62 },
  '5': { annualEnergyCostManwon: 142, percentileRank: 31, annualCarbonEmissionTons: 3.6, annualSavingsPotentialManwon: 94 },
  '6': { annualEnergyCostManwon: 163, percentileRank: 38, annualCarbonEmissionTons: 4.1, annualSavingsPotentialManwon: 120 },
  '7': { annualEnergyCostManwon: 188, percentileRank: 45, annualCarbonEmissionTons: 4.7, annualSavingsPotentialManwon: 150 },
};

// 가짜 유저 데이터
const Users: Record<number, { id: number; email: string; nickname: string }> = {
  1: { id: 1, email: 'test@example.com', nickname: '테스트유저' },
};

export const handlers = [
  // 예시 난방비 (beec 백엔드 주소로 나가는 요청을 가로챔)
  http.get(`${API_BASE_URL}/api/energy-cost`, ({ request }) => {
    const gradeCode = new URL(request.url).searchParams.get('gradeCode') ?? '';
    const cost = EXAMPLE_ENERGY_COST[gradeCode] ?? EXAMPLE_ENERGY_COST['5'];
    console.log('[MSW] GET /api/energy-cost', gradeCode, cost);
    return HttpResponse.json(cost);
  }),

  // 로그인
  http.post(`${baseUrl}/api/login`, () => {
    console.log('[MSW] POST /api/login');
    return HttpResponse.json(Users[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    });
  }),

  // 로그아웃
  http.post(`${baseUrl}/api/logout`, () => {
    console.log('[MSW] POST /api/logout');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),

  // 회원가입
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log('[MSW] POST /api/users', await request.json().catch(() => null));
    // 이미 존재하는 유저 테스트: 아래 주석 해제
    // return HttpResponse.text(JSON.stringify('user_exists'), { status: 403 });
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    });
  }),
];
