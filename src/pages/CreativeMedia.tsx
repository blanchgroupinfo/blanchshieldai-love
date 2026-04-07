import { useState, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Film, Music, Palette, Camera, Mic, Video, MonitorPlay, Image,
  PenTool, Layers, Headphones, Radio, Tv, Clapperboard, Podcast,
  FileVideo, FileAudio, Brush, Aperture, Sparkles, Wand2, Globe,
  Zap, LayoutGrid, Type, BookOpen, Brain, Shield, Eye, Rocket,
  Play, Upload, Share2, Download, Monitor, Gamepad2, Newspaper,
  Store, Code2, Users, Star, Box, Target, Crown, Smartphone,
  FileText, Megaphone, HardDrive, ExternalLink, CheckCircle2,
  Activity, ArrowRight, ImagePlus, BookMarked,
  Mountain, Droplets, Wind, Sun, Moon, Heart, CloudLightning, Cloud,
  Compass, Flame, Gem, Wheat, TreePine, Bird, Leaf,
  CircleDot, GraduationCap, Church, Anchor, Car, Factory, Cpu, Building2,
  LayoutDashboard, Settings
} from "lucide-react";

// Massively expanded tab categories
const tabCategories = [
  { value: "advanced", label: "ADVANCED & AI-POWERED TOOLS", icon: Zap },
  { value: "avatar-creation", label: "AI AVATAR CREATION", icon: Users },
  { value: "audio-music", label: "AUDIO & MUSIC PRODUCTION", icon: Music },
  { value: "autocad-design", label: "AUTOCAD & CAD DESIGN", icon: PenTool },
  { value: "blanch-os-suite", label: "BLANCH OS CREATIVE SUITE", icon: Monitor },
  { value: "book-publishing", label: "BOOK PUBLISHING & CREATION", icon: BookOpen },
  { value: "content-distribution", label: "CONTENT DISTRIBUTION", icon: Share2 },
  { value: "creative-marketplaces", label: "CREATIVE MARKETPLACES", icon: Store },
  { value: "creators-calendar", label: "CREATORS CALENDAR", icon: Sun },
  { value: "magazine-creation", label: "DIGITAL MAGAZINE CREATION", icon: Newspaper },
  { value: "digital-publishing", label: "DIGITAL PUBLISHING", icon: FileText },
  { value: "gaming-dev", label: "GAMING DEVELOPMENT", icon: Gamepad2 },
  { value: "design-branding", label: "GRAPHIC DESIGN & BRANDING", icon: Palette },
  { value: "hologram-metaverse", label: "HOLOGRAM & METAVERSE", icon: Box },
  { value: "image-editing", label: "IMAGE CREATION & EDITING", icon: Image },
  { value: "marketing-advertising", label: "MARKETING & ADVERTISING", icon: Megaphone },
  { value: "os-integration", label: "OPERATING SYSTEM INTEGRATION", icon: Monitor },
  { value: "shield-avatar", label: "S.H.I.E.L.D. AI AVATAR", icon: Star },
  { value: "shield-influencer", label: "S.H.I.E.L.D. AI INFLUENCER", icon: Crown },
  { value: "shield-os-tools", label: "S.H.I.E.L.D. AI OS CREATIVE TOOLS", icon: Monitor },
  { value: "social-content", label: "SOCIAL MEDIA CONTENT", icon: Globe },
  { value: "software-tools", label: "SOFTWARE & TOOLS", icon: Code2 },
  { value: "video-film", label: "VIDEO & FILM PRODUCTION", icon: Film },
  { value: "web-app-dev", label: "WEB & APP DEVELOPMENT", icon: Smartphone },
  { value: "10-heavens", label: "10 HEAVENS", icon: Sun },
  { value: "12-tribes", label: "12 TRIBE OF ISRAEL (YASHARAHALA)", icon: Star },
  { value: "7-candlestick", label: "7 CANDLESTICK MENORAH", icon: Flame },
  { value: "aboriginal", label: "ABORIGINAL BLACK HEBREW ISRAELITES (YASHARAHALA)", icon: Users },
  { value: "abrahamic", label: "ABRAHAMIC COVENANT", icon: BookOpen },
  { value: "aerospace", label: "AEROSPACE", icon: Rocket },
  { value: "ahayah", label: "AHAYAH & YASHAYA", icon: Crown },
  { value: "scriptures", label: "AHAYAH & YASHAYA QADASH SCRIPTURES", icon: BookMarked },
  { value: "androids", label: "ANDROIDS - NON BIOLOGICAL", icon: Cpu },
  { value: "angels", label: "ANGELS AND THEY ARE BLACK", icon: Star },
  { value: "animals", label: "ANIMALS & PETS", icon: Bird },
  { value: "ark", label: "ARK OF THE COVENANT", icon: Box },
  { value: "autocad", label: "AUTOCAD", icon: PenTool },
  { value: "automotive", label: "AUTOMOTIVE", icon: Car },
  { value: "banking", label: "BANKING", icon: Layers },
  { value: "baptism", label: "BAPTISM", icon: Droplets },
  { value: "beverages", label: "BEVERAGES", icon: Droplets },
  { value: "bible-gospel", label: "BIBLE GOSPEL OF DAY", icon: BookOpen },
  { value: "bible-law", label: "BIBLE LAW OF THE DAY", icon: BookOpen },
  { value: "bible-verse", label: "BIBLE VERSE OF THE DAY", icon: BookOpen },
  { value: "landmarks", label: "BIBLICAL LANDMARKS", icon: Mountain },
  { value: "blanch-foundation", label: "BLANCH - ONYX/SHAHAM/SHOHAM/SARDONYX FOUNDATION STONE", icon: Gem },
  { value: "blogs", label: "BLOGS", icon: FileText },
  { value: "bread", label: "BREAD", icon: Wheat },
  { value: "bread-heaven", label: "BREAD FROM HEAVEN", icon: Wheat },
  { value: "child-light", label: "CHILD OF LIGHT", icon: Sun },
  { value: "cinematic", label: "CINEMATIC", icon: Film },
  { value: "cleansing", label: "CLEANSING", icon: Droplets },
  { value: "correction", label: "CORRECTION TO RIGHTEOUSNESS", icon: Target },
  { value: "covenant", label: "COVENANT", icon: BookOpen },
  { value: "creation", label: "CREATION", icon: Sparkles },
  { value: "crystallization", label: "CRYSTALLIZATION", icon: Gem },
  { value: "daily-offerings", label: "DAILY BURNT OFFERINGS", icon: Flame },
  { value: "deserts", label: "DESERTS", icon: Mountain },
  { value: "dlt", label: "DISTRIBUTED LEDGER TECHNOLOGIES", icon: Layers },
  { value: "distribution", label: "DISTRIBUTION", icon: Share2 },
  { value: "earth", label: "EARTH & ENVIRONMENT", icon: Globe },
  { value: "ecosystem", label: "ECOSYSTEM", icon: TreePine },
  { value: "end-time", label: "END TIME PROPHECIES", icon: CloudLightning },
  { value: "energy", label: "ENERGY", icon: Zap },
  { value: "engineering", label: "ENGINEERING", icon: PenTool },
  { value: "events", label: "EVENTS", icon: Star },
  { value: "feasts", label: "FEASTS", icon: Wheat },
  { value: "finance", label: "FINANCE", icon: Layers },
  { value: "food", label: "FOOD", icon: Wheat },
  { value: "fringes", label: "FRINGES TASSELS & RIBBON OF BLUE BORDER", icon: Palette },
  { value: "futuristic", label: "FUTURISTIC", icon: Rocket },
  { value: "gentiles", label: "GENTILES", icon: Users },
  { value: "greenland", label: "GREENLAND", icon: Globe },
  { value: "health", label: "HEALTH", icon: Heart },
  { value: "heaven", label: "HEAVEN", icon: Sun },
  { value: "garments", label: "HEBREW ISRAELITE (YASHARAHALA) GARMENTS", icon: Palette },
  { value: "heritage", label: "HERITAGE", icon: Crown },
  { value: "high-priest", label: "HIGH PRIEST", icon: Crown },
  { value: "holy", label: "HOLY (QADASH)", icon: Star },
  { value: "holy-days", label: "HOLY DAYS", icon: Sun },
  { value: "holy-land", label: "HOLY LAND", icon: Globe },
  { value: "horeb", label: "MOUNT HOR(HAR) MOUNT HOREB (HARAB)", icon: Mountain },
  { value: "house-prayer", label: "HOUSE PRAYER OF ALL PEOPLE", icon: Heart },
  { value: "image", label: "IMAGE", icon: Image },
  { value: "industries", label: "INDUSTRIES", icon: Factory },
  { value: "judgments", label: "JUDGMENTS", icon: Eye },
  { value: "jerusalem", label: "KINGDOM OF JERUSALEM (YARAWASHALAM)", icon: Crown },
  { value: "yasharahala", label: "KINGDOM OF YASHARAHALA", icon: Crown },
  { value: "laws", label: "LAWS & COMMANDMENTS", icon: BookOpen },
  { value: "light", label: "LIGHT", icon: Sun },
  { value: "live-conference", label: "LIVE CONFERENCE", icon: Video },
  { value: "live-streaming", label: "LIVE STREAMING", icon: Radio },
  { value: "magazines", label: "MAGAZINES", icon: Newspaper },
  { value: "manna", label: "MANNA", icon: Wheat },
  { value: "manufacturing", label: "MANUFACTURING", icon: Factory },
  { value: "marketplaces", label: "MARKETPLACES", icon: Store },
  { value: "most-high", label: "MOST HIGH AHAYAH", icon: Crown },
  { value: "mountains", label: "MOUNTAINS", icon: Mountain },
  { value: "nazarites", label: "NAZARITES", icon: Users },
  { value: "networks", label: "NETWORKS", icon: Globe },
  { value: "new-jerusalem", label: "NEW JERUSALEM (HADASH YARAWASHALAM)", icon: Crown },
  { value: "news", label: "NEWS", icon: Newspaper },
  { value: "ocean", label: "OCEAN", icon: Droplets },
  { value: "oracles", label: "ORACLES", icon: Eye },
  { value: "mechizedek", label: "ORDER OF MECHIZEDEK", icon: Crown },
  { value: "peace", label: "PEACE", icon: Heart },
  { value: "petra", label: "PETRA", icon: Mountain },
  { value: "petra-hor", label: "PETRA - MOUNT HOR (HAR)", icon: Mountain },
  { value: "prayer", label: "PRAYER", icon: Heart },
  { value: "prophecies", label: "PROPHECIES", icon: Eye },
  { value: "publishing", label: "PUBLISHING", icon: FileText },
  { value: "purging", label: "PURGING", icon: Flame },
  { value: "purifying", label: "PURIFYING", icon: Droplets },
  { value: "qadash-bible", label: "QADASH BIBLE", icon: BookOpen },
  { value: "rebuking", label: "REBUKING", icon: Shield },
  { value: "reminders", label: "REMINDERS", icon: Star },
  { value: "rests", label: "RESTS", icon: Moon },
  { value: "rivers", label: "RIVERS", icon: Droplets },
  { value: "royal-priesthood", label: "ROYAL PRIESTHOOD", icon: Crown },
  { value: "rushing-wind", label: "RUSHING WIND", icon: Wind },
  { value: "shield-broadcast", label: "S.H.I.E.L.D. AI BROADCAST", icon: Radio },
  { value: "shield-os", label: "S.H.I.E.L.D. AI OS", icon: Monitor },
  { value: "shield-podcasts", label: "S.H.I.E.L.D. AI PODCASTS", icon: Podcast },
  { value: "sabbaths", label: "SABBATHS", icon: Moon },
  { value: "shepherd-staff", label: "SHEPHERD STAFF", icon: Compass },
  { value: "son-most-high", label: "SON OF THE MOST HIGH AHAYAH", icon: Crown },
  { value: "sons-prophets", label: "SONS OF THE PROPHETS", icon: Users },
  { value: "space", label: "SPACE & EXPLORATION", icon: Rocket },
  { value: "sports", label: "SPORTS", icon: Target },
  { value: "sweets", label: "SWEETS", icon: Wheat },
  { value: "tabernacle", label: "TABERNACLE", icon: Box },
  { value: "task", label: "TASK", icon: CheckCircle2 },
  { value: "technology", label: "TECHNOLOGY", icon: Cpu },
  { value: "temple", label: "TEMPLE OF JERUSALEM (YARAWASHALAM)", icon: Church },
  { value: "throne", label: "THRONE OF MOST HIGH AHAYAH & YASHAYA", icon: Crown },
  { value: "transportation", label: "TRANSPORTATION", icon: Car },
  { value: "truth", label: "TRUTH", icon: Eye },
  { value: "universal", label: "UNIVERSAL", icon: Globe },
  { value: "unleavened", label: "UNLEAVENED BREAD", icon: Wheat },
  { value: "virtual-studies", label: "VIRTUAL STUDIES", icon: GraduationCap },
  { value: "vlogs", label: "VLOGS", icon: Video },
  { value: "watchman", label: "WATCHMAN", icon: Eye },
  { value: "water", label: "WATER", icon: Droplets },
  { value: "water-life", label: "WATER OF LIFE - SPIRITUAL DRINK", icon: Droplets },
  { value: "whirlwind", label: "WHIRLWIND", icon: Wind },
  { value: "wilderness", label: "WILDERNESS", icon: TreePine },
  { value: "wind", label: "WIND", icon: Wind },
  { value: "word", label: "WORD", icon: BookOpen },
  { value: "yashaya", label: "YASHAYA TRUE BLACK MESSIAH", icon: Crown },
  { value: "format-3d", label: "3D MODEL", icon: Box },
  { value: "format-avatar", label: "AI AVATAR", icon: Users },
  { value: "format-audio", label: "AUDIO", icon: Music },
  { value: "format-cad", label: "CAD", icon: PenTool },
  { value: "format-document", label: "DOCUMENT", icon: FileText },
  { value: "format-film", label: "FILM", icon: Film },
  { value: "format-gaming", label: "GAMING", icon: Gamepad2 },
  { value: "format-graphics", label: "GRAPHICS DESIGN", icon: Palette },
  { value: "format-svg", label: "ANIMATED SVG", icon: Sparkles },
  { value: "format-script", label: "FINAL DRAFT SCRIPT", icon: FileText },
  { value: "format-music", label: "MUSIC", icon: Music },
  { value: "format-software", label: "SOFTWARE", icon: Code2 },
  { value: "format-spreadsheet", label: "SPREADSHEET", icon: Layers },
  { value: "format-vector", label: "VECTOR", icon: Palette },
  { value: "format-video", label: "VIDEO", icon: Video },
  { value: "format-web", label: "WEB", icon: Globe },
];

