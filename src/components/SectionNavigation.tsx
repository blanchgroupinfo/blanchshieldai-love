import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  MessageSquare, 
  Box, 
  Zap, 
  Users, 
  BookOpen, 
  Shield, 
  Target,
  ChevronUp,
  Layers,
  Sun,
  ShoppingBag,
  TrendingUp,
  Network,
  Gem,
  Eye
} from "lucide-react";

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "framework", label: "Framework", icon: Shield },
  { id: "guidance", label: "Guidance", icon: Sun },
  { id: "chat", label: "Ask AI", icon: MessageSquare },
  { id: "modules", label: "Modules", icon: Box },
  { id: "capabilities", label: "Capabilities", icon: Zap },
  { id: "agents", label: "Agents", icon: Users },
  { id: "pillars", label: "Pillars", icon: Layers },
  { id: "commerce", label: "Commerce", icon: ShoppingBag },
  { id: "trading", label: "Trading", icon: TrendingUp },
  { id: "ecosystem", label: "Ecosystem", icon: Network },
  { id: "onyx", label: "Onyx", icon: Gem },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
  { id: "compliance", label: "Compliance", icon: Shield },
  { id: "mission", label: "Mission", icon: Target },
  { id: "watchman", label: "Watchman", icon: Eye },
];

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);

      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-4 top-1/3 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1"
        >
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200 mb-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>

          <div className="flex flex-col gap-1 p-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative p-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={section.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  
                  <span className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-card border border-border text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {section.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionNavigation;
