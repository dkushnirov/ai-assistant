'use server';

import { getMutableAIState, streamUI } from '@ai-sdk/rsc';
import { generateId } from 'ai';
import ReactMarkdown from 'react-markdown';

import { SYSTEM_PROMPT } from '@/llm/systemPrompt';

import { aiParams } from '../aiParams';
import { getTradingDay } from '../tools/getTradingDay';
import { ClientMessage, ServerMessage } from '../types';

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  const history = getMutableAIState();

  const result = await streamUI({
    ...aiParams,
    system: SYSTEM_PROMPT,
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: 'assistant', content }
        ]);
      }

      return <ReactMarkdown>{content}</ReactMarkdown>;
    },
    tools: {
      getTradingDay
    }
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value
  };
}
