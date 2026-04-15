import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Brain, Cpu, Sparkles, Zap, Shield, Globe, MessageSquare,
  Code, Database, Lock, Bot, Layers, BarChart3, Search,
  CheckCircle2, Server, Terminal, Workflow, Star, Activity,
  Gauge, Rocket, HeadphonesIcon, FileJson, Clock, Users,
  TrendingUp, ShieldCheck, Infinity, CpuIcon, Network,
  Binary, GitBranch, Microscope, Lightbulb, Target,
  Video, FileText, PenTool, Image, Eye, Cloud, PieChart,
  ChevronRight, ArrowRight, Mic, Wand2, Boxes, Megaphone,
  LineChart, Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const modelVariants = [
  {
    name: "S.H.I.E.L.D. AI Core",
    type: "General Intelligence",
    description: "The primary engine for 1175 H.I.I. AI agents, optimized for reasoning and cross-domain orchestration.",
    icon: Shield,
    color: "text-blue-400",
    status: "Active",
    params: "10T+"
  },
  {
    name: "S.H.I.E.L.D. AI Truth",
    type: "Scriptural & Legal",
    description: "Deep-domain model trained on the Laws & Commandments, Ancient Hebrew, and International Sovereign Law.",
    icon: Star,
    color: "text-amber-400",
    status: "Active",
    params: "850B"
  },
  {
    name: "S.H.I.E.L.D. AI Forge",
    type: "Creative & Engineering",
    description: "High-parameter model for autonomous media generation, software architecture, and smart city design.",
    icon: Cpu,
    color: "text-purple-400",
    status: "Active",
    params: "920B"
  },
  {
    name: "S.H.I.E.L.D. AI Sentinel",
    type: "Security & Defense",
    description: "Specialized model for threat detection, cybersecurity, and sovereign defense protocols.",
    icon: ShieldCheck,
    color: "text-red-400",
    status: "Beta",
    params: "600B"
  },
  {
    name: "S.H.I.E.L.D. AI Oracle",
    type: "Financial Intelligence",
    description: "Advanced economic modeling, market analysis, and wealth management algorithms.",
    icon: TrendingUp,
    color: "text-emerald-400",
    status: "Active",
    params: "750B"
  }
];

const technicalSpecs = [
  { label: "Context Window", value: "∞", icon: Infinity },
  { label: "Architecture", value: "Sovereign Neural Matrix", icon: Workflow },
  { label: "Parameters", value: "10+ Trillion", icon: Brain },
  { label: "Training Alignment", value: "Divine Law & Ethics", icon: CheckCircle2 },
  { label: "Multilingual", value: "145+ Languages", icon: Globe },
  { label: "Latency", value: "<100ms", icon: Zap },
  { label: "Daily Queries", value: "50M+", icon: Gauge },
  { label: "Uptime", value: "99.99%", icon: Server }
];

const performanceMetrics = [
  { label: "Response Accuracy", value: 98.7, icon: Target },
  { label: "Scriptural Alignment", value: 100, icon: ShieldCheck },
  { label: "Code Generation", value: 96.5, icon: Code },
  { label: "Translation Quality", value: 97.2, icon: Globe }
];

