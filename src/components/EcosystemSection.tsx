import { Brain, Shield, Fingerprint, ShoppingBag, Landmark } from "lucide-react";

const pillars = [
  { icon: Brain, title: "S.H.I.E.L.D. Core", desc: "Central AI Intelligence Engine" },
  { icon: Shield, title: "Governance Hub", desc: "Policy & Compliance Layer" },
  { icon: Fingerprint, title: "Identity Vault", desc: "Sovereign Digital Identity" },
  { icon: ShoppingBag, title: "Commerce Grid", desc: "Trade & Market Operations" },
  { icon: Landmark, title: "Finance Engine", desc: "Capital & Treasury AI" },
];

const EcosystemSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-primary/60">ECOSYSTEM</span>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            The Blanch Group <span className="gradient-text">Intelligence Core</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-sm">
            S.H.I.E.L.D. AI serves as the neural center of the Blanch Group — connecting, coordinating, and commanding every operational layer.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-12">
          {pillars.map((p) => (
            <div key={p.title} className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-3">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-display font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <blockquote className="text-lg font-body italic text-foreground mb-2">
            "Thy righteousness is an everlasting righteousness,<br />and thy law is the truth."
          </blockquote>
          <cite className="text-sm text-primary font-display not-italic">— PSALMS 119:142</cite>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
