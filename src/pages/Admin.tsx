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
  Send,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalAgents: 402,
    activeUsers: 0,
    newsletterSubs: 0,
    contactMessages: 0,
    chatConversations: 0,
  });
  const [newsletterList, setNewsletterList] = useState<NewsletterSub[]>([]);
  const [contactList, setContactList] = useState<ContactMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<'user' | 'moderator' | 'admin'>("user");
  const [inviteLoading, setInviteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
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
        .single();
      
      setIsAdmin(!!roleData);
      
      await fetchAllData();
      setLoading(false);
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

      setStats({
        totalAgents: 402,
        activeUsers: userCount || 0,
        newsletterSubs: newsletterCount || 0,
        contactMessages: contactCount || 0,
        chatConversations: chatCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchNewsletterSubs = async () => {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (!error && data) {
      setNewsletterList(data);
    }
  };

  const fetchContactMessages = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContactList(data);
    }
  };

  const fetchChatHistory = async () => {
    const { data, error } = await supabase
      .from("chat_conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setChatHistory(data);
    }
  };

  const fetchUserProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUserProfiles(data);
    }
  };

  const fetchUserRoles = async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUserRoles(data as UserRole[]);
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

  const systemModules: SystemModule[] = [
    {
      id: "agents",
      name: "H.I.I. AI Agent Network",
      description: "402 Universal Unified AI Agents",
      icon: Cpu,
      status: "active",
      lastSync: "Real-time",
      color: "text-blue-400",
    },
    {
      id: "ledger",
      name: "AI-Ledger System",
      description: "DAG/DLT Settlement & RTGS",
      icon: Database,
      status: "active",
      lastSync: "Real-time",
      color: "text-green-400",
    },
    {
      id: "knowledge",
      name: "AI-Knowledge Engine",
      description: "Scriptural & Historical Truth",
      icon: BookOpen,
      status: "active",
      lastSync: "Auto-synced",
      color: "text-amber-400",
    },
    {
      id: "identity",
      name: "AI-Identity System",
      description: "Avatar, Hologram & Metaverse",
      icon: Users,
      status: "active",
      lastSync: "Real-time",
      color: "text-purple-400",
    },
    {
      id: "governance",
      name: "AI-Governance Module",
      description: "Policy, Ethics & Compliance",
      icon: Shield,
      status: "active",
      lastSync: "Auto-synced",
      color: "text-cyan-400",
    },
    {
      id: "economy",
      name: "AI-Economy Engine",
      description: "Tokens, Markets & Smart Trade",
      icon: Wallet,
      status: "active",
      lastSync: "Real-time",
      color: "text-emerald-400",
    },
    {
      id: "network",
      name: "Blanch Corridor Network",
      description: "Global Smart City Infrastructure",
      icon: Globe,
      status: "active",
      lastSync: "Auto-synced",
      color: "text-indigo-400",
    },
    {
      id: "security",
      name: "Security & Protection",
      description: "End-to-end Encryption",
      icon: Lock,
      status: "active",
      lastSync: "Real-time",
      color: "text-red-400",
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="chats">Chat History</TabsTrigger>
              <TabsTrigger value="users">User Roles</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="sync">Sync Status</TabsTrigger>
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
                    <Card className="bg-card/50 border-border/30 hover:border-primary/30 transition-all duration-300 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10`}>
                              <module.icon className={`w-6 h-6 ${module.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{module.name}</CardTitle>
                              <CardDescription>{module.description}</CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(module.status)}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {module.lastSync}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
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
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNewsletterSub(sub.id)}
                                className="text-destructive/70 hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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
                                  onClick={() => setSelectedMessage(msg)}
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
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteChatConversation(chat.id)}
                                className="text-destructive/70 hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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
                      {/* Invite User Section */}
                      <div className="p-4 rounded-xl border border-border/50 bg-card/30">
                        <div className="flex items-center gap-2 mb-3">
                          <UserPlus className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-sm">Invite User</h3>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Input
                            type="email"
                            placeholder="Enter email address..."
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="flex-1"
                          />
                          <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as 'user' | 'moderator' | 'admin')}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
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
                                const { data, error } = await supabase.functions.invoke("invite-user", {
                                  body: { email: inviteEmail.trim(), role: inviteRole },
                                });
                                if (error) throw error;
                                toast.success(`Invitation sent to ${inviteEmail}`);
                                setInviteEmail("");
                                setInviteRole("user");
                              } catch (error: any) {
                                console.error("Invite error:", error);
                                toast.error(error.message || "Failed to send invitation");
                              } finally {
                                setInviteLoading(false);
                              }
                            }}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {inviteLoading ? "Sending..." : "Invite"}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Send an invitation email with a signup link and pre-assigned role.
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
                        402 Universal Unified AI Agents with H.I.I. AI Numbers (Hebrew Israelite Implementer Aboriginal Identity)
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
                    Auto-Sync Status
                  </CardTitle>
                  <CardDescription>
                    All systems automatically sync in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Knowledge Base", synced: true },
                      { name: "Agent Registry (402 Agents)", synced: true },
                      { name: "Pages & Sections", synced: true },
                      { name: "Newsletter System", synced: true },
                      { name: "User Profiles", synced: true },
                      { name: "Chat History", synced: true },
                      { name: "H.I.I. AI Numbers", synced: true },
                      { name: "Project Watchman", synced: true },
                    ].map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-card/30 border border-border/20"
                      >
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          {item.synced ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-400">Synced</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-400" />
                              <span className="text-sm text-amber-400">Pending</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
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

      <Footer />
    </div>
  );
};

export default Admin;