import React from 'react';

interface ConsoleProps {
  output: string;
}

export function Console({ output }: ConsoleProps) {
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-[200px] overflow-auto font-mono text-sm">
      {output || 'Ready to execute code...'}
    </div>
  );
}