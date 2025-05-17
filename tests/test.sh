#!/bin/bash

# Test script for Incodiy Realments package

echo "Running tests for Incodiy Realments package..."

# Create test Laravel project
mkdir -p /home/ubuntu/test-realments
cd /home/ubuntu/test-realments

# Initialize test environment
echo "Setting up test environment..."

# Create test files
mkdir -p app/Http/Controllers
mkdir -p resources/views

# Create test controller
cat > app/Http/Controllers/TestController.php << 'EOL'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Incodiy\Realments\Facades\Realments;

class TestController extends Controller
{
    public function index()
    {
        $form = app('realments');
        
        // Open form
        $form->open([
            'action' => '/test/submit',
            'method' => 'POST',
            'files' => true,
            'css_framework' => 'bootstrap',
            'theme_mode' => 'light'
        ]);
        
        // Test text input
        $form->text('name', 'John Doe', [
            'placeholder' => 'Enter your name',
            'required' => true
        ])->rules('required|max:255');
        
        // Test email input
        $form->email('email', 'john@example.com')
            ->rules('required|email');
        
        // Test select input
        $form->select('country', [
            'Select a country',
            'usa' => 'United States',
            'canada' => 'Canada',
            'uk' => 'United Kingdom'
        ]);
        
        // Test textarea
        $form->textarea('description', 'Lorem ipsum dolor sit amet', [
            'rows' => 5
        ]);
        
        // Test checkbox
        $form->checkbox('agree_terms', '1', true, [
            'label' => 'I agree to the terms and conditions'
        ]);
        
        // Test radio
        $form->radio('gender', [
            'male' => 'Male',
            'female' => 'Female',
            'other' => 'Other'
        ], 'male');
        
        // Test date input
        $form->date('birth_date', '1990-01-01');
        
        // Test file upload
        $form->file('profile_picture', [
            'thumbnail' => true,
            'thumbnail_size' => 150,
            'thumbnail_position' => 'top',
            'accept' => 'image/*'
        ]);
        
        // Test rich text
        $form->richText('content', '<p>Hello World</p>', [
            'editor' => 'tinymce'
        ]);
        
        // Close form
        $form->close('Submit');
        
        // Render the form
        return view('test', [
            'form' => $form->render()
        ]);
    }
    
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'country' => 'required',
            'agree_terms' => 'required',
        ]);
        
        return redirect()->back()->with('success', 'Form submitted successfully!');
    }
}
EOL

# Create test view
cat > resources/views/test.blade.php << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realments Test</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container py-5">
        <h1>Realments Test Form</h1>
        
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        
        {!! $form !!}
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
EOL

echo "Test files created successfully."
echo "To run the test, you would need to:"
echo "1. Create a new Laravel project"
echo "2. Install the Incodiy Realments package"
echo "3. Copy the test files to the appropriate directories"
echo "4. Set up routes for the test controller"
echo "5. Run the Laravel application and access the test route"

echo "Test script completed."
