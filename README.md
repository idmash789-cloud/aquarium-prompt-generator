# Aquarium Prompt Generator — Predator & Kontes/Show

Web app statis (HTML/CSS/JS, tanpa backend) untuk membuat prompt video AI
akuarium, dengan **2 kategori**:

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
