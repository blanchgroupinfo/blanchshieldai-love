import { Button } from "@/components/ui/button";
import { Info, MessageCircle, Phone, Video, Send, MonitorSmartphone, Globe, Mail } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SharedActionButtons } from "./SharedActionButtons";

export const SupportTab = () => {
  return (
    <div className="flex flex-col h-full animate-fade-in p-4 space-y-6">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            Universal Support
            <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Button>
          </h3>
          <p className="text-xs text-muted-foreground">Blanch S.H.I.E.L.D. AI Communication Hub</p>
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4 h-[350px]">
        <div className="space-y-2 pb-4">
          <SharedActionButtons />
        </div>
      </ScrollArea>
    </div>
  );
};