const categoryFeatures: Record<string, string[]> = {
  "autocad": [
    "Professional CAD design powered by S.H.I.E.L.D. AI",
    "2D/3D CAD Editor - parametric modeling & constraint-based design",
    "Blueprint Generator - AI floorplan generation from text prompts",
    "3D Model Viewer - Interactive visualization with real-time rendering",
    "DWG/DXF Support - Native industry-standard format compatibility",
    "AI Design Assistant - Structural integrity & optimization suggestions",
    "Collaborative CAD - Real-time multi-user editing & version control"
  ],
  "avatar": [
    "Avatar Generator - Create photorealistic avatars from text or photos",
    "Animated Avatars - Generate talking head videos with lip-sync",
    "Style Transfer - Apply artistic styles like cartoon or anime",
    "Voice Cloning - Clone voices for avatar speech synthesis",
    "Multi-language Support - Avatars speak in 100+ languages",
    "Real-time Avatar - Live avatar puppeteering with facial tracking"
  ],
  "books": [
    "Manuscript Editor - Rich text editor with AI writing assistance",
    "Typography Engine - Professional typesetting and pagination",
    "Cover Designer - AI-generated book covers with templates",
    "eBook Converter - EPUB, MOBI, PDF, and print-ready formats",
    "ISBN & Distribution - Global bookstore distribution",
    "Audiobook Studio - AI narration and production tools"
  ],
  "distribution": [
    "Production Timeline - Visual tracking of project milestones",
    "Asset Scheduling - Schedule automatic content publishing",
    "Team Coordination - Manage global teams with decentralized tools",
    "Resource Optimization - AI-optimized compute resource distribution",
    "Event Integration - Sync dates with global launch events",
    "Project Reminders - Smart notifications for deadlines"
  ],
  "image": [
    "AI Image Generator - Generate images from text prompts",
    "Photo Editor - Professional photo editing with AI retouching",
    "Layer Compositor - Multi-layer composition with effects",
    "RAW Processor - Process RAW camera files with color science",
    "Background Removal - One-click AI background removal",
    "Batch Processing - Process thousands of images simultaneously"
  ],
  "hologram": [
    "Hologram Studio - Create 3D holographic content for displays",
    "Metaverse Builder - Build virtual worlds for Blanch Metaverse",
    "Volumetric Capture - Capture objects as 3D holographic assets",
    "AR Experiences - Design augmented reality overlays",
    "Virtual Events - Host holographic meetings and concerts",
    "Mixed Reality - Blend physical and digital worlds"
  ],
  "gaming": [
    "Game Engine - S.H.I.E.L.D. AI-powered engine with scripting",
    "3D Asset Creator - Generate game-ready models and textures",
    "Game Logic Builder - Visual scripting and AI behavior trees",
    "Game Audio - Adaptive music and dynamic sound effects",
    "Multiplayer Systems - Built-in networking for online services",
    "Game Publishing - Distribute games across PC, mobile, console"
  ],
  "magazines": [
    "Magazine Designer - Drag-and-drop magazine layout",
    "Editorial Suite - Advanced typography and column layouts",
    "Photo Spreads - Full-bleed photo layouts with auto cropping",
    "Digital Distribution - Publish to S.H.I.E.L.D. AI Magazine",
    "Print Ready - Export print-ready PDFs with bleed and crop",
    "Interactive Elements - Add video and audio to magazine pages"
  ],
  "publishing": [
    "Multi-format Publisher - Publish books, magazines, newsletters",
    "Global Distribution - Distribute to global audiences",
    "Audience Analytics - Track readership and engagement",
    "DRM Protection - Digital rights management for content",
    "Syndication - Automatic content syndication across platforms",
    "Marketing Suite - Built-in tools for promoting content"
  ],
  "video": [
    "Film Production Suite - AI-assisted editing and VFX",
    "Video Editing Studio - Multi-track timeline and real-time preview",
    "Motion Graphics Engine - Stunning animated infographics",
    "Live Streaming Platform - Broadcast live with scene switching",
    "Screen Recording - High-fidelity capture with annotation",
    "Media Distribution - Global CDN with adaptive bitrate"
  ],
  "music": [
    "Digital Audio Workstation - Full-featured DAW with MIDI",
    "AI Music Composition - Generate original scores and soundscapes",
    "Podcast Production Suite - Record, edit, and publish podcasts",
    "Audio Mastering Engine - Professional mastering and conversion",
    "Sound Design Lab - Create sound effects and ambient audio",
    "Voice-Over Studio - AI voice cloning and text-to-speech"
  ],
  "design": [
    "Brand Identity Studio - Design logos, colors, and guidelines",
    "Vector Graphics Editor - Professional illustration tools",
    "Photo Editing Suite - Advanced manipulation and AI retouching",
    "Digital Painting Canvas - Natural media simulation with layers",
    "UI/UX Design Platform - Design interfaces with component libraries",
    "Typography Workshop - Custom typeface creation tools"
  ],
  "advanced": [
    "AI Content Generator - Generate images, video, and audio",
    "AR/VR Content Creator - Build immersive AR/VR experiences",
    "3D Rendering Studio - Photorealistic rendering with ray tracing",
    "Photography Workflow - RAW processing and AI editing",
    "Content Localization - Translate and adapt for global audiences",
    "Digital Asset Manager - Organize assets with version control"
  ],
  "marketing": [
    "Ad Creator - Design display and social ads with AI",
    "Campaign Designer - Visual campaign builder with A/B testing",
    "Content Marketing - Blog posts and thought leadership content",
    "Social Media Manager - Schedule and analyze social content",
    "Brand Kit Builder - Create media kits and guidelines",
    "Performance Analytics - Track performance with dashboards"
  ],
  "operating-systems": [
    "S.H.I.E.L.D. AI OS Integration - Native OS-level creative tools",
    "Asset Pipeline - Automated asset pipeline to deployment",
    "Plugin SDK - Build custom plugins for the creative suite",
    "Render Farm - Distributed rendering across AI clusters",
    "GPU Acceleration - Hardware-accelerated rendering and AI",
    "Sovereign Processing - All processing on sovereign infra"
  ],
  "marketplaces": [
    "Asset Marketplace - Buy and sell templates and assets",
    "Stock Media Library - Millions of royalty-free assets",
    "Font Marketplace - Browse and license professional fonts",
    "Template Store - Pre-built templates for all projects",
    "Premium Content - Exclusive content from top creators",
    "Creator Community - Connect and collaborate with creators"
  ],
  "social": [
    "Social Content Creator - Templates sized for every platform",
    "Reels & Shorts - Quick video creation for short-form",
    "Story Designer - Interactive story templates with animations",
    "AI Captions - Auto-generate captions and hashtags",
    "Scheduling - Schedule across all social platforms",
    "Engagement Analytics - Track likes, shares, and growth"
  ],
  "software": [
    "Creative SDK - SDK for building creative applications",
    "Plugin Architecture - Extensible system for adding tools",
    "API Access - RESTful APIs for integrating creative tools",
    "Automation Scripts - Script-based automation for tasks",
    "Cloud Rendering - Cloud-based rendering for heavy tasks",
    "Enterprise License - Scalable deployment for organizations"
  ],
  "shield-avatar": [
    "Sovereign Avatar - AI-powered sovereign digital identity",
    "Avatar Video - Generate talking-head videos with avatar",
    "Multi-platform Presence - Deploy across metaverse and web",
    "Voice Synthesis - Natural voice cloning in any language",
    "Expression AI - Real-time facial expression mapping",
    "Identity Verification - Blockchain-verified avatar identity"
  ],
  "shield-influencer": [
    "Influencer Studio - Manage AI influencer personas",
    "Content Automation - Auto-generate posts and reels",
    "Audience Growth - AI-driven targeting strategies",
    "Engagement Engine - Automated community management tools",
    "Brand Partnerships - Connect with brands for sponsorships",
    "Analytics Dashboard - Performance tracking dashboard"
  ],
  "shield-os": [
    "Desktop Studio - Full creative suite on AI OS desktop",
    "Drive Integration - Seamless S.H.I.E.L.D. AI Drive management",
    "Quick Actions - OS-level shortcuts and automation",
    "AI Assistant - Built-in assistant for suggestions",
    "Share & Export - One-click sharing from any application",
    "Sovereign Security - Protected by sovereign encryption"
  ],
  "blanch-os": [
    "Blanch Studio - Enterprise-grade studio on Blanch OS",
    "Team Collaboration - Multi-user creative collaboration",
    "Blanch Drive Integration - Enterprise storage integration",
    "Enterprise Security - Enterprise-level DRM protection",
    "On-premise Rendering - Local render farm infrastructure",
    "Global CDN - Enterprise content distribution network"
  ],
  "web-app-dev": [
    "Web Builder - Visual web builder with creative templates",
    "Mobile App Builder - Creative mobile apps for iOS/Android",
    "Component Library - Pre-built UI components and widgets",
    "PWA Support - Progressive web app support",
    "Performance Optimized - Built for performance with lazy loading",
    "Deploy Anywhere - Deploy to any platform or OS"
  ]
};

