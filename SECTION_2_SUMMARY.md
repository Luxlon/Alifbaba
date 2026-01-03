# Section 2: Database Schema & Mock Data - COMPLETE ✅

## Files Created

### 1. Type Definitions (`types/database.ts`)
Complete TypeScript interfaces for:
- **UserProgress**: hearts, XP, points, streak tracking
- **HijaiyahProgress**: letter completion, score, harakat mastery
- **StoryProgress**: video watched, quiz scores
- **HadithProgress**: audio played, memorization tracking
- **Challenge**: Quiz questions (SELECT, LISTENING, SELECT_ALL, FILL_IN_BLANK)
- **ShopItem**: Hearts refill, boosts, cosmetics
- **LeaderboardEntry**: Rankings with XP and streak
- **Quest**: Daily, weekly, and achievement quests

### 2. State Management (`store/`)
**`use-user-progress.tsx`** - Zustand store with persistence:
- `addHearts()` / `removeHearts()`
- `addXp()` / `addPoints()` / `spendPoints()`
- `updateStreak()` - Automatic streak calculation
- `resetHearts()`

**`use-lesson-progress.tsx`** - Zustand store for lesson tracking:
- `completeHijaiyahLesson()` - Track letter progress
- `completeStoryLesson()` - Track story completion
- `completeHadithLesson()` - Track hadith memorization
- `getTotalCompleted()` - Get completion stats
- `isXCompleted()` - Check individual lesson status

### 3. Mock Data (`lib/mock-data.ts`)
Ready-to-use data:
- `MOCK_ALIF_CHALLENGES` - Sample challenges for Alif letter
- `MOCK_ADAM_CHALLENGES` - Sample quiz for Nabi Adam story
- `MOCK_SHOP_ITEMS` - 5 purchasable items
- `MOCK_QUESTS` - Daily, weekly, achievement quests
- `MOCK_LEADERBOARD` - Top 5 users
- `XP_REWARDS` - XP configuration
- `HEARTS_CONFIG` - Hearts system settings
- `POINTS_REWARDS` - Points economy

### 4. Helper Functions (`lib/progress.ts`)
Utility functions for:
- `calculateChallengeXP()` - XP for correct answers
- `calculateLessonXP()` - XP for lesson completion
- `calculateLessonScore()` - Score 0-100
- `calculateHeartsLost()` - Hearts penalty
- `calculateLessonPoints()` - Points with streak bonus
- `calculateDailyLoginReward()` - Daily rewards
- `calculateUserLevel()` - Level from XP
- `checkChallengeAnswer()` - Validate user answers
- `getChallengeResultMessage()` - Feedback messages
- `formatXP()` / `formatPoints()` - Number formatting

### 5. Updated Pages
All pages now use live state management:
- **`/learn`**: Shows real XP, hearts, points, streak, progress
- **`/shop`**: Functional purchase system with toast notifications
- **`/leaderboard`**: Dynamic rankings with current user highlighted

## How It Works

### User Progress Flow
```typescript
// User starts with initial state
const { xp, hearts, points } = useUserProgress();

// Complete a challenge
const isCorrect = checkChallengeAnswer(challenge, selectedOptions);
if (isCorrect) {
  addXp(calculateChallengeXP(isCorrect, isFirstTry));
} else {
  removeHearts(1);
}

// Complete a lesson
completeHijaiyahLesson("alif", "Alif", score, harakatMastered);
addPoints(calculateLessonPoints(true, streak));
```

### Shop Purchase Flow
```typescript
const handlePurchase = (item) => {
  const success = spendPoints(item.price);
  if (success) {
    if (item.type === "HEARTS_REFILL") {
      addHearts(item.value);
    }
    toast.success("Berhasil!");
  }
};
```

### Progress Tracking
```typescript
// Check completion status
const isCompleted = isHijaiyahCompleted("alif");

// Get total stats
const { hijaiyah, stories, hadith, total } = getTotalCompleted();

// Calculate progress percentage
const progress = (completed / total) * 100;
```

## Data Persistence

All state is **automatically persisted** to localStorage:
- `user-progress-storage` - User XP, hearts, points, streak
- `lesson-progress-storage` - All lesson completion data

Data persists across browser sessions and page refreshes!

## Testing the System

1. **Visit `/learn`**: See your initial 100 points, 5 hearts, 0 XP
2. **Go to `/shop`**: Try buying "Isi Ulang Hati" (costs 50 points)
3. **Check `/leaderboard`**: You should be rank #4 with 0 XP
4. **Refresh page**: All data persists!

## Configuration

Adjust rewards in `lib/mock-data.ts`:
```typescript
export const XP_REWARDS = {
  CHALLENGE_CORRECT: 10,
  LESSON_COMPLETE: 50,
  PERFECT_SCORE: 100,
  FIRST_TRY: 20,
};

export const HEARTS_CONFIG = {
  MAX_HEARTS: 5,
  LOSE_PER_WRONG_ANSWER: 1,
  REFILL_COST: 50,
};
```

## Next Steps (Section 3)

Now ready to build:
1. Individual Hijaiyah letter lessons with quiz
2. Audio playback integration
3. Challenge UI components
4. Result screens with XP/hearts animations

---

**Section 2 Status**: ✅ **COMPLETE**
- Database schema defined
- State management implemented
- Mock data created
- All pages integrated
- Data persistence working
