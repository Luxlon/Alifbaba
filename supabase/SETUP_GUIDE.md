# 📘 Panduan Setup Database AlifBaBa (Simple)

## ⚡ Quick Setup (3 Langkah)

### Step 1: Jalankan Schema SQL

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Copy-paste isi file `supabase/1-schema.sql`
3. Klik **Run**

### Step 2: Buat Users di Dashboard

1. Buka **Authentication** → **Users** → **Add User**
2. Centang ✅ **Auto Confirm User**
3. Buat 5 user ini:

| Email            | Password |
| ---------------- | -------- |
| admin@gmail.com  | admin123 |
| guru1@gmail.com  | guru123  |
| siswa1@gmail.com | siswa123 |
| siswa2@gmail.com | siswa123 |
| siswa3@gmail.com | siswa123 |

### Step 3: Insert Dummy Data

1. Buka **SQL Editor** lagi
2. Copy-paste isi file `supabase/2-dummy-data.sql`
3. Klik **Run**

### ✅ Done! Test Login

- Buka http://localhost:3000/login
- Login dengan: `admin@gmail.com` / `admin123`

---

## ⚠️ Troubleshooting

### "Invalid login credentials"

- User tidak ada atau password salah
- Pastikan "Auto Confirm User" dicentang saat buat user

### "Email not confirmed"

1. Buka **Authentication** → **Settings**
2. Scroll ke **Email Auth**
3. Matikan **"Confirm email"** → OFF
4. Klik **Save**

### "Profile not found" atau "Database error"

- Jalankan ulang `2-dummy-data.sql`
- Pastikan trigger sudah aktif (cek di Database → Functions)

### Login berhasil tapi redirect error

- Bersihkan cache browser
- Coba Incognito/Private mode

---

## 📁 File SQL

| File               | Fungsi                           |
| ------------------ | -------------------------------- |
| `1-schema.sql`     | Buat semua tabel + RLS + trigger |
| `2-dummy-data.sql` | Insert sample data + set roles   |

---

## 🎯 Role & Redirect

| Role       | Email                | Dashboard  |
| ---------- | -------------------- | ---------- |
| superadmin | admin@gmail.com      | /admin     |
| teacher    | guru1@gmail.com      | /dashboard |
| student    | siswa1,2,3@gmail.com | /learn     |
