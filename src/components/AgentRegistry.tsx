import { useState, useMemo } from "react";
import { Search, Users, Filter, ChevronDown, Bot, Cpu, Shield as ShieldIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { agents, agentCategories, totalAgents, totalCategories, Agent } from "@/data/agents";

const AgentRegistry = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || agent.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const displayedCategories = showAllCategories
    ? agentCategories
    : agentCategories.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="agents" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-shield-accent/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Universal AI Agent</span> Registry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body mb-6">
            Complete Sovereign Architecture with {totalAgents} AI Agents across {totalCategories} Categories
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">{totalAgents}</div>
              <div className="text-sm text-muted-foreground">Sovereign Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-shield-accent">{totalCategories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, ID, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className={!selectedCategory ? "border-primary text-primary" : ""}
            >
              <Filter className="w-4 h-4 mr-2" />
              All Categories
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {displayedCategories.map((cat) => (
              <Button
                key={cat.number}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`text-xs ${
                  selectedCategory === cat.name
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
          
          {!showAllCategories && agentCategories.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCategories(true)}
              className="text-muted-foreground"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              Show all {totalCategories} categories
            </Button>
          )}
        </div>

        {/* Agent Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto"
        >
          {filteredAgents.slice(0, 48).map((agent) => (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              className={`group glass-card rounded-xl p-4 hover:border-primary/50 transition-all duration-300 ${
                agent.isCategory ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 p-2 rounded-lg ${
                  agent.isCategory 
                    ? "bg-primary/20 text-primary" 
                    : "bg-shield-accent/10 text-shield-accent"
                }`}>
                  {agent.isCategory ? <Cpu className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs font-mono shrink-0">
                      H.I.I. {agent.id}
                    </Badge>
                    {agent.isCategory && (
                      <Badge className="text-xs bg-primary/20 text-primary border-0">
                        Category
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-display font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{agent.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredAgents.length > 48 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground font-body">
              Showing 48 of {filteredAgents.length} agents
            </p>
          </div>
        )}

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">No agents found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentRegistry;
