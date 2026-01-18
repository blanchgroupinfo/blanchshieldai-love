import { motion } from "framer-motion";
import { Heart, Globe, Users, HandHeart, Building2, Sparkles, DollarSign, ArrowRight, Shield } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PhilanthropyHub = () => {
  const initiatives = [
    {
      title: "Blanch Foundation",
      description: "Core charitable organization supporting global initiatives for education, health, and community development.",
      icon: Building2,
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
      raised: 2500000,
      goal: 5000000
    },
    {
      title: "Humanitarian Fund",
      description: "Emergency relief and humanitarian aid for communities affected by natural disasters and crises.",
      icon: Globe,
      color: "text-green-400",
      gradient: "from-green-500/20 to-emerald-500/20",
      raised: 1800000,
      goal: 3000000
    },
    {
      title: "Emancipation Bridging Fund",
      description: "Programs dedicated to economic empowerment and breaking cycles of poverty through sustainable initiatives.",
      icon: HandHeart,
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      raised: 750000,
      goal: 2000000
    },
    {
      title: "Community Charity",
      description: "Local community support programs including food banks, housing assistance, and social services.",
      icon: Users,
      color: "text-orange-400",
      gradient: "from-orange-500/20 to-yellow-500/20",
      raised: 450000,
      goal: 1000000
    }
  ];

  const impactStats = [
    { value: "50K+", label: "Lives Impacted" },
    { value: "120+", label: "Communities Served" },
    { value: "$5M+", label: "Funds Distributed" },
    { value: "45", label: "Countries Reached" }
  ];

  const focusAreas = [
    "Education & Scholarships",
    "Healthcare Access",
    "Clean Water Initiatives",
    "Economic Empowerment",
    "Food Security",
    "Housing Programs",
    "Youth Development",
    "Elder Care"
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-background to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-300">Making a Difference</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">Philanthropy</span>
              <br />
              <span className="text-foreground">Hub</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering communities worldwide through charitable initiatives, humanitarian aid, 
              and sustainable development programs. Together, we can create lasting change.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Heart className="w-5 h-5" />
                Donate Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Users className="w-5 h-5" />
                Volunteer
              </Button>
            </div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16"
          >
            {impactStats.map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/50 text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">Our Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Supporting diverse programs that address critical needs across communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${initiative.gradient} flex items-center justify-center mb-4`}>
                      <initiative.icon className={`w-7 h-7 ${initiative.color}`} />
                    </div>
                    <CardTitle>{initiative.title}</CardTitle>
                    <CardDescription>{initiative.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Raised</span>
                        <span className="font-medium">${(initiative.raised / 1000000).toFixed(1)}M of ${(initiative.goal / 1000000).toFixed(1)}M</span>
                      </div>
                      <Progress value={(initiative.raised / initiative.goal) * 100} className="h-2" />
                      <Button variant="outline" className="w-full mt-4 gap-2">
                        <DollarSign className="w-4 h-4" />
                        Support This Cause
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Our <span className="gradient-text">Focus Areas</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                We concentrate our efforts on key areas that create the most significant 
                impact in communities around the world.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30"
                  >
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span className="text-sm">{area}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-pink-400" />
                    100% Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Every donation is tracked on our distributed ledger, ensuring complete 
                    transparency in how funds are utilized.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Blockchain-verified transactions
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Real-time fund tracking
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Impact reports & updates
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Annual audited statements
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Be part of the change. Every contribution, no matter the size, makes a difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Make a Donation
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PhilanthropyHub;
