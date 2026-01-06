# AlifBaBa - Supabase Setup Guide

Panduan lengkap untuk mengatur Supabase sebagai database dan authentication untuk AlifBaBa.

## 📋 Daftar Isi

1. [Membuat Project Supabase](#1-membuat-project-supabase)
2. [Mengatur Database Schema](#2-mengatur-database-schema)
3. [Konfigurasi Authentication](#3-konfigurasi-authentication)
4. [Setup Environment Variables](#4-setup-environment-variables)
5. [Testing Koneksi](#5-testing-koneksi)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Membuat Project Supabase

### Step 1: Daftar/Login ke Supabase

1. Buka [https://supabase.com](https://supabase.com)
2. Klik "Start your project" atau "Sign In"
3. Login dengan GitHub, GitLab, atau email

### Step 2: Buat Project Baru

1. Klik tombol "New project"
2. Pilih organization (atau buat baru jika belum ada)
3. Isi detail project:
   - **Name**: `alifbaba` (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih yang terdekat (Singapore untuk Indonesia)
4. Klik "Create new project"
5. Tunggu 2-3 menit hingga project siap

### Step 3: Catat Credentials

Setelah project siap:

1. Buka **Settings** (ikon gear) → **API**
2. Catat/copy nilai berikut:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6...`

---

## 2. Mengatur Database Schema

### Step 1: Buka SQL Editor

1. Di sidebar Supabase, klik **SQL Editor**
2. Klik **+ New query**

### Step 2: Jalankan Schema SQL

1. Buka file `supabase/schema.sql` dari project ini
2. Copy seluruh isi file
3. Paste ke SQL Editor di Supabase
4. Klik **Run** (atau Ctrl/Cmd + Enter)
5. Pastikan tidak ada error (akan muncul "Success")

### Verifikasi Tabel

Setelah menjalankan SQL:

1. Buka **Table Editor** di sidebar
2. Pastikan tabel-tabel berikut sudah ada:
   - `profiles`
   - `user_progress`
   - `hijaiyah_progress`
   - `story_progress`
   - `hadith_progress`
   - `iqro_progress`
   - `quest_progress`
   - `leaderboard`

---

## 3. Konfigurasi Authentication

### Step 1: Enable Email Provider

1. Buka **Authentication** → **Providers**
2. Cari **Email** dan pastikan sudah enabled
3. Klik pada Email untuk konfigurasi:
   - **Enable Email Signup**: ON
   - **Double confirm email changes**: OFF (opsional)
   - **Enable email confirmations**:
     - Untuk **Development**: OFF (lebih mudah testing)
     - Untuk **Production**: ON (lebih aman)

### Step 2: URL Configuration

1. Buka **Authentication** → **URL Configuration**
2. Set nilai berikut:
   - **Site URL**: `http://localhost:3000` (development)
   - **Redirect URLs**:
     ```
     http://localhost:3000/**
     http://localhost:3000/login
     http://localhost:3000/learn
     http://localhost:3000/dashboard
     ```

### Step 3: (Opsional) Untuk Production

Jika deploy ke production, tambahkan URL production:

- **Site URL**: `https://yourdomain.com`
- **Redirect URLs**: `https://yourdomain.com/**`

---

## 4. Setup Environment Variables

### Step 1: Buat File .env.local

Di root folder project (`d:\Tugas\Ifter\Alifbaba`):

1. Copy file `.env.example`:

   ```powershell
   Copy-Item .env.example .env.local
   ```

2. Atau buat manual file `.env.local` dengan isi:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Step 2: Isi Nilai dari Supabase

1. Buka Supabase Dashboard → **Settings** → **API**
2. Copy **Project URL** → paste ke `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon public key** → paste ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Contoh .env.local Lengkap

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTYwMDAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ⚠️ PENTING

- **JANGAN** commit file `.env.local` ke git!
- File `.gitignore` sudah mengabaikan `.env.local` secara default
- Untuk production, set environment variables di hosting platform (Vercel, Netlify, dll)

---

## 5. Testing Koneksi

### Step 1: Jalankan Development Server

```powershell
npm run dev
```

### Step 2: Test Register

1. Buka `http://localhost:3000/register`
2. Isi form:
   - Nama: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: Siswa atau Pengajar
3. Klik "Daftar"
4. Jika berhasil, akan redirect ke `/learn` (siswa) atau `/dashboard` (pengajar)

### Step 3: Verifikasi di Supabase

1. Buka Supabase Dashboard → **Authentication** → **Users**
2. Pastikan user baru muncul di list
3. Buka **Table Editor** → **profiles**
4. Pastikan ada row baru dengan data user

### Step 4: Test Login

1. Logout dari aplikasi
2. Buka `http://localhost:3000/login`
3. Login dengan credential yang tadi dibuat

---

## 6. Troubleshooting

### Error: "Invalid API key"

- Pastikan `NEXT_PUBLIC_SUPABASE_ANON_KEY` benar
- Pastikan tidak ada spasi atau karakter tambahan
- Restart development server setelah mengubah .env.local

### Error: "relation does not exist"

- Pastikan sudah menjalankan SQL schema
- Cek di Table Editor apakah tabel sudah ada
- Jalankan ulang SQL schema jika perlu

### Error: "User not found" saat login

- Pastikan sudah register terlebih dahulu
- Jika email confirmation enabled, cek inbox email
- Disable email confirmation untuk development

### Data tidak tersimpan

- Cek browser console untuk error message
- Pastikan RLS policies sudah benar
- Cek apakah user sudah authenticated

### CORS Error

- Pastikan Site URL dan Redirect URLs sudah dikonfigurasi
- Tambahkan URL localhost ke Redirect URLs

### Reset Database (Development Only)

Jika ingin reset database:

1. Buka SQL Editor
2. Jalankan:
   ```sql
   -- HATI-HATI: Ini akan menghapus semua data!
   DROP TABLE IF EXISTS public.leaderboard CASCADE;
   DROP TABLE IF EXISTS public.quest_progress CASCADE;
   DROP TABLE IF EXISTS public.iqro_progress CASCADE;
   DROP TABLE IF EXISTS public.hadith_progress CASCADE;
   DROP TABLE IF EXISTS public.story_progress CASCADE;
   DROP TABLE IF EXISTS public.hijaiyah_progress CASCADE;
   DROP TABLE IF EXISTS public.user_progress CASCADE;
   DROP TABLE IF EXISTS public.profiles CASCADE;
   ```
3. Jalankan kembali `supabase/schema.sql`

---

## 📞 Bantuan

Jika masih ada masalah:

1. Cek [Supabase Documentation](https://supabase.com/docs)
2. Buka issue di repository project
3. Hubungi developer team

---

## Checklist Setup

- [ ] Project Supabase sudah dibuat
- [ ] SQL schema sudah dijalankan
- [ ] Email provider sudah di-enable
- [ ] URL Configuration sudah diset
- [ ] File .env.local sudah dibuat
- [ ] Credentials sudah diisi dengan benar
- [ ] Test register berhasil
- [ ] Test login berhasil
- [ ] Data tersimpan di database

Selamat! Supabase sudah siap digunakan 🎉
