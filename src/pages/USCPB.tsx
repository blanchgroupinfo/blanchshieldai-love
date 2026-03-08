import { useState } from "react";
import { motion } from "framer-motion";
import {
    Landmark, TrendingUp, CreditCard, Wallet, Shield, Lock,
    ArrowLeftRight, PiggyBank, LineChart, DollarSign, Building2,
    Globe, Users, Award, CheckCircle2, Sparkles, ChevronRight,
    BarChart3, Percent, Clock, FileText, Phone, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";


const USCPB = () => {
    const [activeService, setActiveService] = useState<string | null>(null);

    const services = [
        {
            id: "banking",
            title: "Private Banking",
            description: "Exclusive banking services for high-net-worth individuals",
            icon: Landmark,
            color: "from-blue-500/20 to-indigo-500/20",
            features: [
                "Personalized Account Management",
                "Premium Checking & Savings",
                "Multi-Currency Accounts",
                "24/7 Concierge Banking",
                "Exclusive Interest Rates",
                "Priority Customer Service"
            ]
        },
        {
            id: "trading",
            title: "Trading & Investments",
            description: "Advanced trading platforms and investment opportunities",
            icon: TrendingUp,
            color: "from-green-500/20 to-emerald-500/20",
            features: [
                "Stock & ETF Trading",
                "Forex & Commodities",
                "Cryptocurrency Trading",
                "Options & Futures",
                "Portfolio Management",
                "Real-Time Market Data"
            ]
        },
        {
            id: "credit",
            title: "Credit & Lending",
            description: "Flexible credit solutions tailored to your needs",
            icon: CreditCard,
            color: "from-purple-500/20 to-pink-500/20",
            features: [
                "Premium Credit Cards",
                "Personal Lines of Credit",
                "Business Loans",
                "Mortgage Services",
                "Auto Financing",
                "Competitive Interest Rates"
            ]
        },
        {
            id: "wealth",
            title: "Wealth Management",
            description: "Comprehensive wealth planning and advisory services",
            icon: PiggyBank,
            color: "from-amber-500/20 to-orange-500/20",
            features: [
                "Financial Planning",
                "Estate Planning",
                "Tax Optimization",
                "Retirement Planning",
                "Trust Services",
                "Legacy Planning"
            ]
        }
    ];

    const benefits = [
        {
            icon: Shield,
            title: "FDIC Insured",
            description: "Your deposits are protected up to $250,000"
        },
        {
            icon: Lock,
            title: "Bank-Level Security",
            description: "Military-grade encryption and security protocols"
        },
        {
            icon: Globe,
            title: "Global Access",
            description: "Access your accounts from anywhere in the world"
        },
        {
            icon: Award,
            title: "Award-Winning Service",
            description: "Recognized for excellence in private banking"
        }
    ];

    const stats = [
        { label: "Assets Under Management", value: "$50B+", icon: DollarSign },
        { label: "Client Satisfaction", value: "98%", icon: Users },
        { label: "Years of Excellence", value: "25+", icon: Award },
        { label: "Global Locations", value: "150+", icon: Building2 }
    ];

    return (
        <div className="min-h-screen bg-background">
            <NavigationHeader />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                                    <Landmark className="w-12 h-12 text-blue-400" />
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
                                U.S. Capital Private Bank
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Premier Financial Services • Banking Excellence • Investment Solutions
                            </p>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                                Experience world-class private banking with personalized service, cutting-edge technology,
                                and comprehensive financial solutions designed for discerning clients.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button size="lg" className="gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Open an Account
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Phone className="w-5 h-5" />
                                    Contact a Banker
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 border-y border-border/20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="flex justify-center mb-3">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                            <stat.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-display font-bold gradient-text mb-4">
                                Comprehensive Financial Services
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Everything you need to manage, grow, and protect your wealth
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setActiveService(service.id)}
                                    onMouseLeave={() => setActiveService(null)}
                                >
                                    <Card className="h-full glass-card hover:border-primary/30 transition-all duration-300">
                                        <CardHeader>
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                                                <service.icon className="w-8 h-8 text-primary" />
                                            </div>
                                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                                            <CardDescription className="text-base">
                                                {service.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {service.features.map((feature, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{
                                                            opacity: activeService === service.id ? 1 : 0.7,
                                                            x: activeService === service.id ? 0 : -10
                                                        }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                        <span className="text-muted-foreground">{feature}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                            <Button className="w-full mt-6 gap-2" variant="outline">
                                                Learn More
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-display font-bold gradient-text mb-4">
                                Why Choose USCPB?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Experience the difference of true private banking
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="glass-card h-full text-center">
                                        <CardContent className="pt-6">
                                            <div className="flex justify-center mb-4">
                                                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                                    <benefit.icon className="w-8 h-8 text-blue-400" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                            <p className="text-muted-foreground">{benefit.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Account Types */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-display font-bold gradient-text mb-4">
                                Account Options
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Choose the account that fits your financial goals
                            </p>
                        </motion.div>

                        <Tabs defaultValue="personal" className="max-w-4xl mx-auto">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="personal">Personal</TabsTrigger>
                                <TabsTrigger value="business">Business</TabsTrigger>
                                <TabsTrigger value="investment">Investment</TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal" className="mt-6">
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Personal Banking Accounts</CardTitle>
                                        <CardDescription>Tailored for individual financial needs</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Wallet className="w-5 h-5 text-blue-400" />
                                                    Premium Checking
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    No monthly fees • Unlimited transactions • Free wire transfers
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">Open Account</Button>
                                            </div>
                                            <div className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <PiggyBank className="w-5 h-5 text-green-400" />
                                                    High-Yield Savings
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Competitive APY • No minimum balance • FDIC insured
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">Open Account</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="business" className="mt-6">
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Business Banking Solutions</CardTitle>
                                        <CardDescription>Powerful tools for growing businesses</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Building2 className="w-5 h-5 text-indigo-400" />
                                                    Business Checking
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Cash management • Merchant services • Online banking
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">Open Account</Button>
                                            </div>
                                            <div className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <LineChart className="w-5 h-5 text-purple-400" />
                                                    Business Credit Line
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Flexible financing • Competitive rates • Quick approval
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">Apply Now</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="investment" className="mt-6">
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Investment Accounts</CardTitle>
                                        <CardDescription>Build and manage your investment portfolio</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                                    Brokerage Account
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Trade stocks, ETFs, options • Low commissions • Research tools
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">Get Started</Button>
                                            </div>
                                            <div className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <BarChart3 className="w-5 h-5 text-amber-400" />
                                                    Managed Portfolio
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Professional management • Diversified • Tax-efficient
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* API Endpoints Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-display font-bold gradient-text mb-4">
                                API Endpoints
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Integrate USCPB services into your applications
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                {
                                    method: "POST",
                                    endpoint: "/api/v1/lc/issue",
                                    description: "Issue new Letter of Credit",
                                    color: "from-blue-500/20 to-indigo-500/20",
                                    methodColor: "bg-blue-500/20 text-blue-400"
                                },
                                {
                                    method: "GET",
                                    endpoint: "/api/v1/lc/{id}",
                                    description: "Get LC details",
                                    color: "from-green-500/20 to-emerald-500/20",
                                    methodColor: "bg-green-500/20 text-green-400"
                                },
                                {
                                    method: "POST",
                                    endpoint: "/api/v1/transfer",
                                    description: "Initiate cross-border transfer",
                                    color: "from-purple-500/20 to-pink-500/20",
                                    methodColor: "bg-purple-500/20 text-purple-400"
                                },
                                {
                                    method: "POST",
                                    endpoint: "/api/v1/nft/mint",
                                    description: "Mint NFT instrument",
                                    color: "from-amber-500/20 to-orange-500/20",
                                    methodColor: "bg-amber-500/20 text-amber-400"
                                },
                                {
                                    method: "GET",
                                    endpoint: "/api/v1/wallet/balance",
                                    description: "Get wallet balances",
                                    color: "from-cyan-500/20 to-blue-500/20",
                                    methodColor: "bg-cyan-500/20 text-cyan-400"
                                }
                            ].map((api, index) => (
                                <motion.div
                                    key={api.endpoint}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="glass-card h-full hover:border-primary/30 transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${api.methodColor}`}>
                                                    {api.method}
                                                </div>
                                            </div>
                                            <CardTitle className="text-sm font-mono break-all">
                                                {api.endpoint}
                                            </CardTitle>
                                            <CardDescription className="text-base mt-2">
                                                {api.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button variant="outline" size="sm" className="w-full gap-2">
                                                View Documentation
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                            <h2 className="text-4xl font-display font-bold gradient-text mb-6">
                                Ready to Experience Private Banking Excellence?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                Join thousands of satisfied clients who trust USCPB for their financial needs
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button size="lg" className="gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Open Your Account Today
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Mail className="w-5 h-5" />
                                    Schedule a Consultation
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-6">
                                Member FDIC • Equal Housing Lender • SIPC Protected
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <FloatingChat />
        </div>
    );
};

export default USCPB;
