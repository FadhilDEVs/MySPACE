# PRD - MySPACE
Versi: 1.0 | Tanggal: 05/11/2026 | Status: Draf

## 1. Informasi Umum
- Nama webapp: `MySPACE` [USER]
- Tujuan: Mengelola keuangan, catatan, dan tugas harian pribadi secara mandiri, terstruktur, dan aman dengan penyimpanan permanen di Google Spreadsheet [USER]
- Mode deploy: Mode B (GitHub Pages + Web App Apps Script) [ASUMSI-TEKNIS] (Repository telah terhubung dengan GitHub MySPACE untuk deployment static frontend via GitHub Pages yang terhubung ke Apps Script exec Web App via fetch JSON + CORS)
- Folder keluaran: root folder proyek (`d:\02 - Hasil AI\01 - Website dan Aplikasi\MySPACE\MySPACE`) [USER]
- Link exec Apps Script: `https://script.google.com/macros/s/AKfycbxFN4AheX7p6tBXJDREbyzWGhivTcIVyFOwAMRxza67afOD19x8-imGJUOa2x3PU77AdA/exec` [USER]

## 2. Teks Literal (wajib dipakai persis)
| Lokasi | Teks persis |
|---|---|
| Nama webapp | `MySPACE` |
| Slogan / Subtitle Auth | `Catat keuangan dan simpan catatanmu dengan rapi.` |
| Subtitle Auth Desktop | `Kelola Keuangan dan Catatanmu dengan Lebih Rapi` |
| Deskripsi Auth Desktop | `Catat pemasukan, pengeluaran, dan berbagai catatan penting dalam satu tempat, kapan saja, di MySPACE.` |
| Judul Card Auth | `Masuk ke MySPACE` |
| Sub-card Auth | `Kelola keuangan dan catatanmu sekarang.` |
| Tombol Auth Utama | `Login` |
| Tombol Auth Daftar | `Daftar` |
| Pemisah Auth | `atau` |
| Teks Tanya Akun | `Belum punya akun?` |
| Label Input Username | `Username` |
| Label Input Password | `Password` |
| Menu Navigasi 1 | `Dashboard` |
| Menu Navigasi 2 | `Keuangan` |
| Menu Navigasi 3 | `Transaksi` |
| Menu Navigasi 4 | `Catatan` |
| Menu Navigasi 5 | `Statistik` |
| Menu Navigasi 6 | `Tugas` |
| Menu Navigasi 7 | `Profil` |
| Menu Navigasi 8 | `Pengaturan` |
| Judul Header Dashboard | `Dashboard` |
| Subtitle Header Dashboard | `Pantau keuangan, catat transaksi, kelola catatan, dan capai target finansialmu.` |
| Card Metrik 1 | `Total Saldo` |
| Card Metrik 2 | `Pemasukan` |
| Card Metrik 3 | `Pengeluaran` |
| Card Metrik 4 | `Target Bulanan` |
| Card Catat Transaksi | `Catat Transaksi` |
| Card Catat Pengeluaran | `Catat Pengeluaran` |
| Subtitle Catat Transaksi | `Buat catatan transaksi keuanganmu.` |
| Tab Transaksi Pengeluaran | `Pengeluaran` |
| Tab Transaksi Pemasukan | `Pemasukan` |
| Label Nominal | `Nominal` |
| Label Kategori | `Kategori` |
| Label Tanggal | `Tanggal` |
| Label Keterangan | `Keterangan (Opsional)` |
| Tombol Simpan Transaksi | `Simpan Transaksi` |
| Tombol Simpan Pengeluaran | `Simpan Pengeluaran` |
| Tombol Simpan Pemasukan | `Simpan Pemasukan` |
| Chips Nominal Cepat | `10 rb`, `25 rb`, `50 rb`, `100 rb`, `200 rb`, `500 rb` |
| Kategori Bawaan | `Makan`, `Transport`, `Belanja`, `Kopi`, `Kuliah`, `Kebutuhan`, `Lainnya` |
| Judul Card Catatan | `Catatan` |
| Subtitle Card Catatan | `Tulis ide, rencana, atau pengingat keuanganmu.` |
| Tombol Catatan Baru | `Catatan Baru` |
| Judul Card Statistik Pengeluaran | `Statistik Pengeluaran` |
| Judul Card Komposisi Pengeluaran | `Komposisi Pengeluaran` |
| Judul Card Transaksi Terbaru | `Transaksi Terbaru` |
| Link Lihat Semua | `Lihat Semua` |
| Judul Halaman Riwayat | `Riwayat Transaksi` |
| Subtitle Halaman Riwayat | `Kelola dan lihat semua riwayat pemasukan & pengeluaran kamu.` |
| Tombol Tambah Transaksi | `Tambah Transaksi` |
| Tombol Download Riwayat | `Download` |
| Card Periode | `Pilih Periode` |
| Label Dropdown Bulan | `Bulan` |
| Label Dropdown Tahun | `Tahun` |
| Tombol Periode Bulan Ini | `Bulan Ini` |
| Tab Filter Riwayat Semua | `Semua Transaksi` |
| Tab Filter Riwayat Pemasukan | `Pemasukan` |
| Tab Filter Riwayat Pengeluaran | `Pengeluaran` |
| Placeholder Cari Transaksi | `Cari transaksi...` |
| Placeholder Global Search | `Cari transaksi, catatan, atau tugas...` |
| Label Kolom Riwayat | `Tanggal`, `Kategori`, `Deskripsi`, `Tipe`, `Nominal` |
| Menu Bottom Mobile | `Kantong`, `Grafik`, `Catatan`, `Tugas` |
| Label Banner Sidebar Desktop | `Kelola Keuangan Lebih Cerdas` |
| Deskripsi Banner Sidebar | `Catat pemasukan, pengeluaran, dan rencanakan target keuanganmu di MySPACE.` |
| Label Banner Pro Desktop | `MySPACE Pro` |
| Subtitle Banner Pro | `Fitur lanjutan & sinkronisasi di semua perangkat.` |
| Tombol Banner Pro | `Upgrade` |
| Menu Pengaturan Akun | `Pengaturan Akun` |
| Aksi Akun | `Ubah Username`, `Ubah Password`, `Logout` |

