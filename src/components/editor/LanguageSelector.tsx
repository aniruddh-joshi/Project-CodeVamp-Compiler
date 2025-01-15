import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../../types';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-2 cursor-pointer">
        <span className="text-xl">{selectedLanguage.icon}</span>
        <select
          value={selectedLanguage.id}
          onChange={(e) => {
            const language = languages.find(lang => lang.id === e.target.value);
            if (language) onLanguageChange(language);
          }}
          className="appearance-none bg-transparent w-full text-gray-700 dark:text-gray-200 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          {languages.map(language => (
            <option key={language.id} value={language.id} className="bg-white dark:bg-gray-700">
              {language.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-300" />
      </div>
    </div>
  );
}