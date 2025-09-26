interface LoadingProps {
  message?: string;
  className?: string;
  hasSpinner?: boolean;
}

export function Loading({
  message = 'AI is thinking...',
  className = '',
  hasSpinner = true
}: LoadingProps) {
  return (
    <div className={`flex justify-start ${className}`}>
      <div className="text-whiteext-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          {hasSpinner && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          )}
          <span className="text-sm text-white animate-pulse">{message}</span>
        </div>
      </div>
    </div>
  );
}
