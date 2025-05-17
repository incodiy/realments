import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const FileElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    thumbnail,
    attributes
  } = element;
  
  // Initialize file name if value exists
  useEffect(() => {
    if (value) {
      if (typeof value === 'string') {
        // Extract file name from path
        const parts = value.split('/');
        setFileName(parts[parts.length - 1]);
        
        // Set preview if thumbnail is enabled
        if (thumbnail && thumbnail.enabled) {
          setPreview(value);
        }
      } else if (value instanceof File) {
        setFileName(value.name);
        
        // Create preview for image files
        if (thumbnail && thumbnail.enabled && value.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target.result);
          };
          reader.readAsDataURL(value);
        }
      }
    }
  }, [value, thumbnail]);
  
  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setFileName(file.name);
      
      // Create preview for image files
      if (thumbnail && thumbnail.enabled && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFileName('');
      setPreview(null);
    }
  };
  
  // Clear file selection
  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileName('');
    setPreview(null);
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      input: '',
      fileContainer: '',
      fileName: '',
      clearButton: '',
      thumbnailContainer: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.input = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.fileContainer = 'd-flex align-items-center';
        classes.fileName = 'ms-2';
        classes.clearButton = 'btn btn-sm btn-outline-danger ms-2';
        classes.thumbnailContainer = 'mt-2 mb-2';
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.input = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.fileContainer = 'flex items-center';
        classes.fileName = 'ml-2';
        classes.clearButton = 'ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs';
        classes.thumbnailContainer = 'mt-2 mb-2';
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.input = `file-input ${errorMessage ? 'is-danger' : ''}`;
        classes.fileContainer = 'file has-name';
        classes.fileName = 'file-name';
        classes.clearButton = 'button is-small is-danger ml-2';
        classes.thumbnailContainer = 'mt-2 mb-2';
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
          classes.fileName += ' text-light';
          break;
        case 'tailwind':
          classes.input = classes.input.replace('text-gray-700', 'text-white');
          classes.input += ' bg-gray-700 border-gray-600';
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          classes.fileName = classes.fileName.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          classes.input += ' has-background-dark has-text-light';
          classes.fileName += ' has-background-dark has-text-light';
          break;
        default:
          break;
      }
    }
    
    return classes;
  };
  
  const classes = getClasses();
  
  // Render file input based on framework
  const renderFileInput = () => {
    if (cssFramework === 'bulma') {
      return (
        <div className={classes.fileContainer}>
          <label className="file-label">
            <input
              type="file"
              ref={fileInputRef}
              id={attributes.id}
              name={name}
              onChange={handleFileChange}
              className={classes.input}
              accept={attributes.accept}
              multiple={attributes.multiple}
              {...attributes}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                {t('Choose a file...')}
              </span>
            </span>
            {fileName && (
              <span className={classes.fileName}>
                {fileName}
              </span>
            )}
          </label>
          {fileName && (
            <button
              type="button"
              className={classes.clearButton}
              onClick={clearFile}
            >
              {t('Clear')}
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div className={classes.fileContainer}>
        <input
          type="file"
          ref={fileInputRef}
          id={attributes.id}
          name={name}
          onChange={handleFileChange}
          className={`${classes.input} ${attributes.class || ''}`}
          accept={attributes.accept}
          multiple={attributes.multiple}
          {...attributes}
        />
        {fileName && (
          <>
            <span className={classes.fileName}>
              {fileName}
            </span>
            <button
              type="button"
              className={classes.clearButton}
              onClick={clearFile}
            >
              {t('Clear')}
            </button>
          </>
        )}
      </div>
    );
  };
  
  // Render thumbnail preview
  const renderThumbnail = () => {
    if (!thumbnail || !thumbnail.enabled || !preview) {
      return null;
    }
    
    const thumbnailSize = thumbnail.size || 150;
    const thumbnailStyle = {
      maxWidth: `${thumbnailSize}px`,
      maxHeight: `${thumbnailSize}px`,
      objectFit: 'contain'
    };
    
    return (
      <div className={classes.thumbnailContainer}>
        <img src={preview} alt={fileName} style={thumbnailStyle} />
      </div>
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
      
      {/* Thumbnail (if position is top) */}
      {thumbnail && thumbnail.enabled && thumbnail.position === 'top' && renderThumbnail()}
      
      {/* File Input */}
      {renderFileInput()}
      
      {/* Thumbnail (if position is bottom) */}
      {thumbnail && thumbnail.enabled && thumbnail.position !== 'top' && renderThumbnail()}
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FileElement;
