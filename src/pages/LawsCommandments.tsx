import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ScrollText, Scale, Shield, Heart, Users, Coins, Home, Search, ChevronRight } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
const LawsCommandments = () => {
  const [selectedCategory, setSelectedCategory] = useState("ten-commandments");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [{
    id: "ten-commandments",
    name: "Ten Commandments",
    icon: ScrollText,
    count: 10
  }, {
    id: "civil-laws",
    name: "Civil Laws",
    icon: Scale,
    count: 45
  }, {
    id: "dietary-laws",
    name: "Dietary Laws",
    icon: Heart,
    count: 18
  }, {
    id: "family-laws",
    name: "Family Laws",
    icon: Home,
    count: 32
  }, {
    id: "financial-laws",
    name: "Financial Laws",
    icon: Coins,
    count: 24
  }, {
    id: "moral-laws",
    name: "Moral Laws",
    icon: Shield,
    count: 56
  }, {
    id: "social-laws",
    name: "Social Laws",
    icon: Users,
    count: 38
  }, {
    id: "worship-laws",
    name: "Worship Laws",
    icon: Book,
    count: 29
  }];
  const lawsContent: Record<string, Array<{
    title: string;
    scripture: string;
    reference: string;
  }>> = {
    "ten-commandments": [{
      title: "No Other Gods",
      scripture: "Thou shalt have no other gods before me.",
      reference: "Exodus 20:3"
    }, {
      title: "No Graven Images",
      scripture: "Thou shalt not make unto thee any graven image...",
      reference: "Exodus 20:4-6"
    }, {
      title: "Name in Vain",
      scripture: "Thou shalt not take the name of AHAYAH thy God in vain...",
      reference: "Exodus 20:7"
    }, {
      title: "Remember the Sabbath",
      scripture: "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of AHAYAH thy God...",
      reference: "Exodus 20:8-11"
    }, {
      title: "Honor Parents",
      scripture: "Honour thy father and thy mother: that thy days may be long upon the land which AHAYAH thy God giveth thee.",
      reference: "Exodus 20:12"
    }, {
      title: "No Murder",
      scripture: "Thou shalt not kill.",
      reference: "Exodus 20:13"
    }, {
      title: "No Adultery",
      scripture: "Thou shalt not commit adultery.",
      reference: "Exodus 20:14"
    }, {
      title: "No Stealing",
      scripture: "Thou shalt not steal.",
      reference: "Exodus 20:15"
    }, {
      title: "No False Witness",
      scripture: "Thou shalt not bear false witness against thy neighbour.",
      reference: "Exodus 20:16"
    }, {
      title: "No Coveting",
      scripture: "Thou shalt not covet thy neighbour's house, thou shalt not covet thy neighbour's wife...",
      reference: "Exodus 20:17"
    }],
    "civil-laws": [{
      title: "Justice for All",
      scripture: "Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor, nor honour the person of the mighty...",
      reference: "Leviticus 19:15"
    }, {
      title: "Witnesses Required",
      scripture: "One witness shall not rise up against a man for any iniquity... at the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established.",
      reference: "Deuteronomy 19:15"
    }, {
      title: "Restitution",
      scripture: "If a man shall steal an ox, or a sheep... he shall restore five oxen for an ox, and four sheep for a sheep.",
      reference: "Exodus 22:1"
    }],
    "dietary-laws": [{
      title: "Clean Animals",
      scripture: "These are the beasts which ye shall eat: the ox, the sheep, and the goat...",
      reference: "Deuteronomy 14:4"
    }, {
      title: "Unclean Animals",
      scripture: "And the swine... is unclean to you. Of their flesh shall ye not eat...",
      reference: "Deuteronomy 14:8"
    }, {
      title: "Clean Fish",
      scripture: "These shall ye eat of all that are in the waters: whatsoever hath fins and scales...",
      reference: "Deuteronomy 14:9"
    }],
    "family-laws": [{
      title: "Marriage",
      scripture: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
      reference: "Genesis 2:24"
    }, {
      title: "Children's Education",
      scripture: "And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house...",
      reference: "Deuteronomy 6:7"
    }],
    "financial-laws": [{
      title: "Tithes",
      scripture: "And all the tithe of the land, whether of the seed of the land, or of the fruit of the tree, is AHAYAH's: it is holy unto AHAYAH.",
      reference: "Leviticus 27:30"
    }, {
      title: "No Usury",
      scripture: "Thou shalt not lend upon usury to thy brother; usury of money, usury of victuals, usury of any thing that is lent upon usury.",
      reference: "Deuteronomy 23:19"
    }],
    "moral-laws": [{
      title: "Love Thy Neighbor",
      scripture: "Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself.",
      reference: "Leviticus 19:18"
    }, {
      title: "Honesty",
      scripture: "Ye shall not steal, neither deal falsely, neither lie one to another.",
      reference: "Leviticus 19:11"
    }],
    "social-laws": [{
      title: "Care for Poor",
      scripture: "And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field... thou shalt leave them for the poor.",
      reference: "Leviticus 19:9-10"
    }, {
      title: "Strangers",
      scripture: "And if a stranger sojourn with thee in your land, ye shall not vex him... thou shalt love him as thyself.",
      reference: "Leviticus 19:33-34"
    }],
    "worship-laws": [{
      title: "Offerings",
      scripture: "And if any man of you bring an offering unto AHAYAH, ye shall bring your offering of the cattle, even of the herd, and of the flock.",
      reference: "Leviticus 1:2"
    }, {
      title: "Feasts",
      scripture: "These are the feasts of AHAYAH, even holy convocations, which ye shall proclaim in their seasons.",
      reference: "Leviticus 23:4"
    }]
  };
  const filteredLaws = lawsContent[selectedCategory]?.filter(law => law.title.toLowerCase().includes(searchTerm.toLowerCase()) || law.scripture.toLowerCase().includes(searchTerm.toLowerCase())) || [];
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-background to-blue-900/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Divine Instructions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Most High AHAYAH</span>
              <br />
              <span className="gradient-text">& YASHAYA</span>
              <br />
              <span className="text-foreground">Laws & Commandments</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              The holy laws and commandments given by the Most High AHAYAH to His people. Search and study the divine instructions for righteous living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[60vh]">
                      <div className="p-4 space-y-2">
                        {categories.map(cat => <Button key={cat.id} variant={selectedCategory === cat.id ? "default" : "ghost"} className="w-full justify-start gap-3" onClick={() => setSelectedCategory(cat.id)}>
                            <cat.icon className="w-4 h-4" />
                            <span className="flex-1 text-left">{cat.name}</span>
                            <span className="text-xs opacity-60">{cat.count}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Button>)}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search laws and commandments..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 py-6 bg-card/50 border-border/50" />
                </div>
              </div>

              {/* Selected Category Title */}
              <motion.div key={selectedCategory} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mb-6">
                <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                  {categories.find(c => c.id === selectedCategory)?.icon && <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      {(() => {
                    const Icon = categories.find(c => c.id === selectedCategory)?.icon;
                    return Icon ? <Icon className="w-5 h-5 text-amber-400" /> : null;
                  })()}
                    </div>}
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
              </motion.div>

              {/* Laws List */}
              <AnimatePresence mode="wait">
                <motion.div key={selectedCategory + searchTerm} initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} className="space-y-4">
                  {filteredLaws.map((law, index) => <motion.div key={law.title} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.05
                }}>
                      <Card className="bg-card/50 border-border/50 hover:border-amber-500/30 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-sm text-amber-400 font-bold">
                              {index + 1}
                            </div>
                            {law.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10 mb-4">
                            <p className="italic text-foreground">"{law.scripture}"</p>
                          </div>
                          <p className="text-sm text-amber-400 flex items-center gap-2">
                            <Book className="w-4 h-4" />
                            {law.reference}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>)}

                  {filteredLaws.length === 0 && <Card className="bg-card/50 border-border/50">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No laws found matching your search.</p>
                      </CardContent>
                    </Card>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default LawsCommandments;