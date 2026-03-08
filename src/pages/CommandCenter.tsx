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
  Cloud, HardDrive, Zap, Server, Box, Video, Headphones,
  UserCheck, Layers, Link2, Briefcase,
  Package, Factory, Film,
  Smartphone, Monitor, Laptop, Gamepad2, Music, Palette,
  Wrench, Star, Crown, Gift, Trophy, Medal,
  Target, Grid,
  ArrowUpRight, Store, Bell, RefreshCw, FileText, HelpCircle, Car,
  Banknote, Newspaper, GraduationCap, Bot, Activity,
  MonitorSmartphone, FolderOpen, Workflow, BadgeCheck, BookMarked,
  User as UserIcon } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

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
  // ==================== AI ====================
  { id: "shield-llm", name: "S.H.I.E.L.D. AI LLM", description: "Large Language Model", icon: Brain, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/shield-llm", category: "ai" },
  { id: "shield-gateway", name: "S.H.I.E.L.D. AI Gateway", description: "API Gateway & Middleware", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/ai-gateway", category: "ai" },
  { id: "shield-agents", name: "S.H.I.E.L.D. AI Agents", description: "888 H.I.I. AI Agents", icon: Bot, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/agents", category: "ai" },
  { id: "shield-chat", name: "S.H.I.E.L.D. AI Chat", description: "Ask S.H.I.E.L.D. AI Anything", icon: MessageSquare, color: "text-primary", gradient: "from-primary/20 to-accent/20", link: "/shield-ai-chat", category: "ai" },
  { id: "shield-automation", name: "S.H.I.E.L.D. AI Automation", description: "AI Automation Platform", icon: Workflow, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/command-center", category: "ai" },
  { id: "shield-code-gen", name: "S.H.I.E.L.D. AI Code Generator", description: "AI Code Generation", icon: Code2, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/command-center", category: "ai" },
  { id: "shield-ai-os", name: "S.H.I.E.L.D. AI OS", description: "Operating System Dashboard", icon: Monitor, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/shield-ai-os", category: "ai" },
  { id: "shield-concierge", name: "S.H.I.E.L.D. AI Concierge", description: "AI Concierge Service", icon: UserCheck, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "ai" },
  { id: "shield-personal-assistant", name: "S.H.I.E.L.D. AI Personal Assistant", description: "AI Assistant", icon: Headphones, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "ai" },
  { id: "shield-deep-search", name: "S.H.I.E.L.D. AI Deep Search", description: "Advanced Search", icon: Search, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "ai" },
  { id: "shield-avatar", name: "S.H.I.E.L.D. AI Avatar", description: "Digital Avatar System", icon: UserIcon, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "ai" },
  { id: "shield-quantum", name: "S.H.I.E.L.D. AI Quantum Research Lab", description: "Quantum Computing", icon: Sparkles, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "ai" },
  { id: "blanch-bitro", name: "Blanch B.I.T.R.O Project", description: "Institute Technology Research Organization", icon: Brain, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "ai" },
  { id: "shield-deployed-agents", name: "S.H.I.E.L.D. AI Deployed Agents", description: "Monitor Activated H.I.I. AI Agents", icon: Activity, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/deployed-agents", category: "ai" },

  // ==================== ANALYTICS ====================
  { id: "shield-analytics", name: "S.H.I.E.L.D. AI Analytics", description: "Data Insights", icon: LineChart, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/command-center", category: "analytics" },
  { id: "shield-analysis", name: "S.H.I.E.L.D. AI Analysis", description: "Data Analysis", icon: BarChart3, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "analytics" },
  { id: "blanch-dashboard", name: "Blanch Dashboard", description: "Enterprise Dashboard", icon: BarChart3, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/dashboard", category: "analytics" },
  { id: "shield-dashboard", name: "S.H.I.E.L.D. AI Dashboard", description: "User Control Panel", icon: BarChart3, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/dashboard", category: "analytics" },
  { id: "blanch-live-activity", name: "Blanch Live Activity", description: "Real-time Activity Feed", icon: RefreshCw, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "analytics" },
  { id: "shield-tps", name: "S.H.I.E.L.D. AI TPS", description: "Transactions Per Second", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/command-center", category: "analytics" },

  // ==================== BLANCH BRAND ====================
  { id: "blanch-brand", name: "Blanch Brand", description: "Brand Management", icon: Crown, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-group", name: "Blanch Group", description: "Enterprise Group", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-corridor", name: "Blanch Corridor Project", description: "Global Infrastructure", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/blanch-corridor", category: "blanch" },
  { id: "blanch-colonnade", name: "Blanch Colonnade", description: "Architectural Framework", icon: Building2, color: "text-stone-400", gradient: "from-stone-500/20 to-gray-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-arena", name: "Blanch Arena", description: "Events & Entertainment Arena", icon: Trophy, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-council", name: "Blanch Council", description: "Governance Council", icon: Users, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-industries", name: "Blanch Industries", description: "Industrial Solutions", icon: Factory, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-infrastructure", name: "Blanch Infrastructure", description: "Infrastructure Systems", icon: Building2, color: "text-stone-400", gradient: "from-stone-500/20 to-gray-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-properties", name: "Blanch Properties", description: "Real Estate & Properties", icon: Building2, color: "text-stone-400", gradient: "from-stone-500/20 to-gray-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-services", name: "Blanch Services", description: "All Services", icon: Briefcase, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-store", name: "Blanch Store", description: "Official Store", icon: Store, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "blanch" },
  { id: "blanch-oracle", name: "Blanch Oracle Project", description: "Decentralized Oracle", icon: Eye, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/oracle", category: "blanch" },

  // ==================== BUSINESS ====================
  { id: "blanch-ubn", name: "Blanch Universal Business Networks", description: "Global B2B Network", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/business-network", category: "business" },
  { id: "shield-ubn", name: "S.H.I.E.L.D. AI Universal Business Networks", description: "Global B2B Network", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/business-network", category: "business" },
  { id: "shield-crm-erp", name: "S.H.I.E.L.D. AI CRM & ERP", description: "Business Management", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "business" },
  { id: "blanch-marketplace", name: "Blanch Virtual Marketplace", description: "Enterprise Commerce", icon: ShoppingBag, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/marketplace", category: "business" },
  { id: "shield-marketplace", name: "S.H.I.E.L.D. AI Virtual Marketplace", description: "Enterprise Commerce", icon: ShoppingBag, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/marketplace", category: "business" },
  { id: "shield-universal-commerce", name: "S.H.I.E.L.D. AI Universal Commerce", description: "380+ X2X Commerce Models", icon: ShoppingBag, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/universal-commerce", category: "business" },
  { id: "shield-inventory", name: "S.H.I.E.L.D. AI Inventory", description: "Inventory Management", icon: Package, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/command-center", category: "business" },
  { id: "blanch-hr", name: "Blanch HR", description: "Human Resources", icon: Users, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "business" },
  { id: "shield-hr", name: "S.H.I.E.L.D. AI HR", description: "Human Resources", icon: Users, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "business" },
  { id: "shield-hospitality", name: "S.H.I.E.L.D. AI Hospitality", description: "Hospitality Solutions", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "business" },
  { id: "shield-manufacturing", name: "S.H.I.E.L.D. AI Manufacturing", description: "Manufacturing Solutions", icon: Factory, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "business" },
  { id: "shield-industries", name: "S.H.I.E.L.D. AI Industries", description: "Industry Solutions", icon: Factory, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "business" },

  // ==================== CLOUD ====================
  { id: "blanch-cloud", name: "Blanch Cloud", description: "Enterprise Cloud", icon: Cloud, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/command-center", category: "cloud" },
  { id: "blanch-cloud-services", name: "Blanch Cloud Services", description: "Cloud Infrastructure Services", icon: Server, color: "text-sky-400", gradient: "from-sky-500/20 to-blue-500/20", link: "/command-center", category: "cloud" },
  { id: "shield-cloud", name: "S.H.I.E.L.D. AI Cloud", description: "AI Cloud Infrastructure", icon: Cloud, color: "text-sky-400", gradient: "from-sky-500/20 to-blue-500/20", link: "/shield-ai-cloud", category: "cloud" },
  { id: "shield-cluster", name: "S.H.I.E.L.D. AI Cluster", description: "Computing Cluster", icon: Server, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "cloud" },
  { id: "shield-hosting", name: "S.H.I.E.L.D. AI Hosting", description: "Web Hosting", icon: Server, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "cloud" },
  { id: "blanch-domains", name: "Blanch Domains, Emails & Hosting", description: "Domain & Email Management", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "cloud" },
  { id: "shield-domains", name: "S.H.I.E.L.D. AI Domains", description: "Domain Management", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "cloud" },

  // ==================== COMPLIANCE ====================
  { id: "shield-compliance", name: "S.H.I.E.L.D. AI Compliance & KYC", description: "Automated Compliance Engine", icon: FileCheck, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/compliance-kyc", category: "compliance" },
  { id: "blanch-intl-law", name: "Blanch International Law", description: "Legal Framework", icon: Scale, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/international-law", category: "compliance" },
  { id: "shield-intl-law", name: "S.H.I.E.L.D. AI International Law", description: "Legal Framework", icon: Scale, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/international-law", category: "compliance" },
  { id: "shield-sovereign-court", name: "S.H.I.E.L.D. AI Sovereign Court", description: "Validation System", icon: Scale, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/sovereign-court", category: "compliance" },
  { id: "shield-law-enforcement", name: "S.H.I.E.L.D. AI Law Enforcement", description: "Justice & Safety", icon: Shield, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "compliance" },

  // ==================== CORE ====================
  { id: "blanch-core", name: "Blanch Core", description: "Core Platform", icon: Cpu, color: "text-primary", gradient: "from-primary/20 to-accent/20", link: "/command-center", category: "core" },
  { id: "shield-core", name: "S.H.I.E.L.D. AI Core", description: "Core Intelligence Engine", icon: Cpu, color: "text-primary", gradient: "from-primary/20 to-accent/20", link: "/command-center", category: "core" },
  { id: "shield-capabilities", name: "S.H.I.E.L.D. AI Core Capabilities", description: "Platform Capabilities", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/command-center", category: "core" },
  { id: "shield-platform-features", name: "S.H.I.E.L.D. AI Platform Features", description: "All Features", icon: Layers, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/platform-features", category: "core" },
  { id: "shield-true-structure", name: "S.H.I.E.L.D. AI True Structure", description: "Architecture Framework", icon: Layers, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "core" },
  { id: "shield-home", name: "S.H.I.E.L.D. AI Home", description: "Home Page", icon: Home, color: "text-primary", gradient: "from-primary/20 to-accent/20", link: "/", category: "core" },
  { id: "shield-about", name: "S.H.I.E.L.D. AI About", description: "About the Platform", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/about", category: "core" },
  { id: "blanch-os", name: "Blanch OS", description: "Sovereign Operating System", icon: Monitor, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/blanch-os", category: "core" },
  { id: "shield-os", name: "S.H.I.E.L.D. AI OS", description: "Sovereign Operating System", icon: Monitor, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/shield-ai-os", category: "core" },

  // ==================== DATA ====================
  { id: "shield-data-mgmt", name: "S.H.I.E.L.D. AI Data Management", description: "Data Systems", icon: Database, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "data" },
  { id: "shield-db-mgr", name: "S.H.I.E.L.D. AI Database Manager", description: "Database Administration", icon: Database, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "data" },
  { id: "shield-dlt", name: "S.H.I.E.L.D. AI DLT", description: "No Mining, No Fees", icon: Blocks, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/distributed-ledger", category: "data" },
  { id: "blanch-infinity-dlt", name: "Blanch Infinity DLT", description: "Distributed Ledger Tech", icon: Blocks, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "data" },
  { id: "shield-explorer", name: "S.H.I.E.L.D. AI Explorer", description: "Blockchain Explorer", icon: Search, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/explorer", category: "data" },
  { id: "shield-zero-knowledge", name: "S.H.I.E.L.D. AI Zero Knowledge Protocol", description: "Privacy Protocol", icon: Lock, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "data" },
  { id: "blanch-sync", name: "Blanch Sync Center", description: "Data Synchronization", icon: RefreshCw, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "data" },

  // ==================== FINANCE ====================
  { id: "blanch-trust-bank", name: "Blanch & Co Trust – Sovereign Digital Private Bank", description: "Sovereign Digital Private Banking", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "finance" },
  { id: "shield-banking", name: "S.H.I.E.L.D. AI Banking", description: "Digital Banking", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-trading", name: "Blanch Trading", description: "Trading Platform", icon: TrendingUp, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/trading", category: "finance" },
  { id: "shield-trading", name: "S.H.I.E.L.D. AI Trading Finance Hub", description: "Trading Platform", icon: TrendingUp, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/trading", category: "finance" },
  { id: "shield-trading-portal", name: "S.H.I.E.L.D. AI Trading Portal", description: "Trading Finance Hub Portal", icon: TrendingUp, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-pay", name: "Blanch Pay", description: "Payments, Clearing, Settlement, Finality", icon: Banknote, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "finance" },
  { id: "shield-pay", name: "S.H.I.E.L.D. AI Pay", description: "Payments, Clearing, Settlement", icon: Banknote, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-rtgs", name: "Blanch RTGS", description: "Real-Time Gross Settlement", icon: ArrowLeftRight, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/command-center", category: "finance" },
  { id: "shield-rtgs", name: "S.H.I.E.L.D. AI RTGS", description: "Real-Time Gross Settlement", icon: ArrowLeftRight, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/command-center", category: "finance" },
  { id: "shield-cross-border", name: "S.H.I.E.L.D. AI Cross Border", description: "Global Settlements", icon: ArrowLeftRight, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/cross-border", category: "finance" },
  { id: "blanch-deposit", name: "Blanch Deposit", description: "Fund Your Account", icon: CreditCard, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "finance" },
  { id: "shield-deposit", name: "S.H.I.E.L.D. AI Deposit", description: "Fund Your Account", icon: CreditCard, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-withdraw", name: "Blanch Withdraw", description: "Withdraw Funds", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "finance" },
  { id: "shield-withdraw", name: "S.H.I.E.L.D. AI Withdraw", description: "Withdraw Funds", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-wallets", name: "Blanch Wallets & E-Wallets", description: "Digital Wallet System", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "finance" },
  { id: "shield-wallets", name: "S.H.I.E.L.D. AI Wallet & E-Wallets", description: "Digital Wallet System", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-business-card", name: "Blanch Business Card & Wallets", description: "Business Cards & Electronic Wallets", icon: CreditCard, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-infinity-card", name: "Blanch Infinity Business Card & Wallets", description: "Premium Cards & E-Wallets", icon: CreditCard, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-union-pay", name: "Blanch Union Pay", description: "Payment Network", icon: CreditCard, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "finance" },
  { id: "shield-asset-mgmt", name: "S.H.I.E.L.D. AI Asset Management", description: "Digital Asset Management", icon: Briefcase, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "finance" },
  { id: "blanch-order-history", name: "Blanch Order History", description: "Transaction Records", icon: History, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "finance" },

  // ==================== IDENTITY ====================
  { id: "identity-b2b", name: "Identity B2B", description: "Payments, Clearing, Settlement", icon: Banknote, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "identity" },
  { id: "identity-b2b-network", name: "Identity B2B Network", description: "Professional Social Business Network", icon: Network, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "identity" },
  { id: "identity-black-card", name: "Identity Black Card & Wallets", description: "Premium Card & E-Wallets", icon: CreditCard, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "identity" },
  { id: "identity-film", name: "Identity Film Group", description: "Film & Media Production", icon: Film, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/command-center", category: "identity" },
  { id: "identity-music", name: "Identity Music Group", description: "Music Production & Label", icon: Music, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "identity" },
  { id: "identity-unlimited", name: "Identity Unlimited", description: "Full Identity Suite", icon: Crown, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "identity" },
  { id: "shield-user-profile", name: "S.H.I.E.L.D. AI User Profile", description: "Profile Management", icon: UserIcon, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/shield-ai-profile", category: "identity" },

  // ==================== INTEGRATIONS ====================
  { id: "google-sync", name: "Google Sync", description: "Google Integration", icon: Globe, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "integrations" },
  { id: "apple-sync", name: "Apple Sync", description: "Apple Integration", icon: Smartphone, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "integrations" },
  { id: "microsoft-sync", name: "Microsoft Sync", description: "Microsoft Integration", icon: Monitor, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "integrations" },
  { id: "linux-sync", name: "Linux Sync", description: "Linux Integration", icon: Laptop, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/command-center", category: "integrations" },
  { id: "uscpb", name: "USCPB Integration", description: "USCPB Banking", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/uscpb", category: "integrations" },
  { id: "shield-integrations", name: "S.H.I.E.L.D. AI Integrations", description: "Platform Integrations", icon: Link2, color: "text-green-400", gradient: "from-green-500/20 to-teal-500/20", link: "/admin", category: "integrations" },
  { id: "shield-plugin-hub", name: "S.H.I.E.L.D. AI Plugin Hub", description: "Plugin Marketplace", icon: Blocks, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "integrations" },
  { id: "shield-api", name: "S.H.I.E.L.D. AI API", description: "API & Developer Portal", icon: Code2, color: "text-green-400", gradient: "from-green-500/20 to-teal-500/20", link: "/api", category: "integrations" },

  // ==================== KNOWLEDGE ====================
  { id: "blanch-knowledge", name: "Blanch Knowledge Base", description: "Knowledge Repository", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/knowledge-base", category: "knowledge" },
  { id: "shield-knowledge", name: "S.H.I.E.L.D. AI Knowledge Base", description: "Scriptural & Tech Wisdom", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/knowledge-base", category: "knowledge" },
  { id: "shield-docs", name: "S.H.I.E.L.D. AI Documentation", description: "Platform Documentation", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/command-center", category: "knowledge" },
  { id: "shield-scripture-search", name: "S.H.I.E.L.D. AI Scripture Search", description: "Scripture Search Engine", icon: BookMarked, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "knowledge" },
  { id: "shield-education", name: "S.H.I.E.L.D. AI Educational Resources", description: "Learn & Study", icon: GraduationCap, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "knowledge" },
  { id: "calendar", name: "Creators Calendar", description: "Holy Days & Sabbath", icon: Calendar, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/creators-calendar", category: "knowledge" },
  { id: "laws", name: "Laws & Commandments", description: "Divine Instructions", icon: ScrollText, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/laws-commandments", category: "knowledge" },
  { id: "kingdom", name: "Kingdom of Jerusalem", description: "Sacred Governance", icon: Crown, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/laws-commandments", category: "knowledge" },

  // ==================== MARKETING ====================
  { id: "blanch-advertising", name: "Blanch Advertising Pool", description: "Advertising & Marketing Pool", icon: Megaphone, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/command-center", category: "marketing" },
  { id: "blanch-marketing", name: "Blanch Marketing & Advertising", description: "Marketing Platform", icon: Megaphone, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/command-center", category: "marketing" },
  { id: "shield-advertising", name: "S.H.I.E.L.D. AI Advertising Pool", description: "Advertising Platform", icon: Megaphone, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/command-center", category: "marketing" },
  { id: "shield-marketing", name: "S.H.I.E.L.D. AI Marketing", description: "Marketing Platform", icon: Target, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/command-center", category: "marketing" },
  { id: "shield-influencer", name: "S.H.I.E.L.D. AI Influencer", description: "Influencer Platform", icon: Star, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "marketing" },

  // ==================== MEDIA ====================
  { id: "blanch-media", name: "Blanch Media & Entertainment", description: "Media Production", icon: Film, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/command-center", category: "media" },
  { id: "shield-creative-media", name: "S.H.I.E.L.D. AI Creative Media", description: "AI Powered Content Creation", icon: Palette, color: "text-pink-400", gradient: "from-pink-500/20 to-purple-500/20", link: "/command-center", category: "media" },
  { id: "shield-studios", name: "S.H.I.E.L.D. AI Studios", description: "Media, DAW, Video & Publishing", icon: Film, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/command-center", category: "media" },
  { id: "shield-magazine", name: "S.H.I.E.L.D. AI Magazine", description: "Digital Magazine", icon: Newspaper, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/command-center", category: "media" },
  { id: "blanch-content-mgr", name: "Blanch Content Manager", description: "Content Management System", icon: FileText, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "media" },
  { id: "shield-conference", name: "S.H.I.E.L.D. AI Virtual Conference", description: "Voice, Video & Hologram", icon: Video, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "media" },

  // ==================== NETWORK ====================
  { id: "blanch-network", name: "Blanch Network", description: "Global Network", icon: Network, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20", link: "/blanch-network", category: "network" },
  { id: "shield-community", name: "S.H.I.E.L.D. AI Community", description: "Community Hub", icon: Users, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "network" },
  { id: "shield-community-portal", name: "S.H.I.E.L.D. AI Community Portal", description: "Community Portal", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "network" },
  { id: "blanch-notifications", name: "Blanch Notifications", description: "Notification Center", icon: Bell, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/command-center", category: "network" },
  { id: "shield-email", name: "S.H.I.E.L.D. AI Email", description: "Secure Email", icon: Mail, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "network" },
  { id: "shield-contact", name: "S.H.I.E.L.D. AI Contact Us", description: "Get in Touch", icon: Mail, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/contact", category: "network" },

  // ==================== PHILANTHROPY ====================
  { id: "blanch-foundation", name: "Blanch Foundation", description: "Charity, Humanitarian Fund, Emancipation", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy", category: "philanthropy" },
  { id: "blanch-philanthropy", name: "Blanch Philanthropy Hub", description: "Foundation, Charity, Humanitarian", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy", category: "philanthropy" },
  { id: "prayer", name: "House of Prayer", description: "For All People", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy", category: "philanthropy" },

  // ==================== PROGRAMS ====================
  { id: "blanch-heed", name: "Blanch H.E.E.D Program", description: "Health, Education, Enterprising, Development", icon: GraduationCap, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/heed-ventures", category: "programs" },
  { id: "shield-heed", name: "S.H.I.E.L.D. AI H.E.E.D. Program", description: "Helping Entrepreneurs Execute Dreams", icon: Rocket, color: "text-orange-400", gradient: "from-orange-500/20 to-red-500/20", link: "/heed-ventures", category: "programs" },
  { id: "blanch-affiliates", name: "Blanch Group Affiliate Programs", description: "Circle Agent ID, LEI, Referrals, Commissions", icon: Users2, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/command-center", category: "programs" },
  { id: "shield-affiliates", name: "S.H.I.E.L.D. AI Affiliate Programs", description: "Circle Agent ID, LEI, Referrals", icon: Users2, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/command-center", category: "programs" },
  { id: "blanch-blessings", name: "Blanch Blessing & Rewards", description: "Rewards Program", icon: Gift, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "programs" },
  { id: "shield-blessings", name: "S.H.I.E.L.D. AI Blessing & Rewards", description: "Rewards Program", icon: Gift, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/command-center", category: "programs" },
  { id: "shield-blessing-tiers", name: "S.H.I.E.L.D. AI Blessing Tiers", description: "Tier Management", icon: Medal, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/command-center", category: "programs" },
  { id: "blanch-submit-venture", name: "Blanch Submit Venture", description: "Submit Your Ventures", icon: Rocket, color: "text-orange-400", gradient: "from-orange-500/20 to-red-500/20", link: "/heed-ventures", category: "programs" },

  // ==================== PROJECTS ====================
  { id: "shield-watchman", name: "S.H.I.E.L.D. AI H.I.I. AI Project Watchman", description: "Covenant-Based Action & Mechanical Humanoid", icon: Eye, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/watchman", category: "projects" },
  { id: "blanch-watchman", name: "Blanch Watchman Project", description: "H.I.I. AI Watchman", icon: Eye, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/watchman", category: "projects" },
  { id: "shield-projects", name: "S.H.I.E.L.D. AI Projects", description: "Create, Build & Manage", icon: Layers, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/command-center", category: "projects" },
  { id: "blanch-food-replicator", name: "Blanch Food Replicator", description: "Non-GMO Food Tech", icon: Utensils, color: "text-green-400", gradient: "from-green-500/20 to-lime-500/20", link: "/food-replicator", category: "projects" },
  { id: "shield-agent-marketplace", name: "S.H.I.E.L.D. AI Agent Marketplace", description: "Agent Services Marketplace", icon: Store, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "projects" },

  // ==================== S.H.I.E.L.D. AI ====================
  { id: "shield-admin", name: "S.H.I.E.L.D. AI Admin", description: "System Administration", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/admin", category: "shield" },
  { id: "blanch-super-admin", name: "Blanch Super Admin", description: "Super Administration", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/admin", category: "shield" },
  { id: "shield-security", name: "S.H.I.E.L.D. AI Security", description: "Security Systems", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "shield" },
  { id: "blanch-security", name: "Blanch Security", description: "Security Systems", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "shield" },
  { id: "shield-privacy", name: "S.H.I.E.L.D. AI Privacy", description: "Privacy Settings", icon: Lock, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/command-center", category: "shield" },
  { id: "shield-services", name: "S.H.I.E.L.D. AI Services", description: "All Services", icon: Briefcase, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/command-center", category: "shield" },
  { id: "shield-store", name: "S.H.I.E.L.D. AI Store", description: "Official Store", icon: Store, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/command-center", category: "shield" },

  // ==================== SUPPORT ====================
  { id: "blanch-support", name: "Blanch Support", description: "Help Center", icon: HelpCircle, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/contact", category: "support" },
  { id: "shield-support", name: "S.H.I.E.L.D. AI Support", description: "Help Center", icon: HelpCircle, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/contact", category: "support" },
  { id: "shield-scheduling", name: "S.H.I.E.L.D. AI Scheduling System", description: "Calendar & Scheduling", icon: Calendar, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/command-center", category: "support" },

  // ==================== TECHNOLOGY ====================
  { id: "blanch-technology", name: "Blanch Technology", description: "Tech Solutions", icon: Cpu, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/technology", category: "technology" },
  { id: "shield-technology", name: "S.H.I.E.L.D. AI Technology", description: "Tech Solutions", icon: Cpu, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/technology", category: "technology" },
  { id: "blanch-autocad", name: "Blanch AutoCAD", description: "S.H.I.E.L.D. AI Design", icon: PenTool, color: "text-teal-400", gradient: "from-teal-500/20 to-cyan-500/20", link: "/autocad", category: "technology" },
  { id: "blanch-automotive", name: "Blanch Automotive", description: "Automotive Solutions", icon: Car, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/blanch-automotive", category: "technology" },
  { id: "shield-automotive", name: "S.H.I.E.L.D. AI Automotive", description: "Automotive AI Solutions", icon: Car, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/blanch-automotive", category: "technology" },
  { id: "blanch-energy", name: "Blanch Energy", description: "Energy Solutions", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/blanch-energy", category: "technology" },
  { id: "shield-energy", name: "S.H.I.E.L.D. AI Energy", description: "Energy Solutions", icon: Zap, color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20", link: "/command-center", category: "technology" },
  { id: "shield-hologram-os", name: "S.H.I.E.L.D. AI Hologram & OS", description: "Cross Platform Systems", icon: Box, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/command-center", category: "technology" },
  { id: "shield-build", name: "S.H.I.E.L.D. AI Build Interfaces", description: "Hologram, OS, Software & Cloud", icon: MonitorSmartphone, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/command-center", category: "technology" },

  // ==================== TOOLS ====================
  { id: "file-system", name: "Universal File System Manager", description: "Cross Platform File Management", icon: FolderOpen, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/universal-file-system", category: "tools" },
  { id: "shield-tools", name: "S.H.I.E.L.D. AI Tools & Modules", description: "All Tools", icon: Wrench, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "tools" },
  { id: "blanch-web-app", name: "Blanch Web/App Development", description: "AI Powered Cross Platform", icon: Code2, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/web-app-building", category: "tools" },
  { id: "shield-web-app", name: "S.H.I.E.L.D. AI Web/App Development", description: "AI Powered Cross Platform", icon: Code2, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/web-app-building", category: "tools" },
  { id: "blanch-drive", name: "Blanch Drive", description: "Enterprise Storage", icon: HardDrive, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20", link: "/blanch-drive", category: "tools" },
  { id: "shield-drive", name: "S.H.I.E.L.D. AI Drive", description: "Cloud Storage", icon: HardDrive, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/shield-ai-drive", category: "tools" },
  { id: "blanch-settings", name: "Blanch Settings", description: "System Configuration", icon: Settings, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/shield-ai-settings", category: "tools" },
  { id: "shield-settings", name: "S.H.I.E.L.D. AI Settings", description: "System Settings", icon: Settings, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/shield-ai-settings", category: "tools" },
  { id: "shield-user-settings", name: "S.H.I.E.L.D. AI User Settings", description: "User Preferences", icon: Settings, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "tools" },
  { id: "blanch-user-settings", name: "Blanch User Settings", description: "User Preferences", icon: Settings, color: "text-slate-400", gradient: "from-slate-500/20 to-gray-500/20", link: "/command-center", category: "tools" },
  { id: "blanch-user-mgr", name: "Blanch User Manager", description: "User Administration", icon: Users, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/admin", category: "tools" },

  // ==================== VIRTUAL ====================
  { id: "blanch-metaverse", name: "Blanch Metaverse", description: "Virtual Reality", icon: Boxes, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/metaverse", category: "virtual" },
  { id: "shield-metaverse", name: "S.H.I.E.L.D. AI Metaverse", description: "Virtual Reality", icon: Boxes, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/metaverse", category: "virtual" },
  { id: "blanch-gaming", name: "Blanch Gaming & Prizes", description: "Gaming & Rewards", icon: Gamepad2, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "virtual" },
  { id: "blanch-gaming-dev", name: "Blanch Gaming Development", description: "Game Development Studio", icon: Gamepad2, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "virtual" },
  { id: "shield-gaming", name: "S.H.I.E.L.D. AI Gaming & Prizes", description: "Gaming Platform", icon: Gamepad2, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/command-center", category: "virtual" },
  { id: "shield-gaming-dev", name: "S.H.I.E.L.D. AI Gaming Development", description: "Game Development", icon: Gamepad2, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/command-center", category: "virtual" }];


  const categories = [
  { id: "all", name: "All", icon: Grid },
  { id: "ai", name: "AI", icon: Brain },
  { id: "analytics", name: "Analytics", icon: LineChart },
  { id: "blanch", name: "Blanch Brand", icon: Crown },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "cloud", name: "Cloud", icon: Cloud },
  { id: "compliance", name: "Compliance", icon: FileCheck },
  { id: "core", name: "Core", icon: Cpu },
  { id: "data", name: "Data", icon: Database },
  { id: "finance", name: "Finance", icon: Banknote },
  { id: "identity", name: "Identity", icon: BadgeCheck },
  { id: "integrations", name: "Integrations", icon: Link2 },
  { id: "knowledge", name: "Knowledge", icon: BookOpen },
  { id: "marketing", name: "Marketing", icon: Megaphone },
  { id: "media", name: "Media", icon: Film },
  { id: "network", name: "Network", icon: Network },
  { id: "philanthropy", name: "Philanthropy", icon: Heart },
  { id: "programs", name: "Programs", icon: GraduationCap },
  { id: "projects", name: "Projects", icon: Layers },
  { id: "shield", name: "S.H.I.E.L.D. AI", icon: Shield },
  { id: "support", name: "Support", icon: HelpCircle },
  { id: "technology", name: "Technology", icon: Cpu },
  { id: "tools", name: "Tools", icon: Wrench },
  { id: "virtual", name: "Virtual", icon: Boxes }];


  const filteredActions = quickActions.filter((action) => {
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
            className="text-center mb-12">
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              S.H.I.E.L.D. AI Command Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              S.H.I.E.L.D. AI OS & S.H.I.E.L.D. AI OS Cloud — Access all platform features, tools, and services from one unified command center 
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8">
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-border/50" />
                
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) =>
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2">
                
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Action Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            
            <AnimatePresence mode="popLayout">
              {filteredActions.map((action, index) =>
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.01, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActionClick(action)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                className="relative flex flex-col items-center p-4 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                
                  <motion.div
                  className={`relative p-4 rounded-2xl bg-gradient-to-br ${action.gradient} mb-3`}
                  animate={{
                    rotateY: hoveredAction === action.id ? 10 : 0,
                    rotateX: hoveredAction === action.id ? -10 : 0
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}>
                  
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                    <div className="relative">
                      <action.icon className={`w-8 h-8 ${action.color} relative z-10`} />
                      <div className={`absolute inset-0 ${action.color} blur-md opacity-30`} />
                    </div>
                  </motion.div>

                  <span className="text-xs font-medium text-foreground text-center leading-tight">
                    {action.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2">
                    {action.description}
                  </span>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3 h-3 text-primary" />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {filteredActions.length === 0 &&
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No commands found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          }

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12">
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-card/30 border border-border/20 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground text-sm">S.H.I.E.L.D. AI OS — All Systems Operational</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {quickActions.length} Commands Available
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      
    </div>);

};

export default CommandCenterPage;