Label fungsional standar: Simpan, Batal, Hapus, Cari, Tambah, Edit, Tutup. [USER/SKILL]

## 3. Pengguna & Hak Akses
- Model Autentikasi: Multi-user mandiri dengan isolasi data berbasis `username` unik [USER]
- Pendaftaran akun: Username dan Password (disimpan terenkripsi/hash di sheet database) [USER]
- Login akun: Validasi Username dan Password [USER]
- Hak Akses: Setiap pengguna hanya dapat membaca, menambah, mengubah, dan menghapus datanya sendiri (`username` bertindak sebagai owner tag pada setiap baris data transaksi, catatan, tugas, dan anggaran) [USER]

## 4. Menu & Fitur

### Menu 1: Login & Daftar (Autentikasi)
- Tujuan: Mengautentikasi pengguna dan mengisolasi data masing-masing pengguna [USER]
- Isi halaman:
  - Form login dengan input Username, Password, toggle visibility password, tombol `Login`, tombol beralih ke form pendaftaran `Daftar` [USER, GAMBAR]
  - Form pendaftaran akun baru dengan input Username, Password, Konfirmasi Password, tombol `Daftar`, tombol kembali ke `Login` [USER]
  - Tampilan visual glassmorphism emerald dengan ilustrasi visual 3D dompet, koin, dan grafik sesuai referensi [GAMBAR]
- Aksi: Login, Daftar, Logout [USER]
- Validasi:
  - Username minimal 3 karakter alfanumerik tanpa spasi [ASUMSI-TEKNIS]
  - Password minimal 6 karakter [ASUMSI-TEKNIS]
  - Pendaftaran menolak jika username sudah terdaftar di database [USER]
  - Login menolak jika kombinasi username dan password salah [USER]
- Hak akses: Publik (sebelum login) [USER]

