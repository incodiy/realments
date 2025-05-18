import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * RichTextElement Component
 * 
 * Renders a rich text editor with various editor options (TinyMCE, CKEditor, Quill).
 * 
 * @param {Object} props - Component props
 * @param {Object} props.element - Element configuration object
 * @param {string} props.element.name - Field name
 * @param {string} props.element.label - Label text
 * @param {boolean} props.element.show_label - Whether to show the label
 * @param {string} props.element.editor - Editor type (tinymce, ckeditor, quill)
 * @param {Object} props.element.editor_config - Configuration options for the editor
 * @param {Object} props.element.attributes - HTML attributes for the textarea
 * @param {string} props.errorMessage - Error message to display (if any)
 * @param {string} props.value - Initial value for the editor
 * @param {string} props.cssFramework - CSS framework to use (bootstrap, tailwind, bulma)
 * @param {string} props.themeMode - Theme mode (light, dark)
 * @returns {React.ReactElement} Rich text editor component
 */
const RichTextElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  
  // Destructure element properties
  const { 
    name, 
    label, 
    show_label, 
    editor_settings,
    attributes
  } = element;
  
  const editorType = editor_settings?.editor || 'tinymce';
  const editorConfig = editor_settings?.config || {};
  const editorHeight = editor_settings?.height || 300;
  
  // Initialize input value
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  // Load editor
  useEffect(() => {
    // Ensure the component is mounted before loading the editor
    if (containerRef.current) {
      loadEditor();
    }
    
    // Cleanup function to destroy editor instances
    return () => {
      if (editorRef.current) {
        try {
          if (editorType === 'tinymce' && window.tinymce) {
            window.tinymce.remove(`#${attributes.id}`);
          } else if (editorType === 'ckeditor' && editorRef.current.destroy) {
            editorRef.current.destroy();
          }
        } catch (error) {
          console.error('Error cleaning up editor:', error);
        }
      }
    };
  }, [containerRef.current]);
  
  // Load editor based on type
  const loadEditor = async () => {
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
      try {
        window.tinymce.init({
          selector: `#${attributes.id}`,
          plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
          toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl',
          menubar: 'file edit view insert format tools table help',
          height: editorHeight,
          setup: (editor) => {
            editorRef.current = editor;
            editor.on('change', () => {
              setInputValue(editor.getContent());
            });
          },
          skin: themeMode === 'dark' ? 'oxide-dark' : 'oxide',
          content_css: themeMode === 'dark' ? 'dark' : 'default',
          ...editorConfig
        }).then(editors => {
          if (editors && editors.length > 0) {
            // Set initial content if available
            if (value) {
              editors[0].setContent(value);
            }
          }
          resolve();
        }).catch(error => {
          console.error('TinyMCE initialization error:', error);
          reject(error);
        });
      } catch (error) {
        console.error('TinyMCE initialization exception:', error);
        reject(error);
      }
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
            ...editorConfig
          })
          .then(editor => {
            editorRef.current = editor;
            editor.model.document.on('change:data', () => {
              setInputValue(editor.getData());
            });
            
            // Set initial content if available
            if (value) {
              editor.setData(value);
            }
            
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
          ...editorConfig
        });
        
        editorRef.current = quill;
        quill.on('text-change', () => {
          setInputValue(quill.root.innerHTML);
        });
        
        // Set initial content if available
        if (value) {
          quill.clipboard.dangerouslyPasteHTML(value);
        }
        
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
      editorContainer: '',
      error: ''
    };
    
    switch (cssFramework) {
      case 'bootstrap':
        classes.formGroup = 'mb-3';
        classes.label = 'form-label';
        classes.editorContainer = 'rich-text-editor';
        classes.error = 'invalid-feedback d-block';
        break;
      case 'tailwind':
        classes.formGroup = 'mb-4';
        classes.label = 'block text-gray-700 text-sm font-bold mb-2';
        classes.editorContainer = 'rich-text-editor';
        classes.error = 'text-red-500 text-xs italic mt-1';
        break;
      case 'bulma':
        classes.formGroup = 'field';
        classes.label = 'label';
        classes.editorContainer = 'rich-text-editor';
        classes.error = 'help is-danger';
        break;
      default:
        break;
    }
    
    // Apply dark mode if needed
    if (themeMode === 'dark') {
      switch (cssFramework) {
        case 'tailwind':
          classes.label = classes.label.replace('text-gray-700', 'text-gray-300');
          break;
        default:
          break;
      }
    }
    
    return classes;
  };
  
  const classes = getClasses();
  
  // Extract React-specific props from attributes
  const { className, ...otherAttributes } = attributes;
  
  return (
    <div className={classes.formGroup} ref={containerRef}>
      {/* Label */}
      {show_label && (
        <label htmlFor={attributes.id} className={classes.label}>
          {t(label)}
        </label>
      )}
      
      {/* Editor Container */}
      <div className={classes.editorContainer}>
        {editorType === 'quill' ? (
          <div id={`${attributes.id}_container`} style={{ height: `${editorHeight}px` }}></div>
        ) : null}
        
        <textarea
          id={attributes.id}
          name={name}
          defaultValue={inputValue}
          className={`${className || ''} ${editorType === 'quill' ? 'd-none' : ''}`}
          style={{ display: editorType !== 'quill' && editorLoaded ? 'none' : '' }}
          {...otherAttributes}
        ></textarea>
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

export default RichTextElement;
