import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import LiveMarketTicker from "@/components/LiveMarketTicker";
import Footer from "@/components/Footer";
import TradingHero from "@/components/trading/TradingHero";
import TradingMarkets from "@/components/trading/TradingMarkets";
import TradingPromotions from "@/components/trading/TradingPromotions";
import TradingFeatures from "@/components/trading/TradingFeatures";
import TradingPrograms from "@/components/trading/TradingPrograms";
import TradingEducation from "@/components/trading/TradingEducation";
import TradingWallet from "@/components/trading/TradingWallet";
import TradingCharts from "@/components/trading/TradingCharts";
import AIHedgingCenter from "@/components/trading/AIHedgingCenter";
import TradingSidebar from "@/components/trading/TradingSidebar";

const Trading = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LiveMarketTicker />
      <div className="pt-8">
        <NavigationHeader />
      </div>
      <TradingSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      {/* Main Content with sidebar offset */}
      <div className="pl-0 md:pl-[64px] lg:pl-[260px] transition-all duration-300">
        <div id="overview">
          <TradingHero />
        </div>
        <TradingFeatures />
        <div id="charts">
          <TradingCharts />
        </div>
        <div id="wallet">
          <TradingWallet />
        </div>
        <div id="hedging">
          <AIHedgingCenter />
        </div>
        <div id="markets">
          <TradingMarkets />
        </div>
        <div id="promotions">
          <TradingPromotions />
        </div>
        <div id="programs">
          <TradingPrograms />
        </div>
        <div id="education">
          <TradingEducation />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Trading;
