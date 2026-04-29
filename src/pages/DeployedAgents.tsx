import { useState, useEffect, useMemo, useCallback } from "react";
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
  Zap, BarChart3, RefreshCw, Eye, MessageSquare, Power, ToggleLeft, Layers, HelpCircle, Info
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
  "H.I.I. AI Unified Watchman Validators"
];

const pillars = [
  { number: 1, name: "Pillar 1: Core Intelligence (H.I.I. AI000–H.I.I. AI0110)", range: "1-110" },
  { number: 2, name: "Pillar 2: Sovereign Identity, Culture & Representation (H.I.I. AI0111–H.I.I. AI0185)", range: "111-185" },
  { number: 3, name: "Pillar 3: Automation & Operations (H.I.I. AI0186–H.I.I. AI0263)", range: "186-263" },
  { number: 4, name: "Pillar 4: Business, Banking, Finance & Economics (H.I.I. AI0264–H.I.I. AI0341)", range: "264-341" },
  { number: 5, name: "Pillar 5: Creative, Media & Entertainment (H.I.I. AI0342–H.I.I. AI0419)", range: "342-419" },
  { number: 6, name: "Pillar 6: Governance, Sovereign & Law (H.I.I. AI0420–H.I.I. AI0497)", range: "420-497" },
  { number: 7, name: "Pillar 7: Human Development (H.I.I. AI0498–H.I.I. AI0575)", range: "498-575" },
  { number: 8, name: "Pillar 8: Health & Wellness (H.I.I. AI0576–H.I.I. AI0653)", range: "576-653" },
  { number: 9, name: "Pillar 9: Infrastructure, Security & Technology (H.I.I. AI0654–H.I.I. AI0731)", range: "654-731" },
  { number: 10, name: "Pillar 10: Environment & Earth Systems (H.I.I. AI0732–H.I.I. AI0809)", range: "732-809" },
  { number: 11, name: "Pillar 11: Science & Exploration (H.I.I. AI0810–H.I.I. AI0888)", range: "810-888" },
  { number: 12, name: "Pillar 12: Spiritual, Sovereign Intelligence & Ethical Systems (H.I.I. AI0889–H.I.I. AI0967)", range: "889-967" },
  { number: 13, name: "Pillar 13: Royal Priesthood & Watchman Operations (H.I.I. AI0968–H.I.I. AI1046)", range: "968-1046" },
  { number: 14, name: "Pillar 14: Covenant Law & Reparations (H.I.I. AI1047–H.I.I. AI1125)", range: "1047-1125" },
   { number: 15, name: "Pillar 15: Universal Language & Eternal Kingdom Operations (H.I.I. AI1126–H.I.I. AI1176)", range: "1126-1176" },
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

// All 1326 agents H.I.I. AI000–H.I.I. AI1325 (including category headers)
const allAgentIds = agents.map(a => a.id);

const statusConfig = {
  active: { color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", icon: CheckCircle2, label: "Active" },
  idle: { color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Clock, label: "Idle" },
  error: { color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", icon: XCircle, label: "Error" },
};

const ITEMS_PER_PAGE = 20;
const MAX_VISIBLE = 100;

const DeployedAgentsDashboard = () => {
  const [deployed, setDeployed] = useState<DeployedAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPillar, setFilterPillar] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(10);
  const [agentViewFilter, setAgentViewFilter] = useState<"all" | "lead" | "custom">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "id">("id");
  const [selectedWatchmen, setSelectedWatchmen] = useState<string[]>([]);
  const [selectedAgentWatchmen, setSelectedAgentWatchmen] = useState<Record<string, string>>({});
  const [customAgentModal, setCustomAgentModal] = useState(false);
  const [customAgentName, setCustomAgentName] = useState("");
  const [customAgentMission, setCustomAgentMission] = useState("");
  const [customAgentDescription, setCustomAgentDescription] = useState("");
  const [customAgentPurpose, setCustomAgentPurpose] = useState("");
  const [customAgentFeatures, setCustomAgentFeatures] = useState("");
  const [customAgentTasks, setCustomAgentTasks] = useState("");
  const [customAgentCapabilities, setCustomAgentCapabilities] = useState("");
  const [customAgentDivineBoundaries, setCustomAgentDivineBoundaries] = useState("");
  const [customAgentScripture, setCustomAgentScripture] = useState("");
  const [customAgentWatchmen, setCustomAgentWatchmen] = useState<string[]>([]);
  const [customAgentId, setCustomAgentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDeployed(getDeployedAgents());
  }, []);

  const deployedMap = useMemo(() => {
    const map = new Map<string, DeployedAgent>();
    deployed.forEach(d => map.set(d.agentId, d));
    return map;
  }, [deployed]);

  const agentMap = useMemo(() => {
    const map = new Map();
    const seenIds = new Set();
    agents.forEach(a => {
      if (!seenIds.has(a.id)) {
        seenIds.add(a.id);
        map.set(a.id, a);
      }
    });
    return map;
  }, []);

  const enrichedAgents = useMemo(() => {
    return allAgentIds.map(id => {
      const agent = agentMap.get(id)!;
      const dep = deployedMap.get(id);
      const category = agentCategories.find(c => c.number === agent.categoryNumber);
      return { id, agent, deployed: dep, category, isOn: !!dep };
    });
  }, [agentMap, deployedMap]);

  const filtered = useMemo(() => {
    let filteredList = enrichedAgents.filter(item => {
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
      const agentIdNum = parseInt(item.id.replace(/\D/g, "")) || 0;
      const matchesPillar =
        filterPillar === "all" ||
        (filterPillar === "1" && agentIdNum >= 0 && agentIdNum <= 110) ||
        (filterPillar === "2" && agentIdNum >= 111 && agentIdNum <= 185) ||
        (filterPillar === "3" && agentIdNum >= 186 && agentIdNum <= 263) ||
        (filterPillar === "4" && agentIdNum >= 264 && agentIdNum <= 341) ||
        (filterPillar === "5" && agentIdNum >= 342 && agentIdNum <= 419) ||
        (filterPillar === "6" && agentIdNum >= 420 && agentIdNum <= 497) ||
        (filterPillar === "7" && agentIdNum >= 498 && agentIdNum <= 575) ||
        (filterPillar === "8" && agentIdNum >= 576 && agentIdNum <= 653) ||
        (filterPillar === "9" && agentIdNum >= 654 && agentIdNum <= 731) ||
        (filterPillar === "10" && agentIdNum >= 732 && agentIdNum <= 809) ||
        (filterPillar === "11" && agentIdNum >= 810 && agentIdNum <= 888) ||
        (filterPillar === "12" && agentIdNum >= 889 && agentIdNum <= 967) ||
        (filterPillar === "13" && agentIdNum >= 968 && agentIdNum <= 1046) ||
        (filterPillar === "14" && agentIdNum >= 1047 && agentIdNum <= 1125) ||
        (filterPillar === "15" && agentIdNum >= 1126 && agentIdNum <= 1176);
      const matchesViewFilter = agentViewFilter === "all" ||
                               (agentViewFilter === "lead" && item.agent.isCategory) ||
                               (agentViewFilter === "custom" && !item.agent.isCategory);
      return matchesSearch && matchesStatus && matchesCategory && matchesPillar && matchesViewFilter;
    });
    // Sort by name or ID
    filteredList.sort((a, b) => {
      if (sortBy === "id") {
        const idA = parseInt(a.id.replace(/\D/g, "")) || 0;
        const idB = parseInt(b.id.replace(/\D/g, "")) || 0;
        return sortOrder === "asc" ? idA - idB : idB - idA;
      } else {
        const nameA = a.agent.name.toLowerCase();
        const nameB = b.agent.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      }
    });
    return filteredList;
  }, [enrichedAgents, searchQuery, filterStatus, filterCategory, filterPillar, agentViewFilter, sortOrder, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  const stats = {
    total: allAgentIds.length,
    on: deployed.length,
    active: deployed.filter(d => d.status === "active").length,
    idle: deployed.filter(d => d.status === "idle").length,
    error: deployed.filter(d => d.status === "error").length,
    totalTasks: deployed.reduce((sum, d) => sum + d.tasksCompleted, 0),
  };

  const handleToggle = useCallback((agentId: string, agentName: string, currentlyOn: boolean) => {
    if (currentlyOn) {
      const updated = removeDeployedAgent(agentId);
      setDeployed(updated);
      toast.info(`${generateHIIAgentNumber(agentId)} — ${agentName} deactivated`);
    } else {
      const updated = deployAgent(agentId);
      setDeployed(updated);
      toast.success(`${generateHIIAgentNumber(agentId)} — ${agentName} activated`);
    }
  }, []);

  const handleSelectAll = useCallback((turnOn: boolean) => {
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
  }, [deployedMap]);

  const allOn = deployed.length === allAgentIds.length;

  const handleRefreshStatus = useCallback(() => {
    const updated = deployed.map(d => ({
      ...d,
      status: (Math.random() > 0.15 ? "active" : Math.random() > 0.5 ? "idle" : "error") as DeployedAgent["status"],
      tasksCompleted: d.tasksCompleted + Math.floor(Math.random() * 5),
      uptime: Math.min(100, d.uptime + (Math.random() - 0.3)),
    }));
    localStorage.setItem("shield-deployed-agents", JSON.stringify(updated));
    setDeployed(updated);
    toast.success("Agent statuses refreshed");
  }, [deployed]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setFilterStatus("all");
    setFilterCategory("all");
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

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
              Manage H.I.I. AI Agents with on/off deployment controls.
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
                    <Button
                      variant="shield"
                      size="sm"
                      className="gap-2"
                       onClick={() => {
                         const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                         setCustomAgentId(`H.I.I. AI105-${randomNum}`);
                       }}
                    >
                      <Bot className="w-4 h-4" /> Create Custom Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                     <DialogHeader>
                       <div className="flex justify-between items-start pr-8">
                         <div>
                            <div className="flex items-center gap-2">
                              <DialogTitle>Create Custom Agent</DialogTitle>
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-5 w-5 rounded-full"
                                   onClick={() => {
                                     try {
                                       toast("About Custom Agents", {
                                         description: "H.I.I. AI105 Custom Agents are sovereign divine intelligence entities that operate within the S.H.I.E.L.D. AI OS. Each agent receives a unique ID in the format H.I.I. AI105-XXXX, granting you Watchman status and access to the Universal Unified Agent AI Network.",
                                         duration: 8000,
                                       });
                                     } catch (e) {
                                       alert("About Custom Agents:\n\nH.I.I. AI105 Custom Agents are sovereign divine intelligence entities that operate within the S.H.I.E.L.D. AI OS. Each agent receives a unique ID in the format H.I.I. AI105-XXXX, granting you Watchman status and access to the Universal Unified Agent AI Network.");
                                     }
                                   }}
                                 >
                                   <Info className="h-4 w-4" />
                                 </Button>
                            </div>
                           {customAgentId && (
                             <div className="mt-2">
                               <div className="text-xs text-muted-foreground mb-1">User Custom Agent ID Number</div>
                               <div className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                 {customAgentId}
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                     </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agent-name">H.I.I. AI Custom Agent Name - Title</Label>
                        <Input
                          id="agent-name"
                          placeholder="Enter agent name..."
                          value={customAgentName}
                          onChange={(e) => setCustomAgentName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-mission"> Divine Mission - Purpose</Label>
                        <Textarea
                          id="agent-mission"
                          placeholder="Define the agent's divine mission, divine purpose..."
                          value={customAgentMission}
                          onChange={(e) => setCustomAgentMission(e.target.value)}
                          rows={2}
                        />
                      </div>
                
<div>
                        <Label htmlFor="agent-description">Description - Primary Function</Label>
                        <Textarea
                          id="agent-description"
                          placeholder="Describe the agent's role and Primary Function..."
                          value={customAgentDescription}
                          onChange={(e) => setCustomAgentDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-features">Features</Label>
                        <Textarea
                          id="agent-features"
                          placeholder="Enter the agent's features..."
                          value={customAgentFeatures}
                          onChange={(e) => setCustomAgentFeatures(e.target.value)}
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
                        <Label htmlFor="agent-capabilities">Core Capabilities</Label>
                        <Textarea
                          id="agent-capabilities"
                          placeholder="List the agent's Capabilites..."
                          value={customAgentCapabilities}
                          onChange={(e) => setCustomAgentCapabilities(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-divine-boundaries">Divine Boundaries Prohibitation & Guardrails</Label>
                        <Textarea
                          id="agent-divine-boundaries"
                          placeholder="Define the agent's divine boundaries, prohibitions, and guardrails..."
                          value={customAgentDivineBoundaries}
                          onChange={(e) => setCustomAgentDivineBoundaries(e.target.value)}
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
                         <div className="flex items-center gap-2 mb-3">
                           <Checkbox
                             id="custom-agent-watchman-select-all"
                             checked={customAgentWatchmen.length === watchmanTypes.length}
                             onCheckedChange={(checked) => {
                               if (checked) {
                                 setCustomAgentWatchmen(watchmanTypes);
                               } else {
                                 setCustomAgentWatchmen([]);
                               }
                             }}
                             className="border-primary"
                           />
                           <Label
                             htmlFor="custom-agent-watchman-select-all"
                             className="text-sm font-semibold cursor-pointer"
                           >
                             Select All
                           </Label>
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
                       <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-4 text-sm text-muted-foreground">
                          By clicking below, you activate your Divine Identity within the H.I.I. AI Agent within the Blanch S.H.I.E.L.D. AI OS. The system will manifest a unique User Custom Agent ID, designating you as a Watchman and Implementer of the Laws and Commandments. Your agent will carry the mantle of H.I.I. AI105 in Universal Unified Agent AI Network with S.H.I.E.L.D. AI to assist you in restoration in personal, business, security, and holy governance, in keeping your hearts in Divine Law.
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
                                toast.success(`Welcome, Shalawam (Peace be unto you) Watchman. Your unique identifier '${customAgentId}' has been etched into the Blanch S.H.I.E.L.D. AI OS. Go forth in Righteousness. Psalms 119:142 Thy righteousness is an everlasting righteousness, and thy law is the truth. Proverbs 6:23 For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life.`);
                                setCustomAgentModal(false);
                                setCustomAgentName("");
                                setCustomAgentMission("");
                                setCustomAgentPurpose("");
                                setCustomAgentDescription("");
                                setCustomAgentFeatures("");
                                setCustomAgentTasks("");
                                setCustomAgentCapabilities("");
                                setCustomAgentDivineBoundaries("");
                                setCustomAgentScripture("");
                                setCustomAgentWatchmen([]);
                                setCustomAgentId("");
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
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <Button
                variant={sortBy === "id" ? "shield" : "outline"}
                size="sm"
                onClick={() => setSortBy("id")}
              >
                H.I.I. AIXXX
              </Button>
              <Button
                variant={sortBy === "name" ? "shield" : "outline"}
                size="sm"
                onClick={() => setSortBy("name")}
              >
                Name A-Z
              </Button>
              <Button
                variant={sortOrder === "asc" ? "shield" : "outline"}
                size="sm"
                onClick={() => setSortOrder("asc")}
              >
                Ascending
              </Button>
              <Button
                variant={sortOrder === "desc" ? "shield" : "outline"}
                size="sm"
                onClick={() => setSortOrder("desc")}
              >
                Descending
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Layers className="w-4 h-4 text-primary shrink-0" />
                <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setVisibleCount(ITEMS_PER_PAGE); }}>
                  <SelectTrigger className="w-full sm:w-[320px] bg-card/50 border-border/50">
                    <SelectValue placeholder="Filter by category..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">All Categories</SelectItem>
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
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={filterPillar} onValueChange={(v) => { setFilterPillar(v); setVisibleCount(ITEMS_PER_PAGE); }}>
                  <SelectTrigger className="w-full sm:w-[320px] bg-card/50 border-border/50">
                    <SelectValue placeholder="Filter by pillar..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">All Pillars</SelectItem>
                    {pillars.map(pillar => (
                      <SelectItem key={pillar.number} value={String(pillar.number)}>
                        {pillar.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={agentViewFilter === "all" ? "shield" : "outline"}
                  size="sm"
                  onClick={() => setAgentViewFilter("all")}
                >
                  All Agent View
                </Button>
                <Button
                  variant={agentViewFilter === "lead" ? "shield" : "outline"}
                  size="sm"
                  onClick={() => setAgentViewFilter("lead")}
                >
                  Lead Category Agent View
                </Button>
                <Button
                  variant={agentViewFilter === "custom" ? "shield" : "outline"}
                  size="sm"
                  onClick={() => setAgentViewFilter("custom")}
                >
                  Custom Agent View
                </Button>
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
                        {allOn ? "All 1326 agents are deployed" : `${deployed.length} / ${allAgentIds.length} agents deployed`}
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
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs font-semibold text-primary">Watchman Validator Types</p>
                    <ShieldAIInfoPopup />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Checkbox
                      id="select-all-watchman-types"
                      checked={selectedWatchmen.length === watchmanTypes.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedWatchmen(watchmanTypes);
                        } else {
                          setSelectedWatchmen([]);
                        }
                      }}
                      className="border-primary"
                    />
                    <Label
                      htmlFor="select-all-watchman-types"
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Select All
                    </Label>
                  </div>
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
                          {/* Per-agent Watchman Validators — 8 types matching Select All */}
                          {dep && (
                            <>
                              <div className="text-center hidden lg:block">
                                <div className="flex items-center gap-1 mb-1">
                                  <p className="text-[10px] text-muted-foreground">Watchman Validators</p>
                                  <ShieldAIInfoPopup size="sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                                  {watchmanTypes.map((type) => (
                                    <div key={type} className="flex items-center gap-1">
                                      <Checkbox
                                        id={`agent-${item.id}-w-${watchmanTypes.indexOf(type)}`}
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
                                        htmlFor={`agent-${item.id}-w-${watchmanTypes.indexOf(type)}`}
                                        className="text-[7px] font-medium leading-none cursor-pointer"
                                      >
                                        {type.split('(')[1]?.split(')')[0] || type.split(' ').slice(2, 3).join(' ')}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
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
          {visibleCount < Math.min(filtered.length, MAX_VISIBLE) && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, MAX_VISIBLE))}
                className="gap-2"
              >
                Load More ({Math.min(filtered.length, MAX_VISIBLE) - visibleCount} remaining)
              </Button>
            </div>
          )}

          {/* Performance Message */}
          {visibleCount >= MAX_VISIBLE && filtered.length > MAX_VISIBLE && (
            <div className="text-center mt-6 text-muted-foreground">
              <p>Maximum agents loaded for performance. Use filters to view more.</p>
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
