import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Network, Globe, Users, Building, Shield, Zap, Link, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Network, title: "Universal Network", description: "Connecting all businesses, governments, and organizations globally" },
  { icon: Globe, title: "Global Reach", description: "Operations across all nations, languages, and peoples" },
  { icon: Users, title: "B2B Networking", description: "Professional social business networking with AI-powered matching" },
  { icon: Building, title: "Enterprise Hub", description: "Sovereign-grade enterprise communications and collaboration" },
  { icon: Shield, title: "Trust Protocol", description: "Verified, compliant business connections with audit trails" },
  { icon: Zap, title: "Real-Time", description: "Instant messaging, video conference, and holographic meetings" },
  { icon: Link, title: "API Integration", description: "Connect any system with the S.H.I.E.L.D. AI Gateway" },
  { icon: Layers, title: "Multi-Layer", description: "Network across physical, digital, metaverse, and holographic layers" },
];

const BlanchNetwork = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">BLANCH NETWORK</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blanch <span className="text-primary">Network</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The universal professional network — connecting businesses, governments, and organizations across all nations for righteous commerce and collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchNetwork;
