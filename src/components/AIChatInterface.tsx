import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Loader2, Minimize2, Maximize2, Mic, MicOff, Paperclip, History, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import shieldLogo from "@/assets/shield-logo.jpg";
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
const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        fetchConversations(session.user.id);
      }
    };
    checkAuth();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchConversations(session.user.id);
      } else {
        setUserId(null);
        setConversations([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  const fetchConversations = async (uid: string) => {
    const {
      data,
      error
    } = await supabase.from("chat_conversations").select("*").eq("user_id", uid).order("updated_at", {
      ascending: false
    });
    if (!error && data) {
      setConversations(data);
    }
  };
  const loadConversation = async (conversationId: string) => {
    const {
      data,
      error
    } = await supabase.from("chat_messages").select("*").eq("conversation_id", conversationId).order("created_at", {
      ascending: true
    });
    if (!error && data) {
      setMessages(data.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content
      })));
      setCurrentConversationId(conversationId);
      setShowHistory(false);
    }
  };
  const createConversation = async (firstMessage: string) => {
    if (!userId) return null;
    const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "");
    const {
      data,
      error
    } = await supabase.from("chat_conversations").insert({
      user_id: userId,
      title
    }).select().single();
    if (!error && data) {
      setCurrentConversationId(data.id);
      setConversations(prev => [data, ...prev]);
      return data.id;
    }
    return null;
  };
  const saveMessage = async (conversationId: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role,
      content
    });

    // Update conversation timestamp
    await supabase.from("chat_conversations").update({
      updated_at: new Date().toISOString()
    }).eq("id", conversationId);
  };
  const deleteConversation = async (conversationId: string) => {
    const {
      error
    } = await supabase.from("chat_conversations").delete().eq("id", conversationId);
    if (!error) {
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }
      toast.success("Conversation deleted");
    }
  };
  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };
  const sendMessage = async () => {
    if (!input.trim() && !attachedFile || isLoading) return;
    let messageContent = input.trim();

    // Process attached file
    if (attachedFile) {
      const fileContent = await processFileForChat(attachedFile);
      messageContent = messageContent ? `${messageContent}\n\n${fileContent}` : fileContent;
      setAttachedFile(null);
    }
    const userMessage: Message = {
      role: "user",
      content: messageContent
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    let conversationId = currentConversationId;
    if (!conversationId && userId) {
      conversationId = await createConversation(userMessage.content);
    }
    if (conversationId) {
      await saveMessage(conversationId, "user", userMessage.content);
    }
    let assistantContent = "";
    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }
      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setMessages(prev => [...prev, {
        role: "assistant",
        content: ""
      }]);
      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {
          stream: true
        });
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
                if (lastMessage?.role === "assistant") {
                  lastMessage.content = assistantContent;
                }
                return newMessages;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      if (conversationId && assistantContent) {
        await saveMessage(conversationId, "assistant", assistantContent);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again. May the Most High AHAYAH guide your path."
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be under 10MB");
        return;
      }
      setAttachedFile(file);
      toast.success(`File "${file.name}" attached. It will be sent with your next message.`);
    }
  };
  const processFileForChat = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const fileInfo = `[Attached file: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(1)}KB)]`;
        if (file.type.startsWith('image/')) {
          resolve(`${fileInfo}\n[Image content will be analyzed by the AI]`);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          const text = atob(base64);
          resolve(`${fileInfo}\nFile contents:\n${text.slice(0, 2000)}${text.length > 2000 ? '...' : ''}`);
        } else {
          resolve(fileInfo);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm'
        });
        mediaRecorderRef.current = mediaRecorder;
        const chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(chunks, {
            type: 'audio/webm'
          });
          toast.info("Processing speech...");
          try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/speech-to-text`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
              },
              body: formData
            });
            if (!response.ok) throw new Error('Transcription failed');
            const result = await response.json();
            if (result.text) {
              setInput(prev => prev + (prev ? ' ' : '') + result.text);
              toast.success("Voice transcribed successfully!");
            }
          } catch (error) {
            console.error('STT error:', error);
            toast.error("Could not transcribe audio. Please try again.");
          }
        };
        mediaRecorder.start();
        setIsRecording(true);
        toast.info("Recording... Click again to stop.");
      } catch (error) {
        toast.error("Microphone access denied.");
      }
    }
  };
  return <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Ask <span className="gradient-text">S.H.I.E.L.D. AI</span>
          </h2>
          <p className="text-sm text-primary/80 font-display tracking-wider mb-2">H.I.I. AI Watchman— Hebrew Israelite Implementer Aboriginal Identity Watchman </p>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Consult with our Sovereign Universal Ethical Intelligence System for guidance aligned with divine truth
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="glass-card rounded-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img alt="S.H.I.E.L.D. AI" className="w-10 h-10 rounded-lg" src="/lovable-uploads/e2b94e92-43fe-4096-bf98-5faac8405bf3.png" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">S.H.I.E.L.D. AI</h3>
                  <p className="text-xs text-muted-foreground">Sovereign Intelligence</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {userId && <>
                    <Button variant="ghost" size="icon" onClick={() => setShowHistory(!showHistory)} className="text-muted-foreground" title="Chat History">
                      <History className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={startNewChat} className="text-muted-foreground text-xs">
                      New Chat
                    </Button>
                  </>}
                <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="text-muted-foreground">
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && <motion.div initial={{
              height: 0
            }} animate={{
              height: "auto"
            }} exit={{
              height: 0
            }} className="overflow-hidden">
                  {/* Chat History Panel */}
                  <AnimatePresence>
                    {showHistory && <motion.div initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: "auto"
                }} exit={{
                  opacity: 0,
                  height: 0
                }} className="border-b border-border/50 bg-card/30">
                        <div className="p-4 max-h-48 overflow-y-auto">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-foreground">Chat History</h4>
                            <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          {conversations.length === 0 ? <p className="text-xs text-muted-foreground text-center py-4">No previous conversations</p> : <div className="space-y-2">
                              {conversations.map(conv => <div key={conv.id} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${currentConversationId === conv.id ? "bg-primary/20 border border-primary/30" : "bg-card/50 hover:bg-card/80"}`} onClick={() => loadConversation(conv.id)}>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{conv.title || "Untitled"}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(conv.updated_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Button variant="ghost" size="icon" className="shrink-0 text-destructive/70 hover:text-destructive" onClick={e => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>)}
                            </div>}
                        </div>
                      </motion.div>}
                  </AnimatePresence>

                  {/* Messages Area */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && <div className="text-center py-12">
                        <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground font-body">
                          Ask me anything about governance, technology, spiritual guidance, or our universal capabilities.
                        </p>
                        <p className="text-xs mt-2 italic text-primary">
                          "Thy righteousness is an everlasting righteousness, and thy law is the truth." — Psalms 119:142
                        </p>
                      </div>}

                    {messages.map((message, index) => <motion.div key={index} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${message.role === "user" ? "bg-primary/20" : "bg-shield-accent/20"}`}>
                          {message.role === "user" ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-shield-accent" />}
                        </div>
                        <div className={`max-w-[80%] p-3 rounded-2xl font-body text-sm ${message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-md" : "bg-card border border-border/50 text-foreground rounded-tl-md"}`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </motion.div>)}

                    {isLoading && messages[messages.length - 1]?.role === "user" && <div className="flex gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-shield-accent/20 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-shield-accent" />
                        </div>
                        <div className="bg-card border border-border/50 p-3 rounded-2xl rounded-tl-md">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      </div>}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-border/50 bg-card/30">
                    <div className="flex gap-2 items-end">
                      {/* File Upload */}
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt" />
                      <Button variant="ghost" size="icon" onClick={handleFileUpload} className="shrink-0 text-muted-foreground hover:text-primary" title="Upload File">
                        <Paperclip className="w-4 h-4" />
                      </Button>

                      {/* Microphone */}
                      <Button variant="ghost" size="icon" onClick={toggleRecording} className={`shrink-0 ${isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-primary"}`} title={isRecording ? "Stop Recording" : "Voice Input"}>
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>

                      <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1} className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Ask S.H.I.E.L.D. AI Anything..." />
                      <Button variant="shield" size="icon" onClick={sendMessage} disabled={!input.trim() || isLoading} className="shrink-0">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                    {!userId && <p className="text-xs text-muted-foreground mt-2 text-center">
                        <a href="/auth" className="text-primary hover:underline">Sign in</a> to save chat history
                      </p>}
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default AIChatInterface;