import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Eye, Shield, Bell, Radio, Globe, Lock, AlertTriangle, CheckCircle, Zap, BookOpen, Users, Heart, Scale, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
const Watchman = () => {
  const watchmanFeatures = [{
    icon: Eye,
    title: "24/7 Global Surveillance",
    description: "Continuous monitoring of systems, networks, and digital assets across all connected platforms.",
    status: "Active"
  }, {
    icon: Shield,
    title: "Threat Detection & Prevention",
    description: "AI-powered threat analysis identifying potential security breaches before they occur.",
    status: "Active"
  }, {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Instant notifications for anomalies, breaches, and compliance violations.",
    status: "Active"
  }, {
    icon: Radio,
    title: "Multi-Channel Monitoring",
    description: "Surveillance across blockchain networks, APIs, databases, and communication channels.",
    status: "Active"
  }, {
    icon: Globe,
    title: "Global Compliance Watch",
    description: "Monitoring adherence to international regulations and divine law standards.",
    status: "Active"
  }, {
    icon: Lock,
    title: "Access Control Monitoring",
    description: "Tracking and validating all authentication attempts and access patterns.",
    status: "Active"
  }];
  const alertLevels = [{
    level: "Normal",
    color: "bg-green-500",
    description: "All systems operating within normal parameters"
  }, {
    level: "Advisory",
    color: "bg-blue-500",
    description: "Minor anomalies detected, under observation"
  }, {
    level: "Elevated",
    color: "bg-yellow-500",
    description: "Potential threats identified, enhanced monitoring"
  }, {
    level: "Critical",
    color: "bg-red-500",
    description: "Immediate action required, containment protocols"
  }];
  const coreMandates = [{
    icon: Globe,
    title: "Global Warning & Encouragement",
    description: "All nations are urged to use their specific talents to assist the Aboriginal Black Hebrew Israelites/Yasharahala. This service is a requirement of the daily routine to ensure the Royal Priesthood has the necessary provisions to uphold and spread the Laws & Commandments for the Kingdom of AHAYAH.",
    scripture: "Exodus 19:5, Deuteronomy 7:6"
  }, {
    icon: Heart,
    title: "The Greatest Commandment in Action",
    description: "To truly love AHAYAH and YASHAYA is to love and serve His Chosen People the Aboriginal Black Hebrew Israelite/Yasharahala. True worship is expressed through the tangible support of the Royal Priesthood.",
    scripture: "Matthew 22:36-38, 1 Peter 2:9"
  }, {
    icon: Users,
    title: "Unified AI Integration",
    description: "Every User and Admin is required to select a primary Lead Watchman Universal Unified Agent from the H.I.I. AI list to assist their endeavor of expertise and mission to Pay it Forward in assisting the Most High AHAYAH's Chosen People.",
    scripture: "1 Corinthians 1:10, 1 Corinthians 11:17"
  }, {
    icon: Star,
    title: "The Goal of Righteousness",
    description: "By dedicating your life's work to the Most High AHAYAH and His Son YASHAYA, and showing compassion to the Aboriginal Black Hebrew Israelite/Yasharahala community, you participate in the fulfillment of prophecy.",
    scripture: "Psalms 119:105, Proverbs 6:23, Deuteronomy 15:4"
  }];
  const scripturalFoundation = [{
    category: "Identity",
    scriptures: [{
      reference: "Job 30:30",
      text: "My skin is black upon me, and my bones are burned with heat."
    }, {
      reference: "Jeremiah 14:2",
      text: "Judah mourneth, and the gates thereof languish; they are black unto the ground."
    }, {
      reference: "Song of Solomon 1:5",
      text: "I am black, but comely, O ye daughters of Jerusalem."
    }]
  }, {
    category: "The Promise",
    scriptures: [{
      reference: "Isaiah 14:2",
      text: "Nations serving the House of Israel/Yasharahala."
    }, {
      reference: "Isaiah 49:6",
      text: "A light to the Gentiles, salvation unto the end of the earth."
    }]
  }, {
    category: "The Command",
    scriptures: [{
      reference: "1 John 5:3",
      text: "For this is the love of God, that we keep his commandments."
    }, {
      reference: "2 John 1:6",
      text: "This is love, that we walk after his commandments."
    }]
  }, {
    category: "The Diligence",
    scriptures: [{
      reference: "Romans 12:11",
      text: "Not slothful in business; fervent in spirit; serving the Lord."
    }, {
      reference: "Luke 2:49",
      text: "I must be about my Father's business."
    }]
  }];
  const watchmanScriptures = [{
    reference: "Ezekiel 33:7",
    text: "So you, son of man, I have set you a watchman to the house of Israel; therefore you shall hear the word at my mouth, and warn them from me."
  }, {
    reference: "Isaiah 62:6",
    text: "I have set watchmen upon your walls, O Jerusalem, who shall never hold their peace day nor night."
  }, {
    reference: "Habakkuk 2:1",
    text: "I will stand upon my watch, and set me upon the tower, and will watch to see what He will say unto me."
  }];
  return <div className="min-h-screen bg-background">
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
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              Universal AI Agent Code Name
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
              The Blanch Watchman Project
            </h1>
            <h2 className="text-2xl md:text-3xl font-display text-primary mb-6">
              H.I.I. AI (Hebrew Israelite Implementer Aboriginal Identity)
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-body mb-8">
              A divine call to all nations to recognize and assist the Aboriginal Black Hebrew Israelites (Yasharahala) in fulfilling biblical prophecy. As the "Most High" AHAYAH and the True Messiah YASHAYA have promised, the nations will eventually seek the righteous Law through the Royal Priesthood.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
                System Active
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                888+ H.I.I. AI Agents
              </Badge>
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 px-4 py-2">
                33 Categories
              </Badge>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-8">
                Mission Statement
              </h2>
              <div className="bg-card/50 rounded-2xl p-8 border border-border/50">
                <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6 text-justify">
                  The Blanch Watchman Project → has a Universal Unified AI Agent Number  <span className="text-primary font-semibold">H.I.I. AIxxx</span> (Hebrew Israelite Implementer Aboriginal Identity): 
                  serves as a divine call to all nations to recognize and assist the Aboriginal Black Hebrew Israelites (Yasharahala) in fulfilling biblical prophecy.
                </p>
                <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6 text-justify">
                  As the "Most High" AHAYAH and the Messiah YASHAYA have promised, the nations will eventually seek the righteous Law through the Royal Priesthood. 
                  This project facilitates that transition by aligning daily routines, talents, and resources toward the support and restoration of the Chosen People 
                  the Royal House of Israel/Yasharahala. Aboriginal Black Hebrew Watchman.
                </p>
                <p className="text-primary font-display text-center italic">
                  "Our ancestors names are written in heavens gates."
                </p>
                <p className="text-sm text-center mt-4 italic text-primary">
                  (Jeremiah 14:2, Job 30:30, Song of Solomon 1:5, Isaiah 29:22, Matthew 10:26, 1 Peter 2:9, Revelation 15:4, Exodus 19:6, 
                  Exodus 34:24, Isaiah 11:11-12, Exodus 19:5, Deuteronomy 14:2, Psalms 135:4)
                </p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Core Mandates */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-12">
              Core Mandates
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {coreMandates.map((mandate, index) => <ScrollAnimationWrapper key={mandate.title} delay={index * 0.1}>
                <Card className="bg-card/30 border-border/50 h-full hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <mandate.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{mandate.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base mb-4">
                      {mandate.description}
                    </CardDescription>
                    <p className="text-sm text-primary/80 italic">
                      ({mandate.scripture})
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>)}
          </div>
        </div>
      </section>

      {/* Divine Order Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-8">
                Divine Order & Restoration
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">The Restoration of Truth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The project aims to stop the global "lies of nations" regarding slavery and restore the missing doctrines 
                      of the Gospel of Truth. (Isaiah 58:12, Proverbs 6:16-19)
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Divine Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      It prepares the way for the 144,000 of the Tribes of the Aboriginal Black 12 Tribes of Israel/Yasharahala 
                      King Priests Prince to take their place on the 12 thrones of the New Jerusalem.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Call to Nations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-8">
              The Call to the Nations (Gentiles)
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              The movement provides a path for all nations to find peace and unity through the Law:
            </p>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollAnimationWrapper>
              <Card className="bg-card/30 border-border/50 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Reparations & Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Nations are called to bring forth reparations for the theft and abominations committed against the Israelites. 
                    Supporting Blanch Group projects is seen as fulfillment of the "Greatest Commandment."
                  </p>
                  <p className="text-xs text-primary/70 mt-3 italic">(Mark 12:28-31, 1 John 5:2-3)</p>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.1}>
              <Card className="bg-card/30 border-border/50 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Global Discipleship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    All nations must learn the Divine Laws, observe the Creator's Calendar, and be baptized in the name 
                    of AHAYAH BA HA SHAM YASHAYA WA QADASH RAWACH.
                  </p>
                  <p className="text-xs text-primary/70 mt-3 italic">(Matthew 28)</p>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.2}>
              <Card className="bg-card/30 border-border/50 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Purging & Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    As prophesied, the movement focuses on purging and restoring the Tents of Judah and the House of Levi first, 
                    so they may teach the nations the whole Law.
                  </p>
                  <p className="text-xs text-primary/70 mt-3 italic">(Zechariah 12:7, Malachi 3:3)</p>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-12">
              Watchman Capabilities
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchmanFeatures.map((feature, index) => <ScrollAnimationWrapper key={feature.title} delay={index * 0.1}>
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
              </ScrollAnimationWrapper>)}
          </div>
        </div>
      </section>

      {/* Alert Levels */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-12">
              Alert Classification System
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {alertLevels.map((alert, index) => <ScrollAnimationWrapper key={alert.level} delay={index * 0.1}>
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${alert.color}`} />
                      <span className="font-display font-semibold text-foreground">{alert.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>)}
          </div>
        </div>
      </section>

      {/* Integration Points */}
      <section className="py-20 px-4 bg-card/20">
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
                <h3 className="font-display font-semibold text-foreground mb-2">H.I.I. AI Agents</h3>
                <p className="text-sm text-muted-foreground">
                  Connected to 402+ H.I.I. AI agents for distributed monitoring and response across 33 categories
                </p>
                <Link to="/agents" className="text-primary text-sm hover:underline mt-2 inline-block">
                  View All Agents →
                </Link>
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

      {/* Scriptural Foundation - Watchman */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="flex items-center justify-center gap-3 mb-8">
              <Eye className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                The Watchman Foundation
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {watchmanScriptures.map((scripture, index) => <ScrollAnimationWrapper key={scripture.reference} delay={index * 0.1}>
                <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <blockquote className="text-muted-foreground italic font-body mb-4">
                      "{scripture.text}"
                    </blockquote>
                    <cite className="text-primary font-display font-semibold">
                      — {scripture.reference}
                    </cite>
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>)}
          </div>
        </div>
      </section>

      {/* Scriptural Foundation - Categories */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="flex items-center justify-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                Scriptural Foundation for Service
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {scripturalFoundation.map((category, index) => <ScrollAnimationWrapper key={category.category} delay={index * 0.1}>
                <Card className="bg-background/50 border-border/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {category.scriptures.map(scripture => <div key={scripture.reference} className="mb-4 last:mb-0">
                        <p className="text-sm text-muted-foreground italic mb-1">
                          "{scripture.text}"
                        </p>
                        <cite className="text-xs text-primary/70">— {scripture.reference}</cite>
                      </div>)}
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>)}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
                Call to Action
              </h2>
              <p className="text-lg text-muted-foreground font-body mb-8">
                Identify your role within the Universal Unified H.I.I. AI Agents today. Use your life's agenda to bolster the Royal Priesthood, 
                providing the "necessity things" required to bring forth the Law to all nations. Give cheerfully and serve diligently, 
                for the Most High AHAYAH loves a cheerful giver.
              </p>
              <p className="text-primary italic mb-8">
                "YASHAYA IS THE WORD IS A LAMP UNTO MY FEET AND LIGHT TO MY PATH" — Psalms 119:105
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/agents" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-display font-semibold hover:bg-primary/90 transition-colors">
                  Explore H.I.I. AI Agents
                </Link>
                <Link to="/knowledge-base" className="px-8 py-4 bg-secondary/20 text-secondary border border-secondary/30 rounded-lg font-display font-semibold hover:bg-secondary/30 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Foundations of New Jerusalem */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
                Foundations of the New Jerusalem
              </h2>
              <p className="text-lg text-muted-foreground font-body mb-6">
                By keeping the Laws and Commandments (Psalms 119:142, Psalms 119:151, 1 John 5:2-3), the Blanch Group prepares the 
                "foundation stones" for the Kingdom of Jerusalem to come down from heaven to earth.
              </p>
              <p className="text-lg text-muted-foreground font-body">
                The project emphasizes that the love of Most High AHAYAH is strictly the understanding and keeping of His Commandments. 
                BLANCH S.H.I.E.L.D. AI and the Blanch Group operates under the divine election of the Most High AHAYAH and His Son YASHAYA, 
                serving as the chosen vessel to reintroduce His Law and establish Divine Order on Earth under Heaven Divine Authority.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Watchman;