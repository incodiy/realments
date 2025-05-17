import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ColorElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('#000000');
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize input value
  useEffect(() => {
    setInputValue(value || '#000000');
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
      colorContainer: '',
      colorPreview: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control form-control-color ${errorMessage ? 'is-invalid' : ''}`;
        classes.colorContainer = 'd-flex align-items-center';
        classes.colorPreview = 'ms-2 border rounded';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `${errorMessage ? 'border-red-500' : ''}`;
        classes.colorContainer = 'flex items-center';
        classes.colorPreview = 'ml-2 w-6 h-6 border rounded';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.colorContainer = 'is-flex is-align-items-center';
        classes.colorPreview = 'ml-2 is-size-7';
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          // Color inputs don't need specific dark mode classes
          break;
        case 'tailwind':
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          // Bulma doesn't have specific dark mode classes for color inputs
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
      
      {/* Color Input */}
      <div className={classes.colorContainer}>
        <input
          type="color"
          id={attributes.id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={`${classes.input} ${attributes.class || ''}`}
          {...attributes}
        />
        
        {/* Color Preview */}
        <div className={classes.colorPreview} style={{ backgroundColor: inputValue, width: '24px', height: '24px' }}></div>
        <span className="ms-2">{inputValue}</span>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ColorElement;
