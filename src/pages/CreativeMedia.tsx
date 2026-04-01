import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Film, Music, Palette, Camera, Mic, Video, MonitorPlay, Image,
  PenTool, Layers, Headphones, Radio, Tv, Clapperboard, Podcast,
  FileVideo, FileAudio, Brush, Aperture, Sparkles, Wand2, Globe,
  Zap, LayoutGrid, Type, BookOpen, Brain, Shield, Eye, Rocket,
  Play, Upload, Share2, Download, Monitor, Gamepad2, Newspaper,
  Store, Code2, Users, Star, Box, Target, Crown, Smartphone,
  FileText, Megaphone, HardDrive, ExternalLink, CheckCircle2,
  Terminal, Activity, Server, ArrowRight, ImagePlus, BookMarked
} from "lucide-react";

// Tab definitions
const tabCategories = [
  { value: "autocad", label: "AutoCAD", icon: PenTool },
  { value: "avatar", label: "AI Avatar", icon: Users },
  { value: "books", label: "Books", icon: BookOpen },
  { value: "image", label: "Image", icon: Image },
  { value: "hologram", label: "Hologram & Metaverse", icon: Box },
  { value: "gaming", label: "Gaming", icon: Gamepad2 },
  { value: "magazines", label: "Magazines", icon: Newspaper },
  { value: "publishing", label: "Publishing", icon: FileText },
  { value: "distribution", label: "Distribution", icon: Share2 },
  { value: "video", label: "Video & Film", icon: Film },
  { value: "music", label: "Music & Audio", icon: Music },
  { value: "design", label: "Graphic Design", icon: Palette },
  { value: "advanced", label: "Advanced & AI", icon: Zap },
  { value: "marketing", label: "Marketing", icon: Megaphone },
  { value: "os", label: "Operating System", icon: Monitor },
  { value: "marketplaces", label: "Marketplaces", icon: Store },
  { value: "social", label: "Social Media", icon: Globe },
  { value: "software", label: "Software", icon: Code2 },
  { value: "shield-avatar", label: "S.H.I.E.L.D. AI Avatar", icon: Star },
  { value: "shield-influencer", label: "S.H.I.E.L.D. AI Influencer", icon: Crown },
  { value: "shield-os", label: "S.H.I.E.L.D. AI OS", icon: Monitor },
  { value: "blanch-os", label: "Blanch OS", icon: Monitor },
  { value: "web-app", label: "Web/App", icon: Smartphone },
];

