import React from 'react';
import { Code2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Code2 className="w-8 h-8 text-purple-600" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        CodeVamp
      </span>
    </div>
  );
}