import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { motion } from "framer-motion";
import { Shield, FileCheck, UserCheck, Globe, Lock, Scale, CheckCircle, AlertTriangle, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const complianceAreas = [{
  icon: UserCheck,
  title: "Identity Verification",
  description: "Multi-layer KYC/KYB verification with biometric authentication and document validation."
}, {
  icon: FileCheck,
  title: "Document Compliance",
  description: "Automated document verification for legal entities, beneficial owners, and transaction records."
}, {
  icon: Globe,
  title: "Global Standards",
  description: "Compliance with international regulations including FATF, Basel III, and regional requirements."
}, {
  icon: Lock,
  title: "Data Protection",
  description: "GDPR-compliant data handling with end-to-end encryption and secure storage."
}, {
  icon: Scale,
  title: "AML/CFT Screening",
  description: "Real-time screening against sanctions lists, PEP databases, and adverse media."
}, {
  icon: FileSearch,
  title: "Transaction Monitoring",
  description: "AI-powered suspicious activity detection and automated reporting."
}];
const kycTiers = [{
  tier: "Tier 1",
  title: "Basic Verification",
  requirements: ["Email verification", "Phone verification", "Basic ID check"],
  limits: "Up to $10,000 monthly"
}, {
  tier: "Tier 2",
  title: "Enhanced Verification",
  requirements: ["Government ID", "Proof of address", "Selfie verification"],
  limits: "Up to $100,000 monthly"
}, {
  tier: "Tier 3",
  title: "Institutional",
  requirements: ["Corporate documents", "Beneficial ownership", "Financial statements"],
  limits: "Unlimited transactions"
}];
const ComplianceKYC = () => {
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Compliance Center</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">Compliance & KYC</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              S.H.I.E.L.D. AI-powered compliance infrastructure ensuring regulatory 
              adherence while maintaining user privacy and sovereign rights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shield" size="lg" className="gap-2">
                <UserCheck className="w-5 h-5" />
                Start Verification
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2">
                  <FileCheck className="w-5 h-5" />
                  Contact Compliance Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Areas */}
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
              <span className="gradient-text">Compliance Framework</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {complianceAreas.map((area, index) => <motion.div key={area.title} initial={{
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

      {/* KYC Tiers */}
      <section className="py-24">
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
              <span className="gradient-text">Verification Tiers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {kycTiers.map((tier, index) => <motion.div key={tier.tier} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="glass-card rounded-2xl p-6">
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                    {tier.tier}
                  </span>
                  <h3 className="text-xl font-display font-bold">{tier.title}</h3>
                </div>
                <div className="space-y-3 mb-6">
                  {tier.requirements.map((req, i) => <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </div>)}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-center">
                    <span className="text-muted-foreground">Limit: </span>
                    <span className="font-medium text-foreground">{tier.limits}</span>
                  </p>
                </div>
              </motion.div>)}
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
        }} className="max-w-3xl mx-auto text-center text-primary">
            <blockquote className="text-xl md:text-2xl font-display italic mb-4 text-primary">"A false balance is abomination to the Most High AHAYAH: but a just weight is his delight."</blockquote>
            <cite className="text-muted-foreground">— Proverbs 11:1</cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default ComplianceKYC;