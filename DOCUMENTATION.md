# 📚 Dokumentasi AlifBaBa - Aplikasi Belajar Islam untuk Anak

## 📋 Daftar Isi
1. [Ringkasan Project](#ringkasan-project)
2. [Fitur yang Sudah Dibuat](#fitur-yang-sudah-dibuat)
3. [Struktur Project](#struktur-project)
4. [State Management](#state-management)
5. [Cara Menjalankan Project](#cara-menjalankan-project)
6. [Yang Perlu Ditambahkan](#yang-perlu-ditambahkan)
7. [Migration ke Supabase](#migration-ke-supabase)
8. [Improvement & Bug Fixes](#improvement--bug-fixes)
9. [Best Practices](#best-practices)

---

## 🎯 Ringkasan Project

**AlifBaBa** adalah aplikasi edukasi berbasis web untuk anak-anak belajar Islam dengan cara yang menyenangkan dan interaktif.

### Tech Stack
- **Framework**: Next.js 14.2.35 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: Zustand 4.5.2 (dengan persist middleware)
- **Storage**: localStorage (temporary - untuk development)
- **Database**: Belum implementasi (perlu migrasi ke Supabase)
- **Icons**: lucide-react
- **UI Components**: Custom + shadcn/ui patterns

### Target User
- Anak-anak usia 5-12 tahun
- Fokus: Belajar huruf Hijaiyah, kisah nabi, dan hadith
- Gamification untuk meningkatkan engagement

---

## ✅ Fitur yang Sudah Dibuat

### 1. **Module Pembelajaran**

#### 📖 Hijaiyah (28 Huruf + Harakat)
- **File**: `app/(main)/hijaiyah/page.tsx`, `app/(main)/hijaiyah/[id]/page.tsx`
- **Fitur**:
  - 28 huruf hijaiyah lengkap
  - 6 tanda baca (Fathah, Kasrah, Dhammah, Sukun, Tanwin, Tashdid)
  - Audio player untuk pengucapan (placeholder - file audio belum ada)
  - Quiz per huruf (3 pertanyaan multiple choice)
  - Progress tracking
  - XP reward: 50 XP per lesson
- **Status**: ✅ Complete (perlu upload file audio)

#### 🎬 Kisah Nabi (7 Stories)
- **File**: `app/(main)/stories/page.tsx`, `app/(main)/stories/[id]/page.tsx`
- **Data**: `constants.ts` - PROPHET_STORIES
- **Fitur**:
  - 7 kisah nabi dengan video YouTube embed
  - Quiz setelah menonton (5 pertanyaan per story)
  - Sequential unlock (harus selesai story sebelumnya)
  - XP reward: 100 XP per story
- **Status**: ✅ Complete (video ID sudah ada)

#### 🕌 Hadith (8 Hadith Pilihan)
- **File**: `app/(main)/hadith/page.tsx`, `app/(main)/hadith/[id]/page.tsx`
- **Data**: `constants.ts` - HADITH_LIST
- **Fitur**:
  - 8 hadith dengan teks Arab, Latin, dan terjemahan
  - Audio player untuk pengucapan Arab (placeholder)
  - Quiz pemahaman (5 pertanyaan)
  - Memorization tracking
  - Category filter (Akhlak, Iman, Keluarga, dll)
  - XP reward: 75 XP per hadith
- **Status**: ✅ Complete (perlu upload file audio)

### 2. **Gamification System**

#### 🎯 Quest System
- **File**: `app/(main)/quests/page.tsx`
- **Store**: `store/use-quests.tsx`
- **Types**:
  - **Daily Quests** (3): Reset setiap hari jam 00:00
    - Selesaikan 2 pelajaran hijaiyah (50 points)
    - Tonton 1 kisah nabi (75 points)
    - Baca 1 hadith (60 points)
  - **Weekly Quests** (3): Reset setiap Senin
    - Selesaikan 10 pelajaran (200 points)
    - Pelajari 3 kisah nabi (250 points)
    - Login 5 hari berturut-turut (150 points)
  - **Achievements** (4): Permanent
    - Master Hijaiyah: Selesaikan semua huruf (500 points + 200 XP)
    - Story Master: Selesaikan semua kisah (500 points + 200 XP)
    - Hadith Scholar: Selesaikan semua hadith (500 points + 200 XP)
    - Ultimate Learner: Selesaikan semua modul (1000 points + 500 XP)
- **Status**: ✅ Complete

#### 🛒 Shop/Toko
- **File**: `app/(main)/shop/page.tsx`
- **Items**:
  - Refill Hearts (5 hearts) - 100 points
  - Unlimited Hearts (60 menit) - 500 points
  - 2x XP Boost (30 menit) - 300 points
- **Status**: ✅ Complete

#### 🎁 Daily Login Rewards
- **File**: `components/daily-login-modal.tsx`
- **Cycle**: 7 hari (reset setelah hari ke-7)
- **Rewards**:
  - Day 1: 10 points
  - Day 2: 20 points
  - Day 3: 30 points
  - Day 4: 50 points
  - Day 5: 75 points
  - Day 6: 100 points
  - Day 7: 150 points + 3 hearts
- **Status**: ✅ Complete

#### 🏆 Leaderboard
- **File**: `app/(main)/leaderboard/page.tsx`
- **Ranking**: Berdasarkan XP
- **Status**: ⚠️ Mock data (perlu database untuk real leaderboard)

### 3. **User Profile & Progress**

#### 👤 Account/Profile Page
- **File**: `app/(main)/account/page.tsx`
- **Fitur**:
  - Editable username
  - Level system (1-10) berdasarkan XP
  - Progress cards untuk semua modul
  - Achievement badges
  - Quest statistics
  - Quick stats (XP, hearts, points, streak)
- **Status**: ✅ Complete

#### 📊 Dashboard/Learn Page
- **File**: `app/(main)/learn/page.tsx`
- **Fitur**:
  - Welcome banner
  - Progress overview untuk 3 modul
  - Quick access cards
  - User stats display
- **Status**: ✅ Complete

### 4. **Navigation & UI**

#### 🧭 Sidebar (Desktop)
- **File**: `components/sidebar.tsx`
- **Links**:
  - Belajar (Dashboard)
  - Hijaiyah
  - Kisah Nabi
  - Hadist
  - Leaderboard
  - Quest
  - Toko
  - Profil (di bottom)
- **Status**: ✅ Complete

#### 📱 Mobile Navigation
- **Bottom Nav**: `components/sidebar.tsx`
- **Top Header**: `components/mobile-header.tsx` (menampilkan hearts & points)
- **Status**: ✅ Complete

#### 🏠 Landing Page
- **File**: `app/page.tsx`
- **Sections**:
  - Hero dengan gradient
  - Feature cards (Hijaiyah, Stories, Hadith)
  - Gamification showcase
  - Footer
- **Status**: ✅ Complete

#### 🚫 404 Page
- **File**: `app/not-found.tsx`
- **Status**: ✅ Complete

---

## 📁 Struktur Project

```
alifbaba/
├── app/
│   ├── (main)/                    # Protected routes (main app)
│   │   ├── layout.tsx             # Main layout with sidebar
│   │   ├── account/               # Profile page
│   │   ├── hadith/                # Hadith module
│   │   │   ├── page.tsx           # Hadith list
│   │   │   └── [id]/page.tsx      # Hadith detail + quiz
│   │   ├── hijaiyah/              # Hijaiyah module
│   │   │   ├── page.tsx           # Letter list
│   │   │   └── [id]/page.tsx      # Letter detail + quiz
│   │   ├── leaderboard/           # Ranking page
│   │   ├── learn/                 # Dashboard
│   │   ├── quests/                # Quest & achievements
│   │   ├── shop/                  # Store
│   │   └── stories/               # Prophet stories
│   │       ├── page.tsx           # Story list
│   │       └── [id]/page.tsx      # Story detail + YouTube + quiz
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Global styles
│   └── not-found.tsx              # 404 page
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── progress.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── audio-player.tsx           # Custom audio player
│   ├── challenge-card.tsx         # Quiz UI component
│   ├── daily-login-modal.tsx      # Daily reward modal
│   ├── mobile-header.tsx          # Mobile top bar
│   ├── sidebar.tsx                # Desktop sidebar + mobile nav
│   ├── user-progress.tsx          # User stats display
│   └── youtube-player.tsx         # YouTube embed
│
├── store/                         # Zustand stores (state management)
│   ├── use-user-progress.tsx     # XP, hearts, points, streak, name
│   ├── use-lesson-progress.tsx   # Lesson completion tracking
│   └── use-quests.tsx            # Quest system
│
├── lib/
│   └── utils.ts                   # Utility functions (cn, etc)
│
├── public/
│   ├── audio/                     # ⚠️ KOSONG - perlu upload
│   │   ├── hijaiyah/             # Audio huruf hijaiyah
│   │   └── hadith/               # Audio hadith
│   ├── icons/                     # SVG icons
│   └── *.svg                      # Mascot, learn, shop, etc
│
├── constants.ts                   # All mock data
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🗄️ State Management

### Zustand Stores (localStorage)

#### 1. **use-user-progress.tsx**
```typescript
interface UserProgress {
  xp: number;              // Experience points
  hearts: number;          // Lives (default: 5)
  points: number;          // Shop currency
  streak: number;          // Login streak
  lastLoginDate: string;   // Last login timestamp
  name: string;            // Username
  
  // Actions
  addXp: (amount: number) => void;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  updateStreak: () => void;
  setUserData: (name: string) => void;
}
```

**Level Calculation**:
- Level = Math.floor(xp / 1000) + 1
- Max level: 10
- Level 1: 0-999 XP
- Level 2: 1000-1999 XP
- Level 10: 9000+ XP

#### 2. **use-lesson-progress.tsx**
```typescript
interface LessonProgress {
  completedHijaiyah: string[];     // IDs of completed letters
  completedStories: string[];      // IDs of completed stories
  completedHadith: string[];       // IDs of completed hadith
  hadithMemorized: string[];       // IDs of memorized hadith
  
  // Actions
  completeHijaiyahLesson: (id: string) => void;
  completeStoryLesson: (id: string) => void;
  completeHadithLesson: (id: string, memorized: boolean) => void;
  getTotalCompleted: () => { hijaiyah, stories, hadith };
}
```

#### 3. **use-quests.tsx**
```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;          // Points
  xpReward?: number;       // XP (for achievements)
  progress: number;        // Current progress
  target: number;          // Required progress
  claimed: boolean;        // Has user claimed reward?
}

interface QuestStore {
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  achievements: Quest[];
  lastResetDate: string;
  
  // Actions
  updateQuestProgress: (id: string, increment: number) => void;
  claimQuestReward: (id: string) => void;
  resetDailyQuests: () => void;
  checkAndResetQuests: () => void;
}
```

---

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js 18+ 
- npm atau yarn atau pnpm

### Installation

```bash
# 1. Clone repository (atau extract zip)
cd c:/Kuliah/Semester 7/IFter/alifbaba

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## ⚠️ Yang Perlu Ditambahkan

### 1. **Audio Files** (URGENT)

**Missing**:
- `public/audio/hijaiyah/alif.mp3` sampai `public/audio/hijaiyah/ya.mp3` (28 files)
- `public/audio/hijaiyah/fathah.mp3`, `kasrah.mp3`, dll (6 files)
- `public/audio/hadith/hadith-1.mp3` sampai `hadith-8.mp3` (8 files)

**Action**:
1. Record atau download audio pengucapan huruf hijaiyah
2. Record atau download audio hadith dalam bahasa Arab
3. Format: MP3, kualitas sedang (96-128 kbps)
4. Upload ke folder yang sesuai

### 2. **YouTube Video IDs**

**Current**: Sudah ada 7 video ID di `constants.ts`
```typescript
// constants.ts - PROPHET_STORIES
{ youtubeId: "dQw4w9WgXcQ", ... } // ⚠️ Placeholder
```

**Action**:
1. Cari video kisah nabi yang sesuai untuk anak di YouTube
2. Replace video ID di `constants.ts`
3. Pilih video dengan durasi 5-15 menit
4. Pastikan konten ramah anak

### 3. **More Content**

**Saat ini**:
- 28 huruf hijaiyah ✅
- 7 kisah nabi ⚠️ (bisa ditambah sampai 25)
- 8 hadith ⚠️ (bisa ditambah lebih banyak)

**Action**:
- Tambahkan lebih banyak hadith di `constants.ts`
- Tambahkan lebih banyak kisah nabi
- Tambahkan kategori baru (doa harian, surat pendek, dll)

### 4. **PWA Support**

**Missing**:
- Service worker configuration
- Offline support
- Install prompt

**Action**:
1. Install `next-pwa`:
```bash
npm install next-pwa
```

2. Update `next.config.mjs`:
```javascript
import withPWA from 'next-pwa';

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})({
  // existing config
});
```

3. Sudah ada `public/manifest.json` ✅

### 5. **SEO & Meta Tags**

**Action**:
- Tambahkan meta description di setiap page
- Tambahkan Open Graph tags
- Tambahkan structured data untuk educational content

---

## 🔄 Migration ke Supabase

### Kenapa Perlu Migrasi?

**Masalah localStorage saat ini**:
- ❌ Data hilang jika clear browser cache
- ❌ Tidak bisa sync antar device
- ❌ Tidak ada authentication
- ❌ Tidak ada real leaderboard
- ❌ Tidak bisa share progress

**Keuntungan Supabase**:
- ✅ Data persistent dan aman
- ✅ Multi-device sync
- ✅ Authentication (email, Google, etc)
- ✅ Real-time leaderboard
- ✅ Backup otomatis
- ✅ Free tier generous

---

### Step-by-Step Migration Guide

#### Phase 1: Setup Supabase Project

**1. Create Supabase Account**
- Daftar di https://supabase.com
- Create new project
- Simpan `Project URL` dan `anon public key`

**2. Install Dependencies**
```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
```

**3. Create Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**4. Setup Supabase Client**
```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'

export const supabase = createClientComponentClient<Database>()
```

---

#### Phase 2: Database Schema

**SQL Schema** (run di Supabase SQL Editor):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. USERS TABLE (extends auth.users)
-- ========================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ========================================
-- 2. USER PROGRESS TABLE
-- ========================================
CREATE TABLE public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  xp INTEGER DEFAULT 0 NOT NULL,
  hearts INTEGER DEFAULT 5 NOT NULL,
  points INTEGER DEFAULT 0 NOT NULL,
  streak INTEGER DEFAULT 0 NOT NULL,
  last_login_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 3. LESSON PROGRESS TABLE
-- ========================================
CREATE TYPE lesson_type AS ENUM ('hijaiyah', 'story', 'hadith');

CREATE TABLE public.lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_type lesson_type NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT true NOT NULL,
  memorized BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, lesson_type, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON public.lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own lesson progress"
  ON public.lesson_progress FOR ALL
  USING (auth.uid() = user_id);

-- ========================================
-- 4. QUESTS TABLE
-- ========================================
CREATE TYPE quest_type AS ENUM ('daily', 'weekly', 'achievement');

CREATE TABLE public.user_quests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quest_id TEXT NOT NULL,
  quest_type quest_type NOT NULL,
  progress INTEGER DEFAULT 0 NOT NULL,
  target INTEGER NOT NULL,
  reward_points INTEGER NOT NULL,
  reward_xp INTEGER DEFAULT 0,
  claimed BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  claimed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, quest_id)
);

ALTER TABLE public.user_quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own quests"
  ON public.user_quests FOR ALL
  USING (auth.uid() = user_id);

-- ========================================
-- 5. SHOP PURCHASES TABLE
-- ========================================
CREATE TABLE public.shop_purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  cost INTEGER NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.shop_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON public.shop_purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON public.shop_purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 6. DAILY LOGIN REWARDS TABLE
-- ========================================
CREATE TABLE public.daily_login_rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  login_date DATE NOT NULL,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 7),
  reward_points INTEGER NOT NULL,
  reward_hearts INTEGER DEFAULT 0,
  claimed BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, login_date)
);

ALTER TABLE public.daily_login_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own daily rewards"
  ON public.daily_login_rewards FOR ALL
  USING (auth.uid() = user_id);

-- ========================================
-- 7. INDEXES for Performance
-- ========================================
CREATE INDEX idx_user_progress_xp ON public.user_progress(xp DESC);
CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX idx_user_quests_user ON public.user_quests(user_id);
CREATE INDEX idx_shop_purchases_user ON public.shop_purchases(user_id);
CREATE INDEX idx_daily_rewards_user_date ON public.daily_login_rewards(user_id, login_date);

-- ========================================
-- 8. FUNCTIONS & TRIGGERS
-- ========================================

-- Auto update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'display_name'
  );
  
  INSERT INTO public.user_progress (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 9. LEADERBOARD VIEW
-- ========================================
CREATE VIEW public.leaderboard AS
SELECT 
  p.id,
  p.display_name,
  p.avatar_url,
  up.xp,
  up.streak,
  FLOOR(up.xp / 1000.0) + 1 as level,
  ROW_NUMBER() OVER (ORDER BY up.xp DESC) as rank
FROM public.profiles p
JOIN public.user_progress up ON p.id = up.user_id
ORDER BY up.xp DESC
LIMIT 100;

-- Grant access
GRANT SELECT ON public.leaderboard TO anon, authenticated;
```

---

#### Phase 3: Authentication Setup

**1. Create Auth Context**
```typescript
// contexts/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: username,
        },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

**2. Create Auth Pages**

Create:
- `app/login/page.tsx` - Login form
- `app/signup/page.tsx` - Signup form
- `app/logout/page.tsx` - Logout handler

**3. Protect Routes**

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Protect all /learn, /hijaiyah, etc routes
  if (req.nextUrl.pathname.startsWith('/learn') ||
      req.nextUrl.pathname.startsWith('/hijaiyah') ||
      req.nextUrl.pathname.startsWith('/stories') ||
      req.nextUrl.pathname.startsWith('/hadith') ||
      req.nextUrl.pathname.startsWith('/quests') ||
      req.nextUrl.pathname.startsWith('/shop') ||
      req.nextUrl.pathname.startsWith('/account')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

---

#### Phase 4: Migrate Zustand Stores to Supabase

**BEFORE (localStorage)**:
```typescript
// store/use-user-progress.tsx (OLD)
const useUserProgress = create<UserProgress>()(
  persist(
    (set) => ({
      xp: 0,
      hearts: 5,
      // ... stored in localStorage
    }),
    { name: 'user-progress' }
  )
)
```

**AFTER (Supabase)**:
```typescript
// hooks/use-user-progress.ts (NEW)
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/auth-context'

export function useUserProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState({
    xp: 0,
    hearts: 5,
    points: 0,
    streak: 0,
  })
  const [loading, setLoading] = useState(true)

  // Fetch progress from database
  useEffect(() => {
    if (!user) return

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setProgress(data)
      }
      setLoading(false)
    }

    fetchProgress()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('user-progress')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'user_progress',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setProgress(payload.new as any)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  // Add XP
  const addXp = async (amount: number) => {
    if (!user) return

    const { error } = await supabase
      .from('user_progress')
      .update({ xp: progress.xp + amount })
      .eq('user_id', user.id)

    if (!error) {
      setProgress(prev => ({ ...prev, xp: prev.xp + amount }))
    }
  }

  // Add Points
  const addPoints = async (amount: number) => {
    if (!user) return

    const { error } = await supabase
      .from('user_progress')
      .update({ points: progress.points + amount })
      .eq('user_id', user.id)

    if (!error) {
      setProgress(prev => ({ ...prev, points: prev.points + amount }))
    }
  }

  // Spend Points
  const spendPoints = async (amount: number): Promise<boolean> => {
    if (!user || progress.points < amount) return false

    const { error } = await supabase
      .from('user_progress')
      .update({ points: progress.points - amount })
      .eq('user_id', user.id)

    if (!error) {
      setProgress(prev => ({ ...prev, points: prev.points - amount }))
      return true
    }
    return false
  }

  // Update Streak
  const updateStreak = async () => {
    if (!user) return

    const today = new Date().toISOString().split('T')[0]
    const lastLogin = progress.last_login_date

    if (lastLogin === today) return // Already logged in today

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    const newStreak = lastLogin === yesterdayStr 
      ? progress.streak + 1 
      : 1

    const { error } = await supabase
      .from('user_progress')
      .update({ 
        streak: newStreak,
        last_login_date: today 
      })
      .eq('user_id', user.id)

    if (!error) {
      setProgress(prev => ({ 
        ...prev, 
        streak: newStreak,
        last_login_date: today 
      }))
    }
  }

  return {
    ...progress,
    loading,
    addXp,
    addPoints,
    spendPoints,
    updateStreak,
  }
}
```

**Similar migration untuk**:
- `use-lesson-progress.tsx` → Query `lesson_progress` table
- `use-quests.tsx` → Query `user_quests` table

---

#### Phase 5: Update Components

**Files yang perlu diubah**:

1. **All page components**:
   - Replace Zustand hooks dengan Supabase hooks
   - Add loading states
   - Handle authentication

2. **Leaderboard**:
```typescript
// app/(main)/leaderboard/page.tsx
const { data: leaderboard } = await supabase
  .from('leaderboard')
  .select('*')
  .limit(10)
```

3. **Daily Login Modal**:
```typescript
// Check last login, insert into daily_login_rewards table
```

---

#### Phase 6: Testing Checklist

**Authentication**:
- [ ] User dapat signup
- [ ] User dapat login
- [ ] User dapat logout
- [ ] Session persistent setelah refresh
- [ ] Protected routes bekerja

**User Progress**:
- [ ] XP bertambah setelah selesai lesson
- [ ] Hearts berkurang saat salah jawab
- [ ] Points bertambah dari quest rewards
- [ ] Streak update setiap hari
- [ ] Sync antar device/tab

**Lesson Progress**:
- [ ] Lesson completion tersimpan
- [ ] Progress bar update
- [ ] Sequential unlock bekerja

**Quests**:
- [ ] Quest progress update
- [ ] Claim rewards bekerja
- [ ] Daily reset jam 00:00
- [ ] Weekly reset setiap Senin
- [ ] Achievement permanent

**Shop**:
- [ ] Item purchase mengurangi points
- [ ] Hearts refill bekerja
- [ ] Time-based items (unlimited hearts, 2x XP) expire

**Leaderboard**:
- [ ] Menampilkan top 10 users
- [ ] Ranking real-time update
- [ ] User sendiri highlighted

---

### Migration Roadmap

**Week 1-2**: Setup & Auth
- [ ] Setup Supabase project
- [ ] Run SQL schema
- [ ] Create auth pages
- [ ] Implement middleware
- [ ] Test authentication flow

**Week 3-4**: Data Migration
- [ ] Create Supabase hooks
- [ ] Replace all Zustand stores
- [ ] Update all components
- [ ] Test data sync

**Week 5**: Features & Polish
- [ ] Implement real leaderboard
- [ ] Fix quest reset logic
- [ ] Test shop purchases
- [ ] Add loading states

**Week 6**: Testing & Deploy
- [ ] Comprehensive testing
- [ ] Fix bugs
- [ ] Deploy to Vercel
- [ ] Monitor errors

---

## 🐛 Improvement & Bug Fixes

### Known Issues

#### 1. **Audio Files Missing**
- **Problem**: Audio player tidak ada file untuk play
- **Impact**: Fitur audio tidak bekerja
- **Fix**: Upload file audio ke `public/audio/`

#### 2. **Mock Leaderboard**
- **Problem**: Leaderboard pakai mock data, tidak real
- **Impact**: User tidak bisa lihat ranking sebenarnya
- **Fix**: Implement dengan Supabase (lihat migration guide)

#### 3. **No Authentication**
- **Problem**: Tidak ada login/signup, semua data di localStorage
- **Impact**: Data hilang jika clear cache
- **Fix**: Implement Supabase Auth (lihat migration guide)

#### 4. **Quest Reset Logic**
- **Problem**: Quest daily/weekly reset berdasarkan client time
- **Impact**: User bisa manipulasi waktu device
- **Fix**: Gunakan server-side cron job atau Supabase functions

#### 5. **No Error Handling**
- **Problem**: Tidak ada error boundary atau try-catch
- **Impact**: App crash jika ada error
- **Fix**: Tambahkan error boundaries:

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-emerald-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}
```

#### 6. **No Loading Skeletons**
- **Problem**: Loading state hanya spinner sederhana
- **Impact**: UX kurang smooth
- **Fix**: Tambahkan skeleton loaders

#### 7. **No Offline Support**
- **Problem**: App tidak bekerja offline
- **Impact**: User tidak bisa belajar tanpa internet
- **Fix**: Implement PWA dengan service worker

#### 8. **Accessibility Issues**
- **Problem**: Tidak ada ARIA labels, keyboard navigation terbatas
- **Impact**: Sulit digunakan untuk users dengan disabilitas
- **Fix**: 
  - Tambahkan `aria-label` di semua interactive elements
  - Implement keyboard shortcuts
  - Add focus indicators

#### 9. **No Analytics**
- **Problem**: Tidak ada tracking user behavior
- **Impact**: Tidak tahu fitur mana yang populer
- **Fix**: Integrate Google Analytics atau Vercel Analytics

#### 10. **Performance**
- **Problem**: Belum optimize images, fonts
- **Impact**: Loading lambat
- **Fix**:
  - Use Next.js `<Image>` component
  - Optimize fonts dengan `next/font`
  - Add caching headers

---

### Recommended Improvements

#### 1. **Advanced Gamification**
- **Add**:
  - Daily challenges
  - Badges dengan tier (bronze, silver, gold)
  - Streak recovery (spend points to keep streak)
  - Leaderboard leagues (weekly competitions)
  - Friend system & challenges

#### 2. **Social Features**
- **Add**:
  - Share progress ke social media
  - Parent dashboard (untuk monitor anak)
  - Multiplayer quiz
  - Comment system di kisah nabi

#### 3. **More Learning Modules**
- **Add**:
  - Doa harian (morning, eating, sleeping, etc)
  - Surat-surat pendek (Juz 30)
  - Rukun Islam & Iman
  - Adab & akhlak lessons
  - Sejarah Islam

#### 4. **Better Quiz System**
- **Add**:
  - Multiple quiz types (matching, fill-in-blank, audio quiz)
  - Timed challenges
  - Quiz review mode
  - Difficulty levels

#### 5. **Personalization**
- **Add**:
  - Custom avatar builder
  - Theme selection (colors, mascot)
  - Learning goals & reminders
  - Adaptive difficulty

#### 6. **Progress Reports**
- **Add**:
  - Weekly/monthly progress email
  - Certificate generator
  - Printable progress cards
  - Parent report dashboard

#### 7. **Content Management**
- **Add**:
  - Admin panel untuk manage content
  - Upload audio/video via UI
  - Edit quiz questions
  - Content moderation

#### 8. **Mobile App**
- **Consider**:
  - React Native version
  - Atau wrap PWA sebagai app
  - Push notifications
  - Offline mode

---

## 📖 Best Practices

### Code Organization

**✅ DO**:
```typescript
// Group related logic
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function MyComponent() {
  // 1. Hooks
  const [data, setData] = useState([])
  
  // 2. Effects
  useEffect(() => {
    fetchData()
  }, [])
  
  // 3. Handlers
  const handleClick = () => {}
  
  // 4. Render
  return <div>...</div>
}
```

**❌ DON'T**:
```typescript
// Mix everything randomly
export default function MyComponent() {
  const handleClick = () => {}
  const [data, setData] = useState([])
  const other = someFn()
  useEffect(() => {}, [])
  // Hard to read
}
```

### State Management

**✅ DO**:
- Use Zustand untuk client state (temporary)
- Use Supabase untuk server state (persistent)
- Minimize prop drilling

**❌ DON'T**:
- Store everything di localStorage
- Pass data through 5+ component levels

### Performance

**✅ DO**:
```typescript
// Memoize expensive calculations
const level = useMemo(() => 
  Math.floor(xp / 1000) + 1
, [xp])

// Debounce search
const debouncedSearch = useDebouncedCallback(
  (value) => search(value),
  500
)
```

**❌ DON'T**:
```typescript
// Calculate on every render
return <div>Level: {Math.floor(xp / 1000) + 1}</div>
```

### Error Handling

**✅ DO**:
```typescript
try {
  const { data, error } = await supabase.from('...').select()
  if (error) throw error
  setData(data)
} catch (error) {
  console.error('Error:', error)
  toast.error('Failed to load data')
}
```

**❌ DON'T**:
```typescript
// No error handling
const { data } = await supabase.from('...').select()
setData(data) // Crash if error
```

### TypeScript

**✅ DO**:
```typescript
// Define interfaces
interface UserProgress {
  xp: number
  hearts: number
  points: number
}

// Use types
const progress: UserProgress = { xp: 0, hearts: 5, points: 0 }
```

**❌ DON'T**:
```typescript
// Use any
const progress: any = { ... } // Loses type safety
```

---

## 📞 Support & Maintenance

### Getting Help

**Dokumentasi**:
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Zustand: https://github.com/pmndrs/zustand
- Supabase: https://supabase.com/docs

**Community**:
- Next.js Discord
- Supabase Discord
- Stack Overflow

### Common Commands

```bash
# Development
npm run dev

# Build
npm run build
npm start

# Lint
npm run lint
npm run lint --fix

# Type check
npx tsc --noEmit

# Clean install
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

### Environment Variables

```bash
# .env.local (untuk development)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Production (Vercel)
# Set di Vercel dashboard → Settings → Environment Variables
```

---

## 🎯 Priority Checklist

**URGENT (Do First)**:
- [ ] Upload audio files (hijaiyah & hadith)
- [ ] Replace YouTube video IDs dengan konten yang sesuai
- [ ] Setup Supabase project
- [ ] Implement authentication
- [ ] Migrate to database

**HIGH PRIORITY**:
- [ ] Add error handling & boundaries
- [ ] Implement real leaderboard
- [ ] Add loading skeletons
- [ ] Test all features thoroughly
- [ ] Deploy to production

**MEDIUM PRIORITY**:
- [ ] Add more content (hadith, stories)
- [ ] Implement PWA support
- [ ] Add analytics
- [ ] Create admin panel
- [ ] Add SEO optimization

**LOW PRIORITY (Nice to Have)**:
- [ ] Social features
- [ ] Advanced gamification
- [ ] Mobile app version
- [ ] Multi-language support

---

## 📝 Changelog

### Version 1.0.0 (Current - December 2025)

**Features**:
- ✅ 3 learning modules (Hijaiyah, Stories, Hadith)
- ✅ Gamification system (XP, levels, hearts, points)
- ✅ Quest system (daily, weekly, achievements)
- ✅ Shop with power-ups
- ✅ Daily login rewards
- ✅ Profile page
- ✅ Landing page
- ✅ Responsive design

**Known Issues**:
- ⚠️ localStorage only (no database)
- ⚠️ No authentication
- ⚠️ Mock leaderboard
- ⚠️ Audio files missing
- ⚠️ Limited error handling

**What's Next**:
- 🔄 Supabase migration
- 🔄 Authentication system
- 🔄 Real leaderboard
- 🔄 More content

---

## 🙏 Credits

**Developer**: [Your Name]
**Project**: AlifBaBa - Islamic Learning App for Kids
**Year**: 2025
**License**: MIT (atau lisensi lain yang Anda pilih)

**Libraries & Tools**:
- Next.js by Vercel
- React by Meta
- Tailwind CSS
- Zustand
- Supabase (future)
- lucide-react for icons

---

## 📧 Contact

Jika ada pertanyaan atau butuh bantuan:
- **Email**: [your-email@example.com]
- **GitHub**: [your-github-username]
- **Project Repo**: [repository-url]

---

**Last Updated**: December 18, 2025
**Version**: 1.0.0
**Status**: Development - Ready for Supabase Migration
