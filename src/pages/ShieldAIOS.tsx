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
  Zap, BarChart3, Users, Bell, Power, Layers, Check,
  CheckCheck, Eye, Volume2, VolumeX, Sun, Moon, Languages
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const desktopApps = [
  { name: "S.H.I.E.L.D. AI Chat", icon: Terminal, color: "from-primary to-accent", link: "/shield-ai-chat" },
  { name: "File Manager", icon: FolderOpen, color: "from-emerald-500 to-teal-600", link: "/universal-file-system" },
  { name: "Command Center", icon: LayoutGrid, color: "from-violet-500 to-purple-600", link: "/command-center" },
  { name: "Knowledge Base", icon: FileText, color: "from-amber-500 to-orange-600", link: "/knowledge-base" },
  { name: "AI Gateway", icon: Globe, color: "from-cyan-500 to-blue-600", link: "/ai-gateway" },
  { name: "Database", icon: Database, color: "from-rose-500 to-pink-600", link: "/distributed-ledger" },
  { name: "Cloud Services", icon: Cloud, color: "from-sky-500 to-indigo-600", link: "/shield-ai-cloud" },
  { name: "S.H.I.E.L.D. AI Drive", icon: HardDrive, color: "from-teal-500 to-cyan-600", link: "/shield-ai-drive" },
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

interface Notification {
  id: number;
  type: "alert" | "agent" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "alert", title: "Security Scan Complete", message: "All 888 agents passed integrity check. No threats detected.", time: "2 min ago", read: false },
  { id: 2, type: "agent", title: "H.I.I. AI042 Deployed", message: "Commerce Guardian agent activated and operational.", time: "5 min ago", read: false },
  { id: 3, type: "system", title: "System Update Available", message: "S.H.I.E.L.D. AI OS v3.0.2 patch ready for installation.", time: "12 min ago", read: false },
  { id: 4, type: "alert", title: "Firewall Block", message: "Blocked 47 unauthorized access attempts from external IPs.", time: "18 min ago", read: true },
  { id: 5, type: "agent", title: "H.I.I. AI777 Task Complete", message: "Sovereign Compliance audit finished — 100% pass rate.", time: "25 min ago", read: true },
  { id: 6, type: "system", title: "Backup Completed", message: "Full system backup to encrypted vault successful (128 TB).", time: "1 hr ago", read: true },
  { id: 7, type: "agent", title: "H.I.I. AI001 Status Change", message: "Master Orchestrator switched from idle to active mode.", time: "1.5 hr ago", read: true },
  { id: 8, type: "alert", title: "Network Latency Spike", message: "Brief latency spike detected on node-7. Auto-resolved.", time: "2 hr ago", read: true },
];

const incomingNotifications: Omit<Notification, "id" | "read" | "time">[] = [
  { type: "agent", title: "Agent AI-333 Restarted", message: "Financial Oracle agent restarted after scheduled maintenance." },
  { type: "alert", title: "Intrusion Attempt Blocked", message: "Quantum firewall neutralized brute-force attack from 3 IPs." },
  { type: "system", title: "Memory Optimization", message: "Auto-defrag completed. Freed 12 TB of quantum memory." },
  { type: "agent", title: "Agent AI-144 Milestone", message: "Treaty Compliance agent processed 10,000th document." },
  { type: "alert", title: "SSL Certificates Renewed", message: "All 888 agent endpoints renewed with quantum-resistant certs." },
  { type: "system", title: "Cloud Sync Complete", message: "All sovereign data synced to distributed vault nodes." },
];

