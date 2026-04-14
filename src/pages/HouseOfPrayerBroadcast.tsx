import { useState } from "react";
import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Video, Radio, Tv, Calendar, Users, MessageSquare, Play, Pause,
  Volume2, Maximize, Heart, Share2, BookOpen, Sun, Clock, Mic
} from "lucide-react";

const liveStreams = [
  { id: "1", title: "Morning Prayer & Devotion", status: "live", viewers: 1247, time: "6:00 AM EST", description: "Daily morning prayer aligned with divine law" },
  { id: "2", title: "Sabbath Day Teaching", status: "scheduled", viewers: 0, time: "Saturday 10:00 AM EST", description: "Weekly Sabbath observance and Torah study" },
  { id: "3", title: "Laws & Commandments Study", status: "scheduled", viewers: 0, time: "Wednesday 7:00 PM EST", description: "Deep dive into the Laws and Commandments of the Most High" },
  { id: "4", title: "Prophetic Watch Night", status: "ended", viewers: 3891, time: "Friday 9:00 PM EST", description: "Prophetic proclamations and spiritual warfare" },
];

const pastBroadcasts = [
  { id: "p1", title: "The Restoration of Israel — Ezekiel 37", date: "2026-04-10", views: 5230, duration: "1:23:45" },
  { id: "p2", title: "Divine Economics & Kingdom Building", date: "2026-04-07", views: 4102, duration: "1:45:12" },
  { id: "p3", title: "Keeping the Sabbath Holy — A Complete Guide", date: "2026-04-05", views: 6781, duration: "2:01:33" },
  { id: "p4", title: "Hebrew Israelite Heritage & Aboriginal Identity", date: "2026-04-03", views: 3450, duration: "1:15:20" },
  { id: "p5", title: "Spiritual Warfare: Psalms of Protection", date: "2026-03-29", views: 7123, duration: "1:38:55" },
  { id: "p6", title: "The Royal Priesthood — Our Divine Mandate", date: "2026-03-26", views: 4890, duration: "1:52:10" },
];

const HouseOfPrayerBroadcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [prayerRequest, setPrayerRequest] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Radio className="w-3 h-3 mr-1" /> LIVE BROADCAST
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              House of <span className="gradient-text">Prayer</span> Broadcast
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              "My house shall be called a house of prayer for all people." — Isaiah 56:7
            </p>
            <p className="text-sm text-muted-foreground mt-2 italic">
              Live spiritual broadcasts, teachings, and prayer services aligned with divine truth.
            </p>
          </motion.div>

          {/* Main Video Player */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-5xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-card/50 border border-border/50 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-primary/30 transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-10 h-10 text-primary" /> : <Play className="w-10 h-10 text-primary ml-1" />}
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2" /> LIVE NOW
                  </Badge>
                  <h3 className="text-xl font-display font-bold text-foreground">Morning Prayer & Devotion</h3>
                  <p className="text-sm text-muted-foreground mt-1">1,247 watching now</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground">LIVE • 1:23:45</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="schedule" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-card/50">
              <TabsTrigger value="schedule"><Calendar className="w-4 h-4 mr-2" /> Schedule</TabsTrigger>
              <TabsTrigger value="archive"><Video className="w-4 h-4 mr-2" /> Archive</TabsTrigger>
              <TabsTrigger value="prayer"><BookOpen className="w-4 h-4 mr-2" /> Prayer</TabsTrigger>
              <TabsTrigger value="community"><Users className="w-4 h-4 mr-2" /> Community</TabsTrigger>
            </TabsList>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="mt-6">
              <div className="grid gap-4">
                {liveStreams.map((stream) => (
                  <Card key={stream.id} className="bg-card/30 border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stream.status === 'live' ? 'bg-red-500/20' : stream.status === 'scheduled' ? 'bg-primary/20' : 'bg-muted/20'}`}>
                            {stream.status === 'live' ? <Radio className="w-6 h-6 text-red-400 animate-pulse" /> : stream.status === 'scheduled' ? <Clock className="w-6 h-6 text-primary" /> : <Video className="w-6 h-6 text-muted-foreground" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-display font-semibold text-foreground">{stream.title}</h3>
                              <Badge className={stream.status === 'live' ? 'bg-red-500/20 text-red-400 border-red-500/30' : stream.status === 'scheduled' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-muted/20 text-muted-foreground border-muted/30'}>
                                {stream.status === 'live' ? '● LIVE' : stream.status === 'scheduled' ? 'Scheduled' : 'Ended'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{stream.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {stream.time}</span>
                              {stream.viewers > 0 && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {stream.viewers.toLocaleString()} viewers</span>}
                            </div>
                          </div>
                        </div>
                        <Button variant={stream.status === 'live' ? 'shield' : 'outline'} size="sm" className="shrink-0">
                          {stream.status === 'live' ? <><Play className="w-4 h-4 mr-1" /> Watch Live</> : stream.status === 'scheduled' ? <><Calendar className="w-4 h-4 mr-1" /> Set Reminder</> : <><Video className="w-4 h-4 mr-1" /> Replay</>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Archive Tab */}
            <TabsContent value="archive" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastBroadcasts.map((broadcast) => (
                  <Card key={broadcast.id} className="bg-card/30 border-border/50 hover:border-primary/30 transition-colors cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl flex items-center justify-center relative">
                        <Play className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />
                        <span className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded text-foreground">{broadcast.duration}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-2 line-clamp-2">{broadcast.title}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{broadcast.date}</span>
                          <span>{broadcast.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Prayer Tab */}
            <TabsContent value="prayer" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-primary" /> Submit a Prayer Request
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Submit your prayer requests to be included in our live broadcast prayer sessions.
                    </p>
                    <Textarea
                      placeholder="Write your prayer request here..."
                      value={prayerRequest}
                      onChange={(e) => setPrayerRequest(e.target.value)}
                      rows={5}
                      className="mb-4 bg-background/50"
                    />
                    <Button variant="shield" className="w-full" disabled={!prayerRequest.trim()}>
                      <BookOpen className="w-4 h-4 mr-2" /> Submit Prayer Request
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-primary" /> Prayer Wall
                    </h3>
                    <div className="space-y-3">
                      {["Pray for healing and restoration of our community", "Pray for wisdom in sovereign governance", "Pray for protection over the Royal Priesthood", "Pray for the youth to know their identity"].map((prayer, i) => (
                        <div key={i} className="p-3 rounded-lg bg-background/50 border border-border/30">
                          <p className="text-sm text-foreground/80 italic">"{prayer}"</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Heart className="w-3 h-3 text-primary" />
                            <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50 + 10)} Amens</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Users, label: "Total Congregation", value: "12,847", color: "text-primary" },
                  { icon: Tv, label: "Total Broadcasts", value: "342", color: "text-emerald-400" },
                  { icon: Heart, label: "Prayer Requests", value: "8,921", color: "text-rose-400" },
                ].map((stat) => (
                  <Card key={stat.label} className="bg-card/30 border-border/50">
                    <CardContent className="p-6 text-center">
                      <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="bg-card/30 border-border/50 mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" /> Live Chat
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {["Shalom everyone! Blessed Sabbath", "AHAYAH is great! All praises to the Most High", "Can someone share the scripture reference?", "Amein! This teaching is powerful", "Baruch HaShem! Truth is being revealed"].map((msg, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-[10px] text-primary font-bold">{String.fromCharCode(65 + i)}</span>
                        </div>
                        <p className="text-sm text-foreground/80">{msg}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." className="bg-background/50" />
                    <Button variant="shield" size="sm"><MessageSquare className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HouseOfPrayerBroadcast;
