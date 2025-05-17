import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TagsElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    attributes
  } = element;
  
  // Initialize tags
  useEffect(() => {
    if (value && Array.isArray(value)) {
      setTags(value);
    }
  }, [value]);
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Handle key down (for adding tags)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Add tag
  const addTag = () => {
    const trimmedInput = inputValue.trim();
    
    if (trimmedInput && !tags.includes(trimmedInput)) {
      const newTags = [...tags, trimmedInput];
      setTags(newTags);
      setInputValue('');
    }
  };
  
  // Remove tag
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      tagsContainer: '',
      tag: '',
      tagRemove: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.tagsContainer = 'd-flex flex-wrap gap-2 mb-2';
        classes.tag = 'badge bg-primary d-flex align-items-center';
        classes.tagRemove = 'ms-1 text-white cursor-pointer';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.tagsContainer = 'flex flex-wrap gap-2 mb-2';
        classes.tag = 'bg-blue-500 text-white text-sm font-medium px-2 py-1 rounded flex items-center';
        classes.tagRemove = 'ml-1 cursor-pointer';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `input ${errorMessage ? 'is-danger' : ''}`;
        classes.tagsContainer = 'tags mb-2';
        classes.tag = 'tag is-primary';
        classes.tagRemove = 'delete is-small ml-1';
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
      
      {/* Tags Display */}
      <div className={classes.tagsContainer}>
        {tags.map((tag, index) => (
          <div key={`tag-${index}`} className={classes.tag}>
            {tag}
            <span 
              className={classes.tagRemove} 
              onClick={() => removeTag(tag)}
            >
              &times;
            </span>
            <input 
              type="hidden" 
              name={`${name}[]`} 
              value={tag} 
            />
          </div>
        ))}
      </div>
      
      {/* Input for new tags */}
      <input
        type="text"
        id={attributes.id}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        className={`${classes.input} ${attributes.class || ''}`}
        placeholder={t('Type and press Enter to add tags')}
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

export default TagsElement;
