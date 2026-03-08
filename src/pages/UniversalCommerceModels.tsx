import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Zap, Network, ShoppingBag, Shield, Users, Bot, Monitor, Briefcase, Building2, Code2, Factory, Landmark, Scale, Cpu, Layers, AppWindow, UserCog, ChevronDown, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { commerceModels } from "@/data/commerceModels";

const models = [
  { id: "A2X", label: "Account", desc: "Account to Everything", icon: Users, detail: "Enables account-level transactions across all entity types — wallets, services, platforms, and networks." },
  { id: "AG2X", label: "Agent", desc: "Agent to Everything", icon: Bot, detail: "AI agents autonomously transact, negotiate, and execute commerce with any connected entity." },
  { id: "AI2X", label: "AI", desc: "AI to Everything", icon: Cpu, detail: "AI-driven commerce connecting machine intelligence to businesses, consumers, governments, and more." },
  { id: "AV2X", label: "Avatar", desc: "Avatar to Everything", icon: Monitor, detail: "Digital avatars engage in commerce within metaverse, virtual, and augmented reality environments." },
  { id: "B2X", label: "Business", desc: "Business to Everything", icon: Briefcase, detail: "Enterprise-grade B2X connecting businesses to consumers, governments, institutions, and machines." },
  { id: "C2X", label: "Consumer", desc: "Consumer to Everything", icon: ShoppingBag, detail: "Consumer-initiated transactions to businesses, governments, other consumers, and digital entities." },
  { id: "D2X", label: "Direct", desc: "Direct to Everything", icon: Zap, detail: "Peer-to-peer and direct commerce channels bypassing intermediaries for faster settlement." },
  { id: "DAO2X", label: "DAO", desc: "DAO to Everything", icon: Network, detail: "Decentralized autonomous organizations transacting with all entity types on-chain and off-chain." },
  { id: "DEV2X", label: "Developer", desc: "Developer to Everything", icon: Code2, detail: "Developer ecosystem commerce — APIs, SDKs, marketplace integrations, and platform contributions." },
  { id: "E2X", label: "Employee", desc: "Employee to Everything", icon: Users, detail: "Employee-driven commerce including payroll, benefits, internal marketplaces, and B2E services." },
  { id: "G2X", label: "Government", desc: "Government to Everything", icon: Landmark, detail: "Government transactions with citizens, businesses, institutions, and cross-border entities." },
  { id: "I2X", label: "Institution", desc: "Institution to Everything", icon: Building2, detail: "Institutional commerce spanning banks, universities, healthcare systems, and sovereign entities." },
  { id: "ID2X", label: "Identity", desc: "Identity to Everything", icon: Shield, detail: "Identity-verified transactions ensuring KYC/AML compliance across all commerce models." },
  { id: "LAW2X", label: "Law", desc: "Legal/Compliance to Everything", icon: Scale, detail: "Legal and compliance-driven commerce — smart contracts, regulatory frameworks, and dispute resolution." },
  { id: "M2X", label: "Machine", desc: "Machine to Everything", icon: Cpu, detail: "Machine-to-machine autonomous commerce including IoT payments, supply chain, and robotics." },
  { id: "MF2X", label: "Manufacturer", desc: "Manufacturer to Everything", icon: Factory, detail: "Manufacturer direct commerce — D2C, B2B supply chain, and industrial marketplace integration." },
  { id: "N2X", label: "Many", desc: "Many to Everything", icon: Layers, detail: "Multi-party commerce enabling crowdfunding, group purchasing, and collective transactions." },
  { id: "P2X", label: "Prosumer", desc: "Prosumer to Everything", icon: UserCog, detail: "Prosumers who both produce and consume — energy trading, content creation, and platform economies." },
  { id: "Apps2X", label: "Apps", desc: "Apps to Everything", icon: AppWindow, detail: "Application-layer commerce — in-app purchases, SaaS integrations, and cross-platform transactions." },
  { id: "AD2X", label: "Administration", desc: "Administration to Everything", icon: Building2, detail: "Administrative commerce spanning procurement, resource allocation, and operational management." },
];

const transactionFramework = [
  { title: "Instant Settlement", desc: "Sub-second transaction finality across all X2X models via distributed ledger technology.", icon: Zap },
  { title: "Cross-Border Native", desc: "Every model supports multi-currency, multi-jurisdiction commerce with built-in compliance.", icon: Globe },
  { title: "AI-Orchestrated", desc: "S.H.I.E.L.D. AI optimizes routing, pricing, and risk assessment for every transaction.", icon: Bot },
  { title: "Identity-Verified", desc: "All transactions flow through the ID2X identity layer ensuring trust and regulatory compliance.", icon: Shield },
];

import type { CommerceModel } from "@/data/commerceModels";

