import React from 'react';
import { useTranslation } from 'react-i18next';

const ButtonElement = ({ element, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  
  // Destructure element properties
  const { 
    text, 
    attributes
  } = element;
  
  // Get button type
  const type = attributes.type || 'submit';
  
  // Get CSS classes based on framework
  const getClasses = () => {
    let buttonClass = '';
    
    // Get variant
    const variant = attributes.variant || 'primary';
    
    // Get size
    const size = attributes.size || '';
    
    switch (cssFramework) {
      case 'bootstrap':
        buttonClass = `btn btn-${variant}`;
        if (size === 'sm') buttonClass += ' btn-sm';
        if (size === 'lg') buttonClass += ' btn-lg';
        break;
      case 'tailwind':
        if (variant === 'primary') {
          buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        } else if (variant === 'secondary') {
          buttonClass = 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        } else if (variant === 'danger') {
          buttonClass = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        } else if (variant === 'success') {
          buttonClass = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        }
        
        if (size === 'sm') buttonClass = buttonClass.replace('py-2 px-4', 'py-1 px-2 text-sm');
        if (size === 'lg') buttonClass = buttonClass.replace('py-2 px-4', 'py-3 px-6 text-lg');
        break;
      case 'bulma':
        buttonClass = `button is-${variant}`;
        if (size === 'sm') buttonClass += ' is-small';
        if (size === 'lg') buttonClass += ' is-large';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed (for custom styling)
    if (themeMode === 'dark' && cssFramework === 'bootstrap' && variant === 'outline-secondary') {
      buttonClass += ' text-light';
    }
    
    return buttonClass;
  };
  
  const buttonClass = getClasses();
  
  return (
    <button
      type={type}
      className={`${buttonClass} ${attributes.class || ''}`}
      {...attributes}
    >
      {t(text)}
    </button>
  );
};

export default ButtonElement;
