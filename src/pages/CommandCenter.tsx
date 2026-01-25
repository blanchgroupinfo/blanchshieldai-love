import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, Database, Mail, Shield, Settings, BarChart3, MessageSquare, BookOpen,
  Globe, Cpu, Wallet, Lock, ChevronRight, Sparkles, Code2, PenTool, Boxes,
  Search, Eye, Calendar, ScrollText, Heart, Blocks, ArrowLeftRight, Network,
  TrendingUp, Building2, ShoppingBag, Scale, Utensils, FileCheck, Brain,
  Rocket, Home, CreditCard, History, Megaphone, LineChart, Users2, Landmark,
  Cloud, HardDrive, Mail as MailIcon, Zap, Server, Box, Video, Headphones,
  UserCheck, ClipboardCheck, Layers, Link2, Briefcase, MapPin, Compass,
  Package, Factory, Film, Lightbulb, Mic, Radio, Tv, Camera, Printer,
  Smartphone, Tablet, Monitor, Laptop, Watch, Gamepad2, Music, Palette,
  Brush, Scissors, Hammer, Wrench, Cog, Star, Crown, Gift, Trophy, Medal,
  Target, Flag, Bookmark, Tag, Filter, Grid, List, Layout, Sidebar, PanelLeft,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import type { User } from "@supabase/supabase-js";

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

const CommandCenterPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const quickActions: QuickAction[] = [
    // Core Platform
    { id: "dashboard", name: "Dashboard", description: "User Control Panel", icon: BarChart3, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/dashboard", category: "core" },
    { id: "admin", name: "Admin Panel", description: "System Administration", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/admin", category: "core" },
    { id: "agents", name: "AI Agents", description: "500+ H.I.I. AI Unified Agents", icon: Cpu, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/agents", category: "ai" },

    // Trading & Finance
    { id: "trading", name: "Trading Finance Hub", description: "S.H.I.E.L.D. AI Trading", icon: TrendingUp, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/trading", category: "finance" },
    { id: "banking", name: "S.H.I.E.L.D. AI Banking", description: "Digital Banking", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/trading", category: "finance" },
    { id: "deposit", name: "Deposit", description: "Fund Your Account", icon: CreditCard, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/dashboard", category: "finance" },
    { id: "withdraw", name: "Withdraw", description: "Withdraw Funds", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/dashboard", category: "finance" },
    { id: "order-history", name: "Order History", description: "Transaction Records", icon: History, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/dashboard", category: "finance" },
    { id: "cross-border", name: "Cross Border Settlements", description: "Global Payments", icon: ArrowLeftRight, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/cross-border", category: "finance" },

    // Knowledge & Spiritual
    { id: "knowledge", name: "Knowledge Base", description: "Scriptural & Tech Wisdom", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/knowledge-base", category: "knowledge" },
    { id: "calendar", name: "Creators Calendar", description: "Holy Days & Sabbath", icon: Calendar, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/creators-calendar", category: "knowledge" },
    { id: "laws", name: "Laws & Commandments", description: "Divine Instructions", icon: ScrollText, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/laws-commandments", category: "knowledge" },
    { id: "kingdom", name: "Kingdom of Jerusalem", description: "Sacred Governance", icon: Crown, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/laws-commandments", category: "knowledge" },
    { id: "prayer", name: "House of Prayer", description: "For All People", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy", category: "knowledge" },

    // Business & Commerce
    { id: "universal-network", name: "Universal Business Networks", description: "Global B2B Network", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/business-network", category: "business" },
    { id: "marketplace", name: "Virtual Marketplace", description: "Enterprise Commerce", icon: ShoppingBag, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/marketplace", category: "business" },
    { id: "crm-erp", name: "CRM & ERP", description: "Business Management", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/admin", category: "business" },
    { id: "inventory", name: "Inventory", description: "Stock Management", icon: Package, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/admin", category: "business" },
    { id: "manufacturing", name: "Manufacturing", description: "Production Systems", icon: Factory, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/admin", category: "business" },

    // Technology & Development
    { id: "web-app-build", name: "Web/App Building", description: "S.H.I.E.L.D. AI Development", icon: Code2, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/web-app-building", category: "technology" },
    { id: "autocad", name: "AutoCAD", description: "S.H.I.E.L.D. AI Design", icon: PenTool, color: "text-teal-400", gradient: "from-teal-500/20 to-cyan-500/20", link: "/autocad", category: "technology" },
    { id: "llm", name: "S.H.I.E.L.D. AI LLM", description: "Large Language Model", icon: Brain, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/shield-llm", category: "ai" },
    { id: "dlt", name: "DLT Technologies", description: "No Fees, No Mining", icon: Blocks, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/distributed-ledger", category: "technology" },
    { id: "api", name: "API & Integrations", description: "Developer Tools", icon: Link2, color: "text-green-400", gradient: "from-green-500/20 to-teal-500/20", link: "/api", category: "technology" },
    { id: "interfaces", name: "Build Interfaces", description: "S.H.I.E.L.D. AI Hologram & OS Systems", icon: Monitor, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/technology", category: "technology" },
    { id: "interfaces", name: "S.H.I.E.L.D. AI Interfaces", description: "S.H.I.E.L.D. AI Hologram & OS Systems", icon: Monitor, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/technology", category: "technology" },

    // Cloud & Infrastructure
    { id: "drive", name: "S.H.I.E.L.D. Drive", description: "Cloud Storage", icon: HardDrive, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/dashboard", category: "cloud" },
    { id: "blanch-drive", name: "Blanch Drive", description: "Enterprise Storage", icon: HardDrive, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20", link: "/dashboard", category: "cloud" },
    { id: "cloud", name: "S.H.I.E.L.D. Cloud", description: "Cloud Infrastructure", icon: Cloud, color: "text-sky-400", gradient: "from-sky-500/20 to-blue-500/20", link: "/technology", category: "cloud" },
    { id: "blanch-cloud", name: "Blanch Cloud", description: "Enterprise Cloud", icon: Cloud, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/technology", category: "cloud" },
    { id: "email", name: "S.H.I.E.L.D. AI Email", description: "Secure Email", icon: MailIcon, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/dashboard", category: "cloud" },
    { id: "hosting", name: "Hosting", description: "Web Hosting", icon: Server, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/technology", category: "cloud" },
    { id: "domains", name: "Domains", description: "Domain Management", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/technology", category: "cloud" },

    // Virtual & Metaverse
    { id: "metaverse", name: "S.H.I.E.L.D. AI Metaverse", description: "Virtual Reality Worlds", icon: Boxes, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/metaverse", category: "virtual" },
    { id: "hologram", name: " S.H.I.E.L.D. AI Hologram", description: "3D Holographic & OS Systems", icon: Box, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/technology", category: "virtual" },
    { id: "conference", name: " S.H.I.E.L.D. AI Virtual Conference", description: "Video Meetings & Conference Calls", icon: Video, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/technology", category: "virtual" },

    // Explorer & Analytics
    { id: "explorer", name: "S.H.I.E.L.D. AI Explorer", description: "Blockchain Explorer", icon: Search, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/explorer", category: "analytics" },
    { id: "deep-search", name: "S.H.I.E.L.D. AI Deep Search", description: "Advanced Search", icon: Search, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/explorer", category: "analytics" },
    { id: "analytics", name: "S.H.I.E.L.D. AI Analytics", description: "Data Insights", icon: LineChart, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/admin", category: "analytics" },
    { id: "analysis", name: "S.H.I.E.L.D. AI Analysis", description: "Data Analysis", icon: BarChart3, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/admin", category: "analytics" },

    // Marketing & Advertising
    { id: "advertising", name: "S.H.I.E.L.D. AI Advertising Hub", description: "Marketing Platform", icon: Megaphone, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/admin", category: "marketing" },
    { id: "marketing", name: "S.H.I.E.L.D. AI Marketing", description: "Campaign Management", icon: Target, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/admin", category: "marketing" },

    // Media & Creative
    { id: "studios", name: "S.H.I.E.L.D. AI Studios", description: "Media Production", icon: Film, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/technology", category: "media" },
    { id: "creative-media", name: "S.H.I.E.L.D. AI Creative Media", description: "Content Creation", icon: Palette, color: "text-pink-400", gradient: "from-pink-500/20 to-purple-500/20", link: "/technology", category: "media" },

    // Compliance & Legal
    { id: "compliance", name: "Compliance & KYC", description: "Regulatory Compliance", icon: FileCheck, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/compliance-kyc", category: "compliance" },
    { id: "sovereign-court", name: "Sovereign Court", description: "Validation System", icon: Scale, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/sovereign-court", category: "compliance" },
    { id: "international-law", name: "International Law", description: "Legal Framework", icon: Scale, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/international-law", category: "compliance" },

    // Blanch Network
    { id: "blanch-network", name: "Blanch Network", description: "Global Network", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20", link: "/blanch-network", category: "network" },
    { id: "oracle", name: "Blanch Oracle", description: "Decentralized Oracle", icon: Eye, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/oracle", category: "network" },
    { id: "blanch-group", name: "Blanch Group", description: "Enterprise Group", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/about", category: "network" },
    { id: "corridor", name: "Blanch Corridor", description: "Global Infrastructure", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/blanch-corridor", category: "network" },

    // Programs & Ventures
    { id: "ventures", name: "H.E.E.D. Ventures", description: "Submit Your Ventures", icon: Rocket, color: "text-orange-400", gradient: "from-orange-500/20 to-red-500/20", link: "/heed-ventures", category: "programs" },
    { id: "affiliates", name: "Affiliate Programs", description: "Circle Agent ID", icon: Users2, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/admin", category: "programs" },
    { id: "blessings", name: "Blessings & Rewards", description: "Rewards Program", icon: Gift, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/admin", category: "programs" },
    { id: "blessing-tiers", name: "Blessing Tiers", description: "Tier Management", icon: Medal, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/admin", category: "programs" },

    // Philanthropy
    { id: "philanthropy", name: "Philanthropy Hub", description: "Blanch Foundation", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy", category: "philanthropy" },

    // Special Projects
    { id: "food-replicator", name: "Food Replicator", description: "Blanch Food Tech", icon: Utensils, color: "text-green-400", gradient: "from-green-500/20 to-lime-500/20", link: "/food-replicator", category: "projects" },
    { id: "watchman", name: "H.I.I. Project Watchman", description: "AI Surveillance", icon: Eye, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/watchman", category: "ai" },
    { id: "energy", name: "Blanch Energy", description: "Energy Solutions", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/technology", category: "projects" },
    { id: "hospitality", name: "Hospitality", description: "Hotel & Travel", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/technology", category: "projects" },
    { id: "projects", name: "Projects", description: "Create & Manage", icon: Layers, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/admin", category: "projects" },

    // Support & Services
    { id: "concierge", name: "Concierge", description: "Personal Assistant", icon: UserCheck, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/dashboard", category: "support" },
    { id: "personal-assistant", name: "Personal Assistant", description: "AI Assistant", icon: Headphones, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/dashboard", category: "support" },
    { id: "support", name: "Support", description: "Help Center", icon: Headphones, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/contact", category: "support" },

    // Data Management
    { id: "data-management", name: "S.H.I.E.L.D. AI Data Management", description: "Data Systems", icon: Database, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/admin", category: "data" },
    { id: "uscpb", name: "USCPB Integration", description: "USCPB Banking Integration", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/uscpb", category: "finance" },

    // External Sync
    { id: "blanch-sync", name: "Blanch Sync", description: "Blanch Integration", icon: Monitor, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/admin", category: "integrations" },
    { id: "google-sync", name: "Google Sync", description: "Google Integration", icon: Globe, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/admin", category: "integrations" },
    { id: "apple-sync", name: "Apple Sync", description: "Apple Integration", icon: Smartphone, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/admin", category: "integrations" },
    { id: "microsoft-sync", name: "Microsoft Sync", description: "Microsoft Integration", icon: Monitor, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/admin", category: "integrations" },
    

  ];

  const categories = [
    { id: "all", name: "All", icon: Grid },
    { id: "core", name: "Core", icon: Shield },
    { id: "ai", name: "AI", icon: Brain },
    { id: "finance", name: "Finance", icon: TrendingUp },
    { id: "knowledge", name: "Knowledge", icon: BookOpen },
    { id: "business", name: "Business", icon: Building2 },
    { id: "technology", name: "Technology", icon: Code2 },
    { id: "cloud", name: "Cloud", icon: Cloud },
    { id: "virtual", name: "Virtual", icon: Boxes },
    { id: "analytics", name: "Analytics", icon: LineChart },
    { id: "marketing", name: "Marketing", icon: Megaphone },
    { id: "media", name: "Media", icon: Film },
    { id: "compliance", name: "Compliance", icon: FileCheck },
    { id: "network", name: "Network", icon: Network },
    { id: "programs", name: "Programs", icon: Rocket },
    { id: "philanthropy", name: "Philanthropy", icon: Heart },
    { id: "projects", name: "Projects", icon: Layers },
    { id: "support", name: "Support", icon: Headphones },
    { id: "data", name: "Data", icon: Database },
    { id: "integrations", name: "Integrations", icon: Link2 },
  ];

  const filteredActions = quickActions.filter(action => {
    const matchesSearch = action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || action.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleActionClick = (action: QuickAction) => {
    if (action.link) {
      navigate(action.link);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              S.H.I.E.L.D. AI Command Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access all platform features, tools, and services from one unified command center
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-border/50"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Action Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.02, type: "spring", stiffness: 300 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
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
                      rotateY: hoveredAction === action.id ? 10 : 0,
                      rotateX: hoveredAction === action.id ? -10 : 0,
                    }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

                    {/* Icon with 3D shadow */}
                    <div className="relative">
                      <action.icon className={`w-8 h-8 ${action.color} relative z-10`} />
                      <div className={`absolute inset-0 ${action.color} blur-md opacity-30`} />
                    </div>
                  </motion.div>

                  {/* Label */}
                  <span className="text-sm font-medium text-foreground text-center leading-tight">
                    {action.name}
                  </span>
                  <span className="text-xs text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2">
                    {action.description}
                  </span>

                  {/* Link indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredActions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No commands found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between p-4 rounded-xl bg-card/30 border border-border/20 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">All Systems Operational</span>
              </div>
              <span className="text-sm text-muted-foreground">
                H.I.I. AI Network Active • {quickActions.length} Commands Available
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default CommandCenterPage;
