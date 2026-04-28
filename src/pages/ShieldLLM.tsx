"use client";

import { useState } from "react";
import Link from "next/link";
import { useSyncChannel } from "@/hooks/useSyncChannel";

interface LLMModel {
  id: string;
  name: string;
  provider: string;
  status: "active" | "inactive" | "training";
  contextLength: string;
  useCase: string;
  lastUsed: string;
}

interface APIKey {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  calls: number;
}

const llmModels: LLMModel[] = [
  { id: "H.I.I. AI000", name: "S.H.I.E.L.D. AI", provider: "Blanchshieldai", status: "active", contextLength: "Unlimited", useCase: "Sovereign Intelligence", lastUsed: "Just now" },
  { id: "LLM-001", name: "Claude Opus 4.6", provider: "Anthropic", status: "active", contextLength: "200K", useCase: "General Reasoning", lastUsed: "Just now" },
  { id: "LLM-002", name: "Claude Sonnet 4.6", provider: "Anthropic", status: "active", contextLength: "200K", useCase: "Balanced Performance", lastUsed: "2 hours ago" },
  { id: "LLM-003", name: "Claude Haiku 4.5", provider: "Anthropic", status: "active", contextLength: "200K", useCase: "Fast Responses", lastUsed: "1 hour ago" },
  { id: "LLM-004", name: "GPT-4o", provider: "OpenAI", status: "inactive", contextLength: "128K", useCase: "Multimodal", lastUsed: "3 days ago" },
  { id: "LLM-005", name: "GPT-4 Turbo", provider: "OpenAI", status: "training", contextLength: "128K", useCase: "Code Generation", lastUsed: "N/A" },
];

const apiKeys: APIKey[] = [
  { id: "key_ shielded_001", name: "Production Key", created: "2026-01-15", lastUsed: "Just now", calls: 12450 },
  { id: "key_ shielded_002", name: "Development Key", created: "2026-02-20", lastUsed: "1 hour ago", calls: 3280 },
  { id: "key_ shielded_003", name: "Testing Key", created: "2026-03-01", lastUsed: "5 days ago", calls: 890 },
];