const tabContent: Record<string, { title: string; subtitle: string; items: { icon: any; title: string; description: string }[] }> = {
  autocad: { title: "AutoCAD & CAD Design", subtitle: "Professional CAD design powered by S.H.I.E.L.D. AI.", items: [
    { icon: PenTool, title: "2D/3D CAD Editor", description: "Full-featured CAD editing with parametric modeling and constraint-based design." },
    { icon: Layers, title: "Blueprint Generator", description: "AI-assisted blueprint and floorplan generation from text prompts." },
    { icon: Box, title: "3D Model Viewer", description: "Interactive 3D model visualization with real-time rendering." },
    { icon: FileText, title: "DWG/DXF Support", description: "Native support for industry-standard CAD file formats." },
    { icon: Wand2, title: "AI Design Assistant", description: "S.H.I.E.L.D. AI suggestions for structural integrity and optimization." },
    { icon: Share2, title: "Collaborative CAD", description: "Real-time multi-user CAD editing and version control." },
  ]},
  avatar: { title: "AI Avatar Creation", subtitle: "Create photorealistic and stylized AI avatars.", items: [
    { icon: Users, title: "Avatar Generator", description: "Create photorealistic AI avatars from text descriptions or photos." },
    { icon: Video, title: "Animated Avatars", description: "Generate talking head videos with lip-sync from audio input." },
    { icon: Palette, title: "Style Transfer", description: "Apply artistic styles—cartoon, anime, oil painting—to avatar designs." },
    { icon: Mic, title: "Voice Cloning", description: "Clone voices for avatar speech synthesis with natural intonation." },
    { icon: Globe, title: "Multi-language Support", description: "Avatars speak in 100+ languages with native pronunciation." },
    { icon: Sparkles, title: "Real-time Avatar", description: "Live avatar puppeteering with facial tracking and expression mapping." },
  ]},
  books: { title: "Book Publishing & Creation", subtitle: "End-to-end book creation from manuscript to distribution.", items: [
    { icon: BookOpen, title: "Manuscript Editor", description: "Rich text editor with AI-assisted writing, grammar, and style suggestions." },
    { icon: Type, title: "Typography Engine", description: "Professional typesetting with automatic kerning, leading, and pagination." },
    { icon: Image, title: "Cover Designer", description: "AI-generated book covers with customizable templates and styles." },
    { icon: FileText, title: "eBook Converter", description: "Convert to EPUB, MOBI, PDF, and print-ready formats automatically." },
    { icon: Globe, title: "ISBN & Distribution", description: "Automatic ISBN assignment and distribution to global bookstores." },
    { icon: BookMarked, title: "Audiobook Studio", description: "AI narration and professional audiobook production tools." },
  ]},
  image: { title: "Image Creation & Editing", subtitle: "Professional image tools powered by S.H.I.E.L.D. AI.", items: [
    { icon: ImagePlus, title: "AI Image Generator", description: "Generate stunning images from text prompts using advanced AI models." },
    { icon: Brush, title: "Photo Editor", description: "Professional photo editing with AI retouching, filters, and enhancements." },
    { icon: Layers, title: "Layer Compositor", description: "Multi-layer image composition with masks, blending, and effects." },
    { icon: Aperture, title: "RAW Processor", description: "Process RAW camera files with professional color science." },
    { icon: Wand2, title: "Background Removal", description: "One-click AI background removal and replacement." },
    { icon: LayoutGrid, title: "Batch Processing", description: "Process thousands of images simultaneously with consistent results." },
  ]},
  hologram: { title: "Hologram & Metaverse", subtitle: "Immersive holographic and metaverse content creation.", items: [
    { icon: Box, title: "Hologram Studio", description: "Create 3D holographic content for displays and AR/VR environments." },
    { icon: Globe, title: "Metaverse Builder", description: "Build virtual worlds, spaces, and experiences for the Blanch Metaverse." },
    { icon: Camera, title: "Volumetric Capture", description: "Capture real-world objects and people as 3D holographic assets." },
    { icon: Sparkles, title: "AR Experiences", description: "Design augmented reality overlays and interactive experiences." },
    { icon: Users, title: "Virtual Events", description: "Host holographic meetings, concerts, and presentations." },
    { icon: Monitor, title: "Mixed Reality", description: "Blend physical and digital worlds with mixed reality content tools." },
  ]},
  gaming: { title: "Gaming Development", subtitle: "Game development and interactive entertainment tools.", items: [
    { icon: Gamepad2, title: "Game Engine", description: "S.H.I.E.L.D. AI-powered game engine with visual scripting and physics." },
    { icon: Box, title: "3D Asset Creator", description: "Generate game-ready 3D models, textures, and animations with AI." },
    { icon: Code2, title: "Game Logic Builder", description: "Visual scripting and AI behavior trees for game mechanics." },
    { icon: Music, title: "Game Audio", description: "Adaptive music and dynamic sound effects for interactive experiences." },
    { icon: Globe, title: "Multiplayer Systems", description: "Built-in networking for multiplayer and online game services." },
    { icon: Store, title: "Game Publishing", description: "Distribute games across platforms—PC, mobile, console, and web." },
  ]},
  magazines: { title: "Digital Magazine Creation", subtitle: "Interactive magazine design and publishing.", items: [
    { icon: Newspaper, title: "Magazine Designer", description: "Drag-and-drop magazine layout with professional grid systems." },
    { icon: Type, title: "Editorial Suite", description: "Advanced typography, column layouts, and pull-quote styling." },
    { icon: Image, title: "Photo Spreads", description: "Full-bleed photo layouts with automatic sizing and cropping." },
    { icon: Globe, title: "Digital Distribution", description: "Publish to S.H.I.E.L.D. AI Magazine platform and app stores." },
    { icon: FileText, title: "Print Ready", description: "Export print-ready PDFs with bleed, crop marks, and color profiles." },
    { icon: Sparkles, title: "Interactive Elements", description: "Add video, audio, animations, and interactive widgets to pages." },
  ]},
  publishing: { title: "Digital Publishing", subtitle: "Comprehensive publishing platform for all media types.", items: [
    { icon: FileText, title: "Multi-format Publisher", description: "Publish books, magazines, newsletters, and whitepapers in any format." },
    { icon: Globe, title: "Global Distribution", description: "Distribute content to global audiences through integrated channels." },
    { icon: Target, title: "Audience Analytics", description: "Track readership, engagement, and distribution analytics." },
    { icon: Crown, title: "DRM Protection", description: "Digital rights management to protect published content." },
    { icon: Share2, title: "Syndication", description: "Automatic content syndication across platforms and networks." },
    { icon: Megaphone, title: "Marketing Suite", description: "Built-in marketing tools for promoting published content." },
  ]},
  distribution: { title: "Content Distribution", subtitle: "Global content distribution across all platforms.", items: [
    { icon: Globe, title: "CDN Network", description: "Global content delivery network for fast, reliable distribution." },
    { icon: Share2, title: "Multi-platform Publish", description: "One-click publishing to S.H.I.E.L.D. AI Magazine, Blanch Network, and beyond." },
    { icon: Store, title: "Marketplace Distribution", description: "Distribute to Virtual Marketplaces and all partner platforms." },
    { icon: Smartphone, title: "Social Media Push", description: "Auto-publish to all social media platforms simultaneously." },
    { icon: Target, title: "Targeted Distribution", description: "AI-driven audience targeting for content distribution." },
    { icon: Activity, title: "Distribution Analytics", description: "Real-time tracking of content reach and engagement metrics." },
  ]},
  video: { title: "Video & Film Production", subtitle: "Professional video creation and distribution tools powered by S.H.I.E.L.D. AI.", items: [
    { icon: Film, title: "Film Production Suite", description: "End-to-end film production with AI-assisted editing, color grading, and VFX compositing." },
    { icon: Clapperboard, title: "Video Editing Studio", description: "Professional non-linear editing with multi-track timeline and real-time preview." },
    { icon: FileVideo, title: "Motion Graphics Engine", description: "Stunning motion graphics, title sequences, and animated infographics." },
    { icon: MonitorPlay, title: "Live Streaming Platform", description: "Broadcast live to multiple platforms with overlays and scene switching." },
    { icon: Video, title: "Screen Recording & Capture", description: "High-fidelity screen and camera capture with annotation tools." },
    { icon: Tv, title: "Media Distribution Network", description: "Distribute content across global CDN with adaptive bitrate streaming." },
  ]},
  music: { title: "Music & Audio Production", subtitle: "Complete audio production pipeline from recording to mastering.", items: [
    { icon: Music, title: "Digital Audio Workstation", description: "Full-featured DAW with multi-track recording, MIDI, and plugin hosting." },
    { icon: Headphones, title: "AI Music Composition", description: "Generate original compositions and soundscapes using AI creation tools." },
    { icon: Mic, title: "Podcast Production Suite", description: "Record, edit, and publish podcasts with transcript generation." },
    { icon: FileAudio, title: "Audio Mastering Engine", description: "Professional mastering with loudness normalization and format conversion." },
    { icon: Radio, title: "Sound Design Lab", description: "Create sound effects, foley, and ambient audio with synthesis tools." },
    { icon: Podcast, title: "Voice-Over Studio", description: "AI voice cloning, text-to-speech, and voice-over recording." },
  ]},
  design: { title: "Graphic Design & Branding", subtitle: "Design tools for creating visual identities and digital experiences.", items: [
    { icon: Palette, title: "Brand Identity Studio", description: "Design comprehensive brand kits with logos, colors, and guidelines." },
    { icon: PenTool, title: "Vector Graphics Editor", description: "Professional vector illustration with pen tools and shape builders." },
    { icon: Image, title: "Photo Editing Suite", description: "Advanced photo manipulation with AI retouching and batch processing." },
    { icon: Brush, title: "Digital Painting Canvas", description: "Natural media simulation with pressure-sensitive brushes and layers." },
    { icon: Layers, title: "UI/UX Design Platform", description: "Design interfaces with component libraries and developer handoff." },
    { icon: Type, title: "Typography Workshop", description: "Font management and custom typeface creation tools." },
  ]},
  advanced: { title: "Advanced & AI-Powered Tools", subtitle: "Next-generation creative tools leveraging AI and immersive technology.", items: [
    { icon: Sparkles, title: "AI Content Generator", description: "Generate images, videos, and audio from text prompts." },
    { icon: Wand2, title: "AR/VR Content Creator", description: "Build immersive AR and VR experiences with 3D asset tools." },
    { icon: Camera, title: "3D Rendering Studio", description: "Photorealistic 3D rendering with ray tracing and materials." },
    { icon: Aperture, title: "Photography Workflow", description: "RAW processing and AI-enhanced editing for professionals." },
    { icon: Globe, title: "Content Localization", description: "Translate and adapt content for global audiences with AI." },
    { icon: LayoutGrid, title: "Digital Asset Manager", description: "Organize and distribute creative assets with version control." },
  ]},
  marketing: { title: "Marketing & Advertising", subtitle: "Create compelling marketing content across all channels.", items: [
    { icon: Megaphone, title: "Ad Creator", description: "Design display ads, social media ads, and video ads with AI templates." },
    { icon: Target, title: "Campaign Designer", description: "Visual campaign builder with A/B testing and audience targeting." },
    { icon: Newspaper, title: "Content Marketing", description: "Blog posts, articles, and thought leadership content generation." },
    { icon: Globe, title: "Social Media Manager", description: "Schedule, publish, and analyze social media content." },
    { icon: FileText, title: "Brand Kit Builder", description: "Create media kits, press releases, and brand guidelines." },
    { icon: Activity, title: "Performance Analytics", description: "Track campaign performance with real-time analytics dashboards." },
  ]},
  os: { title: "Operating System Integration", subtitle: "Deep OS-level integration for creative workflows.", items: [
    { icon: Monitor, title: "S.H.I.E.L.D. AI OS Integration", description: "Native OS-level creative tools and file system integration." },
    { icon: HardDrive, title: "Asset Pipeline", description: "Automated asset pipeline from creation to deployment." },
    { icon: Code2, title: "Plugin SDK", description: "Build custom plugins and extensions for the creative suite." },
    { icon: Server, title: "Render Farm", description: "Distributed rendering across S.H.I.E.L.D. AI compute clusters." },
    { icon: Zap, title: "GPU Acceleration", description: "Hardware-accelerated rendering and AI inference." },
    { icon: Shield, title: "Sovereign Processing", description: "All processing happens on sovereign infrastructure." },
  ]},
  marketplaces: { title: "Creative Marketplaces", subtitle: "Buy, sell, and license creative assets.", items: [
    { icon: Store, title: "Asset Marketplace", description: "Buy and sell templates, presets, plugins, and creative assets." },
    { icon: Image, title: "Stock Media Library", description: "Access millions of royalty-free images, videos, and audio." },
    { icon: Type, title: "Font Marketplace", description: "Browse and license professional typefaces and font families." },
    { icon: Layers, title: "Template Store", description: "Pre-built templates for all creative projects and formats." },
    { icon: Crown, title: "Premium Content", description: "Exclusive premium content from top creators and studios." },
    { icon: Users, title: "Creator Community", description: "Connect with creators, share work, and collaborate." },
  ]},
  social: { title: "Social Media Content", subtitle: "Create optimized content for every social platform.", items: [
    { icon: Smartphone, title: "Social Content Creator", description: "Templates sized for every platform—Instagram, TikTok, YouTube, X." },
    { icon: Video, title: "Reels & Shorts", description: "Quick video creation for short-form social content." },
    { icon: Image, title: "Story Designer", description: "Interactive story templates with stickers, polls, and animations." },
    { icon: Sparkles, title: "AI Captions", description: "Auto-generate engaging captions and hashtags with AI." },
    { icon: Activity, title: "Scheduling", description: "Schedule and auto-publish across all social platforms." },
    { icon: Target, title: "Engagement Analytics", description: "Track likes, shares, comments, and audience growth." },
  ]},
  software: { title: "Software & Tools", subtitle: "Creative software development and tooling.", items: [
    { icon: Code2, title: "Creative SDK", description: "Software development kit for building creative applications." },
    { icon: Layers, title: "Plugin Architecture", description: "Extensible plugin system for adding custom creative tools." },
    { icon: Server, title: "API Access", description: "RESTful APIs for integrating creative tools into workflows." },
    { icon: Zap, title: "Automation Scripts", description: "Script-based automation for repetitive creative tasks." },
    { icon: Globe, title: "Cloud Rendering", description: "Cloud-based rendering services for heavy compute tasks." },
    { icon: Shield, title: "Enterprise License", description: "Enterprise licensing and deployment for organizations." },
  ]},
  "shield-avatar": { title: "S.H.I.E.L.D. AI Avatar", subtitle: "Sovereign digital avatar system powered by S.H.I.E.L.D. AI.", items: [
    { icon: Star, title: "Sovereign Avatar", description: "Create your sovereign digital identity with AI-powered avatar generation." },
    { icon: Video, title: "Avatar Video", description: "Generate professional talking-head videos with your AI avatar." },
    { icon: Globe, title: "Multi-platform Presence", description: "Deploy your avatar across metaverse, social media, and web." },
    { icon: Mic, title: "Voice Synthesis", description: "Natural voice cloning for avatar speech in any language." },
    { icon: Sparkles, title: "Expression AI", description: "Real-time facial expression and emotion mapping." },
    { icon: Shield, title: "Identity Verification", description: "Blockchain-verified avatar identity and provenance." },
  ]},
  "shield-influencer": { title: "S.H.I.E.L.D. AI Influencer", subtitle: "AI-powered influencer creation and management platform.", items: [
    { icon: Crown, title: "Influencer Studio", description: "Create and manage AI influencer personas with unique personalities." },
    { icon: Globe, title: "Content Automation", description: "Auto-generate posts, stories, and reels for influencer accounts." },
    { icon: Target, title: "Audience Growth", description: "AI-driven audience targeting and growth strategies." },
    { icon: Activity, title: "Engagement Engine", description: "Automated engagement and community management tools." },
    { icon: Megaphone, title: "Brand Partnerships", description: "Connect with brands for sponsored content opportunities." },
    { icon: FileText, title: "Analytics Dashboard", description: "Comprehensive influencer analytics and performance tracking." },
  ]},
  "shield-os": { title: "S.H.I.E.L.D. AI OS Creative Tools", subtitle: "Native creative tools integrated into S.H.I.E.L.D. AI OS.", items: [
    { icon: Monitor, title: "Desktop Studio", description: "Full creative suite accessible from S.H.I.E.L.D. AI OS desktop." },
    { icon: HardDrive, title: "S.H.I.E.L.D. AI Drive Integration", description: "Seamless file management with S.H.I.E.L.D. AI Drive." },
    { icon: Zap, title: "Quick Actions", description: "OS-level creative shortcuts and automation actions." },
    { icon: Sparkles, title: "AI Assistant", description: "Built-in creative AI assistant for suggestions and automation." },
    { icon: Share2, title: "Share & Export", description: "One-click sharing and export from any OS application." },
    { icon: Shield, title: "Sovereign Security", description: "All creative work protected by sovereign encryption." },
  ]},
  "blanch-os": { title: "Blanch OS Creative Suite", subtitle: "Enterprise creative tools on Blanch OS.", items: [
    { icon: Monitor, title: "Blanch Studio", description: "Enterprise-grade creative studio on Blanch OS." },
    { icon: Users, title: "Team Collaboration", description: "Real-time multi-user creative collaboration tools." },
    { icon: HardDrive, title: "Blanch Drive Integration", description: "Enterprise storage integration with Blanch Drive." },
    { icon: Shield, title: "Enterprise Security", description: "Enterprise-level DRM and content protection." },
    { icon: Server, title: "On-premise Rendering", description: "On-premise render farm for enterprise deployments." },
    { icon: Globe, title: "Global Distribution", description: "Enterprise content distribution network." },
  ]},
  "web-app": { title: "Web & App Development", subtitle: "Build creative web and mobile applications.", items: [
    { icon: Code2, title: "Web Builder", description: "Visual web builder with creative templates and components." },
    { icon: Smartphone, title: "Mobile App Builder", description: "Build creative mobile apps for iOS and Android." },
    { icon: Layers, title: "Component Library", description: "Pre-built creative UI components and widgets." },
    { icon: Globe, title: "PWA Support", description: "Build progressive web apps for creative tools." },
    { icon: Zap, title: "Performance Optimized", description: "Built for performance with lazy loading and code splitting." },
    { icon: Share2, title: "Deploy Anywhere", description: "Deploy to Blanch OS, S.H.I.E.L.D. AI OS, or any platform." },
  ]},
};

