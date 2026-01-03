# AlifBaBa - AI Coding Agent Instructions

## Project Overview
**AlifBaBa** is an interactive Islamic education app for children (ages 5-12) teaching:
- 28 Hijaiyah letters with audio pronunciation and harakat (diacritical marks)
- 7 Prophet stories with video + quizzes
- 8 Hadiths with Arabic text, transliteration, and audio
- 6 Iqro levels for progressive reading practice

Built with **Next.js 14 (App Router)**, **TypeScript**, **Zustand** for state, **Tailwind CSS** for styling.

---

## Architecture Essentials

### State Management Pattern
All client-side state uses **Zustand** with persistence middleware (`zustand/middleware`):
- **`use-user-progress.tsx`**: XP, hearts (0-5), points currency, streak tracking
  - Methods: `addXp()`, `addHearts()`, `spendPoints()` (returns boolean), `updateStreak()`
  - Persists to localStorage; max 5 hearts, 10 XP per lesson, 5 XP per correct answer
- **`use-lesson-progress.tsx`**: Tracks completion of hijaiyah/story/hadith lessons
  - Methods: `completeHijaiyahLesson()`, `completeStoryLesson()`, `getTotalCompleted()`
- **`use-quests.tsx`**: Quest and achievement tracking

**Key pattern**: Import hooks as `"use client"` components. Access state directly: `const { xp, hearts } = useUserProgress()`.

### Data Flow
1. **Constants** ([constants.ts](constants.ts)) define all immutable content:
   - `HIJAIYAH_LETTERS[28]` with letter, name, audioFile, audioFathah, audioKasrah, audioDhammah
   - `PROPHET_STORIES[7]` with youtubeId (11 chars), challenges array
   - `HADITH_LIST[8]` with Arabic text, transliteration, audio paths
   - Gamification: `POINTS_TO_REFILL`, `MAX_HEARTS`, `XP_PER_LESSON`, `XP_BONUS_PERFECT`, quest definitions
2. **Types** ([types/database.ts](types/database.ts)) define interfaces: `UserProgress`, `HijaiyahProgress`, `Challenge`, `ChallengeOption`, etc.
3. **Progress helpers** ([lib/progress.ts](lib/progress.ts)) calculate: `calculateChallengeXP()`, `calculateLessonScore()`, `checkChallengeAnswer()`

### Styling System
- **Tailwind CSS** with custom config ([tailwind.config.ts](tailwind.config.ts))
- Utility: `cn()` from [lib/utils.ts](lib/utils.ts) merges Tailwind classes safely (clsx + tailwind-merge)
- Color palette: emerald (primary), amber, neutral; responsive breakpoints use `sm:`, `md:`, `lg:` prefixes
- Component pattern: Button, Dialog, Progress, Avatar from Radix UI (`@radix-ui/*`)

### Routing & Layouts
- **App Router** (Next.js 14) structure under [app/](app/)
- Route group `(main)` creates shared layout ([app/(main)/layout.tsx](app/(main)/layout.tsx)) with Sidebar + MobileHeader
- Protected content lives under [app/(main)/](app/(main)/) (learn, hijaiyah, stories, hadith, iqro, quests, shop, leaderboard, account)
- Landing page at [app/page.tsx](app/page.tsx) (root `/`)
- Mobile-first: responsive sidebar on desktop, bottom navbar on mobile via MobileHeader

---

## Critical Workflows

