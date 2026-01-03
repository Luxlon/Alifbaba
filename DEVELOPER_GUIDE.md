# 🔧 Developer Guide - AlifBaBa

Panduan teknis untuk developer yang akan melanjutkan atau maintain project ini.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Architecture](#project-architecture)
3. [Component Guide](#component-guide)
4. [State Management Deep Dive](#state-management-deep-dive)
5. [Styling System](#styling-system)
6. [Adding New Features](#adding-new-features)
7. [Testing Guide](#testing-guide)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Setup
```bash
# Clone or extract project
cd alifbaba

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Project Scripts
```json
{
  "dev": "next dev",           // Development server
  "build": "next build",       // Production build
  "start": "next start",       // Start production server
  "lint": "next lint"          // Run ESLint
}
```

---

## 🏗️ Project Architecture

### Folder Structure Explained

```
alifbaba/
│
├── app/                          # Next.js 14 App Router
│   ├── (main)/                   # Route group - protected routes
│   │   ├── layout.tsx            # Shared layout (sidebar, header)
│   │   └── [module]/             # Feature modules
│   │       ├── page.tsx          # List/index page
│   │       ├── [id]/page.tsx     # Detail page
│   │       └── loading.tsx       # Loading state
│   │
│   ├── layout.tsx                # Root layout (providers, fonts)
│   ├── page.tsx                  # Landing page (/)
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles + Tailwind
│
├── components/
│   ├── ui/                       # Reusable UI components (buttons, etc)
│   ├── [feature]-*.tsx           # Feature-specific components
│   └── sidebar.tsx               # Navigation component
│
├── store/                        # Zustand stores (state management)
│   ├── use-user-progress.tsx     # User XP, hearts, points, streak
│   ├── use-lesson-progress.tsx   # Lesson completion tracking
│   └── use-quests.tsx            # Quest & achievement system
│
├── lib/                          # Utility functions
│   └── utils.ts                  # cn() helper, etc
│
├── public/                       # Static assets
│   ├── audio/                    # Audio files (MP3)
│   ├── icons/                    # SVG icons
│   └── *.svg                     # Images (mascot, etc)
│
├── constants.ts                  # All mock data & configurations
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

### Route Structure

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing page |
| `/learn` | `app/(main)/learn/page.tsx` | Dashboard |
| `/hijaiyah` | `app/(main)/hijaiyah/page.tsx` | Hijaiyah list |
| `/hijaiyah/[id]` | `app/(main)/hijaiyah/[id]/page.tsx` | Hijaiyah detail + quiz |
| `/stories` | `app/(main)/stories/page.tsx` | Stories list |
| `/stories/[id]` | `app/(main)/stories/[id]/page.tsx` | Story detail + video + quiz |
| `/hadith` | `app/(main)/hadith/page.tsx` | Hadith list |
| `/hadith/[id]` | `app/(main)/hadith/[id]/page.tsx` | Hadith detail + audio + quiz |
| `/quests` | `app/(main)/quests/page.tsx` | Quests & achievements |
| `/shop` | `app/(main)/shop/page.tsx` | Shop items |
| `/leaderboard` | `app/(main)/leaderboard/page.tsx` | Rankings |
| `/account` | `app/(main)/account/page.tsx` | User profile |

---

## 🧩 Component Guide

### Button Variants

Defined in `components/ui/button.tsx`:

```typescript
// Usage
<Button variant="primary">Click me</Button>

// Available variants:
"default" | "primary" | "primaryOutline" | 
"secondary" | "secondaryOutline" | 
"danger" | "dangerOutline" | 
"super" | "superOutline" | 
"ghost" | "sidebar" | "sidebarOutline" |
"hijaiyah" | "hijaiyahOutline" |      // Emerald theme
"story" | "storyOutline" |            // Amber theme
"hadith" | "hadithOutline"            // Purple theme
```

### Custom Components

#### 1. AudioPlayer
**File**: `components/audio-player.tsx`

```typescript
<AudioPlayer 
  src="/audio/hijaiyah/alif.mp3"
  label="Dengarkan Pengucapan"
/>
```

**Features**:
- Play/pause toggle
- Progress bar
- Custom styling
- Audio preload

#### 2. YouTubePlayer
**File**: `components/youtube-player.tsx`

```typescript
<YouTubePlayer 
  videoId="dQw4w9WgXcQ"
  onReady={() => console.log('Video ready')}
/>
```

**Features**:
- Responsive 16:9 aspect ratio
- YouTube iframe API
- Callback on ready

#### 3. ChallengeCard (Quiz)
**File**: `components/challenge-card.tsx`

```typescript
<ChallengeCard
  question="Apa huruf pertama dalam hijaiyah?"
  options={["Alif", "Ba", "Ta", "Tsa"]}
  correctAnswer="Alif"
  onAnswer={(correct) => console.log(correct)}
/>
```

**Features**:
- Multiple choice UI
- Instant feedback (green/red)
- Heart system integration
- Confetti on correct answer

#### 4. DailyLoginModal
**File**: `components/daily-login-modal.tsx`

```typescript
// Auto-shows on first visit each day
// Controlled by localStorage: 'last-daily-login'
```

**Features**:
- 7-day cycle
- Increasing rewards
- Confetti animation
- Auto-dismiss

---

## 💾 State Management Deep Dive

### Zustand Stores

#### 1. User Progress Store

**File**: `store/use-user-progress.tsx`

```typescript
interface UserProgress {
  xp: number              // Experience points
  hearts: number          // Lives (max 5, default 5)
  points: number          // Currency for shop
  streak: number          // Login streak (days)
  lastLoginDate: string   // ISO date string
  name: string            // Username
}
```

**Methods**:
```typescript
// Add XP
addXp(50)  // Also triggers quest progress

// Add/Spend Points
addPoints(100)
spendPoints(50)  // Returns boolean (success/fail)

// Update Streak
updateStreak()  // Call on app load

// Set User Data
setUserData("Ahmad")
```

**Level Calculation**:
```typescript
// Level = floor(xp / 1000) + 1
// Example:
xp = 0     → Level 1
xp = 999   → Level 1
xp = 1000  → Level 2
xp = 9999  → Level 10
```

**localStorage Key**: `user-progress`

#### 2. Lesson Progress Store

**File**: `store/use-lesson-progress.tsx`

```typescript
interface LessonProgress {
  completedHijaiyah: string[]   // ["alif", "ba", ...]
  completedStories: string[]    // ["1", "2", ...]
  completedHadith: string[]     // ["1", "2", ...]
  hadithMemorized: string[]     // Subset of completedHadith
}
```

**Methods**:
```typescript
// Complete lessons
completeHijaiyahLesson("alif")
completeStoryLesson("1")
completeHadithLesson("1", false)  // id, memorized

// Check completion
isHijaiyahCompleted("alif")  // boolean
isStoryCompleted("1")        // boolean
isHadithCompleted("1")       // boolean

// Get progress
getHijaiyahProgress()  // 0-100
getHadithProgress()    // { hadithId: { completed, memorized } }

// Get totals
getTotalCompleted()  // { hijaiyah: 5, stories: 3, hadith: 2 }
```

**localStorage Key**: `lesson-progress`

#### 3. Quest Store

**File**: `store/use-quests.tsx`

```typescript
interface Quest {
  id: string              // Unique identifier
  title: string           // Display title
  description: string     // What to do
  reward: number          // Points reward
  xpReward?: number       // XP reward (achievements only)
  progress: number        // Current progress
  target: number          // Goal to reach
  claimed: boolean        // Has user claimed reward?
}
```

**Quest Types**:
```typescript
// Daily (reset at 00:00)
dailyQuests: Quest[]  // 3 quests

// Weekly (reset Monday 00:00)
weeklyQuests: Quest[]  // 3 quests

// Achievements (permanent)
achievements: Quest[]  // 4 quests
```

**Methods**:
```typescript
// Update progress
updateQuestProgress("daily-complete-2-hijaiyah", 1)

// Claim reward
claimQuestReward("daily-complete-2-hijaiyah")

// Manual resets (usually automatic)
resetDailyQuests()
resetWeeklyQuests()

// Auto-check and reset (call on app load)
checkAndResetQuests()
```

**Quest IDs**:
```typescript
// Daily
"daily-complete-2-hijaiyah"
"daily-watch-1-story"
"daily-read-1-hadith"

// Weekly
"weekly-complete-10-lessons"
"weekly-watch-3-stories"
"weekly-login-5-days"

// Achievements
"achievement-master-hijaiyah"
"achievement-story-master"
"achievement-hadith-scholar"
"achievement-ultimate-learner"
```

**localStorage Keys**: 
- `quests-store`
- `last-daily-login` (for login rewards)

---

## 🎨 Styling System

### Tailwind Configuration

**File**: `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      // Module colors
      emerald: { ... },  // Hijaiyah theme
      amber: { ... },    // Stories theme
      purple: { ... },   // Hadith theme
    },
    fontFamily: {
      arabic: ['Amiri', 'serif'],  // For Arabic text
    }
  }
}
```

### Color Scheme

| Module | Primary Color | Usage |
|--------|---------------|-------|
| Hijaiyah | Emerald-500 (#10b981) | Buttons, borders, icons |
| Stories | Amber-500 (#f59e0b) | Buttons, borders, icons |
| Hadith | Purple-500 (#a855f7) | Buttons, borders, icons |
| General | Slate-700 (#334155) | Text, neutral elements |

### Responsive Breakpoints

```css
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop (sidebar shows) */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Common Patterns

**Card with hover**:
```tsx
<div className="bg-white border-2 rounded-xl p-6 hover:shadow-lg transition-all">
  ...
</div>
```

**Gradient background**:
```tsx
<div className="bg-gradient-to-r from-emerald-500 to-emerald-600">
  ...
</div>
```

**Responsive grid**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  ...
</div>
```

**Mobile bottom spacing** (for bottom nav):
```tsx
<div className="pb-20 lg:pb-0">
  {/* Content here */}
</div>
```

---

## ➕ Adding New Features

### Adding a New Learning Module

**Example**: Adding "Doa Harian" (Daily Prayers)

#### Step 1: Add Data to constants.ts

```typescript
// constants.ts
export const DAILY_PRAYERS = [
  {
    id: "1",
    title: "Doa Sebelum Makan",
    arabicText: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
    latinText: "Bismillahi wa 'ala barakatillah",
    translation: "Dengan nama Allah dan atas berkah Allah",
    category: "Makan",
    audioFile: "/audio/prayers/before-eating.mp3",
    quizQuestions: [
      {
        question: "Kapan doa ini dibaca?",
        options: ["Sebelum makan", "Setelah makan", "Sebelum tidur", "Bangun tidur"],
        correctAnswer: "Sebelum makan",
      },
      // ... 4 more questions
    ],
  },
  // ... more prayers
];
```

#### Step 2: Create Pages

**List page**: `app/(main)/prayers/page.tsx`
```typescript
"use client";

import { DAILY_PRAYERS } from "@/constants";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrayersPage() {
  const { isPrayerCompleted } = useLessonProgress();
  
  return (
    <div className="space-y-4">
      {DAILY_PRAYERS.map((prayer) => (
        <Link key={prayer.id} href={`/prayers/${prayer.id}`}>
          <div className="border rounded-xl p-6">
            <h3>{prayer.title}</h3>
            {isPrayerCompleted(prayer.id) && <span>✅</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
```

**Detail page**: `app/(main)/prayers/[id]/page.tsx`
```typescript
"use client";

import { DAILY_PRAYERS } from "@/constants";
import { AudioPlayer } from "@/components/audio-player";
import { ChallengeCard } from "@/components/challenge-card";

export default function PrayerDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const prayer = DAILY_PRAYERS.find(p => p.id === params.id);
  
  if (!prayer) return <div>Prayer not found</div>;
  
  return (
    <div>
      <h1>{prayer.title}</h1>
      <p className="text-2xl font-arabic" dir="rtl">
        {prayer.arabicText}
      </p>
      <p>{prayer.latinText}</p>
      <p className="italic">{prayer.translation}</p>
      
      <AudioPlayer src={prayer.audioFile} />
      
      {/* Quiz */}
      {prayer.quizQuestions.map((q, i) => (
        <ChallengeCard key={i} {...q} />
      ))}
    </div>
  );
}
```

#### Step 3: Update Store

**Add to** `store/use-lesson-progress.tsx`:

```typescript
interface LessonProgress {
  // ... existing
  completedPrayers: string[];
}

// Add methods
completePrayerLesson: (id: string) => {
  set((state) => ({
    completedPrayers: [...state.completedPrayers, id],
  }));
},

isPrayerCompleted: (id: string) => {
  return get().completedPrayers.includes(id);
},
```

#### Step 4: Add to Navigation

**Update** `components/sidebar.tsx`:

```tsx
<SidebarItem
  label="Doa Harian"
  href="/prayers"
  iconSrc="/prayers.svg"
/>
```

#### Step 5: Create Icon

**Create** `public/prayers.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" ...>
  <!-- Your SVG icon -->
</svg>
```

#### Step 6: Add Quest (Optional)

**Update** `store/use-quests.tsx`:

```typescript
// Add to dailyQuests initial state
{
  id: "daily-read-1-prayer",
  title: "Baca 1 Doa",
  description: "Pelajari 1 doa harian",
  reward: 40,
  progress: 0,
  target: 1,
  claimed: false,
}
```

#### Step 7: Update Dashboard

**Update** `app/(main)/learn/page.tsx`:

```tsx
const prayerCount = getTotalCompleted().prayers;

<div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
  <h3>🤲 Doa Harian</h3>
  <Progress value={(prayerCount / DAILY_PRAYERS.length) * 100} />
  <p>{prayerCount}/{DAILY_PRAYERS.length} doa</p>
  <Button asChild variant="primary">
    <Link href="/prayers">Mulai</Link>
  </Button>
</div>
```

---

### Adding a New Quest

**Example**: Daily quest "Complete 3 prayers"

```typescript
// store/use-quests.tsx

// 1. Add to initial dailyQuests array
{
  id: "daily-complete-3-prayers",
  title: "Hafal 3 Doa",
  description: "Selesaikan 3 doa harian hari ini",
  reward: 60,
  progress: 0,
  target: 3,
  claimed: false,
}

// 2. Update progress when prayer is completed
// In prayer detail page after quiz:
const { updateQuestProgress } = useQuests();

const handleQuizComplete = () => {
  completePrayerLesson(prayer.id);
  addXp(50);
  updateQuestProgress("daily-complete-3-prayers", 1);
};
```

---

### Adding a Shop Item

```typescript
// app/(main)/shop/page.tsx

// Add to SHOP_ITEMS array
{
  id: "unlock-all-prayers",
  name: "Buka Semua Doa",
  description: "Akses semua doa tanpa harus unlock satu per satu",
  icon: "🔓",
  cost: 500,
  type: "permanent",
}

// Handle purchase
const handlePurchase = async (item) => {
  const success = spendPoints(item.cost);
  
  if (success) {
    if (item.id === "unlock-all-prayers") {
      // Unlock all prayers
      DAILY_PRAYERS.forEach(prayer => {
        completePrayerLesson(prayer.id);
      });
    }
    
    toast.success(`${item.name} dibeli!`);
  } else {
    toast.error("Points tidak cukup!");
  }
};
```

---

## 🧪 Testing Guide

### Manual Testing Checklist

**User Flow**:
- [ ] User bisa navigate ke semua pages
- [ ] Sidebar links bekerja
- [ ] Mobile navigation bekerja
- [ ] 404 page muncul untuk invalid routes

**Hijaiyah Module**:
- [ ] 28 huruf tampil
- [ ] Audio player bekerja (jika file sudah ada)
- [ ] Quiz bisa dijawab
- [ ] Correct answer kasih confetti
- [ ] Wrong answer kurangi hearts
- [ ] Progress tersimpan setelah selesai
- [ ] Sequential unlock bekerja
- [ ] XP bertambah (50 XP)

**Stories Module**:
- [ ] 7 stories tampil
- [ ] YouTube video load
- [ ] Video bisa play/pause
- [ ] Quiz muncul setelah video section
- [ ] Progress tersimpan
- [ ] XP bertambah (100 XP)
- [ ] Sequential unlock bekerja

**Hadith Module**:
- [ ] 8 hadith tampil
- [ ] Audio player bekerja
- [ ] Arabic text tampil dengan benar (RTL)
- [ ] Memorization checkbox bekerja
- [ ] Quiz bekerja
- [ ] Progress tersimpan
- [ ] XP bertambah (75 XP)

**Gamification**:
- [ ] Hearts berkurang saat salah
- [ ] Hearts bertambah saat beli refill
- [ ] Points bertambah dari quests
- [ ] Points berkurang saat belanja
- [ ] XP bertambah dari lessons
- [ ] Level up animation muncul
- [ ] Streak update setiap hari

**Quests**:
- [ ] Daily quests progress update
- [ ] Weekly quests progress update
- [ ] Achievement unlock saat target tercapai
- [ ] Claim reward bekerja (add points & XP)
- [ ] Daily reset jam 00:00
- [ ] Weekly reset hari Senin

**Shop**:
- [ ] Item purchase kurangi points
- [ ] Refill hearts bekerja
- [ ] Unlimited hearts expire setelah 60 menit
- [ ] 2x XP boost expire setelah 30 menit

**Profile**:
- [ ] Username bisa diedit
- [ ] Level tampil dengan benar
- [ ] Progress cards update
- [ ] Achievement badges muncul

**Daily Login**:
- [ ] Modal muncul sekali per hari
- [ ] Rewards bertambah per hari
- [ ] Reset setelah day 7
- [ ] Confetti animation

### Testing localStorage

```javascript
// In browser console

// Check user progress
JSON.parse(localStorage.getItem('user-progress'))

// Check lesson progress
JSON.parse(localStorage.getItem('lesson-progress'))

// Check quests
JSON.parse(localStorage.getItem('quests-store'))

// Clear all data (reset app)
localStorage.clear()
location.reload()

// Set custom XP
const data = JSON.parse(localStorage.getItem('user-progress'))
data.state.xp = 5000  // Level 6
localStorage.setItem('user-progress', JSON.stringify(data))
location.reload()
```

### Browser DevTools Tips

**Performance**:
```
Chrome DevTools → Lighthouse
- Run audit
- Check Performance score
- Check Accessibility score
```

**Responsive**:
```
Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
- Test iPhone SE (375px)
- Test iPad (768px)
- Test Desktop (1920px)
```

**Console Errors**:
```
Check for:
- Red errors (must fix)
- Yellow warnings (should fix)
- 404 errors (missing files)
```

---

## 🚀 Deployment

### Vercel (Recommended)

**Step 1**: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/alifbaba.git
git push -u origin main
```

**Step 2**: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select `alifbaba` repository
5. Click "Deploy"

**Step 3**: Environment Variables (jika pakai Supabase)
1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Step 4**: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Self-Hosted (VPS)

```bash
# On server
git clone https://github.com/yourusername/alifbaba.git
cd alifbaba
npm install
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "alifbaba" -- start
pm2 save
pm2 startup

# Setup nginx reverse proxy
# nginx config:
server {
  listen 80;
  server_name yourdomain.com;
  
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Build Optimization

**next.config.mjs**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compress
  compress: true,
  
  // Remove console.logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "localStorage is not defined"
**Problem**: Accessing localStorage during SSR

**Fix**:
```typescript
// ❌ Bad
const data = localStorage.getItem('key')

// ✅ Good
const [data, setData] = useState(null)
useEffect(() => {
  setData(localStorage.getItem('key'))
}, [])
```

#### 2. Zustand store not persisting
**Problem**: Data not saving to localStorage

**Fix**:
```typescript
// Check browser storage limit
// Check if store has persist() wrapper
const useStore = create()(
  persist(
    (set) => ({ /* state */ }),
    { name: 'store-name' }  // ← Must have this
  )
)
```

#### 3. Hydration mismatch
**Problem**: Server HTML ≠ Client HTML

**Fix**:
```typescript
// ❌ Bad - Date/random on server and client differ
<div>{new Date().toString()}</div>

// ✅ Good - Use useState + useEffect
const [date, setDate] = useState('')
useEffect(() => {
  setDate(new Date().toString())
}, [])
```

#### 4. Audio not playing
**Problem**: Audio file not found or wrong format

**Fix**:
- Check file exists in `public/audio/`
- Check path: `/audio/file.mp3` (no `public/` in path)
- Check format: Use MP3 (best compatibility)
- Check browser console for 404 errors

#### 5. YouTube video not loading
**Problem**: Invalid video ID or CORS

**Fix**:
- Check video ID format: 11 characters
- Check video is public (not private/unlisted)
- Check video is embeddable (owner settings)

#### 6. Quest not resetting
**Problem**: Daily/weekly quests not resetting

**Debug**:
```typescript
// Check lastResetDate
const store = JSON.parse(localStorage.getItem('quests-store'))
console.log('Last reset:', store.state.lastResetDate)

// Manually trigger reset
const { resetDailyQuests } = useQuests.getState()
resetDailyQuests()
```

#### 7. Build errors

**"Module not found"**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**TypeScript errors**:
```bash
# Check types
npx tsc --noEmit

# Common fix: restart TS server in VSCode
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

#### 8. Slow performance

**Check**:
- Too many re-renders? (Use React DevTools Profiler)
- Missing memoization? (useMemo, useCallback)
- Large bundle size? (Run `npm run build` and check size)

**Fix**:
```typescript
// Memoize expensive calculations
const level = useMemo(() => Math.floor(xp / 1000) + 1, [xp])

// Memoize callbacks
const handleClick = useCallback(() => {
  // ...
}, [dependencies])
```

---

## 📚 Additional Resources

### Learning Resources

**Next.js**:
- Official Docs: https://nextjs.org/docs
- Next.js 14 Tutorial: https://nextjs.org/learn

**Zustand**:
- GitHub: https://github.com/pmndrs/zustand
- Tutorial: https://docs.pmnd.rs/zustand/getting-started/introduction

**Tailwind CSS**:
- Docs: https://tailwindcss.com/docs
- Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet

**Supabase**:
- Docs: https://supabase.com/docs
- Next.js Guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

### Tools

**VS Code Extensions**:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

**Chrome Extensions**:
- React Developer Tools
- Redux DevTools (for state debugging)

### Code Snippets

**React Component (rafce)**:
```typescript
import React from 'react'

const ComponentName = () => {
  return (
    <div>ComponentName</div>
  )
}

export default ComponentName
```

**Zustand Store Template**:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  value: number
  increment: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      value: 0,
      increment: () => set((state) => ({ value: state.value + 1 })),
    }),
    { name: 'store-name' }
  )
)
```

---

## 🎯 Next Steps

After reading this guide, you should be able to:

1. ✅ Run the project locally
2. ✅ Understand the architecture
3. ✅ Add new learning modules
4. ✅ Modify existing features
5. ✅ Debug common issues
6. ✅ Deploy to production

**Recommended order of work**:
1. Get familiar with codebase (run locally, explore)
2. Upload audio files for hijaiyah and hadith
3. Setup Supabase and migrate data
4. Implement authentication
5. Add more content (hadith, stories, doa)
6. Deploy to production
7. Add analytics and monitoring

---

**Good luck! 🚀**

If you have questions, refer to:
- Main documentation: `DOCUMENTATION.md`
- This developer guide: `DEVELOPER_GUIDE.md`
- Component source code
- Online resources (links above)

**Happy Coding!** 💻
