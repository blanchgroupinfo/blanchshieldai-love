import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Wallet, TrendingUp, Globe, BookOpen, Shield, Coins, Building2, Receipt, ArrowLeftRight, FileText, Landmark, PiggyBank, Gem, ChevronLeft, ChevronRight, Layers, Bot, Gift, Clock, Calculator, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  subItems?: {
    id: string;
    label: string;
  }[];
}
const navItems: NavItem[] = [{
  id: "overview",
  label: "Overview",
  icon: BarChart3
}, {
  id: "charts",
  label: "Live Charts",
  icon: TrendingUp
}, {
  id: "wallet",
  label: "Wallet",
  icon: Wallet,
  subItems: [{
    id: "deposit",
    label: "Deposit"
  }, {
    id: "withdraw",
    label: "Withdraw"
  }, {
    id: "transactions",
    label: "Transactions"
  }]
}, {
  id: "hedging",
  label: "AI Hedging",
  icon: Bot
}, {
  id: "markets",
  label: "Markets",
  icon: Globe,
  subItems: [{
    id: "crypto",
    label: "Cryptocurrencies"
  }, {
    id: "forex",
    label: "Forex"
  }, {
    id: "commodities",
    label: "Commodities"
  }, {
    id: "stocks",
    label: "Stocks & ETFs"
  }, {
    id: "indices",
    label: "Indices"
  }, {
    id: "brics",
    label: "BRICS"
  }, {
    id: "cbdc",
    label: "CBDC"
  }]
}, {
  id: "instruments",
  label: "Bank Instruments",
  icon: Building2,
  subItems: [{
    id: "sblc",
    label: "Trade SBLC"
  }, {
    id: "mtn",
    label: "Trade MTN"
  }, {
    id: "ltn",
    label: "Trade LTN"
  }, {
    id: "bank-draft",
    label: "Bank Draft"
  }]
}, {
  id: "swift",
  label: "SWIFT Migration",
  icon: ArrowLeftRight,
  subItems: [{
    id: "mt101",
    label: "MT101-MT999"
  }, {
    id: "mx",
    label: "MX Format"
  }, {
    id: "mt103",
    label: "MT103 / GPI"
  }]
}, {
  id: "promotions",
  label: "Promotions",
  icon: Gift
}, {
  id: "programs",
  label: "Trade Programs",
  icon: Clock,
  subItems: [{
    id: "24hr",
    label: "24 Hour"
  }, {
    id: "48hr",
    label: "48 Hour"
  }, {
    id: "72hr",
    label: "72 Hour"
  }, {
    id: "weekly",
    label: "Weekly"
  }, {
    id: "monthly",
    label: "Monthly"
  }, {
    id: "compound",
    label: "Compound Interest"
  }]
}, {
  id: "assets",
  label: "Asset Marketplace",
  icon: Gem,
  subItems: [{
    id: "nft",
    label: "NFTs"
  }, {
    id: "tokens",
    label: "Tokens"
  }, {
    id: "historical",
    label: "Historical Assets"
  }, {
    id: "tokenize",
    label: "Tokenize Assets"
  }]
}, {
  id: "derivatives",
  label: "Derivatives",
  icon: Layers,
  subItems: [{
    id: "futures",
    label: "Futures"
  }, {
    id: "options",
    label: "Options"
  }, {
    id: "cfd",
    label: "CFDs"
  }, {
    id: "swaps",
    label: "Swaps"
  }]
}, {
  id: "portfolio",
  label: "Portfolio",
  icon: Briefcase
}, {
  id: "education",
  label: "Education",
  icon: BookOpen
}];
interface TradingSidebarProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}
const TradingSidebar = ({
  activeSection = "overview",
  onSectionChange
}: TradingSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };
  const handleItemClick = (item: NavItem) => {
    if (item.subItems) {
      toggleExpand(item.id);
    } else {
      onSectionChange?.(item.id);
    }
  };
  return <motion.aside initial={false} animate={{
    width: isCollapsed ? 64 : 260
  }} transition={{
    duration: 0.3,
    ease: "easeInOut"
  }} className="fixed left-0 top-[72px] bottom-0 z-40 bg-card/95 backdrop-blur-xl border-r border-border/50 flex flex-col">
      {/* Toggle Button */}
      <Button variant="ghost" size="icon" className="absolute -right-3 top-4 z-50 h-6 w-6 rounded-full border border-border bg-card shadow-md hover:bg-accent" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {navItems.map(item => <div key={item.id}>
              <button onClick={() => handleItemClick(item)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all", "hover:bg-accent/50 hover:text-accent-foreground", activeSection === item.id ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-muted-foreground")}>
                <item.icon className={cn("w-5 h-5 flex-shrink-0", activeSection === item.id ? "text-primary" : "")} />
                <AnimatePresence>
                  {!isCollapsed && <motion.span initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} className="flex-1 text-left truncate">
                      {item.label}
                    </motion.span>}
                </AnimatePresence>
                {!isCollapsed && item.subItems && <ChevronRight className={cn("w-4 h-4 transition-transform", expandedItems.includes(item.id) && "rotate-90")} />}
              </button>

              {/* Sub Items */}
              <AnimatePresence>
                {!isCollapsed && item.subItems && expandedItems.includes(item.id) && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: "auto",
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.2
            }} className="overflow-hidden">
                    <div className="ml-6 pl-4 border-l border-border/50 mt-1 space-y-1">
                      {item.subItems.map(subItem => <button key={subItem.id} onClick={() => onSectionChange?.(subItem.id)} className={cn("w-full text-left px-3 py-2 rounded-md text-sm transition-colors", "hover:bg-accent/50 hover:text-accent-foreground", activeSection === subItem.id ? "text-primary font-medium" : "text-muted-foreground")}>
                          {subItem.label}
                        </button>)}
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>)}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>S.H.I.E.L.D. AI Trading</span>
          </div>
        </motion.div>}
    </motion.aside>;
};
export default TradingSidebar;