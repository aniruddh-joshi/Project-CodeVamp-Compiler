import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';

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
    <div className="relative inline-block">
      <select
        value={selectedLanguage.id}
        onChange={(e) => {
          const language = languages.find((lang) => lang.id === e.target.value);
          if (language) onLanguageChange(language);
        }}
        className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {languages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}