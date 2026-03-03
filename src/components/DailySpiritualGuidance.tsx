import { BookOpen, Sun, Scale } from "lucide-react";
import { useMemo } from "react";

const dailyVerses = [
  { ref: "Psalms 119:151", text: "Thou art near, O Most High AHAYAH; and all thy commandments are truth." },
  { ref: "Psalms 119:142", text: "Thy righteousness is an everlasting righteousness, and thy law is the truth." },
  { ref: "Proverbs 6:23", text: "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life." },
  { ref: "John 8:32", text: "And ye shall know the truth, and the truth shall make you free." },
  { ref: "Psalms 33:20", text: "Our soul waiteth for the Most High AHAYAH: he is our help and our shield." },
  { ref: "Psalms 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
  { ref: "Proverbs 3:5", text: "Trust in the Most High AHAYAH with all thine heart; and lean not unto thine own understanding." },
];

const gospels = [
  { ref: "John 14:6", text: "YASHAYA saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." },
  { ref: "John 4:24", text: "Most High AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth." },
  { ref: "Matthew 28:18", text: "And YASHAYA came and spake unto them, saying, All power is given unto me in heaven and in earth." },
  { ref: "John 1:14", text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." },
];

const laws = [
  { ref: "Exodus 20:8", text: "Remember the sabbath day, to keep it holy." },
  { ref: "Exodus 20:3", text: "Thou shalt have no other gods before me." },
  { ref: "Deuteronomy 6:5", text: "And thou shalt love the Most High AHAYAH thy God with all thine heart, and with all thy soul, and with all thy might." },
  { ref: "Leviticus 19:18", text: "Thou shalt love thy neighbour as thyself: I am the Most High AHAYAH." },
  { ref: "Exodus 20:12", text: "Honour thy father and thy mother: that thy days may be long upon the land which the Most High AHAYAH thy God giveth thee." },
];

const DailySpiritualGuidance = () => {
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, []);

  const verse = dailyVerses[dayOfYear % dailyVerses.length];
  const gospel = gospels[dayOfYear % gospels.length];
  const law = laws[dayOfYear % laws.length];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Daily <span className="gradient-text">Spiritual Guidance</span>
          </h2>
          <p className="text-muted-foreground font-body">The Light of Truth — AI-powered daily scripture, updated every day</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Verse of the Day */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-primary" />
              <span className="text-xs font-display uppercase tracking-wider text-primary">Verse of the Day</span>
            </div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-3">Daily Scripture</h3>
            <blockquote className="text-sm text-muted-foreground font-body italic mb-3">
              "{verse.text}"
            </blockquote>
            <cite className="text-xs text-primary not-italic font-display">— {verse.ref}</cite>
          </div>

          {/* Gospel of the Day */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-shield-accent">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-shield-accent" />
              <span className="text-xs font-display uppercase tracking-wider text-shield-accent">Gospel of the Day</span>
            </div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-3">Good News</h3>
            <blockquote className="text-sm text-muted-foreground font-body italic mb-3">
              "{gospel.text}"
            </blockquote>
            <cite className="text-xs text-shield-accent not-italic font-display">— {gospel.ref}</cite>
          </div>

          {/* Law of the Day */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-divine-gold">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-divine-gold" />
              <span className="text-xs font-display uppercase tracking-wider text-divine-gold">Law of the Day</span>
            </div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-3">Laws & Commandments</h3>
            <blockquote className="text-sm text-muted-foreground font-body italic mb-3">
              "{law.text}"
            </blockquote>
            <cite className="text-xs text-divine-gold not-italic font-display">— {law.ref}</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailySpiritualGuidance;
