import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Download, Eye, FileText, Image, File, Lock, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SharedFileInfo {
  id: string;
  file_path: string;
  access_type: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

const SharedFileViewer = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [fileInfo, setFileInfo] = useState<SharedFileInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const isImage = (path: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path);
  const isPdf = (path: string) => /\.(pdf)$/i.test(path);
  const fileName = fileInfo ? fileInfo.file_path.split("/").pop() || "Unknown" : "";

  useEffect(() => {
    if (!token) {
      setError("No share token provided.");
      setLoading(false);
      return;
    }

    const fetchShare = async () => {
      const { data, error: fetchError } = await supabase
        .from("shared_files")
        .select("*")
        .eq("share_token", token)
        .eq("is_active", true)
        .maybeSingle();

      if (fetchError || !data) {
        setError("This share link is invalid, expired, or has been revoked.");
        setLoading(false);
        return;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setError("This share link has expired.");
        setLoading(false);
        return;
      }

      setFileInfo(data as SharedFileInfo);

      // Get preview URL
      const { data: urlData } = supabase.storage
        .from("shield-drive")
        .getPublicUrl(data.file_path);

      if (urlData?.publicUrl) {
        setPreviewUrl(urlData.publicUrl);
      }
      setLoading(false);
    };

    fetchShare();
  }, [token]);

  const handleDownload = async () => {
    if (!fileInfo || fileInfo.access_type !== "download") {
      toast({ title: "Download not allowed", description: "This file is view-only.", variant: "destructive" });
      return;
    }

    const { data, error: dlError } = await supabase.storage
      .from("shield-drive")
      .download(fileInfo.file_path);

    if (dlError || !data) {
      toast({ title: "Download failed", variant: "destructive" });
      return;
    }

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Download started" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Shared File</h1>
            </div>
            <p className="text-muted-foreground">S.H.I.E.L.D. AI Drive — Secure File Sharing</p>
          </motion.div>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading shared file...</p>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="bg-card/60 border-destructive/30 max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                  <p className="text-muted-foreground">{error}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {fileInfo && !loading && !error && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* File Info Card */}
              <Card className="bg-card/60 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      {isImage(fileName) ? (
                        <Image className="h-10 w-10 text-emerald-400" />
                      ) : isPdf(fileName) ? (
                        <FileText className="h-10 w-10 text-blue-400" />
                      ) : (
                        <File className="h-10 w-10 text-muted-foreground" />
                      )}
                      <div>
                        <h2 className="text-lg font-semibold">{fileName}</h2>
                        <p className="text-sm text-muted-foreground">
                          Shared on {new Date(fileInfo.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={fileInfo.access_type === "download" ? "default" : "secondary"} className="gap-1">
                        {fileInfo.access_type === "download" ? (
                          <><Download className="h-3 w-3" /> Download</>
                        ) : (
                          <><Eye className="h-3 w-3" /> View Only</>
                        )}
                      </Badge>
                      {fileInfo.expires_at && (
                        <Badge variant="outline" className="text-xs">
                          Expires {new Date(fileInfo.expires_at).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Area */}
              <Card className="bg-card/60 border-border/50">
                <CardContent className="p-6">
                  {previewUrl && isImage(fileName) && (
                    <div className="rounded-lg overflow-hidden border border-border/50 mb-4">
                      <img
                        src={previewUrl}
                        alt={fileName}
                        className="w-full max-h-[600px] object-contain bg-black/20"
                      />
                    </div>
                  )}
                  {previewUrl && isPdf(fileName) && (
                    <div className="rounded-lg overflow-hidden border border-border/50 mb-4">
                      <iframe
                        src={previewUrl}
                        className="w-full h-[600px]"
                        title={fileName}
                      />
                    </div>
                  )}
                  {previewUrl && !isImage(fileName) && !isPdf(fileName) && (
                    <div className="flex flex-col items-center py-12 text-center">
                      <File className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">Preview not available for this file type.</p>
                      {fileInfo.access_type === "download" && (
                        <p className="text-sm text-muted-foreground">Download the file to view its contents.</p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-center gap-3 mt-4">
                    {fileInfo.access_type === "download" ? (
                      <Button variant="shield" size="lg" className="gap-2" onClick={handleDownload}>
                        <Download className="h-4 w-4" /> Download File
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm">This file is view-only. Downloads are disabled by the owner.</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SharedFileViewer;