### Menu 2: Dashboard
- Tujuan: Memberikan ringkasan komprehensif saldo pribadi, total pemasukan, pengeluaran, target bulanan/sisa anggaran, catatan sticky notes, grafik statistik pengeluaran, dan transaksi terbaru [USER, GAMBAR]
- Isi halaman:
  - Header: Tanggal & periode aktif (mis. `Mei 2026`), tombol notifikasi, profil avatar pengguna [GAMBAR]
  - 4 Kartu Metrik Utama:
    1. `Total Saldo`: Jumlah kumulatif (Pemasukan - Pengeluaran), persentase perbandingan dengan bulan lalu, visual grafik mini (sparkline) [USER, GAMBAR]
    2. `Pemasukan`: Total pemasukan bulan berjalan, persentase perubahan vs bulan lalu [USER, GAMBAR]
    3. `Pengeluaran`: Total pengeluaran bulan berjalan, persentase perubahan vs bulan lalu [USER, GAMBAR]
    4. `Target Bulanan`: Batas anggaran bulanan, persentase pemakaian (`radial progress`), dan nominal sisa anggaran [USER, GAMBAR]
  - Widget `Catat Transaksi` (Desktop view langsung di dashboard): Form cepat tambah transaksi dengan tab Pengeluaran/Pemasukan, nominal Rp 0, chips nominal cepat, icon grid kategori, tanggal, keterangan, tombol `Simpan Transaksi` [USER, GAMBAR]
  - Widget `Catatan`: Daftar sticky notes mini dengan tombol `+ Catatan Baru`, menampilkan catatan yang disematkan atau terbaru [USER, GAMBAR]
  - Widget `Statistik Pengeluaran`: Bar chart pengeluaran per minggu dalam bulan terpilih [USER, GAMBAR]
  - Widget `Komposisi Pengeluaran`: Donut chart persentase pengeluaran per kategori beserta nominal dan warna kategori [USER, GAMBAR]
  - Widget `Transaksi Terbaru`: Tabel 5 transaksi terakhir lengkap dengan tanggal, icon kategori, keterangan, tipe, nominal, dan tombol `Lihat Semua` menuju menu Riwayat Transaksi [USER, GAMBAR]
- Aksi: Filter periode bulan/tahun, catat transaksi cepat, buka detail catatan, lihat riwayat lengkap [USER]
- Validasi: Nilai metrik dan grafik otomatis diperbarui real-time dari data database pengguna aktif [USER]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 3: Catat Transaksi
- Tujuan: Menambahkan catatan pemasukan atau pengeluaran secara terperinci [USER]
- Isi halaman:
  - Tab pilihan tipe: `Pengeluaran` atau `Pemasukan` [USER, GAMBAR]
  - Display nominal dengan format Rupiah `Rp X.XXX.XXX` [USER, GAMBAR]
  - Pilihan cepat nominal (quick chips): `10 rb`, `25 rb`, `50 rb`, `100 rb`, `200 rb`, `500 rb` [USER, GAMBAR]
  - Pilihan kategori berbentuk grid kartu berikon (Lucide icons): `Makan`, `Transport`, `Belanja`, `Kopi`, `Kuliah`, `Kebutuhan`, `Lainnya` [USER, GAMBAR]
  - Input Tanggal transaksi dengan pemilih tanggal interaktif [USER, GAMBAR]
  - Input Keterangan transaksi opsional [USER, GAMBAR]
  - Numeric Keypad khusus pada tampilan Mobile: Angka 1-9, 000, 0, tombol backspace/hapus [USER, GAMBAR]
  - Tombol submit: `Simpan Pengeluaran` / `Simpan Pemasukan` / `Simpan Transaksi` [USER, GAMBAR]
- Aksi: Tambah, Simpan, Batal [USER]
- Validasi: Nominal wajib lebih besar dari 0, kategori wajib dipilih, tanggal wajib diisi [USER]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 4: Riwayat Transaksi
- Tujuan: Melihat, memfilter, mencari, mengedit, menghapus, serta mengunduh daftar transaksi [USER, GAMBAR]
- Isi halaman:
  - Header: Judul `Riwayat Transaksi`, tombol `+ Tambah Transaksi`, tombol `Download` [USER, GAMBAR]
  - Card `Pilih Periode`: Dropdown pilihan `Bulan`, dropdown `Tahun`, tombol navigasi bulan sebelumnya `<` dan berikutnya `>`, serta tombol `Bulan Ini` [USER, GAMBAR]
  - Ringkasan periode terpilih: Baris informasi jumlah transaksi (`X Transaksi`), Total Pemasukan (+Rp), Total Pengeluaran (-Rp), dan Selisih/Sisa (+Rp/-Rp) [USER, GAMBAR]
  - Filter Tabs: `Semua Transaksi`, `Pemasukan`, `Pengeluaran` (masing-masing menampilkan counter transaksi) [USER, GAMBAR]
  - Toolbar Riwayat: Input pencarian `Cari transaksi...`, dropdown urutan (`Terbaru`, `Terlama`, `Nominal Tertinggi`, `Nominal Terendah`), ikon filter [USER, GAMBAR]
  - Tabel Transaksi (Desktop) / Kartu Daftar Transaksi (Mobile):
    - Kolom Tanggal, Kategori (dengan icon dan badge warna), Deskripsi / Keterangan, Tipe, Nominal transaksi (+ hijau untuk pemasukan, - merah/coral untuk pengeluaran), menu aksi titik tiga (...) [USER, GAMBAR]
    - Modal/Form Edit Transaksi [USER]
    - Konfirmasi Hapus Transaksi [USER]
  - Fitur `Download`: Ekspor riwayat transaksi ke format CSV / Excel / cetak laporan terstruktur [USER, GAMBAR]
