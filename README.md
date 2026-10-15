# Video Prompt Generator — Predator, Kontes/Show & Umum

Web app statis (HTML/CSS/JS, tanpa backend) untuk membuat prompt video AI
untuk berbagai niche, bisa dipakai banyak orang, dengan **3 kategori** —
setiap kategori punya master prompt-nya sendiri:

1. **Predator** — Channa / Predator Fish vs Feeder Prey (video feeding),
   berdasarkan Ultra Master Prompt dari Dwi (15 Okt 2026).
2. **Kontes / Show** — ikan hias bergerak elegan memamerkan sirip & warna;
   tanpa feeding, tanpa prey. Ditambahkan 15 Okt 2026.
   Pilihan 2 tingkat: **14 jenis ikan** (cupang, guppy, arowana, koi,
   mas koki, discus, angelfish, louhan, rainbowfish, channa show, oscar,
   molly & platy, tetra school, corydoras school) lalu **98 strain/jenis/
   warna** yang mengikuti jenisnya — mis. Cupang Halfmoon Platinum White
   (full white), Guppy Black Moscow, Guppy AFR (Albino Full Red),
   Guppy Albino Koi, Koi Albino Platinum (Ogon), Arowana Platinum
   Snow White, Discus Albino Platinum, dan banyak lagi.

Ada juga kolom **Request khusus (opsional)**: teks bebas (maks 300 karakter)
yang disisipkan ke hasil sebagai "Special request" — untuk permintaan di luar
pilihan yang tersedia, di kedua kategori dan semua mode output.

## Mode penulisan: Template vs AI Fresh
- **Template** (default): gratis, instan, hasil digabung dari pilihan user
  memakai kerangka master prompt. Pilihan sama = hasil sama.
- **AI Fresh**: hasil template dikirim sebagai *spesifikasi terkunci* ke AI,
  lalu AI menulis ulang dengan kata-kata fresh setiap Generate — semua fakta
  & lock (timing 0–10 dtk, 9:16, raw smartphone, negative lock, aturan prey
  besar / no-feeding) wajib dipertahankan, dan aplikasi memvalidasi hasil AI
  (segmen timing, negative lock, jumlah frame/ide). Kalau validasi gagal atau
  API error, aplikasi memberi peringatan dan menampilkan hasil template.

### API key (BYOK)
Mode AI memakai sistem **Bring Your Own Key**: setiap pengunjung memasukkan
API key-nya sendiri di panel AI pada situs. Key hanya tersimpan di
`localStorage` browser pengunjung dan dikirim langsung dari browser ke
provider — **tidak pernah masuk kode/repo**. Provider yang didukung:
OpenAI, OpenRouter, Groq, Google Gemini, **9Router**, dan endpoint Custom
yang kompatibel OpenAI (mis. DeepSeek). Biaya AI ditagih provider ke
pemilik key (untuk 9Router: ke akun/provider yang diatur di dashboard
9Router user sendiri). Jangan pernah commit API key ke repo ini.

### 9Router
9Router (github.com/decolua/9router) adalah router AI yang berjalan di
komputer user sendiri dan membuka endpoint kompatibel OpenAI di
`http://localhost:20128/v1` (mode dev: `http://localhost:20127/v1`).
Pilih provider **9Router** di panel AI, salin API key & nama model/combo
persis dari dashboard 9Router (menu Endpoint & Key), dan sesuaikan Base URL
kalau port-nya berbeda. Syarat: 9Router harus berjalan di komputer yang
sama dengan browser. Kalau aplikasi dibuka dari alamat HTTPS (GitHub
Pages), browser dapat memblokir panggilan ke `http://localhost` — jalan
keluarnya: buka aplikasi secara lokal di komputer yang sama, atau pakai
URL tunnel HTTPS (Cloudflare Tunnel/Tailscale) sebagai Base URL.

3. **Umum / General** — kerangka master prompt umum untuk ide video APA SAJA.
   User menulis idenya bebas (subjek, aksi inti, hasil puncak/bentuk akhir),
   lalu memilih lokasi, waktu, cuaca, gaya kamera, durasi (5/8/10/15 dtk),
   rasio (9:16, 16:9, 1:1, 4:5), penonton, momen puncak, suara, dan
   **alat perekam**: iPhone, HP Android flagship, HP Android biasa,
   kamera mirrorless/DSLR, action camera, atau handycam jadul — masing-masing
   dengan ciri realisme rekaman manualnya sendiri (micro-shake, autofocus,
   exposure, noise sensor). Struktur presisi: setup → kejadian mulai →
   berkembang → puncak yang harus terbaca jelas → akhir natural, plus kunci
   fisika nyata & negative prompt. Ada tombol preset contoh
   "Kembang Api Membentuk Phoenix" (lihat `examples/kembang-api-phoenix.txt`).
   Mode "10 Ide" di kategori ini = 10 variasi setup perekaman dari ide sama.

## Cara pakai
1. Buka `index.html` (atau hosting folder ini di GitHub Pages).
2. Pilih kategori di bagian atas: **Predator** atau **Kontes / Show**.
3. Untuk Predator: pilih ikan predator, prey, substrate, dekorasi, background,
   air, kamera, posisi awal, arah strike, detik strike, pencahayaan, suara,
   dan outcome. Untuk Kontes/Show: pilih ikan kontes, dasar & dekorasi tank
   show, backdrop, air, kamera, posisi awal, arah gerakan, gerakan elegan
   utama, detik puncak display, pencahayaan kontes, dan suara.
3. Klik salah satu:
   - **Buat Prompt Video** — 1 prompt detail siap copy (±1.800–2.600 karakter,
     1 paragraf) + Title + Caption.
   - **Buat 1 Ide Topik** — format Fish / Prey / Aquarium / Action / Viral hook.
   - **Buat 10 Ide Unik** — 10 kombinasi ikan+prey berbeda, tanpa pengulangan,
     tikus tidak pernah masuk batch (hanya jika dipilih manual).
   - **Buat Prompt Storyboard 6 Frame** — prompt gambar storyboard 0:00–0:10.
   - **Acak Semua** — acak semua pilihan lalu langsung buat prompt.
4. Klik **Copy** di tab hasil.

## Yang terkunci otomatis (dari master prompt)
10 detik, vertikal 9:16, gaya raw smartphone, 1 kamera tetap, struktur timing
0–2 / 2–4 / 4–6 / 6–8 / 8–10 detik, akuarium stabil, fisika & anatomi realistis,
aturan prey besar = potong sebagian (tidak ditelan utuh), audio alami saja
(tanpa musik/narasi), dan negative prompt lengkap di akhir setiap prompt.

## Deploy ke GitHub Pages
Buat repo baru, upload 3 file ini (`index.html`, `style.css`, `app.js`) ke root,
lalu Settings → Pages → Deploy from a branch → main / root.
