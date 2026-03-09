import { motion } from "framer-motion";
import { Blocks, Network, Shield, Zap, Lock, Globe, Database, ArrowRight, Check } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const DistributedLedger = () => {
  const features = [{
    icon: Zap,
    title: "Zero Transaction Fees",
    description: "No fees for transactions on the Blanch DLT network",
    color: "text-yellow-400"
  }, {
    icon: Network,
    title: "No Mining Required",
    description: "Environmentally friendly consensus without energy-intensive mining",
    color: "text-green-400"
  }, {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and security protocols",
    color: "text-blue-400"
  }, {
    icon: Globe,
    title: "Global Scalability",
    description: "Process millions of transactions per second worldwide",
    color: "text-purple-400"
  }];
  const technologies = [{
    name: "Blanch Infinity DLT",
    description: "Sovereign distributed ledger technology powering infinite-scale decentralized applications",
    benefits: ["Sovereign control", "Zero fees", "Unlimited scalability"]
  }, {
    name: "Blanch Network",
    description: "High-performance network infrastructure for decentralized communication and data transfer",
    benefits: ["Global mesh connectivity", "Low-latency routing", "Resilient architecture"]
  }, {
    name: "Blanch Group",
    description: "Enterprise-grade distributed ledger solutions for organizational governance and operations",
    benefits: ["Corporate governance", "Multi-entity coordination", "Compliance ready"]
  }, {
    name: "S.H.I.E.L.D. AI DAG",
    description: "Advanced DAG (Directed Acyclic Graph) transaction structure enabling parallel processing and instant confirmations",
    benefits: ["Instant transactions", "Infinite scalability", "No block size limits"]
  }, {
    name: "IOTA",
    description: "Tangle-based distributed ledger optimized for IoT and machine-to-machine transactions",
    benefits: ["Feeless transactions", "IoT optimized", "Lightweight protocol"]
  }, {
    name: "Hashgraph Consensus",
    description: "Asynchronous Byzantine Fault Tolerance for secure, fair ordering of transactions",
    benefits: ["Mathematical proof of security", "Fair transaction ordering", "High throughput"]
  }, {
    name: "Blockchain Layer",
    description: "Traditional blockchain for specific use cases requiring linear history",
    benefits: ["Proven technology", "Immutable records", "Smart contract support"]
  }];
  const useCases = ["Digital Currency & Payments", "Supply Chain Management", "Identity Verification", "Smart Contracts", "Asset Tokenization", "Healthcare Records", "Voting Systems", "Cross-Border Settlements"];
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-green-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Blocks className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Next-Gen Infrastructure</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-foreground">Distributed</span>
              <br />
              <span className="gradient-text">Ledger Technologies</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Create, build, and manage multiple distributed ledger technologies with zero transaction fees and no mining cross border in all networks. Powered by S.H.I.E.L.D. AI.</p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Database className="w-5 h-5" />
                Create Your DLT
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Blocks className="w-5 h-5" />
                Explore Technology
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => <motion.div key={feature.title} initial={{
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
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all text-center">
                  <CardHeader>
                    <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Supported Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from multiple distributed ledger architectures for your specific needs
            </p>
          </motion.div>

          <Tabs defaultValue="blanch-infinity" className="max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap gap-2 mb-8 h-auto">
              <TabsTrigger value="blanch-infinity">Blanch Infinity DLT</TabsTrigger>
              <TabsTrigger value="blanch-network">Blanch Network</TabsTrigger>
              <TabsTrigger value="blanch-group">Blanch Group</TabsTrigger>
              <TabsTrigger value="shield-dag">S.H.I.E.L.D. AI DAG</TabsTrigger>
              <TabsTrigger value="iota">IOTA</TabsTrigger>
              <TabsTrigger value="hashgraph">Hashgraph</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            {technologies.map((tech, index) => <TabsContent key={tech.name} value={["blanch-infinity", "blanch-network", "blanch-group", "shield-dag", "iota", "hashgraph", "blockchain"][index]}>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Blocks className="w-6 h-6 text-blue-400" />
                      {tech.name}
                    </CardTitle>
                    <CardDescription className="text-base">{tech.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {tech.benefits.map(benefit => <div key={benefit} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>)}
          </Tabs>
        </div>
      </section>

      {/* Use Cases */}
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
                Enterprise <span className="gradient-text">Use Cases</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our DLT infrastructure supports a wide range of enterprise applications 
                across industries.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {useCases.map((useCase, index) => <motion.div key={useCase} initial={{
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
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm">{useCase}</span>
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
              <Card className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-blue-400" />
                    Enterprise Ready
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Deploy production-ready distributed ledger solutions with enterprise-grade 
                    security and compliance features.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      SOC 2 Type II Compliant
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      GDPR Ready
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      24/7 Support & Monitoring
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      Custom Integration Support
                    </li>
                  </ul>
                  <Button className="w-full mt-4 gap-2">
                    Contact Enterprise Sales
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default DistributedLedger;