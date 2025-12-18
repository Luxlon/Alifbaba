# 🗂️ Supabase Migration Checklist

Panduan step-by-step untuk migrasi dari localStorage ke Supabase.

---

## Phase 1: Setup Supabase (Week 1)

### 1.1 Create Supabase Account & Project
- [ ] Daftar di https://supabase.com
- [ ] Klik "New Project"
- [ ] Isi:
  - Name: `alifbaba-production`
  - Database Password: (simpan di password manager)
  - Region: Southeast Asia (Singapore)
- [ ] Wait ~2 minutes untuk project ready
- [ ] Copy Project URL dan anon key

### 1.2 Setup Environment Variables
- [ ] Create file `.env.local` di root project:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- [ ] Add ke `.gitignore`:
```
.env.local
.env*.local
```

### 1.3 Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### 1.4 Run SQL Schema
- [ ] Buka Supabase Dashboard → SQL Editor
- [ ] Copy semua SQL dari `DOCUMENTATION.md` (section "Database Schema")
- [ ] Run SQL (akan create 7 tables + views + triggers)
- [ ] Verify tables created:
  - `profiles`
  - `user_progress`
  - `lesson_progress`
  - `user_quests`
  - `shop_purchases`
  - `daily_login_rewards`
  - `leaderboard` (view)

### 1.5 Create Supabase Client
- [ ] Create folder: `lib/supabase/`
- [ ] Create file: `lib/supabase/client.ts`
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()
```

**Checklist Progress**: [ ] Phase 1 Complete

---

## Phase 2: Authentication (Week 1-2)

### 2.1 Create Auth Context
- [ ] Create folder: `contexts/`
- [ ] Create file: `contexts/auth-context.tsx`
- [ ] Copy code dari `DOCUMENTATION.md` section "Authentication Setup"
- [ ] Test: Import di `app/layout.tsx`

### 2.2 Create Auth UI Pages

#### Login Page
- [ ] Create: `app/login/page.tsx`
```typescript
"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      router.push("/learn")
    } catch (error) {
      alert("Login failed: " + error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}
```

#### Signup Page
- [ ] Create: `app/signup/page.tsx` (similar structure)
- [ ] Add username field
- [ ] Call `signUp(email, password, username)`

#### Logout
- [ ] Create: `app/logout/page.tsx`
```typescript
"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const { signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    signOut().then(() => router.push("/"))
  }, [])

  return <div>Logging out...</div>
}
```

### 2.3 Create Middleware for Protected Routes
- [ ] Create/update: `middleware.ts` di root
- [ ] Copy code dari `DOCUMENTATION.md`
- [ ] Test: Access `/learn` tanpa login → redirect ke `/login`

### 2.4 Update Landing Page
- [ ] Add login/signup buttons di header
- [ ] Update "Mulai Belajar" button:
```typescript
<Button asChild>
  <Link href="/signup">Daftar Sekarang</Link>
</Button>
```

### 2.5 Update Sidebar
- [ ] Add logout button di bottom
- [ ] Show username from profile

**Checklist Progress**: [ ] Phase 2 Complete

---

## Phase 3: Migrate User Progress (Week 2)

### 3.1 Create New Hook
- [ ] Create folder: `hooks/`
- [ ] Create: `hooks/use-user-progress.ts` (NEW - not store/)
- [ ] Copy implementation dari `DOCUMENTATION.md` section "Migrate Zustand Stores"
- [ ] Test query: Fetch user progress from DB

### 3.2 Update Components
Replace `import { useUserProgress } from "@/store/use-user-progress"` dengan `import { useUserProgress } from "@/hooks/use-user-progress"` di:

- [ ] `app/(main)/learn/page.tsx`
- [ ] `app/(main)/hijaiyah/page.tsx`
- [ ] `app/(main)/hijaiyah/[id]/page.tsx`
- [ ] `app/(main)/stories/page.tsx`
- [ ] `app/(main)/stories/[id]/page.tsx`
- [ ] `app/(main)/hadith/page.tsx`
- [ ] `app/(main)/hadith/[id]/page.tsx`
- [ ] `app/(main)/quests/page.tsx`
- [ ] `app/(main)/shop/page.tsx`
- [ ] `app/(main)/account/page.tsx`
- [ ] `components/mobile-header.tsx`
- [ ] `components/user-progress.tsx`

### 3.3 Test User Progress
- [ ] Signup new user
- [ ] Check `user_progress` table di Supabase
- [ ] Complete 1 hijaiyah lesson
- [ ] Check XP bertambah di DB
- [ ] Logout & login → data persist
- [ ] Open di device lain → data sync

### 3.4 Migration Script (Optional)
Jika ada existing users di localStorage, buat script untuk migrate:

- [ ] Create: `scripts/migrate-localStorage-to-supabase.ts`
```typescript
// Read from localStorage
const localData = JSON.parse(localStorage.getItem('user-progress'))

// Insert to Supabase
await supabase
  .from('user_progress')
  .upsert({
    user_id: user.id,
    xp: localData.state.xp,
    hearts: localData.state.hearts,
    points: localData.state.points,
    streak: localData.state.streak,
  })