- Aksi: Cari, Filter bulan/tahun, Filter tipe, Edit, Hapus, Download [USER]
- Validasi: Filter periode akurat membatasi data berdasarkan rentang tanggal bulan dan tahun terpilih [USER]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 5: Statistik
- Tujuan: Menampilkan analitik visual mendalam mengenai keuangan pengguna [USER]
- Isi halaman:
  - Selector rentang waktu: Bulan ini, Bulan lalu, Tahun ini [USER]
  - Grafik tren Pemasukan vs Pengeluaran [USER, GAMBAR]
  - Grafik bar breakdown pengeluaran mingguan [USER, GAMBAR]
  - Donut chart persentase pengeluaran per kategori [USER, GAMBAR]
  - Tabel rincian pengeluaran per kategori dengan nominal total dan persentase kontribusi [USER, GAMBAR]
- Aksi: Filter rentang waktu, hover detail tooltip [USER]
- Validasi: Perhitungan persentase total kategori bernilai 100% dari total pengeluaran [ASUMSI-TEKNIS]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 6: Buku Catatan
- Tujuan: Membuat, mengedit, menghapus, mencari, dan menyematkan catatan pribadi [USER]
- Isi halaman:
  - Toolbar: Tombol `+ Catatan Baru`, input pencarian catatan `Cari catatan...`, filter catatan disematkan (pinned) [USER]
  - Tampilan grid sticky notes warna-warni bernuansa soft glass (emerald soft, amber soft, purple soft, teal soft) [USER, GAMBAR]
  - Komponen sticky note: Judul catatan, isi teks/checklist, penanda sematkan (pin icon), tombol aksi Edit dan Hapus [USER, GAMBAR]
  - Modal editor catatan: Input judul, input isi/konten catatan, opsi checklist, toggle sematkan, pilihan warna sticky note [USER]
- Aksi: Tambah, Simpan, Edit, Hapus, Cari, Sematkan [USER]
- Validasi: Judul atau isi catatan tidak boleh kosong [ASUMSI-TEKNIS]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 7: To-Do List (Tugas)
- Tujuan: Mencatat tugas harian, deadline, prioritas, dan memantau status penyelesaian [USER]
- Isi halaman:
  - Form/Modal tambah tugas: Judul tugas, Deadline (tanggal & waktu), Prioritas (`Tinggi`, `Sedang`, `Rendah`), Kategori tugas [USER]
  - Filter tugas: `Semua`, `Belum Selesai`, `Selesai` [USER]
  - Daftar tugas dengan checkbox interaktif penanda selesai, badge prioritas berwarna, tanggal deadline, tombol Edit dan Hapus [USER]
  - Indikator progres penyelesaian tugas (X dari Y tugas selesai) [ASUMSI-TEKNIS]
- Aksi: Tambah tugas, Checklist status selesai, Edit, Hapus, Filter status [USER]
- Validasi: Judul tugas wajib diisi, tanggal deadline valid [ASUMSI-TEKNIS]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 8: Anggaran Bulanan
- Tujuan: Mengatur batas pengeluaran bulanan dengan visualisasi progress bar dan indikator sisa anggaran [USER]
- Isi halaman:
  - Form/Input set target batas pengeluaran bulanan (Nominal Anggaran) [USER, GAMBAR]
  - Kartu indikator Target Anggaran: Nominal batas anggaran, total realisasi pengeluaran, nominal sisa anggaran [USER, GAMBAR]
  - Progress bar dinamis pemakaian anggaran beserta status indikator (Aman / Waspada jika >80% / Melebihi Anggaran jika >100%) [USER]
  - Riwayat pemenuhan target anggaran bulanan [ASUMSI-TEKNIS]
