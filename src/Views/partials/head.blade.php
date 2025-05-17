@php
// Generate a unique container ID if not provided
$containerId = $containerId ?? 'realments-form-' . uniqid();

// Ensure all required variables are available with defaults
$elements = $elements ?? '[]';
$errors = $errors ?? '{}';
$oldInput = $oldInput ?? '{}';
$cssFramework = $cssFramework ?? config('realments.default_css_framework', 'bootstrap');
$themeMode = $themeMode ?? config('realments.default_theme_mode', 'light');
@endphp

<!-- Load CSS Framework based on configuration -->
@if($cssFramework === 'bootstrap')
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
@elseif($cssFramework === 'bulma')
    <link href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" rel="stylesheet">
@elseif($cssFramework === 'tailwind')
    <script src="https://cdn.tailwindcss.com"></script>
@endif

<!-- Load React -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/i18next@23.7.0/dist/umd/i18next.min.js" crossorigin></script>
<script src="https://unpkg.com/react-i18next@13.5.0/dist/umd/react-i18next.min.js" crossorigin></script>

<!-- Load Realments assets -->
@vite(['resources/js/vendor/incodiy/realments/index.jsx'])
