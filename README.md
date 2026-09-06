<div align="center">
  
  # MyTurn
  ### Antrean digital yang lebih terencana
  
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  
  **Submission for ITECHNO CUP 2026 - Web Development**
  
  **By [Gotei 13]**
  
</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Demo & Screenshot](#-demo--screenshot)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Tim Developer](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## 👥 Tim Developer
 __________________________________________________________________________________________________________________________
|           Nama                    |           Peran                             |           GitHub                       |
|___________________________________|_____________________________________________|________________________________________|
|                                   |                                             |                                        |
| Ghazwan Rayyana Sabri Indarto     | Project Lead & UI/UX Designer               | [GitHub](https://github.com/Rayyeenee) |
|___________________________________|_____________________________________________|________________________________________|
|                                   |                                             |                                        |
| Shafaraz Ilhan Dzulfikar          | Frontend Developer                          | [GitHub](https://github.com/Far-aaz)   |
|___________________________________|_____________________________________________|________________________________________|
|                                   |                                             |                                        |
| Alvino Aldorino                   | Backend Developer                           | [GitHub](https://github.com/zaxkai)    |
|___________________________________|_____________________________________________|________________________________________|


---

## 🎯 Tentang Proyek

### Latar Belakang

Warga yang hendak mengurus dokumen atau layanan administrasi di instansi publik kerap menghadapi dua masalah utama:

Data dan Fakta Pendukung
 
     _________________________________________________________________________________________________________________
    |           Temuan          |           Data	                       |           Sumber                         |
    |___________________________|__________________________________________|__________________________________________|
    |                           |                                          |                                          |
    |   Temuan Data Sumber      |   Waktu tunggu pasien online rata-rata   |   Jurnal Perawat Indonesia (2020),      |                                        |
    |   Pendaftaran online      |   50,3 menit, dibanding pasien offline   |   studi di RSUD Ratu Zalecha Martapura. |                                    |
    |   memangkas waktu tunggu  |   165,46 menit (p = 0,003, signifikan).  |                                          |                                          |
    |   secara signifikan.      |                                          |                                          |
    |___________________________|__________________________________________|__________________________________________|
    |                           |                                          |                                          |      
    |   Loket layanan publik    |   Rata-rata masa sibuk loket             |   Repository Telkom University,          |
    |   sering dalam kondisi    |   pendaftaran 58%, loket pembayaran      |   studi SAMSAT Bandung Timur.            |                                   |
    |   sibuk.                  |   74%, loket penyerahan 78% per hari.    |                                          |
    |___________________________|__________________________________________|__________________________________________|
    |                           |                                          |                                          |
    |   Ketidakjelasan pelayanan|   23.596 aduan ke Ombudsman RI sepanjang |   Ombudsman RI, Laporan Tahunan 2025.    |
    |   jadi keluhan terbesar   |   2025; keluhan terbanyak: tidak         |                                          |
    |   warga.                  |   memberikan pelayanan (40,68%) &        |                                          |
    |                           |   penundaan berlarut (21,25%).           |                                          |
    |___________________________|__________________________________________|__________________________________________|
    |                           |                                          |                                          |
    |   Adopsi digital          |   229,4 juta pengguna internet           |   APJII, Profil Internet Indonesia 2025. |                                       |
    |   masyarakat sudah tinggi.|   (penetrasi 80,66%), 84,31% di          |                                          |
    |                           |   antaranya via smartphone.              |                                          |
    |_________________________________________________________________________________________________________________|    

    Kesimpulan: Sistem penjadwalan digital terbukti efektif memangkas waktu tunggu, sementara kepadatan loket dan tingginya keluhan 
    ketidakjelasan pelayanan menunjukkan masalah ini nyata secara nasional — dan tingkat adopsi internet masyarakat sudah cukup untuk mendukung solusi berbasis web.
### Kesimpulan Masalah

Sistem penjadwalan digital membantu mengurangi waktu tunggu, memberikan informasi kepadatan yang lebih jelas, dan mendukung masyarakat yang sudah terbiasa menggunakan layanan digital.

### Solusi yang Ditawarkan

- **Status antrean live**: Menampilkan kepadatan dan estimasi waktu tunggu dari backend.
- **Check-in virtual**: Pengguna dapat mengambil nomor antrean sebelum datang ke lokasi.
- **Booking kunjungan**: Pengguna dapat mengirim permintaan jadwal kunjungan melalui aplikasi.
- **Peta instansi**: Membantu pengguna menemukan lokasi layanan yang tersedia.

### Tujuan Proyek

- 🎯 **Tujuan Utama**: Mengurangi waktu tunggu dan membuat proses kunjungan lebih terencana.
- 📊 **Target Pengguna**: Masyarakat yang membutuhkan layanan instansi publik secara cepat dan terukur.
- 💡 **Value Proposition**: Satu aplikasi untuk memantau kepadatan, menemukan instansi, dan mengambil antrean secara virtual.

---

## ✨ Fitur Unggulan

### Fitur Utama
 ____________________________________________________________________________________________________
|         Fitur             |         Deskripsi              |         Keunggulan                    |
|___________________________ |_______________________________|_______________________________________|
|                           |                                |                                       |
|                           | Pengguna dapat mengambil       | Menghemat waktu tunggu dan            |
|                           | nomor antrean secara online    | mengurangi kerumunan di area          |                              
| Check-In Antrean Virtual  | tanpaharus mengantre fisik di  | tertentu                              |
|                           | lokasi                         |                                       |
|___________________________|________________________________|_______________________________________|         
|                           |                                |                                       |
|                           | Menampilkan tingkat kepadatan  | Membantu pengguna memilih waktu       | 
|                           | pengunjung secara real-time    | kunjungan yang lebih nyaman dan aman  |
| Status Live Kepadatan     | berdasarkan data terkini       |                                       |
|                           |                                |                                       |
|___________________________|________________________________|_______________________________________|
|                           |                                |                                       |
|                           | Peta digital yang menampilkan  | Memudahkan navigasi pengguna tanpa    | 
|                           | lokasi, rute, dan titik-titik  | perlu bertanya atau tersesat          |
| Peta Interaktif           | penting secara interaktif      |                                       |
|                           |                                |                                       |
|___________________________|________________________________|_______________________________________|
|                           |                                | Membantu pengguna memilih waktu      |
|                           | Sistem memprediksi jam-jam     | Membantu pengguna merencanakan        |
|                           | dengan kepadatan rendah        | kunjungan agar lebih efisien          |
| Prediksi Jam Terbaik      | berdasarkan data historis      | dan minim antrean                     |
|                           |                                |                                       |
|___________________________|________________________________|_______________________________________|

### Fitur Tambahan

- **Pencarian instansi** - Mencari instansi berdasarkan nama atau tipe layanan.
- **Lokasi pengguna** - Memusatkan peta berdasarkan lokasi perangkat pengguna.
- **Autentikasi pengguna** - Registrasi dan login melalui API Laravel.
- **Notifikasi antrean** - Menyediakan pengaturan pengingat pada dashboard antrean.

---

## 📸 Demo & Screenshot

### Live Demo

🔗 **[Kunjungi Website](https://[URL_DEMO])**

### Screenshot Aplikasi

<div align="center">
  <img src="Screenshot%20Aplikasi/Hompage.jpe" alt="Homepage Myturn" width="800"/>
  <p><em>Homepage - Tampilan utama aplikasi</em></p>
  
  <img src="Screenshot%20Aplikasi/Dashboard.jpeg" alt="Dashboard Myturn" width="800"/>
  <p><em>Dashboard - Panel kontrol pengguna</em></p>
  
  <img src="[URL_SCREENSHOT_3]" alt="Feature" width="800"/>
  <p><em>[Nama Fitur] - [Deskripsi screenshot]</em></p>
</div>

### Video Demo

📹 **[Link Video Demo](https://[URL_VIDEO])** _(opsional)_

---

## 🛠️ Teknologi

### Tech Stack

#### Frontend
```
Framework    : React
UI Library   : Tidak menggunakan
State Mgmt   : Tidak ada library eksternal. Cuma useState/useEffect/useMemo bawaan React, semua state "global" (user login, ticket antrean, history) di-lift ke App.jsx lalu dioper lewat props ke komponen anak
Validation   : Tidak ada library. Validasi form (misal cek email/password kosong) ditulis manual pakai if-else biasa di dalam handler onSubmit
               Routing	Tidak pakai react-router. Routing manual pakai window.history.pushState + parsing window.location.pathname sendiri (lihat fungsi parsePage() di App.jsx)

#### Backend
```
Runtime      : PHP 8.3+
Framework    : Laravel 13 REST API
Database     : MySQL melalui Laragon
ORM          : Eloquent ORM
Auth         : Laravel Sanctum
API Testing  : Thunder Client
```

#### Kontribusi Frontend

- Membangun antarmuka aplikasi menggunakan React dan Vite.
- Membuat halaman Explore, Institution, Queue, Profile, Support, History, Sign In, dan Sign Up.
- Menghubungkan frontend dengan API Laravel untuk mengambil data institusi live.
- Menampilkan marker peta berdasarkan latitude dan longitude dari backend.
- Mengirim request check-in dan menampilkan nomor antrean dari response API.
- Membuat navigasi halaman menggunakan window.history.pushState.
- Mengimplementasikan pencarian instansi, geolocation, dan dashboard antrean.

#### Kontribusi Backend

- Merancang endpoint REST API untuk autentikasi, status antrean, check-in, dan booking.
- Menghubungkan data `institutions` dengan `queue_status` untuk menyediakan status kepadatan secara live.
- Mengimplementasikan proses check-in antrean ke tabel `antrean` dan memperbarui jumlah antrean pada `queue_status`.
- Menyediakan autentikasi berbasis Laravel Sanctum untuk endpoint privat.
- Menyesuaikan response API agar dapat dikonsumsi frontend React dan diuji melalui Thunder Client.

#### DevOps & Tools
```
Deployment   : Render (Backend) & Vercel (Frontend)
CI/CD        : GitHub Actions
Testing      : PHPUnit dan Thunder Client
Monitoring   : Laravel log
```

### Alasan Pemilihan Teknologi Backend

| Teknologi | Alasan Pemilihan |
|-----------|------------------|
| **Laravel** | Menyediakan struktur MVC, routing API, validasi request, dan middleware yang rapi untuk pengembangan backend. |
| **Eloquent ORM** | Memudahkan akses dan relasi data institusi, status antrean, pengguna, booking, dan antrean virtual. |
| **Sanctum** | Menyediakan autentikasi token yang ringan untuk komunikasi frontend React dengan API Laravel. |

### Dependencies Utama

```text
laravel/framework   : Framework utama REST API
laravel/sanctum     : Autentikasi token API
laravel/tinker      : Pengujian dan inspeksi data saat development
mysql               : Database relasional aplikasi
```

---

## 🏗️ Arsitektur Sistem

### System Architecture

```
React Frontend
  |
  | HTTP JSON request
  v
Laravel REST API
  |
  | Eloquent ORM
  v
MySQL Database
```

Alur utama backend:

1. Frontend meminta `GET /api/institutions/live`.
2. Laravel mengambil data instansi dan status antrean melalui Eloquent.
3. Frontend mengirim `POST /api/tickets/checkin` dengan `instansi_id` dan `user_id`.
4. Laravel membuat record pada tabel `antrean` dan menambah `sisa_antrean` pada `queue_status`.
5. Laravel mengembalikan nomor antrean dan status terbaru dalam format JSON.

### Database Schema

```
erDiagram
    users ||--o{ antrean : "mengambil"
    users ||--o{ bookings : "memesan"
    users ||--o{ reviews : "memberikan"
    users ||--o{ point_logs : "memiliki"
    institutions ||--o{ queue_status : "mempunyai"
    institutions ||--o{ antrean : "menerima"
    institutions ||--o{ bookings : "menyediakan"
    institutions ||--o{ reviews : "mendapatkan"

    users {
        BIGINT id PK
        VARCHAR nama
        VARCHAR email
        VARCHAR password
        INT poin
    }
    institutions {
        BIGINT id PK
        VARCHAR nama_instansi
        VARCHAR tipe
        DECIMAL latitude
        DECIMAL longitude
        INT kapasitas_maksimal
    }
    queue_status {
        BIGINT id PK
        BIGINT institution_id FK
        INT sisa_antrean
        ENUM status_kepadatan
        INT estimasi_waktu_tunggu
    }
    antrean {
        BIGINT id PK
        BIGINT user_id FK
        BIGINT instansi_id FK
        VARCHAR nomor_antrean
        ENUM status
        TIMESTAMP waktu_checkin
    }
    bookings {
        BIGINT id PK
        BIGINT user_id FK
        BIGINT institution_id FK
        DATE tanggal
        ENUM sesi
        ENUM status
    }
    reviews {
        BIGINT id PK
        BIGINT user_id FK
        BIGINT institution_id FK
        TINYINT rating
        TEXT komentar
    }
    point_logs {
        BIGINT id PK
        BIGINT user_id FK
        INT jumlah
        VARCHAR alasan
    }
```

### Folder Structure

```
project-root/
├── app/                # Controllers, models, dan providers Laravel
├── database/           # Migrations, factories, dan seeders
├── routes/api.php      # Endpoint REST API
├── resources/          # Asset dan view Laravel
├── public/             # Entry point aplikasi
├── App.jsx             # Entry point frontend React
├── QueuePage.jsx       # Halaman dashboard antrean
├── package.json        # Dependency frontend
├── composer.json       # Dependency backend
└── artisan             # CLI Laravel
```

---

## ⚙️ Instalasi & Setup

### Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v18.x dan npm (Untuk menjalankan Frontend))
- **npm** / **yarn** / **pnpm**
- **MySQL 8+**
- **Git**

### Langkah Instalasi

#### 1️⃣ Install Dependencies

```bash
# Instalasi dependensi PHP
composer install

# Menjalankan migrasi database
php artisan migrate

# Menyalakan server lokal
php artisan serve
```

#### 2️⃣ Setup Environment Variables

Buat file `.env` di root directory:

```env
# Database Laravel
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myturn_db
DB_USERNAME=root
DB_PASSWORD=
```

Setelah mengisi `.env`, pastikan database `myturn_db` sudah dibuat pada MySQL.

#### 3️⃣ Setup Database

```bash
# Jalankan migrasi Laravel
php artisan migrate
```

#### 4️⃣ Install Frontend Dependencies dan Run Development Server

```bash
npm install

# Jalankan development server
npm run dev
```

Aplikasi frontend berjalan pada URL yang ditampilkan oleh Vite, sedangkan API Laravel berjalan di `http://127.0.0.1:8000`.

---

## 🚀 Penggunaan

### Menjalankan Aplikasi

```bash
# Terminal 1: Backend Laravel
php artisan serve

# Terminal 2: Frontend Vite
npm run dev
```

### User Guide

#### Untuk Pengguna Umum

1. **Registrasi/Login**: Buat akun atau masuk menggunakan akun yang terdaftar pada API Laravel.
2. **Melihat instansi**: Cari instansi atau pilih marker pada peta untuk melihat status antrean.
3. **Mengambil antrean**: Buka detail instansi, lalu pilih tombol ambil antrean.

#### Untuk Admin

Fitur admin belum termasuk dalam versi aplikasi saat ini.

---

## 📚 API Documentation

### Base URL

```
Local: http://127.0.0.1:8000/api
Production: https://[URL_RENDER_KAMU]/api
```

### Endpoints

#### Authentication

```http
POST /api/register               # Registrasi warga baru
POST /api/login                  # Login warga
GET  /api/institutions/live      # Get data peta & kepadatan live
GET  /api/queue-status/{id}      # Get detail status antrean instansi
```

#### Queue, Profile, and Booking

```http
GET  /api/me                      # Mengambil profil pengguna, membutuhkan Bearer token
POST /api/tickets/checkin         # Mengambil antrean virtual
GET  /api/bookings                # Melihat booking pengguna
POST /api/bookings                # Membuat booking baru
GET  /api/bookings/{id}           # Melihat detail booking
POST /api/bookings/{id}/cancel    # Membatalkan booking
POST /api/logout                  # Logout pengguna
```

### Example Request: Check-In Antrean

```http
POST /api/tickets/checkin
Accept: application/json
Content-Type: application/json
```

```json
{
  "instansi_id": 1,
  "user_id": 1
}
```

Response sukses:

```json
{
  "pesan": "Check-in berhasil!",
  "data": {
    "id": 1,
    "user_id": 1,
    "instansi_id": 1,
    "nomor_antrean": "A-002",
    "status": "menunggu"
  }
}
```

### Example Request: Login

```javascript
const response = await fetch('http://127.0.0.1:8000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
```

---

## 🧪 Testing

### Running Tests

```bash
# Backend feature tests
php artisan test

# Format pemeriksaan kode PHP
vendor/bin/pint --test
```

Pengujian endpoint dapat dilakukan menggunakan Thunder Client dengan base URL `http://127.0.0.1:8000/api`.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

---

<div align="center">

  **Made with ❤️ by Gotei13 for ITECHNO CUP 2026**

  
</div>


