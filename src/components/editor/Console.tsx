import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface ConsoleProps {
  output: string;
  onInput?: (input: string) => void;
}

export function Console({ output, onInput }: ConsoleProps) {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Process new output
  useEffect(() => {
    if (output) {
      setHistory(prev => [...prev, output]);
      scrollToBottom();
    }
  }, [output]);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const input = inputValue.trim();
      setHistory(prev => [...prev, `> ${input}`]);
      if (onInput) {
        onInput(input);
      }
      setInputValue('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIndex(prev => {
        const newIndex = prev < history.length - 1 ? prev + 1 : prev;
        const historyCommand = history[history.length - 1 - newIndex];
        if (historyCommand?.startsWith('> ')) {
          setInputValue(historyCommand.slice(2));
        }
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIndex(prev => {
        const newIndex = prev > 0 ? prev - 1 : -1;
        if (newIndex === -1) {
          setInputValue('');
        } else {
          const historyCommand = history[history.length - 1 - newIndex];
          if (historyCommand?.startsWith('> ')) {
            setInputValue(historyCommand.slice(2));
          }
        }
        return newIndex;
      });
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <Terminal className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-300">Terminal</span>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={terminalRef}
          className="p-4 font-mono text-sm h-[200px] overflow-auto bg-gray-900"
        >
          {history.map((line, index) => (
            <div 
              key={index}
              className={`mb-1 ${
                line.startsWith('> ') ? 'text-cyan-400' : 
                line.includes('Error:') ? 'text-red-400' :
                line.includes('Input:') ? 'text-yellow-400' :
                'text-green-400'
              }`}
            >
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-cyan-400 outline-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}