const X2XAccordion = ({ model, searchQuery }: { model: CommerceModel; searchQuery: string }) => {
  const [open, setOpen] = useState(false);

  const filteredConnections = searchQuery
    ? model.connections.filter(
        (c) =>
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : model.connections;

  // Auto-open if search matches connections but not the parent
  const hasMatchingConnections = searchQuery && filteredConnections.length > 0;
  const isOpen = open || !!hasMatchingConnections;

  if (searchQuery && filteredConnections.length === 0) return null;
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-display font-bold text-primary">{model.id}</span>
          <span className="text-sm text-foreground font-display">— {model.fullLabel}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">({filteredConnections.length} pathways)</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4 pt-0">
              {filteredConnections.map((conn) => (
                <div key={conn.code} className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-mono font-bold text-primary min-w-[80px]">{conn.code}</span>
                  <span className="text-xs text-muted-foreground">{conn.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UniversalCommerceModels = () => {
  const [pathwaySearch, setPathwaySearch] = useState("");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container relative z-10 px-4 text-center">
          <ScrollAnimationWrapper>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-primary font-display text-sm tracking-widest uppercase mb-4">X2X Transaction Framework</p>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Universal <span className="gradient-text">Commerce Models</span>
              </h1>
              <p className="text-lg text-primary font-display mb-2">380+ Commerce Models</p>
              <p className="text-muted-foreground max-w-3xl mx-auto font-body">
                Every entity connects to every other entity. 20 primary models × 19 target connections = 380 unique commerce pathways powering the future of global transactions.
              </p>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* X2X Grid */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimationWrapper>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">
                20 Primary <span className="gradient-text">X2X Models</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Each model connects to all 19 other entity types, creating a fully interconnected commerce mesh.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <TooltipProvider>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {models.map((model, i) => (
                <ScrollAnimationWrapper key={model.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className="glass-card rounded-xl p-5 text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      >
                        <model.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-lg font-display font-bold text-primary mb-1">{model.id}</div>
                        <div className="text-xs font-display text-foreground mb-1">{model.label}</div>
                        <div className="text-[10px] text-muted-foreground">{model.desc}</div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs text-xs">
                      <p className="font-semibold mb-1">{model.id} — {model.label}</p>
                      <p>{model.detail}</p>
                    </TooltipContent>
                  </Tooltip>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </section>

      {/* Transaction Framework Capabilities */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimationWrapper>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">
                X2X Transaction <span className="gradient-text">Framework</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                The infrastructure powering every commerce model with speed, compliance, and intelligence.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {transactionFramework.map((item, i) => (
              <ScrollAnimationWrapper key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Global Transaction Stats */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { value: "$∞", label: "Annual Volume", icon: "💲" },
              { value: "∞", label: "Merchants", icon: "#" },
              { value: "99.9%", label: "Success Rate", icon: "%" },
              { value: "0%", label: "Transaction Fees", icon: "0%" },
              { value: "Instant", label: "Settlement", icon: "⚡" },
              { value: "150+", label: "Currencies", icon: "🌐" },
            ].map((stat, i) => (
              <ScrollAnimationWrapper key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-display">{stat.label}</div>
                </motion.div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimationWrapper>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">
                380+ Commerce <span className="gradient-text">Pathways</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm mb-6">
                Search or expand each primary model to explore all its target connections.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search pathways… e.g. B2C, Machine, DAO"
                  value={pathwaySearch}
                  onChange={(e) => setPathwaySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
          </ScrollAnimationWrapper>

          <div className="max-w-4xl mx-auto space-y-3">
            {commerceModels.map((model) => (
              <X2XAccordion key={model.id} model={model} searchQuery={pathwaySearch} />
            ))}
            {pathwaySearch && commerceModels.every((m) => {
              const q = pathwaySearch.toLowerCase();
              return !m.id.toLowerCase().includes(q) &&
                !m.label.toLowerCase().includes(q) &&
                !m.fullLabel.toLowerCase().includes(q) &&
                m.connections.every((c) => !c.code.toLowerCase().includes(q) && !c.label.toLowerCase().includes(q));
            }) && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No pathways found for "{pathwaySearch}"
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Connection Matrix Visual */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollAnimationWrapper>
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                The Commerce <span className="gradient-text">Mesh</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-sm max-w-2xl mx-auto">
                Every primary model creates 19 unique pathways. With 20 models, the Universal Commerce framework generates 380+ distinct transaction types — the most comprehensive commerce protocol ever designed.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                <div className="glass-card rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">20</div>
                  <div className="text-[10px] text-muted-foreground">Primary Models</div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">19</div>
                  <div className="text-[10px] text-muted-foreground">Target Connections</div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">380+</div>
                  <div className="text-[10px] text-muted-foreground">Commerce Models</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                "Seest thou a man diligent in his business? he shall stand before kings." — Proverbs 22:29
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UniversalCommerceModels;
