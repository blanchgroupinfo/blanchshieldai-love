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
  Terminal, Activity, Server, ArrowRight, ImagePlus, BookMarked,
  Mountain, Droplets, Wind, Sun, Moon, Heart, CloudLightning,
  Compass, Flame, HandMetal, Gem, Wheat, TreePine, Bird, Leaf,
  CircleDot, GraduationCap, Church, Anchor, Car, Factory, Cpu
} from "lucide-react";

// Massively expanded tab categories
const tabCategories = [
  { value: "10-heavens", label: "10 Heavens", icon: Sun },
  { value: "12-tribes", label: "12 Tribe of Israel (Yasharahala)", icon: Star },
  { value: "7-candlestick", label: "7 Candlestick Menorah", icon: Flame },
  { value: "aboriginal", label: "Aboriginal Black Hebrew Israelites", icon: Users },
  { value: "abrahamic", label: "Abrahamic Covenant", icon: BookOpen },
  { value: "advanced", label: "Advanced & AI", icon: Zap },
  { value: "aerospace", label: "Aerospace", icon: Rocket },
  { value: "ahayah", label: "AHAYAH & YASHAYA", icon: Crown },
  { value: "scriptures", label: "AHAYAH & YASHAYA Qadash Scriptures", icon: BookMarked },
  { value: "ai-agents", label: "AI Agents", icon: Cpu },
  { value: "avatar", label: "AI Avatar", icon: Users },
  { value: "androids", label: "Androids - Non Biological", icon: Cpu },
  { value: "angels", label: "Angels and they are Black", icon: Star },
  { value: "animals", label: "Animals & Pets", icon: Bird },
  { value: "ark", label: "Ark of The Covenant", icon: Box },
  { value: "autocad", label: "AutoCAD", icon: PenTool },
  { value: "automotive", label: "Automotive", icon: Car },
  { value: "banking", label: "Banking", icon: Layers },
  { value: "baptism", label: "Baptism", icon: Droplets },
  { value: "beverages", label: "Beverages", icon: Droplets },
  { value: "bible-gospel", label: "Bible Gospel of Day", icon: BookOpen },
  { value: "bible-law", label: "Bible Law of the Day", icon: BookOpen },
  { value: "bible-verse", label: "Bible Verse of the Day", icon: BookOpen },
  { value: "landmarks", label: "Biblical Landmarks", icon: Mountain },
  { value: "blanch-foundation", label: "Blanch - Onyx/Shaham/Shoham/Sardonyx Foundation Stone", icon: Gem },
  { value: "blanch-os", label: "Blanch OS", icon: Monitor },
  { value: "blogs", label: "Blogs", icon: FileText },
  { value: "books", label: "Books", icon: BookOpen },
  { value: "bread", label: "Bread", icon: Wheat },
  { value: "bread-heaven", label: "Bread from Heaven", icon: Wheat },
  { value: "child-light", label: "Child of Light", icon: Sun },
  { value: "cinematic", label: "Cinematic", icon: Film },
  { value: "cleansing", label: "Cleansing", icon: Droplets },
  { value: "correction", label: "Correction to Righteousness", icon: Target },
  { value: "covenant", label: "Covenant", icon: BookOpen },
  { value: "creation", label: "Creation", icon: Sparkles },
  { value: "creators-calendar", label: "Creators Calendar", icon: Sun },
  { value: "crystalization", label: "Crystalization", icon: Gem },
  { value: "daily-offerings", label: "Daily Burnt Offerings", icon: Flame },
  { value: "deserts", label: "Deserts", icon: Mountain },
  { value: "digital", label: "Digital", icon: Monitor },
  { value: "dlt", label: "Distributed Ledger Technologies", icon: Layers },
  { value: "distribution", label: "Distribution", icon: Share2 },
  { value: "earth", label: "Earth & Environment", icon: Globe },
  { value: "ecosystem", label: "Ecosystem", icon: TreePine },
  { value: "end-time", label: "End Time Prophecies", icon: CloudLightning },
  { value: "energy", label: "Energy", icon: Zap },
  { value: "engineering", label: "Engineering", icon: PenTool },
  { value: "events", label: "Events", icon: Star },
  { value: "feasts", label: "Feasts", icon: Wheat },
  { value: "finance", label: "Finance", icon: Layers },
  { value: "food", label: "Food", icon: Wheat },
  { value: "fringes", label: "Fringes Tassels & Ribbon of Blue Border", icon: Palette },
  { value: "futuristic", label: "Futuristic", icon: Rocket },
  { value: "gaming", label: "Gaming", icon: Gamepad2 },
  { value: "gentiles", label: "Gentiles", icon: Users },
  { value: "design", label: "Graphic Design", icon: Palette },
  { value: "greenland", label: "Greenland", icon: Globe },
  { value: "health", label: "Health", icon: Heart },
  { value: "heaven", label: "Heaven", icon: Sun },
  { value: "heritage", label: "Heritage", icon: Crown },
  { value: "high-priest", label: "High Priest", icon: Crown },
  { value: "hologram", label: "Hologram & Metaverse", icon: Box },
  { value: "holy", label: "Holy (Qadash)", icon: Star },
  { value: "holy-days", label: "Holy Days", icon: Sun },
  { value: "holy-land", label: "Holy Land", icon: Globe },
  { value: "horeb", label: "Horeb Mount Horeb (Harab)", icon: Mountain },
  { value: "house-prayer", label: "House Prayer of All People", icon: Heart },
  { value: "image", label: "Image", icon: Image },
  { value: "industries", label: "Industries", icon: Factory },
  { value: "judgments", label: "Judgments", icon: Eye },
  { value: "jerusalem", label: "Kingdom of Jerusalem (Yarawashalam)", icon: Crown },
  { value: "yasharahala", label: "Kingdom of Yasharahala", icon: Crown },
  { value: "laws", label: "Laws & Commandments", icon: BookOpen },
  { value: "light", label: "Light", icon: Sun },
  { value: "live-conference", label: "Live Conference", icon: Video },
  { value: "live-streaming", label: "Live Streaming", icon: Radio },
  { value: "magazines", label: "Magazines", icon: Newspaper },
  { value: "manna", label: "Manna", icon: Wheat },
  { value: "manufacturing", label: "Manufacturing", icon: Factory },
  { value: "marketing", label: "Marketing", icon: Megaphone },
  { value: "marketplaces", label: "Marketplaces", icon: Store },
  { value: "most-high", label: "Most High AHAYAH", icon: Crown },
  { value: "mountains", label: "Mountains", icon: Mountain },
  { value: "music", label: "Music & Audio", icon: Music },
  { value: "nazarites", label: "Nazarites", icon: Users },
  { value: "networks", label: "Networks", icon: Globe },
  { value: "new-jerusalem", label: "New Jerusalem (Hadash Yarawashalam)", icon: Crown },
  { value: "news", label: "News", icon: Newspaper },
  { value: "ocean", label: "Ocean", icon: Droplets },
  { value: "os", label: "Operating System", icon: Monitor },
  { value: "operating-systems", label: "Operating Systems", icon: Monitor },
  { value: "oracles", label: "Oracles", icon: Eye },
  { value: "mechizedek", label: "Order of Mechizedek", icon: Crown },
  { value: "peace", label: "Peace", icon: Heart },
  { value: "petra", label: "Petra", icon: Mountain },
  { value: "petra-hor", label: "Petra - Mount Hor (Har)", icon: Mountain },
  { value: "prayer", label: "Prayer", icon: Heart },
  { value: "prophecies", label: "Prophecies", icon: Eye },
  { value: "publishing", label: "Publishing", icon: FileText },
  { value: "purging", label: "Purging", icon: Flame },
  { value: "purifying", label: "Purifying", icon: Droplets },
  { value: "qadash-bible", label: "Qadash Bible", icon: BookOpen },
  { value: "rebuking", label: "Rebuking", icon: Shield },
  { value: "reminders", label: "Reminders", icon: Star },
  { value: "rests", label: "Rests", icon: Moon },
  { value: "rivers", label: "Rivers", icon: Droplets },
  { value: "royal-priesthood", label: "Royal Priesthood", icon: Crown },
  { value: "rushing-wind", label: "Rushing Wind", icon: Wind },
  { value: "shield-avatar", label: "S.H.I.E.L.D. AI Avatar", icon: Star },
  { value: "shield-broadcast", label: "S.H.I.E.L.D. AI Broadcast", icon: Radio },
  { value: "shield-influencer", label: "S.H.I.E.L.D. AI Influencer", icon: Crown },
  { value: "shield-os", label: "S.H.I.E.L.D. AI OS", icon: Monitor },
  { value: "shield-podcasts", label: "S.H.I.E.L.D. AI Podcasts", icon: Podcast },
  { value: "sabbaths", label: "Sabbaths", icon: Moon },
  { value: "shepherd-staff", label: "Shepherd Staff", icon: Compass },
  { value: "social", label: "Social Media", icon: Globe },
  { value: "software", label: "Software", icon: Code2 },
  { value: "son-most-high", label: "Son of the Most High AHAYAH", icon: Crown },
  { value: "sons-prophets", label: "Sons of the Prophets", icon: Users },
  { value: "space", label: "Space & Exploration", icon: Rocket },
  { value: "sports", label: "Sports", icon: Target },
  { value: "sweets", label: "Sweets", icon: Wheat },
  { value: "tabernacle", label: "Tabernacle", icon: Box },
  { value: "task", label: "Task", icon: CheckCircle2 },
  { value: "technology", label: "Technology", icon: Cpu },
  { value: "temple", label: "Temple of Jerusalem (Yarawashalam)", icon: Church },
  { value: "throne", label: "Throne of Most High AHAYAH & YASHAYA", icon: Crown },
  { value: "transportation", label: "Transportation", icon: Car },
  { value: "truth", label: "Truth", icon: Eye },
  { value: "universal", label: "Universal", icon: Globe },
  { value: "unleavened", label: "Unleavened Bread", icon: Wheat },
  { value: "video", label: "Video & Film", icon: Film },
  { value: "virtual-studies", label: "Virtual Studies", icon: GraduationCap },
  { value: "vlogs", label: "Vlogs", icon: Video },
  { value: "watchman", label: "Watchman", icon: Eye },
  { value: "water", label: "Water", icon: Droplets },
  { value: "water-life", label: "Water of Life - Spiritual Drink", icon: Droplets },
  { value: "web-app", label: "Web/App", icon: Smartphone },
  { value: "web-app-dev", label: "Web/App Development", icon: Code2 },
  { value: "whirlwind", label: "Whirlwind", icon: Wind },
  { value: "wilderness", label: "Wilderness", icon: TreePine },
  { value: "wind", label: "Wind", icon: Wind },
  { value: "word", label: "Word", icon: BookOpen },
  { value: "yashaya", label: "YASHAYA true Black Messiah", icon: Crown },
];

