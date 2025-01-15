import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { EditorPage } from './pages/EditorPage';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Sync theme with document class and localStorage
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage theme={theme} onThemeToggle={toggleTheme} />} 
        />
        <Route 
          path="/editor" 
          element={<EditorPage theme={theme} onThemeToggle={toggleTheme} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;