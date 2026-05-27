export interface CapitalGain {
  profits: number;
  losses: number;
}

export interface CapitalGainsState {
  stcg: CapitalGain;
  ltcg: CapitalGain;
}

export interface HoldingGain {
  stcg: { gain: number; balance: number };
  ltcg: { gain: number; balance: number };
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  totalHoldings: number;
  currentPrice: number;
  averageBuyPrice: number;
  stcg: { gain: number; balance: number };
  ltcg: { gain: number; balance: number };
}

export interface CalculatedGains {
  stcg: CapitalGain;
  ltcg: CapitalGain;
  netShortTerm: number;
  netLongTerm: number;
  realizedCapitalGains: number;
}

export interface HarvestingContextType {
  // Data
  capitalGains: CapitalGainsState | null;
  holdings: Holding[];
  selectedHoldings: Set<string>; // Store keys like "BTC-0", "ETH-1" to handle duplicates
  loading: boolean;
  error: string | null;

  // Calculated values
  preHarvesting: CalculatedGains | null;
  postHarvesting: CalculatedGains | null;
  savings: number;

  // Actions
  toggleHolding: (key: string) => void;
  selectAllHoldings: (select: boolean) => void;
}
