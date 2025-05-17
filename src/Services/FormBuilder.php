<?php

namespace Incodiy\Realments\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

/**
 * FormBuilder Class
 * 
 * Main class for building form elements with Laravel and React integration.
 * This class provides methods to create various form elements with simple syntax
 * and handles the rendering of these elements using React components.
 * 
 * @package Incodiy\Realments\Services
 */
class FormBuilder
{
    /**
     * Form elements collection
     * 
     * @var array
     */
    protected $elements = [];
    
    /**
     * Current form ID
     * 
     * @var string
     */
    protected $formId;
    
    /**
     * Form attributes
     * 
     * @var array
     */
    protected $formAttributes = [];
    
    /**
     * Form method
     * 
     * @var string
     */
    protected $method = 'POST';
    
    /**
     * Form action URL
     * 
     * @var string
     */
    protected $action = '';
    
    /**
     * Form enctype
     * 
     * @var string
     */
    protected $enctype = 'application/x-www-form-urlencoded';
    
    /**
     * Current element being built
     * 
     * @var array|null
     */
    protected $currentElement = null;
    
    /**
     * CSS Framework
     * 
     * @var string
     */
    protected $cssFramework = 'bootstrap';
    
    /**
     * Theme mode
     * 
     * @var string
     */
    protected $themeMode = 'light';
    
    /**
     * Constructor
     * 
     * Initializes a new FormBuilder instance with default settings
     */
    public function __construct()
    {
        $this->formId = 'form_' . Str::random(8);
        $this->cssFramework = config('realments.default_css_framework', 'bootstrap');
        $this->themeMode = config('realments.default_theme_mode', 'light');
    }
    
    /**
     * Open a form
     * 
     * Creates the opening form tag with specified attributes and settings.
     *
     * @param array $attributes Form attributes and settings
     *                          - id: Form ID (optional, auto-generated if not provided)
     *                          - method: HTTP method (GET, POST, PUT, DELETE)
     *                          - action: Form submission URL
     *                          - enctype: Form encoding type
     *                          - files: Whether form includes file uploads (boolean)
     *                          - css_framework: CSS framework to use (bootstrap, tailwind, bulma)
     *                          - theme_mode: Theme mode (light, dark)
     * @return $this
     */
    public function open(array $attributes = [])
    {
        $this->elements = [];
        
        // Set form ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $this->formId;
        } else {
            $this->formId = $attributes['id'];
        }
        
        // Set form method
        if (isset($attributes['method'])) {
            $this->method = strtoupper($attributes['method']);
        }
        
        // Set form action
        if (isset($attributes['action'])) {
            $this->action = $attributes['action'];
        }
        
        // Set form enctype
        if (isset($attributes['enctype'])) {
            $this->enctype = $attributes['enctype'];
        } elseif (isset($attributes['files']) && $attributes['files']) {
            $this->enctype = 'multipart/form-data';
        }
        
        // Set CSS framework
        if (isset($attributes['css_framework'])) {
            $this->cssFramework = $attributes['css_framework'];
        }
        
        // Set theme mode
        if (isset($attributes['theme_mode'])) {
            $this->themeMode = $attributes['theme_mode'];
        }
        
        $this->formAttributes = $attributes;
        
        // Add form open element
        $this->elements[] = [
            'type' => 'form_open',
            'id' => $this->formId,
            'method' => $this->method,
            'action' => $this->action,
            'enctype' => $this->enctype,
            'attributes' => $this->formAttributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        return $this;
    }
    
    /**
     * Close a form
     * 
     * Creates the closing form tag and optionally adds a submit button.
     *
     * @param string|null $submitText Text for the submit button, or null to omit button
     * @param array $attributes Additional attributes for the submit button
     * @return $this
     */
    public function close($submitText = 'Submit', array $attributes = [])
    {
        // Add submit button if text is provided
        if ($submitText !== null) {
            $submitAttributes = array_merge([
                'type' => 'submit',
                'class' => $this->getDefaultButtonClass()
            ], $attributes);
            
            $this->elements[] = [
                'type' => 'button',
                'text' => $submitText,
                'attributes' => $submitAttributes,
                'css_framework' => $this->cssFramework,
                'theme_mode' => $this->themeMode
            ];
        }
        
        // Add form close element
        $this->elements[] = [
            'type' => 'form_close',
            'submitText' => $submitText,
            'submitAttributes' => $attributes
        ];
        
        return $this;
    }
    
