import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Smartphone, Globe, Server, Database, Zap, Shield, Cpu,
  Layers, GitBranch, Terminal, Cloud, Box, Layout, Palette, 
  MonitorSmartphone, Rocket, CheckCircle, ArrowRight, Play,
  Monitor, Apple, Laptop, TabletSmartphone, Orbit, Boxes, Sparkles, Crown,
  Tv, Watch, Car, Gamepad2, Headphones, Glasses, Radio, Satellite,
  Store, Building2, Heart, GraduationCap, ShoppingCart, Briefcase,
  MessageSquare, Video, Music, Camera, Wallet, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

const WebAppBuilding = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("web");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const platforms = [
    { id: "web", name: "Web Applications", icon: Globe, description: "Responsive web apps" },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone, description: "Blanch OS, iOS & Android" },
    { id: "desktop", name: "Desktop Apps", icon: MonitorSmartphone, description: "Blanch OS, Windows, Mac & Linux native" },
    { id: "cloud", name: "Cloud Native", icon: Cloud, description: "Scalable cloud apps" },
    { id: "universal", name: "Universal", icon: Orbit, description: "Build once, deploy everywhere" },
  ];

  const supportedPlatforms = [
    { name: "S.H.I.E.L.D. AI OS", icon: Shield, color: "from-violet-500 to-purple-600", category: "Primary" },
    { name: "Blanch OS", icon: Cpu, color: "from-blue-500 to-cyan-500", category: "Primary" },
    { name: "macOS", icon: Apple, color: "from-gray-400 to-gray-600", category: "Desktop" },
    { name: "Windows", icon: Monitor, color: "from-blue-400 to-blue-600", category: "Desktop" },
    { name: "Linux", icon: Terminal, color: "from-orange-500 to-yellow-500", category: "Desktop" },
    { name: "iOS", icon: TabletSmartphone, color: "from-pink-500 to-rose-500", category: "Mobile" },
    { name: "Android", icon: Smartphone, color: "from-green-500 to-emerald-500", category: "Mobile" },
    { name: "Smart TV", icon: Tv, color: "from-red-500 to-rose-600", category: "IoT" },
    { name: "Wearables", icon: Watch, color: "from-teal-500 to-cyan-500", category: "IoT" },
    { name: "Automotive", icon: Car, color: "from-slate-500 to-zinc-600", category: "IoT" },
    { name: "Gaming", icon: Gamepad2, color: "from-indigo-500 to-violet-500", category: "Entertainment" },
    { name: "Audio", icon: Headphones, color: "from-fuchsia-500 to-pink-500", category: "Entertainment" },
    { name: "AR/VR", icon: Glasses, color: "from-sky-500 to-blue-600", category: "Immersive" },
    { name: "Hologram", icon: Sparkles, color: "from-cyan-400 to-blue-500", category: "Immersive" },
    { name: "Metaverse", icon: Orbit, color: "from-purple-500 to-pink-500", category: "Immersive" },
    { name: "IoT Devices", icon: Radio, color: "from-lime-500 to-green-500", category: "IoT" },
    { name: "Satellite", icon: Satellite, color: "from-blue-600 to-indigo-600", category: "Advanced" },
    { name: "Universal", icon: Boxes, color: "from-amber-500 to-orange-500", category: "Primary" },
  ];

  const appCategories = [
    { name: "E-Commerce", icon: ShoppingCart, description: "Online stores & marketplaces", color: "from-green-500 to-emerald-600" },
    { name: "Enterprise", icon: Building2, description: "Business & corporate solutions", color: "from-blue-500 to-indigo-600" },
    { name: "Healthcare", icon: Heart, description: "Medical & wellness apps", color: "from-red-500 to-rose-600" },
    { name: "Education", icon: GraduationCap, description: "Learning & training platforms", color: "from-purple-500 to-violet-600" },
    { name: "Finance", icon: Wallet, description: "Banking & fintech solutions", color: "from-amber-500 to-yellow-600" },
    { name: "Social", icon: MessageSquare, description: "Communication & networking", color: "from-pink-500 to-rose-500" },
    { name: "Media", icon: Video, description: "Streaming & content platforms", color: "from-orange-500 to-red-500" },
    { name: "Analytics", icon: BarChart3, description: "Data & business intelligence", color: "from-cyan-500 to-blue-500" },
  ];

  const platformCategories = ["All", "Primary", "Desktop", "Mobile", "IoT", "Entertainment", "Immersive", "Advanced"];
  const features = [
    {
      icon: Code2,
      title: "AI-Powered Code Generation",
      description: "Generate production-ready code with S.H.I.E.L.D. AI assistance"
    },
    {
      icon: Layout,
      title: "Visual Builder",
      description: "Drag-and-drop interface builder with real-time preview"
    },
    {
      icon: Database,
      title: "Backend Integration",
      description: "Seamless database and API integration capabilities"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security features and compliance standards"
    },
    {
      icon: Layers,
      title: "Component Library",
      description: "Pre-built components for rapid development"
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Integrated Git workflows and collaboration"
    },
    {
      icon: Terminal,
      title: "AI-powered IDE and CLI Tools",
      description: "Powerful command-line development tools"
    },
    {
      icon: Rocket,
      title: "One-Click Deploy",
      description: "Deploy to production with a single click"
    },
  ];

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Angular", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Go", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Cache" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
  ];

  const workflowSteps = [
    { step: 1, title: "Design", description: "Create wireframes and mockups using AI assistance" },
    { step: 2, title: "Build", description: "Generate code with visual builder or AI prompts" },
    { step: 3, title: "Test", description: "Automated testing and quality assurance" },
    { step: 4, title: "Deploy", description: "One-click deployment to global infrastructure" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                <Code2 className="w-12 h-12 text-violet-400" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              Next-Gen Development Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              S.H.I.E.L.D. AI Web/App Building
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build powerful web and mobile applications with AI-assisted development. 
              From concept to deployment in record time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start Building
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                View Templates
              </Button>
            </div>
          </motion.div>

          {/* Platform Selection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Choose Your Platform</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-6 rounded-xl border transition-all ${
                    selectedPlatform === platform.id
                      ? "bg-primary/10 border-primary"
                      : "bg-card/50 border-border/50 hover:border-primary/50"
                  }`}
                >
                  <platform.icon className={`w-10 h-10 mx-auto mb-3 ${
                    selectedPlatform === platform.id ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <h3 className="font-semibold mb-1">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Platform Support Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">Platform Support</h2>
              <p className="text-muted-foreground mb-6">Deploy your applications across 18+ platforms</p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {platformCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category === "All" ? null : category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-6xl mx-auto mb-8">
              {supportedPlatforms
                .filter(p => !selectedCategory || p.category === selectedCategory)
                .map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.03 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all text-center"
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${platform.color} p-2.5 flex items-center justify-center`}>
                    <platform.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{platform.name}</h3>
                  <Badge variant="outline" className="mt-2 text-xs opacity-70">{platform.category}</Badge>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-amber-200 font-semibold">Guided by Divine Law</span>
              </div>
            </motion.div>
          </motion.section>

          {/* App Categories Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">Build Any Application</h2>
              <p className="text-muted-foreground">Specialized templates and tools for every industry</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {appCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.03 }}
                  className="group relative p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${category.color} p-3 flex items-center justify-center`}>
                    <category.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                    <CardHeader>
                      <div className="p-3 rounded-xl bg-primary/10 w-fit mb-3">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Development Workflow */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Development Workflow</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {workflowSteps.map((step, index) => (
                <div key={step.step} className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-primary">{step.step}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-32">{step.description}</p>
                  </motion.div>
                  {index < workflowSteps.length - 1 && (
                    <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Technologies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Supported Technologies</h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="px-4 py-2 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 transition-all"
                >
                  <span className="font-medium">{tech.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({tech.category})</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Ready to Build Your Next App?</h2>
                <p className="text-muted-foreground mb-6">
                  Start building with S.H.I.E.L.D. AI and experience the future of application development.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="shield" size="lg" className="gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default WebAppBuilding;
