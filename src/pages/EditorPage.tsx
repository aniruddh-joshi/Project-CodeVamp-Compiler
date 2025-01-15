import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { EditorToolbar } from '../components/editor/EditorToolbar';
import { CodeEditor } from '../components/editor/CodeEditor';
import { Console } from '../components/editor/Console';
import { HistoryPanel } from '../components/history/HistoryPanel';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { BOILERPLATE_CODE } from '../constants/boilerplate';
import { executeCode } from '../utils/codeExecution';
import { saveCodeSnippet, getHistory } from '../utils/storage';
import { Theme, Language } from '../types';

interface EditorPageProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function EditorPage({ theme, onThemeToggle }: EditorPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [code, setCode] = useState(BOILERPLATE_CODE[SUPPORTED_LANGUAGES[0].id]);
  const [output, setOutput] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState(getHistory);
  const [input, setInput] = useState('');

  useEffect(() => {
    setCode(BOILERPLATE_CODE[selectedLanguage.id]);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    setOutput('Executing...');
    const result = await executeCode(code, selectedLanguage.id, input);
    setOutput(result);
    saveCodeSnippet(code, selectedLanguage.id);
    setHistory(getHistory());
  };

  const handleInput = (newInput: string) => {
    setInput(prev => prev ? `${prev}\n${newInput}` : newInput);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${selectedLanguage.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header theme={theme} onThemeToggle={onThemeToggle} />
      
      <main className="container mx-auto px-4 py-8">
        <EditorToolbar
          languages={SUPPORTED_LANGUAGES}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          onRun={handleRunCode}
          onDownload={handleDownload}
          onHistoryClick={() => setIsHistoryOpen(true)}
        />

        <div className="space-y-6">
          <CodeEditor
            code={code}
            language={selectedLanguage}
            theme={theme}
            onChange={setCode}
          />
          <Console 
            output={output} 
            onInput={handleInput}
          />
        </div>
      </main>

      {isHistoryOpen && (
        <HistoryPanel
          history={history}
          onSelect={(snippet) => {
            setCode(snippet.code);
            const language = SUPPORTED_LANGUAGES.find(lang => lang.id === snippet.language);
            if (language) setSelectedLanguage(language);
            setIsHistoryOpen(false);
          }}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}
    </div>
  );
}