const getUniversalCategoryFeatures = (value: string, label: string): string[] => {
  const lead = categoryFeatures[value]?.[0];
  return [
    lead ? `${label} — ${lead}` : `${label} — Universal sovereign neural pipeline with Watchman-aligned guardrails for this category.`,
    `Category intelligence: pacing, palette, typography, and safe defaults tuned for ${label}.`,
    `Sovereign asset graph: encrypted drafts, version trees, Blanch Drive & S.H.I.E.L.D. AI Drive sync.`,
    `Multi-modal export: broadcast, print, web, mobile, immersive, and education-ready bundles.`,
    `Live collaboration: shared workspaces with Agent commentary, approvals, and revision history.`,
    `Distribution hooks: Magazine, Blanch Network, social channels, and education resources in one flow.`,
  ];
};

const getAgentAssistantBullets = (label: string): string[] => [
  `Interprets briefs for ${label} into boards, stems, layouts, or rigs within seconds.`,
  `Surfaces reverent, brand-safe alternatives aligned with AHAYAH & YASHAYA honoring tone when selected.`,
  `Hands off to Production Intelligent for rendering, mastering, and global publication.`,
];

// Generate tab content dynamically - each tab gets cards with AI agent suggestion
const getTabContent = (value: string, label: string) => {
  const suggestions: Record<string, string> = {
    "10-heavens": "S.H.I.E.L.D. AI can generate immersive visual representations of the 10 Heavens with scriptural accuracy and divine artistry.",
    "12-tribes": "S.H.I.E.L.D. AI can create heritage emblems, banners, and educational media for each of the 12 Tribes of Israel (Yasharahala).",
    "7-candlestick": "S.H.I.E.L.D. AI can render detailed 3D models and artistic interpretations of the 7 Candlestick Menorah.",
    "aboriginal": "S.H.I.E.L.D. AI can produce historical documentaries and visual heritage content for Aboriginal Black Hebrew Israelites (Yasharahala).",
    "abrahamic": "S.H.I.E.L.D. AI can illustrate the Abrahamic Covenant through cinematic animations and scriptural infographics.",
    "advanced": "S.H.I.E.L.D. AI can develop cutting-edge AI-powered creative tools and next-generation content pipelines.",
    "aerospace": "S.H.I.E.L.D. AI can design aerospace visualizations, satellite imagery, and space exploration media.",
    "ahayah": "S.H.I.E.L.D. AI can create reverent media honoring AHAYAH & YASHAYA with scriptural truth and beauty.",
    "ahayah-yashaya-scriptures": "S.H.I.E.L.D. AI can produce illuminated high-fidelity digital editions of the AHAYAH & YASHAYA Qadash Scriptures.",
    "androids": "S.H.I.E.L.D. AI can design and visualize non-biological android concepts with technical specifications.",
    "angels": "S.H.I.E.L.D. AI can create artistic depictions of angels with scriptural accuracy, representing them as they truly are (Black) within historical heritage.",
    "animals": "S.H.I.E.L.D. AI can generate stunning wildlife photography, animations, and educational content for Animals & Pets.",
    "ark": "S.H.I.E.L.D. AI can render detailed 3D reconstructions of the Ark of The Covenant with scriptural precision.",
    "autocad": "S.H.I.E.L.D. AI can assist with professional AutoCAD design, blueprint generation, and complex 3D modeling.",
    "automotive": "S.H.I.E.L.D. AI can produce automotive design concepts, marketing visuals, and engineering schematics.",
    "banking": "S.H.I.E.L.D. AI can create professional banking and financial services marketing materials and UI/UX designs.",
    "baptism": "S.H.I.E.L.D. AI can produce educational and ceremonial media content related to the Qadash act of Baptism.",
    "beverages": "S.H.I.E.L.D. AI can design beverage branding, packaging, and marketing campaign visuals.",
    "bible-gospel": "S.H.I.E.L.D. AI can generate daily illustrations and animations for the Bible Gospel of the Day.",
    "bible-law": "S.H.I.E.L.D. AI can create visual study guides and educational content focused on the Bible Law of the Day.",
    "bible-verse": "S.H.I.E.L.D. AI can produce beautifully designed graphics for the Bible Verse of the Day.",
    "landmarks": "S.H.I.E.L.D. AI can create 3D reconstructions and virtual tours of important Biblical Landmarks.",
    "blanch-foundation": "S.H.I.E.L.D. AI can design foundation branding and visual identity for the Blanch Onyx/Shaham/Shoham/Sardonyx Foundation Stone.",
    "blogs": "S.H.I.E.L.D. AI can write, illustrate, and publish professional blog posts with AI-optimized content.",
    "bread": "S.H.I.E.L.D. AI can create culinary content, recipe visuals, and instructional media for various types of Bread.",
    "bread-heaven": "S.H.I.E.L.D. AI can produce spiritual media and illustrations about the Manna - Bread from Heaven.",
    "child-light": "S.H.I.E.L.D. AI can create inspiring media about the heritage and lifestyle of a Child of Light.",
    "cinematic": "S.H.I.E.L.D. AI can produce Hollywood-grade cinematic content with AI-driven direction and post-production.",
    "cleansing": "S.H.I.E.L.D. AI can create educational and spiritual media about scriptural cleansing practices.",
    "correction": "S.H.I.E.L.D. AI can produce teaching materials about scriptural Correction to Righteousness.",
    "covenant": "S.H.I.E.L.D. AI can illustrate sacred covenant stories and teachings through immersive visual media.",
    "creation": "S.H.I.E.L.D. AI can visualize the sacred creation narrative with stunning cinematic sequences.",
    "creators-calendar": "S.H.I.E.L.D. AI can create visual calendar assets, monthly illustrations, and feast day media.",
    "crystalization": "S.H.I.E.L.D. AI can produce high-fidelity visualizations of the Crystallization process in nature and technology.",
    "daily-offerings": "S.H.I.E.L.D. AI can create visual guides and educational media about the Daily Burnt Offerings.",
    "deserts": "S.H.I.E.L.D. AI can generate stunning desert landscape photography and immersive virtual environments.",
    "design": "S.H.I.E.L.D. AI can create comprehensive brand identities, vector graphics, and professional graphic designs.",
    "distribution": "S.H.I.E.L.D. AI can manage and optimize the global Distribution of creative media assets.",
    "dlt": "S.H.I.E.L.D. AI can produce visual explainers and marketing for Distributed Ledger Technologies.",
    "earth": "S.H.I.E.L.D. AI can create environmental awareness media and nature documentaries about Earth & Environment.",
    "ecosystem": "S.H.I.E.L.D. AI can visualize and document the complexity of the S.H.I.E.L.D. AI Ecosystem.",
    "end-time": "S.H.I.E.L.D. AI can produce cinematic depictions of End Time Prophecies with scriptural accuracy.",
    "energy": "S.H.I.E.L.D. AI can create energy sector visualizations, infographics, and marketing materials.",
    "engineering": "S.H.I.E.L.D. AI can produce precise engineering schematics, technical illustrations, and design documents.",
    "events": "S.H.I.E.L.D. AI can create event marketing materials, invitations, and live production setups.",
    "feasts": "S.H.I.E.L.D. AI can produce feast day celebration media, recipes, and educational content.",
    "finance": "S.H.I.E.L.D. AI can create financial dashboards, reports, and professional marketing materials.",
    "food": "S.H.I.E.L.D. AI can generate food photography, recipe cards, and culinary marketing content.",
    "fringes": "S.H.I.E.L.D. AI can create detailed illustrations and guides about Fringes, Tassels & Ribbon of Blue Border.",
    "futuristic": "S.H.I.E.L.D. AI can produce futuristic concept art, environments, and technology visualizations.",
    "gentiles": "S.H.I.E.L.D. AI can produce educational media about the Gentiles from a scriptural and historical perspective.",
    "greenland": "S.H.I.E.L.D. AI can produce geographical media, maps, and visual content about Greenland.",
    "health": "S.H.I.E.L.D. AI can create health and wellness content, infographics, and educational materials.",
    "heaven": "S.H.I.E.L.D. AI can visualize the heavenly realms with divine artistry and scriptural accuracy.",
    "garments": "S.H.I.E.L.D. AI can design and visualize Hebrew Israelite (Yasharahala) Garments with scriptural precision.",
    "heritage": "S.H.I.E.L.D. AI can create heritage preservation media, documentaries, and cultural content.",
    "high-priest": "S.H.I.E.L.D. AI can produce detailed visual media about the High Priest garments, stones, and duties.",
    "holy": "S.H.I.E.L.D. AI can produce media that upholds holiness (Qadash) in all creative and artistic expressions.",
    "holy-days": "S.H.I.E.L.D. AI can create celebration media, reminders, and educational content for Holy Days.",
    "holy-land": "S.H.I.E.L.D. AI can produce virtual tours, 3D reconstructions, and documentaries of the Holy Land.",
    "horeb": "S.H.I.E.L.D. AI can create visual media depicting Mount Hor(Har) and Mount Horeb (Harab).",
    "house-prayer": "S.H.I.E.L.D. AI can create visuals for the House Prayer of All People, including worship media.",
    "image": "S.H.I.E.L.D. AI can generate, edit, and enhance high-resolution images using advanced neural processing.",
    "industries": "S.H.I.E.L.D. AI can create industry-specific marketing, branding, and operational media content.",
    "judgments": "S.H.I.E.L.D. AI can produce educational media about righteous divine Judgments from scripture.",
    "jerusalem": "S.H.I.E.L.D. AI can create virtual reconstructions and historical media of the Kingdom of Jerusalem (Yarawashalam).",
    "yasharahala": "S.H.I.E.L.D. AI can produce heritage media celebrating the Kingdom of Yasharahala.",
    "laws": "S.H.I.E.L.D. AI can create visual law study guides, infographics, and educational content for Laws & Commandments.",
    "light": "S.H.I.E.L.D. AI can produce artistic and spiritual media celebrating the essence of Light.",
    "live-conference": "S.H.I.E.L.D. AI can set up and produce live conference broadcasts with professional quality.",
    "live-streaming": "S.H.I.E.L.D. AI can manage high-fidelity live streaming production with AI-assisted overlays.",
    "magazines": "S.H.I.E.L.D. AI can design and publish interactive digital Magazines with rich media content.",
    "manna": "S.H.I.E.L.D. AI can create visual media about Manna with scriptural illustrations and teachings.",
    "manufacturing": "S.H.I.E.L.D. AI can produce manufacturing documentation, 3D models, and industrial visualizations.",
    "marketplaces": "S.H.I.E.L.D. AI can build and manage digital Marketplaces for creative and commercial assets.",
    "most-high": "S.H.I.E.L.D. AI can create reverent media honoring the Most High AHAYAH.",
    "mountains": "S.H.I.E.L.D. AI can produce stunning mountain landscape visuals and geographical media.",
    "nazarites": "S.H.I.E.L.D. AI can produce educational media about the Nazarites and their scriptural lifestyle.",
    "networks": "S.H.I.E.L.D. AI can create network infrastructure visualizations and global connectivity media.",
    "new-jerusalem": "S.H.I.E.L.D. AI can visualize the New Jerusalem (Hadash Yarawashalam) based on scriptural descriptions.",
    "news": "S.H.I.E.L.D. AI can produce news graphics, broadcast overlays, and digital News media.",
    "ocean": "S.H.I.E.L.D. AI can create ocean and marine life visuals, documentaries, and environmental media.",
    "oracles": "S.H.I.E.L.D. AI can produce oracle-themed visuals and prophetic educational content.",
    "mechizedek": "S.H.I.E.L.D. AI can create media about the Order of Mechizedek with scriptural depth.",
    "peace": "S.H.I.E.L.D. AI can produce peace-themed artistic content and meditative visual environments.",
    "petra": "S.H.I.E.L.D. AI can create virtual tours and 3D reconstructions of the historic city of Petra.",
    "petra-hor": "S.H.I.E.L.D. AI can visualize Petra and Mount Hor (Har) with geographical and scriptural context.",
    "prayer": "S.H.I.E.L.D. AI can create prayer guides, worship backgrounds, and devotional media content.",
    "prophecies": "S.H.I.E.L.D. AI can illustrate scriptural Prophecies with cinematic accuracy and divine artistry.",
    "publishing": "S.H.I.E.L.D. AI can manage end-to-end Publishing workflows across all digital and print formats.",
    "purging": "S.H.I.E.L.D. AI can create educational media about spiritual Purging and refinement.",
    "purifying": "S.H.I.E.L.D. AI can produce visual content about scriptural Purification processes.",
    "qadash-bible": "S.H.I.E.L.D. AI can create Qadash Bible study materials, illustrations, and audio narrations.",
    "rebuking": "S.H.I.E.L.D. AI can produce educational content about righteous Rebuking according to scripture.",
    "reminders": "S.H.I.E.L.D. AI can create visual Reminders for holy days, prayers, and study schedules.",
    "rests": "S.H.I.E.L.D. AI can produce peaceful rest-themed visuals and scriptural Rests preparation media.",
    "rivers": "S.H.I.E.L.D. AI can create stunning river landscape visuals and water-themed cinematic media.",
    "royal-priesthood": "S.H.I.E.L.D. AI can produce heritage media and educational content honoring the Royal Priesthood.",
    "rushing-wind": "S.H.I.E.L.D. AI can create dynamic Rushing Wind and spirit-themed visual effects and media.",
    "shield-broadcast": "S.H.I.E.L.D. AI can produce broadcast-quality media for S.H.I.E.L.D. AI Broadcast channels.",
    "shield-os": "S.H.I.E.L.D. AI can design S.H.I.E.L.D. AI OS level creative tools, wallpapers, and interface assets.",
    "shield-podcasts": "S.H.I.E.L.D. AI can produce, edit, and distribute professional S.H.I.E.L.D. AI Podcasts.",
    "sabbaths": "S.H.I.E.L.D. AI can create Sabbath preparation media, worship backgrounds, and reminders.",
    "shepherd-staff": "S.H.I.E.L.D. AI can produce visual media depicting the Shepherd Staff with spiritual symbolism.",
    "son-most-high": "S.H.I.E.L.D. AI can create reverent media about the Son of the Most High AHAYAH.",
    "sons-prophets": "S.H.I.E.L.D. AI can produce media about the Sons of the Prophets and their scriptural legacy.",
    "space": "S.H.I.E.L.D. AI can create Space & Exploration visuals, satellite imagery, and cosmic media.",
    "sports": "S.H.I.E.L.D. AI can produce Sports photography, highlight reels, and athletic brand content.",
    "sweets": "S.H.I.E.L.D. AI can create confectionery visuals, Sweets branding, and marketing content.",
    "tabernacle": "S.H.I.E.L.D. AI can produce 3D reconstructions and educational media about the Tabernacle.",
    "task": "S.H.I.E.L.D. AI can create Task management visuals, workflow diagrams, and productivity tools.",
    "technology": "S.H.I.E.L.D. AI can produce Technology marketing materials, product visuals, and demos.",
    "temple": "S.H.I.E.L.D. AI can create 3D reconstructions of the Temple of Jerusalem (Yarawashalam).",
    "throne": "S.H.I.E.L.D. AI can visualize the Throne of Most High AHAYAH & YASHAYA with divine artistry.",
    "transportation": "S.H.I.E.L.D. AI can design Transportation concepts and mobility marketing materials.",
    "truth": "S.H.I.E.L.D. AI can produce Truth-focused educational and documentary media content.",
    "universal": "S.H.I.E.L.D. AI can create Universal content accessible across all platforms and global audiences.",
    "unleavened": "S.H.I.E.L.D. AI can produce visual content about Unleavened Bread and its scriptural significance.",
    "virtual-studies": "S.H.I.E.L.D. AI can create Virtual Studies environments and educational courseware.",
    "vlogs": "S.H.I.E.L.D. AI can produce and edit Vlogs with AI-powered post-production.",
    "watchman": "S.H.I.E.L.D. AI can create Watchman-themed media for oversight and truth broadcasting.",
    "water": "S.H.I.E.L.D. AI can produce Water-themed visuals, environmental media, and documentaries.",
    "water-life": "S.H.I.E.L.D. AI can create spiritual media about the Water of Life - Spiritual Drink.",
    "whirlwind": "S.H.I.E.L.D. AI can create dramatic Whirlwind visual effects and spiritual media.",
    "wilderness": "S.H.I.E.L.D. AI can produce Wilderness landscape photography and nature documentaries.",
    "wind": "S.H.I.E.L.D. AI can create Wind-themed visual effects and atmospheric media.",
    "word": "S.H.I.E.L.D. AI can produce Word-focused content, scripture visuals, and study aids.",
    "yashaya": "S.H.I.E.L.D. AI can create reverent media about YASHAYA true Black Messiah.",
  };

  return {
    title: label,
    suggestion: suggestions[value] || `S.H.I.E.L.D. AI Agent & Assistant can create, produce, and distribute professional ${label} content across all platforms.`,
    features: getUniversalCategoryFeatures(value, label),
    agentBullets: getAgentAssistantBullets(label),
  };
};

