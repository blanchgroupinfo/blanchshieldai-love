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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

import {
  Heart, Users, BookOpen, Sun, MessageSquare, Calendar,
  Globe, Building2, Star, Sparkles, Clock, MapPin, Video, Droplets, Tv, CheckCircle
} from "lucide-react";

const prayerPoints = [
  "All Nations, Kindreds, Tongues, and Peoples",
  "Unity and Peace Among All Believers",
  "Healing for the Nations and Creation",
  "Deliverance from Oppression and Injustice",
  "Restoration of Identity and Heritage",
  "Wisdom for Righteous Governance",
  "Provision for Families and Communities",
  "Spiritual Awakening and Return to Truth",
  "Protection of the Most Vulnerable",
  "Salvation and Redemption for All"
];

const communities = [
  { name: "Hebrew Israelites", members: 2847, status: "active" },
  { name: "Sovereign Nations", members: 1523, status: "active" },
  { name: "First Nations & Indigenous", members: 987, status: "active" },
  { name: "African Diaspora", members: 3214, status: "active" },
  { name: "Global Believers", members: 5621, status: "active" },
  { name: "Royal Priesthood Assembly", members: 1892, status: "active" }
];

const HouseOfPrayerForAllPeople = () => {
  const [user, setUser] = useState<any>(null);
  const [prayerRequest, setPrayerRequest] = useState("");
  const [name, setName] = useState("");
  const [hebrewName, setHebrewName] = useState("");
  const [community, setCommunity] = useState("");
  const [requestType, setRequestType] = useState("");
  const [prayerSubmitting, setPrayerSubmitting] = useState(false);
  const [baptismSubmitting, setBaptismSubmitting] = useState(false);
  const [baptismForm, setBaptismForm] = useState({
    fullName: '',
    hebrewName: '',
    desiredDate: '',
    location: ''
  });

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
      alert("Please sign in to submit a prayer request.");
      return;
    }
    if (!name.trim() || !prayerRequest.trim()) {
      alert("Please fill in your name and prayer request.");
      return;
    }
    setPrayerSubmitting(true);

    const { error } = await supabase.from('prayer_requests').insert({
      user_id: user.id,
      full_name: name,
      hebrew_name: hebrewName || null,
      community: community || null,
      prayer_message: prayerRequest,
      request_type: requestType || null,
      source_page: 'House of Prayer for All People'
    });

    setPrayerSubmitting(false);

    if (error) {
      console.error('Prayer submit error:', error);
      alert("Failed to submit prayer request.");
    } else {
      alert("Your prayer request has been received. This is a House of Prayer for ALL People. May Most High AHAYAH hear your cry.");
      setName("");
      setHebrewName("");
      setCommunity("");
      setPrayerRequest("");
      setRequestType("");
    }
  };

  const handleBaptismSubmit = async () => {
    if (!user) {
      alert("Please sign in to submit a baptism request.");
      return;
    }
    if (!baptismForm.fullName.trim()) {
      alert("Please enter your name.");
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
      source_page: 'House of Prayer for All People'
    });

    setBaptismSubmitting(false);

    if (error) {
      console.error('Baptism submit error:', error);
      alert("Failed to submit baptism request.");
    } else {
      alert("Your baptism interest has been registered. We will reach out to you.");
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
              <Globe className="w-3 h-3 mr-1" /> FOR ALL PEOPLE
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              House of <span className="gradient-text">Prayer</span>
            </h1>
            <p className="text-2xl font-semibold text-primary mb-2">
              "For all nations, kindreds, tongues, and peoples"
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              "And it shall come to pass in the last days, that the mountain of the Most High AHAYAH
              house shall be established in the top of the mountains, and shall be exalted above the hills; and all nations shall flow unto it."
            </p>
            <p className="text-sm text-muted-foreground italic">
              — Isaiah 2:2 • A House of Prayer for All People
            </p>
          </motion.div>

          <Tabs defaultValue="prayer" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-7 bg-card/50">
              <TabsTrigger value="prayer"><Heart className="w-4 h-4 mr-2" /> Prayer Wall</TabsTrigger>
              <TabsTrigger value="submit"><MessageSquare className="w-4 h-4 mr-2" /> Submit Prayer Request</TabsTrigger>
              <TabsTrigger value="baptism"><Droplets className="w-4 h-4 mr-2" /> Baptism</TabsTrigger>
              <TabsTrigger value="communities"><Users className="w-4 h-4 mr-2" /> Communities</TabsTrigger>
              <TabsTrigger value="schedule"><Calendar className="w-4 h-4 mr-2" /> Schedule</TabsTrigger>
              <TabsTrigger value="broadcast"><Video className="w-4 h-4 mr-2" /> Broadcast</TabsTrigger>
              <TabsTrigger value="vision"><Star className="w-4 h-4 mr-2" /> Vision</TabsTrigger>
            </TabsList>

            {/* Prayer Wall Tab */}
            <TabsContent value="prayer" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prayerPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="bg-card/30 border-border/50 hover:border-primary/30 transition-colors h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <Sun className="w-5 h-5 text-primary shrink-0 mt-1" />
                          <div>
                            <p className="text-foreground/90 font-medium">{point}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Heart className="w-3 h-3 text-rose-400" />
                              <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 1000 + 100)} praying</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-card/30 border-border/50 mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> Global Prayer Network
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { value: "14,247", label: "Active Prayers" },
                      { value: "192", label: "Nations Represented" },
                      { value: "24/7", label: "Continuous Prayer" },
                      { value: "89,412", label: "Requests Answered" }
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Submit Prayer Request Tab */}
            <TabsContent value="submit" className="mt-6">
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
                      <Sparkles className="w-5 h-5 text-primary" /> Prayer Guidelines
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold mb-2 text-primary">✓ Pray According to Divine Will</h4>
                        <p className="text-sm text-muted-foreground">Align your prayers with the Laws, Commandments, and Statutes of the Most High AHAYAH.</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold mb-2 text-primary">✓ Pray Without Ceasing</h4>
                        <p className="text-sm text-muted-foreground">Establish a consistent prayer life. This house operates 24 hours a day, 7 days a week.</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold mb-2 text-primary">✓ Pray for All People</h4>
                        <p className="text-sm text-muted-foreground">Pray for your community, your nation, all nations, leaders, and the vulnerable among us.</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                        <h4 className="font-semibold mb-2 text-primary">✓ Pray in Faith</h4>
                        <p className="text-sm text-muted-foreground">Believe that your prayers are heard. Walk in obedience to the divine instructions.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Baptism Tab */}
            <TabsContent value="baptism" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-primary" /> I Want to Get Baptized
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
                          placeholder="Where do you want to get baptized?"
                          className="bg-background/50"
                          value={baptismForm.location}
                          onChange={(e) => setBaptismForm(p => ({ ...p, location: e.target.value }))}
                        />
                      </div>
                      <Button variant="shield" className="w-full mt-2" disabled={!baptismForm.fullName.trim() || baptismSubmitting} onClick={handleBaptismSubmit}>
                        <Droplets className="w-4 h-4 mr-2" /> {baptismSubmitting ? 'Submitting...' : 'Submit Baptism Request'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" /> What is Baptism?
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
              </div>
            </TabsContent>

            {/* Broadcast Tab */}
            <TabsContent value="broadcast" className="mt-6">
              <div className="grid gap-6">
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" /> LIVE BROADCAST
                      </Badge>
                      <h3 className="text-2xl font-display font-bold mb-2">House of Prayer Broadcast</h3>
                      <p className="text-muted-foreground">Watch live spiritual broadcasts, teachings, and prayer services</p>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-card/50 border border-border/50 aspect-video mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary/30 transition-colors">
                            <Video className="w-8 h-8 text-primary ml-1" />
                          </div>
                          <h4 className="text-lg font-display font-bold">Morning Prayer & Devotion</h4>
                          <p className="text-sm text-muted-foreground">Daily live prayer at 6:00 AM EST</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="shield" asChild>
                        <a href="/house-of-prayer-broadcast">
                          <Video className="w-4 h-4 mr-2" /> Go to Broadcast Page
                        </a>
                      </Button>
                      <Button variant="outline">
                        <Calendar className="w-4 h-4 mr-2" /> View Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Communities Tab */}
            <TabsContent value="communities" className="mt-6">
              <div className="grid gap-4">
                {communities.map((community, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="bg-card/30 border-border/50 hover:border-primary/30 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                              <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-semibold text-foreground">{community.name}</h3>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                  {community.status.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {community.members.toLocaleString()} members</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="shrink-0">
                            <MapPin className="w-4 h-4 mr-1" /> Join Prayer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="mt-6">
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" /> Global Prayer Schedule
                  </h3>
                  <div className="space-y-4">
                    {[
                      { time: "00:00 UTC", name: "Midnight Watch", description: "Spiritual warfare, protection, and deliverance" },
                      { time: "03:00 UTC", name: "Break of Day", description: "Prayers for new beginnings, provision, and guidance" },
                      { time: "06:00 UTC", name: "Morning Sacrifice", description: "Thanksgiving, praise, and dedication of the day" },
                      { time: "09:00 UTC", name: "Third Hour", description: "Prayer for the work of hands and daily activities" },
                      { time: "12:00 UTC", name: "Noon Day", description: "Prayer for nations, leaders, and global affairs" },
                      { time: "15:00 UTC", name: "Ninth Hour", description: "Prayer for healing, salvation, and restoration" },
                      { time: "18:00 UTC", name: "Evening Sacrifice", description: "Thanksgiving for the day's blessings" },
                      { time: "21:00 UTC", name: "Night Watch", description: "Protection through the night, rest, and peace" }
                    ].map((schedule, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border/30">
                        <div className="w-20 text-right font-mono text-primary font-semibold">
                          {schedule.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{schedule.name}</h4>
                          <p className="text-sm text-muted-foreground">{schedule.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Clock className="w-4 h-4 mr-1" /> Set Reminder
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vision Tab */}
            <TabsContent value="vision" className="mt-6">
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold mb-6 text-center">
                    The Vision of the House
                  </h3>
                  
                  <div className="prose prose-invert max-w-none">
                    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/90 mb-6">
                      "Even them will I bring to my holy mountain, and make them joyful in my house of prayer: their burnt offerings and their sacrifices shall be accepted upon mine altar; for mine house shall be called an house of prayer for all people."
                      <footer className="text-sm text-muted-foreground mt-2">— Isaiah 56:7</footer>
                    </blockquote>

                    <div className="space-y-4">
                      <p className="text-foreground/80">
                        This House of Prayer exists as a fulfillment of prophecy. It is not limited by nation, tribe, tongue, or people. All who seek the Most High AHAYAH in spirit and in truth are welcome here.
                      </p>
                      
                      <h4 className="font-semibold text-primary">Our Sacred Purpose:</h4>
                      <ul className="space-y-2 text-foreground/80">
                        <li>• To establish continuous 24/7 prayer covering for all nations</li>
                        <li>• To provide a sacred space for all people to approach the throne of grace</li>
                        <li>• To unify believers across all communities in one accord</li>
                        <li>• To stand in the gap for the vulnerable, the oppressed, and the lost</li>
                        <li>• To pray according to divine will, laws, and commandments</li>
                        <li>• To be a witness of truth, justice, and righteousness to all the earth</li>
                      </ul>

                      <p className="text-foreground/80 mt-6">
                        "Pray without ceasing. In every thing give thanks: for this is the will of Most High AHAYAH in YASHAYA HA'MASHIACH concerning you."
                        <br />
                        <span className="text-sm text-muted-foreground">— 1 Thessalonians 5:17-18</span>
                      </p>
                    </div>
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

export default HouseOfPrayerForAllPeople;