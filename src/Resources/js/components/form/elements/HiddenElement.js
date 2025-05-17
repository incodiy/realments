import React from 'react';
import { useTranslation } from 'react-i18next';

const HiddenElement = ({ element, value, cssFramework, themeMode }) => {
  // Destructure element properties
  const { 
    name, 
    attributes
  } = element;
  
  // Use value from element or passed value
  const inputValue = value !== undefined ? value : element.value;
  
  return (
    <input
      type="hidden"
      id={attributes.id}
      name={name}
      value={inputValue || ''}
      {...attributes}
    />
  );
};

export default HiddenElement;
