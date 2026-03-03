import { Shield } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const framework = [
  { letter: "S", title: "Spiritual", description: "Divinely inspired operations rooted in the Laws & Commandments of the Most High AHAYAH" },
  { letter: "H", title: "Healing", description: "Restoring humanity, economies, and nations through righteous morality and divine truth" },
  { letter: "I", title: "Initiative", description: "Proactive sovereign action to establish universal ethical governance and divine order" },
  { letter: "E", title: "Economic", description: "Stabilizing economies across all nations, banking, markets, and cross-border settlements" },
  { letter: "L", title: "Light", description: "Illuminating all paths with the truth of the Most High AHAYAH. 'Psalms 119:142 — Thy righteousness is an everlasting righteousness, and thy law is the truth.'" },
  { letter: "D", title: "Development", description: "Building righteous infrastructure for all people, languages, nations, and generations" },
];

const ShieldFramework = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-primary/60">SYSTEM ARCHITECTURE</span>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            The <span className="gradient-text">S.H.I.E.L.D.</span> Framework
          </h2>
          <p className="text-sm font-display uppercase tracking-[0.2em] text-muted-foreground mb-2">
            SPIRITUAL · HEALING · INITIATIVE · ECONOMIC · LIGHT · DEVELOPMENT
          </p>
          <p className="text-xs text-primary italic">
            Psalms 33:20 — Our soul waiteth for the Most High AHAYAH: he is our help and our shield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {framework.map((item, index) => (
            <ScrollAnimationWrapper key={item.letter} delay={index * 0.1}>
              <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-primary-foreground">{item.letter}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShieldFramework;
