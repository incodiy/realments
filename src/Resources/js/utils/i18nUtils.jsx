import React from 'react';
import { useTranslation } from 'react-i18next';

// Utility functions for internationalization
const i18nUtils = {
  // Load translations from server
  loadTranslations: async (locale) => {
    try {
      const response = await fetch(`/api/realments/translations/${locale}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      return {};
    }
  },
  
  // Format translation key
  formatKey: (key) => {
    // Convert from dot notation to nested object
    // e.g., 'validation.required' -> { validation: { required: 'This field is required' } }
    const parts = key.split('.');
    let result = {};
    let current = result;
    
    for (let i = 0; i < parts.length - 1; i++) {
      current[parts[i]] = {};
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = '';
    
    return result;
  },
  
  // Get available locales
  getAvailableLocales: async () => {
    try {
      const response = await fetch('/api/realments/locales');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get available locales:', error);
      return ['en']; // Default to English
    }
  },
  
  // Get browser locale
  getBrowserLocale: () => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang;
  },
  
  // Get default locale
  getDefaultLocale: async () => {
    const browserLocale = i18nUtils.getBrowserLocale();
    const availableLocales = await i18nUtils.getAvailableLocales();
    
    return availableLocales.includes(browserLocale) ? browserLocale : 'en';
  }
};

export default i18nUtils;