```

**Checklist Progress**: [ ] Phase 3 Complete

---

## Phase 4: Migrate Lesson Progress (Week 3)

### 4.1 Create Hook
- [ ] Create: `hooks/use-lesson-progress.ts`
- [ ] Implement methods:
  - `completeHijaiyahLesson(id)`
  - `completeStoryLesson(id)`
  - `completeHadithLesson(id, memorized)`
  - `isHijaiyahCompleted(id)`
  - etc.

### 4.2 Database Insert Example
```typescript
const completeHijaiyahLesson = async (id: string) => {
  if (!user) return

  // Insert to DB
  await supabase.from('lesson_progress').upsert({
    user_id: user.id,
    lesson_type: 'hijaiyah',
    lesson_id: id,
    completed: true,
  })

  // Update XP
  await addXp(50)

  // Update quest progress
  await updateQuestProgress("daily-complete-2-hijaiyah", 1)
}
```

### 4.3 Update Quiz Components
- [ ] `app/(main)/hijaiyah/[id]/page.tsx` - Call DB on quiz complete
- [ ] `app/(main)/stories/[id]/page.tsx` - Same
- [ ] `app/(main)/hadith/[id]/page.tsx` - Same

### 4.4 Test Lesson Progress
- [ ] Complete 1 lesson
- [ ] Check `lesson_progress` table
- [ ] Verify progress bar update
- [ ] Verify sequential unlock works
- [ ] Test across devices

**Checklist Progress**: [ ] Phase 4 Complete

---

## Phase 5: Migrate Quests (Week 3)

### 5.1 Initialize User Quests
When user signup, create default quests:

- [ ] Add to `handle_new_user()` trigger di Supabase:
```sql
-- Insert default daily quests
INSERT INTO public.user_quests (user_id, quest_id, quest_type, progress, target, reward_points)
VALUES 
  (new.id, 'daily-complete-2-hijaiyah', 'daily', 0, 2, 50),
  (new.id, 'daily-watch-1-story', 'daily', 0, 1, 75),
  (new.id, 'daily-read-1-hadith', 'daily', 0, 1, 60);

