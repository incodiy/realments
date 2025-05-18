# Incodiy Realments

[![Latest Version on Packagist](https://img.shields.io/packagist/v/incodiy/realments.svg?style=flat-square)](https://packagist.org/packages/incodiy/realments)
[![Total Downloads](https://img.shields.io/packagist/dt/incodiy/realments.svg?style=flat-square)](https://packagist.org/packages/incodiy/realments)
[![License](https://img.shields.io/packagist/l/incodiy/realments.svg?style=flat-square)](https://packagist.org/packages/incodiy/realments)

Realments adalah package Laravel dan React yang powerful untuk membuat form input data dengan mudah melalui kode sederhana di controller Laravel.

## Fitur

- Membuat elemen form dengan kode Laravel controller yang sederhana
- Mendukung berbagai tipe input (text, textarea, select, checkbox, radio, dll)
- Integrasi WYSIWYG editor untuk rich text editing
- Dukungan CSS framework dinamis (Bootstrap, Tailwind, Bulma)
- Dukungan tema gelap (dark mode) dan tema terang (light mode)
- Internasionalisasi (i18n) untuk multi-bahasa
- Validasi client-side dan server-side
- Integrasi error display dengan validasi Laravel
- Fitur add button untuk penambahan elemen dinamis
- Desain responsif untuk mobile dan desktop

## Persyaratan

- PHP 8.1 atau lebih tinggi
- Laravel 10.x, 11.x, atau 12.x
- Node.js dan NPM untuk asset frontend

## Instalasi

### 1. Instal package melalui Composer

```bash
composer require incodiy/realments
```

### 2. Publish asset package

```bash
php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-assets"
```

### 3. Publish file konfigurasi (opsional)

```bash
php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-config"
```

### 4. Publish file bahasa (opsional)

```bash
php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-lang"
```

### 5. Tambahkan Realments facade ke file `config/app.php` (Laravel 10 saja)

```php
'aliases' => [
    // ...
    'Realments' => Incodiy\Realments\Facades\Realments::class,
],
```

### 6. Instal dependensi NPM dan build assets

Setelah menginstal package melalui Composer, Anda perlu menginstal dependensi NPM dan build assets React:

```bash
# Pindah ke direktori project Laravel Anda
cd /path/to/your/laravel/project

# Instal dependensi NPM
npm install --save-dev vite @vitejs/plugin-react tailwindcss postcss autoprefixer laravel-vite-plugin axios tailwindcss postcss autoprefixer

# Build assets untuk production
npm run build
```

Atau jika Anda menggunakan Yarn:

```bash
yarn install
yarn build
```

## Penggunaan Dasar

### Form Open dan Close

```php
// Di controller Anda
public function create()
{
    $form = app('realments');
    
    // Buka form
    $form->open([
        'action' => route('users.store'),
        'method' => 'POST',
        'files' => true, // Jika Anda memerlukan upload file
        'css_framework' => 'bootstrap', // Pilihan: bootstrap, tailwind, bulma
        'theme_mode' => 'light' // Pilihan: light, dark
    ]);
    
    // Tambahkan elemen form di sini...
    
    // Tutup form dengan tombol submit
    $form->close('Submit');
    
    // Render form
    return view('users.create', [
        'form' => $form->render()
    ]);
}
```

### Select Box

```php
// Select box dasar
$form->select('country', [
    'Select a country', // Opsi pertama kosong secara default
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
]);

// Select box dengan nilai terpilih
$form->select('country', [
    'Select a country',
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
], [
    'selected' => 'usa'
]);

// Multi-select box
$form->select('countries', [
    'Select countries',
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
], [
    'multiselect' => true,
    'selected' => ['usa', 'uk']
]);

// Select box dengan tombol add
$form->select('skills', [
    'Select a skill',
    'php' => 'PHP',
    'js' => 'JavaScript',
    'python' => 'Python'
], [
    'add_button' => true,
    'max_additions' => 5,
    'button_position' => 'right', // Pilihan: right, bottom
    'button_text' => 'Add Skill',
    'button_class' => 'btn btn-sm btn-secondary',
    'added_items' => [
        ['php'], // Item pertama dengan PHP terpilih
        ['js']   // Item kedua dengan JavaScript terpilih
    ]
]);
```

### Text Input

```php
// Input text dasar
$form->text('name', 'John Doe');

// Input text dengan atribut
$form->text('name', 'John Doe', [
    'placeholder' => 'Enter your name',
    'class' => 'custom-class',
    'required' => true
]);

// Input text dengan aturan validasi
$form->text('email', 'john@example.com')
    ->rules('required|email');
```

### Textarea

```php
// Textarea dasar
$form->textarea('description', 'Lorem ipsum dolor sit amet');

// Textarea dengan WYSIWYG editor
$form->textarea('content', '<p>Hello World</p>', [
    'wysiwyg' => true,
    'editor' => 'tinymce', // Pilihan: tinymce, ckeditor, quill
    'editor_config' => [
        'height' => 300,
        'plugins' => 'link image code'
    ]
]);
```

### Checkbox, Radio, dan Switch

```php
// Checkbox
$form->checkbox('agree_terms', '1', true);

// Radio buttons
$form->radio('gender', [
    'male' => 'Male',
    'female' => 'Female',
    'other' => 'Other'
], 'male');

// Switch
$form->switch('notifications', '1', true);
```

### Password, Email, dan Number

```php
// Input password
$form->password('password');

// Input email
$form->email('email', 'john@example.com');

// Input number
$form->number('age', 25, [
    'min' => 18,
    'max' => 100
]);
```

### Date, Time, dan DateTime

```php
// Input date
$form->date('birth_date', '1990-01-01');

// Input time
$form->time('meeting_time', '14:30');

// Input DateTime
$form->datetime('appointment', '2023-05-15T14:30');

// Date range
$form->dateRange('vacation', ['2023-06-01', '2023-06-15']);
```

### File Upload

```php
// Upload file dasar
$form->file('document');

// Upload file dengan thumbnail preview
$form->file('profile_picture', [
    'thumbnail' => true,
    'thumbnail_size' => 150,
    'thumbnail_position' => 'top', // Pilihan: top, bottom
    'accept' => 'image/*'
]);
```

### Hidden Input

```php
$form->hidden('user_id', 123);
```

### Range, Color, Tags, dan RichText

```php
// Range slider
$form->range('rating', 5, [
    'min' => 0,
    'max' => 10,
    'step' => 1
]);

// Color picker
$form->color('theme_color', '#3490dc');

// Tags input
$form->tags('keywords', ['laravel', 'react']);

// Rich text editor
$form->richText('article', '<h1>Article Title</h1><p>Content goes here...</p>', [
    'editor' => 'tinymce'
]);
```

### Captcha dan Autocomplete

```php
// Captcha
$form->captcha();

// Autocomplete
$form->autocomplete('city', 'New York', [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix'
]);
```

## Penggunaan Lanjutan

### Validasi

```php
// Validasi server-side di controller
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);
    
    // Jika validasi gagal, error akan otomatis ditampilkan di form
    
    // Proses form...
}

// Validasi client-side di form builder
$form->text('name')
    ->rules('required|max:255');

$form->email('email')
    ->rules('required|email');

$form->password('password')
    ->rules('required|min:8');
```

### Internasionalisasi (i18n)

```php
// Di config/realments.php
'i18n' => [
    'default_locale' => 'en',
    'fallback_locale' => 'en',
    'available_locales' => ['en', 'id', 'es', 'fr'],
],

// Di controller
$form->open([
    'locale' => 'id' // Set bahasa form
]);
```

### Kustomisasi CSS Framework

```php
// Di config/realments.php
'default_css_framework' => 'bootstrap',

// Di controller
$form->open([
    'css_framework' => 'tailwind'
]);
```

### Theme Mode

```php
// Di config/realments.php
'default_theme_mode' => 'light',

// Di controller
$form->open([
    'theme_mode' => 'dark'
]);
```

## Kompatibilitas Laravel

Realments mendukung Laravel versi 10.x, 11.x, dan 12.x. Berikut adalah panduan kompatibilitas:

### Laravel 10.x
- Tambahkan Facade ke `config/app.php`
- Semua fitur didukung penuh

### Laravel 11.x dan 12.x
- Tidak perlu menambahkan Facade secara manual
- Semua fitur didukung penuh
- Gunakan auto-discovery untuk service provider

## Troubleshooting

### Asset tidak ditemukan

Jika Anda mendapatkan error 404 untuk file JavaScript, pastikan:

1. Anda telah menjalankan `npm run build` setelah instalasi
2. Anda telah mempublish asset dengan `php artisan vendor:publish --tag=realments-assets`
3. Direktori `public/vendor/incodiy/realments` ada dan berisi file JavaScript

Jika masalah berlanjut, coba:

```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

### Error saat build

Jika Anda mendapatkan error saat menjalankan `npm run build`, pastikan:

1. Anda menggunakan Node.js versi 14 atau lebih tinggi
2. Semua dependensi NPM terinstal dengan benar
3. Tidak ada konflik dengan package lain

## Dokumentasi

Untuk dokumentasi lengkap, kunjungi [GitHub Pages](https://incodiy.github.io/realments/) kami.

## Testing

```bash
composer test
```

## Kontribusi

Silakan lihat [CONTRIBUTING](CONTRIBUTING.md) untuk detail.

## Keamanan

Jika Anda menemukan masalah keamanan, silakan kirim email ke info@incodiy.com daripada menggunakan issue tracker.

## Kredit

- [Incodiy](https://github.com/incodiy)
- [Semua Kontributor](../../contributors)

## Lisensi

The MIT License (MIT). Silakan lihat [License File](LICENSE.md) untuk informasi lebih lanjut.
