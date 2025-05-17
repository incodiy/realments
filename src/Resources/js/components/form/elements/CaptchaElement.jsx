import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CaptchaElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [captchaImage, setCaptchaImage] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize captcha
  useEffect(() => {
    generateCaptcha();
  }, []);
  
  // Generate captcha
  const generateCaptcha = async () => {
    try {
      // In a real implementation, this would call an API to get a captcha image
      // For now, we'll simulate it with a placeholder
      const timestamp = new Date().getTime();
      setCaptchaImage(`https://dummyimage.com/150x50/000/fff&text=CAPTCHA${timestamp}`);
    } catch (error) {
      console.error('Failed to generate captcha:', error);
    }
  };
  
  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Refresh captcha
  const refreshCaptcha = (e) => {
    e.preventDefault();
    generateCaptcha();
    setInputValue('');
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      captchaContainer: '',
      refreshButton: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.captchaContainer = 'd-flex align-items-center gap-2 mb-2';
        classes.refreshButton = 'btn btn-sm btn-secondary';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.captchaContainer = 'flex items-center space-x-2 mb-2';
        classes.refreshButton = 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.captchaContainer = 'is-flex is-align-items-center is-justify-content-space-between mb-2';
        classes.refreshButton = 'button is-small';
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
      
      {/* Captcha Image and Refresh Button */}
      <div className={classes.captchaContainer}>
        <img src={captchaImage} alt="CAPTCHA" />
        <button
          type="button"
          className={classes.refreshButton}
          onClick={refreshCaptcha}
        >
          {t('Refresh')}
        </button>
      </div>
      
      {/* Input */}
      <input
        type="text"
        id={attributes.id}
        name={name}
        value={inputValue}
        onChange={handleChange}
        className={`${classes.input} ${attributes.class || ''}`}
        placeholder={t('Enter the code shown above')}
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

export default CaptchaElement;
