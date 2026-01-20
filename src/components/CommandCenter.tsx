import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, Database, Mail, Shield, Settings, BarChart3, MessageSquare, BookOpen,
  Globe, Cpu, Wallet, Lock, ChevronRight, Sparkles, Code2, PenTool, Boxes,
  Search, Eye, Calendar, ScrollText, Heart, Blocks, ArrowLeftRight, Network,
  TrendingUp, Building2, ShoppingBag, Scale, Utensils, FileCheck, Brain,
  Rocket, Home, CreditCard, History, Megaphone, LineChart, Users2, Landmark,
  Cloud, HardDrive, Mail as MailIcon, Zap, Server, Box, Video, Headphones,
  UserCheck, ClipboardCheck, Layers, Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@supabase/supabase-js";

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  link?: string;
  action?: () => void;
}

const CommandCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
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
    { id: "dashboard", name: "Dashboard", description: "User Control Panel", icon: BarChart3, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/dashboard" },
    { id: "admin", name: "Admin Panel", description: "System Administration", icon: Shield, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/admin" },
    { id: "agents", name: "AI Agents", description: "500+ H.I.I. AI Unified Agents", icon: Cpu, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/agents" },
    { id: "trading", name: "Trading Finance Hub", description: "S.H.I.E.L.D. AI Trading", icon: TrendingUp, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/trading" },
    { id: "knowledge", name: "Knowledge Base", description: "Scriptural & Tech Wisdom", icon: BookOpen, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/knowledge-base" },
    { id: "universal-network", name: "Universal Business Networks", description: "Global B2B Network", icon: Globe, color: "text-indigo-400", gradient: "from-indigo-500/20 to-violet-500/20", link: "/business-network" },
    { id: "marketplace", name: "Virtual Marketplace", description: "Enterprise Commerce", icon: ShoppingBag, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/marketplace" },
    { id: "metaverse", name: "Metaverse", description: "Virtual Reality Worlds", icon: Boxes, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/metaverse" },
    { id: "explorer", name: "S.H.I.E.L.D. AI Explorer", description: "Blockchain Explorer", icon: Search, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/explorer" },
    { id: "oracle", name: "Blanch Oracle", description: "Decentralized Oracle", icon: Eye, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/oracle" },
    { id: "calendar", name: "Creators Calendar", description: "Holy Days & Sabbath", icon: Calendar, color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", link: "/creators-calendar" },
    { id: "laws", name: "Laws & Commandments", description: "Divine Instructions", icon: ScrollText, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/laws-commandments" },
    { id: "philanthropy", name: "Philanthropy Hub", description: "Blanch Foundation", icon: Heart, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/philanthropy" },
    { id: "dlt", name: "DLT Technologies", description: "No Fees, No Mining", icon: Blocks, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/distributed-ledger" },
    { id: "cross-border", name: "Cross Border Settlements", description: "Global Payments", icon: ArrowLeftRight, color: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", link: "/cross-border" },
    { id: "corridor", name: "Blanch Corridor", description: "Global Network", icon: Network, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20", link: "/blanch-corridor" },
    { id: "compliance", name: "Compliance & KYC", description: "Regulatory Compliance", icon: FileCheck, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/compliance-kyc" },
    { id: "llm", name: "S.H.I.E.L.D. AI LLM", description: "Large Language Model", icon: Brain, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/shield-llm" },
    { id: "ventures", name: "H.E.E.D. Ventures", description: "Submit Your Ventures", icon: Rocket, color: "text-orange-400", gradient: "from-orange-500/20 to-red-500/20", link: "/heed-ventures" },
    { id: "food-replicator", name: "Food Replicator", description: "Blanch Food Tech", icon: Utensils, color: "text-green-400", gradient: "from-green-500/20 to-lime-500/20", link: "/food-replicator" },
    { id: "sovereign-court", name: "Sovereign Court", description: "Validation System", icon: Scale, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/sovereign-court" },
    { id: "international-law", name: "International Law", description: "Legal Framework", icon: Scale, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/international-law" },
    { id: "watchman", name: "H.I.I. Project Watchman", description: "AI Surveillance", icon: Eye, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/watchman" },
    { id: "deposit", name: "Deposit", description: "Fund Your Account", icon: CreditCard, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/dashboard" },
    { id: "withdraw", name: "Withdraw", description: "Withdraw Funds", icon: Wallet, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/dashboard" },
    { id: "order-history", name: "Order History", description: "Transaction Records", icon: History, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/dashboard" },
    { id: "advertising", name: "Advertising Hub", description: "Marketing Platform", icon: Megaphone, color: "text-orange-400", gradient: "from-orange-500/20 to-yellow-500/20", link: "/admin" },
    { id: "analytics", name: "Analytics", description: "Data Insights", icon: LineChart, color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20", link: "/admin" },
    { id: "affiliates", name: "Affiliate Programs", description: "Circle Agent ID", icon: Users2, color: "text-pink-400", gradient: "from-pink-500/20 to-rose-500/20", link: "/admin" },
    { id: "banking", name: "S.H.I.E.L.D. Banking", description: "Digital Banking", icon: Landmark, color: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", link: "/trading" },
    { id: "crm-erp", name: "CRM & ERP", description: "Business Management", icon: Building2, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/admin" },
    { id: "drive", name: "S.H.I.E.L.D. Drive", description: "Cloud Storage", icon: HardDrive, color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", link: "/dashboard" },
    { id: "cloud", name: "S.H.I.E.L.D. Cloud", description: "Cloud Infrastructure", icon: Cloud, color: "text-sky-400", gradient: "from-sky-500/20 to-blue-500/20", link: "/technology" },
    { id: "email", name: "S.H.I.E.L.D. Email", description: "Secure Email", icon: MailIcon, color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20", link: "/dashboard" },
    { id: "hosting", name: "Hosting", description: "Web Hosting", icon: Server, color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20", link: "/technology" },
    { id: "domains", name: "Domains", description: "Domain Management", icon: Globe, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20", link: "/technology" },
    { id: "studios", name: "S.H.I.E.L.D. Studios", description: "Media Production", icon: Video, color: "text-red-400", gradient: "from-red-500/20 to-pink-500/20", link: "/technology" },
    { id: "conference", name: "Virtual Conference", description: "Video Meetings", icon: Headphones, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20", link: "/technology" },
    { id: "concierge", name: "Concierge", description: "Personal Assistant", icon: UserCheck, color: "text-amber-400", gradient: "from-amber-500/20 to-yellow-500/20", link: "/dashboard" },
    { id: "projects", name: "Projects", description: "Create & Manage", icon: Layers, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/admin" },
    { id: "api", name: "API & Integrations", description: "Developer Tools", icon: Link2, color: "text-green-400", gradient: "from-green-500/20 to-teal-500/20", link: "/api" },
    { id: "web-app-build", name: "Web/App Build", description: "S.H.I.E.L.D. AI Development", icon: Code2, color: "text-violet-400", gradient: "from-violet-500/20 to-purple-500/20", link: "/technology" },
    { id: "autocad", name: "AutoCAD", description: "S.H.I.E.L.D. AI Design", icon: PenTool, color: "text-teal-400", gradient: "from-teal-500/20 to-cyan-500/20", link: "/technology" },
  ];

  const handleActionClick = (action: QuickAction) => {
    if (action.action) {
      action.action();
    } else if (action.link) {
      setIsOpen(false);
      navigate(action.link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex gap-2 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary"
        >
          <Sparkles className="w-4 h-4" />
          Command Center
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="gradient-text font-display">S.H.I.E.L.D. Command Center</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Horizontal Scrollable Quick Actions */}
          <ScrollArea className="w-full">
            <div className="flex gap-4 p-4 min-w-max">
              <AnimatePresence>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.02, type: "spring", stiffness: 300 }}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -5,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleActionClick(action)}
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                    className="relative flex flex-col items-center p-4 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300 group cursor-pointer min-w-[100px]"
                  >
                    {/* 3D Icon Container */}
                    <motion.div
                      className={`relative p-3 rounded-2xl bg-gradient-to-br ${action.gradient} mb-2`}
                      animate={{
                        rotateY: hoveredAction === action.id ? 12 : 0,
                        rotateX: hoveredAction === action.id ? -12 : 0,
                      }}
                      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                      
                      {/* Icon with 3D shadow */}
                      <div className="relative">
                        <action.icon className={`w-7 h-7 ${action.color} relative z-10`} />
                        <div className={`absolute inset-0 ${action.color} blur-md opacity-30`} />
                      </div>
                    </motion.div>

                    {/* Label */}
                    <span className="text-xs font-medium text-foreground text-center leading-tight whitespace-nowrap">
                      {action.name}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Full Command Center Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 px-4"
          >
            <Button
              variant="shield"
              className="w-full py-5 text-lg gap-3"
              onClick={() => {
                setIsOpen(false);
                navigate("/command-center");
              }}
            >
              <Shield className="w-5 h-5" />
              Full Command Center
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* System Status */}
          <div className="mt-4 px-4 pb-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-card/30 border border-border/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">All Systems Operational</span>
              </div>
              <span className="text-xs text-muted-foreground">
                H.I.I. AI Network Active
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandCenter;
