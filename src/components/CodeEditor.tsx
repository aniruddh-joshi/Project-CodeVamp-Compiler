import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Language, Theme } from '../types';

interface CodeEditorProps {
  code: string;
  language: Language;
  theme: Theme;
  onChange: (value: string) => void;
}

export function CodeEditor({ code, language, theme, onChange }: CodeEditorProps) {
  const getLanguageExtension = (languageId: string) => {
    switch (languageId) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      default:
        return javascript();
    }
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
      <CodeMirror
        value={code}
        height="500px"
        theme={theme === 'dark' ? vscodeDark : undefined}
        extensions={[getLanguageExtension(language.id)]}
        onChange={onChange}
        className="text-sm"
      />
    </div>
  );
}