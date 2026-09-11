# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint (eslint-config-next/core-web-vitals + typescript)
```

No test runner is configured yet.

## Architecture

**Next.js 16.3.4 App Router** — source lives entirely under `src/`.

```
src/
  app/
    layout.tsx          # Root layout — mounts MSWComponent, sets Geist fonts
    page.tsx            # Home page (Server Component by default)
    globals.css         # Tailwind v4 via @import "tailwindcss"; custom CSS vars
    MSWComponent.tsx    # 'use client' — boots MSW worker on mount (dev only)
  mocks/
    handlers.ts         # MSW request handlers — add API routes here post-announcement
    browser.ts          # setupWorker(handlers) — MSW browser worker instance
    http.ts             # api.{get,post,put,patch,delete} fetch wrapper
```

### MSW wiring

- `handlers.ts` → `browser.ts` → `MSWComponent.tsx` → `layout.tsx` (body)
- Worker starts only in development (`NODE_ENV !== "development"` guard in MSWComponent)
- `onUnhandledRequest: "bypass"` — real requests not listed in handlers pass through normally
- `public/mockServiceWorker.js` is pre-generated; do not delete it

### Adding a mock API endpoint

Edit `src/mocks/handlers.ts`:
```ts
import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("/api/items", () => HttpResponse.json({ items: [] })),
];
```

### Fetch wrapper

`src/mocks/http.ts` exports `api.get<T>`, `api.post<T>`, etc.
- Dev: relative paths (MSW intercepts them)
- Prod: prepends `NEXT_PUBLIC_API_BASE_URL` env var

### TypeScript paths

`@/*` resolves to the **repo root** (not `src/`). Use `../mocks/...` for relative imports from inside `src/app/`, or `@/src/mocks/...` for absolute imports.

### Tailwind v4

Uses `@tailwindcss/postcss` (not the classic `tailwindcss` plugin). No `tailwind.config.*` file — configuration is done entirely via `@theme` blocks in CSS.

### Layout type convention

Root layout uses `LayoutProps<"/">` (Next.js 16 generated type) instead of the classic `{ children: React.ReactNode }`.