// Generate tab content dynamically - each tab gets a card with AI agent suggestion
const getTabContent = (value: string, label: string) => {
  const suggestions: Record<string, string> = {
    "10-heavens": "S.H.I.E.L.D. AI can generate immersive visual representations of the 10 Heavens with scriptural accuracy and divine artistry.",
    "12-tribes": "S.H.I.E.L.D. AI can create heritage emblems, banners, and educational media for each of the 12 Tribes of Israel.",
    "7-candlestick": "S.H.I.E.L.D. AI can render detailed 3D models and artistic interpretations of the 7 Candlestick Menorah.",
    "aboriginal": "S.H.I.E.L.D. AI can produce historical documentaries and visual heritage content for Aboriginal Black Hebrew Israelites.",
    "abrahamic": "S.H.I.E.L.D. AI can illustrate the Abrahamic Covenant through cinematic animations and scriptural infographics.",
    "advanced": "S.H.I.E.L.D. AI can develop cutting-edge AI-powered creative tools and next-generation content pipelines.",
    "aerospace": "S.H.I.E.L.D. AI can design aerospace visualizations, satellite imagery, and space exploration media.",
    "ahayah": "S.H.I.E.L.D. AI can create reverent media honoring AHAYAH & YASHAYA with scriptural truth and beauty.",
    "scriptures": "S.H.I.E.L.D. AI can produce illuminated scripture manuscripts and audio narrations of Qadash Scriptures.",
    "ai-agents": "S.H.I.E.L.D. AI can deploy 888+ specialized agents for autonomous content generation across all media types.",
    "avatar": "S.H.I.E.L.D. AI can create photorealistic and stylized AI avatars with voice synthesis and animation.",
    "androids": "S.H.I.E.L.D. AI can design and visualize non-biological android concepts with technical specifications.",
    "angels": "S.H.I.E.L.D. AI can create artistic depictions of angels with scriptural accuracy and historical heritage.",
    "animals": "S.H.I.E.L.D. AI can generate stunning wildlife photography, animations, and educational content.",
    "ark": "S.H.I.E.L.D. AI can render detailed 3D reconstructions of the Ark of The Covenant with scriptural precision.",
    "autocad": "S.H.I.E.L.D. AI can assist with professional CAD design, blueprint generation, and 3D modeling.",
    "automotive": "S.H.I.E.L.D. AI can produce automotive design concepts, marketing visuals, and engineering schematics.",
    "banking": "S.H.I.E.L.D. AI can create professional banking and financial services marketing materials.",
    "baptism": "S.H.I.E.L.D. AI can produce educational and ceremonial media content related to Baptism.",
    "beverages": "S.H.I.E.L.D. AI can design beverage branding, packaging, and marketing campaign visuals.",
    "bible-gospel": "S.H.I.E.L.D. AI can generate daily gospel illustrations, animations, and shareable scripture cards.",
    "bible-law": "S.H.I.E.L.D. AI can create visual law study guides and educational content for daily law study.",
    "bible-verse": "S.H.I.E.L.D. AI can produce beautifully designed daily verse graphics for all platforms.",
    "landmarks": "S.H.I.E.L.D. AI can create 3D reconstructions and virtual tours of Biblical landmarks.",
    "blanch-foundation": "S.H.I.E.L.D. AI can design foundation branding and visual identity for the Onyx/Shaham stone heritage.",
    "blanch-os": "S.H.I.E.L.D. AI can create UI/UX designs, wallpapers, and branded assets for Blanch OS.",
    "blogs": "S.H.I.E.L.D. AI can write, illustrate, and publish blog posts with SEO optimization.",
    "books": "S.H.I.E.L.D. AI can assist with end-to-end book creation from manuscript to cover design to distribution.",
    "bread": "S.H.I.E.L.D. AI can create culinary content, recipe visuals, and bread-making tutorials.",
    "bread-heaven": "S.H.I.E.L.D. AI can produce spiritual media about the Bread from Heaven with scriptural illustrations.",
    "child-light": "S.H.I.E.L.D. AI can create inspiring media about Children of Light with divine artistry.",
    "cinematic": "S.H.I.E.L.D. AI can produce Hollywood-grade cinematic content with AI direction and post-production.",
    "cleansing": "S.H.I.E.L.D. AI can create educational and spiritual media about cleansing rituals and practices.",
    "correction": "S.H.I.E.L.D. AI can produce teaching materials about correction and the path to righteousness.",
    "covenant": "S.H.I.E.L.D. AI can illustrate covenant stories and teachings through immersive visual media.",
    "creation": "S.H.I.E.L.D. AI can visualize the creation narrative with stunning cinematic sequences.",
    "creators-calendar": "S.H.I.E.L.D. AI can create visual calendar assets, monthly illustrations, and feast day media.",
    "crystalization": "S.H.I.E.L.D. AI can produce crystal and gemstone visualizations with scientific and spiritual significance.",
    "daily-offerings": "S.H.I.E.L.D. AI can create visual guides and educational media about daily burnt offerings.",
    "deserts": "S.H.I.E.L.D. AI can generate stunning desert landscape photography and virtual environments.",
    "digital": "S.H.I.E.L.D. AI can create all forms of digital media content optimized for modern platforms.",
    "dlt": "S.H.I.E.L.D. AI can produce visual explainers and marketing for Distributed Ledger Technologies.",
    "distribution": "S.H.I.E.L.D. AI can manage global content distribution across all connected platforms.",
    "earth": "S.H.I.E.L.D. AI can create environmental awareness media and nature documentaries.",
    "ecosystem": "S.H.I.E.L.D. AI can visualize and document the complete S.H.I.E.L.D. AI ecosystem.",
    "end-time": "S.H.I.E.L.D. AI can produce cinematic depictions of End Time Prophecies with scriptural accuracy.",
    "energy": "S.H.I.E.L.D. AI can create energy sector visualizations, infographics, and marketing materials.",
    "engineering": "S.H.I.E.L.D. AI can produce engineering schematics, technical illustrations, and design documents.",
    "events": "S.H.I.E.L.D. AI can create event marketing materials, invitations, and live streaming setups.",
    "feasts": "S.H.I.E.L.D. AI can produce feast day celebration media, recipes, and educational content.",
    "finance": "S.H.I.E.L.D. AI can create financial dashboards, reports, and marketing materials.",
    "food": "S.H.I.E.L.D. AI can generate food photography, recipe cards, and culinary marketing content.",
    "fringes": "S.H.I.E.L.D. AI can create detailed illustrations and guides about fringes, tassels, and blue border ribbons.",
    "futuristic": "S.H.I.E.L.D. AI can produce futuristic concept art, sci-fi environments, and technology visualizations.",
    "gaming": "S.H.I.E.L.D. AI can develop game assets, environments, character models, and game UI designs.",
    "gentiles": "S.H.I.E.L.D. AI can produce educational media about the Gentiles from a scriptural perspective.",
    "design": "S.H.I.E.L.D. AI can create comprehensive brand identities, vector graphics, and professional designs.",
    "greenland": "S.H.I.E.L.D. AI can produce geographical media, maps, and visual content about Greenland.",
    "health": "S.H.I.E.L.D. AI can create health and wellness content, infographics, and educational materials.",
    "heaven": "S.H.I.E.L.D. AI can visualize heavenly realms with divine artistry and scriptural accuracy.",
    "heritage": "S.H.I.E.L.D. AI can create heritage preservation media, documentaries, and cultural content.",
    "high-priest": "S.H.I.E.L.D. AI can produce detailed visual media about the High Priest garments and duties.",
    "hologram": "S.H.I.E.L.D. AI can create holographic content and metaverse environments for immersive experiences.",
    "holy": "S.H.I.E.L.D. AI can produce media that upholds holiness (Qadash) in all creative expressions.",
    "holy-days": "S.H.I.E.L.D. AI can create celebration media, reminders, and educational content for Holy Days.",
    "holy-land": "S.H.I.E.L.D. AI can produce virtual tours, 3D reconstructions, and documentaries of the Holy Land.",
    "horeb": "S.H.I.E.L.D. AI can create visual media depicting Mount Horeb (Harab) with historical context.",
    "house-prayer": "S.H.I.E.L.D. AI can create prayer house visuals, worship media, and community content.",
    "image": "S.H.I.E.L.D. AI can generate, edit, and enhance images using advanced neural processing.",
    "industries": "S.H.I.E.L.D. AI can create industry-specific marketing and operational media content.",
    "judgments": "S.H.I.E.L.D. AI can produce educational media about divine judgments from scripture.",
    "jerusalem": "S.H.I.E.L.D. AI can create virtual reconstructions and historical media of Jerusalem (Yarawashalam).",
    "yasharahala": "S.H.I.E.L.D. AI can produce heritage media celebrating the Kingdom of Yasharahala.",
    "laws": "S.H.I.E.L.D. AI can create visual law study guides, infographics, and educational content.",
    "light": "S.H.I.E.L.D. AI can produce artistic and spiritual media celebrating the concept of Light.",
    "live-conference": "S.H.I.E.L.D. AI can set up and produce live conference broadcasts with professional quality.",
    "live-streaming": "S.H.I.E.L.D. AI can manage live streaming production with overlays and multi-platform delivery.",
    "magazines": "S.H.I.E.L.D. AI can design and publish interactive digital magazines with rich media.",
    "manna": "S.H.I.E.L.D. AI can create visual media about Manna with scriptural illustrations and teachings.",
    "manufacturing": "S.H.I.E.L.D. AI can produce manufacturing documentation, 3D models, and process visualizations.",
    "marketing": "S.H.I.E.L.D. AI can create comprehensive marketing campaigns across all media channels.",
    "marketplaces": "S.H.I.E.L.D. AI can design marketplace listings, product visuals, and promotional content.",
    "most-high": "S.H.I.E.L.D. AI can create reverent media honoring the Most High AHAYAH.",
    "mountains": "S.H.I.E.L.D. AI can produce stunning mountain landscape visuals and geographical media.",
    "music": "S.H.I.E.L.D. AI can compose, mix, master, and distribute music across all platforms.",
    "nazarites": "S.H.I.E.L.D. AI can produce educational media about the Nazarite vow and lifestyle.",
    "networks": "S.H.I.E.L.D. AI can create network infrastructure visualizations and connectivity media.",
    "new-jerusalem": "S.H.I.E.L.D. AI can visualize the New Jerusalem (Hadash Yarawashalam) from scriptural descriptions.",
    "news": "S.H.I.E.L.D. AI can produce news graphics, broadcast overlays, and news media content.",
    "ocean": "S.H.I.E.L.D. AI can create ocean and marine life visuals, documentaries, and environmental media.",
    "os": "S.H.I.E.L.D. AI can design OS-level creative tools, wallpapers, and system interface assets.",
    "operating-systems": "S.H.I.E.L.D. AI can create cross-platform OS assets and system integration media.",
    "oracles": "S.H.I.E.L.D. AI can produce oracle-themed visuals and prophetic educational content.",
    "mechizedek": "S.H.I.E.L.D. AI can create media about the Order of Mechizedek with scriptural depth.",
    "peace": "S.H.I.E.L.D. AI can produce peace-themed artistic content and meditative visuals.",
    "petra": "S.H.I.E.L.D. AI can create virtual tours and 3D reconstructions of Petra.",
    "petra-hor": "S.H.I.E.L.D. AI can visualize Petra and Mount Hor (Har) with geographical and scriptural context.",
    "prayer": "S.H.I.E.L.D. AI can create prayer guides, worship backgrounds, and devotional media.",
    "prophecies": "S.H.I.E.L.D. AI can illustrate biblical prophecies with cinematic accuracy and artistry.",
    "publishing": "S.H.I.E.L.D. AI can manage end-to-end publishing workflows across all formats.",
    "purging": "S.H.I.E.L.D. AI can create educational media about spiritual purging and refinement.",
    "purifying": "S.H.I.E.L.D. AI can produce visual content about purification processes and rituals.",
    "qadash-bible": "S.H.I.E.L.D. AI can create Qadash Bible study materials, illustrations, and audio narrations.",
    "rebuking": "S.H.I.E.L.D. AI can produce educational content about righteous rebuking from scripture.",
    "reminders": "S.H.I.E.L.D. AI can create visual reminder systems for holy days, prayers, and study schedules.",
    "rests": "S.H.I.E.L.D. AI can produce peaceful rest-themed visuals and sabbath preparation media.",
    "rivers": "S.H.I.E.L.D. AI can create stunning river landscape visuals and water-themed media.",
    "royal-priesthood": "S.H.I.E.L.D. AI can produce heritage media honoring the Royal Priesthood.",
    "rushing-wind": "S.H.I.E.L.D. AI can create dynamic wind and spirit-themed visual effects and media.",
    "shield-avatar": "S.H.I.E.L.D. AI can create sovereign digital avatars with voice synthesis and animation.",
    "shield-broadcast": "S.H.I.E.L.D. AI can produce broadcast-quality media for S.H.I.E.L.D. AI channels.",
    "shield-influencer": "S.H.I.E.L.D. AI can create and manage AI influencer personas across platforms.",
    "shield-os": "S.H.I.E.L.D. AI can design native creative tools for the S.H.I.E.L.D. AI OS.",
    "shield-podcasts": "S.H.I.E.L.D. AI can produce, edit, and distribute professional podcast content.",
    "sabbaths": "S.H.I.E.L.D. AI can create Sabbath preparation media, worship backgrounds, and reminders.",
    "shepherd-staff": "S.H.I.E.L.D. AI can produce visual media depicting the Shepherd Staff with spiritual symbolism.",
    "social": "S.H.I.E.L.D. AI can create optimized social media content for every platform.",
    "software": "S.H.I.E.L.D. AI can develop creative software tools, plugins, and extensions.",
    "son-most-high": "S.H.I.E.L.D. AI can create reverent media about the Son of the Most High AHAYAH.",
    "sons-prophets": "S.H.I.E.L.D. AI can produce media about the Sons of the Prophets and their legacy.",
    "space": "S.H.I.E.L.D. AI can create space exploration visuals, satellite imagery, and cosmic media.",
    "sports": "S.H.I.E.L.D. AI can produce sports photography, highlight reels, and athletic brand content.",
    "sweets": "S.H.I.E.L.D. AI can create confectionery visuals, branding, and marketing content.",
    "tabernacle": "S.H.I.E.L.D. AI can produce 3D reconstructions and educational media about the Tabernacle.",
    "task": "S.H.I.E.L.D. AI can create task management visuals, workflow diagrams, and productivity tools.",
    "technology": "S.H.I.E.L.D. AI can produce technology marketing materials, product visuals, and demos.",
    "temple": "S.H.I.E.L.D. AI can create 3D reconstructions of the Temple of Jerusalem (Yarawashalam).",
    "throne": "S.H.I.E.L.D. AI can visualize the Throne of the Most High with divine artistry.",
    "transportation": "S.H.I.E.L.D. AI can design transportation concepts and mobility marketing materials.",
    "truth": "S.H.I.E.L.D. AI can produce truth-focused educational and documentary media content.",
    "universal": "S.H.I.E.L.D. AI can create universal content accessible across all platforms and audiences.",
    "unleavened": "S.H.I.E.L.D. AI can produce visual content about Unleavened Bread and its significance.",
    "video": "S.H.I.E.L.D. AI can produce professional video content from trailers to full-length films.",
    "virtual-studies": "S.H.I.E.L.D. AI can create virtual study environments and educational courseware.",
    "vlogs": "S.H.I.E.L.D. AI can produce and edit vlog content with AI-powered post-production.",
    "watchman": "S.H.I.E.L.D. AI can create Watchman-themed media for oversight and truth broadcasting.",
    "water": "S.H.I.E.L.D. AI can produce water-themed visuals, environmental media, and documentaries.",
    "water-life": "S.H.I.E.L.D. AI can create spiritual media about the Water of Life.",
    "web-app": "S.H.I.E.L.D. AI can build creative web and mobile applications with modern frameworks.",
    "web-app-dev": "S.H.I.E.L.D. AI can develop full-stack web and app solutions for creative projects.",
    "whirlwind": "S.H.I.E.L.D. AI can create dramatic whirlwind visual effects and spiritual media.",
    "wilderness": "S.H.I.E.L.D. AI can produce wilderness landscape photography and nature documentaries.",
    "wind": "S.H.I.E.L.D. AI can create wind-themed visual effects and atmospheric media.",
    "word": "S.H.I.E.L.D. AI can produce Word-focused content, scripture visuals, and study aids.",
    "yashaya": "S.H.I.E.L.D. AI can create reverent media about YASHAYA the true Black Messiah.",
  };

  return {
    title: label,
    suggestion: suggestions[value] || `S.H.I.E.L.D. AI Agent & Assistant can create, produce, and distribute professional ${label} content across all platforms.`,
  };
};