- Aksi: Atur Anggaran, Simpan, Edit [USER]
- Validasi: Batas anggaran berupa angka positif [ASUMSI-TEKNIS]
- Hak akses: Pengguna terautentikasi [USER]

### Menu 9: Pengaturan Akun & Profil
- Tujuan: Mengelola informasi akun, keamanan kredensial, dan keluar dari aplikasi [USER]
- Isi halaman:
  - Info akun: Username saat ini, tanggal bergabung, total transaksi yang dicatat [ASUMSI-TEKNIS]
  - Form Ubah Username: Input username baru, verifikasi ketersediaan, konfirmasi password [USER]
  - Form Ubah Password: Input password lama, password baru, konfirmasi password baru [USER]
  - Tombol `Logout` dengan konfirmasi [USER]
- Aksi: Ubah Username, Ubah Password, Logout [USER]
- Validasi: Password lama harus cocok sebelum mengubah password baru; username baru belum dipakai akun lain [USER]
- Hak akses: Pengguna terautentikasi [USER]

## 5. Database (setup.gs)

| Sheet | Kolom | Tipe | Wajib | Keterangan |
|---|---|---|---|---|
| `users` | `id` | id | Ya | ID unik pengguna (UUID / auto-generated) |
| `users` | `username` | text | Ya | Username unik (lowercase/case-sensitive) |
| `users` | `password_hash` | text | Ya | Hash password pengguna |
| `users` | `created_at` | datetime | Ya | Waktu pendaftaran akun |
| `users` | `updated_at` | datetime | Ya | Waktu pembaruan profil |
| `transactions` | `id` | id | Ya | ID unik transaksi |
| `transactions` | `username` | text | Ya | Pemilik transaksi (Foreign Key ke `users.username`) |
| `transactions` | `type` | text | Ya | Nilai: `Pengeluaran` atau `Pemasukan` |
| `transactions` | `amount` | currency | Ya | Nominal transaksi dalam Rupiah (angka positif) |
| `transactions` | `category` | text | Ya | Kategori transaksi (`Makan`, `Transport`, `Belanja`, dll) |
| `transactions` | `date` | date | Ya | Tanggal transaksi (format YYYY-MM-DD) |
| `transactions` | `notes` | longtext | Tidak | Catatan/keterangan tambahan |
| `transactions` | `created_at` | datetime | Ya | Timestamp pencatatan |
| `notes` | `id` | id | Ya | ID unik catatan |
| `notes` | `username` | text | Ya | Pemilik catatan |
| `notes` | `title` | text | Ya | Judul catatan |
| `notes` | `content` | longtext | Ya | Isi teks catatan / item checklist |
| `notes` | `color` | text | Tidak | Kode warna tema sticky note (emerald, yellow, purple) |
| `notes` | `is_pinned` | boolean | Ya | Status sematan (TRUE/FALSE) |
| `notes` | `created_at` | datetime | Ya | Waktu pembuatan |
| `notes` | `updated_at` | datetime | Ya | Waktu pengeditan |
| `todos` | `id` | id | Ya | ID unik tugas |
| `todos` | `username` | text | Ya | Pemilik tugas |
| `todos` | `task` | text | Ya | Deskripsi/judul tugas |
| `todos` | `deadline` | datetime | Tidak | Tanggal dan waktu jatuh tempo |
| `todos` | `priority` | text | Ya | Prioritas: `Tinggi`, `Sedang`, `Rendah` |
| `todos` | `is_completed` | boolean | Ya | Status penyelesaian (TRUE/FALSE) |
| `todos` | `created_at` | datetime | Ya | Waktu pembuatan |
| `budgets` | `id` | id | Ya | ID unik anggaran |
| `budgets` | `username` | text | Ya | Pemilik anggaran |
| `budgets` | `month_year` | text | Ya | Periode format `YYYY-MM` (mis. `2026-05`) |
| `budgets` | `budget_amount` | currency | Ya | Batas nominal pengeluaran |
| `budgets` | `updated_at` | datetime | Ya | Waktu pengaturan anggaran |
| `categories` | `id` | id | Ya | ID unik kategori kustom |
| `categories` | `username` | text | Ya | Pemilik kategori |
| `categories` | `name` | text | Ya | Nama kategori |
| `categories` | `icon` | text | Ya | Kode ikon kategori |
| `categories` | `created_at` | datetime | Ya | Waktu pembuatan |

