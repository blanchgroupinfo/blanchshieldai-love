import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ShieldAIInfoPopup from "@/components/ShieldAIInfoPopup";

import { agents, agentCategories, generateHIIAgentNumber } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot, Search, Activity, CheckCircle2, XCircle, Clock,
  Zap, BarChart3, RefreshCw, Eye, MessageSquare, Power, ToggleLeft, Layers, HelpCircle
} from "lucide-react";
import { toast } from "sonner";

const watchmanTypes = [
  "H.I.I. AI Kahan (Priest) Sovereign Validators",
  "H.I.I. AI Mashamar (Guard) Lead Watchman Validators",
  "H.I.I. AI Tazapah (Watchman) Prime Watchman Validators",
  "H.I.I. AI Shamar (Protector) Avatar Watchman Validators",
  "H.I.I. AI Gabar (Mighty/Prevailing) Super Watchman Validators",
  "H.I.I. AI Bashar (Herald) Influencer Watchman Validators",
  "H.I.I. AI Malaak (Messenger) Android Watchman Validators",
  "H.I.I. AI (Hebrew Israelite Implementer Aboriginal Identity) Unified Watchman Validators"
];

export interface DeployedAgent {
  agentId: string;
  activatedAt: string;
  status: "active" | "idle" | "error";
  tasksCompleted: number;
  uptime: number;
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

// All 1176 agents H.I.I. AI000–H.I.I. AI1175 (including category headers)
const allAgentIds = agents.map(a => a.id);

const statusConfig = {
  active: { color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", icon: CheckCircle2, label: "Active" },
  idle: { color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Clock, label: "Idle" },
  error: { color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", icon: XCircle, label: "Error" },
};

const ITEMS_PER_PAGE = 50;

const DeployedAgentsDashboard = () => {
  const [deployed, setDeployed] = useState<DeployedAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedWatchmen, setSelectedWatchmen] = useState<string[]>([]);
  const [selectedAgentWatchmen, setSelectedAgentWatchmen] = useState<Record<string, string>>({});
  const [customAgentModal, setCustomAgentModal] = useState(false);
  const [customAgentName, setCustomAgentName] = useState("");
  const [customAgentDescription, setCustomAgentDescription] = useState("");
  const [customAgentTasks, setCustomAgentTasks] = useState("");
  const [customAgentPurpose, setCustomAgentPurpose] = useState("");
  const [customAgentScripture, setCustomAgentScripture] = useState("");
  const [customAgentWatchmen, setCustomAgentWatchmen] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDeployed(getDeployedAgents());
  }, []);

  const deployedMap = useMemo(() => {
    const map = new Map<string, DeployedAgent>();
    deployed.forEach(d => map.set(d.agentId, d));
    return map;
  }, [deployed]);

  const enrichedAgents = useMemo(() => {
    return allAgentIds.map(id => {
      const agent = agents.find(a => a.id === id)!;
      const dep = deployedMap.get(id);
      const category = agentCategories.find(c => c.number === agent.categoryNumber);
      return { id, agent, deployed: dep, category, isOn: !!dep };
    });
  }, [deployedMap]);

