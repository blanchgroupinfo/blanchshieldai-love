import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import {
  User as UserIcon,
  Settings,
  Shield,
  Bot,
  Activity,
  MessageSquare,
  BookOpen,
  Star,
  Zap,
  Globe } from
"lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    full_name: string | null;
    email: string | null;
    bio: string | null;
    avatar_url: string | null;
  }>({ full_name: null, email: null, bio: null, avatar_url: null });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.
      from("profiles").
      select("*").
      eq("user_id", userId).
      maybeSingle();

      if (data) {
        setProfile({
          full_name: data.full_name,
          email: data.email,
          bio: data.bio,
          avatar_url: data.avatar_url
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.
      from("profiles").
      update({
        full_name: profile.full_name,
        bio: profile.bio
      }).
      eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto relative z-10">
          <ScrollAnimationWrapper>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                  Welcome, {profile.full_name || user?.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-muted-foreground font-body">
                  Your H.I.I. AI Dashboard - Unlimited Access
                </p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <ScrollAnimationWrapper>
              <Card className="bg-card/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Bot className="w-4 h-4" /> AI Agents Access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">888+</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400">Unlimited</Badge>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.1}>
              <Card className="bg-card/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Zap className="w-4 h-4" /> API Calls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">∞</p>
                  <Badge className="mt-2 bg-primary/20 text-primary">No Credits</Badge>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.2}>
              <Card className="bg-card/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Knowledge Base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">Full</p>
                  <Badge className="mt-2 bg-secondary/20 text-secondary-foreground">Access</Badge>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.3}>
              <Card className="bg-card/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">Active</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400">Protected</Badge>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <ScrollAnimationWrapper>
              <Card className="bg-card/30 border-border/50 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <Input
                      value={profile.full_name || ""}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1" />
                    
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input
                      value={user?.email || ""}
                      disabled
                      className="mt-1" />
                    
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Bio</label>
                    <Textarea
                      value={profile.bio || ""}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                      rows={3} />
                    
                  </div>
                  <div className="flex gap-2">
                    {isEditing ?
                    <>
                        <Button variant="shield" onClick={handleUpdateProfile}>
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </> :

                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    }
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>

            {/* Quick Actions */}
            <ScrollAnimationWrapper delay={0.1}>
              <Card className="bg-card/30 border-border/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Access H.I.I. AI features instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2"
                      onClick={() => navigate("/")}>
                      
                      <MessageSquare className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">AI Chat</p>
                        <p className="text-xs text-muted-foreground">Talk to S.H.I.E.L.D. AI</p>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2"
                      onClick={() => navigate("/agents")}>
                      
                      <Bot className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">Agent Registry</p>
                        <p className="text-xs text-muted-foreground">Browse 402+ AI Agents</p>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2"
                      onClick={() => navigate("/api")}>
                      
                      <Zap className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">API Access</p>
                        <p className="text-xs text-muted-foreground">Unlimited API Calls</p>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2"
                      onClick={() => navigate("/technology")}>
                      
                      <BookOpen className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">Technology</p>
                        <p className="text-xs text-muted-foreground">Learn our architecture</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          </div>

          {/* System Status */}
          <div className="mt-8">
            <ScrollAnimationWrapper>
              <Card className="bg-card/30 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" /> H.I.I. AI System Status
                  </CardTitle>
                  <CardDescription>
                    All systems are synchronized and operational
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <div>
                        <p className="text-sm font-medium">AI Core</p>
                        <p className="text-xs text-muted-foreground">Operational</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <div>
                        <p className="text-sm font-medium">Agent Sync</p>
                        <p className="text-xs text-muted-foreground">Auto-Synced</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <div>
                        <p className="text-sm font-medium">Knowledge Base</p>
                        <p className="text-xs text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <div>
                        <p className="text-sm font-medium">API Gateway</p>
                        <p className="text-xs text-muted-foreground">Unlimited</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Dashboard;