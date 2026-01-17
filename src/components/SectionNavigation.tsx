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
  ChevronUp
} from "lucide-react";

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "chat", label: "Ask AI", icon: MessageSquare },
  { id: "modules", label: "Modules", icon: Box },
  { id: "capabilities", label: "Capabilities", icon: Zap },
  { id: "agents", label: "Agents", icon: Users },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
  { id: "compliance", label: "Compliance", icon: Shield },
  { id: "mission", label: "Mission", icon: Target },
];

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling down a bit
      setIsVisible(window.scrollY > 200);

      // Determine active section
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
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2"
        >
          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200 mb-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>

          {/* Section dots */}
          <div className="flex flex-col gap-2 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative p-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={section.label}
                >
                  <Icon className="w-4 h-4" />
                  
                  {/* Tooltip */}
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
