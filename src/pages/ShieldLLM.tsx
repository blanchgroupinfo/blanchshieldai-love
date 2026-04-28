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
  LineChart, Link2, Copy, Trash2, RotateCcw, Plus, Key,
  Table, FileCode, BookOpen, Users as TeamIcon, AlertCircle, Download,
  RefreshCw, Play, Square, Settings2, EyeOff, Calendar,
  Bell, Filter, MoreVertical, ExternalLink, ChevronDown,
  Upload, CloudDownload, HardDrive, MemoryStick, PieChart as PieChartIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, Legend } from "recharts";

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

  // Dashboard state
  const [activeTab, setActiveTab] = useState("overview");
  const [usageData, setUsageData] = useState({
    totalRequests: 1547892,
    activeAgents: 1175,
    avgLatency: 87,
    uptime: 99.99,
    tokensUsed: 892456123,
    errors: 0.02
  });

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "sk_live_••••••••••••••••••••7x9A", created: "2026-01-15", lastUsed: "2 mins ago", requests: 892456, status: "active" },
    { id: 2, name: "Development Key", key: "sk_test_••••••••••••••••••••3mK2", created: "2026-02-20", lastUsed: "1 hour ago", requests: 45231, status: "active" },
    { id: 3, name: "Analytics Service", key: "sk_live_••••••••••••••••••••9pL4", created: "2026-03-10", lastUsed: "Never", requests: 0, status: "inactive" }
  ]);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);

  // Analytics chart data
  const requestsData = [
    { date: "Mon", requests: 45230, tokens: 12500000 },
    { date: "Tue", requests: 52100, tokens: 14200000 },
    { date: "Wed", requests: 48900, tokens: 13100000 },
    { date: "Thu", requests: 61200, tokens: 18500000 },
    { date: "Fri", requests: 58400, tokens: 16800000 },
    { date: "Sat", requests: 42100, tokens: 11200000 },
    { date: "Sun", requests: 38500, tokens: 9800000 }
  ];

  const modelUsageData = [
    { name: "S.H.I.E.L.D. AI Onyx", value: 20, color: "#3b82f6" },
    { name: "S.H.I.E.L.D. AI Sardonyx", value: 15, color: "#f59e0b" },
    { name: "S.H.I.E.L.D. AI Shaham", value: 12, color: "#8b5cf6" },
    { name: "S.H.I.E.L.D. AI Shoham", value: 10, color: "#10b981" },
    { name: "S.H.I.E.L.D. AI Core", value: 15, color: "#ef4444" },
    { name: "S.H.I.E.L.D. AI Truth", value: 10, color: "#22c55e" },
    { name: "S.H.I.E.L.D. AI Forge", value: 8, color: "#f97316" },
    { name: "S.H.I.E.L.D. AI Sentinel", value: 6, color: "#6366f1" },
    { name: "S.H.I.E.L.D. AI Oracle", value: 4, color: "#14b8a6" }
  ];

  const latencyData = [
    { time: "00:00", latency: 85, p95: 120, p99: 180 },
    { time: "04:00", latency: 78, p95: 110, p99: 160 },
    { time: "08:00", latency: 92, p95: 135, p99: 200 },
    { time: "12:00", latency: 105, p95: 150, p99: 220 },
    { time: "16:00", latency: 98, p95: 140, p99: 210 },
    { time: "20:00", latency: 88, p95: 125, p99: 185 }
  ];

  // Models state
  const [deployedModels, setDeployedModels] = useState([
    { id: 1, name: "S.H.I.E.L.D. AI Onyx", version: "v2.4.1", status: "running", endpoints: 3, uptime: "99.99%", lastDeployed: "2026-04-25" },
    { id: 2, name: "S.H.I.E.L.D. AI Sardonyx", version: "v2.3.0", status: "running", endpoints: 2, uptime: "99.95%", lastDeployed: "2026-04-20" },
    { id: 3, name: "S.H.I.E.L.D. AI Shaham", version: "v2.2.1", status: "updating", endpoints: 1, uptime: "99.90%", lastDeployed: "2026-04-27" },
    { id: 4, name: "S.H.I.E.L.D. AI Shoham", version: "v2.1.0", status: "stopped", endpoints: 0, uptime: "-", lastDeployed: "2026-04-15" },
    { id: 5, name: "S.H.I.E.L.D. AI Core", version: "v2.5.0", status: "running", endpoints: 5, uptime: "99.99%", lastDeployed: "2026-04-28" },
    { id: 6, name: "S.H.I.E.L.D. AI Truth", version: "v2.4.0", status: "running", endpoints: 4, uptime: "99.98%", lastDeployed: "2026-04-26" },
    { id: 7, name: "S.H.I.E.L.D. AI Forge", version: "v2.3.5", status: "running", endpoints: 3, uptime: "99.95%", lastDeployed: "2026-04-24" },
    { id: 8, name: "S.H.I.E.L.D. AI Sentinel", version: "v2.2.0", status: "running", endpoints: 2, uptime: "99.90%", lastDeployed: "2026-04-22" },
    { id: 9, name: "S.H.I.E.L.D. AI Oracle", version: "v2.1.5", status: "running", endpoints: 1, uptime: "99.85%", lastDeployed: "2026-04-20" }
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    alignmentIntensity: 85,
    autoModeration: true,
    dataRetention: false,
    auditLogging: true,
    rateLimitEnabled: true,
    customFilters: false,
    scriptureAlignment: true,
    legalCompliance: true
  });

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Admin User", email: "admin@shield.ai", role: "Owner", permissions: "Full Access", lastActive: "Now" },
    { id: 2, name: "Developer One", email: "dev1@shield.ai", role: "Developer", permissions: "API + Models", lastActive: "2 hours ago" },
    { id: 3, name: "Analyst User", email: "analyst@shield.ai", role: "Analyst", permissions: "Read Only", lastActive: "1 day ago" }
  ]);

  // Rate limits state
  const [rateLimits, setRateLimits] = useState({
    requestsPerMinute: 1000,
    requestsPerDay: 1000000,
    tokensPerMinute: 500000,
    concurrentRequests: 100
  });

  // Recent activity
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "API Key Created", user: "Admin User", time: "5 mins ago", type: "security" },
    { id: 2, action: "Model Deployed: Onyx v2.4.1", user: "Developer One", time: "2 hours ago", type: "deployment" },
    { id: 3, action: "Rate Limit Updated", user: "Admin User", time: "5 hours ago", type: "settings" },
    { id: 4, action: "New Team Member Added", user: "Admin User", time: "1 day ago", type: "team" },
    { id: 5, action: "Analytics Export", user: "Analyst User", time: "2 days ago", type: "analytics" }
  ]);

  const handleCreateApiKey = () => {
    const newKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedKey(`sk_live_${newKey.substring(0, 8)}••••••••••••••••${newKey.substring(newKey.length - 4)}`);
  };

  const handleRevokeKey = (id: number) => {
    setApiKeys(apiKeys.map(key => key.id === id ? { ...key, status: "revoked" as const } : key));
  };

  const handleRotateKey = (id: number) => {
    const newKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKeys(apiKeys.map(key => key.id === id ? { ...key, key: `sk_live_${newKey.substring(0, 8)}••••••••••••••••${newKey.substring(newKey.length - 4)}` } : key));
  };

  const handleDeployModel = (id: number) => {
    setDeployedModels(deployedModels.map(model =>
      model.id === id ? { ...model, status: model.status === "running" ? "stopped" : "running" as const } : model
    ));
  };

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

      <section className="py-24 bg-gradient-to-b from-card/20 via-background to-card/20">
        <div className="container px-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <span className="text-xs font-display uppercase tracking-wider text-muted-foreground">S.H.I.E.L.D. AI · LLM & Integration Mainstreams LLMs</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">S.H.I.E.L.D. AI <span className="gradient-text">LLM</span></h1>

            <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-2">Access, manage, and fine-tune S.H.I.E.L.D. AI Large Language Model (LLM) & Unified AI Large Language Models integrated with S.H.I.E.L.D. AI. Deploy, monitor, and optimize AI models for your operations.</p>

            <p className="text-sm italic text-foreground/70 mb-4">Spiritual, Healing, Initiative, Economic, Light, Development - The Sovereign Artificial Intelligence Operating System</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="overview">
              <TabsList className="justify-center flex-wrap gap-2 mb-6 bg-card/50 border border-border/30 p-2">
                <TabsTrigger value="overview" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><FileText className="w-4 h-4 text-muted-foreground" />Overview</TabsTrigger>
                <TabsTrigger value="dashboard" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Gauge className="w-4 h-4 text-muted-foreground" />Dashboard</TabsTrigger>
                <TabsTrigger value="models" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Layers className="w-4 h-4 text-muted-foreground" />Models</TabsTrigger>
                <TabsTrigger value="api-keys" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Key className="w-4 h-4 text-muted-foreground" />API Keys</TabsTrigger>
                <TabsTrigger value="analytics" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><BarChart3 className="w-4 h-4 text-muted-foreground" />Analytics</TabsTrigger>
                <TabsTrigger value="rate-limits" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Gauge className="w-4 h-4 text-muted-foreground" />Rate Limits</TabsTrigger>
                <TabsTrigger value="team" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><TeamIcon className="w-4 h-4 text-muted-foreground" />Team</TabsTrigger>
                <TabsTrigger value="cli" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Terminal className="w-4 h-4 text-muted-foreground" />CLI & VS Code</TabsTrigger>
                <TabsTrigger value="docs" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><BookOpen className="w-4 h-4 text-muted-foreground" />Documentation</TabsTrigger>
                <TabsTrigger value="settings" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><Settings2 className="w-4 h-4 text-muted-foreground" />Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <h3 className="text-xl font-display font-semibold mb-3">S.H.I.E.L.D. AI LLM Overview</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">The S.H.I.E.L.D. AI Large Language Model (LLM) and Unification Mainstream Large Language Models by integration provides access to sovereign AI capabilities that adhere to the Most High AHAYAH's Laws and Commandments. This system enables ethical, truth-aligned AI operations across all S.H.I.E.L.D. AI platforms.</p>

                <section className="mb-6">
                  <h4 className="text-lg font-display font-semibold">Sovereign Intelligence</h4>
                  <p className="text-muted-foreground">All AI operations are bound by divine Laws — ensuring truth, righteousness, and ethical conduct in all interactions.</p>
                </section>

                <section className="mb-6">
                  <h4 className="text-lg font-display font-semibold">Multi-Model Support</h4>
                  <p className="text-muted-foreground">Integrate with leading AI models while maintaining S.H.I.E.L.D. AI's sovereign oversight and governance protocols.</p>
                </section>

                <section className="mb-6">
                  <h4 className="text-lg font-display font-semibold">API Key Management</h4>
                  <p className="text-muted-foreground">Secure API key generation and management for seamless integration with external systems and applications.</p>
                </section>

                <section className="mb-6">
                  <h4 className="text-lg font-display font-semibold">Real-time Analytics</h4>
                  <p className="text-muted-foreground">Monitor usage, latency, error rates, and performance metrics across all deployed models in real-time.</p>
                </section>

                <section className="mb-8">
                  <h4 className="text-lg font-display font-semibold">Start Your Sovereign Journey</h4>
                  <p className="text-muted-foreground mb-4">Ready to onboard? Create API keys, deploy a model endpoint, or try S.H.I.E.L.D. AI Chat to experience sovereign intelligence.</p>
                  <div className="flex gap-3">
                    <Link to="/shield-ai-chat"><Button variant="shield">Access Chat</Button></Link>
                    <Link to="/api"><Button variant="outline">Developer API</Button></Link>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="dashboard">
                <h3 className="text-xl font-display font-semibold mb-3">S.H.I.E.L.D. AI LLM Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">Monitor real-time performance metrics, model usage, and system health for all S.H.I.E.L.D. AI LLM deployments.</p>
                <div className="space-y-6">
                  {/* Live Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-card/50 border-border/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Requests</p>
                            <p className="text-2xl font-display font-bold gradient-text">{usageData.totalRequests.toLocaleString()}</p>
                            <p className="text-xs text-green-400 mt-1">↑ 12.5% from last week</p>
                          </div>
                          <Activity className="w-10 h-10 text-primary/20" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Agents</p>
                            <p className="text-2xl font-display font-bold gradient-text">{usageData.activeAgents}</p>
                            <p className="text-xs text-green-400 mt-1">All systems operational</p>
                          </div>
                          <Bot className="w-10 h-10 text-primary/20" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Latency</p>
                            <p className="text-2xl font-display font-bold gradient-text">{usageData.avgLatency}ms</p>
                            <p className="text-xs text-green-400 mt-1">↓ 8ms improvement</p>
                          </div>
                          <Zap className="w-10 h-10 text-primary/20" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Uptime</p>
                            <p className="text-2xl font-display font-bold gradient-text">{usageData.uptime}%</p>
                            <p className="text-xs text-green-400 mt-1">Last 30 days</p>
                          </div>
                          <ShieldCheck className="w-10 h-10 text-primary/20" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5 text-primary" />
                          Request Trends (7 days)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <AreaChart data={requestsData}>
                            <defs>
                              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="requests" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRequests)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChartIcon className="w-5 h-5 text-primary" />
                          Model Usage Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <RechartsPieChart>
                            <Pie
                              data={modelUsageData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {modelUsageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                            />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* System Health & Activity */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5 text-green-400" />
                          System Health
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { name: "API Gateway", status: "operational", latency: "45ms" },
                          { name: "AI Core Engine", status: "operational", latency: "87ms" },
                          { name: "Vector Database", status: "operational", latency: "12ms" },
                          { name: "Authentication", status: "operational", latency: "23ms" },
                          { name: "Edge Network", status: "operational", latency: "156ms" },
                          { name: "Storage Layer", status: "operational", latency: "34ms" }
                        ].map((service, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-sm font-medium">{service.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{service.latency}</Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border/30 last:border-0">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                activity.type === 'security' ? 'bg-red-500/10' :
                                activity.type === 'deployment' ? 'bg-blue-500/10' :
                                activity.type === 'settings' ? 'bg-amber-500/10' :
                                activity.type === 'team' ? 'bg-green-500/10' : 'bg-purple-500/10'
                              }`}>
                                {activity.type === 'security' ? <Lock className="w-4 h-4 text-red-400" /> :
                                 activity.type === 'deployment' ? <Rocket className="w-4 h-4 text-blue-400" /> :
                                 activity.type === 'settings' ? <Settings2 className="w-4 h-4 text-amber-400" /> :
                                 activity.type === 'team' ? <TeamIcon className="w-4 h-4 text-green-400" /> :
                                 <BarChart3 className="w-4 h-4 text-purple-400" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{activity.action}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{activity.user}</span>
                                  <span>•</span>
                                  <span>{activity.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="models">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-semibold">S.H.I.E.L.D. AI LLM Deployed Models</h3>
                      <p className="text-muted-foreground">Manage and monitor your S.H.I.E.L.D. AI model deployments</p>
                    </div>
                    <Button variant="shield" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Deploy New Model
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {deployedModels.map((model) => (
                      <Card key={model.id} className="bg-card/50 border-border/30">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                model.status === 'running' ? 'bg-green-500/10' :
                                model.status === 'updating' ? 'bg-amber-500/10' : 'bg-red-500/10'
                              }`}>
                                <Cpu className={`w-6 h-6 ${
                                  model.status === 'running' ? 'text-green-400' :
                                  model.status === 'updating' ? 'text-amber-400' : 'text-red-400'
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-display font-semibold">{model.name}</h4>
                                  <Badge variant="outline" className="text-xs">{model.version}</Badge>
                                  <Badge className={`text-xs ${
                                    model.status === 'running' ? 'bg-green-500/20 text-green-400' :
                                    model.status === 'updating' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {model.status === 'running' ? 'Running' : model.status === 'updating' ? 'Updating...' : 'Stopped'}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Server className="w-3 h-3" />
                                    {model.endpoints} endpoints
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    Uptime: {model.uptime}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Deployed: {model.lastDeployed}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant={model.status === 'running' ? 'outline' : 'default'}
                                size="sm"
                                onClick={() => handleDeployModel(model.id)}
                                className="gap-2"
                              >
                                {model.status === 'running' ? (
                                  <>
                                    <Square className="w-3 h-3" />
                                    Stop
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3 h-3" />
                                    {model.status === 'updating' ? 'Updating...' : 'Start'}
                                  </>
                                )}
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Settings2 className="w-3 h-3" />
                                Configure
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <RefreshCw className="w-3 h-3" />
                                Rollback
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Model Versions */}
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-primary" />
                        Available Versions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="border-b border-border/30">
                            <tr className="text-left text-muted-foreground">
                              <th className="pb-3 font-medium">Model</th>
                              <th className="pb-3 font-medium">Version</th>
                              <th className="pb-3 font-medium">Release Date</th>
                              <th className="pb-3 font-medium">Status</th>
                              <th className="pb-3 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { model: "S.H.I.E.L.D. AI Onyx", version: "v2.4.1", date: "2026-04-25", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Onyx", version: "v2.4.0", date: "2026-04-10", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Onyx", version: "v2.3.5", date: "2026-03-28", status: "Deprecated" },
                              { model: "S.H.I.E.L.D. AI Sardonyx", version: "v2.3.0", date: "2026-04-20", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Sardonyx", version: "v2.2.8", date: "2026-04-01", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Shaham", version: "v2.2.1", date: "2026-04-27", status: "Beta" },
                              { model: "S.H.I.E.L.D. AI Shoham", version: "v2.1.0", date: "2026-04-15", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Core", version: "v2.5.0", date: "2026-04-28", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Truth", version: "v2.4.0", date: "2026-04-26", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Forge", version: "v2.3.5", date: "2026-04-24", status: "Stable" },
                              { model: "S.H.I.E.L.D. AI Sentinel", version: "v2.2.0", date: "2026-04-22", status: "Beta" },
                              { model: "S.H.I.E.L.D. AI Oracle", version: "v2.1.5", date: "2026-04-20", status: "Stable" },
                            ].map((v, i) => (
                              <tr key={i} className="border-b border-border/30 last:border-0">
                                <td className="py-3 font-medium">{v.model}</td>
                                <td className="py-3 font-mono text-primary">{v.version}</td>
                                <td className="py-3 text-muted-foreground">{v.date}</td>
                                <td className="py-3">
                                  <Badge variant="outline" className={
                                    v.status === 'Stable' ? 'text-green-400 border-green-500/30' :
                                    v.status === 'Beta' ? 'text-amber-400 border-amber-500/30' : 'text-red-400 border-red-500/30'
                                  }>{v.status}</Badge>
                                </td>
                                <td className="py-3">
                                  <Button variant="ghost" size="sm" className="gap-1">
                                    <Download className="w-3 h-3" />
                                    Deploy
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="api-keys">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-semibold">API Keys</h3>
                      <p className="text-muted-foreground">Manage your API keys and access credentials</p>
                    </div>
                    <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
                      <DialogTrigger asChild>
                        <Button variant="shield" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Create New Key
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border">
                        <DialogHeader>
                          <DialogTitle>Create New API Key</DialogTitle>
                          <DialogDescription>
                            Give your API key a descriptive name. Store your key securely once generated - you won't be able to see it again.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="keyName">Key Name</Label>
                            <Input
                              id="keyName"
                              placeholder="e.g., Production API Key"
                              value={newKeyName}
                              onChange={(e) => setNewKeyName(e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          {generatedKey && (
                            <Alert className="bg-green-500/10 border-green-500/30">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              <AlertTitle className="text-green-400">Key Generated Successfully</AlertTitle>
                              <AlertDescription className="text-green-400/80 mt-2">
                                <code className="bg-background px-2 py-1 rounded text-sm block break-all">{generatedKey}</code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2 gap-2"
                                  onClick={() => {
                                    navigator.clipboard.writeText(generatedKey);
                                  }}
                                >
                                  <Copy className="w-3 h-3" />
                                  Copy to Clipboard
                                </Button>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowNewKeyDialog(false)}>
                            Cancel
                          </Button>
                          <Button
                            variant="shield"
                            onClick={() => {
                              handleCreateApiKey();
                            }}
                          >
                            Generate Key
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* API Keys List */}
                  <div className="grid gap-4">
                    {apiKeys.map((apiKey) => (
                      <Card key={apiKey.id} className="bg-card/50 border-border/30">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                apiKey.status === 'active' ? 'bg-green-500/10' :
                                apiKey.status === 'revoked' ? 'bg-red-500/10' : 'bg-amber-500/10'
                              }`}>
                                <Key className={`w-6 h-6 ${
                                  apiKey.status === 'active' ? 'text-green-400' :
                                  apiKey.status === 'revoked' ? 'text-red-400' : 'text-amber-400'
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-display font-semibold">{apiKey.name}</h4>
                                  <Badge className={`text-xs ${
                                    apiKey.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                    apiKey.status === 'revoked' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                  }`}>
                                    {apiKey.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                  <span className="font-mono">{apiKey.key}</span>
                                  <span>•</span>
                                  <span>Created: {apiKey.created}</span>
                                  <span>•</span>
                                  <span>Last used: {apiKey.lastUsed}</span>
                                  <span>•</span>
                                  <span>{apiKey.requests.toLocaleString()} requests</span>
                                </div>
                              </div>
                            </div>
                             <div className="flex items-center gap-2">
                               <Button
                                 variant="outline"
                                 size="sm"
                                 className="gap-2"
                                 onClick={() => { navigator.clipboard.writeText(apiKey.key); }}
                               >
                                 <Copy className="w-3 h-3" />
                                 Copy Key
                               </Button>
                               <Button
                                 variant="outline"
                                 size="sm"
                                 className="gap-2"
                                 onClick={() => handleRotateKey(apiKey.id)}
                               >
                                 <RotateCcw className="w-3 h-3" />
                                 Rotate
                               </Button>
                              <Button
                                variant={apiKey.status === 'active' ? 'outline' : 'default'}
                                size="sm"
                                onClick={() => setApiKeys(apiKeys.map(k => k.id === apiKey.id ? { ...k, status: k.status === 'active' ? 'inactive' : 'active' } : k))}
                              >
                                {apiKey.status === 'active' ? 'Disable' : 'Enable'}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRevokeKey(apiKey.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                                Revoke
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Best Practices */}
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Security Best Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: Clock, title: "Rotate Keys Regularly", desc: "Change your API keys every 90 days" },
                          { icon: Lock, title: "Use Environment Variables", desc: "Never hardcode keys in your source code" },
                          { icon: EyeOff, title: "Principle of Least Privilege", desc: "Only grant necessary permissions" },
                          { icon: AlertCircle, title: "Monitor Usage", desc: "Set up alerts for unusual activity" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <item.icon className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-semibold">S.H.I.E.L.D. AI LLM Analytics Dashboard</h3>
                      <p className="text-muted-foreground">Monitor usage, performance, and costs</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="7d">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 Hours</SelectItem>
                          <SelectItem value="7d">7 Days</SelectItem>
                          <SelectItem value="30d">30 Days</SelectItem>
                          <SelectItem value="90d">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total Requests", value: "2.4M", change: "+12.5%", positive: true },
                      { label: "Avg Latency", value: "87ms", change: "-8.2%", positive: true },
                      { label: "Error Rate", value: "0.02%", change: "-0.01%", positive: true },
                      { label: "Total Tokens", value: "892M", change: "+23.1%", positive: true }
                    ].map((metric, i) => (
                      <Card key={i} className="bg-card/50 border-border/30">
                        <CardContent className="pt-6">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                          <p className="text-2xl font-display font-bold gradient-text mt-1">{metric.value}</p>
                          <p className={`text-xs mt-1 ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {metric.change} from last period
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle>Request Volume & Tokens</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={requestsData}>
                            <defs>
                              <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorTok" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReq)" name="Requests" />
                            <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTok)" name="Tokens" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle>Latency Percentiles</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <RechartsLineChart data={latencyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="time" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} name="Avg (ms)" />
                            <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} name="P95 (ms)" />
                            <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} name="P99 (ms)" />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Model Distribution & Errors */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle>Model Usage Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <RechartsPieChart>
                            <Pie
                              data={modelUsageData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {modelUsageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                            />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle>Error Rate by Endpoint</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { endpoint: "/v1/chat", errors: 0.01 },
                            { endpoint: "/v1/completion", errors: 0.02 },
                            { endpoint: "/v1/embeddings", errors: 0.01 },
                            { endpoint: "/v1/images", errors: 0.05 },
                            { endpoint: "/v1/audio", errors: 0.03 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="endpoint" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rate-limits">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold">Rate Limits & Quotas</h3>
                    <p className="text-muted-foreground">Configure and monitor your API rate limits</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle>Current Limits</CardTitle>
                        <CardDescription>Your account's current rate limit configuration</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Requests per Minute</Label>
                            <span className="text-sm font-mono text-primary">{rateLimits.requestsPerMinute.toLocaleString()}</span>
                          </div>
                          <Progress value={(rateLimits.requestsPerMinute / 5000) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Requests per Day</Label>
                            <span className="text-sm font-mono text-primary">{rateLimits.requestsPerDay.toLocaleString()}</span>
                          </div>
                          <Progress value={(rateLimits.requestsPerDay / 10000000) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Tokens per Minute</Label>
                            <span className="text-sm font-mono text-primary">{rateLimits.tokensPerMinute.toLocaleString()}</span>
                          </div>
                          <Progress value={(rateLimits.tokensPerMinute / 2000000) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Concurrent Requests</Label>
                            <span className="text-sm font-mono text-primary">{rateLimits.concurrentRequests}</span>
                          </div>
                          <Progress value={(rateLimits.concurrentRequests / 500) * 100} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <CardTitle>Usage Today</CardTitle>
                        <CardDescription>Real-time usage statistics</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { label: "Requests Used", value: "45,230", total: "1,000,000", percentage: 4.5 },
                          { label: "Tokens Used", value: "125M", total: "500M", percentage: 25 },
                          { label: "Peak RPM", value: "847", total: "1,000", percentage: 84.7 },
                          { label: "Errors", value: "12", total: "100", percentage: 12 }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-2 text-sm">
                              <span className="text-muted-foreground">{item.label}</span>
                              <span className="font-mono">{item.value} / {item.total}</span>
                            </div>
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                        ))}
                        <Alert className="mt-4 bg-green-500/10 border-green-500/30">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <AlertTitle className="text-green-400">All limits healthy</AlertTitle>
                          <AlertDescription className="text-green-400/80 text-sm">
                            You're well within your rate limits. No throttling expected.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle>Configure Limits</CardTitle>
                      <CardDescription>Adjust your rate limits (requires admin permissions)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="rpm">Requests per Minute</Label>
                          <Input
                            id="rpm"
                            type="number"
                            defaultValue={rateLimits.requestsPerMinute}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="rpd">Requests per Day</Label>
                          <Input
                            id="rpd"
                            type="number"
                            defaultValue={rateLimits.requestsPerDay}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tpm">Tokens per Minute</Label>
                          <Input
                            id="tpm"
                            type="number"
                            defaultValue={rateLimits.tokensPerMinute}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="concurrent">Concurrent Requests</Label>
                          <Input
                            id="concurrent"
                            type="number"
                            defaultValue={rateLimits.concurrentRequests}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="shield">Save Changes</Button>
                        <Button variant="outline">Reset to Default</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="team">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-semibold">Team Management</h3>
                      <p className="text-muted-foreground">Manage team members and permissions</p>
                    </div>
                    <Button variant="shield" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Invite Member
                    </Button>
                  </div>

                  <Card className="bg-card/50 border-border/30">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {teamMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between py-4 border-b border-border/30 last:border-0">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{member.name}</p>
                                  <Badge variant="outline" className="text-xs">{member.role}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                <p className="text-xs text-muted-foreground">Permissions: {member.permissions}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Last Active</p>
                                <p className="text-sm font-medium">{member.lastActive}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle>Role Permissions</CardTitle>
                      <CardDescription>Define what each role can access</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="border-b border-border/30">
                            <tr className="text-left">
                              <th className="pb-3 font-medium">Permission</th>
                              <th className="pb-3 font-medium">Owner</th>
                              <th className="pb-3 font-medium">Developer</th>
                              <th className="pb-3 font-medium">Analyst</th>
                              <th className="pb-3 font-medium">Viewer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "API Key Management", owner: true, developer: true, analyst: false, viewer: false },
                              { name: "Model Deployment", owner: true, developer: true, analyst: false, viewer: false },
                              { name: "Analytics Access", owner: true, developer: true, analyst: true, viewer: true },
                              { name: "Team Management", owner: true, developer: false, analyst: false, viewer: false },
                              { name: "Settings Configuration", owner: true, developer: false, analyst: false, viewer: false },
                              { name: "Billing & Usage", owner: true, developer: false, analyst: true, viewer: false }
                            ].map((row, i) => (
                              <tr key={i} className="border-b border-border/30 last:border-0">
                                <td className="py-3 font-medium">{row.name}</td>
                                <td className="py-3 text-center">{row.owner ? <CheckCircle2 className="w-4 h-4 text-green-400 inline" /> : <span className="text-muted-foreground">—</span>}</td>
                                <td className="py-3 text-center">{row.developer ? <CheckCircle2 className="w-4 h-4 text-green-400 inline" /> : <span className="text-muted-foreground">—</span>}</td>
                                <td className="py-3 text-center">{row.analyst ? <CheckCircle2 className="w-4 h-4 text-green-400 inline" /> : <span className="text-muted-foreground">—</span>}</td>
                                <td className="py-3 text-center">{row.viewer ? <CheckCircle2 className="w-4 h-4 text-green-400 inline" /> : <span className="text-muted-foreground">—</span>}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="docs">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold">Documentation</h3>
                    <p className="text-muted-foreground">API reference, guides, and examples</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: BookOpen, title: "Getting Started", desc: "Quick start guides and tutorials", link: "#" },
                      { icon: FileCode, title: "API Reference", desc: "Complete API documentation", link: "#" },
                      { icon: Terminal, title: "CLI Reference", desc: "Command-line tool documentation", link: "#" },
                      { icon: Code, title: "SDKs & Libraries", desc: "Python, JS, Go, Rust SDKs", link: "#" },
                      { icon: Shield, title: "Authentication", desc: "API keys, OAuth, and security", link: "#" },
                      { icon: Zap, title: "Rate Limits", desc: "Understanding quotas and throttling", link: "#" },
                      { icon: Layers, title: "Models", desc: "Available models and capabilities", link: "#" },
                      { icon: MessageSquare, title: "Chat API", desc: "Streaming and completion endpoints", link: "#" },
                      { icon: Image, title: "Multi-Modal", desc: "Image, audio, and video APIs", link: "#" }
                    ].map((doc, i) => (
                      <Card key={i} className="bg-card/50 border-border/30 hover:border-primary/30 transition-all cursor-pointer group">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <doc.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold group-hover:text-primary transition-colors">{doc.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{doc.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle>Quick Start Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
                        <code className="language-bash">{`# Install the S.H.I.E.L.D. AI SDK
pip install shield-ai

# Initialize the client
from shield_ai import Client

client = Client(api_key="sk_live_...")

# Make a chat completion request
response = client.chat.completions.create(
    model="onyx",
    messages=[
        {"role": "user", "content": "Hello, S.H.I.E.L.D. AI!"}
    ]
)

print(response.choices[0].message.content)`}</code>
                      </pre>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Full Docs
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cli">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold">CLI & VS Code Integration</h3>
                    <p className="text-muted-foreground">Command-line tools and editor extensions</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Terminal className="w-8 h-8 text-primary" />
                          <div>
                            <CardTitle>S.H.I.E.L.D. AI CLI</CardTitle>
                            <CardDescription>Command-line interface for model management</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Button variant="shield" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download CLI
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <FileCode className="w-4 h-4" />
                            Documentation
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Common Commands:</p>
                          <pre className="bg-background p-3 rounded-lg text-xs overflow-x-auto">
                            <code>{`# Authenticate
shield-ai login

# Deploy a model
shield-ai deploy --model onyx --version 2.4.1

# Check status
shield-ai status

# View logs
shield-ai logs --follow

# Create API key
shield-ai keys create "Production Key"`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/30">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Code className="w-8 h-8 text-primary" />
                          <div>
                            <CardTitle>VS Code Extension</CardTitle>
                            <CardDescription>AI-powered coding assistant</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Button variant="shield" className="gap-2">
                            <Download className="w-4 h-4" />
                            Install Extension
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Marketplace
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Features:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Inline code completion</li>
                            <li>• Chat sidebar for Q&A</li>
                            <li>• Code explanation and refactoring</li>
                            <li>• Test generation</li>
                            <li>• Documentation generation</li>
                            <li>• Terminal command assistance</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle>API Integration Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="python" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="python">Python</TabsTrigger>
                          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                        </TabsList>
                        <TabsContent value="python">
                          <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`from shield_ai import Client

client = Client(api_key="sk_live_...")

response = client.chat.completions.create(
    model="onyx",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)`}</code>
                          </pre>
                        </TabsContent>
                        <TabsContent value="javascript">
                          <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`import { ShieldAI } from 'shield-ai';

const client = new ShieldAI('sk_live_...');

const response = await client.chat.completions.create({
  model: 'onyx',
  messages: [{ role: 'user', content: 'Hello!' }]
});
console.log(response.choices[0].message.content);`}</code>
                          </pre>
                        </TabsContent>
                        <TabsContent value="curl">
                          <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`curl https://api.shield.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "onyx",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}</code>
                          </pre>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold">Platform Settings</h3>
                    <p className="text-muted-foreground">Configure alignment, security, and governance</p>
                  </div>

                  {/* Alignment Settings */}
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Scriptural Alignment & Ethics
                      </CardTitle>
                      <CardDescription>Configure AI alignment with divine principles and ethical guidelines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Alignment Intensity: {settings.alignmentIntensity}%</Label>
                          <span className="text-xs text-muted-foreground">Higher = stricter adherence</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.alignmentIntensity}
                          onChange={(e) => setSettings({ ...settings, alignmentIntensity: parseInt(e.target.value) })}
                          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Flexible</span>
                          <span>Balanced</span>
                          <span>Strict</span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                          <div>
                            <Label htmlFor="scripture">Scripture Alignment</Label>
                            <p className="text-xs text-muted-foreground">Align responses with biblical truth</p>
                          </div>
                          <Switch
                            id="scripture"
                            checked={settings.scriptureAlignment}
                            onCheckedChange={(v) => setSettings({ ...settings, scriptureAlignment: v })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                          <div>
                            <Label htmlFor="legal">Legal Compliance</Label>
                            <p className="text-xs text-muted-foreground">Follow sovereign legal frameworks</p>
                          </div>
                          <Switch
                            id="legal"
                            checked={settings.legalCompliance}
                            onCheckedChange={(v) => setSettings({ ...settings, legalCompliance: v })}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Security & Privacy
                      </CardTitle>
                      <CardDescription>Manage data retention, moderation, and audit logging</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                        <div>
                          <Label htmlFor="moderation">Auto Moderation</Label>
                          <p className="text-xs text-muted-foreground">Automatically filter harmful content</p>
                        </div>
                        <Switch
                          id="moderation"
                          checked={settings.autoModeration}
                          onCheckedChange={(v) => setSettings({ ...settings, autoModeration: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                        <div>
                          <Label htmlFor="retention">Data Retention</Label>
                          <p className="text-xs text-muted-foreground">Store conversation history</p>
                        </div>
                        <Switch
                          id="retention"
                          checked={settings.dataRetention}
                          onCheckedChange={(v) => setSettings({ ...settings, dataRetention: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                        <div>
                          <Label htmlFor="audit">Audit Logging</Label>
                          <p className="text-xs text-muted-foreground">Log all API requests and actions</p>
                        </div>
                        <Switch
                          id="audit"
                          checked={settings.auditLogging}
                          onCheckedChange={(v) => setSettings({ ...settings, auditLogging: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                        <div>
                          <Label htmlFor="ratelimit">Rate Limiting</Label>
                          <p className="text-xs text-muted-foreground">Enforce API rate limits</p>
                        </div>
                        <Switch
                          id="ratelimit"
                          checked={settings.rateLimitEnabled}
                          onCheckedChange={(v) => setSettings({ ...settings, rateLimitEnabled: v })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notification Settings */}
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        Notifications & Alerts
                      </CardTitle>
                      <CardDescription>Configure when and how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { label: "Usage Alerts", desc: "When approaching rate limits", enabled: true },
                          { label: "Error Notifications", desc: "When error rate exceeds threshold", enabled: true },
                          { label: "Deployment Updates", desc: "When models are deployed/updated", enabled: false },
                          { label: "Security Alerts", desc: "Suspicious activity detection", enabled: true }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                            <div>
                              <Label>{item.label}</Label>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch defaultChecked={item.enabled} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Audit Logs */}
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Audit Logs
                      </CardTitle>
                      <CardDescription>View and export system audit logs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            Date Range
                          </Button>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          Export Logs
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {[
                          { action: "API Key Created", user: "admin@blanchshield.ai", time: "2026-04-28 10:45:23", ip: "192.168.1.1" },
                          { action: "Model Deployed", user: "dev@admin@blanchshield.ai", time: "2026-04-28 09:30:15", ip: "192.168.1.2" },
                          { action: "Settings Updated", user: "admin@blanchshield.ai", time: "2026-04-28 08:15:42", ip: "192.168.1.1" },
                          { action: "Team Member Added", user: "admin@blanchshield.ai", time: "2026-04-27 16:20:00", ip: "192.168.1.1" },
                          { action: "Rate Limit Changed", user: "admin@blanchshield.ai", time: "2026-04-27 14:10:33", ip: "192.168.1.1" }
                        ].map((log, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 text-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="font-medium">{log.action}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{log.user}</span>
                              <span>{log.time}</span>
                              <span className="font-mono">{log.ip}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    <Button variant="shield">Save All Settings</Button>
                    <Button variant="outline">Reset to Defaults</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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

      {/* Unified Foundation Model Architecture */}
      <section className="py-24 relative">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Unified Foundation Model Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A unified architecture of specialized foundation models (Onyx, Sardonyx, Shaham, Shoham) enabling multi-domain reasoning, orchestration and deployment.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="bg-card/50 border-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">S.H.I.E.L.D. AI Onyx</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded ml-auto">Active</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Foundation model for general reasoning and system integration.</p>
                <p className="text-muted-foreground">Parameters: 10 Trillion</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">S.H.I.E.L.D. AI Sardonyx</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded ml-auto">Active</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Advanced reasoning model for legal, scriptural, and financial analysis.</p>
                <p className="text-muted-foreground">Parameters: 8 Trillion</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">S.H.I.E.L.D. AI Shaham</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded ml-auto">Active</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Specialized model for predictive analytics and strategic planning.</p>
                <p className="text-muted-foreground">Parameters: 6 Trillion</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">S.H.I.E.L.D. AI Shoham</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded ml-auto">Active</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Model for multimodal processing and advanced synthesis.</p>
                <p className="text-muted-foreground">Parameters: 4 Trillion</p>
              </CardContent>
            </Card>
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
            {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </motion.div>
        ))}          </div>
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
