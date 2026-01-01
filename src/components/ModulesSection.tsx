import { 
  Bot, 
  Layers, 
  Scale, 
  Fingerprint, 
  Coins, 
  BookOpen 
} from "lucide-react";

const modules = [
  {
    icon: Bot,
    title: "AI Agents",
    description: "Custom, clone, twin, trustee, affiliate & payment agents for sovereign automation",
    gradient: "from-primary to-shield-accent",
  },
  {
    icon: Layers,
    title: "AI Ledger",
    description: "DAG/DLT settlement, RTGS, and high-throughput TPS scaling infrastructure",
    gradient: "from-shield-accent to-accent",
  },
  {
    icon: Scale,
    title: "AI Governance",
    description: "Policy, ethics, audit, and compliance aligned with divine law",
    gradient: "from-accent to-cosmic-purple",
  },
  {
    icon: Fingerprint,
    title: "AI Identity",
    description: "Avatar, hologram, metaverse & multiverse presence systems",
    gradient: "from-cosmic-purple to-primary",
  },
  {
    icon: Coins,
    title: "AI Economy",
    description: "Tokens, markets, funding, smart trade & universal commerce models",
    gradient: "from-primary to-divine-gold",
  },
  {
    icon: BookOpen,
    title: "AI Knowledge",
    description: "Scriptural, historical, and truth engines with ancient text intelligence",
    gradient: "from-divine-gold to-shield-accent",
  },
];

const ModulesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Core Modules</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            A comprehensive framework for the creation, management, and automation of all aspects of universal life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className="group relative glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                   style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
              
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${module.gradient} mb-6 group-hover:shadow-[0_0_30px_hsl(210_100%_60%_/_0.3)] transition-shadow duration-500`}>
                <module.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                BLANCH S.H.I.E.L.D. {module.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
