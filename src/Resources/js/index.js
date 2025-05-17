import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import components
import FormRenderer from './components/form/FormRenderer';
import ThemeProvider from './components/ui/ThemeProvider';

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {},
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

const Realments = () => {
  const [initialized, setInitialized] = useState(false);
  const [translations, setTranslations] = useState({});
  
  // Get data from window object
  const { elements, errors, oldInput, cssFramework, themeMode } = window.realmentsData || {};
  
  // Load translations
  useEffect(() => {
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

// Initialize the app
const init = () => {
  const containerId = Object.keys(window.realmentsData || {}).length > 0 
    ? document.getElementById(window.realmentsData.containerId)
    : null;
    
  if (containerId) {
    const root = ReactDOM.createRoot(containerId);
    root.render(<Realments />);
  }
};

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export default Realments;