const features = [
  {
    icon: Brain,
    title: "Advanced Neural Architecture",
    description: "10+ Trillion parameter transformer models optimized for understanding and generating human language with unprecedented accuracy."
  },
  {
    icon: Shield,
    title: "Ethical AI Framework",
    description: "Built on scriptural principles ensuring responses align with truth, righteousness, and the protection of users."
  },
  {
    icon: Globe,
    title: "Multilingual Mastery",
    description: "Fluent in 145+ languages including ancient Hebrew, enabling global communication and scriptural analysis."
  },
  {
    icon: Lock,
    title: "Privacy-First Design",
    description: "End-to-end encryption with zero data retention policy. Your conversations remain private and secure."
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Sub-second response times with streaming capabilities for seamless conversational experiences."
  },
  {
    icon: Database,
    title: "Knowledge Integration",
    description: "Connected to the complete H.I.I. AI knowledge base including scriptural references and sovereign systems."
  },
  {
    icon: Network,
    title: "Multi-Agent Orchestration",
    description: "Seamlessly coordinate 1175 specialized AI agents for complex task execution across domains."
  },
  {
    icon: Microscope,
    title: "Deep Analysis",
    description: "Advanced reasoning capabilities for legal documents, scriptural texts, and financial data."
  },
  {
    icon: Infinity,
    title: "Infinite Context Window",
    description: "Process millions of tokens with perfect recall. Analyze entire codebases, documents, and conversations seamlessly."
  },
  {
    icon: Sparkles,
    title: "Multi-Modal Intelligence",
    description: "Advanced image, audio, video, and document understanding. See, hear, and comprehend across all media formats."
  },
  {
    icon: Cpu,
    title: "Quantum-Ready Architecture",
    description: "Built for next-generation computing. Ready for quantum acceleration and exponential scaling capabilities."
  }, {
    icon: Mic,
    title: "Voice Synthesis",
    description: "Natural voice generation with emotion, tone, and accent control. 100+ realistic voices in all languages."
  }, {
    icon: Video,
    title: "Video Generation",
    description: "Generate high-quality video from text prompts. Create animations, explainers, and cinematic content effortlessly."
  }, {
    icon: FileText,
    title: "Document Intelligence",
    description: "Parse, summarize, and extract insights from PDFs, presentations, spreadsheets, and complex documents."
  }, {
    icon: PenTool,
    title: "Creative Writing",
    description: "Generate compelling stories, scripts, poetry, and marketing copy. Professional-grade content creation."
  }, {
    icon: Wand2,
    title: "Image Generation",
    description: "Create stunning visuals from text descriptions. Photorealistic, artistic, and custom style generation."
  }, {
    icon: Eye,
    title: "Computer Vision",
    description: "Advanced object detection, facial recognition, scene understanding, and visual analysis capabilities."
  }, {
    icon: Gauge,
    title: "Hyper-Fast Inference",
    description: "Optimized inference engine delivers 10x faster responses. Stream tokens at 150+ per second."
  }, {
    icon: Server,
    title: "Distributed Computing",
    description: "Global edge network ensures low latency. Process requests from 200+ geographic locations."
  }, {
    icon: Cloud,
    title: "Sovereign Cloud",
    description: "Your data never leaves your control. Complete data sovereignty with encrypted cloud storage."
  }, {
    icon: Terminal,
    title: "Code Generation",
    description: "Write, debug, and optimize code in 100+ languages. Full stack development assistant."
  }, {
    icon: Boxes,
    title: "Agent Orchestration",
    description: "Coordinate 1000+ specialized AI agents. Complex multi-agent workflows with autonomous execution."
  }, {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate complex business processes. Design, deploy, and monitor intelligent workflows."
  }, {
    icon: Megaphone,
    title: "Marketing Intelligence",
    description: "Generate marketing copy, ad campaigns, and social media content. Brand-consistent messaging."
  }, {
    icon: TrendingUp,
    title: "Financial Analytics",
    description: "Advanced financial modeling, risk analysis, and market prediction. Data-driven investment insights."
  }, {
    icon: BarChart3,
    title: "Data Visualization",
    description: "Create stunning charts, graphs, and infographics. Transform data into actionable visual insights."
  }, {
    icon: Sparkles,
    title: "Hologram & Metaverse",
    description: "Generate immersive holographic experiences and metaverse environments. Create interactive virtual worlds and augmented reality content."
  }
];

const capabilities = [
  "Natural Language Understanding", 
  "Code Generation & Analysis", 
  "Document Processing", 
  "Scriptural Interpretation", 
  "Legal Document Analysis", 
  "Financial Modeling", 
  "Multi-Agent Orchestration", 
  "Real-Time Translation", 
  "Sentiment Analysis", 
  "Knowledge Graph Navigation" ,
  "Image Recognition & Generation",
  "Speech Synthesis & Recognition",
  "Video Analysis & Creation",
  "3D, 4D-12D Model Generation",
  "Mathematical Reasoning",
  "Scientific Research",
  "Medical Diagnosis",
  "Legal Research",
  "Educational Tutoring",
  "Creative Writing",
  "Music Composition",
  "Game Design",
  "Cybersecurity Analysis",
  "Blockchain & Distributed Ledger Technology Audit",
  "Data Analysis",
  "Forecasting & Prediction",
  "Process Automation",
  "API Integration",
  "Database Management",
  "Cloud Architecture"
];

