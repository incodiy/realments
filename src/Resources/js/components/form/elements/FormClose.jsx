import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * FormClose Component
 * 
 * Renders the closing form tag and optionally a submit button.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.element - Element configuration object
 * @param {string} props.element.submitText - Text for the submit button (optional)
 * @param {Object} props.element.submitAttributes - Attributes for the submit button (optional)
 * @param {string} props.cssFramework - CSS framework to use (bootstrap, tailwind, bulma)
 * @param {string} props.themeMode - Theme mode (light, dark)
 * @returns {React.ReactElement} Form closing element with optional submit button
 */
const FormClose = ({ element, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  
  // Get submit button text and attributes
  const submitText = element?.submitText || null;
  const submitAttributes = element?.submitAttributes || {};
  
  // Get button class based on CSS framework and theme
  const getButtonClass = () => {
    let buttonClass = '';
    
    switch (cssFramework) {
      case 'bootstrap':
        buttonClass = 'btn btn-primary';
        break;
      case 'tailwind':
        buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        break;
      case 'bulma':
        buttonClass = 'button is-primary';
        break;
      default:
        buttonClass = 'btn btn-primary';
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark' && cssFramework === 'bootstrap') {
      buttonClass += ' btn-dark';
    }
    
    return buttonClass;
  };
  
  return (
    <>
      {submitText && (
        <div className="form-group mt-3">
          <button 
            type="submit" 
            className={`${getButtonClass()} ${submitAttributes.className || ''}`}
            {...submitAttributes}
          >
            {t(submitText)}
          </button>
        </div>
      )}
    </>
  );
};

export default FormClose;
