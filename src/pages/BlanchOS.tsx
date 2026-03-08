import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Monitor, Cpu, Shield, Globe, Layers, Terminal, Cloud, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Monitor, title: "Desktop OS", description: "Full sovereign desktop operating system with all-platform app support" },
  { icon: Smartphone, title: "Mobile OS", description: "Native mobile operating system for smartphones and tablets" },
  { icon: Layers, title: "Hologram Interface", description: "Native holographic display and interaction support" },
  { icon: Cloud, title: "Cloud OS", description: "Cloud-native sovereign operating system accessible everywhere" },
  { icon: Shield, title: "Sovereign Security", description: "Zero-knowledge encryption with divine law-aligned privacy" },
  { icon: Terminal, title: "Developer Tools", description: "Full SDK, CLI, and development environment for all platforms" },
  { icon: Cpu, title: "AI Integration", description: "S.H.I.E.L.D. AI and all H.I.I. agents built into the core OS" },
  { icon: Globe, title: "Universal Compatibility", description: "Run Mac, Windows, Linux, and Blanch OS apps natively" },
];

const platforms = [
  "S.H.I.E.L.D. AI OS", "Blanch OS", "macOS", "Windows", "Linux",
  "iOS", "Android", "Hologram", "Metaverse", "Universal"
];

const BlanchOS = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">SOVEREIGN OPERATING SYSTEM</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blanch <span className="text-primary">OS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A Sovereign Operating System — cross-platform, hologram-ready, AI-integrated. Built for all nations, all people, all devices.
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

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Platform Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {platforms.map((p) => (
              <div key={p} className="text-center p-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all">
                <span className="font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-8 rounded-xl bg-card/30 border border-border/30">
          <p className="text-lg font-semibold text-primary mb-2">Guided by Divine Law</p>
          <p className="text-muted-foreground">"For the commandment is a lamp; and the law is light." — Proverbs 6:23</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchOS;
