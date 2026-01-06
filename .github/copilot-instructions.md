# AlifBaBa - AI Coding Agent Instructions

**Islamic education app for children (ages 5-12)** — Next.js 14 App Router, TypeScript, Zustand, Tailwind CSS.

## Architecture Overview

- **State**: Zustand stores with `persist` middleware sync to localStorage + optional Supabase
  - `useUserProgress()` — XP, hearts (max 5), points, streak
  - `useLessonProgress()` — module completion tracking
- **Data**: All content in [constants.ts](constants.ts) (`HIJAIYAH_LETTERS`, `PROPHET_STORIES`, `HADITH_LIST`, `IQRO_DATA`)
- **Types**: [types/database.ts](types/database.ts) — `UserProgress`, `Challenge`, `ChallengeOption`
- **Backend**: Supabase integration via [lib/supabase/progress-service.ts](lib/supabase/progress-service.ts)

## Key Patterns

```tsx
// All stateful components need "use client"
"use client";
const { xp, hearts, addXp } = useUserProgress();
```

- **Routes**: `app/(main)/` group shares layout with Sidebar + MobileHeader
- **Styling**: Use `cn()` from [lib/utils.ts](lib/utils.ts) to merge Tailwind classes
- **Responsive**: Mobile-first with `hidden lg:flex` / `lg:hidden` patterns
- **Loading**: Each route folder has `loading.tsx` for Suspense boundaries

## Adding New Features

1. **New module**: Create `app/(main)/[module]/page.tsx` + `[id]/page.tsx` + `loading.tsx`
2. **Content**: Add data to [constants.ts](constants.ts), types to [types/database.ts](types/database.ts)
3. **Progress**: Add store method in [store/use-lesson-progress.tsx](store/use-lesson-progress.tsx)
4. **Navigation**: Update [components/sidebar.tsx](components/sidebar.tsx) and [components/mobile-header.tsx](components/mobile-header.tsx)

## Gamification Values

Edit in [constants.ts](constants.ts): `MAX_HEARTS=5`, `XP_PER_LESSON=10`, `XP_PER_CORRECT_ANSWER=5`, `POINTS_TO_REFILL=10`

## Media

- Audio: [public/audio/](public/audio/) — use `AudioPlayer` component
- YouTube: Pass video ID to `YoutubePlayer` component
- PDFs: [public/iqro/](public/iqro/) — use `PDFViewer` component

## Commands

```bash
npm run dev     # Dev server at localhost:3000
npm run build   # Production build
npm run lint    # ESLint check
```

## Debugging

- **State**: DevTools → Application → localStorage (keys: `alifbaba-*`)
- **Audio issues**: Verify paths in [constants.ts](constants.ts) match [public/audio/](public/audio/) files
