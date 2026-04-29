import { Button } from "@/components/ui/button";
import { Info, Users, Shield, Bot, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AgentsTab = () => {
  return (
    <div className="flex flex-col h-full animate-fade-in p-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            Universal Unified AI Agents
            <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Button>
          </h3>
          <p className="text-xs text-muted-foreground">Universal Unified H.I.I. AI Agents Watchmen</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
        <Button variant="secondary" size="sm" className="whitespace-nowrap rounded-full text-xs h-7">All Agents</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full text-xs h-7 bg-card/50">Lead Agents</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full text-xs h-7 bg-card/50">Custom Agents</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full text-xs h-7 bg-card/50">Agents Use for My Tasks</Button>
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4 h-[350px]">
        <div className="space-y-3 pb-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary">S.H.I.E.L.D. AI Lead Watchman</h4>
              <p className="text-xs text-muted-foreground mt-1">Coordinates intelligence gathering and validation across all sectors.</p>
              <Button variant="link" size="sm" className="px-0 h-auto text-[10px] mt-1 text-primary">Deploy Agent</Button>
            </div>
          </div>

          <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-secondary/20 p-2 rounded-lg shrink-0">
              <Bot className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-secondary">H.I.I. Automation Agent</h4>
              <p className="text-xs text-muted-foreground mt-1">Handles execution of Hands Free Sequence automation paths.</p>
              <Button variant="link" size="sm" className="px-0 h-auto text-[10px] mt-1 text-secondary">Deploy Agent</Button>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-muted p-2 rounded-lg shrink-0">
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Custom Influencer Agent</h4>
              <p className="text-xs text-muted-foreground mt-1">Social media and public relations management.</p>
              <Button variant="link" size="sm" className="px-0 h-auto text-[10px] mt-1">Deploy Agent</Button>
            </div>
          </div>
          
           <div className="text-center pt-4">
             <Button variant="outline" size="sm" className="text-xs w-full"><Filter className="w-3 h-3 mr-2" /> Load All 1175 Agents</Button>
           </div>
        </div>
      </ScrollArea>
    </div>
  );
};
