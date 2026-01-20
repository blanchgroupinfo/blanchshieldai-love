import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import {
  Users, Database, Mail, Shield, Settings, BarChart3, MessageSquare, BookOpen,
  Globe, Cpu, Wallet, Lock, Sparkles, Code2, PenTool, Boxes,
  Search, Eye, Calendar, ScrollText, Heart, Blocks, ArrowLeftRight, Network,
  TrendingUp, Building2, ShoppingBag, Scale, Utensils, FileCheck, Brain,
  Rocket, Home, CreditCard, History, Megaphone, LineChart, Users2, Landmark,
  Cloud, HardDrive, Mail as MailIcon, Zap, Server, Box, Video, Headphones,
  UserCheck, ClipboardCheck, Layers, Link2, Store, Briefcase, Gavel, Info,
  Phone, Map, Music, Image, Film, Gamepad2, Mic, Radio, Tv, Camera,
  Printer, Wifi, Bluetooth, Battery, Monitor, Smartphone, Tablet, Watch,
  Car, Plane, Train, Ship, Bike, Coffee, Pizza, Apple, Leaf, Sun, Moon,
  Star, Cloud as CloudIcon, Umbrella, Wind, Snowflake, Flame, Droplet
} from "lucide-react";

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  link?: string;
  category: string;
}

