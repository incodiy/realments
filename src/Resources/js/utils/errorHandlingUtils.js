import React from 'react';
import { useTranslation } from 'react-i18next';

// Utility functions for error handling
const errorHandlingUtils = {
  // Format Laravel validation errors
  formatLaravelErrors: (errors) => {
    if (!errors) return {};
    
    const formattedErrors = {};
    
    // Laravel validation errors come in the format:
    // { field: ['Error message 1', 'Error message 2'] }
    Object.keys(errors).forEach(field => {
      formattedErrors[field] = errors[field][0]; // Take the first error message
    });
    
    return formattedErrors;
  },
  
  // Display error message based on CSS framework
  renderErrorMessage: (message, cssFramework, themeMode) => {
    if (!message) return null;
    
    let className = '';
    
    switch (cssFramework) {
      case 'bootstrap':
        className = 'invalid-feedback d-block';
        break;
      case 'tailwind':
        className = 'text-red-500 text-xs italic mt-1';
        break;
      case 'bulma':
        className = 'help is-danger';
        break;
      default:
        className = 'error-message';
    }
    
    return (
      <div className={className}>
        {message}
      </div>
    );
  },
  
  // Add error class to input element based on CSS framework
  addErrorClass: (baseClass, hasError, cssFramework) => {
    if (!hasError) return baseClass;
    
    switch (cssFramework) {
      case 'bootstrap':
        return `${baseClass} is-invalid`;
      case 'tailwind':
        return baseClass.includes('border-red-500') 
          ? baseClass 
          : `${baseClass} border-red-500`;
      case 'bulma':
        return `${baseClass} is-danger`;
      default:
        return `${baseClass} has-error`;
    }
  },
  
  // Check if field has error
  hasError: (fieldName, errors) => {
    return errors && errors[fieldName] ? true : false;
  },
  
  // Get error message for field
  getErrorMessage: (fieldName, errors) => {
    return errors && errors[fieldName] ? errors[fieldName] : null;
  }
};

export default errorHandlingUtils;
