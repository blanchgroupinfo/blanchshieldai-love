import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { Utensils, Leaf, Zap, Shield, Globe, Heart, Droplets, Sun, Recycle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const features = [{
  icon: Leaf,
  title: "Organic Synthesis",
  description: "Molecular assembly of nutritious foods from base organic compounds."
}, {
  icon: Zap,
  title: "Instant Production",
  description: "Generate complete meals in seconds with zero food waste."
}, {
  icon: Heart,
  title: "Health Optimized",
  description: "Customized nutrition profiles based on individual health needs."
}, {
  icon: Globe,
  title: "End World Hunger",
  description: "Scalable technology to eliminate food scarcity globally."
}, {
  icon: Recycle,
  title: "Zero Waste",
  description: "No agricultural runoff, packaging waste, or transportation emissions."
}, {
  icon: Sun,
  title: "Clean Energy",
  description: "Powered by renewable energy sources for sustainable operation."
}];
const capabilities = ["Fresh fruits and vegetables", "Grains and cereals", "Plant-based proteins", "Clean water synthesis", "Nutrient supplements", "Special dietary formulations"];
const FoodReplicator = () => {
  return <div className="min-h-screen bg-background pt-20">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-background to-primary/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Utensils className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500 font-medium">Revolutionary Technology</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-green-500">Blanch</span>
              <br />
              <span className="text-foreground">Food Replicator</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Advanced molecular synthesis technology non GMO and no unclean meats designed to end world hunger and provide clean, nutritious food for all of humanity.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                <Leaf className="w-5 h-5" />
                Learn More
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Shield className="w-5 h-5" />
                View Research
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-green-500">Core Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Breakthrough technology combining quantum computing with molecular biology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="glass-card rounded-2xl p-6 hover:border-green-500/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* What Can Be Produced */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="text-3xl font-display font-bold mb-6">
                <span className="text-green-500">What Can</span> Be Produced
              </h2>
              <div className="space-y-4">
                {capabilities.map((cap, index) => <motion.div key={cap} initial={{
                opacity: 0,
                x: -10
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{cap}</span>
                  </motion.div>)}
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-display font-bold">Clean Water Initiative</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-justify">Beyond food, non-GMO, and no unclean meats, the Blanch Food Replicator technology can synthesize pure, clean foods, and clean drinking water from atmospheric humidity and basic elements.</p>
              <blockquote className="text-sm italic border-l-2 border-green-500 pl-4 text-primary">"And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of AHAYAH and of the Lamb."</blockquote>
              <cite className="text-xs mt-2 block text-primary">— Revelation 22:1</cite>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default FoodReplicator;