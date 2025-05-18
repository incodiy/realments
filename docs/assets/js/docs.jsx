import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Components
const App = () => {
  const [darkMode, setDarkMode] = React.useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router basename="/incodiy-realments">
      <div className="app-container">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/installation" element={<Installation darkMode={darkMode} />} />
            <Route path="/usage" element={<Usage darkMode={darkMode} />} />
            <Route path="/components" element={<Components darkMode={darkMode} />} />
            <Route path="/api" element={<API darkMode={darkMode} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const Header = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">Realments</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/installation' ? 'active' : ''}`} 
                  to="/installation"
                >
                  Installation
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/usage' ? 'active' : ''}`} 
                  to="/usage"
                >
                  Usage
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/components' ? 'active' : ''}`} 
                  to="/components"
                >
                  Components
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/api' ? 'active' : ''}`} 
                  to="/api"
                >
                  API
                </Link>
              </li>
            </ul>
            
            <div className="d-flex">
              <button 
                id="theme-toggle" 
                className="btn btn-link" 
                onClick={() => setDarkMode(!darkMode)}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              <a 
                href="https://github.com/incodiy/realments" 
                className="btn btn-outline-primary ms-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github me-2"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">© 2025 Incodiy. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="social-links">
              <a href="https://github.com/incodiy/realments" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/incodiy" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com/company/incodiy" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = ({ darkMode }) => {
  const codeStyle = darkMode ? vscDarkPlus : vs;
  
  const codeExample = `// In your Laravel controller
public function create()
{
    $form = app('realments');
    
    // Open form
    $form->open([
        'action' => route('users.store'),
        'method' => 'POST',
        'files' => true,
        'css_framework' => 'bootstrap',
        'theme_mode' => 'light'
    ]);
    
    // Add text input
    $form->text('name', 'John Doe', [
        'placeholder' => 'Enter your name',
        'required' => true
    ])->rules('required|max:255');
    
    // Add email input
    $form->email('email', 'john@example.com')
        ->rules('required|email');
    
    // Add select input
    $form->select('country', [
        'Select a country',
        'usa' => 'United States',
        'canada' => 'Canada',
        'uk' => 'United Kingdom'
    ]);
    
    // Close form with submit button
    $form->close('Submit');
    
    // Render the form
    return view('users.create', [
        'form' => $form->render()
    ]);
}`;

  return (
    <div className="container">
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">Realments</h1>
          <p className="lead mb-4">
            A powerful Laravel and React form elements package for easy form creation
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/installation" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <a 
              href="https://github.com/incodiy/realments" 
              className="btn btn-outline-secondary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github me-2"></i>
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="section-title">Create Beautiful Forms with Ease</h2>
              <p className="section-subtitle">
                Realments simplifies form creation in Laravel with a clean, intuitive API
              </p>
              <p>
                With Realments, you can create complex forms with just a few lines of code in your Laravel controller.
                The package handles all the heavy lifting, from rendering form elements to validation and error handling.
              </p>
              <div className="mt-4">
                <Link to="/installation" className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="code-preview">
                <SyntaxHighlighter language="php" style={codeStyle}>
                  {codeExample}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-layer-group"></i>
                </div>
                <h3>Multiple CSS Frameworks</h3>
                <p>
                  Support for Bootstrap, Tailwind CSS, and Bulma out of the box.
                  Easily switch between frameworks with a single configuration option.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-moon"></i>
                </div>
                <h3>Dark Mode Support</h3>
                <p>
                  Built-in support for light and dark themes. Switch between themes
                  with a simple configuration option.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Internationalization</h3>
                <p>
                  Full i18n support for multi-language applications. Easily translate
                  form labels, placeholders, and error messages.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Client & Server Validation</h3>
                <p>
                  Integrated validation on both client and server sides. Seamlessly
                  works with Laravel's validation system.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-puzzle-piece"></i>
                </div>
                <h3>Rich Component Library</h3>
                <p>
                  Over 20 form components including text, select, checkbox, radio,
                  date, file upload, rich text editor, and more.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Responsive Design</h3>
                <p>
                  All components are fully responsive and work great on mobile,
                  tablet, and desktop devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Getting Started</h2>
          <div className="installation-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Install the Package</h4>
                <div className="code-block">
                  <SyntaxHighlighter language="bash" style={codeStyle}>
                    composer require incodiy/realments
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Install Frontend Dependencies</h4>
                <div className="code-block">
                  <SyntaxHighlighter language="bash" style={codeStyle}>
                    npm install
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Publish Assets</h4>
                <div className="code-block">
                  <SyntaxHighlighter language="bash" style={codeStyle}>
                    php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-assets"
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Build Assets</h4>
                <div className="code-block">
                  <SyntaxHighlighter language="bash" style={codeStyle}>
                    npm run build
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/installation" className="btn btn-primary">
              View Full Installation Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Installation = ({ darkMode }) => {
  const codeStyle = darkMode ? vscDarkPlus : vs;
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Installation</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Requirements</h2>
          <ul>
            <li>PHP 8.1 or higher</li>
            <li>Laravel 10.x, 11.x, or 12.x</li>
            <li>Node.js and NPM for asset frontend</li>
          </ul>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">1. Install via Composer</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            composer require incodiy/realments
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">2. Install NPM Dependencies</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            npm install
          </SyntaxHighlighter>
          <p className="mt-3">This will install all the required frontend dependencies including React.</p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">3. Publish Assets</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-assets"
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">4. Publish Configuration (Optional)</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-config"
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">5. Publish Language Files (Optional)</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-lang"
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">6. Add Facade to config/app.php (Laravel 10 only)</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`'aliases' => [
    // Other aliases
    'Realments' => Incodiy\\Realments\\Facades\\Realments::class,
],`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">7. Build Assets</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            npm run build
          </SyntaxHighlighter>
          <p className="mt-3">This will compile all the React components and other assets.</p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">8. Include Assets in Your Layout</h2>
          <p>Add the following to your layout file:</p>
          <SyntaxHighlighter language="html" style={codeStyle}>
{`<!-- In your blade layout file -->
<head>
    <!-- Other head elements -->
    <x-realments-head />
</head>
<body>
    <!-- Your content -->
    
    <!-- Before closing body tag -->
    <x-realments-scripts />
</body>`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

const Usage = ({ darkMode }) => {
  const codeStyle = darkMode ? vscDarkPlus : vs;
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Usage</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Basic Usage</h2>
          <p>Here's a basic example of how to use Realments in your Laravel controller:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class UserController extends Controller
{
    public function create()
    {
        $form = app('realments');
        
        // Open form
        $form->open([
            'action' => route('users.store'),
            'method' => 'POST',
            'files' => true,
            'css_framework' => 'bootstrap', // Options: bootstrap, tailwind, bulma
            'theme_mode' => 'light' // Options: light, dark
        ]);
        
        // Add form elements
        $form->text('name', null, [
            'placeholder' => 'Enter your name',
            'required' => true
        ])->rules('required|max:255');
        
        $form->email('email', null, [
            'placeholder' => 'Enter your email'
        ])->rules('required|email|unique:users');
        
        $form->password('password', [
            'placeholder' => 'Enter your password'
        ])->rules('required|min:8');
        
        $form->select('country', [
            'Select a country',
            'usa' => 'United States',
            'canada' => 'Canada',
            'uk' => 'United Kingdom'
        ]);
        
        // Close form with submit button
        $form->close('Register');
        
        // Render the form
        return view('users.create', [
            'form' => $form->render()
        ]);
    }
    
    public function store(Request \$request)
    {
        // Validate the request
        \$validated = \$request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'country' => 'required'
        ]);
        
        // Create the user
        // ...
        
        return redirect()->route('users.index')
            ->with('success', 'User created successfully.');
    }
}`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">In Your Blade View</h2>
          <p>In your blade view, simply echo the form variable:</p>
          <SyntaxHighlighter language="html" style={codeStyle}>
{`<!-- resources/views/users/create.blade.php -->
@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Create User</h1>
        
        {!! $form !!}
    </div>
@endsection`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Using the Facade</h2>
          <p>You can also use the Realments facade:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Realments;

class UserController extends Controller
{
    public function create()
    {
        // Open form
        Realments::open([
            'action' => route('users.store'),
            'method' => 'POST'
        ]);
        
        // Add form elements
        Realments::text('name');
        Realments::email('email');
        
        // Close form
        Realments::close('Submit');
        
        // Render the form
        return view('users.create', [
            'form' => Realments::render()
        ]);
    }
}`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

const Components = ({ darkMode }) => {
  const codeStyle = darkMode ? vscDarkPlus : vs;
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Form Components</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Text Input</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Basic text input
$form->text('name', 'John Doe', [
    'placeholder' => 'Enter your name',
    'required' => true
]);

// With validation rules
$form->text('username')->rules('required|alpha_dash|min:3|max:20');`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Textarea</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Basic textarea
$form->textarea('description', 'Default text', [
    'rows' => 5,
    'placeholder' => 'Enter description'
]);

// With WYSIWYG editor
$form->textarea('content', null, [
    'wysiwyg' => true,
    'editor' => 'ckeditor', // Options: tinymce, ckeditor, quill
    'rows' => 10
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Select Dropdown</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Basic select
$form->select('country', [
    'Select a country', // First option is placeholder
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
]);

// Multi-select
$form->select('skills', [
    'php' => 'PHP',
    'js' => 'JavaScript',
    'python' => 'Python',
    'ruby' => 'Ruby'
], [
    'multiselect' => true,
    'selected' => ['php', 'js'] // Pre-selected values
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Checkbox</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Single checkbox
$form->checkbox('remember_me', '1', true, [
    'label' => 'Remember me'
]);

// Custom label
$form->checkbox('terms', 'accepted', false, [
    'label' => 'I agree to the <a href="/terms">Terms and Conditions</a>'
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Radio Buttons</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Radio buttons
$form->radio('gender', [
    'male' => 'Male',
    'female' => 'Female',
    'other' => 'Other'
], 'male'); // Default selected value`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Switch</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Switch toggle
$form->switch('notifications', '1', true, [
    'label' => 'Enable notifications'
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Date & Time Inputs</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Date input
$form->date('birth_date', '1990-01-01', [
    'min' => '1900-01-01',
    'max' => date('Y-m-d')
]);

// Time input
$form->time('appointment_time', '14:30', [
    'min' => '09:00',
    'max' => '18:00'
]);

// Date and time input
$form->datetime('event_datetime', '2023-12-31T23:59', [
    'min' => '2023-01-01T00:00',
    'max' => '2024-12-31T23:59'
]);

// Date range
$form->dateRange('vacation_period', ['2023-07-01', '2023-07-15'], [
    'separator' => 'to'
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">File Upload</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Basic file upload
$form->file('document', [
    'accept' => '.pdf,.doc,.docx'
]);

// Image upload with thumbnail preview
$form->file('profile_picture', [
    'accept' => 'image/*',
    'thumbnail' => true,
    'thumbnail_size' => 150,
    'thumbnail_position' => 'top' // Options: top, right, bottom, left
]);

// Multiple file upload
$form->file('gallery', [
    'multiple' => true,
    'accept' => 'image/*',
    'thumbnail' => true
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Other Input Types</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Email input
$form->email('email', 'user@example.com');

// Password input
$form->password('password');

// Number input
$form->number('quantity', 1, [
    'min' => 1,
    'max' => 100,
    'step' => 1
]);

// Hidden input
$form->hidden('user_id', 123);

// Range slider
$form->range('rating', 50, [
    'min' => 0,
    'max' => 100,
    'step' => 5,
    'show_value' => true
]);

// Color picker
$form->color('theme_color', '#3490dc', [
    'show_hex' => true
]);

// Tags input
$form->tags('keywords', ['laravel', 'php'], [
    'suggestions' => ['laravel', 'php', 'react', 'javascript', 'css', 'html'],
    'max_tags' => 10
]);

// Rich text editor
$form->richText('article_content', '<p>Default content</p>', [
    'editor' => 'tinymce', // Options: tinymce, ckeditor, quill
    'height' => 400
]);

// Captcha
$form->captcha('verification', [
    'captcha_type' => 'image' // Options: image, math, recaptcha
]);

// Autocomplete
$form->autocomplete('city', null, [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'
], [
    'min_chars' => 2,
    'max_suggestions' => 5
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

const API = ({ darkMode }) => {
  const codeStyle = darkMode ? vscDarkPlus : vs;
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">API Reference</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Form Methods</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>open(array $attributes = [])</code></td>
                <td>Opens a new form with the specified attributes.</td>
              </tr>
              <tr>
                <td><code>close(string $submitText = 'Submit', array $attributes = [])</code></td>
                <td>Closes the form and optionally adds a submit button.</td>
              </tr>
              <tr>
                <td><code>render()</code></td>
                <td>Renders the form and returns the HTML.</td>
              </tr>
              <tr>
                <td><code>rules(string|array $rules, array $messages = [])</code></td>
                <td>Sets validation rules for the most recently added element.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Form Open Attributes</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`$form->open([
    'id' => 'my-form', // Form ID (optional, auto-generated if not provided)
    'method' => 'POST', // HTTP method (GET, POST, PUT, DELETE)
    'action' => route('users.store'), // Form submission URL
    'enctype' => 'multipart/form-data', // Form encoding type
    'files' => true, // Whether form includes file uploads (boolean)
    'css_framework' => 'bootstrap', // CSS framework to use (bootstrap, tailwind, bulma)
    'theme_mode' => 'light', // Theme mode (light, dark)
    'class' => 'my-custom-form-class' // Additional CSS classes
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Common Element Attributes</h2>
          <p>These attributes are common to most form elements:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`$form->text('name', 'Default value', [
    'id' => 'custom-id', // Element ID (optional, auto-generated if not provided)
    'label' => 'Custom Label', // Custom label text or false to hide label
    'placeholder' => 'Enter your name', // Placeholder text
    'required' => true, // Whether field is required (boolean)
    'disabled' => false, // Whether field is disabled (boolean)
    'readonly' => false, // Whether field is readonly (boolean)
    'class' => 'custom-class', // Additional CSS classes
    'data-*' => 'value' // Custom data attributes
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Validation Rules</h2>
          <p>You can set validation rules for any form element:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// String format
$form->text('username')->rules('required|alpha_dash|min:3|max:20');

// Array format
$form->email('email')->rules([
    'required',
    'email',
    'unique:users,email'
]);

// With custom error messages
$form->password('password')->rules('required|min:8', [
    'required' => 'The password field is required.',
    'min' => 'The password must be at least :min characters.'
]);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Configuration</h2>
          <p>You can publish and modify the configuration file:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// config/realments.php
return [
    /*
    |--------------------------------------------------------------------------
    | Default CSS Framework
    |--------------------------------------------------------------------------
    |
    | This option controls the default CSS framework that will be used for
    | all form elements. Supported: "bootstrap", "tailwind", "bulma".
    |
    */
    'default_css_framework' => 'bootstrap',

    /*
    |--------------------------------------------------------------------------
    | Default Theme Mode
    |--------------------------------------------------------------------------
    |
    | This option controls the default theme mode that will be used for
    | all form elements. Supported: "light", "dark".
    |
    */
    'default_theme_mode' => 'light',

    /*
    |--------------------------------------------------------------------------
    | reCAPTCHA Site Key
    |--------------------------------------------------------------------------
    |
    | This option specifies the reCAPTCHA site key for the captcha element.
    |
    */
    'recaptcha_site_key' => env('RECAPTCHA_SITE_KEY', ''),

    /*
    |--------------------------------------------------------------------------
    | WYSIWYG Editor Default
    |--------------------------------------------------------------------------
    |
    | This option controls the default WYSIWYG editor that will be used for
    | textarea elements with WYSIWYG enabled. Supported: "tinymce", "ckeditor", "quill".
    |
    */
    'wysiwyg_editor_default' => 'tinymce',
];`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
