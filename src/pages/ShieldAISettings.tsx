import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Globe, Palette, Lock, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const settingSections = [
  { icon: User, title: "Profile Settings", description: "Manage your personal information and avatar" },
  { icon: Bell, title: "Notifications", description: "Configure alerts, reminders, and holy day notifications" },
  { icon: Shield, title: "Security & Privacy", description: "Two-factor authentication, encryption, and access controls" },
  { icon: Globe, title: "Language & Region", description: "Set language, timezone, and regional preferences" },
  { icon: Palette, title: "Appearance", description: "Theme, display density, and accessibility options" },
  { icon: Lock, title: "API & Access Keys", description: "Manage API keys and third-party integrations" },
  { icon: Monitor, title: "Connected Devices", description: "View and manage all connected devices and sessions" },
];

const ShieldAISettings = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">S.H.I.E.L.D. AI SETTINGS</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            S.H.I.E.L.D. AI <span className="text-primary">Settings</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure your S.H.I.E.L.D. AI OS experience
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {settingSections.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <s.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                  <Switch />
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

export default ShieldAISettings;
