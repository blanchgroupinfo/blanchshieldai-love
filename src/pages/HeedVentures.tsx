import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { Rocket, Target, Lightbulb, Users, TrendingUp, Shield, CheckCircle, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
const programBenefits = [{
  icon: Rocket,
  title: "Launch Support",
  description: "Full infrastructure and technical support to launch your venture on the H.I.I. AI platform."
}, {
  icon: Target,
  title: "Strategic Guidance",
  description: "Access to S.H.I.E.L.D. AI advisors and the complete agent network for business intelligence."
}, {
  icon: Users,
  title: "Network Access",
  description: "Connect with the Universal Business Network and global partnership opportunities."
}, {
  icon: TrendingUp,
  title: "Funding Pathways",
  description: "Access to sovereign capital, grants, and alternative financing through the Blanch Network."
}];
const eligibilityCriteria = ["Alignment with H.I.I. AI ethical principles and values", "Innovation in technology, finance, or community development", "Commitment to sovereign and decentralized operations", "Clear business plan with measurable objectives", "Potential for positive global impact"];
const HeedVentures = () => {
  const [formData, setFormData] = useState({
    ventureName: "",
    founderName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    fundingNeeded: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Venture submission received! We'll review and contact you within 48 hours.");
    setFormData({
      ventureName: "",
      founderName: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      fundingNeeded: "",
      timeline: ""
    });
    setIsSubmitting(false);
  };
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
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Venture Accelerator</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">The H.E.E.D.</span>
              <br />
              <span className="text-foreground">Ventures Program</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Helping Entrepreneurs Execute Dreams — Healtlh Education Enterpising Development Accelerating sovereign ventures aligned with ethical principles and global impact.<strong>H</strong>elping <strong>E</strong>ntrepreneurs <strong>E</strong>xecute <strong>D</strong>reams — 
              Accelerating sovereign ventures aligned with ethical principles and global impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
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
              <span className="gradient-text">Program Benefits</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {programBenefits.map((benefit, index) => <motion.div key={benefit.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="glass-card rounded-2xl p-6 text-center hover:border-primary/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Eligibility & Submission */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Eligibility */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="text-2xl font-display font-bold mb-6">Eligibility Criteria</h2>
              <div className="space-y-4">
                {eligibilityCriteria.map((criteria, index) => <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{criteria}</span>
                  </div>)}
              </div>
              
              <div className="mt-8 p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="font-display font-bold">Scriptural Foundation</h3>
                </div>
                <blockquote className="text-sm italic text-muted-foreground">
                  "For which of you, intending to build a tower, sitteth not down first, 
                  and counteth the cost, whether he have sufficient to finish it?"
                </blockquote>
                <cite className="text-xs text-muted-foreground mt-2 block">— Luke 14:28</cite>
              </div>
            </motion.div>

            {/* Submission Form */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold mb-6">Submit Your Venture</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Venture Name" value={formData.ventureName} onChange={e => setFormData({
                  ...formData,
                  ventureName: e.target.value
                })} required />
                  <Input placeholder="Founder Name" value={formData.founderName} onChange={e => setFormData({
                  ...formData,
                  founderName: e.target.value
                })} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required />
                  <Input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} />
                </div>
                <Input placeholder="Website (if any)" value={formData.website} onChange={e => setFormData({
                ...formData,
                website: e.target.value
              })} />
                <Textarea placeholder="Describe your venture and its mission..." value={formData.description} onChange={e => setFormData({
                ...formData,
                description: e.target.value
              })} rows={4} required />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Funding Needed (USD)" value={formData.fundingNeeded} onChange={e => setFormData({
                  ...formData,
                  fundingNeeded: e.target.value
                })} />
                  <Input placeholder="Launch Timeline" value={formData.timeline} onChange={e => setFormData({
                  ...formData,
                  timeline: e.target.value
                })} />
                </div>
                <Button type="submit" variant="shield" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : <>
                      <Send className="w-4 h-4" />
                      Submit Venture
                    </>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default HeedVentures;