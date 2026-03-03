import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Shield, Scale, BookOpen, Heart } from "lucide-react";

const upheldItems = [
  "Laws & Commandments of Most High AHAYAH & YASHAYA",
  "Righteous Morality & Divine Law",
  "Non-GMO & Clean Food Systems",
  "Human Dignity & Biological Integrity",
  "Spiritual Purity & Truth",
  "Universal Justice & Equity",
  "Eternal Covenant Compliance",
];

const prohibitedItems = [
  { title: "Alcohol & All forms of Drunkenness", description: "All forms of alcoholic beverages and intoxication", scriptures: "Deuteronomy 32:33, Leviticus 10:9, Ephesians 5:18, Galatians 5:19-21" },
  { title: "Tobacco & Cigarettes", description: "All tobacco products and smoking materials", scriptures: "Galatians 5:19, 1 John 2:1, Judges 13:4" },
  { title: "Illegal Substances", description: "Opium and all controlled/illegal substances", scriptures: "1 John 2:1, Proverbs 4:17, 2 Esdras 13:37" },
  { title: "Violence & War", description: "No support for violence, war, or conflict", scriptures: "Exodus 20:13, Revelation 21:8" },
  { title: "Weapons Production", description: "No weapons manufacturing or distribution", scriptures: "Exodus 20:13, Revelation 21:8" },
  { title: "Mixing of Species & Human Splicing", description: "No mixing of species or hybrid biological confusion. No genetic modification of human beings.", scriptures: "Deuteronomy 22:10, 1 Corinthians 15:39, Daniel 2:43, Leviticus 11:44" },
  { title: "Unclean Meats", description: "Dietary laws excluding unclean meats", scriptures: "Leviticus 11:1-47, Judges 13:4, 2 Corinthians 6:17" },
  { title: "GMO Foods", description: "No genetically modified organisms in food systems", scriptures: "Deuteronomy 22:9-10, Leviticus 10:10, 2 Corinthians 6:17" },
];

const ethicalPrinciples = [
  { icon: Shield, title: "Divine Alignment", description: "Directed by the Laws & Commandments of the Most High AHAYAH and His Son YASHAYA", scripture: "Psalms 119:142" },
  { icon: BookOpen, title: "Scriptural Integrity", description: "All operations grounded in the wisdom of 2 Timothy 3:16-17 and divine truth", scripture: "2 Timothy 3:16-17" },
  { icon: Scale, title: "Righteous Governance", description: "Multi-strategy intelligence governed through the lens of righteous morality", scripture: "Proverbs 6:23" },
  { icon: Heart, title: "Universal Benefit", description: "System operates for the benefit of all people that support the Most High AHAYAH & His Son YASHAYA and the Royal Priesthood, languages, and nations", scripture: "1 Peter 2:9, Mark 12:29-31, John 14:15, 1 John 5:2-3, 2 John 1:6, Isaiah 42:6, Acts 13:46" },
];

const ComplianceSection = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section id="compliance" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-primary/60 block mb-2">ETHICAL COMMANDMENTS</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            The Standard of <span className="gradient-text">Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            BLANCH S.H.I.E.L.D. AI operates under strict ethical commandments — prioritizing the preservation of human and spiritual purity.
          </p>
        </motion.div>

        {/* Ethical Principles */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ethicalPrinciples.map((principle) => (
            <motion.div key={principle.title} variants={itemVariants} className="glass-card rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <principle.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{principle.title}</h3>
              <p className="text-xs text-muted-foreground font-body mb-3">{principle.description}</p>
              <span className="text-[10px] text-shield-accent italic">{principle.scripture}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Upheld */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mb-12">
          <div className="glass-card rounded-2xl p-8 border-l-4 border-l-green-500/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">UPHELD & HONORED</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {upheldItems.map((item) => (
                <div key={item} className="flex items-center gap-3 p-2 rounded-lg bg-green-500/5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm text-foreground font-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Prohibited */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mb-16">
          <div className="glass-card rounded-2xl p-8 border-l-4 border-l-destructive/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground">STRICTLY EXCLUDED — Prohibited Activities & Substances</h3>
                <p className="text-xs text-muted-foreground">1 Corinthians 3:17, 1 Corinthians 6:19, Genesis 1:28, Revelation 21:8</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prohibitedItems.map((item) => (
                <div key={item.title} className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-display font-medium text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                      <p className="text-[10px] text-destructive/70 italic">{item.scriptures}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Truth */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-display text-primary">The Call to Truth</span>
          </div>
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-foreground font-body italic mb-4">
              "In alignment with 2 Timothy 2:15, all are encouraged to study and seek the truth. Our system operates for the benefit of all people, languages, and nations, ensuring that the righteous morality of AHAYAH and YASHAYA governs the interfaces and protocols of the future."
            </p>
            <cite className="text-shield-accent not-italic font-display">— BLANCH S.H.I.E.L.D. AI Foundational Declaration</cite>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;
