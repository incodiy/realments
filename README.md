# Incodiy Realments

[![Latest Version on Packagist](https://img.shields.io/packagist/v/incodiy/realments.svg?style=flat-square)](https://packagist.org/packages/incodiy/realments)
[![Total Downloads](https://img.shields.io/packagist/dt/incodiy/realments.svg?style=flat-square)](https://packagist.org/packages/incodiy/realments)
[![License](https://img.shields.io/packagist/l/incodiy/realments.svg?style=flat-square)](https://packagist.org/packages/incodiy/realments)

Realments is a powerful Laravel and React form builder package that allows you to create dynamic form elements with just a few lines of code in your Laravel controller.

## Features

- Create form elements with simple Laravel controller code
- Supports various input types (text, textarea, select, checkbox, radio, etc.)
- WYSIWYG editor integration for rich text editing
- Dynamic CSS framework support (Bootstrap, Tailwind, Bulma)
- Dark mode and light mode support
- Internationalization (i18n) for multi-language support
- Client-side and server-side validation
- Error display integration with Laravel validation
- Add button feature for dynamic element addition
- Responsive design for mobile and desktop

## Requirements

- PHP 8.1 or higher
- Laravel 10.x or 12.x
- Node.js and NPM for frontend assets

## Installation

### 1. Install the package via Composer

```bash
composer require incodiy/realments
```

### 2. Publish the package assets

```bash
php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-assets"
```

### 3. Publish the configuration file (optional)

```bash
php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-config"
```

### 4. Publish the language files (optional)

```bash
php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-lang"
```

### 5. Add the Realments facade to your `config/app.php` file (Laravel 10 only)

```php
'aliases' => [
    // ...
    'Realments' => Incodiy\Realments\Facades\Realments::class,
],
```

## Basic Usage

### Form Open and Close

```php
// In your controller
public function create()
{
    $form = app('realments');
    
    // Open form
    $form->open([
        'action' => route('users.store'),
        'method' => 'POST',
        'files' => true, // If you need file uploads
        'css_framework' => 'bootstrap', // Options: bootstrap, tailwind, bulma
        'theme_mode' => 'light' // Options: light, dark
    ]);
    
    // Add form elements here...
    
    // Close form with submit button
    $form->close('Submit');
    
    // Render the form
    return view('users.create', [
        'form' => $form->render()
    ]);
}
```

### Select Box

```php
// Basic select box
$form->select('country', [
    'Select a country', // First option is empty by default
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
]);

// Select box with selected value
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

// Select box with add button
$form->select('skills', [
    'Select a skill',
    'php' => 'PHP',
    'js' => 'JavaScript',
    'python' => 'Python'
], [
    'add_button' => true,
    'max_additions' => 5,
    'button_position' => 'right', // Options: right, bottom
    'button_text' => 'Add Skill',
    'button_class' => 'btn btn-sm btn-secondary',
    'added_items' => [
        ['php'], // First added item with PHP selected
        ['js']   // Second added item with JavaScript selected
    ]
]);
```

### Text Input

```php
// Basic text input
$form->text('name', 'John Doe');

// Text input with attributes
$form->text('name', 'John Doe', [
    'placeholder' => 'Enter your name',
    'class' => 'custom-class',
    'required' => true
]);

// Text input with validation rules
$form->text('email', 'john@example.com')
    ->rules('required|email');
```

### Textarea

```php
// Basic textarea
$form->textarea('description', 'Lorem ipsum dolor sit amet');

// Textarea with WYSIWYG editor
$form->textarea('content', '<p>Hello World</p>', [
    'wysiwyg' => true,
    'editor' => 'tinymce', // Options: tinymce, ckeditor, quill
    'editor_config' => [
        'height' => 300,
        'plugins' => 'link image code'
    ]
]);
```

### Checkbox, Radio, and Switch

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

### Password, Email, and Number

```php
// Password input
$form->password('password');

// Email input
$form->email('email', 'john@example.com');

// Number input
$form->number('age', 25, [
    'min' => 18,
    'max' => 100
]);
```

### Date, Time, and DateTime

```php
// Date input
$form->date('birth_date', '1990-01-01');

// Time input
$form->time('meeting_time', '14:30');

// DateTime input
$form->datetime('appointment', '2023-05-15T14:30');

// Date range
$form->dateRange('vacation', ['2023-06-01', '2023-06-15']);
```

### File Upload

```php
// Basic file upload
$form->file('document');

// File upload with thumbnail preview
$form->file('profile_picture', [
    'thumbnail' => true,
    'thumbnail_size' => 150,
    'thumbnail_position' => 'top', // Options: top, bottom
    'accept' => 'image/*'
]);
```

### Hidden Input

```php
$form->hidden('user_id', 123);
```

### Range, Color, Tags, and RichText

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

### Captcha and Autocomplete

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

## Advanced Usage

### Validation

```php
// Server-side validation in controller
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);
    
    // If validation fails, errors will be automatically displayed in the form
    
    // Process the form...
}

// Client-side validation in form builder
$form->text('name')
    ->rules('required|max:255');

$form->email('email')
    ->rules('required|email');

$form->password('password')
    ->rules('required|min:8');
```

### Internationalization (i18n)

```php
// In config/realments.php
'i18n' => [
    'default_locale' => 'en',
    'fallback_locale' => 'en',
    'available_locales' => ['en', 'id', 'es', 'fr'],
],

// In controller
$form->open([
    'locale' => 'id' // Set the form language
]);
```

### CSS Framework Customization

```php
// In config/realments.php
'default_css_framework' => 'bootstrap',

// In controller
$form->open([
    'css_framework' => 'tailwind'
]);
```

### Theme Mode

```php
// In config/realments.php
'default_theme_mode' => 'light',

// In controller
$form->open([
    'theme_mode' => 'dark'
]);
```

## Documentation

For full documentation, visit our [GitHub Pages](https://incodiy.github.io/realments/).

## Testing

```bash
composer test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email info@incodiy.com instead of using the issue tracker.

## Credits

- [Incodiy](https://github.com/incodiy)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
