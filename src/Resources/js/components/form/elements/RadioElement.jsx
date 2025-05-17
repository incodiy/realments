import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RadioElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState('');
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    options,
    attributes
  } = element;
  
  // Initialize selected value
  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      // Set default checked option if any
      const defaultChecked = options.find(option => option.checked);
      if (defaultChecked) {
        setSelectedValue(defaultChecked.value);
      }
    }
  }, [value, options]);
  
  // Handle radio change
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      radioContainer: '',
      label: '',
      optionLabel: '',
      radio: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.radioContainer = 'form-check';
        classes.label = 'form-label';
        classes.optionLabel = 'form-check-label';
        classes.radio = `form-check-input ${errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.radioContainer = 'flex items-center mb-2';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.optionLabel = 'ml-2 text-gray-700 text-sm';
        classes.radio = `mr-2 leading-tight ${errorMessage ? 'border-red-500' : ''}`;
        classes.error = 'text-red-500 text-xs italic mt-1';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.radioContainer = 'control';
        classes.label = 'label';
        classes.optionLabel = '';
        classes.radio = `radio ${errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.radio += ' bg-dark';
          break;
        case 'tailwind':
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          classes.optionLabel = classes.optionLabel.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          // Bulma doesn't have specific dark mode classes for radios
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
      {/* Group Label */}
      {show_label && (
        <label className={classes.label}>
          {t(label)}
        </label>
      )}
      
      {/* Radio options */}
      <div>
        {options.map((option, index) => (
          <div key={`radio-${index}`} className={classes.radioContainer}>
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
              className={`${classes.radio} ${attributes.class || ''}`}
              {...attributes}
            />
            <label htmlFor={option.id} className={classes.optionLabel}>
              {t(option.label)}
            </label>
          </div>
        ))}
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

export default RadioElement;
