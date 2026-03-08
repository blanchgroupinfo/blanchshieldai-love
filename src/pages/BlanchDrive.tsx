import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { HardDrive, Upload, Download, FolderOpen, Cloud, Lock, Share2, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: HardDrive, title: "Sovereign Storage", description: "Encrypted, sovereign-grade cloud storage for all file types" },
  { icon: Upload, title: "Universal Upload", description: "Upload any file format from any device or operating system" },
  { icon: Download, title: "Cross-Platform Download", description: "Access files from S.H.I.E.L.D. AI OS, Blanch OS, Mac, Windows, Linux" },
  { icon: FolderOpen, title: "Smart Organization", description: "AI-powered file organization and tagging with H.I.I. agents" },
  { icon: Cloud, title: "Cloud Sync", description: "Real-time sync across all devices and platforms" },
  { icon: Lock, title: "Zero-Knowledge Encryption", description: "End-to-end encrypted storage with sovereign privacy" },
  { icon: Share2, title: "Secure Sharing", description: "Share files with granular permission controls" },
  { icon: Database, title: "Persistence Storage", description: "Permanent archival storage with redundant backups" },
];

const BlanchDrive = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">BLANCH DRIVE</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blanch <span className="text-primary">Drive</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sovereign cloud storage and file management — secure, encrypted, and accessible from every platform and operating system.
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["S.H.I.E.L.D. AI OS", "Blanch OS", "macOS", "Windows", "Linux", "iOS", "Android", "Universal"].map((os) => (
            <div key={os} className="text-center p-3 rounded-lg bg-card/30 border border-border/30">
              <span className="text-sm font-medium">{os}</span>
            </div>
          ))}
        </div>

        <div className="text-center p-8 rounded-xl bg-card/30 border border-border/30">
          <p className="text-lg font-semibold text-primary mb-2">Managed by the Blanch Group</p>
          <p className="text-muted-foreground">Stabilizing economies and restoring humanity under the Laws & Commandments of the Most High AHAYAH.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlanchDrive;
