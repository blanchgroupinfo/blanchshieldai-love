import { Button } from "@/components/ui/button";
import { Info, HelpCircle, Activity } from "lucide-react";
import { HELP_CATEGORIES } from "../chat-config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SharedActionButtons } from "./SharedActionButtons";

export const HelpTab = () => {
  return (
    <div className="flex flex-col h-full animate-fade-in p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div>
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">
              Help Options
              <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
                <Info className="w-4 h-4 text-muted-foreground" />
              </Button>
            </h3>
            <p className="text-xs text-muted-foreground">1 Esdras 8:22 Place your Ideas with Most High AHAYAH and Pay no taxes.</p>
          </div>
        </div>

        <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/20">
          <h4 className="font-semibold text-sm mb-2 text-blue-500 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Risk Assessment
          </h4>
          <p className="text-xs text-muted-foreground mb-3">Get AI automated, AI-Powered Risk assessment for your investments and decision.</p>
          <Button size="sm" variant="shield" className="text-xs px-3 py-1 h-7">Run Risk Analysis</Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <h4 className="font-semibold text-sm mb-2 px-1">How Can I Help You?</h4>
        <ScrollArea className="flex-1 -mx-4 px-4 h-[250px]">
          <div className="grid grid-cols-1 gap-2 pb-4">
            {HELP_CATEGORIES.map((category, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                className="justify-start h-auto py-2 text-xs font-normal bg-card/50 hover:bg-card border border-border/50 text-left whitespace-normal h-auto min-h-[40px]"
              >
                <HelpCircle className="w-3 h-3 mr-2 shrink-0 opacity-50 text-primary" />
                <span>{category}</span>
              </Button>
            ))}
            <SharedActionButtons />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
