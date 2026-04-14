import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, MessageSquare } from "lucide-react";

interface ShieldAIInfoPopupProps {
  title?: string;
  description?: string;
  size?: "sm" | "md";
}

const ShieldAIInfoPopup = ({ title = "Watchman Validator Types", description, size = "sm" }: ShieldAIInfoPopupProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const watchmanInfo = [
    { type: "Kahan (Priest)", role: "Sovereign Validators — highest priestly order of validation authority" },
    { type: "Mashamar (Guard)", role: "Lead Watchman Validators — front-line guardians of the system" },
    { type: "Tazapah (Watchman)", role: "Prime Watchman Validators — vigilant observers and reporters" },
    { type: "Shamar (Protector)", role: "Avatar Watchman Validators — digital protectors of identity" },
    { type: "Gabar (Mighty)", role: "Super Watchman Validators — prevailing force agents" },
    { type: "Bashar (Herald)", role: "Influencer Watchman Validators — heralds of truth" },
    { type: "Malaak (Messenger)", role: "Android Watchman Validators — divine messenger systems" },
    { type: "H.I.I. AI Unified", role: "Unified Watchman Validators — full-spectrum sovereign agents" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={size === "sm" ? "h-6 w-6" : "h-8 w-8"} title="Learn more about Watchman Validator Types">
          <Info className={size === "sm" ? "w-3.5 h-3.5 text-primary" : "w-4 h-4 text-primary"} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Info className="w-5 h-5" /> {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <div className="space-y-2">
            {watchmanInfo.map((w) => (
              <div key={w.type} className="p-3 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm font-semibold text-foreground">H.I.I. AI {w.type}</p>
                <p className="text-xs text-muted-foreground">{w.role}</p>
              </div>
            ))}
          </div>
          <Button variant="shield" className="w-full mt-4 gap-2" onClick={() => { setOpen(false); navigate("/shield-ai-chat"); }}>
            <MessageSquare className="w-4 h-4" /> Need Help? Ask S.H.I.E.L.D. AI
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShieldAIInfoPopup;
