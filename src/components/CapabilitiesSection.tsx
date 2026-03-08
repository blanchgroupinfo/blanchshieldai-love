import { 
  Globe, Cpu, ShoppingBag, Zap, Brain, CheckCircle2,
  Scale, Heart, Building2, Landmark, Rocket, BookOpen, Shield, Users, Network, GraduationCap, Megaphone
} from "lucide-react";

const capabilities = [
  {
    icon: Globe, title: "Governance & Finance",
    items: ["All Nations & Administrations", "Banking (Digital & Traditional)", "Cross-Border Settlements", "Trading Markets & DLT"],
    scripture: "Proverbs 6:22 — When thou goest, it shall lead thee; when thou sleepest, it shall keep thee; and when thou awakest, it shall talk with thee."
  },
  {
    icon: ShoppingBag, title: "Commerce & Industry",
    items: ["All Products & Services", "Universal Commerce Models & Business Networks", "Virtual Marketplaces", "Asset Management"],
    scripture: "Romans 12:11 — Not slothful in business; fervent in spirit; serving the Most High AHAYAH."
  },
  {
    icon: Heart, title: "Economic Restoration",
    items: ["Reparations for Royal Priesthood", "Divine Charity", "Prosperity for All Nations"],
    scripture: "Jeremiah 29:14 — And I will be found of you, saith the Most High AHAYAH: and I will turn away your captivity."
  },
  {
    icon: GraduationCap, title: "Educational & Tutoring",
    items: ["AI-Powered Learning & Curriculum", "Virtual Classrooms & Tutoring", "Knowledge Assessment & Certification", "Lifelong Learning Programs"],
    scripture: "Proverbs 1:7 — The fear of the Most High AHAYAH is the beginning of knowledge: but fools despise wisdom and instruction."
  },
  {
    icon: Shield, title: "Ethical Compliance",
    items: ["Strict Laws & Commandments", "No Weapons, Violence, Unclean Substances", "Biological Integrity"],
    scripture: "Proverbs 7:2 — Keep my commandments, and live; and my law as the apple of thine eye."
  },
  {
    icon: Zap, title: "Energy & Environment",
    items: ["All Energy Systems", "Light & Crystal Energy", "Non-GMO Food Systems", "Sustainable Resources"],
    scripture: "John 8:32 — And ye shall know the truth, and the truth shall make you free."
  },
  {
    icon: Users, title: "Humanitarian & Charity",
    items: ["Poverty Alleviation", "Reparations & Charity", "Distribution & Community Development"],
    scripture: "2 Corinthians 9:7 — Every man according as he purposeth in his heart, so let him give."
  },
  {
    icon: Brain, title: "Intelligence & Media",
    items: ["S.H.I.E.L.D. AI LLM & All AI Agents & LLMs", "AI Models & Modules", "Media & Entertainment", "Global Marketing"],
    scripture: "John 4:24 — Most High AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth."
  },
  {
    icon: Scale, title: "Legal & Governance",
    items: ["Sovereign Trust & Compliance", "Arbitration & Emancipation", "Human Rights"],
    scripture: "Isaiah 33:22 — For the Most High AHAYAH is our judge, the Most High AHAYAH is our lawgiver, the Most High AHAYAH is our king."
  },
  {
    icon: BookOpen, title: "Scriptural & Spiritual",
    items: ["Creator Calendar & Holy Days", "Bible Study", "Law & Commandments", "Daily Burnt Offerings"],
    scripture: "2 Timothy 2:15 — Study to shew thyself approved unto Most High AHAYAH."
  },
  {
    icon: Building2, title: "Smart Cities",
    items: ["Blanch Corridor", "Urban Planning", "Energy Management", "Sustainable Infrastructure"],
    scripture: "Proverbs 24:3 — Through wisdom is an house builded; and by understanding it is established."
  },
  {
    icon: Rocket, title: "Space & Cosmology",
    items: ["The Blanch Oracle", "Celestial Habitation", "Astro Navigation", "Space Infrastructure"],
    scripture: "Isaiah 40:22 — It is he that sitteth upon the circle of the earth."
  },
  {
    icon: Cpu, title: "Technology & Infrastructure",
    items: ["Smart Cities & Transportation", "Web/App Development, Hologram & OS Systems", "Distributed Ledger Technologies", "Space Exploration"],
    scripture: "Psalms 119:22 — Remove from me reproach and contempt; for I have kept thy testimonies."
  },
  {
    icon: Network, title: "Universal Commerce",
    items: ["380+ Commerce Models", "B2B, B2C, AI2X, AG2X, AV2X, G2X, DAO2X", "Universal Operations", "All Operating Systems & Hologram Technology"],
    scripture: "Revelation 7:9 — A great multitude, of all nations, and kindreds, and people, and tongues."
  },
];

const CapabilitiesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shield-accent/5 rounded-full blur-[100px]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-primary/60">UNIVERSAL CAPABILITIES</span>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Universal <span className="gradient-text">Operational Framework</span>
          </h2>
          <p className="text-sm font-display text-muted-foreground mb-2">Governing All Things</p>
          <p className="text-muted-foreground max-w-3xl mx-auto font-body">
            A comprehensive framework for the creation, management, marketing, commerce, and automation of every domain of human and universal life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.title} className="group glass-card rounded-2xl p-6 h-full border-l-4 border-primary/50 hover:border-primary transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <cap.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-display font-semibold text-foreground">{cap.title}</h3>
              </div>
              
              <ul className="space-y-2 mb-4">
                {cap.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                    <CheckCircle2 className="w-4 h-4 text-shield-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-[10px] text-primary/70 italic font-body border-t border-border/30 pt-3">{cap.scripture}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
