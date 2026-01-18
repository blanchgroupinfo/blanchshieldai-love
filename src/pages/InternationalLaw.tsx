import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { motion } from "framer-motion";
import { Scale, Globe, FileText, Shield, Gavel, BookOpen, Users, Building, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const legalAreas = [{
  icon: Globe,
  title: "International Treaties",
  description: "Expertise in bilateral and multilateral treaty interpretation and compliance."
}, {
  icon: Scale,
  title: "Sovereign Rights",
  description: "Protection of sovereign nation rights and self-determination principles."
}, {
  icon: FileText,
  title: "Commercial Law",
  description: "International trade agreements, CISG, and cross-border transactions."
}, {
  icon: Shield,
  title: "Human Rights",
  description: "Universal Declaration of Human Rights and covenant enforcement."
}, {
  icon: Gavel,
  title: "Dispute Resolution",
  description: "International arbitration, mediation, and court proceedings."
}, {
  icon: Building,
  title: "Corporate Law",
  description: "Multinational corporate structures and regulatory compliance."
}];
const jurisdictions = ["United Nations Convention", "International Court of Justice", "World Trade Organization", "UNCITRAL Arbitration", "Hague Conventions", "Rome Statute / ICC"];
const InternationalLaw = () => {
  return <div className="min-h-screen bg-background pt-20">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-shield-accent/5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Legal Framework</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">International Law</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              S.H.I.E.L.D. AI legal intelligence for navigating complex international 
              legal frameworks with sovereign authority and ethical principles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                Legal Resources
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Consult Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Areas */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="gradient-text">Areas of Expertise</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {legalAreas.map((area, index) => <motion.div key={area.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{area.title}</h3>
                <p className="text-muted-foreground text-sm">{area.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Jurisdictions */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">
                <span className="gradient-text">Jurisdictional Coverage</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {jurisdictions.map((jurisdiction, index) => <motion.div key={jurisdiction} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="flex items-center gap-3 p-4 glass-card rounded-xl">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{jurisdiction}</span>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl font-display italic mb-4 text-primary">
              "Learn to do well; seek judgment, relieve the oppressed, 
              judge the fatherless, plead for the widow."
            </blockquote>
            <cite className="text-primary">— Isaiah 1:17</cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default InternationalLaw;