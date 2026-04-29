import { Button } from "@/components/ui/button";
import { Info, Sparkles, Sun, Sunrise, Sunset, Moon, Video, Users, Mail, Bell, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { SharedActionButtons } from "./SharedActionButtons";

export const SpiritualGuidanceTab = () => {
  return (
    <div className="space-y-6 animate-fade-in p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            Daily Spiritual Guidance
            <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Button>
          </h3>
          <p className="text-xs text-muted-foreground">S.H.I.E.L.D. AI updates Every 15 Seconds everyday</p>
        </div>
        <Button size="sm" variant="shield" className="gap-2">
          <Sparkles className="w-3 h-3" /> Ask S.H.I.E.L.D. AI
        </Button>
      </div>

      {/* Time of Day Tracker */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-card/50 border border-border/50 rounded-xl p-3 text-center flex flex-col items-center gap-2">
          <Sunrise className="w-5 h-5 text-yellow-500" />
          <span className="text-[10px] font-semibold">Dawn/Sunrise</span>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-3 text-center flex flex-col items-center gap-2">
          <Sun className="w-5 h-5 text-orange-500" />
          <span className="text-[10px] font-semibold">Noon</span>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-3 text-center flex flex-col items-center gap-2">
          <Sunset className="w-5 h-5 text-rose-500" />
          <span className="text-[10px] font-semibold">Ninth Hour</span>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-3 text-center flex flex-col items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-400" />
          <span className="text-[10px] font-semibold">Sunset/Dusk</span>
        </div>
      </div>

      {/* Verses of the Day */}
      <div className="space-y-4">
        <motion.div whileHover={{ scale: 1.01 }} className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">Bible Verse of the Day</h4>
          <p className="text-sm font-body italic">"Trust in the Most High AHAYAH with all thine heart; and lean not unto thine own understanding."</p>
          <p className="text-xs text-muted-foreground mt-2 text-right">— Proverbs 3:5 (KJVA)</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="bg-shield-accent/5 border border-shield-accent/20 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-shield-accent mb-2 uppercase tracking-wider">Bible Gospel of the Day</h4>
          <p className="text-sm font-body italic">"For Most High AHAYAH so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."</p>
          <p className="text-xs text-muted-foreground mt-2 text-right">— John 3:16</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="bg-card border border-border/50 rounded-xl p-4">
          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Laws & Commandments of the Day</h4>
          <p className="text-sm font-body italic">"Thou shalt love thy neighbour as thyself."</p>
          <p className="text-xs text-muted-foreground mt-2 text-right">— Leviticus 19:18 (KJVA)</p>
        </motion.div>
      </div>

      {/* Truth Guidelines */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Truth & Locations</h4>
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-between h-auto py-3">
            <span className="text-xs text-left">Come to the Holy (Qadash Har) - Mount Sinai (Petra, Jordan)</span>
            <Info className="w-4 h-4 shrink-0 text-muted-foreground" />
          </Button>
          <Button variant="outline" className="w-full justify-between h-auto py-3">
            <span className="text-xs text-left">Masada, Israel the True Mount Zion</span>
            <Info className="w-4 h-4 shrink-0 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Action Buttons Matrix */}
      <SharedActionButtons />
    </div>
  );
};
