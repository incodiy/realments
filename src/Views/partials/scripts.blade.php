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

<div id="{{ $containerId }}"></div>

<script>
    // Pass data from Laravel to React
    window.realmentsData = {
        containerId: "{{ $containerId }}",
        elements: {!! $elements !!},
        errors: {!! $errors !!},
        oldInput: {!! $oldInput !!},
        cssFramework: "{{ $cssFramework }}",
        themeMode: "{{ $themeMode }}"
    };
</script>

<!-- Load additional scripts if needed -->
@if($cssFramework === 'bootstrap')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
@endif
