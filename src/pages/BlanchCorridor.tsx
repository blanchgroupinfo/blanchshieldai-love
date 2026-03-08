import { motion } from "framer-motion";
import { Network, Globe, Shield, Zap, Building2, Users, TrendingUp, ArrowRight, MapPin } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const BlanchCorridor = () => {
  const corridorHubs = [{
    name: "North America Hub",
    location: "United States",
    status: "Active",
    connections: 45
  }, {
    name: "European Hub",
    location: "United Kingdom",
    status: "Active",
    connections: 38
  }, {
    name: "Asia-Pacific Hub",
    location: "Singapore",
    status: "Active",
    connections: 52
  }, {
    name: "Middle East Hub",
    location: "UAE",
    status: "Active",
    connections: 28
  }, {
    name: "Africa Hub",
    location: "South Africa",
    status: "Active",
    connections: 22
  }, {
    name: "Latin America Hub",
    location: "Brazil",
    status: "Active",
    connections: 18
  }];
  const capabilities = [{
    icon: Network,
    title: "Global Connectivity",
    description: "Seamless connection between regional hubs for instant data and value transfer"
  }, {
    icon: Shield,
    title: "Enterprise Security",
    description: "Multi-layered security protocols protecting all corridor transmissions"
  }, {
    icon: Zap,
    title: "Low Latency",
    description: "Sub-millisecond transmission speeds across the entire network"
  }, {
    icon: Building2,
    title: "Institutional Grade",
    description: "Built for enterprise requirements with 99.99% uptime guarantee"
  }];
  const stats = [{
    value: "180+",
    label: "Countries Connected"
  }, {
    value: "500K+",
    label: "Daily Transactions"
  }, {
    value: "99.99%",
    label: "Uptime"
  }, {
    value: "<10ms",
    label: "Global Latency"
  }];
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-background to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
        
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Network className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">Global Infrastructure</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-foreground">The Blanch</span>
              <br />
              <span className="gradient-text">Corridor Project</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">The Blanch Group's Global Village, The Blanch Corridor, a Spiritual Family House of the Future, A Tech Green City, with the Blanch Network A global network infrastructure connecting businesses, institutions, and communities across continents through secure, high-speed digital corridors.</p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Globe className="w-5 h-5" />
                Explore Network
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Building2 className="w-5 h-5" />
                Join the Corridor
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

      {/* Corridor Hubs */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Regional Hubs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic hub locations connecting every region of the world
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {corridorHubs.map((hub, index) => <motion.div key={hub.name} initial={{
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
                <Card className="bg-card/50 border-border/50 hover:border-indigo-500/30 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{hub.name}</CardTitle>
                          <CardDescription>{hub.location}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-green-400">{hub.status}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                      <span className="text-sm text-muted-foreground">Active Connections</span>
                      <span className="font-bold text-indigo-400">{hub.connections}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Capabilities */}
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
                Network <span className="gradient-text">Capabilities</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                The Blanch Corridor provides enterprise-grade infrastructure for 
                global connectivity and data transmission.
              </p>
              
              <div className="space-y-4">
                {capabilities.map((cap, index) => <motion.div key={cap.title} initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }} className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border/30">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <cap.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{cap.title}</h4>
                      <p className="text-sm text-muted-foreground">{cap.description}</p>
                    </div>
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
          }} className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-border/30 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-24 h-24 text-indigo-400 mx-auto mb-4" />
                  <p className="text-2xl font-display font-bold">Global Network</p>
                  <p className="text-muted-foreground">Connecting the World</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
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
            <h2 className="text-4xl font-display font-bold mb-4">Connect to the Corridor</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the global network of businesses and institutions on the Blanch Corridor
            </p>
            <Button size="lg" className="gap-2">
              Apply for Access
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default BlanchCorridor;