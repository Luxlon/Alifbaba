# ✅ TODO List - AlifBaBa Project

Daftar task yang perlu dikerjakan untuk melengkapi project.

---

## 🔴 URGENT (Prioritas Tinggi)

### 1. Upload Audio Files
**Status**: ⬜ Not Started  
**Deadline**: ASAP  
**Estimate**: 2-3 hari

**What to do**:
- [ ] Record/download pengucapan 28 huruf hijaiyah (alif-ya)
- [ ] Record/download pengucapan 6 harakat (fathah, kasrah, dhammah, sukun, tanwin, tashdid)
- [ ] Record/download 8 hadith dalam bahasa Arab
- [ ] Convert ke format MP3 (96-128 kbps)
- [ ] Upload ke:
  - `public/audio/hijaiyah/alif.mp3` ... `ya.mp3`
  - `public/audio/hijaiyah/fathah.mp3` ... `tashdid.mp3`
  - `public/audio/hadith/hadith-1.mp3` ... `hadith-8.mp3`

**Resources**:
- Qari profesional untuk recording
- Atau download dari sumber yang legal
- Tools: Audacity untuk editing

---

### 2. Replace YouTube Video IDs
**Status**: ⬜ Not Started  
**Deadline**: ASAP  
**Estimate**: 1 hari

**What to do**:
- [ ] Cari 7 video kisah nabi yang cocok untuk anak
- [ ] Pilih video dengan:
  - Durasi 5-15 menit
  - Bahasa Indonesia
  - Animasi/ilustrasi menarik
  - Konten akurat secara agama
- [ ] Copy YouTube video ID (11 karakter)
- [ ] Replace di `constants.ts`:

```typescript
// File: constants.ts
export const PROPHET_STORIES = [
  {
    id: "1",
    title: "Nabi Adam AS",
    youtubeId: "REPLACE_THIS", // ← Ganti dengan video ID yang sesuai
    // ...
  },
  // ... 6 stories lainnya
];
```

**YouTube Channels yang Recommended**:
- Nussa Official
- Riko The Series
- Islamic Stories for Kids

---

### 3. Setup Supabase
**Status**: ⬜ Not Started  
**Deadline**: 1-2 minggu  
**Estimate**: 2-3 hari setup + 1-2 minggu migration  
**Priority**: Setelah audio & video selesai

**What to do**:
- [ ] Follow checklist di `SUPABASE_MIGRATION_CHECKLIST.md`
- [ ] Phase 1: Setup project & database
- [ ] Phase 2: Authentication
- [ ] Phase 3-8: Migrate features
- [ ] Phase 9: Testing
- [ ] Phase 10: Deploy

**Why Important**:
- Data saat ini di localStorage (hilang jika clear cache)
- Perlu authentication untuk user management
- Perlu database untuk real leaderboard
- Perlu sync antar device

---

## 🟡 HIGH PRIORITY (Penting)

### 4. Implement Authentication
**Status**: ⬜ Not Started  
**Depends on**: Task #3 (Supabase)  
**Estimate**: 3-4 hari

**What to do**:
- [ ] Create login page
- [ ] Create signup page
- [ ] Create logout functionality
- [ ] Add middleware untuk protect routes
- [ ] Test flow signup → login → access app

---

### 5. Add Error Handling
**Status**: ⬜ Not Started  
**Estimate**: 1-2 hari

**What to do**:
- [ ] Create `app/error.tsx` (error boundary)
- [ ] Add try-catch di semua async functions
- [ ] Add user-friendly error messages
- [ ] Test error scenarios (network error, etc)

**Example**:
```typescript
// app/error.tsx
'use client'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Oops! Ada yang salah</h2>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <button onClick={reset} className="bg-emerald-500 text-white px-6 py-2 rounded">
        Coba Lagi
      </button>
    </div>
  )
}
```

---

### 6. Add Loading States
**Status**: ✅ Partially Complete (ada spinner)  
**Estimate**: 1 hari

**What to do**:
- [ ] Replace simple spinners dengan skeleton loaders
- [ ] Add loading animation yang lebih menarik
- [ ] Add suspense boundaries

**Example Skeleton**:
```typescript
// components/skeleton-card.tsx
export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}
```

---

