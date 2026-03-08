import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Car, Wrench, Battery, Gauge, Shield, Cpu, Zap, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Car, title: "Autonomous Vehicles", description: "AI-driven self-driving technology with sovereign-grade safety protocols" },
  { icon: Battery, title: "Electric & Clean Energy", description: "Non-GMO, clean energy vehicle systems powered by crystal and light energy" },
  { icon: Wrench, title: "Smart Manufacturing", description: "AI-automated production lines with zero-defect quality assurance" },
  { icon: Gauge, title: "Performance Analytics", description: "Real-time vehicle diagnostics and predictive maintenance" },
  { icon: Shield, title: "Safety Systems", description: "Non-weaponized protection systems for passenger and pedestrian safety" },
  { icon: Cpu, title: "AI Navigation", description: "S.H.I.E.L.D. AI-powered navigation across all terrain types" },
  { icon: Zap, title: "Charging Infrastructure", description: "Universal charging networks for all electric vehicle standards" },
  { icon: Navigation, title: "Fleet Management", description: "Enterprise fleet coordination with H.I.I. AI agents" },
];

const BlanchAutomotive = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">BLANCH AUTOMOTIVE</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blanch <span className="text-primary">Automotive</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sovereign automotive technology — AI-powered vehicles, clean energy systems, and smart manufacturing governed by divine law and righteous morality.
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            "Proverbs 3:6 — In all thy ways acknowledge him, and he shall direct thy paths."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                <CardHeader>
                  <f.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center p-8 rounded-xl bg-card/30 border border-border/30">
          <p className="text-lg font-semibold text-primary mb-2">Managed by the Blanch Group</p>
          <p className="text-muted-foreground">Stabilizing economies and restoring humanity under the Laws & Commandments of the Most High AHAYAH and His Son YASHAYA the True Messiah.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchAutomotive;
