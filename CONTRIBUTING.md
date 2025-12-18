# 🤝 Contributing Guide - AlifBaBa

Terima kasih sudah tertarik untuk berkontribusi! Dokumen ini akan membantu Anda memulai.

---

## 🎯 Cara Kontribusi

Ada beberapa cara untuk berkontribusi:

1. **Report Bugs** - Temukan bug? Laporkan!
2. **Suggest Features** - Ada ide fitur baru? Share!
3. **Fix Issues** - Ambil issue yang ada dan selesaikan
4. **Add Content** - Tambah hadith, kisah nabi, atau modul baru
5. **Improve Docs** - Update atau perbaiki dokumentasi
6. **Code Review** - Review pull requests dari contributor lain

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork repository di GitHub (klik button "Fork")

# Clone ke local
git clone https://github.com/YOUR_USERNAME/alifbaba.git
cd alifbaba

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/alifbaba.git
```

### 2. Setup Development Environment

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 3. Create Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create new branch
git checkout -b feature/your-feature-name

# Branch naming convention:
# feature/    - New features (feature/add-doa-module)
# fix/        - Bug fixes (fix/audio-not-playing)
# docs/       - Documentation (docs/update-readme)
# refactor/   - Code refactoring (refactor/quest-store)
# test/       - Adding tests (test/user-progress)
```

---

## 📝 Coding Standards

### General Rules

1. **Write Clean Code**
   - Self-documenting code (nama variable yang jelas)
   - Keep functions small (< 50 lines)
   - One responsibility per function
   - No magic numbers (use constants)

2. **Follow TypeScript Best Practices**
   - Use proper types (avoid `any`)
   - Define interfaces for complex objects
   - Use type inference when obvious

3. **Comment When Necessary**
   - Explain "why", not "what"
   - Add JSDoc for public functions
   - Comment complex logic

### Code Style

**✅ Good Example**:
```typescript
// ✅ Clear function name, typed parameters, JSDoc comment
/**
 * Calculates user level based on XP
 * @param xp - Total experience points
 * @returns Level number (1-10)
 */
function calculateLevel(xp: number): number {
  return Math.min(Math.floor(xp / 1000) + 1, 10);
}

// ✅ Descriptive variable names
const completedLessons = lessons.filter(lesson => lesson.completed);
const progressPercentage = (completedLessons.length / lessons.length) * 100;

// ✅ Early returns for clarity
function canPurchaseItem(points: number, itemCost: number): boolean {
  if (points < itemCost) return false;
  if (itemCost <= 0) return false;
  return true;
}
```

**❌ Bad Example**:
```typescript
// ❌ Generic names, no types, no comments
function calc(x: any) {
  return Math.min(Math.floor(x / 1000) + 1, 10);
}

// ❌ Unclear variable names
const cl = lessons.filter(l => l.c);
const pp = (cl.length / lessons.length) * 100;

// ❌ Nested conditions
function canPurchaseItem(points: number, itemCost: number): boolean {
  if (points >= itemCost) {
    if (itemCost > 0) {
      return true;
    }
  }
  return false;
}
```

### React Components

**Component Structure**:
```typescript
"use client" // Only if using client hooks

// 1. Imports
import { useState, useEffect } from "react"
import { useUserProgress } from "@/hooks/use-user-progress"
import { Button } from "@/components/ui/button"

// 2. Types/Interfaces
interface MyComponentProps {
  title: string
  onComplete?: () => void
}

// 3. Component
export default function MyComponent({ title, onComplete }: MyComponentProps) {
  // 4. Hooks (in order: state, effects, callbacks)
  const [loading, setLoading] = useState(false)
  const { xp, addXp } = useUserProgress()
  
  useEffect(() => {
    // Effect logic
  }, [])
  
  // 5. Event handlers
  const handleClick = () => {
    setLoading(true)
    // ... logic
    onComplete?.()
  }
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  )
}
```

### Styling Guidelines

