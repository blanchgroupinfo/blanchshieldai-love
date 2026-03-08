import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Monitor, FolderOpen, Cpu, Activity, AppWindow, Terminal,
  HardDrive, Wifi, Shield, Clock, Settings, Search,
  LayoutGrid, FileText, Globe, Database, Cloud, Lock,
  Zap, BarChart3, Users, Bell, Power, Layers
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const desktopApps = [
  { name: "S.H.I.E.L.D. AI Chat", icon: Terminal, color: "from-primary to-accent", link: "/shield-ai-chat" },
  { name: "File Manager", icon: FolderOpen, color: "from-emerald-500 to-teal-600", link: "/universal-file-system" },
  { name: "Command Center", icon: LayoutGrid, color: "from-violet-500 to-purple-600", link: "/command-center" },
  { name: "Knowledge Base", icon: FileText, color: "from-amber-500 to-orange-600", link: "/knowledge-base" },
  { name: "AI Gateway", icon: Globe, color: "from-cyan-500 to-blue-600", link: "/ai-gateway" },
  { name: "Database", icon: Database, color: "from-rose-500 to-pink-600", link: "/distributed-ledger" },
  { name: "Cloud Services", icon: Cloud, color: "from-sky-500 to-indigo-600", link: "/shield-ai-cloud" },
  { name: "Security Center", icon: Lock, color: "from-red-500 to-rose-600", link: "/compliance-kyc" },
  { name: "Trading Hub", icon: BarChart3, color: "from-green-500 to-emerald-600", link: "/trading" },
  { name: "Deployed Agents", icon: Users, color: "from-fuchsia-500 to-purple-600", link: "/deployed-agents" },
  { name: "Settings", icon: Settings, color: "from-slate-500 to-gray-600", link: "/shield-ai-settings" },
  { name: "Explorer", icon: Search, color: "from-indigo-500 to-blue-600", link: "/explorer" },
];

const systemProcesses = [
  { name: "shield-core.sys", cpu: 12, memory: 256, status: "running" },
  { name: "ai-inference.daemon", cpu: 34, memory: 1024, status: "running" },
  { name: "network-monitor.svc", cpu: 5, memory: 128, status: "running" },
  { name: "blockchain-sync.node", cpu: 22, memory: 512, status: "running" },
  { name: "auth-guardian.proc", cpu: 3, memory: 64, status: "running" },
  { name: "data-pipeline.worker", cpu: 18, memory: 384, status: "idle" },
  { name: "cache-manager.svc", cpu: 7, memory: 192, status: "running" },
  { name: "backup-scheduler.cron", cpu: 1, memory: 32, status: "idle" },
];

const systemStats = [
  { label: "CPU Usage", value: 47, icon: Cpu, suffix: "%" },
  { label: "Memory", value: 62, icon: Activity, suffix: "%" },
  { label: "Storage", value: 38, icon: HardDrive, suffix: "%" },
  { label: "Network", value: 89, icon: Wifi, suffix: "Mbps" },
];

