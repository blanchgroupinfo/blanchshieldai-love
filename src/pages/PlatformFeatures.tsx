import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Cpu, Shield, Globe, BookOpen, Wallet, Lock, Cloud,
  Heart, Zap, ArrowRight, Layers, Activity, CheckCircle, RefreshCw,
} from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLATFORM, PLATFORM_FEATURES, FEATURE_CATEGORIES } from "@/data/platformConfig";

const categoryIcons: Record<string, React.ElementType> = {
  "AI & Intelligence": Cpu,
  "Core Platform": Layers,
  "Finance & Trading": Wallet,
  "Business & Commerce": Globe,
  "Governance & Law": Shield,
  "Infrastructure": Zap,
  "Technology": Activity,
  "Cloud & Storage": Cloud,
  "Spiritual & Cultural": BookOpen,
  "Community": Heart,
};

const PlatformFeatures = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFeatures = useMemo(() => {
    return PLATFORM_FEATURES.filter((f) => {
      const matchesSearch =
        !searchQuery ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Auto-Synced Platform</span>
              <CheckCircle className="w-3 h-3 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              {PLATFORM.platformName} Platform Features
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {PLATFORM_FEATURES.length} features powered by {PLATFORM.totalAgents} H.I.I. AI Agents across {PLATFORM.totalPillars} sovereign pillars.
              All features auto-sync in real-time.
            </p>
          </motion.div>

          {/* Search + Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All ({PLATFORM_FEATURES.length})
              </Button>
              {FEATURE_CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat] || Layers;
                const count = PLATFORM_FEATURES.filter((f) => f.category === cat).length;
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {cat} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Features", value: PLATFORM_FEATURES.length },
              { label: "AI Agents", value: PLATFORM.totalAgents },
              { label: "Sovereign Pillars", value: PLATFORM.totalPillars },
              { label: "Categories", value: FEATURE_CATEGORIES.length },
            ].map((s) => (
              <Card key={s.label} className="bg-card/50 border-border/30">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeatures.map((feature, i) => {
                const Icon = categoryIcons[feature.category] || Layers;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <Link to={feature.link}>
                      <Card className="bg-card/50 border-border/30 hover:border-primary/40 transition-all duration-300 h-full group">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-primary/10">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-sm">{feature.name}</CardTitle>
                                <Badge variant="outline" className="text-[10px] mt-1">
                                  {feature.category}
                                </Badge>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-[10px] text-green-500">Active & Synced</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {filteredFeatures.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No features match your search</p>
            </div>
          )}

          {/* Sync Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="w-3 h-3 animate-spin" />
              All features auto-sync across Knowledge Base, Command Center, and Admin Panel
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlatformFeatures;
