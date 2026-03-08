import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { Brain, Cpu, Sparkles, Zap, Shield, Globe, MessageSquare, Code, Database, Lock, Bot, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const features = [{
  icon: Brain,
  title: "Advanced Neural Architecture",
  description: "Multi-billion parameter transformer models optimized for understanding and generating human language with unprecedented accuracy."
}, {
  icon: Shield,
  title: "Ethical AI Framework",
  description: "Built on scriptural principles ensuring responses align with truth, righteousness, and the protection of users."
}, {
  icon: Globe,
  title: "Multilingual Mastery",
  description: "Fluent in 100+ languages including ancient Hebrew, enabling global communication and scriptural analysis."
}, {
  icon: Lock,
  title: "Privacy-First Design",
  description: "End-to-end encryption with zero data retention policy. Your conversations remain private and secure."
}, {
  icon: Zap,
  title: "Real-Time Processing",
  description: "Sub-second response times with streaming capabilities for seamless conversational experiences."
}, {
  icon: Database,
  title: "Knowledge Integration",
  description: "Connected to the complete H.I.I. AI knowledge base including scriptural references and sovereign systems."
}];
const capabilities = ["Natural Language Understanding", "Code Generation & Analysis", "Document Processing", "Scriptural Interpretation", "Legal Document Analysis", "Financial Modeling", "Multi-Agent Orchestration", "Real-Time Translation", "Sentiment Analysis", "Knowledge Graph Navigation"];
const ShieldLLM = () => {
  return <div className="min-h-screen bg-background pt-20">
      <NavigationHeader />
      
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-shield-accent/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-shield-accent/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Large Language Model</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>
              <br />
              <span className="text-foreground">Large Language Model</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The most advanced sovereign AI language model, built on ethical principles 
              and designed to serve humanity with truth, wisdom, and protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#chat">
                <Button variant="shield" size="lg" className="gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Try S.H.I.E.L.D. AI
                </Button>
              </Link>
              <Link to="/api">
                <Button variant="outline" size="lg" className="gap-2">
                  <Code className="w-5 h-5" />
                  API Documentation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="gradient-text">Core Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built from the ground up with sovereign principles and cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
          }} className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  <span className="gradient-text">Comprehensive</span>
                  <br />AI Capabilities
                </h2>
                <p className="text-muted-foreground mb-8">S.H.I.E.L.D. AI LLM powers the entire H.I.I. AI, Blanch Group ecosystem, providing intelligent responses across all 402 sovereign agents and modules.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {capabilities.map((cap, index) => <motion.div key={cap} initial={{
                  opacity: 0,
                  x: -10
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  delay: index * 0.05
                }} className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm">{cap}</span>
                    </motion.div>)}
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-background to-shield-accent/20 p-8 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse">
                      <Bot className="w-32 h-32 text-primary/30" />
                    </div>
                    <Bot className="w-32 h-32 text-primary relative z-10" />
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute top-10 left-10 w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center animate-float">
                    <Cpu className="w-8 h-8 text-shield-accent" />
                  </div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center animate-float" style={{
                  animationDelay: "1s"
                }}>
                    <Layers className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-24 bg-card/50 text-primary">
        <div className="container px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl font-display italic mb-4 text-primary">
              "Get wisdom, get understanding: forget it not; neither decline from the words of my mouth."
            </blockquote>
            <cite className="text-muted-foreground">— Proverbs 4:5</cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default ShieldLLM;