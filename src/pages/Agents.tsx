import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { agents, agentCategories, Agent } from "@/data/agents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, ArrowLeft, Bot, Users, Cpu, 
  Settings, Palette, Video, Wand2, Crown, Briefcase,
  TrendingUp, ShieldCheck, BarChart, BookOpen, Wallet,
  Gamepad2, Heart, HandHeart, Scale, Truck, Car,
  Calendar, Home, Book, Star, Lock, Server, Globe,
  RefreshCw, Activity, Leaf, Gem, Sun, Rocket
} from "lucide-react";

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
            <p className="text-xs text-primary/70 font-mono mb-1">{agent.id}</p>
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
  const agent = agents.find(a => a.id === agentId);
  const category = agent ? agentCategories.find(c => c.number === agent.categoryNumber) : null;
  const IconComponent = category ? iconMap[category.icon] || Bot : Bot;
  const relatedAgents = agent ? agents.filter(a => a.categoryNumber === agent.categoryNumber && a.id !== agent.id).slice(0, 6) : [];

  if (!agent) {
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

      <ScrollAnimationWrapper>
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
              <IconComponent className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-1">
              <Badge variant="outline" className="mb-2">{agent.id}</Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {agent.name}
              </h1>
              <p className="text-lg text-muted-foreground font-body mb-4">
                Category: {agent.category}
              </p>
              {agent.isCategory && (
                <Badge className="bg-primary/20 text-primary border-primary/50">
                  Category Lead Agent
                </Badge>
              )}
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* Agent Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ScrollAnimationWrapper>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Capabilities</h2>
            <ul className="space-y-2 text-muted-foreground font-body">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Intelligent task processing and automation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Multi-modal input and output handling
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Real-time learning and adaptation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Cross-agent collaboration support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Scriptural alignment verification
              </li>
            </ul>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.1}>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Specifications</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body">Status</span>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body">Response Time</span>
                <span className="text-foreground">&lt;100ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body">Availability</span>
                <span className="text-foreground">99.99%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-body">Category</span>
                <span className="text-foreground">{category?.name || "Unknown"}</span>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Related Agents */}
      {relatedAgents.length > 0 && (
        <ScrollAnimationWrapper>
          <h2 className="text-2xl font-display font-bold gradient-text mb-6">
            Related Agents
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedAgents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </ScrollAnimationWrapper>
      )}
    </div>
  );
};

const Agents = () => {
  const { agentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Explore our comprehensive registry of {agents.length}+ specialized AI agents 
              across {agentCategories.length} categories.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 px-4 border-y border-border/50 bg-card/20 sticky top-16 md:top-20 z-40 backdrop-blur-xl">
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
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={selectedCategory === null ? "shield" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {agentCategories.slice(0, 8).map((cat) => (
                <Button
                  key={cat.number}
                  variant={selectedCategory === cat.number ? "shield" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.number)}
                  className="whitespace-nowrap"
                >
                  {cat.name.split(" ")[0]}
                </Button>
              ))}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

      <Footer />
    </div>
  );
};

export default Agents;
