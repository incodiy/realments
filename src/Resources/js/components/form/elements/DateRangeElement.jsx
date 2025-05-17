import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DateRangeElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize input values
  useEffect(() => {
    if (value && Array.isArray(value) && value.length === 2) {
      setStartDate(value[0] || '');
      setEndDate(value[1] || '');
    }
  }, [value]);
  
  // Handle start date change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  
  // Handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      rangeContainer: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.rangeContainer = 'd-flex align-items-center gap-2';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.rangeContainer = 'flex items-center space-x-2';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.rangeContainer = 'is-flex is-align-items-center is-justify-content-space-between';
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
        <label htmlFor={`${attributes.id}_start`} className={classes.label}>
          {t(label)}
        </label>
      )}
      
      {/* Date Range Inputs */}
      <div className={classes.rangeContainer}>
        <input
          type="date"
          id={`${attributes.id}_start`}
          name={`${name}[0]`}
          value={startDate}
          onChange={handleStartDateChange}
          className={`${classes.input} ${attributes.class || ''}`}
          min={attributes.min}
          max={endDate || attributes.max}
          placeholder={t('Start Date')}
          {...attributes}
        />
        
        <span>{t('to')}</span>
        
        <input
          type="date"
          id={`${attributes.id}_end`}
          name={`${name}[1]`}
          value={endDate}
          onChange={handleEndDateChange}
          className={`${classes.input} ${attributes.class || ''}`}
          min={startDate || attributes.min}
          max={attributes.max}
          placeholder={t('End Date')}
          {...attributes}
        />
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DateRangeElement;