**Use Tailwind Utility Classes**:
```tsx
// ✅ Good - Utility classes
<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg">
  <span className="text-lg font-bold text-emerald-600">Hello</span>
</div>

// ❌ Avoid - Inline styles
<div style={{ display: 'flex', padding: '24px', backgroundColor: 'white' }}>
  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Hello</span>
</div>
```

**Responsive Design**:
```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// Hide/show based on screen size
<div className="hidden lg:block">Desktop only</div>
<div className="block lg:hidden">Mobile only</div>
```

### File Naming

```
components/
  ├── audio-player.tsx        // ✅ kebab-case for components
  ├── youtube-player.tsx
  └── ui/
      ├── button.tsx
      └── progress.tsx

hooks/
  ├── use-user-progress.ts    // ✅ kebab-case with 'use-' prefix
  └── use-quests.ts

app/
  ├── (main)/
  │   └── learn/
  │       └── page.tsx         // ✅ Next.js convention
  └── layout.tsx
```

---

## 🧪 Testing

### Before Submitting PR

**Manual Testing Checklist**:
- [ ] Feature bekerja di Chrome
- [ ] Feature bekerja di Firefox
- [ ] Feature bekerja di Safari (if possible)
- [ ] Mobile responsive (test di device tools)
- [ ] No console errors
- [ ] No TypeScript errors (`npm run lint`)

**Test User Flows**:
```bash
# Example: Testing new quest feature
1. Login sebagai user
2. Complete lesson yang trigger quest
3. Check quest progress update
4. Claim quest reward
5. Verify points bertambah
6. Check across page refresh (persistence)
```

### Writing Tests (Future)

Ketika testing suite sudah di-setup:

```typescript
// __tests__/use-user-progress.test.ts
import { renderHook, act } from '@testing-library/react'
import { useUserProgress } from '@/hooks/use-user-progress'

describe('useUserProgress', () => {
  it('should add XP correctly', () => {
    const { result } = renderHook(() => useUserProgress())
    
    act(() => {
      result.current.addXp(100)
    })
    
    expect(result.current.xp).toBe(100)
  })
})
```

---

## 📤 Submitting Changes

### 1. Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Code style (formatting, semicolons, etc)
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance tasks

# Examples:
git commit -m "feat(hijaiyah): add audio player controls"
git commit -m "fix(quests): daily reset not working"
git commit -m "docs(readme): update installation steps"
git commit -m "refactor(stores): simplify quest logic"
```

**Good Commit Messages**:
```bash
✅ feat(shop): add 2x XP boost item
✅ fix(auth): redirect to login when session expires
✅ docs(api): add JSDoc comments to user-progress hook
```

**Bad Commit Messages**:
```bash
❌ update stuff
❌ fix bug
❌ WIP
❌ asdfasdf
```

### 2. Push & Create PR

```bash
# Commit your changes
git add .
git commit -m "feat(stories): add 5 new prophet stories"

# Push to your fork
git push origin feature/add-new-stories

# Create Pull Request di GitHub
# 1. Go to your fork on GitHub
# 2. Click "Compare & pull request"
# 3. Fill in PR template
# 4. Submit!
```

### 3. PR Template

Ketika create PR, isi template ini:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Changes Made
- Added X feature
- Fixed Y bug
- Updated Z documentation

## Screenshots (if applicable)
[Add screenshots untuk UI changes]

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] No console errors
- [ ] TypeScript checks pass

## Related Issues
Closes #123
```

---

## 🎨 Adding New Features

### Example: Adding "Doa Harian" Module

**Step-by-step Guide**:

#### 1. Add Data to constants.ts

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

#### 2. Create Pages

```typescript
// app/(main)/prayers/page.tsx
"use client"

import { DAILY_PRAYERS } from "@/constants"
import Link from "next/link"

export default function PrayersPage() {
  return (
    <div className="space-y-4">
      {DAILY_PRAYERS.map((prayer) => (
        <Link key={prayer.id} href={`/prayers/${prayer.id}`}>
          <div className="border rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-bold">{prayer.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
```

#### 3. Add to Navigation

```typescript
// components/sidebar.tsx
<SidebarItem
  label="Doa Harian"
  href="/prayers"
  iconSrc="/prayers.svg"
/>
```

