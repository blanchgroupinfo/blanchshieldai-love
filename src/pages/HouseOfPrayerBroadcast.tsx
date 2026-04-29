import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import {
  Video, Radio, Tv, Calendar, Users, MessageSquare, Play, Pause,
  Volume2, Maximize, Heart, Share2, BookOpen, Sun, Clock, Mic, Sparkles,
  Droplets, FileText, CheckCircle
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
  const [name, setName] = useState("");
  const [hebrewName, setHebrewName] = useState("");
  const [community, setCommunity] = useState("hebrewIsraelite");
  const [requestType, setRequestType] = useState("healing");
  const [user, setUser] = useState(null);
  const [prayerSubmitting, setPrayerSubmitting] = useState(false);
  const [baptismSubmitting, setBaptismSubmitting] = useState(false);
  const [baptismForm, setBaptismForm] = useState({
    fullName: '',
    hebrewName: '',
    desiredDate: '',
    location: ''
  });
  const { toast } = useToast();


  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handlePrayerSubmit = async () => {
    if (!user) {
      toast({ title: "Sign In Required", description: "Please sign in to submit a prayer request.", variant: "destructive" });
      return;
    }
    if (!name.trim() || !prayerRequest.trim()) {
      toast({ title: "Missing Fields", description: "Please fill in your name and prayer request.", variant: "destructive" });
      return;
    }
    setPrayerSubmitting(true);

    const { error } = await supabase.from('prayer_requests').insert({
      user_id: user.id,
      full_name: name,
      hebrew_name: hebrewName || null,
      community_nation: community || null,
      prayer_message: prayerRequest,
      request_type: requestType || null,
      source_page: 'House of Prayer Broadcast'
    });

    setPrayerSubmitting(false);

    if (error) {
      console.error('Prayer submit error:', error);
      toast({ title: "Error", description: "Failed to submit prayer request.", variant: "destructive" });
    } else {
      toast({ title: "Prayer Request Submitted", description: "Your prayer request has been received. This is a House of Prayer for ALL People. May Most High AHAYAH hear your cry." });
      setName("");
      setHebrewName("");
      setCommunity("hebrew-israelites");
      setPrayerRequest("");
      setRequestType("healing");
    }
  };

  const handleBaptismSubmit = async () => {
    if (!user) {
      toast({ title: "Sign In Required", description: "Please sign in to submit a baptism request.", variant: "destructive" });
      return;
    }
    if (!baptismForm.fullName.trim()) {
      toast({ title: "Missing Fields", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    setBaptismSubmitting(true);

    const { error } = await supabase.from('baptism_registrations').insert({
      user_id: user.id,
      full_name: baptismForm.fullName,
      hebrew_name: baptismForm.hebrewName || null,
      date_of_baptism: baptismForm.desiredDate || null,
      location_of_baptism: baptismForm.location || null,
      registration_type: 'want_baptism',
      source_page: 'House of Prayer Broadcast'
    });

    setBaptismSubmitting(false);

    if (error) {
      console.error('Baptism submit error:', error);
      toast({ title: "Error", description: "Failed to submit.", variant: "destructive" });
    } else {
      toast({ title: "Request Submitted", description: "Your baptism interest has been registered. We will reach out to you." });
      setBaptismForm({ fullName: '', hebrewName: '', desiredDate: '', location: '' });
    }
  };



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
            <TabsList className="grid w-full grid-cols-5 bg-card/50">
              <TabsTrigger value="schedule"><Calendar className="w-4 h-4 mr-2" /> Schedule</TabsTrigger>
              <TabsTrigger value="archive"><Video className="w-4 h-4 mr-2" /> Archive</TabsTrigger>
              <TabsTrigger value="prayer"><BookOpen className="w-4 h-4 mr-2" /> Prayer</TabsTrigger>
              <TabsTrigger value="baptism"><Sparkles className="w-4 h-4 mr-2" /> Baptism</TabsTrigger>
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
                      <Heart className="w-5 h-5 text-primary" /> Submit Your Prayer Request
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This is a House of Prayer for All People. Every request is honored and will be included in our global prayer watch.
                    </p>
                    <div className="mb-3">
                      <label className="text-sm font-medium text-foreground mb-1 block">Your Name</label>
                      <Input
                        placeholder="Enter your name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-sm font-medium text-foreground mb-1 block">Lashawan Qadash Hebrew Name</label>
                      <Input
                        placeholder="Enter your Hebrew name (optional)..."
                        value={hebrewName}
                        onChange={(e) => setHebrewName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-sm font-medium text-foreground mb-1 block">Your Community / Nation</label>
                      <Select value={community} onValueChange={setCommunity}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select your community..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hebrew-israelites">Hebrew Israelites</SelectItem>
                          <SelectItem value="indigenous">First Nations / Indigenous</SelectItem>
                          <SelectItem value="african">African Diaspora</SelectItem>
                          <SelectItem value="sovereign">Sovereign Nations</SelectItem>
                          <SelectItem value="global">Global Believers</SelectItem>
                          <SelectItem value="other">Other / All Peoples</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-3">
                      <label className="text-sm font-medium text-foreground mb-1 block">Prayer Request</label>
                      <Textarea
                        placeholder="Share your heart's cry, your needs, your thanksgivings..."
                        value={prayerRequest}
                        onChange={(e) => setPrayerRequest(e.target.value)}
                        rows={6}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-foreground mb-1 block">Request Type</label>
                      <Select value={requestType} onValueChange={setRequestType}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select request type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healing">Healing & Health</SelectItem>
                          <SelectItem value="protection">Protection & Safety</SelectItem>
                          <SelectItem value="provision">Provision & Sustenance</SelectItem>
                          <SelectItem value="guidance">Guidance & Wisdom</SelectItem>
                          <SelectItem value="deliverance">Deliverance & Freedom</SelectItem>
                          <SelectItem value="thanksgiving">Thanksgiving & Praise</SelectItem>
                          <SelectItem value="nation">For Your Nation / People</SelectItem>
                          <SelectItem value="global">Global Prayer</SelectItem>
                          <SelectItem value="general">General Prayer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="shield"
                      className="w-full"
                      disabled={!name.trim() || !prayerRequest.trim() || prayerSubmitting}
                      onClick={handlePrayerSubmit}
                    >
                      <Heart className="w-4 h-4 mr-2" /> {prayerSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-primary" /> Prayer Wall
                    </h3>
                     <div className="space-y-3">
                      {["Pray for healing and restoration of our community", "Pray for wisdom in sovereign governance", "Pray for protection over the Royal Priesthood", "Pray for the youth to know their identity", "Pray for the peace of Jerusalem and all Israel", "Pray for provision and sustenance for families in need", "Pray for spiritual awakening and return to the ancient paths"].map((prayer, i) => (
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

            {/* Baptism Tab */}
            <TabsContent value="baptism" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* What is Baptism */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-primary" /> What is Baptism?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Baptism is an act of obedience symbolizing the believer's faith in the death, burial, and resurrection of YASHAYA HA'MASHIACH. It represents the washing away of sin and the adoption into the Royal Priesthood.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Submersion in living waters (Mikveh)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>In the name of YASHAYA HAMASHIACH</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Entry into the Royal Priesthood</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Covenant of the Abrahamic Promise</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground italic">
                        "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* I Want to Get Baptized */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" /> I Want to Get Baptized
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Begin your journey of faith through baptism in the name of YASHAYA HA'MASHIACH.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                        <Input
                          placeholder="Enter your name..."
                          className="bg-background/50"
                          value={baptismForm.fullName}
                          onChange={(e) => setBaptismForm(p => ({ ...p, fullName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Lashawan Qadash Hebrew Name</label>
                        <Input
                          placeholder="Hebrew name (optional)..."
                          className="bg-background/50"
                          value={baptismForm.hebrewName}
                          onChange={(e) => setBaptismForm(p => ({ ...p, hebrewName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Date of Baptism</label>
                        <Input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          className="bg-background/50"
                          value={baptismForm.desiredDate}
                          onChange={(e) => setBaptismForm(p => ({ ...p, desiredDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Location of Baptism</label>
                        <Input
                          placeholder="Where do you want to get Baptize? Do you want to come to Jordan"
                          className="bg-background/50"
                          value={baptismForm.location}
                          onChange={(e) => setBaptismForm(p => ({ ...p, location: e.target.value }))}
                        />
                      </div>
                      <Button variant="shield" className="w-full mt-2" disabled={!baptismForm.fullName.trim() || baptismSubmitting} onClick={handleBaptismSubmit}>
                        <Sparkles className="w-4 h-4 mr-2" /> {baptismSubmitting ? 'Submitting...' : 'Submit Baptism Request'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Register a Completed Baptism */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" /> Register a Completed Baptism
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Record your completed baptism in the registry for the congregation and community records.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                        <Input
                          placeholder="Enter your name..."
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Lashawan Qadash Hebrew Name</label>
                        <Input
                          placeholder="Hebrew name (optional)..."
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Date of Baptism</label>
                        <Input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Location of Baptism</label>
                        <Input
                          placeholder="Where were you baptized?"
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Minister/Officer</label>
                        <Input
                          placeholder="Name of the minister who performed baptism"
                          className="bg-background/50"
                        />
                      </div>
                      <Button variant="outline" className="w-full mt-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                        <FileText className="w-4 h-4 mr-2" /> Register Completed Baptism
                      </Button>
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
