-- =============================================
-- ALIFBABA COMPLETE SETUP (ONE-CLICK)
-- =============================================
-- Jalankan script ini di Supabase SQL Editor
-- Setelah itu, buat user di Authentication dashboard
-- =============================================

-- =============================================
-- STEP 1: DROP EVERYTHING
-- =============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS public.handle_new_user () CASCADE;

DROP TABLE IF EXISTS public.leaderboard CASCADE;

DROP TABLE IF EXISTS public.quest_progress CASCADE;

DROP TABLE IF EXISTS public.iqro_progress CASCADE;

DROP TABLE IF EXISTS public.hadith_progress CASCADE;

DROP TABLE IF EXISTS public.story_progress CASCADE;

DROP TABLE IF EXISTS public.hijaiyah_progress CASCADE;

DROP TABLE IF EXISTS public.user_progress CASCADE;

DROP TABLE IF EXISTS public.profiles CASCADE;

-- =============================================
-- STEP 2: CREATE TABLES
-- =============================================

-- 1. PROFILES
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'student' CHECK (
        role IN (
            'student',
            'teacher',
            'superadmin'
        )
    ),
    avatar_url TEXT,
    teacher_id UUID REFERENCES public.profiles (id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER_PROGRESS
CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    name TEXT,
    hearts INTEGER DEFAULT 5 CHECK (
        hearts >= 0
        AND hearts <= 5
    ),
    xp INTEGER DEFAULT 0 CHECK (xp >= 0),
    points INTEGER DEFAULT 0 CHECK (points >= 0),
    streak INTEGER DEFAULT 0 CHECK (streak >= 0),
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HIJAIYAH_PROGRESS
CREATE TABLE public.hijaiyah_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    letter_id TEXT NOT NULL,
    letter_name TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    score INTEGER DEFAULT 0 CHECK (
        score >= 0
        AND score <= 100
    ),
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, letter_id)
);

-- 4. STORY_PROGRESS
CREATE TABLE public.story_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    story_id TEXT NOT NULL,
    story_title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    video_watched BOOLEAN DEFAULT false,
    quiz_score INTEGER DEFAULT 0 CHECK (
        quiz_score >= 0
        AND quiz_score <= 100
    ),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, story_id)
);

-- 5. HADITH_PROGRESS
CREATE TABLE public.hadith_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    hadith_id TEXT NOT NULL,
    hadith_title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    audio_played BOOLEAN DEFAULT false,
    quiz_score INTEGER DEFAULT 0 CHECK (
        quiz_score >= 0
        AND quiz_score <= 100
    ),
    memorized BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, hadith_id)
);

-- 6. IQRO_PROGRESS
CREATE TABLE public.iqro_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    iqro_id INTEGER NOT NULL CHECK (
        iqro_id >= 1
        AND iqro_id <= 6
    ),
    current_page INTEGER DEFAULT 1,
    total_pages INTEGER DEFAULT 30,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, iqro_id)
);

-- 7. QUEST_PROGRESS
CREATE TABLE public.quest_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    quest_id TEXT NOT NULL,
    current_progress INTEGER DEFAULT 0,
    target INTEGER NOT NULL,
    completed BOOLEAN DEFAULT false,
    claimed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, quest_id)
);

-- 8. LEADERBOARD
CREATE TABLE public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    xp INTEGER DEFAULT 0,
    rank INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STEP 3: ENABLE RLS & CREATE POLICIES
-- =============================================

-- PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON public.profiles FOR
SELECT TO authenticated USING (true);

CREATE POLICY "profiles_insert" ON public.profiles FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = id);

CREATE POLICY "profiles_update" ON public.profiles FOR
UPDATE TO authenticated USING (auth.uid () = id);

CREATE POLICY "profiles_delete" ON public.profiles FOR DELETE TO authenticated USING (auth.uid () = id);

-- USER_PROGRESS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_progress_select" ON public.user_progress FOR
SELECT TO authenticated USING (true);

CREATE POLICY "user_progress_insert" ON public.user_progress FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "user_progress_update" ON public.user_progress FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "user_progress_delete" ON public.user_progress FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- HIJAIYAH_PROGRESS
ALTER TABLE public.hijaiyah_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hijaiyah_progress_select" ON public.hijaiyah_progress FOR
SELECT TO authenticated USING (true);

