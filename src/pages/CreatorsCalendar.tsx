import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Sun, Moon, Star, Book, Clock, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreatorsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(0);

  const hebrewMonths = [
    "Abib (Nisan)", "Zif (Iyyar)", "Sivan", "Tammuz", 
    "Ab", "Elul", "Ethanim (Tishri)", "Bul (Cheshvan)",
    "Kislev", "Tebeth", "Shebat", "Adar"
  ];

  const holyDays = [
    { name: "Passover (Pesach)", date: "Abib 14", description: "Memorial of deliverance from Egypt" },
    { name: "Feast of Unleavened Bread", date: "Abib 15-21", description: "Seven days of unleavened bread" },
    { name: "Feast of Firstfruits", date: "Abib 16", description: "Offering of the first harvest" },
    { name: "Feast of Weeks (Shavuot)", date: "Sivan 6", description: "Pentecost - 50 days after Firstfruits" },
    { name: "Feast of Trumpets", date: "Ethanim 1", description: "Day of blowing trumpets" },
    { name: "Day of Atonement (Yom Kippur)", date: "Ethanim 10", description: "Most holy day of fasting and repentance" },
    { name: "Feast of Tabernacles (Sukkot)", date: "Ethanim 15-21", description: "Seven days dwelling in booths" },
    { name: "Last Great Day", date: "Ethanim 22", description: "Eighth day assembly" }
  ];

  const sabbathInfo = {
    description: "The seventh day Sabbath, from Friday sunset to Saturday sunset, is a day of rest and worship unto the Most High AHAYAH.",
    scripture: "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of AHAYAH thy God...",
    reference: "Exodus 20:8-10"
  };

  const dailyOfferings = [
    { time: "Morning", description: "Daily burnt offering at the third hour (9 AM)" },
    { time: "Evening", description: "Daily burnt offering at the ninth hour (3 PM)" },
    { time: "Incense", description: "Morning and evening incense offerings" },
    { time: "Shewbread", description: "Changed every Sabbath" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-background to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Sacred Times & Seasons</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-foreground">Most High AHAYAH</span>
              <br />
              <span className="gradient-text">& YASHAYA</span>
              <br />
              <span className="text-foreground">Creators Calendar</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The sacred calendar established by the Most High, marking His holy days, 
              sabbaths, feasts, and appointed times for His people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Tabs */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="calendar" className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="holydays">Holy Days</TabsTrigger>
              <TabsTrigger value="sabbath">Sabbath</TabsTrigger>
              <TabsTrigger value="feasts">Feasts</TabsTrigger>
              <TabsTrigger value="offerings">Offerings</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      Hebrew Month Calendar
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setCurrentMonth(prev => prev > 0 ? prev - 1 : 11)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[120px] text-center font-medium">
                        {hebrewMonths[currentMonth]}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setCurrentMonth(prev => prev < 11 ? prev + 1 : 0)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className={`text-center text-sm font-medium p-2 ${day === 'Sat' ? 'text-amber-400' : 'text-muted-foreground'}`}>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                      <div
                        key={day}
                        className={`aspect-square flex items-center justify-center rounded-lg border border-border/30 hover:border-primary/30 transition-colors cursor-pointer
                          ${(day + currentMonth) % 7 === 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-card/50'}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-amber-500/30" />
                      <span>Sabbath Day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="holydays">
              <div className="grid md:grid-cols-2 gap-6">
                {holyDays.map((day, index) => (
                  <motion.div
                    key={day.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 border-border/50 hover:border-amber-500/30 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <Star className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{day.name}</CardTitle>
                            <CardDescription>{day.date}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{day.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sabbath">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Moon className="w-6 h-6 text-amber-400" />
                    The Seventh Day Sabbath
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">{sabbathInfo.description}</p>
                  
                  <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-start gap-4">
                      <Book className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="italic text-foreground mb-2">"{sabbathInfo.scripture}"</p>
                        <p className="text-sm text-amber-400">{sabbathInfo.reference}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Sun className="w-5 h-5 text-orange-400" />
                        <h4 className="font-medium">Sabbath Begins</h4>
                      </div>
                      <p className="text-muted-foreground">Friday at sunset</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Moon className="w-5 h-5 text-blue-400" />
                        <h4 className="font-medium">Sabbath Ends</h4>
                      </div>
                      <p className="text-muted-foreground">Saturday at sunset</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feasts">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    Holy Feasts of the Most High
                  </CardTitle>
                  <CardDescription>
                    The appointed feasts established by AHAYAH for His people
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <h4 className="font-medium text-green-400 mb-2">Spring Feasts</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Passover (Pesach) - Abib 14</li>
                        <li>• Unleavened Bread - Abib 15-21</li>
                        <li>• Firstfruits - Abib 16</li>
                        <li>• Weeks/Pentecost (Shavuot) - Sivan 6</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                      <h4 className="font-medium text-amber-400 mb-2">Fall Feasts</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Trumpets - Ethanim 1</li>
                        <li>• Day of Atonement - Ethanim 10</li>
                        <li>• Tabernacles (Sukkot) - Ethanim 15-21</li>
                        <li>• Last Great Day - Ethanim 22</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offerings">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-400" />
                    Daily Offerings
                  </CardTitle>
                  <CardDescription>
                    The daily offerings and sacrifices prescribed by the Most High
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dailyOfferings.map((offering, index) => (
                      <motion.div
                        key={offering.time}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-card/50 border border-border/30"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Sun className="w-5 h-5 text-amber-400" />
                          <h4 className="font-medium">{offering.time}</h4>
                        </div>
                        <p className="text-muted-foreground">{offering.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatorsCalendar;
