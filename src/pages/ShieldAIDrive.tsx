import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HardDrive, Upload, Download, FolderOpen, Cloud, Lock, Share2, Database, Shield, Zap, Search, FileText, Image, Video, Music, Archive, Trash2, Star, Clock, Users, File, Loader2, Eye, X, LayoutGrid, FolderPlus, ChevronRight, Home, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const features = [
  { icon: Shield, title: "Quantum Encryption", description: "Military-grade AES-256 + quantum-resistant encryption for all stored data" },
  { icon: Upload, title: "AI-Powered Upload", description: "Smart upload with automatic categorization by H.I.I. AI agents" },
  { icon: Cloud, title: "Infinite Cloud Sync", description: "Real-time sync across all S.H.I.E.L.D. AI OS devices and platforms" },
  { icon: FolderOpen, title: "Intelligent Organization", description: "AI-driven file organization, tagging, and duplicate detection" },
  { icon: Share2, title: "Sovereign Sharing", description: "Share files with blockchain-verified permissions and access logs" },
  { icon: Database, title: "Eternal Archival", description: "Permanent storage on distributed ledger with 888-node redundancy" },
  { icon: Lock, title: "Zero-Knowledge Privacy", description: "Your files are encrypted before leaving your device — only you hold the keys" },
  { icon: Zap, title: "Lightning Access", description: "Edge-cached delivery with sub-millisecond retrieval from any location" },
];

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  metadata: { size?: number; mimetype?: string } | null;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
};

const isImageFile = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext);
};

const isPdfFile = (name: string) => {
  return name.split(".").pop()?.toLowerCase() === "pdf";
};

const isPreviewable = (name: string) => isImageFile(name) || isPdfFile(name);

