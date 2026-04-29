import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Activity, Info } from "lucide-react";
import { INTELLIGENCE_MODES } from "./chat-config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export const AIIntelligenceModes = () => {
  const [selectedModes, setSelectedModes] = useState<string[]>(["Hands Free Mode - S.H.I.E.L.D. AI takes care of everything for you"]);
  const [isInitiating, setIsInitiating] = useState(false);

  const toggleMode = (mode: string) => {
    if (mode === "Ultra Automation - Experience S.H.I.E.L.D. AI Massive Potential") {
      // Ultra Automation selects all modes
      if (selectedModes.includes(mode)) {
        setSelectedModes(["Hands Free Mode - S.H.I.E.L.D. AI takes care of everything for you"]);
      } else {
        setSelectedModes([...INTELLIGENCE_MODES]);
      }
    } else {
      setSelectedModes(prev => 
        prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
      );
    }
  };

  const handleInitiate = () => {
    setIsInitiating(true);
    setTimeout(() => setIsInitiating(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-card/50 hover:bg-card border-primary/20 text-xs">
          <Shield className="w-3 h-3 text-primary" />
          <span className="hidden sm:inline">Intelligent Modes</span>
          <span className="sm:hidden">Modes</span>
          {selectedModes.length > 0 && (
            <Badge variant="secondary" className="ml-1 h-4 px-1 py-0 text-[10px] bg-primary text-primary-foreground">
              {selectedModes.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                S.H.I.E.L.D. AI Universal Intelligent Modes
                <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Sovereign Universal Intelligence System v1.0</p>
            </div>
            {isInitiating && (
              <div className="flex items-center gap-2 text-xs font-semibold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 animate-pulse">
                <Activity className="w-4 h-4" /> Initiating Sequence
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="h-[50vh] pr-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
            {INTELLIGENCE_MODES.map((mode, index) => {
              const isSelected = selectedModes.includes(mode);
              return (
                <div 
                  key={index}
                  onClick={() => toggleMode(mode)}
                  className={`relative p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary),0.15)]" 
                      : "bg-card/50 border-border/50 hover:border-primary/50"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="shrink-0 pt-0.5">
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-200">
                          <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {mode.split(" - ")[0]}
                      </p>
                      {mode.split(" - ")[1] && (
                        <p className="text-xs text-muted-foreground leading-snug">
                          {mode.split(" - ")[1]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t border-border/50 mt-2">
          <div className="text-xs text-muted-foreground">
            Default Mode: Hands Free
          </div>
          <Button onClick={handleInitiate} variant="shield" disabled={isInitiating || selectedModes.length === 0}>
            {isInitiating ? "Initiating..." : "Confirm & Validate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
