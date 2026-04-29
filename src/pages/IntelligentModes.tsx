import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Activity, Info, Sparkles, Bot, MessageCircle } from "lucide-react";
import { INTELLIGENCE_MODES } from "@/components/chat/chat-config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const IntelligentModes = () => {
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
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">S.H.I.E.L.D. AI SYSTEM</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Intelligent <span className="text-primary">Modes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Universal Intelligence System with specialized modes for every domain, industry, and use case.
              Activate multiple modes simultaneously for cross-domain intelligence.
            </p>
            <p className="text-[11px] text-green-500 mt-4 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> All Systems Active
              <span className="mx-1">•</span> {INTELLIGENCE_MODES.length} Modes Available
            </p>
            
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/shield-ai-chat">
                <Button variant="shield" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Open S.H.I.E.L.D. AI Chat
                </Button>
              </Link>
              <Link to="/ai-gateway">
                <Button variant="outline" className="gap-2">
                  <Bot className="w-4 h-4" />
                  AI Gateway
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Universal Intelligent Modes
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Select modes to activate specialized intelligence capabilities
                  </p>
                </div>
                {isInitiating && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 animate-pulse">
                    <Activity className="w-4 h-4" /> Initiating Sequence
                  </div>
                )}
              </div>

              <ScrollArea className="h-[60vh] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
                  {INTELLIGENCE_MODES.map((mode, index) => {
                    const isSelected = selectedModes.includes(mode);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => toggleMode(mode)}
                        className={`relative p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${
                          isSelected 
                            ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]" 
                            : "bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="shrink-0 pt-1">
                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-200">
                                <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
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
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="flex justify-between items-center pt-6 border-t border-border/50 mt-4">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold">{selectedModes.length}</span> of <span className="font-semibold">{INTELLIGENCE_MODES.length}</span> modes selected
                  {selectedModes.length > 0 && (
                    <span className="ml-2">• Default: Hands Free Mode</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedModes(["Hands Free Mode - S.H.I.E.L.D. AI takes care of everything for you"])}
                  >
                    Reset to Default
                  </Button>
                  <Button 
                    onClick={handleInitiate} 
                    variant="shield" 
                    disabled={isInitiating || selectedModes.length === 0}
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isInitiating ? "Initiating..." : "Activate Selected Modes"}
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="p-6 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Multi-Mode Activation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Activate multiple intelligence modes simultaneously for cross-domain analysis
                  and integrated solutions across different industries and use cases.
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  Context Awareness
                </h3>
                <p className="text-sm text-muted-foreground">
                  Each mode provides specialized context, vocabulary, and problem-solving
                  approaches optimized for its specific domain and industry requirements.
                </p>
              </Card>
              
              <Card className="p-6 bg-card/50 border-border/50">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Sovereign Intelligence
                </h3>
                <p className="text-sm text-muted-foreground">
                  All modes operate within the S.H.I.E.L.D. AI ethical framework with
                  universal truth alignment and sovereign operational capabilities.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntelligentModes;