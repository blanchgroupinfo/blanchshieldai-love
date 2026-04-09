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

const allFormatsList = "3dm, 3ds, 3g2, 3gp, 3gpp, 3mf, 4dx, 5dx, 6dx, 7dx, 8dx, 9dx, 10dx, 11dx, 12dx, 7z, aac, aacp, aaf, abc, ac3, acd, ada, adb, ads, adx, ai, aif, aiff, akp, als, alp, amr, animx, animated gif, apk, app, appx, as, asm, asp, aspx, ass, au, au3, audioml, avc, avchd, avi, avif, avs, avsi, avatx, band, bas, bash, bat, bb, bc, bi, bin, binauralx, blend, blender, bmp, broadcastx, bwf, bz2, c, caf, cadx, cbl, cbr, cc, ccx, cda, cdb, cdc, cdd, cdr, cdt, cfg, ckpt, clap, cln, cmake, cmd, cmx, cnc, cob, coffee, component, conf, config, configx, copy, cpp, cpy, cpr, crmdata, cs, csd, csh, css, csv, cwp, cxx, d, dae, dat, datx, dbx, dds, deb, diff, dll, dmg, doc, docx, docx+, dpdoc, dpm, dv, dvcprohd, dpx, dwg, dxf, edi, edifact, edl, em, emf, engx, engine, env, eps, epub, erl, exe, exr, exs, f, f23, f2k, f77, f90, f95, fabx, favicon.ico, fax, fbx, feather, fcpxmld, fcpbundle, fdr, fdx, fdxt, fig, fits, flac, flp, for, forth, fountain, fst, fxb, fxp, fxt, gd, gguf, gif, gig, gitattributes, glb, gltf, go, gradle, gql, gsm, gz, gui, h, h.264, h5, hdf5, hdr, heic, heif, hevc, hex, holo, hologramx, hpp, hrl, hs, hta, htm, html, hudx, humanx, hws, hxx, i, ico, ifc, ihs, imgx, inf, ini, ino, iso, iss, itcl, itt, java, jfi, jfif, jpeg, jpg, jxl, joblib, js, jsm, json, json5, jsonc, jsonl, jsp, jsx, kix, kml, kontakt, kotlin, las, lex, lisp, litcoffee, logic, logicx, logx, loop, lsp, lst, lua, lv2, ltx, m, m4a, mak, mar, markdown, md, mediaplanx, metax, mib, mid, midi, mjs, mk, mkv, ml, mli, mlmodel, mlpackage, mm, mmp, mmpz, mms, modelx, mot, mov, motionx, mp3, mp4, m4v, mpc, mpeg, mts, m2ts, msi, mx, mxf, mxml, netx, neural, nim, nki, nkm, nks, nksf, nksn, nprj, npy, npz, nsh, nsi, nt, obj, odt, ods, ofx, ogg, omf, onnx, opus, orc, osx, p6, pack, pak, pcap, parquet, pas, pat, patch, pb, pcx, pdf, pgm, ph, php, php3, php4, php5, phps, phpt, pkl, pkg, pixelmapx, pl, plx, ply, pm, pm6, png, po, pod6, podcastx, pom, pr, pro, profile, properties, prores, proto, ps, ps1, psb, psd, psd1, psm1, pt, pt2, ptf, pts, pth, ptx, pxi, py, pyd, pyi, pyw, pyx, qif, qcp, quantumzip, r, r2, r3, r3d, raku, rakudoc, rakumod, rakutest, rap, rar, raw, rb, rbw, rc, reb, reg, rex, rex2, rpm, rpp, rs, rsn, rx2, s, safetensors, sas, scm, sco, scrollx, sf2, sfz, sh, shtm, shtml, simx, skp, smd, sml, snd, so, song, soundset, spf, spatiala, splus, sql, sqlite, src, srec, srt, ss, st, step, stl, stp, stpz, sty, sv, svg, svh, swift, sxml, systemx, t, t2t, tab, tar, tcl, tdd, tdm, tek, tex, textx, tga, tfrecord, tflite, thy, tiff, toml, trt, ts, tsql, tsx, txt, uasset, ultrax, umap, unity, unitypackage, url, usd, usda, usdc, usdz, v, vb, vba, vbs, vdx, vh, vhd, vhdl, volumetricx, vpk, vrm, vsd, vsdm, vsdx, vst, vst2, vst3, vstpreset, vtk, vtp, vtt, wad, wav, wavpack, wavx, webm, webp, webmanifest, webx, wer, wma, wmf, wol, wpg, wrl, worldx, x, x3d, x12, xaml, xcf, xdr, xht, xhtml, xls, xlsx, xltx, xml, xpj, xpm, xsd, xsl, xul, xz, yaml, yml, zip";

