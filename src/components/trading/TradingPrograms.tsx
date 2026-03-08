import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, RefreshCcw, Target, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const programs = [
  {
    category: "Short-Term Programs",
    items: [
      { name: "24hrs Profit Trade", duration: "24 Hours", icon: Clock, deposit: "$500 - $10,000", returnPct: "10%" },
      { name: "48hrs Profit Trade", duration: "48 Hours", icon: Clock, deposit: "$1,000 - $25,000", returnPct: "15%" },
      { name: "72hrs Profit Trade", duration: "72 Hours", icon: Clock, deposit: "$2,000 - $50,000", returnPct: "18%" },
      { name: "5 Day Profit Trade", duration: "5 Days", icon: TrendingUp, deposit: "$5,000 - $100,000", returnPct: "22%" },
      { name: "7 Day Profit Trade", duration: "7 Days", icon: TrendingUp, deposit: "$5,000 - $150,000", returnPct: "28%" },
    ],
  },
  {
    category: "Weekly & Monthly Programs",
    items: [
      { name: "Weekly Profit Trade", duration: "Weekly", icon: RefreshCcw, deposit: "$2,500 - $75,000", returnPct: "20%" },
      { name: "10 Day Profit Trade", duration: "10 Days", icon: TrendingUp, deposit: "$5,000 - $100,000", returnPct: "30%" },
      { name: "30 Day Profit Trade", duration: "30 Days", icon: Target, deposit: "$10,000 - $250,000", returnPct: "40%" },
      { name: "Recurring Monthly", duration: "Monthly", icon: RefreshCcw, deposit: "$10,000 - $500,000", returnPct: "35%" },
      { name: "60 Day Profit Trade", duration: "60 Days", icon: Target, deposit: "$25,000 - $500,000", returnPct: "55%" },
    ],
  },
  {
    category: "Long-Term Programs",
    items: [
      { name: "90 Day Profit Trade", duration: "90 Days", icon: Target, deposit: "$25,000 - $1,000,000", returnPct: "70%" },
      { name: "120 Day Profit Trade", duration: "120 Days", icon: Target, deposit: "$50,000 - $1,000,000", returnPct: "85%" },
      { name: "180 Day Profit Trade", duration: "180 Days", icon: Target, deposit: "$50,000 - $2,000,000", returnPct: "110%" },
      { name: "210 Day Profit Trade", duration: "210 Days", icon: Target, deposit: "$100,000 - $2,000,000", returnPct: "130%" },
      { name: "40 Week Profit Trade", duration: "40 Weeks", icon: Layers, deposit: "$100,000 - $5,000,000", returnPct: "150%" },
      { name: "3-5 Year Profit Trade", duration: "3-5 Years", icon: TrendingUp, deposit: "$250,000 - $10,000,000", returnPct: "300-500%" },
    ],
  },
  {
    category: "Specialty Programs",
    items: [
      { name: "Bullet Trades", duration: "Variable", icon: Zap, deposit: "$10,000 - $500,000", returnPct: "25-50%" },
      { name: "Multi Mix Trades", duration: "Variable", icon: Layers, deposit: "$25,000 - $1,000,000", returnPct: "35-75%" },
      { name: "Multi Mix Bullet Trades", duration: "Variable", icon: Zap, deposit: "$50,000 - $2,000,000", returnPct: "40-90%" },
      { name: "Compound Interest Trades", duration: "Variable", icon: TrendingUp, deposit: "$10,000 - $1,000,000", returnPct: "50-120%" },
      { name: "Multi Mix Compound Interest", duration: "Variable", icon: Layers, deposit: "$25,000 - $5,000,000", returnPct: "75-200%" },
    ],
  },
];
const TradingPrograms = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Profit Trade Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-primary">Trading Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From short-term gains to long-term wealth building, we have a program for every investment strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, programIndex) => (
            <motion.div
              key={program.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: programIndex * 0.1 }}
            >
              <Card className="bg-card/70 border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{program.category}</CardTitle>
                  <CardDescription>
                    {program.items.length} programs available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {program.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Trade Finance AUM</h3>
                  <p className="text-muted-foreground text-sm">
                    Total All Markets Market Cap - Access comprehensive trading analytics and market capitalization data.
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                  View Total AUM
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingPrograms;
