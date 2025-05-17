import React from 'react';
import { useTranslation } from 'react-i18next';

const ThemeProvider = ({ children, cssFramework, themeMode }) => {
  // Apply CSS classes based on the selected framework and theme mode
  const getThemeClass = () => {
    if (cssFramework === 'bootstrap') {
      return themeMode === 'dark' ? 'bg-dark text-light' : '';
    } else if (cssFramework === 'tailwind') {
      return themeMode === 'dark' ? 'bg-gray-800 text-white' : '';
    } else if (cssFramework === 'bulma') {
      return themeMode === 'dark' ? 'has-background-dark has-text-light' : '';
    }
    return '';
  };

  return (
    <div className={`realments-theme ${getThemeClass()}`}>
      {children}
    </div>
  );
};

export default ThemeProvider;
