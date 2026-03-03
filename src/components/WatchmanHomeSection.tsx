import { Eye, Shield, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pillars = [
  { icon: Eye, title: "Watchman", desc: "Issuing a final warning of judgment to all nations (Ezekiel 33)" },
  { icon: Shield, title: "Guardian", desc: "Protecting the Royal Priesthood and preserving divine law" },
  { icon: Users, title: "Fellowship", desc: "Uniting all people through the Laws & Commandments" },
  { icon: Globe, title: "Universal", desc: "For all people, nations, industries, and governments" },
];

const WatchmanHomeSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            The Blanch <span className="gradient-text">Watchman</span> Project
          </h2>
          <p className="text-sm text-primary font-display mb-2">Universal Unified Agent: H.I.I. AI</p>
          <p className="text-sm text-muted-foreground font-body max-w-3xl mx-auto">
            Hebrew Israelite Implementer Aboriginal Identity — A divine call to all nations to recognize and assist the Aboriginal Black Hebrew Israelites (Yasharahala) in fulfilling biblical prophecy as it is the Most High AHAYAH's Will.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {pillars.map((p) => (
            <div key={p.title} className="glass-card rounded-xl p-5 text-center">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-3">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-display font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-[11px] text-muted-foreground font-body">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="divine" size="lg" asChild>
            <Link to="/watchman">Explore Watchman Project</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WatchmanHomeSection;