    /**
     * Create a select element
     * 
     * Creates a dropdown select element with options.
     *
     * @param string $name Element name
     * @param array $values Array of options (key => value pairs)
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - multiselect: Whether multiple selection is allowed (boolean)
     *                          - selected: Pre-selected value(s) (string or array)
     *                          - add_button: Whether to show add button for dynamic additions (boolean)
     *                          - max_additions: Maximum number of additions allowed
     *                          - button_position: Position of add button (right, bottom)
     *                          - button_class: CSS class for add button
     *                          - button_text: Text for add button
     *                          - added_items: Pre-added items
     * @return $this
     */
    public function select($name, array $values, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Set ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $formattedName . '_' . Str::random(5);
        }
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Check if multiselect is enabled
        $isMultiselect = isset($attributes['multiselect']) && $attributes['multiselect'] === true;
        
        // Handle selected values
        $selectedValues = [];
        if (isset($attributes['selected'])) {
            $selectedValues = is_array($attributes['selected']) ? $attributes['selected'] : [$attributes['selected']];
        }
        
        // Handle add button feature
        $addButton = [
            'enabled' => isset($attributes['add_button']) && $attributes['add_button'] === true,
            'max' => $attributes['max_additions'] ?? 5,
            'position' => $attributes['button_position'] ?? 'right',
            'class' => $attributes['button_class'] ?? $this->getDefaultButtonClass('sm'),
            'text' => $attributes['button_text'] ?? 'Add',
            'added_items' => $attributes['added_items'] ?? []
        ];
        
        // Format options
        $options = [];
        foreach ($values as $key => $value) {
            if ($key === 0) {
                // First option is empty by default
                $options[] = [
                    'value' => '',
                    'label' => $value ?? 'Select an option',
                    'selected' => false
                ];
            } else {
                $optionValue = is_string($key) ? $key : $value;
                $optionLabel = Str::title(str_replace('_', ' ', $value));
                
                $options[] = [
                    'value' => $optionValue,
                    'label' => $optionLabel,
                    'selected' => in_array($optionValue, $selectedValues)
                ];
            }
        }
        
