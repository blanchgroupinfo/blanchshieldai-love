import { motion } from "framer-motion";
import { BookOpen, Video, FileText, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const educationResources = [
  {
    title: "Trading Fundamentals",
    description: "Learn the basics of trading, market analysis, and risk management.",
    icon: BookOpen,
    type: "Course",
    lessons: 12,
  },
  {
    title: "Technical Analysis Mastery",
    description: "Master chart patterns, indicators, and advanced technical analysis.",
    icon: GraduationCap,
    type: "Course",
    lessons: 24,
  },
  {
    title: "Bank Instruments Guide",
    description: "Complete guide to SBLC, MTN, LTN, and bank instrument trading.",
    icon: FileText,
    type: "Guide",
    lessons: 8,
  },
  {
    title: "Cryptocurrency Trading",
    description: "Everything about crypto markets, DeFi, and blockchain trading.",
    icon: Video,
    type: "Video Series",
    lessons: 16,
  },
  {
    title: "SWIFT & MT Messages",
    description: "Understanding MT101-MT999 messages and MX migration.",
    icon: FileText,
    type: "Guide",
    lessons: 6,
  },
  {
    title: "AI Trading Strategies",
    description: "How to use AI for hedging, strategy creation, and automated trading.",
    icon: GraduationCap,
    type: "Course",
    lessons: 18,
  },
];

const TradingEducation = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Educational Center
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn <span className="text-primary">Trading Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive courses, guides, and resources to master trading across all markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/70 border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <resource.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {resource.lessons} lessons
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <GraduationCap className="w-5 h-5 mr-2" />
            Explore All Courses
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingEducation;
