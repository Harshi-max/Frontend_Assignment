// Mock API responses and data
export interface CapitalGain {
  profits: number;
  losses: number;
}

export interface CapitalGainsData {
  stcg: CapitalGain; // Short-term capital gains
  ltcg: CapitalGain; // Long-term capital gains
}

export interface HoldingGains {
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

// Mock Capital Gains API
export const fetchCapitalGainsData = (): Promise<CapitalGainsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stcg: { profits: 1540, losses: 743 },
        ltcg: { profits: 1200, losses: 650 },
      });
    }, 500);
  });
};

// Mock Holdings API
export const fetchHoldingsData = (): Promise<Holding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          coin: "BTC",
          coinName: "Bitcoin",
          logo: "₿",
          totalHoldings: 0.63776,
          currentPrice: 55320.15,
          averageBuyPrice: 55320.15,
          stcg: { gain: -1200, balance: 0.338 },
          ltcg: { gain: 2400, balance: 0.300 },
        },
        {
          coin: "ETH",
          coinName: "Ethereum",
          logo: "Ξ",
          totalHoldings: 5.6736,
          currentPrice: 9324.21,
          averageBuyPrice: 9324.21,
          stcg: { gain: 55320.15, balance: 2.232 },
          ltcg: { gain: 88239.29, balance: 3.441 },
        },
        {
          coin: "USDT",
          coinName: "Tether",
          logo: "₮",
          totalHoldings: 3096.54,
          currentPrice: 3142.21,
          averageBuyPrice: 3142.21,
          stcg: { gain: -1200, balance: 201.23 },
          ltcg: { gain: -500, balance: 902.47 },
        },
        {
          coin: "MATIC",
          coinName: "Polygon",
          logo: "◆",
          totalHoldings: 2210,
          currentPrice: 4672.12,
          averageBuyPrice: 4672.12,
          stcg: { gain: -1500, balance: 835.330 },
          ltcg: { gain: -2000, balance: 1402 },
        },
        {
          coin: "ETH",
          coinName: "Ethereum",
          logo: "Ξ",
          totalHoldings: 5.6736,
          currentPrice: 9324.21,
          averageBuyPrice: 9324.21,
          stcg: { gain: -800, balance: 2.232 },
          ltcg: { gain: -1500, balance: 3.441 },
        },
        {
          coin: "USDT",
          coinName: "Tether",
          logo: "₮",
          totalHoldings: 3096.54,
          currentPrice: 3142.21,
          averageBuyPrice: 3142.21,
          stcg: { gain: -600, balance: 201.23 },
          ltcg: { gain: -300, balance: 902.47 },
        },
      ]);
    }, 600);
  });
};
