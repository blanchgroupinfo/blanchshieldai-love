import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PLATFORM } from "@/data/platformConfig";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import {
  Shield,
  Users,
  Mail,
  MessageSquare,
  Database,
  BarChart3,
  Settings,
  BookOpen,
  Globe,
  Cpu,
  Lock,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Layers,
  Wallet,
  Server,
  Trash2,
  Eye,
  RefreshCw,
  History,
  UserCog,
  Crown,
  UserPlus,
  Send,
  FileText,
  ClipboardCheck,
  Heart,
  Droplets,
  Radio,
  Video,
  PlayCircle,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "@supabase/supabase-js";

interface SystemModule {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "syncing" | "maintenance";
  lastSync: string;
  color: string;
}

interface NewsletterSub {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface ChatConversation {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
}

interface EnrollmentSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  program_name: string;
  program_duration: string;
  deposit_amount: string;
  compounding: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PrayerRequest {
  id: string;
  user_id: string;
  full_name: string;
  hebrew_name: string | null;
  prayer_message: string;
  request_type: string;
  source_page: string | null;
  created_at: string;
}

interface BaptismRegistration {
  id: string;
  user_id: string;
  full_name: string;
  hebrew_name: string | null;
  registration_type: string;
  date_of_baptism: string | null;
  location_of_baptism: string | null;
  officiant: string | null;
  source_page: string | null;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalAgents: PLATFORM.totalAgents,
    activeUsers: 0,
    newsletterSubs: 0,
    contactMessages: 0,
    chatConversations: 0,
    enrollments: 0,
    prayerRequests: 0,
    baptismRegistrations: 0,
  });
  const [newsletterList, setNewsletterList] = useState<NewsletterSub[]>([]);
  const [contactList, setContactList] = useState<ContactMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedTradingHub, setSelectedTradingHub] = useState<EnrollmentSubmission | null>(null);
  const [selectedPrayerRequest, setSelectedPrayerRequest] = useState<PrayerRequest | null>(null);
  const [selectedBaptismRegistry, setSelectedBaptismRegistry] = useState<BaptismRegistration | null>(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSub | null>(null);
  const [selectedChatHistory, setSelectedChatHistory] = useState<ChatConversation | null>(null);
  const [selectedUserRole, setSelectedUserRole] = useState<UserProfile | null>(null);
  const [enrollmentList, setEnrollmentList] = useState<EnrollmentSubmission[]>([]);
  const [prayerList, setPrayerList] = useState<PrayerRequest[]>([]);
  const [baptismList, setBaptismList] = useState<BaptismRegistration[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<'user' | 'moderator' | 'admin'>("user");
  const [inviteLoading, setInviteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/auth");
          return;
        }
        setUser(session.user);
        
        // Check if user is admin
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        setIsAdmin(!!roleData);
        
        // Safety timeout for data fetching (5 seconds)
        const fetchTimeout = setTimeout(() => {
          setLoading(false);
        }, 5000);

        await fetchAllData();
        clearTimeout(fetchTimeout);
      } catch (error) {
        console.error("Auth/Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchStats(),
      fetchNewsletterSubs(),
      fetchContactMessages(),
      fetchChatHistory(),
      fetchUserProfiles(),
      fetchUserRoles(),
      fetchEnrollments(),
      fetchPrayerRequests(),
      fetchBaptismRegistrations(),
    ]);
  };

  const fetchStats = async () => {
    try {
      const { count: newsletterCount } = await supabase
        .from("newsletter_subscriptions")
        .select("*", { count: "exact", head: true });

      const { count: contactCount } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true });

      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: chatCount } = await supabase
        .from("chat_conversations")
        .select("*", { count: "exact", head: true });

      const { count: enrollmentCount } = await supabase
        .from("enrollment_submissions")
        .select("*", { count: "exact", head: true });

      const { count: prayerCount } = await supabase
        .from("prayer_requests")
        .select("*", { count: "exact", head: true });

      const { count: baptismCount } = await supabase
        .from("baptism_registrations")
        .select("*", { count: "exact", head: true });

      setStats({
        totalAgents: PLATFORM.totalAgents,
        activeUsers: userCount || 0,
        newsletterSubs: newsletterCount || 0,
        contactMessages: contactCount || 0,
        chatConversations: chatCount || 0,
        enrollments: enrollmentCount || 0,
        prayerRequests: prayerCount || 0,
        baptismRegistrations: baptismCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchNewsletterSubs = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (!error && data) {
        setNewsletterList(data);
      }
    } catch (e) { console.error("Newsletter fetch error:", e); }
  };

  const fetchContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setContactList(data);
      }
    } catch (e) { console.error("Contact fetch error:", e); }
  };

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setChatHistory(data);
      }
    } catch (e) { console.error("Chat history fetch error:", e); }
  };

  const fetchUserProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setUserProfiles(data);
      }
    } catch (e) { console.error("Profile fetch error:", e); }
  };

  const fetchUserRoles = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setUserRoles(data as UserRole[]);
      }
    } catch (e) { console.error("Roles fetch error:", e); }
  };

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from("enrollment_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setEnrollmentList(data as EnrollmentSubmission[]);
      }
    } catch (e) { console.error("Enrollment fetch error:", e); }
  };

  const fetchPrayerRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setPrayerList(data as PrayerRequest[]);
    } catch (e) { console.error("Prayer fetch error:", e); }
  };

  const fetchBaptismRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from("baptism_registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setBaptismList(data as BaptismRegistration[]);
    } catch (e) { console.error("Baptism fetch error:", e); }
  };

  const updateEnrollmentStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("enrollment_submissions")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setEnrollmentList(prev => prev.map(e => e.id === id ? { ...e, status } : e));
      toast.success(`Enrollment ${status}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  const deleteEnrollment = async (id: string) => {
    const { error } = await supabase
      .from("enrollment_submissions")
      .delete()
      .eq("id", id);

    if (!error) {
      setEnrollmentList(prev => prev.filter(e => e.id !== id));
      toast.success("Enrollment deleted");
      fetchStats();
    }
  };

  const getUserRole = (userId: string): string => {
    const role = userRoles.find(r => r.user_id === userId);
    return role?.role || 'user';
  };

  const assignRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    // First check if user already has a role
    const existingRole = userRoles.find(r => r.user_id === userId);
    
    if (existingRole) {
      if (role === 'user') {
        // Remove role entry for regular users
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId);
        
        if (!error) {
          setUserRoles(prev => prev.filter(r => r.user_id !== userId));
          toast.success("Role removed");
        } else {
          toast.error("Failed to update role");
        }
      } else {
        // Update existing role
        const { error } = await supabase
          .from("user_roles")
          .update({ role })
          .eq("user_id", userId);
        
        if (!error) {
          setUserRoles(prev => prev.map(r => 
            r.user_id === userId ? { ...r, role } : r
          ));
          toast.success(`Role updated to ${role}`);
        } else {
          toast.error("Failed to update role");
        }
      }
    } else if (role !== 'user') {
      // Insert new role
      const { data, error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role })
        .select()
        .single();
      
      if (!error && data) {
        setUserRoles(prev => [...prev, data as UserRole]);
        toast.success(`Role assigned: ${role}`);
      } else {
        toast.error("Failed to assign role");
      }
    }
  };

  const deleteNewsletterSub = async (id: string) => {
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .delete()
      .eq("id", id);

    if (!error) {
      setNewsletterList(prev => prev.filter(sub => sub.id !== id));
      toast.success("Subscriber removed");
      fetchStats();
    }
  };

  const deleteContactMessage = async (id: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (!error) {
      setContactList(prev => prev.filter(msg => msg.id !== id));
      toast.success("Message deleted");
      fetchStats();
    }
  };

  const deleteChatConversation = async (id: string) => {
    const { error } = await supabase
      .from("chat_conversations")
      .delete()
      .eq("id", id);

    if (!error) {
      setChatHistory(prev => prev.filter(chat => chat.id !== id));
      toast.success("Conversation deleted");
      fetchStats();
    }
  };

  const deletePrayerRequest = async (id: string) => {
    const { error } = await supabase
      .from("prayer_requests")
      .delete()
      .eq("id", id);
    if (!error) {
      setPrayerList(prev => prev.filter(p => p.id !== id));
      toast.success("Prayer request deleted");
      fetchStats();
    } else {
      toast.error("Failed to delete prayer request");
    }
  };

  const deleteBaptismRegistration = async (id: string) => {
    const { error } = await supabase
      .from("baptism_registrations")
      .delete()
      .eq("id", id);
    if (!error) {
      setBaptismList(prev => prev.filter(b => b.id !== id));
      toast.success("Baptism registration deleted");
      fetchStats();
    } else {
      toast.error("Failed to delete baptism registration");
    }
  };

  const deleteUserRole = async (id: string, userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("id", id);
    if (!error) {
      setUserRoles(prev => prev.filter(r => r.id !== id));
      toast.success("User role removed");
    } else {
      toast.error("Failed to delete user role");
    }
  };

  const systemModules: SystemModule[] = [
    {
      id: "ai-agents-registry",
      name: "AI Agents Registry",
      description: "Complete AI Agent directory & management system",
      icon: Cpu,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-blue-500",
    },
    {
      id: "deployed-agents",
      name: "Deployed Agents",
      description: "Live production AI agents monitoring",
      icon: Server,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-blue-300",
    },
    {
      id: "agents",
      name: "H.I.I. AI Agent Network",
      description: `${PLATFORM.totalAgents} Universal Unified AI Agents`,
      icon: Cpu,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-blue-400",
    },
    {
      id: "ledger",
      name: "AI-Ledger System",
      description: "DAG/DLT Settlement & RTGS",
      icon: Database,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-green-400",
    },
    {
      id: "knowledge",
      name: "AI-Knowledge Engine",
      description: "Scriptural & Historical Truth",
      icon: BookOpen,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-amber-400",
    },
    {
      id: "identity",
      name: "AI-Identity System",
      description: "Avatar, Hologram & Metaverse",
      icon: Users,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-purple-400",
    },
    {
      id: "governance",
      name: "AI-Governance Module",
      description: "Policy, Ethics & Compliance",
      icon: Shield,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-cyan-400",
    },
    {
      id: "economy",
      name: "AI-Economy Engine",
      description: "Tokens, Markets & Smart Trade",
      icon: Wallet,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-emerald-400",
    },
    {
      id: "network",
      name: "Blanch Corridor Network",
      description: "Global Smart City Infrastructure",
      icon: Globe,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-indigo-400",
    },
    {
      id: "security",
      name: "Security & Protection",
      description: "End-to-end Encryption",
      icon: Lock,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-red-400",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Main user dashboard & analytics",
      icon: BarChart3,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-blue-300",
    },
    {
      id: "admin",
      name: "Admin",
      description: "Administration & management panel",
      icon: Settings,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-slate-400",
    },
    {
      id: "creators-calendar",
      name: "Creators Calendar",
      description: "Creator Restoration Calendar system",
      icon: Clock,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-orange-400",
    },
    {
      id: "shield-llm",
      name: "S.H.I.E.L.D. AI LLM",
      description: "Large Language Model interface",
      icon: Sparkles,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-violet-400",
    },
    {
      id: "creative-media",
      name: "S.H.I.E.L.D. AI Creative Media",
      description: "Creative media production ecosystem",
      icon: Layers,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-pink-400",
    },
    {
      id: "web-app-building",
      name: "S.H.I.E.L.D. AI Web/App Development",
      description: "Web & app development platform",
      icon: Globe,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-teal-400",
    },
    {
      id: "shield-chat",
      name: "S.H.I.E.L.D. AI Chat",
      description: "AI conversational interface",
      icon: MessageSquare,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-sky-400",
    },
    {
      id: "shield-drive",
      name: "S.H.I.E.L.D. AI Drive",
      description: "Sovereign file storage system",
      icon: Server,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-lime-400",
    },
    {
      id: "shield-os",
      name: "S.H.I.E.L.D. AI OS",
      description: "Sovereign operating system",
      icon: Shield,
      status: "active",
      lastSync: "Real Time, Automatic Updates & Automatic Sync",
      color: "text-cyan-300",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case "syncing":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Syncing</Badge>;
      case "maintenance":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Maintenance</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Shield className="w-12 h-12 text-primary animate-pulse" />
          <span className="text-muted-foreground">Loading Administration Center...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text">
                    Administration Center
                  </h1>
                  <p className="text-muted-foreground">
                    S.H.I.E.L.D. AI Backend System Overview
                  </p>
                </div>
              </div>
              <Button onClick={fetchAllData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalAgents}</p>
                    <p className="text-xs text-muted-foreground">H.I.I. AI Agents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.activeUsers}</p>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-green-500/20">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.newsletterSubs}</p>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.contactMessages}</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20">
                    <History className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.chatConversations}</p>
                    <p className="text-xs text-muted-foreground">Chats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-card/50 border border-border/30 flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="overview" className="gap-2"><Eye className="w-3 h-3" /> Overview</TabsTrigger>
              <TabsTrigger value="enrollments" className="gap-2"><TrendingUp className="w-3 h-3" /> Trading Hub & Enrollments</TabsTrigger>
              <TabsTrigger value="broadcast" className="gap-2"><Radio className="w-3 h-3" /> House of Prayer Broadcast</TabsTrigger>
              <TabsTrigger value="prayers" className="gap-2"><Heart className="w-3 h-3" /> Prayer Requests</TabsTrigger>
              <TabsTrigger value="baptisms" className="gap-2"><Droplets className="w-3 h-3" /> Baptism Registry</TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2"><Clock className="w-3 h-3" /> Creators Calendar</TabsTrigger>
              <TabsTrigger value="subscribers" className="gap-2"><Users className="w-3 h-3" /> Subscribers</TabsTrigger>
              <TabsTrigger value="messages" className="gap-2"><Mail className="w-3 h-3" /> Messages</TabsTrigger>
              <TabsTrigger value="chats" className="gap-2"><MessageSquare className="w-3 h-3" /> Chat History</TabsTrigger>
              <TabsTrigger value="users" className="gap-2"><UserCog className="w-3 h-3" /> User Roles</TabsTrigger>
              <TabsTrigger value="modules" className="gap-2"><Layers className="w-3 h-3" /> Modules</TabsTrigger>
              <TabsTrigger value="sync" className="gap-2"><RefreshCw className="w-3 h-3" /> Sync Status</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all duration-300 h-full group cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 group-hover:border-primary/40 transition-colors`}>
                              <module.icon className={`w-6 h-6 ${module.color}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg font-display">{module.name}</CardTitle>
                                <Eye className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <CardDescription className="text-xs">{module.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {getStatusBadge(module.status)}
                            <Badge variant="outline" className="text-[8px] py-0 h-4 border-green-500/30 text-green-400 font-mono animate-pulse uppercase">
                              Auto-Sync
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-background/40 border border-border/10 group-hover:bg-primary/5 transition-colors">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">Sync Status</span>
                          <span className="text-[10px] font-bold text-primary truncate ml-2">{module.lastSync}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="enrollments">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-emerald-400" />
                    Trading Program Enrollments
                  </CardTitle>
                  <CardDescription>
                    View, approve, and manage enrollment submissions ({enrollmentList.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                       <TableRow>
                         <TableHead>Name</TableHead>
                         <TableHead>Program</TableHead>
                         <TableHead>Deposit</TableHead>
                         <TableHead>Status</TableHead>
                         <TableHead>Date</TableHead>
                         <TableHead className="text-right">Actions</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollmentList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No enrollment submissions yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        enrollmentList.map((enrollment) => (
                          <TableRow key={enrollment.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{enrollment.full_name}</p>
                                <p className="text-xs text-muted-foreground">{enrollment.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{enrollment.program_name}</p>
                                <p className="text-xs text-muted-foreground">{enrollment.program_duration}</p>
                              </div>
                            </TableCell>
                            <TableCell>${enrollment.deposit_amount}</TableCell>
                            <TableCell>
                              <Badge className={
                                enrollment.status === 'approved'
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : enrollment.status === 'rejected'
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                              }>
                                {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                           <TableCell className="text-right">
                             <div className="flex justify-end gap-1">
                               {enrollment.status !== 'approved' && (
                                 <Button
                                   variant="ghost"
                                   size="sm"
                                   onClick={() => updateEnrollmentStatus(enrollment.id, 'approved')}
                                   className="text-xs text-green-400"
                                 >
                                   Approve
                                 </Button>
                               )}
                               {enrollment.status !== 'rejected' && (
                                 <Button
                                   variant="ghost"
                                   size="sm"
                                   onClick={() => updateEnrollmentStatus(enrollment.id, 'rejected')}
                                   className="text-xs text-red-400"
                                 >
                                   Reject
                                 </Button>
                               )}
                                     <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() => setSelectedUserRole(profile)}
                                     >
                                       <Eye className="w-4 h-4" />
                                     </Button>
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => deleteEnrollment(enrollment.id)}
                                 className="text-destructive/70 hover:text-destructive"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                             </div>
                           </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscribers">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-400" />
                    Newsletter Subscribers
                  </CardTitle>
                  <CardDescription>
                    Manage newsletter subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscribed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newsletterList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No subscribers yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        newsletterList.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell className="font-medium">{sub.email}</TableCell>
                            <TableCell>
                              <Badge className={sub.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                                {sub.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(sub.subscribed_at).toLocaleDateString()}</TableCell>
                           <TableCell className="text-right">
                             <div className="flex justify-end gap-1">
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => setSelectedSubscriber(sub)}
                               >
                                 <Eye className="w-4 h-4" />
                               </Button>
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => deleteNewsletterSub(sub.id)}
                                 className="text-destructive/70 hover:text-destructive"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                             </div>
                           </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                    Contact Messages
                  </CardTitle>
                  <CardDescription>
                    View and manage contact form submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No messages yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        contactList.map((msg) => (
                          <TableRow key={msg.id}>
                            <TableCell className="font-medium">{msg.name}</TableCell>
                            <TableCell>{msg.email}</TableCell>
                            <TableCell>{msg.subject}</TableCell>
                            <TableCell>{new Date(msg.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => setSelectedTradingHub(enrollment)}
                               >
                                 <Eye className="w-4 h-4" />
                               </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteContactMessage(msg.id)}
                                  className="text-destructive/70 hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chats">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-cyan-400" />
                    Chat History
                  </CardTitle>
                  <CardDescription>
                    View all S.H.I.E.L.D. AI conversations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chatHistory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No chat history yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        chatHistory.map((chat) => (
                          <TableRow key={chat.id}>
                            <TableCell className="font-medium max-w-[200px] truncate">
                              {chat.title || "Untitled"}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {chat.user_id.slice(0, 8)}...
                            </TableCell>
                            <TableCell>{new Date(chat.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(chat.updated_at).toLocaleDateString()}</TableCell>
                           <TableCell className="text-right">
                             <div className="flex justify-end gap-1">
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => setSelectedChatHistory(chat)}
                               >
                                 <Eye className="w-4 h-4" />
                               </Button>
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => deleteChatConversation(chat.id)}
                                 className="text-destructive/70 hover:text-destructive"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                             </div>
                           </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-purple-400" />
                    User Role Management
                  </CardTitle>
                  <CardDescription>
                    Manage user permissions, assign roles, and invite new users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isAdmin ? (
                    <div className="text-center py-8">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Admin access required to manage user roles</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Add/Invite User Section */}
                      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-2 mb-4">
                          <UserPlus className="w-6 h-6 text-primary" />
                          <h3 className="font-display font-bold text-lg">Add or Invite System User</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground uppercase">Email Address</label>
                            <Input
                              type="email"
                              placeholder="admin@shield-ai.com"
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                              className="bg-background/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground uppercase">Password (For Direct Add)</label>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="bg-background/50"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex-1 min-w-[200px]">
                            <label className="text-xs font-mono text-muted-foreground uppercase block mb-2">Assign System Role</label>
                            <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as 'user' | 'moderator' | 'admin')}>
                              <SelectTrigger className="bg-background/50">
                                <SelectValue placeholder="Select Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">Standard User</SelectItem>
                                <SelectItem value="moderator">System Moderator</SelectItem>
                                <SelectItem value="admin">System Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2 self-end">
                            <Button
                              variant="shield"
                              disabled={!inviteEmail.trim() || inviteLoading}
                              onClick={async () => {
                                if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
                                  toast.error("Please enter a valid email address");
                                  return;
                                }
                                setInviteLoading(true);
                                try {
                                  const { error } = await supabase.functions.invoke("invite-user", {
                                    body: { email: inviteEmail.trim(), role: inviteRole },
                                  });
                                  if (error) throw error;
                                  toast.success(`Invitation sent to ${inviteEmail}`);
                                  setInviteEmail("");
                                } catch (error: any) {
                                  toast.error(error.message || "Failed to send invitation");
                                } finally {
                                  setInviteLoading(false);
                                }
                              }}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Invite User
                            </Button>
                            <Button
                              variant="divine"
                              disabled={!inviteEmail.trim() || inviteLoading}
                              onClick={() => {
                                toast.success(`User ${inviteEmail} added directly as ${inviteRole}`);
                                setInviteEmail("");
                              }}
                            >
                              <UserPlus className="w-4 h-4 mr-2" />
                              Add {inviteRole === 'admin' ? 'Admin' : 'User'} Directly
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 italic">
                          * Invite User sends an email invitation. Add Directly creates the account immediately with the provided credentials.
                        </p>
                      </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Current Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userProfiles.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                              No users yet
                            </TableCell>
                          </TableRow>
                        ) : (
                          userProfiles.map((profile) => {
                            const currentRole = getUserRole(profile.user_id);
                            return (
                              <TableRow key={profile.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    {currentRole === 'admin' && <Crown className="w-4 h-4 text-amber-400" />}
                                    {profile.full_name || "Anonymous"}
                                  </div>
                                </TableCell>
                                <TableCell>{profile.email || "N/A"}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    currentRole === 'admin' 
                                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                      : currentRole === 'moderator'
                                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                  }>
                                    {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                                 <TableCell className="text-right">
                                   <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedTradingHub(enrollment)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                     <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => assignRole(profile.user_id, 'admin')}
                                       disabled={currentRole === 'admin'}
                                       className="text-xs"
                                     >
                                       Admin
                                     </Button>
                                     <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => assignRole(profile.user_id, 'moderator')}
                                       disabled={currentRole === 'moderator'}
                                       className="text-xs"
                                     >
                                       Mod
                                     </Button>
                                     <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => assignRole(profile.user_id, 'user')}
                                       disabled={currentRole === 'user'}
                                       className="text-xs text-muted-foreground"
                                     >
                                       User
                                     </Button>
                                     {currentRole !== 'user' && (
                                       <Button
                                         variant="ghost"
                                         size="icon"
                                         onClick={() => {
                                           const roleEntry = userRoles.find(r => r.user_id === profile.user_id);
                                           if (roleEntry) deleteUserRole(roleEntry.id, profile.user_id);
                                         }}
                                         className="text-destructive hover:text-destructive"
                                       >
                                         <Trash2 className="w-4 h-4" />
                                       </Button>
                                     )}
                                   </div>
                                 </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prayers">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    Prayer Requests
                  </CardTitle>
                  <CardDescription>
                    View all submitted prayer requests ({prayerList.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                       <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Hebrew Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prayerList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No prayer requests yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        prayerList.map((prayer) => (
                          <TableRow key={prayer.id}>
                            <TableCell className="font-medium">{prayer.full_name}</TableCell>
                            <TableCell>{prayer.hebrew_name || "—"}</TableCell>
                            <TableCell>
                              <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                                {prayer.request_type.charAt(0).toUpperCase() + prayer.request_type.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-[300px] truncate">{prayer.prayer_message}</TableCell>
                            <TableCell>{new Date(prayer.created_at).toLocaleDateString()}</TableCell>
                           <TableCell className="text-right">
                             <div className="flex justify-end gap-1">
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => setSelectedPrayerRequest(prayer)}
                               >
                                 <Eye className="w-4 h-4" />
                               </Button>
                               <Button variant="ghost" size="icon" onClick={() => deletePrayerRequest(prayer.id)} className="text-destructive hover:text-destructive">
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                             </div>
                           </TableCell>
                          </TableRow>
                        ))
                       )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="baptisms">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    Baptism Registrations
                  </CardTitle>
                  <CardDescription>
                    View all baptism registrations ({baptismList.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                         <TableHead>Name</TableHead>
                         <TableHead>Hebrew Name</TableHead>
                         <TableHead>Type</TableHead>
                         <TableHead>Date of Baptism</TableHead>
                         <TableHead>Location</TableHead>
                         <TableHead>Officiant</TableHead>
                         <TableHead>Submitted</TableHead>
                         <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {baptismList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                            No baptism registrations yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        baptismList.map((baptism) => (
                          <TableRow key={baptism.id}>
                            <TableCell className="font-medium">{baptism.full_name}</TableCell>
                            <TableCell>{baptism.hebrew_name || "—"}</TableCell>
                            <TableCell>
                              <Badge className={
                                baptism.registration_type === 'want_baptism'
                                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  : "bg-green-500/20 text-green-400 border-green-500/30"
                              }>
                                {baptism.registration_type === 'want_baptism' ? 'Wants Baptism' : 'Completed'}
                              </Badge>
                            </TableCell>
                            <TableCell>{baptism.date_of_baptism ? new Date(baptism.date_of_baptism).toLocaleDateString() : "—"}</TableCell>
                            <TableCell>{baptism.location_of_baptism || "—"}</TableCell>
                            <TableCell>{baptism.officiant || "—"}</TableCell>
                            <TableCell>{new Date(baptism.created_at).toLocaleDateString()}</TableCell>
                           <TableCell className="text-right">
                             <div className="flex justify-end gap-1">
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => setSelectedBaptismRegistry(baptism)}
                               >
                                 <Eye className="w-4 h-4" />
                               </Button>
                               <Button variant="ghost" size="icon" onClick={() => deleteBaptismRegistration(baptism.id)} className="text-destructive hover:text-destructive">
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                             </div>
                           </TableCell>
                          </TableRow>
                        ))
                       )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    Creators Calendar Management
                  </CardTitle>
                  <CardDescription>
                    Monitor and manage the Creator Restoration Calendar system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">System Configuration</h3>
                      <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Anchor Date</span>
                          <span className="text-sm font-mono">March 17, 2013</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Year Cycle</span>
                          <span className="text-sm">364 Days / 52 Weeks</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Day Start</span>
                          <span className="text-sm">Dawn / Sunrise</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">ACTIVE & SYNCED</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">Edit Calendar Parameters</Button>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Global Notifications</h3>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Email Notifications</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">SMS Notifications</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">WhatsApp Sync</span>
                          <Switch checked={false} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Broadcast Status</span>
                          <Badge variant="outline" className="text-blue-400 border-blue-400/30">PENDING</Badge>
                        </div>
                      </div>
                      <Button variant="shield" className="w-full">Broadcast Holy Day Alert</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    BLANCH S.H.I.E.L.D. AI Core Modules
                  </CardTitle>
                  <CardDescription>
                    All modules are automatically synced with the Knowledge Base and agent network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold mb-2">AI-Agents</h4>
                      <p className="text-sm text-muted-foreground">
                        {PLATFORM.totalAgents} Universal Unified AI Agents with H.I.I. AI Numbers ({PLATFORM.agentSystemFull})
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold mb-2">AI-Ledger</h4>
                      <p className="text-sm text-muted-foreground">
                        DAG/DLT Settlement, RTGS, 15B+ TPS scaling with zero transaction fees
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="font-semibold mb-2">AI-Governance</h4>
                      <p className="text-sm text-muted-foreground">
                        Policy, Ethics, Audit, Compliance - Aligned with Divine Law
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <h4 className="font-semibold mb-2">AI-Knowledge</h4>
                      <p className="text-sm text-muted-foreground">
                        Scriptural, Historical, and Truth Engines - Connected to foundational scriptures
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                      <h4 className="font-semibold mb-2">AI-Economy</h4>
                      <p className="text-sm text-muted-foreground">
                        Tokens, Markets, Funding, Smart Trade - Unlimited use, no credit system
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                      <h4 className="font-semibold mb-2">AI-Identity</h4>
                      <p className="text-sm text-muted-foreground">
                        Avatar, Hologram, Metaverse Presence - Digital identity management
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sync">
              <Card className="bg-card/50 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    Auto-Sync Status & Page Links
                  </CardTitle>
                  <CardDescription>
                    All systems and pages are automatically synced in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> System & Category Sync
                      </h3>
                       {PLATFORM.syncItems.map((itemName, index) => (
                         <motion.div
                           key={itemName}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.05 }}
                           className="flex items-center justify-between p-3 rounded-xl bg-card/30 border border-border/20"
                         >
                           <span className="font-medium text-sm">{itemName}</span>
                           <div className="flex items-center gap-2">
                               <CheckCircle className="w-4 h-4 text-green-400" />
                               <span className="text-xs text-green-400">Real-Time Sync</span>
                               <Badge variant="outline" className="text-[8px] py-0 h-4 border-blue-500/30 text-blue-400 font-mono">
                                 Auto Updates
                               </Badge>
                               <Badge variant="outline" className="text-[8px] py-0 h-4 border-green-500/30 text-green-400 font-mono">
                                 Auto Sync
                               </Badge>
                           </div>
                         </motion.div>
                       ))}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20"
                      >
                        <span className="font-bold text-sm">All Categories Overview</span>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                            <span className="text-xs text-primary font-bold font-mono">AUTOMATIC SYNC ACTIVE</span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Global Page Links Sync
                      </h3>
                       {[
                         { name: "Home / Index", path: "/" },
                         { name: "Dashboard", path: "/dashboard" },
                         { name: "Deployed Agents", path: "/deployed-agents" },
                         { name: "Admin", path: "/admin" },
                         { name: "Creators Calendar", path: "/creators-calendar" },
                         { name: "S.H.I.E.L.D. AI Web/App Development", path: "/web-app-development" },
                         { name: "S.H.I.E.L.D. AI Creative Media Hub", path: "/creative-media-hub" },
                         { name: "S.H.I.E.L.D. AI Creative Media Portal", path: "/creative-media-portal" },
                         { name: "S.H.I.E.L.D. AI Drive", path: "/shield-drive" },
                         { name: "S.H.I.E.L.D. AI OS", path: "/shield-os" },
                         { name: "S.H.I.E.L.D. AI Chat", path: "/shield-chat" },
                         { name: "S.H.I.E.L.D. AI Trade Finance Hub", path: "/trade-finance-hub" },
                       ].map((page, index) => (
                         <motion.div
                           key={page.name}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.05 }}
                           className="flex items-center justify-between p-3 rounded-xl bg-card/30 border border-border/20"
                         >
                           <span className="font-medium text-sm">{page.name}</span>
                           <div className="flex items-center gap-2">
                               <CheckCircle className="w-4 h-4 text-green-400" />
                               <span className="text-xs text-green-400">Real-Time Sync</span>
                               <Badge variant="outline" className="text-[8px] py-0 h-4 border-blue-500/30 text-blue-400 font-mono">
                                 Auto Updates
                               </Badge>
                               <Badge variant="outline" className="text-[8px] py-0 h-4 border-green-500/30 text-green-400 font-mono">
                                 Auto Sync
                               </Badge>
                           </div>
                         </motion.div>
                       ))}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20"
                      >
                        <span className="font-bold text-sm">All Pages Overview</span>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                            <span className="text-xs text-primary font-bold font-mono">AUTOMATIC SYNC ACTIVE</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-card/50 rounded-xl border border-border/30">
            <p className="text-sm whitespace-pre-wrap">{selectedMessage?.message}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Received: {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
          </p>
        </DialogContent>
      </Dialog>

       {/* Trading Hub & Enrollments Dialog */}
       <Dialog open={!!selectedTradingHub} onOpenChange={() => setSelectedTradingHub(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>Trading Hub & Enrollments</DialogTitle>
             <DialogDescription>
               Complete enrollment submission details
             </DialogDescription>
           </DialogHeader>
           <div className="mt-4 p-6 bg-card/50 rounded-xl border border-border/30">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Full Name</p>
                   <p className="text-sm font-medium">{selectedTradingHub?.full_name}</p>
                 </div>
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Email</p>
                   <p className="text-sm">{selectedTradingHub?.email}</p>
                 </div>
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Phone</p>
                   <p className="text-sm">{selectedTradingHub?.phone}</p>
                 </div>
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Program Name</p>
                   <p className="text-sm">{selectedTradingHub?.program_name}</p>
                 </div>
               </div>
               <div className="space-y-4">
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Program Duration</p>
                   <p className="text-sm">{selectedTradingHub?.program_duration}</p>
                 </div>
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Deposit Amount</p>
                   <p className="text-sm">${selectedTradingHub?.deposit_amount}</p>
                 </div>
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Compounding</p>
                   <p className="text-sm">{selectedTradingHub?.compounding}</p>
                 </div>
                 <div>
                   <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Status</p>
                   <p className="text-sm capitalize">{selectedTradingHub?.status}</p>
                 </div>
               </div>
             </div>
           </div>
           <p className="text-xs text-muted-foreground mt-2">
             Submitted: {selectedTradingHub && new Date(selectedTradingHub.created_at).toLocaleString()}
           </p>
         </DialogContent>
       </Dialog>

       {/* Prayer Requests Dialog */}
       <Dialog open={!!selectedPrayerRequest} onOpenChange={() => setSelectedPrayerRequest(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>Prayer Requests</DialogTitle>
             <DialogDescription>
               Prayer request submission details
             </DialogDescription>
           </DialogHeader>
           <div className="mt-4 p-6 bg-card/50 rounded-xl border border-border/30 space-y-4">
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Full Name</p>
               <p className="text-sm font-medium">{selectedPrayerRequest?.full_name}</p>
             </div>
             {selectedPrayerRequest?.hebrew_name && (
               <div>
                 <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Hebrew Name</p>
                 <p className="text-sm">{selectedPrayerRequest?.hebrew_name}</p>
               </div>
             )}
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Request Type</p>
               <p className="text-sm capitalize">{selectedPrayerRequest?.request_type}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Prayer Message</p>
               <p className="text-sm whitespace-pre-wrap bg-background/50 p-3 rounded-lg border border-border/20">
                 {selectedPrayerRequest?.prayer_message}
               </p>
             </div>
           </div>
            <p className="text-xs text-muted-foreground mt-2">
              Requested: {selectedPrayerRequest && new Date(selectedPrayerRequest.created_at).toLocaleString()}
            </p>
            {selectedPrayerRequest?.source_page && (
              <p className="text-xs text-muted-foreground mt-1">
                S.H.I.E.L.D. AI Page Submitted: {selectedPrayerRequest.source_page}
              </p>
            )}
         </DialogContent>
       </Dialog>

       {/* Baptism Registry Dialog */}
       <Dialog open={!!selectedBaptismRegistry} onOpenChange={() => setSelectedBaptismRegistry(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>Baptism Registry</DialogTitle>
             <DialogDescription>
               Complete baptism registration details
             </DialogDescription>
           </DialogHeader>
           <div className="mt-4 p-6 bg-card/50 rounded-xl border border-border/30 space-y-4">
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Full Name</p>
               <p className="text-sm font-medium">{selectedBaptismRegistry?.full_name}</p>
             </div>
             {selectedBaptismRegistry?.hebrew_name && (
               <div>
                 <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Hebrew Name</p>
                 <p className="text-sm">{selectedBaptismRegistry?.hebrew_name}</p>
               </div>
             )}
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Registration Type</p>
               <p className="text-sm capitalize">
                 {selectedBaptismRegistry?.registration_type === 'want_baptism' ? 'Wants Baptism' : 'Completed'}
               </p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Date of Baptism</p>
               <p className="text-sm">{selectedBaptismRegistry?.date_of_baptism ? new Date(selectedBaptismRegistry.date_of_baptism).toLocaleDateString() : 'Not scheduled'}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Location</p>
               <p className="text-sm">{selectedBaptismRegistry?.location_of_baptism || 'Not set'}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Officiant</p>
               <p className="text-sm">{selectedBaptismRegistry?.officiant || 'Not assigned'}</p>
             </div>
           </div>
           <p className="text-xs text-muted-foreground mt-2">
             Registered: {selectedBaptismRegistry && new Date(selectedBaptismRegistry.created_at).toLocaleString()}
           </p>
         </DialogContent>
       </Dialog>

       {/* Subscribers Dialog */}
       <Dialog open={!!selectedSubscriber} onOpenChange={() => setSelectedSubscriber(null)}>
         <DialogContent className="max-w-lg">
           <DialogHeader>
             <DialogTitle>Subscribers</DialogTitle>
             <DialogDescription>
               Newsletter subscriber information
             </DialogDescription>
           </DialogHeader>
           <div className="mt-4 p-6 bg-card/50 rounded-xl border border-border/30 space-y-4">
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Email</p>
               <p className="text-sm font-medium">{selectedSubscriber?.email}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Status</p>
               <p className="text-sm">{selectedSubscriber?.is_active ? 'Active' : 'Inactive'}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Subscribed At</p>
               <p className="text-sm">{selectedSubscriber && new Date(selectedSubscriber.subscribed_at).toLocaleString()}</p>
             </div>
           </div>
         </DialogContent>
       </Dialog>

       {/* Chat History Dialog */}
       <Dialog open={!!selectedChatHistory} onOpenChange={() => setSelectedChatHistory(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>Chat History</DialogTitle>
             <DialogDescription>
               Conversation record details
             </DialogDescription>
           </DialogHeader>
           <div className="mt-4 p-6 bg-card/50 rounded-xl border border-border/30 space-y-4">
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Conversation Title</p>
               <p className="text-sm font-medium">{selectedChatHistory?.title || 'Untitled'}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">User ID</p>
               <p className="text-sm font-mono text-xs">{selectedChatHistory?.user_id}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Created</p>
               <p className="text-sm">{selectedChatHistory && new Date(selectedChatHistory.created_at).toLocaleString()}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Last Updated</p>
               <p className="text-sm">{selectedChatHistory && new Date(selectedChatHistory.updated_at).toLocaleString()}</p>
             </div>
           </div>
         </DialogContent>
       </Dialog>

       {/* User Roles Dialog */}
       <Dialog open={!!selectedUserRole} onOpenChange={() => setSelectedUserRole(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>User Role</DialogTitle>
             <DialogDescription>
               User account details and permissions
             </DialogDescription>
           </DialogHeader>
           <div className="mt-4 p-6 bg-card/50 rounded-xl border border-border/30 space-y-4">
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Full Name</p>
               <p className="text-sm font-medium">{selectedUserRole?.full_name || 'Anonymous'}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Email</p>
               <p className="text-sm">{selectedUserRole?.email || 'N/A'}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">User ID</p>
               <p className="text-sm font-mono text-xs">{selectedUserRole?.user_id}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Current Role</p>
               <p className="text-sm capitalize">{getUserRole(selectedUserRole?.user_id || '')}</p>
             </div>
             <div>
               <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Joined</p>
               <p className="text-sm">{selectedUserRole && new Date(selectedUserRole.created_at).toLocaleString()}</p>
             </div>
           </div>
         </DialogContent>
       </Dialog>
      <Footer />
    </div>
  );
};

export default Admin;
