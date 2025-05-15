# incodiy/realments

`incodiy/realments` adalah Laravel + React package yang dirancang untuk menyederhanakan proses pembuatan form HTML dinamis menggunakan komponen React yang fleksibel dan dapat digunakan ulang.

---

## 🌟 Tujuan

Menyediakan cara mudah dan efisien untuk membangun elemen form HTML yang kompleks menggunakan pendekatan deklaratif dari Laravel dan kekuatan interaktif dari React.

---

## 🧬 Teknologi yang Digunakan

* **Laravel** (Backend)
* **React.js** (Frontend)
* **Vite** (Asset bundler)
* **TailwindCSS / Bootstrap** (Dukungan UI Framework dinamis)

---

## 🚀 Fungsi / Kegunaan

* Mempermudah pembuatan form dinamis dari Laravel controller.
* Mendukung berbagai jenis input HTML.
* Komponen React siap pakai & dapat dikustomisasi.
* Dukungan multiple form secara dinamis dalam satu halaman.
* Otomatis integrasi error & old value dari Laravel.

---

## ✨ Fitur Utama

* Input Dinamis: text, email, password, number, textarea, date, file, select, checkbox, radio
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
* Bisa digunakan secara plug-and-play di project Laravel lain.
* CSS Framework agnostik (support Bootstrap, Tailwind, dll).
* Dukungan framework UI: Tailwind (default), Bootstrap (bisa disesuaikan)
* Multiple form rendering
* Load otomatis React & realments.js saat form dipanggil

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
        │   └── scripts.blade.php
        ├── RealmentsServiceProvider.php
        └── composer.json
```

---

## ⚖️ Instalasi

```bash
composer require incodiy/realments
```

```bash
php artisan vendor:publish --tag=realments-config
php artisan vendor:publish --tag=realments-assets
```

```bash
npm install && npm run build
```

---

## 🔄 Cara Menggunakan

### 1. Tambahkan di Controller

```php
use Incodiy\Realments\Facades\Realments;

Realments::open('/submit-url')
    ->text('name', 'Full Name')
    ->email('email', 'Email Address')
    ->close();

$realmentForms = Realments::renderForms();
return view('realments.index', compact('realmentForms'));
```

### 2. Di Blade View

```blade
{!! $realmentForms !!}
@include('realments.scripts')
```

> Catatan: File `scripts.blade.php` akan me-load React & realments.js otomatis.

---

## 🔢 Komponen Input yang Tersedia

Setiap method menerima parameter umum:

* `name`: nama input
* `label`: teks label
* `attributes`: (opsional) array atribut tambahan seperti `placeholder`, `class`, `required`, dll.

### Text

```php
->text('username', 'Username', ['placeholder' => 'Enter your name'])
```

### Email

```php
->email('email', 'Email', ['required' => true])
```

### Password

```php
->password('password', 'Password')
```

### Number

```php
->number('age', 'Age', ['min' => 0])
```

### Date

```php
->date('dob', 'Date of Birth')
```

### Textarea

```php
->textarea('bio', 'Biography', ['rows' => 5])
```

### Select

```php
->select('role', 'Role', ['admin' => 'Admin', 'user' => 'User'], ['multiple' => true])
```

### File

```php
->file('avatar', 'Upload Photo')
```

### Checkbox

```php
->checkbox('agree', 'I Agree to Terms')
```

### Radio

```php
->radio('gender', 'Gender', ['m' => 'Male', 'f' => 'Female'])
```

---

## 🚀 Multiple Forms

Panggil beberapa kali:

```php
Realments::open('/form-1')->text('a', 'A')->close();
Realments::open('/form-2')->text('b', 'B')->close();
```

Semua akan digabung otomatis dengan `Realments::renderForms()`.

---

### 11. Select dengan Tombol Add (Addable)

```php
$this->select('tags', [
    'label'    => 'Select or Add Tags',
    'options'  => ['news', 'tech', 'sports'],
    'multiple' => true,
    'addable'  => true,
]);
```

#### Penjelasan:

| Parameter  | Tipe    | Deskripsi                                        |
| ---------- | ------- | ------------------------------------------------ |
| `options`  | array   | Daftar pilihan awal                              |
| `multiple` | boolean | Pilih banyak opsi                                |
| `addable`  | boolean | Aktifkan input + tombol untuk menambah opsi baru |
| `label`    | string  | Label untuk select box                           |

---

## 🧩 Konfigurasi

Publish konfigurasi dengan:

```bash
php artisan vendor:publish --tag=realments-config
```

Konfigurasikan framework CSS di `config/realments.php`:

```php
return [
    'framework' => 'tailwind', // atau 'bootstrap'
];
```

Ubah default framework CSS:

```php
// config/realments.php
return [
    'framework' => 'tailwind',

    'tailwind' => [
        'label' => 'block text-sm font-medium text-gray-700',
        'input' => 'mt-1 block w-full rounded-md border-gray-300 shadow-sm',
        'button' => 'inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded'
    ],

    'bootstrap' => [
        'label' => 'form-label',
        'input' => 'form-control',
        'button' => 'btn btn-primary'
    ]
];
```


---

## 📁 Struktur Folder View

* `resources/views/vendor/realments/index.blade.php`
* `resources/views/vendor/realments/scripts.blade.php`

---

## ✅ TODO Next Features

* Grouping inputs
* Conditional rendering (input muncul jika kondisi tertentu)
* Input repeater + nested repeater
* Dukungan AJAX autofill untuk select box

---

## ❤️ Credits

Dikembangkan oleh [Incodiy Labs](https://github.com/incodiy) untuk kebutuhan form builder modular Laravel + React.

---

## 👋 Kontribusi

- OnLoad...

---

## 📊 Lisensi

MIT License
