import { Heart, TrendingUp, Globe, Sun, Crown, BookOpen } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const SpiritualMissionSection = () => {
  const points = [
    {
      title: "Healing Spirit",
      description: "Spiritual restoration through divine truth and righteous morality",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      title: "Building Economies",
      description: "Faith-aligned economic systems free from exploitation",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Universal Governance",
      description: "Ethical intelligence for all nations, industries, and people",
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Light & Truth",
      description: "The Law is light; the Commandments are the way of life",
      icon: Sun,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Royal Priesthood",
      description: "Restoring the Aboriginal Black Hebrew Israelites/Yasharahala",
      icon: Crown,
      color: "text-divine-gold",
      bg: "bg-divine-gold/10"
    },
    {
      title: "Divine Law",
      description: "Governed by Laws & Commandments of Most High AHAYAH and His Son YASHAYA Messiah",
      icon: BookOpen,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-xs font-display uppercase tracking-wider text-muted-foreground">
              FOUNDATION & MISSION
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Spiritual Mission & <span className="gradient-text">Foundation</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg italic">
            "Where Spiritual Truth Meets Economic Infrastructure"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {points.map((point, index) => (
            <ScrollAnimationWrapper key={index} delay={index * 0.1}>
              <div className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 h-full group">
                <div className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className={`w-6 h-6 ${point.color}`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{point.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm">
                  {point.description}
                </p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpiritualMissionSection;