#### 4. Create Icon

```svg
<!-- public/prayers.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
  <!-- Your SVG icon -->
</svg>
```

#### 5. Update Store (if needed)

```typescript
// hooks/use-lesson-progress.ts
completePrayerLesson: async (id: string) => {
  // Implementation
}
```

#### 6. Test Everything

- [ ] Prayer list loads
- [ ] Can navigate to detail
- [ ] Audio plays
- [ ] Quiz works
- [ ] Progress saves
- [ ] Mobile responsive

#### 7. Create PR

```bash
git add .
git commit -m "feat(prayers): add daily prayers module with 10 prayers"
git push origin feature/add-prayers-module
```

---

## 🐛 Reporting Bugs

### How to Report

1. **Search Existing Issues** - Check if bug sudah dilaporkan
2. **Create New Issue** dengan template ini:

```markdown
### Bug Description
Clear description of the bug.

### Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior
What should happen.

### Actual Behavior
What actually happens.

### Screenshots
[If applicable]

### Environment
- Browser: Chrome 120
- Device: Desktop / Mobile
- OS: Windows 11
- Screen size: 1920x1080

### Additional Context
Any other information about the problem.
```

### Example Bug Report

```markdown
### Bug Description
Audio player tidak play di Firefox

### Steps to Reproduce
1. Go to /hijaiyah/alif
2. Click audio play button
3. Nothing happens

### Expected Behavior
Audio should play

### Actual Behavior
Button clicks but no sound

### Environment
- Browser: Firefox 120
- Device: Desktop
- OS: Windows 11
```

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
### Feature Description
Clear description of the feature.

### Problem It Solves
What problem does this solve?

### Proposed Solution
How would you implement it?

### Alternatives Considered
Any alternative solutions?

### Additional Context
Mockups, examples, etc.
```

### Example Feature Request

```markdown
### Feature Description
Add "Surat Pendek" module untuk belajar surat-surat dari Juz 30

### Problem It Solves
User ingin belajar surat pendek untuk sholat, tapi belum ada module-nya

### Proposed Solution
- Create new module `/surah`
- List 10-15 surat pendek (An-Nas sampai At-Takathur)
- Each surat has: Arabic text, Latin, translation, audio
- Quiz after each surat

### Alternatives Considered
Could integrate with existing hadith module, but separate module lebih organized

### Additional Context
Popular request dari user testing
```

---

## 📚 Documentation

### When to Update Docs

Update dokumentasi jika:
- Menambah fitur baru
- Mengubah API/interface
- Fix bug yang perlu dijelaskan
- Menambah dependency baru
- Mengubah deployment process

### Which Files to Update

| File | When to Update |
|------|----------------|
| `README.md` | User-facing changes, installation steps |
| `DOCUMENTATION.md` | Architecture, features, migration guide |
| `DEVELOPER_GUIDE.md` | Code examples, best practices |
| `TODO.md` | Task list changes |
| `CHANGELOG.md` | Every release (version changes) |

---

## 🏆 Recognition

### Contributors

All contributors will be:
- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- Given credit in project README

### Top Contributors

Contributors dengan impact besar akan:
- Get special badge
- Be listed as core maintainer
- Have voting rights untuk major decisions

---

## ❓ Questions?

**Need Help?**
- Read docs: `README.md`, `DOCUMENTATION.md`, `DEVELOPER_GUIDE.md`
- Search existing issues
- Ask in Discussions
- Join Discord/Slack (if available)

**Contact**:
- GitHub Issues: [github.com/yourrepo/issues](https://github.com)
- Email: [your-email@example.com]

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Expected Behavior

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Accept constructive criticism
- Focus on what's best for the community

### Unacceptable Behavior

- Harassment, trolling, insulting comments
- Publishing others' private information
- Any conduct that could be considered inappropriate

### Enforcement

Report violations to [email]. Violations may result in:
- Warning
- Temporary ban
- Permanent ban

---

**Thank you for contributing to AlifBaBa! 🎉**

Your contributions help thousands of kids learn about Islam in a fun way! 🌟
