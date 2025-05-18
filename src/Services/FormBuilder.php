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
     * The submit button is handled by the FormClose component in React.
     *
     * @param string|null $submitText Text for the submit button, or null to omit button
     * @param array $attributes Additional attributes for the submit button
     * @return $this
     */
    public function close($submitText = 'Submit', array $attributes = [])
    {
        // Add form close element with submit button information
        // The actual button will be rendered by the FormClose component
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
        $radioOptions = [];
        foreach ($options as $key => $value) {
            $optionValue = is_string($key) ? $key : $value;
            $optionLabel = Str::title(str_replace('_', ' ', $value));
            
            $radioOptions[] = [
                'value' => $optionValue,
                'label' => $optionLabel,
                'checked' => $optionValue === $checked
            ];
        }
        
        // Create element data
        $element = [
            'type' => 'radio',
            'name' => $formattedName,
            'label' => $labelText,
            'show_label' => $showLabel,
            'options' => $radioOptions,
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
     * Create an email input element
     * 
     * Creates an email input field with email validation.
     *
     * @param string $name Element name
     * @param string $value Default value
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - placeholder: Placeholder text
     *                          - required: Whether field is required (boolean)
     * @return $this
     */
    public function email($name, $value = null, array $attributes = [])
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
            'type' => 'email',
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
     * Create a number input element
     * 
     * Creates a number input field with numeric validation.
     *
     * @param string $name Element name
     * @param string|int|float $value Default value
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - min: Minimum allowed value
     *                          - max: Maximum allowed value
     *                          - step: Step increment value
     * @return $this
     */
    public function number($name, $value = null, array $attributes = [])
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
            'type' => 'number',
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
     * Create a date input element
     * 
     * Creates a date picker input field.
     *
     * @param string $name Element name
     * @param string $value Default value (YYYY-MM-DD format)
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - min: Minimum allowed date (YYYY-MM-DD)
     *                          - max: Maximum allowed date (YYYY-MM-DD)
     * @return $this
     */
    public function date($name, $value = null, array $attributes = [])
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
            'type' => 'date',
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
     * Create a time input element
     * 
     * Creates a time picker input field.
     *
     * @param string $name Element name
     * @param string $value Default value (HH:MM or HH:MM:SS format)
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - min: Minimum allowed time (HH:MM)
     *                          - max: Maximum allowed time (HH:MM)
     *                          - step: Step increment in seconds
     * @return $this
     */
    public function time($name, $value = null, array $attributes = [])
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
            'type' => 'time',
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
     * Create a datetime input element
     * 
     * Creates a datetime picker input field.
     *
     * @param string $name Element name
     * @param string $value Default value (YYYY-MM-DDTHH:MM format)
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - min: Minimum allowed datetime
     *                          - max: Maximum allowed datetime
     * @return $this
     */
    public function datetime($name, $value = null, array $attributes = [])
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
            'type' => 'datetime',
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
     * Create a date range input element
     * 
     * Creates a date range picker with start and end date inputs.
     *
     * @param string $name Element name
     * @param array $values Default values [start_date, end_date]
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - min: Minimum allowed date
     *                          - max: Maximum allowed date
     *                          - separator: Text to display between start and end dates
     * @return $this
     */
    public function dateRange($name, array $values = [], array $attributes = [])
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
        
        // Set default values
        $startDate = $values[0] ?? null;
        $endDate = $values[1] ?? null;
        
        // Create element data
        $element = [
            'type' => 'dateRange',
            'name' => $formattedName,
            'value' => [
                'start' => $startDate,
                'end' => $endDate
            ],
            'label' => $labelText,
            'show_label' => $showLabel,
            'separator' => $attributes['separator'] ?? 'to',
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a file input element
     * 
     * Creates a file upload input field.
     *
     * @param string $name Element name
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - accept: Accepted file types (e.g., 'image/*', '.pdf')
     *                          - multiple: Whether multiple files can be selected (boolean)
     *                          - thumbnail: Whether to show thumbnail preview (boolean)
     *                          - thumbnail_size: Size of thumbnail in pixels
     *                          - thumbnail_position: Position of thumbnail (top, left, right, bottom)
     * @return $this
     */
    public function file($name, array $attributes = [])
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
        
        // Handle thumbnail settings
        $thumbnail = [
            'enabled' => isset($attributes['thumbnail']) && $attributes['thumbnail'] === true,
            'size' => $attributes['thumbnail_size'] ?? 100,
            'position' => $attributes['thumbnail_position'] ?? 'top'
        ];
        
        // Create element data
        $element = [
            'type' => 'file',
            'name' => $formattedName,
            'label' => $labelText,
            'show_label' => $showLabel,
            'thumbnail' => $thumbnail,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a hidden input element
     * 
     * Creates a hidden input field.
     *
     * @param string $name Element name
     * @param string $value Field value
     * @return $this
     */
    public function hidden($name, $value = null)
    {
        // Format name for HTML attributes (lowercase, replace spaces with dashes)
        $formattedName = Str::slug($name, '-');
        
        // Create element data
        $element = [
            'type' => 'hidden',
            'name' => $formattedName,
            'value' => $value,
            'attributes' => [
                'id' => $formattedName . '_' . Str::random(5)
            ],
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a range input element
     * 
     * Creates a slider input for selecting a value from a range.
     *
     * @param string $name Element name
     * @param string|int|float $value Default value
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - min: Minimum value (default: 0)
     *                          - max: Maximum value (default: 100)
     *                          - step: Step increment value (default: 1)
     *                          - show_value: Whether to display current value (boolean)
     * @return $this
     */
    public function range($name, $value = 50, array $attributes = [])
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
        
        // Set default attributes
        $attributes['min'] = $attributes['min'] ?? 0;
        $attributes['max'] = $attributes['max'] ?? 100;
        $attributes['step'] = $attributes['step'] ?? 1;
        
        // Check if value display is enabled
        $showValue = isset($attributes['show_value']) && $attributes['show_value'] === true;
        
        // Create element data
        $element = [
            'type' => 'range',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'show_value' => $showValue,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a color input element
     * 
     * Creates a color picker input field.
     *
     * @param string $name Element name
     * @param string $value Default color value (hex format)
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - show_hex: Whether to display hex value (boolean)
     * @return $this
     */
    public function color($name, $value = '#000000', array $attributes = [])
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
        
        // Check if hex value display is enabled
        $showHex = isset($attributes['show_hex']) && $attributes['show_hex'] === true;
        
        // Create element data
        $element = [
            'type' => 'color',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'show_hex' => $showHex,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a tags input element
     * 
     * Creates an input field for entering multiple tags.
     *
     * @param string $name Element name
     * @param array $values Default tag values
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - placeholder: Placeholder text
     *                          - suggestions: Array of tag suggestions
     *                          - max_tags: Maximum number of tags allowed
     *                          - allow_duplicates: Whether duplicate tags are allowed (boolean)
     * @return $this
     */
    public function tags($name, array $values = [], array $attributes = [])
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
        
        // Handle tag settings
        $tagSettings = [
            'suggestions' => $attributes['suggestions'] ?? [],
            'max_tags' => $attributes['max_tags'] ?? null,
            'allow_duplicates' => isset($attributes['allow_duplicates']) && $attributes['allow_duplicates'] === true
        ];
        
        // Create element data
        $element = [
            'type' => 'tags',
            'name' => $formattedName,
            'value' => $values,
            'label' => $labelText,
            'show_label' => $showLabel,
            'tag_settings' => $tagSettings,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a rich text editor element
     * 
     * Creates a rich text editor for advanced content editing.
     *
     * @param string $name Element name
     * @param string $value Default HTML content
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - editor: Editor type (tinymce, ckeditor, quill)
     *                          - editor_config: Configuration options for the editor
     *                          - height: Editor height in pixels
     * @return $this
     */
    public function richText($name, $value = '', array $attributes = [])
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
        
        // Editor settings
        $editorSettings = [
            'editor' => $attributes['editor'] ?? 'tinymce', // Options: tinymce, ckeditor, quill
            'config' => $attributes['editor_config'] ?? [],
            'height' => $attributes['height'] ?? 300
        ];
        
        // Create element data
        $element = [
            'type' => 'richText',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'editor_settings' => $editorSettings,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create a captcha element
     * 
     * Creates a CAPTCHA verification element.
     *
     * @param string $name Element name
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - captcha_type: Type of CAPTCHA (image, math, recaptcha)
     *                          - site_key: Site key for reCAPTCHA
     * @return $this
     */
    public function captcha($name = 'captcha', array $attributes = [])
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
        
        // CAPTCHA settings
        $captchaSettings = [
            'captcha_type' => $attributes['captcha_type'] ?? 'image', // Options: image, math, recaptcha
            'site_key' => $attributes['site_key'] ?? config('realments.recaptcha_site_key', '')
        ];
        
        // Create element data
        $element = [
            'type' => 'captcha',
            'name' => $formattedName,
            'label' => $labelText,
            'show_label' => $showLabel,
            'captcha_settings' => $captchaSettings,
            'attributes' => $attributes,
            'css_framework' => $this->cssFramework,
            'theme_mode' => $this->themeMode
        ];
        
        $this->elements[] = $element;
        $this->currentElement = $element;
        
        return $this;
    }
    
    /**
     * Create an autocomplete input element
     * 
     * Creates an input field with autocomplete suggestions.
     *
     * @param string $name Element name
     * @param string $value Default value
     * @param array $suggestions Array of autocomplete suggestions
     * @param array $attributes Additional attributes and settings
     *                          - id: Element ID (optional, auto-generated if not provided)
     *                          - label: Custom label text or false to hide label
     *                          - placeholder: Placeholder text
     *                          - min_chars: Minimum characters before showing suggestions
     *                          - max_suggestions: Maximum number of suggestions to show
     * @return $this
     */
    public function autocomplete($name, $value = null, array $suggestions = [], array $attributes = [])
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
        
        // Autocomplete settings
        $autocompleteSettings = [
            'suggestions' => $suggestions,
            'min_chars' => $attributes['min_chars'] ?? 2,
            'max_suggestions' => $attributes['max_suggestions'] ?? 10
        ];
        
        // Create element data
        $element = [
            'type' => 'autocomplete',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'autocomplete_settings' => $autocompleteSettings,
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
