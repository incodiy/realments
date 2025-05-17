import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Hook for handling validation
const useValidation = (element, errors, oldInput) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationRules, setValidationRules] = useState({});
  const [value, setValue] = useState(null);
  
  // Initialize validation state
  useEffect(() => {
    // Set validation rules if available
    if (element.validation && element.validation.rules) {
      setValidationRules(element.validation.rules);
    }
    
    // Set error message if available
    if (errors && errors[element.name]) {
      setErrorMessage(errors[element.name][0]);
    } else {
      setErrorMessage(null);
    }
    
    // Set value from old input if available
    if (oldInput && oldInput[element.name] !== undefined) {
      setValue(oldInput[element.name]);
    } else if (element.value !== undefined) {
      setValue(element.value);
    }
  }, [element, errors, oldInput]);
  
  // Client-side validation
  const validate = (value) => {
    // Skip validation if no rules
    if (!validationRules || Object.keys(validationRules).length === 0) {
      return true;
    }
    
    let isValid = true;
    let message = null;
    
    // Process validation rules
    if (typeof validationRules === 'string') {
      // Parse Laravel-style validation rules
      const rules = validationRules.split('|');
      
      for (const rule of rules) {
        const [ruleName, ruleValue] = rule.includes(':') 
          ? rule.split(':') 
          : [rule, null];
        
        switch (ruleName) {
          case 'required':
            if (!value || value === '') {
              isValid = false;
              message = t('This field is required');
            }
            break;
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
              isValid = false;
              message = t('Please enter a valid email address');
            }
            break;
          case 'min':
            if (value && value.length < parseInt(ruleValue)) {
              isValid = false;
              message = t('This field must be at least {min} characters', { min: ruleValue });
            }
            break;
          case 'max':
            if (value && value.length > parseInt(ruleValue)) {
              isValid = false;
              message = t('This field must not exceed {max} characters', { max: ruleValue });
            }
            break;
          case 'numeric':
            if (value && isNaN(value)) {
              isValid = false;
              message = t('This field must be a number');
            }
            break;
          // Add more validation rules as needed
        }
        
        // Stop on first error
        if (!isValid) break;
      }
    } else if (typeof validationRules === 'object') {
      // Process object-style validation rules
      // This would handle more complex validation scenarios
    }
    
    setErrorMessage(message);
    return isValid;
  };
  
  return { errorMessage, validate, value };
};

export default useValidation;
