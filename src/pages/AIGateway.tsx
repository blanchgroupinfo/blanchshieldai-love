import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Zap, Shield, Globe, Lock, Server, Activity, 
  Code2, Database, ArrowRight, CheckCircle2, 
  Key, Cpu, Network, Layers, BarChart3, Eye,
  Brain, Workflow, FileSearch, Users, Gauge,
  MonitorSpeaker, Video, Camera, Mic, Box,
  Scale, BookOpen, Landmark, Building2, Rocket,
  Sparkles, RefreshCw, ShieldCheck, GitCompare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";


const AIGateway = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const middlewareFeatures = [
    {
      icon: Network,
      title: "API Gateway / Reverse Proxy",
      description: "S.H.I.E.L.D. AI acts as a reverse proxy, sitting in front of upstream services to manage, route, and secure all HTTP traffic between applications and LLMs.",
      color: "text-primary",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      icon: Layers,
      title: "Plugin-Based Architecture",
      description: "Middleware layer that injects functionality into the request/response lifecycle — authentication, rate-limiting, PII protection, and logging — using modular plugins.",
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
      icon: Server,
      title: "Built on Nginx (OpenResty)",
      description: "Technically a Lua application running on Nginx via OpenResty, positioned directly in the traffic flow for maximum performance and reliability.",
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-teal-500/20"
    },
    {
      icon: GitCompare,
      title: "Multi-LLM Routing",
      description: "Standardized API interface allowing developers to switch between different LLM providers by changing configuration — no code rewrites required.",
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-yellow-500/20"
    },
    {
      icon: ShieldCheck,
      title: "PII Protection & Governance",
      description: "Includes PII masking to prevent sensitive data from reaching AI models, prompt validation, and integration with AWS Guardrails and GCP Model Armor.",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Database,
      title: "Semantic Caching",
      description: "Reduces costs by serving frequent queries from a local cache instead of hitting LLMs. Supports token-based rate limiting to prevent budget overruns.",
      color: "text-red-400",
      gradient: "from-red-500/20 to-orange-500/20"
    }
  ];

  const portalFeatures = [
    {
      icon: FileSearch,
      title: "API Discoverability",
      description: "Developers discover, document, and consume APIs through a comprehensive self-service catalog."
    },
    {
      icon: Key,
      title: "Self-Service Key Generation",
      description: "API key generation and application registration — all self-service, no gatekeeping."
    },
    {
      icon: BookOpen,
      title: "Documentation Hub",
      description: "Complete API documentation with interactive examples, SDKs, and integration guides."
    },
    {
      icon: Users,
      title: "Developer Community",
      description: "Connect with the S.H.I.E.L.D. AI developer community for support and collaboration."
    }
  ];

  const observabilityFeatures = [
    {
      icon: BarChart3,
      title: "Token Usage Tracking",
      description: "Deep introspection into AI traffic with granular token usage analytics."
    },
    {
      icon: Gauge,
      title: "Latency Metrics",
      description: "Real-time latency monitoring across all models and endpoints."
    },
    {
      icon: Activity,
      title: "Cost Analytics",
      description: "Comprehensive cost dashboards powered by Prometheus and Grafana integration."
    },
    {
      icon: Workflow,
      title: "MCP Agent Support",
      description: "Model Context Protocol support for seamless AI agent integration and tool management."
    }
  ];

  const evolutionTimeline = [
    {
      version: "S.H.I.E.L.D. AI Gateway v1",
      title: "Semantic Caching & Load Balancing",
      description: "Introduced semantic caching and advanced load balancing for S.H.I.E.L.D. AI LLM and all connected LLMs."
    },
    {
      version: "S.H.I.E.L.D. AI Gateway v2",
      title: "RAG Pipelines & AI Governance",
      description: "Added automated RAG pipelines, PII protection plugins, and enhanced AI agent governance frameworks."
    },
    {
      version: "S.H.I.E.L.D. AI Gateway v3",
      title: "Multimodal & Prompt Compression",
      description: "Launched multimodal capabilities (text/speech/audio/image/video/voice/camera/hologram) and prompt compression to reduce token spend."
    }
  ];

  const comparisonRows = [
    { feature: "Primary Goal", shield: "Sovereign governance & divine law alignment for all walks of life — Personal, Economic, Financial, Health, Educational, Spiritual, Universal Development and Humanitarian Accomplishment. All Praise the Most High AHAYAH and His Son YASHAYA.", mainstream: "General-purpose reasoning & content generation" },
    { feature: "Foundation", shield: "Scriptural Laws & Commandments of AHAYAH", mainstream: "Internet data, books, and human-feedback (RLHF)" },
    { feature: "Safety Logic", shield: "Hard-Coded Ethics: Strict exclusion of alcohol, tobacco, and GMOs", mainstream: "Probabilistic Filters: Safety guardrails that can sometimes be bypassed" },
    { feature: "Ecosystem", shield: "Integrated with DLT (Ledger), Multi-Agent AI (888 H.I.I. Agents), and Universal Operational Framework", mainstream: "Cloud-based APIs for text, image, and code tasks" },
    { feature: "Governance", shield: "Autonomous 'Sovereign Intelligence' for interstellar, smart cities, and trade", mainstream: "Corporate-controlled models for enterprise productivity" },
    { feature: "Model Alignment", shield: "Laws & Commandments are the system's core logic — not just filters", mainstream: "Uses external 'guardrails' to filter content" },
    { feature: "Domain Specialization", shield: "Economic Restoration, Banking, Trading, Engineering, Development, Spiritual Guidance via Knowledge Core", mainstream: "Good at reasoning, writing, and coding" },
    { feature: "Infrastructure", shield: "Universal Operational Framework automating Smart Cities, Energy Systems, Cross-Border Settlements via distributed ledger", mainstream: "Exists in a chat box or API" },
  ];

  const evaluationArenas = [
    { name: "Text & Reasoning", icon: Brain, description: "Blind battles between LLMs on complex prompts" },
    { name: "Vision & Image", icon: Eye, description: "Visual understanding and image generation ranking" },
    { name: "Design & Engineering", icon: Sparkles, description: "Creative and technical design evaluation" },
    { name: "Video & Hologram", icon: Video, description: "Multimodal video and holographic rendering" },
    { name: "Code & Automation", icon: Code2, description: "Programming and workflow automation benchmarks" },
    { name: "Banking & Trade", icon: Landmark, description: "Financial systems and cross-border settlement tests" },
    { name: "Smart Cities", icon: Building2, description: "Urban infrastructure and IoT management" },
    { name: "Beyond Space", icon: Rocket, description: "Interstellar exploration and advanced systems" },
  ];

  const models = [
    { name: "S.H.I.E.L.D. AI LLM", type: "Sovereign LLM — Text/Reasoning/Governance", status: "Available", latency: "~120ms" },
    { name: "S.H.I.E.L.D. Vision Pro", type: "Image Analysis & Generation", status: "Available", latency: "~200ms" },
    { name: "S.H.I.E.L.D. Code", type: "Code Generation & Engineering", status: "Available", latency: "~150ms" },
    { name: "S.H.I.E.L.D. Audio", type: "Speech-to-Text / Voice", status: "Available", latency: "~180ms" },
    { name: "S.H.I.E.L.D. Multimodal", type: "Text/Speech/Audio/Image/Video/Camera/Hologram", status: "Available", latency: "~250ms" },
    { name: "S.H.I.E.L.D. Embed", type: "Embeddings & Semantic Search", status: "Available", latency: "~50ms" },
  ];

  const plans = [
    {
      name: "Developer",
      price: "Free",
      description: "For individual developers and testing",
      features: ["1,000 requests/month", "Basic models", "Community support", "API access", "Developer Portal access"],
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$99/mo",
      description: "For growing teams and applications",
      features: ["100,000 requests/month", "All models", "Priority support", "Advanced analytics", "Custom rate limits", "Semantic caching"],
      cta: "Start Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale sovereign deployments",
      features: ["Unlimited requests", "Dedicated infrastructure", "24/7 support", "SLA guarantee", "Custom models", "On-premise option", "PII protection", "MCP agent support"],
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
              Sovereign AI Infrastructure & Middleware
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>
              <br />
              <span className="text-foreground">Gateway</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4">
              A high-performance API Gateway and middleware — the unified entry point that abstracts 
              the complexities of integrating multiple AI providers. Manage, secure, and observe traffic 
              between applications, S.H.I.E.L.D. AI LLM, and all connected Large Language Models.
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-8">
              The S.H.I.E.L.D. AI Portal is where users discover APIs. The S.H.I.E.L.D. AI Gateway 
              is the middleware that handles every request to those APIs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/auth")}>
                <Key className="w-5 h-5" />
                Get API Key
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate("/api")}>
                <Code2 className="w-5 h-5" />
                S.H.I.E.L.D. AI Docs
              </Button>
              <Button variant="divine" size="lg" className="gap-2" onClick={() => scrollToSection("evaluation-platform")}>
                <Eye className="w-5 h-5" />
                Evaluation Platform
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
                  <span className="ml-4 text-sm text-muted-foreground">shield-gateway.ts</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="text-foreground/90">
{`import { ShieldAI } from '@shield-ai/gateway';

// Unified entry point — switch models by config, not code
const shield = new ShieldAI({
  apiKey: process.env.SHIELD_API_KEY,
  cache: 'semantic',    // Semantic caching enabled
  piiProtection: true,  // PII masking active
});

const response = await shield.chat.completions.create({
  model: "shield-ai-llm",  // Switch to any LLM provider
  messages: [
    { role: "system", content: "You are S.H.I.E.L.D. AI." },
    { role: "user", content: "Explain sovereign governance." }
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

      {/* Gateway as Middleware Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Core Functionality</Badge>
            <h2 className="text-4xl font-bold mb-4">
              S.H.I.E.L.D. AI Gateway as <span className="gradient-text">Middleware</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A technical tool used by developers to integrate, manage, and route multiple AI services. 
              Handles security, usage limits, and cost-caching for enterprise environments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {middlewareFeatures.map((feature, index) => (
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

      {/* Developer Portal + Observability */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="portal" className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-text">Developer Ecosystem</span>
              </h2>
              <TabsList className="bg-card/50 border border-border/50">
                <TabsTrigger value="portal">Developer Portal</TabsTrigger>
                <TabsTrigger value="observability">Observability</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="portal">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-primary/30 text-primary">Self-Service UI</Badge>
                  <h3 className="text-2xl font-bold">S.H.I.E.L.D. AI Developer Portal</h3>
                  <p className="text-muted-foreground">
                    The S.H.I.E.L.D. AI Developer Portal is the user interface where developers discover, 
                    document, and consume APIs. It provides API catalog, self-service key generation, 
                    and application registration — the management layer for the Gateway middleware.
                  </p>
                  <div className="flex gap-3">
                    <Badge className="bg-primary/10 text-primary border-primary/20">API Catalog</Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20">Self-Service</Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20">Documentation</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {portalFeatures.map((f, i) => (
                    <motion.div key={f.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="bg-card/50 border-border/50">
                        <CardContent className="p-4 flex items-start gap-3">
                          <f.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-sm">{f.title}</h4>
                            <p className="text-xs text-muted-foreground">{f.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="observability">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-primary/30 text-primary">Deep Introspection</Badge>
                  <h3 className="text-2xl font-bold">S.H.I.E.L.D. AI Observability</h3>
                  <p className="text-muted-foreground">
                    Delivers deep introspection into AI traffic — token usage tracking, latency metrics, 
                    and cost analytics through integrated dashboards. The latest versions introduce 
                    Model Context Protocol (MCP) support for AI agent integration and tool management.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {observabilityFeatures.map((f, i) => (
                    <motion.div key={f.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="bg-card/50 border-border/50">
                        <CardContent className="p-4 flex items-start gap-3">
                          <f.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-sm">{f.title}</h4>
                            <p className="text-xs text-muted-foreground">{f.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Gateway <span className="gradient-text">Evolution</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From middleware to a sovereign AI operating ecosystem</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {evolutionTimeline.map((item, index) => (
              <motion.div key={item.version} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                <Card className="bg-card/50 border-border/50 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                  <CardHeader>
                    <Badge variant="outline" className="w-fit border-primary/30 text-primary mb-2">{item.version}</Badge>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Platform */}
      <section id="evaluation-platform" className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Benchmarking & Ranking</Badge>
            <h2 className="text-4xl font-bold mb-4">
              S.H.I.E.L.D. AI Gateway <span className="gradient-text">Evaluation Platform</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A public, web-based platform to benchmark and rank S.H.I.E.L.D. AI LLM against all other Large Language Models. 
              Users conduct "blind battles" by prompting two anonymous models and voting for the better response, fueling a global Elo-based leaderboard.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Scale className="w-5 h-5 text-primary" /> How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Enter a prompt — two anonymous models respond",
                  "Vote for the better response in a blind battle",
                  "Votes generate an Elo-based global leaderboard",
                  "Expert evaluation against complex professional prompts",
                  "Agent workflow evaluation for multi-step tasks",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Purpose</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>S.H.I.E.L.D. AI Gateway Evaluation acts as the <span className="text-foreground font-semibold">"Reliability Sovereign Operating System"</span> for the AI industry — allowing researchers and the public to see which models perform best in real-world scenarios.</p>
                <p>Evolved from a research project into a <span className="text-foreground font-semibold">Sovereign Operating Ecosystem</span> — a brain that powers a Universal Interstellar Sovereign Trust.</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Evaluation <span className="gradient-text">Arenas</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {evaluationArenas.map((arena, i) => (
              <motion.div key={arena.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all text-center h-full">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <arena.icon className="w-8 h-8 text-primary" />
                    <h4 className="font-semibold text-sm">{arena.name}</h4>
                    <p className="text-xs text-muted-foreground">{arena.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LLM Comparison */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Compare <span className="gradient-text">S.H.I.E.L.D. AI LLM</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              S.H.I.E.L.D. AI LLM is positioned as a distinct, specialized alternative to general-purpose models. 
              While mainstream models focus on broad utility, S.H.I.E.L.D. AI prioritizes <span className="text-foreground font-semibold">Sovereign Intelligence</span> — 
              an industry standard for systems that maintain absolute data control and jurisdictional compliance.
            </p>
            <p className="text-base text-muted-foreground mt-2 italic">Proverbs 6:23 — "For the commandment is a lamp; and the law is light."</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border/50 text-muted-foreground text-sm font-medium">Feature</th>
                  <th className="text-left p-4 border-b border-border/50 text-sm font-medium">
                    <span className="gradient-text font-bold">S.H.I.E.L.D. AI LLM</span>
                    <br /><span className="text-xs text-muted-foreground">Sovereign LLM</span>
                  </th>
                  <th className="text-left p-4 border-b border-border/50 text-sm font-medium text-muted-foreground">Mainstream LLMs</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-muted/10" : ""}>
                    <td className="p-4 border-b border-border/30 text-sm font-semibold text-foreground">{row.feature}</td>
                    <td className="p-4 border-b border-border/30 text-sm text-foreground">{row.shield}</td>
                    <td className="p-4 border-b border-border/30 text-sm text-muted-foreground">{row.mainstream}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Unified <span className="gradient-text">Model Access</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One API, all LLMs unified. Access S.H.I.E.L.D. AI LLM and every connected model through a single gateway.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {models.map((model, index) => (
              <motion.div key={model.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Start free, scale as you grow</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className={`bg-card/50 border-border/50 h-full relative ${plan.popular ? "border-primary/50 shadow-lg shadow-primary/10" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4"><span className="text-4xl font-bold">{plan.price}</span></div>
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
                    <Button variant={plan.popular ? "shield" : "outline"} className="w-full" onClick={() => setSelectedPlan(plan.name)}>
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
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-4">Getting <span className="gradient-text">Started</span></h2>
            <p className="text-lg text-muted-foreground mb-8">
              Begin integrating S.H.I.E.L.D. AI Gateway into your applications in minutes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { step: "1", title: "Create Account", desc: "Sign up on the Developer Portal and generate your API key." },
                { step: "2", title: "Install SDK", desc: "npm install @shield-ai/gateway — available in all major languages." },
                { step: "3", title: "Deploy & Scale", desc: "Route to any model, enable caching, and monitor in real-time." },
              ].map((s) => (
                <Card key={s.step} className="bg-card/50 border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">{s.step}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{s.title}</h4>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/auth")}>
                <Rocket className="w-5 h-5" /> Start Building
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate("/api")}>
                <BookOpen className="w-5 h-5" /> Read the Docs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
    </div>
  );
};

export default AIGateway;
