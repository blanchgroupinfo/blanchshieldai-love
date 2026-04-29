import { Button } from "@/components/ui/button";
import { Info, MessageCircle, Phone, Video, Send, MonitorSmartphone, Globe, Mail, BookOpen, Calendar, PhoneCall, PlaySquare, Gift, Ticket, Sparkles } from "lucide-react";

export const SharedActionButtons = () => {
  return (
    <div className="space-y-4 pt-4 border-t border-border/50 mt-6">
      <div className="space-y-2">
        <h4 className="font-semibold text-sm px-1 text-primary">Spiritual & Ecosystem Tools</h4>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <Button variant="outline" className="justify-between bg-card/50 text-left h-auto py-2">
            <span className="flex items-center"><Sparkles className="w-3 h-3 mr-2 shrink-0" /> Most High AHAYAH & YASHAYA Virtual Bible Study</span>
            <Info className="w-3 h-3 text-muted-foreground shrink-0" />
          </Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Sparkles className="w-3 h-3 mr-2 shrink-0" /> Ask S.H.I.E.L.D. AI</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><BookOpen className="w-3 h-3 mr-2 shrink-0" /> Learn Lashawan Qadash Hebrew</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Send className="w-3 h-3 mr-2 shrink-0" /> Send an Email</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Calendar className="w-3 h-3 mr-2 shrink-0" /> Schedule a Meeting</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><PhoneCall className="w-3 h-3 mr-2 shrink-0" /> Schedule Conference Call</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><PlaySquare className="w-3 h-3 mr-2 text-indigo-400 shrink-0" /> Schedule Hologram Conference</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Globe className="w-3 h-3 mr-2 text-primary shrink-0" /> Schedule Metaverse Conference</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Video className="w-3 h-3 mr-2 shrink-0" /> Schedule Video Conference</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Gift className="w-3 h-3 mr-2 text-pink-400 shrink-0" /> Search for Special Promotions</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Ticket className="w-3 h-3 mr-2 text-yellow-400 shrink-0" /> Search for Discounts & Rewards</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-sm px-1 text-primary">Live Communication</h4>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><MonitorSmartphone className="w-3 h-3 mr-2 text-primary shrink-0" /> S.H.I.E.L.D. AI Voice Assistant</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><MessageCircle className="w-3 h-3 mr-2 shrink-0" /> Live Chat</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Phone className="w-3 h-3 mr-2 shrink-0" /> Live Voice</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Video className="w-3 h-3 mr-2 shrink-0" /> Video Conference</Button>
          <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><PlaySquare className="w-3 h-3 mr-2 text-indigo-400 shrink-0" /> Hologram Conference</Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <Button variant="outline" className="justify-start bg-card/50"><MessageCircle className="w-3 h-3 mr-2 text-blue-400" /> Telegram App</Button>
          <Button variant="outline" className="justify-start bg-card/50"><MessageCircle className="w-3 h-3 mr-2 text-green-500" /> WhatsApp</Button>
          <Button variant="outline" className="justify-start bg-card/50"><MessageCircle className="w-3 h-3 mr-2 text-orange-500" /> Botim App</Button>
          <Button variant="outline" className="justify-start bg-card/50"><MessageCircle className="w-3 h-3 mr-2" /> SMS Text</Button>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="grid grid-cols-1 gap-2 text-xs">
           <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><Mail className="w-3 h-3 mr-2 shrink-0" /> Email Support</Button>
           <Button variant="outline" className="justify-start bg-card/50 text-left h-auto py-2"><MessageCircle className="w-3 h-3 mr-2 shrink-0" /> Customer Service Chat</Button>
        </div>
      </div>
    </div>
  );
};
