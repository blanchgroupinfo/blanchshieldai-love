import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const initialMarkets: MarketItem[] = [
  { symbol: "BTC/USD", name: "Bitcoin", price: 42150.00, change: 2.34 },
  { symbol: "ETH/USD", name: "Ethereum", price: 2485.50, change: -0.87 },
  { symbol: "EUR/USD", name: "Euro", price: 1.0845, change: 0.12 },
  { symbol: "GBP/USD", name: "British Pound", price: 1.2698, change: 0.34 },
  { symbol: "XAU/USD", name: "Gold", price: 2028.40, change: 1.56 },
  { symbol: "SPX", name: "S&P 500", price: 4783.45, change: 0.89 },
  { symbol: "JPY/USD", name: "Japanese Yen", price: 0.0067, change: -0.23 },
  { symbol: "XAG/USD", name: "Silver", price: 23.45, change: 0.78 },
  { symbol: "BRICS", name: "BRICS Index", price: 1250.00, change: 1.12 },
  { symbol: "CBDC", name: "Digital Yuan", price: 0.14, change: 0.05 },
  { symbol: "NAS100", name: "NASDAQ 100", price: 16892.50, change: 1.23 },
  { symbol: "DJI", name: "Dow Jones", price: 37825.00, change: 0.45 },
  { symbol: "OIL", name: "Crude Oil", price: 72.45, change: -1.34 },
  { symbol: "NGS", name: "Natural Gas", price: 2.89, change: 2.15 },
];

const LiveMarketTicker = () => {
  const [markets, setMarkets] = useState<MarketItem[]>(initialMarkets);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => 
        prev.map(market => {
          const volatility = market.price * 0.001;
          const priceChange = (Math.random() - 0.5) * volatility;
          const newPrice = Math.max(market.price + priceChange, 0.001);
          const changeAdjust = (Math.random() - 0.5) * 0.1;
          
          return {
            ...market,
            price: parseFloat(newPrice.toFixed(market.price < 1 ? 4 : 2)),
            change: parseFloat((market.change + changeAdjust).toFixed(2)),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Double the markets for seamless scrolling
  const tickerItems = [...markets, ...markets];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-card/95 backdrop-blur-xl border-b border-border/50 overflow-hidden">
      <div className="flex animate-ticker">
        {tickerItems.map((market, index) => (
          <div
            key={`${market.symbol}-${index}`}
            className="flex items-center gap-2 px-4 py-1.5 border-r border-border/30 whitespace-nowrap"
          >
            <span className="text-xs font-semibold text-foreground">{market.symbol}</span>
            <span className="text-xs text-muted-foreground">
              ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: market.price < 1 ? 4 : 2 })}
            </span>
            <span className={`flex items-center text-xs font-medium ${
              market.change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {market.change >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              )}
              {market.change >= 0 ? '+' : ''}{market.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;
