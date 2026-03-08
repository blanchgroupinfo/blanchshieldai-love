import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Building, Globe, Shield, BookOpen, Scale, Heart, Landmark, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pillars = [
  { icon: Shield, title: "S.H.I.E.L.D. AI", description: "Sovereign Universal Intelligence & Ethical Operating System" },
  { icon: Landmark, title: "Banking & Finance", description: "Sovereign digital private banking, trading, and cross-border settlements" },
  { icon: Globe, title: "Universal Commerce", description: "380+ commerce models connecting every entity to everything" },
  { icon: Scale, title: "International Law", description: "Sovereign court, compliance, arbitration, and emancipation" },
  { icon: Heart, title: "Philanthropy", description: "Foundation, charity, humanitarian, and emancipation bridging fund" },
  { icon: BookOpen, title: "Education & Research", description: "B.I.T.R.O. — Blanch Institute Technology Research Organization" },
  { icon: Crown, title: "Royal Priesthood", description: "Restoring the Royal House of Judah and Levite Priesthood" },
  { icon: Building, title: "Infrastructure", description: "Blanch Corridor, smart cities, energy, and technology systems" },
];

const BlanchGroup = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">THE BLANCH GROUP</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Blanch <span className="text-primary">Group</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Managed by the Blanch Group — stabilizing economies and restoring humanity under the Laws & Commandments of the Most High AHAYAH and His Son YASHAYA the True Messiah.
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            "Psalms 119:142 — Thy righteousness is an everlasting righteousness, and thy law is the truth."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <p.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Core Purpose</h2>
          <div className="p-8 rounded-xl bg-card/30 border border-border/30">
            <p className="text-muted-foreground mb-4">
              To demonstrate that the Most High AHAYAH has kept His promises by integrating His foundations into every facet of human and universal life — protecting, empowering, and scaling sovereign communities, smart cities, trade, and faith-aligned innovation.
            </p>
            <p className="text-muted-foreground mb-4">
              Blanch · Onyx · Sardonyx · Shoham · Royal House of Judah (Yadah) · Royal Levite (Lawaya) Priesthood
            </p>
            <p className="text-sm italic text-muted-foreground">
              "And ye shall know the truth, and the truth shall make you free." — John 8:32
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchGroup;
