import React from 'react';
import { Code2, Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center space-x-2">
        <Code2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          CodeVamp
        </h1>
      </div>
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