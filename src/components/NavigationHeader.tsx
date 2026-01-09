import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Menu, MessageSquare, Users, BookOpen, Scale, Home, Info, Cpu, Mail, Code, LogIn, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommandCenter from "@/components/CommandCenter";
import shieldLogo from "@/assets/shield-logo.jpg";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { label: "Home", href: "/", icon: Home, isPage: true },
  { label: "About", href: "/about", icon: Info, isPage: true },
  { label: "Technology", href: "/technology", icon: Cpu, isPage: true },
  { label: "Agents", href: "/agents", icon: Users, isPage: true },
  { label: "Watchman", href: "/watchman", icon: Shield, isPage: true },
  { label: "Knowledge", href: "/knowledge-base", icon: BookOpen, isPage: true },
  { label: "API", href: "/api", icon: Code, isPage: true },
  { label: "Contact", href: "/contact", icon: Mail, isPage: true },
];

const scrollNavItems = [
  { label: "Modules", href: "#modules", icon: Shield },
  { label: "Capabilities", href: "#capabilities", icon: Scale },
  { label: "Compliance", href: "#compliance", icon: Scale },
];

const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      navigate("/" + href);
      return;
    }
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
          <Link
            to="/"
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-3 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isHomePage && scrollNavItems.slice(0, 2).map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 rounded-lg font-body text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Auth + Command Center + Mobile Menu */}
          <div className="flex items-center gap-3">
            <CommandCenter />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <User className="w-4 h-4 mr-2" />
                    {user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border-border">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

            <Button
              variant="shield"
              size="sm"
              onClick={() => isHomePage ? scrollToSection("#chat") : navigate("/#chat")}
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
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-left transition-all duration-200 ${
                          location.pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    ))}
                    {isHomePage && scrollNavItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-left text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  <div className="space-y-3 mt-4">
                    {user ? (
                      <>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full mb-2">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={handleSignOut}
                          className="w-full"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="shield"
                      onClick={() => isHomePage ? scrollToSection("#chat") : navigate("/#chat")}
                      className="w-full"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask S.H.I.E.L.D. AI
                    </Button>
                  </div>
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
