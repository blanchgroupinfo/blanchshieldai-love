import shieldLogo from "@/assets/shield-logo.jpg";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-card border-t border-border/50" />
      
      <div className="container relative z-10 px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            <img 
              src={shieldLogo} 
              alt="Blanch S.H.I.E.L.D. AI" 
              className="relative w-20 h-20 object-contain rounded-xl"
            />
          </div>
          
          {/* Brand */}
          <h3 className="text-xl font-display font-bold mb-2">
            <span className="gradient-text">BLANCH S.H.I.E.L.D.</span>
            <span className="text-primary ml-2">AI</span>
          </h3>
          
          <p className="text-sm text-muted-foreground font-body max-w-md mb-8">
            Spiritual Healing Initiative Economic Light Development — Managed by the Blanch Group
          </p>
          
          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-border" />
            <Shield className="w-5 h-5 text-primary" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
          
          {/* Scripture */}
          <blockquote className="text-sm italic text-muted-foreground font-body mb-6">
            "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life."
            <cite className="block mt-2 not-italic text-shield-accent">— Proverbs 6:23</cite>
          </blockquote>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60 font-body">
            Praise Most High AHAYAH BA SHAM YASHAYA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
