<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realments Form</title>
    
    @include('realments::partials.head')
</head>
<body>
    @if(isset($form))
    {!! $form !!}
    @endif
    <!-- @include('realments::partials.scripts') -->
</body>
</html>
