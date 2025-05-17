import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Hook for handling CSS framework classes
const useCssFramework = (cssFramework, themeMode) => {
  const getClasses = (element) => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      error: '',
      button: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${element.errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        classes.button = 'btn btn-primary';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${element.errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.error = 'text-red-500 text-xs italic';
        classes.button = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${element.errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
        classes.button = 'button is-primary';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.input += ' bg-dark text-light';
          break;
        case 'tailwind':
          classes.input = classes.input.replace('text-gray-700', 'text-white');
          classes.input += ' bg-gray-700 border-gray-600';
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          classes.input += ' has-background-dark has-text-light';
          break;
        default:
          break;
      }
    }
    
    return classes;
  };
  
  return { getClasses };
};

export default useCssFramework;
