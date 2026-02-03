import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, Shield, Globe, Lock, Server, Activity, 
  Code2, Database, ArrowRight, CheckCircle2, 
  Key, Cpu, Network, Layers, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const AIGateway = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const features = [
    {
      icon: Zap,
      title: "Ultra-Fast Inference",
      description: "Lightning-fast AI model responses with optimized routing and caching",
      color: "text-yellow-400",
      gradient: "from-yellow-500/20 to-amber-500/20"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption with SOC 2 Type II compliance",
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
      icon: Globe,
      title: "Global Edge Network",
      description: "Distributed across 50+ regions for minimal latency worldwide",
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Your data is never used for training. Full GDPR compliance",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Server,
      title: "99.99% Uptime",
      description: "Enterprise-grade reliability with automatic failover",
      color: "text-red-400",
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      icon: Activity,
      title: "Real-time Analytics",
      description: "Monitor usage, costs, and performance in real-time",
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-teal-500/20"
    }
  ];

  const models = [
    { name: "S.H.I.E.L.D. GPT-5", type: "Text Generation", status: "Available", latency: "~120ms" },
    { name: "S.H.I.E.L.D. Vision Pro", type: "Image Analysis", status: "Available", latency: "~200ms" },
    { name: "S.H.I.E.L.D. Code", type: "Code Generation", status: "Available", latency: "~150ms" },
    { name: "S.H.I.E.L.D. Audio", type: "Speech-to-Text", status: "Available", latency: "~180ms" },
    { name: "S.H.I.E.L.D. Embed", type: "Embeddings", status: "Available", latency: "~50ms" },
    { name: "S.H.I.E.L.D. Multimodal", type: "Multi-Modal AI", status: "Beta", latency: "~250ms" },
  ];

  const plans = [
    {
      name: "Developer",
      price: "Free",
      description: "For individual developers and testing",
      features: ["1,000 requests/month", "Basic models", "Community support", "API access"],
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$99/mo",
      description: "For growing teams and applications",
      features: ["100,000 requests/month", "All models", "Priority support", "Advanced analytics", "Custom rate limits"],
      cta: "Start Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale deployments",
      features: ["Unlimited requests", "Dedicated infrastructure", "24/7 support", "SLA guarantee", "Custom models", "On-premise option"],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              <Zap className="w-3 h-3 mr-1" />
              Enterprise AI Infrastructure
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>
              <br />
              <span className="text-foreground">Gateway</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              The unified API gateway for accessing all S.H.I.E.L.D. AI models. 
              Built for scale, designed for developers, secured for enterprise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2">
                <Key className="w-5 h-5" />
                Get API Key
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Code2 className="w-5 h-5" />
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Code Example Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-border/30 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-muted-foreground">api-example.ts</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="text-foreground/90">
{`import { ShieldAI } from '@shield-ai/gateway';

const shield = new ShieldAI({
  apiKey: process.env.SHIELD_API_KEY,
});

const response = await shield.chat.completions.create({
  model: "shield-gpt-5",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain quantum computing." }
  ]
});

console.log(response.choices[0].message.content);`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Built for <span className="gradient-text">Enterprise Scale</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate AI into your applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Access <span className="gradient-text">All Models</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One API, unlimited possibilities. Access our entire model portfolio.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">{model.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Latency</p>
                          <p className="font-medium text-green-400">{model.latency}</p>
                        </div>
                        <Badge variant={model.status === "Available" ? "default" : "secondary"}>
                          {model.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as you grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-card/50 border-border/50 h-full relative ${plan.popular ? "border-primary/50 shadow-lg shadow-primary/10" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={plan.popular ? "shield" : "outline"} 
                      className="w-full"
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10B+", label: "API Calls/Month" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "50+", label: "Global Regions" },
              { value: "<100ms", label: "Avg. Latency" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default AIGateway;