const formatCategories = [
  { name: "3D Model", icon: "🧊", formats: ["3dm", "3ds", "3mf", "blend", "cadx", "cnc", "cob", "dae", "dwg", "dxf", "fbx", "fig", "glb", "gltf", "holo", "ifc", "mib", "modelx", "obj", "ply", "skp", "stl", "step", "stp", "stpz", "uasset", "umap", "usd", "usda", "usdz", "vrm", "vtk", "vtp", "wrl", "x3d"] },
  { name: "4D Model", icon: "🌌", formats: ["4dx", "animx", "modelx", "motionx", "volumetricx"] },
  { name: "5D Model", icon: "🌌", formats: ["5dx", "engx", "fabx", "simx"] },
  { name: "6D Model", icon: "🌌", formats: ["6dx", "modelx", "neural", "systemx"] },
  { name: "7D Model", icon: "🌌", formats: ["7dx", "engx", "netx"] },
  { name: "8D Model", icon: "🌌", formats: ["8dx", "simx", "systemx", "volumetricx"] },
  { name: "9D Model", icon: "🌌", formats: ["9dx", "engx", "simx", "worldx"] },
  { name: "10D Model", icon: "🌌", formats: ["10dx", "cnc", "engx", "metax", "systemx"] },
  { name: "11D Model", icon: "🌌", formats: ["11dx", "hdr", "proto", "volumetricx"] },
  { name: "12D Model", icon: "🌌", formats: ["12dx", "engx", "systemx", "volumetricx"] },
  { name: "AI", icon: "🤖", formats: ["avatx", "ckpt", "gguf", "h5", "humanx", "holo", "joblib", "json", "json5", "jsonc", "onnx", "safetensors", "yaml", "yml"] },
  { name: "AI Avatar", icon: "🤖", formats: ["avatx", "avsi", "blend", "blender", "broadcastx", "ckpt", "crmdata", "fbx", "gguf", "glb", "gltf", "h5", "holo", "hologramx", "humanx", "imgx", "kontakt", "logx", "mediaplanx", "metax", "modelx", "mot", "motionx", "mp4", "pixelmapx", "png", "properties", "safetensors", "skp", "soundset", "volumetricx", "vpk", "vrm", "worldx"] },
  { name: "AI Models", icon: "🧠", formats: ["audioml", "bin", "ckpt", "engine", "gguf", "h5", "hdf5", "holo", "humanx", "joblib", "jsonl", "mar", "mlmodel", "mlpackage", "neural", "npy", "npz", "onnx", "parquet", "pb", "pkl", "proto", "pt", "pth", "safetensors", "tfrecord", "tflite", "trt"] },
  { name: "Animation", icon: "🌀", formats: ["abc", "animx", "bvh", "blend", "blender", "dae", "fbx", "gif", "gltf", "holo", "hologramx", "humanx", "modelx", "motionx", "mp4", "obj", "ply", "skp", "smd", "svg", "usd", "usda", "usdc", "usdz", "volumetricx", "vrm", "webp"] },
  { name: "Archive", icon: "📦", formats: ["7z", "bz2", "cbr", "dbx", "gz", "iso", "jsonl", "quantumzip", "rar", "sql", "tar", "ultrax", "xml", "xz", "zip"] },
  { name: "Audio & DAW", icon: "🔊", formats: ["aac", "aacp", "aaf", "ac3", "acd", "adx", "aif", "aiff", "akp", "alp", "als", "amr", "au", "audioml", "band", "bwf", "binauralx", "bwproject", "caf", "clap", "cda", "cwp", "exs", "flac", "flp", "fst", "fxb", "fxt", "gig", "kontakt", "logic", "logicx", "loop", "lv2", "m4a", "mid", "midi", "mp3", "mmp", "mmpz", "mpc", "nki", "nkm", "nks", "nksf", "nksn", "ogg", "omf", "opus", "pt", "pt2", "pr", "ptf", "pts", "ptx", "rex", "rex2", "rpp", "rsn", "rx2", "sf2", "sfz", "snd", "song", "soundset", "spatiala", "spf", "tracktionedit", "vst", "vst2", "vst3", "vstpreset", "wav", "wavpack", "wavx", "wma", "xpm", "xpj"] },
  { name: "Banking", icon: "🏦", formats: ["csv", "doc", "docx", "ofx", "pdf", "qif", "xls", "xlsx"] },
  { name: "Books", icon: "📚", formats: ["doc", "docx", "docx+", "epub", "litcoffee", "markdown", "md", "mobi", "pdf", "pod6", "scrollx", "txt"] },
  { name: "Broadcast", icon: "📺", formats: ["3gp", "aaf", "animx", "ass", "avi", "avif", "avs", "broadcastx", "bwf", "dpx", "edl", "fbx", "fcpxmld", "fcpbundle", "fdr", "fdx", "fig", "fits", "flv", "fountain", "glb", "gltf", "hdr", "holo", "hologramx", "itt", "lrc", "mkv", "mms", "mxf", "mov", "motionx", "mts", "m2ts", "mp4", "m4v", "mpeg", "mxf", "ogg", "omf", "pr", "prores", "r3d", "rex", "rex2", "rx2", "srt", "txt", "volumetricx", "vtt", "webm", "wma", "wmf", "worldx"] },
  { name: "CAD", icon: "🏗", formats: ["3dm", "3ds", "3mf", "abc", "blend", "cadx", "dae", "dwg", "dxf", "engx", "fabx", "fbx", "fig", "glb", "gltf", "ifc", "las", "obj", "step", "stl", "stp", "stpz", "vtk", "vtp"] },
  { name: "Computing", icon: "💻", formats: ["ada", "adb", "ads", "apk", "app", "as", "asm", "bash", "bat", "bin", "c", "cbl", "cc", "ccx", "cfg", "cln", "cmake", "cmd", "coffee", "component", "conf", "config", "configx", "cpp", "cpy", "cs", "csd", "csh", "css", "csv", "cxx", "d", "datx", "dbx", "deb", "diff", "dll", "dmg", "env", "exe", "go", "gradle", "gql", "gz", "h", "hpp", "hs", "hta", "htm", "html", "ini", "inf", "ino", "iso", "iss", "java", "js", "jsm", "json", "json5", "jsonc", "jsonl", "jsp", "jsx", "kotlin", "lex", "lisp", "litcoffee", "logx", "lua", "lv2", "ltx", "m", "mak", "mar", "md", "mjs", "ml", "mli", "msi", "mx", "mxml", "nim", "nsh", "nsi", "nt", "osx", "pas", "patch", "php", "php3", "php4", "php5", "phps", "phpt", "pl", "plx", "pm", "pm6", "pom", "proto", "ps", "ps1", "psm1", "py", "pyd", "pyi", "pyw", "pyx", "rb", "rc", "reb", "reg", "rpm", "rs", "s", "sas", "scm", "sco", "sh", "shtm", "shtml", "sml", "so", "spf", "sql", "sqlite", "src", "srec", "ss", "st", "sty", "sv", "svh", "swift", "sxml", "systemx", "t", "t2t", "tab", "tar", "tcl", "tdm", "tex", "textx", "thy", "toml", "trt", "ts", "tsql", "tsx", "url", "v", "vb", "vba", "vbs", "vdx", "vh", "vhd", "vhdl", "vsd", "vsdm", "vsdx", "webmanifest", "webx", "wer", "wol", "x", "xaml", "xht", "xhtml", "xml", "xsd", "xsl", "xul", "yaml", "yml", "xz"] },
  { name: "CRM & ERP", icon: "🧾", formats: ["crmdata", "csv", "datx", "erpdata", "feather", "fits", "gql", "gz", "h5", "hdf5", "joblib", "json", "json5", "jsonc", "jsonl", "mediaplanx", "metax", "ods", "parquet", "pb", "pkl", "proto", "sql", "sqlite", "tfrecord", "xls", "xlsx", "yaml", "yml"] },
  { name: "Data", icon: "🧠", formats: ["7z", "bz2", "cbr", "crmdata", "csv", "datx", "dbx", "erpdata", "feather", "fits", "gql", "gz", "h5", "hdf5", "iso", "joblib", "json", "json5", "jsonc", "jsonl", "mediaplanx", "metax", "ods", "parquet", "pb", "pkl", "proto", "quantumzip", "sql", "sqlite", "tar", "tfrecord", "ultrax", "xls", "xlsx", "xml", "yaml", "yml", "xz", "zip"] },
  { name: "Database", icon: "🗄", formats: ["accdb", "dbx", "mdb", "npy", "npz", "ods", "parquet", "sql", "sqlite", "xls", "xlsx"] },
  { name: "Design", icon: "🎨", formats: ["ai", "avif", "bmp", "cdr", "cdt", "cmx", "dds", "dpx", "emf", "exr", "fax", "feather", "fig", "gif", "hdr", "heic", "heif", "ico", "jfi", "jfif", "jpeg", "jpg", "jxl", "pcx", "pdf", "pgm", "png", "psd", "raw", "tga", "tiff", "webp", "wmf", "wpg", "xcf", "xpm"] },
  { name: "Distribution", icon: "📤", formats: ["adx", "apk", "app", "appx", "dmg", "exe", "iso", "msi", "pkg", "pod6", "rpm", "tar", "unitypackage", "zip", "7z", "bz2", "rar", "quantumzip", "webx"] },
  { name: "Document", icon: "📄", formats: ["csv", "doc", "docx", "docx+", "epub", "fdr", "fdx", "fdxt", "fountain", "litcoffee", "markdown", "md", "pdf", "pod6", "ppt", "pptx", "rtf", "tex", "textx", "txt", "xls", "xlsx"] },
  { name: "Engineering", icon: "🏗", formats: ["3dm", "3ds", "3mf", "abc", "blend", "cadx", "cnc", "dae", "dwg", "dxf", "engx", "fbx", "fig", "fits", "glb", "gltf", "holo", "hologramx", "ifc", "las", "modelx", "obj", "simx", "step", "stl", "stp", "stpz", "systemx", "volumetricx"] },
  { name: "Finance", icon: "💰", formats: ["abc", "ac3", "csv", "datx", "doc", "docx", "engx", "fits", "mx", "ofx", "pdf", "qif", "sql", "sqlite", "ods", "parquet", "pb", "pkl", "ppt", "pptx", "proto", "quantumzip", "rtf", "txt", "xls", "xlsx"] },
  { name: "Film & Video", icon: "🎬", formats: ["3gp", "aaf", "animx", "ass", "avi", "avc", "avif", "avs", "broadcastx", "dpx", "edl", "fbx", "fcpxmld", "fcpbundle", "fdr", "fdx", "fig", "fits", "flv", "fountain", "glb", "gltf", "hdr", "holo", "hologramx", "itt", "lrc", "mkv", "mms", "mxf", "mov", "motionx", "mts", "m2ts", "mp4", "m4v", "mpeg", "mxf", "ogg", "omf", "pr", "prores", "r3d", "rex", "rex2", "rx2", "srt", "txt", "volumetricx", "vtt", "webm", "wma", "wmf", "worldx"] },
  { name: "Gaming", icon: "🎮", formats: ["3dm", "3ds", "3mf", "abc", "animx", "avatx", "blend", "blender", "bwproject", "cnc", "dae", "fbx", "glb", "gltf", "modelx", "motionx", "obj", "pak", "pack", "ply", "skp", "smd", "step", "stl", "uasset", "umap", "unity", "unitypackage", "usdz", "vpk", "vrm", "wasm", "worldx"] },
  { name: "Graphics Design", icon: "🎨", formats: ["ai", "avif", "bmp", "cdr", "cdt", "cmx", "dds", "dpx", "emf", "exr", "fax", "feather", "fig", "gif", "hdr", "heic", "heif", "ico", "jfi", "jfif", "jpeg", "jpg", "jxl", "pcx", "pdf", "pgm", "png", "psd", "raw", "tga", "tiff", "webp", "wmf", "wpg", "xcf", "xpm"] },
  { name: "Hologram", icon: "🔮", formats: ["3dm", "4dx", "5dx", "6dx", "7dx", "8dx", "9dx", "10dx", "11dx", "12dx", "fbx", "glb", "gltf", "holo", "hologramx", "lightfieldx", "hudx", "ledx", "volumetricx", "vrm", "worldx", "usd", "usda", "usdc", "usdz", "wrl", "x3d"] },
  { name: "HUD Elements", icon: "🖥", formats: ["4dx", "5dx", "6dx", "7dx", "8dx", "9dx", "10dx", "11dx", "12dx", "animated gif", "bmp", "fig", "gif", "hudx", "ico", "imgx", "ledx", "pixelmapx", "png", "svg", "svh", "uiuxx", "webp", "xcf", "xpm"] },
  { name: "Image", icon: "🖼", formats: ["ai", "avif", "bmp", "cdr", "cdt", "cmx", "dds", "dpx", "emf", "eps", "exr", "fax", "feather", "fig", "gif", "hdr", "heic", "heif", "icns", "ico", "jfi", "jfif", "jpeg", "jpg", "jxl", "otf", "pcx", "pdf", "pgm", "png", "psd", "raw", "svg", "tga", "tif", "tiff", "ttf", "webp", "wmf", "wpg", "xcf", "xpm"] },
  { name: "Industrial", icon: "🏭", formats: ["3dm", "3ds", "3mf", "abc", "blend", "cadx", "cnc", "dae", "dwg", "dxf", "engx", "fabx", "fbx", "glb", "gltf", "holo", "hologramx", "ifc", "las", "modelx", "obj", "simx", "step", "stl", "stp", "stpz", "systemx", "volumetricx"] },
  { name: "Information Technology", icon: "🖥", formats: ["apk", "ada", "app", "adb", "ads", "bash", "bat", "bin", "c", "cfg", "cln", "cmake", "cmd", "component", "conf", "config", "configx", "cpp", "cs", "css", "csv", "datx", "dbx", "dll", "dmg", "env", "exe", "gradle", "go", "gql", "gz", "h", "hpp", "hs", "html", "ini", "inf", "iso", "iss", "java", "js", "json", "json5", "jsonc", "jsonl", "jsp", "jsx", "kotlin", "logx", "lua", "lv2", "m", "mak", "mar", "md", "mjs", "ml", "mli", "msi", "mx", "mxml", "nim", "nsh", "nsi", "nt", "osx", "pas", "patch", "php", "php3", "php4", "php5", "phps", "phpt", "pl", "plx", "pm", "pm6", "pom", "proto", "ps", "ps1", "psm1", "py", "pyd", "pyi", "pyw", "pyx", "rb", "rc", "reb", "reg", "rpm", "rs", "s", "sas", "scm", "sco", "sh", "shtm", "shtml", "sml", "so", "spf", "sql", "sqlite", "src", "srec", "ss", "st", "sty", "sv", "svh", "swift", "sxml", "systemx", "sysx", "t", "t2t", "tab", "tar", "tcl", "tdm", "tex", "textx", "thy", "toml", "trt", "ts", "tsql", "tsx", "url", "v", "vb", "vba", "vbs", "vdx", "vh", "vhd", "vhdl", "vsd", "vsdm", "vsdx", "webmanifest", "webx", "wer", "wol", "x", "xaml", "xht", "xhtml", "xml", "xsd", "xsl", "xul", "yaml", "yml", "xz"] },
  { name: "Interface", icon: "🖥", formats: ["animated gif", "bmp", "css", "fig", "gif", "hudx", "ico", "imgx", "js", "jsx", "pixelmapx", "png", "svg", "svh", "uiuxx", "webp", "xcf", "xpm", "html", "xml"] },
  { name: "Final Draft Script", icon: "🎭", formats: ["fdr", "fdx", "fdxt", "fountain", "pod6", "textx"] },
  { name: "LED", icon: "💡", formats: ["bmp", "fig", "gif", "hudx", "ico", "imgx", "ledx", "pixelmapx", "png", "svg", "svh", "tga", "tiff", "uiuxx", "webp", "xcf", "xpm"] },
  { name: "Legal", icon: "⚖️", formats: ["doc", "docx", "docx+", "dpdoc", "epub", "fountain", "litcoffee", "markdown", "md", "odt", "ods", "pdf", "pod6", "rakudoc", "rtf", "textx", "txt", "xls", "xlsx", "xltx"] },
  { name: "Management", icon: "🧠", formats: ["crmdata", "csv", "doc", "docx", "docx+", "erpdata", "markdown", "md", "mediaplanx", "metax", "profile", "properties", "sql", "sqlite", "xls", "xlsx", "ods"] },
  { name: "Marketing & PR", icon: "📢", formats: ["ai", "adx", "animated gif", "avatx", "broadcastx", "campaignx", "eps", "feather", "fig", "gif", "ico", "imgx", "jpeg", "jpg", "mediaplanx", "metax", "pdf", "png", "profile", "properties", "svg", "svh", "tiff", "webp", "worldx"] },
  { name: "Manufacturing", icon: "🏭", formats: ["3dm", "3ds", "3mf", "abc", "blend", "cadx", "cnc", "dae", "dwg", "dxf", "engx", "fabx", "glb", "gltf", "holo", "hologramx", "ifc", "las", "modelx", "obj", "simx", "step", "stl", "stp", "stpz", "systemx", "volumetricx"] },
  { name: "Metaverse", icon: "🌐", formats: ["avatx", "blend", "blender", "ckpt", "fbx", "gguf", "glb", "gltf", "h5", "holo", "hologramx", "humanx", "joblib", "metax", "modelx", "motionx", "obj", "ply", "safetensors", "simx", "skp", "smd", "stl", "usd", "usda", "usdc", "usdz", "volumetricx", "vrm", "wasm", "worldx"] },
  { name: "Music & Audio (DAW)", icon: "🎵", formats: ["aac", "aacp", "aaf", "ac3", "acd", "adx", "aif", "aiff", "akp", "alp", "als", "amr", "au", "audioml", "band", "bwf", "binauralx", "bwproject", "caf", "clap", "cda", "cwp", "exs", "flac", "flp", "fst", "fxb", "fxt", "gig", "kontakt", "logic", "logicx", "loop", "lv2", "m4a", "mid", "midi", "mp3", "mmp", "mmpz", "mpc", "nki", "nkm", "nks", "nksf", "nksn", "ogg", "omf", "opus", "pt", "pt2", "pr", "ptf", "pts", "ptx", "rex", "rex2", "rpp", "rsn", "rx2", "sf2", "sfz", "snd", "song", "soundset", "spatiala", "spf", "tracktionedit", "vst", "vst2", "vst3", "vstpreset", "wav", "wavpack", "wavx", "wma", "xpm", "xpj"] },
  { name: "Network & Telecommunications", icon: "🌐", formats: ["3gp", "3g2", "3gpp", "amr", "apk", "app", "avro", "bin", "c", "cfg", "conf", "configx", "cpp", "csv", "datx", "exe", "edi", "edifact", "g729", "go", "gsm", "gql", "gz", "html", "ini", "inf", "iso", "java", "js", "json", "json5", "jsonc", "jsonl", "logx", "lua", "mmf", "netx", "opus", "p6", "parquet", "pat", "pcap", "php", "proto", "py", "qcp", "rap", "rb", "reg", "sh", "sql", "systemx", "tap", "toml", "trt", "ts", "url", "vox", "x12", "xdr", "xml", "xsd", "wav", "yaml", "yml"] },
  { name: "Operating Systems", icon: "💻", formats: ["apk", "app", "appx", "bin", "c", "cpp", "cs", "css", "component", "configs", "deb", "dll", "dmg", "exe", "html", "kernel", "kernelx", "go", "iso", "java", "js", "json", "lua", "msi", "osx", "pkg", "php", "py", "rb", "rpm", "sh", "so", "systemx", "ts", "unitypackage", "vhd", "vhdl", "vdx", "webmanifest", "wer", "xul"] },
  { name: "Plugins", icon: "🔌", formats: ["clap", "dll", "component", "dpm", "fxb", "fxp", "kontakt", "lv2", "pluginx", "pt", "pt2", "so", "vst", "vst2", "vst3", "vstpreset"] },
  { name: "Podcast", icon: "🎙", formats: ["aac", "aacp", "ac3", "amr", "audioml", "mp3", "m4a", "ogg", "opus", "podcastx", "rss", "txt", "mp4", "xml", "wav", "wavpack", "wavx"] },
  { name: "Publishing", icon: "📚", formats: ["7z", "ai", "aab", "aiff", "apk", "app", "csv", "doc", "docx", "dcp", "dds", "dmg", "eps", "epub", "exe", "feather", "fbx", "fig", "jpg", "gif", "glb", "gltf", "html", "ico", "indd", "ipa", "js", "jpeg", "jpg", "kpf", "lsx", "markdown", "md", "midi", "mp3", "msi", "obj", "ogg", "pak", "pkg", "pdf", "png", "ppt", "pptx", "prores", "psb", "psd", "rar", "svg", "svh", "tiff", "rtf", "tga", "txt", "uwp", "unitypackage", "wad", "wav", "webp", "xcf", "xlsx", "xpm", "zip"] },
  { name: "Sacred Text", icon: "🕊", formats: ["doc", "docx", "epub", "pdf", "pod6", "scrollx", "txt", "xml", "yaml", "yml"] },
  { name: "Software", icon: "💻", formats: ["apk", "app", "appx", "bin", "c", "cpp", "cs", "css", "component", "configs", "deb", "dll", "dmg", "exe", "html", "kernel", "kernelx", "go", "iso", "java", "js", "json", "lua", "msi", "osx", "pkg", "php", "py", "rb", "rpm", "sh", "so", "systemx", "ts", "unitypackage", "vhd", "vhdl", "vdx", "webmanifest", "wer", "xul"] },
  { name: "Sovereign OS", icon: "🛡️", formats: ["bin", "configs", "deb", "dmg", "exe", "iso", "kernelx", "osx", "pkg", "rpm", "systemx", "vhd", "vhdl", "xul"] },
  { name: "Servers", icon: "🖥", formats: ["cfg", "conf", "config", "configx", "datx", "deb", "dbx", "dll", "dmg", "env", "exe", "gql", "gz", "ini", "inf", "iso", "json", "json5", "jsonc", "jsonl", "logx", "netx", "php", "php3", "php4", "php5", "phps", "phpt", "proto", "rc", "reb", "reg", "rpm", "serverx", "sql", "sqlite", "systemx", "tar", "trt", "url", "xml", "yaml", "yml"] },
  { name: "Spreadsheet", icon: "📊", formats: ["csv", "ods", "pdf", "tab", "xls", "xlsx", "xltx"] },
  { name: "SVG", icon: "🌀", formats: ["animated gif", "gif", "svg", "svh", "webp", "xml", "xsl"] },
  { name: "Technology", icon: "⚙️", formats: ["apk", "ada", "adb", "ads", "asm", "app", "asp", "aspx", "bash", "bat", "bin", "c", "cbl", "cfg", "cln", "cmake", "cmd", "cob", "component", "coffee", "conf", "config", "configx", "copy", "cpp", "cs", "csd", "csh", "css", "csv", "cue", "d", "datx", "db", "dbx", "diff", "dll", "dmg", "erl", "env", "exe", "f", "for", "forth", "gd", "gitattributes", "gql", "go", "gz", "h", "hpp", "hs", "html", "ini", "inf", "iso", "iss", "java", "js", "jsm", "json", "json5", "jsonc", "jsonl", "jsp", "jsx", "kotlin", "logx", "lex", "lisp", "lua", "lv2", "m", "mak", "mar", "md", "mli", "mjs", "ml", "msi", "mx", "mm", "mxml", "nim", "nsh", "nsi", "nt", "osx", "pas", "patch", "php", "php3", "php4", "php5", "phpt", "pl", "plx", "pm", "pm6", "pom", "profile", "properties", "proto", "ps", "ps1", "psm1", "py", "pyd", "pyi", "pyw", "pyx", "r", "rb", "rc", "reb", "reg", "rpm", "rs", "s", "sas", "scm", "sco", "sh", "shtm", "shtml", "skp", "smd", "sml", "snd", "so", "song", "spf", "splus", "sql", "sqlite", "src", "srec", "srt", "ss", "st", "step", "stl", "stp", "stpz", "sty", "sv", "svg", "svh", "swift", "sxml", "t", "t2t", "tab", "tar", "tcl", "tdm", "tek", "tex", "tga", "thy", "tiff", "toml", "ts", "tsql", "tsx", "txt", "url", "usd", "usdz", "v", "vb", "vba", "vbs", "vdx", "vh", "vhd", "vhdl", "vsd", "vsdm", "vsdx", "vtk", "vtp", "vtt", "wasm", "wav", "webp", "webmanifest", "wer", "wmf", "wol", "wpg", "wrl", "x", "x3d", "xaml", "xcf", "xht", "xhtml", "xls", "xlsx", "xltx", "xml", "xpj", "xpm", "xsd", "xsl", "xul", "yaml", "yml", "xz", "zip"] },
  { name: "Television", icon: "📺", formats: ["3gp", "aaf", "animx", "ass", "avi", "avif", "avs", "broadcastx", "bwf", "dpx", "edl", "fbx", "fcpxmld", "fcpbundle", "fdr", "fdx", "fig", "fits", "flv", "fountain", "glb", "gltf", "hdr", "holo", "hologramx", "itt", "lrc", "mkv", "mms", "mxf", "mov", "motionx", "mts", "m2ts", "mp4", "m4v", "mpeg", "mxf", "ogg", "omf", "pr", "prores", "r3d", "rex", "rex2", "rx2", "srt", "txt", "volumetricx", "vtt", "webm", "wma", "wmf", "worldx"] },
  { name: "Trading", icon: "📈", formats: ["abc", "csv", "datx", "json", "jsonl", "ods", "parquet", "pb", "pkl", "proto", "qif", "sql", "sqlite", "txt", "xls", "xlsx"] },
  { name: "Vector", icon: "🧭", formats: ["ai", "cdr", "cdt", "cmx", "emf", "eps", "feather", "fig", "svg", "svh", "wmf", "xcf", "xpm"] },
  { name: "Video & Film", icon: "🎥", formats: ["3gp", "aaf", "animx", "ass", "avi", "avc", "avif", "avs", "dpx", "edl", "fbx", "fcpxmld", "fcpbundle", "fdr", "fdx", "fig", "fits", "flv", "fountain", "glb", "gltf", "hdr", "holo", "hologramx", "itt", "lrc", "mkv", "mms", "mxf", "mov", "motionx", "mts", "m2ts", "mp4", "m4v", "mpeg", "mxf", "ogg", "omf", "pr", "prores", "r3d", "rex", "rex2", "rx2", "srt", "txt", "volumetricx", "vtt", "webm", "wma", "wmf", "worldx"] },
  { name: "Web/App", icon: "🌐", formats: ["animated gif", "apk", "app", "appx", "asp", "aspx", "cpp", "css", "csv", "gif", "htm", "html", "ico", "imgx", "java", "jpeg", "jpg", "js", "jsm", "json", "json5", "jsonc", "jsonl", "jsp", "jsx", "php", "php3", "php4", "php5", "phps", "phpt", "png", "svg", "svh", "ts", "tsx", "wasm", "webm", "webp", "webmanifest", "xht", "xhtm", "xhtml", "xml"] },
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
              <p className="text-sm text-muted-foreground mb-6">Industry-standard format support across all media types</p>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex flex-wrap justify-center gap-1 bg-transparent h-auto p-0 mb-6">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">All</TabsTrigger>
                  <TabsTrigger value="3dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">3D Model</TabsTrigger>
                  <TabsTrigger value="4dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">4D Model</TabsTrigger>
                  <TabsTrigger value="5dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">5D Model</TabsTrigger>
                  <TabsTrigger value="6dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">6D Model</TabsTrigger>
                  <TabsTrigger value="7dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">7D Model</TabsTrigger>
                  <TabsTrigger value="8dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">8D Model</TabsTrigger>
                  <TabsTrigger value="9dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">9D Model</TabsTrigger>
                  <TabsTrigger value="10dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">10D Model</TabsTrigger>
                  <TabsTrigger value="11dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">11D Model</TabsTrigger>
                  <TabsTrigger value="12dmodel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">12D Model</TabsTrigger>
                  <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">AI</TabsTrigger>
                  <TabsTrigger value="aiavatar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">AI Avatar</TabsTrigger>
                  <TabsTrigger value="aimodels" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">AI Models</TabsTrigger>
                  <TabsTrigger value="animation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Animation</TabsTrigger>
                  <TabsTrigger value="archive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Archive</TabsTrigger>
                  <TabsTrigger value="audio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Audio & DAW</TabsTrigger>
                  <TabsTrigger value="banking" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Banking</TabsTrigger>
                  <TabsTrigger value="books" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Books</TabsTrigger>
                  <TabsTrigger value="broadcast" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Broadcast</TabsTrigger>
                  <TabsTrigger value="cad" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">CAD</TabsTrigger>
                  <TabsTrigger value="computing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Computing</TabsTrigger>
                  <TabsTrigger value="crm" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">CRM & ERP</TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Data</TabsTrigger>
                  <TabsTrigger value="database" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Database</TabsTrigger>
                  <TabsTrigger value="design" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Design</TabsTrigger>
                  <TabsTrigger value="distribution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Distribution</TabsTrigger>
                  <TabsTrigger value="document" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Document</TabsTrigger>
                  <TabsTrigger value="engineering" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Engineering</TabsTrigger>
                  <TabsTrigger value="finance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Finance</TabsTrigger>
                  <TabsTrigger value="film" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Film & Video</TabsTrigger>
                  <TabsTrigger value="gaming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Gaming</TabsTrigger>
                  <TabsTrigger value="graphics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Graphics Design</TabsTrigger>
                  <TabsTrigger value="hologram" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Hologram</TabsTrigger>
                  <TabsTrigger value="hud" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">HUD Elements</TabsTrigger>
                  <TabsTrigger value="image" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Image</TabsTrigger>
                  <TabsTrigger value="industrial" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Industrial</TabsTrigger>
                  <TabsTrigger value="it" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Information Technology</TabsTrigger>
                  <TabsTrigger value="interface" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Interface</TabsTrigger>
                  <TabsTrigger value="script" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Final Draft Script</TabsTrigger>
                  <TabsTrigger value="led" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">LED</TabsTrigger>
                  <TabsTrigger value="legal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Legal</TabsTrigger>
                  <TabsTrigger value="management" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Management</TabsTrigger>
                  <TabsTrigger value="marketing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Marketing & PR</TabsTrigger>
                  <TabsTrigger value="manufacturing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Manufacturing</TabsTrigger>
                  <TabsTrigger value="metaverse" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Metaverse</TabsTrigger>
                  <TabsTrigger value="music" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Music & Audio (DAW)</TabsTrigger>
                  <TabsTrigger value="network" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Network & Telecommunications</TabsTrigger>
                  <TabsTrigger value="os" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Operating Systems</TabsTrigger>
                  <TabsTrigger value="plugins" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Plugins</TabsTrigger>
                  <TabsTrigger value="podcast" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Podcast</TabsTrigger>
                  <TabsTrigger value="publishing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Publishing</TabsTrigger>
                  <TabsTrigger value="sacred" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Sacred Text</TabsTrigger>
                  <TabsTrigger value="software" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Software</TabsTrigger>
                  <TabsTrigger value="sovereign" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Sovereign OS</TabsTrigger>
                  <TabsTrigger value="servers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Servers</TabsTrigger>
                  <TabsTrigger value="spreadsheet" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Spreadsheet</TabsTrigger>
                  <TabsTrigger value="svg" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">SVG</TabsTrigger>
                  <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Technology</TabsTrigger>
                  <TabsTrigger value="television" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Television</TabsTrigger>
                  <TabsTrigger value="trading" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Trading</TabsTrigger>
                  <TabsTrigger value="vector" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Vector</TabsTrigger>
                  <TabsTrigger value="video" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Video & Film</TabsTrigger>
                  <TabsTrigger value="web" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">Web/App</TabsTrigger>
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
                {[
                  { value: "3dmodel", name: "3D Model" },
                  { value: "4dmodel", name: "4D Model" },
                  { value: "5dmodel", name: "5D Model" },
                  { value: "6dmodel", name: "6D Model" },
                  { value: "7dmodel", name: "7D Model" },
                  { value: "8dmodel", name: "8D Model" },
                  { value: "9dmodel", name: "9D Model" },
                  { value: "10dmodel", name: "10D Model" },
                  { value: "11dmodel", name: "11D Model" },
                  { value: "12dmodel", name: "12D Model" },
                  { value: "ai", name: "AI" },
                  { value: "aiavatar", name: "AI Avatar" },
                  { value: "aimodels", name: "AI Models" },
                  { value: "animation", name: "Animation" },
                  { value: "archive", name: "Archive" },
                  { value: "audio", name: "Audio & DAW" },
                  { value: "banking", name: "Banking" },
                  { value: "books", name: "Books" },
                  { value: "broadcast", name: "Broadcast" },
                  { value: "cad", name: "CAD" },
                  { value: "computing", name: "Computing" },
                  { value: "crm", name: "CRM & ERP" },
                  { value: "data", name: "Data" },
                  { value: "database", name: "Database" },
                  { value: "design", name: "Design" },
                  { value: "distribution", name: "Distribution" },
                  { value: "document", name: "Document" },
                  { value: "engineering", name: "Engineering" },
                  { value: "finance", name: "Finance" },
                  { value: "film", name: "Film & Video" },
                  { value: "gaming", name: "Gaming" },
                  { value: "graphics", name: "Graphics Design" },
                  { value: "hologram", name: "Hologram" },
                  { value: "hud", name: "HUD Elements" },
                  { value: "image", name: "Image" },
                  { value: "industrial", name: "Industrial" },
                  { value: "it", name: "Information Technology" },
                  { value: "interface", name: "Interface" },
                  { value: "script", name: "Final Draft Script" },
                  { value: "led", name: "LED" },
                  { value: "legal", name: "Legal" },
                  { value: "management", name: "Management" },
                  { value: "marketing", name: "Marketing & PR" },
                  { value: "manufacturing", name: "Manufacturing" },
                  { value: "metaverse", name: "Metaverse" },
                  { value: "music", name: "Music & Audio (DAW)" },
                  { value: "network", name: "Network & Telecommunications" },
                  { value: "os", name: "Operating Systems" },
                  { value: "plugins", name: "Plugins" },
                  { value: "podcast", name: "Podcast" },
                  { value: "publishing", name: "Publishing" },
                  { value: "sacred", name: "Sacred Text" },
                  { value: "software", name: "Software" },
                  { value: "sovereign", name: "Sovereign OS" },
                  { value: "servers", name: "Servers" },
                  { value: "spreadsheet", name: "Spreadsheet" },
                  { value: "svg", name: "SVG" },
                  { value: "technology", name: "Technology" },
                  { value: "television", name: "Television" },
                  { value: "trading", name: "Trading" },
                  { value: "vector", name: "Vector" },
                  { value: "video", name: "Video & Film" },
                  { value: "web", name: "Web/App" },
                ].map((tab) => {
                  const cat = formatCategories.find(c => c.name === tab.name);
                  if (!cat) return null;
                  return (
                    <TabsContent key={tab.value} value={tab.value}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all shadow-none">
                          <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="text-2xl">{cat.icon}</div>
                            <CardTitle className="text-base">{cat.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1">
                              {cat.formats.map((fmt) => (
                                <Badge key={fmt} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary/80 font-mono">{fmt}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  );
                })}
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
