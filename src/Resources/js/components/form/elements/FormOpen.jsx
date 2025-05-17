import React from 'react';
import { useTranslation } from 'react-i18next';

const FormOpen = ({ element, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  
  // Get form attributes
  const { id, method, action, enctype, attributes } = element;
  
  // Get CSS classes based on framework
  const getFormClass = () => {
    switch (cssFramework) {
      case 'bootstrap':
        return 'needs-validation';
      case 'tailwind':
        return '';
      case 'bulma':
        return '';
      default:
        return '';
    }
  };
  
  // Get theme class
  const getThemeClass = () => {
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          return 'bg-dark text-light';
        case 'tailwind':
          return 'bg-gray-800 text-white';
        case 'bulma':
          return 'has-background-dark has-text-light';
        default:
          return '';
      }
    }
    return '';
  };
  
  // Combine classes
  const formClass = `${getFormClass()} ${getThemeClass()} ${attributes.class || ''}`.trim();
  
  return (
    <form
      id={id}
      method={method.toLowerCase()}
      action={action}
      encType={enctype}
      className={formClass}
      noValidate
    >
      {method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'POST' && (
        <input type="hidden" name="_method" value={method.toUpperCase()} />
      )}
      
      {method.toUpperCase() !== 'GET' && (
        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
      )}
    </form>
  );
};

export default FormOpen;
