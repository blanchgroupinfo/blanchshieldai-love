import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Landmark, FileText, Gem, Link, Globe, Coins, 
  BarChart3, Box, Bitcoin, DollarSign, CreditCard,
  RefreshCcw, LineChart, Banknote, TrendingUp, Building2,
  PieChart, Image, Users, Home, ShieldCheck, ArrowUpDown,
  Layers, Target, Zap, Timer, ArrowDownUp, ListOrdered,
  CircleDot, Shield, Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const markets = [
  { name: "Bank Instruments", icon: Landmark, category: "Finance" },
  { name: "Brackets", icon: ListOrdered, category: "Order Types" },
  { name: "Bank Notes", icon: FileText, category: "Finance" },
  { name: "Blanch Brand Digital Assets", icon: Gem, category: "Digital" },
  { name: "Bonds", icon: Link, category: "Fixed Income" },
  { name: "BRICS", icon: Globe, category: "International" },
  { name: "CBDC", icon: Coins, category: "Digital" },
  { name: "CFD (Contracts for Difference)", icon: BarChart3, category: "Derivatives" },
  { name: "Commodities", icon: Box, category: "Physical" },
  { name: "Crypto Currency", icon: Bitcoin, category: "Digital" },
  { name: "Currencies", icon: DollarSign, category: "Forex" },
  { name: "Currency Notes", icon: CreditCard, category: "Finance" },
  { name: "Currency Swap", icon: RefreshCcw, category: "Forex" },
  { name: "Derivatives", icon: LineChart, category: "Derivatives" },
  { name: "Digital Currency", icon: Banknote, category: "Digital" },
  { name: "Equities", icon: TrendingUp, category: "Equities" },
  { name: "ETFs (Exchange-Traded Funds)", icon: PieChart, category: "Funds" },
  { name: "Forex", icon: ArrowUpDown, category: "Forex" },
  { name: "Futures", icon: BarChart3, category: "Derivatives" },
  { name: "GTC", icon: Timer, category: "Order Types" },
  { name: "Hybrid Bank Notes", icon: FileText, category: "Finance" },
  { name: "Historical Bonds", icon: Link, category: "Fixed Income" },
  { name: "Indices", icon: TrendingUp, category: "Indices" },
  { name: "IOC/FOK", icon: Zap, category: "Order Types" },
  { name: "LMT", icon: Target, category: "Order Types" },
  { name: "Mutual Funds", icon: Users, category: "Funds" },
  { name: "MKT", icon: CircleDot, category: "Order Types" },
  { name: "NFTs", icon: Image, category: "Digital" },
  { name: "OCO", icon: Layers, category: "Order Types" },
  { name: "OTC (Over-The-Counter)", icon: Building2, category: "Trading" },
  { name: "OTCQB Venture Market", icon: TrendingUp, category: "Equities" },
  { name: "OTCQX Best Market", icon: ShieldCheck, category: "Equities" },
  { name: "Options", icon: LineChart, category: "Derivatives" },
  { name: "Pink Open Market", icon: BarChart3, category: "Equities" },
  { name: "PPP Programs (Private Placement Programs)", icon: Landmark, category: "Finance" },
  { name: "Private Companies", icon: Building2, category: "Equities" },
  { name: "Real Estate", icon: Home, category: "Physical" },
  { name: "Stablecoins", icon: Coins, category: "Digital" },
  { name: "Stocks", icon: TrendingUp, category: "Equities" },
  { name: "STP", icon: ArrowDownUp, category: "Order Types" },
  { name: "STP-LMT", icon: ArrowDownUp, category: "Order Types" },
  { name: "Trailing", icon: TrendingUp, category: "Order Types" },
  { name: "Request Short Selling Permission", icon: Shield, category: "Trading" },
];

const ALL_TAB = "All";

const categories = [ALL_TAB, ...Array.from(new Set(markets.map((m) => m.category))).sort()];

const TradingMarkets = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_TAB);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return markets.filter((m) => {
      const matchesCategory = activeCategory === ALL_TAB || m.category === activeCategory;
      const matchesSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            All Trading Finance Markets
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trade <span className="text-primary">40+ Market Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access the most comprehensive selection of trading markets available. 
            From traditional finance to cutting-edge digital assets.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/70 border-border/50"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent justify-center">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground text-center mb-6">
          Showing {filtered.length} of {markets.length} markets
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((market, index) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              className="p-4 rounded-xl bg-card/70 border border-border/50 hover:border-primary/50 hover:bg-card transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <market.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground leading-tight">
                  {market.name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {market.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No markets found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default TradingMarkets;
