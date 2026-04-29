import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Paperclip, UploadCloud, FolderUp, File, X, Info, Cloud, HardDrive, Smartphone, Link2, Github } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CLOUD_SOURCES = [
  { id: "local", name: "Local Device", icon: Smartphone, color: "text-primary" },
  { id: "blanch-cloud", name: "Blanch Cloud", icon: Cloud, color: "text-blue-500" },
  { id: "blanch-drive", name: "Blanch Drive", icon: HardDrive, color: "text-blue-600" },
  { id: "shield-cloud", name: "S.H.I.E.L.D. AI Cloud", icon: Cloud, color: "text-shield-accent" },
  { id: "shield-drive", name: "S.H.I.E.L.D. AI Drive", icon: HardDrive, color: "text-green-500" },
  { id: "apple-icloud", name: "Apple iCloud", icon: Cloud, color: "text-gray-400" },
  { id: "google-drive", name: "Google Drive", icon: HardDrive, color: "text-yellow-500" },
  { id: "onedrive", name: "Microsoft OneDrive", icon: HardDrive, color: "text-blue-400" },
  { id: "whatsapp", name: "WhatsApp", icon: Smartphone, color: "text-green-600" },
  { id: "telegram", name: "Telegram", icon: Smartphone, color: "text-blue-300" },
  { id: "botim", name: "Botim", icon: Smartphone, color: "text-purple-500" },
  { id: "url", name: "URL Link", icon: Link2, color: "text-primary" },
  { id: "github", name: "GitHub Repository", icon: Github, color: "text-gray-600" }
];

export const AdvancedFileUpload = ({ onFilesSelected }: { onFilesSelected?: (files: File[]) => void }) => {
  const [selectedFiles, setSelectedFiles] = useState<{file: File, origin: string}[]>([]);
  const [activeSource, setActiveSource] = useState<string>("local");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isFolder: boolean = false) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        origin: isFolder ? (file.webkitRelativePath || 'Local Directory') : 'Local Storage'
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (onFilesSelected) {
      onFilesSelected(selectedFiles.map(f => f.file));
    }
    setSelectedFiles([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary h-8 w-8" title="Advanced File Upload">
          <Paperclip className="w-4 h-4" />
        </Button>
      </DialogTrigger>
<DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
             Intelligent Universal File Upload System
             <Button variant="ghost" size="icon" className="w-5 h-5 rounded-full p-0">
                <Info className="w-4 h-4 text-muted-foreground" />
             </Button>
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">Select files from your device or connect to cloud storage</p>
        </DialogHeader>

        <Tabs value={activeSource} onValueChange={setActiveSource} className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full h-auto p-1">
            {CLOUD_SOURCES.slice(0, 7).map(source => (
              <TabsTrigger key={source.id} value={source.id} className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-primary/10">
                <source.icon className={`w-4 h-4 ${source.color}`} />
                <span className="text-[10px]">{source.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full h-auto p-1 mt-2">
            {CLOUD_SOURCES.slice(7).map(source => (
              <TabsTrigger key={source.id} value={source.id} className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-primary/10">
                <source.icon className={`w-4 h-4 ${source.color}`} />
                <span className="text-[10px]">{source.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {CLOUD_SOURCES.map(source => (
            <TabsContent key={source.id} value={source.id} className="mt-4">
              <div className="border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                onClick={() => source.id === 'local' ? fileInputRef.current?.click() : null}>
                <source.icon className={`w-12 h-12 ${source.color} mb-3`} />
                <h4 className="font-semibold text-sm mb-1">{source.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {source.id === 'local' ? 'Click to browse files and folders or Drag and Drop' : `Connect to ${source.name} to import files`}
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div 
            className="border-2 border-dashed border-border/50 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-semibold text-sm mb-1">Select Files</h4>
            <p className="text-xs text-muted-foreground">All formats supported</p>
          </div>

          <div 
            className="border-2 border-dashed border-border/50 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-secondary/50 hover:bg-secondary/5 transition-colors cursor-pointer"
            onClick={() => folderInputRef.current?.click()}
          >
            <FolderUp className="w-8 h-8 text-secondary mb-3" />
            <h4 className="font-semibold text-sm mb-1">Select Folder</h4>
            <p className="text-xs text-muted-foreground">Upload entire directories</p>
          </div>
        </div>

        {/* Hidden Inputs */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={(e) => handleFileChange(e, false)} 
          className="hidden" 
          multiple 
        />
        <input 
          type="file" 
          ref={folderInputRef} 
          onChange={(e) => handleFileChange(e, true)} 
          className="hidden" 
          {...({ webkitdirectory: "true", directory: "true" } as any)} 
        />

        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-semibold">Staged for Upload</h4>
              <Badge variant="secondary" className="text-[10px]">{selectedFiles.length} files</Badge>
            </div>
            <ScrollArea className="h-[200px] border border-border/50 rounded-xl bg-card/50 p-2">
              <div className="space-y-2">
                {selectedFiles.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-background p-2 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <File className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{item.file.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          Origin: {item.origin} • {(item.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => removeFile(index)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/50">
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogTrigger>
          <Button variant="shield" size="sm" onClick={handleUpload} disabled={selectedFiles.length === 0}>
            Confirm Upload Matrix
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
