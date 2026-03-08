import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FolderOpen, File, Upload, Download, Monitor, Smartphone, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const osSystems = ["S.H.I.E.L.D. AI OS", "Blanch OS", "macOS", "Windows", "Linux", "Universal"];

const fileSystems = ["NTFS", "APFS", "HFS+", "ext4", "FAT32", "exFAT", "Flatpak"];

const capabilities = [
  "Create/Read/Write S.H.I.E.L.D. AI OS/Blanch OS/Mac/Windows/Linux",
  "Create/Read/Write Windows files on S.H.I.E.L.D. AI OS/Blanch OS/Mac/Linux",
  "Create/Read/Write Mac files on S.H.I.E.L.D. AI OS/Blanch OS/Windows/Linux",
  "Create/Read/Write Linux files on S.H.I.E.L.D. AI OS/Blanch OS/Windows/Mac",
  "Automatic format conversion",
  "Persistence storage support",
  "Import & Export all file formats",
];

const UniversalFileSystem = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">UNIVERSAL FILE SYSTEM</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Universal <span className="text-primary">File System Manager</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create, Read, Organize all file formats — cross-platform universal file management for every operating system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <Monitor className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Supported Operating Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {osSystems.map((os) => (
                  <div key={os} className="p-2 rounded bg-primary/5 border border-primary/20 text-center text-sm">{os}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <FolderOpen className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Supported File Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {fileSystems.map((fs) => (
                  <div key={fs} className="p-2 rounded bg-primary/5 border border-primary/20 text-center text-sm font-mono">{fs}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border/50 mb-16">
          <CardHeader>
            <CardTitle>Cross-Platform Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {capabilities.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Upload, label: "Import Files" },
            { icon: Download, label: "Export Files" },
            { icon: Globe, label: "Universal Access" },
            { icon: Shield, label: "Encrypted Storage" },
          ].map((a, i) => (
            <Card key={i} className="bg-card/50 border-border/50 text-center p-6">
              <a.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-sm">{a.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default UniversalFileSystem;
