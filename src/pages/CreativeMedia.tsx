import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Film, Music, Palette, Camera, Mic, Video, MonitorPlay, Image,
  PenTool, Layers, Headphones, Radio, Tv, Clapperboard, Podcast,
  FileVideo, FileAudio, Brush, Aperture, Sparkles, Wand2, Globe,
  Zap, LayoutGrid, Type, BookOpen
} from "lucide-react";

const videoFeatures = [
  { icon: Film, title: "Film Production Suite", description: "End-to-end film production with AI-assisted editing, color grading, and VFX compositing for cinematic projects." },
  { icon: Clapperboard, title: "Video Editing Studio", description: "Professional non-linear editing with multi-track timeline, transitions, and real-time preview rendering." },
  { icon: FileVideo, title: "Motion Graphics Engine", description: "Create stunning motion graphics, title sequences, and animated infographics with template libraries." },
  { icon: MonitorPlay, title: "Live Streaming Platform", description: "Broadcast live to multiple platforms simultaneously with overlays, scene switching, and audience analytics." },
  { icon: Video, title: "Screen Recording & Capture", description: "High-fidelity screen and camera capture with annotation tools, webcam overlay, and instant sharing." },
  { icon: Tv, title: "Media Distribution Network", description: "Distribute content across global CDN with adaptive bitrate streaming and DRM protection." },
];

const musicFeatures = [
  { icon: Music, title: "Digital Audio Workstation", description: "Full-featured DAW with multi-track recording, MIDI support, virtual instruments, and plugin hosting." },
  { icon: Headphones, title: "AI Music Composition", description: "Generate original compositions, backing tracks, and soundscapes using AI-powered music creation tools." },
  { icon: Mic, title: "Podcast Production Suite", description: "Record, edit, and publish podcasts with noise reduction, transcript generation, and RSS distribution." },
  { icon: FileAudio, title: "Audio Mastering Engine", description: "Professional mastering with loudness normalization, EQ matching, and format conversion for all platforms." },
  { icon: Radio, title: "Sound Design Lab", description: "Create and manipulate sound effects, foley, and ambient audio with synthesis and sampling tools." },
  { icon: Podcast, title: "Voice-Over Studio", description: "AI-assisted voice cloning, text-to-speech, and voice-over recording with real-time processing." },
];

const designFeatures = [
  { icon: Palette, title: "Brand Identity Studio", description: "Design comprehensive brand kits including logos, color palettes, typography systems, and brand guidelines." },
  { icon: PenTool, title: "Vector Graphics Editor", description: "Professional vector illustration and design with pen tools, shape builders, and export to SVG/PDF." },
  { icon: Image, title: "Photo Editing Suite", description: "Advanced photo manipulation with AI-powered retouching, background removal, and batch processing." },
  { icon: Brush, title: "Digital Painting Canvas", description: "Natural media simulation with pressure-sensitive brushes, layers, and real-time collaboration." },
  { icon: Layers, title: "UI/UX Design Platform", description: "Design interfaces and prototypes with component libraries, auto-layout, and developer handoff." },
  { icon: Type, title: "Typography Workshop", description: "Font management, custom typeface creation, and typographic layout tools for print and digital." },
];

const advancedFeatures = [
  { icon: Sparkles, title: "AI Content Generator", description: "Generate images, videos, and audio from text prompts using integrated AI models." },
  { icon: Wand2, title: "AR/VR Content Creator", description: "Build immersive augmented and virtual reality experiences with 3D asset creation tools." },
  { icon: Camera, title: "3D Rendering Studio", description: "Photorealistic 3D rendering with ray tracing, material libraries, and scene composition." },
  { icon: Aperture, title: "Photography Workflow", description: "RAW processing, cataloging, and AI-enhanced editing for professional photography workflows." },
  { icon: Globe, title: "Content Localization", description: "Translate and adapt creative content for global audiences with AI-powered localization." },
  { icon: LayoutGrid, title: "Digital Asset Manager", description: "Organize, tag, and distribute creative assets across teams with version control and approval workflows." },
];

const capabilities = [
  { value: "50+", label: "Creative Tools" },
  { value: "S.H.I.E.L.D. AI", label: "Powered Engine" },
  { value: "4K/8K", label: "Resolution Support" },
  { value: "Real-time", label: "Collaboration" },
];

const CreativeMedia = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              <Sparkles className="w-3 h-3 mr-1" /> Creative Media Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>{" "}
              <span className="text-primary">Creative Media</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              A comprehensive creative media production ecosystem — from film and music to graphic design and AI-powered content generation. Create, Convert, Edit, Animate, Produce, Publish, Share, Swap, and Distribute world-class media.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {capabilities.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Tabbed Sections */}
        <section className="container mx-auto px-4">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-10 h-auto">
              <TabsTrigger value="video" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Film className="w-4 h-4 mr-1.5" /> Video & Film
              </TabsTrigger>
              <TabsTrigger value="music" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Music className="w-4 h-4 mr-1.5" /> Music & Audio
              </TabsTrigger>
              <TabsTrigger value="design" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Palette className="w-4 h-4 mr-1.5" /> Graphic Design
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Zap className="w-4 h-4 mr-1.5" /> Advanced & AI
              </TabsTrigger>
            </TabsList>

            {[
              { value: "video", title: "Video & Film Production", subtitle: "Professional video creation and distribution tools powered by S.H.I.E.L.D. AI.", items: videoFeatures },
              { value: "music", title: "Music & Audio Production", subtitle: "Complete audio production pipeline from recording to mastering and distribution.", items: musicFeatures },
              { value: "design", title: "Graphic Design & Branding", subtitle: "Design tools for creating visual identities, illustrations, and digital experiences.", items: designFeatures },
              { value: "advanced", title: "Advanced & AI-Powered Tools", subtitle: "Next-generation creative tools leveraging artificial intelligence and immersive technology.", items: advancedFeatures },
            ].map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">{tab.title}</h2>
                  <p className="text-muted-foreground">{tab.subtitle}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tab.items.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <feature.icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-base">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Supported Formats */}
        <section className="container mx-auto px-4 mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Supported Formats & Standards</h2>
            <p className="text-muted-foreground text-sm">Industry-standard format support across all media types</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["MP4", "MOV", "AVI", "ProRes", "WAV", "FLAC", "MP3", "AAC", "PSD", "AI", "SVG", "PNG", "TIFF", "RAW", "EXR", "GLTF", "FBX", "OBJ", "SRT", "VTT"].map((fmt) => (
              <Badge key={fmt} variant="outline" className="border-border/50 text-muted-foreground px-3 py-1.5">
                {fmt}
              </Badge>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 mt-20 text-center">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground italic text-sm">
              "Managed by the Blanch Group — Empowering creators with sovereign media production tools."
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CreativeMedia;