-- Same for weekly and achievements
```

### 5.2 Create Hook
- [ ] Create: `hooks/use-quests.ts`
- [ ] Implement:
  - `updateQuestProgress(questId, increment)`
  - `claimQuestReward(questId)`

### 5.3 Quest Reset Logic
Two options:

**Option A: Client-side (current)**
- Keep existing logic in hook

**Option B: Supabase Cron Job (recommended)**
- [ ] Setup Supabase Edge Function
- [ ] Schedule cron to reset daily/weekly quests

### 5.4 Update Quest Page
- [ ] `app/(main)/quests/page.tsx` - Fetch from DB
- [ ] Test claim rewards
- [ ] Test progress update

**Checklist Progress**: [ ] Phase 5 Complete

---

## Phase 6: Real Leaderboard (Week 4)

### 6.1 Query Leaderboard
- [ ] Update `app/(main)/leaderboard/page.tsx`:
```typescript
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('leaderboard')
        .select('*')
        .limit(100)
      
      setLeaderboard(data || [])
    }

    fetchLeaderboard()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('leaderboard')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_progress',
      }, () => {
        fetchLeaderboard()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div>
      {leaderboard.map((user, index) => (
        <div key={user.id}>
          {index + 1}. {user.display_name} - {user.xp} XP
        </div>
      ))}
    </div>
  )
}
```

### 6.2 Highlight Current User
- [ ] Compare `user.id` dengan current auth user
- [ ] Add special styling untuk current user

### 6.3 Test Leaderboard
- [ ] Create multiple test accounts
- [ ] Add different XP amounts
- [ ] Verify ranking order
- [ ] Verify real-time updates

**Checklist Progress**: [ ] Phase 6 Complete

---

## Phase 7: Shop & Purchases (Week 4)

### 7.1 Track Purchases
- [ ] Update shop purchase logic:
```typescript
const handlePurchase = async (item) => {
  const success = await spendPoints(item.cost)
  
  if (success) {
    // Insert purchase record
    await supabase.from('shop_purchases').insert({
      user_id: user.id,
      item_id: item.id,
      item_name: item.name,
      cost: item.cost,
      expires_at: item.duration 
        ? new Date(Date.now() + item.duration * 60000).toISOString()
        : null,
    })

    // Apply effect (refill hearts, etc)
    if (item.id === 'refill-hearts') {
      await updateHearts(5)
    }
  }
}
```

### 7.2 Check Active Power-ups
- [ ] Query purchases with `expires_at > now()`
- [ ] Show active power-ups di UI
- [ ] Apply 2x XP boost automatically

**Checklist Progress**: [ ] Phase 7 Complete

---

## Phase 8: Daily Login Rewards (Week 4)

### 8.1 Update Modal Logic
- [ ] Check last login from DB instead of localStorage
- [ ] Insert reward record to `daily_login_rewards`
- [ ] Update user points & hearts

### 8.2 Show Streak
- [ ] Query consecutive days from `daily_login_rewards`
- [ ] Display in modal

**Checklist Progress**: [ ] Phase 8 Complete

---

## Phase 9: Testing & Polish (Week 5-6)

### 9.1 Comprehensive Testing

**Authentication**
- [ ] Signup dengan email baru
- [ ] Login dengan credentials
- [ ] Logout
- [ ] Session persist setelah refresh
- [ ] Protected routes redirect ke login

**User Progress**
- [ ] XP bertambah setelah complete lesson
- [ ] Hearts berkurang saat wrong answer
- [ ] Points bertambah dari quests
- [ ] Streak update setiap hari
- [ ] Level up animation

**Lesson Progress**
- [ ] Complete lesson tersimpan
- [ ] Progress bar update
- [ ] Sequential unlock bekerja
- [ ] Data sync antar device

**Quests**
- [ ] Progress update real-time
- [ ] Claim rewards bekerja
- [ ] Daily reset jam 00:00
- [ ] Weekly reset hari Senin
- [ ] Achievement unlock

**Shop**
- [ ] Purchase mengurangi points
- [ ] Refill hearts bekerja
- [ ] Time-based items expire
- [ ] 2x XP boost applied

**Leaderboard**
- [ ] Top users ditampilkan
- [ ] Real-time update
- [ ] Current user highlighted

**Daily Login**
- [ ] Modal shows once per day
- [ ] Rewards increase per day
- [ ] Reset setelah day 7

### 9.2 Error Handling
- [ ] Add try-catch di semua async functions
- [ ] Show user-friendly error messages
- [ ] Add loading states
- [ ] Add error boundaries

### 9.3 Performance
- [ ] Check bundle size: `npm run build`
- [ ] Optimize images
- [ ] Add loading skeletons
- [ ] Test on slow connection

### 9.4 Accessibility
- [ ] Test keyboard navigation
- [ ] Add ARIA labels
- [ ] Test dengan screen reader
- [ ] Check color contrast

**Checklist Progress**: [ ] Phase 9 Complete

---

## Phase 10: Deployment (Week 6)

### 10.1 Environment Setup
**Vercel**:
- [ ] Connect GitHub repo
- [ ] Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy

### 10.2 Database Backup
- [ ] Setup automatic backups di Supabase
- [ ] Test restore from backup

### 10.3 Monitoring
- [ ] Setup Sentry untuk error tracking
- [ ] Setup Vercel Analytics
- [ ] Monitor Supabase logs

### 10.4 Documentation
- [ ] Update README.md
- [ ] Document API endpoints (jika ada)
- [ ] Create user guide

**Checklist Progress**: [ ] Phase 10 Complete

---

## ✅ Final Checklist

Before launching to production:

**Technical**:
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Lighthouse score > 90
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

**Content**:
- [ ] Audio files uploaded
- [ ] YouTube videos replaced with real content
- [ ] All text reviewed (no typos)

**Security**:
- [ ] Row Level Security enabled di Supabase
- [ ] No sensitive data di client
- [ ] Environment variables secured
- [ ] SQL injection protected
- [ ] CORS configured

**Performance**:
- [ ] Images optimized
- [ ] Fonts optimized
- [ ] Bundle size < 200KB
- [ ] First Contentful Paint < 2s

**UX**:
- [ ] Loading states added
- [ ] Error messages helpful
- [ ] Success feedback clear
- [ ] Onboarding flow smooth

---

## 🚨 Troubleshooting

### Issue: "Invalid JWT"
**Fix**: Check if `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct

### Issue: "Row Level Security policy violation"
**Fix**: Check RLS policies di Supabase dashboard

### Issue: "User not found"
**Fix**: Make sure `handle_new_user()` trigger is working

### Issue: Data not syncing
**Fix**: 
1. Check network tab for failed requests
2. Check Supabase logs
3. Verify user is authenticated

### Issue: Quest not resetting
**Fix**: Check cron job or implement server-side reset

---

## 📊 Progress Tracker

| Phase | Task | Status | Notes |
|-------|------|--------|-------|
| 1 | Setup Supabase | ⬜ | |
| 2 | Authentication | ⬜ | |
| 3 | User Progress | ⬜ | |
| 4 | Lesson Progress | ⬜ | |
| 5 | Quests | ⬜ | |
| 6 | Leaderboard | ⬜ | |
| 7 | Shop | ⬜ | |
| 8 | Daily Login | ⬜ | |
| 9 | Testing | ⬜ | |
| 10 | Deployment | ⬜ | |

**Legend**: ⬜ Not Started | 🔄 In Progress | ✅ Complete

---

## 📝 Notes & Issues

[Space untuk catatan selama migration]

---

**Good luck with migration! 🚀**

Jika ada pertanyaan, refer ke:
- `DOCUMENTATION.md` untuk detail teknis
- `DEVELOPER_GUIDE.md` untuk coding guide
- Supabase docs: https://supabase.com/docs
