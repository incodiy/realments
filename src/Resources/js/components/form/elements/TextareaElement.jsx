import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * TextareaElement Component
 * 
 * Renders a textarea input element with optional WYSIWYG editor integration.
 * Supports TinyMCE, CKEditor, and Quill editors.
 * 
 * @param {Object} element - Element configuration object
 * @param {string} errorMessage - Error message to display if validation fails
 * @param {string} value - Default value for the textarea
 * @param {string} cssFramework - CSS framework to use for styling (bootstrap, tailwind, bulma)
 * @param {string} themeMode - Theme mode (light, dark)
 */
const TextareaElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    wysiwyg,
    attributes
  } = element;
  
  // Initialize input value
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  // Load WYSIWYG editor if enabled
  useEffect(() => {
    if (wysiwyg && wysiwyg.enabled) {
      loadEditor();
    }
    
    // Cleanup function to destroy editor instances
    return () => {
      if (editorInstance) {
        if (wysiwyg && wysiwyg.editor === 'tinymce' && window.tinymce) {
          window.tinymce.remove(`#${attributes.id}`);
        }
      }
    };
  }, [wysiwyg]);
  
  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Load WYSIWYG editor
  const loadEditor = async () => {
    const editorType = wysiwyg.editor || 'tinymce';
    
    try {
      switch (editorType) {
        case 'tinymce':
          await loadTinyMCE();
          break;
        case 'ckeditor':
          await loadCKEditor();
          break;
        case 'quill':
          await loadQuill();
          break;
        default:
          console.error(`Unsupported editor type: ${editorType}`);
      }
      
      setEditorLoaded(true);
    } catch (error) {
      console.error(`Failed to load ${editorType} editor:`, error);
    }
  };
  
  // Load TinyMCE
  const loadTinyMCE = () => {
    return new Promise((resolve, reject) => {
      if (window.tinymce) {
        initTinyMCE().then(resolve).catch(reject);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
      script.onload = () => {
        initTinyMCE().then(resolve).catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  // Initialize TinyMCE
  const initTinyMCE = () => {
    return new Promise((resolve, reject) => {
      window.tinymce.init({
        selector: `#${attributes.id}`,
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl',
        menubar: 'file edit view insert format tools table help',
        setup: (editor) => {
          editor.on('change', () => {
            setInputValue(editor.getContent());
          });
          setEditorInstance(editor);
        },
        ...(wysiwyg.config || {})
      }).then(resolve).catch(reject);
    });
  };
  
  // Load CKEditor
  const loadCKEditor = () => {
    return new Promise((resolve, reject) => {
      if (window.ClassicEditor) {
        initCKEditor().then(resolve).catch(reject);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js';
      script.onload = () => {
        setTimeout(() => {
          initCKEditor().then(resolve).catch(reject);
        }, 100);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  // Initialize CKEditor
  const initCKEditor = () => {
    return new Promise((resolve, reject) => {
      try {
        const element = document.querySelector(`#${attributes.id}`);
        if (!element) {
          reject(new Error(`Element with ID ${attributes.id} not found`));
          return;
        }
        
        window.ClassicEditor
          .create(element, {
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertTable',
                'undo',
                'redo'
              ]
            },
            ...(wysiwyg.config || {})
          })
          .then(editor => {
            editor.model.document.on('change:data', () => {
              setInputValue(editor.getData());
            });
            setEditorInstance(editor);
            resolve(editor);
          })
          .catch(error => {
            console.error('CKEditor initialization error:', error);
            reject(error);
          });
      } catch (error) {
        console.error('CKEditor initialization exception:', error);
        reject(error);
      }
    });
  };
  
  // Load Quill
  const loadQuill = () => {
    return new Promise((resolve, reject) => {
      if (window.Quill) {
        initQuill().then(resolve).catch(reject);
        return;
      }
      
      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
      document.head.appendChild(link);
      
      // Load JS
      const script = document.createElement('script');
      script.src = 'https://cdn.quilljs.com/1.3.6/quill.min.js';
      script.onload = () => {
        setTimeout(() => {
          initQuill().then(resolve).catch(reject);
        }, 100);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  // Initialize Quill
  const initQuill = () => {
    return new Promise((resolve, reject) => {
      try {
        const container = document.querySelector(`#${attributes.id}_container`);
        if (!container) {
          reject(new Error(`Container with ID ${attributes.id}_container not found`));
          return;
        }
        
        const quill = new window.Quill(container, {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          theme: 'snow',
          ...(wysiwyg.config || {})
        });
        
        quill.on('text-change', () => {
          setInputValue(quill.root.innerHTML);
        });
        
        setEditorInstance(quill);
        resolve(quill);
      } catch (error) {
        console.error('Quill initialization error:', error);
        reject(error);
      }
    });
  };
  
  // Get CSS classes based on framework
  const getClasses = () => {
    const classes = {
      formGroup: '',
      label: '',
      textarea: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.textarea = `form-control ${errorMessage ? 'is-invalid' : ''}`;
        classes.error = 'invalid-feedback';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.textarea = `shadow appearance-none border ${errorMessage ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
        classes.error = 'text-red-500 text-xs italic';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.textarea = `textarea ${errorMessage ? 'is-danger' : ''}`;
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'bootstrap':
          classes.textarea += ' bg-dark text-light';
          break;
        case 'tailwind':
          classes.textarea = classes.textarea.replace('text-gray-700', 'text-white');
          classes.textarea += ' bg-gray-700 border-gray-600';
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          break;
        case 'bulma':
          classes.textarea += ' has-background-dark has-text-light';
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
      
      {/* WYSIWYG editor or regular textarea */}
      {wysiwyg && wysiwyg.enabled ? (
        <>
          {wysiwyg.editor === 'quill' && (
            <div id={`${attributes.id}_container`} style={{ height: '200px', marginBottom: '10px' }}></div>
          )}
          <textarea
            id={attributes.id}
            name={name}
            defaultValue={inputValue}
            onChange={handleChange}
            className={`${classes.textarea} ${attributes.className || ''} ${wysiwyg.editor === 'quill' ? 'd-none' : ''}`}
            rows={attributes.rows || 5}
          ></textarea>
        </>
      ) : (
        <textarea
          id={attributes.id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={`${classes.textarea} ${attributes.className || ''}`}
          rows={attributes.rows || 5}
        ></textarea>
      )}
      
      {/* Error message */}
      {errorMessage && (
        <div className={classes.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextareaElement;
