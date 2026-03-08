import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveMarketTicker from "@/components/LiveMarketTicker";
import SpiritualTicker from "@/components/SpiritualTicker";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import API from "./pages/API";
import Agents from "./pages/Agents";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Watchman from "./pages/Watchman";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import Trading from "./pages/Trading";
import UniversalBusinessNetwork from "./pages/UniversalBusinessNetwork";
import VirtualMarketplace from "./pages/VirtualMarketplace";
import ShieldLLM from "./pages/ShieldLLM";
import HeedVentures from "./pages/HeedVentures";
import FoodReplicator from "./pages/FoodReplicator";
import ComplianceKYC from "./pages/ComplianceKYC";
import InternationalLaw from "./pages/InternationalLaw";
import SovereignCourt from "./pages/SovereignCourt";
import Metaverse from "./pages/Metaverse";
import Explorer from "./pages/Explorer";
import Oracle from "./pages/Oracle";
import CreatorsCalendar from "./pages/CreatorsCalendar";
import LawsCommandments from "./pages/LawsCommandments";
import PhilanthropyHub from "./pages/PhilanthropyHub";
import DistributedLedger from "./pages/DistributedLedger";
import CrossBorderSettlements from "./pages/CrossBorderSettlements";
import BlanchCorridor from "./pages/BlanchCorridor";
import CommandCenterPage from "./pages/CommandCenter";
import WebAppBuilding from "./pages/WebAppBuilding";
import AutoCAD from "./pages/AutoCAD";
import USCPB from "./pages/USCPB";
import AIGateway from "./pages/AIGateway";
import BlanchAutomotive from "./pages/BlanchAutomotive";
import BlanchDrive from "./pages/BlanchDrive";
import BlanchEnergy from "./pages/BlanchEnergy";
import BlanchGroup from "./pages/BlanchGroup";
import BlanchOS from "./pages/BlanchOS";
import BlanchNetwork from "./pages/BlanchNetwork";
import BlanchInfinityDLT from "./pages/BlanchInfinityDLT";
import ShieldAIChat from "./pages/ShieldAIChat";
import ShieldAICloud from "./pages/ShieldAICloud";
import ShieldAISettings from "./pages/ShieldAISettings";
import ShieldAIProfile from "./pages/ShieldAIProfile";
import ShieldAIAbout from "./pages/ShieldAIAbout";
import UniversalFileSystem from "./pages/UniversalFileSystem";
import DeployedAgents from "./pages/DeployedAgents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Global Spiritual Ticker */}
        <SpiritualTicker />
        {/* Global Live Market Ticker */}
        <LiveMarketTicker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/api" element={<API />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:agentId" element={<Agents />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/watchman" element={<Watchman />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/business-network" element={<UniversalBusinessNetwork />} />
          <Route path="/marketplace" element={<VirtualMarketplace />} />
          <Route path="/shield-llm" element={<ShieldLLM />} />
          <Route path="/heed-ventures" element={<HeedVentures />} />
          <Route path="/food-replicator" element={<FoodReplicator />} />
          <Route path="/compliance-kyc" element={<ComplianceKYC />} />
          <Route path="/international-law" element={<InternationalLaw />} />
          <Route path="/sovereign-court" element={<SovereignCourt />} />
          <Route path="/metaverse" element={<Metaverse />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/oracle" element={<Oracle />} />
          <Route path="/creators-calendar" element={<CreatorsCalendar />} />
          <Route path="/laws-commandments" element={<LawsCommandments />} />
          <Route path="/philanthropy" element={<PhilanthropyHub />} />
          <Route path="/distributed-ledger" element={<DistributedLedger />} />
          <Route path="/cross-border" element={<CrossBorderSettlements />} />
          <Route path="/blanch-corridor" element={<BlanchCorridor />} />
          <Route path="/command-center" element={<CommandCenterPage />} />
          <Route path="/web-app-building" element={<WebAppBuilding />} />
          <Route path="/autocad" element={<AutoCAD />} />
          <Route path="/uscpb" element={<USCPB />} />
          <Route path="/ai-gateway" element={<AIGateway />} />
          {/* New Pages */}
          <Route path="/blanch-automotive" element={<BlanchAutomotive />} />
          <Route path="/blanch-drive" element={<BlanchDrive />} />
          <Route path="/blanch-energy" element={<BlanchEnergy />} />
          <Route path="/blanch-group" element={<BlanchGroup />} />
          <Route path="/blanch-os" element={<BlanchOS />} />
          <Route path="/blanch-network" element={<BlanchNetwork />} />
          <Route path="/blanch-infinity-dlt" element={<BlanchInfinityDLT />} />
          <Route path="/shield-ai-chat" element={<ShieldAIChat />} />
          <Route path="/shield-ai-cloud" element={<ShieldAICloud />} />
          <Route path="/shield-ai-settings" element={<ShieldAISettings />} />
          <Route path="/shield-ai-profile" element={<ShieldAIProfile />} />
          <Route path="/shield-ai-about" element={<ShieldAIAbout />} />
          <Route path="/universal-file-system" element={<UniversalFileSystem />} />
          <Route path="/deployed-agents" element={<DeployedAgents />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