### 7. Real Leaderboard
**Status**: ⬜ Not Started  
**Depends on**: Task #3 (Supabase)  
**Estimate**: 1 hari

**What to do**:
- [ ] Query dari Supabase `leaderboard` view
- [ ] Implement real-time updates
- [ ] Add pagination (load more)
- [ ] Highlight current user

---

## 🟢 MEDIUM PRIORITY (Bagus untuk Ada)

### 8. Add More Content
**Status**: ⬜ Not Started  
**Estimate**: Ongoing (bisa ditambah kapan saja)

**What to do**:
- [ ] Tambah hadith (target: 20+ hadith)
- [ ] Tambah kisah nabi (target: 15+ stories)
- [ ] Tambah modul baru: Doa Harian
- [ ] Tambah modul baru: Surat Pendek (Juz 30)

---

### 9. PWA Support
**Status**: ⬜ Not Started  
**Estimate**: 1-2 hari

**What to do**:
- [ ] Install `next-pwa`
- [ ] Configure service worker
- [ ] Test offline mode
- [ ] Add install prompt

```bash
npm install next-pwa
```

**Benefits**:
- App bisa di-install di phone
- Bekerja offline (cache content)
- Push notifications (future)

---

### 10. Analytics
**Status**: ⬜ Not Started  
**Estimate**: 1 hari

**What to do**:
- [ ] Setup Google Analytics atau Vercel Analytics
- [ ] Track page views
- [ ] Track button clicks (CTA tracking)
- [ ] Track completion rates

**Why Important**:
- Tahu fitur mana yang populer
- Optimize user experience
- Track conversion rates

---

### 11. SEO Optimization
**Status**: ⬜ Not Started  
**Estimate**: 1 hari

**What to do**:
- [ ] Add meta descriptions di setiap page
- [ ] Add Open Graph tags (untuk social sharing)
- [ ] Add structured data (Schema.org)
- [ ] Create sitemap.xml
- [ ] Create robots.txt

**Example**:
```typescript
// app/(main)/hijaiyah/page.tsx
export const metadata = {
  title: "Belajar Huruf Hijaiyah | AlifBaBa",
  description: "Belajar 28 huruf hijaiyah dengan audio dan quiz interaktif",
  openGraph: {
    title: "Belajar Huruf Hijaiyah",
    description: "Aplikasi belajar Islam untuk anak",
    images: ["/og-image.png"],
  },
}
```

---

### 12. Admin Panel
**Status**: ⬜ Not Started  
**Estimate**: 3-5 hari

**What to do**:
- [ ] Create `/admin` route (protected)
- [ ] UI untuk manage content:
  - Upload audio files via UI
  - Add/edit/delete hadith
  - Add/edit/delete stories
  - Edit quiz questions
- [ ] User management (view users, stats)
- [ ] Content moderation

---

## 🔵 LOW PRIORITY (Nice to Have)

### 13. Social Features
**Status**: ⬜ Not Started  
**Estimate**: 1 minggu

**What to do**:
- [ ] Share progress ke social media
- [ ] Friend system (add friends)
- [ ] Challenge friends to quiz
- [ ] Comment system di kisah nabi

---

### 14. Parent Dashboard
**Status**: ⬜ Not Started  
**Estimate**: 3-5 hari

**What to do**:
- [ ] Separate dashboard untuk parents
- [ ] View child's progress
- [ ] Set learning goals
- [ ] Receive progress reports via email

---

### 15. Advanced Gamification
**Status**: ⬜ Not Started  
**Estimate**: 1 minggu

**What to do**:
- [ ] Badge system dengan tiers (bronze, silver, gold)
- [ ] Daily challenges (bonus quests)
- [ ] Streak recovery (spend points to keep streak)
- [ ] Leaderboard leagues (weekly competitions)
- [ ] Seasonal events

---

### 16. Mobile App
**Status**: ⬜ Not Started  
**Estimate**: 1-2 bulan

**What to do**:
- Option A: React Native app
- Option B: Capacitor (wrap PWA)
- [ ] Setup React Native project
- [ ] Migrate UI components
- [ ] Add native features (push notifications)
- [ ] Publish to Play Store & App Store

---

