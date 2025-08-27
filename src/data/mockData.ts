export interface PerformanceData {
  date: string;
  portfolioValue: number;
  benchmarkSP500: number;
  benchmarkRussell2000: number;
  benchmarkMSCIWorld: number;
  cashFlow?: number;
  marketEvents?: string[];
}

export interface CorporateAction {
  type: "dividend" | "split" | "spinoff" | "merger";
  date: string;
  details: string;
  impactOnShares?: number;
  impactOnPrice?: number;
}

export interface Holding {
  symbol: string;
  name: string;
  sector: string;
  subSector: string;
  currentValue: number;
  shares: number;
  avgCostBasis: number;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  weight: number;
  beta: number;
  dividendYield?: number;
  peRatio?: number;
  marketCap: number;
  lastUpdated: string;
  corporateActions?: CorporateAction[];
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}

export const performanceData: PerformanceData[] = [
  {
    date: "2025-06-22",
    portfolioValue: 1000000,
    benchmarkSP500: 1000000,
    benchmarkRussell2000: 1000000,
    benchmarkMSCIWorld: 1000000,
    cashFlow: 50000,
    marketEvents: ["portfolio_inception"],
  },
  {
    date: "2025-07-22",
    portfolioValue: 1100000,
    benchmarkSP500: 1050000,
    benchmarkRussell2000: 1020000,
    benchmarkMSCIWorld: 1040000,
    marketEvents: [],
  },
  {
    date: "2025-08-22",
    portfolioValue: 1200000,
    benchmarkSP500: 1120000,
    benchmarkRussell2000: 1080000,
    benchmarkMSCIWorld: 1100000,
    marketEvents: [],
  },
  {
    date: "2025-09-22",
    portfolioValue: 1050000,
    benchmarkSP500: 1100000,
    benchmarkRussell2000: 1040000,
    benchmarkMSCIWorld: 1080000,
    marketEvents: ["quarterly_rebalance"],
  },
  {
    date: "2025-10-22",
    portfolioValue: 950000,
    benchmarkSP500: 1080000,
    benchmarkRussell2000: 1000000,
    benchmarkMSCIWorld: 1050000,
    marketEvents: [],
  },
  {
    date: "2025-11-22",
    portfolioValue: 1150000,
    benchmarkSP500: 1150000,
    benchmarkRussell2000: 1100000,
    benchmarkMSCIWorld: 1120000,
    marketEvents: [],
  },
  {
    date: "2025-12-22",
    portfolioValue: 1300000,
    benchmarkSP500: 1200000,
    benchmarkRussell2000: 1150000,
    benchmarkMSCIWorld: 1180000,
    marketEvents: ["quarterly_rebalance"],
  },
  {
    date: "2025-01-22",
    portfolioValue: 1400000,
    benchmarkSP500: 1250000,
    benchmarkRussell2000: 1200000,
    benchmarkMSCIWorld: 1230000,
    marketEvents: [],
  },
  {
    date: "2025-02-22",
    portfolioValue: 1350000,
    benchmarkSP500: 1300000,
    benchmarkRussell2000: 1250000,
    benchmarkMSCIWorld: 1280000,
    marketEvents: [],
  },
  {
    date: "2025-03-22",
    portfolioValue: 1200000,
    benchmarkSP500: 1280000,
    benchmarkRussell2000: 1200000,
    benchmarkMSCIWorld: 1250000,
    marketEvents: ["quarterly_rebalance", "market_volatility"],
  },
  {
    date: "2025-04-22",
    portfolioValue: 1250000,
    benchmarkSP500: 1320000,
    benchmarkRussell2000: 1220000,
    benchmarkMSCIWorld: 1270000,
    marketEvents: [],
  },
  {
    date: "2025-05-22",
    portfolioValue: 1300000,
    benchmarkSP500: 1350000,
    benchmarkRussell2000: 1240000,
    benchmarkMSCIWorld: 1300000,
    marketEvents: [],
  },
  {
    date: "2025-06-21",
    portfolioValue: 1450000,
    benchmarkSP500: 1400000,
    benchmarkRussell2000: 1300000,
    benchmarkMSCIWorld: 1350000,
    marketEvents: ["quarterly_rebalance"],
  },
];

