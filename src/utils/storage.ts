const STORAGE_KEY = 'codevamp_history';

export interface CodeSnippet {
  id: string;
  code: string;
  language: string;
  timestamp: number;
}

export function saveCodeSnippet(code: string, language: string): void {
  const history = getHistory();
  const snippet: CodeSnippet = {
    id: crypto.randomUUID(),
    code,
    language,
    timestamp: Date.now(),
  };
  
  history.unshift(snippet);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
}

export function getHistory(): CodeSnippet[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}