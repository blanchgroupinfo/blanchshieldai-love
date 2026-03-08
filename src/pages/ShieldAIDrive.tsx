import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { HardDrive, Upload, Download, FolderOpen, Cloud, Lock, Share2, Database, Shield, Zap, Search, FileText, Image, Video, Music, Archive, Trash2, Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const features = [
  { icon: Shield, title: "Quantum Encryption", description: "Military-grade AES-256 + quantum-resistant encryption for all stored data" },
  { icon: Upload, title: "AI-Powered Upload", description: "Smart upload with automatic categorization by H.I.I. AI agents" },
  { icon: Cloud, title: "Infinite Cloud Sync", description: "Real-time sync across all S.H.I.E.L.D. AI OS devices and platforms" },
  { icon: FolderOpen, title: "Intelligent Organization", description: "AI-driven file organization, tagging, and duplicate detection" },
  { icon: Share2, title: "Sovereign Sharing", description: "Share files with blockchain-verified permissions and access logs" },
  { icon: Database, title: "Eternal Archival", description: "Permanent storage on distributed ledger with 888-node redundancy" },
  { icon: Lock, title: "Zero-Knowledge Privacy", description: "Your files are encrypted before leaving your device — only you hold the keys" },
  { icon: Zap, title: "Lightning Access", description: "Edge-cached delivery with sub-millisecond retrieval from any location" },
];

const fileCategories = [
  { icon: FileText, label: "Documents", count: 2847, size: "12.4 GB", color: "text-blue-400" },
  { icon: Image, label: "Images", count: 15203, size: "45.8 GB", color: "text-emerald-400" },
  { icon: Video, label: "Videos", count: 342, size: "128.6 GB", color: "text-purple-400" },
  { icon: Music, label: "Audio", count: 1856, size: "22.1 GB", color: "text-amber-400" },
  { icon: Archive, label: "Archives", count: 89, size: "34.2 GB", color: "text-rose-400" },
  { icon: Database, label: "AI Models", count: 24, size: "256.0 GB", color: "text-cyan-400" },
];

const recentFiles = [
  { name: "shield-protocol-v3.pdf", type: "Document", size: "4.2 MB", modified: "2 min ago", starred: true },
  { name: "agent-deployment-logs.json", type: "Data", size: "12.8 MB", modified: "15 min ago", starred: false },
  { name: "blockchain-audit-2026.xlsx", type: "Spreadsheet", size: "8.1 MB", modified: "1 hr ago", starred: true },
  { name: "sovereign-identity-backup.enc", type: "Encrypted", size: "2.4 GB", modified: "3 hr ago", starred: false },
  { name: "hii-ai-training-data.tar.gz", type: "Archive", size: "45.6 GB", modified: "6 hr ago", starred: false },
  { name: "divine-protocol-whitepaper.docx", type: "Document", size: "1.8 MB", modified: "1 day ago", starred: true },
];

const ShieldAIDrive = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "files" | "shared">("overview");
  const totalStorage = 512;
  const usedStorage = 499.1;
  const storagePercent = Math.round((usedStorage / totalStorage) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">S.H.I.E.L.D. AI DRIVE</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              S.H.I.E.L.D. AI <span className="text-primary">Drive</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sovereign cloud storage powered by quantum encryption and AI-driven organization — your data, your keys, eternal access.
            </p>
          </motion.div>

          {/* Storage Overview Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-card/60 border-border/50 mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <HardDrive className="h-5 w-5 text-primary" />
                      Storage Usage
                    </h3>
                    <p className="text-sm text-muted-foreground">{usedStorage} TB of {totalStorage} TB used</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Upload className="h-3.5 w-3.5" /> Upload
                    </Button>
                    <Button variant="shield" size="sm" className="gap-1.5">
                      <Zap className="h-3.5 w-3.5" /> Upgrade Storage
                    </Button>
                  </div>
                </div>
                <Progress value={storagePercent} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{storagePercent}% used</span>
                  <span>{(totalStorage - usedStorage).toFixed(1)} TB free</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8">
            {[
              { key: "overview" as const, label: "Overview", icon: HardDrive },
              { key: "files" as const, label: "Recent Files", icon: Clock },
              { key: "shared" as const, label: "Shared with Me", icon: Users },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "shield" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className="gap-1.5"
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* File Categories */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  File Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {fileCategories.map((cat, i) => (
                    <motion.div key={cat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
                        <CardContent className="p-4 text-center">
                          <cat.icon className={`h-8 w-8 mx-auto mb-2 ${cat.color} group-hover:scale-110 transition-transform`} />
                          <p className="text-sm font-medium">{cat.label}</p>
                          <p className="text-xs text-muted-foreground">{cat.count.toLocaleString()} files</p>
                          <p className="text-xs text-primary font-mono mt-1">{cat.size}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Drive Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {features.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                        <CardHeader className="pb-2">
                          <f.icon className="w-7 h-7 text-primary mb-1" />
                          <CardTitle className="text-base">{f.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{f.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Files Tab */}
          {activeTab === "files" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Recent Files
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        <Search className="h-3.5 w-3.5" /> Search
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  {recentFiles.map((file, i) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{file.modified}</span>
                        {file.starred && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Shared Tab */}
          {activeTab === "shared" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center py-16">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Shared Files</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Files shared with you through S.H.I.E.L.D. AI's sovereign sharing protocol will appear here.
                </p>
              </div>
            </motion.div>
          )}

          {/* Platform Support */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["S.H.I.E.L.D. AI OS", "Blanch OS", "macOS", "Windows", "Linux", "iOS", "Android", "Universal API"].map((os) => (
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
};

export default ShieldAIDrive;
