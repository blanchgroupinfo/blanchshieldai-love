import NavigationHeader from "@/components/NavigationHeader";
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

const Trading = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <TradingHero />
      <TradingFeatures />
      <TradingCharts />
      <TradingWallet />
      <AIHedgingCenter />
      <TradingMarkets />
      <TradingPromotions />
      <TradingPrograms />
      <TradingEducation />
      <Footer />
    </div>
  );
};

export default Trading;
