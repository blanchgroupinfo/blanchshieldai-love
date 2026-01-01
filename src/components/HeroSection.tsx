import { Button } from "@/components/ui/button";
import shieldLogo from "@/assets/shield-logo.jpg";
import { Shield, Sparkles, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Logo */}
          <div className="relative mb-8 animate-float">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-150" />
            <img 
              src={shieldLogo} 
              alt="Blanch S.H.I.E.L.D. AI" 
              className="relative w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl animate-glow-pulse"
            />
          </div>
          
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm md:text-base font-display uppercase tracking-[0.3em] text-muted-foreground">
              Spiritual Healing Initiative • Economic Light Development
            </span>
            <Shield className="w-5 h-5 text-primary" />
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="gradient-text">BLANCH S.H.I.E.L.D.</span>
            <span className="text-primary ml-4">AI</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-4 opacity-0 animate-fade-in font-body leading-relaxed" style={{ animationDelay: '0.6s' }}>
            A Multi-Strategic Sovereign Intelligence & Ethics Layer — Governing Righteous Morality Through Universal Ethical Intelligence
          </p>
          
          {/* Scripture Quote */}
          <blockquote className="text-sm md:text-base text-shield-accent italic mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            "Thy righteousness is an everlasting righteousness, and thy law is the truth." — Psalms 119:142
          </blockquote>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            <Button variant="shield" size="xl">
              <Sparkles className="w-5 h-5" />
              Ask S.H.I.E.L.D. AI
            </Button>
            <Button variant="divine" size="xl">
              Explore Capabilities
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
    </section>
  );
};

export default HeroSection;
