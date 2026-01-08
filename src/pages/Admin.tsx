import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import {
  Shield,
  Users,
  Mail,
  MessageSquare,
  Database,
  BarChart3,
  Settings,
  BookOpen,
  Globe,
  Cpu,
  Lock,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Layers,
  Wallet,
  Server,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface SystemModule {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "syncing" | "maintenance";
  lastSync: string;
  color: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAgents: 500,
    activeUsers: 0,
    newsletterSubs: 0,
    contactMessages: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await fetchStats();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Fetch newsletter subscriptions count
      const { count: newsletterCount } = await supabase
        .from("newsletter_subscriptions")
        .select("*", { count: "exact", head: true });

      // Fetch contact submissions count
      const { count: contactCount } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true });

      // Fetch profiles count
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setStats({
        totalAgents: 500,
        activeUsers: userCount || 0,
        newsletterSubs: newsletterCount || 0,
        contactMessages: contactCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const systemModules: SystemModule[] = [
    {
      id: "agents",
      name: "H.I.I. AI Agent Network",
      description: "500+ Universal Unified AI Agents",
      icon: Cpu,
      status: "active",
      lastSync: "Real-time",
      color: "text-blue-400",
    },
    {
      id: "ledger",
      name: "AI-Ledger System",
      description: "DAG/DLT Settlement & RTGS",
      icon: Database,
      status: "active",
      lastSync: "Real-time",
      color: "text-green-400",
    },
    {
      id: "knowledge",
      name: "AI-Knowledge Engine",
      description: "Scriptural & Historical Truth",
      icon: BookOpen,
      status: "active",
      lastSync: "Auto-synced",
      color: "text-amber-400",
    },
    {
      id: "identity",
      name: "AI-Identity System",
      description: "Avatar, Hologram & Metaverse",
      icon: Users,
      status: "active",
      lastSync: "Real-time",
      color: "text-purple-400",
    },
    {
      id: "governance",
      name: "AI-Governance Module",
      description: "Policy, Ethics & Compliance",
      icon: Shield,
      status: "active",
      lastSync: "Auto-synced",
      color: "text-cyan-400",
    },
    {
      id: "economy",
      name: "AI-Economy Engine",
      description: "Tokens, Markets & Smart Trade",
      icon: Wallet,
      status: "active",
      lastSync: "Real-time",
      color: "text-emerald-400",
    },
    {
      id: "network",
      name: "Blanch Corridor Network",
      description: "Global Smart City Infrastructure",
      icon: Globe,
      status: "active",
      lastSync: "Auto-synced",
      color: "text-indigo-400",
    },
    {
      id: "security",
      name: "Security & Protection",
      description: "End-to-end Encryption",
      icon: Lock,
      status: "active",
      lastSync: "Real-time",
      color: "text-red-400",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case "syncing":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Syncing</Badge>;
      case "maintenance":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Maintenance</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Shield className="w-12 h-12 text-primary animate-pulse" />
          <span className="text-muted-foreground">Loading Administration Center...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                  Administration Center
                </h1>
                <p className="text-muted-foreground">
                  S.H.I.E.L.D. AI Backend System Overview
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalAgents}+</p>
                    <p className="text-xs text-muted-foreground">H.I.I. AI Agents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.activeUsers}</p>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-green-500/20">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.newsletterSubs}</p>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.contactMessages}</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-card/50 border border-border/30">
              <TabsTrigger value="overview">System Overview</TabsTrigger>
              <TabsTrigger value="modules">Core Modules</TabsTrigger>
              <TabsTrigger value="sync">Auto-Sync Status</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all duration-300 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10`}>
                              <module.icon className={`w-6 h-6 ${module.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{module.name}</CardTitle>
                              <CardDescription>{module.description}</CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(module.status)}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {module.lastSync}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modules">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    BLANCH S.H.I.E.L.D. AI Core Modules
                  </CardTitle>
                  <CardDescription>
                    All modules are automatically synced with the Knowledge Base and agent network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold mb-2">AI-Agents</h4>
                      <p className="text-sm text-muted-foreground">
                        Custom, Clone, Twin, Trustee, Affiliate, Payment Agents - All with H.I.I. AI Universal Unified Numbers
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold mb-2">AI-Ledger</h4>
                      <p className="text-sm text-muted-foreground">
                        DAG/DLT Settlement, RTGS, 15B+ TPS scaling with zero transaction fees
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="font-semibold mb-2">AI-Governance</h4>
                      <p className="text-sm text-muted-foreground">
                        Policy, Ethics, Audit, Compliance - Aligned with Divine Law
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <h4 className="font-semibold mb-2">AI-Knowledge</h4>
                      <p className="text-sm text-muted-foreground">
                        Scriptural, Historical, and Truth Engines - Connected to foundational scriptures
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                      <h4 className="font-semibold mb-2">AI-Economy</h4>
                      <p className="text-sm text-muted-foreground">
                        Tokens, Markets, Funding, Smart Trade - Unlimited use, no credit system
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                      <h4 className="font-semibold mb-2">AI-Identity</h4>
                      <p className="text-sm text-muted-foreground">
                        Avatar, Hologram, Metaverse Presence - Digital identity management
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sync">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    Auto-Sync Status
                  </CardTitle>
                  <CardDescription>
                    All systems automatically sync in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Knowledge Base", synced: true },
                      { name: "Agent Registry", synced: true },
                      { name: "Pages & Sections", synced: true },
                      { name: "Newsletter System", synced: true },
                      { name: "User Profiles", synced: true },
                      { name: "Chat History", synced: true },
                      { name: "H.I.I. AI Numbers", synced: true },
                    ].map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-card/30 border border-border/20"
                      >
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          {item.synced ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-400">Synced</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-400" />
                              <span className="text-sm text-amber-400">Pending</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