CREATE POLICY "hijaiyah_progress_insert" ON public.hijaiyah_progress FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "hijaiyah_progress_update" ON public.hijaiyah_progress FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "hijaiyah_progress_delete" ON public.hijaiyah_progress FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- STORY_PROGRESS
ALTER TABLE public.story_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "story_progress_select" ON public.story_progress FOR
SELECT TO authenticated USING (true);

CREATE POLICY "story_progress_insert" ON public.story_progress FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "story_progress_update" ON public.story_progress FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "story_progress_delete" ON public.story_progress FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- HADITH_PROGRESS
ALTER TABLE public.hadith_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hadith_progress_select" ON public.hadith_progress FOR
SELECT TO authenticated USING (true);

CREATE POLICY "hadith_progress_insert" ON public.hadith_progress FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "hadith_progress_update" ON public.hadith_progress FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "hadith_progress_delete" ON public.hadith_progress FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- IQRO_PROGRESS
ALTER TABLE public.iqro_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "iqro_progress_select" ON public.iqro_progress FOR
SELECT TO authenticated USING (true);

CREATE POLICY "iqro_progress_insert" ON public.iqro_progress FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "iqro_progress_update" ON public.iqro_progress FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "iqro_progress_delete" ON public.iqro_progress FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- QUEST_PROGRESS
ALTER TABLE public.quest_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quest_progress_select" ON public.quest_progress FOR
SELECT TO authenticated USING (true);

CREATE POLICY "quest_progress_insert" ON public.quest_progress FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "quest_progress_update" ON public.quest_progress FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "quest_progress_delete" ON public.quest_progress FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- LEADERBOARD
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leaderboard_select" ON public.leaderboard FOR
SELECT TO authenticated USING (true);

CREATE POLICY "leaderboard_insert" ON public.leaderboard FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "leaderboard_update" ON public.leaderboard FOR
UPDATE TO authenticated USING (auth.uid () = user_id);

CREATE POLICY "leaderboard_delete" ON public.leaderboard FOR DELETE TO authenticated USING (auth.uid () = user_id);

-- =============================================
-- STEP 4: CREATE AUTO-PROFILE TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_name TEXT;
    user_username TEXT;
BEGIN
    user_name := COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1));
    user_username := COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1));
    
    INSERT INTO public.profiles (id, username, name, email, role)
    VALUES (
        NEW.id,
        user_username,
        user_name,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'student')
    );
    
    INSERT INTO public.user_progress (user_id, name, hearts, xp, points, streak)
    VALUES (NEW.id, user_name, 5, 0, 0, 0);
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- STEP 5: CREATE INDEXES
-- =============================================
CREATE INDEX idx_profiles_role ON public.profiles (role);

CREATE INDEX idx_profiles_teacher_id ON public.profiles (teacher_id);

CREATE INDEX idx_user_progress_user_id ON public.user_progress (user_id);

CREATE INDEX idx_hijaiyah_progress_user_id ON public.hijaiyah_progress (user_id);

CREATE INDEX idx_story_progress_user_id ON public.story_progress (user_id);

CREATE INDEX idx_hadith_progress_user_id ON public.hadith_progress (user_id);

CREATE INDEX idx_iqro_progress_user_id ON public.iqro_progress (user_id);

CREATE INDEX idx_quest_progress_user_id ON public.quest_progress (user_id);

CREATE INDEX idx_leaderboard_xp ON public.leaderboard (xp DESC);

-- =============================================
-- DONE!
-- =============================================
-- Sekarang:
-- 1. Buka Authentication > Users > Add User
-- 2. Buat user dengan "Auto Confirm User" = ON:
--    - admin@gmail.com / admin123
--    - guru1@gmail.com / guru123
--    - siswa1@gmail.com / siswa123
--    - siswa2@gmail.com / siswa123
--    - siswa3@gmail.com / siswa123
-- 3. Jalankan script dummy-data-insert.sql
-- =============================================

SELECT 'Schema created successfully! Now create users in Auth dashboard.' as status;