Relasi antar sheet:
- `transactions.username` -> `users.username`
- `notes.username` -> `users.username`
- `todos.username` -> `users.username`
- `budgets.username` -> `users.username`
- `categories.username` -> `users.username`

Data awal (seed):
- Tidak ada data seed bawaan. Pengguna baru memulai dengan dashboard bersih dan dapat langsung mencatat transaksi secara mandiri. [USER]

## 6. Alur & Aturan Bisnis (code.gs)
1. **Pemisahan Data Pengguna (Isolasi Multi-user)**:
   - Setiap permintaan data (read, write, update, delete) wajib menyertakan token sesi / username aktif.
   - Backend memvalidasi hak kepemilikan data sebelum menjalankan mutasi apapun.
2. **Kalkulasi Keuangan Dinamis**:
   - `Total Saldo` = Kumulatif Total Pemasukan - Kumulatif Total Pengeluaran (seluruh waktu untuk akun terkait).
   - `Pemasukan Bulan Berjalan` = Sum nominal transaksi tipe `Pemasukan` dengan tanggal pada bulan dan tahun terpilih.
   - `Pengeluaran Bulan Berjalan` = Sum nominal transaksi tipe `Pengeluaran` dengan tanggal pada bulan dan tahun terpilih.
   - `Sisa Anggaran` = Nominal Target Bulanan (dari sheet `budgets` bulan terpilih) dikurangi `Pengeluaran Bulan Berjalan`. Jika anggaran belum diset, sisa dihitung relatif terhadap pemasukan.
   - `Persentase Kategori` = (Total pengeluaran kategori X pada periode / Total seluruh pengeluaran pada periode) * 100.
3. **Filter Riwayat Bulanan**:
   - Parameter bulan (1-12) dan tahun (mis. 2026) menyaring data transaksi secara presisi berdasarkan kolom `date`.
   - Navigasi bulan sebelumnya dan bulan berikutnya menggeser bulan secara akurat (termasuk pergantian tahun dari Januari ke Desember dan sebaliknya).
4. **Keamanan Kredensial**:
   - Penyimpanan password menggunakan hashing (SHA-256 dengan salt) di Google Apps Script.

## 7. Desain (index.html)
Sumber: Gambar referensi desain UI/UX dan instruksi tema Emerald Green & White Glassmorphism [USER, GAMBAR]

- **Mode tema**: Dark emerald glassmorphism dengan aksen glow neon emerald dan teks kontras putih [USER, GAMBAR]
- **Token warna (hex ≈)**:
  - `--bg`: `≈ #031811` (Deep dark forest/emerald backdrop)
  - `--bg-pattern`: `radial-gradient(ellipse at 80% 10%, rgba(16, 185, 129, 0.22) 0%, transparent 65%)`
  - `--surface`: `rgba(6, 44, 34, 0.55)` (Glassmorphic dark green container)
  - `--surface-card`: `rgba(10, 54, 42, 0.65)`
  - `--surface-card-hover`: `rgba(16, 68, 54, 0.75)`
  - `--border`: `rgba(52, 211, 153, 0.20)` (Subtle glowing translucent emerald border)
  - `--border-active`: `rgba(52, 211, 153, 0.60)`
  - `--text`: `#FFFFFF` (Pure white text untuk heading dan nilai metrik)
  - `--text-muted`: `rgba(209, 250, 229, 0.70)` (Soft emerald-mint tint untuk subtitle dan keterangan)
  - `--primary`: `#10B981` (Vibrant Emerald Neon)
  - `--primary-glow`: `rgba(16, 185, 129, 0.45)`
  - `--primary-contrast`: `#032219`
  - `--secondary`: `rgba(16, 185, 129, 0.15)`
  - `--success`: `#34D399` (Mint green untuk pemasukan dan badge positif)
  - `--warning`: `#FBBF24` (Amber untuk catatan dan alert waspada)
  - `--danger`: `#F87171` (Coral pinkish-red untuk pengeluaran dan alert batas)
  - `--sticky-yellow`: `rgba(251, 191, 36, 0.18)`
  - `--sticky-purple`: `rgba(192, 132, 252, 0.18)`
  - `--sticky-green`: `rgba(52, 211, 153, 0.18)`

