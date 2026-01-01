import { useState, useEffect } from "react";
import { Shield, Menu, X, MessageSquare, Users, BookOpen, Scale, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import shieldLogo from "@/assets/shield-logo.jpg";

const navItems = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Modules", href: "#modules", icon: Shield },
  { label: "Capabilities", href: "#capabilities", icon: Scale },
  { label: "Agents", href: "#agents", icon: Users },
  { label: "Knowledge", href: "#knowledge", icon: BookOpen },
  { label: "Compliance", href: "#compliance", icon: Scale },
];

const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={shieldLogo}
              alt="S.H.I.E.L.D. AI"
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg gradient-text">S.H.I.E.L.D.</span>
              <span className="font-display font-bold text-lg text-primary ml-1">AI</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                  activeSection === item.href.replace("#", "")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="shield"
              size="sm"
              onClick={() => scrollToSection("#chat")}
              className="hidden sm:flex"
            >
              <MessageSquare className="w-4 h-4" />
              Ask AI
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background border-border">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <img
                      src={shieldLogo}
                      alt="S.H.I.E.L.D. AI"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <span className="font-display font-bold gradient-text">S.H.I.E.L.D.</span>
                      <span className="font-display font-bold text-primary ml-1">AI</span>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-left transition-all duration-200 ${
                          activeSection === item.href.replace("#", "")
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  <Button
                    variant="shield"
                    onClick={() => scrollToSection("#chat")}
                    className="mt-4"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Ask S.H.I.E.L.D. AI
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
