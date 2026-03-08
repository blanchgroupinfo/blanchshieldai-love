import { motion } from "framer-motion";
import { 
  BarChart3, Wallet, ArrowDownToLine, ArrowUpFromLine, 
  Brain, Lightbulb, PieChart, Store, TrendingUp, 
  LineChart, RefreshCcw, Building2, FileText, Coins
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BarChart3,
    title: "Overview of All Markets",
    description: "Real-time market data across 40+ asset classes including stocks, crypto, forex, and more.",
  },
  {
    icon: LineChart,
    title: "Live Market & Quick Trade",
    description: "Execute trades instantly with live price feeds and one-click trading functionality.",
  },
  {
    icon: TrendingUp,
    title: "Advanced Charts",
    description: "Professional charting tools with 100+ indicators, drawing tools, and pattern recognition.",
  },
  {
    icon: Wallet,
    title: "Wallet",
    description: "Multi-currency wallet supporting fiat, crypto, and digital assets with secure storage.",
  },
  {
    icon: ArrowDownToLine,
    title: "Deposit",
    description: "Multiple deposit methods including bank transfer, crypto, and card payments.",
  },
  {
    icon: ArrowUpFromLine,
    title: "Withdraw",
    description: "Fast and secure withdrawals to your preferred bank or wallet address.",
  },
  {
    icon: Brain,
    title: "AI Hedging Center",
    description: "AI-powered risk management and hedging strategies to protect your portfolio.",
  },
  {
    icon: Lightbulb,
    title: "AI Strategy Generator",
    description: "Create and generate custom trading strategies using advanced AI algorithms.",
  },
  {
    icon: PieChart,
    title: "Portfolio",
    description: "Track your investments, performance analytics, and asset allocation.",
  },
  {
    icon: Store,
    title: "Asset Marketplace",
    description: "Buy, sell, and trade tokenized assets, NFTs, and digital collectibles.",
  },
  {
    icon: RefreshCcw,
    title: "Currency Exchange",
    description: "Exchange currencies at competitive rates with discounts on market prices.",
  },
  {
    icon: Building2,
    title: "Trade Bank Instruments",
    description: "Trade SBLC, MTN, LTN, Bank Drafts, and other financial instruments.",
  },
  {
    icon: FileText,
    title: "SWIFT Migration",
    description: "Complete Bi-Directional MT101-MT999 to MX migration support for modern payments.",
  },
  {
    icon: Coins,
    title: "Tokenize Assets",
    description: "Tokenize any asset and trade on our platform with full compliance.",
  },
];

const TradingFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Trading <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to trade any asset class, manage your portfolio, and maximize profits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Explore All Features
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingFeatures;
