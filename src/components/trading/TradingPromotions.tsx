import { motion } from "framer-motion";
import { Clock, Percent, Users, ArrowRight, CreditCard, RefreshCcw, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TradingPlan {
  name: string;
  returnPercent: number;
  duration: string;
  minDeposit: number;
  maxDeposit: string;
  referralCommission: number;
  featured?: boolean;
}

const plans24Hours: TradingPlan[] = [
  {
    name: "STARTER",
    returnPercent: 10,
    duration: "24 Hours",
    minDeposit: 50,
    maxDeposit: "€500",
    referralCommission: 4,
  },
  {
    name: "CLASSIC",
    returnPercent: 12,
    duration: "24 Hours",
    minDeposit: 600,
    maxDeposit: "€1,500",
    referralCommission: 4,
  },
  {
    name: "PLATINUM",
    returnPercent: 15,
    duration: "24 Hours",
    minDeposit: 4000,
    maxDeposit: "€10,000",
    referralCommission: 4,
    featured: true,
  },
  {
    name: "ULTIMATE",
    returnPercent: 20,
    duration: "24 Hours",
    minDeposit: 10000,
    maxDeposit: "Unlimited",
    referralCommission: 4,
  },
];

const PlanCard = ({ plan }: { plan: TradingPlan }) => (
  <Card className={`relative overflow-hidden ${plan.featured ? 'border-primary shadow-lg shadow-primary/20' : 'border-border/50'} bg-card/70`}>
    {plan.featured && (
      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
        Popular
      </div>
    )}
    <CardHeader className="text-center pb-2">
      <Badge variant="outline" className="w-fit mx-auto mb-2">
        {plan.name}
      </Badge>
      <div className="flex items-center justify-center gap-1">
        <span className="text-4xl font-bold text-primary">{plan.returnPercent}%</span>
        <Percent className="w-6 h-6 text-primary" />
      </div>
      <CardDescription className="flex items-center justify-center gap-1">
        <Clock className="w-4 h-4" />
        Principal Return After {plan.duration}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Min. Deposit</span>
        <span className="font-medium">€{plan.minDeposit.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Max. Deposit</span>
        <span className="font-medium">{plan.maxDeposit}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground flex items-center gap-1">
          <Users className="w-3 h-3" /> Referral
        </span>
        <span className="font-medium text-primary">{plan.referralCommission}%</span>
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2">
      <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
        <CreditCard className="w-4 h-4 mr-2" />
        Deposit
      </Button>
      <div className="flex gap-2 w-full">
        <Button variant="outline" size="sm" className="flex-1">
          <Send className="w-3 h-3 mr-1" />
          Transfer
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <RefreshCcw className="w-3 h-3 mr-1" />
          Swap
        </Button>
      </div>
    </CardFooter>
  </Card>
);

const TradingPromotions = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Trading Promotions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">24 Hours</span> Profit Trades
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start earning with our fast-return trading programs. Choose a plan that fits your investment goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans24Hours.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingPromotions;