// File format categories - massively expanded
const formatCategories = [
  { name: "All", formats: [] as string[] },
  { name: "3D Model", formats: ["3DM", "3DS", "3MF", "Blender", "DAE", "FBX", "GLB", "GLTF", "IFC", "OBJ", "PLY", "SKP", "STEP", "STL", "STP", "STPZ", "USD", "USDZ", "VTK", "VTP", "WRL", "X", "X3D"] },
  { name: "AI Avatar", formats: ["FBX", "GLB", "OBJ", "USD", "USDZ"] },
  { name: "Audio", formats: ["AAC", "AIF", "AU3", "CAF", "FLAC", "LOGIC", "LOGICX", "MID", "MIDI", "MP3", "OGG", "SND", "SONG", "WAV"] },
  { name: "Banking", formats: ["CSV", "PDF", "XLS", "XLSX", "XML"] },
  { name: "CAD", formats: ["DWG", "DXF", "IFC", "SKP", "STEP", "STP", "STPZ"] },
  { name: "Document", formats: ["DOC", "DOCX", "DOTX", "PDF", "TXT", "XML"] },
  { name: "Finance", formats: ["CSV", "PDF", "XLS", "XLSX", "XLTX", "XML"] },
  { name: "Film", formats: ["AAF", "AVI", "DPX", "EXR", "MOV", "MP4", "OMF", "ProRes"] },
  { name: "Gaming", formats: ["3DS", "AKP", "Blender", "FBX", "GLB", "OBJ", "USD", "XPJ"] },
  { name: "Graphics Design", formats: ["AI", "BMP", "CCX", "CDR", "CDT", "CMX", "EMF", "PSD", "SVG", "WMF"] },
  { name: "Image", formats: ["AVIF", "BMP", "DDS", "DPX", "EXR", "Favicon.ico", "GIF", "Animated GIF", "HEIC", "HEIF", "ICO", "JFI", "JFIF", "JPEG", "JPG", "PCX", "PGM", "PNG", "PSB", "PSD", "RAW", "TGA", "TIFF", "WEBP", "WPG", "XCF", "XPM"] },
  { name: "Animated SVG", formats: ["SVG", "XAML"] },
  { name: "Final Draft Script", formats: ["FDR", "FDX", "FDXT", "Fountain"] },
  { name: "Music", formats: ["AAC", "AIF", "ALS", "CAF", "FLAC", "LOGIC", "LOGICX", "MID", "MIDI", "MP3", "MPC", "OGG", "SONG", "WAV"] },
  { name: "Software", formats: ["APK", "APP", "DEB", "DLL", "DMG", "EXE", "MSI", "PKG", "RPM", "WASM"] },
  { name: "Spreadsheet", formats: ["CSV", "XLS", "XLSX", "XLTX"] },
  { name: "Technology", formats: ["JSON", "WASM", "XML", "YAML", "YML"] },
  { name: "Vector", formats: ["AI", "CCX", "CDR", "CDT", "CMX", "EMF", "PS", "SVG", "VDX", "VSD", "VSDM", "VSDX", "WMF", "XAML"] },
  { name: "Video", formats: ["AAF", "AVI", "MOV", "MP4", "OMF", "ProRes", "SRT", "VTT"] },
  { name: "Web", formats: ["CSS", "Favicon.ico", "GIF", "HTML", "JPEG", "JS", "JSON", "PNG", "SVG", "WEBP", "XML"] },
];