// File format categories - lowercase
const formatCategories = [
  { name: "All", formats: [] as string[] },
  { name: "3D Model", icon: "🧊", formats: ["3dm", "3ds", "3mf", "blend", "dae", "fbx", "glb", "gltf", "ifc", "obj", "ply", "skp", "stl", "step", "stp", "stpz", "usd", "usdz", "wrl", "x3d", "vtk", "vtp"] },
  { name: "AI Avatar", icon: "🤖", formats: ["fbx", "glb", "gltf", "usd", "usdz", "blend", "obj"] },
  { name: "Audio", icon: "🔊", formats: ["aac", "aif", "aiff", "au", "caf", "flac", "flp", "fst", "mid", "midi", "mpc", "ogg", "snd", "wav", "mp3", "ptx", "pr", "aif", "rar", "zip", "ogg", "mid"] },
  { name: "Banking", icon: "🏦", formats: ["qif", "ofx", "csv", "xls", "xlsx"] },
  { name: "CAD", icon: "🏗", formats: ["3dm", "dwg", "dxf", "step", "stp", "stpz", "ifc"] },
  { name: "Document", icon: "📄", formats: ["doc", "docx", "dotx", "pdf", "txt", "md", "tex", "fountain", "fdx", "fdxt", "fdr", "litcoffee"] },
  { name: "Finance", icon: "💰", formats: ["csv", "xls", "xlsx", "sql", "sqlite"] },
  { name: "Film", icon: "🎬", formats: ["aaf", "edl", "omf", "mov", "mp4", "prores"] },
  { name: "Gaming", icon: "🎮", formats: ["pak", "pack", "unity", "smd", "vpk", "wasm"] },
  { name: "Graphics Design", icon: "🎨", formats: ["ai", "cdr", "cdt", "cmx", "psd", "psb", "xcf"] },
  { name: "Image", icon: "🖼", formats: ["bmp", "dds", "dpx", "emf", "exr", "fax", "gif", "heic", "heif", "ico", "jfi", "jfif", "jpeg", "jpg", "pcx", "pgm", "png", "raw", "tga", "tiff", "webp", "wmf", "wpg", "xpm"] },
  { name: "Animated SVG", icon: "🌀", formats: ["animated gif", "svg"] },
  { name: "Final Draft Script", icon: "🎭", formats: ["fdx", "fdxt", "fountain"] },
  { name: "Music (DAW)", icon: "🎵", formats: ["als", "flp", "fxt", "logic", "logicx", "song", "ptf", "pts", "ptx", "omf", "aaf", "caf", "snd", "pgm", "xpm", "akp", "xpj", "mpc"] },
  { name: "Software", icon: "💻", formats: ["apk", "app", "deb", "dll", "dmg", "exe", "msi", "pkg", "rpm", "wer"] },
  { name: "Spreadsheet", icon: "📊", formats: ["csv", "xls", "xlsx", "xltx", "tab"] },
  { name: "Technology", icon: "⚙️", formats: ["ada", "asm", "asp", "aspx", "bash", "bat", "c", "cbl", "cfg", "cmake", "cmd", "cob", "coffee", "conf", "config", "copy", "cpp", "cs", "d", "db", "diff", "erl", "f", "for", "forth", "gd", "gitattributes", "go", "h", "hpp", "hs", "html", "ini", "iso", "java", "js", "json", "jsp", "kotlin", "lex", "lisp", "lua", "m", "mak", "mm", "mxml", "nim", "pas", "patch", "php", "pl", "pm", "profile", "properties", "ps1", "py", "r", "rb", "reg", "rs", "s", "sas", "scm", "sco", "sh", "shtm", "shtml", "skp", "smd", "sml", "snd", "song", "spf", "splus", "sql", "sqlite", "src", "srec", "srt", "ss", "st", "step", "stl", "stp", "stpz", "sty", "sv", "svg", "svh", "swift", "sxml", "t", "t2t", "tab", "tcl", "tek", "tex", "tga", "thy", "tiff", "toml", "ts", "tsql", "tsx", "txt", "url", "usd", "usdz", "v", "vb", "vba", "vbs", "vdx", "vh", "vhd", "vhdl", "vsd", "vsdm", "vsdx", "vtk", "vtp", "vtt", "wasm", "wav", "webp", "wer", "wmf", "wol", "wpg", "wrl", "x", "x3d", "xaml", "xcf", "xht", "xhtml", "xls", "xlsx", "xltx", "xml", "xpj", "xpm", "xsd", "xsl", "xul", "yaml", "yml", "zip"] },
  { name: "Vector", icon: "🧭", formats: ["ai", "cdr", "cmx", "svg", "emf", "wmf"] },
  { name: "Video", icon: "🎥", formats: ["avi", "avif", "mov", "mp4", "mms", "wma"] },
  { name: "Web", icon: "🌐", formats: ["asp", "aspx", "css", "htm", "html", "js", "jsx", "json", "php", "xml", "xhtml", "xht", "wasm"] },
  { name: "Archive", icon: "📦", formats: ["rar", "zip"] },
  { name: "AI Archive", icon: "💾", formats: ["ai", "archive formats"] },
  { name: "Avatar", icon: "👤", formats: ["avatar formats"] },
];