const ShieldAIOS = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"desktop" | "apps" | "monitor" | "files" | "terminal" | "notifications" | "settings">("desktop");
  const [osNotifications, setOsNotifications] = useState<Notification[]>(initialNotifications);
  const [nextId, setNextId] = useState(9);
  const incomingIndexRef = useRef(0);

  // Settings state
  const [settings, setSettings] = useState({
    darkMode: true,
    soundEnabled: true,
    notificationsEnabled: true,
    agentAlerts: true,
    securityAlerts: true,
    systemUpdates: true,
    language: "English",
    autoLock: true,
    telemetry: false,
  });

  // Periodic new notifications
  useEffect(() => {
    if (!settings.notificationsEnabled) return;
    const interval = setInterval(() => {
      const incoming = incomingNotifications[incomingIndexRef.current % incomingNotifications.length];
      incomingIndexRef.current += 1;
      setOsNotifications(prev => [{
        ...incoming,
        id: nextId + incomingIndexRef.current,
        read: false,
        time: "Just now",
      }, ...prev]);
    }, 30000);
    return () => clearInterval(interval);
  }, [settings.notificationsEnabled, nextId]);

  const markAsRead = useCallback((id: number) => {
    setOsNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setOsNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id: number) => {
    setOsNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const unreadCount = osNotifications.filter(n => !n.read).length;
  const [terminalHistory, setTerminalHistory] = useState<{ type: "input" | "output"; text: string }[]>([
    { type: "output", text: "S.H.I.E.L.D. AI OS Terminal v3.0.1" },
    { type: "output", text: "Type 'help' for available commands.\n" },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: { type: "input" | "output"; text: string }[] = [
      { type: "input", text: `shield@os:~$ ${cmd}` },
    ];

    const commands: Record<string, string> = {
      help: "Available commands:\n  help        — Show this help message\n  status      — System status overview\n  agents      — List active agents\n  uptime      — Show system uptime\n  whoami      — Current user info\n  version     — OS version\n  clear       — Clear terminal\n  neofetch    — System info\n  ping        — Test connectivity\n  ls          — List files\n  date        — Current date/time\n  deploy      — Deploy an agent\n  scan        — Run security scan\n  encrypt     — Encrypt data stream\n  connect     — Connect to network node\n  exit        — Close terminal",
      status: "✅ CPU: 47% | Memory: 62% | Storage: 38% | Network: 89 Mbps\n   All systems operational. Security level: MAXIMUM.",
      agents: "888 H.I.I. AI Agents deployed.\n  Active: 886 | Idle: 2 | Errors: 0\n  Last deployment: 2 minutes ago",
      uptime: "System uptime: ∞ (Eternal)\n  Last reboot: Never — S.H.I.E.L.D. AI OS runs perpetually.",
      whoami: "shield-admin@shield-ai-os\n  Role: Administrator | Clearance: MAXIMUM\n  Session: Authenticated via Divine Protocol",
      version: "S.H.I.E.L.D. AI OS v3.0.1\n  Kernel: shield-core 7.2.0\n  Architecture: Quantum-x86_64\n  Build: 20260308-stable",
      neofetch: `
   ███████╗██╗  ██╗██╗███████╗██╗     ██████╗
   ██╔════╝██║  ██║██║██╔════╝██║     ██╔══██╗
   ███████╗███████║██║█████╗  ██║     ██║  ██║
   ╚════██║██╔══██║██║██╔══╝  ██║     ██║  ██║
   ███████║██║  ██║██║███████╗███████╗██████╔╝
   ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═════╝
   OS: S.H.I.E.L.D. AI OS 3.0.1
   Kernel: shield-core 7.2.0
   CPU: Quantum Neural Processor
   Memory: 256 PB / 512 PB
   Agents: 888 Active`,
      ping: "PING shield-core.local (10.0.0.1): 56 bytes\n  64 bytes: time=0.042ms\n  64 bytes: time=0.038ms\n  64 bytes: time=0.041ms\n  — 0% packet loss, avg 0.040ms",
      ls: "Documents/  AI Models/  Blockchain Data/  Agent Configs/\nSystem Logs/  shield-config.yaml  network-map.json  auth-keys.enc",
      date: new Date().toString(),
      deploy: "⚙ Initializing deployment sequence...\n  [██████████████████████████████] 100%\n  ✅ Agent AI-" + String(Math.floor(Math.random() * 888) + 1).padStart(3, "0") + " deployed successfully.\n  Status: ACTIVE | Latency: 0.003ms\n  Endpoint: shield-core://agents/live",
      scan: "🔍 Running S.H.I.E.L.D. Security Scan...\n  [1/5] Scanning network perimeter... ✅ CLEAR\n  [2/5] Checking agent integrity... ✅ 888/888 PASSED\n  [3/5] Auditing access logs... ✅ NO ANOMALIES\n  [4/5] Validating encryption keys... ✅ AES-256 INTACT\n  [5/5] Blockchain consensus check... ✅ ALL NODES SYNCED\n\n  ✅ SCAN COMPLETE — Threat Level: NONE\n  Security Rating: 100/100 (DIVINE SHIELD)",
      encrypt: "🔐 Encrypting data stream...\n  Algorithm: AES-256-GCM + RSA-4096\n  [████████████████████░░░░░░░░░░] 67%...\n  [██████████████████████████████] 100%\n  ✅ Encryption complete.\n  Key fingerprint: 7A:3F:D2:91:BC:48:EE:5C:A0:F1\n  Cipher strength: UNBREAKABLE\n  Stored in: /shield-os/vault/encrypted/",
      connect: "📡 Establishing secure connection...\n  Resolving shield-node-prime.sovereign.net...\n  Handshake: TLS 1.3 + Quantum Key Exchange\n  Latency: 0.012ms\n  ✅ Connected to S.H.I.E.L.D. Network Node #1\n  Peers: 144 nodes online\n  Bandwidth: 10 Gbps symmetric\n  Encryption: End-to-end quantum-resistant",
    };

    if (trimmed === "clear") {
      setTerminalHistory([]);
      return;
    } else if (trimmed === "exit") {
      setActiveView("desktop");
      return;
    } else if (commands[trimmed]) {
      newHistory.push({ type: "output", text: commands[trimmed] });
    } else if (trimmed === "") {
      // empty
    } else {
      newHistory.push({ type: "output", text: `shield: command not found: ${cmd}\nType 'help' for available commands.` });
    }

    setTerminalHistory((prev) => [...prev, ...newHistory]);
    setTimeout(() => terminalEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const currentDate = new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* OS Taskbar */}
      <div className="pt-24 bg-card/90 backdrop-blur-xl border-b border-border/50">
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
            <Button
              variant={activeView === "terminal" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("terminal")}
              className="gap-1.5 text-xs"
            >
              <Terminal className="h-3.5 w-3.5" />
              Terminal
            </Button>
            <Button
              variant={activeView === "notifications" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("notifications")}
              className="gap-1.5 text-xs"
            >
              <Bell className="h-3.5 w-3.5" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button
              variant={activeView === "settings" ? "shield" : "ghost"}
              size="sm"
              onClick={() => setActiveView("settings")}
              className="gap-1.5 text-xs"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
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

        {/* Terminal View */}
        {activeView === "terminal" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold font-heading">Terminal</h2>
              <p className="text-muted-foreground text-sm">S.H.I.E.L.D. AI OS command-line interface</p>
            </div>

            <Card className="bg-[hsl(222_47%_5%)] border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/30 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">shield@os:~</span>
                </div>

                <div className="h-[500px] overflow-y-auto p-4 font-mono text-sm space-y-1">
                  {terminalHistory.map((entry, i) => (
                    <div key={i} className={entry.type === "input" ? "text-primary" : "text-muted-foreground whitespace-pre-wrap"}>
                      {entry.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />

                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-primary">shield@os:~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          executeCommand(terminalInput);
                          setTerminalInput("");
                        }
                      }}
                      className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary"
                      autoFocus
                      spellCheck={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {/* Notifications View */}
        {activeView === "notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold font-heading">Notification Center</h2>
              <p className="text-muted-foreground text-sm">System alerts, agent updates & activity log</p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              {[
                { label: "Unread", count: unreadCount, color: "text-destructive" },
                { label: "Agent Updates", count: osNotifications.filter(n => n.type === "agent").length, color: "text-primary" },
                { label: "Security Alerts", count: osNotifications.filter(n => n.type === "alert").length, color: "text-amber-500" },
              ].map((stat) => (
                <Card key={stat.label} className="bg-card/60 border-border/50">
                  <CardContent className="p-4 text-center">
                    <div className={`text-3xl font-bold font-heading ${stat.color}`}>{stat.count}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {unreadCount > 0 && (
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-1.5 text-xs">
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark All as Read
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {osNotifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  layout
                >
                  <Card className={`bg-card/60 border-border/50 transition-all hover:bg-card/80 ${!notif.read ? "border-l-4 border-l-primary" : ""}`}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        notif.type === "alert" ? "bg-amber-500/10 text-amber-500" :
                        notif.type === "agent" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {notif.type === "alert" ? <Shield className="h-5 w-5" /> :
                         notif.type === "agent" ? <Users className="h-5 w-5" /> :
                         <Settings className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>{notif.title}</h4>
                          <span className="text-[10px] text-muted-foreground shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        {!notif.read && (
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => markAsRead(notif.id)} title="Mark as read">
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive" onClick={() => dismissNotification(notif.id)} title="Dismiss">
                          ×
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {osNotifications.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Settings View */}
        {activeView === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold font-heading">System Settings</h2>
              <p className="text-muted-foreground text-sm">Configure your S.H.I.E.L.D. AI OS preferences</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {/* Appearance */}
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sun className="h-4 w-4 text-primary" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Dark Mode</span>
                    </div>
                    <Switch checked={settings.darkMode} onCheckedChange={(v) => setSettings(s => ({ ...s, darkMode: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Language</span>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings(s => ({ ...s, language: e.target.value }))}
                      className="bg-muted border border-border rounded-md px-2 py-1 text-xs text-foreground"
                    >
                      <option>English</option>
                      <option>Hebrew</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>Arabic</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Sound & Audio */}
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-primary" />
                    Sound & Audio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.soundEnabled ? <Volume2 className="h-4 w-4 text-muted-foreground" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                      <span className="text-sm">System Sounds</span>
                    </div>
                    <Switch checked={settings.soundEnabled} onCheckedChange={(v) => setSettings(s => ({ ...s, soundEnabled: v }))} />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable Notifications</span>
                    <Switch checked={settings.notificationsEnabled} onCheckedChange={(v) => setSettings(s => ({ ...s, notificationsEnabled: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Agent Alerts</span>
                    <Switch checked={settings.agentAlerts} onCheckedChange={(v) => setSettings(s => ({ ...s, agentAlerts: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Alerts</span>
                    <Switch checked={settings.securityAlerts} onCheckedChange={(v) => setSettings(s => ({ ...s, securityAlerts: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Updates</span>
                    <Switch checked={settings.systemUpdates} onCheckedChange={(v) => setSettings(s => ({ ...s, systemUpdates: v }))} />
                  </div>
                </CardContent>
              </Card>

              {/* Security & Privacy */}
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Lock Session</span>
                    <Switch checked={settings.autoLock} onCheckedChange={(v) => setSettings(s => ({ ...s, autoLock: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Usage Telemetry</span>
                    <Switch checked={settings.telemetry} onCheckedChange={(v) => setSettings(s => ({ ...s, telemetry: v }))} />
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Encryption</span>
                      <span className="font-mono text-primary">AES-256-GCM</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Auth Protocol</span>
                      <span className="font-mono text-primary">Divine Shield™</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Info Footer */}
            <Card className="bg-card/60 border-border/50 max-w-4xl mx-auto">
              <CardContent className="p-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>S.H.I.E.L.D. AI OS v3.0.1 • Kernel shield-core 7.2.0</span>
                <Badge variant="outline" className="text-xs border-primary/50 text-primary">Quantum-x86_64</Badge>
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