const allFormats = [
  "3DM", "3DS", "3MF", "AAC", "AAF", "ADA", "ADB", "ADS", "AI", "AIF", "AKP", "ALS",
  "Animated GIF", "APK", "APP", "AS", "ASM", "ASP", "ASPX", "AU3", "AVI", "AVIF", "AVS", "AVSI",
  "BAS", "BASH", "BAT", "BB", "BC", "BI", "Blender", "BMP",
  "C", "CAF", "CBL", "CC", "CCX", "CDB", "CDC", "CDD", "CDR", "CDT", "CFG", "CL", "CLN",
  "CMAKE", "CMD", "CMX", "COB", "COFFEE", "CONF", "CONFIG", "COPY", "CPP", "CPY", "CS", "CSD",
  "CSH", "CSS", "CSV", "CXX",
  "D", "DAE", "DB", "DDS", "DEB", "DIFF", "DLL", "DMG", "DOC", "DOCX", "DOTX", "DPX", "DWG", "DXF",
  "EM", "EMF", "ERL", "EXE", "EXR",
  "F", "F23", "F2K", "F77", "F90", "F95", "Favicon.ico", "FAX", "FBX", "FDR", "FDX", "FDXT",
  "FLAC", "FOR", "FORTH", "Fountain",
  "GD", "GIF", "GITATTRIBUTES", "GITCONFIG", "GLB", "GLTF", "GO", "GUI",
  "H", "HEIC", "HEIF", "HEX", "HH", "HPP", "HRL", "HS", "HTA", "HTM", "HTML", "HWS", "HXX",
  "I", "ICO", "IFC", "IHS", "INF", "INI", "INO", "ISS", "ITCL",
  "JAVA", "JFI", "JFIF", "JPEG", "JPG", "JS", "JSM", "JSON", "JSON5", "JSONC", "JSP", "JSX",
  "KIX", "KML", "KOTLIN",
  "LAS", "LEX", "LISP", "LITCOFFEE", "LOGIC", "LOGICX", "LSP", "LST", "LUA",
  "M", "MAK", "MARKDOWN", "MD", "MIB", "MID", "MIDI", "MJS", "MK", "ML", "MLI", "MM", "MMS",
  "MOT", "MOV", "MP3", "MP4", "MPC", "MSI", "MX", "MXML",
  "NIM", "NSH", "NSI", "NT",
  "OBJ", "OGG", "OMF", "ORC", "OSX",
  "P6", "PACK", "PAS", "PATCH", "PB", "PCX", "PDF", "PGM", "PH", "PHP", "PHP3", "PHP4", "PHP5",
  "PHPS", "PHPT", "PKG", "PL", "PLX", "PLY", "PM", "PM6", "PNG", "POD6", "PR", "PRO", "PROFILE",
  "PROPERTIES", "ProRes", "PS", "PS1", "PSB", "PSD", "PSD1", "PSM1", "PTX", "PXI", "PY", "PYD",
  "PYI", "PYW", "PYX",
  "R", "R2", "R3", "RAKU", "RAKUDOC", "RAKUMOD", "RAKUTEST", "RAR", "RAW", "RB", "RBW", "RC",
  "REB", "REG", "RPM", "RS",
  "S", "SAS", "SCM", "SCO", "SH", "SHTM", "SHTML", "SKP", "SMD", "SML", "SND", "SONG", "SPF",
  "SPLUS", "SQL", "SQLITE", "SRC", "SREC", "SRT", "SS", "ST", "STEP", "STL", "STP", "STPZ",
  "STY", "SV", "SVG", "SVH", "SWIFT", "SXML",
  "T", "T2T", "TAB", "TCL", "TEK", "TEX", "TGA", "THY", "TIFF", "TOML", "TS", "TSQL", "TSX", "TXT",
  "URL", "USD", "USDZ",
  "V", "VB", "VBA", "VBS", "VDX", "VH", "VHD", "VHDL", "VSD", "VSDM", "VSDX", "VTK", "VTP", "VTT",
  "WASM", "WAV", "WEBP", "WER", "WMF", "WOL", "WPG", "WRL",
  "X", "X3D", "XAML", "XCF", "XHT", "XHTML", "XLS", "XLSX", "XLTX", "XML", "XPJ", "XPM", "XSD",
  "XSL", "XUL",
  "YAML", "YML", "ZIP"
].sort();

