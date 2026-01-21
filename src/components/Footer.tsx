import shieldLogo from "@/assets/shield-logo.jpg";
import { Shield } from "lucide-react";
import NewsletterSubscription from "./NewsletterSubscription";
const Footer = () => {
  return <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-card border-t border-border/50" />
      
      <div className="container relative z-10 px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start">
            {/* Logo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
              <img alt="Blanch S.H.I.E.L.D. AI" className="relative w-20 h-20 object-contain rounded-xl" src="/lovable-uploads/82b19b1c-cb42-480d-a5a8-da899a505baa.jpg" />
            </div>
            
            {/* Brand */}
            <h3 className="text-xl font-display font-bold mb-2">
              <span className="gradient-text">Blanch S.H.I.E.L.D.</span>
              <span className="text-primary ml-2">AI</span>
            </h3>
            
            <p className="text-sm text-muted-foreground font-body max-w-md mb-4 text-center md:text-left">Spiritual Healing Initiative Economic Light Development —
Managed by the Blanch Group</p>
          </div>

          {/* Right: Newsletter */}
          <div className="flex flex-col justify-center">
            <h4 className="text-lg font-display font-semibold text-foreground mb-2">Subscribe to S.H.I.E.L.D. AI Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest AI agent developments and technology news.
            </p>
            <NewsletterSubscription variant="footer" />
          </div>
        </div>
          
        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-border" />
          <Shield className="w-5 h-5 text-primary" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-border" />
        </div>
        
        {/* Scripture */}
        <blockquote className="text-sm italic font-body mb-6 text-center text-primary">
          "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life."
          <cite className="block mt-2 not-italic text-primary">— Proverbs 6:23</cite>
        </blockquote>
        
        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} The Blanch Group. All Rights Reserved.
          </p>
          <p className="text-xs font-body text-primary">
            Praise Most High AHAYAH BA SHAM YASHAYA
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;