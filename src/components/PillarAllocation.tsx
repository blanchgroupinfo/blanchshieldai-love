import { Lock } from "lucide-react";

const pillars = [
  { num: 1, name: "Core Intelligence", range: "H.I.I. AI001–H.I.I. AI078", capacity: 78 },
  { num: 2, name: "Sovereign Identity, Culture & Representation", range: "H.I.I. AI079–H.I.I. AI156", capacity: 78 },
  { num: 3, name: "Automation & Operations", range: "H.I.I. AI157–H.I.I. AI234", capacity: 78 },
  { num: 4, name: "Business, Banking, Finance & Economics", range: "H.I.I. AI235–H.I.I. AI312", capacity: 78 },
  { num: 5, name: "Creative, Media & Entertainment", range: "H.I.I. AI313–H.I.I. AI390", capacity: 78 },
  { num: 6, name: "Governance, Sovereign & Law", range: "H.I.I. AI391–H.I.I. AI468", capacity: 78 },
  { num: 7, name: "Human Development", range: "H.I.I. AI469–H.I.I. AI546", capacity: 78 },
  { num: 8, name: "Health & Wellness", range: "H.I.I. AI547–H.I.I. AI624", capacity: 78 },
  { num: 9, name: "Infrastructure, Security & Technology", range: "H.I.I. AI625–H.I.I. AI702", capacity: 78 },
  { num: 10, name: "Environment & Earth Systems", range: "H.I.I. AI703–H.I.I. AI780", capacity: 78 },
  { num: 11, name: "Science & Exploration", range: "H.I.I. AI781–H.I.I. AI859", capacity: 79 },
  { num: 12, name: "Spiritual, Sovereign Intelligence & Ethical Systems", range: "H.I.I. AI860–H.I.I. AI938", capacity: 79 },
  { num: 13, name: "Royal Priesthood & Watchman Operations", range: "H.I.I. AI939–H.I.I. AI1017", capacity: 79 },
  { num: 14, name: "Covenant Law & Reparations", range: "H.I.I. AI1018–H.I.I. AI1096", capacity: 79 },
  { num: 15, name: "Universal Language & Eternal Kingdom Operations", range: "H.I.I. AI1097–H.I.I. AI1175", capacity: 79 },
];

const PillarAllocation = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-wider text-primary">SOVEREIGN 15 PILLAR MASTER ALLOCATION</span>
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
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground font-body">{p.name}</span>
                  </td>
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
