<?php
/*
 * This file is part of the Realments package.
 *
 * (c) Your Name <incodiy@gmail.com>
 * 
 * This package is licensed under the MIT License.
 * For more information, please refer to the LICENSE file.
 */

return [
    // Default CSS framework: 'tailwind' or 'bootstrap'
    'framework' => 'tailwind',

    // Tailwind CSS classes for form elements
    'tailwind' => [
        'input'  => 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
        'label'  => 'block text-sm font-medium text-gray-700',
        'error'  => 'text-red-600 text-sm mt-1',
        'button' => 'mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'
    ],

    // Bootstrap classes for form elements (if using 'bootstrap' framework)
    'bootstrap' => [
        'input'  => 'form-control',
        'label'  => 'form-label',
        'error'  => 'text-danger small',
        'button' => 'btn btn-primary'
    ]
];
