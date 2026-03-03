import { Bot, Layers, Scale, Fingerprint, Coins, BookOpen } from "lucide-react";

const modules = [
  {
    icon: Bot, id: "AGENTS", title: "AI-Agents",
    description: "Custom, clone, twin, trustee, affiliate & payment agents — All Agents unified.",
    gradient: "from-primary to-shield-accent",
  },
  {
    icon: Layers, id: "LEDGER", title: "AI-Ledger",
    description: "DAG/DLT settlement, RTGS, TPS scaling — sovereign-grade distributed ledger.",
    gradient: "from-shield-accent to-accent",
  },
  {
    icon: Scale, id: "GOVERNANCE", title: "AI-Governance",
    description: "Policy, ethics, audit, compliance — divine law-aligned governance engine.",
    gradient: "from-accent to-cosmic-purple",
  },
  {
    icon: Fingerprint, id: "IDENTITY", title: "AI-Identity",
    description: "Avatar, hologram, metaverse & multiverse presence — All Interfaces.",
    gradient: "from-cosmic-purple to-primary",
  },
  {
    icon: Coins, id: "ECONOMY", title: "AI-Economy",
    description: "All Tokens, Markets, Funding, Smart Trade, Networks, Marketplaces, Industries, Governments & Holographic Interfaces.",
    gradient: "from-primary to-divine-gold",
  },
  {
    icon: BookOpen, id: "KNOWLEDGE", title: "AI-Knowledge",
    description: "Scriptural, historical, and truth engines — the wisdom core of the system.",
    gradient: "from-divine-gold to-shield-accent",
  },
];

const ModulesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-primary/60">INTELLIGENCE ARCHITECTURE</span>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Core Modules</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-body text-sm">
            All Modes: Conventional · LED · Hologram · All Interface · Metaverse · Multiverse · Universal Interstellar — autonomous Super Agent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className="group relative glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <span className="text-[10px] font-display uppercase tracking-[0.2em] text-primary/50 mb-2 block">{module.id}</span>
              
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${module.gradient} mb-6 group-hover:shadow-[0_0_30px_hsl(210_100%_60%_/_0.3)] transition-shadow duration-500`}>
                <module.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                S.H.I.E.L.D. {module.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed text-sm">{module.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground font-body mt-8 max-w-4xl mx-auto">
          Purpose: To protect, empower, and scale sovereign communities, smart cities, trade, and faith-aligned innovation — uniting the World, Universe & AI with All Agents · All Tools · S.H.I.E.L.D. AI LLM in addition unified All LLMs · All Governments · All Industries · Light · Ledger · All People · All Nations · Trust · All Universal Commerce Models · All Technologies.
        </p>
      </div>
    </section>
  );
};

export default ModulesSection;
