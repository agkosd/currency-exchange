export interface Symbols {
  success: boolean;
  symbols: Record<string, string>;
}

export interface LatestRates {
  success: boolean;
  timestamp: Date;
  base: string;
  date: Date;
  rates: Record<string, number>;
}

export interface Query {
  from: string;
  to: string;
  amount: number;
}

export interface CurrencyConversion {
  success: boolean;
  query: Query;
  info: {
    timestamp: Date;
    rate: number;
  };
  historical: true | '';
  result: number;
}
