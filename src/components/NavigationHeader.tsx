import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Menu, MessageSquare, Users, BookOpen, Scale, Home, Info, Cpu, Mail, Code, LogIn, LogOut, User, LayoutDashboard, Settings, TrendingUp, ChevronDown, Globe, Briefcase, Building, Gavel, Wallet, Database, Sparkles, Calendar, ScrollText, Heart, Network, ArrowRightLeft, Store, Boxes, Search, Landmark, FileCheck, Layers, Eye, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import CommandCenter from "@/components/CommandCenter";
import shieldLogo from "@/assets/shield-logo.jpg";
import type { User as SupabaseUser } from "@supabase/supabase-js";
// Desktop nav - minimal items (rest moved to vertical menu)
const navItems = [
  { label: "Core Modules", href: "/core-modules", icon: Layers, isPage: true },
];

const backendNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Admin", href: "/admin", icon: Settings },
];

const scrollNavItems = [
  { label: "Compliance", href: "#compliance", icon: Scale },
];

// Main Navigation Items (now in vertical menu)
const mainNavItems = [
  { label: "Home", href: "/", icon: Home, category: "Main" },
  { label: "About", href: "/about", icon: Info, category: "Main" },
  { label: "Technology", href: "/technology", icon: Cpu, category: "Main" },
  { label: "Trading", href: "/trading", icon: TrendingUp, category: "Main" },
  { label: "Agents", href: "/agents", icon: Users, category: "Main" },
  { label: "Project Watchman", href: "/watchman", icon: Eye, category: "Main" },
  { label: "Knowledge Base", href: "/knowledge-base", icon: BookOpen, category: "Main" },
  { label: "API", href: "/api", icon: Code, category: "Main" },
  { label: "Contact", href: "/contact", icon: Mail, category: "Main" },
];

const verticalMenuItems = [
  // Core Modules
  { label: "Core Modules", href: "/core-modules", icon: Layers, category: "Core" },
  { label: "Command Center", href: "/command-center", icon: Shield, category: "Core" },
  
  // AI & Technology
  { label: "S.H.I.E.L.D. AI LLM", href: "/shield-llm", icon: Sparkles, category: "AI & Technology" },
  { label: "H.E.E.D. Ventures", href: "/heed-ventures", icon: Briefcase, category: "AI & Technology" },
  
  // Trading & Finance
  { label: "Trading Finance Hub", href: "/trading", icon: TrendingUp, category: "Trading & Finance" },
  { label: "Compliance & KYC", href: "/compliance-kyc", icon: FileCheck, category: "Trading & Finance" },
  { label: "Cross Border Settlements", href: "/cross-border-settlements", icon: ArrowRightLeft, category: "Trading & Finance" },
  
  // Virtual Marketplace
  { label: "Virtual Marketplace", href: "/virtual-marketplace", icon: Store, category: "Marketplace" },
  { label: "Universal Business Network", href: "/universal-business-network", icon: Network, category: "Marketplace" },
  { label: "Blanch Corridor", href: "/blanch-corridor", icon: Building, category: "Marketplace" },
  
  // Legal & Governance
  { label: "International Law", href: "/international-law", icon: Gavel, category: "Legal & Governance" },
  { label: "Sovereign Court", href: "/sovereign-court", icon: Landmark, category: "Legal & Governance" },
  { label: "Laws & Commandments", href: "/laws-commandments", icon: ScrollText, category: "Legal & Governance" },
  
  // Metaverse & Digital
  { label: "Metaverse", href: "/metaverse", icon: Globe, category: "Metaverse & Digital" },
  { label: "Explorer", href: "/explorer", icon: Search, category: "Metaverse & Digital" },
  { label: "Oracle", href: "/oracle", icon: Database, category: "Metaverse & Digital" },
  { label: "Distributed Ledger", href: "/distributed-ledger", icon: Boxes, category: "Metaverse & Digital" },
  
  // Calendar & Faith
  { label: "Creators Calendar", href: "/creators-calendar", icon: Calendar, category: "Calendar & Faith" },
  { label: "Philanthropy Hub", href: "/philanthropy", icon: Heart, category: "Calendar & Faith" },
  
  // Services
  { label: "Food Replicator", href: "/food-replicator", icon: Utensils, category: "Services" },
];
const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVerticalMenuOpen, setIsVerticalMenuOpen] = useState(false);
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
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
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
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            {/* Vertical Navigation Menu */}
            <DropdownMenu open={isVerticalMenuOpen} onOpenChange={setIsVerticalMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-64 max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border"
              >
                <div className="px-3 py-2 border-b border-border/50">
                  <span className="text-sm font-semibold text-primary">S.H.I.E.L.D. AI Navigation</span>
                </div>
                {verticalMenuItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.label} 
                    onClick={() => {
                      navigate(item.href);
                      setIsVerticalMenuOpen(false);
                    }}
                    className="cursor-pointer flex items-center gap-3 py-2"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {backendNavItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.label} 
                    onClick={() => {
                      navigate(item.href);
                      setIsVerticalMenuOpen(false);
                    }}
                    className="cursor-pointer flex items-center gap-3 py-2"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img alt="S.H.I.E.L.D. AI" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain" src="/lovable-uploads/07dc7f9b-5404-4ddb-8c5c-d24b1b61d6dd.png" />
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg gradient-text">Blanch S.H.I.E.L.D.</span>
                <span className="font-display font-bold text-lg text-primary ml-1">AI</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link 
                key={item.label} 
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isHomePage && scrollNavItems.slice(0, 2).map(item => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Auth + Command Center + Mobile Menu */}
          <div className="flex items-center gap-3">

            <CommandCenter />
            {user ? <DropdownMenu>
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
                  <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <Link to="/auth" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>}

            <Button variant="shield" size="sm" onClick={() => isHomePage ? scrollToSection("#chat") : navigate("/#chat")} className="hidden sm:flex">
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
                    <img src={shieldLogo} alt="S.H.I.E.L.D. AI" className="w-12 h-12 rounded-lg" />
                    <div>
                      <span className="font-display font-bold gradient-text">S.H.I.E.L.D.</span>
                      <span className="font-display font-bold text-primary ml-1">AI</span>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {navItems.map(item => <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-left transition-all duration-200 ${location.pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-card/50"}`}>
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>)}
                    {isHomePage && scrollNavItems.map(item => <button key={item.label} onClick={() => scrollToSection(item.href)} className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-left text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-200">
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>)}
                  </nav>

                  <div className="space-y-3 mt-4">
                    {user ? <>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full mb-2">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button variant="outline" onClick={handleSignOut} className="w-full">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </> : <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>}
                    <Button variant="shield" onClick={() => isHomePage ? scrollToSection("#chat") : navigate("/#chat")} className="w-full">
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
    </header>;
};
export default NavigationHeader;