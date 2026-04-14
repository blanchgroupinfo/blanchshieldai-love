import { useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Palette, Film, Music, Image, Box,
  Smartphone, Share2, Newspaper, LayoutGrid,
  Rocket, Brain, Wand2, Shield, Camera, Megaphone,
  Monitor, Building2, Layers, ExternalLink, ArrowRight,
  Globe, Code2
} from "lucide-react";

const hubSections = [
  {
    title: "S.H.I.E.L.D. AI Creative Media Hub",
    desc: "Your central command Overview for all creative media operations. Access engines, manage projects, and collaborate seamlessly.",
    icon: Sparkles,
    path: "/creative-media-hub",
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Media Engine",
    desc: "Autonomous content generation and immersive media engineering. AI-powered engine for generating images, videos, music, and graphics.",
    icon: Brain,
    path: "/creative-engine",
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-indigo-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Studios",
    desc: "The pinnacle of AI-powered creative production and innovation.",
    icon: Sparkles,
    path: "/creative-portal",
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-purple-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Web & App Building",
    desc: "Create cross-platform interfaces and applications with AI.",
    icon: Code2,
    path: "/web-app-building",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-green-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Media Portal",
    desc: "Generate, edit, and publish your creative content",
    icon: Wand2,
    path: "/creative-portal",
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-indigo-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Media Library",
    desc: "Browse and manage your creative assets.",
    icon: Newspaper,
    path: "/creative-media-library",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-green-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Media Project Dashboard",
    desc: "Create cross-platform interfaces and applications with AI.",
    icon: Rocket,
    path: "/creative-media-projects",
    color: "text-emerald-400",
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Templates",
    desc: "Explore pre-made templates for quick starts.",
    icon: Box,
    path: "/creative-templates",
    color: "text-blue-400",
    gradient: "from-rose-500/20 to-pink-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Publishing Dashboard",
    desc: "Track and manage your creative projects.",
    icon: Globe,
    path: "/publishing-dashboard",
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "S.H.I.E.L.D. AI Creative Collaboration Hub",
    desc: "Work with team members in real-time.",
    icon: Monitor,
    path: "/creative-collaboration-hub",
    color: "text-emerald-400",
    gradient: "from-blue-500/20 to-green-500/20"
  },
  {
    title: "Blanch Studios",
    desc: "Enterprise production environment for the Blanch Group.",
    icon: Building2,
    path: "/blanch-group",
    color: "text-amber-400",
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Metaverse Hub",
    desc: "Immersive 3D environments and holographic content creation.",
    icon: Box,
    path: "/metaverse",
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20"
  }
];

const studioTools = [  
  { name: "All Industries", icon: Building2 },
  { name: "Animation", icon: Rocket },
  { name: "Art", icon: Wand2 },
  { name: "Audio", icon: Music },
  { name: "Blanch Drive", icon: ArrowRight },
  { name: "Blanch OS", icon: Monitor },
  { name: "Books", icon: Newspaper },
  { name: "Broadcast", icon: Rocket },
  { name: "CAD", icon: Building2 },
  { name: "Digital Publishing", icon: Newspaper },
  { name: "Documents", icon: Newspaper },
  { name: "Education & Learning Resources", icon: Newspaper },
  { name: "Image & Photography", icon: Camera }, 
  { name: "Film & Video", icon: Film },
  { name: "Film Scripts", icon: Film },
  { name: "Game Dev", icon: Box },
  { name: "Graphics Design", icon: Wand2 },
  { name: "Hologram", icon: Sparkles },
  { name: "Marketing & PR", icon: Megaphone },
  { name: "Metaverse", icon: Sparkles },
  { name: "Music & Audio", icon: Music },
  { name: "Operating Systems", icon: Code2 },
  { name: "Podcast", icon: Rocket },
  { name: "Sacret Texts", icon: Sparkles },
  { name: "S.H.I.E.L.D. AI Drive", icon: ArrowRight },
  { name: "S.H.I.E.L.D. AI OS", icon: Monitor },
  { name: "Software ", icon: Monitor },
  { name: "Sovereign OS, Interface, Technology", icon: Monitor },
  { name: "Television", icon: Monitor },
  { name: "Web/App Dev", icon: Code2 }
];

const CreativeMediaHub = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              <Sparkles className="w-3 h-3 mr-1" /> S.H.I.E.L.D. AI Ecosystem
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              S.H.I.E.L.D. AI Creative Media <span className="text-primary">Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Your central command for all creative media operations. Access engines, manage projects, and collaborate seamlessly.

              The central hub connecting all creative media capabilities — from content generation and editing to publishing and collaboration. 
              Manage your entire creative workflow from one unified interface.The central nerve center for all creative endeavors within the S.H.I.E.L.D.AI and Blanch Group ecosystem. 
              Sovereign production, autonomous generation, and global distribution.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/creative-portal")}>
                <Rocket className="w-5 h-5" /> Launch Creative Portal
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate("/creative-media")}>
                <Palette className="w-5 h-5" /> Explore All Media
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Hubs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">4</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Team Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-emerald-400">Real-time</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Sync Active</p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {hubSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card 
                  className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer h-full group"
                  onClick={() => navigate(section.path)}
                >
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <section.icon className={`w-7 h-7 ${section.color}`} />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                      {section.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {section.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <section className="bg-card/30 border border-border/40 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Integrated Studio Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access professional-grade tools powered by S.H.I.E.L.D. AI across all creative disciplines.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {studioTools.map((tool) => (
                <div key={tool.name} className="flex flex-col items-center p-6 rounded-2xl bg-background/40 border border-border/20 hover:border-primary/20 transition-all">
                  <tool.icon className="w-8 h-8 text-primary mb-3" />
                  <span className="text-xs font-semibold text-center">{tool.name}</span>
                </div>
              ))}
            </div>
              </section>

          <div className="mt-20 text-center">
            <p className="text-muted-foreground italic text-sm mb-8">
              "Empowering human creativity with sovereign neural intelligence — Managed by the Blanch Group."
            </p>
            <div className="flex justify-center gap-8 opacity-50">
              <Shield className="w-8 h-8" />
              <Building2 className="w-8 h-8" />
              <Layers className="w-8 h-8" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreativeMediaHub;
