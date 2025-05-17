import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TextareaElement = ({ element, errorMessage, value, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  
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
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js';
      script.onload = () => {
        window.tinymce.init({
          selector: `#${attributes.id}`,
          plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
          toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl',
          menubar: 'file edit view insert format tools table help',
          setup: (editor) => {
            editor.on('change', () => {
              setInputValue(editor.getContent());
            });
          },
          ...(wysiwyg.config || {})
        }).then(resolve).catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  // Load CKEditor
  const loadCKEditor = () => {
    return new Promise((resolve, reject) => {
      if (window.ClassicEditor) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js';
      script.onload = () => {
        window.ClassicEditor.create(document.querySelector(`#${attributes.id}`), {
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
          ...(wysiwyg.config || {})
        }).then(editor => {
          editor.model.document.on('change:data', () => {
            setInputValue(editor.getData());
          });
          resolve();
        }).catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  // Load Quill
  const loadQuill = () => {
    return new Promise((resolve, reject) => {
      if (window.Quill) {
        resolve();
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
          const quill = new window.Quill(`#${attributes.id}_container`, {
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
          
          resolve();
        }, 100);
      };
      script.onerror = reject;
      document.head.appendChild(script);
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
          {wysiwyg.editor === 'quill' ? (
            <div id={`${attributes.id}_container`} style={{ height: '200px' }}></div>
          ) : null}
          <textarea
            id={attributes.id}
            name={name}
            value={inputValue}
            onChange={handleChange}
            className={`${classes.textarea} ${attributes.class || ''} ${wysiwyg.editor === 'quill' ? 'd-none' : ''}`}
            {...attributes}
          ></textarea>
        </>
      ) : (
        <textarea
          id={attributes.id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={`${classes.textarea} ${attributes.class || ''}`}
          {...attributes}
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
