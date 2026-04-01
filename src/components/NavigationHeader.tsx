import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Menu, MessageSquare, Users, BookOpen, Scale, Home, Info, Cpu, Mail, Code, LogIn, LogOut, User, LayoutDashboard, Settings, TrendingUp, Calendar, ScrollText, Globe, Heart, Eye, Zap, Building2, ShoppingBag, Monitor, HardDrive, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link as RouterLink } from "react-router-dom";
import shieldLogo from "@/assets/shield-logo.jpg";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
{ label: "Home", href: "/", icon: Home, isPage: true },
{ label: "About", href: "/about", icon: Info, isPage: true },
{ label: "Technology", href: "/technology", icon: Cpu, isPage: true },
{ label: "Trading", href: "/trading", icon: TrendingUp, isPage: true },
{ label: "Agents", href: "/agents", icon: Users, isPage: true },
{ label: "Project Watchman", href: "/watchman", icon: Eye, isPage: true },
{ label: "Knowledge Base", href: "/knowledge-base", icon: BookOpen, isPage: true },
{ label: "Creators Calendar", href: "/creators-calendar", icon: Calendar, isPage: true },
{ label: "Laws & Commandments", href: "/laws-commandments", icon: ScrollText, isPage: true },
{ label: "S.H.I.E.L.D. AI LLM", href: "/shield-llm", icon: Zap, isPage: true },
{ label: "S.H.I.E.L.D. AI Gateway", href: "/ai-gateway", icon: Globe, isPage: true },
{ label: "Virtual Marketplace", href: "/marketplace", icon: ShoppingBag, isPage: true },
{ label: "Business Networks", href: "/business-network", icon: Building2, isPage: true },
{ label: "Philanthropy Hub", href: "/philanthropy", icon: Heart, isPage: true },
{ label: "Compliance & KYC", href: "/compliance-kyc", icon: Shield, isPage: true },
{ label: "International Law", href: "/international-law", icon: Scale, isPage: true },
{ label: "Sovereign Court", href: "/sovereign-court", icon: Scale, isPage: true },
{ label: "S.H.I.E.L.D. AI OS", href: "/shield-ai-os", icon: Monitor, isPage: true },
{ label: "S.H.I.E.L.D. AI Drive", href: "/shield-ai-drive", icon: HardDrive, isPage: true },
{ label: "Creative Media", href: "/creative-media", icon: Film, isPage: true },
{ label: "API", href: "/api", icon: Code, isPage: true },
{ label: "Contact", href: "/contact", icon: Mail, isPage: true }];


const backendNavItems = [
{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
{ label: "Admin", href: "/admin", icon: Settings }];


const scrollNavItems = [
{ label: "Modules", href: "#modules", icon: Shield },
{ label: "Capabilities", href: "#capabilities", icon: Scale },
{ label: "Compliance", href: "#compliance", icon: Scale }];


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
    <header className={`fixed top-[56px] left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-background/60 backdrop-blur-md border-b border-border/30"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img alt="S.H.I.E.L.D. AI" className="w-8 h-8 rounded-lg object-contain" src="/lovable-uploads/07dc7f9b-5404-4ddb-8c5c-d24b1b61d6dd.png" />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-sm gradient-text">Blanch S.H.I.E.L.D.</span>
              <span className="font-display font-bold text-sm text-primary ml-1">AI </span>
            </div>
          </Link>

          {/* Active Page Indicator */}
          <nav className="hidden md:flex items-center gap-1">
            {(() => {
              const currentPage = navItems.find((item) => item.href === location.pathname) || (
              location.pathname === "/shield-ai-chat" ? { label: "ASK S.H.I.E.L.D. AI", href: "/shield-ai-chat" } :
              location.pathname.startsWith("/agents/") ? { label: "Agents", href: "/agents" } : null);
              return currentPage ?
              <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-primary/15 text-primary">
                  {currentPage.label}
                </span> :
              null;
            })()}
          </nav>

          {/* CTA + Auth + Command Center + Menu */}
          <div className="flex items-center gap-2">
            <RouterLink to="/command-center">
              <Button
                variant="outline"
                size="sm"
                className={`hidden sm:flex gap-1.5 text-xs ${
                location.pathname === "/command-center" ?
                "border-primary bg-primary/10 text-primary" :
                "border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary"}`
                }>
                
                <Cpu className="w-3.5 h-3.5" />
                Command Center
              </Button>
            </RouterLink>

            {user ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex text-xs">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    {user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border-border">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" /> Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> :

            <Link to="/auth" className="hidden sm:block">
                <Button variant="outline" size="sm" className={`text-xs ${location.pathname === "/auth" ? "border-primary bg-primary/10 text-primary" : ""}`}>
                  <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
                </Button>
              </Link>
            }

            <Button variant="shield" size="sm" onClick={() => navigate("/shield-ai-chat")} className="hidden sm:flex text-xs">
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> ASK S.H.I.E.L.D. AI
            </Button>

            {/* Hamburger Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="flex">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background border-border overflow-y-auto">
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <img src={shieldLogo} alt="S.H.I.E.L.D. AI" className="w-10 h-10 rounded-lg" />
                    <div>
                      <span className="font-display font-bold gradient-text text-sm">Blanch S.H.I.E.L.D.</span>
                      <span className="font-display font-bold text-primary ml-1 text-sm">AI </span>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-0.5">
                    {navItems.map((item) =>
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-left transition-all duration-200 ${
                      location.pathname === item.href ?
                      "bg-primary/10 text-primary font-medium" :
                      "text-muted-foreground hover:text-foreground hover:bg-card/50"}`
                      }>
                      
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    )}
                    
                    {isHomePage && scrollNavItems.map((item) =>
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-left text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-200">
                      
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    )}
                  </nav>

                  <div className="space-y-2 mt-2 border-t border-border/50 pt-4">
                    {user ?
                    <>
                        {backendNavItems.map((item) =>
                      <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className={`w-full mb-1 text-xs ${location.pathname === item.href ? "border-primary bg-primary/10 text-primary" : ""}`}>
                              <item.icon className="w-4 h-4 mr-2" /> {item.label}
                            </Button>
                          </Link>
                      )}
                        <Button variant="outline" onClick={handleSignOut} className="w-full text-xs">
                          <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </Button>
                      </> :

                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full text-xs">
                          <LogIn className="w-4 h-4 mr-2" /> Sign In
                        </Button>
                      </Link>
                    }
                    <Button variant="shield" onClick={() => isHomePage ? scrollToSection("#chat") : navigate("/#chat")} className="w-full text-xs">
                      <MessageSquare className="w-4 h-4 mr-2" /> Ask S.H.I.E.L.D. AI
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>);

};

export default NavigationHeader;