-- =============================================
-- ALIFBABA - INSERT DUMMY DATA
-- =============================================
-- Jalankan SETELAH membuat users di Auth Dashboard
-- =============================================

-- Update roles for admin and teacher
UPDATE public.profiles
SET role = 'superadmin'
WHERE
    email = 'admin@gmail.com';

UPDATE public.profiles
SET role = 'teacher'
WHERE
    email = 'guru1@gmail.com';

-- Get teacher ID and assign students
DO $$
DECLARE
    guru_id UUID;
BEGIN
    SELECT id INTO guru_id FROM public.profiles WHERE email = 'guru1@gmail.com';
    
    IF guru_id IS NOT NULL THEN
        UPDATE public.profiles 
        SET teacher_id = guru_id 
        WHERE email IN ('siswa1@gmail.com', 'siswa2@gmail.com', 'siswa3@gmail.com');
    END IF;
END $$;

-- Update user_progress with sample XP
UPDATE public.user_progress
SET
    xp = 250,
    points = 150,
    streak = 7
WHERE
    user_id = (
        SELECT id
        FROM public.profiles
        WHERE
            email = 'siswa1@gmail.com'
    );

UPDATE public.user_progress
SET
    xp = 180,
    points = 120,
    streak = 5
WHERE
    user_id = (
        SELECT id
        FROM public.profiles
        WHERE
            email = 'siswa2@gmail.com'
    );

UPDATE public.user_progress
SET
    xp = 320,
    points = 200,
    streak = 10
WHERE
    user_id = (
        SELECT id
        FROM public.profiles
        WHERE
            email = 'siswa3@gmail.com'
    );

-- Insert hijaiyah progress
INSERT INTO
    public.hijaiyah_progress (
        user_id,
        letter_id,
        letter_name,
        completed,
        score,
        attempts
    )
SELECT p.id, 'alif', 'Alif', true, 100, 2
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hijaiyah_progress (
        user_id,
        letter_id,
        letter_name,
        completed,
        score,
        attempts
    )
SELECT p.id, 'ba', 'Ba', true, 90, 3
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hijaiyah_progress (
        user_id,
        letter_id,
        letter_name,
        completed,
        score,
        attempts
    )
SELECT p.id, 'alif', 'Alif', true, 95, 1
FROM public.profiles p
WHERE
    p.email = 'siswa2@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hijaiyah_progress (
        user_id,
        letter_id,
        letter_name,
        completed,
        score,
        attempts
    )
SELECT p.id, 'alif', 'Alif', true, 100, 1
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hijaiyah_progress (
        user_id,
        letter_id,
        letter_name,
        completed,
        score,
        attempts
    )
SELECT p.id, 'ba', 'Ba', true, 100, 1
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hijaiyah_progress (
        user_id,
        letter_id,
        letter_name,
        completed,
        score,
        attempts
    )
SELECT p.id, 'ta', 'Ta', true, 95, 2
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

-- Insert story progress
INSERT INTO
    public.story_progress (
        user_id,
        story_id,
        story_title,
        completed,
        video_watched,
        quiz_score
    )
SELECT p.id, 'nuh', 'Kisah Nabi Nuh', true, true, 80
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.story_progress (
        user_id,
        story_id,
        story_title,
        completed,
        video_watched,
        quiz_score
    )
SELECT p.id, 'nuh', 'Kisah Nabi Nuh', true, true, 85
FROM public.profiles p
WHERE
    p.email = 'siswa2@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.story_progress (
        user_id,
        story_id,
        story_title,
        completed,
        video_watched,
        quiz_score
    )
SELECT p.id, 'nuh', 'Kisah Nabi Nuh', true, true, 100
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.story_progress (
        user_id,
        story_id,
        story_title,
        completed,
        video_watched,
        quiz_score
    )
SELECT p.id, 'ibrahim', 'Kisah Nabi Ibrahim', true, true, 95
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

-- Insert hadith progress
INSERT INTO
    public.hadith_progress (
        user_id,
        hadith_id,
        hadith_title,
        completed,
        audio_played,
        quiz_score,
        memorized
    )
