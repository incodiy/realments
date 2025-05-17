import React from 'react';
import { createRoot } from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import components
import FormRenderer from './components/form/FormRenderer';
import ThemeProvider from './components/ui/ThemeProvider';

/**
 * Initialize i18next for internationalization
 */
i18next.use(initReactI18next).init({
  resources: {},
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

/**
 * Main Realments Component
 * 
 * Renders the form with all its elements based on the configuration
 * provided in the window.realmentsData object.
 * 
 * @returns {React.ReactElement} The rendered form
 */
const Realments = () => {
  const [initialized, setInitialized] = React.useState(false);
  const [translations, setTranslations] = React.useState({});
  
  // Get data from window object
  const { elements, errors, oldInput, cssFramework, themeMode } = window.realmentsData || {};
  
  // Load translations
  React.useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Get browser language or use default
        const browserLang = navigator.language.split('-')[0];
        const locale = ['en', 'id'].includes(browserLang) ? browserLang : 'en';
        
        // Fetch translations from API
        const response = await fetch(`/api/realments/translations/${locale}`);
        const data = await response.json();
        
        // Add translations to i18next
        Object.keys(data).forEach(namespace => {
          i18next.addResourceBundle(locale, namespace, data[namespace], true, true);
        });
        
        setTranslations(data);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setInitialized(true);
      }
    };
    
    loadTranslations();
  }, []);
  
  if (!initialized) {
    return <div>Loading...</div>;
  }
  
  return (
    <ThemeProvider cssFramework={cssFramework} themeMode={themeMode}>
      <FormRenderer 
        elements={elements} 
        errors={errors} 
        oldInput={oldInput}
        cssFramework={cssFramework}
        themeMode={themeMode}
      />
    </ThemeProvider>
  );
};

/**
 * Initialize the Realments application
 * 
 * Finds the container element and renders the Realments component
 */
const init = () => {
  const containerId = window.realmentsData && window.realmentsData.containerId 
    ? document.getElementById(window.realmentsData.containerId)
    : null;
    
  if (containerId) {
    const root = createRoot(containerId);
    root.render(<Realments />);
  } else {
    console.error('Realments: Container element not found');
  }
};

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export default Realments;
