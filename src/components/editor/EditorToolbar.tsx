import React from 'react';
import { Play, Download, History } from 'lucide-react';
import { Language } from '../../types';
import { LanguageSelector } from './LanguageSelector';
import { ActionButton } from '../buttons/ActionButton';

interface EditorToolbarProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onRun: () => void;
  onDownload: () => void;
  onHistoryClick: () => void;
}

export function EditorToolbar({
  languages,
  selectedLanguage,
  onLanguageChange,
  onRun,
  onDownload,
  onHistoryClick,
}: EditorToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <LanguageSelector
          languages={languages}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />
        <ActionButton
          icon={History}
          label="History"
          onClick={onHistoryClick}
        />
      </div>
      <div className="flex space-x-4">
        <ActionButton
          icon={Download}
          label="Download"
          onClick={onDownload}
        />
        <ActionButton
          icon={Play}
          label="Run Code"
          onClick={onRun}
          primary
        />
      </div>
    </div>
  );
}