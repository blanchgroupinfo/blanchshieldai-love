import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, RefreshCcw, Target, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const programs = [
  {
    category: "Short-Term Programs",
    items: [
      { name: "24hrs Profit Trade", duration: "24 Hours", icon: Clock },
      { name: "48hrs Profit Trade", duration: "48 Hours", icon: Clock },
      { name: "72hrs Profit Trade", duration: "72 Hours", icon: Clock },
      { name: "5 Day Profit Trade", duration: "5 Days", icon: TrendingUp },
      { name: "7 Day Profit Trade", duration: "7 Days", icon: TrendingUp },
    ],
  },
  {
    category: "Weekly & Monthly Programs",
    items: [
      { name: "Weekly Profit Trade", duration: "Weekly", icon: RefreshCcw },
      { name: "10 Day Profit Trade", duration: "10 Days", icon: TrendingUp },
      { name: "30 Day Profit Trade", duration: "30 Days", icon: Target },
      { name: "Recurring Monthly", duration: "Monthly", icon: RefreshCcw },
      { name: "60 Day Profit Trade", duration: "60 Days", icon: Target },
    ],
  },
  {
    category: "Long-Term Programs",
    items: [
      { name: "90 Day Profit Trade", duration: "90 Days", icon: Target },
      { name: "120 Day Profit Trade", duration: "120 Days", icon: Target },
      { name: "180 Day Profit Trade", duration: "180 Days", icon: Target },
      { name: "210 Day Profit Trade", duration: "210 Days", icon: Target },
      { name: "40 Week Profit Trade", duration: "40 Weeks", icon: Layers },
      { name: "3-5 Year Profit Trade", duration: "3-5 Years", icon: TrendingUp },
    ],
  },
  {
    category: "Specialty Programs",
    items: [
      { name: "Bullet Trades", duration: "Variable", icon: Zap },
      { name: "Multi Mix Trades", duration: "Variable", icon: Layers },
      { name: "Multi Mix Bullet Trades", duration: "Variable", icon: Zap },
      { name: "Compound Interest Trades", duration: "Variable", icon: TrendingUp },
      { name: "Multi Mix Compound Interest", duration: "Variable", icon: Layers },
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