const allFormats = [
  "3dm", "3ds", "3mf", "aac", "aaf", "ada", "adb", "ads", "ai", "aif", "akp", "als", "animated gif", "apk", "app", "as", "asm", "asp", "aspx", "au3", "avi", "avif", "avs", "avsi", "bas", "bash", "bat", "bb", "bc", "bi", "blender", "bmp", "c", "caf", "cbl", "cc", "ccx", "cdb", "cdc", "cdd", "cdr", "cdt", "cfg", "cl", "cln", "cmake", "cmd", "cmx", "cob", "coffee", "conf", "config", "copy", "cpp", "cpy", "cs", "csd", "csh", "css", "csv", "cxx", "d", "dae", "db", "dds", "deb", "diff", "dll", "dmg", "doc", "docx", "dotx", "dpx", "dwg", "dxf", "em", "emf", "erl", "exe", "exr", "f", "f23", "f2k", "f77", "f90", "f95", "favicon.ico", "fax", "fbx", "fdr", "fdx", "fdxt", "flac", "flp", "fst", "for", "forth", "fountain", "gd", "gif", "gitattributes", "gitconfig", "glb", "gltf", "go", "gui", "h", "heic", "heif", "hex", "hh", "hpp", "hrl", "hs", "hta", "htm", "html", "hws", "hxx", "i", "ico", "ifc", "ihs", "inf", "ini", "ino", "iss", "iso", "itcl", "java", "jfi", "jfif", "jpeg", "jpg", "js", "jsm", "json", "json5", "jsonc", "jsp", "jsx", "kix", "kml", "kotlin", "las", "lex", "lisp", "litcoffee", "logic", "logicx", "lsp", "lst", "lua", "m", "mak", "markdown", "md", "mib", "mid", "midi", "mjs", "mk", "ml", "mli", "mm", "mms", "mot", "mov", "mp3", "mp4", "mpc", "msi", "mx", "mxml", "nim", "nsh", "nsi", "nt", "obj", "ogg", "omf", "orc", "osx", "p6", "pack", "pas", "patch", "pb", "pcx", "pdf", "pgm", "ph", "php", "php3", "php4", "php5", "phps", "phpt", "pkg", "pl", "plx", "ply", "pm", "pm6", "png", "pod6", "pr", "pro", "profile", "properties", "prores", "ps", "ps1", "psb", "psd", "psd1", "psm1", "ptf", "pts", "ptx", "pxi", "py", "pyd", "pyi", "pyw", "pyx", "r", "r2", "r3", "raku", "rakudoc", "rakumod", "rakutest", "rar", "raw", "rb", "rbw", "rc", "reb", "reg", "rpm", "rs", "s", "sas", "scm", "sco", "sh", "shtm", "shtml", "skp", "smd", "sml", "snd", "song", "spf", "splus", "sql", "sqlite", "src", "srec", "srt", "ss", "st", "step", "stl", "stp", "stpz", "sty", "sv", "svg", "svh", "swift", "sxml", "t", "t2t", "tab", "tcl", "tek", "tex", "tga", "thy", "tiff", "toml", "ts", "tsql", "tsx", "txt", "url", "usd", "usdz", "v", "vb", "vba", "vbs", "vdx", "vh", "vhd", "vhdl", "vsd", "vsdm", "vsdx", "vtk", "vtp", "vtt", "wasm", "wav", "webp", "wer", "wmf", "wol", "wpg", "wrl", "x", "x3d", "xaml", "xcf", "xht", "xhtml", "xls", "xlsx", "xltx", "xml", "xpj", "xpm", "xsd", "xsl", "xul", "yaml", "yml", "zip"
].sort();