const allQuickActions: QuickAction[] = [
  // Core Navigation
  { id: "home", name: "Home", description: "Main Dashboard", icon: Home, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/", category: "Core" },
  { id: "about", name: "About", description: "About S.H.I.E.L.D. AI", icon: Info, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/about", category: "Core" },
  { id: "technology", name: "Technology", description: "Tech Overview", icon: Cpu, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/technology", category: "Core" },
  { id: "contact", name: "Contact", description: "Get in Touch", icon: Phone, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/contact", category: "Core" },
  
  // User Panels
  { id: "dashboard", name: "Dashboard", description: "User Control Panel", icon: BarChart3, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/dashboard", category: "User Panels" },
  { id: "admin", name: "Admin Panel", description: "System Administration", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/admin", category: "User Panels" },
  
  // AI & Technology
  { id: "agents", name: "AI Agents", description: "500+ H.I.I. AI Unified Agents", icon: Cpu, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/agents", category: "AI & Technology" },
  { id: "llm", name: "S.H.I.E.L.D. AI LLM", description: "Large Language Model", icon: Brain, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/shield-llm", category: "AI & Technology" },
  { id: "watchman", name: "Project Watchman", description: "AI Surveillance", icon: Eye, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/watchman", category: "AI & Technology" },
  { id: "ventures", name: "H.E.E.D. Ventures", description: "Submit Your Ventures", icon: Rocket, color: "text-orange-400", gradient: "from-orange-500/20 to-red-500/20", link: "/heed-ventures", category: "AI & Technology" },
  { id: "web-app-build", name: "Web/App Build", description: "S.H.I.E.L.D. AI Development", icon: Code2, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/technology", category: "AI & Technology" },
  { id: "autocad", name: "AutoCAD", description: "S.H.I.E.L.D. AI Design", icon: PenTool, color: "text-teal-400", gradient: "from-teal-500/20 to-cyan-500/20", link: "/technology", category: "AI & Technology" },
  
  // Trading & Finance
  { id: "trading", name: "Trading Finance Hub", description: "S.H.I.E.L.D. AI Trading", icon: TrendingUp, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/trading", category: "Trading & Finance" },
  { id: "banking", name: "S.H.I.E.L.D. Banking", description: "Digital Banking", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/trading", category: "Trading & Finance" },
  { id: "deposit", name: "Deposit", description: "Fund Your Account", icon: CreditCard, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/dashboard", category: "Trading & Finance" },
  { id: "withdraw", name: "Withdraw", description: "Withdraw Funds", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/dashboard", category: "Trading & Finance" },
  { id: "cross-border", name: "Cross Border Settlements", description: "Global Payments", icon: ArrowLeftRight, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/cross-border-settlements", category: "Trading & Finance" },
  { id: "order-history", name: "Order History", description: "Transaction Records", icon: History, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/dashboard", category: "Trading & Finance" },
  
  // Marketplace & Commerce
  { id: "marketplace", name: "Virtual Marketplace", description: "Enterprise Commerce", icon: ShoppingBag, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/virtual-marketplace", category: "Marketplace" },
  { id: "universal-network", name: "Universal Business Networks", description: "Global B2B Network", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/universal-business-network", category: "Marketplace" },
  { id: "corridor", name: "Blanch Corridor", description: "Global Network", icon: Network, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20", link: "/blanch-corridor", category: "Marketplace" },
  { id: "crm-erp", name: "CRM & ERP", description: "Business Management", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/admin", category: "Marketplace" },
  { id: "advertising", name: "Advertising Hub", description: "Marketing Platform", icon: Megaphone, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/admin", category: "Marketplace" },
  { id: "affiliates", name: "Affiliate Programs", description: "Circle Agent ID", icon: Users2, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/admin", category: "Marketplace" },
  
  // Legal & Governance
  { id: "compliance", name: "Compliance & KYC", description: "Regulatory Compliance", icon: FileCheck, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/compliance-kyc", category: "Legal & Governance" },
  { id: "international-law", name: "International Law", description: "Legal Framework", icon: Scale, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/international-law", category: "Legal & Governance" },
  { id: "sovereign-court", name: "Sovereign Court", description: "Validation System", icon: Gavel, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/sovereign-court", category: "Legal & Governance" },
  { id: "laws", name: "Laws & Commandments", description: "Divine Instructions", icon: ScrollText, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/laws-commandments", category: "Legal & Governance" },
  
  // Metaverse & Digital
  { id: "metaverse", name: "Metaverse", description: "Virtual Reality Worlds", icon: Boxes, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/metaverse", category: "Metaverse & Digital" },
  { id: "explorer", name: "S.H.I.E.L.D. AI Explorer", description: "Blockchain Explorer", icon: Search, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/explorer", category: "Metaverse & Digital" },
  { id: "oracle", name: "Blanch Oracle", description: "Decentralized Oracle", icon: Eye, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/oracle", category: "Metaverse & Digital" },
  { id: "dlt", name: "DLT Technologies", description: "No Fees, No Mining", icon: Blocks, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/distributed-ledger", category: "Metaverse & Digital" },
  
  // Calendar & Faith
  { id: "calendar", name: "Creators Calendar", description: "Holy Days & Sabbath", icon: Calendar, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/creators-calendar", category: "Calendar & Faith" },
  { id: "philanthropy", name: "Philanthropy Hub", description: "Blanch Foundation", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy", category: "Calendar & Faith" },
  
  // Knowledge & Resources
  { id: "knowledge", name: "Knowledge Base", description: "Scriptural & Tech Wisdom", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/knowledge-base", category: "Knowledge & Resources" },
  { id: "api", name: "API & Integrations", description: "Developer Tools", icon: Link2, color: "text-green-400", gradient: "from-green-500/20 to-teal-500/20", link: "/api", category: "Knowledge & Resources" },
  { id: "analytics", name: "Analytics", description: "Data Insights", icon: LineChart, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/admin", category: "Knowledge & Resources" },
  
  // Cloud & Infrastructure
  { id: "drive", name: "S.H.I.E.L.D. Drive", description: "Cloud Storage", icon: HardDrive, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/dashboard", category: "Cloud & Infrastructure" },
  { id: "cloud", name: "S.H.I.E.L.D. Cloud", description: "Cloud Infrastructure", icon: Cloud, color: "text-sky-400", gradient: "from-sky-500/20 to-blue-500/20", link: "/technology", category: "Cloud & Infrastructure" },
  { id: "email", name: "S.H.I.E.L.D. Email", description: "Secure Email", icon: MailIcon, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/dashboard", category: "Cloud & Infrastructure" },
  { id: "hosting", name: "Hosting", description: "Web Hosting", icon: Server, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/technology", category: "Cloud & Infrastructure" },
  { id: "domains", name: "Domains", description: "Domain Management", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/technology", category: "Cloud & Infrastructure" },
  
  // Media & Production
  { id: "studios", name: "S.H.I.E.L.D. Studios", description: "Media Production", icon: Video, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/technology", category: "Media & Production" },
  { id: "conference", name: "Virtual Conference", description: "Video Meetings", icon: Headphones, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/technology", category: "Media & Production" },
  
  // Services
  { id: "concierge", name: "Concierge", description: "Personal Assistant", icon: UserCheck, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/dashboard", category: "Services" },
  { id: "projects", name: "Projects", description: "Create & Manage", icon: Layers, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/admin", category: "Services" },
  { id: "food-replicator", name: "Food Replicator", description: "Blanch Food Tech", icon: Utensils, color: "text-green-400", gradient: "from-green-500/20 to-lime-500/20", link: "/food-replicator", category: "Services" },
];

const categories = [...new Set(allQuickActions.map(a => a.category))];

const CommandCenterPage = () => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredActions = selectedCategory 
    ? allQuickActions.filter(a => a.category === selectedCategory)
    : allQuickActions;

  const handleActionClick = (action: QuickAction) => {
    if (action.link) {
      navigate(action.link);
    }
  };

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
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
              S.H.I.E.L.D. Command Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete access to all S.H.I.E.L.D. AI modules, services, and administrative functions
            </p>
          </motion.div>

          {/* Category Filter - Horizontal Scroll */}
          <div className="mb-8 overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-max px-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  !selectedCategory 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                All ({allQuickActions.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  {category} ({allQuickActions.filter(a => a.category === category).length})
                </button>
              ))}
            </div>
          </div>

          {/* 3D Icons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.02, type: "spring", stiffness: 300 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionClick(action)}
                  onMouseEnter={() => setHoveredAction(action.id)}
                  onMouseLeave={() => setHoveredAction(null)}
                  className="relative flex flex-col items-center p-4 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                >
                  {/* 3D Icon Container */}
                  <motion.div
                    className={`relative p-4 rounded-2xl bg-gradient-to-br ${action.gradient} mb-3`}
                    animate={{
                      rotateY: hoveredAction === action.id ? 15 : 0,
                      rotateX: hoveredAction === action.id ? -15 : 0,
                    }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                    
                    {/* Icon with 3D shadow */}
                    <div className="relative">
                      <action.icon className={`w-8 h-8 ${action.color} relative z-10`} />
                      <div className={`absolute inset-0 ${action.color} blur-md opacity-40`} />
                    </div>
                  </motion.div>

                  {/* Label */}
                  <span className="text-sm font-medium text-foreground text-center leading-tight">
                    {action.name}
                  </span>
                  <span className="text-xs text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2">
                    {action.description}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between p-4 rounded-xl bg-card/30 border border-border/20 max-w-xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">All Systems Operational</span>
              </div>
              <span className="text-sm text-muted-foreground">
                H.I.I. AI Network Active
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommandCenterPage;
