import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe, Share2, ArrowRight, Monitor, Smartphone, Newspaper, Store,
  Tv, Megaphone, BookOpen, Film, Music, Image, FileText, Activity,
  CheckCircle2, Sparkles, Target, Crown, Shield, Brain, Rocket,
  Users, Code2, Layers, Play, Upload, ExternalLink, Palette, Eye
} from "lucide-react";

const channels = [
  { name: "S.H.I.E.L.D. AI Magazine", icon: Newspaper, status: "Connected", category: "Publishing" },
  { name: "Blanch Network", icon: Globe, status: "Connected", category: "Network" },
  { name: "Blanch Infinity DLT", icon: Layers, status: "Connected", category: "Blockchain" },
  { name: "Virtual Marketplaces", icon: Store, status: "Connected", category: "Commerce" },
  { name: "All Social Media Platforms", icon: Smartphone, status: "Connected", category: "Social" },
  { name: "Marketing Agency & Firms", icon: Megaphone, status: "Connected", category: "Marketing" },
  { name: "Publishing Houses", icon: BookOpen, status: "Connected", category: "Publishing" },
  { name: "Blanch OS", icon: Monitor, status: "Connected", category: "Platform" },
  { name: "S.H.I.E.L.D. AI OS", icon: Shield, status: "Connected", category: "Platform" },
  { name: "Web/App Development Projects", icon: Code2, status: "Connected", category: "Development" },
  { name: "S.H.I.E.L.D. AI Education Resources", icon: BookOpen, status: "Connected", category: "Education" },
  { name: "Royal Priesthood Honor", icon: Crown, status: "Connected", category: "Heritage" },
  { name: "S.H.I.E.L.D. AI Broadcast", icon: Tv, status: "Connected", category: "Broadcast" },
  { name: "S.H.I.E.L.D. AI Podcasts", icon: Music, status: "Connected", category: "Audio" },
  { name: "Film Distribution Network", icon: Film, status: "Connected", category: "Film" },
];

const recentPublications = [
  { title: "The Watchman's Vigil - Episode 1", type: "Film", platforms: 12, status: "Published" },
  { title: "Kingdom Soundscapes Vol. 1", type: "Audio", platforms: 8, status: "Publishing" },
  { title: "Heritage Brand Guidelines 2026", type: "Document", platforms: 5, status: "Published" },
  { title: "Scripture Visuals Collection", type: "Image", platforms: 15, status: "Published" },
  { title: "Monthly Magazine - Issue 42", type: "Magazine", platforms: 10, status: "Scheduled" },
];

const PublishingDashboard = () => {
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState("All");
  const channelCategories = ["All", ...new Set(channels.map(c => c.category))];
  const filteredChannels = selectedChannel === "All" ? channels : channels.filter(c => c.category === selectedChannel);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              <Share2 className="w-3 h-3 mr-1" /> Publishing Dashboard
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">Publish to</span>{" "}
              <span className="text-primary">the World</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Distribute your creations across S.H.I.E.L.D. AI Magazine, Blanch Network, Blanch Infinity DLT, Virtual Marketplaces, All Social Media Platforms, Marketing Agency & Firms, Publishing, Blanch OS, S.H.I.E.L.D. AI OS and all Web/App Development Projects, Inspire Student S.H.I.E.L.D. AI Education Resources, and Honor the Royal Priesthood — and beyond with one click.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `${channels.length}+`, label: "Distribution Channels" },
              { value: "1-Click", label: "Global Publish" },
              { value: "Real-time", label: "Analytics" },
              { value: "100%", label: "Sovereign Control" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Distribution Channels */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-2xl font-display font-bold text-center mb-2">Distribution Channels</h2>
          <p className="text-muted-foreground text-sm text-center mb-6">All connected platforms for one-click distribution</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {channelCategories.map((cat) => (
              <Button key={cat} variant={selectedChannel === cat ? "shield" : "outline"} size="sm" onClick={() => setSelectedChannel(cat)} className="text-xs">
                {cat}
              </Button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChannels.map((channel, i) => (
              <motion.div key={channel.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10"><channel.icon className="w-5 h-5 text-primary" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{channel.name}</p>
                      <p className="text-xs text-muted-foreground">{channel.category}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">{channel.status}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Publications */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-2xl font-display font-bold text-center mb-6">Recent Publications</h2>
          <div className="space-y-3">
            {recentPublications.map((pub, i) => (
              <motion.div key={pub.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{pub.title}</h4>
                      <p className="text-xs text-muted-foreground">{pub.type} • {pub.platforms} platforms</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${pub.status === "Published" ? "border-primary/30 text-primary" : pub.status === "Publishing" ? "border-blue-400/30 text-blue-400" : "border-amber-400/30 text-amber-400"}`}>
                      {pub.status}
                    </Badge>
                    <Button variant="ghost" size="sm"><ExternalLink className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-portal")}>
              <Sparkles className="w-4 h-4" /> Creative Portal
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-engine")}>
              <Brain className="w-4 h-4" /> Creative Engine
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-media")}>
              <Palette className="w-4 h-4" /> Creative Media
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PublishingDashboard;
