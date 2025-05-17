<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realments Form</title>
    
    <!-- Load React -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    
    <!-- Load CSS Framework based on configuration -->
    @if(config('realments.default_css_framework') === 'bootstrap')
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    @elseif(config('realments.default_css_framework') === 'bulma')
        <link href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" rel="stylesheet">
    @endif
    
    <!-- Load Tailwind if needed -->
    @if(config('realments.default_css_framework') === 'tailwind')
        <script src="https://cdn.tailwindcss.com"></script>
    @endif
</head>
<body>
    <div id="{{ $containerId }}"></div>
    
    <script>
        // Pass data from Laravel to React
        window.realmentsData = {
            elements: {!! $elements !!},
            errors: {!! $errors !!},
            oldInput: {!! $oldInput !!},
            cssFramework: "{{ $cssFramework }}",
            themeMode: "{{ $themeMode }}"
        };
    </script>
    
    <!-- Load React components -->
    <script src="{{ asset('vendor/incodiy/realments/js/realments.js') }}"></script>
</body>
</html>