export const holdingsData: Holding[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    subSector: "Consumer Electronics",
    currentValue: 245760,
    shares: 1230,
    avgCostBasis: 165.4,
    currentPrice: 199.8,
    dayChange: 4.2,
    dayChangePercent: 2.14,
    totalReturn: 42294,
    totalReturnPercent: 20.78,
    weight: 24.58,
    beta: 1.26,
    dividendYield: 0.52,
    peRatio: 28.7,
    marketCap: 3120000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    corporateActions: [
      {
        type: "split",
        date: "2024-02-15",
        details: "4:1 stock split",
        impactOnShares: 4,
        impactOnPrice: 0.25,
      },
    ],
    riskMetrics: {
      volatility: 0.28,
      sharpeRatio: 1.34,
      maxDrawdown: -0.15,
    },
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology",
    subSector: "Software",
    currentValue: 186540,
    shares: 450,
    avgCostBasis: 385.6,
    currentPrice: 414.53,
    dayChange: -2.17,
    dayChangePercent: -0.52,
    totalReturn: 13019,
    totalReturnPercent: 7.5,
    weight: 18.65,
    beta: 0.92,
    dividendYield: 0.72,
    peRatio: 34.2,
    marketCap: 3080000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    corporateActions: [
      {
        type: "dividend",
        date: "2024-05-15",
        details: "$0.75 quarterly dividend",
        impactOnShares: 0,
        impactOnPrice: 0,
      },
    ],
    riskMetrics: {
      volatility: 0.24,
      sharpeRatio: 1.18,
      maxDrawdown: -0.12,
    },
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    subSector: "Internet Services",
    currentValue: 125480,
    shares: 720,
    avgCostBasis: 142.3,
    currentPrice: 174.28,
    dayChange: 1.85,
    dayChangePercent: 1.07,
    totalReturn: 23045,
    totalReturnPercent: 22.48,
    weight: 12.55,
    beta: 1.08,
    dividendYield: 0.0,
    peRatio: 25.3,
    marketCap: 2150000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    riskMetrics: {
      volatility: 0.32,
      sharpeRatio: 1.42,
      maxDrawdown: -0.18,
    },
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    sector: "Consumer Discretionary",
    subSector: "E-commerce",
    currentValue: 98760,
    shares: 540,
    avgCostBasis: 165.8,
    currentPrice: 182.89,
    dayChange: -0.95,
    dayChangePercent: -0.52,
    totalReturn: 9234,
    totalReturnPercent: 10.31,
    weight: 9.88,
    beta: 1.15,
    dividendYield: 0.0,
    peRatio: 52.1,
    marketCap: 1900000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    riskMetrics: {
      volatility: 0.38,
      sharpeRatio: 0.98,
      maxDrawdown: -0.22,
    },
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    sector: "Consumer Discretionary",
    subSector: "Electric Vehicles",
    currentValue: 87340,
    shares: 420,
    avgCostBasis: 195.6,
    currentPrice: 207.95,
    dayChange: 8.45,
    dayChangePercent: 4.24,
    totalReturn: 5186,
    totalReturnPercent: 6.31,
    weight: 8.73,
    beta: 2.01,
    dividendYield: 0.0,
    peRatio: 65.8,
    marketCap: 660000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    riskMetrics: {
      volatility: 0.65,
      sharpeRatio: 0.72,
      maxDrawdown: -0.35,
    },
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    sector: "Financial Services",
    subSector: "Banks",
    currentValue: 76890,
    shares: 380,
    avgCostBasis: 185.4,
    currentPrice: 202.34,
    dayChange: -1.23,
    dayChangePercent: -0.6,
    totalReturn: 6434,
    totalReturnPercent: 9.12,
    weight: 7.69,
    beta: 1.12,
    dividendYield: 2.15,
    peRatio: 12.4,
    marketCap: 580000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    riskMetrics: {
      volatility: 0.29,
      sharpeRatio: 1.08,
      maxDrawdown: -0.16,
    },
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    sector: "Healthcare",
    subSector: "Pharmaceuticals",
    currentValue: 65430,
    shares: 420,
    avgCostBasis: 148.6,
    currentPrice: 155.79,
    dayChange: 0.87,
    dayChangePercent: 0.56,
    totalReturn: 3020,
    totalReturnPercent: 4.84,
    weight: 6.54,
    beta: 0.68,
    dividendYield: 2.98,
    peRatio: 15.6,
    marketCap: 410000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    corporateActions: [
      {
        type: "spinoff",
        date: "2024-04-01",
        details: "Kenvue spinoff",
        impactOnShares: 0.1946,
        impactOnPrice: -15.2,
      },
    ],
    riskMetrics: {
      volatility: 0.18,
      sharpeRatio: 0.94,
      maxDrawdown: -0.08,
    },
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    sector: "Financial Services",
    subSector: "Payment Processing",
    currentValue: 54670,
    shares: 210,
    avgCostBasis: 245.8,
    currentPrice: 260.33,
    dayChange: 2.15,
    dayChangePercent: 0.83,
    totalReturn: 3046,
    totalReturnPercent: 5.91,
    weight: 5.47,
    beta: 0.98,
    dividendYield: 0.74,
    peRatio: 31.2,
    marketCap: 540000000000,
    lastUpdated: "2024-06-22T16:00:00Z",
    riskMetrics: {
      volatility: 0.22,
      sharpeRatio: 1.25,
      maxDrawdown: -0.11,
    },
  },
];

export const getSectorAllocations = () => {
  const sectorTotals: Record<string, number> = {};
  const totalValue = holdingsData.reduce(
    (sum, holding) => sum + holding.currentValue,
    0
  );

  holdingsData.forEach((holding) => {
    sectorTotals[holding.sector] =
      (sectorTotals[holding.sector] || 0) + holding.currentValue;
  });

  const result = [];
  for (const sector in sectorTotals) {
    if (Object.prototype.hasOwnProperty.call(sectorTotals, sector)) {
      const value = sectorTotals[sector];
      result.push({
        name: sector,
        value: value,
        percentage: (value / totalValue) * 100,
      });
    }
  }
  return result;
};

export const getPortfolioSummary = () => {
  const currentValue = holdingsData.reduce(
    (sum, holding) => sum + holding.currentValue,
    0
  );
  const totalCost = holdingsData.reduce(
    (sum, holding) => sum + holding.shares * holding.avgCostBasis,
    0
  );
  const totalReturn = currentValue - totalCost;
  const totalReturnPercent = (totalReturn / totalCost) * 100;
  const dayChange = holdingsData.reduce(
    (sum, holding) => sum + holding.dayChange * holding.shares,
    0
  );
  const dayChangePercent = (dayChange / currentValue) * 100;

  return {
    currentValue,
    totalCost,
    totalReturn,
    totalReturnPercent,
    dayChange,
    dayChangePercent,
  };
};
