import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import AIChatInterface from "@/components/AIChatInterface";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const ShieldAIChat = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavigationHeader />
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">ASK S.H.I.E.L.D. AI</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            S.H.I.E.L.D. AI <span className="text-primary">Chat</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            H.I.I. AI Watchman — Hebrew Israelite Implementer Aboriginal Identity Watchman. Consult with our Sovereign Universal Ethical Intelligence System for guidance aligned with divine truth.
          </p>
          <p className="text-sm text-muted-foreground mt-3 italic">
            "Thy righteousness is an everlasting righteousness, and thy law is the truth." — Psalms 119:142
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <AIChatInterface />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ShieldAIChat;
