import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * SelectElement Component
 * 
 * Renders a select dropdown with options, supporting single and multiple selection,
 * dynamic item addition, and various styling based on the CSS framework.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.element - Element configuration object
 * @param {string} props.element.name - Select field name
 * @param {string} props.element.label - Label text
 * @param {boolean} props.element.show_label - Whether to show the label
 * @param {Array} props.element.options - Array of options objects with value, label, and selected properties
 * @param {boolean} props.element.multiselect - Whether multiple selection is allowed
 * @param {Object} props.element.attributes - HTML attributes for the select
 * @param {Object} props.element.add_button - Configuration for add button functionality
 * @param {string} props.errorMessage - Error message to display (if any)
 * @param {string|Array|null} props.value - Initial value(s) for the select
 * @param {string} props.cssFramework - CSS framework to use (bootstrap, tailwind, bulma)
 * @param {string} props.themeMode - Theme mode (light, dark)
 * @returns {React.ReactElement} Select element with options, label, and error handling
 */
const SelectElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    options, 
    multiselect, 
    attributes, 
    add_button 
  } = element;
  
  /**
   * Initialize selected values and added items when props change
   */
  useEffect(() => {
    if (value) {
      const values = Array.isArray(value) ? value : [value];
      setSelectedValues(values);
    } else if (options) {
      // Set default selected options
      const defaultSelected = options
        .filter(option => option.selected)
        .map(option => option.value);
      
      if (defaultSelected.length > 0) {
        setSelectedValues(defaultSelected);
      }
    }
    
    // Initialize added items if provided
    if (add_button && add_button.enabled && add_button.added_items) {
      setAddedItems(add_button.added_items);
    }
  }, [value, options, add_button]);
  
  /**
   * Handle select change event
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event
   * @param {number|null} itemIndex - Index of the added item being changed, or null for main select
   */
  const handleChange = (e, itemIndex = null) => {
    const select = e.target;
    let newValues = [];
    
    if (multiselect) {
      // For multiselect, get all selected options
      newValues = Array.from(select.selectedOptions).map(option => option.value);
    } else {
      // For single select, get the selected value
      newValues = [select.value];
    }
    
    if (itemIndex !== null) {
      // Update specific added item
      const updatedItems = [...addedItems];
      updatedItems[itemIndex] = newValues;
      setAddedItems(updatedItems);
    } else {
      // Update main select
      setSelectedValues(newValues);
    }
  };
  
  /**
   * Add new select item
   */
  const handleAddItem = () => {
    if (add_button.enabled && addedItems.length < add_button.max) {
      setAddedItems([...addedItems, []]);
    }
  };
  
  /**
   * Remove select item at specified index
   * 
   * @param {number} index - Index of the item to remove
   */
  const handleRemoveItem = (index) => {
    const updatedItems = [...addedItems];
    updatedItems.splice(index, 1);
    setAddedItems(updatedItems);
  };
  
  /**
   * Get CSS classes based on framework and theme
   * 
   * @returns {Object} Object containing CSS classes for different elements
   */
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      select: '',
      error: '',
      button: '',
      buttonRemove: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.select = `form-select ${errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        classes.button = `btn btn-sm ${add_button?.class || 'btn-primary'}`;
        classes.buttonRemove = 'btn btn-sm btn-danger ms-2';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.select = `block appearance-none w-full bg-white border ${errorMessage ? 'border-red-500' : 'border-gray-400'} hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`;
        classes.error = 'text-red-500 text-xs italic';
        classes.button = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm ${add_button?.class || ''}`;
        classes.buttonRemove = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm ml-2';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.select = `select ${errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
        classes.button = `button is-small ${add_button?.class || 'is-primary'}`;
        classes.buttonRemove = 'button is-small is-danger ml-2';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.select += ' bg-dark text-light';
          break;
        case 'tailwind':
          classes.select = classes.select.replace('bg-white', 'bg-gray-700');
          classes.select += ' text-white border-gray-600';
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          classes.select += ' has-background-dark has-text-light';
          break;
        default:
          break;
      }
    }
    
    return classes;
  };
  
  const classes = getClasses();
  
  /**
   * Render select element with options
   * 
   * @param {Array} values - Currently selected values
   * @param {number|null} itemIndex - Index of the added item, or null for main select
   * @returns {React.ReactElement} Select element with options
   */
  const renderSelect = (values, itemIndex = null) => {
    const selectId = itemIndex !== null ? `${attributes.id}_${itemIndex}` : attributes.id;
    const selectName = itemIndex !== null ? `${name}[${itemIndex}]${multiselect ? '[]' : ''}` : `${name}${multiselect ? '[]' : ''}`;
    
    return (
      <select
        id={selectId}
        name={selectName}
        className={`${classes.select} ${attributes.class || ''}`}
        multiple={multiselect}
        onChange={(e) => handleChange(e, itemIndex)}
        {...attributes}
      >
        {options.map((option, optionIndex) => (
          <option
            key={`option-${optionIndex}`}
            value={option.value}
            selected={values.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  };
  
  return (
    <div className={classes.formGroup}>
      {/* Label */}
      {show_label && (
        <label htmlFor={attributes.id} className={classes.label}>
          {t(label)}
        </label>
      )}
      
      {/* Main select */}
      <div className="d-flex align-items-center">
        {renderSelect(selectedValues)}
        
        {/* Add button */}
        {add_button && add_button.enabled && add_button.position === 'right' && (
          <button
            type="button"
            className={`${classes.button} ms-2`}
            onClick={handleAddItem}
            disabled={addedItems.length >= add_button.max}
          >
            {add_button.text || t('Add')}
          </button>
        )}
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
      
      {/* Added items */}
      {addedItems.length > 0 && (
        <div className="mt-2">
          {addedItems.map((itemValues, itemIndex) => (
            <div key={`added-item-${itemIndex}`} className="d-flex align-items-center mt-2">
              {renderSelect(itemValues, itemIndex)}
              <button
                type="button"
                className={classes.buttonRemove}
                onClick={() => handleRemoveItem(itemIndex)}
              >
                {t('Remove')}
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Add button (bottom position) */}
      {add_button && add_button.enabled && add_button.position === 'bottom' && (
        <div className="mt-2">
          <button
            type="button"
            className={classes.button}
            onClick={handleAddItem}
            disabled={addedItems.length >= add_button.max}
          >
            {add_button.text || t('Add')}
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectElement;