        // Create element data
        $element = [
            'type' => 'select',
            'name' => $formattedName,
            'label' => $labelText,
            'show_label' => $showLabel,
            'options' => $options,
            'multiselect' => $isMultiselect,
            'attributes' => $attributes,
            'add_button' => $addButton,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a text input element
     * 
     * Creates a standard text input field.
     *
     * @param string $name Element name
     * @param string $value Default value
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - placeholder: Placeholder text
     *                          - required: Whether field is required (boolean)
     *                          - class: Additional CSS classes
     * @return $this
     */
    public function text($name, $value = null, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Set ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $formattedName . '_' . Str::random(5);
        }
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Create element data
        $element = [
            'type' => 'text',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a textarea element
     * 
     * Creates a multi-line text input area, optionally with WYSIWYG editor.
     *
     * @param string $name Element name
     * @param string $value Default value
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - rows: Number of visible text rows
     *                          - wysiwyg: Whether to enable WYSIWYG editor (boolean)
     *                          - editor: WYSIWYG editor type (tinymce, ckeditor, quill)
     *                          - editor_config: Configuration options for the editor
     * @return $this
     */
    public function textarea($name, $value = null, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Set ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $formattedName . '_' . Str::random(5);
        }
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Check if WYSIWYG editor is enabled
        $wysiwyg = [
            'enabled' => isset($attributes['wysiwyg']) && $attributes['wysiwyg'] === true,
            'editor' => $attributes['editor'] ?? 'tinymce', // Options: tinymce, ckeditor, quill
            'config' => $attributes['editor_config'] ?? []
        ];
        
        // Create element data
        $element = [
            'type' => 'textarea',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'wysiwyg' => $wysiwyg,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a checkbox element
     * 
     * Creates a single checkbox input.
     *
     * @param string $name Element name
     * @param string $value Value when checked
     * @param bool $checked Whether checkbox is initially checked
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     * @return $this
     */
    public function checkbox($name, $value = '1', $checked = false, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Set ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $formattedName . '_' . Str::random(5);
        }
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Create element data
        $element = [
            'type' => 'checkbox',
            'name' => $formattedName,
            'value' => $value,
            'checked' => $checked,
            'label' => $labelText,
            'show_label' => $showLabel,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a radio element
     * 
     * Creates a group of radio button inputs.
     *
     * @param string $name Element name
     * @param array $options Array of options (key => value pairs)
     * @param string $checked Value of the initially checked option
     * @param array $attributes Additional attributes and settings
     *                          - label: Custom label text or false to hide label
     * @return $this
     */
    public function radio($name, array $options, $checked = null, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Format options
        $formattedOptions = [];
        foreach ($options as $key => $value) {
            $optionValue = is_string($key) ? $key : $value;
            $optionLabel = Str::title(str_replace('_', ' ', $value));
            $optionId = $formattedName . '_' . Str::slug($optionValue, '_') . '_' . Str::random(3);
            
            $formattedOptions[] = [
                'id' => $optionId,
                'value' => $optionValue,
                'label' => $optionLabel,
                'checked' => $optionValue == $checked
            ];
        }
        
        // Create element data
        $element = [
            'type' => 'radio',
            'name' => $formattedName,
            'options' => $formattedOptions,
            'label' => $labelText,
            'show_label' => $showLabel,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a switch element
     * 
     * Creates a toggle switch input.
     *
     * @param string $name Element name
     * @param string $value Value when switched on
     * @param bool $checked Whether switch is initially on
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     * @return $this
     */
    public function switch($name, $value = '1', $checked = false, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Set ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $formattedName . '_' . Str::random(5);
        }
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Create element data
        $element = [
            'type' => 'switch',
            'name' => $formattedName,
            'value' => $value,
            'checked' => $checked,
            'label' => $labelText,
            'show_label' => $showLabel,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a password input element
     * 
     * Creates a password input field with masked text.
     *
     * @param string $name Element name
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - placeholder: Placeholder text
     *                          - required: Whether field is required (boolean)
     * @return $this
     */
    public function password($name, array $attributes = [])
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create label text with first letter of each word capitalized
        $labelText = Str::title($name);
        
        // Set ID if not provided
        if (!isset($attributes['id'])) {
            $attributes['id'] = $formattedName . '_' . Str::random(5);
        }
        
        // Check if label should be displayed
        $showLabel = !isset($attributes['label']) || $attributes['label'] !== false;
        
        // Create element data
        $element = [
            'type' => 'password',
            'name' => $formattedName,
            'label' => $labelText,
            'show_label' => $showLabel,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Set validation rules for the current element
     * 
     * Adds validation rules to the most recently created element.
     *
     * @param string|array $rules Validation rules in Laravel format
     * @param array $messages Custom error messages for validation rules
     * @return $this
     */
    public function rules($rules, array $messages = [])
    {
        if ($this->currentElement) {
            $this->currentElement['validation'] = [
                'rules' => $rules,
                'messages' => $messages
            ];
            
            // Update the element in the elements array
            $lastIndex = count($this->elements) - 1;
            $this->elements[$lastIndex] = $this->currentElement;
        }
        
        return $this;
    }
    
    /**
     * Render the form
     * 
     * Renders the complete form with all its elements.
     *
     * @return string Rendered HTML
     */
    public function render()
    {
        // Get old input and errors from session
        $oldInput = Session::get('_old_input', []);
        $errors = Session::get('errors') ? Session::get('errors')->getBag('default')->toArray() : [];
        
        // Prepare data for the view
        $viewData = [
            'formId' => $this->formId,
            'elements' => $this->elements,
            'errors' => $errors,
            'oldInput' => $oldInput,
            'cssFramework' => $this->cssFramework,
            'themeMode' => $this->themeMode
        ];
        
        // Render the view
        return View::make('realments::form', $viewData)->render();
    }
    
    /**
     * Get default button class based on CSS framework
     * 
     * Returns the appropriate button class for the current CSS framework.
     *
     * @param string $size Button size (sm, md, lg)
     * @return string CSS class string
     */
    protected function getDefaultButtonClass($size = '')
    {
        $class = '';
        
        switch ($this->cssFramework) {
            case 'bootstrap':
                $class = 'btn btn-primary';
                if ($size === 'sm') $class .= ' btn-sm';
                if ($size === 'lg') $class .= ' btn-lg';
                break;
            case 'tailwind':
                $class = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
                if ($size === 'sm') $class = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm';
                if ($size === 'lg') $class = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg';
                break;
            case 'bulma':
                $class = 'button is-primary';
                if ($size === 'sm') $class .= ' is-small';
                if ($size === 'lg') $class .= ' is-large';
                break;
            default:
                $class = 'btn btn-primary';
        }
        
        return $class;
    }
}
