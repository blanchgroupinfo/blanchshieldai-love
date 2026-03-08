import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Zap, Sun, Battery, Lightbulb, Leaf, Globe, Gauge, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const energySystems = [
  { icon: Sun, title: "Solar Energy", description: "Advanced photovoltaic systems with AI-optimized output" },
  { icon: Zap, title: "Crystal Energy", description: "Crystalline resonance power generation — clean and infinite" },
  { icon: Lightbulb, title: "Light Energy", description: "Photonic synthesis and prismic refraction energy systems" },
  { icon: Battery, title: "Energy Storage", description: "Next-generation battery systems with sovereign grid management" },
  { icon: Leaf, title: "Sustainable Resources", description: "Non-GMO, environmentally pure energy infrastructure" },
  { icon: Globe, title: "Global Grid", description: "Universal energy distribution for all nations and peoples" },
  { icon: Gauge, title: "Smart Metering", description: "AI-powered consumption analytics and optimization" },
  { icon: Shield, title: "Grid Security", description: "Sovereign-grade protection for energy infrastructure" },
];

const BlanchEnergy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">BLANCH ENERGY</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blanch <span className="text-primary">Energy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            All energy systems — solar, crystal, light, and sustainable resources for all nations. Clean, sovereign energy governed by divine law.
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            "John 8:32 — And ye shall know the truth, and the truth shall make you free."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {energySystems.map((f, i) => (
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
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchEnergy;
