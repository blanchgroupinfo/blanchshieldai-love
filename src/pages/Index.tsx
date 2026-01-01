import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ModulesSection />
      <CapabilitiesSection />
      <MissionSection />
      <Footer />
    </div>
  );
};

export default Index;
