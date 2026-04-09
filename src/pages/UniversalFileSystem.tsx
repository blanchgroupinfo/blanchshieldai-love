import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import {
  FolderOpen, Upload, Monitor, Globe, Shield,
  FileText, Palette, Sparkles, FileType, Layout,
  Video, Archive, Database, Plus, HardDrive,
  Cloud, Link, Lock, Settings, Clock,
  CheckCircle, Share2, Music, Layers, Activity,
  Eye, Zap, Brain, ArrowDownToLine, ArrowUpFromLine, FolderPlus, FilePlus, File, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const osSystems = ["S.H.I.E.L.D. AI OS", "Blanch OS", "macOS", "IOS", "Android", "Windows", "Linux", "Universal"];
const fileSystems = ["NTFS", "APFS", "HFS+", "ext4", "FAT32", "exFAT", "Flatpak"];

const allFormatsList = "3dm 3ds 3mf aac aaf ada adb ads ai aif akp als animated gif apk app as asm asp aspx au au3 avi avif avs avsi bas bash bat bb bc bi blend blender bmp c caf cbl cc ccx cdb cdc cdd cdr cdt cfg ckpt cl cln cmake cmd cmx cob coffee conf config copy cpp cpy cs csd csh css csv cxx d dae db dds deb diff dll dmg doc docx dotx dpx dwg dxf em emf erl exe exr f f23 f2k f77 f90 f95 favicon.ico fax fbx fdr fdx fdxt flac flp fst for forth fountain gd gguf gif gitattributes gitconfig glb gltf go gui h h5 hdf5 heic heif hex hh hpp hrl hs hta htm html hws hxx i ico ifc ihs inf ini ino iss iso itcl java jfi jfif jpeg jpg js jsm json json5 jsonc jsonl jsp jsx kix kml kotlin las lex lisp litcoffee logic logicx lsp lst lua m mak mar markdown md mib mid midi mjs mk ml mli mlmodel mlpackage mm mms mot mov mp3 mp4 mpc mpeg msi mx mxml nim nsh nsi nt npy npz obj ogg omf onnx orc osx p6 pack parquet pas patch pb pcx pdf pgm ph php php3 php4 php5 phps phpt pkl pkg pl plx ply pm pm6 png pod6 pr pro profile properties prores ps ps1 psb psd psd1 psm1 pt ptf pts pth ptx pxi py pyd pyi pyw pyx r r2 r3 raku rakudoc rakumod rakutest rar raw rb rbw rc reb reg rpm rs s safetensors sas scm sco sh shtm shtml skp smd sml snd song spf splus sql sqlite src srec srt ss st step stl stp stpz sty sv svg svh swift sxml t t2t tab tcl tek tex tga tfrecord tflite thy tiff toml ts tsql tsx txt url usd usdz v vb vba vbs vdx vh vhd vhdl vsd vsdm vsdx vtk vtp vtt wasm wav webp wer wmf wol wpg wrl x x3d xaml xcf xht xhtml xls xlsx xltx xml xpj xpm xsd xsl xul yaml yml zip";

const formatCategories = [
  { name: "3D Model", icon: "🧊", formats: ["3dm", "3ds", "3mf", "blend", "dae", "fbx", "glb", "gltf", "ifc", "obj", "ply", "skp", "stl", "step", "stp", "stpz", "usd", "usdz", "vtk", "vtp", "wrl", "x3d"] },
  { name: "AI", icon: "🤖", formats: ["json", "json5", "jsonc", "yaml", "yml"] },
  { name: "AI Models", icon: "🧠", formats: ["ckpt", "gguf", "h5", "hdf5", "jsonl", "mar", "mlmodel", "mlpackage", "npy", "npz", "onnx", "parquet", "pb", "pkl", "pt", "pth", "safetensors", "tfrecord", "tflite"] },
  { name: "Archive", icon: "📦", formats: ["iso", "rar", "zip"] },
  { name: "Avatar", icon: "👤", formats: ["blend", "fbx", "glb", "gltf", "obj", "usd", "usdz"] },
  { name: "Audio", icon: "🔊", formats: ["aac", "aif", "aiff", "au", "caf", "flac", "flp", "fst", "logic", "logicx", "mid", "midi", "mp3", "mpc", "ogg", "ptf", "pts", "ptx", "snd", "song", "pr", "wav"] },
  { name: "Banking", icon: "🏦", formats: ["qif", "ofx", "csv", "xls", "xlsx"] },
  { name: "CAD", icon: "🏗", formats: ["3dm", "dwg", "dxf", "ifc", "step", "stp", "stpz"] },
  { name: "Document", icon: "📄", formats: ["doc", "docx", "dotx", "fdr", "fdx", "fdxt", "fountain", "litcoffee", "md", "pdf", "tex", "txt"] },
  { name: "Finance", icon: "💰", formats: ["csv", "mx", "sql", "sqlite", "xls", "xlsx"] },
  { name: "Film", icon: "🎬", formats: ["aaf", "edl", "omf", "mov", "mp4", "mpeg", "prores"] },
  { name: "Gaming", icon: "🎮", formats: ["pak", "pack", "smd", "unity", "vpk", "wasm"] },
  { name: "Graphics Design", icon: "🎨", formats: ["ai", "cdr", "cdt", "cmx", "psb", "psd", "xcf"] },
  { name: "Hologram", icon: "🔮", formats: ["3dm", "fbx", "glb", "gltf", "obj", "usd", "usdz", "wrl", "x3d"] },
  { name: "Image", icon: "🖼", formats: ["bmp", "dds", "dpx", "emf", "exr", "fax", "gif", "heic", "heif", "ico", "jfi", "jfif", "jpeg", "jpg", "pcx", "pgm", "png", "raw", "tga", "tiff", "webp", "wmf", "wpg", "xpm"] },
  { name: "Metaverse", icon: "🌐", formats: ["blend", "fbx", "glb", "gltf", "obj", "usd", "usdz", "wasm"] },
  { name: "Animated SVG", icon: "🌀", formats: ["animated gif", "gif", "svg", "webp"] },
  { name: "Final Draft Script", icon: "🎭", formats: ["fdx", "fdxt", "fountain"] },
  { name: "Music (DAW)", icon: "🎵", formats: ["aaf", "akp", "als", "caf", "flp", "fst", "fxt", "logic", "logicx", "mid", "midi", "mp3", "mpc", "song", "ptf", "pts", "ptx", "omf", "snd", "pgm", "xpm", "xpj", "wav"] },
  { name: "Software", icon: "💻", formats: ["apk", "app", "deb", "dll", "dmg", "exe", "msi", "pkg", "rpm", "wer"] },
  { name: "Spreadsheet", icon: "📊", formats: ["csv", "xls", "xlsx", "xltx", "tab"] },
  { name: "Television", icon: "📺", formats: ["avi", "avif", "mov", "mp4", "mpeg", "mms", "wma"] },
  { name: "SVG", icon: "🧬", formats: ["svg"] },
  { name: "Technology", icon: "⚙️", formats: ["ada", "asm", "asp", "aspx", "bash", "bat", "c", "cbl", "cfg", "cmake", "cmd", "cob", "coffee", "conf", "config", "copy", "cpp", "cs", "d", "db", "diff", "erl", "f", "for", "forth", "gd", "gitattributes", "go", "h", "hpp", "hs", "html", "ini", "iso", "java", "js", "json", "jsp", "kotlin", "lex", "lisp", "lua", "m", "mak", "mm", "mxml", "nim", "pas", "patch", "php", "pl", "pm", "profile", "properties", "ps1", "py", "r", "rb", "reg", "rs", "s", "sas", "scm", "sco", "sh", "shtm", "shtml", "skp", "smd", "sml", "snd", "song", "spf", "splus", "sql", "sqlite", "src", "srec", "srt", "ss", "st", "step", "stl", "stp", "stpz", "sty", "sv", "svg", "svh", "swift", "sxml", "t", "t2t", "tab", "tcl", "tek", "tex", "tga", "thy", "tiff", "toml", "ts", "tsql", "tsx", "txt", "url", "usd", "usdz", "v", "vb", "vba", "vbs", "vdx", "vh", "vhd", "vhdl", "vsd", "vsdm", "vsdx", "vtk", "vtp", "vtt", "wasm", "wav", "webp", "wer", "wmf", "wol", "wpg", "wrl", "x", "x3d", "xaml", "xcf", "xht", "xhtml", "xls", "xlsx", "xltx", "xml", "xpj", "xpm", "xsd", "xsl", "xul", "yaml", "yml", "zip"] },
  { name: "Vector", icon: "🧭", formats: ["ai", "cdr", "cmx", "svg", "emf", "wmf"] },
  { name: "Video", icon: "🎥", formats: ["avi", "avif", "mov", "mp4", "mpeg", "mms", "wma"] },
  { name: "Web", icon: "🌐", formats: ["asp", "aspx", "css", "htm", "html", "js", "jsx", "json", "php", "xml", "xhtml", "xht", "wasm"] },
];

const syncServices = [
  { name: "S.H.I.E.L.D. AI Cloud", icon: Cloud, status: "Connected", color: "text-blue-400" },
  { name: "S.H.I.E.L.D. AI Drive", icon: HardDrive, status: "Connected", color: "text-indigo-400" },
  { name: "Blanch Cloud", icon: Cloud, status: "Connected", color: "text-emerald-400" },
  { name: "Blanch Drive", icon: HardDrive, status: "Connected", color: "text-teal-400" },
  { name: "Apple iCloud", icon: Cloud, status: "Connected", color: "text-slate-400" },
  { name: "Google Drive", icon: Cloud, status: "Connected", color: "text-emerald-500" },
  { name: "Dropbox", icon: Layers, status: "Connected", color: "text-blue-500" },
  { name: "OneDrive", icon: Cloud, status: "Connected", color: "text-blue-600" },
];

const recentFiles = [
  { name: "Brand Guidelines 2024.pdf", size: "4.2 MB", time: "2 hours ago", icon: FileText, color: "text-blue-400" },
  { name: "Marketing Campaign Assets.zip", size: "156 MB", time: "1 day ago", icon: Archive, color: "text-orange-400" },
  { name: "Scripture Study Notes.docx", size: "892 KB", time: "2 days ago", icon: FileText, color: "text-indigo-400" },
  { name: "Team Meeting Recording.mp4", size: "2.1 GB", time: "3 days ago", icon: Video, color: "text-red-400" },
];

const quickAccess = [
  { name: "Documents", icon: FileText },
  { name: "Images", icon: Palette },
  { name: "Videos", icon: Video },
  { name: "Music", icon: Music },
  { name: "Projects", icon: Layers },
  { name: "Shared with Me", icon: Share2 },
];

const UniversalFileSystem = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const sidebarItems = [
    { name: "Overview", icon: Layout },
    { name: "File Formats", icon: FileType },
    { name: "File Manager", icon: FolderOpen },
    { name: "Cloud Storage", icon: Cloud },
    { name: "Security", icon: Lock },
    { name: "Settings", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Used Storage", value: "8.2 TB", icon: Database, color: "text-primary" },
                { label: "Uptime", value: "99.99%", icon: Activity, color: "text-emerald-400" },
                { label: "Sync Speed", value: "1.2 GB/s", icon: Zap, color: "text-amber-400" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} className="bg-card/50 border-border/50 text-center p-6 shadow-none">
                    <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                    <p className="text-2xl font-bold mb-1">{item.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{item.label}</p>
                  </Card>
                );
              })}
            </div>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" /> Cross-Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "✓ Create/Read/Write S.H.I.E.L.D. AI OS/Blanch OS/Mac/Windows/Linux",
                    "✓ Create/Read/Write Windows files on S.H.I.E.L.D. AI OS/Blanch OS/Mac/Linux",
                    "✓ Create/Read/Write Mac files on S.H.I.E.L.D. AI OS/Blanch OS/Windows/Linux",
                    "✓ Create/Read/Write Linux files on S.H.I.E.L.D. AI OS/Blanch OS/Windows/Mac",
                    "✓ Create/Read/Write iOS files on S.H.I.E.L.D. AI OS/Blanch OS/Mac/Windows/Linux",
                    "✓ Create/Read/Write Android files on S.H.I.E.L.D. AI OS/Blanch OS/Mac/Windows/Linux",
                    "✓ Create/Read/Write All File Formats on S.H.I.E.L.D. AI OS/Blanch OS/Mac/Windows/Linux",
                    "✓ Automatic format conversion" ,
                    "✓ Automatic file type detection" ,
                    "✓ Automatic file type compression" ,
                    "✓ Automatic file type encryption" ,
                    "✓ Automatic file type decryption" ,
                    "✓ Automatic file type conversion" ,
                    "✓ Automatic file type compression" ,
                    "✓ Persistence storage support" ,
                    "✓ Redundant backup support" ,
                    "✓ Real-time sync across all devices and platforms" ,
                    "✓ Secure sharing with granular permission controls" ,
                    "✓ End-to-end encrypted storage with sovereign privacy" ,
                    "✓ Zero-knowledge privacy-first data architecture" ,
                    "✓ Military-grade encryption" ,
                    "✓ AES-256-GCM data encryption" ,
                    "✓ AES-256-GCM data encryption" ,
                    "✓ Import & Export all file formats" 
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "File Formats":
        return (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><FileType className="w-6 h-6 text-primary" /> All File Formats Overview</h2>
              <Card className="bg-card/50 border-border/50 shadow-none">
                <CardContent className="p-6">
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">{allFormatsList}</p>
                </CardContent>
              </Card>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-8">Supported File Formats & Standards</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex flex-wrap justify-center gap-1 bg-transparent h-auto p-0 mb-6">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">All</TabsTrigger>
                  <TabsTrigger value="hologram" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Hologram</TabsTrigger>
                  <TabsTrigger value="metaverse" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Metaverse</TabsTrigger>
                  <TabsTrigger value="television" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Television</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formatCategories.map((category) => (
                      <Card key={category.name} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all shadow-none">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                          <div className="text-2xl">{category.icon}</div>
                          <CardTitle className="text-base">{category.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {category.formats.map((fmt) => (
                              <Badge key={fmt} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary/80 font-mono">{fmt}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="hologram">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all shadow-none">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="text-2xl">🔮</div>
                        <CardTitle className="text-base">Hologram</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          {formatCategories.find(c => c.name === "Hologram")?.formats.map((fmt) => (
                            <Badge key={fmt} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary/80 font-mono">{fmt}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="metaverse">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all shadow-none">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="text-2xl">🌐</div>
                        <CardTitle className="text-base">Metaverse</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          {formatCategories.find(c => c.name === "Metaverse")?.formats.map((fmt) => (
                            <Badge key={fmt} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary/80 font-mono">{fmt}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="television">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all shadow-none">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="text-2xl">📺</div>
                        <CardTitle className="text-base">Television</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          {formatCategories.find(c => c.name === "Television")?.formats.map((fmt) => (
                            <Badge key={fmt} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary/80 font-mono">{fmt}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        );
      case "File Manager":
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400" /> Quick Access</h3>
                <Button variant="shield" size="sm" className="gap-2" onClick={() => {}}><FolderOpen className="w-4 h-4" /> Open File Manager</Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {quickAccess.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.name} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group text-center p-4 shadow-none">
                      <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 mx-auto mb-2 transition-colors w-fit"><Icon className="w-6 h-6 text-primary" /></div>
                      <p className="text-xs font-medium">{item.name}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> Recent Files</h3>
                <Button variant="link" size="sm" className="text-xs">View All</Button>
              </div>
              <div className="space-y-2">
                {recentFiles.map((file) => {
                  const Icon = file.icon;
                  return (
                    <Card key={file.name} className="bg-card/30 border-border/40 hover:border-primary/20 transition-all cursor-pointer shadow-none">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-background/50"><Icon className={`w-5 h-5 ${file.color}`} /></div>
                          <div><p className="text-sm font-medium">{file.name}</p><p className="text-[10px] text-muted-foreground">{file.size} · {file.time}</p></div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="w-4 h-4" /></Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case "Cloud Storage":
        return (
          <div className="space-y-8">
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Link className="w-6 h-6 text-primary" /> Connected Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {syncServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div key={service.name} className="flex items-center justify-between p-4 rounded-lg bg-background/40 border border-border/20">
                        <div className="flex items-center gap-3"><Icon className={`w-6 h-6 ${service.color}`} /><span className="font-medium">{service.name}</span></div>
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5">Connected</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "Security":
        return (
          <div className="space-y-8">
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> Security Protocols</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-emerald-500/5 border-emerald-500/20 p-6 shadow-none">
                    <Lock className="w-8 h-8 text-emerald-500 mb-4" />
                    <h4 className="font-bold mb-2">Military-Grade Encryption</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">AES-256-GCM data encryption.</p>
                  </Card>
                  <Card className="bg-blue-500/5 border-blue-500/20 p-6 shadow-none">
                    <Eye className="w-8 h-8 text-blue-500 mb-4" />
                    <h4 className="font-bold mb-2">Zero-Knowledge</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Privacy-first data architecture.</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "Settings":
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-primary" /> System Settings</h3>
            <div className="space-y-4">
              {[{ title: "Auto-Sync", desc: "Sync files across devices", icon: Cloud }, { title: "File Versioning", desc: "History of file changes", icon: Clock }, { title: "AI Organization", desc: "Smart file management", icon: Brain }].map((setting) => {
                const Icon = setting.icon;
                return (
                  <Card key={setting.title} className="bg-card/40 border-border/20 shadow-none">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4"><Icon className="w-5 h-5 text-primary" /><div><h4 className="font-semibold text-sm">{setting.title}</h4><p className="text-xs text-muted-foreground">{setting.desc}</p></div></div>
                      <div className="w-10 h-5 bg-primary/20 rounded-full relative border border-primary/30"><div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" /></div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 font-mono uppercase tracking-widest">Universal File System</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">S.H.I.E.L.D. AI <span className="text-primary">Universal File System Manager</span></h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Create, Read, Organize all file formats — cross-platform universal file management for every operating system.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button variant="shield" className="gap-2"><Upload className="w-4 h-4" /> Upload Files</Button>
              <Button variant="outline" className="gap-2" onClick={() => setActiveTab("File Manager")}><Plus className="w-4 h-4" /> Create Folder</Button>
              <Button variant="glow" className="gap-2" onClick={() => setActiveTab("File Manager")}><FolderOpen className="w-4 h-4" /> Open File Manager</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[{ label: "Total Storage", value: "12.4 TB", color: "text-primary" }, { label: "Files", value: "142,503", color: "text-blue-400" }, { label: "Folders", value: "8,214", color: "text-emerald-400" }, { label: "Shared", value: "1,052", color: "text-amber-400" }].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl border border-border/40 bg-card/30">
                  <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><Monitor className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Supported Operating Systems</CardTitle></CardHeader>
              <CardContent><div className="grid grid-cols-2 gap-2">{osSystems.map((os) => (<div key={os} className="p-2 rounded bg-primary/5 border border-primary/20 text-center text-[10px] font-medium">{os}</div>))}</div></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><FolderOpen className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Supported File Systems</CardTitle></CardHeader>
              <CardContent><div className="grid grid-cols-2 gap-2">{fileSystems.map((fs) => (<div key={fs} className="p-2 rounded bg-primary/5 border border-primary/20 text-center text-[10px] font-mono">{fs}</div>))}</div></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-bold flex items-center gap-2"><Link className="w-6 h-6 text-primary" /> Syncs With</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncServices.slice(0, 4).map((service) => {
                    const Icon = service.icon;
                    return (
                      <div key={service.name} className="flex items-center justify-between p-2 rounded-lg bg-background/40 border border-border/20">
                        <div className="flex items-center gap-2 min-w-0"><Icon className={`w-4 h-4 ${service.color} shrink-0`} /><span className="text-[10px] font-medium truncate">{service.name}</span></div>
                        <Badge variant="outline" className="text-[8px] border-emerald-500/30 text-emerald-500 bg-emerald-500/5 h-4 px-1">Connected</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-wrap gap-3 mb-16">
            <Button variant="shield" className="gap-2"><RefreshCw className="w-4 h-4" /> Generate</Button>
            <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" /> Upload Files</Button>
            <Button variant="outline" className="gap-2"><FilePlus className="w-4 h-4" /> New File</Button>
            <Button variant="outline" className="gap-2"><FolderPlus className="w-4 h-4" /> New Folder</Button>
            <Button variant="outline" className="gap-2"><FolderOpen className="w-4 h-4" /> Open File Manager</Button>
            <Button variant="outline" className="gap-2"><Shield className="w-4 h-4" /> Open S.H.I.E.L.D. AI Cloud</Button>
            <Button variant="outline" className="gap-2"><HardDrive className="w-4 h-4" /> Open S.H.I.E.L.D. AI Drive</Button>
            <Button variant="outline" className="gap-2"><Cloud className="w-4 h-4" /> Open Blanch Cloud</Button>
            <Button variant="outline" className="gap-2"><HardDrive className="w-4 h-4" /> Open Blanch Drive</Button>
            <Button variant="outline" className="gap-2"><ArrowDownToLine className="w-4 h-4" /> Import Files & Folders</Button>
            <Button variant="outline" className="gap-2"><ArrowUpFromLine className="w-4 h-4" /> Export Files & Folders</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><RefreshCw className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Automatic Format Conversion</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Automatically convert files between formats with AI-powered optimization.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><Lock className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Encrypted Storage</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Military-grade AES-256 encryption for all stored files.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><Database className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Persistent Storage</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Redundant backup support with persistence across all devices.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><Shield className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Security & Support</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Zero-knowledge privacy with military-grade security protocols.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><Brain className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">S.H.I.E.L.D. AI Agent & Assistant</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">AI-powered agent assistance for file management and organization.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 shadow-none">
              <CardHeader><Globe className="w-8 h-8 text-primary mb-2" /><CardTitle className="text-lg">Universal Access</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Access files from any device, any platform, anywhere.</p></CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-1">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-4 mb-4">Navigation</h3>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button key={item.name} variant={activeTab === item.name ? "secondary" : "ghost"} className={`w-full justify-start gap-3 h-10 text-xs ${activeTab === item.name ? "bg-primary/10 text-primary" : "text-muted-foreground"}`} onClick={() => setActiveTab(item.name)}>
                    <Icon className="w-4 h-4" />{item.name}
                  </Button>
                );
              })}
            </aside>
            <main className="lg:col-span-3 min-h-[400px]">
              {renderTabContent()}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UniversalFileSystem;
