import { Lock } from "lucide-react";

const pillars = [
  { num: 1, name: "Core Intelligence", range: "H.I.I. AI001–AI074", capacity: 74 },
  { num: 2, name: "Sovereign Identity, Culture & Representation", range: "H.I.I. AI075–AI148", capacity: 74 },
  { num: 3, name: "Automation & Operations", range: "H.I.I. AI149–AI222", capacity: 74 },
  { num: 4, name: "Business, Banking, Finance & Economics", range: "H.I.I. AI223–AI296", capacity: 74 },
  { num: 5, name: "Creative, Media & Entertainment", range: "H.I.I. AI297–AI370", capacity: 74 },
  { num: 6, name: "Governance, Sovereign & Law", range: "H.I.I. AI371–AI444", capacity: 74 },
  { num: 7, name: "Human Development", range: "H.I.I. AI445–AI518", capacity: 74 },
  { num: 8, name: "Health & Wellness", range: "H.I.I. AI519–AI592", capacity: 74 },
  { num: 9, name: "Infrastructure, Security & Technology", range: "H.I.I. AI593–AI666", capacity: 74 },
  { num: 10, name: "Environment & Earth Systems", range: "H.I.I. AI667–AI740", capacity: 74 },
  { num: 11, name: "Science & Exploration", range: "H.I.I. AI741–AI814", capacity: 74 },
  { num: 12, name: "Spiritual, Sovereign Intelligence & Ethical Systems", range: "H.I.I. AI815–AI888", capacity: 74 },
];

const PillarAllocation = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-wider text-primary">SOVEREIGN 12 PILLAR MASTER ALLOCATION</span>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-3 font-display text-xs text-muted-foreground">Pillar #</th>
                <th className="text-left py-3 px-3 font-display text-xs text-muted-foreground">Pillar Name</th>
                <th className="text-left py-3 px-3 font-display text-xs text-muted-foreground">H.I.I. ID Range</th>
                <th className="text-center py-3 px-3 font-display text-xs text-muted-foreground">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {pillars.map((p) => (
                <tr key={p.num} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                  <td className="py-2.5 px-3 font-display font-bold text-primary">{p.num}</td>
                  <td className="py-2.5 px-3 text-foreground font-body">{p.name}</td>
                  <td className="py-2.5 px-3 text-muted-foreground font-mono text-xs">{p.range}</td>
                  <td className="py-2.5 px-3 text-center text-primary font-display font-bold">{p.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PillarAllocation;
