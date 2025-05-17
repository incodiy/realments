import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
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
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      inputGroup: '',
      input: '',
      button: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.inputGroup = 'input-group';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.button = 'btn btn-outline-secondary';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.inputGroup = 'relative';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.button = 'absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.inputGroup = 'control has-icons-right';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.button = 'icon is-small is-right';
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
          classes.button += ' text-light';
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
  
  // Render password input based on framework
  const renderPasswordInput = () => {
    if (cssFramework === 'bootstrap') {
      return (
        <div className={classes.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            id={attributes.id}
            name={name}
            value={inputValue}
            onChange={handleChange}
            className={`${classes.input} ${attributes.class || ''}`}
            {...attributes}
          />
          <button
            type="button"
            className={classes.button}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? t('Hide') : t('Show')}
          </button>
          {errorMessage && (
            <div className={classes.error}>
              {errorMessage}
            </div>
          )}
        </div>
      );
    } else if (cssFramework === 'tailwind') {
      return (
        <div className={classes.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            id={attributes.id}
            name={name}
            value={inputValue}
            onChange={handleChange}
            className={`${classes.input} ${attributes.class || ''}`}
            {...attributes}
          />
          <button
            type="button"
            className={classes.button}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? t('Hide') : t('Show')}
          </button>
          {errorMessage && (
            <div className={classes.error}>
              {errorMessage}
            </div>
          )}
        </div>
      );
    } else if (cssFramework === 'bulma') {
      return (
        <div className={classes.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            id={attributes.id}
            name={name}
            value={inputValue}
            onChange={handleChange}
            className={`${classes.input} ${attributes.class || ''}`}
            {...attributes}
          />
          <span className={classes.button} onClick={togglePasswordVisibility}>
            <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
          </span>
          {errorMessage && (
            <div className={classes.error}>
              {errorMessage}
            </div>
          )}
        </div>
      );
    }
    
    // Default fallback
    return (
      <>
        <input
          type={showPassword ? 'text' : 'password'}
          id={attributes.id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={`${classes.input} ${attributes.class || ''}`}
          {...attributes}
        />
        {errorMessage && (
          <div className={classes.error}>
            {errorMessage}
          </div>
        )}
      </>
    );
  };
  
  return (
    <div className={classes.formGroup}>
      {/* Label */}
      {show_label && (
        <label htmlFor={attributes.id} className={classes.label}>
          {t(label)}
        </label>
      )}
      
      {renderPasswordInput()}
    </div>
  );
};

export default PasswordElement;