// File format categories
const formatCategories = [
  { name: "All", formats: [] },
  { name: "3D Model", formats: ["3DM", "3DS", "3MF", "Blender", "DAE", "FBX", "GLB", "IFC", "OBJ", "PLY", "SKP", "STEP", "STL", "STP", "STPZ", "USD", "USDZ", "VTK", "VTP", "WRL", "X", "X3D"] },
  { name: "AI Avatar", formats: ["FBX", "GLB", "OBJ", "USD", "USDZ"] },
  { name: "Audio", formats: ["AAC", "FLAC", "MP3", "WAV"] },
  { name: "CAD", formats: ["DWG", "DXF", "STEP", "STP", "STPZ", "IFC", "SKP"] },
  { name: "Document", formats: ["DOC", "DOCX", "DOTX", "PDF", "TXT", "XML"] },
  { name: "Image", formats: ["AVIF", "BMP", "DDS", "DPX", "EXR", "Favicon.ico", "GIF", "Animated GIF", "HEIC", "HEIF", "ICO", "JFI", "JFIF", "JPEG", "JPG", "PCX", "PNG", "PSB", "PSD", "RAW", "TGA", "TIFF", "WEBP", "WPG", "XCF"] },
  { name: "Final Draft Script", formats: ["FDX", "FDXT", "FDR", "Fountain"] },
  { name: "Film", formats: ["AVI", "MOV", "MP4", "ProRes", "DPX", "EXR"] },
  { name: "Gaming", formats: ["FBX", "GLB", "OBJ", "3DS", "Blender", "USD"] },
  { name: "Music", formats: ["AAC", "FLAC", "MP3", "WAV", "MIDI"] },
  { name: "Spreadsheet", formats: ["XLS", "XLSX", "XLTX"] },
  { name: "Vector", formats: ["AI", "CCX", "CDR", "CDT", "CMX", "EMF", "PS", "SVG", "VDX", "VSD", "VSDM", "VSDX", "WMF", "XAML"] },
  { name: "Video", formats: ["AVI", "MOV", "MP4", "ProRes", "SRT", "VTT"] },
  { name: "Web", formats: ["SVG", "PNG", "WEBP", "GIF", "JPEG", "Favicon.ico", "XML"] },
];