const actionCategories = [
  "All", "Create", "Convert", "Edit", "Evolve", "Distribute", "Produce", "Publish", "Share", "Save", "Swap"
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

const platformSupport = [
  { name: "S.H.I.E.L.D. AI OS", category: "Primary", icon: Shield },
  { name: "Blanch OS", category: "Primary", icon: Monitor },
  { name: "macOS", category: "Desktop", icon: Monitor },
  { name: "Windows", category: "Desktop", icon: Monitor },
  { name: "Linux", category: "Desktop", icon: Monitor },
  { name: "iOS", category: "Mobile", icon: Smartphone },
  { name: "Android", category: "Mobile", icon: Smartphone },
  { name: "Smart TV", category: "IoT", icon: Tv },
  { name: "Wearables", category: "IoT", icon: Compass },
  { name: "Automotive", category: "IoT", icon: Car },
  { name: "Gaming", category: "Entertainment", icon: Gamepad2 },
  { name: "Audio", category: "Entertainment", icon: Music },
  { name: "AR/VR", category: "Immersive", icon: Box },
  { name: "Hologram", category: "Immersive", icon: Sparkles },
  { name: "Metaverse", category: "Immersive", icon: Globe },
  { name: "IoT Devices", category: "IoT", icon: Cpu },
  { name: "Satellite", category: "Advanced", icon: Rocket },
  { name: "Universal", category: "Primary", icon: Globe },
];

const CreativeMedia = () => {
  const navigate = useNavigate();
  const [selectedFormatCategory, setSelectedFormatCategory] = useState("All");
  const [selectedActionCategory, setSelectedActionCategory] = useState("All");
  const [selectedPlatformCategory, setSelectedPlatformCategory] = useState("All");
  const [portfolioSearch, setPortfolioSearch] = useState("");

  const displayedFormats = selectedFormatCategory === "All"
    ? allFormats
    : formatCategories.find(c => c.name === selectedFormatCategory)?.formats || [];

  const platformCategories = ["All", "Primary", "Desktop", "Mobile", "IoT", "Entertainment", "Immersive", "Advanced"];
  const displayedPlatforms = selectedPlatformCategory === "All"
    ? platformSupport
    : platformSupport.filter(p => p.category === selectedPlatformCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
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
              <Button variant="shield" size="lg" className="gap-2" onClick={() => navigate("/creative-engine")}>
                <Rocket className="w-5 h-5" /> Initiate S.H.I.E.L.D. AI Creative Media Engine
              </Button>
              <Button variant="glow" size="lg" className="gap-2" onClick={() => navigate("/creative-engine")}>
                <Brain className="w-5 h-5" /> Initiate Neuro Forge Media Engine
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-portal")}>
                <Play className="w-4 h-4" /> Start Generating
              </Button>
              <Button variant="outline" className="gap-2">
                <LayoutGrid className="w-4 h-4" /> View Templates
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {capabilities.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-4 rounded-xl">
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
                  <Button variant="shield" className="gap-2" onClick={() => navigate("/creative-engine")}>
                    <Rocket className="w-4 h-4" /> Initialize Creative Engine
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Film, title: "Neural Video Synthesis", desc: "Generate high-fidelity cinematic sequences in all genres, from Final Draft scripts and prompts." },
                    { icon: Music, title: "Sovereign Audio Engine", desc: "Synthesize immersive soundscapes and multi-lingual voiceovers with divine resonance." },
                    { icon: Globe, title: "Immersive Visuals", desc: "Real-time generation of 3D environments and holographic assets for the whole S.H.I.E.L.D. AI Ecosystem." },
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
          <div className="text-center mb-4">
            <h2 className="text-2xl font-display font-bold mb-2">Limitless Possibilities</h2>
            <p className="text-lg text-primary font-semibold mb-2">Explore our comprehensive creative media production ecosystem</p>
            <p className="text-sm text-muted-foreground mb-2">Create, Convert, Edit, Evolve, Distribute, Produce, Publish, Share, Save, Swap</p>
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

        {/* Tabbed Sections - Massively expanded */}
        <section className="container mx-auto px-4 mb-20">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1.5 bg-transparent mb-10 h-auto">
              {tabCategories.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-xs px-3 py-1.5">
                  <tab.icon className="w-3 h-3 mr-1" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabCategories.map((tab) => {
              const content = getTabContent(tab.value, tab.label);
              return (
                <TabsContent key={tab.value} value={tab.value}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-display font-bold">{content.title}</h3>
                  </div>
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all mb-6">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">S.H.I.E.L.D. AI Agent & Assistant</h4>
                        <p className="text-sm text-muted-foreground">{content.suggestion}</p>
                        <Button variant="outline" size="sm" className="mt-3 gap-1 text-xs" onClick={() => navigate("/creative-engine")}>
                          <Rocket className="w-3 h-3" /> Launch Creative Engine
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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

          {/* Active Categories / Action buttons */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground text-center mb-2 font-semibold">Active Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {actionCategories.map((cat) => (
                <Button key={cat} variant={selectedActionCategory === cat ? "shield" : "outline"} size="sm" onClick={() => setSelectedActionCategory(cat)} className="text-xs">
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Media Types / Format Categories */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground text-center mb-2 font-semibold">Media Types</p>
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
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {platformCategories.map((cat) => (
              <Button key={cat} variant={selectedPlatformCategory === cat ? "shield" : "outline"} size="sm" onClick={() => setSelectedPlatformCategory(cat)} className="text-xs">
                {cat}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {displayedPlatforms.map((platform, i) => (
              <motion.div key={platform.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                  <CardContent className="p-4 text-center">
                    <platform.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs font-medium">{platform.name}</p>
                    <Badge variant="outline" className="text-[10px] mt-1 border-primary/20 text-primary">{platform.category}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Active Media Streams - Terminal */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              <Terminal className="w-3 h-3 mr-1" /> SHIELD_AI_CREATIVE_ENGINE_v4.2.0
            </Badge>
            <h2 className="text-2xl font-display font-bold mb-2">S.H.I.E.L.D. AI Creative Media</h2>
            <p className="text-muted-foreground text-sm">Additional Autonomous Content Generation & Immersive Media Engineering</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Initialize Creative Engine", icon: Rocket },
              { label: "Rendering Engine", icon: Server },
              { label: "Neural Forge", icon: Brain },
              { label: "AI Director", icon: Eye },
              { label: "AI Producer", icon: Crown },
              { label: "Watchman Version 4.2", icon: Shield },
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
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }} className="text-primary/80">
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
                Distribute your creations across S.H.I.E.L.D. AI Magazine, Blanch Network, Blanch Infinity DLT, Virtual Marketplaces, All Social Media Platforms, Marketing Agency & Firms, Publishing, Blanch OS, S.H.I.E.L.D. AI OS and all Web/App Development Projects, Inspire Student S.H.I.E.L.D. AI Education Resources, and Honor the Royal Priesthood — and beyond with one click.
              </p>
              <Button variant="shield" className="gap-2" onClick={() => navigate("/publishing-dashboard")}>
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
            <Input placeholder="Search portfolios..." value={portfolioSearch} onChange={(e) => setPortfolioSearch(e.target.value)} className="bg-card/50" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Cinematic Trailer", type: "Video", color: "from-red-500/20 to-pink-500/20" },
              { title: "Brand Identity Kit", type: "Design", color: "from-blue-500/20 to-cyan-500/20" },
              { title: "Album Cover Art", type: "Image", color: "from-purple-500/20 to-pink-500/20" },
              { title: "Podcast Series", type: "Audio", color: "from-green-500/20 to-emerald-500/20" },
              { title: "3D Product Render", type: "3D", color: "from-orange-500/20 to-amber-500/20" },
              { title: "Magazine Layout", type: "Publishing", color: "from-indigo-500/20 to-violet-500/20" },
              { title: "Game Assets Pack", type: "Gaming", color: "from-cyan-500/20 to-teal-500/20" },
              { title: "Social Media Kit", type: "Marketing", color: "from-pink-500/20 to-rose-500/20" },
              { title: "Scripture Visuals", type: "Heritage", color: "from-amber-500/20 to-yellow-500/20" },
            ].filter(p => !portfolioSearch || p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.type.toLowerCase().includes(portfolioSearch.toLowerCase()))
            .map((project, i) => (
              <motion.div key={project.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="group cursor-pointer">
                <div className={`aspect-square rounded-xl bg-gradient-to-br ${project.color} border border-border/30 flex flex-col items-center justify-center p-4 hover:border-primary/30 transition-all relative`}>
                  <ImagePlus className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-sm font-medium text-center">{project.title}</p>
                  <Badge variant="outline" className="mt-2 text-xs">{project.type}</Badge>
                  <div className="absolute inset-0 rounded-xl bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="shield" size="sm" className="gap-1">
                      <ExternalLink className="w-3 h-3" /> Open Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" className="gap-2" onClick={() => navigate("/creative-portal")}>
              <Upload className="w-4 h-4" /> Upload Your Work
            </Button>
          </div>
        </section>

        {/* Creative Engine Animation */}
        <section className="container mx-auto px-4 mb-20 text-center">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="text-lg font-display font-bold mb-2">Creative Engine</h3>
            <p className="text-sm text-muted-foreground mb-4">Generating Masterpiece...</p>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <motion.div className="bg-primary h-2 rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, repeat: Infinity }} />
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
