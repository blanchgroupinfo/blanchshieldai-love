import { useState } from "react";
import { SpiritualGuidanceTab } from "./tabs/SpiritualGuidanceTab";
import { RecommendationsTab } from "./tabs/RecommendationsTab";
import { AgentsTab } from "./tabs/AgentsTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { HelpTab } from "./tabs/HelpTab";
import { SupportTab } from "./tabs/SupportTab";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, Sparkles, BarChart2, Shield, HelpCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type TabId = "chat" | "spiritual" | "recommendations" | "agents" | "analytics" | "help" | "support";

export const AIChatTabs = ({ 
  currentTab, 
  onTabChange, 
  children 
}: { 
  currentTab: TabId; 
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode; 
}) => {
  return (
    <div className="flex flex-col h-[480px] bg-background/50 relative z-10 w-full overflow-hidden">
      {/* Scrollable Tab Bar */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-md shrink-0">
        <ScrollArea className="w-full whitespace-nowrap px-2">
          <div className="flex w-max space-x-2 p-2">
            <Button 
              variant={currentTab === "chat" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("chat")}
              className={`h-8 rounded-full text-xs ${currentTab === "chat" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <MessageSquare className="w-3 h-3 mr-2" /> Chat Box
            </Button>
            <Button 
              variant={currentTab === "spiritual" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("spiritual")}
              className={`h-8 rounded-full text-xs ${currentTab === "spiritual" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <Sparkles className="w-3 h-3 mr-2" /> Daily Guidance
            </Button>
            <Button 
              variant={currentTab === "recommendations" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("recommendations")}
              className={`h-8 rounded-full text-xs flex gap-1 ${currentTab === "recommendations" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <Star className="w-3 h-3 mr-2 text-inherit" /> Recommendations
            </Button>
            <Button 
              variant={currentTab === "agents" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("agents")}
              className={`h-8 rounded-full text-xs ${currentTab === "agents" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <Shield className="w-3 h-3 mr-2 text-inherit" /> Universal Agents
            </Button>
            <Button 
              variant={currentTab === "analytics" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("analytics")}
              className={`h-8 rounded-full text-xs ${currentTab === "analytics" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <BarChart2 className="w-3 h-3 mr-2 text-inherit" /> Analytics
            </Button>
            <Button 
              variant={currentTab === "help" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("help")}
              className={`h-8 rounded-full text-xs ${currentTab === "help" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <HelpCircle className="w-3 h-3 mr-2 text-inherit" /> Help
            </Button>
            <Button 
              variant={currentTab === "support" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => onTabChange("support")}
              className={`h-8 rounded-full text-xs ${currentTab === "support" ? "bg-[hsl(210,100%,60%)] text-white shadow-md shadow-[hsl(210,100%,60%)/20] hover:bg-[hsl(210,100%,65%)]" : ""}`}
            >
              <HelpCircle className="w-3 h-3 mr-2 text-inherit" /> Support
            </Button>
          </div>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-hidden relative min-h-0">
        <div className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${currentTab === "chat" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
          {children}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${currentTab === "spiritual" ? "opacity-100 z-10 overflow-y-auto" : "opacity-0 z-0 pointer-events-none"}`}>
          {currentTab === "spiritual" && <SpiritualGuidanceTab />}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${currentTab === "recommendations" ? "opacity-100 z-10 overflow-y-auto" : "opacity-0 z-0 pointer-events-none"}`}>
          {currentTab === "recommendations" && <RecommendationsTab />}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${currentTab === "agents" ? "opacity-100 z-10 overflow-y-auto" : "opacity-0 z-0 pointer-events-none"}`}>
           {currentTab === "agents" && <AgentsTab />}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${currentTab === "analytics" ? "opacity-100 z-10 overflow-y-auto" : "opacity-0 z-0 pointer-events-none"}`}>
          {currentTab === "analytics" && <AnalyticsTab />}
        </div>
         <div className={`absolute inset-0 transition-opacity duration-300 ${currentTab === "help" ? "opacity-100 z-10 overflow-y-auto" : "opacity-0 z-0 pointer-events-none"}`}>
          {currentTab === "help" && <HelpTab />}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${currentTab === "support" ? "opacity-100 z-10 overflow-y-auto" : "opacity-0 z-0 pointer-events-none"}`}>
          {currentTab === "support" && <SupportTab />}
        </div>
      </div>
    </div>
  );
};