const allFormats = [
  "AAC", "AI", "Animated GIF", "AVI", "AVIF", "BMP", "Blender", "CCX", "CDR", "CDT", "CMX",
  "DAE", "DDS", "DOC", "DOCX", "DOTX", "DPX", "DWG", "EMF", "EXR", "FAX",
  "FBX", "FDR", "FDX", "FDXT", "FLAC", "Favicon.ico", "Fountain", "GIF", "GLB", "GLTF",
  "HEIC", "HEIF", "ICO", "IFC", "JFI", "JFIF", "JPEG", "JPG",
  "MIDI", "MOV", "MP3", "MP4", "OBJ", "PCX", "PDF", "PLY", "PNG", "PS", "PSB", "PSD", "ProRes",
  "RAW", "SKP", "SRT", "STEP", "STL", "STP", "STPZ", "SVG",
  "TGA", "TIFF", "TXT", "USD", "USDZ", "VDX", "VSD", "VSDM", "VSDX", "VTK", "VTP", "VTT",
  "WAV", "WEBP", "WMF", "WPG", "WRL", "X", "X3D", "XAML", "XCF", "XLS", "XLSX", "XLTX", "XML",
  "3DM", "3DS", "3MF"
].sort();

const actionCategories = [
  "All", "Create", "Convert", "Edit", "Evolve", "Distribute", "Produce", "Publish", "Share", "Swap"
];

