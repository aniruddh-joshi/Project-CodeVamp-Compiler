import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';
import { Theme } from '../../types';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <Logo />
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Developed by Aniruddh Joshi
        </span>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
}