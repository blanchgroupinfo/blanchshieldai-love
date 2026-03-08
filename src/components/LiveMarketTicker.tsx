import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";

const LiveMarketTicker = () => {
  const markets = useMarketData(3000);

  // Double the markets for seamless scrolling
  const tickerItems = [...markets, ...markets];

  return (
    <div className="fixed top-[28px] left-0 right-0 z-[60] bg-card/95 backdrop-blur-xl border-b border-border/50 overflow-hidden">
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