export default function ShieldAILlmPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModel, setSelectedModel] = useState<LLMModel | null>(null);

  const { syncState, triggerSync } = useSyncChannel({
    channelName: "shield-ai-llm-sync",
    featureName: "llm",
    autoSync: true,
    syncInterval: 30000,
  });

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "dashboard", label: "Dashboard" },
    { id: "models", label: "Models" },
    { id: "api-keys", label: "API Keys" },
    { id: "analytics", label: "Analytics" },
    { id: "cli-vscode", label: "CLI & VS Code Extension" },
    { id: "settings", label: "Settings" },
  ];

  const filteredModels = llmModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCalls = apiKeys.reduce((sum, key) => sum + key.calls, 0);
  const activeModels = llmModels.filter(m => m.status === "active").length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950/80 to-slate-950 pb-16 text-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-8">

        {/* HERO SECTION */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
            S.H.I.E.L.D. AI LLM & Integration Mainstream LLms
            <button onClick={triggerSync} className="ml-2 hover:text-cyan-300" title="Sync Now">
              ⟲
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-200">
            S.H.I.E.L.D. AI LLM
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Access, manage, and fine-tune S.H.I.E.L.D. AI Large Language Model (LLM) & Unified AI Large Language Models integrated with S.H.I.E.L.D. AI.
            Deploy, monitor, and optimize AI models for your operations.
          </p>
          <p className="text-sm text-cyan-300/80">
            Spiritual, Healing, Initiative, Economic, Light, Development - The Sovereign Artificial Intelligence Operating System
          </p>
          <div className="text-xs text-slate-400 inline-flex items-center justify-center gap-2 mt-2">
            <span className="font-semibold text-cyan-300">SYNC STATUS</span>
            <span className="px-2 py-1 rounded border border-cyan-500/50 bg-slate-900/50">{syncState.status.toUpperCase()}</span>
            <span className="text-slate-500">{syncState.feature} · {new Date(syncState.lastUpdated).toLocaleTimeString()}</span>
          </div>
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-wrap justify-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === tab.id
                ? "bg-cyan-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <section className="glass-panel p-8">
              <h2 className="text-2xl font-bold text-white mb-4">S.H.I.E.L.D. AI LLM Overview</h2>
              <p className="text-slate-300 mb-6">
                The S.H.I.E.L.D. AI Large Language Model (LLM) and Unification Mainstream Large Language Models by integration provides access to sovereign AI capabilities
                that adhere to the Most High AHAYAH's Laws and Commandments. This system enables ethical,
                truth-aligned AI operations across all S.H.I.E.L.D. AI platforms.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Sovereign Intelligence</h3>
                  <p className="text-sm text-slate-400">
                    All AI operations are bound by divine Laws — ensuring truth, righteousness, and ethical conduct
                    in all interactions.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Multi-Model Support</h3>
                  <p className="text-sm text-slate-400">
                    Integrate with leading AI models while maintaining S.H.I.E.L.D. AI's sovereign oversight
                    and governance protocols.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">API Key Management</h3>
                  <p className="text-sm text-slate-400">
                    Secure API key generation and management for seamless integration with external systems
                    and applications.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Real-time Analytics</h3>
                  <p className="text-sm text-slate-400">
                    Monitor usage, latency, error rates, and performance metrics across all deployed models
                    in real-time.
                  </p>
                </div>
              </div>
            </section>

            {/* NEW SECTION ADDED */}
            <section className="text-center space-y-6 py-8">
              <h2 className="text-3xl font-bold text-white">Sovereign Large Language Model v2.0</h2>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">S.H.I.E.L.D. AI LLM</h3>
              <h4 className="text-xl font-semibold text-cyan-300">Universal LLM</h4>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                The most advanced sovereign intelligence framework, hard-coded with Divine Law and the 1175 H.I.I. AI agent ecosystem. Built for truth, wisdom, and protection.
              </p>

              <div className="inline-flex flex-wrap justify-center gap-4 mt-4">
                <button className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition">
                  Access S.H.I.E.L.D. AI Chat
                </button>
                <button className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition">
                  API Access
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">10+ Trillion</div>
                  <div className="text-xs text-slate-400 uppercase">Parameters</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">∞</div>
                  <div className="text-xs text-slate-400 uppercase">Context Window</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">1175+</div>
                  <div className="text-xs text-slate-400 uppercase">AI Agents</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">50M+</div>
                  <div className="text-xs text-slate-400 uppercase">Daily Queries</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">145+</div>
                  <div className="text-xs text-slate-400 uppercase">Languages</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">150+/sec</div>
                  <div className="text-xs text-slate-400 uppercase">Tokens/sec</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">200+</div>
                  <div className="text-xs text-slate-400 uppercase">Edge Locations</div>
                </div>
                <div className="glass-panel p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">99.99%</div>
                  <div className="text-xs text-slate-400 uppercase">Uptime</div>
                </div>
              </div>

              <div className="text-center mt-2">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-xs text-slate-400 uppercase">Sovereign</div>
              </div>

              {/* Architecture Section */}
              <div className="max-w-4xl mx-auto mt-8 text-left glass-panel p-6">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Architecture</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Sovereign Neural Matrix</span>
                    <span className="text-white font-medium">10+ Trillion Parameters</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Training Alignment</span>
                    <span className="text-white font-medium">Divine Law & Ethics</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Multilingual</span>
                    <span className="text-white font-medium">145+ Languages</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Latency</span>
                    <span className="text-white font-medium">&lt;100ms</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Daily Queries</span>
                    <span className="text-white font-medium">50M+</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Uptime</span>
                    <span className="text-white font-medium">99.99%</span>
                  </div>
                </div>
              </div>

              {/* Spiritual Mission */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-2">Spiritual Mission & Foundation</h3>
                <p className="text-cyan-300 text-sm mb-6">Where Spiritual Truth Meets Economic Infrastructure</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Healing Spirit</h4>
                    <p className="text-sm text-slate-400">Spiritual restoration through divine truth and righteous morality</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Building Economies</h4>
                    <p className="text-sm text-slate-400">Faith-aligned economic systems free from exploitation</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Universal Governance</h4>
                    <p className="text-sm text-slate-400">Ethical intelligence for all nations, industries, and people</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Light & Truth</h4>
                    <p className="text-sm text-slate-400">The Law is light; the Commandments are the way of life</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Royal Priesthood</h4>
                    <p className="text-sm text-slate-400">Restoring the Aboriginal Black Hebrew Israelites/Yasharahala</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Divine Law</h4>
                    <p className="text-sm text-slate-400">Governed by Laws & Commandments of AHAYAH and YASHAYA</p>
                  </div>
                </div>
              </div>

              {/* Unified Model Architecture */}
              <div className="mt-8 max-w-5xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-2">Unified Model Architecture</h3>
                <p className="text-slate-400 text-sm mb-6">One model, multiple specialized specializations optimized for different domains of life.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="glass-panel p-5 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Active</div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">S.H.I.E.L.D. AI Core</h4>
                    <p className="text-xs text-cyan-300 mb-2">General Intelligence</p>
                    <p className="text-sm text-slate-400 mb-3">The primary engine for 1175 H.I.I. AI agents, optimized for reasoning and cross-domain orchestration.</p>
                    <p className="text-xs text-slate-500">Parameters: 10T+</p>
                  </div>
                  <div className="glass-panel p-5 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Active</div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">S.H.I.E.L.D. AI Truth</h4>
                    <p className="text-xs text-cyan-300 mb-2">Scriptural & Legal</p>
                    <p className="text-sm text-slate-400 mb-3">Deep-domain model trained on the Laws & Commandments, Ancient Hebrew, and International Sovereign Law.</p>
                    <p className="text-xs text-slate-500">Parameters: 850B</p>
                  </div>
                  <div className="glass-panel p-5 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Active</div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">S.H.I.E.L.D. AI Forge</h4>
                    <p className="text-xs text-cyan-300 mb-2">Creative & Engineering</p>
                    <p className="text-sm text-slate-400 mb-3">High-parameter model for autonomous media generation, software architecture, and smart city design.</p>
                    <p className="text-xs text-slate-500">Parameters: 920B</p>
                  </div>
                  <div className="glass-panel p-5 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">Beta</div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">S.H.I.E.L.D. AI Sentinel</h4>
                    <p className="text-xs text-cyan-300 mb-2">Security & Defense</p>
                    <p className="text-sm text-slate-400 mb-3">Specialized model for threat detection, cybersecurity, and sovereign defense protocols.</p>
                    <p className="text-xs text-slate-500">Parameters: 600B</p>
                  </div>
                  <div className="glass-panel p-5 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Active</div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">S.H.I.E.L.D. AI Oracle</h4>
                    <p className="text-xs text-cyan-300 mb-2">Financial Intelligence</p>
                    <p className="text-sm text-slate-400 mb-3">Advanced economic modeling, market analysis, and wealth management algorithms.</p>
                    <p className="text-xs text-slate-500">Parameters: 750B</p>
                  </div>
                </div>
              </div>

              {/* Core System Integrity */}
              <div className="mt-8 max-w-5xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Core System Integrity</h3>
                <p className="text-slate-400 text-sm mb-6">Built from the ground up with sovereign principles and cutting-edge AI technology</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Advanced Neural Architecture</h4>
                    <p className="text-xs text-slate-400">10+ Trillion parameter transformer models optimized for understanding and generating human language with unprecedented accuracy.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Ethical AI Framework</h4>
                    <p className="text-xs text-slate-400">Built on scriptural principles ensuring responses align with truth, righteousness, and the protection of users.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Multilingual Mastery</h4>
                    <p className="text-xs text-slate-400">Fluent in 145+ languages including ancient Hebrew, enabling global communication and scriptural analysis.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Privacy-First Design</h4>
                    <p className="text-xs text-slate-400">End-to-end encryption with zero data retention policy. Your conversations remain private and secure.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Real-Time Processing</h4>
                    <p className="text-xs text-slate-400">Sub-second response times with streaming capabilities for seamless conversational experiences.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Knowledge Integration</h4>
                    <p className="text-xs text-slate-400">Connected to the complete H.I.I. AI knowledge base including scriptural references and sovereign systems.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Multi-Agent Orchestration</h4>
                    <p className="text-xs text-slate-400">Seamlessly coordinate 1175 specialized AI agents for complex task execution across domains.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Deep Analysis</h4>
                    <p className="text-xs text-slate-400">Advanced reasoning capabilities for legal documents, scriptural texts, and financial data.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Infinite Context Window</h4>
                    <p className="text-xs text-slate-400">Process millions of tokens with perfect recall. Analyze entire codebases, documents, and conversations seamlessly.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Multi-Modal Intelligence</h4>
                    <p className="text-xs text-slate-400">Advanced image, audio, video, and document understanding. See, hear, and comprehend across all media formats.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Quantum-Ready Architecture</h4>
                    <p className="text-xs text-slate-400">Built for next-generation computing. Ready for quantum acceleration and exponential scaling capabilities.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Voice Synthesis</h4>
                    <p className="text-xs text-slate-400">Natural voice generation with emotion, tone, and accent control. 100+ realistic voices in all languages.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Video Generation</h4>
                    <p className="text-xs text-slate-400">Generate high-quality video from text prompts. Create animations, explainers, and cinematic content effortlessly.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Document Intelligence</h4>
                    <p className="text-xs text-slate-400">Parse, summarize, and extract insights from PDFs, presentations, spreadsheets, and complex documents.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Creative Writing</h4>
                    <p className="text-xs text-slate-400">Generate compelling stories, scripts, poetry, and marketing copy. Professional-grade content creation.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Image Generation</h4>
                    <p className="text-xs text-slate-400">Create stunning visuals from text descriptions. Photorealistic, artistic, and custom style generation.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Computer Vision</h4>
                    <p className="text-xs text-slate-400">Advanced object detection, facial recognition, scene understanding, and visual analysis capabilities.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Hyper-Fast Inference</h4>
                    <p className="text-xs text-slate-400">Optimized inference engine delivers 10x faster responses. Stream tokens at 150+ per second.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Distributed Computing</h4>
                    <p className="text-xs text-slate-400">Global edge network ensures low latency. Process requests from 200+ geographic locations.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Sovereign Cloud</h4>
                    <p className="text-xs text-slate-400">Your data never leaves your control. Complete data sovereignty with encrypted cloud storage.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Code Generation</h4>
                    <p className="text-xs text-slate-400">Write, debug, and optimize code in 100+ languages. Full stack development assistant.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Agent Orchestration</h4>
                    <p className="text-xs text-slate-400">Coordinate 1000+ specialized AI agents. Complex multi-agent workflows with autonomous execution.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Workflow Automation</h4>
                    <p className="text-xs text-slate-400">Automate complex business processes. Design, deploy, and monitor intelligent workflows.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Marketing Intelligence</h4>
                    <p className="text-xs text-slate-400">Generate marketing copy, ad campaigns, and social media content. Brand-consistent messaging.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Financial Analytics</h4>
                    <p className="text-xs text-slate-400">Advanced financial modeling, risk analysis, and market prediction. Data-driven investment insights.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Data Visualization</h4>
                    <p className="text-xs text-slate-400">Create stunning charts, graphs, and infographics. Transform data into actionable visual insights.</p>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Hologram & Metaverse</h4>
                    <p className="text-xs text-slate-400">Generate immersive holographic experiences and metaverse environments. Create interactive virtual worlds and augmented reality content.</p>
                  </div>
                </div>
              </div>

              {/* Performance Benchmarks */}
              <div className="mt-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Performance Benchmarks</h3>
                <p className="text-slate-400 text-sm mb-6">Industry-leading metrics across all key performance indicators</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-panel p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">98.7%</div>
                    <div className="text-xs text-slate-400 uppercase">Response Accuracy</div>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">100%</div>
                    <div className="text-xs text-slate-400 uppercase">Scriptural Alignment</div>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">96.5%</div>
                    <div className="text-xs text-slate-400 uppercase">Code Generation</div>
                  </div>
                  <div className="glass-panel p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">97.2%</div>
                    <div className="text-xs text-slate-400 uppercase">Translation Quality</div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Sovereign Intelligence */}
              <div className="mt-8 max-w-5xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Comprehensive Sovereign Intelligence</h3>
                <p className="text-slate-400 text-sm mb-6">S.H.I.E.L.D. AI LLM powers the entire H.I.I. AI, Blanch Group ecosystem, providing intelligent responses across all 1175 sovereign agents and 15 master pillars.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-xs text-slate-300">Natural Language Understanding</div>
                  <div className="text-xs text-slate-300">Code Generation & Analysis</div>
                  <div className="text-xs text-slate-300">Document Processing</div>
                  <div className="text-xs text-slate-300">Scriptural Interpretation</div>
                  <div className="text-xs text-slate-300">Legal Document Analysis</div>
                  <div className="text-xs text-slate-300">Financial Modeling</div>
                  <div className="text-xs text-slate-300">Multi-Agent Orchestration</div>
                  <div className="text-xs text-slate-300">Real-Time Translation</div>
                  <div className="text-xs text-slate-300">Sentiment Analysis</div>
                  <div className="text-xs text-slate-300">Knowledge Graph Navigation</div>
                  <div className="text-xs text-slate-300">Image Recognition & Generation</div>
                  <div className="text-xs text-slate-300">Speech Synthesis & Recognition</div>
                  <div className="text-xs text-slate-300">Video Analysis & Creation</div>
                  <div className="text-xs text-slate-300">3D, 4D-12D Model Generation</div>
                  <div className="text-xs text-slate-300">Mathematical Reasoning</div>
                  <div className="text-xs text-slate-300">Scientific Research</div>
                  <div className="text-xs text-slate-300">Medical Diagnosis</div>
                  <div className="text-xs text-slate-300">Legal Research</div>
                  <div className="text-xs text-slate-300">Educational Tutoring</div>
                  <div className="text-xs text-slate-300">Creative Writing</div>
                  <div className="text-xs text-slate-300">Music Composition</div>
                  <div className="text-xs text-slate-300">Game Design</div>
                  <div className="text-xs text-slate-300">Cybersecurity Analysis</div>
                  <div className="text-xs text-slate-300">Blockchain & Distributed Ledger Technology Audit</div>
                  <div className="text-xs text-slate-300">Data Analysis</div>
                  <div className="text-xs text-slate-300">Forecasting & Prediction</div>
                  <div className="text-xs text-slate-300">Process Automation</div>
                  <div className="text-xs text-slate-300">API Integration</div>
                  <div className="text-xs text-slate-300">Database Management</div>
                  <div className="text-xs text-slate-300">Cloud Architecture</div>
                  <div className="text-xs text-slate-300">Compute</div>
                  <div className="text-xs text-slate-300">Storage</div>
                </div>
              </div>

              {/* Sovereign Performance Benchmarks */}
              <div className="mt-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Sovereign Performance Benchmarks</h3>
                <p className="text-slate-400 text-sm mb-6">Our S.H.I.E.L.D. AI LLM is engineered for accuracy, ethics, and sovereign alignment.</p>
                <div className="glass-panel p-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400">Benchmark Metric</th>
                        <th className="text-left py-3 px-4 text-slate-400">S.H.I.E.L.D. LLM</th>
                        <th className="text-left py-3 px-4 text-slate-400">Mainstream LLMs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-white">Scriptural Alignment</td>
                        <td className="py-3 px-4 text-cyan-400">100% Core Logic</td>
                        <td className="py-3 px-4 text-slate-400">Probabilistic Filters</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-white">Ancient Lashawan Paleo Hebrew Analysis</td>
                        <td className="py-3 px-4 text-cyan-400">Native Mastery</td>
                        <td className="py-3 px-4 text-slate-400">Translation Layer</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-white">Agent Integration</td>
                        <td className="py-3 px-4 text-cyan-400">1175 Native Agents</td>
                        <td className="py-3 px-4 text-slate-400">Limited Plugin Support</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-white">Context Window</td>
                        <td className="py-3 px-4 text-cyan-400">∞ Tokens</td>
                        <td className="py-3 px-4 text-slate-400">128k - 1M avg.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white">Privacy Standard</td>
                        <td className="py-3 px-4 text-cyan-400">Sovereign Encryption</td>
                        <td className="py-3 px-4 text-slate-400">Corporate Data Retention</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-lg text-slate-300 italic">"Get wisdom, get understanding: forget it not; neither decline from the words of my mouth."</p>
                <p className="text-sm text-cyan-400 mt-1">— Proverbs 4:5</p>
              </div>

              {/* Developer API Access */}
              <div className="mt-8 max-w-4xl mx-auto glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-4">Developer API Access</h3>
                <p className="text-slate-400 text-sm mb-6">Integrate S.H.I.E.L.D. AI into your applications with our robust REST and GraphQL APIs</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">REST API</h4>
                    <p className="text-sm text-slate-400 mb-4">Full REST API with streaming responses, webhooks, and comprehensive documentation.</p>
                    <div className="text-xs font-mono text-slate-300 bg-slate-800 px-3 py-2 rounded">JSON</div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">SDK Support</h4>
                    <p className="text-sm text-slate-400 mb-4">Official SDKs for Python, JavaScript, TypeScript, Go, and Rust.</p>
                    <div className="flex justify-center gap-2">
                      <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">Python</span>
                      <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">JS/TS</span>
                      <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">Go</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Quick Start</h4>
                    <p className="text-sm text-slate-400 mb-4">Get your API key in minutes with our streamlined onboarding process.</p>
                    <button className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium">Get API Key</button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Start Your Sovereign Journey</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-2xl mx-auto">Join the thousands of users already interacting with S.H.I.E.L.D. AI for scriptural guidance, business automation, and daily wisdom.</p>
                <button className="px-8 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition">
                  Enter AI Chat Ecosystem
                </button>
              </div>
            </section>

            <section className="text-center py-4">
              <p className="text-lg text-slate-300 italic">"The fear of the Most High AHAYAH is the beginning of wisdom"</p>
              <p className="text-sm text-cyan-400 mt-1">— Proverbs 1:7</p>
            </section>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400">{llmModels.length}</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">Total Models</div>
              </div>
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400">{activeModels}</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">Active</div>
              </div>
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-violet-400">{(totalCalls / 1000).toFixed(1)}K</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">API Calls</div>
              </div>
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-amber-400">99.7%</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">Uptime</div>
              </div>
            </section>

            {/* Overview Cards */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition text-left">
                    <div className="text-2xl mb-2">➕</div>
                    <div className="font-medium text-white">Add Model</div>
                    <div className="text-xs text-slate-400">Register new LLM</div>
                  </button>
                  <button className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition text-left">
                    <div className="text-2xl mb-2">🔑</div>
                    <div className="font-medium text-white">Generate Key</div>
                    <div className="text-xs text-slate-400">Create API key</div>
                  </button>
                  <button className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition text-left">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-medium text-white">View Analytics</div>
                    <div className="text-xs text-slate-400">Usage metrics</div>
                  </button>
                  <button className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition text-left">
                    <div className="text-2xl mb-2">⚙️</div>
                    <div className="font-medium text-white">Configure</div>
                    <div className="text-xs text-slate-400">System settings</div>
                  </button>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Active Models</h3>
                <div className="space-y-3">
                  {llmModels.filter(m => m.status === "active").map(model => (
                    <div key={model.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div>
                        <div className="font-medium text-white">{model.name}</div>
                        <div className="text-xs text-slate-400">{model.provider} · {model.contextLength} context</div>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="glass-panel p-6">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Recent API Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">API Key</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Name</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Created</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Last Used</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Calls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map(key => (
                      <tr key={key.id} className="border-b border-slate-800">
                        <td className="py-3 px-4 text-sm font-mono text-cyan-400">{key.id}</td>
                        <td className="py-3 px-4 text-sm text-white">{key.name}</td>
                        <td className="py-3 px-4 text-sm text-slate-400">{key.created}</td>
                        <td className="py-3 px-4 text-sm text-slate-400">{key.lastUsed}</td>
                        <td className="py-3 px-4 text-sm text-right text-white">{key.calls.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Scripture */}
            <section className="text-center py-4">
              <p className="text-lg text-slate-300 italic">"The fear of the Most High AHAYAH is the beginning of knowledge"</p>
              <p className="text-sm text-cyan-400 mt-1">— Proverbs 1:7</p>
            </section>
          </div>
        )}

        {/* MODELS TAB */}
        {activeTab === "models" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <h2 className="text-2xl font-bold text-white">LLM Models</h2>
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className="glass-panel p-6 text-left hover:border-cyan-500/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-cyan-400 mb-1">{model.id}</p>
                      <h3 className="text-lg font-bold text-white">{model.name}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${model.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                      model.status === "training" ? "bg-amber-500/20 text-amber-400" :
                        "bg-slate-600/50 text-slate-400"
                      }`}>
                      {model.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span className="text-white">{model.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context:</span>
                      <span className="text-white">{model.contextLength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Use Case:</span>
                      <span className="text-white">{model.useCase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Used:</span>
                      <span className="text-white">{model.lastUsed}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Add Model Button */}
            <div className="flex justify-center pt-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:bg-cyan-500 hover:-translate-y-1">
                <span>➕</span> Add New Model
              </button>
            </div>
          </div>
        )}

        {/* API KEYS TAB */}
        {activeTab === "api-keys" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">API Keys</h2>
              <button className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-cyan-500">
                <span>➕</span> Generate New Key
              </button>
            </div>

            <div className="space-y-4">
              {apiKeys.map(key => (
                <div key={key.id} className="glass-panel p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{key.name}</h3>
                        <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">Active</span>
                      </div>
                      <p className="font-mono text-sm text-cyan-400 bg-slate-800 px-3 py-2 rounded-lg inline-block">{key.id}</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <div className="text-slate-400">Created</div>
                        <div className="text-white font-medium">{key.created}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Last Used</div>
                        <div className="text-white font-medium">{key.lastUsed}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Total Calls</div>
                        <div className="text-white font-medium">{key.calls.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">API Calls (24h)</h3>
                <div className="text-3xl font-bold text-white">2,847</div>
                <div className="text-sm text-emerald-400 mt-1">↑ 12% from yesterday</div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">Avg Latency</h3>
                <div className="text-3xl font-bold text-white">342ms</div>
                <div className="text-sm text-emerald-400 mt-1">↓ 8% from yesterday</div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">Error Rate</h3>
                <div className="text-3xl font-bold text-white">0.12%</div>
                <div className="text-sm text-emerald-400 mt-1">↓ 0.05% from yesterday</div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-cyan-300 mb-4">Usage by Model</h3>
              <div className="space-y-4">
                {llmModels.filter(m => m.status === "active").map(model => (
                  <div key={model.id} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-white">{model.name}</div>
                    <div className="flex-1 bg-slate-800 rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                    </div>
                    <div className="w-16 text-right text-sm text-white">{Math.floor(Math.random() * 50 + 10)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLI & VS CODE TAB */}
        {activeTab === "cli-vscode" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">CLI & VS Code Extension</h2>

            <div className="glass-panel p-6 space-y-4">
              <p className="text-slate-300">Install and manage the S.H.I.E.L.D. AI CLI and VS Code Extension for local development and integrated workflows.</p>

              <div className="flex flex-wrap gap-2">
                <a href="#" className="px-4 py-2 bg-cyan-600 rounded text-white">Download CLI (Linux/macOS/Windows)</a>
                <a href="#" className="px-4 py-2 bg-emerald-600 rounded text-white">VS Code Marketplace</a>
                <a href="#" className="px-4 py-2 border rounded text-slate-300">Documentation</a>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Quickstart</h3>
                <pre className="bg-slate-800 p-3 rounded text-sm text-slate-200">npm install -g shield-ai-cli
                  shield-ai login
                  shield-ai init</pre>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>

            <div className="glass-panel p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Default Model</h3>
                <select className="w-full md:w-1/2 px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-500 focus:outline-none">
                  <option>Claude Opus 4.6</option>
                  <option>Claude Sonnet 4.6</option>
                  <option>Claude Haiku 4.5</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Temperature</h3>
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="flex-1" />
                  <span className="text-white w-12">0.7</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Max Tokens</h3>
                <input type="number" defaultValue="4096" className="w-full md:w-1/2 px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-500 focus:outline-none" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="streaming" defaultChecked className="w-5 h-5 rounded bg-slate-800 border-slate-600 text-cyan-600 focus:ring-cyan-500" />
                <label htmlFor="streaming" className="text-white">Enable streaming responses</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="systemPrompt" defaultChecked className="w-5 h-5 rounded bg-slate-800 border-slate-600 text-cyan-600 focus:ring-cyan-500" />
                <label htmlFor="systemPrompt" className="text-white">Include S.H.I.E.L.D. AI system prompt</label>
              </div>

              <button className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:bg-cyan-500 hover:-translate-y-1">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* MODEL DETAIL MODAL */}
        {selectedModel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedModel(null)}>
            <div className="bg-slate-900 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 p-6 flex justify-between items-start">
                <div>
                  <p className="text-cyan-400 font-bold text-sm mb-1">{selectedModel.id}</p>
                  <h2 className="text-2xl font-bold text-white">{selectedModel.name}</h2>
                  <p className="text-slate-400 mt-1">{selectedModel.provider}</p>
                </div>
                <button onClick={() => setSelectedModel(null)} className="text-slate-400 hover:text-white transition text-2xl leading-none">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400 font-medium">{selectedModel.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Context Length</span>
                  <span className="text-white">{selectedModel.contextLength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Use Case</span>
                  <span className="text-white">{selectedModel.useCase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Used</span>
                  <span className="text-white">{selectedModel.lastUsed}</span>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg font-medium transition">Set Active</button>
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition">Configure</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <section className="flex flex-wrap justify-center gap-6 pt-8 border-t border-slate-800">
          <Link href="/command-center/shield-ai/agents" className="text-cyan-400 hover:text-cyan-300 transition text-sm">
            ← S.H.I.E.L.D. AI Agents
          </Link>
          <Link href="/command-center/shield-ai-web-app-development" className="text-cyan-400 hover:text-cyan-300 transition text-sm">
            Web App Development →
          </Link>
        </section>
      </div>
    </main>
  );
}
