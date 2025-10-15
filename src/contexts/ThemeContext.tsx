'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type InterfaceDensity = 'comfortable' | 'compact' | 'spacious';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  density: InterfaceDensity;
  setDensity: (density: InterfaceDensity) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [density, setDensity] = useState<InterfaceDensity>('comfortable');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedDensity = localStorage.getItem('density') as InterfaceDensity;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedDensity) setDensity(savedDensity);
  }, []);

  // Resolve theme based on system preference
  useEffect(() => {
    const resolveTheme = () => {
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    resolveTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        resolveTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(resolvedTheme);
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Apply density to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing density classes
    root.classList.remove('comfortable', 'compact', 'spacious');
    
    // Add new density class
    root.classList.add(density);
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-density', density);
  }, [density]);

  // Save preferences to localStorage
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSetDensity = (newDensity: InterfaceDensity) => {
    setDensity(newDensity);
    localStorage.setItem('density', newDensity);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        density,
        setDensity: handleSetDensity,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
