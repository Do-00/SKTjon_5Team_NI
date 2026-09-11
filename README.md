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

## 백엔드(beec) 연동

`/beec` 폴더가 실측 데이터 매칭을 담당하는 Spring Boot 백엔드입니다.

```
cd beec
./mvnw spring-boot:run   # Windows: .\mvnw.cmd spring-boot:run
```

기본 포트는 `8080`입니다. 프론트엔드는 `.env.local`의
`NEXT_PUBLIC_API_BASE_URL`(기본값 `http://localhost:8080`)로 호출합니다.
메인 화면은 카카오 우편번호 검색 결과(지번·도로명·건물명)로 브라우저에서
바로 `/api/match`를 부르고(`src/lib/eco-api.ts`), 서버 컴포넌트는
`src/lib/beec-client.ts`를 씁니다. 서버 쪽만 다른 주소를 쓰려면
`BEEC_API_BASE_URL=...`을 추가로 넣으세요.

메인 성적표의 연간 난방비·절감 여지는 beec에 아직 없는 값이라, 우리 앱 자체의
같은 오리진 라우트 `src/app/api/energy-cost`가 예시 값을 대신 응답합니다
(등급별 예시 표는 그 파일 안에 있어요). 예전엔 MSW가 beec 주소로 나가는
요청을 가로채는 방식이었는데, 브라우저가 Service Worker 등록에 실패하면
"개선 후" 탭과 절감액 카드가 통째로 사라지는 문제가 있어서 일반 라우트
핸들러로 바꿨습니다.

주소 검색(`searchBuildings`)은 먼저 beec의 `/api/match`(동+번지 실측 데이터)를
시도하고, 매칭이 없거나 beec가 꺼져 있으면 `src/data/buildings.ts`의
목데이터로 자동 대체되어 데모가 계속 동작합니다. 단, beec는 아직 준공연도·
구조·연면적·난방방식 같은 건축물대장 정보를 제공하지 않아서(별도 건축HUB
연동 예정), 실측으로 매칭된 건물도 이 항목들은 임시 값으로 표시됩니다.
