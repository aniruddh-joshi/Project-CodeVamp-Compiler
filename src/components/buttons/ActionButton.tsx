import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
}

export function ActionButton({ onClick, icon: Icon, label, primary }: ActionButtonProps) {
  const baseClasses = "flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500";
  const primaryClasses = "text-white bg-purple-600 hover:bg-purple-700 focus:ring-offset-2";
  const secondaryClasses = "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}