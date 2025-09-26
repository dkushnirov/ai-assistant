import { ClientMessage } from '@/llm/types';

interface MessageProps {
  message: ClientMessage;
}

export function Message({ message }: MessageProps) {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-row gap-4 items-center max-w-lg lg:max-w-2xl px-4 py-2 ${
          message.role === 'user'
            ? 'text-white'
            : 'p-4 bg-gradient-to-r from-orange-500/5 to-red-600/5 text-white'
        }`}
      >
        {message.role !== 'user' && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 mt-2 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
            AI
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.display}</div>
        {message.role === 'user' && (
          <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
            Y
          </div>
        )}
      </div>
    </div>
  );
}
