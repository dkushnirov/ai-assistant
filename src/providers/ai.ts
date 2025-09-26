import { createAI } from '@ai-sdk/rsc';

import { continueConversation } from '@/llm/actions/continueConversation';
import { ClientMessage, ServerMessage } from '@/llm/types';

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation
  },
  initialAIState: [],
  initialUIState: []
});
