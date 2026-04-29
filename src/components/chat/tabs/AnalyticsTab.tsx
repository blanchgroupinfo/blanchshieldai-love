import { Button } from "@/components/ui/button";
import { Info, BarChart2, Activity } from "lucide-react";
import { ANALYTICS_CATEGORIES } from "../chat-config";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AnalyticsTab = () => {
  return (
    <div className="flex flex-col h-full animate-fade-in p-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            Analysis & Analytics
            <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Button>
          </h3>
          <p className="text-xs text-muted-foreground">Available for Signed-in Users and Admin</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
          <Activity className="w-3 h-3 animate-pulse" />
          Real-Time Sync (15s)
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4 h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
          {ANALYTICS_CATEGORIES.map((category, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="justify-start h-auto py-2 text-xs font-normal hover:bg-primary/5 hover:text-primary transition-colors text-left"
            >
              <BarChart2 className="w-3 h-3 mr-2 shrink-0 opacity-50" />
              <span className="truncate">{category}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