const capabilities = [
  { value: "50+", label: "Creative Tools" },
  { value: "S.H.I.E.L.D. AI", label: "Powered Engine" },
  { value: "4K/8K", label: "Resolution Support" },
  { value: "Real-time", label: "Collaboration" },
];

const engineStats = [
  { label: "Processing", value: "Neural", icon: Brain },
  { label: "Real-time", value: "Active", icon: Activity },
  { label: "Resolution", value: "8K Sovereign", icon: Monitor },
];

const terminalLogs = [
  "[OK] Initializing Neural Forge Media Engine...",
  "[OK] Establishing high-bandwidth uplink to S.H.I.E.L.D. Studios.",
  "[OK] Synthesizing cinematic sequence: \"The Watchman's Vigil\".",
  "[OK] Content Audit: Adjusting color grading for scriptural resonance.",
  "[OK] Sovereign Media Pipeline: ACTIVE.",
];

const CreativeMedia = () => {
  const navigate = useNavigate();
  const [selectedFormatCategory, setSelectedFormatCategory] = useState("All");
  const [selectedActionCategory, setSelectedActionCategory] = useState("All");
  const [portfolioSearch, setPortfolioSearch] = useState("");

  const displayedFormats = selectedFormatCategory === "All"
    ? allFormats
    : formatCategories.find(c => c.name === selectedFormatCategory)?.formats || [];

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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Unleash human imagination empowered by artificial intelligence. A complete suite for art, video, music, and digital publishing.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-10">
              Autonomous Content Generation & Immersive Media Engineering. A comprehensive creative media production ecosystem — from images, engineering, film and music to graphic design, social media and digital media publishing and AI-powered content generation. Create, Convert, Edit, Evolve, Animate, Produce, Market, Publish, Share, Swap, Save, and Distribute world-class media.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/shield-ai-os")}>
                <Rocket className="w-5 h-5" /> Initiate S.H.I.E.L.D. AI Creative Media Engine
              </Button>
              <Button variant="glow" size="lg" className="gap-2" onClick={() => navigate("/shield-ai-os")}>
                <Brain className="w-5 h-5" /> Initiate Neuro Forge Media Engine
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Button variant="outline" className="gap-2" onClick={() => navigate("/shield-ai-os")}>
                <Play className="w-4 h-4" /> Start Generating
              </Button>
              <Button variant="outline" className="gap-2">
                <LayoutGrid className="w-4 h-4" /> View Templates
              </Button>
            </div>

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

        {/* Creative Studios Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Creative Studios</h2>
            <p className="text-muted-foreground">Professional-grade tools augmented with S.H.I.E.L.D. AI for every medium</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "AI Generative Art", desc: "Create stunning visuals, paintings, and digital artwork with advanced AI models" },
              { icon: Film, title: "Video Production Studio", desc: "AI-enhanced video editing, rendering, and automated post-production workflows" },
              { icon: Music, title: "Digital Audio Workstation", desc: "Compose, mix, and master audio tracks with S.H.I.E.L.D. AI sound engineering" },
              { icon: Newspaper, title: "Digital Magazine Publisher", desc: "Create interactive, beautifully designed digital magazines and publications" },
            ].map((studio, i) => (
              <motion.div key={studio.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="p-2 rounded-lg bg-primary/10"><studio.icon className="w-5 h-5 text-primary" /></div>
                    <CardTitle className="text-base">{studio.title}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{studio.desc}</p></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Neuro Forge Creative Engine Card */}
        <section className="container mx-auto px-4 mb-20">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                    <Brain className="w-3 h-3 mr-1" /> S.H.I.E.L.D. AI
                  </Badge>
                  <h2 className="text-3xl font-display font-bold mb-4">Neuro Forge Creative Engine</h2>
                  <p className="text-muted-foreground mb-6">
                    S.H.I.E.L.D. AI Creative Media is a sovereign production suite where high-fidelity content is synthesized through neural intelligence. From cinematic video to immersive audio, every frame is engineered for ethical alignment and universal impact from S.H.I.E.L.D. AI LLM & All AI Large Language Models.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {engineStats.map((s) => (
                      <div key={s.label} className="glass-card p-3 rounded-lg text-center">
                        <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                        <div className="text-sm font-bold text-primary">{s.value}</div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="shield" className="gap-2" onClick={() => navigate("/shield-ai-os")}>
                    <Rocket className="w-4 h-4" /> Initialize Creative Engine
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Film, title: "Neural Video Synthesis", desc: "Generate high-fidelity cinematic sequences in all genres, from Final Draft scripts and prompts." },
                    { icon: Music, title: "Sovereign Audio Engine", desc: "Synthesize immersive soundscapes and multi-lingual voiceovers with divine resonance." },
                    { icon: Box, title: "Immersive Visuals", desc: "Real-time generation of 3D environments and holographic assets for the Blanch Metaverse." },
                    { icon: Eye, title: "Ethical Content Audit", desc: "Real-time Watchman oversight ensuring all generated media aligns with divine truth." },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3 p-3 rounded-lg bg-card/50">
                      <f.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold">{f.title}</h4>
                        <p className="text-xs text-muted-foreground">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Limitless Possibilities */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Limitless Possibilities</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Break through creative blocks and scale your content production. Our AI understands context, style, and branding to deliver pixel-perfect assets in a fraction of the time.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              "AI-Assisted Copywriting", "Import & Save to Blanch Drive", "Import & Save to S.H.I.E.L.D. AI Drive",
              "High-Quality Images", "Audio Synthesis", "Real-time Collaborative Editing", "3D Rendering & Animation",
              "High-Fidelity Audio Synthesis", "Vector Graphic Generation", "Automated Formatting",
              "Cross-Platform Distribution", "Brand Kit Integration", "Media Kit Compilation",
              "Film Script Final Draft", "Create, Edit, Evolve, Convert, Produce",
            ].map((item) => (
              <Badge key={item} variant="outline" className="border-primary/20 text-muted-foreground px-3 py-2 text-xs justify-center text-center">
                <CheckCircle2 className="w-3 h-3 mr-1 text-primary shrink-0" /> {item}
              </Badge>
            ))}
          </div>
        </section>

        {/* Tabbed Sections */}
        <section className="container mx-auto px-4 mb-20">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1.5 bg-transparent mb-10 h-auto">
              {tabCategories.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-xs px-3 py-1.5"
                >
                  <tab.icon className="w-3 h-3 mr-1" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(tabContent).map(([value, tab]) => (
              <TabsContent key={value} value={value}>
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

        {/* Supported Formats & Standards */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Supported Formats & Standards</h2>
            <p className="text-muted-foreground text-sm">Industry-standard format support across all media types</p>
          </div>

          {/* Action Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {actionCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedActionCategory === cat ? "shield" : "outline"}
                size="sm"
                onClick={() => setSelectedActionCategory(cat)}
                className="text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Format Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {formatCategories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedFormatCategory === cat.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormatCategory(cat.name)}
                className="text-xs"
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {displayedFormats.map((fmt) => (
              <Badge key={fmt} variant="outline" className="border-border/50 text-muted-foreground px-3 py-1.5 text-xs">
                {fmt}
              </Badge>
            ))}
          </div>
        </section>

        {/* Active Media Streams - Terminal */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">S.H.I.E.L.D. AI Creative Media</h2>
            <p className="text-muted-foreground text-sm">Additional Autonomous Content Generation & Immersive Media Engineering</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Initialize Creative Engine", icon: Rocket },
              { label: "Rendering Engine", icon: Server },
              { label: "Neural Forge", icon: Brain },
              { label: "AI Director", icon: Eye },
              { label: "Watchman Version", icon: Shield },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
                <Badge variant="outline" className="ml-auto text-xs border-primary/30 text-primary">Active</Badge>
              </div>
            ))}
          </div>

          {/* Terminal Logs */}
          <Card className="bg-card/80 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" /> Active Media Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 rounded-lg p-4 font-mono text-xs space-y-1">
                {terminalLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="text-primary/80"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Production Assets & Ecosystem Links */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-display font-bold mb-4">Production Assets</h3>
              <div className="space-y-2">
                {[
                  { name: "S.H.I.E.L.D. AI Studios", link: "/technology" },
                  { name: "Media Asset Library", link: "/shield-ai-drive" },
                  { name: "Audio Synthesis Lab", link: "/creative-media" },
                  { name: "Virtual Set Designer", link: "/metaverse" },
                  { name: "Advertising Pool", link: "/command-center" },
                ].map((a) => (
                  <Button key={a.name} variant="outline" className="w-full justify-between text-sm" onClick={() => navigate(a.link)}>
                    {a.name} <ExternalLink className="w-3 h-3" />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold mb-4">Ecosystem Links</h3>
              <div className="space-y-2">
                {[
                  { name: "Blanch Drive", link: "/blanch-drive" },
                  { name: "S.H.I.E.L.D. AI Drive", link: "/shield-ai-drive" },
                  { name: "S.H.I.E.L.D. AI Studios", link: "/technology" },
                  { name: "Metaverse Hub", link: "/metaverse" },
                ].map((a) => (
                  <Button key={a.name} variant="outline" className="w-full justify-between text-sm" onClick={() => navigate(a.link)}>
                    {a.name} <ExternalLink className="w-3 h-3" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Production Status:</span> Media Engine is operating at 99% neural efficiency. Content generation is currently prioritized for "The Watchman" series.
            </p>
          </div>
        </section>

        {/* Publish to the World */}
        <section className="container mx-auto px-4 mb-20">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <Share2 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-4">Publish to the World</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm">
                Distribute your creations across S.H.I.E.L.D. AI Magazine, Blanch Network, Virtual Marketplaces, All Social Media Platforms, Marketing firms, Publishing, Blanch OS, S.H.I.E.L.D. AI OS and all Web/App Development Projects — and beyond with one click.
              </p>
              <Button variant="shield" className="gap-2" onClick={() => navigate("/command-center")}>
                <ArrowRight className="w-4 h-4" /> Open Publishing Dashboard
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Portfolio / Gallery Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Creative Portfolio & Gallery</h2>
            <p className="text-muted-foreground text-sm">Showcase your work and discover inspiring creations from the community</p>
          </div>
          <div className="max-w-md mx-auto mb-8">
            <Input
              placeholder="Search portfolios..."
              value={portfolioSearch}
              onChange={(e) => setPortfolioSearch(e.target.value)}
              className="bg-card/50"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { title: "Cinematic Trailer", type: "Video", color: "from-red-500/20 to-pink-500/20" },
              { title: "Brand Identity Kit", type: "Design", color: "from-blue-500/20 to-cyan-500/20" },
              { title: "Album Cover Art", type: "Image", color: "from-purple-500/20 to-pink-500/20" },
              { title: "Podcast Series", type: "Audio", color: "from-green-500/20 to-emerald-500/20" },
              { title: "3D Product Render", type: "3D", color: "from-orange-500/20 to-amber-500/20" },
              { title: "Magazine Layout", type: "Publishing", color: "from-indigo-500/20 to-violet-500/20" },
              { title: "Game Assets Pack", type: "Gaming", color: "from-cyan-500/20 to-teal-500/20" },
              { title: "Social Media Kit", type: "Marketing", color: "from-pink-500/20 to-rose-500/20" },
            ].filter(p => !portfolioSearch || p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.type.toLowerCase().includes(portfolioSearch.toLowerCase()))
            .map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className={`aspect-square rounded-xl bg-gradient-to-br ${project.color} border border-border/30 flex flex-col items-center justify-center p-4 hover:border-primary/30 transition-all`}>
                  <ImagePlus className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-sm font-medium text-center">{project.title}</p>
                  <Badge variant="outline" className="mt-2 text-xs">{project.type}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" /> Upload Your Work
            </Button>
          </div>
        </section>

        {/* Creative Engine Animation */}
        <section className="container mx-auto px-4 mb-20 text-center">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary/30 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="text-lg font-display font-bold mb-2">Creative Engine</h3>
            <p className="text-sm text-muted-foreground mb-4">Generating Masterpiece...</p>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 text-center">
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
