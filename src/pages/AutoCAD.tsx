import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PenTool, Ruler, Box, Layers, Grid3X3, Move3d, Maximize2, 
  RotateCcw, Copy, Scissors, Eye, Download, Upload, Share2,
  Palette, Settings, Zap, Shield, Play, CheckCircle, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";


const AutoCAD = () => {
  const [selectedCategory, setSelectedCategory] = useState("architecture");

  const categories = [
    { id: "architecture", name: "Architecture", icon: Box },
    { id: "mechanical", name: "Mechanical", icon: Settings },
    { id: "electrical", name: "Electrical", icon: Zap },
    { id: "civil", name: "Civil Engineering", icon: Grid3X3 },
  ];

  const features = [
    {
      icon: PenTool,
      title: "AI-Assisted Drafting",
      description: "Intelligent design suggestions and auto-completion for faster drafting"
    },
    {
      icon: Move3d,
      title: "3D Modeling",
      description: "Create stunning 3D models with parametric design capabilities"
    },
    {
      icon: Layers,
      title: "Layer Management",
      description: "Organize complex designs with advanced layer controls"
    },
    {
      icon: Ruler,
      title: "Precision Tools",
      description: "Exact measurements and constraints for engineering accuracy"
    },
    {
      icon: Copy,
      title: "Block Library",
      description: "Extensive library of pre-built components and symbols"
    },
    {
      icon: Share2,
      title: "Collaboration",
      description: "Real-time collaboration and cloud sync capabilities"
    },
    {
      icon: Eye,
      title: "Visualization",
      description: "Photorealistic rendering and walkthroughs"
    },
    {
      icon: Download,
      title: "Multi-Format Export",
      description: "Export to DWG, DXF, PDF, and more formats"
    },
  ];

  const tools = [
    { name: "Line", icon: Ruler, shortcut: "L" },
    { name: "Rectangle", icon: Maximize2, shortcut: "REC" },
    { name: "Circle", icon: Box, shortcut: "C" },
    { name: "Arc", icon: RotateCcw, shortcut: "A" },
    { name: "Move", icon: Move3d, shortcut: "M" },
    { name: "Copy", icon: Copy, shortcut: "CO" },
    { name: "Trim", icon: Scissors, shortcut: "TR" },
    { name: "Extend", icon: Maximize2, shortcut: "EX" },
  ];

  const useCases = [
    {
      title: "Architectural Plans",
      description: "Design floor plans, elevations, and sections with precision",
      image: "🏗️"
    },
    {
      title: "Mechanical Parts",
      description: "Create detailed mechanical components and assemblies",
      image: "⚙️"
    },
    {
      title: "Electrical Layouts",
      description: "Design electrical systems and circuit diagrams",
      image: "⚡"
    },
    {
      title: "Civil Infrastructure",
      description: "Plan roads, bridges, and urban infrastructure",
      image: "🌉"
    },
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
                <PenTool className="w-12 h-12 text-teal-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              S.H.I.E.L.D. AI AutoCAD
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional CAD design powered by artificial intelligence. 
              Create precise 2D drawings and 3D models with unprecedented speed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Launch Designer
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                View Gallery
              </Button>
            </div>
          </motion.div>

          {/* Category Selection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Design Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl border transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary/10 border-primary"
                      : "bg-card/50 border-border/50 hover:border-primary/50"
                  }`}
                >
                  <category.icon className={`w-10 h-10 mx-auto mb-3 ${
                    selectedCategory === category.id ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <h3 className="font-semibold">{category.name}</h3>
                </motion.button>
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
                      <div className="p-3 rounded-xl bg-teal-500/10 w-fit mb-3">
                        <feature.icon className="w-6 h-6 text-teal-400" />
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

          {/* Quick Tools Reference */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Essential Tools</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-teal-500/50 transition-all"
                >
                  <tool.icon className="w-8 h-8 text-teal-400 mb-2" />
                  <span className="text-sm font-medium">{tool.name}</span>
                  <span className="text-xs text-muted-foreground">{tool.shortcut}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Use Cases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">Use Cases</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={useCase.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{useCase.image}</div>
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* AI Integration */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="p-6 rounded-2xl bg-teal-500/20">
                      <Cpu className="w-16 h-16 text-teal-400" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-display font-bold mb-4">AI-Powered Design Assistance</h2>
                    <p className="text-muted-foreground mb-6">
                      Our AI understands your design intent and provides intelligent suggestions, 
                      auto-completes patterns, detects errors, and optimizes your drawings for 
                      manufacturing and construction.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Auto-complete</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Error Detection</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Design Optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Start Designing Today</h2>
                <p className="text-muted-foreground mb-6">
                  Experience the future of CAD design with S.H.I.E.L.D. AI AutoCAD.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="shield" size="lg" className="gap-2">
                    <PenTool className="w-5 h-5" />
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="lg">
                    View Pricing
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

export default AutoCAD;
