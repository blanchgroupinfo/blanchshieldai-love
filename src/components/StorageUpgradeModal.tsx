import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface StorageUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "Free",
    period: "",
    storage: "1 GB",
    features: ["1 GB Cloud Storage", "Basic File Sharing", "5 Share Links", "Standard Support"],
    current: true,
    color: "text-muted-foreground",
    borderColor: "border-border/50",
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$9.99",
    period: "/mo",
    storage: "100 GB",
    features: ["100 GB Cloud Storage", "Unlimited Share Links", "AI Model Hosting", "Priority Support", "Encrypted Vault"],
    popular: true,
    color: "text-primary",
    borderColor: "border-primary/50",
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "$29.99",
    period: "/mo",
    storage: "1 TB",
    features: ["1 TB Cloud Storage", "Team Collaboration", "API Access", "Custom Domains", "24/7 Dedicated Support", "Advanced Analytics"],
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
  },
];

const StorageUpgradeModal = ({ open, onOpenChange }: StorageUpgradeModalProps) => {
  const { toast } = useToast();

  const handleSelectPlan = (planName: string) => {
    if (planName === "Starter") return;
    toast({
      title: `${planName} Plan Selected`,
      description: "Premium plans are coming soon. You'll be notified when available!",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Upgrade Your Storage</DialogTitle>
          <p className="text-center text-muted-foreground text-sm">Choose a plan that fits your sovereign data needs</p>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`relative bg-card/80 ${plan.borderColor} hover:border-primary/40 transition-all h-full flex flex-col`}>
                {plan.popular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="text-center mb-4">
                    <plan.icon className={`h-8 w-8 mx-auto mb-2 ${plan.color}`} />
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.storage} Storage</p>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.color}`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.current ? "outline" : plan.popular ? "shield" : "divine"}
                    className="w-full"
                    disabled={plan.current}
                    onClick={() => handleSelectPlan(plan.name)}
                  >
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StorageUpgradeModal;
