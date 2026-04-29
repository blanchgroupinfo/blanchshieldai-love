import { TrendingUp, TrendingDown, MessageSquare } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { Badge } from "@/components/ui/badge";

const LiveMarketTicker = () => {
  const markets = useMarketData(3000);
  const now = new Date();
  const gregorianDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Double the markets for seamless scrolling
  const tickerItems = [...markets, ...markets];

  return (
    <div className="fixed top-[28px] left-0 right-0 z-[60] bg-card/95 backdrop-blur-xl border-b border-border/50 flex items-center">
      <div className="flex items-center gap-2 px-4">
        <Badge className="bg-green-500/10 border-green-500/20 text-green-300 text-xs font-semibold">Live Market</Badge>
        <button className="text-xs font-semibold text-foreground border border-border/30 px-2 py-1 rounded flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          Ask S.H.I.E.L.D. AI
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
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
      <div className="px-4">
        <span className="text-xs font-semibold text-foreground">Gregorian Today Date: {gregorianDate}, {time}</span>
      </div>
    </div>
  );
};

export default LiveMarketTicker;