### 17. Multi-language Support
**Status**: ⬜ Not Started  
**Estimate**: 3-5 hari

**What to do**:
- [ ] Add i18n support (next-intl)
- [ ] Translate to English
- [ ] Translate to Arabic
- [ ] Language switcher di UI

---

### 18. Accessibility Improvements
**Status**: ⬜ Not Started  
**Estimate**: 2-3 hari

**What to do**:
- [ ] Add ARIA labels di semua interactive elements
- [ ] Implement keyboard shortcuts
- [ ] Add focus indicators
- [ ] Test dengan screen reader
- [ ] Add high contrast mode

---

### 19. Testing Suite
**Status**: ⬜ Not Started  
**Estimate**: 1 minggu

**What to do**:
- [ ] Setup Jest + React Testing Library
- [ ] Write unit tests untuk stores
- [ ] Write integration tests untuk user flows
- [ ] Setup E2E tests dengan Playwright
- [ ] Add CI/CD pipeline

---

### 20. Performance Optimization
**Status**: ⬜ Not Started  
**Estimate**: 2-3 hari

**What to do**:
- [ ] Optimize images (use next/image, WebP format)
- [ ] Optimize fonts (use next/font)
- [ ] Code splitting & lazy loading
- [ ] Add caching headers
- [ ] Minimize bundle size

---

## 🔧 Bug Fixes

### Known Issues
- [ ] CSS warning di `globals.css` (Tailwind @apply) - **Minor**, tidak affect build
- [ ] Quest reset logic pakai client time (bisa di-manipulate) - **Fix**: Pakai server-side cron

---

## 📊 Progress Summary

| Priority | Total Tasks | Completed | In Progress | Not Started |
|----------|-------------|-----------|-------------|-------------|
| 🔴 URGENT | 3 | 0 | 0 | 3 |
| 🟡 HIGH | 4 | 0 | 0 | 4 |
| 🟢 MEDIUM | 5 | 0 | 0 | 5 |
| 🔵 LOW | 8 | 0 | 0 | 8 |
| **TOTAL** | **20** | **0** | **0** | **20** |

---

## 🗓️ Suggested Timeline

### Week 1-2: Content & Core Fixes
- Task #1: Upload audio files
- Task #2: Replace video IDs
- Task #5: Add error handling
- Task #6: Improve loading states

### Week 3-4: Database Setup
- Task #3: Setup Supabase
- Task #4: Authentication

### Week 5-6: Migration
- Migrate user progress
- Migrate lesson progress
- Migrate quests
- Task #7: Real leaderboard

### Week 7-8: Polish & Features
- Task #8: Add more content
- Task #9: PWA support
- Task #10: Analytics
- Task #11: SEO

### Week 9-10: Testing & Launch
- Comprehensive testing
- Bug fixes
- Deploy to production
- Monitor & iterate

---

## 📝 Notes

### Before Starting Any Task:
1. ✅ Read related documentation
2. ✅ Create a new git branch
3. ✅ Make small, atomic commits
4. ✅ Test thoroughly before merging
5. ✅ Update this TODO list

### Development Workflow:
```bash
# Create feature branch
git checkout -b feature/upload-audio-files

# Make changes & commit
git add .
git commit -m "feat: add hijaiyah audio files"

# Push & create PR
git push origin feature/upload-audio-files
```

### Testing Checklist Before Deploy:
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All features working
- [ ] Mobile responsive
- [ ] Loading states work
- [ ] Error handling works

---

## 🎯 Quick Wins (Mudah & Cepat)

Jika bingung mau mulai dari mana, start dengan quick wins:

1. **Add Error Boundary** (30 menit)
2. **Improve Loading States** (1 jam)
3. **Add Meta Descriptions** (1 jam)
4. **Upload 1-2 Audio Files** (test deployment pipeline)

---

## 📞 Getting Help

**Stuck on a task?**
1. Check `DOCUMENTATION.md`
2. Check `DEVELOPER_GUIDE.md`
3. Google the error message
4. Ask in Discord/Slack
5. Create GitHub issue

**Resources**:
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind Docs: https://tailwindcss.com/docs

---

**Last Updated**: December 18, 2025  
**Next Review**: After completing URGENT tasks

---

**Remember**: Small progress is still progress! 🚀
