import { useState, useMemo, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { agents, agentCategories, Agent, generateHIIAgentNumber, totalAgents, totalCategories, totalPillars } from "@/data/agents";
import { getAgentDetailMeta } from "@/data/agentDetails";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ShieldAIInfoPopup from "@/components/ShieldAIInfoPopup";
import {
  Search, Filter, ArrowLeft, Bot, Users, Cpu,
  Settings, Palette, Video, Wand2, Crown, Briefcase,
  TrendingUp, ShieldCheck, BarChart, BookOpen, Wallet,
  Gamepad2, Heart, HandHeart, Scale, Truck, Car,
  Calendar, Home, Book, Star, Lock, Server, Globe,
  RefreshCw, Activity, Leaf, Gem, Sun, Rocket,
  Zap, Play, MessageSquare, CheckCircle2, Power,
  Monitor, Layers, Map, Gavel, Coins, GraduationCap,
  Network, Earth, HeartPulse, Trees, FlaskConical, Telescope,
  Shield, Radio as RadioIcon, Landmark, Recycle, Satellite, Microscope,
  Library, Scroll, Badge as BadgeIcon, HelpCircle, Database, Eye, UserCheck, Clock, XCircle
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

const iconMap: Record<string, any> = {
  "cpu": Cpu,
  "user": Users,
  "settings": Settings,
  "palette": Palette,
  "video": Video,
  "wand": Wand2,
  "crown": Crown,
  "briefcase": Briefcase,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  "bar-chart": BarChart,
  "book-open": BookOpen,
  "wallet": Wallet,
  "gamepad": Gamepad2,
  "heart": Heart,
  "hand-heart": HandHeart,
  "scale": Scale,
  "truck": Truck,
  "car": Car,
  "calendar": Calendar,
  "home": Home,
  "book": Book,
  "star": Star,
  "lock": Lock,
  "server": Server,
  "globe": Globe,
  "refresh": RefreshCw,
  "activity": Activity,
  "leaf": Leaf,
  "gem": Gem,
  "sun": Sun,
  "rocket": Rocket,
  "monitor": Monitor,
  "layers": Layers,
  "map": Map,
  "gavel": Gavel,
  "coins": Coins,
  "graduation-cap": GraduationCap,
  "network": Network,
  "earth": Earth,
  "heart-pulse": HeartPulse,
  "trees": Trees,
  "flask": FlaskConical,
  "telescope": Telescope,
  "shield": Shield,
  "radio": RadioIcon,
  "landmark": Landmark,
  "recycle": Recycle,
  "satellite": Satellite,
  "microscope": Microscope,
  "library": Library,
  "scroll": Scroll,
  "badge": BadgeIcon,
};

const AgentCard = ({ agent, showCategory = false }: { agent: Agent; showCategory?: boolean }) => {
  const category = agentCategories.find(c => c.number === agent.categoryNumber);
  const IconComponent = category ? iconMap[category.icon] || Bot : Bot;
  
  return (
    <Link to={`/agents/${agent.id}`}>
      <div className={`bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 h-full ${agent.isCategory ? 'border-l-4 border-l-primary' : ''}`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${agent.isCategory ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <IconComponent className={`w-5 h-5 ${agent.isCategory ? 'text-primary' : 'text-primary/80'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary/70 font-mono mb-1">{generateHIIAgentNumber(agent.id)}</p>
            <h3 className={`font-display text-sm text-foreground leading-tight ${agent.isCategory ? 'font-semibold' : 'font-medium'}`}>
              {agent.name}
            </h3>
            {showCategory && (
              <Badge variant="outline" className="mt-2 text-xs">
                {agent.category}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const AgentDetail = ({ agentId }: { agentId: string }) => {
  const [activated, setActivated] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [selectedWatchmen, setSelectedWatchmen] = useState<string[]>([]);
  const navigate = useNavigate();
  const agent = agents.find(a => a.id === agentId);
  const category = agent ? agentCategories.find(c => c.number === agent.categoryNumber) : null;
  const IconComponent = category ? iconMap[category.icon] || Bot : Bot;
  const relatedAgents = agent ? agents.filter(a => a.categoryNumber === agent.categoryNumber && a.id !== agent.id).slice(0, 8) : [];
  const meta = agent ? getAgentDetailMeta(agent) : null;

  const handleActivate = useCallback(() => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setActivated(true);
      try {
        const stored = localStorage.getItem("shield-deployed-agents");
        const current = stored ? JSON.parse(stored) : [];
        if (!current.find((a: any) => a.agentId === agentId)) {
          current.push({
            agentId,
            activatedAt: new Date().toISOString(),
            status: "active",
            tasksCompleted: Math.floor(Math.random() * 50),
            uptime: 95 + Math.random() * 5,
            watchmenTypes: selectedWatchmen,
          });
          localStorage.setItem("shield-deployed-agents", JSON.stringify(current));
        }
      } catch {}
      toast.success(`${generateHIIAgentNumber(agentId)} — ${agent?.name} activated successfully`, {
        description: "Agent is now deployed and operational within the S.H.I.E.L.D. AI OS ecosystem.",
      });
    }, 1500);
  }, [agentId, agent?.name, selectedWatchmen]);

  const handleAskAgent = useCallback(() => {
    navigate("/shield-ai-chat");
  }, [navigate]);

  const toggleWatchman = (type: string) => {
    setSelectedWatchmen(prev =>
      prev.includes(type) ? prev.filter(w => w !== type) : [...prev, type]
    );
  };

  if (!agent || !meta) {
    return (
      <div className="text-center py-20">
        <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-display text-foreground mb-2">Agent Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested agent could not be found.</p>
        <Link to="/agents">
          <Button variant="shield">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/agents" className="inline-flex items-center text-primary hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to All Agents
      </Link>

      {/* Hero */}
      <ScrollAnimationWrapper>
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
              <IconComponent className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="font-mono">{generateHIIAgentNumber(agent.id)}</Badge>
                {agent.isCategory && (
                  <Badge className="bg-primary/20 text-primary border-primary/50">Category Lead Agent</Badge>
                )}
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active — Online</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {agent.name}
              </h1>
              <p className="text-sm text-primary/70 font-mono mb-3">{meta.pillar}</p>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {meta.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                   variant="shield"
                   onClick={handleActivate}
                   disabled={activated || deploying}
                   className="gap-2"
                 >
                   {deploying ? (
                     <><RefreshCw className="w-4 h-4 animate-spin" /> Deploying...</>
                   ) : activated ? (
                     <><CheckCircle2 className="w-4 h-4" /> Agent Activated</>
                   ) : (
                     <><Zap className="w-4 h-4" /> Activate Agent</>
                   )}
                 </Button>
                 <Button variant="outline" onClick={() => navigate('/deployed-agents')} className="gap-2">
                   <Eye className="w-4 h-4" /> See Deployed Agent
                 </Button>
                 <Button variant="outline" onClick={() => navigate('/shield-ai-monitoring')} className="gap-2">
                   <Activity className="w-4 h-4" /> S.H.I.E.L.D. AI Monitoring & Observability
                 </Button>
                 <Button variant="outline" onClick={handleAskAgent} className="gap-2">
                   <MessageSquare className="w-4 h-4" /> Ask This Agent
                 </Button>
               </div>

              {/* Watchman Validator Type Selection — Checkboxes for multiple */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-primary">Watchman Validator Type Selection</h3>
                  <ShieldAIInfoPopup />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Checkbox
                    id={`watchman-select-all-${agentId}`}
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
                  <label
                    htmlFor={`watchman-select-all-${agentId}`}
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Select All
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {watchmanTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 hover:bg-primary/5 rounded-lg p-2 transition-colors">
                      <Checkbox
                        id={`watchman-${agentId}-${type}`}
                        checked={selectedWatchmen.includes(type)}
                        onCheckedChange={() => toggleWatchman(type)}
                        className="border-primary"
                      />
                      <label
                        htmlFor={`watchman-${agentId}-${type}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* Mission */}
      <ScrollAnimationWrapper delay={0.05}>
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-display font-semibold text-primary mb-2">✦ Divine Mission</h2>
          <p className="text-foreground/90 font-body leading-relaxed">{meta.mission}</p>
        </div>
      </ScrollAnimationWrapper>

      {/* Description - Primary Function */}
      <ScrollAnimationWrapper delay={0.1}>
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Book className="w-5 h-5 text-primary" /> Description - Primary Function
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">{meta.description}</p>
        </div>
      </ScrollAnimationWrapper>

      {/* Tasks, Capabilities, Specs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ScrollAnimationWrapper delay={0.15}>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Tasks & Responsibilities
            </h2>
            <ul className="space-y-3 text-muted-foreground font-body">
              {meta.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-bold">{i + 1}</span>
                  </div>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" /> Core Capabilities
            </h2>
            <ul className="space-y-2 text-muted-foreground font-body">
              {meta.capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Specifications */}
      <ScrollAnimationWrapper delay={0.25}>
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" /> Agent Specifications
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {meta.specifications.map((spec, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground font-body text-sm">{spec.label}</span>
                <span className="text-foreground font-medium text-sm text-right">{spec.value}</span>
              </div>
            ))}

          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* Scriptural References */}
      <ScrollAnimationWrapper delay={0.3}>
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Book className="w-5 h-5 text-primary" /> Scriptural References & Divine Alignment
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {meta.scripturalReferences.map((ref, i) => (
              <div key={i} className="bg-background/50 border border-primary/10 rounded-lg p-4">
                <p className="text-primary font-display font-semibold text-sm mb-1">{ref.verse}</p>
                <p className="text-muted-foreground font-body text-sm italic leading-relaxed">"{ref.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* S.H.I.E.L.D. AI Monitoring & Observability */}
      <ScrollAnimationWrapper delay={0.35}>
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> S.H.I.E.L.D. AI Monitoring & Observability
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            Real-time monitoring and observability of agent performance, health metrics, and operational status within the S.H.I.E.L.D. AI OS ecosystem. Track agent uptime, task completion rates, error detection, and divine alignment compliance.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-background/50 border border-primary/10 rounded-lg p-4 text-center">
              <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Agent Health</p>
              <p className="text-xs text-muted-foreground">98.5% Uptime</p>
            </div>
            <div className="bg-background/50 border border-primary/10 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Task Performance</p>
              <p className="text-xs text-muted-foreground">245 Tasks/Hour</p>
            </div>
            <div className="bg-background/50 border border-primary/10 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Divine Compliance</p>
              <p className="text-xs text-muted-foreground">100% Aligned</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="shield" onClick={() => navigate('/shield-ai-monitoring')}>
              <Eye className="w-4 h-4 mr-2" /> View Full Monitoring Dashboard
            </Button>
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* Related Agents */}
      {relatedAgents.length > 0 && (
        <ScrollAnimationWrapper delay={0.35}>
          <h2 className="text-2xl font-display font-bold gradient-text mb-6">
            Related {agent.category} Agents
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedAgents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </ScrollAnimationWrapper>
      )}
    </div>
  );
};

const OverviewTab = ({
  filteredAgents,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  viewMode,
  setViewMode,
  openCustomAgentModal,
  agentViewFilter,
  setAgentViewFilter,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy
}: {
  filteredAgents: Agent[];
  selectedCategory: number | null;
  setSelectedCategory: (cat: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: number[];
  setSelectedCategories: (cats: number[]) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  openCustomAgentModal: () => void;
  agentViewFilter: "all" | "lead" | "custom";
  setAgentViewFilter: (filter: "all" | "lead" | "custom") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  sortBy: "name" | "id";
  setSortBy: (by: "name" | "id") => void;
}) => {
  return (
    <>
      {/* Search & Filter - Below Tabs */}
      <section className="py-4 px-4 border-b border-border/50 bg-card/10">
        <div className="container mx-auto space-y-4">
          {/* Row 1: Search Bar + Create Custom Agent */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, ID, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 w-full"
              />
            </div>
            <Button variant="shield" size="sm" className="gap-2" onClick={openCustomAgentModal}>
              <Bot className="w-4 h-4" /> Create Custom Agent
            </Button>
          </div>

          {/* Row 2: All Categories Dropdown + View/Agent Filter Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-[280px]">
              <Select 
                value={selectedCategory === null ? "all" : String(selectedCategory)}
                onValueChange={(value) => setSelectedCategory(value === "all" ? null : parseInt(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {agentCategories.map((cat) => (
                    <SelectItem key={cat.number} value={String(cat.number)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "shield" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === "list" ? "shield" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List View
              </Button>
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
          </div>

          {/* Row 3: Sort Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground font-semibold">Sort:</span>
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
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold gradient-text mb-2">Universal Unified AI Agents</h2>
            <p className="text-muted-foreground font-body">
              Showing {filteredAgents.length} agents
            </p>
          </div>

          <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}>
            {filteredAgents.map((agent, index) => (
              <ScrollAnimationWrapper key={agent.id} delay={Math.min(index * 0.02, 0.3)}>
                <AgentCard agent={agent} showCategory={selectedCategory === null} />
              </ScrollAnimationWrapper>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-20">
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-display text-foreground mb-2">No agents found</h2>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl font-display font-bold gradient-text text-center mb-12">
              Agent Categories
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {agentCategories.map((cat, index) => {
              const IconComponent = iconMap[cat.icon] || Bot;
              const agentCount = agents.filter(a => a.categoryNumber === cat.number).length;

              return (
                <ScrollAnimationWrapper key={cat.number} delay={index * 0.03}>
                  <button
                    onClick={() => setSelectedCategory(cat.number)}
                    className="w-full bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs text-primary/70 font-mono">#{cat.number}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{agentCount} agents</p>
                  </button>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const Agents = () => {
  const { agentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentTab, setCurrentTab] = useState("overview");
  const [agentViewFilter, setAgentViewFilter] = useState<"all" | "lead" | "custom">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "id">("id");
  const [customAgentModal, setCustomAgentModal] = useState(false);
  const [customAgentName, setCustomAgentName] = useState("");
  const [customAgentMission, setCustomAgentMission] = useState("");
  const [customAgentDescription, setCustomAgentDescription] = useState("");
  const [customAgentTasks, setCustomAgentTasks] = useState("");
  const [customAgentCapabilities, setCustomAgentCapabilities] = useState("");
  const [customAgentScripture, setCustomAgentScripture] = useState("");
  const [customAgentWatchmen, setCustomAgentWatchmen] = useState<string[]>([]);
  const [customAgentId, setCustomAgentId] = useState("");
  const navigate = useNavigate();

  const openCustomAgentModal = () => {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setCustomAgentId(`H.I.I. AI030-${randomNum}`);
    setCustomAgentModal(true);
  };

  const filteredAgents = useMemo(() => {
    let filtered = agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            agent.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || agent.categoryNumber === selectedCategory;
      const matchesViewFilter = agentViewFilter === "all" ||
                              (agentViewFilter === "lead" && agent.isCategory) ||
                              (agentViewFilter === "custom" && !agent.isCategory);
      return matchesSearch && matchesCategory && matchesViewFilter;
    });
    // Sort by name or ID
    filtered.sort((a, b) => {
      if (sortBy === "id") {
        // Extract numeric part from H.I.I. AI### format
        const idA = parseInt(a.id.replace(/\D/g, "")) || 0;
        const idB = parseInt(b.id.replace(/\D/g, "")) || 0;
        return sortOrder === "asc" ? idA - idB : idB - idA;
      } else {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      }
    });
    return filtered;
  }, [searchQuery, selectedCategory, agentViewFilter, sortOrder, sortBy]);

  if (agentId) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-24">
          <AgentDetail agentId={agentId} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              S.H.I.E.L.D. AI Agent Registry
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body mb-8">
              Explore our comprehensive registry of specialized H.I.I. AI agents —
              H.I.I. AI000 through H.I.I. AI1175.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{totalAgents}</p>
                <p className="text-sm text-muted-foreground font-body">Total Agents</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{totalCategories}</p>
                <p className="text-sm text-muted-foreground font-body">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{totalPillars}</p>
                <p className="text-sm text-muted-foreground font-body">Sovereign Pillars</p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="px-4 border-y border-border/50 bg-card/20">
        <div className="container mx-auto">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 h-auto p-1 gap-1">
              <TabsTrigger value="overview" className="text-xs py-2 px-1 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="text-xs py-2 px-1 flex items-center gap-1">
                <BarChart className="w-3 h-3" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="deployed" className="text-xs py-2 px-1 flex items-center gap-1">
                <Power className="w-3 h-3" />
                Deployed
              </TabsTrigger>
              <TabsTrigger value="managed" className="text-xs py-2 px-1 flex items-center gap-1">
                <Settings className="w-3 h-3" />
                Managed
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="text-xs py-2 px-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="discover" className="text-xs py-2 px-1 flex items-center gap-1">
                <Search className="w-3 h-3" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="text-xs py-2 px-1 flex items-center gap-1">
                <Wallet className="w-3 h-3" />
                Subscriptions
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="text-xs py-2 px-1 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Collaboration
              </TabsTrigger>
              <TabsTrigger value="training" className="text-xs py-2 px-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                Training
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="text-xs py-2 px-1 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Monitoring
              </TabsTrigger>
              <TabsTrigger value="development" className="text-xs py-2 px-1 flex items-center gap-1">
                <Wand2 className="w-3 h-3" />
                Dev & Eval
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="text-xs py-2 px-1 flex items-center gap-1">
                <Database className="w-3 h-3" />
                Knowledge
              </TabsTrigger>
              <TabsTrigger value="finops" className="text-xs py-2 px-1 flex items-center gap-1">
                <Coins className="w-3 h-3" />
                FinOps
              </TabsTrigger>
              <TabsTrigger value="workflow" className="text-xs py-2 px-1 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                Workflow
              </TabsTrigger>
              <TabsTrigger value="memory" className="text-xs py-2 px-1 flex items-center gap-1">
                <Library className="w-3 h-3" />
                Memory
              </TabsTrigger>
              <TabsTrigger value="financial" className="text-xs py-2 px-1 flex items-center gap-1">
                <Wallet className="w-3 h-3" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs py-2 px-1 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Security
              </TabsTrigger>
              <TabsTrigger value="lifecycle" className="text-xs py-2 px-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Lifecycle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <OverviewTab
                filteredAgents={filteredAgents}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                viewMode={viewMode}
                setViewMode={setViewMode}
                openCustomAgentModal={openCustomAgentModal}
                agentViewFilter={agentViewFilter}
                setAgentViewFilter={setAgentViewFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <div className="text-center py-20">
                <BarChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Agent Dashboard</h2>
                <p className="text-muted-foreground">Analytics and performance metrics for all agents.</p>
              </div>
            </TabsContent>

            <TabsContent value="deployed" className="mt-6">
              <div className="text-center mb-8">
                <Power className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Deployed Agents</h2>
                <p className="text-muted-foreground mb-4">Manage currently deployed agents.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield" onClick={() => navigate('/deployed-agents')}>
                    View Deployed Agents
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {[
                  { label: "Total Agents", value: totalAgents, icon: Bot, color: "text-primary" },
                  { label: "Deployed", value: 0, icon: Power, color: "text-cyan-400" }, // Placeholder, would need real data
                  { label: "Active", value: 0, icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Idle", value: 0, icon: Clock, color: "text-amber-400" },
                  { label: "Errors", value: 0, icon: XCircle, color: "text-red-400" },
                  { label: "Tasks Done", value: 0, icon: Zap, color: "text-violet-400" },
                ].map((stat) => (
                  <Card key={stat.label} className="bg-card/50 border-border/50">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="managed" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Settings className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">Managed Agents</h2>
                  <p className="text-muted-foreground">Configure and manage agent settings.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" onClick={() => navigate('/deployed-agents')}>
                    <Settings className="w-4 h-4 mr-2" /> Manage Deployed
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-monitoring')}>
                    <Activity className="w-4 h-4 mr-2" /> Agent Configuration
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marketplace" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">S.H.I.E.L.D. AI Agent Marketplace</h2>
                  <p className="text-muted-foreground">Browse and purchase premium agents.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield">Browse Marketplace</Button>
                  <Button variant="outline">My Purchases</Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discover" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Search className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">Discover Agents</h2>
                  <p className="text-muted-foreground">Find new agents based on your needs.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield">Search Agents</Button>
                  <Button variant="outline">Recommended</Button>
                  <Button variant="outline">Categories</Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">My Subscriptions</h2>
                  <p className="text-muted-foreground">Manage your agent subscriptions.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield">Manage Subscriptions</Button>
                  <Button variant="outline">Billing History</Button>
                  <Button variant="outline">Upgrade Plan</Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="collaboration" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">Collaboration</h2>
                  <p className="text-muted-foreground">Work with other users on agent projects.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield">Create Project</Button>
                  <Button variant="outline">My Projects</Button>
                  <Button variant="outline">Team Members</Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">Training Agents</h2>
                  <p className="text-muted-foreground">Train and customize agent behaviors.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield">Start Training</Button>
                  <Button variant="outline">Training Models</Button>
                  <Button variant="outline">Training History</Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="mt-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                  <Activity className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold gradient-text mb-2">S.H.I.E.L.D. AI Monitoring & Observability</h2>
                  <p className="text-muted-foreground">Real-time monitoring and observability of agent performance, health metrics, and operational status</p>
                </div>

                {/* Stats Widgets Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 text-center">
                      <Bot className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{totalAgents}</div>
                      <div className="text-xs text-muted-foreground">Total Agents</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 text-center">
                      <Power className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">0</div>
                      <div className="text-xs text-muted-foreground">Active Agents</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">0</div>
                      <div className="text-xs text-muted-foreground">Tasks/Hour</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">100%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </CardContent>
                  </Card>
                </div>

                {/* System Health Widget */}
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" /> System Health Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">S.H.I.E.L.D. AI Core System</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm text-green-400">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Agent Registry</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm text-green-400">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Watchman Validator Network</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm text-green-400">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Divine Alignment Engine</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm text-green-400">Online</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-primary" /> Performance Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background/50 rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Agent Response Time</p>
                        <p className="text-xl font-bold text-foreground">24ms</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Divine Alignment Score</p>
                        <p className="text-xl font-bold text-foreground">100%</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Error Rate</p>
                        <p className="text-xl font-bold text-foreground">0.01%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="shield" onClick={() => navigate('/shield-ai-monitoring')}>
                    <Eye className="w-4 h-4 mr-2" /> View Full Monitoring Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/deployed-agents')}>
                    <Power className="w-4 h-4 mr-2" /> Manage Deployed Agents
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/shield-ai-chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="development" className="mt-6">
              <div className="text-center py-20">
                <Wand2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Development & Evaluation</h2>
                <p className="text-muted-foreground">Develop, test, and evaluate agent capabilities.</p>
              </div>
            </TabsContent>

            <TabsContent value="knowledge" className="mt-6">
              <div className="text-center py-20">
                <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Knowledge & Data Integration</h2>
                <p className="text-muted-foreground">Manage knowledge bases and data integrations.</p>
              </div>
            </TabsContent>

            <TabsContent value="finops" className="mt-6">
              <div className="text-center py-20">
                <Coins className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Operational FinOps</h2>
                <p className="text-muted-foreground">Financial operations and cost management.</p>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="mt-6">
              <div className="text-center py-20">
                <Layers className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Execution & Workflow Infrastructure</h2>
                <p className="text-muted-foreground">Workflow orchestration and execution management.</p>
              </div>
            </TabsContent>

            <TabsContent value="memory" className="mt-6">
              <div className="text-center py-20">
                <Library className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Memory & Knowledge</h2>
                <p className="text-muted-foreground">Agent memory and knowledge retention systems.</p>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="mt-6">
              <div className="text-center py-20">
                <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Financial Optimization</h2>
                <p className="text-muted-foreground">Optimize financial performance and resource allocation.</p>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <div className="text-center py-20">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AISecurity & Governance</h2>
                <p className="text-muted-foreground">Security policies and governance controls.</p>
              </div>
            </TabsContent>

            <TabsContent value="lifecycle" className="mt-6">
              <div className="text-center py-20">
                <CheckCircle2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Lifecycle & Quality</h2>
                <p className="text-muted-foreground">Agent lifecycle management and quality assurance.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Agent Modal */}
      <Dialog open={customAgentModal} onOpenChange={setCustomAgentModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <DialogTitle>Create Custom Agent</DialogTitle>
              {customAgentId && (
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">User Custom Agent ID Number</div>
                  <div className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {customAgentId}
                  </div>
                </div>
              )}
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
                placeholder="List the agent's Capabilities..."
                value={customAgentCapabilities}
                onChange={(e) => setCustomAgentCapabilities(e.target.value)}
                rows={3}
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
              By clicking below, you activate your Divine Identity within the H.I.I. AI Agent within the Blanch S.H.I.E.L.D. AI OS. The system will manifest a unique User Custom Agent ID, designating you as a Watchman and Implementer of the Laws and Commandments. Your agent will carry the mantle of H.I.I. AI030 in Universal Unified Agent AI Network with S.H.I.E.L.D. AI to assist you in restoration in personal, business, security, and holy governance, in keeping your hearts in Divine Law.
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
                    setCustomAgentDescription("");
                    setCustomAgentTasks("");
                    setCustomAgentCapabilities("");
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

      <Footer />
    </div>
  );
};

export default Agents;
