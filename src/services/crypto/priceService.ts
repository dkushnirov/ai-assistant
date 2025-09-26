const TRADING_DAY_API = 'https://api.binance.com/api/v3/ticker/tradingDay';

export interface BinanceTradingDayResponse {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export async function fetchTradingDay(
  symbol: string
): Promise<BinanceTradingDayResponse> {
  try {
    const response = await fetch(
      `${TRADING_DAY_API}?symbol=${symbol.toUpperCase()}`
    );

    if (!response.ok) {
      throw new Error(
        `Binance API error: ${response.status} ${response.statusText}`
      );
    }

    const data: BinanceTradingDayResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch crypto price: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
