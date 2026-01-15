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
import SectionNavigation from "@/components/SectionNavigation";
import FloatingChat from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-8">
      <NavigationHeader />
      <SectionNavigation />
      <FloatingChat />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="chat">
        <AIChatInterface />
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
      <div id="knowledge">
        <KnowledgeBase />
      </div>
      <div id="compliance">
        <ComplianceSection />
      </div>
      <div id="mission">
        <MissionSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
