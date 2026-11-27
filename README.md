# AgroSmart – Smart Integrated Agriculture Platform

Aplikasi web pertanian digital terpadu untuk manajemen lahan, tanaman, jadwal penyiraman/pemupukan/perawatan/panen, kalender aktivitas, pemantauan pertumbuhan, AgroAI, AI Plant Analyzer, informasi cuaca, hasil panen, keuangan usaha tani, AgroMarket, edukasi, laporan cetak, admin, serta pengaturan profil & integrasi backend.

## Menjalankan di VS Code
1. Ekstrak folder `agrosmart-platform` ke direktori kerja Anda.
2. Buka folder `agrosmart-platform` di **Visual Studio Code**.
3. Jalankan menggunakan ekstensi **Live Server** (klik kanan `index.html` → *Open with Live Server*) atau jalankan server statis lokal:
   ```bash
   npx serve .
   ```
   atau
   ```bash
   python -m http.server 8080
   ```

## Keamanan & Konfigurasi
- Seluruh render data dinamis menggunakan `textContent` dan pembuatan elemen DOM aman (`document.createElement`) tanpa `innerHTML` untuk input pengguna.
- Tidak ada API key atau kredensial rahasia yang disimpan di kode sumber frontend.
- Header keamanan HTTP & isolasi lintas-origin telah dikonfigurasi di `vercel.json`, serta dilengkapi meta CSP cadangan di `index.html`.
