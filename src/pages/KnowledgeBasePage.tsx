import { useState, useMemo } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { 
  BookOpen, Search, Filter, Database, Shield, Globe, 
  Cpu, Wallet, Users, Scale, Heart, Zap, Building,
  BookText, Sparkles, ChevronRight, Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { knowledgeBase, scriptures } from "@/data/knowledgeBase";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const platformFeatures = [
  {
    id: "ai-agents",
    title: "AI-Agents System",
    category: "Technology",
    icon: Cpu,
    description: "402+ Universal Unified AI Agents with H.I.I. AI numbering system. Includes Custom, Clone, Twin, Trustee, Affiliate, and Payment agents across 33 categories.",
    details: [
      "Custom AI Agent creation and deployment",
      "AI Clone and Twin technology",
      "Trustee and Affiliate agent networks",
      "Payment processing agents",
      "Multi-Agent System coordination",
    ],
  },
  {
    id: "ai-ledger",
    title: "AI-Ledger System",
    category: "Technology",
    icon: Database,
    description: "Distributed Ledger Technology with Directed Acyclic Graph (DAG) beyond 15B+ TPS with no transaction fees and unlimited scalability.",
    details: [
      "DAG/DLT Settlement infrastructure",
      "Real-Time Gross Settlement (RTGS)",
      "15B+ transactions per second",
      "Zero transaction fees",
      "Infinite scalability",
    ],
  },
  {
    id: "ai-governance",
    title: "AI-Governance Module",
    category: "Compliance",
    icon: Scale,
    description: "Policy, ethics, audit, and compliance systems aligned with divine law and international regulations.",
    details: [
      "Automated policy enforcement",
      "Ethics verification engine",
      "Comprehensive audit trails",
      "Regulatory compliance monitoring",
      "Divine law alignment checks",
    ],
  },
  {
    id: "ai-identity",
    title: "AI-Identity System",
    category: "Technology",
    icon: Users,
    description: "Avatar, Hologram, and Metaverse presence management for digital identity in all virtual and physical environments.",
    details: [
      "Digital avatar creation",
      "Hologram projection support",
      "Metaverse presence management",
      "Identity verification",
      "Cross-platform identity sync",
    ],
  },
  {
    id: "ai-economy",
    title: "AI-Economy Engine",
    category: "Finance",
    icon: Wallet,
    description: "Tokens, markets, funding, and smart trade systems with unlimited use and no credit constraints.",
    details: [
      "Token creation and management",
      "Market analysis and trading",
      "Funding and investment platforms",
      "Smart contract execution",
      "No credit system required",
    ],
  },
  {
    id: "ai-knowledge",
    title: "AI-Knowledge Engine",
    category: "Education",
    icon: BookOpen,
    description: "Scriptural, historical, and truth engines providing access to divine wisdom and verified knowledge.",
    details: [
      "Scriptural reference engine",
      "Historical truth verification",
      "AHAYAH YASHAYA Bible integration",
      "Multi-language translation",
      "Educational content delivery",
    ],
  },
  {
    id: "blanch-corridor",
    title: "The Blanch Corridor",
    category: "Infrastructure",
    icon: Globe,
    description: "Global network of eco-friendly smart cities forming a unified Global Resource Economy.",
    details: [
      "Smart city infrastructure",
      "Business and finance hubs",
      "Clean entertainment centers",
      "Philanthropy networks",
      "Recreation and wellness zones",
    ],
  },
  {
    id: "heed-program",
    title: "H.E.E.D. Program",
    category: "Programs",
    icon: Heart,
    description: "Health, Education, Enterprising, and Development framework for global community stabilization.",
    details: [
      "Health initiatives and support",
      "Educational programs",
      "Enterprise development",
      "Community development",
      "Sustainable growth",
    ],
  },
];

const businessModels = [
  { code: "A2X", name: "Account to Everything", description: "Enables any account—bank, wallet, or platform—to transact, communicate, and settle with every entity in the ecosystem." },
  { code: "AG2X", name: "Agent to Everything", description: "AI Agents autonomously interact with all nodes: executing trades, managing workflows, and coordinating across systems." },
  { code: "AI2X", name: "AI to Everything", description: "Core AI engine connecting intelligence layers to every service, user, device, and governance module." },
  { code: "AV2X", name: "Avatar to Everything", description: "Digital avatars represent users across metaverse, commerce, social, and governance environments seamlessly." },
  { code: "B2X", name: "Business to Everything", description: "Enterprises connect to consumers, governments, machines, and other businesses through unified commerce rails." },
  { code: "C2X", name: "Consumer to Everything", description: "Consumers access all marketplace services, governance tools, and peer-to-peer networks from a single identity." },
  { code: "D2X", name: "Direct to Everything", description: "Peer-to-peer direct channels bypassing intermediaries for payments, communication, and resource sharing." },
  { code: "DAO2X", name: "DAO to Everything", description: "Decentralized Autonomous Organizations govern, fund, and coordinate with all ecosystem participants." },
  { code: "DEV2X", name: "Developer to Everything", description: "Developers build, deploy, and monetize applications across every platform layer and marketplace." },
  { code: "E2X", name: "Employee to Everything", description: "Workforce members interact with payroll, benefits, training, governance, and collaboration tools universally." },
  { code: "G2X", name: "Government to Everything", description: "Government bodies interface with citizens, businesses, institutions, and compliance systems at scale." },
  { code: "I2X", name: "Institution to Everything", description: "Institutional entities—banks, universities, NGOs—connect to all commerce, identity, and governance layers." },
  { code: "ID2X", name: "Identity to Everything", description: "Sovereign digital identity verifies, authenticates, and authorizes across every transaction and interaction." },
  { code: "LAW2X", name: "Legal/Compliance to Everything", description: "Legal frameworks, KYC/AML, and compliance engines enforce regulations across all ecosystem activity." },
  { code: "M2X", name: "Machine to Everything", description: "IoT devices, robots, and autonomous systems transact, report, and coordinate with all network participants." },
  { code: "MF2X", name: "Manufacturer to Everything", description: "Manufacturers connect supply chains, distribution, retail, and logistics through integrated commerce." },
  { code: "N2X", name: "Many to Everything", description: "Multi-party and collective models enabling group purchasing, crowdfunding, and collaborative governance." },
  { code: "P2X", name: "Prosumer to Everything", description: "Producer-consumers who both create and consume value interact with every marketplace and service layer." },
  { code: "Apps2X", name: "Apps to Everything", description: "Applications integrate with all platform services, APIs, agents, and user-facing tools natively." },
  { code: "AD2X", name: "Administration to Everything", description: "Administrative functions—HR, operations, resource management—connect to all organizational and external systems." },
];

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    knowledgeBase.forEach(item => cats.add(item.category));
    platformFeatures.forEach(item => cats.add(item.category));
    return Array.from(cats);
  }, []);

  const filteredKnowledge = useMemo(() => {
    return knowledgeBase.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredFeatures = useMemo(() => {
    return platformFeatures.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-8">
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              Knowledge Base
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body mb-8">
              Comprehensive documentation of BLANCH S.H.I.E.L.D. AI platform features, 
              technology, and organizational knowledge.
            </p>

            {/* Search Bar - Above Everything */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-base bg-card/50 border-border/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 px-4 border-y border-border/50 bg-card/20 sticky top-16 md:top-20 z-40 backdrop-blur-xl">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={selectedCategory === null ? "shield" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "shield" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="features" className="space-y-8">
            <TabsList className="bg-card/50 border border-border/30">
              <TabsTrigger value="features">Platform Features</TabsTrigger>
              <TabsTrigger value="knowledge">Organization Knowledge</TabsTrigger>
              <TabsTrigger value="scriptures">Scriptural Foundation</TabsTrigger>
              <TabsTrigger value="commerce">Commerce Models</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredFeatures.map((feature, index) => (
                  <ScrollAnimationWrapper key={feature.id} delay={index * 0.05}>
                    <Card className="bg-card/30 border-border/50 h-full hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <feature.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">{feature.category}</Badge>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">{feature.description}</CardDescription>
                        <ul className="space-y-2">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="w-4 h-4 text-primary" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="knowledge">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKnowledge.map((item, index) => (
                  <ScrollAnimationWrapper key={item.id} delay={index * 0.05}>
                    <Card className="bg-card/30 border-border/50 h-full hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit mb-2">{item.category}</Badge>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">{item.content}</CardDescription>
                        {item.scriptures && item.scriptures.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.scriptures.map((ref) => (
                              <Badge key={ref} className="bg-primary/10 text-primary border-primary/20">
                                <BookText className="w-3 h-3 mr-1" />
                                {ref}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scriptures">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {scriptures.map((scripture, index) => (
                  <ScrollAnimationWrapper key={scripture.reference} delay={index * 0.05}>
                    <Card className="bg-card/30 border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <BookText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <blockquote className="text-muted-foreground italic font-body mb-3">
                              "{scripture.text}"
                            </blockquote>
                            <cite className="text-primary font-display font-semibold">
                              — {scripture.reference}
                            </cite>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commerce">
              <div className="max-w-4xl mx-auto">
                <ScrollAnimationWrapper>
                  <Card className="bg-card/30 border-border/50 mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        Universal Commerce Models
                      </CardTitle>
                      <CardDescription>
                        Complete business network models supporting all transaction types
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TooltipProvider delayDuration={200}>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {businessModels.map((model) => (
                            <Tooltip key={model.code}>
                              <TooltipTrigger asChild>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group">
                                  <p className="text-2xl font-display font-bold text-primary mb-1">
                                    {model.code}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{model.name}</p>
                                  <Info className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary/60 mx-auto mt-2 transition-colors" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs text-center">
                                <p>{model.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </TooltipProvider>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>

                <ScrollAnimationWrapper delay={0.1}>
                  <Card className="bg-card/30 border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Extended Commerce Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="p-3 rounded-lg bg-card/50">Agent to Avatar (A2Av)</div>
                        <div className="p-3 rounded-lg bg-card/50">Avatar to Metaverse (Av2M)</div>
                        <div className="p-3 rounded-lg bg-card/50">Business to Government (B2G)</div>
                        <div className="p-3 rounded-lg bg-card/50">Consumer to Consumer (C2C)</div>
                        <div className="p-3 rounded-lg bg-card/50">Government to Citizen (G2C)</div>
                        <div className="p-3 rounded-lg bg-card/50">Machine to Agent (M2A)</div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnowledgeBasePage;