- **Tipografi**:
  - Font Family: `'Plus Jakarta Sans', sans-serif, -apple-system, BlinkMacSystemFont` [USER]
  - Hierarchy:
    - Display / Brand Logo: 22px / 24px, Bold 800
    - H1 Halaman: 24px - 28px, Bold 700
    - Angka Metrik: 24px - 32px, ExtraBold 800
    - Sub-heading / Card Title: 16px - 18px, SemiBold 600
    - Body Text: 14px, Regular 400 & Medium 500
    - Caption / Meta: 12px, Regular 400

- **Bentuk & Spacing**:
  - Radius:
    - Tombol & Tabs: `9999px` (Pill / fully rounded) [GAMBAR]
    - Kartu & Modal: `24px` - `28px` [GAMBAR]
    - Input & Numeric Keypad: `16px` - `20px` [GAMBAR]
    - Chips Kategori & Nominal: `16px` [GAMBAR]
  - Efek Glassmorphism:
    - `backdrop-filter: blur(24px) saturate(160%)`
    - Box shadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)`
    - Glow highlight: `box-shadow: 0 0 20px rgba(16, 185, 129, 0.35)` pada tombol aktif dan fokus form

- **Layout**:
  - Desktop (>= 1024px):
    - Layout 2 kolom: Sidebar tetap di sisi kiri (lebar 260px) + Header dan Multi-kolom Main Dashboard di sisi kanan [USER, GAMBAR]
    - Lebar maksimum: 1600px dengan alignment centered pada layar lebar [GAMBAR]
  - Tablet (768px - 1023px):
    - Sidebar dapat diciutkan (collapsible sidebar) atau berpindah menjadi topbar navigasi adaptif [GAMBAR]
    - Grid metrik menjadi 2 kolom x 2 baris [GAMBAR]
  - Mobile (< 768px):
    - Header ringkas dengan logo MySPACE, tombol notifikasi, dan avatar pengguna [GAMBAR]
    - Bottom navigation bar melayang (floating dock glassmorphism) dengan 4 menu utama: `Kantong` (Keuangan), `Grafik` (Statistik), `Catatan`, `Tugas` [USER, GAMBAR]
    - Tombol bulat (+) mengambang di bagian tengah bottom bar untuk membuka modal interaktif Catat Transaksi [USER, GAMBAR]
    - Form transaksi mobile dilengkapi Numeric Keypad interaktif sesuai referensi [USER, GAMBAR]

- **Komponen UI**:
  - Ikon: Lucide Icons (`lucide.dev`) [USER]
  - Tombol: Emerald glow pill button, soft ghost button, outline glass button [GAMBAR]
  - Input: Glass input dengan leading icon, trailing toggle icon, dan border glow saat fokus [GAMBAR]
  - Numeric Keypad: Tombol kotak bulat transparan (1-9, 000, 0, backspace) dengan feedback getar/visual aktif [GAMBAR]
  - Modal: Dialog melayang dengan backdrop gelap blur [GAMBAR]
  - Toast Notification: Notifikasi pojok melayang emerald halus untuk konfirmasi simpan/sukses/gagal [ASUMSI-TEKNIS]

- **Interaksi Visual**:
  - Transisi halus (smooth transitions 0.25s ease) pada hover kartu dan tombol [USER]
  - Animasi pembukaan modal (fade-in + slight scale-up) [USER]
  - Tab switcher dengan sliding highlight pill [GAMBAR]

## 8. Responsif & Presisi di Semua Device
- Desain mobile-first, fluid, dan fleksibel mulai dari resolusi 320px (smartphone kompak), 375px/414px (iPhone standar/Pro Max), 768px/1024px (iPad/Tablet), hingga 1920px+ (Desktop Monitor lebar) tanpa overflow horizontal yang tidak diinginkan [USER].
- Konten tabel di mobile disajikan dalam bentuk daftar kartu ringkas (card-list) yang nyaman disentuh, sedangkan di desktop disajikan dalam bentuk tabel data lengkap bergaris pemisah halus [GAMBAR].

## 9. Tampilan Spreadsheet
- Desain sheet spreadsheet rapi, terstruktur, dan autofit:
  - Baris header diberi background warna Emerald (`#064e3b`), teks putih tebal (`#ffffff`).
  - Baris header dibekukan (`freeze 1 row`).
  - Lebar kolom disesuaikan secara otomatis (`autoResizeColumns`) dengan batas minimum yang proporsional.
  - Format angka dan mata uang diterapkan pada kolom nominal (`Rp #,##0`).
  - Format tanggal diterapkan pada kolom tanggal (`yyyy-mm-dd` / `yyyy-mm-dd hh:mm:ss`).
  - Filter otomatis diaktifkan pada baris header seluruh tabel.
  - Sheet bawaan Spreadsheet yang kosong (`Sheet1`) dihapus secara otomatis.

