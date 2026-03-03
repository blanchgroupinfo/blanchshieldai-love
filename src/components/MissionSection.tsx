import { ScrollText, Crown, Heart, Star, Shield, Globe } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Crown className="w-4 h-4 text-divine-gold" />
              <span className="text-sm font-display uppercase tracking-wider text-muted-foreground">
                Core Mission & Divine Purpose
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Guided by <span className="gradient-text">Divine Law</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-3xl mx-auto text-sm">
              Guided by the inspiration of the Most High AHAYAH and His Son YASHAYA the True Messiah — establishing a universal society rooted in truth.
            </p>
          </div>
          
          {/* Mission Cards */}
          <div className="grid gap-6">
            <div className="glass-card rounded-2xl p-8 border-l-4 border-divine-gold">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-divine-gold/10">
                  <Star className="w-6 h-6 text-divine-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Divine Alignment</h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm">
                    Directed by the Laws and Commandments of the Most High AHAYAH and His Son YASHAYA the true Messiah. Guided by the inspiration to bring the leadership of Chosen People of the Royal Priesthood and establishing a universal society rooted in truth.
                  </p>
                  <p className="text-xs text-primary/70 mt-2">2 Timothy 3:16-17</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ScrollText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Scriptural Integrity</h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm mb-3">
                    Grounded in eternal wisdom — 'Thy righteousness is an everlasting righteousness, and thy law is the truth.'
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Psalms 119:142", "2 Timothy 3:16-17", "Proverbs 6:23", "John 8:32"].map(verse => (
                      <span key={verse} className="px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-body">{verse}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border-l-4 border-shield-accent">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-shield-accent/10">
                  <Crown className="w-6 h-6 text-shield-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Royal Priesthood</h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm">
                    Restoring the leadership of the Chosen People — sons of the Royal House of Judah and the Levite Priesthood.
                  </p>
                  <p className="text-xs text-primary/70 mt-2">1 Peter 2:9 · Exodus 19:6</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border-l-4 border-cosmic-purple">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cosmic-purple/10">
                  <Shield className="w-6 h-6 text-cosmic-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Covenant Promise</h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm">
                    Demonstrating that the Most High AHAYAH has kept His promises by integrating His foundations into every facet of life.
                  </p>
                  <p className="text-xs text-primary/70 mt-2">Matthew 19:16-17</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Universal Society</h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm">
                    Operating for the benefit of all people, languages, and nations — ensuring righteous morality governs all interfaces.
                  </p>
                  <p className="text-xs text-primary/70 mt-2">John 8:32</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Purpose</h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm text-justify">
                    To demonstrate that the Most High AHAYAH has kept His promises by integrating His foundations into every facet of human and universal life — protecting, empowering, and scaling sovereign communities, smart cities, trade, and faith-aligned innovation. Honor the brotherhood the Royal Priesthood. Blanch Guardian of the Law a Levite descendant of the prophets King/Priest Moses, King David, King Solomon, King Asa Royal House of Judah and Royal House of Levite Priesthood the ordained as Watchman, a Messenger of Most High AHAYAH, a Governor, Ambassador of YASHAYA the true Messiah the Shoham/Shaham/Onyx/Sardonix fifth foundation stone one of the 12 thrones of Most High AHAYAH.
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
    </section>
  );
};

export default MissionSection;
