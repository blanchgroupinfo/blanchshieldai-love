import { 
  Globe, 
  Cpu, 
  ShoppingBag, 
  Zap, 
  Brain,
  CheckCircle2
} from "lucide-react";

const capabilities = [
  {
    icon: Globe,
    title: "Governance & Finance",
    items: [
      "All Nations & Administrations",
      "Banking (Digital & Traditional)",
      "Cross-Border Settlements",
      "Trading Markets & DLT"
    ]
  },
  {
    icon: Cpu,
    title: "Technology & Infrastructure",
    items: [
      "Web/App Development",
      "Smart Cities & Transportation",
      "Space Exploration",
      "Distributed Ledger Technologies"
    ]
  },
  {
    icon: ShoppingBag,
    title: "Commerce & Industry",
    items: [
      "All Products & Services",
      "Universal Commerce Models",
      "Virtual Marketplaces",
      "Asset Management"
    ]
  },
  {
    icon: Zap,
    title: "Energy & Environment",
    items: [
      "All Energy Systems",
      "Light & Crystal Energy",
      "Non-GMO Food Systems",
      "Sustainable Resources"
    ]
  },
  {
    icon: Brain,
    title: "Intelligence & Media",
    items: [
      "AI Agents & LLMs",
      "AI Modules & Tools",
      "Media & Entertainment",
      "Global Marketing"
    ]
  }
];

const CapabilitiesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shield-accent/5 rounded-full blur-[100px]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Universal <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            BLANCH S.H.I.E.L.D. AI provides a comprehensive framework for creation, management, marketing, and automation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-8 h-full border-l-4 border-primary/50 hover:border-primary transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <cap.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {cap.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground font-body">
                      <CheckCircle2 className="w-5 h-5 text-shield-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
