"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import siteConfig from '@/config/site-config.json';

// Types
type LanguageCode = "en" | "tr";

interface LanguageContextValue {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (path: string) => any;
  config: typeof siteConfig;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Create context
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("tr");

  // Load language from localStorage on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("preferred-language");
      if (savedLanguage === "en" || savedLanguage === "tr") {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn("Failed to load language from localStorage:", error);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("preferred-language", currentLanguage);
    } catch (error) {
      console.warn("Failed to save language to localStorage:", error);
    }
  }, [currentLanguage]);

  // Function to switch language
  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
  };

  // Translation function with fallback
  const t = (path: string): any => {
    try {
      const keys = path.split('.');
      let current: any = (siteConfig as any)[currentLanguage];
      
      // Navigate through the nested object
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          // Fallback to English if translation is missing
          let fallback: any = (siteConfig as any).en;
          for (const fallbackKey of keys) {
            if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
              fallback = fallback[fallbackKey];
            } else {
              console.warn(`Translation not found for path: ${path} in both ${currentLanguage} and en`);
              return path; // Return the path itself as last resort
            }
          }
          return fallback;
        }
      }
      
      return current;
    } catch (error) {
      console.error(`Error getting translation for path: ${path}`, error);
      return path; // Return the path itself on error
    }
  };

  const contextValue: LanguageContextValue = {
    currentLanguage,
    setLanguage,
    t,
    config: siteConfig,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

// Export context for advanced use cases
export { LanguageContext };