import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Utility functions for CSS framework integration
const cssFrameworkUtils = {
  // Get default CSS classes for form elements based on framework
  getDefaultClasses: (cssFramework, themeMode) => {
    const classes = {
      form: '',
      formGroup: '',
      label: '',
      input: '',
      select: '',
      checkbox: '',
      radio: '',
      button: '',
      error: '',
      container: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.form = 'needs-validation';
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = 'form-control';
        classes.select = 'form-select';
        classes.checkbox = 'form-check-input';
        classes.radio = 'form-check-input';
        classes.button = 'btn btn-primary';
        classes.error = 'invalid-feedback';
        classes.container = 'container';
        
        // Apply dark mode if needed
        if (themeMode === 'dark') {
          classes.form += ' bg-dark text-light';
          classes.input += ' bg-dark text-light';
          classes.select += ' bg-dark text-light';
        }
        break;
      
      case 'tailwind':
        classes.form = '';
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
        classes.select = 'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline';
        classes.checkbox = 'mr-2 leading-tight';
        classes.radio = 'mr-2 leading-tight';
        classes.button = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        classes.error = 'text-red-500 text-xs italic';
        classes.container = 'container mx-auto px-4';
        
        // Apply dark mode if needed
        if (themeMode === 'dark') {
          classes.form += ' bg-gray-800 text-white';
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          classes.input = classes.input.replace('text-gray-700', 'text-white');
          classes.input += ' bg-gray-700 border-gray-600';
          classes.select = classes.select.replace('bg-white', 'bg-gray-700');
          classes.select = classes.select.replace('text-gray-700', 'text-white');
          classes.select += ' border-gray-600';
        }
        break;
      
      case 'bulma':
        classes.form = '';
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = 'input';
        classes.select = 'select';
        classes.checkbox = 'checkbox';
        classes.radio = 'radio';
        classes.button = 'button is-primary';
        classes.error = 'help is-danger';
        classes.container = 'container';
        
        // Apply dark mode if needed
        if (themeMode === 'dark') {
          classes.form += ' has-background-dark has-text-light';
          classes.input += ' has-background-dark has-text-light';
          classes.select += ' has-background-dark has-text-light';
        }
        break;
      
      default:
        // Default to bootstrap if framework not recognized
        return cssFrameworkUtils.getDefaultClasses('bootstrap', themeMode);
    }
    
    return classes;
  },
  
  // Add error class to an element based on framework
  addErrorClass: (baseClass, hasError, cssFramework) => {
    if (!hasError) return baseClass;
    
    switch (cssFramework) {
      case 'bootstrap':
        return `${baseClass} is-invalid`;
      case 'tailwind':
        return baseClass.replace('border', 'border border-red-500');
      case 'bulma':
        return `${baseClass} is-danger`;
      default:
        return baseClass;
    }
  },
  
  // Get button variant class based on framework
  getButtonVariantClass: (variant, cssFramework) => {
    switch (cssFramework) {
      case 'bootstrap':
        return `btn btn-${variant}`;
      case 'tailwind':
        switch (variant) {
          case 'primary':
            return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
          case 'secondary':
            return 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded';
          case 'danger':
            return 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
          case 'success':
            return 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded';
          default:
            return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
        }
      case 'bulma':
        return `button is-${variant}`;
      default:
        return '';
    }
  },
  
  // Get button size class based on framework
  getButtonSizeClass: (size, cssFramework) => {
    if (!size) return '';
    
    switch (cssFramework) {
      case 'bootstrap':
        return `btn-${size}`;
      case 'tailwind':
        switch (size) {
          case 'sm':
            return 'text-sm py-1 px-2';
          case 'lg':
            return 'text-lg py-3 px-6';
          default:
            return '';
        }
      case 'bulma':
        return `is-${size}`;
      default:
        return '';
    }
  }
};

export default cssFrameworkUtils;
