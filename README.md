# SKThon_5Team_NI

## AI 한마디 (Gemini 연동)

`/report/[buildingId]` 페이지의 "AI 한마디" 카드는 서버 라우트
`src/app/api/energy-comment`에서 Gemini Flash를 호출합니다. 프로젝트 루트에
`.env.local` 파일을 만들고 아래 키를 넣으세요 (`.gitignore`에 이미 포함되어
커밋되지 않습니다).

```
GEMINI_API_KEY=...
```

키가 없거나 API 호출이 실패하면 `src/lib/energy-comment.ts`의 규칙 기반
문구로 자동 대체됩니다.
