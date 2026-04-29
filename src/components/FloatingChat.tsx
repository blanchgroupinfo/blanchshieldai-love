import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Loader2, X, Mic, MicOff, Paperclip, MessageCircle, History, Plus, Trash2, ChevronLeft, Image, Music, Clapperboard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Camera, Video, Volume2, VolumeX, PlaySquare } from "lucide-react";
import { AIChatTabs } from "./chat/AIChatTabs";
import { AdvancedFileUpload } from "./chat/AdvancedFileUpload";
import { MessageActionsToolbar } from "./chat/MessageActionsToolbar";
import { getCreatorDateForGregorian } from '@/data/creatorsCalendar';
import { AIIntelligenceModes } from "./chat/AIIntelligenceModes";
import { AIAvatarSystem } from "./chat/AIAvatarSystem";
import ShieldAIInfoPopup from "./ShieldAIInfoPopup";
import CommandCenter from "./CommandCenter";
import shieldLogo from "@/assets/shiledailogo-no-font.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shield-chat`;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = import.meta.env.VITE_OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentTab, setCurrentTab] = useState<"chat" | "spiritual" | "recommendations" | "agents" | "analytics" | "help" | "support">("chat");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showCommandCenter, setShowCommandCenter] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUserId(session.user.id);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) fetchConversations();
  }, [userId]);

  const fetchConversations = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("chat_conversations")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    if (!error && data) setConversations(data);
  };

  const loadConversation = async (convId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    if (!error && data) {
      setMessages(data.map(m => ({ role: m.role as "user" | "assistant", content: m.content })));
      setCurrentConversationId(convId);
      setShowHistory(false);
    }
  };

  const createConversation = async (title: string): Promise<string | null> => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({ user_id: userId, title })
      .select()
      .single();
    if (!error && data) {
      await fetchConversations();
      return data.id;
    }
    return null;
  };

  const saveMessage = async (convId: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({ conversation_id: convId, role, content });
  };

  const deleteConversation = async (convId: string) => {
    await supabase.from("chat_messages").delete().eq("conversation_id", convId);
    await supabase.from("chat_conversations").delete().eq("id", convId);
    if (currentConversationId === convId) {
      setCurrentConversationId(null);
      setMessages([]);
    }
    await fetchConversations();
    toast.success("Conversation deleted");
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    let assistantContent = "";

    // Save to DB if logged in
    let convId = currentConversationId;
    if (userId && !convId) {
      convId = await createConversation(userMessage.content.slice(0, 50));
      setCurrentConversationId(convId);
    }
    if (userId && convId) await saveMessage(convId, "user", userMessage.content);

    try {
      let response;
      let requestUrl;
      let requestHeaders: Record<string, string>;

      if (OPENROUTER_API_KEY) {
        requestUrl = `${OPENROUTER_BASE_URL}/chat/completions`;
        requestHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.href, // Optional: For OpenRouter analytics
          "X-Title": "S.H.I.E.L.D. AI Chat", // Optional: For OpenRouter analytics
        };
        response = await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            model: "openai/gpt-4o", // Default model for OpenRouter
            messages: [...messages, userMessage],
          }),
        });
      } else {
        requestUrl = CHAT_URL;
        requestHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        };
        response = await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }
      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage?.role === "assistant") lastMessage.content = assistantContent;
                return newMessages;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      // Save assistant response
      if (userId && convId && assistantContent) {
        await saveMessage(convId, "assistant", assistantContent);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "I apologize, but I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleFileUpload = () => { fileInputRef.current?.click(); };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) toast.success(`File "${file.name}" attached.`);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;
        const chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          toast.info("Processing speech...");
          try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/speech-to-text`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
              body: formData
            });
            if (!response.ok) throw new Error('Transcription failed');
            const result = await response.json();
            if (result.text) { setInput(prev => prev + (prev ? ' ' : '') + result.text); toast.success("Voice transcribed!"); }
          } catch (error) { console.error('STT error:', error); toast.error("Could not transcribe audio."); }
        };
        mediaRecorder.start();
        setIsRecording(true);
        toast.info("Recording... Click again to stop.");
      } catch (error) { toast.error("Microphone access denied."); }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.5)] overflow-visible p-0 bg-transparent border-none"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title="Open S.H.I.E.L.D. AI Chat"
          >
            <div className="relative w-full h-full group">
              <img 
                src={shieldLogo} 
                alt="S.H.I.E.L.D. AI Chat Button" 
                className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-110 transition-all duration-300 group-hover:brightness-125"
              />
              <span className="absolute top-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed right-6 z-50 w-[350px] md:w-[550px] max-w-[calc(100vw-48px)] h-[calc(100vh-160px)] top-32 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-border/50 bg-card/50">
              <div className="flex flex-wrap items-center justify-between p-2 pb-0 px-4 gap-2">
                <AIAvatarSystem />
                <AIIntelligenceModes />
              </div>
              <div className="flex items-center justify-between p-4 pt-2">
                <div className="flex items-center gap-3">
                  {showHistory && (
                    <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)} className="text-muted-foreground h-8 w-8">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="relative">
                    <img alt="S.H.I.E.L.D. AI" className="w-10 h-10 rounded-lg" src="/lovable-uploads/1edfda09-b726-4d94-9928-9ab4604b8d26.png" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                  </div>
                <div>
                   <h3 className="font-display font-semibold text-foreground text-sm flex items-center gap-1">
                     {showHistory ? "Chat History" : "S.H.I.E.L.D. AI"}
                     {!showHistory && <ShieldAIInfoPopup size="sm" />}
                   </h3>
                   <p className="text-[10px] font-semibold text-foreground">Spiritual Healing Initiative Economic Light Development</p>
                   <p className="text-[10px] text-muted-foreground">H.I.I. Watchman</p>
                   <p className="text-[10px] text-green-500 flex items-center gap-1">
                     {showHistory ? `${conversations.length} conversations` : <><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Active • Automatic Updates • Real Time Sync • Runtime Scan: 15s</>}
                   </p>
                                   </div>
              </div>
               <div className="flex items-center gap-1">
                 {!showHistory && userId && (
                   <>
                     <Button variant="ghost" size="icon" onClick={() => setShowCommandCenter(true)} className="text-muted-foreground h-8 w-8" title="Command Center">
                       <Zap className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => { setShowHistory(true); fetchConversations(); }} className="text-muted-foreground h-8 w-8" title="Chat History">
                       <History className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={startNewChat} className="text-muted-foreground h-8 w-8" title="New Chat">
                       <Plus className="w-4 h-4" />
                     </Button>
                   </>
                 )}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            </div>

            {/* History Panel */}
            {showHistory ? (
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {conversations.length === 0 ? (
                  <div className="text-center py-8">
                    <History className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No chat history yet</p>
                  </div>
                ) : (
                  conversations.map(conv => (
                    <div
                      key={conv.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        currentConversationId === conv.id
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/50 bg-card/50 hover:bg-card"
                      }`}
                      onClick={() => loadConversation(conv.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {conv.title || "Untitled"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(conv.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <>
                {/* Messages */}
                <AIChatTabs currentTab={currentTab} onTabChange={setCurrentTab}>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px]">
                    {messages.length === 0 && (
                      <div className="text-center py-8">
                        <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                          <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">How can I assist you today?</p>
                      </div>
                    )}
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`shrink-0 mt-1 w-7 h-7 rounded-lg flex items-center justify-center ${message.role === "user" ? "bg-primary/20" : "bg-shield-accent/20"}`}>
                          {message.role === "user" ? <User className="w-3 h-3 text-primary" /> : <Bot className="w-3 h-3 text-shield-accent" />}
                        </div>
                        <div className={`flex flex-col max-w-[85%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                          <div className={`p-3 rounded-xl text-xs ${message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-md shadow-md" : "bg-card border border-border/50 text-foreground rounded-tl-md shadow-sm"}`}>
                            {message.content || <Loader2 className="w-3 h-3 animate-spin" />}
                          </div>

                          <MessageActionsToolbar isUser={message.role === "user"} messageContent={message.content} onTranscribe={(t: string) => setInput(prev => prev ? prev + " " + t : t)} />
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </AIChatTabs>

                {/* Input */}
                <div className="p-3 border-t border-border/50 bg-card/50">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center overflow-x-auto scrollbar-none pb-1">
                      <AdvancedFileUpload onFilesSelected={() => toast.success("Files loaded directly into query context.")} />
                      <div className="flex bg-background border border-border/50 rounded-xl p-0.5 shrink-0 flex-nowrap">
                        <Button variant="ghost" size="icon" onClick={toggleRecording} className={`h-8 w-8 rounded-lg ${isRecording ? "text-red-500 animate-pulse bg-red-500/10" : "text-muted-foreground hover:text-primary"}`} title={isRecording ? "Turn Off Records" : "Microphone Record Voice"}>
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-green-500 rounded-lg" title="S.H.I.E.L.D. AI Voice (Mute/Unmute/Volume)">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary rounded-lg" title="S.H.I.E.L.D. AI Video Conference (Camera On/Off)">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-indigo-400 rounded-lg" title="S.H.I.E.L.D. AI Video Hologram">
                          <PlaySquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-lg" title="Take a Photo/Video">
                          <Camera className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-5 bg-border/50 mx-1" />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-purple-400 rounded-lg" title="Generate Image">
                          <Image className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-pink-400 rounded-lg" title="Generate Music">
                          <Music className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-400 rounded-lg" title="Generate Video">
                          <Clapperboard className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-end gap-2">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask S.H.I.E.L.D. AI for Anything..."
                        className="flex-1 bg-background border border-border/50 rounded-xl px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[36px] max-h-[80px]"
                        rows={1}
                      />
                      <Button variant="shield" size="icon" onClick={sendMessage} disabled={isLoading || !input.trim()} className="shrink-0 h-8 w-8">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between px-3 pb-2">
                      <div className="flex items-center gap-1 text-[9px] text-green-500">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active
                      </div>
                      <div className="text-[9px] text-muted-foreground">
                        Runtime Scan: 15s
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Center Dialog */}
      <CommandCenter open={showCommandCenter} onOpenChange={setShowCommandCenter} />
    </>
  );
};

export default FloatingChat;



