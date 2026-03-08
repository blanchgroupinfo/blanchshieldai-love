import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { agents, agentCategories, generateHIIAgentNumber } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bot, Search, Activity, CheckCircle2, XCircle, Clock,
  Zap, BarChart3, Shield, RefreshCw, Trash2, Eye,
  MessageSquare, ArrowUpRight, Power
} from "lucide-react";
import { toast } from "sonner";

export interface DeployedAgent {
  agentId: string;
  activatedAt: string;
  status: "active" | "idle" | "error";
  tasksCompleted: number;
  uptime: number; // percentage
}

export const getDeployedAgents = (): DeployedAgent[] => {
  try {
    const stored = localStorage.getItem("shield-deployed-agents");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const deployAgent = (agentId: string): DeployedAgent[] => {
  const current = getDeployedAgents();
  if (current.find(a => a.agentId === agentId)) return current;
  const newAgent: DeployedAgent = {
    agentId,
    activatedAt: new Date().toISOString(),
    status: "active",
    tasksCompleted: Math.floor(Math.random() * 50),
    uptime: 95 + Math.random() * 5,
  };
  const updated = [...current, newAgent];
  localStorage.setItem("shield-deployed-agents", JSON.stringify(updated));
  return updated;
};

export const removeDeployedAgent = (agentId: string): DeployedAgent[] => {
  const current = getDeployedAgents().filter(a => a.agentId !== agentId);
  localStorage.setItem("shield-deployed-agents", JSON.stringify(current));
  return current;
};

const statusConfig = {
  active: { color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", icon: CheckCircle2, label: "Active" },
  idle: { color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Clock, label: "Idle" },
  error: { color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", icon: XCircle, label: "Error" },
};

const DeployedAgentsDashboard = () => {
  const [deployed, setDeployed] = useState<DeployedAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    setDeployed(getDeployedAgents());
  }, []);

  const enrichedAgents = deployed.map(d => ({
    ...d,
    agent: agents.find(a => a.id === d.agentId),
    category: agentCategories.find(c => c.number === agents.find(a => a.id === d.agentId)?.categoryNumber),
  })).filter(d => d.agent);

  const filtered = enrichedAgents.filter(d => {
    const matchesSearch = d.agent!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      generateHIIAgentNumber(d.agentId).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || d.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: deployed.length,
    active: deployed.filter(d => d.status === "active").length,
    idle: deployed.filter(d => d.status === "idle").length,
    error: deployed.filter(d => d.status === "error").length,
    avgUptime: deployed.length > 0 ? (deployed.reduce((sum, d) => sum + d.uptime, 0) / deployed.length).toFixed(1) : "0",
    totalTasks: deployed.reduce((sum, d) => sum + d.tasksCompleted, 0),
  };

  const handleDeactivate = (agentId: string, agentName: string) => {
    const updated = removeDeployedAgent(agentId);
    setDeployed(updated);
    toast.info(`${generateHIIAgentNumber(agentId)} — ${agentName} deactivated`, {
      description: "Agent has been removed from active deployment.",
    });
  };

  const handleRefreshStatus = () => {
    const updated = deployed.map(d => ({
      ...d,
      status: (Math.random() > 0.15 ? "active" : Math.random() > 0.5 ? "idle" : "error") as DeployedAgent["status"],
      tasksCompleted: d.tasksCompleted + Math.floor(Math.random() * 5),
      uptime: Math.min(100, d.uptime + (Math.random() - 0.3)),
    }));
    localStorage.setItem("shield-deployed-agents", JSON.stringify(updated));
    setDeployed(updated);
    toast.success("Agent statuses refreshed");
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
                <Activity className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Deployed Agents Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor and manage all activated H.I.I. AI Agents in real-time
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          >
            {[
              { label: "Total Deployed", value: stats.total, icon: Bot, color: "text-primary" },
              { label: "Active", value: stats.active, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Idle", value: stats.idle, icon: Clock, color: "text-amber-400" },
              { label: "Errors", value: stats.error, icon: XCircle, color: "text-red-400" },
              { label: "Avg Uptime", value: `${stats.avgUptime}%`, icon: BarChart3, color: "text-cyan-400" },
              { label: "Tasks Done", value: stats.totalTasks, icon: Zap, color: "text-violet-400" },
            ].map((stat, i) => (
              <Card key={stat.label} className="bg-card/50 border-border/50">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
          >
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search deployed agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "active", "idle", "error"].map(status => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={handleRefreshStatus} className="gap-2">
                <RefreshCw className="w-4 h-4" /> Refresh
              </Button>
              <Button variant="shield" size="sm" onClick={() => navigate("/agents")} className="gap-2">
                <Bot className="w-4 h-4" /> Deploy More
              </Button>
            </div>
          </motion.div>

          {/* Agent List */}
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {deployed.length === 0 ? "No Agents Deployed" : "No Matching Agents"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {deployed.length === 0
                  ? "Activate agents from the Agents registry to see them here."
                  : "Try adjusting your search or filter criteria."}
              </p>
              {deployed.length === 0 && (
                <Button variant="shield" onClick={() => navigate("/agents")} className="gap-2">
                  <Bot className="w-4 h-4" /> Browse 888 H.I.I. AI Agents
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => {
                  const sc = statusConfig[item.status];
                  const agentNum = generateHIIAgentNumber(item.agentId);
                  const timeSince = getTimeSince(item.activatedAt);

                  return (
                    <motion.div
                      key={item.agentId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Agent Info */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                                <Bot className="w-6 h-6 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-mono text-primary/70">{agentNum}</span>
                                  <Badge className={`${sc.bg} ${sc.color} ${sc.border} text-xs`}>
                                    <sc.icon className="w-3 h-3 mr-1" />
                                    {sc.label}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-foreground truncate">{item.agent!.name}</h3>
                                <p className="text-xs text-muted-foreground">{item.category?.name} • Deployed {timeSince}</p>
                              </div>
                            </div>

                            {/* Metrics */}
                            <div className="flex items-center gap-6 text-sm">
                              <div className="text-center hidden sm:block">
                                <p className="text-muted-foreground text-xs">Tasks</p>
                                <p className="font-semibold text-foreground">{item.tasksCompleted}</p>
                              </div>
                              <div className="text-center hidden sm:block">
                                <p className="text-muted-foreground text-xs">Uptime</p>
                                <p className={`font-semibold ${item.uptime > 98 ? 'text-emerald-400' : item.uptime > 90 ? 'text-amber-400' : 'text-red-400'}`}>
                                  {item.uptime.toFixed(1)}%
                                </p>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => navigate(`/agents/${item.agentId}`)} title="View Agent">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => navigate("/shield-ai-chat")} title="Ask Agent">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeactivate(item.agentId, item.agent!.name)}
                                  title="Deactivate"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Power className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
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
                <span className="text-muted-foreground text-sm">S.H.I.E.L.D. AI Agent Deployment System — Online</span>
              </div>
              <span className="text-xs text-muted-foreground">{deployed.length} / 888 Deployed</span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

function getTimeSince(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default DeployedAgentsDashboard;
