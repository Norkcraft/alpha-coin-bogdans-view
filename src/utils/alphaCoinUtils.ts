
// Calculate current Alpha Coin price based on launch date
export const calculateAlphaPrice = (): number => {
  const launchDate = new Date("2025-05-04");
  const today = new Date();
  const daysPassed = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // If current date is before launch date, return initial price
  if (daysPassed < 0) return 0.3;
  
  // Calculate price with $50,000 daily increase
  return 0.3 + (daysPassed * 50000);
};

// Calculate portfolio value
export const calculatePortfolioValue = (alphaHoldings: number): number => {
  const currentPrice = calculateAlphaPrice();
  return alphaHoldings * currentPrice;
};

// Format large numbers with commas
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

// Format as currency
export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(num);
};

// Generate historical price data
export const generateHistoricalPrices = (): { date: string; price: number }[] => {
  const launchDate = new Date("2025-05-04");
  const today = new Date();
  const daysPassed = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // If current date is before launch date, return empty array
  if (daysPassed < 0) return [];
  
  // Generate daily prices from launch until today
  const prices = [];
  for (let i = 0; i <= daysPassed; i++) {
    const date = new Date(launchDate);
    date.setDate(date.getDate() + i);
    const price = 0.3 + (i * 50000);
    prices.push({
      date: date.toISOString().split('T')[0],
      price
    });
  }
  
  return prices;
};

// Generate fake trade history data
export const generateTradeHistory = (): any[] => {
  const trades = [
    {
      id: "tx-1",
      type: "buy",
      amount: 500000,
      price: 0.3,
      total: 500000 * 0.3,
      date: "2025-05-04T09:30:15Z",
      status: "completed"
    },
    {
      id: "tx-2",
      type: "buy",
      amount: 500000,
      price: 0.3,
      total: 500000 * 0.3,
      date: "2025-05-04T10:15:22Z",
      status: "completed"
    },
    {
      id: "tx-3",
      type: "sell",
      amount: 50000,
      price: 0.35,
      total: 50000 * 0.35,
      date: "2025-05-05T14:22:10Z",
      status: "failed"
    },
    {
      id: "tx-4",
      type: "buy",
      amount: 50000,
      price: 50000.3,
      total: 50000 * 50000.3,
      date: "2025-05-06T11:05:33Z",
      status: "completed"
    }
  ];
  
  return trades;
};

// Generate fake order book data
export const generateOrderBook = (): { bids: any[]; asks: any[] } => {
  const currentPrice = calculateAlphaPrice();
  
  const bids = [];
  const asks = [];
  
  // Generate 10 fake bids below current price
  for (let i = 1; i <= 10; i++) {
    const price = currentPrice * (1 - (i * 0.005));
    const amount = Math.round(Math.random() * 10000) + 500;
    bids.push({
      price,
      amount,
      total: price * amount
    });
  }
  
  // Generate 10 fake asks above current price
  for (let i = 1; i <= 10; i++) {
    const price = currentPrice * (1 + (i * 0.005));
    const amount = Math.round(Math.random() * 8000) + 300;
    asks.push({
      price,
      amount,
      total: price * amount
    });
  }
  
  // Sort bids in descending order (highest bid first)
  bids.sort((a, b) => b.price - a.price);
  
  // Sort asks in ascending order (lowest ask first)
  asks.sort((a, b) => a.price - b.price);
  
  return { bids, asks };
};

// Generate fake news headlines
export const generateNewsHeadlines = (): any[] => {
  const currentPrice = calculateAlphaPrice();
  const formattedPrice = formatCurrency(currentPrice);
  const portfolioValue = formatCurrency(1000000 * currentPrice);
  
  const headlines = [
    {
      id: 1,
      title: `Alpha Coin Surges to ${formattedPrice}`,
      source: "CryptoDaily",
      date: new Date().toISOString(),
      snippet: `Alpha Coin (ALPHA) continues its meteoric rise, reaching ${formattedPrice} today as demand increases globally.`
    },
    {
      id: 2,
      title: "Bogdan Wrzesinski's Alpha Holdings Now Worth " + portfolioValue,
      source: "Blockchain Insider",
      date: new Date().toISOString(),
      snippet: `The Alpha Coin founder's initial investment has multiplied significantly, with his 1,000,000 ALPHA now valued at ${portfolioValue}.`
    },
    {
      id: 3,
      title: "Experts Predict Alpha Could Reach $10M Per Coin by 2026",
      source: "CryptoWeekly",
      date: new Date().toISOString(),
      snippet: "Analysts point to Alpha Coin's remarkable daily growth as evidence of its potential to revolutionize the crypto market."
    },
    {
      id: 4,
      title: "AlphaChain Network Development Ahead of Schedule",
      source: "TechCrunch",
      date: new Date().toISOString(),
      snippet: "The upcoming AlphaChain Network is reported to be entering final testing phases, promising increased utility for Alpha Coin."
    },
    {
      id: 5,
      title: `Alpha Outperforms BTC by ${Math.round(currentPrice/65000)}x and ETH by ${Math.round(currentPrice/3200)}x`,
      source: "Market Watch",
      date: new Date().toISOString(),
      snippet: `Alpha Coin's performance continues to dwarf traditional cryptocurrencies, showing returns orders of magnitude higher than Bitcoin and Ethereum.`
    }
  ];
  
  return headlines;
};
