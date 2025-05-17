<?php

namespace Incodiy\Realments\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class FormBuilder
{
    /**
     * Form elements collection
     */
    protected $elements = [];
    
    /**
     * Current form ID
     */
    protected $formId;
    
    /**
     * Form attributes
     */
    protected $formAttributes = [];
    
    /**
     * Form method
     */
    protected $method = 'POST';
    
    /**
     * Form action URL
     */
    protected $action = '';
    
    /**
     * Form enctype
     */
    protected $enctype = 'application/x-www-form-urlencoded';
    
    /**
     * Current element being built
     */
    protected $currentElement = null;
    
    /**
     * CSS Framework
     */
    protected $cssFramework = 'bootstrap';
    
    /**
     * Theme mode
     */
    protected $themeMode = 'light';
    
    /**
     * Constructor
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
     * @param array $attributes
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
     * @param string|null $submitText
     * @param array $attributes
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
            'type' => 'form_close'
        ];
        
        return $this;
    }
    
    /**
     * Create a select element
     *
     * @param string $name
     * @param array $values
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param bool $checked
     * @param array $attributes
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
     * @param string $name
     * @param array $options
     * @param string $checked
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param bool $checked
     * @param array $attributes
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
     * @param string $name
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param string $value
     * @param array $attributes
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
     * @param string $name
     * @param array $value
     * @param array $attributes
     * @return $this
     */
    public function dateRange($name, array $value = null, array $attributes = [])
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
            'type' => 'daterange',
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
     * Create a file input element
     *
     * @param string $name
     * @param array $attributes
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
        
        // Thumbnail settings
        $thumbnail = [
            'enabled' => isset($attributes['thumbnail']) && $attributes['thumbnail'] === true,
            'size' => $attributes['thumbnail_size'] ?? 150,
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
     * @param string $name
     * @param string $value
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
     * @param string $name
     * @param string $value
     * @param array $attributes
     * @return $this
     */
    public function range($name, $value = null, array $attributes = [])
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
            'type' => 'range',
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
     * Create a color input element
     *
     * @param string $name
     * @param string $value
     * @param array $attributes
     * @return $this
     */
    public function color($name, $value = null, array $attributes = [])
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
            'type' => 'color',
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
     * Create a tags input element
     *
     * @param string $name
     * @param array $value
     * @param array $attributes
     * @return $this
     */
    public function tags($name, array $value = [], array $attributes = [])
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
            'type' => 'tags',
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
     * Create a rich text editor element
     *
     * @param string $name
     * @param string $value
     * @param array $attributes
     * @return $this
     */
    public function richText($name, $value = null, array $attributes = [])
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
        
        // Set editor type
        $editorType = $attributes['editor'] ?? 'tinymce'; // Options: tinymce, ckeditor, quill
        
        // Create element data
        $element = [
            'type' => 'richtext',
            'name' => $formattedName,
            'value' => $value,
            'label' => $labelText,
            'show_label' => $showLabel,
            'editor' => $editorType,
            'editor_config' => $attributes['editor_config'] ?? [],
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
     * @param string $name
     * @param array $attributes
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
        
        // Create element data
        $element = [
            'type' => 'captcha',
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
     * Create an autocomplete element
     *
     * @param string $name
     * @param string $value
     * @param array $options
     * @param array $attributes
     * @return $this
     */
    public function autocomplete($name, $value = null, array $options = [], array $attributes = [])
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
            'type' => 'autocomplete',
            'name' => $formattedName,
            'value' => $value,
            'options' => $options,
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
     * @param array|string $rules
     * @param array $messages
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
     * Render the form elements
     *
     * @return string
     */
    public function render()
    {
        // Convert elements to JSON for React
        $elementsJson = json_encode($this->elements);
        
        // Get validation errors if any
        $errors = session()->get('errors');
        $errorBag = $errors ? json_encode($errors->getBag('default')->toArray()) : '{}';
        
        // Get old input if any
        $oldInput = json_encode(session()->getOldInput());
        
        // Generate a unique ID for the form container
        $containerId = 'realments_' . Str::random(8);
        
        // Render the view with the form data
        return View::make('realments::form', [
            'containerId' => $containerId,
            'elements' => $elementsJson,
            'errors' => $errorBag,
            'oldInput' => $oldInput,
            'cssFramework' => $this->cssFramework,
            'themeMode' => $this->themeMode
        ])->render();
    }
    
    /**
     * Get default button class based on CSS framework
     *
     * @param string $size
     * @return string
     */
    protected function getDefaultButtonClass($size = '')
    {
        $sizeClass = '';
        
        if ($size) {
            switch ($this->cssFramework) {
                case 'bootstrap':
                    $sizeClass = $size === 'sm' ? 'btn-sm' : ($size === 'lg' ? 'btn-lg' : '');
                    break;
                case 'tailwind':
                    $sizeClass = $size === 'sm' ? 'text-sm py-1 px-2' : ($size === 'lg' ? 'text-lg py-3 px-6' : '');
                    break;
                case 'bulma':
                    $sizeClass = $size === 'sm' ? 'is-small' : ($size === 'lg' ? 'is-large' : '');
                    break;
                default:
                    $sizeClass = '';
            }
        }
        
        switch ($this->cssFramework) {
            case 'bootstrap':
                return 'btn btn-primary ' . $sizeClass;
            case 'tailwind':
                return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' . $sizeClass;
            case 'bulma':
                return 'button is-primary ' . $sizeClass;
            default:
                return '';
        }
    }
}
