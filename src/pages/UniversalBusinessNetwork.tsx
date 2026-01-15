import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Users, 
  Building2, 
  Network, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Handshake,
  FileText,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

const UniversalBusinessNetwork = () => {
  const networkFeatures = [
    {
      icon: Globe,
      title: "Global Connectivity",
      description: "Connect with businesses across 190+ countries through our secure decentralized network."
    },
    {
      icon: Shield,
      title: "Verified Partners",
      description: "All network participants undergo rigorous KYB verification for trusted transactions."
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description: "Real-time cross-border payments with instant settlement in any currency."
    },
    {
      icon: Lock,
      title: "Secure Communications",
      description: "End-to-end encrypted messaging and document sharing between partners."
    }
  ];

  const networkStats = [
    { value: "50,000+", label: "Active Businesses" },
    { value: "190+", label: "Countries" },
    { value: "$2.5T", label: "Transaction Volume" },
    { value: "99.99%", label: "Uptime" }
  ];

  const membershipTiers = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Basic network access",
        "5 partner connections",
        "Standard verification",
        "Community support"
      ]
    },
    {
      name: "Business",
      price: "$299/mo",
      features: [
        "Unlimited connections",
        "Priority verification",
        "Advanced analytics",
        "API access",
        "Dedicated support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "White-label solutions",
        "Custom integrations",
        "Compliance toolkit",
        "24/7 premium support",
        "SLA guarantees"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-8">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Network className="w-3 h-3 mr-1" />
              Global Business Network
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Universal Business Network
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect, collaborate, and transact with verified businesses worldwide through our 
              secure, decentralized enterprise network.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Join Network <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Building2 className="w-4 h-4" /> Explore Partners
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {networkStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Network Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to expand your business globally with trusted partners.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {networkFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, icon: FileText, title: "Register & Verify", desc: "Complete KYB verification to join the network" },
              { step: 2, icon: Users, title: "Connect Partners", desc: "Discover and connect with verified businesses" },
              { step: 3, icon: Handshake, title: "Transact Securely", desc: "Execute deals with instant settlement" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <item.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Membership Plans</h2>
            <p className="text-muted-foreground">Choose the plan that fits your business needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${tier.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'}`}>
                  <CardHeader>
                    {tier.popular && (
                      <Badge className="w-fit mb-2 bg-primary text-primary-foreground">Most Popular</Badge>
                    )}
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="text-3xl font-bold">{tier.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={tier.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Expand Globally?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of businesses already leveraging our network for growth.
          </p>
          <Button size="lg" className="gap-2">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UniversalBusinessNetwork;