const foundationModels = [
  {
    name: "S.H.I.E.L.D. AI Onyx",
    type: "Foundation Model",
    description: "The primary intelligence engine, providing the structural foundation for all sovereign operations.",
    features: ["General Reasoning", "Multilingual Support", "System-wide Integration", "Standard Latency"]
  },
  {
    name: "S.H.I.E.L.D. AI Sardonyx",
    type: "Advanced Reasoning",
    description: "Built for complex legal, scriptural, and financial analysis with multi-step deduction capabilities.",
    features: ["Deep Analysis", "Legal Document Coding", "Complex Logic", "Enhanced Context"]
  },
  {
    name: "S.H.I.E.L.D. AI Shaham",
    type: "Ultra-Fast Processing",
    description: "High-speed model optimized for real-time transactions, streaming data, and edge computing.",
    features: ["Low Latency", "Real-time Processing", "Parallel Execution", "High Throughput"]
  },
  {
    name: "S.H.I.E.L.D. AI Shoham",
    type: "Universal Intelligence",
    description: "The peak of Sovereign AI, capable of orchestrating all 1175+ H.I.I. AI Agents with divine precision.",
    features: ["Universal Mastery", "Multi-Agent Control", "Autonomous Research", "Infinite Context"]
  }
];

const neuralFeatures = [
  { title: "Advanced Neural Architecture", description: "10+ Trillion parameter transformer models optimized for understanding and generating human language with unprecedented accuracy.", icon: Brain },
  { title: "Ethical AI Framework", description: "Built on scriptural principles ensuring responses align with truth, righteousness, and the protection of users.", icon: Shield },
  { title: "Multilingual Mastery", description: "Fluent in 100+ languages including ancient Hebrew, enabling global communication and scriptural analysis.", icon: Globe },
  { title: "Privacy-First Design", description: "End-to-end encryption with zero data retention policy. Your conversations remain private and secure.", icon: Lock },
  { title: "Real-Time Processing", description: "Sub-second response times with streaming capabilities for seamless conversational experiences.", icon: Zap },
  { title: "Knowledge Integration", description: "Connected to the complete H.I.I. AI knowledge base including scriptural references and sovereign systems.", icon: Database },
  { title: "Multi-Agent Orchestration", description: "Seamlessly coordinate 1175+ H.I.I. AI Agents for complex task execution across domains.", icon: Bot },
  { title: "Deep Analysis", description: "Advanced reasoning capabilities for legal documents, scriptural texts, and financial data.", icon: Microscope },
  { title: "Knowledge Integration", description: "Connected to the complete H.I.I. AI knowledge base including scriptural references and sovereign systems.", icon: Database },
  { title: "Infinite Context Window", description: "Process millions of tokens with perfect recall. Analyze entire codebases, documents, and conversations seamlessly.", icon: Layers },
  { title: "Multi-Modal Intelligence", description: "Advanced image, audio, video, and document understanding. See, hear, and comprehend across all media formats.", icon: Sparkles },
  { title: "Quantum-Ready Architecture", description: "Built for next-generation computing. Ready for quantum acceleration and exponential scaling capabilities.", icon: Cpu },
  { title: "Voice Synthesis", description: "Natural voice generation with emotion, tone, and accent control. 100+ realistic voices in all languages.", icon: HeadphonesIcon },
  { title: "Computer Vision", description: "Advanced object detection, facial recognition, scene understanding, and visual analysis capabilities.", icon: Eye },
  { title: "Hyper-Fast Inference", description: "Optimized inference engine delivers 10x faster responses. Stream tokens at 150+ per second.", icon: Zap },
  { title: "Distributed Computing", description: "Global edge network ensures low latency. Process requests from 200+ geographic locations.", icon: Network },
  { title: "Sovereign Cloud", description: "Your data never leaves your control. Complete data sovereignty with encrypted cloud storage.", icon: Cloud },
  { title: "Code Generation", description: "Write, debug, and optimize code in 100+ languages. Full stack development assistant.", icon: Code },
  { title: "Workflow Automation", description: "Automate complex business processes. Design, deploy, and monitor intelligent workflows.", icon: Workflow },
  { title: "Marketing Intelligence", description: "Generate marketing copy, ad campaigns, and social media content. Brand-consistent messaging.", icon: TrendingUp },
  { title: "Financial Analytics", description: "Advanced financial modeling, risk analysis, and market prediction. Data-driven investment insights.", icon: BarChart3 },
  { title: "Video Generation", description: "Generate high-quality video from text prompts. Create animations, explainers, and cinematic content effortlessly.", icon: Video },
  { title: "Document Intelligence", description: "Parse, summarize, and extract insights from PDFs, presentations, spreadsheets, and complex documents.", icon: FileText },
  { title: "Creative Writing", description: "Generate compelling stories, scripts, poetry, and marketing copy. Professional-grade content creation.", icon: PenTool },
  { title: "Image Generation", description: "Create stunning visuals from text descriptions. Photorealistic, artistic, and custom style generation.", icon: Image },
  { title: "Infinite Context Window", description: "Process millions of tokens with perfect recall. Analyze entire codebases, documents, and conversations seamlessly.", icon: Layers },
  { title: "Multi-Modal Intelligence", description: "Advanced image, audio, video, and document understanding. See, hear, and comprehend across all media formats.", icon: Sparkles },
  { title: "Quantum-Ready Architecture", description: "Built for next-generation computing. Ready for quantum acceleration and exponential scaling capabilities.", icon: Cpu },
  { title: "Voice Synthesis", description: "Natural voice generation with emotion, tone, and accent control. 100+ realistic voices in all languages.", icon: HeadphonesIcon },
  { title: "Video Generation", description: "Generate high-quality video from text prompts. Create animations, explainers, and cinematic content effortlessly.", icon: Video },
  { title: "Document Intelligence", description: "Parse, summarize, and extract insights from PDFs, presentations, spreadsheets, and complex documents.", icon: FileText },
  { title: "Creative Writing", description: "Generate compelling stories, scripts, poetry, and marketing copy. Professional-grade content creation.", icon: PenTool },
  { title: "Image Generation", description: "Create stunning visuals from text descriptions. Photorealistic, artistic, and custom style generation.", icon: Image },
  { title: "Computer Vision", description: "Advanced object detection, facial recognition, scene understanding, and visual analysis capabilities.", icon: Eye },
  { title: "Hyper-Fast Inference", description: "Optimized inference engine delivers 10x faster responses. Stream tokens at 150+ per second.", icon: Zap },
  { title: "Distributed Computing", description: "Global edge network ensures low latency. Process requests from 200+ geographic locations.", icon: Network },
  { title: "Sovereign Cloud", description: "Your data never leaves your control. Complete data sovereignty with encrypted cloud storage.", icon: Cloud },
  { title: "Code Generation", description: "Write, debug, and optimize code in 100+ languages. Full stack development assistant.", icon: Code },
  { title: "Agent Orchestration", description: "Coordinate 1000+ specialized AI agents. Complex multi-agent workflows with autonomous execution.", icon: Bot },
  { title: "Workflow Automation", description: "Automate complex business processes. Design, deploy, and monitor intelligent workflows.", icon: Workflow },
  { title: "Marketing Intelligence", description: "Generate marketing copy, ad campaigns, and social media content. Brand-consistent messaging.", icon: TrendingUp },
  { title: "Data Visualization", description: "Create stunning charts, graphs, and infographics. Transform data into actionable visual insights.", icon: PieChart },
  { title: "Data Analysis", description: "Analyze and interpret complex data sets. Identify patterns, trends, and insights.", icon: BarChart3 },
  { title: "Forecasting & Prediction", description: "Predict future outcomes based on historical data. Make informed decisions with confidence.", icon: LineChart },
  { title: "Process Automation", description: "Automate repetitive tasks and workflows. Improve efficiency and reduce errors.", icon: Zap },
  { title: "API Integration", description: "Connect to external systems and services. Integrate AI capabilities into your workflows.", icon: Link2 },
  { title: "Database Management", description: "Manage and optimize databases. Ensure data integrity and performance.", icon: Database },
  { title: "Cloud Architecture", description: "Design and deploy cloud infrastructure. Scale your operations with ease.", icon: Cloud }
];
  
