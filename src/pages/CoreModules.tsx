import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Shield, Cpu, Globe, Lock, Brain, Network, Blocks, Eye, 
  Scale, Database, Zap, Server, Cloud, Layers, Code2, Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: "shield-core",
    name: "S.H.I.E.L.D. Core Engine",
    description: "The central AI processing unit that powers all S.H.I.E.L.D. operations with advanced machine learning algorithms.",
    icon: Shield,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
    features: ["Neural Processing", "Real-time Analysis", "Predictive Modeling", "Adaptive Learning"],
    link: "/technology"
  },
  {
    id: "hii-agents",
    name: "H.I.I. AI Agent Network",
    description: "A network of 500+ specialized AI agents working in unified harmony for comprehensive task management.",
    icon: Cpu,
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
    features: ["Multi-Agent Coordination", "Task Distribution", "Autonomous Operations", "Collective Intelligence"],
    link: "/agents"
  },
  {
    id: "watchman",
    name: "Project Watchman",
    description: "Advanced surveillance and monitoring system for security, compliance, and operational oversight.",
    icon: Eye,
    color: "text-red-400",
    gradient: "from-red-500/20 to-orange-500/20",
    features: ["24/7 Monitoring", "Threat Detection", "Anomaly Analysis", "Alert Systems"],
    link: "/watchman"
  },
  {
    id: "dlt-engine",
    name: "DLT Processing Engine",
    description: "Distributed Ledger Technology engine for secure, transparent, and immutable record-keeping.",
    icon: Blocks,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-green-500/20",
    features: ["Zero-Fee Transactions", "No Mining Required", "Instant Settlement", "Full Transparency"],
    link: "/distributed-ledger"
  },
  {
    id: "compliance",
    name: "Compliance & KYC Module",
    description: "Automated regulatory compliance and Know Your Customer verification systems.",
    icon: Scale,
    color: "text-amber-400",
    gradient: "from-amber-500/20 to-yellow-500/20",
    features: ["AML Screening", "Identity Verification", "Risk Assessment", "Regulatory Reporting"],
    link: "/compliance-kyc"
  },
  {
    id: "oracle",
    name: "Blanch Oracle System",
    description: "Decentralized oracle network providing reliable external data feeds to smart contracts.",
    icon: Database,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-teal-500/20",
    features: ["Real-time Data Feeds", "Multi-source Validation", "Tamper-proof Data", "API Integration"],
    link: "/oracle"
  },
  {
    id: "corridor",
    name: "Global Corridor Network",
    description: "Cross-border settlement infrastructure connecting financial institutions worldwide.",
    icon: Network,
    color: "text-indigo-400",
    gradient: "from-indigo-500/20 to-violet-500/20",
    features: ["Instant Settlements", "Multi-currency Support", "Low Latency", "High Throughput"],
    link: "/blanch-corridor"
  },
  {
    id: "cloud",
    name: "S.H.I.E.L.D. Cloud Infrastructure",
    description: "Enterprise-grade cloud computing platform with global edge distribution.",
    icon: Cloud,
    color: "text-sky-400",
    gradient: "from-sky-500/20 to-blue-500/20",
    features: ["Edge Computing", "Auto-scaling", "99.99% Uptime", "Global CDN"],
    link: "/technology"
  },
];

const capabilities = [
  {
    id: "neural-processing",
    name: "Neural Processing",
    description: "Advanced neural networks for complex pattern recognition and decision-making.",
    icon: Brain,
    color: "text-purple-400"
  },
  {
    id: "security",
    name: "Enterprise Security",
    description: "Multi-layer security with encryption, access control, and threat prevention.",
    icon: Lock,
    color: "text-red-400"
  },
  {
    id: "integration",
    name: "API Integration",
    description: "Comprehensive REST and GraphQL APIs for seamless third-party integration.",
    icon: Code2,
    color: "text-green-400"
  },
  {
    id: "automation",
    name: "Process Automation",
    description: "Intelligent workflow automation with customizable triggers and actions.",
    icon: Zap,
    color: "text-amber-400"
  },
  {
    id: "scalability",
    name: "Infinite Scalability",
    description: "Horizontally scalable architecture handling millions of concurrent operations.",
    icon: Server,
    color: "text-blue-400"
  },
  {
    id: "customization",
    name: "Full Customization",
    description: "Highly configurable modules adaptable to any business requirement.",
    icon: Settings,
    color: "text-pink-400"
  },
];

const CoreModules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-20">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
              <Layers className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
              Core Modules
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The foundational technology stack powering the S.H.I.E.L.D. AI ecosystem. 
              Each module is designed for maximum performance, security, and interoperability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            <span className="gradient-text">System Modules</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                      onClick={() => navigate(module.link)}>
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${module.gradient} mb-4 w-fit group-hover:scale-110 transition-transform`}>
                      <module.icon className={`w-8 h-8 ${module.color}`} />
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            <span className="gradient-text">Core Capabilities</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-background/50 border border-border/30"
              >
                <div className="p-3 rounded-lg bg-card">
                  <cap.icon className={`w-6 h-6 ${cap.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{cap.name}</h3>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-display font-bold mb-6">
              Ready to Explore?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Access the full S.H.I.E.L.D. AI Command Center to explore all available modules and services.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="shield" size="lg" onClick={() => navigate("/command-center")}>
                <Shield className="w-5 h-5 mr-2" />
                Command Center
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/api")}>
                <Code2 className="w-5 h-5 mr-2" />
                API Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoreModules;
