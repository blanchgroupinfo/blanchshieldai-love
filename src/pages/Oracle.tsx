import { motion } from "framer-motion";
import { Eye, Brain, Zap, Shield, Database, Globe, TrendingUp, Lock, ArrowRight, Sparkles } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const Oracle = () => {
  const capabilities = [{
    icon: Database,
    title: "Data Feeds",
    description: "Real-time price feeds, market data, and external information for smart contracts",
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20"
  }, {
    icon: Shield,
    title: "Secure Verification",
    description: "Cryptographically secured data verification with multi-source consensus",
    color: "text-green-400",
    gradient: "from-green-500/20 to-emerald-500/20"
  }, {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Machine learning models for data validation and anomaly detection",
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20"
  }, {
    icon: Zap,
    title: "Low Latency",
    description: "Sub-second data delivery for time-sensitive applications",
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/20"
  }];
  const dataTypes = ["Cryptocurrency Prices", "Foreign Exchange Rates", "Commodity Prices", "Stock Market Data", "Weather Data", "Sports Results", "Random Number Generation", "Cross-Chain Data"];
  const stats = [{
    value: "1B+",
    label: "Data Points Delivered"
  }, {
    value: "99.99%",
    label: "Uptime"
  }, {
    value: "<100ms",
    label: "Average Latency"
  }, {
    value: "50+",
    label: "Networks Supported"
  }];
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-background to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1),transparent_70%)]" />
        
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Decentralized Data Oracle</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-foreground">The Blanch</span>
              <br />
              <span className="gradient-text">Oracle Project</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Lunar City, Motherships, Space Station, and on Earth the Blanch Corridor and Lunar Command Centers in the Blanch Corridor processing global resource allocation and AI sync. Secure, reliable, and decentralized Blanch Oracle infrastructure connecting smart contracts with real-world data. Powered by Blanch S.H.I.E.L.D. AI verification systems and Interconnecting with the Blanch Network.</p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Globe className="w-5 h-5" />
                Explore Documentation
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Zap className="w-5 h-5" />
                Integrate Now
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
            {stats.map(stat => <Card key={stat.label} className="bg-card/50 border-border/50 text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>)}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Blanch Oracle and Blanch Network Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Blanch Network Enterprise-grade Monitering the Blanch Oracle infrastructure for mission-critical applications</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => <motion.div key={cap.title} initial={{
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
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <cap.icon className={`w-7 h-7 ${cap.color}`} />
                    </div>
                    <CardTitle className="text-lg">{cap.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{cap.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Data Types */}
      <section className="py-20">
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
                Diverse <span className="gradient-text">Data Sources</span>
              </h2>
              <p className="text-muted-foreground mb-8">Access a wide range of verified data feeds for your decentralized applications. The Blanch Oracle and Blanch Network aggregates data from multiple trusted sources to ensure accuracy.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {dataTypes.map((type, index) => <motion.div key={type} initial={{
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
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">{type}</span>
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
              <Card className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-amber-400" />
                    Security First
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Every data point is cryptographically signed and verified through our 
                    multi-layer consensus mechanism.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      End-to-end encryption
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Multi-source verification
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Tamper-proof delivery
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Real-time monitoring
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-900/20 to-purple-900/20">
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
            <h2 className="text-4xl font-display font-bold mb-4">Start Building Today</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Integrate the Blanch Oracle into your smart contracts and decentralized applications
            </p>
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Oracle;