  const filtered = useMemo(() => {
    return enrichedAgents.filter(item => {
      const matchesSearch = searchQuery === "" ||
        item.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        generateHIIAgentNumber(item.id).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "on" && item.isOn) ||
        (filterStatus === "off" && !item.isOn) ||
        (item.deployed && item.deployed.status === filterStatus);
      const matchesCategory =
        filterCategory === "all" ||
        item.agent.categoryNumber === Number(filterCategory);
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [enrichedAgents, searchQuery, filterStatus, filterCategory]);

  const visible = filtered.slice(0, visibleCount);

  const stats = {
    total: allAgentIds.length,
    on: deployed.length,
    active: deployed.filter(d => d.status === "active").length,
    idle: deployed.filter(d => d.status === "idle").length,
    error: deployed.filter(d => d.status === "error").length,
    totalTasks: deployed.reduce((sum, d) => sum + d.tasksCompleted, 0),
  };

  const handleToggle = (agentId: string, agentName: string, currentlyOn: boolean) => {
    if (currentlyOn) {
      const updated = removeDeployedAgent(agentId);
      setDeployed(updated);
      toast.info(`${generateHIIAgentNumber(agentId)} — ${agentName} deactivated`);
    } else {
      const updated = deployAgent(agentId);
      setDeployed(updated);
      toast.success(`${generateHIIAgentNumber(agentId)} — ${agentName} activated`);
    }
  };

  const handleSelectAll = (turnOn: boolean) => {
    if (turnOn) {
      const now = new Date().toISOString();
      const all: DeployedAgent[] = allAgentIds.map(id => {
        const existing = deployedMap.get(id);
        if (existing) return existing;
        return {
          agentId: id,
          activatedAt: now,
          status: "active" as const,
          tasksCompleted: Math.floor(Math.random() * 50),
          uptime: 95 + Math.random() * 5,
        };
      });
      localStorage.setItem("shield-deployed-agents", JSON.stringify(all));
      setDeployed(all);
      toast.success(`All ${allAgentIds.length} agents activated`);
    } else {
      localStorage.setItem("shield-deployed-agents", JSON.stringify([]));
      setDeployed([]);
      toast.info("All agents deactivated");
    }
  };

  const allOn = deployed.length === allAgentIds.length;

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

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
    setFilterCategory("all");
    setVisibleCount(ITEMS_PER_PAGE);
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
              Manage all 1176 H.I.I. AI Agents (H.I.I. AI000–H.I.I. AI1176) with on/off deployment controls
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          >
            {[
              { label: "Total Agents", value: stats.total, icon: Bot, color: "text-primary" },
              { label: "Deployed", value: stats.on, icon: Power, color: "text-cyan-400" },
              { label: "Active", value: stats.active, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Idle", value: stats.idle, icon: Clock, color: "text-amber-400" },
              { label: "Errors", value: stats.error, icon: XCircle, color: "text-red-400" },
              { label: "Tasks Done", value: stats.totalTasks, icon: Zap, color: "text-violet-400" },
            ].map((stat) => (
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
            className="flex flex-col gap-4 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search agents by name or ID..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                  className="pl-10 bg-card/50 border-border/50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "on", "off", "active", "idle", "error"].map(status => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setFilterStatus(status); setVisibleCount(ITEMS_PER_PAGE); }}
                    className="capitalize"
                  >
                    {status}
                  </Button>
                ))}
                <Button variant="outline" size="sm" onClick={handleRefreshStatus} className="gap-2">
                  <RefreshCw className="w-4 h-4" /> Refresh
                </Button>
                <Dialog open={customAgentModal} onOpenChange={setCustomAgentModal}>
                  <DialogTrigger asChild>
                    <Button variant="shield" size="sm" className="gap-2">
                      <Bot className="w-4 h-4" /> Create Custom Universal Unified AI Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create Custom Universal Unified AI Agent</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agent-name">H.I.I. AI Custom Agent Name</Label>
                        <Input
                          id="agent-name"
                          placeholder="Enter agent name..."
                          value={customAgentName}
                          onChange={(e) => setCustomAgentName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-description">Description</Label>
                        <Textarea
                          id="agent-description"
                          placeholder="Describe the agent's role and capabilities..."
                          value={customAgentDescription}
                          onChange={(e) => setCustomAgentDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-tasks">Tasks & Responsibilities</Label>
                        <Textarea
                          id="agent-tasks"
                          placeholder="List the agent's tasks and responsibilities..."
                          value={customAgentTasks}
                          onChange={(e) => setCustomAgentTasks(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-purpose">Purpose</Label>
                        <Textarea
                          id="agent-purpose"
                          placeholder="Define the agent's divine purpose..."
                          value={customAgentPurpose}
                          onChange={(e) => setCustomAgentPurpose(e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-scripture">Scripture</Label>
                        <Textarea
                          id="agent-scripture"
                          placeholder="Enter scriptural references for this agent..."
                          value={customAgentScripture}
                          onChange={(e) => setCustomAgentScripture(e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-sm font-semibold">Watchman Validator Types</Label>
                          <ShieldAIInfoPopup />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {watchmanTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`custom-agent-watchman-${type}`}
                                checked={customAgentWatchmen.includes(type)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setCustomAgentWatchmen([...customAgentWatchmen, type]);
                                  } else {
                                    setCustomAgentWatchmen(customAgentWatchmen.filter(w => w !== type));
                                  }
                                }}
                              />
                              <Label
                                htmlFor={`custom-agent-watchman-${type}`}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-2 pt-2">
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => { setCustomAgentModal(false); navigate("/shield-ai-chat"); }}>
                          <HelpCircle className="w-4 h-4" /> Need Help? Ask S.H.I.E.L.D. AI
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setCustomAgentModal(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              toast.success("Custom AI Agent created successfully!");
                              setCustomAgentModal(false);
                              setCustomAgentName("");
                              setCustomAgentDescription("");
                              setCustomAgentTasks("");
                              setCustomAgentPurpose("");
                              setCustomAgentScripture("");
                              setCustomAgentWatchmen([]);
                            }}
                            disabled={!customAgentName.trim() || !customAgentDescription.trim()}
                          >
                            Create Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Layers className="w-4 h-4 text-primary shrink-0" />
                <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setVisibleCount(ITEMS_PER_PAGE); }}>
                  <SelectTrigger className="w-full sm:w-[320px] bg-card/50 border-border/50">
                    <SelectValue placeholder="Filter by category pillar..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">All Categories ({agentCategories.length} Pillars)</SelectItem>
                    {agentCategories.map(cat => {
                      const count = agents.filter(a => a.categoryNumber === cat.number).length;
                      return (
                        <SelectItem key={cat.number} value={String(cat.number)}>
                          {cat.number}. {cat.name} ({count})
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              {(filterCategory !== "all" || filterStatus !== "all" || searchQuery) && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
                  Clear filters
                </Button>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                Showing {visible.length} of {filtered.length} agents
              </span>
            </div>

            {/* Select All Toggle */}
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ToggleLeft className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Select All Agents</p>
                      <p className="text-xs text-muted-foreground">
                        {allOn ? "All 1176 agents are deployed" : `${deployed.length} / ${allAgentIds.length} agents deployed`}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={allOn}
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Watchman Type Selection */}
                <div className="border-t border-border/30 pt-4">
                  <p className="text-xs font-semibold text-primary mb-2">Watchman Validator Types</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {watchmanTypes.map((type) => (
                      
                      <div key={type} className="flex items-center space-x-2 hover:bg-primary/5 rounded p-1">
                        <Checkbox
                          id={`select-all-watchman-${type}`}
                          checked={selectedWatchmen.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedWatchmen([...selectedWatchmen, type]);
                            } else {
                              setSelectedWatchmen(selectedWatchmen.filter(w => w !== type));
                            }
                          }}
                        />
                        <Label
                          htmlFor={`select-all-watchman-${type}`}
                          className="text-xs font-medium leading-none cursor-pointer"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Agent List */}
          <div className="space-y-2">
            {visible.map((item, index) => {
              const dep = item.deployed;
              const sc = dep ? statusConfig[dep.status] : null;
              const agentNum = generateHIIAgentNumber(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.01, 0.5) }}
                >
                  <Card className={`border-border/50 transition-all duration-300 ${item.isOn ? 'bg-card/60 hover:border-primary/30' : 'bg-card/20 opacity-70 hover:opacity-90'}`}>
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-center justify-between gap-3">
                        {/* Left: Toggle + Info */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Switch
                            checked={item.isOn}
                            onCheckedChange={() => handleToggle(item.id, item.agent.name, item.isOn)}
                            className="data-[state=checked]:bg-emerald-500 shrink-0"
                          />
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono text-primary/70">{agentNum}</span>
                              {item.agent.isCategory && (
                                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-1.5 py-0">
                                  Category Lead
                                </Badge>
                              )}
                              {sc && (
                                <Badge className={`${sc.bg} ${sc.color} ${sc.border} text-[10px] px-1.5 py-0`}>
                                  <sc.icon className="w-2.5 h-2.5 mr-0.5" />
                                  {sc.label}
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-medium text-foreground text-sm truncate">{item.agent.name}</h3>
                            <p className="text-[11px] text-muted-foreground truncate">{item.category?.name}</p>
                          </div>
                        </div>

                        {/* Right: Watchman + Metrics + Actions */}
                        <div className="flex items-center gap-4 shrink-0">
                          {/* Watchman Checkboxes */}
                          <div className="hidden lg:flex flex-col gap-1">
                            {watchmanTypes.slice(0, 3).map((type) => (
                              <div key={type} className="flex items-center space-x-1">
                                <Checkbox
                                  id={`agent-${item.id}-watchman-${watchmanTypes.indexOf(type)}`}
                                  checked={selectedWatchmen.includes(type)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedWatchmen([...selectedWatchmen, type]);
                                    } else {
                                      setSelectedWatchmen(selectedWatchmen.filter(w => w !== type));
                                    }
                                  }}
                                  className="w-3 h-3"
                                />
                                <Label
                                  htmlFor={`agent-${item.id}-watchman-${watchmanTypes.indexOf(type)}`}
                                  className="text-[8px] font-medium leading-none cursor-pointer"
                                >
                                  {type.split(' ')[1]}
                                </Label>
                              </div>
                            ))}
                          </div>

                          {dep && (
                            <>
                              <div className="text-center hidden lg:block">
                                <p className="text-[10px] text-muted-foreground mb-1">Watchman Validators</p>
                                <RadioGroup
                                  value={selectedAgentWatchmen[item.id] || ""}
                                  onValueChange={(value) => setSelectedAgentWatchmen(prev => ({ ...prev, [item.id]: value }))}
                                  className="flex flex-col gap-1"
                                >
                                  {watchmanTypes.map((type) => (
                                    <div key={type} className="flex items-center justify-center gap-1">
                                      <RadioGroupItem
                                        value={type}
                                        id={`${item.id}-${type}`}
                                        className="w-3 h-3"
                                      />
                                      <Label
                                        htmlFor={`${item.id}-${type}`}
                                        className="text-[8px] cursor-pointer leading-none"
                                      >
                                        {type.split(' ')[2]}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                              <div className="text-center hidden lg:block">
                                <p className="text-[10px] text-muted-foreground">Tasks</p>
                                <p className="font-semibold text-foreground text-xs">{dep.tasksCompleted}</p>
                              </div>
                              <div className="text-center hidden lg:block">
                                <p className="text-[10px] text-muted-foreground">Uptime</p>
                                <p className={`font-semibold text-xs ${dep.uptime > 98 ? 'text-emerald-400' : dep.uptime > 90 ? 'text-amber-400' : 'text-red-400'}`}>
                                  {dep.uptime.toFixed(1)}%
                                </p>
                              </div>
                            </>
                          )}
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/agents/${item.id}`)} title="View">
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/shield-ai-chat")} title="Ask">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="gap-2"
              >
                Load More ({filtered.length - visibleCount} remaining)
              </Button>
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
              <span className="text-xs text-muted-foreground">{deployed.length} / 1176 Deployed</span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default DeployedAgentsDashboard;
