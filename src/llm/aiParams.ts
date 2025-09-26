import { openai } from '@ai-sdk/openai';

const model = 'gpt-3.5-turbo';

export const aiParams = {
  model: openai(model),
  temperature: 0.7
};
