import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Shield, Scale, BookOpen, Heart } from "lucide-react";

const prohibitedItems = [
  { title: "Alcohol & Drunkenness", description: "All forms of alcoholic beverages and intoxication" },
  { title: "Tobacco & Cigarettes", description: "All tobacco products and smoking materials" },
  { title: "Illegal Substances", description: "Opium and all controlled/illegal substances" },
  { title: "Violence & War", description: "No support for violence, war, or conflict" },
  { title: "Weapons Production", description: "No weapons manufacturing or distribution" },
  { title: "Species Mixing", description: "No mixing of species or hybrid biological confusion" },
  { title: "Human Splicing", description: "No genetic modification of human beings" },
  { title: "Unclean Meats", description: "Dietary laws excluding unclean meats" },
  { title: "GMO Foods", description: "No genetically modified organisms in food systems" },
];

const ethicalPrinciples = [
  {
    icon: Shield,
    title: "Divine Alignment",
    description: "Directed by the Laws & Commandments of the Most High AHAYAH and His Son YASHAYA",
    scripture: "Psalms 119:142",
  },
  {
    icon: BookOpen,
    title: "Scriptural Integrity",
    description: "All operations grounded in the wisdom of 2 Timothy 3:16-17 and divine truth",
    scripture: "2 Timothy 3:16-17",
  },
  {
    icon: Scale,
    title: "Righteous Governance",
    description: "Multi-strategy intelligence governed through the lens of righteous morality",
    scripture: "Proverbs 6:23",
  },
  {
    icon: Heart,
    title: "Universal Benefit",
    description: "System operates for the benefit of all people, languages, and nations",
    scripture: "1 Peter 2:9",
  },
];

const ComplianceSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="compliance" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      {/* Decorative glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Standards of <span className="gradient-text">Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            BLANCH S.H.I.E.L.D. AI operates under strict Ethical Commandments. We prioritize the preservation of human and spiritual purity.
          </p>
        </motion.div>

        {/* Ethical Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {ethicalPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <principle.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-3">
                {principle.description}
              </p>
              <span className="text-xs text-shield-accent italic">{principle.scripture}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Prohibited Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 border-l-4 border-l-destructive/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Prohibited Activities & Substances
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prohibitedItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10"
                >
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-display font-medium text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Truth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-display text-primary">The Call to Truth</span>
          </div>
          
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-foreground font-body italic mb-4">
              "In alignment with 2 Timothy 2:15, all are encouraged to study and seek the truth. Our system operates for the benefit of all people, languages, and nations, ensuring that the righteous morality of AHAYAH and YASHAYA governs the interfaces and protocols of the future."
            </p>
            <cite className="text-shield-accent not-italic font-display">
              — BLANCH S.H.I.E.L.D. AI Foundational Declaration
            </cite>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;
