<?php
// Generate a unique container ID if not provided
$containerId = $containerId ?? 'realments-form-' . uniqid();

// Ensure all required variables are available with defaults
$elements = @json($elements) ?? '[]';
$errors = @json($errors) ?? '{}';
$oldInput = @json($oldInput) ?? '{}';
$cssFramework = $cssFramework ?? config('realments.default_css_framework', 'bootstrap');
$themeMode = $themeMode ?? config('realments.default_theme_mode', 'light');
?>

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
