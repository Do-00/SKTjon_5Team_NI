import { http, HttpResponse } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

// 가짜 유저 데이터
const Users: Record<number, { id: number; email: string; nickname: string }> = {
  1: { id: 1, email: 'test@example.com', nickname: '테스트유저' },
};

export const handlers = [
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
