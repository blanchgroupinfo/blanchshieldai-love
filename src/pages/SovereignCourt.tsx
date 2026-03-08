import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { Scale, Shield, Gavel, FileCheck, Users, CheckCircle, BookOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
const courtFeatures = [{
  icon: Scale,
  title: "Fair Adjudication",
  description: "AI-assisted dispute resolution ensuring impartial and just outcomes."
}, {
  icon: FileCheck,
  title: "Document Validation",
  description: "Blockchain-verified document authentication and chain of custody."
}, {
  icon: Users,
  title: "Multi-Party Arbitration",
  description: "Efficient resolution of complex multi-stakeholder disputes."
}, {
  icon: Eye,
  title: "Transparency",
  description: "Open proceedings with immutable records on distributed ledger."
}, {
  icon: Gavel,
  title: "Binding Decisions",
  description: "Enforceable rulings recognized across partner jurisdictions."
}, {
  icon: BookOpen,
  title: "Legal Precedents",
  description: "Comprehensive database of case law and precedent analysis."
}];
const validationServices = ["Identity Authentication", "Document Verification", "Contract Validation", "Asset Provenance", "Transaction Certification", "Compliance Attestation"];
const SovereignCourt = () => {
  return <div className="min-h-screen bg-background pt-20">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-shield-accent/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Gavel className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Justice System</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">S.H.I.E.L.D. AI</span>
              <br />
              <span className="text-foreground">Sovereign Court & Validation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered sovereign court system providing fair dispute resolution 
              and document validation with immutable blockchain verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2">
                <FileCheck className="w-5 h-5" />
                Submit for Validation
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Scale className="w-5 h-5" />
                File Dispute
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Court Features */}
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
              <span className="gradient-text">Court Capabilities</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courtFeatures.map((feature, index) => <motion.div key={feature.title} initial={{
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
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Validation Services */}
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
                <span className="gradient-text">Validation Services</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {validationServices.map((service, index) => <motion.div key={service} initial={{
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
                  <span className="text-sm font-medium">{service}</span>
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
              "Judges and officers shalt thou make thee in all thy gates... 
              and they shall judge the people with just judgment."
            </blockquote>
            <cite className="text-primary">— Deuteronomy 16:18</cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default SovereignCourt;