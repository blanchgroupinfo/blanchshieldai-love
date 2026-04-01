import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { 
  Cpu, Shield, Database, Cloud, Lock, Zap, 
  Network, Brain, Layers, Globe, Server, Code 
} from "lucide-react";

const Technology = () => {
  const techStack = [
    {
      icon: Brain,
      title: "Multi-Agent AI Systems",
      description: "888+ specialized AI agents working in harmony through advanced coordination protocols.",
      features: ["Swarm Intelligence", "Agent-to-Agent Communication", "Distributed Task Allocation"],
    },
    {
      icon: Database,
      title: "Distributed Ledger Technology",
      description: "Blockchain and DLT infrastructure for transparent, immutable record-keeping.",
      features: ["Smart Contracts", "Tokenization", "Cross-Chain Interoperability"],
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Security",
      description: "Advanced cryptographic protocols ensuring privacy while maintaining verification.",
      features: ["ZK Proofs", "Homomorphic Encryption", "Quantum-Resistant Algorithms"],
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable, resilient infrastructure deployed across multiple availability zones.",
      features: ["Edge Computing", "Auto-Scaling", "Global CDN"],
    },
    {
      icon: Network,
      title: "Neural Networks",
      description: "Deep learning models trained on diverse datasets for comprehensive understanding.",
      features: ["Transformer Architecture", "Multimodal Processing", "Continuous Learning"],
    },
    {
      icon: Globe,
      title: "Global Connectivity",
      description: "Seamless integration with systems and services worldwide.",
      features: ["API Gateway", "Webhook Integration", "Real-time Sync"],
    },
  ];

  const capabilities = [
    { label: "Processing Power", value: "Petascale", icon: Cpu },
    { label: "Response Time", value: "<100ms", icon: Zap },
    { label: "Uptime", value: "99.99%", icon: Server },
    { label: "AI Agents", value: "888+", icon: Brain },
    { label: "Languages", value: "100+", icon: Globe },
    { label: "Integrations", value: "1000+", icon: Layers },
  ];

  const architectureLayers = [
    {
      name: "Presentation Layer",
      description: "User interfaces, APIs, and interaction endpoints",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      name: "Application Layer",
      description: "Business logic, agent orchestration, and workflow management",
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      name: "Intelligence Layer",
      description: "AI models, machine learning pipelines, and decision engines",
      color: "from-primary/20 to-primary/30",
    },
    {
      name: "Data Layer",
      description: "Distributed databases, caching, and data lakes",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      name: "Infrastructure Layer",
      description: "Cloud resources, containers, and networking",
      color: "from-orange-500/20 to-orange-600/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Cpu className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              Technology Stack
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Cutting-edge infrastructure powering the next generation of AI systems, 
              designed for scalability, security, and divine alignment.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-border/50 bg-card/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {capabilities.map((cap, index) => (
              <ScrollAnimationWrapper key={cap.label} delay={index * 0.05}>
                <div className="text-center">
                  <cap.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-foreground">{cap.value}</p>
                  <p className="text-sm text-muted-foreground font-body">{cap.label}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center gradient-text mb-12">
              Core Technologies
            </h2>
          </ScrollAnimationWrapper>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <ScrollAnimationWrapper key={tech.title} delay={index * 0.1}>
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">{tech.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-4">{tech.description}</p>
                  <ul className="space-y-1">
                    {tech.features.map((feature) => (
                      <li key={feature} className="text-xs text-primary/80 font-body flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center gradient-text mb-12">
              System Architecture
            </h2>
          </ScrollAnimationWrapper>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {architectureLayers.map((layer, index) => (
              <ScrollAnimationWrapper key={layer.name} delay={index * 0.1}>
                <div className={`bg-gradient-to-r ${layer.color} backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:scale-[1.02] transition-transform`}>
                  <div className="flex items-center gap-4">
                    <Layers className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground">{layer.name}</h3>
                      <p className="text-sm text-muted-foreground font-body">{layer.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Code Philosophy */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimationWrapper>
            <Code className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
              Built for the Future
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Our technology stack is designed with extensibility at its core. Every component 
              is built to evolve, ensuring S.H.I.E.L.D. AI remains at the forefront of 
              innovation while maintaining divine alignment.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Technology;
