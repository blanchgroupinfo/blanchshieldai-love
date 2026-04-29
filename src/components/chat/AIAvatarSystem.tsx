import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, Upload, Sparkles, Bot, Zap, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdvancedFileUpload } from "./AdvancedFileUpload";

export const AIAvatarSystem = () => {
  const [avatarType, setAvatarType] = useState<"lead" | "clone" | "influencer" | "android" | null>(null);

  const triggerGeneration = () => {
    toast.success("S.H.I.E.L.D. AI is creating and generating your active Avatar. Please wait...");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-8 px-2 bg-primary/10 hover:bg-primary/20 border border-primary/30">
          <User className="w-3 h-3 text-primary" />
          <span className="text-xs font-semibold text-primary">S.H.I.E.L.D. AI Avatar Watchman</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
             S.H.I.E.L.D. AI Watchman Identity Systems
             <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
                <Info className="w-4 h-4 text-muted-foreground" />
              </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 pt-2 border-t border-border/50">
          <h4 className="text-sm font-semibold mb-3">Compliance & Identification Status</h4>
          <ScrollArea className="h-[170px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-2">
              
               <div className="bg-background border border-border/50 rounded-lg p-3">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold text-[11px]">Blanch S.H.I.E.L.D. AI ID Number</span>
                   <div className="flex gap-1">
                     <Info className="w-3 h-3 text-muted-foreground" />
                     <Button variant="ghost" size="icon" className="w-4 h-4 p-0"><Sparkles className="w-3 h-3 text-primary" /></Button>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-1 mb-2">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Copy Affiliate Url</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Affiliate Program</Badge>
                 </div>
                 <p className="text-muted-foreground text-[10px] mb-1 flex items-center justify-between">Legal Entity Identifier (LEI) Number <Info className="w-3 h-3 text-muted-foreground" /></p>
                 <div className="flex flex-wrap gap-1">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">View Certificate</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Download Certificate</Badge>
                 </div>
               </div>

               <div className="bg-background border border-border/50 rounded-lg p-3">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold text-[11px]">Blanch Group Circle Agent Blanch S.H.I.E.L.D. AI ID Number</span>
                   <div className="flex gap-1">
                     <Info className="w-3 h-3 text-muted-foreground" />
                     <Button variant="ghost" size="icon" className="w-4 h-4 p-0"><Sparkles className="w-3 h-3 text-primary" /></Button>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-1 mb-2">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Copy Affiliate Url</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Affiliate Program</Badge>
                 </div>
                 <p className="text-muted-foreground text-[10px] mb-1 flex items-center justify-between">Legal Entity Identifier (LEI) Number <Info className="w-3 h-3 text-muted-foreground" /></p>
                 <div className="flex flex-wrap gap-1">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">View Certificate</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Download Certificate</Badge>
                 </div>
               </div>

               <div className="bg-background border border-border/50 rounded-lg p-3">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold text-[11px]">Blanch & Co Circle Agent Blanch S.H.I.E.L.D. AI ID Number</span>
                   <div className="flex gap-1">
                     <Info className="w-3 h-3 text-muted-foreground" />
                     <Button variant="ghost" size="icon" className="w-4 h-4 p-0"><Sparkles className="w-3 h-3 text-primary" /></Button>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-1 mb-2">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Copy Affiliate Url</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Affiliate Program</Badge>
                 </div>
                 <p className="text-muted-foreground text-[10px] mb-1 flex items-center justify-between">Legal Entity Identifier (LEI) Number <Info className="w-3 h-3 text-muted-foreground" /></p>
                 <div className="flex flex-wrap gap-1">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">View Certificate</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Download Certificate</Badge>
                 </div>
               </div>

               <div className="bg-background border border-border/50 rounded-lg p-3">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold text-[11px]">Blanch Network Circle Agent Blanch S.H.I.E.L.D. AI ID Number</span>
                   <div className="flex gap-1">
                     <Info className="w-3 h-3 text-muted-foreground" />
                     <Button variant="ghost" size="icon" className="w-4 h-4 p-0"><Sparkles className="w-3 h-3 text-primary" /></Button>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-1 mb-2">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Copy Affiliate Url</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Affiliate Program</Badge>
                 </div>
                 <p className="text-muted-foreground text-[10px] mb-1 flex items-center justify-between">Legal Entity Identifier (LEI) Number <Info className="w-3 h-3 text-muted-foreground" /></p>
                 <div className="flex flex-wrap gap-1">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">View Certificate</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Download Certificate</Badge>
                 </div>
               </div>

               <div className="bg-background border border-border/50 rounded-lg p-3 sm:col-span-2">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold text-[11px]">Kingdom of Jerusalem, Royal House of Israel (Malakawath Yarawashalam, Mamalakah Bayath Yasharahala) Circle Agent Blanch S.H.I.E.L.D. AI ID Number</span>
                   <div className="flex gap-1">
                     <Info className="w-3 h-3 text-muted-foreground" />
                     <Button variant="ghost" size="icon" className="w-4 h-4 p-0"><Sparkles className="w-3 h-3 text-primary" /></Button>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-1 mb-2">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Copy Affiliate Url</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Affiliate Program</Badge>
                 </div>
                 <p className="text-muted-foreground text-[10px] mb-1 flex items-center justify-between">Legal Entity Identifier (LEI) Number <Info className="w-3 h-3 text-muted-foreground" /></p>
                 <div className="flex flex-wrap gap-1">
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">View Certificate</Badge>
                   <Badge variant="outline" className="text-[9px] cursor-pointer hover:bg-muted">Download Certificate</Badge>
                 </div>
               </div>

            </div>
          </ScrollArea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Lead Avatar */}
          <div className="bg-card/50 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-primary mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Lead Avatar Watchman
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Let S.H.I.E.L.D. AI create and generate a unique Avatar for you. Experience Hands Free Sequence.</p>
             <div className="flex gap-2">
               <Button size="sm" variant="shield" onClick={triggerGeneration} className="text-xs flex-1">
                 Ask S.H.I.E.L.D. AI to Generate
               </Button>
               <AdvancedFileUpload
                 onFilesSelected={(files) => toast.success(`Avatar uploaded: ${files[0].name}`)}
                 className="text-xs px-2 h-8 rounded-lg"
               />
             </div>
          </div>

          {/* AI Clone / Twin */}
          <div className="bg-card/50 p-4 rounded-xl border border-border/50 hover:border-secondary/50 transition-colors">
            <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> AI Clone / Twin Watchman
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Create a S.H.I.E.L.D. AI twin from your photo. Experience Hands Free Sequence automation.</p>
             <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={triggerGeneration} className="text-xs flex-1">
                 Ask S.H.I.E.L.D. AI to Generate
               </Button>
               <AdvancedFileUpload
                 onFilesSelected={(files) => toast.success(`Clone uploaded: ${files[0].name}`)}
                 className="text-xs px-2 h-8 rounded-lg"
               />
             </div>
          </div>

          {/* Lead Influencer */}
          <div className="bg-card/50 p-4 rounded-xl border border-border/50 hover:border-pink-500/50 transition-colors">
            <h3 className="font-semibold text-pink-500 mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Lead Influencer Watchman
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Select from professional H.I.I. AI Watchman and deploy your Lead Category Influencer.</p>
             <div className="flex gap-2">
               <Button size="sm" onClick={triggerGeneration} className="bg-pink-500 hover:bg-pink-600 text-white text-xs flex-1">
                 Create Influencer
               </Button>
               <AdvancedFileUpload
                 onFilesSelected={(files) => toast.success(`Influencer uploaded: ${files[0].name}`)}
                 className="text-xs px-2 h-8 rounded-lg"
               />
             </div>
          </div>

          {/* Non Biological Android */}
          <div className="bg-card/50 p-4 rounded-xl border border-border/50 hover:border-blue-500/50 transition-colors">
            <h3 className="font-semibold text-blue-500 mb-1 flex items-center gap-2">
              <Bot className="w-4 h-4" /> Non-Biological Android Agent
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Select or generate Custom Non-Biological Humanoid Watchman Agents.</p>
              <div className="flex gap-2">
               <Button size="sm" onClick={triggerGeneration} className="bg-blue-500 hover:bg-blue-600 text-white text-xs flex-1">
                 Create Android Agent
               </Button>
               <AdvancedFileUpload
                 onFilesSelected={(files) => toast.success(`Android uploaded: ${files[0].name}`)}
                 className="text-xs px-2 h-8 rounded-lg"
               />
             </div>
          </div>
        </div>


        
      </DialogContent>
    </Dialog>
  );
};
