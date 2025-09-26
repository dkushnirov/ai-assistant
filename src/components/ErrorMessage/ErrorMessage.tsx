import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  helpText?: string;
  className?: string;
}

export function ErrorMessage({
  title = 'Error',
  message,
  helpText,
  className = ''
}: ErrorMessageProps) {
  return (
    <div className={`${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {helpText && (
            <div className="mt-2">
              <p className="text-xs text-red-600">{helpText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
