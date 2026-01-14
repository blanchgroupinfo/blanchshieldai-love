import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import TradingHero from "@/components/trading/TradingHero";
import TradingMarkets from "@/components/trading/TradingMarkets";
import TradingPromotions from "@/components/trading/TradingPromotions";
import TradingFeatures from "@/components/trading/TradingFeatures";
import TradingPrograms from "@/components/trading/TradingPrograms";
import TradingEducation from "@/components/trading/TradingEducation";

const Trading = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <TradingHero />
      <TradingFeatures />
      <TradingMarkets />
      <TradingPromotions />
      <TradingPrograms />
      <TradingEducation />
      <Footer />
    </div>
  );
};

export default Trading;
