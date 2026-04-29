import { Button } from "@/components/ui/button";
import { Info, Star } from "lucide-react";
import { BEST_RECOMMENDATIONS } from "../chat-config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SharedActionButtons } from "./SharedActionButtons";

export const RecommendationsTab = () => {
  return (
    <div className="flex flex-col h-full animate-fade-in p-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            Best Recommendations 
            <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Button>
          </h3>
          <p className="text-xs text-muted-foreground">All the Best Recommendations for Everyone</p>
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4 h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
          {BEST_RECOMMENDATIONS.map((rec, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="justify-start h-auto py-2 text-xs font-normal hover:bg-shield-accent/5 hover:text-shield-accent transition-colors text-left"
            >
              <Star className="w-3 h-3 mr-2 shrink-0 opacity-50" />
              <span className="truncate">{rec}</span>
            </Button>
          ))}
          <SharedActionButtons />
        </div>
      </ScrollArea>
    </div>
  );
};
