import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AgentRegistry from "@/components/AgentRegistry";
import AIChatInterface from "@/components/AIChatInterface";
import KnowledgeBase from "@/components/KnowledgeBase";
import ComplianceSection from "@/components/ComplianceSection";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="modules">
        <ModulesSection />
      </div>
      <div id="capabilities">
        <CapabilitiesSection />
      </div>
      <AIChatInterface />
      <AgentRegistry />
      <KnowledgeBase />
      <ComplianceSection />
      <MissionSection />
      <Footer />
    </div>
  );
};

export default Index;
