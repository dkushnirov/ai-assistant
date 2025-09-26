import { openai } from '@ai-sdk/openai';

const model = 'gpt-4o-mini';

export const aiParams = {
  model: openai(model),
  temperature: 0.7
};
