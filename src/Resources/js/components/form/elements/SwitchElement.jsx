import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SwitchElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
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
  
  // Handle switch change
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      switchContainer: '',
      label: '',
      switch: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.switchContainer = 'form-check form-switch';
        classes.label = 'form-check-label';
        classes.switch = `form-check-input ${errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.switchContainer = 'flex items-center';
        classes.label = 'ml-2 text-gray-700 text-sm';
        classes.switch = `relative inline-flex items-center h-6 rounded-full w-11 ${checked ? 'bg-blue-600' : 'bg-gray-200'} ${errorMessage ? 'border-red-500' : ''}`;
        classes.error = 'text-red-500 text-xs italic mt-1';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.switchContainer = 'control';
        classes.label = '';
        classes.switch = `switch ${errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.switch += ' bg-dark';
          break;
        case 'tailwind':
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          classes.switch = classes.switch.replace('bg-gray-200', 'bg-gray-600');
          break;
        case 'bulma':
          // Bulma doesn't have specific dark mode classes for switches
          break;
        default:
          break;
      }
    }
    
    return classes;
  };
  
  const classes = getClasses();
  
  // Render switch based on framework
  const renderSwitch = () => {
    if (cssFramework === 'tailwind') {
      return (
        <div className={classes.switchContainer}>
          <button
            type="button"
            className={classes.switch}
            onClick={() => setChecked(!checked)}
            role="switch"
            aria-checked={checked}
          >
            <span className="sr-only">{t(label)}</span>
            <span
              className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
            />
          </button>
          <input
            type="checkbox"
            id={attributes.id}
            name={name}
            value={element.value}
            checked={checked}
            onChange={handleChange}
            className="hidden"
            {...attributes}
          />
          {show_label && (
            <label htmlFor={attributes.id} className={classes.label}>
              {t(label)}
            </label>
          )}
        </div>
      );
    }
    
    return (
      <div className={classes.switchContainer}>
        <input
          type="checkbox"
          id={attributes.id}
          name={name}
          value={element.value}
          checked={checked}
          onChange={handleChange}
          className={`${classes.switch} ${attributes.class || ''}`}
          role="switch"
          {...attributes}
        />
        {show_label && (
          <label htmlFor={attributes.id} className={classes.label}>
            {t(label)}
          </label>
        )}
      </div>
    );
  };
  
  return (
    <div className={classes.formGroup}>
      {renderSwitch()}
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SwitchElement;
