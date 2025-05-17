import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Hook for handling theme mode
const useThemeMode = (initialMode = 'light') => {
  const { t } = useTranslation();
  const [themeMode, setThemeMode] = useState(initialMode);
  
  // Initialize theme mode
  useEffect(() => {
    // Check if user has a preference in localStorage
    const savedMode = localStorage.getItem('realments_theme_mode');
    if (savedMode) {
      setThemeMode(savedMode);
    } else {
      // Check if user prefers dark mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);
  
  // Toggle theme mode
  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('realments_theme_mode', newMode);
  };
  
  // Set specific theme mode
  const setMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setThemeMode(mode);
      localStorage.setItem('realments_theme_mode', mode);
    }
  };
  
  return { themeMode, toggleThemeMode, setMode };
};

export default useThemeMode;
