import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Hook for handling internationalization
const useI18n = (initialLocale = 'en') => {
  const { t, i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState(initialLocale);
  
  // Initialize i18n
  useEffect(() => {
    // Try to get browser language
    const browserLang = navigator.language.split('-')[0];
    const defaultLocale = ['en', 'id'].includes(browserLang) ? browserLang : 'en';
    
    // Set initial locale
    const locale = initialLocale || defaultLocale;
    i18n.changeLanguage(locale);
    setCurrentLocale(locale);
    
    // Load translations if not already loaded
    if (!i18n.hasResourceBundle(locale, 'common')) {
      loadTranslations(locale);
    }
  }, [initialLocale, i18n]);
  
  // Load translations for a specific locale
  const loadTranslations = async (locale) => {
    try {
      const response = await fetch(`/api/realments/translations/${locale}`);
      const data = await response.json();
      
      // Add translations to i18next
      Object.keys(data).forEach(namespace => {
        i18n.addResourceBundle(locale, namespace, data[namespace], true, true);
      });
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
    }
  };
  
  // Change locale
  const changeLocale = async (locale) => {
    if (locale !== currentLocale) {
      // Load translations if not already loaded
      if (!i18n.hasResourceBundle(locale, 'common')) {
        await loadTranslations(locale);
      }
      
      i18n.changeLanguage(locale);
      setCurrentLocale(locale);
    }
  };
  
  return { t, currentLocale, changeLocale };
};

export default useI18n;
