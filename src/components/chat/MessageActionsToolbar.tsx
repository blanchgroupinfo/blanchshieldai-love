import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mic, MicOff, Video, VideoOff, PlaySquare, Volume2, VolumeX,
  ThumbsUp, ThumbsDown, Share2, RefreshCw, Edit3, Cpu,
  Download, Copy, Cloud, HardDrive, Database, Globe, Camera, Megaphone
} from "lucide-react";
import { toast } from "sonner";
import { getCreatorDateForGregorian } from "@/data/creatorsCalendar";

export const MessageActionsToolbar = ({ isUser = false }: { isUser?: boolean }) => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [hologramOn, setHologramOn] = useState(false);
  const [volumeOn, setVolumeOn] = useState(true);
  const [shofarMode, setShofarMode] = useState<'off' | 'shofar' | 'trumpet' | 'both'>('off');

  const handleAction = (action: string) => {
    toast.success(`Action Triggered: ${action}`);
  };

  return (
    <div className="flex flex-col gap-1 mt-2 w-full">
      <div className="flex flex-wrap gap-1 items-center bg-card/50 p-1 rounded-lg border border-border/50">
        
        {/* A/V Controls */}
        <Button variant="ghost" size="icon" className={`h-6 w-6 rounded-md ${micOn ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => setMicOn(!micOn)} title={micOn ? "Stop Recording" : "Start Recording"}>
          {micOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
        </Button>
        <Button variant="ghost" size="icon" className={`h-6 w-6 rounded-md ${!volumeOn ? 'text-red-500' : 'text-muted-foreground'}`} onClick={() => setVolumeOn(!volumeOn)} title={volumeOn ? "Voice Mute Audio" : "Voice Unmute Audio"}>
          {volumeOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </Button>
        <Button variant="ghost" size="icon" className={`h-6 w-6 rounded-md ${videoOn ? 'text-secondary' : 'text-muted-foreground'}`} onClick={() => setVideoOn(!videoOn)} title={videoOn ? "Video  Conference Turn Camera Off" : "Video Conference Turn Camera On"}>
          {videoOn ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
        </Button>
        <Button variant="ghost" size="icon" className={`h-6 w-6 rounded-md ${hologramOn ? 'text-indigo-400' : 'text-muted-foreground'}`} onClick={() => setHologramOn(!hologramOn)} title={hologramOn ? "Hologram Off" : "Hologram On"}>
          <PlaySquare className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-md" onClick={() => handleAction('Camera')} title="Take a Photo/Video">
          <Camera className="w-3 h-3" />
        </Button>

        <div className="w-px h-4 bg-border/50 mx-1" />

        {/* Social / Native Controls */}
        {!isUser && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-6 w-6 rounded-md ${shofarMode !== 'off' ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'}`} 
              onClick={() => {
                const modes: ('off' | 'shofar' | 'trumpet' | 'both')[] = ['off', 'shofar', 'trumpet', 'both'];
                const currentIndex = modes.indexOf(shofarMode);
                setShofarMode(modes[(currentIndex + 1) % modes.length]);
                handleAction(`Shofar Mode: ${modes[(currentIndex + 1) % modes.length]}`);
              }} 
              title={shofarMode === 'off' ? "Shofar/Trumpet: Off" : shofarMode === 'shofar' ? "Shofar: On" : shofarMode === 'trumpet' ? "Trumpet: On" : "Both: On"}
            >
              <Megaphone className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-green-500 rounded-md" onClick={() => handleAction('Like')} title="Like"><ThumbsUp className="w-3 h-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-red-500 rounded-md" onClick={() => handleAction('Unlike')} title="Unlike"><ThumbsDown className="w-3 h-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-md" onClick={() => handleAction('Regenerate')} title="Regenerate Response"><RefreshCw className="w-3 h-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-shield-accent rounded-md" onClick={() => handleAction('Evolve')} title="Evolve Response"><Cpu className="w-3 h-3" /></Button>
          </>
        )}
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-md" onClick={() => handleAction('Share')} title="Share"><Share2 className="w-3 h-3" /></Button>
        {isUser && <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-md" onClick={() => handleAction('Edit')} title="Edit in Chat"><Edit3 className="w-3 h-3" /></Button>}
          <Button variant="ghost" size = "icon" className = "h-6 w-6 text-muted-foreground hover:text-primary rounded-md" onClick = {() => handleAction('Download')} title = "Download" > <Download className="w-3 h-3" /> </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-md" onClick={() => handleAction('Copy')} title="Copy"><Copy className="w-3 h-3" /></Button>

        <div className="w-px h-4 bg-border/50 mx-1 hidden sm:block" />

        {/* Cloud Saves */}
        <div className="hidden sm:flex gap-1">
          <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[9px] text-muted-foreground hover:text-primary gap-1" onClick={() => handleAction('Save Blanch Cloud')} title="Save to Blanch Cloud">
            <Cloud className="w-3 h-3" /> Blanch Cloud
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[9px] text-muted-foreground hover:text-secondary gap-1" onClick={() => handleAction('Save Blanch Drive')} title="Save to Blanch Drive">
             <HardDrive className="w-3 h-3" /> Blanch Drive
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[9px] text-muted-foreground hover:text-shield-accent gap-1" onClick={() => handleAction('Save SHIELD Cloud')} title="Save to S.H.I.E.L.D. AI Cloud">
             <Cloud className="w-3 h-3" /> SHIELD Cloud
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[9px] text-muted-foreground hover:text-green-500 gap-1" onClick={() => handleAction('Save SHIELD Drive')} title="Save to S.H.I.E.L.D. AI Drive">
             <Database className="w-3 h-3" /> SHIELD Drive
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[9px] text-muted-foreground hover:text-primary gap-1" onClick={() => handleAction('Go to Media Portal')} title="Go to S.H.I.E.L.D. AI Media Portal">
             <Globe className="w-3 h-3" /> Media Portal
          </Button>
        </div>
      </div>
      
      <div className="flex sm:hidden overflow-x-auto scrollbar-none gap-1 mt-1">
          <Button variant="secondary" size="sm" className="h-6 px-2 text-[9px] shrink-0" onClick={() => handleAction('Save Blanch Cloud')} title="Save Blanch Cloud">Save Blanch Cloud</Button>
          <Button variant="secondary" size="sm" className="h-6 px-2 text-[9px] shrink-0" onClick={() => handleAction('Save Blanch Drive')} title="Save Blanch Drive">Save Blanch Drive</Button>
          <Button variant="secondary" size="sm" className="h-6 px-2 text-[9px] shrink-0" onClick={() => handleAction('Save SHIELD Cloud')} title="Save SHIELD Cloud">Save SHIELD. AI Cloud</Button>
          <Button variant="secondary" size="sm" className="h-6 px-2 text-[9px] shrink-0" onClick={() => handleAction('Save SHIELD Drive')} title="Save SHIELD Drive">Save SHIELD. AI Drive</Button>
          <Button variant="outline" size="sm" className="h-6 px-2 text-[9px] shrink-0 bg-card" onClick={() => handleAction('Go to Media Portal')} title="Media Portal">Media Portal</Button>
      </div>

      <div className="text-[9px] text-muted-foreground text-right px-1 mt-1">
        <div>Gregorian Date: {new Date().toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit" })}</div>
        <div>Creators Restoration Date: {(() => { const cd = getCreatorDateForGregorian(new Date()); return cd ? `Month ${cd.month}, Day ${cd.day}, and Year ${cd.creatorYearNum}` : 'Loading...'; })()}</div>
        <div>Hebrew Year: {new Intl.DateTimeFormat("en-US-u-ca-hebrew", { year: "numeric" }).format(new Date())}</div>
      </div>
    </div>
  );
};
