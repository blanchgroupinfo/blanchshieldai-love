import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Cloud, Server, Database, Shield, Globe, Zap, Lock, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cloudServices = [
  { icon: Cloud, title: "S.H.I.E.L.D. AI OS Cloud", description: "Sovereign cloud infrastructure with AI-powered management" },
  { icon: Server, title: "Compute", description: "Scalable sovereign compute instances for all workloads" },
  { icon: Database, title: "Databases", description: "Managed databases with real-time sync and zero-knowledge encryption" },
  { icon: Shield, title: "Security", description: "Sovereign-grade security with compliance monitoring" },
  { icon: Globe, title: "CDN & Edge", description: "Global content delivery with edge computing nodes" },
  { icon: Zap, title: "Serverless Functions", description: "Backend functions that scale automatically" },
  { icon: Lock, title: "Identity & Auth", description: "Sovereign identity and authentication services" },
  { icon: Layers, title: "Container Orchestration", description: "Managed containers with AI-optimized scaling" },
];

const ShieldAICloud = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">S.H.I.E.L.D. AI CLOUD</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            S.H.I.E.L.D. AI <span className="text-primary">Cloud</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            S.H.I.E.L.D. AI OS Cloud — sovereign cloud infrastructure for compute, storage, databases, and AI services. Built for all nations, all people.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cloudServices.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <s.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["99.99% Uptime", "Global Regions", "Auto-Scaling", "Zero-Knowledge", "Edge Computing", "AI-Optimized", "Sovereign Grade", "All Nations"].map((f) => (
            <div key={f} className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
              <span className="text-sm font-medium text-primary">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ShieldAICloud;
