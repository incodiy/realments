import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    <Router>
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
          <h2 className="h4 mb-3">2. Publish Assets</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-assets"
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">3. Publish Configuration (Optional)</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-config"
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">4. Publish Language Files (Optional)</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            php artisan vendor:publish --provider="Incodiy\Realments\Providers\RealmentsServiceProvider" --tag="realments-lang"
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">5. Add Facade to config/app.php (Laravel 10 only)</h2>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`'aliases' => [
    // ...
    'Realments' => Incodiy\\Realments\\Facades\\Realments::class,
],`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">6. Install NPM Dependencies</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            npm install
          </SyntaxHighlighter>
          <p className="mt-3">Or if you're using Yarn:</p>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            yarn install
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">7. Build Assets</h2>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            npm run build
          </SyntaxHighlighter>
          <p className="mt-3">Or if you're using Yarn:</p>
          <SyntaxHighlighter language="bash" style={codeStyle}>
            yarn build
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">8. Include Partials in Your Layout</h2>
          <p>In your blade layout file, include the Realments partials:</p>
          <SyntaxHighlighter language="html" style={codeStyle}>
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your App</title>
    
    <!-- Include Realments head partial -->
    <x-realments-head />
    
    <!-- Your other head content -->
</head>
<body>
    <!-- Your content -->
    
    <!-- Include Realments scripts partial -->
    <x-realments-scripts />
    
    <!-- Your other scripts -->
</body>
</html>`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="alert alert-info">
        <h4 className="alert-heading">Laravel Version Compatibility</h4>
        <p>Realments supports Laravel versions 10.x, 11.x, and 12.x. The installation process is slightly different for each version:</p>
        <ul>
          <li><strong>Laravel 10.x:</strong> You need to manually add the Facade to <code>config/app.php</code></li>
          <li><strong>Laravel 11.x and 12.x:</strong> The package is automatically discovered, no need to add the Facade manually</li>
        </ul>
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
{`// In your controller
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
    
    // Add form elements
    $form->text('name', 'John Doe', [
        'placeholder' => 'Enter your name',
        'required' => true
    ])->rules('required|max:255');
    
    $form->email('email', 'john@example.com')
        ->rules('required|email');
    
    // Close form with submit button
    $form->close('Submit');
    
    // Render the form
    return view('users.create', [
        'form' => $form->render()
    ]);
}`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">In Your Blade View</h2>
          <p>In your blade view, simply output the form variable:</p>
          <SyntaxHighlighter language="html" style={codeStyle}>
{`<!-- users/create.blade.php -->
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
          <h2 className="h4 mb-3">Form Elements</h2>
          <p>Realments provides a wide range of form elements. Here are some examples:</p>
          
          <h5 className="mt-4">Text Input</h5>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Basic text input
$form->text('name', 'John Doe');

// With attributes
$form->text('name', 'John Doe', [
    'placeholder' => 'Enter your name',
    'class' => 'custom-class',
    'required' => true
]);

// With validation rules
$form->text('email', 'john@example.com')
    ->rules('required|email');`}
          </SyntaxHighlighter>
          
          <h5 className="mt-4">Select Box</h5>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Basic select
$form->select('country', [
    'Select a country', // First option is empty by default
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
]);

// With selected value
$form->select('country', [
    'Select a country',
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
], [
    'selected' => 'usa'
]);

// Multi-select
$form->select('countries', [
    'Select countries',
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
], [
    'multiselect' => true,
    'selected' => ['usa', 'uk']
]);`}
          </SyntaxHighlighter>
          
          <h5 className="mt-4">Checkbox and Radio</h5>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Checkbox
$form->checkbox('agree_terms', '1', true, [
    'label' => 'I agree to the terms and conditions'
]);

// Radio buttons
$form->radio('gender', [
    'male' => 'Male',
    'female' => 'Female',
    'other' => 'Other'
], 'male');`}
          </SyntaxHighlighter>
          
          <h5 className="mt-4">Date and Time</h5>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Date input
$form->date('birth_date', '1990-01-01');

// Time input
$form->time('meeting_time', '14:30');

// DateTime input
$form->datetime('appointment', '2023-05-15T14:30');

// Date range
$form->dateRange('vacation', ['2023-06-01', '2023-06-15']);`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Handling Form Submission</h2>
          <p>In your controller's store method, you can use Laravel's validation system:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'country' => 'required',
        'agree_terms' => 'required',
    ]);
    
    // Create user or perform other actions
    User::create($validated);
    
    return redirect()->route('users.index')
        ->with('success', 'User created successfully!');
}`}
          </SyntaxHighlighter>
          <p>If validation fails, Laravel will automatically redirect back with errors, and Realments will display them next to the corresponding form elements.</p>
        </div>
      </div>
      
      <div className="alert alert-info">
        <h4 className="alert-heading">Advanced Usage</h4>
        <p>Check out the <Link to="/components">Components</Link> and <Link to="/api">API</Link> sections for more detailed information on all available form elements and their options.</p>
      </div>
    </div>
  );
};

