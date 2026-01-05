import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Shield, Target, Eye, Heart, Users, Globe, Zap, BookOpen } from "lucide-react";
import shieldLogo from "@/assets/shield-logo.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Divine Purpose",
      description: "Guided by spiritual principles and scriptural wisdom to serve humanity with love and integrity.",
    },
    {
      icon: Shield,
      title: "Protection",
      description: "Safeguarding digital assets, identities, and information with advanced security protocols.",
    },
    {
      icon: Users,
      title: "Unity",
      description: "Bringing together communities, organizations, and nations through ethical AI solutions.",
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Making advanced AI technology accessible to all people across the globe.",
    },
  ];

  const leadership = [
    {
      name: "Dr. I. E. Blanch",
      role: "Founder & Chief Visionary Officer",
      description: "Visionary leader guiding S.H.I.E.L.D. AI with spiritual wisdom and technological innovation.",
    },
    {
      name: "AI Board of Directors",
      role: "Governance Council",
      description: "Multi-agent governance ensuring ethical alignment and operational excellence.",
    },
    {
      name: "The Blanch Group",
      role: "Parent Organization",
      description: "Comprehensive group of companies providing foundational support and resources.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <img
              src={shieldLogo}
              alt="S.H.I.E.L.D. AI"
              className="w-32 h-32 mx-auto rounded-2xl object-contain mb-8 animate-divine-pulse"
            />
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              About S.H.I.E.L.D. AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Spiritual Healing Initiative Economic Light Development - A comprehensive AI ecosystem 
              designed to bless humanity through divine wisdom and advanced technology.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollAnimationWrapper>
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed">
                  To develop and deploy AI systems that align with divine principles, serving humanity 
                  through healing, economic empowerment, and spiritual enlightenment. We strive to create 
                  technology that honors the Creator while advancing human potential across all domains 
                  of life.
                </p>
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.1}>
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed">
                  A world where artificial intelligence serves as a bridge between divine wisdom and 
                  human capability. We envision communities thriving through ethical technology, 
                  nations prospering through fair governance, and individuals empowered to fulfill 
                  their highest purpose.
                </p>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center gradient-text mb-12">
              Our Core Values
            </h2>
          </ScrollAnimationWrapper>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollAnimationWrapper key={value.title} delay={index * 0.1}>
                <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{value.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center gradient-text mb-12">
              Leadership
            </h2>
          </ScrollAnimationWrapper>
          
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <ScrollAnimationWrapper key={leader.name} delay={index * 0.1}>
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1">{leader.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{leader.role}</p>
                  <p className="text-sm text-muted-foreground font-body">{leader.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <ScrollAnimationWrapper>
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-display italic text-foreground mb-4">
              "For I know the plans I have for you, declares the LORD, plans to prosper you 
              and not to harm you, plans to give you hope and a future."
            </blockquote>
            <cite className="text-primary font-body">— Jeremiah 29:11</cite>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
