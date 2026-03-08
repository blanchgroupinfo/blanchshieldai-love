import { motion } from "framer-motion";
import { Globe, Boxes, Users, Headphones, Building2, Gamepad2, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Metaverse = () => {
  const experiences = [
    {
      icon: Building2,
      title: "Virtual Headquarters",
      description: "Conduct business meetings and conferences in immersive 3D environments",
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: ShoppingBag,
      title: "Virtual Marketplace",
      description: "Browse and purchase digital and physical goods in interactive showrooms",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Users,
      title: "Community Spaces",
      description: "Connect with global community members in social gathering spaces",
      color: "text-green-400",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Gamepad2,
      title: "Interactive Experiences",
      description: "Engage with gamified learning and entertainment environments",
      color: "text-orange-400",
      gradient: "from-orange-500/20 to-yellow-500/20"
    }
  ];

  const features = [
    "Immersive 3D Environments",
    "Cross-Platform Compatibility",
    "Digital Asset Integration",
    "Voice & Video Communication",
    "AI-Powered Avatars",
    "Secure Transactions",
    "Event Hosting",
    "Virtual Real Estate"
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Boxes className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Next-Gen Virtual Reality</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>
              <br />
              <span className="text-foreground">Metaverse</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enter the next dimension of digital interaction. Experience immersive virtual worlds 
              powered by S.H.I.E.L.D. AI technology for business, commerce, and community.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Globe className="w-5 h-5" />
                Enter Metaverse
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Headphones className="w-5 h-5" />
                Virtual Tour
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">Virtual Experiences</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore diverse virtual environments designed for every aspect of digital life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <exp.icon className={`w-7 h-7 ${exp.color}`} />
                    </div>
                    <CardTitle className="text-lg">{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{exp.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Powered by <span className="gradient-text">Advanced Technology</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our metaverse platform combines cutting-edge virtual reality technology with 
                S.H.I.E.L.D. AI to create seamless, secure, and immersive digital experiences.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 border border-border/30 flex items-center justify-center">
                <div className="text-center">
                  <Boxes className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                  <p className="text-2xl font-display font-bold">Virtual World</p>
                  <p className="text-muted-foreground">Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">Ready to Explore?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the waitlist for early access to the S.H.I.E.L.D. AI Metaverse
            </p>
            <Button size="lg" className="gap-2">
              Join Waitlist
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Metaverse;