### Starting Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Build for production
npm start            # Run production server
npm run lint         # ESLint check
```

### Adding a New Learning Module
1. Create folder [app/(main)/newmodule/](app/(main)/)
2. Create `page.tsx` (list view) + `[id]/page.tsx` (detail) + `loading.tsx`
3. Add content constants to [constants.ts](constants.ts) (e.g., `NEW_MODULE_ITEMS`)
4. Create progress type in [types/database.ts](types/database.ts) (e.g., `NewModuleProgress`)
5. Add Zustand store method in [store/use-lesson-progress.tsx](store/use-lesson-progress.tsx)
6. Add nav link to Sidebar ([components/sidebar.tsx](components/sidebar.tsx)) and MobileHeader
7. Use `useUserProgress()` and `useLessonProgress()` to award XP/points on completion

### Quiz Implementation Pattern
Challenges are objects with structure:
```typescript
{
  type: "SELECT" | "LISTENING" | "SELECT_ALL" | "FILL_IN_BLANK",
  question: string,
  audioUrl?: string,
  options: [{ id, text, audioUrl?, isCorrect }, ...],
  correctAnswers: [id, ...],
  order: number
}
```
Use `checkChallengeAnswer()` from [lib/progress.ts](lib/progress.ts) to validate. Award XP via `addXp()`.

### Audio & Media Integration
- Audio files: place in [public/audio/](public/audio/) subfolders (hijaiyah/, hadith/, stories/)
- Component: **AudioPlayer** ([components/audio-player.tsx](components/audio-player.tsx)) — custom player with play/pause
- YouTube: use **YoutubePlayer** ([components/youtube-player.tsx](components/youtube-player.tsx)) wrapping iframe with video ID
- PDF: **PDFViewer** ([components/pdf-viewer.tsx](components/pdf-viewer.tsx)) for Iqro pages

---

## Project-Specific Conventions

### Naming & File Organization
- Feature-specific components: `[feature]-[subfeature].tsx` (e.g., `challenge-card.tsx`, `audio-player.tsx`)
- UI components: lowercase in [components/ui/](components/ui/) (button.tsx, dialog.tsx, progress.tsx)
- Store hooks: `use-[feature].tsx` pattern (use-user-progress.tsx, use-lesson-progress.tsx)
- Constants: Single [constants.ts](constants.ts) file, not scattered

### Component Patterns
- **"use client"** directive required for all state-using components (Zustand, event handlers)
- Prefer composition over props drilling (use context/Zustand instead)
- Loading states: dedicated `loading.tsx` files in [app/(main)/](app/(main)/) route folders
- Mobile awareness: build responsive UI with `hidden lg:flex` / `lg:hidden` patterns

### Gamification Mechanics
- **Hearts**: Max 5, consumed on wrong answers, refilled with points (10 points per heart via shop)
- **XP**: Earned on correct answers (5 XP) and lesson completion (10 XP base + 20 XP bonus if all correct)
- **Points**: Currency for shop purchases; earned with streak bonus via `calculateLessonPoints()`
- **Streak**: Auto-calculated by date; displayed, used for rewards; reset if day missed
- **Levels**: 1-10, derived from total XP (use `calculateUserLevel()`)
- **Quests**: Daily (e.g., "collect 20 XP"), tracked in [store/use-quests.tsx](store/use-quests.tsx)

### Persistence & localStorage
Zustand stores use `persist` middleware. Data auto-saves to browser localStorage. **No backend yet** — all state is client-side mock data.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| [constants.ts](constants.ts) | All content (letters, stories, hadiths, quests) + gamification config |
| [types/database.ts](types/database.ts) | TypeScript interfaces for data structures |
| [store/use-user-progress.tsx](store/use-user-progress.tsx) | XP, hearts, points, streak state |
| [lib/progress.ts](lib/progress.ts) | Calculation helpers (XP, score, hearts, points) |
| [components/sidebar.tsx](components/sidebar.tsx) | Navigation (desktop + mobile) |
| [app/(main)/layout.tsx](app/(main)/layout.tsx) | Shared layout with sidebar, header, modals |
| [app/(main)/hijaiyah/page.tsx](app/(main)/hijaiyah/) | Example: Hijaiyah list module |
| [tailwind.config.ts](tailwind.config.ts) | Tailwind theming (colors, spacing) |

---

## Development Priorities & Known Gaps

### URGENT Tasks (from [TODO.md](TODO.md))
1. **Audio files**: Record/download 28 hijaiyah + 6 harakat + 8 hadiths → [public/audio/](public/audio/)
2. **YouTube video IDs**: Replace placeholder IDs in `PROPHET_STORIES` with real links (7 Islamic educational videos, 5-15 min each)
3. **Iqro PDF files**: Add PDF pages for Iqro levels 1-6 → [public/iqro/](public/iqro/)

### Architecture Limitations
- **No backend**: All data is client-side mock (Zustand localStorage). Future: integrate Supabase or similar.
- **No user authentication**: Demo user hardcoded ("demo-user"). Future: auth system needed.
- **No leaderboard sync**: Leaderboard is mock data. Real version requires backend sync.
- **No offline mode**: App requires internet for media (YouTube, CDN audio).

---

## Testing & Debugging Tips

- **Zustand state**: Inspect via browser DevTools → Application → localStorage → alifbaba
- **Route transitions**: RouteLoader component ([components/route-loader.tsx](components/route-loader.tsx)) provides visual feedback
- **Mobile testing**: Use browser DevTools device emulation or `npm run dev` + open on phone on same network
- **Audio playback issues**: Check [public/audio/](public/audio/) path matches [constants.ts](constants.ts) `audioFile` value
- **Challenge validation**: Add console logs in `checkChallengeAnswer()` to debug answer logic

---

## Fast Track: Common Tasks

**Add a new hijaiyah letter**:
1. Add object to `HIJAIYAH_LETTERS` array in [constants.ts](constants.ts)
2. Place audio files: [public/audio/hijaiyah/letter-name.mp3](public/audio/hijaiyah/)
3. No code changes needed; component auto-renders

**Create a quiz for a story**:
1. Define `challenges` array in `PROPHET_STORIES[n]` object in [constants.ts](constants.ts)
2. Use Challenge type from [types/database.ts](types/database.ts)
3. In page component, call `checkChallengeAnswer()` on submission
4. Award XP via `addXp(calculateChallengeXP(...))`

**Adjust gamification values**:
- Edit constants at top of [constants.ts](constants.ts): `XP_PER_LESSON`, `MAX_HEARTS`, `POINTS_TO_REFILL`
- Rebuild (no restart needed for dev server)

---

## Questions? See Also
- **Developer guide**: [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) (in-depth architecture & component details)
- **Contribution rules**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Architecture decisions**: [DOCUMENTATION.md](DOCUMENTATION.md) (rationale behind choices)
- **Status**: [SECTION_2_SUMMARY.md](SECTION_2_SUMMARY.md) (current completion level)
