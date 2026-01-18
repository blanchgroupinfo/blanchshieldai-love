import { motion } from "framer-motion";
import { Search, Database, Link2, FileCode, Globe, Activity, Shield, Blocks, ArrowRight, ExternalLink } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Explorer = () => {
  const stats = [
    { label: "Total Transactions", value: "2.4B+", icon: Activity },
    { label: "Active Nodes", value: "15,000+", icon: Globe },
    { label: "Smart Contracts", value: "500K+", icon: FileCode },
    { label: "Networks Supported", value: "50+", icon: Link2 }
  ];

  const recentTransactions = [
    { hash: "0x7f9e...3a2b", type: "Transfer", amount: "1,250.00", status: "Confirmed" },
    { hash: "0x3c4d...8e1f", type: "Contract", amount: "5,000.00", status: "Confirmed" },
    { hash: "0x9a2b...4c5d", type: "Stake", amount: "10,000.00", status: "Pending" },
    { hash: "0x1e2f...6a7b", type: "Transfer", amount: "750.00", status: "Confirmed" },
    { hash: "0x5d6e...9f0a", type: "Swap", amount: "3,500.00", status: "Confirmed" }
  ];

  const features = [
    {
      icon: Search,
      title: "Universal Search",
      description: "Search across all supported networks for transactions, addresses, and contracts",
      color: "text-blue-400"
    },
    {
      icon: Database,
      title: "Multi-Chain Support",
      description: "Explore data from 50+ blockchain networks in one unified interface",
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "Verified Contracts",
      description: "View verified smart contract source code and security audits",
      color: "text-purple-400"
    },
    {
      icon: Blocks,
      title: "Real-Time Data",
      description: "Live updates on blocks, transactions, and network activity",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-green-900/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Search className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Blockchain Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>
              <br />
              <span className="text-foreground">Explorer</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore blockchain transactions, smart contracts, and network activity across 
              multiple distributed ledger technologies with AI-powered insights.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by address, transaction hash, block, or token..."
                  className="pl-12 pr-4 py-6 text-lg bg-card/50 border-border/50"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="bg-card/50 border-border/50 text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="transactions" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="blocks">Blocks</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest transactions across all networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((tx, index) => (
                      <motion.div
                        key={tx.hash}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Link2 className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-mono text-sm">{tx.hash}</p>
                            <p className="text-sm text-muted-foreground">{tx.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${tx.amount}</p>
                          <p className={`text-sm ${tx.status === 'Confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {tx.status}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    View All Transactions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blocks">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Recent Blocks</CardTitle>
                  <CardDescription>Latest blocks from supported networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">Block explorer coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contracts">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Verified Contracts</CardTitle>
                  <CardDescription>Recently verified smart contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">Contract explorer coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">Explorer Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools for blockchain analysis and exploration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explorer;
