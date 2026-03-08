import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const markets = [
  "Bank Instruments", "Brackets", "Bank Notes", "Blanch Brand Digital Assets",
  "Bonds", "BRICS", "CBDC", "CFD", "Commodities", "Crypto Currency",
  "Currencies", "Currency Notes", "Currency Swap", "Derivatives",
  "Digital Currency", "Equities", "ETFs", "Forex", "Futures", "GTC",
  "Hybrid Bank Notes", "Historical Bonds", "Indices", "IOC/FOK", "LMT",
  "Mutual Funds", "MKT", "NFTs", "OCO", "OTC", "OTCQB Venture Market",
  "OTCQX Best Market", "Options", "Pink Open Market", "PPP Programs",
  "Private Companies", "Real Estate", "Stablecoins", "Stocks",
  "STP", "STP-LMT", "Trailing", "Short Selling",
];

const TradingHub = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Trading <span className="gradient-text">Hub</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm">All Trading Markets — Righteous trading across all global markets</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto mb-8">
          {markets.map((market) => (
            <span key={market} className="px-4 py-2 rounded-lg glass-card text-sm font-display text-foreground hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
              {market}
            </span>
          ))}
        </div>

        <div className="text-center">
          <Button variant="shield" size="lg" asChild>
            <Link to="/trading">
              <TrendingUp className="w-5 h-5" />
              Enter Trading Platform
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TradingHub;
