import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import ShieldFramework from "@/components/ShieldFramework";
import DailySpiritualGuidance from "@/components/DailySpiritualGuidance";
import AIChatInterface from "@/components/AIChatInterface";
import SpiritualMissionSection from "@/components/SpiritualMissionSection";
import ModulesSection from "@/components/ModulesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AgentRegistry from "@/components/AgentRegistry";
import PillarAllocation from "@/components/PillarAllocation";
import UniversalCommerce from "@/components/UniversalCommerce";
import TradingHub from "@/components/TradingHub";
import EcosystemSection from "@/components/EcosystemSection";
import OnyxFoundation from "@/components/OnyxFoundation";
import ScripturalQuotes from "@/components/ScripturalQuotes";
import KnowledgeBase from "@/components/KnowledgeBase";
import ComplianceSection from "@/components/ComplianceSection";
import MissionSection from "@/components/MissionSection";
import WatchmanHomeSection from "@/components/WatchmanHomeSection";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";


const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-14">
      <NavigationHeader />
      <SectionNavigation />
      
      <div id="hero">
        <HeroSection />
      </div>
      <div id="framework">
        <ShieldFramework />
      </div>
      <div id="guidance">
        <DailySpiritualGuidance />
      </div>
      <div id="chat">
        <AIChatInterface />
      </div>
      <div id="spiritual-mission">
        <SpiritualMissionSection />
      </div>
      <div id="modules">
        <ModulesSection />
      </div>
      <div id="capabilities">
        <CapabilitiesSection />
      </div>
      <div id="agents">
        <AgentRegistry />
      </div>
      <div id="pillars">
        <PillarAllocation />
      </div>
      <div id="commerce">
        <UniversalCommerce />
      </div>
      <div id="trading">
        <TradingHub />
      </div>
      <div id="ecosystem">
        <EcosystemSection />
      </div>
      <div id="onyx">
        <OnyxFoundation />
      </div>
      <ScripturalQuotes />
      <div id="knowledge">
        <KnowledgeBase />
      </div>
      <div id="compliance">
        <ComplianceSection />
      </div>
      <div id="mission">
        <MissionSection />
      </div>
      <div id="watchman">
        <WatchmanHomeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
