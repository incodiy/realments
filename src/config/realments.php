<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default CSS Framework
    |--------------------------------------------------------------------------
    |
    | This option controls the default CSS framework that will be used for
    | rendering form elements. Supported: "bootstrap", "tailwind", "bulma"
    |
    */
    'default_css_framework' => 'bootstrap',

    /*
    |--------------------------------------------------------------------------
    | Default Theme Mode
    |--------------------------------------------------------------------------
    |
    | This option controls the default theme mode that will be used for
    | rendering form elements. Supported: "light", "dark"
    |
    */
    'default_theme_mode' => 'light',

    /*
    |--------------------------------------------------------------------------
    | WYSIWYG Editor Options
    |--------------------------------------------------------------------------
    |
    | This option controls the available WYSIWYG editors and their default
    | configurations.
    |
    */
    'wysiwyg_editors' => [
        'tinymce' => [
            'version' => '6',
            'cdn' => 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js',
            'default_options' => [
                'plugins' => 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                'toolbar' => 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl',
                'menubar' => 'file edit view insert format tools table help',
            ],
        ],
        'ckeditor' => [
            'version' => '5',
            'cdn' => 'https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js',
            'default_options' => [
                'toolbar' => ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
            ],
        ],
        'quill' => [
            'version' => '1.3.6',
            'cdn' => [
                'js' => 'https://cdn.quilljs.com/1.3.6/quill.min.js',
                'css' => 'https://cdn.quilljs.com/1.3.6/quill.snow.css',
            ],
            'default_options' => [
                'modules' => [
                    'toolbar' => [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [['header' => 1], ['header' => 2]],
                        [['list' => 'ordered'], ['list' => 'bullet']],
                        [['script' => 'sub'], ['script' => 'super']],
                        [['indent' => '-1'], ['indent' => '+1']],
                        [['direction' => 'rtl']],
                        [['size' => ['small', false, 'large', 'huge']]],
                        [['header' => [1, 2, 3, 4, 5, 6, false]]],
                        [['color' => []], ['background' => []]],
                        [['font' => []]],
                        [['align' => []]],
                        ['clean'],
                        ['link', 'image', 'video'],
                    ],
                ],
                'theme' => 'snow',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | CSS Framework Configurations
    |--------------------------------------------------------------------------
    |
    | This option controls the CSS classes and attributes that will be applied
    | to form elements based on the selected CSS framework.
    |
    */
    'css_frameworks' => [
        'bootstrap' => [
            'form_class' => 'needs-validation',
            'form_group_class' => 'mb-3',
            'label_class' => 'form-label',
            'input_class' => 'form-control',
            'input_error_class' => 'is-invalid',
            'error_class' => 'invalid-feedback',
            'checkbox_class' => 'form-check-input',
            'checkbox_label_class' => 'form-check-label',
            'radio_class' => 'form-check-input',
            'radio_label_class' => 'form-check-label',
            'select_class' => 'form-select',
            'button_class' => 'btn btn-primary',
            'button_secondary_class' => 'btn btn-secondary',
            'button_danger_class' => 'btn btn-danger',
            'button_success_class' => 'btn btn-success',
            'button_sm_class' => 'btn-sm',
            'button_lg_class' => 'btn-lg',
            'switch_class' => 'form-check-input',
            'switch_label_class' => 'form-check-label',
            'file_class' => 'form-control',
            'range_class' => 'form-range',
            'dark_mode' => [
                'bg_class' => 'bg-dark text-light',
                'input_class' => 'bg-dark text-light',
                'select_class' => 'bg-dark text-light',
            ],
        ],
        'tailwind' => [
            'form_class' => '',
            'form_group_class' => 'mb-4',
            'label_class' => 'block text-gray-700 text-sm font-bold mb-2',
            'input_class' => 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            'input_error_class' => 'border-red-500',
            'error_class' => 'text-red-500 text-xs italic',
            'checkbox_class' => 'mr-2 leading-tight',
            'checkbox_label_class' => 'inline-flex items-center',
            'radio_class' => 'mr-2 leading-tight',
            'radio_label_class' => 'inline-flex items-center',
            'select_class' => 'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline',
            'button_class' => 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            'button_secondary_class' => 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            'button_danger_class' => 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            'button_success_class' => 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            'button_sm_class' => 'py-1 px-2 text-sm',
            'button_lg_class' => 'py-3 px-6 text-lg',
            'switch_class' => 'mr-2 leading-tight',
            'switch_label_class' => 'inline-flex items-center',
            'file_class' => 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            'range_class' => 'w-full',
            'dark_mode' => [
                'bg_class' => 'bg-gray-800 text-white',
                'input_class' => 'bg-gray-700 text-white border-gray-600',
                'select_class' => 'bg-gray-700 text-white border-gray-600',
                'label_class' => 'text-gray-300',
            ],
        ],
        'bulma' => [
            'form_class' => '',
            'form_group_class' => 'field',
            'label_class' => 'label',
            'input_class' => 'input',
            'input_error_class' => 'is-danger',
            'error_class' => 'help is-danger',
            'checkbox_class' => 'checkbox',
            'checkbox_label_class' => '',
            'radio_class' => 'radio',
            'radio_label_class' => '',
            'select_class' => 'select',
            'button_class' => 'button is-primary',
            'button_secondary_class' => 'button',
            'button_danger_class' => 'button is-danger',
            'button_success_class' => 'button is-success',
            'button_sm_class' => 'is-small',
            'button_lg_class' => 'is-large',
            'switch_class' => 'switch',
            'switch_label_class' => '',
            'file_class' => 'file-input',
            'range_class' => 'range',
            'dark_mode' => [
                'bg_class' => 'has-background-dark has-text-light',
                'input_class' => 'has-background-dark has-text-light',
                'select_class' => 'has-background-dark has-text-light',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Internationalization Settings
    |--------------------------------------------------------------------------
    |
    | This option controls the default language and available translations
    | for form elements and validation messages.
    |
    */
    'i18n' => [
        'default_locale' => 'en',
        'fallback_locale' => 'en',
        'available_locales' => ['en', 'id'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Validation Settings
    |--------------------------------------------------------------------------
    |
    | This option controls the validation behavior for form elements.
    |
    */
    'validation' => [
        'client_side' => true,
        'server_side' => true,
        'live_validation' => true,
    ],
];
