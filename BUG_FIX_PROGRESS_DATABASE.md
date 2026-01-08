# Bug Fix: Progress Tidak Tersimpan ke Database

**Tanggal**: 8 Januari 2026
**Status**: ✅ DIPERBAIKI

## Masalah

Ketika user mengerjakan hadits dan huruf hijaiyah, progress tidak tersimpan ke database Supabase. Setelah refresh halaman, progress hilang kembali.

## Penyebab

Terdapat **ketidakcocokan nama kolom** antara:
1. Struktur database Supabase (schema.sql)
2. Code service layer (progress-service.ts)

### Kolom yang TIDAK ADA di Database tapi Digunakan di Code:

#### 1. **hijaiyah_progress**
- ❌ `harakat_mastered` (array) - tidak ada di database
- ❌ `last_attempt_date` (date) - tidak ada di database

#### 2. **hadith_progress**
- ❌ `quiz_attempts` (integer) - tidak ada di database
- ❌ `last_attempt_date` (date) - tidak ada di database

#### 3. **story_progress**
- ❌ `quiz_attempts` (integer) - tidak ada di database
- ❌ `last_attempt_date` (date) - tidak ada di database

#### 4. **iqro_progress**
- ❌ `last_read_date` (date) - tidak ada di database

#### 5. **user_progress**
- ❌ `last_login_date` → seharusnya `last_active_date`
- ❌ `max_hearts` → tidak ada di database (hardcode jadi 5)
- ❌ `longest_streak` → tidak ada di database

## Solusi yang Diterapkan

### File: `lib/supabase/progress-service.ts`

#### 1. ✅ Perbaikan `hijaiyahProgressService`
```typescript
// SEBELUM (SALAH):
const payload = {
  user_id: userId,
  letter_id: progress.letterName,
  letter_name: progress.letterName,
  completed: progress.completed,
  score: progress.score,
  attempts: progress.attempts,
  last_attempt_date: progress.lastAttemptDate || null,  // ❌ Kolom tidak ada
  harakat_mastered: progress.harakatMastered,           // ❌ Kolom tidak ada
};

// SESUDAH (BENAR):
const payload = {
  user_id: userId,
  letter_id: progress.letterId,    // ✅ Gunakan letterId
  letter_name: progress.letterName,
  completed: progress.completed,
  score: progress.score,
  attempts: progress.attempts,
  updated_at: new Date().toISOString(),  // ✅ Tambah timestamp
};
```

#### 2. ✅ Perbaikan `hadithProgressService`
```typescript
// SEBELUM (SALAH):
const payload = {
  user_id: userId,
  hadith_id: progress.hadithId,
  hadith_title: progress.hadithTitle,
  completed: progress.completed,
  audio_played: progress.audioPlayed,
  quiz_score: progress.quizScore,
  quiz_attempts: progress.quizAttempts,  // ❌ Kolom tidak ada
  memorized: progress.memorized,
  last_attempt_date: progress.lastAttemptDate || null,  // ❌ Kolom tidak ada
};

// SESUDAH (BENAR):
const payload = {
  user_id: userId,
  hadith_id: progress.hadithId,
  hadith_title: progress.hadithTitle,
  completed: progress.completed,
  audio_played: progress.audioPlayed,
  quiz_score: progress.quizScore,
  memorized: progress.memorized,
  updated_at: new Date().toISOString(),  // ✅ Tambah timestamp
};
```

#### 3. ✅ Perbaikan `storyProgressService`
```typescript
// SEBELUM (SALAH):
const payload = {
  user_id: userId,
  story_id: progress.storyId,
  story_title: progress.storyTitle,
  completed: progress.completed,
  video_watched: progress.videoWatched,
  quiz_score: progress.quizScore,
  quiz_attempts: progress.quizAttempts,  // ❌ Kolom tidak ada
  last_attempt_date: progress.lastAttemptDate || null,  // ❌ Kolom tidak ada
};

// SESUDAH (BENAR):
const payload = {
  user_id: userId,
  story_id: progress.storyId,
  story_title: progress.storyTitle,
  completed: progress.completed,
  video_watched: progress.videoWatched,
  quiz_score: progress.quizScore,
  updated_at: new Date().toISOString(),  // ✅ Tambah timestamp
};
```

