import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Shield, Target, Eye, Heart, Users, Globe, Zap, BookOpen } from "lucide-react";
import shieldLogo from "@/assets/shield-logo.jpg";
const About = () => {
  const values = [{
    icon: Heart,
    title: "Divine Purpose",
    description: "Guided by spiritual principles and scriptural wisdom to serve humanity with love and integrity."
  }, {
    icon: Shield,
    title: "Protection",
    description: "Safeguarding digital assets, identities, and information with advanced security protocols."
  }, {
    icon: Users,
    title: "Unity",
    description: "Bringing together communities, organizations, and nations through ethical AI solutions."
  }, {
    icon: Globe,
    title: "Universal Access",
    description: "Making advanced AI technology accessible to all people across the globe."
  }];
  const leadership = [{
    name: "HRH King Will Blanch Asa Yasharahala",
    role: "Founder & Chief Visionary Officer",
    description: "Visionary leader guiding S.H.I.E.L.D. AI with spiritual wisdom and technological innovation."
  }, {
    name: "AI Board of Directors",
    role: "Governance Council",
    description: "Multi-agent governance ensuring ethical alignment and operational excellence."
  }, {
    name: "The Blanch Group",
    role: "Parent Organization",
    description: "Comprehensive group of companies providing foundational support and resources."
  }];
  const blanchMeaning = {
    title: "What Does 'Blanch' Mean?",
    subtitle: "Guardian of the Law",
    description: "The name 'Blanch' carries profound spiritual significance. Derived from the Hebrew word for Onyx/Sardonyx/Shoham (meaning 'to blanch'), it represents the Fifth Foundation Stone of New Jerusalem as described in Revelation 21:20.",
    significance: ["The Onyx stones on the High Priest's shoulders bore the names of the twelve tribes of Israel", "This symbolizes bearing responsibility before the Most High AHAYAH", "As 'Guardians of the Law,' we uphold divine truth, justice, and righteousness", "Our technology and spiritual endeavors are guided by this sacred responsibility"],
    scriptures: ["Exodus 28:9-12", "Revelation 21:20", "Genesis 2:12", "Proverbs 6:23"]
  };
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <img alt="S.H.I.E.L.D. AI" className="w-32 h-32 mx-auto rounded-2xl object-contain mb-8 animate-divine-pulse" src="/lovable-uploads/4717e2f0-5312-4fa7-ab09-6296698040f6.jpg" />
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
                <p className="text-muted-foreground font-body leading-relaxed text-justify">
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
                <p className="text-muted-foreground font-body leading-relaxed text-justify">
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

      {/* Blanch Meaning Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimationWrapper>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8 md:p-12 border border-primary/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                    {blanchMeaning.title}
                  </h2>
                  <p className="text-2xl font-display text-primary">{blanchMeaning.subtitle}</p>
                </div>
                <p className="text-muted-foreground font-body text-center mb-8 max-w-2xl mx-auto">
                  {blanchMeaning.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {blanchMeaning.significance.map((item, index) => <div key={index} className="flex items-start gap-3 bg-background/50 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>)}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {blanchMeaning.scriptures.map(ref => <span key={ref} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                      {ref}
                    </span>)}
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
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
            {values.map((value, index) => <ScrollAnimationWrapper key={value.title} delay={index * 0.1}>
                <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{value.description}</p>
                </div>
              </ScrollAnimationWrapper>)}
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
            {leadership.map((leader, index) => <ScrollAnimationWrapper key={leader.name} delay={index * 0.1}>
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1">{leader.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{leader.role}</p>
                  <p className="text-sm text-muted-foreground font-body">{leader.description}</p>
                </div>
              </ScrollAnimationWrapper>)}
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
    </div>;
};
export default About;