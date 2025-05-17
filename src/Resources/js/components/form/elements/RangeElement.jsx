import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RangeElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize input value
  useEffect(() => {
    const initialValue = value !== undefined && value !== null ? value : (attributes.min || 0);
    setInputValue(initialValue);
    setDisplayValue(initialValue);
  }, [value, attributes.min]);
  
  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setDisplayValue(newValue);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      rangeContainer: '',
      valueDisplay: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-range ${errorMessage ? 'is-invalid' : ''}`;
        classes.rangeContainer = 'd-flex flex-column';
        classes.valueDisplay = 'small text-muted mt-1';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `w-full ${errorMessage ? 'border-red-500' : ''}`;
        classes.rangeContainer = 'flex flex-col';
        classes.valueDisplay = 'text-xs text-gray-500 mt-1';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `range ${errorMessage ? 'is-danger' : ''}`;
        classes.rangeContainer = 'is-flex is-flex-direction-column';
        classes.valueDisplay = 'help mt-1';
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.valueDisplay = classes.valueDisplay.replace('text-muted', 'text-light');
          break;
        case 'tailwind':
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          classes.valueDisplay = classes.valueDisplay.replace('text-gray-500', 'text-gray-400');
          break;
        case 'bulma':
          // Bulma doesn't have specific dark mode classes for range
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
      
      {/* Range Input */}
      <div className={classes.rangeContainer}>
        <input
          type="range"
          id={attributes.id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={`${classes.input} ${attributes.class || ''}`}
          min={attributes.min || 0}
          max={attributes.max || 100}
          step={attributes.step || 1}
          {...attributes}
        />
        
        {/* Value Display */}
        <div className={classes.valueDisplay}>
          {displayValue} {attributes.unit || ''}
        </div>
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

export default RangeElement;
