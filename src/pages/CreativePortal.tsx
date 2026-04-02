import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain, Rocket, Shield, Film, Music, Image, Sparkles, Palette,
  Video, Camera, Play, ArrowRight, Globe, Box, Layers, Upload,
  FileText, Mic, Wand2, PenTool, Gamepad2, Monitor, BookOpen,
  Newspaper, Code2, Crown, Target, Activity, Share2, Eye,
  LayoutGrid, Star, Smartphone, HardDrive, CheckCircle2
} from "lucide-react";

const portalCategories = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "image", label: "Image", icon: Image },
  { value: "video", label: "Video & Film", icon: Film },
  { value: "audio", label: "Audio & Music", icon: Music },
  { value: "3d", label: "3D & Hologram", icon: Box },
  { value: "design", label: "Design", icon: Palette },
  { value: "writing", label: "Writing", icon: FileText },
  { value: "avatar", label: "Avatar", icon: Star },
  { value: "gaming", label: "Gaming", icon: Gamepad2 },
];

const templates = [
  { title: "Cinematic Trailer", category: "video", icon: Film, desc: "AI-directed cinematic trailers with professional VFX and sound design" },
  { title: "Brand Identity", category: "design", icon: Palette, desc: "Complete brand identity kits with logos, colors, and guidelines" },
  { title: "AI Avatar", category: "avatar", icon: Star, desc: "Photorealistic or stylized AI avatar with voice synthesis" },
  { title: "Music Track", category: "audio", icon: Music, desc: "Original AI-composed music tracks in any genre" },
  { title: "Product Render", category: "3d", icon: Box, desc: "Photorealistic 3D product renders for marketing" },
  { title: "Social Media Kit", category: "design", icon: Smartphone, desc: "Optimized content sets for all social platforms" },
  { title: "Book Cover", category: "image", icon: BookOpen, desc: "Professional book cover design with typography" },
  { title: "Game Asset Pack", category: "gaming", icon: Gamepad2, desc: "Game-ready 3D models, textures, and animations" },
  { title: "Magazine Layout", category: "design", icon: Newspaper, desc: "Interactive digital magazine layouts" },
  { title: "Documentary Film", category: "video", icon: Camera, desc: "AI-assisted documentary production workflow" },
  { title: "Podcast Series", category: "audio", icon: Mic, desc: "Professional podcast production with AI editing" },
  { title: "Holographic Display", category: "3d", icon: Sparkles, desc: "Holographic content for immersive displays" },
  { title: "Blog Article", category: "writing", icon: FileText, desc: "AI-assisted long-form writing with research" },
  { title: "Album Art", category: "image", icon: Image, desc: "Stunning album artwork and promotional visuals" },
  { title: "App UI Design", category: "design", icon: Code2, desc: "Complete app UI/UX design with components" },
  { title: "VR Experience", category: "3d", icon: Globe, desc: "Immersive virtual reality environment design" },
];

const CreativePortal = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [prompt, setPrompt] = useState("");

  const filteredTemplates = templates
    .filter(t => selectedCategory === "all" || t.category === selectedCategory)
    .filter(t => !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              <Sparkles className="w-3 h-3 mr-1" /> Creative Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>{" "}
              <span className="text-primary">Creative Portal</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Your gateway to creating world-class media. Choose a template or start from scratch — the Creative Engine handles the rest.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/creative-engine")}>
                <Brain className="w-5 h-5" /> Open Creative Engine
              </Button>
              <Button variant="glow" size="lg" className="gap-2" onClick={() => navigate("/creative-media")}>
                <ArrowRight className="w-5 h-5" /> Creative Media Hub
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Quick Create */}
        <section className="container mx-auto px-4 mb-20">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-bold mb-2">Start Creating</h2>
                <p className="text-sm text-muted-foreground">Describe your vision and let S.H.I.E.L.D. AI bring it to life</p>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                <Textarea
                  placeholder="What would you like to create today? Describe your creative project..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-card/50 min-h-[120px]"
                />
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="shield" className="gap-2"><Play className="w-4 h-4" /> Generate</Button>
                  <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" /> Upload Media</Button>
                  <Button variant="outline" className="gap-2"><Wand2 className="w-4 h-4" /> AI Enhance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Templates */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Creative Templates</h2>
            <p className="text-muted-foreground text-sm">Start with a template and customize to your vision</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {portalCategories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "shield" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className="gap-1 text-xs"
              >
                <cat.icon className="w-3 h-3" /> {cat.label}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <Input placeholder="Search templates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-card/50" />
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template, i) => (
              <motion.div key={template.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group h-full">
                  <CardContent className="p-5 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <template.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{template.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{template.desc}</p>
                    <Button variant="outline" size="sm" className="text-xs gap-1 w-full">
                      <Play className="w-3 h-3" /> Use Template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Projects */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Recent Projects</h2>
            <p className="text-muted-foreground text-sm">Continue working on your latest creations</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "The Watchman's Vigil", type: "Film", progress: 78 },
              { title: "Kingdom Soundscapes", type: "Audio", progress: 45 },
              { title: "Heritage Brand Kit", type: "Design", progress: 92 },
              { title: "Scripture Visuals", type: "Image", progress: 60 },
            ].map((project, i) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-1">{project.title}</h4>
                    <Badge variant="outline" className="text-xs mb-3">{project.type}</Badge>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-engine")}>
              <Brain className="w-4 h-4" /> Creative Engine
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/publishing-dashboard")}>
              <Globe className="w-4 h-4" /> Publishing Dashboard
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-media")}>
              <Palette className="w-4 h-4" /> Creative Media
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/command-center")}>
              <Monitor className="w-4 h-4" /> Command Center
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreativePortal;
