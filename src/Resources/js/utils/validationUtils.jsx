import React from 'react';
import { useTranslation } from 'react-i18next';

// Utility functions for validation
const validationUtils = {
  // Parse Laravel validation rules to client-side validation
  parseRules: (rulesString) => {
    if (!rulesString) return {};
    
    const rules = {};
    const rulesList = rulesString.split('|');
    
    rulesList.forEach(rule => {
      if (rule.includes(':')) {
        const [ruleName, ruleValue] = rule.split(':');
        rules[ruleName] = ruleValue;
      } else {
        rules[rule] = true;
      }
    });
    
    return rules;
  },
  
  // Validate a value against rules
  validate: (value, rules, t) => {
    if (!rules || Object.keys(rules).length === 0) {
      return { valid: true, message: null };
    }
    
    // Required validation
    if (rules.required && (!value || value === '')) {
      return { 
        valid: false, 
        message: t('validation.required', 'This field is required') 
      };
    }
    
    // Email validation
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { 
          valid: false, 
          message: t('validation.email', 'Please enter a valid email address') 
        };
      }
    }
    
    // Min length validation
    if (rules.min && value) {
      const minLength = parseInt(rules.min);
      if (value.length < minLength) {
        return { 
          valid: false, 
          message: t('validation.min.string', 'This field must be at least {min} characters', { min: minLength }) 
        };
      }
    }
    
    // Max length validation
    if (rules.max && value) {
      const maxLength = parseInt(rules.max);
      if (value.length > maxLength) {
        return { 
          valid: false, 
          message: t('validation.max.string', 'This field must not exceed {max} characters', { max: maxLength }) 
        };
      }
    }
    
    // Numeric validation
    if (rules.numeric && value) {
      if (isNaN(value)) {
        return { 
          valid: false, 
          message: t('validation.numeric', 'This field must be a number') 
        };
      }
    }
    
    // Integer validation
    if (rules.integer && value) {
      if (!Number.isInteger(Number(value))) {
        return { 
          valid: false, 
          message: t('validation.integer', 'This field must be an integer') 
        };
      }
    }
    
    // URL validation
    if (rules.url && value) {
      try {
        new URL(value);
      } catch (e) {
        return { 
          valid: false, 
          message: t('validation.url', 'Please enter a valid URL') 
        };
      }
    }
    
    // Date validation
    if (rules.date && value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { 
          valid: false, 
          message: t('validation.date', 'Please enter a valid date') 
        };
      }
    }
    
    // Confirmed validation (for password confirmation)
    if (rules.confirmed && value) {
      const confirmField = document.querySelector(`[name="${rules.confirmed}"]`);
      if (confirmField && value !== confirmField.value) {
        return { 
          valid: false, 
          message: t('validation.confirmed', 'The confirmation does not match') 
        };
      }
    }
    
    // All validations passed
    return { valid: true, message: null };
  },
  
  // Format validation errors from Laravel to a usable format
  formatLaravelErrors: (errors) => {
    if (!errors) return {};
    
    const formattedErrors = {};
    
    // Laravel validation errors come in the format:
    // { field: ['Error message 1', 'Error message 2'] }
    Object.keys(errors).forEach(field => {
      formattedErrors[field] = errors[field][0]; // Take the first error message
    });
    
    return formattedErrors;
  }
};

export default validationUtils;
