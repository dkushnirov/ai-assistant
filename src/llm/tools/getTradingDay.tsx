import { streamText } from 'ai';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { z } from 'zod';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Loading } from '@/components/Loading';
import { fetchTradingDay } from '@/services/crypto/priceService';

import { aiParams } from '../aiParams';
import { getTradingSystemPrompt } from '../systemPrompt';

export const getTradingDay = {
  description:
    'Fetch the current price and trading data for a cryptocurrency from Binance API',
  inputSchema: z.object({
    symbol: z
      .string()
      .describe('The trading pair symbol (e.g., BTCUSDT, ETHUSDT, ADAUSDT)'),
    originalMessage: z
      .string()
      .describe('The original and complete message the user send.')
  }),
  generate: async function* ({
    symbol,
    originalMessage
  }: {
    symbol: string;
    originalMessage: string;
  }) {
    yield (
      <Loading hasSpinner={false} message={`Fetching price for ${symbol}...`} />
    );

    try {
      const result = await fetchTradingDay(symbol);

      const { textStream, text } = await streamText({
        ...aiParams,
        system: getTradingSystemPrompt(result),
        prompt: originalMessage
      });

      let currentText = '';
      for await (const textPart of textStream) {
        currentText += textPart;
        yield <ReactMarkdown>{currentText}</ReactMarkdown>;
      }

      const fullText = await text;

      return <ReactMarkdown>{fullText}</ReactMarkdown>;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return (
        <ErrorMessage
          title="Error fetching trading data:"
          message={errorMessage}
          helpText="Please check the symbol format (e.g., BTCUSDT) and try again."
        />
      );
    }
  }
};
