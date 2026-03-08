import { motion } from "framer-motion";
import { Globe, ArrowLeftRight, Shield, Clock, Banknote, Building2, TrendingUp, Lock, ArrowRight } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const CrossBorderSettlements = () => {
  const benefits = [{
    icon: Clock,
    title: "Instant Settlement",
    description: "Complete cross-border transactions in seconds, not days",
    stat: "<3 sec",
    statLabel: "Settlement Time"
  }, {
    icon: Banknote,
    title: "Low Cost",
    description: "Reduce transaction costs by up to 90% compared to traditional methods",
    stat: "0.1%",
    statLabel: "Transaction Fee"
  }, {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with financial institutions in over 180 countries",
    stat: "180+",
    statLabel: "Countries"
  }, {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Built-in compliance with international regulations",
    stat: "100%",
    statLabel: "Compliance"
  }];
  const features = ["Real-Time Gross Settlement (RTGS)", "Multi-Currency Support", "Atomic Swap Technology", "Smart Contract Escrow", "Automated KYC/AML", "Regulatory Reporting", "Liquidity Management", "24/7 Operations"];
  const corridors = [{
    from: "USD",
    to: "EUR",
    volume: "$2.5B",
    change: "+15%"
  }, {
    from: "GBP",
    to: "USD",
    volume: "$1.8B",
    change: "+8%"
  }, {
    from: "USD",
    to: "JPY",
    volume: "$1.2B",
    change: "+12%"
  }, {
    from: "EUR",
    to: "GBP",
    volume: "$980M",
    change: "+5%"
  }];
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-background to-blue-900/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Global Finance Infrastructure</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-foreground">Cross-Border</span>
              <br />
              <span className="gradient-text">Settlements</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionary cross-border payment infrastructure enabling instant, 
              low-cost international settlements powered by distributed ledger technology.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Globe className="w-5 h-5" />
                Start Settlement
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Building2 className="w-5 h-5" />
                For Institutions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => <motion.div key={benefit.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <benefit.icon className="w-10 h-10 text-cyan-400 mb-4" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{benefit.description}</CardDescription>
                    <div className="pt-4 border-t border-border/30">
                      <p className="text-2xl font-bold text-primary">{benefit.stat}</p>
                      <p className="text-sm text-muted-foreground">{benefit.statLabel}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Live Corridors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Active Corridors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time settlement volumes across major currency pairs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {corridors.map((corridor, index) => <motion.div key={`${corridor.from}-${corridor.to}`} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <Card className="bg-card/50 border-border/50 hover:border-cyan-500/30 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-lg font-bold">{corridor.from}</span>
                      <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
                      <span className="text-lg font-bold">{corridor.to}</span>
                    </div>
                    <p className="text-2xl font-bold text-center">{corridor.volume}</p>
                    <p className="text-sm text-green-400 text-center flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {corridor.change}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="text-4xl font-display font-bold mb-6">
                Enterprise <span className="gradient-text">Features</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Complete settlement infrastructure with all the features financial 
                institutions need for secure, compliant cross-border operations.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => <motion.div key={feature} initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.05
              }} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>)}
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-cyan-400" />
                    Regulatory Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Built-in compliance with international financial regulations 
                    and reporting requirements.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      SWIFT MT, SWIFT MX,  GPI - Bi Directional Migration and Compatible
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      ISO 20022 Messaging
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      FATF Travel Rule
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Real-Time Sanctions Screening
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-4xl font-display font-bold mb-4">Ready to Transform Your Settlements?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join leading financial institutions using our cross-border settlement infrastructure
            </p>
            <Button size="lg" className="gap-2">
              Contact Sales
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default CrossBorderSettlements;