const getFileIcon = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return Image;
  if (["mp4", "mov", "avi", "mkv"].includes(ext)) return Video;
  if (["mp3", "wav", "flac", "aac"].includes(ext)) return Music;
  if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) return Archive;
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) return FileText;
  return File;
};

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} day(s) ago`;
};

const ShieldAIDrive = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "files" | "gallery" | "upload">("overview");
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewFile, setPreviewFile] = useState<StorageFile | null>(null);
  const [dragging, setDragging] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [moveFile, setMoveFile] = useState<StorageFile | null>(null);
  const [moveFolders, setMoveFolders] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getStoragePath = (fileName?: string) => {
    if (!user) return "";
    const base = [user.id, ...currentPath].join("/");
    return fileName ? `${base}/${fileName}` : base;
  };

  const getPublicUrl = (fileName: string) => {
    if (!user) return "";
    const { data } = supabase.storage.from("shield-drive").getPublicUrl(getStoragePath(fileName));
    return data.publicUrl;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const fetchFiles = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const listPath = [user.id, ...currentPath].join("/");
    const { data, error } = await supabase.storage
      .from("shield-drive")
      .list(listPath, { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) {
      toast({ title: "Error loading files", description: error.message, variant: "destructive" });
    } else {
      const items = (data || []) as (StorageFile & { id: string | null })[];
      // Folders show up as items with id=null and no metadata
      const folderNames = items.filter(f => f.id === null && f.name !== ".emptyFolderPlaceholder").map(f => f.name);
      const fileItems = items.filter(f => f.id !== null && f.name !== ".emptyFolderPlaceholder") as StorageFile[];
      setFolders(folderNames);
      setFiles(fileItems);
    }
    setLoading(false);
  }, [user, toast, currentPath]);

  useEffect(() => {
    if (user) fetchFiles();
  }, [user, fetchFiles]);

  const uploadFiles = async (fileList: FileList | File[]) => {
    if (!user || !fileList.length) return;
    setUploading(true);
    const uploadedCount = { success: 0, fail: 0 };

    for (const file of Array.from(fileList)) {
      const filePath = `${getStoragePath()}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("shield-drive").upload(filePath, file);
      if (error) uploadedCount.fail++;
      else uploadedCount.success++;
    }

    toast({
      title: "Upload Complete",
      description: `${uploadedCount.success} file(s) uploaded${uploadedCount.fail ? `, ${uploadedCount.fail} failed` : ""}`,
    });
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    fetchFiles();
    setActiveTab("files");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragging(false); };

  const handleDownload = async (fileName: string) => {
    if (!user) return;
    const { data, error } = await supabase.storage
      .from("shield-drive")
      .download(getStoragePath(fileName));
    if (error) {
      toast({ title: "Download failed", description: error.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/^\d+_/, "");
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (fileName: string) => {
    if (!user) return;
    const { error } = await supabase.storage
      .from("shield-drive")
      .remove([getStoragePath(fileName)]);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "File deleted" });
      fetchFiles();
    }
  };

  const handleCreateFolder = async () => {
    if (!user || !newFolderName.trim()) return;
    const folderPath = `${getStoragePath()}/${newFolderName.trim()}/.emptyFolderPlaceholder`;
    const { error } = await supabase.storage
      .from("shield-drive")
      .upload(folderPath, new Blob([""]), { contentType: "text/plain" });
    if (error) {
      toast({ title: "Failed to create folder", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Folder "${newFolderName.trim()}" created` });
      setNewFolderName("");
      setShowNewFolderDialog(false);
      fetchFiles();
    }
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath(prev => [...prev, folderName]);
    setSearchQuery("");
  };

  const navigateToBreadcrumb = (index: number) => {
    setCurrentPath(prev => prev.slice(0, index));
    setSearchQuery("");
  };

  const handleMoveFile = async (targetFolder: string) => {
    if (!user || !moveFile) return;
    const sourcePath = getStoragePath(moveFile.name);
    const targetPath = targetFolder === "__root__"
      ? `${user.id}/${moveFile.name}`
      : `${getStoragePath()}/${targetFolder}/${moveFile.name}`;

    const { data, error: dlError } = await supabase.storage.from("shield-drive").download(sourcePath);
    if (dlError) {
      toast({ title: "Move failed", description: dlError.message, variant: "destructive" });
      return;
    }
    const { error: upError } = await supabase.storage.from("shield-drive").upload(targetPath, data);
    if (upError) {
      toast({ title: "Move failed", description: upError.message, variant: "destructive" });
      return;
    }
    await supabase.storage.from("shield-drive").remove([sourcePath]);
    toast({ title: `File moved to ${targetFolder === "__root__" ? "root" : targetFolder}` });
    setMoveFile(null);
    fetchFiles();
  };

  const totalSize = files.reduce((sum, f) => sum + (f.metadata?.size || 0), 0);
  useEffect(() => {
    if (moveFile && user) {
      const listPath = [user.id, ...currentPath].join("/");
      supabase.storage.from("shield-drive").list(listPath, { limit: 100 }).then(({ data }) => {
        const folderNames = (data || []).filter((f: any) => f.id === null && f.name !== ".emptyFolderPlaceholder").map((f: any) => f.name);
        setMoveFolders(folderNames);
      });
    }
  }, [moveFile, user, currentPath]);
  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fileCategoryCounts = [
    { icon: FileText, label: "Documents", count: files.filter(f => /\.(pdf|doc|docx|txt|md|xlsx|csv)$/i.test(f.name)).length, color: "text-blue-400" },
    { icon: Image, label: "Images", count: files.filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)).length, color: "text-emerald-400" },
    { icon: Video, label: "Videos", count: files.filter(f => /\.(mp4|mov|avi|mkv)$/i.test(f.name)).length, color: "text-purple-400" },
    { icon: Music, label: "Audio", count: files.filter(f => /\.(mp3|wav|flac|aac)$/i.test(f.name)).length, color: "text-amber-400" },
    { icon: Archive, label: "Archives", count: files.filter(f => /\.(zip|tar|gz|rar|7z)$/i.test(f.name)).length, color: "text-rose-400" },
    { icon: File, label: "Other", count: files.filter(f => !/\.(pdf|doc|docx|txt|md|xlsx|csv|jpg|jpeg|png|gif|webp|svg|mp4|mov|avi|mkv|mp3|wav|flac|aac|zip|tar|gz|rar|7z)$/i.test(f.name)).length, color: "text-cyan-400" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">S.H.I.E.L.D. AI DRIVE</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              S.H.I.E.L.D. AI <span className="text-primary">Drive</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sovereign cloud storage powered by quantum encryption and AI-driven organization — your data, your keys, eternal access.
            </p>
          </motion.div>

          {/* Storage Overview Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-card/60 border-border/50 mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <HardDrive className="h-5 w-5 text-primary" />
                      Storage Usage
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(totalSize)} used • {files.length} file(s)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleUpload}
                    />
                    {user ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                        {uploading ? "Uploading..." : "Upload Files"}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast({ title: "Sign in required", description: "Please sign in to upload files." })}>
                        <Upload className="h-3.5 w-3.5" /> Upload Files
                      </Button>
                    )}
                  </div>
                </div>
                <Progress value={files.length > 0 ? Math.min((totalSize / (1024 * 1024 * 1024)) * 10, 100) : 0} className="h-3 mb-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8">
            {[
              { key: "overview" as const, label: "Overview", icon: HardDrive },
              { key: "files" as const, label: "All Files", icon: FolderOpen },
              { key: "gallery" as const, label: "Gallery", icon: LayoutGrid },
              { key: "upload" as const, label: "Upload", icon: Upload },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "shield" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className="gap-1.5"
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* File Categories */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  File Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {fileCategoryCounts.map((cat, i) => (
                    <motion.div key={cat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group" onClick={() => setActiveTab("files")}>
                        <CardContent className="p-4 text-center">
                          <cat.icon className={`h-8 w-8 mx-auto mb-2 ${cat.color} group-hover:scale-110 transition-transform`} />
                          <p className="text-sm font-medium">{cat.label}</p>
                          <p className="text-xs text-muted-foreground">{cat.count} file(s)</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Drive Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {features.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                        <CardHeader className="pb-2">
                          <f.icon className="w-7 h-7 text-primary mb-1" />
                          <CardTitle className="text-base">{f.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{f.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* All Files Tab */}
          {activeTab === "files" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-primary" />
                      All Files ({files.length + folders.length})
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {user && (
                        <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs" onClick={() => setShowNewFolderDialog(true)}>
                          <FolderPlus className="h-3.5 w-3.5" /> New Folder
                        </Button>
                      )}
                      <div className="relative w-full sm:w-48">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 h-8 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Breadcrumb */}
                  {currentPath.length > 0 && (
                    <div className="flex items-center gap-1 text-xs flex-wrap">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1" onClick={() => navigateToBreadcrumb(0)}>
                        <Home className="h-3 w-3" /> Root
                      </Button>
                      {currentPath.map((seg, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => navigateToBreadcrumb(i + 1)}
                          >
                            {seg}
                          </Button>
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!user ? (
                    <div className="text-center py-12">
                      <Lock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground mb-4">Sign in to access your files</p>
                      <Button variant="shield" size="sm" className="gap-1.5" onClick={() => navigate("/auth")}>
                        <Lock className="h-3.5 w-3.5" /> Sign In
                      </Button>
                    </div>
                  ) : loading ? (
                    <div className="text-center py-12">
                      <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Loading files...</p>
                    </div>
                  ) : filteredFiles.length === 0 && folders.length === 0 ? (
                    <div className="text-center py-12">
                      <FolderOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">
                        {searchQuery ? "No files match your search" : "No files yet — upload your first file!"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {/* Folders */}
                      {folders.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase())).map((folder, i) => (
                        <motion.div
                          key={`folder-${folder}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors group"
                          onClick={() => navigateToFolder(folder)}
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpen className="h-5 w-5 text-primary shrink-0" />
                            <div>
                              <p className="text-sm font-medium group-hover:text-primary transition-colors">{folder}</p>
                              <p className="text-xs text-muted-foreground">Folder</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                      {/* Files */}
                      {filteredFiles.map((file, i) => {
                        const FileIcon = getFileIcon(file.name);
                        const displayName = file.name.replace(/^\d+_/, "");
                        const previewable = isPreviewable(file.name);
                        const isImage = isImageFile(file.name);
                        return (
                          <motion.div
                            key={file.id || file.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors group"
                            onClick={() => previewable ? setPreviewFile(file) : undefined}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {isImage ? (
                                <img
                                  src={getPublicUrl(file.name)}
                                  alt={displayName}
                                  className="h-10 w-10 rounded object-cover border border-border/50 shrink-0"
                                  loading="lazy"
                                />
                              ) : (
                                <FileIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{displayName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {file.metadata?.size ? formatFileSize(file.metadata.size) : "—"} • {timeAgo(file.created_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {previewable && (
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); setPreviewFile(file); }}>
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                              )}
                              {folders.length > 0 && (
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); setMoveFile(file); }} title="Move to folder">
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); handleDownload(file.name); }}>
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(file.name); }}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card/60 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-primary" />
                    Image Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!user ? (
                    <div className="text-center py-12">
                      <Lock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground mb-4">Sign in to view your gallery</p>
                      <Button variant="shield" size="sm" className="gap-1.5" onClick={() => navigate("/auth")}>
                        <Lock className="h-3.5 w-3.5" /> Sign In
                      </Button>
                    </div>
                  ) : loading ? (
                    <div className="text-center py-12">
                      <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Loading gallery...</p>
                    </div>
                  ) : (() => {
                    const imageFiles = files.filter(f => isImageFile(f.name));
                    return imageFiles.length === 0 ? (
                      <div className="text-center py-12">
                        <Image className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">No images yet — upload some to see them here!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {imageFiles.map((file, i) => {
                          const displayName = file.name.replace(/^\d+_/, "");
                          return (
                            <motion.div
                              key={file.id || file.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              className="group relative aspect-square rounded-lg overflow-hidden border border-border/50 hover:border-primary/40 cursor-pointer transition-all hover:shadow-lg"
                              onClick={() => setPreviewFile(file)}
                            >
                              <img
                                src={getPublicUrl(file.name)}
                                alt={displayName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-2">
                                  <p className="text-xs text-white font-medium truncate">{displayName}</p>
                                  <p className="text-[10px] text-white/70">
                                    {file.metadata?.size ? formatFileSize(file.metadata.size) : ""}
                                  </p>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-black/40 hover:bg-black/60 text-white" onClick={(e) => { e.stopPropagation(); handleDownload(file.name); }}>
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-black/40 hover:bg-destructive/80 text-white" onClick={(e) => { e.stopPropagation(); handleDelete(file.name); }}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {!user ? (
                <div className="text-center py-16">
                  <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">Please sign in to upload files to your S.H.I.E.L.D. AI Drive.</p>
                  <Button variant="shield" size="sm" className="gap-1.5" onClick={() => navigate("/auth")}>
                    <Lock className="h-3.5 w-3.5" /> Sign In
                  </Button>
                </div>
              ) : (
                <Card className="bg-card/60 border-border/50">
                  <CardContent className="p-8">
                    <div
                      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                        dragging
                          ? "border-primary bg-primary/5 scale-[1.01]"
                          : "border-border/60 hover:border-primary/40"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
                          <h3 className="text-lg font-semibold mb-2">Uploading...</h3>
                          <p className="text-sm text-muted-foreground">Your files are being encrypted and uploaded securely.</p>
                        </>
                      ) : dragging ? (
                        <>
                          <Upload className="h-16 w-16 mx-auto mb-4 text-primary animate-bounce" />
                          <h3 className="text-lg font-semibold mb-2 text-primary">Drop files here</h3>
                          <p className="text-sm text-muted-foreground">Release to begin secure upload</p>
                        </>
                      ) : (
                        <>
                          <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                          <h3 className="text-lg font-semibold mb-2">Drag & drop files or click to upload</h3>
                          <p className="text-sm text-muted-foreground mb-4">Upload any file type — documents, images, videos, archives, AI models</p>
                          <Button variant="shield" size="sm" className="gap-1.5">
                            <Upload className="h-3.5 w-3.5" /> Select Files
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Platform Support */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["S.H.I.E.L.D. AI OS", "Blanch OS", "macOS", "Windows", "Linux", "iOS", "Android", "Universal API"].map((os) => (
              <div key={os} className="text-center p-3 rounded-lg bg-card/30 border border-border/30">
                <span className="text-sm font-medium">{os}</span>
              </div>
            ))}
          </div>

          <div className="text-center p-8 rounded-xl bg-card/30 border border-border/30">
            <p className="text-lg font-semibold text-primary mb-2">Managed by the Blanch Group</p>
            <p className="text-muted-foreground">Stabilizing economies and restoring humanity under the Laws & Commandments of the Most High AHAYAH.</p>
          </div>

          {/* File Preview Dialog */}
          <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-sm truncate">
                  {previewFile && isImageFile(previewFile.name) ? <Image className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-primary" />}
                  {previewFile?.name.replace(/^\d+_/, "")}
                </DialogTitle>
              </DialogHeader>
              {previewFile && (
                <div className="flex flex-col items-center overflow-auto max-h-[70vh]">
                  {isImageFile(previewFile.name) ? (
                    <img
                      src={getPublicUrl(previewFile.name)}
                      alt={previewFile.name.replace(/^\d+_/, "")}
                      className="max-w-full max-h-[65vh] object-contain rounded-lg"
                    />
                  ) : isPdfFile(previewFile.name) ? (
                    <iframe
                      src={getPublicUrl(previewFile.name)}
                      title={previewFile.name.replace(/^\d+_/, "")}
                      className="w-full h-[65vh] rounded-lg border border-border/50"
                    />
                  ) : null}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleDownload(previewFile.name)}>
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShieldAIDrive;
