import React from 'react';
import { History, X } from 'lucide-react';
import { CodeSnippet } from '../../utils/storage';

interface HistoryPanelProps {
  history: CodeSnippet[];
  onSelect: (snippet: CodeSnippet) => void;
  onClose: () => void;
}

export function HistoryPanel({ history, onSelect, onClose }: HistoryPanelProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <History className="w-5 h-5 mr-2 text-purple-600" />
          <h2 className="text-lg font-semibold">History</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2">
        {history.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => onSelect(snippet)}
            className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <div className="font-medium">{snippet.language}</div>
            <div className="text-sm text-gray-500 truncate">
              {snippet.code.slice(0, 50)}...
            </div>
            <div className="text-xs text-gray-400">
              {new Date(snippet.timestamp).toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}