## 10. Pop-up setup.gs
- Saat `setup.gs` dijalankan di Google Apps Script editor, spreadsheet menampilkan dialog pop-up (`SpreadsheetApp.getUi().alert(...)`) yang mengonfirmasi:
  - Sheet yang berhasil dibuat (`users`, `transactions`, `notes`, `todos`, `budgets`)
  - Kolom masing-masing sheet yang berhasil dikonfigurasi
  - Status pembersihan sheet kosong bawaan
  - Baris terakhir pop-up persis:
    `By - Fadhil` [SKILL]

## 11. Mode GitHub Pages (Mode B)
- Backend `code.gs`:
  - Fungsi `doGet(e)` dan `doPost(e)` mengembalikan format JSON menggunakan `ContentService.createTextOutput(...)` dengan `setMimeType(ContentService.MimeType.JSON)`.
  - Menerima payload JSON baik melalui query parameter GET maupun POST body.
  - Dilengkapi header respon CORS atau format JSONP/safe-CORS untuk pemanggilan lintas domain dari GitHub Pages.
- Frontend `index.html`:
  - Menggunakan API `fetch()` asynchronous ke variabel URL konfigurasi `APPS_SCRIPT_EXEC_URL`.
  - Dilengkapi fallback offline/demo mode jika URL exec belum dikonfigurasi oleh pengguna, sehingga seluruh interaksi UI dan simulasi data tetap dapat dicoba secara instan di GitHub Pages sebelum menghubungkan spreadsheet.

## 12. Di Luar Cakupan
- Fitur login pihak ketiga (Google OAuth, Facebook, Apple Login) [USER: hanya username dan password].
- Fitur transaksi mata uang asing selain Rupiah (IDR).
- Fitur multi-rekening bank terintegrasi secara otomatis via Open API perbankan.
- Unggah file gambar/lampiran nota struk belanja ke Google Drive (tidak diminta).

## 13. Pertanyaan Terbuka
- Tidak ada (Semua spesifikasi dan tautan exec Apps Script telah terhubung).

## 14. Riwayat Revisi
| Versi | Tanggal | Perubahan (TAMBAH/UBAH/HAPUS) | File terdampak |
|---|---|---|---|
| 1.0 | 05/11/2026 | Dokumen awal spesifikasi webapp MySPACE berdasarkan instruksi user dan 5 gambar referensi | code.gs, setup.gs, index.html |
| 1.1 | 05/11/2026 | UBAH: Menyimpan link exec Web App Apps Script resmi ke dalam index.html dan PRD.md | index.html, PRD.md |
| 1.2 | 05/11/2026 | UBAH: Menu Kantong murni finansial (tanpa widget catatan/inline form transaksi), transaksi hanya via modal tombol (+). TAMBAH: Fitur Custom Kategori via tombol kecil & sheet categories | code.gs, setup.gs, index.html, PRD.md |
| 1.3 | 05/11/2026 | UBAH: Penyempurnaan ergonomi UI mobile (mobile top header MySPACE, modal bottom-sheet, tactile keypad haptics, safe-area inset & kartu metrik 2x2 presisi) | index.html, PRD.md |
| 1.4 | 05/11/2026 | UBAH: Visual dan tata letak fitur Kantong mobile disesuaikan 100% presisi sesuai gambar referensi (header pill avatar Fadhil, summary strip 1 baris, tab segmented Semua/Pemasukan/Pengeluaran, search pill, list kartu transaksi badge panah mint/coral, nominal presisi, kotak aksi, dan dock navigasi) | index.html, PRD.md |
| 1.5 | 06/11/2026 | UBAH: Visual dan layout mobile untuk Page Grafik, Catatan, dan Tugas 100% presisi sesuai gambar referensi. TAMBAH: Tombol (+) dinamis kontekstual dengan modal bottom-sheet spesifik per halaman (Kantong: Transaksi, Grafik: Target/Anggaran, Catatan: Editor Catatan Baru, Tugas: Tambah Tugas Baru) | index.html, PRD.md |