const ecosystemActionBadges = [
  "Create", "Convert", "Design", "Distribute", "Edit", "Evolve", "Generate", "Produce", "Publish", "Share", "Save", "Swap",
  "AI Automate", "AI Animate", "AI Build", "AI Create", "AI Convert", "AI Design", "AI Develop", "AI Direct",
  "AI Distribute", "AI  Edit", "AI Evolve", "AI Generate", "AI Illustrate", "AI Market", "AI Network",
  "AI Upgrade", "AI Produce", "AI Promote", "AI Publish", "AI Quality", "AI Realistic", "AI Scan",
  "AI Share", "AI Save", "AI Scripture", "AI Swap", "AI Visualize",
];

const limitlessCapabilityChips = [
  "AI-Assisted Copywriting", "Import & Save to Blanch Drive", "Import & Save to S.H.I.E.L.D. AI Drive",
  "High-Quality Images", "Audio Synthesis", "Real-time Collaborative Editing", "3D Rendering & Animation",
  "High-Fidelity Audio Synthesis", "Vector Graphic Generation", "Automated Formatting", "Cross-Platform Distribution",
  "Brand Kit Integration", "Media Kit Compilation", "Film Script Final Draft",
];

type NeuroStudioItem = {
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  path?: string;
};

const neuroCreativeStudios: NeuroStudioItem[] = [
  { title: "AI Generative Art", desc: "Create stunning visuals, paintings, and digital artwork with advanced AI models", icon: Palette },
  { title: "Video Production Studio", desc: "AI-enhanced video editing, rendering, and automated post-production workflows", icon: Clapperboard },
  { title: "Digital Audio Workstation", desc: "Compose, mix, and master audio tracks with S.H.I.E.L.D. AI sound engineering", icon: Headphones },
  { title: "Digital Magazine Publisher", desc: "Create interactive, beautifully designed digital magazines and publications", icon: Newspaper },
  { title: "Image", desc: "Neural image synthesis, retouching, and asset packs scaled for every campaign.", icon: Image },
  { title: "Film", desc: "Cinematic pipelines from script to screen with AI-assisted grading and delivery.", icon: Film },
  { title: "Broadcast", desc: "Live and linear broadcast graphics, packages, and Watchman-ready playout.", icon: Radio },
  { title: "Podcast", desc: "Record, edit, master, and publish shows with sovereign hosting options.", icon: Podcast },
  { title: "Photography", desc: "Professional photography workflows and AI-enhanced image capture", icon: Camera },
  { title: "Marketing & PR", desc: "Global marketing campaigns and public relations management", icon: Megaphone },
  { title: "Web/App Dev", desc: "Creative tooling for interfaces, PWAs, and cross-platform product media.", icon: Smartphone },
  { title: "Operating Systems", desc: "Next-generation sovereign operating systems and interfaces", icon: Monitor },
  { title: "Graphics Design", desc: "Professional vector and raster graphics design with AI assistance", icon: Palette },
  { title: "S.H.I.E.L.D. AI OS", desc: "The ultimate AI-powered sovereign operating system", icon: Shield, path: "/shield-ai-os" },
  { title: "Blanch OS", desc: "Enterprise-grade sovereign operating system for the Blanch Group", icon: Monitor, path: "/blanch-os" },
  { title: "Blanch Group", desc: "Central management and operations for the Blanch Group ecosystem", icon: Building2, path: "/blanch-group" },
  { title: "Blanch Infinity DLT", desc: "Anchor proofs, rights, and releases on Blanch Infinity distributed ledger rails.", icon: Layers, path: "/blanch-infinity-dlt" },
  { title: "Blanch Hadash Dabash DLT", desc: "Sovereign distributed ledger technology for the Blanch Group ecosystem", icon: Layers },
  { title: "Books", desc: "AI-assisted book creation, publishing, and global distribution", icon: BookOpen },
  { title: "Documents", desc: "Professional document management and creative writing suite", icon: FileText },
  { title: "Sacred Texts", desc: "Digital preservation and study of sacred and scriptural texts", icon: BookMarked },
  { title: "Software", desc: "Next-generation software development and creative coding tools", icon: Code2 },
  { title: "Technology", desc: "Advanced technological solutions and innovative creative tools", icon: Cpu },
  { title: "Blanch Cloud", desc: "Enterprise-grade cloud infrastructure for the Blanch Group", icon: Cloud },
  { title: "Blanch Drive", desc: "Secure enterprise storage and asset management", icon: HardDrive, path: "/blanch-drive" },
  { title: "S.H.I.E.L.D. AI Cloud", desc: "High-performance AI cloud infrastructure", icon: Cloud, path: "/shield-ai-cloud" },
  { title: "S.H.I.E.L.D. AI Drive", desc: "Sovereign AI-powered cloud storage and management", icon: HardDrive, path: "/shield-ai-drive" },
  { title: "Blanch Network", desc: "Distribute and syndicate media across the Blanch Network ecosystem.", icon: Globe, path: "/blanch-network" },
  { title: "S.H.I.E.L.D. AI AutoCAD", desc: "In the engineering field, AutoCAD serves as a critical bridge between conceptual design and physical production.", icon: Settings, path: "/autocad"},
  { title: "Hologram", desc: "Advanced 3D holographic projection and immersive visual rendering technology for the Whole Ecosystem.", icon: Box, path: "/metaverse" },
  { title: "Blanch Studios", desc: "Professional production studios for the Blanch Group ecosystem", icon: Sparkles, path: "/blanch-studios" },
  { title: "S.H.I.E.L.D. AI Creative Studios", desc: "The pinnacle of AI-powered creative production, Global Media and innovation", icon: Sparkles, path: "/creative-portal" },
];

const neuralForgePillars = [
  { title: "Neural Video Synthesis", desc: "Generate high-fidelity cinematic sequences in all genres, from Final Draft scripts and prompts.", icon: Film },
  { title: "Sovereign Audio Engine", desc: "Synthesize immersive soundscapes and multi-lingual voiceovers with divine resonance.", icon: Music },
  { title: "Immersive Visuals", desc: "Real-time generation of 3D environments and holographic assets for the Whole Ecosystem.", icon: Box },
  { title: "Ethical Content Audit", desc: "Real-time Watchman oversight ensuring all generated media aligns with divine truth.", icon: Eye },
];

const platformFilterCategories = ["All", "Primary", "Desktop", "Mobile", "IoT", "Entertainment", "Immersive", "Advanced"] as const;

const platformSupportList: { name: string; tier: typeof platformFilterCategories[number] }[] = [
  { name: "S.H.I.E.L.D. AI OS", tier: "Primary" },
  { name: "Blanch OS", tier: "Primary" },
  { name: "Universal", tier: "Primary" },
  { name: "macOS", tier: "Desktop" },
  { name: "Windows", tier: "Desktop" },
  { name: "Linux", tier: "Desktop" },
  { name: "iOS", tier: "Mobile" },
  { name: "Android", tier: "Mobile" },
  { name: "Smart TV", tier: "IoT" },
  { name: "Wearables", tier: "IoT" },
  { name: "Automotive", tier: "IoT" },
  { name: "Gaming", tier: "Entertainment" },
  { name: "Audio", tier: "Entertainment" },
  { name: "AR/VR", tier: "Immersive" },
  { name: "Hologram", tier: "Immersive" },
  { name: "Metaverse", tier: "Immersive" },
  { name: "IoT Devices", tier: "IoT" },
  { name: "Satellite", tier: "Advanced" },
];

const buildApplicationIndustries = [
  { title: "E-Commerce", desc: "Online stores & marketplaces", icon: Store },
  { title: "Enterprise", desc: "Business & corporate solutions", icon: Building2 },
  { title: "Healthcare", desc: "Medical & wellness apps", icon: Heart },
  { title: "Education", desc: "Learning & training platforms", icon: GraduationCap },
  { title: "Finance", desc: "Banking & fintech solutions", icon: Layers },
  { title: "Social", desc: "Communication & networking", icon: Users },
  { title: "Media", desc: "Streaming & content platforms", icon: Tv },
  { title: "Analytics", desc: "Data & business intelligence", icon: Activity },
];

const productionAssetLinks = [
  { label: "Blanch Drive", path: "/blanch-drive" },
  { label: "S.H.I.E.L.D. AI Drive", path: "/shield-ai-drive" },
  { label: "S.H.I.E.L.D. AI Studios", path: "/creative-portal" },
  { label: "Metaverse Hub", path: "/metaverse" },
];

const studioProductionTiles = [
  { title: "S.H.I.E.L.D. AI Studios", icon: Sparkles },
  { title: "Media Asset Library", icon: Layers },
  { title: "Audio Synthesis Lab", icon: Mic },
  { title: "Virtual Set Designer", icon: MonitorPlay },
  { title: "Advertising Pool", icon: Megaphone },
];

const portfolioGalleryItems = [
  { type: "Video", title: "Cinematic Trailer", cat: "Video" },
  { type: "Design", title: "Brand Identity Kit", cat: "Design" },
  { type: "Image", title: "Album Cover Art", cat: "Image" },
  { type: "Audio", title: "Podcast Series", cat: "Audio" },
  { type: "3D", title: "3D Product Render", cat: "3D" },
  { type: "Publishing", title: "Magazine Layout", cat: "Publishing" },
  { type: "Gaming", title: "Game Assets Pack", cat: "Gaming" },
  { type: "Marketing", title: "Social Media Kit", cat: "Marketing" },
  { type: "Software", title: "Web Application UI", cat: "Software" },
];