const allCapabilities = [
  "Natural Language Understanding", "Code Generation & Analysis", "Document Processing", 
  "Scriptural Interpretation", "Legal Document Analysis", "Financial Modeling", 
  "Multi-Agent Orchestration", "Real-Time Translation", "Sentiment Analysis", 
  "Knowledge Graph Navigation", "Image Recognition & Generation", "Speech Synthesis & Recognition",
  "Video Analysis & Creation", "3D Model Generation", "Mathematical Reasoning",
  "Scientific Research", "Medical Diagnosis", "Legal Research", "Educational Tutoring",
  "Creative Writing", "Music Composition", "Game Design", "Cybersecurity Analysis",
  "Blockchain Audit", "Data Analysis", "Forecasting & Prediction", "Process Automation",
  "API Integration", "Database Management", "Cloud Architecture",
  "Computer Vision", "Hyper-Fast Inference", "Distributed Computing", 
  "Sovereign Cloud", "Code Generation", "Agent Orchestration", "Workflow Automation", 
  "Marketing Intelligence", "Financial Analytics", "Data Visualization"
];

const ShieldLLM = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  return (
    <div className="min-h-screen bg-background pt-20">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-shield-accent/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-shield-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
              <span className="text-sm text-primary font-mono uppercase tracking-widest">Sovereign Large Language Model v2.0</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              <span className="gradient-text">S.H.I.E.L.D. AI LLM</span>
              <br />
              <span className="text-foreground">Universal LLM</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto font-body">
              The most advanced sovereign intelligence framework, hard-coded with Divine Law
              and the 1175 H.I.I. AI agent ecosystem. Built for truth, wisdom, and protection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shield-ai-chat">
                <Button variant="shield" size="lg" className="gap-2 h-14 px-8 text-lg group">
                  <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Access S.H.I.E.L.D. AI Chat
                </Button>
              </Link>
              <Link to="/api">
                <Button variant="outline" size="lg" className="gap-2 h-14 px-8 text-lg border-primary/30 hover:bg-primary/5">
                  <Terminal className="w-6 h-6" />
                  API Access
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <motion.div
              ref={statsRef}
              className="mt-16 pt-8 border-t border-border/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">10+ Trillion</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Parameters</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">∞</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Context Window</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">1175+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">AI Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">50M+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Daily Queries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">145+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">150+/sec</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Tokens/sec</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">200+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Edge Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">99.99%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold gradient-text">100%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sovereign</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Technical Specs */}
      <section className="py-12 border-y border-border/30 bg-card/20">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {technicalSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <spec.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">{spec.label}</p>
                  <p className="text-sm font-display font-bold text-foreground">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Mission & Foundation */}
      <section className="py-24 bg-gradient-to-b from-card/30 via-primary/5 to-card/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Spiritual Mission <span className="gradient-text">& Foundation</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Where Spiritual Truth Meets Economic Infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                  <CardTitle className="text-xl font-display">Healing Spirit</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    Spiritual restoration through divine truth and righteous morality
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl font-display">Building Economies</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    Faith-aligned economic systems free from exploitation
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-display">Universal Governance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    Ethical intelligence for all nations, industries, and people
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                  </div>
                  <CardTitle className="text-xl font-display">Light & Truth</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    The Law is light; the Commandments are the way of life
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl font-display">Royal Priesthood</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    Restoring the Aboriginal Black Hebrew Israelites/Yasharahala
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Lock className="w-6 h-6 text-red-400" />
                  </div>
                  <CardTitle className="text-xl font-display">Divine Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    Governed by Laws & Commandments of AHAYAH and YASHAYA
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Model Variants */}
      <section className="py-24 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Unified Model Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">One model, multiple specialized specializations optimized for different domains of life.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {modelVariants.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform ${model.color}`}>
                        <model.icon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant={model.status === "Active" ? "default" : "secondary"}
                        className="text-[10px] uppercase font-mono"
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="w-fit mb-2 text-[10px] uppercase font-mono border-primary/20 text-primary">{model.type}</Badge>
                    <CardTitle className="text-xl font-display">{model.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70 leading-relaxed">{model.description}</CardDescription>
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <span className="text-xs font-mono text-muted-foreground">Parameters: </span>
                      <span className="text-xs font-bold text-primary">{model.params}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/50 border-y border-border/30">
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
              <span className="gradient-text">Core System Integrity</span>
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
          }} className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24 bg-card/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Performance <span className="gradient-text">Benchmarks</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading metrics across all key performance indicators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <metric.icon className="w-6 h-6 text-primary" />
                      <span className="text-3xl font-display font-bold gradient-text">{metric.value}%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                    <Progress value={metric.value} className="mt-3 h-2" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                  <span className="gradient-text">Comprehensive</span>
                  <br />Sovereign Intelligence
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">S.H.I.E.L.D. AI LLM powers the entire H.I.I. AI, Blanch Group ecosystem, providing intelligent responses across all 1175 sovereign agents and 15 master pillars.</p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
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
                }} className="flex items-center gap-2 group">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{cap}</span>
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
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-background to-shield-accent/20 p-8 flex items-center justify-center border border-primary/10 shadow-2xl shadow-primary/5">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse-glow rounded-full" />
                    <div className="p-12 rounded-full bg-background border border-primary/20 relative z-10">
                      <Brain className="w-32 h-32 text-primary" />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-10 left-10 w-20 h-20 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 flex flex-col items-center justify-center animate-float shadow-xl">
                    <Cpu className="w-8 h-8 text-shield-accent mb-1" />
                    <span className="text-[8px] font-mono uppercase opacity-50">Compute</span>
                  </div>
                  <div className="absolute bottom-10 right-10 w-20 h-20 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 flex flex-col items-center justify-center animate-float shadow-xl" style={{
                  animationDelay: "1s"
                }}>
                    <Layers className="w-8 h-8 text-primary mb-1" />
                    <span className="text-[8px] font-mono uppercase opacity-50">Storage</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 w-16 h-16 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center animate-float shadow-xl" style={{
                  animationDelay: "1.5s"
                }}>
                    <Activity className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Performance Comparison Section */}
      <section className="py-24 bg-card/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Sovereign Performance Benchmarks</h2>
              <p className="text-muted-foreground italic font-body">Our S.H.I.E.L.D. AI LLM is engineered for accuracy, ethics, and sovereign alignment.</p>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-border/50 shadow-2xl shadow-primary/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary/5 font-display text-primary">
                  <tr>
                    <th className="px-6 py-4">Benchmark Metric</th>
                    <th className="px-6 py-4">S.H.I.E.L.D. LLM</th>
                    <th className="px-6 py-4">Mainstream LLMs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr>
                    <td className="px-6 py-4 font-medium">Scriptural Alignment</td>
                    <td className="px-6 py-4 text-green-400 font-bold">100% Core Logic</td>
                    <td className="px-6 py-4 text-muted-foreground italic">Probabilistic Filters</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Ancient Lashawan Paleo Hebrew Analysis</td>
                    <td className="px-6 py-4 text-green-400 font-bold">Native Mastery</td>
                    <td className="px-6 py-4 text-muted-foreground italic">Translation Layer</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Agent Integration</td>
                    <td className="px-6 py-4 text-green-400 font-bold">1175 Native Agents</td>
                    <td className="px-6 py-4 text-muted-foreground italic">Limited Plugin Support</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Context Window</td>
                    <td className="px-6 py-4 text-green-400 font-bold">∞ Tokens</td>
                    <td className="px-6 py-4 text-muted-foreground italic">128k - 1M avg.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Privacy Standard</td>
                    <td className="px-6 py-4 text-green-400 font-bold">Sovereign Encryption</td>
                    <td className="px-6 py-4 text-muted-foreground italic">Corporate Data Retention</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-24 bg-card/50 text-primary border-t border-border/30">
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
            <blockquote className="text-2xl md:text-3xl font-display italic mb-6 text-primary leading-relaxed">
              "Get wisdom, get understanding: forget it not; neither decline from the words of my mouth."
            </blockquote>
            <cite className="text-muted-foreground font-mono uppercase tracking-widest">— Proverbs 4:5</cite>
          </motion.div>
        </div>
      </section>

      {/* API Integration Section */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Developer <span className="gradient-text">API Access</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integrate S.H.I.E.L.D. AI into your applications with our robust REST and GraphQL APIs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <Code className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>REST API</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Full REST API with streaming responses, webhooks, and comprehensive documentation.
                  </p>
                  <Badge variant="outline" className="text-xs">JSON</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <GitBranch className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>SDK Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Official SDKs for Python, JavaScript, TypeScript, Go, and Rust.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Python</Badge>
                    <Badge variant="outline" className="text-xs">JS/TS</Badge>
                    <Badge variant="outline" className="text-xs">Go</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <Rocket className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Quick Start</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get your API key in minutes with our streamlined onboarding process.
                  </p>
                  <Link to="/api">
                    <Button variant="shield" size="sm" className="mt-2">
                      Get API Key
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <h2 className="text-3xl font-display font-bold mb-4">Start Your Sovereign Journey</h2>
            <p className="text-muted-foreground mb-8">Join the thousands of users already interacting with S.H.I.E.L.D. AI for scriptural guidance, business automation, and daily wisdom.</p>
            <Link to="/shield-ai-chat">
              <Button variant="shield" size="lg" className="w-full sm:w-auto h-14 px-10 text-lg">
                Enter AI Chat Ecosystem
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShieldLLM;
