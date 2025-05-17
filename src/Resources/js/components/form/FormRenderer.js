import React from 'react';
import { useTranslation } from 'react-i18next';
import FormElement from './FormElement';

const FormRenderer = ({ elements, errors, oldInput, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  
  if (!elements || !Array.isArray(elements) || elements.length === 0) {
    return <div>No form elements to render</div>;
  }
  
  return (
    <div className={`realments-form-container ${cssFramework} ${themeMode}`}>
      {elements.map((element, index) => (
        <FormElement 
          key={`element-${index}`}
          element={element}
          errors={errors}
          oldInput={oldInput}
          cssFramework={cssFramework}
          themeMode={themeMode}
        />
      ))}
    </div>
  );
};

export default FormRenderer;