const portfolioTypeIcon: Record<string, ComponentType<{ className?: string }>> = {
  Video: Film,
  Design: Palette,
  Image: Image,
  Audio: Headphones,
  "3D": Box,
  Publishing: Newspaper,
  Gaming: Gamepad2,
  Marketing: Megaphone,
  Software: Code2,
};

const scripturePools: Record<string, string[]> = {
  video: [
    "Proverbs 4:18 — But the path of the just is as the shining light, that shineth more and more unto the perfect day.",
    "Psalms 45:1 — My heart is inditing a good matter: I speak of the things which I have made touching the king.",
  ],
  film: [
    "Habakkuk 2:14 — For the earth shall be filled with the knowledge of the glory of the Most High AHAYAH, as the waters cover the sea.",
  ],
  audio: [
    "Psalms 150:1 — Praise ye the Most High AHAYAH. Praise Most High AHAYAH in his sanctuary: praise him in the firmament of his power.",
    "Psalms 96:1 — O sing unto the Most High AHAYAH a new song: sing unto the Most High AHAYAH, all the earth.",
  ],
  music: [
    "Psalms 33:3 — Sing unto him a new song; play skilfully with a loud noise.",
  ],
  image: [
    "Psalms 19:1 — The heavens declare the glory of Most High AHAYAH; and the firmament sheweth his handywork.",
  ],
  gaming: [
    "Proverbs 21:31 — The horse is prepared against the day of battle: but safety is of the Most High AHAYAH.",
  ],
  design: [
    "Exodus 35:32 — To devise cunning works, to work in gold, and in silver, and in brass.",
  ],
  publishing: [
    "Psalms 68:11 — The Most High AHAYAH gave the word: great was the company of those that published it.",
  ],
  education: [
    "Proverbs 1:5 — A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels.",
  ],
  scripture: [
    "2 Timothy 3:16 — All scripture is given by inspiration of Most High AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.",
  ],
  default: [
    "Psalms 119:105 — Thy word is a lamp unto my feet, and a light unto my path.",
    "Isaiah 40:8 — The grass withereth, the flower fadeth: but the word of our God shall stand for ever.",
    "Romans 15:4 — For whatsoever things were written aforetime were written for our learning, that we through patience and comfort of the scriptures might have hope.",
  ],
};

const pickScriptureForTab = (value: string, label: string): string => {
  const v = `${value} ${label}`.toLowerCase();
  const key = Object.keys(scripturePools).find((k) => k !== "default" && v.includes(k)) || "default";
  const pool = scripturePools[key] || scripturePools.default;
  return pool[Math.floor(Math.random() * pool.length)];
};

