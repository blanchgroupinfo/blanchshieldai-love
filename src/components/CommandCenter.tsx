import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Database,
  Mail,
  Shield,
  Settings,
  BarChart3,
  MessageSquare,
  BookOpen,
  Globe,
  Cpu,
  Wallet,
  Lock,
  ChevronRight,
  X,
  Sparkles,
  Code2,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    {
      id: "dashboard",
      name: "Dashboard",
      description: "User Control Panel",
      icon: BarChart3,
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-green-500/20",
      link: "/dashboard",
    },
    {
      id: "admin",
      name: "Admin Panel",
      description: "System Administration",
      icon: Shield,
      color: "text-red-400",
      gradient: "from-red-500/20 to-orange-500/20",
      link: "/admin",
    },
    {
      id: "agents",
      name: "AI Agents",
      description: "500+ H.I.I. AI Unified Agents",
      icon: Cpu,
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
      link: "/agents",
    },
    {
      id: "chat",
      name: "S.H.I.E.L.D. Chat",
      description: "AI Assistant Interface",
      icon: MessageSquare,
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      link: "/#chat",
    },
    {
      id: "knowledge",
      name: "Knowledge Base",
      description: "Scriptural & Tech Wisdom",
      icon: BookOpen,
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-orange-500/20",
      link: "/knowledge-base",
    },
    {
      id: "database",
      name: "Data Systems",
      description: "DLT/DAG Infrastructure",
      icon: Database,
      color: "text-green-400",
      gradient: "from-green-500/20 to-emerald-500/20",
      link: "/technology",
    },
    {
      id: "security",
      name: "Security",
      description: "Protection Systems",
      icon: Lock,
      color: "text-rose-400",
      gradient: "from-rose-500/20 to-red-500/20",
      link: "/technology",
    },
    {
      id: "network",
      name: "Global Network",
      description: "Blanch Corridor",
      icon: Globe,
      color: "text-indigo-400",
      gradient: "from-indigo-500/20 to-violet-500/20",
      link: "/about",
    },
    {
      id: "finance",
      name: "Finance",
      description: "Digital Banking",
      icon: Wallet,
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-teal-500/20",
      link: "/technology",
    },
    {
      id: "users",
      name: "Users",
      description: "Community Management",
      icon: Users,
      color: "text-pink-400",
      gradient: "from-pink-500/20 to-rose-500/20",
      link: "/dashboard",
    },
    {
      id: "newsletter",
      name: "Newsletter",
      description: "Subscriber Management",
      icon: Mail,
      color: "text-orange-400",
      gradient: "from-orange-500/20 to-yellow-500/20",
      link: "/admin",
    },
    {
      id: "settings",
      name: "Settings",
      description: "System Configuration",
      icon: Settings,
      color: "text-slate-400",
      gradient: "from-slate-500/20 to-gray-500/20",
      link: "/dashboard",
    },
    {
      id: "web-app-build",
      name: "Web/App Build",
      description: "S.H.I.E.L.D. AI Development",
      icon: Code2,
      color: "text-violet-400",
      gradient: "from-violet-500/20 to-purple-500/20",
      link: "/technology",
    },
    {
      id: "autocad",
      name: "AutoCAD",
      description: "S.H.I.E.L.D. AI Design",
      icon: PenTool,
      color: "text-teal-400",
      gradient: "from-teal-500/20 to-cyan-500/20",
      link: "/technology",
    },
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
      <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="gradient-text font-display">S.H.I.E.L.D. Command Center</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Quick Action Grid - macOS Style */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
            <AnimatePresence>
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
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
                  <span className="text-xs text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {action.description}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Full Command Center Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 px-4"
          >
            <Button
              variant="shield"
              className="w-full py-6 text-lg gap-3"
              onClick={() => {
                setIsOpen(false);
                navigate("/admin");
              }}
            >
              <Shield className="w-5 h-5" />
              Full Command Center Overview
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* System Status */}
          <div className="mt-6 px-4 pb-2">
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
