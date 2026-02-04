import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Sun, Moon, Star, Book, Clock, ChevronLeft, ChevronRight, Sparkles, Sunrise, AlertCircle } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  calendarMonths,
  hebrewDayNames,
  feasts,
  calendarScriptures,
  getFeastsForDay,
  getGregorianDate,
  formatGregorianDate,
  type Feast,
} from "@/data/creatorsCalendar";

const CreatorsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthData = calendarMonths[currentMonth];

  // Generate weeks for the current month (30 days, 7-day weeks)
  const weeks = useMemo(() => {
    const result: number[][] = [];
    let week: number[] = [];
    
    for (let day = 1; day <= monthData.days; day++) {
      week.push(day);
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    }
    // Add remaining days
    if (week.length > 0) {
      while (week.length < 7) week.push(0);
      result.push(week);
    }
    
    return result;
  }, [monthData]);

  // Get feasts for current month
  const monthFeasts = useMemo(() => {
    return feasts.filter(f => f.month === monthData.monthNumber);
  }, [monthData]);

  // Get scriptures by category
  const scriptureCategories = useMemo(() => {
    return {
      calendar: calendarScriptures.filter(s => s.category === 'calendar'),
      light: calendarScriptures.filter(s => s.category === 'light'),
      commandments: calendarScriptures.filter(s => s.category === 'commandments'),
      truth: calendarScriptures.filter(s => s.category === 'truth'),
      sabbath: calendarScriptures.filter(s => s.category === 'sabbath'),
    };
  }, []);

  const getFeastBadgeColor = (type: Feast['type']) => {
    switch (type) {
      case 'holy-day': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'feast': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'fast': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'new-month': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'sabbath': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const hasFeast = (day: number) => {
    return getFeastsForDay(monthData.monthNumber, day).length > 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-foreground">Most High AHAYAH</span>
              <br />
              <span className="gradient-text">& YASHAYA</span>
              <br />
              <span className="text-foreground">Creators Calendar</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
              The sacred calendar established by the Most High, marking His holy days, 
              sabbaths, feasts, and appointed times for His people.
            </p>

            {/* Dawn Notice */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Sunrise className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-orange-300">A Day Begins at Dawn (Sunrise)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Software */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="monthly" className="max-w-7xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="monthly">Monthly Calendar</TabsTrigger>
              <TabsTrigger value="feasts">Holy Days & Feasts</TabsTrigger>
              <TabsTrigger value="sabbath">Sabbath</TabsTrigger>
              <TabsTrigger value="scriptures">Scriptures</TabsTrigger>
              <TabsTrigger value="yearly">Year Overview</TabsTrigger>
            </TabsList>

            {/* Monthly Calendar Tab */}
            <TabsContent value="monthly">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  {/* Year & Month Navigation */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentYear(prev => prev - 1)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[80px] text-center font-bold text-xl">
                        {currentYear}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentYear(prev => prev + 1)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <CardTitle className="flex items-center gap-3 text-center">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      <span className="text-amber-400">{monthData.monthNumber}</span>
                      <span className="font-display">{monthData.hebrewName}</span>
                      <span className="text-muted-foreground text-sm">({monthData.gregorianMonths})</span>
                    </CardTitle>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(prev => prev > 0 ? prev - 1 : 11)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[60px] text-center font-medium">
                        Month {monthData.monthNumber}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(prev => prev < 11 ? prev + 1 : 0)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardDescription className="text-center mt-2">
                    House of Prayer for All People • 1 Corinthians 16:1-2 • Acts 20:6-7
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Monthly Calendar Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-card/80">
                          {hebrewDayNames.map((dayInfo, index) => (
                            <TableHead 
                              key={dayInfo.day} 
                              className={`text-center min-w-[120px] ${index === 6 ? 'bg-amber-500/10 text-amber-400' : ''}`}
                            >
                              <div className="flex flex-col gap-1">
                                <span className="font-bold">DAY {dayInfo.day}</span>
                                <span className="text-xs">{dayInfo.hebrew}</span>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weeks.map((week, weekIndex) => (
                          <TableRow key={weekIndex}>
                            {week.map((day, dayIndex) => {
                              if (day === 0) {
                                return <TableCell key={dayIndex} className="border border-border/30" />;
                              }
                              
                              const dayFeasts = getFeastsForDay(monthData.monthNumber, day);
                              const gregorianDate = getGregorianDate(currentYear, monthData.monthNumber, day);
                              const isSabbath = dayIndex === 6;
                              const isSelected = selectedDay === day;
                              
                              return (
                                <TableCell 
                                  key={dayIndex}
                                  className={`border border-border/30 p-2 align-top cursor-pointer transition-colors min-h-[100px]
                                    ${isSabbath ? 'bg-amber-500/10' : 'hover:bg-card/80'}
                                    ${isSelected ? 'ring-2 ring-primary' : ''}
                                    ${dayFeasts.length > 0 ? 'bg-primary/5' : ''}
                                  `}
                                  onClick={() => setSelectedDay(day)}
                                >
                                  <div className="flex flex-col gap-1">
                                    {/* Day Number */}
                                    <div className="flex items-center justify-between">
                                      <span className={`font-bold text-lg ${isSabbath ? 'text-amber-400' : ''}`}>
                                        {day}
                                      </span>
                                      {day === 1 && (
                                        <Badge variant="outline" className="text-[10px] bg-blue-500/20 text-blue-300 border-blue-500/30">
                                          New Month
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    {/* Gregorian Date */}
                                    <span className="text-xs text-muted-foreground">
                                      {formatGregorianDate(gregorianDate)}
                                    </span>
                                    
                                    {/* Feasts/Holy Days */}
                                    {dayFeasts.map((feast, i) => (
                                      <Badge 
                                        key={i} 
                                        variant="outline" 
                                        className={`text-[10px] mt-1 ${getFeastBadgeColor(feast.type)}`}
                                      >
                                        {feast.name}
                                      </Badge>
                                    ))}
                                    
                                    {/* Sabbath marker */}
                                    {isSabbath && (
                                      <span className="text-[10px] text-amber-400 mt-1">SHABBAT</span>
                                    )}
                                  </div>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-amber-500/30" />
                      <span>Sabbath Day</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getFeastBadgeColor('holy-day')}>Holy Day</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getFeastBadgeColor('feast')}>Feast</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getFeastBadgeColor('fast')}>Fast</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getFeastBadgeColor('new-month')}>New Month</Badge>
                    </div>
                  </div>

                  {/* Selected Day Info */}
                  {selectedDay && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-lg bg-card/80 border border-border/50"
                    >
                      <h4 className="font-bold text-lg mb-2">
                        Day {selectedDay} - {monthData.hebrewName}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Gregorian: {formatGregorianDate(getGregorianDate(currentYear, monthData.monthNumber, selectedDay))}, {currentYear}
                      </p>
                      {getFeastsForDay(monthData.monthNumber, selectedDay).map((feast, i) => (
                        <div key={i} className="mt-2 p-3 rounded bg-primary/5 border border-primary/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-amber-400" />
                            <span className="font-medium">{feast.name}</span>
                            <span className="text-sm text-muted-foreground">({feast.hebrewName})</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{feast.description}</p>
                          {feast.noWork && (
                            <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 border-red-500/20">
                              No Work
                            </Badge>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Month Notes */}
                  <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Book className="w-4 h-4 text-amber-400" />
                      NOTES:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>1- Numbers 10:10, Exodus 40 - New Month (Hadash), Beginning Month (Rash Hadash)</li>
                      {monthFeasts.filter(f => f.type !== 'new-month').map((feast, i) => (
                        <li key={i}>• {feast.name} ({feast.hebrewName}) - {feast.description}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Holy Days & Feasts Tab */}
            <TabsContent value="feasts">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Spring Feasts */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-green-400">
                      <Sparkles className="w-6 h-6" />
                      Spring Feasts (1st-3rd Month)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feasts.filter(f => f.month <= 3 && f.type !== 'new-month').map((feast, index) => (
                      <motion.div
                        key={feast.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-green-500/5 border border-green-500/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-green-300">{feast.name}</h4>
                          <Badge variant="outline" className={getFeastBadgeColor(feast.type)}>
                            {feast.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{feast.hebrewName}</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Month {feast.month}, Day {feast.day}
                        </p>
                        <p className="text-sm">{feast.description}</p>
                        {feast.noWork && (
                          <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300">
                            No Work
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Fall Feasts */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-amber-400">
                      <Star className="w-6 h-6" />
                      Fall Feasts (7th Month)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feasts.filter(f => f.month === 7 && f.type !== 'new-month').map((feast, index) => (
                      <motion.div
                        key={feast.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-amber-300">{feast.name}</h4>
                          <Badge variant="outline" className={getFeastBadgeColor(feast.type)}>
                            {feast.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{feast.hebrewName}</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Month {feast.month}, Day {feast.day}
                        </p>
                        <p className="text-sm">{feast.description}</p>
                        {feast.noWork && (
                          <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300">
                            No Work
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Fast Days */}
                <Card className="bg-card/50 border-border/50 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-red-400">
                      <AlertCircle className="w-6 h-6" />
                      Fast Days
                    </CardTitle>
                    <CardDescription>Days of fasting and repentance - from evening to evening</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {feasts.filter(f => f.type === 'fast').map((feast, index) => (
                        <motion.div
                          key={feast.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-red-500/5 border border-red-500/20"
                        >
                          <h4 className="font-medium text-red-300">{feast.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Month {feast.month}, Day {feast.day}
                          </p>
                          <p className="text-sm mt-1">{feast.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sabbath Tab */}
            <TabsContent value="sabbath">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Moon className="w-6 h-6 text-amber-400" />
                    The Seventh Day Sabbath (SHABBAT)
                  </CardTitle>
                  <CardDescription>
                    A day begins at Dawn (Sunrise) - Preparation Day Shabbat starts at Dawn on the Seventh Day
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dawn Scripture Evidence */}
                  <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
                    <div className="flex items-start gap-4">
                      <Sunrise className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-orange-300 mb-3">A Day Begins at Dawn (Sunrise)</h4>
                        <div className="space-y-3">
                          {scriptureCategories.sabbath.map((scripture, i) => (
                            <div key={i} className="p-3 rounded bg-background/50">
                              <p className="italic text-sm">"{scripture.verse}"</p>
                              <p className="text-xs text-amber-400 mt-1">{scripture.reference}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 rounded bg-amber-500/10 border border-amber-500/20">
                          <p className="text-sm font-medium text-amber-300">Greek Reference:</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <strong>G2020 - ἐπιφώσκω (epiphōskō)</strong>: "to begin to grow light: begin to dawn, draw on"
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <strong>G4404 - πρωΐ́ (prōi)</strong>: "at dawn; by implication the day break watch: early in the morning"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-start gap-4">
                      <Book className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="italic text-foreground mb-2">
                          "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: 
                          But the seventh day is the sabbath of AHAYAH thy God: in it thou shalt not do any work..."
                        </p>
                        <p className="text-sm text-amber-400">Exodus 20:8-10</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Sunrise className="w-5 h-5 text-orange-400" />
                        <h4 className="font-medium">Sabbath Begins</h4>
                      </div>
                      <p className="text-muted-foreground">Saturday at Dawn (Sunrise)</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "The sun ariseth, they gather themselves together..." (Psalms 104:22)
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Sun className="w-5 h-5 text-amber-400" />
                        <h4 className="font-medium">Sabbath Ends</h4>
                      </div>
                      <p className="text-muted-foreground">Sunday at Dawn (Sunrise)</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Man goeth forth unto his work and to his labour until the evening." (Psalms 104:23)
                      </p>
                    </div>
                  </div>

                  {/* 12 Hours in the Day */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">Twelve Hours in the Day</h4>
                    </div>
                    <p className="italic text-sm">
                      "Yashaya answered, Are there not twelve hours in the day? If any man walk in the day, 
                      he stumbleth not, because he seeth the light of this world."
                    </p>
                    <p className="text-xs text-amber-400 mt-1">John 11:9</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scriptures Tab */}
            <TabsContent value="scriptures">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Light Scriptures */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-yellow-400">
                      <Sun className="w-6 h-6" />
                      Light & Children of Light
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {scriptureCategories.light.map((scripture, i) => (
                          <div key={i} className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                            <p className="italic text-sm">"{scripture.verse}"</p>
                            <p className="text-xs text-yellow-400 mt-2">{scripture.reference}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Commandments Scriptures */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-blue-400">
                      <Book className="w-6 h-6" />
                      Commandments & Love
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {scriptureCategories.commandments.map((scripture, i) => (
                          <div key={i} className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                            <p className="italic text-sm">"{scripture.verse}"</p>
                            <p className="text-xs text-blue-400 mt-2">{scripture.reference}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Truth Scriptures */}
                <Card className="bg-card/50 border-border/50 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-purple-400">
                      <Star className="w-6 h-6" />
                      Truth & Scripture Study
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {scriptureCategories.truth.map((scripture, i) => (
                          <div key={i} className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                            <p className="italic text-sm">"{scripture.verse}"</p>
                            <p className="text-xs text-purple-400 mt-2">{scripture.reference}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Year Overview Tab */}
            <TabsContent value="yearly">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      Year {currentYear} Overview
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentYear(prev => prev - 1)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[80px] text-center font-bold text-xl">
                        {currentYear}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentYear(prev => prev + 1)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    All 12 months of the Creator's Calendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {calendarMonths.map((month, index) => (
                      <motion.div
                        key={month.monthNumber}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105
                          ${currentMonth === index 
                            ? 'bg-primary/10 border-primary/50' 
                            : 'bg-card/50 border-border/30 hover:border-primary/30'
                          }`}
                        onClick={() => {
                          setCurrentMonth(index);
                          const tabList = document.querySelector('[role="tablist"]');
                          const monthlyTab = tabList?.querySelector('[value="monthly"]');
                          if (monthlyTab) (monthlyTab as HTMLElement).click();
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                            {month.monthNumber}
                          </span>
                          <div>
                            <h4 className="font-medium text-sm">{month.hebrewName}</h4>
                            <p className="text-xs text-muted-foreground">{month.gregorianMonths}</p>
                          </div>
                        </div>
                        
                        {/* Month's feasts preview */}
                        <div className="space-y-1 mt-2">
                          {feasts
                            .filter(f => f.month === month.monthNumber && f.type !== 'new-month')
                            .slice(0, 2)
                            .map((feast, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className={`text-[10px] block truncate ${getFeastBadgeColor(feast.type)}`}
                              >
                                {feast.name}
                              </Badge>
                            ))}
                        </div>
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