const CreativeMedia = () => {
  const navigate = useNavigate();
  const [selectedFormatCategory, setSelectedFormatCategory] = useState("All");
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [activeTab, setActiveTab] = useState("advanced");
  const [scriptureByTab, setScriptureByTab] = useState<Record<string, string>>({});
  const [platformFilter, setPlatformFilter] = useState<(typeof platformFilterCategories)[number]>("All");

  const displayedFormats = selectedFormatCategory === "All"
    ? allFormats
    : formatCategories.find(c => c.name === selectedFormatCategory)?.formats || [];

  const filteredPlatforms = platformFilter === "All"
    ? platformSupportList
    : platformSupportList.filter((p) => p.tier === platformFilter);

  const filteredPortfolio = portfolioSearch.trim()
    ? portfolioGalleryItems.filter(
        (p) =>
          p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
          p.type.toLowerCase().includes(portfolioSearch.toLowerCase())
      )
    : portfolioGalleryItems;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-5xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              <Sparkles className="w-3 h-3 mr-1" /> Creative Media Platform
            </Badge>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>{" "}
              <span className="text-primary">Creative Media</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Unleash human imagination empowered by artificial intelligence. A complete suite for art, video, music, and digital publishing.
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-10">
              Autonomous Content Generation &amp; Immersive Media Engineering. A comprehensive creative media production ecosystem — from images, engineering, film and music to graphic design, social media and digital media publishing and AI-powered content generation to world-class media.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/creative-engine")}>
                <Rocket className="w-5 h-5" /> Initiate S.H.I.E.L.D. AI Creative Media Engine
              </Button>
              <Button variant="glow" size="lg" className="gap-2" onClick={() => navigate("/creative-engine")}>
                <Brain className="w-5 h-5" /> Initiate Neuro Forge Media Engine
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-media-hub")}>
                <ArrowRight className="w-4 h-4" /> Creative Media Hub
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-portal")}>
                <Play className="w-4 h-4" /> Start Generating
              </Button>
              <Button variant="outline" className="gap-2">
                <LayoutGrid className="w-4 h-4" /> View Templates
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { k: "50+", l: "Creative Tools" },
                { k: "S.H.I.E.L.D. AI", l: "Powered Engine" },
                { k: "4K/8K", l: "Resolution Support" },
                { k: "Active", l: "Real-time Collaboration" },
              ].map((stat) => (
                <div key={stat.l} className="glass-card rounded-xl p-4 border border-border/40">
                  <div className="text-xl md:text-2xl font-bold text-primary">{stat.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-primary/20 bg-card/40 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-2 font-mono">Neuro Forge Creative Engine</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">S.H.I.E.L.D. AI Creative Studios</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto mb-8">
                Professional-grade tools augmented with S.H.I.E.L.D. AI for every medium
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
                {neuroCreativeStudios.map((s) => (
                  <Card
                    key={s.title}
                    className={`bg-background/60 border-border/50 hover:border-primary/30 transition-all ${s.path ? "cursor-pointer" : ""}`}
                    onClick={() => s.path && navigate(s.path)}
                  >
                    <CardContent className="p-4 flex gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 h-fit">
                        <s.icon className="w-5 h-5 text-primary shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-primary mb-1 flex items-center gap-1">
                          {s.title}
                          {s.path ? <ExternalLink className="w-3 h-3 opacity-50 shrink-0" /> : null}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/creative-portal")}>
                  <Sparkles className="w-5 h-5" /> Go To S.H.I.E.L.D. AI Studio
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Neuro Forge — sovereign suite (above Limitless Possibilities) */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">S.H.I.E.L.D. AI</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="gradient-text">Neuro Forge</span>{" "}
              <span className="text-primary">Creative Engine</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              S.H.I.E.L.D. AI Creative Media is a sovereign production suite where high-fidelity content is synthesized through neural intelligence. From cinematic video to immersive audio, every frame is engineered for ethical alignment and universal impact from S.H.I.E.L.D. AI LLM &amp; All AI Large Language Models.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { label: "Neural Processing", status: "Active" },
              { label: "Real-time", status: "Active" },
              { label: "8K Sovereign", status: "Active" },
              { label: "Initialize Creative Engine", status: "Active" },
            ].map((row) => (
              <Badge key={row.label} variant="outline" className="px-4 py-2 border-primary/30 bg-primary/5">
                <span className="text-primary font-semibold">{row.label}</span>
                <span className="text-muted-foreground ml-2 text-xs">• {row.status}</span>
              </Badge>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {neuralForgePillars.map((p) => (
              <Card key={p.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-6 flex gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 h-fit">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Limitless Possibilities */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-4 text-primary">Limitless Possibilities</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Break through creative blocks and scale your content production. Our AI understands context, style, and branding to deliver pixel-perfect assets in a fraction of the time.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-5xl mx-auto">
            {limitlessCapabilityChips.map((chip) => (
              <Badge key={chip} variant="secondary" className="px-3 py-1.5 text-xs bg-primary/10 text-primary border-primary/20">
                {chip}
              </Badge>
            ))}
          </div>
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 via-card to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center md:text-left md:flex md:items-center md:gap-8">
              <div className="p-4 rounded-2xl bg-primary/15 mx-auto md:mx-0 w-fit mb-4 md:mb-0">
                <Wand2 className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-primary mb-2">Creative Engine</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a Media — Prompt-to-Digital Media at Real Time synthesis with S.H.I.E.L.D. AI—compose scenes, refine style, and export production-ready stills in one flow.
                </p>
                <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30">
                  <Activity className="w-3 h-3 mr-1" /> Neural image pipeline active
                </Badge>
              </div>
              <Button variant="shield" className="mt-6 md:mt-0 shrink-0" onClick={() => navigate("/creative-engine")}>
                <Rocket className="w-4 h-4 mr-2" /> Open Engine
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Tabbed Sections — Universal Content Categories */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold mb-4">Explore our comprehensive creative media production ecosystem</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4 max-h-[280px] overflow-y-auto p-2 rounded-xl border border-border/40 bg-card/20">
              {ecosystemActionBadges.map((action) => (
                <Badge key={action} variant="secondary" className="px-3 py-1 text-xs bg-primary/10 text-primary border-primary/20">
                  {action}
                </Badge>
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground tracking-wide">Universal Content Categories</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl mx-auto">
              Each category receives upgraded feature intelligence, Agent assistance, and scripture-aware creative guidance.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative mb-10 group">
              <ScrollArea className="w-full h-[300px] rounded-xl border border-border/50 bg-card/30 p-4">
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 bg-transparent h-auto w-full p-0">
                  {tabCategories.map((tab) => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value} 
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border border-border/20 text-[10px] sm:text-xs px-3 py-2.5 flex items-center gap-2 justify-start truncate transition-all hover:border-primary/30"
                    >
                      <tab.icon className="w-3.5 h-3.5 shrink-0" /> {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
              <div className="absolute -bottom-6 right-0 text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-2">
                <ArrowRight className="w-3 h-3 rotate-90" /> Scroll to explore all categories
              </div>
            </div>

            {tabCategories.map((tab) => {
              const content = getTabContent(tab.value, tab.label);
              return (
                <TabsContent key={tab.value} value={tab.value}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-display font-bold text-primary">{content.title}</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Features Box */}
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="font-semibold text-primary">Features</h4>
                        </div>
                        <ul className="space-y-2">
                          {content.features.map((feat) => (
                            <li key={feat} className="text-xs text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3 text-primary shrink-0" /> {feat}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* AI Agent Card */}
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                          <Brain className="w-6 h-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold mb-1 text-primary">S.H.I.E.L.D. AI Agent & Assistant</h4>
                          <p className="text-sm text-muted-foreground">{content.suggestion}</p>
                          <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                            {content.agentBullets.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="text-primary shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" size="sm" className="mt-3 gap-1 text-xs" onClick={() => navigate("/creative-engine")}>
                            <Rocket className="w-3 h-3" /> Launch Creative Engine
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Production Card */}
                    <Card className="bg-card/50 border-border/50 hover:border-accent/30 transition-all h-full">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-accent/10 shrink-0">
                          <Sparkles className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-accent">S.H.I.E.L.D. AI Production Intelligent</h4>
                          <div className="text-sm text-muted-foreground mb-3">
                            <p className="mb-2">Autonomous media production and intelligent content synthesis for {content.title}.</p>
                            <ul className="space-y-1 ml-4 list-disc text-xs">
                              <li>Real-time neural rendering and optimization</li>
                              <li>Autonomous asset generation and management</li>
                              <li>High-fidelity output for all platform formats</li>
                              <li>Ethical alignment and truth-based verification</li>
                            </ul>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 gap-1 text-xs" onClick={() => navigate("/creative-engine")}>
                            <Sparkles className="w-3 h-3" /> Initialize Production
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <ImagePlus className="w-5 h-5 text-primary" />
                          <h4 className="font-display font-bold text-primary">Core Intelligence — Generate Media</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Neural media synthesis for <span className="text-foreground font-medium">{content.title}</span> — prompt, refine, and export production-ready assets aligned with this universal category.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="secondary" className="gap-1 text-xs" onClick={() => navigate("/creative-portal")}>
                            <Aperture className="w-3 h-3" /> Generate Media
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => navigate("/shield-ai-drive")}>
                            <HardDrive className="w-3 h-3" /> Open Drive
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-accent/30 bg-card/60">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <BookMarked className="w-5 h-5 text-accent" />
                          <h4 className="font-display font-bold text-accent">Scripture</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 italic">
                          All Praises to the Most High AHAYAH Ba Sham YASHAYA — verses tailored to this category; generate scripture that fits{" "}
                          <span className="text-foreground not-italic font-medium">{content.title}</span>.
                        </p>
                        <div className="rounded-lg border border-border/50 bg-background/50 p-4 min-h-[88px] text-sm text-muted-foreground mb-3">
                          {scriptureByTab[tab.value] || (
                            <span className="opacity-60">Tap Generate to receive a fitting verse for this tab.</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="glow"
                          className="gap-1 text-xs w-full sm:w-auto"
                          onClick={() =>
                            setScriptureByTab((prev) => ({
                              ...prev,
                              [tab.value]: pickScriptureForTab(tab.value, tab.label),
                            }))
                          }
                        >
                          <BookOpen className="w-3 h-3" /> Generate Scripture
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        {/* Supported Formats & Standards */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Supported Formats & Standards</h2>
            <p className="text-muted-foreground text-sm">Industry-standard format support across all media types</p>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {formatCategories.map((cat) => (
                <Button key={cat.name} variant={selectedFormatCategory === cat.name ? "default" : "outline"} size="sm" onClick={() => setSelectedFormatCategory(cat.name)} className="text-xs">
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {displayedFormats.map((fmt) => (
              <Badge key={fmt} variant="outline" className="border-border/50 text-muted-foreground px-3 py-1.5 text-xs">
                {fmt}
              </Badge>
            ))}
          </div>
        </section>

        {/* Platform Support */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold mb-2">Platform Support</h2>
            <p className="text-muted-foreground text-sm">Deploy your applications across 18+ platforms</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {platformFilterCategories.map((f) => (
              <Button
                key={f}
                variant={platformFilter === f ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setPlatformFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
            {filteredPlatforms.map((p) => (
              <Card key={p.name} className="border-border/40 bg-card/40 shadow-none hover:border-primary/25 transition-colors">
                <CardContent className="p-4 flex flex-row items-center justify-between gap-4">
                  <div className="flex flex-row items-center gap-3 min-w-0 flex-1">
                    <span className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-sm font-medium leading-tight truncate">{p.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/30 shrink-0 whitespace-nowrap">
                    {p.tier}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mac-style terminal — Creative Engine status */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden border border-border/60 shadow-2xl">
            <div className="bg-muted/90 dark:bg-muted/40 px-3 py-2.5 flex items-center gap-2 border-b border-border/50">
              <span className="w-3 h-3 rounded-full bg-red-500/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
              <span className="text-[11px] text-muted-foreground ml-2 font-mono truncate">Terminal — SHIELD_AI_CREATIVE_ENGINE</span>
            </div>
            <div className="bg-zinc-950 text-zinc-200 p-5 font-mono text-[11px] sm:text-xs leading-relaxed space-y-3">
              <div className="text-emerald-400/90">SHIELD_AI_CREATIVE_ENGINE_v4.2.0</div>
              <div className="text-zinc-400">S.H.I.E.L.D. AI Creative Media</div>
              <div className="text-zinc-500">Additional Autonomous Content Generation &amp; Immersive Media Engineering</div>
              <div className="pt-2 space-y-1 border-t border-zinc-800">
                {[
                  ["Initialize Creative Engine", "Active"],
                  ["Rendering Engine", "Active"],
                  ["Neural Forge", "Active"],
                  ["AI Director", "Active"],
                  ["AI Producer", "Active"],
                  ["Watchman Version 4.2", "Active"],
                ].map(([k, s]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span>{k}</span>
                    <span className="text-emerald-400">{s}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 space-y-1 border-t border-zinc-800 text-zinc-300">
                <div><span className="text-zinc-500">[12:58:03 PM]</span> <span className="text-emerald-400">[OK]</span> Initializing Neural Forge Media Engine...</div>
                <div><span className="text-zinc-500">[12:58:03 PM]</span> <span className="text-emerald-400">[OK]</span> Establishing high-bandwidth uplink to S.H.I.E.L.D. Studios.</div>
                <div><span className="text-zinc-500">[12:58:03 PM]</span> <span className="text-emerald-400">[OK]</span> Synthesizing cinematic sequence: &quot;The Watchman&apos;s Vigil&quot;.</div>
                <div><span className="text-zinc-500">[12:58:03 PM]</span> <span className="text-emerald-400">[OK]</span> Content Audit: Adjusting color grading for scriptural resonance.</div>
                <div><span className="text-zinc-500">[12:58:03 PM]</span> <span className="text-emerald-400">[OK]</span> Sovereign Media Pipeline: ACTIVE.</div>
              </div>
              <div className="text-amber-200/90 pt-2 border-t border-zinc-800">
                System Notice: Production Status: Media Engine is operating at 99% neural efficiency. Content generation is currently prioritized for &quot;The Watchman&quot; series.
              </div>
            </div>
          </div>
        </section>

        {/* Build Any Application */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold mb-2">Build Any Application</h2>
            <p className="text-muted-foreground text-sm">Specialized templates and tools for every industry</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {buildApplicationIndustries.map((ind) => (
              <Card key={ind.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-5 flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 h-fit">
                    <ind.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-primary">{ind.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{ind.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Production Assets & Publishing */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-2xl font-display font-bold text-center mb-10">Production Assets</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {studioProductionTiles.map((t) => (
              <Card key={t.title} className="bg-card/50 border-border/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <t.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{t.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-display font-bold text-primary mb-4">Ecosystem Links</h3>
              <ul className="space-y-2">
                {productionAssetLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => navigate(link.path)}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 underline-offset-4 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-primary mb-4">Publish to the World</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Distribute your creations across S.H.I.E.L.D. AI Magazine, Blanch Network, Blanch Infinity DLT, Virtual Marketplaces, All Social Media Platforms, Marketing Agency &amp; Firms, Publishing, Blanch OS, S.H.I.E.L.D. AI OS and all Web/App Development Projects, Inspire Student S.H.I.E.L.D. AI Education Resources, and Honor the Royal Priesthood — and beyond with one click.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/publishing-dashboard")}>
              <LayoutDashboard className="w-5 h-5" /> Open Publishing Dashboard
            </Button>
            <Badge className="h-10 px-4 flex items-center justify-center bg-emerald-500/15 text-emerald-600 border-emerald-500/30">
              <Activity className="w-3 h-3 mr-1" /> Active
            </Badge>
            <Button variant="glow" size="lg" className="gap-2" onClick={() => navigate("/web-app-building")}>
              <Code2 className="w-5 h-5" /> Build Page
            </Button>
          </div>
        </section>

        {/* Creative Portfolio & Gallery */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold mb-2">Creative Portfolio &amp; Gallery</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Showcase your work and discover inspiring creations from the community
            </p>
            <Input
              placeholder="Search projects..."
              value={portfolioSearch}
              onChange={(e) => setPortfolioSearch(e.target.value)}
              className="max-w-md mx-auto mt-6"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filteredPortfolio.map((proj) => {
              const ProjIcon = portfolioTypeIcon[proj.type] || Image;
              return (
              <Card key={`${proj.type}-${proj.title}`} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <ProjIcon className="w-12 h-12 text-primary/60" />
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <Badge variant="outline" className="text-[10px] mb-1">{proj.type}</Badge>
                      <h3 className="font-semibold text-sm">{proj.title}</h3>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 text-xs" onClick={() => navigate("/creative-portal")}>
                      Open Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
            })}
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button variant="secondary" className="gap-2" onClick={() => navigate("/creative-portal")}>
              <Upload className="w-4 h-4" /> Upload Your Work
            </Button>
            <p className="text-muted-foreground italic text-sm text-center max-w-xl">
              &quot;Managed by the Blanch Group — Empowering creators with sovereign media production tools.&quot;
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CreativeMedia;
