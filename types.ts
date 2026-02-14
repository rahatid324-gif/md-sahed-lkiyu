
export enum MarketSignal {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD',
  NEUTRAL = 'NEUTRAL'
}

export interface SignalResponse {
  signal: MarketSignal;
  confidence: number;
  reasoning: string;
  targetPrice: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: number;
}

export interface PriceDataPoint {
  time: string;
  price: number;
}

export interface MarketState {
  ticker: string;
  currentPrice: number;
  change24h: number;
  volume: string;
}