const ShieldAIOS = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"desktop" | "apps" | "monitor" | "files">("desktop");

  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const currentDate = new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* OS Taskbar */}
      <div className="sticky top-[56px] z-40 bg-card/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-[1800px] mx-auto px-4 flex items-center justify-between h-12">
          <div className="flex items-center gap-1">
            <Button
              variant={activeView === "desktop" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("desktop")}
              className="gap-1.5 text-xs"
            >
              <Monitor className="h-3.5 w-3.5" />
              Desktop
            </Button>
            <Button
              variant={activeView === "apps" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("apps")}
              className="gap-1.5 text-xs"
            >
              <AppWindow className="h-3.5 w-3.5" />
              App Launcher
            </Button>
            <Button
              variant={activeView === "monitor" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("monitor")}
              className="gap-1.5 text-xs"
            >
              <Activity className="h-3.5 w-3.5" />
              System Monitor
            </Button>
            <Button
              variant={activeView === "files" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("files")}
              className="gap-1.5 text-xs"
            >
              <FolderOpen className="h-3.5 w-3.5" />
              File Manager
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary font-semibold">SECURE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi className="h-3.5 w-3.5 text-green-500" />
              <span>Connected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bell className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 py-6">
        {/* Desktop View */}
        {activeView === "desktop" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Hero Welcome */}
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 text-sm px-4 py-1">
                  S.H.I.E.L.D. AI OS v3.0
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  S.H.I.E.L.D. AI Operating System
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Your unified digital workspace — AI-powered, blockchain-secured, divinely guided
                </p>
                <p className="text-muted-foreground/60 text-sm mt-2">{currentDate}</p>
              </motion.div>
            </div>

            {/* System Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {systemStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold font-heading text-foreground">
                        {stat.label === "Network" ? stat.value : stat.value + stat.suffix}
                      </div>
                      <Progress value={stat.label === "Network" ? 89 : stat.value} className="mt-2 h-1.5" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Launch Grid */}
            <div>
              <h2 className="text-lg font-semibold font-heading mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Launch
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {desktopApps.map((app, i) => (
                  <motion.button
                    key={app.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(app.link)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/40 border border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <app.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground text-center leading-tight">
                      {app.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity & System Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    System Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">OS Version</span><span className="font-mono">S.H.I.E.L.D. AI OS 3.0.1</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Kernel</span><span className="font-mono">shield-core 7.2.0</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Architecture</span><span className="font-mono">Quantum-x86_64</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Active Agents</span><span className="font-mono text-primary">888 / 888</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Uptime</span><span className="font-mono">∞ Eternal</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Security Level</span><Badge variant="outline" className="text-xs border-primary/50 text-primary">MAXIMUM</Badge></div>
                </CardContent>
              </Card>

              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Power className="h-4 w-4 text-primary" />
                    Active Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {["AI Inference Engine", "Blockchain Validator", "Network Guardian", "Data Pipeline", "Auth Service", "Cloud Sync"].map((service) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{service}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-500">Online</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* App Launcher View */}
        {activeView === "apps" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold font-heading">App Launcher</h2>
              <p className="text-muted-foreground text-sm">All S.H.I.E.L.D. AI applications at your fingertips</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {desktopApps.map((app, i) => (
                <motion.button
                  key={app.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(app.link)}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg`}>
                    <app.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium">{app.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* System Monitor View */}
        {activeView === "monitor" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold font-heading">System Monitor</h2>
              <p className="text-muted-foreground text-sm">Real-time system performance & process management</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {systemStats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-card/60 border-border/50">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-3xl font-bold font-heading">{stat.value}{stat.suffix}</div>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                      <Progress value={stat.label === "Network" ? 89 : stat.value} className="mt-3 h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-card/60 border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  Active Processes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30 text-muted-foreground">
                        <th className="text-left py-2 px-3">Process</th>
                        <th className="text-right py-2 px-3">CPU %</th>
                        <th className="text-right py-2 px-3">Memory (MB)</th>
                        <th className="text-right py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemProcesses.map((proc) => (
                        <tr key={proc.name} className="border-b border-border/10 hover:bg-muted/20">
                          <td className="py-2 px-3 font-mono text-xs">{proc.name}</td>
                          <td className="py-2 px-3 text-right font-mono text-xs">{proc.cpu}%</td>
                          <td className="py-2 px-3 text-right font-mono text-xs">{proc.memory}</td>
                          <td className="py-2 px-3 text-right">
                            <Badge variant="outline" className={`text-xs ${proc.status === "running" ? "border-green-500/50 text-green-500" : "border-amber-500/50 text-amber-500"}`}>
                              {proc.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* File Manager View */}
        {activeView === "files" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold font-heading">File Manager</h2>
              <p className="text-muted-foreground text-sm">Browse and manage your S.H.I.E.L.D. AI file system</p>
            </div>

            <Card className="bg-card/60 border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  /shield-os/home/user/
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                {[
                  { name: "Documents", icon: FolderOpen, type: "folder", size: "2.4 GB" },
                  { name: "AI Models", icon: FolderOpen, type: "folder", size: "12.8 GB" },
                  { name: "Blockchain Data", icon: FolderOpen, type: "folder", size: "45.2 GB" },
                  { name: "Agent Configs", icon: FolderOpen, type: "folder", size: "890 MB" },
                  { name: "System Logs", icon: FolderOpen, type: "folder", size: "3.1 GB" },
                  { name: "shield-config.yaml", icon: FileText, type: "file", size: "24 KB" },
                  { name: "network-map.json", icon: FileText, type: "file", size: "156 KB" },
                  { name: "auth-keys.enc", icon: Lock, type: "file", size: "4 KB" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${item.type === "folder" ? "text-amber-500" : "text-muted-foreground"}`} />
                      <span className="text-sm group-hover:text-primary transition-colors">{item.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.size}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ShieldAIOS;
