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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Library, Scroll, Badge as BadgeIcon
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
  "radio": Radio,
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
  const [selectedWatchman, setSelectedWatchman] = useState<string>("");
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
      // Persist to localStorage for the deployed agents dashboard
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
          });
          localStorage.setItem("shield-deployed-agents", JSON.stringify(current));
        }
      } catch {}
      toast.success(`${generateHIIAgentNumber(agentId)} — ${agent?.name} activated successfully`, {
        description: "Agent is now deployed and operational within the S.H.I.E.L.D. AI OS ecosystem.",
      });
    }, 1500);
  }, [agentId, agent?.name]);

  const handleAskAgent = useCallback(() => {
    navigate("/shield-ai-chat");
  }, [navigate]);

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
                <Button variant="outline" onClick={handleAskAgent} className="gap-2">
                  <MessageSquare className="w-4 h-4" /> Ask This Agent
                </Button>
              </div>

              {/* Watchman Validator Type Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-primary mb-3">Watchman Validator Type Selection</h3>
                <RadioGroup
                  value={selectedWatchman}
                  onValueChange={setSelectedWatchman}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {watchmanTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 hover:bg-primary/5 rounded-lg p-2 transition-colors">
                      <Radio
                        value={type}
                        id={`watchman-${agentId}-${type}`}
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
                </RadioGroup>
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

      {/* Tasks, Capabilities, Specs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ScrollAnimationWrapper delay={0.1}>
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

        <ScrollAnimationWrapper delay={0.15}>
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
      <ScrollAnimationWrapper delay={0.2}>
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
      <ScrollAnimationWrapper delay={0.25}>
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

      {/* Related Agents */}
      {relatedAgents.length > 0 && (
        <ScrollAnimationWrapper delay={0.3}>
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
  setViewMode
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
}) => {
  return (
    <>
      {/* Search & Filter */}
      <section className="py-8 px-4 border-b border-border/50 bg-card/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, ID, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select 
                value={selectedCategory === null ? "all" : String(selectedCategory)}
                onValueChange={(value) => setSelectedCategory(value === "all" ? null : parseInt(value))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categories List" />
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
              <Button variant="shield" size="sm" className="gap-2">
                <Bot className="w-4 h-4" /> Create Custom Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground font-body">
              Showing {filteredAgents.length} agents
            </p>
          </div>

          <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}>
            {filteredAgents.slice(0, 48).map((agent, index) => (
              <ScrollAnimationWrapper key={agent.id} delay={Math.min(index * 0.02, 0.3)}>
                <AgentCard agent={agent} showCategory={selectedCategory === null} />
              </ScrollAnimationWrapper>
            ))}
          </div>

          {filteredAgents.length > 48 && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground font-body mb-4">
                Showing 48 of {filteredAgents.length} agents
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast.info("Showing all agents might affect performance. Please use search or categories to find specific agents.");
                }}
              >
                Load More Agents
              </Button>
            </div>
          )}

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

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || agent.categoryNumber === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
              AI Agent Registry
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
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 gap-1">
              <TabsTrigger value="overview" className="text-xs">Agents Global Overview</TabsTrigger>
              <TabsTrigger value="dashboard" className="text-xs">Dashboard</TabsTrigger>
              <TabsTrigger value="deployed" className="text-xs">Deployed Agents</TabsTrigger>
              <TabsTrigger value="managed" className="text-xs">Managed Agents</TabsTrigger>
              <TabsTrigger value="marketplace" className="text-xs">S.H.I.E.L.D. AI Agent Marketplace</TabsTrigger>
              <TabsTrigger value="discover" className="text-xs">Discover Agents</TabsTrigger>
              <TabsTrigger value="subscriptions" className="text-xs">My Subscriptions</TabsTrigger>
              <TabsTrigger value="collaboration" className="text-xs">Collaboration</TabsTrigger>
              <TabsTrigger value="training" className="text-xs">Training Agents</TabsTrigger>
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
              <div className="text-center py-20">
                <Power className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Deployed Agents</h2>
                <p className="text-muted-foreground">Manage currently deployed agents.</p>
                <Button className="mt-4" variant="shield">
                  View Deployed Agents
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="managed" className="mt-6">
              <div className="text-center py-20">
                <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Managed Agents</h2>
                <p className="text-muted-foreground">Configure and manage agent settings.</p>
              </div>
            </TabsContent>

            <TabsContent value="marketplace" className="mt-6">
              <div className="text-center py-20">
                <ShieldCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">S.H.I.E.L.D. AI Agent Marketplace</h2>
                <p className="text-muted-foreground">Browse and purchase premium agents.</p>
              </div>
            </TabsContent>

            <TabsContent value="discover" className="mt-6">
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Discover Agents</h2>
                <p className="text-muted-foreground">Find new agents based on your needs.</p>
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-6">
              <div className="text-center py-20">
                <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">My Subscriptions</h2>
                <p className="text-muted-foreground">Manage your agent subscriptions.</p>
              </div>
            </TabsContent>

            <TabsContent value="collaboration" className="mt-6">
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Collaboration</h2>
                <p className="text-muted-foreground">Work with other users on agent projects.</p>
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-display text-foreground mb-2">Training Agents</h2>
                <p className="text-muted-foreground">Train and customize agent behaviors.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agents;
