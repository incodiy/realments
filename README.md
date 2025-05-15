# Incodiy Realments

**Realments** adalah Laravel package yang menyederhanakan proses pembuatan form dinamis berbasis **React** dari Laravel controller tanpa perlu menulis view Blade atau JSX langsung.

## 🌟 Fitur Utama

* Integrasi otomatis dengan React.
* Komponen input seperti:

  * Select
  * Text
  * Textarea
  * File upload
  * Password
  * Email
  * Number
  * Date
  * Checkbox
  * Radio
* Dynamic add input (bisa tambah field dengan button).
* Integrasi validasi & error display Laravel.
* Output otomatis komponen React langsung dari controller.
* CSS Framework agnostik (support Bootstrap, Tailwind, dll).
* Bisa digunakan secara plug-and-play di project Laravel lain.

---

## 📦 Instalasi

### 1. Install Package via Composer

```bash
composer require incodiy/realments
```

### 2. Publish Asset & View

```bash
php artisan vendor:publish --provider="Incodiy\Realments\RealmentsServiceProvider"
```

### 3. Include Komponen Blade

Di view manapun, tambahkan directive:

```blade
@realmentsForm
```

### 4. Setup Asset (Tanpa Build Sendiri)

Pastikan file JS `realments.js` sudah ter-publish di `public/vendor/realments/js/realments.js`. Kamu tidak perlu build manual jika hanya menggunakan komponen default dari package.

Jika kamu ingin melakukan build ulang, lihat bagian `🔧 Development & Build`.

---

## ⚙️ Penggunaan di Controller

### Form Open dan Close

```php
$this->open(['method' => 'POST', 'action' => route('submit.route')]);

// Tambahkan input...

$this->close([
    'button' => true,
    'button_label' => 'Submit',
    'button_class' => 'btn btn-primary'
]);
```

### Contoh Input Element

```php
$this->select('pilihan negara', [
    null,
    'indonesia',
    'malaysia',
    'singapore'
], [
    'class' => 'form-control',
    'multiselect' => true,
    'label' => true,
    'add_button' => true,
    'max_add' => 5,
    'selected' => ['malaysia', 'singapore']
]);

$this->text('nama lengkap', [
    'placeholder' => 'Masukkan nama...',
    'add_button' => true,
    'max_add' => 3,
    'selected' => ['John Doe']
]);

$this->email('email pengguna');
$this->password('kata sandi');
$this->file('unggah dokumen');
$this->textarea('deskripsi');
$this->date('tanggal lahir');
$this->number('jumlah anak');
$this->checkbox('hobi', ['musik', 'olahraga']);
$this->radio('gender', ['pria', 'wanita']);
```

---

## 📄 Validasi & Error

Validasi otomatis akan diterima dari response Laravel jika error dikirim sebagai JSON dengan format standar:

```json
{
  "errors": {
    "nama_lengkap": ["Nama harus diisi."]
  }
}
```

Realments akan otomatis menampilkan error tersebut pada komponen terkait.

---

## 🎨 Styling

* Komponen disusun agar bisa menerima semua atribut HTML standar (`class`, `id`, `style`, dsb).
* Styling disesuaikan dengan framework CSS yang kamu pakai (Tailwind, Bootstrap, dsb).

Contoh:

```php
$this->text('nama', ['class' => 'form-control text-red-600']);
```

---

## 🔧 Development & Build (Opsional)

Jika kamu ingin melakukan perubahan di komponen React-nya:

### 1. Install NPM dependencies

```bash
cd packages/incodiy/realments
npm install
```

### 2. Build dengan Laravel Mix

```bash
npm run dev
```

Atau untuk production:

```bash
npm run production
```

Output akan berada di:

```
public/vendor/realments/js/realments.js
```

### 3. Build dengan Vite (alternatif)

Pastikan kamu sudah install plugin:

```bash
npm install --save-dev @vitejs/plugin-react
```

Kemudian edit `vite.config.js` di root Laravel-mu agar juga membaca `vendor/realments/resources/js`.

Contoh penggunaan direktif:

```blade
@vite('vendor/realments/resources/js/realments.js')
```

---

## 📁 Struktur Direktori

```
packages/
└── incodiy/
    └── realments/
        ├── resources/
        │   └── js/
        │       └── components/
        │           ├── Text.jsx
        │           ├── Select.jsx
        │           └── ...lainnya
        ├── views/
        │   └── index.blade.php
        ├── routes/
        │   └── api.php
        ├── RealmentsServiceProvider.php
        └── composer.json
```

---

## ✅ TODO Next Features

* Grouping inputs
* Conditional rendering (input muncul jika kondisi tertentu)
* Input repeater + nested repeater
* Dukungan AJAX autofill untuk select box

---

## ❤️ Credits

Developed by [Incodiy Labs](https://github.com/incodiy)

---

## 📄 Lisensi

MIT License
