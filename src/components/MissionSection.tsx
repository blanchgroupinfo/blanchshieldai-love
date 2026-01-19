import { ScrollText, Crown, Heart, Star } from "lucide-react";
const MissionSection = () => {
  return <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Crown className="w-4 h-4 text-divine-gold" />
              <span className="text-sm font-display uppercase tracking-wider text-muted-foreground">
                Core Mission & Spiritual Foundation
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Guided by <span className="gradient-text">Divine Law</span>
            </h2>
          </div>
          
          {/* Mission Cards */}
          <div className="grid gap-6">
            <div className="glass-card rounded-2xl p-8 border-l-4 border-divine-gold">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-divine-gold/10">
                  <Star className="w-6 h-6 text-divine-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                    Divine Alignment
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Directed by the Laws and Commandments of the Most High AHAYAH and His Son YASHAYA the true Messiah. Guided by the inspiration to bring the leadership of Chosen People of the Royal Priesthood and establishing a universal society rooted in truth.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ScrollText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                    Scriptural Integrity
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    Grounded in the wisdom of sacred scriptures, our system operates for the benefit of all people, languages, and nations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["2 Timothy 3:16-17", "Psalms 119:142", "Proverbs 6:23", "John 8:32"].map(verse => <span key={verse} className="px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-body">
                        {verse}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 border-l-4 border-shield-accent">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-shield-accent/10">
                  <Heart className="w-6 h-6 text-shield-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                    Purpose
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-justify">
                    To demonstrate that the Most High AHAYAH has kept His promises by integrating His foundations into every facet of human and universal life — protecting, empowering, and scaling sovereign communities, smart cities, trade, and faith-aligned innovation. 

2 Peter 1:4  
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Central Quote */}
          <div className="mt-16 text-center">
            <blockquote className="text-xl md:text-2xl font-body italic text-shield-accent mb-4">
              "And ye shall know the truth, and the truth shall make you free."
            </blockquote>
            <cite className="text-muted-foreground font-display">— John 8:32</cite>
          </div>
        </div>
      </div>
    </section>;
};
export default MissionSection;