const Components = ({ darkMode }) => {
  const codeStyle = darkMode ? vscDarkPlus : vs;
  const [activeComponent, setActiveComponent] = React.useState('text');
  
  const components = [
    { id: 'text', name: 'Text Input' },
    { id: 'textarea', name: 'Textarea' },
    { id: 'select', name: 'Select' },
    { id: 'checkbox', name: 'Checkbox' },
    { id: 'radio', name: 'Radio' },
    { id: 'switch', name: 'Switch' },
    { id: 'password', name: 'Password' },
    { id: 'email', name: 'Email' },
    { id: 'number', name: 'Number' },
    { id: 'date', name: 'Date' },
    { id: 'time', name: 'Time' },
    { id: 'datetime', name: 'DateTime' },
    { id: 'daterange', name: 'Date Range' },
    { id: 'file', name: 'File Upload' },
    { id: 'hidden', name: 'Hidden' },
    { id: 'range', name: 'Range' },
    { id: 'color', name: 'Color' },
    { id: 'tags', name: 'Tags' },
    { id: 'richtext', name: 'Rich Text' },
    { id: 'captcha', name: 'Captcha' },
    { id: 'autocomplete', name: 'Autocomplete' }
  ];
  
  const componentExamples = {
    text: {
      title: 'Text Input',
      description: 'A standard text input field for single-line text entry.',
      code: `$form->text('name', 'John Doe', [
    'placeholder' => 'Enter your name',
    'required' => true
])->rules('required|max:255');`
    },
    textarea: {
      title: 'Textarea',
      description: 'A multi-line text input area, optionally with WYSIWYG editor.',
      code: `// Basic textarea
$form->textarea('description', 'Lorem ipsum dolor sit amet', [
    'rows' => 5
]);

// With WYSIWYG editor
$form->textarea('content', '<p>Hello World</p>', [
    'wysiwyg' => true,
    'editor' => 'tinymce', // Options: tinymce, ckeditor, quill
    'editor_config' => [
        'height' => 300,
        'plugins' => 'link image code'
    ]
]);`
    },
    select: {
      title: 'Select',
      description: 'A dropdown select element with options, supporting single and multiple selection.',
      code: `// Basic select
$form->select('country', [
    'Select a country', // First option is empty by default
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
]);

// With selected value
$form->select('country', [
    'Select a country',
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
], [
    'selected' => 'usa'
]);

// Multi-select
$form->select('countries', [
    'Select countries',
    'usa' => 'United States',
    'canada' => 'Canada',
    'uk' => 'United Kingdom'
], [
    'multiselect' => true,
    'selected' => ['usa', 'uk']
]);

// With add button
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
        ['php'], // First item with PHP selected
        ['js']   // Second item with JavaScript selected
    ]
]);`
    },
    // Add more component examples here...
  };
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Components</h1>
      
      <div className="row">
        <div className="col-md-3">
          <div className="list-group components-nav sticky-top">
            {components.map(component => (
              <button
                key={component.id}
                className={`list-group-item list-group-item-action ${activeComponent === component.id ? 'active' : ''}`}
                onClick={() => setActiveComponent(component.id)}
              >
                {component.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="col-md-9">
          {componentExamples[activeComponent] ? (
            <div className="component-section">
              <h2>{componentExamples[activeComponent].title}</h2>
              <p>{componentExamples[activeComponent].description}</p>
              
              <div className="card mb-4">
                <div className="card-header">Example</div>
                <div className="card-body">
                  <SyntaxHighlighter language="php" style={codeStyle}>
                    {componentExamples[activeComponent].code}
                  </SyntaxHighlighter>
                </div>
              </div>
              
              {/* Add more details, options, etc. for each component */}
            </div>
          ) : (
            <div className="alert alert-info">
              Component documentation is being developed. Please check back soon.
            </div>
          )}
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
          <h2 className="h4 mb-3">Form Builder</h2>
          <p>The main class for building forms is <code>FormBuilder</code>. You can access it through the service container or the Facade:</p>
          <SyntaxHighlighter language="php" style={codeStyle}>
{`// Using service container
$form = app('realments');

// Using Facade (Laravel 10 only)
use Incodiy\\Realments\\Facades\\Realments;
$form = Realments::make();`}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className="accordion" id="apiAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              open(array $attributes = [])
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#apiAccordion">
            <div className="accordion-body">
              <p>Opens a form with the specified attributes.</p>
              <h5>Parameters</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$attributes</td>
                    <td>array</td>
                    <td>
                      <p>Form attributes and settings:</p>
                      <ul>
                        <li><code>id</code>: Form ID (optional, auto-generated if not provided)</li>
                        <li><code>method</code>: HTTP method (GET, POST, PUT, DELETE)</li>
                        <li><code>action</code>: Form submission URL</li>
                        <li><code>enctype</code>: Form encoding type</li>
                        <li><code>files</code>: Whether form includes file uploads (boolean)</li>
                        <li><code>css_framework</code>: CSS framework to use (bootstrap, tailwind, bulma)</li>
                        <li><code>theme_mode</code>: Theme mode (light, dark)</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5>Example</h5>
              <SyntaxHighlighter language="php" style={codeStyle}>
{`$form->open([
    'action' => route('users.store'),
    'method' => 'POST',
    'files' => true,
    'css_framework' => 'bootstrap',
    'theme_mode' => 'light'
]);`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              close($submitText = 'Submit', array $attributes = [])
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#apiAccordion">
            <div className="accordion-body">
              <p>Closes a form and optionally adds a submit button.</p>
              <h5>Parameters</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$submitText</td>
                    <td>string|null</td>
                    <td>Text for the submit button, or null to omit button</td>
                  </tr>
                  <tr>
                    <td>$attributes</td>
                    <td>array</td>
                    <td>Additional attributes for the submit button</td>
                  </tr>
                </tbody>
              </table>
              <h5>Example</h5>
              <SyntaxHighlighter language="php" style={codeStyle}>
{`// With default submit button
$form->close();

// With custom submit button text
$form->close('Save User');

// With custom attributes
$form->close('Submit', [
    'class' => 'btn btn-lg btn-success'
]);

// Without submit button
$form->close(null);`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        
        {/* Add more API documentation items here */}
      </div>
    </div>
  );
};

// Initialize the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
