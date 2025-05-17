import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const AutocompleteElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    options,
    attributes
  } = element;
  
  // Initialize input value
  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);
  
  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 0) {
      // Filter options based on input value
      const filteredOptions = options.filter(option => 
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredOptions);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  // Handle key navigation
  const handleKeyDown = (e) => {
    // Arrow down
    if (e.keyCode === 40 && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    // Arrow up
    else if (e.keyCode === 38 && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    }
    // Enter
    else if (e.keyCode === 13 && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    }
    // Escape
    else if (e.keyCode === 27) {
      setShowSuggestions(false);
    }
  };
  
  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      suggestionsContainer: '',
      suggestionItem: '',
      suggestionActive: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.suggestionsContainer = 'list-group position-absolute w-100 z-1000';
        classes.suggestionItem = 'list-group-item list-group-item-action';
        classes.suggestionActive = 'active';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4 relative';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.suggestionsContainer = 'absolute w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto z-10';
        classes.suggestionItem = 'px-4 py-2 cursor-pointer hover:bg-gray-100';
        classes.suggestionActive = 'bg-gray-100';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.suggestionsContainer = 'menu position-absolute w-100';
        classes.suggestionItem = 'menu-item';
        classes.suggestionActive = 'is-active';
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
          classes.suggestionsContainer += ' bg-dark';
          classes.suggestionItem += ' bg-dark text-light';
          break;
        case 'tailwind':
          classes.input = classes.input.replace('text-gray-700', 'text-white');
          classes.input += ' bg-gray-700 border-gray-600';
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          classes.suggestionsContainer = classes.suggestionsContainer.replace('bg-white', 'bg-gray-800');
          classes.suggestionsContainer += ' text-white';
          classes.suggestionItem = classes.suggestionItem.replace('hover:bg-gray-100', 'hover:bg-gray-700');
          classes.suggestionActive = 'bg-gray-700';
          break;
        case 'bulma':
          classes.input += ' has-background-dark has-text-light';
          classes.suggestionsContainer += ' has-background-dark has-text-light';
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
      
      {/* Input */}
      <div className="position-relative">
        <input
          type="text"
          id={attributes.id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`${classes.input} ${attributes.class || ''}`}
          autoComplete="off"
          {...attributes}
        />
        
        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className={classes.suggestionsContainer}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`${classes.suggestionItem} ${index === selectedIndex ? classes.suggestionActive : ''}`}
                onClick={() => selectSuggestion(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
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

export default AutocompleteElement;
