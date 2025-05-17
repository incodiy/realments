import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmailElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize input value
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
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
  
  const classes = getClasses();
  
  return (
    <div className={classes.formGroup}>
      {/* Label */}
      {show_label && (
        <label htmlFor={attributes.id} className={classes.label}>
          {t(label)}
        </label>
      )}
      
      {/* Input */}
      <input
        type="email"
        id={attributes.id}
        name={name}
        value={inputValue}
        onChange={handleChange}
        className={`${classes.input} ${attributes.class || ''}`}
        {...attributes}
      />
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EmailElement;
