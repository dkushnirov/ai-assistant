'use client';

import { useActions, useUIState } from '@ai-sdk/rsc';
import { generateId } from 'ai';
import { useEffect, useRef, useState } from 'react';

import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { Message } from '@/components/Message';
import { WelcomeMessage } from '@/components/WelcomeMessage';
import { ClientMessage } from '@/llm/types';

export function ChatScreen() {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      // Add user message to conversation
      setConversation((currentConversation: ClientMessage[]) => [
        ...currentConversation,
        { id: generateId(), role: 'user', display: userMessage }
      ]);

      // Get AI response
      const message = await continueConversation(userMessage);

      // Add AI message to conversation
      setConversation((currentConversation: ClientMessage[]) => [
        ...currentConversation,
        message
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto pb-[env(safe-area-inset-bottom)]">
      <Header />
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {conversation.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <>
            {conversation.map((message: ClientMessage) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && <Loading />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex space-x-2 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="w-full rounded-lg border border-orange-500/20 bg-gray-800/50 pl-4 pr-12 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent resize-none overflow-hidden shadow-lg"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:text-orange-400 disabled:text-gray-500 transition-colors focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-send w-4 h-4"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
              <path d="m21.854 2.147-10.94 10.939"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
