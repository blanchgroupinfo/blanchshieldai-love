import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Layers, Globe, Shield, Zap, Lock, Database, Network, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Layers, title: "DAG/DLT Settlement", description: "Directed acyclic graph distributed ledger with sovereign-grade settlement" },
  { icon: Zap, title: "RTGS", description: "Real-time gross settlement for instant cross-border transactions" },
  { icon: Globe, title: "TPS Scaling", description: "Unlimited transactions per second with AI-optimized throughput" },
  { icon: Lock, title: "No Mining, No Fees", description: "Zero mining requirements and zero transaction fees" },
  { icon: Shield, title: "Sovereign Grade", description: "Compliance-first with divine law alignment" },
  { icon: Database, title: "Smart Contracts", description: "AI-powered smart contracts with ethical governance" },
  { icon: Network, title: "Interoperability", description: "Connect with all existing blockchains and ledger systems" },
  { icon: Cpu, title: "AI Integration", description: "H.I.I. AI agents manage and optimize all ledger operations" },
];

const BlanchInfinityDLT = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">DISTRIBUTED LEDGER</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blanch Infinity <span className="text-primary">DLT</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sovereign-grade distributed ledger technology — DAG/DLT settlement, RTGS, unlimited TPS, no mining, no fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <f.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchInfinityDLT;
