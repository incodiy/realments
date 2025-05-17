import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CheckboxElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize checked state
  useEffect(() => {
    setChecked(element.checked || value === element.value);
  }, [element.checked, value, element.value]);
  
  // Handle checkbox change
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      checkboxContainer: '',
      label: '',
      checkbox: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.checkboxContainer = 'form-check';
        classes.label = 'form-check-label';
        classes.checkbox = `form-check-input ${errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.checkboxContainer = 'flex items-center';
        classes.label = 'ml-2 text-gray-700 text-sm';
        classes.checkbox = `mr-2 leading-tight ${errorMessage ? 'border-red-500' : ''}`;
        classes.error = 'text-red-500 text-xs italic mt-1';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.checkboxContainer = 'control';
        classes.label = '';
        classes.checkbox = `checkbox ${errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.checkbox += ' bg-dark';
          break;
        case 'tailwind':
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          // Bulma doesn't have specific dark mode classes for checkboxes
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
      <div className={classes.checkboxContainer}>
        <input
          type="checkbox"
          id={attributes.id}
          name={name}
          value={element.value}
          checked={checked}
          onChange={handleChange}
          className={`${classes.checkbox} ${attributes.class || ''}`}
          {...attributes}
        />
        
        {/* Label */}
        {show_label && (
          <label htmlFor={attributes.id} className={classes.label}>
            {t(label)}
          </label>
        )}
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

export default CheckboxElement;
