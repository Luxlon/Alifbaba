# AlifBaBa — AI Coding Agent Instructions

Islamic education app for children (5–12). Next.js 14 App Router, TypeScript, Tailwind, Zustand, Supabase (progress + profiles), local session.

## Architecture & Data Flow

- **Routing/UI**: Protected app lives under [app/(main)](app/(main))/ with shared layout [app/(main)/layout.tsx](app/(main)/layout.tsx) that mounts Sidebar, MobileHeader, DailyLoginModal, and RouteLoader. Root layout wraps everything with [AuthProvider](components/providers/auth-provider.tsx) and Toaster ([app/layout.tsx](app/layout.tsx)).
- **Auth/Session**: No Supabase Auth. Client session stored in localStorage key `alifbaba_session` ([lib/session.ts](lib/session.ts)). Middleware guards routes and redirects by role (student/teacher/superadmin) ([middleware.ts](middleware.ts), [lib/supabase/middleware.ts](lib/supabase/middleware.ts)). Login validates against `profiles` table via Supabase client in the AuthProvider.
- **State (Zustand)**: Stores are in-memory (no persist).
  - [store/use-user-progress.tsx](store/use-user-progress.tsx) — hearts, xp, points, streak; actions update local state AND call Supabase `user_progress` via [lib/supabase/progress-service.ts](lib/supabase/progress-service.ts).
  - [store/use-lesson-progress.tsx](store/use-lesson-progress.tsx) — module progress for hijaiyah/stories/hadith/iqro; also syncs to Supabase via the same service.
  - Initialization flows from AuthProvider after login: `loadFromSupabase(userId)` for both stores.
- **Supabase**: Browser/server clients read `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with build-time placeholders ([lib/supabase/client.ts](lib/supabase/client.ts), [lib/supabase/server.ts](lib/supabase/server.ts)). Progress services map DB rows ↔ app types and centralize upsert/fetch per module.
- **Content**: App data constants live in [constants.ts](constants.ts) (`HIJAIYAH_LETTERS`, `PROPHET_STORIES`, `HADITH_LIST`, `IQRO_DATA`) and are consumed by pages/components.

## Project Conventions

- **Client components**: All stateful UI must start with "use client". Example: mount stores in pages like [app/(main)/hijaiyah/page.tsx](app/(main)/hijaiyah/page.tsx).
- **Store keys**:
  - Hijaiyah progress is keyed by `letterName` (e.g., "Alif") and uses sequential unlock (previous letter completed).
  - Stories/Hadith keyed by their `id` from constants.
- **Styling**: Use `cn()` from [lib/utils.ts](lib/utils.ts) to merge Tailwind classes. Mobile-first with `lg:hidden`/`hidden lg:flex` patterns.
- **Suspense/Loading**: Each route folder has `loading.tsx` for route transitions.
- **Gamification constants**: Tune in [constants.ts](constants.ts): `MAX_HEARTS`, `XP_PER_LESSON`, `XP_PER_CORRECT_ANSWER`, `POINTS_TO_REFILL`.

## Integration Points

- **Supabase tables**: `user_progress`, `hijaiyah_progress`, `story_progress`, `hadith_progress`, `iqro_progress`, `profiles`. CRUD is centralized in [lib/supabase/progress-service.ts](lib/supabase/progress-service.ts).
- **Assets**: Audio under [public/audio](public/audio). Paths in [constants.ts](constants.ts) must match actual files. Use [components/audio-player.tsx](components/audio-player.tsx) (variants: button/inline/full with optional speed control).
- **Video**: [components/youtube-player.tsx](components/youtube-player.tsx) expects a YouTube video ID.
- **PDFs**: Iqro PDFs served from [public/iqro](public/iqro) via [components/pdf-viewer.tsx](components/pdf-viewer.tsx).

## Developer Workflows

- **Commands**:
  - `npm run dev` — start dev server on http://localhost:3000
  - `npm run build` / `npm start` — production build/serve
  - `npm run lint` — Next.js ESLint config
- **Env (.env.local)**: Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and optionally `NEXT_PUBLIC_APP_URL` (used by `absoluteUrl()` in [lib/utils.ts](lib/utils.ts)).
- **Debugging**:
  - Session: localStorage `alifbaba_session`; middleware uses a cookie mirror for redirects.
  - Progress: verify store `isInitialized` flags before rendering; if missing data, check Supabase rows via service methods.
  - Media: broken audio usually means a path mismatch between [constants.ts](constants.ts) and [public/audio](public/audio).

## Adding Features (practical steps)

1) Route: add `app/(main)/<module>/page.tsx` and optional `[id]/page.tsx` + `loading.tsx`.
2) Data: extend [constants.ts](constants.ts) and, if needed, types in [types/database.ts](types/database.ts).
3) Progress: add or reuse actions in [store/use-lesson-progress.tsx](store/use-lesson-progress.tsx); wire Supabase upserts via the service.
4) Navigation: update [components/sidebar.tsx](components/sidebar.tsx) and [components/mobile-header.tsx](components/mobile-header.tsx) if the entry should be visible.

## Usage Example

```tsx
"use client";
import { useUserProgress } from "@/store/use-user-progress";

export function LessonDone() {
  const addXp = useUserProgress((s) => s.addXp);
  return <button onClick={() => addXp(10)}>Claim +10 XP</button>;
}
```

Notes
- Stores do not use persist; Supabase is the source of truth. Legacy helpers in the service reference old localStorage keys — prefer direct Supabase sync via store actions.
- Respect role-based redirects (student/teacher/superadmin) when adding new protected routes.