SELECT p.id, 'hadith-1', 'Hadits Niat', true, true, 85, true
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hadith_progress (
        user_id,
        hadith_id,
        hadith_title,
        completed,
        audio_played,
        quiz_score,
        memorized
    )
SELECT p.id, 'hadith-1', 'Hadits Niat', true, true, 90, true
FROM public.profiles p
WHERE
    p.email = 'siswa2@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hadith_progress (
        user_id,
        hadith_id,
        hadith_title,
        completed,
        audio_played,
        quiz_score,
        memorized
    )
SELECT p.id, 'hadith-1', 'Hadits Niat', true, true, 100, true
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.hadith_progress (
        user_id,
        hadith_id,
        hadith_title,
        completed,
        audio_played,
        quiz_score,
        memorized
    )
SELECT p.id, 'hadith-2', 'Hadits Kebersihan', true, true, 95, true
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

-- Insert iqro progress
INSERT INTO
    public.iqro_progress (
        user_id,
        iqro_id,
        current_page,
        total_pages,
        completed
    )
SELECT p.id, 1, 30, 30, true
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.iqro_progress (
        user_id,
        iqro_id,
        current_page,
        total_pages,
        completed
    )
SELECT p.id, 1, 30, 30, true
FROM public.profiles p
WHERE
    p.email = 'siswa2@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.iqro_progress (
        user_id,
        iqro_id,
        current_page,
        total_pages,
        completed
    )
SELECT p.id, 1, 30, 30, true
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.iqro_progress (
        user_id,
        iqro_id,
        current_page,
        total_pages,
        completed
    )
SELECT p.id, 2, 30, 30, true
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

-- Insert quest progress
INSERT INTO
    public.quest_progress (
        user_id,
        quest_id,
        current_progress,
        target,
        completed,
        claimed
    )
SELECT p.id, 'daily-xp', 25, 50, false, false
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.quest_progress (
        user_id,
        quest_id,
        current_progress,
        target,
        completed,
        claimed
    )
SELECT p.id, 'daily-xp', 30, 50, false, false
FROM public.profiles p
WHERE
    p.email = 'siswa2@gmail.com' ON CONFLICT DO NOTHING;

INSERT INTO
    public.quest_progress (
        user_id,
        quest_id,
        current_progress,
        target,
        completed,
        claimed
    )
SELECT p.id, 'daily-xp', 50, 50, true, true
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT DO NOTHING;

-- Insert leaderboard
INSERT INTO
    public.leaderboard (user_id, name, xp, rank)
SELECT p.id, 'Abdullah Rahman', 320, 1
FROM public.profiles p
WHERE
    p.email = 'siswa3@gmail.com' ON CONFLICT (user_id) DO
UPDATE
SET
    xp = 320,
    rank = 1;

INSERT INTO
    public.leaderboard (user_id, name, xp, rank)
SELECT p.id, 'Muhammad Ali', 250, 2
FROM public.profiles p
WHERE
    p.email = 'siswa1@gmail.com' ON CONFLICT (user_id) DO
UPDATE
SET
    xp = 250,
    rank = 2;

INSERT INTO
    public.leaderboard (user_id, name, xp, rank)
SELECT p.id, 'Fatimah Zahra', 180, 3
FROM public.profiles p
WHERE
    p.email = 'siswa2@gmail.com' ON CONFLICT (user_id) DO
UPDATE
SET
    xp = 180,
    rank = 3;

-- Show results
SELECT 'Dummy data inserted successfully!' as status;

-- Verify counts
SELECT 'profiles' as table_name, COUNT(*) as count
FROM public.profiles
UNION ALL
SELECT 'user_progress', COUNT(*)
FROM public.user_progress
UNION ALL
SELECT 'hijaiyah_progress', COUNT(*)
FROM public.hijaiyah_progress
UNION ALL
SELECT 'story_progress', COUNT(*)
FROM public.story_progress
UNION ALL
SELECT 'hadith_progress', COUNT(*)
FROM public.hadith_progress
UNION ALL
SELECT 'iqro_progress', COUNT(*)
FROM public.iqro_progress
UNION ALL
SELECT 'quest_progress', COUNT(*)
FROM public.quest_progress
UNION ALL
SELECT 'leaderboard', COUNT(*)
FROM public.leaderboard;