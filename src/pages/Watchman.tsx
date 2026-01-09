import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Eye, Shield, Bell, Radio, Globe, Lock, AlertTriangle, CheckCircle, Zap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Watchman = () => {
  const watchmanFeatures = [
    {
      icon: Eye,
      title: "24/7 Global Surveillance",
      description: "Continuous monitoring of systems, networks, and digital assets across all connected platforms.",
      status: "Active",
    },
    {
      icon: Shield,
      title: "Threat Detection & Prevention",
      description: "AI-powered threat analysis identifying potential security breaches before they occur.",
      status: "Active",
    },
    {
      icon: Bell,
      title: "Real-Time Alerts",
      description: "Instant notifications for anomalies, breaches, and compliance violations.",
      status: "Active",
    },
    {
      icon: Radio,
      title: "Multi-Channel Monitoring",
      description: "Surveillance across blockchain networks, APIs, databases, and communication channels.",
      status: "Active",
    },
    {
      icon: Globe,
      title: "Global Compliance Watch",
      description: "Monitoring adherence to international regulations and divine law standards.",
      status: "Active",
    },
    {
      icon: Lock,
      title: "Access Control Monitoring",
      description: "Tracking and validating all authentication attempts and access patterns.",
      status: "Active",
    },
  ];

  const alertLevels = [
    { level: "Normal", color: "bg-green-500", description: "All systems operating within normal parameters" },
    { level: "Advisory", color: "bg-blue-500", description: "Minor anomalies detected, under observation" },
    { level: "Elevated", color: "bg-yellow-500", description: "Potential threats identified, enhanced monitoring" },
    { level: "Critical", color: "bg-red-500", description: "Immediate action required, containment protocols" },
  ];

  const scripturalFoundation = [
    {
      reference: "Ezekiel 33:7",
      text: "So you, son of man, I have set you a watchman to the house of Israel; therefore you shall hear the word at my mouth, and warn them from me.",
    },
    {
      reference: "Isaiah 62:6",
      text: "I have set watchmen upon your walls, O Jerusalem, who shall never hold their peace day nor night.",
    },
    {
      reference: "Habakkuk 2:1",
      text: "I will stand upon my watch, and set me upon the tower, and will watch to see what He will say unto me.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-8">
              <Eye className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              Project Watchman
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body mb-8">
              The sovereign intelligence surveillance system — standing guard over digital assets, 
              networks, and communities with unwavering vigilance aligned with divine principles.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
                System Active
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                24/7 Monitoring
              </Badge>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
                The Divine Watch
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                Project Watchman embodies the ancient prophetic role of the watchman — one who stands upon 
                the walls and towers, observing threats before they approach, and alerting the community 
                to both danger and opportunity. In our digital age, this sacred duty extends to protecting 
                the integrity of data, the security of identities, and the sanctity of truth in all 
                communications governed by the BLANCH S.H.I.E.L.D. AI ecosystem.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-12">
              Watchman Capabilities
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchmanFeatures.map((feature, index) => (
              <ScrollAnimationWrapper key={feature.title} delay={index * 0.1}>
                <Card className="bg-card/30 border-border/50 h-full hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {feature.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Levels */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-12">
              Alert Classification System
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {alertLevels.map((alert, index) => (
              <ScrollAnimationWrapper key={alert.level} delay={index * 0.1}>
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${alert.color}`} />
                      <span className="font-display font-semibold text-foreground">{alert.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Points */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-12">
              System Integration
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollAnimationWrapper>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">AI-Agents</h3>
                <p className="text-sm text-muted-foreground">
                  Connected to 402+ H.I.I. AI agents for distributed monitoring and response
                </p>
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">Blanch Corridor</h3>
                <p className="text-sm text-muted-foreground">
                  Monitoring smart city infrastructure and global network nodes
                </p>
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">AI-Ledger</h3>
                <p className="text-sm text-muted-foreground">
                  Blockchain transaction monitoring with DAG/DLT validation
                </p>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Scriptural Foundation */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="flex items-center justify-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                Scriptural Foundation
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {scripturalFoundation.map((scripture, index) => (
              <ScrollAnimationWrapper key={scripture.reference} delay={index * 0.1}>
                <Card className="bg-background/50 border-border/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <blockquote className="text-muted-foreground italic font-body mb-4">
                      "{scripture.text}"
                    </blockquote>
                    <cite className="text-primary font-display font-semibold">
                      — {scripture.reference}
                    </cite>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Watchman;