#### 4. ✅ Perbaikan `iqroProgressService`
```typescript
// SEBELUM (SALAH):
const payload = {
  user_id: userId,
  iqro_id: progress.iqroId,
  current_page: progress.currentPage,
  total_pages: progress.totalPages,
  completed: progress.completed,
  last_read_date: progress.lastReadDate || null,  // ❌ Kolom tidak ada
};

// SESUDAH (BENAR):
const payload = {
  user_id: userId,
  iqro_id: progress.iqroId,
  current_page: progress.currentPage,
  total_pages: progress.totalPages,
  completed: progress.completed,
  updated_at: new Date().toISOString(),  // ✅ Tambah timestamp
};
```

#### 5. ✅ Perbaikan `userProgressService`
```typescript
// SEBELUM (SALAH):
const payload = {
  user_id: userId,
  name,
  hearts: 5,
  max_hearts: 5,           // ❌ Kolom tidak ada
  xp: 0,
  points: 100,
  streak: 0,
  longest_streak: 0,       // ❌ Kolom tidak ada
  last_login_date: ...,    // ❌ Nama kolom salah
};

// SESUDAH (BENAR):
const payload = {
  user_id: userId,
  name,
  hearts: 5,
  xp: 0,
  points: 100,
  streak: 0,
  last_active_date: new Date().toISOString().split("T")[0],  // ✅ Nama kolom benar
};
```

## Perubahan di Fungsi Fetch (Read)

Juga diperbaiki untuk menghindari error saat membaca kolom yang tidak ada:

```typescript
// Hijaiyah - set default values untuk field yang tidak ada di DB
result[letterName] = {
  id: item.id,
  userId: item.user_id,
  letterId: String(item.letter_id),
  letterName: letterName,
  completed: item.completed,
  score: item.score,
  attempts: item.attempts,
  lastAttemptDate: "",      // ✅ Default value
  harakatMastered: [],      // ✅ Default value
};

// Hadith - set default values
result[hadithId] = {
  // ... fields lainnya
  quizAttempts: 0,          // ✅ Default value
  lastAttemptDate: "",      // ✅ Default value
};

// Story - set default values
result[storyId] = {
  // ... fields lainnya
  quizAttempts: 0,          // ✅ Default value
  lastAttemptDate: "",      // ✅ Default value
};
```

## Testing

Untuk memverifikasi perbaikan:

1. Login sebagai student (contoh: username `siswa1`, password `siswa1`)
2. Kerjakan pelajaran Hijaiyah:
   - Pilih huruf Alif
   - Selesaikan quiz
   - Cek database: `SELECT * FROM hijaiyah_progress WHERE user_id = '...'`
3. Kerjakan pelajaran Hadith:
   - Pilih hadith
   - Dengar audio dan kerjakan quiz
   - Cek database: `SELECT * FROM hadith_progress WHERE user_id = '...'`
4. Refresh halaman - progress seharusnya tetap tersimpan ✅

## Catatan Penting

### Field yang Tetap di TypeScript Interface tapi Tidak di Database

Field-field ini tetap ada di TypeScript types untuk backward compatibility dengan code yang sudah ada, tapi **tidak disimpan ke database**:

- `harakatMastered` → diset ke `[]` saat fetch
- `lastAttemptDate` → diset ke `""` saat fetch
- `quizAttempts` → diset ke `0` saat fetch

Jika di masa depan field-field ini diperlukan, harus ditambahkan ke schema database dulu via migration SQL.

## Hasil

✅ Progress Hijaiyah sekarang tersimpan dengan benar
✅ Progress Hadith sekarang tersimpan dengan benar
✅ Progress Story sekarang tersimpan dengan benar
✅ Progress Iqro sekarang tersimpan dengan benar
✅ User Progress sekarang tersimpan dengan benar
✅ Data tetap ada setelah refresh halaman
